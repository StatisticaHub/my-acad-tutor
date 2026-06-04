from pathlib import Path
import re

path = Path("app/learning-hub/page.tsx")

if not path.exists():
    raise FileNotFoundError("app/learning-hub/page.tsx not found")

content = path.read_text()
backup = path.with_suffix(path.suffix + ".before-seo-intro.bak")
backup.write_text(content)

seo_intro_block = '''
      <section className="mx-auto mt-8 max-w-7xl rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#6f0d12]">
          Structured learning
        </p>

        <h2 className="mt-3 text-2xl font-black tracking-tight text-neutral-950 md:text-3xl">
          Build a clear route through statistics, biostatistics and health data science.
        </h2>

        <p className="mt-4 max-w-4xl text-base leading-7 text-neutral-700">
          The Learning Hub brings together beginner-friendly statistics courses,
          biostatistics learning routes, interactive demos and detailed resources.
          It is designed for students who want to understand quantitative methods
          clearly, not just memorise formulas.
        </p>

        <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold">
          <a className="rounded-full border border-neutral-200 px-4 py-2 text-neutral-800 hover:bg-neutral-50" href="/resources/">
            Read Statistics Resources
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

if "Build a clear route through statistics, biostatistics and health data science" in content:
    print("Learning Hub SEO intro already exists. Skipping.")
else:
    content = re.sub(
        r"(<main[^>]*>)",
        r"\1\n" + seo_intro_block,
        content,
        count=1,
    )

path.write_text(content)

print("Added SEO intro/internal links to app/learning-hub/page.tsx")
print(f"Backup saved as: {backup}")
