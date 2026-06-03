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
    status: "Complete",
    summary:
      "Build the core language of prediction, explanation, causality, learning types, train/test validation, overfitting, leakage, thresholds and responsible reporting.",
    lessons: [
      {
        number: "1.1",
        title: "What is machine learning in biostatistics?",
        href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics",
        status: "Available",
      },
      {
        number: "1.2",
        title: "Prediction vs explanation vs causal thinking",
        href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/prediction-explanation-causal-thinking",
        status: "Available",
      },
      {
        number: "1.3",
        title: "Types of learning",
        href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/types-of-learning",
        status: "Available",
      },
      {
        number: "1.4",
        title: "Training, testing, overfitting and generalisation",
        href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/training-testing-overfitting-generalisation",
        status: "Available",
      },
      {
        number: "1.5",
        title: "Biostatistical ML workflow",
        href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/biostatistical-ml-workflow",
        status: "Available",
      },
    ],
  },
  {
    number: "02",
    title: "Supervised Learning for Clinical and Health Data",
    href: "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data",
    status: "Preparing",
    summary:
      "Move from foundations into supervised prediction models for health data: regression, logistic classification, k-nearest neighbours, trees and clinical modelling pipelines.",
    lessons: [
      {
        number: "2.1",
        title: "Regression as a prediction model",
        href: "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data/lessons/regression-as-a-prediction-model",
        status: "Preparing",
      },
      {
        number: "2.2",
        title: "Logistic regression as a classifier",
        href: "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data/lessons/logistic-regression-as-a-classifier",
        status: "Preparing",
      },
      {
        number: "2.3",
        title: "k-nearest neighbours and distance-based learning",
        href: "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data/lessons/k-nearest-neighbours-and-distance-based-learning",
        status: "Preparing",
      },
      {
        number: "2.4",
        title: "Decision trees and rule-based prediction",
        href: "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data/lessons/decision-trees-and-rule-based-prediction",
        status: "Preparing",
      },
      {
        number: "2.5",
        title: "Model pipelines for clinical datasets",
        href: "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data/lessons/model-pipelines-for-clinical-datasets",
        status: "Preparing",
      },
    ],
  },
  {
    number: "03",
    title: "Model Evaluation, Validation and Performance",
    href: "/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance",
    status: "Preparing",
    summary:
      "Study the central performance tools for medical prediction: resampling, cross-validation, bootstrap validation, ROC/AUC, calibration and clinical usefulness.",
    lessons: [
      {
        number: "3.1",
        title: "Train/test split and resampling",
        href: "/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance/lessons/train-test-split-and-resampling",
        status: "Preparing",
      },
      {
        number: "3.2",
        title: "Cross-validation and bootstrap validation",
        href: "/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance/lessons/cross-validation-and-bootstrap-validation",
        status: "Preparing",
      },
      {
        number: "3.3",
        title: "Classification metrics: sensitivity, specificity, ROC, AUC",
        href: "/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance/lessons/classification-metrics-sensitivity-specificity-roc-auc",
        status: "Preparing",
      },
      {
        number: "3.4",
        title: "Calibration, clinical usefulness and decision curves",
        href: "/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance/lessons/calibration-clinical-usefulness-decision-curves",
        status: "Preparing",
      },
      {
        number: "3.5",
        title: "Bias, leakage and reproducibility in health ML",
        href: "/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance/lessons/bias-leakage-and-reproducibility-in-health-ml",
        status: "Preparing",
      },
    ],
  },
  {
    number: "04",
    title: "Regularisation, Ensembles and Modern Prediction Models",
    href: "/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models",
    status: "Preparing",
    summary:
      "Learn flexible prediction methods and how to compare them responsibly: ridge, lasso, elastic net, random forests, boosting and support vector machines.",
    lessons: [
      {
        number: "4.1",
        title: "Ridge, lasso and elastic net",
        href: "/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models/lessons/ridge-lasso-and-elastic-net",
        status: "Preparing",
      },
      {
        number: "4.2",
        title: "Random forests",
        href: "/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models/lessons/random-forests",
        status: "Preparing",
      },
      {
        number: "4.3",
        title: "Gradient boosting",
        href: "/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models/lessons/gradient-boosting",
        status: "Preparing",
      },
      {
        number: "4.4",
        title: "Support vector machines and flexible boundaries",
        href: "/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models/lessons/support-vector-machines-and-flexible-boundaries",
        status: "Preparing",
      },
      {
        number: "4.5",
        title: "Comparing models responsibly",
        href: "/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models/lessons/comparing-models-responsibly",
        status: "Preparing",
      },
    ],
  },
  {
    number: "05",
    title: "Applied Biostatistical ML Case Studies",
    href: "/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies",
    status: "Preparing",
    summary:
      "Apply the full workflow to realistic health-data projects: clinical risk prediction, survival outcomes, omics, missing data, imbalance, fairness and final reporting.",
    lessons: [
      {
        number: "5.1",
        title: "Clinical risk prediction case study",
        href: "/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies/lessons/clinical-risk-prediction-case-study",
        status: "Preparing",
      },
      {
        number: "5.2",
        title: "Survival prediction and censored outcomes",
        href: "/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies/lessons/survival-prediction-and-censored-outcomes",
        status: "Preparing",
      },
      {
        number: "5.3",
        title: "High-dimensional omics and feature selection",
        href: "/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies/lessons/high-dimensional-omics-and-feature-selection",
        status: "Preparing",
      },
      {
        number: "5.4",
        title: "Missing data, imbalance and fairness",
        href: "/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies/lessons/missing-data-imbalance-and-fairness",
        status: "Preparing",
      },
      {
        number: "5.5",
        title: "Final applied ML project in R",
        href: "/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies/lessons/final-applied-ml-project-in-r",
        status: "Preparing",
      },
    ],
  },
];

const moduleHighlights = [
  {
    title: "Module 1 is complete",
    body: "All five foundation lessons are available with lectures, detailed notes, interactive labs, R labs, reports and quizzes.",
  },
  {
    title: "25-lesson structure",
    body: "The course is organised into five modules, each containing five carefully sequenced lessons.",
  },
  {
    title: "Clinical ML focus",
    body: "The modules move from prediction thinking to supervised models, validation, modern ML and applied case studies.",
  },
];

const snapshot = [
  ["5", "Modules"],
  ["25", "Lessons"],
  ["5", "Available now"],
  ["1", "Complete module"],
];

export default function MachineLearningBiostatisticsModulesPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses/machine-learning-biostatistics")}
          className="text-sm font-bold text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to course homepage
        </a>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Course modules
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] sm:text-5xl md:text-6xl">
                Machine Learning in Biostatistics Modules
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                Explore the full five-module structure of the course, from core
                foundations to applied medical machine learning case studies.
                Module 1 is complete and ready to study.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Course route
              </p>

              <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-[#111111]">
                Start with prediction thinking before modelling.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                The sequence moves from foundational interpretation discipline
                to supervised models, validation, modern prediction methods and
                applied clinical case studies.
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
              Open Module 1
            </a>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics"
              )}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Start Lesson 1.1
            </a>

            <a
              href="#all-modules"
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              View all modules
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {snapshot.map(([value, label]) => (
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
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {moduleHighlights.map((item) => (
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

        <section
          id="all-modules"
          className="mt-8 scroll-mt-24 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10"
        >
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Full course structure
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="max-w-4xl text-3xl font-black tracking-[-0.04em] text-[#111111] md:text-5xl">
              Five modules, each with five focused lessons.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              The course is designed as a complete pathway. Students first learn
              how to think about prediction responsibly, then move into methods,
              validation, modern models and applied reporting.
            </p>
          </div>

          <div className="mt-8 grid gap-6">
            {modules.map((module) => (
              <article
                key={module.number}
                className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6 transition hover:bg-white hover:shadow-md md:p-7"
              >
                <div className="grid gap-6 lg:grid-cols-[0.18fr_1fr_0.25fr] lg:items-start">
                  <div>
                    <p className="text-5xl font-black tracking-[-0.05em] text-[#8b1116]">
                      {module.number}
                    </p>

                    <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-neutral-700">
                      Module
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.12em] ${
                          module.status === "Complete"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-white text-neutral-700"
                        }`}
                      >
                        {module.status}
                      </span>

                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-neutral-700">
                        5 lessons
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-black tracking-[-0.035em] text-[#111111] md:text-3xl">
                      {module.title}
                    </h3>

                    <p className="mt-4 max-w-4xl text-sm leading-7 text-neutral-700 md:text-base">
                      {module.summary}
                    </p>

                    <div className="mt-6 grid gap-2">
                      {module.lessons.map((lesson) => (
                        <a
                          key={lesson.href}
                          href={withBasePath(lesson.href)}
                          className={`flex flex-col gap-2 rounded-2xl border px-4 py-4 text-sm font-bold transition sm:flex-row sm:items-center sm:justify-between ${
                            lesson.status === "Available"
                              ? "border-neutral-200 bg-white text-neutral-800 hover:border-[#8b1116]/30 hover:text-[#8b1116]"
                              : "border-neutral-200 bg-white/75 text-neutral-700 hover:bg-white"
                          }`}
                        >
                          <span>
                            {lesson.number} {lesson.title}
                          </span>

                          <span
                            className={`shrink-0 text-xs font-black uppercase tracking-[0.14em] ${
                              lesson.status === "Available"
                                ? "text-emerald-700"
                                : "text-neutral-700"
                            }`}
                          >
                            {lesson.status === "Available" ? "Open" : "Ready"}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="lg:text-right">
                    <a
                      href={withBasePath(module.href)}
                      className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-5 py-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#8b1116] sm:w-auto"
                    >
                      Open module →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] bg-[#111111] p-6 text-white shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">
            Recommended path
          </p>

          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <h2 className="max-w-4xl text-3xl font-black tracking-[-0.04em] md:text-4xl">
                Start with Module 1 before moving to supervised learning.
              </h2>

              <p className="mt-5 max-w-4xl text-base leading-8 text-white/90">
                Module 1 gives students the essential judgement needed for the
                rest of the course: prediction thinking, causality caution,
                learning types, train/test validation, leakage prevention and
                workflow-based reporting.
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
                  "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data"
                )}
                className="rounded-full border border-white/25 bg-white/10 px-6 py-4 text-center text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                Preview Module 2 →
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}