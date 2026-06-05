import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Machine Learning in Biostatistics",
  description:
    "An applied machine learning course for biostatistics and health data science using R scripts, clinical prediction examples, validation, model evaluation and responsible reporting.",
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

const modules = [
  {
    number: "01",
    title: "Foundations of Machine Learning in Biostatistics",
    href: "/courses/machine-learning-biostatistics/modules/foundations",
    status: "Module open",
    summary:
      "Prediction thinking, explanation, causation, learning types, training/testing, overfitting and the full biostatistical ML workflow.",
    lessons: "5 lessons",
    focus: ["Prediction", "Causal caution", "Training/testing", "Workflow"],
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
  },
];

const lessons = [
  {
    module: "Module 1",
    number: "1.1",
    title: "What is machine learning in biostatistics?",
    status: "Open now",
    open: true,
    href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics",
  },
  {
    module: "Module 1",
    number: "1.2",
    title: "Prediction, explanation and causal thinking",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 1",
    number: "1.3",
    title: "Types of learning in medical data",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 1",
    number: "1.4",
    title: "Training, testing, overfitting and generalisation",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 1",
    number: "1.5",
    title: "Biostatistical workflow for machine learning projects",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 2",
    number: "2.1",
    title: "Regression as a prediction model",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 2",
    number: "2.2",
    title: "Logistic regression as a classifier",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 2",
    number: "2.3",
    title: "K-nearest neighbours and distance-based learning",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 2",
    number: "2.4",
    title: "Decision trees and rule-based prediction",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 2",
    number: "2.5",
    title: "Model pipelines for clinical datasets",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 3",
    number: "3.1",
    title: "Train/test split and resampling",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 3",
    number: "3.2",
    title: "Classification metrics, sensitivity, specificity, ROC and AUC",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 3",
    number: "3.3",
    title: "Calibration, clinical usefulness and decision curves",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 3",
    number: "3.4",
    title: "Cross-validation and bootstrap validation",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 3",
    number: "3.5",
    title: "Bias, leakage and reproducibility in health ML",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 4",
    number: "4.1",
    title: "Ridge, lasso and elastic net",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 4",
    number: "4.2",
    title: "Random forests",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 4",
    number: "4.3",
    title: "Gradient boosting",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 4",
    number: "4.4",
    title: "Support vector machines and flexible boundaries",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 4",
    number: "4.5",
    title: "Comparing models responsibly",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 5",
    number: "5.1",
    title: "Clinical risk prediction case study",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 5",
    number: "5.2",
    title: "Survival prediction and censored outcomes",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 5",
    number: "5.3",
    title: "High-dimensional omics and feature selection",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 5",
    number: "5.4",
    title: "Missing data, imbalance and fairness",
    status: "Locked until July 2026",
    open: false,
  },
  {
    module: "Module 5",
    number: "5.5",
    title: "Final applied ML project in R",
    status: "Locked until July 2026",
    open: false,
  },
];

const snapshot = [
  ["5", "Modules open"],
  ["1", "Lesson open now"],
  ["24", "Lessons waitlisted"],
  ["July 2026", "Full release"],
];

const learningDesign = [
  "Advanced conversational lectures with clinical prediction examples",
  "Detailed notes connecting statistics, modelling and medical interpretation",
  "Browser-based R coding labs inside the lesson",
  "Downloadable R scripts and shared datasets",
  "Script outputs interpreted directly inside the report section",
  "Interactive labs for thresholds, risk, validation and model behaviour",
  "Quizzes, reporting guidance and applied cautions",
];

const outcomes = [
  "Define prediction problems clearly in health data",
  "Separate prediction, explanation and causation",
  "Build baseline clinical prediction models in R",
  "Interpret model outputs and performance metrics",
  "Understand overfitting, leakage and validation",
  "Explain accuracy, sensitivity, specificity, ROC, AUC and calibration",
  "Compare models responsibly without overclaiming",
  "Prepare for applied biostatistics, health data science and clinical ML work",
];

const workflow = [
  {
    title: "Clinical question",
    body:
      "Each lesson begins with the health-data question: what outcome is predicted, for whom, using which variables and at what time?",
  },
  {
    title: "R script",
    body:
      "Students run a guided R script in the browser and can download the full reproducible version for local study.",
  },
  {
    title: "Outputs",
    body:
      "The script generates dataset summaries, model results, prediction tables, confusion matrices and performance metrics.",
  },
  {
    title: "Interpretation",
    body:
      "The lesson explains what each output means statistically, clinically and cautiously.",
  },
  {
    title: "Report",
    body:
      "Students learn how to write a responsible analysis paragraph from the model output.",
  },
  {
    title: "Cautions",
    body:
      "Every lesson highlights leakage, overfitting, causal overclaiming, validation limits and clinical usefulness.",
  },
];

export default function MachineLearningBiostatisticsCoursePage() {
  return (
    <main className="min-h-screen bg-[#F7F3EA] px-4 py-8 text-[#141210] sm:px-5 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses")}
          className="text-sm font-black text-[#741018] transition hover:text-[#4d080e]"
        >
          ← Back to courses
        </a>

        <section className="mt-6 overflow-hidden rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm md:mt-8 md:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 sm:p-6 md:p-10 lg:p-12">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm md:tracking-[0.22em]">
                Machine Learning in Biostatistics
              </p>

              <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[1.03] tracking-[-0.055em] md:mt-5 md:text-7xl">
                Learn clinical machine learning with R, validation and
                responsible interpretation.
              </h1>

              <p className="mt-5 max-w-4xl text-base leading-8 text-[#525252] md:mt-6 md:text-lg md:leading-9">
                An applied course for students learning machine learning in
                biostatistics, medical statistics and health data science.
                Module pages are open for preview. Lesson 1.1 is open now. All
                remaining lessons are waitlist-only until July 2026.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={withBasePath(
                    "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics"
                  )}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#11100E] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#741018] sm:w-auto md:py-4"
                >
                  Open Lesson 1.1 →
                </a>

                <a
                  href={withBasePath("#join-waitlist")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#D8CDBB] bg-[#FFFCF6] px-6 py-3.5 text-sm font-black text-[#141210] transition hover:bg-[#F7F3EA] sm:w-auto md:py-4"
                >
                  Join waitlist
                </a>

                <a
                  href={withBasePath("#module-preview")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#D8CDBB] bg-[#FFFCF6] px-6 py-3.5 text-sm font-black text-[#141210] transition hover:bg-[#F7F3EA] sm:w-auto md:py-4"
                >
                  Preview modules
                </a>
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-[#741018]/20 bg-[#fff4ef] p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
                  Current access policy
                </p>
                <p className="mt-3 text-sm leading-7 text-[#525252]">
                  Module overview pages remain open so students can see the full
                  structure. Only Lesson 1.1 is open for full study. Locked ML
                  lessons currently point students to the waitlist until the
                  full course release in July 2026.
                </p>
              </div>
            </div>

            <aside className="border-t border-[#E4DED2] bg-[#11100E] p-5 text-white md:p-8 lg:border-l lg:border-t-0">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50 md:text-sm">
                Course snapshot
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                A structured route through applied clinical ML.
              </h2>

              <div className="mt-7 grid grid-cols-2 gap-3">
                {snapshot.map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-[1.35rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-4"
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
                Best for MSc students, medical statistics learners, health data
                science students, R users, clinical prediction beginners and
                students preparing for applied research or biostatistics roles.
              </p>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:mt-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm">
              Learning design
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Built around scripts, outputs and interpretation.
            </h2>

            <div className="mt-6 grid gap-3">
              {learningDesign.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] px-4 py-3 text-sm font-bold text-[#525252]"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-[#E4DED2] bg-[#11100E] p-5 text-white shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/55 md:text-sm">
              By the end
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Students should be able to use ML responsibly in health data.
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {outcomes.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-[#FFFCF6]/[0.06] px-4 py-3 text-sm font-bold text-white/85"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm">
                Course workflow
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Every lesson follows the same applied learning loop.
              </h2>
            </div>

            <p className="text-sm leading-7 text-[#525252] md:text-base md:leading-8">
              Students do not just run models. They learn how to define the
              prediction problem, run the R workflow, interpret the output,
              write a report and state limitations.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {workflow.map((item, index) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
              >
                <span className="rounded-full bg-[#11100E] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white">
                  Step {index + 1}
                </span>

                <h3 className="mt-4 text-xl font-black tracking-[-0.04em]">
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
          id="module-preview"
          className="mt-6 rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10"
        >
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm">
                Module pages
              </p>

              <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.045em] md:text-5xl">
                All module pages are open for preview.
              </h2>
            </div>

            <p className="text-sm leading-7 text-[#525252] md:text-base md:leading-8">
              Students can explore the full ML course structure now. Each module
              page shows the learning pathway, case-study direction, lesson
              sequence and applied skills.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:mt-8 lg:grid-cols-2">
            {modules.map((module) => (
              <a
                key={module.title}
                href={withBasePath(module.href)}
                className="group rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5 transition hover:-translate-y-1 hover:bg-[#FFFCF6] hover:shadow-md md:rounded-[2rem] md:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-[#11100E] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white">
                    {module.number}
                  </span>

                  <span className="rounded-full border border-[#E4DED2] bg-[#FFFCF6] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#741018]">
                    {module.status}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-black tracking-[-0.045em]">
                  {module.title}
                </h3>

                <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-[#741018]">
                  {module.lessons}
                </p>

                <p className="mt-4 text-sm leading-7 text-[#525252]">
                  {module.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {module.focus.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#E4DED2] bg-[#FFFCF6] px-3 py-1.5 text-xs font-bold text-[#5F5F5F]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <p className="mt-5 text-sm font-black text-[#741018] transition group-hover:translate-x-1">
                  Open module →
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm">
                Lesson access
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Lesson 1.1 is open. All other lessons are locked until July 2026.
              </h2>
            </div>

            <p className="text-sm leading-7 text-[#525252] md:text-base md:leading-8">
              Locked lessons currently send students to the waitlist. This lets
              visitors see the full curriculum while keeping the full advanced
              R-based release controlled.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {lessons.map((lesson) => {
              const href = lesson.open ? lesson.href : "#join-waitlist";

              return (
                <a
                  key={`${lesson.module}-${lesson.number}`}
                  href={withBasePath(
                    href ?? "/courses/machine-learning-biostatistics/waitlist"
                  )}
                  className={`group rounded-[1.5rem] border p-5 transition hover:-translate-y-1 hover:shadow-md ${
                    lesson.open
                      ? "border-[#E4DED2] bg-[#F7F3EA] hover:bg-[#FFFCF6]"
                      : "border-[#741018]/20 bg-[#fff4ef] hover:bg-[#FFFCF6]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.14em] ${
                        lesson.open
                          ? "bg-[#11100E] text-white"
                          : "bg-[#741018] text-white"
                      }`}
                    >
                      {lesson.number}
                    </span>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.14em] ${
                        lesson.open
                          ? "border-[#E4DED2] bg-[#FFFCF6] text-[#5F5F5F]"
                          : "border-[#741018]/20 bg-[#FFFCF6] text-[#741018]"
                      }`}
                    >
                      {lesson.open ? "Open" : "Locked"}
                    </span>
                  </div>

                  <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-[#7a7063]">
                    {lesson.module}
                  </p>

                  <h3 className="mt-2 text-xl font-black tracking-[-0.04em]">
                    {lesson.title}
                  </h3>

                  <p className="mt-3 text-sm font-bold leading-7 text-[#525252]">
                    {lesson.status}
                  </p>

                  <p className="mt-4 text-sm font-black text-[#741018] transition group-hover:translate-x-1">
                    {lesson.open ? "Open lesson →" : "Join waitlist →"}
                  </p>
                </a>
              );
            })}
          </div>
        </section>

        <section
          id="join-waitlist"
          className="mt-6 overflow-hidden rounded-[1.75rem] border border-[#E4DED2] bg-[#11100E] shadow-sm md:mt-8 md:rounded-[2.5rem]"
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
                The course is being redesigned lesson-by-lesson with advanced R
                scripts, browser coding labs, downloadable files, visual model
                outputs and clinical interpretation reports.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  "Module pages stay open.",
                  "Lesson 1.1 stays open.",
                  "All other lessons are locked until July 2026.",
                  "Waitlist visitors can request early access or release updates.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-white/10 bg-[#FFFCF6]/[0.07] px-4 py-3 text-sm font-bold text-white/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 bg-[#FFFCF6] p-5 md:p-8 lg:border-l lg:border-t-0">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018]">
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
                  <span className="text-sm font-black text-[#525252]">
                    Name
                  </span>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] px-4 py-3 text-sm font-bold text-[#141210] outline-none transition focus:border-[#741018] focus:bg-[#FFFCF6]"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-black text-[#525252]">
                    Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] px-4 py-3 text-sm font-bold text-[#141210] outline-none transition focus:border-[#741018] focus:bg-[#FFFCF6]"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-black text-[#525252]">
                    Interest
                  </span>
                  <select
                    name="interest"
                    defaultValue="Machine Learning in Biostatistics waitlist"
                    className="rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] px-4 py-3 text-sm font-bold text-[#141210] outline-none transition focus:border-[#741018] focus:bg-[#FFFCF6]"
                  >
                    <option>Machine Learning in Biostatistics waitlist</option>
                    <option>Early access</option>
                    <option>Private tutoring support</option>
                    <option>Full course release updates</option>
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-black text-[#525252]">
                    Message
                  </span>
                  <textarea
                    name="message"
                    rows={4}
                    defaultValue="I want to join the Machine Learning in Biostatistics course waitlist."
                    className="rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] px-4 py-3 text-sm font-bold text-[#141210] outline-none transition focus:border-[#741018] focus:bg-[#FFFCF6]"
                  />
                </label>

                <button
                  type="submit"
                  className="rounded-full bg-[#741018] px-6 py-4 text-sm font-black text-white transition hover:bg-[#4d080e]"
                >
                  Join waitlist →
                </button>

                <p className="text-xs leading-6 text-[#7a7063]">
                </p>
              </form>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-[#741018]/20 bg-[#fff4ef] p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm">
                Recommended start
              </p>

              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.045em] text-[#741018] md:text-5xl">
                Begin with the open foundation lesson.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#525252] md:text-base md:leading-8">
                Lesson 1.1 introduces machine learning as a biostatistical
                prediction workflow: clinical question, outcome, predictors,
                training/testing, R output, interpretation and responsible
                reporting.
              </p>
            </div>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics"
              )}
              className="inline-flex w-full justify-center rounded-full bg-[#741018] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#4d080e] sm:w-auto md:py-4"
            >
              Open Lesson 1.1 →
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}