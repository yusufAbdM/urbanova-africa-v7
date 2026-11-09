# Urbanova Africa: data integrations

## Running locally

Terminal 1: `npm.cmd run dev` (Windows)
Terminal 2: `npm.cmd run api`
Terminal 3: `npm.cmd test` then `npm.cmd run build`

## World Bank electricity access
`GET /api/energy-access?country=NG` provides the latest available annual population electricity-access estimate for supported countries. This is not a tariff, outage feed, household meter reading, or real-time grid measurement. The World Bank WDI source is https://data.worldbank.org/indicator/EG.ELC.ACCS.ZS. Cached for 24 hours. If unavailable, no fake number is returned.

## Optional TomTom traffic
`GET /api/traffic-flow?lat=6.5244&lon=3.3792` needs `TOMTOM_API_KEY` in the backend process environment. No key means an honest unavailable state. This is TomTom Maps Traffic Flow v4, **not** TomTom Orbis. Coverage differs between products and countries. It returns one road segment near a coordinate, not a route or city congestion index. API details: https://docs.tomtom.com/traffic-api/documentation/tomtom-maps/v1/traffic-flow/flow-segment-data. Verify provider plan, terms, coverage and data retention before production use. Never commit real keys.

## Environment
Existing environmental page uses Open-Meteo's CAMS modeled global air quality directly. Backend air-quality endpoint is available but the frontend has not been migrated to it. Modeled concentrations are not sensor observations.

## Deployment status
Production deployment, external provider connectivity, full browser automation, credential provisioning, country-specific electricity tariffs and live city traffic validation are not complete.
