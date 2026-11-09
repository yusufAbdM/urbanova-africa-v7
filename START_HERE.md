# Urbanova Africa — final source handoff

This is the consolidated source project. It is NOT a claim that all commercial traffic feeds or electricity meter data are accessible without provider credentials. Preserve the previous working folder as a backup.

## Development on Windows / VS Code

1. Extract ZIP and open the `urbanova-africa-pro` folder (the folder containing `package.json`).
2. In terminal A, run each command after the previous one finishes:

```powershell
npm.cmd install
npm.cmd test
npm.cmd run build
npm.cmd run dev
```

3. In terminal B:

```powershell
npm.cmd run api
```

4. Visit `http://localhost:5173`.

## Production — single-host deployment

The Node server can now serve BOTH the compiled Vite website and `/api/*` from one origin, so deployment does not require a separate frontend proxy:

```powershell
npm.cmd install
npm.cmd run build
npm.cmd start
```

Visit `http://localhost:8787`. Configure `PORT` for your hosting provider. The API health endpoint is `/api/health`. The host must run Node 22+, execute the build command, and keep the start process running. Add HTTPS at the hosting platform. No hosting account or public deployment is included in this ZIP.

## Optional server-side credentials

`TOMTOM_API_KEY` — road-segment traffic provider. Must be tested for coverage, plan and licensing.

`OPENAQ_API_KEY` — OpenAQ station discovery. Not itself a live pollutant measurement.

Do not use `VITE_` prefixes for private credentials. Keep them in the backend hosting service's secret settings. Without them, the affected panels should report unavailable rather than show invented live readings.

## What the data actually represents

- **Energy:** User-entered consumption and tariff calculations; World Bank electricity-access historical estimates. No national live grid monitoring or verified tariffs for every country.
- **Traffic:** User-entered journey scenarios and optional TomTom road-segment readings. Existing demonstration charts are not real road monitoring.
- **Environment:** Open-Meteo CAMS *modeled* air-quality forecasts; optional OpenAQ station metadata, not automatically live sensor readings.
- **Global:** Curated cities, not guaranteed provider coverage for all locations.

## Acceptance and remaining external work

Tests run locally and in GitHub Actions, but full browser automation and production provider credentials still need to be configured and validated. Before a public launch, verify commercial data licensing, imagery rights, accessibility, mobile devices, provider quotas, security, and real traffic coverage. Read `FINAL_STATUS.md` and `DEPLOYMENT.md` for limitations.
