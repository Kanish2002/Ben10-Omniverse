import {allEntries,roster,characters,bens,regions} from './data.js';
import {drawSprite,hourglass} from './sprites.js';
export const iso=(u,v,z=0)=>({x:(u-v)*.86,y:(u+v)*.43-z});
const ROOM_W=520,ROOM_H=440,STEP_X=580,STEP_Y=500;
const polygon=(ctx,p,color,stroke='#345c48')=>{ctx.beginPath();p.forEach((a,i)=>i?ctx.lineTo(a.x,a.y):ctx.moveTo(a.x,a.y));ctx.closePath();ctx.fillStyle=color;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke();}};
function tile(ctx,u,v,w,h,color,z=0){polygon(ctx,[iso(u,v,z),iso(u+w,v,z),iso(u+w,v+h,z),iso(u,v+h,z)],color);}
function block(ctx,u,v,w,h,z,color){const a=iso(u,v),b=iso(u+w,v),c=iso(u+w,v+h),d=iso(u,v+h);polygon(ctx,[{x:d.x,y:d.y-z},{x:c.x,y:c.y-z},c,d],'#476951');polygon(ctx,[{x:b.x,y:b.y-z},{x:c.x,y:c.y-z},c,b],'#335943');tile(ctx,u,v,w,h,color,z);}
function orb(ctx,u,v,color,r=10){const p=iso(u,v,18);ctx.fillStyle=color;ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#254a39';ctx.lineWidth=2;ctx.stroke();}
function tree(ctx,u,v,color='#70915d'){const p=iso(u,v);ctx.strokeStyle='#6d7650';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x,p.y-45);ctx.stroke();for(let i=0;i<3;i++){ctx.fillStyle=i%2?'#91a66b':color;ctx.beginPath();ctx.ellipse(p.x+(i-1)*12,p.y-45-(i%2)*13,20,25,0,0,Math.PI*2);ctx.fill();}}
function consoleProp(ctx,u,v,color){block(ctx,u,v,40,23,22,'#7c9b7d');const p=iso(u+5,v+7,44);ctx.fillStyle='#1e3b30';ctx.beginPath();ctx.roundRect(p.x-18,p.y-17,40,25,4);ctx.fill();ctx.strokeStyle='#92b49d';ctx.lineWidth=2;ctx.stroke();ctx.fillStyle=color;ctx.fillRect(p.x-12,p.y-11,24,3);ctx.fillRect(p.x-12,p.y-4,13,2);ctx.fillRect(p.x-12,p.y+2,20,2);}
function portal(ctx,u,v,color){const p=iso(u,v);ctx.strokeStyle='#486c54';ctx.lineWidth=13;ctx.beginPath();ctx.ellipse(p.x,p.y-45,29,46,0,0,Math.PI*2);ctx.stroke();ctx.strokeStyle=color;ctx.lineWidth=4;ctx.stroke();ctx.fillStyle='#183b2f';ctx.fill();ctx.fillStyle=color;ctx.globalAlpha=.2;ctx.fill();ctx.globalAlpha=1;}
function label(ctx,text,u,v){const p=iso(u,v,36);ctx.font='600 12px monospace';ctx.fillStyle='#d7e6ba';ctx.fillText(text,p.x,p.y);}
function background(region){
 const canvas=document.createElement('canvas');canvas.width=1030;canvas.height=670;const ctx=canvas.getContext('2d');ctx.translate(460,112);
 polygon(ctx,[iso(0,0,0),iso(ROOM_W,0),iso(ROOM_W,ROOM_H),iso(0,ROOM_H)],'#305840');
 for(let u=0;u<ROOM_W;u+=40)for(let v=0;v<ROOM_H;v+=40)tile(ctx,u,v,Math.min(40,ROOM_W-u),40,((u+v)/40)%2?'#41634a':'#456b50');
 const a=iso(0,ROOM_H),b=iso(ROOM_W,ROOM_H),c=iso(ROOM_W,0);
 polygon(ctx,[a,b,{x:b.x,y:b.y+23},{x:a.x,y:a.y+23}],'#213f31');polygon(ctx,[b,c,{x:c.x,y:c.y+23},{x:b.x,y:b.y+23}],'#294938');
 polygon(ctx,[iso(0,0),iso(ROOM_W,0),iso(ROOM_W,0,53),iso(0,0,53)],'#74916f');polygon(ctx,[iso(0,0),iso(0,ROOM_H),iso(0,ROOM_H,53),iso(0,0,53)],'#607d62');
 tile(ctx,0,0,ROOM_W,5,region.color,53);tile(ctx,0,0,5,ROOM_H,region.color,53);
 for(let u=80;u<ROOM_W;u+=100)tile(ctx,u,14,30,10,'#bdd89b',24);
 label(ctx,region.name.toUpperCase(),42,22);
 tile(ctx,40,55,420,36,'#537358');tile(ctx,45,55,410,3,region.color);
 // Every district has a bespoke scene built from isometric geometry.
 if(region.id==='bellwood'){
  tile(ctx,15,130,490,67,'#607267');for(let i=0;i<7;i++)tile(ctx,30+i*65,163,30,3,'#d1caa4');
  block(ctx,35,80,100,45,33,'#bdb792');block(ctx,35,80,100,45,38,'#d1aa90');label(ctx,'MR. SMOOTHY',40,89);orb(ctx,125,105,'#d5a3b4',15);
  block(ctx,325,105,80,35,23,'#8d9c79');for(let u of [335,390])orb(ctx,u,137,'#233d32',8);tile(ctx,349,107,36,23,'#bed2bb',25);
  tree(ctx,460,95);block(ctx,410,355,56,34,12,'#a1b589');
 }else if(region.id==='camp'){
  block(ctx,40,89,152,68,57,'#c9c6a5');tile(ctx,45,89,135,60,'#bec29c',58);tile(ctx,45,91,130,9,'#b17458',60);for(let i=0;i<3;i++)block(ctx,60+i*38,95,25,3,39,'#91b5b1');orb(ctx,60,154,'#314f3e',13);orb(ctx,160,154,'#314f3e',13);label(ctx,'RUST BUCKET',60,120);
  for(const [u,v] of [[460,110],[470,310],[35,350]])tree(ctx,u,v);
  block(ctx,245,110,42,28,14,'#b7a37a');orb(ctx,263,123,'#e2a567',11);block(ctx,355,347,45,38,15,'#a68e69');
 }else if(region.id==='plumbers'){
  for(let i=0;i<3;i++)consoleProp(ctx,40+i*145,110,'#a9dbc3');block(ctx,425,118,55,45,30,'#98b8a6');label(ctx,'PROTO-TOOL LAB',305,76);
  for(let i=0;i<3;i++){block(ctx,440,230+i*55,17,16,26,'#adb788');orb(ctx,448,238+i*55,'#c5a084',9);}
 }else if(region.id==='galvan'){
  for(let i=0;i<4;i++){consoleProp(ctx,50+i*110,110,'#b8ed4d');block(ctx,52+i*110,80,20,15,21,'#a8b6a0');orb(ctx,62+i*110,86,'#bde17a',8);}
  block(ctx,375,300,100,85,12,'#92af8c');portal(ctx,424,345,'#b8ed4d');label(ctx,'DNA VAULT',358,280);
 }else if(region.id==='undertown'){
  for(let i=0;i<3;i++){block(ctx,30+i*150,97,110,43,25,'#a4a085');tile(ctx,30+i*150,95,110,44,['#b994a2','#b9a875','#899bad'][i],31);label(ctx,['PAKMAR','TAYDENITE','OFFWORLD'][i],35+i*150,111);}
  for(let i=0;i<5;i++)block(ctx,440,230+i*28,28,22,13,'#a19177');
 }else if(region.id==='anur'){
  for(let i=0;i<3;i++){block(ctx,70+i*145,107,40,30,47,'#999582');orb(ctx,90+i*145,122,'#b7a2ca',15);}
  portal(ctx,440,355,'#b6a2da');for(let i=0;i<4;i++)block(ctx,30,250+i*35,25,18,18,'#a2ab8a');
 }else if(region.id==='nullvoid'){
  portal(ctx,100,126,'#d9998b');consoleProp(ctx,355,111,'#e59b85');for(let i=0;i<4;i++)block(ctx,450,240+i*35,25,25,20+i*3,'#a68e7d');label(ctx,'NO UNAUTHORISED EXITS',250,88);
 }else if(region.id==='lab'){
  for(let i=0;i<3;i++){consoleProp(ctx,45+i*135,123,'#dcb86d');block(ctx,50+i*135,82,34,30,24,'#9eaa8b');orb(ctx,67+i*135,95,['#c1d081','#bc8b9f','#93bbab'][i],14);}
  for(let i=0;i<4;i++)block(ctx,439,230+i*36,24,24,18,'#a3957b');label(ctx,'ANIMO / PSYCHOBOS',224,73);
 }else if(region.id==='multiverse'){
  for(let i=0;i<4;i++)portal(ctx,62+i*115,128,['#8fc8db','#d7a968','#b3a4d8','#b8ed4d'][i]);label(ctx,'TIMELINE INTERCHANGE',220,72);
  block(ctx,430,345,42,37,25,'#a5b6a0');
 }else if(region.id==='forge'){
  block(ctx,195,106,100,80,16,'#a296aa');orb(ctx,245,143,'#cbb9d4',27);for(let i=0;i<4;i++)orb(ctx,60+i*130,100,'#baacd4',6);
  for(let i=0;i<3;i++)block(ctx,430,240+i*50,30,30,30,'#9b8f9c');label(ctx,'CELESTIAL CARTOGRAPHY',256,70);
 }else if(region.id==='arena'){
  tile(ctx,35,100,435,290,'#716f4e');for(let i=0;i<4;i++){tile(ctx,35+i*110,102,4,284,'#aaa979');block(ctx,60+i*110,110,40,20,17,'#b6ad79');}
  label(ctx,'EVOLUTION ENGINE',270,71);
 }else if(region.id==='predators'){
  for(let i=0;i<5;i++)tree(ctx,45+i*100,100,'#819478');for(let i=0;i<3;i++)block(ctx,448,220+i*63,37,32,25,'#929d78');tile(ctx,20,190,45,235,'#779171');label(ctx,'NEMETRIX RESERVE',258,76);
 }
 return canvas;
}
const regionFor=e=>{
 if(e.region)return e.region;
 if(e.kind==='predator')return 'predators';if(e.kind==='ultimate'||e.kind==='fusion')return 'arena';if(e.kind==='supplemental')return 'galvan';
 if(['ghost','mummy','wolf','vampire','eyes'].includes(e.shape))return 'anur';if(['cosmic','planet','giant','clock'].includes(e.shape))return 'forge';
 return e.era==='classic'?'camp':e.era==='af'?'bellwood':e.era==='ua'?'plumbers':'undertown';
};
export class World {
 constructor(canvas,{onSelect,onRegion,onTransformDone}={}){
  this.canvas=canvas;this.ctx=canvas.getContext('2d');this.onSelect=onSelect;this.onRegion=onRegion;this.onTransformDone=onTransformDone;
  this.camera={x:0,y:0,zoom:.7};this.reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;this.paused=this.reducedMotion;this.time=0;this.last=0;this.active=null;this.hover=null;this.pointer=new Map();this.hit=[];this.showLabels=false;this.region='bellwood';
  this.layers=regions.map(r=>({r,canvas:background(r),origin:iso(r.x*STEP_X,r.y*STEP_Y)}));
  const counts={};this.actors=allEntries.map(e=>{const regionId=regionFor(e),r=regions.find(r=>r.id===regionId);const i=counts[regionId]??0;counts[regionId]=i+1;const col=i%6,row=Math.floor(i/6);const pos=iso(r.x*STEP_X+75+col*73,r.y*STEP_Y+208+row*43);return {entry:e,region:regionId,x:pos.x,y:pos.y,scale:e.kind==='character'||e.kind==='ben'?.67:.63};});
  this.actors.sort((a,b)=>a.y-b.y);
  this.resize=()=>{const r=canvas.getBoundingClientRect();this.width=r.width;this.height=r.height;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=r.width*dpr;canvas.height=r.height*dpr;this.dpr=dpr;this.draw();};
  this.observer=new ResizeObserver(this.resize);this.observer.observe(canvas);this.resize();
  canvas.addEventListener('pointerdown',e=>this.down(e));canvas.addEventListener('pointermove',e=>this.move(e));canvas.addEventListener('pointerup',e=>this.up(e));canvas.addEventListener('pointercancel',e=>this.up(e,true));canvas.addEventListener('lostpointercapture',e=>this.pointer.delete(e.pointerId));
  canvas.addEventListener('wheel',e=>{e.preventDefault();const r=canvas.getBoundingClientRect();this.zoomBy(Math.exp(-e.deltaY*.001),e.clientX-r.left,e.clientY-r.top);},{passive:false});
  this.frame=t=>{const dt=Math.min((t-this.last)/1000||0,.05);this.last=t;if(!this.paused&&!document.hidden)this.time+=dt;this.draw();this.raf=requestAnimationFrame(this.frame);};this.raf=requestAnimationFrame(this.frame);
  this.focusRegion('bellwood',false);
 }
 screen(p){return {x:(p.x-this.camera.x)*this.camera.zoom+this.width/2,y:(p.y-this.camera.y)*this.camera.zoom+this.height/2};}
 world(x,y){return {x:(x-this.width/2)/this.camera.zoom+this.camera.x,y:(y-this.height/2)/this.camera.zoom+this.camera.y};}
 zoomBy(factor,x=this.width/2,y=this.height/2){const before=this.world(x,y);this.camera.zoom=Math.max(.22,Math.min(2.8,this.camera.zoom*factor));const after=this.world(x,y);this.camera.x+=before.x-after.x;this.camera.y+=before.y-after.y;this.constrain();}
 constrain(){this.camera.x=Math.max(-1850,Math.min(2500,this.camera.x));this.camera.y=Math.max(-300,Math.min(2300,this.camera.y));}
 fit(){const top=iso(0,0),right=iso(STEP_X*3+ROOM_W,0),left=iso(0,STEP_Y*2+ROOM_H),bottom=iso(STEP_X*3+ROOM_W,STEP_Y*2+ROOM_H);this.camera.zoom=Math.max(.22,Math.min(this.width/(right.x-left.x+240),this.height/(bottom.y-top.y+190)));this.camera.x=(right.x+left.x)/2;this.camera.y=bottom.y/2-20;}
 focusRegion(id,notify=true){const r=regions.find(r=>r.id===id);if(!r)return;this.region=id;const p=iso(r.x*STEP_X+ROOM_W/2,r.y*STEP_Y+ROOM_H/2);this.camera.x=p.x;this.camera.y=p.y-30;this.camera.zoom=Math.min(this.width/930,this.height/540,1.55);this.camera.zoom=Math.max(.4,this.camera.zoom);if(notify)this.onRegion?.(id);}
 focusEntry(id){const a=this.actors.find(a=>a.entry.id===id);if(!a)return;this.active=id;this.camera.x=a.x;this.camera.y=a.y-25;this.camera.zoom=Math.max(.85,Math.min(this.width/760,1.5));this.region=a.region;this.onRegion?.(a.region);}
 transform(entry,accent,wielder){this.transformation={entry,accent,wielder,start:performance.now(),done:false};this.transformed=entry;this.accent=accent;this.playerMode=wielder?.device==='ultimateben';const r=regions.find(r=>r.id===this.region);this.player=iso(r.x*STEP_X+ROOM_W/2,r.y*STEP_Y+ROOM_H/2+8);this.camera.x=this.player.x;this.camera.y=this.player.y-35;this.camera.zoom=Math.max(.65,Math.min(this.width/880,1.2));}
 get distance(){const values=[...this.pointer.values()];return values.length>1?Math.hypot(values[0].x-values[1].x,values[0].y-values[1].y):0;}
 down(e){this.canvas.setPointerCapture(e.pointerId);const r=this.canvas.getBoundingClientRect();const p={x:e.clientX-r.left,y:e.clientY-r.top,startX:e.clientX,startY:e.clientY,moved:false};this.pointer.set(e.pointerId,p);this.pinchDistance=this.distance;this.dragging=true;}
 move(e){const r=this.canvas.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,p=this.pointer.get(e.pointerId);if(p){const dx=x-p.x,dy=y-p.y;p.moved||=Math.hypot(e.clientX-p.startX,e.clientY-p.startY)>6;p.x=x;p.y=y;if(this.pointer.size>1){for(const pointer of this.pointer.values())pointer.moved=true;const dist=this.distance,values=[...this.pointer.values()];if(this.pinchDistance>0)this.zoomBy(dist/this.pinchDistance,(values[0].x+values[1].x)/2,(values[0].y+values[1].y)/2);this.pinchDistance=dist;}else{this.camera.x-=dx/this.camera.zoom;this.camera.y-=dy/this.camera.zoom;this.constrain();}}else{this.hover=this.pick(x,y);this.canvas.style.cursor=this.hover?'pointer':'grab';}}
 pick(x,y){let nearest=null,dist=Infinity;for(const a of this.hit){const d=Math.hypot(x-a.x,(y-a.y)*.75);if(d<Math.max(15,24*this.camera.zoom)&&d<dist){nearest=a;dist=d;}}return nearest;}
 up(e,cancelled=false){const p=this.pointer.get(e.pointerId);if(p&&!p.moved&&!cancelled){const hit=this.pick(p.x,p.y);if(hit){this.active=hit.entry.id;this.onSelect?.(hit.entry);}}this.pointer.delete(e.pointerId);this.dragging=this.pointer.size>0;this.pinchDistance=this.distance;}
 draw(){
  if(!this.width||!this.height)return;const ctx=this.ctx,z=this.camera.zoom;ctx.setTransform(this.dpr,0,0,this.dpr,0,0);ctx.clearRect(0,0,this.width,this.height);
  ctx.save();ctx.translate(this.width/2,this.height/2);ctx.scale(z,z);ctx.translate(-this.camera.x,-this.camera.y);
  for(const layer of this.layers){const {origin,r}=layer;const s=this.screen(origin);if(s.x+600*z<0||s.x-650*z>this.width||s.y+620*z<0||s.y-150*z>this.height)continue;ctx.drawImage(layer.canvas,origin.x-460,origin.y-112);if(this.region===r.id){ctx.strokeStyle='#bad881';ctx.lineWidth=2/z;ctx.setLineDash([6/z,8/z]);ctx.beginPath();[iso(r.x*STEP_X,r.y*STEP_Y),iso(r.x*STEP_X+ROOM_W,r.y*STEP_Y),iso(r.x*STEP_X+ROOM_W,r.y*STEP_Y+ROOM_H),iso(r.x*STEP_X,r.y*STEP_Y+ROOM_H)].forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();ctx.stroke();ctx.setLineDash([]);}}
  this.hit=[];
  for(const actor of this.actors){const s=this.screen(actor);if(s.x<-60||s.x>this.width+60||s.y<-10||s.y>this.height+120)continue;ctx.save();ctx.translate(actor.x,actor.y);drawSprite(ctx,actor.entry,this.time,{scale:actor.scale,active:this.active===actor.entry.id,accent:actor.entry.device?actor.entry.color:'#b8ed4d',effects:z>.4});ctx.restore();this.hit.push({...actor,x:s.x,y:s.y-25*actor.scale*z});
   if(this.showLabels&&z>.6){ctx.font=`${10/z}px monospace`;ctx.textAlign='center';ctx.fillStyle='#e7efd7';ctx.fillText(actor.entry.name,actor.x,actor.y+14/z);}
  }
  if(this.transformed&&this.player){const age=this.transformation?(performance.now()-this.transformation.start)/1000:2;const before=age<.45&&!this.reducedMotion;ctx.save();ctx.translate(this.player.x,this.player.y);const figure=before?(this.transformation.wielder??bens[0]):this.playerMode?bens.find(b=>b.device==='ultimateben'):this.transformed;drawSprite(ctx,figure,this.time,{scale:.92,active:true,accent:this.accent});if(this.playerMode&&!before){ctx.globalAlpha=.3;drawSprite(ctx,this.transformed,this.time,{scale:1.3,accent:this.accent,shadow:false});ctx.globalAlpha=1;}ctx.restore();}
  if(this.transformation){const age=(performance.now()-this.transformation.start)/1000;if(age<1.4&&!this.reducedMotion){const p=this.player,progress=age/1.4;ctx.save();ctx.translate(p.x,p.y-30);ctx.strokeStyle=this.transformation.accent;ctx.globalAlpha=1-progress;for(let i=0;i<3;i++){ctx.lineWidth=(5-i);ctx.beginPath();ctx.ellipse(0,0,20+progress*95+i*12,35+progress*85+i*14,0,0,Math.PI*2);ctx.stroke();}ctx.restore();}else if((age>=1.4||this.reducedMotion)&&!this.transformation.done){this.transformation.done=true;this.onTransformDone?.(this.transformed);}}
  ctx.restore();
  if(this.hover&&!this.dragging){const name=this.hover.entry.name;ctx.font='600 12px system-ui';const width=ctx.measureText(name).width+24;const x=Math.max(8,Math.min(this.width-width-8,this.hover.x-width/2));const y=Math.max(12,this.hover.y-50);ctx.fillStyle='#edf1d9';ctx.beginPath();ctx.roundRect(x,y,width,30,5);ctx.fill();ctx.fillStyle='#223b2b';ctx.fillText(name,x+12,y+20);}
 }
 destroy(){cancelAnimationFrame(this.raf);this.observer.disconnect();}
}
