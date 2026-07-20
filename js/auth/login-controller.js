(function () {
  const form = document.querySelector('#login-form'); const status = document.querySelector('#auth-status'); const button = form.querySelector('button[type="submit"]');
  form.addEventListener('submit', async event => { event.preventDefault(); button.disabled = true; form.dataset.state = 'checking'; status.textContent = 'CARREGANDO PERFIL DE DEMONSTRAÇÃO'; const result = await SVAuthService.login(form.agent.value); if (!result.ok) { form.dataset.state = 'error'; status.textContent = 'PERFIL NÃO ENCONTRADO'; button.disabled = false; return; } form.dataset.state = 'authorized'; status.textContent = 'SESSÃO DEMONSTRATIVA ATIVA'; setTimeout(() => { location.href = SVSession.handoff(result.user.route, result.session); }, 250); });
})();
