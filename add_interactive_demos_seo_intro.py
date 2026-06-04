from pathlib import Path
import re

path = Path("app/interactive-demos/page.tsx")

if not path.exists():
    raise FileNotFoundError("app/interactive-demos/page.tsx not found")

content = path.read_text()
backup = path.with_suffix(path.suffix + ".before-seo-intro.bak")
backup.write_text(content)

seo_intro_block = '''
      <section className="mx-auto mt-8 max-w-7xl rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#6f0d12]">
          Interactive statistics demos
        </p>

        <h2 className="mt-3 text-2xl font-black tracking-tight text-neutral-950 md:text-3xl">
          Explore statistics visually through distributions, regression and uncertainty.
        </h2>

        <p className="mt-4 max-w-4xl text-base leading-7 text-neutral-700">
          These interactive statistics demos help students understand important
          concepts such as normal distributions, regression lines, confidence
          intervals, sampling variation and uncertainty. Each demo is designed to
          connect formulas with visual intuition and practical interpretation.
        </p>

        <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold">
          <a className="rounded-full border border-neutral-200 px-4 py-2 text-neutral-800 hover:bg-neutral-50" href="/learning-hub/">
            Explore the Learning Hub
          </a>
          <a className="rounded-full border border-neutral-200 px-4 py-2 text-neutral-800 hover:bg-neutral-50" href="/resources/">
            Read Statistics Resources
          </a>
          <a className="rounded-full border border-neutral-200 px-4 py-2 text-neutral-800 hover:bg-neutral-50" href="/contact/">
            Request Academic Support
          </a>
        </div>
      </section>
'''

if "Explore statistics visually through distributions, regression and uncertainty" in content:
    print("Interactive Demos SEO intro already exists. Skipping.")
else:
    content = re.sub(
        r"(<main[^>]*>)",
        r"\1\n" + seo_intro_block,
        content,
        count=1,
    )

path.write_text(content)

print("Added SEO intro/internal links to app/interactive-demos/page.tsx")
print(f"Backup saved as: {backup}")
