const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE ?? "playwright"
);
import fs from "node:fs";
import assert from "node:assert/strict";
(async () => {
  const matrix = JSON.parse(
    fs.readFileSync(
      "specs/ui-template-site-shell-to-nextjs/evidence/source-matrix.json",
    ),
  );
  const browser = await chromium.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(process.env.PREVIEW_URL ?? "http://127.0.0.1:3100/");
  await page.waitForFunction(() =>
    document.documentElement.classList.contains("lenis"),
  );
  await page.waitForFunction(
    () => document.querySelector("header").getBoundingClientRect().y >= -0.1,
  );
  const results = [];
  for (const source of matrix) {
    const c = source.closed;
    await page.setViewportSize({ width: c.width, height: c.height });
    await page.waitForFunction(
      (expected) =>
        Math.abs(
          document.querySelector("[data-menu-panel]").getBoundingClientRect()
            .width - expected,
        ) < 1,
      c.panels[0].panel.rect.width,
    );
    const actual = await page.evaluate(() => {
      const css = (e) => {
        const s = getComputedStyle(e),
          r = e.getBoundingClientRect();
        return {
          x: r.x,
          y: r.y,
          width: r.width,
          height: r.height,
          paddingTop: s.paddingTop,
          paddingBottom: s.paddingBottom,
          paddingLeft: s.paddingLeft,
          paddingRight: s.paddingRight,
          maxWidth: s.maxWidth,
          zIndex: s.zIndex,
        };
      };
      return {
        header: css(document.querySelector("header")),
        footer: [...document.querySelector("footer").children].map(css),
        panel: css(document.querySelector("[data-menu-panel]")),
        logo: css(document.querySelector("[data-menu-panel] svg")),
        sections: [...document.querySelectorAll("main>section")].map(css),
        container: css(document.querySelector("main>section:nth-child(3)>div")),
        overflow:
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth + 1,
        mainCount: document.querySelectorAll("main").length,
        links: document.querySelectorAll("[data-site-shell] a").length,
        theme: getComputedStyle(document.querySelector("[data-site-shell]"))
          .backgroundColor,
      };
    });
    const checks = [];
    function near(label, a, b) {
      assert.ok(Math.abs(a - b) <= 1, `${c.width} ${label}: ${a} != ${b}`);
      checks.push(label);
    }
    for (const k of ["x", "y", "width", "height"]) {
      near("header." + k, actual.header[k], c.header.rect[k]);
      near("panel." + k, actual.panel[k], c.panels[0].panel.rect[k]);
    }
    near("logo height", actual.logo.height, c.panels[0].logo.rect.height);
    for (let i = 0; i < 6; i++) {
      for (const k of ["paddingTop", "paddingBottom"])
        near(
          `section ${i} ${k}`,
          parseFloat(actual.sections[i][k]),
          parseFloat(c.main[i].outer.css[k]),
        );
      if (i === 0 || i === 3)
        near(
          `section ${i} height`,
          actual.sections[i].height,
          c.main[i].outer.rect.height,
        );
    }
    for (const k of ["paddingLeft", "paddingRight", "maxWidth"])
      near(
        "container " + k,
        parseFloat(actual.container[k]),
        parseFloat(c.main[2].children[0].css[k]),
      );
    assert.equal(actual.overflow, false);
    assert.equal(actual.mainCount, 1);
    assert.equal(actual.links, 0);
    near(
      "footer media height",
      actual.footer[0].height,
      c.footer.children[0].rect.height,
    );
    if (c.width >= 1024)
      near(
        "footer desktop height",
        actual.footer[2].height,
        c.footer.children[2].rect.height,
      );
    assert.equal(actual.header.zIndex, c.header.css.zIndex);
    await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
    await page.waitForFunction((expected) => {
      const panel = document.querySelector("[data-menu-panel]");
      const rect = panel.getBoundingClientRect();
      return (
        Math.abs(rect.width - expected) < 0.1 &&
        Math.abs(rect.height - (innerWidth >= 1024 ? 94 : 92)) < 0.1
      );
    }, source.open.panels[0].panel.rect.width);
    const open = await page.locator("[data-menu-panel]").evaluate((e) => {
      const r = e.getBoundingClientRect(),
        s = getComputedStyle(e.querySelector("nav"));
      return {
        x: r.x,
        y: r.y,
        width: r.width,
        height: r.height,
        nav: Object.fromEntries(
          ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"].map(
            (k) => [k, s[k]],
          ),
        ),
      };
    });
    for (const k of ["x", "y", "width"])
      near("open panel " + k, open[k], source.open.panels[0].panel.rect[k]);
    for (const k of Object.keys(open.nav))
      near(
        "menu " + k,
        parseFloat(open.nav[k]),
        parseFloat(source.open.panels[0].nav.css[k]),
      );
    await page.keyboard.press("Escape");
    await page.waitForFunction(
      () =>
        Math.abs(
          document.querySelector("[data-menu-panel]").getBoundingClientRect()
            .height - 44,
        ) < 0.1,
    );
    results.push({ width: c.width, status: "PASS", checks, actual, open });
  }
  await page.emulateMedia({ colorScheme: "dark" });
  assert.equal(
    await page
      .locator("[data-site-shell]")
      .evaluate((e) => getComputedStyle(e).backgroundColor),
    "rgb(247, 241, 233)",
  );
  assert.equal(errors.length, 0);
  fs.writeFileSync(
    "specs/ui-template-site-shell-to-nextjs/evidence/final-static-check.json",
    JSON.stringify({ results, errors }, null, 2),
  );
  console.log(
    "PASS: static geometry, 16 widths, single theme, no links/errors",
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
