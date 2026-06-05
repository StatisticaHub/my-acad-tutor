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
    number: "2.1",
    title: "Measures of centre",
    duration: "90–100 min",
    status: "Expanded",
    theme: "Typical values",
    description:
      "Learn how the mean, median and mode represent different ideas of a typical value, and how outliers and skewness affect the best choice of centre.",
    href: "/courses/statistics-foundation/modules/descriptive-statistics/lessons/measures-of-centre",
    skills: ["Mean vs median", "Mode", "Robust centre"],
  },
  {
    number: "2.2",
    title: "Measures of spread",
    duration: "100–105 min",
    status: "Expanded",
    theme: "Variability",
    description:
      "Understand range, interquartile range, variance and standard deviation as ways of describing consistency, dispersion and uncertainty in data.",
    href: "/courses/statistics-foundation/modules/descriptive-statistics/lessons/measures-of-spread",
    skills: ["Range and IQR", "Variance", "Standard deviation"],
  },
  {
    number: "2.3",
    title: "Quartiles, percentiles and five-number summaries",
    duration: "100–105 min",
    status: "Expanded",
    theme: "Position",
    description:
      "Study how ordered data can be divided into positions, quartiles, percentiles, five-number summaries, boxplots and outlier fences.",
    href: "/courses/statistics-foundation/modules/descriptive-statistics/lessons/quartiles-percentiles",
    skills: ["Quartiles", "Percentiles", "Boxplots"],
  },
  {
    number: "2.4",
    title: "Shape, skewness and outliers",
    duration: "100–105 min",
    status: "Expanded",
    theme: "Distribution shape",
    description:
      "Learn how distributions can be symmetric, skewed, heavy-tailed, clustered or affected by unusual observations, and how this changes interpretation.",
    href: "/courses/statistics-foundation/modules/descriptive-statistics/lessons/shape-skewness-outliers",
    skills: ["Skewness", "Outliers", "Shape diagnosis"],
  },
  {
    number: "2.5",
    title: "Comparing groups descriptively",
    duration: "105–110 min",
    status: "Expanded",
    theme: "Group comparison",
    description:
      "Bring centre, spread, shape, quartiles and graphical summaries together to compare groups carefully without overclaiming.",
    href: "/courses/statistics-foundation/modules/descriptive-statistics/lessons/compare-groups-descriptively",
    skills: ["Group summaries", "Overlap", "Careful reporting"],
  },
];

const moduleStats = [
  ["5", "Lessons"],
  ["8–9 hrs", "Study time"],
  ["0", "Coding"],
  ["Foundation", "Level"],
];

const moduleFocus = [
  {
    title: "Centre",
    body:
      "Understand how mean, median and mode describe typical values, and why the most appropriate centre depends on variable type, skewness and outliers.",
  },
  {
    title: "Spread",
    body:
      "Learn how range, IQR, variance and standard deviation describe consistency, dispersion and variability around the centre.",
  },
  {
    title: "Position",
    body:
      "Use ordered data, quartiles, percentiles and five-number summaries to describe where values sit inside a distribution.",
  },
  {
    title: "Shape",
    body:
      "Recognise symmetry, skewness, clusters, tails and unusual observations before choosing final summaries.",
  },
  {
    title: "Comparison",
    body:
      "Compare groups descriptively using centre, spread, shape, overlap and cautious interpretation.",
  },
];

const outcomes = [
  "Choose mean, median or mode based on data type and shape.",
  "Interpret range, IQR, variance and standard deviation.",
  "Use quartiles, percentiles and five-number summaries.",
  "Read boxplots as summaries of centre, spread and outliers.",
  "Recognise symmetric, skewed, clustered and outlier-affected data.",
  "Compare groups using centre, spread, shape and overlap.",
  "Write careful descriptive conclusions without unsupported causal claims.",
];

const pathway = [
  {
    step: "1",
    title: "Centre",
    body: "Where do the values tend to gather?",
  },
  {
    step: "2",
    title: "Spread",
    body: "How much do values vary?",
  },
  {
    step: "3",
    title: "Position",
    body: "Where do values sit when ordered?",
  },
  {
    step: "4",
    title: "Shape",
    body: "Is the distribution balanced, skewed or unusual?",
  },
  {
    step: "5",
    title: "Outliers",
    body: "Which observations need investigation?",
  },
  {
    step: "6",
    title: "Compare",
    body: "How do groups differ descriptively?",
  },
];

const comparisonQuestions = [
  {
    title: "What is typical?",
    body:
      "Use the mean, median or mode to describe the centre, but choose the measure carefully.",
  },
  {
    title: "How variable is it?",
    body:
      "Use spread to decide whether the data are consistent, dispersed or unstable.",
  },
  {
    title: "Where are the middle values?",
    body:
      "Use quartiles and percentiles to describe ordered position and the middle 50%.",
  },
  {
    title: "What is the shape?",
    body:
      "Check skewness, tails, clusters and outliers before trusting a single summary.",
  },
];

export default function DescriptiveStatisticsModulePage() {
  return (
    <main className="min-h-screen bg-[#F7F3EA] px-4 py-8 text-[#141210] sm:px-5 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses/statistics-foundation")}
          className="text-sm font-black text-[#741018] transition hover:text-[#4d080e]"
        >
          ← Back to Statistics Foundation
        </a>

        <section className="mt-6 overflow-hidden rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm md:mt-8 md:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 sm:p-6 md:p-10 lg:p-12">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm md:tracking-[0.22em]">
                Module 2 · Statistics Foundation
              </p>

              <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[1.03] tracking-[-0.055em] md:mt-5 md:text-7xl">
                Descriptive statistics.
              </h1>

              <p className="mt-5 max-w-4xl text-base leading-8 text-[#525252] md:mt-6 md:text-lg md:leading-9">
                This module teaches students how to describe data clearly before
                moving into probability and inference. You will learn how to
                summarise centre, spread, position and shape, then bring those
                ideas together to compare groups responsibly.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={withBasePath(lessons[0].href)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#11100E] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#741018] sm:w-auto md:py-4"
                >
                  Start Lesson 2.1 →
                </a>

                <a
                  href={withBasePath("#module-lessons")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#D8CDBB] bg-[#FFFCF6] px-6 py-3.5 text-sm font-black text-[#141210] transition hover:bg-[#F7F3EA] sm:w-auto md:py-4"
                >
                  View all lessons
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {moduleStats.map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-[1.25rem] border border-[#E4DED2] bg-[#F7F3EA] p-4"
                  >
                    <p className="text-2xl font-black tracking-[-0.05em]">
                      {value}
                    </p>
                    <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-[#7a7063]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="border-t border-[#E4DED2] bg-[#11100E] p-5 text-white md:p-8 lg:border-l lg:border-t-0">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50 md:text-sm">
                Module visual map
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                From raw data to clear description.
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/70 md:text-base md:leading-8">
                Descriptive statistics is the first full toolkit for making
                sense of data. It turns a list of values into a careful story
                about typical values, variability, ordered position, shape and
                comparison.
              </p>

              <div className="mt-7 grid gap-3">
                {pathway.map((item) => (
                  <div
                    key={item.step}
                    className="flex items-start gap-4 rounded-[1.25rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFFCF6] text-sm font-black text-[#141210]">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-sm font-black text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-white/65">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:mt-8 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm">
              What this module builds
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              The practical language of data summaries.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#525252] md:text-base md:leading-8">
              This module moves from individual summaries to complete
              distribution thinking. Students learn that a good description of
              data should mention what is typical, how much values vary, how
              values are positioned, what the shape looks like and how groups
              compare.
            </p>

            <div className="mt-6 grid gap-3">
              {moduleFocus.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] p-4"
                >
                  <h3 className="text-sm font-black text-[#141210]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#525252]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-[#E4DED2] bg-[#11100E] p-5 text-white shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/55 md:text-sm">
              By the end
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Students should be able to describe data responsibly.
            </h2>

            <div className="mt-6 grid gap-3">
              {outcomes.map((item, index) => (
                <div
                  key={item}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-[#FFFCF6]/[0.06] px-4 py-3"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFFCF6] text-xs font-black text-[#141210]">
                    {index + 1}
                  </span>
                  <p className="text-sm font-semibold leading-7 text-white/85">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-8">
          <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm">
                Descriptive workflow
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Ask four questions of every dataset.
              </h2>
            </div>

            <p className="text-sm leading-7 text-[#525252] md:text-base md:leading-8">
              The module trains students to avoid one-number summaries. A good
              descriptive analysis asks about centre, spread, position and
              shape before making comparisons.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {comparisonQuestions.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
              >
                <h3 className="text-lg font-black tracking-[-0.035em]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#525252]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="module-lessons"
          className="mt-6 rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10"
        >
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm">
                Module lessons
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Study the lessons in order.
              </h2>
            </div>

            <p className="text-sm leading-7 text-[#525252] md:text-base md:leading-8">
              Each lesson is built as a full learning experience with lecture,
              detailed notes, interactive lab, worked examples, practice,
              reflection and quiz. The lessons build from single summaries to
              full group comparison.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:mt-8">
            {lessons.map((lesson) => (
              <a
                key={lesson.number}
                href={withBasePath(lesson.href)}
                className="group overflow-hidden rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] transition hover:-translate-y-1 hover:bg-[#FFFCF6] hover:shadow-md md:rounded-[2rem]"
              >
                <div className="grid gap-0 lg:grid-cols-[0.22fr_1fr_0.34fr]">
                  <div className="flex items-center justify-between border-b border-[#E4DED2] bg-[#FFFCF6] p-5 lg:block lg:border-b-0 lg:border-r lg:p-6">
                    <p className="text-4xl font-black tracking-[-0.06em] text-[#741018] md:text-5xl">
                      {lesson.number}
                    </p>
                    <span className="rounded-full bg-[#F7F3EA] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#5F5F5F] lg:mt-4 lg:inline-block">
                      {lesson.duration}
                    </span>
                  </div>

                  <div className="p-5 md:p-6">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#11100E] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">
                        {lesson.status}
                      </span>
                      <span className="rounded-full border border-[#E4DED2] bg-[#FFFCF6] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#741018]">
                        {lesson.theme}
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-black leading-tight tracking-[-0.04em] md:text-3xl">
                      {lesson.title}
                    </h3>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-[#525252] md:text-base md:leading-8">
                      {lesson.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {lesson.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-[#E4DED2] bg-[#FFFCF6] px-3 py-1.5 text-xs font-bold text-[#5F5F5F]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#E4DED2] bg-[#FFFCF6] p-5 lg:block lg:border-l lg:border-t-0 lg:p-6">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7a7063]">
                      Open lesson
                    </p>
                    <p className="mt-0 text-sm font-black text-[#741018] transition group-hover:translate-x-1 lg:mt-4">
                      Start →
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:mt-8 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018]">
              How to study this module
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
              Do the visual labs slowly.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#525252]">
              The interactive labs are designed to build statistical judgement.
              Move the controls, compare the summaries, read the interpretation
              panel and write one sentence about what changed. This is how
              centre, spread, position and shape become meaningful.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-[#741018]/20 bg-[#fff4ef] p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018]">
              Module completion
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] text-[#741018]">
              Ready for probability foundations.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#525252]">
              After these five lessons, students should be able to describe a
              dataset clearly and compare groups responsibly. The next module
              can then introduce probability as the language of uncertainty.
            </p>

            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/probability-foundations"
              )}
              className="mt-6 inline-flex rounded-full bg-[#741018] px-5 py-3 text-sm font-black text-white transition hover:bg-[#4d080e]"
            >
              Next module →
            </a>
          </article>
        </section>
      </section>
    </main>
  );
}