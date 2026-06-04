from pathlib import Path

extensions = {".tsx", ".ts", ".jsx", ".js", ".md", ".mdx", ".json"}

skip_dirs = {"node_modules", ".next", "out", ".git"}

replacements = {
    "Premium Tutoring": "Book Customised Tutoring",
    "Premium tutoring": "Book customised tutoring",
    "premium tutoring": "book customised tutoring",
    "PREMIUM TUTORING": "BOOK CUSTOMISED TUTORING",
}

changed = []

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
        changed.append(str(path))

print("Changed files:")
for item in changed:
    print("-", item)

print(f"Total changed: {len(changed)}")
