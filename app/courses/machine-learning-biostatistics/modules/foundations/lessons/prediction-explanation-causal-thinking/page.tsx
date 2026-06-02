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
    title: "Glucose distribution by diabetes status",
    src: "/ml-biostatistics/figures/module-1/lesson-1-2-glucose-density.png",
    alt: "Density plot showing glucose distribution for diabetes negative and positive groups.",
    interpretation:
      "The diabetes-positive group is shifted towards higher glucose values. This makes glucose useful for prediction, but the plot alone does not prove that glucose is a causal intervention target.",
  },
  {
    title: "Predicted risk by observed diabetes status",
    src: "/ml-biostatistics/figures/module-1/lesson-1-2-predicted-risk-boxplot.png",
    alt: "Boxplot showing predicted diabetes risk by observed diabetes status.",
    interpretation:
      "The model assigns higher predicted risks to many diabetes-positive patients. This shows prediction separation, not proof that the predictors are causal effects.",
  },
  {
    title: "Prediction, explanation and causal thinking",
    src: "/ml-biostatistics/figures/module-1/lesson-1-2-three-questions.png",
    alt: "Diagram comparing prediction, explanation and causal thinking.",
    interpretation:
      "The same dataset can support different questions, but each question needs a different interpretation strategy.",
  },
];

const rCode = `# Lesson 1.2 browser R lab
# Prediction vs explanation vs causal thinking
# This browser-safe version uses a small teaching dataset.

set.seed(2026)

n <- 220

glucose <- rnorm(n, mean = 120, sd = 28)
mass <- rnorm(n, mean = 32, sd = 7)
age <- rnorm(n, mean = 34, sd = 11)

linear_predictor <- -8 + 0.035 * glucose + 0.07 * mass + 0.025 * age
risk <- 1 / (1 + exp(-linear_predictor))

diabetes_binary <- rbinom(n, size = 1, prob = risk)
diabetes <- ifelse(diabetes_binary == 1, "pos", "neg")

data <- data.frame(
  glucose = glucose,
  mass = mass,
  age = age,
  diabetes = diabetes,
  diabetes_binary = diabetes_binary
)

cat("Browser R lab: Lesson 1.2\\n")
cat("------------------------------------------\\n")
cat("Rows:", nrow(data), "\\n")
cat("Outcome table:\\n")
print(table(data$diabetes))

cat("\\nMean predictors by diabetes status:\\n")
print(aggregate(
  cbind(glucose, mass, age) ~ diabetes,
  data = data,
  FUN = mean
))

train_id <- sample(seq_len(nrow(data)), size = 0.7 * nrow(data))

train_data <- data[train_id, ]
test_data <- data[-train_id, ]

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

cat("\\nTest confusion matrix:\\n")
print(confusion_matrix)

accuracy <- mean(test_data$diabetes_binary == test_data$predicted_class)

cat("\\nAccuracy:", round(accuracy, 3), "\\n")

cat("\\nCoefficient table from the logistic model:\\n")
print(round(summary(prediction_model)$coefficients, 4))

cat("\\nInterpretation:\\n")
cat("This model predicts diabetes status using glucose, BMI/mass and age.\\n")
cat("The coefficients describe associations inside this prediction model.\\n")
cat("They should not automatically be interpreted as causal effects.\\n")
cat("Prediction asks whether the model estimates risk well for new patients.\\n")
cat("Causality asks what would happen under an intervention.\\n")`;

export default function PredictionExplanationCausalThinkingPage() {
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
            Module 1 · Lesson 1.2
          </p>

          <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-tight md:text-6xl">
            Prediction vs explanation vs causal thinking
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-slate-600 md:text-lg">
            Learn why a model that predicts well is not automatically an
            explanatory model, and why neither prediction nor association should
            be treated as causal proof without careful causal reasoning.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {[
              ["Dataset", "768 patients"],
              ["Outcome", "Diabetes status"],
              ["Model", "Logistic prediction"],
              ["Key warning", "Prediction ≠ causation"],
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
              The hospital data team asks three different questions
            </h2>

            <p className="mt-4 text-base leading-8 text-slate-600">
              Scene: Prof Stat is standing beside a screen showing the shared
              diabetes prediction dataset. Curious Learner is looking at the
              model output. Dr Clinic is thinking about patient decisions.
              Leakage Monster is hiding near the variable list.
            </p>

            <div className="mt-8 space-y-5">
              {[
                {
                  initials: "CL",
                  name: "Curious Learner",
                  text: "The model predicts diabetes using glucose, BMI and age. If glucose is important in the model, does that mean glucose causes diabetes?",
                },
                {
                  initials: "PS",
                  name: "Prof Stat",
                  text: "That is the first major trap. Prediction, explanation and causality are different questions. A prediction model asks whether we can estimate an outcome for a new patient. It does not automatically prove cause and effect.",
                },
                {
                  initials: "DC",
                  name: "Dr Clinic",
                  text: "In clinical work, that distinction matters. A model might identify high-risk patients, but treatment decisions need more than prediction. We need to know what action is safe, justified and likely to help.",
                },
                {
                  initials: "CL",
                  name: "Curious Learner",
                  text: "So when the model gives a high predicted probability, it is saying this patient looks high risk, not that one variable caused the outcome?",
                },
                {
                  initials: "PS",
                  name: "Prof Stat",
                  text: "Exactly. The model learns patterns. It may use biological signals, proxies, markers, historical patterns or measurement artefacts. Some predictors may be causal, but the prediction model alone does not prove that.",
                },
                {
                  initials: "LM",
                  name: "Leakage Monster",
                  text: "And if you accidentally include information from after diagnosis, your prediction can look amazing. But it is cheating. Future information makes me very powerful.",
                },
                {
                  initials: "DC",
                  name: "Dr Clinic",
                  text: "That is dangerous. If a model uses information unavailable at the time of decision, it may perform well in analysis but fail in real clinical use.",
                },
                {
                  initials: "PS",
                  name: "Prof Stat",
                  text: "Good machine learning in biostatistics begins by asking: Are we predicting, explaining association, or making a causal claim? The same dataset can be used in different ways, but the interpretation must match the question.",
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
                Prediction asks whether we can estimate an outcome for a new
                patient. Explanation asks which variables are associated with
                the outcome. Causal thinking asks what would happen if we
                intervened. These questions are related, but they are not the
                same.
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
              Three questions, three interpretations
            </h2>

            <div className="mt-6 max-w-4xl space-y-5 text-base leading-8 text-slate-700">
              <p>
                In machine learning for biostatistics, the same dataset may be
                used to answer different types of questions. A common mistake is
                to fit one model and then interpret it as if it answers every
                possible question.
              </p>

              <p>
                A <strong>prediction question</strong> asks whether we can
                estimate an outcome for a new patient, sample or setting. For
                example: can glucose, BMI and age predict diabetes status? The
                focus is performance on unseen data.
              </p>

              <p>
                An <strong>explanation question</strong> asks which variables
                are associated with the outcome in the observed data. For
                example: are glucose, BMI and age associated with diabetes
                status in this dataset? The focus is model coefficients,
                uncertainty and interpretation.
              </p>

              <p>
                A <strong>causal question</strong> asks what would happen under
                an intervention. For example: would reducing BMI reduce future
                diabetes risk? The focus is time order, confounding,
                intervention definition, design and causal assumptions.
              </p>
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-950 text-white">
                  <tr>
                    <th className="p-4">Question type</th>
                    <th className="p-4">Main question</th>
                    <th className="p-4">Main evidence</th>
                    <th className="p-4">Main danger</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Prediction",
                      "Can we estimate the outcome for a new patient?",
                      "Test performance, calibration, discrimination, validation",
                      "Assuming good prediction means causal understanding",
                    ],
                    [
                      "Explanation",
                      "Which variables are associated with the outcome?",
                      "Coefficients, odds ratios, confidence intervals, p-values",
                      "Forgetting model assumptions or confounding",
                    ],
                    [
                      "Causal thinking",
                      "What would happen if we intervened?",
                      "Design, time order, confounder control, causal assumptions",
                      "Treating association as intervention evidence",
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
              Classify the question before interpreting the model
            </h2>

            <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">
              Open each scenario and decide whether it is mainly a prediction,
              explanation or causal question. The purpose is to practise
              interpretation before looking at coefficients or model accuracy.
            </p>

            <div className="mt-8 space-y-4">
              {[
                {
                  scenario:
                    "A hospital wants to estimate which patients are likely to develop diabetes based on routine clinical measurements.",
                  answer: "Prediction",
                  reason:
                    "The goal is to estimate diabetes risk for new patients. The focus should be validation, calibration and usefulness.",
                },
                {
                  scenario:
                    "A researcher wants to describe whether glucose and BMI are statistically associated with diabetes status in this dataset.",
                  answer: "Explanation",
                  reason:
                    "The goal is to understand association patterns in the observed data. Coefficients may be useful, but they are not automatically causal.",
                },
                {
                  scenario:
                    "A public health team wants to know whether reducing BMI would reduce future diabetes risk.",
                  answer: "Causal thinking",
                  reason:
                    "This asks about an intervention. It needs time order, confounder control and causal assumptions.",
                },
                {
                  scenario:
                    "A model includes a variable measured after diabetes diagnosis and gives excellent prediction accuracy.",
                  answer: "Leakage warning",
                  reason:
                    "The variable is not available at the correct prediction time. The model may look strong but be invalid for real use.",
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
                      Best classification
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

            <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6">
              <h3 className="text-xl font-black text-slate-950">
                Interpretation rule
              </h3>
              <p className="mt-3 text-base leading-8 text-slate-700">
                Before interpreting any model output, ask: What question was the
                model built to answer? Prediction output should be interpreted
                as prediction output. Association output should be interpreted
                as association output. Causal claims need causal reasoning.
              </p>
            </div>
          </section>
        )}

        {activeTab === "coding" && (
          <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
              R coding lab
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              Run the idea directly in the browser
            </h2>

            <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">
              This browser lab uses a small teaching dataset so it runs quickly
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
                  "/ml-biostatistics/r/module-1/lesson-1-2-prediction-explanation-causality.R"
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
              How to report Lesson 1.2 correctly
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                {
                  title: "Dataset",
                  body: "The shared diabetes dataset contains 768 patients and 10 variables. The outcome is diabetes status, coded as negative or positive.",
                },
                {
                  title: "Descriptive pattern",
                  body: "The diabetes-positive group had higher average glucose, BMI/mass and age than the diabetes-negative group. This is an observed association pattern.",
                },
                {
                  title: "Prediction result",
                  body: "Using glucose, BMI/mass and age, the prediction model achieved accuracy 0.779, sensitivity 0.625 and specificity 0.849 on the test set.",
                },
                {
                  title: "Interpretation caution",
                  body: "The model estimates risk. The coefficients and predictions should not be interpreted as causal effects without a causal study design.",
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
                In the shared diabetes prediction dataset, diabetes-positive
                patients showed higher average glucose and BMI/mass than
                diabetes-negative patients. A logistic prediction model using
                glucose, BMI/mass and age achieved test accuracy of 0.779,
                sensitivity of 0.625 and specificity of 0.849. These results
                suggest that the selected variables contain predictive
                information for diabetes status. However, the model should not
                be interpreted causally. The coefficients describe associations
                within the fitted model, not the effect of intervening on
                glucose, BMI or age.
              </p>
            </div>

            <div className="mt-8 rounded-3xl border border-red-100 bg-red-50 p-6">
              <h3 className="text-xl font-black text-slate-950">
                What not to write
              </h3>
              <p className="mt-3 text-base leading-8 text-slate-700">
                Do not write: “Glucose causes diabetes because it is important
                in the model.” A variable can be predictive, associated and
                clinically meaningful without the fitted prediction model proving
                a causal effect.
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
                  q: "A model predicts diabetes risk for a new patient. What type of question is this?",
                  a: "Prediction. The goal is to estimate an outcome for a new individual or patient.",
                },
                {
                  q: "The glucose coefficient is large in a logistic regression model. Does that prove glucose causes diabetes?",
                  a: "No. The coefficient describes an association in the fitted model. Causal interpretation requires causal design and assumptions.",
                },
                {
                  q: "Why might a highly accurate medical model still be invalid?",
                  a: "It may use leaked information, fail on external patients, be poorly calibrated, or answer the wrong clinical question.",
                },
                {
                  q: "What does a causal question ask?",
                  a: "It asks what would happen under an intervention, such as whether reducing BMI would reduce future diabetes risk.",
                },
                {
                  q: "Why is prediction useful even when it is not causal?",
                  a: "Prediction can identify high-risk patients, support screening, guide monitoring and inform clinical workflow, provided the model is valid and useful.",
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
                Types of learning: supervised, unsupervised and semi-supervised
              </h3>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
                Next, we classify machine learning problems by the kind of data
                and learning signal available.
              </p>
              <a
                href={withBasePath(
                  "/courses/machine-learning-biostatistics/modules/foundations/lessons/types-of-learning"
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