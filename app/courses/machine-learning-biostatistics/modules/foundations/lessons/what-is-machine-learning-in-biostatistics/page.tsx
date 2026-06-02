"use client";

import { useState } from "react";
import type { ReactNode } from "react";

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
  "Lecture",
  "Detailed Notes",
  "Interactive Lab",
  "R Coding Lab",
  "Report",
  "Quiz",
];

const browserRCode = `# Lesson 1.1 browser R lab
# The website loads diabetes_data from the shared course CSV.
# You can edit and run this code.

# 1. Look at the data
dim(diabetes_data)
names(diabetes_data)
head(diabetes_data)

# 2. Outcome distribution
table(diabetes_data$diabetes)
round(100 * prop.table(table(diabetes_data$diabetes)), 1)

# 3. Compare predictor means by diabetes status
aggregate(
  cbind(glucose, mass, age) ~ diabetes,
  data = diabetes_data,
  FUN = mean
)

# 4. Train/test split
set.seed(2026)

train_id <- sample(
  seq_len(nrow(diabetes_data)),
  size = 0.7 * nrow(diabetes_data)
)

train_data <- diabetes_data[train_id, ]
test_data <- diabetes_data[-train_id, ]

# 5. Fit a simple first prediction model
model <- glm(
  diabetes_binary ~ glucose + mass + age,
  data = train_data,
  family = binomial
)

summary(model)

# 6. Predict risk in unseen test data
test_data$predicted_risk <- predict(
  model,
  newdata = test_data,
  type = "response"
)

test_data$predicted_class <- ifelse(
  test_data$predicted_risk >= 0.5,
  1,
  0
)

# 7. First performance check
confusion_matrix <- table(
  Observed = test_data$diabetes_binary,
  Predicted = test_data$predicted_class
)

confusion_matrix

accuracy <- mean(test_data$diabetes_binary == test_data$predicted_class)

tn <- confusion_matrix["0", "0"]
fp <- confusion_matrix["0", "1"]
fn <- confusion_matrix["1", "0"]
tp <- confusion_matrix["1", "1"]

sensitivity <- tp / (tp + fn)
specificity <- tn / (tn + fp)

cat("\\nAccuracy:", round(accuracy, 3), "\\n")
cat("Sensitivity:", round(sensitivity, 3), "\\n")
cat("Specificity:", round(specificity, 3), "\\n")

cat("\\nInterpretation:\\n")
cat("Accuracy is only the starting point.\\n")
cat("Sensitivity tells us how many diabetes-positive patients are detected.\\n")
cat("Specificity tells us how many diabetes-negative patients are correctly identified.\\n")
cat("This is prediction, not causal explanation.\\n")`;

function Initials({ children }: { children: string }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">
      {children}
    </div>
  );
}

function DialogueLine({
  initials,
  name,
  children,
  tone = "neutral",
}: {
  initials: string;
  name: string;
  children: ReactNode;
  tone?: "neutral" | "blue" | "green" | "rose";
}) {
  const toneClass =
    tone === "blue"
      ? "bg-blue-50"
      : tone === "green"
      ? "bg-emerald-50"
      : tone === "rose"
      ? "bg-rose-50"
      : "bg-white";

  return (
    <div
      className={`flex gap-4 rounded-3xl border border-slate-200 p-5 ${toneClass}`}
    >
      <Initials>{initials}</Initials>
      <div>
        <p className="text-sm font-black text-slate-950">{name}</p>
        <div className="mt-2 text-base leading-7 text-slate-700">{children}</div>
      </div>
    </div>
  );
}

function WebRCodeRunner() {
  const [code, setCode] = useState(browserRCode);
  const [output, setOutput] = useState(
    "Click “Run R code”. The first run may take longer because R loads in the browser."
  );
  const [running, setRunning] = useState(false);

  async function runCode() {
    setRunning(true);
    setOutput("Loading shared diabetes data and starting WebR...");

    try {
      const dataUrl = withBasePath(
        "/ml-biostatistics/data/shared-diabetes-prediction-data.csv"
      );

      const csvResponse = await fetch(dataUrl);

      if (!csvResponse.ok) {
        throw new Error(
          "Could not load shared diabetes CSV. Check that public/ml-biostatistics/data/shared-diabetes-prediction-data.csv exists."
        );
      }

      const csvText = await csvResponse.text();
      const webR = await getWebR();

      const wrappedCode = `
diabetes_csv_text <- ${JSON.stringify(csvText)}
diabetes_data <- read.csv(text = diabetes_csv_text)

paste(capture.output({
${code}
}), collapse = "\\n")
`;

      const result = await webR.evalR(wrappedCode);
      const jsResult = await result.toJs();

      const value =
        jsResult?.values?.[0] ?? jsResult?.value ?? String(jsResult);

      setOutput(String(value));
    } catch (error) {
      setOutput(
        error instanceof Error
          ? `Error: ${error.message}`
          : "An unknown error occurred while running R."
      );
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="mt-8 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-950 shadow-sm">
        <div className="flex flex-col gap-3 border-b border-white/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-300">
              Editable R script
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              Runs in the browser using WebR and the shared diabetes CSV
            </p>
          </div>

          <button
            onClick={runCode}
            disabled={running}
            className="inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-2.5 text-xs font-black text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {running ? "Running R..." : "Run R code"}
          </button>
        </div>

        <textarea
          value={code}
          onChange={(event) => setCode(event.target.value)}
          spellCheck={false}
          className="min-h-[620px] w-full resize-y bg-slate-950 p-5 font-mono text-[0.84rem] leading-6 text-slate-100 outline-none selection:bg-blue-400/30"
        />
      </div>

      <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
            R console output
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Output and errors appear here.
          </p>
        </div>

        <pre className="min-h-[620px] overflow-x-auto whitespace-pre-wrap bg-white p-5 font-mono text-[0.84rem] leading-6 text-slate-800">
          {output}
        </pre>
      </div>
    </div>
  );
}

export default function WhatIsMachineLearningInBiostatisticsPage() {
  const [activeTab, setActiveTab] = useState("Lecture");
  const [threshold, setThreshold] = useState(0.5);
  const [predictionChoice, setPredictionChoice] = useState("classification");

  const thresholdComment =
    threshold < 0.35
      ? "This threshold is screening-focused. It will detect more possible positive cases, but it will also create more false positives."
      : threshold < 0.55
      ? "This threshold is moderately balanced. It tries to avoid too many false positives while still detecting positive cases."
      : "This threshold is conservative. It will reduce false positives, but more diabetes-positive patients may be missed.";

  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-slate-950 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <a
            href={withBasePath(
              "/courses/machine-learning-biostatistics/modules/foundations"
            )}
            className="text-sm font-black text-blue-600 transition hover:text-blue-700"
          >
            ← Back to Module 1
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
              Module 1
            </span>
            <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-black text-emerald-800">
              Lesson 1.1
            </span>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-black text-slate-700">
              R coding
            </span>
            <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-black text-amber-800">
              Interactive
            </span>
          </div>

          <h1 className="mt-7 max-w-5xl text-4xl font-black tracking-tight md:text-6xl">
            What is machine learning in biostatistics?
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-slate-600 md:text-lg">
            Machine learning in biostatistics is the disciplined use of data,
            statistical learning and validation to make useful predictions for
            health, medical and biomedical problems.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {[
              ["Time", "50–70 min"],
              ["Level", "Introductory"],
              ["Focus", "Prediction"],
              ["Coding", "R in browser"],
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
        </section>

        <section className="mt-8 border-y border-slate-200 py-4">
          <div className="flex gap-3 overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 rounded-full border px-6 py-3 text-sm font-black transition ${
                  activeTab === tab
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-950"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        {activeTab === "Lecture" && (
          <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600">
              Conversational lecture
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              The first machine learning class begins
            </h2>

            <p className="mt-4 max-w-4xl text-base leading-7 text-slate-600">
              Scene: Prof Stat walks into a hospital data lab. Curious Learner,
              Dr Clinic and Leakage Monster are looking at the shared diabetes
              prediction dataset for the first time.
            </p>

            <div className="mt-8 space-y-4">
              <DialogueLine initials="CL" name="Curious Learner" tone="blue">
                I hear machine learning everywhere: diagnosis, screening,
                hospital readmission, cancer prognosis and genomics. But what
                exactly is machine learning in biostatistics?
              </DialogueLine>

              <DialogueLine initials="PS" name="Prof Stat">
                Machine learning in biostatistics means learning patterns from
                health data so that we can make predictions for new patients,
                samples or populations.
              </DialogueLine>

              <DialogueLine initials="DC" name="Dr Clinic" tone="green">
                So it is not just “fit an algorithm and report accuracy”?
              </DialogueLine>

              <DialogueLine initials="PS" name="Prof Stat">
                Correct. In medicine, a model must answer a clear prediction
                question. It must use predictors available at the prediction
                time, be tested on unseen data and be interpreted in clinical
                context.
              </DialogueLine>

              <DialogueLine initials="LM" name="Leakage Monster" tone="rose">
                Unless someone accidentally uses information from the future.
                Then I can make a model look brilliant during development and
                useless in real life.
              </DialogueLine>

              <DialogueLine initials="CL" name="Curious Learner" tone="blue">
                So the first question is not “Which algorithm is most advanced?”
                It is “What are we trying to predict, and can we trust the
                prediction?”
              </DialogueLine>

              <DialogueLine initials="PS" name="Prof Stat">
                Exactly. That is the heart of machine learning in
                biostatistics.
              </DialogueLine>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-950 p-6 text-white">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-300">
                Big idea
              </p>
              <p className="mt-3 text-xl font-black leading-8 md:text-2xl">
                Machine learning in biostatistics is not algorithm competition.
                It is prediction modelling with careful validation, clinical
                interpretation and responsible use.
              </p>
            </div>

            <div className="mt-8 space-y-5 text-base leading-8 text-slate-700">
              <h3 className="text-2xl font-black text-slate-950">
                Why we use the same dataset across the course
              </h3>

              <p>
                This course uses a shared diabetes prediction dataset across the
                early modules. This keeps the story coherent. In this first
                lesson, the dataset introduces the idea of prediction. Later, the
                same setting will be used for logistic regression, validation,
                classification metrics, ROC/AUC, calibration, regularisation and
                case-study reporting.
              </p>

              <p>
                By keeping the context stable, you can focus on how the modelling
                ideas develop instead of learning a new dataset every lesson.
              </p>
            </div>
          </section>
        )}

        {activeTab === "Detailed Notes" && (
          <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600">
              Detailed notes
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              Machine learning as prediction modelling
            </h2>

            <div className="mt-8 space-y-7 text-base leading-8 text-slate-700">
              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  1. Machine learning
                </h3>
                <p className="mt-2">
                  Machine learning is a collection of methods that learn
                  patterns from data. In biostatistics, those patterns are often
                  used to predict medical or biomedical outcomes, such as disease
                  status, future risk, treatment response or survival.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  2. Prediction question
                </h3>
                <p className="mt-2">
                  In this lesson, the prediction question is: can routinely
                  measured clinical characteristics help predict diabetes status?
                  The outcome is <strong>diabetes</strong>, coded as{" "}
                  <strong>neg</strong> or <strong>pos</strong>. The candidate
                  predictors are pregnant, glucose, pressure, triceps, insulin,
                  mass, pedigree and age.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  3. Outcome imbalance
                </h3>
                <p className="mt-2">
                  The dataset contains 500 diabetes-negative patients and 268
                  diabetes-positive patients. That means the negative class is
                  more common. Later, this will matter because accuracy alone can
                  hide poor detection of the positive class.
                </p>
              </div>

              <figure className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <img
                  src={withBasePath(
                    "/ml-biostatistics/figures/module-1/lesson-1-1-outcome-distribution.png"
                  )}
                  alt="Diabetes outcome distribution"
                  className="w-full rounded-2xl border border-slate-200 bg-white"
                />
                <figcaption className="mt-4 text-sm leading-6 text-slate-600">
                  Diabetes-negative patients are more common than
                  diabetes-positive patients. This is why we should not rely only
                  on accuracy.
                </figcaption>
              </figure>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  4. Predictor patterns
                </h3>
                <p className="mt-2">
                  The diabetes-positive group has higher average glucose and BMI.
                  In the script output, mean glucose is about 110 in the negative
                  group and 141 in the positive group. Mean BMI is about 30.3 in
                  the negative group and 35.1 in the positive group.
                </p>
                <p className="mt-2">
                  This suggests glucose and BMI may help prediction. However,
                  this does not prove causation. A prediction model may use
                  variables that are informative without proving that changing
                  those variables would change the outcome.
                </p>
              </div>

              <figure className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <img
                  src={withBasePath(
                    "/ml-biostatistics/figures/module-1/lesson-1-1-glucose-by-diabetes.png"
                  )}
                  alt="Glucose values by diabetes status"
                  className="w-full rounded-2xl border border-slate-200 bg-white"
                />
                <figcaption className="mt-4 text-sm leading-6 text-slate-600">
                  Glucose values tend to be higher among diabetes-positive
                  patients, so glucose is likely to be useful for prediction.
                </figcaption>
              </figure>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  5. Training and testing
                </h3>
                <p className="mt-2">
                  The script splits the data into 537 training rows and 231 test
                  rows. The model learns from the training data. The test data
                  are held back and used to ask whether the model generalises to
                  unseen patients.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  6. First simple model
                </h3>
                <p className="mt-2">
                  The first model uses glucose, BMI/mass and age to predict
                  diabetes status. It produces predicted probabilities for test
                  patients. At threshold 0.50, the model achieved accuracy 0.779,
                  sensitivity 0.625 and specificity 0.849.
                </p>
              </div>

              <figure className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <img
                  src={withBasePath(
                    "/ml-biostatistics/figures/module-1/lesson-1-1-predicted-risk-distribution.png"
                  )}
                  alt="Predicted diabetes risk distribution"
                  className="w-full rounded-2xl border border-slate-200 bg-white"
                />
                <figcaption className="mt-4 text-sm leading-6 text-slate-600">
                  The model gives each test patient a predicted probability.
                  Positive cases tend to have higher predicted risks, but the two
                  groups still overlap.
                </figcaption>
              </figure>
            </div>
          </section>
        )}

        {activeTab === "Interactive Lab" && (
          <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600">
              Interactive lab
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              Think before fitting the model
            </h2>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-2xl font-black text-slate-950">
                  Is this a prediction, explanation or causal question?
                </h3>

                <p className="mt-3 text-base leading-7 text-slate-700">
                  Choose the best description for the question: “Can routinely
                  measured clinical characteristics help predict diabetes
                  status?”
                </p>

                <div className="mt-5 grid gap-3">
                  {[
                    ["classification", "Prediction / classification"],
                    ["explanation", "Explanation of associations"],
                    ["causal", "Causal effect estimation"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => setPredictionChoice(value)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
                        predictionChoice === value
                          ? "border-slate-950 bg-slate-950 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-blue-50"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700">
                  {predictionChoice === "classification"
                    ? "Correct. The main task is to predict whether a patient belongs to the diabetes-positive or diabetes-negative class."
                    : predictionChoice === "explanation"
                    ? "This may be related, but it is not the main aim here. The lesson focuses on predicting a new patient's diabetes status."
                    : "This is not a causal question. The model does not prove that changing glucose or BMI would cause a change in diabetes status."}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-2xl font-black text-slate-950">
                  Threshold thinking
                </h3>

                <p className="mt-3 text-base leading-7 text-slate-700">
                  A threshold turns predicted probabilities into predicted
                  classes. Move the slider and think about clinical behaviour.
                </p>

                <label className="mt-5 block text-sm font-black uppercase tracking-[0.18em] text-slate-600">
                  Threshold: {threshold.toFixed(2)}
                </label>

                <input
                  type="range"
                  min={0.2}
                  max={0.8}
                  step={0.05}
                  value={threshold}
                  onChange={(event) => setThreshold(Number(event.target.value))}
                  className="mt-4 w-full"
                />

                <div className="mt-5 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700">
                  {thresholdComment}
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-950 p-6 text-white">
              <h3 className="text-2xl font-black">Read the figure</h3>
              <p className="mt-3 text-base leading-7 text-slate-300">
                In the predicted-risk distribution, the positive and negative
                groups overlap. This means the model separates the groups
                imperfectly. Some negative patients receive high predicted risks,
                and some positive patients receive low predicted risks. This is
                why medical ML requires uncertainty-aware interpretation.
              </p>
            </div>
          </section>
        )}

        {activeTab === "R Coding Lab" && (
          <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600">
              R coding lab
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              Run the first prediction workflow in the browser
            </h2>

            <p className="mt-4 max-w-4xl text-base leading-7 text-slate-600">
              This browser lab loads the shared diabetes CSV, fits the first
              simple prediction model and prints the model output. The full local
              script also saves the figures used in this lesson.
            </p>

            <WebRCodeRunner />

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-2xl font-black text-slate-950">
                How to interpret the output
              </h3>

              <div className="mt-5 space-y-4 text-base leading-7 text-slate-700">
                <p>
                  The output first confirms the dataset size and variable names.
                  Then it shows the outcome distribution: 500 negative and 268
                  positive observations.
                </p>

                <p>
                  The group summaries compare mean glucose, BMI and age between
                  diabetes-negative and diabetes-positive groups. These
                  differences suggest predictive signal.
                </p>

                <p>
                  The logistic regression model uses glucose, BMI/mass and age.
                  The coefficients are model associations. They are not causal
                  effects.
                </p>

                <p>
                  The confusion matrix and metrics are the first performance
                  check. Accuracy is 0.779, sensitivity is 0.625 and specificity
                  is 0.849 in the local script run.
                </p>
              </div>

              <a
                href={withBasePath(
                  "/ml-biostatistics/r/module-1/lesson-1-1-what-is-ml-biostatistics.R"
                )}
                download
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-slate-800 sm:w-auto"
              >
                Download full R script
              </a>
            </div>
          </section>
        )}

        {activeTab === "Report" && (
          <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600">
              Reporting
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              How to report this first model
            </h2>

            <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
              <p>
                In this introductory analysis, the shared diabetes prediction
                dataset contained 768 observations and 10 variables. The outcome
                was diabetes status, with 500 diabetes-negative and 268
                diabetes-positive observations.
              </p>

              <p>
                The initial prediction question was whether routinely measured
                clinical characteristics could help predict diabetes status. A
                simple logistic regression model was fitted using glucose,
                BMI/mass and age as predictors.
              </p>

              <p>
                The data were split into 537 training observations and 231 test
                observations. The model was fitted on the training data and
                evaluated on the test data to introduce the idea of
                generalisation to unseen patients.
              </p>

              <p>
                At threshold 0.50, the model achieved accuracy 0.779,
                sensitivity 0.625 and specificity 0.849. This means the model
                was better at identifying diabetes-negative patients than
                detecting all diabetes-positive patients.
              </p>

              <p>
                This result should be interpreted as an introductory prediction
                exercise, not as a deployable clinical model. Later lessons will
                extend this workflow to ROC/AUC, calibration, resampling,
                regularisation, clinical usefulness and reporting limitations.
              </p>
            </div>

            <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6">
              <h3 className="text-2xl font-black text-slate-950">
                Safe interpretation
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-700">
                Glucose, BMI and age may help predict diabetes status in this
                dataset. This does not mean that the model has estimated causal
                effects. Prediction and causation are different goals.
              </p>
            </div>
          </section>
        )}

        {activeTab === "Quiz" && (
          <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600">
              Quiz
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              Check your understanding
            </h2>

            <div className="mt-8 space-y-4">
              {[
                {
                  q: "What is the main prediction question in this lesson?",
                  a: "Can routinely measured clinical characteristics help predict diabetes status?",
                },
                {
                  q: "Why is accuracy alone not enough?",
                  a: "Because the outcome is imbalanced and accuracy can hide poor detection of the diabetes-positive group.",
                },
                {
                  q: "What is the purpose of the test set?",
                  a: "The test set checks whether the model generalises to unseen patients.",
                },
                {
                  q: "What does sensitivity measure?",
                  a: "Sensitivity measures the proportion of diabetes-positive patients correctly detected.",
                },
                {
                  q: "What does specificity measure?",
                  a: "Specificity measures the proportion of diabetes-negative patients correctly identified.",
                },
                {
                  q: "Why should coefficients not automatically be interpreted causally?",
                  a: "Because the model is built for prediction. Association inside a prediction model does not prove causal effect.",
                },
              ].map((item, index) => (
                <details
                  key={item.q}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                >
                  <summary className="cursor-pointer text-base font-black text-slate-950">
                    Question {index + 1}: {item.q}
                  </summary>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        <section className="mt-10 rounded-[2rem] bg-slate-950 p-6 text-white md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-300">
            Lesson complete
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
            Next, separate prediction from explanation and causation.
          </h2>

          <p className="mt-5 max-w-4xl text-base leading-7 text-slate-300">
            The next lesson explains why a model can predict well without proving
            cause, and why causal language must be used carefully in medical ML.
          </p>

          <a
            href={withBasePath(
              "/courses/machine-learning-biostatistics/modules/foundations/lessons/prediction-explanation-causal-thinking"
            )}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100 sm:w-auto"
          >
            Next lesson →
          </a>
        </section>
      </section>
    </main>
  );
}