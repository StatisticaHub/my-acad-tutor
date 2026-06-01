import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/sections/SectionHeading";

const modules = [
  {
    number: "01",
    title: "Foundations of Medical Machine Learning",
    lessons:
      "Prediction versus inference, clinical questions, outcome definition and medical data structure.",
  },
  {
    number: "02",
    title: "Validation, Overfitting and Leakage",
    lessons:
      "Train-test splits, cross-validation, external validation, overfitting, optimism and data leakage.",
  },
  {
    number: "03",
    title: "Supervised Learning for Health Data",
    lessons:
      "Regression, classification, logistic models, tree-based models and clinical interpretation.",
  },
  {
    number: "04",
    title: "Model Performance and Calibration",
    lessons:
      "Discrimination, calibration, ROC curves, sensitivity, specificity, predictive values and clinical usefulness.",
  },
  {
    number: "05",
    title: "Survival and High-Dimensional Medical Data",
    lessons:
      "Survival prediction, censoring, omics data, feature selection and responsible model reporting.",
  },
];

const features = [
  "Medical examples throughout",
  "Prediction versus inference explained clearly",
  "Validation and leakage warnings",
  "Clinical interpretation focus",
  "Model performance metrics",
  "Premium case-study direction",
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
            A research-focused course on medical machine learning, prediction,
            validation, overfitting, leakage, calibration and clinical interpretation.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/courses/machine-learning-biostatistics/lessons/prediction-vs-inference"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Open sample lesson
            </a>

            <a
              href="/pathways/biostatistics"
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
            <p className="text-sm font-semibold text-slate-500">Level</p>
            <p className="mt-2 text-lg font-bold text-slate-950">Intermediate</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">Launch</p>
            <p className="mt-2 text-lg font-bold text-slate-950">July 2026</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">Access</p>
            <p className="mt-2 text-lg font-bold text-slate-950">
              Premium preview
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">Best for</p>
            <p className="mt-2 text-lg font-bold text-slate-950">
              Health data learners
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Course structure"
            title="Medical machine learning without shortcuts."
            description="The course focuses on how machine learning should be understood, validated and interpreted in biomedical research."
          />

          <div className="mt-12 grid gap-6">
            {modules.map((module) => (
              <div
                key={module.number}
                className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[80px_1fr]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                  {module.number}
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-950">
                    {module.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {module.lessons}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Clinical focus"
              title="Models must be useful, valid and interpretable."
              description="This course avoids treating machine learning as magic. It teaches medical prediction as a careful modelling workflow with validation, calibration and clinical context."
            />
          </div>

          <div className="grid gap-4">
            {features.map((feature) => (
              <div
                key={feature}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-800"
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-emerald-600 p-8 text-white md:p-12">
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
            Start with prediction versus inference.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-50">
            The first sample lesson explains why prediction and inference are different
            goals in medical research.
          </p>

          <div className="mt-8">
            <a
              href="/courses/machine-learning-biostatistics/lessons/prediction-vs-inference"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
            >
              Open sample lesson
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}