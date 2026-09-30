# Fase 0 — Reconhecimento de topologia

## Entradas e atividades

1. Ler instruções locais, rotas/layouts, versões Next/React, gerenciador e sistema SDD. Consultar os guias da versão instalada antes de escolher APIs. Identificar shell/header já montados e seus pontos de extensão.
2. Abrir a fonte e identificar template/página usada. Registrar HTML, seletores e recursos que participam da navegação. URL inacessível, screenshot sem CSS/estados ou asset obrigatório ausente não permitem prometer extração exata.
3. Classificar header superior, fixo/sticky/normal, header ocultável/compactado, links embutidos, dropdown/mega menu e navegação lateral constante. Mapear desktop e mobile separadamente; não inferir drawer a partir de um ícone hamburger.
4. Inventariar itens na ordem do DOM e sua ação real: rota, âncora, cross-route hash, externo, contato/download, disclosure ou ação. Registrar botão/CTA visualmente integrado, sem implementar seu formulário.
5. Registrar rotas potencialmente conflitantes, baseline/hashes e limite de integração. O grupo `(public)` existente pode já envolver os exemplos com um header: identificar isso antes de criar outro.

## Saída

Inventário de topologia, itens/ações, recursos, arquivos existentes, pontos de integração e dúvidas necessárias. Se houver variantes sem escolha inequívoca, solicitar qual reproduzir; não misturar layouts de variantes diferentes.

## Verification Gate G0

- G0.1: fonte e recursos da navegação acessíveis/renderizados; evidência de desktop/mobile armazenada.
- G0.2: cada superfície/controle possui classificação comprovada e seletor; nenhum aside ou drawer presumido.
- G0.3: itens e destinos catalogados, incluindo ações não roteáveis e dependências fora do escopo.
- G0.4: destino, baseline e estratégia de integração sem dois headers identificados; impossibilidade de respeitar a pasta permitida → BLOCKED até decisão específica.
