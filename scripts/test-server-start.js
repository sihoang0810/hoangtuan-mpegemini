import fs from 'fs';
const code = fs.readFileSync('dist/server.cjs', 'utf-8');
fs.writeFileSync('dist/server_test.cjs', code);
import { spawn } from 'child_process';
const server = spawn('node', ['dist/server_test.cjs'], { env: { ...process.env, PORT: '3001', NODE_ENV: 'production' } });
server.stdout.on('data', d => console.log('OUT:', d.toString()));
server.stderr.on('data', d => console.log('ERR:', d.toString()));
server.on('exit', code => console.log('EXITED WITH CODE:', code));
setTimeout(async () => {
  try {
    const res = await fetch('http://localhost:3001/api/health');
    console.log('HEALTH RESPONSE:', await res.text());
  } catch (e) {
    console.log('FETCH ERROR:', e);
  }
  server.kill();
}, 2000);
