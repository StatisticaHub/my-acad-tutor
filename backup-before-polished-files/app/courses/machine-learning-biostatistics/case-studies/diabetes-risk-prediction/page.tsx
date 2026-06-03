"use client";

import { useState } from "react";

const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;
  return `${basePath}${href}`;
}

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
      "This threshold is aggressive. It catches most diabetes-positive patients, but many diabetes-negative patients are also flagged.",
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
      "This threshold may be useful when the clinical aim is to avoid missing positives while keeping false positives manageable.",
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
      "Moderately balanced; still more sensitive than threshold 0.50.",
    clinicalBehaviour:
      "This threshold gives a middle-ground option, with fewer false positives than 0.30 but more missed positives.",
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
      "This threshold is relatively specific. It is better at ruling out diabetes-negative patients than detecting every diabetes-positive patient.",
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
      "This threshold is useful only if the cost of false positives is very high. It is not ideal for screening.",
  },
};

const workflowSteps = [
  {
    number: "1",
    title: "Define the prediction question",
    body: "State exactly what the model should predict, for whom, and at what point in the clinical pathway.",
    output: "Can routinely measured clinical features predict diabetes status?",
  },
  {
    number: "2",
    title: "Check the dataset",
    body: "Inspect the outcome, predictors, class balance, missingness and whether each variable has a plausible clinical meaning.",
    output: "Outcome: diabetes status. Predictors include glucose, BMI/mass, age, pressure, insulin and pedigree.",
  },
  {
    number: "3",
    title: "Protect against leakage",
    body: "Ask whether every predictor would be available at the true prediction time.",
    output: "No predictor should contain future diagnosis, treatment or follow-up information.",
  },
  {
    number: "4",
    title: "Split data",
    body: "Fit the model on training data and evaluate it on held-out test data.",
    output: "Training/test separation gives a more honest estimate of generalisation.",
  },
  {
    number: "5",
    title: "Fit the model",
    body: "Use logistic regression because the outcome is binary and the aim is risk prediction.",
    output: "The model estimates predicted probability of diabetes.",
  },
  {
    number: "6",
    title: "Evaluate discrimination",
    body: "Use ROC and AUC to assess whether predicted risks rank positives above negatives.",
    output: "AUC = 0.838, suggesting useful discrimination.",
  },
  {
    number: "7",
    title: "Evaluate threshold behaviour",
    body: "Convert predicted probabilities into classes and examine sensitivity, specificity, PPV and NPV.",
    output: "At threshold 0.50, sensitivity = 0.623 and specificity = 0.861.",
  },
  {
    number: "8",
    title: "Report limitations",
    body: "Explain what the model can and cannot support. Avoid claiming clinical readiness from one internal case study.",
    output: "External validation, calibration assessment and clinical usefulness analysis are still needed.",
  },
];

const predictors = [
  {
    name: "pregnant",
    meaning: "Number of pregnancies",
    timing: "Should be available before prediction",
    caution: "Context-dependent; interpret carefully across populations.",
  },
  {
    name: "glucose",
    meaning: "Plasma glucose concentration",
    timing: "Should be available before prediction",
    caution: "Strong predictive marker, but not automatically causal evidence.",
  },
  {
    name: "pressure",
    meaning: "Diastolic blood pressure",
    timing: "Should be available before prediction",
    caution: "May contribute weakly depending on the population.",
  },
  {
    name: "triceps",
    meaning: "Triceps skinfold thickness",
    timing: "Should be available before prediction",
    caution: "Measurement quality can vary.",
  },
  {
    name: "insulin",
    meaning: "Serum insulin",
    timing: "Should be available before prediction",
    caution: "May be missing or clinically unavailable in some settings.",
  },
  {
    name: "mass",
    meaning: "Body mass index",
    timing: "Should be available before prediction",
    caution: "Predictive, but interpretation should avoid causal overclaiming.",
  },
  {
    name: "pedigree",
    meaning: "Diabetes pedigree function",
    timing: "Should be available before prediction",
    caution: "Represents family-history-related risk information.",
  },
  {
    name: "age",
    meaning: "Age in years",
    timing: "Available before prediction",
    caution: "Usually safe from leakage, but may interact with other risk factors.",
  },
];

const metricCards = [
  {
    label: "Accuracy",
    value: "0.779",
    note: "Overall proportion correctly classified.",
    interpretation:
      "Useful as a broad summary, but not enough because the outcome is imbalanced.",
  },
  {
    label: "Sensitivity",
    value: "0.623",
    note: "33 of 53 positives detected.",
    interpretation:
      "The model misses 20 diabetes-positive patients at threshold 0.50.",
  },
  {
    label: "Specificity",
    value: "0.861",
    note: "87 of 101 negatives correctly identified.",
    interpretation:
      "The model is stronger at identifying diabetes-negative patients.",
  },
  {
    label: "PPV",
    value: "0.702",
    note: "Precision among predicted positives.",
    interpretation:
      "When the model predicts positive, about 70% are truly positive in this test set.",
  },
  {
    label: "NPV",
    value: "0.813",
    note: "Reassurance among predicted negatives.",
    interpretation:
      "When the model predicts negative, about 81% are truly negative in this test set.",
  },
  {
    label: "AUC",
    value: "0.838",
    note: "Useful discrimination.",
    interpretation:
      "The model has useful ranking ability, but AUC alone does not prove clinical usefulness.",
  },
  {
    label: "Brier score",
    value: "0.149",
    note: "Prediction error for probabilities.",
    interpretation:
      "Lower is better. It summarises how close predicted probabilities are to observed outcomes.",
  },
  {
    label: "Threshold",
    value: "0.50",
    note: "Default classification cut-off.",
    interpretation:
      "The default threshold is not automatically the best clinical threshold.",
  },
];

const interpretationChecklist = [
  {
    title: "Prediction question",
    body: "The model estimates diabetes risk using routinely measured variables. It does not prove why diabetes occurs.",
  },
  {
    title: "Target population",
    body: "The model should only be applied to patients similar to the population represented in the dataset.",
  },
  {
    title: "Prediction time",
    body: "Every predictor must be available before the model is used. Future information would create leakage.",
  },
  {
    title: "Discrimination",
    body: "AUC = 0.838 suggests the model separates positives from negatives reasonably well.",
  },
  {
    title: "Calibration",
    body: "The calibration plot should be reviewed because good ranking does not guarantee accurate probabilities.",
  },
  {
    title: "Threshold",
    body: "Threshold 0.50 gives higher specificity than sensitivity. It may be too conservative for screening.",
  },
  {
    title: "Clinical usefulness",
    body: "A model is useful only if its predictions can support a meaningful action.",
  },
  {
    title: "Limitations",
    body: "External validation and fuller clinical evaluation are needed before real-world use.",
  },
];

export default function DiabetesRiskPredictionCaseStudyPage() {
  const [threshold, setThreshold] = useState("0.50");
  const thresholdInfo = thresholdResults[threshold];

  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-slate-950 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <a
            href={withBasePath(
              "/courses/machine-learning-biostatistics/case-studies"
            )}
            className="text-sm font-black text-[#6f0d12] transition hover:text-[#5f0b0f]"
          >
            ← Back to case studies
          </a>

          <a
            href={withBasePath("/courses/machine-learning-biostatistics")}
            className="hidden rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-black text-slate-700 shadow-sm sm:inline-flex"
          >
            ML in Biostatistics
          </a>
        </div>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-black text-blue-800">
              Case Study 1
            </span>
            <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-black text-emerald-800">
              Module 1 applied workflow
            </span>
            <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-black text-amber-800">
              Logistic regression
            </span>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-black text-slate-700">
              ROC · AUC · calibration · thresholds
            </span>
          </div>

          <h1 className="mt-7 max-w-5xl text-4xl font-black tracking-tight md:text-6xl">
            Diabetes Risk Prediction Workflow
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-slate-600 md:text-lg">
            This case study applies the Module 1 foundation workflow to a
            diabetes prediction problem. The aim is not only to fit a logistic
            regression model, but to interpret the model like a biostatistician:
            define the prediction question, check predictor timing, evaluate
            discrimination and calibration, study threshold behaviour and report
            limitations honestly.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {[
              ["Outcome", "Diabetes status"],
              ["Model", "Logistic regression"],
              ["Task", "Binary prediction"],
              ["Main result", "AUC 0.838"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                  {label}
                </p>
                <p className="mt-2 text-xl font-black text-slate-950">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#executive-summary"
              className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-slate-800 sm:w-auto"
            >
              Read summary
            </a>

            <a
              href="#results"
              className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 sm:w-auto"
            >
              View results
            </a>

            <a
              href="#threshold-lab"
              className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 sm:w-auto"
            >
              Threshold lab
            </a>

            <a
              href={withBasePath(
                "/ml-biostatistics/r/case-studies/c1-diabetes-risk-prediction.R"
              )}
              download
              className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 sm:w-auto"
            >
              Download R script
            </a>
          </div>
        </section>

        <section
          id="executive-summary"
          className="mt-10 scroll-mt-24 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10"
        >
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#6f0d12]">
            Executive summary
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
            What does this case study show?
          </h2>

          <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5 text-base leading-8 text-slate-700">
              <p>
                The model shows useful discrimination for diabetes status, with
                test-set AUC = <strong>0.838</strong> and Brier score ={" "}
                <strong>0.149</strong>. At the default threshold of{" "}
                <strong>0.50</strong>, the model achieves accuracy ={" "}
                <strong>0.779</strong>, sensitivity = <strong>0.623</strong> and
                specificity = <strong>0.861</strong>.
              </p>

              <p>
                The model is more specific than sensitive at threshold 0.50. It
                correctly identifies most diabetes-negative patients, but misses
                some diabetes-positive patients. This matters because a model
                intended for screening may require higher sensitivity.
              </p>

              <p>
                The key lesson is that performance is not one number. AUC,
                calibration, sensitivity, specificity, predictive values,
                thresholds, leakage risk and clinical consequences all need to
                be interpreted together.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-950 p-6 text-white">
              <h3 className="text-2xl font-black">Case-study conclusion</h3>
              <p className="mt-4 text-base leading-8 text-slate-300">
                This is a useful teaching model, not a deployable clinical tool.
                It demonstrates a responsible prediction workflow, but external
                validation, calibration assessment and clinical usefulness
                analysis would be needed before real-world use.
              </p>
            </div>
          </div>
        </section>

        <section id="results" className="mt-10 scroll-mt-24">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#6f0d12]">
              Results first
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              Model performance summary
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {metricCards.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                >
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-3xl font-black text-blue-700">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-xs font-black leading-5 text-slate-500">
                    {metric.note}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {metric.interpretation}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6">
              <h3 className="text-2xl font-black text-slate-950">
                Main interpretation
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-700">
                The model has useful discrimination, but at threshold 0.50 it is
                more conservative than sensitive. It produces fewer false
                positives, but it misses 20 diabetes-positive patients. Whether
                this is acceptable depends on the clinical purpose of the model.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#6f0d12]">
            Clinical question
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
            Can routinely measured clinical variables predict diabetes status?
          </h2>

          <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
            <p>
              The outcome is diabetes status, coded as positive or negative.
              The model uses routinely measured patient characteristics to
              estimate the probability that a patient is diabetes-positive.
            </p>

            <p className="rounded-3xl bg-slate-950 p-6 text-xl font-black leading-8 text-white">
              Prediction question: using available clinical variables, can we
              estimate a patient’s probability of diabetes?
            </p>

            <p>
              This is a binary prediction problem. However, the goal is not
              simply to output “positive” or “negative”. In medical machine
              learning, predicted probabilities, thresholds, false positives,
              false negatives and clinical actions all matter.
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#6f0d12]">
            Dataset and predictors
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
            Shared diabetes prediction dataset
          </h2>

          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-700">
            This case study uses the same diabetes prediction setting that
            appears across the early course modules. Keeping the dataset
            consistent helps learners focus on how the modelling ideas develop:
            supervised learning, logistic regression, validation, AUC,
            calibration, thresholds, leakage and reporting.
          </p>

          <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-200">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead className="bg-slate-950 text-white">
                <tr>
                  <th className="p-4">Variable</th>
                  <th className="p-4">Clinical meaning</th>
                  <th className="p-4">Timing check</th>
                  <th className="p-4">Interpretation caution</th>
                </tr>
              </thead>
              <tbody>
                {predictors.map((predictor) => (
                  <tr key={predictor.name} className="border-t border-slate-200">
                    <td className="p-4 font-mono font-black text-slate-950">
                      {predictor.name}
                    </td>
                    <td className="p-4 text-slate-600">{predictor.meaning}</td>
                    <td className="p-4 text-slate-600">{predictor.timing}</td>
                    <td className="p-4 text-slate-600">{predictor.caution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <figure className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <img
              src={withBasePath(
                "/ml-biostatistics/figures/case-study-1/diabetes-outcome-distribution.png"
              )}
              alt="Diabetes outcome distribution"
              className="w-full rounded-2xl border border-slate-200 bg-white"
            />
            <figcaption className="mt-4 text-sm leading-6 text-slate-600">
              The dataset contains more diabetes-negative than diabetes-positive
              patients. This class imbalance means accuracy alone should not be
              used as the only performance measure.
            </figcaption>
          </figure>
        </section>

        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#6f0d12]">
            Workflow
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
            From prediction question to clinical interpretation
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {workflowSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">
                  {step.number}
                </div>
                <h3 className="mt-4 text-lg font-black text-slate-950">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {step.body}
                </p>
                <p className="mt-4 rounded-2xl bg-white p-3 text-xs font-bold leading-5 text-slate-600">
                  <span className="text-slate-950">Output:</span> {step.output}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#6f0d12]">
            Confusion matrix
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
            Classification results at threshold 0.50
          </h2>

          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-700">
            The model produces predicted probabilities. To create predicted
            classes, we apply a threshold. At threshold 0.50, patients with
            predicted risk at or above 0.50 are classified as diabetes-positive.
          </p>

          <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-200">
            <table className="w-full min-w-[620px] border-collapse text-center text-sm">
              <thead className="bg-slate-950 text-white">
                <tr>
                  <th className="p-4"></th>
                  <th className="p-4">Predicted negative</th>
                  <th className="p-4">Predicted positive</th>
                  <th className="p-4">Clinical meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200">
                  <th className="bg-slate-50 p-4 text-left font-black">
                    Observed negative
                  </th>
                  <td className="bg-emerald-50 p-4 text-2xl font-black text-emerald-700">
                    87
                  </td>
                  <td className="bg-rose-50 p-4 text-2xl font-black text-rose-700">
                    14
                  </td>
                  <td className="p-4 text-left text-slate-600">
                    87 true negatives and 14 false positives.
                  </td>
                </tr>
                <tr className="border-t border-slate-200">
                  <th className="bg-slate-50 p-4 text-left font-black">
                    Observed positive
                  </th>
                  <td className="bg-rose-50 p-4 text-2xl font-black text-rose-700">
                    20
                  </td>
                  <td className="bg-emerald-50 p-4 text-2xl font-black text-emerald-700">
                    33
                  </td>
                  <td className="p-4 text-left text-slate-600">
                    33 true positives and 20 false negatives.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
              <h3 className="text-2xl font-black text-slate-950">
                Why false negatives matter
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-700">
                False negatives are diabetes-positive patients predicted as
                negative. In this case study, there are 20 false negatives at
                threshold 0.50. For screening, this may be concerning because
                these patients may not receive timely follow-up.
              </p>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
              <h3 className="text-2xl font-black text-slate-950">
                Why false positives matter
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-700">
                False positives are diabetes-negative patients predicted as
                positive. In this case study, there are 14 false positives at
                threshold 0.50. These may cause extra testing, cost or anxiety.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#6f0d12]">
            Discrimination
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
            ROC curve and AUC
          </h2>

          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-700">
            The ROC curve shows the trade-off between sensitivity and
            specificity across many thresholds. The AUC summarises
            discrimination: how well the model ranks diabetes-positive patients
            above diabetes-negative patients.
          </p>

          <figure className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <img
              src={withBasePath(
                "/ml-biostatistics/figures/case-study-1/diabetes-roc-curve.png"
              )}
              alt="ROC curve for diabetes prediction model"
              className="w-full rounded-2xl border border-slate-200 bg-white"
            />
            <figcaption className="mt-4 text-sm leading-6 text-slate-600">
              The test-set AUC is 0.838, suggesting useful discrimination in this
              educational example. AUC does not assess calibration and does not
              choose the clinical threshold.
            </figcaption>
          </figure>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-black text-slate-950">
              Interpretation of AUC = 0.838
            </h3>
            <p className="mt-3 text-base leading-8 text-slate-700">
              AUC can be interpreted as a ranking measure. If we randomly choose
              one diabetes-positive patient and one diabetes-negative patient,
              an AUC of 0.838 means the model often assigns a higher predicted
              risk to the diabetes-positive patient. However, AUC does not tell
              us whether predicted probabilities are numerically accurate or
              whether a chosen threshold is clinically appropriate.
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#6f0d12]">
            Calibration
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
            Are predicted risks close to observed risks?
          </h2>

          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-700">
            Calibration asks whether predicted probabilities agree with observed
            outcome frequencies. A model can have good AUC but still give poorly
            calibrated risk estimates. This matters because clinical decisions
            often use the predicted probability itself, not only the rank order.
          </p>

          <figure className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <img
              src={withBasePath(
                "/ml-biostatistics/figures/case-study-1/diabetes-calibration-plot.png"
              )}
              alt="Calibration plot for diabetes prediction model"
              className="w-full rounded-2xl border border-slate-200 bg-white"
            />
            <figcaption className="mt-4 text-sm leading-6 text-slate-600">
              The calibration plot broadly follows the diagonal but is unstable
              in some risk groups. This is expected with limited test-set size.
              The Brier score is 0.149.
            </figcaption>
          </figure>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-black text-slate-950">
              Interpretation of Brier score = 0.149
            </h3>
            <p className="mt-3 text-base leading-8 text-slate-700">
              The Brier score measures the average squared difference between
              observed outcomes and predicted probabilities. It rewards
              predictions that are both confident and correct, and penalises
              confident wrong predictions. The value is useful for comparing
              models, but it should be reported with discrimination and
              threshold-based metrics.
            </p>
          </div>
        </section>

        <section
          id="threshold-lab"
          className="mt-10 scroll-mt-24 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10"
        >
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#6f0d12]">
            Interactive threshold lab
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
            Changing the threshold changes clinical behaviour
          </h2>

          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-700">
            A threshold converts predicted probabilities into predicted classes.
            The default threshold of 0.50 is not automatically best for medical
            decision-making. Move the slider to see how the model changes.
          </p>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <label className="text-sm font-black uppercase tracking-[0.18em] text-slate-600">
              Threshold: {threshold}
            </label>

            <input
              type="range"
              min={20}
              max={70}
              step={10}
              value={Number(threshold) * 100}
              onChange={(event) =>
                setThreshold((Number(event.target.value) / 100).toFixed(2))
              }
              className="mt-5 w-full"
            />

            <div className="mt-6 grid gap-4 md:grid-cols-5">
              {[
                ["Accuracy", thresholdInfo.accuracy],
                ["Sensitivity", thresholdInfo.sensitivity],
                ["Specificity", thresholdInfo.specificity],
                ["PPV", thresholdInfo.ppv],
                ["NPV", thresholdInfo.npv],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                    {label}
                  </p>
                  <p className="mt-2 text-lg font-black text-slate-950">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {[
                ["True positive", thresholdInfo.tp],
                ["False positive", thresholdInfo.fp],
                ["True negative", thresholdInfo.tn],
                ["False negative", thresholdInfo.fn],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                    {label}
                  </p>
                  <p className="mt-2 text-2xl font-black text-blue-700">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
              <h3 className="text-2xl font-black text-slate-950">
                Threshold interpretation
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-700">
                {thresholdInfo.interpretation}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-2xl font-black text-slate-950">
                Clinical behaviour
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-700">
                {thresholdInfo.clinicalBehaviour}
              </p>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-200">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead className="bg-slate-950 text-white">
                <tr>
                  <th className="p-4">Threshold</th>
                  <th className="p-4">Accuracy</th>
                  <th className="p-4">Sensitivity</th>
                  <th className="p-4">Specificity</th>
                  <th className="p-4">PPV</th>
                  <th className="p-4">NPV</th>
                  <th className="p-4">Interpretation</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(thresholdResults).map(([key, row]) => (
                  <tr key={key} className="border-t border-slate-200">
                    <td className="p-4 font-black text-slate-950">{key}</td>
                    <td className="p-4 text-slate-600">{row.accuracy}</td>
                    <td className="p-4 text-slate-600">{row.sensitivity}</td>
                    <td className="p-4 text-slate-600">{row.specificity}</td>
                    <td className="p-4 text-slate-600">{row.ppv}</td>
                    <td className="p-4 text-slate-600">{row.npv}</td>
                    <td className="p-4 text-slate-600">{row.interpretation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#6f0d12]">
            Interpretation checklist
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
            How should a biostatistician interpret this model?
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {interpretationChecklist.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="text-lg font-black text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#6f0d12]">
            Limitations
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
            What should we be careful about?
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              [
                "Accuracy is not enough",
                "Accuracy of 0.779 hides the balance between false negatives and false positives.",
              ],
              [
                "Sensitivity may be too low for screening",
                "At threshold 0.50, the model misses 20 diabetes-positive patients.",
              ],
              [
                "AUC is not calibration",
                "AUC tells us about ranking, not whether probabilities are numerically accurate.",
              ],
              [
                "Thresholds require clinical judgement",
                "The best threshold depends on the consequences of false positives and false negatives.",
              ],
              [
                "External validation is needed",
                "Performance in one teaching dataset does not guarantee performance in another population.",
              ],
              [
                "Prediction is not causation",
                "Model coefficients and predictors should not be interpreted as causal effects.",
              ],
              [
                "Data quality matters",
                "Clinical variables can be noisy, missing, differently measured or unavailable in real workflows.",
              ],
              [
                "Clinical action must be defined",
                "A risk score is useful only if it supports an action such as follow-up, testing or monitoring.",
              ],
            ].map(([title, body]) => (
              <article
                key={title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="text-lg font-black text-slate-950">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#6f0d12]">
            Report-style conclusion
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
            How to write this case study in a report
          </h2>

          <div className="mt-6 rounded-3xl bg-slate-950 p-6 text-white">
            <p className="text-base leading-8 text-slate-300">
              A logistic regression model was fitted to predict diabetes status
              using routinely measured clinical characteristics. The model
              achieved AUC = 0.838 and Brier score = 0.149 in the test data,
              suggesting useful discrimination and moderate probability
              accuracy in this educational example. At the default threshold of
              0.50, accuracy was 0.779, sensitivity was 0.623 and specificity
              was 0.861. The model was therefore more specific than sensitive,
              correctly identifying most diabetes-negative patients but missing
              20 diabetes-positive patients. Threshold analysis showed that
              lower thresholds increased sensitivity but produced more false
              positives, while higher thresholds increased specificity but
              missed more positives. This model should be interpreted as a
              teaching example of a prediction workflow, not as a clinically
              deployable tool. External validation, fuller calibration
              assessment and evaluation of clinical usefulness would be needed
              before real-world use.
            </p>
          </div>

          <div className="mt-8 rounded-3xl border border-red-100 bg-red-50 p-6">
            <h3 className="text-xl font-black text-slate-950">
              What not to write
            </h3>
            <p className="mt-3 text-base leading-8 text-slate-700">
              Do not write: “The model is good because accuracy is 0.779.”
              Accuracy alone is incomplete. A strong case-study interpretation
              must discuss sensitivity, specificity, AUC, calibration,
              threshold choice, false positives, false negatives, leakage risk
              and limitations.
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] bg-slate-950 p-6 text-white md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-300">
            Case study conclusion
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
            A useful model still needs careful interpretation.
          </h2>

          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300">
            The diabetes risk model shows useful discrimination with AUC = 0.838
            and Brier score = 0.149. At threshold 0.50, it is more specific than
            sensitive. This makes it relatively conservative. For screening, a
            lower threshold may be more appropriate, but that decision must be
            justified by the clinical context.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={withBasePath(
                "/ml-biostatistics/r/case-studies/c1-diabetes-risk-prediction.R"
              )}
              download
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100 sm:w-auto"
            >
              Download R script
            </a>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/foundations"
              )}
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10 sm:w-auto"
            >
              Back to Module 1
            </a>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/case-studies"
              )}
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10 sm:w-auto"
            >
              Back to case studies
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}