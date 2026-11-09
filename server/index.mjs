import {readFile, stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {dirname, resolve, extname, sep} from 'node:path';
import {createServer} from 'node:http';
const port=Number(process.env.PORT||8787);
const distRoot=resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon','.json':'application/json; charset=utf-8','.woff2':'font/woff2'};
async function serveFrontend(pathname,res){
 let target;try{target=resolve(distRoot, '.'+decodeURIComponent(pathname));}catch{return send(res,400,{error:'Malformed URL'});}
 if(!(target===distRoot||target.startsWith(distRoot+sep)))return send(res,403,{error:'Forbidden'});
 try{const details=await stat(target);if(details.isDirectory())target=resolve(target,'index.html');}
 catch{if(extname(pathname))return send(res,404,{error:'Not found'});target=resolve(distRoot,'index.html');}
 try{const body=await readFile(target);res.writeHead(200,{'Content-Type':mime[extname(target)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':target.endsWith('index.html')?'no-cache':'public, max-age=3600'});res.end(body);}
 catch{return send(res,404,{error:'Frontend build unavailable. Run npm run build first.'});}
}

const ALLOWED_ORIGIN=process.env.FRONTEND_ORIGIN||'http://localhost:5173';
const cache=new Map();
const requestWindows=new Map();
function rateLimited(req){
 const ip=(req.socket.remoteAddress||'unknown');const now=Date.now();
 const item=requestWindows.get(ip);const windowStart=item&&now-item.start<60000?item:{start:now,count:0};
 windowStart.count++;requestWindows.set(ip,windowStart);
 if(requestWindows.size>5000){for(const [key,value] of requestWindows){if(now-value.start>60000)requestWindows.delete(key);}}
 return windowStart.count>120;
}

const MAX_CACHE_ENTRIES=300;
function pruneCache(){if(cache.size<=MAX_CACHE_ENTRIES)return;const oldest=[...cache.entries()].sort((a,b)=>a[1].at-b[1].at).slice(0,cache.size-MAX_CACHE_ENTRIES);for(const [key] of oldest)cache.delete(key);}
function cleanError(error){return error?.name==='TimeoutError'?'Provider timed out':'External data service unavailable';}
const energyCountries={NG:'Nigeria',GH:'Ghana',KE:'Kenya',ZA:'South Africa',EG:'Egypt',RW:'Rwanda',UG:'Uganda',GB:'United Kingdom',US:'United States',CA:'Canada',AE:'United Arab Emirates',IN:'India',SG:'Singapore',JP:'Japan'};
function cachedValue(key,ttl){const hit=cache.get(key);return hit&&Date.now()-hit.at<ttl?hit.data:null;}
function remember(key,data){cache.set(key,{at:Date.now(),data});pruneCache();}

const headers={'Content-Type':'application/json; charset=utf-8','Access-Control-Allow-Origin':ALLOWED_ORIGIN,'Vary':'Origin','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','X-Frame-Options':'DENY','Permissions-Policy':'geolocation=(), camera=(), microphone=()'};
function send(res,status,body){res.writeHead(status,headers);res.end(JSON.stringify(body));}
function validCoord(v,min,max){return v!==null&&v!==''&&Number.isFinite(Number(v))&&Number(v)>=min&&Number(v)<=max;}
export async function handleRequest(req,res){
 if(req.method==='OPTIONS') {res.writeHead(204,{...headers,'Access-Control-Allow-Methods':'GET, OPTIONS','Access-Control-Allow-Headers':'Content-Type'});return res.end();}
 if(req.method!=='GET')return send(res,405,{error:'Method not allowed'});
 if(rateLimited(req))return send(res,429,{error:'Too many requests. Please retry shortly.'});

 let url;try{url=new URL(req.url,'http://localhost');}catch{return send(res,400,{error:'Invalid request URL'});}
 if(url.pathname==='/api/capabilities')return send(res,200,{environment:{modeled:'open-meteo',sensorStations:!!process.env.OPENAQ_API_KEY},traffic:{roadSegment:!!process.env.TOMTOM_API_KEY},energy:{electricityAccess:'world-bank',tariff:'user-input'},updatedAt:new Date().toISOString(),note:'A configured provider does not guarantee coverage or live observations.'});
 if(url.pathname==='/api/health')return send(res,200,{status:'ok',service:'urbanova-api',time:new Date().toISOString()});
 if(url.pathname==='/api/providers')return send(res,200,{environment:{source:'Open-Meteo CAMS global',kind:'modeled',available:true,coverage:'Global model grid; not street sensors'},sensors:{source:'OpenAQ v3',kind:'observed station discovery',available:!!process.env.OPENAQ_API_KEY,coverage:'Station coverage varies; readings not guaranteed'},traffic:{source:'TomTom Maps Flow v4',kind:'provider-reported',available:!!process.env.TOMTOM_API_KEY,coverage:'Requires city, API version and road-segment verification'},energy:{source:'World Bank WDI + user calculations',kind:'user-calculated',historicalSource:'World Bank WDI',available:true}});
 if(url.pathname==='/api/energy-access'){
  const country=(url.searchParams.get('country')||'NG').toUpperCase();
  if(!Object.hasOwn(energyCountries,country))return send(res,400,{error:'Unsupported country code'});
  const key=`energy:${country}`;const previous=cachedValue(key,24*60*60*1000);
  if(previous)return send(res,200,{...previous,cached:true});
  const upstream=`https://api.worldbank.org/v2/country/${country}/indicator/EG.ELC.ACCS.ZS?format=json&per_page=30`;
  try{
   const response=await fetch(upstream,{signal:AbortSignal.timeout(10000)});
   if(!response.ok)throw Error('Provider unavailable');
   const json=await response.json();
   const observations=Array.isArray(json?.[1])?json[1].filter(x=>Number.isFinite(x.value)):[];
   if(!observations.length)return send(res,404,{error:'No published electricity access observation for this country'});
   const latest=observations.sort((a,b)=>Number(b.date)-Number(a.date))[0];
   const data={country:energyCountries[country],code:country,year:Number(latest.date),percent:latest.value,source:'World Bank WDI',indicator:'EG.ELC.ACCS.ZS',classification:'official historical estimate',url:'https://data.worldbank.org/indicator/EG.ELC.ACCS.ZS',cached:false};
   remember(key,data);return send(res,200,data);
  }catch{return send(res,502,{error:'World Bank data unavailable. No substitute estimate supplied.'});}
 }
 if(url.pathname==='/api/traffic-flow'){
  const lat=url.searchParams.get('lat'),lon=url.searchParams.get('lon');
  if(!validCoord(lat,-90,90)||!validCoord(lon,-180,180))return send(res,400,{error:'Invalid coordinates'});
  if(!process.env.TOMTOM_API_KEY)return send(res,503,{error:'Traffic provider not configured. Sample traffic charts remain illustrative.',configured:false});
  const key=`traffic:${Number(lat).toFixed(3)},${Number(lon).toFixed(3)}`;
  const previous=cachedValue(key,2*60*1000);if(previous)return send(res,200,{...previous,cached:true});
  const upstream=new URL('https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json');
  upstream.search=new URLSearchParams({key:process.env.TOMTOM_API_KEY,point:`${lat},${lon}`,unit:'kmph'}).toString();
  try{
   const response=await fetch(upstream,{signal:AbortSignal.timeout(10000)});
   if(!response.ok)return send(res,502,{error:`Traffic provider did not return usable data (HTTP ${response.status}). Coverage or access may be unavailable.`});
   const json=await response.json();const d=json?.flowSegmentData;
   if(!d||!Number.isFinite(d.currentSpeed)||!Number.isFinite(d.freeFlowSpeed))throw Error('Unexpected provider response');
   const data={currentSpeed:d.currentSpeed,freeFlowSpeed:d.freeFlowSpeed,currentTravelTime:d.currentTravelTime,freeFlowTravelTime:d.freeFlowTravelTime,confidence:d.confidence,roadClosure:d.roadClosure,classification:'provider-reported road segment',source:'TomTom Maps Traffic Flow v4',sampledAt:new Date().toISOString(),cached:false,coverageNote:'This endpoint is distinct from Orbis. Availability must be verified for the selected coordinates.'};
   remember(key,data);return send(res,200,data);
  }catch{return send(res,502,{error:'Traffic provider unavailable. No fabricated traffic readings supplied.'});}
 }
 if(url.pathname==='/api/sensor-stations'){
  const lat=url.searchParams.get('lat'),lon=url.searchParams.get('lon');
  if(!validCoord(lat,-90,90)||!validCoord(lon,-180,180))return send(res,400,{error:'Invalid coordinates'});
  if(!process.env.OPENAQ_API_KEY)return send(res,503,{error:'OpenAQ observations require a server-side API key.',configured:false});
  const key=`stations:${Number(lat).toFixed(3)},${Number(lon).toFixed(3)}`;
  const previous=cachedValue(key,30*60*1000);if(previous)return send(res,200,{...previous,cached:true});
  const upstream=new URL('https://api.openaq.org/v3/locations');
  upstream.search=new URLSearchParams({coordinates:`${lat},${lon}`,radius:'25000',limit:'20'}).toString();
  try{
   const response=await fetch(upstream,{headers:{'X-API-Key':process.env.OPENAQ_API_KEY},signal:AbortSignal.timeout(10000)});
   if(!response.ok)return send(res,502,{error:`OpenAQ returned HTTP ${response.status}. Verify the key and provider access.`});
   const json=await response.json();if(!Array.isArray(json.results))throw Error('Unexpected OpenAQ response');
   const stations=json.results.map(x=>({id:x.id,name:x.name,locality:x.locality??null,coordinates:x.coordinates??null,timezone:x.timezone??null,sensors:Array.isArray(x.sensors)?x.sensors.map(y=>({id:y.id,parameter:y.parameter?.name??null,units:y.parameter?.units??null})):[]}));
   const data={stations,source:'OpenAQ v3',classification:'reported station metadata (not pollutant readings)',radiusKm:25,checkedAt:new Date().toISOString(),cached:false};remember(key,data);return send(res,200,data);
  }catch(error){return send(res,502,{error:cleanError(error)});}
 }
 if(url.pathname==='/api/air-quality'){
  const lat=url.searchParams.get('lat'),lon=url.searchParams.get('lon');
  if(!validCoord(lat,-90,90)||!validCoord(lon,-180,180))return send(res,400,{error:'Invalid coordinates'});
  const key=`${Number(lat).toFixed(4)},${Number(lon).toFixed(4)}`;
  const cached=cache.get(key);if(cached&&Date.now()-cached.at<15*60*1000)return send(res,200,{...cached.data,urbanova:{source:'Open-Meteo / CAMS',classification:'modeled',cached:true}});
  const upstream=new URL('https://air-quality-api.open-meteo.com/v1/air-quality');upstream.search=new URLSearchParams({latitude:lat,longitude:lon,current:'pm2_5,pm10,nitrogen_dioxide',hourly:'pm2_5',forecast_days:'2',timezone:'GMT',domains:'cams_global'}).toString();
  try{const response=await fetch(upstream,{signal:AbortSignal.timeout(10000)});if(!response.ok)throw Error(`Upstream HTTP ${response.status}`);const data=await response.json();if(!data.current||!data.hourly?.time)throw Error('Unexpected provider response');remember(key,data);return send(res,200,{...data,urbanova:{source:'Open-Meteo / CAMS',classification:'modeled',cached:false}});}catch{return send(res,502,{error:'Air-quality provider unavailable. No substitute data supplied.'});}
 }
 if(url.pathname.startsWith('/api/'))return send(res,404,{error:'Not found'});
 return serveFrontend(url.pathname,res);
}
export function createApp(){return createServer(handleRequest);}
if(process.argv[1]&&import.meta.url===new URL(`file://${process.argv[1]}`).href){createApp().listen(port,()=>console.log(`Urbanova API listening on http://localhost:${port}`));}
