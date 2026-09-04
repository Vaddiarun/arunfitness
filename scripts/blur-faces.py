"""
Blur a region (a face) of an image for client privacy.

Usage:
    python scripts/blur-faces.py

Reads the raw drop-ins listed in JOBS, writes the blurred result to `out`.
Regions are given as fractions of the image size so they are resolution
independent:  cx, cy = ellipse centre;  w, h = ellipse width/height.
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
IMG = ROOT / "public" / "images"

JOBS = [
    {
        # Client 05 - BEFORE (bedroom photo, 3024x4032)
        "src": IMG / "client-09-raw.jpg",
        "out": IMG / "client-09.png",
        "regions": [dict(cx=0.507, cy=0.205, w=0.25, h=0.30)],
    },
    {
        # Client 05 - AFTER (gym / headphones photo, 1200x1599)
        "src": IMG / "client-10-raw.jpg",
        "out": IMG / "client-10.png",
        "regions": [dict(cx=0.560, cy=0.205, w=0.27, h=0.32)],
    },
]


def blur_regions(src: Path, out: Path, regions):
    im = Image.open(src).convert("RGB")
    w, h = im.size

    # Heavily obscured copy: pixelate, then soften the blocks.
    small = im.resize((max(1, w // 30), max(1, h // 30)), Image.BILINEAR)
    obscured = small.resize((w, h), Image.NEAREST).filter(ImageFilter.GaussianBlur(w * 0.012))

    # Feathered elliptical mask over each region.
    mask = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(mask)
    for r in regions:
        cx, cy, rw, rh = r["cx"] * w, r["cy"] * h, r["w"] * w / 2, r["h"] * h / 2
        d.ellipse([cx - rw, cy - rh, cx + rw, cy + rh], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(min(w, h) * 0.025))

    im.paste(obscured, (0, 0), mask)
    out.parent.mkdir(parents=True, exist_ok=True)
    im.save(out)
    print(f"  {src.name} -> {out.name}  ({w}x{h})")


if __name__ == "__main__":
    for job in JOBS:
        if not job["src"].exists():
            print(f"SKIP: {job['src']} not found")
            continue
        blur_regions(job["src"], job["out"], job["regions"])
    print("done")
