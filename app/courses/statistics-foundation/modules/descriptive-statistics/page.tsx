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

const lessons = [
  {
    "number": "2.1",
    "title": "Measures of centre",
    "description": "Learn how the mean, median and mode describe a typical value, and when each measure is appropriate.",
    "href": "/courses/statistics-foundation/modules/descriptive-statistics/lessons/measures-of-centre"
  },
  {
    "number": "2.2",
    "title": "Measures of spread",
    "description": "Understand range, interquartile range, variance and standard deviation as ways of describing variability.",
    "href": "/courses/statistics-foundation/modules/descriptive-statistics/lessons/measures-of-spread"
  },
  {
    "number": "2.3",
    "title": "Quartiles, percentiles and five-number summaries",
    "description": "Study how ordered data can be divided into positions, quartiles, percentiles and boxplot summaries.",
    "href": "/courses/statistics-foundation/modules/descriptive-statistics/lessons/quartiles-percentiles-five-number-summaries"
  },
  {
    "number": "2.4",
    "title": "Shape, skewness and outliers",
    "description": "Learn how distributions can be symmetric, skewed, heavy-tailed or affected by unusual observations.",
    "href": "/courses/statistics-foundation/modules/descriptive-statistics/lessons/shape-skewness-and-outliers"
  },
  {
    "number": "2.5",
    "title": "Comparing groups descriptively",
    "description": "Bring centre, spread, shape and graphical summaries together to compare groups carefully.",
    "href": "/courses/statistics-foundation/modules/descriptive-statistics/lessons/comparing-groups-descriptively"
  }
] as const;

const moduleStats = [
  [
    "5",
    "Lessons"
  ],
  [
    "0",
    "Coding"
  ],
  [
    "Foundation",
    "Level"
  ],
  [
    "Summary",
    "Focus"
  ]
] as const;

const moduleFocus = [
  {
    "title": "Centre",
    "body": "Learn how typical values can be summarised using the mean, median and mode."
  },
  {
    "title": "Spread",
    "body": "Understand why variability matters and how range, IQR, variance and standard deviation describe it."
  },
  {
    "title": "Shape",
    "body": "Connect numerical summaries to distribution shape, skewness, outliers and group comparison."
  }
] as const;

const outcomes = [
  "Choose mean, median or mode appropriately",
  "Explain variability using spread",
  "Use quartiles and percentiles",
  "Recognise skewness and outliers",
  "Compare groups descriptively",
  "Avoid over-interpreting summaries"
] as const;

export default function DescriptiveStatisticsModulePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-4 py-8 text-[#111111] sm:px-5 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses/statistics-foundation")}
          className="text-sm font-semibold text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to Statistics Foundation
        </a>

        <section className="mt-6 overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-sm md:mt-8 md:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 sm:p-6 md:p-10 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm md:tracking-[0.22em]">
                Module 2 · Statistics Foundation
              </p>

              <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-[1.03] tracking-[-0.055em] md:mt-5 md:text-6xl">
                Descriptive statistics.
              </h1>

              <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-700 md:mt-6 md:text-lg md:leading-9">
                Learn how to summarise data using centre, spread, position, shape and group comparison. The focus is not only calculation, but interpretation: what does the dataset actually show?
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={withBasePath(lessons[0].href)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8b1116] sm:w-auto md:py-4"
                >
                  Start Lesson {lessons[0].number} →
                </a>

                <a
                  href={withBasePath("/courses/statistics-foundation/modules/probability-foundations")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-semibold text-[#111111] transition hover:bg-[#f7f4ee] sm:w-auto md:py-4"
                >
                  Next module
                </a>
              </div>
            </div>

            <aside className="border-t border-neutral-200 bg-[#fdfbf7] p-5 md:p-8 lg:border-l lg:border-t-0">
              <div className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2rem] md:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b1116] md:text-sm">
                  Module aim
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                  Describe data clearly before probability and inference.
                </h2>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  Descriptive statistics gives students the language needed to explain what a dataset looks like before moving into uncertainty, probability, inference and regression.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {moduleStats.map(([value, label]) => (
                    <div
                      key={label}
                      className="rounded-[1.25rem] border border-neutral-200 bg-[#f7f4ee] p-4"
                    >
                      <p className="text-2xl font-semibold tracking-[-0.05em]">
                        {value}
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:mt-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
              What this module builds
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
              The language of data summaries.
            </h2>

            <div className="mt-6 grid gap-3">
              {moduleFocus.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] p-4"
                >
                  <h3 className="text-sm font-semibold text-neutral-950">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-neutral-700">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-neutral-200 bg-[#111111] p-5 text-white shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55 md:text-sm">
              By the end
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
              You should be able to summarise data responsibly.
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {outcomes.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white/85"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
                Module lessons
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
                Study the lessons in order.
              </h2>
            </div>

            <p className="text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              Start with centre, then add variability, position, shape and group comparison. Each lesson makes descriptive interpretation more precise.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:mt-8">
            {lessons.map((lesson) => (
              <a
                key={lesson.number}
                href={withBasePath(lesson.href)}
                className="group rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md md:rounded-[2rem] md:p-6"
              >
                <div className="grid gap-4 md:grid-cols-[0.18fr_1fr_auto] md:items-center">
                  <p className="text-3xl font-semibold tracking-[-0.055em] text-[#8b1116]">
                    {lesson.number}
                  </p>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                      Lesson {lesson.number}
                    </p>

                    <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.04em]">
                      {lesson.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-neutral-700">
                      {lesson.description}
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-[#8b1116]">
                    Open →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-neutral-200 bg-[#8b1116] p-5 text-white shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 md:text-sm">
                Recommended next step
              </p>

              <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
                Move from description to probability.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 md:text-base md:leading-8">
                After describing data, the next step is understanding uncertainty. Probability provides the mathematical language needed for inference.
              </p>
            </div>

            <a
              href={withBasePath("/courses/statistics-foundation/modules/probability-foundations")}
              className="inline-flex w-full justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#111111] transition hover:bg-[#f7f4ee] sm:w-auto md:py-4"
            >
              Open Module 3 →
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}
