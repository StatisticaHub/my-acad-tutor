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

const browserRCode = `# Lesson 1.5 browser R lab
# Biostatistical machine learning workflow

cat("Lesson 1.5: Biostatistical machine learning workflow\\n")
cat("------------------------------------------------------\\n\\n")

# The website loads diabetes_data from the shared course CSV.
# This lab brings together the full Module 1 workflow:
# question definition, data inspection, predictor timing, train/test split,
# model fitting, validation, threshold analysis and reporting.

cat("STEP 1: Define the clinical prediction question\\n")
cat("Question: Can routinely measured clinical characteristics predict diabetes status?\\n")
cat("Target population: Patients with routinely measured diabetes-related clinical variables.\\n")
cat("Prediction time: When candidate predictors are available, before final interpretation.\\n\\n")

cat("STEP 2: Inspect the dataset\\n")
cat("Dataset dimensions:\\n")
print(dim(diabetes_data))

cat("\\nVariable names:\\n")
print(names(diabetes_data))

cat("\\nOutcome distribution:\\n")
print(table(diabetes_data$diabetes))

cat("\\nOutcome percentages:\\n")
print(round(100 * prop.table(table(diabetes_data$diabetes)), 1))

cat("\\nMean predictors by diabetes status:\\n")
print(
  aggregate(
    cbind(glucose, mass, age, pressure) ~ diabetes,
    data = diabetes_data,
    FUN = mean
  )
)

cat("\\nSTEP 3: Predictor timing check\\n")
predictor_timing <- data.frame(
  predictor = c("pregnant", "glucose", "pressure", "triceps", "insulin", "mass", "pedigree", "age"),
  available_at_prediction_time = c(TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
  role = c(
    "routine/history variable",
    "clinical measurement",
    "clinical measurement",
    "clinical measurement",
    "clinical measurement",
    "clinical measurement",
    "family/genetic risk proxy",
    "demographic variable"
  )
)

print(predictor_timing)

cat("\\nInterpretation:\\n")
cat("A predictor should only be used if it is available at the real prediction time.\\n")
cat("Future diagnosis codes, post-outcome treatment variables and outcome-derived variables should not be used.\\n\\n")

cat("STEP 4: Create a train/test split\\n")
set.seed(2026)

train_id <- sample(
  seq_len(nrow(diabetes_data)),
  size = floor(0.7 * nrow(diabetes_data))
)

train_data <- diabetes_data[train_id, ]
test_data <- diabetes_data[-train_id, ]

cat("Training rows:", nrow(train_data), "\\n")
cat("Test rows:", nrow(test_data), "\\n")

cat("\\nTraining outcome distribution:\\n")
print(table(train_data$diabetes))

cat("\\nTest outcome distribution:\\n")
print(table(test_data$diabetes))

cat("\\nSTEP 5: Fit a logistic prediction model\\n")
workflow_model <- glm(
  diabetes_binary ~ pregnant + glucose + pressure + triceps +
    insulin + mass + pedigree + age,
  data = train_data,
  family = binomial
)

cat("Model formula:\\n")
print(formula(workflow_model))

cat("\\nModel coefficients:\\n")
print(round(coef(workflow_model), 4))

cat("\\nOdds ratios for model associations:\\n")
print(round(exp(coef(workflow_model)), 3))

cat("\\nImportant reminder:\\n")
cat("These coefficients describe conditional associations in the fitted model.\\n")
cat("They are not automatically causal effects.\\n\\n")

cat("STEP 6: Predict risk in unseen test data\\n")
test_data$predicted_risk <- predict(
  workflow_model,
  newdata = test_data,
  type = "response"
)

cat("Predicted risk summary in the test data:\\n")
print(summary(test_data$predicted_risk))

cat("\\nFirst six test predictions:\\n")
print(
  head(
    test_data[, c("diabetes", "diabetes_binary", "predicted_risk")]
  )
)

safe_cell <- function(tab, observed, predicted) {
  if (observed %in% rownames(tab) && predicted %in% colnames(tab)) {
    return(tab[observed, predicted])
  }
  return(0)
}

classification_metrics <- function(observed, risk, threshold = 0.5) {
  predicted <- ifelse(risk >= threshold, 1, 0)

  tab <- table(
    Observed = factor(observed, levels = c(0, 1)),
    Predicted = factor(predicted, levels = c(0, 1))
  )

  tn <- safe_cell(tab, "0", "0")
  fp <- safe_cell(tab, "0", "1")
  fn <- safe_cell(tab, "1", "0")
  tp <- safe_cell(tab, "1", "1")

  accuracy <- (tp + tn) / sum(tab)
  sensitivity <- ifelse(tp + fn == 0, NA, tp / (tp + fn))
  specificity <- ifelse(tn + fp == 0, NA, tn / (tn + fp))
  ppv <- ifelse(tp + fp == 0, NA, tp / (tp + fp))
  npv <- ifelse(tn + fn == 0, NA, tn / (tn + fn))

  list(
    confusion_matrix = tab,
    accuracy = accuracy,
    sensitivity = sensitivity,
    specificity = specificity,
    ppv = ppv,
    npv = npv,
    tp = tp,
    fp = fp,
    tn = tn,
    fn = fn
  )
}

simple_auc <- function(observed, risk) {
  positive_risk <- risk[observed == 1]
  negative_risk <- risk[observed == 0]

  if (length(positive_risk) == 0 || length(negative_risk) == 0) {
    return(NA)
  }

  comparisons <- outer(positive_risk, negative_risk, "-")
  mean(comparisons > 0) + 0.5 * mean(comparisons == 0)
}

brier_score <- function(observed, risk) {
  mean((observed - risk)^2)
}

cat("\\nSTEP 7: Evaluate model discrimination and probability error\\n")
test_auc <- simple_auc(
  observed = test_data$diabetes_binary,
  risk = test_data$predicted_risk
)

test_brier <- brier_score(
  observed = test_data$diabetes_binary,
  risk = test_data$predicted_risk
)

cat("Test AUC:", round(test_auc, 3), "\\n")
cat("Test Brier score:", round(test_brier, 3), "\\n")

cat("\\nSTEP 8: Evaluate threshold 0.50\\n")
metrics_050 <- classification_metrics(
  observed = test_data$diabetes_binary,
  risk = test_data$predicted_risk,
  threshold = 0.5
)

cat("Confusion matrix at threshold 0.50:\\n")
print(metrics_050$confusion_matrix)

cat("\\nAccuracy:", round(metrics_050$accuracy, 3), "\\n")
cat("Sensitivity:", round(metrics_050$sensitivity, 3), "\\n")
cat("Specificity:", round(metrics_050$specificity, 3), "\\n")
cat("PPV:", round(metrics_050$ppv, 3), "\\n")
cat("NPV:", round(metrics_050$npv, 3), "\\n")

cat("\\nSTEP 9: Threshold trade-off table\\n")
thresholds <- seq(0.2, 0.7, by = 0.1)

threshold_table <- data.frame(
  threshold = thresholds,
  accuracy = NA,
  sensitivity = NA,
  specificity = NA,
  ppv = NA,
  npv = NA,
  true_positive = NA,
  false_positive = NA,
  true_negative = NA,
  false_negative = NA
)

for (i in seq_along(thresholds)) {
  threshold <- thresholds[i]

  current_metrics <- classification_metrics(
    observed = test_data$diabetes_binary,
    risk = test_data$predicted_risk,
    threshold = threshold
  )

  threshold_table$accuracy[i] <- current_metrics$accuracy
  threshold_table$sensitivity[i] <- current_metrics$sensitivity
  threshold_table$specificity[i] <- current_metrics$specificity
  threshold_table$ppv[i] <- current_metrics$ppv
  threshold_table$npv[i] <- current_metrics$npv
  threshold_table$true_positive[i] <- current_metrics$tp
  threshold_table$false_positive[i] <- current_metrics$fp
  threshold_table$true_negative[i] <- current_metrics$tn
  threshold_table$false_negative[i] <- current_metrics$fn
}

print(round(threshold_table, 3))

cat("\\nSTEP 10: Reporting summary\\n")
reporting_summary <- data.frame(
  item = c(
    "Clinical question",
    "Target population",
    "Outcome",
    "Prediction time",
    "Predictors",
    "Training rows",
    "Test rows",
    "Model",
    "AUC",
    "Brier score",
    "Threshold 0.50 accuracy",
    "Threshold 0.50 sensitivity",
    "Threshold 0.50 specificity",
    "Main limitation"
  ),
  value = c(
    "Can routine clinical characteristics predict diabetes status?",
    "Patients with diabetes-related routine clinical characteristics",
    "Diabetes status",
    "When candidate predictors are available",
    "pregnant, glucose, pressure, triceps, insulin, mass, pedigree, age",
    nrow(train_data),
    nrow(test_data),
    "Logistic regression",
    round(test_auc, 3),
    round(test_brier, 3),
    round(metrics_050$accuracy, 3),
    round(metrics_050$sensitivity, 3),
    round(metrics_050$specificity, 3),
    "Internal train/test split only; external validation would be needed"
  )
)

print(reporting_summary)

cat("\\nFinal interpretation:\\n")
cat("A responsible ML project is a workflow, not only a fitted model.\\n")
cat("The workflow begins with a clinical question and prediction time.\\n")
cat("It checks predictors for timing and leakage.\\n")
cat("It fits the model on training data and evaluates it on unseen test data.\\n")
cat("It studies thresholds because clinical decisions depend on false positives and false negatives.\\n")
cat("It reports limitations honestly, especially the need for external validation.\\n")`;

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
          className="min-h-[780px] w-full resize-y bg-slate-950 p-5 font-mono text-[0.84rem] leading-6 text-slate-100 outline-none selection:bg-blue-400/30"
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

        <pre className="min-h-[780px] overflow-x-auto whitespace-pre-wrap bg-white p-5 font-mono text-[0.84rem] leading-6 text-slate-800">
          {output}
        </pre>
      </div>
    </div>
  );
}

const learningTopics = [
  {
    title: "Clinical question",
    body: "A workflow begins by defining the clinical prediction question, not by choosing an algorithm.",
  },
  {
    title: "Target population",
    body: "The model should be built for a clearly described group of patients or samples.",
  },
  {
    title: "Prediction time",
    body: "The time at which the prediction is made determines which predictors are valid.",
  },
  {
    title: "Predictor timing",
    body: "Variables must be available before or at the prediction time to avoid leakage.",
  },
  {
    title: "Validation",
    body: "Performance must be evaluated on data not used for model fitting.",
  },
  {
    title: "Clinical threshold",
    body: "A risk threshold turns probabilities into decisions and changes false positives and false negatives.",
  },
  {
    title: "Reporting",
    body: "A responsible report explains model aim, data, validation, metrics, thresholds and limitations.",
  },
  {
    title: "Limitations",
    body: "Internal validation is not enough for deployment; external validation and clinical evaluation are needed.",
  },
];

const workflowSteps = [
  {
    step: "1",
    title: "Define the clinical question",
    question: "What decision or judgement should the model support?",
    example:
      "Can routine clinical characteristics predict diabetes status for patients with diabetes-related measurements?",
    danger: "Starting with an algorithm before knowing the clinical aim.",
  },
  {
    step: "2",
    title: "Define the target population",
    question: "Who will the model be used for?",
    example:
      "Patients with routine measurements such as glucose, BMI/mass, age and pressure.",
    danger: "Training on one population and using the model in a very different one without validation.",
  },
  {
    step: "3",
    title: "Define the outcome",
    question: "What exactly is being predicted?",
    example:
      "Diabetes-positive versus diabetes-negative status.",
    danger: "Using a vague or inconsistently measured outcome.",
  },
  {
    step: "4",
    title: "Define the prediction time",
    question: "When is the model used?",
    example:
      "When candidate predictors are available before outcome interpretation.",
    danger: "Letting future information leak into the predictor set.",
  },
  {
    step: "5",
    title: "Select valid predictors",
    question: "Which variables are available at prediction time?",
    example:
      "Pregnant, glucose, pressure, triceps, insulin, mass, pedigree and age.",
    danger: "Using post-diagnosis, post-treatment or outcome-derived variables.",
  },
  {
    step: "6",
    title: "Split or resample data",
    question: "How will unseen-patient performance be estimated?",
    example:
      "537 training rows and 231 test rows.",
    danger: "Reporting training performance as if it were future performance.",
  },
  {
    step: "7",
    title: "Fit the model",
    question: "Which prediction rule is estimated from training data?",
    example:
      "Logistic regression for binary diabetes status.",
    danger: "Choosing a complex model without enough validation.",
  },
  {
    step: "8",
    title: "Validate performance",
    question: "How well does the model work on unseen observations?",
    example:
      "AUC 0.837, Brier score 0.149, threshold 0.50 accuracy 0.792.",
    danger: "Using accuracy alone or ignoring calibration and threshold behaviour.",
  },
  {
    step: "9",
    title: "Choose and justify threshold",
    question: "How should predicted risk become a clinical class or action?",
    example:
      "Threshold 0.50 gives sensitivity 0.625 and specificity 0.868.",
    danger: "Treating 0.50 as automatic without considering false negatives and false positives.",
  },
  {
    step: "10",
    title: "Report limitations",
    question: "What should readers not overclaim?",
    example:
      "Internal train/test split only; external validation would be needed.",
    danger: "Writing as if the model is deployment-ready after one internal split.",
  },
];

const thresholdRows = [
  {
    threshold: 0.2,
    accuracy: 0.662,
    sensitivity: 0.958,
    specificity: 0.528,
    ppv: 0.479,
    npv: 0.966,
    tp: 69,
    fp: 75,
    tn: 84,
    fn: 3,
    message:
      "Very sensitive. Detects almost all diabetes-positive patients, but creates many false positives.",
  },
  {
    threshold: 0.3,
    accuracy: 0.701,
    sensitivity: 0.819,
    specificity: 0.648,
    ppv: 0.513,
    npv: 0.888,
    tp: 59,
    fp: 56,
    tn: 103,
    fn: 13,
    message:
      "Still screening-focused. Useful if missing high-risk patients is very costly.",
  },
  {
    threshold: 0.4,
    accuracy: 0.736,
    sensitivity: 0.681,
    specificity: 0.761,
    ppv: 0.563,
    npv: 0.84,
    tp: 49,
    fp: 38,
    tn: 121,
    fn: 23,
    message:
      "More balanced. Sensitivity has fallen, but false positives are lower than at 0.20 or 0.30.",
  },
  {
    threshold: 0.5,
    accuracy: 0.792,
    sensitivity: 0.625,
    specificity: 0.868,
    ppv: 0.682,
    npv: 0.836,
    tp: 45,
    fp: 21,
    tn: 138,
    fn: 27,
    message:
      "Conventional threshold. Good specificity, but some diabetes-positive patients are missed.",
  },
  {
    threshold: 0.6,
    accuracy: 0.805,
    sensitivity: 0.542,
    specificity: 0.925,
    ppv: 0.765,
    npv: 0.817,
    tp: 39,
    fp: 12,
    tn: 147,
    fn: 33,
    message:
      "More conservative. Fewer false positives, but more false negatives.",
  },
  {
    threshold: 0.7,
    accuracy: 0.779,
    sensitivity: 0.403,
    specificity: 0.95,
    ppv: 0.784,
    npv: 0.778,
    tp: 29,
    fp: 8,
    tn: 151,
    fn: 43,
    message:
      "Very conservative. High specificity, but many diabetes-positive patients are missed.",
  },
];

const figures = [
  {
    title: "Biostatistical machine learning workflow",
    src: "/ml-biostatistics/figures/module-1/lesson-1-5-workflow-roadmap.png",
    alt: "Workflow roadmap from clinical question to reporting.",
    interpretation:
      "A responsible ML project starts before model fitting. The workflow begins with the clinical question, target population, outcome and prediction time.",
  },
  {
    title: "Predicted diabetes risk in the test data",
    src: "/ml-biostatistics/figures/module-1/lesson-1-5-predicted-risk-distribution.png",
    alt: "Histogram of predicted diabetes risk in the test data by observed diabetes status.",
    interpretation:
      "Predicted probabilities are risk estimates, not diagnoses. A threshold is needed if risk must become a class or action.",
  },
  {
    title: "Threshold trade-off",
    src: "/ml-biostatistics/figures/module-1/lesson-1-5-threshold-tradeoff.png",
    alt: "Line plot showing sensitivity, specificity and accuracy across thresholds.",
    interpretation:
      "Lower thresholds increase sensitivity and false positives. Higher thresholds increase specificity but miss more true positives.",
  },
  {
    title: "Predictor timing checklist",
    src: "/ml-biostatistics/figures/module-1/lesson-1-5-predictor-timing-checklist.png",
    alt: "Predictor timing checklist showing predictors available before prediction.",
    interpretation:
      "Every predictor must be checked against the true prediction time. This is one of the strongest safeguards against leakage.",
  },
  {
    title: "Reporting dashboard at threshold 0.50",
    src: "/ml-biostatistics/figures/module-1/lesson-1-5-reporting-dashboard.png",
    alt: "Bar chart of accuracy, AUC, sensitivity and specificity at threshold 0.50.",
    interpretation:
      "A medical ML report should not rely on accuracy alone. Discrimination, threshold performance and probability error all matter.",
  },
];

const reportItems = [
  ["Clinical question", "Can routine clinical characteristics predict diabetes status?"],
  ["Target population", "Patients with diabetes-related routine clinical measurements"],
  ["Outcome", "Diabetes status"],
  ["Prediction time", "When candidate predictors are available"],
  ["Predictors", "pregnant, glucose, pressure, triceps, insulin, mass, pedigree, age"],
  ["Training rows", "537"],
  ["Test rows", "231"],
  ["Model", "Logistic regression"],
  ["AUC", "0.837"],
  ["Brier score", "0.149"],
  ["Threshold 0.50 accuracy", "0.792"],
  ["Threshold 0.50 sensitivity", "0.625"],
  ["Threshold 0.50 specificity", "0.868"],
  ["Main limitation", "Internal train/test split only; external validation would be needed"],
];

const scenarioCards = [
  {
    id: "question",
    label: "Unclear question",
    scenario:
      "A team says, “Let us use machine learning on diabetes data,” but does not define the patient group, outcome or prediction time.",
    diagnosis: "Workflow problem",
    action:
      "Pause model fitting. Define the target population, outcome, prediction time and intended use before selecting algorithms.",
  },
  {
    id: "timing",
    label: "Predictor timing problem",
    scenario:
      "A predictor is recorded only after confirmatory testing, but the model is supposed to be used before confirmatory testing.",
    diagnosis: "Leakage risk",
    action:
      "Remove the predictor or redefine the prediction time. The model cannot use information unavailable at the real decision point.",
  },
  {
    id: "threshold",
    label: "Threshold problem",
    scenario:
      "A model gives useful predicted risks, but the team uses threshold 0.50 automatically without considering false negatives.",
    diagnosis: "Decision problem",
    action:
      "Study sensitivity, specificity, PPV and NPV across thresholds. Choose a threshold based on clinical consequences.",
  },
  {
    id: "validation",
    label: "Validation problem",
    scenario:
      "The model reports high training accuracy but no test-set, cross-validation or external validation performance.",
    diagnosis: "Optimism risk",
    action:
      "Report unseen-data performance. Training performance alone is not enough for a medical prediction claim.",
  },
  {
    id: "deployment",
    label: "Deployment overclaim",
    scenario:
      "The model has one internal test split and the report concludes it is ready for clinical deployment.",
    diagnosis: "Overclaim",
    action:
      "State that the model needs external validation, calibration assessment, clinical usefulness evaluation and implementation review.",
  },
];

const finalChecklistItems = [
  {
    key: "question",
    label: "Clinical prediction question is clearly defined",
    explanation:
      "The project states what is predicted, for whom, and why the prediction matters.",
  },
  {
    key: "population",
    label: "Target population is described",
    explanation:
      "The intended patient group is clear enough to judge whether validation data are relevant.",
  },
  {
    key: "outcome",
    label: "Outcome definition is precise",
    explanation:
      "The report explains how diabetes status is defined and measured.",
  },
  {
    key: "predictionTime",
    label: "Prediction time is stated",
    explanation:
      "The moment of prediction is known before selecting predictors.",
  },
  {
    key: "timing",
    label: "Predictor timing has been checked",
    explanation:
      "Predictors are available at or before prediction time.",
  },
  {
    key: "split",
    label: "Training and test data are separated",
    explanation:
      "The model is evaluated on observations not used for fitting.",
  },
  {
    key: "threshold",
    label: "Threshold trade-off is studied",
    explanation:
      "Sensitivity, specificity, PPV and NPV are compared across thresholds.",
  },
  {
    key: "limitations",
    label: "Limitations are reported",
    explanation:
      "The report does not hide the need for external validation or implementation evaluation.",
  },
];

export default function BiostatisticalMLWorkflowPage() {
  const [activeTab, setActiveTab] = useState("Lecture");
  const [selectedStep, setSelectedStep] = useState("1");
  const [selectedThreshold, setSelectedThreshold] = useState(0.5);
  const [selectedScenario, setSelectedScenario] = useState("question");
  const [riskScore, setRiskScore] = useState(0.58);
  const [falseNegativeCost, setFalseNegativeCost] = useState(8);
  const [falsePositiveCost, setFalsePositiveCost] = useState(3);
  const [checklist, setChecklist] = useState({
    question: true,
    population: true,
    outcome: true,
    predictionTime: true,
    timing: false,
    split: true,
    threshold: false,
    limitations: false,
  });

  const selectedStepData =
    workflowSteps.find((item) => item.step === selectedStep) ?? workflowSteps[0];

  const selectedThresholdData =
    thresholdRows.find((item) => item.threshold === selectedThreshold) ??
    thresholdRows[3];

  const selectedScenarioData =
    scenarioCards.find((item) => item.id === selectedScenario) ??
    scenarioCards[0];

  const expectedCost = useMemo(() => {
    const fnCost = selectedThresholdData.fn * falseNegativeCost;
    const fpCost = selectedThresholdData.fp * falsePositiveCost;
    return {
      fnCost,
      fpCost,
      totalCost: fnCost + fpCost,
    };
  }, [selectedThresholdData, falseNegativeCost, falsePositiveCost]);

  const checklistScore = Object.values(checklist).filter(Boolean).length;

  const patientDecision =
    riskScore >= selectedThreshold
      ? "Predicted positive / consider further assessment"
      : "Predicted negative / lower priority for further assessment";

  const thresholdStyle =
    selectedThreshold < 0.35
      ? "Screening-focused"
      : selectedThreshold < 0.6
      ? "Moderately balanced"
      : "Conservative";

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
              Lesson 1.5
            </span>
            <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-black text-amber-800">
              Workflow
            </span>
            <span className="rounded-full bg-rose-100 px-4 py-2 text-xs font-black text-rose-800">
              Reporting discipline
            </span>
          </div>

          <h1 className="mt-7 max-w-5xl text-4xl font-black tracking-tight md:text-6xl">
            Biostatistical workflow for machine learning projects
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-slate-600 md:text-lg">
            This final foundation lesson brings Module 1 together. A medical ML
            project should move from clinical question to predictor timing,
            validation, threshold judgement, interpretation and transparent
            reporting — not simply from dataset to algorithm.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {[
              ["Time", "80–100 min"],
              ["Level", "Introductory → deeper"],
              ["Focus", "Complete ML workflow"],
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
              The team builds the full ML workflow
            </h2>

            <p className="mt-5 rounded-[1.75rem] bg-[#f4f2ee] p-6 text-lg font-bold leading-8 text-neutral-600 md:text-xl md:leading-9">
              <span className="font-black text-[#111111]">Scene:</span> Mr. R
              brings the Module 1 lessons together. Emma, Oliver, James and
              Sophia now have to build a complete diabetes prediction workflow:
              clinical question, target population, outcome, prediction time,
              predictor timing, validation, threshold judgement and reporting.
            </p>

            <div className="mt-8 space-y-5">
              <DialogueLine initials="EM" name="Emma" tone="amber">
                We have learned what machine learning means in biostatistics,
                how prediction differs from explanation and causation, the types
                of learning, and why training and testing matter. Is this lesson
                where we connect everything?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Exactly. Lesson 1.5 is the workflow lesson. It teaches that a
                biostatistical ML project is not just a fitted model. It is a
                chain of decisions from clinical question to reporting.
              </DialogueLine>

              <DialogueLine initials="SO" name="Sophia" tone="amber">
                In clinical work, I would not start by asking whether we should
                use logistic regression, random forests or neural networks. I
                would start by asking what decision the model should support.
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Correct. The first question is clinical: who are the patients,
                what outcome is predicted, when is the prediction made, and what
                could happen after the prediction?
              </DialogueLine>

              <DialogueLine initials="OL" name="Oliver" tone="amber">
                So for our diabetes example, the question is whether routine
                clinical characteristics can predict diabetes status?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Yes. Then we define the target population, the outcome, the
                prediction time and the predictors. Only after that should we fit
                a model.
              </DialogueLine>

              <DialogueLine initials="JA" name="James" tone="amber">
                Why does prediction time keep appearing in every lesson?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Because prediction time tells us which predictors are valid. If
                a variable is only known after diagnosis, treatment, follow-up or
                outcome measurement, it cannot be used for an earlier prediction
                task.
              </DialogueLine>

              <DialogueLine initials="EM" name="Emma" tone="amber">
                So predictor timing is how we prevent leakage?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                It is one of the strongest safeguards. Predictor timing helps us
                remove future diagnosis codes, post-treatment information,
                outcome-derived variables and workflow variables that would not
                be available in real practice.
              </DialogueLine>

              <DialogueLine initials="OL" name="Oliver" tone="amber">
                After predictor timing, we split the data into training and test
                sets?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Yes. Training data estimate the model. Test data estimate how
                the model behaves on observations it has not seen. In our
                teaching run, we use 537 training rows and 231 test rows.
              </DialogueLine>

              <DialogueLine initials="SO" name="Sophia" tone="amber">
                But the report should not only say accuracy. If the model misses
                many diabetes-positive patients, that matters clinically.
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Correct. We report AUC, Brier score, sensitivity, specificity,
                PPV and NPV. We also study thresholds because different
                thresholds create different clinical behaviour.
              </DialogueLine>

              <DialogueLine initials="JA" name="James" tone="amber">
                At threshold 0.50, the model may have good specificity but lower
                sensitivity. So it may rule out negatives better than it detects
                all positives?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                That is the correct style of interpretation. The model is not
                just a number; it is a decision tool with consequences.
              </DialogueLine>
            </div>

            <div className="mt-10 rounded-[1.75rem] border-l-8 border-[#f2a23a] bg-[#fff8e6] p-6 shadow-sm md:p-8">
              <p className="font-sans text-sm font-black uppercase tracking-[0.32em] text-[#5a260f]">
                Big idea
              </p>
              <p className="mt-4 max-w-5xl text-[1.05rem] font-medium leading-8 text-[#4b2413] md:text-lg md:leading-9">
                A medical ML model is only as trustworthy as the workflow that
                produced it. The workflow must protect the clinical question,
                predictor timing, validation, threshold choice and reporting
                language.
              </p>
            </div>

            <h3 className="mt-8 font-sans text-2xl font-black tracking-[-0.03em] text-[#111111]">
              Why the workflow matters
            </h3>

            <p className="mt-3 text-base leading-8 text-neutral-700">
              A machine learning project can fail even when the code runs
              correctly. It can fail because the clinical question is vague, the
              target population is unclear, the outcome is poorly defined, the
              predictors are measured too late, the test set is repeatedly used,
              or the report claims more than the evidence supports.
            </p>

            <p className="mt-3 text-base leading-8 text-neutral-700">
              The workflow protects the scientific meaning of the model. It
              forces the analyst to define what is being predicted, for whom,
              at what time, using which predictors, with what validation, and
              with what limitations.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <TopicCard title="Clinical question">
                What decision, risk judgement or follow-up action should the
                model support?
              </TopicCard>

              <TopicCard title="Target population">
                Who are the patients, samples or records the model is intended
                for?
              </TopicCard>

              <TopicCard title="Prediction time">
                When is the prediction made, and what information is genuinely
                available then?
              </TopicCard>

              <TopicCard title="Validation">
                How well does the model perform on observations not used for
                model fitting?
              </TopicCard>

              <TopicCard title="Threshold judgement">
                How should predicted probabilities become classes, alerts or
                actions?
              </TopicCard>

              <TopicCard title="Reporting discipline">
                What can be claimed, what cannot be claimed, and what validation
                is still needed?
              </TopicCard>

              <TopicCard title="Limitations">
                Internal validation is not deployment. External validation and
                clinical usefulness evaluation are still needed.
              </TopicCard>

              <TopicCard title="Module 1 foundation">
                The full workflow joins prediction, causality caution, learning
                type, validation and leakage control.
              </TopicCard>
            </div>

            <h3 className="mt-8 font-sans text-2xl font-black tracking-[-0.03em] text-[#111111]">
              The responsible workflow rule
            </h3>

            <p className="mt-3 text-base leading-8 text-neutral-700">
              A responsible medical ML analysis should move in order: define the
              question, define the population, define the outcome, define the
              prediction time, check predictor timing, separate training and
              validation data, fit the model, evaluate performance, inspect
              thresholds and report limitations.
            </p>

            <div className="mt-5 rounded-[1.75rem] border border-[#ded9cf] bg-[#f8f6f1] p-6">
              <p className="text-base font-black leading-8 text-[#111111]">
                Good workflow discipline = clinical question + target population
                + outcome definition + prediction time + predictor timing +
                honest validation + threshold judgement + transparent reporting
              </p>
            </div>

            <div className="mt-8 space-y-5">
              <DialogueLine initials="EM" name="Emma" tone="amber">
                So the final report should say what the model can support, what
                it cannot support, and what validation is still needed?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Exactly. A careful report explains the model aim, data,
                validation design, metrics, threshold behaviour and limitations.
                It avoids saying the model is deployable after only one internal
                test split.
              </DialogueLine>

              <DialogueLine initials="SO" name="Sophia" tone="amber">
                Clinically, that is important. A model may be useful as a
                teaching example but still not ready for real patients.
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Correct. Before clinical use, we would need external validation,
                calibration assessment, decision-curve or clinical usefulness
                thinking, fairness checks and implementation review.
              </DialogueLine>

              <DialogueLine initials="JA" name="James" tone="amber">
                So Module 1 gives us the safety rules before we study more
                algorithms.
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Perfect. This is responsible biostatistical machine learning:
                define, check, fit, validate, interpret, report and limit.
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
              The workflow before, during and after model fitting
            </h2>

            <div className="mt-8 space-y-8 text-base leading-8 text-slate-700">
              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  1. Why workflow matters more than the algorithm name
                </h3>

                <p className="mt-3">
                  Many beginners think the main task in machine learning is to
                  choose the most advanced algorithm. In biostatistics, the
                  first task is different. We must define the clinical question,
                  the target population, the outcome, the prediction time and
                  the intended use. Without these, even a technically impressive
                  model can answer the wrong question.
                </p>

                <p className="mt-3">
                  A responsible medical ML workflow protects against common
                  failures: vague outcomes, poorly defined patient populations,
                  leakage, overfitting, unvalidated performance, inappropriate
                  thresholds and overconfident reporting.
                </p>

                <FormulaBox>
                  Responsible workflow = clinical question + valid predictors +
                  honest validation + threshold judgement + transparent
                  reporting
                </FormulaBox>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  2. The ten-step workflow
                </h3>

                <div className="mt-5 overflow-x-auto rounded-3xl border border-slate-200">
                  <table className="w-full min-w-[980px] border-collapse text-left text-sm">
                    <thead className="bg-slate-950 text-white">
                      <tr>
                        <th className="p-4">Step</th>
                        <th className="p-4">Workflow step</th>
                        <th className="p-4">Main question</th>
                        <th className="p-4">Diabetes example</th>
                        <th className="p-4">Danger if skipped</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workflowSteps.map((item) => (
                        <tr key={item.step} className="border-t border-slate-200">
                          <td className="p-4 font-black text-blue-700">
                            {item.step}
                          </td>
                          <td className="p-4 font-black text-slate-950">
                            {item.title}
                          </td>
                          <td className="p-4 text-slate-600">
                            {item.question}
                          </td>
                          <td className="p-4 text-slate-600">
                            {item.example}
                          </td>
                          <td className="p-4 text-rose-700">{item.danger}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  3. Define the prediction question
                </h3>

                <p className="mt-3">
                  A prediction question should be precise enough that another
                  analyst could understand the modelling target. It should name
                  the outcome, target population and prediction time.
                </p>

                <FormulaBox>
                  Prediction question:
                  <br />
                  Can routinely measured clinical characteristics predict
                  diabetes status for patients with diabetes-related routine
                  measurements at the time these candidate predictors are
                  available?
                </FormulaBox>

                <p className="mt-4">
                  This is a prediction question, not a causal question. It asks
                  whether patient information can estimate diabetes status. It
                  does not ask whether changing BMI, glucose or age would cause a
                  change in diabetes risk.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  4. Define the data structure
                </h3>

                <p className="mt-3">
                  The shared diabetes dataset contains 768 observations. In the
                  teaching workflow, the outcome is diabetes status and the
                  predictors are routine diabetes-related variables.
                </p>

                <div className="mt-5 overflow-x-auto rounded-3xl border border-slate-200">
                  <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                    <thead className="bg-slate-950 text-white">
                      <tr>
                        <th className="p-4">Component</th>
                        <th className="p-4">Value in this lesson</th>
                        <th className="p-4">Interpretation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [
                          "Rows",
                          "768",
                          "Each row represents one patient record in the teaching dataset.",
                        ],
                        [
                          "Outcome",
                          "diabetes / diabetes_binary",
                          "The target variable to be predicted.",
                        ],
                        [
                          "Predictors",
                          "pregnant, glucose, pressure, triceps, insulin, mass, pedigree, age",
                          "Candidate variables used to estimate risk.",
                        ],
                        [
                          "Training data",
                          "537 rows",
                          "Used to estimate the logistic model.",
                        ],
                        [
                          "Test data",
                          "231 rows",
                          "Used to evaluate unseen-observation performance.",
                        ],
                        [
                          "Prediction output",
                          "Predicted probability between 0 and 1",
                          "A risk estimate that may later be converted into a class.",
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
                  5. Predictor timing and leakage control
                </h3>

                <p className="mt-3">
                  Predictor timing asks whether each variable would be known at
                  the moment the model is supposed to make a prediction. This is
                  one of the most important workflow checks in medical ML.
                </p>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <TopicCard title="Valid predictor">
                    A variable measured before or at the prediction time, such
                    as baseline glucose if the prediction is made after glucose
                    is measured.
                  </TopicCard>

                  <TopicCard title="Invalid predictor">
                    A variable only known after diagnosis, treatment,
                    confirmatory testing or follow-up.
                  </TopicCard>

                  <TopicCard title="Outcome-derived variable">
                    A variable created using the outcome or strongly encoding
                    the outcome. This can make performance look unrealistically
                    strong.
                  </TopicCard>

                  <TopicCard title="Clinical workflow variable">
                    A variable that reflects clinician suspicion or later
                    testing decisions. It may be predictive but invalid for an
                    earlier prediction time.
                  </TopicCard>
                </div>

                <FormulaBox>
                  Predictor is valid only if:
                  <br />
                  time(predictor measurement) ≤ time(prediction)
                  <br />
                  and the predictor is not derived from the outcome.
                </FormulaBox>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  6. Model fitting and validation
                </h3>

                <p className="mt-3">
                  The teaching workflow fits a logistic regression model using
                  training data. The model estimates a predicted probability for
                  each test patient:
                </p>

                <FormulaBox>
                  logit[P(Y = 1 | X)] = β₀ + β₁X₁ + β₂X₂ + ... + βₚXₚ
                  <br />
                  P̂(Y = 1 | X) = 1 / [1 + exp(-η̂)]
                </FormulaBox>

                <p className="mt-4">
                  Coefficients describe conditional associations in the fitted
                  model. They should not be reported as causal effects. The
                  model is then evaluated on held-out test rows to estimate
                  unseen-observation performance.
                </p>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <TopicCard title="AUC = 0.837">
                    A discrimination measure. It summarises how well predicted
                    risks rank positive patients above negative patients.
                  </TopicCard>

                  <TopicCard title="Brier score = 0.149">
                    A probability error measure. Lower values indicate smaller
                    squared differences between observed outcomes and predicted
                    risks.
                  </TopicCard>

                  <TopicCard title="Accuracy = 0.792">
                    The proportion correctly classified at threshold 0.50. It
                    depends on the chosen threshold.
                  </TopicCard>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  7. Thresholds and clinical consequences
                </h3>

                <p className="mt-3">
                  A predicted probability is not automatically a clinical
                  decision. A threshold converts risk into a predicted class.
                  The threshold controls the balance between false positives and
                  false negatives.
                </p>

                <FormulaBox>
                  If predicted risk ≥ threshold → predicted positive
                  <br />
                  If predicted risk &lt; threshold → predicted negative
                </FormulaBox>

                <div className="mt-5 overflow-x-auto rounded-3xl border border-slate-200">
                  <table className="w-full min-w-[980px] border-collapse text-left text-sm">
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
                      {thresholdRows.map((row) => (
                        <tr
                          key={row.threshold}
                          className="border-t border-slate-200"
                        >
                          <td className="p-4 font-black text-blue-700">
                            {row.threshold.toFixed(2)}
                          </td>
                          <td className="p-4 text-slate-600">
                            {row.accuracy.toFixed(3)}
                          </td>
                          <td className="p-4 text-slate-600">
                            {row.sensitivity.toFixed(3)}
                          </td>
                          <td className="p-4 text-slate-600">
                            {row.specificity.toFixed(3)}
                          </td>
                          <td className="p-4 text-slate-600">
                            {row.ppv.toFixed(3)}
                          </td>
                          <td className="p-4 text-slate-600">
                            {row.npv.toFixed(3)}
                          </td>
                          <td className="p-4 text-slate-600">{row.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="mt-4">
                  In many medical screening settings, false negatives are costly
                  because they miss patients who may need further assessment. In
                  other settings, false positives may be costly because they
                  create anxiety, unnecessary testing or resource burden. The
                  threshold should reflect the clinical context.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  8. Visual interpretation
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
                  9. Reporting discipline
                </h3>

                <p className="mt-3">
                  The report should not simply say that the model “works”.
                  Instead, it should state the clinical question, population,
                  outcome, prediction time, predictors, validation design,
                  performance metrics, threshold behaviour and limitations.
                </p>

                <div className="mt-5 overflow-x-auto rounded-3xl border border-slate-200">
                  <table className="w-full min-w-[780px] border-collapse text-left text-sm">
                    <thead className="bg-slate-950 text-white">
                      <tr>
                        <th className="p-4">Report item</th>
                        <th className="p-4">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportItems.map(([item, value]) => (
                        <tr key={item} className="border-t border-slate-200">
                          <td className="p-4 font-black text-slate-950">
                            {item}
                          </td>
                          <td className="p-4 text-slate-600">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  10. What this module has built
                </h3>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <TopicCard title="Lesson 1.1">
                    Machine learning in biostatistics is a prediction workflow,
                    not simply an algorithm competition.
                  </TopicCard>

                  <TopicCard title="Lesson 1.2">
                    Prediction, explanation and causality are different aims and
                    require different language.
                  </TopicCard>

                  <TopicCard title="Lesson 1.3">
                    Supervised, unsupervised and semi-supervised learning depend
                    on how outcome labels are used.
                  </TopicCard>

                  <TopicCard title="Lesson 1.4">
                    Training performance can mislead. Test performance,
                    overfitting checks and leakage checks are essential.
                  </TopicCard>

                  <TopicCard title="Lesson 1.5">
                    The complete workflow connects clinical question,
                    prediction time, validation, thresholds and reporting.
                  </TopicCard>

                  <TopicCard title="Next module">
                    Module 2 can now move into supervised learning methods with
                    a stronger foundation.
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
              Build, inspect and report the workflow
            </h2>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-2xl font-black text-slate-950">
                  Lab 1: workflow step explorer
                </h3>

                <p className="mt-3 text-base leading-7 text-slate-700">
                  Choose a workflow step. The aim is to learn what each step
                  asks, how it appears in the diabetes example and what can go
                  wrong if it is skipped.
                </p>

                <div className="mt-5 grid grid-cols-5 gap-2">
                  {workflowSteps.map((item) => (
                    <button
                      key={item.step}
                      onClick={() => setSelectedStep(item.step)}
                      className={`rounded-2xl border px-4 py-3 text-sm font-black transition ${
                        selectedStep === item.step
                          ? "border-slate-950 bg-slate-950 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-blue-50"
                      }`}
                    >
                      {item.step}
                    </button>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8b1116]">
                    Step {selectedStepData.step}
                  </p>
                  <p className="mt-2 text-xl font-black text-slate-950">
                    {selectedStepData.title}
                  </p>
                  <div className="mt-4 grid gap-3">
                    <p>
                      <strong>Main question:</strong>{" "}
                      {selectedStepData.question}
                    </p>
                    <p>
                      <strong>Diabetes example:</strong>{" "}
                      {selectedStepData.example}
                    </p>
                    <p className="text-rose-700">
                      <strong>Danger if skipped:</strong>{" "}
                      {selectedStepData.danger}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-2xl font-black text-slate-950">
                  Lab 2: workflow problem diagnosis
                </h3>

                <p className="mt-3 text-base leading-7 text-slate-700">
                  Select a workflow problem. The feedback shows what kind of
                  problem it is and what action should be taken.
                </p>

                <div className="mt-5 grid gap-3">
                  {scenarioCards.map((scenario) => (
                    <button
                      key={scenario.id}
                      onClick={() => setSelectedScenario(scenario.id)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
                        selectedScenario === scenario.id
                          ? "border-slate-950 bg-slate-950 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-blue-50"
                      }`}
                    >
                      {scenario.label}
                    </button>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700">
                  <p className="font-black text-slate-950">
                    {selectedScenarioData.scenario}
                  </p>
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-[#8b1116]">
                    Diagnosis
                  </p>
                  <p className="mt-2 text-xl font-black text-slate-950">
                    {selectedScenarioData.diagnosis}
                  </p>
                  <p className="mt-3">
                    <strong>Action:</strong> {selectedScenarioData.action}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-2xl font-black text-slate-950">
                Lab 3: threshold dashboard
              </h3>

              <p className="mt-3 max-w-4xl text-base leading-7 text-slate-700">
                Choose a threshold. Watch how sensitivity, specificity, PPV, NPV
                and confusion-matrix counts change. This is why threshold choice
                is a clinical decision, not a default.
              </p>

              <label className="mt-6 block text-sm font-black uppercase tracking-[0.18em] text-slate-600">
                Threshold: {selectedThreshold.toFixed(2)} · {thresholdStyle}
              </label>

              <input
                type="range"
                min={0.2}
                max={0.7}
                step={0.1}
                value={selectedThreshold}
                onChange={(event) =>
                  setSelectedThreshold(Number(event.target.value))
                }
                className="mt-4 w-full"
              />

              <div className="mt-5 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700">
                {selectedThresholdData.message}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-5">
                {[
                  ["Accuracy", selectedThresholdData.accuracy],
                  ["Sensitivity", selectedThresholdData.sensitivity],
                  ["Specificity", selectedThresholdData.specificity],
                  ["PPV", selectedThresholdData.ppv],
                  ["NPV", selectedThresholdData.npv],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-3xl border border-slate-200 bg-white p-5"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                      {label}
                    </p>
                    <p className="mt-2 text-3xl font-black text-blue-700">
                      {Number(value).toFixed(3)}
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
                        {selectedThresholdData.tn}
                      </td>
                      <td className="bg-rose-50 p-4 text-2xl font-black text-rose-700">
                        {selectedThresholdData.fp}
                      </td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <th className="bg-white p-4 text-left font-black">
                        Observed positive
                      </th>
                      <td className="bg-rose-50 p-4 text-2xl font-black text-rose-700">
                        {selectedThresholdData.fn}
                      </td>
                      <td className="bg-emerald-50 p-4 text-2xl font-black text-emerald-700">
                        {selectedThresholdData.tp}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  ["Sensitivity", selectedThresholdData.sensitivity],
                  ["Specificity", selectedThresholdData.specificity],
                  ["PPV", selectedThresholdData.ppv],
                  ["NPV", selectedThresholdData.npv],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[7rem_1fr_4rem] items-center gap-3"
                  >
                    <p className="font-black text-slate-950">{label}</p>
                    <div className="h-6 overflow-hidden rounded-full bg-white">
                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{ width: `${Number(value) * 100}%` }}
                      />
                    </div>
                    <p className="text-right font-mono text-sm text-slate-600">
                      {Number(value).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-2xl font-black text-slate-950">
                  Lab 4: individual risk and threshold decision
                </h3>

                <p className="mt-3 text-base leading-7 text-slate-700">
                  Move the patient risk score. The threshold converts a
                  probability into a class or action.
                </p>

                <label className="mt-6 block text-sm font-black uppercase tracking-[0.18em] text-slate-600">
                  Patient predicted risk: {riskScore.toFixed(2)}
                </label>

                <input
                  type="range"
                  min={0.01}
                  max={0.99}
                  step={0.01}
                  value={riskScore}
                  onChange={(event) => setRiskScore(Number(event.target.value))}
                  className="mt-4 w-full"
                />

                <div className="mt-5 rounded-2xl bg-white p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8b1116]">
                    Decision at threshold {selectedThreshold.toFixed(2)}
                  </p>
                  <p className="mt-2 text-2xl font-black text-slate-950">
                    {patientDecision}
                  </p>

                  <div className="mt-5 h-5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${riskScore * 100}%` }}
                    />
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    The probability did not change. Only the classification rule
                    changed when the threshold changed.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-2xl font-black text-slate-950">
                  Lab 5: false-positive and false-negative cost
                </h3>

                <p className="mt-3 text-base leading-7 text-slate-700">
                  Give simple cost weights to false negatives and false
                  positives. This is not a full decision curve analysis, but it
                  shows why clinical consequences matter.
                </p>

                <div className="mt-6 grid gap-5">
                  <div>
                    <label className="block text-sm font-black uppercase tracking-[0.18em] text-slate-600">
                      False negative cost: {falseNegativeCost}
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={15}
                      step={1}
                      value={falseNegativeCost}
                      onChange={(event) =>
                        setFalseNegativeCost(Number(event.target.value))
                      }
                      className="mt-4 w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-[0.18em] text-slate-600">
                      False positive cost: {falsePositiveCost}
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={15}
                      step={1}
                      value={falsePositiveCost}
                      onChange={(event) =>
                        setFalsePositiveCost(Number(event.target.value))
                      }
                      className="mt-4 w-full"
                    />
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl border border-slate-200 bg-white p-5">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                      FN cost
                    </p>
                    <p className="mt-2 text-3xl font-black text-rose-700">
                      {expectedCost.fnCost}
                    </p>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white p-5">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                      FP cost
                    </p>
                    <p className="mt-2 text-3xl font-black text-amber-700">
                      {expectedCost.fpCost}
                    </p>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white p-5">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                      Total
                    </p>
                    <p className="mt-2 text-3xl font-black text-blue-700">
                      {expectedCost.totalCost}
                    </p>
                  </div>
                </div>

                <p className="mt-5 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700">
                  When false negatives are costly, lower thresholds may be
                  preferred. When false positives are costly, higher thresholds
                  may be preferred. The “best” threshold depends on context.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-2xl font-black text-slate-950">
                Lab 6: final workflow readiness checklist
              </h3>

              <p className="mt-3 max-w-4xl text-base leading-7 text-slate-700">
                Tick the elements that are ready in the project. The goal is to
                identify what can be reported confidently and what must remain a
                limitation.
              </p>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {finalChecklistItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() =>
                      toggleChecklist(item.key as keyof typeof checklist)
                    }
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
                      checklist[item.key as keyof typeof checklist]
                        ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-blue-50"
                    }`}
                  >
                    {checklist[item.key as keyof typeof checklist] ? "✓ " : "○ "}
                    {item.label}
                    <span className="mt-1 block text-xs font-medium leading-5">
                      {item.explanation}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-5 rounded-2xl bg-white p-4">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#8b1116]">
                  Workflow readiness score
                </p>
                <p className="mt-2 text-3xl font-black text-slate-950">
                  {checklistScore}/8
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {checklistScore < 5
                    ? "The project is not ready for strong reporting. Strengthen question definition, timing, validation and limitations."
                    : checklistScore < 8
                    ? "The project has a reasonable foundation, but missing items should be reported clearly as limitations."
                    : "The workflow is strong for an internal teaching analysis. External validation and clinical usefulness would still be needed before deployment."}
                </p>
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
              Run the complete Module 1 workflow in the browser
            </h2>

            <p className="mt-4 max-w-4xl text-base leading-7 text-slate-600">
              This browser lab loads the shared diabetes CSV and performs the
              full foundation workflow: define the question, inspect the data,
              check predictor timing, split into training and test data, fit a
              logistic model, evaluate AUC and Brier score, analyse thresholds
              and produce a reporting summary.
            </p>

            <WebRCodeRunner />

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-2xl font-black text-slate-950">
                How to interpret the output
              </h3>

              <div className="mt-5 space-y-4 text-base leading-7 text-slate-700">
                <p>
                  The first section defines the clinical prediction question,
                  target population and prediction time. This is the foundation
                  of the workflow.
                </p>

                <p>
                  The second section inspects the dataset, outcome distribution
                  and group summaries. This prevents modelling from becoming a
                  blind algorithm exercise.
                </p>

                <p>
                  The predictor timing table asks whether each candidate
                  predictor is available at the real prediction time. This is a
                  leakage-control step.
                </p>

                <p>
                  The train/test split separates model fitting from performance
                  evaluation. The model is fitted on training data and evaluated
                  on unseen test data.
                </p>

                <p>
                  The threshold table shows that sensitivity, specificity, PPV
                  and NPV change when the threshold changes. This is why clinical
                  threshold choice must be discussed.
                </p>

                <p>
                  The final reporting summary collects the items needed for a
                  responsible model report and states the main limitation:
                  internal validation only.
                </p>
              </div>

              <a
                href={withBasePath(
                  "/ml-biostatistics/r/module-1/lesson-1-5-biostatistical-ml-workflow.R"
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
              How to report the complete ML workflow
            </h2>

            <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
              <p>
                This teaching analysis used a diabetes prediction dataset to
                demonstrate a complete introductory biostatistical machine
                learning workflow. The clinical prediction question was whether
                routinely measured clinical characteristics could predict
                diabetes status.
              </p>

              <p>
                The target population was patients with routine diabetes-related
                clinical measurements. The outcome was diabetes status. The
                candidate predictors were pregnant, glucose, pressure, triceps,
                insulin, BMI/mass, pedigree and age. These predictors were
                treated as available at the prediction time for this teaching
                exercise.
              </p>

              <p>
                The dataset contained 768 observations and was split into 537
                training rows and 231 test rows. A logistic regression model was
                fitted on the training data and evaluated on the test data. The
                model achieved AUC 0.837 and Brier score 0.149 in the test data.
              </p>

              <p>
                At threshold 0.50, the model achieved accuracy 0.792,
                sensitivity 0.625 and specificity 0.868. This means the model
                was better at identifying diabetes-negative patients than
                detecting all diabetes-positive patients at this threshold.
              </p>

              <p>
                Threshold analysis showed that lower thresholds increased
                sensitivity but created more false positives, while higher
                thresholds increased specificity but missed more
                diabetes-positive patients. Therefore, threshold choice should be
                connected to the clinical consequences of false positives and
                false negatives.
              </p>

              <p>
                This analysis is an introductory internal validation exercise.
                It should not be interpreted as a deployable clinical model.
                External validation, calibration assessment, clinical usefulness
                analysis, fairness checks and implementation evaluation would be
                needed before real-world use.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <article className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
                <h3 className="text-2xl font-black text-slate-950">
                  Good report language
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  “The model was developed as an internal teaching analysis. It
                  used routine predictors available at the defined prediction
                  time and was evaluated on held-out test data. Results should
                  be interpreted as internal validation only, and external
                  validation would be required before clinical use.”
                </p>
              </article>

              <article className="rounded-3xl border border-rose-200 bg-rose-50 p-6">
                <h3 className="text-2xl font-black text-slate-950">
                  Poor report language
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  “The machine learning model is ready for clinical use because
                  it achieved good accuracy.” This overclaims because accuracy
                  alone is incomplete and internal validation does not prove
                  deployment readiness.
                </p>
              </article>
            </div>

            <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-200">
              <table className="w-full min-w-[780px] border-collapse text-left text-sm">
                <thead className="bg-slate-950 text-white">
                  <tr>
                    <th className="p-4">Report item</th>
                    <th className="p-4">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {reportItems.map(([item, value]) => (
                    <tr key={item} className="border-t border-slate-200">
                      <td className="p-4 font-black text-slate-950">{item}</td>
                      <td className="p-4 text-slate-600">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-950 p-6 text-white">
              <h3 className="text-2xl font-black">Example report paragraph</h3>
              <p className="mt-4 text-base leading-8 text-slate-300">
                In this teaching analysis, a logistic regression model was used
                to predict diabetes status from routinely measured
                diabetes-related clinical variables. The prediction question,
                target population, outcome and prediction time were defined
                before model fitting. Candidate predictors were checked for
                availability at the prediction time to reduce leakage risk. The
                data were split into 537 training observations and 231 test
                observations. The model achieved test AUC 0.837 and Brier score
                0.149. At threshold 0.50, accuracy was 0.792, sensitivity was
                0.625 and specificity was 0.868. Threshold analysis showed a
                trade-off between detecting diabetes-positive patients and
                avoiding false positives. These results should be interpreted as
                internal validation only. External validation, calibration
                assessment and clinical usefulness evaluation would be required
                before considering real-world implementation.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <TopicCard title="What can be claimed">
                The model shows internally validated predictive performance in a
                teaching dataset.
              </TopicCard>

              <TopicCard title="What cannot be claimed">
                The model is not proven deployable, causal or externally
                transportable.
              </TopicCard>

              <TopicCard title="What comes next">
                External validation, calibration, decision-curve thinking,
                fairness checks and clinical implementation review.
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
                  q: "Why should a medical ML project not begin with the algorithm?",
                  a: "Because the clinical question, target population, outcome, prediction time and intended use determine what kind of model and validation are appropriate.",
                },
                {
                  q: "What is the prediction question in this lesson?",
                  a: "Can routinely measured clinical characteristics predict diabetes status?",
                },
                {
                  q: "Why is prediction time important?",
                  a: "Prediction time determines which predictors are valid. Variables unavailable at that time can create leakage.",
                },
                {
                  q: "What predictors are used in the full workflow model?",
                  a: "Pregnant, glucose, pressure, triceps, insulin, BMI/mass, pedigree and age.",
                },
                {
                  q: "What is the purpose of the train/test split?",
                  a: "The training data fit the model, while the test data estimate performance on observations not used for fitting.",
                },
                {
                  q: "What does AUC measure?",
                  a: "AUC measures discrimination: how well predicted risks rank positive patients above negative patients.",
                },
                {
                  q: "What does the Brier score measure?",
                  a: "The Brier score measures the mean squared difference between observed outcomes and predicted probabilities.",
                },
                {
                  q: "At threshold 0.50, what are the sensitivity and specificity in this lesson?",
                  a: "Sensitivity is 0.625 and specificity is 0.868.",
                },
                {
                  q: "Why is accuracy alone not enough?",
                  a: "Accuracy can hide the balance between false positives and false negatives, especially when outcomes are imbalanced or clinical costs differ.",
                },
                {
                  q: "What happens when the threshold is lowered?",
                  a: "Sensitivity usually increases and more positives are detected, but false positives usually increase.",
                },
                {
                  q: "What happens when the threshold is raised?",
                  a: "Specificity usually increases and false positives decrease, but more true positive cases may be missed.",
                },
                {
                  q: "Why is internal validation not enough for clinical deployment?",
                  a: "Internal validation uses the same source dataset. External validation tests whether the model transports to new hospitals, time periods or populations.",
                },
                {
                  q: "What is the safest final interpretation of this Module 1 workflow?",
                  a: "The model is an internally validated teaching example that demonstrates the workflow. It is not yet a deployable clinical model.",
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
            Module 1 complete
          </p>

          <h2 className="mt-4 max-w-3xl font-sans text-2xl font-black leading-tight tracking-[-0.035em] md:text-3xl">
            Next, move into supervised learning for clinical prediction.
          </h2>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-white/70 md:text-base md:leading-8">
            Module 2 can now build on this foundation: binary classification,
            logistic regression, decision thresholds, ROC/AUC, calibration and
            clinical prediction performance.
          </p>

          <a
            href={withBasePath(
              "/courses/machine-learning-biostatistics/modules/supervised-learning-clinical-health-data"
            )}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
          >
            Open Module 2 →
          </a>
        </section>
      </section>
    </main>
  );
}