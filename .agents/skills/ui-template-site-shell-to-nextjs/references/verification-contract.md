# Contrato de evidências e Verification Gates

## Registro SDD

Reutilizar OpenSpec, Spec Kit ou specs existentes; não criar um segundo sistema. Sem convenção existente, usar `specs/ui-template-site-shell-to-nextjs/` com `spec.md`, `plan.md`, `tasks.md` e `evidence/`. Artefatos pertencem ao projeto convertido, não à pasta desta skill.

Registrar a referência (caminho/URL, versão/hash quando disponível), viewport, DPR, estado de scroll, tema inicial e condições de reprodução. Guardar arquivos de evidência e comandos/saídas, não apenas afirmações. Capturas de tela não substituem medidas DOM nem testes de interação.

## Estado do gate

Cada check contém: ID, requisito, procedimento/comando, esperado, observado, caminho da evidência e status. Cada gate contém a revisão dos arquivos verificados e seus checks.

- `PASS`: todos os checks obrigatórios executados e conformes.
- `FAIL`: observação contradiz o resultado esperado.
- `BLOCKED`: faltam fonte, ferramenta, acesso ou decisão necessária.
- `N/A`: permitido apenas em check condicional cuja ausência esteja comprovada no inventário (por exemplo, fonte sem animação). Não usar por falta de tempo/ferramenta.

O gate passa somente se todos os seus checks forem PASS ou N/A justificado. Check desconhecido não passa. Não contornar falhas removendo validações ou ampliando tolerâncias após medir o resultado.

## Matriz de medição

Usar viewports de 375×812 e 1440×900 e cada breakpoint detectado em B−1, B e B+1 pixels; deduplicar larguras. Registrar DPR e usar o mesmo em fonte e destino. Medir topo, estado após limiar sticky/scroll, menu aberto e fechado, retorno por navegação e reduced motion.

Comparar valores computados de altura do header, offsets, margens, paddings por lado e max-width dos containers. Preservar valores CSS declarados e suas unidades exatamente, incluindo clamp/calc/variáveis; tolerar até 1 CSS px de arredondamento em medidas computadas, sem tolerância para breakpoint ou z-index. Comparar apenas geometria estrutural: a remoção de conteúdo altera naturalmente alturas dependentes do conteúdo. Não inventar min-height para imitar texto removido. Usar viewport/condições idênticas antes de atribuir diferenças ao conteúdo.

Verificar `scrollWidth <= clientWidth + 1` no documento. Tema e tokens devem permanecer iguais ao alternar emulação light/dark. Não inserir dados fictícios para preencher as seções.

## Cenários mínimos de aceitação

| ID    | Condição objetiva                                                                                                                                     |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-01 | Componentes próprios e suporte local somente em `src/shared/template/site/`; diff contém apenas arquivos permitidos.                                  |
| AC-02 | Header/Main/Footer e ordem dos wrappers correspondem ao mapa; interiores vazios salvo placeholder único, logo e controles funcionais.                 |
| AC-03 | Matriz de medidas atende tolerâncias, breakpoint exato, sem overflow horizontal ou duplicação do offset fixed.                                        |
| AC-04 | Tema único e logo corretos em topo/scroll; ícones correspondem à fonte comprovada.                                                                    |
| AC-05 | Menu vazio abre/fecha por botão, Escape e política de backdrop mapeada; foco e scroll são restaurados.                                                |
| AC-06 | Todos os gatilhos estruturais inventariados funcionam, sem duplicação após remount, e reduced motion mantém conteúdo acessível.                       |
| AC-07 | Uma única rota resolve `/`; shell em `(public)/layout.tsx`; página final contém o placeholder; raiz anterior só alterada após confirmação registrada. |
| AC-08 | Formatação, lint, tipos, testes aplicáveis e build passam; rota responde 200, sem erros de console/hydration ou assets 404.                           |

Testar as regras com casos negativos: colisão de rotas deve bloquear a integração; engine não identificada deve bloquear animação; classe sem runtime não satisfaz AC-06; menu modal sem item de link ainda deve manter foco em controle de fechamento.
