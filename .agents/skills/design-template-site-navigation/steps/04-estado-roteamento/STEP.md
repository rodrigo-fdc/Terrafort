# Fase 4 — Fiação de estado, scroll e roteamento

## Entrada

G3 aprovado; seguir o contrato de navegação, sem reimplementar políticas divergentes em cada link.

## Atividades

1. Implementar hook/contexto local único para open/close/toggle, estado do header e âncora ativa. Manter subscriptions compartilhadas; usar rAF/IntersectionObserver e ResizeObserver conforme necessário. Callbacks de scroll não causam setState em cada pixel quando o estado não muda.
2. Reproduzir fixação/sticky/compactação nos limiares exatos e classes medidas. Escutar scroll da janela quando esse é o scroller original; scroller diferente deve ser documentado. Não introduzir posição fixed por conveniência.
3. Conectar usePathname de Next à seleção de rotas e ao reset necessário na navegação. Implementar observação de hash e scroll separadamente. Cuidar de SSR, rewrites e exigência de Suspense conforme documentação da versão instalada; não ler window durante renderização no servidor.
4. Implementar regras de âncora da mesma página e de outra rota, scrollspy determinístico, offset dinâmico do header e histórico. Scroll passivo não navega; target ausente não causa loop. Fechamento do drawer/desbloqueio precede scroll programático.
5. Drawer modal: foco inicial útil, Tab/Shift+Tab contidos, Escape, backdrop conforme origem, fundo inert e retorno ao trigger em cancelamento. Painel não modal não recebe aria-modal/focus trap artificiais. Se links navegam, transferir foco coerentemente ao destino em vez de restaurá-lo cegamente ao toggle.
6. Fechar e liberar efeitos quando cruza breakpoint mobile → desktop, muda rota, desmonta ou interrompe transição. Restaurar valores anteriores de overflow/inert, não defaults arbitrários. Reutilizar runtime de scroll já ativo; não criar segunda instância Lenis/GSAP global.
7. Cancelar rAF, observers, listeners e timelines no cleanup, inclusive Strict Mode e navegação cliente. Não reiniciar runtime já destruído durante limpeza de scroll lock. Reduced motion mantém todas as ações funcionais com movimento mínimo/imediato.
8. Se houver dropdown, testar divulgação via teclado e touch; navegação de site comum não usa role=menu sem implementar o contrato completo de teclado correspondente.

## Verification Gate G4

- G4.1: exact/descendente/externo/âncora passam testes positivos e negativos; usePathname não é usado como fonte do hash.
- G4.2: scroll manual, deep link, cross-route hash, Back/Forward e clique com modificador respeitam seleção/URL/foco; no máximo um link corrente por conjunto.
- G4.3: modalidade, teclado, resize, fechamento e scroll lock funcionam; dois ciclos de unmount/remount não acumulam subscriptions ou efeitos observáveis.
- G4.4: header no topo/limiares/direções e alvos sob header dinâmico correspondem às medidas; sem salto ou oscilação não presentes na fonte.
- G4.5: reduced motion, SSR/hydration, lint e tipos passam; parâmetros e estados de animação possuem evidência, não só classes copiadas.
