# Compostos Thirdway

Imports públicos: `@/shared/components/ui`. Os tokens já são importados pelo CSS global.

| Componente      | Dados obrigatórios                          | Opções                                            |
| --------------- | ------------------------------------------- | ------------------------------------------------- |
| ArticleCard     | image, title, date `{ day, month, year }`   | href, accent: yellow/blue/cream, headingAs: h2/h3 |
| TeamCard        | image, team, leader, description            | href, mobileDescription, signature, byLabel       |
| TeamMemberCard  | image, name, role                           | props de div                                      |
| ProjectCard     | image, title, location, category            | href, variant: grid/list, year, sector, teamLogo  |
| ServiceItem     | image, number, category, title, description | variant: detailed/compact                         |
| TestimonialCard | quote, author, position                     | props de div                                      |
| ModalContent    | title, closeLabel                           | description, children, props Radix Content        |

`image` recebe `{ src, alt, srcSet?, sizes?, width?, height?, loading?, objectPosition? }`.
As imagens são renderizadas como `picture/img`, preservando a estrutura observada sem exigir configuração de domínios no Next.js.
`signature` e `teamLogo` são slots de apresentação; forneça conteúdo não interativo dentro dos cards com link.

## Modal em um Client Component

```tsx
"use client";

import { Modal, Input, Button } from "@/shared/components/ui";

export function Example() {
  return (
    <Modal>
      <Modal.Trigger>Abrir</Modal.Trigger>
      <Modal.Content title="Contato" closeLabel="Fechar contato">
        <Modal.Body>
          <Modal.Heading>Fale conosco</Modal.Heading>
          <Input aria-label="Nome" />
          <Button
            onClick={() => {
              /* callback da aplicação */
            }}
          >
            Continuar
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
```

Para estado controlado use `open` e `onOpenChange` em `Modal`/`ModalRoot`.
O wrapper não envia formulários nem adiciona lógica de negócio.
Em Server Components importe partes nomeadas (`ModalRoot`, `ModalTrigger`, `ModalContent`, `ModalBody`) em vez de acessar propriedades do objeto cliente `Modal`.
A mesma regra vale para partes nomeadas de ArticleCard, TeamCard e ProjectCard.

## Estrutura e responsabilidade do consumidor

Cards recebem conteúdo e links por props; sua largura vem do container consumidor.
`ProjectCard variant="list"` mantém as colunas da referência: forneça um container com largura/overflow adequados à listagem.
`ServiceItem variant="compact"` usa a apresentação compacta a partir de 1024px; em telas menores mantém o formato detalhado.
`TestimonialCard` preserva a visibilidade desktop da referência, a partir de 1024px.
`TeamCard` mantém duas estruturas responsivas, com a descrição revelada por hover/foco no desktop.

Os compostos estão exportados como biblioteca: não foram montados em páginas ou no shell existente.
A integração em telas deve fornecer dados, tamanho do container e callbacks apropriados.

## Carousel

```tsx
import { Carousel, TeamCard } from "@/shared/components/ui";

// teams contém dados compatíveis com TeamCardProps e um id estável.
<Carousel
  label="Equipes"
  countLabel="Teams"
  previousLabel="Back"
  nextLabel="Forward"
  variant="teams"
  items={teams.map(({ id, ...team }) => ({
    id,
    content: <TeamCard {...team} />,
  }))}
/>;
```

`variant="teams"` mantém a trilha horizontal. `variant="journal"` usa uma trilha no mobile e grade de artigos no desktop, com o primeiro item maior a partir de 1280px.
`showCount` e `showControls` permitem ocultar contador/controles; os controles do Journal permanecem ocultos conforme a referência.
A ref aponta para a região externa. `onIndexChange` informa o índice do primeiro item visível (base zero); callbacks devem ser definidos em um Client Component.
`items` exige IDs únicos e estáveis. Cada item aceita `label` acessível e `content` como slot React.
É possível ajustar medidas na prop `style` por variáveis `--ui-carousel-*`, incluindo `--ui-carousel-item-width` e `--ui-carousel-gap`.
A trilha suporta toque nativo, arraste com mouse, setas/Home/End quando focada, movimento reduzido e mudanças de tamanho/conteúdo. O carrossel não tem autoplay nem loop.
