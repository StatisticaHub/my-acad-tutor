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
    title: "Training and test data outcome distribution",
    src: "/ml-biostatistics/figures/module-1/lesson-1-4-train-test-distribution.png",
    alt: "Bar chart showing diabetes outcome distribution in training and test data.",
    interpretation:
      "The model learns from the training data and is evaluated on a separate test set. The test set acts as a small rehearsal for future unseen patients.",
  },
  {
    title: "Training accuracy vs test accuracy",
    src: "/ml-biostatistics/figures/module-1/lesson-1-4-training-vs-test-accuracy.png",
    alt: "Bar chart comparing training and test accuracy for simple, larger and over-flexible models.",
    interpretation:
      "Training performance alone is not enough. A model should be judged mainly by how well it performs on held-out test data.",
  },
  {
    title: "Training AUC vs test AUC",
    src: "/ml-biostatistics/figures/module-1/lesson-1-4-training-vs-test-auc.png",
    alt: "Bar chart comparing training and test AUC for three models.",
    interpretation:
      "AUC compares how well predicted risks separate positive and negative patients. A growing training-test gap is a warning sign.",
  },
  {
    title: "Predicted risk distributions in the test data",
    src: "/ml-biostatistics/figures/module-1/lesson-1-4-test-risk-distributions.png",
    alt: "Faceted histograms showing predicted risk distributions for three models in the test set.",
    interpretation:
      "The model should separate risk among unseen patients, not merely reproduce patterns in the training data.",
  },
  {
    title: "Leakage can make a model look unrealistically strong",
    src: "/ml-biostatistics/figures/module-1/lesson-1-4-leakage-warning.png",
    alt: "Bar chart comparing valid model and leakage model performance.",
    interpretation:
      "The leakage model looks perfect because it uses information too close to the outcome. This is not valid medical prediction.",
  },
];

const rCode = `# Lesson 1.4 browser R lab
# Training, testing, overfitting and generalisation

set.seed(2026)

n <- 260

glucose <- rnorm(n, mean = 120, sd = 28)
mass <- rnorm(n, mean = 32, sd = 7)
age <- rnorm(n, mean = 35, sd = 11)
pressure <- rnorm(n, mean = 70, sd = 12)

linear_predictor <- -8 + 0.035 * glucose + 0.07 * mass + 0.025 * age
risk <- 1 / (1 + exp(-linear_predictor))

diabetes_binary <- rbinom(n, size = 1, prob = risk)
diabetes <- ifelse(diabetes_binary == 1, "pos", "neg")

data <- data.frame(
  glucose = glucose,
  mass = mass,
  age = age,
  pressure = pressure,
  diabetes = diabetes,
  diabetes_binary = diabetes_binary
)

cat("Browser R lab: Lesson 1.4\\n")
cat("Training, testing, overfitting and generalisation\\n")
cat("------------------------------------------\\n")
cat("Rows:", nrow(data), "\\n")
cat("Outcome table:\\n")
print(table(data$diabetes))

train_id <- sample(seq_len(nrow(data)), size = 0.7 * nrow(data))

train_data <- data[train_id, ]
test_data <- data[-train_id, ]

cat("\\nTraining rows:", nrow(train_data), "\\n")
cat("Test rows:", nrow(test_data), "\\n")

cat("\\nTraining outcome table:\\n")
print(table(train_data$diabetes))

cat("\\nTest outcome table:\\n")
print(table(test_data$diabetes))

# Simple model
simple_model <- glm(
  diabetes_binary ~ glucose + mass + age,
  data = train_data,
  family = binomial
)

train_data$simple_risk <- predict(simple_model, newdata = train_data, type = "response")
test_data$simple_risk <- predict(simple_model, newdata = test_data, type = "response")

train_data$simple_class <- ifelse(train_data$simple_risk >= 0.5, 1, 0)
test_data$simple_class <- ifelse(test_data$simple_risk >= 0.5, 1, 0)

simple_train_accuracy <- mean(train_data$diabetes_binary == train_data$simple_class)
simple_test_accuracy <- mean(test_data$diabetes_binary == test_data$simple_class)

cat("\\nSIMPLE MODEL\\n")
cat("Training accuracy:", round(simple_train_accuracy, 3), "\\n")
cat("Test accuracy:", round(simple_test_accuracy, 3), "\\n")
cat("Test confusion matrix:\\n")
print(table(
  Observed = test_data$diabetes_binary,
  Predicted = test_data$simple_class
))

# Over-flexible model
over_model <- glm(
  diabetes_binary ~ glucose + mass + age + pressure +
    I(glucose^2) + I(mass^2) + I(age^2) +
    glucose:mass + glucose:age + mass:age,
  data = train_data,
  family = binomial
)

train_data$over_risk <- predict(over_model, newdata = train_data, type = "response")
test_data$over_risk <- predict(over_model, newdata = test_data, type = "response")

train_data$over_class <- ifelse(train_data$over_risk >= 0.5, 1, 0)
test_data$over_class <- ifelse(test_data$over_risk >= 0.5, 1, 0)

over_train_accuracy <- mean(train_data$diabetes_binary == train_data$over_class)
over_test_accuracy <- mean(test_data$diabetes_binary == test_data$over_class)

cat("\\nOVER-FLEXIBLE MODEL\\n")
cat("Training accuracy:", round(over_train_accuracy, 3), "\\n")
cat("Test accuracy:", round(over_test_accuracy, 3), "\\n")
cat("Test confusion matrix:\\n")
print(table(
  Observed = test_data$diabetes_binary,
  Predicted = test_data$over_class
))

# Leakage demonstration
test_data$leakage_marker <- test_data$diabetes_binary + rnorm(nrow(test_data), 0, 0.05)
train_data$leakage_marker <- train_data$diabetes_binary + rnorm(nrow(train_data), 0, 0.05)

leakage_model <- glm(
  diabetes_binary ~ glucose + mass + age + leakage_marker,
  data = train_data,
  family = binomial
)

test_data$leakage_risk <- predict(leakage_model, newdata = test_data, type = "response")
test_data$leakage_class <- ifelse(test_data$leakage_risk >= 0.5, 1, 0)

leakage_accuracy <- mean(test_data$diabetes_binary == test_data$leakage_class)

cat("\\nLEAKAGE MODEL\\n")
cat("Test accuracy:", round(leakage_accuracy, 3), "\\n")
cat("Test confusion matrix:\\n")
print(table(
  Observed = test_data$diabetes_binary,
  Predicted = test_data$leakage_class
))

cat("\\nInterpretation:\\n")
cat("Training data are used to fit the model.\\n")
cat("Test data estimate performance on unseen patients.\\n")
cat("Overfitting occurs when training-specific patterns do not generalise.\\n")
cat("Leakage occurs when future or outcome information enters the model.\\n")
cat("A perfect-looking leakage model is not clinically trustworthy.\\n")`;

export default function TrainingTestingOverfittingPage() {
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
            Module 1 · Lesson 1.4
          </p>

          <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-tight md:text-6xl">
            Training, testing, overfitting and generalisation
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-slate-600 md:text-lg">
            Learn why a model must be tested on unseen patients, why training
            performance can be misleading, and why leakage can make a medical
            machine learning model look unrealistically strong.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {[
              ["Dataset", "768 patients"],
              ["Training rows", "537"],
              ["Test rows", "231"],
              ["Big warning", "Leakage"],
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
              The model that looked perfect
            </h2>

            <p className="mt-4 text-base leading-8 text-slate-600">
              Scene: Prof Stat has split the diabetes dataset into training and
              test data. Curious Learner is impressed by a model with perfect
              performance. Dr Clinic is suspicious. Leakage Monster is smiling.
            </p>

            <div className="mt-8 space-y-5">
              {[
                {
                  initials: "CL",
                  name: "Curious Learner",
                  text: "The leakage model has test accuracy 1 and AUC 1. That means it is the best model, right?",
                },
                {
                  initials: "PS",
                  name: "Prof Stat",
                  text: "Not necessarily. Perfect performance in medical prediction is often a warning sign. We must ask whether the model used information that would be available at the real prediction time.",
                },
                {
                  initials: "DC",
                  name: "Dr Clinic",
                  text: "If the model uses future diagnosis information, post-outcome treatment or follow-up data, it may look excellent in analysis but be useless when a clinician actually needs the prediction.",
                },
                {
                  initials: "LM",
                  name: "Leakage Monster",
                  text: "Exactly. Give me a variable that is almost a copy of the outcome, and I can make any model look brilliant.",
                },
                {
                  initials: "CL",
                  name: "Curious Learner",
                  text: "So we should not only ask whether performance is high. We should ask whether the performance is honest.",
                },
                {
                  initials: "PS",
                  name: "Prof Stat",
                  text: "Correct. That is why we split data into training and test sets. Training data are used to fit the model. Test data are held back to estimate generalisation to unseen patients.",
                },
                {
                  initials: "DC",
                  name: "Dr Clinic",
                  text: "In clinical prediction, generalisation matters more than memorising past patients. A model must work for future patients, different clinics and real decision points.",
                },
                {
                  initials: "PS",
                  name: "Prof Stat",
                  text: "Overfitting happens when the model learns training-specific noise. Leakage happens when the model receives information it should not have. Both can make performance misleading.",
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
                A prediction model should be judged by how well it generalises
                to unseen patients. High training performance is not enough.
                Perfect-looking performance can be invalid if the model is
                overfitted or contaminated by leakage.
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
              Why unseen-data performance matters
            </h2>

            <div className="mt-6 max-w-4xl space-y-5 text-base leading-8 text-slate-700">
              <p>
                In supervised machine learning, the model learns from examples.
                If it is evaluated only on the same examples used for learning,
                the performance estimate can be too optimistic. The model may
                have learned patterns that are specific to the training data,
                rather than patterns that generalise to future patients.
              </p>

              <p>
                The <strong>training set</strong> is used to estimate model
                parameters. The <strong>test set</strong> is held back and used
                only after the model is fitted. Test performance is not perfect
                evidence of real-world performance, but it is more honest than
                training performance.
              </p>

              <p>
                <strong>Overfitting</strong> occurs when a model captures noise,
                accidental structure or idiosyncrasies of the training sample.
                The model may look good during training but perform less well on
                unseen patients.
              </p>

              <p>
                <strong>Leakage</strong> is even more dangerous. Leakage happens
                when predictors include information that would not be available
                at the real prediction time. A leaked variable can create
                excellent apparent performance while making the model invalid
                for clinical use.
              </p>
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-950 text-white">
                  <tr>
                    <th className="p-4">Concept</th>
                    <th className="p-4">Meaning</th>
                    <th className="p-4">Medical ML danger</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Training data",
                      "Data used to fit the model.",
                      "Performance may look too good if judged only here.",
                    ],
                    [
                      "Test data",
                      "Held-out data used to estimate performance on unseen patients.",
                      "Still not a replacement for external validation.",
                    ],
                    [
                      "Overfitting",
                      "The model learns training-specific noise or accidental patterns.",
                      "The model fails to generalise to new patients.",
                    ],
                    [
                      "Leakage",
                      "Unavailable future or outcome information enters the model.",
                      "The model looks excellent but is clinically invalid.",
                    ],
                    [
                      "Generalisation",
                      "The ability to perform well beyond the training data.",
                      "Essential before trusting a medical prediction model.",
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
              Diagnose the modelling problem
            </h2>

            <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">
              Open each scenario and decide whether it describes normal
              validation, possible overfitting or leakage.
            </p>

            <div className="mt-8 space-y-4">
              {[
                {
                  scenario:
                    "A model is fitted on 537 training patients and evaluated on 231 held-out test patients.",
                  answer: "Train/test validation",
                  reason:
                    "The test set was not used to fit the model, so it gives a more honest estimate of unseen-patient performance.",
                },
                {
                  scenario:
                    "A model has much higher training AUC than test AUC.",
                  answer: "Possible overfitting",
                  reason:
                    "A large training-test gap suggests the model may have learned training-specific patterns.",
                },
                {
                  scenario:
                    "A model uses a follow-up diagnosis code recorded after the prediction time.",
                  answer: "Leakage",
                  reason:
                    "The predictor would not be available when the prediction is supposed to be made.",
                },
                {
                  scenario:
                    "A model has perfect accuracy and perfect AUC in a realistic clinical prediction problem.",
                  answer: "Suspicious result",
                  reason:
                    "Perfect performance is often a warning sign. Check for leakage, duplicate records or outcome-derived predictors.",
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
                      Diagnosis
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
          </section>
        )}

        {activeTab === "coding" && (
          <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
              R coding lab
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              Run training, testing and leakage examples
            </h2>

            <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">
              This browser lab uses a small simulated dataset so it runs quickly
              in WebR. The full downloadable script uses the shared diabetes
              dataset and generated the figures used in this lesson.
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
                  "/ml-biostatistics/r/module-1/lesson-1-4-training-testing-overfitting.R"
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
              How to report Lesson 1.4 correctly
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                {
                  title: "Train/test split",
                  body: "The dataset was split into 537 training patients and 231 test patients. The model was fitted on the training set and evaluated on the test set.",
                },
                {
                  title: "Simple model",
                  body: "The simple model achieved test accuracy 0.779, test AUC 0.819, sensitivity 0.625 and specificity 0.849.",
                },
                {
                  title: "Larger model",
                  body: "The larger model achieved test accuracy 0.792, test AUC 0.837, sensitivity 0.625 and specificity 0.868.",
                },
                {
                  title: "Over-flexible model",
                  body: "The over-flexible model achieved test accuracy 0.766 and test AUC 0.838, with a larger AUC generalisation gap than the simpler models.",
                },
                {
                  title: "Leakage warning",
                  body: "The leakage model achieved perfect performance, but this was caused by a variable almost copying the outcome. This is invalid clinical prediction.",
                },
                {
                  title: "Main conclusion",
                  body: "Model quality should be judged by honest unseen-data performance, not by training performance or leaked information.",
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
                The shared diabetes dataset was split into 537 training patients
                and 231 test patients. A simple logistic prediction model
                achieved test accuracy of 0.779 and test AUC of 0.819. A larger
                model using all available clinical predictors achieved slightly
                higher test accuracy of 0.792 and test AUC of 0.837. An
                over-flexible model had higher training AUC but showed a larger
                training-test AUC gap, suggesting possible loss of
                generalisation. A deliberately leaked model achieved perfect
                test accuracy and AUC, but this performance is invalid because
                the leakage variable contained information too close to the
                outcome. This illustrates why medical prediction models must be
                evaluated using honest data separation and predictors available
                at the true prediction time.
              </p>
            </div>

            <div className="mt-8 rounded-3xl border border-red-100 bg-red-50 p-6">
              <h3 className="text-xl font-black text-slate-950">
                What not to write
              </h3>
              <p className="mt-3 text-base leading-8 text-slate-700">
                Do not write: “The leakage model is best because it has perfect
                accuracy.” Perfect performance caused by future or
                outcome-derived information is not valid prediction. It is a
                warning sign.
              </p>
            </div>
          </section>
        )}

        {activeTab === "quiz" && (
          <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
              Quiz
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              Check your understanding
            </h2>

            <div className="mt-8 space-y-4">
              {[
                {
                  q: "What is the purpose of the training data?",
                  a: "Training data are used to fit the model and estimate its parameters.",
                },
                {
                  q: "Why do we need a test set?",
                  a: "A test set gives a more honest estimate of how the model performs on unseen patients.",
                },
                {
                  q: "What is overfitting?",
                  a: "Overfitting occurs when a model learns noise or accidental patterns from the training data that do not generalise well.",
                },
                {
                  q: "Why is leakage dangerous?",
                  a: "Leakage can make a model look extremely accurate by using information that would not be available at the real prediction time.",
                },
                {
                  q: "Why should perfect performance make us suspicious in medical ML?",
                  a: "Because real clinical prediction is rarely perfect. Perfect performance may indicate leakage, duplicate data, outcome-derived predictors or another design problem.",
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
                Next lesson
              </p>
              <h3 className="mt-3 text-3xl font-black tracking-tight">
                Biostatistical workflow for ML projects
              </h3>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
                Next, we combine the first four lessons into a complete
                responsible medical ML workflow.
              </p>
              <a
                href={withBasePath(
                  "/courses/machine-learning-biostatistics/modules/foundations/lessons/biostatistical-ml-workflow"
                )}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-blue-50 sm:w-auto"
              >
                Next lesson →
              </a>
            </section>
          </section>
        )}
      </section>
    </main>
  );
}