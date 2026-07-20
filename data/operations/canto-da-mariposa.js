window.SV_CANTO_DA_MARIPOSA = {
  id: 'operation-canto-da-mariposa',
  slug: 'canto-da-mariposa',
  previousSlug: 'setentrional',
  title: 'Operação Canto da Mariposa',
  formerTitle: 'Operação Setentrional',
  identifier: 'SV-OP-CM-001',
  location: 'Ilha de São Firmo',
  status: 'Reclassificada',
  threatLevel: 'Crítico',
  accessLevel: 'Parcial',
  mobilized: 6,
  casualties: 6,
  reclassifiedAt: 'DATA SUPRIMIDA',
  publicAccess: true,
  states: ['Reclassificada', 'Investigação incompleta', 'Equipe perdida', 'Área interditada', 'Fenômeno ativo', 'Comunicação comprometida'],
  timeline: [
    ['1931', 'Primeiro registro cartográfico verificável de São Firmo.'],
    ['DÉCADAS ANTERIORES', 'Desaparecimentos cíclicos e ritos costeiros são associados à ilha.'],
    ['11–14 AGO. 1995', 'Transmissões impossíveis motivam a criação da Operação Setentrional e a mobilização da Equipe Alpha.'],
    ['15 AGO. 1995', 'A equipe desembarca em São Firmo; mapas e contagens do vilarejo começam a divergir.'],
    ['16 AGO. 1995', 'Comunicação comprometida. Elias desaparece durante reconhecimento.'],
    ['17 AGO. 1995', 'Último registro da Alpha menciona ruído semelhante a asas atrás das paredes.'],
    ['20 AGO. 1995', 'Seis baixas são contabilizadas, embora apenas cinco identidades permaneçam no arquivo.'],
    ['REGISTRO CORROMPIDO', 'Parte dos arquivos retorna com revisões incompatíveis e sinais fora da ilha.'],
    ['DATA SUPRIMIDA', 'Setentrional é reclassificada como Canto da Mariposa.'],
    ['ESTADO ATUAL', 'A investigação permanece incompleta; a frequência continua presente nas cópias recuperadas.']
  ],
  agents: [
    { name: 'Marcus', role: 'Liderança da Equipe Alpha', state: 'Morto em operação', location: 'Farol / última transmissão', record: 'SV-SET-012-N-1995' },
    { name: 'Yin', role: 'Reconhecimento da Membrana', state: 'Morta em operação', location: 'Interior do farol', record: 'SV-SET-018-N-1995' },
    { name: 'Elias', role: 'Reconhecimento de campo', state: 'Morto em operação', location: 'Vilarejo / neblina', record: 'SV-SET-022-N-1995' },
    { name: 'Sophia', role: 'Observação e testemunho', state: 'Morta em operação', location: 'Capela / último registro', record: 'SV-SET-014-N-1995' },
    { name: 'Klaus', role: 'Infiltração e inspeção', state: 'Morto em operação', location: 'Porto de São Firmo', record: 'SV-SET-013-N-1995' },
    { name: 'IDENTIDADE PROTEGIDA', role: 'Função removida do inventário', state: 'Morto em operação', location: 'REGISTRO SUPRIMIDO', record: 'SV-SET-[EXPURGADO]' }
  ],
  files: [
    ['Relatório inicial da Setentrional', 'Relatório', '11 AGO. 1995', 'Interno', 'Íntegro', 'Permitido'],
    ['Ordem de mobilização', 'Ordem', '13 AGO. 1995', 'Interno', 'Revisado', 'Permitido'],
    ['Mapa parcial de São Firmo', 'Cartografia', '1931 / 1995', 'Interno', 'Contestado', 'Permitido'],
    ['Registro da igreja', 'Diário', 'DATA INCERTA', 'Restrito', 'Fragmentado', 'Parcial'],
    ['Planta da mina', 'Planta', 'DATA SUPRIMIDA', 'Classificado', 'Corrompido', 'Bloqueado'],
    ['Fotografias recuperadas', 'Imagem', '15 AGO. 1995', 'Restrito', 'Alterado', 'Parcial'],
    ['Última comunicação', 'Áudio / transcrição', '17 AGO. 1995', 'Interno', 'Interferência severa', 'Permitido'],
    ['Relatório de baixas', 'Pessoal', '20 AGO. 1995', 'Restrito', 'Contagem divergente', 'Parcial'],
    ['Ordem de reclassificação', 'Diretoria', 'DATA SUPRIMIDA', 'Classificado', 'Vigente', 'Bloqueado'],
    ['Fragmento sem identificação', 'Desconhecido', 'INFORMAÇÃO INDISPONÍVEL', 'Classificado', 'Ativo', 'Bloqueado']
  ],
  places: [
    ['Ilha de São Firmo', 'Posição ausente das cartas recentes; quarentena mantida.'],
    ['Igreja abandonada', 'Origem indicada na última transmissão pública.'],
    ['Mina', 'Estrutura citada em fragmentos; acesso cartográfico bloqueado.'],
    ['Costa noroeste', 'Último contato confirmado da Guarda Costeira.'],
    ['Porto', 'Ponto de desembarque da Equipe Alpha.'],
    ['Farol', 'Última posição conhecida da equipe; interior geometricamente inconsistente.']
  ],
  evidence: [
    ['CM-01', 'Fragmento de tecido coberto por pó acinzentado.', 'Igreja', 'Degradado', 'Biológico desconhecido'],
    ['CM-02', 'Gravação com frequências não identificadas.', 'Canal Alpha', 'Reproduzível', 'Contaminação informacional'],
    ['CM-03', 'Desenho em carvão representando uma igreja e uma mina.', 'Casa 17', 'Preservado', 'Padrão recorrente'],
    ['CM-04', 'Mapa com caminhos ausentes dos levantamentos oficiais.', 'Arquivo hidrográfico', 'Contestado', 'Desorientação']
  ],
  classified: [
    ['Análise da frequência', 'ACESSO NEGADO'],
    ['Causa das mortes', 'NÍVEL DE AUTORIZAÇÃO INSUFICIENTE'],
    ['Registro da sétima presença', 'ARQUIVO SUPRIMIDO'],
    ['Protocolo Mariposa', 'SOMENTE COMANDO']
  ]
};
