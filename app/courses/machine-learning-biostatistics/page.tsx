import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Machine Learning in Biostatistics",
  description:
    "A health-data focused machine learning course covering prediction, validation, calibration, overfitting, leakage and responsible modelling.",
};

const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

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
    title: "Foundations of ML in Biostatistics",
    href: "/courses/machine-learning-biostatistics/modules/foundations",
    status: "Available",
    summary:
      "Prediction targets, supervised learning, train/test validation, overfitting, leakage and responsible workflow.",
    lessons: "5 lessons",
  },
  {
    number: "02",
    title: "Supervised Learning for Health Data",
    href: "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data",
    status: "Preparing",
    summary:
      "Regression as prediction, logistic classification, k-nearest neighbours, decision trees and clinical pipelines.",
    lessons: "5 lessons",
  },
  {
    number: "03",
    title: "Evaluation and Validation",
    href: "/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance",
    status: "Preparing",
    summary:
      "Cross-validation, bootstrap validation, classification metrics, calibration, leakage checks and reproducibility.",
    lessons: "5 lessons",
  },
  {
    number: "04",
    title: "Regularisation and Ensembles",
    href: "/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models",
    status: "Preparing",
    summary:
      "Ridge, lasso, elastic net, random forests, gradient boosting and responsible model comparison.",
    lessons: "5 lessons",
  },
  {
    number: "05",
    title: "Applied Biostatistical Case Studies",
    href: "/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies",
    status: "Preparing",
    summary:
      "Risk prediction, survival outcomes, omics, missing data, imbalance, fairness and transparent reporting.",
    lessons: "5 lessons",
  },
];

const snapshot = [
  ["5", "Modules"],
  ["25", "Lessons"],
  ["R", "Practical workflow"],
  ["Health", "Data focus"],
];

const learningFocus = [
  "Clinical prediction rather than generic machine learning",
  "Validation, calibration and usefulness explained carefully",
  "Overfitting and leakage treated as central topics",
  "R-based workflow with interpretation-first teaching",
  "Case studies based on health-data modelling questions",
  "Clear links between statistics, biostatistics and ML",
];

const workflow = [
  "Define the clinical question",
  "Define outcome and prediction time",
  "Choose candidate predictors carefully",
  "Split data honestly",
  "Train and tune models",
  "Evaluate discrimination and calibration",
  "Interpret usefulness and limitations",
  "Report transparently",
];

const assets = [
  {
    label: "Download shared diabetes CSV",
    href: "/ml-biostatistics/data/shared-diabetes-prediction-data.csv",
  },
  {
    label: "Lesson 1.1 R script",
    href: "/ml-biostatistics/r/module-1/lesson-1-1-what-is-ml-biostatistics.R",
  },
  {
    label: "Lesson 1.2 R script",
    href: "/ml-biostatistics/r/module-1/lesson-1-2-prediction-explanation-causality.R",
  },
  {
    label: "Lesson 1.3 R script",
    href: "/ml-biostatistics/r/module-1/lesson-1-3-types-of-learning.R",
  },
];

export default function MachineLearningBiostatisticsCoursePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-4 py-8 text-[#111111] sm:px-5 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses")}
          className="text-sm font-semibold text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to courses
        </a>

        <section className="mt-6 overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-sm md:mt-8 md:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 sm:p-6 md:p-10 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm md:tracking-[0.22em]">
                Machine Learning in Biostatistics
              </p>

              <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-[1.03] tracking-[-0.055em] md:mt-5 md:text-6xl">
                Learn prediction modelling for health data.
              </h1>

              <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-700 md:mt-6 md:text-lg md:leading-9">
                A biostatistics-focused machine learning course for students who
                want to understand prediction, validation, calibration,
                overfitting, leakage and responsible model interpretation.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={withBasePath(
                    "/courses/machine-learning-biostatistics/modules/foundations"
                  )}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8b1116] sm:w-auto md:py-4"
                >
                  Start Module 1 →
                </a>

                <a
                  href={withBasePath(
                    "/courses/machine-learning-biostatistics/case-studies/diabetes-risk-prediction"
                  )}
                  className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-semibold text-[#111111] transition hover:bg-[#f7f4ee] sm:w-auto md:py-4"
                >
                  Open case study
                </a>
              </div>
            </div>

            <aside className="border-t border-neutral-200 bg-[#fdfbf7] p-5 md:p-8 lg:border-l lg:border-t-0">
              <div className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2rem] md:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b1116] md:text-sm">
                  Course snapshot
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {snapshot.map(([value, label]) => (
                    <div
                      key={label}
                      className="rounded-[1.35rem] border border-neutral-200 bg-[#f7f4ee] p-4"
                    >
                      <p className="text-3xl font-semibold tracking-[-0.06em]">
                        {value}
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-sm leading-7 text-neutral-700">
                  Best for students moving from statistics into clinical
                  prediction, medical machine learning and health data science.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:mt-8 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
              Learning focus
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
              Prediction first, complexity later.
            </h2>

            <div className="mt-6 grid gap-3">
              {learningFocus.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-semibold text-neutral-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-neutral-200 bg-[#111111] p-5 text-white shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55 md:text-sm">
              Biostatistical workflow
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
              A model is only useful if the workflow is honest.
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {workflow.map((item, index) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white/85"
                >
                  {String(index + 1).padStart(2, "0")} · {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
                Modules
              </p>

              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.045em] md:text-5xl">
                Learn clinical ML in a careful sequence.
              </h2>
            </div>

            <p className="text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              The course starts with prediction thinking and validation, then
              moves into supervised methods, model evaluation, modern algorithms
              and applied case studies.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:mt-8 lg:grid-cols-2">
            {modules.map((module) => (
              <a
                key={module.title}
                href={withBasePath(module.href)}
                className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md md:rounded-[2rem] md:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-[#111111] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                    {module.number}
                  </span>

                  <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                    {module.status}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.045em]">
                  {module.title}
                </h3>

                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8b1116]">
                  {module.lessons}
                </p>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  {module.summary}
                </p>

                <p className="mt-5 text-sm font-semibold text-[#8b1116]">
                  Open module →
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:mt-8 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
              Case study
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
              Diabetes risk prediction.
            </h2>

            <p className="mt-4 text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              Work through a realistic clinical prediction example: define the
              outcome, separate training and test data, evaluate discrimination,
              interpret calibration and discuss limitations.
            </p>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/case-studies/diabetes-risk-prediction"
              )}
              className="mt-6 inline-flex w-full justify-center rounded-full bg-[#111111] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8b1116] sm:w-auto md:py-4"
            >
              Open case study →
            </a>
          </article>

          <article className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
              Course files
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
              Data and scripts.
            </h2>

            <div className="mt-6 grid gap-3">
              {assets.map((asset) => (
                <a
                  key={asset.href}
                  href={withBasePath(asset.href)}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-white hover:text-[#8b1116]"
                >
                  {asset.label} →
                </a>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-neutral-200 bg-[#8b1116] p-5 text-white shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 md:text-sm">
                Recommended start
              </p>

              <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
                Start with prediction, not algorithms.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 md:text-base md:leading-8">
                The first module explains why target definition, timing,
                validation and leakage prevention matter before choosing a
                complex model.
              </p>
            </div>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/foundations"
              )}
              className="inline-flex w-full justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#111111] transition hover:bg-[#f7f4ee] sm:w-auto md:py-4"
            >
              Start Module 1 →
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}
