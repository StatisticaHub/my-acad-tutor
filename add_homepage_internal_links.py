from pathlib import Path
import re

path = Path("app/page.tsx")

if not path.exists():
    raise FileNotFoundError("app/page.tsx not found")

content = path.read_text()
backup = path.with_suffix(path.suffix + ".before-internal-links.bak")
backup.write_text(content)

internal_links_block = '''
      <section className="sr-only" aria-label="Important learning links">
        <h2>Statistics, Biostatistics and Health Data Science Learning Routes</h2>
        <p>
          My Academic Tutor provides online statistics tutoring, biostatistics
          tutoring, health data science learning, research methods support and
          interactive statistics demonstrations.
        </p>
        <nav aria-label="SEO learning links">
          <a href="/learning-hub/">Explore the Learning Hub</a>
          <a href="/resources/">Read statistics and biostatistics resources</a>
          <a href="/interactive-demos/">Try interactive statistics demos</a>
          <a href="/contact/">Contact My Academic Tutor</a>
        </nav>
      </section>
'''

if "Important learning links" in content:
    print("Internal links section already exists. Skipping.")
else:
    # Insert just before ContactCTA if present
    if "<ContactCTA />" in content:
        content = content.replace("      <ContactCTA />", internal_links_block + "\n      <ContactCTA />")
    else:
        # Fallback: insert before closing </main>
        content = re.sub(r"(</main>)", internal_links_block + r"\n    \1", content, count=1)

path.write_text(content)

print("Added homepage internal SEO links.")
print(f"Backup saved as: {backup}")
