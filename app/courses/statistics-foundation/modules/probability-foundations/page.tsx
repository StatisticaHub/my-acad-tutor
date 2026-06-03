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
    number: "3.1",
    title: "What is probability?",
    description:
      "Understand probability as a mathematical language for uncertainty, chance, events and long-run behaviour.",
    href: "/courses/statistics-foundation/modules/probability-foundations/lessons/what-is-probability",
  },
  {
    number: "3.2",
    title: "Events, sample spaces and probability rules",
    description:
      "Learn how outcomes, events, complements, unions, intersections and probability rules are used to reason about chance.",
    href: "/courses/statistics-foundation/modules/probability-foundations/lessons/events-sample-spaces-probability-rules",
  },
  {
    number: "3.3",
    title: "Conditional probability",
    description:
      "Study how probabilities change when information is known, and why conditional thinking is central to statistics.",
    href: "/courses/statistics-foundation/modules/probability-foundations/lessons/conditional-probability",
  },
  {
    number: "3.4",
    title: "Independence and dependence",
    description:
      "Understand when events are independent, when they are dependent and why this distinction matters in statistical reasoning.",
    href: "/courses/statistics-foundation/modules/probability-foundations/lessons/independence-and-dependence",
  },
  {
    number: "3.5",
    title: "Bayes’ theorem and diagnostic reasoning",
    description:
      "Learn how Bayes’ theorem connects prior probability, evidence and updated probability using diagnostic-style examples.",
    href: "/courses/statistics-foundation/modules/probability-foundations/lessons/bayes-theorem-and-diagnostic-reasoning",
  },
];

const moduleStats = [
  ["5", "Lessons"],
  ["Zero", "Coding"],
  ["Foundation", "Level"],
  ["Probability", "Focus"],
];

const moduleFocus = [
  {
    title: "Uncertainty",
    body: "Students learn probability as the formal language used to describe chance, uncertainty and long-run behaviour.",
  },
  {
    title: "Rules",
    body: "The module builds core probability rules using outcomes, events, complements, unions, intersections and conditions.",
  },
  {
    title: "Reasoning",
    body: "Students connect probability to conditional thinking, independence, dependence, Bayes’ theorem and diagnostic interpretation.",
  },
];

export default function ProbabilityFoundationsModulePage() {
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
            Module 3
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] sm:text-5xl md:text-6xl">
                Probability Foundations
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                This module introduces probability as the mathematical language
                of uncertainty. Students learn sample spaces, events,
                probability rules, conditional probability, independence,
                dependence, Bayes’ theorem, expectation and core distribution
                ideas needed for inference.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Module aim
              </p>

              <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-[#111111]">
                Build the probability language needed for inference.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                Probability is the bridge between descriptive statistics and
                statistical inference. It helps students understand uncertainty,
                conditional information, independence and probability-based
                reasoning before confidence intervals and hypothesis testing.
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
                "/courses/statistics-foundation/modules/probability-foundations/lessons/what-is-probability"
              )}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#2a2a2a] sm:w-auto"
            >
              Start Lesson 3.1
            </a>

            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/statistical-inference-foundations"
              )}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Next module →
            </a>

            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/descriptive-statistics"
              )}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Previous module
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
              Study probability step by step.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              Each lesson builds a different part of probabilistic thinking:
              chance, events, probability rules, conditional information,
              independence, dependence and updating beliefs using Bayes’
              theorem.
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
              Learning route
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Complete probability before studying statistical inference.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              Module 4 assumes that students understand events, probability
              rules, conditional probability, independence, dependence and
              Bayes’ theorem before moving into sampling distributions,
              confidence intervals and hypothesis testing.
            </p>

            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/statistical-inference-foundations"
              )}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
            >
              Continue to Module 4 →
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
              Use the course homepage to move between all five modules, review
              the full structure and continue through the 26-lesson foundation
              pathway.
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