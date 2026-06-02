#!/bin/bash

echo "Fixing CTA button spacing..."

python3 <<'PY'
from pathlib import Path

files = [
    Path("app/courses/page.tsx"),
    Path("app/learning-hub/page.tsx"),
    Path("app/resources/page.tsx"),
    Path("components/site/ContactCTA.tsx"),
]

# Common CTA row replacements
replacements = {
    'className="mt-8 flex gap-3"':
    'className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"',

    'className="mt-8 flex items-center gap-3"':
    'className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"',

    'className="mt-8 flex flex-wrap gap-3"':
    'className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"',

    'className="mt-8 flex flex-wrap items-center gap-3"':
    'className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"',

    'className="mt-8 flex flex-col gap-4 sm:flex-row"':
    'className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"',

    'className="mt-8 flex flex-col gap-3 sm:flex-row"':
    'className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"',

    'className="mt-8 flex flex-col gap-3 md:flex-row"':
    'className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"',

    'className="mt-8 flex flex-col gap-4 md:flex-row"':
    'className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"',
}

for path in files:
    if not path.exists():
        print(f"Skipped missing file: {path}")
        continue

    text = path.read_text()

    original = text

    for old, new in replacements.items():
        text = text.replace(old, new)

    # Make CTA links full-width on mobile when they are inside CTA rows.
    text = text.replace(
        'className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-neutral-800"',
        'className="inline-flex w-full items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-neutral-800 sm:w-auto"',
    )

    text = text.replace(
        'className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-bold text-neutral-950 transition hover:bg-neutral-50"',
        'className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-bold text-neutral-950 transition hover:bg-neutral-50 sm:w-auto"',
    )

    text = text.replace(
        'className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-bold text-neutral-950 transition hover:bg-neutral-50"',
        'className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-bold text-neutral-950 transition hover:bg-neutral-50 sm:w-auto"',
    )

    text = text.replace(
        'className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-neutral-950 transition hover:bg-neutral-100"',
        'className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-neutral-950 transition hover:bg-neutral-100 sm:w-auto"',
    )

    text = text.replace(
        'className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"',
        'className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 sm:w-auto"',
    )

    if text != original:
        path.write_text(text)
        print(f"Updated: {path}")
    else:
        print(f"No matching CTA pattern found in: {path}")

PY

echo "CTA spacing patch complete."
