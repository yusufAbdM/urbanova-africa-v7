import test from 'node:test';import assert from 'node:assert/strict';import {electricityCost,applianceKwh,journeyDelay} from '../src/lib/calculations.js';
test('electricity estimates',()=>{assert.equal(electricityCost(150,100),15000);assert.equal(electricityCost(-1,100),null);assert.equal(electricityCost(100,80,1000),9000)});
test('appliance kWh',()=>{assert.equal(applianceKwh(100,6,30),18);assert.equal(applianceKwh(100,25,30),null)});
test('travel time scenarios',()=>{const r=journeyDelay(12,60,30);assert.equal(r.delayMinutes,12);assert.equal(journeyDelay(12,0,30),null)});
