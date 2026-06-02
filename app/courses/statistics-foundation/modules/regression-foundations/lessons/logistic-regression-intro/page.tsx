"use client";

import { useMemo, useState } from "react";

const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  return `${basePath}${href}/`;
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

const moduleLessons = [
  {
    number: "5.1",
    title: "Simple Linear Regression",
    href: "/courses/statistics-foundation/modules/regression-foundations/lessons/simple-linear-regression",
    active: false,
  },
  {
    number: "5.2",
    title: "Least Squares Derivation",
    href: "/courses/statistics-foundation/modules/regression-foundations/lessons/least-squares-derivation",
    active: false,
  },
  {
    number: "5.3",
    title: "Multiple Regression and Confounding",
    href: "/courses/statistics-foundation/modules/regression-foundations/lessons/multiple-regression-confounding",
    active: false,
  },
  {
    number: "5.4",
    title: "Model Assessment and Diagnostics",
    href: "/courses/statistics-foundation/modules/regression-foundations/lessons/model-assessment-diagnostics",
    active: false,
  },
  {
    number: "5.5",
    title: "Logistic Regression Introduction",
    href: "/courses/statistics-foundation/modules/regression-foundations/lessons/logistic-regression-intro",
    active: true,
  },
];

function MathBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-center font-serif text-lg text-slate-950">
      {children}
    </div>
  );
}

function InlineMath({ children }: { children: React.ReactNode }) {
  return <span className="font-serif text-slate-950">{children}</span>;
}

function Fraction({
  top,
  bottom,
}: {
  top: React.ReactNode;
  bottom: React.ReactNode;
}) {
  return (
    <span className="inline-flex flex-col items-center align-middle">
      <span className="border-b border-slate-900 px-2 pb-1">{top}</span>
      <span className="px-2 pt-1">{bottom}</span>
    </span>
  );
}

function Speaker({
  name,
  initials,
  tone,
  children,
  right = false,
}: {
  name: string;
  initials: string;
  tone: "blue" | "green" | "amber" | "purple" | "rose";
  children: React.ReactNode;
  right?: boolean;
}) {
  const tones = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-emerald-100 text-emerald-800",
    amber: "bg-amber-100 text-amber-800",
    purple: "bg-violet-100 text-violet-800",
    rose: "bg-rose-100 text-rose-800",
  };

  return (
    <div
      className={`my-4 flex items-start gap-3 ${
        right ? "flex-row-reverse" : ""
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-black ${tones[tone]}`}
      >
        {initials}
      </div>

      <div
        className={`max-w-3xl rounded-2xl border border-slate-200 px-5 py-4 shadow-sm ${
          right ? "bg-blue-50" : "bg-white"
        }`}
      >
        <p className="mb-1 text-xs font-black uppercase tracking-[0.18em] text-slate-400">
          {name}
        </p>
        <div className="text-sm leading-7 text-slate-700">{children}</div>
      </div>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      {eyebrow ? (
        <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
        {title}
      </h2>

      {children ? (
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          {children}
        </p>
      ) : null}
    </div>
  );
}

function ConceptCard({
  title,
  children,
  tone = "blue",
}: {
  title: string;
  children: React.ReactNode;
  tone?: "blue" | "amber" | "green" | "rose" | "purple";
}) {
  const tones = {
    blue: "border-blue-200 bg-blue-50",
    amber: "border-amber-200 bg-amber-50",
    green: "border-emerald-200 bg-emerald-50",
    rose: "border-rose-200 bg-rose-50",
    purple: "border-violet-200 bg-violet-50",
  };

  return (
    <div className={`my-6 rounded-2xl border p-5 ${tones[tone]}`}>
      <p className="text-sm font-black tracking-tight text-slate-950">
        {title}
      </p>
      <div className="mt-2 text-sm leading-7 text-slate-700">{children}</div>
    </div>
  );
}

function LogisticCurveLab() {
  const [intercept, setIntercept] = useState(-4);
  const [slope, setSlope] = useState(0.9);
  const [threshold, setThreshold] = useState(0.5);

  const points = useMemo(() => {
    return Array.from({ length: 81 }, (_, i) => {
      const x = i / 10;
      const eta = intercept + slope * x;
      const probability = 1 / (1 + Math.exp(-eta));
      const odds = probability / (1 - probability);
      return { x, eta, probability, odds };
    });
  }, [intercept, slope]);

  const selectedX = 5;
  const selectedEta = intercept + slope * selectedX;
  const selectedProbability = 1 / (1 + Math.exp(-selectedEta));
  const selectedOdds = selectedProbability / (1 - selectedProbability);
  const oddsRatio = Math.exp(slope);

  const width = 700;
  const height = 380;
  const pad = 54;

  const sx = (x: number) => pad + (x / 8) * (width - 2 * pad);
  const sy = (p: number) =>
    height - pad - p * (height - 2 * pad);

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${sx(p.x)} ${sy(p.probability)}`)
    .join(" ");

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
            Intercept
          </p>
          <p className="mt-1 text-2xl font-black text-slate-950">
            {intercept.toFixed(1)}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
            Slope
          </p>
          <p className="mt-1 text-2xl font-black text-slate-950">
            {slope.toFixed(1)}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
            Odds ratio
          </p>
          <p className="mt-1 text-2xl font-black text-slate-950">
            {oddsRatio.toFixed(2)}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
            Threshold
          </p>
          <p className="mt-1 text-2xl font-black text-slate-950">
            {threshold.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <span className="text-sm font-black text-slate-700">
            Intercept
          </span>
          <input
            type="range"
            min="-8"
            max="2"
            step="0.1"
            value={intercept}
            onChange={(e) => setIntercept(Number(e.target.value))}
            className="mt-4 w-full accent-blue-700"
          />
        </label>

        <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <span className="text-sm font-black text-slate-700">
            Slope
          </span>
          <input
            type="range"
            min="-1.5"
            max="2.5"
            step="0.1"
            value={slope}
            onChange={(e) => setSlope(Number(e.target.value))}
            className="mt-4 w-full accent-blue-700"
          />
        </label>

        <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <span className="text-sm font-black text-slate-700">
            Classification threshold
          </span>
          <input
            type="range"
            min="0.1"
            max="0.9"
            step="0.05"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="mt-4 w-full accent-blue-700"
          />
        </label>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mt-6 h-auto w-full rounded-2xl bg-slate-50"
      >
        <line
          x1={pad}
          y1={height - pad}
          x2={width - pad}
          y2={height - pad}
          stroke="#334155"
          strokeWidth="2"
        />

        <line
          x1={pad}
          y1={pad}
          x2={pad}
          y2={height - pad}
          stroke="#334155"
          strokeWidth="2"
        />

        {[0, 0.25, 0.5, 0.75, 1].map((p) => (
          <g key={p}>
            <line
              x1={pad - 6}
              y1={sy(p)}
              x2={width - pad}
              y2={sy(p)}
              stroke={p === threshold ? "#dc2626" : "#e2e8f0"}
              strokeWidth={p === threshold ? 2 : 1}
              strokeDasharray={p === threshold ? "7 5" : "none"}
            />
            <text
              x={pad - 12}
              y={sy(p) + 4}
              textAnchor="end"
              fontSize="12"
              fill="#64748b"
            >
              {p.toFixed(2)}
            </text>
          </g>
        ))}

        {[0, 2, 4, 6, 8].map((x) => (
          <g key={x}>
            <line
              x1={sx(x)}
              y1={height - pad}
              x2={sx(x)}
              y2={height - pad + 6}
              stroke="#334155"
            />
            <text
              x={sx(x)}
              y={height - pad + 24}
              textAnchor="middle"
              fontSize="12"
              fill="#64748b"
            >
              {x}
            </text>
          </g>
        ))}

        <path d={path} fill="none" stroke="#2563eb" strokeWidth="4" />

        <circle
          cx={sx(selectedX)}
          cy={sy(selectedProbability)}
          r="8"
          fill="#0f172a"
        />

        <line
          x1={sx(selectedX)}
          y1={sy(0)}
          x2={sx(selectedX)}
          y2={sy(selectedProbability)}
          stroke="#0f172a"
          strokeDasharray="6 5"
        />

        <line
          x1={sx(0)}
          y1={sy(selectedProbability)}
          x2={sx(selectedX)}
          y2={sy(selectedProbability)}
          stroke="#0f172a"
          strokeDasharray="6 5"
        />

        <text
          x={width / 2}
          y={height - 10}
          textAnchor="middle"
          fontSize="13"
          fill="#475569"
        >
          Predictor X
        </text>

        <text
          x="18"
          y={height / 2}
          textAnchor="middle"
          fontSize="13"
          fill="#475569"
          transform={`rotate(-90 18 ${height / 2})`}
        >
          Predicted probability
        </text>
      </svg>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">
            At X = 5
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-700">
            Log-odds = {selectedEta.toFixed(2)}
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
            Probability
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-700">
            p = {selectedProbability.toFixed(3)}
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">
            Classification
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-700">
            {selectedProbability >= threshold
              ? "Classified as event"
              : "Classified as no event"}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-600">
        The model predicts probabilities. A classification threshold is a
        separate decision rule. Changing the threshold does not change the
        model; it changes the decision made from the predicted probability.
      </p>
    </div>
  );
}

const quizQuestions = [
  {
    question: "What type of outcome is logistic regression mainly used for?",
    options: [
      "A binary outcome coded 0/1",
      "Only a normally distributed continuous outcome",
      "Only a count outcome",
      "Only an ordinal outcome with five categories",
    ],
    answer: 0,
    explanation:
      "Introductory logistic regression is usually used for binary outcomes coded as 0 for no event and 1 for event.",
  },
  {
    question: "For a binary outcome Y, what is E(Y | X)?",
    options: [
      "The variance of X",
      "The probability that Y = 1 given X",
      "The standard deviation of Y",
      "The sample size",
    ],
    answer: 1,
    explanation:
      "If Y is coded 0/1, then E(Y | X) = P(Y = 1 | X).",
  },
  {
    question: "What does logistic regression model as linear?",
    options: [
      "The probability itself",
      "The outcome value Y directly",
      "The log-odds of the event",
      "The residual sum of squares",
    ],
    answer: 2,
    explanation:
      "Logistic regression models log[p/(1 − p)] as a linear function of predictors.",
  },
  {
    question: "If a logistic coefficient is β₁, what is exp(β₁)?",
    options: [
      "The probability ratio",
      "The odds ratio for a one-unit increase in X",
      "The residual standard error",
      "The intercept",
    ],
    answer: 1,
    explanation:
      "Exponentiating a logistic regression coefficient gives an odds ratio.",
  },
  {
    question: "What is the difference between prediction and classification?",
    options: [
      "There is no difference",
      "Prediction gives a probability; classification applies a threshold to make a category decision",
      "Classification gives a probability; prediction gives an intercept",
      "Prediction only works for linear regression",
    ],
    answer: 1,
    explanation:
      "Logistic regression predicts probabilities. Turning probabilities into classes requires a threshold and context.",
  },
];

function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);

  const complete = current >= quizQuestions.length;

  if (complete) {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-700">
          Quiz complete
        </p>
        <p className="mt-4 text-6xl font-black text-slate-950">
          {score}/{quizQuestions.length}
        </p>
        <p className="mt-4 text-base leading-8 text-slate-600">
          This score reflects your understanding of binary outcomes, odds,
          log-odds, logistic curves, odds ratios and classification thresholds.
        </p>

        <button
          onClick={() => {
            setCurrent(0);
            setSelected(null);
            setChecked(false);
            setScore(0);
          }}
          className="mt-6 rounded-full bg-blue-700 px-6 py-3 text-sm font-black text-white hover:bg-blue-800"
        >
          Try again
        </button>
      </div>
    );
  }

  const q = quizQuestions[current];

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-400">
        Question {current + 1} of {quizQuestions.length}
      </p>

      <h3 className="mt-3 text-xl font-black tracking-tight text-slate-950">
        {q.question}
      </h3>

      <div className="mt-5 space-y-3">
        {q.options.map((option, index) => {
          const isCorrect = checked && index === q.answer;
          const isWrong = checked && selected === index && index !== q.answer;

          return (
            <button
              key={option}
              disabled={checked}
              onClick={() => setSelected(index)}
              className={`w-full rounded-2xl border px-5 py-4 text-left text-sm leading-7 transition ${
                selected === index
                  ? "border-blue-300 bg-blue-50 text-slate-950"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50"
              } ${isCorrect ? "border-emerald-300 bg-emerald-50" : ""} ${
                isWrong ? "border-rose-300 bg-rose-50" : ""
              }`}
            >
              <span className="mr-3 font-black">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
            </button>
          );
        })}
      </div>

      {checked ? (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700">
          <strong className="text-slate-950">Explanation: </strong>
          {q.explanation}
        </div>
      ) : null}

      <div className="mt-6 flex gap-3">
        {!checked ? (
          <button
            disabled={selected === null}
            onClick={() => {
              setChecked(true);
              if (selected === q.answer) setScore((s) => s + 1);
            }}
            className="rounded-full bg-blue-700 px-6 py-3 text-sm font-black text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Check answer
          </button>
        ) : (
          <button
            onClick={() => {
              setCurrent((c) => c + 1);
              setSelected(null);
              setChecked(false);
            }}
            className="rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white hover:bg-slate-800"
          >
            Next question
          </button>
        )}
      </div>
    </div>
  );
}

export default function LogisticRegressionIntroLessonPage() {
  const [tab, setTab] = useState<Tab>("lecture");
  const [openExercise, setOpenExercise] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="border-b border-slate-200 bg-white px-6 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <a
              href={withBasePath(
                "/courses/statistics-foundation/modules/regression-foundations"
              )}
              className="text-sm font-bold text-blue-700 hover:text-blue-900"
            >
              ← Back to Module 5
            </a>

            <p className="mt-4 text-sm font-black uppercase tracking-[0.2em] text-blue-700">
              Module 5 · Lesson 5.5
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">
              Logistic Regression Introduction
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              Learn how regression changes when the outcome is binary. This
              lesson introduces probability, odds, log-odds, the logistic
              function, odds ratios, likelihood, predicted probabilities,
              thresholds and basic model assessment.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-400">
              Lesson focus
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
              <li>Binary outcomes</li>
              <li>Probability, odds and log-odds</li>
              <li>Logistic curve</li>
              <li>Odds ratios</li>
              <li>Maximum likelihood</li>
              <li>Prediction versus classification</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-6">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto py-3">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`rounded-full px-5 py-2 text-sm font-black transition ${
                tab === item.id
                  ? "bg-blue-700 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-8 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              Module 5 lessons
            </p>

            <div className="mt-4 space-y-2">
              {moduleLessons.map((lesson) => (
                <a
                  key={lesson.number}
                  href={withBasePath(lesson.href)}
                  className={`block rounded-2xl px-4 py-3 text-sm leading-6 transition ${
                    lesson.active
                      ? "bg-blue-50 font-black text-blue-800"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="block text-xs font-black uppercase tracking-[0.16em]">
                    {lesson.number}
                  </span>
                  {lesson.title}
                </a>
              ))}
            </div>
          </div>
        </aside>

        <div>
          {tab === "lecture" && (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <SectionTitle
                eyebrow="Lecture"
                title="When the outcome is yes or no"
              >
                Linear regression models a numerical outcome. Logistic
                regression is introduced when the outcome is binary, such as
                disease present or absent.
              </SectionTitle>

              <div className="rounded-2xl bg-slate-50 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-slate-500">
                Scene: Mr. R’s classroom, final regression foundation lesson
              </div>

              <Speaker name="Emma" initials="EM" tone="green">
                Linear regression works when the outcome is numerical. But what
                if the outcome is yes or no, like disease present or absent?
              </Speaker>

              <Speaker name="Mr. R" initials="MR" tone="blue" right>
                Then ordinary linear regression is usually not appropriate. For
                binary outcomes, logistic regression is one of the standard
                models.
              </Speaker>

              <Speaker name="Oliver" initials="OL" tone="amber">
                Binary means the outcome can only take two values?
              </Speaker>

              <Speaker name="Mr. R" initials="MR" tone="blue" right>
                Exactly. We usually code the event as 1 and the non-event as 0.
              </Speaker>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                1. Binary outcomes
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                A binary outcome has two possible values:
              </p>

              <MathBox>
                Y<sub>i</sub> = 1 for event, and Y<sub>i</sub> = 0 for no event
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                For a binary variable, the conditional mean is a probability:
              </p>

              <MathBox>
                E(Y<sub>i</sub> | X<sub>i</sub>) = P(Y<sub>i</sub> = 1 | X
                <sub>i</sub>)
              </MathBox>

              <ConceptCard title="Key bridge from linear to logistic regression" tone="blue">
                Linear regression models the conditional mean of a numerical
                outcome. Logistic regression also models a conditional mean, but
                for a binary outcome that mean is a probability.
              </ConceptCard>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                2. Why ordinary linear regression is problematic
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                A linear probability model would write:
              </p>

              <MathBox>
                P(Y = 1 | X = x) = β<sub>0</sub> + β<sub>1</sub>x
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                But this can predict values below 0 or above 1, which cannot be
                probabilities.
              </p>

              <ConceptCard title="Problem" tone="rose">
                Probabilities must lie between 0 and 1. A straight line has no
                natural boundary, so it can produce impossible probability
                predictions.
              </ConceptCard>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                3. Probability, odds and log-odds
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                If the probability of an event is <InlineMath>p</InlineMath>,
                then the odds are:
              </p>

              <MathBox>
                odds = <Fraction top="p" bottom="1 − p" />
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                The log-odds, also called the logit, are:
              </p>

              <MathBox>
                logit(p) = log
                <span className="text-2xl">(</span>
                <Fraction top="p" bottom="1 − p" />
                <span className="text-2xl">)</span>
              </MathBox>

              <Speaker name="James" initials="JA" tone="purple">
                Why model log-odds instead of probability directly?
              </Speaker>

              <Speaker name="Mr. R" initials="MR" tone="blue" right>
                Because probabilities are restricted between 0 and 1, but
                log-odds can range from negative infinity to positive infinity.
                That makes them suitable for a linear predictor.
              </Speaker>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                4. The logistic regression model
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                With one predictor, logistic regression models:
              </p>

              <MathBox>
                log
                <span className="text-2xl">(</span>
                <Fraction
                  top={
                    <>
                      p<sub>i</sub>
                    </>
                  }
                  bottom={
                    <>
                      1 − p<sub>i</sub>
                    </>
                  }
                />
                <span className="text-2xl">)</span>
                = β<sub>0</sub> + β<sub>1</sub>x<sub>i</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                where:
              </p>

              <MathBox>
                p<sub>i</sub> = P(Y<sub>i</sub> = 1 | X<sub>i</sub> = x
                <sub>i</sub>)
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                Let:
              </p>

              <MathBox>
                η<sub>i</sub> = β<sub>0</sub> + β<sub>1</sub>x<sub>i</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                Solving for the probability gives the logistic function:
              </p>

              <MathBox>
                p<sub>i</sub> ={" "}
                <Fraction
                  top={
                    <>
                      e<sup>ηᵢ</sup>
                    </>
                  }
                  bottom={
                    <>
                      1 + e<sup>ηᵢ</sup>
                    </>
                  }
                />{" "}
                ={" "}
                <Fraction
                  top="1"
                  bottom={
                    <>
                      1 + e<sup>−ηᵢ</sup>
                    </>
                  }
                />
              </MathBox>

              <ConceptCard title="Why the logistic function is useful" tone="green">
                No matter how large or small the linear predictor becomes, the
                logistic function keeps predicted probabilities between 0 and 1.
              </ConceptCard>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                5. Interpreting the coefficient
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                The coefficient{" "}
                <InlineMath>
                  β<sub>1</sub>
                </InlineMath>{" "}
                is a change in log-odds for a one-unit increase in{" "}
                <InlineMath>X</InlineMath>.
              </p>

              <MathBox>
                β<sub>1</sub> = change in log-odds per one-unit increase in X
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                Exponentiating the coefficient gives an odds ratio:
              </p>

              <MathBox>
                OR = e<sup>β₁</sup>
              </MathBox>

              <Speaker name="Sophia" initials="SO" tone="rose">
                If the odds ratio is 1.5, does that mean the probability is 1.5
                times higher?
              </Speaker>

              <Speaker name="Mr. R" initials="MR" tone="blue" right>
                No. It means the odds are multiplied by 1.5, not the
                probability. Odds ratios and probability ratios are not the same.
              </Speaker>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                6. Maximum likelihood, not least squares
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Linear regression is usually fit by least squares. Logistic
                regression is usually fit by maximum likelihood. The likelihood
                for independent binary observations is:
              </p>

              <MathBox>
                L(β) = Π p<sub>i</sub>
                <sup>yᵢ</sup>(1 − p<sub>i</sub>)
                <sup>1 − yᵢ</sup>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                The model chooses coefficients that make the observed pattern of
                zeros and ones most plausible under the model.
              </p>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                7. Prediction versus classification
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Logistic regression predicts probabilities. Classification is a
                separate decision step. For example, we might classify someone
                as positive if their predicted probability is greater than 0.5.
              </p>

              <ConceptCard title="Important distinction" tone="amber">
                A predicted probability of 0.72 is not itself a class. It is an
                estimated risk. Turning it into a decision requires a threshold,
                and that threshold depends on context.
              </ConceptCard>
            </section>
          )}

          {tab === "notes" && (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <SectionTitle
                eyebrow="Detailed notes"
                title="The mathematics of introductory logistic regression"
              >
                These notes derive the logistic function, odds ratio
                interpretation and likelihood structure.
              </SectionTitle>

              <h3 className="text-2xl font-black tracking-tight">
                1. Binary outcome and conditional mean
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Let:
              </p>

              <MathBox>
                Y<sub>i</sub> ∈ {"{0, 1}"}
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                If{" "}
                <InlineMath>
                  p<sub>i</sub> = P(Y<sub>i</sub> = 1 | X<sub>i</sub>)
                </InlineMath>
                , then:
              </p>

              <MathBox>
                E(Y<sub>i</sub> | X<sub>i</sub>) = 1 × p<sub>i</sub> + 0 × (1
                − p<sub>i</sub>) = p<sub>i</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                Therefore, modelling the conditional mean of a binary outcome is
                the same as modelling the probability of the event.
              </p>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                2. Odds and logit transformation
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                The odds of an event are:
              </p>

              <MathBox>
                odds = <Fraction top="p" bottom="1 − p" />
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                The logit transformation is:
              </p>

              <MathBox>
                logit(p) = log
                <span className="text-2xl">(</span>
                <Fraction top="p" bottom="1 − p" />
                <span className="text-2xl">)</span>
              </MathBox>

              <ConceptCard title="Scale transformation" tone="blue">
                Probability lies between 0 and 1. Odds lie between 0 and
                infinity. Log-odds lie between negative infinity and positive
                infinity.
              </ConceptCard>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                3. Model equation
              </h3>

              <MathBox>
                logit(p<sub>i</sub>) = β<sub>0</sub> + β<sub>1</sub>X
                <sub>1i</sub> + ... + β<sub>k</sub>X<sub>ki</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                In a multiple logistic regression model, each coefficient is an
                adjusted log-odds coefficient.
              </p>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                4. Deriving the logistic function
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Let:
              </p>

              <MathBox>
                η<sub>i</sub> = β<sub>0</sub> + β<sub>1</sub>x<sub>i</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                The model says:
              </p>

              <MathBox>
                log
                <span className="text-2xl">(</span>
                <Fraction
                  top={
                    <>
                      p<sub>i</sub>
                    </>
                  }
                  bottom={
                    <>
                      1 − p<sub>i</sub>
                    </>
                  }
                />
                <span className="text-2xl">)</span>
                = η<sub>i</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                Exponentiate both sides:
              </p>

              <MathBox>
                <Fraction
                  top={
                    <>
                      p<sub>i</sub>
                    </>
                  }
                  bottom={
                    <>
                      1 − p<sub>i</sub>
                    </>
                  }
                />{" "}
                = e<sup>ηᵢ</sup>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                Solve for{" "}
                <InlineMath>
                  p<sub>i</sub>
                </InlineMath>
                :
              </p>

              <MathBox>
                p<sub>i</sub> = e<sup>ηᵢ</sup>(1 − p<sub>i</sub>)
              </MathBox>

              <MathBox>
                p<sub>i</sub> = e<sup>ηᵢ</sup> − e<sup>ηᵢ</sup>p
                <sub>i</sub>
              </MathBox>

              <MathBox>
                p<sub>i</sub>(1 + e<sup>ηᵢ</sup>) = e<sup>ηᵢ</sup>
              </MathBox>

              <MathBox>
                p<sub>i</sub> ={" "}
                <Fraction
                  top={
                    <>
                      e<sup>ηᵢ</sup>
                    </>
                  }
                  bottom={
                    <>
                      1 + e<sup>ηᵢ</sup>
                    </>
                  }
                />{" "}
                ={" "}
                <Fraction
                  top="1"
                  bottom={
                    <>
                      1 + e<sup>−ηᵢ</sup>
                    </>
                  }
                />
              </MathBox>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                5. Odds ratio derivation
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Suppose:
              </p>

              <MathBox>
                log-odds at X = x: β<sub>0</sub> + β<sub>1</sub>x
              </MathBox>

              <MathBox>
                log-odds at X = x + 1: β<sub>0</sub> + β<sub>1</sub>(x + 1)
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                The difference in log-odds is:
              </p>

              <MathBox>β<sub>1</sub></MathBox>

              <p className="text-base leading-8 text-slate-600">
                Therefore the ratio of odds is:
              </p>

              <MathBox>
                OR = e<sup>β₁</sup>
              </MathBox>

              <ConceptCard title="Interpretation" tone="green">
                If{" "}
                <InlineMath>
                  e<sup>β₁</sup> = 2
                </InlineMath>
                , then a one-unit increase in X multiplies the odds of the event
                by 2. It does not necessarily double the probability.
              </ConceptCard>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                6. Likelihood for binary data
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                If{" "}
                <InlineMath>
                  Y<sub>i</sub> = 1
                </InlineMath>
                , the contribution to the likelihood is{" "}
                <InlineMath>
                  p<sub>i</sub>
                </InlineMath>
                . If{" "}
                <InlineMath>
                  Y<sub>i</sub> = 0
                </InlineMath>
                , the contribution is{" "}
                <InlineMath>
                  1 − p<sub>i</sub>
                </InlineMath>
                .
              </p>

              <MathBox>
                L(β) = Π p<sub>i</sub>
                <sup>yᵢ</sup>(1 − p<sub>i</sub>)
                <sup>1 − yᵢ</sup>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                The log-likelihood is:
              </p>

              <MathBox>
                ℓ(β) = Σ[y<sub>i</sub>log(p<sub>i</sub>) + (1 − y
                <sub>i</sub>)log(1 − p<sub>i</sub>)]
              </MathBox>

              <ConceptCard title="Why not least squares?" tone="amber">
                Logistic regression is not usually fit by minimising squared
                residuals because the outcome is binary and the model describes
                probabilities. Maximum likelihood matches the probability model
                more naturally.
              </ConceptCard>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                7. Model assessment for logistic regression
              </h3>

              <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full border-collapse text-sm">
                  <thead className="bg-slate-50 text-left">
                    <tr>
                      <th className="border-b border-slate-200 px-4 py-3 font-black">
                        Concept
                      </th>
                      <th className="border-b border-slate-200 px-4 py-3 font-black">
                        Question
                      </th>
                      <th className="border-b border-slate-200 px-4 py-3 font-black">
                        Example tool
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-600">
                    <tr>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Calibration
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Are predicted probabilities accurate?
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Calibration plot
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Discrimination
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Can the model separate events from non-events?
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        ROC curve, AUC
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Classification
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        What decisions follow from probabilities?
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Threshold, confusion matrix
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Usefulness</td>
                      <td className="px-4 py-3">
                        Does the model help in context?
                      </td>
                      <td className="px-4 py-3">
                        Clinical or practical judgement
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {tab === "interactive" && (
            <section className="space-y-8">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <SectionTitle
                  eyebrow="Interactive lab"
                  title="Move the logistic curve"
                >
                  Adjust the intercept, slope and threshold. Notice how the
                  model predicts probabilities, while the threshold creates a
                  classification decision.
                </SectionTitle>

                <LogisticCurveLab />
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <h3 className="text-2xl font-black tracking-tight">
                  What to notice
                </h3>

                <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-8 text-slate-600">
                  <li>
                    The intercept shifts the curve left or right by changing
                    baseline log-odds.
                  </li>
                  <li>
                    The slope controls how quickly probability changes with X.
                  </li>
                  <li>
                    A positive slope gives an odds ratio greater than 1.
                  </li>
                  <li>
                    A negative slope gives an odds ratio less than 1.
                  </li>
                  <li>
                    Classification depends on the threshold, not only on the
                    model.
                  </li>
                </ul>
              </div>
            </section>
          )}

          {tab === "examples" && (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <SectionTitle
                eyebrow="Worked examples"
                title="Interpreting logistic regression"
              >
                These examples show how to move between probability, odds,
                log-odds and odds ratios.
              </SectionTitle>

              <div className="space-y-8">
                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
                    Example 1
                  </p>

                  <h3 className="mt-2 text-xl font-black">
                    Convert probability to odds
                  </h3>

                  <p className="mt-4 text-base leading-8 text-slate-600">
                    If the event probability is 0.75, then:
                  </p>

                  <MathBox>
                    odds = <Fraction top="0.75" bottom="1 − 0.75" /> ={" "}
                    <Fraction top="0.75" bottom="0.25" /> = 3
                  </MathBox>

                  <ConceptCard title="Interpretation" tone="green">
                    Odds of 3 mean the event is three times as likely to occur
                    as not occur.
                  </ConceptCard>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
                    Example 2
                  </p>

                  <h3 className="mt-2 text-xl font-black">
                    Convert log-odds to probability
                  </h3>

                  <p className="mt-4 text-base leading-8 text-slate-600">
                    Suppose:
                  </p>

                  <MathBox>η = −1.2</MathBox>

                  <p className="text-base leading-8 text-slate-600">
                    Then:
                  </p>

                  <MathBox>
                    p ={" "}
                    <Fraction
                      top="1"
                      bottom={
                        <>
                          1 + e<sup>−η</sup>
                        </>
                      }
                    />{" "}
                    ={" "}
                    <Fraction
                      top="1"
                      bottom={
                        <>
                          1 + e<sup>1.2</sup>
                        </>
                      }
                    />{" "}
                    ≈ 0.231
                  </MathBox>

                  <ConceptCard title="Interpretation" tone="blue">
                    A log-odds value of −1.2 corresponds to a predicted
                    probability of about 0.231.
                  </ConceptCard>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
                    Example 3
                  </p>

                  <h3 className="mt-2 text-xl font-black">
                    Interpret an odds ratio
                  </h3>

                  <p className="mt-4 text-base leading-8 text-slate-600">
                    Suppose a logistic regression coefficient is:
                  </p>

                  <MathBox>β<sub>1</sub> = 0.7</MathBox>

                  <p className="text-base leading-8 text-slate-600">
                    The odds ratio is:
                  </p>

                  <MathBox>
                    e<sup>0.7</sup> ≈ 2.01
                  </MathBox>

                  <ConceptCard title="Interpretation" tone="green">
                    For a one-unit increase in X, the odds of the event are
                    multiplied by about 2.01, holding other predictors fixed if
                    this is a multiple logistic regression model.
                  </ConceptCard>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
                    Example 4
                  </p>

                  <h3 className="mt-2 text-xl font-black">
                    Probability is not classification
                  </h3>

                  <p className="mt-4 text-base leading-8 text-slate-600">
                    Suppose a patient has predicted risk:
                  </p>

                  <MathBox>p = 0.42</MathBox>

                  <p className="text-base leading-8 text-slate-600">
                    If the classification threshold is 0.5, the patient is
                    classified as no event. If the threshold is 0.3, the same
                    patient is classified as event.
                  </p>

                  <ConceptCard title="Interpretation" tone="amber">
                    The model probability did not change. The decision changed
                    because the threshold changed.
                  </ConceptCard>
                </div>
              </div>
            </section>
          )}

          {tab === "exercises" && (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <SectionTitle
                eyebrow="Exercises"
                title="Practice logistic regression interpretation"
              >
                Try each question first, then open the answer.
              </SectionTitle>

              {[
                {
                  title: "Binary outcome",
                  question:
                    "A study models whether a patient is readmitted to hospital within 30 days. How could the outcome be coded for logistic regression?",
                  answer:
                    "It could be coded as Y = 1 if the patient is readmitted within 30 days and Y = 0 if the patient is not readmitted.",
                },
                {
                  title: "Odds from probability",
                  question:
                    "If p = 0.2, calculate the odds.",
                  answer:
                    "odds = p/(1 − p) = 0.2/0.8 = 0.25. The event odds are 0.25 to 1.",
                },
                {
                  title: "Probability from odds",
                  question:
                    "If the odds are 4, calculate the probability.",
                  answer:
                    "If odds = p/(1 − p) = 4, then p = odds/(1 + odds) = 4/5 = 0.8.",
                },
                {
                  title: "Odds ratio interpretation",
                  question:
                    "A logistic regression gives an odds ratio of 1.8 for smoking. Interpret it carefully.",
                  answer:
                    "The odds of the event are 1.8 times higher for smokers than non-smokers, or for a one-unit increase in the smoking variable, depending on coding. It does not mean the probability is 1.8 times higher.",
                },
                {
                  title: "Threshold decision",
                  question:
                    "A predicted probability is 0.35. What classification is made if the threshold is 0.5? What if the threshold is 0.3?",
                  answer:
                    "With threshold 0.5, classify as no event. With threshold 0.3, classify as event. The predicted probability is the same; only the decision threshold changes.",
                },
              ].map((exercise, index) => (
                <div
                  key={exercise.title}
                  className="my-4 overflow-hidden rounded-2xl border border-slate-200"
                >
                  <button
                    onClick={() =>
                      setOpenExercise(openExercise === index ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-4 bg-slate-50 px-5 py-4 text-left"
                  >
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
                        Exercise {index + 1}
                      </p>
                      <h3 className="mt-1 text-lg font-black text-slate-950">
                        {exercise.title}
                      </h3>
                    </div>

                    <span className="text-2xl font-black text-slate-400">
                      {openExercise === index ? "−" : "+"}
                    </span>
                  </button>

                  {openExercise === index ? (
                    <div className="px-5 py-5">
                      <p className="text-base leading-8 text-slate-600">
                        {exercise.question}
                      </p>

                      <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                        <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">
                          Answer
                        </p>
                        <p className="mt-2 text-sm leading-7 text-slate-700">
                          {exercise.answer}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </section>
          )}

          {tab === "quiz" && (
            <section>
              <SectionTitle eyebrow="Quiz" title="Check your understanding">
                This quiz focuses on binary outcomes, odds, log-odds, the
                logistic model, odds ratios and thresholds.
              </SectionTitle>

              <Quiz />
            </section>
          )}
        </div>
      </section>
    </main>
  );
}