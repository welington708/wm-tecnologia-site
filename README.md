# WM Tecnologia — landing page

Landing page estática da WM Tecnologia, consultoria independente de Salesforce. A versão atual inclui página principal, privacidade, termos e formulário de contato humano. Não há banco próprio, chatbot, simulador, login ou acesso Salesforce.

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
- `contactFormEndpoint` com o endpoint HTTPS verificado do prestador de formulário;
- `contactEmail` como canal de privacidade;
- textos de privacidade e termos com os dados reais.

`showPublicPrices` permanece `false`. Nenhuma tabela interna de preços existe no código público.

Enquanto o endpoint estiver ausente, a interface exibe o formulário em modo de prévia e mantém o envio desativado. A checagem `npm run validate:release` também bloqueia a publicação incompleta.

O endpoint é público por natureza em sites estáticos. Use apenas um identificador próprio do serviço, nunca senha, token secreto ou credencial privada. Ative restrição por domínio e proteção antispam no provedor quando disponíveis.

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

O workflow `.github/workflows/deploy-pages.yml` publica automaticamente o conteúdo de `dist/` quando há push para `main`. Enquanto os dados reais não forem aprovados, a publicação continua com `noindex`, formulário desativado e aviso de pendência.

## Escopo adiado

Simulador, n8n, chatbot, IA, API do WhatsApp, painel, login, pagamentos, banco próprio e integrações com organizações Salesforce continuam como possibilidades futuras independentes.

Veja também [docs/deployment.md](docs/deployment.md), [docs/operations.md](docs/operations.md) e [docs/assets.md](docs/assets.md).
