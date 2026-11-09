// Launch the API and Vite together so local dashboards can fetch real data.
import { spawn } from 'node:child_process';
const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const children = [];
function launch(label,args){
 const child=spawn(command,args,{stdio:'inherit',env:process.env,shell:process.platform==='win32'});
 children.push(child);
 child.on('error',error=>{console.error(`${label} failed:`,error.message);shutdown(1)});
 child.on('exit',code=>{if(!stopping){console.error(`${label} exited (${code}).`);shutdown(code||1)}});
}
let stopping=false;
function shutdown(code=0){if(stopping)return;stopping=true;for(const child of children){if(child.exitCode===null)child.kill();}process.exitCode=code;}
process.on('SIGINT',()=>shutdown(0));process.on('SIGTERM',()=>shutdown(0));
launch('Urbanova API',['run','api']);
launch('Vite frontend',['run','dev:web']);
