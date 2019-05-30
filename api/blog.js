const express = require('express');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

// import { Router } from 'express';
const NodeCache = require('node-cache');
const marked = require('marked');
const fm = require('front-matter');
const slugify = require('slugify');

// const cache = NodeCache();
const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

const cache = new NodeCache({});

marked.setOptions({
  highlight: function (code, language) {
    let codeHtml = require('highlight.js').highlightAuto(code).value;

    return `<pre><code class="hljs ${language}">${codeHtml}</code></pre>`;
  }
});

const config = {
  path: path.resolve(__dirname, '../content/blog'),
  showConcepts: process.env.NODE_ENV !== 'production'
};

const app = express();
module.exports = app;

app.get('/api/blog', async (req, res) => {
  let tag = req.query.tag;
  let limit = parseInt(req.query.limit);
  let posts = await getPosts(config.path);

  if (!config.showConcepts) {
    posts = posts.filter(post => !post.meta.concept);
  }

  if (tag) {
    posts = posts.filter(post => {
      return post.meta.tags && post.meta.tags.indexOf(tag) > -1
    });

    if (posts.length === 0) {
      return res.status(404).send('Tag not found');
    }
  }

  if (limit) {
    posts = posts.slice(0, limit);
  }

  res.json(posts);
});

app.get('/api/blog/:year/:month/:day/:slug', async (req, res, next) => {
  let posts = await getPosts(config.path);
  let { year, month, day, slug } = req.params;
  let date = `${year}-${month}-${day}T00:00:00.000Z`;

  let foundPosts = posts.filter(post => slug === post.slug && date === post.date);

  if (foundPosts.length === 0) {
    return res.status(404).send('Blogpost not found');
  }

  res.json(foundPosts[0]);
});

async function getPosts (path) {
  let cachedPosts = cache.get('posts');

  if (cachedPosts) {
    return cachedPosts;
  }

  const files = await readDir(path);
  let posts = await Promise.all(files.map(async (fileName) => {
    const fileData = await readFile(`${path}/${fileName}`, 'utf8');
    const parsedData = fm(fileData);
    const content = marked(parsedData.body);
    const meta = parsedData.attributes;
    const title = fileName.split('-')[1].replace('.md', '');
    const [year, month, day] = fileName.split('-')[0].split(' ');

    if (meta.tags) {
      meta.tags = meta.tags.split(',');
    }

    return {
      fileName,
      title,
      content,
      meta,
      date: `${year}-${month}-${day}T00:00:00.000Z`,
      slug: slugify(title, { lower: true })
    };
  }));

  posts = posts.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  cache.set('posts', posts);

  return posts;
}