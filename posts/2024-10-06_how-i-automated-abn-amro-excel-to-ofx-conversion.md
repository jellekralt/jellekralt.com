---
title: How I Automated ABN AMRO Excel to OFX Conversion
author: Jelle Kralt
tags: nodejs,excel,ofx
---

If you're anything like me, you enjoy automating repetitive tasks. One of those tasks I encountered recently was converting my ABN AMRO Excel exports into a format that the financial software I use, could actually read: OFX. Initially, it seemed like a quick fix—just some minor tweaks and it would be done. But, as is often the case, the rabbit hole went much deeper than expected.

Here's the full story of how I turned those unruly `.xls` files into something MoneyWell would happily digest, using a bit of Node.js magic.

---

## Why I Needed This Solution
Like many Dutchies, I download my transaction data from ABN AMRO to keep track of expenses and manage finances. But I quickly discovered that the Excel format provided by ABN AMRO isn’t exactly friendly for other software. Financial tools like MoneyWell and GnuCash need a standardized format like OFX to import transactions. And there’s no built-in way to convert it directly.

Instead of manually copying and pasting values each month, I thought: why not automate this? A bit of scripting, a few lines of code, and I’d be done in 15 minutes, right?

Wrong.

---

## The Challenge
ABN AMRO gives you an `.xls` file, which in theory is a pretty standard format. But when you dive into it, the real challenge becomes apparent:

- **Inconsistent Descriptions**: Every type of transaction has its own way of storing data, including varying prefixes, random extra text, and different payee placements.
- **No Direct Way to Convert**: OFX isn’t just a basic format—it’s a structured file format used by many financial institutions, with strict specifications.

So, we needed a robust solution that could:
1. Parse the Excel file.
2. Extract meaningful transaction details.
3. Reformat and save it all into a well-formed `.ofx` file.

Let’s dive into how I tackled each of these problems.

---

## Building the Conversion Script in Node.js
I started by setting up a simple Node.js script, which would:
1. Read the `.xls` file using a library like `xlsx`.
2. Convert the transactions into a JSON format.
3. Extract critical information like date, amount, and payee.
4. Generate an OFX file using `xmlbuilder`.

Here’s a quick breakdown of the process:

### Step 1: Reading the Excel File
For this, I used the `xlsx` package. It’s straightforward and can handle most of the oddities of `.xls` files. Here’s how I set it up:

```javascript
const xlsx = require('xlsx');
const workbook = xlsx.readFile('abnamro-transactions.xls');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const transactions = xlsx.utils.sheet_to_json(sheet);
```

Simple enough, right? The output is a clean JSON array that we can easily loop through. But now we get to the tricky part: parsing the weird descriptions.

### Step 2: Extracting the Payee
The `Omschrijving` (description) field in ABN AMRO’s Excel exports can be a nightmare. A transaction from Albert Heijn might look something like:

```
BEA, Apple Pay                   Albert Heijn,PAS123             NR:ABCDEF, 01.01.24/10:00        AMSTELVEEN
```

Or worse, a manual bank transfer will have a completely different structure:

```
SEPA Overboeking                 IBAN: NL00ABNA0123456789        BIC: ABNANL2A                    Naam: FOOBAR                    Omschrijving: Baz
```

To handle this, I wrote a function that matches and extracts payees and transaction details based on known patterns:

```javascript
function extractPayee(description) {
  const dynamicFormats = ["BEA,", "GEA,", "APP", "eCom"];
  for (const format of dynamicFormats) {
    if (description.startsWith(format)) {
      const start = 24;
      const end = description.indexOf(",", start) !== -1 ? description.indexOf(",", start) : start + 30;
      return description.substring(start, end).trim();
    }
  }

  if (description.startsWith("SEPA Overboeking")) {
    const match = description.match(/Naam:\s*([^\s].*?)\s*(?=IBAN|BIC|Omschrijving|$)/);
    return match ? match[1].trim() : "Unknown Payee";
  }
  return "Unknown Format";
}
```

This little function saved me a ton of manual tweaking later on.

### Step 3: Converting to OFX
The OFX format requires a very specific structure, so I used `xmlbuilder` to construct the XML content. Here’s a snippet of how I generated a single transaction:

```javascript
const builder = require('xmlbuilder');
const ofx = builder.create('OFX')
  .ele('SIGNONMSGSRSV1')
    .ele('SONRS')
      .ele('STATUS')
        .ele('CODE', 0).up()
        .ele('SEVERITY', 'INFO').up()
      .up()
      .ele('DTSERVER', new Date().toISOString()).up()
      .ele('LANGUAGE', 'ENG').up()
    .up()
  .up()
  .ele('BANKMSGSRSV1')
    .ele('STMTTRNRS')
      .ele('TRNUID', '1001').up()
      .ele('STATUS')
        .ele('CODE', 0).up()
        .ele('SEVERITY', 'INFO').up()
      .up()
      .ele('STMTRS')
        .ele('CURDEF', 'EUR').up()
        .ele('BANKTRANLIST')
          .ele('STMTTRN')
            .ele('TRNTYPE', 'DEBIT').up()
            .ele('DTPOSTED', '20241008000000').up()
            .ele('TRNAMT', -3.25).up()
            .ele('FITID', 'T123').up()
            .ele('NAME', 'Albert Heijn').up()
            .ele('MEMO', 'Groceries').up()
          .up()
        .up()
      .up()
    .up()
  .up();
```

You get the idea—each transaction needs to be meticulously formatted.

---

## Results and Final Thoughts
After some trial and error (okay, a lot of it), the script now converts ABN AMRO’s chaotic Excel exports into beautifully structured OFX files, ready to be imported into MoneyWell. It’s not perfect—new formats still pop up occasionally—but it’s been a huge timesaver for me.

If you’re looking to automate your financial workflows, this little script might just be the missing link. Got a similar use case or need help setting up your own solution? Drop a comment below or reach out!

Happy coding! 😊

---

Feel free to reach out if you need the complete script or if you run into any issues. The rabbit hole goes deep, but the view at the end is totally worth it! 🚀