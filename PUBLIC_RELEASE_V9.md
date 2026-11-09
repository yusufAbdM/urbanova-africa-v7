# Urbanova Africa V9 — Public release notes

## What changed
- Replaced public developer API-key/configuration diagnostics with readable, route-specific data provenance. No privileged admin panel or auth is implied.
- Removed the hackathon-specific label from the home page.
- Added consistent hover, pressed, and keyboard-focus affordances while respecting reduced-motion settings.
- Restored `.env.example` with empty optional server-side integration variables.
- Changed local-backend troubleshooting language to user-facing retry guidance.
- Preserved Energy, Traffic, Environment, Action Lab, geographic explorer, references, legal context, support, and creator contacts.

## Accuracy and known limits
- Electricity access is historical World Bank country data, not real-time household availability.
- Traffic charts are illustrative unless an actual provider reports a road segment. Provider coverage is not guaranteed.
- Air quality from Open-Meteo/CAMS is modeled, not street-level sensor measurement. OpenAQ station discovery requires server-side configuration.
- The legal reference directory is informational and not a comprehensive jurisdiction-specific legal service.
- Maps require internet access and are for exploration, not authoritative boundary determination.
- The website is not an emergency service or a government platform.

## Local verification and release
1. `npm.cmd install`
2. `npm.cmd test`
3. `npm.cmd run build`
4. `npm.cmd run dev`
5. Open the displayed localhost address, test all routes on desktop and mobile, and check browser console.
6. Commit to GitHub; the linked Vercel project should redeploy after push. Confirm `/api/health` and data endpoints on the live domain.

## What is not certified
Live third-party API responses, external links, production-browser compatibility, dependency vulnerabilities, accessibility conformance, and full security penetration testing require further independent checks. Passing unit tests does not prove these properties.
