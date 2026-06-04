from pathlib import Path
import re

path = Path("app/page.tsx")

if not path.exists():
    raise FileNotFoundError("app/page.tsx not found")

content = path.read_text()
backup = path.with_suffix(path.suffix + ".before-faq-schema.bak")
backup.write_text(content)

faq_block = '''
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What subjects does My Academic Tutor cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "My Academic Tutor covers statistics, biostatistics, health data science, research methods, medical statistics, probability, regression, confidence intervals, hypothesis testing and data interpretation.",
      },
    },
    {
      "@type": "Question",
      name: "Is My Academic Tutor suitable for beginners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The platform includes beginner-friendly foundation material as well as more advanced resources for students learning statistics, biostatistics and health data science.",
      },
    },
    {
      "@type": "Question",
      name: "Does the website include interactive learning tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The website includes interactive demonstrations for topics such as distributions, regression, confidence intervals, uncertainty and statistical interpretation.",
      },
    },
    {
      "@type": "Question",
      name: "Can students use this website for academic support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. My Academic Tutor provides structured academic guidance for quantitative subjects, including statistics, biostatistics, research methods and health data science.",
      },
    },
  ],
};
'''

script_block = '''
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
'''

if "const faqSchema" not in content:
    # Insert FAQ schema after metadata block, before component function
    match = re.search(r"export const metadata: Metadata = \{.*?\};", content, re.DOTALL)
    if match:
        insert_at = match.end()
        content = content[:insert_at] + "\n\n" + faq_block.strip() + content[insert_at:]
    else:
        # fallback: insert after imports
        lines = content.splitlines()
        insert_at = 0
        for i, line in enumerate(lines):
            if line.startswith("import "):
                insert_at = i + 1
        lines.insert(insert_at, faq_block.strip())
        content = "\n".join(lines) + "\n"
else:
    print("FAQ schema already exists. Skipping schema object.")

if "JSON.stringify(faqSchema)" not in content:
    # Insert FAQ script immediately after opening <main>
    content = re.sub(
        r"(<main[^>]*>)",
        r"\1" + script_block,
        content,
        count=1,
    )
else:
    print("FAQ schema script already exists. Skipping script.")

path.write_text(content)

print("Updated app/page.tsx with homepage FAQ schema.")
print(f"Backup saved as: {backup}")
