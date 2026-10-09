import {spriteManifest,sheetFiles} from './sprite-manifest.js';
import {aliens} from './data.js';
const sheets=new Map(),thumbnails=new Map();
export const spriteFor=e=>spriteManifest[typeof e==='string'?e:e.id];
export const hasSprite=e=>Boolean(spriteFor(e));
export const spriteCount=()=>Object.keys(spriteManifest).length;
export async function loadSpriteAssets(){
 const results=await Promise.allSettled(Object.entries(sheetFiles).map(([id,file])=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>{sheets.set(id,im);resolve(id);};im.onerror=()=>reject(new Error(`Could not load ${file}`));im.src=new URL(`../assets/${file}`,import.meta.url).href;})));
 return results.filter(r=>r.status==='rejected').map(r=>r.reason.message);
}
export const environmentImage=()=>sheets.get('environment');
export function hourglass(c,x,y,s=8,color='#b8ed4d'){c.save();c.translate(x,y);c.fillStyle='#102719';c.beginPath();c.arc(0,0,s,0,Math.PI*2);c.fill();c.fillStyle=color;c.beginPath();c.moveTo(-s*.6,-s*.6);c.lineTo(s*.6,-s*.6);c.lineTo(s*.15,0);c.lineTo(s*.6,s*.6);c.lineTo(-s*.6,s*.6);c.lineTo(-s*.15,0);c.closePath();c.fill();c.restore();}
const airborne=new Set(['stinkfly','ghostfreak','jetray','big-chill','nanomech','ampfibian','pesky-dust','astrodactyl','whampire','ultimate-big-chill','cast-zs-skayr','cast-synaptak','cast-verdona']);
const runners=new Set(['xlr8','fasttrack','cast-helen-wheels','crashhopper']);
const electric=new Set(['buzzshock','frankenstrike','ampfibian','shocksquatch','feedback','brainstorm']);
const icy=new Set(['big-chill','arctiguana','ultimate-big-chill','ultimate-arctiguana']);
const cosmic=new Set(['alien-x','gravattack','ultimate-gravattack','atomix','atomic-x','cast-verdona']);
const mana=new Set(['cast-gwen-tennyson','cast-charmcaster','cast-hex','cast-sunny']);
function powerEffects(c,e,t){const id=e.id;c.save();c.lineWidth=2;c.globalAlpha=.7;
 if(electric.has(id)){c.strokeStyle='#c3f6ff';for(let k=0;k<3;k++){c.beginPath();for(let i=0;i<7;i++){const x=-42+i*14,y=-77+k*10+Math.sin(t*9+i*2+k)*7;i?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();}}
 else if(cosmic.has(id)){for(let k=0;k<5;k++){const a=t*.7+k*Math.PI*.4;c.fillStyle=k%2?'#baf34a':'#dfc2ff';c.fillRect(Math.cos(a)*64,-78+Math.sin(a)*27,4+k%2,4+k%2);}}
 else if(icy.has(id)||id==='gutrot'||id==='pesky-dust'){for(let k=0;k<9;k++){const f=(t*.3+k*.13)%1;c.globalAlpha=1-f;c.fillStyle=icy.has(id)?'#c3ecff':id==='gutrot'?'#96d263':'#e9b9ff';c.fillRect(35+f*50,-60-Math.sin(k*3)*18-f*28,3,3);}}
 else if(mana.has(id)&&!spriteFor(e)?.fps){c.strokeStyle='#ff91dc';c.beginPath();c.ellipse(0,-80,65,25,t*.3,0,Math.PI*2);c.stroke();}
 else if(['diamondhead','wildvine','swampfire'].includes(id)){const h=12+(Math.sin(t*1.3)+1)*9;c.fillStyle=id==='diamondhead'?'#87e5d2':'#82a948';for(let k=0;k<3;k++){c.beginPath();c.moveTo(48+k*9,0);c.lineTo(52+k*9,-h-k*4);c.lineTo(59+k*9,0);c.fill();}}
 else if(id==='water-hazard'){c.strokeStyle='#92dcff';for(let k=0;k<3;k++){c.beginPath();c.arc(45+k*18,-58+Math.sin(t*4+k)*8,6,0,Math.PI);c.stroke();}}
 else if(['echo-echo','ultimate-echo-echo','blitzwolfer'].includes(id)){c.strokeStyle='#c1f791';for(let k=0;k<3;k++){const f=(t*.6+k/3)%1;c.globalAlpha=1-f;c.beginPath();c.arc(0,-93,28+f*50,-.8,.8);c.stroke();}}
 c.restore();}
export function drawSprite(c,e,time=0,{scale=1,accent='#b8ed4d',shadow=true,active=false,effects=true}={}){
 const s=spriteFor(e),im=s&&sheets.get(s.sheet);if(!im){if(e.components&&e.continuity==='Fan simulation'){c.save();c.translate(-32*scale,0);drawSprite(c,aliens.find(a=>a.id===e.components[0]),time,{scale:scale*.65,accent,shadow,active,effects});c.translate(64*scale,0);drawSprite(c,aliens.find(a=>a.id===e.components[1]),time,{scale:scale*.65,accent,shadow,active,effects});c.restore();}return;}
 const hash=[...e.id].reduce((a,x)=>a+x.charCodeAt(0),0),t=time+hash*.021,index=s.fps?Math.floor(time*s.fps+hash%4)%s.frames.length:0;
 const [sx,sy,sw,sh]=s.frames[index],ratio=(s.height??140)/(s.referenceHeight??sh),w=sw*ratio,h=sh*ratio;
 const lift=airborne.has(e.id)?9+Math.sin(t*2)*7:runners.has(e.id)?Math.abs(Math.sin(t*6))*6:Math.sin(t*2)*1.2,dx=runners.has(e.id)?Math.sin(t*1.1)*22:0;
 c.save();c.scale(scale,scale);c.imageSmoothingEnabled=false;
 if(shadow){c.fillStyle='#07181170';c.beginPath();c.ellipse(dx,3,Math.min(w*.35,40),8,0,0,Math.PI*2);c.fill();}
 if(active){c.strokeStyle=accent;c.lineWidth=2;c.beginPath();c.ellipse(0,2,50,17,0,0,Math.PI*2);c.stroke();}
 c.translate(dx,-lift);if(['chamalien','ghostfreak'].includes(e.id))c.globalAlpha=.7+.25*Math.sin(t*1.4);
 c.drawImage(im,sx,sy,sw,sh,-w/2,-h,w,h);if(effects)powerEffects(c,e,t);c.restore();
}
export function motionLabel(e){const s=spriteFor(e);return s?.action??(s?'Ambient sprite loop · floating, breathing or power effects':'Sprite artwork pending · reference entry');}
export function thumbnail(e,accent='#b8ed4d'){
 const key=`${e.id}-${accent}`;if(thumbnails.has(key))return thumbnails.get(key);const canvas=document.createElement('canvas');canvas.width=220;canvas.height=200;const c=canvas.getContext('2d');c.translate(110,185);
 if(hasSprite(e)||e.components)drawSprite(c,e,0,{scale:175/(spriteFor(e)?.height??140),accent,shadow:false,effects:false});else{hourglass(c,0,-75,24,'#748967');c.textAlign='center';c.font='12px monospace';c.fillStyle='#809675';c.fillText('REFERENCE ONLY',0,-28);}
 const url=canvas.toDataURL();thumbnails.set(key,url);return url;
}
