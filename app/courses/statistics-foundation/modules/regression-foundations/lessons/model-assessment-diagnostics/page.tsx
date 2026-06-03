"use client";

import { useMemo, useState } from "react";

const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return "/";
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${cleanHref}${hasFileExtension ? "" : "/"}`;
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
    active: true,
  },
  {
    number: "5.5",
    title: "Logistic Regression Introduction",
    href: "/courses/statistics-foundation/modules/regression-foundations/lessons/logistic-regression-intro",
    active: false,
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
        <p className="mb-1 text-xs font-black uppercase tracking-[0.18em] text-slate-700">
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

type DiagnosticPattern = "good" | "curved" | "fan" | "outlier";

function DiagnosticLab() {
  const [pattern, setPattern] = useState<DiagnosticPattern>("good");

  const data = useMemo(() => {
    const xs = Array.from({ length: 18 }, (_, i) => 1 + i * 0.45);

    return xs.map((x, i) => {
      let y = 3 + 1.4 * x + Math.sin(i * 1.7) * 0.65;

      if (pattern === "curved") {
        y = 2 + 0.5 * x + 0.22 * x * x + Math.sin(i * 1.7) * 0.5;
      }

      if (pattern === "fan") {
        y = 3 + 1.4 * x + Math.sin(i * 1.7) * (0.25 + x * 0.22);
      }

      if (pattern === "outlier") {
        y = 3 + 1.4 * x + Math.sin(i * 1.7) * 0.55;
        if (i === 16) y += 5.5;
      }

      return { x, y };
    });
  }, [pattern]);

  const xBar = data.reduce((sum, p) => sum + p.x, 0) / data.length;
  const yBar = data.reduce((sum, p) => sum + p.y, 0) / data.length;

  const slope =
    data.reduce((sum, p) => sum + (p.x - xBar) * (p.y - yBar), 0) /
    data.reduce((sum, p) => sum + (p.x - xBar) ** 2, 0);

  const intercept = yBar - slope * xBar;

  const fitted = data.map((p) => ({
    ...p,
    yhat: intercept + slope * p.x,
    residual: p.y - (intercept + slope * p.x),
  }));

  const sse = fitted.reduce((sum, p) => sum + p.residual ** 2, 0);
  const sst = fitted.reduce((sum, p) => sum + (p.y - yBar) ** 2, 0);
  const r2 = 1 - sse / sst;
  const residualStandardError = Math.sqrt(sse / (data.length - 2));

  const width = 620;
  const height = 340;
  const pad = 48;

  const xMin = 0;
  const xMax = 9.2;
  const yMin = 0;
  const yMax = 22;

  const sx = (x: number) =>
    pad + ((x - xMin) / (xMax - xMin)) * (width - 2 * pad);
  const sy = (y: number) =>
    height - pad - ((y - yMin) / (yMax - yMin)) * (height - 2 * pad);

  const rMin = -6.5;
  const rMax = 6.5;
  const srY = (r: number) =>
    height - pad - ((r - rMin) / (rMax - rMin)) * (height - 2 * pad);

  const explanation = {
    good: "Residuals are roughly scattered around zero with no clear pattern. This is what we hope to see.",
    curved:
      "Residuals show a systematic curved pattern. This suggests the straight-line model is missing curvature.",
    fan: "Residuals spread out as fitted values increase. This suggests non-constant variance, also called heteroscedasticity.",
    outlier:
      "One point has an unusually large residual and may deserve investigation. Diagnostics guide investigation, not automatic deletion.",
  };

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-700">
            R²
          </p>
          <p className="mt-1 text-2xl font-black text-slate-950">
            {r2.toFixed(3)}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-700">
            Residual SE
          </p>
          <p className="mt-1 text-2xl font-black text-slate-950">
            {residualStandardError.toFixed(2)}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-700">
            Pattern
          </p>
          <p className="mt-1 text-lg font-black text-slate-950">
            {pattern === "good"
              ? "Reasonable"
              : pattern === "curved"
              ? "Curvature"
              : pattern === "fan"
              ? "Fan shape"
              : "Outlier"}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-4">
        {[
          ["good", "Reasonable"],
          ["curved", "Curved pattern"],
          ["fan", "Fan shape"],
          ["outlier", "Outlier"],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setPattern(id as DiagnosticPattern)}
            className={`rounded-full px-4 py-3 text-sm font-black transition ${
              pattern === id
                ? "bg-blue-700 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-[#5f0b0f]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-slate-700">
            Data with fitted line
          </p>

          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="h-auto w-full rounded-2xl bg-slate-50"
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

            <line
              x1={sx(0.5)}
              y1={sy(intercept + slope * 0.5)}
              x2={sx(8.8)}
              y2={sy(intercept + slope * 8.8)}
              stroke="#2563eb"
              strokeWidth="3"
            />

            {fitted.map((p, i) => (
              <circle
                key={i}
                cx={sx(p.x)}
                cy={sy(p.y)}
                r={pattern === "outlier" && i === 16 ? "8" : "6"}
                fill={pattern === "outlier" && i === 16 ? "#dc2626" : "#0f172a"}
              />
            ))}

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
              x="16"
              y={height / 2}
              textAnchor="middle"
              fontSize="13"
              fill="#475569"
              transform={`rotate(-90 16 ${height / 2})`}
            >
              Outcome Y
            </text>
          </svg>
        </div>

        <div>
          <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-slate-700">
            Residuals versus fitted values
          </p>

          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="h-auto w-full rounded-2xl bg-slate-50"
          >
            <line
              x1={pad}
              y1={srY(0)}
              x2={width - pad}
              y2={srY(0)}
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="6 5"
            />

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

            {fitted.map((p, i) => (
              <circle
                key={i}
                cx={sx(p.yhat)}
                cy={srY(p.residual)}
                r={pattern === "outlier" && i === 16 ? "8" : "6"}
                fill={pattern === "outlier" && i === 16 ? "#dc2626" : "#2563eb"}
              />
            ))}

            <text
              x={width / 2}
              y={height - 10}
              textAnchor="middle"
              fontSize="13"
              fill="#475569"
            >
              Fitted values
            </text>

            <text
              x="16"
              y={height / 2}
              textAnchor="middle"
              fontSize="13"
              fill="#475569"
              transform={`rotate(-90 16 ${height / 2})`}
            >
              Residuals
            </text>
          </svg>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
        <p className="text-sm font-black tracking-tight text-slate-950">
          Diagnostic interpretation
        </p>
        <p className="mt-2 text-sm leading-7 text-slate-700">
          {explanation[pattern]}
        </p>
      </div>
    </div>
  );
}

const quizQuestions = [
  {
    question: "What is the main purpose of residual diagnostics?",
    options: [
      "To make the sample size larger",
      "To check what the model failed to explain",
      "To remove all observations with negative residuals",
      "To prove causation automatically",
    ],
    answer: 1,
    explanation:
      "Residuals show the part of the outcome not explained by the fitted model. Patterns in residuals can reveal model problems.",
  },
  {
    question: "What does a curved pattern in a residual plot suggest?",
    options: [
      "The relationship may not be linear",
      "The sample size is always too large",
      "The intercept must be zero",
      "The model has no residual error",
    ],
    answer: 0,
    explanation:
      "A curved residual pattern suggests that a straight-line model may be missing non-linearity.",
  },
  {
    question: "What does R² measure?",
    options: [
      "The proportion of total variation in Y explained by the model",
      "The probability that the model is causal",
      "The number of predictors in the model",
      "The slope of the regression line only",
    ],
    answer: 0,
    explanation:
      "R² is 1 − SSE/SST, the proportion of total variation in the outcome explained by the fitted model.",
  },
  {
    question: "Why can adjusted R² be useful?",
    options: [
      "It always increases when predictors are added",
      "It penalises unnecessary predictors",
      "It removes the need for residual plots",
      "It proves the model is unbiased",
    ],
    answer: 1,
    explanation:
      "Adjusted R² accounts for the number of predictors and can decrease when unnecessary predictors are added.",
  },
  {
    question: "Which statement best describes influence?",
    options: [
      "A point has a very small X-value",
      "A point strongly changes the fitted model if removed",
      "A residual is exactly zero",
      "A variable is binary",
    ],
    answer: 1,
    explanation:
      "An influential observation is one that strongly changes model estimates or conclusions if removed.",
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
        <p className="mt-4 text-4xl font-black md:text-6xl text-slate-950">
          {score}/{quizQuestions.length}
        </p>
        <p className="mt-4 text-base leading-8 text-slate-600">
          This score reflects your understanding of residual diagnostics, model
          fit, R², adjusted R², outliers, leverage and influence.
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
      <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-700">
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

export default function ModelAssessmentDiagnosticsLessonPage() {
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
              Module 5 · Lesson 5.4
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl md:text-6xl">
              Model Assessment and Diagnostics
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              Learn how to judge whether a regression model is trustworthy.
              This lesson covers residual plots, linearity, constant variance,
              normality of errors, R², adjusted R², residual standard error,
              outliers, leverage and influence.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-700">
              Lesson focus
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
              <li>Residual diagnostics</li>
              <li>Linearity and variance checks</li>
              <li>R² and adjusted R²</li>
              <li>Residual standard error</li>
              <li>Outliers, leverage and influence</li>
              <li>Scientific judgement</li>
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
                  : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-[#5f0b0f]"
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
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-700">
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
                title="Fitting a model is only the beginning"
              >
                A regression model should not be trusted just because it
                produced coefficients and p-values. We must check how the model
                behaves.
              </SectionTitle>

              <div className="rounded-2xl bg-slate-50 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-slate-700">
                Scene: Mr. R’s classroom, after fitting the regression model
              </div>

              <Speaker name="Emma" initials="EM" tone="green">
                We can now fit regression models. But how do we know whether a
                model is actually good?
              </Speaker>

              <Speaker name="Mr. R" initials="MR" tone="blue" right>
                Good question. A model is not good just because it gives a small
                p-value. We must check fit, assumptions, residuals and
                influential observations.
              </Speaker>

              <Speaker name="Oliver" initials="OL" tone="amber">
                So a significant coefficient can still come from a poor model?
              </Speaker>

              <Speaker name="Mr. R" initials="MR" tone="blue" right>
                Exactly. A coefficient can be statistically significant inside a
                model that is badly specified.
              </Speaker>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                1. What model assessment asks
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Model assessment asks several connected questions:
              </p>

              <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-8 text-slate-600">
                <li>Does the model explain meaningful variation in the outcome?</li>
                <li>Are residuals randomly scattered or systematically patterned?</li>
                <li>Is the linearity assumption plausible?</li>
                <li>Is the residual variance roughly constant?</li>
                <li>Are some observations unusual or overly influential?</li>
                <li>Is the model useful for the research question?</li>
              </ul>

              <ConceptCard title="Core idea" tone="blue">
                A regression model should be judged by fit, assumptions,
                diagnostics, interpretability and relevance to the research
                question.
              </ConceptCard>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                2. Residuals as the main diagnostic tool
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                The residual for observation <InlineMath>i</InlineMath> is:
              </p>

              <MathBox>
                e<sub>i</sub> = y<sub>i</sub> − ŷ<sub>i</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                Residuals show what the model failed to explain. If the model
                is reasonable, residuals should look like random scatter around
                zero rather than a systematic pattern.
              </p>

              <Speaker name="James" initials="JA" tone="purple">
                So residual plots are not just decoration?
              </Speaker>

              <Speaker name="Mr. R" initials="MR" tone="blue" right>
                Not at all. Residual plots are often the first place where model
                problems become visible.
              </Speaker>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                3. Linearity
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Linear regression assumes that the conditional mean of the
                outcome is linear in the predictors.
              </p>

              <MathBox>
                E(Y | X = x) = β<sub>0</sub> + β<sub>1</sub>x
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                If residuals show a curved pattern against fitted values or
                against a predictor, the straight-line model may be missing
                important structure.
              </p>

              <ConceptCard title="Diagnostic sign" tone="amber">
                Curved residual pattern means the average relationship may not
                be adequately represented by a straight line.
              </ConceptCard>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                4. Constant variance
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Constant variance means the residual spread is roughly similar
                across fitted values.
              </p>

              <MathBox>
                Var(ε<sub>i</sub> | X<sub>i</sub>) = σ<sup>2</sup>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                If residuals fan out as fitted values increase, the model may
                have non-constant variance.
              </p>

              <ConceptCard title="Why it matters" tone="rose">
                Non-constant variance can affect standard errors, confidence
                intervals and p-values. The fitted line may still describe an
                average trend, but inference may be unreliable.
              </ConceptCard>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                5. Normality of errors
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Normality is mainly important for small-sample inference. The
                assumption is about errors around the modelled mean, not
                necessarily about the marginal distribution of the outcome.
              </p>

              <Speaker name="Sophia" initials="SO" tone="rose">
                Does Y itself have to be normally distributed?
              </Speaker>

              <Speaker name="Mr. R" initials="MR" tone="blue" right>
                Not exactly. The usual assumption is about errors or residuals
                around the regression line, not necessarily the overall
                distribution of Y.
              </Speaker>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                6. R² and explained variation
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                The total sum of squares measures total variation in the
                outcome:
              </p>

              <MathBox>
                SST = Σ(y<sub>i</sub> − ȳ)<sup>2</sup>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                The residual sum of squares measures unexplained variation:
              </p>

              <MathBox>
                SSE = Σ(y<sub>i</sub> − ŷ<sub>i</sub>)<sup>2</sup>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                The coefficient of determination is:
              </p>

              <MathBox>
                R<sup>2</sup> = 1 − <Fraction top="SSE" bottom="SST" />
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                R² measures the proportion of total variation in Y explained by
                the fitted model.
              </p>

              <Speaker name="Emma" initials="EM" tone="green">
                If R² is high, is the model always good?
              </Speaker>

              <Speaker name="Mr. R" initials="MR" tone="blue" right>
                No. A high R² does not prove correct functional form, causal
                interpretation, valid assumptions or good future prediction.
              </Speaker>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                7. Outliers, leverage and influence
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                These three ideas are related but not the same:
              </p>

              <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full border-collapse text-sm">
                  <thead className="bg-slate-50 text-left">
                    <tr>
                      <th className="border-b border-slate-200 px-4 py-3 font-black">
                        Term
                      </th>
                      <th className="border-b border-slate-200 px-4 py-3 font-black">
                        Meaning
                      </th>
                      <th className="border-b border-slate-200 px-4 py-3 font-black">
                        Why it matters
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-600">
                    <tr>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Outlier
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Unusual outcome value or large residual
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        May signal error, rare case or poor fit
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Leverage
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Unusual predictor value
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Can pull the fitted line
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Influence</td>
                      <td className="px-4 py-3">
                        Strong effect on model estimates if removed
                      </td>
                      <td className="px-4 py-3">
                        Can change conclusions
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <ConceptCard title="Diagnostics are not deletion rules" tone="amber">
                Finding an unusual observation does not automatically mean
                deleting it. First ask whether it is a data error, a meaningful
                rare case, a measurement issue or evidence that the model is
                inadequate.
              </ConceptCard>
            </section>
          )}

          {tab === "notes" && (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <SectionTitle
                eyebrow="Detailed notes"
                title="Formal model assessment and diagnostic quantities"
              >
                These notes give the mathematical definitions behind model fit,
                residual standard error, R², adjusted R² and diagnostic
                concepts.
              </SectionTitle>

              <h3 className="text-2xl font-black tracking-tight">
                1. Fitted values and residuals
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                In simple regression:
              </p>

              <MathBox>
                ŷ<sub>i</sub> = b<sub>0</sub> + b<sub>1</sub>x<sub>i</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                In multiple regression:
              </p>

              <MathBox>
                ŷ<sub>i</sub> = b<sub>0</sub> + b<sub>1</sub>x<sub>1i</sub> +
                b<sub>2</sub>x<sub>2i</sub> + ... + b<sub>p</sub>x
                <sub>pi</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                The residual is:
              </p>

              <MathBox>
                e<sub>i</sub> = y<sub>i</sub> − ŷ<sub>i</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                Residuals are sample estimates of unexplained deviations from
                the fitted mean.
              </p>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                2. Sum of squares decomposition
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Total variation in the outcome is measured by:
              </p>

              <MathBox>
                SST = Σ(y<sub>i</sub> − ȳ)<sup>2</sup>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                Unexplained variation after fitting the model is:
              </p>

              <MathBox>
                SSE = Σ(y<sub>i</sub> − ŷ<sub>i</sub>)<sup>2</sup>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                Explained variation is:
              </p>

              <MathBox>
                SSR = Σ(ŷ<sub>i</sub> − ȳ)<sup>2</sup>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                For ordinary least squares with an intercept:
              </p>

              <MathBox>SST = SSR + SSE</MathBox>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                3. Coefficient of determination
              </h3>

              <MathBox>
                R<sup>2</sup> = <Fraction top="SSR" bottom="SST" /> = 1 −{" "}
                <Fraction top="SSE" bottom="SST" />
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                R² is the proportion of outcome variation explained by the
                fitted model. It lies between 0 and 1 for ordinary least squares
                models with an intercept.
              </p>

              <ConceptCard title="Interpretation warning" tone="amber">
                R² does not prove that the model is causal, correctly specified,
                unbiased, externally valid or useful for prediction.
              </ConceptCard>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                4. Adjusted R²
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Ordinary R² usually cannot decrease when predictors are added.
                Adjusted R² penalises model complexity:
              </p>

              <MathBox>
                R<sup>2</sup>
                <sub>adj</sub> = 1 −{" "}
                <Fraction
                  top={
                    <>
                      SSE / (n − p − 1)
                    </>
                  }
                  bottom={
                    <>
                      SST / (n − 1)
                    </>
                  }
                />
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                Here, <InlineMath>p</InlineMath> is the number of predictors
                excluding the intercept.
              </p>

              <ConceptCard title="Why adjusted R² exists" tone="blue">
                Adjusted R² asks whether the improvement in fit is large enough
                to justify the additional predictors.
              </ConceptCard>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                5. Residual standard error
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                The residual standard error estimates the typical size of
                residuals:
              </p>

              <MathBox>
                s<sub>e</sub> = √
                <span className="inline-flex flex-col items-center align-middle">
                  <span className="border-b border-slate-900 px-2 pb-1">
                    SSE
                  </span>
                  <span className="px-2 pt-1">n − p − 1</span>
                </span>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                It is measured in the units of Y, making it easier to interpret
                than R² in many practical settings.
              </p>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                6. Assumption checks
              </h3>

              <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full border-collapse text-sm">
                  <thead className="bg-slate-50 text-left">
                    <tr>
                      <th className="border-b border-slate-200 px-4 py-3 font-black">
                        Assumption or issue
                      </th>
                      <th className="border-b border-slate-200 px-4 py-3 font-black">
                        Diagnostic clue
                      </th>
                      <th className="border-b border-slate-200 px-4 py-3 font-black">
                        Possible concern
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-600">
                    <tr>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Linearity
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Curved residual pattern
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Mean structure is misspecified
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Constant variance
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Fan-shaped residual spread
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Standard errors may be unreliable
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Normal errors
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Strong Q-Q plot departures
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Small-sample inference may be affected
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Influential points</td>
                      <td className="px-4 py-3">
                        Results change when a point is removed
                      </td>
                      <td className="px-4 py-3">
                        Conclusions may depend on few observations
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                7. Outliers, leverage and influence
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                An outlier usually has an unusual response value or large
                residual. A high-leverage point has an unusual predictor value
                or predictor combination. An influential point strongly changes
                model estimates if removed.
              </p>

              <ConceptCard title="Important distinction" tone="purple">
                A high-leverage point is not always influential. It becomes
                especially influential when it also disagrees with the overall
                model pattern.
              </ConceptCard>
            </section>
          )}

          {tab === "interactive" && (
            <section className="space-y-8">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <SectionTitle
                  eyebrow="Interactive lab"
                  title="Compare diagnostic patterns"
                >
                  Switch between different residual patterns. Notice how a
                  model can have a fitted line but still show diagnostic
                  problems.
                </SectionTitle>

                <DiagnosticLab />
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <h3 className="text-2xl font-black tracking-tight">
                  What to notice
                </h3>

                <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-8 text-slate-600">
                  <li>
                    Random residual scatter around zero is usually reassuring.
                  </li>
                  <li>
                    Curvature suggests a straight-line mean model may be
                    inadequate.
                  </li>
                  <li>
                    Fan-shaped residuals suggest non-constant variance.
                  </li>
                  <li>
                    Outliers require investigation, not automatic deletion.
                  </li>
                  <li>
                    R² alone cannot diagnose all model problems.
                  </li>
                </ul>
              </div>
            </section>
          )}

          {tab === "examples" && (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <SectionTitle
                eyebrow="Worked examples"
                title="Interpreting model diagnostics"
              >
                These examples show how to interpret fit measures and residual
                patterns.
              </SectionTitle>

              <div className="space-y-8">
                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
                    Example 1
                  </p>

                  <h3 className="mt-2 text-xl font-black">
                    Calculate and interpret R²
                  </h3>

                  <p className="mt-4 text-base leading-8 text-slate-600">
                    Suppose:
                  </p>

                  <MathBox>SST = 500, SSE = 125</MathBox>

                  <p className="text-base leading-8 text-slate-600">
                    Then:
                  </p>

                  <MathBox>
                    R<sup>2</sup> = 1 − <Fraction top="125" bottom="500" /> =
                    1 − 0.25 = 0.75
                  </MathBox>

                  <ConceptCard title="Interpretation" tone="green">
                    The model explains 75% of the total variation in the
                    outcome. This sounds strong, but we still need residual
                    diagnostics and scientific interpretation.
                  </ConceptCard>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
                    Example 2
                  </p>

                  <h3 className="mt-2 text-xl font-black">
                    Residual standard error
                  </h3>

                  <p className="mt-4 text-base leading-8 text-slate-600">
                    Suppose:
                  </p>

                  <MathBox>SSE = 180, n = 32, p = 2</MathBox>

                  <p className="text-base leading-8 text-slate-600">
                    Then:
                  </p>

                  <MathBox>
                    s<sub>e</sub> = √
                    <span className="inline-flex flex-col items-center align-middle">
                      <span className="border-b border-slate-900 px-2 pb-1">
                        180
                      </span>
                      <span className="px-2 pt-1">32 − 2 − 1</span>
                    </span>{" "}
                    = √
                    <span className="inline-flex flex-col items-center align-middle">
                      <span className="border-b border-slate-900 px-2 pb-1">
                        180
                      </span>
                      <span className="px-2 pt-1">29</span>
                    </span>{" "}
                    ≈ 2.49
                  </MathBox>

                  <ConceptCard title="Interpretation" tone="blue">
                    The typical residual size is about 2.49 outcome units. This
                    is often easier to interpret than R² because it is in the
                    original units of Y.
                  </ConceptCard>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
                    Example 3
                  </p>

                  <h3 className="mt-2 text-xl font-black">
                    High R² with poor diagnostics
                  </h3>

                  <p className="mt-4 text-base leading-8 text-slate-600">
                    A model has R² = 0.91, but the residual plot shows a strong
                    curve.
                  </p>

                  <ConceptCard title="Interpretation" tone="amber">
                    The model explains a large amount of variation, but the
                    straight-line form is probably inappropriate. A high R² does
                    not rescue a misspecified model.
                  </ConceptCard>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
                    Example 4
                  </p>

                  <h3 className="mt-2 text-xl font-black">
                    Outlier versus influence
                  </h3>

                  <p className="mt-4 text-base leading-8 text-slate-600">
                    A point has a large residual but its X-value is near the
                    centre of the data. Another point has an extreme X-value and
                    strongly changes the slope when removed.
                  </p>

                  <ConceptCard title="Interpretation" tone="purple">
                    The first point is an outlier in the outcome direction. The
                    second point is influential because it strongly affects the
                    fitted model. These are related but different ideas.
                  </ConceptCard>
                </div>
              </div>
            </section>
          )}

          {tab === "exercises" && (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <SectionTitle
                eyebrow="Exercises"
                title="Practice model assessment"
              >
                Try each question first, then open the answer.
              </SectionTitle>

              {[
                {
                  title: "Interpret R²",
                  question:
                    "A regression model has R² = 0.62. Interpret this value.",
                  answer:
                    "The model explains 62% of the total variation in the outcome. This does not prove causation, correct assumptions or good prediction.",
                },
                {
                  title: "Calculate R²",
                  question:
                    "If SST = 800 and SSE = 200, calculate R².",
                  answer:
                    "R² = 1 − SSE/SST = 1 − 200/800 = 1 − 0.25 = 0.75.",
                },
                {
                  title: "Residual pattern",
                  question:
                    "A residual plot shows a clear U-shaped pattern. What does this suggest?",
                  answer:
                    "It suggests non-linearity. A straight-line model may be missing a curved relationship.",
                },
                {
                  title: "Fan-shaped residuals",
                  question:
                    "Residual spread increases as fitted values increase. What assumption may be violated?",
                  answer:
                    "The constant variance assumption may be violated. This is often called heteroscedasticity.",
                },
                {
                  title: "Outlier deletion",
                  question:
                    "A dataset contains one unusual observation. Should it automatically be deleted?",
                  answer:
                    "No. It should first be investigated. It may be a data error, a meaningful rare case, a measurement issue or evidence that the model is inadequate.",
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

                    <span className="text-2xl font-black text-slate-700">
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
                This quiz focuses on residuals, model assumptions, R², adjusted
                R² and influential observations.
              </SectionTitle>

              <Quiz />
            </section>
          )}
        </div>
      </section>
    </main>
  );
}