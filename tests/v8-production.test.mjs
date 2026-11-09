import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createApp} from '../server/index.mjs';

test('V8 API rejects unsupported methods, invalid coordinates, and excessive URLs',async()=>{
 const app=createApp().listen(0);
 try{
  const base=`http://127.0.0.1:${app.address().port}`;
  assert.equal((await fetch(`${base}/api/health`,{method:'POST'})).status,405);
  assert.equal((await fetch(`${base}/api/air-quality?lat=abc&lon=0`)).status,400);
  assert.equal((await fetch(`${base}/api/traffic-flow?lat=90.1&lon=0`)).status,400);
  assert.equal((await fetch(`${base}/api/unknown`)).status,404);
  assert.equal((await fetch(`${base}/api/health?x=${'a'.repeat(2100)}`)).status,414);
  const health=await fetch(`${base}/api/health`);
  assert.equal(health.headers.get('x-content-type-options'),'nosniff');
  assert.equal(health.headers.get('access-control-allow-origin'),null);
 }finally{app.close()}
});

test('V9 has a combined local development command and public data provenance',async()=>{
 const pkg=JSON.parse(await readFile(new URL('../package.json',import.meta.url),'utf8'));
 assert.equal(pkg.scripts.dev,'node scripts/dev.mjs');
 const layout=await readFile(new URL('../src/components/Layout.jsx',import.meta.url),'utf8');
 assert.match(layout,/ServiceStatus/);
 assert.match(layout,/aria-controls="primary-navigation"/);
 const widget=await readFile(new URL('../src/components/ServiceStatus.jsx',import.meta.url),'utf8');
 assert.match(widget,/Sources & reliability/);
 assert.match(widget,/Modeled forecasts/);
});
