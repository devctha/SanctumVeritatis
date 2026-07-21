# Auditoria de desempenho

## Baseline técnico

- sem framework, bundle ou dependências de produção;
- build local: 1,08 s;
- testes: 1,35 s;
- JavaScript modular nas páginas modernas;
- GitHub Pages/CDN entrega arquivos estáticos.

## Gargalos

- `The-Known-World.jpg` (~10,3 MB);
- GIFs entre ~8 e 9,8 MB;
- `images/1.mp3` (~8,1 MB);
- vídeo Setentrional (~6,5 MB);
- PNG do Farol (~6,5 MB);
- páginas HTML monolíticas e duplicadas por compatibilidade;
- imagens legadas frequentemente sem `width`, `height`, `loading` ou `srcset`.

## Decisões

Não foram recomprimidos assets sem validação visual e de direitos. A otimização correta é gerar WebP/AVIF e versões responsivas mantendo originais até atualizar todas as referências. Git LFS não é necessário antes dessa medição.

Não foi executado Lighthouse nesta etapa; portanto, não há pontuações declaradas. As metas 90/95/95/90 permanecem objetivos, não resultados.
