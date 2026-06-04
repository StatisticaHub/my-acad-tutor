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
    number: "3.1",
    title: "What is probability?",
    duration: "105–110 min",
    status: "Expanded",
    theme: "Uncertainty",
    description:
      "Understand probability as a mathematical language for uncertainty, chance, events and long-run behaviour.",
    href: "/courses/statistics-foundation/modules/probability-foundations/lessons/what-is-probability",
    skills: ["Probability scale", "Long-run frequency", "Expected counts"],
  },
  {
    number: "3.2",
    title: "Events, sample spaces and probability rules",
    duration: "110 min",
    status: "Expanded",
    theme: "Event logic",
    description:
      "Learn how outcomes, events, complements, unions, intersections and probability rules are used to reason about chance.",
    href: "/courses/statistics-foundation/modules/probability-foundations/lessons/events-sample-spaces-probability-rules",
    skills: ["Sample spaces", "Venn diagrams", "Addition rule"],
  },
  {
    number: "3.3",
    title: "Conditional probability",
    duration: "115 min",
    status: "Expanded",
    theme: "Given information",
    description:
      "Study how probabilities change when information is known, and why conditional thinking is central to statistics.",
    href: "/courses/statistics-foundation/modules/probability-foundations/lessons/conditional-probability",
    skills: ["Restricted space", "Two-way tables", "Tree diagrams"],
  },
  {
    number: "3.4",
    title: "Independence and dependence",
    duration: "115 min",
    status: "Expanded",
    theme: "Probability change",
    description:
      "Understand when events are independent, when they are dependent and why this distinction matters in statistical reasoning.",
    href: "/courses/statistics-foundation/modules/probability-foundations/lessons/independence-and-dependence",
    skills: ["Joint probability", "Independence tests", "Replacement"],
  },
  {
    number: "3.5",
    title: "Bayes’ theorem and diagnostic reasoning",
    duration: "130 min",
    status: "Advanced",
    theme: "Updating evidence",
    description:
      "Learn how Bayes’ theorem connects prior probability, evidence and updated probability using diagnostic-style examples.",
    href: "/courses/statistics-foundation/modules/probability-foundations/lessons/bayes-theorem-and-diagnostic-reasoning",
    skills: ["Bayes’ theorem", "Sensitivity/specificity", "Likelihood ratios"],
  },
];

const moduleStats = [
  ["5", "Lessons"],
  ["9–10 hrs", "Study time"],
  ["0", "Coding"],
  ["Foundation → Advanced", "Level"],
];

const moduleFocus = [
  {
    title: "Uncertainty",
    body:
      "Build probability as a formal language for uncertain outcomes, chance processes and long-run behaviour.",
  },
  {
    title: "Events",
    body:
      "Represent probability questions using sample spaces, outcomes, events, complements, unions and intersections.",
  },
  {
    title: "Conditions",
    body:
      "Understand how probability changes when information is known, using restricted sample spaces and two-way tables.",
  },
  {
    title: "Independence",
    body:
      "Decide whether one event changes the probability of another, and use multiplication rules carefully.",
  },
  {
    title: "Updating",
    body:
      "Use Bayes’ theorem to update probability when evidence appears, especially in diagnostic and risk settings.",
  },
];

const outcomes = [
  "Explain probability as a number between 0 and 1.",
  "Define outcomes, events and sample spaces using set notation.",
  "Use complement, union, intersection and addition rules correctly.",
  "Calculate conditional probabilities from formulae, tables and trees.",
  "Distinguish P(A | B) from P(B | A).",
  "Identify independence and dependence using conditional and joint probabilities.",
  "Apply Bayes’ theorem to diagnostic-style evidence.",
  "Explain base-rate effects, false positives and posterior probability.",
];

const pathway = [
  {
    step: "1",
    title: "Chance",
    body: "What does probability measure?",
  },
  {
    step: "2",
    title: "Events",
    body: "Which outcomes belong to the event?",
  },
  {
    step: "3",
    title: "Rules",
    body: "How do event regions combine?",
  },
  {
    step: "4",
    title: "Condition",
    body: "What changes when information is known?",
  },
  {
    step: "5",
    title: "Independence",
    body: "Does knowing one event change another?",
  },
  {
    step: "6",
    title: "Bayes",
    body: "How should probability update after evidence?",
  },
];

const reasoningQuestions = [
  {
    title: "What is the sample space?",
    body:
      "Every probability question begins by identifying the possible outcomes and the total reference set.",
  },
  {
    title: "Which event is being asked about?",
    body:
      "Translate ordinary language into event notation such as A, Aᶜ, A ∪ B or A ∩ B.",
  },
  {
    title: "Is information already known?",
    body:
      "If the question says 'given', the denominator changes to the condition group.",
  },
  {
    title: "Does evidence update belief?",
    body:
      "Bayes’ theorem combines prior probability with evidence to produce a posterior probability.",
  },
];

const formulaCards = [
  {
    label: "Complement",
    formula: "P(Aᶜ) = 1 − P(A)",
    note: "Useful when it is easier to calculate what does not happen.",
  },
  {
    label: "Addition rule",
    formula: "P(A ∪ B) = P(A) + P(B) − P(A ∩ B)",
    note: "Subtracts the overlap so it is not counted twice.",
  },
  {
    label: "Conditional probability",
    formula: "P(A | B) = P(A ∩ B) / P(B)",
    note: "Calculates the probability of A inside the restricted space B.",
  },
  {
    label: "Independence",
    formula: "P(A ∩ B) = P(A)P(B)",
    note: "Valid when knowing one event does not change the other probability.",
  },
  {
    label: "Bayes’ theorem",
    formula: "P(D | E) = P(E | D)P(D) / P(E)",
    note: "Updates the probability of a condition after evidence is observed.",
  },
];

export default function ProbabilityFoundationsModulePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-4 py-8 text-[#111111] sm:px-5 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses/statistics-foundation")}
          className="text-sm font-black text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to Statistics Foundation
        </a>

        <section className="mt-6 overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-sm md:mt-8 md:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 sm:p-6 md:p-10 lg:p-12">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116] md:text-sm md:tracking-[0.22em]">
                Module 3 · Statistics Foundation
              </p>

              <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[1.03] tracking-[-0.055em] md:mt-5 md:text-7xl">
                Probability foundations.
              </h1>

              <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-700 md:mt-6 md:text-lg md:leading-9">
                This module introduces probability as the mathematical language
                of uncertainty. Students move from simple chance statements to
                event rules, conditional probability, independence and Bayesian
                updating. The aim is not only to calculate probabilities, but to
                reason clearly when information is incomplete.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={withBasePath(lessons[0].href)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#8b1116] sm:w-auto md:py-4"
                >
                  Start Lesson 3.1 →
                </a>

                <a
                  href={withBasePath("#module-lessons")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-black text-[#111111] transition hover:bg-[#f7f4ee] sm:w-auto md:py-4"
                >
                  View all lessons
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {moduleStats.map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-[1.25rem] border border-neutral-200 bg-[#f7f4ee] p-4"
                  >
                    <p className="text-2xl font-black tracking-[-0.05em]">
                      {value}
                    </p>
                    <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-neutral-500">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="border-t border-neutral-200 bg-neutral-950 p-5 text-white md:p-8 lg:border-l lg:border-t-0">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50 md:text-sm">
                Module visual map
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                From uncertainty to updated belief.
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/70 md:text-base md:leading-8">
                Probability begins with uncertain outcomes, then becomes a
                structured system of event regions, conditions, independence
                checks and evidence-based updating.
              </p>

              <div className="mt-7 grid gap-3">
                {pathway.map((item) => (
                  <div
                    key={item.step}
                    className="flex items-start gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-neutral-950">
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
          <article className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
              What this module builds
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              The reasoning language behind inference.
            </h2>

            <p className="mt-4 text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              Probability is the bridge between descriptive statistics and
              inference. Once students understand uncertainty, events,
              conditions and evidence, they are ready to understand sampling
              distributions, confidence intervals, hypothesis tests and model
              uncertainty later in the course.
            </p>

            <div className="mt-6 grid gap-3">
              {moduleFocus.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] p-4"
                >
                  <h3 className="text-sm font-black text-neutral-950">
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
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/55 md:text-sm">
              By the end
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Students should be able to reason under uncertainty.
            </h2>

            <div className="mt-6 grid gap-3">
              {outcomes.map((item, index) => (
                <div
                  key={item}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black text-neutral-950">
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

        <section className="mt-6 rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-8">
          <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
                Probability reasoning workflow
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Ask four questions before calculating.
              </h2>
            </div>

            <p className="text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              Probability becomes much easier when students identify the sample
              space, define the event, check whether information is given and
              decide whether evidence should update the probability.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {reasoningQuestions.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
              >
                <h3 className="text-lg font-black tracking-[-0.035em]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-neutral-700">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-neutral-200 bg-neutral-950 p-5 text-white shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-8">
          <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50 md:text-sm">
                Formula map
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                The core rules build one system.
              </h2>
            </div>

            <p className="text-sm leading-7 text-white/70 md:text-base md:leading-8">
              Students should not memorise these formulae as isolated tricks.
              Each rule comes from event regions, restricted sample spaces or
              evidence updating.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            {formulaCards.map((item) => (
              <article
                key={item.label}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5"
              >
                <p className="text-xs font-black uppercase tracking-[0.16em] text-white/45">
                  {item.label}
                </p>
                <h3 className="mt-3 text-lg font-black leading-7 text-white">
                  {item.formula}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/65">
                  {item.note}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="module-lessons"
          className="mt-6 rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10"
        >
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
                Module lessons
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Study the lessons in order.
              </h2>
            </div>

            <p className="text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              The lessons move from basic probability language to conditional
              reasoning, independence and Bayesian updating. Each lesson
              contains lecture, detailed notes, interactive lab, worked
              examples, practice, reflection and quiz.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:mt-8">
            {lessons.map((lesson) => (
              <a
                key={lesson.number}
                href={withBasePath(lesson.href)}
                className="group overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] transition hover:-translate-y-1 hover:bg-white hover:shadow-md md:rounded-[2rem]"
              >
                <div className="grid gap-0 lg:grid-cols-[0.22fr_1fr_0.34fr]">
                  <div className="flex items-center justify-between border-b border-neutral-200 bg-white p-5 lg:block lg:border-b-0 lg:border-r lg:p-6">
                    <p className="text-4xl font-black tracking-[-0.06em] text-[#8b1116] md:text-5xl">
                      {lesson.number}
                    </p>
                    <span className="rounded-full bg-[#f7f4ee] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-neutral-600 lg:mt-4 lg:inline-block">
                      {lesson.duration}
                    </span>
                  </div>

                  <div className="p-5 md:p-6">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-neutral-950 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">
                        {lesson.status}
                      </span>
                      <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#8b1116]">
                        {lesson.theme}
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-black leading-tight tracking-[-0.04em] md:text-3xl">
                      {lesson.title}
                    </h3>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
                      {lesson.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {lesson.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-bold text-neutral-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-neutral-200 bg-white p-5 lg:block lg:border-l lg:border-t-0 lg:p-6">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-neutral-500">
                      Open lesson
                    </p>
                    <p className="mt-0 text-sm font-black text-[#8b1116] transition group-hover:translate-x-1 lg:mt-4">
                      Start →
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:mt-8 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116]">
              How to study this module
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
              Draw the events before using the formula.
            </h2>

            <p className="mt-4 text-sm leading-7 text-neutral-700">
              For every probability question, first sketch the sample space,
              label the event regions, identify the condition if there is one,
              and only then apply the formula. This habit prevents most common
              mistakes with complements, intersections, conditionals and Bayes’
              theorem.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-[#8b1116]/20 bg-[#fff7f7] p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116]">
              Module completion
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] text-[#8b1116]">
              Ready for statistical inference.
            </h2>

            <p className="mt-4 text-sm leading-7 text-neutral-700">
              After these five lessons, students should understand uncertainty,
              event logic, conditional reasoning, independence and Bayesian
              updating. The next stage can introduce sampling distributions and
              inference with a stronger probability foundation.
            </p>

            <a
              href={withBasePath("/courses/statistics-foundation")}
              className="mt-6 inline-flex rounded-full bg-[#8b1116] px-5 py-3 text-sm font-black text-white transition hover:bg-[#5f0b0f]"
            >
              Back to course →
            </a>
          </article>
        </section>
      </section>
    </main>
  );
}