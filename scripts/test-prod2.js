import { spawn } from 'child_process';
const server = spawn('node', ['dist/server.cjs'], { env: { ...process.env, NODE_ENV: 'production', PORT: '3000' } });
server.stdout.on('data', d => console.log('OUT:', d.toString()));
server.stderr.on('data', d => console.log('ERR:', d.toString()));
server.on('exit', code => console.log('EXITED WITH CODE:', code));
setTimeout(() => { server.kill(); process.exit(0); }, 3000);
