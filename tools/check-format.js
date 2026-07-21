const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'),extensions=new Set(['.js','.json','.md','.yml','.yaml','.css']),skip=new Set(['.git','node_modules']);
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>skip.has(e.name)?[]:e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)])}
const failures=[];
for(const file of walk(root)){const relative=path.relative(root,file).replace(/\\/g,'/');if(relative.startsWith('data/'))continue;if(!extensions.has(path.extname(file).toLowerCase()))continue;const text=fs.readFileSync(file,'utf8');if(text.includes('\t'))failures.push(`${relative}: tabulação`);if(!text.endsWith('\n'))failures.push(`${relative}: sem nova linha final`)}
if(failures.length){console.error(failures.slice(0,30).join('\n'));process.exit(1)}
console.log('Formatting invariants satisfied.');
