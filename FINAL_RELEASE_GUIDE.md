# Urbanova Africa — final handoff guide

## What is included

Seven routes: Home/geographic explorer, Energy Intelligence, Traffic Intelligence, Environmental Intelligence, Pollution Action Lab, Sources, and About. Every route renders section-specific help, external references and legal information. Nigeria is the geographic starting point, with African city and country records.

Creator: Yusuf Abdulmatin — Frontend Developer. X: https://x.com/Gigger_Yusuf ; Telegram: https://t.me/Gigger_Ghost ; email: yusufmateeeen@gmail.com. These appear in About, global footer and section support.

## Local setup

1. Extract the ZIP, then open the **urbanova-africa** folder in VS Code (not the ZIP).
2. In terminal: `npm install`
3. Run `npm test`, then `npm run dev`. Open the URL shown by Vite.
4. Run `npm run build` before publishing. `dist/` should be generated.
5. Commit the project **files and folders** to GitHub, not the ZIP file. Keep `.env` and API secrets out of Git.

## Deployment

Vercel: Import the GitHub repository in the Vercel dashboard; framework Vite; build command `npm run build`; output directory `dist`. The `vercel.json` file includes SPA and API routing. Check serverless endpoint behavior on the deployed domain. Alternatively use `npx vercel --prod` after logging in. Deploying requires the account owner's authorization and credentials.

## Honest functionality and limitations

Energy: scenario calculations, not utility meter readings or guaranteed tariffs. Traffic: illustrative planning where no verified traffic provider coverage exists. Environment: modeled provider data; measurement data requires actual station coverage. Pollution Action Lab: scenario estimates, not verified real-world reductions. Maps: OpenStreetMap embed requires internet. Legal links: references, not jurisdiction-specific legal advice. All external provider availability, quotas, and licence conditions must be checked before production use.

This release passed source-level automated tests in the build environment. Full production compilation, live browser QA, and public deployment must be verified separately before presenting it as a fully operational competition submission.
