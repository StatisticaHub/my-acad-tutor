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

const browserRCode = `# Lesson 1.2 browser R lab
# Prediction vs explanation vs causal thinking

cat("Lesson 1.2: Prediction, explanation and causal thinking\\n")
cat("----------------------------------------------------------\\n\\n")

# The website loads diabetes_data from the shared course CSV.
# The dataset should contain diabetes_binary plus predictors such as glucose,
# mass/BMI and age.

cat("Dataset dimensions:\\n")
print(dim(diabetes_data))

cat("\\nVariable names:\\n")
print(names(diabetes_data))

cat("\\nOutcome distribution:\\n")
print(table(diabetes_data$diabetes))

cat("\\nMean glucose, mass and age by observed diabetes status:\\n")
print(
  aggregate(
    cbind(glucose, mass, age) ~ diabetes,
    data = diabetes_data,
    FUN = mean
  )
)

# ----------------------------------------------------------
# Part 1: Prediction question
# ----------------------------------------------------------
# Question: Can we estimate diabetes status for a new patient?
# Evidence: performance on data not used to train the model.

set.seed(2026)
train_id <- sample(
  seq_len(nrow(diabetes_data)),
  size = floor(0.7 * nrow(diabetes_data))
)

train_data <- diabetes_data[train_id, ]
test_data <- diabetes_data[-train_id, ]

prediction_model <- glm(
  diabetes_binary ~ glucose + mass + age,
  data = train_data,
  family = binomial
)

test_data$predicted_risk <- predict(
  prediction_model,
  newdata = test_data,
  type = "response"
)

test_data$predicted_class <- ifelse(test_data$predicted_risk >= 0.5, 1, 0)

confusion_matrix <- table(
  Observed = test_data$diabetes_binary,
  Predicted = test_data$predicted_class
)

cat("\\nPrediction model coefficients:\\n")
print(round(coef(prediction_model), 4))

cat("\\nConfusion matrix at threshold 0.50:\\n")
print(confusion_matrix)

accuracy <- mean(test_data$diabetes_binary == test_data$predicted_class)

# Use safe extraction in case a row/column is missing in a small split
get_cell <- function(tab, observed, predicted) {
  if (observed %in% rownames(tab) && predicted %in% colnames(tab)) {
    return(tab[observed, predicted])
  }
  return(0)
}

tn <- get_cell(confusion_matrix, "0", "0")
fp <- get_cell(confusion_matrix, "0", "1")
fn <- get_cell(confusion_matrix, "1", "0")
tp <- get_cell(confusion_matrix, "1", "1")

sensitivity <- tp / (tp + fn)
specificity <- tn / (tn + fp)

cat("\\nPrediction performance:\\n")
cat("Accuracy:", round(accuracy, 3), "\\n")
cat("Sensitivity:", round(sensitivity, 3), "\\n")
cat("Specificity:", round(specificity, 3), "\\n")

# ----------------------------------------------------------
# Part 2: Explanation question
# ----------------------------------------------------------
# Question: Which variables are associated with diabetes status in the
# observed dataset, conditional on the variables included in the model?
# Evidence: coefficients, odds ratios and uncertainty.

explanatory_model <- glm(
  diabetes_binary ~ glucose + mass + age,
  data = diabetes_data,
  family = binomial
)

coef_table <- summary(explanatory_model)$coefficients
odds_ratios <- exp(coef(explanatory_model))

cat("\\nExplanatory association model coefficient table:\\n")
print(round(coef_table, 4))

cat("\\nOdds ratios from the explanatory model:\\n")
print(round(odds_ratios, 3))

# ----------------------------------------------------------
# Part 3: Causal thinking
# ----------------------------------------------------------
# A causal question is different:
# What would happen to future diabetes risk if a specific intervention changed
# BMI/mass, glucose, diet, medication or another exposure?
# This cannot be answered by a prediction model alone.

cat("\\nInterpretation discipline:\\n")
cat("Prediction question: Does the model estimate risk well for new patients?\\n")
cat("Explanation question: Which variables are associated with the outcome?\\n")
cat("Causal question: What would happen under an intervention?\\n")
cat("\\nSafe conclusion:\\n")
cat("Glucose, BMI/mass and age may help predict diabetes status and may be associated with diabetes status.\\n")
cat("But this fitted model alone does not prove the causal effect of changing glucose, BMI/mass or age.\\n")`;

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
            <p className="mt-1 text-xs leading-5 text-slate-700">
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
          className="min-h-[700px] w-full resize-y bg-slate-950 p-5 font-mono text-[0.84rem] leading-6 text-slate-100 outline-none selection:bg-blue-400/30"
        />
      </div>

      <div className="overflow-hidden rounded-[1.75rem] border border-[#ded9cf] bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116]">
            R console output
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-700">
            Output and errors appear here.
          </p>
        </div>

        <pre className="min-h-[700px] overflow-x-auto whitespace-pre-wrap bg-white p-5 font-mono text-[0.84rem] leading-6 text-slate-800">
          {output}
        </pre>
      </div>
    </div>
  );
}

const learningTopics = [
  {
    title: "Prediction",
    body: "Can we estimate an outcome for a new patient, using information available at the prediction time?",
  },
  {
    title: "Explanation",
    body: "Which variables are associated with the outcome in the observed data, conditional on the fitted model?",
  },
  {
    title: "Causality",
    body: "What would happen to the outcome if we intervened on an exposure, treatment or behaviour?",
  },
  {
    title: "Timing",
    body: "Were the predictors measured before the prediction and before the outcome process being discussed?",
  },
  {
    title: "Confounding",
    body: "Could a third variable influence both the exposure and outcome, creating a misleading association?",
  },
  {
    title: "Safe reporting",
    body: "Does the language match the actual aim: prediction, association or causal effect estimation?",
  },
];

const toyPatients = [
  { id: "A", glucose: 91, mass: 23, age: 24, risk: 0.07, observed: 0 },
  { id: "B", glucose: 103, mass: 27, age: 32, risk: 0.17, observed: 0 },
  { id: "C", glucose: 116, mass: 30, age: 37, risk: 0.32, observed: 0 },
  { id: "D", glucose: 128, mass: 33, age: 41, risk: 0.47, observed: 1 },
  { id: "E", glucose: 139, mass: 35, age: 45, risk: 0.58, observed: 1 },
  { id: "F", glucose: 146, mass: 38, age: 49, risk: 0.68, observed: 0 },
  { id: "G", glucose: 160, mass: 40, age: 53, risk: 0.80, observed: 1 },
  { id: "H", glucose: 173, mass: 43, age: 57, risk: 0.90, observed: 1 },
];

const questionExamples = [
  {
    id: "prediction",
    label: "Prediction question",
    question:
      "Can routinely measured clinical characteristics estimate diabetes status for a new patient?",
    correctAim: "Prediction",
    evidence: "Discrimination, calibration, sensitivity, specificity and validation on unseen data.",
    unsafeClaim:
      "The model proves that changing glucose or BMI will change diabetes risk.",
    safeClaim:
      "The model may help estimate diabetes risk when the same predictors are available at the prediction time.",
  },
  {
    id: "explanation",
    label: "Explanation question",
    question:
      "Which variables are associated with diabetes status in the observed dataset?",
    correctAim: "Explanation / association",
    evidence: "Regression coefficients, odds ratios, uncertainty intervals and model assumptions.",
    unsafeClaim:
      "Every statistically important variable is automatically a useful intervention target.",
    safeClaim:
      "The fitted model describes conditional associations in the observed data.",
  },
  {
    id: "causal",
    label: "Causal question",
    question:
      "Would reducing BMI through an intervention reduce future diabetes risk?",
    correctAim: "Causal thinking",
    evidence: "Time order, intervention definition, confounder control and causal assumptions.",
    unsafeClaim:
      "A prediction coefficient alone estimates the intervention effect.",
    safeClaim:
      "A causal question requires a causal design, even if prediction models provide useful background information.",
  },
];

const causalScenarios = [
  {
    id: "valid-prediction",
    label: "Baseline prediction",
    text: "Use glucose, BMI/mass and age measured at the clinic visit to predict current diabetes status.",
    feedback:
      "This is a reasonable prediction setup if the variables are available at the decision time and the model is validated on relevant patients.",
  },
  {
    id: "leakage",
    label: "Future information",
    text: "Use a diagnosis code recorded after confirmatory testing as a predictor of diabetes status.",
    feedback:
      "This is leakage. The predictor contains information from after the prediction time, so performance would be exaggerated and clinically invalid.",
  },
  {
    id: "association",
    label: "Association statement",
    text: "Report that higher glucose is associated with diabetes-positive status in the fitted model.",
    feedback:
      "This is an association statement. It may be acceptable if phrased carefully, but it still does not prove an intervention effect.",
  },
  {
    id: "causal-overclaim",
    label: "Causal overclaim",
    text: "Conclude that lowering BMI will reduce diabetes risk because the BMI coefficient is positive.",
    feedback:
      "This overclaims. The coefficient is not automatically a causal effect. Confounding, time order and intervention definition must be addressed.",
  },
];

const assumptionCards = [
  {
    title: "Exchangeability",
    body: "Patients compared across exposure levels should be comparable after controlling for relevant confounders.",
  },
  {
    title: "Positivity",
    body: "There should be realistic variation in exposure or treatment levels across patient types.",
  },
  {
    title: "Consistency",
    body: "The intervention being imagined must be clearly defined, not vague language such as simply “better lifestyle”.",
  },
  {
    title: "Correct timing",
    body: "Confounders should be measured before the exposure, and the exposure before the outcome.",
  },
];

export default function PredictionExplanationCausalThinkingPage() {
  const [activeTab, setActiveTab] = useState("Lecture");
  const [questionChoice, setQuestionChoice] = useState("prediction");
  const [selectedScenario, setSelectedScenario] = useState("valid-prediction");
  const [threshold, setThreshold] = useState(0.5);
  const [selectedCoefficient, setSelectedCoefficient] = useState("glucose");
  const [causalChecklist, setCausalChecklist] = useState({
    timeOrder: true,
    confounding: false,
    intervention: false,
    validation: true,
  });

  const selectedQuestion =
    questionExamples.find((item) => item.id === questionChoice) ??
    questionExamples[0];

  const selectedScenarioData =
    causalScenarios.find((item) => item.id === selectedScenario) ??
    causalScenarios[0];

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

  const causalReadinessScore = Object.values(causalChecklist).filter(Boolean).length;

  const coefficientExplanation =
    selectedCoefficient === "glucose"
      ? "A positive glucose coefficient means higher glucose is associated with higher predicted log-odds of diabetes status, conditional on the variables in the model. It is not automatically the causal effect of changing glucose."
      : selectedCoefficient === "mass"
      ? "A positive BMI/mass coefficient means higher BMI/mass is associated with higher predicted log-odds in this fitted model. Causal interpretation would require a defined intervention and confounder control."
      : "An age coefficient may improve prediction because diabetes risk patterns vary by age. Age is usually not an intervention target, so causal wording must be especially careful.";

  const thresholdComment =
    threshold < 0.35
      ? "A low threshold is screening-oriented. It increases detection of positive cases but creates more false positives. This is a prediction decision, not a causal conclusion."
      : threshold < 0.6
      ? "A middle threshold balances sensitivity and specificity in this toy example. The threshold changes classification behaviour without changing any causal effect."
      : "A high threshold is conservative. It reduces false positives but may miss more positive cases. This reflects decision trade-offs, not causation.";

  function toggleChecklist(key: keyof typeof causalChecklist) {
    setCausalChecklist((current) => ({
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
            className="hidden rounded-full border border-[#ded9cf] bg-white px-5 py-2.5 text-sm font-black text-slate-700 shadow-sm sm:inline-flex"
          >
            ML in Biostatistics
          </a>
        </div>

        <section className="mt-8 rounded-[2rem] border border-[#ded9cf] bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-[#f8e9ea] px-4 py-2 text-xs font-black text-[#8b1116]">
              Module 1
            </span>
            <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-black text-emerald-800">
              Lesson 1.2
            </span>
            <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-black text-amber-800">
              Interpretation
            </span>
            <span className="rounded-full bg-rose-100 px-4 py-2 text-xs font-black text-rose-800">
              Causal warning
            </span>
          </div>

          <h1 className="mt-7 max-w-5xl text-4xl font-black tracking-tight md:text-6xl">
            Prediction vs explanation vs causal thinking
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-slate-600 md:text-lg">
            A prediction model may estimate risk well, an explanatory model may
            describe associations, and a causal study may estimate what would
            happen under an intervention. This lesson teaches students to keep
            those three aims separate before interpreting any model output.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {[
              ["Time", "70–90 min"],
              ["Level", "Introductory → deeper"],
              ["Focus", "Interpretation discipline"],
              ["Coding", "R in browser"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-700">
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
              One dataset, three scientific questions
            </h2>

            <p className="mt-5 rounded-[1.75rem] bg-[#f4f2ee] p-6 text-lg font-bold leading-8 text-neutral-600 md:text-xl md:leading-9">
              <span className="font-black text-[#111111]">Scene:</span> Mr. R
              walks into the same computer lab from Lesson 1.1. Emma, Oliver,
              James and Sophia are looking at the diabetes dataset again. This
              time, the question is not only whether a model can predict
              diabetes status, but what kind of scientific claim the model is
              allowed to support.
            </p>

            <div className="mt-8 space-y-5">
              <DialogueLine initials="EM" name="Emma" tone="amber">
                In the last lesson, we said a model can use glucose, BMI and age
                to predict diabetes status. But if those variables help the
                model, can I say they explain diabetes?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                You can say they may contain predictive information. You may
                also say they are associated with diabetes status in a fitted
                model. But you cannot automatically say they explain the disease
                process or cause diabetes.
              </DialogueLine>

              <DialogueLine initials="OL" name="Oliver" tone="amber">
                So prediction, explanation and causation are three different
                things?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Exactly. Prediction asks, “Can we estimate an outcome for a new
                patient?” Explanation asks, “Which variables are associated with
                the outcome in the observed data?” Causation asks, “What would
                happen to the outcome if we intervened on something?”
              </DialogueLine>

              <DialogueLine initials="JA" name="James" tone="amber">
                If a logistic regression coefficient for BMI is positive, what
                can we safely say?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Safely, we can say that higher BMI is associated with higher
                modelled log-odds of diabetes status, conditional on the other
                variables in the model. But that coefficient is not automatically
                the effect of reducing BMI through an intervention.
              </DialogueLine>

              <DialogueLine initials="SO" name="Sophia" tone="amber">
                Clinically, that matters. A model might help identify who needs
                testing, but deciding which treatment or intervention will help
                is a different question.
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Perfect. Prediction can support screening, triage or monitoring.
                Causal evidence is needed when we want to make claims about what
                would happen if a treatment, exposure or behaviour changed.
              </DialogueLine>
            </div>

            <div className="mt-10 rounded-[1.75rem] border-l-8 border-[#f2a23a] bg-[#fff8e6] p-6 shadow-sm md:p-8">
              <p className="font-sans text-sm font-black uppercase tracking-[0.32em] text-[#5a260f]">
                Big idea
              </p>
              <p className="mt-4 max-w-5xl text-[1.05rem] font-medium leading-8 text-[#4b2413] md:text-lg md:leading-9">
                Good biostatistical machine learning is not only about building
                models. It is about matching the model, the validation strategy
                and the interpretation to the scientific question.
              </p>
            </div>

            <h3 className="mt-8 font-sans text-2xl font-black tracking-[-0.03em] text-[#111111]">
              Why this distinction matters
            </h3>

            <p className="mt-3 text-base leading-8 text-neutral-700">
              The same dataset can support different types of questions. A
              prediction question asks whether the model can estimate an outcome
              for new patients. An explanatory question asks how variables are
              associated with the outcome in the observed data. A causal question
              asks what would happen under an intervention.
            </p>

            <p className="mt-3 text-base leading-8 text-neutral-700">
              Problems begin when these aims are mixed together. A model can
              predict well without explaining the biological process. A
              coefficient can describe an association without estimating an
              intervention effect. A variable can be useful for prediction while
              still being a poor causal target.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <TopicCard title="Prediction">
                Can we estimate diabetes status for a new patient using
                information available at the prediction time?
              </TopicCard>

              <TopicCard title="Explanation">
                Which variables are associated with diabetes status in the
                observed dataset, conditional on the fitted model?
              </TopicCard>

              <TopicCard title="Causal thinking">
                What would happen to future diabetes risk if a defined
                intervention changed an exposure, treatment or behaviour?
              </TopicCard>

              <TopicCard title="Association">
                A statistical relationship observed in the data. It may be
                useful, but it is not automatically causal.
              </TopicCard>

              <TopicCard title="Confounding">
                A third variable may influence both the exposure and outcome,
                making an association misleading as a causal effect.
              </TopicCard>

              <TopicCard title="Safe reporting">
                The language in a report must match the aim: prediction,
                association or causation.
              </TopicCard>
            </div>

            <h3 className="mt-8 font-sans text-2xl font-black tracking-[-0.03em] text-[#111111]">
              The safe interpretation rule
            </h3>

            <p className="mt-3 text-base leading-8 text-neutral-700">
              Before interpreting any model output, name the question first. If
              the question is predictive, focus on validation, calibration,
              discrimination and clinical usefulness. If the question is
              explanatory, focus on associations, uncertainty and assumptions. If
              the question is causal, define the intervention, establish time
              order and handle confounding.
            </p>

            <div className="mt-5 rounded-[1.75rem] border border-[#ded9cf] bg-[#f8f6f1] p-6">
              <p className="text-base font-black leading-8 text-[#111111]">
                Safe medical ML interpretation = name the question + check time
                order + avoid causal overclaiming + report what the model
                actually supports
              </p>
            </div>

            <div className="mt-8 space-y-5">
              <DialogueLine initials="OL" name="Oliver" tone="amber">
                Can a variable be useful for prediction but not causal?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Yes. A postcode, hospital code, previous testing pattern or
                medication history may predict an outcome because it captures
                healthcare access, severity or clinical workflow. That does not
                mean the variable itself biologically causes the outcome.
              </DialogueLine>

              <DialogueLine initials="JA" name="James" tone="amber">
                What about leakage? Does it also affect interpretation?
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Very much. If future information enters the prediction model,
                performance may look excellent. But the result is invalid
                because the model used information that would not be available
                at the real prediction time.
              </DialogueLine>

              <DialogueLine initials="EM" name="Emma" tone="amber">
                So when I write a report, I should avoid saying “the model
                proves that BMI causes diabetes”.
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Exactly. A safer sentence is: “BMI was associated with diabetes
                status in the fitted model and may contain predictive
                information. Causal interpretation would require a causal design
                and appropriate confounder control.”
              </DialogueLine>

              <DialogueLine initials="SO" name="Sophia" tone="amber">
                That sounds more careful, and also more useful clinically.
              </DialogueLine>

              <DialogueLine initials="MR" name="Mr. R">
                Yes. Good biostatistics is not only about getting a model to run.
                It is about making sure the conclusion is no stronger than the
                evidence.
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
              Separating prediction, association and causation
            </h2>

            <div className="mt-8 space-y-8 text-base leading-8 text-slate-700">
              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  1. Why this distinction is essential
                </h3>
                <p className="mt-3">
                  In health data science, the same dataset can tempt us into
                  three different interpretations. A model may predict who has
                  diabetes, describe which variables are associated with
                  diabetes, or be used as background evidence for a causal
                  question. These are not interchangeable aims.
                </p>
                <p className="mt-3">
                  The most common beginner mistake is to fit one model and then
                  interpret it as if it answers all three aims at once. A model
                  with strong test accuracy does not automatically explain the
                  disease process. A statistically significant coefficient does
                  not automatically estimate a causal effect. A causal claim
                  requires a causal question and a causal design.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  2. Three aims in one table
                </h3>

                <div className="mt-5 overflow-x-auto rounded-3xl border border-slate-200">
                  <table className="w-full min-w-[900px] border-collapse text-left text-sm">
                    <thead className="bg-slate-950 text-white">
                      <tr>
                        <th className="p-4">Aim</th>
                        <th className="p-4">Main question</th>
                        <th className="p-4">Main output</th>
                        <th className="p-4">Evidence needed</th>
                        <th className="p-4">Unsafe leap</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [
                          "Prediction",
                          "Can we estimate Y for a new patient?",
                          "Predicted risk or predicted class",
                          "Validation, discrimination, calibration, clinical usefulness",
                          "Good prediction proves cause",
                        ],
                        [
                          "Explanation",
                          "Which variables are associated with Y?",
                          "Coefficients, odds ratios, intervals, p-values",
                          "Model assumptions, uncertainty, sensitivity checks",
                          "Association is an intervention effect",
                        ],
                        [
                          "Causal thinking",
                          "What would happen to Y if we intervened on X?",
                          "Causal contrast, risk difference, causal odds ratio, treatment effect",
                          "Time order, confounder control, design, causal assumptions",
                          "A prediction coefficient is causal",
                        ],
                      ].map((row) => (
                        <tr key={row[0]} className="border-t border-slate-200">
                          <td className="p-4 font-black text-slate-950">
                            {row[0]}
                          </td>
                          <td className="p-4 text-slate-600">{row[1]}</td>
                          <td className="p-4 text-slate-600">{row[2]}</td>
                          <td className="p-4 text-slate-600">{row[3]}</td>
                          <td className="p-4 text-rose-700">{row[4]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  3. Prediction notation
                </h3>
                <p className="mt-3">
                  Let <span className="font-mono">Y</span> be the diabetes
                  outcome and <span className="font-mono">X</span> be a vector
                  of predictors such as glucose, BMI/mass and age. A prediction
                  model tries to learn a function that estimates the outcome for
                  new patients.
                </p>

                <FormulaBox>
                  Data: (X₁, Y₁), (X₂, Y₂), ..., (Xₙ, Yₙ)
                  <br />
                  Prediction rule: f̂(X) ≈ Y
                  <br />
                  Binary risk prediction: p̂(X) = P̂(Y = 1 | X)
                </FormulaBox>

                <p className="mt-4">
                  The key word is <strong>new</strong>. A prediction model must
                  be evaluated on patients not used to fit the model. That is
                  why test sets, cross-validation and external validation matter.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  4. Explanation and model coefficients
                </h3>
                <p className="mt-3">
                  In a logistic regression model, coefficients describe changes
                  in the log-odds of the outcome associated with predictors,
                  conditional on the variables in the model. For a simple
                  diabetes model:
                </p>

                <FormulaBox>
                  logit[P(Y = 1 | X)] = β₀ + β₁ glucose + β₂ mass + β₃ age
                  <br />
                  Odds ratio for glucose = exp(β₁)
                </FormulaBox>

                <p className="mt-4">
                  If <span className="font-mono">β₁</span> is positive, the
                  safe interpretation is that higher glucose is associated with
                  higher modelled odds of diabetes status, conditional on mass
                  and age. This does not automatically mean that intervening on
                  glucose would change the outcome by that coefficient.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  5. Causal thinking and counterfactual language
                </h3>
                <p className="mt-3">
                  A causal question asks what would happen under a hypothetical
                  intervention. For example, it does not merely ask whether BMI
                  is associated with diabetes. It asks whether a defined BMI
                  reduction intervention would change future diabetes risk.
                </p>

                <FormulaBox>
                  Association question: Is Y related to X in the observed data?
                  <br />
                  Causal question: What would Y have been if X had been set to x?
                  <br />
                  Causal contrast: E[Y(1) - Y(0)]
                </FormulaBox>

                <p className="mt-4">
                  The notation <span className="font-mono">Y(1)</span> and
                  <span className="font-mono"> Y(0)</span> represents potential
                  outcomes under two intervention states. This is a different
                  scientific object from a prediction probability
                  <span className="font-mono"> p̂(X)</span>.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  6. Confounding
                </h3>
                <p className="mt-3">
                  Confounding occurs when another variable influences both the
                  exposure and the outcome. For example, lifestyle, diet,
                  medication use, socioeconomic conditions or genetic
                  predisposition may affect both BMI and diabetes risk. If these
                  are not handled properly, the association between BMI and
                  diabetes may not represent a causal effect.
                </p>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <TopicCard title="Exposure">
                    The variable or intervention being discussed, such as
                    BMI/mass or glucose.
                  </TopicCard>
                  <TopicCard title="Outcome">
                    The endpoint of interest, such as diabetes status or future
                    diabetes incidence.
                  </TopicCard>
                  <TopicCard title="Confounder">
                    A pre-exposure factor related to both the exposure and the
                    outcome.
                  </TopicCard>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  7. Why predictive variables may not be causal
                </h3>
                <p className="mt-3">
                  A variable can be predictive for several reasons. It may be a
                  biological marker, a proxy for healthcare access, a proxy for
                  disease severity, a measurement recorded after the outcome, or
                  a pattern that exists only in one dataset. Prediction models
                  are allowed to use associations if they improve future
                  performance, but causal interpretation requires more.
                </p>

                <div className="mt-5 overflow-x-auto rounded-3xl border border-slate-200">
                  <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                    <thead className="bg-slate-950 text-white">
                      <tr>
                        <th className="p-4">Variable type</th>
                        <th className="p-4">May predict?</th>
                        <th className="p-4">Automatically causal?</th>
                        <th className="p-4">Example warning</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [
                          "Biomarker",
                          "Yes",
                          "No",
                          "May reflect disease process but still needs causal evidence.",
                        ],
                        [
                          "Proxy variable",
                          "Yes",
                          "No",
                          "May capture access, behaviour or historical practice.",
                        ],
                        [
                          "Future measurement",
                          "Yes, but invalid",
                          "No",
                          "This is leakage if unavailable at prediction time.",
                        ],
                        [
                          "Treatment decision",
                          "Yes",
                          "No",
                          "May reflect clinician judgement and disease severity.",
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
                  8. Visual interpretation
                </h3>
                <p className="mt-3">
                  The figures below support interpretation. They are useful for
                  teaching, but each figure must be interpreted according to the
                  correct scientific aim.
                </p>

                <div className="mt-5 grid gap-6">
                  {[
                    {
                      title: "Glucose distribution by diabetes status",
                      src: "/ml-biostatistics/figures/module-1/lesson-1-2-glucose-density.png",
                      alt: "Density plot showing glucose distribution for diabetes negative and positive groups.",
                      note: "The positive group tends to have higher glucose, but the groups overlap. This suggests predictive information and association, not automatic causal proof.",
                    },
                    {
                      title: "Predicted risk by observed diabetes status",
                      src: "/ml-biostatistics/figures/module-1/lesson-1-2-predicted-risk-boxplot.png",
                      alt: "Boxplot showing predicted diabetes risk by observed diabetes status.",
                      note: "The model gives higher risks to many positive patients, but probability separation is a prediction concept, not an intervention effect.",
                    },
                    {
                      title: "Prediction, explanation and causal thinking",
                      src: "/ml-biostatistics/figures/module-1/lesson-1-2-three-questions.png",
                      alt: "Diagram comparing prediction, explanation and causal thinking.",
                      note: "The same dataset can support different questions, but each question requires different evidence and different reporting language.",
                    },
                  ].map((figure) => (
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
                        {figure.note}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
                  9. Safe language checklist
                </h3>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <TopicCard title="Use this for prediction">
                    “The model predicted”, “estimated risk”, “classified”,
                    “showed test-set performance”, “requires validation”.
                  </TopicCard>
                  <TopicCard title="Use this for explanation">
                    “Was associated with”, “conditional on the fitted model”,
                    “coefficient”, “odds ratio”, “uncertainty”.
                  </TopicCard>
                  <TopicCard title="Use this only with causal design">
                    “Caused”, “effect of”, “if we intervened”, “reduced risk by”,
                    “counterfactual”, “treatment effect”.
                  </TopicCard>
                  <TopicCard title="Avoid this overclaim">
                    “The ML model proves that X causes Y.” This is almost never
                    justified from prediction modelling alone.
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
              Practise interpretation before reading the model output
            </h2>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-2xl font-black text-slate-950">
                  Lab 1: classify the scientific aim
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  Select the question type. The feedback shows what evidence is
                  needed and what would be unsafe to claim.
                </p>

                <div className="mt-5 grid gap-3">
                  {questionExamples.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setQuestionChoice(item.id)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
                        questionChoice === item.id
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
                    {selectedQuestion.question}
                  </p>
                  <div className="mt-4 grid gap-3">
                    <p>
                      <strong>Correct aim:</strong> {selectedQuestion.correctAim}
                    </p>
                    <p>
                      <strong>Evidence:</strong> {selectedQuestion.evidence}
                    </p>
                    <p className="text-rose-700">
                      <strong>Unsafe claim:</strong>{" "}
                      {selectedQuestion.unsafeClaim}
                    </p>
                    <p className="text-emerald-700">
                      <strong>Safe claim:</strong> {selectedQuestion.safeClaim}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-2xl font-black text-slate-950">
                  Lab 2: coefficient interpretation
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  Choose a coefficient and practise the safe interpretation.
                  The aim is to avoid converting association into causation.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    ["glucose", "Glucose"],
                    ["mass", "BMI/mass"],
                    ["age", "Age"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => setSelectedCoefficient(value)}
                      className={`rounded-2xl border px-4 py-3 text-sm font-black transition ${
                        selectedCoefficient === value
                          ? "border-slate-950 bg-slate-950 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-blue-50"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-white p-4">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-[#8b1116]">
                    Safe interpretation
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-700">
                    {coefficientExplanation}
                  </p>
                </div>

                <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-4">
                  <p className="text-sm font-black text-slate-950">
                    Do not write
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    “This coefficient proves that changing this variable will
                    cause diabetes risk to change.”
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-2xl font-black text-slate-950">
                Lab 3: threshold changes prediction, not causation
              </h3>
              <p className="mt-3 max-w-4xl text-base leading-7 text-slate-700">
                Move the threshold. The same predicted risks turn into different
                classifications. This is a decision rule for prediction; it does
                not change the causal relationship between any variable and the
                outcome.
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
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-700">
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
                <table className="w-full min-w-[860px] border-collapse text-left text-sm">
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
                  Lab 4: leakage and overclaim detector
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  Choose a scenario. The feedback tells you whether the problem
                  is valid prediction, association language, leakage or causal
                  overclaiming.
                </p>

                <div className="mt-5 grid gap-3">
                  {causalScenarios.map((scenario) => (
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
                    {selectedScenarioData.text}
                  </p>
                  <p className="mt-3">{selectedScenarioData.feedback}</p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-2xl font-black text-slate-950">
                  Lab 5: causal readiness checklist
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  Tick the elements available in your analysis. Prediction
                  validation is useful, but by itself it does not make a causal
                  claim ready.
                </p>

                <div className="mt-5 grid gap-3">
                  {[
                    ["timeOrder", "Correct time order is established"],
                    ["confounding", "Important confounders are measured and controlled"],
                    ["intervention", "The intervention is clearly defined"],
                    ["validation", "Prediction performance has been validated"],
                  ].map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() =>
                        toggleChecklist(key as keyof typeof causalChecklist)
                      }
                      className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
                        causalChecklist[key as keyof typeof causalChecklist]
                          ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-blue-50"
                      }`}
                    >
                      {causalChecklist[key as keyof typeof causalChecklist]
                        ? "✓ "
                        : "○ "}
                      {label}
                    </button>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-white p-4">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-[#8b1116]">
                    Readiness score
                  </p>
                  <p className="mt-2 text-3xl font-black text-slate-950">
                    {causalReadinessScore}/4
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {causalReadinessScore < 3
                      ? "Not enough for a causal claim. Use prediction or association language only."
                      : causalReadinessScore === 3
                      ? "Closer, but check whether the missing condition changes the interpretation."
                      : "The checklist is stronger, but causal conclusions still require careful design, assumptions and sensitivity analysis."}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-2xl font-black text-slate-950">
                Lab 6: assumptions behind causal language
              </h3>
              <p className="mt-3 max-w-4xl text-base leading-7 text-slate-700">
                These assumptions are not fully taught in this introductory
                lesson, but students should see that causal language requires
                more than a fitted model.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {assumptionCards.map((card) => (
                  <TopicCard key={card.title} title={card.title}>
                    {card.body}
                  </TopicCard>
                ))}
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
              Compare prediction output, association output and causal language
            </h2>

            <p className="mt-4 max-w-4xl text-base leading-7 text-slate-600">
              This browser lab loads the shared diabetes CSV, fits a prediction
              model on training data, fits an explanatory association model on
              the full teaching dataset, and prints safe interpretation
              reminders. The goal is not to treat R output as causal proof, but
              to learn how different outputs support different claims.
            </p>

            <WebRCodeRunner />

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-2xl font-black text-slate-950">
                How to interpret the output
              </h3>

              <div className="mt-5 space-y-4 text-base leading-7 text-slate-700">
                <p>
                  The first section prints dataset dimensions, variable names
                  and outcome counts. This confirms the structure of the data
                  before modelling.
                </p>
                <p>
                  The prediction section splits the data into training and test
                  sets. Performance metrics belong to the prediction aim: they
                  describe how well the fitted model classifies unseen test
                  observations at a chosen threshold.
                </p>
                <p>
                  The explanatory section fits a logistic regression model and
                  prints coefficients and odds ratios. These describe
                  conditional associations in the fitted model. They are not
                  automatically causal effects.
                </p>
                <p>
                  The final printed interpretation separates three questions:
                  prediction, explanation and causality. This is the central
                  reporting discipline for the lesson.
                </p>
              </div>

              <a
                href={withBasePath(
                  "/ml-biostatistics/r/module-1/lesson-1-2-prediction-explanation-causality.R"
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
              How to report prediction, explanation and causality correctly
            </h2>

            <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
              <p>
                The shared diabetes dataset can be used to introduce three
                different scientific aims. A prediction aim asks whether routine
                clinical variables can estimate diabetes status for new
                patients. An explanation aim asks whether variables such as
                glucose, BMI/mass and age are associated with diabetes status in
                the observed dataset. A causal aim asks what would happen under
                a defined intervention, such as a strategy to reduce BMI or
                improve glycaemic control.
              </p>

              <p>
                In a prediction workflow, the model should be fitted on training
                data and evaluated on unseen test data or through resampling and
                external validation. Performance measures such as sensitivity,
                specificity, calibration and discrimination support prediction
                claims. They do not by themselves prove causal effects.
              </p>

              <p>
                In an explanatory regression analysis, coefficients and odds
                ratios describe associations conditional on the fitted model.
                These quantities may be scientifically useful, but they must be
                interpreted with attention to model assumptions, measurement,
                uncertainty and possible confounding.
              </p>

              <p>
                A causal claim needs stronger design logic. The analyst must
                define the intervention, establish time order, identify and
                control confounders, consider selection bias and state the
                assumptions under which the causal contrast is interpretable.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <article className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
                <h3 className="text-2xl font-black text-slate-950">
                  Good report language
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  “Glucose, BMI/mass and age contained predictive information
                  for diabetes status in this dataset. The fitted model should
                  be interpreted as a prediction model. Coefficients describe
                  conditional associations and should not be treated as causal
                  effects without a causal design.”
                </p>
              </article>

              <article className="rounded-3xl border border-rose-200 bg-rose-50 p-6">
                <h3 className="text-2xl font-black text-slate-950">
                  Poor report language
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  “The machine learning model proves that BMI causes diabetes
                  because BMI is included in the model and improves accuracy.”
                  This incorrectly converts prediction and association into a
                  causal conclusion.
                </p>
              </article>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-950 p-6 text-white">
              <h3 className="text-2xl font-black">Example report paragraph</h3>
              <p className="mt-4 text-base leading-8 text-slate-300">
                In this teaching analysis, routinely measured clinical variables
                were considered for diabetes status modelling. The prediction
                aim was to estimate diabetes status for patients using variables
                available at the prediction time. Glucose, BMI/mass and age may
                contain useful predictive information, and their coefficients in
                a logistic model describe conditional associations with the
                outcome. However, these results should not be interpreted as
                evidence that changing any individual predictor would cause a
                change in diabetes risk. Causal interpretation would require a
                clearly defined intervention, correct temporal ordering,
                adjustment for confounders and explicit causal assumptions.
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
                  q: "What is the main aim of a prediction model?",
                  a: "To estimate an outcome, risk or class for new patients or samples using information available at the prediction time.",
                },
                {
                  q: "What is the main aim of an explanatory association model?",
                  a: "To describe how variables are associated with the outcome in the observed data, conditional on the fitted model and assumptions.",
                },
                {
                  q: "What is the main aim of a causal question?",
                  a: "To ask what would happen to an outcome under a defined intervention or exposure change.",
                },
                {
                  q: "A glucose coefficient is positive in a logistic regression model. What is the safe interpretation?",
                  a: "Higher glucose is associated with higher modelled log-odds of diabetes status, conditional on the other variables in the model. It is not automatically a causal effect.",
                },
                {
                  q: "Why does test-set accuracy not prove causality?",
                  a: "Accuracy measures predictive performance. It does not establish time order, define an intervention, remove confounding or estimate a counterfactual contrast.",
                },
                {
                  q: "What is leakage?",
                  a: "Leakage occurs when information unavailable at the prediction time, often future or post-outcome information, is used as a predictor. It can make performance look unrealistically strong.",
                },
                {
                  q: "Why might a proxy variable predict well without being causal?",
                  a: "A proxy may capture healthcare access, disease severity, clinical workflow or measurement patterns. It can help prediction without being an intervention target.",
                },
                {
                  q: "Give one example of safe report language for this lesson.",
                  a: "The variables contained predictive information and were associated with diabetes status in the fitted model, but the analysis does not prove causal effects.",
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
            Next, classify the types of learning problems.
          </h2>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-white/90 md:text-base md:leading-8">
            The next lesson introduces supervised, unsupervised and
            semi-supervised learning, and explains how the outcome structure
            determines the learning task.
          </p>

          <a
            href={withBasePath(
              "/courses/machine-learning-biostatistics/modules/foundations/lessons/types-of-learning"
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