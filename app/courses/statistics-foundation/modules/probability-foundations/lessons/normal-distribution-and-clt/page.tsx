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

const quizQuestions = [
  {
    question: "What does X ~ N(μ, σ²) mean?",
    options: [
      "X follows a normal distribution with mean μ and variance σ²",
      "X follows a normal distribution with mean σ and variance μ",
      "X must be a discrete random variable",
      "X has probability 1 at μ",
    ],
    answer: 0,
    explanation:
      "The notation X ~ N(μ, σ²) means X is normally distributed with mean μ and variance σ².",
  },
  {
    question: "For a continuous distribution, probability is represented by:",
    options: [
      "The height of the curve at one exact point",
      "The area under the curve over an interval",
      "The largest observed value",
      "The number of categories",
    ],
    answer: 1,
    explanation:
      "For continuous random variables, probabilities are areas under the density curve across intervals.",
  },
  {
    question: "What is the correct z-score formula?",
    options: [
      "Z = X + μ / σ",
      "Z = (X − μ) / σ",
      "Z = σ / (X − μ)",
      "Z = Xσ − μ",
    ],
    answer: 1,
    explanation:
      "The z-score tells how many standard deviations X is from the mean: Z = (X − μ) / σ.",
  },
  {
    question:
      "According to the Central Limit Theorem, what becomes approximately normal as n increases?",
    options: [
      "The original raw data in every case",
      "The sampling distribution of the sample mean",
      "Only binary variables",
      "Only perfectly symmetric populations",
    ],
    answer: 1,
    explanation:
      "The CLT is about the sampling distribution of the sample mean, not necessarily the raw data.",
  },
  {
    question: "What is the standard error of the sample mean?",
    options: ["σn", "σ / √n", "μ / σ", "n / σ"],
    answer: 1,
    explanation:
      "The standard error of the sample mean is σ / √n. It describes the spread of sample means.",
  },
];

function normalPdf(x: number, mean: number, sd: number) {
  const z = (x - mean) / sd;
  return Math.exp(-0.5 * z * z) / (sd * Math.sqrt(2 * Math.PI));
}

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

function normalCdf(x: number, mean = 0, sd = 1) {
  return 0.5 * (1 + erf((x - mean) / (sd * Math.sqrt(2))));
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
      <span className="border-b border-slate-900 px-2 pb-1">
        {numerator}
      </span>
      <span className="px-2 pt-1">{denominator}</span>
    </span>
  );
}

function NormalDensityEquation() {
  return (
    <MathBox>
      <div className="flex flex-wrap items-center justify-center gap-2 text-lg">
        <span>f(x) =</span>

        <Fraction numerator="1" denominator={<span>σ√(2π)</span>} />

        <span>exp</span>
        <span className="text-2xl">(</span>
        <span>−</span>

        <Fraction
          numerator={
            <span>
              (x − μ)<sup>2</sup>
            </span>
          }
          denominator={
            <span>
              2σ<sup>2</sup>
            </span>
          }
        />

        <span className="text-2xl">)</span>
      </div>
    </MathBox>
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

function NormalCurveLab() {
  const [mean, setMean] = useState(0);
  const [sd, setSd] = useState(1);
  const [lower, setLower] = useState(-1);
  const [upper, setUpper] = useState(1);

  const points = useMemo(() => {
    const values = [];
    const start = mean - 4 * sd;
    const end = mean + 4 * sd;

    for (let i = 0; i <= 140; i++) {
      const x = start + (i / 140) * (end - start);
      values.push({ x, y: normalPdf(x, mean, sd) });
    }

    return values;
  }, [mean, sd]);

  const maxY = Math.max(...points.map((p) => p.y));

  const path = points
    .map((p, i) => {
      const xSvg = 40 + (i / (points.length - 1)) * 340;
      const ySvg = 220 - (p.y / maxY) * 170;
      return `${i === 0 ? "M" : "L"} ${xSvg} ${ySvg}`;
    })
    .join(" ");

  const minBound = Math.min(lower, upper);
  const maxBound = Math.max(lower, upper);

  const shaded = points.filter((p) => p.x >= minBound && p.x <= maxBound);

  const shadedPath =
    shaded.length > 1
      ? [
          `M ${
            40 + (points.indexOf(shaded[0]) / (points.length - 1)) * 340
          } 220`,
          ...shaded.map((p) => {
            const i = points.indexOf(p);
            const xSvg = 40 + (i / (points.length - 1)) * 340;
            const ySvg = 220 - (p.y / maxY) * 170;
            return `L ${xSvg} ${ySvg}`;
          }),
          `L ${
            40 +
            (points.indexOf(shaded[shaded.length - 1]) /
              (points.length - 1)) *
              340
          } 220 Z`,
        ].join(" ")
      : "";

  const probability =
    normalCdf(maxBound, mean, sd) - normalCdf(minBound, mean, sd);

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Normal curve and area lab
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        Change the mean, standard deviation and interval. The shaded area
        represents probability, not the height of the curve.
      </p>

      <MathBox>
        X ~ N(μ, σ<sup>2</sup>)
        <br />
        P(a ≤ X ≤ b) = area under the curve from a to b
      </MathBox>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Mean μ</span>
            <span>{mean.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="-3"
            max="3"
            step="0.1"
            value={mean}
            onChange={(e) => setMean(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Standard deviation σ</span>
            <span>{sd.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={sd}
            onChange={(e) => setSd(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Lower bound a</span>
            <span>{lower.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min={mean - 4 * sd}
            max={mean + 4 * sd}
            step="0.1"
            value={lower}
            onChange={(e) => setLower(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Upper bound b</span>
            <span>{upper.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min={mean - 4 * sd}
            max={mean + 4 * sd}
            step="0.1"
            value={upper}
            onChange={(e) => setUpper(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>

      <svg viewBox="0 0 420 250" className="mt-6 w-full rounded-2xl bg-slate-50">
        <line x1="40" y1="220" x2="390" y2="220" stroke="#94a3b8" />
        <line x1="40" y1="40" x2="40" y2="220" stroke="#94a3b8" />

        {shadedPath && <path d={shadedPath} fill="#bfdbfe" opacity="0.8" />}

        <path d={path} fill="none" stroke="#2563eb" strokeWidth="4" />

        <text x="45" y="35" fontSize="12" fill="#64748b">
          density
        </text>
        <text x="340" y="238" fontSize="12" fill="#64748b">
          x
        </text>
      </svg>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            Area probability
          </p>
          <p className="mt-2 text-3xl font-black">{probability.toFixed(3)}</p>
        </div>

        <div className="rounded-2xl bg-slate-100 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
            z for lower
          </p>
          <p className="mt-2 text-3xl font-black">
            {((minBound - mean) / sd).toFixed(2)}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-100 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
            z for upper
          </p>
          <p className="mt-2 text-3xl font-black">
            {((maxBound - mean) / sd).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

function CLTLab() {
  const [sampleSize, setSampleSize] = useState(5);
  const [population, setPopulation] = useState<"uniform" | "skewed" | "binary">(
    "skewed"
  );

  const values = useMemo(() => {
    const bins = Array.from({ length: 21 }, () => 0);
    const repetitions = 900;

    for (let r = 0; r < repetitions; r++) {
      let sum = 0;

      for (let i = 0; i < sampleSize; i++) {
        const pseudo =
          Math.abs(
            Math.sin((r + 1) * (i + 3) * 12.9898 + sampleSize * 4.1414)
          ) % 1;

        let value = 0;

        if (population === "uniform") {
          value = pseudo;
        }

        if (population === "skewed") {
          value = -Math.log(Math.max(0.0001, pseudo));
        }

        if (population === "binary") {
          value = pseudo < 0.3 ? 1 : 0;
        }

        sum += value;
      }

      const meanValue = sum / sampleSize;

      let scaled = 0;

      if (population === "uniform") scaled = meanValue;
      if (population === "skewed") scaled = Math.min(meanValue / 4, 1);
      if (population === "binary") scaled = meanValue;

      const bin = Math.max(0, Math.min(20, Math.floor(scaled * 20)));
      bins[bin] += 1;
    }

    const max = Math.max(...bins);

    return bins.map((count, index) => ({
      label: index,
      count,
      height: count / max,
    }));
  }, [sampleSize, population]);

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Central Limit Theorem lab
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        Choose a population shape and increase the sample size. The histogram
        shows many simulated sample means. As n increases, the sampling
        distribution becomes more regular and approximately normal.
      </p>

      <MathBox>
        X̄ ≈ N(μ, σ<sup>2</sup> / n)
        <br />
        SE(X̄) = σ / √n
      </MathBox>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Sample size n</span>
            <span>{sampleSize}</span>
          </div>
          <input
            type="range"
            min="1"
            max="80"
            step="1"
            value={sampleSize}
            onChange={(e) => setSampleSize(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 text-sm font-bold">Population shape</div>
          <select
            value={population}
            onChange={(e) =>
              setPopulation(e.target.value as "uniform" | "skewed" | "binary")
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold"
          >
            <option value="skewed">Skewed population</option>
            <option value="uniform">Uniform population</option>
            <option value="binary">Binary population</option>
          </select>
        </label>
      </div>

      <div className="mt-8 flex h-72 items-end gap-1 rounded-2xl bg-slate-50 p-4">
        {values.map((v) => (
          <div
            key={v.label}
            className="flex flex-1 flex-col items-center justify-end"
          >
            <div
              className="w-full rounded-t bg-blue-600 transition-all"
              style={{ height: `${Math.max(2, v.height * 230)}px` }}
            />
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl bg-amber-50 p-5">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-800">
          Interpretation
        </p>
        <p className="mt-2 text-sm leading-7 text-amber-950">
          The CLT does not say the raw data become normal. It says the
          distribution of sample means becomes approximately normal under
          suitable conditions.
        </p>
      </div>
    </div>
  );
}

function StandardErrorLab() {
  const [sd, setSd] = useState(12);
  const [n, setN] = useState(25);

  const se = sd / Math.sqrt(n);

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Standard error lab
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        The standard error is the standard deviation of the sampling
        distribution of the sample mean. Increase n and notice how uncertainty
        in the sample mean decreases.
      </p>

      <MathBox>SE(X̄) = σ / √n</MathBox>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Population standard deviation σ</span>
            <span>{sd.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="1"
            max="40"
            step="0.5"
            value={sd}
            onChange={(e) => setSd(Number(e.target.value))}
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
            min="2"
            max="400"
            step="1"
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-100 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
            σ
          </p>
          <p className="mt-2 text-3xl font-black">{sd.toFixed(2)}</p>
        </div>

        <div className="rounded-2xl bg-slate-100 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
            n
          </p>
          <p className="mt-2 text-3xl font-black">{n}</p>
        </div>

        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            SE
          </p>
          <p className="mt-2 text-3xl font-black">{se.toFixed(3)}</p>
        </div>
      </div>
    </div>
  );
}

export default function NormalDistributionCLTLessonPage() {
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
              Module 3 · Lesson 3.5
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">
              Normal Distribution and Central Limit Theorem
            </h1>

            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600">
              Study the normal distribution, standardisation, probability as
              area, z-scores, the empirical rule, sampling distributions,
              standard error and the Central Limit Theorem. This lesson connects
              probability to statistical inference.
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
                  We studied probability, conditional probability, random
                  variables and discrete distributions. Now everyone says the
                  normal distribution is central to statistics. Why?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  The normal distribution matters for two reasons. Some measured
                  variables are roughly bell-shaped, and many sample averages
                  become approximately normal even when the original data are
                  not normal.
                </DialogueLine>

                <DialogueLine speaker="OL" name="Oliver">
                  That second part sounds like the Central Limit Theorem.
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Exactly. The Central Limit Theorem is one of the main bridges
                  between probability and statistical inference.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="The normal distribution">
              <p className="text-base leading-8 text-slate-700">
                The normal distribution is a continuous probability distribution
                with a symmetric bell shape. It is centred at its mean μ, and
                its spread is controlled by its standard deviation σ.
              </p>

              <MathBox>
                X ~ N(μ, σ<sup>2</sup>)
              </MathBox>

              <p className="text-base leading-8 text-slate-700">
                This notation means that X follows a normal distribution with
                mean μ and variance σ<sup>2</sup>.
              </p>

              <div className="space-y-4">
                <DialogueLine speaker="JA" name="James">
                  Why do we write σ<sup>2</sup> instead of σ?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Because the second parameter in the usual notation is the
                  variance. The standard deviation is σ, while the variance is σ
                  <sup>2</sup>.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="Continuous probability means area">
              <p className="text-base leading-8 text-slate-700">
                In a discrete distribution, probabilities are attached to exact
                values. For example, a die roll can have P(X = 3). But in a
                continuous distribution, probability is assigned to intervals,
                not individual points.
              </p>

              <MathBox>P(a ≤ X ≤ b) = area under the curve from a to b</MathBox>

              <p className="text-base leading-8 text-slate-700">
                For a continuous variable, the probability of one exact point is
                zero:
              </p>

              <MathBox>P(X = x) = 0</MathBox>
            </SectionCard>

            <SectionCard title="Standardisation and z-scores">
              <p className="text-base leading-8 text-slate-700">
                A z-score tells how many standard deviations a value is from the
                mean.
              </p>

              <MathBox>Z = (X − μ) / σ</MathBox>

              <p className="text-base leading-8 text-slate-700">
                If X is normally distributed, then the standardised variable Z
                follows the standard normal distribution.
              </p>

              <MathBox>Z ~ N(0, 1)</MathBox>
            </SectionCard>

            <SectionCard title="The empirical rule">
              <p className="text-base leading-8 text-slate-700">
                For a normal distribution, approximately 68% of observations lie
                within one standard deviation of the mean, 95% within two
                standard deviations and 99.7% within three standard deviations.
              </p>

              <MathBox>
                P(μ − σ ≤ X ≤ μ + σ) ≈ 0.68
                <br />
                P(μ − 2σ ≤ X ≤ μ + 2σ) ≈ 0.95
                <br />
                P(μ − 3σ ≤ X ≤ μ + 3σ) ≈ 0.997
              </MathBox>
            </SectionCard>

            <SectionCard title="The Central Limit Theorem">
              <p className="text-base leading-8 text-slate-700">
                The Central Limit Theorem says that under suitable conditions,
                the sampling distribution of the sample mean becomes
                approximately normal as sample size increases.
              </p>

              <MathBox>
                X̄ ≈ N(μ, σ<sup>2</sup> / n)
              </MathBox>

              <p className="text-base leading-8 text-slate-700">
                Equivalently:
              </p>

              <MathBox>(X̄ − μ) / (σ / √n) ≈ N(0, 1)</MathBox>

              <div className="space-y-4">
                <DialogueLine speaker="SO" name="Sophia">
                  So the original data do not have to be normal?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Correct. The theorem is about the sample mean, not necessarily
                  the raw observations.
                </DialogueLine>
              </div>
            </SectionCard>
          </>
        )}

        {activeTab === "notes" && (
          <>
            <SectionCard title="1. Normal density function">
              <p className="text-base leading-8">
                If X follows a normal distribution with mean μ and variance σ
                <sup>2</sup>, its density is:
              </p>

              <NormalDensityEquation />

              <p className="text-base leading-8">
                The curve is symmetric around μ. The total area under the curve
                is 1. Larger σ values create wider, flatter curves; smaller σ
                values create narrower, taller curves.
              </p>
            </SectionCard>

            <SectionCard title="2. Meaning of density">
              <p className="text-base leading-8">
                A density value is not itself a probability. Probabilities come
                from areas under the density curve.
              </p>

              <MathBox>P(a ≤ X ≤ b) = area under f(x) between a and b</MathBox>

              <p className="text-base leading-8">
                This is why P(X = x) = 0 for continuous variables, while P(a ≤ X
                ≤ b) can be positive.
              </p>
            </SectionCard>

            <SectionCard title="3. Standard normal distribution">
              <p className="text-base leading-8">
                The standard normal distribution has mean 0 and variance 1.
              </p>

              <MathBox>Z ~ N(0, 1)</MathBox>

              <p className="text-base leading-8">
                Any normal variable can be converted into a standard normal
                variable using:
              </p>

              <MathBox>Z = (X − μ) / σ</MathBox>

              <p className="text-base leading-8">
                This transformation subtracts the mean and divides by the
                standard deviation. It changes location and scale but preserves
                the normal shape.
              </p>
            </SectionCard>

            <SectionCard title="4. Deriving the mean and variance of the sample mean">
              <p className="text-base leading-8">
                Let X<sub>1</sub>, X<sub>2</sub>, ..., X<sub>n</sub> be
                independent observations from a population with mean μ and
                variance σ<sup>2</sup>.
              </p>

              <MathBox>
                X̄ = (X<sub>1</sub> + X<sub>2</sub> + ... + X<sub>n</sub>) / n
              </MathBox>

              <p className="text-base leading-8">
                Using linearity of expectation:
              </p>

              <MathBox>
                E(X̄) = E[(X<sub>1</sub> + ... + X<sub>n</sub>) / n]
                <br />
                E(X̄) = [E(X<sub>1</sub>) + ... + E(X<sub>n</sub>)] / n
                <br />
                E(X̄) = nμ / n = μ
              </MathBox>

              <p className="text-base leading-8">
                For variance, independence allows variances to add:
              </p>

              <MathBox>
                Var(X̄) = Var[(X<sub>1</sub> + ... + X<sub>n</sub>) / n]
                <br />
                Var(X̄) = [1 / n<sup>2</sup>] Var(X<sub>1</sub> + ... + X
                <sub>n</sub>)
                <br />
                Var(X̄) = [1 / n<sup>2</sup>] nσ<sup>2</sup>
                <br />
                Var(X̄) = σ<sup>2</sup> / n
              </MathBox>

              <p className="text-base leading-8">
                Therefore the standard deviation of X̄ is:
              </p>

              <MathBox>SE(X̄) = σ / √n</MathBox>
            </SectionCard>

            <SectionCard title="5. Central Limit Theorem statement">
              <p className="text-base leading-8">
                If X<sub>1</sub>, ..., X<sub>n</sub> are independent and
                identically distributed observations with mean μ and finite
                variance σ<sup>2</sup>, then as n becomes large:
              </p>

              <MathBox>(X̄ − μ) / (σ / √n) → N(0, 1)</MathBox>

              <p className="text-base leading-8">
                In introductory statistics, this is often written as:
              </p>

              <MathBox>
                X̄ ≈ N(μ, σ<sup>2</sup> / n)
              </MathBox>

              <p className="text-base leading-8">
                The approximation improves as n increases, especially when the
                population is not extremely skewed or heavy-tailed.
              </p>
            </SectionCard>

            <SectionCard title="6. What the CLT does and does not say">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-emerald-50 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-800">
                    It does say
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-emerald-950">
                    <li>Sample means become approximately normal.</li>
                    <li>The spread of sample means is σ / √n.</li>
                    <li>Larger samples give more stable means.</li>
                    <li>Many inference methods depend on this idea.</li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-red-50 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-red-800">
                    It does not say
                  </p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-red-950">
                    <li>The raw data must become normal.</li>
                    <li>Any sample size is automatically large enough.</li>
                    <li>Dependence and extreme outliers do not matter.</li>
                    <li>All statistics have the same sampling distribution.</li>
                  </ul>
                </div>
              </div>
            </SectionCard>
          </>
        )}

        {activeTab === "interactive" && (
          <>
            <NormalCurveLab />
            <CLTLab />
            <StandardErrorLab />
          </>
        )}

        {activeTab === "examples" && (
          <>
            <SectionCard title="Worked example 1: z-score">
              <p className="text-base leading-8">
                Suppose exam scores are approximately normally distributed with
                mean 70 and standard deviation 10. A student scores 85. Find the
                z-score.
              </p>

              <MathBox>
                Z = (X − μ) / σ
                <br />
                Z = (85 − 70) / 10
                <br />
                Z = 1.5
              </MathBox>

              <p className="text-base leading-8">
                The score is 1.5 standard deviations above the mean.
              </p>
            </SectionCard>

            <SectionCard title="Worked example 2: normal probability">
              <p className="text-base leading-8">
                Let X ~ N(70, 10<sup>2</sup>). Find P(X ≤ 85).
              </p>

              <MathBox>
                Z = (85 − 70) / 10 = 1.5
                <br />
                P(X ≤ 85) = P(Z ≤ 1.5)
                <br />
                P(Z ≤ 1.5) ≈ 0.9332
              </MathBox>

              <p className="text-base leading-8">
                About 93.3% of scores are below 85.
              </p>
            </SectionCard>

            <SectionCard title="Worked example 3: probability between two values">
              <p className="text-base leading-8">
                Let X ~ N(100, 15<sup>2</sup>). Find P(85 ≤ X ≤ 115).
              </p>

              <MathBox>
                z<sub>1</sub> = (85 − 100) / 15 = −1
                <br />
                z<sub>2</sub> = (115 − 100) / 15 = 1
              </MathBox>

              <MathBox>
                P(85 ≤ X ≤ 115) = P(−1 ≤ Z ≤ 1)
                <br />
                P(−1 ≤ Z ≤ 1) ≈ 0.6827
              </MathBox>
            </SectionCard>

            <SectionCard title="Worked example 4: standard error">
              <p className="text-base leading-8">
                Suppose a population has standard deviation σ = 12. A sample of
                size n = 36 is taken. Find the standard error of the sample
                mean.
              </p>

              <MathBox>
                SE(X̄) = σ / √n
                <br />
                SE(X̄) = 12 / √36
                <br />
                SE(X̄) = 12 / 6 = 2
              </MathBox>
            </SectionCard>

            <SectionCard title="Worked example 5: CLT sampling distribution">
              <p className="text-base leading-8">
                A population has mean μ = 50 and standard deviation σ = 20.
                Samples of size n = 100 are taken. Approximate the sampling
                distribution of X̄.
              </p>

              <MathBox>
                E(X̄) = μ = 50
                <br />
                SE(X̄) = σ / √n = 20 / √100 = 2
              </MathBox>

              <MathBox>
                X̄ ≈ N(50, 2<sup>2</sup>)
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
                  q: "Let X ~ N(60, 8²). A student has X = 76. Find the z-score.",
                  a: "Z = (76 − 60) / 8 = 16 / 8 = 2. The value is two standard deviations above the mean.",
                },
                {
                  title: "Exercise 2",
                  q: "Let X ~ N(100, 15²). Find the z-score for X = 70.",
                  a: "Z = (70 − 100) / 15 = −30 / 15 = −2.",
                },
                {
                  title: "Exercise 3",
                  q: "What is the approximate probability that a normal variable lies within two standard deviations of its mean?",
                  a: "Approximately 95%, using the empirical rule.",
                },
                {
                  title: "Exercise 4",
                  q: "A population has σ = 18 and n = 81. Find the standard error of the sample mean.",
                  a: "SE = σ / √n = 18 / √81 = 18 / 9 = 2.",
                },
                {
                  title: "Exercise 5",
                  q: "A population has mean 40 and standard deviation 10. Samples of size 25 are taken. Approximate the sampling distribution of the sample mean.",
                  a: "E(X̄)=40 and SE=10/√25=2. Therefore X̄ is approximately N(40, 2²), under suitable CLT conditions.",
                },
                {
                  title: "Exercise 6",
                  q: "Explain why the CLT does not mean the original data become normal.",
                  a: "The CLT describes the sampling distribution of the sample mean. The raw population data may remain skewed, discrete or non-normal.",
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
                  You have completed Module 3. You are now ready to move into
                  Module 4, where probability becomes statistical inference.
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