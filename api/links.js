const express = require('express');

const NodeCache = require('node-cache');
const Pinboard = require('node-pinboard');

const API_TOKEN = process.env.PINBOARD_API_TOKEN;
const pinboard = new Pinboard(API_TOKEN);

const cache = new NodeCache({});

const app = express();
module.exports = app;

app.get('/api/links', async (req, res) => {
  const links = cache.get('links');

  if (links) {
    return res.json(links);
  }

  pinboard.recent({}, (err, data) => {
    let links = [];

    if (err) return res.status(500).send(err);

    if (data && data.posts) {
      links = data.posts
        .filter(link => {
          const tags = link.tags.split(' ');
          return link.shared === 'yes' && tags.includes('linkdump');
        })
        .map(link => {
          let { href, description, time } = link;
          return {
            href,
            description,
            time
          };
        });
    }

    cache.set('links', links, 10 * 60);

    res.json(links);
  });
});

