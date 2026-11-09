import test from 'node:test';import assert from 'node:assert/strict';import {routeResources,researchDomains} from '../src/data/resources.js';
const routes=['/','/energy','/traffic','/environment','/impact','/sources','/about'];
test('every app route has section-specific help and references',()=>{for(const path of routes){const section=routeResources[path];assert.ok(section,`missing ${path}`);assert.ok(section.faq.length>=2);assert.ok(section.sources.length>=4);assert.ok(section.help.length>=1)}});
test('all source and support links are absolute HTTPS URLs',()=>{for(const [path,entry] of Object.entries(routeResources))for(const [name,url] of [...entry.sources,...entry.help]){assert.ok(name);assert.equal(new URL(url).protocol,'https:',`${path}: ${url}`)}});
test('research covers at least ten distinct domains',()=>assert.ok(researchDomains.length>=10));
