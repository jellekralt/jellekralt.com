const http = require('http');
const routes = {
  '/api/blog': require('./api/blog'),
  '/api/links': require('./api/links')
};
http
  .createServer(async (req, res) => {
    try {
      const [url] = req.url.split('?');
      console.log('req.url', req.url);
      console.log('url', url);

      const matches = url.match(/\/api\/([a-zA-Z\-]+)/);
      console.log('matches', matches);      
      
      await routes[matches[0]](req, res);
    } catch (err) {
      console.error(err);
      res.writeHead(404);
      res.end();
    }
  })
  .listen(process.env.PORT || 1337);