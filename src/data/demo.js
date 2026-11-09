export const energySeries = {
  daily: [3.2,5.8,4.6,7.4,6.2,8.5,9.1,6.7].map((usage,i)=>({name:['6 AM','8 AM','10 AM','12 PM','2 PM','4 PM','6 PM','8 PM'][i],usage})),
  weekly: [28,35,31,42,38,49,34].map((usage,i)=>({name:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i],usage})),
  monthly: [310,285,345,320,390,365,410,380,350,375,330,355].map((usage,i)=>({name:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i],usage}))
};
export const trafficAreas = [
  {id:'ikeja',name:'Ikeja',congestion:73,averageSpeed:19,travelTime:32,history:[48,54,67,73,69,62,51]},
  {id:'lekki',name:'Lekki',congestion:61,averageSpeed:25,travelTime:27,history:[34,41,55,61,58,49,39]},
  {id:'yaba',name:'Yaba',congestion:47,averageSpeed:32,travelTime:21,history:[29,36,44,47,43,38,31]},
  {id:'ikorodu',name:'Ikorodu',congestion:55,averageSpeed:28,travelTime:25,history:[31,39,49,55,52,45,36]}
];
export const environmentAreas = [
  {id:'ikeja',name:'Ikeja',aqi:86,pm25:27,temperature:30,humidity:72,history:[63,68,75,80,86,79,74]},
  {id:'lekki',name:'Lekki',aqi:59,pm25:16,temperature:29,humidity:78,history:[46,51,56,60,59,55,49]},
  {id:'yaba',name:'Yaba',aqi:104,pm25:37,temperature:31,humidity:69,history:[75,84,91,97,104,98,89]},
  {id:'ikorodu',name:'Ikorodu',aqi:71,pm25:22,temperature:30,humidity:74,history:[50,57,65,68,71,66,61]}
];
export const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
export const formatNumber = n => new Intl.NumberFormat('en-NG',{maximumFractionDigits:2}).format(n);
