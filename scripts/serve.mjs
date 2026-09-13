import http from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const port = Number(process.env.PORT || 4173);
const root = process.cwd();
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon','.mp3':'audio/mpeg'};
http.createServer(async(req,res)=>{
  try{
    const raw=decodeURIComponent((req.url||'/').split('?')[0]);
    const pathname=raw==='/'?'/index.html':raw;
    const safe=normalize(pathname).replace(/^([/\\]*\.\.[/\\])+/, '');
    const file=join(root,safe);
    const info=await stat(file); if(!info.isFile()) throw new Error('not file');
    const type=types[extname(file)]||'application/octet-stream';
    const range=req.headers.range;
    if(range && extname(file).toLowerCase()==='.mp3'){
      const [startText,endText]=range.replace(/bytes=/,'').split('-');
      const start=Number(startText)||0; const end=endText?Number(endText):info.size-1;
      res.writeHead(206,{'Content-Type':type,'Content-Length':end-start+1,'Content-Range':`bytes ${start}-${end}/${info.size}`,'Accept-Ranges':'bytes'});
      createReadStream(file,{start,end}).pipe(res); return;
    }
    res.writeHead(200,{'Content-Type':type,'Content-Length':info.size,'Accept-Ranges':'bytes'}); createReadStream(file).pipe(res);
  }catch{res.writeHead(404,{'Content-Type':'text/plain'});res.end('Not found');}
}).listen(port,()=>console.log(`PartyPlay running at http://localhost:${port}`));
