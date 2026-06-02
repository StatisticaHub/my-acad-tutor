const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;
  return `${basePath}${href}`;
}

const lessons = [
  {
    number: "1.1",
    title: "What is machine learning in biostatistics?",
    href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics",
    summary:
      "Introduce machine learning as prediction modelling for health data, using the shared diabetes prediction dataset.",
    tags: ["Prediction", "Health data", "R workflow"],
    focus:
      "Students learn that ML in biostatistics is not just algorithm fitting. It is a disciplined process of defining a prediction question, learning from data and interpreting predictions responsibly.",
    status: "Available",
  },
  {
    number: "1.2",
    title: "Prediction vs explanation vs causal thinking",
    href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/prediction-explanation-causal-thinking",
    summary:
      "Separate prediction, association, explanation and causality so model outputs are interpreted safely.",
    tags: ["Prediction", "Association", "Causality"],
    focus:
      "Students learn why a model that predicts well does not automatically explain causes, and why causal claims need stronger design and assumptions.",
    status: "Available",
  },
  {
    number: "1.3",
    title: "Types of learning: supervised, unsupervised and semi-supervised",
    href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/types-of-learning",
    summary:
      "Understand how machine learning problems differ according to how outcome labels are used.",
    tags: ["Supervised", "Unsupervised", "Semi-supervised"],
    focus:
      "Students compare labelled prediction, unlabelled patient subgroup discovery and partly labelled clinical data settings.",
    status: "Available",
  },
  {
    number: "1.4",
    title: "Training, testing, overfitting and generalisation",
    href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/training-testing-overfitting-generalisation",
    summary:
      "Learn why models must be evaluated on unseen patients and why leakage can make performance misleading.",
    tags: ["Train/test split", "Overfitting", "Leakage"],
    focus:
      "Students compare training and test performance, diagnose overfitting and see why leakage can create unrealistic perfect results.",
    status: "Available",
  },
  {
    number: "1.5",
    title: "Biostatistical workflow for ML projects",
    href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/biostatistical-ml-workflow",
    summary:
      "Bring the module together into a complete responsible medical ML workflow from question to reporting.",
    tags: ["Workflow", "Thresholds", "Reporting"],
    focus:
      "Students complete Module 1 by building a full workflow: clinical question, predictor timing, validation, threshold trade-offs and transparent reporting.",
    status: "Available",
  },
];

const moduleStats = [
  { label: "Lessons", value: "5" },
  { label: "Dataset", value: "Shared diabetes" },
  { label: "Coding", value: "R + WebR" },
  { label: "Status", value: "Complete" },
];

const learningOutcomes = [
  "Explain machine learning as prediction modelling for health and biomedical data.",
  "Distinguish prediction from explanation, association and causal thinking.",
  "Identify supervised, unsupervised and semi-supervised learning problems.",
  "Explain training data, test data, overfitting, generalisation and leakage.",
  "Describe a responsible biostatistical machine learning workflow from question definition to reporting.",
];

const moduleMethods = [
  {
    title: "Conversational lectures",
    body: "Prof Stat, Curious Learner, Dr Clinic and Leakage Monster guide each lesson in a classroom-style medical data lab.",
  },
  {
    title: "Detailed notes",
    body: "Each lesson explains the statistical reasoning behind prediction, validation, leakage, labels, thresholds and reporting.",
  },
  {
    title: "Interactive labs",
    body: "Students classify scenarios, diagnose modelling problems and practise clinical ML judgement before focusing on code.",
  },
  {
    title: "In-browser R labs",
    body: "Selected lessons include WebR coding sections so students can run simplified R examples directly on the website.",
  },
  {
    title: "Downloadable R scripts",
    body: "Each lesson connects to a full R script using the shared diabetes prediction workflow.",
  },
  {
    title: "Figures and reports",
    body: "The R scripts generate figures and summaries that are used inside the lesson pages for report-style interpretation.",
  },
];

export default function FoundationsModulePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-slate-950 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses/machine-learning-biostatistics")}
          className="text-sm font-black text-blue-600 transition hover:text-blue-700"
        >
          ← Back to Machine Learning in Biostatistics
        </a>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
            Module 1 · Foundations
          </p>

          <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-tight md:text-6xl">
            Foundations of Machine Learning in Biostatistics
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-slate-600 md:text-lg">
            Build the core language of medical machine learning: prediction,
            explanation, causal thinking, learning types, training and testing,
            overfitting, leakage, thresholds and responsible reporting.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics"
              )}
              className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-slate-800 sm:w-auto"
            >
              Start Lesson 1.1
            </a>

            <a
              href="#lessons"
              className="inline-flex w-full items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-black text-slate-900 transition hover:bg-slate-50 sm:w-auto"
            >
              View lessons
            </a>

            <a
              href="#module-assets"
              className="inline-flex w-full items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-black text-slate-900 transition hover:bg-slate-50 sm:w-auto"
            >
              Module assets
            </a>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {moduleStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                  {stat.label}
                </p>
                <p className="mt-2 text-2xl font-black text-slate-950">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
              Module aim
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              Build modelling judgement before choosing algorithms.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              This module teaches students how to think like biostatistical
              machine learning practitioners. Before moving to regression,
              classification, validation metrics and modern ML methods, students
              learn how to define the prediction problem, avoid causal
              overclaiming, recognise learning types and protect against
              overfitting and leakage.
            </p>
          </article>

          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
              Learning outcomes
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              By the end of Module 1, students should be able to:
            </h2>

            <div className="mt-6 space-y-3">
              {learningOutcomes.map((outcome) => (
                <div
                  key={outcome}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700"
                >
                  {outcome}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
            Module method
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
            A complete learning studio for medical machine learning foundations.
          </h2>

          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">
            Each lesson follows the same structure: conversational lecture,
            detailed notes, interactive lab, R coding lab, reporting section and
            quiz. The same diabetes prediction workflow is reused so students
            can see how the modelling process develops step by step.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {moduleMethods.map((method) => (
              <article
                key={method.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="text-lg font-black text-slate-950">
                  {method.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {method.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="lessons"
          className="mt-10 scroll-mt-24 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10"
        >
          <div className="max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
              Module lessons
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              Five lessons from basic meaning to full ML workflow.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              The module starts with the meaning of machine learning in
              biostatistics, then moves through interpretation, learning types,
              validation, overfitting, leakage and the final responsible
              workflow.
            </p>
          </div>

          <div className="mt-8 grid gap-5">
            {lessons.map((lesson) => (
              <article
                key={lesson.number}
                className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6"
              >
                <div className="grid gap-6 lg:grid-cols-[0.18fr_1fr_0.25fr] lg:items-start">
                  <div>
                    <p className="text-5xl font-black text-blue-600">
                      {lesson.number}
                    </p>
                    <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                      Lesson
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-emerald-700">
                        {lesson.status}
                      </span>
                      {lesson.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="mt-4 text-2xl font-black tracking-tight text-slate-950">
                      {lesson.title}
                    </h3>

                    <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600 md:text-base">
                      {lesson.summary}
                    </p>

                    <p className="mt-4 max-w-4xl rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-600">
                      <strong className="text-slate-950">Lesson focus:</strong>{" "}
                      {lesson.focus}
                    </p>
                  </div>

                  <div className="lg:text-right">
                    <a
                      href={withBasePath(lesson.href)}
                      className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
                    >
                      Open lesson →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="module-assets"
          className="mt-10 scroll-mt-24 grid gap-6 lg:grid-cols-2"
        >
          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
              Module R scripts
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight">
              Download the reproducible R workflow.
            </h2>

            <p className="mt-4 text-base leading-8 text-slate-600">
              Each lesson has a full R script using the shared diabetes
              prediction setting. These scripts generate the results and figures
              used throughout Module 1.
            </p>

            <div className="mt-6 grid gap-3">
              {[
                [
                  "Lesson 1.1 R script",
                  "/ml-biostatistics/r/module-1/lesson-1-1-what-is-ml-biostatistics.R",
                ],
                [
                  "Lesson 1.2 R script",
                  "/ml-biostatistics/r/module-1/lesson-1-2-prediction-explanation-causality.R",
                ],
                [
                  "Lesson 1.3 R script",
                  "/ml-biostatistics/r/module-1/lesson-1-3-types-of-learning.R",
                ],
                [
                  "Lesson 1.4 R script",
                  "/ml-biostatistics/r/module-1/lesson-1-4-training-testing-overfitting.R",
                ],
                [
                  "Lesson 1.5 R script",
                  "/ml-biostatistics/r/module-1/lesson-1-5-biostatistical-ml-workflow.R",
                ],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={withBasePath(href)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-800 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  {label} →
                </a>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
              Shared course assets
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight">
              Data, figures and reporting outputs.
            </h2>

            <p className="mt-4 text-base leading-8 text-slate-600">
              Module 1 uses one coherent diabetes prediction workflow. This
              keeps the course connected and prepares students for the applied
              case studies later in the course.
            </p>

            <div className="mt-6 grid gap-3">
              <a
                href={withBasePath(
                  "/ml-biostatistics/data/shared-diabetes-prediction-data.csv"
                )}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-800 transition hover:border-blue-200 hover:bg-blue-50"
              >
                Download shared diabetes dataset →
              </a>

              <a
                href={withBasePath(
                  "/courses/machine-learning-biostatistics/case-studies/diabetes-risk-prediction"
                )}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-800 transition hover:border-blue-200 hover:bg-blue-50"
              >
                Open diabetes risk prediction case study →
              </a>

              <a
                href={withBasePath("/courses/machine-learning-biostatistics")}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-800 transition hover:border-blue-200 hover:bg-blue-50"
              >
                Back to course homepage →
              </a>
            </div>
          </article>
        </section>

        <section className="mt-10 rounded-[2rem] bg-slate-950 p-6 text-white shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-300">
            Module 1 complete
          </p>

          <h2 className="mt-4 max-w-4xl text-3xl font-black tracking-tight md:text-4xl">
            Ready for Module 2: Supervised Learning for Clinical and Health Data.
          </h2>

          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300">
            After completing this module, students are ready to move into
            supervised learning methods: regression as prediction, logistic
            classification, k-nearest neighbours, decision trees and full
            clinical modelling pipelines.
          </p>

          <a
            href={withBasePath(
              "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data"
            )}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-blue-50 sm:w-auto"
          >
            Continue to Module 2 →
          </a>
        </section>
      </section>
    </main>
  );
}