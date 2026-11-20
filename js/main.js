/* WIRING */
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{Audio_.click();go(b.dataset.go)});
$('#play').onclick=()=>{Audio_.click();start(Math.min(Store.d.unlocked,160))};
$('#cont').onclick=()=>{Audio_.click();start(Store.d.last)};
$('#qsnd').onclick=()=>{Store.d.sound=!Store.d.sound;Store.save();$('#qsnd').textContent=Store.d.sound?'Ses: Açık':'Ses: Kapalı';Audio_.click()};
$('#stat').onclick=()=>{const d=Store.d,done=Object.keys(d.stars).length;Audio_.click();
 modal(`<b style="font-size:22px">İstatistikler</b><div>Tamamlanan: ${done} / 160</div><div>Toplam yıldız: ${Store.total()} / 480</div><div>Oynanan bölüm: ${d.played}</div><div>Açılan son bölüm: ${d.unlocked}</div><button class="btn" id="cl">Tamam</button>`);$('#cl').onclick=closeModal};
document.querySelectorAll('.tg').forEach(t=>t.onclick=()=>{const k=t.dataset.k;Store.d[k]=!Store.d[k];Store.save();refresh();if(k==='music')Audio_.music();Audio_.click()});
Object.keys(Themes).forEach(t=>{const b=document.createElement('button');b.className='th';b.dataset.t=t;b.title=names[t];b.style.background=Themes[t];
 b.onclick=()=>{setTheme(t);Audio_.click();if(G.vs)render()};$('#ths').appendChild(b)});
$('#reset').onclick=()=>{modal(`<b style="font-size:20px">Tüm ilerleme silinsin mi?</b><div style="color:var(--tx2)">Bu işlem geri alınamaz.</div><div class="row" style="justify-content:center"><button class="btn s" id="no">Vazgeç</button><button class="btn" id="yes" style="background:var(--red);box-shadow:0 6px 0 #b72f2f">Sıfırla</button></div>`);
 $('#no').onclick=closeModal;$('#yes').onclick=()=>Store.reset()};
$('#about').onclick=()=>modal(`<b style="font-size:22px">Traffic Escape</b><div style="color:var(--tx2)">160 bölümlük çevrimdışı araç bulmacası. Kırmızı aracı çıkışa ulaştır. Her bölüm çözücüyle doğrulanmıştır.</div><button class="btn" id="cl">Tamam</button>`)||($('#cl').onclick=closeModal);
$('#modal').onclick=e=>{if(e.target.id==='modal'&&!$('#nx'))closeModal()};
addEventListener('resize',size);
document.addEventListener('pointerdown',()=>{Audio_.ctx()&&Audio_.c.state==='suspended'&&Audio_.c.resume();if(Store.d.music&&!Audio_.mt)Audio_.music()},{once:true});
setTheme(Store.d.theme);go('home');
