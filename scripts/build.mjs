import { mkdir, copyFile, rm, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
await rm(resolve(root, 'dist'), {recursive:true, force:true});
await mkdir(resolve(root, 'dist/src'), {recursive:true});
for (const file of ['index.html','favicon.svg','src/app.js','src/world.js','src/sprites.js','src/data.js','src/styles.css','src/sprite-manifest.js']) {
  await copyFile(resolve(root,file), resolve(root,'dist',file));
}
await cp(resolve(root,'assets'),resolve(root,'dist/assets'),{recursive:true});
console.log('Built dependency-free static site in dist/');
