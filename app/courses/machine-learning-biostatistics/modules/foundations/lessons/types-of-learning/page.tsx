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

const rCode = `# Lesson 1.3 browser R lab
# Types of learning: supervised, unsupervised and semi-supervised

set.seed(2026)

n <- 240

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

cat("Browser R lab: Lesson 1.3\\n")
cat("Types of learning\\n")
cat("------------------------------------------\\n")
cat("Rows:", nrow(data), "\\n")
cat("Outcome table:\\n")
print(table(data$diabetes))

cat("\\nPART A: Supervised learning\\n")
cat("Here we use predictors X and known outcome labels Y.\\n")

train_id <- sample(seq_len(nrow(data)), size = 0.7 * nrow(data))
train_data <- data[train_id, ]
test_data <- data[-train_id, ]

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

cat("\\nSupervised confusion matrix:\\n")
print(table(
  Observed = test_data$diabetes_binary,
  Predicted = test_data$predicted_class
))

cat("\\nSupervised accuracy:\\n")
print(round(mean(test_data$diabetes_binary == test_data$predicted_class), 3))

cat("\\nPART B: Unsupervised learning\\n")
cat("Here we ignore the outcome label and search for structure in X.\\n")

x <- scale(data[, c("glucose", "mass", "age", "pressure")])

cluster_fit <- kmeans(x, centers = 3, nstart = 20)
data$cluster <- factor(cluster_fit$cluster)

cat("\\nCluster sizes:\\n")
print(table(data$cluster))

cat("\\nDiabetes status by cluster, checked only after clustering:\\n")
print(table(
  Cluster = data$cluster,
  Diabetes = data$diabetes
))

cat("\\nPART C: Semi-supervised learning\\n")
cat("Here only some records have labels available.\\n")

data$label_available <- ifelse(runif(nrow(data)) < 0.35, "labelled", "unlabelled")
data$observed_label <- ifelse(data$label_available == "labelled", data$diabetes, "unknown")

cat("\\nLabel availability:\\n")
print(table(data$label_available))

cat("\\nObserved labels:\\n")
print(table(data$observed_label))

cat("\\nFinal interpretation:\\n")
cat("Supervised learning uses known outcomes.\\n")
cat("Unsupervised learning finds structure without outcome labels.\\n")
cat("Semi-supervised learning uses some labelled and many unlabelled records.\\n")
cat("The learning type must match the clinical or scientific question.\\n")`;

export default function TypesOfLearningPage() {
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
            Module 1 · Lesson 1.3
          </p>

          <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-tight md:text-6xl">
            Types of learning: supervised, unsupervised and semi-supervised
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-slate-600 md:text-lg">
            Learn how machine learning problems are organised by the role of the
            outcome label. In biostatistics, this distinction determines whether
            we are predicting an outcome, discovering structure, or learning from
            partly labelled health records.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {[
              ["Dataset", "768 patients"],
              ["Outcome labels", "500 neg / 268 pos"],
              ["Learning types", "3"],
              ["Main idea", "Role of Y"],
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
              The same dataset, three different learning situations
            </h2>

            <p className="mt-4 text-base leading-8 text-slate-600">
              Scene: Prof Stat opens the shared diabetes dataset again. Curious
              Learner notices that sometimes the diabetes label is used,
              sometimes hidden, and sometimes only partly available. Dr Clinic
              wants to know which setting fits real hospital data. Leakage
              Monster is checking whether anyone is using labels incorrectly.
            </p>

            <div className="mt-8 space-y-5">
              {[
                {
                  initials: "CL",
                  name: "Curious Learner",
                  text: "In Lesson 1.1 and 1.2, we used diabetes status as the outcome. Is that always how machine learning works?",
                },
                {
                  initials: "PS",
                  name: "Prof Stat",
                  text: "No. Machine learning problems differ by how the outcome label is used. If the outcome is known and used for training, we call it supervised learning.",
                },
                {
                  initials: "DC",
                  name: "Dr Clinic",
                  text: "That sounds like clinical prediction. We know whether past patients had diabetes, and we use those labelled records to predict risk for future patients.",
                },
                {
                  initials: "PS",
                  name: "Prof Stat",
                  text: "Exactly. In supervised learning, the model sees examples of predictors and outcomes. It learns a mapping from X to Y.",
                },
                {
                  initials: "CL",
                  name: "Curious Learner",
                  text: "Then what is unsupervised learning?",
                },
                {
                  initials: "PS",
                  name: "Prof Stat",
                  text: "In unsupervised learning, the algorithm only sees the predictors. It does not use the outcome label while learning. It may search for clusters, patterns or lower-dimensional structure.",
                },
                {
                  initials: "DC",
                  name: "Dr Clinic",
                  text: "So we might discover patient subgroups using glucose, BMI, age and other measurements, then later ask whether those groups differ clinically.",
                },
                {
                  initials: "LM",
                  name: "Leakage Monster",
                  text: "But do not secretly use the diabetes label while pretending the analysis is unsupervised. That would be another way to mislead yourself.",
                },
                {
                  initials: "CL",
                  name: "Curious Learner",
                  text: "And semi-supervised learning is when some patients have labels and others do not?",
                },
                {
                  initials: "PS",
                  name: "Prof Stat",
                  text: "Correct. That happens often in health data. Labels may be expensive, delayed, incomplete or only available for a subset of patients.",
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
                Supervised learning uses known outcome labels. Unsupervised
                learning looks for structure without outcome labels.
                Semi-supervised learning sits between them, using some labelled
                records and many unlabelled records.
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
              Learning type depends on the role of the outcome label
            </h2>

            <div className="mt-6 max-w-4xl space-y-5 text-base leading-8 text-slate-700">
              <p>
                In biostatistical machine learning, we usually begin with a
                dataset containing predictors, often written as{" "}
                <strong>X</strong>. These may include glucose, BMI, age, blood
                pressure, insulin, family history, biomarkers or molecular
                measurements.
              </p>

              <p>
                Sometimes we also have an observed outcome, written as{" "}
                <strong>Y</strong>. In this course, the outcome is diabetes
                status. The learning type depends on whether <strong>Y</strong>{" "}
                is available and whether the algorithm is allowed to use it
                during learning.
              </p>

              <p>
                In <strong>supervised learning</strong>, both predictors and
                outcomes are available. The model learns from labelled examples.
                A diabetes risk prediction model is supervised because the
                training data include both patient measurements and known
                diabetes status.
              </p>

              <p>
                In <strong>unsupervised learning</strong>, the algorithm uses
                predictors but not the outcome label. The goal may be to discover
                subgroups, reduce dimensionality, detect unusual observations or
                visualise structure.
              </p>

              <p>
                In <strong>semi-supervised learning</strong>, only some records
                are labelled. This is common in medical data because labels may
                require expert review, long follow-up, expensive testing or
                linkage to another data source.
              </p>
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-950 text-white">
                  <tr>
                    <th className="p-4">Learning type</th>
                    <th className="p-4">Data used</th>
                    <th className="p-4">Typical question</th>
                    <th className="p-4">Biostatistical example</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Supervised",
                      "Predictors X and known outcome Y",
                      "Can we predict the outcome for a new patient?",
                      "Predict diabetes status from clinical measurements.",
                    ],
                    [
                      "Unsupervised",
                      "Predictors X only; outcome Y not used",
                      "Are there hidden groups or patterns?",
                      "Find patient clusters using glucose, BMI, age and insulin.",
                    ],
                    [
                      "Semi-supervised",
                      "Many X values, but Y observed for only some records",
                      "Can partial labels and unlabelled data support learning?",
                      "Use labelled diabetes records plus many unlabelled patient records.",
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
              Identify the learning type
            </h2>

            <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">
              Open each scenario and decide whether the problem is supervised,
              unsupervised or semi-supervised. Focus on whether the outcome
              label is used, ignored or partly available.
            </p>

            <div className="mt-8 space-y-4">
              {[
                {
                  scenario:
                    "A model is trained using patient measurements and known diabetes status to predict diabetes risk in future patients.",
                  answer: "Supervised learning",
                  reason:
                    "The model uses labelled examples: predictors X and known outcome Y.",
                },
                {
                  scenario:
                    "Researchers cluster patients using glucose, BMI, insulin and age, without using diabetes status during clustering.",
                  answer: "Unsupervised learning",
                  reason:
                    "The algorithm searches for structure in X without using the outcome label.",
                },
                {
                  scenario:
                    "A hospital has complete measurements for 10,000 patients, but diabetes labels for only 2,000 patients.",
                  answer: "Semi-supervised learning",
                  reason:
                    "Some records are labelled and many records are unlabelled.",
                },
                {
                  scenario:
                    "A team uses diabetes status to choose clusters, but then claims the clustering was unsupervised.",
                  answer: "Warning: not truly unsupervised",
                  reason:
                    "If the outcome label guides the grouping, the analysis is no longer purely unsupervised.",
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
          </section>
        )}

        {activeTab === "coding" && (
          <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
              R coding lab
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              Run supervised, unsupervised and semi-supervised examples
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
                  "/ml-biostatistics/r/module-1/lesson-1-3-types-of-learning.R"
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
              How to report Lesson 1.3 correctly
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                {
                  title: "Supervised result",
                  body: "The supervised logistic model used known diabetes labels and achieved accuracy 0.779, sensitivity 0.611 and specificity 0.855 on the test set.",
                },
                {
                  title: "Unsupervised result",
                  body: "K-means clustering created three patient clusters of sizes 225, 392 and 151 without using diabetes labels during learning.",
                },
                {
                  title: "Cluster interpretation",
                  body: "After clustering, diabetes status differed across clusters. Cluster 2 had a lower diabetes-positive percentage, while cluster 3 had a higher diabetes-positive percentage.",
                },
                {
                  title: "Semi-supervised result",
                  body: "The semi-supervised demonstration treated 277 records as labelled and 491 as unlabelled, mimicking a common health-data setting where labels are incomplete.",
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
                In this lesson, the shared diabetes dataset was used to
                demonstrate three learning settings. In the supervised setting,
                diabetes labels were used to train a prediction model, which
                achieved test accuracy of 0.779, sensitivity of 0.611 and
                specificity of 0.855. In the unsupervised setting, diabetes
                labels were ignored while k-means clustering identified three
                patient clusters. Diabetes status was then compared across
                clusters only after clustering. In the semi-supervised setting,
                only 277 records were treated as labelled and 491 as unlabelled,
                illustrating the common clinical situation where outcomes are
                only partly observed.
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
                  q: "A model uses known diabetes labels during training. What type of learning is this?",
                  a: "Supervised learning, because both predictors and outcome labels are used.",
                },
                {
                  q: "A clustering algorithm forms groups using glucose, BMI and age but does not use diabetes status. What type of learning is this?",
                  a: "Unsupervised learning, because the outcome label is not used during learning.",
                },
                {
                  q: "Why might semi-supervised learning be useful in medical data?",
                  a: "Because many patients may have predictor measurements, while only some have confirmed outcome labels.",
                },
                {
                  q: "Can unsupervised clusters be compared with diabetes status afterwards?",
                  a: "Yes. The label can be used after clustering for interpretation, but it should not guide the clustering if the analysis is truly unsupervised.",
                },
                {
                  q: "What is the main difference between the three learning types?",
                  a: "The main difference is how outcome labels are used: fully used, not used, or partly available.",
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
                Training, testing, overfitting and generalisation
              </h3>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
                Next, we learn why a model must be tested on unseen data and why
                excellent training performance can be misleading.
              </p>
              <a
                href={withBasePath(
                  "/courses/machine-learning-biostatistics/modules/foundations/lessons/training-testing-overfitting-generalisation"
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