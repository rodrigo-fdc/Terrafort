# Plano aprovado — Gate 3

Autorização recebida: “Pode gerar os códigos”.

## Preparação concluída

Fonte: https://www.thirdway.com/. Inventário em inventory.md; evidências desktop/mobile em evidence/. Stack: Next16 App Router, Tailwind4 e CSS Modules. Tokens globais importados por src/app/globals.css, com aliases @theme inline sem substituir o tema ou body existentes. ui-tokens.css não estiliza elementos globais; centraliza variáveis e registra fontes.

Dependências instaladas: class-variance-authority0.7.1, clsx2.1.1, lucide-react1.48.0. cn() criado em src/shared/utils/cn.ts. Waldenburg reutiliza o arquivo local existente; Marist Book foi obtida do asset da fonte e salva em src/shared/components/ui/assets/marist-book.woff2. A preparação antecedeu a geração dos componentes; o resultado atual está em status.md.

## Arquivos de componentes propostos

Todos sob `src/shared/components/ui/`, com exports nomeados via index.ts:

1. `button.component.tsx` — ação com seta, texto e compacto sólido; tons claros/escuros observados.
2. `icon-button.component.tsx` — quadrado e cápsula contornada; ref no button nativo.
3. `text-link.component.tsx` — link primitivo sublinhado, sem rotas ou lógica de navegação embutidas.
4. `typography.component.tsx` — body, small, large, heading sans e display serif; sem texto de marketing.
5. `input.component.tsx` — campos text/email transparentes; props nativas e ref.
6. `textarea.component.tsx` — campo de mensagem reutilizável; sem lógica de envio.
7. `checkbox.component.tsx` — checkbox nativo16px, checked e foco; consentimento não embutido.
8. `select.component.tsx` — trigger/listbox de campo, opções por props; teclado e associação acessível.
9. `badge.component.tsx` — cápsulas numéricas standard/data/ano, sem contador de negócio.
10. `separator.component.tsx` — linha clara/escura24%.
11. `label.component.tsx` — rótulo associado via htmlFor.

Arquivos de suporte: CSS Modules locais e receitas CVA quando úteis; nenhum hex, fonte ou medida visual extraída duplicada no JSX/CSS de componentes. `ui-tokens.css` permanece fonte única. Usar forwardRef nos controles interativos; `"use client"` somente onde necessário.

## Decisões e limites

- Reproduzir a aparência dos primitivos sem migrar formulário de contato, carrossel, cabeçalho, menu, footer ou seção.
- Cores de hover não inventadas: CTA anima seta e mantém a cor. A referência usa SVG próprio; lucide-react foi instalada conforme skill, sem obrigar troca de ícones comprovados.
- Aplicar aos campos o anel de foco2px/offset2 já observado no checkbox como adaptação de acessibilidade explícita, pois os inputs originais removem outline.
- A altura44.8px do campo mobile resulta do line-height20.8px + padding12px em cada lado; desktop53px é a linha do formulário medida. Wrappers e dimensões da página não serão reproduzidos.
- Não alterar o shell nem migrar seus estilos atuais para estes componentes nesta tarefa.

## Aceite após autorização

CVA tipado, refs válidas, props/eventos nativos, tokens globais sem regressão, verificações de teclado para select/checkbox, comparação visual mobile/desktop, lint/typecheck/build e relatório dos exports. A aprovação deste plano autoriza gerar os11 primitivos; a aprovação foi recebida e as fases4–5 foram executadas.
