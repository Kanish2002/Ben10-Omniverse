import test from 'node:test';
import assert from 'node:assert/strict';
import {aliens,ultimates,fusions,predators,allEntries,devices,regions,playlist,evolvedForm,combine} from '../src/data.js';
import {iso} from '../src/world.js';
test('catalogue IDs are unique and every resident has a motion and source',()=>{
 assert.equal(new Set(allEntries.map(e=>e.id)).size,allEntries.length);
 for(const e of allEntries){assert.ok(e.task.length>10,e.id);assert.match(e.source,/^https:\/\//);assert.match(e.color,/^#[0-9a-f]{6}$/i);assert.ok(e.shape);}
 assert.equal(aliens.length,63);
});
test('all four device eras have appropriate playlists',()=>{
 assert.equal(playlist('classic').length,22);
 assert.ok(playlist('af').some(a=>a.id==='swampfire'));
 assert.ok(!playlist('af').some(a=>a.id==='feedback'));
 assert.ok(playlist('ultima').some(a=>a.id==='water-hazard'));
 assert.ok(!playlist('ultima').some(a=>a.id==='atomix'));
 assert.equal(playlist('omni').length,63);
});
test('evolution is gated by device and known forms',()=>{
 assert.equal(evolvedForm('swampfire','classic'),null);
 assert.equal(evolvedForm('heatblast','ultima'),null);
 assert.equal(evolvedForm('swampfire','ultima').name,'Ultimate Swampfire');
 assert.equal(evolvedForm('rath','ultima'),null);
 assert.equal(evolvedForm('rath','albedo').name,'Ultimate Rath');
 assert.equal(ultimates.filter(u=>u.era==='ua').length,8);
 for(const u of ultimates)assert.ok(aliens.some(a=>a.id===u.base));
});
test('predator devices never expose ordinary Ben DNA',()=>{
 assert.equal(playlist('neme').length,predators.length);
 assert.ok(playlist('neme',{expanded:true}).every(a=>a.kind==='predator'));
 assert.ok(playlist('classic').every(a=>a.kind==='alien'));
});
test('fusion lookup handles both sample orders and labels speculative combinations',()=>{
 assert.equal(combine('atomix','alien-x').name,'Atomic-X');
 assert.equal(combine('alien-x','atomix').name,'Atomic-X');
 assert.equal(combine('heatblast','xlr8').continuity,'Fan simulation');
 assert.equal(combine('heatblast','heatblast'),null);
 assert.equal(combine('missing','heatblast'),null);
 for(const f of fusions)for(const id of f.components)assert.ok(aliens.some(a=>a.id===id));
});
test('every device resolves to a nonempty catalogue and supplemental is opt-in',()=>{
 for(const d of devices)assert.ok(playlist(d.id).length>0,d.id);
 assert.ok(playlist('classic',{expanded:true}).length>playlist('classic').length);
 assert.ok(!playlist('omni').some(a=>a.kind==='supplemental'));
});
test('isometric projection is reversible and elevation is independent',()=>{
 const p=iso(100,200);assert.equal(p.x,-86);assert.equal(p.y,129);
 assert.equal(iso(100,200,15).y,114);
});
test('every explicit district reference exists',()=>{
 for(const e of allEntries.filter(e=>e.region))assert.ok(regions.some(r=>r.id===e.region),e.id);
 assert.equal(regions.length,12);
});
