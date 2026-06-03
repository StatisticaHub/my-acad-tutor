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

const modules = [
  {
    number: "01",
    title: "Foundations of Machine Learning in Biostatistics",
    href: "/courses/machine-learning-biostatistics/modules/foundations",
    status: "Available",
    summary:
      "Build the language of prediction, supervised learning, train/test validation, overfitting, leakage, thresholds and responsible biostatistical ML workflow.",
    lessons: "5 lessons",
  },
  {
    number: "02",
    title: "Supervised Learning for Clinical and Health Data",
    href: "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data",
    status: "Preparing",
    summary:
      "Study regression as prediction, logistic classification, k-nearest neighbours, decision trees and clinical modelling pipelines.",
    lessons: "5 lessons",
  },
  {
    number: "03",
    title: "Model Evaluation, Validation and Performance",
    href: "/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance",
    status: "Preparing",
    summary:
      "Learn train/test splits, cross-validation, bootstrap validation, classification metrics, calibration, leakage and reproducibility.",
    lessons: "5 lessons",
  },
  {
    number: "04",
    title: "Regularisation, Ensembles and Modern Prediction Models",
    href: "/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models",
    status: "Preparing",
    summary:
      "Move into ridge, lasso, elastic net, random forests, gradient boosting, support vector machines and responsible model comparison.",
    lessons: "5 lessons",
  },
  {
    number: "05",
    title: "Applied Biostatistical ML Case Studies",
    href: "/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies",
    status: "Preparing",
    summary:
      "Apply the full workflow to risk prediction, survival outcomes, omics, missing data, imbalance, fairness and transparent reporting.",
    lessons: "5 lessons",
  },
];

const features = [
  {
    title: "Biostatistical prediction thinking",
    body: "The course does not treat machine learning as button-clicking. It explains what a prediction target is, when predictors are measured, how outcomes are defined and why validation must match the clinical question.",
  },
  {
    title: "Validation before complexity",
    body: "Students learn why a simple validated model can be more useful than a complex model that leaks information, overfits, or performs poorly on new patients.",
  },
  {
    title: "R-based practical learning",
    body: "Selected lessons include R and WebR-style practice so students can connect theory with real modelling workflows while still focusing on interpretation.",
  },
];

const differences = [
  "Clinical prediction rather than generic machine learning",
  "Validation, calibration and usefulness explained carefully",
  "Overfitting and data leakage treated as central topics",
  "R-based workflow with interpretation-first teaching",
  "Case studies based on health-data-style modelling questions",
  "Clear links between statistics, biostatistics and ML",
];

const assets = [
  [
    "Download shared diabetes CSV",
    "/ml-biostatistics/data/shared-diabetes-prediction-data.csv",
  ],
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
  [
    "Case Study 1 R script",
    "/ml-biostatistics/r/case-studies/c1-diabetes-risk-prediction.R",
  ],
];

const courseSnapshot = [
  ["5", "Core modules"],
  ["25", "Structured lessons"],
  ["R", "Browser-based practice"],
  ["5", "Applied case studies"],
];

export default function MachineLearningBiostatisticsCoursePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/learning-hub")}
          className="text-sm font-bold text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to Learning Hub
        </a>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Introductory Machine Learning in Biostatistics
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] sm:text-5xl md:text-6xl">
                Machine learning for health data, clinical prediction and
                biostatistical modelling.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                A structured course for students who want to understand
                prediction modelling, validation, overfitting, calibration,
                clinical usefulness and responsible machine learning in medical
                research.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                The course combines statistical thinking, R-based modelling,
                applied interpretation and health-data examples so students
                learn not only how models are fitted, but how they should be
                judged.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Course aim
              </p>

              <h2 className="mt-4 text-2xl font-black tracking-[-0.04em]">
                Prediction, validation and interpretation for health data.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                The course is built around medical machine learning as a
                disciplined biostatistical workflow, not a collection of
                algorithms.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/foundations"
              )}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#2a2a2a] sm:w-auto"
            >
              Start learning
            </a>

            <a
              href="#modules"
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              View all modules
            </a>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/case-studies/diabetes-risk-prediction"
              )}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Open case study
            </a>
          </div>

          <div className="mt-10">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-neutral-700">
              Course snapshot
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {courseSnapshot.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-3xl border border-neutral-200 bg-[#f7f4ee] p-5"
                >
                  <p className="text-3xl font-black tracking-[-0.04em] text-[#111111]">
                    {value}
                  </p>
                  <p className="mt-2 text-sm font-bold text-neutral-700">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-black tracking-[-0.03em] text-[#111111]">
                {feature.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {feature.body}
              </p>
            </article>
          ))}
        </section>

        <section
          id="modules"
          className="mt-10 scroll-mt-24 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10"
        >
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Course structure
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="max-w-4xl text-3xl font-black tracking-[-0.04em] text-[#111111] md:text-5xl">
              Five modules from foundations to applied medical ML.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              Start with the language of prediction, then move through
              supervised learning, model evaluation, regularisation, ensembles
              and applied health-data case studies.
            </p>
          </div>

          <div className="mt-8 grid gap-5">
            {modules.map((module) => (
              <a
                key={module.number}
                href={withBasePath(module.href)}
                className="group rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6 transition hover:-translate-y-1 hover:border-[#8b1116]/30 hover:bg-white hover:shadow-md md:p-7"
              >
                <div className="grid gap-5 lg:grid-cols-[0.16fr_1fr_auto] lg:items-start">
                  <div>
                    <p className="text-4xl font-black tracking-[-0.05em] text-[#8b1116]">
                      {module.number}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${
                          module.status === "Available"
                            ? "bg-white text-emerald-700"
                            : "bg-white text-neutral-700"
                        }`}
                      >
                        {module.status}
                      </span>

                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-neutral-700">
                        {module.lessons}
                      </span>
                    </div>

                    <h3 className="mt-4 max-w-3xl text-2xl font-black tracking-[-0.035em] text-[#111111] md:text-3xl">
                      {module.title}
                    </h3>

                    <p className="mt-4 max-w-4xl text-sm leading-7 text-neutral-700 md:text-base">
                      {module.summary}
                    </p>
                  </div>

                  <div className="lg:text-right">
                    <span className="inline-flex rounded-full bg-[#111111] px-5 py-3 text-sm font-black text-white transition group-hover:bg-[#8b1116]">
                      Open module →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            What makes this course different
          </p>

          <h2 className="mt-4 max-w-4xl text-3xl font-black tracking-[-0.04em] text-[#111111] md:text-5xl">
            Designed for responsible prediction, not shortcuts.
          </h2>

          <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {differences.map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-neutral-200 bg-[#f7f4ee] p-5"
              >
                <p className="text-sm font-bold leading-7 text-neutral-800">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Case studies
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#111111] md:text-4xl">
              Applied medical ML reports.
            </h2>

            <p className="mt-4 text-base leading-8 text-neutral-700">
              Case studies turn the modelling workflow into report-style
              interpretation with figures, metrics, clinical judgement,
              limitations and transparent conclusions.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={withBasePath(
                  "/courses/machine-learning-biostatistics/case-studies"
                )}
                className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#2a2a2a] sm:w-auto"
              >
                View case studies
              </a>

              <a
                href={withBasePath(
                  "/courses/machine-learning-biostatistics/case-studies/diabetes-risk-prediction"
                )}
                className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
              >
                Open diabetes case study
              </a>
            </div>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Course assets
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#111111] md:text-4xl">
              Data, scripts and figures.
            </h2>

            <p className="mt-4 text-base leading-8 text-neutral-700">
              The course includes a shared dataset, local R scripts, selected
              WebR lesson labs and generated figures used inside lessons and
              case-study pages.
            </p>

            <div className="mt-6 grid gap-3">
              {assets.map(([label, href]) => (
                <a
                  key={href}
                  href={withBasePath(href)}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-black text-neutral-800 transition hover:bg-white hover:text-[#8b1116]"
                >
                  {label} →
                </a>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-10 rounded-[2rem] bg-[#111111] p-6 text-white shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">
            Start the course
          </p>

          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <h2 className="max-w-3xl text-3xl font-black tracking-[-0.04em] md:text-4xl">
                Begin with Module 1: Foundations of Machine Learning in
                Biostatistics.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-white/90">
                Start with prediction thinking, predictor timing, validation,
                overfitting, leakage and the responsible reporting workflow.
              </p>
            </div>

            <div className="grid gap-3">
              <a
                href={withBasePath(
                  "/courses/machine-learning-biostatistics/modules/foundations"
                )}
                className="rounded-full bg-white px-6 py-4 text-center text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
              >
                Open Module 1 →
              </a>

              <a
                href={withBasePath(
                  "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics"
                )}
                className="rounded-full border border-white/25 bg-white/10 px-6 py-4 text-center text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                Start Lesson 1.1
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}