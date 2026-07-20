// Compatibilidade para páginas legadas: usa somente sessão demonstrativa local.
window.SVLegacyAuth = { mode: 'public-demo', isAuthenticated() { return Boolean(window.SVAuth && window.SVAuth.session()); } };
