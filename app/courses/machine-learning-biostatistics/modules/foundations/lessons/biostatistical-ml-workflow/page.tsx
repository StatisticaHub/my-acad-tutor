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

let cachedWebR: any = null;

async function getWebR() {
  if (cachedWebR) return cachedWebR;

  const { WebR } = await import("webr");
  const webR = new WebR();
  await webR.init();

  cachedWebR = webR;
  return webR;
}

const tabs = [
  { id: "lecture", label: "Lecture" },
  { id: "notes", label: "Detailed notes" },
  { id: "interactive", label: "Interactive lab" },
  { id: "coding", label: "R coding lab" },
  { id: "report", label: "Report" },
  { id: "quiz", label: "Quiz" },
];

const figures = [
  {
    title: "Biostatistical machine learning workflow",
    src: "/ml-biostatistics/figures/module-1/lesson-1-5-workflow-roadmap.png",
    alt: "Workflow roadmap from clinical question to reporting.",
    interpretation:
      "A responsible ML project starts before model fitting. The workflow begins with the clinical question, target population, outcome and prediction time, then moves to modelling, validation, threshold choice and reporting.",
  },
  {
    title: "Predicted diabetes risk in the test data",
    src: "/ml-biostatistics/figures/module-1/lesson-1-5-predicted-risk-distribution.png",
    alt: "Histogram of predicted diabetes risk in the test data by observed diabetes status.",
    interpretation:
      "Predicted probabilities should be interpreted as risks, not diagnoses. A threshold is needed if the model will classify patients into risk groups.",
  },
  {
    title: "Threshold trade-off",
    src: "/ml-biostatistics/figures/module-1/lesson-1-5-threshold-tradeoff.png",
    alt: "Line plot showing sensitivity, specificity and accuracy across thresholds.",
    interpretation:
      "Lower thresholds detect more diabetes-positive patients but create more false positives. Higher thresholds reduce false positives but miss more true positives.",
  },
  {
    title: "Predictor timing checklist",
    src: "/ml-biostatistics/figures/module-1/lesson-1-5-predictor-timing-checklist.png",
    alt: "Predictor timing checklist showing predictors available before prediction.",
    interpretation:
      "Every predictor must be available at the true prediction time. If a variable is only known after diagnosis, treatment or follow-up, it can create leakage.",
  },
  {
    title: "Reporting dashboard at threshold 0.50",
    src: "/ml-biostatistics/figures/module-1/lesson-1-5-reporting-dashboard.png",
    alt: "Bar chart of accuracy, AUC, sensitivity and specificity at threshold 0.50.",
    interpretation:
      "A medical ML report should not rely on accuracy alone. Discrimination, threshold performance and calibration-related error all matter.",
  },
];

const thresholdRows = [
  {
    threshold: "0.20",
    accuracy: "0.662",
    sensitivity: "0.958",
    specificity: "0.528",
    ppv: "0.479",
    npv: "0.966",
    message:
      "Very sensitive. Detects most diabetes-positive patients, but creates many false positives.",
  },
  {
    threshold: "0.30",
    accuracy: "0.701",
    sensitivity: "0.819",
    specificity: "0.648",
    ppv: "0.513",
    npv: "0.888",
    message:
      "Still sensitive. Useful when missing high-risk patients is costly.",
  },
  {
    threshold: "0.40",
    accuracy: "0.736",
    sensitivity: "0.681",
    specificity: "0.761",
    ppv: "0.563",
    npv: "0.840",
    message:
      "More balanced, but sensitivity has fallen compared with lower thresholds.",
  },
  {
    threshold: "0.50",
    accuracy: "0.792",
    sensitivity: "0.625",
    specificity: "0.868",
    ppv: "0.682",
    npv: "0.836",
    message:
      "Conventional threshold. Good specificity, but misses some diabetes-positive patients.",
  },
  {
    threshold: "0.60",
    accuracy: "0.805",
    sensitivity: "0.542",
    specificity: "0.925",
    ppv: "0.765",
    npv: "0.817",
    message:
      "More conservative. Fewer false positives, but more false negatives.",
  },
  {
    threshold: "0.70",
    accuracy: "0.779",
    sensitivity: "0.403",
    specificity: "0.950",
    ppv: "0.784",
    npv: "0.778",
    message:
      "Very conservative. High specificity, but many diabetes-positive patients are missed.",
  },
];

const rCode = `# Lesson 1.5 browser R lab
# Biostatistical workflow for ML projects

set.seed(2026)

n <- 280

glucose <- rnorm(n, mean = 120, sd = 28)
mass <- rnorm(n, mean = 32, sd = 7)
age <- rnorm(n, mean = 35, sd = 11)
pressure <- rnorm(n, mean = 70, sd = 12)
pedigree <- rgamma(n, shape = 2, rate = 4)

linear_predictor <- -8 + 0.035 * glucose + 0.07 * mass + 0.025 * age + 0.5 * pedigree
risk <- 1 / (1 + exp(-linear_predictor))

diabetes_binary <- rbinom(n, size = 1, prob = risk)
diabetes <- ifelse(diabetes_binary == 1, "pos", "neg")

data <- data.frame(
  glucose = glucose,
  mass = mass,
  age = age,
  pressure = pressure,
  pedigree = pedigree,
  diabetes = diabetes,
  diabetes_binary = diabetes_binary
)

cat("Browser R lab: Lesson 1.5\\n")
cat("Biostatistical workflow for ML projects\\n")
cat("------------------------------------------\\n\\n")

cat("STEP 1: Define the prediction question\\n")
cat("Can routine clinical measurements predict diabetes status?\\n\\n")

cat("STEP 2: Inspect data\\n")
cat("Rows:", nrow(data), "\\n")
cat("Outcome table:\\n")
print(table(data$diabetes))

cat("\\nSTEP 3: Split data into training and test sets\\n")
train_id <- sample(seq_len(nrow(data)), size = 0.7 * nrow(data))
train_data <- data[train_id, ]
test_data <- data[-train_id, ]

cat("Training rows:", nrow(train_data), "\\n")
cat("Test rows:", nrow(test_data), "\\n")

cat("\\nSTEP 4: Fit prediction model\\n")
model <- glm(
  diabetes_binary ~ glucose + mass + age + pressure + pedigree,
  data = train_data,
  family = binomial
)

cat("Model fitted: logistic regression\\n")

cat("\\nSTEP 5: Predict risk in test data\\n")
test_data$predicted_risk <- predict(model, newdata = test_data, type = "response")

cat("First six predicted risks:\\n")
print(head(test_data[, c("diabetes", "diabetes_binary", "predicted_risk")]))

cat("\\nSTEP 6: Evaluate threshold 0.50\\n")
test_data$predicted_class <- ifelse(test_data$predicted_risk >= 0.5, 1, 0)

cm <- table(
  Observed = test_data$diabetes_binary,
  Predicted = test_data$predicted_class
)

print(cm)

accuracy <- mean(test_data$diabetes_binary == test_data$predicted_class)

tn <- cm["0", "0"]
fp <- cm["0", "1"]
fn <- cm["1", "0"]
tp <- cm["1", "1"]

sensitivity <- tp / (tp + fn)
specificity <- tn / (tn + fp)

cat("\\nAccuracy:", round(accuracy, 3), "\\n")
cat("Sensitivity:", round(sensitivity, 3), "\\n")
cat("Specificity:", round(specificity, 3), "\\n")

cat("\\nSTEP 7: Threshold trade-off\\n")

thresholds <- c(0.3, 0.5, 0.7)

for (threshold in thresholds) {
  predicted_class <- ifelse(test_data$predicted_risk >= threshold, 1, 0)
  cm_t <- table(
    Observed = factor(test_data$diabetes_binary, levels = c(0, 1)),
    Predicted = factor(predicted_class, levels = c(0, 1))
  )

  tn <- cm_t["0", "0"]
  fp <- cm_t["0", "1"]
  fn <- cm_t["1", "0"]
  tp <- cm_t["1", "1"]

  sens <- tp / (tp + fn)
  spec <- tn / (tn + fp)
  acc <- (tp + tn) / sum(cm_t)

  cat("\\nThreshold:", threshold, "\\n")
  cat("Accuracy:", round(acc, 3), "\\n")
  cat("Sensitivity:", round(sens, 3), "\\n")
  cat("Specificity:", round(spec, 3), "\\n")
}

cat("\\nFinal interpretation:\\n")
cat("A responsible ML project is a workflow, not just a model.\\n")
cat("We define the clinical question, check predictor timing, split data, fit the model, validate performance, study thresholds and report limitations.\\n")
cat("The same predicted risk can lead to different classifications depending on the decision threshold.\\n")`;

export default function BiostatisticalMLWorkflowPage() {
  const [activeTab, setActiveTab] = useState("lecture");
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState(
    "Click “Run R code” to start the in-browser R lab."
  );

  async function runRCode() {
    setIsRunning(true);
    setOutput("Starting WebR. First run can take 20–60 seconds...");

    try {
      const webR = await getWebR();

      const result = await webR.evalR(`
        paste(
          capture.output({
            ${rCode}
          }),
          collapse = "\\n"
        )
      `);

      const jsResult = await result.toJs();
      setOutput(String(jsResult.values[0]));
    } catch (error) {
      setOutput(
        `Something went wrong while running R in the browser.\n\n${String(error)}`
      );
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-slate-950 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath(
            "/courses/machine-learning-biostatistics/modules/foundations"
          )}
          className="text-sm font-black text-blue-600 transition hover:text-blue-700"
        >
          ← Back to Module 1
        </a>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
            Module 1 · Lesson 1.5
          </p>

          <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-tight md:text-6xl">
            Biostatistical workflow for ML projects
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-slate-600 md:text-lg">
            Bring the whole foundation module together into a responsible
            medical machine learning workflow: define the question, check
            predictors, split data, fit the model, validate performance, study
            thresholds and report limitations honestly.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {[
              ["Dataset", "768 patients"],
              ["Training rows", "537"],
              ["Test rows", "231"],
              ["Module status", "Complete"],
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
        </section>

        <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-3 shadow-sm">
          <div className="grid gap-2 md:grid-cols-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-2xl px-4 py-3 text-sm font-black transition ${
                  activeTab === tab.id
                    ? "bg-slate-950 text-white"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {activeTab === "lecture" && (
          <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
              Conversational lecture
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              The team builds the full ML workflow
            </h2>

            <p className="mt-4 text-base leading-8 text-slate-600">
              Scene: Prof Stat has written the complete workflow on the board.
              Curious Learner wants to start with the model. Dr Clinic wants to
              begin with the decision. Leakage Monster is waiting near the
              predictor list.
            </p>

            <div className="mt-8 space-y-5">
              {[
                {
                  initials: "CL",
                  name: "Curious Learner",
                  text: "We have already fitted models, checked prediction, looked at learning types and studied leakage. Is Lesson 1.5 where we put it all together?",
                },
                {
                  initials: "PS",
                  name: "Prof Stat",
                  text: "Exactly. A biostatistical ML project is not just choosing an algorithm. It is a workflow. The model is only one part of the process.",
                },
                {
                  initials: "DC",
                  name: "Dr Clinic",
                  text: "In clinical work, we should not begin with ‘Which model should I use?’ We should begin with ‘What decision are we trying to support?’",
                },
                {
                  initials: "PS",
                  name: "Prof Stat",
                  text: "Correct. First define the prediction question, target population, outcome, prediction time and candidate predictors. Only then does model fitting make sense.",
                },
                {
                  initials: "LM",
                  name: "Leakage Monster",
                  text: "And remember me. If a predictor is only known after the outcome, after diagnosis or after follow-up, I can make your model look better than it really is.",
                },
                {
                  initials: "CL",
                  name: "Curious Learner",
                  text: "So the workflow protects us from building a model that looks good but answers the wrong question?",
                },
                {
                  initials: "PS",
                  name: "Prof Stat",
                  text: "Yes. The workflow forces us to ask whether the predictors are available, whether the model generalises, whether the threshold is clinically sensible and whether the report is honest.",
                },
                {
                  initials: "DC",
                  name: "Dr Clinic",
                  text: "And even if AUC is good, we still need to ask what happens to patients. A low threshold may detect more high-risk patients, but it can also create more false positives.",
                },
                {
                  initials: "PS",
                  name: "Prof Stat",
                  text: "That is the heart of medical ML: prediction, validation, threshold judgement, clinical usefulness and transparent reporting.",
                },
              ].map((line) => (
                <div
                  key={`${line.name}-${line.text}`}
                  className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 md:grid-cols-[0.16fr_1fr]"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white">
                      {line.initials}
                    </div>
                    <p className="mt-2 text-sm font-black text-slate-950">
                      {line.name}
                    </p>
                  </div>
                  <p className="text-base leading-8 text-slate-700">
                    “{line.text}”
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl bg-slate-950 p-6 text-white">
              <h3 className="text-2xl font-black">Big idea</h3>
              <p className="mt-4 max-w-4xl text-base leading-8 text-slate-300">
                A responsible biostatistical ML project is a workflow, not just
                a model. It begins with the clinical question and ends with
                honest reporting of validation, thresholds, usefulness and
                limitations.
              </p>
            </div>
          </section>
        )}

        {activeTab === "notes" && (
          <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
              Detailed notes
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              The workflow before, during and after model fitting
            </h2>

            <div className="mt-6 max-w-4xl space-y-5 text-base leading-8 text-slate-700">
              <p>
                A biostatistical machine learning project should not begin with
                the algorithm. It should begin with a clearly defined prediction
                problem. The first questions are: who are the patients, what is
                the outcome, when is the prediction made, and what action might
                follow the prediction?
              </p>

              <p>
                In this lesson, the clinical prediction question is:{" "}
                <strong>
                  Can routinely measured clinical characteristics predict
                  diabetes status?
                </strong>{" "}
                The target population is patients with diabetes-related clinical
                measurements. The predictors include glucose, BMI/mass, age,
                pressure, insulin, pedigree and related variables.
              </p>

              <p>
                Predictor timing is central. A variable is only valid if it
                would be available at the true prediction time. If a predictor
                is measured after diagnosis, treatment or follow-up, it can
                create leakage.
              </p>

              <p>
                After fitting the model, the workflow moves to validation. In
                this analysis, the model was fitted on 537 training patients and
                evaluated on 231 test patients. At threshold 0.50, the model
                achieved accuracy 0.792, sensitivity 0.625 and specificity
                0.868. The AUC was 0.837 and the Brier score was 0.149.
              </p>

              <p>
                The workflow does not end with one metric. Thresholds change the
                clinical behaviour of the model. Lower thresholds increase
                sensitivity and detect more positives, but create more false
                positives. Higher thresholds increase specificity, but miss more
                diabetes-positive patients.
              </p>
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-950 text-white">
                  <tr>
                    <th className="p-4">Workflow step</th>
                    <th className="p-4">Main question</th>
                    <th className="p-4">Why it matters</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Question",
                      "What are we trying to predict?",
                      "The model must answer a meaningful clinical question.",
                    ],
                    [
                      "Population",
                      "Who does the model apply to?",
                      "Predictions should match the intended target patients.",
                    ],
                    [
                      "Outcome",
                      "What exactly counts as the outcome?",
                      "Ambiguous outcomes lead to ambiguous models.",
                    ],
                    [
                      "Prediction time",
                      "When is the prediction made?",
                      "Predictors must be available at that time.",
                    ],
                    [
                      "Validation",
                      "Does the model work on unseen patients?",
                      "Training performance alone is not enough.",
                    ],
                    [
                      "Threshold",
                      "What risk cut-off supports action?",
                      "Sensitivity and specificity depend on the threshold.",
                    ],
                    [
                      "Reporting",
                      "What are the limitations?",
                      "Transparent reporting prevents overclaiming.",
                    ],
                  ].map((row) => (
                    <tr key={row[0]} className="border-t border-slate-200">
                      {row.map((cell, index) => (
                        <td
                          key={cell}
                          className={`p-4 leading-6 ${
                            index === 0
                              ? "font-black text-slate-950"
                              : "text-slate-600"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid gap-6">
              {figures.map((figure) => (
                <article
                  key={figure.src}
                  className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5"
                >
                  <h3 className="text-xl font-black text-slate-950">
                    {figure.title}
                  </h3>
                  <img
                    src={withBasePath(figure.src)}
                    alt={figure.alt}
                    className="mt-5 w-full rounded-3xl border border-slate-200 bg-white"
                  />
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {figure.interpretation}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "interactive" && (
          <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
              Interactive lab
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              Walk through the medical ML workflow
            </h2>

            <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">
              Open each item and decide whether the workflow is ready to move
              forward, or whether the modelling team needs to pause.
            </p>

            <div className="mt-8 space-y-4">
              {[
                {
                  scenario:
                    "The team has not defined when the diabetes prediction is made.",
                  answer: "Pause",
                  reason:
                    "Prediction time determines which predictors are valid. Without this, leakage risk cannot be assessed.",
                },
                {
                  scenario:
                    "The predictors are measured before outcome interpretation and are available at the prediction time.",
                  answer: "Proceed carefully",
                  reason:
                    "Predictor timing appears reasonable, but measurement quality and missingness still need checking.",
                },
                {
                  scenario:
                    "The model is reported using accuracy only.",
                  answer: "Pause",
                  reason:
                    "Accuracy alone is not enough. Report sensitivity, specificity, AUC, Brier score and threshold trade-offs.",
                },
                {
                  scenario:
                    "Threshold 0.20 gives sensitivity 0.958 and specificity 0.528.",
                  answer: "High-sensitivity option",
                  reason:
                    "This threshold detects most positive cases but creates many false positives. It may be useful when missing high-risk patients is costly.",
                },
                {
                  scenario:
                    "Threshold 0.70 gives sensitivity 0.403 and specificity 0.950.",
                  answer: "High-specificity option",
                  reason:
                    "This threshold avoids many false positives but misses many diabetes-positive patients.",
                },
              ].map((item, index) => (
                <details
                  key={item.scenario}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                >
                  <summary className="cursor-pointer text-base font-black leading-7 text-slate-950">
                    Scenario {index + 1}: {item.scenario}
                  </summary>
                  <div className="mt-4 rounded-2xl bg-white p-4">
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-600">
                      Workflow decision
                    </p>
                    <p className="mt-2 text-xl font-black text-slate-950">
                      {item.answer}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {item.reason}
                    </p>
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-950 text-white">
                  <tr>
                    <th className="p-4">Threshold</th>
                    <th className="p-4">Accuracy</th>
                    <th className="p-4">Sensitivity</th>
                    <th className="p-4">Specificity</th>
                    <th className="p-4">Interpretation</th>
                  </tr>
                </thead>
                <tbody>
                  {thresholdRows.map((row) => (
                    <tr key={row.threshold} className="border-t border-slate-200">
                      <td className="p-4 font-black text-slate-950">
                        {row.threshold}
                      </td>
                      <td className="p-4 text-slate-600">{row.accuracy}</td>
                      <td className="p-4 text-slate-600">{row.sensitivity}</td>
                      <td className="p-4 text-slate-600">{row.specificity}</td>
                      <td className="p-4 text-slate-600">{row.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === "coding" && (
          <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
              R coding lab
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              Run a complete mini-workflow in the browser
            </h2>

            <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">
              This browser lab runs a small version of the complete workflow.
              The downloadable script uses the full shared diabetes dataset and
              generated the figures used in this lesson.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={runRCode}
                disabled={isRunning}
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isRunning ? "Running R..." : "Run R code"}
              </button>

              <a
                href={withBasePath(
                  "/ml-biostatistics/r/module-1/lesson-1-5-biostatistical-ml-workflow.R"
                )}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-black text-slate-900 transition hover:bg-slate-50"
              >
                Download full R script
              </a>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">
                  Code
                </p>
                <pre className="mt-3 max-h-[540px] overflow-auto rounded-3xl bg-slate-950 p-5 text-sm leading-6 text-slate-100">
                  <code>{rCode}</code>
                </pre>
              </div>

              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">
                  Output
                </p>
                <pre className="mt-3 min-h-[540px] overflow-auto rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-800">
                  <code>{output}</code>
                </pre>
              </div>
            </div>
          </section>
        )}

        {activeTab === "report" && (
          <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
              Reporting and interpretation
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              Reporting-ready workflow summary
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                {
                  title: "Clinical question",
                  body: "Can routinely measured clinical characteristics predict diabetes status?",
                },
                {
                  title: "Model",
                  body: "A logistic regression model was fitted using pregnant, glucose, pressure, triceps, insulin, mass, pedigree and age.",
                },
                {
                  title: "Validation",
                  body: "The data were split into 537 training patients and 231 test patients. The model was evaluated on the held-out test set.",
                },
                {
                  title: "Performance",
                  body: "At threshold 0.50, accuracy was 0.792, sensitivity was 0.625 and specificity was 0.868. AUC was 0.837 and Brier score was 0.149.",
                },
                {
                  title: "Threshold judgement",
                  body: "Threshold 0.20 produced high sensitivity of 0.958 but low specificity of 0.528. Threshold 0.70 produced high specificity of 0.950 but low sensitivity of 0.403.",
                },
                {
                  title: "Main limitation",
                  body: "This is an internal train/test split only. External validation would be needed before real-world use.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                >
                  <h3 className="text-xl font-black text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-3xl bg-slate-950 p-6 text-white">
              <h3 className="text-2xl font-black">
                Example report paragraph
              </h3>
              <p className="mt-4 text-base leading-8 text-slate-300">
                A logistic diabetes prediction model was fitted using routinely
                measured clinical predictors. The data were split into 537
                training patients and 231 test patients, with the model fitted
                only on the training data. On the held-out test set, the model
                achieved AUC 0.837 and Brier score 0.149. At threshold 0.50,
                accuracy was 0.792, sensitivity was 0.625 and specificity was
                0.868. Threshold analysis showed a clear trade-off: lower
                thresholds increased sensitivity but reduced specificity, while
                higher thresholds increased specificity but missed more
                diabetes-positive patients. The model should be interpreted as
                an educational internal validation workflow, not as a deployable
                clinical tool. External validation, calibration assessment and
                clinical usefulness analysis would be required before real-world
                use.
              </p>
            </div>

            <div className="mt-8 rounded-3xl border border-red-100 bg-red-50 p-6">
              <h3 className="text-xl font-black text-slate-950">
                What not to write
              </h3>
              <p className="mt-3 text-base leading-8 text-slate-700">
                Do not write: “The model is clinically ready because accuracy is
                0.792.” A responsible report must discuss the target population,
                prediction time, leakage risk, threshold trade-offs,
                calibration, validation and limitations.
              </p>
            </div>
          </section>
        )}

        {activeTab === "quiz" && (
          <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
              Module 1 completion quiz
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              Check your understanding
            </h2>

            <div className="mt-8 space-y-4">
              {[
                {
                  q: "Why should an ML project begin with the clinical question rather than the algorithm?",
                  a: "Because the clinical question defines the target population, outcome, prediction time, predictors, validation plan and interpretation.",
                },
                {
                  q: "Why is predictor timing important?",
                  a: "Predictors must be available at the real prediction time. Variables measured after outcome, diagnosis or follow-up can create leakage.",
                },
                {
                  q: "Why is accuracy alone not enough?",
                  a: "Accuracy can hide poor sensitivity or poor specificity, especially when outcomes are imbalanced. Multiple metrics are needed.",
                },
                {
                  q: "What happens when the threshold is lowered?",
                  a: "Sensitivity usually increases, meaning more positives are detected, but specificity usually decreases, meaning more false positives occur.",
                },
                {
                  q: "What is the main limitation of this lesson's model?",
                  a: "It uses an internal train/test split only. External validation would be needed before considering real-world use.",
                },
                {
                  q: "What is the key message of Module 1?",
                  a: "Medical ML is not just algorithm fitting. It requires prediction thinking, careful question definition, validation, leakage control, threshold judgement and honest reporting.",
                },
              ].map((item, index) => (
                <details
                  key={item.q}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                >
                  <summary className="cursor-pointer text-base font-black leading-7 text-slate-950">
                    Question {index + 1}: {item.q}
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>

            <section className="mt-10 rounded-[2rem] bg-slate-950 p-6 text-white md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-300">
                Module 1 complete
              </p>
              <h3 className="mt-3 text-3xl font-black tracking-tight">
                Foundations of Machine Learning in Biostatistics
              </h3>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
                You have completed the foundation module: what ML means in
                biostatistics, prediction vs explanation vs causality, types of
                learning, training/testing, overfitting, leakage and the full
                responsible workflow.
              </p>
              <a
                href={withBasePath(
                  "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data"
                )}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-blue-50 sm:w-auto"
              >
                Continue to Module 2 →
              </a>
            </section>
          </section>
        )}
      </section>
    </main>
  );
}