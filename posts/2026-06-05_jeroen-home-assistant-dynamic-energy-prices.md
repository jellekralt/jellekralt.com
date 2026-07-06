---
title: Using Jeroen.nl dynamic energy prices in Home Assistant
author: Jelle Kralt
tags: homeassistant,energy,jeroen,homewizard
---

> By Jelle Kralt  
> #homeassistant #energy #jeroen #homewizard

I recently installed a HomeWizard P1 meter and connected it to Home Assistant. That part was surprisingly easy. Home Assistant started showing my electricity usage nicely, the HomeWizard integration worked, and the Energy Dashboard was immediately useful.

But with a dynamic energy contract, usage alone is not enough.

I don’t just want to know how many kWh I used. I want to know what that usage actually cost me. Since I have a dynamic energy contract, I wanted a price sensor that came reasonably close to the tariff I actually pay.

I looked at a few options: Nord Pool, EnergyZero, Enever, and eventually Jeroen.nl. Since I already had a Jeroen.nl account and API key, that ended up being the easiest solution for me.

The final solution is fairly simple: a REST sensor, a template sensor, and Home Assistant’s Energy Dashboard.

Here’s how I set it up.

---

## The goal

I wanted this flow:

```text
HomeWizard P1
→ actual electricity usage

Jeroen.nl API
→ current dynamic electricity price

Home Assistant
→ usage × current price = estimated cost
```

Jeroen.nl gives me a price every 15 minutes. Home Assistant can use a “current price” entity in the Energy Dashboard. So all I needed was a sensor that exposes the current Jeroen.nl price as `EUR/kWh`.

Sounds easy enough, right?

As usual, the rabbit hole was just slightly deeper than expected.

---

## Step 1: Get the Jeroen.nl API URL

Jeroen.nl exposes dynamic energy prices through an API endpoint that looks like this:

```text
https://jeroen.nl/api/dynamische-energieprijzen/v2/?period=vandaag&type=json&key=YOUR_KEY
```

Of course, replace `YOUR_KEY` with your own API key.

One important note: don’t paste your real API key all over your configuration files. In Home Assistant, this kind of thing belongs in `secrets.yaml`.

So I added this to `/config/secrets.yaml`:

```yaml
jeroen_stroom_vandaag_url: "https://jeroen.nl/api/dynamische-energieprijzen/v2/?period=vandaag&type=json&key=YOUR_KEY"
```

If you accidentally shared your key somewhere while testing, regenerate it if Jeroen.nl allows that.

---

## Step 2: Check what the API returns

Before putting anything into Home Assistant, I first checked the response with `curl`:

```bash
curl "https://jeroen.nl/api/dynamische-energieprijzen/v2/?period=vandaag&type=json&key=YOUR_KEY"
```

The response looked like this:

```json
[
  {
    "datum_nl": "2026-06-23 22:30:00",
    "datum_utc": "2026-06-23 20:30:00",
    "prijs_excl_belastingen": "0,270900"
  },
  {
    "datum_nl": "2026-06-23 22:45:00",
    "datum_utc": "2026-06-23 20:45:00",
    "prijs_excl_belastingen": "0,197200"
  }
]
```

There are a couple of things to notice here:

- The data is per 15-minute interval.
- The price uses a comma as decimal separator.
- The API gives both Dutch local time and UTC.
- The price field is called `prijs_excl_belastingen`.

That last one is important. This price excludes taxes, so I created one raw Jeroen.nl sensor and one calculated all-in price sensor.

---

## Step 3: Create the raw Jeroen.nl REST sensor

In `configuration.yaml`, I added this:

```yaml
rest:
  - resource: !secret jeroen_stroom_vandaag_url
    scan_interval: 900
    sensor:
      - name: "Jeroen stroomprijs huidig excl belastingen"
        unique_id: jeroen_stroomprijs_huidig_excl_belastingen
        unit_of_measurement: "EUR/kWh"
        state_class: measurement
        suggested_display_precision: 5
        value_template: >
          {% set minute = utcnow().minute %}
          {% set quarter = (minute // 15) * 15 %}
          {% set current_slot = utcnow().strftime('%Y-%m-%d %H:') ~ '%02d:00' | format(quarter) %}
          {% set ns = namespace(price=none) %}

          {% for item in value_json %}
            {% if item.datum_utc == current_slot %}
              {% set ns.price = item.prijs_excl_belastingen | replace(',', '.') | float %}
            {% endif %}
          {% endfor %}

          {{ ns.price if ns.price is not none else 0 }}
```

The `scan_interval: 900` means Home Assistant fetches the price every 15 minutes.

I used `datum_utc` instead of `datum_nl`, because that avoids having to deal with local timezone parsing inside the template. The template simply calculates the current UTC quarter-hour and looks up the matching price.

Also note that I did **not** add:

```yaml
device_class: monetary
```

I initially tried that, but Home Assistant complained because `device_class: monetary` and `state_class: measurement` are not a valid combination for this kind of sensor. For a price-per-kWh sensor, just using `unit_of_measurement: "EUR/kWh"` works fine.

After saving the file, I restarted Home Assistant:

```bash
docker restart homeassistant
```

Then I checked the sensor in:

```text
Developer Tools → States
```

The raw Jeroen sensor showed something like:

```text
0.2709 EUR/kWh
```

So far, so good.

---

## Step 4: Create the calculated all-in price sensor

The Jeroen.nl sensor I created above gives the price excluding taxes. For the Energy Dashboard I wanted a more realistic price, so I added the electricity tax.

In my case, I used `0.111` EUR/kWh.

So I added this template sensor:

```yaml
template:
  - sensor:
      - name: "Stroomprijs huidig inclusief belastingen"
        unique_id: stroomprijs_huidig_inclusief_belastingen
        unit_of_measurement: "EUR/kWh"
        state_class: measurement
        suggested_display_precision: 5
        state: >
          {% set jeroen_price = states('sensor.jeroen_stroomprijs_huidig_excl_belastingen') | float(0) %}
          {% set energy_tax = 0.111 %}
          {{ (jeroen_price + energy_tax) | round(5) }}
```

After another restart:

```bash
docker restart homeassistant
```

I got two sensors:

```text
sensor.jeroen_stroomprijs_huidig_excl_belastingen
sensor.stroomprijs_huidig_inclusief_belastingen
```

For example:

```text
Jeroen.nl raw price:       0.2709 EUR/kWh
Calculated all-in price:  0.3819 EUR/kWh
```

Which is exactly:

```text
0.2709 + 0.111 = 0.3819
```

That gave me a price entity that Home Assistant could use for cost calculation.

---

## Step 5: Use the price sensor in the Energy Dashboard

The final step was connecting the calculated price to my electricity usage.

In Home Assistant, I went to:

```text
Settings → Dashboards → Energy
```

Then under the electricity grid consumption source, I selected:

```text
Use an entity with current price
```

And picked:

```text
sensor.stroomprijs_huidig_inclusief_belastingen
```

One small gotcha: make sure you select this under the **price** setting, not as a consumption entity. The HomeWizard P1 sensor is the consumption source; the calculated price sensor is only the current price.

After that, Home Assistant started calculating estimated electricity costs based on:

```text
HomeWizard P1 usage × calculated current price
```

---

## A few things to watch out for

There were a couple of small issues along the way.

### Don’t use `device_class: monetary`

This caused a warning in Home Assistant:

```text
Entity is using state class 'measurement' which is impossible considering device class ('monetary')
```

Removing `device_class: monetary` fixed it.

### Make sure the sensor always returns a number

At first, my sensor returned `unknown` when it could not find a matching price. Home Assistant did not like that, because the sensor is supposed to be numeric.

This is why the REST sensor ends with:

```jinja
{{ ns.price if ns.price is not none else 0 }}
```

That way, the sensor always has a numeric value.

### Don’t duplicate top-level YAML keys

If you already have a `rest:` or `template:` section in `configuration.yaml`, don’t create another one. Merge the new sensors into the existing section.

YAML will not always complain clearly, but Home Assistant may ignore parts of your config or behave unexpectedly.

### Keep the tax value up to date

The `0.111` EUR/kWh tax value is hardcoded. That means I’ll need to update it if the tax changes.

This setup is good enough for my own dashboard, but I would not treat it as a replacement for the official invoice from my energy supplier.

---

## Final thoughts

This turned out to be one of those small Home Assistant projects that sounds simple, then gets slightly annoying, and finally becomes satisfying once it works.

I started by looking at more obvious dynamic pricing options like Nord Pool, EnergyZero, and Enever. They all have their uses, but for my setup the Jeroen.nl API turned out to be the most practical.

The final setup is simple:

```text
HomeWizard P1
→ measures actual usage

Jeroen.nl REST sensor
→ fetches current dynamic price

Template sensor
→ adds electricity tax

Home Assistant Energy Dashboard
→ calculates estimated costs
```

It is not perfect, and I would not treat it as a replacement for the official invoice from my energy supplier. But it gives me what I wanted: a clear view of what my electricity usage roughly costs throughout the day, based on my dynamic pricing setup.