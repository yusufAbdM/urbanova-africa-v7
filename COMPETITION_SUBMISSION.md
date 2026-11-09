# Urbanova Africa — Hackathon submission pack

## Selected challenge: Reducing Public Pollution

The organizer asks applicants to select **one** challenge area. Urbanova Africa retains Energy and Traffic as complementary tools, while **Environmental Intelligence is the principal judged demonstration**.

## Problem and solution

Urban residents need understandable, location-specific environmental information, but coverage varies and forecasts can be confused with local sensor measurements. Urbanova Africa lets users select cities, view external modeled PM2.5, PM10 and NO2 estimates, inspect a 36-hour forecast, and compare two cities (initial demonstration: Accra, Ghana, and Lagos, Nigeria). The UI discloses that Open-Meteo/CAMS provides regional modeled data, not live street sensors. Optional OpenAQ station discovery identifies sensor locations when an API key and coverage exist.

## Evidence / provenance

- Open-Meteo Air Quality API: https://open-meteo.com/en/docs/air-quality-api
- OpenAQ: https://docs.openaq.org/
- World Bank electricity access: https://data.worldbank.org/indicator/EG.ELC.ACCS.ZS
- Tech Hub Africa organizer: https://techhubafrica.org/hackathon

Check license, attribution, permitted usage, model resolution and API quotas before public release. Avoid claiming that model estimates are measured air pollution. No personal location permission is requested.

## Demo script (approximately 3 minutes)

1. **00:00–00:25** — Introduce Yusuf Abdulmatin, Creator of Urbanova Africa | Frontend Developer, and the urban pollution problem.
2. **00:25–01:05** — Open Environmental Intelligence; select Accra; show PM2.5, PM10, NO2 and model timestamp. Explain modeled versus measured.
3. **01:05–01:40** — Compare Accra and Lagos with the two-city comparison; switch one city to Nairobi to demonstrate geographic scaling.
4. **01:40–02:05** — Demonstrate forecast chart, provider attribution, error states, and optional OpenAQ station discovery.
5. **02:05–02:30** — Show Energy consumption and Traffic journey scenario tools, explicitly identifying calculated and simulated values.
6. **02:30–03:00** — Show mobile responsive layout, code/test evidence, and roadmap to authenticated data providers.

Only record successful live responses when actually received. Do not fabricate results or make unverified impact claims.

## Submission checklist (requires user action)

- [ ] Confirm official DoraHacks submission page, selected challenge, exact deadline and eligibility. The organizer website currently displays a **May 30** submission date while third-party listings describe **October 31, 2026**; this conflict must be resolved directly with the organizer.
- [ ] Confirm registration and guardian consent if participant is under 18 (organizer's stated rule).
- [ ] Create public GitHub repository and push source without `.env` or credentials.
- [ ] Deploy the frontend and backend over HTTPS; configure any private provider keys server-side.
- [ ] Test Accra and Lagos responses on the deployed site, including error and loading states.
- [ ] Record and upload the demo video.
- [ ] Submit repository URL, live demo, explanation and video through the official form.

## Known limits

Traffic live access requires TomTom credentials and verified coverage. OpenAQ station discovery requires its API key. Energy tariff calculations use user-provided tariffs; official local tariffs are not supplied. Production build, actual API calls, cross-device testing, and public hosting require verification. These are not claimed complete by the presence of source code.
