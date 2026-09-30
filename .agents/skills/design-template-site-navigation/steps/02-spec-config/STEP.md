# Fase 2 — Spec, configuração e plano

## Entrada

G1 aprovado. Ler o contrato de navegação em `../../references/navigation-contract.md` antes de definir tipos e estado.

## Atividades

1. Registrar spec com objetivo, escopo/não escopo, requisitos e AC-01–AC-08, usando o sistema SDD existente.
2. Definir esquema discriminado de `navigation.config.ts`, IDs, labels, destinos, agrupamento, variantes e regra de match. Propor configuração real extraída e, separadamente, configuração da demonstração se necessária.
3. Escrever a política de precedência entre pathname/hash/scroll, empates, topo/fim de página, rota dona e tratamento de alvo ausente. Copiar regra da fonte quando comprovada; documentar defaults do contrato quando não houver evidência.
4. Definir responsabilidades e interfaces: Header compõe links/toggle; Drawer mostra mesma configuração filtrada; NavLink renderiza item por tipo e estado resolvido; hook/provider é dono de open/headerState/activeAnchor e ciclo de vida dos listeners.
5. Manter layout/page como Server Components quando possível; restringir client ao estado, usePathname e interações. Config não atravessa fronteira com funções não serializáveis; handlers de ações são resolvidos no cliente por ID.
6. Planejar testes para links híbridos, estado de scroll, modal e fidelidade. Identificar dependências realmente usadas, arquivos permitidos e como preservar shell existente sem editar componentes fora de navigation.
7. Planejar 1–3 fixtures mínimas e seus URLs reais. Se basta uma landing com dois alvos simples, não criar páginas adicionais sem necessidade. O limite inclui páginas ou alvos de demonstração escolhidos; não criar três páginas com dezenas de seções simuladas.

## Saída

Spec, contratos de dados/estado, plano, lista de arquivos e tarefas ligadas aos gates. Não gerar JSX de produto antes desse contrato.

## Verification Gate G2

- G2.1: cada item possui destino tipado e rastreável; handlers externos pendentes não são apresentados como implementados.
- G2.2: política de ativo resolve todos os casos do contrato sem decisões ocultas no componente.
- G2.3: escopo de arquivos e ponto de integração respeitam as restrições; nenhuma necessidade de editar componente externo foi ignorada.
- G2.4: ACs têm checks objetivos; fixtures planejadas estão dentro do limite e não colidem com URLs existentes.
