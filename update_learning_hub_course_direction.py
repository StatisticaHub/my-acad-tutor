from pathlib import Path

path = Path("app/learning-hub/page.tsx")

if not path.exists():
    raise FileNotFoundError("app/learning-hub/page.tsx not found")

content = path.read_text()
backup = path.with_suffix(path.suffix + ".before-course-direction-update.bak")
backup.write_text(content)

replacements = {
    "Health data science": "Regression analysis",
    "Health Data Science": "Regression Analysis",
    "Research methods": "Survival analysis",
    "Research Methods": "Survival Analysis",
    "Request Academic Support": "Book Customised Tutoring",
    "Request academic support": "Book customised tutoring",
    "Ask for focused tutoring support": "Book customised tutoring support",
    "Start with foundations, then move into applied health data modelling when you are ready.":
      "Start with Statistics Foundation, then join the waitlist for regression, survival analysis, epidemiology and machine learning in biostatistics.",
    "A zero-coding route through probability, inference, regression and uncertainty.":
      "Releasing July 2026 in an interactive format with animated explanations, worked examples and quizzes.",
    "Clinical prediction, validation, calibration and responsible health-data modelling.":
      "Coming soon: prediction modelling, validation, calibration and responsible clinical machine learning.",
    "Open pathway →": "Join waitlist →",
}

for old, new in replacements.items():
    content = content.replace(old, new)

# Make pathway links open the waitlist instead of old course pages where possible.
content = content.replace('href={withBasePath("/courses/statistics-foundation")}', 'href="#course-waitlist"')
content = content.replace('href={withBasePath("/courses/machine-learning-biostatistics")}', 'href="#course-waitlist"')
content = content.replace('href="/courses/statistics-foundation/"', 'href="#course-waitlist"')
content = content.replace('href="/courses/machine-learning-biostatistics/"', 'href="#course-waitlist"')

path.write_text(content)

print("Updated Learning Hub wording and course direction.")
print(f"Backup saved as: {backup}")
