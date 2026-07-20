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
