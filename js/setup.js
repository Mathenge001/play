(() => {
  const PP=window.PartyPlay, C=window.PARTYPLAY_CONTENT;
  const $=(s)=>document.querySelector(s);
  const $$=(s)=>[...document.querySelectorAll(s)];
  const params=new URLSearchParams(location.search); const initialMode=params.get('mode')||'party';
  let players=[{id:PP.uuid(),name:'Player 1'},{id:PP.uuid(),name:'Player 2'}];
  let teams=[{id:PP.uuid(),name:'Team 1',members:[{id:PP.uuid(),name:'Player 1'}]},{id:PP.uuid(),name:'Team 2',members:[{id:PP.uuid(),name:'Player 2'}]}];
  const saved=PP.load(PP.STORAGE.preset,null);
  if(saved?.players?.length)players=saved.players;
  if(saved?.teams?.length)teams=saved.teams;

  const packBox=$('#customPacks');
  C.packChoices.forEach(([id,label])=>{const el=document.createElement('label');el.className='pack-toggle';el.innerHTML=`<input type="checkbox" value="${id}" ${['general','history','geography','science','kenya','tasks'].includes(id)?'checked':''}><span>${PP.escapeHTML(label)}</span>`;packBox.appendChild(el)});
  const categoryRoot=$('#categoryFilters'); const allCategories=[...new Set(C.rounds.map(r=>r.category).filter(Boolean))].sort((a,b)=>a.localeCompare(b)); allCategories.forEach(cat=>{const el=document.createElement('label');el.className='pack-toggle';el.innerHTML=`<input type="checkbox" value="${PP.escapeHTML(cat)}"><span>${PP.escapeHTML(cat)}</span>`;categoryRoot.appendChild(el)});

  function renderPlayers(){
    const root=$('#playerRows');root.innerHTML='';
    players.forEach((p,i)=>{const row=document.createElement('div');row.className='roster-row';row.innerHTML=`<input aria-label="Player ${i+1} name" maxlength="28" value="${PP.escapeHTML(p.name)}" data-player="${p.id}"><button class="remove-row" type="button" data-remove-player="${p.id}" aria-label="Remove ${PP.escapeHTML(p.name)}">×</button>`;root.appendChild(row)});
    root.querySelectorAll('[data-player]').forEach(inp=>inp.addEventListener('input',()=>{const p=players.find(x=>x.id===inp.dataset.player);if(p)p.name=inp.value;updateCompat()}));
    root.querySelectorAll('[data-remove-player]').forEach(btn=>btn.addEventListener('click',()=>{if(players.length<=1)return;players=players.filter(p=>p.id!==btn.dataset.removePlayer);renderPlayers();updateCompat()}));
  }
  function renderTeams(){
    const root=$('#teamRows');root.innerHTML='';
    teams.forEach((t,ti)=>{
      const card=document.createElement('div');card.className='team-card';
      const members=(t.members||[]).map(m=>`<span class="member-chip"><input style="width:120px;padding:4px 6px;border:0;background:transparent" maxlength="24" value="${PP.escapeHTML(m.name)}" data-member="${m.id}" data-team="${t.id}"><button type="button" data-remove-member="${m.id}" data-team="${t.id}" aria-label="Remove player">×</button></span>`).join('');
      card.innerHTML=`<div class="team-card-head"><input class="team-name" maxlength="28" value="${PP.escapeHTML(t.name)}" data-team-name="${t.id}"><button class="remove-row" type="button" data-remove-team="${t.id}" aria-label="Remove team">×</button></div><div class="team-members">${members}</div><div class="add-member"><input placeholder="Add player to ${PP.escapeHTML(t.name)}" maxlength="24" data-new-member="${t.id}"><button class="mini-btn" type="button" data-add-member="${t.id}">Add</button></div>`;
      root.appendChild(card);
    });
    root.querySelectorAll('[data-team-name]').forEach(inp=>inp.addEventListener('input',()=>{const t=teams.find(x=>x.id===inp.dataset.teamName);if(t)t.name=inp.value;updateCompat()}));
    root.querySelectorAll('[data-member]').forEach(inp=>inp.addEventListener('input',()=>{const t=teams.find(x=>x.id===inp.dataset.team);const m=t?.members?.find(x=>x.id===inp.dataset.member);if(m)m.name=inp.value;updateCompat()}));
    root.querySelectorAll('[data-remove-team]').forEach(btn=>btn.addEventListener('click',()=>{if(teams.length<=2)return;teams=teams.filter(t=>t.id!==btn.dataset.removeTeam);renderTeams();updateCompat()}));
    root.querySelectorAll('[data-remove-member]').forEach(btn=>btn.addEventListener('click',()=>{const t=teams.find(x=>x.id===btn.dataset.team);if(!t||t.members.length<=1)return;t.members=t.members.filter(m=>m.id!==btn.dataset.removeMember);renderTeams();updateCompat()}));
    root.querySelectorAll('[data-add-member]').forEach(btn=>btn.addEventListener('click',()=>{const t=teams.find(x=>x.id===btn.dataset.addMember),input=root.querySelector(`[data-new-member="${btn.dataset.addMember}"]`);const name=input?.value.trim();if(t&&name){t.members.push({id:PP.uuid(),name});renderTeams();updateCompat()}}));
    root.querySelectorAll('[data-new-member]').forEach(inp=>inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();root.querySelector(`[data-add-member="${inp.dataset.newMember}"]`)?.click()}}));
  }
  function currentStyle(){return $('input[name="playStyle"]:checked')?.value||'individual'}
  function currentVibe(){return $('input[name="vibe"]:checked')?.value||'party'}
  function config(){
    return {
      playStyle:currentStyle(),
      players:players.filter(p=>p.name.trim()).map(p=>({...p,name:p.name.trim()})),
      teams:teams.filter(t=>t.name.trim()).map(t=>({...t,name:t.name.trim(),members:(t.members||[]).filter(m=>m.name.trim()).map(m=>({...m,name:m.name.trim()}))})),
      devices:{count:Number($('#deviceCount').value)||1,mode:$('#deviceMode').value,tv:$('#hasTv').checked,camera:$('#cameraAllowed').checked,internet:$('#internetAvailable').checked},
      vibe:currentVibe(),customPacks:$$('#customPacks input:checked').map(x=>x.value),categories:$$('#categoryFilters input:checked').map(x=>x.value),roundCount:Number($('#roundCount').value),timerMode:$('#timerMode').value,difficulty:$('#difficulty').value,
      speedScoring:$('#speedScoring').checked,steals:$('#steals').checked,partyDirector:$('#partyDirector').checked,
      wager:{mode:currentVibe()==='learn'?'off':$('#wagerMode').value,max:Number($('#wagerMax').value)||0.5},
      awards:{winnerPrize:$('#winnerPrize').value.trim(),recognition:$('#recognitionAwards').checked},
      learn:{level:$('#learnLevel').value,focus:$('#learnFocus').value},
      host:{playing:true,name:'Host'},
      live:false
    };
  }
  function totalPlayers(cfg){return cfg.playStyle==='teams'?cfg.teams.reduce((n,t)=>n+t.members.length,0):cfg.players.length}
  function updateCompat(){
    const cfg=config();const caps=PP.capabilities(cfg);const liveCaps=PP.capabilities({...cfg,live:true});const playersCount=totalPlayers(cfg);const teamCount=cfg.teams.length;
    const personalReady=cfg.devices.mode==='personal'&&cfg.devices.count>=playersCount;
    $('#fitCount').textContent=`${caps.count} compatible rounds`;
    $('#compatibilitySummary').innerHTML=`
      <div class="compat-stat"><b>${playersCount}</b><span>players</span></div>
      <div class="compat-stat"><b>${cfg.playStyle==='teams'?teamCount:'—'}</b><span>teams</span></div>
      <div class="compat-stat"><b>${cfg.devices.count}</b><span>player devices</span></div>
      <div class="compat-stat"><b>${caps.count}</b><span>local-compatible rounds</span></div>
      <div class="compat-stat"><b>${liveCaps.count}</b><span>live-compatible rounds</span></div>
      <div class="compat-stat"><b>${caps.engines.puzzle||0}</b><span>puzzles</span></div>
      <div class="compat-stat"><b>${caps.engines.task||0}</b><span>tasks</span></div>
      <div class="compat-stat"><b>${personalReady?'YES':'NO'}</b><span>full personal-device games</span></div>
      <div class="compat-stat"><b>${cfg.wager?.mode==='off'?'OFF':String(cfg.wager?.mode||'OFF').toUpperCase()}</b><span>virtual wagering</span></div>`;
    $('#startLive').disabled=!cfg.devices.internet;
    $('#startLive').title=cfg.devices.internet?'Create a temporary realtime room':'Internet is required for live multiplayer';
  }
  function applySaved(s){
    if(!s)return;
    if(s.playStyle)document.querySelector(`input[name="playStyle"][value="${s.playStyle}"]`)?.click();
    for(const [id,path] of [['deviceCount',s.devices?.count],['deviceMode',s.devices?.mode],['roundCount',s.roundCount],['timerMode',s.timerMode],['difficulty',s.difficulty],['wagerMode',s.wager?.mode],['wagerMax',s.wager?.max],['winnerPrize',s.awards?.winnerPrize],['learnLevel',s.learn?.level],['learnFocus',s.learn?.focus]])if(path!=null&&$(`#${id}`))$(`#${id}`).value=path;
    $('#hasTv').checked=!!s.devices?.tv;$('#cameraAllowed').checked=!!s.devices?.camera;$('#internetAvailable').checked=s.devices?.internet!==false;
    $('#speedScoring').checked=s.speedScoring!==false;$('#steals').checked=s.steals!==false;$('#partyDirector').checked=s.partyDirector!==false;$('#recognitionAwards').checked=s.awards?.recognition!==false;
    if(s.vibe)document.querySelector(`input[name="vibe"][value="${s.vibe}"]`)?.click();
    if(Array.isArray(s.categories))$$('#categoryFilters input').forEach(x=>x.checked=s.categories.includes(x.value));
  }
  function validate(cfg){
    if(cfg.playStyle==='individual'&&cfg.players.length<1)return'Add at least one player.';
    if(cfg.playStyle==='teams'&&cfg.teams.length<2)return'Add at least two teams.';
    if(cfg.playStyle==='teams'&&cfg.teams.some(t=>t.members.length<1))return'Each team needs at least one player.';
    if(cfg.devices.count<1)return'At least one player device is required.';
    if(PP.capabilities(cfg).count<1)return'No rounds fit this setup. Enable more packs or capabilities.';
    return'';
  }
  function start(live){
    const cfg=config();const error=validate(cfg);$('#setupError').textContent=error;if(error)return;
    cfg.live=!!live;
    const session=PP.buildSession(cfg);PP.save(PP.STORAGE.session,session);PP.save(PP.STORAGE.preset,cfg);
    location.href=`play.html?mode=${live?'live':'local'}`;
  }
  $('input[name="playStyle"][value="individual"]').addEventListener('change',()=>{$('#individualEditor').classList.remove('hidden');$('#teamEditor').classList.add('hidden');updateCompat()});
  $('input[name="playStyle"][value="teams"]').addEventListener('change',()=>{$('#individualEditor').classList.add('hidden');$('#teamEditor').classList.remove('hidden');updateCompat()});
  $('#addPlayer').addEventListener('click',()=>{players.push({id:PP.uuid(),name:`Player ${players.length+1}`});renderPlayers();updateCompat()});
  $('#addTeam').addEventListener('click',()=>{teams.push({id:PP.uuid(),name:`Team ${teams.length+1}`,members:[{id:PP.uuid(),name:`Player ${teams.reduce((n,t)=>n+t.members.length,0)+1}`} ]});renderTeams();updateCompat()});
  $('#shuffleTeams').addEventListener('click',()=>{const members=PP.shuffle(teams.flatMap(t=>t.members));teams.forEach(t=>t.members=[]);members.forEach((m,i)=>teams[i%teams.length].members.push(m));renderTeams();updateCompat()});
  function syncModeControls(){const learn=currentVibe()==='learn';$('#customPacks').classList.toggle('hidden',currentVibe()!=='custom');$('#wagerMode').disabled=learn;$('#wagerMax').disabled=learn;if(learn)$('#wagerMode').value='off'}
  $$('input[name="vibe"]').forEach(r=>r.addEventListener('change',()=>{syncModeControls();updateCompat()}));
  $$('#setupForm input, #setupForm select').forEach(el=>el.addEventListener('change',updateCompat));

  $('#clearCategories').addEventListener('click',()=>{$$('#categoryFilters input').forEach(x=>x.checked=false);updateCompat()});

  $('#customPackFile').addEventListener('change',async()=>{const file=$('#customPackFile').files?.[0];if(!file)return;try{const data=JSON.parse(await file.text());const rows=Array.isArray(data)?data:data.rounds;if(!Array.isArray(rows)||!rows.length)throw new Error('Pack needs a rounds array.');const allowed=new Set(['quiz','puzzle','task','social','visual','music','learn']);const clean=rows.slice(0,300).filter(r=>r&&allowed.has(r.engine)&&typeof r.prompt==='string').map((r,i)=>({...r,id:r.id||`imported-${i}`}));if(!clean.length)throw new Error('No valid rounds found.');localStorage.setItem('partyplay.customRounds.v1',JSON.stringify(clean));$('#packImportStatus').textContent=`Imported ${clean.length} rounds. Reloading the pack library…`;setTimeout(()=>location.reload(),500)}catch(e){$('#packImportStatus').textContent=`Could not import: ${e.message}`}});
  $('#downloadPackTemplate').addEventListener('click',()=>{const sample={name:'My Party Pack',rounds:[{id:'my-quiz-1',engine:'quiz',category:'Friends',difficulty:'easy',prompt:'Your question here?',answer:'Answer',options:['Answer','Option B','Option C','Option D'],points:1,seconds:20}]};const blob=new Blob([JSON.stringify(sample,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='partyplay-pack-template.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)});

  $('#savePreset').addEventListener('click',()=>{PP.save(PP.STORAGE.preset,config());$('#savePreset').textContent='Saved ✓';setTimeout(()=>$('#savePreset').textContent='Save setup',1200)});
  $('#startLive').addEventListener('click',()=>start(true));
  $('#setupForm').addEventListener('submit',e=>{e.preventDefault();start(false)});

  renderPlayers();renderTeams();
  if(saved)applySaved(saved);
  if(initialMode==='quick'){$('#deviceCount').value=1;$('#deviceMode').value='single';$('#roundCount').value=10;document.querySelector('input[name="vibe"][value="party"]').click()}
  if(initialMode==='learn'){document.querySelector('input[name="vibe"][value="learn"]').click();$('#cameraAllowed').checked=false;$('#speedScoring').checked=false;$('#difficulty').value='adaptive';$('#wagerMode').value='off'}
  syncModeControls();updateCompat();
})();
