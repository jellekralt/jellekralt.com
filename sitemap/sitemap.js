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

  sitemap.urlset.unshift({ _attr: { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' } })
  const sitemapXML = xml(sitemap, { declaration: true });

  res.type('application/xml');
  res.send(sitemapXML);
});

