import {allEntries,aliens,bens,regions} from './data.js';
import {drawSprite,environmentImage,hasSprite,spriteFor} from './sprites.js';
export const iso=(u,v,z=0)=>({x:(u-v)*.86,y:(u+v)*.43-z});
const W=1300,H=975,SX=1530,SY=1180;
const origin=r=>({x:r.x*SX,y:r.y*SY});
const featured=['ben-classic-ben','cast-gwen-tennyson','cast-grandpa-max','cast-kevin-levin','heatblast','four-arms','xlr8','wildmutt','diamondhead'];
const placements={
 'ben-classic-ben':[.47,.53,1.05],'cast-gwen-tennyson':[.63,.50,1.03],'cast-grandpa-max':[.19,.68,.92],'cast-kevin-levin':[.68,.31,.9],
 heatblast:[.39,.71,1.08],'four-arms':[.72,.68,1.08],xlr8:[.52,.82,.94],wildmutt:[.29,.47,.9],diamondhead:[.84,.47,.96]
};
function districtFor(e){
 if(featured.includes(e.id))return 'camp';if(e.id==='cast-vilgax')return 'nullvoid';
 if(e.region==='camp')return 'bellwood';if(e.region)return e.region;
 if(e.kind==='predator')return 'predators';if(e.kind==='ultimate'||e.kind==='fusion')return 'arena';
 if(e.kind==='supplemental')return 'galvan';if(['ghost','mummy','wolf','vampire','eyes'].includes(e.shape))return 'anur';
 if(['cosmic','planet','giant','clock'].includes(e.shape))return 'forge';
 return e.era==='classic'?'galvan':e.era==='af'?'bellwood':e.era==='ua'?'plumbers':'undertown';
}
function districtBackdrop(r){const canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;const c=canvas.getContext('2d');
 c.fillStyle='#132b27';c.fillRect(0,0,W,H);c.fillStyle=r.color+'18';c.fillRect(20,20,W-40,H-40);
 // Generous activity bays keep the sprites readable at district zoom.
 for(let y=165;y<H-65;y+=60)for(let x=40;x<W-40;x+=90){c.fillStyle=((x/90+y/60)&1)?'#24443b':'#294b40';c.fillRect(x,y,86,56);c.fillStyle='#5a776233';c.fillRect(x,y,86,2);}
 c.fillStyle='#071d19';c.fillRect(20,20,W-40,130);c.fillStyle=r.color;c.fillRect(20,20,5,130);c.font='bold 29px monospace';c.fillText(r.name.toUpperCase(),55,73);c.font='15px monospace';c.fillStyle='#b7cabb';c.fillText(r.subtitle,55,108);
 for(let i=0;i<8;i++){const x=790+i*48;c.fillStyle=i%3?r.color:'#496c5e';c.fillRect(x,58,30,30);c.fillStyle='#12332a';c.fillRect(x+7,65,16,16);}
 // Different functional props for each district, positioned outside actor bays.
 for(let i=0;i<5;i++){const x=60+i*242;c.fillStyle='#102d25';c.fillRect(x,H-61,200,26);c.fillStyle=r.color;c.fillRect(x+12,H-55,65,4);c.fillStyle='#a6cfa9';c.fillRect(x+12,H-46,24,2);}
 c.fillStyle=r.color+'55';c.fillRect(20,H-20,W-40,3);return canvas;}
export class World{
 constructor(canvas,{onSelect,onRegion,onTransformDone}={}){
  Object.assign(this,{canvas,ctx:canvas.getContext('2d'),onSelect,onRegion,onTransformDone,camera:{x:0,y:0,zoom:1},time:0,last:0,active:null,hover:null,region:'camp',showLabels:true,hit:[],pointer:new Map(),overview:false});
  this.reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;this.paused=this.reducedMotion;
  this.layers=regions.map(r=>({r,origin:origin(r),canvas:districtBackdrop(r)}));
  const counts={};this.actors=allEntries.filter(hasSprite).map(e=>{const region=districtFor(e),r=regions.find(r=>r.id===region),o=origin(r);let x,y,scale=.87;
   if(placements[e.id]){const p=placements[e.id];[x,y,scale]=[p[0]*W,p[1]*H,p[2]];}
   else{const i=counts[region]??0;counts[region]=i+1;const col=i%6,row=Math.floor(i/6);x=105+col*214+(row%2)*18;y=335+row*173;}
   return {entry:e,region,x:o.x+x,y:o.y+y,scale};
  }).sort((a,b)=>a.y-b.y);
  this.resize=()=>{const r=canvas.getBoundingClientRect();this.width=r.width;this.height=r.height;this.dpr=Math.min(devicePixelRatio||1,2);canvas.width=r.width*this.dpr;canvas.height=r.height*this.dpr;this.draw();};this.observer=new ResizeObserver(this.resize);this.observer.observe(canvas);this.resize();
  canvas.addEventListener('pointerdown',e=>this.down(e));canvas.addEventListener('pointermove',e=>this.move(e));canvas.addEventListener('pointerup',e=>this.up(e));canvas.addEventListener('pointercancel',e=>this.up(e,true));canvas.addEventListener('lostpointercapture',e=>this.pointer.delete(e.pointerId));
  canvas.addEventListener('wheel',e=>{e.preventDefault();const r=canvas.getBoundingClientRect();this.zoomBy(Math.exp(-e.deltaY*.001),e.clientX-r.left,e.clientY-r.top);},{passive:false});
  this.frame=t=>{const dt=Math.min((t-this.last)/1000||0,.05);this.last=t;if(!this.paused&&!document.hidden)this.time+=dt;this.draw();this.raf=requestAnimationFrame(this.frame);};this.raf=requestAnimationFrame(this.frame);this.focusRegion('camp',false);
 }
 screen(p){return {x:(p.x-this.camera.x)*this.camera.zoom+this.width/2,y:(p.y-this.camera.y)*this.camera.zoom+this.height/2};}
 world(x,y){return {x:(x-this.width/2)/this.camera.zoom+this.camera.x,y:(y-this.height/2)/this.camera.zoom+this.camera.y};}
 zoomBy(f,x=this.width/2,y=this.height/2){const before=this.world(x,y);this.camera.zoom=Math.max(.12,Math.min(3,this.camera.zoom*f));const after=this.world(x,y);this.camera.x+=before.x-after.x;this.camera.y+=before.y-after.y;this.constrain();}
 constrain(){this.camera.x=Math.max(-300,Math.min(SX*3+W+300,this.camera.x));this.camera.y=Math.max(-300,Math.min(SY*2+H+300,this.camera.y));}
 fit(){if(this.transformation&&!this.transformation.done)return false;this.overview=true;this.camera={x:(SX*3+W)/2,y:(SY*2+H)/2,zoom:Math.min(this.width/(SX*3+W+200),this.height/(SY*2+H+150))};this.transformed=null;}
 focusRegion(id,notify=true){if(this.transformation&&!this.transformation.done)return false;const r=regions.find(r=>r.id===id);if(!r)return;this.overview=false;this.region=id;const o=origin(r);this.camera={x:o.x+W/2,y:o.y+H*.50,zoom:Math.max(.36,Math.min(this.width/W,this.height/H)*1.08)};this.transformed=null;this.transformation=null;if(notify)this.onRegion?.(id);}
 focusEntry(id){if(this.transformation&&!this.transformation.done)return false;const a=this.actors.find(a=>a.entry.id===id);if(!a)return false;this.overview=false;this.transformed=null;this.transformation=null;this.active=id;this.region=a.region;this.camera={x:a.x,y:a.y-100,zoom:Math.min(1.35,Math.max(.8,this.width/900))};this.onRegion?.(a.region);return true;}
 transform(entry,accent,wielder){if(!hasSprite(entry)&&entry.continuity!=='Fan simulation')return false;this.transformation={entry,accent,wielder:wielder??bens.find(b=>b.id==='ben-classic-ben'),start:performance.now(),done:false};this.transformed=entry;this.accent=accent;this.playerMode=wielder?.device==='ultimateben';this.overview=false;const o=origin(regions.find(r=>r.id===this.region));this.player={x:o.x+W*.51,y:o.y+H*.62};this.camera={x:this.player.x,y:this.player.y-130,zoom:Math.min(1.2,Math.max(.7,this.width/1100))};return true;}
 get distance(){const p=[...this.pointer.values()];return p.length>1?Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y):0;}
 down(e){this.canvas.setPointerCapture(e.pointerId);const r=this.canvas.getBoundingClientRect();this.pointer.set(e.pointerId,{x:e.clientX-r.left,y:e.clientY-r.top,startX:e.clientX,startY:e.clientY,moved:false});this.pinchDistance=this.distance;this.dragging=true;}
 move(e){const r=this.canvas.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,p=this.pointer.get(e.pointerId);if(p){const dx=x-p.x,dy=y-p.y;p.moved||=Math.hypot(e.clientX-p.startX,e.clientY-p.startY)>6;p.x=x;p.y=y;if(this.pointer.size>1){for(const q of this.pointer.values())q.moved=true;const d=this.distance,ps=[...this.pointer.values()];if(this.pinchDistance>0)this.zoomBy(d/this.pinchDistance,(ps[0].x+ps[1].x)/2,(ps[0].y+ps[1].y)/2);this.pinchDistance=d;}else{this.camera.x-=dx/this.camera.zoom;this.camera.y-=dy/this.camera.zoom;this.constrain();}}else{this.hover=this.pick(x,y);this.canvas.style.cursor=this.hover?'pointer':'grab';}}
 pick(x,y){return [...this.hit].reverse().find(a=>x>=a.left&&x<=a.right&&y>=a.top&&y<=a.bottom)??null;}
 up(e,cancelled=false){const p=this.pointer.get(e.pointerId);if(p&&!p.moved&&!cancelled){const hit=this.pick(p.x,p.y);if(hit){this.active=hit.entry.id;this.onSelect?.(hit.entry);}}this.pointer.delete(e.pointerId);this.dragging=this.pointer.size>0;this.pinchDistance=this.distance;}
 draw(){if(!this.width||!this.height)return;const c=this.ctx,z=this.camera.zoom;c.setTransform(this.dpr,0,0,this.dpr,0,0);c.clearRect(0,0,this.width,this.height);c.save();c.translate(this.width/2,this.height/2);c.scale(z,z);c.translate(-this.camera.x,-this.camera.y);c.imageSmoothingEnabled=false;
  for(const l of this.layers){if(!this.overview&&l.r.id!==this.region)continue;const p=this.screen(l.origin);if(p.x+W*z<0||p.x>this.width||p.y+H*z<0||p.y>this.height)continue;const im=l.r.id==='camp'?environmentImage():null;c.drawImage(im??l.canvas,l.origin.x,l.origin.y,W,H);}
  this.hit=[];for(const a of this.actors){if(!this.overview&&a.region!==this.region)continue;const p=this.screen(a),h=(spriteFor(a.entry).height??140)*a.scale*z;if(p.x<-140||p.x>this.width+140||p.y<0||p.y-h>this.height)continue;c.save();c.translate(a.x,a.y);if(this.transformed)c.globalAlpha=.3;drawSprite(c,a.entry,this.time,{scale:a.scale,active:this.active===a.entry.id,effects:z>.45});c.restore();this.hit.push({...a,x:p.x,y:p.y,left:p.x-55*a.scale*z,right:p.x+55*a.scale*z,top:p.y-h-12,bottom:p.y+10});
   if(this.showLabels&&z>.4&&!this.transformed){const name=a.entry.name;c.font=`600 ${Math.max(10,11/z)}px monospace`;c.textAlign='center';const tw=c.measureText(name).width;c.fillStyle='#071b18db';c.fillRect(a.x-tw/2-5,a.y+9,tw+10,18/z);c.fillStyle='#e6f4d8';c.fillText(name,a.x,a.y+22/z);}
  }
  if(this.transformed&&this.player){const age=(performance.now()-this.transformation.start)/1000,before=age<.5&&!this.reducedMotion&&!this.paused;const figure=before?this.transformation.wielder:this.playerMode?bens.find(b=>b.device==='ultimateben'):this.transformed;c.save();c.translate(this.player.x,this.player.y);drawSprite(c,figure,this.time,{scale:1.9,active:true,accent:this.accent});if(this.playerMode&&!before){c.globalAlpha=.35;drawSprite(c,this.transformed,this.time,{scale:2.2,accent:this.accent,shadow:false});}if(age<1.1&&!this.reducedMotion&&!this.paused){c.globalAlpha=1-age/1.1;c.fillStyle=this.accent;c.beginPath();c.ellipse(0,-130,100+age*60,170+age*45,0,0,Math.PI*2);c.fill();}c.restore();if((age>=1.1||this.reducedMotion||this.paused)&&!this.transformation.done){this.transformation.done=true;this.onTransformDone?.(this.transformed);}}
  c.restore();
  if(this.detail){const canvas=document.getElementById('inspect-animation');if(canvas&&!document.getElementById('inspector').hidden){const d=canvas.getContext('2d');d.clearRect(0,0,280,230);d.save();d.translate(140,217);const s=spriteFor(this.detail);drawSprite(d,this.detail,this.time,{scale:190/(s?.height??140),shadow:false});d.restore();}}
 }
 destroy(){cancelAnimationFrame(this.raf);this.observer.disconnect();}
}
