import type { Metadata } from "next";
import { resourceGuides } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Learning Hub",
  description:
    "A structured learning hub for statistics, mathematics, biostatistics, data science, bioinformatics and research methods.",
  alternates: {
    canonical: "https://www.myacademictutor.com/learning-hub/",
  },
};

const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return "/";
  if (
    href.startsWith("#") ||
    href.startsWith("http") ||
    href.startsWith("mailto:")
  ) {
    return href;
  }

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${basePath}${cleanHref}${hasFileExtension ? "" : "/"}`;
}

const startRoutes = [
  {
    title: "Foundation learner",
    body:
      "Start with Statistics Foundation if you want a clear route through statistical thinking, descriptive statistics, probability, inference and regression.",
    action: "Open Statistics Foundation",
    href: "/courses/statistics-foundation",
  },
  {
    title: "Applied learner",
    body:
      "Use resources and interactive demos if you are learning through examples, visual intuition, interpretation and applied problem-solving.",
    action: "Explore resources",
    href: "/resources",
  },
  {
    title: "Research / project learner",
    body:
      "Use research-method resources and enquiry review if you need help clarifying a question, method choice, interpretation or project plan.",
    action: "Submit enquiry",
    href: "/contact#support-form",
  },
];

const subjectPathways = [
  {
    title: "Statistics",
    body:
      "Statistical thinking, probability, inference, regression, uncertainty and interpretation.",
  },
  {
    title: "Mathematics",
    body:
      "Algebra, calculus, linear algebra, probability and quantitative reasoning foundations.",
  },
  {
    title: "Data Science",
    body:
      "Data preparation, exploratory analysis, modelling ideas, validation and responsible reporting.",
  },
  {
    title: "Biostatistics",
    body:
      "Health data, study design, clinical interpretation, medical statistics and evidence reasoning.",
  },
  {
    title: "Bioinformatics",
    body:
      "Biological data interpretation, omics ideas, computational biology concepts and analytical thinking.",
  },
  {
    title: "Research Methods",
    body:
      "Research questions, study design, analysis planning, reporting and critical interpretation.",
  },
];

const subjectLinks: Record<string, string> = {
  Statistics: "/learning-hub/statistics",
  Mathematics: "/learning-hub/mathematics",
  "Data Science": "/learning-hub/data-science",
  Biostatistics: "/learning-hub/biostatistics",
  Bioinformatics: "/learning-hub/bioinformatics",
  "Research Methods": "/learning-hub/research-methods",
};


const demoCards = [
  {
    title: "Normal distribution",
    body:
      "Explore centre, spread, tails and probability areas using a visual statistical model.",
    href: "/interactive-demos",
  },
  {
    title: "Confidence intervals",
    body:
      "See how uncertainty changes with sample size and confidence level.",
    href: "/interactive-demos",
  },
  {
    title: "Regression explorer",
    body:
      "Build intuition for association, fitted lines, residuals and prediction.",
    href: "/interactive-demos",
  },
];

const coursePathways = [
  {
    title: "Statistics Foundation",
    status: "Full course open now",
    body:
      "A zero-coding foundation pathway with 5 modules and 26 theoretical lessons.",
    href: "/courses/statistics-foundation",
  },
  {
    title: "Machine Learning in Biostatistics",
    status: "Preview open now",
    body:
      "Start with Lesson 1.1: What is machine learning in biostatistics? The lesson introduces machine learning as a biostatistical prediction workflow: define the clinical question, identify the outcome, choose predictors, separate training and test data, interpret output and avoid causal overclaiming. All remaining lessons open in July 2026.",
    href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics",
  },
  {
    title: "Other subject routes",
    status: "From September 2026",
    body:
      "Biostatistics, epidemiology, regression, survival analysis and other routes will release gradually.",
    href: "/courses",
  },
];

const featuredResources = resourceGuides.slice(0, 8);

export default function LearningHubPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EA] px-5 py-10 text-[#141210] md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/")}
          className="text-sm font-semibold text-[#741018] hover:text-[#4d080e]"
        >
          ← Back to homepage
        </a>

        <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
            Learning Hub
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-black leading-[1.03] tracking-[-0.055em] md:text-6xl">
                A structured learning hub for quantitative subjects.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">
                Start with a pathway, read focused resources, build intuition
                with visual demos and submit an enquiry when you need guided
                academic support.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#741018]">
                Hub model
              </p>
              <p className="mt-3 text-sm leading-7 text-[#525252]">
                Learn first through resources and courses. Explore ideas visually.
                Then use enquiry review if you need support matched to your subject,
                level and topic.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={withBasePath("/courses/statistics-foundation")}
              className="rounded-full bg-[#141210] px-5 py-3 text-sm font-black text-white transition hover:bg-[#741018]"
            >
              Start Statistics Foundation
            </a>
            <a
              href={withBasePath("/resources")}
              className="rounded-full border border-[#D8CDBB] px-5 py-3 text-sm font-black text-[#141210] transition hover:bg-[#F7F3EA]"
            >
              Browse resources
            </a>
            <a
              href={withBasePath("/interactive-demos")}
              className="rounded-full border border-[#D8CDBB] px-5 py-3 text-sm font-black text-[#141210] transition hover:bg-[#F7F3EA]"
            >
              Try demos
            </a>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
            Start here
          </p>

          <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-[-0.045em] md:text-4xl">
            Choose the route that matches your current need.
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {startRoutes.map((route) => (
              <article
                key={route.title}
                className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
              >
                <h3 className="text-xl font-black tracking-[-0.035em]">
                  {route.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#525252]">
                  {route.body}
                </p>
                <a
                  href={withBasePath(route.href)}
                  className="mt-5 inline-flex text-sm font-black text-[#741018] hover:text-[#4d080e]"
                >
                  {route.action} →
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
            Subject pathways
          </p>

          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-3xl text-3xl font-black tracking-[-0.045em] md:text-4xl">
              Find your subject area.
            </h2>

            <p className="max-w-xl text-sm leading-7 text-[#525252]">
              These pathways are starting points, not fixed limits. Students can
              move between subjects depending on their module, project or learning goal.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {subjectPathways.map((subject) => {
              const href = subjectLinks[subject.title];

              const content = (
                <>
                  <h3 className="text-xl font-black tracking-[-0.035em]">
                    {subject.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#525252]">
                    {subject.body}
                  </p>
                </>
              );

              return href ? (
                <a
                  key={subject.title}
                  href={withBasePath(href)}
                  className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5 transition hover:-translate-y-1 hover:bg-[#FFFCF6] hover:shadow-md"
                >
                  {content}
                  <p className="mt-5 text-sm font-black text-[#741018]">
                    Open pathway →
                  </p>
                </a>
              ) : (
                <article
                  key={subject.title}
                  className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
                >
                  {content}
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={withBasePath("/resources")}
              className="rounded-full bg-[#141210] px-5 py-3 text-sm font-black text-white transition hover:bg-[#741018]"
            >
              Browse all resources
            </a>
            <a
              href={withBasePath("/interactive-demos")}
              className="rounded-full border border-[#D8CDBB] px-5 py-3 text-sm font-black text-[#141210] transition hover:bg-[#F7F3EA]"
            >
              Try interactive demos
            </a>
            <a
              href={`${withBasePath("/contact")}#support-form`}
              className="rounded-full border border-[#D8CDBB] px-5 py-3 text-sm font-black text-[#141210] transition hover:bg-[#F7F3EA]"
            >
              Submit enquiry
            </a>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
            Featured resources
          </p>

          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-3xl text-3xl font-black tracking-[-0.045em] md:text-4xl">
              Read focused guides before asking for support.
            </h2>

            <a
              href={withBasePath("/resources")}
              className="text-sm font-black text-[#741018] hover:text-[#4d080e]"
            >
              View all resources →
            </a>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {featuredResources.map((guide) => (
              <a
                key={guide.slug}
                href={withBasePath(`/resources/${guide.slug}`)}
                className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5 transition hover:-translate-y-1 hover:bg-[#FFFCF6] hover:shadow-md"
              >
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#741018]">
                  {guide.area} · {guide.level}
                </p>
                <h3 className="mt-3 line-clamp-2 text-lg font-black tracking-[-0.035em]">
                  {guide.title}
                </h3>
                <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-[#741018]">
                  {guide.readingTime} · Updated {guide.updated}
                </p>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#525252]">
                  {guide.summary}
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-[#E4DED2] bg-[#141210] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/70">
              Interactive demos
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-4xl">
              Build intuition visually.
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/75">
              Use demos to explore statistical ideas before moving into formal
              definitions, formulas or applied examples.
            </p>

            <div className="mt-6 grid gap-3">
              {demoCards.map((demo) => (
                <a
                  key={demo.title}
                  href={withBasePath(demo.href)}
                  className="rounded-[1.25rem] border border-white/15 bg-white/5 p-4 transition hover:bg-white/10"
                >
                  <h3 className="text-base font-black">{demo.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    {demo.body}
                  </p>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
              Course pathways
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-4xl">
              Follow a structured course route.
            </h2>

            <div className="mt-6 grid gap-4">
              {coursePathways.map((course) => (
                <a
                  key={course.title}
                  href={withBasePath(course.href)}
                  className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5 transition hover:-translate-y-1 hover:bg-[#FFFCF6] hover:shadow-md"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="text-xl font-black tracking-[-0.035em]">
                      {course.title}
                    </h3>
                    <span className="w-fit rounded-full border border-[#D8CDBB] bg-[#FFFCF6] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#741018]">
                      {course.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[#525252]">
                    {course.body}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
            Need guidance?
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <h2 className="max-w-3xl text-3xl font-black tracking-[-0.045em] md:text-4xl">
                Submit enquiry → review → match.
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#525252]">
                If resources and demos are not enough, submit an enquiry. The request
                is reviewed for subject area, education level, topic and academic-integrity
                suitability before support is suggested.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`${withBasePath("/contact")}#support-form`}
                className="rounded-full bg-[#141210] px-5 py-3 text-sm font-black text-white transition hover:bg-[#741018]"
              >
                Submit enquiry
              </a>
              <a
                href={withBasePath("/academic-integrity")}
                className="rounded-full border border-[#D8CDBB] px-5 py-3 text-sm font-black text-[#141210] transition hover:bg-[#F7F3EA]"
              >
                Academic integrity
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
