# WM Tecnologia — landing page

Landing page estática da WM Tecnologia, consultoria independente de Salesforce. A fase 1 inclui a página principal, privacidade, termos e contato humano por WhatsApp. Não há backend, formulário, banco, chatbot, simulador ou automação.

## Desenvolvimento

Requisitos: Node.js 20.19+ (ou 22.12+) e npm.

```bash
npm install
npm run dev
```

## Configuração

Edite `src/config/brand.ts`. Antes de publicar, confirme:

- nome público do consultor;
- `siteUrl` com o domínio final;
- `whatsappNumber` em formato internacional, apenas dígitos;
- `contactEmail`, se houver;
- textos de privacidade e termos com os dados reais.

`showPublicPrices` permanece `false`. Nenhuma tabela interna de preços existe no código público.

Enquanto o WhatsApp estiver ausente, a interface mostra uma pendência e mantém todos os links de contato desativados. A checagem `npm run validate:release` também bloqueia a publicação incompleta.

## Build e validação

```bash
npm run check
npm run validate:release
```

`npm run check` executa a checagem de tipos, gera `dist/` e inspeciona os arquivos publicados. `validate:release` deve falhar na prévia até os dados reais serem configurados.

Para conferir o build localmente:

```bash
npm run preview
```

O preview do Vite é apenas para validação. Em produção, publique os arquivos de `dist/` em uma hospedagem estática com HTTPS.

## Estado de indexação

A prévia usa `noindex` e `public/robots.txt` bloqueia rastreamento. Ao configurar o domínio final, revise os metadados, adicione canonical e sitemap reais e altere o robots somente depois da aprovação para publicação.

## Prévia no GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` publica automaticamente o conteúdo de `dist/` quando há push para `main`. Essa publicação é apenas uma prévia: continua com `noindex`, contato desativado e aviso de pendências até a configuração dos dados reais.

## Escopo adiado

Formulário, simulador, n8n, chatbot, IA, API do WhatsApp, painel, login, pagamentos, banco e integrações com organizações Salesforce são possibilidades futuras independentes e não fazem parte desta entrega.

Veja também [docs/deployment.md](docs/deployment.md), [docs/operations.md](docs/operations.md) e [docs/assets.md](docs/assets.md).
