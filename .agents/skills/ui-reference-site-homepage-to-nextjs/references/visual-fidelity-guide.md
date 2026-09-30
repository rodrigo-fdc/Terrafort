# Fidelidade visual, ritmo e rolagem

## Matriz e critérios

Antes de implementar, defina `Seção × Viewport × Estado`, com origem, destino e evidência. Cubra desktop/mobile e B−1/B/B+1 para cada breakpoint B relevante. Use os mesmos conteúdo, imagens, fontes, DPR, zoom e preferência de movimento.

Critérios definidos antes da comparação:

- Ordem das seções, âncoras, quantidade de itens e hierarquia de conteúdo: igualdade.
- Cores, fontes, raios, sombras e easing: equivalência computada após normalização do navegador.
- Bordas de caixas e espaçamentos: até 1 CSS px de arredondamento; não aceite desvios acumulados ao longo da página.
- Interações e transições: mesmos gatilhos, sequência, duração e estados observados, respeitando acessibilidade.

PASS exige todas as linhas aplicáveis. UNKNOWN/FAIL bloqueiam o Gate 5. N/A exige ausência comprovada. Build sozinho não valida aparência.

## Ritmo vertical

Compare screenshots completos e por seção, com overlay/diff. Meça top/bottom de cada seção em coordenadas do documento, incluindo padding interno e distância entre conteúdo, não apenas altura total.
Verifique margens assimétricas, margin collapse, gaps, sobreposições negativas, gutters, containers, quebra de texto, proporção de mídia e espaço reservado antes de imagens/fontes carregarem.
Capture o fluxo natural e os estados de scroll relevantes. Pin spacers e blocos sticky não podem ser removidos apenas para simplificar o JSX.

## Tokens e CSS agnóstico

Use `--ui-*` e `--nav-*` existentes para cores, tipografia, medidas e compensações que já tenham significado equivalente. Não altere tokens globais para ajustar uma seção.
Se houver medidas exclusivas de composição sem token equivalente, proponha no plano variáveis locais `--ui-home-<secao>-*`, declaradas somente na classe raiz da seção e com valores medidos. Esses tokens locais não podem redefinir a base nem esconder a falta de um primitivo/composto.

- Tailwind: use classes estáticas que consumam variáveis; não gere nomes de classes dinamicamente por concatenação.
- CSS Modules: mantenha o módulo na pasta sections e passe classes aos wrappers, sem atingir internals de compostos.
- Vanilla: prefixe os seletores e limite-os à seção. Nenhum reset global.

Use breakpoints literais medidos nas media queries: `var()` não é válido em suas condições. Tokens responsivos podem mudar dentro dessas regras.
Não edite configurações Tailwind ou `globals.css`; se a integração realmente exigir isso, solicite mudança explícita de escopo.

## Empilhamento e navegação existente

Mapeie stacking contexts e a ordem relativa entre seções, header e overlays existentes. Não resolva conflitos usando z-index arbitrariamente alto.
Confira se o shell já compensa header fixo. Aplique `scroll-margin-top` a âncoras usando o token real de altura/offset da navegação somente onde necessário.
Teste links para âncoras, back/forward e chegada direta com hash. Evite IDs duplicados e quebras causadas por header de altura variável.

## SSR, mídia e acessibilidade

Mantenha headings e conteúdo principal no HTML inicial. Preserve um único h1 quando a estrutura da referência permitir e uma hierarquia acessível; registre correções semânticas que não alterem a geometria.
Use mídia existente ou URLs permitidas pela configuração atual. Não adicione domínios ao Next Image nem baixe assets fora do escopo silenciosamente. Ausência de recurso indispensável bloqueia a fidelidade.
Em movimento reduzido, disponibilize todo o conteúdo sem animações obrigatórias. Limpe observers, listeners e contextos GSAP/Motion no unmount. Evite hidratação dependente de largura, data ou valores aleatórios.

## Entrega da verificação

Registre comandos e resultados de typecheck, lint e build; URL local testada; screenshots/métricas; links e interações conferidos; alterações de conteúdo e desvios autorizados.
Máscaras só podem ocultar regiões realmente voláteis, explicitadas no relatório. Não mascare diferenças de layout, fontes ou componentes.
Falhas preexistentes e bloqueios externos continuam sendo limitações, não checks aprovados.
