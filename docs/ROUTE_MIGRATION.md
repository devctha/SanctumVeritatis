# Migração para URLs limpas

## Hospedagem

O site é publicado por GitHub Pages a partir de `main` e do diretório raiz. A plataforma não oferece configuração de rewrite nem respostas 301/308 por arquivo. Cada rota canônica usa um diretório físico com `index.html`, permitindo acesso direto, recarga, favoritos e histórico.

## Estratégia

- `index.html` permanece canônico em `/`.
- Cada `nome.html` ganha conteúdo canônico em `/nome/index.html`, servido como `/nome` ou `/nome/`.
- Páginas já chamadas `index.html` permanecem na rota do diretório.
- Links internos apontam para caminhos sem `.html`.
- Arquivos antigos tornam-se aliases com canonical e redirecionamento no navegador, preservando consulta e fragmento.

Exemplos: `/login.html` → `/login`; `/arquivos.html` → `/arquivos`; `/setentrional.html` → `/setentrional`; `/sistema/dashboard.html` → `/sistema/dashboard`.

## Limitação do legado

GitHub Pages responde o alias `.html` com HTTP 200 antes do redirecionamento em HTML/JavaScript; não é possível produzir 301/308 nessa hospedagem. Redirecionamento HTTP permanente exige Cloudflare Pages/Workers, Netlify, Vercel ou servidor com regras de redirect.
