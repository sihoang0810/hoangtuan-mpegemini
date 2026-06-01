import puppeteer from 'puppeteer';
import { spawn } from 'child_process';

const server = spawn('node', ['dist/server.cjs'], { env: { ...process.env, process: 'production' } });

server.stdout.on('data', data => console.log('SERVER OUT:', data.toString()));
server.stderr.on('data', data => console.log('SERVER ERR:', data.toString()));

setTimeout(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('BROWSER PAGE ERROR:', err.message));
  
  // Add unhandled rejection
  page.on('requestfailed', request => {
    console.log('REQUEST FAILED:', request.url(), request.failure().errorText);
  });
  
  await page.exposeFunction('logUnhandledRejection', (reason) => {
    console.log('UNHANDLED REJECTION:', reason);
  });
  
  await page.evaluateOnNewDocument(() => {
    window.addEventListener('unhandledrejection', event => {
      window.logUnhandledRejection(event.reason && event.reason.message ? event.reason.message : String(event.reason));
    });
  });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(r => setTimeout(r, 2000));
  const content = await page.content();
  console.log('HTML CONTENT HEAD:', content.substring(0, 500));
  const bodyHtml = await page.evaluate(() => document.body.innerHTML);
  require('fs').writeFileSync('public/test-body.html', bodyHtml);
  console.log('BODY HTML LENGTH:', bodyHtml.length);
  await page.screenshot({ path: 'public/screenshot2.png' });
  
  await browser.close();
  server.kill();
  process.exit(0);
}, 3000);
