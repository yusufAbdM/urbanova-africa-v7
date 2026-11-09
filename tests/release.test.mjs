import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createApp} from '../server/index.mjs';

test('release contains a single-service deployment plan and CI gates', async()=>{
 const config=JSON.parse(await readFile(new URL('../railway.json',import.meta.url),'utf8'));
 assert.match(config.build.buildCommand,/npm run build/);
 assert.equal(config.deploy.startCommand,'npm start');
 const ci=await readFile(new URL('../.github/workflows/ci.yml',import.meta.url),'utf8');
 assert.match(ci,/npm test/);
 assert.match(ci,/npm run build/);
});

test('public API exposes explicit health, security and missing-route behavior',async()=>{
 const server=createApp().listen(0);
 try{
  const base=`http://127.0.0.1:${server.address().port}`;
  const health=await fetch(base+'/api/health');
  assert.equal(health.status,200);
  assert.equal(health.headers.get('x-content-type-options'),'nosniff');
  assert.equal((await health.json()).status,'ok');
  const missing=await fetch(base+'/api/nonexistent');
  assert.equal(missing.status,404);
  assert.match((await missing.json()).error,/Not found/);
  const invalid=await fetch(base+'/api/air-quality?lat=invalid&lon=0');
  assert.equal(invalid.status,400);
 }finally{await new Promise(resolve=>server.close(resolve));}
});

test('city comparison never silently treats modeled data as sensor observations',async()=>{
 const jsx=await readFile(new URL('../src/components/CityComparison.jsx',import.meta.url),'utf8');
 assert.match(jsx,/modeled air quality/);
 assert.match(jsx,/Data unavailable/);
 assert.match(jsx,/disabled=\{ids\[1-index\]===city.id\}/);
});
