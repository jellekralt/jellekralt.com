const express = require('express');
const NodeCache = require('node-cache');
const xml = require('xml');

const routes = require('./routes.json');

const cache = new NodeCache({});

const app = express();
module.exports = app;

app.get('/sitemap.xml', async (req, res) => {
  const sitemap = { urlset: [] };
  const host = req.header('host');
  const isEncrypted = req.protocol;

  sitemap.urlset = routes.map((url) => { 
    return {
      url: [{
        loc: `${isEncrypted ? 'https': 'http'}://${host}${url}`
      }] 
    };
  });

  res.type('application/xml');
  res.send(xml(sitemap));
});

