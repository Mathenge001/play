import fs from 'node:fs';import path from 'node:path';
const root=process.cwd(),dist=path.join(root,'dist');fs.rmSync(dist,{recursive:true,force:true});fs.mkdirSync(dist,{recursive:true});
const files=['index.html','setup.html','play.html','join.html','display.html','404.html','icon.svg','icon.png','favicon.ico','site.webmanifest','robots.txt','service-worker.js','README.md','START-HERE.txt','ATTRIBUTIONS.md','ARCHITECTURE.md','content-pack-template.json'];
for(const f of files){const src=path.join(root,f);if(fs.existsSync(src)){fs.mkdirSync(path.dirname(path.join(dist,f)),{recursive:true});fs.copyFileSync(src,path.join(dist,f))}}
for(const dir of ['css','js','img','classic']){const src=path.join(root,dir);if(fs.existsSync(src))fs.cpSync(src,path.join(dist,dir),{recursive:true})}
console.log(`Built PartyPlay to ${dist}`);
