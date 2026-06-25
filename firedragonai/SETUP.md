# Fire Dragon AI — Payment & Fulfillment Setup Checklist

Everything the **pricing** + **onboarding** pages need to go live. The front-end is built
and safe (no secret keys in the site). You connect the money and automation below.

---

## 1. Stripe — create 1 Payment Link (~5 min, no code)

In your Stripe Dashboard → **Payment Links → + New**. Create:

| Link | Product | Price | Type |
|------|---------|-------|------|
| `monthly` | Booking Automation | **$250 / month** | Recurring · cancel anytime |

**After creating the link → Settings:**
- **After payment → Redirect:** `https://www.firedragonai.com/onboarding.html?plan=booking&billing=monthly`
- Turn on **"Collect customer email"** and Stripe's receipt emails.

**Then paste the URL** into `pricing.html` → the `STRIPE = {…}` object near the bottom:
```javascript
var STRIPE = {
  monthly: "https://buy.stripe.com/your-link-here"
};
```

Until then the page runs in safe preview mode.

---

## 2. Onboarding backend — where uploads + info go

Open `onboarding.html` → set `ONBOARD_ENDPOINT`. Two options:

- **GoHighLevel (recommended):** Build a GHL form/webhook that accepts the fields + files,
  point `ONBOARD_ENDPOINT` at it. GHL then runs the rest (below).
- **Formspree (quick start):** A paid Formspree plan supports file uploads; paste its endpoint.

Leave `ONBOARD_ENDPOINT` empty and the page still works — it generates a Client ID
and shows the confirmation screen locally (files won't be stored until endpoint is set).

**Also set the lead form `FORMSPREE_ID`** in `index.html` (line with `var FORMSPREE_ID`)
and in `cleaners.html` (`window.FORMSPREE_ID`) — replace `xityourID` with your real form ID.

---

## 3. GoHighLevel workflow
Trigger: new onboarding submission (and/or Stripe "payment succeeded").
1. **Create contact** from the form fields.
2. **Assign Client ID** — the page generates `FD-YYYY-XXXXX` and sends it as `client_id`.
3. **Send confirmation email** ("We've got everything, your build starts now — here's your Client ID").
4. **Send the contract** via GHL Documents & Contracts (e-sign + downloadable PDF).
5. **Kick off fulfillment** (internal task / Slack / pipeline stage).
6. **30-day review** reminder — review real traffic and lead numbers with client.

---

## 4. Contract (get it lawyer-reviewed before it's binding)

A starter draft is in **`CONTRACT-TEMPLATE.md`** — fill the `[BRACKETED]` placeholders and have
a licensed attorney review before use. Key clauses to check:
- **Delivery:** Website + quote system live within 48 hours of materials received.
- **Guarantee:** 3 booked jobs in 30 days or full refund of service fees (ad spend excluded).
- **AI voice recording:** Illinois all-party consent disclosure included.
- **Cancellation:** Month-to-month, cancel before next billing cycle.

---

## 5. Testimonial — replace before launch

In `index.html`, find the section marked `<!-- SWAP: Replace this testimonial -->`.
Replace the placeholder quote (Maria C.) with the real client quote once confirmed.
Same in `cleaners.html` if keeping that page active.

---

## 6. Founder photo — add before launch

In `index.html`, find the About section. Replace the placeholder `<div>` with:
```html
<img src="assets/founder-photo.jpg" alt="Jayson, Founder of Fire Dragon AI"
     class="w-full h-full object-cover" />
```
Use a headshot at ~400×500px, saved as `firedragonai/assets/founder-photo.jpg`.

---

## 7. Privacy policy date

In `privacy.html`, replace `[DATE]` with the current date before publishing.
Have a licensed attorney review the policy before the site goes live with real users.

---

## 8. Page map

| Page | Purpose |
|------|---------|
| `index.html` | Homepage — cleaning businesses only, free site + $250/mo offer |
| `pricing.html` | Single tier ($250/mo), guarantee, → Stripe Payment Link |
| `cleaners.html` | Dedicated quote/booking funnel — use for paid ads targeting |
| `onboarding.html` | Post-payment intake: info + logo/photo uploads → Client ID |
| `privacy.html` | Privacy policy |

---

## 9. Quick go-live order
1. Create the Stripe Payment Link → paste into `pricing.html` STRIPE object.
2. Set link redirect to `onboarding.html?plan=booking&billing=monthly`.
3. Build GHL form/workflow → set `ONBOARD_ENDPOINT` in `onboarding.html`.
4. Set `FORMSPREE_ID` in `index.html` and `cleaners.html`.
5. Swap in the real testimonial (see step 5 above).
6. Add founder photo (see step 6 above).
7. Set date in `privacy.html` and have attorney review.
8. Test one real submission end-to-end, then go live.
