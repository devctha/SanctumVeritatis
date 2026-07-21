# Plano de modernização executável

## Executado nesta branch

1. Registrar baseline e inventários técnicos.
2. Tornar o build principal reproduzível.
3. Padronizar `dev`, `check`, segurança e fluxos críticos.
4. Adicionar testes de qualidade para rotas críticas.
5. Criar estados 400 e offline.
6. Adicionar robots e sitemap mínimos.
7. Ampliar o Index com registros públicos reais.
8. Revalidar Canto da Mariposa e compatibilidade Setentrional.
9. Tornar a CI explícita para lint, tipagem, testes, build e npm audit.
10. Consolidar arquitetura, funcionalidades, rotas e limitações.

## Próxima etapa — exige decisão de produto

1. Separar conteúdo do mestre em armazenamento privado.
2. Escolher backend/identidade com base em usuários, orçamento e hospedagem.
3. Modelar operações, agentes, documentos e evidências no servidor.
4. Migrar um módulo piloto sem quebrar URLs públicas.
5. Configurar headers e redirects permanentes em CDN/servidor.

## Etapa progressiva

- otimizar mídia após auditoria de licença;
- modernizar uma família de páginas legadas por vez;
- adicionar E2E/browser e acessibilidade automatizada quando uma dependência de testes for aprovada;
- medir Lighthouse antes/depois em ambiente de preview.

Não se recomenda React, TypeScript, Docker ou banco apenas como “modernização”. Essas escolhas devem responder a requisitos concretos de backend, autoria colaborativa ou deployment.
