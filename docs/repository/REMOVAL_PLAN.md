# Plano e registro de remoção

## Executado

1. Remover 120 placeholders vazios e sem referências: `sala-0021` a `sala-0050`, nas variantes raiz, limpa, `SALA Results/*.html` e `SALA Results/*/index.html`.
2. Remover `SAS Results/images/op-logo.png`, cópia exata não referenciada.
3. Retirar `audit-data.json` do Git e ignorá-lo. Recriação: `powershell -File tools/audit-project.ps1`.
4. Remover duas referências ao inexistente `Scripts/AC_RunActiveContent.js`.
5. Corrigir quatro links Sintech que apontavam para fases inexistentes.

## Não executado

- Não apagar `.checkpoints/`: backups locais ignorados.
- Não remover pares de URL limpa: necessários ao GitHub Pages.
- Não mover assets em massa: exige migração por operação e teste visual.
- Não reescrever histórico: consultar `GIT_HISTORY_CLEANUP_PLAN.md`.
