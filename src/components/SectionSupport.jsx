import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { routeResources } from '../data/resources';
export default function SectionSupport(){
 const {pathname}=useLocation();const entry=routeResources[pathname]||routeResources['/'];const [query,setQuery]=useState('');
 const faqs=entry.faq.filter(([q,a])=>(q+' '+a).toLowerCase().includes(query.toLowerCase()));
 return <section className="container section-support" aria-labelledby="section-support-heading">
  <div className="eyebrow">HELP, SUPPORT & VERIFIED REFERENCES</div><h2 id="section-support-heading">{entry.title}: help and source links</h2>
  <p>Direct links to research, data documentation and responsible authorities. External services have their own terms, availability and support procedures.</p>
  <div className="support-columns"><article className="panel support-panel"><h3>Frequently asked questions</h3><label className="support-search-label" htmlFor="support-search">Search this section's help</label><input id="support-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search help topics" />{faqs.length?faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>):<p>No matching answers. Try another keyword.</p>}<h3>Help & support</h3>{entry.help.map(([name,url,note])=><p key={url}><a href={url} target="_blank" rel="noopener noreferrer">{name} ↗</a><br/><small>{note}</small></p>)}<p><a href="mailto:yusufmateeeen@gmail.com?subject=Urbanova%20Africa%20feedback">Email Urbanova project support ↗</a></p><p><a href="https://x.com/Gigger_Yusuf" target="_blank" rel="noopener noreferrer">Project updates on X · @Gigger_Yusuf ↗</a></p><p><a href="https://t.me/Gigger_Ghost" target="_blank" rel="noopener noreferrer">Telegram · @Gigger_Ghost ↗</a></p></article>
  <article className="panel support-panel"><h3>References & official links</h3><ul className="support-resources">{entry.sources.map(([name,url,note])=><li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{name} ↗</a><p>{note}</p></li>)}</ul><p className="fineprint">References are starting points, not proof that a live data feed is available. Always verify the source's update date, licence, geographic coverage and legal status.</p></article></div>
 </section>
}