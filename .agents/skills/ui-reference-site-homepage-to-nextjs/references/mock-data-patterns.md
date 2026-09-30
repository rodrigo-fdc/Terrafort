# Dados tipados e determinísticos

## Fidelidade de conteúdo

O nome `_mock-data.ts` não autoriza substituir todo o texto original. Preserve textos, ordem, quantidade de itens, CTAs e mídia pública disponível da referência quando sua reprodução fizer parte da tarefa.
Use dados plausíveis apenas em lacunas ou quando solicitado. Identifique cada substituição no plano. Não atribua depoimentos fictícios a pessoas reais, não invente métricas como resultados comprovados e não apresente preços fictícios como oferta vigente.

Mantenha comprimento, estrutura e distribuição semelhantes quando um mock for necessário, pois texto altera altura e quebras. Não use lorem ipsum indiscriminadamente. Dados de demonstração devem ser identificáveis como tais.

## Organização

`src/app/(public)/_mock-data.ts` exporta objetos/arrays estáticos, sem fetch, bibliotecas de fake data, `Math.random()`, timestamps de execução, callbacks, JSX ou instâncias de classes.
Use IDs estáveis e chaves de React derivadas deles. Armazene datas como strings determinísticas e valores formatados quando a formatação influenciar o layout. URLs devem ter destino existente ou ação explicitamente especificada; evite `href="#"` como CTA fictício.

Tipos compartilhados podem ficar em `src/shared/components/sections/homepage.types.ts`. Seções recebem os dados por props e não importam arquivos da camada `app`.

```ts
// sections/homepage.types.ts
export type FeatureItem = Readonly<{
  id: string;
  title: string;
  description: string;
}>;

export type FeaturesSectionData = Readonly<{
  id: string;
  heading: string;
  items: readonly FeatureItem[];
}>;
```

```ts
// app/(public)/_mock-data.ts
import type { FeaturesSectionData } from "@/shared/components/sections/homepage.types";

// Exemplo didático: substitua pelo inventário e conteúdo aprovados.
export const features = {
  id: "features",
  heading: "Como trabalhamos",
  items: [
    {
      id: "discovery",
      title: "Entendimento do projeto",
      description: "Organizamos objetivos e necessidades antes de definir a proposta.",
    },
  ],
} as const satisfies FeaturesSectionData;
```

Esse exemplo não autoriza gerar Features em uma referência que não a contenha.
Derive contratos de compostos existentes com `ComponentProps`/`Pick` quando isso evitar divergência; não relaxe tipos com `any` ou coerções para encaixar dados incompatíveis.

## Gate dos dados

Registre `Campo/coleção | Origem | Original ou demonstração | Consumidor | Validação`.
Confirme quantidade, IDs únicos, campos obrigatórios, acessibilidade das imagens, destinos dos links e serialização nas fronteiras cliente/servidor.
Não grave `_mock-data.ts` antes da aprovação. Após o aceite, grave exatamente a proposta aprovada, salvo correções técnicas sem alteração de conteúdo/escopo.
