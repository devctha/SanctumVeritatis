# Inventário de rotas

O projeto possui 537 documentos HTML entre páginas canônicas, diretórios limpos e aliases. O inventário histórico detalhado permanece em `audit-data.json` e `docs/MAPA_DE_ROTAS.md`.

## Rotas críticas verificadas

| URL | Arquivo | Acesso | Estado | Compatibilidade/teste |
| --- | --- | --- | --- | --- |
| `/` | `index.html` | público | funcional | navegação e metadados testados |
| `/login` | `login/index.html` | público | funcional | perfis e expiração testados |
| `/sistema/dashboard` | `sistema/dashboard/index.html` | sessão local | funcional | guarda client-side |
| `/agentes` | `agentes/index.html` | sessão local | funcional | perfis isolados testados |
| `/mestre` | `mestre/index.html` | mestre local | funcional com risco | conteúdo está no repositório público |
| `/arquivos` | `arquivos/index.html` | consulta | funcional | busca e índice testados |
| `/operacoes/canto-da-mariposa` | página própria | público parcial | funcional | teste dedicado e responsivo |
| `/operacoes/setentrional` | página legada | legado | redirecionada | query e fragmento preservados |
| `/operacoes/setentrional/mapa` | mapa legado | sessão local | funcional | interação preservada |
| `/sintech2`–`/sintech8` | páginas legadas | narrativo | parcial | cinco fases implementadas, demais planejadas |
| `/redlotus` | página legada | narrativo | funcional | dados e isolamento testados |
| `/400`, `/401`, `/403`, `/404`, `/500`, `/offline` | páginas de estado | público | funcional | existência e metadados testados |

## Ausências localizadas

Não foram encontradas rotas identificáveis para **C.R.I.S.**, **Der Geteilte**, **Base K-9** ou **Downtown Curse**. O Index não cria links fictícios para elas. Arquivos NCM aparecem em páginas legadas, sem módulo moderno consolidado.

## Classificação geral

- Canônicas modernas: funcionais.
- Aliases `.html`: legados e necessários pela negociação de extensão do Pages.
- S.A.L.A. 0021–0050: reservas vazias/legadas.
- Páginas monolíticas antigas: funcionais ou parciais, com metadados e acessibilidade inconsistentes.
- Conteúdo administrativo: não indexável, mas não confidencial por estar no frontend público.
