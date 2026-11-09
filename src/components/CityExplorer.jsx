import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CITIES, NIGERIA_STATES, AFRICAN_COUNTRIES } from '../data/cities';

const bounds = { Nigeria:[2.5,4.1,14.7,13.9], Africa:[-18.5,-35.2,52,37.8] };
function mapURL(mode, city) {
  const b = mode === 'city' ? [city.lon-1.8,city.lat-1.3,city.lon+1.8,city.lat+1.3] : bounds[mode];
  const bbox = b.map(n=>Number(n.toFixed(4))).join(',');
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${encodeURIComponent(city.lat+','+city.lon)}`;
}
export default function CityExplorer(){
 const countries=useMemo(()=>[...new Set(CITIES.map(c=>c.country))].sort((a,b)=>a==='Nigeria'?-1:b==='Nigeria'?1:a.localeCompare(b)),[]);
 const [country,setCountry]=useState('Nigeria');const [cityId,setCityId]=useState('lagos');const [mapMode,setMapMode]=useState('Nigeria');const [filter,setFilter]=useState('');
 const cities=CITIES.filter(c=>c.country===country&&(c.name+' '+(c.state||'')).toLowerCase().includes(filter.toLowerCase()));
 const city=CITIES.find(c=>c.id===cityId&&c.country===country)||CITIES.find(c=>c.country===country)||CITIES[0];
 const visibleCity=cities.find(c=>c.id===cityId)||cities[0];
 const state = NIGERIA_STATES.find(s=>s.capital===city.name);
 return <section className="section explorer-section" id="city-explorer"><div className="container">
 <div className="eyebrow">GEOGRAPHIC INTELLIGENCE / AFRICA FIRST</div><h2>Explore Nigeria. <span>Connect Africa.</span></h2>
 <p className="explorer-lead">Explore all 36 Nigerian states and the FCT, plus cities across Africa and other world regions. Maps show real geographic locations. A city in the registry is not a guarantee of live provider coverage.</p>
 <div className="geography-stats"><div><strong>36 + FCT</strong><span>Nigerian administrative areas</span></div><div><strong>{AFRICAN_COUNTRIES.length}</strong><span>African countries represented</span></div><div><strong>{CITIES.length}</strong><span>City records</span></div></div>
 <div className="geography-map-grid"><div className="panel geography-control">
 <div className="field"><label htmlFor="explore-country">Country</label><select id="explore-country" value={country} onChange={e=>{const next=e.target.value;setCountry(next);setFilter('');setCityId(CITIES.find(c=>c.country===next).id)}}>{countries.map(c=><option key={c}>{c}</option>)}</select></div>
 <div className="field"><label htmlFor="explore-search">Filter cities</label><input id="explore-search" type="search" placeholder="Search within selected country" value={filter} onChange={e=>setFilter(e.target.value)} /></div>
 <div className="field"><label htmlFor="explore-city">City or state capital</label><select id="explore-city" value={visibleCity?.id||''} onChange={e=>setCityId(e.target.value)}><option value="" disabled>Select a city</option>{cities.map(c=><option key={c.id} value={c.id}>{c.name}{c.state?` — ${c.state}`:''}</option>)}</select></div>
 <p className="fineprint">{cities.length} matching cities. Nigerian state points represent administrative capitals, not the geographic extent of the state.</p>
 <div className="eyebrow">SELECTED LOCATION</div><h3>{city.name}, {city.country}</h3>{state&&<p>{state.state} State / FCT</p>}
 <div className="coverage-row"><strong>Environment</strong><span className="coverage-modeled">Modeled air-quality API (subject to provider)</span></div><div className="coverage-row"><strong>Traffic</strong><span>Coverage varies; never assume live data</span></div><div className="coverage-row"><strong>Energy</strong><span>Scenario planning; no meter connection</span></div>
 <Link className="btn btn-primary" to={`/environment?city=${encodeURIComponent(city.id)}`}>Explore air quality ↗</Link></div>
 <div className="panel geography-map-panel"><div className="geography-map-top"><strong>Geographic explorer</strong><div className="map-modes" role="group" aria-label="Map extent">{['Nigeria','Africa','city'].map(m=><button type="button" key={m} aria-pressed={mapMode===m} onClick={()=>setMapMode(m)}>{m==='city'?'City':m}</button>)}</div></div>
 <iframe key={`${mapMode}-${city.id}`} className="geography-map-frame" title={`${mapMode} geographic map showing ${city.name}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={mapURL(mapMode,city)} />
 <p className="fineprint">Map © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap contributors</a>. Pin: approximate city centre. The Africa and Nigeria buttons change geographic extent; zoom to City for local detail. Requires an internet connection.</p>
 <a className="text-link" href={`https://www.openstreetmap.org/?mlat=${city.lat}&mlon=${city.lon}#map=11/${city.lat}/${city.lon}`} target="_blank" rel="noreferrer">Open larger map ↗</a>
 </div></div></div></section>
}
