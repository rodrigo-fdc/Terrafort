Contexto e Objetivo
Atue como um Engenheiro de Software especialista em Spec-Driven Development. Sua tarefa é escrever a documentação completa e os arquivos de especificação (SKILL.md e pastas de passos) para uma nova skill chamada ui-template-site-shell-to-nextjs.
O objetivo dessa skill é extrair o esqueleto estrutural (shell), as responsividades e os wrappers de animação (GSAP/Framer Motion/Webflow) de um template HTML/CSS/JS de um site institucional/marketing, e recriá-lo em uma aplicação Next.js (App Router).

Diretrizes de Saída da Skill (O que a skill que você vai criar deve fazer):

1. Estrutura de Arquivos e Componentes
   A skill deve gerar os componentes estritamente dentro de src/shared/template/site/. A lista canônica de componentes sugeridos é:

site-shell.component.tsx (Orquestrador de layout vertical)

header.component.tsx (Top bar, frequentemente sticky/fixed)

footer.component.tsx

mobile-menu.component.tsx (Drawer ou modal para navegação mobile)

logo.component.tsx

section-wrapper.component.tsx (Componente genérico que repassa classes de animação e espaçamento vertical)

2. Lista de Atividades e Regras da Skill

[Tema e Ícones]: Detectar o tema padrão (light/dark), fixando-o como único. Detectar e instalar a biblioteca de ícones utilizada.

[Topologia Vertical]: Mapear as seções verticais do template. Em vez de criar um componente para cada div, a skill deve mapear as áreas semânticas (Header, Main Flow, Footer) e manter as áreas internas vazias.

[Espaçamentos e Tokens]: Extrair e replicar exatos tamanhos, paddings e margins. Prestar atenção especial ao padding interno das seções verticais e larguras máximas (max-width) dos containers de conteúdo.

[Animações e Scroll]: Se o template original utilizar GSAP, Framer Motion ou classes baseadas em scroll (ex: data-scroll), a skill deve capturar esses atributos e repassá-los para o section-wrapper.component.tsx, garantindo que os gatilhos de animação da estrutura base sejam preservados.

[Navegação Mobile]: Replicar o botão de menu (hamburger) no Header, seu estado de abertura (usando hook/context) e o comportamento visual do menu mobile (modal/offcanvas). O menu deve ficar sem itens de link, contendo apenas a casca visual e o toggle.

[Logo]: Replicar o componente de logo, respeitando posicionamento no Header e eventuais variações (ex: logo que muda de cor quando o header rola a página).

[Roteamento]: Criar um grupo de rotas em src/app/(public), aplicando o shell em src/app/(public)/layout.tsx e uma página de teste em src/app/(public)/page.tsx com uma div simples escrita "Conteúdo da Landing Page".

3. Regras de Não Escopo (Restrições estritas)

NÃO criar nenhum componente de UI isolado (botões, cards, modais) fora da pasta de shell.

NÃO popular itens de menu, links ou textos de marketing.

NÃO alterar a página raiz pré-existente sem confirmar com o usuário, garantindo que o shell funcione de forma isolada primeiro.

NÃO tentar replicar o design system inteiro; focar apenas nos tokens que constroem a estrutura (tamanhos de header, z-indexes, breakpoints e paddings de seção).

Formato de Saída Exigido:
Gere a estrutura da skill usando o padrão de pipeline de fases (ex: Fase 0 - Reconhecimento, Fase 1 - Mapeamento, etc.), garantindo que haja um "Verification Gate" determinístico no final de cada passo para evitar que a IA avance com erros.
