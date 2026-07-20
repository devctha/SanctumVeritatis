# Permissões

Papéis atuais incluem agente e mestre, com guardas de proprietário e substituição controlada para o mestre. Sessões expiram e perfis são isolados nos testes Node.

Essas regras são executadas no cliente e servem apenas à experiência narrativa. O objetivo de produção é aplicar permissões granulares no servidor e nunca enviar campos privados a usuários não autorizados. A função mestre deve incluir visualização como jogador quando o backend for implementado.
