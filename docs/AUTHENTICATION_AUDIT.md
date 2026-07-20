# Auditoria de autenticação

Auditado em 20/07/2026. O projeto não possui servidor, banco de dados, provedor externo, cookies seguros ou validação remota. Usuários públicos são metadados estáticos; a sessão é criada no navegador e mantida em `sessionStorage`, com preferências em `localStorage`. Nenhuma senha ou hash de senha permanece no repositório.

O fluxo final usa uma identificação operacional local para selecionar perfis previamente publicados, incluindo o perfil `master` habilitado a pedido do proprietário. O recurso é uma barreira de navegação diegética, não uma fronteira de segurança, e essa limitação permanece apenas na documentação técnica.

Autenticação real requer backend que não seja GitHub Pages: identidade verificada, sessões em cookies `HttpOnly`, `Secure` e `SameSite`, limitação de tentativas, autorização por resposta e conteúdo privilegiado que nunca seja enviado ao cliente sem permissão. Migração futura é obrigatória antes de armazenar dados privados.
