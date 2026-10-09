import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {aliens,allEntries,bens,ultimates,fusions,predators} from '../src/data.js';
import {spriteManifest,sheetFiles,sheetDimensions} from '../src/sprite-manifest.js';
import {hasSprite,motionLabel} from '../src/sprites.js';

test('every era alien, Ultimate, known fusion, predator and watch wielder has a raster asset',()=>{
 for(const e of [...aliens,...ultimates,...fusions,...predators,...bens])assert.ok(hasSprite(e),e.id);
});
test('source rectangles fit real atlas bounds and visible IDs belong to the catalogue',()=>{
 const ids=new Set(allEntries.map(e=>e.id));
 for(const [id,s]of Object.entries(spriteManifest)){
  assert.ok(ids.has(id),id);assert.ok(sheetFiles[s.sheet],id);const [w,h]=sheetDimensions[s.sheet];
  assert.ok(s.frames.length===1||s.frames.length===4,id);
  for(const [x,y,fw,fh]of s.frames){assert.ok(x>=0&&y>=0&&fw>0&&fh>0&&x+fw<=w&&y+fh<=h,id);assert.ok(fw<w*.48&&fh<h*.4,`Unexpected adjoining sprite in ${id}`);}
 }
});
test('every illustrated character has four distinct pose rectangles and an action',()=>{
 for(const [id,s] of Object.entries(spriteManifest)){assert.equal(s.frames.length,4,id);assert.equal(new Set(s.frames.map(f=>f.join(','))).size,4,id);assert.ok(s.action.length>10,id);}
});
test('production bundles real WebP assets and reference-only entries remain labelled',()=>{
 for(const file of Object.values(sheetFiles)){const bytes=readFileSync(new URL(`../assets/${file}`,import.meta.url));assert.equal(bytes.toString('ascii',0,4),'RIFF',file);assert.equal(bytes.toString('ascii',8,12),'WEBP',file);}
 assert.equal(hasSprite('shellhead'),false);assert.match(motionLabel(allEntries.find(e=>e.id==='shellhead')),/Unseen/);
});
