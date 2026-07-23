# Sanctum Veritatis

![Identidade Sanctum Veritatis](images/logo.png)

Plataforma web estática e imersiva para campanhas narrativas, consulta de arquivos, operações e painéis diegéticos de agentes. O projeto preserva o acervo legado enquanto aplica validação automatizada, rotas compatíveis com GitHub Pages e uma interface institucional responsiva.

[Site ao vivo](https://sanctumveritatis.com) · **Status:** reconstrução estática operacional · **Versão do pacote:** 1.0.0 (sem release estável publicada)

## Sistemas principais

- terminal público e identificação operacional local;
- áreas compartimentadas de agentes e painel de mestre;
- Arquivo Central, Setentrional, Sintech e RedLotus;
- busca, filtros, favoritos, histórico e estado narrativo local;
- compatibilidade entre URLs limpas e rotas legadas `.html`.

## Tecnologias

HTML5, CSS, JavaScript sem framework, Node.js para geradores/testes, GitHub Actions e GitHub Pages. Não há backend, banco de dados ou dependências de produção.

## Estrutura

| Caminho | Responsabilidade |
| --- | --- |
| `css/` | tokens, base, componentes, efeitos e responsividade |
| `js/` | interface, sessão local, permissões e módulos narrativos |
| `data/` | índices e conteúdo estruturado gerado |
| `images/` | imagens, áudio e vídeo legados usados pelo site |
| `agentes/`, `mestre/`, `sistema/` | áreas funcionais |
| `operacoes/`, `restrito/` | módulos narrativos |
| `tools/` | geradores, auditorias, servidor local e testes |
| `docs/` | arquitetura, segurança, implantação e auditorias |

A raiz contém páginas legadas porque ela é também a raiz publicada pelo GitHub Pages. Movê-las para uma estrutura `src/public` quebraria URLs existentes.

## Requisitos e instalação

- Node.js 20 ou superior;
- npm compatível com o `package-lock.json`;
- Git para colaboração.

```powershell
git clone https://github.com/devctha/SanctumVeritatis.git
Set-Location SanctumVeritatis
npm.cmd ci --ignore-scripts
npm.cmd run validate
```

O projeto não requer variáveis de ambiente. O arquivo `.env.example` documenta essa ausência e reserva nomes para uma futura API.

## Desenvolvimento e testes

```powershell
npm.cmd run preview
npm.cmd run lint
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
npm.cmd run validate
```

Abra `http://localhost:4173`. Evite `file://`, pois navegadores podem bloquear recursos locais. Os geradores devem produzir resultados reproduzíveis; `SOURCE_DATE_EPOCH` pode definir a data de geração dos índices.

## Implantação

O GitHub Pages publica a raiz da branch `main` no domínio `sanctumveritatis.com`. Mudanças devem passar por pull request e pelo check `Validate`. Consulte [DEPLOYMENT.md](docs/DEPLOYMENT.md) e [ROUTE_MIGRATION.md](docs/ROUTE_MIGRATION.md).

## Segurança

Este é um site público e estático. Login, papéis e bloqueios no navegador são elementos narrativos, não controles de confidencialidade. Não inclua credenciais reais, dados pessoais, respostas secretas ou notas privadas do mestre. Veja [SECURITY.md](SECURITY.md) e [AUTHENTICATION_AUDIT.md](docs/AUTHENTICATION_AUDIT.md).

## Contribuição e licença

Leia [CONTRIBUTING.md](CONTRIBUTING.md) e use Conventional Commits. Código e conteúdo permanecem sob direitos reservados conforme [LICENSE](LICENSE); não existe autorização implícita para redistribuição.

## Roadmap

As prioridades são separar conteúdo privado, introduzir autenticação real por backend, melhorar acessibilidade e otimizar os maiores assets. O plano completo está em [docs/ROADMAP.md](docs/ROADMAP.md).
