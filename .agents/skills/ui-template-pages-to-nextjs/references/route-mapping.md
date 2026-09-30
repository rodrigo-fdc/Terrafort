# URLs e rotas App Router

Use no MAP e confira novamente em VERIFY. Derive rotas da referência/spec e da árvore existente; exemplos de domínios ou `(public)` não são convenções obrigatórias.

## Mapa antes de arquivos

| URL original | Path/query/hash | Destino Next.js | Tipo | Layout/template | Destinos relacionados | Colisão/pendência |
| ------------ | --------------- | --------------- | ---- | --------------- | --------------------- | ----------------- |

Classifique página estática, família dinâmica, estado de página, âncora, redirecionamento, download, protocolo ou externo. Preserve query/hash quando significativos. Mudança de slug, aliases ou redirects deve estar sustentada pela spec/contrato, nunca silenciosa.

Inspecione rotas existentes e layouts herdados. Route groups não aparecem na URL: dois `page.tsx` em grupos diferentes podem disputar o mesmo `/`. Identifique também conflitos entre exemplos, rota raiz e famílias dinâmicas. Não apague páginas anteriores por conveniência; confira a autorização do escopo antes de substituí-las. Resolva colisões materiais no plano.

## Famílias dinâmicas

Para estruturas equivalentes variando conteúdo, use `[slug]` ou parâmetros coerentes com a URL observada. Tipos/lookup devem ser determinísticos; cada dataset tem chave única. Consulte docs da versão instalada para params, geração estática, metadata e estados de rota ausente. Não invente uma página de 404 da referência; o tratamento idiomático de slug inexistente não equivale a migrar uma página editorial nova.

Não exponha slugs hipotéticos. Decida renderização/cache/geração conforme dados e projeto, sem forçar export estático, APIs ou backend novos. Rotas estáticas distintas podem compartilhar template quando exigidas pelo contrato.

## Links e metadata

- Navegação interna: Next Link para destinos reais do projeto, preservando âncoras/estado.
- Destinos ainda não migrados: pendência explícita ou URL real de referência quando esse handoff estiver previsto. Não transforme o link em `#` nem invente destino.
- Externos/protocolos/downloads: semântica apropriada, target/rel quando necessário; não force Next Link para todo href.
- Remapear configurações de navegação somente quando necessário às páginas e previsto no plano. Não reconstruir Header/Footer para compensar mapa desconhecido.
- Metadata nativa usa conteúdo evidenciado e base URL do destino, quando definida. Não carregue canonicals/URLs da marca antiga automaticamente para a aplicação migrada.

## Verificação

Confira acesso direto, links entre páginas, refresh de rota dinâmica, query/hash, datasets, destino desconhecido e layouts aplicados uma vez. Liste `origem → destino → resultado → evidência`. Link pendente dentro de funcionalidade obrigatória impede concluir essa unidade; pendência aceita fora do escopo continua declarada.
