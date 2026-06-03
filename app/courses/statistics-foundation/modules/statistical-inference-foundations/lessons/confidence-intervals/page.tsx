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

const quizQuestions = [
  {
    question: "What is the general structure of many confidence intervals?",
    options: [
      "estimate ± critical value × standard error",
      "standard deviation ± sample size",
      "p-value ± standard deviation",
      "mean × variance",
    ],
    answer: 0,
    explanation:
      "Many confidence intervals have the structure: estimate ± critical value × standard error.",
  },
  {
    question: "What does a 95% confidence level mean in frequentist statistics?",
    options: [
      "There is a 95% probability that this specific fixed interval contains the parameter",
      "About 95% of intervals produced by this method would contain the true parameter in repeated sampling",
      "95% of the data values are inside the interval",
      "The parameter changes randomly 95% of the time",
    ],
    answer: 1,
    explanation:
      "The 95% refers to the long-run coverage of the method over repeated samples, not to a probability assigned to one already-computed interval.",
  },
  {
    question: "What happens to interval width if the confidence level increases from 95% to 99%?",
    options: [
      "It becomes narrower",
      "It becomes wider",
      "It becomes zero",
      "It is unaffected",
    ],
    answer: 1,
    explanation:
      "Higher confidence requires a larger critical value, so the interval becomes wider.",
  },
  {
    question: "What happens to the margin of error when sample size increases, holding other things constant?",
    options: [
      "It decreases because standard error decreases",
      "It increases because standard error increases",
      "It becomes exactly 1",
      "It becomes unrelated to the estimate",
    ],
    answer: 0,
    explanation:
      "For many estimators, standard error decreases as sample size increases, so margin of error decreases.",
  },
  {
    question: "When σ is unknown for a mean, which interval is usually used?",
    options: [
      "A z interval using σ",
      "A t interval using s",
      "A chi-square interval always",
      "No interval can be made",
    ],
    answer: 1,
    explanation:
      "When the population standard deviation σ is unknown, we use the sample standard deviation s and a t critical value.",
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
        <p className="mb-1 text-xs font-black uppercase tracking-[0.16em] text-slate-700">
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

function zCritical(level: number) {
  if (level === 90) return 1.645;
  if (level === 95) return 1.96;
  return 2.576;
}

function MeanCILab() {
  const [estimate, setEstimate] = useState(128);
  const [se, setSe] = useState(2);
  const [level, setLevel] = useState(95);

  const z = zCritical(level);
  const margin = z * se;
  const lower = estimate - margin;
  const upper = estimate + margin;

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Confidence interval builder
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        Change the estimate, standard error and confidence level. Watch the
        interval centre, margin of error and width change immediately.
      </p>

      <MathBox>confidence interval = estimate ± critical value × SE</MathBox>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Estimate</span>
            <span>{estimate.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="80"
            max="170"
            step="0.5"
            value={estimate}
            onChange={(e) => setEstimate(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Standard error</span>
            <span>{se.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="15"
            step="0.1"
            value={se}
            onChange={(e) => setSe(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 text-sm font-bold">Confidence level</div>
          <select
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold"
          >
            <option value={90}>90%</option>
            <option value={95}>95%</option>
            <option value={99}>99%</option>
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            Critical value
          </p>
          <p className="mt-2 text-3xl font-black">{z.toFixed(3)}</p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">
            Lower limit
          </p>
          <p className="mt-2 text-3xl font-black">{lower.toFixed(2)}</p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">
            Upper limit
          </p>
          <p className="mt-2 text-3xl font-black">{upper.toFixed(2)}</p>
        </div>

        <div className="rounded-2xl bg-amber-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">
            Margin of error
          </p>
          <p className="mt-2 text-3xl font-black">{margin.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-slate-50 p-6">
        <div className="relative h-24">
          <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-200" />

          <div
            className="absolute top-1/2 h-3 -translate-y-1/2 rounded-full bg-blue-600"
            style={{
              left: `${Math.max(0, ((lower - 80) / 90) * 100)}%`,
              right: `${Math.max(0, 100 - ((upper - 80) / 90) * 100)}%`,
            }}
          />

          <div
            className="absolute top-[18px] h-14 w-1 rounded-full bg-slate-950"
            style={{ left: `${Math.max(0, ((estimate - 80) / 90) * 100)}%` }}
          />

          <p className="absolute top-0 text-xs font-black text-slate-700">
            interval line
          </p>
        </div>
      </div>
    </div>
  );
}

function WidthLab() {
  const [sigma, setSigma] = useState(20);
  const [level, setLevel] = useState(95);

  const z = zCritical(level);

  const values = [10, 20, 40, 80, 160, 320, 640].map((n) => {
    const se = sigma / Math.sqrt(n);
    const width = 2 * z * se;
    return { n, width };
  });

  const max = Math.max(...values.map((v) => v.width));

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Interval width lab
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        The full width of a confidence interval for a mean depends on the
        critical value, population variability and sample size.
      </p>

      <MathBox>
        width = 2 × z × <Fraction numerator="σ" denominator="√n" />
      </MathBox>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Standard deviation σ</span>
            <span>{sigma.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="5"
            max="80"
            step="1"
            value={sigma}
            onChange={(e) => setSigma(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 text-sm font-bold">Confidence level</div>
          <select
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold"
          >
            <option value={90}>90%</option>
            <option value={95}>95%</option>
            <option value={99}>99%</option>
          </select>
        </label>
      </div>

      <div className="mt-6 space-y-3">
        {values.map((v) => (
          <div key={v.n}>
            <div className="mb-1 flex justify-between text-xs font-bold text-slate-700">
              <span>n = {v.n}</span>
              <span>width = {v.width.toFixed(2)}</span>
            </div>
            <div className="h-8 overflow-hidden rounded-full bg-slate-100">
              <div
                className="flex h-full items-center justify-end rounded-full bg-blue-600 pr-3 text-xs font-black text-white"
                style={{ width: `${(v.width / max) * 100}%` }}
              >
                {v.width.toFixed(1)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CoverageSimulator() {
  const [level, setLevel] = useState(95);
  const [sampleSize, setSampleSize] = useState(30);
  const [repetitions, setRepetitions] = useState(60);

  const z = zCritical(level);
  const trueMean = 100;
  const sigma = 15;

  const intervals = useMemo(() => {
    return Array.from({ length: repetitions }, (_, i) => {
      const pseudoMean =
        trueMean +
        Math.sin((i + 3) * 4.711 + sampleSize * 1.13) *
          (sigma / Math.sqrt(sampleSize)) *
          2.1;

      const se = sigma / Math.sqrt(sampleSize);
      const lower = pseudoMean - z * se;
      const upper = pseudoMean + z * se;
      const covered = lower <= trueMean && trueMean <= upper;

      return {
        estimate: pseudoMean,
        lower,
        upper,
        covered,
      };
    });
  }, [level, sampleSize, repetitions, z]);

  const coveredCount = intervals.filter((item) => item.covered).length;
  const coverage = coveredCount / repetitions;

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Long-run coverage simulator
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        Each horizontal line is one confidence interval from a repeated sample.
        The vertical reference line is the true population mean. A confidence
        level describes the long-run success rate of this interval-building
        procedure.
      </p>

      <MathBox>
        95% confidence means about 95% long-run coverage, not 95% probability
        for one already-computed interval.
      </MathBox>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <label>
          <div className="mb-2 text-sm font-bold">Confidence level</div>
          <select
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold"
          >
            <option value={90}>90%</option>
            <option value={95}>95%</option>
            <option value={99}>99%</option>
          </select>
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Sample size n</span>
            <span>{sampleSize}</span>
          </div>
          <input
            type="range"
            min="10"
            max="200"
            step="5"
            value={sampleSize}
            onChange={(e) => setSampleSize(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Number of intervals</span>
            <span>{repetitions}</span>
          </div>
          <input
            type="range"
            min="20"
            max="100"
            step="5"
            value={repetitions}
            onChange={(e) => setRepetitions(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            Covered intervals
          </p>
          <p className="mt-2 text-3xl font-black">
            {coveredCount}/{repetitions}
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">
            Simulated coverage
          </p>
          <p className="mt-2 text-3xl font-black">
            {(coverage * 100).toFixed(1)}%
          </p>
        </div>

        <div className="rounded-2xl bg-amber-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">
            True mean
          </p>
          <p className="mt-2 text-3xl font-black">{trueMean}</p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-slate-50 p-5">
        <div className="relative h-[420px] overflow-hidden">
          <div
            className="absolute top-0 h-full w-1 rounded-full bg-slate-950"
            style={{ left: "50%" }}
          />

          {intervals.map((item, index) => {
            const left = Math.max(0, Math.min(100, 50 + (item.lower - 100)));
            const right = Math.max(0, Math.min(100, 50 + (item.upper - 100)));
            const top = (index / repetitions) * 400;

            return (
              <div
                key={index}
                className={`absolute h-[3px] rounded-full ${
                  item.covered ? "bg-blue-600" : "bg-red-500"
                }`}
                style={{
                  top,
                  left: `${left}%`,
                  width: `${Math.max(1, right - left)}%`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProportionCILab() {
  const [successes, setSuccesses] = useState(180);
  const [n, setN] = useState(500);
  const [level, setLevel] = useState(95);

  const x = Math.min(successes, n);
  const phat = x / n;
  const z = zCritical(level);
  const se = Math.sqrt((phat * (1 - phat)) / n);
  const margin = z * se;
  const lower = Math.max(0, phat - margin);
  const upper = Math.min(1, phat + margin);

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Proportion confidence interval lab
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        For binary outcomes, confidence intervals are often built from the
        sample proportion and its estimated standard error.
      </p>

      <MathBox>
        p̂ ± z × √[p̂(1 − p̂) / n]
      </MathBox>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Successes x</span>
            <span>{x}</span>
          </div>
          <input
            type="range"
            min="1"
            max={n}
            step="1"
            value={x}
            onChange={(e) => setSuccesses(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Sample size n</span>
            <span>{n}</span>
          </div>
          <input
            type="range"
            min="50"
            max="2000"
            step="10"
            value={n}
            onChange={(e) => {
              const newN = Number(e.target.value);
              setN(newN);
              setSuccesses((old) => Math.min(old, newN));
            }}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 text-sm font-bold">Confidence level</div>
          <select
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold"
          >
            <option value={90}>90%</option>
            <option value={95}>95%</option>
            <option value={99}>99%</option>
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            p̂
          </p>
          <p className="mt-2 text-3xl font-black">{phat.toFixed(3)}</p>
        </div>

        <div className="rounded-2xl bg-slate-100 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-700">
            estimated SE
          </p>
          <p className="mt-2 text-3xl font-black">{se.toFixed(4)}</p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">
            lower
          </p>
          <p className="mt-2 text-3xl font-black">{lower.toFixed(3)}</p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">
            upper
          </p>
          <p className="mt-2 text-3xl font-black">{upper.toFixed(3)}</p>
        </div>
      </div>
    </div>
  );
}

export default function ConfidenceIntervalsLessonPage() {
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
              Module 4 · Lesson 4.2
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:text-6xl">
              Confidence Intervals
            </h1>

            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600">
              Learn how point estimates become interval estimates. This lesson
              covers margin of error, confidence level, z and t intervals,
              proportion intervals, long-run coverage, interval width and common
              interpretation mistakes.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-700">
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
                  Last lesson we learned that a sample estimate varies from
                  sample to sample. So if I report only one number, like a
                  sample mean, I am hiding uncertainty?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Exactly. A point estimate is useful, but incomplete. A
                  confidence interval adds a range of plausible values for the
                  population parameter.
                </DialogueLine>

                <DialogueLine speaker="OL" name="Oliver">
                  So a confidence interval is like saying, “The estimate is
                  this, but allow for sampling uncertainty”?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  That is a very good first interpretation. It is an estimate
                  plus a margin of error.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="From point estimate to interval estimate">
              <p className="text-base leading-8 text-slate-700">
                Suppose a sample of 100 patients has mean systolic blood
                pressure x̄ = 128 mmHg. If the estimated standard error is 2
                mmHg, then a rough 95% confidence interval is:
              </p>

              <MathBox>128 ± 1.96 × 2</MathBox>

              <p className="text-base leading-8 text-slate-700">
                The margin of error is 3.92, so the interval is:
              </p>

              <MathBox>128 ± 3.92 = (124.08, 131.92)</MathBox>

              <div className="space-y-4">
                <DialogueLine speaker="JA" name="James">
                  Why multiply the standard error by 1.96?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Because for a standard normal distribution, about 95% of the
                  area lies between −1.96 and 1.96. That number is the critical
                  value for a two-sided 95% confidence interval.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="The general structure">
              <p className="text-base leading-8 text-slate-700">
                Most confidence intervals follow the same structure:
              </p>

              <MathBox>estimate ± critical value × standard error</MathBox>

              <p className="text-base leading-8 text-slate-700">
                The estimate gives the centre of the interval. The standard
                error measures sampling uncertainty. The critical value controls
                the confidence level.
              </p>
            </SectionCard>

            <SectionCard title="What 95% confidence really means">
              <p className="text-base leading-8 text-slate-700">
                A 95% confidence interval does not mean there is a 95%
                probability that the fixed population parameter lies inside this
                one computed interval. In the frequentist framework, the
                parameter is fixed and the interval is random before the sample
                is observed.
              </p>

              <div className="space-y-4">
                <DialogueLine speaker="SO" name="Sophia">
                  That sounds subtle. If we already calculated the interval, the
                  parameter is either inside it or not?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Correct. The 95% refers to the long-run success rate of the
                  method. If we repeated the sampling process many times and
                  built intervals the same way, about 95% of those intervals
                  would contain the true parameter.
                </DialogueLine>

                <DialogueLine speaker="EM" name="Emma">
                  So confidence is about the procedure, not magical probability
                  attached to this one interval?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Exactly. In practice we often speak informally, but
                  mathematically the long-run interpretation is the correct one.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="Width of a confidence interval">
              <p className="text-base leading-8 text-slate-700">
                The width of a confidence interval depends mainly on three
                things: variability, sample size and confidence level.
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="p-4">Change</th>
                      <th className="p-4">Effect on interval width</th>
                      <th className="p-4">Reason</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-4 font-bold">
                        Larger standard deviation
                      </td>
                      <td className="p-4">Wider interval</td>
                      <td className="p-4">
                        More variability in individual observations
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold">Larger sample size</td>
                      <td className="p-4">Narrower interval</td>
                      <td className="p-4">Smaller standard error</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold">
                        Higher confidence level
                      </td>
                      <td className="p-4">Wider interval</td>
                      <td className="p-4">Larger critical value</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SectionCard>

            <SectionCard title="Confidence interval for a mean">
              <p className="text-base leading-8 text-slate-700">
                If the population standard deviation σ is known and the sampling
                distribution is approximately normal, a confidence interval for μ
                is:
              </p>

              <MathBox>
                x̄ ± z
                <sub>α/2</sub>{" "}
                <Fraction numerator="σ" denominator="√n" />
              </MathBox>

              <p className="text-base leading-8 text-slate-700">
                If σ is unknown, we use the sample standard deviation s and a
                t-critical value:
              </p>

              <MathBox>
                x̄ ± t
                <sub>α/2,n−1</sub>{" "}
                <Fraction numerator="s" denominator="√n" />
              </MathBox>
            </SectionCard>

            <SectionCard title="Confidence interval for a proportion">
              <p className="text-base leading-8 text-slate-700">
                For a sample proportion p̂, a simple large-sample confidence
                interval is:
              </p>

              <MathBox>p̂ ± z × √[p̂(1 − p̂) / n]</MathBox>

              <p className="text-base leading-8 text-slate-700">
                This is based on the approximate normal sampling distribution of
                p̂. The approximation works better when sample size is large and
                the proportion is not too close to 0 or 1.
              </p>
            </SectionCard>

            <SectionCard title="Confidence interval is not proof">
              <p className="text-base leading-8 text-slate-700">
                A confidence interval gives a range of values compatible with
                the data and method. It does not prove all values inside the
                interval are equally likely. It does not prove values outside are
                impossible. It also does not repair biased sampling or poor
                measurement.
              </p>

              <div className="mt-5 rounded-2xl bg-red-50 p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-red-800">
                  Important warning
                </p>
                <p className="mt-2 text-sm leading-7 text-red-950">
                  A narrow interval means high precision under the model. It
                  does not automatically mean the study is unbiased or valid.
                </p>
              </div>
            </SectionCard>
          </>
        )}

        {activeTab === "notes" && (
          <>
            <SectionCard title="1. Point estimation and interval estimation">
              <p className="text-base leading-8">
                A point estimate gives a single number for an unknown parameter.
                An interval estimate gives a range of plausible values,
                acknowledging sampling uncertainty.
              </p>

              <div className="mt-5 rounded-2xl bg-blue-50 p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-800">
                  Definition
                </p>
                <p className="mt-2 text-sm leading-7 text-blue-950">
                  A confidence interval is a random interval constructed from
                  sample data using a method designed to cover the true parameter
                  with a specified long-run frequency.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="2. General confidence interval structure">
              <p className="text-base leading-8">
                Many confidence intervals have the form:
              </p>

              <MathBox>estimate ± critical value × standard error</MathBox>

              <p className="text-base leading-8">
                The margin of error is:
              </p>

              <MathBox>margin of error = critical value × standard error</MathBox>
            </SectionCard>

            <SectionCard title="3. Confidence level and significance level">
              <p className="text-base leading-8">
                If the confidence level is 1 − α, then α is the total tail
                probability left outside the central interval.
              </p>

              <MathBox>confidence level = 1 − α</MathBox>

              <p className="text-base leading-8">
                For a 95% confidence interval:
              </p>

              <MathBox>
                1 − α = 0.95
                <br />
                α = 0.05
                <br />
                α / 2 = 0.025 in each tail
              </MathBox>
            </SectionCard>

            <SectionCard title="4. Why the 95% z-critical value is 1.96">
              <p className="text-base leading-8">
                Let Z follow the standard normal distribution. For a two-sided
                95% confidence interval, we need the central 95% of the standard
                normal distribution:
              </p>

              <MathBox>
                P(−z
                <sub>α/2</sub> ≤ Z ≤ z
                <sub>α/2</sub>) = 1 − α
              </MathBox>

              <p className="text-base leading-8">
                For α = 0.05:
              </p>

              <MathBox>P(−1.96 ≤ Z ≤ 1.96) ≈ 0.95</MathBox>
            </SectionCard>

            <SectionCard title="5. Deriving the confidence interval for a mean when σ is known">
              <p className="text-base leading-8">
                Suppose X<sub>1</sub>, ..., X<sub>n</sub> are independent
                observations from a population with mean μ and known standard
                deviation σ. From the sampling distribution:
              </p>

              <MathBox>
                X̄ ≈ N(μ, σ<sup>2</sup> / n)
              </MathBox>

              <p className="text-base leading-8">
                Standardising:
              </p>

              <MathBox>
                Z ={" "}
                <Fraction
                  numerator={<span>X̄ − μ</span>}
                  denominator={<span>σ / √n</span>}
                />{" "}
                ≈ N(0, 1)
              </MathBox>

              <p className="text-base leading-8">
                For a 100(1 − α)% interval:
              </p>

              <MathBox>
                P(−z
                <sub>α/2</sub> ≤{" "}
                <Fraction
                  numerator={<span>X̄ − μ</span>}
                  denominator={<span>σ / √n</span>}
                />{" "}
                ≤ z
                <sub>α/2</sub>) ≈ 1 − α
              </MathBox>

              <p className="text-base leading-8">
                Solving this inequality for μ gives:
              </p>

              <MathBox>
                X̄ − z
                <sub>α/2</sub>{" "}
                <Fraction numerator="σ" denominator="√n" /> ≤ μ ≤ X̄ + z
                <sub>α/2</sub>{" "}
                <Fraction numerator="σ" denominator="√n" />
              </MathBox>

              <p className="text-base leading-8">
                Therefore, the interval is:
              </p>

              <MathBox>
                x̄ ± z
                <sub>α/2</sub>{" "}
                <Fraction numerator="σ" denominator="√n" />
              </MathBox>
            </SectionCard>

            <SectionCard title="6. Confidence interval for a mean when σ is unknown">
              <p className="text-base leading-8">
                In practice, σ is usually unknown. We estimate it using the
                sample standard deviation s. This adds extra uncertainty,
                especially for small samples.
              </p>

              <MathBox>
                x̄ ± t
                <sub>α/2,n−1</sub>{" "}
                <Fraction numerator="s" denominator="√n" />
              </MathBox>

              <p className="text-base leading-8">
                The degrees of freedom are:
              </p>

              <MathBox>ν = n − 1</MathBox>

              <p className="text-base leading-8">
                As n increases, the t-distribution becomes very close to the
                standard normal distribution.
              </p>
            </SectionCard>

            <SectionCard title="7. Confidence interval for a proportion">
              <p className="text-base leading-8">
                Let X follow a binomial distribution with n trials and success
                probability p. The sample proportion is:
              </p>

              <MathBox>p̂ = X / n</MathBox>

              <p className="text-base leading-8">
                For large samples:
              </p>

              <MathBox>p̂ ≈ N(p, p(1 − p) / n)</MathBox>

              <p className="text-base leading-8">
                Since p is unknown, estimate the standard error using p̂:
              </p>

              <MathBox>estimated SE(p̂) = √[p̂(1 − p̂) / n]</MathBox>

              <p className="text-base leading-8">
                The large-sample confidence interval is:
              </p>

              <MathBox>p̂ ± z × √[p̂(1 − p̂) / n]</MathBox>
            </SectionCard>

            <SectionCard title="8. Width of a confidence interval">
              <p className="text-base leading-8">
                For a mean with known σ, the full width is:
              </p>

              <MathBox>
                width = 2z
                <sub>α/2</sub>{" "}
                <Fraction numerator="σ" denominator="√n" />
              </MathBox>

              <p className="text-base leading-8">
                This shows the interval becomes wider when the critical value or
                σ increases, and narrower when n increases.
              </p>
            </SectionCard>

            <SectionCard title="9. Correct interpretation">
              <div className="rounded-2xl bg-emerald-50 p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-800">
                  Correct frequentist interpretation
                </p>
                <p className="mt-2 text-sm leading-7 text-emerald-950">
                  If we repeated the same sampling procedure many times and
                  constructed confidence intervals in the same way, approximately
                  100(1 − α)% of those intervals would contain the true
                  parameter.
                </p>
              </div>

              <p className="mt-5 text-base leading-8">
                After a particular interval has been computed, the true
                parameter is either inside the interval or not. The confidence
                level describes the method, not a probability attached to this
                one fixed interval.
              </p>
            </SectionCard>

            <SectionCard title="10. Common mistakes">
              <ul className="list-disc space-y-2 pl-6 text-base leading-8">
                <li>
                  Wrong: “There is a 95% probability that the parameter lies in
                  this interval.”
                </li>
                <li>
                  Better: “The method used has 95% long-run coverage under the
                  assumptions.”
                </li>
                <li>
                  Wrong: “Values inside the interval are equally likely.”
                </li>
                <li>
                  Better: “The interval gives values compatible with the data
                  and method.”
                </li>
                <li>
                  Wrong: “A narrow interval means the study is unbiased.”
                </li>
                <li>
                  Better: “A narrow interval means high precision, not
                  necessarily validity.”
                </li>
                <li>
                  Wrong: “A 99% interval is narrower than a 95% interval.”
                </li>
                <li>
                  Better: “A 99% interval is wider because it uses a larger
                  critical value.”
                </li>
              </ul>
            </SectionCard>
          </>
        )}

        {activeTab === "interactive" && (
          <>
            <MeanCILab />
            <WidthLab />
            <CoverageSimulator />
            <ProportionCILab />
          </>
        )}

        {activeTab === "examples" && (
          <>
            <SectionCard title="Worked example 1: 95% confidence interval for a mean">
              <p className="text-base leading-8">
                A sample has mean x̄ = 128 and standard error SE = 2. Find a
                95% confidence interval using z = 1.96.
              </p>

              <MathBox>
                CI = estimate ± critical value × SE
                <br />
                CI = 128 ± 1.96 × 2
                <br />
                CI = 128 ± 3.92
                <br />
                CI = (124.08, 131.92)
              </MathBox>
            </SectionCard>

            <SectionCard title="Worked example 2: changing confidence level">
              <p className="text-base leading-8">
                Using the same estimate 128 and SE = 2, compare 90%, 95% and
                99% intervals.
              </p>

              <MathBox>
                90%: 128 ± 1.645 × 2 = 128 ± 3.29
                <br />
                95%: 128 ± 1.96 × 2 = 128 ± 3.92
                <br />
                99%: 128 ± 2.576 × 2 = 128 ± 5.152
              </MathBox>

              <p className="text-base leading-8">
                The 99% interval is widest because it uses the largest critical
                value.
              </p>
            </SectionCard>

            <SectionCard title="Worked example 3: t confidence interval">
              <p className="text-base leading-8">
                A sample has n = 25, x̄ = 72 and sample standard deviation s =
                10. Suppose the t critical value is 2.064. Find the 95%
                confidence interval.
              </p>

              <MathBox>
                estimated SE = s / √n = 10 / √25 = 2
                <br />
                margin = 2.064 × 2 = 4.128
                <br />
                CI = 72 ± 4.128
                <br />
                CI = (67.872, 76.128)
              </MathBox>
            </SectionCard>

            <SectionCard title="Worked example 4: confidence interval for a proportion">
              <p className="text-base leading-8">
                In a sample of 500 people, 180 have a particular outcome. Find
                an approximate 95% confidence interval for the population
                proportion.
              </p>

              <MathBox>
                p̂ = 180 / 500 = 0.36
                <br />
                SE = √[0.36(0.64) / 500]
                <br />
                SE = √0.0004608 ≈ 0.0215
                <br />
                margin = 1.96 × 0.0215 ≈ 0.0421
                <br />
                CI = 0.36 ± 0.0421 = (0.3179, 0.4021)
              </MathBox>
            </SectionCard>

            <SectionCard title="Worked example 5: interpreting a confidence interval">
              <p className="text-base leading-8">
                A 95% confidence interval for a mean difference is (2.4, 8.9).
                How should this be interpreted?
              </p>

              <div className="rounded-2xl bg-emerald-50 p-5">
                <p className="text-sm leading-7 text-emerald-950">
                  The interval suggests that values between 2.4 and 8.9 are
                  compatible with the data and method as plausible values for
                  the population mean difference. The method has 95% long-run
                  coverage under its assumptions.
                </p>
              </div>

              <div className="mt-4 rounded-2xl bg-red-50 p-5">
                <p className="text-sm leading-7 text-red-950">
                  Do not say: “There is a 95% probability that the true mean
                  difference lies between 2.4 and 8.9.”
                </p>
              </div>
            </SectionCard>
          </>
        )}

        {activeTab === "exercises" && (
          <SectionCard title="Exercises">
            <div className="space-y-5">
              {[
                {
                  title: "Exercise 1",
                  q: "A sample mean is 50 and the standard error is 4. Use z = 1.96 to form a 95% confidence interval.",
                  a: "Margin = 1.96 × 4 = 7.84. CI = 50 ± 7.84 = (42.16, 57.84).",
                },
                {
                  title: "Exercise 2",
                  q: "A sample has x̄ = 100, s = 20 and n = 64. Estimate the standard error.",
                  a: "Estimated SE = s / √n = 20 / √64 = 20 / 8 = 2.5.",
                },
                {
                  title: "Exercise 3",
                  q: "Using x̄ = 100, SE = 2.5 and z = 1.96, form a 95% confidence interval.",
                  a: "Margin = 1.96 × 2.5 = 4.9. CI = 100 ± 4.9 = (95.1, 104.9).",
                },
                {
                  title: "Exercise 4",
                  q: "In a sample of 400 people, 120 have an outcome. Find p̂.",
                  a: "p̂ = 120 / 400 = 0.30.",
                },
                {
                  title: "Exercise 5",
                  q: "For p̂ = 0.30 and n = 400, estimate SE(p̂).",
                  a: "Estimated SE = √[0.30(0.70)/400] = √0.000525 ≈ 0.0229.",
                },
                {
                  title: "Exercise 6",
                  q: "Explain why a 99% confidence interval is wider than a 95% interval.",
                  a: "A 99% interval uses a larger critical value, so the margin of error is larger. To achieve higher long-run coverage, the method casts a wider interval.",
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
                  You have completed Lesson 4.2. You are ready for the
                  hypothesis testing framework.
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