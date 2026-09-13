(() => {
  const STORAGE={session:'partyplay.session.v3',preset:'partyplay.preset.v3',resume:'partyplay.resume.v3',provider:'partyplay.musicProvider.v3',progress:'partyplay.learnProgress.v1'};
  const safeJSON=(raw,fallback)=>{try{return JSON.parse(raw)??fallback}catch{return fallback}};
  const load=(key,fallback=null)=>safeJSON(localStorage.getItem(key),fallback);
  const save=(key,value)=>localStorage.setItem(key,JSON.stringify(value));
  const uuid=()=>globalThis.crypto?.randomUUID?.()||`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  const shuffle=(arr)=>{const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
  const escapeHTML=(v)=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize=(v)=>String(v??'').trim().toLowerCase().replace(/[^a-z0-9\s]/g,'').replace(/\s+/g,' ');
  const providerUrl=(provider,query)=>{
    const q=encodeURIComponent(query||'');
    if(provider==='spotify')return `https://open.spotify.com/search/${q}`;
    if(provider==='ytmusic')return `https://music.youtube.com/search?q=${q}`;
    if(provider==='youtube')return `https://www.youtube.com/results?search_query=${q}`;
    if(provider==='audius')return `https://audius.co/search?q=${q}`;
    return `https://www.youtube.com/results?search_query=${q}`;
  };
  const pointsFor=(round)=>round.points||({easy:1,medium:2,hard:3}[round.difficulty]||2);
  const durationFor=(round,mode)=>{
    if(mode==='untimed')return 0;
    const base=round.seconds||20;
    if(mode==='relaxed')return Math.round(base*1.5);
    if(mode==='chaos')return Math.max(7,Math.round(base*.65));
    return base;
  };
  const compatible=(round,session)=>{
    const req=round.requires||{}; const devices=session.devices||{}; const players=(session.playStyle==='teams'?session.teams?.flatMap(t=>t.members||[]):session.players)||[];
    const playerCount=Math.max(1,players.length||session.teams?.length||1);
    const deviceCount=Math.max(1,Number(devices.count)||1);
    if((req.minDevices||1)>deviceCount)return false;
    if(req.liveOnly&&!session.live)return false;
    if(req.teamMode&&session.playStyle!=='teams')return false;
    if(req.personal && !(devices.mode==='personal' && deviceCount>=playerCount))return false;
    if(req.camera && !devices.camera)return false;
    if(req.tv && req.tvRequired && !devices.tv)return false;
    if(req.online && !devices.internet)return false;
    return true;
  };
  const roundsFor=(session)=>{
    const content=window.PARTYPLAY_CONTENT; if(!content)return [];
    let allowed=[];
    if(session.vibe==='custom')allowed=session.customPacks||[]; else allowed=content.packs[session.vibe]?.includes||['party'];
    let pool=content.rounds.filter(r=>allowed.includes(r.pack) && compatible(r,session));
    if(session.vibe==='party'){
      // deliberately include a broad mix so Mixed Party feels varied.
      pool=content.rounds.filter(r=>['party','general','history','geography','science','kenya','brainrot','tasks','smart'].includes(r.pack)&&compatible(r,session));
    }
    if(session.vibe==='learn'){
      pool=pool.filter(r=>!r.learnLevel||r.learnLevel===session.learn?.level||session.learn?.level==='mixed');
      if(session.learn?.focus&&session.learn.focus!=='mixed')pool=pool.filter(r=>String(r.category||'').toLowerCase()===session.learn.focus);
    }
    if(Array.isArray(session.categories)&&session.categories.length)pool=pool.filter(r=>session.categories.includes(r.category));
    if(session.difficulty==='chill') pool=pool.filter(r=>r.difficulty!=='hard');
    if(session.difficulty==='hard') pool=pool.filter(r=>r.difficulty!=='easy');
    return pool;
  };
  const partyDirector=(pool,count)=>{
    if(!pool.length)return [];
    const byEngine={};pool.forEach(r=>(byEngine[r.engine]??=[]).push(r));Object.values(byEngine).forEach(a=>a.splice(0,a.length,...shuffle(a)));
    const pattern=['quiz','puzzle','visual','quiz','task','quiz','social','puzzle','music','quiz'];
    const used=new Set(),out=[];let pi=0;
    while(out.length<count && used.size<pool.length){
      const engine=pattern[pi++%pattern.length];
      let bucket=(byEngine[engine]||[]).filter(r=>!used.has(r.id));
      if(!bucket.length)bucket=pool.filter(r=>!used.has(r.id));
      if(!bucket.length)break;
      const pick=bucket[Math.floor(Math.random()*bucket.length)]; used.add(pick.id);out.push(pick);
    }
    while(out.length<count){out.push(shuffle(pool)[0])}
    return out;
  };
  const buildSession=(config)=>{
    const freshStats=()=>({correct:0,wrong:0,wagered:0,wagerWins:0,puzzleCorrect:0,fastestMs:null});const competitors=config.playStyle==='teams'?(config.teams||[]).map(t=>({id:t.id,name:t.name,score:0,type:'team',members:t.members||[],stats:freshStats()})):(config.players||[]).map(p=>({id:p.id,name:p.name,score:0,type:'player',stats:freshStats()}));
    const base={id:uuid(),createdAt:Date.now(),status:'ready',roundIndex:0,competitorIndex:0,competitors,...config};
    const pool=roundsFor(base), count=Math.max(1,Math.min(Number(config.roundCount)||20,100));
    base.deck=config.partyDirector===false?shuffle(pool).slice(0,count):partyDirector(pool,count);
    base.roundCount=base.deck.length;
    return base;
  };
  const capabilities=(config)=>{
    const pool=roundsFor(config); const engines={};pool.forEach(r=>engines[r.engine]=(engines[r.engine]||0)+1);
    return {count:pool.length,engines,camera:pool.filter(r=>r.requires?.camera).length,liveReady:(config.devices?.internet&&config.devices?.count>=2)};
  };
  const registerSW=()=>{if('serviceWorker'in navigator && location.protocol.startsWith('http'))navigator.serviceWorker.register('service-worker.js').catch(()=>{})};
  window.PartyPlay={STORAGE,load,save,uuid,shuffle,escapeHTML,normalize,providerUrl,pointsFor,durationFor,compatible,roundsFor,partyDirector,buildSession,capabilities,registerSW};
  registerSW();
})();
