# Conteúdo preservado

## Regra de preservação

Nenhum HTML, script, imagem, áudio ou pasta existente foi alterado nesta fase. O inventário em `AUDITORIA_DO_PROJETO.md` é a linha de base para a futura cópia em `legacy`.

## Conjuntos que exigem preservação integral

- 229 HTMLs, inclusive páginas vazias e cópias.
- `system_core.js` e scripts inline de todas as páginas.
- 51 salas na raiz e 51 em `SALA Results`.
- 20 páginas e uma imagem em `SAS Results`.
- Todos os 17 ativos de mídia, inclusive `images/1.mp3`, GIFs grandes, mapas e logos.
- Comentários, elementos invisíveis, Base64, credenciais, atalhos, parâmetros e estados locais.

## Duplicações confirmadas ou prováveis

- As 51 salas da raiz possuem equivalentes de mesmo nome em `SALA Results`; comparação byte a byte deve anteceder a deduplicação.
- `op-logo.png` existe em `images` e `SAS Results/images`.
- Há pares conceituais com nomes divergentes: `equipe_alpha.html`/`SAS Results/equipe-alpha.html`, `setentrional.html`/`SAS Results/setentrional.html`, `arquivo_brayfog.html`/`SAS Results/brayfog.html`, `alicia.html`/`SAS Results/alicia.html`.

## Decisão para a próxima fase

Criar `legacy` como cópia verificável antes de qualquer migração. Não criar a cópia agora, pois o comando atual restringe a entrega à auditoria e solicita aprovação antes da reconstrução.
