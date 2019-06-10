const http = require('http');
const routes = {
  '/sitemap.xml': require('./sitemap/sitemap.js'),
  '/api/blog': require('./api/blog'),
  '/api/links': require('./api/links')
};
http
  .createServer(async (req, res) => {
    try {
      const [url] = req.url.split('?');
    
      const matches = url.match(/(\/api)?\/([a-zA-Z\-.]+)/);

      console.log('url', url);
      console.log('matches[0]', matches[0]);
      

      if (matches && matches[0]) {
        await routes[matches[0]](req, res);
      } else {
        throw new Error ('No match found');
      }
      
    } catch (err) {
      console.error(err);
      res.writeHead(404);
      res.end();
    }
  })
  .listen(process.env.PORT || 1337);