import { readFile } from 'node:fs/promises';

const source = await readFile('src/config/brand.ts', 'utf8');
const pending = [];
if (/consultantName:\s*null/.test(source)) pending.push('nome público do consultor');
if (/siteUrl:\s*null/.test(source)) pending.push('domínio/siteUrl');
if (/whatsappNumber:\s*null/.test(source)) pending.push('WhatsApp real');
if (/contactEmail:\s*null/.test(source)) pending.push('e-mail (opcional, remova esta checagem se não for usado)');
if (/showPublicPrices:\s*true/.test(source)) pending.push('revisão explícita dos preços públicos');

if (pending.length) {
  console.error('Publicação bloqueada. Pendências:');
  pending.forEach((item) => console.error(`- ${item}`));
  process.exit(1);
}
console.log('Configuração mínima de produção preenchida. Faça ainda a revisão humana final.');
