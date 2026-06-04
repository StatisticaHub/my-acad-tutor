from pathlib import Path
import re

path = Path("app/resources/[slug]/page.tsx")

if not path.exists():
    raise FileNotFoundError("app/resources/[slug]/page.tsx not found")

content = path.read_text()
backup = path.with_suffix(path.suffix + ".before-article-schema.bak")
backup.write_text(content)

article_schema_block = '''
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.summary,
    author: {
      "@type": "Organization",
      name: "My Academic Tutor",
    },
    publisher: {
      "@type": "Organization",
      name: "My Academic Tutor",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.myacademictutor.com/resources/${guide.slug}/`,
    },
    about: [
      "Statistics",
      "Biostatistics",
      "Health Data Science",
      "Research Methods",
      guide.area,
    ],
  };
'''

script_block = '''
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema),
          }}
        />
'''

if "const articleSchema" in content:
    print("Article schema object already exists. Skipping object.")
else:
    # Insert after guide notFound check
    pattern = r"(if \(!guide\) \{\s*notFound\(\);\s*\})"
    content = re.sub(
        pattern,
        r"\1\n" + article_schema_block,
        content,
        count=1,
        flags=re.DOTALL,
    )

if "JSON.stringify(articleSchema)" in content:
    print("Article schema script already exists. Skipping script.")
else:
    # Insert after opening <main>
    content = re.sub(
        r"(<main[^>]*>)",
        r"\1" + script_block,
        content,
        count=1,
    )

path.write_text(content)

print("Updated resource guide page with Article structured data.")
print(f"Backup saved as: {backup}")
