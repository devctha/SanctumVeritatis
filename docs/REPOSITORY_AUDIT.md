# Auditoria do repositório

Data da auditoria: 20 de julho de 2026. Escopo: versão atual, histórico Git acessível e metadados do repositório `devctha/SanctumVeritatis`.

## Estado inicial

- Repositório público, hospedado no GitHub Pages, com `main` como branch padrão.
- 727 arquivos rastreados e nenhum arquivo não rastreado relevante; `.checkpoints/` era ignorado.
- Branch local inicial: `main`, sincronizada com `origin/main` no commit `d2b73ee`.
- Branches remotas efetivas: `main` e `feature/sanctum-veritatis-full-rebuild`. Referências locais `origin/agent/*` estavam obsoletas após merges anteriores.
- Nenhuma tag, release, issue aberta ou pull request aberto.
- Um workflow próprio ativo, `.github/workflows/validate.yml`, além do workflow dinâmico do GitHub Pages.
- Dependabot, alertas de vulnerabilidade e análise de código não estavam habilitados/configurados. Durante a organização, alertas de vulnerabilidade e correções automáticas do Dependabot foram habilitados com sucesso.
- A branch `main` não possuía regra de proteção.
- Histórico recente contém commits genéricos antigos (`Add files via upload`), preservados para evitar reescrita destrutiva. Os commits recentes usam majoritariamente Conventional Commits.

## Segurança

A busca por indicadores comuns de senha, token, chave privada, URL de banco e arquivos `.env` não encontrou credenciais confirmadas na versão atual ou nos commits alcançáveis. O único candidato foi `SECRET_BY_ORIGIN`, uma constante de geração narrativa revisada como falso positivo. Gitleaks e TruffleHog não estavam instalados; a busca automatizada é heurística e não substitui GitHub Secret Scanning ou ferramenta dedicada. Nenhum valor candidato foi reproduzido neste relatório.

Risco crítico restante: o repositório é público e o site é estático. Todo HTML, JavaScript, JSON, painel de mestre, solução narrativa ou dado enviado ao Pages é legível sem login. O acesso `Mestre` é uma convenção diegética, não autenticação. Conteúdo privado deve ser removido do repositório público e servido por backend autorizado ou mantido em repositório privado separado.

Não foi feita reescrita de histórico, remoção remota de branches ou rotação de credenciais. Caso uma credencial seja descoberta posteriormente, ela deve ser revogada primeiro; depois, a limpeza histórica pode ser planejada com `git filter-repo` em janela coordenada.

## Estrutura e manutenção

A raiz mistura páginas históricas, aliases `.html` e diretórios de URL limpa. Isso é intencional para a publicação direta pelo GitHub Pages. Uma migração imediata para `src/` e `public/` quebraria rotas e não foi realizada.

Problemas observados:

- grande quantidade de páginas duplicadas por compatibilidade de rotas;
- nomes e capitalização legados inconsistentes;
- documentos técnicos numerosos sem categorização por subpastas;
- assets multimídia grandes e com procedência/licença não documentada;
- índices gerados continham timestamp não reproduzível;
- um PNG duplicado em `SAS Results/images/op-logo.png` e `images/op-logo.png`;
- aliases vazios `sala-0021.html` a `sala-0050.html`, preservados até confirmação de uso/compatibilidade;
- `audit-data.json` na raiz é um artefato de auditoria versionado, ainda referenciado pela documentação e preservado.

## Alterações desta organização

- README profissional com instalação, testes, implantação, estrutura, segurança e roadmap.
- Templates para bugs, funcionalidades, conteúdo e pull requests.
- Dependabot mensal para npm e GitHub Actions; alertas de vulnerabilidade e correções automáticas habilitados no GitHub.
- `.gitignore` ampliado para caches, temporários, IDEs e bancos locais.
- geração do Arquivo Central tornada determinística.
- relatórios de branches, arquivos grandes, terceiros e roadmap adicionados.
- contribuição, segurança e changelog atualizados.

## Decisões de preservação

Nenhum asset, rota, documento narrativo, branch remota ou arquivo histórico foi removido. Duplicatas e nomes antigos exigem validação narrativa e de tráfego antes de qualquer limpeza. Não foram criados `CODEOWNERS` porque apenas o proprietário `devctha` é conhecido e uma regra redundante não agregaria revisão independente.

## Recomendações administrativas

1. Tornar privado o conteúdo de mestre ou separá-lo em um repositório privado, sem simplesmente ocultá-lo via JavaScript.
2. Habilitar GitHub Secret Scanning/Push Protection; os alertas e correções automáticas do Dependabot já foram habilitados.
3. Proteger `main`: exigir PR, check `validate`, resolução de conversas, bloquear force push e exclusão.
4. Avaliar a procedência de cada asset listado em `THIRD_PARTY_ASSETS.md`.
5. Otimizar imagens, GIFs, áudio e vídeo antes de considerar Git LFS; Pages e clones devem ser medidos primeiro.

## Comandos de verificação

```powershell
git status
git branch -a
git log --oneline --decorate -15
npm.cmd ci --ignore-scripts
npm.cmd run validate
```
