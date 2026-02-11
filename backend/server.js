const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

  let filePath = path.join(
    __dirname,
    '../frontend',
    req.url === '/' ? 'index.html' : req.url
  );

  const ext = path.extname(filePath);
  let contentType = 'text/html';

  if (ext === '.css') contentType = 'text/css';
  if (ext === '.js') contentType = 'text/javascript';
  if (ext === '.jpg') contentType = 'image/jpeg';
  if (ext === '.png') contentType = 'image/png';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Page Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(3000, () => {
  console.log('Backend server running on http://localhost:3000');
});