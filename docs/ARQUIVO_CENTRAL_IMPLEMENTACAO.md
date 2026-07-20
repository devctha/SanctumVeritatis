# Arquivo Central — implementação inicial

## Conteúdo

- 50 documentos narrativos centrais, escritos individualmente.
- 300 registros secundários materializados.
- 328.067 registros procedurais definidos por seed e intervalo.
- Total institucional apresentado: 328.417 registros.

## Arquitetura

- `data/archives/archive-index.json`: índice real e configuração procedural.
- `data/archives/archive-data.js`: versão compatível com abertura por `file://`.
- `archive-generator.js`: geração determinística sob demanda.
- `archive-search.js`: operadores, filtros e ranking básico.
- `archive-viewer.js`: favoritos, notas, investigação e exportação.
- `archive-app.js`: interface, paginação, cronologia e relações.

Somente a página solicitada é materializada. Registros procedurais não criam arquivos HTML individuais nem ocupam o DOM até serem solicitados.

## Operadores de busca

- Texto livre e expressão exata entre aspas.
- `author:`, `date:`, `classification:`, `type:`, `location:`, `sector:` e `status:`.
- `integrity:<50` e `integrity:>80`.
