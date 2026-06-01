import CourseCard from "@/components/course/CourseCard";
import SectionHeading from "@/components/sections/SectionHeading";

const featuredCourses = [
  {
    title: "Statistics Foundation",
    description:
      "A structured foundation course for university students covering probability, random variables, estimation, hypothesis testing and regression.",
    href: "/courses/statistics-foundation",
    subject: "Statistics",
    level: "Beginner to Intermediate",
    duration: "July 2026 launch",
    status: "Free" as const,
  },
  {
    title: "Machine Learning in Biostatistics",
    description:
      "Learn prediction, validation, clinical interpretation, overfitting, leakage, calibration and model evaluation in medical research.",
    href: "/courses/machine-learning-biostatistics",
    subject: "Biostatistics",
    level: "Intermediate",
    duration: "July 2026 launch",
    status: "Premium" as const,
  },
  {
    title: "R and Python for Academic Data Analysis",
    description:
      "A practical pathway for students who want to analyse data, create reports and understand statistical programming workflows.",
    href: "/courses/r-python-data-analysis",
    subject: "Programming",
    level: "Beginner",
    duration: "Coming soon",
    status: "Coming Soon" as const,
  },
];

export default function HomePage() {
  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="relative overflow-hidden bg-slate-950 px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
            My Academic Tutor
          </p>

          <h1 className="max-w-5xl text-5xl font-bold tracking-tight md:text-7xl">
            Master Statistics, Biostatistics and Data Science through interactive,
            research-focused learning.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
            Premium tutoring, structured courses, visual explanations and academic support
            for students working with statistics, programming, biostatistics,
            bioinformatics and research methods.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/learning-hub"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
            >
              Explore Learning Hub
            </a>

            <a
              href="/contact"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Request Academic Support
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Featured courses"
            title="Start with structured, academic learning pathways."
            description="Each course is designed to combine clear theory, worked examples, visual explanations and applied interpretation."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featuredCourses.map((course) => (
              <CourseCard key={course.title} {...course} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}