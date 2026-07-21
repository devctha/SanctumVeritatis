# Sanctum Veritatis

Plataforma web estática e imersiva para arquivos narrativos, operações, agentes e ferramentas de campanha paranormal.

[Site público](https://sanctumveritatis.com) · Estado: **funcional com limitações de segurança documentadas**

## Stack

HTML5, CSS, JavaScript sem framework e Node.js para geradores/testes. Não há backend, banco de dados, bundle ou dependências de produção.

## Requisitos e instalação

- Node.js 20 ou superior;
- npm;
- Git para colaboração.

```powershell
git clone https://github.com/devctha/SanctumVeritatis.git
Set-Location SanctumVeritatis
npm.cmd ci --ignore-scripts
npm.cmd run check
```

Nenhuma variável de ambiente é obrigatória. Consulte `.env.example` antes de introduzir integrações futuras.

## Desenvolvimento

```powershell
npm.cmd run dev
```

Abra `http://localhost:4173`. Não use `file://`, pois o navegador pode bloquear recursos locais.

## Qualidade

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd test
npm.cmd run test:e2e
npm.cmd run build
npm.cmd run security
npm.cmd run check
```

`test:e2e` valida contratos dos fluxos críticos sem navegador. A inspeção real em navegador continua necessária para QA visual e multi-browser.

## Estrutura

- `css/`: tokens, componentes e temas;
- `js/`: interface, autenticação e domínios;
- `data/`: conteúdo estruturado e índices;
- `operacoes/`, `agentes/`, `mestre/`, `sistema/`: áreas funcionais;
- `tools/`: geradores, servidor e testes;
- `docs/`: arquitetura, implantação e auditorias;
- páginas/diretórios na raiz: acervo legado e aliases preservados para GitHub Pages.

## Rotas principais

- `/` — portal público;
- `/arquivos` — Arquivo Central;
- `/operacoes/canto-da-mariposa` — operação pública;
- `/login` — identificação operacional;
- `/400`, `/401`, `/403`, `/404`, `/500`, `/offline` — estados de erro.

## Implantação

A raiz da `main` é publicada pelo GitHub Pages no domínio `sanctumveritatis.com`. Toda mudança deve passar pela CI. Veja [DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Segurança

Login e papéis são recursos narrativos no cliente. Eles não tornam arquivos públicos confidenciais. Não publique tokens, dados pessoais, soluções secretas ou notas privadas do mestre. Veja [SECURITY.md](SECURITY.md) e a [auditoria](docs/audit/SECURITY_AUDIT.md).

## Documentação

- [Arquitetura](docs/ARCHITECTURE.md)
- [Rotas](docs/ROUTES.md)
- [Funcionalidades](docs/FEATURES.md)
- [Testes](docs/TESTING.md)
- [Decisões de dependências](docs/DEPENDENCY_DECISIONS.md)
- [Baseline e plano](docs/audit/REBUILD_PLAN.md)

## Licença

Código e conteúdo permanecem sob direitos reservados conforme [LICENSE](LICENSE). Consulte [CONTRIBUTING.md](CONTRIBUTING.md) antes de colaborar.
