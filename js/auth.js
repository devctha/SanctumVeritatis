// Compatibilidade de sessão para páginas legadas.
window.SVLegacyAuth = { mode: 'operational-local', isAuthenticated() { return Boolean(window.SVAuth && window.SVAuth.session()); } };
