import { useLocation } from 'react-router-dom';
import { routeResources } from '../data/resources';

const dataByRoute = {
 '/energy': {kind:'Historical statistics + your estimates',source:'World Bank WDI; user-entered tariff assumptions',note:'Electricity access is a national historical indicator, not an outage or billing feed.'},
 '/traffic': {kind:'Illustrative scenarios',source:'Urbanova calculations; optional licensed road-segment provider',note:'Congestion charts are not live observations. Do not use them for navigation or emergencies.'},
 '/environment': {kind:'Modeled forecasts',source:'Open-Meteo / CAMS; optional OpenAQ station metadata',note:'Atmospheric model estimates are not readings from a sensor on your street.'},
 '/impact': {kind:'User-defined scenarios',source:'Transparent assumptions and estimated interventions',note:'Projected reductions are not independently measured or verified.'},
 '/': {kind:'Geographic reference',source:'City registry and OpenStreetMap map tiles',note:'Location coverage does not guarantee live data coverage.'},
 '/sources': {kind:'Source directory',source:'Official agencies and documented data services',note:'Always check original publication dates and applicable jurisdiction.'},
 '/about': {kind:'Independent platform',source:'Urbanova Africa project documentation',note:'Not a government service, licensed utility, or emergency provider.'}
};
export default function ServiceStatus(){
 const {pathname}=useLocation(); const entry=dataByRoute[pathname]||dataByRoute['/'];
 const resources=routeResources[pathname]||routeResources['/'];
 return <section className="container service-status public-provenance" aria-labelledby="service-heading">
  <div className="service-status-top"><div><div className="eyebrow">DATA YOU CAN UNDERSTAND</div><h2 id="service-heading">Sources & reliability</h2><p>Know what the information represents before using it to make a decision.</p></div></div>
  <div className="public-provenance-grid"><div><span className="provenance-label">Information type</span><strong>{entry.kind}</strong></div><div><span className="provenance-label">Where it comes from</span><strong>{entry.source}</strong></div><div><span className="provenance-label">What to keep in mind</span><p>{entry.note}</p></div></div>
  <p className="fineprint">Read more: {resources.sources.slice(0,2).map(([name,url],i)=><span key={url}>{i>0?' · ':''}<a href={url} target="_blank" rel="noopener noreferrer">{name}</a></span>)}. The source's availability varies by location and date.</p>
 </section>;
}
