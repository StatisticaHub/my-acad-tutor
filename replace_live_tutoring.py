from pathlib import Path

extensions = {
    ".tsx",
    ".ts",
    ".jsx",
    ".js",
    ".md",
    ".mdx",
    ".json",
}

replacements = {
    "Live Tutoring": "Premium Tutoring",
    "Live tutoring": "Premium tutoring",
    "live tutoring": "premium tutoring",
    "LIVE TUTORING": "PREMIUM TUTORING",
    "Live Tutoring →": "Premium Tutoring →",
    "Live tutoring →": "Premium tutoring →",
}

skip_dirs = {
    "node_modules",
    ".next",
    "out",
    ".git",
}

changed_files = []

for path in Path(".").rglob("*"):
    if not path.is_file():
        continue

    if any(part in skip_dirs for part in path.parts):
        continue

    if path.suffix not in extensions:
        continue

    text = path.read_text(errors="ignore")
    original = text

    for old, new in replacements.items():
        text = text.replace(old, new)

    if text != original:
        path.write_text(text)
        changed_files.append(str(path))

print("Updated files:")
for file in changed_files:
    print(f"- {file}")

print(f"\nTotal changed files: {len(changed_files)}")
