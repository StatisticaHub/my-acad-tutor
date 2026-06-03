const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return "/";
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${cleanHref}${hasFileExtension ? "" : "/"}`;
}

const lessons = [
  {
    number: "5.1",
    title: "Sampling distributions",
    description:
      "Understand how statistics vary from sample to sample and why sampling distributions are the foundation of statistical inference.",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/sampling-distributions",
  },
  {
    number: "5.2",
    title: "Confidence intervals",
    description:
      "Learn how confidence intervals use sample information and uncertainty to estimate unknown population parameters.",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/confidence-intervals",
  },
  {
    number: "5.3",
    title: "Hypothesis testing",
    description:
      "Study the logic of null hypotheses, alternative hypotheses, test statistics, rejection regions and statistical decisions.",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/hypothesis-testing",
  },
  {
    number: "5.4",
    title: "p-values, errors and power",
    description:
      "Understand p-values, Type I error, Type II error, statistical power and why significance is not the same as importance.",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/p-values-errors-and-power",
  },
  {
    number: "5.5",
    title: "Statistical inference workflow",
    description:
      "Bring inference together through a careful workflow: question, parameter, assumptions, interval, test, interpretation and limitations.",
    href: "/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/statistical-inference-workflow",
  },
];

const moduleStats = [
  ["5", "Lessons"],
  ["Zero", "Coding"],
  ["Foundation", "Level"],
  ["Inference", "Focus"],
];

const moduleFocus = [
  {
    title: "Sampling uncertainty",
    body: "Students learn why sample results vary and how this variation becomes the basis of inference.",
  },
  {
    title: "Estimation",
    body: "The module explains confidence intervals as a way to estimate unknown population parameters with uncertainty.",
  },
  {
    title: "Testing",
    body: "Students connect hypotheses, p-values, errors and power to careful statistical decision-making.",
  },
];

export default function StatisticalInferenceFoundationsModulePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses/statistics-foundation")}
          className="text-sm font-bold text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to Statistics Foundation
        </a>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Module 5
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] sm:text-5xl md:text-6xl">
                Statistical Inference Foundations
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                This module introduces the foundations of statistical inference:
                sampling distributions, confidence intervals, hypothesis
                testing, p-values, errors, power and careful interpretation.
                Students learn how sample evidence is used to reason about
                population parameters under uncertainty.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Module aim
              </p>

              <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-[#111111]">
                Learn how statistics support conclusions under uncertainty.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                Statistical inference connects data, probability and
                distributions to real academic conclusions. The emphasis is on
                reasoning, assumptions and interpretation rather than mechanical
                calculation.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {moduleStats.map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-neutral-200 bg-[#f7f4ee] p-5"
              >
                <p className="text-2xl font-black tracking-[-0.04em] text-[#111111]">
                  {value}
                </p>
                <p className="mt-2 text-sm font-bold text-neutral-700">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/sampling-distributions"
              )}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#2a2a2a] sm:w-auto"
            >
              Start Lesson 5.1
            </a>

            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/statistical-inference-foundations"
              )}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Previous module
            </a>

            <a
              href={withBasePath("/courses/statistics-foundation")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Back to course
            </a>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {moduleFocus.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-black tracking-[-0.03em] text-[#111111]">
                {item.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {item.body}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Module lessons
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="max-w-4xl text-3xl font-black tracking-[-0.04em] text-[#111111] md:text-4xl">
              Study inference as a reasoning process.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              Each lesson builds a different part of inference: how statistics
              vary, how intervals estimate parameters, how tests make decisions,
              how p-values and errors are interpreted and how conclusions should
              be reported.
            </p>
          </div>

          <div className="mt-8 grid gap-5">
            {lessons.map((lesson) => (
              <a
                key={lesson.number}
                href={withBasePath(lesson.href)}
                className="group rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-md md:p-7"
              >
                <div className="grid gap-5 md:grid-cols-[0.18fr_1fr_auto] md:items-center">
                  <div>
                    <p className="text-3xl font-black tracking-[-0.05em] text-[#8b1116]">
                      {lesson.number}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-neutral-700">
                      Lesson {lesson.number}
                    </p>

                    <h3 className="mt-2 text-2xl font-black leading-tight tracking-[-0.04em] text-[#111111]">
                      {lesson.title}
                    </h3>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-700">
                      {lesson.description}
                    </p>
                  </div>

                  <p className="text-sm font-black text-[#8b1116] transition group-hover:translate-x-1">
                    Open lesson →
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-[#111111] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">
              Final foundation route
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Complete the foundation by learning how to report conclusions.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              This final module brings the foundation course together. Students
              should finish with a clearer understanding of how sample data,
              uncertainty, probability and distributions support statistical
              conclusions.
            </p>

            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/statistical-inference-foundations/lessons/statistical-inference-workflow"
              )}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
            >
              Open final lesson →
            </a>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-[#8b1116] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">
              Course pathway
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Return to the full Statistics Foundation course.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              Use the course homepage to review all modules, revisit earlier
              lessons and continue using the foundation course as preparation
              for biostatistics, epidemiology, data science and research
              methods.
            </p>

            <a
              href={withBasePath("/courses/statistics-foundation")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
            >
              Back to course →
            </a>
          </article>
        </section>
      </section>
    </main>
  );
}