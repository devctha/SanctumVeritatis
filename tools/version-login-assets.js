const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const files = ['login.html', path.join('login', 'index.html')];
const assets = [
  'data/auth/users-data.js',
  'js/auth/session-service.js',
  'js/auth/auth-service.js',
  'js/auth/login-controller.js'
];

for (const relative of files) {
  const file = path.join(root, relative);
  let html = fs.readFileSync(file, 'utf8');
  for (const asset of assets) {
    const escaped = asset.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    html = html.replace(new RegExp(`${escaped}(?:\\?v=[^"']+)?`, 'g'), `${asset}?v=20260720-master`);
  }
  fs.writeFileSync(file, html);
}

console.log('Login assets versioned for the master access release.');
