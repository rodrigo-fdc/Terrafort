import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import http from "node:http";
import assert from "node:assert/strict";
const require = createRequire(import.meta.url),
  root = process.cwd(),
  ui = path.join(root, "src/shared/components/ui");
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "ui-primitives-"));
const write = (name, text) => fs.writeFileSync(path.join(temp, name), text);
write(
  "loader.cjs",
  `const ts=require(${JSON.stringify(require.resolve("typescript"))});module.exports=function(s){return ts.transpileModule(s,{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText}`,
);
write(
  "css.cjs",
  `module.exports=function(){return 'export default new Proxy({}, {get:(_,key)=>key})'}`,
);
write(
  "entry.jsx",
  `import React,{useState,createRef,StrictMode} from 'react';import {createRoot} from 'react-dom/client';import {${["Button", "IconButton", "TextLink", "Typography", "Input", "Textarea", "Checkbox", "Select", "Badge", "Separator", "Label"].join(",")}} from ${JSON.stringify(path.join(ui, "index.ts"))};
const refs=Object.fromEntries(['button','icon','link','input','textarea','checkbox','select'].map(k=>[k,createRef()]));window.refs=refs;
const options=[{value:'a',label:'Alpha'},{value:'b',label:'Beta',disabled:true},{value:'c',label:'Charlie'}];
function Fixture(){const [controlled,setControlled]=useState('');const [selectDisabled,setSelectDisabled]=useState(false);window.setSelectDisabled=setSelectDisabled;const [checked,setChecked]=useState(false);return <div style={{padding:24,maxWidth:700}}>
<Typography as="h1" variant="heading">Primitives</Typography><Typography variant="display">Display</Typography><Typography>Body</Typography><Typography variant="small">Small</Typography><Typography variant="large">Large</Typography>
<form id="test-form" onSubmit={e=>{e.preventDefault();window.submitted=Object.fromEntries(new FormData(e.currentTarget))}}>
<Button ref={refs.button} onClick={()=>{window.clicks=(window.clicks??0)+1}} data-testid="action">Action</Button>
<Button variant="compact" tone="light">Compact</Button><Button variant="text">Text</Button>
<IconButton ref={refs.icon} aria-label="Icon"><svg viewBox="0 0 32 32"><path d="M8 16h16" stroke="currentColor"/></svg></IconButton>
<TextLink ref={refs.link} href="#destination">Link</TextLink>
<Label htmlFor="input">Name</Label><Input ref={refs.input} id="input" name="name" defaultValue="Initial" placeholder="Name" data-testid="input"/>
<Label htmlFor="message">Message</Label><Textarea ref={refs.textarea} id="message" name="message" defaultValue="Message"/>
<Checkbox ref={refs.checkbox} id="checkbox" name="check" defaultChecked/><Label variant="consent" htmlFor="checkbox">Check</Label>
<Checkbox aria-label="Controlled checkbox" checked={checked} onChange={e=>setChecked(e.target.checked)}/>
<Label htmlFor="choice">Choice</Label><Select ref={refs.select} id="choice" aria-label="Choice" name="choice" disabled={selectDisabled} options={options} defaultValue="a" required/>
<Select aria-label="Controlled" name="controlled" options={options} value={controlled} onValueChange={setControlled} placeholder="Choose" required/>
<Button type="submit">Submit</Button><button type="reset">Reset</button>
</form><button id="outside">Outside</button><Badge>01</Badge><Badge variant="date">25</Badge><Badge variant="year">2026</Badge><Separator/><p id="destination">Target</p></div>}
let app;window.mount=()=>{app=createRoot(document.getElementById('root'));app.render(<StrictMode><Fixture/></StrictMode>)};window.unmount=()=>app.unmount();window.mount();`,
);
await new Promise((resolve, reject) => {
  const compiler = require("next/dist/compiled/webpack/webpack").webpack({
    mode: "development",
    devtool: false,
    entry: path.join(temp, "entry.jsx"),
    output: { path: temp, filename: "bundle.js" },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
      modules: [path.join(root, "node_modules")],
      alias: { "@": path.join(root, "src") },
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
const tokens = fs
  .readFileSync(path.join(ui, "ui-tokens.css"), "utf8")
  .replace("./assets/marist-book.woff2", "/marist.woff2");
const styles = fs.readFileSync(path.join(ui, "ui.module.css"), "utf8");
const server = http.createServer((req, res) => {
  const files = {
    "/bundle.js": [path.join(temp, "bundle.js"), "text/javascript"],
    "/marist.woff2": [path.join(ui, "assets/marist-book.woff2"), "font/woff2"],
    "/template/site/waldenburg-medium.woff2": [
      path.join(root, "public/template/site/waldenburg-medium.woff2"),
      "font/woff2",
    ],
  };
  if (files[req.url]) {
    res.setHeader("Content-Type", files[req.url][1]);
    res.end(fs.readFileSync(files[req.url][0]));
    return;
  }
  res.setHeader("Content-Type", "text/html");
  res.end(
    `<!DOCTYPE html><style>body{margin:0}button,input,select,textarea{font:inherit}*{box-sizing:border-box}${tokens}${styles}</style><div id="root"></div><script src="/bundle.js"></script>`,
  );
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE ??
    "/tmp/thirdway-inspect/node_modules/playwright/index.mjs"
);
const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  args: ["--no-sandbox"],
});
const errors = [],
  checks = [],
  visual = [];
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.goto(`http://127.0.0.1:${server.address().port}`, {
    waitUntil: "networkidle",
  });
  await page.evaluate(() => document.fonts.ready);
  assert.deepEqual(
    await page.evaluate(() =>
      Object.fromEntries(
        Object.entries(window.refs).map(([key, ref]) => [
          key,
          ref.current.tagName,
        ]),
      ),
    ),
    {
      button: "BUTTON",
      icon: "BUTTON",
      link: "A",
      input: "INPUT",
      textarea: "TEXTAREA",
      checkbox: "INPUT",
      select: "BUTTON",
    },
  );
  checks.push("native forwarded refs");
  await page.getByTestId("action").click();
  assert.equal(await page.evaluate(() => window.clicks), 1);
  assert.equal(await page.evaluate(() => window.submitted), undefined);
  assert.equal(await page.getByTestId("action").getAttribute("variant"), null);
  checks.push("button default type, event, data prop and no variant leakage");
  await page.getByLabel("Name", { exact: true }).fill("New value");
  await page.getByLabel("Message", { exact: true }).fill("New message");
  await page.getByLabel("Controlled checkbox").check();
  assert.equal(await page.getByLabel("Controlled checkbox").isChecked(), true);
  await page.getByRole("button", { name: "Submit", exact: true }).click();
  assert.equal(
    await page
      .getByRole("combobox", { name: "Controlled", exact: true })
      .getAttribute("aria-invalid"),
    "true",
  );
  assert.equal(
    await page.evaluate(() =>
      document.activeElement.getAttribute("aria-label"),
    ),
    "Controlled",
  );
  checks.push("required validation focuses custom trigger");
  const choice = page.getByRole("combobox", { name: "Choice", exact: true });
  await choice.focus();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  assert.equal(await choice.textContent(), "Charlie");
  assert.equal(await choice.getAttribute("aria-expanded"), "false");
  await choice.click();
  await page.keyboard.press("Home");
  await page.keyboard.press("Enter");
  assert.equal(await choice.textContent(), "Alpha");
  await choice.click();
  await page.keyboard.press("End");
  await page.keyboard.press("Escape");
  assert.equal(await choice.textContent(), "Alpha");
  checks.push(
    "select arrow keys skip disabled, Home/End, Enter commit, Escape cancel",
  );
  const controlled = page.getByRole("combobox", {
    name: "Controlled",
    exact: true,
  });
  await controlled.focus();
  await page.keyboard.press("c");
  await page.keyboard.press("Enter");
  assert.equal(await controlled.textContent(), "Charlie");
  await page.getByRole("button", { name: "Submit", exact: true }).click();
  assert.deepEqual(await page.evaluate(() => window.submitted), {
    name: "New value",
    message: "New message",
    check: "on",
    choice: "a",
    controlled: "c",
  });
  checks.push("controlled/uncontrolled values and native FormData");
  await choice.click();
  await page.getByRole("option", { name: "Charlie" }).click();
  assert.equal(await choice.textContent(), "Charlie");
  await choice.click();
  await page.mouse.click(5, 5);
  assert.equal(await choice.getAttribute("aria-expanded"), "false");
  await choice.click();
  await page.keyboard.press("Tab");
  assert.equal(await choice.getAttribute("aria-expanded"), "false");
  checks.push("pointer choice, outside dismissal and Tab");
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  assert.equal(await choice.textContent(), "Alpha");
  assert.equal(
    await page.getByLabel("Name", { exact: true }).inputValue(),
    "Initial",
  );
  assert.equal(
    await page.locator('select[name="controlled"]').inputValue(),
    "c",
  );
  checks.push(
    "form reset restores uncontrolled defaults and retains controlled value",
  );
  await choice.click();
  await page.evaluate(() => window.setSelectDisabled(true));
  await page.waitForFunction(() => document.getElementById("choice").disabled);
  assert.equal(await page.getByRole("listbox").count(), 0);
  await page.evaluate(() => window.setSelectDisabled(false));
  await page.waitForFunction(() => !document.getElementById("choice").disabled);
  assert.equal(await choice.getAttribute("aria-expanded"), "false");
  checks.push(
    "disabling open select dismisses and does not reopen on re-enable",
  );
  await choice.click();
  await page.getByRole("option", { name: "Charlie" }).click();
  await page.evaluate(() =>
    document
      .getElementById("test-form")
      .addEventListener("reset", (event) => event.preventDefault(), {
        once: true,
      }),
  );
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  assert.equal(await choice.textContent(), "Charlie");
  checks.push("cancelled form reset preserves selection");
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => document.fonts.ready);
    const measured = await page.evaluate(() => ({
      actionHeight: document
        .querySelector("[data-testid=action]")
        .getBoundingClientRect().height,
      body: getComputedStyle(document.querySelector(".body")).fontSize,
      heading: getComputedStyle(document.querySelector(".heading")).fontSize,
      display: getComputedStyle(document.querySelector(".display")).fontSize,
      checkbox: document.querySelector("#checkbox").getBoundingClientRect()
        .width,
      input: getComputedStyle(document.querySelector("#input")).minHeight,
      color: getComputedStyle(document.querySelector(".heading")).color,
      overflow: document.documentElement.scrollWidth - innerWidth,
    }));
    assert.equal(measured.body, width === 375 ? "16px" : "18px");
    assert.equal(measured.heading, width === 375 ? "32px" : "64px");
    assert.equal(measured.display, width === 375 ? "23px" : "28px");
    assert.equal(measured.checkbox, 16);
    assert.equal(measured.actionHeight, 22);
    assert.equal(measured.color, "rgb(32, 34, 26)");
    assert.ok(measured.overflow <= 1);
    visual.push({ width, ...measured });
    await page.screenshot({
      path: `specs/ui-reference-site-primitives-to-nextjs/evidence/primitives-${width}.png`,
      fullPage: true,
    });
  }
  checks.push("tokens and geometry at mobile/desktop");
  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(
    await page
      .locator(".arrowPill svg")
      .first()
      .evaluate((e) => getComputedStyle(e).transitionDuration),
    "0s",
  );
  checks.push("reduced motion");
  for (let i = 0; i < 2; i++) {
    await choice.click();
    await page.evaluate(() => window.unmount());
    assert.equal(await page.getByRole("listbox").count(), 0);
    await page.evaluate(() => window.mount());
    await page.waitForSelector("#choice");
  }
  checks.push("two Strict Mode unmount/remount cycles remove portal");
  assert.deepEqual(errors, []);
  fs.writeFileSync(
    "specs/ui-reference-site-primitives-to-nextjs/evidence/components-verification.json",
    JSON.stringify({ pass: true, checks, visual, errors }, null, 2),
  );
  console.log(JSON.stringify({ pass: true, checks, visual }));
} finally {
  await browser.close();
  server.close();
}
