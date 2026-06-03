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
    number: "4.1",
    title: "Ridge, lasso and elastic net",
    description:
      "Learn how regularisation controls model complexity, shrinks coefficients and helps prediction models behave better with many or correlated predictors.",
    href: "/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models/lessons/ridge-lasso-and-elastic-net",
  },
  {
    number: "4.2",
    title: "Random forests",
    description:
      "Understand random forests as ensemble tree models that combine many decision trees to improve prediction stability and reduce overfitting.",
    href: "/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models/lessons/random-forests",
  },
  {
    number: "4.3",
    title: "Gradient boosting",
    description:
      "Study boosting as a sequential learning approach where models are built stage by stage to improve prediction performance.",
    href: "/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models/lessons/gradient-boosting",
  },
  {
    number: "4.4",
    title: "Support vector machines and flexible boundaries",
    description:
      "Learn how support vector machines create separating boundaries and why flexible decision boundaries need careful validation in health data.",
    href: "/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models/lessons/support-vector-machines-and-flexible-boundaries",
  },
  {
    number: "4.5",
    title: "Comparing models responsibly",
    description:
      "Bring modern prediction models together by comparing them through validation, calibration, clinical usefulness, interpretability and reporting discipline.",
    href: "/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models/lessons/comparing-models-responsibly",
  },
];

const moduleStats = [
  ["5", "Lessons"],
  ["R", "Coding labs"],
  ["Preparing", "Module status"],
  ["Modern", "Prediction focus"],
];

const moduleFocus = [
  {
    title: "Regularisation",
    body: "Students learn how shrinkage methods reduce instability and help prediction models handle many predictors.",
  },
  {
    title: "Ensemble learning",
    body: "The module introduces forests and boosting as methods that combine many simpler models into stronger predictors.",
  },
  {
    title: "Responsible comparison",
    body: "Modern models are compared through validation, calibration, usefulness and interpretability rather than accuracy alone.",
  },
];

export default function RegularisationEnsemblesModernPredictionModelsModulePage() {
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
            Module 4
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] sm:text-5xl md:text-6xl">
                Regularisation, Ensembles and Modern Prediction Models
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                This module introduces more flexible prediction tools used in
                medical machine learning: ridge regression, lasso, elastic net,
                random forests, gradient boosting, support vector machines and
                responsible model comparison.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Module aim
              </p>

              <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-[#111111]">
                Use complex models without losing judgement.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                The purpose of this module is to explain how modern prediction
                methods can improve performance while still requiring careful
                validation, calibration and clinical interpretation.
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
                "/courses/machine-learning-biostatistics/modules/regularisation-ensembles-modern-prediction-models/lessons/ridge-lasso-and-elastic-net"
              )}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#2a2a2a] sm:w-auto"
            >
              Start Lesson 4.1
            </a>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies"
              )}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Next module →
            </a>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance"
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
              Move from regularisation to modern model comparison.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              Each lesson introduces a more flexible prediction idea while
              keeping the same biostatistical standard: validate honestly,
              avoid overclaiming, check calibration and explain why the model is
              useful.
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
              Complete model comparison before applied case studies.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              Module 5 assumes that students understand classical prediction
              models, validation, performance metrics and modern model
              comparison before applying them to realistic health-data projects.
            </p>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/applied-biostatistical-ml-case-studies"
              )}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
            >
              Continue to Module 5 →
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
              Use the course homepage to review the full pathway, case studies,
              datasets, scripts and supporting course resources.
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