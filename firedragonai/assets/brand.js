/* Fire Dragon AI — shared brand behaviour (reveal, flame canvas, hero video) */
(function () {
  // ---------- current year ----------
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- mobile sticky "Build Now" bar ----------
  // Skipped on pages with <body data-no-mobile-cta> (pricing, onboarding).
  if (!document.body.hasAttribute('data-no-mobile-cta')) {
    var bar = document.createElement('div');
    bar.className = 'mobile-cta-bar';
    bar.setAttribute('aria-label', 'Quick actions');
    bar.innerHTML =
      '<a href="tel:+13125156882" class="call" aria-label="Call Fire Dragon AI">' +
        '<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">' +
        '<path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.5 4.5a1 1 0 01-.5 1.2l-2.26 1.13a11 11 0 005.5 5.5l1.13-2.26a1 1 0 011.2-.5l4.5 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z"/></svg></a>' +
      '<a href="#claim" class="build btn-flame">🔥 Free Website — $250/mo</a>';
    document.body.appendChild(bar);
    document.body.classList.add('has-mobile-cta');
  }

  // ---------- scroll reveal ----------
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // ---------- hero flame video ----------
  var v = document.getElementById('hero-flames');
  if (v) {
    if (prefersReduced) { v.removeAttribute('autoplay'); v.style.opacity = '0.28'; }
    else {
      v.addEventListener('playing', function () { v.style.opacity = '0.42'; }, { once: true });
      var tryPlay = function () { v.play().catch(function () { v.style.opacity = '0.42'; }); };
      if (v.readyState >= 2) tryPlay(); else v.addEventListener('loadeddata', tryPlay, { once: true });
    }
  }

  // ---------- shared lead form -> Formspree ----------
  // Set window.FORMSPREE_ID on a page to activate real submissions.
  var form = document.getElementById('lead-form');
  if (form) {
    var btn = form.querySelector('[type="submit"]');
    var msg = form.querySelector('.form-msg');
    var id = window.FORMSPREE_ID || 'xityourID';
    var show = function (text, ok) {
      if (!msg) return;
      msg.textContent = text; msg.classList.remove('hidden');
      msg.classList.toggle('text-ember-yellow', ok);
      msg.classList.toggle('text-red-400', !ok);
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form._gotcha && form._gotcha.value) return;
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var original = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      if (id === 'xityourID') {
        // Form not yet connected — never fake success. Route the lead to a real channel.
        show('Almost there! Please email info@firedragonai.com or call/text 312.515.6882 to claim your free website — our form is being connected.', false);
        if (btn) { btn.disabled = false; btn.textContent = original; }
        return;
      }
      fetch('https://formspree.io/f/' + id, {
        method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(form)
      }).then(function (res) {
        if (res.ok) { show("🔥 Thanks! We'll reach out within one business day.", true); form.reset(); }
        else { show("Something went wrong. Email info@firedragonai.com.", false); }
      }).catch(function () {
        show("Network error. Call 312.515.6882 or email info@firedragonai.com.", false);
      }).finally(function () { if (btn) { btn.disabled = false; btn.textContent = original; } });
    });
  }

  // ---------- flame particle canvas ----------
  var canvas = document.getElementById('flame-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d'), w, h, flames = [], sparks = [];
  var COLORS = ['#FFE066', '#FACC15', '#FFA126', '#FB7227', '#F4511E', '#E11D2A'];

  // Pre-render a soft radial glow sprite per color for fast, bright 3D embers
  var sprites = COLORS.map(function (c) {
    var s = document.createElement('canvas'); s.width = s.height = 64;
    var sc = s.getContext('2d');
    var g = sc.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, c);
    g.addColorStop(0.35, c);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    sc.fillStyle = g; sc.beginPath(); sc.arc(32, 32, 32, 0, Math.PI * 2); sc.fill();
    return s;
  });
  // Tiny white-hot sparkle sprite
  var sparkSprite = (function () {
    var s = document.createElement('canvas'); s.width = s.height = 16;
    var sc = s.getContext('2d');
    var g = sc.createRadialGradient(8, 8, 0, 8, 8, 8);
    g.addColorStop(0, '#fffbe6'); g.addColorStop(0.4, '#FFD56A'); g.addColorStop(1, 'rgba(255,160,40,0)');
    sc.fillStyle = g; sc.beginPath(); sc.arc(8, 8, 8, 0, Math.PI * 2); sc.fill();
    return s;
  })();

  function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);

  function spawnFlame() {
    return { x: Math.random() * w, y: h + Math.random() * 40, r: 4 + Math.random() * 11,
      vy: 0.5 + Math.random() * 1.9, vx: (Math.random() - 0.5) * 0.6, life: 0,
      ttl: 120 + Math.random() * 170, sprite: (Math.random() * sprites.length) | 0,
      flick: Math.random() * Math.PI * 2, flickSpd: 0.12 + Math.random() * 0.22 };
  }
  function spawnSpark() {
    return { x: Math.random() * w, y: h + Math.random() * 30, r: 0.8 + Math.random() * 2.2,
      vy: 1.2 + Math.random() * 2.8, vx: (Math.random() - 0.5) * 1.2, life: 0,
      ttl: 60 + Math.random() * 120, tw: Math.random() * Math.PI * 2, twSpd: 0.2 + Math.random() * 0.4 };
  }

  var mobile = window.innerWidth < 640;
  var FCOUNT = mobile ? 45 : 90;
  var SCOUNT = mobile ? 25 : 55;
  for (var i = 0; i < FCOUNT; i++) { var p = spawnFlame(); p.y = Math.random() * h; flames.push(p); }
  for (var j = 0; j < SCOUNT; j++) { var s2 = spawnSpark(); s2.y = Math.random() * h; sparks.push(s2); }

  function frame() {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';

    // Glowing 3D flame embers
    for (var k = 0; k < flames.length; k++) {
      var q = flames[k];
      q.life++; q.flick += q.flickSpd;
      q.y -= q.vy; q.x += q.vx + Math.sin(q.life * 0.03) * 0.4;
      var t = q.life / q.ttl;
      var flicker = 0.78 + Math.sin(q.flick) * 0.22;           // organic brightness flicker
      var alpha = Math.max(0, 1 - t) * 0.62 * flicker;
      var size = q.r * (1 - t * 0.35) * (0.9 + Math.sin(q.flick) * 0.12);
      ctx.globalAlpha = alpha;
      ctx.drawImage(sprites[q.sprite], q.x - size, q.y - size, size * 2, size * 2);
      if (q.life >= q.ttl || q.y < -30) flames[k] = spawnFlame();
    }

    // Twinkling sparks
    for (var m = 0; m < sparks.length; m++) {
      var e = sparks[m];
      e.life++; e.tw += e.twSpd;
      e.y -= e.vy; e.x += e.vx + Math.sin(e.life * 0.08) * 0.6;
      var et = e.life / e.ttl;
      var twinkle = Math.max(0, Math.sin(e.tw)) * Math.max(0, 1 - et);
      var es = e.r * (1.6 + Math.sin(e.tw) * 0.5);
      ctx.globalAlpha = twinkle;
      ctx.drawImage(sparkSprite, e.x - es, e.y - es, es * 2, es * 2);
      if (e.life >= e.ttl || e.y < -20) sparks[m] = spawnSpark();
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(frame);
  }
  if (!prefersReduced) frame();
  else {
    var g2 = ctx.createLinearGradient(0, h, 0, h * 0.5);
    g2.addColorStop(0, 'rgba(225,29,42,0.18)'); g2.addColorStop(1, 'rgba(10,6,6,0)');
    ctx.fillStyle = g2; ctx.fillRect(0, 0, w, h);
  }
})();
