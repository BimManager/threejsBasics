const http = require('http');
const fs = require('fs');

// req => http.IncomingMessage
// req.method
// req.headers
// req.url
// res => http.ServerResponse
// res.setHeader('Content-Type', 'application/json');
// res.writeHead(200, { 'Content-Type', 'application/json' });
// res.writeHead(statusCode[, statusMessage][, headers]);
// res.statusCode = 404;
// res.statusMessage = 'Not found';
// res.end([data[, encoding]][, callback]);
// res.write([chunk[, encoding]][, callback]);

const server = http.createServer(function(req, res) {
//  console.log(`${req.method} ${req.url} ${req.rawHeaders}`);
  if ('GET' === req.method.toUpperCase()
      || 'HEAD' === req.method.toUpperCase()) {
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    });
    let body;
    if ('/' === req.url) body = fs.readFileSync('./public/index.html');
    else body = '';
    res.end(body);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: http.STATUS_CODES[404] }));
  }
});

server.listen(process.env.PORT || 3000);
