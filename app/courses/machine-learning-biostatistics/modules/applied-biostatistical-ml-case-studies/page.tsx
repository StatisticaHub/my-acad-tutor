import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Applied Biostatistical ML Case Studies",
  description:
    "Module 5 of Machine Learning in Biostatistics covering clinical risk prediction, survival prediction, high-dimensional omics, missing data, imbalance, fairness and a final applied R project.",
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
    number: "5.1",
    title: "Clinical risk prediction case study",
    duration: "110–130 min",
    status: "Locked until July 2026",
    open: false,
    theme: "Risk prediction",
    description:
      "Apply the full prediction workflow to a patient risk example, from target definition and predictor timing to model fitting, validation and reporting.",
    href: "#join-waitlist",
    skills: ["Risk prediction", "Clinical question", "Validation report"],
  },
  {
    number: "5.2",
    title: "Survival prediction and censored outcomes",
    duration: "110–130 min",
    status: "Locked until July 2026",
    open: false,
    theme: "Time-to-event ML",
    description:
      "Understand censoring, prediction horizons, survival probabilities, time-dependent validation and why ordinary classification is not enough for survival outcomes.",
    href: "#join-waitlist",
    skills: ["Censoring", "Survival probability", "Prediction horizon"],
  },
  {
    number: "5.3",
    title: "High-dimensional omics and feature selection",
    duration: "110–130 min",
    status: "Locked until July 2026",
    open: false,
    theme: "High-dimensional data",
    description:
      "Use omics-style examples to study feature selection, high-dimensional predictors, overfitting, penalisation and validation in biomedical prediction.",
    href: "#join-waitlist",
    skills: ["Omics", "Feature selection", "Overfitting"],
  },
  {
    number: "5.4",
    title: "Missing data, imbalance and fairness",
    duration: "100–120 min",
    status: "Locked until July 2026",
    open: false,
    theme: "Model reliability",
    description:
      "Study how missingness, rare outcomes, class imbalance and unequal performance across groups can affect model usefulness and trust.",
    href: "#join-waitlist",
    skills: ["Missing data", "Imbalance", "Fairness"],
  },
  {
    number: "5.5",
    title: "Final applied ML project in R",
    duration: "120–150 min",
    status: "Locked until July 2026",
    open: false,
    theme: "Complete project",
    description:
      "Bring the full course together in an applied R project: define the question, prepare data, fit models, validate performance, interpret results and write a final report.",
    href: "#join-waitlist",
    skills: ["Full workflow", "R project", "Final report"],
  },
];

const moduleStats = [
  ["5", "Lessons"],
  ["0", "Open now"],
  ["R", "Project labs"],
  ["July 2026", "Full release"],
];

const moduleFocus = [
  {
    title: "Real case-study thinking",
    body: "This module moves beyond isolated methods. Students learn how to organise a complete machine learning analysis around a realistic health-data question.",
  },
  {
    title: "Clinical prediction workflow",
    body: "Each case study connects outcome definition, predictor timing, model fitting, validation, interpretation and reporting.",
  },
  {
    title: "Special medical-data problems",
    body: "Survival outcomes, high-dimensional predictors, missing data, class imbalance and fairness are treated as practical modelling issues.",
  },
  {
    title: "Output to report",
    body: "The final module teaches students how to translate R outputs into a cautious, transparent and clinically meaningful report.",
  },
  {
    title: "Responsible conclusion",
    body: "Students learn not to overclaim. The final report must state what the model suggests, what remains uncertain and what validation is still needed.",
  },
];

const outcomes = [
  "Design an applied clinical risk prediction workflow.",
  "Explain why survival prediction requires time-to-event thinking.",
  "Recognise high-dimensional overfitting risks in omics data.",
  "Discuss missing data and class imbalance in health ML.",
  "Evaluate model performance across clinically relevant groups.",
  "Connect R model outputs to written interpretation.",
  "Write a responsible final prediction-model report.",
  "State validation limits, cautions and next steps clearly.",
];

const pathway = [
  {
    step: "1",
    title: "Define",
    body: "State the clinical question, target population, outcome, prediction horizon and intended use.",
  },
  {
    step: "2",
    title: "Prepare",
    body: "Check predictors, missingness, outcome balance, variable timing and whether the data represent the target population.",
  },
  {
    step: "3",
    title: "Model",
    body: "Fit a baseline model and, where justified, compare it with more flexible prediction methods.",
  },
  {
    step: "4",
    title: "Validate",
    body: "Evaluate discrimination, calibration, threshold behaviour and performance on data not used for fitting.",
  },
  {
    step: "5",
    title: "Interpret",
    body: "Explain the model output in clinical and statistical language, without turning prediction into causal proof.",
  },
  {
    step: "6",
    title: "Report",
    body: "Write a transparent report covering methods, results, limitations, caution and next steps.",
  },
];

const learningDesign = [
  "Applied case-study lessons based on realistic health-data problems",
  "Detailed notes connecting modelling choices with clinical interpretation",
  "Browser R coding labs planned for every full lesson",
  "Downloadable R scripts and project-style datasets",
  "Prediction outputs, validation tables and interpretation reports",
  "Caution boxes for censoring, missingness, imbalance and fairness",
  "Final project workflow with report-writing guidance",
];

export default function AppliedBiostatisticalMLCaseStudiesModulePage() {
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
                Module 5 · Machine Learning in Biostatistics
              </p>

              <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[1.03] tracking-[-0.055em] md:mt-5 md:text-7xl">
                Applied biostatistical ML case studies.
              </h1>

              <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-700 md:mt-6 md:text-lg md:leading-9">
                This final module brings the course together through applied
                health-data case studies. Students move from clinical risk
                prediction to survival outcomes, high-dimensional omics, missing
                data, imbalance, fairness and a final R-based project report.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={withBasePath("#module-lessons")}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#8b1116] sm:w-auto md:py-4"
                >
                  View Module 5 lessons →
                </a>

                <a
                  href={withBasePath(
                    "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics",
                  )}
                  className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-black text-[#111111] transition hover:bg-[#f7f4ee] sm:w-auto md:py-4"
                >
                  Open Lesson 1.1
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
                Turn modelling knowledge into complete applied projects.
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/70">
                The final module teaches students how to combine modelling,
                validation, interpretation and reporting into an applied
                biostatistical ML workflow.
              </p>

              <div className="mt-7 grid gap-3">
                {[
                  "All Module 5 lessons are currently locked.",
                  "Lesson 1.1 remains open as the full course preview.",
                  "Full Module 5 lessons will include R project labs and output-driven reports.",
                  "The complete release is planned for July 2026.",
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
              Applied judgement across real modelling problems.
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
              Students should complete a responsible ML analysis.
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
                From applied question to final report.
              </h2>
            </div>

            <p className="text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              The module follows the complete project cycle: define the
              clinical problem, prepare data, fit models, validate performance,
              interpret outputs and write a transparent report.
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
              The final case-study lessons will be project-led.
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
              Module 5 is open for preview.
            </h2>

            <p className="mt-4 text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              Students can see the Module 5 pathway now. The full lessons are
              locked while they are redesigned with applied R scripts, case-study
              datasets, validation outputs, interpretation reports and final
              project guidance.
            </p>

            <a
              href={withBasePath("#join-waitlist")}
              className="mt-6 inline-flex w-full justify-center rounded-full bg-[#8b1116] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#5f0b0f] sm:w-auto"
            >
              Join waitlist →
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
              All Module 5 lessons currently route to the waitlist. The full
              release will move from clinical risk prediction to survival,
              omics, fairness and the final applied R project.
            </p>
          </div>

          <div className="mt-6 grid gap-3">
            {lessons.map((lesson) => (
              <a
                key={lesson.number}
                href={withBasePath(lesson.href)}
                className="group rounded-[1.5rem] border border-[#8b1116]/20 bg-[#fff7f7] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md md:rounded-[2rem] md:p-6"
              >
                <div className="grid gap-5 lg:grid-cols-[0.18fr_1fr_0.22fr] lg:items-start">
                  <div>
                    <p className="text-5xl font-black tracking-[-0.06em] text-[#8b1116]">
                      {lesson.number}
                    </p>
                    <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-neutral-500">
                      Lesson
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#8b1116] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">
                        Locked
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
                    <span className="inline-flex rounded-full border border-[#8b1116]/20 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#8b1116]">
                      {lesson.status}
                    </span>

                    <p className="mt-5 text-sm font-black text-[#8b1116] transition group-hover:translate-x-1">
                      Join waitlist →
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
                Get access updates when Module 5 opens in July 2026.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/75 md:text-base md:leading-8">
                Module 5 lessons are currently locked while they are redesigned
                with applied project labs, survival and omics examples, missing
                data checks, fairness interpretation and final report guidance.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  "Module 5 overview stays open.",
                  "All Module 5 lessons remain locked until July 2026.",
                  "Lesson 1.1 remains open as the course preview.",
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
                    defaultValue="ML Biostatistics Module 5 waitlist"
                    className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold text-neutral-950 outline-none transition focus:border-[#8b1116] focus:bg-white"
                  >
                    <option>ML Biostatistics Module 5 waitlist</option>
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
                    defaultValue="I want to join the Machine Learning in Biostatistics Module 5 waitlist."
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
                Begin with the open foundation lesson.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
                Lesson 1.1 introduces the course structure: prediction question,
                R script, model output, interpretation, report writing and
                responsible modelling caution.
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