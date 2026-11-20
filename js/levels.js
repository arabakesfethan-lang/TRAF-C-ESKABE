/* LEVELS: seeded generator + BFS solver */
const N=6;
function rng(s){return()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
// vehicle: {h:bool, f:fixed lane, p:position, l:length, red:bool}
function grid(vs,P){const g=new Int8Array(36).fill(-1);vs.forEach((v,i)=>{for(let k=0;k<v.l;k++)g[v.h?v.f*6+P[i]+k:(P[i]+k)*6+v.f]=i});return g}
function slides(vs,P,g,i){const v=vs[i],o=[],st=v.h?1:6,base=v.h?v.f*6+P[i]:P[i]*6+v.f;
 for(let d=1;P[i]-d>=0&&g[base-d*st]<0;d++)o.push(P[i]-d);
 for(let d=1;P[i]+v.l-1+d<6&&g[base+(v.l-1+d)*st]<0;d++)o.push(P[i]+d);return o}
function solve(vs,P0,cap=90000){const ri=vs.findIndex(v=>v.red),key=P=>String.fromCharCode(...P.map(x=>x+48));
 const par=new Map([[key(P0),null]]);let q=[P0];
 while(q.length){const nq=[];for(const P of q){const k=key(P);
  if(P[ri]+vs[ri].l===6){const path=[];let c=k,cur=P;while(par.get(c)){const e=par.get(c);path.push({i:e.i,to:e.to,from:e.from});c=e.pk}return path.reverse()}
  const g=grid(vs,P);for(let i=0;i<vs.length;i++)for(const to of slides(vs,P,g,i)){const Q=P.slice();Q[i]=to;const kq=key(Q);
   if(!par.has(kq)){par.set(kq,{pk:k,i,to,from:P[i]});nq.push(Q)}}}
  if(par.size>cap)return null;q=nq}return null}
const cache={};
function makeLevel(n){if(cache[n])return cache[n];
 const R=rng(n*7919+13),target=Math.min(3+Math.floor(n*.17),30),nv=Math.min(5+Math.floor(n/14),13),tries=n<5?30:140;let best=null;
 for(let a=0;a<tries;a++){const vs=[{h:true,f:2,p:Math.floor(R()*3),l:2,red:true}],occ=new Set();
  occ.add(2*6+vs[0].p);occ.add(2*6+vs[0].p+1);
  let guard=0,trucks=0;while(vs.length<nv&&guard++<80){const h=R()<.5,l=R()<.28&&trucks<2+Math.floor(n/40)?3:2;
   const f=Math.floor(R()*6),p=Math.floor(R()*(7-l));if(h&&f===2)continue;
   const cs=[...Array(l)].map((_,k)=>h?f*6+p+k:(p+k)*6+f);if(cs.some(c=>occ.has(c)))continue;
   // keep red row free of tiny dead blockers on the left of red: fine, solver decides
   cs.forEach(c=>occ.add(c));vs.push({h,f,p,l,red:false});if(l===3)trucks++}
  const P=vs.map(v=>v.p),s=solve(vs,P);if(!s)continue;
  if(!best||Math.abs(s.length-target)<Math.abs(best.sol.length-target)||(s.length>=target&&best.sol.length<target))best={vs,sol:s,opt:s.length};
  if(s.length>=target&&s.length<=target+2)break}
 // fallback guarantee: trivial level
 if(!best){const vs=[{h:true,f:2,p:0,l:2,red:true}];best={vs,sol:solve(vs,[0]),opt:1}}
 return cache[n]=best}
