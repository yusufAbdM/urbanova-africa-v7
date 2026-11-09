# Urbanova Africa V8 — production engineering release

## Verified in the build environment
- Based on V7, preserving the seven routes, research directory, Nigerian and African geographic registry, legal panels, section help, contact links and CSS 3D brick background.
- Node test suite passes, including new API validation/security checks.
- ZIP integrity checked.

## Changes made in V8
1. `npm run dev` now launches both the Node API and Vite frontend; previously running only Vite left `/api` requests failing unless a second terminal started the API manually. `npm run dev:web` remains available for frontend-only use.
2. The site shell no longer remounts on every navigation. The mobile menu closes when routes change and its button identifies the navigation region for assistive technology.
3. Consistent hover, focus-visible, pressed and disabled states across interactive controls, with reduced-motion support.
4. Added an on-demand **Provider configuration** section on every route, showing the configured/optional status of Open-Meteo, World Bank, TomTom and OpenAQ without claiming live data availability.
5. Removed an unnecessary cross-origin access header from the public API, added conservative response headers, guarded request socket access and limited oversized URLs.
6. Added a clearer empty search result state in the geographic explorer.
7. Corrected scroll-to-top to use supported `behavior: 'auto'`.

## Important incomplete items — do not present as finished
- The production bundle could not be compiled in this build environment: `npm install` failed with DNS `EAI_AGAIN` reaching the npm registry. **Run `npm.cmd install`, `npm.cmd test`, and `npm.cmd run build` on your PC before publishing.**
- Browser, accessibility and mobile-device interaction testing has **not** been performed. Automated source tests do not substitute for these.
- External APIs were not called live here. Open-Meteo, World Bank, TomTom and OpenAQ require separate integration verification after deployment.
- Traffic district statistics remain **illustrative**, not real-time road observations.
- Electricity bill calculators use **user-supplied tariff assumptions**, not an official live tariff feed.
- OpenAQ integration discovers station metadata, **not live measured pollutant values**.
- Legal directory coverage is selective; it is not a verified legal database for every Nigerian state or African country.
- External reference URLs are curated, but not all were individually checked for HTTP status and current legislation.
- The in-memory rate limiter/cache is per server instance. Production-scale protection requires managed rate limiting and monitoring.
- An independent penetration test, dependency vulnerability audit, load test and Web Vitals measurement remain pending.

## Data provenance / official research starting points
- Energy: https://nerc.gov.ng/ ; https://data.worldbank.org/indicator/EG.ELC.ACCS.ZS ; https://rea.gov.ng/
- Traffic: https://frsc.gov.ng/ ; https://developer.tomtom.com/traffic-api/documentation ; https://www.openstreetmap.org/copyright
- Environment: https://open-meteo.com/en/docs/air-quality-api ; https://docs.openaq.org/ ; https://nesrea.gov.ng/laws-regulations/
- Africa frameworks: https://au.int/en/treaties ; https://www.unep.org/ ; https://www.afdb.org/en
- Nigeria privacy: https://ndpc.gov.ng/
See `src/data/resources.js` for route-specific sources, help and FAQ entries.

## Local development (Windows PowerShell)
```
npm.cmd install
npm.cmd test
npm.cmd run build
npm.cmd run dev
```
The combined development command runs the API at `localhost:8787` and Vite at `localhost:5173`.

## Deployment
After local checks, commit/push the V8 source to the existing GitHub repo. Vercel will build the connected branch and redeploy if Git integration is active. Verify `/api/health`, `/api/capabilities`, and `/api/air-quality?lat=6.5244&lon=3.3792` on the public domain. Set optional `TOMTOM_API_KEY` and `OPENAQ_API_KEY` **only in Vercel server-side environment variables**, never in client source. Keep `FRONTEND_ORIGIN` restricted if cross-origin access is later intentionally required.

Creator contact: https://x.com/Gigger_Yusuf ; https://t.me/Gigger_Ghost ; mailto:yusufmateeeen@gmail.com
