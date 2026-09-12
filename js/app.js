(() => {
  const $ = (s) => document.querySelector(s);
  const open = (id) => document.getElementById(id)?.classList.add('open');
  const close = (id) => document.getElementById(id)?.classList.remove('open');
  const sessionBtn = $('#sessionBtn');
  const musicBtn = $('#musicSettingsBtn');
  const names = $('#playerNames');
  const provider = $('#musicProvider');

  const readPlayers = () => {
    try { return JSON.parse(localStorage.getItem('partyplay.players') || '[]'); } catch { return []; }
  };
  const players = readPlayers();
  if (names) names.value = players.map(p => typeof p === 'string' ? p : p.name).join(', ');
  if (provider) provider.value = localStorage.getItem('partyplay.musicProvider') || 'spotify';

  sessionBtn?.addEventListener('click', () => open('sessionModal'));
  musicBtn?.addEventListener('click', () => open('musicModal'));
  document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => close(b.dataset.close)));
  document.querySelectorAll('.modal').forEach(m => m.addEventListener('click', e => { if (e.target === m) close(m.id); }));

  $('#savePlayersBtn')?.addEventListener('click', () => {
    const existing = readPlayers();
    const scoreByName = Object.fromEntries(existing.map(p => [typeof p === 'string' ? p : p.name, p.score || 0]));
    const next = (names.value || '').split(',').map(v => v.trim()).filter(Boolean).slice(0, 12).map(name => ({ name, score: scoreByName[name] || 0 }));
    localStorage.setItem('partyplay.players', JSON.stringify(next));
    close('sessionModal');
  });
  $('#saveMusicBtn')?.addEventListener('click', () => {
    localStorage.setItem('partyplay.musicProvider', provider.value);
    close('musicModal');
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelectorAll('.modal.open').forEach(m => close(m.id)); });
})();
