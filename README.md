# HomeCalc Tools

Free home improvement material calculators, auto-generated and auto-deployed every Monday.

- **Site:** https://3-mama-3.github.io/calc-tools/
- **Stack:** static HTML + vanilla JS, zero frameworks
- **Automation:** [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs weekly on GitHub Actions — generates new calculator pages from `scripts/calculator-bank.js`, rebuilds `sitemap.xml` and the hub page, commits, and deploys to GitHub Pages.

## Add a new calculator

1. Append a config entry to `scripts/calculator-bank.js` (fields, formula, FAQs, related links)
2. Push to `main` — the workflow (or `node scripts/generate.js` locally) generates the page, updates the index and sitemap, and deploys

## Monetization

- Ad slots + affiliate boxes are pre-wired into every page template (see `css/style.css` `.ad-slot`)
- `ads.txt` is ready for AdSense verification
