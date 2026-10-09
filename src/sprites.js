import {spriteManifest,sheetFiles} from './sprite-manifest.js';
import {landscapeManifest} from './art-manifest.js';
import {aliens} from './data.js';
import {activityFor} from './scenes.js';
import {activityPose,drawActivity} from './animation.js';
const sheets=new Map(),pending=new Map(),thumbnails=new Map();
export const spriteFor=e=>spriteManifest[typeof e==='string'?e:e.id];
export const hasSprite=e=>Boolean(spriteFor(e));
export const spriteCount=()=>Object.keys(spriteManifest).length;
export const spriteReady=e=>sheets.has(spriteFor(e)?.sheet);
function ensureSheet(id){
 if(sheets.has(id))return Promise.resolve(id);
 if(pending.has(id))return pending.get(id);
 if(!sheetFiles[id])return Promise.reject(new Error(`Unknown artwork sheet ${id}`));
 const promise=new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>{sheets.set(id,im);resolve(id);};im.onerror=()=>{pending.delete(id);reject(new Error(`Could not load ${sheetFiles[id]}`));};im.src=new URL(`../assets/${sheetFiles[id]}`,import.meta.url).href;});pending.set(id,promise);return promise;
}
export async function requestSpriteAssets(entries){
 const ids=new Set(entries.map(spriteFor).filter(Boolean).map(s=>s.sheet));
 const result=await Promise.allSettled([...ids].map(ensureSheet));
 return result.filter(r=>r.status==='rejected').map(r=>r.reason.message);
}
export async function loadSpriteAssets(entries=[]){
 const backdrops=['environment',...new Set(Object.values(landscapeManifest).map(s=>s.sheet))];
 const result=await Promise.allSettled(backdrops.map(ensureSheet));
 return [...result.filter(r=>r.status==='rejected').map(r=>r.reason.message),...await requestSpriteAssets(entries)];
}
export function backdropFor(theme){
 const s=theme==='camp'?{sheet:'environment'}:landscapeManifest[theme];
 return s&&sheets.has(s.sheet)?{image:sheets.get(s.sheet),rect:s.rect}:null;
}
export function hourglass(c,x,y,s=8,color='#b8ed4d'){
 c.save();c.translate(x,y);c.fillStyle='#102719';c.beginPath();c.arc(0,0,s,0,Math.PI*2);c.fill();c.fillStyle=color;c.beginPath();c.moveTo(-s*.6,-s*.6);c.lineTo(s*.6,-s*.6);c.lineTo(s*.15,0);c.lineTo(s*.6,s*.6);c.lineTo(-s*.6,s*.6);c.lineTo(-s*.15,0);c.closePath();c.fill();c.restore();
}
export function drawSprite(c,e,time=0,{scale=1,accent='#b8ed4d',shadow=true,active=false,effects=true,moving=true}={}){
 const s=spriteFor(e),im=s&&sheets.get(s.sheet);
 if(!im){
  if(e.components&&e.continuity==='Fan simulation'){c.save();c.translate(-35*scale,0);drawSprite(c,aliens.find(a=>a.id===e.components[0]),time,{scale:scale*.65,accent,shadow,active,effects,moving});c.translate(70*scale,0);drawSprite(c,aliens.find(a=>a.id===e.components[1]),time,{scale:scale*.65,accent,shadow,active,effects,moving});c.restore();}
  return;
 }
 const profile=activityFor(e),p=moving?activityPose(profile,time,e.id):{phase:0,x:0,y:0,rotation:0,scaleX:1,scaleY:1,alpha:1};
 const count=s.frames.length,index=s.fps?Math.floor(p.phase*count)%count:0;
 const [sx,sy,sw,sh]=s.frames[index],ratio=(s.height??145)/(s.referenceHeight??sh),anchor=s.anchors?.[index]??[sw/2,sh];
 c.save();c.scale(scale,scale);c.imageSmoothingEnabled=false;
 if(shadow){c.fillStyle='#07181155';c.beginPath();c.ellipse(p.x,3,Math.min(sw*ratio*.3,39),7,0,0,Math.PI*2);c.fill();}
 if(active){c.strokeStyle=accent;c.lineWidth=2;c.beginPath();c.ellipse(p.x,3,42,13,0,0,Math.PI*2);c.stroke();}
 if(effects)drawActivity(c,e,profile,time,{front:false});
 c.save();c.translate(p.x,p.y);c.rotate(p.rotation);c.scale(p.scaleX,p.scaleY);c.globalAlpha*=p.alpha;
 if(profile.motion==='split'&&effects){const f=Math.sin(p.phase*Math.PI)**2;c.save();c.globalAlpha*=f*.75;c.drawImage(im,sx,sy,sw,sh,-anchor[0]*ratio-42*f,-anchor[1]*ratio,sw*ratio,sh*ratio);c.drawImage(im,sx,sy,sw,sh,-anchor[0]*ratio+42*f,-anchor[1]*ratio,sw*ratio,sh*ratio);c.restore();}
 c.drawImage(im,sx,sy,sw,sh,-anchor[0]*ratio,-anchor[1]*ratio,sw*ratio,sh*ratio);c.restore();
 if(effects)drawActivity(c,e,profile,time,{front:true});c.restore();
}
export function drawReference(c,e,time=0,scale=1){
 c.save();c.scale(scale,scale);c.fillStyle='#14292f';c.fillRect(-39,-112,78,103);c.strokeStyle='#789b6a';c.lineWidth=2;c.strokeRect(-39,-112,78,103);hourglass(c,0,-78,17,'#99b69a');c.fillStyle='#a8d29b';c.fillRect(-29,-44,58,2);c.fillRect(-29,-32,20+(Math.sin(time)*.5+.5)*33,3);c.fillStyle='#809387';c.font='8px monospace';c.textAlign='center';c.fillText('DESIGN UNSEEN',0,-17);c.fillStyle='#34564c';c.fillRect(-28,-8,56,8);c.restore();
}
export function motionLabel(e){return hasSprite(e)?activityFor(e).label:'Unseen / concept design · animated archive record';}
const waiting='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="220" height="200"><rect width="220" height="200" fill="#132d24"/><text x="110" y="105" text-anchor="middle" fill="#b5d591" font-family="monospace" font-size="13">Loading artwork…</text></svg>');
export function thumbnail(e,accent='#b8ed4d'){
 if(hasSprite(e)&&!spriteReady(e))return waiting;
 const key=`${e.id}-${accent}`;if(thumbnails.has(key))return thumbnails.get(key);const canvas=document.createElement('canvas');canvas.width=220;canvas.height=200;const c=canvas.getContext('2d');c.translate(110,185);
 if(hasSprite(e)||e.components)drawSprite(c,e,0,{scale:170/(spriteFor(e)?.height??145),accent,shadow:false,effects:false,moving:false});else drawReference(c,e,0,1.25);
 const url=canvas.toDataURL();thumbnails.set(key,url);return url;
}
export async function populateThumbnail(img,e,accent='#b8ed4d'){
 img.src=thumbnail(e,accent);if(!hasSprite(e)||spriteReady(e))return;
 const errors=await requestSpriteAssets([e]);if(!errors.length&&img.isConnected)img.src=thumbnail(e,accent);
}
export function sceneThumbnail(scene){
 const bg=backdropFor(scene.theme);if(!bg)return waiting;const canvas=document.createElement('canvas');canvas.width=300;canvas.height=220;const c=canvas.getContext('2d');
 if(bg.rect)c.drawImage(bg.image,...bg.rect,0,0,300,220);else c.drawImage(bg.image,0,0,300,220);
 return canvas.toDataURL('image/webp',.8);
}
