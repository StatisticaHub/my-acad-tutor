const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  return `${basePath}${href}/`;
}

const modules = [
  {
    number: "01",
    title: "Introduction to Statistical Thinking",
    href: "/courses/statistics-foundation/modules/introduction-to-statistical-thinking",
    description:
      "Build the language of data, variables, populations, samples, graphs and sampling methods.",
    topics: ["What statistics means", "Populations and samples", "Data types and graphs"],
    lessons: "5 lessons",
    status: "Available",
  },
  {
    number: "02",
    title: "Descriptive Statistics",
    href: "/courses/statistics-foundation/modules/descriptive-statistics",
    description:
      "Learn how to summarise datasets using centre, spread, quartiles, skewness, outliers and comparisons.",
    topics: ["Mean, median and mode", "Variance and standard deviation", "Boxplots and outliers"],
    lessons: "5 lessons",
    status: "Available",
  },
  {
    number: "03",
    title: "Probability Foundations",
    href: "/courses/statistics-foundation/modules/probability-foundations",
    description:
      "Develop probability reasoning, conditional probability, random variables, expectation and core distributions.",
    topics: ["Probability rules", "Conditional probability", "Random variables and distributions"],
    lessons: "5 lessons",
    status: "Available",
  },
  {
    number: "04",
    title: "Statistical Inference Foundations",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations",
    description:
      "Learn sampling distributions, standard errors, confidence intervals, hypothesis testing, p-values, power and study design.",
    topics: ["Sampling distributions", "Confidence intervals", "Hypothesis testing and power"],
    lessons: "5 lessons + 1 bonus",
    status: "Available",
  },
  {
    number: "05",
    title: "Regression Foundations",
    href: "/courses/statistics-foundation/modules/regression-foundations",
    description:
      "A future module connecting statistical inference to correlation, simple regression, model interpretation and applied statistical reasoning.",
    topics: ["Correlation", "Simple linear regression", "Interpreting model output"],
    lessons: "Coming next",
    status: "Planned",
  },
];

export default function StatisticsFoundationCoursePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="relative overflow-hidden bg-white px-6 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#dbeafe,transparent_35%),radial-gradient(circle_at_bottom_left,#ecfeff,transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3">
              {["Beginner-friendly", "Theoretical", "Zero coding"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-black text-blue-700"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            <h1 className="mt-8 max-w-5xl text-5xl font-black tracking-tight md:text-7xl">
              Statistics Foundation for University Students
            </h1>

            <p className="mt-5 text-base font-bold text-blue-700">
              Course developed by My Academic Tutor.
            </p>

            <p className="mt-6 max-w-4xl text-xl leading-9 text-slate-600">
              A theoretical and beginner-friendly course for students who want
              to build a strong base in statistics before studying
              biostatistics, epidemiology, data science, machine learning,
              research methods or quantitative analysis.
            </p>

            <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600">
              The course avoids coding and focuses on concepts, notation,
              mathematical reasoning, derivations, interpretation, interactive
              visual learning and exam-style thinking.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href={withBasePath(
                  "/courses/statistics-foundation/modules/introduction-to-statistical-thinking"
                )}
                className="rounded-full bg-slate-950 px-7 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                Start learning
              </a>

              <a
                href="#modules"
                className="rounded-full border border-slate-300 bg-white px-7 py-4 text-sm font-black text-slate-700 transition hover:-translate-y-1 hover:shadow-md"
              >
                View all modules
              </a>
            </div>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-4">
            {[
              ["5", "Core modules"],
              ["25 + 1", "Structured lessons"],
              ["0", "Coding required"],
              ["100%", "Concept focused"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur"
              >
                <p className="text-4xl font-black tracking-tight text-slate-950">
                  {value}
                </p>
                <p className="mt-2 text-sm font-bold text-slate-500">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              "Lecture-style explanations with recurring characters.",
              "Detailed notes with notation and derivations.",
              "Interactive labs, worked examples and quizzes.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm leading-7 text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="modules" className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
            Course structure
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
            Five modules from foundations to inference and modelling
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Start with the language of data, then move through descriptive
            statistics, probability, statistical inference and regression
            foundations.
          </p>
        </div>

        <div className="mt-10 grid gap-6">
          {modules.map((module) => (
            <a
              key={module.number}
              href={withBasePath(module.href)}
              className={`group rounded-[2rem] border p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                module.status === "Planned"
                  ? "border-slate-200 bg-slate-100"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="grid gap-6 md:grid-cols-[0.25fr_1fr_0.35fr] md:items-center">
                <div>
                  <p className="text-5xl font-black tracking-tight text-blue-700">
                    {module.number}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-3xl font-black tracking-tight">
                      {module.title}
                    </h3>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-black ${
                        module.status === "Planned"
                          ? "bg-slate-200 text-slate-600"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {module.status}
                    </span>
                  </div>

                  <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                    {module.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {module.topics.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:text-right">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-400">
                    {module.lessons}
                  </p>

                  <p className="mt-4 text-sm font-black text-blue-700 group-hover:text-blue-900">
                    {module.status === "Planned"
                      ? "Preview module →"
                      : "Open module →"}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
              Learning approach
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              Built for understanding, not memorisation
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Every lesson follows the same premium structure so students know
              exactly how to learn, practise and test themselves.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "Step 1",
                title: "Understand the idea",
                body: "Each lesson begins with a conversational lecture using Mr. R, Emma, Oliver, James and Sophia.",
              },
              {
                step: "Step 2",
                title: "Study the theory",
                body: "Detailed notes explain notation, definitions, assumptions, derivations and interpretation mistakes.",
              },
              {
                step: "Step 3",
                title: "Practise and check",
                body: "Interactive labs, worked examples and quizzes help students test understanding before moving ahead.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7"
              >
                <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
                  {item.step}
                </p>

                <h3 className="mt-4 text-2xl font-black tracking-tight">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-black tracking-tight">
            Designed for
          </h2>

          <ul className="mt-6 space-y-4 text-base leading-8 text-slate-600">
            <li>University students beginning statistics for the first time.</li>
            <li>
              Students preparing for biostatistics, epidemiology, data science
              or research methods.
            </li>
            <li>
              Learners who want mathematical notation explained clearly before
              moving to software.
            </li>
            <li>
              Students who prefer conceptual, theoretical and exam-style
              learning without coding.
            </li>
          </ul>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-black tracking-tight">
            What makes it different
          </h2>

          <ul className="mt-6 space-y-4 text-base leading-8 text-slate-600">
            <li>No programming distractions in the foundation stage.</li>
            <li>Clear movement from definitions to interpretation.</li>
            <li>Mathematical reasoning explained gradually.</li>
            <li>Consistent structure across every lesson.</li>
            <li>Useful preparation for applied quantitative subjects.</li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-[2.5rem] bg-slate-950 p-8 text-white md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-300">
                Ready to start?
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
                Begin with Module 1 and build the statistical language needed
                for later quantitative subjects.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-white/70">
                The course gradually moves from data and notation to probability,
                uncertainty, inference, interpretation and modelling foundations.
              </p>
            </div>

            <div className="lg:text-right">
              <a
                href={withBasePath(
                  "/courses/statistics-foundation/modules/introduction-to-statistical-thinking"
                )}
                className="inline-flex rounded-full bg-white px-7 py-4 text-sm font-black text-slate-950 transition hover:-translate-y-1 hover:shadow-lg"
              >
                Start Module 1
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-black tracking-tight">
              Statistics Foundation for University Students
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Course developed by My Academic Tutor.
            </p>
          </div>

          <p className="text-sm text-slate-500">
            © 2026 My Academic Tutor. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}