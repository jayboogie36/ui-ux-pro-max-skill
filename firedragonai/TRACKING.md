# Conversion Tracking Setup (Meta Pixel + GA4)

Tracking is built into every page via `assets/tracking.js`. It's **off until you add your IDs**
(safe — nothing fires, no cookies set). Turn it on in ~5 minutes.

## 1. Get your IDs
- **Meta Pixel:** Meta Events Manager → Data Sources → create/copy your **Pixel ID** (a number).
- **Google Analytics 4:** GA4 Admin → Data Streams → Web → copy your **Measurement ID** (`G-XXXXXXXXXX`).

## 2. Add them
Open `assets/tracking.js` and paste:
```js
var META_PIXEL_ID = "1234567890987654";  // your Pixel ID
var GA4_ID        = "G-XXXXXXXXXX";       // your GA4 ID
```
That's it — it loads on all 6 pages automatically.

## 3. What fires automatically
| Event | When | Use it for |
|-------|------|-----------|
| `PageView` | every page load | traffic, retargeting audiences |
| `InitiateCheckout` | clicks on "Build Now" / pricing / plan CTAs | mid-funnel intent |
| `Lead` | homepage, niche, and instant-quote form submits | optimize ads for leads |
| `CompleteRegistration` | onboarding form submit (post-payment) | onboarding completion |

Each event carries a `content_name` (e.g. which niche/plan) for breakdowns.

## 4. Track actual Purchases (recommended)
The most valuable event is **Purchase**. Fire it after payment one of two ways:
- **Stripe thank-you page:** set the Payment Link's after-payment redirect to a page that includes
  `tracking.js`, then add:
  ```html
  <script>fdTrack('Purchase', { value: 1150, currency: 'USD', content_name: 'Ignite' });</script>
  ```
  (Use 2500 / 'Inferno' for that tier, etc.)
- **Or** keep the redirect to `onboarding.html` and uncomment a `Purchase` call there.

> Values: Ignite one-time **1150**, Inferno one-time **2500**, monthly **500 / 1000**.

## 5. Fire your own events anywhere
```js
fdTrack('Lead', { content_name: 'cleaning_quote', value: 0 });
```

## 6. Before you spend on ads
- In **preview mode** (no IDs) open the browser console — you'll see `[fdTrack preview]` logs proving
  the events fire on the right clicks.
- Install the **Meta Pixel Helper** Chrome extension to confirm events once IDs are live.
- For accurate iOS attribution, also enable Meta's **Conversions API** (server-side) via GHL or Stripe.
- Add a short **privacy/cookie notice** to the site once tracking is on (and consider consent for EU/UK visitors).
