# Resultados do baseline

Ambiente: Windows, PowerShell, Node.js compatível com `>=20`, npm e Git.

| Comando | Resultado | Tempo |
| --- | --- | ---: |
| `npm ci --ignore-scripts` | aprovado; 1 pacote auditado | 2,88 s |
| `npm run lint` | aprovado | 0,82 s |
| `npm run typecheck` | aprovado | 0,96 s |
| `npm test` | aprovado | 1,35 s |
| `npm run build` | aprovado | 1,08 s |
| `npm audit --audit-level=high` | 0 vulnerabilidades | incluído na auditoria |
| `npm outdated` | nenhuma dependência | incluído na auditoria |

## Avisos existentes

- o build alterava o timestamp do Arquivo Central em toda execução;
- não havia páginas 400/offline, robots ou sitemap;
- a CI executava `validate`, mas não uma etapa explícita de auditoria npm;
- não existe teste E2E automatizado em navegador na CI;
- não foram observados erros de instalação, lint, tipagem, teste ou build.

As rotas Canto da Mariposa e Setentrional já estavam publicadas e funcionais. O baseline não atribuiu dívida legada às novas mudanças.
