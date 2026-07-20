# Implantação

## Site público estático

Execute `npm.cmd run validate` e publique a raiz em GitHub Pages, Netlify, Cloudflare Pages ou servidor equivalente. O `CNAME` existente deve ser mantido somente se o domínio estiver sob controle do proprietário. Configure HTTPS, `X-Content-Type-Options: nosniff`, política de referência e CSP compatível após inventariar scripts embutidos.

GitHub Pages é aceitável apenas para conteúdo público/narrativo. Não o use para dados realmente confidenciais ou administração real. Nesse caso, implante um backend e mantenha segredos em variáveis de ambiente da plataforma.
