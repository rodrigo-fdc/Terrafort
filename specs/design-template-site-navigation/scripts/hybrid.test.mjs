import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import assert from "node:assert/strict";
const require = createRequire(import.meta.url);
const cwd = process.cwd();
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "navigation-hybrid-"));
const modulePath =
  process.env.PLAYWRIGHT_MODULE ??
  "/tmp/thirdway-inspect/node_modules/playwright/index.mjs";
const { chromium } = await import(modulePath);
const nav = path.join(cwd, "src/shared/template/site/navigation");
fs.writeFileSync(
  path.join(temp, "loader.cjs"),
  `const ts=require(${JSON.stringify(require.resolve("typescript"))});module.exports=function(source){return ts.transpileModule(source,{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText}`,
);
fs.writeFileSync(
  path.join(temp, "css.cjs"),
  'module.exports=function(){return "export default new Proxy({}, {get:(_,key)=>key})"}',
);
fs.writeFileSync(
  path.join(temp, "router.jsx"),
  `import {useSyncExternalStore} from 'react';
const subscribe=fn=>{window.addEventListener('popstate',fn);return()=>window.removeEventListener('popstate',fn)};
export const usePathname=()=>useSyncExternalStore(subscribe,()=>location.pathname,()=>'/approach');`,
);
fs.writeFileSync(
  path.join(temp, "link.jsx"),
  `import React from 'react';export default function Link({onClick,...props}){return <a {...props} onClick={e=>{onClick?.(e);if(e.defaultPrevented||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||e.button)return;e.preventDefault();history.pushState(null,'',props.href);window.dispatchEvent(new PopStateEvent('popstate'));}}/>}`,
);
fs.writeFileSync(
  path.join(temp, "entry.jsx"),
  `import React from 'react';import {createRoot} from 'react-dom/client';
import {useNavigationState} from ${JSON.stringify(path.join(nav, "use-navigation-state.ts"))};
import {NavLink} from ${JSON.stringify(path.join(nav, "nav-link.component.tsx"))};
import * as state from ${JSON.stringify(path.join(nav, "navigation-state.ts"))};
window.navigationState=state;
const items=[{id:'route',label:'Route',kind:'route',href:'/approach',match:'exact'},{id:'first',label:'First',kind:'anchor',pathname:'/approach',fragment:'first'},{id:'last',label:'Last',kind:'anchor',pathname:'/approach',fragment:'last'},{id:'other',label:'Other',kind:'anchor',pathname:'/services',fragment:'last'},{id:'missing',label:'Missing',kind:'anchor',pathname:'/approach',fragment:'missing'}];
function Fixture(){const s=useNavigationState(items);return <div data-site-shell><header ref={s.headerRef} style={{position:'fixed',top:0,height:60,width:300,background:'white'}}><div data-header-row style={{height:60}}/><div data-menu-panel><button ref={s.buttonRef} onClick={s.toggle} aria-expanded={s.open}>Toggle</button><nav inert={!s.open} data-active={s.activeId}>{items.map(item=><NavLink key={item.id} item={item} pathname={s.pathname} activeId={s.activeId} onNavigate={s.onNavigate}/>)}</nav></div></header><div data-shell-background><main style={{height:4000}}><h1>Fixture</h1><div id="first" style={{position:'absolute',top:500}}>First target</div><div id="last" style={{position:'absolute',top:1500}}>Last target</div></main></div></div>}
let root;window.mount=()=>{root=createRoot(document.getElementById('root'));root.render(<Fixture/>)};window.unmount=()=>root.unmount();window.mount();`,
);
const webpack = require("next/dist/compiled/webpack/webpack").webpack;
await new Promise((resolve, reject) => {
  const compiler = webpack({
    mode: "development",
    devtool: false,
    entry: path.join(temp, "entry.jsx"),
    output: { path: temp, filename: "bundle.js" },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
      modules: [path.join(cwd, "node_modules"), "node_modules"],
      alias: {
        "next/navigation$": path.join(temp, "router.jsx"),
        "next/link$": path.join(temp, "link.jsx"),
      },
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: path.join(temp, "loader.cjs"),
        },
        { test: /\.css$/, use: path.join(temp, "css.cjs") },
      ],
    },
  });
  compiler.run((error, stats) => {
    compiler.close(() => {});
    if (error || stats.hasErrors())
      reject(error ?? new Error(stats.toString({ all: false, errors: true })));
    else resolve();
  });
});
const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox"],
});
const checks = [];
const errors = [];
try {
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 },
    reducedMotion: "reduce",
  });
  page.on("pageerror", (e) => errors.push(e.message));
  await page.route("http://navigation.test/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: '<!DOCTYPE html><style>nav{display:flex;flex-direction:column}nav svg{display:none}header{z-index:10}</style><div id="root"></div>',
    }),
  );
  await page.goto("http://navigation.test/approach#first");
  await page.addScriptTag({ path: path.join(temp, "bundle.js") });
  await page.waitForFunction(
    () => document.querySelector("nav")?.dataset.active === "first",
  );
  assert.ok(
    Math.abs(
      (await page
        .locator("#first")
        .evaluate((e) => e.getBoundingClientRect().top)) - 60,
    ) <= 1,
  );
  checks.push("deep-link and dynamic header offset");
  const toggle = page.getByRole("button", { name: "Toggle" });
  await toggle.click();
  await page.getByRole("link", { name: "Last", exact: true }).click();
  await page.waitForFunction(
    () => document.querySelector("nav").dataset.active === "last",
  );
  assert.equal(await page.evaluate(() => document.activeElement.id), "last");
  assert.equal(
    await page.locator("[data-shell-background]").evaluate((e) => e.inert),
    false,
  );
  checks.push("same-page anchor unlock before scroll and focus target");
  const historyLength = await page.evaluate(() => history.length);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForFunction(
    () => document.querySelector("nav").dataset.active === "route",
  );
  assert.equal(await page.evaluate(() => history.length), historyLength);
  checks.push(
    "before first anchor route fallback and no passive history pollution",
  );
  await page.evaluate(() =>
    window.scrollTo(0, document.documentElement.scrollHeight),
  );
  await page.waitForFunction(
    () => document.querySelector("nav").dataset.active === "last",
  );
  checks.push("document end chooses last existing anchor");
  await page.goBack();
  await page.waitForFunction(
    () =>
      location.hash === "#first" &&
      document.querySelector("nav").dataset.active === "first",
  );
  await page.goForward();
  await page.waitForFunction(() => location.hash === "#last");
  checks.push("Back and Forward hashes");
  await toggle.click();
  await page.getByRole("link", { name: "Other", exact: true }).click();
  await page.waitForFunction(
    () =>
      location.pathname === "/services" &&
      document.querySelector("nav").dataset.active === "other",
  );
  checks.push("cross-route owner selection (isolated router adapter)");
  await toggle.click();
  await page
    .getByRole("link", { name: "First", exact: true })
    .dispatchEvent("click", { ctrlKey: true });
  assert.equal(await toggle.getAttribute("aria-expanded"), "true");
  assert.equal(await page.evaluate(() => location.pathname), "/services");
  checks.push("modifier preserves current document and menu");
  await page.keyboard.press("Escape");
  const unit = await page.evaluate(() => {
    const { resolveActive, decodeHash, hrefFor } = window.navigationState;
    const items = [
      { id: "root", kind: "route", href: "/", match: "segment" },
      { id: "about", kind: "route", href: "/sobre", match: "segment" },
      { id: "team", kind: "route", href: "/sobre/time", match: "exact" },
      { id: "a", kind: "anchor", pathname: "/sobre", fragment: "contato" },
      { id: "ext", kind: "external", href: "https://example.com" },
    ];
    return [
      resolveActive(items, "/sobre-nos", null),
      resolveActive(items, "/sobre/time", null),
      resolveActive(items, "/sobre", "a"),
      resolveActive(items, "/else", "a"),
      decodeHash("#%E0%A4%A"),
      hrefFor(items[3]),
    ];
  });
  assert.deepEqual(unit, [null, "team", "a", null, "", "/sobre#contato"]);
  checks.push(
    "false prefix, root exact, most-specific route, anchor precedence, owner, invalid hash",
  );
  await page.evaluate(() => {
    history.pushState(null, "", "/approach#missing");
    window.dispatchEvent(new PopStateEvent("popstate"));
    scrollTo(0, 0);
  });
  await page.waitForFunction(
    () => document.querySelector("nav").dataset.active === "route",
  );
  await page.evaluate(() => {
    history.pushState(null, "", "/approach#%E0%A4%A");
    window.dispatchEvent(new Event("hashchange"));
  });
  await page.waitForTimeout(100);
  assert.equal(await page.locator("nav").getAttribute("data-active"), "route");
  checks.push(
    "missing target and malformed hash preserve route fallback without errors",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.waitForFunction(() =>
    document.documentElement.classList.contains("lenis"),
  );
  for (let i = 0; i < 2; i++) {
    await toggle.click();
    await page.evaluate(() => {
      window.oldBackground = document.querySelector("[data-shell-background]");
      window.unmount();
    });
    assert.equal(await page.evaluate(() => window.oldBackground.inert), false);
    assert.equal(
      await page.evaluate(() =>
        document.documentElement.classList.contains("lenis"),
      ),
      false,
    );
    assert.equal(await page.evaluate(() => document.body.style.overflow), "");
    await page.evaluate(() => window.mount());
    await page.waitForSelector("button");
    await page.waitForFunction(() =>
      document.documentElement.classList.contains("lenis"),
    );
  }
  checks.push(
    "two actual hook unmount/remount cycles restore overflow and inert",
  );
  assert.deepEqual(errors, []);
  fs.writeFileSync(
    "specs/design-template-site-navigation/evidence/hybrid.json",
    JSON.stringify(
      {
        pass: true,
        checks,
        errors,
        limitation:
          "Isolated Next router boundary adapter; real App Router SPA and history tested by navigation-verify.mjs.",
      },
      null,
      2,
    ),
  );
  console.log("Hybrid checks passed:", checks.length);
} finally {
  await browser.close();
}
