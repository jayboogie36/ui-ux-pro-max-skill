/* Fire Dragon AI — shared brand behaviour (reveal, flame canvas, hero video) */
(function () {
  // ---------- current year ----------
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
        setTimeout(function () {
          show("🔥 Thanks! (Demo mode — add your Formspree ID to receive these.)", true);
          form.reset(); if (btn) { btn.disabled = false; btn.textContent = original; }
        }, 500);
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
  var ctx = canvas.getContext('2d'), w, h, particles = [];
  var COLORS = ['#FACC15', '#FB7227', '#F4511E', '#E11D2A', '#9A1B0E'];

  function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);

  function spawn() {
    return { x: Math.random() * w, y: h + Math.random() * 40, r: 1 + Math.random() * 3.5,
      vy: 0.4 + Math.random() * 1.6, vx: (Math.random() - 0.5) * 0.6, life: 0,
      ttl: 120 + Math.random() * 160, color: COLORS[(Math.random() * COLORS.length) | 0] };
  }
  var COUNT = window.innerWidth < 640 ? 40 : 80;
  for (var i = 0; i < COUNT; i++) { var p = spawn(); p.y = Math.random() * h; particles.push(p); }

  function frame() {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    for (var k = 0; k < particles.length; k++) {
      var q = particles[k];
      q.life++; q.y -= q.vy; q.x += q.vx + Math.sin(q.life * 0.03) * 0.3;
      var t = q.life / q.ttl, alpha = Math.max(0, 1 - t) * 0.5;
      ctx.beginPath(); ctx.fillStyle = q.color; ctx.globalAlpha = alpha;
      ctx.arc(q.x, q.y, q.r * (1 - t * 0.5), 0, Math.PI * 2); ctx.fill();
      if (q.life >= q.ttl || q.y < -20) particles[k] = spawn();
    }
    ctx.globalAlpha = 1; requestAnimationFrame(frame);
  }
  if (!prefersReduced) frame();
  else {
    var g = ctx.createLinearGradient(0, h, 0, h * 0.5);
    g.addColorStop(0, 'rgba(225,29,42,0.18)'); g.addColorStop(1, 'rgba(10,6,6,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  }
})();
