# Fire Dragon AI — Email Copy (Onboarding Confirmation)

Ready to paste into **GoHighLevel** (or any email tool). Merge fields use GHL-style
`{{ }}` — swap to your tool's syntax if different. Two emails included:

1. **Payment Welcome** — sent immediately after Stripe payment (before/with the onboarding link)
2. **Onboarding Confirmation** — sent after they submit the onboarding form (the one you asked for)

**Merge fields used:** `{{contact.first_name}}`, `{{contact.email}}`, `{{client_id}}`,
`{{plan_name}}`, `{{business_name}}`. Set `client_id` and `plan_name` from your workflow.
**From name:** Fire Dragon AI · **From email:** info@firedragonai.com · **Reply-to:** info@firedragonai.com

---

## EMAIL 1 — Payment Welcome (right after checkout)

**Subject line options**
- 🔥 You're in, {{contact.first_name}} — let's build your site
- Welcome to Fire Dragon AI! One quick step to start your 48-hour build
- Payment received — here's what happens next

**Preheader:** Upload your logo & details and we start building immediately.

**Body (plain text)**
```
Hey {{contact.first_name}},

Welcome to Fire Dragon AI — payment received and we're fired up to build for {{business_name}}. 🔥

Your plan: {{plan_name}}

ONE QUICK STEP to start your build:
Upload your logo, a few photos, and your business info here 👉 https://www.firedragonai.com/onboarding.html

The moment you submit, your 48-hour build clock starts and you'll get your Client ID + a confirmation email.

Questions? Just reply to this email or call us at 312.515.6882.

Let's build something that books your calendar,
The Fire Dragon AI Team
info@firedragonai.com | 312.515.6882
```

---

## EMAIL 2 — Onboarding Confirmation (after they submit the form)

**Subject line options**
- ✅ Got it all, {{contact.first_name}} — your build starts now (Client ID inside)
- We've received everything for {{business_name}} 🔥
- You're all set — here's your Client ID & what's next

**Preheader:** Everything's received. Your website & funnel go live within 48 hours.

**Body (plain text)**
```
Hey {{contact.first_name}},

Great news — we've received everything we need for {{business_name}}. Your build is officially underway. 🔥

YOUR CLIENT ID: {{client_id}}
(Keep this handy — reference it on any email or call with us.)

WHAT HAPPENS NEXT
1. Build begins now — your website & funnel go live within 48 hours.
2. Your contract — a separate email with your agreement and 90-day guarantee is on its way to e-sign and download.
3. Growth services (ads, SEO, Google Business Profile, social) begin within 48 hours and ramp through your first week.

WHAT WE MIGHT REACH OUT FOR
- A quick detail about your offer or scheduling
- Access approvals for ad or social accounts (we'll guide you)

You don't need to do anything else right now — we'll keep you posted at each milestone.

Need anything? Reply here or call 312.515.6882.

Let's get you booked,
The Fire Dragon AI Team
info@firedragonai.com | 312.515.6882

---
A note on your AI voice service: calls are announced as recorded to comply with Illinois law.
```

---

## EMAIL 2 — Branded HTML version (paste into GHL's code/HTML editor)

```html
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0606;margin:0;padding:24px 0;font-family:Arial,Helvetica,sans-serif;">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#120a09;border:1px solid rgba(255,180,120,0.18);border-radius:16px;overflow:hidden;">

      <!-- Header -->
      <tr><td style="padding:28px 32px;border-bottom:1px solid rgba(255,180,120,0.12);">
        <span style="font-size:22px;font-weight:bold;color:#ffffff;">Fire Dragon <span style="color:#FB7227;">AI</span></span>
      </td></tr>

      <!-- Hero -->
      <tr><td style="padding:32px 32px 8px;">
        <h1 style="margin:0;color:#ffffff;font-size:26px;line-height:1.2;">Got it all, {{contact.first_name}} — your build starts now. 🔥</h1>
        <p style="margin:14px 0 0;color:#e8d8cf;font-size:15px;line-height:1.6;">
          We've received everything we need for <strong style="color:#ffffff;">{{business_name}}</strong>. Your website &amp; funnel go live within <strong style="color:#ffffff;">48 hours</strong>.
        </p>
      </td></tr>

      <!-- Client ID -->
      <tr><td style="padding:20px 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#1b0f0d;border:1px solid rgba(251,114,39,0.4);border-radius:12px;">
          <tr><td style="padding:18px 22px;text-align:center;">
            <div style="color:#b89c90;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Your Client ID</div>
            <div style="color:#FB7227;font-size:28px;font-weight:bold;margin-top:4px;">{{client_id}}</div>
          </td></tr>
        </table>
      </td></tr>

      <!-- Steps -->
      <tr><td style="padding:8px 32px 8px;">
        <p style="color:#ffffff;font-size:15px;font-weight:bold;margin:0 0 10px;">What happens next</p>
        <p style="color:#e8d8cf;font-size:14px;line-height:1.7;margin:0;">
          <strong style="color:#FB7227;">1.</strong> Build begins now — site &amp; funnel live within 48 hours.<br>
          <strong style="color:#FB7227;">2.</strong> Your contract + 90-day guarantee arrives in a separate email to e-sign.<br>
          <strong style="color:#FB7227;">3.</strong> Ads, SEO, Google Business Profile &amp; social begin within 48 hours and ramp through week one.
        </p>
      </td></tr>

      <!-- CTA -->
      <tr><td style="padding:24px 32px 8px;" align="center">
        <a href="tel:+13125156882" style="display:inline-block;background:#FB7227;color:#ffffff;text-decoration:none;font-weight:bold;font-size:15px;padding:14px 28px;border-radius:12px;">Questions? Call 312.515.6882</a>
      </td></tr>

      <!-- Footer -->
      <tr><td style="padding:24px 32px 28px;border-top:1px solid rgba(255,180,120,0.12);margin-top:16px;">
        <p style="color:#b89c90;font-size:12px;line-height:1.6;margin:0;">
          Let's get you booked,<br><strong style="color:#e8d8cf;">The Fire Dragon AI Team</strong><br>
          <a href="mailto:info@firedragonai.com" style="color:#FB7227;text-decoration:none;">info@firedragonai.com</a> · 312.515.6882<br><br>
          <span style="color:#7a6a62;">Your AI voice service announces call recording to comply with Illinois law.</span>
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>
```

---

## Tips
- **Send timing:** Email 1 on Stripe "payment succeeded"; Email 2 on onboarding-form submit.
- **Attach/Link the contract** in Email 2 (or send a 3rd dedicated "Sign your agreement" email from GHL Documents & Contracts).
- **Set `{{client_id}}`** in your GHL workflow to match the ID shown on the onboarding screen
  (format `FD-YYYY-XXXXX`), or have GHL generate it and display that instead.
- **Test deliverability:** send to Gmail, Outlook, and Apple Mail before going live.
