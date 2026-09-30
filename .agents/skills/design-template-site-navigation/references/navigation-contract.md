# Contrato de dados, links e active state

## Configuração como fonte única

`navigation.config.ts` exporta dados serializáveis e tipados. Não importa hooks nem acessa window/document. Definir tipos locais discriminados e adequados ao template, sem criar um framework de navegação.

Cada item recebe ID estável, label extraído e tipo. Campos por tipo:

| Tipo             | Campos e comportamento                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| route            | href local e regra de match exact ou segment; renderizar Next Link                                         |
| anchor           | pathname proprietário e fragment separado; renderizar URL com hash e observar alvo existente               |
| external         | URL externa original; âncora nativa; preservar target e política de rel apropriada                         |
| contact/download | mailto, tel ou download comprovado; preservar sem tratá-lo como rota Next                                  |
| action           | identificador de ação já existente, se houver controle na navegação; button nativo, nunca rota fictícia    |
| group            | label e children somente quando a fonte possui submenu; disclosure separado de link quando ambos existirem |

Registrar a correspondência ID → texto/href original → destino local → origem (arquivo/seletor). Manter ordem, agrupamento e visibilidade por variante. Se labels/hrefs mudarem para exemplos, usar configuração de demonstração explicitamente separada dentro de `navigation.config.ts`; preservar a configuração real extraída. Não mapear todos os links para a mesma fixture silenciosamente.

Um rótulo duplicado pode ser legítimo; IDs não podem repetir. Não usar índice do array como identidade. Link ausente/inválido é decisão pendente, não `#` improvisado. Resolver URLs relativas contra a URL base da referência. Protocolos executáveis como javascript: não são dados de navegação válidos a transportar.

## Destinos

- Rota interna: `next/link`, usando APIs disponíveis na versão instalada. Preservar query/hash quando compõem o destino.
- `#contato`: normalizar para `{ pathname: rotaDona, fragment: "contato" }`. Se o menu aparece em outra rota, seu href deve apontar à rota dona, por exemplo `/landing#contato`; não procurar o ID na página errada.
- Destino externo, mailto/tel e download: âncora nativa, não interceptada pelo router/scrollspy.
- Hash válido: usar getElementById após decodificação controlada, sem interpolar o fragment como seletor CSS não escapado. Fragment malformado não pode derrubar a aplicação.
- Não interceptar indiscriminadamente Ctrl/Cmd/Shift/click central ou target externo. Fechar o drawer após ativação primária válida, respeitando a modalidade detectada; abrir outra aba não deve disparar navegação na aba atual.
- APIs de action/form existentes podem ser reutilizadas. Se um CTA exigir modal/formulário fora do escopo e não houver handler no destino, registrar a dependência e pedir decisão; não gerar o formulário nem declarar o CTA funcional.

## Resolver o item ativo

A política observada na referência prevalece e precisa estar escrita na spec. Quando a fonte não define claramente um caso híbrido, usar o default abaixo e identificá-lo como decisão técnica, não como evidência visual:

1. Normalizar pathname conforme basePath, locale, case e trailingSlash realmente adotados pelo projeto. Não remover segmentos nem converter para lowercase sem regra do router. Ignorar query no match salvo comportamento explícito da fonte.
2. `usePathname()` lê pathname; não contém hash nem query e não detecta sozinho navegação entre âncoras. Hash/scroll são observados em fronteira client, com snapshot inicial seguro para SSR.
3. Match exact por padrão. Match de descendentes apenas quando configurado: `current === target || current.startsWith(target + "/")`, com `/` sempre exato. `/sobre` não ativa `/sobre-nos`. Preferir o match mais específico se houver candidatos aninhados.
4. Âncoras só concorrem quando sua rota dona é a rota atual e seu alvo existe. Após hidratação/navegação direta, um hash válido inicia a seleção; scrollspy passa a governar quando a posição é avaliada. Hash inválido não cria item ativo fictício.
5. Para scrollspy sem regra identificável na fonte: linha de ativação = borda inferior efetiva do header visível + gap extraído (zero se inexistente). Escolher o último alvo cujo topo cruzou essa linha. Antes do primeiro alvo, nenhuma âncora ativa; no fim do documento, a última âncora elegível fica ativa. Empates seguem a ordem dos alvos no DOM, registrada no mapa.
6. Se houver âncora ativa, ela prevalece sobre um item de rota da mesma página. Sem âncora ativa, usar o match de rota mais específico. Em empate de destinos idênticos, escolher o primeiro item na ordem configurada por conjunto de navegação. Se a referência marca pai e filho, registrar estado visual do grupo sem duplicar aria-current no conjunto de links folha.
7. `aria-current="page"` para rota e `aria-current="location"` para âncora. Não marcar elementos externos/ações como página ativa. Sincronizar instâncias desktop/mobile a partir do mesmo estado; cada árvore de navegação visível tem no máximo um link corrente por conjunto.

## Scroll, hash e header dinâmico

Manter um único responsável por estado compartilhado (`use-navigation-state` e provider local quando houver consumidores distantes). Observar scroll no provider/hook, não adicionar listener ou IntersectionObserver por NavLink. NavLink pode consumir o pathname via hook/provider e o estado de âncora comum.

Header fixed/sticky deve usar CSS e limiares originais. Medir altura/offset efetivos, inclusive safe-area e estados compactados. Usar ResizeObserver quando a altura muda e reagir a resize/fontes carregadas. Sticky não recebe compensação extra de fluxo; fixed recebe compensação uma única vez no layout responsável.

Preferir scroll-margin-top nos alvos ou scroll-padding no scroller, com valor derivado da altura efetiva, sem scroll duplo. No estado oculto do header, o offset deve refletir a obstrução real. Se CSS não reproduzir o comportamento observado, usar adaptação local documentada. Não desabilitar a rolagem nativa de Next Link sem implementar a alternativa completa.

Para âncora em outra rota, aguardar pathname correto e montagem do alvo antes de medir/rolar. Usar sinal de montagem/ref/observer com cleanup e condição de término; evitar setTimeout arbitrário ou polling infinito. Se o alvo não existir ao concluir a montagem da fixture, o teste falha. Na aplicação real, relatar/ignorar com segurança sem loop ou destaque fictício.

Fechar e desbloquear drawer antes de resolver scroll para a âncora. Evitar restaurar o foco ao hamburger após navegação concluída quando isso desfaria o foco do destino. Em Escape/backdrop, restaurar o foco ao trigger. Em navegação de âncora, garantir destino perceptível ao teclado sem adicionar permanentemente pontos de tabulação ao conteúdo.

Durante scroll suave programático, evitar alternância do destaque por seções intermediárias; definir seleção transitória e término observável (posição atingida/scrollend quando disponível, com fallback cancelável). Scroll manual/interrupção devolve controle ao scrollspy. Não manter seleção bloqueada indefinidamente. Reduced motion usa deslocamento imediato.

Escutar `hashchange`, `popstate`, pathname e mudanças de layout relevantes. `pushState`/`replaceState` não disparam hashchange por si sós: sincronizar o próprio handler quando usá-los. Respeitar Back/Forward e restauração do navegador. Não reescrever o hash em todo evento de scroll, salvo comportamento comprovado da referência; não poluir histórico com scrollspy.
