# Urbanova Africa — consolidated engineering status

This release extends the user-tested responsive React/Vite project; existing Energy, Traffic, Environment, About and city explorer pages are preserved.

## Available without credentials
- Energy consumption and appliance planning based on user inputs. Sample charts are illustrative, **not smart-meter measurements**.
- World Bank country electricity-access indicator via the backend. Historical national statistics, **not tariffs or outage telemetry**.
- Open-Meteo modeled air-quality data (frontend direct request) and optional backend proxy. These are regional model outputs, **not street-level observations**.
- Traffic journey-delay calculations from user-entered inputs. Sample district charts are illustrative.
- Global curated city explorer; a listed city is not proof of provider coverage.

## Optional credentialed integrations
- `TOMTOM_API_KEY`: TomTom Maps Traffic Flow v4 road-segment request at selected coordinates; city-centre coordinates may not resolve to a road. This is not Orbis or a route planner. Validate market coverage, API version, quota and licensing before claiming live coverage.
- `OPENAQ_API_KEY`: OpenAQ v3 **station discovery**, not pollutant measurement readings, within 25 km of the selected city centre. The backend returns an explicit unavailable state without credentials.

## Local commands
```
npm install
npm test
npm run build
npm run dev
# separate terminal
npm run api
```

The Vite proxy forwards `/api` requests to `http://localhost:8787`. On public hosting, configure HTTPS routing for `/api` to the backend. A frontend-only deployment will not provide World Bank, traffic, or station discovery panels.

## Provider setup
Copy `.env.example` to `.env` for reference, but **Node does not automatically load .env in this project**. On Node 22 you can start with `node --env-file=.env server/index.mjs` (after creating the file), or configure variables in your hosting dashboard. Do not commit keys. `FRONTEND_ORIGIN` must match your frontend origin in production.

## Before public launch
- Run the production build and tests, then conduct manual browser and mobile regression checks.
- Verify the providers' commercial terms, geographic coverage and attribution requirements.
- Configure actual traffic and OpenAQ credentials and validate real responses; neither integration can be certified without access.
- Add a deployed backend, observability, usage limits, and stronger production security controls. The in-memory cache is per process, not a distributed store.
- Verify image licensing and permissions before commercial/public deployment.
- Country-specific tariffs must be sourced from relevant regulators/utilities with dates and applicable customer categories; do not publish a single assumed Nigerian tariff as official.
- Implement route planning only with a verified licensed routing provider; current traffic flow is a single road-segment reading.

This is an incrementally strengthened codebase, **not a claim of worldwide real-time coverage or production readiness**.
