# Relatório de branches

Auditoria em 20 de julho de 2026.

| Branch | Local/remota | Classificação | Observação |
| --- | --- | --- | --- |
| `main` | ambas | ativa/estável | Branch padrão e fonte do GitHub Pages. |
| `feature/repository-organization` | trabalho atual | ativa | Organização profissional do repositório. |
| `feature/sanctum-veritatis-full-rebuild` | ambas | integrada historicamente/obsoleta | Possui dois commits próprios, mas a reconstrução entrou em `main` por squash; diverge cinco commits e não deve receber force push. |
| `local/rebuild-snapshot` | local | arquivo local | Snapshot anterior; não existe remotamente. |
| `origin/agent/*` | referências remotas locais obsoletas | integrada | As branches já não aparecem na API remota; podem ser removidas localmente com `git remote prune origin` após conferência. |

Não foram apagadas branches. A branch solicitada originalmente, `feature/sanctum-veritatis-full-rebuild`, foi preservada porque reutilizá-la exigiria rebase/force push ou produziria um merge confuso. Para um projeto mantido por uma pessoa, `main` + branches curtas `feature/*`, `fix/*` e `docs/*` é suficiente; uma branch `develop` permanente adicionaria complexidade sem benefício atual.
