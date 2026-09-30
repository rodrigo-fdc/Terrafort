# Fase 4 — Menu, scroll e animações

## Entrada

G3 aprovado e catálogo de efeitos completo.

## Atividades

1. Implementar toggle em button com type, aria-expanded e aria-controls; não usar âncora fictícia. Menu permanece sem itens/links. Compartilhar estado pelo hook/context local já definido.
2. Reproduzir modalidade observada. Em menu modal: nome acessível, foco inicial no botão fechar, contenção de Tab/Shift+Tab mesmo vazio, Escape, restauração de foco e bloqueio de interação com fundo. Não aplicar focus trap a navegação não modal. Backdrop segue o mapa. Rótulos acessíveis são permitidos.
3. Restaurar valor anterior do scroll lock no fechamento/unmount; ao atravessar breakpoint para desktop, fechar e limpar lock/inert/estados. Garantir controle de fechamento acessível e sem foco em elementos ocultos.
4. Implementar estados do header/logo por scroll sem hydration mismatch, medindo o limiar original. Registrar cleanup de listeners/observers.
5. Ativar somente os efeitos estruturais:
   - GSAP: importar/registrar plugins necessários no cliente, escopar seletores a ref local, criar contexto/matchMedia quando aplicável e reverter timelines, pin spacers e ScrollTriggers no cleanup.
   - Framer Motion/Motion: usar pacote/imports compatíveis comprovados, wrapper client, variants e viewport mapeados. Não passar props de animação ao elemento DOM comum.
   - Webflow: IDs/classes não ativam IX2 por si só. Usar configuração/runtime isolável comprovado ou traduzir apenas interações estruturais para adaptador local com equivalência de gatilhos, geometria e tempos documentada. Não carregar o bundle inteiro para operar sobre document/global de todas as rotas. Se a fidelidade depender de código indisponível, BLOCKED.
   - data-scroll/outras classes: conectar ao consumidor identificado ou adaptador equivalente documentado. Não considerar preservação literal de atributo como efeito funcionando.
6. Conteúdo continua acessível sem animação. Respeitar prefers-reduced-motion: remover transformações de movimento, pin/scrub desnecessários e estados invisíveis persistentes; preservar toggle funcional. Não manter listeners duplicados após remount/Strict Mode.

## Verification Gate G4

- G4.1: automatizar abrir/fechar por botão, Escape, backdrop conforme fonte, Tab/Shift+Tab, retorno de foco e restauração do scroll. Quantidade de links do menu = 0.
- G4.2: abrir no mobile e redimensionar para desktop não deixa overlay/scroll lock/inert; desmontar e remontar não duplica listeners ou efeitos observáveis.
- G4.3: cada efeito estrutural responde ao trigger correto; comparar propriedades, início/fim e parâmetros aos valores do catálogo, usando clock controlado/seek quando suportado. Não comparar timing por espera arbitrária.
- G4.4: topo/scroll trocam logo/header corretamente; reduced motion mantém elementos visíveis e controles funcionais; nenhuma falha de hydration/console.
- G4.5: typecheck/lint passam e a matriz de geometria continua dentro da tolerância, inclusive em estados animados estabilizados.
