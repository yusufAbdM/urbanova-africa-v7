import test from 'node:test';
import assert from 'node:assert/strict';
import {createApp} from '../server/index.mjs';

test('capabilities and health endpoints are honest and respond',async()=>{
 const server=createApp().listen(0);
 try{
  const base=`http://127.0.0.1:${server.address().port}`;
  const health=await fetch(`${base}/api/health`);assert.equal(health.status,200);assert.equal((await health.json()).status,'ok');
  const cap=await fetch(`${base}/api/capabilities`);assert.equal(cap.status,200);
  const data=await cap.json();assert.equal(data.energy.tariff,'user-input');assert.equal(data.environment.modeled,'open-meteo');
  assert.match(data.note,/does not guarantee coverage/);
 }finally{server.close();}
});

test('API returns explicit errors for unsupported routes and methods',async()=>{
 const server=createApp().listen(0);
 try{const base=`http://127.0.0.1:${server.address().port}`;
  assert.equal((await fetch(`${base}/api/unknown`)).status,404);
  assert.equal((await fetch(`${base}/api/health`,{method:'POST'})).status,405);
 }finally{server.close();}
});
