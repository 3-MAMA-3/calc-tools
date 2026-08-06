const fs = require("fs");
const path = require("path");
const CFG = require("./config.js");
const BANK = require("./calculator-bank.js");

const ROOT = path.join(__dirname, "..");
const PAGES = path.join(ROOT, CFG.PAGES_DIR);
const SLUGS = [];

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildPage(c) {
  const faqJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  });
  const related = c.related.map((r, i) =>
    `<a class="tool-card" href="${r.slug}.html"><b data-i18n="calc.${r.slug}.h1">${esc(r.title)}</b><span data-i18n="calc.${c.slug}.related.${i}">${esc(r.tag)}</span></a>`
  ).join("\n      ");
  const fieldsJs = c.fields.map(f => {
    let o = "";
    if (f.type === "select") {
      o = ", options: [ " + f.options.map(opt => `{ value: ${opt.value}, label: "${esc(opt.label)}" }`).join(", ") + " ]";
    }
    const extra = [
      f.unit ? `unit: "${esc(f.unit)}"` : null,
      f.value !== undefined ? `value: ${f.value}` : null,
      f.min !== undefined ? `min: ${f.min}` : null,
      f.max !== undefined ? `max: ${f.max}` : null,
      f.step !== undefined ? `step: ${f.step}` : null
    ].filter(Boolean).join(", ");
    return `        { name: "${f.name}", label: "${esc(f.label)}", type: "${f.type || "number"}"${o}${extra ? ", " + extra : ""} }`;
  }).join(",\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(c.metaTitle)}</title>
  <meta name="description" content="${esc(c.description)}">
  <link rel="canonical" href="${CFG.BASE_URL}/${CFG.PAGES_DIR}/${c.slug}.html">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" href="../favicon.svg" type="image/svg+xml">
  <script type="application/ld+json">
  ${faqJson}
  </script>
</head>
<body>
  <header class="site">
    <div class="wrap">
      <a class="logo" href="../index.html"><span class="mark">&#128732;</span> ${esc(CFG.SITE_NAME)}</a>
      <nav class="site">
        <a href="../index.html" data-i18n="nav.all">All calculators</a>
        <span class="lang-wrap"><label class="lang-label" for="lang-select" data-i18n="lang.label">Language</label> <select id="lang-select" aria-label="Language"></select></span>
      </nav>
    </div>
  </header>

  <main class="wrap">
    <section class="hero">
      <h1 data-i18n="calc.${c.slug}.h1">${esc(c.h1)}</h1>
      <p class="lead" data-i18n="calc.${c.slug}.lead">${esc(c.lead)}</p>
    </section>

    <div class="card">
      <form id="calc-form"></form>
      <div id="results" class="results"></div>
      <p class="share"><span data-i18n="share.label">Shareable result link:</span></p>
      <div class="share-row"><input id="share-url" readonly onclick="this.select()"><button type="button" class="btn ghost copy-url" data-i18n="share.copy">Copy</button></div>
    </div>

    <div class="ad-slot" data-i18n="ad.label">Advertisement</div>

    <h2 data-i18n="calc.${c.slug}.ht">How to use this ${esc(c.toolName)}</h2>
    ${c.howto.map((p, i) => `<p data-i18n="calc.${c.slug}.howto.${i}">${p}</p>`).join("\n    ")}

    <div class="faq">
      <h2 data-i18n="calc.${c.slug}.ft">${esc(c.toolName.charAt(0).toUpperCase() + c.toolName.slice(1))} FAQ</h2>
      ${c.faqs.map((f, i) => `<details><summary data-i18n="calc.${c.slug}.faqs.${i}.q">${esc(f.q)}</summary><p data-i18n="calc.${c.slug}.faqs.${i}.a">${esc(f.a)}</p></details>`).join("\n      ")}
    </div>

    <div class="affiliate-box">
      <h3 data-i18n="aff.title">Supplies for this project</h3>
      <ul>
        ${c.affiliate.map((a, i) => `<li><a href="#" rel="nofollow sponsored" data-i18n="calc.${c.slug}.aff.${i}">${esc(a)}</a></li>`).join("\n        ")}
      </ul>
    </div>

    <h2 data-i18n="related.title">Related calculators</h2>
    <div class="tool-grid">
      ${related}
    </div>
  </main>

  <footer class="site">
    <div class="wrap cols">
      <span>&copy; <span id="year"></span> ${esc(CFG.SITE_NAME)}. <span data-i18n="footer.tag">Free home improvement calculators.</span></span>
      <span><a href="../privacy.html" data-i18n="footer.privacy">Privacy</a> &middot; <a href="../contact.html" data-i18n="footer.contact">Contact</a> &middot; <a href="../index.html" data-i18n="nav.all">All calculators</a></span>
    </div>
  </footer>

  <!-- ADSENSE START: replace ca-pub-0000000000000000 with your publisher ID after approval -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000" crossorigin="anonymous"></script>
  <!-- ADSENSE END -->
  <script>window.I18N_BASE = "../";</script>
  <script src="../js/i18n/core.js"></script>
  <script src="../js/i18n/i18n.js"></script>
  <script>
    window.CALC = {
      title: "${esc(c.metaTitle)}",
      fields: [
${fieldsJs}
      ],
      compute: function (v) {
        ${c.computeJs}
      }
    };
  </script>
  <script src="../js/calculator.js"></script>
  <script src="../js/vendor/lenis.min.js"></script>
  <script src="../js/smooth.js"></script>
  <script>document.getElementById("year").textContent = new Date().getFullYear();</script>
</body>
</html>
`;
}

function buildSitemap(slugs) {
  const urls = ["", "privacy.html", "contact.html", ...slugs.map(s => `${CFG.PAGES_DIR}/${s}.html`)].map(u => {
    const lastmod = u === "" ? new Date().toISOString().slice(0, 10) : fs.statSync(path.join(ROOT, u === "" ? "index.html" : u)).mtime.toISOString().slice(0, 10);
    return `  <url>\n    <loc>${CFG.BASE_URL}/${u}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function replaceBase(file) {
  const p = path.join(ROOT, file);
  if (!fs.existsSync(p)) return;
  let t = fs.readFileSync(p, "utf8");
  if (t.includes("@@BASE@@")) {
    t = t.replace(/@@BASE@@/g, CFG.BASE_URL);
    fs.writeFileSync(p, t);
    console.log("base replaced in", file);
  }
}

const SLUG_META = {
  "paint-calculator": ["Paint Calculator", "Gallons of paint for any room"],
  "concrete-calculator": ["Concrete Calculator", "Cubic yards & bags for slabs"],
  "flooring-calculator": ["Flooring Calculator", "Laminate & vinyl cartons"],
  "drywall-calculator": ["Drywall Calculator", "Sheets for walls & ceiling"],
  "tile-calculator": ["Tile Calculator", "Tiles for floor or wall"],
  "rebar-calculator": ["Rebar Calculator", "Bars & spacing for slabs"],
  "gravel-calculator": ["Gravel Calculator", "Tons for driveways & beds"],
  "deck-stain-calculator": ["Deck Stain Calculator", "Stain gallons for decks"],
  "wallpaper-calculator": ["Wallpaper Calculator", "Rolls for any room"],
  "lumber-calculator": ["Board Foot Calculator", "Lumber volume & cost"]
};

function rebuildIndexToolGrid(slugs) {
  const idxPath = path.join(ROOT, "index.html");
  const idx = fs.readFileSync(idxPath, "utf8");
  const start = idx.indexOf("<!-- TOOLS:START -->");
  const end = idx.indexOf("<!-- TOOLS:END -->");
  if (start === -1 || end === -1) return;
  const cards = slugs.map(s => {
    const meta = SLUG_META[s] || BANK.find(c => c.slug === s);
    const title = meta ? (meta[0] || meta.h1 || meta.metaTitle) : s;
    const tag = meta ? (meta[1] || meta.lead || "") : "";
    return `      <a class="tool-card" href="calculators/${s}.html"><b data-i18n="calc.${s}.h1">${esc(title)}</b><span data-i18n="calc.${s}.tag">${esc(tag)}</span></a>`;
  }).join("\n");
  const block = `    <!-- TOOLS:START -->\n    <div class="tool-grid">\n${cards}\n    </div>\n    <!-- TOOLS:END -->`;
  fs.writeFileSync(idxPath, idx.slice(0, start) + block + idx.slice(end + "<!-- TOOLS:END -->".length));
  console.log("index tool grid rebuilt with", slugs.length, "calculators");
}

console.log("Generating calculator pages from bank...");
let created = 0;
for (const c of BANK) {
  SLUGS.push(c.slug);
  const target = path.join(PAGES, c.slug + ".html");
  if (!fs.existsSync(target)) {
    fs.writeFileSync(target, buildPage(c));
    created++;
    console.log("  created:", c.slug + ".html");
  } else {
    console.log("  exists :", c.slug + ".html");
  }
}

const existing = fs.readdirSync(PAGES).filter(f => f.endsWith(".html")).map(f => f.replace(/\.html$/, "")).sort();
for (const s of existing) if (!SLUGS.includes(s)) SLUGS.push(s);
SLUGS.sort();

fs.writeFileSync(path.join(ROOT, "sitemap.xml"), buildSitemap(SLUGS));
console.log("sitemap.xml updated:", SLUGS.length, "urls");

rebuildIndexToolGrid(SLUGS);
["robots.txt", "llms.txt", "index.html", "404.html"].forEach(replaceBase);
for (const s of SLUGS) {
  const p = path.join(PAGES, s + ".html");
  let t = fs.readFileSync(p, "utf8");
  if (t.includes("@@BASE@@") || t.includes("https://nesquik.github.io/calc-tools")) {
    t = t.replace(/@@BASE@@/g, CFG.BASE_URL).split("https://nesquik.github.io/calc-tools").join(CFG.BASE_URL);
    fs.writeFileSync(p, t);
    console.log("base fixed in", s + ".html");
  }
}
console.log("done. created", created, "new page(s).");
