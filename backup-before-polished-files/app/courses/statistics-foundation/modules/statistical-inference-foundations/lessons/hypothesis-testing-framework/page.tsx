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

type TestTail = "two-sided" | "right" | "left";

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
    question: "What is the null hypothesis usually used for?",
    options: [
      "It is the hypothesis we prove true",
      "It is a reference claim used to calculate how surprising the data are",
      "It is always the researcher's preferred claim",
      "It is the observed sample statistic",
    ],
    answer: 1,
    explanation:
      "The null hypothesis is treated as a reference model. We ask how unusual the observed statistic would be if the null were true.",
  },
  {
    question: "What is the general structure of many test statistics?",
    options: [
      "estimate plus sample size",
      "estimate minus null value divided by standard error",
      "standard error divided by p-value",
      "variance minus mean",
    ],
    answer: 1,
    explanation:
      "Many test statistics take the form: (estimate − null value) / standard error.",
  },
  {
    question: "What does a p-value measure?",
    options: [
      "The probability that the null hypothesis is true",
      "The probability that the alternative hypothesis is true",
      "How extreme the observed result is under the null model",
      "The size of the treatment effect",
    ],
    answer: 2,
    explanation:
      "A p-value is calculated assuming the null hypothesis is true. It measures how surprising the observed result is under that assumption.",
  },
  {
    question: "What is a Type I error?",
    options: [
      "Rejecting a true null hypothesis",
      "Failing to reject a false null hypothesis",
      "Using a large sample size",
      "Reporting a confidence interval",
    ],
    answer: 0,
    explanation:
      "A Type I error occurs when we reject H0 even though H0 is true.",
  },
  {
    question: "What is statistical power?",
    options: [
      "The probability of accepting the null hypothesis",
      "The probability of rejecting H0 when a specified alternative is true",
      "The probability that the p-value equals 0.05",
      "The sample variance",
    ],
    answer: 1,
    explanation:
      "Power is 1 − β. It is the probability of detecting an effect when the specified effect genuinely exists.",
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

function pValueFromZ(z: number, tail: TestTail) {
  if (tail === "right") return 1 - normalCdf(z);
  if (tail === "left") return normalCdf(z);
  return 2 * (1 - normalCdf(Math.abs(z)));
}

function zCritical(alpha: number, tail: TestTail) {
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

function TestStatisticLab() {
  const [estimate, setEstimate] = useState(108);
  const [nullValue, setNullValue] = useState(100);
  const [se, setSe] = useState(4);
  const [tail, setTail] = useState<TestTail>("two-sided");
  const [alpha, setAlpha] = useState(0.05);

  const z = (estimate - nullValue) / se;
  const p = pValueFromZ(z, tail);
  const reject = p <= alpha;

  const points = useMemo(() => {
    return Array.from({ length: 141 }, (_, i) => {
      const x = -4 + (8 * i) / 140;
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
        Test statistic and p-value lab
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        Change the estimate, null value and standard error. The test statistic
        measures distance from the null value in standard-error units.
      </p>

      <MathBox>
        z ={" "}
        <Fraction
          numerator={<span>estimate − null value</span>}
          denominator={<span>standard error</span>}
        />
      </MathBox>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Estimate</span>
            <span>{estimate.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="80"
            max="120"
            step="0.5"
            value={estimate}
            onChange={(e) => setEstimate(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Null value</span>
            <span>{nullValue.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="80"
            max="120"
            step="0.5"
            value={nullValue}
            onChange={(e) => setNullValue(Number(e.target.value))}
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
          <div className="mb-2 text-sm font-bold">Alternative</div>
          <select
            value={tail}
            onChange={(e) => setTail(e.target.value as TestTail)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold"
          >
            <option value="two-sided">two-sided: different</option>
            <option value="right">right-tailed: greater</option>
            <option value="left">left-tailed: smaller</option>
          </select>
        </label>

        <label>
          <div className="mb-2 text-sm font-bold">Significance level α</div>
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
            z statistic
          </p>
          <p className="mt-2 text-3xl font-black">{z.toFixed(3)}</p>
        </div>

        <div className="rounded-2xl bg-slate-100 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
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
          <p
            className={`text-xs font-black uppercase tracking-[0.14em] ${
              reject ? "text-[#6f0d12]" : "text-emerald-700"
            }`}
          >
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
        <line x1={zPosition} y1="45" x2={zPosition} y2="220" stroke="#ef4444" strokeWidth="3" />
        <text x={zPosition + 6} y="60" fontSize="12" fill="#ef4444">
          observed z
        </text>
        <text x="42" y="238" fontSize="12" fill="#64748b">
          null distribution
        </text>
      </svg>
    </div>
  );
}

function ErrorDecisionLab() {
  const [truth, setTruth] = useState<"true-null" | "false-null">("true-null");
  const [decision, setDecision] = useState<"reject" | "not-reject">("reject");

  let result = "";
  let explanation = "";
  let style = "bg-slate-100 text-slate-900";

  if (truth === "true-null" && decision === "reject") {
    result = "Type I error";
    explanation =
      "The null hypothesis is true, but the test rejects it. This is a false positive.";
    style = "bg-red-50 text-red-950";
  }

  if (truth === "true-null" && decision === "not-reject") {
    result = "Correct non-rejection";
    explanation =
      "The null hypothesis is true, and the test does not reject it.";
    style = "bg-emerald-50 text-emerald-950";
  }

  if (truth === "false-null" && decision === "reject") {
    result = "Correct rejection";
    explanation =
      "The null hypothesis is false, and the test detects evidence against it.";
    style = "bg-emerald-50 text-emerald-950";
  }

  if (truth === "false-null" && decision === "not-reject") {
    result = "Type II error";
    explanation =
      "The null hypothesis is false, but the test does not reject it. This is a false negative.";
    style = "bg-amber-50 text-amber-950";
  }

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Type I and Type II error lab
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        Select the true state of the world and the statistical decision. The
        result shows whether the decision is correct or an error.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label>
          <div className="mb-2 text-sm font-bold">Reality</div>
          <select
            value={truth}
            onChange={(e) =>
              setTruth(e.target.value as "true-null" | "false-null")
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold"
          >
            <option value="true-null">H₀ is true</option>
            <option value="false-null">H₀ is false</option>
          </select>
        </label>

        <label>
          <div className="mb-2 text-sm font-bold">Decision</div>
          <select
            value={decision}
            onChange={(e) =>
              setDecision(e.target.value as "reject" | "not-reject")
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold"
          >
            <option value="reject">Reject H₀</option>
            <option value="not-reject">Do not reject H₀</option>
          </select>
        </label>
      </div>

      <div className={`mt-6 rounded-2xl p-6 ${style}`}>
        <p className="text-sm font-black uppercase tracking-[0.16em]">
          Result
        </p>
        <p className="mt-2 text-3xl font-black">{result}</p>
        <p className="mt-3 text-sm leading-7">{explanation}</p>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="p-4">Reality</th>
              <th className="p-4">Reject H₀</th>
              <th className="p-4">Do not reject H₀</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="p-4 font-bold">H₀ true</td>
              <td className="p-4">Type I error</td>
              <td className="p-4">Correct decision</td>
            </tr>
            <tr>
              <td className="p-4 font-bold">H₀ false</td>
              <td className="p-4">Correct decision</td>
              <td className="p-4">Type II error</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PowerLab() {
  const [effect, setEffect] = useState(0.5);
  const [se, setSe] = useState(0.25);
  const [alpha, setAlpha] = useState(0.05);

  const critical = zCritical(alpha, "two-sided");
  const nonCentral = effect / se;
  const upperReject = critical;
  const lowerReject = -critical;

  const power =
    normalCdf(lowerReject - nonCentral) +
    (1 - normalCdf(upperReject - nonCentral));

  const beta = 1 - power;

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Power and Type II error lab
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        Power is the probability of rejecting the null hypothesis when a
        specified alternative is true. Larger effects and smaller standard errors
        usually increase power.
      </p>

      <MathBox>
        Power = 1 − β
        <br />
        signal-to-noise = effect / SE
      </MathBox>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>True effect size</span>
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

        <div className="rounded-2xl bg-slate-100 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
            critical z
          </p>
          <p className="mt-2 text-3xl font-black">{critical.toFixed(3)}</p>
        </div>
      </div>
    </div>
  );
}

function SignificancePracticalLab() {
  const [effect, setEffect] = useState(2);
  const [se, setSe] = useState(0.5);
  const [threshold, setThreshold] = useState(5);

  const z = effect / se;
  const p = 2 * (1 - normalCdf(Math.abs(z)));
  const significant = p <= 0.05;
  const practicallyImportant = Math.abs(effect) >= threshold;

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Statistical significance versus practical importance lab
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        A result can be statistically significant but too small to matter
        practically. A meaningful effect can also fail to reach significance if
        uncertainty is large.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Estimated effect</span>
            <span>{effect.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="-12"
            max="12"
            step="0.5"
            value={effect}
            onChange={(e) => setEffect(Number(e.target.value))}
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
            min="0.2"
            max="6"
            step="0.1"
            value={se}
            onChange={(e) => setSe(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Practical threshold</span>
            <span>{threshold.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            z
          </p>
          <p className="mt-2 text-3xl font-black">{z.toFixed(2)}</p>
        </div>

        <div className="rounded-2xl bg-slate-100 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
            p-value
          </p>
          <p className="mt-2 text-3xl font-black">{p.toFixed(4)}</p>
        </div>

        <div
          className={`rounded-2xl p-4 text-center ${
            significant ? "bg-emerald-50" : "bg-red-50"
          }`}
        >
          <p className="text-xs font-black uppercase tracking-[0.14em]">
            statistical
          </p>
          <p className="mt-2 text-xl font-black">
            {significant ? "significant" : "not significant"}
          </p>
        </div>

        <div
          className={`rounded-2xl p-4 text-center ${
            practicallyImportant ? "bg-emerald-50" : "bg-amber-50"
          }`}
        >
          <p className="text-xs font-black uppercase tracking-[0.14em]">
            practical
          </p>
          <p className="mt-2 text-xl font-black">
            {practicallyImportant ? "important" : "small"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HypothesisTestingFrameworkLessonPage() {
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
              Module 4 · Lesson 4.3
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:text-6xl">
              Hypothesis Testing Framework
            </h1>

            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600">
              Learn how hypothesis testing formalises statistical evidence:
              null and alternative hypotheses, test statistics, null
              distributions, p-values, significance levels, Type I and Type II
              errors, power and practical importance.
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
                  Confidence intervals gave us a range of plausible values. But
                  research papers often say a result is statistically
                  significant. Is that the same thing?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Related, but not identical. Confidence intervals estimate a
                  parameter with uncertainty. Hypothesis tests assess how
                  compatible the observed data are with a specific null
                  hypothesis.
                </DialogueLine>

                <DialogueLine speaker="OL" name="Oliver">
                  So a hypothesis test starts by temporarily assuming something?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Exactly. We assume the null hypothesis is true, calculate what
                  the data would look like under that assumption, and ask
                  whether our observed result is unusually extreme.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="The two hypotheses">
              <p className="text-base leading-8 text-slate-700">
                A hypothesis test begins with two competing statements. The null
                hypothesis, written H₀, usually represents no effect, no
                difference, or equality to a benchmark value. The alternative
                hypothesis, written H₁ or Hₐ, represents the type of departure
                from the null.
              </p>

              <MathBox>
                H<sub>0</sub>: θ = θ<sub>0</sub>
                <br />
                H<sub>1</sub>: θ ≠ θ<sub>0</sub>
              </MathBox>

              <p className="text-base leading-8 text-slate-700">
                A two-sided alternative asks whether the parameter is different.
                A one-sided alternative asks whether the parameter is larger or
                smaller than the null value.
              </p>

              <div className="space-y-4">
                <DialogueLine speaker="JA" name="James">
                  If a new teaching method is being tested, H₀ might say there
                  is no improvement?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Yes. The alternative might say the mean score is higher,
                  lower, or simply different, depending on the research
                  question.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="The test statistic">
              <p className="text-base leading-8 text-slate-700">
                A test statistic measures how far the sample result is from the
                null value, relative to its standard error. For many tests:
              </p>

              <MathBox>
                test statistic ={" "}
                <Fraction
                  numerator={<span>estimate − null value</span>}
                  denominator={<span>standard error</span>}
                />
              </MathBox>

              <p className="text-base leading-8 text-slate-700">
                For a simple z-test for a mean with known σ:
              </p>

              <MathBox>
                z ={" "}
                <Fraction
                  numerator={<span>x̄ − μ<sub>0</sub></span>}
                  denominator={<span>σ / √n</span>}
                />
              </MathBox>

              <div className="space-y-4">
                <DialogueLine speaker="SO" name="Sophia">
                  So a difference of 5 units could be large or small depending
                  on the standard error?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Exactly. Evidence depends on the estimate, the null value and
                  the uncertainty around the estimate.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="The null distribution">
              <p className="text-base leading-8 text-slate-700">
                The null distribution is the probability distribution of the
                test statistic assuming H₀ is true. It tells us which test
                statistic values are ordinary under the null and which are
                unusual.
              </p>

              <div className="mt-5 rounded-2xl bg-blue-50 p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-800">
                  Core idea
                </p>
                <p className="mt-2 text-sm leading-7 text-blue-950">
                  The p-value is calculated from the null distribution. Without
                  a null distribution, there is no formal p-value.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="The p-value">
              <p className="text-base leading-8 text-slate-700">
                The p-value is the probability, assuming H₀ is true, of
                observing a test statistic at least as extreme as the one
                obtained.
              </p>

              <MathBox>
                p-value = P(data as or more extreme | H<sub>0</sub> true)
              </MathBox>

              <p className="text-base leading-8 text-slate-700">
                The p-value is not the probability that H₀ is true. It is also
                not the probability that the result happened by chance in a
                casual sense. It is a tail probability under the null model.
              </p>

              <div className="space-y-4">
                <DialogueLine speaker="EM" name="Emma">
                  If p = 0.03, does that mean there is a 3% probability that H₀
                  is true?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  No. That reverses the conditioning. The p-value assumes H₀ is
                  true and asks how surprising the data are under that
                  assumption.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="Significance level and decision rule">
              <p className="text-base leading-8 text-slate-700">
                The significance level α is chosen before the test. It is the
                threshold for deciding whether the evidence is strong enough to
                reject H₀.
              </p>

              <MathBox>
                Reject H<sub>0</sub> if p ≤ α
                <br />
                Do not reject H<sub>0</sub> if p &gt; α
              </MathBox>

              <p className="text-base leading-8 text-slate-700">
                If p &gt; α, we say “do not reject H₀”. We do not say “accept
                H₀” or “prove H₀ true”.
              </p>

              <div className="space-y-4">
                <DialogueLine speaker="OL" name="Oliver">
                  Why not say accept the null?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Because lack of strong evidence against H₀ is not proof that
                  H₀ is true. The study may be too small, too noisy or poorly
                  designed.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="Errors and power">
              <p className="text-base leading-8 text-slate-700">
                Hypothesis testing involves possible mistakes. A Type I error
                occurs when we reject a true null hypothesis. A Type II error
                occurs when we fail to reject a false null hypothesis.
              </p>

              <MathBox>
                Type I error probability = α
                <br />
                Type II error probability = β
                <br />
                Power = 1 − β
              </MathBox>

              <p className="text-base leading-8 text-slate-700">
                Power is the probability of detecting a specified real effect.
                Low power means a real effect may be missed.
              </p>
            </SectionCard>

            <SectionCard title="Statistical significance versus practical importance">
              <p className="text-base leading-8 text-slate-700">
                A small p-value does not automatically mean the effect is large
                or important. With a very large sample, even a tiny effect can be
                statistically significant. Conversely, a meaningful effect may
                fail to reach significance if the study is small or noisy.
              </p>

              <div className="space-y-4">
                <DialogueLine speaker="SO" name="Sophia">
                  So we should report effect sizes and confidence intervals, not
                  just p-values?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Exactly. Good reporting includes the estimate, uncertainty,
                  p-value, assumptions and subject-matter context.
                </DialogueLine>
              </div>
            </SectionCard>
          </>
        )}

        {activeTab === "notes" && (
          <>
            <SectionCard title="1. Purpose of hypothesis testing">
              <p className="text-base leading-8">
                Hypothesis testing provides a structured way to compare observed
                data with what would be expected under a specified null model.
                It does not prove hypotheses in the mathematical sense. It
                quantifies evidence against a reference assumption.
              </p>

              <div className="mt-5 rounded-2xl bg-blue-50 p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-800">
                  Core idea
                </p>
                <p className="mt-2 text-sm leading-7 text-blue-950">
                  Assume the null hypothesis is true, calculate how unusual the
                  observed result is under that assumption, and decide whether
                  the evidence is strong enough to reject the null.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="2. Null and alternative hypotheses">
              <p className="text-base leading-8">
                The null hypothesis usually states no difference, no effect or
                equality to a benchmark value:
              </p>

              <MathBox>
                H<sub>0</sub>: θ = θ<sub>0</sub>
              </MathBox>

              <p className="text-base leading-8">
                The alternative hypothesis states the type of departure:
              </p>

              <MathBox>
                H<sub>1</sub>: θ ≠ θ<sub>0</sub>
                <br />
                H<sub>1</sub>: θ &gt; θ<sub>0</sub>
                <br />
                H<sub>1</sub>: θ &lt; θ<sub>0</sub>
              </MathBox>

              <p className="text-base leading-8">
                The alternative should be chosen based on the scientific
                question before looking at the data.
              </p>
            </SectionCard>

            <SectionCard title="3. One-sided and two-sided tests">
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="p-4">Alternative</th>
                      <th className="p-4">Question</th>
                      <th className="p-4">Tail area</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-4">
                        H<sub>1</sub>: θ ≠ θ<sub>0</sub>
                      </td>
                      <td className="p-4">Is the parameter different?</td>
                      <td className="p-4">Two tails</td>
                    </tr>
                    <tr>
                      <td className="p-4">
                        H<sub>1</sub>: θ &gt; θ<sub>0</sub>
                      </td>
                      <td className="p-4">Is the parameter larger?</td>
                      <td className="p-4">Right tail</td>
                    </tr>
                    <tr>
                      <td className="p-4">
                        H<sub>1</sub>: θ &lt; θ<sub>0</sub>
                      </td>
                      <td className="p-4">Is the parameter smaller?</td>
                      <td className="p-4">Left tail</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SectionCard>

            <SectionCard title="4. Test statistic">
              <p className="text-base leading-8">
                A test statistic converts the difference between the estimate
                and the null value into a standardised quantity.
              </p>

              <MathBox>
                test statistic ={" "}
                <Fraction
                  numerator={<span>estimate − null value</span>}
                  denominator={<span>standard error</span>}
                />
              </MathBox>

              <p className="text-base leading-8">
                For a mean with known population standard deviation:
              </p>

              <MathBox>
                z ={" "}
                <Fraction
                  numerator={<span>x̄ − μ<sub>0</sub></span>}
                  denominator={<span>σ / √n</span>}
                />
              </MathBox>

              <p className="text-base leading-8">
                When σ is unknown and estimated by s, a t-statistic is often
                used:
              </p>

              <MathBox>
                t ={" "}
                <Fraction
                  numerator={<span>x̄ − μ<sub>0</sub></span>}
                  denominator={<span>s / √n</span>}
                />
              </MathBox>
            </SectionCard>

            <SectionCard title="5. Null distribution">
              <p className="text-base leading-8">
                The null distribution is the distribution of the test statistic
                assuming H₀ is true. It describes the results we would expect
                from repeated sampling if there were truly no effect or no
                difference.
              </p>

              <div className="mt-5 rounded-2xl bg-emerald-50 p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-800">
                  Null distribution
                </p>
                <p className="mt-2 text-sm leading-7 text-emerald-950">
                  The null distribution is the reference distribution used to
                  calculate p-values and critical values.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="6. P-values">
              <p className="text-base leading-8">
                The p-value is the probability, under H₀, of observing a result
                at least as extreme as the one observed.
              </p>

              <p className="text-base leading-8">For a two-sided z-test:</p>

              <MathBox>
                p = 2P(Z ≥ |z<sub>obs</sub>|)
              </MathBox>

              <p className="text-base leading-8">For a right-tailed test:</p>

              <MathBox>
                p = P(Z ≥ z<sub>obs</sub>)
              </MathBox>

              <p className="text-base leading-8">For a left-tailed test:</p>

              <MathBox>
                p = P(Z ≤ z<sub>obs</sub>)
              </MathBox>

              <div className="mt-5 rounded-2xl bg-red-50 p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-red-800">
                  Important
                </p>
                <p className="mt-2 text-sm leading-7 text-red-950">
                  The p-value is not P(H₀ | data). It is calculated as P(data as
                  or more extreme | H₀).
                </p>
              </div>
            </SectionCard>

            <SectionCard title="7. Significance level and critical value">
              <p className="text-base leading-8">
                The significance level α is chosen before the test. It controls
                the probability of a Type I error when H₀ is true.
              </p>

              <MathBox>
                α = P(reject H<sub>0</sub> | H<sub>0</sub> true)
              </MathBox>

              <p className="text-base leading-8">The p-value decision rule is:</p>

              <MathBox>
                p ≤ α ⇒ reject H<sub>0</sub>
                <br />
                p &gt; α ⇒ do not reject H<sub>0</sub>
              </MathBox>

              <p className="text-base leading-8">
                Equivalently, a test statistic can be compared with a critical
                value. For a two-sided z-test at α = 0.05:
              </p>

              <MathBox>
                reject H<sub>0</sub> if |z<sub>obs</sub>| &gt; 1.96
              </MathBox>
            </SectionCard>

            <SectionCard title="8. Type I error, Type II error and power">
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
                <br />
                Power = 1 − β
              </MathBox>
            </SectionCard>

            <SectionCard title="9. What increases power?">
              <p className="text-base leading-8">Power generally increases when:</p>

              <ul className="list-disc space-y-2 pl-6 text-base leading-8">
                <li>the true effect size is larger,</li>
                <li>the sample size is larger,</li>
                <li>the variability is smaller,</li>
                <li>the significance level α is larger,</li>
                <li>the statistical test matches the study design well.</li>
              </ul>

              <p className="text-base leading-8">
                Power is not a property of the p-value alone. It depends on the
                assumed alternative, the sample size, the noise level and the
                testing rule.
              </p>
            </SectionCard>

            <SectionCard title="10. Common mistakes">
              <ul className="list-disc space-y-2 pl-6 text-base leading-8">
                <li>
                  Wrong: “The p-value is the probability that the null
                  hypothesis is true.”
                </li>
                <li>
                  Better: “The p-value is calculated assuming the null
                  hypothesis is true.”
                </li>
                <li>
                  Wrong: “Not significant means no effect.”
                </li>
                <li>
                  Better: “Not significant means insufficient evidence to reject
                  the null.”
                </li>
                <li>
                  Wrong: “Statistically significant means practically
                  important.”
                </li>
                <li>
                  Better: “Practical importance depends on effect size and
                  context.”
                </li>
                <li>
                  Wrong: “α = 0.05 is a universal law.”
                </li>
                <li>
                  Better: “α is a convention and should be justified by
                  context.”
                </li>
              </ul>
            </SectionCard>
          </>
        )}

        {activeTab === "interactive" && (
          <>
            <TestStatisticLab />
            <ErrorDecisionLab />
            <PowerLab />
            <SignificancePracticalLab />
          </>
        )}

        {activeTab === "examples" && (
          <>
            <SectionCard title="Worked example 1: forming hypotheses">
              <p className="text-base leading-8">
                A university claims that the average exam score is 70. A
                researcher wants to test whether the average score is different
                from 70.
              </p>

              <MathBox>
                H<sub>0</sub>: μ = 70
                <br />
                H<sub>1</sub>: μ ≠ 70
              </MathBox>

              <p className="text-base leading-8">
                This is a two-sided test because the research question asks
                whether the mean is different, not specifically higher or lower.
              </p>
            </SectionCard>

            <SectionCard title="Worked example 2: calculating a z statistic">
              <p className="text-base leading-8">
                Suppose x̄ = 74, μ₀ = 70, σ = 12 and n = 36. Calculate the z
                statistic.
              </p>

              <MathBox>
                SE = σ / √n = 12 / √36 = 12 / 6 = 2
                <br />
                z = (x̄ − μ<sub>0</sub>) / SE
                <br />
                z = (74 − 70) / 2 = 2
              </MathBox>
            </SectionCard>

            <SectionCard title="Worked example 3: p-value and decision">
              <p className="text-base leading-8">
                For the previous example, suppose the two-sided p-value is
                approximately 0.0455. At α = 0.05, what is the decision?
              </p>

              <MathBox>p = 0.0455 ≤ 0.05</MathBox>

              <p className="text-base leading-8">
                Since p ≤ α, reject H₀. There is evidence that the population
                mean differs from 70.
              </p>
            </SectionCard>

            <SectionCard title="Worked example 4: not rejecting the null">
              <p className="text-base leading-8">
                Suppose a test gives p = 0.18 at α = 0.05.
              </p>

              <MathBox>p = 0.18 &gt; 0.05</MathBox>

              <p className="text-base leading-8">
                We do not reject H₀. This does not prove H₀ is true. It means
                the data do not provide strong enough evidence against H₀ using
                this test and threshold.
              </p>
            </SectionCard>

            <SectionCard title="Worked example 5: Type I and Type II errors">
              <p className="text-base leading-8">
                In a drug trial, H₀ says the drug has no effect. Describe the
                errors.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-red-50 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-red-800">
                    Type I error
                  </p>
                  <p className="mt-2 text-sm leading-7 text-red-950">
                    Concluding that the drug has an effect when in truth it has
                    no effect.
                  </p>
                </div>

                <div className="rounded-2xl bg-amber-50 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-800">
                    Type II error
                  </p>
                  <p className="mt-2 text-sm leading-7 text-amber-950">
                    Failing to detect an effect when the drug truly has an
                    effect.
                  </p>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Worked example 6: significance is not importance">
              <p className="text-base leading-8">
                A very large study finds that a new app increases average study
                time by 0.4 minutes per day, with p &lt; 0.001.
              </p>

              <div className="rounded-2xl bg-amber-50 p-5">
                <p className="text-sm leading-7 text-amber-950">
                  The result may be statistically significant because the sample
                  size is large. However, an increase of 0.4 minutes per day may
                  be too small to matter educationally. Practical importance
                  requires effect-size interpretation.
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
                  q: "State H0 and H1 for testing whether a population mean differs from 50.",
                  a: "H0: μ = 50. H1: μ ≠ 50. This is a two-sided test.",
                },
                {
                  title: "Exercise 2",
                  q: "A sample mean is 106, the null value is 100 and SE = 3. Calculate the z statistic.",
                  a: "z = (106 − 100) / 3 = 6 / 3 = 2.",
                },
                {
                  title: "Exercise 3",
                  q: "If p = 0.032 and α = 0.05, what is the decision?",
                  a: "Since p ≤ α, reject H0.",
                },
                {
                  title: "Exercise 4",
                  q: "If p = 0.21 and α = 0.05, what is the correct wording?",
                  a: "Do not reject H0. Do not say that H0 is proven true.",
                },
                {
                  title: "Exercise 5",
                  q: "Define a Type I error in the context of H0: no treatment effect.",
                  a: "A Type I error would mean concluding that the treatment has an effect when in reality it has no effect.",
                },
                {
                  title: "Exercise 6",
                  q: "Define power in words.",
                  a: "Power is the probability of rejecting H0 when a specified alternative is true. It is the probability of detecting a real effect of a given size.",
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
                  You have completed Lesson 4.3. Next, you can move into
                  p-values, errors and power in even more detail.
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