#!/bin/bash

echo "Optimising mobile spacing and headings..."

# Main public pages
perl -pi -e 's/px-5 py-16 text-neutral-950 md:px-8 md:py-20/px-5 py-10 text-neutral-950 md:px-8 md:py-20/g' app/contact/page.tsx
perl -pi -e 's/px-5 py-16 text-neutral-950 md:px-8 md:py-20/px-5 py-10 text-neutral-950 md:px-8 md:py-20/g' app/thank-you/page.tsx
perl -pi -e 's/px-5 py-16 text-neutral-950 md:px-8 md:py-20/px-5 py-10 text-neutral-950 md:px-8 md:py-20/g' app/privacy-policy/page.tsx
perl -pi -e 's/px-5 py-16 text-neutral-950 md:px-8 md:py-20/px-5 py-10 text-neutral-950 md:px-8 md:py-20/g' app/faq/page.tsx
perl -pi -e 's/px-5 py-16 text-neutral-950 md:px-8 md:py-20/px-5 py-10 text-neutral-950 md:px-8 md:py-20/g' app/about/page.tsx
perl -pi -e 's/px-5 py-16 text-neutral-950 md:px-8 md:py-20/px-5 py-10 text-neutral-950 md:px-8 md:py-20/g' app/academic-integrity/page.tsx
perl -pi -e 's/px-5 py-16 text-neutral-950 md:px-8 md:py-20/px-5 py-10 text-neutral-950 md:px-8 md:py-20/g' app/certificate-policy/page.tsx
perl -pi -e 's/px-5 py-16 text-neutral-950 md:px-8 md:py-20/px-5 py-10 text-neutral-950 md:px-8 md:py-20/g' app/certificate-verification/page.tsx
perl -pi -e 's/px-5 py-16 text-neutral-950 md:px-8 md:py-20/px-5 py-10 text-neutral-950 md:px-8 md:py-20/g' app/terms-and-conditions/page.tsx
perl -pi -e 's/px-5 py-16 text-neutral-950 md:px-8 md:py-20/px-5 py-10 text-neutral-950 md:px-8 md:py-20/g' app/services/page.tsx

# Start Here page
perl -pi -e 's/px-5 py-16 text-neutral-950 md:px-8 md:py-20/px-5 py-10 text-neutral-950 md:px-8 md:py-20/g' app/start-here/page.tsx

# Pricing page
perl -pi -e 's/min-h-screen bg-slate-50 px-6 py-20/min-h-screen bg-slate-50 px-5 py-10 md:px-6 md:py-20/g' app/pricing/page.tsx

# Not found page
perl -pi -e 's/min-h-screen bg-\[#f2efe7\] px-6 py-24 text-neutral-950/min-h-screen bg-[#f2efe7] px-5 py-12 text-neutral-950 md:px-6 md:py-24/g' app/not-found.tsx

# Large public-page headings
perl -pi -e 's/text-5xl font-semibold leading-\[0\.98\] tracking-\[-0\.04em\] md:text-7xl/text-3xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-4xl md:text-7xl/g' app/contact/page.tsx
perl -pi -e 's/text-5xl font-semibold leading-\[0\.98\] tracking-\[-0\.04em\] md:text-7xl/text-3xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-4xl md:text-7xl/g' app/thank-you/page.tsx
perl -pi -e 's/text-5xl font-semibold leading-\[0\.98\] tracking-\[-0\.04em\] md:text-7xl/text-3xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-4xl md:text-7xl/g' app/privacy-policy/page.tsx
perl -pi -e 's/text-5xl font-semibold leading-\[0\.98\] tracking-\[-0\.04em\] md:text-7xl/text-3xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-4xl md:text-7xl/g' app/faq/page.tsx
perl -pi -e 's/text-5xl font-semibold leading-\[0\.98\] tracking-\[-0\.04em\] md:text-7xl/text-3xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-4xl md:text-7xl/g' app/about/page.tsx
perl -pi -e 's/text-5xl font-semibold leading-\[0\.98\] tracking-\[-0\.04em\] md:text-7xl/text-3xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-4xl md:text-7xl/g' app/academic-integrity/page.tsx
perl -pi -e 's/text-5xl font-semibold leading-\[0\.98\] tracking-\[-0\.04em\] md:text-7xl/text-3xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-4xl md:text-7xl/g' app/certificate-policy/page.tsx
perl -pi -e 's/text-5xl font-semibold leading-\[0\.98\] tracking-\[-0\.04em\] md:text-7xl/text-3xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-4xl md:text-7xl/g' app/certificate-verification/page.tsx
perl -pi -e 's/text-5xl font-semibold leading-\[0\.98\] tracking-\[-0\.04em\] md:text-7xl/text-3xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-4xl md:text-7xl/g' app/terms-and-conditions/page.tsx
perl -pi -e 's/text-5xl font-semibold leading-\[0\.98\] tracking-\[-0\.04em\] md:text-7xl/text-3xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-4xl md:text-7xl/g' app/services/page.tsx

# Start Here heading
perl -pi -e 's/text-5xl font-black leading-\[0\.95\] tracking-\[-0\.06em\] md:text-7xl/text-3xl font-black leading-[1] tracking-[-0.045em] sm:text-4xl md:text-7xl/g' app/start-here/page.tsx

# Homepage components
perl -pi -e 's/px-5 py-12 text-neutral-950 md:px-8 md:py-20/px-5 py-10 text-neutral-950 md:px-8 md:py-20/g' components/site/Hero.tsx
perl -pi -e 's/text-5xl font-medium leading-\[1\.05\] tracking-\[-0\.03em\] md:text-7xl/text-3xl font-medium leading-[1.08] tracking-[-0.035em] sm:text-4xl md:text-7xl/g' components/site/Hero.tsx

perl -pi -e 's/px-5 py-16 text-neutral-950 md:px-8/px-5 py-10 text-neutral-950 md:px-8 md:py-16/g' components/site/HowSupportWorks.tsx
perl -pi -e 's/px-5 py-16 text-neutral-950 md:px-8/px-5 py-10 text-neutral-950 md:px-8 md:py-16/g' components/site/LearningRouteSelector.tsx
perl -pi -e 's/px-5 py-16 text-neutral-950 md:px-8/px-5 py-10 text-neutral-950 md:px-8 md:py-16/g' components/site/ContactCTA.tsx
perl -pi -e 's/px-5 py-16 text-neutral-950 md:px-8/px-5 py-10 text-neutral-950 md:px-8 md:py-16/g' components/site/StudentSupportRecord.tsx
perl -pi -e 's/px-5 py-16 text-neutral-950 md:px-8/px-5 py-10 text-neutral-950 md:px-8 md:py-16/g' components/site/CoursesPreview.tsx
perl -pi -e 's/px-5 py-16 text-neutral-950 md:px-8/px-5 py-10 text-neutral-950 md:px-8 md:py-16/g' components/site/SubjectAreas.tsx

# Learning Hub
perl -pi -e 's/px-5 py-16 md:px-8 md:py-20/px-5 py-10 md:px-8 md:py-20/g' app/learning-hub/page.tsx
perl -pi -e 's/text-5xl font-medium leading-\[1\.05\] tracking-\[-0\.03em\] md:text-7xl/text-3xl font-medium leading-[1.08] tracking-[-0.035em] sm:text-4xl md:text-7xl/g' app/learning-hub/page.tsx
perl -pi -e 's/px-5 py-16 md:px-8/px-5 py-10 md:px-8 md:py-16/g' app/learning-hub/page.tsx

# Resources
perl -pi -e 's/px-5 py-16 md:px-8/px-5 py-10 md:px-8 md:py-16/g' app/resources/page.tsx
perl -pi -e 's/text-5xl font-medium leading-tight tracking-\[-0\.035em\] md:text-7xl/text-3xl font-medium leading-[1.08] tracking-[-0.035em] sm:text-4xl md:text-7xl/g' app/resources/page.tsx

# Resource detail page
perl -pi -e 's/px-5 py-16 md:px-8/px-5 py-10 md:px-8 md:py-16/g' app/resources/[slug]/page.tsx
perl -pi -e 's/text-5xl font-medium leading-tight tracking-\[-0\.03em\] md:text-6xl/text-3xl font-medium leading-[1.08] tracking-[-0.03em] sm:text-4xl md:text-6xl/g' app/resources/[slug]/page.tsx

# Courses page
perl -pi -e 's/px-5 py-16 md:px-8/px-5 py-10 md:px-8 md:py-16/g' app/courses/page.tsx
perl -pi -e 's/text-5xl font-medium leading-\[1\.05\] tracking-\[-0\.03em\] md:text-7xl/text-3xl font-medium leading-[1.08] tracking-[-0.035em] sm:text-4xl md:text-7xl/g' app/courses/page.tsx

# Machine learning course page
perl -pi -e 's/bg-slate-950 px-6 py-24 text-white md:py-32/bg-slate-950 px-5 py-12 text-white md:px-6 md:py-32/g' app/courses/machine-learning-biostatistics/page.tsx
perl -pi -e 's/text-5xl font-bold tracking-tight md:text-7xl/text-3xl font-bold tracking-tight sm:text-4xl md:text-7xl/g' app/courses/machine-learning-biostatistics/page.tsx
perl -pi -e 's/px-6 py-20/px-5 py-10 md:px-6 md:py-20/g' app/courses/machine-learning-biostatistics/page.tsx

# Pathway pages
for file in app/pathways/*/page.tsx; do
  perl -pi -e 's/bg-slate-950 px-6 py-24 text-white md:py-32/bg-slate-950 px-5 py-12 text-white md:px-6 md:py-32/g' "$file"
  perl -pi -e 's/text-5xl font-bold tracking-tight md:text-7xl/text-3xl font-bold tracking-tight sm:text-4xl md:text-7xl/g' "$file"
  perl -pi -e 's/px-6 py-20/px-5 py-10 md:px-6 md:py-20/g' "$file"
done

# Statistics Foundation main page
perl -pi -e 's/text-4xl font-semibold tracking-\[-0\.03em\] md:text-6xl/text-3xl font-semibold tracking-[-0.03em] sm:text-4xl md:text-6xl/g' app/courses/statistics-foundation/page.tsx

# Module homepage headings
find app/courses/statistics-foundation/modules -name "page.tsx" -maxdepth 3 -type f | while read file; do
  perl -pi -e 's/text-4xl font-black tracking-tight md:text-6xl/text-3xl font-black tracking-tight sm:text-4xl md:text-6xl/g' "$file"
  perl -pi -e 's/text-4xl font-bold tracking-tight md:text-6xl/text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl/g' "$file"
  perl -pi -e 's/text-4xl font-black tracking-\[-0\.055em\] md:text-6xl/text-3xl font-black tracking-[-0.045em] sm:text-4xl md:text-6xl/g' "$file"
done

# Lesson page headings and large numbers
find app/courses/statistics-foundation/modules -path "*/lessons/*/page.tsx" -type f | while read file; do
  perl -pi -e 's/text-4xl font-black tracking-tight md:text-6xl/text-3xl font-black tracking-tight sm:text-4xl md:text-6xl/g' "$file"
  perl -pi -e 's/text-4xl font-black tracking-\[-0\.04em\] md:text-6xl/text-3xl font-black tracking-[-0.035em] sm:text-4xl md:text-6xl/g' "$file"
  perl -pi -e 's/text-6xl font-black/text-4xl font-black md:text-6xl/g' "$file"
  perl -pi -e 's/text-6xl font-black text-slate-950/text-4xl font-black text-slate-950 md:text-6xl/g' "$file"
done

# Lesson component folder
find components/statistics-foundation -name "*.tsx" -type f | while read file; do
  perl -pi -e 's/text-4xl font-black tracking-\[-0\.06em\] md:text-6xl/text-3xl font-black tracking-[-0.045em] sm:text-4xl md:text-6xl/g' "$file"
done

echo "Mobile optimisation replacements complete."
