/* GAME */
const G={n:1,vs:null,P:null,hist:[],moves:0,cell:60,busy:false,L:null};
const CARS=[['#2585EF','#6fb2ff'],['#1765C0','#4f93e6'],['#3B9BF5','#8cc6ff'],['#1E6FD9','#5a9cf0'],['#0F8FDB','#5cc4f7']];
function carHTML(v,idx){const l=v.l,L=l*100,red=v.red,th=getComputedStyle(document.documentElement);
 const pal=red?['#F04444','#ff8f8f']:(Store.d.theme==='sky'||Store.d.theme==='midnight'?CARS[idx%CARS.length]:[th.getPropertyValue('--car').trim(),th.getPropertyValue('--car2').trim()]);
 const K=red?{cx0:64,cx1:136,tf:34,w:[50,150]}:l===3?(idx%2?{cx0:24,cx1:262,tf:14,w:[62,238],van:1}:{cx0:44,cx1:238,tf:24,w:[62,238],rack:1}):(idx%2?{cx0:62,cx1:146,tf:30,w:[48,152]}:{cx0:52,cx1:152,tf:22,w:[46,154]});
 const x0=6,x1=L-6,y0=16,y1=84,t=K.tf,rw=K.cx1-K.cx0;
 const body=`M${x0+14} ${y0}L${x1-t} ${y0}Q${x1-2} ${y0+2} ${x1} ${y0+t*.8}L${x1} ${y1-t*.8}Q${x1-2} ${y1-2} ${x1-t} ${y1}L${x0+14} ${y1}Q${x0} ${y1-2} ${x0} ${y1-16}L${x0} ${y0+16}Q${x0} ${y0+2} ${x0+14} ${y0}Z`;
 const wheels=K.w.map(x=>`<rect x="${x-14}" y="5" width="28" height="14" rx="6" fill="#10131a"/><rect x="${x-14}" y="81" width="28" height="14" rx="6" fill="#10131a"/><rect x="${x-7}" y="7" width="14" height="4" rx="2" fill="#6b7385"/><rect x="${x-7}" y="89" width="14" height="4" rx="2" fill="#6b7385"/>`).join('');
 const i=idx;
 return `<svg class="car" viewBox="0 0 ${L} 100" xmlns="http://www.w3.org/2000/svg"><defs>
<linearGradient id="b${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${pal[1]}"/><stop offset=".5" stop-color="${pal[0]}"/><stop offset="1" stop-color="${pal[0]}"/></linearGradient>
<linearGradient id="s${i}" x1="0" y1="0" x2="0" y2="1"><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".38"/></linearGradient>
<linearGradient id="g${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d6efff"/><stop offset="1" stop-color="#4d7396"/></linearGradient></defs>
${wheels}
<path d="${body}" fill="url(#b${i})"/><path d="${body}" fill="url(#s${i})"/><path d="${body}" fill="none" stroke="#0004" stroke-width="2"/>
<rect x="${x0+10}" y="${y0+3}" width="${L-x0*2-t-14}" height="6" rx="3" fill="#fff" opacity=".28"/>
<ellipse cx="${K.cx1+4}" cy="${y0-1}" rx="7" ry="4" fill="${pal[0]}" stroke="#0003"/><ellipse cx="${K.cx1+4}" cy="${y1+1}" rx="7" ry="4" fill="${pal[0]}" stroke="#0003"/>
<rect x="${K.cx0}" y="23" width="${rw}" height="54" rx="${K.van?7:12}" fill="url(#g${i})" stroke="#0006" stroke-width="1.5"/>
<rect x="${K.cx0+(K.van?8:16)}" y="28" width="${rw-(K.van?16:34)}" height="44" rx="7" fill="url(#b${i})" stroke="#0003"/>
<rect x="${K.cx0+(K.van?8:16)}" y="28" width="${rw-(K.van?16:34)}" height="44" rx="7" fill="url(#s${i})"/>
<rect x="${K.cx0+22}" y="31" width="${rw-48}" height="5" rx="2.5" fill="#fff" opacity=".3"/>
${K.rack?`<rect x="${K.cx0+26}" y="36" width="${rw-58}" height="4" rx="2" fill="#0006"/><rect x="${K.cx0+26}" y="60" width="${rw-58}" height="4" rx="2" fill="#0006"/>`:''}
${K.van?[1,2,3,4].map(k=>`<rect x="${K.cx0+8+k*(rw-16)/5-1.5}" y="28" width="3" height="44" fill="#0003"/>`).join(''):''}
${red?`<rect x="${K.cx0+16}" y="44" width="${rw-34}" height="4" fill="#fff" opacity=".85"/><rect x="${K.cx0+16}" y="52" width="${rw-34}" height="4" fill="#fff" opacity=".85"/><rect x="${x1-t-6}" y="46" width="${t+2}" height="8" rx="3" fill="#fff" opacity=".85"/><rect x="${x0+12}" y="46" width="${K.cx0-x0-14}" height="8" rx="3" fill="#fff" opacity=".85"/>`:`<path d="M${K.cx1+10} 50H${x1-t-4}" stroke="#0003" stroke-width="2"/>`}
<rect x="${x1-13}" y="${y0+10}" width="11" height="9" rx="4" fill="#fffbd6" stroke="#e5d36b"/><rect x="${x1-13}" y="${y1-19}" width="11" height="9" rx="4" fill="#fffbd6" stroke="#e5d36b"/>
<rect x="${x0+1}" y="${y0+11}" width="6" height="10" rx="3" fill="#ff3030"/><rect x="${x0+1}" y="${y1-21}" width="6" height="10" rx="3" fill="#ff3030"/></svg>`}
function carHTMLold(v,idx){const l=v.l,c=v.red?['#F04444','#ff8a8a']:null,col=c||CARS[idx%CARS.length];
 const th=getComputedStyle(document.documentElement);
 const base=v.red?col:(Store.d.theme==='sky'||Store.d.theme==='midnight'?col:[th.getPropertyValue('--car').trim(),th.getPropertyValue('--car2').trim()]);
 const kind=v.red?'sport':l===3?(idx%2?'van':'suv'):(idx%2?'sedan':'mini');
 const cabin=kind==='van'?[12,84]:kind==='suv'?[22,66]:kind==='sport'?[28,52]:kind==='sedan'?[26,50]:[24,54];
 return `<div class="car" style="--c:${base[0]};--c2:${base[1]}">
 <i class="body"></i>
 <i class="glass" style="left:${cabin[0]}%;width:${cabin[1]}%;top:24%;height:46%;border-radius:25%"></i>
 ${v.red?'<i style="left:44%;top:24%;width:4%;height:46%;background:#fff8;border-radius:2px"></i>':''}
 <i class="hl" style="right:3%;top:22%"></i><i class="hl" style="right:3%;bottom:22%"></i>
 <i class="tl" style="left:3%;top:22%"></i><i class="tl" style="left:3%;bottom:22%"></i>
 <i class="w" style="left:${l===3?9:12}%;top:4%"></i><i class="w" style="left:${l===3?9:12}%;bottom:4%"></i>
 <i class="w" style="right:${l===3?9:12}%;top:4%"></i><i class="w" style="right:${l===3?9:12}%;bottom:4%"></i></div>`}
function size(){const bw=$('#bw'),s=Math.floor(Math.min(bw.clientWidth-30,bw.clientHeight-10)/6);G.cell=Math.max(30,s);if(G.vs)render()}
function render(){const b=$('#board'),c=G.cell;b.style.width=b.style.height=c*6+'px';b.innerHTML='';
 for(let i=0;i<36;i++){const e=document.createElement('div');e.className='cell';e.style.cssText=`left:${i%6*c}px;top:${Math.floor(i/6)*c}px;width:${c}px;height:${c}px`;b.appendChild(e)}
 b.insertAdjacentHTML('beforeend',`<div id="exit" style="top:${2*c}px;height:${c}px">▶</div>`);
 G.vs.forEach((v,i)=>{const e=document.createElement('div');e.className='v';e.dataset.i=i;
  e.style.width=(v.h?v.l*c:c)+'px';e.style.height=(v.h?c:v.l*c)+'px';
  e.innerHTML=carHTML(v,i);const car=e.firstChild;car.style.width=v.l*c+'px';car.style.height=c+'px';
  if(!v.h)car.style.transform=`translateX(${c}px) rotate(90deg)`;
  e.style.left=(v.h?0:v.f*c)+'px';e.style.top=(v.h?v.f*c:0)+'px';place(e,i);bind(e,i);b.appendChild(e)})}
function place(e,i,px){const v=G.vs[i],o=(px??G.P[i]*G.cell);e.style.transform=v.h?`translateX(${o}px)`:`translateY(${o}px)`}
function range(i){const v=G.vs[i],g=grid(G.vs,G.P),st=v.h?1:6,base=v.h?v.f*6+G.P[i]:G.P[i]*6+v.f;let lo=G.P[i],hi=G.P[i];
 while(lo>0&&g[base-(G.P[i]-lo+1)*st]<0)lo--;while(hi+v.l<6&&g[base+(v.l+hi-G.P[i])*st]<0)hi++;return[lo,hi]}
function bind(e,i){let sx,sy,s0,r,moved;
 e.onpointerdown=ev=>{if(G.busy)return;e.setPointerCapture(ev.pointerId);sx=ev.clientX;sy=ev.clientY;s0=G.P[i];r=range(i);moved=false;e.classList.add('dr');e.classList.remove('sl')};
 e.onpointermove=ev=>{if(!e.hasPointerCapture(ev.pointerId))return;const v=G.vs[i],d=(v.h?ev.clientX-sx:ev.clientY-sy);
  let px=s0*G.cell+d;const mn=r[0]*G.cell,mx=r[1]*G.cell;if(px<mn||px>mx){if(!moved||Math.abs(d)>8)G.hitWall=true;px=Math.max(mn,Math.min(mx,px))}place(e,i,px);moved=moved||Math.abs(d)>4};
 e.onpointerup=ev=>{if(!e.hasPointerCapture(ev.pointerId))return;e.releasePointerCapture(ev.pointerId);e.classList.remove('dr');e.classList.add('sl');
  const v=G.vs[i],d=(v.h?ev.clientX-sx:ev.clientY-sy),np=Math.max(r[0],Math.min(r[1],Math.round(s0+d/G.cell)));
  if(G.hitWall&&np===s0){Audio_.err();vib(30)}G.hitWall=false;
  if(np!==s0)commit(i,np);else place(e,i)}}
function commit(i,to,hinted){G.hist.push({i,from:G.P[i]});G.P[i]=to;G.moves++;$('#mv').textContent=G.moves;Audio_.move();vib(10);
 const e=$(`.v[data-i="${i}"]`);e.classList.add('sl');place(e,i);document.querySelectorAll('.hint').forEach(x=>x.classList.remove('hint'));checkWin()}
function checkWin(){const ri=G.vs.findIndex(v=>v.red);if(G.P[ri]+2===6){G.busy=true;const e=$(`.v[data-i="${ri}"]`);
 setTimeout(()=>{e.classList.remove('sl');e.classList.add('go');place(e,ri,7*G.cell);Audio_.win();vib([30,40,60]);setTimeout(win,650)},180)}}
function stars(m,o){return m<=o?3:m<=Math.ceil(o*1.5)+1?2:1}
function win(){const o=G.L.opt,s=stars(G.moves,o),d=Store.d,n=G.n;
 if(s>(d.stars[n]||0))d.stars[n]=s;if(!d.best[n]||G.moves<d.best[n])d.best[n]=G.moves;if(n<160)d.unlocked=Math.max(d.unlocked,n+1);d.last=Math.min(160,n+1);d.played++;Store.save();refresh();
 modal(`<div style="font-size:26px;font-weight:900;color:var(--ok)">BÖLÜM TAMAMLANDI</div>
 <div class="stars">${[1,2,3].map(k=>`<span class="${k<=s?'f':''}" style="animation-delay:${k*.25}s">★</span>`).join('')}</div>
 <div style="color:var(--tx2)">${G.moves} hamle · hedef ${o}</div>
 <div class="row" style="justify-content:center">${n<160?'<button class="btn" id="nx">Sonraki bölüm</button>':''}<button class="btn s" id="rp">Tekrar oyna</button></div>`);
 [1,2,3].forEach(k=>{if(k<=s)setTimeout(()=>Audio_.star(k),k*250)});
 const nx=$('#nx');if(nx)nx.onclick=()=>{closeModal();start(n+1)};$('#rp').onclick=()=>{closeModal();start(n)}}
function start(n){G.n=n;$('#load').style.display='flex';go('game');
 setTimeout(()=>{const L=makeLevel(n);G.L=L;G.vs=L.vs;G.P=L.vs.map(v=>v.p);G.hist=[];G.moves=0;G.busy=false;
  Store.d.last=n;Store.save();$('#mv').textContent=0;$('#lvn').textContent='Bölüm '+n;size();render();$('#load').style.display='none'},30)}
$('#undo').onclick=()=>{if(G.busy||!G.hist.length){Audio_.err();return}const h=G.hist.pop();G.P[h.i]=h.from;G.moves=Math.max(0,G.moves-1);$('#mv').textContent=G.moves;Audio_.click();
 const e=$(`.v[data-i="${h.i}"]`);e.classList.add('sl');place(e,h.i)};
$('#rst').onclick=()=>{if(G.busy)return;Audio_.click();start(G.n)};
$('#hint').onclick=()=>{if(G.busy)return;Audio_.click();const s=solve(G.vs,G.P);if(!s||!s.length)return;const m=s[0],e=$(`.v[data-i="${m.i}"]`);
 e.classList.remove('hint');void e.offsetWidth;e.classList.add('hint');
 const t=document.createElement('div');t.textContent=m.to>m.from?(G.vs[m.i].h?'→':'↓'):(G.vs[m.i].h?'←':'↑');
 t.style.cssText=`position:absolute;z-index:9;font-size:${G.cell*.6}px;color:#fff;text-shadow:0 0 8px #000;pointer-events:none;left:${(G.vs[m.i].h?G.P[m.i]+G.vs[m.i].l/2-.3:G.vs[m.i].f+.2)*G.cell}px;top:${(G.vs[m.i].h?G.vs[m.i].f+.1:G.P[m.i]+G.vs[m.i].l/2-.4)*G.cell}px`;
 $('#board').appendChild(t);setTimeout(()=>t.remove(),2400)};
