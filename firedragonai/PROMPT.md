# Master Prompt — Fire Dragon AI Landing Page

Copy everything in the box below and paste it into **Claude / Claude Code** (in a repo that has the
`ui-ux-pro-max` skill installed). It is written to produce a $100k-tier, animated, dark-theme,
fire-branded landing page in one shot.

---

```text
You are an elite front-end designer + developer. Build a single, production-quality landing
page for my digital marketing agency. Make it look like a $100,000 website — cinematic, modern,
and conversion-obsessed.

FIRST: Use my `ui-ux-pro-max` skill before writing any code.
  Run these and let the results drive your decisions:
    python3 src/ui-ux-pro-max/scripts/search.py "AI marketing agency dark fire bold conversion" --design-system -p "Fire Dragon AI" -f markdown
    python3 src/ui-ux-pro-max/scripts/search.py "agency lead magnet hero social proof CTA" --domain landing
    python3 src/ui-ux-pro-max/scripts/search.py "bold display tech headlines" --domain typography
    python3 src/ui-ux-pro-max/scripts/search.py "scroll reveal parallax reduced motion accessibility" --domain ux
  Override any palette recommendation with my brand fire colors below.

BUSINESS
  Name: Fire Dragon AI
  Site: www.firedragonai.com | Email: info@firedragonai.com | Phone: 312.515.6882 | Chicago, IL
  What we do: We build clients a high-converting WEBSITE FOR FREE (our lead magnet). Then we
    construct their funnels, landing pages, and AI booking systems to book more appointments.
  Who we serve: online fitness coaches, small gyms/studios, and cleaning businesses.
  Core promise: "You focus on training and cleaning. We handle the growth."
  Assets: assets/logo-dragon.png (circular flaming-dragon emblem) and assets/logo-wordmark.png.

LOOK & FEEL (non-negotiable)
  - DARK theme. Near-black base #0a0606 (never pure #000). High contrast.
  - Accent palette = the logo's fire: yellow #FACC15, orange #FB7227, flame #F4511E, red #E11D2A,
    deep #9A1B0E. Headline + CTA use a vertical flame gradient (yellow→orange→red).
  - Live FLAME background: an animated <canvas> of embers/particles rising from the bottom,
    additive 'lighter' blending for glow. Subtle, behind content, pointer-events:none.
  - FLOATING 3D animations: glass stat cards that gently float and tilt on X/Y
    (transform-style: preserve-3d, translateY + rotateX/rotateY keyframes). A hero "orb" =
    the dragon emblem with a rotating dashed ring and radial glow.
  - Glassmorphism cards (backdrop-blur, warm 1px borders) over the dark base.
  - Typography: Bebas Neue (oversized all-caps display headlines), Space Grotesk (sub-heads/
    card titles), Inter (body). Load via Google Fonts.
  - Micro-interactions: scroll-reveal (IntersectionObserver), infinite trust marquee, button
    hover lift + glow, smooth 150–300ms easing cubic-bezier(.16,1,.3,1).

PAGE STRUCTURE (in this order)
  1. Sticky glass nav: logo + links (Services, Who It's For, Process, Results, FAQ) + CTA
     "Claim Free Website".
  2. Hero: huge flame-gradient headline ("WE BUILD YOUR WEBSITE FOR FREE. THEN WE BOOK YOUR
     CALENDAR."), subhead, two CTAs (primary "Claim My Free Website", ghost "See What We Build"),
     trust ticks, and the floating dragon-orb + 3 floating stat cards (3× appointments, $0 to
     launch, AI funnels 24/7).
  3. Trust marquee: scrolling list of the niches we serve.
  4. Problem section: 3 stat cards framing the cost of a weak online presence.
  5. Services: free-website highlight card (LEAD MAGNET badge) + funnels, landing pages, AI
     booking, AI tools. SVG icons only (Heroicons/Lucide) — no emoji as structural icons.
  6. Who It's For: 3 cards (Online Fitness Coaches, Small Gyms & Studios, Cleaning Businesses).
  7. Process: 4 steps (Free strategy call → We build it free → Add the funnel → You get booked).
  8. Testimonials: 3 five-star cards (mark as illustrative placeholders).
  9. Primary CTA section: "CLAIM YOUR FREE WEBSITE" + a ≤3-field form (name, email, business
     type) + phone/email contact. One primary action.
  10. FAQ: accordion ("Is it really free?", "What's the catch?", "How fast?", "Do I need to be
      techy?").
  11. Footer: logo, contact (site/email/phone/Chicago), nav links, copyright with current year.

ACCESSIBILITY & PERFORMANCE (must pass)
  - Respect prefers-reduced-motion: disable canvas/float/marquee/reveal; show a static glow.
  - Body text contrast ≥ 4.5:1; visible :focus-visible rings; touch targets ≥ 44px.
  - Animate transform/opacity only (no layout shift). Semantic inputs + visible <label>s.
  - Responsive at 375 / 768 / 1024 / 1440. min-h-dvh hero. No horizontal scroll.
  - Real <title>, meta description, and Open Graph tags.

DELIVERABLE
  A single self-contained index.html using the Tailwind CDN + a small <script> for the canvas,
  scroll-reveal, and form handler. Reference assets/logo-dragon.png. Clean, commented, ready to
  open in a browser. Then summarize the design choices you made and what I should swap before
  launch (real testimonials, form endpoint, booking link).
```

---

## Optional: nano-banana media to drop in
If you want AI-generated motion/imagery (your "nano banana" idea), generate these and reference them:

1. **Hero flame loop (background video)** — prompt:
   > "Seamless looping 4-second video of slow, elegant orange-and-red flames and floating embers
   > rising against a near-black background, cinematic, high contrast, subtle, no text. Vertical
   > and widescreen versions."
   Then in `index.html` add behind the hero:
   `<video autoplay muted loop playsinline poster="assets/hero-poster.jpg" class="absolute inset-0 h-full w-full object-cover opacity-40"><source src="assets/hero-flames.webm" type="video/webm"></video>`
   (Keep `prefers-reduced-motion` → hide the video.)

2. **3D dragon render** — prompt:
   > "Premium 3D render of a stylized fire dragon emblem made of molten flame, glossy obsidian
   > scales, orange/red/yellow glow, floating on transparent background, studio lighting, octane,
   > 8k, centered." → export PNG with transparency → swap into the hero orb.

3. **Section accent embers** — small transparent PNG ember sprites to scatter as floating 3D elements.

---

## How to run the page in this repo
```bash
cd firedragonai
python3 -m http.server 8000
# open http://localhost:8000
```
