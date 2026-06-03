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

const lessons = [
  {
    number: "3.1",
    title: "Train/test split and resampling",
    description:
      "Learn why model evaluation needs data separation, repeated resampling and a clear distinction between model fitting and model assessment.",
    href: "/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance/lessons/train-test-split-and-resampling",
  },
  {
    number: "3.2",
    title: "Cross-validation and bootstrap validation",
    description:
      "Understand cross-validation and bootstrap validation as tools for estimating model performance more honestly in limited health datasets.",
    href: "/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance/lessons/cross-validation-and-bootstrap-validation",
  },
  {
    number: "3.3",
    title: "Classification metrics: sensitivity, specificity, ROC, AUC",
    description:
      "Study classification performance using sensitivity, specificity, predictive values, ROC curves and AUC in clinical prediction settings.",
    href: "/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance/lessons/classification-metrics-sensitivity-specificity-roc-auc",
  },
  {
    number: "3.4",
    title: "Calibration, clinical usefulness and decision curves",
    description:
      "Learn why good discrimination is not enough, and how calibration and clinical usefulness shape responsible model assessment.",
    href: "/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance/lessons/calibration-clinical-usefulness-decision-curves",
  },
  {
    number: "3.5",
    title: "Bias, leakage and reproducibility in health ML",
    description:
      "Bring validation together by recognising bias, leakage, reproducibility problems and reporting weaknesses in medical machine learning.",
    href: "/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance/lessons/bias-leakage-and-reproducibility-in-health-ml",
  },
];

const moduleStats = [
  ["5", "Lessons"],
  ["R", "Coding labs"],
  ["Preparing", "Module status"],
  ["Validation", "Core focus"],
];

const moduleFocus = [
  {
    title: "Honest validation",
    body: "Students learn why apparent performance is often too optimistic when models are assessed on the same data used to build them.",
  },
  {
    title: "Clinical performance metrics",
    body: "The module explains how discrimination, sensitivity, specificity, calibration and usefulness answer different clinical questions.",
  },
  {
    title: "Reproducible assessment",
    body: "Evaluation is treated as a transparent workflow involving resampling, leakage checks, reporting discipline and reproducibility.",
  },
];

export default function ModelEvaluationValidationPerformanceModulePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses/machine-learning-biostatistics/modules")}
          className="text-sm font-bold text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to ML modules
        </a>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Module 3
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] sm:text-5xl md:text-6xl">
                Model Evaluation, Validation and Performance
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                This module focuses on how medical machine learning models
                should be assessed: train/test splits, resampling,
                cross-validation, bootstrap validation, classification metrics,
                calibration, clinical usefulness, leakage and reproducibility.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Module aim
              </p>

              <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-[#111111]">
                Judge models before trusting them.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                The purpose of this module is to show that performance is not a
                single number. A useful clinical model must be validated,
                calibrated, reproducible and relevant to the decision setting.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {moduleStats.map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-neutral-200 bg-[#f7f4ee] p-5"
              >
                <p className="text-2xl font-black tracking-[-0.04em] text-[#111111]">
                  {value}
                </p>
                <p className="mt-2 text-sm font-bold text-neutral-700">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance/lessons/train-test-split-and-resampling"
              )}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#2a2a2a] sm:w-auto"
            >
              Start Lesson 3.1
            </a>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models"
              )}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Next module →
            </a>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data"
              )}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Previous module
            </a>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {moduleFocus.map((item) => (
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

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Module lessons
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="max-w-4xl text-3xl font-black tracking-[-0.04em] text-[#111111] md:text-4xl">
              Study model evaluation as a full workflow.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              Each lesson adds a different evaluation layer: data splitting,
              resampling, classification metrics, calibration, clinical
              usefulness, leakage prevention and reproducible reporting.
            </p>
          </div>

          <div className="mt-8 grid gap-5">
            {lessons.map((lesson) => (
              <a
                key={lesson.number}
                href={withBasePath(lesson.href)}
                className="group rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-md md:p-7"
              >
                <div className="grid gap-5 md:grid-cols-[0.18fr_1fr_auto] md:items-center">
                  <div>
                    <p className="text-3xl font-black tracking-[-0.05em] text-[#8b1116]">
                      {lesson.number}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-neutral-700">
                      Lesson {lesson.number}
                    </p>

                    <h3 className="mt-2 text-2xl font-black leading-tight tracking-[-0.04em] text-[#111111]">
                      {lesson.title}
                    </h3>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-700">
                      {lesson.description}
                    </p>
                  </div>

                  <p className="text-sm font-black text-[#8b1116] transition group-hover:translate-x-1">
                    Open lesson →
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-[#111111] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">
              Learning route
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Complete validation before moving to modern prediction models.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              Module 4 assumes students understand how to evaluate models
              honestly. Regularisation, forests and boosting are only useful
              when their performance is judged with careful validation.
            </p>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models"
              )}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
            >
              Continue to Module 4 →
            </a>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-[#8b1116] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">
              Course pathway
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Return to the full ML in Biostatistics course.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              Use the course homepage to review modules, scripts, datasets,
              case studies and the full clinical prediction learning pathway.
            </p>

            <a
              href={withBasePath("/courses/machine-learning-biostatistics")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
            >
              Back to course →
            </a>
          </article>
        </section>
      </section>
    </main>
  );
}