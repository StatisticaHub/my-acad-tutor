import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/sections/SectionHeading";
import LessonUnitCard from "@/components/course/LessonUnitCard";

const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  return `${basePath}${href}/`;
}

const modules = [
  {
    number: "01",
    title: "Foundations of Medical Machine Learning",
    description:
      "This module explains what machine learning means in biostatistics and how prediction differs from statistical inference.",
    lessons: [
      {
        title: "What is machine learning in biostatistics?",
        description:
          "Understand machine learning as a set of tools for learning patterns from health data, not as magic.",
        href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning",
        hasCoding: false,
      },
      {
        title: "Prediction versus inference",
        description:
          "Learn why predicting a patient outcome and estimating an interpretable effect are different goals.",
        href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/prediction-vs-inference",
        hasCoding: false,
      },
      {
        title: "Outcomes, predictors and prediction time points",
        description:
          "Define the outcome, available predictors and prediction time point before choosing any model.",
        href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/outcomes-predictors-timepoints",
        hasCoding: false,
      },
    ],
  },
  {
    number: "02",
    title: "Validation, Overfitting and Leakage",
    description:
      "This module explains why medical models can look impressive but fail when tested properly.",
    lessons: [
      {
        title: "Training, testing and validation",
        description:
          "Understand internal validation, test sets, cross-validation and external validation.",
        href: "/courses/machine-learning-biostatistics/modules/validation/lessons/training-testing-validation",
        hasCoding: true,
      },
      {
        title: "Overfitting and optimism",
        description:
          "Learn why models can perform too well on the development data and poorly on new patients.",
        href: "/courses/machine-learning-biostatistics/modules/validation/lessons/overfitting-optimism",
        hasCoding: true,
      },
      {
        title: "Data leakage in medical machine learning",
        description:
          "Understand how future information, duplicated patients and improper preprocessing can create misleading performance.",
        href: "/courses/machine-learning-biostatistics/modules/validation/lessons/data-leakage",
        hasCoding: false,
      },
    ],
  },
  {
    number: "03",
    title: "Supervised Learning for Health Data",
    description:
      "Students learn how common supervised learning methods are used for clinical prediction problems.",
    lessons: [
      {
        title: "Regression and classification",
        description:
          "Compare continuous outcomes, binary outcomes and multi-class prediction problems.",
        href: "/courses/machine-learning-biostatistics/modules/supervised-learning/lessons/regression-classification",
        hasCoding: true,
      },
      {
        title: "Logistic regression as a baseline model",
        description:
          "Understand why logistic regression remains an important baseline model in medical prediction.",
        href: "/courses/machine-learning-biostatistics/modules/supervised-learning/lessons/logistic-regression-baseline",
        hasCoding: true,
      },
      {
        title: "Tree-based models",
        description:
          "Learn the intuition behind decision trees, random forests and gradient boosting in health data.",
        href: "/courses/machine-learning-biostatistics/modules/supervised-learning/lessons/tree-based-models",
        hasCoding: true,
      },
    ],
  },
  {
    number: "04",
    title: "Model Performance and Calibration",
    description:
      "This module teaches how to evaluate whether a model is useful, reliable and clinically interpretable.",
    lessons: [
      {
        title: "Discrimination and ROC curves",
        description:
          "Understand sensitivity, specificity, ROC curves and AUC in medical prediction.",
        href: "/courses/machine-learning-biostatistics/modules/performance-calibration/lessons/roc-auc",
        hasCoding: true,
      },
      {
        title: "Calibration",
        description:
          "Learn why predicted risks must agree with observed risks, especially in clinical decision-making.",
        href: "/courses/machine-learning-biostatistics/modules/performance-calibration/lessons/calibration",
        hasCoding: true,
      },
      {
        title: "Clinical usefulness",
        description:
          "Understand decision thresholds, net benefit and whether a model would actually help in practice.",
        href: "/courses/machine-learning-biostatistics/modules/performance-calibration/lessons/clinical-usefulness",
        hasCoding: false,
      },
    ],
  },
  {
    number: "05",
    title: "Survival and High-Dimensional Medical Data",
    description:
      "Students connect machine learning ideas to time-to-event outcomes and high-dimensional biomedical datasets.",
    lessons: [
      {
        title: "Survival prediction",
        description:
          "Understand censored outcomes, survival probabilities and prediction over time.",
        href: "/courses/machine-learning-biostatistics/modules/survival-high-dimensional/lessons/survival-prediction",
        hasCoding: true,
      },
      {
        title: "High-dimensional predictors",
        description:
          "Learn why omics and high-dimensional health data require careful feature selection and validation.",
        href: "/courses/machine-learning-biostatistics/modules/survival-high-dimensional/lessons/high-dimensional-predictors",
        hasCoding: false,
      },
      {
        title: "Responsible model reporting",
        description:
          "Understand transparent reporting, limitations and why performance claims must be cautious.",
        href: "/courses/machine-learning-biostatistics/modules/survival-high-dimensional/lessons/responsible-reporting",
        hasCoding: false,
      },
    ],
  },
];

const lessonParts = [
  "Lecture: conversational explanation using recurring characters, clinical examples and model intuition.",
  "Detailed notes: theory, equations, statistical reasoning, diagrams, worked examples and interpretation.",
  "Interactive components: visual model behaviour, performance metrics and validation examples where useful.",
  "Coding practice: included for modelling, validation and metric-based lessons.",
  "Quiz: conceptual and applied questions after every lesson.",
];

export default function MachineLearningBiostatisticsCoursePage() {
  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="bg-slate-950 px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-3">
            <Badge variant="green">Biostatistics</Badge>
            <Badge variant="violet">Premium pathway</Badge>
          </div>

          <h1 className="mt-6 max-w-5xl text-5xl font-bold tracking-tight md:text-7xl">
            Machine Learning in Biostatistics.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
            A 5-module course on medical machine learning, prediction,
            validation, overfitting, leakage, calibration, survival prediction
            and responsible clinical interpretation.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/foundations/lessons/prediction-vs-inference"
              )}
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Open sample lesson
            </a>

            <a
              href={withBasePath("/pathways/biostatistics")}
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              View biostatistics pathway
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">Modules</p>
            <p className="mt-2 text-lg font-bold text-slate-950">5</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">
              Lesson format
            </p>
            <p className="mt-2 text-lg font-bold text-slate-950">
              Lecture, Notes, Coding, Quiz
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">Level</p>
            <p className="mt-2 text-lg font-bold text-slate-950">
              Intermediate
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">Launch</p>
            <p className="mt-2 text-lg font-bold text-slate-950">July 2026</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Lesson structure"
            title="Each lesson is built like a complete learning unit."
            description="The course combines conversational teaching, detailed notes, clinical examples, optional coding practice and quizzes."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {lessonParts.map((part) => (
              <div
                key={part}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700 shadow-sm"
              >
                {part}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Course modules"
            title="Five modules from clinical questions to model reporting."
            description="The course is organised around the full medical machine learning workflow."
          />

          <div className="mt-12 space-y-8">
            {modules.map((module) => (
              <div
                key={module.number}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="grid gap-6 md:grid-cols-[80px_1fr]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                    {module.number}
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                      {module.title}
                    </h2>

                    <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
                      {module.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-3">
                  {module.lessons.map((lesson) => (
                    <LessonUnitCard
                      key={lesson.title}
                      title={lesson.title}
                      description={lesson.description}
                      href={withBasePath(lesson.href)}
                      hasCoding={lesson.hasCoding}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}