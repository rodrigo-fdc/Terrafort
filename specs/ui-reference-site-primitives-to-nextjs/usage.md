# Primitivos Thirdway — consumo

Importar componentes de `@/shared/components/ui`. O layout raiz mantém a importação global de `ui-tokens.css` via globals.css. Os componentes usam CSS Modules com CVA e consomem CSS Variables; não dependem de classes Tailwind no consumidor.

| Export     | Props visuais                                                                           | Elemento/ref                                                          |
| ---------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Button     | variant: action, compact, text; tone: dark, light                                       | button / HTMLButtonElement                                            |
| IconButton | variant: square, close, pill; tone                                                      | button / HTMLButtonElement; aria-label ou aria-labelledby obrigatório |
| TextLink   | tone                                                                                    | a / HTMLAnchorElement                                                 |
| Typography | variant: body, small, large, heading, display; tone; as                                 | p por padrão; as aceita span e h1–h6                                  |
| Input      | variant: transparent; props nativas                                                     | input / HTMLInputElement                                              |
| Textarea   | variant: transparent; rows padrão1; props nativas                                       | textarea / HTMLTextAreaElement                                        |
| Checkbox   | tone; checked/defaultChecked e onChange nativos                                         | input checkbox / HTMLInputElement                                     |
| Select     | options, value/defaultValue, onValueChange, placeholder, disabled, required, name, form | button combobox / HTMLButtonElement                                   |
| Badge      | variant: standard, date, year; tone                                                     | span                                                                  |
| Separator  | tone                                                                                    | hr                                                                    |
| Label      | variant: field, consent; tone; htmlFor                                                  | label                                                                 |

Todos os exports têm tipos públicos `NomeProps`; Select também exporta `SelectOption`. Valores de tamanho/cor ficam em ui-tokens.css, sem hexadecimais nos componentes.

## Exemplo de consumo em Client Component

```tsx
"use client";

import { useState } from "react";
import { Button, Input, Label, Select } from "@/shared/components/ui";

export function Example() {
  const [value, setValue] = useState("");
  return (
    <>
      <Label htmlFor="name">Nome</Label>
      <Input id="name" name="name" autoComplete="name" />
      <Label htmlFor="choice">Opção</Label>
      <Select
        id="choice"
        name="choice"
        value={value}
        onValueChange={setValue}
        options={[{ value: "a", label: "Opção A" }]}
        placeholder="Escolha"
        required
      />
      <Button type="submit">Continuar</Button>
    </>
  );
}
```

O exemplo é documental; nenhuma página ou formulário de produto foi criado. Button usa type=button por padrão. Input/Textarea/Checkbox repassam eventos e atributos nativos; não encapsulam estado ou envio. TextLink é uma âncora comum, sem roteamento de negócio.

## Select

Options deve ter values únicos; value/defaultValue deve corresponder a uma opção ou ao valor vazio. onValueChange recebe a string escolhida. No modo controlado, o consumidor é dono do estado. Um select nativo fora da ordem de Tab integra name/form, FormData e validação required; o foco e a interação acontecem no combobox visível. Campos obrigatórios inválidos focam o trigger e expõem aria-invalid.

ArrowUp/Down percorrem opções habilitadas; Home/End escolhem extremos; Enter/Space confirmam; Escape cancela; Tab fecha e segue o fluxo. Digitação procura pelo label. Clique externo fecha sem capturar foco. A lista usa portal no body, acompanha scroll/resize e muda para cima se necessário; listeners/observer são limpos ao fechar/desmontar. O z-index do portal é um token local ajustável, não uma dependência do header.

## Adaptações registradas

Anel de foco dos campos usa o token2px/offset2 do checkbox. Select recebe comportamento de teclado, validação e portal próprios da aplicação. A lista usa a superfície clara e espaçamentos extraídos; seu posicionamento depende da janela local. Reduced motion elimina transições. Os ícones originais de seta foram preservados; lucide-react continua disponível sem impor substituição de ícones. Textarea começa com uma linha, aceita rows do consumidor e rola quando necessário.

## Verificação reproduzível

`npm run lint`, `npm run typecheck`, `npm run build`. O teste `node specs/ui-reference-site-primitives-to-nextjs/scripts/verify-components.mjs` compila os componentes reais com o webpack incluído no Next e testa em Chrome, sem criar rotas da aplicação. Requer Playwright externo via PLAYWRIGHT_MODULE (ou a instalação já usada em /tmp/thirdway-inspect) e /usr/bin/google-chrome. Classes CSS Modules são mapeadas para nomes simples somente na fixture; declarações e tokens são os arquivos reais.
