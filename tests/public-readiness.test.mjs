import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL(p,import.meta.url),'utf8');
test('public provenance explains data classes without exposing API configuration status',()=>{const source=read('../src/components/ServiceStatus.jsx');assert.match(source,/Sources & reliability/);assert.match(source,/Illustrative scenarios/);assert.match(source,/Modeled forecasts/);assert.doesNotMatch(source,/Provider configured|Check API status|Optional integration not configured/);});
test('public homepage no longer markets itself as a hackathon entry',()=>assert.doesNotMatch(read('../src/pages/Home.jsx'),/HACKATHON \/ PUBLIC POLLUTION/));
test('environment variable example is safe to commit',()=>{const sample=read('../.env.example');assert.match(sample,/TOMTOM_API_KEY=/);assert.match(sample,/OPENAQ_API_KEY=/);assert.doesNotMatch(sample,/sk_[a-z0-9]{16,}/i)});
test('all seven pages share source and support sections',()=>{const layout=read('../src/components/Layout.jsx');for(const name of ['ServiceStatus','ResearchBrief','SectionSupport','LegalIntelligence'])assert.match(layout,new RegExp(`<${name}`));});
