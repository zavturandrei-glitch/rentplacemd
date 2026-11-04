import sharp from 'sharp';
import {readdir,mkdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root='public/apartments/albisoara-16-84/new foto/';
const out='public/apartments/albisoara-16-84/refresh-20261104/';
await mkdir(out,{recursive:true});await mkdir('backups/albisoara-20261104',{recursive:true});
await writeFile('backups/albisoara-20261104/apartments.ts',await readFile('lib/apartments.ts'));
await writeFile('backups/albisoara-20261104/localization.ts',await readFile('lib/newApartmentLocalization.ts'));
const files=(await readdir(root)).filter(x=>x.endsWith('.png')).sort((a,b)=>parseInt(a)-parseInt(b));
const tiles=[],report=[];
for(const [i,file] of files.entries()){
 const bytes=await readFile(root+file),source=sharp(bytes);const meta=await source.metadata();
 await source.clone().rotate().resize({width:1800,withoutEnlargement:true}).webp({quality:85}).toFile(out+file.replace('.png','.webp'));
 report.push({file,width:meta.width,height:meta.height,sha256:createHash('sha256').update(bytes).digest('hex')});
 tiles.push({input:await source.clone().resize(200,150,{fit:'contain'}).png().toBuffer(),left:i%4*200,top:Math.floor(i/4)*175});
 tiles.push({input:Buffer.from(`<svg width="200" height="25"><text x="5" y="20">${file}</text></svg>`),left:i%4*200,top:Math.floor(i/4)*175+150});
}
await sharp({create:{width:800,height:Math.ceil(files.length/4)*175,channels:3,background:'white'}}).composite(tiles).png().toFile('.tmp-albisoara-refresh.png');
await writeFile('docs/albisoara-refresh-media.json',JSON.stringify(report,null,2));console.log(`${files.length} images decoded; originals preserved.`);
