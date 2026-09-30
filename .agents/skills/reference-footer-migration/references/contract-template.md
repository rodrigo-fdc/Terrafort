# Footer Contract

Use este modelo na fase CONTRACT. Registre-o na spec/design da change ativa ou no local de documentação já utilizado pelo projeto. Na ausência de convenção, apresente o contrato na conversa antes de implementar; não crie uma segunda metodologia de specs.

## Proveniência e limites

- Referência: URL de origem, raiz local da captura e data conhecida.
- Fontes: HTML, CSS, JS, manifesto, análise anterior e screenshots disponíveis, com caminhos/seletor/estado.
- Destino: projeto, página, layout efetivo e footer existente.
- Change/spec: identificador e requisitos aplicáveis, quando houver OpenSpec.
- Limites: raiz do footer, wrappers adjacentes incluídos e excluídos, justificativa de cada decisão.
- Cobertura: desktop/tablet/mobile, breakpoints observados, estados e lacunas.

Arquivos minificados continuam sendo evidência: encontre apenas regras/selectors relevantes. Um manifesto ajuda a localizar assets; não prova sua integridade ou seu uso no footer. Priorize análise direta e resolva divergências com a análise prévia.

## Árvore semântica

Exemplo ilustrativo, substitua pelos blocos efetivamente encontrados:

```text
Footer
├── Main statement / CTA
├── Contact block
├── Navigation
├── Social links
├── Legal links
└── Copyright
```

Uma faixa anterior a `<footer>` pode participar da composição, mas seu ownership deve ser documentado. Não absorva uma seção da homepage somente porque é a última. Diferencie informações repetidas por responsividade de conteúdo que deve existir duas vezes.

## Contratos de bloco

| Bloco e origem | Propósito/conteúdo | Estrutura/layout | Componente reaproveitado | Responsividade | Interação | Animação/fallback |
| --- | --- | --- | --- | --- | --- | --- |

Preencha todos os campos aplicáveis. N/A requer evidência de ausência. Registre colunas, stacking, ordem visual/DOM, alinhamento, gaps, ocultações, reorganização, textos, links legais e tamanho tipográfico por breakpoint. Evite breakpoints novos quando a referência ou o projeto já fornecem uma regra adequada.

## Separação arquitetural

| Camada | Responsabilidade | Onde registrar |
| --- | --- | --- |
| STRUCTURE | Semântica, slots, ordem, composição e comportamento | Footer e subcomponentes com responsabilidade real |
| STYLE SYSTEM | Tokens, medidas, layouts, estados e movimento | Stack CSS existente, com escopo do footer |
| CONTENT | Labels, contatos, URLs, copyright e conteúdo institucional | Configuração existente ou `src/content/` simples |
| BRANDING | Nome, logo, mídia e tokens visuais substituíveis | Dados/assets/tokens identificados como referenciais |

Não confunda independência de branding com apagar todo o conteúdo da referência. Preserve o conteúdo autorizado como demonstração e centralize-o. Não invente nova marca, contatos, alegações ou destinos. Quando houver decisão explícita de não preservar conteúdo, registre a substituição e seu impacto visual/funcional.

## Mapeamento de estilos

| Propriedade | Origem/regra/estado | Valor observado | Token equivalente existente | Delta mínimo necessário |
| --- | --- | --- | --- | --- |

Cubra background, foreground, muted, borda, fontes, peso, tamanho, line-height, tracking, spacing, padding, gaps, alinhamento, grid, largura de container, breakpoints, hover, focus e transições. Inclua gradientes, overlays e sombras somente quando fizerem parte do footer.

Equivalência semântica importa: um token de botão não vira background de footer apenas por ter o mesmo hexadecimal. Tokens referenciais podem manter os valores observados enquanto permitem substituição posterior. Não acople nomes de marca a props, nomes de componentes ou selectors.

## Destinos e assets

| Item | Origem | Destino/asset real | Uso no projeto | Referencial/substituível | Pendência |
| --- | --- | --- | --- | --- | --- |

Verifique links internos existentes, externos, mailto, tel e âncoras reais. Quando um destino ainda não existir, registre a necessidade; não transforme automaticamente uma rota antiga em nova URL inventada ou em `#`. Um endereço original pode permanecer em configuração referencial se esse uso estiver autorizado.

Asset decorativo/branding indisponível pode ser omitido ou representado por um slot neutro de dimensões documentadas, sem simular logo ou contato. Registre a diferença e não declare equivalência visual desse asset. Falta de asset funcional indispensável, como um ícone que comunica ação sem alternativa acessível, exige resolver a capacidade antes de declarar o bloco completo.

## Comportamento e critérios

Para cada interação: input (mouse/teclado/toque), estado, efeito funcional e foco. Para cada animação: trigger, direção, duração aproximada, easing, sequência, reveal intent, reduced motion e fallback.

Defina comparação estrutural e perceptual antes de codificar. As tolerâncias devem refletir o contrato e eventuais substituições autorizadas; não imponha igualdade de código, não ajuste tolerância depois de observar uma falha e não prometa pixel-perfect sem cobertura correspondente.
