import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { legalFrameworks, stateAuthorities, otherCountries, sections } from '../data/legal';

export default function LegalIntelligence(){
  const { pathname } = useLocation();
  const section = sections[pathname] || 'geography';
  const framework = legalFrameworks[section];
  const [country, setCountry] = useState('Nigeria');
  const [state, setState] = useState('Lagos');
  const national = country === 'Nigeria' ? framework.nigeria : (otherCountries[country] || []);
  const regional = country === 'Nigeria' && stateAuthorities[state] ? stateAuthorities[state] : [];
  const groups = [ ['Africa-wide frameworks', framework.africa], [country === 'Nigeria' ? 'Nigeria federal law and regulators' : `${country} national law and regulators`, national], ...(country === 'Nigeria' ? [[`${state} State sources`, regional]] : []) ];
  return <section className="legal-intelligence container" aria-labelledby="legal-heading">
    <div className="eyebrow">LEGAL & REGULATORY INTELLIGENCE</div>
    <h2 id="legal-heading">Understand the rules behind the data</h2>
    <p>Compare African frameworks with national and state-level legal sources relevant to this section. These are research entry points, not legal advice or a determination of compliance.</p>
    <div className="legal-controls"><label>Country <select value={country} onChange={e=>setCountry(e.target.value)}><option>Nigeria</option><option>Ghana</option><option>Kenya</option><option>South Africa</option></select></label>{country === 'Nigeria' && <label>State <select value={state} onChange={e=>setState(e.target.value)}><option>Lagos</option><option>Ogun</option><option>Kano</option><option>Rivers</option><option>Other Nigerian state</option></select></label>}</div>
    <div className="legal-groups">{groups.map(([title, entries])=><article className="panel legal-group" key={title}><h3>{title}</h3>{entries.length ? entries.map(([name,url,note])=><div className="legal-entry" key={name}><a href={url} target="_blank" rel="noopener noreferrer">{name} ↗</a><p>{note}</p></div>) : <p>State-specific verified legal records are not yet indexed here. Consult the official state gazette or responsible ministry; do not assume Lagos rules apply.</p>}</article>)}</div>
    <p className="fineprint">Important: African Union treaties and charters are not automatically enforceable in every country. Confirm ratification, commencement, implementing legislation, amendments and current state rules with official authorities. The country selector currently offers a verified-source starter set, not complete legal coverage of all 54 African countries.</p>
  </section>;
}
