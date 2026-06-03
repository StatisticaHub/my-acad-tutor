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

type Tail = "two-sided" | "right" | "left";

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
    question: "Which interpretation of a p-value is correct?",
    options: [
      "The probability that H₀ is true",
      "The probability that H₁ is true",
      "The probability, assuming H₀ is true, of data as or more extreme than observed",
      "The probability that the result is practically important",
    ],
    answer: 2,
    explanation:
      "A p-value is calculated under the null model. It is a tail probability assuming H₀ is true.",
  },
  {
    question: "What is α in hypothesis testing?",
    options: [
      "The probability of a Type I error",
      "The probability of a Type II error",
      "The sample mean",
      "The observed effect size",
    ],
    answer: 0,
    explanation:
      "α is the significance level. It controls the probability of rejecting H₀ when H₀ is true.",
  },
  {
    question: "What is β?",
    options: [
      "The probability of rejecting a true H₀",
      "The probability of failing to reject H₀ when H₀ is false",
      "The confidence level",
      "The observed p-value",
    ],
    answer: 1,
    explanation:
      "β is the probability of a Type II error: failing to reject H₀ when the specified alternative is true.",
  },
  {
    question: "What is power?",
    options: [
      "α + β",
      "1 − α",
      "1 − β",
      "The p-value divided by the sample size",
    ],
    answer: 2,
    explanation:
      "Power is 1 − β. It is the probability of detecting a specified effect when that effect is truly present.",
  },
  {
    question: "Which change usually increases power?",
    options: [
      "Smaller sample size",
      "Larger variability",
      "Larger true effect size",
      "Lower measurement quality",
    ],
    answer: 2,
    explanation:
      "Power generally increases with larger true effects, larger sample sizes, smaller variability and appropriate study design.",
  },
];

function erf(x: number) {
  const sign = x >= 0 ? 1 : -1;
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const absX = Math.abs(x);
  const t = 1 / (1 + p * absX);

  const y =
    1 -
    (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) *
      t *
      Math.exp(-absX * absX));

  return sign * y;
}

function normalCdf(x: number) {
  return 0.5 * (1 + erf(x / Math.sqrt(2)));
}

function normalPdf(x: number) {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

function pValueFromZ(z: number, tail: Tail) {
  if (tail === "right") return 1 - normalCdf(z);
  if (tail === "left") return normalCdf(z);
  return 2 * (1 - normalCdf(Math.abs(z)));
}

function zCritical(alpha: number, tail: Tail) {
  if (tail === "two-sided") {
    if (alpha === 0.1) return 1.645;
    if (alpha === 0.05) return 1.96;
    return 2.576;
  }

  if (alpha === 0.1) return 1.282;
  if (alpha === 0.05) return 1.645;
  return 2.326;
}

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

function PValueExplorer() {
  const [z, setZ] = useState(1.8);
  const [tail, setTail] = useState<Tail>("two-sided");
  const [alpha, setAlpha] = useState(0.05);

  const p = pValueFromZ(z, tail);
  const reject = p <= alpha;

  const points = useMemo(() => {
    return Array.from({ length: 161 }, (_, i) => {
      const x = -4 + (8 * i) / 160;
      return { x, y: normalPdf(x) };
    });
  }, []);

  const maxY = Math.max(...points.map((point) => point.y));

  const path = points
    .map((point, i) => {
      const xSvg = 35 + (i / (points.length - 1)) * 350;
      const ySvg = 220 - (point.y / maxY) * 170;
      return `${i === 0 ? "M" : "L"} ${xSvg} ${ySvg}`;
    })
    .join(" ");

  const zPosition = 35 + ((Math.max(-4, Math.min(4, z)) + 4) / 8) * 350;

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        P-value tail-area explorer
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        Move the observed z-statistic and choose the alternative hypothesis. The
        p-value changes because “as extreme or more extreme” depends on the
        alternative.
      </p>

      <MathBox>
        p-value = P(result as or more extreme | H<sub>0</sub> true)
      </MathBox>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Observed z</span>
            <span>{z.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="-3.5"
            max="3.5"
            step="0.05"
            value={z}
            onChange={(e) => setZ(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 text-sm font-bold">Alternative</div>
          <select
            value={tail}
            onChange={(e) => setTail(e.target.value as Tail)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold"
          >
            <option value="two-sided">two-sided: different</option>
            <option value="right">right-tailed: greater</option>
            <option value="left">left-tailed: smaller</option>
          </select>
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
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            z observed
          </p>
          <p className="mt-2 text-3xl font-black">{z.toFixed(2)}</p>
        </div>

        <div className="rounded-2xl bg-slate-100 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-700">
            p-value
          </p>
          <p className="mt-2 text-3xl font-black">{p.toFixed(4)}</p>
        </div>

        <div className="rounded-2xl bg-amber-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">
            α
          </p>
          <p className="mt-2 text-3xl font-black">{alpha.toFixed(2)}</p>
        </div>

        <div
          className={`rounded-2xl p-4 text-center ${
            reject ? "bg-red-50" : "bg-emerald-50"
          }`}
        >
          <p className="text-xs font-black uppercase tracking-[0.14em]">
            decision
          </p>
          <p className="mt-2 text-xl font-black">
            {reject ? "Reject H₀" : "Do not reject H₀"}
          </p>
        </div>
      </div>

      <svg viewBox="0 0 420 250" className="mt-8 w-full rounded-2xl bg-slate-50">
        <line x1="35" y1="220" x2="390" y2="220" stroke="#94a3b8" />
        <line x1="35" y1="40" x2="35" y2="220" stroke="#94a3b8" />
        <path d={path} fill="none" stroke="#2563eb" strokeWidth="4" />
        <line
          x1={zPosition}
          y1="45"
          x2={zPosition}
          y2="220"
          stroke="#ef4444"
          strokeWidth="3"
        />
        <text x={zPosition + 6} y="60" fontSize="12" fill="#ef4444">
          observed z
        </text>
        <text x="42" y="238" fontSize="12" fill="#64748b">
          standard normal null distribution
        </text>
      </svg>
    </div>
  );
}

function AlphaBetaPowerLab() {
  const [alpha, setAlpha] = useState(0.05);
  const [effect, setEffect] = useState(0.6);
  const [se, setSe] = useState(0.25);

  const critical = zCritical(alpha, "two-sided");
  const nonCentral = effect / se;

  const beta =
    normalCdf(critical - nonCentral) - normalCdf(-critical - nonCentral);
  const power = 1 - beta;

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        α, β and power trade-off lab
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        This lab shows how the significance level, effect size and standard
        error influence power. The calculation uses a two-sided normal
        approximation.
      </p>

      <MathBox>
        Power = 1 − β
        <br />
        signal-to-noise = effect / SE
      </MathBox>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
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
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>True effect</span>
            <span>{effect.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="2"
            step="0.05"
            value={effect}
            onChange={(e) => setEffect(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Standard error</span>
            <span>{se.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.05"
            max="1"
            step="0.01"
            value={se}
            onChange={(e) => setSe(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-slate-100 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-700">
            critical z
          </p>
          <p className="mt-2 text-3xl font-black">{critical.toFixed(3)}</p>
        </div>

        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            effect / SE
          </p>
          <p className="mt-2 text-3xl font-black">{nonCentral.toFixed(2)}</p>
        </div>

        <div className="rounded-2xl bg-amber-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">
            β
          </p>
          <p className="mt-2 text-3xl font-black">{beta.toFixed(3)}</p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">
            power
          </p>
          <p className="mt-2 text-3xl font-black">
            {(power * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-amber-50 p-5">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-800">
          Interpretation
        </p>
        <p className="mt-2 text-sm leading-7 text-amber-950">
          Lowering α makes false positives less likely, but it can also reduce
          power. Increasing sample size usually reduces SE and increases power.
        </p>
      </div>
    </div>
  );
}

function SampleSizePowerLab() {
  const [effect, setEffect] = useState(5);
  const [sigma, setSigma] = useState(15);
  const [n, setN] = useState(64);
  const [alpha, setAlpha] = useState(0.05);

  const se = sigma / Math.sqrt(n);
  const critical = zCritical(alpha, "two-sided");
  const nonCentral = effect / se;
  const beta =
    normalCdf(critical - nonCentral) - normalCdf(-critical - nonCentral);
  const power = 1 - beta;

  const values = [20, 40, 60, 80, 120, 160, 240, 320].map((sampleSize) => {
    const localSe = sigma / Math.sqrt(sampleSize);
    const localNonCentral = effect / localSe;
    const localBeta =
      normalCdf(critical - localNonCentral) -
      normalCdf(-critical - localNonCentral);

    return {
      n: sampleSize,
      power: Math.max(0, Math.min(1, 1 - localBeta)),
    };
  });

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Sample size and power lab
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        This lab connects power to study design. Increase sample size and watch
        the standard error fall and power rise.
      </p>

      <MathBox>
        SE = <Fraction numerator="σ" denominator="√n" />
        <br />
        Larger n ⇒ smaller SE ⇒ higher power
      </MathBox>

      <div className="mt-6 grid gap-5 md:grid-cols-4">
        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Effect</span>
            <span>{effect.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="1"
            max="20"
            step="0.5"
            value={effect}
            onChange={(e) => setEffect(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>σ</span>
            <span>{sigma.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="3"
            max="40"
            step="0.5"
            value={sigma}
            onChange={(e) => setSigma(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>n</span>
            <span>{n}</span>
          </div>
          <input
            type="range"
            min="10"
            max="500"
            step="1"
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 text-sm font-bold">α</div>
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
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            SE
          </p>
          <p className="mt-2 text-3xl font-black">{se.toFixed(3)}</p>
        </div>

        <div className="rounded-2xl bg-slate-100 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-700">
            effect / SE
          </p>
          <p className="mt-2 text-3xl font-black">{nonCentral.toFixed(2)}</p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">
            power
          </p>
          <p className="mt-2 text-3xl font-black">
            {(power * 100).toFixed(1)}%
          </p>
        </div>

        <div className="rounded-2xl bg-amber-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">
            β
          </p>
          <p className="mt-2 text-3xl font-black">{beta.toFixed(3)}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {values.map((item) => (
          <div key={item.n}>
            <div className="mb-1 flex justify-between text-xs font-bold text-slate-700">
              <span>n = {item.n}</span>
              <span>power = {(item.power * 100).toFixed(1)}%</span>
            </div>

            <div className="h-8 overflow-hidden rounded-full bg-slate-100">
              <div
                className="flex h-full items-center justify-end rounded-full bg-blue-600 pr-3 text-xs font-black text-white"
                style={{ width: `${item.power * 100}%` }}
              >
                {(item.power * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PValueMisinterpretationLab() {
  const [p, setP] = useState(0.04);
  const [effect, setEffect] = useState(0.3);
  const [threshold, setThreshold] = useState(0.5);

  const statisticallySignificant = p <= 0.05;
  const practicallyImportant = Math.abs(effect) >= threshold;

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        P-value interpretation and effect-size lab
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        A p-value does not tell you whether an effect is large, important or
        unbiased. Compare statistical significance with practical importance.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
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

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Estimated effect</span>
            <span>{effect.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.05"
            value={effect}
            onChange={(e) => setEffect(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Practical threshold</span>
            <span>{threshold.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.05"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div
          className={`rounded-2xl p-5 ${
            statisticallySignificant ? "bg-emerald-50" : "bg-red-50"
          }`}
        >
          <p className="text-sm font-black uppercase tracking-[0.16em]">
            Statistical conclusion
          </p>
          <p className="mt-2 text-2xl font-black">
            {statisticallySignificant
              ? "Statistically significant"
              : "Not statistically significant"}
          </p>
          <p className="mt-3 text-sm leading-7">
            This conclusion is based only on p ≤ 0.05.
          </p>
        </div>

        <div
          className={`rounded-2xl p-5 ${
            practicallyImportant ? "bg-emerald-50" : "bg-amber-50"
          }`}
        >
          <p className="text-sm font-black uppercase tracking-[0.16em]">
            Practical conclusion
          </p>
          <p className="mt-2 text-2xl font-black">
            {practicallyImportant
              ? "Practically important"
              : "Practically small"}
          </p>
          <p className="mt-3 text-sm leading-7">
            This conclusion depends on the effect size and subject-matter
            threshold.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PValuesErrorsPowerLessonPage() {
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
              Module 4 · Lesson 4.4
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:text-6xl">
              P-values, Errors and Power
            </h1>

            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600">
              Go beyond “significant or not significant”. This lesson explains
              p-value interpretation, α, β, Type I error, Type II error, power,
              effect size, sample size, study design and why statistical
              significance is not the same as practical importance.
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
                  Last lesson gave us the hypothesis testing framework. But I
                  still feel students often reduce everything to whether p is
                  below 0.05.
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  That is one of the biggest problems in statistics. A p-value
                  is useful, but it is only one part of statistical evidence. We
                  must also think about errors, power, effect size and study
                  design.
                </DialogueLine>

                <DialogueLine speaker="OL" name="Oliver">
                  So this lesson is about interpreting tests responsibly?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Exactly. We are moving from mechanical testing to statistical
                  judgement.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="What a p-value actually says">
              <p className="text-base leading-8 text-slate-700">
                A p-value is calculated under the assumption that the null
                hypothesis is true. It asks how unusual the observed data would
                be under the null model.
              </p>

              <MathBox>
                p-value = P(data as or more extreme | H<sub>0</sub> true)
              </MathBox>

              <p className="text-base leading-8 text-slate-700">
                This is not the same as the probability that the null hypothesis
                is true. The p-value conditions on H₀; it does not assign a
                probability to H₀.
              </p>

              <div className="space-y-4">
                <DialogueLine speaker="JA" name="James">
                  So p = 0.02 does not mean there is a 2% chance that H₀ is
                  true?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Correct. It means that, if H₀ were true, a result as extreme
                  as the observed one would be relatively unusual under the null
                  model.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="Small p-values and large p-values">
              <p className="text-base leading-8 text-slate-700">
                A small p-value indicates that the observed result is unusual
                under the null model. This can provide evidence against H₀. A
                large p-value means the observed result is not unusual under H₀,
                but it does not prove H₀ is true.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-emerald-50 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-800">
                    Small p-value
                  </p>
                  <p className="mt-2 text-sm leading-7 text-emerald-950">
                    Data are relatively incompatible with the null model.
                  </p>
                </div>

                <div className="rounded-2xl bg-amber-50 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-800">
                    Large p-value
                  </p>
                  <p className="mt-2 text-sm leading-7 text-amber-950">
                    Data are not surprising under the null model, but H₀ is not
                    proven.
                  </p>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="The error framework">
              <p className="text-base leading-8 text-slate-700">
                Every hypothesis test can make mistakes. A Type I error is a
                false positive. A Type II error is a false negative.
              </p>

              <MathBox>
                α = P(reject H<sub>0</sub> | H<sub>0</sub> true)
                <br />
                β = P(do not reject H<sub>0</sub> | H<sub>0</sub> false)
              </MathBox>

              <p className="text-base leading-8 text-slate-700">
                Choosing a smaller α reduces the probability of Type I error,
                but often makes it harder to reject H₀, which can reduce power.
              </p>
            </SectionCard>

            <SectionCard title="Power">
              <p className="text-base leading-8 text-slate-700">
                Power is the probability that a test detects a specified effect
                when that effect truly exists.
              </p>

              <MathBox>Power = 1 − β</MathBox>

              <p className="text-base leading-8 text-slate-700">
                Power depends on the true effect size, sample size, variability,
                significance level and the appropriateness of the design and
                test.
              </p>

              <div className="space-y-4">
                <DialogueLine speaker="SO" name="Sophia">
                  So a non-significant result could happen because there is no
                  effect, or because the study had low power?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Exactly. “Not significant” does not automatically mean “no
                  effect”. It may mean the study was not capable of detecting the
                  effect.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="Effect size and practical importance">
              <p className="text-base leading-8 text-slate-700">
                Statistical significance is influenced by sample size. With very
                large samples, tiny effects can become statistically significant.
                With small samples, important effects can fail to reach
                significance.
              </p>

              <div className="space-y-4">
                <DialogueLine speaker="EM" name="Emma">
                  So we should not report only p-values?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Correct. Good reporting includes the estimate, confidence
                  interval, p-value, design, assumptions and practical context.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="What responsible interpretation looks like">
              <p className="text-base leading-8 text-slate-700">
                A responsible interpretation does not stop at “p &lt; 0.05”.
                It asks: How large is the effect? How precise is the estimate?
                Was the study well designed? Was the analysis planned? Was the
                sample large enough? Are the assumptions plausible?
              </p>

              <div className="mt-5 rounded-2xl bg-blue-50 p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-800">
                  Better reporting sentence
                </p>
                <p className="mt-2 text-sm leading-7 text-blue-950">
                  “The estimated mean difference was 4.2 units, with a 95%
                  confidence interval from 1.1 to 7.3 and p = 0.008. This
                  suggests evidence of a positive difference, although practical
                  importance depends on the study context.”
                </p>
              </div>
            </SectionCard>
          </>
        )}

        {activeTab === "notes" && (
          <>
            <SectionCard title="1. P-value as a conditional probability">
              <p className="text-base leading-8">
                The p-value is a conditional probability calculated under the
                null hypothesis. It is not the probability of the null
                hypothesis itself.
              </p>

              <MathBox>
                p-value = P(T at least as extreme as T<sub>obs</sub> | H
                <sub>0</sub>)
              </MathBox>

              <p className="text-base leading-8">
                The phrase “as extreme or more extreme” depends on the
                alternative hypothesis. A two-sided alternative uses both tails;
                a one-sided alternative uses one tail.
              </p>
            </SectionCard>

            <SectionCard title="2. Two-sided and one-sided p-values">
              <p className="text-base leading-8">
                For a standard normal test statistic z:
              </p>

              <MathBox>
                Two-sided: p = 2P(Z ≥ |z<sub>obs</sub>|)
                <br />
                Right-tailed: p = P(Z ≥ z<sub>obs</sub>)
                <br />
                Left-tailed: p = P(Z ≤ z<sub>obs</sub>)
              </MathBox>

              <p className="text-base leading-8">
                The tail direction must be chosen from the research question
                before looking at the data.
              </p>
            </SectionCard>

            <SectionCard title="3. Significance level α">
              <p className="text-base leading-8">
                The significance level α is the threshold for rejecting H₀. It
                is also the probability of a Type I error when H₀ is true.
              </p>

              <MathBox>
                α = P(reject H<sub>0</sub> | H<sub>0</sub> true)
              </MathBox>

              <p className="text-base leading-8">
                Smaller α values make false positives less likely but make the
                evidence threshold stricter.
              </p>
            </SectionCard>

            <SectionCard title="4. Type I error and Type II error">
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="p-4"></th>
                      <th className="p-4">H₀ true</th>
                      <th className="p-4">H₀ false</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-4 font-bold">Reject H₀</td>
                      <td className="p-4">Type I error</td>
                      <td className="p-4">Correct rejection</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold">Do not reject H₀</td>
                      <td className="p-4">Correct non-rejection</td>
                      <td className="p-4">Type II error</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <MathBox>
                β = P(do not reject H<sub>0</sub> | H<sub>0</sub> false)
              </MathBox>
            </SectionCard>

            <SectionCard title="5. Power">
              <p className="text-base leading-8">
                Power is the probability of rejecting H₀ when a specified
                alternative is true.
              </p>

              <MathBox>Power = 1 − β</MathBox>

              <p className="text-base leading-8">
                Power is always tied to a particular effect size or alternative.
                There is no single power value without specifying what effect the
                study is trying to detect.
              </p>
            </SectionCard>

            <SectionCard title="6. Factors that affect power">
              <ul className="list-disc space-y-2 pl-6 text-base leading-8">
                <li>
                  <strong>Effect size:</strong> larger true effects are easier
                  to detect.
                </li>
                <li>
                  <strong>Sample size:</strong> larger samples reduce standard
                  error.
                </li>
                <li>
                  <strong>Variability:</strong> less noise improves detection.
                </li>
                <li>
                  <strong>α level:</strong> larger α usually increases power but
                  also increases Type I error risk.
                </li>
                <li>
                  <strong>Design quality:</strong> good measurement and
                  appropriate design reduce unnecessary variability.
                </li>
              </ul>
            </SectionCard>

            <SectionCard title="7. Link between sample size and power">
              <p className="text-base leading-8">
                For many mean-based tests, the standard error has the structure:
              </p>

              <MathBox>
                SE = <Fraction numerator="σ" denominator="√n" />
              </MathBox>

              <p className="text-base leading-8">
                Increasing n decreases SE. A smaller SE makes the same effect
                easier to detect because the signal-to-noise ratio becomes
                larger.
              </p>

              <MathBox>
                signal-to-noise ={" "}
                <Fraction numerator={<span>effect size</span>} denominator="SE" />
              </MathBox>
            </SectionCard>

            <SectionCard title="8. Why p-values are not effect sizes">
              <p className="text-base leading-8">
                A p-value combines information about effect size, sample size and
                variability. Therefore, it does not directly tell us whether the
                effect is large.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-emerald-50 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-800">
                    Large sample
                  </p>
                  <p className="mt-2 text-sm leading-7 text-emerald-950">
                    Tiny effects can produce very small p-values.
                  </p>
                </div>

                <div className="rounded-2xl bg-amber-50 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-800">
                    Small sample
                  </p>
                  <p className="mt-2 text-sm leading-7 text-amber-950">
                    Meaningful effects may fail to reach statistical
                    significance.
                  </p>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="9. Common p-value mistakes">
              <ul className="list-disc space-y-2 pl-6 text-base leading-8">
                <li>
                  Wrong: “p = 0.03 means there is a 3% probability H₀ is true.”
                </li>
                <li>
                  Correct: “If H₀ were true, data this extreme would have
                  probability about 0.03.”
                </li>
                <li>
                  Wrong: “p &gt; 0.05 means no effect.”
                </li>
                <li>
                  Correct: “p &gt; 0.05 means insufficient evidence against H₀
                  using this test.”
                </li>
                <li>
                  Wrong: “p &lt; 0.05 means the effect is important.”
                </li>
                <li>
                  Correct: “Importance depends on effect size, uncertainty and
                  context.”
                </li>
              </ul>
            </SectionCard>

            <SectionCard title="10. Better reporting principles">
              <p className="text-base leading-8">
                Good reporting includes:
              </p>

              <ul className="list-disc space-y-2 pl-6 text-base leading-8">
                <li>the research question and hypotheses,</li>
                <li>the estimated effect size,</li>
                <li>the confidence interval,</li>
                <li>the p-value,</li>
                <li>the sample size and design,</li>
                <li>assumptions and limitations,</li>
                <li>practical or clinical interpretation.</li>
              </ul>
            </SectionCard>
          </>
        )}

        {activeTab === "interactive" && (
          <>
            <PValueExplorer />
            <AlphaBetaPowerLab />
            <SampleSizePowerLab />
            <PValueMisinterpretationLab />
          </>
        )}

        {activeTab === "examples" && (
          <>
            <SectionCard title="Worked example 1: interpreting p = 0.03">
              <p className="text-base leading-8">
                A study reports p = 0.03 for a two-sided test at α = 0.05.
              </p>

              <MathBox>p = 0.03 ≤ 0.05</MathBox>

              <p className="text-base leading-8">
                The result is statistically significant at the 5% level. A
                correct interpretation is: if the null hypothesis were true, a
                result this extreme or more extreme would occur with probability
                about 0.03 under the null model.
              </p>

              <div className="mt-5 rounded-2xl bg-red-50 p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-red-800">
                  Do not say
                </p>
                <p className="mt-2 text-sm leading-7 text-red-950">
                  “There is a 3% probability that the null hypothesis is true.”
                </p>
              </div>
            </SectionCard>

            <SectionCard title="Worked example 2: Type I error">
              <p className="text-base leading-8">
                In a trial, H₀ says a treatment has no effect. A Type I error
                occurs if we reject H₀ when it is actually true.
              </p>

              <div className="rounded-2xl bg-red-50 p-5">
                <p className="text-sm leading-7 text-red-950">
                  In context: we conclude the treatment works when it actually
                  has no true effect. This is a false positive.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="Worked example 3: Type II error">
              <p className="text-base leading-8">
                In the same trial, a Type II error occurs if the treatment truly
                works but the test does not reject H₀.
              </p>

              <div className="rounded-2xl bg-amber-50 p-5">
                <p className="text-sm leading-7 text-amber-950">
                  In context: we miss a real treatment effect. This is a false
                  negative.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="Worked example 4: calculating power from β">
              <p className="text-base leading-8">
                Suppose a study has β = 0.20 for detecting a clinically relevant
                effect.
              </p>

              <MathBox>
                Power = 1 − β
                <br />
                Power = 1 − 0.20 = 0.80
              </MathBox>

              <p className="text-base leading-8">
                The study has 80% power to detect that specified effect.
              </p>
            </SectionCard>

            <SectionCard title="Worked example 5: sample size and standard error">
              <p className="text-base leading-8">
                Suppose σ = 20. Compare the standard error when n = 25 and n =
                100.
              </p>

              <MathBox>
                For n = 25: SE = 20 / √25 = 4
                <br />
                For n = 100: SE = 20 / √100 = 2
              </MathBox>

              <p className="text-base leading-8">
                Quadrupling the sample size halves the standard error, making it
                easier to detect a real effect.
              </p>
            </SectionCard>

            <SectionCard title="Worked example 6: significant but not important">
              <p className="text-base leading-8">
                A very large study finds that a new learning app increases study
                time by 0.4 minutes per day, with p &lt; 0.001.
              </p>

              <div className="rounded-2xl bg-amber-50 p-5">
                <p className="text-sm leading-7 text-amber-950">
                  The result may be statistically significant, but the effect is
                  probably too small to matter practically. Statistical
                  significance is not the same as practical importance.
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
                  q: "A study reports p = 0.018. Explain what this means without saying that the null has probability 0.018.",
                  a: "Assuming the null hypothesis is true, a result as extreme as the observed result would occur with probability about 0.018 under the null model.",
                },
                {
                  title: "Exercise 2",
                  q: "At α = 0.05, what decision is made when p = 0.071?",
                  a: "Since p > 0.05, do not reject H₀. This does not prove H₀ is true.",
                },
                {
                  title: "Exercise 3",
                  q: "Define Type I error in the context of a test for whether a drug works.",
                  a: "A Type I error means concluding that the drug works when it actually has no true effect.",
                },
                {
                  title: "Exercise 4",
                  q: "Define Type II error in the same drug study.",
                  a: "A Type II error means failing to detect a real drug effect when the drug truly works.",
                },
                {
                  title: "Exercise 5",
                  q: "If β = 0.35, what is power?",
                  a: "Power = 1 − β = 1 − 0.35 = 0.65. The study has 65% power for the specified effect.",
                },
                {
                  title: "Exercise 6",
                  q: "List three ways to increase power.",
                  a: "Increase sample size, target a larger effect size, reduce variability through better measurement/design, or use an appropriate statistical test.",
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
                  You have completed Lesson 4.4. Next comes sample size and
                  study design, where we connect inference to planning strong
                  studies.
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