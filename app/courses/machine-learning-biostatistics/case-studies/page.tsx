import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Machine Learning in Biostatistics Case Studies",
  description:
    "Applied case studies for the Machine Learning in Biostatistics course, covering diabetes risk prediction, supervised learning, validation, regularisation, ensembles, missing data, imbalance and responsible reporting.",
};

const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return "/";
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

const caseStudies = [
  {
    number: "01",
    module: "Module 1",
    title: "Diabetes risk prediction workflow",
    status: "Available now",
    open: true,
    href: "/courses/machine-learning-biostatistics/case-studies/diabetes-risk-prediction",
    summary:
      "A complete introductory case study showing how to define a clinical prediction question, check predictors, split data, fit a model, evaluate performance and report limitations.",
    focus: [
      "Prediction question",
      "Predictor timing",
      "Train/test split",
      "Model output",
      "Threshold trade-offs",
      "Responsible reporting",
    ],
  },
  {
    number: "02",
    module: "Module 2",
    title: "Clinical classification with supervised learning",
    status: "Locked until July 2026",
    open: false,
    href: "#join-waitlist",
    summary:
      "A supervised learning case study comparing logistic regression, k-nearest neighbours and decision trees for a clinical binary outcome.",
    focus: [
      "Supervised learning",
      "Logistic classification",
      "K-nearest neighbours",
      "Decision trees",
      "Model comparison",
      "Clinical interpretation",
    ],
  },
  {
    number: "03",
    module: "Module 3",
    title: "Model validation and calibration case study",
    status: "Locked until July 2026",
    open: false,
    href: "#join-waitlist",
    summary:
      "A validation-focused case study comparing apparent performance, test performance, calibration, decision thresholds and clinical usefulness.",
    focus: [
      "Discrimination",
      "Calibration",
      "Cross-validation",
      "Bootstrap validation",
      "Decision thresholds",
      "Performance reporting",
    ],
  },
  {
    number: "04",
    module: "Module 4",
    title: "Regularised and ensemble prediction models",
    status: "Locked until July 2026",
    open: false,
    href: "#join-waitlist",
    summary:
      "A model-comparison case study using penalised regression, random forests and boosting with careful validation and interpretation.",
    focus: [
      "Ridge regression",
      "Lasso",
      "Random forests",
      "Boosting",
      "Tuning",
      "Model comparison",
    ],
  },
  {
    number: "05",
    module: "Module 5",
    title: "Applied health-data modelling limitations",
    status: "Locked until July 2026",
    open: false,
    href: "#join-waitlist",
    summary:
      "A final applied case study focusing on missing data, imbalance, fairness, transparent reporting and model limitations.",
    focus: [
      "Missing data",
      "Class imbalance",
      "Fairness",
      "Limitations",
      "Reporting",
      "Responsible use",
    ],
  },
];

const snapshot = [
  ["5", "Case studies"],
  ["1", "Available now"],
  ["4", "Waitlisted"],
  ["July 2026", "Full release"],
];

const workflow = [
  {
    step: "1",
    title: "Question",
    body: "State the clinical prediction question, target population, outcome and intended use.",
  },
  {
    step: "2",
    title: "Data",
    body: "Check variables, predictor timing, missingness, outcome balance and leakage risk.",
  },
  {
    step: "3",
    title: "Model",
    body: "Fit a baseline model first, then compare alternatives only when the question justifies it.",
  },
  {
    step: "4",
    title: "Validate",
    body: "Evaluate model performance on data not used for fitting, using discrimination, calibration and threshold behaviour.",
  },
  {
    step: "5",
    title: "Interpret",
    body: "Translate R output into statistical and clinical meaning without turning prediction into causation.",
  },
  {
    step: "6",
    title: "Report",
    body: "Write a transparent conclusion with limitations, cautions and next steps.",
  },
];

const learningDesign = [
  "Applied health-data case studies linked to each module",
  "R workflow thinking rather than isolated code snippets",
  "Dataset summaries, model outputs and validation results",
  "Interpretation of confusion matrices, risk scores and thresholds",
  "Report-writing guidance from actual model output",
  "Caution around leakage, overfitting, imbalance and causal overclaiming",
];

const outcomes = [
  "Define applied clinical prediction problems clearly",
  "Connect modelling choices to predictor timing and outcome definition",
  "Interpret model results in clinical language",
  "Evaluate performance using more than one metric",
  "Recognise limitations in real health-data modelling",
  "Write responsible reports from R output",
];

export default function MachineLearningBiostatisticsCaseStudiesPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EA] px-4 py-8 text-[#141210] sm:px-5 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses/machine-learning-biostatistics")}
          className="text-sm font-black text-[#741018] transition hover:text-[#4d080e]"
        >
          ← Back to Machine Learning in Biostatistics
        </a>

        <section className="mt-6 overflow-hidden rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm md:mt-8 md:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 sm:p-6 md:p-10 lg:p-12">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm md:tracking-[0.22em]">
                Machine Learning in Biostatistics · Case studies
              </p>

              <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[1.03] tracking-[-0.055em] md:mt-5 md:text-7xl">
                Learn machine learning through applied health-data cases.
              </h1>

              <p className="mt-5 max-w-4xl text-base leading-8 text-[#525252] md:mt-6 md:text-lg md:leading-9">
                These case studies connect the course theory to realistic
                biostatistical workflows: clinical question, data structure,
                prediction target, R output, validation, interpretation,
                reporting and modelling cautions.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={withBasePath(
                    "/courses/machine-learning-biostatistics/case-studies/diabetes-risk-prediction"
                  )}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#11100E] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#741018] sm:w-auto md:py-4"
                >
                  Open available case study →
                </a>

                <a
                  href={withBasePath("#case-study-preview")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#D8CDBB] bg-[#FFFCF6] px-6 py-3.5 text-sm font-black text-[#141210] transition hover:bg-[#F7F3EA] sm:w-auto md:py-4"
                >
                  Preview case studies
                </a>

                <a
                  href={withBasePath("#join-waitlist")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#D8CDBB] bg-[#FFFCF6] px-6 py-3.5 text-sm font-black text-[#141210] transition hover:bg-[#F7F3EA] sm:w-auto md:py-4"
                >
                  Join waitlist
                </a>
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-[#741018]/20 bg-[#fff4ef] p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
                  Current access policy
                </p>
                <p className="mt-3 text-sm leading-7 text-[#525252]">
                  The diabetes risk prediction case study is available now. The
                  remaining case studies are opening in July 2026 while they
                  are being redesigned with R scripts, output interpretation,
                  validation summaries and report-style explanations.
                </p>
              </div>
            </div>

            <aside className="border-t border-[#E4DED2] bg-[#11100E] p-5 text-white md:p-8 lg:border-l lg:border-t-0">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50 md:text-sm">
                Case-study snapshot
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                A bridge from lessons to applied modelling reports.
              </h2>

              <div className="mt-7 grid grid-cols-2 gap-3">
                {snapshot.map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-[1.35rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-4"
                  >
                    <p className="text-3xl font-black tracking-[-0.06em]">
                      {value}
                    </p>
                    <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-white/50">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm leading-7 text-white/70">
                Best for learners who want to see how prediction modelling
                decisions are made, checked, interpreted and reported in
                realistic health-data workflows.
              </p>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:mt-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm">
              How to use case studies
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Read them like modelling reports.
            </h2>

            <div className="mt-6 grid gap-3">
              {learningDesign.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] px-4 py-3 text-sm font-bold text-[#525252]"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-[#E4DED2] bg-[#11100E] p-5 text-white shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/55 md:text-sm">
              By the end
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Students should connect code, output and reporting.
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {outcomes.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-[#FFFCF6]/[0.06] px-4 py-3 text-sm font-bold text-white/85"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm">
                Case-study workflow
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                From applied question to responsible conclusion.
              </h2>
            </div>

            <p className="text-sm leading-7 text-[#525252] md:text-base md:leading-8">
              Every case study follows the same applied loop: define the
              question, inspect data, fit the model, validate the output,
              interpret carefully and report limitations clearly.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {workflow.map((item) => (
              <article
                key={item.step}
                className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
              >
                <span className="rounded-full bg-[#11100E] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white">
                  Step {item.step}
                </span>

                <h3 className="mt-4 text-xl font-black tracking-[-0.04em]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#525252]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="case-study-preview"
          className="mt-6 rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10"
        >
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm">
                Case-study library
              </p>

              <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.045em] md:text-5xl">
                One case study is open. Four are waitlisted.
              </h2>
            </div>

            <p className="text-sm leading-7 text-[#525252] md:text-base md:leading-8">
              The open case study previews the final format. Planned case
              studies will be added as the course is redesigned module by module.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:mt-8">
            {caseStudies.map((caseStudy) => (
              <a
                key={caseStudy.number}
                href={withBasePath(caseStudy.href)}
                className={`group rounded-[1.5rem] border p-5 transition hover:-translate-y-1 hover:shadow-md md:rounded-[2rem] md:p-6 ${
                  caseStudy.open
                    ? "border-[#E4DED2] bg-[#F7F3EA] hover:bg-[#FFFCF6]"
                    : "border-[#741018]/20 bg-[#fff4ef] hover:bg-[#FFFCF6]"
                }`}
              >
                <div className="grid gap-5 lg:grid-cols-[0.18fr_1fr_0.22fr] lg:items-start">
                  <div>
                    <p
                      className={`text-5xl font-black tracking-[-0.06em] ${
                        caseStudy.open ? "text-[#141210]" : "text-[#741018]"
                      }`}
                    >
                      {caseStudy.number}
                    </p>
                    <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-[#7a7063]">
                      Case
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.14em] ${
                          caseStudy.open
                            ? "bg-[#11100E] text-white"
                            : "bg-[#741018] text-white"
                        }`}
                      >
                        {caseStudy.open ? "Open" : "Locked"}
                      </span>

                      <span className="rounded-full border border-[#E4DED2] bg-[#FFFCF6] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#5F5F5F]">
                        {caseStudy.module}
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-black tracking-[-0.04em]">
                      {caseStudy.title}
                    </h3>

                    <p className="mt-3 max-w-4xl text-sm leading-7 text-[#525252] md:text-base md:leading-8">
                      {caseStudy.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {caseStudy.focus.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[#E4DED2] bg-[#FFFCF6] px-3 py-1.5 text-xs font-bold text-[#5F5F5F]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:text-right">
                    <span
                      className={`inline-flex rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.14em] ${
                        caseStudy.open
                          ? "border-[#E4DED2] bg-[#FFFCF6] text-[#5F5F5F]"
                          : "border-[#741018]/20 bg-[#FFFCF6] text-[#741018]"
                      }`}
                    >
                      {caseStudy.status}
                    </span>

                    <p className="mt-5 text-sm font-black text-[#741018] transition group-hover:translate-x-1">
                      {caseStudy.open ? "Open case study →" : "Join waitlist →"}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section
          id="join-waitlist"
          className="mt-6 overflow-hidden rounded-[1.75rem] border border-[#E4DED2] bg-[#11100E] shadow-sm md:mt-8 md:rounded-[2.5rem]"
        >
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="p-5 text-white md:p-10">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50 md:text-sm">
                Join the waitlist
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Get access updates when the full case-study library opens in July 2026.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/75 md:text-base md:leading-8">
                Planned case studies are being redesigned with applied R
                scripts, validation outputs, visual interpretation, report
                sections and modelling cautions.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  "The diabetes risk case study stays open.",
                  "Four case studies remain opening in July 2026.",
                  "Case studies will follow the same output-to-report structure.",
                  "Waitlist visitors can request early access or release updates.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-white/10 bg-[#FFFCF6]/[0.07] px-4 py-3 text-sm font-bold text-white/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 bg-[#FFFCF6] p-5 md:p-8 lg:border-l lg:border-t-0">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018]">
                Waitlist form
              </p>

              <h3 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                Request access.
              </h3>

              <form
                action={withBasePath("/contact")}
                method="get"
                className="mt-6 grid gap-4"
              >
                <label className="grid gap-2">
                  <span className="text-sm font-black text-[#525252]">
                    Name
                  </span>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] px-4 py-3 text-sm font-bold text-[#141210] outline-none transition focus:border-[#741018] focus:bg-[#FFFCF6]"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-black text-[#525252]">
                    Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] px-4 py-3 text-sm font-bold text-[#141210] outline-none transition focus:border-[#741018] focus:bg-[#FFFCF6]"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-black text-[#525252]">
                    Interest
                  </span>
                  <select
                    name="interest"
                    defaultValue="Machine Learning in Biostatistics case studies waitlist"
                    className="rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] px-4 py-3 text-sm font-bold text-[#141210] outline-none transition focus:border-[#741018] focus:bg-[#FFFCF6]"
                  >
                    <option>
                      Machine Learning in Biostatistics case studies waitlist
                    </option>
                    <option>Early access</option>
                    <option>Private tutoring support</option>
                    <option>Full course release updates</option>
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-black text-[#525252]">
                    Message
                  </span>
                  <textarea
                    name="message"
                    rows={4}
                    defaultValue="I want to join the Machine Learning in Biostatistics case studies waitlist."
                    className="rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] px-4 py-3 text-sm font-bold text-[#141210] outline-none transition focus:border-[#741018] focus:bg-[#FFFCF6]"
                  />
                </label>

                <button
                  type="submit"
                  className="rounded-full bg-[#741018] px-6 py-4 text-sm font-black text-white transition hover:bg-[#4d080e]"
                >
                  Join waitlist →
                </button>

                <p className="text-xs leading-6 text-[#7a7063]">
                </p>
              </form>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-[#741018]/20 bg-[#fff4ef] p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm">
                Recommended start
              </p>

              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.045em] text-[#741018] md:text-5xl">
                Begin with the diabetes risk prediction case study.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#525252] md:text-base md:leading-8">
                This case study shows how a prediction question becomes a full
                modelling workflow with data checks, model output, validation
                interpretation and reporting cautions.
              </p>
            </div>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/case-studies/diabetes-risk-prediction"
              )}
              className="inline-flex w-full justify-center rounded-full bg-[#741018] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#4d080e] sm:w-auto md:py-4"
            >
              Open case study →
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}