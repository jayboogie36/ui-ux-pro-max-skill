#!/usr/bin/env python3
"""Generate a seamlessly-looping flame video for the Fire Dragon AI hero.
Procedural fire using a vertical-advection noise field with a fire color ramp.
Outputs hero-flames.mp4 (h264) + hero-poster.jpg. Loops perfectly via phase wrap.
"""
import numpy as np, imageio.v2 as imageio, os
from PIL import Image

W, H = 1280, 720
FPS = 30
SECONDS = 6
FRAMES = FPS * SECONDS
rng = np.random.default_rng(7)

# --- build a tileable value-noise stack (a few octaves) ---
def tileable_noise(h, w, period):
    """Noise that wraps seamlessly on all axes via low-freq sine basis on a torus."""
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    field = np.zeros((h, w), np.float32)
    for _ in range(6):
        fx, fy = rng.integers(1, period+1), rng.integers(1, period+1)
        px, py = rng.uniform(0, 2*np.pi, 2)
        amp = rng.uniform(0.4, 1.0)
        field += amp * np.sin(2*np.pi*fx*xx/w + px) * np.cos(2*np.pi*fy*yy/h + py)
    field -= field.min(); field /= (field.max() + 1e-6)
    return field

base = tileable_noise(H, W, 5)
detail = tileable_noise(H, W, 11)

# Fire color ramp: black -> deep red -> red -> orange -> yellow -> white-hot
stops = np.array([
    [0.00, (10, 6, 6)],
    [0.30, (154, 27, 14)],   # ember deep
    [0.50, (225, 29, 42)],   # ember red
    [0.68, (244, 81, 30)],   # flame
    [0.82, (251, 114, 39)],  # orange
    [0.93, (250, 204, 21)],  # yellow
    [1.00, (255, 244, 230)], # white hot
], dtype=object)
ramp_x = np.array([s[0] for s in stops], np.float32)
ramp_c = np.array([s[1] for s in stops], np.float32)

def colorize(v):
    v = np.clip(v, 0, 1)
    r = np.interp(v, ramp_x, ramp_c[:, 0])
    g = np.interp(v, ramp_x, ramp_c[:, 1])
    b = np.interp(v, ramp_x, ramp_c[:, 2])
    return np.stack([r, g, b], -1).astype(np.uint8)

# vertical mask: hot at bottom, fading up
ygrad = np.linspace(1.0, 0.0, H, dtype=np.float32)[:, None] ** 1.6

poster = None
writer = imageio.get_writer(
    "hero-flames.mp4", fps=FPS, codec="libx264", quality=7,
    macro_block_size=8, ffmpeg_log_level="error",
    output_params=["-pix_fmt", "yuv420p"],
)
for i in range(FRAMES):
    phase = i / FRAMES
    sh1 = int(phase * H)          # upward advection, wraps at H -> seamless
    sh2 = int(phase * H * 1.7) % H
    n = np.roll(base, -sh1, axis=0) * 0.65 + np.roll(detail, -sh2, axis=0) * 0.45
    flick = 0.06 * np.sin(2*np.pi*(phase*3) )  # global flicker, periodic
    intensity = np.clip((n + flick) * (0.55 + 0.9*ygrad) - (1.0 - ygrad)*0.25, 0, 1)
    intensity = intensity ** 1.25
    frame = colorize(intensity)
    writer.append_data(frame)
    if i == int(FRAMES*0.4):
        poster = frame.copy()
writer.close()

Image.fromarray(poster).save("hero-poster.jpg", quality=82)
print("wrote hero-flames.mp4", os.path.getsize("hero-flames.mp4"), "bytes; hero-poster.jpg",
      os.path.getsize("hero-poster.jpg"), "bytes")
