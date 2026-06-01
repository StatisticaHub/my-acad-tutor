import CourseCard from "@/components/course/CourseCard";
import SectionHeading from "@/components/sections/SectionHeading";
import Badge from "@/components/ui/Badge";

const launchCourses = [
  {
    title: "Statistics Foundation",
    description:
      "A structured foundation course for university students covering probability, random variables, estimation, hypothesis testing, confidence intervals and regression.",
    href: "/courses/statistics-foundation",
    subject: "Statistics",
    level: "Beginner to Intermediate",
    duration: "July 2026 launch",
    status: "Free" as const,
  },
  {
    title: "Machine Learning in Biostatistics",
    description:
      "A medical machine learning course covering prediction, inference, validation, overfitting, data leakage, calibration and clinical interpretation.",
    href: "/courses/machine-learning-biostatistics",
    subject: "Biostatistics",
    level: "Intermediate",
    duration: "July 2026 launch",
    status: "Premium" as const,
  },
];

const allCourses = [
  {
    title: "R and Python for Academic Data Analysis",
    description:
      "Learn practical data analysis using R and Python, including data cleaning, visualisation, statistical workflows and reproducible reporting.",
    href: "/courses/r-python-data-analysis",
    subject: "Programming",
    level: "Beginner",
    duration: "Coming soon",
    status: "Coming Soon" as const,
  },
  {
    title: "Biostatistics for Health Research",
    description:
      "Learn statistical methods used in epidemiology, clinical studies, public health and health data science.",
    href: "/courses/biostatistics-health-research",
    subject: "Biostatistics",
    level: "Intermediate",
    duration: "Coming soon",
    status: "Coming Soon" as const,
  },
  {
    title: "Mathematics for Data Science",
    description:
      "Build the mathematical confidence needed for statistics, machine learning and applied data science.",
    href: "/courses/mathematics-for-data-science",
    subject: "Mathematics",
    level: "Beginner to Intermediate",
    duration: "Coming soon",
    status: "Coming Soon" as const,
  },
  {
    title: "Bioinformatics Foundations",
    description:
      "A beginner-friendly pathway into omics data, RNA-seq, single-cell concepts and reproducible bioinformatics workflows.",
    href: "/courses/bioinformatics-foundations",
    subject: "Bioinformatics",
    level: "Beginner",
    duration: "Coming soon",
    status: "Coming Soon" as const,
  },
  {
    title: "Statistical Inference",
    description:
      "Understand estimators, sampling distributions, confidence intervals, hypothesis tests and statistical reasoning.",
    href: "/courses/statistical-inference",
    subject: "Statistics",
    level: "Intermediate",
    duration: "Coming soon",
    status: "Coming Soon" as const,
  },
  {
    title: "Regression Modelling",
    description:
      "Learn simple and multiple regression, assumptions, diagnostics, interpretation and model communication.",
    href: "/courses/regression-modelling",
    subject: "Statistics",
    level: "Intermediate",
    duration: "Coming soon",
    status: "Coming Soon" as const,
  },
];

const categories = [
  "Statistics",
  "Mathematics",
  "Biostatistics",
  "Programming",
  "Data Science",
  "Bioinformatics",
  "Research Support",
];

export default function CoursesPage() {
  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="bg-slate-950 px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-7xl">
          <Badge variant="dark">Course Catalogue</Badge>

          <h1 className="mt-6 max-w-5xl text-5xl font-bold tracking-tight md:text-7xl">
            Structured courses for serious quantitative learning.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
            Explore courses in Statistics, Mathematics, Biostatistics, Programming,
            Data Science, Bioinformatics and Research Support. Start with free
            foundation lessons and move into premium applied pathways.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/learning-hub"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Explore Learning Hub
            </a>

            <a
              href="/pricing"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              View access options
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
            >
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="July 2026 launch courses"
            title="Start with the flagship learning pathways."
            description="These are the first two courses that will define the launch version of My Academic Tutor."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {launchCourses.map((course) => (
              <CourseCard key={course.title} {...course} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Full catalogue"
            title="More courses are being prepared."
            description="The platform will expand across statistics, health data science, programming, bioinformatics and research support."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allCourses.map((course) => (
              <CourseCard key={course.title} {...course} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Not sure where to start?"
              title="Choose a learning pathway instead of a single course."
              description="Pathways help students follow a structured route through a field such as Statistics, Biostatistics, Programming or Bioinformatics."
            />
          </div>

          <div className="rounded-[2rem] bg-slate-950 p-8 text-white">
            <h3 className="text-2xl font-bold">
              Field-based learning pathways
            </h3>

            <p className="mt-4 text-sm leading-6 text-slate-300">
              Each pathway groups related courses, topics and resources into a sensible
              learning sequence so students can progress without confusion.
            </p>

            <div className="mt-8">
              <a
                href="/learning-hub"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100"
              >
                View pathways
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}