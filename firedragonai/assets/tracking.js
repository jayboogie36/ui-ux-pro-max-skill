/* ============================================================================
   Fire Dragon AI — Conversion Tracking (Meta Pixel + Google Analytics 4)
   ----------------------------------------------------------------------------
   1. Paste your IDs below. Leave blank to stay OFF (safe preview mode).
   2. Include this file in <head> on every page:
        <script src="assets/tracking.js"></script>
   3. It auto-fires:
        • PageView           — every page
        • InitiateCheckout   — clicks to pricing / "Build Now" / plan CTAs
        • Lead               — homepage & niche lead-form submits + instant quote
        • CompleteRegistration — onboarding form submit (post-payment intake)
      Fire a Purchase from your Stripe "thank-you" redirect (snippet at bottom).
   ============================================================================ */
(function () {
  // ---------- CONFIG: paste your IDs ----------
  var META_PIXEL_ID = "";   // e.g. "1234567890987654"
  var GA4_ID        = "";   // e.g. "G-XXXXXXXXXX"

  // ---------- Meta Pixel base ----------
  if (META_PIXEL_ID) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', META_PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  // ---------- Google Analytics 4 base ----------
  if (GA4_ID) {
    var g = document.createElement('script'); g.async = true;
    g.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID);
  }

  // ---------- Unified event helper ----------
  // Usage anywhere:  window.fdTrack('Lead', { content_name: 'coach_form', value: 0 });
  window.fdTrack = function (event, params) {
    params = params || {};
    try { if (window.fbq) window.fbq('track', event, params); } catch (e) {}
    try { if (window.gtag) window.gtag('event', event, params); } catch (e) {}
    if (!META_PIXEL_ID && !GA4_ID && window.console) {
      console.debug('[fdTrack preview]', event, params); // visible until IDs are set
    }
  };

  // ---------- Auto-wire conversions ----------
  document.addEventListener('DOMContentLoaded', function () {
    // "Build Now" / pricing / plan CTAs -> InitiateCheckout
    var checkoutSel = 'a[href$="pricing.html"], a.build, #ignite-cta, #inferno-cta';
    document.querySelectorAll(checkoutSel).forEach(function (el) {
      el.addEventListener('click', function () {
        window.fdTrack('InitiateCheckout', { content_name: el.id || 'build_now' });
      });
    });

    // Lead capture forms (homepage + niche pages + instant quote) -> Lead
    var lead = document.getElementById('lead-form');
    if (lead) lead.addEventListener('submit', function () {
      var niche = (lead.querySelector('[name="niche"]') || {}).value || 'lead';
      window.fdTrack('Lead', { content_name: niche });
    }, true); // capture phase: fires even though the handler calls preventDefault

    // Onboarding intake (post-payment) -> CompleteRegistration
    var onboard = document.getElementById('onboard-form');
    if (onboard) onboard.addEventListener('submit', function () {
      var plan = (document.getElementById('plan-field') || {}).value || '';
      window.fdTrack('CompleteRegistration', { content_name: 'onboarding', plan: plan });
    }, true);
  });
})();

/* ----------------------------------------------------------------------------
   PURCHASE EVENT — add to your Stripe "after payment" thank-you page, OR set
   the Stripe redirect to onboarding.html and uncomment a Purchase call there.
   Example (values per plan):
     <script src="assets/tracking.js"></script>
     <script>
       fdTrack('Purchase', { value: 1150, currency: 'USD', content_name: 'Ignite' });
     </script>
   For accurate ad attribution, also enable Meta's Conversions API in GHL/Stripe.
---------------------------------------------------------------------------- */
