from pathlib import Path
import re

path = Path("app/layout.tsx")

if not path.exists():
    raise FileNotFoundError("app/layout.tsx not found")

content = path.read_text()
backup = path.with_suffix(path.suffix + ".before-favicon.bak")
backup.write_text(content)

# Add icons block inside export const metadata if missing
if "icons:" not in content:
    content = re.sub(
        r"(export const metadata[^=]*=\s*\{)",
        r"""\1
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },""",
        content,
        count=1,
        flags=re.DOTALL,
    )
else:
    print("icons block already exists. Skipping.")

path.write_text(content)

print("Updated favicon metadata.")
print(f"Backup saved as: {backup}")
