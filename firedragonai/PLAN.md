# Fire Dragon AI — Landing Page Plan & Design System

> AI-powered growth studio. We build a **free website** as the lead magnet, then construct
> **funnels, landing pages, and AI booking** for online fitness coaches, small gyms, and
> cleaning businesses — so they focus on training and cleaning.

**Brand:** Fire Dragon AI · **Web:** www.firedragonai.com · **Email:** info@firedragonai.com · **Phone:** 312.515.6882 · **HQ:** Chicago, IL

---

## 1. Strategy

| Lever | Decision | Why |
|-------|----------|-----|
| **Primary goal** | One conversion: *Claim Free Website* form submit | A single primary CTA per page outperforms competing CTAs (UX rule `primary-action`). |
| **Lead magnet** | The free website itself | Removes price objection; the offer IS the hook. |
| **Positioning** | Specialist, not generalist | Three named niches (coaches / gyms / cleaners) make the copy feel "for me." |
| **Emotional promise** | "You focus on training & cleaning. We handle growth." | Sells time and relief, not features. |
| **Proof** | Testimonials + stat cards before the CTA | Social proof before the ask lifts conversion (landing pattern below). |

### Landing pattern (from `ui-ux-pro-max --domain landing`)
Hybrid of two proven patterns the skill returned:
- **Lead Magnet + Form** → hero benefit headline → magnet preview → ≤3-field form.
- **Hero + Testimonials + CTA** → social proof seated directly before the conversion block.

**Final section order:** Nav → Hero → Trust marquee → Problem → Services → Who It's For → Process → Testimonials → **Claim CTA (form)** → FAQ → Footer.
Form kept to **3 fields** (name, email, business type) — the skill's conversion note: *form fields ≤ 3 for best conversion.*

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
├── index.html          # Production landing page (single file, Tailwind CDN)
├── assets/
│   ├── logo-dragon.png    # Circular dragon emblem
│   └── logo-wordmark.png  # "Fire Dragon AI" wordmark
├── PLAN.md             # This document
└── PROMPT.md           # Copy-paste master prompt for Claude / Claude Code
```

**Preview locally:** open `index.html` in a browser, or `cd firedragonai && python3 -m http.server 8000` → http://localhost:8000

---

## 5. Before launch (swap placeholders)
1. Replace the 3 illustrative testimonials with real client quotes + photos.
2. Wire the form to a real endpoint (Formspree / HubSpot / your CRM) — currently a demo handler.
3. Add `nano-banana` generated hero video/flame loop if desired (see PROMPT.md "Optional media").
4. Add favicon + real OG share image; verify the `og:image` tag.
5. Connect booking (Calendly / GoHighLevel) behind the CTA.
