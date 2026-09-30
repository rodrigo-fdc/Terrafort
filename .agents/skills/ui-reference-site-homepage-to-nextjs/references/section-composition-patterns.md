# Composição de seções no App Router

## Direção das dependências

`page.tsx → sections → compostos/primitivos existentes`.
`page.tsx → _mock-data.ts → tipos de seção`.

Seções não importam `app`, não criam versões locais de Button/Card/Accordion e não sobrescrevem seus estilos internos. Passe variantes e slots já suportados. Incompatibilidade de contrato deve ser resolvida na etapa anterior.

Estrutura ilustrativa, somente para seções detectadas:

```text
src/app/(public)/
  page.tsx
  _mock-data.ts
src/shared/components/sections/
  homepage.types.ts
  hero.component.tsx
  features.component.tsx
  testimonials.component.tsx
  testimonials.client.tsx
  homepage.module.css
```

## Orquestrador servidor

```tsx
import { HeroSection } from "@/shared/components/sections/hero.component";
import { FeaturesSection } from "@/shared/components/sections/features.component";
import { hero, features } from "./_mock-data";

export default function HomePage() {
  return (
    <>
      <HeroSection data={hero} />
      <FeaturesSection data={features} />
    </>
  );
}
```

O exemplo pressupõe `main` no layout existente. Caso não exista, use um único `main` nesta página. O fragmento não deve remover wrappers necessários a sticky, grid ou sobreposição: componha-os nas seções responsáveis, respeitando o mapa aprovado.
O grupo `(public)` organiza arquivos; não adiciona `/public` à URL.

## Seção servidor

```tsx
import { Typography } from "@/shared/components/ui/typography.component";
import type { FeaturesSectionData } from "./homepage.types";

export function FeaturesSection({ data }: { data: FeaturesSectionData }) {
  return (
    <section id={data.id} aria-labelledby={`${data.id}-heading`}>
      <Typography as="h2" id={`${data.id}-heading`}>
        {data.heading}
      </Typography>
      {/* Renderize data.items com o composto real e as props verificadas. */}
    </section>
  );
}
```

Esse fragmento mostra somente a fronteira arquitetural. A implementação entregue deve renderizar todos os itens com os compostos existentes, sem comentários substituindo conteúdo. Não presuma um export `FeatureCard` que não foi verificado.

## Ilhas de interação

Use `*.client.tsx` apenas para estado, eventos, observers, browser APIs ou adaptação de uma biblioteca existente. Uma seção servidor pode renderizar uma ilha cliente e passar conteúdo servidor por slots/children.

Dados que atravessam essa fronteira devem ser serializáveis. Crie callbacks dentro da ilha cliente; não passe funções arbitrárias do Server Component. Importe partes nomeadas de APIs compostas cliente quando a composição ocorrer no servidor; evite acessar `Modal.Content` ou `Accordion.Item` através de um objeto cliente no servidor.

Não coloque `"use client"` em `page.tsx`, no barrel inteiro ou em seções estáticas por conveniência. Não use `ssr: false` para esconder problemas de hidratação ou retirar o hero do HTML inicial.

## Rolagem e animação

Reutilize o provider de scroll e as bibliotecas disponíveis. Delimite seletores/refs à raiz da seção. Não duplique Lenis, ScrollTrigger global ou listeners do header.
Conteúdo fica disponível antes da hidratação. Meça dimensões após fontes/mídia quando necessário, use observers limitados e limpe tudo no unmount, inclusive em Strict Mode.
Preserve pin spacers, relações com o ancestral de scroll e reserva de espaço. Não anime altura/largura arbitrariamente quando a referência usa transform; replique o comportamento medido.

## Integração funcional

CTAs devem navegar ou acionar capacidades já existentes. Se a referência exige modal, formulário, carrossel ou accordion ainda indisponível, bloqueie essa dependência; não entregue um botão sem ação nem reconstrua o composto dentro da seção.
A página não cria endpoints, serviços ou envio de dados. Integrações reais só são conectadas quando já existem e estão dentro da autorização do usuário.
