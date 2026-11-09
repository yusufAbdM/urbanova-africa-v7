import test from 'node:test';import assert from 'node:assert/strict';import {CITIES,NIGERIA_STATES,AFRICAN_CAPITALS,AFRICAN_COUNTRIES} from '../src/data/cities.js';
test('Nigeria includes 36 states plus FCT',()=>{assert.equal(NIGERIA_STATES.length,37);assert.equal(new Set(NIGERIA_STATES.map(s=>s.state)).size,37)});
test('Africa registry covers at least 50 countries',()=>assert.ok(AFRICAN_COUNTRIES.length>=50));
test('City coordinates are valid and identities unique',()=>{const keys=new Set();for(const c of CITIES){assert.ok(c.lat>=-90&&c.lat<=90);assert.ok(c.lon>=-180&&c.lon<=180);const k=`${c.country}|${c.name}`.toLowerCase();assert.ok(!keys.has(k),k);keys.add(k)}});
test('Nigeria capitals are present',()=>{for(const c of NIGERIA_STATES)assert.ok(CITIES.some(x=>x.country==='Nigeria'&&x.name===c.capital))});
