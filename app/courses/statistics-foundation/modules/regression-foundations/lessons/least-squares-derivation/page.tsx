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
    active: true,
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

function SseCurveLab() {
  const [candidateSlope, setCandidateSlope] = useState(0.6);

  const data = useMemo(
    () => [
      { x: 1, y: 3 },
      { x: 2, y: 5 },
      { x: 3, y: 5 },
      { x: 4, y: 8 },
      { x: 5, y: 9 },
      { x: 6, y: 11 },
    ],
    []
  );

  const xBar = data.reduce((sum, p) => sum + p.x, 0) / data.length;
  const yBar = data.reduce((sum, p) => sum + p.y, 0) / data.length;

  const bestSlope =
    data.reduce((sum, p) => sum + (p.x - xBar) * (p.y - yBar), 0) /
    data.reduce((sum, p) => sum + (p.x - xBar) ** 2, 0);

  const bestIntercept = yBar - bestSlope * xBar;
  const candidateIntercept = yBar - candidateSlope * xBar;

  const sse = data.reduce((sum, p) => {
    const fitted = candidateIntercept + candidateSlope * p.x;
    return sum + (p.y - fitted) ** 2;
  }, 0);

  const bestSse = data.reduce((sum, p) => {
    const fitted = bestIntercept + bestSlope * p.x;
    return sum + (p.y - fitted) ** 2;
  }, 0);

  const width = 620;
  const height = 360;
  const pad = 48;
  const xMin = 0;
  const xMax = 7;
  const yMin = 0;
  const yMax = 13;

  const sx = (x: number) => pad + ((x - xMin) / (xMax - xMin)) * (width - 2 * pad);
  const sy = (y: number) =>
    height - pad - ((y - yMin) / (yMax - yMin)) * (height - 2 * pad);

  const fittedData = data.map((p) => ({
    ...p,
    yhat: candidateIntercept + candidateSlope * p.x,
  }));

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
            Candidate slope
          </p>
          <p className="mt-1 text-2xl font-black text-slate-950">
            {candidateSlope.toFixed(2)}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
            Candidate SSE
          </p>
          <p className="mt-1 text-2xl font-black text-slate-950">
            {sse.toFixed(2)}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
            Least-squares SSE
          </p>
          <p className="mt-1 text-2xl font-black text-slate-950">
            {bestSse.toFixed(2)}
          </p>
        </div>
      </div>

      <label className="mt-6 block rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <span className="text-sm font-black text-slate-700">
          Move candidate slope
        </span>
        <input
          type="range"
          min="-0.5"
          max="3"
          step="0.01"
          value={candidateSlope}
          onChange={(e) => setCandidateSlope(Number(e.target.value))}
          className="mt-4 w-full accent-blue-700"
        />
      </label>

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

        <line
          x1={sx(0.5)}
          y1={sy(candidateIntercept + candidateSlope * 0.5)}
          x2={sx(6.5)}
          y2={sy(candidateIntercept + candidateSlope * 6.5)}
          stroke="#2563eb"
          strokeWidth="3"
        />

        <line
          x1={sx(0.5)}
          y1={sy(bestIntercept + bestSlope * 0.5)}
          x2={sx(6.5)}
          y2={sy(bestIntercept + bestSlope * 6.5)}
          stroke="#16a34a"
          strokeWidth="3"
          strokeDasharray="8 5"
        />

        {fittedData.map((p) => (
          <g key={p.x}>
            <line
              x1={sx(p.x)}
              y1={sy(p.y)}
              x2={sx(p.x)}
              y2={sy(p.yhat)}
              stroke="#ef4444"
              strokeWidth="2"
              strokeDasharray="5 5"
            />
            <circle cx={sx(p.x)} cy={sy(p.y)} r="6" fill="#0f172a" />
            <circle cx={sx(p.x)} cy={sy(p.yhat)} r="4" fill="#2563eb" />
          </g>
        ))}

        <text x={sx(4.7)} y={sy(candidateIntercept + candidateSlope * 4.7) - 12} fontSize="13" fill="#2563eb">
          candidate line
        </text>

        <text x={sx(4.7)} y={sy(bestIntercept + bestSlope * 4.7) + 24} fontSize="13" fill="#16a34a">
          least-squares line
        </text>
      </svg>

      <p className="mt-4 text-sm leading-7 text-slate-600">
        The green dashed line is the least-squares line. The blue line is your
        candidate line. Least squares chooses the slope and intercept that make
        the sum of squared residuals as small as possible.
      </p>
    </div>
  );
}

const quizQuestions = [
  {
    question: "What does ordinary least squares minimise?",
    options: [
      "The sum of X-values",
      "The sum of residuals",
      "The sum of squared residuals",
      "The number of observations",
    ],
    answer: 2,
    explanation:
      "Ordinary least squares minimises the sum of squared residuals: Σ(yᵢ − b₀ − b₁xᵢ)².",
  },
  {
    question:
      "When the model includes an intercept, what does the first normal equation imply?",
    options: [
      "The residuals sum to zero",
      "The slope must be zero",
      "The fitted values sum to zero",
      "The X-values sum to zero",
    ],
    answer: 0,
    explanation:
      "Differentiating with respect to the intercept gives Σeᵢ = 0.",
  },
  {
    question: "What is the formula for the least-squares intercept?",
    options: [
      "b₀ = x̄ − b₁ȳ",
      "b₀ = ȳ − b₁x̄",
      "b₀ = b₁ȳ − x̄",
      "b₀ = Σxᵢyᵢ",
    ],
    answer: 1,
    explanation:
      "The fitted line passes through (x̄, ȳ), so b₀ = ȳ − b₁x̄.",
  },
  {
    question:
      "The least-squares slope can be interpreted as which ratio?",
    options: [
      "Variation in Y divided by variation in residuals",
      "Mean of Y divided by mean of X",
      "Co-variation of X and Y divided by variation in X",
      "Intercept divided by residual standard error",
    ],
    answer: 2,
    explanation:
      "b₁ = Σ(xᵢ − x̄)(yᵢ − ȳ) / Σ(xᵢ − x̄)².",
  },
  {
    question: "Why can extreme X-values have high leverage?",
    options: [
      "Because they are far from x̄ and can strongly affect the slope",
      "Because they always have large residuals",
      "Because they make the intercept disappear",
      "Because they force R² to be zero",
    ],
    answer: 0,
    explanation:
      "The slope formula weights points using xᵢ − x̄, so observations far from x̄ can strongly influence the fitted slope.",
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
          This score reflects your understanding of the least-squares objective,
          normal equations, slope formula and intercept formula.
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

export default function LeastSquaresDerivationLessonPage() {
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
              Module 5 · Lesson 5.2
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">
              Least Squares Derivation
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              Derive the regression line from first principles. Learn why the
              least-squares line minimises squared residuals, why residuals sum
              to zero, why the fitted line passes through the sample means, and
              how the slope formula emerges.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-400">
              Lesson focus
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
              <li>Least-squares objective</li>
              <li>Partial derivatives</li>
              <li>Normal equations</li>
              <li>Slope and intercept formulas</li>
              <li>Residual properties</li>
              <li>Leverage intuition</li>
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
                title="The regression line is not guessed"
              >
                In Lesson 5.1, regression was introduced as conditional mean
                modelling. Now we derive exactly how the fitted line is chosen.
              </SectionTitle>

              <div className="rounded-2xl bg-slate-50 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-slate-500">
                Scene: Mr. R’s classroom, the line is no longer magic
              </div>

              <Speaker name="Emma" initials="EM" tone="green">
                Last time we said least squares chooses the regression line. But
                how does it actually choose the slope and intercept?
              </Speaker>

              <Speaker name="Mr. R" initials="MR" tone="blue" right>
                It chooses the values that minimise a mathematical function: the
                sum of squared residuals. Today we derive that result carefully.
              </Speaker>

              <Speaker name="Oliver" initials="OL" tone="amber">
                So this is where calculus enters?
              </Speaker>

              <Speaker name="Mr. R" initials="MR" tone="blue" right>
                Yes. We take derivatives with respect to the intercept and
                slope, set them equal to zero, and solve.
              </Speaker>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                1. Start with the fitted line
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                For paired observations{" "}
                <InlineMath>
                  (x<sub>1</sub>, y<sub>1</sub>), ..., (x<sub>n</sub>, y
                  <sub>n</sub>)
                </InlineMath>
                , the fitted simple linear regression line is:
              </p>

              <MathBox>
                ŷ<sub>i</sub> = b<sub>0</sub> + b<sub>1</sub>x<sub>i</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                The residual is observed minus fitted:
              </p>

              <MathBox>
                e<sub>i</sub> = y<sub>i</sub> − ŷ<sub>i</sub> = y
                <sub>i</sub> − b<sub>0</sub> − b<sub>1</sub>x<sub>i</sub>
              </MathBox>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                2. The least-squares objective
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Least squares chooses{" "}
                <InlineMath>
                  b<sub>0</sub>
                </InlineMath>{" "}
                and{" "}
                <InlineMath>
                  b<sub>1</sub>
                </InlineMath>{" "}
                to minimise:
              </p>

              <MathBox>
                S(b<sub>0</sub>, b<sub>1</sub>) = Σ(y<sub>i</sub> − b
                <sub>0</sub> − b<sub>1</sub>x<sub>i</sub>)<sup>2</sup>
              </MathBox>

              <Speaker name="James" initials="JA" tone="purple">
                Why are the residuals squared?
              </Speaker>

              <Speaker name="Mr. R" initials="MR" tone="blue" right>
                Squaring stops positive and negative residuals from cancelling.
                It also gives a smooth function that can be differentiated.
              </Speaker>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                3. Derivative with respect to the intercept
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Differentiate the objective function with respect to{" "}
                <InlineMath>
                  b<sub>0</sub>
                </InlineMath>
                :
              </p>

              <MathBox>
                <Fraction
                  top={
                    <>
                      ∂S
                    </>
                  }
                  bottom={
                    <>
                      ∂b<sub>0</sub>
                    </>
                  }
                />{" "}
                = −2Σ(y<sub>i</sub> − b<sub>0</sub> − b<sub>1</sub>x
                <sub>i</sub>)
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                Set the derivative equal to zero:
              </p>

              <MathBox>
                Σ(y<sub>i</sub> − b<sub>0</sub> − b<sub>1</sub>x
                <sub>i</sub>) = 0
              </MathBox>

              <ConceptCard title="First important consequence" tone="green">
                Since{" "}
                <InlineMath>
                  e<sub>i</sub> = y<sub>i</sub> − b<sub>0</sub> − b
                  <sub>1</sub>x<sub>i</sub>
                </InlineMath>
                , this equation says that the residuals sum to zero when the
                model includes an intercept.
              </ConceptCard>

              <MathBox>
                Σe<sub>i</sub> = 0
              </MathBox>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                4. The fitted line passes through the means
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Expand the first normal equation:
              </p>

              <MathBox>
                Σy<sub>i</sub> − nb<sub>0</sub> − b<sub>1</sub>Σx
                <sub>i</sub> = 0
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                Divide by <InlineMath>n</InlineMath>:
              </p>

              <MathBox>
                ȳ − b<sub>0</sub> − b<sub>1</sub>x̄ = 0
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                Rearranging gives:
              </p>

              <MathBox>
                b<sub>0</sub> = ȳ − b<sub>1</sub>x̄
              </MathBox>

              <Speaker name="Sophia" initials="SO" tone="rose">
                So the regression line always goes through the point{" "}
                <InlineMath>(x̄, ȳ)</InlineMath>?
              </Speaker>

              <Speaker name="Mr. R" initials="MR" tone="blue" right>
                Yes. For ordinary least squares with an intercept, the fitted
                line passes through the centre of the data cloud.
              </Speaker>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                5. Derivative with respect to the slope
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Now differentiate with respect to{" "}
                <InlineMath>
                  b<sub>1</sub>
                </InlineMath>
                :
              </p>

              <MathBox>
                <Fraction
                  top={
                    <>
                      ∂S
                    </>
                  }
                  bottom={
                    <>
                      ∂b<sub>1</sub>
                    </>
                  }
                />{" "}
                = −2Σx<sub>i</sub>(y<sub>i</sub> − b<sub>0</sub> − b
                <sub>1</sub>x<sub>i</sub>)
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                Set this equal to zero:
              </p>

              <MathBox>
                Σx<sub>i</sub>(y<sub>i</sub> − b<sub>0</sub> − b
                <sub>1</sub>x<sub>i</sub>) = 0
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                Since the expression in brackets is the residual, this can also
                be written as:
              </p>

              <MathBox>
                Σx<sub>i</sub>e<sub>i</sub> = 0
              </MathBox>

              <ConceptCard title="Second important consequence" tone="blue">
                The residuals are orthogonal to the predictor. In beginner
                language, once the least-squares line is fitted, there is no
                remaining linear pattern between X and the residuals.
              </ConceptCard>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                6. The slope formula
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Substituting{" "}
                <InlineMath>
                  b<sub>0</sub> = ȳ − b<sub>1</sub>x̄
                </InlineMath>{" "}
                into the second normal equation gives the least-squares slope:
              </p>

              <MathBox>
                b<sub>1</sub> ={" "}
                <Fraction
                  top={
                    <>
                      Σ(x<sub>i</sub> − x̄)(y<sub>i</sub> − ȳ)
                    </>
                  }
                  bottom={
                    <>
                      Σ(x<sub>i</sub> − x̄)<sup>2</sup>
                    </>
                  }
                />
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                The numerator measures how{" "}
                <InlineMath>X</InlineMath> and <InlineMath>Y</InlineMath> vary
                together. The denominator measures how much{" "}
                <InlineMath>X</InlineMath> varies.
              </p>

              <Speaker name="Emma" initials="EM" tone="green">
                So slope is like covariance divided by variance?
              </Speaker>

              <Speaker name="Mr. R" initials="MR" tone="blue" right>
                Exactly. The slope is co-movement of X and Y divided by movement
                in X.
              </Speaker>

              <ConceptCard title="Core formula to remember" tone="purple">
                <InlineMath>
                  b<sub>1</sub>
                </InlineMath>{" "}
                tells us how much the fitted mean of Y changes per one-unit
                increase in X. Algebraically, it is co-variation divided by
                variation in X.
              </ConceptCard>
            </section>
          )}

          {tab === "notes" && (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <SectionTitle
                eyebrow="Detailed notes"
                title="The least-squares line from first principles"
              >
                These notes derive the ordinary least-squares intercept and
                slope step by step.
              </SectionTitle>

              <h3 className="text-2xl font-black tracking-tight">
                1. Objective function
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Given paired data{" "}
                <InlineMath>
                  (x<sub>i</sub>, y<sub>i</sub>)
                </InlineMath>
                , the fitted line is:
              </p>

              <MathBox>
                ŷ<sub>i</sub> = b<sub>0</sub> + b<sub>1</sub>x<sub>i</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                The residual is:
              </p>

              <MathBox>
                e<sub>i</sub> = y<sub>i</sub> − b<sub>0</sub> − b
                <sub>1</sub>x<sub>i</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                The least-squares objective is:
              </p>

              <MathBox>
                S(b<sub>0</sub>, b<sub>1</sub>) = Σe<sub>i</sub>
                <sup>2</sup> = Σ(y<sub>i</sub> − b<sub>0</sub> − b
                <sub>1</sub>x<sub>i</sub>)<sup>2</sup>
              </MathBox>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                2. First normal equation
              </h3>

              <MathBox>
                <Fraction
                  top="∂S"
                  bottom={
                    <>
                      ∂b<sub>0</sub>
                    </>
                  }
                />{" "}
                = Σ2(y<sub>i</sub> − b<sub>0</sub> − b<sub>1</sub>x
                <sub>i</sub>)(−1)
              </MathBox>

              <MathBox>
                <Fraction
                  top="∂S"
                  bottom={
                    <>
                      ∂b<sub>0</sub>
                    </>
                  }
                />{" "}
                = −2Σ(y<sub>i</sub> − b<sub>0</sub> − b<sub>1</sub>x
                <sub>i</sub>)
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                At the minimum:
              </p>

              <MathBox>
                Σ(y<sub>i</sub> − b<sub>0</sub> − b<sub>1</sub>x
                <sub>i</sub>) = 0
              </MathBox>

              <MathBox>
                Σe<sub>i</sub> = 0
              </MathBox>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                3. Intercept formula
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Expanding the first normal equation:
              </p>

              <MathBox>
                Σy<sub>i</sub> − nb<sub>0</sub> − b<sub>1</sub>Σx
                <sub>i</sub> = 0
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                Divide by <InlineMath>n</InlineMath>:
              </p>

              <MathBox>
                ȳ − b<sub>0</sub> − b<sub>1</sub>x̄ = 0
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                Therefore:
              </p>

              <MathBox>
                b<sub>0</sub> = ȳ − b<sub>1</sub>x̄
              </MathBox>

              <ConceptCard title="Geometric meaning" tone="green">
                This formula forces the fitted line to pass through the point{" "}
                <InlineMath>(x̄, ȳ)</InlineMath>, the centre of the data cloud.
              </ConceptCard>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                4. Second normal equation
              </h3>

              <MathBox>
                <Fraction
                  top="∂S"
                  bottom={
                    <>
                      ∂b<sub>1</sub>
                    </>
                  }
                />{" "}
                = Σ2(y<sub>i</sub> − b<sub>0</sub> − b<sub>1</sub>x
                <sub>i</sub>)(−x<sub>i</sub>)
              </MathBox>

              <MathBox>
                <Fraction
                  top="∂S"
                  bottom={
                    <>
                      ∂b<sub>1</sub>
                    </>
                  }
                />{" "}
                = −2Σx<sub>i</sub>(y<sub>i</sub> − b<sub>0</sub> − b
                <sub>1</sub>x<sub>i</sub>)
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                At the minimum:
              </p>

              <MathBox>
                Σx<sub>i</sub>(y<sub>i</sub> − b<sub>0</sub> − b
                <sub>1</sub>x<sub>i</sub>) = 0
              </MathBox>

              <MathBox>
                Σx<sub>i</sub>e<sub>i</sub> = 0
              </MathBox>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                5. Deriving the slope
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Substitute{" "}
                <InlineMath>
                  b<sub>0</sub> = ȳ − b<sub>1</sub>x̄
                </InlineMath>{" "}
                into the second normal equation:
              </p>

              <MathBox>
                Σx<sub>i</sub>[y<sub>i</sub> − ȳ + b<sub>1</sub>x̄ − b
                <sub>1</sub>x<sub>i</sub>] = 0
              </MathBox>

              <MathBox>
                Σx<sub>i</sub>[(y<sub>i</sub> − ȳ) − b<sub>1</sub>(x
                <sub>i</sub> − x̄)] = 0
              </MathBox>

              <MathBox>
                Σx<sub>i</sub>(y<sub>i</sub> − ȳ) = b<sub>1</sub>Σx
                <sub>i</sub>(x<sub>i</sub> − x̄)
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                This simplifies to the familiar centred form:
              </p>

              <MathBox>
                b<sub>1</sub> ={" "}
                <Fraction
                  top={
                    <>
                      Σ(x<sub>i</sub> − x̄)(y<sub>i</sub> − ȳ)
                    </>
                  }
                  bottom={
                    <>
                      Σ(x<sub>i</sub> − x̄)<sup>2</sup>
                    </>
                  }
                />
              </MathBox>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                6. Covariance and variance form
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                The numerator resembles the sample covariance numerator. The
                denominator resembles the sample variance numerator for{" "}
                <InlineMath>X</InlineMath>. Therefore:
              </p>

              <MathBox>
                b<sub>1</sub> ={" "}
                <Fraction
                  top="sample covariance of X and Y"
                  bottom="sample variance of X"
                />
              </MathBox>

              <ConceptCard title="Interpretation" tone="blue">
                If X and Y tend to be above their means together and below their
                means together, the numerator is positive and the slope is
                positive. If one tends to be above its mean when the other is
                below, the slope is negative.
              </ConceptCard>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                7. Summary of least-squares properties
              </h3>

              <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full border-collapse text-sm">
                  <thead className="bg-slate-50 text-left">
                    <tr>
                      <th className="border-b border-slate-200 px-4 py-3 font-black">
                        Property
                      </th>
                      <th className="border-b border-slate-200 px-4 py-3 font-black">
                        Equation
                      </th>
                      <th className="border-b border-slate-200 px-4 py-3 font-black">
                        Meaning
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-600">
                    <tr>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Residuals sum to zero
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3 font-serif">
                        Σeᵢ = 0
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Positive and negative residuals balance.
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Residuals are orthogonal to X
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3 font-serif">
                        Σxᵢeᵢ = 0
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        No remaining linear pattern with X.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        Line passes through the means
                      </td>
                      <td className="px-4 py-3 font-serif">(x̄, ȳ)</td>
                      <td className="px-4 py-3">
                        The line goes through the centre of the data cloud.
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
                  title="Move the line and watch SSE change"
                >
                  The least-squares line is the line that makes the sum of
                  squared residuals as small as possible.
                </SectionTitle>

                <SseCurveLab />
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <h3 className="text-2xl font-black tracking-tight">
                  What to notice
                </h3>

                <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-8 text-slate-600">
                  <li>
                    The blue line may look reasonable, but its SSE changes as
                    the slope changes.
                  </li>
                  <li>
                    The least-squares line is not chosen by eye. It is chosen by
                    minimising a function.
                  </li>
                  <li>
                    Large residuals matter strongly because they are squared.
                  </li>
                  <li>
                    The best-fitting slope balances the vertical residuals in a
                    precise mathematical way.
                  </li>
                </ul>
              </div>
            </section>
          )}

          {tab === "examples" && (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <SectionTitle
                eyebrow="Worked examples"
                title="Calculating the least-squares line"
              >
                These examples show how the slope and intercept formulas are
                used by hand.
              </SectionTitle>

              <div className="space-y-8">
                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
                    Example 1
                  </p>

                  <h3 className="mt-2 text-xl font-black">
                    Calculate slope and intercept
                  </h3>

                  <p className="mt-4 text-base leading-8 text-slate-600">
                    Suppose we have three observations:
                  </p>

                  <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full border-collapse text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="border-b border-slate-200 px-4 py-3 text-left font-black">
                            x
                          </th>
                          <th className="border-b border-slate-200 px-4 py-3 text-left font-black">
                            y
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-600">
                        <tr>
                          <td className="border-b border-slate-200 px-4 py-3">
                            1
                          </td>
                          <td className="border-b border-slate-200 px-4 py-3">
                            2
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b border-slate-200 px-4 py-3">
                            2
                          </td>
                          <td className="border-b border-slate-200 px-4 py-3">
                            4
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3">3</td>
                          <td className="px-4 py-3">5</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="mt-4 text-base leading-8 text-slate-600">
                    First calculate the means:
                  </p>

                  <MathBox>x̄ = 2, ȳ = 3.67</MathBox>

                  <p className="text-base leading-8 text-slate-600">
                    Now calculate:
                  </p>

                  <MathBox>
                    Σ(x<sub>i</sub> − x̄)(y<sub>i</sub> − ȳ) = 3
                  </MathBox>

                  <MathBox>
                    Σ(x<sub>i</sub> − x̄)<sup>2</sup> = 2
                  </MathBox>

                  <MathBox>
                    b<sub>1</sub> = 3 / 2 = 1.5
                  </MathBox>

                  <MathBox>
                    b<sub>0</sub> = ȳ − b<sub>1</sub>x̄ = 3.67 − 1.5(2) =
                    0.67
                  </MathBox>

                  <p className="text-base leading-8 text-slate-600">
                    Therefore the fitted line is:
                  </p>

                  <MathBox>ŷ = 0.67 + 1.5x</MathBox>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
                    Example 2
                  </p>

                  <h3 className="mt-2 text-xl font-black">
                    Interpret the slope formula
                  </h3>

                  <p className="mt-4 text-base leading-8 text-slate-600">
                    Suppose the numerator of the slope formula is negative:
                  </p>

                  <MathBox>
                    Σ(x<sub>i</sub> − x̄)(y<sub>i</sub> − ȳ) &lt; 0
                  </MathBox>

                  <p className="text-base leading-8 text-slate-600">
                    The denominator is always non-negative:
                  </p>

                  <MathBox>
                    Σ(x<sub>i</sub> − x̄)<sup>2</sup> &gt; 0
                  </MathBox>

                  <p className="text-base leading-8 text-slate-600">
                    Therefore the slope is negative. This means higher values of
                    X tend to be associated with lower values of Y.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
                    Example 3
                  </p>

                  <h3 className="mt-2 text-xl font-black">
                    Why high-leverage points matter
                  </h3>

                  <p className="mt-4 text-base leading-8 text-slate-600">
                    The slope formula contains terms of the form:
                  </p>

                  <MathBox>
                    x<sub>i</sub> − x̄
                  </MathBox>

                  <p className="text-base leading-8 text-slate-600">
                    If a point has an X-value far from the mean of X, then this
                    term is large in magnitude. Such a point can have strong
                    influence on the fitted slope, especially if its Y-value is
                    also unusual.
                  </p>

                  <ConceptCard title="Key idea" tone="amber">
                    A point can be influential not only because its Y-value is
                    unusual, but because its X-value gives it leverage over the
                    slope.
                  </ConceptCard>
                </div>
              </div>
            </section>
          )}

          {tab === "exercises" && (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <SectionTitle
                eyebrow="Exercises"
                title="Practice the least-squares derivation"
              >
                Try each question first, then open the answer.
              </SectionTitle>

              {[
                {
                  title: "Write the objective function",
                  question:
                    "For a fitted line ŷᵢ = b₀ + b₁xᵢ, write the least-squares objective function.",
                  answer:
                    "The least-squares objective is S(b₀, b₁) = Σ(yᵢ − b₀ − b₁xᵢ)². We choose b₀ and b₁ to minimise this quantity.",
                },
                {
                  title: "First normal equation",
                  question:
                    "What equation is obtained by differentiating S(b₀, b₁) with respect to b₀ and setting the derivative to zero?",
                  answer:
                    "We obtain Σ(yᵢ − b₀ − b₁xᵢ) = 0. Since the bracketed term is the residual, this is equivalent to Σeᵢ = 0.",
                },
                {
                  title: "Intercept formula",
                  question:
                    "Use the first normal equation to state the intercept formula.",
                  answer:
                    "The intercept is b₀ = ȳ − b₁x̄. This also shows that the fitted regression line passes through (x̄, ȳ).",
                },
                {
                  title: "Slope formula",
                  question:
                    "Write the ordinary least-squares slope formula.",
                  answer:
                    "The slope is b₁ = Σ(xᵢ − x̄)(yᵢ − ȳ) / Σ(xᵢ − x̄)².",
                },
                {
                  title: "Covariance interpretation",
                  question:
                    "Explain why the slope can be described as covariance divided by variance.",
                  answer:
                    "The numerator measures co-variation between X and Y. The denominator measures variation in X. Therefore the slope is the co-movement of X and Y per unit of X-variation.",
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
                This quiz focuses on the least-squares objective, normal
                equations and slope/intercept formulas.
              </SectionTitle>

              <Quiz />
            </section>
          )}
        </div>
      </section>
    </main>
  );
}