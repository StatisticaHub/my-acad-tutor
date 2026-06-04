from pathlib import Path
import re

SITE_URL = "https://www.myacademictutor.com"

PROJECT_FILES = {
    "app/page.tsx": {
        "title": "Online Statistics, Biostatistics and Health Data Science Tutoring",
        "description": "My Academic Tutor helps students learn statistics, biostatistics, health data science and research methods through structured courses, interactive demos and academic guidance.",
        "canonical": f"{SITE_URL}/",
    },
    "app/learning-hub/page.tsx": {
        "title": "Learning Hub",
        "description": "Explore structured courses in statistics, biostatistics, health data science, research methods and medical statistics with interactive learning support.",
        "canonical": f"{SITE_URL}/learning-hub/",
    },
    "app/resources/page.tsx": {
        "title": "Statistics and Biostatistics Resources",
        "description": "Read detailed guides on p-values, confidence intervals, regression, probability, study design, data interpretation, biostatistics and research methods.",
        "canonical": f"{SITE_URL}/resources/",
    },
    "app/interactive-demos/page.tsx": {
        "title": "Interactive Statistics Demos",
        "description": "Try interactive statistics demonstrations for normal distributions, regression lines, confidence intervals, uncertainty, sampling and data interpretation.",
        "canonical": f"{SITE_URL}/interactive-demos/",
    },
    "app/contact/page.tsx": {
        "title": "Contact",
        "description": "Contact My Academic Tutor for support with statistics, biostatistics, health data science, research methods and academic quantitative learning.",
        "canonical": f"{SITE_URL}/contact/",
    },
}


def ensure_metadata_import(content: str) -> str:
    if 'import type { Metadata } from "next";' in content:
        return content

    lines = content.splitlines()
    insert_at = 0

    # Keep "use client" or "use server" as the first line if present.
    if lines and lines[0].strip() in ['"use client";', "'use client';", '"use server";', "'use server';"]:
        insert_at = 1

    lines.insert(insert_at, 'import type { Metadata } from "next";')
    return "\n".join(lines) + "\n"


def remove_existing_static_metadata(content: str) -> str:
    pattern = re.compile(
        r'\n?export const metadata: Metadata = \{.*?\};\n?',
        re.DOTALL,
    )
    return pattern.sub("\n", content)


def insert_static_metadata(content: str, title: str, description: str, canonical: str) -> str:
    metadata_block = f'''
export const metadata: Metadata = {{
  title: "{title}",
  description:
    "{description}",
  alternates: {{
    canonical: "{canonical}",
  }},
}};
'''

    lines = content.splitlines()
    insert_at = 0

    if lines and lines[0].strip() in ['"use client";', "'use client';", '"use server";', "'use server';"]:
        insert_at = 1

    # Insert after import block.
    for i, line in enumerate(lines):
        if line.startswith("import "):
            insert_at = i + 1

    lines.insert(insert_at, metadata_block.strip())
    return "\n".join(lines) + "\n"


def update_static_page(path: Path, info: dict) -> None:
    if not path.exists():
        print(f"Skipped missing file: {path}")
        return

    content = path.read_text()
    backup = path.with_suffix(path.suffix + ".bak")
    backup.write_text(content)

    content = ensure_metadata_import(content)
    content = remove_existing_static_metadata(content)
    content = insert_static_metadata(
        content,
        info["title"],
        info["description"],
        info["canonical"],
    )

    path.write_text(content)
    print(f"Updated: {path}")


def update_dynamic_resource_page(path: Path) -> None:
    if not path.exists():
        print(f"Skipped missing file: {path}")
        return

    content = path.read_text()
    backup = path.with_suffix(path.suffix + ".bak")
    backup.write_text(content)

    # Add Metadata import if missing.
    content = ensure_metadata_import(content)

    # Avoid adding duplicate generateMetadata.
    content = re.sub(
        r'\n?export function generateMetadata\(\{ params \}:.*?\n\}\n',
        "\n",
        content,
        flags=re.DOTALL,
    )

    # Add siteUrl if missing.
    if "const siteUrl =" not in content:
        lines = content.splitlines()
        insert_at = 0
        for i, line in enumerate(lines):
            if line.startswith("import "):
                insert_at = i + 1
        lines.insert(insert_at, f'\nconst siteUrl = "{SITE_URL}";')
        content = "\n".join(lines) + "\n"

    dynamic_metadata = '''
type ResourcePageProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: ResourcePageProps): Metadata {
  const guide = resourceGuides.find((item) => item.slug === params.slug);

  if (!guide) {
    return {
      title: "Resource Not Found",
      description:
        "This statistics or biostatistics resource could not be found.",
    };
  }

  return {
    title: guide.title,
    description: guide.summary,
    alternates: {
      canonical: `${siteUrl}/resources/${guide.slug}/`,
    },
    openGraph: {
      title: `${guide.title} | My Academic Tutor`,
      description: guide.summary,
      url: `${siteUrl}/resources/${guide.slug}/`,
      type: "article",
      siteName: "My Academic Tutor",
    },
    twitter: {
      card: "summary_large_image",
      title: `${guide.title} | My Academic Tutor`,
      description: guide.summary,
    },
  };
}
'''

    lines = content.splitlines()
    insert_at = 0
    for i, line in enumerate(lines):
        if line.startswith("import ") or line.startswith("const siteUrl"):
            insert_at = i + 1

    lines.insert(insert_at, dynamic_metadata.strip())
    content = "\n".join(lines) + "\n"

    path.write_text(content)
    print(f"Updated dynamic metadata: {path}")


def main() -> None:
    root = Path.cwd()

    for file_path, info in PROJECT_FILES.items():
        update_static_page(root / file_path, info)

    update_dynamic_resource_page(root / "app/resources/[slug]/page.tsx")

    print("\nDone.")
    print("Backup files were created with .bak extension.")
    print("Now run: npm run build")


if __name__ == "__main__":
    main()
