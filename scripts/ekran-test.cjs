// Real-browser check: screenshots, axe, overflow, console errors, small buttons/text.
// Usage: node scripts/ekran-test.cjs [/path ...]   (TEST_URL = base address)
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const { AxeBuilder } = require("@axe-core/playwright");

const root = path.join(__dirname, "..");
const base = (process.env.TEST_URL || "http://localhost:3000").replace(/\/$/, "");
const outDir = path.join(root, "tests", "ekran");

function defaultPaths() {
  let code = "demo";
  try {
    const src = fs.readFileSync(path.join(root, "products/kafe/config.ts"), "utf8");
    const m = src.match(/code:\s*["']([^"']+)["']/);
    if (m) code = m[1];
  } catch {}
  return ["/", `/m/demo/${code}`, "/kafe/mutfak", "/kafe/garson", "/kafe/yonetim", "/kafe/yonetim/qr"];
}

const sizes = [
  { name: "telefon", opts: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true } },
  { name: "tablet", opts: { viewport: { width: 1280, height: 800 } } },
];

async function launch() {
  const candidates = [process.env.PLAYWRIGHT_CHROME, "/usr/bin/google-chrome"].filter((p) => p && fs.existsSync(p));
  for (const exe of candidates) {
    try { return await chromium.launch({ executablePath: exe }); } catch {}
  }
  try { return await chromium.launch(); } catch {
    console.error("Tarayıcı bulunamadı. PLAYWRIGHT_CHROME ortam değişkenine Chrome yolunu yaz ya da `npx playwright install chromium` çalıştır.");
    process.exit(1);
  }
}

function pageStats() {
  const visible = (el) => {
    const r = el.getBoundingClientRect(), s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none";
  };
  const sel = (el) => {
    let s = el.tagName.toLowerCase();
    if (el.id) return s + "#" + el.id;
    if (typeof el.className === "string" && el.className.trim()) s += "." + el.className.trim().split(/\s+/).slice(0, 2).join(".");
    return s;
  };
  const smallButtons = [];
  document.querySelectorAll("button, [role=button], a").forEach((el) => {
    if (!visible(el)) return;
    if (el.tagName === "A" && !el.matches("[role=button]") && el.closest("p, li, h1, h2, h3, h4, h5, h6")) return;
    if (el.tagName === "A") {
      const par = el.parentElement;
      const own = par ? Array.from(par.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim()) : false;
      if (own) return;
    }
    const h = el.getBoundingClientRect().height;
    if (h < 56) smallButtons.push(`${sel(el)} ${Math.round(h)}px`);
  });
  const smallText = [];
  const seen = new Set();
  document.querySelectorAll("body *").forEach((el) => {
    if (!visible(el)) return;
    const own = Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim());
    if (!own) return;
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs < 16) {
      const k = sel(el) + fs;
      if (!seen.has(k)) { seen.add(k); smallText.push({ s: `${sel(el)} ${fs}px` }); }
    }
  });
  return {
    overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    smallButtons,
    smallText: smallText.map((x) => x.s),
  };
}

(async () => {
  const paths = process.argv.length > 2 ? process.argv.slice(2) : defaultPaths();
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await launch();
  let fail = false, total = { axe: 0, tasma: 0, konsol: 0, dugme: 0, yazi: 0 };
  for (const p of paths) {
    const url = base + (p.startsWith("/") ? p : "/" + p);
    const fileName = (p.replace(/^\/+|\/+$/g, "").replace(/[^a-zA-Z0-9]+/g, "-") || "ana");
    for (const size of sizes) {
      const ctx = await browser.newContext(size.opts);
      const page = await ctx.newPage();
      const errors = [];
      page.on("console", (m) => {
        if (m.type() !== "error") return;
        const loc = m.location() && m.location().url;
        // main document's own HTTP status (e.g. 404 page) is not a console error
        if (loc && loc.replace(/\/$/, "") === url.replace(/\/$/, "")) return;
        errors.push(m.text() + (loc ? " [" + loc + "]" : ""));
      });
      page.on("pageerror", (e) => errors.push("sayfa hatası: " + e.message));
      try {
        await page.goto(url, { waitUntil: "load", timeout: 30000 });
      } catch (e) {
        console.error(`Sunucuya ulaşılamadı: ${url}\nSunucu açık mı? (npm run start) Adres yanlışsa TEST_URL ayarla.`);
        await browser.close();
        process.exit(1);
      }
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(outDir, `${fileName}-${size.name}.png`), fullPage: true });
      let axeN = 0;
      const axeLines = [];
      try {
        const r = await new AxeBuilder({ page }).analyze();
        const bad = r.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
        axeN = bad.length;
        bad.forEach((v) => axeLines.push(`   axe: ${v.id} (${v.impact}) → ${v.nodes.slice(0, 2).map((n) => n.target.join(" ")).join(", ")}`));
      } catch (e) { errors.push("axe hatası: " + e.message); }
      const st = await page.evaluate(pageStats);
      const ex = st.smallText.slice(0, 5).join(", ");
      console.log(
        `${p} ${size.name}: axe ${axeN} · ${st.overflow ? "TAŞMA VAR" : "taşma yok"} · konsol ${errors.length} · küçük düğme ${st.smallButtons.length}` +
        ` · küçük yazı ${st.smallText.length}${ex ? " (" + ex + ")" : ""}`
      );
      axeLines.forEach((l) => console.log(l));
      errors.slice(0, 3).forEach((e) => console.log("   konsol: " + e.slice(0, 160)));
      total.axe += axeN; total.tasma += st.overflow ? 1 : 0; total.konsol += errors.length;
      total.dugme += st.smallButtons.length; total.yazi += st.smallText.length;
      await ctx.close();
    }
  }
  await browser.close();
  fail = total.axe > 0 || total.tasma > 0 || total.konsol > 0;
  console.log(`TOPLAM: axe ${total.axe} · taşma ${total.tasma} · konsol ${total.konsol} · küçük düğme ${total.dugme} (uyarı) · küçük yazı ${total.yazi} (uyarı) → ${fail ? "BAŞARISIZ" : "GEÇTİ"}`);
  process.exit(fail ? 1 : 0);
})();
