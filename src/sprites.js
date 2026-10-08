// Original vector miniatures, drawn locally. These are stylised fan interpretations, not show assets.
export function hourglass(ctx,x,y,size=8,color='#b8ed4d') {
 ctx.save();ctx.translate(x,y);ctx.fillStyle='#192921';ctx.beginPath();ctx.arc(0,0,size,0,Math.PI*2);ctx.fill();ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(-size*.65,-size*.65);ctx.lineTo(size*.65,-size*.65);ctx.lineTo(size*.15,0);ctx.lineTo(size*.65,size*.65);ctx.lineTo(-size*.65,size*.65);ctx.lineTo(-size*.15,0);ctx.closePath();ctx.fill();ctx.restore();
}
const path=(ctx,points,fill,stroke=true)=>{ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(stroke)ctx.stroke();};
function oval(ctx,x,y,rx,ry,color,stroke=true){ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();if(stroke)ctx.stroke();}
function box(ctx,x,y,w,h,color,r=3){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=color;ctx.fill();ctx.stroke();}
function line(ctx,points,color,width=3){ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();ctx.strokeStyle='#18302a';ctx.lineWidth=2;}
function limb(ctx,x,y,length,angle,color,width=7){ctx.save();ctx.translate(x,y);ctx.rotate(angle);box(ctx,-width/2,0,width,length,color,width/2);oval(ctx,0,length,4,3,color);ctx.restore();}
function eyes(ctx,x,y,gap=6,color='#e8f2b9'){oval(ctx,x-gap,y,2.6,2,color,false);oval(ctx,x+gap,y,2.6,2,color,false);}
function wing(ctx,side,color,t){ctx.save();ctx.scale(side,1);path(ctx,[[0,-35],[24,-64-Math.sin(t)*5],[36,-40],[19,-14],[5,-20]],color);line(ctx,[[3,-30],[26,-48]],'#d1e3dc',1);ctx.restore();}
export function drawSprite(ctx,entry,time=0,{scale=1,accent='#b8ed4d',shadow=true,active=false,effects=true}={}) {
 const hash=[...entry.id].reduce((n,c)=>n+c.charCodeAt(0),0);
 const t=time*2.2+hash*.11, pulse=Math.sin(t), sway=Math.sin(t*.7), color=entry.color??'#a2bf8d';
 const s=entry.shape??'human', n=entry.name;
 ctx.save();ctx.scale(scale,scale);ctx.strokeStyle='#18302a';ctx.lineWidth=2;ctx.lineJoin='round';ctx.lineCap='round';
 if(shadow)oval(ctx,0,2,19,5,'rgba(5,22,17,.25)',false);
 if(active){ctx.strokeStyle=accent;ctx.lineWidth=1.8;ctx.beginPath();ctx.ellipse(0,1,27,8,0,0,Math.PI*2);ctx.stroke();ctx.strokeStyle='#18302a';ctx.lineWidth=2;}
 const floating=['ghost','jelly','moth','fairy','cosmic','ray','planet'].includes(s);
 ctx.translate(s==='runner'?sway*11:s==='hopper'?0:Math.sin(t*.5)*1.2,floating?-8-pulse*3:s==='hopper'?-Math.max(0,pulse)*15:-Math.max(0,pulse)*1.3);
 // Effects depict the task as well as the body's motion.
 if(effects) {
  if(s==='flame'||n==='Swampfire'||n==='Ultimate Swampfire'){for(let i=0;i<3;i++)oval(ctx,28+i*7,-25-((time*18+i*11)%32),3,5,i%2?'#e9ca72':'#ed9253',false);}
  if(['electric','cables','magnet','robot'].includes(s)){const a=t*1.2;line(ctx,[[20,-26],[29,-32+pulse*3],[25,-39],[34,-44]],accent,1.8);oval(ctx,Math.cos(a)*30,-32+Math.sin(a)*11,3,3,accent,false);}
  if(['cosmic','planet','clock'].includes(s))for(let i=0;i<3;i++){const a=t*.7+i*2.1;oval(ctx,Math.cos(a)*32,-33+Math.sin(a)*11,3+i,3+i,i===0?accent:'#c6bfa0');}
  if(s==='runner'){line(ctx,[[-34,-9],[-23,-9]],'#b6dacc',1);line(ctx,[[-40,-20],[-27,-20]],'#b6dacc',1);}
  if(s==='moth'||s==='lizard'&&n.includes('Arctiguana')){for(let i=0;i<3;i++){const a=t+i*2;line(ctx,[[Math.cos(a)*27,-26+Math.sin(a)*15],[Math.cos(a)*27+3,-23+Math.sin(a)*15]],'#d7eeec',1.5);}}
  if(['wizard','fairy'].includes(s))for(let i=0;i<4;i++)oval(ctx,Math.cos(t+i*1.6)*25,-32+Math.sin(t+i*1.6)*14,1.8,1.8,'#d1aedb',false);
 }
 if(s==='clone'){
  for(let i=0;i<3;i++){ctx.save();ctx.translate((i-1)*20,Math.sin(t+i)*3);ctx.scale(i===1?1:.72,i===1?1:.72);limb(ctx,-6,-17,17,.1,color,6);limb(ctx,6,-17,17,-.1,color,6);box(ctx,-10,-41,20,26,color);limb(ctx,-10,-36,15,.45+pulse*.1,color,5);limb(ctx,10,-36,15,-.45-pulse*.1,color,5);oval(ctx,0,-50,12,10,color);eyes(ctx,0,-50,6);path(ctx,[[-10,-55],[-17,-61],[-14,-48]],'#475b47');path(ctx,[[10,-55],[17,-61],[14,-48]],'#475b47');ctx.restore();}
 }else if(['human','ben','cat','wizard'].includes(s)){
  const skin=s==='cat'?'#819cb0':n==='No Watch Ben'?'#d7b492':n==='Benzarro'?'#a9b298':'#d5b58f';
  limb(ctx,-7,-17,16,-.08+Math.sin(t)*.07,'#596d62',8);limb(ctx,7,-17,16,.08-Math.sin(t)*.07,'#596d62',8);
  box(ctx,-13,-43,26,29,color,4);if(s==='ben'){path(ctx,[[-3,-43],[4,-43],[4,-15],[-3,-15]],'#e6eadb',false);ctx.fillStyle='#1a3627';ctx.font='bold 8px monospace';ctx.fillText('10',4,-28);}
  limb(ctx,-14,-40,21,.26+sway*.17,color,7);limb(ctx,14,-40,18,-.45-pulse*.24,color,7);
  oval(ctx,0,-53,12,13,skin);path(ctx,[[-12,-55],[-13,-65],[-8,-66],[-3,-70],[8,-68],[12,-58],[6,-61],[1,-59]],n==='Albedo'?'#e4e4d8':n==='Gwen 10'||n.startsWith('Gwen')?'#b76a42':n==='Grandpa Max'?'#bcc4b1':'#534c3a');eyes(ctx,1,-51,4,'#e2e9b0');line(ctx,[[-3,-46],[3,-46]],'#596253',1);
  if(n.startsWith('Gwen')){path(ctx,[[-12,-63],[-15,-49],[-13,-38],[-8,-47],[-7,-61]],'#b76a42');path(ctx,[[11,-63],[16,-48],[13,-37],[8,-46],[8,-61]],'#b76a42');}
  if(s==='cat'){path(ctx,[[-11,-59],[-14,-69],[-3,-62]],skin);path(ctx,[[7,-62],[14,-68],[12,-56]],skin);}
  if(s==='wizard'){path(ctx,[[-14,-43],[-22,-7],[19,-7],[13,-43]],color);line(ctx,[[23,-9],[25,-67]],'#8e7054',4);oval(ctx,25,-69,5,5,'#c3a1cd');}
  if(s==='ben'){hourglass(ctx,20,-23,4,accent);if(effects){ctx.globalAlpha=.55;oval(ctx,25,-39,6,9,accent,false);ctx.globalAlpha=1;}}
  if(n.startsWith('Gwen')){ctx.strokeStyle='#d4a6d9';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(25,-33,10,14,.3,0,Math.PI*2);ctx.stroke();}
  if(n==='Kevin Levin'){box(ctx,15,-21,13,5,'#a6b6b0',1);line(ctx,[[21,-22],[26,-29]],'#b7c8be',3);}
  if(n==='Grandpa Max'){box(ctx,17,-28,13,4,'#d1cab3',1);line(ctx,[[22,-26],[22,-16]],'#8a7860',2);}
  if(n==='Professor Paradox'){oval(ctx,20,-28,5,5,'#d8c780');}
 }else if(['small','goblin','brain'].includes(s)){
  const big=s==='brain';limb(ctx,-6,-10,10,.13,color,5);limb(ctx,6,-10,10,-.13,color,5);box(ctx,-10,-31,20,23,s==='goblin'?'#b07856':'#5a7364');limb(ctx,-10,-27,12,.3+pulse*.3,color,5);limb(ctx,10,-27,12,-.6-pulse*.3,color,5);oval(ctx,0,-40,big?22:15,big?20:11,color);eyes(ctx,0,-39,big?10:8,'#a6eb76');if(big)for(let i=0;i<4;i++)line(ctx,[[-17+i*9,-52],[-13+i*9,-58],[-9+i*9,-50]],'#836883',1);if(n.startsWith('Upchuck')){line(ctx,[[-5,-34],[5,-34]],'#293b27',3);line(ctx,[[0,-34],[17,-24+pulse*6],[28,-24]],'#e27b73',3);}if(n==='Mole-Stache'){path(ctx,[[-1,-35],[-21,-31],[-17,-26],[0,-29],[17,-26],[21,-31]],'#d2c39d');}
 }else if(['fourarms','giant','dinosaur','robot','armor','blocks','tentacles'].includes(s)){
  const wide=s==='fourarms'?20:s==='giant'?12:s==='dinosaur'?19:16, tall=s==='giant'?1.45:1;
  ctx.scale(1,tall);limb(ctx,-wide*.55,-20,19,.08+pulse*.06,s==='giant'?'#c37b73':color,11);limb(ctx,wide*.55,-20,19,-.08-pulse*.06,s==='giant'?'#c37b73':color,11);
  if(s==='dinosaur')path(ctx,[[11,-23],[32,-14],[39,-23],[29,-25],[13,-35]],color);
  box(ctx,-wide,-53,wide*2,36,color,s==='blocks'?1:6);
  const armCount=s==='fourarms'?4:2;for(let i=0;i<armCount;i++){const side=i%2?1:-1,y=i<2?-48:-32;limb(ctx,side*(wide+1),y,22,side*(-.35-pulse*.18),color,10);}
  if(s==='giant'){path(ctx,[[-12,-51],[-4,-24],[0,-22],[5,-51]],'#d17d74');path(ctx,[[-11,-65],[0,-87],[8,-61]],'#c27872');}
  oval(ctx,0,-62,s==='tentacles'?15:11,11,color);eyes(ctx,0,-61,5,s==='armor'?'#f4d68f':'#e8f2b9');
  if(s==='tentacles')for(let i=0;i<4;i++)line(ctx,[[-9+i*6,-56],[-10+i*6,-42],[sway*4-13+i*8,-39]],color,4);
  if(s==='robot'||s==='armor'){box(ctx,-8,-63,16,5,'#293e32',1);if(n==='NRG'||n==='Gutrot')box(ctx,-9,-47,18,8,'#d1b26d');}
  if(s==='blocks'){for(let y=-50;y<-22;y+=10)for(let x=-15;x<16;x+=10)box(ctx,x,y,9,9,['#ca7370','#d9c476','#7ba1b2'][(x+y+200)%3],0);}
 }else if(['beast','wolf','tiger','frog','bird','vampire'].includes(s)){
  const quadruped=s==='beast'&&['Wildmutt','Zed','Fahd','Panuncian','Ultimate Panuncian'].includes(n);
  if(quadruped){oval(ctx,-1,-20,21,13,color);for(let i=0;i<4;i++)limb(ctx,-15+i*10,-17,17,(i%2?1:-1)*pulse*.15,color,6);oval(ctx,19,-28,13,11,color);path(ctx,[[10,-33],[12,-46],[19,-36]],color);line(ctx,[[-21,-24],[-30,-34-sway*6]],color,5);if(n==='Wildmutt')box(ctx,13,-28,18,4,'#6e6350',1);else eyes(ctx,22,-30,4);}
  else{limb(ctx,-9,-18,18,.13+pulse*.06,color,8);limb(ctx,9,-18,18,-.13-pulse*.06,color,8);oval(ctx,0,-36,17,22,color);limb(ctx,-17,-46,21,.25+pulse*.3,color,8);limb(ctx,17,-46,21,-.65-pulse*.3,color,8);oval(ctx,0,-62,13,12,color);eyes(ctx,0,-61,6);if(['wolf','tiger','vampire'].includes(s)){path(ctx,[[-13,-64],[-14,-77],[-4,-70]],color);path(ctx,[[4,-70],[14,-77],[13,-64]],color);if(s==='tiger'){for(let i=0;i<3;i++)line(ctx,[[-15,-46+i*8],[-5,-42+i*8]],'#4c5140',2);}}
  if(s==='bird')path(ctx,[[2,-63],[19,-58],[3,-54]],'#d9c389');if(s==='frog'){oval(ctx,-9,-70,5,5,color);oval(ctx,9,-70,5,5,color);line(ctx,[[0,-56],[22,-48+8*pulse]],'#d3a695',3);}if(s==='vampire'){wing(ctx,1,color,t);wing(ctx,-1,color,t);}}
 }else if(['moth','insect','ray','fairy','jelly','spider'].includes(s)){
  if(s==='moth'||s==='insect'||s==='fairy'){wing(ctx,1,s==='fairy'?'#c8b7d4':color,t);wing(ctx,-1,s==='fairy'?'#c8b7d4':color,t);}
  if(s==='ray'){path(ctx,[[-6,-39],[-39,-30-sway*5],[-24,-54],[-9,-52]],color);path(ctx,[[6,-39],[39,-30-sway*5],[24,-54],[9,-52]],color);}
  if(s==='jelly'){for(let i=0;i<4;i++)line(ctx,[[-12+i*8,-27],[-19+i*10,-14],[sway*6-16+i*10,-3]],color,5);oval(ctx,0,-39,18,19,color);}
  else{oval(ctx,0,-32,s==='fairy'?7:10,19,color);oval(ctx,0,-56,s==='fairy'?8:10,10,color);limb(ctx,-9,-41,18,.7+pulse*.2,color,5);limb(ctx,9,-41,18,-.7-pulse*.2,color,5);limb(ctx,-5,-17,13,.15,color,5);limb(ctx,5,-17,13,-.15,color,5);}
  if(s==='spider')for(let i=0;i<4;i++){const side=i%2?1:-1;line(ctx,[[side*10,-34],[side*27,-35+(i>1?17:0)],[side*35,-12+(i>1?11:0)]],color,5);}
  eyes(ctx,0,s==='jelly'?-42:-57,5);if(s==='insect'){line(ctx,[[-5,-63],[-11,-72],[sway*3-14,-73]],color,2);line(ctx,[[5,-63],[11,-72],[sway*3+14,-73]],color,2);}
 }else if(['crab','beetle','turtle','shell'].includes(s)){
  oval(ctx,0,-27,21,21,color);for(let i=0;i<4;i++)limb(ctx,(i%2?1:-1)*(i<2?16:9),i<2?-32:-15,i<2?16:14,(i%2?1:-1)*(i<2?-.8-pulse*.12:.2),color,7);
  oval(ctx,0,-49,10,10,color);eyes(ctx,0,-49,5);
  if(s==='crab'){for(const side of [-1,1]){oval(ctx,side*30,-28-pulse*4,9,9,color);path(ctx,[[side*24,-30],[side*34,-40],[side*34,-27]],color);}}
  if(s==='turtle'){oval(ctx,0,-27,15,16,'#807f5b');line(ctx,[[-12,-28],[12,-28]],'#a9aa7d',2);line(ctx,[[0,-41],[0,-12]],'#a9aa7d',2);}
  if(s==='beetle')path(ctx,[[-3,-56],[0,-77],[7,-55]],color);
 }else if(['flame','crystal','plant','electric','cables','drill','magnet','runner','lizard','monkey','hopper'].includes(s)){
  const long=s==='runner'||s==='hopper';limb(ctx,-7,-20,long?20:18,.1+pulse*.09,color,long?6:9);limb(ctx,7,-20,long?20:18,-.1-pulse*.09,color,long?6:9);oval(ctx,0,-37,13,20,color);limb(ctx,-13,-46,23,.3+pulse*.22,color,7);limb(ctx,13,-46,23,-.6-pulse*.22,color,7);oval(ctx,0,-62,s==='lizard'?15:10,11,color);eyes(ctx,0,-62,5);
  if(s==='flame'){for(let i=0;i<5;i++)path(ctx,[[-13+i*6,-68],[-17+i*7,-85-Math.sin(t+i)*6],[-6+i*5,-70]],i%2?'#eec977':color,false);path(ctx,[[-8,-50],[2,-42],[-4,-28],[7,-34],[10,-53]],'#edc47b',false);}
  if(s==='crystal'){for(const side of [-1,1]){path(ctx,[[side*10,-48],[side*20,-65],[side*26,-47]],'#bddcd1');path(ctx,[[side*6,-66],[side*8,-84],[side*15,-65]],color);}line(ctx,[[-8,-43],[0,-35],[8,-43]],'#d9ece3',1);}
  if(s==='plant'){for(const side of [-1,1]){path(ctx,[[side*5,-61],[side*15,-78],[side*22,-65]],n.includes('Swampfire')?'#d48860':'#accd80');line(ctx,[[side*12,-29],[side*27,-21],[side*31,-11+sway*5]],color,3);}}
  if(s==='runner'){path(ctx,[[-8,-69],[0,-77],[13,-61],[5,-52]],'#425e64');box(ctx,-6,-66,17,5,'#c7e1ce',1);line(ctx,[[9,-30],[32,-17],[38,-25]],color,5);oval(ctx,-5,0,5,3,'#405c5c');oval(ctx,11,0,5,3,'#405c5c');}
  if(s==='monkey'){limb(ctx,-11,-30,22,.75+pulse*.2,color,5);limb(ctx,11,-30,22,-.75-pulse*.2,color,5);line(ctx,[[7,-18],[25,-6],[31,-17],[23,-22+sway*4]],color,5);}
  if(s==='lizard'){line(ctx,[[9,-23],[30,-12],[37,-24+sway*3]],color,6);path(ctx,[[1,-66],[5,-81],[11,-68]],color);}
  if(s==='electric'||s==='cables'){for(const side of [-1,1]){line(ctx,[[side*8,-63],[side*17,-73],[side*20,-58]],color,4);oval(ctx,side*20,-58,4,4,accent);}if(s==='electric'){path(ctx,[[-4,-48],[4,-49],[-1,-39],[7,-40],[-6,-26],[-2,-36],[-7,-35]],'#e9de9b',false);}}
  if(s==='drill'){box(ctx,-24,-24,15,17,'#adb7a5');box(ctx,14,-29,15,17,'#adb7a5');for(let i=0;i<3;i++){line(ctx,[[-24,-20+i*4],[-9,-20+i*4]],'#6c7a6b',1);line(ctx,[[14,-25+i*4],[29,-25+i*4]],'#6c7a6b',1);}}
  if(s==='magnet'){path(ctx,[[-10,-68],[-18,-74],[-16,-55],[-7,-52]],color);path(ctx,[[10,-68],[18,-74],[16,-55],[7,-52]],color);}
  if(s==='hopper'){path(ctx,[[-7,-18],[-24,-23],[-20,-6],[-11,-2]],color);path(ctx,[[7,-18],[24,-23],[20,-6],[11,-2]],color);}
 }else if(['goo','blob','ghost','mummy','cosmic','planet','ball','clock','fish','worm','eyes'].includes(s)){
  if(s==='ball'){ctx.rotate(pulse*.35);oval(ctx,0,-27,24,27,color);oval(ctx,0,-30,15,18,'#d1d5c7');box(ctx,-20,-33,10,20,color,5);box(ctx,10,-33,10,20,color,5);eyes(ctx,0,-39,5);}
  else if(s==='worm'){for(let i=0;i<5;i++)oval(ctx,-25+i*12,-9-Math.sin(t+i)*4,9,10,color);oval(ctx,27,-23,12,15,color);eyes(ctx,29,-24,5);}
  else if(s==='planet'){oval(ctx,0,-34,26,29,color);oval(ctx,2,-32,11,11,'#dcc575');for(let i=0;i<4;i++)oval(ctx,-17+i*10,-47+(i%2)*27,3,3,'#7d715c');eyes(ctx,0,-50,7);}
  else if(s==='goo'||s==='ghost'){path(ctx,[[-10,-58],[-17,-43],[-17-sway*3,-20],[-27,-5],[-5,-9],[3,1],[10,-9],[23,-3],[15,-25],[16,-45],[8,-60]],color);eyes(ctx,0,-48,5);if(s==='goo'){oval(ctx,0,-71,10,3,'#b6bcb0');line(ctx,[[0,-69],[0,-61]],accent,1);}else{line(ctx,[[0,-59],[-4,-39],[1,-27],[-3,-10]],'#74796a',2);}}
  else if(s==='blob'){oval(ctx,0,-22,24+pulse,23-pulse,color);eyes(ctx,0,-27,7);line(ctx,[[-9,-16],[9,-16]],'#55674c',2);}
  else if(s==='fish'){path(ctx,[[-14,-38],[-22,-21],[-12,-9],[-7,-2],[1,-8],[16,-10],[25,-23],[17,-41],[4,-57]],color);path(ctx,[[-2,-48],[-4,-73],[8,-53]],color);oval(ctx,2,-45,13,10,color);eyes(ctx,5,-48,5);line(ctx,[[-5,-39],[12,-39]],'#e4e2c6',3);}
  else{limb(ctx,-7,-19,19,.1,color,8);limb(ctx,7,-19,19,-.1,color,8);oval(ctx,0,-37,16,23,color);limb(ctx,-16,-48,22,.4+pulse*.2,color,7);limb(ctx,16,-48,22,-.4-pulse*.2,color,7);oval(ctx,0,-63,11,11,color);eyes(ctx,0,-63,5);if(s==='mummy')for(let i=0;i<7;i++)line(ctx,[[-12,-54+i*5],[13,-50+i*5]],'#a49e7f',1);if(s==='eyes')for(let i=0;i<7;i++)oval(ctx,-9+(i%3)*9,-49+Math.floor(i/3)*12,3,2,'#e2e6bb');if(s==='clock'){oval(ctx,0,-38,12,12,'#dac791');line(ctx,[[0,-38],[Math.sin(t)*8,-38-Math.cos(t)*8]],'#617257',2);box(ctx,-5,-81,10,6,'#d7c68a');}if(s==='cosmic')for(let i=0;i<12;i++)oval(ctx,Math.sin(i*31)*11,-51+(i*7)%31,.8,.8,'#eaf1db',false);}
 }
 const badgeY=['small','goblin','brain'].includes(s)?-21:s==='ball'?-21:s==='planet'?-32:-35;
 if(entry.kind!=='character'&&entry.kind!=='predator')hourglass(ctx,0,badgeY,4,entry.kind==='ultimate'?'#ef9690':accent);
 if(entry.kind==='predator')hourglass(ctx,0,-20,4,'#ee8e82');
 if(entry.kind==='ultimate'){for(const side of [-1,1])path(ctx,[[side*14,-41],[side*26,-49],[side*20,-35]],'#bac8b6');}
 if(entry.secondary){ctx.globalAlpha=.25;oval(ctx,10,-35,12,18,entry.secondary,false);ctx.globalAlpha=1;}
 ctx.restore();
}
const thumbnailCache=new Map();
export function thumbnail(entry,accent='#b8ed4d') {
 const key=`${entry.id}-${accent}`;
 if(thumbnailCache.has(key))return thumbnailCache.get(key);
 const canvas=document.createElement('canvas');canvas.width=112;canvas.height=120;const ctx=canvas.getContext('2d');
 ctx.translate(56,111);drawSprite(ctx,entry,0,{scale:1.05,accent,shadow:false,effects:false});
 const url=canvas.toDataURL();thumbnailCache.set(key,url);return url;
}
