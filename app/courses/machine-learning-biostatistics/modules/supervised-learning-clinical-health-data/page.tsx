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
    number: "2.1",
    title: "Regression as a prediction model",
    description:
      "Learn how regression can be used as a prediction tool, not only as an explanatory model, and how fitted values become risk estimates.",
    href: "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data/lessons/regression-as-a-prediction-model",
  },
  {
    number: "2.2",
    title: "Logistic regression as a classifier",
    description:
      "Understand logistic regression as a clinical classification model for binary outcomes, predicted probabilities and risk thresholds.",
    href: "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data/lessons/logistic-regression-as-a-classifier",
  },
  {
    number: "2.3",
    title: "k-nearest neighbours and distance-based learning",
    description:
      "Study how distance-based prediction works, why scaling matters and why local neighbourhood methods can be sensitive in health data.",
    href: "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data/lessons/k-nearest-neighbours-and-distance-based-learning",
  },
  {
    number: "2.4",
    title: "Decision trees and rule-based prediction",
    description:
      "Learn how decision trees split data into clinical decision rules, why they are interpretable and why they can easily overfit.",
    href: "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data/lessons/decision-trees-and-rule-based-prediction",
  },
  {
    number: "2.5",
    title: "Model pipelines for clinical datasets",
    description:
      "Bring supervised learning together through a clinical modelling pipeline: preprocessing, fitting, prediction, validation and reporting.",
    href: "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data/lessons/model-pipelines-for-clinical-datasets",
  },
];

const moduleStats = [
  ["5", "Lessons"],
  ["R", "Coding labs"],
  ["Preparing", "Module status"],
  ["Supervised", "Learning focus"],
];

const moduleFocus = [
  {
    title: "Regression for prediction",
    body: "Students learn to treat regression models as tools for estimating outcomes and risks for new patients.",
  },
  {
    title: "Clinical classification",
    body: "The module introduces probability-based classification, thresholds and supervised learning for health outcomes.",
  },
  {
    title: "Model workflow",
    body: "Each method is placed inside a practical clinical-data pipeline rather than taught as an isolated algorithm.",
  },
];

export default function SupervisedLearningClinicalHealthDataModulePage() {
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
            Module 2
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] sm:text-5xl md:text-6xl">
                Supervised Learning for Clinical and Health Data
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                This module moves from foundational prediction thinking into
                supervised learning methods used for clinical and health-data
                problems: regression, logistic classification, k-nearest
                neighbours, decision trees and modelling pipelines.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Module aim
              </p>

              <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-[#111111]">
                Learn core supervised models for health prediction.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                The purpose of this module is to connect familiar statistical
                models and beginner machine learning methods to prediction
                tasks in medical and public health datasets.
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
                "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data/lessons/regression-as-a-prediction-model"
              )}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#2a2a2a] sm:w-auto"
            >
              Start Lesson 2.1
            </a>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance"
              )}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Next module →
            </a>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/foundations"
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
              Study the supervised learning sequence in order.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              Each lesson introduces a different supervised learning idea, then
              connects it back to clinical prediction, model interpretation and
              responsible use with health data.
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
              Use Module 2 before studying validation and performance.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              Module 3 assumes that students understand how supervised models
              are trained, how they generate predictions and why prediction
              pipelines must be built before performance is judged.
            </p>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/model-evaluation-validation-performance"
              )}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
            >
              Continue to Module 3 →
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
              Use the course homepage to move between modules, case studies,
              datasets, scripts and the full medical machine learning pathway.
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