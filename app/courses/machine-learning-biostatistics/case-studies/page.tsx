const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${basePath}${cleanHref}${hasFileExtension ? "" : "/"}`;
}

const caseStudies = [
  {
    number: "01",
    module: "Module 1",
    moduleTitle: "Foundations of Machine Learning in Biostatistics",
    title: "Diabetes risk prediction workflow",
    href: "/courses/machine-learning-biostatistics/case-studies/diabetes-risk-prediction",
    status: "Available",
    summary:
      "A full introductory case study showing how to define a prediction question, check predictors, split data, fit a model, evaluate performance and report limitations.",
    focus: [
      "Clinical prediction question",
      "Predictor timing and leakage checks",
      "Train/test split",
      "AUC, Brier score, sensitivity and specificity",
      "Threshold trade-off interpretation",
      "Report-style conclusion",
    ],
    script:
      "/ml-biostatistics/r/case-studies/c1-diabetes-risk-prediction.R",
  },
  {
    number: "02",
    module: "Module 2",
    moduleTitle: "Supervised Learning for Clinical and Health Data",
    title: "Clinical classification with supervised learning",
    href: "/courses/machine-learning-biostatistics/case-studies/supervised-clinical-classification",
    status: "Planned",
    summary:
      "A supervised learning case study comparing logistic regression, k-nearest neighbours and decision trees for a clinical binary outcome.",
    focus: [
      "Regression as prediction",
      "Logistic classification",
      "Distance-based learning",
      "Decision tree interpretation",
      "Pipeline thinking",
      "Clinical comparison of simple models",
    ],
    script:
      "/ml-biostatistics/r/case-studies/c2-supervised-clinical-classification.R",
  },
  {
    number: "03",
    module: "Module 3",
    moduleTitle: "Model Evaluation, Validation and Performance",
    title: "Validation, calibration and decision thresholds",
    href: "/courses/machine-learning-biostatistics/case-studies/validation-calibration-thresholds",
    status: "Planned",
    summary:
      "A performance-focused case study using resampling, ROC/AUC, calibration, sensitivity, specificity and clinical threshold analysis.",
    focus: [
      "Cross-validation",
      "Bootstrap validation",
      "ROC and AUC",
      "Calibration plots",
      "Clinical usefulness",
      "Decision threshold reporting",
    ],
    script:
      "/ml-biostatistics/r/case-studies/c3-validation-calibration-thresholds.R",
  },
  {
    number: "04",
    module: "Module 4",
    moduleTitle: "Regularisation, Ensembles and Modern Prediction Models",
    title: "Modern prediction models for health data",
    href: "/courses/machine-learning-biostatistics/case-studies/modern-prediction-models-health-data",
    status: "Planned",
    summary:
      "A modern ML case study comparing regularised regression, random forests and gradient boosting while avoiding irresponsible model chasing.",
    focus: [
      "Ridge and lasso",
      "Random forests",
      "Gradient boosting",
      "Hyperparameter tuning",
      "Model comparison",
      "Responsible performance claims",
    ],
    script:
      "/ml-biostatistics/r/case-studies/c4-modern-prediction-models-health-data.R",
  },
  {
    number: "05",
    module: "Module 5",
    moduleTitle: "Applied Biostatistical ML Case Studies",
    title: "Final applied medical ML report",
    href: "/courses/machine-learning-biostatistics/case-studies/final-applied-medical-ml-report",
    status: "Planned",
    summary:
      "A capstone case study bringing together prediction modelling, validation, missing data, imbalance, fairness, interpretation and final reporting.",
    focus: [
      "End-to-end applied workflow",
      "Missing data checks",
      "Class imbalance",
      "Fairness and subgroup performance",
      "Transparent reporting",
      "Final applied R project",
    ],
    script:
      "/ml-biostatistics/r/case-studies/c5-final-applied-medical-ml-report.R",
  },
];

const caseStudyPrinciples = [
  {
    title: "One case study per module",
    body: "Each module ends with a case study that turns the lesson concepts into an applied medical ML workflow.",
  },
  {
    title: "Report-style learning",
    body: "Students do not only run code. They learn how to explain results, limitations and clinical meaning.",
  },
  {
    title: "R-based reproducibility",
    body: "Each case study is designed to have a downloadable R script, generated figures and a structured interpretation.",
  },
  {
    title: "Clinical caution",
    body: "Every case study reinforces leakage checks, validation, calibration, thresholds and responsible claims.",
  },
];

const snapshot = [
  ["5", "Planned case studies"],
  ["1", "Available now"],
  ["5", "Course modules"],
  ["R + report", "Format"],
];

export default function MachineLearningBiostatisticsCaseStudiesPage() {
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
            Applied case studies
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] sm:text-5xl md:text-6xl">
                Machine Learning in Biostatistics Case Studies
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                Each module will include one applied case study. These case
                studies connect the lessons to realistic medical machine
                learning workflows: prediction question, data structure,
                modelling, validation, threshold interpretation, reporting and
                limitations.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Case-study aim
              </p>

              <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-[#111111]">
                Turn lessons into report-ready medical ML workflows.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                The case studies are designed to help students move from model
                output to careful biostatistical interpretation, limitations and
                transparent conclusions.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/case-studies/diabetes-risk-prediction"
              )}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#2a2a2a] sm:w-auto"
            >
              Open Case Study 1
            </a>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/foundations"
              )}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Open Module 1
            </a>

            <a
              href="#case-study-list"
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              View all case studies
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {snapshot.map(([value, label]) => (
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
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {caseStudyPrinciples.map((item) => (
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
          id="case-study-list"
          className="mt-8 scroll-mt-24 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10"
        >
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Case study pathway
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="max-w-4xl text-3xl font-black tracking-[-0.04em] text-[#111111] md:text-5xl">
              Five applied projects, one for each course module.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              The case studies are designed to grow with the course. The first
              case study uses the Module 1 foundation workflow. Later case
              studies will introduce supervised learning, validation,
              calibration, modern models and final applied reporting.
            </p>
          </div>

          <div className="mt-8 grid gap-6">
            {caseStudies.map((caseStudy) => (
              <article
                key={caseStudy.number}
                className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6 transition hover:bg-white hover:shadow-md md:p-7"
              >
                <div className="grid gap-6 lg:grid-cols-[0.18fr_1fr_0.25fr] lg:items-start">
                  <div>
                    <p className="text-5xl font-black tracking-[-0.05em] text-[#8b1116]">
                      {caseStudy.number}
                    </p>

                    <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-neutral-700">
                      Case study
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.12em] ${
                          caseStudy.status === "Available"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-white text-neutral-700"
                        }`}
                      >
                        {caseStudy.status}
                      </span>

                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#8b1116]">
                        {caseStudy.module}
                      </span>
                    </div>

                    <p className="mt-4 text-sm font-black uppercase tracking-[0.18em] text-neutral-700">
                      {caseStudy.moduleTitle}
                    </p>

                    <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[#111111] md:text-3xl">
                      {caseStudy.title}
                    </h3>

                    <p className="mt-4 max-w-4xl text-sm leading-7 text-neutral-700 md:text-base">
                      {caseStudy.summary}
                    </p>

                    <div className="mt-5 grid gap-2 md:grid-cols-2">
                      {caseStudy.focus.map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-bold text-neutral-700"
                        >
                          {item}
                        </div>
                      ))}
                    </div>

                    <div className="mt-5">
                      <a
                        href={withBasePath(caseStudy.script)}
                        className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] hover:text-[#8b1116] sm:w-auto"
                      >
                        Download planned R script →
                      </a>
                    </div>
                  </div>

                  <div className="lg:text-right">
                    <a
                      href={withBasePath(caseStudy.href)}
                      className={`inline-flex w-full items-center justify-center rounded-full px-5 py-4 text-sm font-black shadow-sm transition hover:-translate-y-0.5 sm:w-auto ${
                        caseStudy.status === "Available"
                          ? "bg-[#111111] text-white hover:bg-[#8b1116]"
                          : "border border-neutral-300 bg-white text-neutral-700 hover:bg-white hover:text-[#8b1116]"
                      }`}
                    >
                      {caseStudy.status === "Available"
                        ? "Open case study →"
                        : "Preview page →"}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] bg-[#111111] p-6 text-white shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">
            Current progress
          </p>

          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <h2 className="max-w-4xl text-3xl font-black tracking-[-0.04em] md:text-4xl">
                Case Study 1 is available. Four more will be added as the course
                develops.
              </h2>

              <p className="mt-5 max-w-4xl text-base leading-8 text-white/90">
                The case-study plan mirrors the five-module course structure:
                one applied project per module. This gives students repeated
                practice in turning ML outputs into careful biostatistical
                interpretation.
              </p>
            </div>

            <div className="grid gap-3">
              <a
                href={withBasePath(
                  "/courses/machine-learning-biostatistics/case-studies/diabetes-risk-prediction"
                )}
                className="rounded-full bg-white px-6 py-4 text-center text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
              >
                Open Case Study 1 →
              </a>

              <a
                href={withBasePath(
                  "/courses/machine-learning-biostatistics/modules"
                )}
                className="rounded-full border border-white/25 bg-white/10 px-6 py-4 text-center text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                View course modules →
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}