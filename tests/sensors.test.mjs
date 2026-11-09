import test from 'node:test';
import assert from 'node:assert/strict';
import {createApp} from '../server/index.mjs';
test('sensor station endpoint rejects invalid coordinates and never invents observations',async()=>{
 const server=createApp().listen(0);
 try{
  const base=`http://127.0.0.1:${server.address().port}`;
  const invalid=await fetch(`${base}/api/sensor-stations?lat=999&lon=2`);
  assert.equal(invalid.status,400);
  const previous=process.env.OPENAQ_API_KEY;delete process.env.OPENAQ_API_KEY;
  try{
   const unavailable=await fetch(`${base}/api/sensor-stations?lat=6.52&lon=3.38`);
   assert.equal(unavailable.status,503);
   const body=await unavailable.json();assert.equal(body.configured,false);
  }finally{if(previous!==undefined)process.env.OPENAQ_API_KEY=previous;}
  const providers=await(await fetch(`${base}/api/providers`)).json();
  assert.equal(providers.sensors.kind,'observed station discovery');
 }finally{server.close();}
});
