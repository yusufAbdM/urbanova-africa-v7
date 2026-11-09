import test from 'node:test';import assert from 'node:assert/strict';import {estimateIntervention,INTERVENTIONS} from '../src/lib/interventions.js';
test('three competition-aligned pollution interventions',()=>assert.equal(INTERVENTIONS.length,3));
test('impact scenario math',()=>assert.deepEqual(estimateIntervention({type:'waste',units:100,factor:0.45}).annual,16425));
test('reject negative and invalid inputs',()=>{assert.equal(estimateIntervention({type:'waste',units:-1,factor:0.5}),null);assert.equal(estimateIntervention({type:'waste',units:'oops',factor:0.5}),null)});
