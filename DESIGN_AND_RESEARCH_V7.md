# Urbanova Africa V7 — design and research

## Visual design
A continuous animated ambient color wash and perspective-transformed brick-grid layer are drawn in CSS, not downloaded as an image. All interactive links and buttons receive hover, active and keyboard-focus treatment. Reduced-motion settings disable animation. Mobile navigation remains accessible.

## Data accuracy
Energy: user-supplied tariffs are estimates, not official invoices. Nigeria regulatory sources: https://nerc.gov.ng/resource-category/regulations/ and https://power.gov.ng/download/electricity-act-2023/ .

Traffic: live data requires a supported traffic provider and valid API credentials. See https://frsc.gov.ng/about-us/ and https://developer.tomtom.com/traffic-api/documentation and https://www.openstreetmap.org/copyright .

Environment: Open-Meteo forecasts are modeled; OpenAQ provides measurements where available. https://open-meteo.com/en/docs/air-quality-api , https://docs.openaq.org/about/about , https://nesrea.gov.ng/laws-regulations/ .

Every route also retains its dedicated Help, Sources and Legal sections. Other African country laws are not represented as uniformly binding; verify local jurisdiction.

## Build / deployment
Run `npm install`, `npm test`, `npm run build`, `npm run dev` in the project root. For Vercel, import the GitHub repo and use Vite framework, build command `npm run build`, output directory `dist`. Configure optional API credentials only on the hosting platform, never in client code.

## Limitations
Live APIs and full production deployment must be tested separately. 3D grid is decorative and intentionally CSS-only; it is not a geographic map. Research links do not imply endorsement or guaranteed provider availability.
