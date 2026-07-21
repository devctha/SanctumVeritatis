# Auditoria de segurança

## Modelo real

O site é público e estático. Não há servidor, banco, cookies, uploads, SQL, SSRF, rate limiting ou API. XSS por dados remotos não é um vetor atual porque o conteúdo é local e controlado, mas os renderizadores dinâmicos devem continuar escapando texto.

## Riscos críticos

1. Autenticação e papéis rodam no cliente e podem ser contornados.
2. Qualquer arquivo publicado, inclusive mestre e soluções, pode ser baixado diretamente.
3. `robots.txt` e `noindex` orientam indexadores; não concedem confidencialidade.
4. GitHub Pages não permite configurar todos os headers de segurança nem redirects HTTP 301/308 por arquivo.

## Verificações

- `.env` real não está rastreado; `.env.example` não contém segredo.
- npm reportou zero vulnerabilidades.
- nenhum token, chave privada ou URL de banco foi confirmado na auditoria anterior.
- Canto da Mariposa envia somente marcadores classificados, sem payload secreto.

## Correções

- páginas administrativas permanecem fora do sitemap e bloqueadas para indexação;
- `robots.txt` explicita áreas não públicas;
- testes verificam que conteúdo classificado não é enviado na operação pública;
- mensagens de erro não exibem stack traces;
- build reproduzível reduz divergência de artefatos.

## Necessidade de backend

Para segurança real, migrar identidade, autorização, documentos classificados e notas do mestre para um backend que filtre cada resposta. CSP, HSTS, `X-Content-Type-Options`, Referrer Policy e Permissions Policy devem ser aplicados por Cloudflare/servidor; uma meta tag não substitui headers completos.
