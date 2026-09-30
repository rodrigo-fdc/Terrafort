# Protocolo de pré-requisitos

Execute antes de acessar a referência ou escrever na aplicação.

## Existência e contratos

| Capacidade | Local obrigatório | Verificação |
| --- | --- | --- |
| App Router | `src/app/` | Next.js instalado, layout raiz e roteamento identificados |
| Navegação | `src/shared/components/navigation/` | Header e menu/drawer mobile reais, exports resolvidos |
| Primitivos | `src/shared/components/ui/` | Button, Typography/Tipografia e Badge equivalentes utilizáveis |
| Compostos | `src/shared/components/ui/` | Implementações reutilizáveis exportadas, não apenas arquivos vazios |
| Tokens | `ui-tokens.css` ou equivalente existente | Declarações válidas e import global efetivo |
| Stack | package.json, lockfile, tsconfig e estilos | Gerenciador, TypeScript estrito, CSS e animações identificados |

Confirme os exports seguindo re-exports até a implementação. Registre props, slots, variantes, eventos, refs, estilos, responsividade interna e fronteiras cliente/servidor.
Cards, Modal e Accordion são famílias exemplificativas: exija os compostos que as seções realmente consomem, sem inventar um FAQ para justificar Accordion. Deve existir uma camada de compostos antes de iniciar; refinamentos de dependências ocorrem no Gate 1.

Uma navegação encontrada apenas em outro caminho não satisfaz automaticamente o contrato. Relate a divergência e proponha ajustar o contrato ou executar a etapa anterior mediante instrução do usuário. Não copie ou mova componentes como atalho.

Se a pasta existir mas Header/Mobile Drawer não forem usados pelo layout aplicável a `/`, a homepage não poderá integrá-los editando o layout silenciosamente. Registre o bloqueio de integração.

## Auditoria de rota e landmarks

1. Liste todas as `page.*` que resolvem `/`, incluindo `src/app/page.tsx` e grupos de rotas.
2. Confirme que `src/app/(public)/page.tsx` será o único proprietário de `/`.
3. Se existir uma página fora desse destino, sua remoção/migração está fora do contrato padrão. Prepare o plano e solicite autorização específica antes de alterá-la.
4. Se o destino já existir, leia seu conteúdo e apresente a substituição no Gate 3.
5. Identifique quais ancestrais já renderizam `main`, header, footer, container, padding e providers de scroll. Não duplique landmarks nem compensações de header.

## Revalidação por seção

Tabela: `Seção | Capacidade necessária | Export/caminho | Props compatíveis | PASS/BLOCKED`.

Primitivo ausente: encaminhe à skill de primitivos.
Composto ausente/incompatível: encaminhe à skill de compostos.
Navegação ou shell ausente: encaminhe à etapa estrutural correspondente.
Token global ou biblioteca de animação necessária ausente: apresente a lacuna; não instale, não edite a base e não substitua o comportamento por aproximação silenciosa.

Formato de bloqueio:

> BLOCKED — [capacidade/caminho] não atende ao contrato. É necessário [correção ou etapa anterior]. Nenhuma homepage foi gerada. Retomar na Fase [0 ou 1] após a resolução.

O helper de inspeção verifica somente parte dos caminhos. Sua execução não substitui este protocolo, a análise de exports ou a auditoria da rota.
