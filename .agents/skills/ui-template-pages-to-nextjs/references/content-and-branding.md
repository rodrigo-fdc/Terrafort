# Estrutura, conteúdo, branding e assets

Use no COMPOSE quando páginas tiverem datasets ou identidade substituível.

Separe estrutura (slots/hierarquia/layout), conteúdo (dados editoriais/itens), branding (nome/logo/paleta/contatos) e sistema de estilos (tokens). Consuma o local de conteúdo/configuração já adotado; `src/content/` é uma opção, não diretório universal obrigatório.

## Dados tipados e determinísticos

Defina o shape a partir dos campos reais e variações da família. Preserve títulos, ordem, relações e densidade demonstrados. Prefira conteúdo evidenciado; se a spec autorizar demonstração/substituição, marque a origem e o caráter demonstrativo. Sem autorização/evidência, dado ausente é pendência, não texto institucional inventado.

Uma entrada de conteúdo pode conter ID/slug, metadata evidenciada, campos editoriais, mídia e variante/sections sustentadas. Campo opcional existe por necessidade observada, não para criar uma page builder genérica. Não use Math.random(), datas instáveis ou fake-data libs para preencher slots. Não crie CMS/backend/camada de configuração complexa sem requisito.

## Branding substituível

Centralize nome, logo, hero imagery, slogan/textos institucionais recorrentes, contatos, socials e URLs quando houver reutilização clara. Paleta consome tokens existentes; não espalhe cores antigas em JSX. Conteúdo público pode permanecer como referência demonstrativa identificada; isso não exige aplicar branding novo nem apagar todo conteúdo para “desacoplar”.

Registre substituições pendentes e adaptações solicitadas pela spec. Troca posterior de identidade não deve exigir reescrever a composição. Branding final do cliente é uma tarefa distinta salvo escopo explícito.

## Assets

Inventarie origem/local, consumidores, tipo/dimensões/proporção, alt/decorativo, focal point/crop, disponibilidade e status substituível. Confira assets existentes/capturados antes de baixar ou duplicar; use Image/SVG/vídeo conforme semântica e convenções da versão/projeto.

Mídia original ausente não impede automaticamente implementar a página. Preserve o slot e suas medidas com fallback/asset permitido determinístico; declare a adaptação e o limite de fidelidade. Uma mídia essencial à interação exige contrato suficiente para reproduzir o comportamento, mesmo quando o arquivo final for substituído.

Não redistribua/baixe mídia indiscriminadamente nem acople a estrutura a URLs externas temporárias. Escolha conteúdo/asset permitido e registre pendências; não reivindique identidade pixel-perfect para uma substituição visual.
