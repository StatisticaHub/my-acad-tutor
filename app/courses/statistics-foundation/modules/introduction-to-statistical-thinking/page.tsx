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
    number: "1.1",
    title: "What is statistics?",
    duration: "60–75 min",
    status: "Expanded",
    theme: "Statistical thinking",
    description:
      "Understand statistics as the discipline of learning from data under uncertainty, using populations, samples, variables, parameters, statistics and inference.",
    href: "/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/what-is-statistics",
    skills: ["Question to evidence", "Uncertainty", "Inference language"],
  },
  {
    number: "1.2",
    title: "Populations, samples and variables",
    duration: "70–80 min",
    status: "Expanded",
    theme: "Study structure",
    description:
      "Define target populations, study populations, sampling frames, samples, observational units and variables before analysis begins.",
    href: "/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/populations-samples-variables",
    skills: ["Target population", "Sampling frame", "Variable classification"],
  },
  {
    number: "1.3",
    title: "Types of data",
    duration: "80–90 min",
    status: "Expanded",
    theme: "Data classification",
    description:
      "Classify data as nominal, ordinal, binary, discrete, continuous and time-to-event, then choose suitable summaries and displays.",
    href: "/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/types-of-data",
    skills: ["Data types", "Measurement scales", "Summary choice"],
  },
  {
    number: "1.4",
    title: "Tables and graphs",
    duration: "90 min",
    status: "Expanded",
    theme: "Visual reasoning",
    description:
      "Build frequency tables, relative frequencies, percentages, bar charts, histograms, boxplots and visual interpretations.",
    href: "/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/tables-and-graphs",
    skills: ["Frequency tables", "Graph choice", "Visual interpretation"],
  },
  {
    number: "1.5",
    title: "Sampling methods",
    duration: "90–100 min",
    status: "Expanded",
    theme: "Sampling design",
    description:
      "Compare simple random, systematic, stratified, cluster, convenience and voluntary response sampling while recognising bias.",
    href: "/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/sampling-methods",
    skills: ["Method choice", "Representativeness", "Sampling bias"],
  },
];

const moduleStats = [
  ["5", "Lessons"],
  ["6–7 hrs", "Study time"],
  ["0", "Coding"],
  ["Foundation", "Level"],
];

const moduleFocus = [
  {
    title: "Statistical language",
    body:
      "Build the vocabulary needed for the rest of the course: population, sample, variable, parameter, statistic, uncertainty and inference.",
  },
  {
    title: "Study design awareness",
    body:
      "Learn to inspect where data came from before trusting a table, graph, estimate or conclusion.",
  },
  {
    title: "Data classification",
    body:
      "Recognise variable types and understand why different data require different summaries and displays.",
  },
  {
    title: "Visual reasoning",
    body:
      "Use tables and graphs as tools for interpretation, not decoration.",
  },
  {
    title: "Sampling judgement",
    body:
      "Understand how sampling methods affect bias, representativeness and generalisability.",
  },
];

const outcomes = [
  "Define statistics as learning from data under uncertainty.",
  "Distinguish population, sample, parameter and statistic.",
  "Identify target population, study population and sampling frame.",
  "Classify variables by type and measurement scale.",
  "Choose suitable tables and graphs for different variables.",
  "Explain why sampling methods affect conclusions.",
  "Write cautious interpretations that mention uncertainty and limitations.",
];

const pathway = [
  {
    step: "1",
    title: "Question",
    body: "What do we want to know?",
  },
  {
    step: "2",
    title: "Population",
    body: "Who is the conclusion about?",
  },
  {
    step: "3",
    title: "Sample",
    body: "Who was actually observed?",
  },
  {
    step: "4",
    title: "Variables",
    body: "What was measured?",
  },
  {
    step: "5",
    title: "Display",
    body: "How should data be summarised?",
  },
  {
    step: "6",
    title: "Conclusion",
    body: "What can we honestly say?",
  },
];

export default function IntroductionToStatisticalThinkingModulePage() {
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
                Module 1 · Statistics Foundation
              </p>

              <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[1.03] tracking-[-0.055em] md:mt-5 md:text-7xl">
                Introduction to statistical thinking.
              </h1>

              <p className="mt-5 max-w-4xl text-base leading-8 text-[#525252] md:mt-6 md:text-lg md:leading-9">
                This module builds the language students need before formulas.
                You will learn how statistical questions become data, how data
                are organised into variables, how tables and graphs communicate
                evidence, and why sampling decisions shape every conclusion.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={withBasePath(
                    "/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/what-is-statistics"
                  )}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#11100E] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#741018] sm:w-auto md:py-4"
                >
                  Start Lesson 1.1 →
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
                From question to honest conclusion.
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/70 md:text-base md:leading-8">
                Every later topic in statistics depends on this first chain:
                define the question, understand the population, observe a
                sample, measure variables, summarise data and interpret with
                caution.
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
              The foundation for every later topic.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#525252] md:text-base md:leading-8">
              This is the “thinking layer” of the course. Students learn to
              question the source, structure, type and display of data before
              trusting any calculation.
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
              Students should be able to explain data clearly.
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
              detailed notes, visual studio, worked examples, practice,
              reflection and quiz.
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
              Do not rush the visual labs.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#525252]">
              The interactive studios are designed to make students pause and
              explain what changes. Move the controls slowly, read the
              interpretation panels, and write one sentence after each lab.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-[#741018]/20 bg-[#fff4ef] p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018]">
              Module completion
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] text-[#741018]">
              Ready for descriptive statistics.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#525252]">
              After these five lessons, students are ready to study measures of
              centre, spread, position and distribution shape with a stronger
              understanding of where data come from.
            </p>

            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/descriptive-statistics"
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