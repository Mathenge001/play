import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {EventEmitter} from 'node:events';
import {fileURLToPath} from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url));
const projectRoot=path.resolve(here,'..');
const dist=path.join(projectRoot,'dist');
const staticRoot=process.env.PARTYPLAY_STATIC_DIR?path.resolve(process.env.PARTYPLAY_STATIC_DIR):(fs.existsSync(dist)?dist:projectRoot);
const port=Number(process.env.PORT||8787);
const host=process.env.HOST||'0.0.0.0';
const rooms=new Map();
const clients=new Set();
const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const roomCode=()=>Array.from({length:5},()=>alphabet[Math.floor(Math.random()*alphabet.length)]).join('');
const id=()=>crypto.randomUUID();
const token=()=>crypto.randomBytes(24).toString('base64url');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.webmanifest':'application/manifest+json','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.mp3':'audio/mpeg','.txt':'text/plain; charset=utf-8'};

class WSConnection extends EventEmitter{
  constructor(socket,maxPayload=900_000){super();this.socket=socket;this.open=true;this.buffer=Buffer.alloc(0);this.maxPayload=maxPayload;this.fragmentOpcode=null;this.fragments=[];this.fragmentBytes=0;socket.on('data',d=>this.consume(d));socket.on('close',()=>{if(this.open){this.open=false;this.emit('close')}});socket.on('error',()=>{if(this.open){this.open=false;this.emit('close')}})}
  frame(opcode,payload=Buffer.alloc(0)){const len=payload.length;let head;if(len<126){head=Buffer.alloc(2);head[1]=len}else if(len<=0xffff){head=Buffer.alloc(4);head[1]=126;head.writeUInt16BE(len,2)}else{head=Buffer.alloc(10);head[1]=127;head.writeBigUInt64BE(BigInt(len),2)}head[0]=0x80|opcode;return Buffer.concat([head,payload])}
  sendJSON(obj){if(!this.open)return;const payload=Buffer.from(JSON.stringify(obj));this.socket.write(this.frame(0x1,payload))}
  ping(){if(this.open)this.socket.write(this.frame(0x9,Buffer.from('p')))}
  pong(payload){if(this.open)this.socket.write(this.frame(0xA,payload))}
  close(){if(!this.open)return;try{this.socket.write(this.frame(0x8))}catch{}this.open=false;try{this.socket.end()}catch{}}
  fail(){this.close()}
  consume(chunk){this.buffer=Buffer.concat([this.buffer,chunk]);while(this.buffer.length>=2){const b0=this.buffer[0],b1=this.buffer[1],fin=!!(b0&0x80),opcode=b0&0x0f,masked=!!(b1&0x80);let len=b1&0x7f,offset=2;if(len===126){if(this.buffer.length<4)return;len=this.buffer.readUInt16BE(2);offset=4}else if(len===127){if(this.buffer.length<10)return;const big=this.buffer.readBigUInt64BE(2);if(big>BigInt(this.maxPayload))return this.fail();len=Number(big);offset=10}if(len>this.maxPayload)return this.fail();let mask=null;if(masked){if(this.buffer.length<offset+4)return;mask=this.buffer.subarray(offset,offset+4);offset+=4}if(this.buffer.length<offset+len)return;let payload=Buffer.from(this.buffer.subarray(offset,offset+len));this.buffer=this.buffer.subarray(offset+len);if(masked)for(let i=0;i<payload.length;i++)payload[i]^=mask[i%4];
      if(opcode===0x8){this.close();return}if(opcode===0x9){this.pong(payload);continue}if(opcode===0xA){this.emit('pong');continue}
      if(opcode===0x1&&!fin){this.fragmentOpcode=0x1;this.fragments=[payload];this.fragmentBytes=payload.length;continue}
      if(opcode===0x0&&this.fragmentOpcode){this.fragments.push(payload);this.fragmentBytes+=payload.length;if(this.fragmentBytes>this.maxPayload)return this.fail();if(fin){const all=Buffer.concat(this.fragments);this.fragments=[];this.fragmentOpcode=null;this.fragmentBytes=0;this.emit('message',all.toString('utf8'))}continue}
      if(opcode===0x1&&fin)this.emit('message',payload.toString('utf8'));
    }}
}
const send=(ws,msg)=>ws?.open&&ws.sendJSON(msg);
const publicParticipants=(room)=>[...room.participants.values()].map(({ws,resumeToken,...p})=>p);
const roomState=(room)=>({type:'room-state',code:room.code,participants:publicParticipants(room),session:room.session,hostConnected:!!room.host?.open});
const broadcast=(room,msg,{includeHost=true,roles=null}={})=>{if(includeHost)send(room.host,msg);for(const p of room.participants.values())if(!roles||roles.includes(p.role))send(p.ws,msg)};
const broadcastState=(room)=>broadcast(room,roomState(room));
function chooseTeam(room){const teams=room.session?.teams||[];if(!teams.length)return'';const counts=new Map(teams.map(t=>[t.id,0]));for(const p of room.participants.values())if(p.role==='player'&&p.teamId&&counts.has(p.teamId))counts.set(p.teamId,counts.get(p.teamId)+1);return[...counts.entries()].sort((a,b)=>a[1]-b[1])[0]?.[0]||teams[0].id}
function makeRoom(session,hostSocket){let code=roomCode();while(rooms.has(code))code=roomCode();const room={code,session:session||{},host:hostSocket,participants:new Map(),submissions:new Map(),createdAt:Date.now(),updatedAt:Date.now(),roundStartedAt:0,currentRound:null};rooms.set(code,room);hostSocket.pp={role:'host',code};return room}

const server=http.createServer((req,res)=>{const requestUrl=new URL(req.url||'/',`http://${req.headers.host||'localhost'}`);if(requestUrl.pathname==='/health'){res.writeHead(200,{'content-type':'application/json'});res.end(JSON.stringify({ok:true,rooms:rooms.size}));return}let rel=decodeURIComponent(requestUrl.pathname);if(rel==='/'||!path.extname(rel))rel=rel==='/'?'/index.html':`${rel}.html`;const filePath=path.resolve(staticRoot,'.'+rel);if(!filePath.startsWith(staticRoot)){res.writeHead(403);res.end('Forbidden');return}fs.stat(filePath,(err,st)=>{if(err||!st.isFile()){const fallback=path.join(staticRoot,'404.html');if(fs.existsSync(fallback)){res.writeHead(404,{'content-type':'text/html; charset=utf-8'});fs.createReadStream(fallback).pipe(res)}else{res.writeHead(404);res.end('Not found')}return}const ext=path.extname(filePath).toLowerCase();res.writeHead(200,{'content-type':mime[ext]||'application/octet-stream','cache-control':ext==='.html'?'no-cache':'public, max-age=3600'});fs.createReadStream(filePath).pipe(res)})});

server.on('upgrade',(req,socket)=>{const u=new URL(req.url||'/',`http://${req.headers.host||'localhost'}`);if(u.pathname!=='/live'){socket.destroy();return}const key=req.headers['sec-websocket-key'];if(!key){socket.destroy();return}const accept=crypto.createHash('sha1').update(key+'258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');socket.write('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: '+accept+'\r\n\r\n');const ws=new WSConnection(socket);clients.add(ws);ws.isAlive=true;ws.on('pong',()=>ws.isAlive=true);ws.on('message',raw=>handleMessage(ws,raw));ws.on('close',()=>handleClose(ws))});

function handleMessage(ws,raw){let msg;try{msg=JSON.parse(raw)}catch{return}if(!msg?.type)return;
  if(msg.type==='create-room'){const room=makeRoom(msg.session||{},ws);send(ws,{type:'room-created',code:room.code,session:room.session});send(ws,roomState(room));return}
  const code=String(msg.code||'').toUpperCase(),room=rooms.get(code);
  if(msg.type==='room-info-request'){if(!room){send(ws,{type:'room-error',message:'Room not found. Check the code and ask the host if the game is still open.'});return}send(ws,{type:'room-info',code,session:room.session,participantCount:publicParticipants(room).filter(p=>p.role==='player').length});return}
  if(msg.type==='join-room'){if(!room){send(ws,{type:'room-error',message:'Room not found or already closed.'});return}const role=['player','display','audience'].includes(msg.role)?msg.role:'player',name=String(msg.name||role).trim().slice(0,28)||'Player';let p=null;if(msg.resumeToken)p=[...room.participants.values()].find(x=>x.resumeToken===msg.resumeToken&&x.role===role)||null;if(p){p.ws=ws;p.connected=true;p.name=name;p.lastSeen=Date.now()}else{let teamId=String(msg.teamId||'');if(role==='player'&&room.session?.playStyle==='teams'){const valid=(room.session.teams||[]).some(t=>t.id===teamId);if(!valid)teamId=chooseTeam(room)}p={participantId:id(),resumeToken:token(),name,role,teamId,connected:true,joinedAt:Date.now(),lastSeen:Date.now(),ws};room.participants.set(p.participantId,p)}ws.pp={role,code,participantId:p.participantId};send(ws,{type:'joined',code,participantId:p.participantId,resumeToken:p.resumeToken,name:p.name,role:p.role,teamId:p.teamId,session:room.session});broadcastState(room);return}
  if(!room)return;room.updatedAt=Date.now();const isHost=ws===room.host;
  if(msg.type==='round-start'&&isHost){room.submissions.clear();room.roundStartedAt=Date.now();room.currentRound=msg.round||null;broadcast(room,{type:'round-start',round:msg.round,roundIndex:msg.roundIndex,totalRounds:msg.totalRounds,duration:msg.duration,startedAt:room.roundStartedAt,turn:msg.turn,scores:msg.scores||[],wagerOptions:Array.isArray(msg.wagerOptions)?msg.wagerOptions.slice(0,4):[]},{includeHost:false});return}
  if(msg.type==='timer'&&isHost){broadcast(room,{type:'timer',timeLeft:Number(msg.timeLeft)||0},{includeHost:false});return}
  if(msg.type==='answer'){const pp=ws.pp;if(!pp||pp.role!=='player'||!pp.participantId)return;const p=room.participants.get(pp.participantId);if(!p||room.submissions.has(p.participantId))return;const receivedAt=Date.now();const wagerPct=Math.max(0,Math.min(1,Number(msg.wagerPct)||0));const response={participantId:p.participantId,name:p.name,teamId:p.teamId,answer:msg.answer,wagerPct,receivedAt,serverElapsedMs:Math.max(0,receivedAt-room.roundStartedAt),clientElapsedMs:Number(msg.clientElapsedMs)||null};room.submissions.set(p.participantId,response);send(ws,{type:'answer-locked',receivedAt,serverElapsedMs:response.serverElapsedMs});send(room.host,{type:'answer-received',response});return}
  if(msg.type==='photo-submit'){const pp=ws.pp;if(!pp||pp.role!=='player'||!pp.participantId)return;const p=room.participants.get(pp.participantId),data=String(msg.dataUrl||'');if(!p||!data.startsWith('data:image/')||data.length>750_000)return;send(room.host,{type:'photo-received',participantId:p.participantId,name:p.name,teamId:p.teamId,roundId:String(msg.roundId||''),dataUrl:data});send(ws,{type:'photo-accepted'});return}
  if(msg.type==='round-result'&&isHost){broadcast(room,{type:'round-result',answer:msg.answer,fact:msg.fact||'',results:msg.results||[],scores:msg.scores||[],roundIndex:msg.roundIndex},{includeHost:false});return}
  if(msg.type==='game-finished'&&isHost){broadcast(room,{type:'game-finished',winner:msg.winner,scores:msg.scores||[],prize:String(msg.prize||'').slice(0,120),awards:Array.isArray(msg.awards)?msg.awards.slice(0,8):[]},{includeHost:false});return}
}
function handleClose(ws){clients.delete(ws);const pp=ws.pp;if(!pp)return;const room=rooms.get(pp.code);if(!room)return;if(pp.role==='host'){room.host=null;room.hostDisconnectedAt=Date.now()}else if(pp.participantId){const p=room.participants.get(pp.participantId);if(p){p.connected=false;p.ws=null;p.lastSeen=Date.now()}}broadcastState(room)}

const heartbeat=setInterval(()=>{for(const ws of clients){if(ws.isAlive===false){ws.close();clients.delete(ws);continue}ws.isAlive=false;ws.ping()}const now=Date.now();for(const [code,room] of rooms){const age=now-room.createdAt,last=now-room.updatedAt;if(age>6*60*60*1000||(!room.host&&last>30*60*1000))rooms.delete(code)}},30_000);
server.on('close',()=>clearInterval(heartbeat));
server.listen(port,host,()=>{console.log(`PartyPlay running on http://localhost:${port}`);console.log(`Static root: ${staticRoot}`);console.log('Live rooms are temporary and stored only in server memory.')});
