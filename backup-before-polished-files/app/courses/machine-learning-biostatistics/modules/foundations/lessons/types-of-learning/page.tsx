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

const browserRCode = `# Lesson 1.3 browser R lab
# Types of learning: supervised, unsupervised and semi-supervised

set.seed(2026)

cat("Lesson 1.3: Types of learning\\n")
cat("Supervised, unsupervised and semi-supervised learning\\n")
cat("-------------------------------------------------------\\n\\n")

# The website loads diabetes_data from the shared course CSV.
# We use the same dataset in three different ways.

cat("Dataset dimensions:\\n")
print(dim(diabetes_data))

cat("\\nVariable names:\\n")
print(names(diabetes_data))

cat("\\nOutcome distribution:\\n")
print(table(diabetes_data$diabetes))

cat("\\nOutcome percentages:\\n")
print(round(100 * prop.table(table(diabetes_data$diabetes)), 1))

# ----------------------------------------------------------
# Part A: Supervised learning
# ----------------------------------------------------------
# Supervised learning uses predictors X and known outcome labels Y.
# Here, Y is diabetes_binary.

cat("\\nPART A: SUPERVISED LEARNING\\n")
cat("Question: Can clinical predictors estimate diabetes status for new patients?\\n")

set.seed(2026)

train_id <- sample(
  seq_len(nrow(diabetes_data)),
  size = floor(0.7 * nrow(diabetes_data))
)

train_data <- diabetes_data[train_id, ]
test_data <- diabetes_data[-train_id, ]

supervised_model <- glm(
  diabetes_binary ~ glucose + mass + age + pressure,
  data = train_data,
  family = binomial
)

test_data$predicted_risk <- predict(
  supervised_model,
  newdata = test_data,
  type = "response"
)

test_data$predicted_class <- ifelse(test_data$predicted_risk >= 0.5, 1, 0)

confusion_matrix <- table(
  Observed = test_data$diabetes_binary,
  Predicted = test_data$predicted_class
)

cat("\\nSupervised model coefficients:\\n")
print(round(coef(supervised_model), 4))

cat("\\nConfusion matrix at threshold 0.50:\\n")
print(confusion_matrix)

safe_cell <- function(tab, row_name, col_name) {
  if (row_name %in% rownames(tab) && col_name %in% colnames(tab)) {
    return(tab[row_name, col_name])
  }
  return(0)
}

tn <- safe_cell(confusion_matrix, "0", "0")
fp <- safe_cell(confusion_matrix, "0", "1")
fn <- safe_cell(confusion_matrix, "1", "0")
tp <- safe_cell(confusion_matrix, "1", "1")

accuracy <- mean(test_data$diabetes_binary == test_data$predicted_class)
sensitivity <- tp / (tp + fn)
specificity <- tn / (tn + fp)

cat("\\nSupervised performance:\\n")
cat("Accuracy:", round(accuracy, 3), "\\n")
cat("Sensitivity:", round(sensitivity, 3), "\\n")
cat("Specificity:", round(specificity, 3), "\\n")

# ----------------------------------------------------------
# Part B: Unsupervised learning
# ----------------------------------------------------------
# Unsupervised learning ignores outcome labels during learning.
# Here, we cluster patients using only X.

cat("\\nPART B: UNSUPERVISED LEARNING\\n")
cat("Question: Are there hidden patient groups based on clinical measurements?\\n")

x <- scale(diabetes_data[, c("glucose", "mass", "age", "pressure")])

set.seed(2026)
cluster_fit <- kmeans(x, centers = 3, nstart = 30)

diabetes_data$cluster <- factor(cluster_fit$cluster)

cat("\\nCluster sizes:\\n")
print(table(diabetes_data$cluster))

cat("\\nCluster centres on scaled variables:\\n")
print(round(cluster_fit$centers, 2))

cat("\\nDiabetes status by cluster, checked AFTER clustering:\\n")
print(table(
  Cluster = diabetes_data$cluster,
  Diabetes = diabetes_data$diabetes
))

cat("\\nDiabetes-positive percentage by cluster:\\n")
cluster_positive_percent <- aggregate(
  diabetes_binary ~ cluster,
  data = diabetes_data,
  FUN = mean
)

cluster_positive_percent$positive_percent <- round(
  100 * cluster_positive_percent$diabetes_binary,
  1
)

print(cluster_positive_percent[, c("cluster", "positive_percent")])

# ----------------------------------------------------------
# Part C: Semi-supervised learning
# ----------------------------------------------------------
# Semi-supervised learning occurs when all patients have X,
# but only some patients have observed labels Y.

cat("\\nPART C: SEMI-SUPERVISED LEARNING\\n")
cat("Question: What if only some patients have confirmed diabetes labels?\\n")

set.seed(2026)

diabetes_data$label_available <- ifelse(
  runif(nrow(diabetes_data)) < 0.35,
  "labelled",
  "unlabelled"
)

diabetes_data$observed_label <- ifelse(
  diabetes_data$label_available == "labelled",
  diabetes_data$diabetes,
  "unknown"
)

cat("\\nLabel availability:\\n")
print(table(diabetes_data$label_available))

cat("\\nObserved labels after hiding many outcomes:\\n")
print(table(diabetes_data$observed_label))

labelled_data <- diabetes_data[diabetes_data$label_available == "labelled", ]

cat("\\nRows with labels available:", nrow(labelled_data), "\\n")
cat("Rows without labels:", sum(diabetes_data$label_available == "unlabelled"), "\\n")

if (length(unique(labelled_data$diabetes_binary)) == 2) {
  semi_model <- glm(
    diabetes_binary ~ glucose + mass + age + pressure,
    data = labelled_data,
    family = binomial
  )

  diabetes_data$semi_supervised_score <- predict(
    semi_model,
    newdata = diabetes_data,
    type = "response"
  )

  cat("\\nSemi-supervised demonstration scores:\\n")
  print(summary(diabetes_data$semi_supervised_score))
} else {
  cat("\\nThe labelled subset did not contain both outcome classes in this random draw.\\n")
}

cat("\\nFinal interpretation:\\n")
cat("Supervised learning uses known outcomes during training.\\n")
cat("Unsupervised learning searches for structure without outcome labels.\\n")
cat("Semi-supervised learning starts with complete predictors but incomplete labels.\\n")
cat("The learning type should be chosen from the scientific question, not from the algorithm name.\\n")`;

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
          className="min-h-[720px] w-full resize-y bg-slate-950 p-5 font-mono text-[0.84rem] leading-6 text-slate-100 outline-none selection:bg-blue-400/30"
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

        <pre className="min-h-[720px] overflow-x-auto whitespace-pre-wrap bg-white p-5 font-mono text-[0.84rem] leading-6 text-slate-800">
          {output}
        </pre>
      </div>
    </div>
  );
}

const learningTopics = [
  {
    title: "Role of the label",
    body: "The learning type is determined by how the outcome label Y is used during learning.",
  },
  {
    title: "Supervised learning",
    body: "The algorithm learns from predictors X and known outcomes Y.",
  },
  {
    title: "Unsupervised learning",
    body: "The algorithm searches for structure in X without using Y.",
  },
  {
    title: "Semi-supervised learning",
    body: "The algorithm works with many records where X is known but Y is missing for some patients.",
  },
  {
    title: "Clinical use",
    body: "Prediction, subgroup discovery and incomplete labels occur frequently in real health data.",
  },
  {
    title: "Interpretation warning",
    body: "A cluster, score or algorithm name does not automatically tell you the scientific aim.",
  },
];

const learningTypes = [
  {
    id: "supervised",
    label: "Supervised learning",
    short: "X and Y are available during training.",
    question: "Can we predict an outcome for a new patient?",
    data: "Predictors plus known outcome labels.",
    example: "Predict diabetes status using glucose, BMI/mass, age and blood pressure.",
    evidence:
      "Train/test performance, cross-validation, discrimination, calibration, sensitivity and specificity.",
    warning:
      "High accuracy does not automatically explain disease mechanisms or prove causality.",
  },
  {
    id: "unsupervised",
    label: "Unsupervised learning",
    short: "Only X is used during learning.",
    question: "Are there hidden structures, patterns or subgroups?",
    data: "Predictors without using the outcome label during learning.",
    example:
      "Cluster patients using glucose, BMI/mass, age and insulin without using diabetes status.",
    evidence:
      "Cluster stability, separation, clinical interpretability and post-hoc comparison with outcomes.",
    warning:
      "If you use Y to create the groups, the analysis is no longer truly unsupervised.",
  },
  {
    id: "semi",
    label: "Semi-supervised learning",
    short: "Some records have Y, many records have X only.",
    question: "Can partial labels and unlabelled data support learning?",
    data: "Complete predictors for many patients, confirmed labels for only a subset.",
    example:
      "Use 2,000 confirmed diabetes labels and 8,000 unlabelled patient records from routine care.",
    evidence:
      "Label quality, missingness mechanism, validation on labelled data and sensitivity analysis.",
    warning:
      "Unlabelled data can help structure learning, but missing labels can also introduce bias.",
  },
];

const figures = [
  {
    title: "Learning types differ by outcome labels",
    src: "/ml-biostatistics/figures/module-1/lesson-1-3-learning-types.png",
    alt: "Diagram comparing supervised, unsupervised and semi-supervised learning.",
    interpretation:
      "The key distinction is whether outcome labels are fully available, not used, or only partly available.",
  },
  {
    title: "Supervised learning: predicted diabetes risk",
    src: "/ml-biostatistics/figures/module-1/lesson-1-3-supervised-risk.png",
    alt: "Histogram of predicted diabetes risk by observed diabetes status.",
    interpretation:
      "The supervised model learns from labelled patients and produces predicted diabetes risks for test patients.",
  },
  {
    title: "Unsupervised learning: patient clusters",
    src: "/ml-biostatistics/figures/module-1/lesson-1-3-unsupervised-clusters.png",
    alt: "PCA scatter plot showing three clusters from k-means clustering.",
    interpretation:
      "The clustering method uses clinical measurements but does not use diabetes labels while forming the groups.",
  },
  {
    title: "Semi-supervised setting: labelled and unlabelled patients",
    src: "/ml-biostatistics/figures/module-1/lesson-1-3-semi-supervised-labels.png",
    alt: "Histogram of predicted diabetes risk by labelled and unlabelled status.",
    interpretation:
      "Only some patients have labels, but all patients have predictor measurements. This is the basic semi-supervised setting.",
  },
];

const scenarios = [
  {
    id: "s1",
    text: "A logistic model is trained using glucose, BMI/mass, age and known diabetes status.",
    answer: "Supervised learning",
    reason:
      "The model learns from labelled examples because both predictors X and outcome Y are available during training.",
    type: "supervised",
  },
  {
    id: "s2",
    text: "K-means clustering groups patients using glucose, BMI/mass and age. Diabetes status is not used until after clusters are formed.",
    answer: "Unsupervised learning",
    reason:
      "The algorithm searches for structure in X only. Diabetes status may be used later for interpretation, but not during clustering.",
    type: "unsupervised",
  },
  {
    id: "s3",
    text: "A hospital has measurements for 10,000 patients, but confirmed diabetes labels for only 2,000.",
    answer: "Semi-supervised learning",
    reason:
      "All patients have predictors, but only some have labels. This is a typical incomplete-label health data setting.",
    type: "semi",
  },
  {
    id: "s4",
    text: "A team chooses clusters that maximise separation of diabetes-positive and diabetes-negative patients, then calls the method unsupervised.",
    answer: "Warning: not truly unsupervised",
    reason:
      "The outcome label guided the group creation. That violates the idea of unsupervised learning.",
    type: "warning",
  },
];

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

const clusterProfiles = [
  {
    cluster: "Cluster 1",
    description: "Lower glucose, lower BMI/mass, younger profile",
    size: 225,
    positive: 21,
    interpretation:
      "This may represent a lower-risk subgroup, but the label was not used to create the cluster.",
  },
  {
    cluster: "Cluster 2",
    description: "Moderate glucose, moderate BMI/mass, mixed age profile",
    size: 392,
    positive: 32,
    interpretation:
      "This may represent a broad middle group where risk varies across individuals.",
  },
  {
    cluster: "Cluster 3",
    description: "Higher glucose, higher BMI/mass, older profile",
    size: 151,
    positive: 47,
    interpretation:
      "This cluster may be clinically interesting, but it is not automatically a causal subgroup.",
  },
];

export default function TypesOfLearningPage() {
  const [activeTab, setActiveTab] = useState("Lecture");
  const [selectedLearningType, setSelectedLearningType] =
    useState("supervised");
  const [selectedScenario, setSelectedScenario] = useState("s1");
  const [threshold, setThreshold] = useState(0.5);
  const [labelPercent, setLabelPercent] = useState(35);
  const [selectedCluster, setSelectedCluster] = useState("Cluster 1");

  const selectedLearning =
    learningTypes.find((item) => item.id === selectedLearningType) ??
    learningTypes[0];

  const selectedScenarioData =
    scenarios.find((item) => item.id === selectedScenario) ?? scenarios[0];

  const selectedClusterData =
    clusterProfiles.find((item) => item.cluster === selectedCluster) ??
    clusterProfiles[0];

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

  const labelledCount = Math.round((768 * labelPercent) / 100);
  const unlabelledCount = 768 - labelledCount;

  const thresholdComment =
    threshold < 0.35
      ? "This threshold is sensitive and screening-oriented. It predicts more patients as positive."
      : threshold < 0.6
      ? "This threshold gives a more balanced prediction rule in the toy example."
      : "This threshold is conservative. It predicts fewer positives but misses more true positives.";

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
              Lesson 1.3
            </span>
            <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-black text-amber-800">
              Learning types
            </span>
            <span className="rounded-full bg-rose-100 px-4 py-2 text-xs font-black text-rose-800">
              Label discipline
            </span>
          </div>

          <h1 className="mt-7 max-w-5xl text-4xl font-black tracking-tight md:text-6xl">
            Types of learning: supervised, unsupervised and semi-supervised
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-slate-600 md:text-lg">
            Machine learning problems are not defined only by algorithms. They
            are defined by the scientific question, the available predictors,
            and whether outcome labels are available, hidden or partially
            observed.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {[
              ["Time", "75–95 min"],
              ["Level", "Introductory → deeper"],
              ["Focus", "Role of outcome labels"],
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
              One dataset, three learning situations
            </h2>

            <p className="mt-5 rounded-[1.75rem] bg-[#f4f2ee] p-6 text-lg font-bold leading-8 text-neutral-600 md:text-xl md:leading-9">
              <span className="font-black text-[#111111]">Scene:</span> Mr. R
              opens the diabetes dataset again. Emma, Oliver, James and Sophia
              notice that sometimes the diabetes label is used, sometimes it is
              hidden, and sometimes it is missing for many patients.
            </p>

            <div className="mt-8 space-y-5">
              <DialogueLine initials="EM" name="Emma" tone="amber">
                In the previous lessons, we used diabetes status as the outcome.
                Does every machine learning problem have an outcome like that?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Not always. Some learning problems use known outcomes directly.
                Some search for structure without using outcomes. Some have
                outcomes for only part of the dataset. That is why we separate
                supervised, unsupervised and semi-supervised learning.
              </DialogueLine>

              <DialogueLine initials="OL" name="Oliver" tone="amber">
                So the difference is not just the algorithm. It is about whether
                the outcome label is available and whether the model is allowed
                to use it.
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Exactly. In supervised learning, the model is trained on
                examples where both predictors and outcomes are known. In our
                diabetes example, each training patient has clinical variables
                and observed diabetes status.
              </DialogueLine>

              <DialogueLine initials="JA" name="James" tone="amber">
                Is that the same as learning a mapping from X to Y?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Yes. We write predictors as X and the outcome as Y. Supervised
                learning estimates a function so that f of X predicts Y for new
                patients.
              </DialogueLine>

              <DialogueLine initials="SO" name="Sophia" tone="amber">
                What about unsupervised learning? Where would that appear in a
                hospital or biomedical setting?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Suppose we collect glucose, BMI, age, insulin, blood pressure
                and other measurements. Instead of predicting diabetes status,
                we ask whether patients naturally form subgroups. The algorithm
                does not use the diabetes label while forming the groups.
              </DialogueLine>

              <DialogueLine initials="EM" name="Emma" tone="amber">
                So after clustering, can we check whether the clusters differ in
                diabetes status?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Yes, but only after the clusters are formed. The distinction is
                crucial. If diabetes status was used to create the clusters,
                then it was not purely unsupervised.
              </DialogueLine>

              <DialogueLine initials="OL" name="Oliver" tone="amber">
                And semi-supervised learning is when routine hospital data has
                measurements for many patients, but confirmed labels for only
                some of them?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Correct. Labels may be expensive, delayed or require expert
                review. In medical data, we often have many records with X, but
                only a subset with reliable Y.
              </DialogueLine>
            </div>

            <div className="mt-10 rounded-[1.75rem] border-l-8 border-[#f2a23a] bg-[#fff8e6] p-6 shadow-sm md:p-8">
              <p className="font-sans text-sm font-black uppercase tracking-[0.32em] text-[#5a260f]">
                Big idea
              </p>
              <p className="mt-4 max-w-5xl text-[1.05rem] font-medium leading-8 text-[#4b2413] md:text-lg md:leading-9">
                Supervised learning uses outcome labels to learn prediction
                rules. Unsupervised learning searches for structure without
                outcome labels. Semi-supervised learning works between these
                settings when many records are unlabelled.
              </p>
            </div>

            <h3 className="mt-8 font-sans text-2xl font-black tracking-[-0.03em] text-[#111111]">
              The role of the outcome label
            </h3>

            <p className="mt-3 text-base leading-8 text-neutral-700">
              The learning type is determined by how the outcome label is used.
              In supervised learning, Y is known during training. In
              unsupervised learning, Y is not used during learning. In
              semi-supervised learning, Y is available only for some
              observations.
            </p>

            <p className="mt-3 text-base leading-8 text-neutral-700">
              This distinction matters because the same algorithm name does not
              always tell us the scientific aim. The correct first question is:
              what is X, what is Y, is Y available, and is Y used during
              learning?
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <TopicCard title="Supervised learning">
                Predictors X and outcome labels Y are available during training.
                The usual aim is prediction for new patients.
              </TopicCard>

              <TopicCard title="Unsupervised learning">
                The algorithm searches for structure in X without using the
                outcome label during learning.
              </TopicCard>

              <TopicCard title="Semi-supervised learning">
                Predictors are available for many records, but reliable outcome
                labels are available for only some records.
              </TopicCard>
            </div>

            <h3 className="mt-8 font-sans text-2xl font-black tracking-[-0.03em] text-[#111111]">
              The safe interpretation rule
            </h3>

            <p className="mt-3 text-base leading-8 text-neutral-700">
              A prediction score, a cluster, or an unlabelled record does not
              automatically tell us the scientific meaning of the analysis. We
              must ask how labels were used, whether the result was validated,
              and whether the interpretation is being overstated.
            </p>

            <div className="mt-5 rounded-[1.75rem] border border-[#ded9cf] bg-[#f8f6f1] p-6">
              <p className="text-base font-black leading-8 text-[#111111]">
                Good label discipline = define X and Y + state whether Y is
                used during learning + validate appropriately + avoid
                overclaiming clusters or predictions
              </p>
            </div>

            <div className="mt-8 space-y-5">
              <DialogueLine initials="JA" name="James" tone="amber">
                Can the same dataset be used in all three ways?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Yes. With diabetes labels available, we can train a supervised
                model. If we hide the labels and cluster only on measurements,
                we are doing unsupervised learning. If labels are available for
                only a subset, we enter a semi-supervised setting.
              </DialogueLine>

              <DialogueLine initials="SO" name="Sophia" tone="amber">
                Clinically, the interpretation changes each time.
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Exactly. A supervised model predicts an outcome. An
                unsupervised cluster suggests possible structure. A
                semi-supervised setting raises questions about label quality,
                missing labels and bias.
              </DialogueLine>

              <DialogueLine initials="EM" name="Emma" tone="amber">
                So before choosing an algorithm, we should ask: What is X? What
                is Y? Is Y available? Is Y being used during learning?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Perfect. The learning type is not a slogan. It is a statement
                about data structure, label use and scientific aim.
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
              Learning type depends on the role of the outcome label
            </h2>

            <div className="mt-8 space-y-8 text-base leading-8 text-slate-700">
              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  1. The central distinction
                </h3>
                <p className="mt-3">
                  In biostatistical machine learning, we often organise the data
                  into predictors and outcomes. Predictors are written as{" "}
                  <span className="font-mono">X</span>. Outcomes are written as{" "}
                  <span className="font-mono">Y</span>. The learning type
                  depends on whether <span className="font-mono">Y</span> is
                  available and whether the algorithm is allowed to use it.
                </p>

                <FormulaBox>
                  Predictors: X = clinical measurements, biomarkers, omics
                  features, imaging features
                  <br />
                  Outcome: Y = disease status, survival time, treatment
                  response, diagnosis, event indicator
                  <br />
                  Learning type = how Y is used during learning
                </FormulaBox>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  2. Summary table
                </h3>

                <div className="mt-5 overflow-x-auto rounded-3xl border border-slate-200">
                  <table className="w-full min-w-[940px] border-collapse text-left text-sm">
                    <thead className="bg-slate-950 text-white">
                      <tr>
                        <th className="p-4">Learning type</th>
                        <th className="p-4">Data used</th>
                        <th className="p-4">Main question</th>
                        <th className="p-4">Typical methods</th>
                        <th className="p-4">Biostatistical example</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [
                          "Supervised",
                          "Predictors X and observed outcome Y",
                          "Can we predict Y for a new patient?",
                          "Logistic regression, random forest, boosting, support vector machines",
                          "Predict diabetes status from clinical measurements.",
                        ],
                        [
                          "Unsupervised",
                          "Predictors X only during learning",
                          "Are there hidden groups, patterns or dimensions?",
                          "K-means, hierarchical clustering, PCA, t-SNE, UMAP",
                          "Find patient subgroups without using diabetes status.",
                        ],
                        [
                          "Semi-supervised",
                          "Predictors X for many records; Y for only some records",
                          "Can labelled and unlabelled records both support learning?",
                          "Self-training, label propagation, graph-based methods, representation learning",
                          "Use confirmed diabetes labels for some patients and unlabelled records for others.",
                        ],
                      ].map((row) => (
                        <tr key={row[0]} className="border-t border-slate-200">
                          <td className="p-4 font-black text-slate-950">
                            {row[0]}
                          </td>
                          <td className="p-4 text-slate-600">{row[1]}</td>
                          <td className="p-4 text-slate-600">{row[2]}</td>
                          <td className="p-4 text-slate-600">{row[3]}</td>
                          <td className="p-4 text-slate-600">{row[4]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  3. Supervised learning in more depth
                </h3>
                <p className="mt-3">
                  In supervised learning, each training observation contains
                  both predictors and an outcome. The model learns a function
                  from predictors to outcome.
                </p>

                <FormulaBox>
                  Training data: (X₁, Y₁), (X₂, Y₂), ..., (Xₙ, Yₙ)
                  <br />
                  Learning goal: estimate f̂ so that f̂(X) predicts Y
                  <br />
                  Binary risk prediction: p̂(X) = P̂(Y = 1 | X)
                </FormulaBox>

                <p className="mt-4">
                  For a binary medical outcome such as diabetes status,
                  supervised learning can produce a predicted probability. For a
                  continuous outcome such as blood pressure, it can produce a
                  predicted value. For a time-to-event outcome, it can estimate
                  risk or survival probability over time.
                </p>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <TopicCard title="Classification">
                    Predicts a category, such as diabetes-positive versus
                    diabetes-negative.
                  </TopicCard>
                  <TopicCard title="Regression">
                    Predicts a continuous value, such as systolic blood pressure
                    or biomarker concentration.
                  </TopicCard>
                  <TopicCard title="Survival prediction">
                    Predicts time-to-event risk, such as recurrence or death
                    over follow-up.
                  </TopicCard>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  4. Unsupervised learning in more depth
                </h3>
                <p className="mt-3">
                  In unsupervised learning, the algorithm is not given the
                  outcome label during learning. It searches for structure in
                  the predictors. This can be useful when the aim is discovery,
                  visualisation or subgroup generation.
                </p>

                <FormulaBox>
                  Data used: X₁, X₂, ..., Xₙ
                  <br />
                  No outcome label is used during learning
                  <br />
                  Possible output: clusters, lower-dimensional coordinates,
                  anomaly scores
                </FormulaBox>

                <p className="mt-4">
                  In a diabetes dataset, unsupervised learning might group
                  patients based on glucose, BMI/mass, age, insulin and blood
                  pressure. After clusters are formed, we may compare diabetes
                  status across clusters. However, if diabetes status helped
                  form the clusters, the analysis is no longer truly
                  unsupervised.
                </p>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <TopicCard title="Clustering">
                    Creates groups of observations that are similar according to
                    chosen measurements.
                  </TopicCard>
                  <TopicCard title="Dimension reduction">
                    Compresses many variables into fewer dimensions for
                    visualisation or modelling.
                  </TopicCard>
                  <TopicCard title="Anomaly detection">
                    Searches for unusual records that differ strongly from the
                    main data structure.
                  </TopicCard>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  5. Semi-supervised learning in more depth
                </h3>
                <p className="mt-3">
                  Semi-supervised learning is useful when predictors are widely
                  available but outcome labels are incomplete. This is common in
                  health data because outcomes may require long follow-up,
                  specialist review, linkage or costly testing.
                </p>

                <FormulaBox>
                  Labelled data: (X₁, Y₁), ..., (Xₘ, Yₘ)
                  <br />
                  Unlabelled data: Xₘ₊₁, ..., Xₙ
                  <br />
                  Usually: m is much smaller than n
                </FormulaBox>

                <p className="mt-4">
                  The unlabelled observations may still contain information
                  about the distribution of predictors. However, semi-supervised
                  learning requires care. If labels are missing for systematic
                  reasons, such as only high-risk patients receiving confirmatory
                  tests, then the labelled subset may not represent the full
                  population.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  6. Why the same algorithm can appear in different settings
                </h3>
                <p className="mt-3">
                  Beginners often think that the algorithm name determines the
                  learning type. This is not always true. The learning type is
                  mainly determined by the data structure and how labels are
                  used.
                </p>

                <div className="mt-5 overflow-x-auto rounded-3xl border border-slate-200">
                  <table className="w-full min-w-[780px] border-collapse text-left text-sm">
                    <thead className="bg-slate-950 text-white">
                      <tr>
                        <th className="p-4">Situation</th>
                        <th className="p-4">Learning type</th>
                        <th className="p-4">Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [
                          "Logistic regression predicting diabetes status",
                          "Supervised",
                          "Uses known outcome labels during training.",
                        ],
                        [
                          "K-means clustering using glucose and BMI only",
                          "Unsupervised",
                          "Uses predictors but no outcome label during clustering.",
                        ],
                        [
                          "A model trained on confirmed labels and applied to unlabelled patients",
                          "Semi-supervised setting",
                          "Only a subset of records has observed labels.",
                        ],
                        [
                          "Clusters chosen to separate diabetes-positive and negative patients",
                          "Not purely unsupervised",
                          "Outcome labels influenced the grouping.",
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
                  <TopicCard title="Ask first">
                    What is the scientific question: prediction, subgroup
                    discovery, label completion or causal explanation?
                  </TopicCard>
                  <TopicCard title="Check X and Y">
                    Which variables are predictors? Which variable is the
                    outcome? Is the outcome observed, hidden or partly missing?
                  </TopicCard>
                  <TopicCard title="Check label use">
                    Was Y used during model fitting, cluster formation or
                    evaluation only after learning?
                  </TopicCard>
                  <TopicCard title="Avoid overclaiming">
                    Clusters are not diagnoses, predictions are not causal
                    effects, and partial labels may introduce bias.
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
              Decide how labels are being used
            </h2>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-2xl font-black text-slate-950">
                  Lab 1: compare the three learning types
                </h3>

                <p className="mt-3 text-base leading-7 text-slate-700">
                  Choose a learning type. Focus on the question, the data
                  structure and the interpretation warning.
                </p>

                <div className="mt-5 grid gap-3">
                  {learningTypes.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedLearningType(item.id)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
                        selectedLearningType === item.id
                          ? "border-slate-950 bg-slate-950 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-blue-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700">
                  <p className="text-lg font-black text-slate-950">
                    {selectedLearning.label}
                  </p>
                  <p className="mt-2">{selectedLearning.short}</p>
                  <div className="mt-4 grid gap-3">
                    <p>
                      <strong>Question:</strong> {selectedLearning.question}
                    </p>
                    <p>
                      <strong>Data:</strong> {selectedLearning.data}
                    </p>
                    <p>
                      <strong>Example:</strong> {selectedLearning.example}
                    </p>
                    <p>
                      <strong>Evidence:</strong> {selectedLearning.evidence}
                    </p>
                    <p className="text-rose-700">
                      <strong>Warning:</strong> {selectedLearning.warning}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-2xl font-black text-slate-950">
                  Lab 2: classify the scenario
                </h3>

                <p className="mt-3 text-base leading-7 text-slate-700">
                  Select a scenario and read the label-use explanation.
                </p>

                <div className="mt-5 grid gap-3">
                  {scenarios.map((scenario) => (
                    <button
                      key={scenario.id}
                      onClick={() => setSelectedScenario(scenario.id)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
                        selectedScenario === scenario.id
                          ? "border-slate-950 bg-slate-950 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-blue-50"
                      }`}
                    >
                      {scenario.text}
                    </button>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-[#8b1116]">
                    Best classification
                  </p>
                  <p className="mt-2 text-xl font-black text-slate-950">
                    {selectedScenarioData.answer}
                  </p>
                  <p className="mt-3">{selectedScenarioData.reason}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-2xl font-black text-slate-950">
                Lab 3: supervised threshold behaviour
              </h3>

              <p className="mt-3 max-w-4xl text-base leading-7 text-slate-700">
                In supervised classification, the model learns from labels and
                then produces predicted risks. A threshold converts risks into
                predicted classes. Move the threshold and watch the confusion
                matrix change.
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
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-2xl font-black text-slate-950">
                  Lab 4: unsupervised cluster interpretation
                </h3>

                <p className="mt-3 text-base leading-7 text-slate-700">
                  Choose a cluster profile. Diabetes status can be compared
                  after clustering, but it should not be used to create the
                  clusters.
                </p>

                <div className="mt-5 grid gap-3">
                  {clusterProfiles.map((cluster) => (
                    <button
                      key={cluster.cluster}
                      onClick={() => setSelectedCluster(cluster.cluster)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
                        selectedCluster === cluster.cluster
                          ? "border-slate-950 bg-slate-950 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-blue-50"
                      }`}
                    >
                      {cluster.cluster}: {cluster.description}
                    </button>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                        Size
                      </p>
                      <p className="mt-1 text-2xl font-black text-slate-950">
                        {selectedClusterData.size}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                        Positive %
                      </p>
                      <p className="mt-1 text-2xl font-black text-blue-700">
                        {selectedClusterData.positive}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                        Label use
                      </p>
                      <p className="mt-1 text-lg font-black text-emerald-700">
                        After clustering
                      </p>
                    </div>
                  </div>

                  <p className="mt-4">{selectedClusterData.interpretation}</p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-2xl font-black text-slate-950">
                  Lab 5: semi-supervised label availability
                </h3>

                <p className="mt-3 text-base leading-7 text-slate-700">
                  Adjust the percentage of patients with confirmed labels. This
                  shows why semi-supervised settings are common in routine health
                  data.
                </p>

                <label className="mt-6 block text-sm font-black uppercase tracking-[0.18em] text-slate-600">
                  Labelled records: {labelPercent}%
                </label>

                <input
                  type="range"
                  min={5}
                  max={95}
                  step={5}
                  value={labelPercent}
                  onChange={(event) => setLabelPercent(Number(event.target.value))}
                  className="mt-4 w-full"
                />

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-white p-5">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                      Labelled
                    </p>
                    <p className="mt-2 text-3xl font-black text-emerald-700">
                      {labelledCount}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      Records with confirmed outcome labels.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white p-5">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                      Unlabelled
                    </p>
                    <p className="mt-2 text-3xl font-black text-rose-700">
                      {unlabelledCount}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      Records with predictors but unknown outcome labels.
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-700">
                  {labelPercent < 25
                    ? "Very few labels are available. Learning is difficult and label quality becomes extremely important."
                    : labelPercent < 60
                    ? "This is a typical semi-supervised situation: many predictors are available, but labels are incomplete."
                    : "Many labels are available. The setting becomes closer to standard supervised learning, although unlabelled records may still be useful."}
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
              Run supervised, unsupervised and semi-supervised examples
            </h2>

            <p className="mt-4 max-w-4xl text-base leading-7 text-slate-600">
              This browser lab loads the shared diabetes CSV and uses it in
              three different ways. First, it trains a supervised prediction
              model. Second, it performs unsupervised clustering without using
              diabetes labels. Third, it hides many labels to demonstrate a
              semi-supervised setting.
            </p>

            <WebRCodeRunner />

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-2xl font-black text-slate-950">
                How to interpret the output
              </h3>

              <div className="mt-5 space-y-4 text-base leading-7 text-slate-700">
                <p>
                  The supervised section fits a logistic regression model using
                  known diabetes labels and evaluates predictions on test data.
                  Metrics such as accuracy, sensitivity and specificity belong
                  to supervised prediction.
                </p>

                <p>
                  The unsupervised section uses k-means clustering on clinical
                  measurements only. Diabetes status is checked after clustering
                  to interpret the groups, not to create them.
                </p>

                <p>
                  The semi-supervised section hides many labels. The data still
                  contain predictors for all patients, but the outcome is
                  observed only for a subset. This mimics incomplete labelling in
                  medical records.
                </p>
              </div>

              <a
                href={withBasePath(
                  "/ml-biostatistics/r/module-1/lesson-1-3-types-of-learning.R"
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
              How to report learning type correctly
            </h2>

            <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
              <p>
                The shared diabetes dataset can be used to demonstrate three
                different learning settings. In the supervised setting, diabetes
                labels are used during model training. The scientific aim is to
                learn a prediction rule that estimates diabetes status for new
                patients.
              </p>

              <p>
                In the unsupervised setting, diabetes labels are not used during
                learning. The aim is not to predict the known outcome but to
                discover structure in the predictor space. Any comparison
                between clusters and diabetes status should be described as
                post-hoc interpretation.
              </p>

              <p>
                In the semi-supervised setting, all records may have predictor
                measurements, but only some records have confirmed outcome
                labels. This reflects common clinical situations where labels
                are expensive, delayed, incomplete or selectively recorded.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <article className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
                <h3 className="text-xl font-black text-slate-950">
                  Good supervised wording
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  “The model used known diabetes labels during training and was
                  evaluated on unseen test observations.”
                </p>
              </article>

              <article className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
                <h3 className="text-xl font-black text-slate-950">
                  Good unsupervised wording
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  “Clusters were formed without using diabetes status; outcome
                  differences were examined only after clustering.”
                </p>
              </article>

              <article className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
                <h3 className="text-xl font-black text-slate-950">
                  Good semi-supervised wording
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  “The analysis reflects a partially labelled setting, where
                  predictors are available for more records than confirmed
                  outcomes.”
                </p>
              </article>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-950 p-6 text-white">
              <h3 className="text-2xl font-black">Example report paragraph</h3>
              <p className="mt-4 text-base leading-8 text-slate-300">
                In this teaching analysis, the diabetes dataset was used to
                illustrate supervised, unsupervised and semi-supervised learning.
                In the supervised setting, known diabetes labels were used to
                train a prediction model and evaluate classification performance
                on test observations. In the unsupervised setting, patient
                clusters were created using clinical measurements without using
                diabetes labels during learning; diabetes status was examined
                only after cluster formation. In the semi-supervised setting,
                only a subset of records was treated as labelled, illustrating a
                common health-data problem where predictor measurements are more
                widely available than confirmed outcomes.
              </p>
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
                  q: "What determines whether a learning problem is supervised?",
                  a: "The model is trained using both predictors X and known outcome labels Y.",
                },
                {
                  q: "What is the main aim of unsupervised learning?",
                  a: "To discover structure, patterns, clusters or lower-dimensional representations using predictors without using outcome labels during learning.",
                },
                {
                  q: "Why is semi-supervised learning common in medical data?",
                  a: "Because predictor measurements may be available for many patients, while confirmed labels may require expensive testing, expert review, follow-up or data linkage.",
                },
                {
                  q: "Can diabetes status be examined after unsupervised clustering?",
                  a: "Yes. It can be examined after clustering for interpretation, but it should not be used to form the clusters if the analysis is truly unsupervised.",
                },
                {
                  q: "Why is it misleading to use diabetes labels to choose clusters and then call the analysis unsupervised?",
                  a: "Because the outcome label influenced the learning process. That means the analysis was not purely unsupervised.",
                },
                {
                  q: "What is the difference between classification and regression in supervised learning?",
                  a: "Classification predicts categories such as disease-positive or disease-negative. Regression predicts continuous values such as blood pressure or biomarker level.",
                },
                {
                  q: "What is a key risk in semi-supervised learning?",
                  a: "The labelled subset may not represent the full population, especially if labels are missing for systematic clinical reasons.",
                },
                {
                  q: "What is the safest first question before choosing an algorithm?",
                  a: "Ask what the scientific aim is, what X and Y are, whether Y is available, and whether Y should be used during learning.",
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
            Next, learn why training performance can mislead.
          </h2>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-white/70 md:text-base md:leading-8">
            The next lesson introduces training data, test data, overfitting and
            generalisation, which are central to honest prediction modelling.
          </p>

          <a
            href={withBasePath(
              "/courses/machine-learning-biostatistics/modules/foundations/lessons/training-testing-overfitting-generalisation"
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