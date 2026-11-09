# Urbanova Africa

**Creator:** Yusuf Abdulmatin — Frontend Developer  
**X:** https://x.com/Gigger_Yusuf  
**Telegram:** https://t.me/Gigger_Ghost  
**Email:** yusufmateeeen@gmail.com

Nigeria-first, globally extensible urban decision-support prototype for environmental information, electricity consumption planning, and traffic scenarios. **Competition focus: reducing public pollution**, with Accra–Lagos city comparison. The other modules are complementary.

## Install / test / run

Requires Node.js 20+ and npm.

```bash
npm install
npm test
npm run build
npm run dev
```

In another terminal: `npm run api`. Open http://localhost:5173. For a combined production process after `npm run build`, run `npm start` and open http://localhost:8787.

Set `OPENAQ_API_KEY` and `TOMTOM_API_KEY` in the server environment only when authorized; never commit credentials. The Open-Meteo and World Bank endpoints work without those keys, subject to provider access and internet connectivity.

## Documents

- [Competition and demo submission plan](COMPETITION_SUBMISSION.md)
- [Deployment instructions](DEPLOYMENT.md)
- [Engineering limitations](FINAL_STATUS.md)

## Integrity

Simulated Traffic and Energy charts are labeled illustrative. Environmental data are modeled, not measured at the user's street. Country electricity access data are historical national statistics, not grid availability. Missing provider readings are shown as unavailable, never replaced by fake values.
