# Fire Dragon AI — Landing Page Plan & Design System

> AI-powered growth studio for **cleaning businesses**. We build a **free website** as the
> lead magnet, then add **instant-quote, AI booking, and online payments** ($250/month) — so
> owners focus on cleaning while the system quotes, books, and gets them paid.

**Brand:** Fire Dragon AI · **Web:** www.firedragonai.com · **Email:** info@firedragonai.com · **Phone:** 312.515.6882 · **HQ:** Chicago, IL

---

## 1. Strategy

| Lever | Decision | Why |
|-------|----------|-----|
| **Primary goal** | One conversion: *Claim Free Website* form submit | A single primary CTA per page outperforms competing CTAs (UX rule `primary-action`). |
| **Lead magnet** | The free website itself | Removes price objection; the offer IS the hook. |
| **Positioning** | Specialist, not generalist | Built exclusively for cleaning businesses — the copy feels "for me." |
| **Emotional promise** | "You focus on cleaning. We handle growth." | Sells time and relief, not features. |
| **Proof** | Testimonials + stat cards before the CTA | Social proof before the ask lifts conversion (landing pattern below). |

### Landing pattern (from `ui-ux-pro-max --domain landing`)
Hybrid of two proven patterns the skill returned:
- **Lead Magnet + Form** → hero benefit headline → magnet preview → ≤3-field form.
- **Hero + Testimonials + CTA** → social proof seated directly before the conversion block.

**Final section order:** Nav → Hero → Trust marquee → Quote demo → Services → Process → Testimonials → Pricing (+ countdown) → About/Founder → **Claim CTA (form)** → FAQ → Footer.
Form kept lean (name, phone, email, service area) + hidden fields (`niche`, `source`, `_subject`, honeypot) — the skill's conversion note: *keep visible fields minimal for best conversion.*

---

## 2. Visual Design System

### Style — "Ember Dark" (Dark Mode OLED + Kinetic Brutalism energy)
Dark-primary, high-contrast, bold display type, motion-driven. Sourced from the skill's
`Dark Mode (OLED)` (WCAG AAA, excellent performance) blended with the bold/kinetic energy of
`Kinetic Brutalism`.

### Color palette — Fire Dragon brand (overrides the auto-picked pink)
Pulled to match the dragon logo's flames. On a near-black base for max contrast.

| Role | Hex | Usage |
|------|-----|-------|
| Background | `#0a0606` | Near-black (avoids pure #000 OLED smear) |
| Surface (elevated) | `#1b0f0d` | Cards, inputs |
| Ember Yellow | `#FACC15` | Top of flame gradient, stars, highlights |
| Ember Orange | `#FB7227` | **Primary accent**, icons, links |
| Ember Flame | `#F4511E` | Mid-gradient |
| Ember Red | `#E11D2A` | CTA gradient base, deep accents |
| Ember Deep | `#9A1B0E` | Shadows, glows |
| Foreground | `#FFF4ED` (orange-50) | Body text on dark — passes 4.5:1+ |

**Flame gradient** (logo DNA): `linear-gradient(180deg, #FFE259 0%, #FB7227 45%, #E11D2A 100%)` — used on display headlines and the CTA button.

### Typography (from `ui-ux-pro-max --domain typography` → "Bold Statement" + "Tech Startup")
- **Display:** `Bebas Neue` — oversized all-caps hero/section headlines (agency/marketing best-fit).
- **Heading:** `Space Grotesk` — sub-headlines, card titles (tech/startup character).
- **Body:** `Inter` — highly readable at 16px+, line-height 1.5–1.75.

### Effects
- Live **flame particle canvas** rising from the bottom (orange→red→yellow embers), `globalCompositeOperation: 'lighter'` for glow.
- **Floating 3D cards** (`rotateX/Y` + translateY, `transform-style: preserve-3d`).
- Rotating dashed **orb ring** around the dragon emblem with radial glow.
- **Glassmorphism** cards (blur 14px, warm 1px border) on the dark base.
- Scroll-reveal via `IntersectionObserver`; infinite trust marquee.

---

## 3. Accessibility & Performance (skill Quick Reference §1–§7)
- ✅ `prefers-reduced-motion`: disables canvas animation, floats, marquee, and reveals → renders a static glow instead.
- ✅ Contrast: warm-white body text on `#0a0606` exceeds 4.5:1; large display type exceeds 3:1.
- ✅ Visible `:focus-visible` rings (ember orange) for keyboard nav.
- ✅ Touch targets ≥ 44px; semantic inputs (`type=email`, `tel:` / `mailto:` links) with visible labels.
- ✅ Animations use `transform`/`opacity` only (no layout thrash); easing `cubic-bezier(.16,1,.3,1)`.
- ✅ Responsive at 375 / 768 / 1024 / 1440; `min-h-dvh` hero; no horizontal scroll.
- ✅ SVG icons (no emoji as structural icons); logo used at correct proportions.

---

## 4. What's in this folder
```
firedragonai/
├── index.html          # Main landing page (homepage)
├── cleaners.html       # Cleaning quote funnel (instant-quote calculator)
├── pricing.html        # Pricing — free site + $250/mo booking automation
├── onboarding.html     # Post-purchase intake (uploads, Client ID, confirmation)
├── custom.html         # Client-only DFY funnel (noindex; custom builds, SaaS, white-label)
├── privacy.html        # Privacy policy
├── assets/
│   ├── logo-dragon.png    # Circular dragon emblem
│   ├── logo-wordmark.png  # "Fire Dragon AI" wordmark
│   ├── founder-photo.jpg  # Jason — founder headshot (About section)
│   ├── hero-flames.mp4    # Seamlessly-looping procedural flame video (hero bg)
│   ├── hero-poster.jpg    # Poster frame (shown before video loads / reduced-motion)
│   ├── make_flames.py     # Generator script (re-run to tweak the flame look)
│   ├── brand.css          # Shared Ember Dark styles
│   ├── brand.js           # Shared behaviour: reveal, flame canvas, hero video, lead form
│   ├── tracking.js        # Meta/GA conversion-tracking helpers
│   └── tw-config.js       # Shared Tailwind CDN config (brand tokens)
├── PLAN.md             # This document
└── PROMPT.md           # Copy-paste master prompt for Claude / Claude Code
```

### Cleaning quote funnel
`cleaners.html` shares the design system via `assets/brand.{css,js}` + `tw-config.js`, with its
own funnel copy and a single primary action. The homepage deep-links into it.

| Page | Headline angle | Conversion mechanism |
|------|----------------|----------------------|
| `cleaners.html` | "Turn 'how much?' into booked jobs." | **Live instant-quote calculator** → lead capture |

**Instant-quote calculator** (`cleaners.html` + the homepage demo): pick clean type (base price),
bedrooms (+$20), bathrooms (+$25), and frequency (one-time → weekly with up to 20% off). It
computes a rounded `$low–$high` range live, then captures the lead with the quote string
included. The homepage demo also includes a mock booking calendar. Pricing constants are at the
top of the inline script — fully configurable.

Both forms route to one Formspree inbox; a hidden `source` field (`homepage-lead-form` vs
`cleaners-quote-form`) and per-page `_subject` line make leads triageable at a glance.

### Hero flame video
A real, GPU-free looping flame video sits behind the hero (`opacity ~0.42`), with a radial
scrim for headline legibility. It degrades gracefully: **video → poster image → live ember
canvas**. Under `prefers-reduced-motion` the video is paused and the static poster shows at low
opacity. Regenerate the look anytime with `python3 assets/make_flames.py`. To swap in a
nano-banana / AI-generated clip, just replace `assets/hero-flames.mp4` (and the poster).

### Lead form → real endpoint
The form POSTs to **Formspree** (`xykqyalo`) via `fetch` with loading / success / error states,
inline validation, a 12s timeout, and a honeypot anti-spam field. If the endpoint is ever
unset, it routes users to email/phone instead of faking success. **Activation:** submit once on
the live site and click Formspree's confirmation email (sent to info@firedragonai.com).
Swappable for HubSpot/Web3Forms by changing the endpoint.

**Preview locally:** open `index.html` in a browser, or `cd firedragonai && python3 -m http.server 8000` → http://localhost:8000

---

## 5. Before launch
1. ✅ Real testimonials in place (Candice P. · Carmela) + founder photo.
2. ✅ Form wired to Formspree (`xykqyalo`) — submit once + click the confirmation email to activate.
3. ✅ Hero flame video added (`assets/hero-flames.mp4`) — optionally replace with a nano-banana clip.
4. Add favicon + real OG share image; verify the `og:image` tag.
5. Set `ONBOARD_ENDPOINT` in `onboarding.html`; attorney review of `CONTRACT-TEMPLATE.md` + `privacy.html`.
6. Point the domain + wildcard `*.firedragonai.com` DNS for the free-subdomain hosting.
