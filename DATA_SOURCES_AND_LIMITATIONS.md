# Urbanova Africa — data provenance and operational boundaries

## Geographic registry
The Nigerian states/FCT list and city-centre points are curated approximate coordinates; they are **not** official administrative boundary polygons or a census of all settlements. The Africa capital-city registry is a discovery index, not an indicator of sensor coverage. Cross-check administrative geography with [UN SALB Nigeria](https://salb.un.org/en/data/nga) and [World Bank Nigeria boundaries](https://datacatalog.worldbank.org/search/dataset/0039368/nigeria-administrative-boundaries) before policy or legal use.

## Maps
Geographic maps are embedded from [OpenStreetMap](https://www.openstreetmap.org/copyright), with proper attribution. The map requires a network connection. For production scale, evaluate an OSM-compatible tile service with a suitable SLA and respect [OSMF tile policy](https://operations.osmfoundation.org/policies/tiles/). Avoid using public Nominatim as an unrestricted autocomplete service ([usage policy](https://operations.osmfoundation.org/policies/nominatim/)).

## Air quality
[Open-Meteo Air Quality API](https://open-meteo.com/en/docs/air-quality-api) returns model output, **not** a street-level instrument reading. [OpenAQ v3](https://docs.openaq.org/about/about) aggregates available monitoring observations, with gaps in space/time and API-key requirements. Display provenance, timestamps and missingness.

## Electricity
[NERC](https://nerc.gov.ng/) publishes orders and monthly tariffs for Nigeria; tariff varies by distribution company, customer category, band and effective date. Do not present a single nationwide live tariff. [World Bank API](https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api-documentation) publishes historical electricity access statistics, not household consumption or grid status.

## Traffic
[TomTom Orbis Traffic v2 coverage](https://docs.tomtom.com/traffic-api/documentation/tomtom-orbis-maps/v2/product-information/market-coverage) does **not** list Nigeria or Ghana for detailed Traffic Flow/Incidents in its current table; routing coverage is a separate capability. Never label simulated charts as real-time traffic. Verify the exact API version and local coverage before enabling a provider.

## Further trusted resources to evaluate
- [Nigeria National Bureau of Statistics](https://www.nigerianstat.gov.ng/)
- [Nigeria Centre for Disease Control](https://ncdc.gov.ng/)
- [Nigeria Meteorological Agency](https://nimet.gov.ng/)
- [Nigeria Electricity Regulatory Commission](https://nerc.gov.ng/)
- [Nigeria Electricity System Operator](https://nsong.org/)
- [African Development Bank Data Portal](https://dataportal.opendataforafrica.org/)
- [Africa GeoPortal](https://www.africageoportal.com/)
- [UN Data](https://data.un.org/)
- [UN OCHA HDX](https://data.humdata.org/)
- [World Bank Data](https://data.worldbank.org/)
- [World Bank Data API](https://api.worldbank.org/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API)
- [Natural Earth](https://www.naturalearthdata.com/)
- [geoBoundaries](https://www.geoboundaries.org/)
- [Open-Meteo Weather](https://open-meteo.com/en/docs)
- [Open-Meteo Air Quality](https://open-meteo.com/en/docs/air-quality-api)
- [OpenAQ](https://openaq.org/)
- [Copernicus Atmosphere](https://atmosphere.copernicus.eu/)
- [NASA Earthdata](https://www.earthdata.nasa.gov/)
- [NASA POWER](https://power.larc.nasa.gov/)
- [WHO Air Quality](https://www.who.int/health-topics/air-pollution)
- [UNEP](https://www.unep.org/)
- [Our World in Data](https://ourworldindata.org/)
- [Global Energy Monitor](https://globalenergymonitor.org/)
- [IRENA](https://www.irena.org/Data)
- [IEA](https://www.iea.org/data-and-statistics)
- [Electricity Maps](https://www.electricitymaps.com/)
- [TomTom Traffic](https://www.tomtom.com/traffic-index/)
- [TomTom Developer](https://developer.tomtom.com/)
- [Mapbox](https://www.mapbox.com/)
- [OpenRouteService](https://openrouteservice.org/)
- [OSRM](https://project-osrm.org/)
- [WRI Resource Watch](https://resourcewatch.org/)

Links in the further-resources list are **research candidates**, not claims that Urbanova currently integrates their data. Check licenses, country coverage, rate limits and current API documentation before integration.
