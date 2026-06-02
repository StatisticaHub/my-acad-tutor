"use client";

import { useMemo, useState } from "react";
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
# What is machine learning in biostatistics?

# The website loads diabetes_data from the shared course CSV.
# You can edit and run this code.

cat("Lesson 1.1: What is machine learning in biostatistics?\\n")
cat("------------------------------------------------------\\n\\n")

# 1. Inspect the dataset
cat("Dataset dimensions:\\n")
print(dim(diabetes_data))

cat("\\nVariable names:\\n")
print(names(diabetes_data))

cat("\\nFirst rows:\\n")
print(head(diabetes_data))

# 2. Outcome distribution
cat("\\nOutcome distribution:\\n")
print(table(diabetes_data$diabetes))

cat("\\nOutcome percentages:\\n")
print(round(100 * prop.table(table(diabetes_data$diabetes)), 1))

# 3. Compare predictor means by diabetes status
cat("\\nMean glucose, BMI/mass and age by diabetes status:\\n")
print(
  aggregate(
    cbind(glucose, mass, age) ~ diabetes,
    data = diabetes_data,
    FUN = mean
  )
)

# 4. Train/test split
set.seed(2026)

train_id <- sample(
  seq_len(nrow(diabetes_data)),
  size = 0.7 * nrow(diabetes_data)
)

train_data <- diabetes_data[train_id, ]
test_data <- diabetes_data[-train_id, ]

cat("\\nTraining rows:", nrow(train_data), "\\n")
cat("Test rows:", nrow(test_data), "\\n")

# 5. Fit a first simple prediction model
model <- glm(
  diabetes_binary ~ glucose + mass + age,
  data = train_data,
  family = binomial
)

cat("\\nModel summary:\\n")
print(summary(model))

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

cat("\\nConfusion matrix at threshold 0.50:\\n")
print(confusion_matrix)

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
cat("This is a first prediction workflow.\\n")
cat("The model learns from training data and is checked on test data.\\n")
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
  tone?: "neutral" | "blue" | "green" | "rose" | "amber";
}) {
  const toneClass =
    tone === "blue"
      ? "bg-blue-50"
      : tone === "green"
      ? "bg-emerald-50"
      : tone === "rose"
      ? "bg-rose-50"
      : tone === "amber"
      ? "bg-amber-50"
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

function TopicCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <h3 className="text-lg font-black text-slate-950">{title}</h3>
      <div className="mt-3 text-sm leading-7 text-slate-600">{children}</div>
    </article>
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
              Runs in the browser using WebR and the shared diabetes CSV.
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

const toyPatients = [
  { id: "A", glucose: 92, mass: 24, age: 26, risk: 0.08, observed: 0 },
  { id: "B", glucose: 104, mass: 28, age: 31, risk: 0.18, observed: 0 },
  { id: "C", glucose: 118, mass: 31, age: 39, risk: 0.34, observed: 0 },
  { id: "D", glucose: 126, mass: 33, age: 42, risk: 0.46, observed: 1 },
  { id: "E", glucose: 137, mass: 35, age: 45, risk: 0.57, observed: 1 },
  { id: "F", glucose: 145, mass: 37, age: 48, risk: 0.66, observed: 0 },
  { id: "G", glucose: 158, mass: 39, age: 52, risk: 0.79, observed: 1 },
  { id: "H", glucose: 171, mass: 42, age: 56, risk: 0.88, observed: 1 },
];

const learningTopics = [
  {
    title: "Prediction question",
    body: "What outcome do we want to predict, for whom, and at what moment?",
  },
  {
    title: "Predictors",
    body: "Which variables are available before the prediction is made?",
  },
  {
    title: "Learning",
    body: "How does the model estimate a rule from training examples?",
  },
  {
    title: "Validation",
    body: "Does the rule work on unseen patients, not only the patients used to fit it?",
  },
  {
    title: "Threshold",
    body: "How do predicted probabilities become clinical categories?",
  },
  {
    title: "Interpretation",
    body: "What can we say safely, and what would be overclaiming?",
  },
];

export default function WhatIsMachineLearningInBiostatisticsPage() {
  const [activeTab, setActiveTab] = useState("Lecture");
  const [threshold, setThreshold] = useState(0.5);
  const [predictionChoice, setPredictionChoice] = useState("classification");
  const [selectedPatient, setSelectedPatient] = useState("E");
  const [scenarioChoice, setScenarioChoice] = useState("valid");

  const selectedPatientData =
    toyPatients.find((patient) => patient.id === selectedPatient) ??
    toyPatients[0];

  const toyMetrics = useMemo(() => {
    const predictions = toyPatients.map((patient) => ({
      ...patient,
      predicted: patient.risk >= threshold ? 1 : 0,
    }));

    const tp = predictions.filter(
      (patient) => patient.observed === 1 && patient.predicted === 1
    ).length;
    const fp = predictions.filter(
      (patient) => patient.observed === 0 && patient.predicted === 1
    ).length;
    const tn = predictions.filter(
      (patient) => patient.observed === 0 && patient.predicted === 0
    ).length;
    const fn = predictions.filter(
      (patient) => patient.observed === 1 && patient.predicted === 0
    ).length;

    const accuracy = (tp + tn) / predictions.length;
    const sensitivity = tp + fn === 0 ? 0 : tp / (tp + fn);
    const specificity = tn + fp === 0 ? 0 : tn / (tn + fp);

    return {
      predictions,
      tp,
      fp,
      tn,
      fn,
      accuracy,
      sensitivity,
      specificity,
    };
  }, [threshold]);

  const thresholdComment =
    threshold < 0.35
      ? "This threshold is screening-focused. It detects more possible positives, but creates more false positives."
      : threshold < 0.55
      ? "This threshold is moderately balanced. It avoids some false positives while still detecting many positives."
      : "This threshold is conservative. It reduces false positives, but more diabetes-positive patients may be missed.";

  const scenarioFeedback =
    scenarioChoice === "valid"
      ? "Correct direction. This is a valid prediction setup because the model uses baseline clinical variables that are available before the prediction is made."
      : scenarioChoice === "leakage"
      ? "This is dangerous. A future diagnosis code or post-outcome information would leak the answer into the model and exaggerate performance."
      : "This is a different scientific aim. Estimating the causal effect of changing BMI or glucose requires causal assumptions and design, not only a prediction model.";

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
              ["Time", "60–80 min"],
              ["Level", "Introductory → deeper"],
              ["Focus", "Prediction workflow"],
              ["Coding", "R in browser"],
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
              A hospital data lab conversation
            </h2>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">
                Topics being explained in this lecture
              </p>

              <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {learningTopics.map((topic) => (
                  <div
                    key={topic.title}
                    className="rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <p className="font-black text-slate-950">{topic.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {topic.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <DialogueLine initials="CL" name="Curious Learner" tone="blue">
                I keep hearing that machine learning can predict disease,
                identify high-risk patients and analyse medical data. But in
                biostatistics, what does “machine learning” actually mean?
              </DialogueLine>

              <DialogueLine initials="PS" name="Prof Stat">
                In biostatistics, machine learning means learning a prediction
                rule from health data. The rule uses patient information, which
                we call predictors, to estimate an outcome for a new patient.
              </DialogueLine>

              <DialogueLine initials="CL" name="Curious Learner" tone="blue">
                So the first topic is prediction. What is our prediction problem
                in this lesson?
              </DialogueLine>

              <DialogueLine initials="PS" name="Prof Stat">
                We ask whether routinely measured clinical variables can predict
                diabetes status. The outcome is diabetes: negative or positive.
                The predictors include glucose, BMI/mass and age.
              </DialogueLine>

              <DialogueLine initials="DC" name="Dr Clinic" tone="green">
                That sounds clinically meaningful. A risk prediction model could
                help decide who needs further testing, monitoring or follow-up.
              </DialogueLine>

              <DialogueLine initials="PS" name="Prof Stat">
                Yes, but the wording matters. We are predicting diabetes status.
                We are not yet claiming that glucose or BMI causes diabetes in
                this dataset.
              </DialogueLine>

              <DialogueLine initials="CL" name="Curious Learner" tone="blue">
                Why not? If glucose is higher in diabetes-positive patients, does
                that not explain the disease?
              </DialogueLine>

              <DialogueLine initials="PS" name="Prof Stat">
                It may help prediction, but prediction and explanation are not
                the same. A variable can be useful for predicting an outcome
                without proving a causal mechanism.
              </DialogueLine>

              <DialogueLine initials="LM" name="Leakage Monster" tone="rose">
                And I have another warning. If you accidentally include future
                information, like a diagnosis code recorded after the outcome,
                your model may look amazing but fail in real clinical use.
              </DialogueLine>

              <DialogueLine initials="DC" name="Dr Clinic" tone="green">
                So every predictor must be available when the prediction is made.
                A model used at triage cannot use information recorded after
                diagnosis.
              </DialogueLine>

              <DialogueLine initials="PS" name="Prof Stat">
                Exactly. That is why machine learning in biostatistics is more
                than fitting an algorithm. We need a valid prediction question, a
                correct prediction time, appropriate predictors and honest
                validation.
              </DialogueLine>

              <DialogueLine initials="CL" name="Curious Learner" tone="blue">
                What does the model actually learn from the data?
              </DialogueLine>

              <DialogueLine initials="PS" name="Prof Stat">
                It learns a mathematical rule. For a binary outcome, a simple
                logistic prediction model estimates a probability between 0 and
                1. For example, a patient may receive predicted risk 0.72, which
                means the model estimates a 72% probability of diabetes-positive
                status.
              </DialogueLine>

              <DialogueLine initials="CL" name="Curious Learner" tone="blue">
                Then why do we need a threshold?
              </DialogueLine>

              <DialogueLine initials="PS" name="Prof Stat">
                The probability is continuous. A threshold converts that
                probability into a class. At threshold 0.50, risk 0.72 becomes
                predicted positive. But if we choose threshold 0.80, the same
                patient becomes predicted negative.
              </DialogueLine>

              <DialogueLine initials="DC" name="Dr Clinic" tone="green">
                That means the threshold changes clinical behaviour. A low
                threshold may detect more high-risk patients but also create more
                false positives.
              </DialogueLine>

              <DialogueLine initials="PS" name="Prof Stat">
                Correct. That is why we evaluate accuracy, sensitivity and
                specificity. Accuracy tells us overall correctness. Sensitivity
                tells us how many positive patients we detect. Specificity tells
                us how many negative patients we correctly rule out.
              </DialogueLine>

              <DialogueLine initials="LM" name="Leakage Monster" tone="rose">
                And please do not celebrate high accuracy too early. If the data
                are imbalanced, a model can look accurate while missing the
                patients you care most about.
              </DialogueLine>

              <DialogueLine initials="CL" name="Curious Learner" tone="blue">
                So the answer to “What is machine learning in biostatistics?” is
                not just “algorithms”. It is a whole prediction workflow.
              </DialogueLine>

              <DialogueLine initials="PS" name="Prof Stat">
                Exactly. It is a workflow: define the question, check the data,
                fit a model, test on unseen patients, study errors, interpret
                clinically and report limitations.
              </DialogueLine>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-950 p-6 text-white">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-300">
                Big idea
              </p>
              <p className="mt-3 text-xl font-black leading-8 md:text-2xl">
                Machine learning in biostatistics is not algorithm competition.
                It is prediction modelling with clinical timing, validation,
                threshold judgement and responsible interpretation.
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
              Machine learning as a biostatistical prediction workflow
            </h2>

            <div className="mt-8 space-y-8 text-base leading-8 text-slate-700">
              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  1. The central idea
                </h3>
                <p className="mt-3">
                  Machine learning is often described as a set of algorithms.
                  In biostatistics, it is better to think of it as a structured
                  prediction workflow. The aim is to use observed data to build a
                  rule that can make predictions for new patients, biological
                  samples or populations.
                </p>

                <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="font-mono text-sm leading-7 text-slate-700">
                    Data: (X₁, Y₁), (X₂, Y₂), ..., (Xₙ, Yₙ)
                    <br />
                    Predictors: X = patient measurements
                    <br />
                    Outcome: Y = diabetes status
                    <br />
                    Model goal: learn f(X) ≈ Y
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  2. Prediction question
                </h3>
                <p className="mt-3">
                  A machine learning project should begin with a precise
                  prediction question. In this lesson, the question is:
                </p>

                <p className="mt-4 rounded-3xl bg-slate-950 p-6 text-xl font-black leading-8 text-white">
                  Can routinely measured clinical characteristics help predict
                  diabetes status?
                </p>

                <p className="mt-4">
                  This question defines the outcome, the broad target population
                  and the intended modelling goal. It is not asking whether a
                  predictor causes diabetes. It is asking whether available
                  variables can help estimate the probability of diabetes status.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  3. Predictors and outcome
                </h3>

                <div className="mt-5 overflow-x-auto rounded-3xl border border-slate-200">
                  <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                    <thead className="bg-slate-950 text-white">
                      <tr>
                        <th className="p-4">Element</th>
                        <th className="p-4">In this lesson</th>
                        <th className="p-4">Why it matters</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [
                          "Outcome",
                          "diabetes / diabetes_binary",
                          "This is what the model tries to predict.",
                        ],
                        [
                          "Predictors",
                          "glucose, mass, age and other clinical variables",
                          "These are the inputs used to estimate risk.",
                        ],
                        [
                          "Prediction time",
                          "When routine clinical variables are available",
                          "Only variables available at this time should be used.",
                        ],
                        [
                          "Prediction output",
                          "A probability between 0 and 1",
                          "The model estimates risk before a threshold is applied.",
                        ],
                      ].map((row) => (
                        <tr key={row[0]} className="border-t border-slate-200">
                          <td className="p-4 font-black text-slate-950">
                            {row[0]}
                          </td>
                          <td className="p-4 text-slate-600">{row[1]}</td>
                          <td className="p-4 text-slate-600">{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  4. Outcome imbalance
                </h3>
                <p className="mt-3">
                  The dataset contains 768 rows. There are 500
                  diabetes-negative patients and 268 diabetes-positive patients.
                  This means the negative class is more common. In imbalanced
                  outcomes, accuracy can be misleading because a model may appear
                  accurate while performing poorly for the smaller but clinically
                  important group.
                </p>

                <figure className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <img
                    src={withBasePath(
                      "/ml-biostatistics/figures/module-1/lesson-1-1-outcome-distribution.png"
                    )}
                    alt="Diabetes outcome distribution"
                    className="w-full rounded-2xl border border-slate-200 bg-white"
                  />
                  <figcaption className="mt-4 text-sm leading-6 text-slate-600">
                    The negative class is larger than the positive class. This
                    motivates reporting sensitivity and specificity, not only
                    accuracy.
                  </figcaption>
                </figure>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  5. Predictor signal
                </h3>
                <p className="mt-3">
                  In the local script output, mean glucose is about 110 among
                  diabetes-negative patients and about 141 among
                  diabetes-positive patients. Mean BMI/mass is about 30.3 in the
                  negative group and about 35.1 in the positive group. These
                  differences suggest predictive signal.
                </p>

                <p className="mt-3">
                  Predictive signal means that the predictor contains
                  information that helps separate outcome groups. It does not
                  automatically mean the predictor is a causal effect.
                </p>

                <figure className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <img
                    src={withBasePath(
                      "/ml-biostatistics/figures/module-1/lesson-1-1-glucose-by-diabetes.png"
                    )}
                    alt="Glucose values by diabetes status"
                    className="w-full rounded-2xl border border-slate-200 bg-white"
                  />
                  <figcaption className="mt-4 text-sm leading-6 text-slate-600">
                    Glucose values tend to be higher among diabetes-positive
                    patients, although the groups still overlap.
                  </figcaption>
                </figure>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  6. Logistic prediction model
                </h3>
                <p className="mt-3">
                  Because the outcome is binary, a simple first model is
                  logistic regression. The model estimates a probability:
                </p>

                <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="font-mono text-sm leading-7 text-slate-700">
                    logit[P(Y = 1 | X)] = β₀ + β₁ glucose + β₂ mass + β₃ age
                    <br />
                    P(Y = 1 | X) = 1 / [1 + exp(-η)]
                  </p>
                </div>

                <p className="mt-4">
                  Here, <span className="font-mono">Y = 1</span> means
                  diabetes-positive status. The model does not directly produce
                  a diagnosis. It produces a predicted probability.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  7. Training and test data
                </h3>
                <p className="mt-3">
                  The script splits the dataset into 537 training rows and 231
                  test rows. The training data are used to estimate the model.
                  The test data are held back and used to evaluate performance
                  on unseen patients.
                </p>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <TopicCard title="Training data">
                    Used to fit the model. The algorithm is allowed to learn
                    patterns from these rows.
                  </TopicCard>

                  <TopicCard title="Test data">
                    Used after fitting. It gives a more honest estimate of how
                    the model may perform on new patients.
                  </TopicCard>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  8. Threshold and classification
                </h3>
                <p className="mt-3">
                  The model gives each test patient a predicted probability. To
                  turn probabilities into predicted classes, we choose a
                  threshold. At threshold 0.50:
                </p>

                <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="font-mono text-sm leading-7 text-slate-700">
                    If predicted risk ≥ 0.50 → predicted positive
                    <br />
                    If predicted risk &lt; 0.50 → predicted negative
                  </p>
                </div>

                <p className="mt-4">
                  The threshold is not purely statistical. It depends on the
                  clinical consequences of false positives and false negatives.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  9. First performance results
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {[
                    [
                      "Accuracy",
                      "0.779",
                      "Overall proportion correctly classified.",
                    ],
                    [
                      "Sensitivity",
                      "0.625",
                      "Proportion of diabetes-positive patients detected.",
                    ],
                    [
                      "Specificity",
                      "0.849",
                      "Proportion of diabetes-negative patients correctly identified.",
                    ],
                  ].map(([label, value, note]) => (
                    <div
                      key={label}
                      className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                    >
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                        {label}
                      </p>
                      <p className="mt-2 text-3xl font-black text-blue-700">
                        {value}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {note}
                      </p>
                    </div>
                  ))}
                </div>

                <figure className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <img
                    src={withBasePath(
                      "/ml-biostatistics/figures/module-1/lesson-1-1-predicted-risk-distribution.png"
                    )}
                    alt="Predicted diabetes risk distribution"
                    className="w-full rounded-2xl border border-slate-200 bg-white"
                  />
                  <figcaption className="mt-4 text-sm leading-6 text-slate-600">
                    Positive cases tend to have higher predicted risks, but the
                    two groups overlap. This is why prediction is probabilistic,
                    not certain.
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>
        )}

        {activeTab === "Interactive Lab" && (
          <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600">
              Advanced interactive lab
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              Explore prediction, threshold behaviour and model interpretation
            </h2>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-2xl font-black text-slate-950">
                  Lab 1: classify the scientific question
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
                  Lab 2: choose a patient and inspect risk
                </h3>

                <p className="mt-3 text-base leading-7 text-slate-700">
                  Select a patient from the toy risk table. The values are
                  simplified for teaching, but the logic matches the real
                  prediction workflow.
                </p>

                <div className="mt-5 grid grid-cols-4 gap-2">
                  {toyPatients.map((patient) => (
                    <button
                      key={patient.id}
                      onClick={() => setSelectedPatient(patient.id)}
                      className={`rounded-2xl border px-4 py-3 text-sm font-black transition ${
                        selectedPatient === patient.id
                          ? "border-slate-950 bg-slate-950 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-blue-50"
                      }`}
                    >
                      {patient.id}
                    </button>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-white p-4">
                  <div className="grid gap-3 sm:grid-cols-4">
                    {[
                      ["Glucose", selectedPatientData.glucose],
                      ["BMI/mass", selectedPatientData.mass],
                      ["Age", selectedPatientData.age],
                      ["Risk", selectedPatientData.risk.toFixed(2)],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                          {label}
                        </p>
                        <p className="mt-1 text-lg font-black text-slate-950">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 h-4 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${selectedPatientData.risk * 100}%` }}
                    />
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    At threshold {threshold.toFixed(2)}, this patient is
                    predicted as{" "}
                    <strong>
                      {selectedPatientData.risk >= threshold
                        ? "positive"
                        : "negative"}
                    </strong>
                    .
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-2xl font-black text-slate-950">
                Lab 3: threshold slider with live confusion matrix
              </h3>

              <p className="mt-3 max-w-4xl text-base leading-7 text-slate-700">
                Move the threshold. Watch how the same predicted risks produce
                different classifications, different errors and different
                clinical behaviour.
              </p>

              <label className="mt-6 block text-sm font-black uppercase tracking-[0.18em] text-slate-600">
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

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  ["Accuracy", toyMetrics.accuracy.toFixed(3)],
                  ["Sensitivity", toyMetrics.sensitivity.toFixed(3)],
                  ["Specificity", toyMetrics.specificity.toFixed(3)],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-3xl border border-slate-200 bg-white p-5"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                      {label}
                    </p>
                    <p className="mt-2 text-3xl font-black text-blue-700">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 overflow-x-auto rounded-3xl border border-slate-200">
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
                      <th className="bg-white p-4 text-left font-black">
                        Observed negative
                      </th>
                      <td className="bg-emerald-50 p-4 text-2xl font-black text-emerald-700">
                        {toyMetrics.tn}
                      </td>
                      <td className="bg-rose-50 p-4 text-2xl font-black text-rose-700">
                        {toyMetrics.fp}
                      </td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <th className="bg-white p-4 text-left font-black">
                        Observed positive
                      </th>
                      <td className="bg-rose-50 p-4 text-2xl font-black text-rose-700">
                        {toyMetrics.fn}
                      </td>
                      <td className="bg-emerald-50 p-4 text-2xl font-black text-emerald-700">
                        {toyMetrics.tp}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 overflow-x-auto rounded-3xl border border-slate-200">
                <table className="w-full min-w-[840px] border-collapse text-left text-sm">
                  <thead className="bg-slate-950 text-white">
                    <tr>
                      <th className="p-4">Patient</th>
                      <th className="p-4">Glucose</th>
                      <th className="p-4">BMI/mass</th>
                      <th className="p-4">Age</th>
                      <th className="p-4">Predicted risk</th>
                      <th className="p-4">Observed</th>
                      <th className="p-4">Predicted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {toyMetrics.predictions.map((patient) => (
                      <tr key={patient.id} className="border-t border-slate-200">
                        <td className="p-4 font-black text-slate-950">
                          {patient.id}
                        </td>
                        <td className="p-4 text-slate-600">
                          {patient.glucose}
                        </td>
                        <td className="p-4 text-slate-600">{patient.mass}</td>
                        <td className="p-4 text-slate-600">{patient.age}</td>
                        <td className="p-4 text-slate-600">
                          {patient.risk.toFixed(2)}
                        </td>
                        <td className="p-4 text-slate-600">
                          {patient.observed === 1 ? "Positive" : "Negative"}
                        </td>
                        <td
                          className={`p-4 font-black ${
                            patient.predicted === patient.observed
                              ? "text-emerald-700"
                              : "text-rose-700"
                          }`}
                        >
                          {patient.predicted === 1 ? "Positive" : "Negative"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-2xl font-black text-slate-950">
                  Lab 4: simple risk plot
                </h3>

                <p className="mt-3 text-base leading-7 text-slate-700">
                  Each bar is a predicted risk. The vertical threshold line is
                  represented by the slider value. Patients above the threshold
                  are predicted positive.
                </p>

                <div className="mt-6 space-y-3">
                  {toyPatients.map((patient) => (
                    <div key={patient.id} className="grid grid-cols-[2rem_1fr_4rem] gap-3">
                      <p className="font-black text-slate-950">{patient.id}</p>
                      <div className="h-6 overflow-hidden rounded-full bg-white">
                        <div
                          className={`h-full rounded-full ${
                            patient.risk >= threshold
                              ? "bg-blue-600"
                              : "bg-slate-300"
                          }`}
                          style={{ width: `${patient.risk * 100}%` }}
                        />
                      </div>
                      <p className="text-right font-mono text-sm text-slate-600">
                        {patient.risk.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-2xl font-black text-slate-950">
                  Lab 5: leakage and causal warning
                </h3>

                <p className="mt-3 text-base leading-7 text-slate-700">
                  Choose the scenario and decide whether it is a valid
                  prediction setup.
                </p>

                <div className="mt-5 grid gap-3">
                  {[
                    ["valid", "Use baseline glucose, BMI/mass and age"],
                    ["leakage", "Use a future diagnosis code as a predictor"],
                    ["causal", "Claim that changing BMI causes diabetes change"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => setScenarioChoice(value)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
                        scenarioChoice === value
                          ? "border-slate-950 bg-slate-950 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-blue-50"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700">
                  {scenarioFeedback}
                </div>
              </div>
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
              simple prediction model and prints the model output. The full
              local script also saves the figures used in this lesson.
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
                  The group summaries compare mean glucose, BMI/mass and age
                  between diabetes-negative and diabetes-positive groups. These
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
            The next lesson explains why a model can predict well without
            proving cause, and why causal language must be used carefully in
            medical ML.
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