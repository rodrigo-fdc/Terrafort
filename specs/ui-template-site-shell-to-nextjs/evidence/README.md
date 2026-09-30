# Reprodução das evidências

Fonte: https://www.thirdway.com/. Chrome local, DPR 1, viewport conforme cada resultado. Scripts usam Playwright instalado temporariamente em `/tmp/thirdway-inspect`, sem dependência de testes no produto.

```bash
npm install --prefix /tmp/thirdway-inspect playwright
PLAYWRIGHT_MODULE=/tmp/thirdway-inspect/node_modules/playwright/index.mjs node specs/ui-template-site-shell-to-nextjs/evidence/capture-source.mjs
npm run build
npm start -- --hostname 127.0.0.1 --port 3101
```

Em outro terminal:

```bash
PLAYWRIGHT_MODULE=/tmp/thirdway-inspect/node_modules/playwright/index.mjs PREVIEW_URL=http://127.0.0.1:3101/ node specs/ui-template-site-shell-to-nextjs/evidence/verify-static.mjs
PLAYWRIGHT_MODULE=/tmp/thirdway-inspect/node_modules/playwright/index.mjs PREVIEW_URL=http://127.0.0.1:3101/ node specs/ui-template-site-shell-to-nextjs/evidence/verify-interactions.mjs
```

Os scripts pressupõem `/usr/bin/google-chrome`; ajustar esse caminho ao ambiente. O teste de cleanup do preview usou `window.next.router`, interface de debug disponível na versão instalada. Na rota final, o script confirma que os hashes dos componentes são os mesmos, testa recarregamentos e verifica o HTTP 404 da rota removida.

`source-matrix.json` registra a referência; `static-check.json` e `interaction-check.json` preservam as evidências do preview. `final-static-check.json` e `final-interaction-check.json` registram a rota final `/`. Screenshots source/preview foram capturadas com conteúdo da fonte removido somente no destino. Não comparar alturas intrínsecas de conteúdo removido como se fossem wrappers fixos.

O único ajuste incidental foi formatação Markdown em `.prompts/site-template.md`, necessária ao check global e sem mudança de conteúdo. A skill, o layout e o CSS globais não foram alterados. A página raiz foi substituída após confirmação; backup em `original-root-page.tsx.txt`.

O teste final consulta `/shell-preview` via HTTP e exige 404. Não navega via router para uma rota inexistente, pois Next pode carregar um novo documento nesse caso. Erros de console e recursos da rota final continuam falhando o teste.
