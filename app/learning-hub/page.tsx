const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}`;
}

const pathways = [
  {
    number: "01",
    title: "Statistics Foundation",
    tag: "Available",
    level: "Beginner to intermediate",
    href: "/courses/statistics-foundation",
    description:
      "A theory-first, zero-coding pathway that builds statistical thinking from the ground up: data, descriptive statistics, probability, inference and regression.",
    details: [
      "5 modules and 26 structured lessons",
      "Lectures, detailed notes, interactive labs, worked examples and quizzes",
      "Designed for students preparing for biostatistics, data science, epidemiology and research methods",
    ],
    outcomes: [
      "Understand statistical notation and reasoning",
      "Build confidence with probability and inference",
      "Interpret regression models carefully",
    ],
    cta: "Open pathway",
  },
  {
    number: "02",
    title: "Machine Learning in Biostatistics",
    tag: "Launching July 2026",
    level: "Intermediate",
    href: "/courses/machine-learning-biostatistics",
    description:
      "A structured medical machine learning pathway focused on prediction, validation, overfitting, leakage, calibration and clinical interpretation.",
    details: [
      "Medical and health data examples",
      "Prediction versus inference",
      "Model evaluation and responsible reporting",
    ],
    outcomes: [
      "Understand prediction modelling in health data",
      "Recognise overfitting and leakage",
      "Interpret performance metrics clinically",
    ],
    cta: "View pathway",
  },
  {
    number: "03",
    title: "Research Methods & Data Analysis",
    tag: "Planned",
    level: "Project support",
    href: "/courses",
    description:
      "A future applied pathway for students planning dissertations, research reports and quantitative projects.",
    details: [
      "Study design and variable planning",
      "Analysis strategy and method choice",
      "Interpretation, limitations and reporting",
    ],
    outcomes: [
      "Plan analysis around a research question",
      "Choose appropriate methods",
      "Report findings responsibly",
    ],
    cta: "Explore courses",
  },
];

const hubSteps = [
  {
    title: "Choose a pathway",
    description:
      "Start with the course that matches your current level and academic goal.",
  },
  {
    title: "Follow the sequence",
    description:
      "Study lessons in order so concepts, notation and interpretation build naturally.",
  },
  {
    title: "Use active practice",
    description:
      "Work through visual labs, examples and quizzes to check understanding.",
  },
  {
    title: "Return to theory",
    description:
      "Use detailed notes when formulas, assumptions or derivations feel unclear.",
  },
];

const learningFormats = [
  {
    title: "Structured courses",
    description:
      "Complete pathways with ordered lessons, theory, examples, labs and quizzes.",
  },
  {
    title: "Interactive learning",
    description:
      "Visual labs help students see how statistical ideas behave, not just memorise formulas.",
  },
  {
    title: "Live support route",
    description:
      "Students can enquire separately for subject-wise live sessions when they need guidance.",
  },
];

export default function LearningHubPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-neutral-950">
      <section className="relative overflow-hidden border-b border-neutral-200 bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#f6dede,transparent_34%),radial-gradient(circle_at_bottom_left,#fff3d8,transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl">
          <a
            href={withBasePath("/")}
            className="text-sm font-semibold text-[#8b1116] hover:text-neutral-950"
          >
            ← Back to homepage
          </a>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8b1116]">
                Learning Hub
              </p>

              <h1 className="font-serif-academic mt-5 max-w-5xl text-5xl font-medium leading-[1.05] tracking-[-0.03em] md:text-7xl">
                Learn quantitative subjects through structured pathways.
              </h1>

              <p className="mt-6 max-w-4xl text-lg leading-9 text-neutral-700">
                The Learning Hub brings together guided courses in statistics,
                biostatistics, data science, research methods and related
                quantitative subjects.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-600">
                Each pathway is designed to move from concepts to notation,
                theory, interpretation and practice, so students understand not
                only what to do, but why the method works and when it should be
                used.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#pathways"
                  className="rounded-md bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  View pathways
                </a>

                <a
                  href={withBasePath("/courses")}
                  className="rounded-md border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  Browse courses
                </a>

                <a
                  href={withBasePath("/contact")}
                  className="rounded-md border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  Enquire for live sessions
                </a>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-neutral-200 bg-white/90 p-6 shadow-sm backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-neutral-500">
                How to use the hub
              </p>

              <div className="mt-5 grid gap-3">
                {hubSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="rounded-xl border border-neutral-200 bg-[#f8f6f1] p-4"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b1116]">
                      Step {index + 1}
                    </p>

                    <h2 className="mt-2 text-sm font-semibold text-neutral-950">
                      {step.title}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200 bg-neutral-950 px-5 py-10 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {learningFormats.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.25rem] border border-white/10 bg-white/5 p-5"
            >
              <h2 className="text-lg font-semibold">{item.title}</h2>

              <p className="mt-2 text-sm leading-7 text-white/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="pathways" className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
              Guided pathways
            </p>

            <h2 className="font-serif-academic mt-3 text-4xl font-medium leading-tight tracking-[-0.025em] md:text-5xl">
              Start with the pathway that matches your current goal.
            </h2>
          </div>

          <p className="max-w-3xl text-base leading-8 text-neutral-600">
            The hub is organised around learning routes. Some students need
            foundations, some need applied modelling, and others need support
            planning research or analysis.
          </p>
        </div>

        <div className="grid gap-6">
          {pathways.map((pathway) => (
            <a
              key={pathway.title}
              href={withBasePath(pathway.href)}
              className="group rounded-[1.5rem] border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-8"
            >
              <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-[#8b1116] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white">
                      {pathway.number}
                    </span>

                    <span className="rounded-full bg-[#f7f4ee] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#8b1116]">
                      {pathway.tag}
                    </span>
                  </div>

                  <h3 className="font-serif-academic mt-5 text-4xl font-medium leading-tight tracking-[-0.025em] group-hover:text-[#8b1116]">
                    {pathway.title}
                  </h3>

                  <p className="mt-4 text-sm font-semibold text-neutral-500">
                    {pathway.level}
                  </p>
                </div>

                <div>
                  <p className="text-base leading-8 text-neutral-700">
                    {pathway.description}
                  </p>

                  <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-xl border border-neutral-200 bg-[#f8f6f1] p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">
                        Includes
                      </p>

                      <ul className="mt-4 space-y-3 text-sm leading-6 text-neutral-700">
                        {pathway.details.map((detail) => (
                          <li key={detail} className="flex gap-3">
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#8b1116]" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-neutral-200 bg-white p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">
                        You will learn to
                      </p>

                      <ul className="mt-4 space-y-3 text-sm leading-6 text-neutral-700">
                        {pathway.outcomes.map((outcome) => (
                          <li key={outcome} className="flex gap-3">
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-neutral-950" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <p className="mt-7 text-sm font-semibold text-[#8b1116]">
                    {pathway.cta} →
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-white px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[1.5rem] border border-neutral-200 bg-[#f8f6f1] p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
                  Need live guidance?
                </p>

                <h2 className="font-serif-academic mt-4 max-w-3xl text-4xl font-medium leading-tight tracking-[-0.025em] md:text-5xl">
                  Enquire for subject-wise live sessions.
                </h2>

                <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-600">
                  Alongside structured pathways, students can enquire about live
                  support in statistics, biostatistics, programming, data
                  science, bioinformatics and dissertation data analysis.
                </p>
              </div>

              <div className="grid gap-3">
                <a
                  href={withBasePath("/courses#live-sessions")}
                  className="rounded-md bg-neutral-950 px-6 py-4 text-center text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  View live session subjects
                </a>

                <a
                  href={withBasePath("/contact")}
                  className="rounded-md border border-neutral-300 bg-white px-6 py-4 text-center text-sm font-semibold text-neutral-950 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  Submit an enquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}