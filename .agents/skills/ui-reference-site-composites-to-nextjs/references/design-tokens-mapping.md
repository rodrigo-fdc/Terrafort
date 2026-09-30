# Expansão agnóstica de tokens

## Delta rastreável

Antes da aprovação, produza somente o plano:

| Token | Propriedade/valor computado | URL/seletor/estado/viewport | Reuso ou adição | Consumidores |
| --- | --- | --- | --- | --- |

Reutilize tokens existentes quando valor e significado coincidirem. Para novos valores use grupos como `--ui-card-*`, `--ui-modal-*`, `--ui-accordion-*`, `--ui-toast-*` e `--ui-pricing-tier-*`. Não troque o valor de um token existente para fazer um composto encaixar.

Após aprovação, acrescente blocos semânticos ao `ui-tokens.css`, preservando conteúdo e ordem relevante da cascata. Valores concretos devem vir da inspeção; os nomes abaixo não autorizam valores de exemplo:

- Card: bg, foreground, border, radius, padding, gap, elevation.
- Modal: backdrop, shadow, width/max-width, padding, layer, duration, easing.
- Accordion: trigger-height, separator, spacing, duration, easing.
- Toast: surface, text, border, shadow, offset, gap, duração quando aplicável.

Preserve listas completas de sombras, gradientes, alpha, filtros, transform-origin, transições e keyframes. Extraia estilos de `::before`/`::after` e estados. Não substitua uma sombra complexa por utilitário aproximado.

Medidas do layout e valores visuais devem consumir `var(--ui-*)`; constantes de funcionamento como `display: flex` não precisam virar tokens. Variáveis internas do Radix/Sonner são dados de execução: use-as para alturas/posições dinâmicas, sem congelá-las com valores medidos de um único conteúdo.

## Integração existente

- **Tailwind v3:** use mapeamentos já disponíveis ou utilitários como `bg-[var(--ui-card-bg)]`. Alterar `tailwind.config.*` exige autorização fora do escopo; não é necessário quando variáveis arbitrárias bastam.
- **Tailwind v4:** respeite a configuração CSS-first. Use variáveis em classes ou mapeamento `@theme inline` compatível no arquivo já importado. Não crie configuração v3 sem efeito. Mantenha regras Tailwind fora de CSS destinado a projetos sem Tailwind.
- **CSS Modules:** mantenha módulos junto aos compostos e use CVA com classes desses módulos.
- **Vanilla:** importe stylesheet local e use prefixos de classe exclusivos. Nenhum reset global.

O import global de `ui-tokens.css` deve existir desde a etapa de primitivos. Não altere layout/globals silenciosamente. Herança apenas dentro de um container pode não alcançar portals no body; verifique as variáveis também no portal.

Preserve breakpoints medidos e overrides responsivos. `var()` não funciona em condições de media queries: mantenha ali o literal extraído, documentado no mapa, e altere tokens dentro da regra. Não invente breakpoints padrão do framework.

Não adicione temas, fontes, ícones ou variantes ausentes. Caso haja múltiplos temas observados, respeite o contrato de tema da aplicação e explicite qualquer limitação no plano.

**Verificação:** sem colisões/redefinições indevidas, sem variáveis não resolvidas, sem valores visuais espalhados no JSX e com estilos computados equivalentes em cada estado aprovado.
