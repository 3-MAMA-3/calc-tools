# HANDOFF-GUIDE — HomeCalc Tools

Your site is **live**: https://3-mama-3.github.io/calc-tools/

Everything technical is automated. Search Console is **done** (verified, sitemap submitted, top pages queued for indexing). Only **two human steps** remain to turn on income — both need your real accounts, and both are ready to plug in the moment you're approved.

---

## Done already (do not redo)

- Property verified in Google Search Console (URL-prefix: `https://3-mama-3.github.io/calc-tools`)
- Sitemap `sitemap.xml` submitted (18 URLs incl. privacy + contact)
- Indexing requested for: homepage, paint, concrete, flooring, drywall, tile
- Privacy policy (`privacy.html`) and contact page (`contact.html`) live
- AdSense placeholder script on every page (auto-ads, marked `<!-- ADSENSE START/END -->`)
- Affiliate boxes ("Supplies for this project") on every calculator page, ready for real Amazon links
- Weekly content automation running (Mondays 04:17 UTC) + deploy on every push

---

## Step 1 — Google AdSense (apply around month 2-3, ~15 min)

The site is fully prepared — this step is only about **your account**.

1. Go to https://adsense.google.com → sign in with your Google account → **apply** with the site URL `https://3-mama-3.github.io/calc-tools`
2. You'll be asked for your country (**Switzerland**), full name, address and phone → enter them. No company needed — a private individual is fine.
3. Tax info: choose **individual** → you'll fill a **W-8BEN** (US tax form) online. Keep your tax ID / AHV number handy (Swiss AHV number works as the identification number).
4. Payout: AdSense pays by **wire transfer to your Swiss bank account** (you'll enter IBAN + BIC during setup). Add your bank in Payments settings once approved.
5. When approved: your publisher ID (looks like `ca-pub-1234567890123456`) replaces the placeholder:
   - In **all files** `scripts/calculator-bank.js` generated pages + `index.html`: find `ca-pub-0000000000000000` (between `<!-- ADSENSE START -->` and `<!-- ADSENSE END -->`) and replace with your ID
   - In `ads.txt`: replace `pub-0000000000000000` with your ID's numeric part (`1234567890123456`)
   - Push → ads go live. (The ad slots are already on every page.)

## Step 2 — Amazon Associates (month 1-2, ~15 min)

Affiliate boxes are already on every page — ready for real links.

1. Apply at **https://associates.amazon.ch** (Swiss program; pays to a Swiss bank via Hyperwallet). amazon.com also accepts international publishers if you prefer the US program — but the CH program is the easiest fit.
2. During setup, list `https://3-mama-3.github.io/calc-tools` as your website.
3. **Deadline warning:** Amazon closes accounts with no sales in 180 days. Either apply only once the site has traffic, or apply early and place the links then.
4. When approved: replace the `href="#"` links in the `.affiliate-box` sections of `calculators/*.html` with your real affiliate links (each page has 3 slots; keep max 2-3 per page, keep `rel="nofollow sponsored"`).

---

## Switzerland & taxes (short version)

- **No company, no registration needed** to run AdSense + Amazon Associates as an individual.
- AdSense: W-8BEN form during signup; payouts by wire to a Swiss bank.
- Amazon: pays via Hyperwallet to a Swiss bank or as a gift card.
- Income is **taxable** in Switzerland — declare it in your annual tax return (as personal/self-employment income, depending on amount).
- MWST registration is only required once turnover exceeds ~CHF 100k/year — not relevant for years at realistic calculator-site income levels.
- If in doubt about your specific situation, ask your local Steuerverwaltung — but you can start today with zero bureaucracy.

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
  privacy.html, contact.html    required by AdSense - live
  calculators/*.html            one page per calculator (auto-generated)
  scripts/generate.js           content generator
  scripts/calculator-bank.js    add new calculators here
  scripts/config.js             site name + base URL
  .github/workflows/deploy.yml  weekly automation + deploy
  ads.txt, sitemap.xml, llms.txt, robots.txt   SEO plumbing
```
