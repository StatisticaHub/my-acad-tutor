import CourseCard from "@/components/course/CourseCard";
import FeatureCard from "@/components/sections/FeatureCard";
import SectionHeading from "@/components/sections/SectionHeading";
import Badge from "@/components/ui/Badge";

const subjects = [
  {
    title: "Statistics",
    description: "Probability, estimation, hypothesis testing, regression and interpretation.",
  },
  {
    title: "Biostatistics",
    description: "Clinical data, survival analysis, epidemiology and medical prediction.",
  },
  {
    title: "Programming",
    description: "R, Python, data cleaning, visualisation and reproducible workflows.",
  },
  {
    title: "Data Science",
    description: "Exploratory analysis, modelling, validation and applied machine learning.",
  },
  {
    title: "Mathematics",
    description: "Mathematical foundations for statistics, models and data science.",
  },
  {
    title: "Bioinformatics",
    description: "Omics workflows, RNA-seq, single-cell concepts and biological interpretation.",
  },
];

const courses = [
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
  {
    title: "Biostatistics for Health Research",
    description:
      "Learn how statistical methods are used in epidemiology, clinical studies, public health and medical research interpretation.",
    href: "/courses/biostatistics-health-research",
    subject: "Biostatistics",
    level: "Intermediate",
    duration: "Coming soon",
    status: "Coming Soon" as const,
  },
  {
    title: "Mathematics for Data Science",
    description:
      "Build confidence in algebra, calculus, probability and matrix ideas used in statistics and machine learning.",
    href: "/courses/mathematics-for-data-science",
    subject: "Mathematics",
    level: "Beginner",
    duration: "Coming soon",
    status: "Coming Soon" as const,
  },
  {
    title: "Bioinformatics Foundations",
    description:
      "A beginner-friendly pathway into biological data, omics analysis concepts and reproducible bioinformatics thinking.",
    href: "/courses/bioinformatics-foundations",
    subject: "Bioinformatics",
    level: "Beginner",
    duration: "Coming soon",
    status: "Coming Soon" as const,
  },
];

const pathways = [
  {
    title: "Foundation pathway",
    description:
      "Start here if you are new to statistics or need to rebuild your basics properly.",
  },
  {
    title: "Research pathway",
    description:
      "For students working on dissertations, health research, epidemiology or applied data analysis.",
  },
  {
    title: "Coding pathway",
    description:
      "For students learning R, Python, reproducible workflows and data analysis programming.",
  },
];

export default function LearningHubPage() {
  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="bg-slate-950 px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-7xl">
          <Badge variant="dark">Learning Hub</Badge>

          <h1 className="mt-6 max-w-5xl text-5xl font-bold tracking-tight md:text-7xl">
            Courses, guides and interactive learning for quantitative subjects.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
            Explore structured learning pathways in Statistics, Biostatistics,
            Programming, Data Science, Mathematics and Bioinformatics.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/courses"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500"
            >
              View all courses
            </a>

            <a
              href="/resources"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Explore free resources
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <div
                key={subject.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <h2 className="text-base font-bold text-slate-950">
                  {subject.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {subject.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Course catalogue"
            title="Choose your learning pathway."
            description="Start with free lessons, explore premium course previews and follow structured modules designed for academic learners."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.title} {...course} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Guided pathways"
            title="Learn in the right order."
            description="The Learning Hub is organised around student goals, not just a random list of topics."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pathways.map((pathway) => (
              <FeatureCard
                key={pathway.title}
                title={pathway.title}
                description={pathway.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Interactive preview"
              title="Visual learning is part of the platform."
              description="Interactive demos will help students understand distributions, regression, uncertainty, model performance and clinical prediction concepts."
            />

            <div className="mt-8 flex flex-wrap gap-3">
              <Badge variant="blue">Normal distribution</Badge>
              <Badge variant="green">Regression</Badge>
              <Badge variant="violet">Confidence intervals</Badge>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl">
            <div className="rounded-3xl bg-slate-950 p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                Coming in this sprint
              </p>

              <h3 className="mt-4 text-2xl font-bold">
                Interactive statistics demos
              </h3>

              <p className="mt-4 text-sm leading-6 text-slate-300">
                Students will move sliders, change assumptions and see statistical
                ideas update visually in real time.
              </p>

              <div className="mt-8 grid gap-3">
                <div className="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">
                  Mean and standard deviation sliders
                </div>
                <div className="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">
                  Regression line and noise controls
                </div>
                <div className="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">
                  Confidence interval simulation preview
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-blue-600 p-8 text-white md:p-12">
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
            Start with free lessons. Upgrade later for premium pathways.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50">
            The launch version will include free course previews, selected full lessons,
            premium course pathways and interactive learning demos.
          </p>

          <div className="mt-8">
            <a
              href="/pricing"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            >
              View learning access
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}