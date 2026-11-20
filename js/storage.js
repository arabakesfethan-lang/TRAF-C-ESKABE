/* STORAGE */
const Store={d:{unlocked:1,stars:{},best:{},last:1,theme:'sky',sound:true,music:false,vib:true,played:0},
 load(){try{Object.assign(this.d,JSON.parse(localStorage.getItem('te1')||'{}'))}catch(e){}},
 save(){try{localStorage.setItem('te1',JSON.stringify(this.d))}catch(e){}},
 total(){return Object.values(this.d.stars).reduce((a,b)=>a+b,0)},
 reset(){localStorage.removeItem('te1');location.reload()}};
Store.load();
