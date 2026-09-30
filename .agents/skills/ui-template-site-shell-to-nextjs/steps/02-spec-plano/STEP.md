# Fase 2 — Spec, plano e tarefas

## Entrada

G1 aprovado; nenhuma implementação relevante antes desta fase.

## Atividades

1. Escrever contexto, objetivo, escopo/não escopo, requisitos e AC-01 a AC-08 do contrato, vinculados às evidências do mapa.
2. Definir interfaces: SiteShell recebe children e orquestra Header, um único main e Footer; SectionWrapper recebe children, className, id, atributos DOM tipados e configuração de animação apenas quando necessária. Definir qual camada é dona dos wrappers verticais para não duplicá-los entre shell e página.
3. Usar identificadores únicos e estáveis. Separar atributos DOM serializáveis de props de Motion/GSAP; não espalhar configurações de engine inválidas no DOM. Referências/funções permanecem dentro de fronteiras client. Evitar any e objetos de runtime atravessando Server → Client.
4. Definir dono único do estado do menu em hook/context local à pasta. Manter SiteShell Server Component se possível, recebendo ou compondo ilhas client sem tornar toda a árvore client.
5. Definir implementação por engine comprovada. Reutilizar dependências compatíveis existentes; instalar a biblioteca real de ícones quando identificada e necessária, e somente runtimes usados pelo shell. Não instalar três engines para cobrir hipóteses.
6. Planejar escopo CSS, assets e integração de rota. Somente estilos do shell; não importar reset global do template sobre outras páginas. Escopo de tema no wrapper, com mecanismo compatível para portais se houver.
7. Criar tarefas ligadas a requisito e gate, estratégia de testes e diff permitido. Registrar plano de preview e alteração concreta da raiz a ser confirmada após a demonstração isolada.

## Saída

Spec, plano técnico, contratos, lista de arquivos/dependências permitidos e tarefas verificáveis.

## Verification Gate G2

- G2.1: todos os requisitos possuem implementação planejada e critério observável com tolerância definida antes do código.
- G2.2: todo componente/hook/context/adaptador próprio está na pasta canônica; exceções limitadas a rotas, assets, dependências e artefatos SDD.
- G2.3: nenhum menu/link/copy ou componente de design system aparece no plano; somente placeholder e exceções funcionais permitidas.
- G2.4: plano não cria dois donos de `/` nem modifica raiz sem confirmação; testes distinguem preview aprovado de integração pendente.
