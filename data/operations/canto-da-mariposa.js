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
    ['16 AGO. 1995', 'A equipe entra na igreja após localizar a origem aparente do ruído.'],
    ['REGISTRO CORROMPIDO', 'Uma passagem subterrânea vinculada à mina aparece em fragmentos cartográficos.'],
    ['HORÁRIO NÃO IDENTIFICADO', 'Comunicação comprometida. Elias desaparece durante reconhecimento.'],
    ['17 AGO. 1995', 'Último registro da Alpha menciona ruído semelhante a asas atrás das paredes.'],
    ['20 AGO. 1995', 'Seis baixas são contabilizadas, embora apenas cinco identidades permaneçam no arquivo.'],
    ['REGISTRO CORROMPIDO', 'Parte dos arquivos retorna com revisões incompatíveis e sinais fora da ilha.'],
    ['DATA SUPRIMIDA', 'Setentrional é reclassificada como Canto da Mariposa.'],
    ['ESTADO ATUAL', 'O caso foi reaberto. A frequência continua presente nas cópias recuperadas.']
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
    ['CM-DOC-001', 'Relatório inicial da Operação Setentrional', 'Relatório', '11 AGO. 1995', 'Interno', 'Íntegro', 'Permitido', '/operacoes/setentrional/'],
    ['CM-DOC-002', 'Ordem de mobilização', 'Ordem', '13 AGO. 1995', 'Interno', 'Revisado', 'Permitido', '/operacoes/setentrional/'],
    ['CM-MAP-003', 'Mapa parcial da Ilha de São Firmo', 'Cartografia', '1931 / 1995', 'Interno', 'Contestado', 'Permitido', '/operacoes/setentrional/mapa'],
    ['CM-IMG-004', 'Registro fotográfico da igreja', 'Imagem', 'DATA INCERTA', 'Restrito', 'Fragmentado', 'Indisponível', null],
    ['CM-MAP-005', 'Planta incompleta da mina', 'Planta', 'DATA SUPRIMIDA', 'Classificado', 'Corrompido', 'Bloqueado', null],
    ['CM-FLD-006', 'Diário de campo recuperado', 'Diário', 'REGISTRO CORROMPIDO', 'Restrito', 'Parcial', 'Indisponível', null],
    ['CM-AUD-017', 'Transcrição da última transmissão', 'Transcrição', '17 AGO. 1995', 'Interno', 'Interferência severa', 'Permitido', '#transmissao'],
    ['CM-PER-008', 'Relatório de baixas', 'Pessoal', '20 AGO. 1995', 'Restrito', 'Contagem divergente', 'Indisponível', null],
    ['CM-CMD-009', 'Ordem oficial de reclassificação', 'Diretoria', 'DATA SUPRIMIDA', 'Classificado', 'Vigente', 'Bloqueado', null],
    ['CM-UNK-010', 'Fragmento de origem não identificada', 'Desconhecido', 'INFORMAÇÃO INDISPONÍVEL', 'Classificado', 'Ativo', 'Bloqueado', null]
  ],
  places: [
    ['Ilha de São Firmo', 'Posição ausente das cartas recentes; quarentena mantida.'],
    ['Igreja abandonada', 'Origem indicada na última transmissão pública.'],
    ['Mina', 'Estrutura citada em fragmentos; acesso cartográfico bloqueado.'],
    ['Costa norte', 'Último contato confirmado da Guarda Costeira.'],
    ['Porto', 'Ponto de desembarque da Equipe Alpha.'],
    ['Farol', 'Última posição conhecida da equipe; interior geometricamente inconsistente.']
  ],
  evidence: [
    ['CM-01', 'Fragmento de tecido coberto por pó acinzentado.', 'Igreja', 'Degradado', 'Biológico desconhecido', 'Partículas permanecem aderidas mesmo após isolamento a seco.'],
    ['CM-02', 'Gravação contendo frequências sem origem reconhecida.', 'Canal Alpha', 'Reproduzível', 'Contaminação informacional', 'A cópia preserva um segundo canal que não existia no equipamento original.'],
    ['CM-03', 'Desenho em carvão representando uma igreja conectada a uma mina.', 'Casa 17', 'Preservado', 'Padrão recorrente', 'O traço subterrâneo muda de posição entre digitalizações.'],
    ['CM-04', 'Mapa da ilha contendo caminhos ausentes dos levantamentos oficiais.', 'Arquivo hidrográfico', 'Contestado', 'Desorientação', 'Nenhuma das rotas termina no mesmo ponto em duas cópias.'],
    ['CM-05', 'Fotografia danificada com uma silhueta acima da torre da igreja.', 'Envelope sem custódia', 'Danificado', 'Presença não identificada', 'A silhueta não aparece no negativo associado.'],
    ['CM-06', 'Página arrancada: “NÃO SIGA O SOM QUANDO ELE PARAR.”', 'Diário de campo', 'Parcial', 'Instrução hostil', 'A caligrafia não corresponde aos cinco agentes identificados.']
  ],
  classified: [
    ['Análise da frequência', 'ACESSO NEGADO'],
    ['Causa das mortes', 'NÍVEL DE AUTORIZAÇÃO INSUFICIENTE'],
    ['Registro da sétima presença', 'ARQUIVO SUPRIMIDO'],
    ['Protocolo Mariposa', 'AUTORIZAÇÃO DO COMANDO NECESSÁRIA'],
    ['Origem do som', 'DADOS REMOVIDOS']
  ]
};
