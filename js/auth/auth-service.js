(function () {
  function login(username) {
    const normalized = String(username || '').trim().toLowerCase();
    const user = SV_USERS.users.find(candidate => candidate.username.toLowerCase() === normalized && candidate.active);
    if (!user) { SVSession.recordAttempt(normalized); return Promise.resolve({ ok: false }); }
    return Promise.resolve({ ok: true, user, session: SVSession.create(user) });
  }
  function user(id) { return SV_USERS.users.find(candidate => candidate.id === id); }
  window.SVAuthService = { login, user, mode: 'operational-local' };
})();
