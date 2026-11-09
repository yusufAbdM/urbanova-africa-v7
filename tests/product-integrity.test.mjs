import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CITIES } from '../src/data/cities.js';
const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
test('city registry has distinct identifiers and valid global coordinates', () => {
  assert.ok(CITIES.length >= 20);
  assert.equal(new Set(CITIES.map(c => c.id)).size, CITIES.length);
  for (const c of CITIES) {
    assert.ok(c.id && c.name && c.country);
    assert.ok(Number.isFinite(c.lat) && c.lat >= -90 && c.lat <= 90);
    assert.ok(Number.isFinite(c.lon) && c.lon >= -180 && c.lon <= 180);
  }
  assert.ok(CITIES.some(c => c.country === 'Nigeria'));
  assert.ok(CITIES.some(c => c.country !== 'Nigeria'));
});
test('all five pages remain routed and lazy loaded', () => {
  const app = read('../src/App.jsx');
  for (const route of ['Home','Energy','Traffic','Environment','About']) assert.match(app, new RegExp(`import\\('./pages/${route}'\\)`));
  for (const route of ['/energy','/traffic','/environment','/about']) assert.ok(app.includes(`path="${route}"`));
});
test('creator identity and contact details are preserved', () => {
  const about = read('../src/pages/About.jsx');
  for (const text of ['Yusuf Abdulmatin','Gigger_Yusuf','Gigger_Ghost','yusufmateeeen@gmail.com']) assert.ok(about.includes(text));
});
test('all three intelligence pages include real-world introductions', () => {
  for (const page of ['Energy','Traffic','Environment']) {
    const source = read(`../src/pages/${page}.jsx`);
    assert.match(source, /<RealityIntro\b/);
  }
});
