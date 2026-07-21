const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const read=rel=>fs.readFileSync(path.join(root,rel),'utf8');
const assert=(ok,message)=>{if(!ok)throw Error(message)};
const routes=[
  ['index.html','Sanctum Veritatis'],['login/index.html','Acesso Restrito'],['sistema/dashboard/index.html',''],
  ['agentes/index.html',''],['arquivos/index.html',''],['mestre/index.html',''],
  ['operacoes/canto-da-mariposa/index.html','Canto da Mariposa'],['operacoes/setentrional/index.html','Setentrional'],
  ['401/index.html','401'],['403/index.html','403'],['404/index.html','404'],['500/index.html','500'],
  ['400/index.html','400'],['offline/index.html','Offline']
];
for(const[file,needle]of routes){assert(fs.existsSync(path.join(root,file)),`Rota crítica ausente: ${file}`);const html=read(file);assert(/<html[^>]+lang="pt-BR"/i.test(html),`lang ausente: ${file}`);assert(/<meta[^>]+name="viewport"/i.test(html),`viewport ausente: ${file}`);assert(/<title>[^<]+<\/title>/i.test(html),`title ausente: ${file}`);if(needle)assert(html.toLowerCase().includes(needle.toLowerCase()),`Conteúdo esperado ausente: ${file}`)}
const index=read('index.html');
for(const href of ['operacoes/canto-da-mariposa','arquivos','login'])assert(index.includes(`href="${href}`),`Index sem acesso: ${href}`);
assert(fs.existsSync(path.join(root,'robots.txt'))&&fs.existsSync(path.join(root,'sitemap.xml')),'SEO técnico ausente');
console.log(JSON.stringify({criticalRoutes:routes.length,indexNavigation:true,errorStates:6,seoFiles:true}));
