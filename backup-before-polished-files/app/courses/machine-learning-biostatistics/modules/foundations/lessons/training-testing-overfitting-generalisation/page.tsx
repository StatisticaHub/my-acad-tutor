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

const browserRCode = `# Lesson 1.4 browser R lab
# Training, testing, overfitting and generalisation

cat("Lesson 1.4: Training, testing, overfitting and generalisation\\n")
cat("----------------------------------------------------------------\\n\\n")

# The website loads diabetes_data from the shared course CSV.
# We use the same data to compare training performance, test performance,
# overfitting and leakage.

cat("Dataset dimensions:\\n")
print(dim(diabetes_data))

cat("\\nVariable names:\\n")
print(names(diabetes_data))

cat("\\nOutcome distribution:\\n")
print(table(diabetes_data$diabetes))

cat("\\nOutcome percentages:\\n")
print(round(100 * prop.table(table(diabetes_data$diabetes)), 1))

# ----------------------------------------------------------
# Helper functions
# ----------------------------------------------------------

safe_cell <- function(tab, observed, predicted) {
  if (observed %in% rownames(tab) && predicted %in% colnames(tab)) {
    return(tab[observed, predicted])
  }
  return(0)
}

classification_metrics <- function(observed, risk, threshold = 0.5) {
  predicted <- ifelse(risk >= threshold, 1, 0)

  tab <- table(
    Observed = observed,
    Predicted = predicted
  )

  tn <- safe_cell(tab, "0", "0")
  fp <- safe_cell(tab, "0", "1")
  fn <- safe_cell(tab, "1", "0")
  tp <- safe_cell(tab, "1", "1")

  accuracy <- mean(observed == predicted)
  sensitivity <- ifelse(tp + fn == 0, NA, tp / (tp + fn))
  specificity <- ifelse(tn + fp == 0, NA, tn / (tn + fp))

  list(
    confusion_matrix = tab,
    accuracy = accuracy,
    sensitivity = sensitivity,
    specificity = specificity,
    tp = tp,
    fp = fp,
    tn = tn,
    fn = fn
  )
}

simple_auc <- function(observed, risk) {
  # Rank-based AUC without external packages.
  # AUC is the probability that a randomly chosen positive patient
  # has a higher predicted risk than a randomly chosen negative patient.

  positive_risk <- risk[observed == 1]
  negative_risk <- risk[observed == 0]

  if (length(positive_risk) == 0 || length(negative_risk) == 0) {
    return(NA)
  }

  comparisons <- outer(positive_risk, negative_risk, "-")
  mean(comparisons > 0) + 0.5 * mean(comparisons == 0)
}

# ----------------------------------------------------------
# Part 1: Train/test split
# ----------------------------------------------------------

set.seed(2026)

train_id <- sample(
  seq_len(nrow(diabetes_data)),
  size = floor(0.7 * nrow(diabetes_data))
)

train_data <- diabetes_data[train_id, ]
test_data <- diabetes_data[-train_id, ]

cat("\\nTraining rows:", nrow(train_data), "\\n")
cat("Test rows:", nrow(test_data), "\\n")

cat("\\nTraining outcome distribution:\\n")
print(table(train_data$diabetes))

cat("\\nTest outcome distribution:\\n")
print(table(test_data$diabetes))

# ----------------------------------------------------------
# Part 2: Simple model
# ----------------------------------------------------------

simple_model <- glm(
  diabetes_binary ~ glucose + mass + age,
  data = train_data,
  family = binomial
)

train_data$simple_risk <- predict(
  simple_model,
  newdata = train_data,
  type = "response"
)

test_data$simple_risk <- predict(
  simple_model,
  newdata = test_data,
  type = "response"
)

simple_train <- classification_metrics(
  observed = train_data$diabetes_binary,
  risk = train_data$simple_risk,
  threshold = 0.5
)

simple_test <- classification_metrics(
  observed = test_data$diabetes_binary,
  risk = test_data$simple_risk,
  threshold = 0.5
)

simple_train_auc <- simple_auc(
  observed = train_data$diabetes_binary,
  risk = train_data$simple_risk
)

simple_test_auc <- simple_auc(
  observed = test_data$diabetes_binary,
  risk = test_data$simple_risk
)

cat("\\nSIMPLE MODEL: glucose + mass + age\\n")
cat("Training accuracy:", round(simple_train$accuracy, 3), "\\n")
cat("Test accuracy:", round(simple_test$accuracy, 3), "\\n")
cat("Training AUC:", round(simple_train_auc, 3), "\\n")
cat("Test AUC:", round(simple_test_auc, 3), "\\n")
cat("Test sensitivity:", round(simple_test$sensitivity, 3), "\\n")
cat("Test specificity:", round(simple_test$specificity, 3), "\\n")
cat("Test confusion matrix:\\n")
print(simple_test$confusion_matrix)

# ----------------------------------------------------------
# Part 3: Larger model
# ----------------------------------------------------------

larger_model <- glm(
  diabetes_binary ~ pregnant + glucose + pressure + triceps +
    insulin + mass + pedigree + age,
  data = train_data,
  family = binomial
)

train_data$larger_risk <- predict(
  larger_model,
  newdata = train_data,
  type = "response"
)

test_data$larger_risk <- predict(
  larger_model,
  newdata = test_data,
  type = "response"
)

larger_train <- classification_metrics(
  observed = train_data$diabetes_binary,
  risk = train_data$larger_risk,
  threshold = 0.5
)

larger_test <- classification_metrics(
  observed = test_data$diabetes_binary,
  risk = test_data$larger_risk,
  threshold = 0.5
)

larger_train_auc <- simple_auc(
  observed = train_data$diabetes_binary,
  risk = train_data$larger_risk
)

larger_test_auc <- simple_auc(
  observed = test_data$diabetes_binary,
  risk = test_data$larger_risk
)

cat("\\nLARGER MODEL: all available routine predictors\\n")
cat("Training accuracy:", round(larger_train$accuracy, 3), "\\n")
cat("Test accuracy:", round(larger_test$accuracy, 3), "\\n")
cat("Training AUC:", round(larger_train_auc, 3), "\\n")
cat("Test AUC:", round(larger_test_auc, 3), "\\n")
cat("Test sensitivity:", round(larger_test$sensitivity, 3), "\\n")
cat("Test specificity:", round(larger_test$specificity, 3), "\\n")
cat("Test confusion matrix:\\n")
print(larger_test$confusion_matrix)

# ----------------------------------------------------------
# Part 4: Over-flexible model
# ----------------------------------------------------------

over_model <- glm(
  diabetes_binary ~ glucose + mass + age + pressure + insulin +
    I(glucose^2) + I(mass^2) + I(age^2) +
    glucose:mass + glucose:age + mass:age,
  data = train_data,
  family = binomial
)

train_data$over_risk <- predict(
  over_model,
  newdata = train_data,
  type = "response"
)

test_data$over_risk <- predict(
  over_model,
  newdata = test_data,
  type = "response"
)

over_train <- classification_metrics(
  observed = train_data$diabetes_binary,
  risk = train_data$over_risk,
  threshold = 0.5
)

over_test <- classification_metrics(
  observed = test_data$diabetes_binary,
  risk = test_data$over_risk,
  threshold = 0.5
)

over_train_auc <- simple_auc(
  observed = train_data$diabetes_binary,
  risk = train_data$over_risk
)

over_test_auc <- simple_auc(
  observed = test_data$diabetes_binary,
  risk = test_data$over_risk
)

cat("\\nOVER-FLEXIBLE MODEL: extra squared terms and interactions\\n")
cat("Training accuracy:", round(over_train$accuracy, 3), "\\n")
cat("Test accuracy:", round(over_test$accuracy, 3), "\\n")
cat("Training AUC:", round(over_train_auc, 3), "\\n")
cat("Test AUC:", round(over_test_auc, 3), "\\n")
cat("Training-test AUC gap:", round(over_train_auc - over_test_auc, 3), "\\n")
cat("Test confusion matrix:\\n")
print(over_test$confusion_matrix)

# ----------------------------------------------------------
# Part 5: Leakage demonstration
# ----------------------------------------------------------

# This artificial leakage marker is created from the outcome.
# It would not be available in a real prediction setting.
# It is included only to show why leakage is dangerous.

set.seed(2026)

train_data$leakage_marker <- train_data$diabetes_binary + rnorm(nrow(train_data), 0, 0.02)
test_data$leakage_marker <- test_data$diabetes_binary + rnorm(nrow(test_data), 0, 0.02)

leakage_model <- glm(
  diabetes_binary ~ glucose + mass + age + leakage_marker,
  data = train_data,
  family = binomial
)

train_data$leakage_risk <- predict(
  leakage_model,
  newdata = train_data,
  type = "response"
)

test_data$leakage_risk <- predict(
  leakage_model,
  newdata = test_data,
  type = "response"
)

leakage_train <- classification_metrics(
  observed = train_data$diabetes_binary,
  risk = train_data$leakage_risk,
  threshold = 0.5
)

leakage_test <- classification_metrics(
  observed = test_data$diabetes_binary,
  risk = test_data$leakage_risk,
  threshold = 0.5
)

leakage_train_auc <- simple_auc(
  observed = train_data$diabetes_binary,
  risk = train_data$leakage_risk
)

leakage_test_auc <- simple_auc(
  observed = test_data$diabetes_binary,
  risk = test_data$leakage_risk
)

cat("\\nLEAKAGE MODEL: includes an outcome-derived marker\\n")
cat("Training accuracy:", round(leakage_train$accuracy, 3), "\\n")
cat("Test accuracy:", round(leakage_test$accuracy, 3), "\\n")
cat("Training AUC:", round(leakage_train_auc, 3), "\\n")
cat("Test AUC:", round(leakage_test_auc, 3), "\\n")
cat("Test confusion matrix:\\n")
print(leakage_test$confusion_matrix)

# ----------------------------------------------------------
# Summary table
# ----------------------------------------------------------

summary_table <- data.frame(
  model = c("Simple", "Larger", "Over-flexible", "Leakage"),
  train_accuracy = round(c(
    simple_train$accuracy,
    larger_train$accuracy,
    over_train$accuracy,
    leakage_train$accuracy
  ), 3),
  test_accuracy = round(c(
    simple_test$accuracy,
    larger_test$accuracy,
    over_test$accuracy,
    leakage_test$accuracy
  ), 3),
  train_auc = round(c(
    simple_train_auc,
    larger_train_auc,
    over_train_auc,
    leakage_train_auc
  ), 3),
  test_auc = round(c(
    simple_test_auc,
    larger_test_auc,
    over_test_auc,
    leakage_test_auc
  ), 3)
)

summary_table$auc_gap <- round(
  summary_table$train_auc - summary_table$test_auc,
  3
)

cat("\\nMODEL COMPARISON TABLE\\n")
print(summary_table)

cat("\\nInterpretation discipline:\\n")
cat("1. Training performance tells us how well the model fits data it has already seen.\\n")
cat("2. Test performance is a more honest estimate of unseen-patient performance.\\n")
cat("3. A large training-test gap suggests overfitting or instability.\\n")
cat("4. Perfect-looking performance should trigger a leakage investigation.\\n")
cat("5. A clinically useful model must use predictors available at the real prediction time.\\n")`;

function Initials({
  children,
  teacher = false,
}: {
  children: string;
  teacher?: boolean;
}) {
  return (
    <div
      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-sans text-sm font-black ${
        teacher
          ? "bg-[#e8f1ff] text-[#244aa8]"
          : "bg-[#fff2bf] text-[#7a3f00]"
      }`}
    >
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
  tone?: "neutral" | "amber" | "blue" | "green" | "rose";
}) {
  const teacher = initials === "MR";
  const bubbleClass = teacher
    ? "border-[#d8dee8] bg-[#edf5ff]"
    : "border-[#ded9cf] bg-[#fbfaf7]";

  return (
    <div
      className={`flex items-start gap-4 ${
        teacher ? "justify-end" : "justify-start"
      }`}
    >
      {!teacher && <Initials>{initials}</Initials>}

      <div
        className={`max-w-4xl rounded-[1.6rem] border px-6 py-5 shadow-sm ${bubbleClass}`}
      >
        <p className="font-sans text-base font-black text-neutral-600">
          {name}
        </p>
        <div className="mt-4 text-[1.05rem] leading-8 text-neutral-800 md:text-lg md:leading-9">
          {children}
        </div>
      </div>

      {teacher && <Initials teacher>{initials}</Initials>}
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
    <article className="rounded-[1.5rem] border border-[#ded9cf] bg-[#fbfaf7] p-5 shadow-sm">
      <h3 className="font-sans text-lg font-black text-[#111111]">{title}</h3>
      <div className="mt-3 text-sm leading-7 text-neutral-700">{children}</div>
    </article>
  );
}

function FormulaBox({ children }: { children: ReactNode }) {
  return (
    <div className="mt-5 rounded-[1.5rem] border border-[#ded9cf] bg-[#fbfaf7] p-5 shadow-sm">
      <div className="font-mono text-sm leading-7 text-neutral-700">
        {children}
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
          className="min-h-[760px] w-full resize-y bg-slate-950 p-5 font-mono text-[0.84rem] leading-6 text-slate-100 outline-none selection:bg-blue-400/30"
        />
      </div>

      <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116]">
            R console output
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Output and errors appear here.
          </p>
        </div>

        <pre className="min-h-[760px] overflow-x-auto whitespace-pre-wrap bg-white p-5 font-mono text-[0.84rem] leading-6 text-slate-800">
          {output}
        </pre>
      </div>
    </div>
  );
}

const learningTopics = [
  {
    title: "Training data",
    body: "The rows used to estimate model parameters and learn the prediction rule.",
  },
  {
    title: "Test data",
    body: "Held-out rows used after model fitting to estimate unseen-patient performance.",
  },
  {
    title: "Generalisation",
    body: "The ability of a model to work on patients it did not see during training.",
  },
  {
    title: "Overfitting",
    body: "When a model learns training-specific noise, producing optimistic training performance.",
  },
  {
    title: "Leakage",
    body: "When unavailable future or outcome-derived information enters the model.",
  },
  {
    title: "Honest reporting",
    body: "Reporting performance in a way that reflects the intended clinical prediction time.",
  },
];

const figures = [
  {
    title: "Training and test data outcome distribution",
    src: "/ml-biostatistics/figures/module-1/lesson-1-4-train-test-distribution.png",
    alt: "Bar chart showing diabetes outcome distribution in training and test data.",
    interpretation:
      "Training data are used to fit the model. Test data are held back to estimate how the model behaves on unseen patients.",
  },
  {
    title: "Training accuracy vs test accuracy",
    src: "/ml-biostatistics/figures/module-1/lesson-1-4-training-vs-test-accuracy.png",
    alt: "Bar chart comparing training and test accuracy for simple, larger and over-flexible models.",
    interpretation:
      "A model should not be judged only by training accuracy. A gap between training and test performance suggests weaker generalisation.",
  },
  {
    title: "Training AUC vs test AUC",
    src: "/ml-biostatistics/figures/module-1/lesson-1-4-training-vs-test-auc.png",
    alt: "Bar chart comparing training and test AUC for three models.",
    interpretation:
      "AUC measures how well predicted risks separate positive from negative patients. A training-test AUC gap is a warning sign.",
  },
  {
    title: "Predicted risk distributions in the test data",
    src: "/ml-biostatistics/figures/module-1/lesson-1-4-test-risk-distributions.png",
    alt: "Faceted histograms showing predicted risk distributions for three models in the test set.",
    interpretation:
      "The model should separate risk among unseen test patients, not merely reproduce patterns found in training rows.",
  },
  {
    title: "Leakage can make a model look unrealistically strong",
    src: "/ml-biostatistics/figures/module-1/lesson-1-4-leakage-warning.png",
    alt: "Bar chart comparing valid model and leakage model performance.",
    interpretation:
      "A leakage model can look perfect because it uses information too close to the outcome. This is not valid medical prediction.",
  },
];

const validationScenarios = [
  {
    id: "honest-split",
    label: "Honest train/test split",
    scenario:
      "A model is fitted on 537 training patients and evaluated once on 231 held-out test patients.",
    diagnosis: "Reasonable internal validation",
    explanation:
      "The test set was not used to fit the model, so test performance is more honest than training performance. It is still internal validation, not external validation.",
  },
  {
    id: "overfitting-gap",
    label: "Large performance gap",
    scenario:
      "A model has training AUC 0.95 but test AUC 0.72 after adding many transformations and interactions.",
    diagnosis: "Possible overfitting",
    explanation:
      "The model may be learning noise or training-specific patterns. The training performance is high, but the model does not generalise as well.",
  },
  {
    id: "leakage-future",
    label: "Future diagnosis code",
    scenario:
      "A model uses a diagnosis code recorded after confirmatory testing to predict diabetes status at the initial visit.",
    diagnosis: "Leakage",
    explanation:
      "The predictor would not be available at the real prediction time. It leaks future information and makes the model clinically invalid.",
  },
  {
    id: "duplicate-records",
    label: "Duplicate patient rows",
    scenario:
      "Rows from the same patient appear in both training and test data, with nearly identical measurements.",
    diagnosis: "Data splitting problem",
    explanation:
      "The test set is no longer fully independent. The model may recognise patient-specific patterns rather than generalising to new patients.",
  },
  {
    id: "external-validation",
    label: "Different hospital",
    scenario:
      "A model trained in one hospital is tested in another hospital with different patient demographics and measurement practices.",
    diagnosis: "External validation",
    explanation:
      "This is stronger than a simple random split because it tests transportability to a genuinely different clinical setting.",
  },
];

const modelProfiles = [
  {
    id: "simple",
    name: "Simple model",
    predictors: "glucose + BMI/mass + age",
    trainAccuracy: 0.786,
    testAccuracy: 0.779,
    trainAuc: 0.832,
    testAuc: 0.819,
    sensitivity: 0.625,
    specificity: 0.849,
    note: "Low complexity. Easier to explain and less likely to chase noise, but may miss useful signal.",
  },
  {
    id: "larger",
    name: "Larger model",
    predictors: "all routine clinical predictors",
    trainAccuracy: 0.790,
    testAccuracy: 0.792,
    trainAuc: 0.843,
    testAuc: 0.837,
    sensitivity: 0.625,
    specificity: 0.868,
    note: "Uses more available predictors. Slightly better test performance in this teaching run.",
  },
  {
    id: "over",
    name: "Over-flexible model",
    predictors: "extra squared terms + interactions",
    trainAccuracy: 0.812,
    testAccuracy: 0.766,
    trainAuc: 0.881,
    testAuc: 0.838,
    sensitivity: 0.639,
    specificity: 0.824,
    note: "Higher training performance but a larger training-test gap. This raises an overfitting warning.",
  },
  {
    id: "leakage",
    name: "Leakage model",
    predictors: "valid predictors + outcome-derived marker",
    trainAccuracy: 1.0,
    testAccuracy: 1.0,
    trainAuc: 1.0,
    testAuc: 1.0,
    sensitivity: 1.0,
    specificity: 1.0,
    note: "Perfect performance is not trustworthy because the model uses information derived from the outcome.",
  },
];

const toyPatients = [
  { id: "A", risk: 0.08, observed: 0 },
  { id: "B", risk: 0.16, observed: 0 },
  { id: "C", risk: 0.29, observed: 0 },
  { id: "D", risk: 0.43, observed: 1 },
  { id: "E", risk: 0.54, observed: 1 },
  { id: "F", risk: 0.62, observed: 0 },
  { id: "G", risk: 0.77, observed: 1 },
  { id: "H", risk: 0.89, observed: 1 },
];

export default function TrainingTestingOverfittingGeneralisationPage() {
  const [activeTab, setActiveTab] = useState("Lecture");
  const [selectedScenario, setSelectedScenario] = useState("honest-split");
  const [selectedModel, setSelectedModel] = useState("simple");
  const [threshold, setThreshold] = useState(0.5);
  const [trainAccuracy, setTrainAccuracy] = useState(0.86);
  const [testAccuracy, setTestAccuracy] = useState(0.76);
  const [checklist, setChecklist] = useState({
    predictionTime: true,
    noFutureData: false,
    splitBeforeModelling: true,
    externalValidation: false,
  });

  const selectedScenarioData =
    validationScenarios.find((item) => item.id === selectedScenario) ??
    validationScenarios[0];

  const selectedModelData =
    modelProfiles.find((item) => item.id === selectedModel) ?? modelProfiles[0];

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

  const generalisationGap = Math.max(0, trainAccuracy - testAccuracy);

  const gapInterpretation =
    generalisationGap < 0.04
      ? "Small gap. This suggests stable performance in this simplified display, but external validation is still needed."
      : generalisationGap < 0.12
      ? "Moderate gap. The model may still be useful, but the training result is clearly optimistic."
      : "Large gap. This is a strong overfitting warning: the model performs much better on seen data than unseen data.";

  const checklistScore = Object.values(checklist).filter(Boolean).length;

  function toggleChecklist(key: keyof typeof checklist) {
    setChecklist((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-slate-950 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <a
            href={withBasePath(
              "/courses/machine-learning-biostatistics/modules/foundations"
            )}
            className="text-sm font-black text-[#8b1116] transition hover:text-[#5f0b0f]"
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
            <span className="rounded-full bg-[#f8e9ea] px-4 py-2 text-xs font-black text-[#8b1116]">
              Module 1
            </span>
            <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-black text-emerald-800">
              Lesson 1.4
            </span>
            <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-black text-amber-800">
              Validation
            </span>
            <span className="rounded-full bg-rose-100 px-4 py-2 text-xs font-black text-rose-800">
              Leakage warning
            </span>
          </div>

          <h1 className="mt-7 max-w-5xl text-4xl font-black tracking-tight md:text-6xl">
            Training, testing, overfitting and generalisation
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-slate-600 md:text-lg">
            A model that performs well on the data it has already seen may still
            fail on new patients. This lesson explains why honest validation,
            unseen test data, overfitting checks and leakage prevention are
            central to medical machine learning.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {[
              ["Time", "80–100 min"],
              ["Level", "Introductory → deeper"],
              ["Focus", "Generalisation"],
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
          <section className="mt-10 rounded-[2rem] border border-[#ded9cf] bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#8b1116]">
              Conversational lecture
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.035em] text-[#111111] md:text-4xl">
              The model that looked perfect
            </h2>

            <p className="mt-5 rounded-[1.75rem] bg-[#f4f2ee] p-6 text-lg font-bold leading-8 text-neutral-600 md:text-xl md:leading-9">
              <span className="font-black text-[#111111]">Scene:</span> Mr. R
              shows Emma, Oliver, James and Sophia two model reports. One model
              performs reasonably on unseen test patients. Another model looks
              almost perfect, but its predictors include information that would
              not be available at the real clinical prediction time.
            </p>

            <div className="mt-8 space-y-5">
              <DialogueLine initials="EM" name="Emma" tone="amber">
                In Lesson 1.3, we learned that supervised learning uses labelled
                examples. If the model learns from labelled patients, why can we
                not simply check how well it predicts those same patients?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Because predicting patients already used for training is easier
                than predicting genuinely new patients. Training performance
                tells us how well the model fits the data it has seen. Medical
                prediction requires generalisation.
              </DialogueLine>

              <DialogueLine initials="SO" name="Sophia" tone="amber">
                In clinic, I do not need a model that memorises historical
                patients. I need a model that helps with tomorrow’s patients,
                who were not part of model fitting.
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Exactly. That is why we split the data. The training set is used
                to estimate the model. The test set is held back and touched
                only after the model is fitted.
              </DialogueLine>

              <DialogueLine initials="OL" name="Oliver" tone="amber">
                So the test set is like a rehearsal for future patients?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Yes, but only a limited rehearsal. It is still from the same
                dataset. It is better than training performance, but external
                validation in another hospital, time period or population is
                stronger.
              </DialogueLine>

              <DialogueLine initials="JA" name="James" tone="amber">
                What about overfitting? Is that the same as leakage?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                They are different. Overfitting means the model learns
                training-specific noise or accidental patterns. Leakage means
                the model receives information it should not have. Both make
                performance too optimistic.
              </DialogueLine>

              <DialogueLine initials="EM" name="Emma" tone="amber">
                If a model gets perfect accuracy in a realistic clinical
                problem, should we celebrate?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                We should investigate first. Real patients are messy. Perfect or
                near-perfect results often mean future information, duplicate
                patient records, outcome-derived variables or some other leakage
                has entered the workflow.
              </DialogueLine>
            </div>

            <div className="mt-10 rounded-[1.75rem] border-l-8 border-[#f2a23a] bg-[#fff8e6] p-6 shadow-sm md:p-8">
              <p className="font-sans text-sm font-black uppercase tracking-[0.32em] text-[#5a260f]">
                Big idea
              </p>
              <p className="mt-4 max-w-5xl text-[1.05rem] font-medium leading-8 text-[#4b2413] md:text-lg md:leading-9">
                A model is not trustworthy because it performs well on training
                data. It becomes more trustworthy when it performs well on
                genuinely unseen data without leakage and with predictors
                available at the intended clinical prediction time.
              </p>
            </div>

            <h3 className="mt-8 font-sans text-2xl font-black tracking-[-0.03em] text-[#111111]">
              Why unseen-data performance matters
            </h3>

            <p className="mt-3 text-base leading-8 text-neutral-700">
              The training data are used to learn the model. The test data are
              used to ask a more honest question: how does the model behave on
              patients it did not see during fitting? This is not a technical
              detail. It is the core of trustworthy prediction modelling.
            </p>

            <p className="mt-3 text-base leading-8 text-neutral-700">
              A model can look excellent on the data it already knows. That does
              not mean it will work in a new clinic, a new year, a new patient
              group or a real decision pathway. Generalisation is the bridge
              between model fitting and practical usefulness.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <TopicCard title="Training data">
                Rows used to estimate the model parameters and learn the
                prediction rule.
              </TopicCard>

              <TopicCard title="Test data">
                Held-out rows used after model fitting to estimate performance
                on unseen patients.
              </TopicCard>

              <TopicCard title="Generalisation">
                The ability of a model to work beyond the patients it has
                already seen.
              </TopicCard>

              <TopicCard title="Overfitting">
                When a model learns training-specific noise or accidental
                patterns instead of stable signal.
              </TopicCard>

              <TopicCard title="Leakage">
                When future, duplicate or outcome-derived information enters
                the model and inflates performance.
              </TopicCard>

              <TopicCard title="External validation">
                Testing the model in a genuinely different setting, such as
                another hospital, population or time period.
              </TopicCard>
            </div>

            <h3 className="mt-8 font-sans text-2xl font-black tracking-[-0.03em] text-[#111111]">
              The safe validation rule
            </h3>

            <p className="mt-3 text-base leading-8 text-neutral-700">
              Before trusting a medical prediction model, define the prediction
              time, split data before model selection, keep the final test set
              protected, check for leakage, compare training and test
              performance, and clearly report whether validation is internal or
              external.
            </p>

            <div className="mt-5 rounded-[1.75rem] border border-[#ded9cf] bg-[#f8f6f1] p-6">
              <p className="text-base font-black leading-8 text-[#111111]">
                Good validation discipline = define prediction time + separate
                training and test data + protect the test set + check leakage +
                report limits of generalisation
              </p>
            </div>

            <div className="mt-8 space-y-5">
              <DialogueLine initials="OL" name="Oliver" tone="amber">
                Can a model overfit even if there is no leakage?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Yes. A model may simply be too flexible for the amount of data.
                Extra transformations, interactions or complex algorithms can
                learn noise in the training sample.
              </DialogueLine>

              <DialogueLine initials="JA" name="James" tone="amber">
                And can a leakage model look good even on the test set?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Yes. If the leaked variable is also present in the test set, the
                test performance may look excellent. But the test is no longer a
                fair simulation of real clinical use.
              </DialogueLine>

              <DialogueLine initials="SO" name="Sophia" tone="amber">
                So the safest question is not “Which model has the highest
                number?” It is “Which model performs honestly using information
                available at the real prediction time?”
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Perfect. Honest validation is the foundation of trustworthy
                medical machine learning.
              </DialogueLine>
            </div>
          </section>
        )}

        {activeTab === "Detailed Notes" && (
          <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#8b1116]">
              Detailed notes
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              Why unseen-data performance matters
            </h2>

            <div className="mt-8 space-y-8 text-base leading-8 text-slate-700">
              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  1. The central problem
                </h3>
                <p className="mt-3">
                  In supervised learning, a model is trained on examples where
                  both predictors and outcomes are observed. If we evaluate the
                  model on the same observations used to train it, performance
                  can be misleadingly high. The model may have learned patterns
                  specific to the training data rather than patterns that
                  generalise to new patients.
                </p>

                <FormulaBox>
                  Training data: used to estimate the model
                  <br />
                  Test data: held back until after model fitting
                  <br />
                  Main aim: estimate performance on unseen patients
                </FormulaBox>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  2. Training error and test error
                </h3>
                <p className="mt-3">
                  Let a fitted model be written as{" "}
                  <span className="font-mono">f̂</span>. For a binary outcome,
                  a patient is classified correctly if the predicted class
                  matches the observed outcome. Training error is calculated on
                  rows used for fitting. Test error is calculated on held-out
                  rows.
                </p>

                <FormulaBox>
                  Training error = average loss on training observations
                  <br />
                  Test error = average loss on held-out observations
                  <br />
                  Generalisation gap = test error − training error
                </FormulaBox>

                <p className="mt-4">
                  A small gap suggests that the model behaves similarly on
                  training and test data. A large gap suggests instability,
                  overfitting, distribution shift or another validation problem.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  3. Summary table of key concepts
                </h3>

                <div className="mt-5 overflow-x-auto rounded-3xl border border-slate-200">
                  <table className="w-full min-w-[900px] border-collapse text-left text-sm">
                    <thead className="bg-slate-950 text-white">
                      <tr>
                        <th className="p-4">Concept</th>
                        <th className="p-4">Meaning</th>
                        <th className="p-4">Medical ML danger</th>
                        <th className="p-4">Good practice</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [
                          "Training data",
                          "Rows used to fit the model.",
                          "Performance can look too optimistic.",
                          "Use only for fitting and tuning inside a proper validation scheme.",
                        ],
                        [
                          "Test data",
                          "Held-out rows used after model fitting.",
                          "Repeated use can turn it into training information.",
                          "Use once for final internal performance estimation.",
                        ],
                        [
                          "Overfitting",
                          "The model learns noise or accidental training patterns.",
                          "High training performance but weaker test performance.",
                          "Prefer validation, regularisation and simpler models when appropriate.",
                        ],
                        [
                          "Leakage",
                          "Unavailable future or outcome-derived information enters predictors.",
                          "Performance may look unrealistically strong.",
                          "Define prediction time before selecting predictors.",
                        ],
                        [
                          "Generalisation",
                          "Performance on patients beyond the fitting data.",
                          "Poor generalisation causes failure in practice.",
                          "Use test sets, resampling and external validation.",
                        ],
                      ].map((row) => (
                        <tr key={row[0]} className="border-t border-slate-200">
                          <td className="p-4 font-black text-slate-950">
                            {row[0]}
                          </td>
                          <td className="p-4 text-slate-600">{row[1]}</td>
                          <td className="p-4 text-slate-600">{row[2]}</td>
                          <td className="p-4 text-slate-600">{row[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  4. Model complexity and overfitting
                </h3>
                <p className="mt-3">
                  More complex models can capture more patterns, but they can
                  also capture noise. In medical datasets, especially small or
                  moderate datasets, a highly flexible model may fit the training
                  sample very well but perform less well on new patients.
                </p>

                <FormulaBox>
                  Low complexity: may underfit if too simple
                  <br />
                  Appropriate complexity: captures useful signal
                  <br />
                  Excessive complexity: may overfit training-specific noise
                </FormulaBox>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <TopicCard title="Underfitting">
                    The model is too simple to capture important predictive
                    signal. Both training and test performance may be weak.
                  </TopicCard>
                  <TopicCard title="Reasonable fit">
                    The model captures useful structure and maintains similar
                    performance on unseen data.
                  </TopicCard>
                  <TopicCard title="Overfitting">
                    The model learns noise, outliers or accidental patterns that
                    do not generalise.
                  </TopicCard>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  5. Leakage is different from ordinary overfitting
                </h3>
                <p className="mt-3">
                  Leakage occurs when the modelling process uses information
                  that would not be available at the real prediction time. It is
                  especially dangerous because it can produce extremely high test
                  performance even when the model is invalid.
                </p>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <TopicCard title="Overfitting example">
                    A model uses many interactions and learns random noise from
                    the training sample.
                  </TopicCard>
                  <TopicCard title="Leakage example">
                    A model uses a future diagnosis code, discharge medication
                    or an outcome-derived variable as a predictor.
                  </TopicCard>
                  <TopicCard title="Overfitting symptom">
                    Training performance is much better than test performance.
                  </TopicCard>
                  <TopicCard title="Leakage symptom">
                    Performance may be suspiciously perfect or far stronger
                    than clinically plausible.
                  </TopicCard>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  6. Internal validation vs external validation
                </h3>
                <p className="mt-3">
                  A random train/test split is a form of internal validation. It
                  checks whether the model can predict held-out rows from the
                  same source dataset. External validation is stronger because
                  it evaluates the model in a different hospital, time period,
                  population or data collection process.
                </p>

                <div className="mt-5 overflow-x-auto rounded-3xl border border-slate-200">
                  <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                    <thead className="bg-slate-950 text-white">
                      <tr>
                        <th className="p-4">Validation type</th>
                        <th className="p-4">What it tests</th>
                        <th className="p-4">Limitation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [
                          "Training performance",
                          "Fit to already-seen data.",
                          "Usually optimistic and not enough for reporting model usefulness.",
                        ],
                        [
                          "Random test split",
                          "Held-out performance within the same dataset.",
                          "Still internal; may not represent new hospitals or time periods.",
                        ],
                        [
                          "Cross-validation",
                          "Average internal performance across multiple splits.",
                          "Still internal unless data sources differ meaningfully.",
                        ],
                        [
                          "External validation",
                          "Transportability to a new setting.",
                          "Requires suitable independent data.",
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
                  7. Visual interpretation
                </h3>

                <div className="mt-5 grid gap-6">
                  {figures.map((figure) => (
                    <figure
                      key={figure.src}
                      className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                    >
                      <h4 className="text-xl font-black text-slate-950">
                        {figure.title}
                      </h4>
                      <img
                        src={withBasePath(figure.src)}
                        alt={figure.alt}
                        className="mt-5 w-full rounded-2xl border border-slate-200 bg-white"
                      />
                      <figcaption className="mt-4 text-sm leading-6 text-slate-600">
                        {figure.interpretation}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  8. Safe interpretation checklist
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <TopicCard title="Define prediction time">
                    State exactly when the prediction is made and which
                    predictors are available at that moment.
                  </TopicCard>
                  <TopicCard title="Split before modelling">
                    Separate training and test data before exploring model
                    performance or choosing a final model.
                  </TopicCard>
                  <TopicCard title="Avoid test-set tuning">
                    Do not repeatedly adjust the model based on the final test
                    set.
                  </TopicCard>
                  <TopicCard title="Investigate perfect results">
                    Perfect or near-perfect performance in realistic medical
                    prediction should trigger a leakage check.
                  </TopicCard>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "Interactive Lab" && (
          <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#8b1116]">
              Advanced interactive lab
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              Diagnose validation problems before trusting performance
            </h2>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-2xl font-black text-slate-950">
                  Lab 1: scenario diagnosis
                </h3>

                <p className="mt-3 text-base leading-7 text-slate-700">
                  Choose a scenario and decide whether it describes honest
                  validation, overfitting, leakage, duplicate-data bias or
                  external validation.
                </p>

                <div className="mt-5 grid gap-3">
                  {validationScenarios.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedScenario(item.id)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
                        selectedScenario === item.id
                          ? "border-slate-950 bg-slate-950 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-blue-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700">
                  <p className="font-black text-slate-950">
                    {selectedScenarioData.scenario}
                  </p>
                  <p className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-[#8b1116]">
                    Diagnosis
                  </p>
                  <p className="mt-2 text-xl font-black text-slate-950">
                    {selectedScenarioData.diagnosis}
                  </p>
                  <p className="mt-3">{selectedScenarioData.explanation}</p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-2xl font-black text-slate-950">
                  Lab 2: compare model profiles
                </h3>

                <p className="mt-3 text-base leading-7 text-slate-700">
                  Choose a model. Look at both training and test performance,
                  not only the best-looking number.
                </p>

                <div className="mt-5 grid gap-3">
                  {modelProfiles.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => setSelectedModel(model.id)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
                        selectedModel === model.id
                          ? "border-slate-950 bg-slate-950 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-blue-50"
                      }`}
                    >
                      {model.name}
                    </button>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-white p-4">
                  <p className="text-lg font-black text-slate-950">
                    {selectedModelData.name}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    <strong>Predictors:</strong> {selectedModelData.predictors}
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      ["Train accuracy", selectedModelData.trainAccuracy],
                      ["Test accuracy", selectedModelData.testAccuracy],
                      ["Train AUC", selectedModelData.trainAuc],
                      ["Test AUC", selectedModelData.testAuc],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                      >
                        <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                          {label}
                        </p>
                        <p className="mt-1 text-2xl font-black text-blue-700">
                          {typeof value === "number" ? value.toFixed(3) : value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {selectedModelData.note}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-2xl font-black text-slate-950">
                Lab 3: training-test gap simulator
              </h3>

              <p className="mt-3 max-w-4xl text-base leading-7 text-slate-700">
                Move the sliders. A model can look strong on training data while
                generalising poorly. The gap is not proof by itself, but it is a
                warning signal.
              </p>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-black uppercase tracking-[0.18em] text-slate-600">
                    Training accuracy: {trainAccuracy.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min={0.5}
                    max={1}
                    step={0.01}
                    value={trainAccuracy}
                    onChange={(event) =>
                      setTrainAccuracy(Number(event.target.value))
                    }
                    className="mt-4 w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black uppercase tracking-[0.18em] text-slate-600">
                    Test accuracy: {testAccuracy.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min={0.5}
                    max={1}
                    step={0.01}
                    value={testAccuracy}
                    onChange={(event) =>
                      setTestAccuracy(Number(event.target.value))
                    }
                    className="mt-4 w-full"
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-white p-5">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                    Training accuracy
                  </p>
                  <p className="mt-2 text-3xl font-black text-blue-700">
                    {trainAccuracy.toFixed(2)}
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                    Test accuracy
                  </p>
                  <p className="mt-2 text-3xl font-black text-emerald-700">
                    {testAccuracy.toFixed(2)}
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                    Generalisation gap
                  </p>
                  <p className="mt-2 text-3xl font-black text-rose-700">
                    {generalisationGap.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700">
                {gapInterpretation}
              </div>

              <div className="mt-6 space-y-3">
                {[
                  ["Training", trainAccuracy],
                  ["Test", testAccuracy],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[5rem_1fr_4rem] items-center gap-3"
                  >
                    <p className="font-black text-slate-950">{label}</p>
                    <div className="h-6 overflow-hidden rounded-full bg-white">
                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{
                          width: `${Number(value) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-right font-mono text-sm text-slate-600">
                      {Number(value).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-2xl font-black text-slate-950">
                Lab 4: threshold behaviour on held-out patients
              </h3>

              <p className="mt-3 max-w-4xl text-base leading-7 text-slate-700">
                Once predictions are made on test data, a threshold converts
                risks into classes. Threshold choice changes sensitivity and
                specificity, but it does not fix overfitting or leakage.
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
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-2xl font-black text-slate-950">
                  Lab 5: leakage checklist
                </h3>

                <p className="mt-3 text-base leading-7 text-slate-700">
                  Tick what is true about your modelling workflow. The goal is
                  not a high score only; the goal is to identify weak points
                  before trusting the model.
                </p>

                <div className="mt-5 grid gap-3">
                  {[
                    ["predictionTime", "Prediction time is clearly defined"],
                    ["noFutureData", "No future or outcome-derived predictors are used"],
                    ["splitBeforeModelling", "Data split was made before model selection"],
                    ["externalValidation", "External validation is available"],
                  ].map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() =>
                        toggleChecklist(key as keyof typeof checklist)
                      }
                      className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
                        checklist[key as keyof typeof checklist]
                          ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-blue-50"
                      }`}
                    >
                      {checklist[key as keyof typeof checklist] ? "✓ " : "○ "}
                      {label}
                    </button>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-white p-4">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-[#8b1116]">
                    Validation readiness score
                  </p>
                  <p className="mt-2 text-3xl font-black text-slate-950">
                    {checklistScore}/4
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {checklistScore < 2
                      ? "High risk of misleading performance. Strengthen the validation design before trusting the result."
                      : checklistScore < 4
                      ? "Some important safeguards are present, but the missing items should be discussed as limitations."
                      : "Strong checklist result. Still report assumptions, uncertainty and the need for ongoing monitoring."}
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-2xl font-black text-slate-950">
                  Lab 6: performance table interpretation
                </h3>

                <p className="mt-3 text-base leading-7 text-slate-700">
                  Compare four model profiles. The leakage model has the best
                  numbers but the worst validity.
                </p>

                <div className="mt-5 overflow-x-auto rounded-3xl border border-slate-200">
                  <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                    <thead className="bg-slate-950 text-white">
                      <tr>
                        <th className="p-4">Model</th>
                        <th className="p-4">Train AUC</th>
                        <th className="p-4">Test AUC</th>
                        <th className="p-4">Warning</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modelProfiles.map((model) => (
                        <tr key={model.id} className="border-t border-slate-200">
                          <td className="p-4 font-black text-slate-950">
                            {model.name}
                          </td>
                          <td className="p-4 text-slate-600">
                            {model.trainAuc.toFixed(3)}
                          </td>
                          <td className="p-4 text-slate-600">
                            {model.testAuc.toFixed(3)}
                          </td>
                          <td
                            className={`p-4 ${
                              model.id === "leakage"
                                ? "font-black text-rose-700"
                                : "text-slate-600"
                            }`}
                          >
                            {model.id === "leakage"
                              ? "Invalid due to leakage"
                              : model.id === "over"
                              ? "Check overfitting"
                              : "More plausible"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm leading-6 text-slate-700">
                  Do not choose a model purely because it has the highest
                  apparent performance. First check whether the validation
                  design is honest.
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "R Coding Lab" && (
          <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#8b1116]">
              R coding lab
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              Run training, testing, overfitting and leakage examples
            </h2>

            <p className="mt-4 max-w-4xl text-base leading-7 text-slate-600">
              This browser lab loads the shared diabetes CSV, creates a
              train/test split, compares simple, larger and over-flexible
              logistic models, and then deliberately creates a leakage model to
              show why perfect-looking performance can be invalid.
            </p>

            <WebRCodeRunner />

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-2xl font-black text-slate-950">
                How to interpret the output
              </h3>

              <div className="mt-5 space-y-4 text-base leading-7 text-slate-700">
                <p>
                  The first section confirms the dataset size, variable names
                  and outcome distribution. This is important because validation
                  depends on the available rows and outcome balance.
                </p>

                <p>
                  The simple and larger models show how training and test
                  performance are compared. Test accuracy and test AUC are more
                  relevant than training performance when judging
                  generalisation.
                </p>

                <p>
                  The over-flexible model adds extra squared terms and
                  interactions. If training performance rises more than test
                  performance, that suggests possible overfitting.
                </p>

                <p>
                  The leakage model includes an artificial outcome-derived
                  marker. Its perfect-looking performance should be rejected,
                  not celebrated, because the predictor would not be available
                  in a valid clinical prediction setting.
                </p>
              </div>

              <a
                href={withBasePath(
                  "/ml-biostatistics/r/module-1/lesson-1-4-training-testing-overfitting.R"
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
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#8b1116]">
              Reporting
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              How to report training, testing and leakage correctly
            </h2>

            <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
              <p>
                The shared diabetes dataset was used to demonstrate why medical
                prediction models should be evaluated on data not used for model
                fitting. The model was trained on a training set and evaluated
                on a held-out test set to obtain a more honest estimate of
                unseen-patient performance.
              </p>

              <p>
                Training performance describes how well the model fits the data
                it has already seen. Test performance is more relevant for
                assessing generalisation, although a single random split remains
                internal validation and does not replace external validation in
                another clinical setting.
              </p>

              <p>
                A comparison of simple, larger and over-flexible models
                illustrates the importance of model complexity. A model with
                higher training performance is not necessarily better if its
                test performance does not improve or if the training-test gap
                becomes larger.
              </p>

              <p>
                A deliberately leaked model can produce perfect or near-perfect
                performance by using outcome-derived information. Such
                performance should be treated as invalid because it does not
                represent information available at the real prediction time.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <article className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
                <h3 className="text-2xl font-black text-slate-950">
                  Good report language
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  “The model was fitted on training data and evaluated on a
                  held-out test set. Test performance was interpreted as an
                  internal estimate of unseen-patient performance. The analysis
                  remains limited because external validation was not performed.”
                </p>
              </article>

              <article className="rounded-3xl border border-rose-200 bg-rose-50 p-6">
                <h3 className="text-2xl font-black text-slate-950">
                  Poor report language
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  “The leakage model is the best model because it has perfect
                  accuracy.” This is wrong because perfect performance caused by
                  outcome-derived information is invalid, not superior.
                </p>
              </article>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-950 p-6 text-white">
              <h3 className="text-2xl font-black">Example report paragraph</h3>
              <p className="mt-4 text-base leading-8 text-slate-300">
                In this teaching analysis, the diabetes dataset was divided into
                training and test sets to demonstrate internal validation. The
                training set was used to estimate model parameters, while the
                test set was used only after fitting to estimate performance on
                unseen observations. A simple model using glucose, BMI/mass and
                age was compared with a larger model and an over-flexible model.
                Performance was interpreted using both training and test
                results, with attention to the training-test gap. A deliberately
                leaked model achieved perfect-looking performance, but this was
                rejected as invalid because the leakage marker was derived from
                the outcome. This illustrates that trustworthy medical machine
                learning requires honest data separation, appropriate predictor
                timing and careful leakage checks.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <TopicCard title="Report the split">
                State how many observations were used for training and testing,
                and whether the split was random, temporal, grouped or external.
              </TopicCard>
              <TopicCard title="Report performance honestly">
                Give test performance, not only training performance. Include
                sensitivity, specificity, AUC and calibration later in the
                course.
              </TopicCard>
              <TopicCard title="Report limitations">
                Say clearly when validation is internal only and when external
                validation is still needed.
              </TopicCard>
            </div>
          </section>
        )}

        {activeTab === "Quiz" && (
          <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#8b1116]">
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
                  q: "What is the purpose of the test data?",
                  a: "Test data are held back during model fitting and used to estimate performance on unseen observations.",
                },
                {
                  q: "Why is training performance usually optimistic?",
                  a: "Because the model has already seen the training observations and may have adapted to their specific patterns.",
                },
                {
                  q: "What is overfitting?",
                  a: "Overfitting occurs when a model learns noise or accidental patterns in the training data that do not generalise well to new patients.",
                },
                {
                  q: "What is leakage?",
                  a: "Leakage occurs when information unavailable at the intended prediction time enters the model, such as future diagnosis codes or outcome-derived variables.",
                },
                {
                  q: "Why should perfect performance make us suspicious in realistic medical prediction?",
                  a: "Real clinical prediction is rarely perfect. Perfect results may indicate leakage, duplicate records, outcome-derived predictors or another design problem.",
                },
                {
                  q: "What is the difference between internal and external validation?",
                  a: "Internal validation evaluates performance within the same source dataset. External validation evaluates performance in a genuinely different setting, such as another hospital or time period.",
                },
                {
                  q: "Can changing the classification threshold fix leakage?",
                  a: "No. Threshold choice changes the sensitivity-specificity trade-off, but it cannot make leaked predictors valid.",
                },
                {
                  q: "What should be defined before choosing predictors?",
                  a: "The prediction time should be defined first, so only predictors available at that time are used.",
                },
                {
                  q: "What is a safe conclusion from this lesson?",
                  a: "Medical ML models should be judged by honest unseen-data performance using predictors available at the intended prediction time, not by training performance or leaked information.",
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

        <section className="mt-10 rounded-[1.6rem] bg-[#050505] p-5 text-white shadow-sm md:p-7">
          <p className="font-sans text-xs font-black uppercase tracking-[0.28em] text-[#9fd0ff]">
            Lesson complete
          </p>

          <h2 className="mt-4 max-w-3xl font-sans text-2xl font-black leading-tight tracking-[-0.035em] md:text-3xl">
            Next, combine the foundations into a complete ML workflow.
          </h2>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-white/70 md:text-base md:leading-8">
            The next lesson brings prediction questions, learning types,
            validation, leakage checks and reporting discipline into one
            responsible biostatistical machine learning workflow.
          </p>

          <a
            href={withBasePath(
              "/courses/machine-learning-biostatistics/modules/foundations/lessons/biostatistical-ml-workflow"
            )}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
          >
            Next lesson →
          </a>
        </section>
      </section>
    </main>
  );
}