# Urbanova Africa — release verification (do not claim these steps without evidence)

## Verified in the authoring environment
- Node built-in API/unit tests executed successfully; see test command output.
- ZIP contains full source and a deployment configuration.

## Pending outside this environment
- `npm install --no-audit --no-fund && npm run build` on a machine with npm registry access; the authoring container cannot reach the registry.
- GitHub Actions green CI on the published repository.
- Live browser review of all routes at 320px, 390px, 768px, 1024px and 1440px.
- Railway deployment and a public HTTPS domain; verify `/api/health` and deep-link reloads.
- Check Open-Meteo / World Bank responses on production network.
- Verify optional OpenAQ and TomTom with valid server-side keys and coverage; without them, features show explicit unavailable states.
- Confirm the actual hackathon deadline, category, eligibility and mandatory submission fields in the official dashboard.
- Produce a real screen-recorded demo, public repository URL and submit on the organizer's site.

## Single-service deployment (recommended)
1. Push this folder as the root of a GitHub repository (do not commit `.env`).
2. In Railway create a service from that GitHub repository. `railway.json` builds Vite and starts the Node server on Railway's `PORT`.
3. Generate a public Railway domain. The Node service serves both `/api/*` and the built SPA, avoiding split-domain CORS complexity.
4. Set `TOMTOM_API_KEY` and `OPENAQ_API_KEY` as optional Railway secrets; do not put them in Vite environment variables.
5. Visit `/api/health`, `/energy`, `/traffic`, `/environment`, `/about`, reload every page and inspect browser console/network.
6. Add the verified public link and GitHub URL to the hackathon dashboard.
