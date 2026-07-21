# Estrutura final

```text
/
├── .github/              CI e metadados do GitHub
├── agentes/              perfis e aliases
├── css/                  estilos compartilhados e temáticos
├── data/                 dados estáticos necessários em produção
├── docs/repository/      auditoria e decisões desta limpeza
├── images/               assets publicados nos caminhos atuais
├── js/                   serviços e controladores do cliente
├── operacoes/            rotas, incluindo Canto da Mariposa
├── sistema/              interfaces internas estáticas
├── tools/                build, migração, testes e verificadores
├── *.html + */index.html compatibilidade entre URLs legadas e limpas
├── package.json
└── package-lock.json
```

A estrutura mantém a arquitetura estática real. Forçar `src/` e `public/` mudaria centenas de URLs e o modelo de publicação do GitHub Pages.
