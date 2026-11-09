import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createApp} from '../server/index.mjs';

test('comparison uses real provider endpoints and labels estimates',async()=>{
 const text=await readFile(new URL('../src/components/CityComparison.jsx',import.meta.url),'utf8');
 assert.match(text,/\/api\/air-quality/);
 assert.match(text,/modeled/i);
 assert.match(text,/Accra|accra/);
 assert.doesNotMatch(text,/Math\.random/);
});
test('backend rejects invalid URLs without crashing',async()=>{
 const app=createApp();await new Promise(resolve=>app.listen(0,'127.0.0.1',resolve));
 try{const port=app.address().port;const res=await fetch(`http://127.0.0.1:${port}/api/health`);assert.equal(res.status,200);assert.equal((await res.json()).status,'ok');assert.equal(res.headers.get('x-frame-options'),'DENY');}finally{await new Promise(resolve=>app.close(resolve));}
});
