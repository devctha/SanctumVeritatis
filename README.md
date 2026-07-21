# Sanctum Veritatis

Plataforma estática imersiva para consulta narrativa, gestão de agentes e operações de RPG paranormal. A reconstrução preserva as URLs e o conteúdo legado enquanto introduz design system, navegação institucional, autenticação local documentada, painéis de agente/mestre e módulos para Arquivo Central, Setentrional, Sintech e RedLotus.

## Requisitos e uso

- Node.js 20+ para geração e testes.
- Um servidor HTTP estático para uso local; abrir por `file://` pode bloquear carregamentos JSON.

```powershell
npm.cmd install
npm.cmd run validate
npx.cmd serve .
```

Acesse a URL indicada pelo servidor. Não há dependências npm em produção nem banco de dados. Consulte [arquitetura](docs/ARCHITECTURE.md), [testes](docs/TESTING.md), [implantação](docs/DEPLOYMENT.md) e [limitações de autenticação](docs/AUTH_LIMITATIONS.md).

## Estrutura

- `css/`: tokens, base, componentes, layouts e temas.
- `js/`: interface, autenticação local e módulos de domínio.
- `data/`: índices e conteúdo estruturado.
- `agentes/`, `mestre/`, `sistema/`: áreas da aplicação.
- `operacoes/`, `restrito/`: módulos narrativos.
- `tools/`: geradores, auditoria e testes Node.
- `docs/`: inventários, decisões e guias técnicos.

## Manutenção do repositório

```powershell
npm.cmd run check:repository
npm.cmd run check:links
npm.cmd run check:assets
npm.cmd run check:duplicates
npm.cmd run check:unused
npm.cmd run clean:generated -- --dry-run
```

Os relatórios de inventário, duplicados, arquivos grandes e decisões de remoção ficam em `docs/repository/`.

## Segurança e licença

O controle de acesso atual é adequado apenas para narrativa local: um site estático não consegue manter segredos contra quem recebe os arquivos. Não publique dados reais. O código e conteúdo são reservados; veja [SECURITY.md](SECURITY.md) e [LICENSE](LICENSE).
