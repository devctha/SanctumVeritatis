const fs=require('fs'),path=require('path'),root=path.resolve(__dirname,'..'),skip=new Set(['.git','node_modules']);
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{if(skip.has(entry.name))return[];const full=path.join(dir,entry.name);return entry.isDirectory()?walk(full):[full]})}
const html=walk(root).filter(file=>file.endsWith('.html')),failures=[];
for(const file of html){const content=fs.readFileSync(file,'utf8'),rel=path.relative(root,file).split(path.sep).join('/');if(/(?:href|src|action)=["'][^"']+\.html(?:[?#][^"']*)?["']/i.test(content))failures.push(`${rel}: referência .html`);if(content.includes('data-clean-route-alias')){const canonical=(content.match(/rel="canonical" href="https:\/\/sanctumveritatis\.com([^"']+)/)||[])[1];if(!canonical||!fs.existsSync(path.join(root,canonical.replace(/^\//,''),'index.html')))failures.push(`${rel}: alvo canônico ausente`)} }
const login=fs.readFileSync(path.join(root,'login','index.html'),'utf8');
if(!login.includes('<title>Acesso Restrito | Sanctum Veritatis</title>'))failures.push('login: título inválido');
if(!login.includes('https://sanctumveritatis.com/login'))failures.push('login: canonical ausente');
if(/SV-DEMO|perfil de demonstra|abrir demonstra|sessão demonstrativa|\bDEMO\b/i.test(login))failures.push('login: linguagem não diegética');
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log(JSON.stringify({htmlDocuments:html.length,cleanLogin:true,legacyAliases:html.filter(file=>fs.readFileSync(file,'utf8').includes('data-clean-route-alias')).length,noHtmlLinks:true}));
