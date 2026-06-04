from pathlib import Path
import re

path = Path("components/site/Hero.tsx")

if not path.exists():
    raise FileNotFoundError("components/site/Hero.tsx not found")

content = path.read_text()
backup = path.with_suffix(path.suffix + ".before-hero-cta-update.bak")
backup.write_text(content)

# 1. Replace Live Tutoring button text with Resources text
content = content.replace("Live Tutoring →", "Resources →")
content = content.replace("Live tutoring →", "Resources →")
content = content.replace("Live Tutoring", "Resources")
content = content.replace("Live tutoring", "Resources")

# 2. Change only the href near the Resources button if it still points to contact
# This handles common cases like href={withBasePath("/contact")}
content = re.sub(
    r'(<a[^>]*href=\{withBasePath\("/contact"\)\}[^>]*>\s*Resources\s*→?\s*</a>)',
    lambda m: m.group(1).replace('withBasePath("/contact")', 'withBasePath("/resources")'),
    content,
    flags=re.DOTALL,
)

# 3. More general fallback: if an anchor now contains Resources but href is contact, change it
content = re.sub(
    r'(<a[^>]*href=\{withBasePath\(")/contact(".*?>\s*Resources\s*→?\s*</a>)',
    r'\1/resources\2',
    content,
    flags=re.DOTALL,
)

# 4. Improve the top company name styling.
# Replace a simple paragraph/span that contains My Academic Tutor with a premium badge.
brand_badge = '''<div className="inline-flex w-fit items-center rounded-full border border-[#6f0d12]/20 bg-white/85 px-4 py-2 shadow-sm backdrop-blur">
            <span className="font-serif text-sm font-black uppercase tracking-[0.28em] text-[#6f0d12] md:text-base">
              My Academic Tutor
            </span>
          </div>'''

# Replace common existing brand paragraph block
patterns = [
    r'<p className="[^"]*uppercase[^"]*tracking[^"]*">\s*My Academic Tutor\s*</p>',
    r'<p className="[^"]*">\s*My Academic Tutor\s*</p>',
    r'<span className="[^"]*uppercase[^"]*tracking[^"]*">\s*My Academic Tutor\s*</span>',
]

changed_brand = False
for pattern in patterns:
    new_content, count = re.subn(pattern, brand_badge, content, count=1, flags=re.DOTALL)
    if count:
        content = new_content
        changed_brand = True
        break

if not changed_brand:
    print("Brand text block was not auto-replaced. Search manually for 'My Academic Tutor' in Hero.tsx.")

path.write_text(content)

print("Updated Hero CTA and company name styling.")
print(f"Backup saved as: {backup}")
