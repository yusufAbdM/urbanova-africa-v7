import CityComparison from '../components/CityComparison';
import { SensorStationDiscovery } from '../components/ProviderInsights';
import RealityIntro from '../components/RealityIntro';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Leaf, Wind, Activity, Clock3, MapPin, RefreshCw, ShieldCheck, Info } from 'lucide-react';
import { Metric, PageIntro, TrendChart } from '../components/UI';
import { CITIES } from '../data/cities';

const format = value => typeof value === 'number' && Number.isFinite(value) ? value.toFixed(1) : 'Unavailable';
const fmtTime = value => value ? `${value.replace('T', ' ')} UTC` : 'Unavailable';

async function fetchAirQuality(city, signal) {
  const url = `/api/air-quality?lat=${encodeURIComponent(city.lat)}&lon=${encodeURIComponent(city.lon)}`;
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Data provider returned HTTP ${response.status}`);
  const data = await response.json();
  if (!data.current || !data.hourly?.time || !data.hourly?.pm2_5) {
    throw new Error('The provider did not return the expected air-quality fields.');
  }
  return data;
}

export default function Environment() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCity = searchParams.get('city');
  const [cityId, setCityId] = useState(CITIES.some(c=>c.id===initialCity) ? initialCity : 'lagos');
  const [reload, setReload] = useState(0);
  const [state, setState] = useState({ status: 'loading', data: null, error: '' });
  const city = CITIES.find(item => item.id === cityId);

  useEffect(() => {
    const requested = searchParams.get('city');
    if (requested && CITIES.some(c=>c.id===requested) && requested!==cityId) setCityId(requested);
  }, [searchParams, cityId]);

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: 'loading', data: null, error: '' });
    fetchAirQuality(city, controller.signal)
      .then(data => setState({ status: 'success', data, error: '' }))
      .catch(error => {
        if (error.name !== 'AbortError') setState({ status: 'error', data: null, error: error.message });
      });
    return () => controller.abort();
  }, [city, reload]);

  const data = state.data;
  const trend = data?.hourly?.time?.map((time, i) => ({
    name: time.slice(5).replace('T', ' '), value: data.hourly.pm2_5[i],
  })).filter(point => Number.isFinite(point.value)).slice(0, 36) ?? [];

  return <div className="dashboard-page"><div className="container">
    <PageIntro eyebrow="INTELLIGENCE / ENVIRONMENT" title={<>Environmental <span>Intelligence</span></>} description="Explore real provider-supplied air-quality model estimates across cities worldwide. Understand the data, its limitations, and its source." icon={Leaf}/><RealityIntro kind="environment" title="Cleaner air begins with trustworthy evidence." problem="Air pollution is a major urban concern, but a modeled regional estimate is not the same as a reading from a sensor on your street." solution="Compare city-level modeled PM₂.₅, PM₁₀ and NO₂ estimates worldwide with explicit source, timestamp and limitations." source="Open-Meteo air-quality model" sourceUrl="https://open-meteo.com/en/docs/air-quality-api"/>
    <div className="demo-notice"><Info size={18} aria-hidden="true"/><span><strong>Modeled data, not street-level measurements.</strong> Open-Meteo's CAMS global model has approximately 45 km spatial resolution. Do not use these estimates for immediate health or safety decisions.</span></div>
    <div className="section-heading"><div><h2>City air-quality overview</h2><p>Current modeled estimates and the upcoming hourly forecast.</p></div><div className="env-controls"><div className="field compact"><label htmlFor="environment-city">City</label><select id="environment-city" value={cityId} onChange={event => { setCityId(event.target.value); setSearchParams({city:event.target.value}); }}>{CITIES.map(item => <option key={item.id} value={item.id}>{item.name}, {item.country}</option>)}</select></div><button type="button" className="env-refresh" onClick={() => setReload(n => n + 1)} disabled={state.status === 'loading'}><RefreshCw size={16}/> Refresh</button></div></div>
    {state.status === 'loading' && <div className="env-status" role="status">Loading air-quality estimates for {city.name}, {city.country}…</div>}
    {state.status === 'error' && <div className="env-status env-error" role="alert"><strong>Air-quality data unavailable.</strong><p>{state.error}</p><p>Ensure the backend is running, check your internet connection, or try another city. We won't replace missing data with invented readings.</p><button type="button" className="env-refresh" onClick={() => setReload(n => n + 1)}>Try again</button></div>}
    {state.status === 'success' && <>
      <div className="env-provenance"><MapPin size={16}/><span>{city.name}, {city.country} · City-centre model grid</span><Clock3 size={16}/><span>Model time: {fmtTime(data.current.time)}</span></div>
      <div className="metric-grid"><Metric icon={Wind} label="PM2.5" value={`${format(data.current.pm2_5)} µg/m³`} detail="Modeled concentration"/><Metric icon={Activity} label="PM10" value={`${format(data.current.pm10)} µg/m³`} detail="Modeled concentration"/><Metric icon={Leaf} label="Nitrogen dioxide" value={`${format(data.current.nitrogen_dioxide)} µg/m³`} detail="Modeled concentration"/><Metric icon={Clock3} label="Model interval" value={`${data.current.interval / 60} min`} detail="Provider time step"/></div>
      <div className="dashboard-grid"><article className="panel"><div className="panel-heading"><div><h3>PM2.5 forecast</h3><p>First 36 available hourly forecast points · UTC</p></div><span className="legend"><i/> PM2.5</span></div>{trend.length ? <TrendChart data={trend} unit=" µg/m³"/> : <p>No forecast points are available.</p>}<p className="fineprint">Forecast values are modeled estimates, not observations from a sensor at your exact location.</p></article><article className="panel"><div className="panel-heading"><div><h3>Understanding the readings</h3><p>Why data provenance matters.</p></div></div><div className="explainer"><strong>PM2.5</strong><p>Fine particulate matter with a diameter of 2.5 micrometres or less.</p></div><div className="explainer"><strong>PM10</strong><p>Particles with a diameter of 10 micrometres or less.</p></div><div className="explainer"><strong>NO₂</strong><p>Nitrogen dioxide, an air pollutant associated with combustion sources.</p></div><div className="result-box"><span>Data source</span><strong className="smaller-result">Open-Meteo / CAMS</strong><small>Global atmospheric composition model · Not live ground sensors</small></div></article></div>
    </>}
    <CityComparison/>
    <SensorStationDiscovery/>
    <div className="insights"><div className="section-heading"><div><h2>Transparent environmental intelligence</h2><p>Designed to scale beyond a single city without misleading users.</p></div></div><div className="insight-grid"><article className="insight"><Wind/><h3>Real external data</h3><p>Readings come from a documented third-party air-quality forecast API rather than hard-coded sample values.</p></article><article className="insight"><ShieldCheck/><h3>Honest data labeling</h3><p>Every reading is identified as a model estimate. Sensor observations require a separate verified source.</p></article><article className="insight"><Info/><h3>Next: measured observations</h3><p>OpenAQ integration can add station-based readings where available, with authentication and server-side caching.</p></article></div></div>
    <p className="env-attribution">Source: <a href="https://open-meteo.com/en/docs/air-quality-api" target="_blank" rel="noopener noreferrer">Open-Meteo Air Quality API</a>, using CAMS global atmospheric composition forecasts. Review the provider's attribution and commercial-use terms before public launch.</p>
  </div></div>;
}
