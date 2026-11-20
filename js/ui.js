/* UI HELPERS */
const $=s=>document.querySelector(s);
function go(id){document.querySelectorAll('.scr').forEach(s=>s.classList.toggle('on',s.id===id));
 if(id==='lv')buildGrid();if(id==='home')$('#cont').textContent='Devam et · '+Store.d.last;refresh()}
function refresh(){document.querySelectorAll('.ts').forEach(e=>e.textContent=Store.total());
 document.querySelectorAll('.tg').forEach(t=>t.classList.toggle('on',!!Store.d[t.dataset.k]))}
function modal(html){$('#mc').innerHTML=html;$('#modal').classList.add('on')}
function closeModal(){$('#modal').classList.remove('on')}
function buildGrid(){const g=$('#grid');g.innerHTML='';for(let i=1;i<=160;i++){const b=document.createElement('button'),s=Store.d.stars[i]||0;
 b.className='lv';b.disabled=i>Store.d.unlocked;b.innerHTML=i+'<small>'+(s?'★'.repeat(s):'')+'</small>';b.onclick=()=>{Audio_.click();start(i)};g.appendChild(b)}}
