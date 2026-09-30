# Descoberta de páginas sem domínio presumido

Use no DISCOVER. A função de uma página vem de conteúdo, estrutura, estados e relações observáveis, não de rótulos de produto ou nomes de bibliotecas.

## Limites e fontes

Fixe a origem/base URL, diretório da captura e páginas autorizadas. Examine HTMLs locais, navegação/header/footer, links do conteúdo, sitemap/site-map e manifests/MCP existentes. Prefira capturas suficientes a nova coleta. Se precisar ampliar captura, limite-a às fontes/páginas necessárias; não faça crawl irrestrito, execute ações mutáveis, contorne acesso ou trate links externos como páginas autorizadas.

Registre separadamente:

- páginas comprovadas e capturadas;
- páginas comprovadas por links/inventário, mas ainda não capturadas;
- páginas indicadas pela spec;
- candidatos que exigem confirmação de conteúdo/estrutura;
- destinos externos, assets, ações/protocolos e âncoras que não são páginas.

Um HTML pode conter vários estados; arquivos auxiliares/fragmentos/exportações duplicadas não são novas páginas. Um link também não comprova um template implementável. Conteúdo renderizado por JS exige inspecionar sua origem/DOM efetivo de forma controlada quando o HTML inicial não bastar; não execute runtime legado indiscriminadamente.

## Registro por página

Mantenha ID estável, URL original, fonte/seletor, status da captura, função observada, título/conteúdo, hierarquia de sections, layout compartilhado, componentes, responsive, interactions, animations, assets, links de entrada/saída e lacunas. Registre estados privados/condicionais apenas quando fizerem parte do escopo e houver evidência/acesso autorizado.

Inclua páginas que pertençam à estrutura principal, navegação ou variantes de conteúdo e destinos internos necessários ao escopo. Páginas acessíveis sem link na navegação principal podem ser intencionais: confira sitemap, relações editoriais e arquivos. Não invente dashboard, auth, perfil, checkout ou páginas de erro para completar uma arquitetura.

## Normalização cuidadosa

Resolva links relativos com a URL da página, considerando `<base>` quando presente. Separe path/query/hash, protocolo e origem. Não descarte query, idioma, casing ou trailing slash antes de verificar seu significado. Fragmentos do mesmo documento são âncoras; parâmetros podem representar estado ou conteúdo distinto. `mailto:`, `tel:`, download e acionadores JS não são rotas de página.

## Reconciliação

Cruze arquivos, links, navegação e manifest. Documente divergências, duplicatas, redirecionamentos e destinos não capturados. Uma página encontrada fora do escopo é um candidato de ampliação, não implementação automática. Um destino obrigatório no escopo sem captura suficiente é uma lacuna, não licença para gerar uma página genérica.

Entregue inventário rastreável e lista de pendências. JSON de ferramentas, quando disponível, pode apoiar `pages`, `internalLinks`, `titles`, `sharedLayouts`, `candidateTemplates`, `sections`, `assets`; seus candidatos precisam de revisão humana/semântica pelo Codex. A análise direta continua válida para estruturas atípicas.
