# Reconhecimento da navegação Thirdway

Fonte: https://www.thirdway.com/. Evidência atual em `evidence/source-navigation.json` e capturas desktop/mobile. Shell existente já usa GSAP, Motion e Lenis, com logo SVG e fonte locais que podem ser reutilizados. Nenhuma dependência adicional definida nesta fase.

## Topologia

Header superior fixo. Painel central expansível compartilhado entre desktop/mobile; não é sidebar permanente nem drawer lateral. Não forçar `mobile-drawer.component.tsx` exclusivo se o painel compartilhado atender às duas variantes. A navegação muda de apresentação em 1024px, conforme evidências do shell existente, reconfirmado na matriz visual.

## Itens extraídos

| Label           | Destino original     |
| --------------- | -------------------- |
| Approach        | `/approach`          |
| Services        | `/services`          |
| People          | `/people`            |
| Projects        | `/projects`          |
| Vision & Values | `/vision-and-values` |
| Our Home        | `/our-home`          |
| ESG             | `/esg`               |
| Journal         | `/journal`           |

O bloco promocional “Lately at Thirdway” e seus cards não pertence ao escopo desta skill. O CTA “Let’s talk” depende de formulário não existente no destino; uma adaptação explícita foi proposta ao usuário.

## Integração

O `SiteShell` renderiza diretamente o header antigo. A troca de import proposta em `evidence/integration-proposal.diff` é a alteração mínima para integrar a nova navegação, preservando o restante da estrutura. A alteração autorizada foi aplicada. A confirmação anterior da substituição da página raiz não autoriza por si só esta exceção de localização imposta pela nova skill.

## Decisão de escopo

Autorizado pelo usuário: “pode editar”. G0.4 PASS. Ver integration.md para decisões finais.
