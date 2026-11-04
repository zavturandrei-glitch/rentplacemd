import sharp from 'sharp';
import {readdir} from 'node:fs/promises';
const root='public/apartments/cornului-13-2/';
const files=(await readdir(root)).filter(x=>x.endsWith('.png')).sort((a,b)=>parseInt(a)-parseInt(b));
const tiles=[];
for(const [i,file] of files.entries()){
 const source=sharp(root+file);await source.metadata();
 await source.clone().rotate().resize({width:1800,withoutEnlargement:true}).webp({quality:84}).toFile(root+file.replace('.png','.webp'));
 tiles.push({input:await source.clone().resize(220,160,{fit:'contain'}).png().toBuffer(),left:i%4*220,top:Math.floor(i/4)*185});
 tiles.push({input:Buffer.from(`<svg width="220" height="25"><text x="5" y="20">${file}</text></svg>`),left:i%4*220,top:Math.floor(i/4)*185+160});
}
await sharp({create:{width:880,height:Math.ceil(files.length/4)*185,channels:3,background:'white'}}).composite(tiles).png().toFile('.tmp-cornului-contact.png');
console.log(files.length+' original images decoded and optimized; originals preserved.');
