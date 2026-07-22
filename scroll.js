(function(){
  var REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function ready(){ return window.gsap && window.ScrollTrigger && document.getElementById('sc-scrub') && document.getElementById('hz-track'); }

  function build(){
    var G = (window.__KAI = window.__KAI || {});
    var gsap = window.gsap, ST = window.ScrollTrigger;
    gsap.registerPlugin(ST);
    // clean rebuild
    try{ ST.getAll().forEach(function(t){ t.kill(); }); }catch(e){}
    var bar = document.getElementById('scrollbar');

    // Smooth scroll (single Lenis instance, kept across rebuilds)
    if(!REDUCED && window.Lenis && !G.lenis){
      var lenis = new window.Lenis({ duration:1.05, smoothWheel:true });
      G.lenis = lenis;
      lenis.on('scroll', ST.update);
      gsap.ticker.add(function(t){ lenis.raf(t*1000); });
      gsap.ticker.lagSmoothing(0);
    }

    // Progress bar + unified monitor (onUpdate is proven to fire under Lenis)
    ST.create({ start:0, end:'max', onUpdate:function(self){ if(bar) bar.style.width=(self.progress*100)+'%'; monitor(); }, onRefresh:function(){ monitor(); } });

    // ---- Unified scroll monitor (getBoundingClientRect on every ST update) ----
    // ScrollTrigger onUpdate is proven to fire under Lenis; IntersectionObserver is
    // unreliable in this preview harness, so reveals/counts/rail are driven from here.
    var revEls = [].slice.call(document.querySelectorAll('[data-reveal]'));
    revEls.forEach(function(el){
      if(REDUCED){ el.style.opacity='1'; el.style.transform='none'; return; }
      el.style.opacity='0'; el.style.transform='translateY(34px)';
      el.style.transition='opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1)';
      el.__revealed=false;
    });

    var countEls = [].slice.call(document.querySelectorAll('[data-count]')).map(function(el){
      var comma = el.getAttribute('data-count-fmt')==='comma';
      var fmt = function(n){ n=Math.round(n); return comma ? n.toLocaleString('en-US') : String(n); };
      el.textContent = REDUCED ? fmt(parseFloat(el.getAttribute('data-count'))||0) : fmt(0);
      return { el:el, target:parseFloat(el.getAttribute('data-count'))||0, fmt:fmt, done:REDUCED };
    });

    var railDots = [].slice.call(document.querySelectorAll('.rail-dot'));
    var railSecs = railDots.map(function(d){ return { dot:d, sec:document.getElementById(d.getAttribute('data-target')) }; }).filter(function(x){ return x.sec; });

    function monitor(){
      if(!revEls || !countEls || !railDots) return;
      var vh = window.innerHeight;
      if(!REDUCED){
        // Reveals: show when top passes 88% of viewport
        for(var i=0;i<revEls.length;i++){ var el=revEls[i]; if(el.__revealed) continue;
          var r=el.getBoundingClientRect(); if(r.top < vh*0.88 && r.bottom > 0){ var d=parseFloat(el.getAttribute('data-reveal'))||0; el.style.transitionDelay=(d/1000)+'s'; el.style.opacity='1'; el.style.transform='none'; el.__revealed=true; } }
        // Counts: animate when 55% into view
        for(var j=0;j<countEls.length;j++){ var c=countEls[j]; if(c.done) continue;
          var cr=c.el.getBoundingClientRect(); if(cr.top < vh*0.82 && cr.bottom > 0){ c.done=true; (function(c){ var obj={v:0}; gsap.to(obj,{v:c.target,duration:1.6,ease:'power2.out',onUpdate:function(){ c.el.textContent=c.fmt(obj.v); }}); })(c); } }
      }
      // Rail: section whose center is nearest viewport center
      if(railSecs.length){ var mid=vh/2, best=null, bestD=1e9;
        for(var k=0;k<railSecs.length;k++){ var rs=railSecs[k].sec.getBoundingClientRect(); if(rs.bottom<0||rs.top>vh) continue; var c2=(rs.top+rs.bottom)/2; var dd=Math.abs(c2-mid); if(dd<bestD){ bestD=dd; best=railSecs[k].dot; } }
        for(var m=0;m<railDots.length;m++) railDots[m].classList.remove('active');
        if(best) best.classList.add('active');
      }
    }

    // Marquee (clone once)
    var marq = document.getElementById('marquee');
    if(marq){
      var set = marq.querySelector('[data-marq-set]');
      if(set && marq.children.length < 2){ var c1=set.cloneNode(true); c1.setAttribute('aria-hidden','true'); marq.appendChild(c1); marq.appendChild(c1.cloneNode(true)); }
      if(!REDUCED && set){ var w = set.getBoundingClientRect().width; if(w>0){ gsap.set(marq,{x:0}); gsap.to(marq, { x:-w, duration:26, ease:'none', repeat:-1 }); } }
    }

    // SOUTH CITY scrub
    var numEl=document.getElementById('sc-number'), dateEl=document.getElementById('sc-date'),
        line=document.getElementById('sc-line'), area=document.getElementById('sc-area'),
        dots=[].slice.call(document.querySelectorAll('.sc-dot')), flags=[].slice.call(document.querySelectorAll('.sc-flag'));
    var lineLen = 0;
    if(line){ lineLen = line.getTotalLength(); line.style.strokeDasharray=lineLen; line.style.strokeDashoffset=lineLen; }
    var dateStops = [[0,'Jul 2025'],[0.32,'Dec 2025'],[0.55,'Mar 2026'],[0.72,'Apr 2026'],[0.99,'May 2026']];
    function applySC(p){
      var val = 250 + (3900-250)*p;
      if(numEl) numEl.textContent = Math.round(val).toLocaleString('en-US');
      if(line) line.style.strokeDashoffset = lineLen*(1-p);
      if(area) area.style.opacity = String(0.18*Math.min(1,p*1.4));
      dots.forEach(function(dt){ dt.style.opacity = p>=parseFloat(dt.getAttribute('data-p'))?'1':'0'; });
      flags.forEach(function(fl){ fl.style.opacity = p>=parseFloat(fl.getAttribute('data-p'))?'1':'0.25'; });
      if(dateEl){ var lab='Jul 2025'; dateStops.forEach(function(s){ if(p>=s[0]) lab=s[1]; }); dateEl.textContent=lab; }
    }
    applySC(REDUCED?1:0);
    if(!REDUCED) ST.create({ trigger:'#sc-scrub', start:'top top', end:'bottom bottom', scrub:0.6, onUpdate:function(self){ applySC(self.progress); } });

    // HORIZONTAL scroll
    var hzSection=document.getElementById('hz-section'), hzTrack=document.getElementById('hz-track'), hzSticky=document.getElementById('hz-sticky');
    if(hzSection && hzTrack){
      if(REDUCED){
        hzSection.style.height='auto';
        if(hzSticky){ hzSticky.style.position='static'; hzSticky.style.height='auto'; }
        hzTrack.style.flexWrap='wrap'; hzTrack.style.height='auto';
      } else {
        var maxX = Math.max(0, hzTrack.scrollWidth - window.innerWidth);
        hzSection.style.height = (window.innerHeight + maxX) + 'px';
        ST.create({ trigger:hzSection, start:'top top', end:'bottom bottom', scrub:0.5, invalidateOnRefresh:true,
          onRefresh:function(){ maxX = Math.max(0, hzTrack.scrollWidth - window.innerWidth); hzSection.style.height=(window.innerHeight+maxX)+'px'; },
          onUpdate:function(self){ hzTrack.style.transform='translate3d('+(-maxX*self.progress)+'px,0,0)'; } });
      }
    }

    // NHS ghost parallax
    var ghost=document.getElementById('nhsGhost');
    if(ghost && !REDUCED){ gsap.to(ghost, { yPercent:-22, ease:'none', scrollTrigger:{ trigger:'#uk', start:'top bottom', end:'bottom top', scrub:0.6 } }); }

    // Magnetic buttons
    if(!REDUCED){
      [].slice.call(document.querySelectorAll('.mag')).forEach(function(btn){
        if(btn.__mag) return; btn.__mag = true;
        btn.addEventListener('pointermove', function(e){
          var r = btn.getBoundingClientRect();
          var mx = e.clientX - (r.left + r.width/2), my = e.clientY - (r.top + r.height/2);
          btn.style.transform = 'translate('+(mx*0.22)+'px,'+(my*0.30)+'px)';
        });
        btn.addEventListener('pointerleave', function(){ btn.style.transform=''; });
      });
    }

    G.built = true; G.count = ST.getAll().length;
    monitor();
    requestAnimationFrame(monitor);
    setTimeout(function(){ ST.refresh(); monitor(); }, 200);
    setTimeout(monitor, 600);
  }

  // Custom cursor: dot + trailing ring that grows over interactive elements
  function initCursor(){
    if(REDUCED || matchMedia('(hover: none)').matches) return;
    if(document.getElementById('cDot')) return;
    var dot=document.createElement('div'); dot.id='cDot'; dot.setAttribute('aria-hidden','true');
    var ring=document.createElement('div'); ring.id='cRing'; ring.setAttribute('aria-hidden','true');
    document.body.appendChild(dot); document.body.appendChild(ring);
    var mx=-100,my=-100,rx=-100,ry=-100;
    window.addEventListener('pointermove',function(e){ mx=e.clientX; my=e.clientY; },{passive:true});
    (function loop(){
      rx+=(mx-rx)*0.16; ry+=(my-ry)*0.16;
      dot.style.transform='translate('+mx+'px,'+my+'px) translate(-50%,-50%)';
      ring.style.transform='translate('+rx+'px,'+ry+'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseover',function(e){ if(e.target.closest('a,button,input,[data-count]')) ring.classList.add('hovering'); },{passive:true});
    document.addEventListener('mouseout',function(e){ if(e.target.closest('a,button,input,[data-count]')) ring.classList.remove('hovering'); },{passive:true});
  }

  // Hero glow follows cursor (plain JS, no React re-render)
  function initGlow(){
    var glow = document.getElementById('heroGlow');
    if(!glow || REDUCED) return;
    window.addEventListener('pointermove', function(e){
      var x = (e.clientX/window.innerWidth*100).toFixed(1), y=(e.clientY/window.innerHeight*100).toFixed(1);
      glow.style.background = 'radial-gradient(620px circle at '+x+'% '+y+'%, rgba(128,144,247,0.20), rgba(128,144,247,0) 60%)';
    }, {passive:true});
  }

  var tries=0;
  (function wait(){
    if(ready()){ build(); initGlow(); initCursor(); startWatchdog(); }
    else if(tries++ < 250){ setTimeout(wait, 60); }
  })();

  // Self-healing: this runtime can remount/replace the DOM once early on, which can
  // drop the triggers. If they vanish while our sections still exist, rebuild.
  function startWatchdog(){
    var checks=0;
    var iv = setInterval(function(){
      checks++;
      if(ready() && window.ScrollTrigger.getAll().length === 0){ build(); }
      if(checks > 20) clearInterval(iv);
    }, 900);
    var rt;
    window.addEventListener('resize', function(){ clearTimeout(rt); rt=setTimeout(function(){ if(window.ScrollTrigger) window.ScrollTrigger.refresh(); }, 200); }, {passive:true});
  }
})();
