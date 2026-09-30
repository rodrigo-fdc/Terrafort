# Thirdway homepage composition

Reference: https://www.thirdway.com/, inspected on 2026-09-29.

`src/app/(public)/page.tsx` owns `/` and remains a Server Component. It composes Hero → Teams → Recognition → Featured projects → Partners → Journal inside the existing shell's main landmark. The preexisting footer stays owned by the shell.

Static reference content lives in `_mock-data.ts`: six teams, four projects and their original quotations, thirty partner logos, three journal articles. No invented testimonials or random data. Links to unimplemented detail pages retain the public reference destination. The navigation path adaptation was previously authorized.

Teams and Journal reuse Carousel, TeamCard, ArticleCard, Typography and TextLink. Featured projects reuse TestimonialCard, Badge and IconButton. The hero and project scroll effects are isolated in client islands using the installed GSAP/ScrollTrigger; no second Lenis instance is created. Responsive signatures use the original SVG assets.

CSS Modules consume the existing CSS tokens and section-local measurements. No global token, navigation, shell, package or configuration changes are required. Remote images use unoptimized Next Image and public reference asset URLs, without modifying image-domain configuration.

Verification: typecheck, lint and production build; browser checks at 375, 768, 1024 and 1440 pixels; section order, single main/h1, overflow, menu open/Escape, carousel controls, project scroll, reduced motion and browser errors. Temporary comparison captures are kept outside the application.

Visual coverage is sampled, not a complete pixel-perfect matrix. The reference brand-loading intro is not reproduced. Hero motion is adapted; Carousel uses native scrolling rather than Swiper timing. Team vertical dimensions and some transitions still differ slightly. External asset availability depends on the reference's servers.
