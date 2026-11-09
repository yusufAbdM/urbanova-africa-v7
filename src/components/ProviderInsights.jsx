import { useEffect, useState } from 'react';
import { CITIES } from '../data/cities';

const countryCodes={'Nigeria':'NG','Ghana':'GH','Kenya':'KE','South Africa':'ZA','Egypt':'EG','Rwanda':'RW','Uganda':'UG','United Kingdom':'GB','United States':'US','Canada':'CA','United Arab Emirates':'AE','India':'IN','Singapore':'SG','Japan':'JP'};

export function ElectricityAccess(){
 const [country,setCountry]=useState('NG');const [result,setResult]=useState({status:'loading'});
 useEffect(()=>{const controller=new AbortController();setResult({status:'loading'});
 fetch(`/api/energy-access?country=${country}`,{signal:controller.signal}).then(async r=>{const data=await r.json();if(!r.ok)throw Error(data.error||'Provider unavailable');return data;}).then(data=>setResult({status:'success',data})).catch(error=>{if(error.name!=='AbortError')setResult({status:'error',message:error.message});});return()=>controller.abort();},[country]);
 return <section className="panel provider-panel" aria-label="Country electricity access statistics"><div className="panel-heading"><div><h3>Country electricity access</h3><p>Latest published historical country estimate — not a live grid reading or household tariff.</p></div></div>
 <div className="field"><label htmlFor="energy-country">Country</label><select id="energy-country" value={country} onChange={e=>setCountry(e.target.value)}>{Object.entries(countryCodes).map(([name,code])=><option key={code} value={code}>{name}</option>)}</select></div>
 {result.status==='loading'&&<p role="status">Loading World Bank statistics…</p>}
 {result.status==='error'&&<p role="alert">Statistics unavailable: {result.message}. Check that the backend is running on port 8787.</p>}
 {result.status==='success'&&<div className="result-box"><span>{result.data.country} · {result.data.year}</span><strong>{Number(result.data.percent).toFixed(1)}%</strong><small>Population with access to electricity · World Bank WDI · {result.data.classification}</small></div>}
 <p className="fineprint">This national indicator describes electricity access, not supply reliability, current outages, prices, or individual households. <a href="https://data.worldbank.org/indicator/EG.ELC.ACCS.ZS" target="_blank" rel="noopener noreferrer">Source and methodology</a>.</p></section>;
}

export function TrafficFlow(){
 const [cityId,setCityId]=useState('lagos');const [result,setResult]=useState({status:'idle'});const city=CITIES.find(c=>c.id===cityId);
 async function check(){setResult({status:'loading'});try{const response=await fetch(`/api/traffic-flow?lat=${city.lat}&lon=${city.lon}`);const data=await response.json();if(!response.ok)throw Error(data.error||'Traffic unavailable');setResult({status:'success',data});}catch(error){setResult({status:'error',message:error.message});}}
 return <section className="panel provider-panel" aria-label="Road segment traffic provider"><div className="panel-heading"><div><h3>Road-segment data check</h3><p>Optional licensed traffic integration. This checks a road segment near the city centre, not a complete journey.</p></div></div>
 <div className="field"><label htmlFor="traffic-provider-city">City</label><select id="traffic-provider-city" value={cityId} onChange={e=>{setCityId(e.target.value);setResult({status:'idle'});}}>{CITIES.map(c=><option key={c.id} value={c.id}>{c.name}, {c.country}</option>)}</select></div>
 <button className="env-refresh" type="button" disabled={result.status==='loading'} onClick={check}>Check provider coverage</button>
 {result.status==='loading'&&<p role="status">Checking provider…</p>}
 {result.status==='error'&&<p role="status" className="fineprint">{result.message} The illustrative dashboard above remains separate from live data.</p>}
 {result.status==='success'&&<div className="result-box"><span>Reported road-segment speed</span><strong>{result.data.currentSpeed} km/h</strong><small>Free-flow speed: {result.data.freeFlowSpeed} km/h · Confidence: {result.data.confidence??'unreported'} · Checked: {new Date(result.data.sampledAt).toLocaleString()}</small></div>}
 <p className="fineprint">Source when configured: TomTom Maps Traffic Flow v4. Requires a private TOMTOM_API_KEY in the backend. Coverage varies; this is not route guidance or verified Orbis support.</p></section>;
}


export function SensorStationDiscovery(){
 const [cityId,setCityId]=useState('lagos');
 const [result,setResult]=useState({status:'idle'});
 const city=CITIES.find(c=>c.id===cityId);
 async function check(){
  setResult({status:'loading'});
  try{
   const response=await fetch(`/api/sensor-stations?lat=${city.lat}&lon=${city.lon}`);
   const data=await response.json();if(!response.ok)throw Error(data.error||'Sensor discovery unavailable');
   setResult({status:'success',data});
  }catch(error){setResult({status:'error',message:error.message});}
 }
 return <section className="panel provider-panel" aria-label="Observed air quality monitoring stations">
  <div className="panel-heading"><div><h3>Find nearby monitoring stations</h3><p>Optional OpenAQ station discovery within 25 km of the selected city centre. Stations are not the same as real-time readings.</p></div></div>
  <div className="field"><label htmlFor="sensor-city">City</label><select id="sensor-city" value={cityId} onChange={e=>{setCityId(e.target.value);setResult({status:'idle'});}}>{CITIES.map(c=><option key={c.id} value={c.id}>{c.name}, {c.country}</option>)}</select></div>
  <button className="env-refresh" type="button" disabled={result.status==='loading'} onClick={check}>Find stations</button>
  {result.status==='loading'&&<p role="status">Checking OpenAQ station coverage…</p>}
  {result.status==='error'&&<p role="status" className="fineprint">{result.message} This does not affect the modeled air-quality forecast above.</p>}
  {result.status==='success'&&<div aria-live="polite"><p><strong>{result.data.stations.length}</strong> stations returned for {city.name}. {result.data.stations.length===0?'No stations were reported within the search radius.':''}</p><ul className="station-list">{result.data.stations.slice(0,8).map(station=><li key={station.id}><strong>{station.name||`Station ${station.id}`}</strong><span>{station.sensors.map(s=>s.parameter).filter(Boolean).join(', ')||'Sensor parameters not reported'}</span></li>)}</ul><p className="fineprint">Source: OpenAQ v3 · Station metadata only · Checked {new Date(result.data.checkedAt).toLocaleString()}</p></div>}
  <p className="fineprint">Requires OPENAQ_API_KEY in the backend. <a href="https://docs.openaq.org/" target="_blank" rel="noopener noreferrer">OpenAQ documentation</a>. Provider coverage varies by location.</p>
 </section>;
}
