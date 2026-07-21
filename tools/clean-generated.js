const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const dryRun = process.argv.includes('--dry-run');
const generated = ['audit-data.json'];
const present = generated.filter((file) => fs.existsSync(path.join(root, file)));

if (!dryRun) {
  console.error('Refusing to remove generated files without --dry-run. Review the listed paths and remove explicitly.');
  process.exit(2);
}

console.log(JSON.stringify({ dryRun: true, generated: present }, null, 2));
