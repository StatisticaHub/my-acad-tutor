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
    active: true,
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

function RegressionSvg({
  slope,
  intercept,
  noise,
}: {
  slope: number;
  intercept: number;
  noise: number;
}) {
  const points = useMemo(() => {
    const xs = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return xs.map((x, i) => {
      const wave = Math.sin(i * 1.7) * noise;
      const y = intercept + slope * x + wave;
      return { x, y };
    });
  }, [slope, intercept, noise]);

  const width = 620;
  const height = 360;
  const pad = 46;

  const xMin = 0;
  const xMax = 10;
  const yMin = 0;
  const yMax = 20;

  const sx = (x: number) => pad + ((x - xMin) / (xMax - xMin)) * (width - 2 * pad);
  const sy = (y: number) =>
    height - pad - ((y - yMin) / (yMax - yMin)) * (height - 2 * pad);

  const lineStart = { x: 0.5, y: intercept + slope * 0.5 };
  const lineEnd = { x: 9.5, y: intercept + slope * 9.5 };

  const fitted = points.map((p) => ({
    ...p,
    yhat: intercept + slope * p.x,
    residual: p.y - (intercept + slope * p.x),
  }));

  const sse = fitted.reduce((acc, p) => acc + p.residual * p.residual, 0);

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 grid gap-3 md:grid-cols-3">
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
            Intercept
          </p>
          <p className="mt-1 text-2xl font-black text-slate-950">
            {intercept.toFixed(1)}
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
            SSE
          </p>
          <p className="mt-1 text-2xl font-black text-slate-950">
            {sse.toFixed(1)}
          </p>
        </div>
      </div>

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

        {[0, 2, 4, 6, 8, 10].map((x) => (
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

        {[0, 5, 10, 15, 20].map((y) => (
          <g key={y}>
            <line
              x1={pad - 6}
              y1={sy(y)}
              x2={pad}
              y2={sy(y)}
              stroke="#334155"
            />
            <text
              x={pad - 12}
              y={sy(y) + 4}
              textAnchor="end"
              fontSize="12"
              fill="#64748b"
            >
              {y}
            </text>
          </g>
        ))}

        <line
          x1={sx(lineStart.x)}
          y1={sy(lineStart.y)}
          x2={sx(lineEnd.x)}
          y2={sy(lineEnd.y)}
          stroke="#2563eb"
          strokeWidth="3"
        />

        {fitted.map((p) => (
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

        <text x={width / 2} y={height - 8} textAnchor="middle" fontSize="13" fill="#475569">
          Explanatory variable X
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

      <p className="mt-4 text-sm leading-7 text-slate-600">
        The black points are observed data. The blue line is the fitted
        regression line. The red dashed vertical segments are residuals:
        observed value minus fitted value.
      </p>
    </div>
  );
}

const quizQuestions = [
  {
    question:
      "In simple linear regression, what does the line usually model?",
    options: [
      "The exact value of every individual observation",
      "The conditional mean of Y given X",
      "Only the maximum value of Y",
      "Only the random error term",
    ],
    answer: 1,
    explanation:
      "Regression models the conditional mean E(Y | X = x), not every individual value exactly.",
  },
  {
    question: "What does the slope represent?",
    options: [
      "The value of Y when X is zero",
      "The average residual",
      "The expected change in mean Y for a one-unit increase in X",
      "The number of observations in the sample",
    ],
    answer: 2,
    explanation:
      "The slope is the change in the modelled mean of Y associated with a one-unit increase in X.",
  },
  {
    question: "What is a residual?",
    options: [
      "Observed value minus fitted value",
      "Fitted value minus intercept",
      "Slope divided by intercept",
      "The sample mean of X",
    ],
    answer: 0,
    explanation:
      "A residual is eᵢ = yᵢ − ŷᵢ. It measures how far an observation is from the fitted line.",
  },
  {
    question: "What does least squares minimise?",
    options: [
      "The sum of residuals",
      "The sum of squared residuals",
      "The number of predictors",
      "The sample size",
    ],
    answer: 1,
    explanation:
      "Ordinary least squares chooses the line that minimises Σ(yᵢ − ŷᵢ)².",
  },
  {
    question: "Why should a regression slope not automatically be interpreted causally?",
    options: [
      "Because slopes can never be positive",
      "Because regression only works for categorical outcomes",
      "Because association can be affected by confounding, design and assumptions",
      "Because residuals are always zero",
    ],
    answer: 2,
    explanation:
      "A slope describes association inside a fitted model. Causal interpretation requires additional assumptions and design thinking.",
  },
];

function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);

  const q = quizQuestions[current];
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
          A strong score here means you understand the core language of simple
          linear regression: conditional means, slope, intercept, fitted values,
          residuals and least squares.
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
              <span className="mr-3 font-black">{String.fromCharCode(65 + index)}.</span>
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

export default function SimpleLinearRegressionLessonPage() {
  const [tab, setTab] = useState<Tab>("lecture");
  const [slope, setSlope] = useState(1.3);
  const [intercept, setIntercept] = useState(2.5);
  const [noise, setNoise] = useState(2.2);
  const [openExercise, setOpenExercise] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="border-b border-slate-200 bg-white px-6 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <a
              href={withBasePath("/courses/statistics-foundation/modules/regression-foundations")}
              className="text-sm font-bold text-blue-700 hover:text-blue-900"
            >
              ← Back to Module 5
            </a>

            <p className="mt-4 text-sm font-black uppercase tracking-[0.2em] text-blue-700">
              Module 5 · Lesson 5.1
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">
              Simple Linear Regression
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              Learn regression as conditional mean modelling: how to interpret
              slope and intercept, what fitted values and residuals mean, why
              least squares is used, and why association is not automatically
              causation.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-400">
              Lesson tools
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
              <li>Conversational lecture</li>
              <li>Detailed theory notes</li>
              <li>Interactive residual lab</li>
              <li>Worked examples</li>
              <li>Exercises and quiz</li>
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
                title="Regression is more than drawing a line"
              >
                The aim of this first regression lesson is to shift from
                comparing groups to modelling relationships between variables.
              </SectionTitle>

              <div className="rounded-2xl bg-slate-50 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-slate-500">
                Scene: Mr. R’s classroom, after the inference module
              </div>

              <Speaker name="Emma" initials="EM" tone="green">
                We have compared means, proportions and categories. But now I
                keep seeing scatterplots with lines through them. Is regression
                just drawing the best line?
              </Speaker>

              <Speaker name="Mr. R" initials="MR" tone="blue" right>
                Drawing the line is only the visual part. Regression is a
                mathematical model for how the average value of an outcome
                changes with another variable.
              </Speaker>

              <Speaker name="Oliver" initials="OL" tone="amber">
                Average value? So the line is not supposed to pass through every
                single point?
              </Speaker>

              <Speaker name="Mr. R" initials="MR" tone="blue" right>
                Exactly. The regression line usually represents a conditional
                mean. It tells us the expected or average value of Y for a given
                value of X.
              </Speaker>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                1. The central regression question
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Simple linear regression studies the relationship between one
                quantitative outcome, usually called{" "}
                <InlineMath>Y</InlineMath>, and one explanatory variable,
                usually called <InlineMath>X</InlineMath>. The word{" "}
                <strong>simple</strong> means there is one explanatory variable.
                The word <strong>linear</strong> means the model uses a
                straight-line relationship for the mean.
              </p>

              <MathBox>
                E(Y | X = x) = β<sub>0</sub> + β<sub>1</sub>x
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                This says: among observations with{" "}
                <InlineMath>X = x</InlineMath>, the average value of{" "}
                <InlineMath>Y</InlineMath> is modelled as{" "}
                <InlineMath>
                  β<sub>0</sub> + β<sub>1</sub>x
                </InlineMath>
                .
              </p>

              <Speaker name="James" initials="JA" tone="purple">
                Why do we write E(Y | X = x) instead of just Y?
              </Speaker>

              <Speaker name="Mr. R" initials="MR" tone="blue" right>
                Because individual observations vary. Regression separates the
                average pattern from individual noise. The line is the average
                pattern; the residuals are deviations from that pattern.
              </Speaker>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                2. The statistical model
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                For observation <InlineMath>i</InlineMath>, the simple linear
                regression model is:
              </p>

              <MathBox>
                Y<sub>i</sub> = β<sub>0</sub> + β<sub>1</sub>X<sub>i</sub> + ε
                <sub>i</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                The term{" "}
                <InlineMath>
                  ε<sub>i</sub>
                </InlineMath>{" "}
                is the random error. It represents the part of{" "}
                <InlineMath>
                  Y<sub>i</sub>
                </InlineMath>{" "}
                not explained by the linear mean relationship.
              </p>

              <ConceptCard title="Important interpretation" tone="amber">
                The error term does not necessarily mean a mistake in the data.
                It means unexplained deviation from the modelled mean. Individual
                people, patients, students or observations rarely sit exactly on
                the regression line.
              </ConceptCard>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                3. Intercept and slope
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                The intercept{" "}
                <InlineMath>
                  β<sub>0</sub>
                </InlineMath>{" "}
                is the modelled mean of <InlineMath>Y</InlineMath> when{" "}
                <InlineMath>X = 0</InlineMath>. The slope{" "}
                <InlineMath>
                  β<sub>1</sub>
                </InlineMath>{" "}
                is the expected change in the mean of{" "}
                <InlineMath>Y</InlineMath> for a one-unit increase in{" "}
                <InlineMath>X</InlineMath>.
              </p>

              <MathBox>
                β<sub>1</sub> = E(Y | X = x + 1) − E(Y | X = x)
              </MathBox>

              <Speaker name="Sophia" initials="SO" tone="rose">
                If X is age and Y is blood pressure, and the slope is 0.7, can I
                say blood pressure increases by 0.7 each year?
              </Speaker>

              <Speaker name="Mr. R" initials="MR" tone="blue" right>
                More carefully: the modelled mean blood pressure is 0.7 units
                higher for each one-year increase in age, on average, within the
                range of the data. That careful wording matters.
              </Speaker>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                4. Fitted values and residuals
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                We do not know the true population values{" "}
                <InlineMath>
                  β<sub>0</sub>
                </InlineMath>{" "}
                and{" "}
                <InlineMath>
                  β<sub>1</sub>
                </InlineMath>
                . We estimate them using sample data. Let the estimates be{" "}
                <InlineMath>
                  b<sub>0</sub>
                </InlineMath>{" "}
                and{" "}
                <InlineMath>
                  b<sub>1</sub>
                </InlineMath>
                .
              </p>

              <MathBox>
                ŷ<sub>i</sub> = b<sub>0</sub> + b<sub>1</sub>x<sub>i</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                The residual is:
              </p>

              <MathBox>
                e<sub>i</sub> = y<sub>i</sub> − ŷ<sub>i</sub>
              </MathBox>

              <Speaker name="Oliver" initials="OL" tone="amber">
                So if the point is above the line, the residual is positive?
              </Speaker>

              <Speaker name="Mr. R" initials="MR" tone="blue" right>
                Yes. Observed minus fitted. Above the line gives a positive
                residual. Below the line gives a negative residual.
              </Speaker>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                5. Least squares intuition
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                The ordinary least squares line chooses the intercept and slope
                that minimise the sum of squared residuals.
              </p>

              <MathBox>
                SSE = Σ(y<sub>i</sub> − ŷ<sub>i</sub>)<sup>2</sup>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                Squaring makes negative and positive residuals contribute
                positively, and it penalises large deviations more strongly.
              </p>

              <ConceptCard title="Why not just minimise residuals?" tone="rose">
                If we added residuals without squaring, positive and negative
                errors could cancel out. A very poor line could appear to have a
                small total error. Squaring prevents this cancellation.
              </ConceptCard>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                6. Association is not automatically causation
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                A regression slope describes an association within a fitted
                model. It does not automatically prove that changing{" "}
                <InlineMath>X</InlineMath> would cause{" "}
                <InlineMath>Y</InlineMath> to change.
              </p>

              <Speaker name="Emma" initials="EM" tone="green">
                So if ice-cream sales and drowning incidents are associated,
                regression does not mean ice cream causes drowning?
              </Speaker>

              <Speaker name="Mr. R" initials="MR" tone="blue" right>
                Exactly. A third variable, such as hot weather, may affect both.
                Regression is powerful, but causal interpretation requires study
                design and assumptions.
              </Speaker>

              <div className="mt-10 rounded-[2rem] border border-blue-200 bg-blue-50 p-6">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
                  Key takeaways
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
                  <li>Simple linear regression uses one explanatory variable.</li>
                  <li>
                    The line models the conditional mean{" "}
                    <InlineMath>E(Y | X = x)</InlineMath>.
                  </li>
                  <li>
                    The model is{" "}
                    <InlineMath>
                      Y<sub>i</sub> = β<sub>0</sub> + β<sub>1</sub>X
                      <sub>i</sub> + ε<sub>i</sub>
                    </InlineMath>
                    .
                  </li>
                  <li>The slope is an average change in the mean of Y.</li>
                  <li>
                    A residual is observed minus fitted:{" "}
                    <InlineMath>
                      e<sub>i</sub> = y<sub>i</sub> − ŷ<sub>i</sub>
                    </InlineMath>
                    .
                  </li>
                  <li>
                    Least squares minimises the sum of squared residuals.
                  </li>
                  <li>
                    Regression association is not automatically causal.
                  </li>
                </ul>
              </div>
            </section>
          )}

          {tab === "notes" && (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <SectionTitle
                eyebrow="Detailed notes"
                title="Simple linear regression as a mathematical model"
              >
                These notes formalise the lecture using population parameters,
                sample estimates, fitted values, residuals and least-squares
                notation.
              </SectionTitle>

              <h3 className="text-2xl font-black tracking-tight">
                1. Regression as conditional expectation
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                The key object in regression is the conditional expectation of
                an outcome given a predictor. Instead of asking only whether two
                variables are related, regression asks how the mean of the
                outcome changes across values of the predictor.
              </p>

              <MathBox>
                E(Y | X = x) = β<sub>0</sub> + β<sub>1</sub>x
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                This is the population regression line. In real data, the true
                values of{" "}
                <InlineMath>
                  β<sub>0</sub>
                </InlineMath>{" "}
                and{" "}
                <InlineMath>
                  β<sub>1</sub>
                </InlineMath>{" "}
                are unknown.
              </p>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                2. Population model and assumptions
              </h3>

              <MathBox>
                Y<sub>i</sub> = β<sub>0</sub> + β<sub>1</sub>X<sub>i</sub> + ε
                <sub>i</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                A common condition is that the error has mean zero conditional
                on the predictor:
              </p>

              <MathBox>
                E(ε<sub>i</sub> | X<sub>i</sub>) = 0
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                Under this condition:
              </p>

              <MathBox>
                E(Y<sub>i</sub> | X<sub>i</sub>) = β<sub>0</sub> + β
                <sub>1</sub>X<sub>i</sub>
              </MathBox>

              <ConceptCard title="Meaning of the mean-zero error assumption" tone="blue">
                This assumption says that, once we know X, the remaining
                unexplained part has no systematic average pattern. If the error
                still contains systematic information related to X, the fitted
                slope may be misleading.
              </ConceptCard>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                3. Slope derivation as a mean difference
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                The slope can be shown directly by comparing the modelled mean
                at two values separated by one unit.
              </p>

              <MathBox>
                E(Y | X = x + 1) = β<sub>0</sub> + β<sub>1</sub>(x + 1)
              </MathBox>

              <MathBox>
                E(Y | X = x) = β<sub>0</sub> + β<sub>1</sub>x
              </MathBox>

              <MathBox>
                E(Y | X = x + 1) − E(Y | X = x) = β<sub>1</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                Therefore,{" "}
                <InlineMath>
                  β<sub>1</sub>
                </InlineMath>{" "}
                is the change in the conditional mean for a one-unit increase in{" "}
                <InlineMath>X</InlineMath>.
              </p>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                4. Intercept interpretation
              </h3>

              <MathBox>
                β<sub>0</sub> = E(Y | X = 0)
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                The intercept is meaningful only if{" "}
                <InlineMath>X = 0</InlineMath> is meaningful and within the
                relevant range of the data. For example, if{" "}
                <InlineMath>X</InlineMath> is age in adults, then{" "}
                <InlineMath>X = 0</InlineMath> may be outside the scientific
                scope.
              </p>

              <ConceptCard title="Interpretation warning" tone="amber">
                The intercept is often necessary mathematically even when it is
                not substantively meaningful. Never force a real-world story
                onto an intercept that represents extrapolation.
              </ConceptCard>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                5. Fitted line and residuals
              </h3>

              <MathBox>
                ŷ<sub>i</sub> = b<sub>0</sub> + b<sub>1</sub>x<sub>i</sub>
              </MathBox>

              <MathBox>
                e<sub>i</sub> = y<sub>i</sub> − ŷ<sub>i</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                The fitted value is the model's estimated mean outcome at{" "}
                <InlineMath>
                  x<sub>i</sub>
                </InlineMath>
                . The residual is the vertical distance between the observed
                outcome and the fitted line.
              </p>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                6. Least squares objective
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Ordinary least squares chooses{" "}
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

              <p className="text-base leading-8 text-slate-600">
                Lesson 5.2 will derive the formulas:
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

              <MathBox>
                b<sub>0</sub> = ȳ − b<sub>1</sub>x̄
              </MathBox>

              <ConceptCard title="Connection with covariance and variance" tone="green">
                The slope is covariance-like variation between X and Y divided
                by variance-like variation in X. If X and Y move together
                positively, the slope is positive. If they move in opposite
                directions, the slope is negative.
              </ConceptCard>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                7. Prediction versus explanation
              </h3>

              <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full border-collapse text-sm">
                  <thead className="bg-slate-50 text-left">
                    <tr>
                      <th className="border-b border-slate-200 px-4 py-3 font-black">
                        Goal
                      </th>
                      <th className="border-b border-slate-200 px-4 py-3 font-black">
                        Main question
                      </th>
                      <th className="border-b border-slate-200 px-4 py-3 font-black">
                        Main concern
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-600">
                    <tr>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Description
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        What pattern is visible in the data?
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Clear summary and interpretation
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Prediction
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        How accurately can Y be predicted?
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Prediction error and generalisation
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Explanation or causal thinking</td>
                      <td className="px-4 py-3">
                        How does Y change with X, after considering design?
                      </td>
                      <td className="px-4 py-3">
                        Confounding, assumptions and study design
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
                  title="Move the regression line and watch residuals change"
                >
                  Adjust the slope, intercept and noise. Watch how the fitted
                  line, residuals and sum of squared errors respond.
                </SectionTitle>

                <div className="grid gap-5 md:grid-cols-3">
                  <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <span className="text-sm font-black text-slate-700">
                      Slope: {slope.toFixed(1)}
                    </span>
                    <input
                      type="range"
                      min="-0.5"
                      max="2.5"
                      step="0.1"
                      value={slope}
                      onChange={(e) => setSlope(Number(e.target.value))}
                      className="mt-4 w-full accent-blue-700"
                    />
                  </label>

                  <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <span className="text-sm font-black text-slate-700">
                      Intercept: {intercept.toFixed(1)}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="8"
                      step="0.1"
                      value={intercept}
                      onChange={(e) => setIntercept(Number(e.target.value))}
                      className="mt-4 w-full accent-blue-700"
                    />
                  </label>

                  <label className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <span className="text-sm font-black text-slate-700">
                      Noise: {noise.toFixed(1)}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.1"
                      value={noise}
                      onChange={(e) => setNoise(Number(e.target.value))}
                      className="mt-4 w-full accent-blue-700"
                    />
                  </label>
                </div>

                <div className="mt-6">
                  <RegressionSvg
                    slope={slope}
                    intercept={intercept}
                    noise={noise}
                  />
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <h3 className="text-2xl font-black tracking-tight">
                  What to notice
                </h3>

                <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-8 text-slate-600">
                  <li>
                    Changing the <strong>slope</strong> rotates the line and
                    changes how sharply the mean of Y changes with X.
                  </li>
                  <li>
                    Changing the <strong>intercept</strong> shifts the whole line
                    up or down.
                  </li>
                  <li>
                    Increasing <strong>noise</strong> makes the points scatter
                    more widely around the line.
                  </li>
                  <li>
                    Large residuals contribute strongly to SSE because residuals
                    are squared.
                  </li>
                </ul>
              </div>
            </section>
          )}

          {tab === "examples" && (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <SectionTitle
                eyebrow="Worked examples"
                title="Interpreting a simple regression model"
              >
                These examples show how to translate equations into careful
                statistical language.
              </SectionTitle>

              <div className="space-y-8">
                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
                    Example 1
                  </p>
                  <h3 className="mt-2 text-xl font-black">
                    Age and systolic blood pressure
                  </h3>

                  <p className="mt-4 text-base leading-8 text-slate-600">
                    Suppose the fitted regression line is:
                  </p>

                  <MathBox>ŷ = 92 + 0.72 × age</MathBox>

                  <p className="text-base leading-8 text-slate-600">
                    Interpretation:
                  </p>

                  <ul className="list-disc space-y-2 pl-5 text-base leading-8 text-slate-600">
                    <li>
                      The slope 0.72 means the modelled mean systolic blood
                      pressure is 0.72 units higher for each additional year of
                      age, on average.
                    </li>
                    <li>
                      The intercept 92 is the modelled mean blood pressure at
                      age 0. This may not be scientifically meaningful if the
                      data are adults only.
                    </li>
                    <li>
                      For age 50, the fitted value is{" "}
                      <InlineMath>92 + 0.72 × 50 = 128</InlineMath>.
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
                    Example 2
                  </p>
                  <h3 className="mt-2 text-xl font-black">
                    Fitted value and residual
                  </h3>

                  <p className="mt-4 text-base leading-8 text-slate-600">
                    Suppose the fitted model is:
                  </p>

                  <MathBox>ŷ = 10 + 2x</MathBox>

                  <p className="text-base leading-8 text-slate-600">
                    For an observation with{" "}
                    <InlineMath>x = 4</InlineMath> and{" "}
                    <InlineMath>y = 21</InlineMath>:
                  </p>

                  <MathBox>ŷ = 10 + 2(4) = 18</MathBox>

                  <MathBox>e = y − ŷ = 21 − 18 = 3</MathBox>

                  <p className="text-base leading-8 text-slate-600">
                    The residual is positive because the observed value is above
                    the fitted line.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
                    Example 3
                  </p>
                  <h3 className="mt-2 text-xl font-black">
                    Why wording matters
                  </h3>

                  <p className="mt-4 text-base leading-8 text-slate-600">
                    Suppose a regression of exam score on hours studied gives:
                  </p>

                  <MathBox>ŷ = 48 + 5.5 × hours</MathBox>

                  <p className="text-base leading-8 text-slate-600">
                    A careful interpretation is:
                  </p>

                  <ConceptCard title="Careful interpretation" tone="green">
                    For each additional hour studied, the modelled mean exam
                    score is 5.5 points higher, on average, within the range of
                    the observed data.
                  </ConceptCard>

                  <p className="text-base leading-8 text-slate-600">
                    A careless interpretation would be:
                  </p>

                  <ConceptCard title="Careless interpretation" tone="rose">
                    One extra hour of studying definitely causes every student
                    to gain exactly 5.5 points.
                  </ConceptCard>
                </div>
              </div>
            </section>
          )}

          {tab === "exercises" && (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <SectionTitle
                eyebrow="Exercises"
                title="Practice simple linear regression interpretation"
              >
                Try each question first, then open the answer.
              </SectionTitle>

              {[
                {
                  title: "Interpret a slope",
                  question:
                    "A fitted model for cholesterol using age is ŷ = 145 + 1.1 × age. Interpret the slope carefully.",
                  answer:
                    "The slope 1.1 means that for each one-year increase in age, the modelled mean cholesterol is 1.1 units higher, on average, within the range of the observed data.",
                },
                {
                  title: "Compute a fitted value",
                  question:
                    "Using ŷ = 12 + 3x, calculate the fitted value when x = 7.",
                  answer:
                    "Substitute x = 7: ŷ = 12 + 3(7) = 12 + 21 = 33.",
                },
                {
                  title: "Compute a residual",
                  question:
                    "Using ŷ = 12 + 3x, suppose x = 7 and the observed value is y = 29. Calculate the residual and interpret its sign.",
                  answer:
                    "The fitted value is 33. The residual is e = y − ŷ = 29 − 33 = −4. The residual is negative, so the observed value is below the fitted line.",
                },
                {
                  title: "Interpret an intercept",
                  question:
                    "A model for adult income using years of education is ŷ = 9000 + 2500 × education. What does the intercept mean, and should we trust it?",
                  answer:
                    "The intercept is the modelled mean income when education = 0 years. Whether it is meaningful depends on whether 0 years of education is relevant and represented in the data. If not, the intercept is mainly a mathematical anchor.",
                },
                {
                  title: "Association versus causation",
                  question:
                    "A regression shows that people who exercise more have lower resting heart rate. Does the slope prove exercise caused the lower heart rate?",
                  answer:
                    "No. The slope describes an association. Causal interpretation would require assumptions and design considerations. Other factors such as age, baseline health, diet or smoking could confound the relationship.",
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
              <SectionTitle
                eyebrow="Quiz"
                title="Check your understanding"
              >
                This quiz focuses on interpretation, residuals and the meaning
                of least squares.
              </SectionTitle>

              <Quiz />
            </section>
          )}
        </div>
      </section>
    </main>
  );
}