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
    active: true,
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

function ConfoundingLab() {
  const [confoundingStrength, setConfoundingStrength] = useState(1.4);

  const data = useMemo(() => {
    const low = Array.from({ length: 9 }, (_, i) => {
      const exposure = 1 + i * 0.45;
      const confounder = 0;
      const outcome =
        8 + 1.2 * exposure + confoundingStrength * 0 + Math.sin(i * 1.4) * 0.45;
      return { exposure, outcome, confounder };
    });

    const high = Array.from({ length: 9 }, (_, i) => {
      const exposure = 3.5 + i * 0.45;
      const confounder = 1;
      const outcome =
        8 +
        1.2 * exposure +
        confoundingStrength * 4 +
        Math.cos(i * 1.2) * 0.55;
      return { exposure, outcome, confounder };
    });

    return [...low, ...high];
  }, [confoundingStrength]);

  function regressionSlope(points: { exposure: number; outcome: number }[]) {
    const xBar =
      points.reduce((sum, p) => sum + p.exposure, 0) / points.length;
    const yBar = points.reduce((sum, p) => sum + p.outcome, 0) / points.length;

    const numerator = points.reduce(
      (sum, p) => sum + (p.exposure - xBar) * (p.outcome - yBar),
      0
    );
    const denominator = points.reduce(
      (sum, p) => sum + (p.exposure - xBar) ** 2,
      0
    );

    return numerator / denominator;
  }

  function regressionIntercept(
    points: { exposure: number; outcome: number }[],
    slope: number
  ) {
    const xBar =
      points.reduce((sum, p) => sum + p.exposure, 0) / points.length;
    const yBar = points.reduce((sum, p) => sum + p.outcome, 0) / points.length;
    return yBar - slope * xBar;
  }

  const crudeSlope = regressionSlope(data);
  const crudeIntercept = regressionIntercept(data, crudeSlope);

  const group0 = data.filter((p) => p.confounder === 0);
  const group1 = data.filter((p) => p.confounder === 1);

  const slope0 = regressionSlope(group0);
  const intercept0 = regressionIntercept(group0, slope0);
  const slope1 = regressionSlope(group1);
  const intercept1 = regressionIntercept(group1, slope1);

  const width = 620;
  const height = 360;
  const pad = 50;
  const xMin = 0;
  const xMax = 8;
  const yMin = 6;
  const yMax = 25;

  const sx = (x: number) => pad + ((x - xMin) / (xMax - xMin)) * (width - 2 * pad);
  const sy = (y: number) =>
    height - pad - ((y - yMin) / (yMax - yMin)) * (height - 2 * pad);

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
            Confounding strength
          </p>
          <p className="mt-1 text-2xl font-black text-slate-950">
            {confoundingStrength.toFixed(1)}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
            Crude slope
          </p>
          <p className="mt-1 text-2xl font-black text-slate-950">
            {crudeSlope.toFixed(2)}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
            Within-group slopes
          </p>
          <p className="mt-1 text-2xl font-black text-slate-950">
            {((slope0 + slope1) / 2).toFixed(2)}
          </p>
        </div>
      </div>

      <label className="mt-6 block rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <span className="text-sm font-black text-slate-700">
          Increase the effect of the confounder
        </span>
        <input
          type="range"
          min="0"
          max="2.6"
          step="0.1"
          value={confoundingStrength}
          onChange={(e) => setConfoundingStrength(Number(e.target.value))}
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
          y1={sy(crudeIntercept + crudeSlope * 0.5)}
          x2={sx(7.5)}
          y2={sy(crudeIntercept + crudeSlope * 7.5)}
          stroke="#0f172a"
          strokeWidth="3"
        />

        <line
          x1={sx(0.5)}
          y1={sy(intercept0 + slope0 * 0.5)}
          x2={sx(7.5)}
          y2={sy(intercept0 + slope0 * 7.5)}
          stroke="#2563eb"
          strokeWidth="3"
          strokeDasharray="7 5"
        />

        <line
          x1={sx(0.5)}
          y1={sy(intercept1 + slope1 * 0.5)}
          x2={sx(7.5)}
          y2={sy(intercept1 + slope1 * 7.5)}
          stroke="#dc2626"
          strokeWidth="3"
          strokeDasharray="7 5"
        />

        {data.map((p, i) => (
          <circle
            key={i}
            cx={sx(p.exposure)}
            cy={sy(p.outcome)}
            r="6"
            fill={p.confounder === 0 ? "#2563eb" : "#dc2626"}
          />
        ))}

        <text x={sx(4.7)} y={sy(crudeIntercept + crudeSlope * 4.7) - 12} fontSize="13" fill="#0f172a">
          crude line
        </text>

        <text x={width / 2} y={height - 10} textAnchor="middle" fontSize="13" fill="#475569">
          Exposure X
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
        Blue and red points represent two levels of a confounder. The black line
        is the crude unadjusted regression line. The dashed lines show
        within-confounder relationships. As the confounder becomes stronger, the
        crude slope can move away from the within-group relationship.
      </p>
    </div>
  );
}

const quizQuestions = [
  {
    question: "What does a coefficient in multiple regression usually represent?",
    options: [
      "The exact outcome value for one individual",
      "An adjusted association holding other model predictors fixed",
      "The marginal mean of the outcome only",
      "The total sample size",
    ],
    answer: 1,
    explanation:
      "In multiple regression, a coefficient is interpreted as the expected change in mean Y for a one-unit increase in that predictor, holding other model predictors fixed.",
  },
  {
    question: "What is confounding?",
    options: [
      "Random variation around a fitted line",
      "A variable mixing or distorting an exposure-outcome association",
      "A predictor with no relationship to the outcome",
      "A residual that equals zero",
    ],
    answer: 1,
    explanation:
      "Confounding occurs when another variable is related to both the exposure and outcome and distorts the exposure-outcome association.",
  },
  {
    question: "Which expression describes omitted-variable bias in a simple linear setting?",
    options: [
      "β₂ × Cov(X, Z) / Var(X)",
      "Var(Y) / Var(X)",
      "β₁ + β₀",
      "Σeᵢ = 0",
    ],
    answer: 0,
    explanation:
      "When Z is omitted from a true model containing X and Z, the bias in the coefficient of X depends on the effect of Z on Y and the association between X and Z.",
  },
  {
    question: "Why is adding more variables not always better?",
    options: [
      "Because all variables must be categorical",
      "Because adjustment can introduce bias if variables are inappropriate, such as colliders or mediators",
      "Because multiple regression cannot use numerical predictors",
      "Because adding variables always makes R² zero",
    ],
    answer: 1,
    explanation:
      "Adjustment is useful only when variables are appropriate for the research question. Adjusting for the wrong variables can harm interpretation.",
  },
  {
    question: "What is multicollinearity?",
    options: [
      "A strong relationship among predictors",
      "A perfectly random outcome",
      "A binary outcome coded incorrectly",
      "A residual plot with no pattern",
    ],
    answer: 0,
    explanation:
      "Multicollinearity occurs when predictors are strongly related to each other, making individual coefficient estimates unstable.",
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
          This score reflects your understanding of adjusted coefficients,
          confounding, omitted-variable bias and multicollinearity.
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

export default function MultipleRegressionConfoundingLessonPage() {
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
              Module 5 · Lesson 5.3
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">
              Multiple Regression and Confounding
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              Learn how regression changes when we include more than one
              predictor. This lesson explains adjusted coefficients,
              confounding, omitted-variable bias, categorical predictors,
              multicollinearity and careful model interpretation.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-400">
              Lesson focus
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
              <li>Multiple regression model</li>
              <li>Adjusted coefficients</li>
              <li>Confounding</li>
              <li>Omitted-variable bias</li>
              <li>Categorical predictors</li>
              <li>Multicollinearity</li>
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
                title="One predictor is rarely enough"
              >
                Simple regression uses one explanatory variable. Multiple
                regression allows us to model an outcome using several
                predictors and to interpret adjusted relationships.
              </SectionTitle>

              <div className="rounded-2xl bg-slate-50 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-slate-500">
                Scene: Mr. R’s classroom, after least squares
              </div>

              <Speaker name="Emma" initials="EM" tone="green">
                Simple regression used one predictor. But real outcomes usually
                depend on many things. Is that why we need multiple regression?
              </Speaker>

              <Speaker name="Mr. R" initials="MR" tone="blue" right>
                Exactly. Multiple regression lets us model the mean of an
                outcome using more than one explanatory variable.
              </Speaker>

              <Speaker name="Oliver" initials="OL" tone="amber">
                Is this where adjustment comes in?
              </Speaker>

              <Speaker name="Mr. R" initials="MR" tone="blue" right>
                Yes. But adjustment is not just a technical step. It changes
                what a coefficient means.
              </Speaker>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                1. The multiple regression model
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                With <InlineMath>p</InlineMath> predictors, the population model
                is:
              </p>

              <MathBox>
                Y<sub>i</sub> = β<sub>0</sub> + β<sub>1</sub>X<sub>1i</sub> +
                β<sub>2</sub>X<sub>2i</sub> + ... + β<sub>p</sub>X
                <sub>pi</sub> + ε<sub>i</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                The conditional mean model is:
              </p>

              <MathBox>
                E(Y<sub>i</sub> | X<sub>1i</sub>, X<sub>2i</sub>, ..., X
                <sub>pi</sub>) = β<sub>0</sub> + β<sub>1</sub>X<sub>1i</sub> +
                β<sub>2</sub>X<sub>2i</sub> + ... + β<sub>p</sub>X
                <sub>pi</sub>
              </MathBox>

              <ConceptCard title="Core idea" tone="blue">
                Multiple regression is still conditional mean modelling. The
                difference is that the mean is now conditional on several
                predictors rather than just one.
              </ConceptCard>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                2. Interpreting an adjusted coefficient
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                In the model below:
              </p>

              <MathBox>
                Y<sub>i</sub> = β<sub>0</sub> + β<sub>1</sub>X<sub>i</sub> +
                β<sub>2</sub>Z<sub>i</sub> + ε<sub>i</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                The coefficient{" "}
                <InlineMath>
                  β<sub>1</sub>
                </InlineMath>{" "}
                is the expected change in the mean of{" "}
                <InlineMath>Y</InlineMath> for a one-unit increase in{" "}
                <InlineMath>X</InlineMath>, holding{" "}
                <InlineMath>Z</InlineMath> fixed.
              </p>

              <Speaker name="James" initials="JA" tone="purple">
                What does “holding Z fixed” mean in real life?
              </Speaker>

              <Speaker name="Mr. R" initials="MR" tone="blue" right>
                It means comparing observations that have the same value of Z,
                at least conceptually. For example, comparing people of the same
                age but with different exposure values.
              </Speaker>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                3. Unadjusted versus adjusted models
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                An unadjusted model includes only the exposure of interest:
              </p>

              <MathBox>
                Y<sub>i</sub> = α<sub>0</sub> + α<sub>1</sub>X<sub>i</sub> + u
                <sub>i</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                An adjusted model includes additional predictors:
              </p>

              <MathBox>
                Y<sub>i</sub> = β<sub>0</sub> + β<sub>1</sub>X<sub>i</sub> +
                β<sub>2</sub>Z<sub>i</sub> + ε<sub>i</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                The coefficients{" "}
                <InlineMath>
                  α<sub>1</sub>
                </InlineMath>{" "}
                and{" "}
                <InlineMath>
                  β<sub>1</sub>
                </InlineMath>{" "}
                can differ because they answer different comparison questions.
              </p>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                4. Confounding
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Confounding occurs when the association between an exposure{" "}
                <InlineMath>X</InlineMath> and an outcome{" "}
                <InlineMath>Y</InlineMath> is mixed with the influence of
                another variable <InlineMath>Z</InlineMath>.
              </p>

              <ConceptCard title="Confounder" tone="amber">
                A confounder is a variable associated with the exposure and the
                outcome that can distort the exposure-outcome association if it
                is not appropriately controlled.
              </ConceptCard>

              <Speaker name="Sophia" initials="SO" tone="rose">
                Can you give a simple example?
              </Speaker>

              <Speaker name="Mr. R" initials="MR" tone="blue" right>
                Suppose coffee drinking is associated with heart disease. If
                smoking is more common among coffee drinkers and smoking affects
                heart disease risk, smoking may confound the coffee-heart
                disease association.
              </Speaker>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                5. Omitted-variable bias
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Suppose the true model is:
              </p>

              <MathBox>
                Y = β<sub>0</sub> + β<sub>1</sub>X + β<sub>2</sub>Z + ε
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                But we omit <InlineMath>Z</InlineMath> and fit:
              </p>

              <MathBox>
                Y = α<sub>0</sub> + α<sub>1</sub>X + u
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                Then the simple regression coefficient{" "}
                <InlineMath>
                  α<sub>1</sub>
                </InlineMath>{" "}
                may be biased for{" "}
                <InlineMath>
                  β<sub>1</sub>
                </InlineMath>
                .
              </p>

              <MathBox>
                α<sub>1</sub> − β<sub>1</sub> = β<sub>2</sub>{" "}
                <Fraction top="Cov(X, Z)" bottom="Var(X)" />
              </MathBox>

              <ConceptCard title="What the formula teaches" tone="green">
                Omitted-variable bias requires two ingredients: the omitted
                variable must affect the outcome, and it must be associated with
                the exposure.
              </ConceptCard>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                6. Adjustment is not automatic truth
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Adding variables to a regression model does not automatically
                make the analysis correct or causal. Adjustment helps only when
                the variables are appropriate for the research question.
              </p>

              <Speaker name="Emma" initials="EM" tone="green">
                So more variables is not always better?
              </Speaker>

              <Speaker name="Mr. R" initials="MR" tone="blue" right>
                Exactly. Adjusting for mediators, colliders or poorly measured
                variables can create new problems.
              </Speaker>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                7. Multicollinearity
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Multicollinearity occurs when predictors are strongly related to
                each other. It can make individual coefficients unstable and
                hard to interpret.
              </p>

              <MathBox>
                X<sub>1</sub> ≈ a + bX<sub>2</sub>
              </MathBox>

              <ConceptCard title="Prediction versus interpretation" tone="purple">
                A model with multicollinearity may still predict reasonably, but
                the individual coefficient estimates may be unstable. Prediction
                and interpretation are different goals.
              </ConceptCard>
            </section>
          )}

          {tab === "notes" && (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <SectionTitle
                eyebrow="Detailed notes"
                title="Adjusted regression, confounding and omitted-variable bias"
              >
                These notes give a more formal explanation of multiple
                regression and why adjustment changes interpretation.
              </SectionTitle>

              <h3 className="text-2xl font-black tracking-tight">
                1. From simple to multiple regression
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Simple linear regression models:
              </p>

              <MathBox>
                E(Y | X) = β<sub>0</sub> + β<sub>1</sub>X
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                Multiple regression extends this to:
              </p>

              <MathBox>
                E(Y | X<sub>1</sub>, X<sub>2</sub>, ..., X<sub>p</sub>) = β
                <sub>0</sub> + β<sub>1</sub>X<sub>1</sub> + β<sub>2</sub>X
                <sub>2</sub> + ... + β<sub>p</sub>X<sub>p</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                The regression surface replaces the regression line. With two
                predictors, the fitted model is a plane. With more predictors,
                the geometry becomes higher-dimensional.
              </p>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                2. Adjusted coefficient interpretation
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                In the model:
              </p>

              <MathBox>
                Y<sub>i</sub> = β<sub>0</sub> + β<sub>1</sub>X<sub>1i</sub> +
                β<sub>2</sub>X<sub>2i</sub> + ... + β<sub>p</sub>X
                <sub>pi</sub> + ε<sub>i</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                The coefficient{" "}
                <InlineMath>
                  β<sub>j</sub>
                </InlineMath>{" "}
                is interpreted as the expected change in the conditional mean of
                Y for a one-unit increase in{" "}
                <InlineMath>
                  X<sub>j</sub>
                </InlineMath>
                , holding the other predictors fixed.
              </p>

              <MathBox>
                β<sub>j</sub> = change in E(Y | X<sub>1</sub>, ..., X
                <sub>p</sub>) for one-unit increase in X<sub>j</sub>
              </MathBox>

              <ConceptCard title="Important warning" tone="amber">
                “Holding fixed” is a mathematical comparison. Whether it
                corresponds to a meaningful real-world comparison depends on the
                data, measurement, study design and scientific question.
              </ConceptCard>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                3. Confounding conditions
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                A variable <InlineMath>Z</InlineMath> may confound the
                relationship between exposure <InlineMath>X</InlineMath> and
                outcome <InlineMath>Y</InlineMath> when:
              </p>

              <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-8 text-slate-600">
                <li>
                  <InlineMath>Z</InlineMath> is associated with{" "}
                  <InlineMath>X</InlineMath>.
                </li>
                <li>
                  <InlineMath>Z</InlineMath> is associated with{" "}
                  <InlineMath>Y</InlineMath>.
                </li>
                <li>
                  <InlineMath>Z</InlineMath> is not merely a consequence of{" "}
                  <InlineMath>X</InlineMath> on the causal pathway.
                </li>
              </ul>

              <ConceptCard title="Confounding as mixing" tone="blue">
                Confounding means that the crude association between X and Y
                partly reflects the influence of Z.
              </ConceptCard>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                4. Omitted-variable bias formula
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Suppose the true model is:
              </p>

              <MathBox>
                Y = β<sub>0</sub> + β<sub>1</sub>X + β<sub>2</sub>Z + ε
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                If <InlineMath>Z</InlineMath> is omitted, the simple regression
                slope for <InlineMath>X</InlineMath> has bias:
              </p>

              <MathBox>
                α<sub>1</sub> − β<sub>1</sub> = β<sub>2</sub>{" "}
                <Fraction top="Cov(X, Z)" bottom="Var(X)" />
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                This formula shows:
              </p>

              <MathBox>
                β<sub>2</sub> = 0 ⇒ no omitted-variable bias from Z
              </MathBox>

              <MathBox>Cov(X, Z) = 0 ⇒ no omitted-variable bias from Z</MathBox>

              <p className="text-base leading-8 text-slate-600">
                Bias appears when the omitted variable both matters for the
                outcome and is associated with the exposure.
              </p>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                5. Categorical predictors
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                A binary categorical predictor can be coded using an indicator
                variable:
              </p>

              <MathBox>
                G<sub>i</sub> = 1 if observation i is in the group; G
                <sub>i</sub> = 0 otherwise
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                In the model:
              </p>

              <MathBox>
                Y<sub>i</sub> = β<sub>0</sub> + β<sub>1</sub>G<sub>i</sub> +
                ε<sub>i</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                The intercept{" "}
                <InlineMath>
                  β<sub>0</sub>
                </InlineMath>{" "}
                is the mean for the reference group. The coefficient{" "}
                <InlineMath>
                  β<sub>1</sub>
                </InlineMath>{" "}
                is the mean difference between the group coded 1 and the group
                coded 0.
              </p>

              <h3 className="mt-10 text-2xl font-black tracking-tight">
                6. Multicollinearity
              </h3>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Multicollinearity means that one predictor can be predicted
                well from other predictors.
              </p>

              <MathBox>
                X<sub>1</sub> ≈ a + bX<sub>2</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-600">
                When predictors overlap strongly, the model struggles to
                separate their individual contributions.
              </p>

              <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full border-collapse text-sm">
                  <thead className="bg-slate-50 text-left">
                    <tr>
                      <th className="border-b border-slate-200 px-4 py-3 font-black">
                        Issue
                      </th>
                      <th className="border-b border-slate-200 px-4 py-3 font-black">
                        Meaning
                      </th>
                      <th className="border-b border-slate-200 px-4 py-3 font-black">
                        Consequence
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-600">
                    <tr>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Confounding
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Mixing of exposure-outcome association with another
                        variable
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Crude coefficient may be biased
                      </td>
                    </tr>
                    <tr>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Mediation
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Variable lies on the pathway from exposure to outcome
                      </td>
                      <td className="border-b border-slate-200 px-4 py-3">
                        Adjustment may remove part of the effect
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Multicollinearity</td>
                      <td className="px-4 py-3">
                        Predictors are strongly correlated
                      </td>
                      <td className="px-4 py-3">
                        Individual coefficients become unstable
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
                  title="See confounding distort a crude regression line"
                >
                  Increase the strength of a confounder and watch how the crude
                  unadjusted slope moves away from the within-group
                  relationship.
                </SectionTitle>

                <ConfoundingLab />
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <h3 className="text-2xl font-black tracking-tight">
                  What to notice
                </h3>

                <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-8 text-slate-600">
                  <li>
                    The crude line combines both the exposure relationship and
                    group differences.
                  </li>
                  <li>
                    The within-group dashed lines represent a more adjusted
                    comparison.
                  </li>
                  <li>
                    When the confounder strongly affects the outcome, the crude
                    slope can be misleading.
                  </li>
                  <li>
                    Adjustment changes the comparison being made, so the
                    interpretation of the coefficient changes.
                  </li>
                </ul>
              </div>
            </section>
          )}

          {tab === "examples" && (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <SectionTitle
                eyebrow="Worked examples"
                title="Interpreting adjusted regression models"
              >
                These examples show how to read coefficients in multiple
                regression carefully.
              </SectionTitle>

              <div className="space-y-8">
                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
                    Example 1
                  </p>

                  <h3 className="mt-2 text-xl font-black">
                    Age, exercise and blood pressure
                  </h3>

                  <p className="mt-4 text-base leading-8 text-slate-600">
                    Suppose the fitted model is:
                  </p>

                  <MathBox>
                    BP = 118 + 0.6 × age − 2.4 × exercise
                  </MathBox>

                  <p className="text-base leading-8 text-slate-600">
                    The coefficient of exercise is −2.4. A careful
                    interpretation is:
                  </p>

                  <ConceptCard title="Interpretation" tone="green">
                    Holding age fixed, each one-unit increase in exercise is
                    associated with a 2.4-unit lower modelled mean blood
                    pressure, on average.
                  </ConceptCard>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
                    Example 2
                  </p>

                  <h3 className="mt-2 text-xl font-black">
                    Omitted-variable bias direction
                  </h3>

                  <p className="mt-4 text-base leading-8 text-slate-600">
                    Suppose:
                  </p>

                  <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-8 text-slate-600">
                    <li>
                      <InlineMath>Z</InlineMath> increases{" "}
                      <InlineMath>Y</InlineMath>, so{" "}
                      <InlineMath>
                        β<sub>2</sub> &gt; 0
                      </InlineMath>
                      .
                    </li>
                    <li>
                      <InlineMath>X</InlineMath> and{" "}
                      <InlineMath>Z</InlineMath> are positively associated, so{" "}
                      <InlineMath>Cov(X, Z) &gt; 0</InlineMath>.
                    </li>
                  </ul>

                  <MathBox>
                    bias = β<sub>2</sub>{" "}
                    <Fraction top="Cov(X, Z)" bottom="Var(X)" />
                  </MathBox>

                  <p className="text-base leading-8 text-slate-600">
                    The bias is positive. The unadjusted coefficient for{" "}
                    <InlineMath>X</InlineMath> will tend to be too large.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
                    Example 3
                  </p>

                  <h3 className="mt-2 text-xl font-black">
                    Binary categorical predictor
                  </h3>

                  <p className="mt-4 text-base leading-8 text-slate-600">
                    Let{" "}
                    <InlineMath>
                      G = 1
                    </InlineMath>{" "}
                    for treatment group and{" "}
                    <InlineMath>
                      G = 0
                    </InlineMath>{" "}
                    for control group. Suppose:
                  </p>

                  <MathBox>
                    Y = 14 + 3G + 0.5 × age
                  </MathBox>

                  <p className="text-base leading-8 text-slate-600">
                    The coefficient 3 means:
                  </p>

                  <ConceptCard title="Interpretation" tone="blue">
                    Holding age fixed, the treatment group has a modelled mean
                    outcome 3 units higher than the control group, on average.
                  </ConceptCard>
                </div>
              </div>
            </section>
          )}

          {tab === "exercises" && (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <SectionTitle
                eyebrow="Exercises"
                title="Practice multiple regression interpretation"
              >
                Try each question first, then open the answer.
              </SectionTitle>

              {[
                {
                  title: "Interpret an adjusted coefficient",
                  question:
                    "A model is fitted as exam score = 40 + 4 × study hours + 2 × attendance. Interpret the coefficient of study hours.",
                  answer:
                    "Holding attendance fixed, each additional study hour is associated with a 4-point higher modelled mean exam score, on average.",
                },
                {
                  title: "Identify possible confounding",
                  question:
                    "A crude model shows coffee drinking is associated with heart disease. Smoking is related to coffee drinking and heart disease. What role might smoking play?",
                  answer:
                    "Smoking may be a confounder because it is associated with the exposure and the outcome. Failing to adjust for it may distort the coffee-heart disease association.",
                },
                {
                  title: "Use the omitted-variable bias formula",
                  question:
                    "If β₂ > 0 and Cov(X, Z) < 0, what is the direction of omitted-variable bias?",
                  answer:
                    "The bias is negative because β₂ is positive and Cov(X, Z) is negative. The unadjusted coefficient for X would tend to be too small.",
                },
                {
                  title: "Categorical predictor interpretation",
                  question:
                    "In a model Y = 20 + 5G, where G = 1 for group A and G = 0 for group B, interpret the coefficient of G.",
                  answer:
                    "Group A has a modelled mean outcome 5 units higher than group B. Group B is the reference group.",
                },
                {
                  title: "Multicollinearity",
                  question:
                    "Two predictors, height in cm and height in inches, are included in the same regression model. What problem may occur?",
                  answer:
                    "Severe multicollinearity may occur because the two predictors contain almost identical information. Individual coefficient estimates may become unstable or hard to interpret.",
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
                This quiz focuses on adjusted coefficients, confounding,
                omitted-variable bias, categorical predictors and
                multicollinearity.
              </SectionTitle>

              <Quiz />
            </section>
          )}
        </div>
      </section>
    </main>
  );
}