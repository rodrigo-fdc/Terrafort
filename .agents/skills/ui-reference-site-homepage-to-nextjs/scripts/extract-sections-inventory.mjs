#!/usr/bin/env node
import { stat, readFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { createRequire } from "node:module";

async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help")) {
    console.log("Uso: node extract-sections-inventory.mjs URL --cwd PATH [--executable CHROME]");
    return;
  }
  const options = { cwd: process.cwd() };
  let url;
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      if (!["cwd", "executable"].includes(key) || !args[i + 1] || args[i + 1].startsWith("--")) {
        throw new Error(`Opção inválida: ${arg}`);
      }
      options[key] = args[++i];
    } else {
      if (url) throw new Error("Forneça somente a URL da homepage.");
      url = new URL(arg);
    }
  }
  if (!url || !["http:", "https:"].includes(url.protocol) || url.username || url.password) {
    throw new Error("URL HTTP(S) pública e sem credenciais obrigatória.");
  }

  // Gate parcial de caminhos, antes de carregar o browser ou acessar a URL.
  const cwd = resolve(options.cwd);
  for (const relative of ["src/app", "src/shared/components/navigation", "src/shared/components/ui"]) {
    if (!(await stat(join(cwd, relative))).isDirectory()) throw new Error(`Diretório ausente: ${relative}`);
  }
  const css = await readFile(join(cwd, "src/shared/components/ui/ui-tokens.css"), "utf8");
  if (!/--ui-[\w-]+\s*:[^;{}]+[;}]/.test(css.replace(/\/\*[\s\S]*?\*\//g, ""))) {
    throw new Error("ui-tokens.css não contém tokens declarados.");
  }
  const require = createRequire(join(cwd, "package.json"));
  const puppeteer = require("puppeteer");
  const browser = await puppeteer.launch({
    headless: true,
    ...(options.executable ? { executablePath: options.executable } : {}),
  });
  const report = {
    kind: "section-candidates-only",
    requestedUrl: url.href,
    generatedAt: new Date().toISOString(),
    prerequisiteCheck: "Somente caminhos/tokens; exports e integração exigem revisão humana/agente.",
    limits: { scrollSteps: 30, candidatesPerCapture: 150 },
    pages: [],
  };
  try {
    for (const width of [1440, 375]) {
      const page = await browser.newPage();
      try {
        await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
        const response = await page.goto(url.href, { waitUntil: "networkidle2", timeout: 45000 });
        if (!response?.ok()) throw new Error(`HTTP ${response?.status() ?? "sem resposta"}`);
        if (new URL(page.url()).origin !== url.origin) throw new Error("Redirecionamento de origem exige revisão manual.");
        await page.evaluate(() => Promise.race([
          document.fonts.ready,
          new Promise((resolve) => setTimeout(resolve, 5000)),
        ]));
        const capture = () => page.evaluate(() => {
          const properties = ["display", "position", "background-color", "background-image", "padding", "margin", "gap", "min-height", "max-width", "overflow", "z-index", "transform", "opacity", "isolation", "filter", "scroll-margin-top"];
          const css = (node, pseudo = null) => {
            const style = getComputedStyle(node, pseudo);
            return Object.fromEntries([...properties, "content"].map((name) => [name, style.getPropertyValue(name)]));
          };
          const selector = (node) => {
            const parts = [];
            for (let current = node; current && current !== document.documentElement; current = current.parentElement) {
              const siblings = [...(current.parentElement?.children ?? [])].filter((item) => item.tagName === current.tagName);
              parts.unshift(`${current.localName}:nth-of-type(${siblings.indexOf(current) + 1})`);
            }
            return `html > ${parts.join(" > ")}`;
          };
          const main = document.querySelector("main") ?? document.body;
          const nodes = [...new Set([...main.querySelectorAll("section"), ...main.children])]
            .filter((node) => !node.matches("header,footer,nav,script,style,template") && !node.closest("nav,[role=navigation]"))
            .sort((a, b) => a === b ? 0 : a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
          return {
            scrollY,
            documentHeight: document.documentElement.scrollHeight,
            fontStatus: document.fonts.status,
            truncated: nodes.length > 150,
            candidates: nodes.slice(0, 150).map((node, index) => {
              const rect = node.getBoundingClientRect();
              const ancestors = [];
              for (let parent = node.parentElement; parent; parent = parent.parentElement) {
                ancestors.push({ selector: selector(parent), css: css(parent) });
              }
              return {
                order: index + 1,
                selector: selector(node),
                id: node.id || null,
                tag: node.localName,
                heading: node.querySelector("h1,h2,h3")?.textContent?.trim() ?? null,
                visible: Boolean(node.getClientRects().length) && getComputedStyle(node).visibility !== "hidden",
                rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height, documentTop: rect.top + scrollY, documentBottom: rect.bottom + scrollY },
                css: css(node), before: css(node, "::before"), after: css(node, "::after"),
                ancestors,
              };
            }),
          };
        });
        const initial = await capture();
        const scroll = await page.evaluate(async () => {
          let steps = 0;
          for (; steps < 30; steps++) {
            window.scrollBy(0, innerHeight * 0.8);
            await new Promise((resolve) => setTimeout(resolve, 150));
            if (scrollY + innerHeight >= document.documentElement.scrollHeight - 1) break;
          }
          const reachedBottom = scrollY + innerHeight >= document.documentElement.scrollHeight - 1;
          window.scrollTo({ top: 0, behavior: "instant" });
          await new Promise((resolve) => setTimeout(resolve, 300));
          return { steps: Math.min(steps + 1, 30), reachedBottom };
        });
        report.pages.push({ finalUrl: page.url(), viewport: { width, height: 900, dpr: 1 }, scroll, initial, afterScroll: await capture() });
      } finally { await page.close(); }
    }
    console.log(JSON.stringify(report, null, 2));
  } finally { await browser.close(); }
}

main().catch((error) => {
  console.error(`BLOCKED: ${error.message}. Revise os pré-requisitos e complete a inspeção manual.`);
  process.exitCode = 1;
});
