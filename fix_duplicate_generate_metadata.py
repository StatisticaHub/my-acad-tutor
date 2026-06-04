from pathlib import Path
import re

path = Path("app/resources/[slug]/page.tsx")

if not path.exists():
    raise FileNotFoundError(f"Could not find {path}")

content = path.read_text()

backup = path.with_suffix(path.suffix + ".before-duplicate-fix.bak")
backup.write_text(content)

# Remove the duplicate non-async generateMetadata block that was added by the SEO script.
# Keep the existing async generateMetadata already present in the file.
pattern = re.compile(
    r'''
type\s+ResourcePageProps\s*=\s*\{
\s*params:\s*\{
\s*slug:\s*string;
\s*\};
\s*\};
\s*
export\s+function\s+generateMetadata\s*\(\s*\{\s*params\s*\}\s*:\s*ResourcePageProps\s*\)\s*:\s*Metadata\s*\{
.*?
^\}
\s*
''',
    re.DOTALL | re.MULTILINE | re.VERBOSE,
)

new_content, count = pattern.subn("", content)

path.write_text(new_content)

print(f"Removed duplicate generated metadata block: {count}")
print(f"Backup saved as: {backup}")
