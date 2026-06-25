#!/usr/bin/env python3
"""Generate the one-page 'What To Send Us' client onboarding PDF for Fire Dragon AI.
Run:  python3 make_onboarding_pdf.py   ->  What-To-Send-Us.pdf
"""
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader, simpleSplit
import os

W, H = letter
ORANGE = (0.984, 0.447, 0.153)   # #FB7227
RED    = (0.882, 0.114, 0.165)   # #E11D2A
INK    = (0.105, 0.06, 0.05)     # near-black
GRAY   = (0.30, 0.30, 0.32)
LIGHT  = (0.55, 0.55, 0.57)
LOGO = os.path.join(os.path.dirname(__file__), "..", "assets", "logo-dragon.png")

c = canvas.Canvas("What-To-Send-Us.pdf", pagesize=letter)
c.setTitle("Fire Dragon AI — What To Send Us")

M = 0.6 * inch
x = M
y = H - M

# ---------- Header ----------
if os.path.exists(LOGO):
    c.drawImage(ImageReader(LOGO), x, y - 0.55*inch, width=0.7*inch, height=0.7*inch,
                mask='auto', preserveAspectRatio=True)
c.setFillColorRGB(*INK)
c.setFont("Helvetica-Bold", 20)
c.drawString(x + 0.85*inch, y - 0.18*inch, "Client Onboarding Checklist")
c.setFillColorRGB(*ORANGE)
c.setFont("Helvetica-Bold", 12)
c.drawString(x + 0.85*inch, y - 0.40*inch, "What To Send Us  ·  Fire Dragon AI")

y -= 0.78*inch
c.setStrokeColorRGB(*ORANGE)
c.setLineWidth(2)
c.line(x, y, W - M, y)
y -= 0.26*inch

c.setFillColorRGB(*GRAY)
c.setFont("Helvetica", 9.5)
intro = ("The faster you send these, the faster we launch. Your 48-hour build clock starts the "
         "moment we have your materials — most clients see leads in 7 days or less.")
# wrap intro
for line in simpleSplit(intro, "Helvetica", 9.5, W - 2*M):
    c.drawString(x, y, line)
    y -= 0.16*inch
y -= 0.08*inch

# ---------- Sections ----------
def checkbox(cx, cy):
    c.setStrokeColorRGB(*ORANGE)
    c.setLineWidth(1)
    c.rect(cx, cy - 0.005*inch, 0.12*inch, 0.12*inch, stroke=1, fill=0)

def section(title, items):
    global y
    c.setFillColorRGB(*RED)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(x, y, title.upper())
    y -= 0.205*inch
    c.setFont("Helvetica", 9.3)
    for it in items:
        checkbox(x + 0.04*inch, y)
        c.setFillColorRGB(*INK)
        lines = simpleSplit(it, "Helvetica", 9.3, W - 2*M - 0.32*inch)
        for i, line in enumerate(lines):
            c.drawString(x + 0.26*inch, y, line)
            if i < len(lines) - 1:
                y -= 0.155*inch
        y -= 0.185*inch
    y -= 0.06*inch

section("1. Brand", [
    "Logo files — highest quality you have (PNG/SVG preferred)",
    "Brand colors (hex codes, or just say e.g. 'orange & black')",
    "Any specific fonts you use",
])
section("2. Photos & Video", [
    "Headshots / team photos",
    "Photos of your team and your work (before & afters are gold)",
    "Any short videos or clips — the more authentic, the better",
])
section("3. Business Details", [
    "Business name, phone, and email",
    "Address and/or service area + business hours",
    "Social handles — Instagram, Facebook, TikTok",
])
section("4. Your Offer", [
    "Services / packages and pricing",
    "What makes you different from competitors",
    "The top 3 questions customers always ask you",
])
section("5. Accounts & Access  (we'll guide you — use delegated/partner access, not passwords)", [
    "Domain login (or who manages it) + existing website, if any",
    "Google Business Profile + ad accounts (Meta / Google)",
    "Your booking calendar availability and rules",
])
section("6. Social Proof", [
    "3–5 reviews or testimonials (name + result), and permission to use them",
])

# ---------- How to send box ----------
box_h = 1.02*inch
by = M + 0.15*inch
c.setFillColorRGB(0.98, 0.95, 0.92)
c.roundRect(x, by, W - 2*M, box_h, 8, stroke=0, fill=1)
c.setFillColorRGB(*ORANGE)
c.setFont("Helvetica-Bold", 10.5)
c.drawString(x + 0.18*inch, by + box_h - 0.26*inch, "HOW TO SEND IT")
c.setFillColorRGB(*INK)
c.setFont("Helvetica", 9)
tips = [
    "Upload everything at the onboarding link we email you after checkout — or send to info@firedragonai.com.",
    "Keep your Client ID handy (format FD-YYYY-XXXXX) and include it with anything you send.",
    "Missing something? Send what you have now — we can start and add the rest as it comes.",
]
ty = by + box_h - 0.46*inch
for t in tips:
    c.drawString(x + 0.18*inch, ty, "•  " + t)
    ty -= 0.165*inch

# ---------- Footer ----------
c.setFillColorRGB(*LIGHT)
c.setFont("Helvetica", 8)
c.drawCentredString(W/2, M - 0.12*inch,
    "Fire Dragon AI   ·   www.firedragonai.com   ·   info@firedragonai.com   ·   312.515.6882")

c.showPage()
c.save()
print("Wrote What-To-Send-Us.pdf", os.path.getsize("What-To-Send-Us.pdf"), "bytes")
