from pathlib import Path

files_to_check = [
    Path("components/site/StudentSupportRecord.tsx"),
    Path("components/site/ContactCTA.tsx"),
    Path("components/site/Hero.tsx"),
    Path("app/page.tsx"),
    Path("app/contact/page.tsx"),
]

replacements = {
    "Live": "Premium",
    "LIVE": "PREMIUM",
    "Live tutoring": "Premium tutoring",
    "Live Tutoring": "Premium Tutoring",
    "TUTORING SUPPORT": "PREMIUM TUTORING",
    "Tutoring support, now built": "Premium tutoring, now built",
}

changed = []

for path in files_to_check:
    if not path.exists():
        continue

    text = path.read_text()
    original = text

    for old, new in replacements.items():
        text = text.replace(old, new)

    if text != original:
        path.write_text(text)
        changed.append(str(path))

print("Changed files:")
for item in changed:
    print("-", item)

print(f"Total changed: {len(changed)}")
