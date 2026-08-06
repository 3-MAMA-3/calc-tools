# HANDOFF-GUIDE — HomeCalc Tools

Your site is **live**: https://3-mama-3.github.io/calc-tools/

Everything technical is automated and needs no attention. These are the **only three human steps** left, in order. Total time: ~45 minutes, one-time.

---

## Step 1 — Google Search Console (do this now, ~15 min)

This tells Google your site exists and starts indexing.

1. Go to https://search.google.com/search-console → **Add property** → type: **URL prefix** → enter `https://3-mama-3.github.io/calc-tools`
2. Verification: choose **HTML file** → it shows a file like `google1234.html` → download it → open the repo folder `calculator-site/`, drop the file in it → ask an AI/coder to push it (or run: `git add google1234.html; git commit -m "verify"; git push` from that folder) → the workflow deploys it automatically in ~2 minutes → click **Verify**.
3. After verification: **Sitemaps** (left menu) → submit `sitemap.xml`
4. **URL Inspection** (top bar) → enter `https://3-mama-3.github.io/calc-tools/` → **Request indexing**
5. Repeat step 4 for the 5 most important calculator pages (paint, concrete, flooring, drywall, tile — you can request up to ~10/day). New pages from the weekly automation get indexed over time via the sitemap.

## Step 2 — Amazon Associates (month 1-2, ~15 min)

Affiliate links are already built into every page (the "Supplies for this project" boxes).

1. Apply at https://affiliate-program.amazon.com (free)
2. During setup, list the site as your website
3. **Deadline warning:** Amazon closes accounts with 0 sales in 180 days. Apply only when the site has traffic (see timeline below), or apply early and place the links once traffic starts.
4. When approved, replace the `#` hrefs in the `.affiliate-box` sections of `calculators/*.html` with your real affiliate links (each page has 3 slots; keep max 2-3 per page).

## Step 3 — Google AdSense (month 2-3, ~15 min)

The ad slots ("Advertisement" boxes) and `ads.txt` are already in place.

1. Go to https://adsense.google.com → apply with the site URL
2. Google requires original content + some traffic. A 3-month-old site with ~20 indexed pages usually qualifies.
3. When approved: add your publisher ID to `ads.txt` (replace `pub-0000000000000000` with your real ID) → push → the ad slots activate automatically.

---

## What is automated (no human involvement)

| Thing | How |
|---|---|
| New calculator pages | `scripts/generate.js` runs every Monday 04:17 UTC on GitHub Actions; new configs in `scripts/calculator-bank.js` become live pages automatically |
| Sitemap & hub page | rebuilt automatically on every run |
| Deployment | every push AND every Monday → GitHub Pages |
| Content fixes | any `@@BASE@@` / URL drift is corrected on each run |

## How to add a calculator (optional)

Append a config object to `scripts/calculator-bank.js` (copy any existing entry as a template — fields, formula, FAQs, related links) → commit + push → it deploys itself.

## Timeline expectation (realistic)

- **Month 1-3:** $0. Google is discovering and indexing the pages.
- **Month 3-6:** $10-60/mo as the first calculators rank (paint/concrete are the strongest keywords).
- **Month 6-12:** $50-250/mo as the long-tail compounds; more calculators = more traffic. AdSense RPM in home-improvement runs $15-40.

Money flow requires traffic, and traffic requires the 6-18 month SEO game. The automation means it keeps building without you — but check the Search Console report monthly to see which calculators rank, and use that data to add more of what works.

## Repo map

```
calculator-site/
  index.html                    hub page (auto-updated)
  calculators/*.html            one page per calculator (auto-generated)
  scripts/generate.js           content generator
  scripts/calculator-bank.js    add new calculators here
  scripts/config.js             site name + base URL
  .github/workflows/deploy.yml  weekly automation + deploy
  ads.txt, sitemap.xml, llms.txt, robots.txt   SEO plumbing
```
