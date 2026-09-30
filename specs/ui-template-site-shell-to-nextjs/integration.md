# Integração da raiz — confirmada e aplicada

O usuário confirmou com “Confirmado” a alteração descrita em `evidence/proposed-root-integration.diff`. Registro em `evidence/root-approval.json`.

- Página anterior removida de `src/app/page.tsx`; backup íntegro em `evidence/original-root-page.tsx.txt`.
- Página do shell movida para `src/app/(public)/page.tsx`, atendendo `/`.
- Rota temporária `/shell-preview` removida.
- Layout e CSS globais preservados.

A validação final executa build, geometria e interações em `/`, incluindo HTTP 404 da rota aposentada e recarregamento com menu aberto. O cleanup em navegação cliente já passou no preview e é acompanhado por hashes dos componentes.
