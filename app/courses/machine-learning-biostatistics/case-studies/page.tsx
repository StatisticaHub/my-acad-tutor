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

const caseStudies = [
  {
    number: "01",
    module: "Module 1",
    title: "Diabetes risk prediction workflow",
    status: "Available",
    href: "/courses/machine-learning-biostatistics/case-studies/diabetes-risk-prediction",
    summary:
      "A complete introductory case study showing how to define a clinical prediction question, check predictors, split data, fit a model, evaluate performance and report limitations.",
    focus: [
      "Prediction question",
      "Predictor timing",
      "Train/test split",
      "AUC and Brier score",
      "Threshold trade-offs",
      "Responsible reporting",
    ],
  },
  {
    number: "02",
    module: "Module 2",
    title: "Clinical classification with supervised learning",
    status: "Planned",
    href: "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data",
    summary:
      "A supervised learning case study comparing logistic regression, k-nearest neighbours and decision trees for a clinical binary outcome.",
    focus: [
      "Supervised learning",
      "Logistic classification",
      "K-nearest neighbours",
      "Decision trees",
      "Model comparison",
      "Clinical interpretation",
    ],
  },
  {
    number: "03",
    module: "Module 3",
    title: "Model validation and calibration case study",
    status: "Planned",
    href: "/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance",
    summary:
      "A validation-focused case study comparing apparent performance, test performance, calibration and clinical usefulness.",
    focus: [
      "Discrimination",
      "Calibration",
      "Cross-validation",
      "Bootstrap validation",
      "Decision thresholds",
      "Performance reporting",
    ],
  },
  {
    number: "04",
    module: "Module 4",
    title: "Regularised and ensemble prediction models",
    status: "Planned",
    href: "/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models",
    summary:
      "A model-comparison case study using penalised regression, random forests and boosting with careful validation and interpretation.",
    focus: [
      "Ridge regression",
      "Lasso",
      "Random forests",
      "Boosting",
      "Tuning",
      "Model comparison",
    ],
  },
  {
    number: "05",
    module: "Module 5",
    title: "Applied health-data modelling limitations",
    status: "Planned",
    href: "/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies",
    summary:
      "A final applied case study focusing on missing data, imbalance, fairness, transparent reporting and model limitations.",
    focus: [
      "Missing data",
      "Class imbalance",
      "Fairness",
      "Limitations",
      "Reporting",
      "Responsible use",
    ],
  },
];

const workflow = [
  "Define the clinical question",
  "Specify outcome timing",
  "Check predictors and leakage",
  "Split data honestly",
  "Fit a simple baseline model",
  "Evaluate discrimination and calibration",
  "Interpret thresholds",
  "Report limitations clearly",
];

export default function MachineLearningBiostatisticsCaseStudiesPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-4 py-8 text-[#111111] sm:px-5 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses/machine-learning-biostatistics")}
          className="text-sm font-semibold text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to Machine Learning in Biostatistics
        </a>

        <section className="mt-6 overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-sm md:mt-8 md:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 sm:p-6 md:p-10 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm md:tracking-[0.22em]">
                Case studies
              </p>

              <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-[1.03] tracking-[-0.055em] md:mt-5 md:text-6xl">
                Learn machine learning through health-data cases.
              </h1>

              <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-700 md:mt-6 md:text-lg md:leading-9">
                These case studies connect course theory to realistic
                biostatistical workflows: clinical question, data structure,
                prediction target, validation, interpretation and reporting.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={withBasePath(
                    "/courses/machine-learning-biostatistics/case-studies/diabetes-risk-prediction"
                  )}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8b1116] sm:w-auto md:py-4"
                >
                  Open available case study →
                </a>

                <a
                  href={withBasePath(
                    "/courses/machine-learning-biostatistics/modules/foundations"
                  )}
                  className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-semibold text-[#111111] transition hover:bg-[#f7f4ee] sm:w-auto md:py-4"
                >
                  Start Module 1
                </a>
              </div>
            </div>

            <aside className="border-t border-neutral-200 bg-[#fdfbf7] p-5 md:p-8 lg:border-l lg:border-t-0">
              <div className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2rem] md:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b1116] md:text-sm">
                  Case-study purpose
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                  Apply the full modelling workflow.
                </h2>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  Each case study is designed to show how prediction modelling
                  decisions are made, checked, interpreted and reported.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    ["5", "Case studies"],
                    ["1", "Available now"],
                    ["R", "Workflow"],
                    ["Health", "Data focus"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="rounded-[1.25rem] border border-neutral-200 bg-[#f7f4ee] p-4"
                    >
                      <p className="text-2xl font-semibold tracking-[-0.05em]">
                        {value}
                      </p>

                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:mt-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
              How to use case studies
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
              Read them like a modelling report.
            </h2>

            <p className="mt-4 text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              Do not treat a case study as only code. Focus on the question,
              assumptions, decisions, diagnostics, performance results and
              limitations.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-neutral-200 bg-[#111111] p-5 text-white shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55 md:text-sm">
              Workflow checklist
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
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
                Case-study pathway
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
                One applied case for each module.
              </h2>
            </div>

            <p className="text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              The first case study is available now. Later case studies will
              extend the same workflow to supervised learning, validation,
              regularisation, ensembles and applied health-data challenges.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:mt-8 lg:grid-cols-2">
            {caseStudies.map((study) => (
              <a
                key={study.number}
                href={withBasePath(study.href)}
                className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md md:rounded-[2rem] md:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-[#111111] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                    {study.number}
                  </span>

                  <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                    {study.status}
                  </span>
                </div>

                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#8b1116]">
                  {study.module}
                </p>

                <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.045em]">
                  {study.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  {study.summary}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {study.focus.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-neutral-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <p className="mt-6 text-sm font-semibold text-[#8b1116]">
                  {study.status === "Available" ? "Open case study" : "View related module"} →
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-neutral-200 bg-[#8b1116] p-5 text-white shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 md:text-sm">
                Recommended start
              </p>

              <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
                Begin with diabetes risk prediction.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 md:text-base md:leading-8">
                This case study shows the full introductory workflow from
                prediction question to test-set evaluation and reporting.
              </p>
            </div>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/case-studies/diabetes-risk-prediction"
              )}
              className="inline-flex w-full justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#111111] transition hover:bg-[#f7f4ee] sm:w-auto md:py-4"
            >
              Open case study →
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}
