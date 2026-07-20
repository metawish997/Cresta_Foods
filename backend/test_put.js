import http from 'http';
import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }));
  const product = await Product.findOne();
  
  const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
  let body = '';
  
  body += '--' + boundary + '\r\n';
  body += 'Content-Disposition: form-data; name="name"\r\n\r\n' + product.name + '\r\n';
  
  body += '--' + boundary + '\r\n';
  body += 'Content-Disposition: form-data; name="slug"\r\n\r\n' + product.slug + '\r\n';
  
  body += '--' + boundary + '\r\n';
  body += 'Content-Disposition: form-data; name="image"; filename="test.jpg"\r\n';
  body += 'Content-Type: image/jpeg\r\n\r\n';
  body += 'fake image content\r\n';
  
  body += '--' + boundary + '--\r\n';
  
  const options = {
    hostname: '127.0.0.1',
    port: 5001,
    path: '/api/products/' + product._id.toString(),
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data; boundary=' + boundary,
      'Content-Length': Buffer.byteLength(body)
    }
  };
  
  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      console.log('STATUS:', res.statusCode);
      console.log('RESPONSE:', data);
      
      if (fs.existsSync('error.log')) {
        console.log('ERROR LOG:', fs.readFileSync('error.log', 'utf8'));
      }
      process.exit(0);
    });
  });
  
  req.on('error', (e) => {
    console.error('HTTP ERROR:', e);
    process.exit(1);
  });
  
  req.write(body);
  req.end();
})();
