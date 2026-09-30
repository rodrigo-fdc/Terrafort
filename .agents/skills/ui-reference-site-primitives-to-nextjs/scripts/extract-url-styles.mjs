#!/usr/bin/env node
import { createRequire } from "node:module";
import { writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { pathToFileURL } from "node:url";

const help = `Uso: node extract-url-styles.mjs <http(s)://url> [opções]
  --output <arquivo.json>     Grava JSON; sem esta opção, usa stdout
  --viewport <larguraxaltura> Padrão: 1440x900, DPR 1
  --selector <css>            Seletor de amostragem personalizado
  --limit <n>                 Máximo de elementos visíveis (padrão: 100)
  --states                    Mede hover/focus programático sem clicar
  --browser-path <arquivo>   Executável Chromium/Chrome opcional
  --help                      Exibe esta ajuda

Requer Playwright no CWD ou PLAYWRIGHT_MODULE apontando para seu módulo.
Não instala dependências nem gera componentes. Execute novamente por viewport.`;
const defaultSelector = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "label",
  "button",
  '[role="button"]',
  "input:not([type=hidden])",
  "textarea",
  "select",
  "hr",
  '[role="separator"]',
  '[class*="badge"]',
  '[class*="chip"]',
  "[data-ui]",
].join(",");
const properties = [
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "line-height",
  "letter-spacing",
  "font-kerning",
  "font-feature-settings",
  "text-transform",
  "text-decoration",
  "text-box-trim",
  "color",
  "background-color",
  "background-image",
  "border-top-color",
  "border-top-style",
  "border-top-width",
  "border-right-color",
  "border-right-style",
  "border-right-width",
  "border-bottom-color",
  "border-bottom-style",
  "border-bottom-width",
  "border-left-color",
  "border-left-style",
  "border-left-width",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-bottom-left-radius",
  "border-bottom-right-radius",
  "box-shadow",
  "outline-color",
  "outline-style",
  "outline-width",
  "outline-offset",
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left",
  "gap",
  "min-width",
  "min-height",
  "opacity",
  "appearance",
  "accent-color",
  "cursor",
  "transition-property",
  "transition-duration",
  "transition-timing-function",
  "transform",
];

function parse(args) {
  const options = {
    viewport: "1440x900",
    limit: "100",
    selector: defaultSelector,
    states: false,
  };
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg === "--states") options.states = true;
    else if (
      [
        "--output",
        "--viewport",
        "--selector",
        "--limit",
        "--browser-path",
      ].includes(arg)
    ) {
      const value = args[++index];
      if (!value || value.startsWith("--"))
        throw new Error(`Falta valor de ${arg}`);
      options[arg.slice(2)] = value;
    } else if (!arg.startsWith("--") && !options.url) options.url = arg;
    else throw new Error(`Argumento desconhecido: ${arg}`);
  }
  if (!options.url) throw new Error("Informe a URL de referência. Use --help.");
  const url = new URL(options.url);
  if (!["http:", "https:"].includes(url.protocol))
    throw new Error("A URL deve usar HTTP ou HTTPS.");
  if (!/^\d+x\d+$/.test(options.viewport))
    throw new Error("Viewport inválido: use 1440x900.");
  const [width, height] = options.viewport.split("x").map(Number);
  if (
    ![width, height].every(
      (value) => Number.isSafeInteger(value) && value > 0 && value <= 16384,
    )
  )
    throw new Error("Dimensões de viewport fora de 1–16384.");
  const limit = Number(options.limit);
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > 1000)
    throw new Error("--limit deve estar entre 1 e 1000.");
  return { ...options, url: url.href, viewport: { width, height }, limit };
}

async function loadPlaywright() {
  try {
    const custom = process.env.PLAYWRIGHT_MODULE;
    if (custom)
      return await import(
        custom.startsWith("file:")
          ? custom
          : pathToFileURL(resolve(custom)).href
      );
    const fromProject = createRequire(resolve(process.cwd(), "package.json"));
    return await import(pathToFileURL(fromProject.resolve("playwright")).href);
  } catch (error) {
    throw new Error(
      `Playwright indisponível. Use uma instalação do projeto ou PLAYWRIGHT_MODULE. ${error.message}`,
    );
  }
}

async function snapshot(locator) {
  return locator.evaluate((element, names) => {
    const computed = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return {
      styles: Object.fromEntries(
        names.map((name) => [name, computed.getPropertyValue(name)]),
      ),
      bounds: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
      focused: document.activeElement === element,
      focusVisible: element.matches(":focus-visible"),
      hovered: element.matches(":hover"),
    };
  }, properties);
}

async function extract(options) {
  const { chromium } = await loadPlaywright();
  const browser = await chromium.launch({
    headless: true,
    ...(options["browser-path"]
      ? { executablePath: resolve(options["browser-path"]) }
      : {}),
  });
  try {
    const page = await browser.newPage({
      viewport: options.viewport,
      deviceScaleFactor: 1,
    });
    page.setDefaultTimeout(10000);
    const warnings = [];
    const response = await page.goto(options.url, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    if (!response || response.status() >= 400)
      throw new Error(
        `Resposta HTTP inválida: ${response?.status() ?? "sem resposta"}`,
      );
    await page
      .waitForFunction(
        () => document.readyState === "complete",
        {},
        { timeout: 10000 },
      )
      .catch(() =>
        warnings.push(
          "Carregamento da página não concluiu em 10s; confirme recursos antes dos gates.",
        ),
      );
    await page
      .waitForFunction(
        () => document.fonts.status === "loaded",
        {},
        { timeout: 10000 },
      )
      .catch(() =>
        warnings.push(
          "Fontes ainda carregando; não aprovar tipografia sem nova medição.",
        ),
      );
    const environment = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      return {
        finalUrl: location.href,
        title: document.title,
        userAgent: navigator.userAgent,
        dpr: devicePixelRatio,
        colorScheme: root.colorScheme,
        prefersDark: matchMedia("(prefers-color-scheme: dark)").matches,
        rootVariables: Object.fromEntries(
          [...root]
            .filter((name) => name.startsWith("--"))
            .map((name) => [name, root.getPropertyValue(name).trim()]),
        ),
        fonts: [...document.fonts].map((font) => ({
          family: font.family,
          weight: font.weight,
          style: font.style,
          status: font.status,
        })),
      };
    });
    const candidates = page.locator(options.selector);
    const count = await candidates.count();
    const elements = [];
    for (
      let index = 0;
      index < count && elements.length < options.limit;
      index++
    ) {
      const locator = candidates.nth(index);
      if (!(await locator.isVisible())) continue;
      const identity = await locator.evaluate((element) => {
        const segments = [];
        for (let node = element; node; node = node.parentElement) {
          if (node.id) {
            segments.unshift(`#${CSS.escape(node.id)}`);
            break;
          }
          const siblings = node.parentElement
            ? [...node.parentElement.children].filter(
                (sibling) => sibling.tagName === node.tagName,
              )
            : [node];
          segments.unshift(
            `${node.localName}:nth-of-type(${siblings.indexOf(node) + 1})`,
          );
        }
        return {
          selector: segments.join(" > "),
          tag: element.localName,
          classes: [...element.classList],
          role: element.getAttribute("role"),
          type: element.getAttribute("type"),
          disabled: element.matches(":disabled"),
          checked: element.matches(":checked"),
          // Input values and form payloads are deliberately not collected.
        };
      });
      const states = { default: await snapshot(locator) };
      if (options.states) {
        for (const state of ["hover", "focus"]) {
          try {
            if (state === "hover") await locator.hover();
            else {
              await page.mouse.move(0, 0);
              await locator.focus();
            }
            // Wait for finite CSS transitions; do not finish or cancel source animations.
            const duration = await locator.evaluate((element) => {
              const css = getComputedStyle(element);
              const ms = (value) =>
                parseFloat(value) * (value.trim().endsWith("ms") ? 1 : 1000);
              const durations = css.transitionDuration.split(",").map(ms);
              const delays = css.transitionDelay.split(",").map(ms);
              return Math.max(
                0,
                ...durations.map(
                  (value, index) => value + delays[index % delays.length],
                ),
              );
            });
            if (duration > 2000)
              warnings.push(
                `${identity.selector}: transição maior que 2s, estado requer inspeção manual.`,
              );
            await page.waitForTimeout(Math.min(duration, 2000) + 50);
            states[state] = await snapshot(locator);
          } catch (error) {
            warnings.push(
              `${identity.selector} / ${state}: ${error.message.split("\n")[0]}`,
            );
          }
        }
        await locator.evaluate((element) => {
          if (document.activeElement === element) element.blur();
        });
        await page.mouse.move(0, 0);
      }
      elements.push({ ...identity, states });
    }
    if (!elements.length)
      throw new Error(
        "Nenhum primitivo visível encontrado; revise o seletor ou a página.",
      );
    return {
      schemaVersion: 1,
      capturedAt: new Date().toISOString(),
      requestedUrl: options.url,
      viewport: options.viewport,
      browserVersion: browser.version(),
      ...environment,
      sampling: {
        matched: count,
        captured: elements.length,
        limit: options.limit,
        selector: options.selector,
        statesRequested: options.states,
      },
      warnings,
      elements,
    };
  } finally {
    await browser.close();
  }
}

// Expansão futura: pseudo-elementos, iframes e coleta assistida em múltiplas páginas.
try {
  if (process.argv.slice(2).includes("--help"))
    process.stdout.write(help + "\n");
  else {
    const options = parse(process.argv.slice(2));
    const report = JSON.stringify(await extract(options), null, 2) + "\n";
    if (options.output) {
      const file = resolve(options.output);
      await mkdir(dirname(file), { recursive: true });
      await writeFile(file, report, "utf8");
      process.stderr.write(`Estilos gravados em ${file}\n`);
    } else process.stdout.write(report);
  }
} catch (error) {
  process.stderr.write(`Falha na extração: ${error.message}\n`);
  process.exitCode = 1;
}
