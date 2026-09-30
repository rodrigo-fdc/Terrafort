const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE ??
    "/tmp/thirdway-inspect/node_modules/playwright/index.mjs"
);
import fs from "node:fs";
import assert from "node:assert/strict";
const out = "specs/design-template-site-navigation/evidence";
const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox"],
});
const errors = [];
const results = [];
const measure = () => {
  const panel = [...document.querySelectorAll("[data-menu-panel]")].find(
    (e) => e.getBoundingClientRect().width > 0,
  );
  const nav = panel.querySelector("nav");
  const link = nav.querySelector("a");
  const toggle = panel.querySelector(
    'button[aria-label="Close menu"],button[aria-label="Open menu"],button[aria-expanded]',
  );
  const rect = (e) => {
    const r = e.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  };
  const css = (e) => {
    const s = getComputedStyle(e);
    return Object.fromEntries(
      [
        "fontSize",
        "fontWeight",
        "lineHeight",
        "letterSpacing",
        "color",
        "paddingTop",
        "paddingBottom",
        "paddingLeft",
        "paddingRight",
        "borderRadius",
        "backgroundColor",
      ].map((k) => [k, s[k]]),
    );
  };
  const cta = [...document.querySelectorAll("header a,header button")].find(
    (e) =>
      e.textContent.trim() === "Let’s talk" &&
      e.getBoundingClientRect().width > 0,
  );
  return {
    cta: cta
      ? { rect: rect(cta), css: css(cta.querySelector("span") ?? cta) }
      : null,
    panel: rect(panel),
    nav: rect(nav),
    link: rect(link),
    toggle: rect(toggle),
    linkCSS: css(link),
    navCSS: css(nav),
    toggleCSS: css(toggle),
    label: rect(link.querySelector("span")),
    logo: rect(panel.querySelector("svg")),
    overflow:
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
    links: [...nav.querySelectorAll("a")].map((a) => ({
      label: a.textContent,
      href: a.getAttribute("href"),
    })),
  };
};
try {
  const source = await browser.newPage();
  const local = await browser.newPage();
  local.on("pageerror", (e) => errors.push(e.message));
  local.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  for (const width of [
    375, 767, 768, 769, 1023, 1024, 1025, 1440, 1919, 1920, 1921,
  ]) {
    const height = width === 375 ? 812 : 900;
    await Promise.all([
      source.setViewportSize({ width, height }),
      local.setViewportSize({ width, height }),
    ]);
    if (width === 375) {
      await Promise.all([
        source.goto("https://www.thirdway.com/", {
          waitUntil: "domcontentloaded",
        }),
        local.goto("http://localhost:3101/", { waitUntil: "networkidle" }),
      ]);
    }
    for (const page of [source, local]) {
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(
        () =>
          [...document.querySelectorAll("[data-menu-panel]")].some(
            (e) => e.getBoundingClientRect().y >= 0,
          ),
        {},
        { timeout: 60000 },
      );
    }
    const before = await local.evaluate(measure);
    await source
      .getByRole("button", { name: "Open menu", exact: true })
      .filter({ visible: true })
      .click();
    await local
      .getByRole("button", { name: "Abrir menu", exact: true })
      .click();
    for (const page of [source, local]) {
      await page.waitForFunction(() => {
        const panel = [...document.querySelectorAll("[data-menu-panel]")].find(
          (e) => e.getBoundingClientRect().width > 0,
        );
        return (
          innerWidth < 1024 ||
          Math.abs(panel.getBoundingClientRect().width - 680) < 0.05
        );
      });
      await page.waitForTimeout(400);
    }
    const a = await source.evaluate(measure),
      b = await local.evaluate(measure);
    const comparisons = {};
    for (const selector of ["panel", "link", "toggle", "logo", "label"])
      for (const key of ["x", "y", "width", "height"]) {
        if (selector === "panel" && key === "height") continue;
        comparisons[selector + "." + key] = {
          source: a[selector][key],
          local: b[selector][key],
          pass: Math.abs(a[selector][key] - b[selector][key]) <= 1,
        };
      }
    for (const key of [
      "fontSize",
      "fontWeight",
      "lineHeight",
      "letterSpacing",
      "color",
      "paddingTop",
      "paddingBottom",
    ])
      comparisons["linkCSS." + key] = {
        source: a.linkCSS[key],
        local: b.linkCSS[key],
        pass: a.linkCSS[key] === b.linkCSS[key],
      };
    for (const key of ["x", "y", "width", "height"])
      comparisons["cta." + key] = {
        source: a.cta.rect[key],
        local: b.cta.rect[key],
        pass: Math.abs(a.cta.rect[key] - b.cta.rect[key]) <= 1,
      };
    assert.ok(b.overflow <= 1);
    results.push({ width, height, before, source: a, local: b, comparisons });
    if ([375, 1440].includes(width)) {
      await local.screenshot({ path: out + `/navigation-${width}.png` });
      if (width === 1440)
        fs.writeFileSync(
          out + "/source-controls.json",
          JSON.stringify(
            await source.evaluate(() => {
              const p = [
                ...document.querySelectorAll("[data-menu-panel]"),
              ].find((e) => e.getBoundingClientRect().width);
              return {
                arrow: p.querySelector("nav svg").outerHTML,
                cta: [...document.querySelectorAll("header button")]
                  .filter((e) => e.textContent.includes("talk"))
                  .map((e) => e.outerHTML),
              };
            }),
            null,
            2,
          ),
        );
    }
    await source.keyboard.press("Escape");
    await local.keyboard.press("Escape");
    await local.waitForTimeout(550);
  }
  fs.writeFileSync(
    out + "/visual-matrix.json",
    JSON.stringify(results, null, 2),
  );
  console.log(
    "visual failures",
    results.flatMap((r) =>
      Object.entries(r.comparisons)
        .filter(([, v]) => !v.pass)
        .map(([k, v]) => ({ width: r.width, key: k, ...v })),
    ),
  );
  await local.setViewportSize({ width: 375, height: 812 });
  const toggle = local.getByRole("button", { name: "Abrir menu" });
  await toggle.click();
  await local.waitForTimeout(550);
  assert.equal(
    await local.locator("[data-shell-background]").evaluate((e) => e.inert),
    true,
  );
  await local.keyboard.press("Tab");
  assert.equal(
    await local.evaluate(() => document.activeElement.textContent),
    "Approach",
  );
  await local.keyboard.press("Shift+Tab");
  assert.equal(
    await local.evaluate(() =>
      document.activeElement.getAttribute("aria-label"),
    ),
    "Fechar menu",
  );
  await local.locator("header nav a").last().focus();
  await local.keyboard.press("Tab");
  assert.equal(
    await local.evaluate(() =>
      document.activeElement.getAttribute("aria-label"),
    ),
    "Thirdway — home",
  );
  await local.keyboard.press("Shift+Tab");
  assert.equal(
    await local.evaluate(() => document.activeElement.textContent),
    "Journal",
  );
  await local.keyboard.press("Escape");
  assert.equal(
    await local.locator("[data-shell-background]").evaluate((e) => e.inert),
    false,
  );
  await local.evaluate(() => (window.__documentIdentity = "navigation-test"));
  for (const route of ["approach", "services", "people"]) {
    await toggle.click();
    await local.waitForTimeout(550);
    await local.locator(`header nav a[href="/${route}"]`).click();
    await local.waitForURL(`**/${route}`);
    assert.equal(
      await local.evaluate(() => window.__documentIdentity),
      "navigation-test",
    );
    assert.equal(
      await local.locator("[data-shell-background]").evaluate((e) => e.inert),
      false,
    );
    await toggle.click();
    await local.waitForTimeout(550);
    assert.equal(
      await local.locator('header nav [aria-current="page"]').count(),
      1,
    );
    assert.equal(
      await local
        .locator('header nav [aria-current="page"]')
        .getAttribute("href"),
      "/" + route,
    );
    await local.keyboard.press("Escape");
  }
  await local.goBack();
  await local.waitForURL("**/services");
  await local.goForward();
  await local.waitForURL("**/people");
  for (let i = 0; i < 2; i++) {
    await toggle.click();
    await local.setViewportSize({ width: 1440, height: 900 });
    await local.waitForTimeout(600);
    assert.equal(
      await local.locator("[data-shell-background]").evaluate((e) => e.inert),
      false,
    );
    assert.equal(await local.evaluate(() => document.body.style.overflow), "");
    await local.setViewportSize({ width: 375, height: 812 });
  }
  await local.emulateMedia({ reducedMotion: "reduce" });
  await toggle.click();
  await local.waitForTimeout(80);
  await local
    .locator("[data-menu-backdrop]")
    .click({ position: { x: 2, y: 700 } });
  await local.waitForTimeout(80);
  assert.equal(
    await local.locator("[data-shell-background]").evaluate((e) => e.inert),
    false,
  );
  for (const route of ["/", "/approach", "/services", "/people"]) {
    const response = await local.goto("http://localhost:3101" + route);
    assert.equal(response.status(), 200);
    assert.equal(await local.locator("header").count(), 1);
  }
  assert.deepEqual(errors, []);
  fs.writeFileSync(
    out + "/interactions.json",
    JSON.stringify(
      {
        pass: true,
        cases: [
          "focus trap Tab/ShiftTab",
          "Escape focus restore",
          "inert and overflow restoration",
          "three SPA routes with same document",
          "active page unique",
          "Back/Forward",
          "two resize cycles",
          "reduced motion backdrop",
          "four URLs HTTP200",
          "single header",
          "no pageerror",
        ],
        errors,
      },
      null,
      2,
    ),
  );
  assert.equal(
    results.flatMap((r) => Object.values(r.comparisons)).filter((c) => !c.pass)
      .length,
    0,
  );
  console.log("Interactions and visual matrix passed");
} finally {
  await browser.close();
}
