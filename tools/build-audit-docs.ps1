param([string]$Root = (Get-Location).Path)
$d = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $Root 'audit-data.json') | ConvertFrom-Json
$docs = Join-Path $Root 'docs'; New-Item -ItemType Directory -Force -Path $docs | Out-Null
function Esc([string]$s) { if (-not $s) { return '—' }; return ($s -replace '\|','\|' -replace '\r?\n',' ') }
function GroupOf($p) {
  $s = ($p.path+' '+$p.title+' '+($p.keywords -join ' ')).ToLowerInvariant()
  if ($p.path -like 'SALA Results/*' -or $p.path -match '^sala-') { return 'S.A.L.A.' }
  if ($p.path -like 'SAS Results/*' -or $s -match '\bs\.a\.s\b') { return 'S.A.S.' }
  if ($s -match 'sintech') { return 'Sintech' }
  if ($s -match 'aurora') { return 'Aurora de Vidro' }
  if ($s -match 'valyria|vidraceir|westeros') { return 'Valyria' }
  if ($s -match 'draconia|known-world|deuses-e-magia|monarcas') { return 'Draconia' }
  if ($s -match 'lotus|lótus') { return 'Lótus' }
  if ($s -match 'escarlate') { return 'Conselho Escarlate' }
  if ($s -match 'setentrional|são firmo|harpia|corvo_comando|equipe_alpha|calibracao') { return 'Setentrional' }
  if ($s -match 'ncm|operacoessc|opativas|veracruz') { return 'NCM / Operações SC' }
  if ($s -match 'sanctum|ordo|ordem') { return 'Sanctum / legado Ordo' }
  return 'Outro / a classificar'
}
function RoleOf($p) {
  if ($p.bytes -eq 0) { return 'reservado/vazio' }
  $s=($p.path+' '+$p.title).ToLowerInvariant()
  if ($s -match 'log|transcri|conversa|chat') { return 'registro/transcrição' }
  if ($s -match 'gerador|quiz|criar|ficha|conversor') { return 'ferramenta interativa' }
  if ($s -match 'index|hub|intranet|arquivos|operacoes|opativas') { return 'índice/hub' }
  if ($s -match 'sala-|setor') { return 'arquivo restrito' }
  if ($s -match 'dossi|agente|alicia|belladonna|brayfog') { return 'dossiê/personagem' }
  return 'documento/página narrativa'
}

$rows = foreach($p in $d.pages | Sort-Object path) {
  $broken=@($p.resolved|Where-Object{-not $_.exists}).Count
  "| $(Esc $p.path) | $(Esc $p.title) | $(RoleOf $p) | $(GroupOf $p) | $($p.incoming.Count) | $($p.resolved.Count) | $broken | $(Esc ($p.markers -join ', ')) |"
}
$assetRows = foreach($a in $d.assets|Sort-Object path) { "| $(Esc $a.path) | $(Esc $a.extension) | $($a.bytes) |" }
$rowText = $rows -join [Environment]::NewLine
$assetText = $assetRows -join [Environment]::NewLine
$inventory = @"
# Auditoria do projeto

Gerada em 12/07/2026. Escopo: todos os arquivos do repositório, sem alterar as páginas existentes.

## Resumo executivo

- 248 arquivos originais auditados no momento da coleta; 229 são HTML.
- 51 rotas S.A.L.A. na raiz e 51 cópias em SALA Results; somente 0000–0020 têm conteúdo, 0021–0050 estão vazias.
- 20 documentos adicionais em SAS Results, além de uma imagem local.
- 162 HTMLs não recebem link interno detectável (inclui cópias, páginas soltas e conteúdo acessado por pistas/URL direta).
- 178 referências locais não resolvidas na coleta; 171 são atributos vazios, e 7 são alvos concretos suspeitos.
- 129 páginas contêm ao menos um marcador de comportamento oculto/interativo.

## Inventário de páginas

| Arquivo | Título | Função provável | Núcleo | Entradas | Saídas locais | Quebras | Marcadores |
|---|---|---|---|---:|---:|---:|---|
$rowText

## Ativos não HTML

| Arquivo | Tipo | Bytes |
|---|---|---:|
$assetText

## Método e limitações

A auditoria extraiu title, primeiro h1, href, src, links de entrada, referências quebradas e marcadores de JavaScript/CSS. “Órfã” significa sem link HTML interno detectado; não prova ausência narrativa, pois há rotas digitadas, parâmetros e desbloqueios por script. A reconstrução deve tratar esta tabela como inventário técnico, e validar manualmente segredos antes de migrar.
"@
Set-Content -Encoding UTF8 -LiteralPath (Join-Path $docs 'AUDITORIA_DO_PROJETO.md') -Value $inventory

$broken = foreach($p in $d.pages){foreach($r in $p.resolved|Where-Object{-not $_.exists}){if($r.link){"| $(Esc $p.path) | $(Esc $r.link) | $(Esc $r.target) |"}}}
$orphans = $d.pages|Where-Object{$_.incoming.Count -eq 0 -and $_.bytes -gt 0}|ForEach-Object{ "- {0} — {1}" -f $_.path,(Esc $_.title) }
$brokenText = $broken -join [Environment]::NewLine
$orphanText = $orphans -join [Environment]::NewLine
$routes = @"
# Mapa de rotas

## Porta de entrada atual

index.html é a entrada publicada. A malha atual é plana na raiz, com dois acervos paralelos (SALA Results e SAS Results). Não há roteador central; cada HTML implementa navegação e aparência próprias.

## Agrupamentos recomendados

| Destino proposto | Origem principal | Tratamento |
|---|---|---|
| /sistema/ | index, intranet, arquivos, sobre, faq, regras | shell institucional e índices globais |
| /operacoes/setentrional/ | setentrional*, ConselhoSetentrional, equipe_alpha, corvo_comando, harpia, calibracao, logs | operação central, sem confundir com a organização |
| /operacoes/aurora-de-vidro/ | auroradevidro, auroraop, briefing, apêndices, logaurora | operação coesa |
| /restrito/sintech/ | SintechIndex, sintech2–8 | sequência 1–8; preservar lacunas 9/final como pista ou quebra confirmada |
| /restrito/conselho-escarlate/ | ConselhoEscarlate e quatro aspectos, escarlate | arquivo temático |
| /restrito/lotus/ | redlotus*, loglotus, conversa_lotus | sequência e comunicações |
| /restrito/salas/ | sala-0000–0050 e cópias | índice contínuo; 0021–0050 marcadas indisponíveis |
| /universos/valyria/ | Valyria, Vidraceiros, bestiário, mapa, arquétipos e geradores | universo/simulação separado da operação principal |
| /universos/draconia/ | draconia, DraconiaHub, Known World, deuses, monarcas | arquivo de universo |
| /restrito/ncm/ | projeto_ncm, OperacoesSC, OPVeracruz, OPAtivas | projeto/operações classificadas |
| /legacy/ | páginas Ordo e cópias integrais | preservação e aliases, sem promover Ordo a organização atual |

## Referências locais quebradas concretas

| Origem | Referência | Alvo resolvido |
|---|---|---|
$brokenText

## Páginas sem entrada detectável (não apagar)

$orphanText

## Estratégia de compatibilidade

Manter cada URL raiz como alias/redirect somente depois de copiar o estado atual para legacy. Links relativos em GitHub Pages devem evitar barra inicial rígida. A tabela definitiva de redirecionamentos deve ser criada na fase de migração, após aprovação deste mapa.
"@
Set-Content -Encoding UTF8 -LiteralPath (Join-Path $docs 'MAPA_DE_ROTAS.md') -Value $routes

$narrative = @'
# Mapa narrativo

## Identidade canônica

- Organização: **Sanctum Veritatis**.
- Operação: **Setentrional**.
- Incidente principal: **Ilha de São Firmo**.
- Natureza: contenção paranormal e ruptura da Membrana.

## Núcleos encontrados

| Núcleo | Papel observado | Relações e cuidado de migração |
|---|---|---|
| Sanctum Veritatis | organização/infraestrutura maior | deve enquadrar todos os acervos; páginas Ordo são legado ou fonte externa |
| Setentrional | operação, conselho, comando e equipe | eixo de entrada; conecta arquivos, Harpia, Corvo, Equipe Alpha, logs e Reliquiae |
| S.A.L.A. | catálogo numerado de registros anômalos | 0000–0020 escritos; 0021–0050 reservados; duplicado integral em pasta de resultados |
| S.A.S. | acervo analítico paralelo | perfis, organizações, operações, Setor 973 e Setentrional; hoje desconectado da raiz |
| Sintech | progressão em oito fases | rotas para `sintech9.html` e `sintech_final.html` não existem; podem ser pistas deliberadas |
| Aurora de Vidro | operação com briefing, apêndices e log | duas páginas de entrada concorrentes devem virar visões complementares |
| Conselho Escarlate | conselho/relicários por Conhecimento, Energia, Medo e Morte | preservar quatro vozes/aspectos e página de convergência |
| Lótus | Evocação, canal seguro e registros | manter ordem narrativa inferida, sem expor soluções |
| Valyria | universo histórico/simulação e ferramentas | identidade visual própria pode existir dentro do invólucro arquivístico |
| Draconia | universo, linhagem, mapa, deuses e monarcas | cruzamento com material S.A.S. (Casa Draconia) |
| NCM / Operações SC | projeto ultrassecreto e operações | Veracruz e listas ativas são documentos operacionais relacionados |
| Vivarium / Revive / Reliquiae / A.S.T.R.A. | operações/projetos adicionais | evidenciam que Sanctum é maior que Setentrional |

## Conexões narrativas prioritárias

1. `index.html` → Sanctum como sistema institucional.
2. Sanctum → Setentrional como operação ativa, nunca como organização.
3. Setentrional → São Firmo, conselho, Equipe Alpha, transmissões e acervo.
4. Arquivo Central → S.A.L.A., S.A.S., entidades, agentes, artefatos e operações secundárias.
5. Arquivo Restrito → Sintech, Lótus, Conselho Escarlate, NCM e setores 967/973/978.
6. Universos importados → Valyria e Draconia, apresentados como arquivos/simulações até confirmação autoral.

## Ambiguidades que devem permanecer abertas

- Relação exata entre Ordo Realitas e Sanctum varia entre páginas; preservar como material histórico/importado até reconciliação.
- O estatuto de Valyria/Draconia (universo, simulação, operação histórica ou campanha paralela) não é inequívoco.
- Rotas finais ausentes da Sintech podem ser falhas reais ou ausência diegética.
- Páginas órfãs podem representar descoberta por URL, senha ou pista; não devem ser ligadas automaticamente.
'@
Set-Content -Encoding UTF8 -LiteralPath (Join-Path $docs 'MAPA_NARRATIVO.md') -Value $narrative

$preserved=@'
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
'@
Set-Content -Encoding UTF8 -LiteralPath (Join-Path $docs 'CONTEUDO_PRESERVADO.md') -Value $preserved

$problems=@'
# Problemas encontrados

## Críticos

- Não existe arquitetura comum: 229 documentos autocontidos repetem CSS/JS e criam identidades divergentes.
- 162 páginas não têm link interno de entrada detectável; há alto risco de perda em uma migração manual.
- Há referências externas pornográficas em um arquivo legado; revisar como possível injeção/artefato comprometido, sem abrir nem executar.
- Senhas e regras de acesso aparecem em código cliente em diversas páginas; isso é aceitável apenas como mecânica narrativa, não como segurança real.

## Altos

- `sintech_final.html` e `sintech9.html` são referenciados mas ausentes.
- `TRANSCRICÃO_CORRENTE_v.04.html` sofre divergência de codificação/nome em pelo menos uma referência.
- `ordem-paranormal-logo.png` e `Scripts/AC_RunActiveContent.js` são referenciados mas ausentes.
- 30 salas vazias são publicadas duas vezes; precisam de estado explícito, não de página silenciosamente vazia.
- Ordo, Ordem e Sanctum são usados de forma inconsistente; a identidade canônica precisa ser aplicada sem apagar documentos legados.

## Médios

- Capitalização e separadores variam (`SintechIndex`, `Log2`, underscores, hífens e acentos), tornando URLs frágeis.
- Grande volume de CSS/JS inline dificulta acessibilidade, manutenção e modo de estabilidade.
- Cópias em `SALA Results` e pares em `SAS Results` podem divergir futuramente.
- Muitos `href`/`src` vazios inflam a contagem de quebras e podem provocar recarga involuntária.

## Segurança da auditoria

Nenhuma URL externa suspeita foi aberta, nenhum script do site foi executado e nenhuma credencial foi reproduzida nesta documentação. A próxima fase deve testar em servidor local isolado e inspecionar scripts antes de navegação automatizada.
'@
Set-Content -Encoding UTF8 -LiteralPath (Join-Path $docs 'PROBLEMAS_ENCONTRADOS.md') -Value $problems
Write-Output "Documentos gerados em $docs"



