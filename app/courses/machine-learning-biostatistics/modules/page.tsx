import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Machine Learning in Biostatistics Modules",
  description:
    "Explore the Machine Learning in Biostatistics course modules covering prediction, supervised learning, validation, regularisation, ensembles and applied health-data case studies.",
};

const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
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

const modules = [
  {
    number: "01",
    title: "Foundations of Machine Learning in Biostatistics",
    href: "/courses/machine-learning-biostatistics/modules/foundations",
    status: "Module open",
    summary:
      "Prediction, explanation, causation, learning types, training/testing, overfitting, leakage, thresholds and responsible biostatistical reporting.",
    lessons: "5 lessons",
    focus: [
      "Prediction mindset",
      "Causal caution",
      "Training/testing",
      "ML workflow",
    ],
    firstLesson: {
      number: "1.1",
      title: "What is machine learning in biostatistics?",
      href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics",
      open: true,
    },
    lessonList: [
      ["1.1", "What is machine learning in biostatistics?", true],
      ["1.2", "Prediction, explanation and causal thinking", false],
      ["1.3", "Types of learning in medical data", false],
      ["1.4", "Training, testing, overfitting and generalisation", false],
      ["1.5", "Biostatistical workflow for machine learning projects", false],
    ],
  },
  {
    number: "02",
    title: "Supervised Learning for Clinical Health Data",
    href: "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data",
    status: "Module open",
    summary:
      "Regression prediction, logistic classification, K-nearest neighbours, decision trees and model pipelines for clinical datasets.",
    lessons: "5 lessons",
    focus: ["Regression", "Classification", "KNN", "Decision trees"],
    firstLesson: {
      number: "2.1",
      title: "Regression as a prediction model",
      href: "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data/lessons/regression-as-a-prediction-model",
      open: false,
    },
    lessonList: [
      ["2.1", "Regression as a prediction model", false],
      ["2.2", "Logistic regression as a classifier", false],
      ["2.3", "K-nearest neighbours and distance-based learning", false],
      ["2.4", "Decision trees and rule-based prediction", false],
      ["2.5", "Model pipelines for clinical datasets", false],
    ],
  },
  {
    number: "03",
    title: "Model Evaluation, Validation and Performance",
    href: "/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance",
    status: "Module open",
    summary:
      "Train/test splitting, resampling, sensitivity, specificity, ROC, AUC, calibration, decision curves, leakage and reproducibility.",
    lessons: "5 lessons",
    focus: ["Validation", "ROC/AUC", "Calibration", "Leakage"],
    firstLesson: {
      number: "3.1",
      title: "Train/test split and resampling",
      href: "/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance/lessons/train-test-split-and-resampling",
      open: false,
    },
    lessonList: [
      ["3.1", "Train/test split and resampling", false],
      ["3.2", "Classification metrics, sensitivity, specificity, ROC and AUC", false],
      ["3.3", "Calibration, clinical usefulness and decision curves", false],
      ["3.4", "Cross-validation and bootstrap validation", false],
      ["3.5", "Bias, leakage and reproducibility in health ML", false],
    ],
  },
  {
    number: "04",
    title: "Regularisation, Ensembles and Modern Prediction Models",
    href: "/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models",
    status: "Module open",
    summary:
      "Ridge, lasso, elastic net, random forests, gradient boosting, support vector machines and responsible model comparison.",
    lessons: "5 lessons",
    focus: ["Regularisation", "Forests", "Boosting", "Comparison"],
    firstLesson: {
      number: "4.1",
      title: "Ridge, lasso and elastic net",
      href: "/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models/lessons/ridge-lasso-and-elastic-net",
      open: false,
    },
    lessonList: [
      ["4.1", "Ridge, lasso and elastic net", false],
      ["4.2", "Random forests", false],
      ["4.3", "Gradient boosting", false],
      ["4.4", "Support vector machines and flexible boundaries", false],
      ["4.5", "Comparing models responsibly", false],
    ],
  },
  {
    number: "05",
    title: "Applied Biostatistical ML Case Studies",
    href: "/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies",
    status: "Module open",
    summary:
      "Clinical risk prediction, survival prediction, high-dimensional omics, missing data, imbalance, fairness and a final applied R project.",
    lessons: "5 lessons",
    focus: ["Risk prediction", "Survival ML", "Omics", "Fairness"],
    firstLesson: {
      number: "5.1",
      title: "Clinical risk prediction case study",
      href: "/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies/lessons/clinical-risk-prediction-case-study",
      open: false,
    },
    lessonList: [
      ["5.1", "Clinical risk prediction case study", false],
      ["5.2", "Survival prediction and censored outcomes", false],
      ["5.3", "High-dimensional omics and feature selection", false],
      ["5.4", "Missing data, imbalance and fairness", false],
      ["5.5", "Final applied ML project in R", false],
    ],
  },
];

const snapshot = [
  ["5", "Modules open"],
  ["1", "Lesson open now"],
  ["24", "Lessons waitlisted"],
  ["July 2026", "Full release"],
];

const learningDesign = [
  "Module pages remain open for preview",
  "Lesson 1.1 is open as the full course preview",
  "All other lessons are locked until July 2026",
  "Each full lesson will include browser R coding",
  "Downloadable R scripts and datasets will support local practice",
  "Reports will connect R output with statistical interpretation",
];

const courseFlow = [
  "Start with prediction thinking before algorithms",
  "Move into supervised learning for clinical data",
  "Evaluate models with validation and performance metrics",
  "Study regularisation, ensembles and flexible models",
  "Finish with applied biostatistical ML case studies",
];

export default function MachineLearningBiostatisticsModulesPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-4 py-8 text-[#111111] sm:px-5 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses/machine-learning-biostatistics")}
          className="text-sm font-black text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to ML course
        </a>

        <section className="mt-6 overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-sm md:mt-8 md:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 sm:p-6 md:p-10 lg:p-12">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116] md:text-sm md:tracking-[0.22em]">
                Machine Learning in Biostatistics · Modules
              </p>

              <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[1.03] tracking-[-0.055em] md:mt-5 md:text-7xl">
                Explore the full clinical machine learning pathway.
              </h1>

              <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-700 md:mt-6 md:text-lg md:leading-9">
                The module pages are open so students can preview the full
                course structure. Lesson 1.1 is open now as the full learning
                preview. All other lessons are locked and connected to the
                waitlist until the full release in July 2026.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={withBasePath(
                    "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics",
                  )}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#8b1116] sm:w-auto md:py-4"
                >
                  Open Lesson 1.1 →
                </a>

                <a
                  href={withBasePath("#module-preview")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-black text-[#111111] transition hover:bg-[#f7f4ee] sm:w-auto md:py-4"
                >
                  Preview modules
                </a>

                <a
                  href={withBasePath("#join-waitlist")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-black text-[#111111] transition hover:bg-[#f7f4ee] sm:w-auto md:py-4"
                >
                  Join waitlist
                </a>
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-[#8b1116]/20 bg-[#fff7f7] p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
                  Current access policy
                </p>
                <p className="mt-3 text-sm leading-7 text-neutral-700">
                  All module overview pages remain open. Lesson 1.1 is open for
                  full study. Lessons 1.2–5.5 are locked while they are being
                  redesigned with advanced R scripts, browser coding, output
                  interpretation, reporting guidance and clinical examples.
                </p>
              </div>
            </div>

            <aside className="border-t border-neutral-200 bg-neutral-950 p-5 text-white md:p-8 lg:border-l lg:border-t-0">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50 md:text-sm">
                Module snapshot
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                A structured route from prediction to applied case studies.
              </h2>

              <div className="mt-7 grid grid-cols-2 gap-3">
                {snapshot.map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-[1.35rem] border border-white/10 bg-white/[0.07] p-4"
                  >
                    <p className="text-3xl font-black tracking-[-0.06em]">
                      {value}
                    </p>
                    <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-white/50">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm leading-7 text-white/70">
                Best for students who already know basic statistics and want to
                learn applied machine learning for health data, clinical
                prediction and biostatistical modelling.
              </p>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:mt-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
              Learning design
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Built around R scripts, outputs and interpretation.
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

          <article className="rounded-[1.75rem] border border-neutral-200 bg-[#111111] p-5 text-white shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/55 md:text-sm">
              Course flow
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              The sequence moves from foundations to applied clinical ML.
            </h2>

            <div className="mt-6 grid gap-3">
              {courseFlow.map((item, index) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-bold text-white/85"
                >
                  {String(index + 1).padStart(2, "0")} · {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section
          id="module-preview"
          className="mt-6 rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10"
        >
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
                Module pages
              </p>

              <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.045em] md:text-5xl">
                All module pages are open for preview.
              </h2>
            </div>

            <p className="text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              Students can open every module overview page now. Each module page
              explains the learning pathway, lesson sequence and applied focus.
              Full lesson access remains controlled until July 2026.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:mt-8 lg:grid-cols-2">
            {modules.map((module) => (
              <a
                key={module.title}
                href={withBasePath(module.href)}
                className="group rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md md:rounded-[2rem] md:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-[#111111] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white">
                    {module.number}
                  </span>

                  <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#8b1116]">
                    {module.status}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-black tracking-[-0.045em]">
                  {module.title}
                </h3>

                <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-[#8b1116]">
                  {module.lessons}
                </p>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  {module.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {module.focus.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-bold text-neutral-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <p className="mt-5 text-sm font-black text-[#8b1116] transition group-hover:translate-x-1">
                  Open module →
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
                Lesson access by module
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Lesson 1.1 is open. Every other lesson is locked until July 2026.
              </h2>
            </div>

            <p className="text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              The cards below show the full lesson sequence. Open lessons go
              directly to the lesson. Locked lessons route students to the
              waitlist section.
            </p>
          </div>

          <div className="mt-6 grid gap-5">
            {modules.map((module) => (
              <article
                key={`${module.number}-lessons`}
                className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5 md:rounded-[2rem] md:p-6"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
                      Module {module.number}
                    </p>

                    <h3 className="mt-2 text-2xl font-black tracking-[-0.04em]">
                      {module.title}
                    </h3>

                    <p className="mt-3 max-w-4xl text-sm leading-7 text-neutral-700">
                      {module.summary}
                    </p>
                  </div>

                  <a
                    href={withBasePath(module.href)}
                    className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-black text-neutral-950 transition hover:-translate-y-0.5 hover:border-neutral-950"
                  >
                    Module page →
                  </a>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {module.lessonList.map(([number, title, open]) => {
                    const href = open
                      ? module.firstLesson.href
                      : "#join-waitlist";

                    return (
                      <a
                        key={`${module.number}-${number}`}
                        href={withBasePath(href)}
                        className={`group rounded-[1.35rem] border p-4 transition hover:-translate-y-1 hover:shadow-md ${
                          open
                            ? "border-neutral-200 bg-white"
                            : "border-[#8b1116]/20 bg-[#fff7f7] hover:bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.14em] ${
                              open
                                ? "bg-neutral-950 text-white"
                                : "bg-[#8b1116] text-white"
                            }`}
                          >
                            {number}
                          </span>

                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.14em] ${
                              open
                                ? "border-neutral-200 bg-[#f7f4ee] text-neutral-600"
                                : "border-[#8b1116]/20 bg-white text-[#8b1116]"
                            }`}
                          >
                            {open ? "Open" : "Locked"}
                          </span>
                        </div>

                        <h4 className="mt-4 text-lg font-black tracking-[-0.035em]">
                          {title}
                        </h4>

                        <p className="mt-3 text-sm font-bold leading-7 text-neutral-700">
                          {open ? "Open now" : "Locked until July 2026"}
                        </p>

                        <p className="mt-4 text-sm font-black text-[#8b1116] transition group-hover:translate-x-1">
                          {open ? "Open lesson →" : "Join waitlist →"}
                        </p>
                      </a>
                    );
                  })}
                </div>
              </article>
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
                Get access updates when the full ML course opens in July 2026.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/75 md:text-base md:leading-8">
                Locked lessons point here while the course is being redesigned.
                The full release will include advanced R scripts, browser coding
                labs, downloadable files, visual model outputs and report-style
                interpretation.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  "All module pages stay open.",
                  "Lesson 1.1 stays open.",
                  "Lessons 1.2–5.5 remain locked until July 2026.",
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
                    defaultValue="Machine Learning in Biostatistics waitlist"
                    className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold text-neutral-950 outline-none transition focus:border-[#8b1116] focus:bg-white"
                  >
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
                    defaultValue="I want to join the Machine Learning in Biostatistics course waitlist."
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
                Lesson 1.1 introduces machine learning as a biostatistical
                prediction workflow: clinical question, outcome, predictors,
                training/testing, R output, interpretation and responsible
                reporting.
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