# Checklist de inspeção da URL

Usar nas fases 0–2. Complementa [design-tokens-mapping.md](design-tokens-mapping.md); antes da geração, ler [component-templates.md](component-templates.md).

## Evidências

- [ ] Registrar URL inicial/final, data, navegador, viewport, DPR, tema e estado observado.
- [ ] Aguardar fontes e registrar famílias declaradas versus fontes carregadas. `font-family` computada sozinha não prova qual arquivo desenhou o glifo.
- [ ] Inspecionar títulos/corpo: família, peso, tamanho, line-height, tracking, kerning e font-feature-settings.
- [ ] Inspecionar controles visíveis: cor, fundo/gradiente, bordas, radius, sombra, padding, gap, min-height e dimensões.
- [ ] Registrar seletor, classes e valores computados de cada variante; não converter automaticamente um valor frequente em token sem contexto semântico.
- [ ] Observar hover, foco por teclado e disabled/checked/invalid apenas quando existentes. Não submeter formulários para obter estados.
- [ ] Diferenciar `:focus` programático de `:focus-visible` por teclado. Registrar pseudo-elementos e seletores de ícones quando relevantes.
- [ ] Repetir a inspeção em mobile/desktop e nos breakpoints que alterem os primitivos.
- [ ] Identificar badges/chips pela evidência visual, não apenas pelo nome de classe. Um link dentro do header não autoriza migrar a navegação.
- [ ] Registrar estados inacessíveis como pendentes, sem inventar estilos ou componentes.

| Primitivo                   | Variantes          | Estados (Hover/Focus) | Seletor / evidência | Tokens propostos |
| --------------------------- | ------------------ | --------------------- | ------------------- | ---------------- |
| A preencher a partir da URL | Somente observadas | Medido ou pendente    | DOM e viewport      | `--ui-*`         |

## Script de apoio

Executar no CWD da aplicação. Requer `playwright` instalado no ambiente e Chromium disponível; não instala dependências automaticamente. Pode usar um módulo externo via `PLAYWRIGHT_MODULE=/caminho/playwright/index.mjs`.

```sh
node .agents/skills/ui-reference-site-primitives-to-nextjs/scripts/extract-url-styles.mjs https://example.com --output /tmp/ui-styles.json --viewport 1440x900
```

`--states` captura hover e foco programático, sem cliques ou envio de formulários. `--selector` restringe o DOM, `--limit` limita amostras, `--browser-path` escolhe o executável. O JSON é evidência inicial, não uma classificação automática de variantes. O script não percorre iframes, shadow roots ou outras páginas.

## Integração executável

O documento de mapeamento reproduz o texto solicitado. Ao aplicá-lo, usar sintaxe válida para o arquivo de destino: em CSS, `@import "../../shared/components/ui/ui-tokens.css";` a partir de `src/app/globals.css`; em TSX, `import "@/shared/components/ui/ui-tokens.css";` se o alias existir. Não inserir um import JavaScript dentro de CSS.

Para Tailwind v3, preservar `theme.extend`. Em Tailwind v4 com configuração em CSS, mapear variáveis com `@theme inline`, preservando o tema existente; não presumir que um novo `tailwind.config.ts` será carregado automaticamente. Exemplo mínimo, somente após extrair o token:

```css
@theme inline {
  --color-ui-primary: var(--ui-primary);
}
```

Assim, `bg-ui-primary` referencia o token global. Confirmar o valor com `getComputedStyle` numa amostra renderizada antes do Gate 2. Referência: [Tailwind — Theme variables](https://tailwindcss.com/docs/theme).

## Expansão futura

Reservado: captura de pseudo-elementos, navegação assistida em múltiplas páginas e catálogo de breakpoints. Esses recursos não estão implementados no script base.
