const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}`;
}

const lessons = [
  {
    number: "2.1",
    title: "Measures of centre",
    description:
      "Study mean, median and mode as different ways of describing a typical value, including outlier sensitivity and skewed data interpretation.",
    href: "/courses/statistics-foundation/modules/descriptive-statistics/lessons/measures-of-centre",
    status: "Complete",
  },
  {
    number: "2.2",
    title: "Measures of spread",
    description:
      "Understand range, quartiles, IQR, variance, standard deviation and coefficient of variation as tools for describing variability.",
    href: "/courses/statistics-foundation/modules/descriptive-statistics/lessons/measures-of-spread",
    status: "Complete",
  },
  {
    number: "2.3",
    title: "Shape, skewness and outliers",
    description:
      "Learn how distribution shape, symmetry, skewness, modality and outliers affect how we summarise and interpret data.",
    href: "/courses/statistics-foundation/modules/descriptive-statistics/lessons/shape-skewness-outliers",
    status: "Complete",
  },
  {
    number: "2.4",
    title: "Standardisation and z-scores",
    description:
      "Convert raw values into standard deviation units to compare observations across different distributions, scales and contexts.",
    href: "/courses/statistics-foundation/modules/descriptive-statistics/lessons/z-scores",
    status: "Complete",
  },
  {
    number: "2.5",
    title: "Correlation and association",
    description:
      "Move from one-variable description to two-variable association using scatterplots, covariance, Pearson correlation and causal caution.",
    href: "/courses/statistics-foundation/modules/descriptive-statistics/lessons/correlation-association",
    status: "Complete",
  },
];

const moduleStats = [
  {
    label: "Lessons",
    value: "5",
  },
  {
    label: "Interactive labs",
    value: "5",
  },
  {
    label: "Coding required",
    value: "0",
  },
  {
    label: "Focus",
    value: "Theory",
  },
];

const learningFlow = [
  {
    title: "Summarise location",
    body: "Start by learning how mean, median and mode define the centre of a dataset in different ways.",
  },
  {
    title: "Describe variation",
    body: "Then study how far values spread from the centre using range, IQR, variance and standard deviation.",
  },
  {
    title: "Read the distribution",
    body: "Move beyond numbers by interpreting shape, skewness, modality and outliers using graphs and rules.",
  },
  {
    title: "Compare positions",
    body: "Use z-scores to compare raw values fairly across distributions with different means and spreads.",
  },
  {
    title: "Describe relationships",
    body: "Finish by studying how two numerical variables move together through scatterplots and correlation.",
  },
];

export default function DescriptiveStatisticsModulePage() {
  return (
    <main className="min-h-screen bg-[#f2efe7] text-neutral-950">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">
        <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <a
            href={withBasePath("/courses/statistics-foundation")}
            className="inline-flex items-center gap-2 text-sm font-black text-blue-700 hover:text-blue-800"
          >
            ← Back to Statistics Foundation
          </a>

          <nav className="flex flex-wrap gap-2">
            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/introduction-to-statistical-thinking"
              )}
              className="rounded-full border border-[#ded9cf] bg-white/80 px-4 py-2 text-sm font-bold text-neutral-700 hover:bg-white"
            >
              Module 1
            </a>
            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/probability-foundations"
              )}
              className="rounded-full border border-[#ded9cf] bg-white/80 px-4 py-2 text-sm font-bold text-neutral-700 hover:bg-white"
            >
              Module 3 →
            </a>
          </nav>
        </header>

        <section className="overflow-hidden rounded-[2.2rem] border border-[#ded9cf] bg-white p-7 shadow-sm md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_0.75fr] lg:items-end">
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-blue-800">
                  Module 2
                </span>
                <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-emerald-800">
                  Descriptive Statistics
                </span>
                <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-amber-800">
                  Zero coding
                </span>
              </div>

              <h1 className="max-w-5xl text-3xl font-black tracking-[-0.045em] sm:text-4xl md:text-6xl">
                Descriptive Statistics
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-600">
                This module teaches students how to describe data carefully
                before moving into probability and inference. It begins with
                centre and spread, then moves into distribution shape, outliers,
                standardisation and correlation.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-600">
                The aim is not just to calculate statistics. The aim is to
                decide which summaries are meaningful, how they can mislead,
                and how graphical and numerical summaries work together.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={withBasePath(
                    "/courses/statistics-foundation/modules/descriptive-statistics/lessons/measures-of-centre"
                  )}
                  className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-black text-white transition hover:bg-neutral-800"
                >
                  Start Lesson 2.1
                </a>
                <a
                  href="#module-lessons"
                  className="rounded-full border border-[#ded9cf] bg-white px-6 py-3 text-sm font-black text-neutral-950 transition hover:bg-[#f8f6f1]"
                >
                  View lessons
                </a>
              </div>
            </div>

            <aside className="rounded-[1.7rem] border border-[#ded9cf] bg-[#fbfaf6] p-5">
              <h2 className="text-lg font-black tracking-tight">
                Module snapshot
              </h2>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {moduleStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-[#ded9cf] bg-white p-4"
                  >
                    <strong className="block text-2xl font-black tracking-tight">
                      {item.value}
                    </strong>
                    <span className="mt-1 block text-xs font-bold text-neutral-500">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-[#ded9cf] bg-white p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">
                  Skills developed
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-600">
                  <li>Choosing suitable descriptive summaries.</li>
                  <li>Reading graphs and distribution shape.</li>
                  <li>Detecting and interpreting outliers responsibly.</li>
                  <li>Comparing values using standard units.</li>
                  <li>
                    Understanding correlation without overclaiming causation.
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <section id="module-lessons" className="mt-12">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
                Module lessons
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
                Five lessons from summaries to association
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-neutral-600">
              Each lesson contains a character-based lecture, detailed notes,
              an interactive lab, worked examples and a quiz.
            </p>
          </div>

          <div className="grid gap-4">
            {lessons.map((lesson) => (
              <a
                key={lesson.number}
                href={withBasePath(lesson.href)}
                className="group rounded-[1.5rem] border border-[#ded9cf] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="flex gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-lg font-black text-blue-800">
                      {lesson.number}
                    </div>

                    <div>
                      <h3 className="text-2xl font-black tracking-tight">
                        {lesson.title}
                      </h3>
                      <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600">
                        {lesson.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <span className="rounded-full bg-[#f8f6f1] px-3 py-2 text-xs font-black text-neutral-600">
                          Lecture
                        </span>
                        <span className="rounded-full bg-[#f8f6f1] px-3 py-2 text-xs font-black text-neutral-600">
                          Detailed notes
                        </span>
                        <span className="rounded-full bg-[#f8f6f1] px-3 py-2 text-xs font-black text-neutral-600">
                          Interactive lab
                        </span>
                        <span className="rounded-full bg-[#f8f6f1] px-3 py-2 text-xs font-black text-neutral-600">
                          Quiz
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3 md:flex-col md:items-end">
                    <span className="rounded-full bg-emerald-100 px-3 py-2 text-xs font-black text-emerald-800">
                      {lesson.status}
                    </span>
                    <span className="text-sm font-black text-blue-700 opacity-100 transition group-hover:translate-x-1">
                      Open lesson →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
              Learning flow
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
              How Module 2 becomes more advanced
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            {learningFlow.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[1.35rem] border border-[#ded9cf] bg-white p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-950 text-sm font-black text-white">
                  {index + 1}
                </div>

                <h3 className="mt-5 text-lg font-black tracking-tight">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-neutral-600">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.5rem] border border-[#ded9cf] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black tracking-tight">
              What students should understand by the end
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-neutral-600">
              <li>
                Why mean, median and mode answer different “typical value”
                questions.
              </li>
              <li>
                Why spread is essential for understanding consistency and
                variability.
              </li>
              <li>How skewness and outliers affect centre and spread.</li>
              <li>
                How z-scores compare raw values using standard deviation units.
              </li>
              <li>
                How correlation summarises linear association but does not prove
                causation.
              </li>
            </ul>
          </div>

          <div className="rounded-[1.5rem] border border-[#ded9cf] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black tracking-tight">
              Preparation for Module 3
            </h2>
            <p className="mt-4 text-sm leading-7 text-neutral-600">
              Descriptive statistics prepares students for probability by
              making them comfortable with distributions, variability, unusual
              observations and standardised scales. These ideas will return when
              we study random events, probability rules, conditional probability
              and later statistical inference.
            </p>

            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/probability-foundations"
              )}
              className="mt-6 inline-flex rounded-full bg-neutral-950 px-5 py-3 text-sm font-black text-white"
            >
              Continue to Module 3 →
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}