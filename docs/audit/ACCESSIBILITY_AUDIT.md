# Auditoria de acessibilidade

Objetivo: WCAG 2.2 AA quando aplicável.

## Base existente

- skip links nas páginas modernas;
- foco visível global;
- HTML semântico, títulos e labels no Index, login e Canto da Mariposa;
- transcrição quando áudio não está disponível;
- estados descritos por texto e não somente cor;
- `prefers-reduced-motion` nos módulos modernos;
- tabelas com região rolável no mobile.

## Correções desta etapa

- navegação pública ampliada com links reais;
- cards do Index usam âncoras, áreas de toque e nomes acessíveis;
- páginas 400/offline têm títulos, mensagens e ações claras;
- testes críticos exigem `lang`, viewport e títulos.

## Dívida

- centenas de páginas legadas ainda precisam de auditoria manual de contraste, headings, alt, labels e teclado;
- modais/terminais antigos não possuem testes automatizados de foco;
- não houve auditoria com leitor de tela em todas as rotas;
- Lighthouse/axe não estão instalados e nenhuma pontuação foi inventada.
