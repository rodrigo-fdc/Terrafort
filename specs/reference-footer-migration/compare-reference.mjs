const { chromium } = await import(
  process.env.FOOTER_PLAYWRIGHT_PATH || "playwright"
);
import fs from "node:fs";
const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  args: ["--no-sandbox"],
});
const widths = [375, 768, 1024, 1440];
const root = process.cwd();
const out = root + "/specs/reference-footer-migration/evidence";
const html = fs.readFileSync(out + "/reference-footer.html.txt", "utf8");
const css =
  fs.readFileSync(out + "/reference.css.txt", "utf8") +
  fs.readFileSync(out + "/reference-additional.css.txt", "utf8");
const results = [];
for (const width of widths) {
  const reference = await browser.newPage({ viewport: { width, height: 900 } });
  await reference.route("**/*", async (route) => {
    const url = route.request().url();
    if (url.includes(".woff2"))
      return route.fulfill({
        body: fs.readFileSync(
          url.includes("Marist")
            ? root + "/src/shared/components/ui/assets/marist-book.woff2"
            : root + "/public/template/site/waldenburg-medium.woff2",
        ),
        contentType: "font/woff2",
      });
    const asset = JSON.parse(fs.readFileSync(out + "/assets.json")).find(
      (a) => a.source.split("?")[0] === url.split("?")[0],
    );
    if (asset)
      return route.fulfill({
        body: fs.readFileSync(root + "/public" + asset.local),
        contentType: asset.local.endsWith(".svg")
          ? "image/svg+xml"
          : "image/jpeg",
      });
    return route.abort();
  });
  await reference.setContent(
    `<html><head><base href="https://www.thirdway.com/_next/static/chunks/"><style>${css}</style></head><body class="waldenburg_9737c754-module__D6bcEG__variable marist_1f3baa31-module__5tQvGG__variable font-sans">${html}</body></html>`,
  );
  await reference.evaluate(() => document.fonts.ready);
  await reference.waitForTimeout(500);
  const local = await browser.newPage({ viewport: { width, height: 900 } });
  await local.goto(
    (process.env.FOOTER_BASE_URL || "http://127.0.0.1:3000") + "/",
    { waitUntil: "domcontentloaded" },
  );
  await local.evaluate(() => document.fonts.ready);
  await local.waitForTimeout(800);
  await local.locator("footer").scrollIntoViewIfNeeded();
  await local.waitForTimeout(800);
  const geometry = async (page) =>
    page.locator("footer").evaluate((f) => {
      const r = f.getBoundingClientRect();
      const box = (n) => {
        const b = n.getBoundingClientRect(),
          c = getComputedStyle(n);
        return {
          x: b.x,
          y: b.y - r.y,
          width: b.width,
          height: b.height,
          fontSize: c.fontSize,
          lineHeight: c.lineHeight,
          letterSpacing: c.letterSpacing,
          text: n.textContent.slice(0, 65),
        };
      };
      const all = [...f.querySelectorAll("*")];
      return {
        footer: box(f),
        media: box(
          f.querySelector("img").closest("picture")?.parentElement ??
            f.querySelector("img").parentElement,
        ),
        cta: box(
          all.find(
            (x) =>
              x.getAttribute("role") === "button" ||
              x.getAttribute("aria-haspopup") === "dialog",
          ),
        ),
        labels: ["Explore", "Find us", "Email", "Follow us"].map((t) =>
          box(
            all.find(
              (n) => n.textContent === t && n.getBoundingClientRect().width > 0,
            ),
          ),
        ),
        links: ["Approach", "Careers"].map((t) =>
          box(
            all.find(
              (n) =>
                n.tagName === "A" &&
                n.textContent === t &&
                n.getBoundingClientRect().width > 0,
            ),
          ),
        ),
        bottom: box(
          all.find(
            (n) =>
              n.textContent.startsWith("©") &&
              n.children.length === 0 &&
              n.getBoundingClientRect().width > 0,
          ),
        ),
      };
    });
  const entry = {
    width,
    reference: await geometry(reference),
    local: await geometry(local),
  };
  results.push(entry);
  await reference
    .locator("footer")
    .screenshot({ path: out + `/reference-${width}.png` });
  const bounds = await local.locator("footer").boundingBox();
  const scrollY = await local.evaluate(() => window.scrollY);
  await local.screenshot({
    path: out + `/local-${width}.png`,
    fullPage: true,
    clip: {
      x: bounds.x,
      y: bounds.y + scrollY,
      width: bounds.width,
      height: bounds.height,
    },
  });
  await reference.close();
  await local.close();
}
fs.writeFileSync(out + "/geometry.json", JSON.stringify(results, null, 2));
console.log("Comparison saved");
await browser.close();
