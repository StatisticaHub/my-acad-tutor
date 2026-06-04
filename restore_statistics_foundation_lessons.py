from pathlib import Path
import subprocess

COMMIT = "a2ddc41"
ROOT = "app/courses/statistics-foundation"

def run(cmd):
    return subprocess.check_output(cmd, text=True)

# Find every lesson page from the old commit
files = run([
    "git",
    "ls-tree",
    "-r",
    "--name-only",
    COMMIT,
    ROOT,
]).splitlines()

lesson_pages = [
    f for f in files
    if "/lessons/" in f and f.endswith("/page.tsx")
]

if not lesson_pages:
    raise SystemExit("No lesson pages found in old commit.")

restored = []

for file in lesson_pages:
    current_path = Path(file)

    if current_path.exists():
        backup_path = current_path.with_suffix(current_path.suffix + ".before-restore.bak")
        backup_path.write_text(current_path.read_text())

    old_content = run(["git", "show", f"{COMMIT}:{file}"])
    current_path.parent.mkdir(parents=True, exist_ok=True)
    current_path.write_text(old_content)

    restored.append(file)

print("Restored Statistics Foundation lesson pages from", COMMIT)
for item in restored:
    print("-", item)

print(f"\nTotal restored: {len(restored)}")
