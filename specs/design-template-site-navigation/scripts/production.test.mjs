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
const errors = [],
  routes = [];
try {
  const page = await browser.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);
  });
  for (const route of ["/", "/approach", "/services", "/people"]) {
    const response = await page.goto("http://localhost:3101" + route, {
      waitUntil: "networkidle",
    });
    assert.equal(response.status(), 200);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator("header").count(), 1);
    assert.equal(
      await page.evaluate(() =>
        document.fonts.check("500 16px ThirdwayWaldenburg"),
      ),
      true,
    );
    routes.push({ route, status: response.status() });
  }
  assert.deepEqual(errors, []);
  fs.writeFileSync(
    "specs/design-template-site-navigation/evidence/production.json",
    JSON.stringify({ pass: true, routes, errors }, null, 2),
  );
  console.log("Production routes, fonts, hydration and assets passed");
} finally {
  await browser.close();
}
