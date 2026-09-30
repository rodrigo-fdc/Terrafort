import fs from "node:fs";
import assert from "node:assert/strict";
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE ??
    "/tmp/thirdway-inspect/node_modules/playwright/index.mjs"
);
const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  args: ["--no-sandbox"],
});
const evidence = { scroll: [], animation: [] };
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  await page.goto("http://localhost:3101/", { waitUntil: "networkidle" });
  const boundary = await page
    .locator('[data-section="hero"]')
    .evaluate((e) => e.getBoundingClientRect().bottom + scrollY - 44);
  for (const offset of [-1, 0, 1, 0, -1]) {
    await page.evaluate((y) => scrollTo(0, y), boundary + offset);
    await page.waitForTimeout(100);
    const state = await page.locator("header").evaluate((e) => ({
      scheme: e.dataset.scheme,
      height: e.getBoundingClientRect().height,
      y: e.getBoundingClientRect().y,
    }));
    assert.equal(state.scheme, offset < 0 ? "light" : "dark");
    assert.equal(state.height, 84);
    assert.equal(state.y, 0);
    evidence.scroll.push({ offset, ...state });
  }
  await page.close();
  const animated = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  await animated.clock.install();
  await animated.goto("http://localhost:3101/", { waitUntil: "networkidle" });
  await animated.waitForFunction(() =>
    document.documentElement.classList.contains("lenis"),
  );
  await animated.clock.runFor(1200);
  await animated.clock.pauseAt(new Date(Date.now() + 2000));
  const width = () =>
    animated
      .locator("[data-menu-panel]")
      .evaluate((e) => e.getBoundingClientRect().width);
  assert.ok(
    Math.abs((await width()) - 172) < 1,
    `Expected 172, got ${await width()}`,
  );
  await animated.getByRole("button", { name: "Abrir menu" }).click();
  await animated.clock.runFor(250);
  const mid = await width();
  assert.ok(mid > 172 && mid < 680);
  evidence.animation.push({ ms: 250, width: mid });
  await animated.clock.runFor(300);
  assert.ok(Math.abs((await width()) - 680) < 1);
  evidence.animation.push({ ms: 550, width: await width() });
  await animated.keyboard.press("Escape");
  await animated.clock.runFor(550);
  assert.ok(
    Math.abs((await width()) - 172) < 1,
    `Expected 172, got ${await width()}`,
  );
  evidence.animation.push({ ms: 550, closing: true, width: await width() });
  fs.writeFileSync(
    "specs/design-template-site-navigation/evidence/states.json",
    JSON.stringify({ pass: true, ...evidence }, null, 2),
  );
  console.log("Scroll thresholds and controlled animation passed");
} finally {
  await browser.close();
}
