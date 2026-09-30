#!/usr/bin/env node
import { readFile, stat } from "node:fs/promises";
import { resolve, join } from "node:path";
import { createRequire } from "node:module";

// Heurística de leitura: candidatos não equivalem a compostos confirmados.
async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help")) {
    console.log("Uso: node extract-composites-inventory.mjs URL [URL...] --cwd PATH [--button Button] [--typography Typography] [--executable CHROME]");
    return;
  }
  const options = { cwd: process.cwd(), button: "Button", typography: "Typography" };
  const urls = [];
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      if (!["cwd", "button", "typography", "executable"].includes(key) || !args[i + 1] || args[i + 1].startsWith("--")) {
        throw new Error(`Opção inválida: ${arg}`);
      }
      options[key] = args[++i];
    } else urls.push(new URL(arg));
  }
  if (!urls.length || urls.length > 5 || urls.some((url) => !["http:", "https:"].includes(url.protocol) || url.origin !== urls[0].origin || url.username || url.password)) {
    throw new Error("Forneça de 1 a 5 URLs HTTP(S), sem credenciais, da mesma origem.");
  }

  // Antes de carregar Puppeteer ou abrir qualquer URL.
  const cwd = resolve(options.cwd);
  const ui = join(cwd, "src/shared/components/ui");
  if (!(await stat(ui)).isDirectory()) throw new Error("Diretório UI ausente.");
  const css = await readFile(join(ui, "ui-tokens.css"), "utf8");
  if (!/--ui-[\w-]+\s*:[^;{}]+[;}]/.test(css.replace(/\/\*[\s\S]*?\*\//g, ""))) {
    throw new Error("ui-tokens.css sem tokens declarados.");
  }
  const require = createRequire(join(cwd, "package.json"));
  const ts = require("typescript");
  const configPath = ts.findConfigFile(cwd, ts.sys.fileExists, "tsconfig.json");
  if (!configPath) throw new Error("tsconfig.json ausente.");
  const config = ts.readConfigFile(configPath, ts.sys.readFile);
  if (config.error) throw new Error("tsconfig.json inválido.");
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, cwd);
  if (parsed.errors.length || !parsed.options.strict) throw new Error("TypeScript strict não confirmado.");
  const entry = join(ui, "index.ts");
  const program = ts.createProgram([entry], parsed.options);
  const source = program.getSourceFile(entry);
  const checker = program.getTypeChecker();
  const symbol = source && checker.getSymbolAtLocation(source);
  const exports = symbol ? checker.getExportsOfModule(symbol) : [];
  for (const name of [options.button, options.typography]) {
    let exported = exports.find((item) => item.name === name);
    if (exported?.flags & ts.SymbolFlags.Alias) exported = checker.getAliasedSymbol(exported);
    if (!exported?.valueDeclaration) throw new Error(`Primitivo não resolvido: ${name}`);
  }

  const puppeteer = require("puppeteer");
  const browser = await puppeteer.launch({ headless: true, ...(options.executable ? { executablePath: options.executable } : {}) });
  const report = {
    kind: "candidates-only",
    generatedAt: new Date().toISOString(),
    prerequisites: "Estrutura/exports verificados; contratos e semântica exigem revisão.",
    limits: { pages: 5, scrollSteps: 12, candidates: 200, descendantsPerCandidate: 40 },
    pages: [],
  };
  try {
    for (const url of urls) {
      for (const width of [1440, 375]) {
        const page = await browser.newPage();
        try {
          await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
          const response = await page.goto(url.href, { waitUntil: "networkidle2", timeout: 45000 });
          if (!response?.ok()) throw new Error(`HTTP ${response?.status() ?? "sem resposta"}`);
          if (new URL(page.url()).origin !== urls[0].origin) throw new Error("Redirecionamento fora da origem; inspecione manualmente.");
          await page.evaluate(async () => {
            await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 5000))]);
            for (let step = 0; step < 12; step++) {
              window.scrollBy(0, innerHeight);
              await new Promise((r) => setTimeout(r, 120));
              if (scrollY + innerHeight >= document.documentElement.scrollHeight) break;
            }
            window.scrollTo(0, 0);
          });
          const inventory = await page.evaluate(() => {
            const properties = ["display", "position", "width", "height", "max-width", "padding", "margin", "gap", "grid-template-columns", "align-items", "justify-content", "color", "background", "border", "border-radius", "box-shadow", "filter", "backdrop-filter", "font-family", "font-size", "font-weight", "line-height", "letter-spacing", "opacity", "overflow", "transform", "transform-origin", "transition", "animation", "z-index"];
            const styles = (node, pseudo = null) => {
              const computed = getComputedStyle(node, pseudo);
              return Object.fromEntries([...properties, "content"].map((key) => [key, computed.getPropertyValue(key)]));
            };
            const selector = (node) => {
              const parts = [];
              for (let item = node; item && item !== document.documentElement; item = item.parentElement) {
                const siblings = [...(item.parentElement?.children ?? [])].filter((el) => el.tagName === item.tagName);
                parts.unshift(`${item.localName}:nth-of-type(${siblings.indexOf(item) + 1})`);
              }
              return `html > ${parts.join(" > ")}`;
            };
            const signature = (node, depth = 2) => `${node.localName}[${node.getAttribute("role") ?? ""}](${depth ? [...node.children].map((child) => signature(child, depth - 1)).join(",") : ""})`;
            const excluded = (node) => node.closest("nav,[role=navigation],body > header,body > footer,script,style,template");
            const visible = (node) => node.getClientRects().length && getComputedStyle(node).visibility !== "hidden";
            const candidates = new Map();
            const add = (node, reason) => {
              if (excluded(node)) return;
              const entry = candidates.get(node) ?? { node, reasons: [] };
              entry.reasons.push(reason);
              candidates.set(node, entry);
            };
            for (const parent of document.body.querySelectorAll("*")) {
              const groups = new Map();
              for (const child of parent.children) {
                if (!visible(child) || excluded(child) || child.children.length < 2) continue;
                const key = signature(child);
                groups.set(key, [...(groups.get(key) ?? []), child]);
              }
              for (const group of groups.values()) {
                if (group.length >= 2) for (const child of group) add(child, `repeated-siblings:${group.length}`);
              }
            }
            document.querySelectorAll('dialog,[role="dialog"],[role="alertdialog"],[role="alert"],[role="status"],[role="tooltip"],details,[aria-expanded]').forEach((node) => add(node, "semantic-signal"));
            return {
              fontStatus: document.fonts.status,
              documentHeight: document.documentElement.scrollHeight,
              truncated: candidates.size > 200,
              candidates: [...candidates.values()].slice(0, 200).map(({ node, reasons }) => ({
                selector: selector(node), signature: signature(node), reasons,
                visible: Boolean(visible(node)),
                descendantsTruncated: node.querySelectorAll("*").length > 40,
                nodes: [node, ...[...node.querySelectorAll("*")].slice(0, 40)].map((element) => ({
                  selector: selector(element), tag: element.localName,
                  role: element.getAttribute("role"), state: element.getAttribute("data-state"),
                  rect: element.getBoundingClientRect().toJSON(),
                  css: styles(element), before: styles(element, "::before"), after: styles(element, "::after"),
                })),
              })),
            };
          });
          report.pages.push({ requestedUrl: url.href, finalUrl: page.url(), viewport: { width, height: 900, dpr: 1 }, ...inventory });
        } finally { await page.close(); }
      }
    }
    console.log(JSON.stringify(report, null, 2));
  } finally { await browser.close(); }
}

main().catch((error) => {
  console.error(`BLOCKED: ${error.message}. Verifique os pré-requisitos ou complete a inspeção manual.`);
  process.exitCode = 1;
});
