# Fase 5 — Preview e integração de rotas

## Entrada

G4 aprovado.

## Atividades

1. Demonstrar shell em rota isolada. Se `(public)` estiver livre, usar `src/app/(public)/layout.tsx` e `src/app/(public)/shell-preview/page.tsx` (URL `/shell-preview`), escolhendo outro segmento em caso de colisão. Evitar segmento iniciado por `_`, que é pasta privada no App Router. Se grupo existente afetaria outras rotas, usar o isolamento definido em G0.
2. Layout importa SiteShell da pasta canônica e passa children. Não duplicar html/body do root layout. Página usa exatamente uma div com “Conteúdo da Landing Page”; wrappers vazios podem ser orquestrados no shell conforme mapa.
3. Verificar preview HTTP 200, checks e interações. Conferir hashes da raiz anterior. Apresentar evidências e diff concreto da integração, incluindo arquivos que seriam removidos/movidos e impacto em rotas existentes.
4. Se houver página raiz, solicitar confirmação específica antes de removê-la, movê-la, renomeá-la ou substituí-la. Uma solicitação genérica de conversão não equivale a confirmar essa troca. Reutilizar confirmação explícita já dada para a mesma mudança. Enquanto aguarda: preservar raiz e não criar `(public)/page.tsx`; não gerar build sabidamente conflitante.
5. Com confirmação, executar migração delimitada preservando conteúdo anterior em histórico Git existente ou backup fora de pastas de rota compiladas. Não criar commit automaticamente. Sem raiz existente, integrar diretamente.
6. Criar `src/app/(public)/page.tsx` e layout final, remover somente arquivos temporários desta execução e validar que nenhum outro grupo/Pages Router resolve `/`. Não redirecionar raiz silenciosamente como substituto de confirmação.

## Verification Gate G5

- G5.1: evidência do preview funcional e hash intacto da raiz antes da integração estão registrados.
- G5.2: se raiz existia, confirmação da alteração concreta registrada; ausência → BLOCKED com estado `PREVIEW VERIFIED / INTEGRATION BLOCKED`.
- G5.3: após integração, árvore de rotas e build confirmam exatamente um dono de `/`, shell no layout público e placeholder na página pública.
- G5.4: preview temporário removido sem apagar arquivos alheios; rotas anteriores não envolvidas continuam com seus layouts/comportamentos.

Não solicitar confirmação nesta fase quando a tarefa atual for apenas escrever a skill: essas regras se aplicam à sua futura execução sobre uma aplicação.
