# Urbanova Africa — Tech Hub Africa hackathon alignment audit

Organizer: https://techhubafrica.org/hackathon

The organizer describes three challenges: improving electricity efficiency, mitigating traffic congestion, and reducing public pollution. It says applicants should choose a challenge to focus on. Urbanova Africa designates **reducing public pollution** as its primary challenge. The energy and traffic pages are supporting decision tools, not separate claims of demonstrated city-wide impact.

## Functional sections

- `/`: landing page, city explorer, interactive geographic map (OpenStreetMap iframe).
- `/impact`: Pollution Action Lab, editable intervention factors, scenario estimates, local TXT export. All estimates explicitly hypothetical.
- `/environment`: city-selected modeled CAMS air-quality API, trend chart, errors, provider attribution; station discovery needs optional OpenAQ API key.
- `/energy`: usage simulator, tariff calculator, appliance planner, historical World Bank electricity-access API. Not an electricity meter.
- `/traffic`: sample congestion exploration, journey planner, optional TomTom road segment provider (requires key and coverage). Not verified Lagos live traffic.
- `/sources`: 30+ original links to official agencies, APIs, research and technical policies. Links are references, not proof of integration.
- `/about`: platform description and provenance.

## Explicit outstanding verification

- Production `npm install` and `npm run build` on a machine with npm registry access.
- Vercel production deployment, live link and smoke tests of all routes and serverless API.
- End-to-end browser tests, accessibility audit and device testing.
- Real provider coverage for each selected city and legal API usage limits.
- Independent measurement or validation of pollution reductions; scenario estimates are **not** measured impact.
- Organizer submission details, originality declaration and age/guardian consent where applicable.

## Research / direct URLs

- Challenge: https://techhubafrica.org/hackathon
- Air quality: https://open-meteo.com/en/docs/air-quality-api
- Stations: https://docs.openaq.org/
- Electricity: https://data.worldbank.org/indicator/EG.ELC.ACCS.ZS
- Nigeria electricity regulation: https://nerc.gov.ng/
- Traffic: https://developer.tomtom.com/traffic-api/documentation
- Geography: https://www.openstreetmap.org/
- Research directory: `/sources` in the app.
