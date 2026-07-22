(function(){
  "use strict";
  var CIRC = 339.29;
  var rotWords = ['someone else.', 'your competitor.', 'the clinic nearby.', 'anyone but you.'];
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Rotating headline word ----
  var rotatorEl = document.getElementById('rotator');
  var rotIndex = 0;
  if(!reduced && rotatorEl){
    setInterval(function(){
      rotIndex = (rotIndex + 1) % rotWords.length;
      rotatorEl.textContent = rotWords[rotIndex];
    }, 2600);
  }

  // ---- Audit console elements ----
  var form = document.getElementById('auditForm');
  var urlInput = document.getElementById('urlInput');
  var scanBtn = document.getElementById('scanBtn');
  var stateIdle = document.getElementById('stateIdle');
  var stateLoading = document.getElementById('stateLoading');
  var stateError = document.getElementById('stateError');
  var stateDone = document.getElementById('stateDone');
  var errMsg = document.getElementById('errMsg');
  var loadingTarget = document.getElementById('loadingTarget');
  var doneTarget = document.getElementById('doneTarget');
  var lcpValue = document.getElementById('lcpValue');
  var checkedUrlHidden = document.getElementById('checkedUrlHidden');

  var gaugeKeys = ['performance', 'seo', 'accessibility'];
  var gaugeEls = {};
  gaugeKeys.forEach(function(k){
    gaugeEls[k] = {
      circle: document.getElementById('gaugeCircle-' + k),
      value: document.getElementById('gaugeValue-' + k)
    };
  });

  function showState(name){
    stateIdle.style.display = name === 'idle' ? '' : 'none';
    stateLoading.style.display = name === 'loading' ? '' : 'none';
    stateError.style.display = name === 'error' ? '' : 'none';
    stateDone.style.display = name === 'done' ? '' : 'none';
  }

  function normalize(u){
    u = (u || '').trim();
    if(!u) return '';
    if(!/^https?:\/\//i.test(u)) u = 'https://' + u;
    return u;
  }

  function gaugeColor(v){
    return v >= 90 ? '#8090F7' : (v >= 50 ? '#F2B84E' : '#FF7A6B');
  }

  var raf;
  function animateGauges(res){
    if(reduced){ paintGauges(res, 1); return; }
    var start = performance.now(), dur = 1500;
    function ease(t){ return 1 - Math.pow(1 - t, 3); }
    function step(now){
      var t = Math.min(1, (now - start) / dur);
      paintGauges(res, ease(t));
      if(t < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
  }

  function paintGauges(res, p){
    gaugeKeys.forEach(function(k){
      var raw = res[k];
      var has = raw != null && raw !== false;
      var val = has ? Math.round(raw * p) : 0;
      var color = has ? gaugeColor(val) : 'rgba(242,241,248,0.3)';
      var offset = CIRC * (1 - val / 100);
      var els = gaugeEls[k];
      if(els.circle){
        els.circle.setAttribute('stroke', color);
        els.circle.setAttribute('stroke-dashoffset', offset);
      }
      if(els.value){
        els.value.style.color = color;
        els.value.textContent = has ? String(val) : 'n/a';
      }
    });
  }

  // ---- Email capture ----
  var emailForm = document.getElementById('emailForm');
  var emailInput = document.getElementById('emailInput');
  var emailWrap = document.getElementById('emailWrap');
  var emailErrMsg = document.getElementById('emailErrMsg');
  var emailFormBlock = document.getElementById('emailFormBlock');
  var emailSentBlock = document.getElementById('emailSentBlock');

  function resetEmailState(){
    emailFormBlock.style.display = '';
    emailSentBlock.style.display = 'none';
    emailErrMsg.style.display = 'none';
    emailWrap.classList.remove('input-wrap--error');
    emailInput.value = '';
  }

  emailForm.addEventListener('submit', function(e){
    e.preventDefault();
    var email = (emailInput.value || '').trim();
    if(!email){
      emailErrMsg.textContent = 'Type your email so we know where to send the audit.';
      emailErrMsg.style.display = '';
      emailWrap.classList.add('input-wrap--error');
      return;
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){
      emailErrMsg.textContent = 'That email does not look right. Check it and try again.';
      emailErrMsg.style.display = '';
      emailWrap.classList.add('input-wrap--error');
      return;
    }
    emailWrap.classList.remove('input-wrap--error');
    emailErrMsg.style.display = 'none';
    var action = emailForm.getAttribute('action');
    try {
      if(action && !/YOUR_FORM_ID/.test(action)){
        var fd = new FormData();
        fd.append('email', email);
        fd.append('checked_url', checkedUrlHidden.value || '');
        fetch(action, { method: 'POST', body: fd, headers: { 'Accept': 'application/json' } }).catch(function(){});
      }
    } catch(err){}
    emailFormBlock.style.display = 'none';
    emailSentBlock.style.display = '';
  });

  // ---- Audit scan ----
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var url = normalize(urlInput.value);
    if(!url){
      errMsg.textContent = 'Type your website address to run the scan. For example, yourclinic.com';
      showState('error');
      return;
    }
    if(raf) cancelAnimationFrame(raf);
    scanBtn.disabled = true;
    scanBtn.textContent = 'Scanning';
    loadingTarget.textContent = url;
    showState('loading');
    resetEmailState();

    var api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=' + encodeURIComponent(url) + '&strategy=mobile&category=performance&category=seo&category=accessibility';

    fetch(api)
      .then(function(r){
        return r.json().then(function(d){ return { r: r, d: d }; });
      })
      .then(function(res){
        var r = res.r, d = res.d;
        if(r.status === 429) throw new Error('rate');
        if(!r.ok || !d.lighthouseResult || !d.lighthouseResult.categories){
          var reason = d && d.error && d.error.message ? d.error.message.toLowerCase() : '';
          if(/rate|quota/.test(reason)) throw new Error('rate');
          throw new Error('bad');
        }
        var lh = d.lighthouseResult;
        function g(k){
          return (lh.categories[k] && lh.categories[k].score != null) ? Math.round(lh.categories[k].score * 100) : null;
        }
        var lcpAudit = lh.audits && lh.audits['largest-contentful-paint'];
        var result = {
          performance: g('performance'),
          seo: g('seo'),
          accessibility: g('accessibility'),
          lcp: lcpAudit && lcpAudit.displayValue ? lcpAudit.displayValue : 'n/a'
        };
        doneTarget.textContent = url + ' · mobile';
        lcpValue.textContent = result.lcp;
        checkedUrlHidden.value = url;
        showState('done');
        animateGauges(result);
      })
      .catch(function(err){
        var rate = err && String(err.message) === 'rate';
        errMsg.textContent = rate
          ? 'Google is rate limiting audits right now. Its free scanner caps how many run in a day and today has hit that cap. Wait a little and rerun, or send us the address and we will run the full check for you.'
          : 'That scan did not go through. Double check the address, for example yourclinic.com, and run it again. If it keeps failing the site may be blocking automated checks.';
        showState('error');
      })
      .finally(function(){
        scanBtn.disabled = false;
        scanBtn.textContent = "Read my site's vitals";
      });
  });
})();
