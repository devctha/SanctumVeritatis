# Migração de Setentrional para Canto da Mariposa

## Rotas

- Nova rota canônica pública: `/operacoes/canto-da-mariposa`.
- Alias compatível: `/operacoes/canto-da-mariposa.html`, com encaminhamento client-side quando a extensão aparece na barra do navegador.
- Rota operacional anterior: `/operacoes/setentrional/`. Ela permanece disponível, marcada como `noindex`, apresenta a notificação **Arquivo reclassificado** e aponta para o novo registro.
- Terminal legado `/setentrional` e cartografia `/operacoes/setentrional/mapa` foram preservados porque contêm interface, documentos e interações ainda úteis.

O GitHub Pages não oferece redirect HTTP 301 configurável. Por isso, a rota antiga usa canonical para a nova operação e uma transição narrativa com link real, sem quebrar o acervo existente.

## Conteúdo preservado

- Ilha de São Firmo, farol, vilarejo, porto, Casa 17 e costa noroeste;
- cronologia de 1931, mobilização e perda da Equipe Alpha em agosto de 1995;
- nomes preservados de Marcus, Yin, Elias, Sophia e Klaus;
- divergência canônica entre cinco identidades e seis passagens/baixas;
- Guarda Costeira, Membrana, cartografia instável e transmissão final;
- mapa `images/setentrional/mapa-sao-firmo.png` e módulo cartográfico legado;
- arquivos e links operacionais Setentrional existentes.

## Conteúdo reformulado

A consulta pública apresenta a descoberta do padrão sonoro e a reclassificação como Canto da Mariposa. A redação não resolve a Sexta Voz, a natureza do Farol Interior nem outros segredos autorais registrados na lore bible.

Os dados atualizáveis ficam em `data/operations/canto-da-mariposa.js`; a apresentação está em HTML/CSS/JavaScript separados.

## Arquivos modificados

- `index.html`: card público da operação;
- `operacoes/setentrional/index.html`: canonical e encaminhamento legado;
- `package.json`: build e teste da rota;
- `operacoes/canto-da-mariposa/index.html`: estrutura semântica;
- `data/operations/canto-da-mariposa.js`: conteúdo administrável;
- `css/canto-da-mariposa.css` e `js/canto-da-mariposa.js`: apresentação e interações.

## Integração

O card de prioridade operacional do `index.html` agora identifica Canto da Mariposa, informa a designação anterior e abre diretamente a rota pública. O link é semântico, possui nome acessível e funciona sem JavaScript.

## Acesso e confidencialidade

A nova página contém somente informações públicas/parciais e marcadores de acesso negado. Nenhuma causa completa, protocolo secreto, nota do mestre ou solução é enviada ao frontend. O dossiê operacional Setentrional continua protegido pela guarda local existente, reconhecendo que essa guarda é narrativa e não segurança de servidor.

## Assets e pendências

O hero reutiliza `images/setentrional/mapa-sao-firmo.png`, preservando a arte do projeto. Uma arte oficial futura pode ser adicionada em `images/canto-da-mariposa/hero.webp` e substituir a camada de fundo após otimização e verificação de licença. Não foi usado áudio porque nenhum arquivo existente pôde ser identificado com segurança como a transmissão CM-AUD-017; a interface declara o áudio indisponível e oferece a transcrição.

Pendente após o PR: revisão narrativa final do sexto registro, fornecimento opcional da arte oficial e de áudio licenciado, e merge manual na `main` para publicação.
