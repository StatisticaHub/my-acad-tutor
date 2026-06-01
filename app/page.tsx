import CourseCard from "@/components/course/CourseCard";
import SectionHeading from "@/components/sections/SectionHeading";
import FeatureCard from "@/components/sections/FeatureCard";

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

const subjects = [
  "Statistics",
  "Mathematics",
  "Biostatistics",
  "Programming",
  "Data Science",
  "Bioinformatics",
];

const services = [
  {
    title: "1-to-1 Academic Tutoring",
    description:
      "Clear, structured support for students who need help understanding statistical concepts, mathematical methods and data analysis topics.",
  },
  {
    title: "Dissertation and Research Support",
    description:
      "Guidance with research questions, analysis planning, statistical interpretation, reproducible workflows and responsible academic development.",
  },
  {
    title: "Programming Support",
    description:
      "Support with R, Python, statistical coding logic, data cleaning, visualisation and academic analysis workflows.",
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

      <section className="border-b border-slate-200 bg-white px-6 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3">
          {subjects.map((subject) => (
            <span
              key={subject}
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
            >
              {subject}
            </span>
          ))}
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

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Academic support"
            title="Support designed for serious quantitative learning."
            description="The platform combines tutoring, guided learning, research support and applied data analysis help."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <FeatureCard
                key={service.title}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Interactive learning"
              title="Move beyond static notes."
              description="The Learning Hub is being designed around visual explanations, mathematical notation, quizzes, coding previews and interactive statistical demos."
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <FeatureCard
                title="LaTeX-based explanations"
                description="Equations and derivations are written clearly for students who need both intuition and mathematical structure."
              />

              <FeatureCard
                title="Visual statistics demos"
                description="Interactive components will help students explore distributions, regression, uncertainty and model behaviour."
              />
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl">
            <div className="rounded-3xl bg-slate-950 p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                Demo preview
              </p>

              <h3 className="mt-4 text-2xl font-bold">
                Normal Distribution Explorer
              </h3>

              <p className="mt-4 text-sm leading-6 text-slate-300">
                Move sliders for mean and standard deviation, watch the curve change,
                and learn how distribution shape affects interpretation.
              </p>

              <div className="mt-8 h-40 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex h-full items-end gap-2">
                  {[20, 45, 75, 100, 75, 45, 20].map((height, index) => (
                    <div
                      key={index}
                      className="w-full rounded-t-lg bg-blue-500/80"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-white/5 p-4 text-sm text-slate-300">
                Interactive statistical demos will be added during the sprint.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Learning Hub"
              title="A focused home for courses, resources and guided study."
              description="Students will be able to explore free lessons, premium course previews, subject pathways and research-focused learning resources."
            />
          </div>

          <div className="grid gap-4">
            {[
              "Free foundation lessons",
              "Premium course pathways",
              "Research and dissertation resources",
              "Programming and data analysis support",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-800"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-slate-950 p-8 text-white md:p-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
              Founder-led platform
            </p>

            <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-5xl">
              Built for responsible academic learning, not shortcuts.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              My Academic Tutor focuses on explanation, skill development, interpretation
              and structured learning. The platform is designed to help students understand
              quantitative subjects properly while maintaining academic integrity.
            </p>

            <div className="mt-8">
              <a
                href="/about"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100"
              >
                Learn about the platform
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}