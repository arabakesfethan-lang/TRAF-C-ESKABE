/* AUDIO */
const Audio_={c:null,ctx(){if(!this.c)try{this.c=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}return this.c},
 tone(f,d,t='sine',v=.15,when=0){if(!Store.d.sound)return;const c=this.ctx();if(!c)return;const o=c.createOscillator(),g=c.createGain(),s=c.currentTime+when;
  o.type=t;o.frequency.value=f;g.gain.setValueAtTime(v,s);g.gain.exponentialRampToValueAtTime(.001,s+d);o.connect(g);g.connect(c.destination);o.start(s);o.stop(s+d)},
 click(){this.tone(520,.07,'triangle')},move(){this.tone(180,.1,'sawtooth',.06)},err(){this.tone(110,.18,'square',.1)},
 win(){[523,659,784,1047].forEach((f,i)=>this.tone(f,.25,'triangle',.15,i*.12))},star(n){this.tone(880+n*180,.2,'sine',.15)},
 mt:null,music(){clearInterval(this.mt);if(!Store.d.music)return;let i=0;const n=[262,330,392,330,294,370,440,370];
  this.mt=setInterval(()=>{if(Store.d.music&&Store.d.sound)this.tone(n[i++%8],.5,'sine',.04)},500)}};
const vib=n=>{if(Store.d.vib&&navigator.vibrate)navigator.vibrate(n)};
