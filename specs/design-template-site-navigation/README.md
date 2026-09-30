# Navegação Thirdway

Fonte: https://www.thirdway.com/. Aplicação da skill design-template-site-navigation, 24/09/2026.

Acesse `/` para o shell existente; `/approach`, `/services` e `/people` são páginas mínimas de exemplo. Abrir o painel mostra oito links. Os cinco destinos restantes continuam no site original. O CTA mantém apresentação, mas abre email em vez do formulário original. Cards promocionais não foram migrados.

Configuração: `src/shared/template/site/navigation/navigation.config.ts`. `sourceNavigation` preserva os destinos originais; `exampleNavigation` mapeia somente três rotas locais. Antes de apagar fixtures, trocar `navigationVariant` para `source`. Alterar textos e destinos somente na configuração.

Header fixo, painel central compartilhado, breakpoint1024px, desktop172→680px; mobile max361px. Não há sidebar. Cor externa acompanha a seção em y44; logo permanece escuro. Active state exato por pathname; capacidade de âncoras isolada usa rota dona, alvo existente e linha inferior do header. Menu fecha por Escape, backdrop, navegação e cruzamento de breakpoint. Permite Tab/ShiftTab e restaura scroll/foco com cleanup.

## Reprodução

Usar Node24 e npm11. `npm run lint`, `npm run typecheck`, `npm run build`, `npm run format:check`. Iniciar `npm start -- --hostname 127.0.0.1 --port 3101` e aguardar Ready.

Os testes usam Playwright já disponível fora do projeto; definir `PLAYWRIGHT_MODULE` para o caminho do módulo instalado e Chrome em `/usr/bin/google-chrome`. Não foi adicionada dependência à aplicação.

- `node specs/design-template-site-navigation/scripts/navigation-verify.mjs`: fonte online e destino em11 larguras; medidas com tolerância1px, teclado, histórico, URLs e SPA.
- `node specs/design-template-site-navigation/scripts/hybrid.test.mjs`: NavLink/hook reais em fixture isolada compilada com webpack já incluído no Next; adaptador de router somente nessa fixture. Produção usa Next Link/usePathname reais.
- `node specs/design-template-site-navigation/scripts/states.test.mjs`: limiar de scroll em−1/0/+1 nos dois sentidos e animação com relógio controlado.

Artefatos: spec.md, map.md, integration.md e evidence/*.json/png. O baseline mostra que apenas o import autorizado mudou nos arquivos src preexistentes. `.prompts/design-template-site-navigation.md` recebeu somente normalização Prettier para resolver falha pré-existente do check global.
