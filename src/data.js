// Curated, local-first fan catalogue. Source links and continuity labels travel with each record.
export const wiki = name => `https://ben10.fandom.com/wiki/${encodeURIComponent(name.replaceAll(' ', '_'))}`;
export const eras = {classic:'Classic',af:'Alien Force',ua:'Ultimate Alien',ov:'Omniverse',supplemental:'Beyond the screen'};
const rows = {
classic: [
['Heatblast','Pyronite','#ef7440','flame','Juggles miniature fireballs'],
['Wildmutt','Vulpimancer','#e89a45','beast','Sniffs out an invisible trail'],
['Diamondhead','Petrosapien','#7acdb2','crystal','Grows a crystal garden'],
['XLR8','Kineceleran','#65bbd5','runner','Races around a speed circuit'],
['Grey Matter','Galvan','#b1c9b0','small','Repairs a tiny circuit board'],
['Four Arms','Tetramand','#ca5a47','fourarms','Trains all four arms'],
['Stinkfly','Lepidopterran','#a1bf49','insect','Hovers over a slime puddle'],
['Ripjaws','Piscciss Volann','#739bb6','fish','Leaps through a water ring'],
['Upgrade','Galvanic Mechamorph','#84d644','goo','Merges with a terminal'],
['Ghostfreak','Ectonurite','#d5d6bb','ghost','Phases through the floor'],
['Cannonbolt','Arburian Pelarota','#e8d897','ball','Rolls through a practice course'],
['Wildvine','Florauna','#79af61','plant','Tends an alien vine'],
['Blitzwolfer','Loboan','#9b9d9d','wolf','Practices a sonic howl'],
['Snare-Oh','Thep Khufan','#e1c795','mummy','Unravels and rewinds his bandages'],
['Frankenstrike','Transylian','#a1b89f','electric','Charges his shoulder coils'],
['Upchuck (Perk)','Perk Gourmand','#a3c35a','small','Snacks on scrap metal'],
['Ditto','Splixson','#e4e8d9','clone','Plays catch with his doubles'],
['Eye Guy','Opticoid','#b2a86d','eyes','Practices precision eye beams'],
['Way Big',"To’kustar",'#d6d8cf','giant','Guards the edge of the station'],
['Arctiguana','Polar Manzardill','#93bccd','lizard','Freezes a practice target'],
['Buzzshock','Nosedeenian','#e5d254','electric','Bounces between power cells'],
['Spitter','Spheroid','#b6b686','blob','Blows a bubble of goo']
],
af: [
['Swampfire','Methanosian','#8ca157','plant','Reignites a blooming flower'],
['Echo Echo','Sonorosian','#e6e8d8','robot','Loops a sonic beat'],
['Humungousaur','Vaxasaurian','#ba8c60','dinosaur','Lifts a training boulder'],
['Jetray','Aerophibian','#c16b60','ray','Glides through aerial hoops'],
['Big Chill','Necrofriggian','#77a7cb','moth','Drifts in an icy breeze'],
['Chromastone','Crystalsapien','#a985ac','crystal','Refracts an energy beam'],
['Brainstorm','Cerebrocrustacean','#c49058','crab','Calculates a lightning puzzle'],
['Spidermonkey','Arachnichimp','#649ab9','monkey','Swings from a web line'],
['Goop','Polymorph','#a0cc55','goo','Reshapes beneath his projector'],
['Alien X','Celestialsapien','#546779','cosmic','Orbits a miniature galaxy'],
['Lodestar','Biot-Savartian','#bdc15c','magnet','Suspends metal in a magnetic field'],
['Rath','Appoplexian','#d28b4f','tiger','Shadowboxes a training dummy'],
['Nanomech','Human / Nanochip hybrid','#a5c7bf','insect','Inspects a microchip'],
['Upchuck (Murk)','Murk Gourmand','#738950','small','Recycles another pile of scrap']
],
ua: [
['Water Hazard','Orishan','#bf5c50','shell','Sprays a rotating water fountain'],
['Ampfibian','Amperi','#7abfc8','jelly','Weaves an electric current'],
['Armodrillo','Talpaedan','#d9b552','drill','Drills a new tunnel'],
['Terraspin','Geochelone Aerio','#b7a880','turtle','Spins a wind turbine'],
['NRG','Prypiatosian-B','#9e9b8b','armor','Vents a little reactor heat'],
['Fasttrack','Citrakayah','#679cbd','runner','Runs a relay around the room'],
['Chamalien','Merlinisapien','#b59db5','lizard','Fades into his surroundings'],
['Eatle','Oryctini','#797e67','beetle','Chews a metal beam'],
['Clockwork','Chronosapien','#c4a659','clock','Rewinds a floating gear'],
['Jury Rigg','Planchaküle','#c57760','goblin','Builds and dismantles a gadget'],
['Shocksquatch','Gimlinopithecus','#d9bf56','beast','Sparks between his fingertips']
],
ov: [
['Feedback','Conductoid','#707d66','cables','Absorbs and returns an energy pulse'],
['Bloxx','Segmentasapien','#bcbd63','blocks','Builds a colourful brick arch'],
['Gravattack','Galilean','#aa7b58','planet','Keeps three rocks in orbit'],
['Crashhopper','Orthopterran','#a4bd5d','hopper','Bounces over tiny hurdles'],
['Ball Weevil','Unknown species','#d1c269','beetle','Rolls an expanding plasma ball'],
['Walkatrout','Ickthyperambuloid','#77a9b8','fish','Slides across a wet floor'],
['Pesky Dust','Nemuina','#bd9fc5','fairy','Sprinkles a cloud of dream dust'],
['Mole-Stache','Unknown species','#b59773','small','Styles an enormous moustache'],
['The Worst','Atrocian','#d5bf6f','blob','Tests an indestructible punching bag'],
['Kickin Hawk','Unknown species','#ad8b5b','bird','Practices a flying kick'],
['Toepick','Unknown species','#a5a077','armor','Opens and closes his face cage'],
['Astrodactyl','Unknown species','#b0a766','ray','Loops a jetpack flight path'],
['Bullfrag','Incursean','#819b64','frog','Flicks his tongue at targets'],
['Atomix','Unknown species','#9ac477','robot','Balances a glowing reactor sphere'],
['Gutrot','Unknown species','#858978','armor','Mixes a cloud of coloured gas'],
['Whampire','Vladat','#937b91','vampire','Flutters through a shadow ring']
]
};
export const slug = name => name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-$/,'');
export const aliens = Object.entries(rows).flatMap(([era,list]) => list.map(([name,species,color,shape,task]) => ({id:slug(name),name,species,color,shape,task,era,kind:'alien',continuity:'Classic continuity',source:wiki(name.startsWith('Upchuck')?'Upchuck':name),note: ['Arctiguana','Buzzshock','Spitter'].includes(name)?'Introduced through future-Ben appearances; included in the expanded Classic playlist.':name==='Shocksquatch'?'Debuted in the Heroes United crossover during the Ultimate Alien era.':''})));
const ultimateRows = [
['Swampfire','#6cadd5','plant','ua'],['Humungousaur','#7c9a61','dinosaur','ua'],['Big Chill','#d2756e','moth','ua'],['Cannonbolt','#9da6b3','ball','ua'],['Echo Echo','#6aabe0','robot','ua'],['Spidermonkey','#a092bb','monkey','ua'],['Wildmutt','#c78066','beast','ua'],['Way Big','#79a5cf','giant','ua'],['Arctiguana','#8daeb7','lizard','ov'],['Gravattack','#ab8274','planet','ov'],['Rath','#ccac83','tiger','ov'],['Grey Matter','#b896ac','brain','ov']
];
export const ultimates = ultimateRows.map(([base,color,shape,era])=>({id:slug(`Ultimate ${base}`),name:`Ultimate ${base}`,base:slug(base),species:`Evolved ${aliens.find(a=>a.id===slug(base)).species}`,color,shape,era,kind:'ultimate',continuity:'Classic continuity',task:`Loops an evolved ${base} power demonstration`,source:wiki(base==='Grey Matter'?'Ultimate Albedo':`Ultimate ${base}`),note:era==='ov'?'Used by Albedo in Omniverse. Ultimate Grey Matter is also known as Ultimate Albedo.':'An on-screen Ultimate transformation. The Ultimatrix simulator can select this evolved form.'}));
export const fusions = [
['Atomic-X','Atomix','Alien X','cosmic','#9fc5a0'],['Fourmungousaur','Four Arms','Humungousaur','fourarms','#b79567'],['Uprigg','Upgrade','Jury Rigg','goo','#86b368'],['Big Chuck','Way Big','Upchuck (Perk)','giant','#a5bb83'],['Crashocker','Crashhopper','Shocksquatch','hopper','#d1c16a'],['Humungoopsaur','Humungousaur','Goop','goo','#a8c67c'],['Stink Arms','Stinkfly','Four Arms','fourarms','#a7bb60'],['Diamond Matter','Diamondhead','Grey Matter','crystal','#95c6ac'],['Heat Jaws','Heatblast','Ripjaws','fish','#d19a62']
].map(([name,a,b,shape,color],i)=>({id:slug(name),name,components:[slug(a),slug(b)],species:`${a} + ${b}`,shape,color,era:i<6?'ov':'classic',kind:'fusion',continuity:'Classic continuity',task:'Alternates between two combined powers',source:wiki(name),note:i<6?'An on-screen Biomnitrix fusion.':'An accidental Classic-series fusion; available here in the fusion archive.'}));
export const predators = [
['Crabdozer','Heatblast','crab','#8b7b99'],['Buglizard','Stinkfly','lizard','#819674'],['Mucilator','Crashhopper','blob','#ae93a6'],['Slamworm','Armodrillo','worm','#c1a079'],['Terroranchula','Ball Weevil','spider','#b3967c'],['Hypnotick','Big Chill','insect','#a796bf'],['Omnivoracious','Grey Matter','bird','#b28078'],['Vicetopus','Brainstorm','jelly','#b97d8c'],['Tyrannopede','Humungousaur','dinosaur','#ad8565'],['Panuncian','Ditto','beast','#8a68ad'],['Ultimate Panuncian','Ditto','beast','#b37b96']
].map(([name,prey,shape,color])=>({id:slug(name),name,species:'Nemetrix predator',prey,color,shape,era:'ov',kind:'predator',continuity:'Classic continuity',task:`Patrols a ${prey} hunting trail`,source:wiki(name),note:'Predator demonstration on Zed / the Panuncian. These forms are not a normal human-Ben playlist.'}));
export const supplemental = [
['Rocks','Basalt','crystal','#bebc78','Live stage show; TV continuity disputed'],['Squidstrictor','Cephalod-ae','jelly','#a88396','Live stage show; TV continuity disputed'],['Shellhead','Unrevealed species','turtle','#9eb8a3','Named in Ken 10; appearance schematic'],['Sandbox','Unrevealed species','blob','#c4b085','Named in Ken 10; appearance schematic'],['Snakepit','Unrevealed species','worm','#9bad82','Named in Ken 10; appearance schematic'],['Portaler','Unrevealed species','cosmic','#9696bd','Non-canon game: Ben 10 Alien Maker'],['Antigravitesla','Unrevealed species','robot','#a2b9c6','Non-canon: Ultimate Access'],['Bob the Blob','Unrevealed species','blob','#ae98b2','Non-canon: Ultimate Access'],['Plantapocalypse','Unrevealed species','plant','#879f66','Non-canon: Ultimate Access'],['Decimus Prime','Cybertronian','robot','#9b92b6','Crew concept; not an on-screen transformation'],['Alien Z','Unrevealed species','lizard','#9ea78c','Crew-mentioned transformation; schematic'],['Ventrilosquid','Unrevealed species','jelly','#a788a1','Crew concept; not an on-screen transformation'],['Spitter (comic archive)','Spheroid','blob','#b7b585','Classic comic appearances; same species as Spitter']
].map(([name,species,shape,color,note])=>({id:slug(name),name,species,shape,color,note,era:'supplemental',kind:'supplemental',continuity:note,task:'Loops a schematic archive demonstration',source:wiki(name==='Spitter (comic archive)'?'Spitter':name)}));
export const roster = [...aliens,...ultimates,...fusions,...predators,...supplemental];
export const regions = [
{id:'bellwood',name:'Bellwood',subtitle:'Smoothies & small catastrophes',color:'#8aba78',x:0,y:0},
{id:'camp',name:'Rust Bucket campsite',subtitle:'Where the summer began',color:'#c5b371',x:1,y:0},
{id:'plumbers',name:'Plumber headquarters',subtitle:'Training is never really over',color:'#80bcb5',x:2,y:0},
{id:'galvan',name:'Galvan laboratory',subtitle:'A million possibilities',color:'#b4c773',x:3,y:0},
{id:'undertown',name:'Undertown',subtitle:'Everybody belongs somewhere',color:'#ac92ae',x:0,y:1},
{id:'anur',name:'Anur observatory',subtitle:'A little stranger after dark',color:'#9496be',x:1,y:1},
{id:'nullvoid',name:'Null Void',subtitle:'Keep an eye on the exits',color:'#cb8e82',x:2,y:1},
{id:'lab',name:'Villain laboratory',subtitle:'Definitely up to something',color:'#c5a273',x:3,y:1},
{id:'multiverse',name:'Crossroads of time',subtitle:'There is always another Ben',color:'#89afc9',x:0,y:2},
{id:'forge',name:'Forge of Creation',subtitle:'A universe in the making',color:'#b6a5c4',x:1,y:2},
{id:'arena',name:'Evolution arena',subtitle:'Beyond the original blueprint',color:'#b6b07a',x:2,y:2},
{id:'predators',name:'Predator habitat',subtitle:'Nature has a countermeasure',color:'#9ba684',x:3,y:2}
];
const castRows = [
['Gwen Tennyson','camp','#c58368','human','Practices a mana shield'],['Kevin Levin','bellwood','#767b78','human','Repairs his car'],['Grandpa Max','camp','#c1836f','human','Flips dinner on the camp grill'],['Rook Blonko','plumbers','#8daebe','cat','Trains with his Proto-Tool'],['Azmuth','galvan','#a1b18a','small','Calibrates an Omnitrix prototype'],['Professor Paradox','multiverse','#b3a790','human','Checks the flow of time'],['Julie Yamamoto','bellwood','#b29aab','human','Practices a tennis serve'],['Ship','bellwood','#84ba63','goo','Reshapes into a little vehicle'],['Kai Green','bellwood','#c49e70','human','Examines an ancient artefact'],['Ken Tennyson','multiverse','#b8c581','human','Practices a watch selection'],['Verdona','forge','#b694ba','fairy','Weaves a mana constellation'],['Sunny','forge','#c395b4','fairy','Spins a bright mana ribbon'],['Lucy Mann','camp','#b3b991','goo','Changes her disguise'],['Sandra Tennyson','camp','#bca18a','human','Reads a travel journal'],['Carl Tennyson','camp','#a7b1a7','human','Checks a campsite map'],['Natalie Tennyson','bellwood','#a793ab','human','Reads a book'],['Frank Tennyson','bellwood','#929d91','human','Waves to passing neighbours'],['Cooper Daniels','galvan','#bda980','human','Repairs a robot'],['Elena Validus','lab','#a29cac','human','Studies a nanochip'],['Alan Albright','plumbers','#b39b83','flame','Practices a small fireball'],['Manny Armstrong','plumbers','#c58871','fourarms','Lifts a practice weight'],['Helen Wheels','plumbers','#95b1bc','runner','Runs a speed drill'],['Pierce Wheels','plumbers','#a4b4a7','human','Checks his training targets'],['Magister Labrid','plumbers','#99afbb','fish','Calibrates Plumber equipment'],['Magister Patelliday','plumbers','#96b3bd','fish','Patrols headquarters'],['Magister Hulka','plumbers','#a1b080','beast','Leads a training exercise'],['Blukic','galvan','#bac490','small','Tests a new scanner'],['Driba','galvan','#9faa87','small','Troubleshoots the scanner'],['Tetrax Shard','plumbers','#a5c6aa','crystal','Polishes a crystal shield'],['Myaxx','galvan','#af9797','human','Checks DNA samples'],['Xylene','camp','#94ba93','fairy','Telekinetically moves equipment'],['Reinrassig III','forge','#b7b79e','giant','Watches a stellar chart'],['Sugilite','forge','#a396ba','crystal','Rebuilds a crystal formation'],['Skurd','galvan','#b3bf87','blob','Samples a strand of DNA'],['Zed','predators','#808da6','beast','Patrols her training course'],['Pakmar','undertown','#b1aa81','small','Sweeps his storefront'],['Hokestar','undertown','#a5a78b','human','Rehearses a street performance'],['Argit','undertown','#ae9b7f','beast','Counts a pile of coins'],['Rad Dudesman','undertown','#9ba48a','bird','Checks his ship'],['Fistrick','undertown','#b79b7f','human','Lifts a heavy weight'],
['Vilgax','nullvoid','#9fa98a','tentacles','Plans another invasion'],['Doctor Animo','lab','#b2a27d','human','Mutates a laboratory specimen'],['Hex','anur','#a08c9e','wizard','Spins his magical staff'],['Charmcaster','anur','#b99fb6','wizard','Opens a spellbook'],['Zs’Skayr','anur','#b5b3a5','ghost','Floats through a dark doorway'],['Zombozo','anur','#b3a795','human','Inflates a sinister balloon'],['Sixsix','nullvoid','#a58ba6','armor','Polishes his bounty gear'],['Sevenseven','nullvoid','#9e969d','armor','Checks a targeting device'],['EightEight','nullvoid','#aa938e','armor','Patrols a landing pad'],['Kraab','nullvoid','#c7ac7b','crab','Sharpens a mechanical claw'],['Psyphon','nullvoid','#a29686','human','Projects a conquest map'],['Malware','lab','#c18966','goo','Corrupts a terminal'],['Doctor Psychobos','lab','#9694ac','crab','Tests a Nemetrix circuit'],['Khyber','predators','#a99e7d','beast','Inspects a hunter’s trophy'],['Aggregor','nullvoid','#ada68c','human','Studies an energy vessel'],['Darkstar','anur','#a5a199','human','Drains a glowing energy orb'],['Eon','multiverse','#9495a8','armor','Opens a time rift'],['Maltruant','multiverse','#ad9483','clock','Reassembles a time machine'],['Servantis','lab','#b3a092','human','Monitors Rooter equipment'],['Attea','nullvoid','#a1b48b','frog','Inspects an Incursean command map'],['Emperor Milleous','nullvoid','#a2aa80','frog','Watches his fleet'],['Billy Billions','bellwood','#b9a479','human','Programs a robot'],['Will Harangue','bellwood','#a4a093','human','Records a news report'],['Captain Nemesis','bellwood','#a09985','armor','Polishes his armour'],['Rojo','lab','#bc8b82','human','Tests a mechanical arm'],['Clancy','lab','#b7a88a','human','Directs a swarm of insects'],['Enoch','nullvoid','#aba391','armor','Orders a knight patrol'],['Sir George','nullvoid','#b7b5a7','armor','Trains with a sword'],['Forever Knight','nullvoid','#a1a8a6','armor','Patrols the fortress'],['Dagon','forge','#a49aaf','tentacles','Shifts behind a dimensional rift'],['Frightwig','anur','#b199ac','human','Swirls her living hair'],['Thumbskull','anur','#aea88e','beast','Practices a heavy punch'],['Acid Breath','anur','#a6b388','human','Blows a small acid cloud'],['Sunder','nullvoid','#b1997a','armor','Sharpens his axe'],['Ferrothorn','undertown','#899b92','robot','Polishes a metal plate'],['Fistina','undertown','#b7a993','robot','Tests her mechanical arms'],['Octagon Vreedle','undertown','#b5a98b','human','Checks a questionable device'],['Rhomboid Vreedle','undertown','#a6977b','human','Carries a large crate'],['Ma Vreedle','undertown','#b3a18b','human','Inspects her camp'],['Princess Looma','arena','#b99b91','fourarms','Spars with a training dummy'],['Ester','undertown','#b69b7c','human','Stretches toward a high shelf'],['Fahd','undertown','#afc1a4','beast','Watches Undertown traffic'],['Ultimos','plumbers','#abaaa0','human','Practices an aerial pose'],['Synaptak','plumbers','#bab08a','brain','Levitate a training weight'],['Tini','plumbers','#c5a493','fourarms','Trains with a sparring partner']
];
export const characters = castRows.map(([name,region,color,shape,task])=>({id:`cast-${slug(name)}`,name,region,color,shape,task,kind:'character',era:'cast',species:'Character',continuity:'Classic continuity',source:wiki(name==='Grandpa Max'?'Max Tennyson':name==='Doctor Animo'?'Dr. Animo':name==='Doctor Psychobos'?'Dr. Psychobos':name==='Zs’Skayr'?"Zs'Skayr":name)}));
export const bens = [
['Ben Prime','omni','#a4d260','Omniverse / prime timeline'],['Classic Ben','classic','#d5ddbe','Age 10 / prototype Omnitrix'],['Alien Force Ben','af','#7dab69','Recalibrated prototype'],['Ultimate Alien Ben','ultima','#92bd75','Ultimatrix era'],['Ben 23','hero23','#78b6dc','Dimension 23 / Hero Watch'],['Gwen 10','gwen','#ae9fda','Alternate Omnitrix wielder'],['Bad Ben','bad','#75bfc0','Evil alternate timeline'],['Mad Ben','power','#d8a565','Wasteland timeline / Power Watch'],['Nega Ben','nega','#aaaaae','Negatrix timeline'],['Benzarro','zombi','#b29bd3','Zombitrix timeline'],['Albedo','albedo','#d78078','Galvan in a human form'],['No Watch Ben','none','#bcaa8a','Timeline without an Omnitrix'],['Ben 10,000 (Classic)','future','#9cb66e','Original future timeline'],['Ultimate Ben','ultimateben','#87ae89','Ultimate Alien future timeline'],['Ben 10,000 (Omniverse)','bio','#abc58e','Biomnitrix future'],['Ken Tennyson (watch)','ken','#91ba78','Replica Omnitrix wielder'],['Argit (Argitrix)','argit','#bead7e','Alternate Argitrix timeline']
].map(([name,device,color,note],i)=>({id:`ben-${slug(name)}`,name,device,color,note,shape:name==='Gwen 10'?'human':name.startsWith('Argit')?'beast':'ben',task:device==='none'?'Watches the timelines intersect':'Selects a hologram and checks the watch',kind:'ben',era:'multiverse',species:'Omnitrix wielder',continuity:note,source:wiki(name==='Ben Prime'?'Ben Tennyson':name==='Ben 10,000 (Omniverse)'?'Ben 10,000 (Omniverse)':name==='Ken Tennyson (watch)'?'Ken Tennyson':name==='Argit (Argitrix)'?'Argit':name),region:i<4?'bellwood':'multiverse'}));
export const devices = [
{id:'classic',name:'Prototype Omnitrix',short:'Classic',era:'classic',mode:'base',color:'#b8ed4d',note:'Expanded Classic playlist, including future-Ben introductions.',shape:'round'},
{id:'af',name:'Recalibrated Omnitrix',short:'Alien Force',era:'af',mode:'base',color:'#b8ed4d',note:'Alien Force introductions plus selected returning Classic forms.',shape:'round'},
{id:'ultima',name:'Ultimatrix',short:'Ultimate Alien',era:'ua',mode:'ultimate',color:'#b8ed4d',note:'Cumulative playlist with eight Ben-used Ultimate forms.',shape:'gauntlet'},
{id:'omni',name:'Completed Omnitrix',short:'Omniverse',era:'ov',mode:'base',color:'#b8ed4d',note:'All catalogued base forms from the four original-continuity series.',shape:'square'},
{id:'albedo',name:'Albedo’s stabilizer',short:'Albedo',era:'ov',mode:'ultimate',color:'#f18b80',note:'Evolved forms, including the Omniverse additions used by Albedo.',shape:'gauntlet'},
{id:'bio',name:'Biomnitrix',short:'Biomnitrix',era:'ov',mode:'fusion',color:'#b8ed4d',note:'Choose two DNA samples. Screen fusions are labelled; other pairs are fan simulations.',shape:'dual'},
{id:'neme',name:'Nemetrix',short:'Nemetrix',era:'ov',mode:'predator',color:'#f18b80',note:'Predator simulation using Zed / Panuncian, rather than a human Ben.',shape:'collar'},
{id:'hero23',name:'Hero Watch',short:'Dimension 23',era:'ov',mode:'base',color:'#83c7f4',note:'A shared simulator catalogue with Dimension 23 colours; not a claim all forms were used by Ben 23.',shape:'round'},
{id:'gwen',name:'Gwen 10’s Omnitrix',short:'Gwen 10',era:'classic',mode:'base',color:'#c4a0f0',note:'Classic simulator playlist, themed for the alternate Gwen wielder.',shape:'round'},
{id:'bad',name:'Bad Ben’s Omnitrix',short:'Bad Ben',era:'ov',mode:'base',color:'#83d9cd',note:'Shared simulator catalogue with Bad Ben colours.',shape:'square'},
{id:'power',name:'Power Watch',short:'Mad Ben',era:'ov',mode:'base',color:'#edb266',note:'Shared simulator catalogue with Mad Ben colours.',shape:'square'},
{id:'nega',name:'Negatrix',short:'Nega Ben',era:'ov',mode:'base',color:'#c3c3ce',note:'Shared simulator catalogue with Nega Ben colours.',shape:'square'},
{id:'zombi',name:'Zombitrix',short:'Benzarro',era:'ov',mode:'base',color:'#b69bdc',note:'Shared simulator catalogue with Benzarro colours.',shape:'square'},
{id:'future',name:'Future Omnitrix',short:'Ben 10,000',era:'ov',mode:'base',color:'#b8ed4d',note:'Future-Ben simulator playlist. Availability is curated, not exhaustive.',shape:'gauntlet'},
{id:'ultimateben',name:'Ultimate Ben’s Omnitrix',short:'Ultimate Ben',era:'ua',mode:'base',color:'#b8ed4d',note:'Human-avatar power channeling simulation for Ultimate Ben.',shape:'gauntlet'},
{id:'ken',name:'Ken’s replica Omnitrix',short:'Ken 10',era:'classic',mode:'base',color:'#b8ed4d',note:'Expanded Classic simulator playlist for Ken’s replica.',shape:'round'},
{id:'argit',name:'Argitrix',short:'Argitrix',era:'ov',mode:'base',color:'#d4d69a',note:'Shared simulator playlist for the alternate Argit wielder.',shape:'square'}
];
export function playlist(deviceId,{expanded=false}={}) {
 const device=devices.find(d=>d.id===deviceId)??devices[0];
 if(device.mode==='predator') return predators;
 const eraOrder=['classic','af','ua','ov'];
 let list=aliens.filter(a=>eraOrder.indexOf(a.era)<=eraOrder.indexOf(device.era));
 if(device.id==='af') list=aliens.filter(a=>a.era==='af'||['cannonbolt','way-big','diamondhead','ghostfreak'].includes(a.id));
 if(expanded) list=[...list,...supplemental];
 return list;
}
export function evolvedForm(id,deviceId) {
 const device=devices.find(d=>d.id===deviceId);
 if(device?.mode!=='ultimate') return null;
 return ultimates.find(a=>a.base===id&&(device.id==='albedo'||a.era==='ua'))??null;
}
export function combine(aId,bId) {
 const a=aliens.find(x=>x.id===aId), b=aliens.find(x=>x.id===bId);
 if(!a||!b||aId===bId)return null;
 const screen=fusions.find(f=>f.components.includes(aId)&&f.components.includes(bId));
 return screen??{id:`fan-${aId}-${bId}`,name:`${a.name} × ${b.name}`,components:[aId,bId],species:`${a.species} + ${b.species}`,shape:a.shape,color:a.color,secondary:b.color,era:'ov',kind:'fusion',continuity:'Fan simulation',task:`Demonstrates a simulated combination of ${a.name} and ${b.name}`,note:'A fan-created combination, not a confirmed on-screen design.',source:wiki('Biomnitrix')};
}
export const allEntries=[...roster,...characters,...bens];
