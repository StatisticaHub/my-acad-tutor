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
    question: "Why does sample size matter in inference?",
    options: [
      "It removes all bias automatically",
      "It controls random uncertainty and affects precision and power",
      "It makes every result clinically important",
      "It replaces the need for study design",
    ],
    answer: 1,
    explanation:
      "Sample size affects standard error, confidence interval width and power. It does not automatically remove bias.",
  },
  {
    question: "For estimating a mean with known σ, what happens to the margin of error when n increases?",
    options: [
      "It increases",
      "It decreases because SE = σ / √n decreases",
      "It stays exactly the same",
      "It becomes equal to σ",
    ],
    answer: 1,
    explanation:
      "For a mean, standard error is σ / √n. Larger n reduces SE and therefore reduces the margin of error.",
  },
  {
    question: "To halve the standard error of a mean, sample size must be:",
    options: [
      "doubled",
      "tripled",
      "quadrupled",
      "kept the same",
    ],
    answer: 2,
    explanation:
      "Because SE decreases with √n, halving SE requires multiplying n by 4.",
  },
  {
    question: "What is power?",
    options: [
      "The probability of detecting a specified true effect",
      "The probability that H₀ is true",
      "The width of a confidence interval",
      "The sample variance",
    ],
    answer: 0,
    explanation:
      "Power is the probability of rejecting H₀ when a specified alternative effect is truly present.",
  },
  {
    question: "Which problem cannot be fixed simply by increasing sample size?",
    options: [
      "Random error",
      "Standard error",
      "Wide intervals caused by small n",
      "Systematic bias from poor sampling",
    ],
    answer: 3,
    explanation:
      "A larger sample can reduce random error, but it does not automatically fix bias caused by poor design, poor measurement or non-representative sampling.",
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

function zPower(power: number) {
  if (power === 0.8) return 0.84;
  if (power === 0.9) return 1.282;
  return 1.645;
}

function zAlpha(alpha: number) {
  if (alpha === 0.1) return 1.645;
  if (alpha === 0.05) return 1.96;
  return 2.576;
}

function PrecisionSampleSizeLab() {
  const [sigma, setSigma] = useState(15);
  const [margin, setMargin] = useState(3);
  const [confidence, setConfidence] = useState(95);

  const z = confidence === 90 ? 1.645 : confidence === 95 ? 1.96 : 2.576;
  const requiredN = Math.ceil(Math.pow((z * sigma) / margin, 2));

  const values = [1, 2, 3, 4, 5, 6, 8, 10].map((m) => ({
    margin: m,
    n: Math.ceil(Math.pow((z * sigma) / m, 2)),
  }));

  const maxN = Math.max(...values.map((v) => v.n));

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Sample size for precision lab
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        Plan a sample size for estimating a mean with a desired margin of error.
        This is a precision-based sample size calculation.
      </p>

      <MathBox>
        n ={" "}
        <span>
          (zσ / E)<sup>2</sup>
        </span>
        <br />
        E = desired margin of error
      </MathBox>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Expected standard deviation σ</span>
            <span>{sigma.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="2"
            max="60"
            step="1"
            value={sigma}
            onChange={(e) => setSigma(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Desired margin E</span>
            <span>{margin.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="12"
            step="0.5"
            value={margin}
            onChange={(e) => setMargin(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 text-sm font-bold">Confidence level</div>
          <select
            value={confidence}
            onChange={(e) => setConfidence(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold"
          >
            <option value={90}>90%</option>
            <option value={95}>95%</option>
            <option value={99}>99%</option>
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            z critical
          </p>
          <p className="mt-2 text-3xl font-black">{z.toFixed(3)}</p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">
            required n
          </p>
          <p className="mt-2 text-3xl font-black">{requiredN}</p>
        </div>

        <div className="rounded-2xl bg-amber-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">
            full interval width
          </p>
          <p className="mt-2 text-3xl font-black">
            {(2 * margin).toFixed(1)}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {values.map((item) => (
          <div key={item.margin}>
            <div className="mb-1 flex justify-between text-xs font-bold text-slate-500">
              <span>margin E = {item.margin}</span>
              <span>n = {item.n}</span>
            </div>

            <div className="h-8 overflow-hidden rounded-full bg-slate-100">
              <div
                className="flex h-full items-center justify-end rounded-full bg-blue-600 pr-3 text-xs font-black text-white"
                style={{ width: `${Math.max(5, (item.n / maxN) * 100)}%` }}
              >
                {item.n}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PowerSampleSizeLab() {
  const [effect, setEffect] = useState(5);
  const [sigma, setSigma] = useState(15);
  const [alpha, setAlpha] = useState(0.05);
  const [power, setPower] = useState(0.8);

  const za = zAlpha(alpha);
  const zp = zPower(power);
  const nPerGroup = Math.ceil(
    (2 * Math.pow(sigma, 2) * Math.pow(za + zp, 2)) / Math.pow(effect, 2)
  );
  const totalN = 2 * nPerGroup;

  const detectable = [20, 40, 60, 80, 100, 150, 200, 300].map((total) => {
    const perGroup = total / 2;
    const mde = Math.sqrt(
      (2 * Math.pow(sigma, 2) * Math.pow(za + zp, 2)) / perGroup
    );
    return { total, mde };
  });

  const maxMde = Math.max(...detectable.map((d) => d.mde));

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Power-based sample size lab
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        Plan a two-group comparison. This simplified formula estimates the
        required sample size per group for detecting a mean difference.
      </p>

      <MathBox>
        n per group ≈{" "}
        <Fraction
          numerator={
            <span>
              2σ<sup>2</sup>(z<sub>α/2</sub> + z<sub>power</sub>)
              <sup>2</sup>
            </span>
          }
          denominator={<span>δ<sup>2</sup></span>}
        />
      </MathBox>

      <div className="mt-6 grid gap-5 md:grid-cols-4">
        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Effect δ</span>
            <span>{effect.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="1"
            max="25"
            step="0.5"
            value={effect}
            onChange={(e) => setEffect(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Standard deviation σ</span>
            <span>{sigma.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="3"
            max="50"
            step="0.5"
            value={sigma}
            onChange={(e) => setSigma(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 text-sm font-bold">α level</div>
          <select
            value={alpha}
            onChange={(e) => setAlpha(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold"
          >
            <option value={0.1}>0.10</option>
            <option value={0.05}>0.05</option>
            <option value={0.01}>0.01</option>
          </select>
        </label>

        <label>
          <div className="mb-2 text-sm font-bold">Desired power</div>
          <select
            value={power}
            onChange={(e) => setPower(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold"
          >
            <option value={0.8}>80%</option>
            <option value={0.9}>90%</option>
            <option value={0.95}>95%</option>
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            z α/2
          </p>
          <p className="mt-2 text-3xl font-black">{za.toFixed(3)}</p>
        </div>

        <div className="rounded-2xl bg-slate-100 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
            z power
          </p>
          <p className="mt-2 text-3xl font-black">{zp.toFixed(3)}</p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">
            n per group
          </p>
          <p className="mt-2 text-3xl font-black">{nPerGroup}</p>
        </div>

        <div className="rounded-2xl bg-amber-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">
            total n
          </p>
          <p className="mt-2 text-3xl font-black">{totalN}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {detectable.map((item) => (
          <div key={item.total}>
            <div className="mb-1 flex justify-between text-xs font-bold text-slate-500">
              <span>total n = {item.total}</span>
              <span>minimum detectable effect ≈ {item.mde.toFixed(2)}</span>
            </div>

            <div className="h-8 overflow-hidden rounded-full bg-slate-100">
              <div
                className="flex h-full items-center justify-end rounded-full bg-blue-600 pr-3 text-xs font-black text-white"
                style={{ width: `${Math.max(6, (item.mde / maxMde) * 100)}%` }}
              >
                {item.mde.toFixed(1)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AllocationLab() {
  const [totalN, setTotalN] = useState(200);
  const [allocation, setAllocation] = useState(50);

  const n1 = Math.round((allocation / 100) * totalN);
  const n2 = totalN - n1;

  const relativeSE =
    n1 > 0 && n2 > 0 ? Math.sqrt(1 / n1 + 1 / n2) : Number.POSITIVE_INFINITY;

  const balancedSE = Math.sqrt(1 / (totalN / 2) + 1 / (totalN / 2));
  const efficiency = (balancedSE / relativeSE) * 100;

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Allocation balance lab
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        In a two-group comparison, balanced allocation often gives better
        precision for a fixed total sample size.
      </p>

      <MathBox>
        SE difference ∝ √(1 / n<sub>1</sub> + 1 / n<sub>2</sub>)
      </MathBox>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Total sample size</span>
            <span>{totalN}</span>
          </div>
          <input
            type="range"
            min="40"
            max="1000"
            step="10"
            value={totalN}
            onChange={(e) => setTotalN(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>% assigned to group 1</span>
            <span>{allocation}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="90"
            step="1"
            value={allocation}
            onChange={(e) => setAllocation(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            group 1 n
          </p>
          <p className="mt-2 text-3xl font-black">{n1}</p>
        </div>

        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            group 2 n
          </p>
          <p className="mt-2 text-3xl font-black">{n2}</p>
        </div>

        <div className="rounded-2xl bg-slate-100 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
            relative SE
          </p>
          <p className="mt-2 text-3xl font-black">{relativeSE.toFixed(3)}</p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">
            efficiency
          </p>
          <p className="mt-2 text-3xl font-black">{efficiency.toFixed(1)}%</p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-10 bg-blue-600 text-right text-sm font-black leading-10 text-white"
          style={{ width: `${allocation}%` }}
        >
          group 1&nbsp;
        </div>
      </div>
    </div>
  );
}

function BiasDesignLab() {
  const [n, setN] = useState(200);
  const [bias, setBias] = useState(8);
  const [sigma, setSigma] = useState(20);

  const se = sigma / Math.sqrt(n);
  const randomError = 1.96 * se;
  const totalConcern = Math.sqrt(randomError ** 2 + bias ** 2);

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Random error versus bias lab
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        Sample size reduces random error, but it does not remove systematic
        bias. This is why study design matters as much as calculation.
      </p>

      <MathBox>
        Larger n reduces random error
        <br />
        Larger n does not automatically reduce bias
      </MathBox>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Sample size n</span>
            <span>{n}</span>
          </div>
          <input
            type="range"
            min="20"
            max="3000"
            step="20"
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Systematic bias</span>
            <span>{bias.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="30"
            step="0.5"
            value={bias}
            onChange={(e) => setBias(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Standard deviation σ</span>
            <span>{sigma.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="3"
            max="80"
            step="1"
            value={sigma}
            onChange={(e) => setSigma(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            SE
          </p>
          <p className="mt-2 text-3xl font-black">{se.toFixed(3)}</p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">
            random margin
          </p>
          <p className="mt-2 text-3xl font-black">{randomError.toFixed(2)}</p>
        </div>

        <div className="rounded-2xl bg-red-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-red-700">
            bias
          </p>
          <p className="mt-2 text-3xl font-black">{bias.toFixed(1)}</p>
        </div>

        <div className="rounded-2xl bg-amber-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">
            combined concern
          </p>
          <p className="mt-2 text-3xl font-black">{totalConcern.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-red-50 p-5">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-red-800">
          Design warning
        </p>
        <p className="mt-2 text-sm leading-7 text-red-950">
          A huge biased study can produce a very narrow confidence interval
          around the wrong answer. Good inference requires both adequate sample
          size and valid design.
        </p>
      </div>
    </div>
  );
}

export default function SampleSizeStudyDesignLessonPage() {
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
              Module 4 · Lesson 4.5
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:text-6xl">
              Sample Size and Study Design
            </h1>

            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600">
              Complete the inference module by learning how sample size,
              variability, effect size, power, precision, allocation and study
              design shape the quality of statistical evidence.
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
                  We have learned confidence intervals, p-values, errors and
                  power. But before collecting data, how do we know how many
                  observations we need?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  That is the purpose of sample size planning. We decide how
                  much precision or power we need before the study begins.
                </DialogueLine>

                <DialogueLine speaker="OL" name="Oliver">
                  So sample size is not just “bigger is better”?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Exactly. Bigger samples reduce random error, but good study
                  design is still essential. A large biased study can be
                  confidently wrong.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="Two reasons for sample size planning">
              <p className="text-base leading-8 text-slate-700">
                Sample size is usually planned for one of two goals: precision
                or power. Precision focuses on how narrow an estimate should be.
                Power focuses on the probability of detecting a meaningful
                effect.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-blue-50 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-800">
                    Precision goal
                  </p>
                  <p className="mt-2 text-sm leading-7 text-blue-950">
                    “How narrow do we want the confidence interval to be?”
                  </p>
                </div>

                <div className="rounded-2xl bg-emerald-50 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-800">
                    Power goal
                  </p>
                  <p className="mt-2 text-sm leading-7 text-emerald-950">
                    “How likely do we want to be to detect a meaningful effect?”
                  </p>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Sample size for estimating a mean precisely">
              <p className="text-base leading-8 text-slate-700">
                Suppose we want a confidence interval for a mean with margin of
                error E. If the population standard deviation is approximately
                σ, the margin of error is:
              </p>

              <MathBox>
                E = z × <Fraction numerator="σ" denominator="√n" />
              </MathBox>

              <p className="text-base leading-8 text-slate-700">
                Solving for n gives:
              </p>

              <MathBox>
                n = (zσ / E)<sup>2</sup>
              </MathBox>

              <div className="space-y-4">
                <DialogueLine speaker="JA" name="James">
                  So if I want a smaller margin of error, I need a larger
                  sample?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Yes, but the square matters. Halving the margin of error
                  requires about four times the sample size.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="Sample size for detecting an effect">
              <p className="text-base leading-8 text-slate-700">
                Power-based sample size planning starts with a minimum effect
                size worth detecting. This is often called the minimum
                clinically important difference, minimum educationally important
                difference, or minimum detectable effect.
              </p>

              <MathBox>
                larger effect ⇒ smaller required n
                <br />
                larger variability ⇒ larger required n
                <br />
                higher power ⇒ larger required n
              </MathBox>

              <p className="text-base leading-8 text-slate-700">
                Planning a study without specifying a meaningful effect size can
                lead to a technically powered but scientifically weak study.
              </p>
            </SectionCard>

            <SectionCard title="Why variability matters">
              <p className="text-base leading-8 text-slate-700">
                If individuals vary widely, it is harder to estimate a mean
                precisely or detect a difference. Higher variability increases
                standard error and therefore increases required sample size.
              </p>

              <div className="space-y-4">
                <DialogueLine speaker="SO" name="Sophia">
                  So improving measurement quality can reduce sample size?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Often, yes. Better measurement, clearer eligibility criteria
                  and stronger design can reduce noise, which improves
                  precision and power.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="Allocation and comparison groups">
              <p className="text-base leading-8 text-slate-700">
                In two-group comparisons, total sample size is not the only
                issue. How participants are allocated across groups also
                matters. For a fixed total sample size, balanced allocation is
                often most efficient.
              </p>

              <MathBox>
                SE difference ∝ √(1 / n<sub>1</sub> + 1 / n<sub>2</sub>)
              </MathBox>

              <p className="text-base leading-8 text-slate-700">
                If one group is very small, the uncertainty of the comparison
                becomes large even if the total sample size looks reasonable.
              </p>
            </SectionCard>

            <SectionCard title="Sample size does not fix bias">
              <p className="text-base leading-8 text-slate-700">
                A large sample reduces random sampling error. It does not
                automatically fix selection bias, measurement bias, confounding,
                missing data or poor design.
              </p>

              <div className="space-y-4">
                <DialogueLine speaker="OL" name="Oliver">
                  So 100,000 badly sampled observations can still be wrong?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Exactly. Precision is not validity. A huge sample can produce
                  a very narrow confidence interval around a biased estimate.
                </DialogueLine>
              </div>

              <div className="mt-5 rounded-2xl bg-red-50 p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-red-800">
                  Final inference warning
                </p>
                <p className="mt-2 text-sm leading-7 text-red-950">
                  Statistical inference is strongest when sample size planning,
                  measurement, sampling strategy, design and analysis all match
                  the research question.
                </p>
              </div>
            </SectionCard>
          </>
        )}

        {activeTab === "notes" && (
          <>
            <SectionCard title="1. Why sample size planning is needed">
              <p className="text-base leading-8">
                Sample size planning connects statistical inference to study
                design. It asks whether a study is likely to estimate the target
                precisely enough or detect a meaningful effect with adequate
                probability.
              </p>

              <div className="mt-5 rounded-2xl bg-blue-50 p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-800">
                  Core distinction
                </p>
                <p className="mt-2 text-sm leading-7 text-blue-950">
                  Precision planning targets interval width. Power planning
                  targets the probability of detecting a specified effect.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="2. Precision-based sample size for a mean">
              <p className="text-base leading-8">
                For a mean with known or anticipated standard deviation σ, a
                two-sided confidence interval has margin of error:
              </p>

              <MathBox>
                E = z<sub>α/2</sub>{" "}
                <Fraction numerator="σ" denominator="√n" />
              </MathBox>

              <p className="text-base leading-8">
                Solve for n:
              </p>

              <MathBox>
                E√n = z<sub>α/2</sub>σ
                <br />
                √n ={" "}
                <Fraction
                  numerator={
                    <span>
                      z<sub>α/2</sub>σ
                    </span>
                  }
                  denominator="E"
                />
                <br />
                n ={" "}
                <span>
                  (z<sub>α/2</sub>σ / E)<sup>2</sup>
                </span>
              </MathBox>

              <p className="text-base leading-8">
                Since n must be a whole number, we round up.
              </p>
            </SectionCard>

            <SectionCard title="3. Precision-based sample size for a proportion">
              <p className="text-base leading-8">
                For a proportion, the approximate margin of error is:
              </p>

              <MathBox>
                E = z<sub>α/2</sub> √[p(1 − p) / n]
              </MathBox>

              <p className="text-base leading-8">
                Solving for n gives:
              </p>

              <MathBox>
                n ={" "}
                <Fraction
                  numerator={
                    <span>
                      z<sub>α/2</sub>
                      <sup>2</sup>p(1 − p)
                    </span>
                  }
                  denominator={<span>E<sup>2</sup></span>}
                />
              </MathBox>

              <p className="text-base leading-8">
                If p is unknown, p = 0.5 is often used as a conservative choice
                because p(1 − p) is largest at 0.5.
              </p>
            </SectionCard>

            <SectionCard title="4. Power-based sample size">
              <p className="text-base leading-8">
                Power-based planning begins with a meaningful effect size δ, a
                target power, a significance level α and an estimate of
                variability σ.
              </p>

              <MathBox>
                Power = P(reject H<sub>0</sub> | specified alternative true)
              </MathBox>

              <p className="text-base leading-8">
                For a simplified two-group comparison with equal allocation:
              </p>

              <MathBox>
                n per group ≈{" "}
                <Fraction
                  numerator={
                    <span>
                      2σ<sup>2</sup>(z<sub>α/2</sub> + z<sub>power</sub>)
                      <sup>2</sup>
                    </span>
                  }
                  denominator={<span>δ<sup>2</sup></span>}
                />
              </MathBox>

              <p className="text-base leading-8">
                This formula shows that required n increases with variability
                and decreases as the target effect size becomes larger.
              </p>
            </SectionCard>

            <SectionCard title="5. Minimum detectable effect">
              <p className="text-base leading-8">
                The minimum detectable effect is the smallest effect a study is
                designed to detect with a chosen power and significance level.
              </p>

              <MathBox>
                smaller detectable effect ⇒ larger required sample size
              </MathBox>

              <p className="text-base leading-8">
                A study may be well powered for a large effect but underpowered
                for a smaller effect that is still scientifically important.
              </p>
            </SectionCard>

            <SectionCard title="6. Diminishing returns">
              <p className="text-base leading-8">
                Standard error decreases with the square root of sample size:
              </p>

              <MathBox>
                SE = <Fraction numerator="σ" denominator="√n" />
              </MathBox>

              <p className="text-base leading-8">
                This creates diminishing returns:
              </p>

              <MathBox>
                n × 4 ⇒ SE / 2
                <br />
                n × 9 ⇒ SE / 3
                <br />
                n × 100 ⇒ SE / 10
              </MathBox>
            </SectionCard>

            <SectionCard title="7. Allocation in two-group studies">
              <p className="text-base leading-8">
                For a two-group comparison, the standard error of a difference
                depends on both group sizes:
              </p>

              <MathBox>
                SE difference ∝ √(1 / n<sub>1</sub> + 1 / n<sub>2</sub>)
              </MathBox>

              <p className="text-base leading-8">
                For a fixed total sample size, balanced allocation usually gives
                the smallest standard error when groups have similar variability
                and similar measurement cost.
              </p>
            </SectionCard>

            <SectionCard title="8. Design features that affect effective sample size">
              <p className="text-base leading-8">
                The nominal sample size is the number of observations collected.
                The effective sample size may be smaller when observations are
                highly correlated, clustered, poorly measured or affected by
                missingness.
              </p>

              <ul className="list-disc space-y-2 pl-6 text-base leading-8">
                <li>Clustered samples can contain less independent information.</li>
                <li>High missingness can reduce usable sample size.</li>
                <li>Poor measurement can increase variability.</li>
                <li>Imbalanced groups can reduce comparison precision.</li>
                <li>Selection bias can damage validity even with huge n.</li>
              </ul>
            </SectionCard>

            <SectionCard title="9. Random error and systematic error">
              <p className="text-base leading-8">
                Random error is sample-to-sample variation. Systematic error is
                bias caused by design, measurement or sampling problems.
              </p>

              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="p-4">Error type</th>
                      <th className="p-4">Reduced by larger n?</th>
                      <th className="p-4">Main solution</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-4 font-bold">Random error</td>
                      <td className="p-4">Yes</td>
                      <td className="p-4">Increase n, reduce variability</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold">Systematic bias</td>
                      <td className="p-4">Not necessarily</td>
                      <td className="p-4">
                        Improve design, sampling and measurement
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SectionCard>

            <SectionCard title="10. Sample size planning checklist">
              <ul className="list-disc space-y-2 pl-6 text-base leading-8">
                <li>What is the primary research question?</li>
                <li>What is the primary outcome?</li>
                <li>Is the goal precision or power?</li>
                <li>What effect size is scientifically meaningful?</li>
                <li>What variability is expected?</li>
                <li>What confidence level, α and power are required?</li>
                <li>How much missing data or dropout is expected?</li>
                <li>Are observations independent or clustered?</li>
                <li>Is the sampling method representative of the target population?</li>
                <li>Will the final analysis match the design?</li>
              </ul>
            </SectionCard>
          </>
        )}

        {activeTab === "interactive" && (
          <>
            <PrecisionSampleSizeLab />
            <PowerSampleSizeLab />
            <AllocationLab />
            <BiasDesignLab />
          </>
        )}

        {activeTab === "examples" && (
          <>
            <SectionCard title="Worked example 1: sample size for estimating a mean">
              <p className="text-base leading-8">
                A researcher wants to estimate a mean with 95% confidence. The
                anticipated standard deviation is σ = 12, and the desired margin
                of error is E = 3.
              </p>

              <MathBox>
                n = (zσ / E)<sup>2</sup>
                <br />
                n = (1.96 × 12 / 3)<sup>2</sup>
                <br />
                n = (7.84)<sup>2</sup> = 61.47
                <br />
                n = 62 after rounding up
              </MathBox>
            </SectionCard>

            <SectionCard title="Worked example 2: sample size for a proportion">
              <p className="text-base leading-8">
                Estimate a population proportion with 95% confidence and margin
                of error E = 0.04. No prior estimate of p is available, so use p
                = 0.5.
              </p>

              <MathBox>
                n = z<sup>2</sup>p(1 − p) / E<sup>2</sup>
                <br />
                n = 1.96<sup>2</sup>(0.5)(0.5) / 0.04<sup>2</sup>
                <br />
                n = 3.8416 × 0.25 / 0.0016
                <br />
                n = 600.25
                <br />
                n = 601 after rounding up
              </MathBox>
            </SectionCard>

            <SectionCard title="Worked example 3: effect of halving margin of error">
              <p className="text-base leading-8">
                Suppose a study needs n = 100 for a certain margin of error. How
                many observations are needed to halve the margin of error,
                assuming everything else is unchanged?
              </p>

              <MathBox>
                margin ∝ 1 / √n
                <br />
                To halve margin, multiply n by 4
                <br />
                required n = 4 × 100 = 400
              </MathBox>
            </SectionCard>

            <SectionCard title="Worked example 4: interpreting power">
              <p className="text-base leading-8">
                A study has 80% power to detect a difference of 5 units at α =
                0.05.
              </p>

              <div className="rounded-2xl bg-emerald-50 p-5">
                <p className="text-sm leading-7 text-emerald-950">
                  Interpretation: If the true difference is 5 units and the
                  study assumptions are correct, the test has an 80% probability
                  of rejecting H₀. It also has a 20% probability of missing that
                  effect.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="Worked example 5: why design matters">
              <p className="text-base leading-8">
                A study collects 50,000 responses from a voluntary online poll.
                The confidence interval is extremely narrow. Is the study
                automatically valid?
              </p>

              <div className="rounded-2xl bg-red-50 p-5">
                <p className="text-sm leading-7 text-red-950">
                  No. The large sample size reduces random error, but the study
                  may suffer from selection bias if respondents are not
                  representative of the target population.
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
                  q: "For 95% confidence, σ = 10 and desired margin E = 2, find the required sample size for estimating a mean.",
                  a: "n = (1.96 × 10 / 2)² = (9.8)² = 96.04. Round up to n = 97.",
                },
                {
                  title: "Exercise 2",
                  q: "For a proportion, use p = 0.5, 95% confidence and E = 0.05. Find n.",
                  a: "n = 1.96² × 0.5 × 0.5 / 0.05² = 3.8416 × 0.25 / 0.0025 = 384.16. Round up to n = 385.",
                },
                {
                  title: "Exercise 3",
                  q: "Why does halving the margin of error require about four times the sample size?",
                  a: "Because margin of error is proportional to 1/√n. To divide the margin by 2, √n must double, so n must multiply by 4.",
                },
                {
                  title: "Exercise 4",
                  q: "List four ingredients needed for power-based sample size planning.",
                  a: "A meaningful effect size, expected variability, significance level α, desired power, and usually assumptions about design/allocation.",
                },
                {
                  title: "Exercise 5",
                  q: "Why can an imbalanced two-group study be less efficient?",
                  a: "Because the standard error of a difference depends on 1/n1 + 1/n2. If one group is small, that term becomes large and precision decreases.",
                },
                {
                  title: "Exercise 6",
                  q: "Explain why a large sample cannot automatically fix selection bias.",
                  a: "Increasing n reduces random error, but selection bias is systematic. If the sampling process targets the wrong population, a larger sample can precisely estimate the wrong quantity.",
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
                  You have completed Module 4. You are now ready for the next
                  module, where inference can be connected to modelling,
                  regression and applied statistical analysis.
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