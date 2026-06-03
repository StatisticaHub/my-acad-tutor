const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;
  return `${basePath}${href}/`;
}

const lessons = [
  {
    number: "1.1",
    title: "What is machine learning in biostatistics?",
    href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics",
    summary:
      "Understand machine learning as prediction modelling for health data, and learn why clinical questions, outcomes, predictors and validation must be defined before any algorithm is fitted.",
  },
  {
    number: "1.2",
    title: "Prediction, explanation and causal thinking",
    href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/prediction-explanation-causal-thinking",
    summary:
      "Separate prediction from explanation, association and causality so model outputs are interpreted safely in medical and biomedical research.",
  },
  {
    number: "1.3",
    title: "Types of learning",
    href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/types-of-learning",
    summary:
      "Compare supervised, unsupervised and semi-supervised learning using labelled outcomes, patient subgroup discovery and partly labelled health datasets.",
  },
  {
    number: "1.4",
    title: "Training, testing, overfitting and generalisation",
    href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/training-testing-overfitting-generalisation",
    summary:
      "Learn why models must be tested on unseen patients, how overfitting happens, and why leakage can make performance look unrealistically strong.",
  },
  {
    number: "1.5",
    title: "Biostatistical workflow for machine learning projects",
    href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/biostatistical-ml-workflow",
    summary:
      "Bring the module together through a full responsible workflow: clinical question, predictor timing, validation, threshold judgement, reporting and limitations.",
  },
];

export default function FoundationsMachineLearningModulePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">
      <section className="mx-auto max-w-6xl">
        <a
          href={withBasePath("/courses/machine-learning-biostatistics")}
          className="text-sm font-bold text-[#8b1116] hover:text-[#5f0b0f]"
        >
          ← Back to Machine Learning in Biostatistics
        </a>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Module 1
          </p>

          <h1 className="mt-4 max-w-4xl font-sans text-4xl font-black leading-[1.03] tracking-[-0.045em] text-[#111111] md:text-6xl">
            Foundations of Machine Learning in Biostatistics
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
            This module introduces prediction, explanation, causality,
            supervised learning, validation, overfitting, data leakage and the
            biostatistical workflow for responsible medical machine learning.
          </p>

          <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
            The aim is not to rush into algorithms. The aim is to understand
            what a medical machine learning project is trying to predict, when
            information is available, how performance should be tested, and how
            results should be interpreted for real health-data settings.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics"
              )}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#2a2a2a] sm:w-auto"
            >
              Start Lesson 1.1
            </a>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data"
              )}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-black text-neutral-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Next module →
            </a>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            ["Lessons", "5"],
            ["Level", "Introductory"],
            ["Focus", "Prediction"],
            ["Coding", "R + WebR"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-black uppercase tracking-[0.18em] text-neutral-700">
                {label}
              </p>
              <p className="mt-2 font-sans text-2xl font-black tracking-[-0.04em] text-[#111111]">
                {value}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Module lessons
          </p>

          <h2 className="mt-4 max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] text-[#111111] md:text-5xl">
            Learn the foundations before fitting models.
          </h2>

          <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-700">
            Each lesson builds one part of the medical machine learning
            workflow. Start with prediction thinking, then move into causal
            caution, types of learning, honest validation and final reporting.
          </p>

          <div className="mt-8 grid gap-4">
            {lessons.map((lesson) => (
              <a
                key={lesson.href}
                href={withBasePath(lesson.href)}
                className="group rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6 transition hover:-translate-y-0.5 hover:border-[#8b1116]/30 hover:bg-white hover:shadow-sm"
              >
                <div className="grid gap-5 md:grid-cols-[0.16fr_1fr_0.2fr] md:items-start">
                  <div>
                    <p className="font-sans text-3xl font-black tracking-[-0.04em] text-[#8b1116]">
                      {lesson.number}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-sans text-2xl font-black tracking-[-0.035em] text-[#111111]">
                      {lesson.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-neutral-700 md:text-base">
                      {lesson.summary}
                    </p>
                  </div>

                  <div className="md:text-right">
                    <span className="inline-flex rounded-full bg-[#111111] px-5 py-3 text-sm font-black text-white transition group-hover:bg-[#8b1116]">
                      Open lesson →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            What this module teaches
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              "How prediction modelling differs from explanation and causal analysis.",
              "Why supervised learning depends on clearly defined outcomes and predictor timing.",
              "Why training performance alone is not evidence of useful prediction.",
              "How overfitting and leakage can mislead medical ML projects.",
              "How to move from clinical question to validation, interpretation and reporting.",
              "Why responsible ML is a biostatistical workflow, not only an algorithm choice.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-neutral-200 bg-[#f7f4ee] p-5"
              >
                <p className="text-sm font-bold leading-7 text-neutral-800">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}