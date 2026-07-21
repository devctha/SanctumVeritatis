# Inventário de componentes

O projeto não usa framework; “componentes” são classes CSS, padrões HTML e controladores JavaScript.

## Compartilhados

- Marca, cabeçalhos públicos/sistema, navegação lateral e breadcrumbs.
- `.btn`, badges, painéis, cards, métricas, grids e tabelas.
- Alertas, indicadores de integridade e blocos classificados.
- Tokens em `css/tokens.css`; base e foco em `css/base.css`.
- Sessão, autenticação e acesso em `js/auth/`.
- Busca e visualização em `js/archive-search.js` e módulos relacionados.

## Domínio

- Operações: heróis, metadados, timelines, mapas, evidências e arquivos.
- Agentes: fichas, inventário, habilidades, rituais e dossiês.
- Mestre: terminal, árvore, notas, favoritos e controle narrativo.
- Sintech/RedLotus: fases, símbolos, eventos e progresso isolado.

## Problemas

- Muitas páginas legadas incluem CSS e JavaScript inline.
- Cards e terminais antigos usam nomenclaturas e breakpoints diferentes.
- Não existe sistema seguro de modal/document viewer compartilhado.
- A componentização moderna deve continuar módulo a módulo; uma conversão global quebraria enigmas e rotas.
