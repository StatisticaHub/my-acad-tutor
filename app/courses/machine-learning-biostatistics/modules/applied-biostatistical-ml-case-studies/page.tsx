const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}/`;
}

const lessons = [
  {
    number: "5.1",
    title: "Clinical risk prediction case study",
    description:
      "Apply the full prediction workflow to a clinical risk prediction problem, from question definition to validation and reporting.",
    href: "/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies/lessons/clinical-risk-prediction-case-study",
  },
  {
    number: "5.2",
    title: "Survival prediction and censored outcomes",
    description:
      "Study how prediction changes when outcomes are time-to-event, censored and linked to follow-up time rather than simple binary labels.",
    href: "/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies/lessons/survival-prediction-and-censored-outcomes",
  },
  {
    number: "5.3",
    title: "High-dimensional omics and feature selection",
    description:
      "Understand prediction problems with many biomarkers, genes or molecular features, and why feature selection must be handled carefully.",
    href: "/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies/lessons/high-dimensional-omics-and-feature-selection",
  },
  {
    number: "5.4",
    title: "Missing data, imbalance and fairness",
    description:
      "Learn how missingness, class imbalance and subgroup performance affect responsible medical machine learning.",
    href: "/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies/lessons/missing-data-imbalance-and-fairness",
  },
  {
    number: "5.5",
    title: "Final applied ML project in R",
    description:
      "Bring the course together through a final applied project with data preparation, modelling, validation, interpretation and reporting.",
    href: "/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies/lessons/final-applied-ml-project-in-r",
  },
];

const moduleStats = [
  ["5", "Lessons"],
  ["R", "Applied project"],
  ["Preparing", "Module status"],
  ["Case studies", "Core focus"],
];

const moduleFocus = [
  {
    title: "Applied workflow",
    body: "Students bring together question definition, predictor timing, model fitting, validation and reporting.",
  },
  {
    title: "Health-data complexity",
    body: "The module introduces practical issues such as censoring, omics features, missing data, imbalance and subgroup performance.",
  },
  {
    title: "Report-ready thinking",
    body: "Each case study is framed around interpretation, limitations and responsible conclusions rather than model output alone.",
  },
];

export default function AppliedBiostatisticalMLCaseStudiesModulePage() {
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
            Module 5
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] sm:text-5xl md:text-6xl">
                Applied Biostatistical ML Case Studies
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                This module applies the full course workflow to realistic
                medical and biomedical machine learning problems: clinical risk
                prediction, survival outcomes, high-dimensional omics, missing
                data, imbalance, fairness and final project reporting.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Module aim
              </p>

              <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-[#111111]">
                Turn modelling knowledge into complete applied reports.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                The purpose of this module is to help students move from
                learning methods to completing transparent, clinically sensible
                and statistically responsible machine learning analyses.
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
                "/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies/lessons/clinical-risk-prediction-case-study"
              )}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#2a2a2a] sm:w-auto"
            >
              Start Lesson 5.1
            </a>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/case-studies/diabetes-risk-prediction"
              )}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Open diabetes case study
            </a>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models"
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
              Apply the full course to realistic health-data problems.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              Each lesson turns the earlier modules into applied thinking:
              defining the clinical question, handling complex data structures,
              validating honestly, interpreting carefully and reporting with
              limitations.
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
              Final route
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Complete the course through applied reporting.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              This final module is designed to connect every previous idea:
              supervised learning, validation, calibration, modern model
              comparison and responsible interpretation in real health-data
              settings.
            </p>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies/lessons/final-applied-ml-project-in-r"
              )}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
            >
              Open final project →
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
              Use the course homepage to review all five modules, open the case
              studies, download course assets and return to earlier lessons.
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