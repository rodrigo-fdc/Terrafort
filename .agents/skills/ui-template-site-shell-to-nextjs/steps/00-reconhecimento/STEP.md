# Fase 0 — Reconhecimento

## Entradas

Fonte HTML/CSS/JS e aplicação Next.js de destino.

## Atividades

1. Ler instruções locais, package.json, lockfile, árvore de rotas e sistema SDD. Preservar gerenciador existente; usar npm quando não houver decisão. Não inicializar outro projeto sobre a aplicação.
2. Identificar entrada do template, CSS, scripts, fontes, assets, versão de engine, biblioteca de ícones e requisitos para reproduzir a fonte. Não concluir engine apenas pelo nome de uma classe. Se a biblioteca usa SVG inline/sprite próprio, registrar essa estratégia em vez de instalar uma substituta.
3. Capturar estado inicial em contexto de navegador limpo: classes no html/body, tokens ativos, storage e regras de tema. Se seguir apenas prefers-color-scheme sem default inequívoco, solicitar escolha e registrar a decisão antes de fixar o tema.
4. Registrar baseline do destino: arquivos existentes, hashes das páginas/layouts potencialmente afetados, mudanças prévias do usuário e checks disponíveis. Inventariar todas as rotas que resolvem `/`, incluindo grupos e eventual Pages Router.
5. Definir isolamento. Se existir raiz, reservar rota de preview sem colisão. Se `(public)` já possuir páginas/layout, não envolvê-las silenciosamente: usar grupo temporário exclusivo para o preview ou checkout isolado e planejar a integração final.

## Saída

Inventário de fonte/destino, baseline, decisões ausentes e estratégia de preview. A ausência de requisito de produto não impede extrair um shell; ausência da fonte impede.

## Verification Gate G0

- G0.1: fonte abre e seus CSS/JS/assets estruturais estão acessíveis; guardar captura e lista de recursos. Falta de recurso necessário → BLOCKED.
- G0.2: App Router, gerenciador e convenção SDD identificados com caminhos de evidência.
- G0.3: inventário de rotas e hashes da raiz armazenados; preview proposto não resolve uma rota existente.
- G0.4: cada dependência/tema está identificada ou marcada como decisão pendente; pendência necessária à extração → BLOCKED.
