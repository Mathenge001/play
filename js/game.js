(() => {
  const storage = {
    getPlayers() { try { return JSON.parse(localStorage.getItem('partyplay.players') || '[]'); } catch { return []; } },
    setPlayers(players) { localStorage.setItem('partyplay.players', JSON.stringify(players)); },
    getProvider() { return localStorage.getItem('partyplay.musicProvider') || 'spotify'; }
  };

  const container = document.getElementById('cardContainer');
  if (!container) return;
  let deck = Array.from(container.querySelectorAll('.card'));
  if (!deck.length) return;
  let index = 0;
  let visited = new Set([0]);
  let turnIndex = Number(localStorage.getItem('partyplay.turnIndex') || 0);
  const mode = document.body.dataset.mode || 'game';

  const els = {
    counter: document.getElementById('cardCounter'),
    fill: document.getElementById('progressFill'),
    prev: document.getElementById('prevBtn'),
    next: document.getElementById('nextBtn'),
    reveal: document.getElementById('revealBtn'),
    score: document.getElementById('scoreBtn'),
    shuffle: document.getElementById('shuffleBtn'),
    players: document.getElementById('playersList'),
    turn: document.getElementById('turnName'),
    modeStat: document.getElementById('modeStat'),
    deckStat: document.getElementById('deckStat'),
    music: document.getElementById('musicBtn'),
    toast: document.getElementById('toast')
  };

  const stopAudio = () => document.querySelectorAll('audio').forEach(a => { try { a.pause(); a.currentTime = 0; } catch {} });
  const current = () => deck[index];
  const players = () => storage.getPlayers().map(p => typeof p === 'string' ? {name:p,score:0} : p);
  const saveTurn = () => localStorage.setItem('partyplay.turnIndex', String(turnIndex));
  const toast = (text) => { if (!els.toast) return; els.toast.textContent = text; els.toast.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => els.toast.classList.remove('show'), 1500); };

  function normalizeCards() {
    deck.forEach((card, i) => {
      card.removeAttribute('onclick');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Card ${i + 1}. Tap to reveal answer.`);
      card.tabIndex = i === 0 ? 0 : -1;
      card.querySelectorAll('audio').forEach(audio => { audio.removeAttribute('autoplay'); audio.setAttribute('preload','metadata'); });
      card.addEventListener('click', (e) => {
        if (e.target.closest('audio, button, a, input')) return;
        toggleReveal();
      });
    });
  }

  function hasMusic(card) {
    if (!card) return false;
    if (card.querySelector('audio')) return true;
    const text = card.textContent.toLowerCase();
    return ['song','music','lyric','theme song','artist'].some(term => text.includes(term));
  }
  function musicQuery(card) {
    const back = card?.querySelector('.card-back p');
    const front = card?.querySelector('.card-front p');
    const source = back || front;
    if (!source) return 'party music';
    const clone = source.cloneNode(true);
    clone.querySelectorAll('audio, source').forEach(n => n.remove());
    return clone.textContent.replace(/Your browser does not support the audio element\.?/gi,'').replace(/Timestamp:.*/gi,'').trim().slice(0,140) || 'party music';
  }
  function providerUrl(q) {
    const encoded = encodeURIComponent(q);
    switch (storage.getProvider()) {
      case 'ytmusic': return `https://music.youtube.com/search?q=${encoded}`;
      case 'youtube': return `https://www.youtube.com/results?search_query=${encoded}`;
      default: return `https://open.spotify.com/search/${encoded}`;
    }
  }
  function openMusic() { window.open(providerUrl(musicQuery(current())), '_blank', 'noopener,noreferrer'); }

  function renderPlayers() {
    const list = players();
    if (!els.players) return;
    if (!list.length) {
      els.players.innerHTML = '<div class="empty-state">No players set. Use the Players button above to add names and keep score.</div>';
      if (els.turn) els.turn.textContent = 'Casual play';
      return;
    }
    turnIndex = ((turnIndex % list.length) + list.length) % list.length;
    els.players.innerHTML = list.map((p,i) => `<div class="player-chip ${i===turnIndex?'active':''}"><span class="player-name">${escapeHtml(p.name)}</span><span class="score">${Number(p.score)||0}</span></div>`).join('');
    if (els.turn) els.turn.textContent = list[turnIndex].name;
  }
  function escapeHtml(value){ const d=document.createElement('div'); d.textContent=value; return d.innerHTML; }
  function rotateTurn(delta=1) {
    const list = players();
    if (!list.length) return;
    turnIndex = (turnIndex + delta + list.length) % list.length;
    saveTurn();
    renderPlayers();
  }
  function addPoint() {
    const list = players();
    if (!list.length) { toast('Add players to keep score'); return; }
    list[turnIndex].score = (Number(list[turnIndex].score)||0) + 1;
    storage.setPlayers(list);
    toast(`+1 ${list[turnIndex].name}`);
    nextCard(true);
  }

  function render() {
    stopAudio();
    deck.forEach((card,i) => {
      const active = i === index;
      card.hidden = !active;
      card.classList.remove('is-flipped');
      card.tabIndex = active ? 0 : -1;
    });
    visited.add(index);
    if (els.counter) els.counter.textContent = `${index + 1} / ${deck.length}`;
    if (els.fill) els.fill.style.width = `${((index + 1) / deck.length) * 100}%`;
    if (els.prev) els.prev.disabled = deck.length < 2;
    if (els.next) els.next.disabled = deck.length < 2;
    if (els.deckStat) els.deckStat.textContent = `${deck.length} cards`;
    if (els.modeStat) els.modeStat.textContent = mode === 'challenge' ? 'Challenges' : 'Trivia mix';
    if (els.music) els.music.hidden = !hasMusic(current());
    const fallback = current().querySelector('.music-fallback');
    if (!fallback && hasMusic(current())) {
      const btn = document.createElement('button'); btn.type='button'; btn.className='music-fallback'; btn.textContent='♫ Open full track'; btn.addEventListener('click', e => { e.stopPropagation(); openMusic(); }); current().appendChild(btn);
    }
    current().focus({preventScroll:true});
  }

  function toggleReveal() {
    const card = current();
    card.classList.toggle('is-flipped');
    if (els.reveal) els.reveal.textContent = card.classList.contains('is-flipped') ? 'Hide answer' : 'Reveal';
  }
  function nextCard(rotate=true) {
    if (deck.length < 2) return;
    index = (index + 1) % deck.length;
    if (rotate) rotateTurn(1);
    render();
  }
  function prevCard() {
    if (deck.length < 2) return;
    index = (index - 1 + deck.length) % deck.length;
    rotateTurn(-1);
    render();
  }
  function shuffleDeck() {
    for (let i=deck.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [deck[i],deck[j]]=[deck[j],deck[i]]; }
    deck.forEach(card => container.appendChild(card));
    index=0; visited=new Set([0]); render(); toast('Deck shuffled');
  }

  normalizeCards(); renderPlayers(); render();
  window.addEventListener('partyplay:players-changed', renderPlayers);
  els.prev?.addEventListener('click', prevCard);
  els.next?.addEventListener('click', () => nextCard(true));
  els.reveal?.addEventListener('click', toggleReveal);
  els.score?.addEventListener('click', addPoint);
  els.shuffle?.addEventListener('click', shuffleDeck);
  els.music?.addEventListener('click', openMusic);
  document.getElementById('resetScoresBtn')?.addEventListener('click', () => { const list=players().map(p=>({...p,score:0})); storage.setPlayers(list); renderPlayers(); toast('Scores reset'); });
  document.addEventListener('keydown', e => {
    if (['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); nextCard(true); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prevCard(); }
    else if (e.code === 'Space' || e.key === 'Enter') { e.preventDefault(); toggleReveal(); }
    else if (e.key.toLowerCase() === 's') shuffleDeck();
  });
  let touchX=null;
  container.addEventListener('touchstart', e => { touchX=e.changedTouches[0]?.clientX ?? null; }, {passive:true});
  container.addEventListener('touchend', e => { if (touchX===null) return; const dx=(e.changedTouches[0]?.clientX||0)-touchX; touchX=null; if(Math.abs(dx)>75) dx<0?nextCard(true):prevCard(); }, {passive:true});
})();
