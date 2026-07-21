# Visão geral do projeto

Auditoria executada em 20 de julho de 2026 sobre `devctha/SanctumVeritatis`.

## Classificação

**FUNCIONAL COM PROBLEMAS.** As rotas principais, geração de dados, testes e GitHub Pages funcionam; porém, a aplicação é estática, possui grande acervo legado heterogêneo e não oferece uma fronteira real de segurança para conteúdo privado.

## Stack

- Frontend: HTML5, CSS e JavaScript sem framework.
- Runtime de desenvolvimento: Node.js 20+; CI em Node.js 24.
- Gerenciador: npm, sem dependências externas.
- Build: scripts Node que geram aliases, regras e índices narrativos.
- Rotas: arquivos/diretórios estáticos com URLs limpas e aliases `.html`.
- Persistência: `localStorage` e `sessionStorage` no navegador.
- Backend, API e banco de dados: inexistentes.
- Autenticação: seleção de perfil e sessão local diegética.
- Permissões: guardas client-side; não protegem dados publicados.
- Hospedagem: GitHub Pages, branch `main`, domínio `sanctumveritatis.com`.

## Estrutura relevante

- `css/`: tokens, componentes, módulos e páginas.
- `js/`: interface, autenticação, agentes, mestre e sistemas narrativos.
- `data/`: conteúdo estruturado e índices gerados.
- `operacoes/`, `agentes/`, `mestre/`, `sistema/`: áreas funcionais.
- `tools/`: geradores, servidor e testes Node.
- `docs/`: arquitetura, conteúdo, segurança e auditorias.

## Estado verificado

| Verificação | Resultado inicial |
| --- | --- |
| `npm ci --ignore-scripts` | aprovado, 2,88 s |
| `npm run lint` | aprovado, 0,82 s |
| `npm run typecheck` | aprovado, 0,96 s |
| `npm test` | aprovado, 1,35 s |
| `npm run build` | aprovado, 1,08 s |
| `npm audit --audit-level=high` | zero vulnerabilidades |

Não há TypeScript, bundle, framework, migrations, cookies, serviços externos ou variáveis obrigatórias. Migrar de tecnologia sem uma necessidade funcional seria risco sem benefício comprovado.
