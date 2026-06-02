const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;
  return `${basePath}${href}/`;
}

const modules = [
  {
    number: "01",
    title: "Foundations of Machine Learning in Biostatistics",
    href: "/courses/machine-learning-biostatistics/modules/foundations",
    status: "Complete",
    summary:
      "Build the language of prediction, supervised learning, train/test validation, overfitting, leakage, thresholds and responsible biostatistical ML workflow.",
    lessons: [
      {
        title: "What is machine learning in biostatistics?",
        href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics",
        available: true,
      },
      {
        title: "Prediction vs explanation vs causal thinking",
        href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/prediction-explanation-causal-thinking",
        available: true,
      },
      {
        title: "Types of learning",
        href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/types-of-learning",
        available: true,
      },
      {
        title: "Training, testing, overfitting and generalisation",
        href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/training-testing-overfitting-generalisation",
        available: true,
      },
      {
        title: "Biostatistical ML workflow",
        href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/biostatistical-ml-workflow",
        available: true,
      },
    ],
  },
  {
    number: "02",
    title: "Supervised Learning for Clinical and Health Data",
    href: "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data",
    status: "Preparing",
    summary:
      "Study regression as prediction, logistic classification, k-nearest neighbours, decision trees and clinical modelling pipelines.",
    lessons: [
      {
        title: "Regression as a prediction model",
        href: "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data/lessons/regression-as-a-prediction-model",
        available: false,
      },
      {
        title: "Logistic regression as a classifier",
        href: "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data/lessons/logistic-regression-as-a-classifier",
        available: false,
      },
      {
        title: "k-nearest neighbours and distance-based learning",
        href: "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data/lessons/k-nearest-neighbours-and-distance-based-learning",
        available: false,
      },
      {
        title: "Decision trees and rule-based prediction",
        href: "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data/lessons/decision-trees-and-rule-based-prediction",
        available: false,
      },
      {
        title: "Model pipelines for clinical datasets",
        href: "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data/lessons/model-pipelines-for-clinical-datasets",
        available: false,
      },
    ],
  },
  {
    number: "03",
    title: "Model Evaluation, Validation and Performance",
    href: "/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance",
    status: "Preparing",
    summary:
      "Learn train/test splits, cross-validation, bootstrap validation, classification metrics, calibration, leakage and reproducibility.",
    lessons: [
      {
        title: "Train/test split and resampling",
        href: "/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance/lessons/train-test-split-and-resampling",
        available: false,
      },
      {
        title: "Cross-validation and bootstrap validation",
        href: "/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance/lessons/cross-validation-and-bootstrap-validation",
        available: false,
      },
      {
        title: "Classification metrics: sensitivity, specificity, ROC, AUC",
        href: "/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance/lessons/classification-metrics-sensitivity-specificity-roc-auc",
        available: false,
      },
      {
        title: "Calibration, clinical usefulness and decision curves",
        href: "/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance/lessons/calibration-clinical-usefulness-decision-curves",
        available: false,
      },
      {
        title: "Bias, leakage and reproducibility in health ML",
        href: "/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance/lessons/bias-leakage-and-reproducibility-in-health-ml",
        available: false,
      },
    ],
  },
  {
    number: "04",
    title: "Regularisation, Ensembles and Modern Prediction Models",
    href: "/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models",
    status: "Preparing",
    summary:
      "Move into ridge, lasso, elastic net, random forests, gradient boosting, support vector machines and responsible comparison.",
    lessons: [
      {
        title: "Ridge, lasso and elastic net",
        href: "/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models/lessons/ridge-lasso-and-elastic-net",
        available: false,
      },
      {
        title: "Random forests",
        href: "/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models/lessons/random-forests",
        available: false,
      },
      {
        title: "Gradient boosting",
        href: "/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models/lessons/gradient-boosting",
        available: false,
      },
      {
        title: "Support vector machines and flexible boundaries",
        href: "/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models/lessons/support-vector-machines-and-flexible-boundaries",
        available: false,
      },
      {
        title: "Comparing models responsibly",
        href: "/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models/lessons/comparing-models-responsibly",
        available: false,
      },
    ],
  },
  {
    number: "05",
    title: "Applied Biostatistical ML Case Studies",
    href: "/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies",
    status: "Preparing",
    summary:
      "Apply the full workflow to risk prediction, survival outcomes, omics, missing data, imbalance, fairness and reporting.",
    lessons: [
      {
        title: "Clinical risk prediction case study",
        href: "/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies/lessons/clinical-risk-prediction-case-study",
        available: false,
      },
      {
        title: "Survival prediction and censored outcomes",
        href: "/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies/lessons/survival-prediction-and-censored-outcomes",
        available: false,
      },
      {
        title: "High-dimensional omics and feature selection",
        href: "/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies/lessons/high-dimensional-omics-and-feature-selection",
        available: false,
      },
      {
        title: "Missing data, imbalance and fairness",
        href: "/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies/lessons/missing-data-imbalance-and-fairness",
        available: false,
      },
      {
        title: "Final applied ML project in R",
        href: "/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies/lessons/final-applied-ml-project-in-r",
        available: false,
      },
    ],
  },
];

const features = [
  {
    title: "Conversational lessons",
    body: "Prof Stat, Curious Learner, Dr Clinic and Leakage Monster guide the course through realistic medical ML situations.",
  },
  {
    title: "Shared dataset flow",
    body: "The same diabetes prediction setting appears repeatedly so students can see ideas develop across modules.",
  },
  {
    title: "In-browser R labs",
    body: "Selected lessons include WebR labs so students can run R directly on the website.",
  },
  {
    title: "Downloadable scripts",
    body: "Each coding lesson links to a reproducible R script stored in the course asset folder.",
  },
  {
    title: "Figures and reports",
    body: "R scripts generate figures that are used inside lessons and applied case-study reports.",
  },
  {
    title: "Clinical interpretation",
    body: "The course focuses on validation, calibration, thresholds, leakage, usefulness and responsible reporting.",
  },
];

const moduleOneScripts = [
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
];

export default function MachineLearningBiostatisticsCoursePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-slate-950 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
            Introductory Machine Learning in Biostatistics
          </p>

          <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-tight md:text-6xl">
            Machine learning for health data, clinical prediction and
            biostatistical modelling.
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-slate-600 md:text-lg">
            A theory-rich, R-based course on prediction modelling, validation,
            calibration, clinical usefulness and responsible machine learning for
            medical and biomedical data.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/foundations"
              )}
              className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-slate-800 sm:w-auto"
            >
              Open Module 1
            </a>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics"
              )}
              className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 sm:w-auto"
            >
              Start Lesson 1.1
            </a>

            <a
              href="#modules"
              className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 sm:w-auto"
            >
              View modules
            </a>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/case-studies/diabetes-risk-prediction"
              )}
              className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 sm:w-auto"
            >
              Open Case Study 1
            </a>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {[
              ["Modules", "5"],
              ["Lessons", "25"],
              ["Module 1", "Complete"],
              ["Coding", "R + WebR"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                  {label}
                </p>
                <p className="mt-2 text-2xl font-black text-slate-950">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
            Course method
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
            Built around one coherent medical ML workflow.
          </h2>

          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">
            The early modules use the same shared diabetes prediction dataset.
            Students first learn the basic prediction question, then revisit the
            same data for learning types, train/test validation, leakage,
            thresholds, reporting, supervised models, calibration and applied
            case studies.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="text-lg font-black text-slate-950">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="modules"
          className="mt-10 scroll-mt-24 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10"
        >
          <div className="max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
              Course structure
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              Five modules from foundations to applied case studies.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              Each module contains five lessons. Lessons follow the structure:
              conversational lecture, detailed notes, interactive lab, R coding
              lab, report-style interpretation and quiz.
            </p>
          </div>

          <div className="mt-8 grid gap-6">
            {modules.map((module) => (
              <article
                key={module.number}
                className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6"
              >
                <div className="grid gap-6 lg:grid-cols-[0.18fr_1fr_0.28fr] lg:items-start">
                  <div>
                    <p className="text-5xl font-black text-blue-600">
                      {module.number}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${
                          module.status === "Complete"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-white text-slate-600"
                        }`}
                      >
                        {module.status}
                      </span>
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-700">
                        5 lessons
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
                      {module.title}
                    </h3>

                    <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-600 md:text-base md:leading-7">
                      {module.summary}
                    </p>

                    <div className="mt-6 grid gap-2">
                      {module.lessons.map((lesson, index) => (
                        <a
                          key={lesson.href}
                          href={withBasePath(lesson.href)}
                          className={`flex items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-sm font-bold transition ${
                            lesson.available
                              ? "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                              : "border-slate-200 bg-white/70 text-slate-500 hover:bg-white"
                          }`}
                        >
                          <span>
                            {module.number}.{index + 1} {lesson.title}
                          </span>
                          <span
                            className={`shrink-0 text-xs font-black uppercase tracking-[0.14em] ${
                              lesson.available
                                ? "text-emerald-700"
                                : "text-slate-400"
                            }`}
                          >
                            {lesson.available ? "Open" : "Ready"}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="lg:text-right">
                    <a
                      href={withBasePath(module.href)}
                      className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800 sm:w-auto"
                    >
                      Open module →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
              Case studies
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight">
              Applied medical ML reports.
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Case studies turn the modelling workflow into report-style
              interpretation with figures, metrics, clinical judgement and
              limitations.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={withBasePath(
                  "/courses/machine-learning-biostatistics/case-studies"
                )}
                className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-slate-800 sm:w-auto"
              >
                View case studies
              </a>

              <a
                href={withBasePath(
                  "/courses/machine-learning-biostatistics/case-studies/diabetes-risk-prediction"
                )}
                className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 sm:w-auto"
              >
                Open diabetes case study
              </a>
            </div>
          </article>

          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
              Course assets
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight">
              Data, scripts and figures.
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              The course includes a shared dataset, local R scripts, WebR lesson
              labs and generated figures used inside the lessons.
            </p>

            <div className="mt-6 grid gap-3">
              <a
                href={withBasePath(
                  "/ml-biostatistics/data/shared-diabetes-prediction-data.csv"
                )}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
              >
                Download shared diabetes CSV →
              </a>

              {moduleOneScripts.map(([label, href]) => (
                <a
                  key={href}
                  href={withBasePath(href)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                >
                  Download {label} →
                </a>
              ))}

              <a
                href={withBasePath(
                  "/ml-biostatistics/r/case-studies/c1-diabetes-risk-prediction.R"
                )}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
              >
                Download Case Study 1 R script →
              </a>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}