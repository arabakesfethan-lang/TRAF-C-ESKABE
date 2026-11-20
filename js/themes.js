/* THEMES */
const Themes={sky:'#2585EF',midnight:'#162447',mint:'#1FAE7C',sunset:'#F28C28'};
const names={sky:'Sky Blue',midnight:'Midnight',mint:'Mint',sunset:'Sunset'};
function setTheme(t){Store.d.theme=t;document.documentElement.dataset.theme=t==='sky'?'':t;Store.save();
 document.querySelectorAll('.th').forEach(b=>b.classList.toggle('on',b.dataset.t===t))}
