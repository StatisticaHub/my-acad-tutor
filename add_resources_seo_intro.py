from pathlib import Path
import re

path = Path("app/resources/page.tsx")

if not path.exists():
    raise FileNotFoundError("app/resources/page.tsx not found")

content = path.read_text()
backup = path.with_suffix(path.suffix + ".before-seo-intro.bak")
backup.write_text(content)

seo_intro_block = '''
      <section className="mx-auto mt-8 max-w-7xl rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#6f0d12]">
          Study guides
        </p>

        <h2 className="mt-3 text-2xl font-black tracking-tight text-neutral-950 md:text-3xl">
          Learn the core ideas behind statistics, biostatistics and research methods.
        </h2>

        <p className="mt-4 max-w-4xl text-base leading-7 text-neutral-700">
          These guides explain important quantitative concepts such as p-values,
          confidence intervals, regression, probability, study design, medical
          statistics and data interpretation. Each guide is written to help
          students understand the idea, avoid common mistakes and connect the
          method to real academic or health data problems.
        </p>

        <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold">
          <a className="rounded-full border border-neutral-200 px-4 py-2 text-neutral-800 hover:bg-neutral-50" href="/learning-hub/">
            Explore the Learning Hub
          </a>
          <a className="rounded-full border border-neutral-200 px-4 py-2 text-neutral-800 hover:bg-neutral-50" href="/interactive-demos/">
            Try Interactive Demos
          </a>
          <a className="rounded-full border border-neutral-200 px-4 py-2 text-neutral-800 hover:bg-neutral-50" href="/contact/">
            Request Academic Support
          </a>
        </div>
      </section>
'''

if "Learn the core ideas behind statistics, biostatistics and research methods" in content:
    print("Resources SEO intro already exists. Skipping.")
else:
    # Insert after opening <main>
    content = re.sub(
        r"(<main[^>]*>)",
        r"\1\n" + seo_intro_block,
        content,
        count=1,
    )

path.write_text(content)

print("Added SEO intro/internal links to app/resources/page.tsx")
print(f"Backup saved as: {backup}")
