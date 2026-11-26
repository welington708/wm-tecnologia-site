# Publicação e reversão

## Antes de publicar

1. Preencha e revise `src/config/brand.ts`.
2. Atualize privacidade e termos com responsável, canal, prestador do formulário e práticas reais da hospedagem.
3. Ative e valide o endpoint do formulário, proteção antispam e restrição pelo domínio final.
4. Configure canonical, sitemap e robots para o domínio final.
5. Execute `npm ci`, `npm run check` e `npm run validate:release`.
6. Revise `dist/` e teste navegação e formulário em celular e desktop sem usar dados reais de terceiros.

Publique somente os arquivos de `dist/` em hospedagem estática com HTTPS. O projeto não precisa de Node em produção.

## Reversão

Mantenha cada versão publicada como artefato imutável. Se houver problema, restaure o diretório `dist/` da última versão aprovada e confira a página inicial, as páginas auxiliares e o link de contato. Mudanças de DNS devem ser feitas somente quando necessárias e sem remover registros de e-mail existentes.
