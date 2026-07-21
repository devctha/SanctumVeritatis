# Auditoria do repositório

Data: 2026-07-20
Branch: `chore/repository-cleanup-and-reorganization`
Base: `main` em `6ee4905`

## Baseline

- 737 arquivos rastreados, 83.023.557 bytes.
- 742 arquivos locais fora de `.git` e `node_modules`, 380.836.536 bytes.
- 303 diretórios locais e 176 arquivos na raiz.
- `.git`: 73.602.250 bytes; pack: 69,73 MiB.
- 120 arquivos rastreados vazios.
- 9 grupos de conteúdo duplicado, 9 instâncias excedentes e 21.871 bytes potencialmente repetidos.
- 5 arquivos locais acima de 10 MB; todos são checkpoints ZIP ignorados.
- Um único lockfile (`package-lock.json`) e npm como gerenciador oficial.
- Nenhuma dependência instalada, cache, build, log, banco ou segredo real rastreado.

## Diagnóstico

A aplicação é um site estático publicado diretamente pelo GitHub Pages. A raiz extensa e os pares `rota.html`/`rota/index.html` são uma estratégia deliberada de compatibilidade com URLs limpas, não uma duplicação removível em massa. `data/site-index.*`, `data/archives/*` e aliases gerados permanecem versionados porque o deploy não publica artefatos separados.

O excesso removível estava concentrado em placeholders S.A.L.A. sem bytes nem referências, um asset duplicado sem consumidor e `audit-data.json`, intermediário reproduzível por `tools/audit-project.ps1`.

## Segurança

A busca por nomes sensíveis e padrões comuns de tokens, chaves privadas e credenciais não encontrou segredo real. `.env.example` contém apenas valores de exemplo. A autenticação do site continua sendo demonstrativa e não protege dados estáticos publicados.

## Decisões conservadoras

- Os cinco ZIPs em `.checkpoints/` permanecem locais e ignorados; não foram enviados ao Git nem apagados.
- Assets narrativos e arquivos grandes em uso foram preservados.
- Aliases por agente, embora byte a byte iguais, foram preservados por dependerem do diretório do perfil.
- Não houve reescrita de histórico, force push, migração automática para LFS ou reorganização massiva de URLs.

## Resultado final

- 626 arquivos rastreados, 82.601.038 bytes e nenhum arquivo vazio.
- 631 arquivos locais fora de `.git` e `node_modules`, 380.414.017 bytes.
- 243 diretórios locais e 145 arquivos na raiz.
- `.git` antes do commit documental: 73.704.582 bytes; pack preservado em 69,73 MiB.
- Redução líquida: 111 arquivos rastreados e 422.519 bytes no estado atual.
- 122 arquivos removidos, 11 arquivos adicionados e nenhum asset movido ou enviado ao Git LFS.
