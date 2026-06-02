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

const thresholdResults = {
  "0.20": {
    accuracy: "0.695",
    sensitivity: "0.925",
    specificity: "0.574",
    interpretation: "Very sensitive; useful for screening but creates more false positives.",
  },
  "0.30": {
    accuracy: "0.753",
    sensitivity: "0.774",
    specificity: "0.743",
    interpretation: "More balanced; detects more positives than threshold 0.50.",
  },
  "0.40": {
    accuracy: "0.766",
    sensitivity: "0.698",
    specificity: "0.802",
    interpretation: "Moderately balanced; still more sensitive than threshold 0.50.",
  },
  "0.50": {
    accuracy: "0.779",
    sensitivity: "0.623",
    specificity: "0.861",
    interpretation: "Conservative; fewer false positives but misses more diabetes-positive patients.",
  },
  "0.60": {
    accuracy: "0.766",
    sensitivity: "0.509",
    specificity: "0.901",
    interpretation: "Highly specific; may be useful when false positives are costly.",
  },
  "0.70": {
    accuracy: "0.747",
    sensitivity: "0.415",
    specificity: "0.921",
    interpretation: "Very conservative; many diabetes-positive patients may be missed.",
  },
};

const workflowSteps = [
  ["1", "Define question", "Can routinely measured clinical features predict diabetes status?"],
  ["2", "Load data", "Use the shared diabetes prediction dataset."],
  ["3", "Split data", "Fit the model on training data and evaluate on unseen test data."],
  ["4", "Fit model", "Use logistic regression for binary prediction."],
  ["5", "Predict risk", "Generate predicted probabilities for the test set."],
  ["6", "Classify", "Convert probabilities into classes using a threshold."],
  ["7", "Evaluate", "Use confusion matrix, sensitivity, specificity, AUC and Brier score."],
  ["8", "Interpret", "Connect statistical output to clinical usefulness and limitations."],
];

const predictors = [
  ["pregnant", "Number of pregnancies"],
  ["glucose", "Plasma glucose concentration"],
  ["pressure", "Diastolic blood pressure"],
  ["triceps", "Triceps skinfold thickness"],
  ["insulin", "Serum insulin"],
  ["mass", "Body mass index"],
  ["pedigree", "Diabetes pedigree function"],
  ["age", "Age in years"],
];

export default function DiabetesRiskPredictionCaseStudyPage() {
  const [threshold, setThreshold] = useState("0.50");
  const thresholdInfo = thresholdResults[threshold as keyof typeof thresholdResults];

  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-slate-950 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <a
            href={withBasePath("/courses/machine-learning-biostatistics/case-studies")}
            className="text-sm font-black text-blue-600 transition hover:text-blue-700"
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
              Logistic regression
            </span>
            <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-black text-amber-800">
              ROC / AUC
            </span>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-black text-slate-700">
              Calibration
            </span>
          </div>

          <h1 className="mt-7 max-w-5xl text-4xl font-black tracking-tight md:text-6xl">
            Diabetes Risk Prediction
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-slate-600 md:text-lg">
            This case study applies logistic regression to the shared diabetes
            prediction dataset. The aim is not only to fit a model, but to
            interpret prediction performance using discrimination, calibration,
            threshold behaviour and clinical judgement.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {[
              ["Outcome", "Diabetes status"],
              ["Model", "Logistic regression"],
              ["Task", "Binary classification"],
              ["Dataset", "Shared diabetes data"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                  {label}
                </p>
                <p className="mt-2 text-xl font-black text-slate-950">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#results"
              className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-slate-800 sm:w-auto"
            >
              View results
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

        <section id="results" className="mt-10 scroll-mt-24">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600">
              Results first
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              What happened in this model run?
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
              {[
                ["Accuracy", "0.779", "Overall correct classifications"],
                ["Sensitivity", "0.623", "33 of 53 positives detected"],
                ["Specificity", "0.861", "87 of 101 negatives detected"],
                ["PPV", "0.702", "Precision among predicted positives"],
                ["NPV", "0.813", "Reassurance among predicted negatives"],
                ["AUC", "0.838", "Useful discrimination"],
              ].map(([label, value, note]) => (
                <div
                  key={label}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-center"
                >
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                    {label}
                  </p>
                  <p className="mt-2 text-3xl font-black text-blue-700">{value}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{note}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6">
              <h3 className="text-2xl font-black text-slate-950">
                Main interpretation
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-700">
                The model shows useful discrimination with AUC = 0.838. At the
                default threshold of 0.50, it is more specific than sensitive.
                This means it is better at identifying diabetes-negative patients
                than detecting all diabetes-positive patients.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600">
            Clinical question
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
            Can we predict whether a patient has diabetes?
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
              This is a binary classification problem. However, the goal is not
              simply to produce a class label. In medical machine learning, the
              predicted probability, threshold choice and clinical consequences
              all matter.
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600">
            Dataset
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
            Shared diabetes prediction dataset
          </h2>

          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-700">
            This case study uses the same diabetes prediction setting that will
            appear across the early machine learning modules. Keeping the dataset
            consistent helps learners focus on how modelling ideas develop:
            supervised learning, logistic regression, validation, AUC,
            calibration, thresholds and reporting.
          </p>

          <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-200">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead className="bg-slate-950 text-white">
                <tr>
                  <th className="p-4">Variable</th>
                  <th className="p-4">Clinical meaning</th>
                </tr>
              </thead>
              <tbody>
                {predictors.map(([name, meaning]) => (
                  <tr key={name} className="border-t border-slate-200">
                    <td className="p-4 font-mono font-black text-slate-950">
                      {name}
                    </td>
                    <td className="p-4 text-slate-600">{meaning}</td>
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
          <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600">
            Workflow
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
            From prediction question to interpretation
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {workflowSteps.map(([number, title, body]) => (
              <div
                key={number}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">
                  {number}
                </div>
                <h3 className="mt-4 text-lg font-black text-slate-950">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600">
            Classification results
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
            Confusion matrix at threshold 0.50
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
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6">
            <h3 className="text-2xl font-black text-slate-950">
              Clinical interpretation
            </h3>
            <p className="mt-3 text-base leading-7 text-slate-700">
              The model correctly identifies 87 of 101 diabetes-negative
              patients and 33 of 53 diabetes-positive patients. It misses 20
              diabetes-positive patients. For a screening task, this may be a
              concern because missed positives can delay follow-up.
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600">
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
        </section>

        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600">
            Calibration
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
            Are predicted risks close to observed risks?
          </h2>

          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-700">
            Calibration asks whether predicted probabilities agree with observed
            outcome frequencies. A model can have good AUC but still give poorly
            calibrated risk estimates.
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
        </section>

        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600">
            Interactive threshold lab
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
            Changing the threshold changes clinical behaviour
          </h2>

          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-700">
            A threshold converts predicted probabilities into predicted classes.
            The default threshold of 0.50 is not automatically best for medical
            decision-making.
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

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {[
                ["Accuracy", thresholdInfo.accuracy],
                ["Sensitivity", thresholdInfo.sensitivity],
                ["Specificity", thresholdInfo.specificity],
                ["Behaviour", thresholdInfo.interpretation],
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
          </div>

          <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6">
            <h3 className="text-2xl font-black text-slate-950">
              Threshold interpretation
            </h3>
            <p className="mt-3 text-base leading-7 text-slate-700">
              Lower thresholds increase sensitivity and detect more
              diabetes-positive patients, but they also create more false
              positives. Higher thresholds increase specificity, but they miss
              more diabetes-positive patients. For screening, threshold 0.50 may
              be too conservative.
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600">
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
                "Sensitivity may be too low",
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
            ].map(([title, body]) => (
              <article
                key={title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="text-lg font-black text-slate-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] bg-slate-950 p-6 text-white md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-300">
            Case study conclusion
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
            A useful model still needs careful interpretation.
          </h2>

          <p className="mt-5 max-w-4xl text-base leading-7 text-slate-300">
            The diabetes risk model shows useful discrimination with AUC = 0.838
            and Brier score = 0.149. At threshold 0.50, it is more specific than
            sensitive. This makes it relatively conservative. For screening,
            a lower threshold may be more appropriate, but that decision must be
            justified clinically.
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
              href={withBasePath("/courses/machine-learning-biostatistics/case-studies")}
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