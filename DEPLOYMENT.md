# Urbanova Africa deployment and validation

## Local setup

Requires Node.js 20+ and npm. From the project folder:

```bash
npm install
npm test
npm run build
```

Open two terminals:

```bash
npm run api
```

```bash
npm run dev
```

The frontend runs on http://localhost:5173 and the API on http://localhost:8787.

## Production architecture

Host the static Vite `dist/` directory on a platform supporting SPA fallback to `index.html`. Host `node server/index.mjs` as a persistent Node service behind HTTPS. Route `/api/*` from the public frontend domain to the Node service using a reverse proxy; do not expose keys in the frontend. Set `FRONTEND_ORIGIN` to the deployed site origin. Set `PORT` according to the backend host. Configure optional `TOMTOM_API_KEY` and `OPENAQ_API_KEY` only on the backend host. Use platform secret management, never commit `.env`.

## Important real-world limitations

- The Open-Meteo air-quality feed is modeled; not a local sensor or an emergency advisory.
- World Bank electricity access is a historical national indicator, not a meter feed or electricity reliability score.
- Tariff cost is user-calculated; users must enter their actual tariff and account for taxes and fees.
- TomTom road-segment traffic is optional, key-protected, and not a full journey-routing system. Coverage and licensing require confirmation.
- OpenAQ station metadata is not a pollutant reading. Sensor coverage and authentication vary.
- No database, user accounts, production uptime monitoring, or live provider-contract verification is included.

## Acceptance tests before a public launch

1. `npm test` and `npm run build` both pass.
2. Check all five routes at 320, 390, 768, 1024 and 1440 px widths.
3. Check frontend and backend health: `/api/health` returns JSON.
4. Validate missing keys show unavailable states, not fabricated numbers.
5. Verify CORS and HTTPS configuration for the deployed domain.
6. Confirm attribution, provider licenses, data privacy requirements, and acceptable use.
7. Perform live tests with actual API credentials, record cities tested and timestamps.
