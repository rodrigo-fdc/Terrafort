**Contexto e Objetivo** Atue como um Engenheiro de Software especialista em Spec-Driven Development. Sua tarefa é escrever a documentação completa e os arquivos de especificação (SKILL.md e passos sequenciais) para uma skill chamada `design-template-site-navigation`. O objetivo desta skill é extrair a estrutura, o design e o comportamento da navegação principal (Header, Links embutidos e Menu Mobile) de um template HTML/CSS/JS de um site institucional, landing page ou corporativo, e recriá-los com perfeição em componentes React para Next.js (App Router).

**Diretrizes de Saída da Skill (O que a skill deve fazer):**

**1. Estrutura de Arquivos e Componentes** A skill deve gerar os componentes estritamente dentro de `src/shared/template/site/navigation/`. A arquitetura de componentes esperada é adaptável ao que for detectado:

- `header.component.tsx` (Barra principal, geralmente no topo)
- `mobile-drawer.component.tsx` (Menu offcanvas ou modal exibido apenas em telas menores)
- `menu-toggle.component.tsx` (Botão hamburger que controla a abertura do menu mobile)
- `nav-link.component.tsx` (Item de navegação individual)
- `navigation.config.ts` (Arquivo de configuração contendo o array de rotas e âncoras)

**2. Lista de Atividades e Regras da Skill**

- **[Topologia Dinâmica]:** Detectar como a navegação do site funciona. É apenas um Header superior? O Header muda de estado ao rolar a página (ex: de transparente para fundo sólido)? O menu vira um _drawer_ lateral ou tela cheia no mobile? A skill deve mapear e replicar esses comportamentos exatos.
- **[Estado Global e Scroll]:** Criar um hook/contexto (ex: `use-navigation-state`) para gerenciar se o menu mobile está aberto/fechado e escutar eventos de _scroll_ da janela para aplicar as classes de "Header fixo/sticky" idênticas ao template original.
- **[Navegação Híbrida e Active State]:** O componente `nav-link.component.tsx` deve ser inteligente o suficiente para lidar com links de rota (`/sobre`) usando o `usePathname()` do Next.js, e links de âncora de Landing Page (`#contato`), destacando visualmente o item ativo com base no scroll ou na URL, aplicando as cores e bordas exatas do template.
- **[Design e Espaçamentos]:** Extrair e aplicar as cores, fontes, alturas do header (que podem mudar no scroll), paddings e transições CSS originais.
- **[Abstração de Dados]:** NÃO fazer hardcode dos itens de navegação no JSX. A skill deve extrair os links de menu do template e gerar o `navigation.config.ts`, instruindo o Header e o Mobile Drawer a renderizarem os links dinamicamente via `.map()`.
- **[Rotas de Exemplo]:** Criar de 1 a 3 rotas ou seções simuladas em `src/app/(public)/(examples)/` apenas para provar que a mudança de rota e o comportamento de "active state" funcionam perfeitamente com o layout.

**3. Regras de Não Escopo (Restrições estritas)**

- NÃO criar componentes fora de `src/shared/template/site/navigation` (exceto o layout e páginas de exemplo).
- NÃO recriar componentes de conteúdo como seções (Hero, Features, Pricing) nesta skill. O foco é 100% na navegação (Header e Menu Mobile).
- NÃO forçar a criação de um `aside` (sidebar) a menos que o template seja explicitamente focado em navegação lateral constante.

**Formato de Saída Exigido:** Gere a estrutura da skill usando um pipeline de fases sequenciais (ex: Fase 0 - Reconhecimento de Topologia, Fase 1 - Extração de Tokens do Header, Fase 2 - Geração de Componentes, Fase 3 - Fiação de Estado e Roteamento), estabelecendo critérios de aceite rigorosos para cada fase para evitar alucinações.
