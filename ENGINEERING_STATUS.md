# Urbanova Africa — Engineering status (October 2026)

## Verified in this release
- Existing source preserved and malformed RealityIntro JSX corrected on three pages.
- Energy appliance calculator and traffic journey-scenario calculator with pure functions and unit tests.
- Backend HTTP API skeleton with Open-Meteo air-quality proxy, validation, 15-minute cache, and provider capability endpoint.
- Source transparency: modeled environmental data, simulated traffic dashboard, user-input energy calculations.
- Responsive styling for new tools and creator links retained.

## Not delivered / cannot claim
- Live road traffic: requires provider credentials, paid/licensed terms and actual city coverage checks.
- Real electricity meter data: no meter integration or verified utility feeds.
- Production database, user accounts, localization, operational observability, privacy audit, full accessibility audit.
- Browser E2E and deployment tests are not completed.
- Real provider response not tested in this environment; external requests may fail.

## Run locally
1. `npm.cmd install` (Windows PowerShell)
2. `npm.cmd run dev` — frontend http://localhost:5173
3. In a separate terminal `npm.cmd run api` — backend http://localhost:8787
4. `npm.cmd test` — Node unit/API tests
5. `npm.cmd run build` — production bundle verification

The environmental page currently uses the public Open-Meteo endpoint directly; the backend `/api/air-quality?lat=6.5244&lon=3.3792` endpoint is available for integration and caching. No secrets are required for this provider. Never expose licensed API keys in frontend source.

## Release acceptance criteria
`npm run build` passes; unit/API tests pass; browser routes render without console errors; city changes fetch and show model data or honest error; imagery is licensed and loads; accessibility keyboard navigation works; all provider attributions and terms reviewed.
