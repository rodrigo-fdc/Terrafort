# Checklist de fidelidade e comportamento

Defina a matriz antes de implementar: composto × variante × viewport × estado. Use PASS, FAIL ou UNKNOWN; N/A exige evidência de que o caso não existe. Qualquer FAIL/UNKNOWN em requisito aprovado impede a conclusão.

## Ambiente comparável

- Mesmos viewport, DPR, zoom, tema, idioma, conteúdo de teste, imagens e fontes carregadas.
- Desktop/mobile observados e larguras imediatamente antes/depois de cada breakpoint detectado.
- Capture estados estáveis; para animações compare também duração, atraso, easing, keyframes e estados intermediários em tempos equivalentes.
- Fixtures temporárias ficam em ambiente isolado. Não acrescente rotas, páginas ou layouts de demonstração à aplicação sem autorização.

## Estrutura e aparência

- Compare DOM renderizado, não apenas JSX: ordem dos filhos, tags, wrappers, slots, pseudo-elementos e containers que participam do layout.
- Normalize somente IDs/classes gerados e atributos sem efeito visual. Justifique wrappers/portals Radix ou Sonner. Não esconda divergências estruturais com uma normalização ampla.
- Compare valores computados de cores, bordas, fontes, sombras, filtros, opacidade, espaçamento, dimensões, alinhamento e overflow.
- Valores discretos e strings de sombras/easing devem coincidir após normalização do navegador. Geometria admite no máximo 1 CSS px de arredondamento por borda; diferenças sistemáticas falham.
- Sobreponha screenshots e inspecione o diff. Mascare apenas conteúdo realmente volátil, declarando as regiões. Não ignore diferenças do próprio componente ou fontes ausentes.
- Confirme reflow, wrapping de texto e comportamento com conteúdo longo, sem transformar o componente em seção/página.

## Composição e interação

- Nenhum primitivo recriado; refs apontam ao elemento esperado. Não existem buttons/anchors interativos aninhados.
- Modal: nome acessível, foco inicial, contenção de foco, Escape, fechamento externo conforme contrato, retorno de foco e restauração de scroll.
- Accordion: teclado, `aria-expanded`, relações trigger/content, variantes single/multiple e collapsible somente se observadas.
- Toast: origem observada, posição, empilhamento, duração e ações; anúncio acessível, fechamento e cleanup. Use primitivos locais nas ações customizadas.
- Estado controlado/não controlado e eventos encaminhados sem duplicação. Unmount/Strict Mode não deixam listeners, locks ou portals órfãos.
- Estados hover/focus/disabled e reduced motion quando aplicáveis. Ajustes de acessibilidade não visuais são documentados; conflitos visuais exigem decisão explícita.

## Qualidade e escopo

- Execute typecheck, lint disponível e build. Não use `any` ou supressões para aprovar.
- Nenhum erro de hidratação, console ou import circular. Não acesse propriedades de objetos compostos Client Components a partir de Server Components; use exports nomeados nessa fronteira.
- Audite a lista real de arquivos alterados contra o plano. Preserve tokens, exports e componentes preexistentes.
- Registre para cada linha da matriz: origem, destino, métricas, evidência e resultado.

Fidelidade pixel-perfect exige evidência comparativa; build e heurística DOM isoladamente não a comprovam. Se uma dependência obrigatória impossibilitar a estrutura observada, registre o conflito e bloqueie o item, sem alegar equivalência.
