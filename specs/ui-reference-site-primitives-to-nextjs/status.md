# Status — implementação concluída

IMPLEMENTATION COMPLETED / READY FOR VERIFY.

Gate3 autorizado pelo usuário: “Pode gerar os códigos”. Os11 primitivos aprovados foram gerados em src/shared/components/ui/ e exportados por index.ts. Arrow é um helper SVG interno, sem export público. Receitas em ui.variants.ts e estilos em ui.module.css consomem ui-tokens.css.

| Etapa | Resultado | Evidência                                                                                                        |
| ----- | --------- | ---------------------------------------------------------------------------------------------------------------- |
| Fase0 | PASS      | CVA/clsx/lucide-react instalados, helper cn e fontes disponíveis                                                 |
| Gate1 | PASS      | inventory.md, inspeções1440/375 e detalhes do seletor                                                            |
| Gate2 | PASS      | tokens-verification.json e componentes consumindo os mesmos tokens                                               |
| Gate3 | PASS      | Aprovação explícita registrada no plano                                                                          |
| Gate4 | PASS      | Apenas primitivos e suporte local;11 exports tipados, forwardRef nos7 controles interativos, CVA e CSS Variables |
| Fase5 | PASS      | Lint sem warnings, typecheck e build com código0;12 grupos de testes no navegador                                |

## Componentes

Button, IconButton, TextLink, Typography, Input, Textarea, Checkbox, Select, Badge, Separator e Label. API e exemplos em usage.md. Nenhuma página da aplicação, layout, navegação ou formulário de negócio foi gerado ou substituído nesta etapa.

## Verificação funcional e visual

O teste scripts/verify-components.mjs usa os componentes reais em React StrictMode e CSS real, com nomes de classes simplificados somente na fixture. Resultados em evidence/components-verification.json; capturas primitives-375.png e primitives-1440.png.

Passaram refs para elementos nativos; eventos/atributos; type=button padrão; required e foco no Select; Arrow/Home/End/Enter/Escape/Tab e typeahead; opções desabilitadas; FormData; valores controlados e não controlados; reset normal/cancelado; desabilitação durante abertura; reduced motion; duas desmontagens/remontagens sem portal residual; ausência de erros no console.

Nas duas larguras, botão de ação22px, checkbox16px, fontes e cores corresponderam aos tokens. Tipografia body16→18px, heading32→64px, display23→28px; campos min44.8→53px, sem overflow horizontal. Não se afirma equivalência de todos os estados em todos os browsers: a verificação foi em Chrome,375/1440px.

## Adaptações

Foco dos campos usa anel2px/offset2 observado no checkbox. Select tem portal com camada local ajustável e integração nativa de formulário; sua posição se adapta à janela. Textarea começa com uma linha e aceita rows. Cores e medidas extraídas permanecem nos tokens; a geometria dos caminhos SVG foi preservada no código. O shell atual não foi migrado para estes primitivos.
