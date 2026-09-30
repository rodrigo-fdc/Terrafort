# Footer contract — Thirdway

Source: https://www.thirdway.com/, captured locally 2026-09-29. No OpenSpec change exists; this document follows the repository's `specs/` convention.

## Evidence and gates

- ANALYSIS: PASS. Captured footer HTML, both linked stylesheets and footer/contact JavaScript were inspected. The footer is already mounted once in `SiteShell`; its previous implementation contained empty wrappers.
- CONTRACT: PASS. Media/CTA is inside `<footer>`, not an independent homepage section. The final homepage journal remains outside migration scope.
- PLAN: PASS. Replace the existing footer only. Keep the layout and homepage untouched. Store reference content separately, reuse UI primitives, isolate interactive islands, and add no dependencies.

## Structure / style / content / branding

| Block             | Contract                                                            | Responsive / interaction / animation                                                                                                                                                                                                                                                                                                          |
| ----------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Media + statement | Cover image, cream CTA with underlined phrase; local contact dialog | 480px mobile, 400px tablet, 606px desktop. Card fills mobile gutters, 361/635/688/928px at observed breakpoints. Hover background transitions over 400ms. Mailto fallback without JS.                                                                                                                                                         |
| Identity          | Vertical brand asset, ticks, measurement and project comparison     | 351px mobile row; desktop 585px logo, 640px ruler. Scroll position in metres uses 3779.5276px/m, comparison thresholds and nonlinear pointer movement derived from footer JS. 250ms comparison fade, disabled for reduced motion. Decorative ticks hidden from assistive technology; measurement text and comparison links remain accessible. |
| Explore           | Eight source destinations in configured order                       | Left mobile column, right desktop column. 20px mobile / 32px desktop; active local route uses aria-current.                                                                                                                                                                                                                                   |
| Contact           | Find us, Email, Follow us                                           | Right mobile column; middle desktop column. Display-font labels, address, email and two social destinations.                                                                                                                                                                                                                                  |
| Legal             | Eight original destinations, separated by rules                     | Stacked list below mobile columns; desktop lower right. 12/14px type.                                                                                                                                                                                                                                                                         |
| Bottom            | Copyright + two credits                                             | Copyright left and two stacked credits right on mobile; horizontal on desktop. Source content/configuration, not hardcoded brand architecture.                                                                                                                                                                                                |

CSS Modules consume existing `--ui-*` font/palette tokens; scoped `--ui-footer-*` variables cover the source divider, media height, gutters and animation duration. Breakpoints are the observed 768/1024/1280/1536px. No new global CSS or styling framework. Single responsive DOM avoids the legacy duplicate mobile/desktop trees.

## Deliberate adaptations

- The user selected a local modal that prepares an email. Original external form POST is not connected or simulated. Required fields, department selection and privacy acknowledgement are retained; submit opens a draft and explicitly states that this page sends nothing.
- Source contact-team content is outside the bounded footer interaction contract; no independent sales/team section is added to the dialog.
- Only `/approach`, `/services` and `/people` currently exist locally. Other destinations remain real reference-site URLs, centralized for later migration. No placeholder URLs.
- Use existing unstyled Radix-backed Modal and local input/label/select/checkbox/button primitives. No copied legacy runtime, no additional smooth-scroll controller.
- Logos, imagery, names, contacts, URLs and credits remain demonstrative reference content in `src/content/footer.ts`; replace them for production branding. Existing header Logo cannot accept a brand asset and has header-specific sizing; reuse the downloaded configurable SVG instead of duplicating its inline SVG or changing the header.
- Footer remains a Server Component. Contact, active links and the scroll measurement are separate client islands. Focus returns to CTA when the dialog closes. Structural content is never hidden pending JS.

## Verification plan

Run npm format:check, lint, typecheck and build with Node 24. There is no project test script. Use a controlled Playwright browser harness for one footer, source/local geometry at 375/768/1024/1440px, real destinations, active route, modal keyboard/focus, required-field validation, generated email draft, reduced motion and JS-disabled fallback. Compare reference DOM/CSS locally; do not run legacy scripts or submit the reference form. Preserve evidence in this folder.

The existing Select gained an optional `portalContainer` prop so its popup can remain inside the contact dialog. The default portal destination is preserved for other consumers. This fixes the observed popup obstruction and keeps Radix focus/outside-interaction semantics intact.
