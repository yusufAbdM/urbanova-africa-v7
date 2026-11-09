/** Explicitly hypothetical planning calculations, not verified emission reductions. */
export function estimateIntervention({type, units, factor}) {
 const quantity=Number(units), coefficient=Number(factor);
 if(!Number.isFinite(quantity)||!Number.isFinite(coefficient)||quantity<0||coefficient<0) return null;
 const avoided=quantity*coefficient;
 return {avoided, annual:avoided*365, type, units:quantity, factor:coefficient};
}
export const INTERVENTIONS=[
 {id:'waste',name:'Waste diversion',unit:'kg of waste diverted per day',factor:0.45,factorUnit:'kg CO₂e / kg diverted',context:'Illustrative assumption only; actual impacts depend on waste composition, landfill methane capture, and processing.'},
 {id:'transport',name:'Replace car trips',unit:'car-kilometres avoided per day',factor:0.17,factorUnit:'kg CO₂e / km avoided',context:'Illustrative tailpipe-equivalent factor; does not model congestion, vehicle fleet, or induced travel.'},
 {id:'power',name:'Reduce generator fuel',unit:'litres of diesel avoided per day',factor:2.68,factorUnit:'kg CO₂ / litre avoided',context:'Illustrative combustion-only factor; not a locally verified generator emissions inventory.'}
];
