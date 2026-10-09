import {allEntries,bens} from './data.js';
import {scenes,sceneFor,activityFor} from './scenes.js';
import {drawSprite,drawReference,backdropFor,hasSprite,spriteFor,requestSpriteAssets} from './sprites.js';
import {activityPose,drawScenery} from './animation.js';
import {Transformation} from './transformation.js';
export const iso=(u,v,z=0)=>({x:(u-v)*.86,y:(u+v)*.43-z});
export const W=1300,H=975,SX=1380,SY=1055;
const origin=r=>({x:r.x*SX,y:r.y*SY});
const placements={'ben-classic-ben':[.47,.53,1.05],'cast-gwen-tennyson':[.63,.50,1.03],'cast-grandpa-max':[.19,.68,.92],'cast-kevin-levin':[.68,.31,.9],heatblast:[.39,.71,1.08],'four-arms':[.72,.68,1.08],xlr8:[.52,.82,.94],wildmutt:[.29,.47,.9],diamondhead:[.84,.47,.96]};
export class World{
 constructor(canvas,{onSelect,onRegion,onTransformDone,onTransformCancel,onLoading}={}){
  Object.assign(this,{canvas,ctx:canvas.getContext('2d'),onSelect,onRegion,onTransformDone,onTransformCancel,onLoading,camera:{x:W/2,y:H/2,zoom:1},time:0,last:0,active:null,hover:null,region:'camp',showLabels:true,hit:[],pointer:new Map(),overview:false,transaction:new Transformation(),navigation:0,warming:new Set()});
  this.reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;this.paused=this.reducedMotion;
  this.layers=scenes.map(r=>({r,origin:origin(r)}));this.bounds={width:Math.max(...scenes.map(r=>r.x))*SX+W,height:Math.max(...scenes.map(r=>r.y))*SY+H};
  this.actors=scenes.flatMap(r=>r.entries.map((id,i)=>{const entry=allEntries.find(e=>e.id===id),o=origin(r);let x,y,scale=1.3;
   if(r.id==='camp'&&placements[id]){const p=placements[id];[x,y,scale]=[p[0]*W,p[1]*H,p[2]];}
   else{const count=r.entries.length,cols=count<=2?count:count<=4?2:3,rows=Math.ceil(count/cols),col=i%cols,row=Math.floor(i/cols);x=cols===1?W*.5:cols===2?400+col*500:320+col*330;y=rows===1?H*.68:rows===2?520+row*270:480+row*170;if(row%2)x-=35;}
   return {entry,region:r.id,x:o.x+x,y:o.y+y,scale};})).sort((a,b)=>a.y-b.y);
  this.resize=()=>{const r=canvas.getBoundingClientRect();this.width=r.width;this.height=r.height;this.dpr=Math.min(devicePixelRatio||1,2);canvas.width=r.width*this.dpr;canvas.height=r.height*this.dpr;this.draw();};this.observer=new ResizeObserver(this.resize);this.observer.observe(canvas);this.resize();this.setFocus('camp',false);
  canvas.addEventListener('pointerdown',e=>this.down(e));canvas.addEventListener('pointermove',e=>this.move(e));canvas.addEventListener('pointerup',e=>this.up(e));canvas.addEventListener('pointercancel',e=>this.up(e,true));canvas.addEventListener('lostpointercapture',e=>this.pointer.delete(e.pointerId));
  canvas.addEventListener('wheel',e=>{e.preventDefault();const r=canvas.getBoundingClientRect();this.zoomBy(Math.exp(-e.deltaY*.001),e.clientX-r.left,e.clientY-r.top);},{passive:false});
  this.frame=t=>{const dt=this.last?Math.min((t-this.last)/1000,.05):0;this.last=t;if(!this.paused&&!document.hidden)this.time+=dt;const completed=this.transaction.tick(this.time);if(completed)this.onTransformDone?.(completed);this.draw();this.raf=requestAnimationFrame(this.frame);};this.raf=requestAnimationFrame(this.frame);
 }
 screen(p){return {x:(p.x-this.camera.x)*this.camera.zoom+this.width/2,y:(p.y-this.camera.y)*this.camera.zoom+this.height/2};}
 world(x,y){return {x:(x-this.width/2)/this.camera.zoom+this.camera.x,y:(y-this.height/2)/this.camera.zoom+this.camera.y};}
 zoomBy(f,x=this.width/2,y=this.height/2){const before=this.world(x,y);this.camera.zoom=Math.max(.055,Math.min(3,this.camera.zoom*f));const after=this.world(x,y);this.camera.x+=before.x-after.x;this.camera.y+=before.y-after.y;this.constrain();}
 constrain(){this.camera.x=Math.max(-200,Math.min(this.bounds.width+200,this.camera.x));this.camera.y=Math.max(-200,Math.min(this.bounds.height+200,this.camera.y));}
 cancelTransform(){this.navigation++;this.transaction.cancel();this.onTransformCancel?.();this.player=null;}
 fit(){this.cancelTransform();this.overview=true;this.camera={x:this.bounds.width/2,y:this.bounds.height/2,zoom:Math.min(this.width/(this.bounds.width+180),this.height/(this.bounds.height+180))};return true;}
 setFocus(id,notify=true){const r=scenes.find(r=>r.id===id);if(!r)return false;this.overview=false;this.region=id;const o=origin(r);this.camera={x:o.x+W/2,y:o.y+H*.51,zoom:Math.min(this.width/W,this.height/H)*1.02};if(notify)this.onRegion?.(id);return true;}
 async focusRegion(id,notify=true){const r=scenes.find(r=>r.id===id);if(!r)return false;this.cancelTransform();const token=this.navigation;this.onLoading?.(true);try{const errors=await requestSpriteAssets(r.entries.map(id=>allEntries.find(e=>e.id===id)));if(token!==this.navigation)return false;this.setFocus(id,notify);return !errors.length;}finally{if(token===this.navigation)this.onLoading?.(false);}}
 async focusEntry(id){const a=this.actors.find(a=>a.entry.id===id);if(!a)return false;const ok=await this.focusRegion(a.region);if(!ok)return false;this.active=id;this.camera={x:a.x,y:a.y-95,zoom:Math.min(1.45,Math.max(.5,this.width/860))};return true;}
 transform(entry,accent,wielder){if(!hasSprite(entry)&&entry.continuity!=='Fan simulation')return false;const scene=sceneFor(entry)??scenes.find(r=>r.id===this.region),a=this.actors.find(a=>a.entry.id===entry.id),o=origin(scene);this.setFocus(scene.id);this.player={x:a?.x??o.x+W*.5,y:a?.y??o.y+H*.68,scale:a?.scale??1.3};this.camera={x:this.player.x,y:this.player.y-120,zoom:Math.min(1.3,Math.max(.55,this.width/1100))};this.transaction.begin(entry,wielder??bens[0],accent,this.time,this.paused||this.reducedMotion);return true;}
 revert(){this.cancelTransform();return this.focusEntry('ben-classic-ben');}
 get distance(){const p=[...this.pointer.values()];return p.length>1?Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y):0;}
 down(e){this.canvas.setPointerCapture(e.pointerId);const r=this.canvas.getBoundingClientRect();this.pointer.set(e.pointerId,{x:e.clientX-r.left,y:e.clientY-r.top,startX:e.clientX,startY:e.clientY,moved:false});this.pinchDistance=this.distance;}
 move(e){const r=this.canvas.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,p=this.pointer.get(e.pointerId);if(p){const dx=x-p.x,dy=y-p.y;p.moved||=Math.hypot(e.clientX-p.startX,e.clientY-p.startY)>6;p.x=x;p.y=y;if(this.pointer.size>1){for(const q of this.pointer.values())q.moved=true;const d=this.distance,ps=[...this.pointer.values()];if(this.pinchDistance>0)this.zoomBy(d/this.pinchDistance,(ps[0].x+ps[1].x)/2,(ps[0].y+ps[1].y)/2);this.pinchDistance=d;}else{this.camera.x-=dx/this.camera.zoom;this.camera.y-=dy/this.camera.zoom;this.constrain();const closest=this.layers.reduce((best,l)=>Math.hypot(l.origin.x+W/2-this.camera.x,l.origin.y+H/2-this.camera.y)<Math.hypot(best.origin.x+W/2-this.camera.x,best.origin.y+H/2-this.camera.y)?l:best);if(closest.r.id!==this.region){this.region=closest.r.id;this.onRegion?.(this.region);}}}else{this.hover=this.pick(x,y);this.canvas.style.cursor=this.hover?'pointer':'grab';}}
 pick(x,y){return [...this.hit].reverse().find(a=>x>=a.left&&x<=a.right&&y>=a.top&&y<=a.bottom)??null;}
 up(e,cancelled=false){const p=this.pointer.get(e.pointerId);if(p&&!p.moved&&!cancelled){const hit=this.pick(p.x,p.y);if(hit){this.active=hit.entry.id;this.onSelect?.(hit.entry);}}this.pointer.delete(e.pointerId);this.pinchDistance=this.distance;}
 warm(r){if(this.warming.has(r.id))return;this.warming.add(r.id);requestSpriteAssets(r.entries.map(id=>allEntries.find(e=>e.id===id))).then(errors=>{if(errors.length)this.warming.delete(r.id);});}
 draw(){if(!this.width||!this.height)return;const c=this.ctx,z=this.camera.zoom;c.setTransform(this.dpr,0,0,this.dpr,0,0);c.clearRect(0,0,this.width,this.height);c.save();c.translate(this.width/2,this.height/2);c.scale(z,z);c.translate(-this.camera.x,-this.camera.y);c.imageSmoothingEnabled=false;
  c.fillStyle='#142a27';c.fillRect(-150,-150,this.bounds.width+300,this.bounds.height+300);const visible=new Set();
  for(const l of this.layers){const p=this.screen(l.origin);if(p.x+W*z<0||p.x>this.width||p.y+H*z<0||p.y>this.height)continue;visible.add(l.r.id);if(z>.28)this.warm(l.r);c.save();c.translate(l.origin.x,l.origin.y);const bg=backdropFor(l.r.theme);if(bg?.rect)c.drawImage(bg.image,...bg.rect,0,0,W,H);else if(bg)c.drawImage(bg.image,0,0,W,H);else{c.fillStyle=l.r.palette.ground;c.fillRect(0,0,W,H);}drawScenery(c,l.r,this.time,W,H,z>.3);
   c.fillStyle='#09201fe0';c.fillRect(26,22,Math.min(900,120+l.r.name.length*16),78);c.fillStyle=l.r.color;c.fillRect(26,22,5,78);c.font='bold 24px monospace';c.textAlign='left';c.fillText(l.r.name,48,55);c.font='13px monospace';c.fillStyle='#d5dfcd';c.fillText(l.r.subtitle,48,82);c.restore();
   c.fillStyle='#7cad5966';c.fillRect(l.origin.x+W+24,l.origin.y+40,4,H-80);c.fillRect(l.origin.x+40,l.origin.y+H+26,W-80,4);
  }
  const state=this.transaction.current;this.hit=[];for(const a of this.actors){if(!visible.has(a.region))continue;if(this.player&&state&&[state.entry.id,state.wielder.id].includes(a.entry.id))continue;const pose=activityPose(activityFor(a.entry),this.time,a.entry.id),animated={x:a.x+pose.x*a.scale,y:a.y+pose.y*a.scale},p=this.screen(animated),s=spriteFor(a.entry),h=(s?.height??130)*a.scale*z,w=Math.max(60,(s?.frames[0][2]??90)*(s?.height??145)/(s?.referenceHeight??300)*.5)*a.scale*z;if(p.x<-160||p.x>this.width+160||p.y<0||p.y-h>this.height)continue;c.save();c.translate(a.x,a.y);if(hasSprite(a.entry))drawSprite(c,a.entry,this.time,{scale:a.scale,active:this.active===a.entry.id,effects:z>.3});else drawReference(c,a.entry,this.time,a.scale);c.restore();this.hit.push({...a,left:p.x-w,right:p.x+w,top:p.y-h-25,bottom:p.y+15});
   if(this.showLabels&&z>.28){c.font=`600 ${Math.max(11,10/z)}px monospace`;c.textAlign='center';const tw=c.measureText(a.entry.name).width;c.fillStyle='#071b18db';c.fillRect(a.x-tw/2-7,a.y+13,tw+14,20/z);c.fillStyle='#e6f4d8';c.fillText(a.entry.name,a.x,a.y+27/z);}
  }
  if(this.player&&state){const figure=this.transaction.figure(this.time),age=this.time-state.start;c.save();c.translate(this.player.x,this.player.y);drawSprite(c,figure,this.time,{scale:this.player.scale,active:true,accent:state.accent,effects:state.done});if(!state.done){c.globalAlpha=Math.max(0,1-age/1.1);c.strokeStyle=state.accent;c.lineWidth=5;c.beginPath();c.ellipse(0,-75,30+age*65,70+age*35,0,0,Math.PI*2);c.stroke();}c.restore();}
  c.restore();
  if(this.detail){const canvas=document.getElementById('inspect-animation');if(canvas&&!document.getElementById('inspector').hidden){const d=canvas.getContext('2d');d.clearRect(0,0,280,230);d.save();d.translate(112,216);const s=spriteFor(this.detail),scale=Math.min(1.1,175/(s?.height??140));if(s)drawSprite(d,this.detail,this.time,{scale,shadow:false});else drawReference(d,this.detail,this.time,1.5);d.restore();}}
 }
 destroy(){cancelAnimationFrame(this.raf);this.observer.disconnect();}
}
