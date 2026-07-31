const http = require('http');

const data = JSON.stringify({
  smtp_host: 'test',
  smtp_port: 587,
  smtp_username: 'test',
  smtp_password: 'new_password_not_masked',
  smtp_encryption: 'TLS',
  from_email: 'test@example.com',
  from_name: 'Test',
  admin_email: 'test@example.com',
  is_active: true
});

const req = http.request(
  {
    hostname: 'localhost',
    port: 5001,
    path: '/api/email-settings',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      // Need a token to bypass auth or admin token
      // Wait, we need an admin token. I'll just temporarily turn off auth check in the backend for a second, 
      // or actually, maybe the user had an auth issue? But the UI loaded the page, meaning they logged in.
    }
  },
  (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => console.log('STATUS:', res.statusCode, 'BODY:', body));
  }
);
req.on('error', e => console.error(e));
req.write(data);
req.end();
