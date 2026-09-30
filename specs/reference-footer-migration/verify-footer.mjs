import assert from "node:assert/strict";
import fs from "node:fs";

// Use an existing Playwright installation; no project dependency is required.
const { chromium } = await import(
  process.env.FOOTER_PLAYWRIGHT_PATH || "playwright"
);
const base = process.env.FOOTER_BASE_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  args: ["--no-sandbox"],
});
const findings = [];
try {
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    reducedMotion: "reduce",
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(base, { waitUntil: "domcontentloaded" });
  assert.equal(await page.locator("footer").count(), 1);
  assert.equal(
    await page.locator("footer nav[aria-label='Footer navigation'] a").count(),
    8,
  );
  assert.equal(
    await page.locator("footer nav[aria-label='Legal information'] a").count(),
    8,
  );
  assert.equal(await page.locator("footer a[href='#']").count(), 0);
  await page.locator("footer").scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  assert.ok(
    await page
      .locator("footer")
      .evaluate((f) =>
        [...f.querySelectorAll("img")].every(
          (i) => i.complete && i.naturalWidth > 0,
        ),
      ),
  );
  findings.push(
    "single footer, complete navigation/legal inventory, local assets and real destinations: PASS",
  );
  const trigger = page.locator("footer a[aria-haspopup='dialog']");
  await trigger.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await dialog.waitFor();
  assert.equal(await dialog.getByRole("textbox").count(), 4);
  assert.ok(await dialog.evaluate((n) => n.contains(document.activeElement)));
  for (let index = 0; index < 14; index++) {
    await page.keyboard.press("Tab");
    assert.ok(
      await dialog.evaluate((n) => n.contains(document.activeElement)),
      "focus must remain in dialog",
    );
  }
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });
  assert.ok(await trigger.evaluate((n) => n === document.activeElement));
  await trigger.focus();
  await page.keyboard.press("Space");
  assert.equal(
    await dialog.locator("form").evaluate((f) => f.checkValidity()),
    false,
  );
  await dialog.getByLabel("01 Name*").fill("Footer verification");
  await dialog
    .getByLabel("02 Email address*")
    .fill("verification@example.test");
  await dialog.getByLabel("03 Subject*").fill("Office & design");
  await dialog.getByLabel("05 Message*").fill("Message with accents: olá");
  await dialog.getByRole("combobox", { name: "Where to" }).click();
  await page.getByRole("option", { name: "Recruitment" }).click();
  await dialog.locator("input[type='checkbox']").check();
  assert.equal(
    await dialog.locator("form").evaluate((f) => f.checkValidity()),
    true,
  );
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Page.enable");
  const navigation = new Promise((resolve) =>
    cdp.on("Page.frameRequestedNavigation", (event) => {
      if (event.url.startsWith("mailto:")) resolve(event.url);
    }),
  );
  await dialog.getByRole("button", { name: "Prepare email" }).click();
  const mailto = await Promise.race([
    navigation,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("No email draft navigation")), 5000),
    ),
  ]);
  assert.ok(mailto.startsWith("mailto:talent@thirdway.com?"));
  assert.ok(mailto.includes("Office%20%26%20design"));
  assert.ok(mailto.includes("ol%C3%A1"));
  findings.push(
    "dialog keyboard, focus trap/return, native form validation and encoded email draft: PASS",
  );
  await page.keyboard.press("Escape");
  const ruler = page.locator("footer [class*='ruler']");
  assert.equal(
    await ruler
      .locator("[class*='measurement']")
      .first()
      .evaluate((n) => getComputedStyle(n).animationName),
    "none",
  );
  await page.evaluate(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "instant",
    });
  });
  await page.waitForTimeout(300);
  assert.ok((await ruler.innerText()).includes("You’ve scrolled"));
  assert.ok(
    await ruler.evaluate((n) =>
      n.style.getPropertyValue("--footer-progress").endsWith("%"),
    ),
  );
  const before = await ruler.innerText();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(300);
  assert.notEqual(await ruler.innerText(), before);
  findings.push(
    "scroll measurements update and reduced motion disables animation: PASS",
  );
  await page.goto(base + "/approach", { waitUntil: "domcontentloaded" });
  assert.equal(
    await page
      .locator("footer a[href='/approach']")
      .getAttribute("aria-current"),
    "page",
  );
  assert.deepEqual(errors, []);
  findings.push("local route active state and runtime/hydration: PASS");
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 768, height: 900 },
  });
  const noJs = await context.newPage();
  await noJs.goto(base);
  assert.equal(
    await noJs.locator("footer a[aria-haspopup='dialog']").getAttribute("href"),
    "mailto:hello@thirdway.com",
  );
  assert.ok(
    await noJs
      .locator("footer nav[aria-label='Footer navigation']")
      .isVisible(),
  );
  assert.ok(await noJs.locator("footer address").isVisible());
  findings.push("JS-disabled structural content and mailto fallback: PASS");
  await context.close();
} finally {
  await browser.close();
  fs.writeFileSync(
    new URL("./evidence/browser-checks.json", import.meta.url),
    JSON.stringify(findings, null, 2) + "\n",
  );
  console.log(findings.join("\n"));
}
