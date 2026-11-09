import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import handler from '../api/index.mjs';

test('serverless API exports a handler', () => assert.equal(typeof handler, 'function'));
test('Vercel rewrites API and SPA paths', async () => {
 const cfg=JSON.parse(await readFile(new URL('../vercel.json',import.meta.url),'utf8'));
 assert.equal(cfg.framework,'vite');
 assert.ok(cfg.rewrites.some(x=>x.source==='/api/:path*'));
 assert.ok(cfg.rewrites.some(x=>x.destination==='/index.html'));
});
