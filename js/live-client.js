(() => {
  class PartyPlayLiveClient {
    constructor(){this.ws=null;this.handlers=new Map();this.connected=false;this.participantId=null;this.resumeToken=localStorage.getItem('partyplay.liveResume')||'';}
    url(){
      if(window.PARTYPLAY_LIVE_URL)return window.PARTYPLAY_LIVE_URL;
      const configured=localStorage.getItem('partyplay.liveUrl');if(configured)return configured;
      if(location.protocol==='file:')return 'ws://localhost:8787/live';
      return `${location.protocol==='https:'?'wss:':'ws:'}//${location.host}/live`;
    }
    on(type,fn){if(!this.handlers.has(type))this.handlers.set(type,[]);this.handlers.get(type).push(fn);return this}
    emit(type,data){(this.handlers.get(type)||[]).forEach(fn=>fn(data));(this.handlers.get('*')||[]).forEach(fn=>fn({type,...data}))}
    connect(){return new Promise((resolve,reject)=>{let settled=false;try{this.ws=new WebSocket(this.url())}catch(e){reject(e);return}const timer=setTimeout(()=>{if(!settled){settled=true;try{this.ws.close()}catch{};reject(new Error('Live server connection timed out'))}},5000);this.ws.addEventListener('open',()=>{this.connected=true;clearTimeout(timer);if(!settled){settled=true;resolve(this)};this.emit('connected',{})});this.ws.addEventListener('close',()=>{this.connected=false;this.emit('disconnected',{})});this.ws.addEventListener('error',()=>{if(!settled){settled=true;clearTimeout(timer);reject(new Error('Could not connect to PartyPlay Live'))}});this.ws.addEventListener('message',e=>{let msg;try{msg=JSON.parse(e.data)}catch{return}if(msg.participantId)this.participantId=msg.participantId;if(msg.resumeToken){this.resumeToken=msg.resumeToken;localStorage.setItem('partyplay.liveResume',msg.resumeToken)}this.emit(msg.type,msg)})})}
    send(type,payload={}){if(!this.ws||this.ws.readyState!==WebSocket.OPEN)return false;this.ws.send(JSON.stringify({type,...payload}));return true}
    close(){try{this.ws?.close()}catch{}}
  }
  window.PartyPlayLiveClient=PartyPlayLiveClient;
})();
