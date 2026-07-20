# Central privada

Arquivo: `sv_master_terminal.html`.

## Escopo

O terminal consome `data/site-index.js`, gerado a partir da auditoria completa. As 229 páginas estão presentes, com título, caminho, categoria, núcleo, acesso, estado, entradas, saídas, quebras, marcadores e texto pesquisável.

## Recursos

- Busca por título, caminho, conteúdo, operação, código e tags.
- Filtros por acesso, estado e tipo.
- Favoritos, histórico e notas em `localStorage`.
- Lista paginada, árvore hierárquica e mapa Canvas com pan e zoom.
- Painel de detalhes e abertura direta do arquivo.
- Tela de acesso local e sessão separada da progressão narrativa.

## Segurança

A página usa `noindex, nofollow, noarchive`, não recebe link público e declara que a proteção é somente local. Qualquer pessoa com acesso aos arquivos estáticos pode inspecioná-la; proteção real exigiria backend.

## Regeneração

Execute `tools/build-site-index.ps1` após criar ou mover páginas. O script gera as versões JSON e JavaScript para funcionar tanto em servidor estático quanto por abertura direta do arquivo.
