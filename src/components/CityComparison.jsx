import { useEffect, useState } from 'react';
import { CITIES } from '../data/cities';

const initial = ['accra','lagos'];
const safeNumber = n => Number.isFinite(n) ? `${n.toFixed(1)} µg/m³` : 'Unavailable';
export default function CityComparison(){
 const [ids,setIds]=useState(initial);
 const [result,setResult]=useState({status:'loading'});
 useEffect(()=>{
  const controller=new AbortController();
  setResult({status:'loading'});
  Promise.all(ids.map(async id=>{
   const city=CITIES.find(c=>c.id===id);
   const res=await fetch(`/api/air-quality?lat=${city.lat}&lon=${city.lon}`,{signal:controller.signal});
   const json=await res.json();
   if(!res.ok)return {city,error:json.error||'Provider unavailable'};
   return {city,pm25:json.current?.pm2_5,pm10:json.current?.pm10,observedAt:json.current?.time,classification:json.urbanova?.classification||'modeled'};
  })).then(cities=>setResult({status:'success',cities})).catch(err=>{if(err.name!=='AbortError')setResult({status:'error',error:err.message});});
  return ()=>controller.abort();
 },[ids]);
 return <section className="panel city-comparison" aria-labelledby="city-compare-title">
  <div className="panel-heading"><div><h3 id="city-compare-title">Compare two cities</h3><p>Live provider requests for modeled air quality — a practical Ghana–Nigeria pilot.</p></div></div>
  <div className="compare-selectors">{ids.map((id,index)=><div className="field" key={index}><label htmlFor={`compare-city-${index}`}>City {index+1}</label><select id={`compare-city-${index}`} value={id} onChange={e=>setIds(old=>old.map((v,i)=>i===index?e.target.value:v))}>{CITIES.map(city=><option key={city.id} value={city.id} disabled={ids[1-index]===city.id}>{city.name}, {city.country}</option>)}</select></div>)}</div>
  {result.status==='loading'&&<p role="status">Retrieving modeled estimates for both cities…</p>}
  {result.status==='error'&&<p role="alert">Comparison unavailable: {result.error}. No substitute readings are shown.</p>}
  {result.status==='success'&&<div className="comparison-results">{result.cities.map(({city,pm25,pm10,observedAt,error})=><div className="comparison-city" key={city.id}><strong>{city.name}, {city.country}</strong>{error?<span role="status">Data unavailable: {error}</span>:<><span>PM₂.₅: {safeNumber(pm25)}</span><span>PM₁₀: {safeNumber(pm10)}</span><small>Model time: {observedAt||'unavailable'} UTC</small></>}</div>)}</div>}
  <p className="fineprint">Source: Open-Meteo / CAMS global model (approximately 45 km resolution). Comparison is not a ranking of street-level exposure, and should not be used for individual health decisions. Different cities may have different model timestamps.</p>
 </section>;
}
