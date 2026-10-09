import { mkdir, copyFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import {sheetFiles} from '../src/sprite-manifest.js';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
await rm(resolve(root, 'dist'), {recursive:true, force:true});
await mkdir(resolve(root, 'dist/src'), {recursive:true});
for (const file of ['index.html','favicon.svg','src/app.js','src/world.js','src/sprites.js','src/data.js','src/styles.css','src/sprite-manifest.js','src/art-manifest.js','src/animation.js','src/scenes.js','src/transformation.js']) {
  await copyFile(resolve(root,file), resolve(root,'dist',file));
}
await mkdir(resolve(root,'dist/assets'),{recursive:true});
for(const file of Object.values(sheetFiles))await copyFile(resolve(root,'assets',file),resolve(root,'dist/assets',file));
console.log('Built dependency-free static site in dist/');
