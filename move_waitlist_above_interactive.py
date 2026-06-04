from pathlib import Path
import re

path = Path("app/page.tsx")

if not path.exists():
    raise FileNotFoundError("app/page.tsx not found")

content = path.read_text()
backup = path.with_suffix(path.suffix + ".before-waitlist-move.bak")
backup.write_text(content)

# Make sure CourseWaitlist import exists
if 'import CourseWaitlist from "@/components/site/CourseWaitlist";' not in content:
    # Insert after ContactCTA import if available, otherwise after last import
    if 'import ContactCTA from "@/components/site/ContactCTA";' in content:
        content = content.replace(
            'import ContactCTA from "@/components/site/ContactCTA";',
            'import ContactCTA from "@/components/site/ContactCTA";\nimport CourseWaitlist from "@/components/site/CourseWaitlist";',
        )
    else:
        lines = content.splitlines()
        last_import = 0
        for i, line in enumerate(lines):
            if line.startswith("import "):
                last_import = i
        lines.insert(last_import + 1, 'import CourseWaitlist from "@/components/site/CourseWaitlist";')
        content = "\n".join(lines) + "\n"

# Remove existing CourseWaitlist instance wherever it currently is
content = re.sub(r"\n\s*<CourseWaitlist />", "", content)

# Try to place CourseWaitlist above the homepage interactive/calculator feature
targets = [
    "<HomepageInteractiveFeature />",
    "<InteractiveDemosPreview />",
    "<AdvancedStatisticsFeature />",
    "<StatisticsConceptLab />",
    "<ConfidenceIntervalMeanExplorer />",
]

inserted = False

for target in targets:
    if target in content:
        content = content.replace(
            f"      {target}",
            f"      <CourseWaitlist />\n      {target}",
            1,
        )
        inserted = True
        print(f"Moved CourseWaitlist above {target}")
        break

# Fallback: place before ContactCTA
if not inserted and "<ContactCTA />" in content:
    content = content.replace(
        "      <ContactCTA />",
        "      <CourseWaitlist />\n      <ContactCTA />",
        1,
    )
    inserted = True
    print("Placed CourseWaitlist above ContactCTA as fallback.")

if not inserted:
    print("Could not find interactive target. Please check app/page.tsx manually.")

path.write_text(content)

print(f"Backup saved as: {backup}")
