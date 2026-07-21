const { execFileSync } = require('node:child_process');
const { createHash } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const mode = process.argv[2] || 'repository';
const git = process.platform === 'win32' ? 'C:\\Program Files\\Git\\cmd\\git.exe' : 'git';
const tracked = execFileSync(git, ['ls-files', '-z'], { cwd: root })
  .toString('utf8').split('\0').filter(Boolean);
const trackedSet = new Set(tracked.map(normalize));

function normalize(value) {
  return value.replaceAll('\\', '/').replace(/\/{2,}/g, '/').replace(/^\.\//, '').replace(/\/$/, '');
}

function existsReference(source, target, baseDirectory = path.dirname(source)) {
  const clean = target.split(/[?#]/, 1)[0];
  if (!clean || /^(?:[a-z]+:|\/\/|#|%23|data:)/i.test(target)) return true;
  if (/^(?:\.\.?\/|\/)+$/.test(clean)) return trackedSet.has('index.html');
  const base = clean.startsWith('/') ? clean.slice(1) : normalize(path.join(baseDirectory, clean));
  const candidates = [base, `${base}.html`, `${base}/index.html`];
  return candidates.some((candidate) => trackedSet.has(normalize(candidate)));
}

function references(kind) {
  const extensions = kind === 'assets'
    ? /\.(?:avif|gif|jpe?g|png|svg|webp|mp3|ogg|wav|mp4|webm|pdf|woff2?|ttf)$/i
    : null;
  const missing = [];
  for (const file of tracked.filter((name) => /\.(?:html|css|js)$/i.test(name))) {
    const text = fs.readFileSync(path.join(root, file), 'utf8');
    const baseHref = text.match(/<base\s+[^>]*href=["']([^"']+)/i)?.[1];
    const baseDirectory = baseHref && !/^[a-z]+:/i.test(baseHref)
      ? normalize(path.join(path.dirname(file), baseHref))
      : path.dirname(file);
    const pattern = file.endsWith('.html')
      ? /<(?:a|link|script|img|audio|video|source|iframe|form)\b[^>]*\s(?:href|src|action)\s*=\s*["']([^"']+)["']/gi
      : file.endsWith('.css')
        ? /url\(\s*["']?([^)'"\s]+)/gi
        : /$a/gi;
    const matches = [...text.matchAll(pattern)];
    for (const match of matches) {
      const target = match[1];
      if (extensions && !extensions.test(target.split(/[?#]/, 1)[0])) continue;
      if (!existsReference(file, target, baseDirectory)) missing.push({ file, target });
    }
  }
  return missing;
}

function duplicateGroups() {
  const groups = new Map();
  for (const file of tracked) {
    const full = path.join(root, file);
    const stat = fs.statSync(full);
    if (!stat.size) continue;
    const hash = createHash('sha256').update(fs.readFileSync(full)).digest('hex');
    const group = groups.get(hash) || [];
    group.push(file);
    groups.set(hash, group);
  }
  return [...groups].filter(([, files]) => files.length > 1);
}

let failures = [];
if (mode === 'repository') {
  const forbidden = /(^|\/)(node_modules|dist|build|out|coverage|\.cache|tmp|temp|logs|backups?)(\/|$)|\.(log|tmp|temp|bak|old|swp|swo|db|sqlite|sql)$/i;
  failures = tracked.filter((file) => forbidden.test(file));
  const empty = tracked.filter((file) => fs.statSync(path.join(root, file)).size === 0);
  failures.push(...empty.map((file) => `empty:${file}`));
} else if (mode === 'links' || mode === 'assets') {
  failures = references(mode).map(({ file, target }) => `${file} -> ${target}`);
} else if (mode === 'duplicates') {
  const groups = duplicateGroups();
  const actionable = groups.filter(([, files]) => !files.every((file) => /^agentes\/[^/]+\/(?:arquivos|configuracoes|dossie|ficha|habilidades|inventario|registros|rituais)\.html$/.test(file)));
  failures = actionable.map(([hash, files]) => `${hash}: ${files.join(', ')}`);
  console.log(JSON.stringify({ duplicateGroups: groups.length, intentionalAliasGroups: groups.length - actionable.length }));
} else if (mode === 'unused') {
  const candidates = tracked.filter((file) => /\.(?:gif|jpe?g|png|mp3|mp4|pdf|svg|webp)$/i.test(file));
  const corpus = tracked.filter((file) => /\.(?:html|css|js|json|md)$/i.test(file))
    .map((file) => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');
  failures = candidates.filter((file) => !corpus.includes(file) && !corpus.includes(path.basename(file)));
  console.log(JSON.stringify({ candidates: failures }, null, 2));
  failures = [];
} else {
  throw new Error(`Unknown check mode: ${mode}`);
}

if (failures.length) {
  console.error(`${mode}: ${failures.length} issue(s)`);
  console.error(failures.slice(0, 100).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`${mode}: ok (${tracked.length} tracked files)`);
}
