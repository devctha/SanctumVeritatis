const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const checks={
  indexToCanto:read('index.html').includes('href="operacoes/canto-da-mariposa"'),
  legacyRedirect:read('operacoes/setentrional/index.html').includes("location.replace('/operacoes/canto-da-mariposa'"),
  loginMaster:!read('js/auth/auth-service.js').includes("role !== 'master'"),
  logout:read('js/auth/session-service.js').includes('clear'),
  publicArchive:fs.existsSync(path.join(root,'arquivos','index.html')),
  agentRoute:fs.existsSync(path.join(root,'agentes','index.html')),
  masterRoute:fs.existsSync(path.join(root,'mestre','index.html')),
  classifiedNotShipped:!read('data/operations/canto-da-mariposa.js').match(/causa.{0,20}:/i),
  notFound:fs.existsSync(path.join(root,'404','index.html'))
};
for(const[key,value]of Object.entries(checks))if(!value)throw Error(`Fluxo crítico falhou: ${key}`);
console.log(JSON.stringify(checks));
