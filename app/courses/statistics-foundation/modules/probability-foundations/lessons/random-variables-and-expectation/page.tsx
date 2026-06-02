"use client";

import { useMemo, useState } from "react";

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
    question: "What is a random variable?",
    options: [
      "A number already observed in a dataset",
      "A function that assigns a numerical value to each outcome of a random experiment",
      "Any variable with missing values",
      "A probability value between 0 and 1",
    ],
    answer: 1,
    explanation:
      "A random variable is a function from the sample space to the real numbers. It turns uncertain outcomes into numerical values.",
  },
  {
    question: "For a discrete random variable X, what does the PMF describe?",
    options: [
      "P(X = x) for each possible value x",
      "Only the largest possible value of X",
      "The median of X",
      "The continuous density curve of X",
    ],
    answer: 0,
    explanation:
      "The probability mass function gives the probability attached to each possible value of a discrete random variable.",
  },
  {
    question: "Which formula gives the expected value of a discrete random variable?",
    options: [
      "E(X) = sum of all probabilities",
      "E(X) = sum of x times P(X = x)",
      "E(X) = sum of all possible x values only",
      "E(X) = P(X > x)",
    ],
    answer: 1,
    explanation:
      "Expectation is a probability-weighted average: each possible value is multiplied by its probability.",
  },
  {
    question: "Which identity is useful for calculating variance?",
    options: [
      "Var(X) = E(X) − E(X squared)",
      "Var(X) = E(X squared) − [E(X)] squared",
      "Var(X) = E(X squared) + [E(X)] squared",
      "Var(X) = P(X = x)",
    ],
    answer: 1,
    explanation:
      "The computational shortcut is Var(X) = E(X²) − [E(X)]².",
  },
  {
    question: "Which statement about linearity of expectation is correct?",
    options: [
      "E(X + Y) = E(X) + E(Y) only if X and Y are independent",
      "E(X + Y) = E(X) + E(Y) whether or not X and Y are independent",
      "E(X + Y) is always zero",
      "E(aX + b) = E(X)",
    ],
    answer: 1,
    explanation:
      "Linearity of expectation does not require independence. This is one of the most powerful results in probability.",
  },
];

function MathBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-center text-base leading-8 text-slate-900">
      <div className="font-serif">{children}</div>
    </div>
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

function DistributionBarChart({
  probabilities,
}: {
  probabilities: number[];
}) {
  const max = Math.max(...probabilities);

  return (
    <div className="mt-5 space-y-3">
      {probabilities.map((p, index) => (
        <div key={index}>
          <div className="mb-1 flex justify-between text-xs font-bold text-slate-500">
            <span>X = {index}</span>
            <span>{p.toFixed(2)}</span>
          </div>

          <div className="h-8 overflow-hidden rounded-full bg-slate-100">
            <div
              className="flex h-full items-center justify-end rounded-full bg-blue-600 pr-3 text-xs font-black text-white transition-all"
              style={{ width: `${max === 0 ? 0 : (p / max) * 100}%` }}
            >
              {p.toFixed(2)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ExpectationVarianceLab() {
  const [p0, setP0] = useState(0.1);
  const [p1, setP1] = useState(0.2);
  const [p2, setP2] = useState(0.3);

  const values = useMemo(() => {
    const raw = [p0, p1, p2];
    const rawSum = raw.reduce((a, b) => a + b, 0);
    const p3 = Math.max(0.01, 1 - rawSum);

    const probabilities =
      rawSum >= 0.99 ? raw.map((p) => p / rawSum) : [p0, p1, p2, p3];

    const finalSum = probabilities.reduce((a, b) => a + b, 0);
    const normalised = probabilities.map((p) => p / finalSum);

    const expectation = normalised.reduce((sum, p, x) => sum + x * p, 0);
    const ex2 = normalised.reduce((sum, p, x) => sum + x * x * p, 0);
    const variance = ex2 - expectation * expectation;
    const sd = Math.sqrt(variance);

    return {
      probabilities: normalised,
      expectation,
      ex2,
      variance,
      sd,
    };
  }, [p0, p1, p2]);

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Interactive expectation and variance lab
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        Build a probability distribution for X = 0, 1, 2, 3. The final
        probabilities are automatically normalised so that they sum to 1. Watch
        how the expected value, E(X²), variance and standard deviation change.
      </p>

      <MathBox>
        E(X) = ∑<sub>x</sub> xP(X = x)
        <br />
        Var(X) = E(X<sup>2</sup>) − [E(X)]<sup>2</sup>
      </MathBox>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Raw weight for X = 0</span>
            <span>{p0.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.01"
            max="0.95"
            step="0.01"
            value={p0}
            onChange={(e) => setP0(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Raw weight for X = 1</span>
            <span>{p1.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.01"
            max="0.95"
            step="0.01"
            value={p1}
            onChange={(e) => setP1(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Raw weight for X = 2</span>
            <span>{p2.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.01"
            max="0.95"
            step="0.01"
            value={p2}
            onChange={(e) => setP2(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>

      <DistributionBarChart probabilities={values.probabilities} />

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            E(X)
          </p>
          <p className="mt-2 text-3xl font-black">
            {values.expectation.toFixed(3)}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-100 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
            E(X²)
          </p>
          <p className="mt-2 text-3xl font-black">{values.ex2.toFixed(3)}</p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">
            Var(X)
          </p>
          <p className="mt-2 text-3xl font-black">
            {values.variance.toFixed(3)}
          </p>
        </div>

        <div className="rounded-2xl bg-amber-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">
            SD(X)
          </p>
          <p className="mt-2 text-3xl font-black">{values.sd.toFixed(3)}</p>
        </div>
      </div>
    </div>
  );
}

function BernoulliIndicatorLab() {
  const [p, setP] = useState(0.65);

  const mean = p;
  const variance = p * (1 - p);
  const sd = Math.sqrt(variance);

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Indicator variable lab
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        An indicator variable equals 1 if an event occurs and 0 otherwise. This
        makes indicators one of the most useful tools in probability.
      </p>

      <MathBox>
        I<sub>A</sub> = 1 if A occurs, 0 otherwise
        <br />
        E(I<sub>A</sub>) = P(A)
      </MathBox>

      <label className="mt-6 block">
        <div className="mb-2 flex justify-between text-sm font-bold">
          <span>Probability of event A</span>
          <span>{p.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0.01"
          max="0.99"
          step="0.01"
          value={p}
          onChange={(e) => setP(Number(e.target.value))}
          className="w-full"
        />
      </label>

      <div className="mt-6 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">
            P(I = 1)
          </p>
          <p className="mt-2 text-3xl font-black">{p.toFixed(2)}</p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">
            P(I = 0)
          </p>
          <p className="mt-2 text-3xl font-black">{(1 - p).toFixed(2)}</p>
        </div>

        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            E(I)
          </p>
          <p className="mt-2 text-3xl font-black">{mean.toFixed(2)}</p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">
            Var(I)
          </p>
          <p className="mt-2 text-3xl font-black">{variance.toFixed(3)}</p>
        </div>

        <div className="rounded-2xl bg-amber-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">
            SD(I)
          </p>
          <p className="mt-2 text-3xl font-black">{sd.toFixed(3)}</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-amber-50 p-5">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-800">
          Advanced insight
        </p>
        <p className="mt-2 text-sm leading-7 text-amber-950">
          Indicator variables allow counts to be written as sums. If X is the
          number of successes in n trials, then X = I<sub>1</sub> + I
          <sub>2</sub> + ... + I<sub>n</sub>. This idea leads directly to the
          binomial distribution.
        </p>
      </div>
    </div>
  );
}

export default function RandomVariablesExpectationLessonPage() {
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
                "/courses/statistics-foundation/modules/probability-foundations"
              )}
              className="text-sm font-bold text-blue-700 hover:text-blue-900"
            >
              ← Back to Module 3
            </a>

            <p className="mt-5 text-sm font-black uppercase tracking-[0.22em] text-blue-700">
              Module 3 · Lesson 3.3
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">
              Random Variables and Expectation
            </h1>

            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600">
              Move from events to numerical uncertainty. This lesson explains
              random variables as functions, probability distributions, PMFs,
              CDFs, expectation, variance, transformations, linearity and
              indicator variables.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
              Lesson structure
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Lecture · Detailed notes · Interactive lab · Worked examples ·
              Exercises · Quiz
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
                  So far, probability has been about events like A, B, disease,
                  positive test and overlaps. But statistics usually works with
                  numbers. Where do numbers enter probability?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Numbers enter through random variables. A random variable
                  converts uncertain outcomes into numerical values.
                </DialogueLine>

                <DialogueLine speaker="OL" name="Oliver">
                  So a random variable is not just a column in a spreadsheet?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Not exactly. A spreadsheet variable is already observed. A
                  random variable is mathematical. It represents a numerical
                  quantity before its value is known.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="Why random variables are needed">
              <p className="text-base leading-8 text-slate-700">
                Probability begins with outcomes. But many outcomes are not
                naturally numerical. For example, if three coins are tossed, one
                possible outcome is HHT. Another is THT. These are outcomes, not
                numbers.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-700">
                A statistician may not care about the exact sequence. They may
                care about the number of heads. So we define a random variable X
                as the number of heads.
              </p>

              <MathBox>
                X(HHT) = 2
                <br />
                X(THT) = 1
                <br />
                X(TTT) = 0
              </MathBox>

              <div className="mt-6 rounded-2xl bg-blue-50 p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-800">
                  Big idea
                </p>
                <p className="mt-2 text-sm leading-7 text-blue-950">
                  A random variable is a function from outcomes to numbers. It
                  does not remove randomness; it expresses randomness
                  numerically.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="Random variable versus observed value">
              <div className="space-y-4">
                <DialogueLine speaker="JA" name="James">
                  If X is random, does that mean it changes forever?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Before the experiment, X is uncertain. After the experiment,
                  we observe one realised value of X.
                </DialogueLine>

                <DialogueLine speaker="SO" name="Sophia">
                  So uppercase X represents the random variable, and lowercase x
                  often represents one possible observed value?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Exactly. That distinction becomes very important when we write
                  formulas like P(X = x).
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="Discrete and continuous random variables">
              <p className="text-base leading-8 text-slate-700">
                Random variables are usually classified as discrete or
                continuous. A discrete random variable has countable possible
                values. A continuous random variable can take values on a
                continuum.
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="p-4">Type</th>
                      <th className="p-4">Meaning</th>
                      <th className="p-4">Examples</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-4 font-bold">Discrete</td>
                      <td className="p-4">Countable possible values</td>
                      <td className="p-4">
                        Number of heads, number of responses, number of hospital
                        admissions
                      </td>
                    </tr>

                    <tr>
                      <td className="p-4 font-bold">Continuous</td>
                      <td className="p-4">Values on a continuum</td>
                      <td className="p-4">
                        Height, blood pressure, cholesterol level, survival time
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SectionCard>

            <SectionCard title="Expectation: the theoretical centre">
              <p className="text-base leading-8 text-slate-700">
                The expected value of a random variable is its
                probability-weighted average. It is not necessarily the value we
                expect to see next. It is the long-run average value under the
                probability distribution.
              </p>

              <MathBox>
                E(X) = ∑<sub>x</sub> xP(X = x)
              </MathBox>

              <div className="space-y-4">
                <DialogueLine speaker="EM" name="Emma">
                  A fair die has expected value 3.5, but we can never roll 3.5.
                  So expected value does not have to be an actual possible
                  outcome?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Correct. Expectation is a centre of gravity of the
                  distribution. It can lie between possible values.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="Variance: the theoretical spread">
              <p className="text-base leading-8 text-slate-700">
                Expectation describes the theoretical centre. Variance describes
                the theoretical spread. It measures the expected squared
                distance from the mean.
              </p>

              <MathBox>
                Var(X) = E[(X − μ)<sup>2</sup>], where μ = E(X)
              </MathBox>

              <p className="text-base leading-8 text-slate-700">
                A useful shortcut is:
              </p>

              <MathBox>
                Var(X) = E(X<sup>2</sup>) − [E(X)]<sup>2</sup>
              </MathBox>

              <p className="text-base leading-8 text-slate-700">
                This formula is often easier to use because we can calculate
                E(X²) and E(X) directly from the probability distribution.
              </p>
            </SectionCard>
          </>
        )}

        {activeTab === "notes" && (
          <>
            <SectionCard title="1. Formal definition of a random variable">
              <p className="text-base leading-8">
                Let S be the sample space of a random experiment. A random
                variable X is a function that assigns a real number to each
                outcome in S.
              </p>

              <MathBox>X: S → ℝ</MathBox>

              <p className="text-base leading-8">
                If s is an outcome in S, then X(s) is the numerical value
                assigned to that outcome. This formal definition explains why a
                random variable is not “random” in the vague everyday sense. It
                is a function applied to uncertain outcomes.
              </p>
            </SectionCard>

            <SectionCard title="2. Probability mass function">
              <p className="text-base leading-8">
                For a discrete random variable X, the probability mass function,
                or PMF, gives the probability that X equals each possible value.
              </p>

              <MathBox>
                P<sub>X</sub>(x) = P(X = x)
              </MathBox>

              <p className="text-base leading-8">
                A valid PMF must satisfy two conditions:
              </p>

              <MathBox>
                P<sub>X</sub>(x) ≥ 0 for every x
                <br />
                ∑<sub>x</sub> P<sub>X</sub>(x) = 1
              </MathBox>

              <p className="text-base leading-8">
                The first condition says probabilities cannot be negative. The
                second says the random variable must take one of its possible
                values.
              </p>
            </SectionCard>

            <SectionCard title="3. Cumulative distribution function">
              <p className="text-base leading-8">
                The cumulative distribution function, or CDF, gives the
                probability that X is less than or equal to a value x.
              </p>

              <MathBox>
                F<sub>X</sub>(x) = P(X ≤ x)
              </MathBox>

              <p className="text-base leading-8">
                For a discrete random variable, the CDF is obtained by summing
                the PMF values up to x:
              </p>

              <MathBox>
                F<sub>X</sub>(x) = ∑<sub>t ≤ x</sub> P(X = t)
              </MathBox>

              <p className="text-base leading-8">
                The CDF is non-decreasing, starts near 0 and eventually reaches
                1.
              </p>
            </SectionCard>

            <SectionCard title="4. Expectation as a weighted average">
              <p className="text-base leading-8">
                The expected value of a discrete random variable is:
              </p>

              <MathBox>
                E(X) = ∑<sub>x</sub> xP(X = x)
              </MathBox>

              <p className="text-base leading-8">
                This is a weighted average where each possible value x is
                weighted by its probability. Values with higher probability
                influence the expectation more strongly.
              </p>

              <p className="text-base leading-8">
                If X takes values x<sub>1</sub>, x<sub>2</sub>, ..., x
                <sub>k</sub> with probabilities p<sub>1</sub>, p<sub>2</sub>,
                ..., p<sub>k</sub>, then:
              </p>

              <MathBox>
                E(X) = x<sub>1</sub>p<sub>1</sub> + x<sub>2</sub>p<sub>2</sub>{" "}
                + ... + x<sub>k</sub>p<sub>k</sub>
              </MathBox>
            </SectionCard>

            <SectionCard title="5. Expectation of a transformed variable">
              <p className="text-base leading-8">
                If g(X) is a function of X, then:
              </p>

              <MathBox>
                E[g(X)] = ∑<sub>x</sub> g(x)P(X = x)
              </MathBox>

              <p className="text-base leading-8">
                This result is important because it lets us calculate E(X²),
                E(1/X), E(aX + b), or other functions without needing to define
                a new probability model from scratch.
              </p>
            </SectionCard>

            <SectionCard title="6. Derivation of the variance shortcut">
              <p className="text-base leading-8">
                Let μ = E(X). The definition of variance is:
              </p>

              <MathBox>
                Var(X) = E[(X − μ)<sup>2</sup>]
              </MathBox>

              <p className="text-base leading-8">Expand the square:</p>

              <MathBox>
                (X − μ)<sup>2</sup> = X<sup>2</sup> − 2μX + μ
                <sup>2</sup>
              </MathBox>

              <p className="text-base leading-8">
                Now take expectation of both sides:
              </p>

              <MathBox>
                Var(X) = E(X<sup>2</sup> − 2μX + μ<sup>2</sup>)
                <br />
                Var(X) = E(X<sup>2</sup>) − 2μE(X) + μ<sup>2</sup>
              </MathBox>

              <p className="text-base leading-8">Since μ = E(X):</p>

              <MathBox>
                Var(X) = E(X<sup>2</sup>) − 2μ<sup>2</sup> + μ<sup>2</sup>
                <br />
                Var(X) = E(X<sup>2</sup>) − μ<sup>2</sup>
                <br />
                Var(X) = E(X<sup>2</sup>) − [E(X)]<sup>2</sup>
              </MathBox>
            </SectionCard>

            <SectionCard title="7. Linearity of expectation">
              <p className="text-base leading-8">For constants a and b:</p>

              <MathBox>E(aX + b) = aE(X) + b</MathBox>

              <p className="text-base leading-8">
                For two random variables X and Y:
              </p>

              <MathBox>E(X + Y) = E(X) + E(Y)</MathBox>

              <p className="text-base leading-8">
                This result does not require independence. Independence is
                needed for many variance rules, but not for linearity of
                expectation.
              </p>
            </SectionCard>

            <SectionCard title="8. Variance under linear transformation">
              <p className="text-base leading-8">If Y = aX + b, then:</p>

              <MathBox>
                Var(aX + b) = a<sup>2</sup>Var(X)
              </MathBox>

              <p className="text-base leading-8">
                Adding b shifts all values by the same amount and does not
                change spread. Multiplying by a stretches distances from the
                mean by a, so squared distances are multiplied by a².
              </p>
            </SectionCard>

            <SectionCard title="9. Indicator variables">
              <p className="text-base leading-8">
                For an event A, define the indicator variable I
                <sub>A</sub> as:
              </p>

              <MathBox>
                I<sub>A</sub> = 1 if A occurs
                <br />
                I<sub>A</sub> = 0 if A does not occur
              </MathBox>

              <p className="text-base leading-8">The expectation is:</p>

              <MathBox>
                E(I<sub>A</sub>) = 1 × P(A) + 0 × P(A<sup>c</sup>)
                <br />
                E(I<sub>A</sub>) = P(A)
              </MathBox>

              <p className="text-base leading-8">
                This result is very powerful. It connects probability directly
                to expectation and allows counts to be expressed as sums of
                indicators.
              </p>
            </SectionCard>
          </>
        )}

        {activeTab === "interactive" && (
          <>
            <ExpectationVarianceLab />
            <BernoulliIndicatorLab />
          </>
        )}

        {activeTab === "examples" && (
          <>
            <SectionCard title="Worked example 1: Random variable from coin tosses">
              <p className="text-base leading-8">
                Toss two fair coins. Let X be the number of heads. Find the PMF
                of X.
              </p>

              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="p-4">Outcome</th>
                      <th className="p-4">X</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-4">HH</td>
                      <td className="p-4">2</td>
                    </tr>
                    <tr>
                      <td className="p-4">HT</td>
                      <td className="p-4">1</td>
                    </tr>
                    <tr>
                      <td className="p-4">TH</td>
                      <td className="p-4">1</td>
                    </tr>
                    <tr>
                      <td className="p-4">TT</td>
                      <td className="p-4">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <MathBox>
                P(X = 0) = 1/4
                <br />
                P(X = 1) = 2/4
                <br />
                P(X = 2) = 1/4
              </MathBox>
            </SectionCard>

            <SectionCard title="Worked example 2: Expected value">
              <p className="text-base leading-8">
                Using the two-coin random variable above, calculate E(X).
              </p>

              <MathBox>
                E(X) = 0 × 1/4 + 1 × 2/4 + 2 × 1/4
                <br />
                E(X) = 0 + 1/2 + 1/2
                <br />
                E(X) = 1
              </MathBox>

              <p className="text-base leading-8">
                The expected number of heads in two fair coin tosses is 1.
              </p>
            </SectionCard>

            <SectionCard title="Worked example 3: Variance">
              <p className="text-base leading-8">
                Continue with X = number of heads in two fair coin tosses.
                Calculate Var(X).
              </p>

              <p className="text-base leading-8">
                First calculate E(X<sup>2</sup>):
              </p>

              <MathBox>
                E(X<sup>2</sup>) = 0<sup>2</sup> × 1/4 + 1<sup>2</sup> × 2/4 +
                2<sup>2</sup> × 1/4
                <br />
                E(X<sup>2</sup>) = 0 + 2/4 + 4/4
                <br />
                E(X<sup>2</sup>) = 1.5
              </MathBox>

              <p className="text-base leading-8">Since E(X) = 1:</p>

              <MathBox>
                Var(X) = E(X<sup>2</sup>) − [E(X)]<sup>2</sup>
                <br />
                Var(X) = 1.5 − 1<sup>2</sup>
                <br />
                Var(X) = 0.5
              </MathBox>
            </SectionCard>

            <SectionCard title="Worked example 4: Fair die expectation">
              <p className="text-base leading-8">
                Let X be the result of rolling a fair die. Find E(X).
              </p>

              <MathBox>
                E(X) = 1(1/6) + 2(1/6) + 3(1/6) + 4(1/6) + 5(1/6) + 6(1/6)
                <br />
                E(X) = 21/6 = 3.5
              </MathBox>

              <p className="text-base leading-8">
                The expected value is 3.5, even though 3.5 is not a possible die
                outcome. This shows expectation is a long-run average, not a
                guaranteed observed value.
              </p>
            </SectionCard>

            <SectionCard title="Worked example 5: Indicator variable">
              <p className="text-base leading-8">
                Let A be the event that a randomly selected patient responds to
                treatment. Suppose P(A) = 0.72. Define I<sub>A</sub> = 1 if the
                patient responds and 0 otherwise. Find E(I<sub>A</sub>).
              </p>

              <MathBox>
                E(I<sub>A</sub>) = 1 × P(A) + 0 × P(A<sup>c</sup>)
                <br />
                E(I<sub>A</sub>) = P(A)
                <br />
                E(I<sub>A</sub>) = 0.72
              </MathBox>
            </SectionCard>
          </>
        )}

        {activeTab === "exercises" && (
          <SectionCard title="Exercises">
            <div className="space-y-5">
              {[
                {
                  title: "Exercise 1",
                  q: "A random variable X takes values 0, 1 and 2 with probabilities 0.2, 0.5 and 0.3. Check whether this is a valid PMF.",
                  a: "All probabilities are non-negative and 0.2 + 0.5 + 0.3 = 1. Therefore this is a valid PMF.",
                },
                {
                  title: "Exercise 2",
                  q: "For the same random variable, calculate E(X).",
                  a: "E(X) = 0(0.2) + 1(0.5) + 2(0.3) = 0 + 0.5 + 0.6 = 1.1.",
                },
                {
                  title: "Exercise 3",
                  q: "Calculate E(X squared) for X with probabilities P(0)=0.2, P(1)=0.5, P(2)=0.3.",
                  a: "E(X²) = 0²(0.2) + 1²(0.5) + 2²(0.3) = 0 + 0.5 + 1.2 = 1.7.",
                },
                {
                  title: "Exercise 4",
                  q: "Using E(X)=1.1 and E(X²)=1.7, calculate Var(X).",
                  a: "Var(X) = E(X²) − [E(X)]² = 1.7 − 1.1² = 1.7 − 1.21 = 0.49.",
                },
                {
                  title: "Exercise 5",
                  q: "If E(X)=4 and Var(X)=9, find E(3X+2) and Var(3X+2).",
                  a: "E(3X+2)=3E(X)+2=14. Var(3X+2)=3²Var(X)=9×9=81.",
                },
                {
                  title: "Exercise 6",
                  q: "Let I_A be an indicator variable for event A. If P(A)=0.35, find E(I_A) and Var(I_A).",
                  a: "E(I_A)=P(A)=0.35. Var(I_A)=p(1−p)=0.35×0.65=0.2275.",
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

                <p className="mt-4 text-6xl font-black">
                  {score}/{quizQuestions.length}
                </p>

                <p className="mt-4 text-base leading-8 text-slate-600">
                  You have completed Lesson 3.3. Review expectation, variance
                  and indicators before moving to discrete distributions.
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