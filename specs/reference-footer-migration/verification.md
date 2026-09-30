# Footer migration verification

**FOOTER MIGRATION INCOMPLETE** — implementation is delivered; the repository-wide formatting gate has pre-existing failures outside footer scope. Do not interpret those files as passing.

Reference: https://www.thirdway.com/. Local HTML/CSS capture and inspected footer/contact JavaScript; see `contract.md` and `evidence/`.

## Implemented

- Existing Server Footer replaced in place, mounted once by the unchanged site shell.
- Image/CTA, vertical brand asset, scroll ruler/project comparisons, eight navigation links, contact/social details, eight legal links, copyright and credits.
- Responsive composition at observed breakpoints; existing palette/fonts plus scoped footer tokens. No global legacy CSS/runtime or new dependencies.
- Local Radix-backed contact dialog, required fields, department selection, privacy checkbox and URL-encoded email draft. This page sends nothing.
- Native `next/link` for existing local routes, configured reference destinations for unmigrated routes, active local state, hover/focus, scroll updates and reduced motion.
- Server-rendered structural content, mailto fallback without JS, keyboard Enter/Space, dialog focus trap/return, labelled form fields.

Reused: Typography, TextLink, ModalRoot/Content/Body, Label, Input, Textarea, Checkbox, Select, Button; Next Image/Link and existing global font assets. Select now accepts an optional portal container to keep its popup inside the dialog; other consumers retain the original default.

New: footer contact, active-link and scroll client islands, footer CSS Module, `src/content/footer.ts`, local footer imagery and behavioral/visual verification harnesses.

Reference-specific content intentionally not preserved: remote form POST/backend, global contact atom, duplicate desktop/mobile DOM, unrelated contact-team section. Email-draft delivery was explicitly selected by the user. Reference branding/content is retained only as replaceable configuration.

## Evidence

| Viewport | Reference footer height | Migrated footer height |
| -------- | ----------------------- | ---------------------- |
| 375px    | 1471.34375px            | 1471.34375px           |
| 768px    | 1391.34375px            | 1391.34375px           |
| 1024px   | 1299px                  | 1299px                 |
| 1440px   | 1297px                  | 1297px                 |

Measured label, navigation and legal positions match. Desktop copyright has a 0.016px rounding difference. Screenshots support composition/cropping checks; the reference fixture does not execute legacy JS, so its initial scroll reading is not a comparison of live counter states. Counter formula/thresholds come from the inspected source JS and live updates are separately browser-tested.

`browser-checks.json` records checks for one footer, inventories/destinations, local media, keyboard/focus, required form validation, selecting Recruitment and generating an encoded draft addressed to talent, active route, live scroll changes, reduced motion, absence of page runtime errors, and JS-disabled fallback. No email or external form submission was sent.

## Validation / acceptance

- format:check: **FAIL — pre-existing prompts** `.prompts/ui-reference-site-composites-to-nextjs.md` and `.prompts/ui-reference-site-homepage-to-nextjs.md`. Footer implementation/evidence files pass formatting after normalization. Unrelated prompts were not edited.
- lint: PASS.
- typecheck: PASS.
- tests: PASS — controlled Playwright harness; no project test script exists.
- build: PASS — Next.js production build, Node 24 / npm.

| Criterion                   | Result  | Evidence                                                                         |
| --------------------------- | ------- | -------------------------------------------------------------------------------- |
| AC-01 Structure             | PASS    | Captured footer boundary/tree, source/local geometry and screenshots             |
| AC-02 Reuse                 | PASS    | Existing UI imports and limited Select portal integration                        |
| AC-03 Responsive            | PASS    | Four viewport measurements and source breakpoints                                |
| AC-04 Interaction           | PASS    | Browser checks; email delivery adaptation authorized                             |
| AC-05 Branding independence | PASS    | Content, destinations and assets centralized in footer config                    |
| AC-06 Accessibility         | PASS    | Keyboard/focus, labels, reduced motion and no-JS checks; source palette retained |
| AC-07 Validation            | BLOCKED | Global formatting failures outside this migration                                |

Gates: ANALYSIS / CONTRACT / PLAN / IMPLEMENT PASS. VALIDATE BLOCKED by global format:check. Visual and behavioral verification evidence is recorded, but the overall workflow cannot be declared COMPLETED until AC-07 passes.

Pending branding substitutions: name/logo, photos, project comparisons, address/emails, social/legal/reference destinations, copyright and credits. These are all centralized; no final client branding was applied.

Next step: resolve the two pre-existing prompt formatting issues in their own scope, rerun `npm run format:check`, then finalize VERIFY. No missing footer functionality was found in the tested contract.

## Reproduce

Use Node 24 and the project's npm scripts. For browser harnesses, point to an existing Playwright module and a running local app:

```bash
FOOTER_PLAYWRIGHT_PATH=/absolute/path/to/playwright/index.mjs \
  node specs/reference-footer-migration/verify-footer.mjs
FOOTER_PLAYWRIGHT_PATH=/absolute/path/to/playwright/index.mjs \
  node specs/reference-footer-migration/compare-reference.mjs
```

`FOOTER_BASE_URL` optionally replaces http://127.0.0.1:3000. Source rendering routes font/image requests to local captured files and never executes the legacy JavaScript.
