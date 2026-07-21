# Inventário de arquivos

| Classe | Quantidade inicial | Localização principal | Destino | Risco | Ação |
|---|---:|---|---|---|---|
| Código-fonte ativo | 95 | `js/`, `css/`, `system_core.js` | Manter | Alto | Preservado |
| Configuração | 8 | raiz, `.github/` | Manter | Alto | `.gitignore` ampliado |
| Conteúdo narrativo e páginas | 537 HTML | raiz e diretórios de rota | Manter | Alto | 120 placeholders vazios removidos |
| Assets em uso | 18 | `images/`, raiz | Manter | Alto | Preservados |
| Asset não referenciado | 1 | `SAS Results/images/op-logo.png` | Remover | Baixo | Removido; cópia canônica mantida |
| Documentação | 52 Markdown | `docs/` e raiz | Manter | Médio | Documentação adicionada |
| Testes e ferramentas | 19 iniciais | `tools/` | Manter | Médio | Verificadores adicionados |
| Arquivos gerados necessários | 4 principais | `data/site-index.*`, `data/archives/*` | Manter | Alto | Preservados e documentados |
| Intermediário gerado | 1 | `audit-data.json` | Ignorar/regenerar | Baixo | Retirado do Git |
| Cache/dependência/build/log/banco | 0 rastreados | — | Ignorar | Baixo | Regras preventivas adicionadas |
| Backup local | 5 ZIPs | `.checkpoints/` | Fora do Git | Médio | Preservados localmente e ignorados |
| Versões legadas | múltiplas | Setentrional, Sintech, RedLotus | Manter | Alto | Compatibilidade preservada |
| Duplicado intencional | 8 grupos | `agentes/*` | Manter | Alto | Documentado |
| Temporário | 0 rastreados | — | Ignorar | Baixo | Regras preventivas adicionadas |
| Dado sensível | 0 | — | Não versionar | Crítico | Nenhuma rotação necessária |
| Origem desconhecida | captura legada RedLotus | `redlotus*.html` | Revisão futura | Médio | Script Flash ausente removido |

As classes se sobrepõem quando um HTML é simultaneamente rota, conteúdo e alias; não devem ser somadas como total físico.
