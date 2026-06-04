from pathlib import Path
import re
from datetime import date

SITE_URL = "https://www.myacademictutor.com"

resources_file = Path("lib/resources.ts")
public_dir = Path("public")
sitemap_file = public_dir / "sitemap.xml"

public_dir.mkdir(exist_ok=True)

static_pages = [
    ("", "1.0"),
    ("learning-hub", "0.9"),
    ("resources", "0.9"),
    ("interactive-demos", "0.8"),
    ("contact", "0.7"),
]

resource_slugs = []

if resources_file.exists():
    content = resources_file.read_text()
    resource_slugs = sorted(set(re.findall(r'slug:\s*"([^"]+)"', content)))
else:
    print("Warning: lib/resources.ts not found. Only static pages will be added.")

today = date.today().isoformat()

urls = []

for path, priority in static_pages:
    loc = f"{SITE_URL}/{path}/" if path else f"{SITE_URL}/"
    urls.append(
        f"""  <url>
    <loc>{loc}</loc>
    <lastmod>{today}</lastmod>
    <priority>{priority}</priority>
  </url>"""
    )

for slug in resource_slugs:
    urls.append(
        f"""  <url>
    <loc>{SITE_URL}/resources/{slug}/</loc>
    <lastmod>{today}</lastmod>
    <priority>0.8</priority>
  </url>"""
    )

xml = f'''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
{chr(10).join(urls)}
</urlset>
'''

sitemap_file.write_text(xml)

print(f"Created {sitemap_file}")
print(f"Static pages: {len(static_pages)}")
print(f"Resource pages: {len(resource_slugs)}")
print(f"Total URLs: {len(static_pages) + len(resource_slugs)}")
