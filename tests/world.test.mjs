import test from 'node:test';
import assert from 'node:assert/strict';
import {allEntries} from '../src/data.js';
import {scenes,sceneFor,activityFor} from '../src/scenes.js';
import {activityPose} from '../src/animation.js';
import {Transformation} from '../src/transformation.js';
test('every catalogue entry inhabits exactly one scene, without a fixed panel limit',()=>{
 const ids=scenes.flatMap(s=>s.entries);assert.equal(ids.length,allEntries.length);assert.equal(new Set(ids).size,ids.length);assert.ok(scenes.length>12);for(const e of allEntries)assert.ok(sceneFor(e),e.id);
 assert.equal(new Set(scenes.map(s=>s.x+','+s.y)).size,scenes.length);
});
test('every actor has a specific periodic action and moves reproducibly on the world clock',()=>{
 for(const e of allEntries){const action=activityFor(e);assert.ok(action.label.length>10,e.id);assert.ok(action.period>0);const a=activityPose(action,.7,e.id),b=activityPose(action,.7+action.period,e.id);for(const k of ['x','y','scaleX','scaleY','alpha'])assert.ok(Math.abs(a[k]-b[k])<1e-9,`${e.id} ${k}`);}
});
test('completion fires once, even if the viewport does not draw the actor',()=>{
 const t=new Transformation(),a=allEntries[0],b=allEntries.find(e=>e.kind==='ben');t.begin(a,b,'green',10);assert.equal(t.figure(10.1),b);assert.equal(t.figure(10.5),a);assert.equal(t.tick(10.9),null);assert.equal(t.tick(11.2),a);assert.equal(t.tick(12),null);
});
test('a frozen world clock pauses transformation and cancellation cannot complete a stale form',()=>{
 const t=new Transformation(),a=allEntries[0];t.begin(a,a,'green',3);for(let i=0;i<5;i++)assert.equal(t.tick(3.2),null);assert.equal(t.cancel(),true);assert.equal(t.tick(20),null);assert.equal(t.figure(20),null);t.begin(a,a,'green',20,true);assert.equal(t.tick(20),a);assert.equal(t.tick(20),null);
});
