// Every action and environmental effect runs on the same pausable world clock.
const TAU=Math.PI*2;
export const hashId=id=>[...id].reduce((h,c)=>(h*31+c.charCodeAt(0))>>>0,7);
export function activityPose(profile,time,id=''){
 const period=profile.period||4,phase=((time/period+hashId(id)%100/100)%1+1)%1;
 const a=phase*TAU,wave=Math.sin(a),pulse=Math.max(0,Math.sin(a));
 const p={phase,x:0,y:0,rotation:0,scaleX:1,scaleY:1,alpha:1,energy:pulse};
 switch(profile.motion){
  case 'run':case 'patrol':p.x=Math.sin(a)*66;p.y=-Math.abs(Math.sin(a*4))*8;p.rotation=Math.cos(a)*.045;break;
  case 'fly':case 'hover':p.x=Math.sin(a)*38;p.y=-28-Math.cos(a)*17;p.rotation=Math.sin(a)*.06;break;
  case 'swim':p.x=Math.sin(a)*58;p.y=-14-Math.cos(a)*12;p.rotation=wave*.13;break;
  case 'roll':p.x=wave*60;p.rotation=a;p.scaleX=p.scaleY=.88;break;
  case 'hop':case 'jump':case 'leap':p.x=wave*36;p.y=-Math.max(0,Math.sin(a))*64;p.rotation=wave*.08;break;
  case 'dig':case 'burrow':p.y=pulse*55;p.scaleY=1-pulse*.32;break;
  case 'vanish':case 'phase':p.alpha=.2+.8*(.5+.5*Math.cos(a));p.y=-wave*12;break;
  case 'grow':p.scaleX=p.scaleY=.8+pulse*.32;break;
  case 'stretch':p.scaleY=1+pulse*.19;p.scaleX=1-pulse*.04;break;
  case 'strike':case 'punch':case 'kick':p.x=pulse*18;p.rotation=pulse*.1;p.scaleY=1-pulse*.035;break;
  case 'repair':case 'build':case 'read':p.rotation=wave*.04;p.y=-pulse*3;break;
  case 'roar':p.rotation=-pulse*.05;p.scaleY=1+pulse*.03;break;
  case 'orbit':case 'levitate':p.y=-12-wave*10;break;
  case 'spin':p.rotation=wave*.13;p.y=-pulse*8;break;
  default:p.rotation=wave*.018;p.y=-pulse*3;
 }
 return p;
}
function ellipse(c,x,y,rx,ry,color){c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.fill();}
function line(c,points,color,width=3){c.strokeStyle=color;c.lineWidth=width;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke();}
function crystal(c,x,y,h,color){c.fillStyle=color;c.beginPath();c.moveTo(x-7,y);c.lineTo(x-5,y-h*.72);c.lineTo(x,y-h);c.lineTo(x+8,y-h*.68);c.lineTo(x+9,y);c.fill();line(c,[[x,y],[x,y-h]],'#e5fffba8',1.5);}
function gear(c,x,y,r,a,color){c.save();c.translate(x,y);c.rotate(a);c.fillStyle=color;for(let k=0;k<8;k++){c.rotate(TAU/8);c.fillRect(r-3,-3,7,6);}ellipse(c,0,0,r,r,color);ellipse(c,0,0,r*.43,r*.43,'#15322b');c.restore();}
function target(c,x=94,y=-28){c.fillStyle='#3d5956';c.fillRect(x-4,y,8,34);ellipse(c,x,y-25,18,27,'#6b7a6b');ellipse(c,x,y-25,11,17,'#d4b073');ellipse(c,x,y-25,4,7,'#52413e');}
export const effectAliases={watch:'hologram',archive:'scanner',bluefire:'fire',freezingfire:'ice',heat:'fire',nuclear:'energy',cosmic:'stars',telekinesis:'gravity',magic:'mana',sparkle:'stars',impact:'target',claw:'claws',spikes:'claws',axe:'target',sword:'target',missile:'beam',mutation:'dna',prototool:'beam',corruption:'electric',hypnosis:'sound',fear:'gas',shadow:'gas',mist:'gas',camouflage:'hologram',drill:'dig',scrap:'metal',stone:'boulder',relic:'hologram',steam:'gas',wave:'sound',broom:'sweep',whistle:'sound',jaw:'tongue',hair:'ribbon',bandage:'ribbon',moustache:'ribbon',tail:'ribbon',tentacle:'ribbon',clone:'hologram'};
export function drawActivity(c,e,profile,time,{front=false,scale=1}={}){
 const p=activityPose(profile,time,e.id),a=p.phase*TAU,power=p.energy,color=profile.color||e.color||'#aaff70',original=profile.prop||'hologram',kind=effectAliases[original]??original;
 c.save();c.scale(scale,scale);c.lineJoin='round';c.lineCap='round';
 if(!front){
  if(['fire','beam','electric','sound','ice','water','plasma','acid','tongue','punch','target','wind'].includes(kind))target(c);
  if(['tools','repair','circuit','scanner','dna','machine','robot','news','map','book'].includes(kind)){
   c.fillStyle='#182e33';c.fillRect(54,-60,68,16);c.fillStyle='#637e74';c.fillRect(57,-44,7,44);c.fillRect(111,-44,7,44);
   c.fillStyle='#28493f';c.fillRect(61,-79,46,17);c.fillStyle=color;c.fillRect(67,-74,18+Math.sin(a)*10,3);
   if(kind==='tools'||kind==='repair'||kind==='machine')gear(c,87,-58,13,a,color);
  }
  if(['weight','boulder','lift','gravity','magnet','orbit'].includes(kind)){
   const float=['gravity','magnet','orbit'].includes(kind);const y=-20-(float?26+Math.sin(a)*21:power*43);
   c.save();c.translate(85,y);c.rotate(float?a:.08*Math.sin(a));c.fillStyle='#6d7c76';c.beginPath();c.moveTo(-19,-9);c.lineTo(-12,-23);c.lineTo(14,-21);c.lineTo(24,-6);c.lineTo(15,11);c.lineTo(-15,13);c.closePath();c.fill();c.fillStyle='#9bad99';c.fillRect(-9,-14,16,3);c.restore();
  }
  if(kind==='vine'||kind==='plant'||kind==='garden'){
   line(c,[[62,0],[61,-15],[73,-34-power*26],[65,-59-power*28]],'#60873c',6);ellipse(c,68,-34-power*25,13,6,'#88b858');ellipse(c,62,-65-power*23,9,9,color);
  }
  if(kind==='crystal')for(let k=0;k<3;k++)crystal(c,64+k*17,0,18+power*(26+k*9),color);
  if(kind==='portal'||kind==='rift'||kind==='clock'){
   c.save();c.translate(83,-70);c.rotate(kind==='clock'?a:0);c.strokeStyle=color;c.lineWidth=5;c.beginPath();c.ellipse(0,0,34,55,0,0,TAU);c.stroke();c.globalAlpha=.25+.2*power;ellipse(c,0,0,29,49,color);c.globalAlpha=1;
   for(let k=0;k<8;k++){const q=a+k*TAU/8;ellipse(c,Math.cos(q)*34,Math.sin(q)*55,3,3,'#e9ffed');}
   if(kind==='clock'){line(c,[[0,-27],[0,0],[17,15]],'#eff7bd',4);}c.restore();
  }
  if(kind==='coins'||kind==='sweep'||kind==='crate'||kind==='metal'){
   for(let k=0;k<5;k++){const x=63+k*10+(kind==='metal'?Math.sin(a+k)*12:0),y=-5-(kind==='coins'?k%2*4:0);c.fillStyle=kind==='coins'?'#dbbb55':'#a9a183';c.fillRect(x,y-7,8,7);}
  }
  if(kind==='web'){line(c,[[0,-190],[-Math.sin(a)*32,-132]],'#d2ece8',2);}
  if(kind==='ring'||kind==='flight'){c.strokeStyle=color;c.lineWidth=4;c.beginPath();c.ellipse(80,-85,22,52,.1,0,TAU);c.stroke();}
  if(kind==='goo'||kind==='slime'||kind==='plasma')ellipse(c,69,-3,18+power*12,6+power*7,color+'88');
  if(kind==='tennis'){line(c,[[64,-49],[110,-39]],'#e5e4cf',3);ellipse(c,88+Math.sin(a)*30,-55-Math.abs(Math.sin(a))*47,4,4,'#d7fb48');}
  if(kind==='grill'){c.fillStyle='#272d29';c.fillRect(62,-32,55,12);line(c,[[66,-20],[61,0]],'#6a7166',4);line(c,[[110,-20],[116,0]],'#6a7166',4);for(let k=0;k<3;k++)line(c,[[73+k*12,-39],[68+k*12+Math.sin(a+k)*5,-62]],'#d9dfc977',2);}
 }else{
  const handY=-75;
  if(kind==='speed'||kind==='scent'){for(let k=0;k<6;k++){const f=(p.phase+k/6)%1;c.globalAlpha=1-f;line(c,[[-15-f*100,-3-k%2*15],[-2-f*100,-3-k%2*15]],color,3);}}
  if(kind==='ribbon'){for(let k=0;k<3;k++){const pts=Array.from({length:10},(_,i)=>[i*12-4,-80-k*12+Math.sin(a*2+i*.5+k)*20]);line(c,pts,color,k===0?5:3);}}
  if(kind==='blocks'){for(let k=0;k<7;k++){const x=65+k%3*15,y=-12-Math.floor(k/3)*14-Math.sin(a+k)*4;c.fillStyle=k%2?'#da3e2a':'#edcc32';c.fillRect(x,y,13,12);}}
  if(kind==='fleet'){for(let k=0;k<3;k++){const q=a+k*2,x=70+Math.sin(q)*40,y=-115+Math.cos(q)*24;c.fillStyle=color;c.fillRect(x,y,17,6);c.fillRect(x+5,y-4,7,4);}}
  if(kind==='banner'){line(c,[[85,0],[85,-115]],'#8f8875',4);c.fillStyle=color;c.beginPath();c.moveTo(86,-114);c.lineTo(118,-108+Math.sin(a)*7);c.lineTo(113,-70+Math.cos(a)*7);c.lineTo(86,-74);c.fill();}
  if(kind==='camera'){c.fillStyle='#395749';c.fillRect(60,-55,31,18);ellipse(c,89,-47,5,6,'#b8d399');if(power>.8){c.fillStyle='#efffd4';c.fillRect(91,-63,10,5);}}
  if(kind==='trophy'){c.save();c.translate(80,-45-Math.sin(a)*6);c.fillStyle='#dbb95d';c.fillRect(-12,-23,24,18);c.fillRect(-3,-5,6,18);c.fillRect(-12,13,24,4);c.restore();}

  if(['fire','plasma','beam','acid'].includes(kind)){
   const x=29+p.phase*91,y=handY+Math.sin(p.phase*Math.PI)*-6;c.globalAlpha=1-p.phase;
   ellipse(c,x,y,kind==='fire'?9:5,kind==='fire'?14:5,color);ellipse(c,x-5,y,4,7,'#fff4ac');line(c,[[x-23,y],[x-8,y]],color,4);
  }else if(kind==='electric'||kind==='circuit'){
   const points=Array.from({length:8},(_,i)=>[25+i*11,handY+Math.sin(a*5+i*2)*9]);c.globalAlpha=.35+power*.65;line(c,points,color,3);
  }else if(kind==='sound'||kind==='wind'){
   for(let k=0;k<3;k++){const f=(p.phase+k/3)%1;c.globalAlpha=1-f;c.strokeStyle=color;c.lineWidth=3;c.beginPath();c.arc(22,-75,12+f*70,-.7,.7);c.stroke();}
  }else if(kind==='water'||kind==='ice'){
   c.globalAlpha=.35+power*.65;line(c,[[28,-75],[61,-68],[94,-53]],color,kind==='water'?7:3);
   for(let k=0;k<7;k++){const f=(p.phase+k/7)%1;ellipse(c,30+f*74,-72+f*25+Math.sin(f*11)*3,kind==='water'?3:2,3,color);}
  }else if(['mana','gravity','orbit','energy','stars','dna','hologram','absorb'].includes(kind)){
   for(let k=0;k<5;k++){const q=a+k*TAU/5,rx=kind==='mana'?42:30;ellipse(c,Math.cos(q)*rx,-84+Math.sin(q)*18,3,3,color);}
   c.strokeStyle=color;c.globalAlpha=.45;c.lineWidth=2;c.beginPath();c.ellipse(0,-84,42,19,0,0,TAU);c.stroke();
   if(kind==='hologram'){c.globalAlpha=.25+.25*power;ellipse(c,25,-95,14,24,color);}
  }else if(kind==='gas'||kind==='dust'||kind==='poison'||kind==='dream'){
   for(let k=0;k<7;k++){const f=(p.phase+k/7)%1;c.globalAlpha=(1-f)*.45;ellipse(c,30+f*71,-69-f*40+Math.sin(k)*12,6+f*9,5+f*8,color);}
  }else if(kind==='tongue'){line(c,[[18,-90],[18+power*77,-82]],'#ffc08b',5);}
  else if(kind==='tools'||kind==='repair'||kind==='build'||kind==='sweep'){
   c.save();c.translate(52,-42);c.rotate(Math.sin(a)*.45);line(c,[[0,0],[12,-25]],kind==='sweep'?'#c6a675':'#b9cbcd',5);if(kind==='sweep'){line(c,[[0,-24],[22,-21]],'#b99863',8);}else gear(c,12,-28,6,a,'#b2c6c7');c.restore();
  }else if(kind==='spark'||kind==='punch'||kind==='target'||kind==='claws'){
   c.globalAlpha=power;for(let k=0;k<6;k++){const q=k*TAU/6;line(c,[[90+Math.cos(q)*7,-56+Math.sin(q)*7],[90+Math.cos(q)*19,-56+Math.sin(q)*19]],color,3);}
  }else if(kind==='sand'||kind==='dig'){for(let k=0;k<8;k++){const f=(p.phase+k/8)%1;c.globalAlpha=1-f;c.fillStyle='#d5ac76';c.fillRect(-28+f*66,-3-Math.sin(f*Math.PI)*33,4,4);}}
  else if(kind==='insects'||kind==='bats'){for(let k=0;k<5;k++){const x=28+Math.cos(a+k)*42,y=-110+Math.sin(a*1.4+k)*25;line(c,[[x-5,y-3*Math.sin(a*10)],[x,y],[x+5,y-3*Math.sin(a*10)]],color,2);}}
  else if(kind==='book'||kind==='map'){c.fillStyle='#bbc8a8';c.fillRect(50,-75,24,16);line(c,[[62,-75],[62,-59]],'#6d826b',2);c.fillStyle=color;c.fillRect(54,-71,14+Math.sin(a)*2,2);}
  else if(kind==='balloon'){line(c,[[42,-66],[58+Math.sin(a)*6,-137]],'#94c29e',1);ellipse(c,58+Math.sin(a)*6,-151,15,20,color);}
 }
 c.restore();return p;
}

// Scene decorations use the same clock as actors: pausing never leaves a conveyor,
// snow field, portal or smoke plume running in the background.
export function drawScenery(c,scene,t,width,height,detail=true){
 const theme=scene.theme,p=scene.palette??{},color=p.accent||'#9ed35c',seed=hashId(scene.id),a=t*.55+seed*.001;
 c.save();c.lineCap='round';
 if(['space','multiverse','nullvoid'].includes(theme)){
  for(let k=0;k<12;k++){const q=a+k*.52,x=width*.5+Math.cos(q)*(width*.38),y=height*.22+Math.sin(q)*height*.16;ellipse(c,x,y,3+k%3,2+k%2,k%2?color:'#c8e2ff');}
  c.strokeStyle=color;c.lineWidth=4;c.globalAlpha=.65;const x=width*.86,y=height*.26;c.beginPath();c.ellipse(x,y,45+Math.sin(a)*8,80+Math.sin(a)*11,0,0,TAU);c.stroke();
  for(let k=0;k<5;k++){const q=a+k*TAU/5;ellipse(c,x+Math.cos(q)*50,y+Math.sin(q)*86,5,5,'#e0fff1');}
 }else if(['ice','underwater','forest','swamp','anur','desert','volcano'].includes(theme)){
  const count=detail?32:10;
  for(let k=0;k<count;k++){const f=(t*(theme==='ice'?.08:.035)+k/count)%1,x=((seed+k*127)%width)+Math.sin(a+k)*12,y=f*height;
   if(theme==='underwater'){c.strokeStyle='#a7e9f799';c.lineWidth=2;c.beginPath();c.arc(x,height-y,3+k%5,0,TAU);c.stroke();}
   else{c.fillStyle=theme==='ice'?'#d4fcffb8':theme==='volcano'?'#ffb54ccc':theme==='desert'?'#d0a37866':theme==='anur'?'#dabaef66':'#a8d761aa';c.globalAlpha=theme==='volcano'?1-f:.65;c.fillRect(x,theme==='volcano'?height-y:y,theme==='ice'?3:4,theme==='ice'?3:2);}
  }
  if(theme==='volcano'){c.strokeStyle='#ffb83c88';c.lineWidth=9;for(let k=0;k<3;k++){const y=height*.88+k*18;line(c,[[70,y],[250,y+Math.sin(a+k)*6],[340,y-9],[460,y+Math.cos(a+k)*7]],'#ef741c99',7);}}
  if(theme==='underwater'||theme==='swamp'){for(let k=0;k<6;k++){c.strokeStyle=theme==='underwater'?'#bdf8ff55':'#cce4a955';c.lineWidth=2;c.beginPath();c.ellipse(width*.7,height*.89,40+((t*12+k*16)%100),9+((t*4+k*5)%30),0,0,TAU);c.stroke();}}
  if(theme==='anur'){for(let k=0;k<4;k++){const x=150+((t*37+k*240)%1000),y=105+Math.sin(a+k)*28;line(c,[[x-9,y-7*Math.sin(t*5)],[x,y],[x+9,y-7*Math.sin(t*5)]],'#42314f',3);}}
  if(theme==='desert'){gear(c,100+(t*22)%1100,height*.82,13,t*2,'#ab8c56');}
 }else if(theme!=='camp'){
  // Industrial circulation: moving service drone, scanner and conveyor pulses.
  const travel=(t*.065+seed%10/10)%1,x=width*.13+travel*width*.74,y=height*.22+Math.sin(a)*6;
  c.fillStyle='#536e65';c.fillRect(x-16,y-7,34,13);c.fillStyle=color;c.fillRect(x-9,y-11,18,4);ellipse(c,x-11,y+8,7,3,'#bbff9f66');ellipse(c,x+11,y+8,7,3,'#bbff9f66');
  for(let k=0;k<5;k++){const pulse=(Math.sin(t*2+k)+1)/2;c.globalAlpha=.35+pulse*.55;c.fillStyle=color;c.fillRect(width*.12+k*35,height*.1,23,4);}
  if(theme==='city'||theme==='undertown'){const cx=width*.1+((t*45+seed)% (width*.8));c.globalAlpha=1;c.fillStyle=theme==='city'?'#40595c':'#ab7a56';c.fillRect(cx,height*.91,52,20);c.fillStyle='#18282b';c.fillRect(cx+9,height*.91-8,24,9);ellipse(c,cx+10,height*.91+20,6,5,'#152320');ellipse(c,cx+42,height*.91+20,6,5,'#152320');}
 }
 if(theme==='camp'){
  for(let k=0;k<4;k++){const f=(t*.3+k/4)%1;c.globalAlpha=(1-f)*.45;ellipse(c,width*.18+Math.sin(a+k)*8,height*.65-f*65,7+f*12,10+f*17,'#dce2c0');}
 }
 c.restore();
}
