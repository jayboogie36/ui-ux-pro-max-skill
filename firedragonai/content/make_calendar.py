#!/usr/bin/env python3
"""Generate a 90-day, multi-platform social content calendar for Inferno clients.
Outputs content-calendar.csv — one row per scheduled post, ready to import into
Google Sheets, Notion, GoHighLevel, Metricool, Later, etc.

Edit START_DATE and the idea banks, then run:  python3 make_calendar.py
"""
import csv
import datetime

START_DATE = datetime.date(2026, 7, 6)   # a Monday; change to your client's start
DAYS = 90

# Posting cadence per weekday (0=Mon ... 6=Sun). Tune per client.
CADENCE = {
    0: ["Instagram", "Facebook", "TikTok"],   # Mon
    1: ["Instagram", "TikTok"],                # Tue
    2: ["Instagram", "Facebook", "TikTok"],    # Wed
    3: ["Instagram", "TikTok"],                # Thu
    4: ["Instagram", "Facebook", "TikTok"],    # Fri
    5: ["Facebook"],                           # Sat (light)
    6: [],                                      # Sun (rest / optional story only)
}

# 4 rotating content pillars
PILLARS = ["Educate", "Transformation / Proof", "Promote / Offer", "Engage / Behind-the-scenes"]

FORMATS = {
    "Instagram": ["Reel", "Carousel", "Single image", "Story set"],
    "Facebook":  ["Reel", "Link post", "Single image", "Community question"],
    "TikTok":    ["Talking-head Reel", "How-to Reel", "Trend/Audio Reel", "Day-in-the-life"],
}

# Hook ideas per pillar — rotate through these (swap in your niche specifics)
HOOKS = {
    "Educate": [
        "3 mistakes [your audience] make with ___ (and the fix)",
        "The #1 thing nobody tells you about ___",
        "Save this: a simple checklist for ___",
        "Myth vs fact: ___",
        "Do this for 7 days and watch what happens",
    ],
    "Transformation / Proof": [
        "Before & after: [client/result]",
        "How [client] went from ___ to ___ in [time]",
        "Real review from a happy customer 👇",
        "We didn't believe this result either…",
        "Tag someone who needs to see this transformation",
    ],
    "Promote / Offer": [
        "Spots are filling for [offer] — here's what you get",
        "Why [offer] pays for itself",
        "Last chance this month to ___",
        "Book your [free thing] before it's gone",
        "Here's exactly how to get started with us",
    ],
    "Engage / Behind-the-scenes": [
        "A day in the life at [business]",
        "Meet the team / meet the founder",
        "This or that? Drop your pick in the comments",
        "POV: you just [desired outcome]",
        "Ask us anything about ___",
    ],
}

CTAS = ["Comment below", "Save & share", "DM us 'START'", "Tap the link in bio",
        "Book your free consult", "Follow for more", "Tag a friend"]

rows = []
hook_idx = {p: 0 for p in PILLARS}
cta_i = 0
for d in range(DAYS):
    date = START_DATE + datetime.timedelta(days=d)
    week = d // 7 + 1
    platforms = CADENCE[date.weekday()]
    # one pillar leads each day, rotating
    pillar = PILLARS[d % len(PILLARS)]
    for i, platform in enumerate(platforms):
        fmt = FORMATS[platform][(d + i) % len(FORMATS[platform])]
        hooks = HOOKS[pillar]
        hook = hooks[hook_idx[pillar] % len(hooks)]
        hook_idx[pillar] += 1
        cta = CTAS[cta_i % len(CTAS)]
        cta_i += 1
        rows.append({
            "Date": date.isoformat(),
            "Weekday": date.strftime("%a"),
            "Week": f"W{week}",
            "Platform": platform,
            "Pillar": pillar,
            "Format": fmt,
            "Hook / Idea": hook,
            "Suggested CTA": cta,
            "Caption": "",
            "Asset (photo/video)": "",
            "Status": "Idea",
        })

with open("content-calendar.csv", "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
    w.writeheader()
    w.writerows(rows)

print(f"Wrote content-calendar.csv — {len(rows)} posts across {DAYS} days "
      f"({START_DATE} to {START_DATE + datetime.timedelta(days=DAYS-1)})")
