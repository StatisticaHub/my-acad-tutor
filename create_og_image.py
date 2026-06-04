from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

out = Path("public/og-image.png")
out.parent.mkdir(exist_ok=True)

width, height = 1200, 630
img = Image.new("RGB", (width, height), "#f7f4ee")
draw = ImageDraw.Draw(img)

# Try system fonts
font_paths = [
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/System/Library/Fonts/Supplemental/Arial.ttf",
    "/Library/Fonts/Arial.ttf",
]

def load_font(size, bold=False):
    for path in font_paths:
        try:
            return ImageFont.truetype(path, size)
        except Exception:
            pass
    return ImageFont.load_default()

title_font = load_font(68)
subtitle_font = load_font(34)
small_font = load_font(28)

# Background shapes
draw.rounded_rectangle((70, 70, 1130, 560), radius=48, fill="#ffffff", outline="#e5e0d8", width=3)
draw.rounded_rectangle((90, 90, 260, 140), radius=25, fill="#111111")
draw.text((120, 105), "MAT", fill="#ffffff", font=small_font)

# Main text
draw.text((120, 200), "My Academic Tutor", fill="#111111", font=title_font)
draw.text(
    (120, 295),
    "Statistics • Biostatistics • Health Data Science",
    fill="#6f0d12",
    font=subtitle_font,
)
draw.text(
    (120, 365),
    "Structured learning, interactive demos and academic support",
    fill="#3f3f46",
    font=small_font,
)

# Footer tag
draw.rounded_rectangle((120, 465, 620, 520), radius=24, fill="#f7f4ee", outline="#e5e0d8")
draw.text((150, 480), "Learn quantitative subjects with confidence", fill="#111111", font=small_font)

img.save(out)
print(f"Created {out}")
