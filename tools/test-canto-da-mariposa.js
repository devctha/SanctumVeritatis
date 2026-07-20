const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.resolve(__dirname, '..');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const index = read('index.html');
const page = read('operacoes/canto-da-mariposa/index.html');
const alias = read('operacoes/canto-da-mariposa.html');
const legacy = read('operacoes/setentrional/index.html');
const css = read('css/canto-da-mariposa.css');
const client = read('js/canto-da-mariposa.js');
const context = { window: {} };
vm.runInNewContext(read('data/operations/canto-da-mariposa.js'), context);
const data = context.window.SV_CANTO_DA_MARIPOSA;

assert(index.includes('href="operacoes/canto-da-mariposa"'), 'Index sem link real para a operação');
assert(index.includes('Abrir arquivo da Operação Canto da Mariposa'), 'Link do Index sem nome acessível');
assert(page.includes('id="operation-canto-da-mariposa"'), 'Identificador interno ausente');
assert(page.includes('<title>Operação Canto da Mariposa | Sanctum Veritatis</title>'), 'Título incorreto');
assert(page.includes('rel="canonical" href="https://sanctumveritatis.com/operacoes/canto-da-mariposa"'), 'Canonical incorreto');
assert(alias.includes("location.replace('/operacoes/canto-da-mariposa'"), 'Alias HTML não preserva rota limpa');
assert(legacy.includes('Novo registro autorizado:') && legacy.includes("location.replace('/operacoes/canto-da-mariposa'"), 'Rota Setentrional sem transição compatível');
assert(legacy.includes('SVAuth.requireAccess'), 'Conteúdo operacional legado perdeu guarda de acesso');
assert(data.publicAccess !== false && data.casualties === 6 && data.mobilized === 6, 'Metadados públicos inconsistentes');
assert(data.agents.length === 6 && data.agents.some(agent => agent.name === 'IDENTIDADE PROTEGIDA'), 'Equipe não preserva divergência do sexto registro');
assert(data.classified.every(entry => entry.length === 2) && !JSON.stringify(data.classified).match(/causa.{0,20}:/i), 'Conteúdo classificado completo enviado ao cliente');
assert(page.includes('Nenhum conteúdo secreto foi incluído'), 'Limite público não está declarado');
assert(css.includes('@media(max-width:600px)') && css.includes('@media(prefers-reduced-motion:reduce)'), 'CSS sem mobile ou movimento reduzido');
assert(client.includes("addEventListener('click'") && page.includes('aria-live="polite"'), 'Interações acessíveis ausentes');
assert(page.includes('onclick="window.print()"') && page.includes('id="copy-id"'), 'Ações de imprimir/copiar ausentes');

console.log(JSON.stringify({route:'/operacoes/canto-da-mariposa',indexEntry:true,legacyCompatible:true,publicRecords:data.files.length,agents:data.agents.length,classifedPayload:false,mobile:true,reducedMotion:true}));
