import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foundations of Machine Learning in Biostatistics",
  description:
    "Module 1 of Machine Learning in Biostatistics covering prediction thinking, causal caution, learning types, validation, overfitting, leakage and responsible reporting.",
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

const lessons = [
  {
    number: "1.1",
    title: "What is machine learning in biostatistics?",
    duration: "90 min",
    status: "Open now",
    open: true,
    theme: "Prediction mindset",
    description:
      "Understand machine learning as a biostatistical prediction workflow using clinical questions, outcomes, predictors, R output, validation and responsible reporting.",
    href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics",
    skills: ["Prediction workflow", "Browser R lab", "Output interpretation"],
  },
  {
    number: "1.2",
    title: "Prediction, explanation and causal thinking",
    duration: "90–100 min",
    status: "Locked until July 2026",
    open: false,
    theme: "Interpretation discipline",
    description:
      "Separate prediction models from explanatory and causal models, and learn how to avoid unsafe causal claims in medical machine learning reports.",
    href: "#join-waitlist",
    skills: ["Prediction vs causation", "Confounding", "Reporting caution"],
  },
  {
    number: "1.3",
    title: "Types of learning in medical data",
    duration: "90–100 min",
    status: "Locked until July 2026",
    open: false,
    theme: "Learning structure",
    description:
      "Classify supervised, unsupervised and semi-supervised learning problems using outcomes, labels, predictors and clinical data structure.",
    href: "#join-waitlist",
    skills: ["Supervised learning", "Unsupervised learning", "Clinical labels"],
  },
  {
    number: "1.4",
    title: "Training, testing, overfitting and generalisation",
    duration: "100–110 min",
    status: "Locked until July 2026",
    open: false,
    theme: "Validation thinking",
    description:
      "Understand train/test splitting, overfitting, generalisation to unseen patients, data leakage and why training performance can be misleading.",
    href: "#join-waitlist",
    skills: ["Train/test split", "Overfitting", "Leakage"],
  },
  {
    number: "1.5",
    title: "Biostatistical workflow for machine learning projects",
    duration: "100–120 min",
    status: "Locked until July 2026",
    open: false,
    theme: "Applied workflow",
    description:
      "Bring the module together through clinical question design, predictor timing, validation, thresholds, interpretation and transparent reporting.",
    href: "#join-waitlist",
    skills: ["Clinical workflow", "Thresholds", "Model reporting"],
  },
];

const moduleStats = [
  ["5", "Lessons"],
  ["1", "Open now"],
  ["R", "Browser lab"],
  ["July 2026", "Full release"],
];

const moduleFocus = [
  {
    title: "Prediction before algorithms",
    body: "Students learn to define the clinical prediction question before choosing a model. The module begins with outcome, predictors, target population and prediction timing.",
  },
  {
    title: "Responsible interpretation",
    body: "The module separates prediction, explanation and causation so students do not overclaim what an ML model can prove.",
  },
  {
    title: "Validation awareness",
    body: "Training, testing, overfitting, leakage and generalisation are treated as core biostatistical ideas, not technical afterthoughts.",
  },
  {
    title: "R output to report",
    body: "Lesson 1.1 introduces the course style: run an R script, inspect the output, interpret the results and write a cautious report.",
  },
  {
    title: "Clinical ML judgement",
    body: "Students learn why model accuracy alone is not enough for health-data decisions and why clinical usefulness must be considered.",
  },
];

const outcomes = [
  "Define machine learning as a prediction workflow in biostatistics.",
  "Identify outcomes, predictors, target population and prediction timing.",
  "Explain why prediction is not the same as causation.",
  "Recognise supervised, unsupervised and semi-supervised learning tasks.",
  "Explain overfitting, data leakage and poor generalisation.",
  "Interpret first model outputs from R scripts.",
  "Write cautious conclusions from prediction-model results.",
];

const pathway = [
  {
    step: "1",
    title: "Question",
    body: "What clinical or health-data outcome do we want to predict?",
  },
  {
    step: "2",
    title: "Outcome",
    body: "What is the response variable, and how is it measured?",
  },
  {
    step: "3",
    title: "Predictors",
    body: "Which variables are available at the time prediction is made?",
  },
  {
    step: "4",
    title: "Model",
    body: "Which prediction rule is fitted, and what does it output?",
  },
  {
    step: "5",
    title: "Validation",
    body: "Does the model work on observations not used to train it?",
  },
  {
    step: "6",
    title: "Report",
    body: "What can we honestly conclude, and what must be cautioned?",
  },
];

const learningDesign = [
  "Conversational lecture with clinical prediction examples",
  "Detailed notes connecting statistics, ML and interpretation",
  "Browser-based R coding lab",
  "Downloadable R script and shared dataset",
  "Output guide explaining script results",
  "Report section translating output into interpretation",
  "Quiz and applied checks",
];

export default function MachineLearningBiostatisticsFoundationsModulePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-4 py-8 text-[#111111] sm:px-5 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses/machine-learning-biostatistics")}
          className="text-sm font-black text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to Machine Learning in Biostatistics
        </a>

        <section className="mt-6 overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-sm md:mt-8 md:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 sm:p-6 md:p-10 lg:p-12">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116] md:text-sm md:tracking-[0.22em]">
                Module 1 · Machine Learning in Biostatistics
              </p>

              <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[1.03] tracking-[-0.055em] md:mt-5 md:text-7xl">
                Foundations of machine learning in biostatistics.
              </h1>

              <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-700 md:mt-6 md:text-lg md:leading-9">
                This module builds the judgement needed before algorithms. You
                will learn how clinical prediction questions become machine
                learning workflows, why validation matters, how R output should
                be interpreted, and why medical ML reports must avoid causal
                overclaiming.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={withBasePath(
                    "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics",
                  )}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#8b1116] sm:w-auto md:py-4"
                >
                  Start Lesson 1.1 →
                </a>

                <a
                  href={withBasePath("#module-lessons")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-black text-[#111111] transition hover:bg-[#f7f4ee] sm:w-auto md:py-4"
                >
                  View all lessons
                </a>

                <a
                  href={withBasePath("#join-waitlist")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-black text-[#111111] transition hover:bg-[#f7f4ee] sm:w-auto md:py-4"
                >
                  Join waitlist
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
                Module aim
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Build prediction judgement before modelling.
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/70">
                Students should finish this module able to explain what a
                prediction model can do, what it cannot prove, and why
                validation and reporting discipline are essential in health
                data.
              </p>

              <div className="mt-7 grid gap-3">
                {[
                  "Lesson 1.1 is open now.",
                  "Lessons 1.2–1.5 are locked until July 2026.",
                  "The full module will include R scripts and output-driven reporting.",
                  "Module pages remain open for preview.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-white/10 bg-white/[0.07] px-4 py-3 text-sm font-bold text-white/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:mt-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
              What this module builds
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Safe clinical prediction thinking.
            </h2>

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
              Students should understand the modelling workflow.
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {outcomes.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-bold text-white/85"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
                Module pathway
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                From clinical question to cautious report.
              </h2>
            </div>

            <p className="text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              The first module teaches the thinking structure that every later
              model will follow: define the question, choose valid predictors,
              fit a model, validate it, interpret the output and report
              responsibly.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {pathway.map((item) => (
              <article
                key={item.step}
                className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
              >
                <span className="rounded-full bg-[#111111] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white">
                  Step {item.step}
                </span>

                <h3 className="mt-4 text-xl font-black tracking-[-0.04em]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-neutral-700">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:mt-8 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
              Lesson design
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              The ML course is script-led and interpretation-led.
            </h2>

            <div className="mt-6 grid gap-3">
              {learningDesign.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold text-neutral-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-[#8b1116]/20 bg-[#fff7f7] p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
              Current release state
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] text-[#8b1116] md:text-5xl">
              One full lesson is open as the preview.
            </h2>

            <p className="mt-4 text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              Lesson 1.1 demonstrates the final course format: lecture, detailed
              notes, interactive lab, browser R console, script output guide,
              report section and quiz. The remaining lessons are locked while
              they are being redesigned in the same style.
            </p>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics",
              )}
              className="mt-6 inline-flex w-full justify-center rounded-full bg-[#8b1116] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#5f0b0f] sm:w-auto"
            >
              Open Lesson 1.1 →
            </a>
          </article>
        </section>

        <section
          id="module-lessons"
          className="mt-6 rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10"
        >
          <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
                Module lessons
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Study the lessons in order.
              </h2>
            </div>

            <p className="text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              Lesson 1.1 is open now. Lessons 1.2–1.5 currently route to the
              waitlist until the full July 2026 release.
            </p>
          </div>

          <div className="mt-6 grid gap-3">
            {lessons.map((lesson) => (
              <a
                key={lesson.number}
                href={withBasePath(lesson.open ? lesson.href : "#join-waitlist")}
                className={`group rounded-[1.5rem] border p-5 transition hover:-translate-y-1 hover:shadow-md md:rounded-[2rem] md:p-6 ${
                  lesson.open
                    ? "border-neutral-200 bg-[#f7f4ee] hover:bg-white"
                    : "border-[#8b1116]/20 bg-[#fff7f7] hover:bg-white"
                }`}
              >
                <div className="grid gap-5 lg:grid-cols-[0.18fr_1fr_0.22fr] lg:items-start">
                  <div>
                    <p
                      className={`text-5xl font-black tracking-[-0.06em] ${
                        lesson.open ? "text-[#111111]" : "text-[#8b1116]"
                      }`}
                    >
                      {lesson.number}
                    </p>
                    <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-neutral-500">
                      Lesson
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.14em] ${
                          lesson.open
                            ? "bg-neutral-950 text-white"
                            : "bg-[#8b1116] text-white"
                        }`}
                      >
                        {lesson.open ? "Open" : "Locked"}
                      </span>

                      <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-neutral-600">
                        {lesson.duration}
                      </span>

                      <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#8b1116]">
                        {lesson.theme}
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-black tracking-[-0.04em]">
                      {lesson.title}
                    </h3>

                    <p className="mt-3 max-w-4xl text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
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

                  <div className="lg:text-right">
                    <span className="inline-flex rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-neutral-600">
                      {lesson.status}
                    </span>

                    <p className="mt-5 text-sm font-black text-[#8b1116] transition group-hover:translate-x-1">
                      {lesson.open ? "Open lesson →" : "Join waitlist →"}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section
          id="join-waitlist"
          className="mt-6 overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-neutral-950 shadow-sm md:mt-8 md:rounded-[2.5rem]"
        >
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="p-5 text-white md:p-10">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50 md:text-sm">
                Join the waitlist
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Get access updates when the full module opens in July 2026.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/75 md:text-base md:leading-8">
                Lessons 1.2–1.5 are currently locked while they are being
                redesigned with R labs, downloadable scripts, visual outputs,
                interpretation reports and applied clinical examples.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  "Lesson 1.1 stays open.",
                  "Lessons 1.2–1.5 remain locked until July 2026.",
                  "The full module will follow the same structure as Lesson 1.1.",
                  "Waitlist visitors can request early access or release updates.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-white/10 bg-white/[0.07] px-4 py-3 text-sm font-bold text-white/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 bg-white p-5 md:p-8 lg:border-l lg:border-t-0">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Waitlist form
              </p>

              <h3 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                Request access.
              </h3>

              <form
                action={withBasePath("/contact")}
                method="get"
                className="mt-6 grid gap-4"
              >
                <label className="grid gap-2">
                  <span className="text-sm font-black text-neutral-700">
                    Name
                  </span>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold text-neutral-950 outline-none transition focus:border-[#8b1116] focus:bg-white"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-black text-neutral-700">
                    Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold text-neutral-950 outline-none transition focus:border-[#8b1116] focus:bg-white"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-black text-neutral-700">
                    Interest
                  </span>
                  <select
                    name="interest"
                    defaultValue="ML Biostatistics Module 1 waitlist"
                    className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold text-neutral-950 outline-none transition focus:border-[#8b1116] focus:bg-white"
                  >
                    <option>ML Biostatistics Module 1 waitlist</option>
                    <option>Machine Learning in Biostatistics waitlist</option>
                    <option>Early access</option>
                    <option>Private tutoring support</option>
                    <option>Full course release updates</option>
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-black text-neutral-700">
                    Message
                  </span>
                  <textarea
                    name="message"
                    rows={4}
                    defaultValue="I want to join the Machine Learning in Biostatistics Module 1 waitlist."
                    className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold text-neutral-950 outline-none transition focus:border-[#8b1116] focus:bg-white"
                  />
                </label>

                <button
                  type="submit"
                  className="rounded-full bg-[#8b1116] px-6 py-4 text-sm font-black text-white transition hover:bg-[#5f0b0f]"
                >
                  Join waitlist →
                </button>

                <p className="text-xs leading-6 text-neutral-500">
                </p>
              </form>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-[#8b1116]/20 bg-[#fff7f7] p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
                Recommended start
              </p>

              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.045em] text-[#8b1116] md:text-5xl">
                Begin with the open ML foundation lesson.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
                Lesson 1.1 introduces the full learning style for this course:
                clinical question, R script, browser output, interpretation,
                report writing, quiz and responsible modelling caution.
              </p>
            </div>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics",
              )}
              className="inline-flex w-full justify-center rounded-full bg-[#8b1116] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#5f0b0f] sm:w-auto md:py-4"
            >
              Open Lesson 1.1 →
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}