const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const source = path.join(root, 'operacoes', 'canto-da-mariposa', 'index.html');
const alias = path.join(root, 'operacoes', 'canto-da-mariposa.html');
let html = fs.readFileSync(source, 'utf8');
html = html
  .replace('<html lang="pt-BR">', '<html data-clean-route-alias lang="pt-BR">')
  .replace('<head>', '<head><script>if(/\\.html$/i.test(location.pathname))location.replace(\'/operacoes/canto-da-mariposa\'+location.search+location.hash)</script>')
  .replace('<base href="../../">', '<base href="../">');
fs.writeFileSync(alias, html);
console.log('Canto da Mariposa clean route alias ready.');
