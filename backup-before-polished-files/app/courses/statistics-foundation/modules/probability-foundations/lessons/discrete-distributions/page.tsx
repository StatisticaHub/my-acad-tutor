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
    question: "Which distribution models a single success/failure trial?",
    options: ["Poisson", "Bernoulli", "Normal", "Geometric"],
    answer: 1,
    explanation:
      "A Bernoulli distribution models one binary trial with outcomes 1 and 0.",
  },
  {
    question:
      "Which distribution counts the number of successes in n independent Bernoulli trials?",
    options: ["Bernoulli", "Binomial", "Geometric", "Poisson"],
    answer: 1,
    explanation:
      "A binomial random variable counts successes in a fixed number of independent trials with the same success probability.",
  },
  {
    question:
      "In the binomial formula, what does the term n choose x count?",
    options: [
      "The probability of one exact sequence",
      "The number of ways to arrange x successes among n trials",
      "The number of failures only",
      "The expected value",
    ],
    answer: 1,
    explanation:
      "The binomial coefficient counts how many different arrangements contain exactly x successes.",
  },
  {
    question: "Which distribution models the trial number of the first success?",
    options: ["Bernoulli", "Binomial", "Geometric", "Poisson"],
    answer: 2,
    explanation:
      "The geometric distribution models how many independent trials are needed until the first success.",
  },
  {
    question:
      "Which distribution is commonly used for counts of events in a fixed time, space or exposure interval?",
    options: ["Poisson", "Bernoulli", "Geometric", "Uniform"],
    answer: 0,
    explanation:
      "The Poisson distribution models event counts in a fixed interval when events occur at an average rate.",
  },
];

function factorial(n: number): number {
  if (n <= 1) return 1;
  let value = 1;
  for (let i = 2; i <= n; i++) value *= i;
  return value;
}

function combination(n: number, x: number): number {
  if (x < 0 || x > n) return 0;
  return factorial(n) / (factorial(x) * factorial(n - x));
}

function binomialPmf(n: number, p: number, x: number): number {
  return combination(n, x) * Math.pow(p, x) * Math.pow(1 - p, n - x);
}

function poissonPmf(lambda: number, x: number): number {
  return (Math.exp(-lambda) * Math.pow(lambda, x)) / factorial(x);
}

function geometricPmf(p: number, k: number): number {
  return Math.pow(1 - p, k - 1) * p;
}

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

function ProbabilityBars({
  values,
}: {
  values: { label: string; probability: number }[];
}) {
  const max = Math.max(...values.map((v) => v.probability));

  return (
    <div className="mt-5 space-y-3">
      {values.map((v) => (
        <div key={v.label}>
          <div className="mb-1 flex justify-between text-xs font-bold text-slate-500">
            <span>{v.label}</span>
            <span>{v.probability.toFixed(4)}</span>
          </div>

          <div className="h-8 overflow-hidden rounded-full bg-slate-100">
            <div
              className="flex h-full items-center justify-end rounded-full bg-blue-600 pr-3 text-xs font-black text-white transition-all"
              style={{
                width: `${max === 0 ? 0 : (v.probability / max) * 100}%`,
              }}
            >
              {v.probability.toFixed(3)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function BinomialLab() {
  const [n, setN] = useState(10);
  const [p, setP] = useState(0.4);

  const values = useMemo(() => {
    return Array.from({ length: n + 1 }, (_, x) => ({
      label: `X = ${x}`,
      probability: binomialPmf(n, p, x),
    }));
  }, [n, p]);

  const mean = n * p;
  const variance = n * p * (1 - p);
  const sd = Math.sqrt(variance);

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Binomial distribution lab
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        Change the number of trials and success probability. Watch how the
        probability distribution, mean and variance change.
      </p>

      <MathBox>
        X ~ Binomial(n, p)
        <br />
        P(X = x) = C(n, x)p<sup>x</sup>(1 − p)<sup>n − x</sup>
      </MathBox>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Number of trials n</span>
            <span>{n}</span>
          </div>
          <input
            type="range"
            min="1"
            max="25"
            step="1"
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Success probability p</span>
            <span>{p.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.05"
            max="0.95"
            step="0.01"
            value={p}
            onChange={(e) => setP(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            E(X)
          </p>
          <p className="mt-2 text-3xl font-black">{mean.toFixed(3)}</p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">
            Var(X)
          </p>
          <p className="mt-2 text-3xl font-black">{variance.toFixed(3)}</p>
        </div>

        <div className="rounded-2xl bg-amber-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">
            SD(X)
          </p>
          <p className="mt-2 text-3xl font-black">{sd.toFixed(3)}</p>
        </div>
      </div>

      <ProbabilityBars values={values} />

      <div className="mt-5 rounded-2xl bg-amber-50 p-5">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-800">
          Interpretation
        </p>
        <p className="mt-2 text-sm leading-7 text-amber-950">
          When p is close to 0.5, the binomial distribution is more balanced.
          When p is near 0 or 1, the distribution becomes skewed.
        </p>
      </div>
    </div>
  );
}

function PoissonLab() {
  const [lambda, setLambda] = useState(3);

  const maxX = Math.max(10, Math.ceil(lambda + 4 * Math.sqrt(lambda)));
  const values = useMemo(() => {
    return Array.from({ length: maxX + 1 }, (_, x) => ({
      label: `X = ${x}`,
      probability: poissonPmf(lambda, x),
    }));
  }, [lambda, maxX]);

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Poisson distribution lab
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        Change the average rate λ. In a Poisson distribution, the mean and
        variance are both equal to λ.
      </p>

      <MathBox>
        X ~ Poisson(λ)
        <br />
        P(X = x) = e<sup>−λ</sup>λ<sup>x</sup> / x!
      </MathBox>

      <label className="mt-6 block">
        <div className="mb-2 flex justify-between text-sm font-bold">
          <span>Average count λ</span>
          <span>{lambda.toFixed(1)}</span>
        </div>
        <input
          type="range"
          min="0.2"
          max="12"
          step="0.1"
          value={lambda}
          onChange={(e) => setLambda(Number(e.target.value))}
          className="w-full"
        />
      </label>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            E(X)
          </p>
          <p className="mt-2 text-3xl font-black">{lambda.toFixed(2)}</p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">
            Var(X)
          </p>
          <p className="mt-2 text-3xl font-black">{lambda.toFixed(2)}</p>
        </div>

        <div className="rounded-2xl bg-amber-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">
            SD(X)
          </p>
          <p className="mt-2 text-3xl font-black">
            {Math.sqrt(lambda).toFixed(2)}
          </p>
        </div>
      </div>

      <ProbabilityBars values={values} />
    </div>
  );
}

function GeometricLab() {
  const [p, setP] = useState(0.25);

  const values = useMemo(() => {
    return Array.from({ length: 12 }, (_, index) => {
      const k = index + 1;
      return {
        label: `Trial ${k}`,
        probability: geometricPmf(p, k),
      };
    });
  }, [p]);

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Geometric distribution lab
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        The geometric distribution describes the trial number of the first
        success. A smaller p means we tend to wait longer.
      </p>

      <MathBox>
        X ~ Geometric(p)
        <br />
        P(X = k) = (1 − p)<sup>k − 1</sup>p, k = 1, 2, 3, ...
      </MathBox>

      <label className="mt-6 block">
        <div className="mb-2 flex justify-between text-sm font-bold">
          <span>Success probability p</span>
          <span>{p.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0.05"
          max="0.95"
          step="0.01"
          value={p}
          onChange={(e) => setP(Number(e.target.value))}
          className="w-full"
        />
      </label>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            E(X)
          </p>
          <p className="mt-2 text-3xl font-black">{(1 / p).toFixed(3)}</p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">
            Var(X)
          </p>
          <p className="mt-2 text-3xl font-black">
            {((1 - p) / (p * p)).toFixed(3)}
          </p>
        </div>

        <div className="rounded-2xl bg-amber-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">
            P(first success on trial 1)
          </p>
          <p className="mt-2 text-3xl font-black">{p.toFixed(2)}</p>
        </div>
      </div>

      <ProbabilityBars values={values} />
    </div>
  );
}

export default function DiscreteDistributionsLessonPage() {
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
              Module 3 · Lesson 3.4
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:text-6xl">
              Discrete Distributions
            </h1>

            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600">
              Learn the main discrete probability models used in statistics:
              Bernoulli, binomial, geometric and Poisson distributions. The
              focus is on assumptions, derivations, interpretation and choosing
              the right model.
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
                  We now know random variables, expectation and variance. But I
                  keep seeing names like Bernoulli, binomial, geometric and
                  Poisson. Are these just formulas to memorise?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  No. Each distribution is a probability model for a particular
                  kind of random process. The important question is not “which
                  formula do I remember?” It is “what process produced the
                  data?”
                </DialogueLine>

                <DialogueLine speaker="OL" name="Oliver">
                  So distribution choice depends on the story behind the data?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Exactly. A formula without assumptions is dangerous. A
                  distribution is a model plus assumptions.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="What is a discrete distribution?">
              <p className="text-base leading-8 text-slate-700">
                A discrete distribution describes a random variable whose
                possible values are countable. The values may be finite, such as
                0 and 1, or countably infinite, such as 0, 1, 2, 3 and so on.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-700">
                For a discrete random variable X, the distribution gives the
                probability attached to each possible value.
              </p>

              <MathBox>
                P<sub>X</sub>(x) = P(X = x)
              </MathBox>

              <div className="mt-6 rounded-2xl bg-blue-50 p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-800">
                  Big idea
                </p>
                <p className="mt-2 text-sm leading-7 text-blue-950">
                  A discrete distribution is a complete probability description
                  of a countable random variable.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="Bernoulli distribution: one binary trial">
              <p className="text-base leading-8 text-slate-700">
                The Bernoulli distribution is the simplest discrete
                distribution. It models one trial with two possible outcomes:
                success or failure, yes or no, response or no response.
              </p>

              <MathBox>X ~ Bernoulli(p)</MathBox>

              <MathBox>
                P(X = 1) = p
                <br />
                P(X = 0) = 1 − p
              </MathBox>

              <p className="text-base leading-8 text-slate-700">
                If X = 1 means a patient responds to treatment, then p is the
                probability of response.
              </p>

              <div className="space-y-4">
                <DialogueLine speaker="SO" name="Sophia">
                  So Bernoulli is the probability model for one binary outcome?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Correct. It is the building block for the binomial
                  distribution.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="Binomial distribution: counting successes">
              <p className="text-base leading-8 text-slate-700">
                The binomial distribution counts the number of successes in a
                fixed number of independent Bernoulli trials, each with the same
                success probability p.
              </p>

              <MathBox>X ~ Binomial(n, p)</MathBox>

              <p className="text-base leading-8 text-slate-700">
                The assumptions are:
              </p>

              <ul className="list-disc space-y-2 pl-6 text-base leading-8 text-slate-700">
                <li>There is a fixed number of trials n.</li>
                <li>Each trial has two outcomes: success or failure.</li>
                <li>The success probability p is the same for every trial.</li>
                <li>The trials are independent.</li>
                <li>X counts the number of successes.</li>
              </ul>

              <div className="mt-5 rounded-2xl bg-red-50 p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-red-800">
                  Important warning
                </p>
                <p className="mt-2 text-sm leading-7 text-red-950">
                  If the trials are not independent or if p changes across
                  individuals, a simple binomial model may be inappropriate.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="Where the binomial formula comes from">
              <p className="text-base leading-8 text-slate-700">
                Suppose exactly x successes occur in n trials. One particular
                arrangement, such as success-success-failure, has probability:
              </p>

              <MathBox>
                p<sup>x</sup>(1 − p)<sup>n − x</sup>
              </MathBox>

              <p className="text-base leading-8 text-slate-700">
                But the x successes can appear in many different positions. The
                number of arrangements is:
              </p>

              <MathBox>C(n, x) = n! / [x!(n − x)!]</MathBox>

              <p className="text-base leading-8 text-slate-700">
                Therefore:
              </p>

              <MathBox>
                P(X = x) = C(n, x)p<sup>x</sup>(1 − p)<sup>n − x</sup>
              </MathBox>

              <div className="space-y-4">
                <DialogueLine speaker="JA" name="James">
                  So the probability part gives the chance of one arrangement,
                  and C(n, x) counts how many arrangements exist?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Exactly. That is the intuition behind the binomial formula.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="Geometric distribution: waiting for the first success">
              <p className="text-base leading-8 text-slate-700">
                The geometric distribution answers a different question: how
                many trials are needed until the first success?
              </p>

              <MathBox>X ~ Geometric(p)</MathBox>

              <p className="text-base leading-8 text-slate-700">
                If X is the trial number of the first success, then the first
                k − 1 trials must fail and the kth trial must succeed.
              </p>

              <MathBox>
                P(X = k) = (1 − p)<sup>k − 1</sup>p, k = 1, 2, 3, ...
              </MathBox>

              <p className="text-base leading-8 text-slate-700">
                The geometric distribution is useful for modelling waiting time
                in repeated independent trials.
              </p>
            </SectionCard>

            <SectionCard title="Poisson distribution: counts in an interval">
              <p className="text-base leading-8 text-slate-700">
                The Poisson distribution models counts of events in a fixed
                interval of time, space, area, volume or exposure, when events
                occur at an average rate.
              </p>

              <MathBox>X ~ Poisson(λ)</MathBox>

              <p className="text-base leading-8 text-slate-700">
                The parameter λ is the expected count in the interval.
              </p>

              <MathBox>
                P(X = x) = e<sup>−λ</sup>λ<sup>x</sup> / x!, x = 0, 1, 2, ...
              </MathBox>

              <p className="text-base leading-8 text-slate-700">
                Examples include hospital arrivals per hour, disease cases per
                week, mutations in a genomic region or defects per batch.
              </p>
            </SectionCard>
          </>
        )}

        {activeTab === "notes" && (
          <>
            <SectionCard title="1. General requirements for a discrete distribution">
              <p className="text-base leading-8">
                A discrete random variable X has a probability mass function:
              </p>

              <MathBox>
                P<sub>X</sub>(x) = P(X = x)
              </MathBox>

              <p className="text-base leading-8">
                The probabilities must satisfy:
              </p>

              <MathBox>
                P<sub>X</sub>(x) ≥ 0 for every x
                <br />
                ∑<sub>x</sub> P<sub>X</sub>(x) = 1
              </MathBox>

              <p className="text-base leading-8">
                The first condition comes from non-negativity. The second says
                the random variable must take one of its possible values.
              </p>
            </SectionCard>

            <SectionCard title="2. Bernoulli distribution">
              <p className="text-base leading-8">
                A Bernoulli random variable X takes value 1 with probability p
                and 0 with probability 1 − p.
              </p>

              <MathBox>X ~ Bernoulli(p)</MathBox>

              <MathBox>
                P(X = x) = p<sup>x</sup>(1 − p)<sup>1 − x</sup>, x = 0, 1
              </MathBox>

              <p className="text-base leading-8">
                Its expectation is:
              </p>

              <MathBox>
                E(X) = 0(1 − p) + 1(p) = p
              </MathBox>

              <p className="text-base leading-8">
                Its second moment is:
              </p>

              <MathBox>
                E(X<sup>2</sup>) = 0<sup>2</sup>(1 − p) + 1<sup>2</sup>(p) = p
              </MathBox>

              <p className="text-base leading-8">
                Therefore:
              </p>

              <MathBox>
                Var(X) = E(X<sup>2</sup>) − [E(X)]<sup>2</sup>
                <br />
                Var(X) = p − p<sup>2</sup>
                <br />
                Var(X) = p(1 − p)
              </MathBox>
            </SectionCard>

            <SectionCard title="3. Binomial distribution">
              <p className="text-base leading-8">
                If X counts the number of successes in n independent Bernoulli
                trials with common success probability p, then:
              </p>

              <MathBox>X ~ Binomial(n, p)</MathBox>

              <MathBox>
                P(X = x) = C(n, x)p<sup>x</sup>(1 − p)<sup>n − x</sup>
              </MathBox>

              <p className="text-base leading-8">
                where:
              </p>

              <MathBox>C(n, x) = n! / [x!(n − x)!]</MathBox>

              <p className="text-base leading-8">
                The expected value and variance are:
              </p>

              <MathBox>
                E(X) = np
                <br />
                Var(X) = np(1 − p)
              </MathBox>

              <p className="text-base leading-8">
                One way to understand the mean is to write X as a sum of
                indicators:
              </p>

              <MathBox>
                X = I<sub>1</sub> + I<sub>2</sub> + ... + I<sub>n</sub>
              </MathBox>

              <p className="text-base leading-8">
                Since each indicator has expectation p:
              </p>

              <MathBox>
                E(X) = E(I<sub>1</sub>) + ... + E(I<sub>n</sub>) = np
              </MathBox>
            </SectionCard>

            <SectionCard title="4. Geometric distribution">
              <p className="text-base leading-8">
                If X is the trial number of the first success in independent
                Bernoulli trials with success probability p, then:
              </p>

              <MathBox>X ~ Geometric(p)</MathBox>

              <MathBox>
                P(X = k) = (1 − p)<sup>k − 1</sup>p, k = 1, 2, 3, ...
              </MathBox>

              <p className="text-base leading-8">
                The expected value and variance are:
              </p>

              <MathBox>
                E(X) = 1 / p
                <br />
                Var(X) = (1 − p) / p<sup>2</sup>
              </MathBox>

              <p className="text-base leading-8">
                If p is small, success is rare, so the expected waiting time is
                large.
              </p>
            </SectionCard>

            <SectionCard title="5. Poisson distribution">
              <p className="text-base leading-8">
                A Poisson random variable counts events in a fixed interval,
                where λ represents the average count in that interval.
              </p>

              <MathBox>X ~ Poisson(λ)</MathBox>

              <MathBox>
                P(X = x) = e<sup>−λ</sup>λ<sup>x</sup> / x!, x = 0, 1, 2, ...
              </MathBox>

              <p className="text-base leading-8">
                For a Poisson distribution:
              </p>

              <MathBox>
                E(X) = λ
                <br />
                Var(X) = λ
              </MathBox>

              <p className="text-base leading-8">
                The equality of mean and variance is an important property. If
                the observed variance is much larger than the mean, the data may
                be overdispersed relative to the Poisson model.
              </p>
            </SectionCard>

            <SectionCard title="6. Choosing the correct distribution">
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="p-4">Question</th>
                      <th className="p-4">Distribution</th>
                      <th className="p-4">Random variable</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-4">One binary outcome?</td>
                      <td className="p-4 font-bold">Bernoulli</td>
                      <td className="p-4">0 or 1</td>
                    </tr>

                    <tr>
                      <td className="p-4">
                        Number of successes in fixed n trials?
                      </td>
                      <td className="p-4 font-bold">Binomial</td>
                      <td className="p-4">0, 1, ..., n</td>
                    </tr>

                    <tr>
                      <td className="p-4">
                        Trial number of first success?
                      </td>
                      <td className="p-4 font-bold">Geometric</td>
                      <td className="p-4">1, 2, 3, ...</td>
                    </tr>

                    <tr>
                      <td className="p-4">
                        Count of events in a fixed interval?
                      </td>
                      <td className="p-4 font-bold">Poisson</td>
                      <td className="p-4">0, 1, 2, ...</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SectionCard>
          </>
        )}

        {activeTab === "interactive" && (
          <>
            <BinomialLab />
            <GeometricLab />
            <PoissonLab />
          </>
        )}

        {activeTab === "examples" && (
          <>
            <SectionCard title="Worked example 1: Bernoulli distribution">
              <p className="text-base leading-8">
                Let X = 1 if a patient responds to treatment and X = 0
                otherwise. Suppose the response probability is 0.7.
              </p>

              <MathBox>
                X ~ Bernoulli(0.7)
                <br />
                P(X = 1) = 0.7
                <br />
                P(X = 0) = 0.3
              </MathBox>

              <p className="text-base leading-8">
                The mean and variance are:
              </p>

              <MathBox>
                E(X) = p = 0.7
                <br />
                Var(X) = p(1 − p) = 0.7(0.3) = 0.21
              </MathBox>
            </SectionCard>

            <SectionCard title="Worked example 2: Binomial probability">
              <p className="text-base leading-8">
                Suppose 10 patients are treated independently, and each has
                probability 0.7 of response. Let X be the number of responders.
                Find P(X = 8).
              </p>

              <MathBox>X ~ Binomial(10, 0.7)</MathBox>

              <MathBox>
                P(X = 8) = C(10, 8)(0.7)<sup>8</sup>(0.3)<sup>2</sup>
                <br />
                C(10, 8) = 45
                <br />
                P(X = 8) = 45(0.7)<sup>8</sup>(0.3)<sup>2</sup>
                <br />
                P(X = 8) ≈ 0.2335
              </MathBox>
            </SectionCard>

            <SectionCard title="Worked example 3: Binomial mean and variance">
              <p className="text-base leading-8">
                For X ~ Binomial(10, 0.7), calculate E(X) and Var(X).
              </p>

              <MathBox>
                E(X) = np = 10(0.7) = 7
                <br />
                Var(X) = np(1 − p) = 10(0.7)(0.3) = 2.1
              </MathBox>

              <p className="text-base leading-8">
                The expected number of responders is 7, and the variance is 2.1.
              </p>
            </SectionCard>

            <SectionCard title="Worked example 4: Geometric probability">
              <p className="text-base leading-8">
                A student guesses on multiple independent questions. The
                probability of success on each question is 0.25. Find the
                probability that the first correct answer occurs on the fourth
                question.
              </p>

              <MathBox>
                X ~ Geometric(0.25)
                <br />
                P(X = 4) = (1 − 0.25)<sup>3</sup>(0.25)
                <br />
                P(X = 4) = (0.75)<sup>3</sup>(0.25)
                <br />
                P(X = 4) ≈ 0.1055
              </MathBox>
            </SectionCard>

            <SectionCard title="Worked example 5: Poisson probability">
              <p className="text-base leading-8">
                Suppose a clinic receives an average of 3 emergency arrivals per
                hour. Let X be the number of arrivals in one hour. Find P(X = 5).
              </p>

              <MathBox>X ~ Poisson(3)</MathBox>

              <MathBox>
                P(X = 5) = e<sup>−3</sup>3<sup>5</sup> / 5!
                <br />
                P(X = 5) ≈ 0.1008
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
                  q: "Let X ~ Bernoulli(0.4). Find E(X) and Var(X).",
                  a: "E(X) = p = 0.4. Var(X) = p(1 − p) = 0.4 × 0.6 = 0.24.",
                },
                {
                  title: "Exercise 2",
                  q: "Let X ~ Binomial(12, 0.3). Find E(X) and Var(X).",
                  a: "E(X) = np = 12 × 0.3 = 3.6. Var(X) = np(1 − p) = 12 × 0.3 × 0.7 = 2.52.",
                },
                {
                  title: "Exercise 3",
                  q: "A coin is tossed 5 times. Let X be the number of heads. Write the distribution of X.",
                  a: "Assuming a fair coin and independent tosses, X ~ Binomial(5, 0.5).",
                },
                {
                  title: "Exercise 4",
                  q: "Let X ~ Geometric(0.2). Find E(X). Interpret the result.",
                  a: "E(X) = 1 / p = 1 / 0.2 = 5. On average, the first success occurs on the fifth trial.",
                },
                {
                  title: "Exercise 5",
                  q: "Let X ~ Poisson(4). Find E(X) and Var(X).",
                  a: "For a Poisson distribution, E(X) = λ and Var(X) = λ. Therefore E(X) = 4 and Var(X) = 4.",
                },
                {
                  title: "Exercise 6",
                  q: "A hospital receives an average of 2.5 calls per hour. Which distribution might model the number of calls per hour?",
                  a: "A Poisson distribution may be appropriate: X ~ Poisson(2.5), assuming the event-count assumptions are reasonable.",
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
                  You have completed Lesson 3.4. Review the assumptions behind
                  each distribution before moving to the normal distribution and
                  the central limit theorem.
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