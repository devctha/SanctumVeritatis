(() => {
  'use strict';

  if (document.documentElement.dataset.svInitialized === 'true') return;
  document.documentElement.dataset.svInitialized = 'true';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const nativeReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const storage = {
    get(key) {
      try { return window.sessionStorage.getItem(key); } catch (_) { return null; }
    },
    set(key, value) {
      try { window.sessionStorage.setItem(key, value); } catch (_) { /* Sessão continua sem persistência. */ }
    },
    remove(key) {
      try { window.sessionStorage.removeItem(key); } catch (_) { /* Sessão continua sem persistência. */ }
    }
  };

  const preference = {
    get(key) {
      try { return window.localStorage.getItem(key); } catch (_) { return null; }
    },
    set(key, value) {
      try { window.localStorage.setItem(key, value); } catch (_) { /* Preferência não persistida. */ }
    }
  };

  function readStoredArray(key) {
    try {
      const value = JSON.parse(storage.get(key) || '[]');
      return Array.isArray(value) ? value : [];
    } catch (_) {
      storage.remove(key);
      return [];
    }
  }

  const elements = {
    body: document.body,
    bootGate: $('#boot-gate'),
    bootOutput: $('#boot-output'),
    authForm: $('#operation-auth'),
    authInput: $('#operation-name'),
    authFeedback: $('#auth-feedback'),
    attemptCounter: $('#attempt-counter'),
    accessSequence: $('#access-sequence'),
    accessMessage: $('#access-message'),
    accessBar: $('.access-bar'),
    accessBarFill: $('.access-bar span'),
    accessDetail: $('#access-detail'),
    shell: $('#system-shell'),
    workspace: $('#main-workspace'),
    nav: $('.directory-nav'),
    directory: $('#directory-panel'),
    mobileMenu: $('#mobile-menu'),
    mobileScrim: $('#mobile-scrim'),
    systemMessage: $('#system-message'),
    systemMessageWrap: $('.system-message'),
    notificationStack: $('#notification-stack'),
    documentModal: $('#document-modal'),
    documentCode: $('#document-code'),
    documentTitle: $('#document-title'),
    documentMeta: $('#document-meta'),
    documentContent: $('#document-content'),
    documentIntegrity: $('#document-integrity'),
    closeDocument: $('#close-document'),
    commandForm: $('#command-form'),
    commandInput: $('#command-input'),
    redirectOverlay: $('#redirect-overlay'),
    redirectCode: $('#redirect-code'),
    entityFlash: $('#entity-flash')
  };

  const state = {
    authorized: storage.get('sv-setentrional-authorized') === 'true',
    attempts: 0,
    lockedUntil: 0,
    currentView: 'overview',
    soundEnabled: false,
    reducedMotion: nativeReducedMotion.matches || preference.get('sv-reduce-motion') === 'true',
    mobileOpen: false,
    lastFocus: null,
    radioTyping: false,
    selectedFrequency: '09.131',
    radioScans: 0,
    mapZoom: 1,
    selectedMapPoint: 'lighthouse',
    mapDrag: null,
    mapWasMobile: null,
    markClicks: 0,
    markClickTimer: 0,
    membraneClicks: 0,
    redactionsOpened: 0,
    openedDocuments: readStoredArray('sv-opened-documents'),
    unlocks: new Set(readStoredArray('sv-unlocks')),
    protocolCount: 0,
    timers: new Set(),
    intervals: new Set(),
    idleTimer: 0,
    redirecting: false
  };

  const bootLines = [
    'Inicializando interface SV-04...',
    'Verificando integridade dos arquivos...',
    'Estabelecendo conexão segura...',
    'Consultando banco de operações...',
    'Sincronizando diretório costeiro...',
    'Identificação necessária.',
    'Insira o nome da operação.'
  ];

  const authErrors = [
    'OPERAÇÃO NÃO ENCONTRADA.',
    'CREDENCIAL INSUFICIENTE. CONSULTA REGISTRADA.',
    'ACESSO NEGADO PELO DIRETÓRIO CENTRAL.',
    'O NORTE VERDADEIRO NÃO APONTA PARA CASA.'
  ];

  const documents = [
    {
      code: 'SR-07-INI', title: 'Relatório inicial de mobilização', date: '15.07.2026', integrity: 98, state: 'LIBERADO', tags: 'relatório inicial mobilização setentrional ilha são firmo',
      body: `<span class="stamp">RESTRITO</span><h3>ORDEM DE MOBILIZAÇÃO // SETENTRIONAL</h3><p>Por determinação do Diretório de Operações, uma nova célula será enviada à Ilha de São Firmo. O objetivo primário é restabelecer contato com a população local e localizar a equipe SV-11.</p><p>Objetivos secundários: verificar a reativação do farol; recolher documentos civis anteriores a 1995; medir a estabilidade da Membrana; impedir propagação do sinal para o continente.</p><blockquote>Se a equipe ouvir seus próprios nomes no canal 09, deverá interromper toda comunicação externa.</blockquote><p class="signature">Diretoria de Operações Especiais // assinatura validada parcialmente</p>`
    },
    {
      code: 'SF-1891-01', title: 'Primeiro registro cartográfico', date: '??.??.1891', integrity: 64, state: 'ALTERADO', tags: 'mapa cartografia fundação primeiro registro ilha',
      body: `<h3>CARTA NÁUTICA 43-N // ANEXO DE CUSTÓDIA</h3><p>A ilha de São Firmo aparece nesta carta entre dois bancos oceânicos que não existem. A escala indica 11,4 km de costa; medições posteriores variam entre 8 e 31 km.</p><p class="destroyed">Observação original removida por abrasão mecânica.</p><blockquote>Nota a lápis: “Não desenhe o norte. Ele percebe.”</blockquote><p>Autoria atribuída a A. Vilar, cartógrafo. Não há registro civil desse nome.</p>`
    },
    {
      code: 'SF-1995-00', title: 'Incidente do Farol, 1995', date: '19.09.1995', integrity: 57, state: 'RECUPERADO', tags: 'incidente 1995 farol evacuação desaparecimentos',
      body: `<span class="stamp">CASO ENCERRADO</span><h3>RELATÓRIO DE INCIDENTE SF-95</h3><p>Às 02:13, o farol voltou a operar após onze meses sem conexão à rede elétrica. O feixe completou sete rotações. A cada rotação, um nome desapareceu do livro de moradores.</p><p>Às 02:31, a guarda costeira recebeu a ordem de evacuação. A embarcação enviada retornou vazia, com o motor ainda quente.</p><p><span class="classified">████████████████████</span> foi encontrado dentro da lâmpada, repetindo a voz do operador.</p><p>Conclusão oficial: falha estrutural seguida de incêndio. Conclusão interna: <strong>manifestação de Conhecimento com resposta hematológica coletiva.</strong></p>`
    },
    {
      code: 'SF-LUZ-95', title: 'Relatório sobre o farol', date: '20.09.1995', integrity: 72, state: 'LIBERADO', tags: 'farol luz lâmpada torre degraus arquitetura',
      body: `<h3>ANÁLISE DA ESTRUTURA ÓPTICA</h3><p>A torre possui 143 degraus na subida e 139 na descida. A sala da lâmpada mede 4,2 m externamente e 11,8 m em seu interior.</p><p>O feixe não se propaga para o mar. Filmagens mostram a luz curvando em direção ao centro da lente, como se iluminasse um volume localizado atrás do espaço observável.</p><blockquote>Tempo máximo de observação recomendado: 13 segundos.</blockquote><p class="signature">Agente M. Salvat // “há alguém dentro da lâmpada”</p>`
    },
    {
      code: 'DEP-ALBA-02', title: 'Depoimento de sobrevivente', date: '22.09.1995', integrity: 43, state: 'CONFLITANTE', tags: 'depoimento sobrevivente morador alba testemunha',
      body: `<h3>TRANSCRIÇÃO // TESTEMUNHA “ALBA”</h3><p><strong>ENTREVISTADOR:</strong> Quantas pessoas viviam em São Firmo?</p><p><strong>ALBA:</strong> Trezentas. Não, trinta. Só eu. A ilha sempre esteve vazia.</p><p><strong>ENTREVISTADOR:</strong> Quem operava o farol?</p><p><strong>ALBA:</strong> Meu pai. Eu nunca tive pai. Ele ainda liga a luz quando quer que eu volte.</p><p class="destroyed">[A testemunha passa a responder antes das perguntas serem formuladas.]</p><blockquote>“Vocês chegaram tarde em 1995. Vão chegar tarde outra vez.”</blockquote>`
    },
    {
      code: 'TR-09-13', title: 'Transmissão interceptada', date: '13.06.2011', integrity: 41, state: 'ÁUDIO', tags: 'transmissão interceptada rádio guarda costeira equipe',
      body: `<h3>CANAL 09 // CAMADA DE VOZ 01</h3><p>...a neblina tem cheiro de ferro. As casas estão abertas. Não há ninguém, mas todas as mesas foram postas para nós.</p><p>[interferência de 17 segundos]</p><p>O farol não ilumina para fora. Ele ilumina para dentro. Câmbio? Tem alguém aí?</p><blockquote>Tem alguém dentro da lâmpada.</blockquote><p>Nota forense: duas camadas adicionais repetem a mensagem com 16 e 31 segundos de antecedência.</p>`
    },
    {
      code: 'PC-SF-04', title: 'Protocolo de contenção', date: '14.06.2011', integrity: 100, state: 'OBRIGATÓRIO', tags: 'protocolo contenção segurança missão agentes',
      body: `<h3>PROTOCOLO DE CAMPO SÃO FIRMO</h3><p>01. Nenhum agente deve permanecer sozinho dentro da neblina.</p><p>02. Nenhuma voz familiar deve receber resposta pelo rádio.</p><p>03. Divergências de memória exigem confirmação por dupla observação.</p><p>04. Não conte os degraus do farol.</p><p>05. Se a luz chamar seu nome, utilize apenas o código operacional.</p><p>06. Sangramento nasal coletivo determina retirada imediata.</p><p class="signature">Ciência obrigatória antes do desembarque.</p>`
    },
    {
      code: 'SV-11-MIA', title: 'Lista de agentes desaparecidos', date: '17.06.2011', integrity: 88, state: 'SEM CONTATO', tags: 'agentes desaparecidos equipe sv-11 pessoas',
      body: `<span class="stamp">MIA</span><h3>CÉLULA SV-11 // ESTADO DESCONHECIDO</h3><p>Agente Helena Vale — comando de campo — último sinal: vilarejo.</p><p>Agente Caio Moura — contenção — último sinal: doca.</p><p>Agente Íris Salvat — ocultismo aplicado — último sinal: farol.</p><p>Agente Davi Noronha — comunicações — continua transmitindo em intervalos de 13 dias. Davi Noronha morreu em 2008.</p><p class="signature">Nenhum corpo recuperado. Nenhum encerramento autorizado.</p>`
    },
    {
      code: 'CAMPO-11-B', title: 'Anotações de campo', date: '16.06.2011', integrity: 69, state: 'MANUSCRITO', tags: 'anotações campo equipe casas vila sino',
      body: `<h3>CADERNO RECUPERADO NA DOCA</h3><p>Dia 1 — A ilha parece menor vista do barco.</p><p>Dia 2 — Encontramos nossas assinaturas no livro da pousada. Datas de 1995.</p><p>Dia 3 — Íris diz que o sino toca debaixo d'água. Caio diz que não temos uma agente chamada Íris.</p><p>Dia <span class="classified">██</span> — As janelas mudaram. Agora olham para nós.</p><blockquote>Não existe saída ao sul. O mapa dobra.</blockquote>`
    },
    {
      code: 'MEM-87-R', title: 'Alterações da Membrana', date: '14.07.2026', integrity: 93, state: 'CRÍTICO', tags: 'membrana ruptura sangue conhecimento análise',
      body: `<h3>RELATÓRIO DE LEITURA PARANORMAL</h3><p>Índice de ruptura: 87,3% e crescente. Elementos predominantes: Sangue e Conhecimento. Traços residuais de Medo não mensurável.</p><p>A ruptura não está concentrada em um ponto. Ela acompanha a linha de visão de qualquer observador voltado para o farol.</p><p>Hipótese: São Firmo não contém uma ruptura. <strong>A ilha é a forma assumida pela ruptura quando observada.</strong></p><p class="signature">Núcleo de Integridade da Membrana // revisão pendente</p>`
    },
    {
      code: 'CARTA-95', title: 'Carta nunca enviada', date: '18.09.1995', integrity: 76, state: 'PESSOAL', tags: 'carta não enviada faroleiro família',
      body: `<h3>DESTINATÁRIO AUSENTE</h3><p>Meu amor,</p><p>A luz voltou a girar, embora eu tenha quebrado a lente. Ela sabe quando fecho os olhos. Às vezes ilumina lembranças que não são minhas: uma sala verde, sete portas, pessoas usando o símbolo SV.</p><p>Não venha me buscar. Se alguém disser que sou eu no rádio, pergunte o nome do nosso filho. Nós nunca tivemos um.</p><p>O Norte Verdadeiro aponta para o abismo.</p><p class="signature">A. F. // carta encontrada sem envelope dentro da parede norte</p>`
    },
    {
      code: 'EVAC-95-A', title: 'Aviso de evacuação', date: '19.09.1995', integrity: 85, state: 'CANCELADO', tags: 'aviso evacuação moradores porto',
      body: `<span class="stamp">CANCELADO</span><h3>AVISO À POPULAÇÃO DE SÃO FIRMO</h3><p>Dirijam-se à doca sul sem bagagens. Mantenham portas e janelas abertas. Não olhem diretamente para o feixe do farol.</p><p>A chamada será repetida pelo sino da capela. Ignorem qualquer segunda chamada.</p><p class="destroyed">Cancelamento emitido às 02:12, um minuto antes da ordem original.</p><p class="signature">Administração Costeira // emissor não identificado</p>`
    },
    {
      code: 'SIL-00-9', title: 'Ordem de silêncio', date: '21.09.1995', integrity: 97, state: 'VIGENTE', tags: 'ordem silêncio encobrimento documentos governo',
      body: `<h3>DIRETRIZ DE COMPARTIMENTAÇÃO TOTAL</h3><p>Todos os registros civis, náuticos e meteorológicos relacionados a São Firmo devem ser recolhidos. Referências cartográficas serão substituídas. Sobreviventes serão realocados sob identidades de custódia.</p><p>A versão oficial indicará colapso estrutural e contaminação industrial.</p><p>É proibida a reprodução da frase encontrada na sala da lâmpada. <span class="classified">████████████████████████████</span></p><p class="signature">Diretório Central // ordem ainda vigente</p>`
    },
    {
      code: 'SF-DEST-13', title: 'Registro parcialmente destruído', date: '██.██.1995', integrity: 13, state: 'BLOQUEADO', tags: 'registro destruído secreto norte diretório', locked: true, unlock: 'destroyed',
      body: `<h3>SETOR MAGNÉTICO 13 // RECONSTRUÇÃO INCOMPLETA</h3><p>O farol não foi construído em 1891. Ele foi <span class="destroyed">encontrado</span>.</p><p>A fundação desce por pelo menos quatro quilômetros. Não há rocha sob a torre. Há <span class="classified">uma cavidade que responde quando chamada de norte</span>.</p><p>Sete diretórios foram copiados antes da destruição do arquivo: L—Q—O—C—V—B—S.</p><blockquote>Não estamos contendo a ilha. Estamos impedindo que ela termine de chegar.</blockquote>`
    },
    {
      code: 'SV-NULL-04', title: 'Documento com trechos censurados', date: '00.00.0000', integrity: 0, state: 'INEXISTENTE', tags: 'censurado sanctum origem segredo monograma', locked: true, unlock: 'null',
      body: `<h3>ARQUIVO QUE NÃO DEVERIA EXISTIR</h3><p>A Sanctum Veritatis recebeu a primeira transmissão de São Firmo <span class="classified">quarenta e três anos antes da invenção do rádio</span>.</p><p>Remetente: ESTAÇÃO SV-04.</p><p>Usuário conectado: <span class="classified">VOCÊ</span>.</p><p>Horário de emissão: <span class="classified">AGORA</span>.</p><blockquote>Não clique novamente no símbolo. Ele já percebeu.</blockquote>`
    }
  ];

  const timeline = [
    { date: '18??', title: 'Primeiro relato oral', detail: 'Pescadores descrevem uma luz no horizonte norte. A ilha ainda não aparece em cartas, mas três diários usam o nome São Firmo.', conflict: true },
    { date: '1891', title: 'Primeiro registro cartográfico', detail: 'Uma carta náutica registra 11,4 km de costa. A tinta utilizada só seria fabricada a partir de 1907.', document: 'SF-1891-01' },
    { date: '1937 / 1941', title: 'Construção do farol', detail: 'Arquivos municipais indicam duas inaugurações e nenhum projeto de construção. Fotografias anteriores já mostram a torre.', conflict: true },
    { date: '1968', title: 'Primeiros desaparecimentos', detail: 'Nove pescadores desaparecem. O livro da capela registra seus funerais três dias antes da partida.' },
    { date: '19.09.1995', title: 'Incidente do Farol', detail: 'A luz retorna às 02:13. O vilarejo é silenciado, a evacuação falha e todos os registros são compartimentados.', document: 'SF-1995-00' },
    { date: '21.09.1995', title: 'Encerramento oficial', detail: 'São Firmo é removida de mapas, registros meteorológicos e rotas marítimas. A Ordem de Silêncio entra em vigor.', document: 'SIL-00-9' },
    { date: '1996—2010', title: 'Transmissões posteriores', detail: 'Sinais curtos surgem a cada treze dias. Algumas mensagens usam vozes de pessoas ainda não nascidas.' },
    { date: '17.06.2011', title: 'Desaparecimento da célula SV-11', detail: 'Quatro agentes deixam de responder. Um quinto nome aparece nos relatórios, embora a equipe tivesse apenas quatro membros.', document: 'SV-11-MIA' },
    { date: '14 / 15.07.2026', title: 'Reabertura de Setentrional', detail: 'A Membrana atinge 87,3%. Uma nova equipe é mobilizada. O sistema registra que a operação já fracassou.', conflict: true, document: 'SR-07-INI' }
  ];

  const people = [
    { id: 'helena', code: 'SV-11/A', name: 'Helena Vale', role: 'Comando de campo', status: 'DESAPARECIDA', symbol: 'HV', data: { 'Último contato': 'Vilarejo, 17.06.2011', 'Idade registrada': '34 / 61 / inexistente', 'Vínculo': 'Célula SV-11', 'Risco': 'Contaminação cognitiva' }, note: 'Seu diário descreve decisões tomadas dois dias depois de seu desaparecimento.' },
    { id: 'salvat', code: 'SV-11/C', name: 'Íris Salvat', role: 'Ocultismo aplicado', status: 'REGISTRO CONFLITANTE', symbol: 'IS', data: { 'Último contato': 'Farol, 17.06.2011', 'Idade registrada': '29', 'Vínculo': 'Nenhum / SV-11', 'Risco': 'Duplicação documental' }, note: 'Caio Moura afirma que Íris nunca integrou a equipe. Fotografias mostram cinco agentes.' },
    { id: 'alba', code: 'CIV-95/1', name: '“Alba”', role: 'Testemunha civil', status: 'LOCAL DESCONHECIDO', symbol: 'A?', data: { 'Último contato': 'Custódia, 22.09.1995', 'Idade registrada': '17 em todos os registros', 'Vínculo': 'São Firmo', 'Risco': 'Antecipação verbal' }, note: 'Responde perguntas antes de serem feitas. Nenhuma impressão digital permanece igual.' },
    { id: 'faroleiro', code: 'CIV-95/F', name: 'A. F.', role: 'Último faroleiro', status: 'MORTO / TRANSMITINDO', symbol: 'AF', data: { 'Último contato': 'Sala da lâmpada', 'Idade registrada': '52', 'Vínculo': 'Administração costeira', 'Risco': 'Fonte do canal 09' }, note: 'A voz continua aparecendo em frequências abandonadas. A certidão de nascimento está em branco.' },
    { id: 'noronha', code: 'SV-11/D', name: 'Davi Noronha', role: 'Comunicações', status: 'IMPOSSÍVEL', symbol: 'DN', data: { 'Último contato': 'Doca, 17.06.2011', 'Óbito confirmado': '03.02.2008', 'Vínculo': 'Célula SV-11', 'Risco': 'Paradoxo de identidade' }, note: 'Foi designado à operação três anos após morrer. Sua assinatura digital é válida.' }
  ];

  const entities = {
    luminaria: { glyph: '◉', code: 'E-01 / CONHECIMENTO + SANGUE', title: 'A Luminária', classes: ['COGNITIVA', 'ÓPTICA', 'PREDATÓRIA'], text: 'Manifestação vinculada à lente do farol. Não emite luz; remove informação daquilo que ilumina. Vítimas perdem nomes, vínculos e memórias em ordem variável.', warning: 'Não observar diretamente. Não permitir que o feixe complete uma rotação sobre o mesmo indivíduo.' },
    afogados: { glyph: '∴', code: 'E-02 / SANGUE', title: 'Os Sem-Rosto', classes: ['COLETIVA', 'LITORÂNEA', 'MIMÉTICA'], text: 'Figuras avistadas entre a doca e a maré baixa. Possuem roupas dos moradores desaparecidos, mas nenhuma estrutura facial. Reproduzem vozes familiares debaixo d’água.', warning: 'Não responder quando chamarem pelo nome. A distância aparente não corresponde à distância real.' },
    cartografo: { glyph: '⌖', code: 'E-03 / CONHECIMENTO', title: 'O Cartógrafo', classes: ['TOPOGRÁFICA', 'MEMÉTICA', 'NÃO LOCAL'], text: 'Agente ou entidade responsável por alterar mapas depois que são observados. Sua presença é indicada por linhas de costa desenhadas sobre pele, paredes e registros médicos.', warning: 'Destruir mapas alterados por fogo. Não tentar completar rotas interrompidas.' },
    unknown: { glyph: '⦻', code: 'E-██ / NÃO CLASSIFICADO', title: 'O Que Está Dentro', classes: ['████████', 'FAROL', 'ANTERIOR'], text: 'Não há descrição autorizada. Todos os observadores produziram o mesmo desenho e depois removeram os próprios olhos. O arquivo afirma que a entidade não está dentro da lâmpada. A lâmpada está dentro dela.', warning: 'CONSULTA REGISTRADA. NÃO RETORNE A ESTE ARQUIVO.' }
  };

  const mapPoints = {
    lighthouse: { code: 'L-01', title: 'Farol de São Firmo', coords: '42°12′ / 23°41′', type: 'Edificação estratégica', status: 'Sinal ativo', risk: 'CRÍTICO', text: 'Interrupção súbita do sinal registrada às 02:17 durante o Incidente do Farol de 1995. Uma explosão não detectada por sismógrafos precedeu o desaparecimento de três membros da equipe.', items: ['Corpo do faroleiro encontrado dias depois', 'Estado de choque avançado e encharcado', 'Arquivo de áudio original corrompido'], document: 'SF-LUZ-95' },
    radio: { code: 'R-02', title: 'Estação de Rádio', coords: '42°15′ / 23°42′', type: 'Edificação / comunicações', status: 'Intermitente', risk: 'ELEVADO', text: 'Estação analógica ligada ao canal 09. Relatórios do arquivo indicam interferências eletromagnéticas recorrentes desde pelo menos 1873.', items: ['Portadora 09.131 MHz', 'Respostas recebidas antes da emissão', 'Equipamento sem ligação elétrica'], document: 'TR-09-13' },
    forest: { code: 'B-03', title: 'Bosque da Névoa', coords: '42°14′ / 23°42′', type: 'Cobertura vegetal', status: 'Zona Beta', risk: 'ELEVADO', text: 'Área coberta por neblina persistente. A carta identifica condições geomagnéticas favoráveis e recorrência de fenômenos anômalos.', items: ['Comunicação perdida sob a copa', 'Trilhas secundárias mudam de posição', 'Efeitos psicológicos relatados'] },
    village: { code: 'V-04', title: 'Vila de São Firmo', coords: '42°16′ / 23°43′', type: 'Núcleo colonial', status: 'Sem resposta', risk: 'ELEVADO', text: 'Assentamento principal da ilha e área de importância estratégica durante o período colonial. Registros populacionais foram alterados ou removidos.', items: ['Residências abertas e mesas postas', 'Nenhum morador confirmado', 'Rotas convergem para o farol'], document: 'DEP-ALBA-02' },
    port: { code: 'P-05', title: 'Porto Velho', coords: '42°16′ / 23°44′', type: 'Atracadouro histórico', status: 'Abandonado', risk: 'MODERADO', text: 'Principal acesso marítimo de São Firmo. Duas embarcações desapareceram na maré seguinte à ruptura registrada em 17/07/1983.', items: ['Calado irregular junto ao cais', 'Barcos encontrados com motores mornos', 'Ligação direta com a Trilha dos Pescadores'], document: 'EVAC-95-A' },
    church: { code: 'I-06', title: 'Igreja Abandonada', coords: '42°14′ / 23°44′', type: 'Ruína religiosa', status: 'Não investigada', risk: 'ELEVADO', text: 'Edificação isolada no centro da malha de estradas. O mapa não registra denominação, data de construção ou cemitério associado.', items: ['Sino audível sem estrutura correspondente', 'Subsolo indicado em plantas removidas', 'Ponto equidistante entre vila, pântano e vigia'], document: 'SIL-00-9' },
    watchhouse: { code: 'C-07', title: 'Casa do Vigia', coords: '42°12′ / 23°44′', type: 'Edificação isolada', status: 'Observação desconhecida', risk: 'MODERADO', text: 'Posto de observação voltado para a Enseada do Vento Frio. Trilhas secundárias ligam a casa ao farol e às ruínas do forte.', items: ['Linha de visão direta para o farol', 'Anotações meteorológicas ausentes', 'Lâmpada visível todas as noites'] },
    cliffs: { code: 'PL-08', title: 'Penhascos do Leste', coords: '42°11′ / 23°43′', type: 'Formação costeira', status: 'Erosão ativa', risk: 'ELEVADO', text: 'Escarpas sobre a Enseada do Vento Frio. Curvas de nível sugerem quedas superiores às observadas no terreno.', items: ['Interferência de rádio constante', 'Rotas encerram na borda', 'Acesso restrito durante tempestades'] },
    fort: { code: 'F-09', title: 'Ruínas do Forte', coords: '42°10′ / 23°45′', type: 'Ruína militar', status: 'Parcialmente submersa', risk: 'ELEVADO', text: 'Complexo defensivo no Recife da Lâmina. A posição reforça a importância estratégica atribuída à ilha durante o período colonial.', items: ['Galerias voltadas para o interior da ilha', 'Marcas de explosão anteriores a 1995', 'Passagem costeira para as grutas'], document: 'SF-1995-00' },
    trail: { code: 'T-10', title: 'Trilha dos Pescadores', coords: '42°15′ / 23°45′', type: 'Trilha principal', status: 'Transitável', risk: 'MODERADO', text: 'Rota entre Porto Velho, a costa sul e o centro da ilha. O trecho final margeia a Cova dos Náufragos e o Canal da Membrana.', items: ['Pegadas terminam antes da praia', 'Distância varia com a maré', 'Evitar deslocamento após 02:13'] },
    swamp: { code: 'M-11', title: 'Pântano da Membrana', coords: '42°13′ / 23°45′', type: 'Zona úmida anômala', status: 'Ruptura ativa', risk: 'CRÍTICO', text: 'Em 17/07/1983 houve aumento súbito do nível do pântano, formação de bolhas e emissão de vapor. A causa permanece censurada.', items: ['Duas embarcações perdidas na maré seguinte', 'Atividade eletromagnética irregular', 'Distorções visuais e auditivas'], document: 'MEM-87-R' },
    caves: { code: 'G-12', title: 'Grutas de Maré Baixa', coords: '42°13′ / 23°45′', type: 'Sistema subterrâneo costeiro', status: 'Acesso por maré', risk: 'ELEVADO', text: 'Cavidades abertas apenas durante a maré baixa, junto ao Canal da Membrana. Podem conectar o pântano às fundações do farol.', items: ['Entrada submersa fora da janela de maré', 'Eco responde com voz humana', 'Profundidade não confirmada'] },
    alpha: { code: 'Z-Α', title: 'Zona Alfa — “A Membrana”', coords: '42°13′ / 23°45′', type: 'Zona de anomalia', status: 'Ativa', risk: 'CRÍTICO', text: 'Zona delimitada no pântano. Apresenta atividade eletromagnética irregular, distorções visuais e auditivas.', items: ['Evitar permanência prolongada', 'Não confiar em reflexos na água', 'Leitura de ruptura acima da escala'], document: 'MEM-87-R' },
    beta: { code: 'Z-Β', title: 'Zona Beta — “O Silêncio”', coords: '42°14′ / 23°42′', type: 'Zona de anomalia', status: 'Ativa', risk: 'ELEVADO', text: 'Zona associada ao Bosque da Névoa. Perda de comunicação foi registrada em todas as incursões documentadas.', items: ['Efeitos psicológicos relatados', 'Ausência total de fauna audível', 'Cautela e comunicação por cabo recomendadas'] }
  };

  const transmissions = {
    '09.131': { integrity: 41, message: '“...a neblina tem cheiro de ferro. Eles não estão mortos, eles estão esperando. O farol não ilumina para fora; ilumina para dentro. Câmbio? Tem alguém aí? ...tem alguém dentro da lâmpada.”' },
    '02.013': { integrity: 17, message: '[PULSO ÓPTICO CONVERTIDO EM ÁUDIO]\nN O R T E / N O R T E / N O R T E\n[uma criança conta treze degraus; a contagem não termina]' },
    '19.950': { integrity: 8, message: '“Evacuação cance— [ruído] —ordem ainda não foi emiti— [sino] —não deixem o barco voltar.”' },
    '43.172': { integrity: 0, message: 'ESTAÇÃO SV-04, NÓS RECEBEMOS SUA CONSULTA. NÃO EXISTE DISTÂNCIA ENTRE A TELA E O FAROL.' }
  };

  const beamModes = {
    visual: { channel: 'CANAL L-01', rows: ['02:13:00 — Lâmpada energizada sem fonte elétrica.', '02:13:13 — Feixe completa rotação para dentro da estrutura.', '02:14:02 — Operador esquece o próprio nome durante 17 segundos.', '02:██:██ — ████████████████████'] },
    radio: { channel: 'CANAL R-09', rows: ['02:13:00 — Portadora detectada em 09.131 MHz.', '02:13:09 — Três vozes ocupam a mesma frequência.', '02:13:31 — Resposta recebida antes da pergunta.', '03:07:00 — Sinal cessa; sino permanece.'] },
    cognitive: { channel: 'CANAL C-13', rows: ['OBSERVADOR 01 — esqueceu endereço.', 'OBSERVADOR 02 — reconheceu pessoa inexistente.', 'OBSERVADOR 03 — desenhou a costa sobre a mesa.', 'OBSERVADOR 04 — [REMOVIDO DA EQUIPE].'] },
    null: { channel: 'CANAL Ø-00', rows: ['NÃO HÁ REGISTRO NESTE CANAL.', 'NÃO HÁ REGISTRO NESTE CANAL.', 'VOCÊ NÃO DEVERIA ESTAR LENDO ISTO.', 'OLHE PARA TRÁS.'] }
  };

  const secretRoutes = {
    l: { route: 'log.html', code: 'LTR-12' },
    q: { route: 'quiz.html', code: 'QST-09' },
    o: { route: 'ordo_log.html', code: 'ORD-00' },
    c: { route: 'alicia.html', code: 'CST-04' },
    v: { route: 'Vidraceiros.html', code: 'VDR-06' },
    b: { route: 'belladonna.html', code: 'BLD-02' },
    s: { route: 'ShadowCompany.html', code: 'SHD-19' }
  };

  let audioContext = null;

  function setTimer(callback, delay) {
    const id = window.setTimeout(() => {
      state.timers.delete(id);
      callback();
    }, delay);
    state.timers.add(id);
    return id;
  }

  function setTrackedInterval(callback, delay) {
    const id = window.setInterval(callback, delay);
    state.intervals.add(id);
    return id;
  }

  function wait(delay) {
    return new Promise((resolve) => setTimer(resolve, state.reducedMotion ? Math.min(delay, 12) : delay));
  }

  function normalize(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .replace(/\s+/g, '')
      .toUpperCase();
  }

  function searchNormalize(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  function saveProgress() {
    storage.set('sv-unlocks', JSON.stringify([...state.unlocks]));
    storage.set('sv-opened-documents', JSON.stringify(state.openedDocuments.slice(-12)));
  }

  function playTone(type = 'key') {
    if (!state.soundEnabled) return;
    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      if (audioContext.state === 'suspended') audioContext.resume();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const now = audioContext.currentTime;
      const presets = {
        key: [420, .018, .025], success: [660, .06, .07], error: [105, .08, .08], open: [280, .04, .05], alert: [155, .12, .09], radio: [75, .18, .07]
      };
      const [frequency, duration, volume] = presets[type] || presets.key;
      oscillator.type = type === 'radio' ? 'sawtooth' : 'square';
      oscillator.frequency.setValueAtTime(frequency, now);
      if (type === 'success') oscillator.frequency.exponentialRampToValueAtTime(990, now + duration);
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(.0001, now + duration);
      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start(now);
      oscillator.stop(now + duration + .01);
    } catch (_) { state.soundEnabled = false; updateSoundButton(); }
  }

  function updateSoundButton() {
    const button = $('#sound-toggle');
    if (!button) return;
    button.setAttribute('aria-pressed', String(state.soundEnabled));
    button.setAttribute('title', state.soundEnabled ? 'Desativar som' : 'Ativar som');
    const label = $('b', button);
    if (label) label.textContent = state.soundEnabled ? 'SOM ON' : 'SOM OFF';
  }

  function setSystemMessage(message, type = 'normal') {
    if (!elements.systemMessage) return;
    elements.systemMessage.textContent = message;
    elements.systemMessageWrap?.classList.toggle('alert', type === 'critical');
  }

  function notify(message, type = 'normal', duration = 4300) {
    if (!elements.notificationStack) return;
    const item = document.createElement('div');
    item.className = `notification ${type}`.trim();
    item.textContent = message;
    elements.notificationStack.appendChild(item);
    setTimer(() => item.remove(), duration);
  }

  async function typeInto(element, text, speed = 22) {
    if (!element) return;
    if (state.reducedMotion) { element.textContent = text; return; }
    element.textContent = '';
    for (let index = 0; index < text.length; index += 1) {
      element.textContent += text[index];
      if (index % 3 === 0) playTone('key');
      await wait(/[.,:]/.test(text[index]) ? speed * 3 : speed);
    }
  }

  async function runBoot() {
    if (!elements.bootOutput || !elements.authForm) return;
    elements.bootOutput.textContent = '';
    for (let index = 0; index < bootLines.length; index += 1) {
      const line = document.createElement('p');
      if (index < 4) line.className = 'ok';
      if (index === 5) line.className = 'warn';
      elements.bootOutput.appendChild(line);
      await typeInto(line, bootLines[index], 14);
      await wait(95);
    }
    elements.authForm.hidden = false;
    await wait(60);
    elements.authInput?.focus();
  }

  function showAuthorizedShell(resumed = false) {
    state.authorized = true;
    elements.body.classList.remove('session-locked');
    elements.bootGate.hidden = true;
    elements.shell.hidden = false;
    elements.shell.inert = false;
    elements.shell.classList.toggle('entering', !resumed && !state.reducedMotion);
    const hashView = window.location.hash.replace('#', '');
    activateView($(`[data-view="${hashView}"]`) ? hashView : 'overview', false, false);
    elements.workspace?.focus({ preventScroll: true });
    setSystemMessage(resumed ? 'SESSÃO RESTAURADA // DIRETÓRIO SR-07 ABERTO' : 'ACESSO GRAU V CONCEDIDO // OPERAÇÃO SETENTRIONAL');
    resetIdleSecret();
  }

  async function authorize() {
    elements.authForm.hidden = true;
    elements.accessSequence.hidden = false;
    const progressbar = $('.access-bar', elements.accessSequence);
    const stages = [
      [9, 'VALIDANDO ASSINATURA...'], [31, 'DESCRIPTOGRAFANDO ÍNDICE...'], [57, 'VERIFICANDO NÍVEL DE ACESSO...'], [78, 'ABRINDO DIRETÓRIO SR-07...'], [100, 'ACESSO CONCEDIDO']
    ];
    let current = 0;
    for (const [target, message] of stages) {
      elements.accessMessage.textContent = message;
      while (current < target) {
        current += state.reducedMotion ? target : Math.max(1, Math.ceil(Math.random() * 4));
        current = Math.min(current, target);
        elements.accessBarFill.style.width = `${current}%`;
        progressbar?.setAttribute('aria-valuenow', String(current));
        elements.accessDetail.textContent = `${String(current).padStart(3, '0')}% // ${message}`;
        await wait(38);
      }
      playTone(target === 100 ? 'success' : 'key');
      await wait(150);
    }
    elements.accessSequence.classList.add('granted');
    storage.set('sv-setentrional-authorized', 'true');
    await wait(600);
    showAuthorizedShell(false);
  }

  function updateLockCountdown() {
    const remaining = Math.max(0, Math.ceil((state.lockedUntil - Date.now()) / 1000));
    if (remaining <= 0) {
      state.lockedUntil = 0;
      elements.authForm.classList.remove('is-locked');
      elements.authInput.disabled = false;
      $('button[type="submit"]', elements.authForm).disabled = false;
      elements.authFeedback.textContent = 'BLOQUEIO ENCERRADO. NOVA CONSULTA AUTORIZADA.';
      elements.authFeedback.className = 'auth-feedback hint';
      elements.authInput.focus();
      return;
    }
    elements.authFeedback.textContent = `DIRETÓRIO TEMPORARIAMENTE BLOQUEADO // ${remaining}s`;
    setTimer(updateLockCountdown, 1000);
  }

  function handleInvalidAuth() {
    state.attempts += 1;
    elements.attemptCounter.textContent = `TENTATIVAS REGISTRADAS: ${String(state.attempts).padStart(2, '0')}`;
    let message = authErrors[(state.attempts - 1) % authErrors.length];
    let className = 'auth-feedback error';
    if (state.attempts === 2) { message += ' PISTA: A CONSULTA DESIGNA UMA DIREÇÃO.'; className = 'auth-feedback hint'; }
    if (state.attempts === 3) { message += ' PISTA: PROCURE O NORTE.'; className = 'auth-feedback hint'; }
    elements.authFeedback.textContent = message;
    elements.authFeedback.className = className;
    playTone('error');
    elements.authInput.select();

    if (state.attempts % 4 === 0) {
      state.lockedUntil = Date.now() + 10000;
      elements.authForm.classList.add('is-locked');
      elements.authInput.disabled = true;
      $('button[type="submit"]', elements.authForm).disabled = true;
      updateLockCountdown();
    }
  }

  function handleAuthSubmit(event) {
    event.preventDefault();
    if (state.lockedUntil > Date.now()) return;
    if (normalize(elements.authInput.value) !== 'SETENTRIONAL') { handleInvalidAuth(); return; }
    elements.authFeedback.textContent = 'IDENTIFICADOR LOCALIZADO // ASSINATURA COMPATÍVEL.';
    elements.authFeedback.className = 'auth-feedback';
    playTone('success');
    authorize();
  }

  function closeMobileDirectory() {
    state.mobileOpen = false;
    elements.directory?.classList.remove('open');
    elements.mobileMenu?.setAttribute('aria-expanded', 'false');
    elements.mobileScrim.hidden = true;
  }

  function toggleMobileDirectory() {
    state.mobileOpen = !state.mobileOpen;
    elements.directory?.classList.toggle('open', state.mobileOpen);
    elements.mobileMenu?.setAttribute('aria-expanded', String(state.mobileOpen));
    elements.mobileScrim.hidden = !state.mobileOpen;
  }

  function activateView(name, updateHash = true, focus = true) {
    const target = $(`[data-view="${name}"]`);
    if (!target) return false;
    state.currentView = name;
    $$('.system-view').forEach((view) => {
      const active = view === target;
      view.hidden = !active;
      view.classList.toggle('active', active);
    });
    $$('[data-view-target]').forEach((button) => {
      const active = button.dataset.viewTarget === name;
      button.classList.toggle('active', active);
      if (active) button.setAttribute('aria-current', 'page'); else button.removeAttribute('aria-current');
    });
    if (updateHash) history.replaceState(null, '', `#${name}`);
    elements.workspace.scrollTo({ top: 0, behavior: state.reducedMotion ? 'auto' : 'smooth' });
    if (focus) elements.workspace.focus({ preventScroll: true });
    closeMobileDirectory();
    setSystemMessage(`DIRETÓRIO ${name.toUpperCase()} CARREGADO // SESSÃO MONITORADA`);
    playTone('open');
    resetIdleSecret();
    if (name === 'map') setTimer(prepareMapViewport, 30);
    return true;
  }

  function renderDocuments() {
    const list = $('#document-list');
    if (!list) return;
    const query = searchNormalize($('#document-search')?.value || '');
    const visibleDocs = documents.filter((doc) => searchNormalize(`${doc.code} ${doc.title} ${doc.tags} ${doc.state}`).includes(query));
    list.innerHTML = '';
    visibleDocs.forEach((doc) => {
      const locked = doc.locked && !state.unlocks.has(doc.unlock);
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `document-row${locked ? ' is-locked' : ''}`;
      button.dataset.documentCode = doc.code;
      button.setAttribute('aria-label', `${doc.title}, ${locked ? 'bloqueado' : 'abrir documento'}`);
      button.innerHTML = `<span>${doc.code}</span><span class="file-name"><strong>${doc.title}</strong><small>${locked ? 'CHAVE DE INTEGRIDADE NECESSÁRIA' : doc.tags.split(' ').slice(0, 4).join(' / ')}</small></span><span>${doc.date}</span><span class="integrity">${locked ? '--' : `${doc.integrity}%`}</span><span class="file-state ${doc.state === 'CRÍTICO' ? 'critical' : ''}">${locked ? 'BLOQUEADO' : doc.state}</span>`;
      list.appendChild(button);
    });
    $('#visible-document-count').textContent = String(visibleDocs.length);
    $('#file-count-nav').textContent = String(documents.length);
    $('#empty-document-result').hidden = visibleDocs.length !== 0;
  }

  function checkDocumentSequence(code) {
    state.openedDocuments.push(code);
    state.openedDocuments = state.openedDocuments.slice(-12);
    const recent = state.openedDocuments.slice(-3).join('|');
    if (recent === 'SF-1995-00|TR-09-13|CARTA-95' && !state.unlocks.has('destroyed')) {
      state.unlocks.add('destroyed');
      notify('SETOR 13 RECONSTRUÍDO // REGISTRO PARCIALMENTE DESTRUÍDO LIBERADO', 'warn', 6500);
      playTone('success');
      renderDocuments();
    }
    saveProgress();
  }

  function openDocument(code) {
    const doc = documents.find((item) => item.code === code);
    if (!doc) { notify('DOCUMENTO NÃO LOCALIZADO.', 'critical'); return; }
    if (doc.locked && !state.unlocks.has(doc.unlock)) {
      notify('ACESSO NEGADO // CHAVE NARRATIVA AUSENTE', 'critical');
      playTone('error');
      return;
    }
    state.lastFocus = document.activeElement;
    elements.documentCode.textContent = doc.code;
    elements.documentTitle.textContent = doc.title.toUpperCase();
    elements.documentMeta.innerHTML = `<span>DATA: ${doc.date}</span><span>ESTADO: ${doc.state}</span><span>CLASSIFICAÇÃO: RESTRITA</span><span>ACESSO: GRAU V</span>`;
    elements.documentContent.innerHTML = doc.body;
    $$('.document-content > *', elements.documentModal).forEach((node, index) => {
      node.classList.add('typed-line');
      node.style.animationDelay = state.reducedMotion ? '0ms' : `${index * 45}ms`;
    });
    elements.documentIntegrity.textContent = `INTEGRIDADE ${String(doc.integrity).padStart(2, '0')}%`;
    if (typeof elements.documentModal.showModal === 'function') elements.documentModal.showModal();
    else elements.documentModal.setAttribute('open', '');
    elements.closeDocument.focus();
    checkDocumentSequence(code);
    playTone('open');
  }

  function closeDocument() {
    if (elements.documentModal.open && typeof elements.documentModal.close === 'function') elements.documentModal.close();
    else elements.documentModal.removeAttribute('open');
    if (state.lastFocus instanceof HTMLElement) state.lastFocus.focus();
  }

  function renderTimeline() {
    const list = $('#timeline-list');
    if (!list) return;
    list.innerHTML = timeline.map((event, index) => `<li class="${event.conflict ? 'conflict' : ''}"><button type="button" data-timeline-index="${index}"><time>${event.date}</time><strong>${event.title}</strong></button></li>`).join('');
  }

  function showTimelineDetail(index) {
    const event = timeline[index];
    if (!event) return;
    $$('[data-timeline-index]').forEach((button) => button.classList.toggle('active', Number(button.dataset.timelineIndex) === index));
    const detail = $('#timeline-detail');
    detail.innerHTML = `<p class="terminal-kicker">MARCO HISTÓRICO // ${String(index + 1).padStart(2, '0')}</p><h3>${event.title}</h3><p>${event.detail}</p>${event.conflict ? '<div class="date-conflict">ATENÇÃO: FONTES PRIMÁRIAS APRESENTAM DATAS INCOMPATÍVEIS.</div>' : ''}${event.document ? `<button class="key-button" type="button" data-open-document="${event.document}">ABRIR DOCUMENTO ASSOCIADO</button>` : ''}`;
    playTone('key');
  }

  function renderPeople() {
    const index = $('#people-index');
    if (!index) return;
    index.innerHTML = people.map((person) => `<button class="person-tab" type="button" data-person="${person.id}"><span>${person.code}</span><strong>${person.name}</strong><small>${person.status}</small></button>`).join('');
  }

  function showPerson(id) {
    const person = people.find((item) => item.id === id);
    if (!person) return;
    $$('.person-tab').forEach((button) => button.classList.toggle('active', button.dataset.person === id));
    $('#person-detail').innerHTML = `<div class="person-grid"><div class="biometric-placeholder" aria-hidden="true"><span>${person.symbol}</span></div><div><p class="terminal-kicker">${person.code} // ${person.status}</p><h3>${person.name}</h3><p>${person.role}</p><dl>${Object.entries(person.data).map(([key, value]) => `<div><dt>${key}</dt><dd>${value}</dd></div>`).join('')}</dl><blockquote>${person.note}</blockquote></div></div>`;
    playTone('key');
  }

  function showEntity(id) {
    const entity = entities[id];
    if (!entity) return;
    $$('[data-entity]').forEach((button) => {
      const active = button.dataset.entity === id;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
    const record = $('#entity-record');
    record.dataset.glyph = entity.glyph;
    record.innerHTML = `<p class="terminal-kicker">${entity.code}</p><h3>${entity.title}</h3><div class="entity-class">${entity.classes.map((item) => `<span>${item}</span>`).join('')}</div><p>${entity.text}</p><div class="entity-warning">${entity.warning}</div>`;
    if (id === 'unknown') { flashEntity(95); playTone('alert'); }
  }

  function showMapPoint(id) {
    const point = mapPoints[id];
    if (!point) return;
    state.selectedMapPoint = id;
    $$('[data-map-point]').forEach((button) => button.classList.toggle('active', button.dataset.mapPoint === id));
    $('#coordinate-code').textContent = point.coords;
    $('#map-intelligence').innerHTML = `
      <p class="map-code">PONTO ${point.code} // ARQUIVO SF-077-A</p>
      <h3>${point.title}</h3>
      <p>${point.text}</p>
      <div class="map-data">
        <div><span>COORDENADA</span><strong>${point.coords}</strong></div>
        <div><span>CLASSIFICAÇÃO</span><strong>${point.type}</strong></div>
        <div><span>ESTADO</span><strong>${point.status}</strong></div>
      </div>
      <div class="map-risk ${point.risk === 'CRÍTICO' ? 'critical' : ''}">RISCO OPERACIONAL: ${point.risk}</div>
      <ul>${point.items.map((item) => `<li>${item}</li>`).join('')}</ul>
      ${point.document ? `<button class="key-button" type="button" data-open-document="${point.document}">ABRIR REGISTRO ASSOCIADO</button>` : ''}`;
    playTone('key');
  }

  function defaultMapZoom() {
    return window.matchMedia('(max-width: 900px)').matches ? 2.1 : 1;
  }

  function applyMapZoom(center = false) {
    const layer = $('#map-layer');
    const viewport = $('#map-viewport');
    if (!layer || !viewport) return;
    layer.style.width = `${Math.round(state.mapZoom * 100)}%`;
    $('#map-zoom-readout').textContent = `${Math.round(state.mapZoom * 100)}%`;
    $('#map-zoom-out').disabled = state.mapZoom <= 1;
    $('#map-zoom-in').disabled = state.mapZoom >= 3;
    if (center) {
      setTimer(() => {
        viewport.scrollLeft = Math.max(0, (viewport.scrollWidth - viewport.clientWidth) / 2);
        viewport.scrollTop = Math.max(0, (viewport.scrollHeight - viewport.clientHeight) / 2);
      }, 20);
    }
  }

  function changeMapZoom(delta) {
    state.mapZoom = Math.min(3, Math.max(1, Math.round((state.mapZoom + delta) * 100) / 100));
    applyMapZoom(false);
    setSystemMessage(`CARTOGRAFIA SF-077-A // AMPLIAÇÃO ${Math.round(state.mapZoom * 100)}%`);
    playTone('key');
  }

  function resetMapViewport() {
    state.mapZoom = defaultMapZoom();
    applyMapZoom(true);
    showMapPoint('lighthouse');
  }

  function prepareMapViewport() {
    const viewport = $('#map-viewport');
    if (!viewport || viewport.clientWidth === 0) return;
    const mobile = window.matchMedia('(max-width: 900px)').matches;
    if (!viewport.dataset.prepared || state.mapWasMobile !== mobile) {
      state.mapZoom = defaultMapZoom();
      state.mapWasMobile = mobile;
      viewport.dataset.prepared = 'true';
    }
    applyMapZoom(!viewport.dataset.centered);
    viewport.dataset.centered = 'true';
  }

  function handleMapPointerDown(event) {
    if (event.pointerType === 'touch' || event.target.closest('button')) return;
    const viewport = $('#map-viewport');
    state.mapDrag = { id: event.pointerId, x: event.clientX, y: event.clientY, left: viewport.scrollLeft, top: viewport.scrollTop };
    viewport.classList.add('is-dragging');
    viewport.setPointerCapture?.(event.pointerId);
  }

  function handleMapPointerMove(event) {
    if (!state.mapDrag || state.mapDrag.id !== event.pointerId) return;
    const viewport = $('#map-viewport');
    viewport.scrollLeft = state.mapDrag.left - (event.clientX - state.mapDrag.x);
    viewport.scrollTop = state.mapDrag.top - (event.clientY - state.mapDrag.y);
  }

  function finishMapDrag(event) {
    if (!state.mapDrag || state.mapDrag.id !== event.pointerId) return;
    $('#map-viewport')?.classList.remove('is-dragging');
    state.mapDrag = null;
  }

  function handleMapKeyboard(event) {
    const viewport = $('#map-viewport');
    if (!viewport) return;
    const movement = 75;
    const actions = {
      ArrowLeft: () => viewport.scrollBy({ left: -movement, behavior: state.reducedMotion ? 'auto' : 'smooth' }),
      ArrowRight: () => viewport.scrollBy({ left: movement, behavior: state.reducedMotion ? 'auto' : 'smooth' }),
      ArrowUp: () => viewport.scrollBy({ top: -movement, behavior: state.reducedMotion ? 'auto' : 'smooth' }),
      ArrowDown: () => viewport.scrollBy({ top: movement, behavior: state.reducedMotion ? 'auto' : 'smooth' }),
      '+': () => changeMapZoom(.25),
      '=': () => changeMapZoom(.25),
      '-': () => changeMapZoom(-.25)
    };
    if (!actions[event.key]) return;
    event.preventDefault();
    actions[event.key]();
  }

  function showBeamMode(mode) {
    const data = beamModes[mode];
    if (!data) return;
    $$('[data-beam]').forEach((button) => button.classList.toggle('active', button.dataset.beam === mode));
    $('#beam-channel').textContent = data.channel;
    $('#beam-reading').innerHTML = data.rows.map((row) => `<p><time>${row.slice(0, 8)}</time>${row.slice(8)}</p>`).join('');
    if (mode === 'null') { notify('CANAL SEM REGISTRO ABERTO. A CONSULTA FOI NOTADA.', 'critical'); flashEntity(75); }
    playTone(mode === 'null' ? 'error' : 'key');
  }

  function buildWaveform() {
    const waveform = $('#radio-waveform');
    if (!waveform || waveform.childElementCount) return;
    for (let index = 0; index < 72; index += 1) {
      const bar = document.createElement('i');
      bar.style.setProperty('--h', `${10 + ((index * 37) % 82)}%`);
      bar.style.setProperty('--d', `${-(index % 11) * .07}s`);
      waveform.appendChild(bar);
    }
  }

  async function decodeTransmission() {
    if (state.radioTyping) return;
    const record = transmissions[state.selectedFrequency];
    if (!record) return;
    state.radioTyping = true;
    const button = $('#decode-transmission');
    const output = $('#transcript-output');
    const waveform = $('#radio-waveform');
    button.disabled = true;
    button.textContent = 'DECODIFICANDO...';
    waveform.classList.add('is-playing');
    $('#transmission-integrity').textContent = `INTEGRIDADE ${String(record.integrity).padStart(2, '0')}%`;
    playTone('radio');
    await typeInto(output, record.message, 18);
    button.disabled = false;
    button.textContent = 'REPETIR DECODIFICAÇÃO';
    waveform.classList.remove('is-playing');
    state.radioTyping = false;
    setSystemMessage(`TRANSMISSÃO ${state.selectedFrequency} DECODIFICADA // ${record.integrity}% ÍNTEGRA`);
    if (state.selectedFrequency === '43.172') { flashEntity(110); notify('A TRANSMISSÃO RESPONDEU À ESTAÇÃO SV-04.', 'critical', 6000); }
  }

  function selectFrequency(frequency) {
    if (!transmissions[frequency]) return;
    state.selectedFrequency = frequency;
    $$('[data-frequency]').forEach((button) => button.classList.toggle('active', button.dataset.frequency === frequency));
    $('#radio-frequency').textContent = frequency;
    $('#transmission-integrity').textContent = 'INTEGRIDADE 00%';
    $('#transcript-output').textContent = '[CANAL PRONTO. AGUARDANDO DECODIFICAÇÃO.]';
    $('#decode-transmission').textContent = 'DECODIFICAR SINAL';
    playTone('key');
  }

  function scanFrequencies() {
    state.radioScans += 1;
    playTone('radio');
    setSystemMessage(`VARREDURA ${state.radioScans}/3 // ANALISANDO PORTADORAS RESIDUAIS`);
    if (state.radioScans >= 3) {
      $('.hidden-signal')?.classList.add('discovered');
      notify('FREQUÊNCIA 43.172 LOCALIZADA // ORIGEM: ESTAÇÃO SV-04', 'warn', 6000);
    } else notify(`VARREDURA CONCLUÍDA // ${3 - state.radioScans} CAMADA(S) DE INTERFERÊNCIA RESTANTE(S)`);
  }

  function renderHexDump() {
    const dump = $('#hex-dump');
    if (!dump) return;
    const anomalies = new Set([7, 13, 26, 43, 71]);
    for (let index = 0; index < 96; index += 1) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `hex-byte${anomalies.has(index) ? ' anomaly' : ''}`;
      button.dataset.hexIndex = String(index);
      button.dataset.anomaly = String(anomalies.has(index));
      button.textContent = ((index * 73 + 19) % 256).toString(16).toUpperCase().padStart(2, '0');
      button.setAttribute('aria-label', `Setor hexadecimal ${index}, valor ${button.textContent}`);
      dump.appendChild(button);
    }
  }

  function recoverHex() {
    const selected = $$('.hex-byte.selected');
    const anomalies = selected.filter((item) => item.dataset.anomaly === 'true').length;
    const message = $('#recovered-message');
    if (anomalies >= 3) {
      message.textContent = 'NORTE / É / ABISMO';
      state.unlocks.add('destroyed');
      saveProgress();
      renderDocuments();
      notify('ASSINATURA MAGNÉTICA ACEITA // SETOR 13 LIBERADO', 'warn');
      playTone('success');
    } else {
      message.textContent = 'FALHA / PADRÃO / INCOMPLETO';
      notify('RECONSTRUÇÃO FALHOU. SELECIONE OS BYTES QUE NÃO PERTENCEM AO PADRÃO.', 'critical');
      playTone('error');
    }
  }

  function updateProtocols() {
    const boxes = $$('#protocol-ledger input[type="checkbox"]');
    state.protocolCount = boxes.filter((box) => box.checked).length;
    $('#protocol-progress').textContent = `${String(state.protocolCount).padStart(2, '0')} / ${String(boxes.length).padStart(2, '0')} PROTOCOLOS LIDOS`;
    $('#confirm-protocols').disabled = state.protocolCount !== boxes.length;
  }

  function confirmProtocols() {
    storage.set('sv-protocols-confirmed', 'true');
    notify('CIÊNCIA REGISTRADA // CREDENCIAL DE DESEMBARQUE EMITIDA', 'normal', 6000);
    setSystemMessage('PROTOCOLOS CONFIRMADOS // AGENTE AUTORIZADO PARA DESEMBARQUE');
    playTone('success');
  }

  function unlockNullDocument() {
    if (state.unlocks.has('null')) return;
    state.unlocks.add('null');
    saveProgress();
    renderDocuments();
    notify('ARQUIVO SV-NULL-04 MATERIALIZADO NO ÍNDICE.', 'critical', 6500);
    flashEntity(90);
  }

  function flashEntity(duration = 85) {
    if (!elements.entityFlash || state.reducedMotion) return;
    elements.entityFlash.hidden = false;
    setTimer(() => { elements.entityFlash.hidden = true; }, duration);
  }

  function handleMarkClick() {
    activateView('overview');
    state.markClicks += 1;
    window.clearTimeout(state.markClickTimer);
    state.markClickTimer = setTimer(() => { state.markClicks = 0; }, 2800);
    if (state.markClicks >= 5) {
      state.markClicks = 0;
      unlockNullDocument();
    }
  }

  function handleMembraneClick() {
    state.membraneClicks += 1;
    if (state.membraneClicks < 4) {
      notify(`LEITURA MANUAL ${state.membraneClicks}/4 // O SENSOR PARECE RESPONDER AO TOQUE`, 'warn');
      return;
    }
    state.membraneClicks = 0;
    $('#membrane-monitor').classList.add('breach');
    $('#membrane-value').textContent = '99.9';
    setTimer(() => { $('#membrane-monitor').classList.remove('breach'); $('#membrane-value').textContent = '87.3'; }, 2400);
    notify('RUPTURA LOCAL DETECTADA ATRÁS DO MONITOR.', 'critical', 6000);
    flashEntity(120);
    playTone('alert');
  }

  function handleRedaction(button) {
    if (button.classList.contains('revealed')) return;
    button.classList.add('revealed');
    state.redactionsOpened += 1;
    const replacements = ['mais espaço dentro do que fora', 'O FAROL LEMBRA DE VOCÊ', 'sete portas voltadas para o norte'];
    button.textContent = replacements[(state.redactionsOpened - 1) % replacements.length];
    notify('CAMADA DE CENSURA REMOVIDA // ACESSO REGISTRADO', 'warn');
    playTone('open');
    if (state.redactionsOpened >= 3) unlockNullDocument();
  }

  function resetIdleSecret() {
    window.clearTimeout(state.idleTimer);
    if (!state.authorized) return;
    state.idleTimer = setTimer(() => {
      notify(`ATIVIDADE DETECTADA NO MÓDULO ${state.currentView.toUpperCase()} // COORDENADA 43.172`, 'warn', 7000);
      $('#footer-packet').textContent = 'PKT 43172';
      flashEntity(70);
    }, 35000);
  }

  function redirectToSecret(key) {
    const secret = secretRoutes[key];
    if (!secret || state.redirecting) return;
    state.redirecting = true;
    elements.redirectCode.textContent = `SV://${secret.code}`;
    elements.redirectOverlay.hidden = false;
    playTone('success');
    setTimer(() => { window.location.href = secret.route; }, state.reducedMotion ? 80 : 720);
  }

  function isTypingTarget(target) {
    if (!(target instanceof Element)) return false;
    return ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(target.tagName) || target.isContentEditable || Boolean(target.closest('[contenteditable="true"]'));
  }

  function handleGlobalShortcut(event) {
    if (!state.authorized || state.redirecting || event.defaultPrevented || event.isComposing) return;
    if (event.ctrlKey || event.altKey || event.metaKey) return;
    if (isTypingTarget(event.target) || elements.documentModal?.open) return;
    const key = event.key.toLowerCase();
    if (!secretRoutes[key]) return;
    event.preventDefault();
    redirectToSecret(key);
  }

  function executeCommand(rawValue) {
    const command = searchNormalize(rawValue).trim();
    if (!command) return;
    const commands = {
      help: () => setSystemMessage('COMANDOS: help, status, setentrional, sanctum, arquivos, membrana, farol, sao-firmo, diretorio, clear, logout'),
      ajuda: () => commands.help(),
      status: () => { activateView('overview'); notify('OPERAÇÃO ATIVA // MEMBRANA 87.3% // CANAL 09 RECEBENDO'); },
      setentrional: () => { activateView('overview'); notify('O NORTE VERDADEIRO APONTA PARA O ABISMO.', 'warn'); },
      sanctum: () => activateView('about'),
      arquivos: () => activateView('files'),
      membrana: () => { activateView('overview'); setSystemMessage('MEMBRANA: 87.3% // SANGUE + CONHECIMENTO // RUPTURA'); },
      farol: () => activateView('lighthouse'),
      'sao-firmo': () => activateView('map'),
      'são-firmo': () => activateView('map'),
      diretorio: () => { activateView('restricted'); notify('SETE INICIAIS DORMEM NO DIRETÓRIO.', 'warn'); },
      clear: () => setSystemMessage('TERMINAL PRONTO // AGUARDANDO COMANDO'),
      limpar: () => setSystemMessage('TERMINAL PRONTO // AGUARDANDO COMANDO'),
      logout: () => logout(),
      sair: () => logout(),
      norte: () => { notify('NORTE NÃO É UMA DIREÇÃO. É UMA PERMISSÃO.', 'critical'); flashEntity(80); },
      abismo: () => { state.unlocks.add('destroyed'); saveProgress(); renderDocuments(); notify('SETOR 13 LIBERADO.', 'warn'); },
      luz: () => { activateView('transmissions'); selectFrequency('02.013'); }
    };
    if (commands[command]) { commands[command](); playTone('key'); return; }
    if (secretRoutes[command]) { redirectToSecret(command); return; }
    setSystemMessage(`COMANDO NÃO RECONHECIDO: ${command.toUpperCase()} // DIGITE HELP`, 'critical');
    playTone('error');
  }

  function logout() {
    storage.remove('sv-setentrional-authorized');
    state.authorized = false;
    elements.shell.classList.add('entering');
    setSystemMessage('ENCERRANDO SESSÃO // LIMPANDO CHAVES TEMPORÁRIAS');
    setTimer(() => window.location.reload(), state.reducedMotion ? 50 : 550);
  }

  function updateClock() {
    const now = new Date();
    $('#system-clock').textContent = now.toLocaleTimeString('pt-BR', { hour12: false });
    $('#system-date').textContent = now.toLocaleDateString('pt-BR').replaceAll('/', '.');
  }

  function updateLiveLog() {
    const log = $('#live-log-text');
    if (!log) return;
    const lines = [
      '[02:13:07] Sinal luminoso detectado além do horizonte.',
      '[02:13:20] Pacote de rádio recebido antes da emissão.',
      '[02:14:01] Documento civil alterado no índice.',
      '[02:14:13] O sistema contou um usuário adicional.',
      '[02:15:08] Bússola da estação aponta para o monitor.'
    ];
    const index = Number(log.dataset.index || 0);
    log.textContent = lines[index % lines.length];
    log.dataset.index = String(index + 1);
  }

  function handleDelegatedClick(event) {
    const viewButton = event.target.closest('[data-view-target]');
    if (viewButton) { activateView(viewButton.dataset.viewTarget); return; }
    const documentButton = event.target.closest('[data-document-code], [data-open-document]');
    if (documentButton) { openDocument(documentButton.dataset.documentCode || documentButton.dataset.openDocument); return; }
    const timelineButton = event.target.closest('[data-timeline-index]');
    if (timelineButton) { showTimelineDetail(Number(timelineButton.dataset.timelineIndex)); return; }
    const personButton = event.target.closest('[data-person]');
    if (personButton) { showPerson(personButton.dataset.person); return; }
    const entityButton = event.target.closest('[data-entity]');
    if (entityButton) { showEntity(entityButton.dataset.entity); return; }
    const mapButton = event.target.closest('[data-map-point]');
    if (mapButton) { showMapPoint(mapButton.dataset.mapPoint); return; }
    const beamButton = event.target.closest('[data-beam]');
    if (beamButton) { showBeamMode(beamButton.dataset.beam); return; }
    const frequencyButton = event.target.closest('[data-frequency]');
    if (frequencyButton) { selectFrequency(frequencyButton.dataset.frequency); return; }
    const redaction = event.target.closest('.redaction');
    if (redaction) { handleRedaction(redaction); }
  }

  function bindEvents() {
    elements.authForm?.addEventListener('submit', handleAuthSubmit);
    elements.authInput?.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' || event.ctrlKey || event.altKey || event.metaKey || event.isComposing) return;
      event.preventDefault();
      elements.authForm.requestSubmit();
    });
    elements.nav?.addEventListener('click', handleDelegatedClick);
    elements.workspace?.addEventListener('click', handleDelegatedClick);
    elements.mobileMenu?.addEventListener('click', toggleMobileDirectory);
    elements.mobileScrim?.addEventListener('click', closeMobileDirectory);
    $('#sanctum-mark')?.addEventListener('click', handleMarkClick);
    $('#membrane-monitor')?.addEventListener('click', handleMembraneClick);
    $('#sound-toggle')?.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      updateSoundButton();
      if (state.soundEnabled) playTone('success');
      notify(state.soundEnabled ? 'ÁUDIO DE INTERFACE ATIVADO.' : 'ÁUDIO DE INTERFACE DESATIVADO.');
    });
    $('#motion-toggle')?.addEventListener('click', () => {
      state.reducedMotion = !state.reducedMotion;
      elements.body.classList.toggle('reduce-motion', state.reducedMotion);
      $('#motion-toggle').setAttribute('aria-pressed', String(state.reducedMotion));
      $('b', $('#motion-toggle')).textContent = state.reducedMotion ? 'REDUZIDO' : 'EFEITOS';
      preference.set('sv-reduce-motion', String(state.reducedMotion));
      notify(state.reducedMotion ? 'EFEITOS VISUAIS REDUZIDOS.' : 'EFEITOS VISUAIS RESTAURADOS.');
    });
    $('#logout-button')?.addEventListener('click', logout);
    elements.commandForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      const value = elements.commandInput.value;
      elements.commandInput.value = '';
      executeCommand(value);
    });
    elements.commandInput?.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' || event.ctrlKey || event.altKey || event.metaKey || event.isComposing) return;
      event.preventDefault();
      elements.commandForm.requestSubmit();
    });
    $('#document-search')?.addEventListener('input', renderDocuments);
    $('#clear-document-search')?.addEventListener('click', () => { $('#document-search').value = ''; renderDocuments(); $('#document-search').focus(); });
    elements.closeDocument?.addEventListener('click', closeDocument);
    elements.documentModal?.addEventListener('click', (event) => { if (event.target === elements.documentModal) closeDocument(); });
    $('#decode-transmission')?.addEventListener('click', decodeTransmission);
    $('#scan-transmissions')?.addEventListener('click', scanFrequencies);
    $('#recover-sector')?.addEventListener('click', recoverHex);
    $('#hex-dump')?.addEventListener('click', (event) => {
      const byte = event.target.closest('.hex-byte');
      if (!byte) return;
      byte.classList.toggle('selected');
      playTone('key');
    });
    $('#protocol-ledger')?.addEventListener('change', updateProtocols);
    $('#confirm-protocols')?.addEventListener('click', confirmProtocols);
    $('#coordinate-code')?.addEventListener('click', () => {
      const point = mapPoints[state.selectedMapPoint];
      notify(`${point?.coords || '42°13′ / 23°43′'} // ${point?.code || 'SF-077-A'} // COORDENADA COPIADA DO ARQUIVO RESTRITO`, 'warn', 6500);
      playTone('success');
    });
    $('#map-zoom-in')?.addEventListener('click', () => changeMapZoom(.25));
    $('#map-zoom-out')?.addEventListener('click', () => changeMapZoom(-.25));
    $('#map-zoom-reset')?.addEventListener('click', resetMapViewport);
    $('#map-viewport')?.addEventListener('pointerdown', handleMapPointerDown);
    $('#map-viewport')?.addEventListener('pointermove', handleMapPointerMove);
    $('#map-viewport')?.addEventListener('pointerup', finishMapDrag);
    $('#map-viewport')?.addEventListener('pointercancel', finishMapDrag);
    $('#map-viewport')?.addEventListener('keydown', handleMapKeyboard);
    window.addEventListener('resize', () => {
      if (state.currentView === 'map') setTimer(prepareMapViewport, 40);
    }, { passive: true });
    document.addEventListener('keydown', handleGlobalShortcut);
    window.addEventListener('hashchange', () => {
      if (!state.authorized) return;
      const name = window.location.hash.replace('#', '');
      if ($(`[data-view="${name}"]`)) activateView(name, false, false);
    });
    document.addEventListener('click', (event) => {
      if (state.soundEnabled && event.target.closest('button, a')) playTone('key');
    }, { passive: true });
    ['pointerdown', 'keydown', 'scroll'].forEach((type) => elements.workspace?.addEventListener(type, resetIdleSecret, { passive: true }));
    window.addEventListener('pagehide', cleanup, { once: true });
  }

  function cleanup() {
    state.timers.forEach((id) => window.clearTimeout(id));
    state.intervals.forEach((id) => window.clearInterval(id));
    window.clearTimeout(state.idleTimer);
    window.clearTimeout(state.markClickTimer);
    if (audioContext && audioContext.state !== 'closed') audioContext.close().catch(() => {});
  }

  function initialize() {
    elements.body.classList.toggle('reduce-motion', state.reducedMotion);
    $('#motion-toggle')?.setAttribute('aria-pressed', String(state.reducedMotion));
    if ($('#motion-toggle b')) $('#motion-toggle b').textContent = state.reducedMotion ? 'REDUZIDO' : 'EFEITOS';
    updateSoundButton();
    renderDocuments();
    renderTimeline();
    renderPeople();
    renderHexDump();
    buildWaveform();
    showTimelineDetail(4);
    showPerson('helena');
    showEntity('luminaria');
    showMapPoint('lighthouse');
    showBeamMode('visual');
    updateProtocols();
    updateClock();
    bindEvents();
    setTrackedInterval(updateClock, 1000);
    setTrackedInterval(updateLiveLog, 7500);

    if (state.authorized) showAuthorizedShell(true);
    else runBoot();
  }

  initialize();
})();
