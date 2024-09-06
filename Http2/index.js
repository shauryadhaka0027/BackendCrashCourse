const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

// Define the port
const port = 8080;

// Function to serve HTML form
const serveForm = (res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
        <html>
            <body>
                <h1>Signup Form</h1>
                <form action="/signup" method="post">
                    Username: <input type="text" name="username" required><br>
                    Password: <input type="password" name="password" required><br>
                    <input type="submit" value="Signup">
                </form>
            </body>
        </html>
    `);
    res.end();
};

// Function to serve all users
const serveUsers = (res) => {
    fs.readFile('user.txt', 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error reading users.');
            return;
        }
        
        const users = data.split('\n').filter(Boolean).map(line => {
            const [username] = line.split(',');
            return username;
        });
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>All Users</h1>');
        res.write('<ul>');
        users.forEach(user => res.write(`<li>${user}</li>`));
        res.write('</ul>');
        res.end();
    });
};

// Create the HTTP server
http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    
    if (req.method === 'GET' && parsedUrl.pathname === '/signup') {
        serveForm(res); // Serve the signup form
    } 
    else if (req.method === 'POST' && parsedUrl.pathname === '/signup') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { username, password } = qs.parse(body);
            
            // Save the user info (don't store passwords in plain text in real apps)
            fs.appendFile('user.txt', `${username},${password}\n`, (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error saving user.');
                    return;
                }
                
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Thank you for Signup...!!!');
            });
        });
    }
    else if (req.method === 'GET' && parsedUrl.pathname === '/allusers') {
        serveUsers(res); // Serve all users except password
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found.');
    }
}).listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
