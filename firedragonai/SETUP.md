# Fire Dragon AI — Payment & Fulfillment Setup Checklist

Everything the new **pricing** + **onboarding** pages need to go live. The front-end is built
and safe (no secret keys in the site). You connect the money + automation below.

---

## 1. Stripe — create 4 Payment Links (~10 min, no code)
In your Stripe Dashboard → **Payment Links → + New**. Create one for each:

| Link | Product | Price | Type |
|------|---------|-------|------|
| `ignite_monthly` | Ignite | **$500 / month** | Recurring · cap at 3 cycles* |
| `ignite_onetime` | Ignite | **$1,150** | One-time |
| `inferno_monthly` | Inferno | **$1,000 / month** | Recurring · cap at 3 cycles* |
| `inferno_onetime` | Inferno | **$2,500** | One-time |

\* Stripe doesn't auto-stop after 3 charges. Either (a) cancel the subscription after the 3rd
invoice manually / via a GHL workflow, or (b) sell it as "3 monthly payments" and set a
cancellation reminder. Easiest: handle in GoHighLevel.

**For every link → Settings:**
- **After payment → Redirect:** `https://<your-domain>/onboarding.html?plan=ignite&billing=onetime`
  (swap `plan` to `ignite`/`inferno` and `billing` to `monthly`/`onetime` per link — the
  onboarding page reads these and shows the right plan).
- Turn on **"Collect customer email"** and Stripe's receipt emails.

**Then paste the 4 URLs** into `pricing.html` → the `STRIPE = {…}` object near the bottom.
That's the only edit. Until then the page runs in safe preview mode.

---

## 2. Onboarding backend — where uploads + info go
Open `onboarding.html` → set `ONBOARD_ENDPOINT`. Two good options:

- **GoHighLevel (recommended):** build a GHL form/webhook that accepts the fields + files, then
  point `ONBOARD_ENDPOINT` at it. GHL then runs the rest (below). *(Or embed the GHL form
  directly and skip this page's form.)*
- **Formspree (quick start):** a paid Formspree plan supports file uploads; paste its endpoint.

Leave `ONBOARD_ENDPOINT` empty and the page still works for demos — it generates a Client ID
and shows the confirmation screen locally (files won't be stored).

---

## 3. GoHighLevel workflow (the automation)
Trigger: new onboarding submission (and/or Stripe "payment succeeded").
1. **Create contact** from the form fields.
2. **Assign Client ID** — the page already generates `FD-YYYY-XXXXX` and sends it as
   `client_id`; store it on the contact (or let GHL generate its own and email that instead).
3. **Send confirmation email** ("We've got everything, here's your Client ID, build starts now").
4. **Send the contract** via GHL **Documents & Contracts** (e-sign + downloadable PDF) — include
   your terms + the **conditional 90-day money-back guarantee** wording.
5. **Kick off fulfillment** (internal task / Slack / pipeline stage).
6. **White-label handoff** reminder at day 90.

---

## 4. Contract (get it lawyer-reviewed before it's binding)
Must cover:
- Scope per tier + **48-hour delivery defined as** "website & funnel after materials received;
  ads/SEO/GBP/social begin within 48h and ramp through week one."
- **Conditional 90-day money-back guarantee:** refund of service fee only if the client
  provided materials/access and participated; **excludes ad spend, domains, other hard costs.**
- **Ad spend is the client's, billed by Meta/Google directly** — not included in fees.
- IP / ownership, cancellation, and the **white-label handoff after 90 days**.
- **Illinois call-recording disclosure** for the AI voice service (all-party consent state).

---

## 5. Page map
| Page | Purpose |
|------|---------|
| `pricing.html` | Two tiers, monthly⇄one-time toggle, guarantee, → Stripe |
| `onboarding.html` | Post-payment intake: info + logo/photo uploads → Client ID + email |
| `index.html` | Now links to Pricing ("Build Now" + nav + footer) |

---

## 6. Quick go-live order
1. Create the 4 Stripe links → paste into `pricing.html`.
2. Set each link's redirect to `onboarding.html?plan=…&billing=…`.
3. Build the GHL form/workflow → set `ONBOARD_ENDPOINT`.
4. Add your lawyer-reviewed contract to GHL Documents.
5. Test one $1 link end-to-end, then flip prices live.
