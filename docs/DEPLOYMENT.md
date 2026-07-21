# Implantação

## Produção atual

- Plataforma: GitHub Pages.
- Fonte: raiz da branch `main`.
- Domínio: `sanctumveritatis.com`, configurado por `CNAME`.
- HTTPS: gerenciado pelo GitHub Pages.
- Backend/migrations: não aplicável.
- Variáveis obrigatórias: nenhuma.

## Validação

```powershell
npm.cmd ci --ignore-scripts
npm.cmd run check
npm.cmd run security
```

O merge em `main` aciona o build/deploy do Pages. Verifique Actions e as rotas `/`, `/login`, `/arquivos` e `/operacoes/canto-da-mariposa`.

## Rollback

Use o GitHub para reverter o pull request problemático com um novo commit; não force push em `main`. Aguarde o novo deploy e confirme o commit exibido pela Action.

## Cache e redirects

Assets alterados devem usar versionamento de URL quando cache antigo causar incompatibilidade. GitHub Pages não oferece regras HTTP 301/308 ou headers customizados completos; aliases usam JavaScript/canonical. Para CSP, HSTS adicional, Referrer Policy e redirects permanentes, coloque Cloudflare ou servidor configurável diante do Pages.

## Logs e backup

Logs disponíveis: GitHub Actions e build/deploy do Pages. Não há logs de aplicação centralizados. O repositório Git é o backup do conteúdo publicado; estado em `localStorage` não possui backup remoto.

GitHub Pages é adequado somente para conteúdo público. Autenticação real, dados privados e administração exigem backend e armazenamento separado.
