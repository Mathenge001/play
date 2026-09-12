(() => {
  const modal = document.getElementById('playersModal');
  const names = document.getElementById('playerNames');
  const readPlayers = () => { try { return JSON.parse(localStorage.getItem('partyplay.players') || '[]'); } catch { return []; } };
  const open = () => {
    if (!modal) return;
    names.value = readPlayers().map(p => typeof p === 'string' ? p : p.name).join(', ');
    modal.classList.add('open');
    setTimeout(() => names?.focus(), 30);
  };
  const close = () => modal?.classList.remove('open');
  document.getElementById('openPlayers')?.addEventListener('click', open);
  document.querySelectorAll('[data-close-players]').forEach(b => b.addEventListener('click', close));
  modal?.addEventListener('click', e => { if (e.target === modal) close(); });
  document.getElementById('savePlayers')?.addEventListener('click', () => {
    const old = readPlayers();
    const score = Object.fromEntries(old.map(p => [typeof p === 'string' ? p : p.name, p.score || 0]));
    const next = (names.value || '').split(',').map(v => v.trim()).filter(Boolean).slice(0, 12).map(name => ({ name, score: score[name] || 0 }));
    localStorage.setItem('partyplay.players', JSON.stringify(next));
    close();
    window.dispatchEvent(new CustomEvent('partyplay:players-changed'));
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  document.getElementById('cycleProvider')?.addEventListener('click', () => {
    const providers=['spotify','ytmusic','youtube'];
    const labels={spotify:'Spotify',ytmusic:'YouTube Music',youtube:'YouTube'};
    const current=localStorage.getItem('partyplay.musicProvider')||'spotify';
    const next=providers[(providers.indexOf(current)+1)%providers.length];
    localStorage.setItem('partyplay.musicProvider',next);
    const label=document.getElementById('providerName'); if(label) label.textContent=labels[next];
  });
  const p=localStorage.getItem('partyplay.musicProvider')||'spotify';
  const labels={spotify:'Spotify',ytmusic:'YouTube Music',youtube:'YouTube'};
  const providerName=document.getElementById('providerName'); if(providerName) providerName.textContent=labels[p];
})();
