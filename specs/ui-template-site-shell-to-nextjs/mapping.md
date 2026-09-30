# Mapeamento e decisões

## Topologia

Header fixo → main com seis wrappers → footer. Os seis wrappers são hero, equipes, apresentação, projetos, parceiros e journal, nesta ordem. Nomes são IDs técnicos, sem copy renderizada. Nenhuma div de conteúdo vira componente. Só o hero recebe o placeholder de teste.

| Região          | Valores preservados                                                                                                                                 | Remoções de conteúdo                                         |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Header          | fixed, top 0, z-index 40; altura 76 mobile / 84 desktop; padding 16/20 + safe-area; linha 44                                                        | relógio, CTA, notícias                                       |
| Painel          | branco, raio 4; mobile max-width 361, desktop 172 fechado / 680 aberto; linha 44, pl 12, pr 6                                                       | todos os links e cartões                                     |
| Navegação vazia | padding 24/24 e horizontal 18; desktop 23/27 e horizontal 16; max-height 100dvh−76/84                                                               | altura intrínseca dos itens não é replicada                  |
| Container       | width 100%, max-width 1920, margin-inline auto; padding 16/24/32/48 nos breakpoints 768/1024/1920                                                   | nenhum                                                       |
| Hero            | height 155svh, margin-top −header-space; header-space 84/96 em 1024; fundo warm-black da camada de mídia                                            | vídeos, máscaras de introdução, título, ícone de scroll      |
| Equipes         | padding 98/64 mobile, 124/124 a partir de 1440                                                                                                      | títulos, cards, Swiper, controles                            |
| Apresentação    | padding 64/64 mobile, 98/98 a partir de 1440                                                                                                        | textos                                                       |
| Projetos        | wrapper height calc(4 * 100lvh), overflow hidden, data-header-scheme light                                                                          | itens de projetos e pin-spacer gerado, progress bar          |
| Parceiros       | padding 98/24 mobile, 0/0 a partir de 1440                                                                                                          | logos de clientes/carrossel                                  |
| Journal         | padding 98/98 mobile, 124/124 a partir de 1440                                                                                                      | cards, textos, links                                         |
| Footer          | data-header-scheme light; faixa de mídia 480 mobile/400 em 768/606 em 1024; áreas vazias, faixa mobile 351; desktop 693/691 em 1440, max-width 1920 | mídia, heading, listas, contador, logo de conteúdo no footer |

Os breakpoints 400 e 1440 das declarações iniciais de container são sobrescritos por max-width 1920, mas foram incluídos na matriz de referência. Viewports em `evidence/source-matrix.json`. Alturas dependentes de texto/menu/footer mobile reduzem naturalmente; alturas declaradas de wrappers são preservadas. Padding do main compensa header-space uma vez; hero o anula como na origem.

## Animações estruturais preservadas

- Entrada do header: GSAP yPercent −120 → 0, 0.65s, power3.out, delay 0.15s (fallback original fora da intro de vídeo). clearProps e cleanup por contexto.
- Menu: Motion width/height auto, 0.5s, cubic-bezier(0.35,0,0.35,1). Conteúdo opacity 0→1, 0.3s, delay 0.12 na abertura. Backdrop warm-black/60, blur 8, opacity 0→1, 0.35s linear.
- Scroll suave Lenis lerp 0.13, smoothWheel; escopado ao ciclo de vida do shell; destroy no unmount; sem Lenis em reduced-motion. Atributo data-lenis-prevent mantido no menu.
- data-header-scheme repassado por SectionWrapper e consumido pelo header com limiar top <= 44 < bottom. O logo é SEMPRE warm-black no original; somente relógio/CTA (removidos) trocam cor. Não inventar troca de cor do logo.

## Efeitos excluídos por alvo removido

ScrollTrigger de pin/scrub dos projetos depende de pelo menos dois `.project-item`; código original retorna antes de criá-lo quando há menos de dois. Zero itens no shell: nenhum pin ou timeline artificial. Height declarada do wrapper permanece. Hero fade de indicativo de scroll, máscaras sobre vídeo, parallax de mídia, split-text, Swipers, marquees, contador de distância e transições de links pertencem ao conteúdo removido. Não instalar ScrollTrigger para timelines inexistentes. Ausência de animação de entrada genérica das seis seções: não adicionar fade inventado.

## Acessibilidade e isolamento

Menu se comporta como modal com backdrop, Escape e scroll lock. Completar foco/inert/retorno ao botão para uso mesmo sem links. Fechar ao mudar breakpoint desktop, mesmo que a origem permita manter aberto. Tema fixado no wrapper; fonte local; nenhum reset global. O root layout e página permanecem intactos até confirmação específica após preview.
