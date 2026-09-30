---
name: design-template-site-navigation
description: Extrair estrutura, tokens visuais, links e comportamento da navegação principal de templates institucionais, corporativos ou landing pages e recriá-los em Next.js App Router. Usar para Header, navegação híbrida por rotas e âncoras, active state e menu mobile; não para migrar conteúdo ou um design system completo.
---

# Design Template Site Navigation

## Objetivo e entrada

Executar **evidência → spec → plano → tarefas → implementação → validação → verificação** para reproduzir a navegação da fonte. Receber arquivos HTML/CSS/JS ou URL acessível, aplicação de destino e variante/página de referência quando houver mais de uma. Se faltar fonte, pedir sua localização; não inventar topologia, itens, cores ou animações.

Esta skill migra os itens de navegação reais. Não herdar a restrição de menu vazio de uma skill de shell usada anteriormente. A execução deve observar as restrições desta skill e a solicitação atual. Escrever esta documentação não autoriza aplicar uma conversão ao projeto.

## Escopo e arquitetura

Todos os componentes, hooks, contexto, tipos, configuração, estilos, adaptadores e assets próprios da navegação ficam em `src/shared/template/site/navigation/`. Assets locais podem ser importados/bundled dessa pasta; não criar componentes ou auxiliares em outros diretórios. Reutilizar assets existentes sem duplicá-los quando possível.

```text
src/shared/template/site/navigation/
  header.component.tsx
  mobile-drawer.component.tsx
  menu-toggle.component.tsx
  nav-link.component.tsx
  navigation.config.ts
  [hook/contexto, estilos e suporte local necessários]
src/app/(public)/(examples)/
  layout.tsx                       [somente se necessário]
  navigation-demo/page.tsx        [exemplo de segmento real, não nome obrigatório]
  [até 3 páginas ou seções simuladas no total]
```

- A topologia detectada decide quais componentes visuais existem. Drawer/toggle são condicionais; não gerar um drawer se a fonte usa outra solução. Se a mesma superfície serve desktop e mobile, criar um painel compartilhado local; reservar `mobile-drawer` para a superfície exclusiva de telas menores.
- Não criar `aside`/sidebar salvo navegação lateral permanente comprovada. Não confundir offcanvas transitório com sidebar constante.
- Header e drawer renderizam itens de `navigation.config.ts` via `.map()`. Nenhuma lista, rótulo, href ou árvore de menu duplicada no JSX. Logo e rótulos funcionais de controles não são itens hardcoded de menu.
- Rotas, âncoras, links externos e ações são tratados conforme o [contrato de navegação](references/navigation-contract.md). Não disfarçar ações como links `href="#"`.
- Copiar somente conteúdo pertencente à navegação. Não recriar Hero, Features, Pricing, footer, cards ou conteúdo promocional de mega menus. Preservar a estrutura de grupos e links; documentar a remoção das áreas promocionais e sua altura intrínseca.
- Exceções de localização: layouts e páginas de integração/exemplo em `src/app`, artefatos SDD no sistema existente, manifesto/lockfile quando dependência for comprovadamente necessária. Nenhum componente reutilizável é criado nessas exceções.
- Preservar o shell, conteúdo e rotas preexistentes. Não esconder o header antigo via CSS para simular integração. Usar slots/APIs existentes e ajustes mínimos de layout; se a única solução exigir editar componente externo à pasta permitida, registrar bloqueio e pedir ampliação específica de escopo antes dessa edição.
- Não inicializar outro projeto, instalar design system, state manager ou biblioteca de animação por conveniência. Respeitar gerenciador existente; npm se não houver escolha anterior.

## Pipeline sequencial

Ler o [contrato de verificação](references/verification-contract.md) no início e cada passo ao entrar na fase.

| Fase | Passo                                                             | Saída                           |
| ---- | ----------------------------------------------------------------- | ------------------------------- |
| 0    | [Reconhecimento de topologia](steps/00-topologia/STEP.md)         | Inventário e baseline           |
| 1    | [Extração de tokens e comportamento](steps/01-tokens/STEP.md)     | Matriz visual e estados         |
| 2    | [Spec, configuração e plano](steps/02-spec-config/STEP.md)        | Contratos, dados e tarefas      |
| 3    | [Geração de componentes](steps/03-componentes/STEP.md)            | Estrutura e estilo da navegação |
| 4    | [Estado, scroll e roteamento](steps/04-estado-roteamento/STEP.md) | Interações e active state       |
| 5    | [Exemplos e integração](steps/05-exemplos-integracao/STEP.md)     | 1–3 fixtures verificáveis       |
| 6    | [Verificação final](steps/06-verificacao/STEP.md)                 | Evidências e aceite             |

Não avançar após FAIL ou BLOCKED. Corrigir a causa e repetir checks afetados. N/A exige ausência comprovada na fonte; falta de ferramenta não é N/A. Não aprovar por aparência subjetiva ou pela mera existência do código. Não exigir confirmação geral a cada fase: solicitar apenas informação necessária ou ampliação de escopo realmente ausente.

## Entrega

Relatar arquivos, topologia, breakpoint mobile, estados do header, política de active state, configuração de links, URLs de exemplo e gates G0–G6. Declarar `IMPLEMENTATION COMPLETED / READY FOR VERIFY` somente quando todos os requisitos obrigatórios passarem. Em caso contrário, usar `IMPLEMENTATION INCOMPLETE`, identificando check, evidência e próximo passo concreto. Não prometer perfeição sem medições nas condições registradas.
