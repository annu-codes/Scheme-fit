# SchemeFit — Prototype (Demo Data)

Clickable frontend prototype: government scheme discovery and eligibility matching.

    npm install
    npm run dev

- All schemes are **fictional demo data** in `src/data/schemes.js` (set `officialSource` per scheme once verified).
- Matching is simple rule-based logic in `src/lib/matching.js`; no AI service or backend is called.
- State is saved in localStorage; **Reset Demo** (header / sidebar) clears it.
- Tip: on the profile form, "Use sample profile" fills a profile that shows all four result categories
  and the "8 of 12 months" not-eligible screen.

## v2 additions
Smart Matching dashboard + "Why this match?", Eligibility Breakdown tracker, Scheme Compatibility
(`src/data/compatibility.js`, demo rules), reusable profile with simulated documents, document
auto-reuse and profile auto-fill on scheme details, Term Simplifier (`src/data/glossary.js`).

## v3 additions
Smart Insights + "Your Smart Scheme Matches" (with AI Recommendation • Prototype label), Eligibility page,
3-step profile (Save Documents), Details page reordered (overview → why → tracker → benefits → documents →
compatibility → difficult terms → guidance), in-page Term Simplifier popovers, term/sentence input on the
Term Simplifier page, full 10-item navigation. All scheme, compatibility and glossary content is demo data.
