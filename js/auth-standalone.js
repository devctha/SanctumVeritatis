(function () {
  const SESSION_KEY = 'sv-session-v3';
  const labels = ['Acesso externo', 'Colaborador', 'Agente', 'Supervisão', 'Comando', 'Conselho'];
  function session() { try { const value = JSON.parse(localStorage.getItem(SESSION_KEY)); if (!value || Date.now() > value.expires) { localStorage.removeItem(SESSION_KEY); return null; } return value; } catch { return null; } }
  function authenticate(id, _unused, remember) { const userId = String(id || '').trim(); if (!userId) return Promise.resolve({ ok: false }); const value = { userId, codename: userId, accessLevel: 2, demo: true, issued: Date.now(), expires: Date.now() + (remember ? 7 * 864e5 : 8 * 36e5) }; localStorage.setItem(SESSION_KEY, JSON.stringify(value)); return Promise.resolve({ ok: true, session: value }); }
  function requireAccess(level, loginPath) { const current = session(); if (!current || current.accessLevel < (level || 1)) { location.replace(`${loginPath || '../login.html'}?next=${encodeURIComponent(location.href)}`); return null; } return current; }
  function applySession(current) { current = current || session(); if (!current) return; document.querySelectorAll('[data-session-user]').forEach(element => { element.textContent = current.codename; }); document.querySelectorAll('[data-session-level]').forEach(element => { element.textContent = `Nível ${current.accessLevel} · ${labels[current.accessLevel]} · DEMO`; }); }
  function signOut(path) { localStorage.removeItem(SESSION_KEY); location.href = path || '../index.html'; }
  window.SVAuth = { authenticate, session, requireAccess, applySession, signOut, mode: 'public-demo' };
})();
