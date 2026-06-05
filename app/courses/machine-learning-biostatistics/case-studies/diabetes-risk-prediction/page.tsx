"use client";

import { useState } from "react";

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

const rScriptHref =
  "/ml-biostatistics/r/case-studies/c1-diabetes-risk-prediction.R";

const csvHref = "/ml-biostatistics/data/shared-diabetes-prediction-data.csv";

const figures = {
  outcome:
    "/ml-biostatistics/figures/case-study-1/diabetes-outcome-distribution.png",
  roc: "/ml-biostatistics/figures/case-study-1/diabetes-roc-curve.png",
  calibration:
    "/ml-biostatistics/figures/case-study-1/diabetes-calibration-plot.png",
};

const thresholdResults: Record<
  string,
  {
    accuracy: string;
    sensitivity: string;
    specificity: string;
    ppv: string;
    npv: string;
    tp: string;
    fp: string;
    tn: string;
    fn: string;
    interpretation: string;
    clinicalBehaviour: string;
  }
> = {
  "0.20": {
    accuracy: "0.695",
    sensitivity: "0.925",
    specificity: "0.574",
    ppv: "0.544",
    npv: "0.936",
    tp: "49",
    fp: "43",
    tn: "58",
    fn: "4",
    interpretation:
      "Very sensitive; useful for screening but creates more false positives.",
    clinicalBehaviour:
      "This threshold catches most diabetes-positive patients, but many diabetes-negative patients are also flagged.",
  },
  "0.30": {
    accuracy: "0.753",
    sensitivity: "0.774",
    specificity: "0.743",
    ppv: "0.612",
    npv: "0.862",
    tp: "41",
    fp: "26",
    tn: "75",
    fn: "12",
    interpretation:
      "More balanced; detects more positives than threshold 0.50.",
    clinicalBehaviour:
      "This threshold may be useful when the aim is to avoid missing positives while keeping false positives manageable.",
  },
  "0.40": {
    accuracy: "0.766",
    sensitivity: "0.698",
    specificity: "0.802",
    ppv: "0.649",
    npv: "0.835",
    tp: "37",
    fp: "20",
    tn: "81",
    fn: "16",
    interpretation:
      "Middle-ground threshold with fewer false positives than 0.30 but more missed positives.",
    clinicalBehaviour:
      "This gives a compromise between screening behaviour and conservative classification.",
  },
  "0.50": {
    accuracy: "0.779",
    sensitivity: "0.623",
    specificity: "0.861",
    ppv: "0.702",
    npv: "0.813",
    tp: "33",
    fp: "14",
    tn: "87",
    fn: "20",
    interpretation:
      "Conservative; fewer false positives but misses more diabetes-positive patients.",
    clinicalBehaviour:
      "This threshold is stronger at ruling out diabetes-negative patients than detecting every positive patient.",
  },
  "0.60": {
    accuracy: "0.766",
    sensitivity: "0.509",
    specificity: "0.901",
    ppv: "0.730",
    npv: "0.777",
    tp: "27",
    fp: "10",
    tn: "91",
    fn: "26",
    interpretation:
      "Highly specific; may be useful when false positives are costly.",
    clinicalBehaviour:
      "This threshold avoids many false positives, but almost half of diabetes-positive patients are missed.",
  },
  "0.70": {
    accuracy: "0.747",
    sensitivity: "0.415",
    specificity: "0.921",
    ppv: "0.733",
    npv: "0.750",
    tp: "22",
    fp: "8",
    tn: "93",
    fn: "31",
    interpretation:
      "Very conservative; many diabetes-positive patients may be missed.",
    clinicalBehaviour:
      "This is only sensible if false positives are very costly. It is not ideal for screening.",
  },
};

const metricCards = [
  {
    label: "AUC",
    value: "0.838",
    note: "Useful discrimination",
    interpretation:
      "The model ranks diabetes-positive patients above diabetes-negative patients reasonably well.",
  },
  {
    label: "Brier score",
    value: "0.149",
    note: "Probability error",
    interpretation:
      "Lower is better. This summarises how close predicted probabilities are to observed outcomes.",
  },
  {
    label: "Accuracy",
    value: "0.779",
    note: "Overall correctness",
    interpretation:
      "Useful as a broad summary, but incomplete because false negatives and false positives have different consequences.",
  },
  {
    label: "Sensitivity",
    value: "0.623",
    note: "33 of 53 positives detected",
    interpretation:
      "At threshold 0.50, the model misses 20 diabetes-positive patients.",
  },
  {
    label: "Specificity",
    value: "0.861",
    note: "87 of 101 negatives identified",
    interpretation:
      "The model is stronger at identifying diabetes-negative patients.",
  },
  {
    label: "PPV",
    value: "0.702",
    note: "Precision among predicted positives",
    interpretation:
      "When the model predicts positive, about 70% are truly positive in this test set.",
  },
  {
    label: "NPV",
    value: "0.813",
    note: "Reassurance among predicted negatives",
    interpretation:
      "When the model predicts negative, about 81% are truly negative in this test set.",
  },
  {
    label: "Threshold",
    value: "0.50",
    note: "Default classification cut-off",
    interpretation:
      "The default threshold is not automatically the best clinical threshold.",
  },
];

const predictors = [
  ["pregnant", "Number of pregnancies", "Available before prediction"],
  ["glucose", "Plasma glucose concentration", "Strong predictive marker"],
  ["pressure", "Diastolic blood pressure", "May contribute weakly"],
  ["triceps", "Triceps skinfold thickness", "Measurement quality can vary"],
  ["insulin", "Serum insulin", "May be missing or unavailable"],
  ["mass", "Body mass index", "Predictive, but not automatically causal"],
  ["pedigree", "Diabetes pedigree function", "Family-history-related risk"],
  ["age", "Age in years", "Usually safe from leakage"],
];

const workflowSteps = [
  "Define the prediction question",
  "Check outcome and predictors",
  "Protect against leakage",
  "Split data honestly",
  "Fit a baseline model",
  "Evaluate discrimination",
  "Evaluate calibration",
  "Study threshold behaviour",
  "Report limitations",
];

const checklist = [
  {
    title: "Prediction question",
    body: "The model estimates diabetes risk. It does not explain why diabetes occurs.",
  },
  {
    title: "Target population",
    body: "The model should only be applied to patients similar to the dataset population.",
  },
  {
    title: "Prediction time",
    body: "Every predictor must be available before the model is used.",
  },
  {
    title: "Discrimination",
    body: "AUC = 0.838 suggests useful ranking ability.",
  },
  {
    title: "Calibration",
    body: "The calibration plot must be checked because good ranking does not guarantee accurate probabilities.",
  },
  {
    title: "Threshold choice",
    body: "Threshold 0.50 is specific but may be too conservative for screening.",
  },
  {
    title: "Clinical usefulness",
    body: "A model is useful only if predictions support a meaningful clinical action.",
  },
  {
    title: "Limitations",
    body: "External validation is needed before real-world use.",
  },
];

const limitations = [
  "Accuracy alone is not enough.",
  "Sensitivity may be too low for screening.",
  "AUC does not measure calibration.",
  "Thresholds require clinical judgement.",
  "External validation is needed.",
  "Prediction is not causation.",
  "Data quality and measurement timing matter.",
  "Clinical action must be defined.",
];

export default function DiabetesRiskPredictionCaseStudyPage() {
  const [threshold, setThreshold] = useState("0.50");
  const thresholdInfo = thresholdResults[threshold];

  return (
    <main className="min-h-screen bg-[#F7F3EA] px-4 py-8 text-[#141210] sm:px-5 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath(
            "/courses/machine-learning-biostatistics/case-studies"
          )}
          className="text-sm font-semibold text-[#741018] transition hover:text-[#4d080e]"
        >
          ← Back to case studies
        </a>

        <section className="mt-6 overflow-hidden rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm md:mt-8 md:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 sm:p-6 md:p-10 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#741018] md:text-sm md:tracking-[0.22em]">
                Case Study 1 · Logistic regression
              </p>

              <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-[1.03] tracking-[-0.055em] md:mt-5 md:text-6xl">
                Diabetes risk prediction workflow.
              </h1>

              <p className="mt-5 max-w-4xl text-base leading-8 text-[#525252] md:mt-6 md:text-lg md:leading-9">
                A complete applied case study showing how to define a clinical
                prediction question, check predictors, fit a logistic regression
                model, evaluate performance and report limitations responsibly.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#results"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#11100E] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#741018] sm:w-auto md:py-4"
                >
                  View results →
                </a>

                <a
                  href="#threshold-lab"
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#D8CDBB] bg-[#FFFCF6] px-6 py-3.5 text-sm font-semibold text-[#141210] transition hover:bg-[#F7F3EA] sm:w-auto md:py-4"
                >
                  Threshold lab
                </a>
              </div>
            </div>

            <aside className="border-t border-[#E4DED2] bg-[#fdfbf7] p-5 md:p-8 lg:border-l lg:border-t-0">
              <div className="rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:rounded-[2rem] md:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#741018] md:text-sm">
                  Case snapshot
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    ["AUC", "0.838"],
                    ["Brier", "0.149"],
                    ["Model", "Logistic"],
                    ["Task", "Binary"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-[1.25rem] border border-[#E4DED2] bg-[#F7F3EA] p-4"
                    >
                      <p className="text-2xl font-semibold tracking-[-0.05em]">
                        {value}
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#7a7063]">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-3">
                  <a
                    href={withBasePath(rScriptHref)}
                    download
                    className="rounded-full bg-[#11100E] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#741018]"
                  >
                    Download R script →
                  </a>

                  <a
                    href={withBasePath(csvHref)}
                    download
                    className="rounded-full border border-[#D8CDBB] bg-[#FFFCF6] px-5 py-3 text-center text-sm font-semibold text-[#141210] transition hover:bg-[#F7F3EA]"
                  >
                    Download CSV →
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section
          id="results"
          className="mt-6 scroll-mt-24 rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#741018] md:text-sm">
            Results first
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
            Model performance summary.
          </h2>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-[#525252] md:text-base md:leading-8">
            At threshold 0.50, the model is more specific than sensitive. It
            identifies most diabetes-negative patients, but misses some
            diabetes-positive patients. For screening, this may be too
            conservative.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {metricCards.map((metric) => (
              <article
                key={metric.label}
                className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7a7063]">
                  {metric.label}
                </p>

                <p className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-[#741018]">
                  {metric.value}
                </p>

                <p className="mt-2 text-xs font-semibold leading-5 text-[#525252]">
                  {metric.note}
                </p>

                <p className="mt-3 text-sm leading-6 text-[#525252]">
                  {metric.interpretation}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:mt-8 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#741018] md:text-sm">
              Prediction question
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
              Can routine clinical variables predict diabetes status?
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#525252] md:text-base md:leading-8">
              This is a binary prediction task. The model estimates predicted
              probability of diabetes using available clinical predictors. The
              goal is prediction, not causal explanation.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-[#E4DED2] bg-[#11100E] p-5 text-white shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55 md:text-sm">
              Main conclusion
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
              Useful teaching model, not a deployable tool.
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/75 md:text-base md:leading-8">
              AUC = 0.838 suggests useful discrimination, but external
              validation, calibration assessment and clinical usefulness
              analysis would be needed before real-world use.
            </p>
          </article>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#741018] md:text-sm">
            Dataset and predictors
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
            Shared diabetes prediction dataset.
          </h2>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-[#525252] md:text-base md:leading-8">
            The same diabetes prediction dataset appears across the early
            course modules so learners can focus on how the modelling workflow
            develops.
          </p>

          <div className="mt-6 overflow-x-auto rounded-[1.5rem] border border-[#E4DED2]">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead className="bg-[#11100E] text-white">
                <tr>
                  <th className="p-4">Variable</th>
                  <th className="p-4">Meaning</th>
                  <th className="p-4">Interpretation caution</th>
                </tr>
              </thead>
              <tbody>
                {predictors.map(([name, meaning, caution]) => (
                  <tr key={name} className="border-t border-[#E4DED2]">
                    <td className="p-4 font-mono font-semibold text-[#141210]">
                      {name}
                    </td>
                    <td className="p-4 text-[#525252]">{meaning}</td>
                    <td className="p-4 text-[#525252]">{caution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <figure className="mt-6 rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-4 md:p-5">
            <img
              src={withBasePath(figures.outcome)}
              alt="Diabetes outcome distribution"
              className="w-full rounded-[1.25rem] border border-[#E4DED2] bg-[#FFFCF6]"
            />

            <figcaption className="mt-4 text-sm leading-6 text-[#525252]">
              The dataset contains more diabetes-negative than diabetes-positive
              patients. This means accuracy alone is not enough.
            </figcaption>
          </figure>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#741018] md:text-sm">
            Workflow
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
            From question to interpretation.
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {workflowSteps.map((step, index) => (
              <div
                key={step}
                className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
              >
                <p className="text-2xl font-semibold tracking-[-0.05em] text-[#741018]">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <p className="mt-3 text-sm font-semibold leading-6 text-neutral-800">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:mt-8 lg:grid-cols-2">
          <FigureCard
            eyebrow="Discrimination"
            title="ROC curve and AUC"
            body="The ROC curve shows the trade-off between sensitivity and specificity across thresholds. AUC = 0.838 suggests useful ranking ability in this educational example."
            src={figures.roc}
            alt="ROC curve for diabetes prediction model"
          />

          <FigureCard
            eyebrow="Calibration"
            title="Predicted risk calibration"
            body="Calibration asks whether predicted probabilities agree with observed outcome frequencies. A model can rank patients well but still give poorly calibrated probabilities."
            src={figures.calibration}
            alt="Calibration plot for diabetes prediction model"
          />
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#741018] md:text-sm">
            Confusion matrix
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
            Classification at threshold 0.50.
          </h2>

          <div className="mt-6 overflow-x-auto rounded-[1.5rem] border border-[#E4DED2]">
            <table className="w-full min-w-[620px] border-collapse text-center text-sm">
              <thead className="bg-[#11100E] text-white">
                <tr>
                  <th className="p-4"></th>
                  <th className="p-4">Predicted negative</th>
                  <th className="p-4">Predicted positive</th>
                  <th className="p-4">Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-[#E4DED2]">
                  <th className="bg-[#F7F3EA] p-4 text-left font-semibold">
                    Observed negative
                  </th>
                  <td className="p-4 text-2xl font-semibold text-emerald-700">
                    87
                  </td>
                  <td className="p-4 text-2xl font-semibold text-rose-700">
                    14
                  </td>
                  <td className="p-4 text-left text-[#525252]">
                    87 true negatives and 14 false positives.
                  </td>
                </tr>

                <tr className="border-t border-[#E4DED2]">
                  <th className="bg-[#F7F3EA] p-4 text-left font-semibold">
                    Observed positive
                  </th>
                  <td className="p-4 text-2xl font-semibold text-rose-700">
                    20
                  </td>
                  <td className="p-4 text-2xl font-semibold text-emerald-700">
                    33
                  </td>
                  <td className="p-4 text-left text-[#525252]">
                    33 true positives and 20 false negatives.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section
          id="threshold-lab"
          className="mt-6 scroll-mt-24 rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#741018] md:text-sm">
            Interactive threshold lab
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
            Changing the threshold changes clinical behaviour.
          </h2>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-[#525252] md:text-base md:leading-8">
            Lower thresholds usually increase sensitivity but create more false
            positives. Higher thresholds usually increase specificity but miss
            more positives.
          </p>

          <div className="mt-6 rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-4 md:p-5">
            <div className="flex flex-wrap gap-2">
              {Object.keys(thresholdResults).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setThreshold(key)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    threshold === key
                      ? "bg-[#11100E] text-white"
                      : "border border-[#E4DED2] bg-[#FFFCF6] text-[#525252] hover:text-[#741018]"
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Accuracy", thresholdInfo.accuracy],
                ["Sensitivity", thresholdInfo.sensitivity],
                ["Specificity", thresholdInfo.specificity],
                ["PPV", thresholdInfo.ppv],
                ["NPV", thresholdInfo.npv],
                ["TP", thresholdInfo.tp],
                ["FP", thresholdInfo.fp],
                ["FN", thresholdInfo.fn],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-[1.25rem] border border-[#E4DED2] bg-[#FFFCF6] p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7a7063]">
                    {label}
                  </p>

                  <p className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-[#141210]">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-3 lg:grid-cols-2">
              <div className="rounded-[1.5rem] border border-[#E4DED2] bg-[#FFFCF6] p-5">
                <h3 className="text-xl font-semibold tracking-[-0.04em]">
                  Threshold interpretation
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#525252]">
                  {thresholdInfo.interpretation}
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-[#E4DED2] bg-[#FFFCF6] p-5">
                <h3 className="text-xl font-semibold tracking-[-0.04em]">
                  Clinical behaviour
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#525252]">
                  {thresholdInfo.clinicalBehaviour}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:mt-8 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#741018] md:text-sm">
              Interpretation checklist
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
              How should this model be interpreted?
            </h2>

            <div className="mt-6 grid gap-3">
              {checklist.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] p-4"
                >
                  <p className="text-sm font-semibold text-[#141210]">
                    {item.title}
                  </p>

                  <p className="mt-2 text-sm leading-7 text-[#525252]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-[#E4DED2] bg-[#11100E] p-5 text-white shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55 md:text-sm">
              Limitations
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
              What should we be careful about?
            </h2>

            <div className="mt-6 grid gap-3">
              {limitations.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-[#FFFCF6]/[0.06] px-4 py-3 text-sm font-semibold text-white/85"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#741018] md:text-sm">
            Report-style conclusion
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
            How to write this case study in a report.
          </h2>

          <div className="mt-6 rounded-[1.5rem] bg-[#11100E] p-5 text-white md:p-6">
            <p className="text-sm leading-7 text-white/75 md:text-base md:leading-8">
              A logistic regression model was fitted to predict diabetes status
              using routinely measured clinical characteristics. The model
              achieved AUC = 0.838 and Brier score = 0.149 in the test data,
              suggesting useful discrimination and moderate probability accuracy
              in this educational example. At threshold 0.50, accuracy was
              0.779, sensitivity was 0.623 and specificity was 0.861. The model
              was therefore more specific than sensitive, correctly identifying
              most diabetes-negative patients but missing 20 diabetes-positive
              patients. This model should be interpreted as a teaching example
              of a prediction workflow, not as a clinically deployable tool.
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-[#E4DED2] bg-[#741018] p-5 text-white shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 md:text-sm">
                Case study conclusion
              </p>

              <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
                A useful model still needs careful interpretation.
              </h2>

              <p className="mt-4 max-w-4xl text-sm leading-7 text-white/80 md:text-base md:leading-8">
                The diabetes risk model shows useful discrimination, but
                threshold choice, calibration, validation and clinical usefulness
                must be interpreted before any real-world use.
              </p>
            </div>

            <div className="grid gap-3">
              <a
                href={withBasePath(rScriptHref)}
                download
                className="inline-flex w-full justify-center rounded-full bg-[#FFFCF6] px-6 py-3.5 text-sm font-semibold text-[#141210] transition hover:bg-[#F7F3EA] sm:w-auto md:py-4"
              >
                Download R script →
              </a>

              <a
                href={withBasePath(
                  "/courses/machine-learning-biostatistics/modules/foundations"
                )}
                className="inline-flex w-full justify-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#FFFCF6]/10 sm:w-auto md:py-4"
              >
                Back to Module 1 →
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function FigureCard({
  eyebrow,
  title,
  body,
  src,
  alt,
}: {
  eyebrow: string;
  title: string;
  body: string;
  src: string;
  alt: string;
}) {
  return (
    <figure className="rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#741018] md:text-sm">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
        {title}
      </h2>

      <p className="mt-4 text-sm leading-7 text-[#525252] md:text-base md:leading-8">
        {body}
      </p>

      <img
        src={withBasePath(src)}
        alt={alt}
        className="mt-6 w-full rounded-[1.25rem] border border-[#E4DED2] bg-[#F7F3EA]"
      />
    </figure>
  );
}
