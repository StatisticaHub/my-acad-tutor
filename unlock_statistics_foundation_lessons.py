from pathlib import Path
import re

root = Path("app/courses/statistics-foundation")

if not root.exists():
    raise FileNotFoundError("app/courses/statistics-foundation not found")

changed = []

for path in root.rglob("page.tsx"):
    content = path.read_text()
    original = content

    if "LockedLessonPreview" not in content:
        continue

    backup = path.with_suffix(path.suffix + ".before-unlock.bak")
    backup.write_text(content)

    content = content.replace(
        'import LockedLessonPreview from "@/components/course/LockedLessonPreview";',
        'import UnlockedLessonShell from "@/components/course/UnlockedLessonShell";',
    )

    content = content.replace("LockedLessonPreview", "UnlockedLessonShell")

    # Fix incorrect /app prefix in backHref if present
    content = content.replace('backHref="/app/courses/', 'backHref="/courses/')

    path.write_text(content)

    changed.append(str(path))

print("Unlocked Statistics Foundation lesson pages:")
for item in changed:
    print("-", item)

print(f"\nTotal unlocked: {len(changed)}")
