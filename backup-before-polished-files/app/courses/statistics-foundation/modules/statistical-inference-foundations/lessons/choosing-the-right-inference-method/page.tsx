"use client";

import { useState } from "react";

const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}`;
}

type Tab =
  | "lecture"
  | "notes"
  | "interactive"
  | "examples"
  | "exercises"
  | "quiz";

const tabs: { id: Tab; label: string }[] = [
  { id: "lecture", label: "Lecture" },
  { id: "notes", label: "Detailed notes" },
  { id: "interactive", label: "Interactive lab" },
  { id: "examples", label: "Worked examples" },
  { id: "exercises", label: "Exercises" },
  { id: "quiz", label: "Quiz" },
];

const quizQuestions = [
  {
    question:
      "A study compares mean blood pressure between two independent treatment groups. Which method is most appropriate?",
    options: [
      "Paired t-test",
      "Two-sample t-test, often Welch's version",
      "One-sample proportion test",
      "Chi-square goodness-of-fit test",
    ],
    answer: 1,
    explanation:
      "The outcome is quantitative and the groups are independent, so a two-sample t-test is appropriate. Welch's version is often safer when variances may differ.",
  },
  {
    question:
      "A study measures the same patients before and after treatment. Which feature matters most?",
    options: [
      "The data are paired",
      "The groups are independent",
      "The outcome must be binary",
      "The sample size must be exactly equal to 100",
    ],
    answer: 0,
    explanation:
      "Before-after measurements on the same individuals are paired. The analysis should use within-person differences.",
  },
  {
    question:
      "A study compares disease status between smokers and non-smokers. Both variables are categorical. Which method is commonly used?",
    options: [
      "One-sample t-test",
      "Chi-square test of independence",
      "Paired t-test",
      "Confidence interval for one mean only",
    ],
    answer: 1,
    explanation:
      "Two categorical variables arranged in a contingency table commonly lead to a chi-square test of independence.",
  },
  {
    question:
      "Which question should usually come first when choosing an inference method?",
    options: [
      "What p-value do I want?",
      "What is the outcome type and study design?",
      "Which method gives significance?",
      "Which formula looks shortest?",
    ],
    answer: 1,
    explanation:
      "Method choice begins with the research question, outcome type, grouping structure, pairing and assumptions.",
  },
  {
    question:
      "Why is test selection not just a mechanical formula choice?",
    options: [
      "Because assumptions, design and interpretation matter",
      "Because all tests give the same answer",
      "Because p-values are always wrong",
      "Because sample size is irrelevant",
    ],
    answer: 0,
    explanation:
      "A statistical method is only appropriate when the design, outcome type, assumptions and interpretation match the research question.",
  },
];

function MathBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-center text-base leading-8 text-slate-900">
      <div className="font-serif">{children}</div>
    </div>
  );
}

function Fraction({
  numerator,
  denominator,
}: {
  numerator: React.ReactNode;
  denominator: React.ReactNode;
}) {
  return (
    <span className="inline-flex flex-col items-center justify-center align-middle leading-tight">
      <span className="border-b border-slate-900 px-2 pb-1">{numerator}</span>
      <span className="px-2 pt-1">{denominator}</span>
    </span>
  );
}

function DialogueLine({
  speaker,
  name,
  children,
  right = false,
}: {
  speaker: string;
  name: string;
  children: React.ReactNode;
  right?: boolean;
}) {
  return (
    <div className={`flex gap-3 ${right ? "flex-row-reverse" : ""}`}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-black text-blue-800">
        {speaker}
      </div>

      <div
        className={`max-w-[82%] rounded-2xl border p-4 ${
          right
            ? "border-blue-100 bg-blue-50"
            : "border-slate-200 bg-white"
        }`}
      >
        <p className="mb-1 text-xs font-black uppercase tracking-[0.16em] text-slate-400">
          {name}
        </p>
        <p className="text-sm leading-7 text-slate-700">{children}</p>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-3xl font-black tracking-tight text-slate-950">
        {title}
      </h2>
      <div className="mt-5 text-slate-700">{children}</div>
    </section>
  );
}

function MethodSelectorLab() {
  const [outcome, setOutcome] = useState("quantitative");
  const [design, setDesign] = useState("two-independent");
  const [sigmaKnown, setSigmaKnown] = useState("unknown");
  const [smallSparse, setSmallSparse] = useState("no");

  let method = "";
  let explanation = "";
  let warning = "";

  if (outcome === "quantitative" && design === "one-sample") {
    method =
      sigmaKnown === "known"
        ? "One-sample z-test or z confidence interval"
        : "One-sample t-test or t confidence interval";
    explanation =
      sigmaKnown === "known"
        ? "You are comparing one sample mean with a benchmark, and σ is treated as known."
        : "You are comparing one sample mean with a benchmark, and σ is unknown, so s and the t-distribution are usually used.";
    warning =
      "Check independence and whether the sampling distribution of the mean is approximately normal.";
  }

  if (outcome === "quantitative" && design === "paired") {
    method = "Paired t-test or confidence interval for mean difference";
    explanation =
      "The same units are measured twice or naturally matched. Analyse within-pair differences first.";
    warning =
      "Do not treat paired measurements as independent groups. Check the distribution of paired differences.";
  }

  if (outcome === "quantitative" && design === "two-independent") {
    method = "Two-sample t-test, often Welch's t-test";
    explanation =
      "The outcome is quantitative and the two groups are independent. Welch's method is often preferred because it does not require equal variances.";
    warning =
      "Check group independence, extreme outliers, approximate normality of group means and whether the comparison is meaningful.";
  }

  if (outcome === "binary" && design === "one-sample") {
    method = "One-sample proportion inference";
    explanation =
      "The outcome is success/failure and you are estimating or testing one population proportion.";
    warning =
      "Check that expected success and failure counts are not too small for normal approximation methods.";
  }

  if (outcome === "binary" && design === "two-independent") {
    method =
      smallSparse === "yes"
        ? "Consider Fisher's exact test or exact/binomial methods"
        : "Two-sample proportion test or confidence interval";
    explanation =
      smallSparse === "yes"
        ? "The data are binary across two independent groups, but sparse counts can make normal or chi-square approximations unreliable."
        : "The data are binary across two independent groups, so the focus is usually a difference, ratio or comparison of proportions.";
    warning =
      "Always report the estimated proportions and an effect size, not only a p-value.";
  }

  if (outcome === "categorical" && design === "one-sample") {
    method = "Chi-square goodness-of-fit test";
    explanation =
      "You have one categorical variable and want to compare observed category counts with expected category probabilities.";
    warning =
      "Use counts, not only percentages. Expected counts should not be too small.";
  }

  if (outcome === "categorical" && design === "two-independent") {
    method =
      smallSparse === "yes"
        ? "Fisher's exact test for sparse 2 × 2 tables, or exact alternatives"
        : "Chi-square test of independence";
    explanation =
      smallSparse === "yes"
        ? "Two categorical variables are being compared, but sparse cells may make the chi-square approximation poor."
        : "Two categorical variables are arranged in a contingency table, so the test asks whether they are associated.";
    warning =
      "A significant chi-square test does not automatically explain which cells drive the association.";
  }

  if (outcome === "ordinal" && design === "two-independent") {
    method = "Mann–Whitney U test or ordinal modelling";
    explanation =
      "The outcome is ordinal or heavily skewed and the groups are independent. Rank-based methods may be useful.";
    warning =
      "Do not automatically say this is a median test unless distributional shapes support that interpretation.";
  }

  if (outcome === "ordinal" && design === "paired") {
    method = "Wilcoxon signed-rank test";
    explanation =
      "The outcome is ordinal or non-normal, and the data are paired. The analysis focuses on signed within-pair differences.";
    warning =
      "The signed-rank test still has assumptions; it is not assumption-free.";
  }

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Inference method selector
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        Choose the outcome type and design. The lab recommends a suitable
        inference method and explains the reasoning.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label>
          <div className="mb-2 text-sm font-bold">Outcome type</div>
          <select
            value={outcome}
            onChange={(e) => setOutcome(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold"
          >
            <option value="quantitative">Quantitative</option>
            <option value="binary">Binary</option>
            <option value="categorical">Categorical with multiple categories</option>
            <option value="ordinal">Ordinal or heavily skewed</option>
          </select>
        </label>

        <label>
          <div className="mb-2 text-sm font-bold">Design</div>
          <select
            value={design}
            onChange={(e) => setDesign(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold"
          >
            <option value="one-sample">One sample or one group</option>
            <option value="paired">Paired or before-after</option>
            <option value="two-independent">Two independent groups / two variables</option>
          </select>
        </label>

        {outcome === "quantitative" && design === "one-sample" && (
          <label>
            <div className="mb-2 text-sm font-bold">Is population σ known?</div>
            <select
              value={sigmaKnown}
              onChange={(e) => setSigmaKnown(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold"
            >
              <option value="unknown">No, σ is unknown</option>
              <option value="known">Yes, σ is known</option>
            </select>
          </label>
        )}

        {(outcome === "binary" || outcome === "categorical") &&
          design === "two-independent" && (
            <label>
              <div className="mb-2 text-sm font-bold">Sparse expected counts?</div>
              <select
                value={smallSparse}
                onChange={(e) => setSmallSparse(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </label>
          )}
      </div>

      <div className="mt-6 rounded-2xl bg-blue-50 p-5">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-800">
          Recommended method
        </p>
        <p className="mt-2 text-3xl font-black text-blue-950">{method}</p>
        <p className="mt-3 text-sm leading-7 text-blue-950">{explanation}</p>
      </div>

      <div className="mt-4 rounded-2xl bg-amber-50 p-5">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-800">
          Assumption warning
        </p>
        <p className="mt-2 text-sm leading-7 text-amber-950">{warning}</p>
      </div>
    </div>
  );
}

function AssumptionChecklistLab() {
  const [independent, setIndependent] = useState("yes");
  const [measured, setMeasured] = useState("yes");
  const [outliers, setOutliers] = useState("no");
  const [planned, setPlanned] = useState("yes");
  const [missing, setMissing] = useState("low");

  const score =
    (independent === "yes" ? 1 : 0) +
    (measured === "yes" ? 1 : 0) +
    (outliers === "no" ? 1 : 0) +
    (planned === "yes" ? 1 : 0) +
    (missing === "low" ? 1 : 0);

  let status = "";
  let message = "";
  let style = "";

  if (score >= 5) {
    status = "Strong starting point";
    message =
      "The design looks reasonably aligned with standard inference, assuming the chosen method matches the research question.";
    style = "bg-emerald-50 text-emerald-950";
  } else if (score >= 3) {
    status = "Needs caution";
    message =
      "Some assumptions or design features need attention before trusting the inference.";
    style = "bg-amber-50 text-amber-950";
  } else {
    status = "High risk";
    message =
      "The analysis may be seriously misleading unless the design or method is improved.";
    style = "bg-red-50 text-red-950";
  }

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Assumption checklist lab
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        Inference is not only about choosing a named test. The method must match
        the assumptions and the design.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label>
          <div className="mb-2 text-sm font-bold">Independent observations?</div>
          <select
            value={independent}
            onChange={(e) => setIndependent(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold"
          >
            <option value="yes">Yes</option>
            <option value="no">No / clustered / repeated</option>
          </select>
        </label>

        <label>
          <div className="mb-2 text-sm font-bold">Outcome measured well?</div>
          <select
            value={measured}
            onChange={(e) => setMeasured(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold"
          >
            <option value="yes">Yes</option>
            <option value="no">No / noisy / biased</option>
          </select>
        </label>

        <label>
          <div className="mb-2 text-sm font-bold">Major outliers or skewness?</div>
          <select
            value={outliers}
            onChange={(e) => setOutliers(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold"
          >
            <option value="no">No major issue</option>
            <option value="yes">Yes, serious issue</option>
          </select>
        </label>

        <label>
          <div className="mb-2 text-sm font-bold">Analysis planned before results?</div>
          <select
            value={planned}
            onChange={(e) => setPlanned(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold"
          >
            <option value="yes">Yes</option>
            <option value="no">No, many tests tried</option>
          </select>
        </label>

        <label>
          <div className="mb-2 text-sm font-bold">Missing data level?</div>
          <select
            value={missing}
            onChange={(e) => setMissing(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold"
          >
            <option value="low">Low / handled clearly</option>
            <option value="high">High / unclear</option>
          </select>
        </label>
      </div>

      <div className={`mt-6 rounded-2xl p-5 ${style}`}>
        <p className="text-sm font-black uppercase tracking-[0.16em]">
          Checklist result
        </p>
        <p className="mt-2 text-3xl font-black">{status}</p>
        <p className="mt-3 text-sm leading-7">{message}</p>
      </div>
    </div>
  );
}

function ReportingBuilderLab() {
  const [estimate, setEstimate] = useState(4.2);
  const [lower, setLower] = useState(1.1);
  const [upper, setUpper] = useState(7.3);
  const [p, setP] = useState(0.008);
  const [context, setContext] = useState("mean difference");

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Reporting sentence builder
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        Build a responsible statistical reporting sentence that includes the
        estimate, confidence interval, p-value and interpretation.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-5">
        <label>
          <div className="mb-2 text-sm font-bold">Effect type</div>
          <select
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold"
          >
            <option value="mean difference">Mean difference</option>
            <option value="proportion difference">Proportion difference</option>
            <option value="risk difference">Risk difference</option>
            <option value="estimated association">Estimated association</option>
          </select>
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Estimate</span>
            <span>{estimate.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="-15"
            max="15"
            step="0.1"
            value={estimate}
            onChange={(e) => setEstimate(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>CI lower</span>
            <span>{lower.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="-20"
            max="20"
            step="0.1"
            value={lower}
            onChange={(e) => setLower(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>CI upper</span>
            <span>{upper.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="-20"
            max="20"
            step="0.1"
            value={upper}
            onChange={(e) => setUpper(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>p-value</span>
            <span>{p.toFixed(3)}</span>
          </div>
          <input
            type="range"
            min="0.001"
            max="0.2"
            step="0.001"
            value={p}
            onChange={(e) => setP(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>

      <div className="mt-6 rounded-2xl bg-blue-50 p-5">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-800">
          Better reporting sentence
        </p>
        <p className="mt-3 text-sm leading-7 text-blue-950">
          The estimated {context} was {estimate.toFixed(1)}, with a 95%
          confidence interval from {Math.min(lower, upper).toFixed(1)} to{" "}
          {Math.max(lower, upper).toFixed(1)} and p = {p.toFixed(3)}. This
          result should be interpreted in relation to the study design,
          assumptions, measurement quality and practical importance.
        </p>
      </div>
    </div>
  );
}

export default function ChoosingInferenceMethodLessonPage() {
  const [activeTab, setActiveTab] = useState<Tab>("lecture");
  const [selected, setSelected] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [checked, setChecked] = useState(false);

  const question = quizQuestions[currentQuestion];

  function checkAnswer() {
    if (selected === null) return;
    if (selected === question.answer) setScore((s) => s + 1);
    setChecked(true);
  }

  function nextQuestion() {
    setSelected(null);
    setChecked(false);
    setCurrentQuestion((q) => q + 1);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/statistical-inference-foundations"
              )}
              className="text-sm font-bold text-blue-700 hover:text-blue-900"
            >
              ← Back to Module 4
            </a>

            <p className="mt-5 text-sm font-black uppercase tracking-[0.22em] text-blue-700">
              Module 4 · Bonus Lesson 4.6
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:text-6xl">
              Choosing the Right Inference Method
            </h1>

            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600">
              Bring the whole inference module together. Learn how to choose an
              appropriate method from the research question, outcome type, study
              design, grouping structure, assumptions and reporting goal.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
              Capstone focus
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Decision-making · Assumptions · Test choice · Reporting
            </p>
          </div>
        </div>
      </header>

      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-black transition ${
                activeTab === tab.id
                  ? "bg-slate-950 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mx-auto max-w-5xl space-y-8 px-6 py-10">
        {activeTab === "lecture" && (
          <>
            <SectionCard title="Opening scene">
              <div className="space-y-4">
                <DialogueLine speaker="EM" name="Emma">
                  We have learned confidence intervals, hypothesis tests,
                  p-values, power and sample size. But when I see a real
                  problem, I still ask: which method should I use?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  That is exactly why this capstone lesson exists. Statistical
                  inference is not about memorising test names. It is about
                  matching a method to the research question, design and data.
                </DialogueLine>

                <DialogueLine speaker="OL" name="Oliver">
                  So the first step is not choosing between t-test and
                  chi-square?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Correct. The first step is understanding the outcome, the
                  comparison, the sampling design and the target parameter.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="The method-choice mindset">
              <p className="text-base leading-8 text-slate-700">
                A statistical method is not chosen because it is famous. It is
                chosen because it answers a particular scientific question under
                a particular design. The same data set can lead to different
                methods depending on the question being asked.
              </p>

              <MathBox>
                research question → estimand → outcome type → design → method
              </MathBox>

              <p className="text-base leading-8 text-slate-700">
                The estimand is the target quantity: a mean, a mean difference,
                a proportion, a proportion difference, an association, or a
                distributional difference.
              </p>
            </SectionCard>

            <SectionCard title="Step 1: identify the outcome type">
              <p className="text-base leading-8 text-slate-700">
                The outcome type strongly restricts the possible methods.
                Quantitative outcomes lead to mean-based methods. Binary
                outcomes lead to proportion-based methods. Categorical counts
                lead to chi-square or exact methods. Ordinal or heavily skewed
                data may lead to rank-based methods.
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="p-4">Outcome</th>
                      <th className="p-4">Typical target</th>
                      <th className="p-4">Possible methods</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-4 font-bold">Quantitative</td>
                      <td className="p-4">Mean or mean difference</td>
                      <td className="p-4">z-test, t-test, confidence interval</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold">Binary</td>
                      <td className="p-4">Proportion or risk difference</td>
                      <td className="p-4">Proportion test, proportion interval</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold">Categorical</td>
                      <td className="p-4">Association or fit of counts</td>
                      <td className="p-4">Chi-square, Fisher exact</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold">Ordinal/skewed</td>
                      <td className="p-4">Rank or distributional tendency</td>
                      <td className="p-4">Mann–Whitney, Wilcoxon, Kruskal–Wallis</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SectionCard>

            <SectionCard title="Step 2: identify the design">
              <p className="text-base leading-8 text-slate-700">
                Design determines whether observations are independent, paired,
                repeated, clustered or grouped. This matters because standard
                errors depend on the dependence structure.
              </p>

              <div className="space-y-4">
                <DialogueLine speaker="JA" name="James">
                  Why is pairing so important?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Because paired observations share information. A before-after
                  study should analyse within-person changes, not treat the two
                  measurements as independent groups.
                </DialogueLine>

                <DialogueLine speaker="SO" name="Sophia">
                  So the same two columns of numbers could require different
                  tests depending on whether they are paired?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Exactly. The structure of the data is part of the analysis.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="Step 3: choose the method">
              <p className="text-base leading-8 text-slate-700">
                Once the outcome and design are clear, method choice becomes
                more systematic.
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="p-4">Question</th>
                      <th className="p-4">Design</th>
                      <th className="p-4">Common method</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-4">Mean equals benchmark?</td>
                      <td className="p-4">One quantitative sample</td>
                      <td className="p-4">One-sample t-test or z-test if σ known</td>
                    </tr>
                    <tr>
                      <td className="p-4">Before-after mean change?</td>
                      <td className="p-4">Paired quantitative data</td>
                      <td className="p-4">Paired t-test</td>
                    </tr>
                    <tr>
                      <td className="p-4">Two independent means?</td>
                      <td className="p-4">Independent groups</td>
                      <td className="p-4">Welch two-sample t-test</td>
                    </tr>
                    <tr>
                      <td className="p-4">One proportion?</td>
                      <td className="p-4">Binary outcome, one group</td>
                      <td className="p-4">One-sample proportion inference</td>
                    </tr>
                    <tr>
                      <td className="p-4">Two proportions?</td>
                      <td className="p-4">Binary outcome, two groups</td>
                      <td className="p-4">Two-sample proportion inference</td>
                    </tr>
                    <tr>
                      <td className="p-4">Two categorical variables?</td>
                      <td className="p-4">Contingency table</td>
                      <td className="p-4">Chi-square test of independence</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SectionCard>

            <SectionCard title="Step 4: check assumptions">
              <p className="text-base leading-8 text-slate-700">
                A method can be mathematically correct but scientifically
                inappropriate if assumptions are badly violated. Assumptions
                include independence, correct pairing, sample size adequacy,
                measurement quality, missingness and design validity.
              </p>

              <div className="mt-5 rounded-2xl bg-amber-50 p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-800">
                  Important
                </p>
                <p className="mt-2 text-sm leading-7 text-amber-950">
                  Assumption checking is not a box-ticking exercise. It asks
                  whether the result will answer the research question honestly.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="Step 5: report the result responsibly">
              <p className="text-base leading-8 text-slate-700">
                A good inference report should include more than a p-value. It
                should include the estimate, confidence interval, method,
                p-value, assumptions and practical interpretation.
              </p>

              <MathBox>
                estimate + uncertainty + method + p-value + context
              </MathBox>

              <p className="text-base leading-8 text-slate-700">
                The goal is not simply to declare “significant” or “not
                significant”. The goal is to explain what the data suggest, how
                uncertain the result is and what limitations remain.
              </p>
            </SectionCard>
          </>
        )}

        {activeTab === "notes" && (
          <>
            <SectionCard title="1. The inference decision sequence">
              <p className="text-base leading-8">
                Choosing an inference method follows a sequence:
              </p>

              <MathBox>
                question → target parameter → outcome type → design → sampling
                distribution → method → interpretation
              </MathBox>

              <p className="text-base leading-8">
                Skipping the early steps leads to mechanical and often incorrect
                test selection.
              </p>
            </SectionCard>

            <SectionCard title="2. Parameter and estimand">
              <p className="text-base leading-8">
                The parameter is the population quantity. The estimand is the
                target quantity the study wants to learn about. Examples include:
              </p>

              <ul className="list-disc space-y-2 pl-6 text-base leading-8">
                <li>population mean μ,</li>
                <li>mean difference μ<sub>1</sub> − μ<sub>2</sub>,</li>
                <li>population proportion p,</li>
                <li>proportion difference p<sub>1</sub> − p<sub>2</sub>,</li>
                <li>association between categorical variables,</li>
                <li>distributional difference between groups.</li>
              </ul>
            </SectionCard>

            <SectionCard title="3. Quantitative outcome methods">
              <p className="text-base leading-8">
                For quantitative outcomes, many methods are based on the sample
                mean and its standard error.
              </p>

              <MathBox>
                test statistic ={" "}
                <Fraction
                  numerator={<span>estimate − null value</span>}
                  denominator={<span>standard error</span>}
                />
              </MathBox>

              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="p-4">Design</th>
                      <th className="p-4">Estimate</th>
                      <th className="p-4">Method</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-4">One sample</td>
                      <td className="p-4">x̄</td>
                      <td className="p-4">One-sample t-test or CI</td>
                    </tr>
                    <tr>
                      <td className="p-4">Paired</td>
                      <td className="p-4">mean difference d̄</td>
                      <td className="p-4">Paired t-test or CI</td>
                    </tr>
                    <tr>
                      <td className="p-4">Two independent groups</td>
                      <td className="p-4">x̄<sub>1</sub> − x̄<sub>2</sub></td>
                      <td className="p-4">Welch two-sample t-test or CI</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SectionCard>

            <SectionCard title="4. Binary and categorical outcome methods">
              <p className="text-base leading-8">
                Binary outcomes usually focus on proportions. Categorical
                outcomes with more than two categories often require count-based
                methods.
              </p>

              <MathBox>
                p̂ = x / n
                <br />
                SE(p̂) = √[p̂(1 − p̂) / n]
              </MathBox>

              <p className="text-base leading-8">
                For contingency tables, the chi-square statistic compares
                observed and expected counts:
              </p>

              <MathBox>
                χ<sup>2</sup> = ∑(O − E)<sup>2</sup> / E
              </MathBox>
            </SectionCard>

            <SectionCard title="5. Paired versus independent data">
              <p className="text-base leading-8">
                This is one of the most important design distinctions.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-blue-50 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-800">
                    Independent
                  </p>
                  <p className="mt-2 text-sm leading-7 text-blue-950">
                    Observations in one group do not naturally correspond to
                    observations in the other group.
                  </p>
                </div>

                <div className="rounded-2xl bg-emerald-50 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-800">
                    Paired
                  </p>
                  <p className="mt-2 text-sm leading-7 text-emerald-950">
                    Observations are linked, such as before-after measurements
                    on the same person.
                  </p>
                </div>
              </div>

              <MathBox>
                paired analysis uses D<sub>i</sub> = after<sub>i</sub> −
                before<sub>i</sub>
              </MathBox>
            </SectionCard>

            <SectionCard title="6. Assumptions checklist">
              <ul className="list-disc space-y-2 pl-6 text-base leading-8">
                <li>Are observations independent, paired, repeated or clustered?</li>
                <li>Is the outcome quantitative, binary, categorical or ordinal?</li>
                <li>Are sample sizes large enough for approximations?</li>
                <li>Are expected counts too small?</li>
                <li>Are there extreme outliers or severe skewness?</li>
                <li>Is the sampling strategy appropriate for the target population?</li>
                <li>Is missing data low or handled transparently?</li>
                <li>Was the analysis plan chosen before seeing results?</li>
              </ul>
            </SectionCard>

            <SectionCard title="7. Reporting framework">
              <p className="text-base leading-8">
                A strong report should include:
              </p>

              <ul className="list-disc space-y-2 pl-6 text-base leading-8">
                <li>the research question,</li>
                <li>the statistical method,</li>
                <li>the estimate or effect size,</li>
                <li>the confidence interval,</li>
                <li>the p-value if testing is used,</li>
                <li>the assumptions and limitations,</li>
                <li>the practical interpretation.</li>
              </ul>

              <div className="mt-5 rounded-2xl bg-red-50 p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-red-800">
                  Avoid
                </p>
                <p className="mt-2 text-sm leading-7 text-red-950">
                  Do not report only “significant” or “not significant”.
                  Statistical evidence should be interpreted with effect size,
                  uncertainty and design quality.
                </p>
              </div>
            </SectionCard>
          </>
        )}

        {activeTab === "interactive" && (
          <>
            <MethodSelectorLab />
            <AssumptionChecklistLab />
            <ReportingBuilderLab />
          </>
        )}

        {activeTab === "examples" && (
          <>
            <SectionCard title="Worked example 1: one sample mean">
              <p className="text-base leading-8">
                A researcher wants to test whether the mean score in a course
                differs from 70. The outcome is quantitative and there is one
                sample.
              </p>

              <MathBox>
                H<sub>0</sub>: μ = 70
                <br />
                H<sub>1</sub>: μ ≠ 70
              </MathBox>

              <p className="text-base leading-8">
                If σ is unknown, use a one-sample t-test or a t confidence
                interval for μ.
              </p>
            </SectionCard>

            <SectionCard title="Worked example 2: before-after data">
              <p className="text-base leading-8">
                Blood pressure is measured in the same patients before and after
                an intervention.
              </p>

              <MathBox>
                D<sub>i</sub> = after<sub>i</sub> − before<sub>i</sub>
              </MathBox>

              <p className="text-base leading-8">
                Analyse the differences using a paired t-test or confidence
                interval for the mean difference.
              </p>
            </SectionCard>

            <SectionCard title="Worked example 3: two independent means">
              <p className="text-base leading-8">
                Mean cholesterol is compared between a treatment group and a
                control group. The two groups contain different people.
              </p>

              <p className="text-base leading-8">
                The outcome is quantitative and the groups are independent. A
                two-sample t-test, often Welch's version, is appropriate.
              </p>
            </SectionCard>

            <SectionCard title="Worked example 4: two proportions">
              <p className="text-base leading-8">
                A study compares the proportion of patients who recover in two
                independent treatment groups.
              </p>

              <MathBox>
                p̂<sub>1</sub> − p̂<sub>2</sub>
              </MathBox>

              <p className="text-base leading-8">
                Use two-sample proportion inference, and report both proportions
                plus their difference or ratio with uncertainty.
              </p>
            </SectionCard>

            <SectionCard title="Worked example 5: categorical association">
              <p className="text-base leading-8">
                A study records smoking status and disease status. Both are
                categorical variables.
              </p>

              <p className="text-base leading-8">
                Arrange the data in a contingency table. If expected counts are
                adequate, a chi-square test of independence can assess
                association.
              </p>
            </SectionCard>
          </>
        )}

        {activeTab === "exercises" && (
          <SectionCard title="Exercises">
            <div className="space-y-5">
              {[
                {
                  title: "Exercise 1",
                  q: "A researcher compares the average sleep duration of one sample with a recommended value of 8 hours. Which method is appropriate?",
                  a: "The outcome is quantitative and there is one sample. Use a one-sample t-test or t confidence interval if σ is unknown.",
                },
                {
                  title: "Exercise 2",
                  q: "A study measures anxiety score before and after therapy in the same participants. Which method is appropriate?",
                  a: "The data are paired. Analyse within-person differences using a paired t-test or confidence interval for the mean difference.",
                },
                {
                  title: "Exercise 3",
                  q: "A study compares exam pass rates between two independent teaching methods. Which method is appropriate?",
                  a: "The outcome is binary and there are two independent groups. Use two-sample proportion inference.",
                },
                {
                  title: "Exercise 4",
                  q: "A study asks whether political preference is associated with age category. Which method may be used?",
                  a: "Both variables are categorical. A chi-square test of independence may be used if expected counts are adequate.",
                },
                {
                  title: "Exercise 5",
                  q: "Why should we avoid reporting only a p-value?",
                  a: "A p-value does not show effect size, precision, practical importance, assumptions or design quality. A better report includes estimate, confidence interval, method and context.",
                },
                {
                  title: "Exercise 6",
                  q: "Why is pairing important in statistical inference?",
                  a: "Paired observations are linked. Treating them as independent ignores the within-pair structure and can give the wrong standard error.",
                },
              ].map((exercise) => (
                <details
                  key={exercise.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <summary className="cursor-pointer text-lg font-black">
                    {exercise.title}
                  </summary>

                  <p className="mt-4 text-sm leading-7 text-slate-700">
                    {exercise.q}
                  </p>

                  <div className="mt-4 rounded-2xl bg-emerald-50 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-800">
                      Solution
                    </p>
                    <p className="mt-2 text-sm leading-7 text-emerald-950">
                      {exercise.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </SectionCard>
        )}

        {activeTab === "quiz" && (
          <SectionCard title="Lesson quiz">
            {currentQuestion < quizQuestions.length ? (
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </p>

                <h3 className="mt-4 text-2xl font-black leading-snug">
                  {question.question}
                </h3>

                <div className="mt-6 space-y-3">
                  {question.options.map((option, index) => {
                    const isSelected = selected === index;
                    const isCorrect = checked && index === question.answer;
                    const isWrong =
                      checked && isSelected && index !== question.answer;

                    return (
                      <button
                        key={option}
                        onClick={() => !checked && setSelected(index)}
                        className={`block w-full rounded-2xl border p-4 text-left text-sm font-bold transition ${
                          isCorrect
                            ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                            : isWrong
                            ? "border-red-300 bg-red-50 text-red-900"
                            : isSelected
                            ? "border-blue-300 bg-blue-50 text-blue-900"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {checked && (
                  <div className="mt-5 rounded-2xl bg-slate-100 p-5">
                    <p className="text-sm leading-7 text-slate-700">
                      {question.explanation}
                    </p>
                  </div>
                )}

                <div className="mt-6 flex gap-3">
                  {!checked ? (
                    <button
                      onClick={checkAnswer}
                      disabled={selected === null}
                      className="rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Check answer
                    </button>
                  ) : (
                    <button
                      onClick={nextQuestion}
                      className="rounded-full bg-blue-700 px-6 py-3 text-sm font-black text-white"
                    >
                      Next question
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">
                  Quiz complete
                </p>

                <p className="mt-4 text-4xl font-black md:text-6xl">
                  {score}/{quizQuestions.length}
                </p>

                <p className="mt-4 text-base leading-8 text-slate-600">
                  You have completed the Module 4 capstone. You are now ready to
                  move into modelling and regression with a strong inference
                  foundation.
                </p>

                <button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setScore(0);
                    setSelected(null);
                    setChecked(false);
                  }}
                  className="mt-6 rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white"
                >
                  Restart quiz
                </button>
              </div>
            )}
          </SectionCard>
        )}
      </div>
    </main>
  );
}