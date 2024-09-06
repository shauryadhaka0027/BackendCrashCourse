const http = require('http');
const fs = require('fs'); // To handle the /index route

const port = 8080;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to Home Page');
  } 
  else if (req.url === '/aboutus') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h3>Welcome to About Page</h3>');
  } 
  else if (req.url === '/contactus') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<a href="http://www.masaischool.com">Contact us at www.masaischool.com</a>');
  } 
  else if (req.url === '/index') {
    fs.readFile('index.js', (err, data) => {  // Assuming index.js is in the same directory
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error reading index.js file');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
      }
    });
  } 
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
