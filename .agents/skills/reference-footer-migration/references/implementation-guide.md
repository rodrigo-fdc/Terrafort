# Reconstrução idiomática do footer

Leia durante PLAN/IMPLEMENT quando decidir composição, conteúdo, links, mídia e movimento. APIs concretas devem seguir os guias da versão Next.js instalada e as convenções do projeto.

## Composição e ownership

Audite a cadeia page → layout → shell → Footer. Reaproveite o Footer real, inclusive quando existir apenas sua casca. Substitua sua implementação ou integre-o no local apropriado conforme o plano, mantendo um único footer global. Não inclua outro footer em `page.tsx` para preencher uma casca que permanece montada no layout.

Reutilize Container, Section, Button, Link, Logo, Icon e tipografia existentes quando seus contratos forem adequados. Não force componentes que alterem semântica, geometria ou comportamento. Crie um novo compartilhado somente com responsabilidade reutilizável clara e dentro do escopo.

Exemplo possível, sem impor caminho ou quantidade de arquivos:

```text
components/layout/Footer.tsx
components/footer/FooterNavigation.tsx
components/footer/FooterSocialLinks.tsx
content/footer.ts
```

Um footer simples pode precisar apenas do componente principal, estilos e dados. Não divida cada coluna/div em componente nem replique primitivas por conveniência. Evite alterações em componentes globais que provoquem regressões fora do footer; prefira props/variantes existentes ou estilos locais.

## Conteúdo e branding

Use dados simples e tipados. O esquema abaixo é ilustrativo, não um conteúdo pronto:

```ts
type FooterLink = Readonly<{
  id: string;
  label: string;
  href: string;
  external?: boolean;
  newTab?: boolean;
}>;

type FooterContent = Readonly<{
  brand: { name: string; logoSrc?: string; referenceOnly: boolean };
  statement?: string;
  navigation: readonly FooterLink[];
  contact: { address?: string; email?: string; phone?: string };
  socials: readonly FooterLink[];
  legal: readonly FooterLink[];
  copyright: string;
}>;
```

O objeto `footerContent` pode ficar em configuração equivalente já existente ou em `src/content/`. Use IDs estáveis, valores determinísticos e dados serializáveis. Não crie CMS, fake-data library, timestamps aleatórios ou configurações complexas sem necessidade. Nome antigo, contatos, URLs e textos referenciais ficam nesse objeto; cores/fontes ficam nos tokens apropriados, não no JSX.

Se Logo existente tiver branding embutido incompatível com independência futura, use seu contrato configurável quando disponível; proponha a menor adaptação diretamente necessária. Não espalhe marca antiga em arquivos/componentes por causa de um logo legado.

## Server e Client

Footer é Server Component por padrão. Links, texto, grids e hover CSS não exigem `"use client"`.

Estado, hooks, eventos e browser APIs justificam uma ilha cliente localizada. Um contador de scroll ou accordion não torna todo o footer cliente. Passe dados serializáveis ou children/slots; callbacks de evento são definidos na ilha cliente. Importe partes cliente por exports compatíveis com a fronteira Server/Client.

Não use acesso a `window`, matchMedia, dimensões ou datas variáveis durante renderização SSR. Limpe listeners, observers, timers e contextos de animação no unmount e em Strict Mode. Reutilize o scroll provider instalado; não crie outro smooth-scroll global.

## Links

- Internos: prefira `next/link` ou o componente local que o utilize corretamente.
- Externos: preserve `<a>` e a semântica observada. Não force nova aba; use target/rel apenas quando necessário à ação ou convenção aplicável.
- Email/telefone: links mailto/tel reais, com label compreensível.
- Âncoras: IDs reais, compensação de header quando necessária e comportamento de foco apropriado.
- Destino ausente: pendência explícita no contrato/relatório. Não use `href="#"`, invente URL ou entregue CTA aparentemente funcional sem ação. Um label temporariamente não navegável deve ser identificado como pendência, não como implementação completa de um link.

## Assets e CSS

Inventarie assets existentes e capturados antes de copiar algo. Preserve SVG quando adequado e identifique imagens/logos puramente referenciais como substituíveis. Use Next Image quando sua otimização, dimensões e configuração forem apropriadas; preserve proporções, cropping, alt e responsividade. Não duplique recursos ou modifique configuração global sem necessidade prevista no plano.

Footer deve consumir a stack existente: CSS Modules, Vanilla ou Tailwind. Limite selectors ao footer, mapeie tokens semanticamente equivalentes e acrescente somente os tokens necessários. Não copie reset/global CSS legado nem recrie o design system inteiro.

## Movimento e progressive enhancement

Analise intenção antes de escolher runtime: underline, reveal, marquee, accordion, contador e pin são capacidades diferentes. Separe ação do usuário e animação resultante.

Preferência: CSS → APIs React/Next simples → biblioteca instalada → nova dependência indispensável e justificada. Não importe Webflow runtime, jQuery, GSAP ou AOS automaticamente. Adapte seletores ao componente e não dependa de globals do site capturado.

Para reveal:

1. Renderize texto/links visíveis no HTML inicial.
2. Ative a animação somente depois de o runtime estar disponível e a seção poder concluí-la previsivelmente.
3. Não deixe estado oculto persistente após falha de inicialização/execução. Reponha o estado visível em cleanup ou falha e impeça que estados finais ocultem permanentemente conteúdo necessário.
4. Com reduced motion, preserve conteúdo e ação; elimine ou simplifique movimento não essencial.
5. Teste sem JS para demonstrar acesso ao conteúdo estrutural. Interações que dependem de JS podem ter fallback semântico explícito, como navegação disponível ou disclosure nativo quando adequado.

Marquees devem preservar leitura e não duplicar anúncios de leitores de tela: clones decorativos usam aria-hidden. Ofereça pausa quando necessária à acessibilidade do movimento contínuo. Nenhuma ação pode depender exclusivamente de hover; preserve teclado/foco/toque.

## Acessibilidade

Use `<footer>` e landmarks apropriados; identifique múltiplas navegações com labels distintos. Preserve ordem de foco significativa, links focáveis e focus visível. Ícones decorativos são ocultos da árvore acessível; controles por ícone precisam de nome acessível. Não aninhe elementos interativos.

Confira contraste, alternativas de mídia, estados expanded/controls de disclosures e foco em overlays reais. Corrija problemas semânticos da referência mantendo composição e intenção visual quando possível. Registre diferenças necessárias, em vez de reproduzir defeitos por fidelidade ao legado.
