const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE ?? "playwright"
);
import fs from "node:fs";
import assert from "node:assert/strict";
import crypto from "node:crypto";

const evidence = "specs/ui-template-site-shell-to-nextjs/evidence";
const url = process.env.PREVIEW_URL ?? "http://127.0.0.1:3100/";
const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage({
  viewport: { width: 375, height: 812 },
  deviceScaleFactor: 1,
});
const errors = [];
const failures = [];
const checks = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});
page.on("response", (response) => {
  if (
    response.url().startsWith(new URL(url).origin) &&
    response.status() >= 400
  )
    failures.push({ url: response.url(), status: response.status() });
});
async function closed() {
  await page.waitForFunction(() => {
    const p = document.querySelector("[data-menu-panel]");
    return (
      p?.getAttribute("data-open") === "false" &&
      Math.abs(p.getBoundingClientRect().height - 44) < 0.1
    );
  });
}
async function opened() {
  await page.waitForFunction(() => {
    const p = document.querySelector("[data-menu-panel]");
    const r = p.getBoundingClientRect();
    const expected = innerWidth >= 1024 ? 94 : 92;
    return (
      p.getAttribute("data-open") === "true" &&
      Math.abs(r.height - expected) < 0.1 &&
      (innerWidth < 1024 || Math.abs(r.width - 680) < 0.1) &&
      getComputedStyle(document.querySelector("[data-lenis-prevent]"))
        .opacity === "1"
    );
  });
}
try {
  await page.clock.install();
  const response = await page.goto(url);
  assert.equal(response.status(), 200);
  await page.waitForFunction(() =>
    document.documentElement.classList.contains("lenis"),
  );
  await page.waitForFunction(
    () => document.querySelector("header").getBoundingClientRect().y >= -0.1,
  );
  assert.equal(await page.locator("[data-site-shell] a").count(), 0);
  assert.equal(
    await page.getByText("Conteúdo da Landing Page", { exact: true }).count(),
    1,
  );
  await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
  await opened();
  assert.equal(
    await page.locator("[data-shell-background]").evaluate((e) => e.inert),
    true,
  );
  assert.equal(
    await page.locator("body").evaluate((e) => e.style.overflow),
    "hidden",
  );
  assert.equal(await page.getByRole("dialog").count(), 1);
  for (const key of ["Tab", "Shift+Tab"]) {
    await page.keyboard.press(key);
    assert.equal(
      await page.evaluate(() =>
        document.activeElement.getAttribute("aria-label"),
      ),
      "Fechar menu",
    );
  }
  const y = await page.evaluate(() => scrollY);
  await page.mouse.wheel(0, 450);
  assert.equal(await page.evaluate(() => scrollY), y);
  await page.screenshot({ path: `${evidence}/final-menu-375.png` });
  await page.keyboard.press("Escape");
  await closed();
  assert.equal(
    await page.evaluate(() =>
      document.activeElement.getAttribute("aria-label"),
    ),
    "Abrir menu",
  );
  assert.equal(
    await page.locator("[data-shell-background]").evaluate((e) => e.inert),
    false,
  );
  assert.equal(
    await page.locator("body").evaluate((e) => e.style.overflow),
    "",
  );
  checks.push(
    "mobile: toggle, modal, focus trap, Escape, scroll lock and restoration",
  );
  await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
  await opened();
  await page.mouse.click(4, 300);
  await closed();
  checks.push("backdrop closes menu");
  await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
  await opened();
  await page.getByRole("button", { name: "Fechar menu", exact: true }).click();
  await closed();
  checks.push("close button");
  await page.screenshot({ path: `${evidence}/final-375.png` });
  await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
  await opened();
  await page.setViewportSize({ width: 1440, height: 900 });
  await closed();
  assert.equal(
    await page.locator("body").evaluate((e) => e.style.overflow),
    "",
  );
  assert.equal(
    await page.locator("[data-shell-background]").evaluate((e) => e.inert),
    false,
  );
  checks.push("breakpoint closes modal and restores background");
  await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
  await opened();
  const dimensions = await page.locator("[data-menu-panel]").boundingBox();
  assert.ok(Math.abs(dimensions.width - 680) <= 1);
  assert.ok(Math.abs(dimensions.height - 94) <= 1);
  assert.equal(
    await page
      .locator("header")
      .evaluate((e) => e.getBoundingClientRect().height),
    84,
  );
  await page.screenshot({ path: `${evidence}/final-menu-1440.png` });
  await page.keyboard.press("Escape");
  await closed();
  await page.screenshot({ path: `${evidence}/final-1440.png` });
  checks.push("desktop: 680px panel, 94px empty height, 84px fixed header");
  const dark = await page
    .locator("[data-site-shell]")
    .evaluate((e) => getComputedStyle(e).backgroundColor);
  await page.emulateMedia({ colorScheme: "dark" });
  assert.equal(
    await page
      .locator("[data-site-shell]")
      .evaluate((e) => getComputedStyle(e).backgroundColor),
    dark,
  );
  checks.push("single light theme");
  await page.evaluate(() =>
    window.scrollTo(
      0,
      document.querySelector('[data-section="teams"]').getBoundingClientRect()
        .top +
        scrollY +
        1,
    ),
  );
  await page.waitForFunction(
    () => document.querySelector("header").dataset.scheme === "dark",
  );
  assert.equal(
    await page
      .locator('[data-menu-panel] [role="img"]')
      .evaluate((e) => getComputedStyle(e).color),
    "rgb(32, 34, 26)",
  );
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForFunction(
    () => document.querySelector("header").dataset.scheme === "light",
  );
  checks.push(
    "section attribute consumed at 44px threshold; logo remains original dark colour",
  );
  // Advance a controlled browser clock to inspect the transition, not an arbitrary sleep.
  await page.clock.pauseAt(new Date(Date.now() + 1000));
  await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
  await page.clock.runFor(250);
  const intermediate = (await page.locator("[data-menu-panel]").boundingBox())
    .width;
  assert.ok(
    intermediate > 172 && intermediate < 680,
    `Intermediate width ${intermediate}`,
  );
  await page.clock.runFor(1000);
  await opened();
  await page.keyboard.press("Escape");
  await page.clock.runFor(1000);
  await closed();
  checks.push(
    "Motion transition has intermediate width and converges under controlled clock",
  );
  await page.clock.resume();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForFunction(
    () => !document.documentElement.classList.contains("lenis"),
  );
  await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
  await opened();
  await page.keyboard.press("Escape");
  await closed();
  assert.equal(
    await page.locator("header").evaluate((e) => getComputedStyle(e).transform),
    "none",
  );
  checks.push("reduced motion: no Lenis, visible header, operational menu");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.waitForFunction(() =>
    document.documentElement.classList.contains("lenis"),
  );
  // The removed preview is now a 404, which Next may load as a new document.
  // Keep the proven SPA cleanup evidence from G4 and verify its code is unchanged.
  const retired = await page.request.get(new URL("/shell-preview", url).href);
  assert.equal(retired.status(), 404);
  const gates = JSON.parse(fs.readFileSync(`${evidence}/gates.json`));
  const verifiedRevision = gates.find((gate) => gate.id === "G4").revision;
  for (const [file, hash] of Object.entries(verifiedRevision)) {
    assert.equal(
      crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex"),
      hash,
    );
  }
  for (let cycle = 0; cycle < 2; cycle++) {
    await page.waitForFunction(
      () => document.querySelector("header").getBoundingClientRect().y >= -0.1,
    );
    await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
    await opened();
    await page.reload();
    await page.waitForFunction(() =>
      document.documentElement.classList.contains("lenis"),
    );
    await page.waitForFunction(
      () => document.querySelector("header").getBoundingClientRect().y >= -0.1,
    );
    await closed();
    assert.equal(
      await page.locator("body").evaluate((e) => e.style.overflow),
      "",
    );
    assert.equal(
      await page.locator("[data-shell-background]").evaluate((e) => e.inert),
      false,
    );
  }
  checks.push(
    "retired preview HTTP 404; two reload cycles restore closed menu; G4 component hashes unchanged from successful SPA cleanup test",
  );
  const baseline = JSON.parse(fs.readFileSync(`${evidence}/baseline.json`));
  for (const file of ["src/app/layout.tsx", "src/app/globals.css"])
    assert.equal(
      crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex"),
      baseline[file],
    );
  assert.equal(fs.existsSync("src/app/page.tsx"), false);
  assert.equal(fs.existsSync("src/app/(public)/shell-preview/page.tsx"), false);
  assert.equal(fs.existsSync("src/app/(public)/page.tsx"), true);
  assert.equal(
    crypto
      .createHash("sha256")
      .update(fs.readFileSync(`${evidence}/original-root-page.tsx.txt`))
      .digest("hex"),
    baseline["src/app/page.tsx"],
  );
  checks.push(
    "authorized root migration; retired preview returns 404; original backup intact; global layout/CSS unchanged",
  );
  assert.deepEqual(errors, []);
  assert.deepEqual(failures, []);
  fs.writeFileSync(
    `${evidence}/final-interaction-check.json`,
    JSON.stringify({ status: "PASS", url, checks, errors, failures }, null, 2),
  );
  console.log("PASS", checks);
} finally {
  await browser.close();
}
