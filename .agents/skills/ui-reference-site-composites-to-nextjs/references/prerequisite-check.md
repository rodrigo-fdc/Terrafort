# Protocolo de pré-requisitos

Execute antes de abrir a referência, instalar pacotes ou modificar arquivos.

1. Resolva o CWD real e leia as instruções locais. Confirme `package.json`, Next.js App Router em `src/app/`, TypeScript e `strict: true`, inclusive por `extends`.
2. Confirme que `src/shared/components/ui/` existe e que `ui-tokens.css` contém declarações `--ui-*` válidas. Arquivo vazio não satisfaz o requisito.
3. Confirme exports reais e implementações de Button e Typography, aceitando equivalentes documentados. Não conclua disponibilidade apenas pelo nome do arquivo ou menção em comentários.
4. Registre caminho, export, props, variantes, elemento renderizado, wrappers, comportamento de `className`, encaminhamento de eventos e ref de cada primitivo. Resolva imports e re-exports.
5. Verifique `cn()` e CVA disponíveis. Ausência de utilitário/dependência bloqueia a geração até existir solução aprovada; não adicione helpers fora da pasta permitida silenciosamente.
6. Verifique que os tokens já chegam à aplicação. Se o import global estiver ausente, relate a necessidade de correção pela etapa anterior ou de autorização específica.
7. Identifique Tailwind e versão, CSS Modules/Vanilla, ícones, React/Next, scripts e lockfile. Não substitua a stack.

Tabela obrigatória: `Capacidade | Export/caminho | Contrato verificado | Consumidores | PASS/BLOCKED`.

Após a descoberta, acrescente os primitivos exigidos por cada composto. Um PricingCard que exija Badge não pode recriar esse Badge quando ele faltar. Bloqueie o plano e sugira executar `ui-reference-site-primitives-to-nextjs` para a lacuna específica.

Para `asChild`, o filho deve aceitar props/eventos/ref e produzir um único elemento compatível. Um componente visualmente semelhante pode ser incompatível. Não corrija o primitivo nesta skill. Procure composição fiel com os contratos existentes; se impossível, registre o bloqueio.

Mensagem de bloqueio:

> BLOCKED — pré-requisito ausente: [capacidade e caminho]. Execute ou conclua `ui-reference-site-primitives-to-nextjs` para [lacuna]. Nenhum composto foi gerado. Retomar na Fase 0 após a correção.

O helper verifica somente existência, tokens e exports TypeScript. Semântica, integração global e contratos de ref continuam sujeitos à inspeção obrigatória. Não executar build com efeitos no projeto antes de concluir o diagnóstico inicial.
