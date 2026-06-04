from pathlib import Path
import re

path = Path("app/layout.tsx")

if not path.exists():
    raise FileNotFoundError("app/layout.tsx not found")

content = path.read_text()
backup = path.with_suffix(path.suffix + ".before-structured-data.bak")
backup.write_text(content)

site_block = '''
  const siteUrl = "https://www.myacademictutor.com";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "My Academic Tutor",
    url: siteUrl,
    description:
      "Online learning platform for statistics, biostatistics, health data science and research methods.",
    areaServed: "Worldwide",
    knowsAbout: [
      "Statistics",
      "Biostatistics",
      "Health Data Science",
      "Research Methods",
      "Medical Statistics",
      "Data Analysis",
      "Regression",
      "Probability",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "My Academic Tutor",
    url: siteUrl,
    description:
      "Structured courses, interactive demos and academic support for quantitative subjects.",
  };
'''

script_block = '''
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
'''

# Avoid duplicate insertions
if "organizationSchema" not in content:
    # Insert schema constants before the first return inside RootLayout
    content = re.sub(
        r"(\n\s*return\s*\()",
        site_block + r"\1",
        content,
        count=1,
    )
else:
    print("Schema constants already exist. Skipping constants.")

if "JSON.stringify(organizationSchema)" not in content:
    # Insert JSON-LD scripts immediately after opening <body...>
    content = re.sub(
        r"(<body[^>]*>)",
        r"\1" + script_block,
        content,
        count=1,
    )
else:
    print("Schema scripts already exist. Skipping scripts.")

path.write_text(content)

print("Updated app/layout.tsx")
print(f"Backup saved as: {backup}")
