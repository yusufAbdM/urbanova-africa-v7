# Urbanova Africa — Engineering specification and acceptance criteria

## Product
Nigeria-first, internationally extensible decision-support platform. Three routes: /energy, /traffic, /environment. Country/city selection must never imply that a provider supports a location.

## Data classification
- Measured: observation from a verified instrument or provider, with observation timestamp and location.
- Modeled: provider forecast or reanalysis, with model/resolution disclosure.
- User-calculated: deterministic result from user inputs, not live monitoring.
- Illustrative: hard-coded examples; label at point of display.
- Unavailable: show an explicit state; never silently substitute demonstration values.

## Energy
Working tariff-based kWh cost estimator and appliance wattage planner. Default tariff is illustrative, not an official Nigerian tariff. Do not claim access to smart meters or the national grid. Next: verified regional tariffs with effective dates and user/provider selection.

## Traffic
Existing district charts are illustrative. The new travel-delay calculator uses user inputs only. Do not claim live traffic, congestion alerts, or routing until coverage, provider agreement, authentication and live responses are verified.

## Environment
Open-Meteo CAMS global air-quality model data for selected city coordinates. This is not a ground sensor reading or street-level measurement. Errors must be shown honestly. Verify model API responses, units, timestamps and provider license before public/commercial deployment.

## Production architecture
Frontend: React + Vite + Router. API gateway/backend (planned): Node, rate limiting, server-side keys, cache, provider adapters and health checks. Postgres/PostGIS only when historical/geospatial data justifies it. Country/city metadata with timezones, currency, and provider coverage flags. Add Playwright browser tests, Vitest unit tests, CI build, accessibility checks, telemetry and security review.

## Release gates
1. `npm install` succeeds; `npm run build` succeeds.
2. No JavaScript console exceptions in any of the five routes.
3. Keyboard and mobile navigation work.
4. Energy and traffic calculators handle invalid inputs, zeros and expected values.
5. Environment city changes, loading, network errors and retries work.
6. All photographs have usage rights and accessible alternatives.
7. No simulated data is represented as live.
8. Source, location, unit, timestamp and freshness are visible for provider data.
9. Privacy policy and terms before public launch.
10. Actual external provider credentials/coverage are validated before claiming real-time services.

## Research sources to verify
- https://open-meteo.com/en/docs/air-quality-api
- https://docs.openaq.org/
- https://docs.tomtom.com/traffic-api/
- https://data.worldbank.org/indicator/EG.ELC.ACCS.ZS
- https://www.who.int/health-topics/air-pollution

## Known blockers
Live traffic and utility grid data require provider access, rights, and geographic verification. This repository does not include a production backend or end-to-end test suite.
