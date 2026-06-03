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
    number: "1.1",
    title: "What is machine learning in biostatistics?",
    description:
      "Understand machine learning as a prediction-focused workflow for health data, clinical questions and biostatistical decision-making.",
    href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics",
  },
  {
    number: "1.2",
    title: "Prediction vs explanation vs causal thinking",
    description:
      "Learn why prediction, explanation and causation are different aims, and why reports must not overclaim what a model supports.",
    href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/prediction-explanation-causal-thinking",
  },
  {
    number: "1.3",
    title: "Types of learning",
    description:
      "Classify supervised, unsupervised and semi-supervised learning problems using the outcome structure and modelling goal.",
    href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/types-of-learning",
  },
  {
    number: "1.4",
    title: "Training, testing, overfitting and generalisation",
    description:
      "Understand train/test validation, overfitting, generalisation, unseen patients and the danger of data leakage.",
    href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/training-testing-overfitting-generalisation",
  },
  {
    number: "1.5",
    title: "Biostatistical ML workflow",
    description:
      "Bring the module together through a careful workflow: clinical question, predictors, validation, threshold judgement and reporting.",
    href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/biostatistical-ml-workflow",
  },
];

const moduleStats = [
  ["5", "Lessons"],
  ["R", "Coding labs"],
  ["Complete", "Module status"],
  ["Clinical", "Prediction focus"],
];

const moduleFocus = [
  {
    title: "Prediction thinking",
    body: "Students learn to define a prediction question before choosing an algorithm.",
  },
  {
    title: "Interpretation discipline",
    body: "The module separates prediction, explanation and causation to avoid unsafe claims.",
  },
  {
    title: "Validation awareness",
    body: "Training, testing, overfitting, generalisation and leakage are treated as core ideas.",
  },
];

export default function MachineLearningBiostatisticsFoundationsModulePage() {
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
            Module 1
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.05em] text-[#111111] sm:text-5xl md:text-6xl">
                Foundations of Machine Learning in Biostatistics
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                This module builds the core language of medical machine
                learning: prediction, explanation, causal caution, learning
                types, validation, overfitting, leakage and responsible
                biostatistical reporting.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Module aim
              </p>

              <h2 className="mt-4 text-2xl font-black tracking-[-0.04em] text-[#111111]">
                Build judgement before algorithms.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                The purpose of this module is to help students understand what a
                medical prediction model can and cannot support before moving
                into supervised learning methods.
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
                "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics"
              )}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#2a2a2a] sm:w-auto"
            >
              Start Lesson 1.1
            </a>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data"
              )}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Next module →
            </a>

            <a
              href={withBasePath("/courses/machine-learning-biostatistics")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Back to course
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
              Study the lessons in order.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              Each lesson adds one layer of judgement: what ML means in health
              data, how to avoid causal overclaiming, how to classify learning
              tasks, how to validate honestly and how to report a complete
              biostatistical ML workflow.
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
              Finish this module before moving into supervised learning.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              Module 2 assumes that students understand prediction questions,
              predictor timing, validation logic, overfitting, leakage and the
              difference between prediction, explanation and causation.
            </p>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data"
              )}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
            >
              Continue to Module 2 →
            </a>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-[#8b1116] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">
              Case study route
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Apply Module 1 ideas to diabetes risk prediction.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              After completing the foundation lessons, use the case study to see
              how prediction, validation, thresholds and reporting appear in a
              health-data example.
            </p>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/case-studies/diabetes-risk-prediction"
              )}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
            >
              Open case study →
            </a>
          </article>
        </section>
      </section>
    </main>
  );
}