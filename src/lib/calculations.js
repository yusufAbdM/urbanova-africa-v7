export function electricityCost(kwh, tariff, fixedCharge = 0) {
 const values=[kwh,tariff,fixedCharge].map(Number);
 if(values.some(v=>!Number.isFinite(v)||v<0)) return null;
 return Math.round((values[0]*values[1]+values[2])*100)/100;
}
export function applianceKwh(watts,hoursPerDay,days) {
 const values=[watts,hoursPerDay,days].map(Number);
 if(values.some(v=>!Number.isFinite(v)||v<0)||values[1]>24||values[2]>366) return null;
 return Math.round(values[0]*values[1]*values[2]/1000*1000)/1000;
}
export function journeyDelay(distanceKm, freeFlowKmh, congestedKmh) {
 const values=[distanceKm,freeFlowKmh,congestedKmh].map(Number);
 if(values.some(v=>!Number.isFinite(v)||v<=0)) return null;
 const freeFlowMinutes=60*values[0]/values[1];
 const congestedMinutes=60*values[0]/values[2];
 return {freeFlowMinutes,congestedMinutes,delayMinutes:congestedMinutes-freeFlowMinutes};
}
