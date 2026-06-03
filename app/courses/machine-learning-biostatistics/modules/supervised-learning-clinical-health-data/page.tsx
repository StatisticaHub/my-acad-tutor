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

const lessons = [
  {
    "number": "2.1",
    "title": "Supervised learning and labelled outcomes",
    "description": "Understand supervised learning through predictors, labelled outcomes, training examples and clinical target definitions.",
    "href": "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data/lessons/supervised-learning-labelled-outcomes"
  },
  {
    "number": "2.2",
    "title": "Regression models for prediction",
    "description": "Use regression as a prediction method and understand how fitted values, errors and prediction targets connect.",
    "href": "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data/lessons/regression-models-for-prediction"
  },
  {
    "number": "2.3",
    "title": "Logistic classification and clinical risk",
    "description": "Learn how logistic models estimate probabilities, classify patients and support binary health outcomes.",
    "href": "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data/lessons/logistic-classification-clinical-risk"
  },
  {
    "number": "2.4",
    "title": "K-nearest neighbours and decision boundaries",
    "description": "Understand neighbourhood-based classification, distance, scaling and how decision boundaries form.",
    "href": "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data/lessons/k-nearest-neighbours-decision-boundaries"
  },
  {
    "number": "2.5",
    "title": "Decision trees and clinical rules",
    "description": "Study how tree models split data, create prediction rules and why unstable rules need careful validation.",
    "href": "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data/lessons/decision-trees-clinical-rules"
  }
] as const;

const moduleStats = [
  [
    "5",
    "Lessons"
  ],
  [
    "R",
    "Labs"
  ],
  [
    "Preparing",
    "Status"
  ],
  [
    "Prediction",
    "Focus"
  ]
] as const;

const moduleFocus = [
  {
    "title": "Regression as prediction",
    "body": "Understand regression models as prediction tools, not only as explanatory statistical models."
  },
  {
    "title": "Classification",
    "body": "Learn how logistic models and classifiers estimate risk groups and binary outcomes."
  },
  {
    "title": "Clinical pipelines",
    "body": "Connect preprocessing, predictors, outcome timing and model choice into one workflow."
  }
] as const;

const outcomes = [
  "Define supervised learning",
  "Identify predictors and outcomes",
  "Use regression for prediction",
  "Understand classification tasks",
  "Explain decision trees",
  "Describe clinical prediction pipelines"
] as const;

export default function SupervisedLearningClinicalHealthDataModulePage() {
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
                Module 2 · ML in Biostatistics
              </p>

              <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-[1.03] tracking-[-0.055em] md:mt-5 md:text-6xl">
                Supervised learning for clinical health data.
              </h1>

              <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-700 md:mt-6 md:text-lg md:leading-9">
                Learn how supervised learning models use predictors and labelled outcomes to estimate risk, classify patients and support health-data prediction tasks.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={withBasePath(lessons[0].href)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8b1116] sm:w-auto md:py-4"
                >
                  Start Lesson {lessons[0].number} →
                </a>

                <a
                  href={withBasePath("/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-semibold text-[#111111] transition hover:bg-[#f7f4ee] sm:w-auto md:py-4"
                >
                  Next module
                </a>
              </div>
            </div>

            <aside className="border-t border-neutral-200 bg-[#fdfbf7] p-5 md:p-8 lg:border-l lg:border-t-0">
              <div className="rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:rounded-[2rem] md:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b1116] md:text-sm">
                  Module aim
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                  Connect model type to clinical prediction task.
                </h2>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  This module focuses on matching prediction questions to appropriate supervised learning approaches before moving into evaluation and validation.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {moduleStats.map(([value, label]) => (
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
              What this module builds
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
              Models as clinical prediction tools.
            </h2>

            <div className="mt-6 grid gap-3">
              {moduleFocus.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] p-4"
                >
                  <h3 className="text-sm font-semibold text-neutral-950">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-neutral-700">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-neutral-200 bg-[#111111] p-5 text-white shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55 md:text-sm">
              By the end
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
              You should be able to match methods to prediction problems.
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {outcomes.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white/85"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b1116] md:text-sm">
                Module lessons
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
                Study the lessons in order.
              </h2>
            </div>

            <p className="text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              The lessons move from supervised learning concepts to regression, classification, neighbours, trees and clinical prediction pipelines.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:mt-8">
            {lessons.map((lesson) => (
              <a
                key={lesson.number}
                href={withBasePath(lesson.href)}
                className="group rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md md:rounded-[2rem] md:p-6"
              >
                <div className="grid gap-4 md:grid-cols-[0.18fr_1fr_auto] md:items-center">
                  <p className="text-3xl font-semibold tracking-[-0.055em] text-[#8b1116]">
                    {lesson.number}
                  </p>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                      Lesson {lesson.number}
                    </p>

                    <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.04em]">
                      {lesson.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-neutral-700">
                      {lesson.description}
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-[#8b1116]">
                    Open →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-neutral-200 bg-[#8b1116] p-5 text-white shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 md:text-sm">
                Recommended next step
              </p>

              <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
                Move from fitting models to checking them.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 md:text-base md:leading-8">
                After learning supervised methods, the next step is evaluation: discrimination, calibration, validation, uncertainty and clinical usefulness.
              </p>
            </div>

            <a
              href={withBasePath("/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance")}
              className="inline-flex w-full justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#111111] transition hover:bg-[#f7f4ee] sm:w-auto md:py-4"
            >
              Open Module 3 →
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}
