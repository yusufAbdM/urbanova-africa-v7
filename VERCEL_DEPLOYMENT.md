# Urbanova Africa — Vercel Deployment

## Prerequisites

- GitHub repository containing this project at repository root.
- Vercel account with GitHub integration enabled for that repository.
- Node.js 20+.

## Publish

1. Create a new GitHub repository called `urbanova-africa` and upload this folder's contents to the repository root.
2. In Vercel, select **Add New → Project**, import that repository and deploy.
3. Framework preset: Vite; build command: `npm run build`; output directory: `dist`.
4. `vercel.json` routes `/api/*` requests to the serverless API and client-side routes to the SPA.
5. Optional server-side secrets: `OPENAQ_API_KEY` and `TOMTOM_API_KEY`. Do not expose them as `VITE_` environment variables.
6. Check `/api/health`, `/api/capabilities`, all main routes and live data integrations after deployment.

## Transparency

Traffic segment data and OpenAQ station discovery are unavailable without valid provider keys and supported geographic coverage. Open-Meteo air quality is modeled, not direct sensor measurement. Electricity access is historical World Bank data, not an electricity tariff.

The automated Node tests passing does not prove the Vercel build or provider calls work in production. Verify these after deployment.
