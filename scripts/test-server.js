import http from 'http';
http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('STATUS:', res.statusCode, 'DATA:', data.slice(0, 200)));
}).on('error', err => console.log('ERROR:', err.message));
