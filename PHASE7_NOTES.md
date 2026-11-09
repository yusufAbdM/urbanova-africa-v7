# Urbanova Africa — Phase 7 engineering review

## What is implemented
- Contextual real-world photography and challenge/solution narratives on all three dedicated intelligence pages. Photography is illustrative, loaded remotely from Unsplash, and is **not** presented as Nigerian-specific evidence.
- Creator profile and direct X, Telegram and email links.
- Curated global city registry (Nigeria first) with country/city selection on homepage; selected city is passed to Environmental Intelligence.
- Open-Meteo CAMS global modeled air quality for selected cities. Error/loading and attribution states remain.
- Energy calculator remains user-input based; energy trends are demonstration data.
- Traffic dashboard remains explicitly simulated. No traffic API is integrated.

## Architecture and quality constraints
- City registry is not a live-data coverage guarantee. Never equate a listed city with a live provider feed.
- For commercial use, confirm Open-Meteo license and usage terms, and secure appropriate permission; the free endpoint may not be licensed for commercial use.
- For real road data, validate TomTom Orbis preview API credentials, coverage, pricing, and data terms. Traffic incidents/flow coverage does not imply real-time routing coverage.
- OpenAQ requires an API key. Keep credentials server-side if added.
- Do not use public Nominatim for autocomplete or bulk geocoding; respect usage policies.
- Remote Unsplash image links may fail or be blocked. For production, source licensed location-verified African photography, save optimized local copies, and record credits.
- No backend, production hosting, automated test suite or live traffic/energy feed is included in this update.

## Next engineering priorities
1. Run npm install, npm run build and verify all pages at mobile/tablet/desktop sizes.
2. Add automated React component tests, provider response contract tests and Playwright navigation tests.
3. Build a server-side provider gateway with caching, rate limiting and secrets handling.
4. Implement licensed traffic data, including unavailable-state behavior per city.
5. Implement country-specific electricity tariff datasets only after validation; distinguish grid statistics from personal usage.
6. Create a provider coverage registry, timestamps, units and data confidence metadata.

## Sources
- Open-Meteo: https://open-meteo.com/en/docs/air-quality-api
- TomTom Orbis: https://docs.tomtom.com/traffic-api/documentation/tomtom-orbis-maps/v1/product-information/market-coverage
- TomTom Routing: https://docs.tomtom.com/routing-api/documentation/tomtom-orbis-maps/v2/product-information/market-coverage
- OpenAQ: https://docs.openaq.org/using-the-api/api-key
- World Bank electricity access: https://data.worldbank.org/indicator/EG.ELC.ACCS.ZS
