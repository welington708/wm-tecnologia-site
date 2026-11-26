import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const required = ['index.html', 'privacidade.html', 'termos.html', 'robots.txt'];
const forbidden = [
  'Verde',
  'R$ 200',
  'R$ 400',
  'R$ 600',
  'R$ 1.900',
  'R$ 3.600',
  'R$ 5.500',
  'DATABASE_URL',
  'N8N_WEBHOOK_URL',
];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    files.push(...(entry.isDirectory() ? await walk(path) : [path]));
  }
  return files;
}

const files = await walk('dist');
for (const name of required) {
  if (!files.some((file) => file.endsWith(name))) throw new Error(`Arquivo ausente no build: ${name}`);
}

for (const file of files.filter((name) => /\.(html|js|css|txt|xml|json)$/.test(name))) {
  const content = await readFile(file, 'utf8');
  for (const term of forbidden) {
    if (content.includes(term)) throw new Error(`Conteúdo privado encontrado em ${file}: ${term}`);
  }
}

console.log(`Saída pública validada: ${files.length} arquivos, sem termos privados conhecidos.`);
