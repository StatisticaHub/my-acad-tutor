"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";

const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;

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
  "Output Guide",
  "Report",
  "Quiz",
];

const courseLinks = {
  module: "/courses/machine-learning-biostatistics/modules/foundations",
  next: "/courses/machine-learning-biostatistics/modules/foundations/lessons/prediction-explanation-causal-thinking",
  data: "/ml-biostatistics/data/shared-diabetes-prediction-data.csv",
  script: "/ml-biostatistics/r/module-1/lesson-1-1-what-is-ml-biostatistics.R",
};

type RResults = {
  hasRun: boolean;
  rows: string;
  columns: string;
  negativeCount: string;
  positiveCount: string;
  negativePercent: string;
  positivePercent: string;
  trainRows: string;
  testRows: string;
  accuracy: string;
  sensitivity: string;
  specificity: string;
  threshold: string;
  glucoseOR: string;
  massOR: string;
  ageOR: string;
  tn: string;
  fp: string;
  fn: string;
  tp: string;
};

const defaultRResults: RResults = {
  hasRun: false,
  rows: "not run yet",
  columns: "not run yet",
  negativeCount: "not run yet",
  positiveCount: "not run yet",
  negativePercent: "not run yet",
  positivePercent: "not run yet",
  trainRows: "not run yet",
  testRows: "not run yet",
  accuracy: "not run yet",
  sensitivity: "not run yet",
  specificity: "not run yet",
  threshold: "0.50",
  glucoseOR: "not run yet",
  massOR: "not run yet",
  ageOR: "not run yet",
  tn: "not run yet",
  fp: "not run yet",
  fn: "not run yet",
  tp: "not run yet",
};

function parseRResults(output: string): RResults {
  const results: RResults = { ...defaultRResults, hasRun: true };

  output.split("\n").forEach((line) => {
    if (!line.startsWith("MAT_RESULT|")) return;

    const [, key, value] = line.split("|");

    if (key && value !== undefined && key in results) {
      results[key as keyof RResults] = value.trim() as never;
    }
  });

  return results;
}

const browserRCode = `# Lesson 1.1 browser R lab
# What is machine learning in biostatistics?

cat("Lesson 1.1: What is machine learning in biostatistics?\\n")
cat("------------------------------------------------------\\n\\n")

# This lab tries to load the shared course CSV.
# If the CSV is unavailable in the browser, it creates a small reproducible
# demonstration dataset so the lesson still runs.

data_url <- "/ml-biostatistics/data/shared-diabetes-prediction-data.csv"

diabetes_data <- tryCatch(
  read.csv(data_url),
  error = function(e) {
    set.seed(2026)

    n <- 768
    age <- round(rnorm(n, mean = 33, sd = 12))
    glucose <- round(rnorm(n, mean = 120, sd = 31))
    mass <- round(rnorm(n, mean = 32, sd = 7))
    pressure <- round(rnorm(n, mean = 70, sd = 12))

    linear_score <- -8 + 0.045 * glucose + 0.055 * mass + 0.025 * age
    risk <- 1 / (1 + exp(-linear_score))
    diabetes_binary <- rbinom(n, size = 1, prob = risk)

    data.frame(
      glucose = glucose,
      pressure = pressure,
      mass = mass,
      age = age,
      diabetes_binary = diabetes_binary,
      diabetes = ifelse(diabetes_binary == 1, "positive", "negative")
    )
  }
)

names(diabetes_data) <- tolower(names(diabetes_data))

if (!"diabetes_binary" %in% names(diabetes_data)) {
  if ("diabetes" %in% names(diabetes_data)) {
    diabetes_data$diabetes_binary <- ifelse(
      diabetes_data$diabetes %in% c(1, "1", "positive", "Positive", "yes", "Yes"),
      1,
      0
    )
  }
}

if (!"diabetes" %in% names(diabetes_data)) {
  diabetes_data$diabetes <- ifelse(diabetes_data$diabetes_binary == 1, "positive", "negative")
}

cat("1) Dataset dimensions\\n")
print(dim(diabetes_data))
cat("MAT_RESULT|rows|", nrow(diabetes_data), "\\n", sep = "")
cat("MAT_RESULT|columns|", ncol(diabetes_data), "\\n", sep = "")

cat("\\n2) Variable names\\n")
print(names(diabetes_data))

cat("\\n3) First six rows\\n")
print(head(diabetes_data))

cat("\\n4) Outcome distribution\\n")
outcome_counts <- table(diabetes_data$diabetes)
print(outcome_counts)

cat("\\n5) Outcome percentages\\n")
outcome_percents <- round(100 * prop.table(outcome_counts), 1)
print(outcome_percents)

negative_label <- names(outcome_counts)[1]
positive_label <- names(outcome_counts)[length(outcome_counts)]

cat("MAT_RESULT|negativeCount|", outcome_counts[negative_label], "\\n", sep = "")
cat("MAT_RESULT|positiveCount|", outcome_counts[positive_label], "\\n", sep = "")
cat("MAT_RESULT|negativePercent|", outcome_percents[negative_label], "\\n", sep = "")
cat("MAT_RESULT|positivePercent|", outcome_percents[positive_label], "\\n", sep = "")

cat("\\n6) Mean glucose, BMI/mass and age by diabetes status\\n")
print(
  aggregate(
    cbind(glucose, mass, age) ~ diabetes,
    data = diabetes_data,
    FUN = mean
  )
)

set.seed(2026)

train_id <- sample(
  seq_len(nrow(diabetes_data)),
  size = floor(0.7 * nrow(diabetes_data))
)

train_data <- diabetes_data[train_id, ]
test_data <- diabetes_data[-train_id, ]

cat("\\n7) Training and test rows\\n")
cat("Training rows:", nrow(train_data), "\\n")
cat("Test rows:", nrow(test_data), "\\n")
cat("MAT_RESULT|trainRows|", nrow(train_data), "\\n", sep = "")
cat("MAT_RESULT|testRows|", nrow(test_data), "\\n", sep = "")

model <- glm(
  diabetes_binary ~ glucose + mass + age,
  data = train_data,
  family = binomial
)

cat("\\n8) Logistic regression model summary\\n")
print(summary(model))

odds_ratios <- round(exp(coef(model)), 3)

cat("\\nApproximate odds ratios\\n")
print(odds_ratios)

cat("MAT_RESULT|glucoseOR|", odds_ratios["glucose"], "\\n", sep = "")
cat("MAT_RESULT|massOR|", odds_ratios["mass"], "\\n", sep = "")
cat("MAT_RESULT|ageOR|", odds_ratios["age"], "\\n", sep = "")

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

confusion_matrix <- table(
  Observed = factor(test_data$diabetes_binary, levels = c(0, 1)),
  Predicted = factor(test_data$predicted_class, levels = c(0, 1))
)

cat("\\n9) Confusion matrix at threshold 0.50\\n")
print(confusion_matrix)

accuracy <- mean(test_data$diabetes_binary == test_data$predicted_class)

tn <- confusion_matrix["0", "0"]
fp <- confusion_matrix["0", "1"]
fn <- confusion_matrix["1", "0"]
tp <- confusion_matrix["1", "1"]

sensitivity <- tp / (tp + fn)
specificity <- tn / (tn + fp)

cat("\\n10) Performance summary\\n")
cat("Accuracy:", round(accuracy, 3), "\\n")
cat("Sensitivity:", round(sensitivity, 3), "\\n")
cat("Specificity:", round(specificity, 3), "\\n")

cat("MAT_RESULT|accuracy|", round(accuracy, 3), "\\n", sep = "")
cat("MAT_RESULT|sensitivity|", round(sensitivity, 3), "\\n", sep = "")
cat("MAT_RESULT|specificity|", round(specificity, 3), "\\n", sep = "")
cat("MAT_RESULT|threshold|0.50\\n")
cat("MAT_RESULT|tn|", tn, "\\n", sep = "")
cat("MAT_RESULT|fp|", fp, "\\n", sep = "")
cat("MAT_RESULT|fn|", fn, "\\n", sep = "")
cat("MAT_RESULT|tp|", tp, "\\n", sep = "")

cat("\\n11) First five predicted risks in unseen test data\\n")
print(
  head(
    test_data[, c("glucose", "mass", "age", "diabetes_binary", "predicted_risk", "predicted_class")],
    5
  )
)

cat("\\nInterpretation reminder:\\n")
cat("This model predicts diabetes status from routinely measured variables.\\n")
cat("It does not prove that glucose, BMI or age causally determine diabetes.\\n")
cat("Performance on test data is more honest than performance on training data.\\n")
cat("Threshold choice changes false positives and false negatives.\\n")
`;

const learningObjectives = [
  "Define machine learning in biostatistics as a prediction workflow, not just an algorithm list.",
  "Distinguish prediction, explanation and causation in a medical modelling problem.",
  "Recognise the roles of outcome, predictors, target population and prediction timing.",
  "Explain why train/test separation matters for future-patient performance.",
  "Run a first browser-based R workflow and interpret the output responsibly.",
  "Use script output to write a cautious report paragraph.",
  "Describe why accuracy alone is not enough for clinical prediction.",
];

const outputGuide = [
  {
    title: "Dataset dimensions",
    output:
      "The script prints the number of rows and columns in the diabetes dataset.",
    meaning:
      "Rows usually represent patients or observations. Columns represent measurements, predictors or outcomes. Before modelling, always ask what each row and column means clinically.",
  },
  {
    title: "Outcome distribution",
    output:
      "The script prints counts and percentages for diabetes-positive and diabetes-negative observations.",
    meaning:
      "If one outcome class is much more common, accuracy can be misleading. A model can appear accurate by mostly predicting the common class.",
  },
  {
    title: "Group summaries",
    output:
      "The script compares average glucose, BMI/mass and age by diabetes status.",
    meaning:
      "Differences between outcome groups suggest predictive signal, but they do not prove causation.",
  },
  {
    title: "Train/test split",
    output:
      "The script separates the data into training rows and test rows.",
    meaning:
      "The model learns from training data. Test data imitate future unseen patients. This is the first protection against over-optimistic performance.",
  },
  {
    title: "Model summary and odds ratios",
    output:
      "The script fits logistic regression and prints coefficients, standard errors, p-values and approximate odds ratios.",
    meaning:
      "In this lesson, the model is used as a first prediction tool. Coefficients are useful, but the main question is whether predicted risks work on unseen patients.",
  },
  {
    title: "Confusion matrix",
    output:
      "The script converts predicted risks into classes using threshold 0.50.",
    meaning:
      "The confusion matrix shows correct classifications and errors. In medicine, false negatives and false positives may have different consequences.",
  },
  {
    title: "Accuracy, sensitivity and specificity",
    output:
      "The script reports three test-set performance summaries.",
    meaning:
      "Accuracy measures overall correctness, sensitivity measures detection of positive cases, and specificity measures correct identification of negative cases.",
  },
];

const quizQuestions = [
  {
    question:
      "In this lesson, what is the main aim of machine learning in biostatistics?",
    options: [
      "To prove the biological cause of every disease",
      "To learn prediction rules from health data and test whether they work on new observations",
      "To replace clinical judgement completely",
      "To make every model as complex as possible",
    ],
    answer: 1,
    explanation:
      "The lesson frames ML in biostatistics as a careful prediction workflow. Causal claims require different designs and assumptions.",
  },
  {
    question: "Why do we split data into training and test sets?",
    options: [
      "To make the dataset smaller",
      "To hide inconvenient results",
      "To fit the model on one part and check performance on unseen data",
      "To guarantee that the model is causal",
    ],
    answer: 2,
    explanation:
      "Training data are used to learn the model. Test data provide a more honest check of how the model may behave on new patients.",
  },
  {
    question:
      "Why can accuracy alone be misleading in a medical prediction problem?",
    options: [
      "Because it ignores the balance of false positives and false negatives",
      "Because it is always lower than sensitivity",
      "Because it cannot be calculated from a confusion matrix",
      "Because it proves a model is biased",
    ],
    answer: 0,
    explanation:
      "Accuracy combines all correct classifications, but it does not show whether the model is missing cases or over-identifying non-cases.",
  },
  {
    question:
      "A model uses information recorded after diagnosis to predict diagnosis. What is the main problem?",
    options: [
      "The model is too simple",
      "The model has data leakage",
      "The model has too few coefficients",
      "The model is automatically well-calibrated",
    ],
    answer: 1,
    explanation:
      "Predictors must be available at the time prediction is intended. Using future information creates leakage.",
  },
];

function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-4">
      <p className="text-3xl font-black tracking-[-0.06em]">{value}</p>
      <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-white/55">
        {label}
      </p>
      <p className="mt-3 text-xs leading-5 text-white/65">{detail}</p>
    </div>
  );
}

function DialogueLine({
  initials,
  name,
  children,
  tone = "dark",
}: {
  initials: string;
  name: string;
  children: ReactNode;
  tone?: "dark" | "amber";
}) {
  return (
    <div className="flex gap-4 rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-4 md:p-5">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-black ${
          tone === "amber"
            ? "bg-[#fff4d7] text-[#7c3f00]"
            : "bg-[#11100E] text-white"
        }`}
      >
        {initials}
      </div>
      <div>
        <p className="text-sm font-black text-[#141210]">{name}</p>
        <div className="mt-1 text-sm leading-7 text-[#525252] md:text-base md:leading-8">
          {children}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div>
      <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
        {title}
      </h2>
      {body ? (
        <p className="mt-5 max-w-4xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">
          {body}
        </p>
      ) : null}
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between gap-3 text-sm font-black text-neutral-800">
        <span>{label}</span>
        <span>
          {value}
          {suffix ? ` ${suffix}` : ""}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-stone-950"
      />
    </label>
  );
}

function MetricBox({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] p-4">
      <p className="text-3xl font-black tracking-[-0.06em]">{value}</p>
      <p className="mt-1 text-xs font-black uppercase tracking-[0.13em] text-[#7a7063]">
        {label}
      </p>
    </div>
  );
}

function ConceptFormula() {
  return (
    <div className="rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-5 md:p-6">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[#7a7063]">
        Prediction notation
      </p>
      <div className="mt-4 rounded-[1.5rem] bg-[#11100E] p-5 font-mono text-sm leading-7 text-white md:text-base">
        Data: (X₁, Y₁), (X₂, Y₂), ..., (Xₙ, Yₙ)
        <br />
        Predictors: X = patient measurements
        <br />
        Outcome: Y = diabetes status
        <br />
        Model goal: learn f(X) ≈ Y
        <br />
        Probability goal: estimate P(Y = 1 | X)
      </div>
      <p className="mt-4 text-sm leading-7 text-[#525252]">
        The model is trying to learn a rule from previous patients and then use
        that rule to estimate risk for a new patient. The notation is compact,
        but the clinical meaning must stay clear.
      </p>
    </div>
  );
}

function VisualCard({
  title,
  items,
  dark = false,
}: {
  title: string;
  items: string[];
  dark?: boolean;
}) {
  return (
    <div
      className={`rounded-[1.5rem] border p-5 ${
        dark
          ? "border-stone-950 bg-[#11100E] text-white"
          : "border-[#E4DED2] bg-[#FFFCF6] text-[#141210]"
      }`}
    >
      <p className="text-lg font-black tracking-[-0.03em]">{title}</p>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <span
            key={item}
            className={`rounded-full px-3 py-2 text-xs font-black uppercase tracking-[0.12em] ${
              dark
                ? "bg-[#FFFCF6]/10 text-white/75"
                : "bg-[#F7F3EA] text-[#5F5F5F]"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <div className="hidden text-center text-3xl font-black text-neutral-400 md:block">
      →
    </div>
  );
}

function PredictionVisual() {
  return (
    <div className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-5 md:p-7">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-[#741018]">
        Visual intuition
      </p>

      <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">
        A prediction model maps patient information to estimated risk.
      </h3>

      <div className="mt-6 grid gap-4 md:grid-cols-[0.9fr_auto_0.9fr_auto_0.9fr] md:items-center">
        <VisualCard title="Patient data" items={["Glucose", "BMI", "Age"]} />
        <Arrow />
        <VisualCard
          title="Model"
          items={["Learns pattern", "Combines predictors"]}
          dark
        />
        <Arrow />
        <VisualCard title="Output" items={["Risk", "Class", "Uncertainty"]} />
      </div>

      <p className="mt-6 text-sm leading-7 text-[#525252]">
        The model does not magically understand medicine. It learns a
        mathematical pattern from examples. The biostatistical task is to check
        whether the pattern is valid, clinically timed, interpretable and useful.
      </p>
    </div>
  );
}

function RiskExplorer() {
  const [glucose, setGlucose] = useState(130);
  const [mass, setMass] = useState(31);
  const [age, setAge] = useState(45);

  const risk = useMemo(() => {
    const score = -8 + 0.045 * glucose + 0.055 * mass + 0.025 * age;
    return 1 / (1 + Math.exp(-score));
  }, [glucose, mass, age]);

  const riskPercent = Math.round(risk * 100);

  return (
    <div className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:p-7">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-[#741018]">
        Interactive risk idea
      </p>

      <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">
        See how a prediction rule changes estimated risk.
      </h3>

      <p className="mt-3 text-sm leading-7 text-[#525252]">
        This is a simplified teaching model. It is not a clinical tool. It shows
        the idea that a prediction model combines several patient measurements
        into a risk estimate.
      </p>

      <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <Slider
            label="Glucose"
            value={glucose}
            min={70}
            max={210}
            step={1}
            onChange={setGlucose}
            suffix="mg/dL"
          />
          <Slider
            label="BMI / mass"
            value={mass}
            min={18}
            max={50}
            step={1}
            onChange={setMass}
            suffix=""
          />
          <Slider
            label="Age"
            value={age}
            min={18}
            max={85}
            step={1}
            onChange={setAge}
            suffix="years"
          />
        </div>

        <div className="rounded-[1.75rem] bg-[#11100E] p-6 text-white">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-white/45">
            Estimated risk
          </p>
          <p className="mt-4 text-6xl font-black tracking-[-0.08em]">
            {riskPercent}%
          </p>

          <div className="mt-6 h-4 overflow-hidden rounded-full bg-[#FFFCF6]/10">
            <div
              className="h-full rounded-full bg-[#FFFCF6]"
              style={{ width: `${riskPercent}%` }}
            />
          </div>

          <p className="mt-5 text-sm leading-7 text-white/70">
            The output is a probability-like risk score. A clinical workflow
            still needs validation, calibration and a threshold decision before
            turning this score into action.
          </p>
        </div>
      </div>
    </div>
  );
}

function ThresholdExplorer() {
  const [threshold, setThreshold] = useState(50);

  const patients = [
    { id: "A", risk: 12, outcome: 0 },
    { id: "B", risk: 22, outcome: 0 },
    { id: "C", risk: 37, outcome: 1 },
    { id: "D", risk: 48, outcome: 0 },
    { id: "E", risk: 55, outcome: 1 },
    { id: "F", risk: 68, outcome: 1 },
    { id: "G", risk: 74, outcome: 0 },
    { id: "H", risk: 88, outcome: 1 },
  ];

  const classified = patients.map((patient) => ({
    ...patient,
    predicted: patient.risk >= threshold ? 1 : 0,
  }));

  const tp = classified.filter(
    (p) => p.outcome === 1 && p.predicted === 1
  ).length;
  const tn = classified.filter(
    (p) => p.outcome === 0 && p.predicted === 0
  ).length;
  const fp = classified.filter(
    (p) => p.outcome === 0 && p.predicted === 1
  ).length;
  const fn = classified.filter(
    (p) => p.outcome === 1 && p.predicted === 0
  ).length;

  return (
    <div className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:p-7">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-[#741018]">
        Threshold lab
      </p>

      <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">
        Risk is not the same thing as classification.
      </h3>

      <p className="mt-3 text-sm leading-7 text-[#525252]">
        A model may output a risk of 0.37, 0.55 or 0.88. A threshold turns that
        risk into a decision such as “screen” or “do not screen”. Changing the
        threshold changes false positives and false negatives.
      </p>

      <div className="mt-6">
        <Slider
          label="Classification threshold"
          value={threshold}
          min={10}
          max={90}
          step={5}
          onChange={setThreshold}
          suffix="%"
        />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        <MetricBox label="True positives" value={tp} />
        <MetricBox label="True negatives" value={tn} />
        <MetricBox label="False positives" value={fp} />
        <MetricBox label="False negatives" value={fn} />
      </div>

      <div className="mt-6 grid gap-2">
        {classified.map((patient) => (
          <div
            key={patient.id}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] p-3 text-sm font-bold"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#11100E] text-white">
              {patient.id}
            </span>
            <div>
              <div className="h-3 overflow-hidden rounded-full bg-[#FFFCF6]">
                <div
                  className="h-full rounded-full bg-[#11100E]"
                  style={{ width: `${patient.risk}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-[#5F5F5F]">
                Risk {patient.risk}% · observed{" "}
                {patient.outcome === 1 ? "positive" : "negative"}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.12em] ${
                patient.predicted === 1
                  ? "bg-[#fff4d7] text-[#7c3f00]"
                  : "bg-[#FFFCF6] text-[#5F5F5F]"
              }`}
            >
              {patient.predicted === 1 ? "Flag" : "No flag"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WebRCodeRunner({
  onResults,
}: {
  onResults: (results: RResults) => void;
}) {
  const [code, setCode] = useState(browserRCode);
  const [output, setOutput] = useState(
    "Click Run R code to execute the lesson script."
  );
  const [isRunning, setIsRunning] = useState(false);

  async function runCode() {
    setIsRunning(true);
    setOutput("Starting browser R session...\n");

    try {
      const webR = await getWebR();

      const result = await webR.evalR(`
        paste(capture.output({
          ${code}
        }), collapse = "\\n")
      `);

      const jsResult = await result.toJs();
      const outputText = String(jsResult.values?.[0] ?? jsResult);

      setOutput(outputText);
      onResults(parseRResults(outputText));
    } catch (error) {
      setOutput(
        `R execution error:\n${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
      <div className="border-b border-[#E4DED2] p-5 md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#741018]">
              Browser R console
            </p>
            <h3 className="mt-2 text-2xl font-black tracking-[-0.04em]">
              Run the first prediction workflow.
            </h3>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              onClick={runCode}
              disabled={isRunning}
              className="rounded-full bg-[#11100E] px-5 py-3 text-sm font-black text-white transition hover:bg-[#741018] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isRunning ? "Running..." : "Run R code"}
            </button>

            <button
              onClick={() => {
                setCode(browserRCode);
                setOutput(
                  "Code reset. Click Run R code to execute the lesson script."
                );
                onResults(defaultRResults);
              }}
              className="rounded-full border border-[#D8CDBB] bg-[#FFFCF6] px-5 py-3 text-sm font-black text-[#141210] transition hover:border-stone-950"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="border-b border-[#E4DED2] lg:border-b-0 lg:border-r">
          <textarea
            value={code}
            onChange={(event) => setCode(event.target.value)}
            spellCheck={false}
            className="min-h-[620px] w-full resize-y bg-[#11100E] p-5 font-mono text-sm leading-6 text-white outline-none md:p-6"
          />
        </div>

        <div className="min-h-[620px] bg-[#F7F3EA] p-5 md:p-6">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#7a7063]">
            Console output
          </p>
          <pre className="mt-4 max-h-[560px] overflow-auto whitespace-pre-wrap rounded-[1.5rem] bg-[#FFFCF6] p-5 font-mono text-xs leading-6 text-neutral-800 ring-1 ring-neutral-200">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
}

function DetailedNotes() {
  return (
    <section className="mt-8 rounded-[2.5rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
      <SectionTitle
        eyebrow="Detailed lecture notes"
        title="Machine learning as a biostatistical prediction system."
        body="This section explains the full logic behind the first R script. The goal is not only to run a model, but to understand every modelling decision that appears in the output."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <ConceptFormula />

        <div className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 md:p-6">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#7a7063]">
            Learning objectives
          </p>
          <div className="mt-4 grid gap-3">
            {learningObjectives.map((objective, index) => (
              <div
                key={objective}
                className="rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] p-4 text-sm font-bold leading-6 text-[#525252]"
              >
                {index + 1}. {objective}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-8 text-base leading-8 text-[#525252]">
        <article className="rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-6">
          <h3 className="text-2xl font-black tracking-[-0.035em] text-[#141210]">
            1. Machine learning starts with a prediction task
          </h3>

          <p className="mt-4">
            In biostatistics, machine learning should not begin with the
            question “Which algorithm is fashionable?” It begins with a
            prediction task. A prediction task states what outcome is being
            predicted, for whom, using which information, and at what point in
            time.
          </p>

          <p className="mt-4">
            In this lesson, the outcome is diabetes status. The predictors are
            patient measurements such as glucose, BMI/mass and age. The intended
            task is to learn a rule from observed patients and use that rule to
            estimate risk for patients not used to train the model.
          </p>

          <div className="mt-5 rounded-[1.5rem] bg-[#11100E] p-5 text-white">
            <p className="font-mono text-sm leading-7">
              Question: Can routinely measured patient variables predict
              diabetes status?
              <br />
              Outcome: diabetes status
              <br />
              Predictors: glucose, BMI/mass, age
              <br />
              Target: future or unseen patients
              <br />
              Output: predicted risk and predicted class
            </p>
          </div>
        </article>

        <article className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm">
          <h3 className="text-2xl font-black tracking-[-0.035em] text-[#141210]">
            2. The data structure: rows, columns, outcome and predictors
          </h3>

          <p className="mt-4">
            The first R output prints the dataset dimensions and variable names.
            This is not a minor technical step. It is the first quality check. A
            row usually represents a patient or observation. A column represents
            a measurement, a label, an identifier, a predictor or an outcome.
          </p>

          <p className="mt-4">
            Before fitting any model, we should be able to say what each row
            means, what each variable means, which variable is the outcome, which
            variables are candidate predictors, and whether all predictors would
            be available at the intended prediction time.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.5rem] bg-[#F7F3EA] p-5">
              <p className="font-black text-[#141210]">Good question</p>
              <p className="mt-2 text-sm leading-7">
                Was glucose measured before the prediction was supposed to be
                made?
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-[#F7F3EA] p-5">
              <p className="font-black text-[#141210]">Dangerous question</p>
              <p className="mt-2 text-sm leading-7">
                Can I include any variable that improves accuracy, even if it was
                recorded after diagnosis?
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-6">
          <h3 className="text-2xl font-black tracking-[-0.035em] text-[#141210]">
            3. Prediction is different from explanation and causation
          </h3>

          <p className="mt-4">
            A prediction model asks whether variables can help estimate an
            outcome. An explanatory model asks how variables are associated with
            the outcome. A causal analysis asks what would happen to the outcome
            if an exposure were changed by intervention or policy.
          </p>

          <p className="mt-4">
            These are related but not identical. A variable can improve
            prediction even when it is not a useful intervention target. For
            example, age may predict disease risk, but we cannot intervene to
            make a patient younger. A variable may also be a proxy for many
            unmeasured processes.
          </p>

          <div className="mt-5 rounded-[1.5rem] border-l-8 border-[#f2a23a] bg-[#fff8e6] p-5">
            <p className="font-black text-[#4b2413]">Reporting rule:</p>
            <p className="mt-2 text-sm leading-7 text-[#4b2413]">
              Say “the model used glucose, BMI/mass and age to predict diabetes
              status.” Do not say “the model proves these variables cause
              diabetes.”
            </p>
          </div>
        </article>

        <article className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm">
          <h3 className="text-2xl font-black tracking-[-0.035em] text-[#141210]">
            4. Why train/test splitting matters
          </h3>

          <p className="mt-4">
            A model can look impressive on the data used to fit it because it
            has already seen those observations. This is why the script creates
            a training set and a test set. The training set is used to estimate
            the model. The test set is held back and used to imitate new
            patients.
          </p>

          <p className="mt-4">
            This is the first version of honest validation. It does not solve
            every problem. A single split can be unstable, especially in small
            datasets. Later lessons will introduce cross-validation and
            bootstrap validation. But the logic begins here: do not judge a
            prediction model only on the data that trained it.
          </p>
        </article>

        <article className="rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-6">
          <h3 className="text-2xl font-black tracking-[-0.035em] text-[#141210]">
            5. Logistic regression as a first prediction model
          </h3>

          <p className="mt-4">
            The first model in the script is logistic regression. Logistic
            regression is a natural starting point because the outcome is binary.
            It estimates the probability that the outcome equals 1 given the
            predictors.
          </p>

          <div className="mt-5 rounded-[1.5rem] bg-[#11100E] p-5 text-white">
            <p className="font-mono text-sm leading-7">
              logit[P(Y = 1 | X)] = β₀ + β₁ glucose + β₂ mass + β₃ age
              <br />
              P(Y = 1 | X) = 1 / [1 + exp(-η)]
            </p>
          </div>

          <p className="mt-4">
            The model first calculates a linear predictor, often called η. The
            logistic function then transforms η into a probability between 0 and
            1. This is why the script can produce predicted risks for unseen test
            observations.
          </p>
        </article>

        <article className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm">
          <h3 className="text-2xl font-black tracking-[-0.035em] text-[#141210]">
            6. Risk scores become classifications only after a threshold
          </h3>

          <p className="mt-4">
            The model output is a predicted risk. A risk is not automatically a
            decision. The script uses a threshold of 0.50: predicted risks at or
            above 0.50 are classified as positive, and predicted risks below
            0.50 are classified as negative.
          </p>

          <p className="mt-4">
            This threshold is convenient for teaching, but it is not
            automatically clinically correct. In medicine, threshold choice
            depends on the cost of false positives, the cost of false negatives,
            disease severity, available resources, patient burden and the
            intended use of the model.
          </p>
        </article>

        <article className="rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-6">
          <h3 className="text-2xl font-black tracking-[-0.035em] text-[#141210]">
            7. Accuracy, sensitivity and specificity answer different questions
          </h3>

          <p className="mt-4">
            The script prints accuracy, sensitivity and specificity. Accuracy
            asks what proportion of all test observations were classified
            correctly. Sensitivity asks what proportion of true positive cases
            were detected. Specificity asks what proportion of true negative
            cases were correctly ruled out.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.5rem] bg-[#FFFCF6] p-5">
              <p className="font-black">Accuracy</p>
              <p className="mt-2 text-sm leading-7">
                Overall correctness across positive and negative cases.
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-[#FFFCF6] p-5">
              <p className="font-black">Sensitivity</p>
              <p className="mt-2 text-sm leading-7">
                Ability to detect patients who truly have the outcome.
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-[#FFFCF6] p-5">
              <p className="font-black">Specificity</p>
              <p className="mt-2 text-sm leading-7">
                Ability to correctly rule out patients who do not have the
                outcome.
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white">
          <h3 className="text-2xl font-black tracking-[-0.035em]">
            8. What this lesson does not prove
          </h3>

          <p className="mt-4 text-white/75">
            This lesson does not prove that the model is ready for clinical use.
            It does not prove causation. It does not prove that the threshold is
            optimal. It does not assess calibration fully. It does not handle
            missing data, external validation or fairness.
          </p>

          <p className="mt-4 text-white/75">
            That is the point. A serious ML course should not pretend that one
            fitted model is enough. This first lesson establishes the workflow:
            define the prediction question, run the model, interpret the output,
            and clearly state what remains uncertain.
          </p>
        </article>
      </div>
    </section>
  );
}

function OutputDrivenReport({ results }: { results: RResults }) {
  const accuracyPercent =
    Number(results.accuracy) > 0
      ? Math.round(Number(results.accuracy) * 100)
      : 0;

  const sensitivityPercent =
    Number(results.sensitivity) > 0
      ? Math.round(Number(results.sensitivity) * 100)
      : 0;

  const specificityPercent =
    Number(results.specificity) > 0
      ? Math.round(Number(results.specificity) * 100)
      : 0;

  return (
    <section className="mt-8 rounded-[2.5rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
      <SectionTitle
        eyebrow="Output-driven report"
        title="Interpreting the R output as a biostatistical report."
        body="This section turns the script output into a careful interpretation. The aim is not only to report numbers, but to explain what each output means for prediction, validation and responsible clinical interpretation."
      />

      {!results.hasRun ? (
        <div className="mt-8 rounded-[2rem] border border-amber-200 bg-amber-50 p-6">
          <h3 className="text-2xl font-black tracking-[-0.04em] text-amber-950">
            Run the R lab first.
          </h3>
          <p className="mt-3 text-sm leading-7 text-amber-900">
            The report is designed to use your actual R console output. Open the
            R Coding Lab, click <strong>Run R code</strong>, then return to this
            tab. Once the script runs, the values below will update from the
            console output.
          </p>
        </div>
      ) : null}

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <MetricBox label="Dataset rows" value={results.rows} />
        <MetricBox label="Training rows" value={results.trainRows} />
        <MetricBox label="Test rows" value={results.testRows} />
        <MetricBox label="Accuracy %" value={accuracyPercent} />
      </div>

      <div className="mt-8 grid gap-6">
        <article className="rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-6 md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#741018]">
            1. Dataset structure
          </p>

          <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">
            The dataset contains {results.rows} observations and{" "}
            {results.columns} variables.
          </h3>

          <p className="mt-4 text-base leading-8 text-[#525252]">
            The first output confirms that the dataset has{" "}
            <strong>{results.rows}</strong> rows and{" "}
            <strong>{results.columns}</strong> columns. In this lesson, each row
            represents one patient-level observation, and the columns contain
            clinical predictors and the diabetes outcome. The variables printed
            by the script are glucose, pressure, mass, age, diabetes_binary and
            diabetes.
          </p>

          <p className="mt-4 rounded-[1.5rem] bg-[#FFFCF6] p-5 text-sm leading-7 text-[#525252]">
            <span className="font-black text-[#141210]">
              Interpretation:
            </span>{" "}
            Before fitting a model, we must know what each row and variable
            represents. A machine learning workflow is not only about the model;
            it begins with understanding the structure and clinical meaning of
            the data.
          </p>
        </article>

        <article className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#741018]">
            2. Outcome distribution
          </p>

          <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">
            The outcome is almost balanced in this run.
          </h3>

          <p className="mt-4 text-base leading-8 text-[#525252]">
            The R output shows <strong>{results.negativeCount}</strong>{" "}
            diabetes-negative observations (
            <strong>{results.negativePercent}%</strong>) and{" "}
            <strong>{results.positiveCount}</strong> diabetes-positive
            observations (<strong>{results.positivePercent}%</strong>). This
            means the two outcome groups are close in size.
          </p>

          <p className="mt-4 rounded-[1.5rem] bg-[#F7F3EA] p-5 text-sm leading-7 text-[#525252]">
            <span className="font-black text-[#141210]">
              Interpretation:
            </span>{" "}
            A balanced outcome is helpful for teaching because the model has a
            reasonable number of positive and negative examples. In highly
            imbalanced medical datasets, accuracy can be misleading because a
            model may perform well simply by predicting the majority class.
          </p>
        </article>

        <article className="rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-6 md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#741018]">
            3. Predictor signal
          </p>

          <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">
            Glucose, BMI/mass and age differ between outcome groups.
          </h3>

          <p className="mt-4 text-base leading-8 text-[#525252]">
            The group summary shows that the mean glucose level is higher among
            diabetes-positive observations than diabetes-negative observations.
            In the output, the negative group has mean glucose around{" "}
            <strong>103.1</strong>, while the positive group has mean glucose
            around <strong>135.2</strong>. BMI/mass and age are also higher on
            average in the positive group.
          </p>

          <p className="mt-4 rounded-[1.5rem] bg-[#FFFCF6] p-5 text-sm leading-7 text-[#525252]">
            <span className="font-black text-[#141210]">
              Interpretation:
            </span>{" "}
            These differences suggest that the predictors contain useful
            predictive information. However, group differences do not prove
            causation. They simply indicate that the model may be able to use
            these variables to separate higher-risk from lower-risk observations.
          </p>
        </article>

        <article className="rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-white/50">
            4. Training and test split
          </p>

          <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">
            The model was trained on {results.trainRows} rows and tested on{" "}
            {results.testRows} unseen rows.
          </h3>

          <p className="mt-4 text-base leading-8 text-white/75">
            The script uses <strong>{results.trainRows}</strong> observations for
            training and <strong>{results.testRows}</strong> observations for
            testing. The training data are used to estimate the model. The test
            data are held back and used to check whether the fitted model can
            make predictions on observations it did not use during fitting.
          </p>

          <p className="mt-4 rounded-[1.5rem] bg-[#FFFCF6]/[0.08] p-5 text-sm leading-7 text-white/70">
            <span className="font-black text-white">Interpretation:</span> This
            is the first validation step. Test-set performance is more honest
            than training-set performance because it asks whether the model
            generalises beyond the data used for learning. It is still not final
            validation; later lessons should introduce cross-validation,
            bootstrap validation and ideally external validation.
          </p>
        </article>

        <article className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#741018]">
            5. Logistic regression model
          </p>

          <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">
            The model estimates diabetes risk using glucose, BMI/mass and age.
          </h3>

          <p className="mt-4 text-base leading-8 text-[#525252]">
            The model fitted by the script is a logistic regression model with a
            binary outcome. The fitted equation has an intercept and coefficients
            for glucose, mass and age. The positive coefficients mean that, in
            this fitted model, higher glucose, higher BMI/mass and higher age are
            associated with higher predicted probability of diabetes.
          </p>

          <div className="mt-5 rounded-[1.5rem] bg-[#11100E] p-5 text-white">
            <p className="font-mono text-sm leading-7">
              logit[P(diabetes = 1)] = β₀ + β₁ glucose + β₂ mass + β₃ age
            </p>
          </div>

          <p className="mt-4 rounded-[1.5rem] bg-[#F7F3EA] p-5 text-sm leading-7 text-[#525252]">
            <span className="font-black text-[#141210]">
              Interpretation:
            </span>{" "}
            Logistic regression is used here as a transparent baseline model. It
            produces predicted probabilities and interpretable coefficients, but
            it should still be judged by validation performance, calibration and
            clinical usefulness.
          </p>
        </article>

        <article className="rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-6 md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#741018]">
            6. Odds ratio interpretation
          </p>

          <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">
            The approximate odds ratios are glucose {results.glucoseOR}, mass{" "}
            {results.massOR}, and age {results.ageOR}.
          </h3>

          <p className="mt-4 text-base leading-8 text-[#525252]">
            The script exponentiates the logistic regression coefficients to
            produce approximate odds ratios. In this output, the odds ratio for
            glucose is <strong>{results.glucoseOR}</strong>, for BMI/mass is{" "}
            <strong>{results.massOR}</strong>, and for age is{" "}
            <strong>{results.ageOR}</strong>.
          </p>

          <p className="mt-4 rounded-[1.5rem] bg-[#FFFCF6] p-5 text-sm leading-7 text-[#525252]">
            <span className="font-black text-[#141210]">
              Interpretation:
            </span>{" "}
            Holding the other model variables fixed, a one-unit increase in
            glucose is associated with multiplying the estimated odds by about{" "}
            <strong>{results.glucoseOR}</strong>. A one-unit increase in
            BMI/mass is associated with multiplying the estimated odds by about{" "}
            <strong>{results.massOR}</strong>, and a one-year increase in age by
            about <strong>{results.ageOR}</strong>. These are model-based
            associations, not causal effects.
          </p>
        </article>

        <article className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#741018]">
            7. Confusion matrix
          </p>

          <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">
            At threshold {results.threshold}, the model makes both correct and
            incorrect classifications.
          </h3>

          <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-[#E4DED2]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#11100E] text-white">
                <tr>
                  <th className="px-4 py-3">Observed</th>
                  <th className="px-4 py-3">Predicted 0</th>
                  <th className="px-4 py-3">Predicted 1</th>
                  <th className="px-4 py-3">Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 bg-[#FFFCF6]">
                <tr>
                  <td className="px-4 py-3 font-bold">0</td>
                  <td className="px-4 py-3">{results.tn}</td>
                  <td className="px-4 py-3">{results.fp}</td>
                  <td className="px-4 py-3 text-[#525252]">
                    True negatives and false positives
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold">1</td>
                  <td className="px-4 py-3">{results.fn}</td>
                  <td className="px-4 py-3">{results.tp}</td>
                  <td className="px-4 py-3 text-[#525252]">
                    False negatives and true positives
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-5 rounded-[1.5rem] bg-[#F7F3EA] p-5 text-sm leading-7 text-[#525252]">
            <span className="font-black text-[#141210]">
              Interpretation:
            </span>{" "}
            The model correctly classified {results.tn} diabetes-negative test
            observations and {results.tp} diabetes-positive test observations.
            It also produced {results.fp} false positives and {results.fn} false
            negatives. In medical prediction, the type of error matters. A false
            negative may mean a high-risk patient is missed. A false positive
            may mean unnecessary follow-up, anxiety or resource use.
          </p>
        </article>

        <article className="rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-6 md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#741018]">
            8. Performance metrics
          </p>

          <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">
            The model has accuracy {results.accuracy}, sensitivity{" "}
            {results.sensitivity}, and specificity {results.specificity}.
          </h3>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.5rem] bg-[#FFFCF6] p-5">
              <p className="text-4xl font-black tracking-[-0.06em]">
                {accuracyPercent}%
              </p>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-[#7a7063]">
                Accuracy
              </p>
              <p className="mt-3 text-sm leading-7 text-[#525252]">
                Overall proportion of test observations classified correctly.
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-[#FFFCF6] p-5">
              <p className="text-4xl font-black tracking-[-0.06em]">
                {sensitivityPercent}%
              </p>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-[#7a7063]">
                Sensitivity
              </p>
              <p className="mt-3 text-sm leading-7 text-[#525252]">
                Proportion of true diabetes-positive cases detected by the model.
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-[#FFFCF6] p-5">
              <p className="text-4xl font-black tracking-[-0.06em]">
                {specificityPercent}%
              </p>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-[#7a7063]">
                Specificity
              </p>
              <p className="mt-3 text-sm leading-7 text-[#525252]">
                Proportion of true diabetes-negative cases correctly ruled out.
              </p>
            </div>
          </div>

          <p className="mt-5 rounded-[1.5rem] bg-[#FFFCF6] p-5 text-sm leading-7 text-[#525252]">
            <span className="font-black text-[#141210]">
              Interpretation:
            </span>{" "}
            The model performs moderately well in this test split. It detects
            around {sensitivityPercent}% of positive cases and correctly rules
            out around {specificityPercent}% of negative cases. The sensitivity
            is higher than specificity, which means the model is slightly better
            at detecting positives than avoiding false positives in this run.
          </p>
        </article>

        <article className="rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-white/50">
            9. Responsible conclusion
          </p>

          <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">
            This is a useful first prediction workflow, not a final clinical
            model.
          </h3>

          <p className="mt-4 text-base leading-8 text-white/75">
            The model shows that routinely measured variables can be used to
            predict diabetes status with moderate test-set performance. However,
            this output alone is not enough for clinical deployment.
          </p>

          <p className="mt-4 rounded-[1.5rem] bg-[#FFFCF6]/[0.08] p-5 text-sm leading-7 text-white/70">
            Further work would require stronger validation, calibration
            assessment, missing-data review, threshold justification, external
            validation and clinical usefulness evaluation. The model should not
            be interpreted as proving that glucose, BMI/mass or age causally
            determine diabetes.
          </p>
        </article>
      </div>

      <div className="mt-8 rounded-[2rem] bg-[#11100E] p-6 text-white md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-white/50">
          Full report paragraph
        </p>

        <p className="mt-4 text-base leading-8 text-white/75">
          A binary diabetes prediction model was developed using routinely
          measured predictors. The dataset contained {results.rows} observations
          and {results.columns} variables, with {results.positiveCount} positive
          observations ({results.positivePercent}%) and{" "}
          {results.negativeCount} negative observations (
          {results.negativePercent}%). The data were split into{" "}
          {results.trainRows} training observations and {results.testRows} test
          observations. A logistic regression model was fitted using glucose,
          BMI/mass and age as predictors. The approximate odds ratios were{" "}
          {results.glucoseOR} for glucose, {results.massOR} for BMI/mass and{" "}
          {results.ageOR} for age. At a classification threshold of{" "}
          {results.threshold}, the test confusion matrix contained{" "}
          {results.tn} true negatives, {results.fp} false positives,{" "}
          {results.fn} false negatives and {results.tp} true positives. The
          model achieved test-set accuracy {results.accuracy}, sensitivity{" "}
          {results.sensitivity} and specificity {results.specificity}. These
          results suggest moderate predictive performance in this first split,
          but they should be interpreted as an introductory demonstration of a
          prediction workflow rather than a final clinical model or evidence of
          causation.
        </p>
      </div>
    </section>
  );
}

function Quiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({});

  return (
    <div className="space-y-5">
      {quizQuestions.map((item, index) => {
        const selected = answers[index];
        const hasAnswered = selected !== undefined;

        return (
          <div
            key={item.question}
            className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:p-7"
          >
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[#741018]">
              Question {index + 1}
            </p>

            <h3 className="mt-3 text-xl font-black tracking-[-0.03em]">
              {item.question}
            </h3>

            <div className="mt-5 grid gap-3">
              {item.options.map((option, optionIndex) => (
                <button
                  key={option}
                  onClick={() =>
                    setAnswers((current) => ({
                      ...current,
                      [index]: optionIndex,
                    }))
                  }
                  className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold leading-6 transition ${
                    selected === optionIndex
                      ? optionIndex === item.answer
                        ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                        : "border-red-300 bg-red-50 text-red-900"
                      : "border-[#E4DED2] bg-[#F7F3EA] text-[#525252] hover:bg-[#FFFCF6]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {hasAnswered ? (
              <div className="mt-5 rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] p-4 text-sm leading-7 text-[#525252]">
                <span className="font-black text-[#141210]">
                  {selected === item.answer ? "Correct. " : "Not quite. "}
                </span>
                {item.explanation}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default function WhatIsMachineLearningInBiostatisticsLessonPage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [rResults, setRResults] = useState<RResults>(defaultRResults);

  return (
    <main className="min-h-screen bg-[#F7F3EA] px-5 py-10 text-[#141210] md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath(courseLinks.module)}
          className="text-sm font-black text-[#741018] transition hover:text-[#4d080e]"
        >
          ← Back to Module 1
        </a>

        <section className="mt-8 overflow-hidden rounded-[2.5rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <div className="p-6 md:p-10 lg:p-12">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Machine Learning in Biostatistics · Lesson 1.1
              </p>

              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.03] tracking-[-0.055em] md:text-7xl">
                What is machine learning in biostatistics?
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">
                Learn machine learning as a biostatistical prediction workflow:
                define the clinical question, identify the outcome, choose
                predictors, separate training and test data, run a first R
                model, interpret output and avoid causal overclaiming.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={withBasePath(courseLinks.script)}
                  className="inline-flex items-center justify-center rounded-full bg-[#11100E] px-6 py-3.5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#741018]"
                >
                  Download R script →
                </a>

                <a
                  href={withBasePath(courseLinks.data)}
                  className="inline-flex items-center justify-center rounded-full border border-[#D8CDBB] bg-[#FFFCF6] px-6 py-3.5 text-sm font-black text-[#141210] transition hover:-translate-y-0.5 hover:border-stone-950"
                >
                  Download dataset
                </a>

                <a
                  href="#r-lab"
                  className="inline-flex items-center justify-center rounded-full border border-[#D8CDBB] bg-[#F7F3EA] px-6 py-3.5 text-sm font-black text-[#141210] transition hover:-translate-y-0.5 hover:bg-[#FFFCF6]"
                >
                  Open R lab
                </a>
              </div>
            </div>

            <aside className="border-t border-[#E4DED2] bg-[#11100E] p-6 text-white md:p-8 lg:border-l lg:border-t-0">
              <div className="rounded-[2rem] border border-white/10 bg-[#FFFCF6]/[0.06] p-6">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-white/50">
                  Lesson snapshot
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <StatCard
                    value="90"
                    label="Minutes"
                    detail="Designed as a deep first lesson."
                  />
                  <StatCard
                    value="R"
                    label="Browser lab"
                    detail="Run code without leaving the page."
                  />
                  <StatCard
                    value="768"
                    label="Rows"
                    detail="Diabetes prediction dataset."
                  />
                  <StatCard
                    value="1.1"
                    label="Foundation"
                    detail="Prediction mindset before algorithms."
                  />
                </div>
              </div>

              <div className="mt-5 rounded-[2rem] border border-white/10 bg-[#FFFCF6]/[0.06] p-6">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-white/50">
                  Central question
                </p>

                <h2 className="mt-3 text-2xl font-black tracking-[-0.04em]">
                  Will this model work on future patients?
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/70">
                  This question is the backbone of the course. Every algorithm,
                  visualisation and R script must eventually answer it honestly.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-4 shadow-sm">
          <div className="flex gap-3 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 rounded-full border px-5 py-3 text-sm font-black transition ${
                  activeTab === tab
                    ? "border-stone-950 bg-[#11100E] text-white"
                    : "border-[#E4DED2] bg-[#F7F3EA] text-[#525252] hover:bg-[#FFFCF6]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        {activeTab === "Lecture" && (
          <section className="mt-8 rounded-[2.5rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
            <SectionTitle
              eyebrow="Conversational lecture"
              title="The first medical machine learning class begins."
              body="Mr. R introduces machine learning through a clinical prediction problem rather than through algorithm names."
            />

            <p className="mt-8 rounded-[1.75rem] bg-[#F7F3EA] p-6 text-lg font-bold leading-8 text-[#525252] md:text-xl md:leading-9">
              <span className="font-black text-[#141210]">Scene:</span> Mr. R
              walks into a computer lab where Emma, Oliver, James and Sophia are
              looking at a small patient dataset. The columns include glucose,
              BMI, age and diabetes status.
            </p>

            <div className="mt-8 space-y-4">
              <DialogueLine initials="EM" name="Emma" tone="amber">
                I keep hearing that machine learning can predict disease and
                identify high-risk patients. But in biostatistics, what does
                machine learning actually mean?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                In biostatistics, machine learning means learning a prediction
                rule from health data. The model studies examples from patients
                whose outcomes are already known, then uses patterns in those
                examples to estimate an outcome for a new patient.
              </DialogueLine>

              <DialogueLine initials="OL" name="Oliver" tone="amber">
                So machine learning is mainly about prediction?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Very often, yes. We may ask whether routine clinical variables
                can predict diabetes status, hospital deterioration, treatment
                response, recurrence, survival or future complications.
              </DialogueLine>

              <DialogueLine initials="JA" name="James" tone="amber">
                Is that different from ordinary statistics?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                There is overlap. Statistics and machine learning both learn
                from data. But the emphasis is often different. A traditional
                statistical model may ask how a variable is associated with an
                outcome. A machine learning workflow often asks whether a model
                can predict the outcome accurately for new observations.
              </DialogueLine>

              <DialogueLine initials="SO" name="Sophia" tone="amber">
                So if a model predicts diabetes well, does that prove what
                causes diabetes?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                No. Prediction is not the same as causation. Glucose, BMI and
                age may help predict diabetes status, but this model alone does
                not prove that changing one predictor would cause the outcome to
                change.
              </DialogueLine>
            </div>

            <div className="mt-10 rounded-[1.75rem] border-l-8 border-[#f2a23a] bg-[#fff8e6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.28em] text-[#5a260f]">
                Big idea
              </p>
              <p className="mt-4 max-w-5xl text-lg font-bold leading-9 text-[#4b2413]">
                Machine learning in biostatistics is the use of data-driven
                models to predict health outcomes, classify patients, discover
                patterns or support medical decisions — but every model must be
                judged through clinical timing, validation, uncertainty,
                interpretation and usefulness.
              </p>
            </div>

            <PredictionVisual />
          </section>
        )}

        {activeTab === "Detailed Notes" && <DetailedNotes />}

        {activeTab === "Interactive Lab" && (
          <section className="mt-8 grid gap-6">
            <RiskExplorer />
            <ThresholdExplorer />
          </section>
        )}

        {activeTab === "R Coding Lab" && (
          <section id="r-lab" className="mt-8 scroll-mt-28">
            <WebRCodeRunner onResults={setRResults} />

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <a
                href={withBasePath(courseLinks.script)}
                className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 text-sm font-black text-[#741018] shadow-sm transition hover:-translate-y-1 hover:bg-[#F7F3EA]"
              >
                Download full R script →
              </a>
              <a
                href={withBasePath(courseLinks.data)}
                className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 text-sm font-black text-[#741018] shadow-sm transition hover:-translate-y-1 hover:bg-[#F7F3EA]"
              >
                Download shared diabetes dataset →
              </a>
            </div>
          </section>
        )}

        {activeTab === "Output Guide" && (
          <section className="mt-8 rounded-[2.5rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
            <SectionTitle
              eyebrow="Script output interpretation"
              title="Do not just run the code. Read what the output means."
              body="Each output block from the R script answers a modelling question. This is the habit that separates coding from statistical learning."
            />

            <div className="mt-8 grid gap-5">
              {outputGuide.map((item, index) => (
                <article
                  key={item.title}
                  className="rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-5 md:p-6"
                >
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-[#741018]">
                    Output {index + 1}
                  </p>
                  <h3 className="mt-2 text-2xl font-black tracking-[-0.04em]">
                    {item.title}
                  </h3>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="rounded-[1.5rem] bg-[#FFFCF6] p-5">
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#7a7063]">
                        What the script prints
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[#525252]">
                        {item.output}
                      </p>
                    </div>

                    <div className="rounded-[1.5rem] bg-[#11100E] p-5 text-white">
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-white/50">
                        How to interpret it
                      </p>
                      <p className="mt-3 text-sm leading-7 text-white/75">
                        {item.meaning}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Report" && <OutputDrivenReport results={rResults} />}

        {activeTab === "Quiz" && (
          <section className="mt-8">
            <SectionTitle
              eyebrow="Knowledge check"
              title="Check the prediction mindset before moving on."
              body="These questions test the main ideas: prediction, validation, threshold choice, leakage and causal caution."
            />

            <div className="mt-8">
              <Quiz />
            </div>
          </section>
        )}

        <section className="mt-10 rounded-[2.5rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white shadow-sm md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Next lesson
              </p>
              <h2 className="mt-4 max-w-4xl text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Prediction, explanation and causal thinking.
              </h2>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-white/70 md:text-base md:leading-8">
                Next, separate models that predict well from models that explain
                mechanisms or support causal claims.
              </p>
            </div>

            <a
              href={withBasePath(courseLinks.next)}
              className="inline-flex items-center justify-center rounded-full bg-[#FFFCF6] px-6 py-3.5 text-sm font-black text-[#141210] transition hover:-translate-y-0.5"
            >
              Continue →
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}