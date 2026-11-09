import test from 'node:test';
import assert from 'node:assert/strict';
import {createApp} from '../server/index.mjs';

test('World Bank integration returns newest observed year and caches response', async()=>{
 const original=globalThis.fetch;let calls=0;
 globalThis.fetch=async(url,opts)=>{if(String(url).startsWith('https://api.worldbank.org/')){calls++;return new Response(JSON.stringify([{},[{date:'2021',value:72},{date:'2023',value:81.5},{date:'2024',value:null}]]),{status:200,headers:{'Content-Type':'application/json'}});}return original(url,opts);};
 const server=createApp().listen(0);
 try{
  const base=`http://127.0.0.1:${server.address().port}`;
  const invalid=await original(`${base}/api/energy-access?country=XX`);assert.equal(invalid.status,400);
  const response=await original(`${base}/api/energy-access?country=NG`);assert.equal(response.status,200);
  const data=await response.json();assert.equal(data.year,2023);assert.equal(data.percent,81.5);
  const again=await(await original(`${base}/api/energy-access?country=NG`)).json();assert.equal(again.cached,true);assert.equal(calls,1);
 }finally{server.close();globalThis.fetch=original;}
});

test('traffic integration rejects bad coordinates and fails closed without a key',async()=>{
 const previous=process.env.TOMTOM_API_KEY;delete process.env.TOMTOM_API_KEY;
 const server=createApp().listen(0);
 try{const base=`http://127.0.0.1:${server.address().port}`;
  assert.equal((await fetch(`${base}/api/traffic-flow?lat=100&lon=0`)).status,400);
  const response=await fetch(`${base}/api/traffic-flow?lat=6.52&lon=3.38`);
  assert.equal(response.status,503);assert.equal((await response.json()).configured,false);
 }finally{server.close();if(previous!==undefined)process.env.TOMTOM_API_KEY=previous;}
});
