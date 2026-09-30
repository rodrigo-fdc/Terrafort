const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE ?? "playwright"
);
import fs from "node:fs";
import path from "node:path";
const out = path.join(
  process.cwd(),
  "specs/ui-template-site-shell-to-nextjs/evidence",
);
fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 1,
  });
  await page.goto("https://www.thirdway.com/", {
    waitUntil: "domcontentloaded",
  });
  await page.waitForFunction(
    () => document.querySelector("header").getBoundingClientRect().y >= -0.1,
    {},
    { timeout: 45000 },
  );
  const snapshot = () =>
    page.evaluate(() => {
      const visible = (e) =>
        !!(e.getBoundingClientRect().width && e.getBoundingClientRect().height);
      const read = (e) => {
        const s = getComputedStyle(e),
          r = e.getBoundingClientRect();
        return {
          tag: e.tagName,
          classes: e.className,
          style: e.getAttribute("style"),
          rect: { x: r.x, y: r.y, width: r.width, height: r.height },
          css: Object.fromEntries(
            [
              "position",
              "height",
              "maxWidth",
              "paddingTop",
              "paddingBottom",
              "paddingLeft",
              "paddingRight",
              "marginTop",
              "marginBottom",
              "zIndex",
              "backgroundColor",
              "color",
              "overflow",
              "borderRadius",
            ].map((k) => [k, s[k]]),
          ),
        };
      };
      return {
        width: innerWidth,
        height: innerHeight,
        dpr: devicePixelRatio,
        scrollY,
        body: read(document.body),
        header: read(document.querySelector("header")),
        headerContainers: [...document.querySelectorAll("header>.container")]
          .filter(visible)
          .map(read),
        panels: [...document.querySelectorAll("[data-menu-panel]")]
          .filter(visible)
          .map((e) => ({
            panel: read(e),
            row: read(e.firstElementChild),
            logo: read(e.querySelector("svg")),
            content: read(e.lastElementChild),
            nav: read(e.querySelector("nav")),
          })),
        main: [...document.querySelector("main").children].map((e) => ({
          outer: read(e),
          children: [...e.children].slice(0, 5).map(read),
        })),
        footer: {
          outer: read(document.querySelector("footer")),
          children: [...document.querySelector("footer").children].map(read),
        },
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
      };
    });
  const matrix = [];
  for (const w of [
    375, 399, 400, 401, 767, 768, 769, 1023, 1024, 1025, 1439, 1440, 1441, 1919,
    1920, 1921,
  ]) {
    await page.setViewportSize({ width: w, height: w === 375 ? 812 : 900 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(180);
    const entry = { closed: await snapshot() };
    await page
      .getByRole("button", { name: "Open menu", exact: true })
      .filter({ visible: true })
      .first()
      .click();
    await page.waitForFunction(() => {
      const p = [...document.querySelectorAll("[data-menu-panel]")].find(
        (e) => e.getBoundingClientRect().width > 0,
      );
      const r = p.getBoundingClientRect();
      return innerWidth < 1024 || Math.abs(r.width - 680) < 0.1;
    });
    await page.waitForTimeout(1000);
    entry.open = await snapshot();
    await page.keyboard.press("Escape");
    await page.waitForTimeout(600);
    if (w === 375 || w === 1440) {
      await page.screenshot({ path: path.join(out, `source-${w}.png`) });
      await page
        .getByRole("button", { name: "Open menu", exact: true })
        .filter({ visible: true })
        .first()
        .click();
      await page.waitForFunction(() => {
        const p = [...document.querySelectorAll("[data-menu-panel]")].find(
          (e) => e.getBoundingClientRect().width > 0,
        );
        const r = p.getBoundingClientRect();
        return innerWidth < 1024 || Math.abs(r.width - 680) < 0.1;
      });
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(out, `source-menu-${w}.png`) });
      await page.keyboard.press("Escape");
      await page.waitForTimeout(450);
    }
    await page.evaluate(() => window.scrollTo(0, 1600));
    await page.waitForTimeout(200);
    entry.scrolled = await snapshot();
    matrix.push(entry);
  }
  fs.writeFileSync(
    path.join(out, "source-matrix.json"),
    JSON.stringify(matrix, null, 2),
  );
  fs.writeFileSync(
    "/tmp/thirdway-inspect/structure.json",
    JSON.stringify(
      await page.evaluate(() => ({
        main: document.querySelector("main").innerHTML,
        footer: document.querySelector("footer").innerHTML,
        logo: document.querySelector("[data-menu-panel] svg").outerHTML,
      })),
      null,
      2,
    ),
  );
  console.log("Saved matrix", matrix.length);
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
