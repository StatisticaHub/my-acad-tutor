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
    question: "What is a sampling distribution?",
    options: [
      "The distribution of all individual observations in one sample",
      "The probability distribution of a statistic across repeated samples",
      "A graph of missing values",
      "The distribution of population parameters",
    ],
    answer: 1,
    explanation:
      "A sampling distribution describes how a statistic, such as the sample mean, would vary across repeated random samples of the same size.",
  },
  {
    question: "What does standard error measure?",
    options: [
      "Spread of individual observations",
      "Spread of repeated-sample estimates",
      "The largest possible error",
      "The bias of a study design",
    ],
    answer: 1,
    explanation:
      "Standard error is the standard deviation of a sampling distribution. It measures the typical sample-to-sample variation of an estimator.",
  },
  {
    question: "For the sample mean, what is the standard error when population standard deviation is σ?",
    options: ["σn", "σ / √n", "σ² / n", "n / σ"],
    answer: 1,
    explanation:
      "For independent observations, SE(X̄) = σ / √n.",
  },
  {
    question: "What happens to SE(X̄) if sample size is multiplied by 4?",
    options: [
      "It becomes four times larger",
      "It becomes half as large",
      "It becomes zero",
      "It stays the same",
    ],
    answer: 1,
    explanation:
      "Because SE(X̄) = σ / √n, multiplying n by 4 divides the standard error by √4 = 2.",
  },
  {
    question: "Which statement is correct?",
    options: [
      "Standard deviation and standard error mean the same thing",
      "Standard deviation describes individuals; standard error describes estimates",
      "Standard error measures selection bias",
      "A larger sample size removes all bias",
    ],
    answer: 1,
    explanation:
      "Standard deviation measures variability among observations. Standard error measures uncertainty in an estimate.",
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

function MiniBarChart({
  values,
  labelPrefix,
}: {
  values: { label: string; value: number }[];
  labelPrefix?: string;
}) {
  const max = Math.max(...values.map((v) => v.value));

  return (
    <div className="mt-6 space-y-3">
      {values.map((v) => (
        <div key={v.label}>
          <div className="mb-1 flex justify-between text-xs font-bold text-slate-500">
            <span>{v.label}</span>
            <span>
              {labelPrefix}
              {v.value.toFixed(3)}
            </span>
          </div>

          <div className="h-8 overflow-hidden rounded-full bg-slate-100">
            <div
              className="flex h-full items-center justify-end rounded-full bg-blue-600 pr-3 text-xs font-black text-white transition-all"
              style={{ width: `${max === 0 ? 0 : (v.value / max) * 100}%` }}
            >
              {v.value.toFixed(3)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StandardErrorMeanLab() {
  const [sigma, setSigma] = useState(20);
  const [n, setN] = useState(50);

  const se = sigma / Math.sqrt(n);
  const nToHalve = n * 4;

  const curve = useMemo(() => {
    return [5, 10, 20, 40, 80, 160, 320].map((sampleSize) => ({
      label: `n = ${sampleSize}`,
      value: sigma / Math.sqrt(sampleSize),
    }));
  }, [sigma]);

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Standard error of the mean lab
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        Change the population standard deviation and sample size. Notice that
        standard error decreases with the square root of sample size, not
        directly with sample size.
      </p>

      <MathBox>
        SE(X̄) = <Fraction numerator="σ" denominator="√n" />
      </MathBox>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Population standard deviation σ</span>
            <span>{sigma.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="2"
            max="80"
            step="1"
            value={sigma}
            onChange={(e) => setSigma(Number(e.target.value))}
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
            max="500"
            step="1"
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            SE(X̄)
          </p>
          <p className="mt-2 text-3xl font-black">{se.toFixed(3)}</p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">
            Current n
          </p>
          <p className="mt-2 text-3xl font-black">{n}</p>
        </div>

        <div className="rounded-2xl bg-amber-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">
            n needed to halve SE
          </p>
          <p className="mt-2 text-3xl font-black">{nToHalve}</p>
        </div>
      </div>

      <MiniBarChart values={curve} />
    </div>
  );
}

function ProportionStandardErrorLab() {
  const [p, setP] = useState(0.4);
  const [n, setN] = useState(120);

  const se = Math.sqrt((p * (1 - p)) / n);

  const pCurve = useMemo(() => {
    return [0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95].map(
      (prob) => ({
        label: `p = ${prob.toFixed(2)}`,
        value: Math.sqrt((prob * (1 - prob)) / n),
      })
    );
  }, [n]);

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Standard error of a proportion lab
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        For a sample proportion, uncertainty is largest near p = 0.5 and smaller
        when p is close to 0 or 1. This happens because p(1 − p) is largest at
        p = 0.5.
      </p>

      <MathBox>
        SE(p̂) ={" "}
        <Fraction
          numerator={<span>√[p(1 − p)]</span>}
          denominator={<span>√n</span>}
        />
        {" = "}
        √[p(1 − p) / n]
      </MathBox>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Population proportion p</span>
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

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Sample size n</span>
            <span>{n}</span>
          </div>
          <input
            type="range"
            min="20"
            max="1000"
            step="10"
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            SE(p̂)
          </p>
          <p className="mt-2 text-3xl font-black">{se.toFixed(4)}</p>
        </div>

        <div className="rounded-2xl bg-slate-100 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
            p(1 − p)
          </p>
          <p className="mt-2 text-3xl font-black">
            {(p * (1 - p)).toFixed(3)}
          </p>
        </div>

        <div className="rounded-2xl bg-amber-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">
            Largest possible SE at this n
          </p>
          <p className="mt-2 text-3xl font-black">
            {Math.sqrt(0.25 / n).toFixed(4)}
          </p>
        </div>
      </div>

      <MiniBarChart values={pCurve} />
    </div>
  );
}

function SamplingDistributionSimulator() {
  const [sampleSize, setSampleSize] = useState(10);
  const [population, setPopulation] = useState<"normal" | "skewed" | "binary">(
    "skewed"
  );

  const result = useMemo(() => {
    const repetitions = 1000;
    const bins = Array.from({ length: 24 }, () => 0);
    const sampleMeans: number[] = [];

    for (let r = 0; r < repetitions; r++) {
      let sum = 0;

      for (let i = 0; i < sampleSize; i++) {
        const u =
          Math.abs(
            Math.sin((r + 11) * (i + 7) * 19.391 + sampleSize * 3.17)
          ) % 1;

        let value = 0;

        if (population === "normal") {
          const v =
            Math.abs(
              Math.sin((r + 5) * (i + 13) * 7.931 + sampleSize * 1.31)
            ) % 1;

          value =
            Math.sqrt(-2 * Math.log(Math.max(u, 0.0001))) *
            Math.cos(2 * Math.PI * v);
        }

        if (population === "skewed") {
          value = -Math.log(Math.max(u, 0.0001));
        }

        if (population === "binary") {
          value = u < 0.3 ? 1 : 0;
        }

        sum += value;
      }

      sampleMeans.push(sum / sampleSize);
    }

    const mean =
      sampleMeans.reduce((total, value) => total + value, 0) /
      sampleMeans.length;

    const variance =
      sampleMeans.reduce((total, value) => total + (value - mean) ** 2, 0) /
      (sampleMeans.length - 1);

    const min = Math.min(...sampleMeans);
    const max = Math.max(...sampleMeans);
    const width = (max - min) / bins.length || 1;

    sampleMeans.forEach((value) => {
      const index = Math.max(
        0,
        Math.min(bins.length - 1, Math.floor((value - min) / width))
      );
      bins[index] += 1;
    });

    const maxCount = Math.max(...bins);

    return {
      mean,
      sd: Math.sqrt(variance),
      bins: bins.map((count, index) => ({
        label: index.toString(),
        value: count / maxCount,
      })),
    };
  }, [sampleSize, population]);

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Sampling distribution simulator
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        This lab simulates many repeated samples and plots the distribution of
        the sample mean. Increase the sample size and notice that the sample
        means become less spread out.
      </p>

      <MathBox>
        Sampling distribution of X̄ = distribution of repeated sample means
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
            max="120"
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
              setPopulation(e.target.value as "normal" | "skewed" | "binary")
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold"
          >
            <option value="skewed">Skewed population</option>
            <option value="normal">Normal population</option>
            <option value="binary">Binary population</option>
          </select>
        </label>
      </div>

      <div className="mt-8 flex h-72 items-end gap-1 rounded-2xl bg-slate-50 p-4">
        {result.bins.map((bin) => (
          <div
            key={bin.label}
            className="flex flex-1 flex-col items-center justify-end"
          >
            <div
              className="w-full rounded-t bg-blue-600 transition-all"
              style={{ height: `${Math.max(2, bin.value * 230)}px` }}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            Mean of simulated sample means
          </p>
          <p className="mt-2 text-3xl font-black">{result.mean.toFixed(3)}</p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">
            SD of sample means
          </p>
          <p className="mt-2 text-3xl font-black">{result.sd.toFixed(3)}</p>
        </div>
      </div>
    </div>
  );
}

function BiasPrecisionLab() {
  const [bias, setBias] = useState(5);
  const [standardError, setStandardError] = useState(4);

  const estimates = useMemo(() => {
    const target = 100;
    return Array.from({ length: 25 }, (_, i) => {
      const pseudo = Math.sin((i + 1) * 4.971) * standardError;
      return target + bias + pseudo;
    });
  }, [bias, standardError]);

  const average =
    estimates.reduce((total, value) => total + value, 0) / estimates.length;

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Bias versus precision lab
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        Standard error describes random spread around the estimator's average.
        It does not tell us whether the estimator is centred on the true target.
      </p>

      <MathBox>
        Bias(θ̂) = E(θ̂) − θ
        <br />
        Small SE does not guarantee small bias.
      </MathBox>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Bias</span>
            <span>{bias.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="-20"
            max="20"
            step="1"
            value={bias}
            onChange={(e) => setBias(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Random spread / SE idea</span>
            <span>{standardError.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={standardError}
            onChange={(e) => setStandardError(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>

      <div className="mt-8 rounded-2xl bg-slate-50 p-5">
        <div className="relative h-40">
          <div
            className="absolute top-0 h-full w-1 rounded-full bg-red-500"
            style={{ left: "50%" }}
          />
          <p className="absolute left-[calc(50%+8px)] top-1 text-xs font-black text-red-600">
            True target θ = 100
          </p>

          {estimates.map((value, index) => {
            const left = Math.max(3, Math.min(97, 50 + (value - 100) * 1.5));
            return (
              <div
                key={index}
                className="absolute h-3 w-3 rounded-full bg-blue-600"
                style={{
                  left: `${left}%`,
                  top: `${10 + (index % 8) * 15}px`,
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            Average estimate
          </p>
          <p className="mt-2 text-3xl font-black">{average.toFixed(2)}</p>
        </div>

        <div className="rounded-2xl bg-amber-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">
            Distance from target
          </p>
          <p className="mt-2 text-3xl font-black">
            {Math.abs(average - 100).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SamplingDistributionsStandardErrorLessonPage() {
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
              Module 4 · Lesson 4.1
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">
              Sampling Distributions and Standard Error
            </h1>

            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600">
              This lesson begins statistical inference. We move from probability
              models to estimation, sampling variability, sampling
              distributions, standard error, estimated standard error and the
              difference between random error and bias.
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
                  Module 3 ended with the Central Limit Theorem. Now we are
                  starting inference. What exactly changes?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  We move from probability models to using sample data to learn
                  about population quantities. Inference begins when a statistic
                  calculated from one sample is used to estimate a parameter in a
                  wider population.
                </DialogueLine>

                <DialogueLine speaker="OL" name="Oliver">
                  So if I calculate a sample mean, that sample mean is not the
                  final truth. It is an estimate?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Exactly. It is one estimate produced by one sample. A different
                  random sample would usually give a different estimate.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="The inferential leap">
              <p className="text-base leading-8 text-slate-700">
                Suppose we measure systolic blood pressure in 80 patients and
                find a sample mean of 128 mmHg. That number describes the 80
                patients in the sample. But if we want to say something about all
                similar patients, we must recognise that our sample mean is
                uncertain.
              </p>

              <p className="text-base leading-8 text-slate-700">
                The uncertainty does not mean the calculation is wrong. It means
                the estimate depends on which sample happened to be selected.
                This is the reason inference needs probability.
              </p>

              <div className="space-y-4">
                <DialogueLine speaker="JA" name="James">
                  So sampling variation is the reason two studies can estimate
                  slightly different means even if they target the same
                  population?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Correct. Random sampling variation is unavoidable. Statistics
                  does not pretend it disappears. It measures it.
                </DialogueLine>

                <DialogueLine speaker="SO" name="Sophia">
                  Is that what standard error measures?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Yes. Standard error measures how much a statistic would vary
                  from sample to sample.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="Parameter, statistic, estimator and estimate">
              <p className="text-base leading-8 text-slate-700">
                Before standard error, we need precise language. A parameter is
                a population quantity. A statistic is calculated from sample
                data. An estimator is the rule used to estimate the parameter,
                and an estimate is the realised number after observing data.
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="p-4">Term</th>
                      <th className="p-4">Meaning</th>
                      <th className="p-4">Example</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-4 font-bold">Parameter</td>
                      <td className="p-4">
                        Fixed but usually unknown population quantity
                      </td>
                      <td className="p-4">μ, the population mean</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold">Statistic</td>
                      <td className="p-4">
                        Quantity calculated from sample data
                      </td>
                      <td className="p-4">
                        X̄, the sample mean before data are observed
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold">Estimator</td>
                      <td className="p-4">
                        Rule for estimating a parameter
                      </td>
                      <td className="p-4">Use X̄ to estimate μ</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold">Estimate</td>
                      <td className="p-4">
                        Observed numerical value from the sample
                      </td>
                      <td className="p-4">x̄ = 128</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SectionCard>

            <SectionCard title="Sampling distribution">
              <p className="text-base leading-8 text-slate-700">
                The sampling distribution of a statistic is the probability
                distribution of that statistic across repeated random samples of
                the same size from the same population.
              </p>

              <MathBox>
                Sampling distribution of X̄ = distribution of X̄ across repeated
                samples
              </MathBox>

              <div className="space-y-4">
                <DialogueLine speaker="OL" name="Oliver">
                  But in real life we usually take one sample, not thousands of
                  samples.
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  True. The sampling distribution is often theoretical. It
                  describes what would happen if the sampling process were
                  repeated many times.
                </DialogueLine>

                <DialogueLine speaker="JA" name="James">
                  So it is not the distribution of individual patient blood
                  pressures?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Exactly. That is a common mistake. The raw data distribution
                  describes individuals. The sampling distribution describes a
                  statistic, such as the sample mean.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="Standard error">
              <p className="text-base leading-8 text-slate-700">
                The standard error is the standard deviation of a sampling
                distribution. It measures the typical sample-to-sample variation
                of an estimator.
              </p>

              <MathBox>
                SE(X̄) = <Fraction numerator="σ" denominator="√n" />
              </MathBox>

              <p className="text-base leading-8 text-slate-700">
                For a sample proportion:
              </p>

              <MathBox>SE(p̂) = √[p(1 − p) / n]</MathBox>

              <div className="space-y-4">
                <DialogueLine speaker="SO" name="Sophia">
                  So standard deviation describes individuals, but standard
                  error describes estimates?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Perfect. That distinction is essential for interpreting
                  statistical results.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="Why sample size matters">
              <p className="text-base leading-8 text-slate-700">
                The standard error of the sample mean decreases as 1 / √n. This
                means increasing sample size improves precision, but with
                diminishing returns.
              </p>

              <MathBox>
                To halve SE(X̄), multiply n by 4.
              </MathBox>

              <p className="text-base leading-8 text-slate-700">
                Doubling the sample size does not halve the standard error.
                Because of the square root, the improvement is slower than many
                students expect.
              </p>
            </SectionCard>

            <SectionCard title="Bias versus sampling variability">
              <p className="text-base leading-8 text-slate-700">
                Standard error measures random sampling variability. It does not
                measure bias. A huge biased study can estimate the wrong target
                very precisely.
              </p>

              <MathBox>Bias(θ̂) = E(θ̂) − θ</MathBox>

              <div className="space-y-4">
                <DialogueLine speaker="OL" name="Oliver">
                  If I survey 50,000 people online, the standard error may be
                  tiny. But if the sample is not representative, the result can
                  still be wrong?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Exactly. Large sample size reduces random error, not
                  systematic bias.
                </DialogueLine>
              </div>
            </SectionCard>
          </>
        )}

        {activeTab === "notes" && (
          <>
            <SectionCard title="1. Why inference needs sampling distributions">
              <p className="text-base leading-8">
                A sample statistic is only one possible result from a sampling
                process. If we repeated the sampling process, the statistic would
                usually change. Inferential statistics studies this variation
                mathematically.
              </p>

              <div className="mt-5 rounded-2xl bg-blue-50 p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-800">
                  Core idea
                </p>
                <p className="mt-2 text-sm leading-7 text-blue-950">
                  A sampling distribution is the probability distribution of a
                  statistic over repeated random samples of the same size from
                  the same population.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="2. Sample mean as an estimator">
              <p className="text-base leading-8">
                Let X<sub>1</sub>, X<sub>2</sub>, ..., X<sub>n</sub> be
                independent observations from a population with mean μ and
                variance σ<sup>2</sup>. The sample mean is:
              </p>

              <MathBox>
                X̄ = <Fraction numerator="1" denominator="n" /> ∑
                <sub>i=1</sub>
                <sup>n</sup> X<sub>i</sub>
              </MathBox>

              <p className="text-base leading-8">
                The sample mean is random before data are observed because it is
                a function of random observations.
              </p>
            </SectionCard>

            <SectionCard title="3. Derivation: expectation of the sample mean">
              <p className="text-base leading-8">
                Using linearity of expectation:
              </p>

              <MathBox>
                E(X̄) = E[(X<sub>1</sub> + X<sub>2</sub> + ... + X<sub>n</sub>)
                / n]
                <br />
                E(X̄) = [E(X<sub>1</sub>) + E(X<sub>2</sub>) + ... + E(X
                <sub>n</sub>)] / n
                <br />
                E(X̄) = [μ + μ + ... + μ] / n
                <br />
                E(X̄) = nμ / n = μ
              </MathBox>

              <p className="text-base leading-8">
                Because E(X̄) = μ, the sample mean is an unbiased estimator of
                the population mean.
              </p>
            </SectionCard>

            <SectionCard title="4. Derivation: variance of the sample mean">
              <p className="text-base leading-8">
                Assuming the observations are independent:
              </p>

              <MathBox>
                Var(X̄) = Var[(X<sub>1</sub> + ... + X<sub>n</sub>) / n]
                <br />
                Var(X̄) ={" "}
                <Fraction numerator="1" denominator={<span>n<sup>2</sup></span>} />{" "}
                Var(X<sub>1</sub> + ... + X<sub>n</sub>)
                <br />
                Var(X̄) ={" "}
                <Fraction numerator="1" denominator={<span>n<sup>2</sup></span>} />{" "}
                [Var(X<sub>1</sub>) + ... + Var(X<sub>n</sub>)]
                <br />
                Var(X̄) ={" "}
                <Fraction
                  numerator={<span>nσ<sup>2</sup></span>}
                  denominator={<span>n<sup>2</sup></span>}
                />
                {" = "}
                <Fraction numerator={<span>σ<sup>2</sup></span>} denominator="n" />
              </MathBox>

              <p className="text-base leading-8">
                Taking the square root gives the standard error:
              </p>

              <MathBox>
                SE(X̄) = √Var(X̄) ={" "}
                <Fraction numerator="σ" denominator="√n" />
              </MathBox>
            </SectionCard>

            <SectionCard title="5. Estimated standard error">
              <p className="text-base leading-8">
                In practice, the population standard deviation σ is usually
                unknown. We estimate it using the sample standard deviation s.
              </p>

              <MathBox>
                Estimated SE(X̄) = <Fraction numerator="s" denominator="√n" />
              </MathBox>

              <p className="text-base leading-8">
                The standard error itself is then estimated from the sample.
                This is why later lessons introduce t-distributions when σ is
                unknown.
              </p>
            </SectionCard>

            <SectionCard title="6. Sample proportion and its standard error">
              <p className="text-base leading-8">
                If X is the number of successes in n independent Bernoulli
                trials, then:
              </p>

              <MathBox>X ~ Binomial(n, p)</MathBox>

              <p className="text-base leading-8">
                The sample proportion is:
              </p>

              <MathBox>p̂ = X / n</MathBox>

              <p className="text-base leading-8">
                Since E(X) = np:
              </p>

              <MathBox>E(p̂) = E(X / n) = E(X) / n = np / n = p</MathBox>

              <p className="text-base leading-8">
                Since Var(X) = np(1 − p):
              </p>

              <MathBox>
                Var(p̂) = Var(X / n)
                <br />
                Var(p̂) = Var(X) / n<sup>2</sup>
                <br />
                Var(p̂) = np(1 − p) / n<sup>2</sup>
                <br />
                Var(p̂) = p(1 − p) / n
              </MathBox>

              <p className="text-base leading-8">
                Therefore:
              </p>

              <MathBox>SE(p̂) = √[p(1 − p) / n]</MathBox>
            </SectionCard>

            <SectionCard title="7. Central Limit Theorem connection">
              <p className="text-base leading-8">
                Under suitable conditions, the Central Limit Theorem gives:
              </p>

              <MathBox>
                X̄ ≈ N(μ, σ<sup>2</sup> / n)
              </MathBox>

              <p className="text-base leading-8">
                After standardisation:
              </p>

              <MathBox>
                <Fraction numerator={<span>X̄ − μ</span>} denominator={<span>σ / √n</span>} />{" "}
                ≈ N(0, 1)
              </MathBox>

              <p className="text-base leading-8">
                This is the mathematical foundation for confidence intervals and
                many hypothesis tests.
              </p>
            </SectionCard>

            <SectionCard title="8. Standard deviation versus standard error">
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="p-4">Quantity</th>
                      <th className="p-4">Describes</th>
                      <th className="p-4">Question answered</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-4 font-bold">Standard deviation</td>
                      <td className="p-4">Spread of individual observations</td>
                      <td className="p-4">How variable are individuals?</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold">Standard error</td>
                      <td className="p-4">
                        Spread of estimates across repeated samples
                      </td>
                      <td className="p-4">How uncertain is the estimate?</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SectionCard>

            <SectionCard title="9. Effect of sample size">
              <p className="text-base leading-8">
                For the sample mean:
              </p>

              <MathBox>
                SE(X̄) = <Fraction numerator="σ" denominator="√n" />
              </MathBox>

              <p className="text-base leading-8">
                If sample size is multiplied by c, the standard error is divided
                by √c. Therefore:
              </p>

              <MathBox>
                n multiplied by 4 ⇒ SE divided by 2
                <br />
                n multiplied by 9 ⇒ SE divided by 3
                <br />
                n multiplied by 100 ⇒ SE divided by 10
              </MathBox>
            </SectionCard>

            <SectionCard title="10. Bias and standard error are different">
              <p className="text-base leading-8">
                Standard error measures random variation of the estimator. Bias
                is systematic displacement from the target parameter.
              </p>

              <MathBox>Bias(θ̂) = E(θ̂) − θ</MathBox>

              <p className="text-base leading-8">
                An estimator can have small standard error but large bias. That
                means it repeatedly estimates the wrong target very precisely.
              </p>

              <div className="mt-5 rounded-2xl bg-red-50 p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-red-800">
                  Important warning
                </p>
                <p className="mt-2 text-sm leading-7 text-red-950">
                  A large sample size can make random error small, but it cannot
                  automatically repair poor sampling, measurement bias,
                  confounding or selection bias.
                </p>
              </div>
            </SectionCard>
          </>
        )}

        {activeTab === "interactive" && (
          <>
            <StandardErrorMeanLab />
            <ProportionStandardErrorLab />
            <SamplingDistributionSimulator />
            <BiasPrecisionLab />
          </>
        )}

        {activeTab === "examples" && (
          <>
            <SectionCard title="Worked example 1: standard error of a mean">
              <p className="text-base leading-8">
                A population has standard deviation σ = 12. A sample of size n =
                36 is taken. Find SE(X̄).
              </p>

              <MathBox>
                SE(X̄) = <Fraction numerator="σ" denominator="√n" />
                <br />
                SE(X̄) = 12 / √36
                <br />
                SE(X̄) = 12 / 6 = 2
              </MathBox>

              <p className="text-base leading-8">
                The sample mean varies with standard deviation 2 across repeated
                samples.
              </p>
            </SectionCard>

            <SectionCard title="Worked example 2: effect of increasing n">
              <p className="text-base leading-8">
                Suppose σ = 20. Compare SE(X̄) for n = 25 and n = 100.
              </p>

              <MathBox>
                For n = 25: SE = 20 / √25 = 20 / 5 = 4
                <br />
                For n = 100: SE = 20 / √100 = 20 / 10 = 2
              </MathBox>

              <p className="text-base leading-8">
                Increasing the sample size from 25 to 100 divides the standard
                error by 2, because the sample size has been multiplied by 4.
              </p>
            </SectionCard>

            <SectionCard title="Worked example 3: estimated standard error">
              <p className="text-base leading-8">
                A sample of n = 64 students has sample standard deviation s = 16.
                Estimate the standard error of the sample mean.
              </p>

              <MathBox>
                Estimated SE(X̄) = s / √n
                <br />
                Estimated SE(X̄) = 16 / √64
                <br />
                Estimated SE(X̄) = 16 / 8 = 2
              </MathBox>
            </SectionCard>

            <SectionCard title="Worked example 4: standard error of a proportion">
              <p className="text-base leading-8">
                Suppose p = 0.30 and n = 200. Find SE(p̂).
              </p>

              <MathBox>
                SE(p̂) = √[p(1 − p) / n]
                <br />
                SE(p̂) = √[0.30(0.70) / 200]
                <br />
                SE(p̂) = √[0.21 / 200]
                <br />
                SE(p̂) = √0.00105 ≈ 0.0324
              </MathBox>
            </SectionCard>

            <SectionCard title="Worked example 5: estimated standard error of a proportion">
              <p className="text-base leading-8">
                In a sample of 500 people, 180 report a particular outcome. Find
                p̂ and estimate SE(p̂).
              </p>

              <MathBox>
                p̂ = 180 / 500 = 0.36
                <br />
                Estimated SE(p̂) = √[p̂(1 − p̂) / n]
                <br />
                Estimated SE(p̂) = √[0.36(0.64) / 500]
                <br />
                Estimated SE(p̂) = √0.0004608 ≈ 0.0215
              </MathBox>
            </SectionCard>

            <SectionCard title="Worked example 6: bias versus standard error">
              <p className="text-base leading-8">
                A very large online poll estimates support for a policy with a
                tiny standard error. However, the poll only reaches people from
                one social media platform. What is the problem?
              </p>

              <div className="rounded-2xl bg-amber-50 p-5">
                <p className="text-sm leading-7 text-amber-950">
                  The tiny standard error only tells us the estimate is precise
                  under the sampling model. It does not guarantee the sample is
                  representative. The estimate may have selection bias.
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
                  q: "A population has σ = 15 and n = 25. Find SE(X̄).",
                  a: "SE(X̄) = σ / √n = 15 / √25 = 15 / 5 = 3.",
                },
                {
                  title: "Exercise 2",
                  q: "A population has σ = 30. What sample size is needed to make SE(X̄) = 3?",
                  a: "SE = σ / √n. So 3 = 30 / √n. Hence √n = 10 and n = 100.",
                },
                {
                  title: "Exercise 3",
                  q: "If n increases from 40 to 160, what happens to SE(X̄), assuming σ is unchanged?",
                  a: "The sample size is multiplied by 4, so the standard error is divided by √4 = 2. It becomes half as large.",
                },
                {
                  title: "Exercise 4",
                  q: "A sample has n = 49 and sample standard deviation s = 21. Estimate SE(X̄).",
                  a: "Estimated SE(X̄) = s / √n = 21 / √49 = 21 / 7 = 3.",
                },
                {
                  title: "Exercise 5",
                  q: "For p = 0.5 and n = 400, find SE(p̂).",
                  a: "SE(p̂) = √[p(1 − p) / n] = √[0.5 × 0.5 / 400] = √0.000625 = 0.025.",
                },
                {
                  title: "Exercise 6",
                  q: "Explain why standard error does not measure bias.",
                  a: "Standard error measures random sample-to-sample variability of an estimator. Bias is systematic displacement from the true target. A study can be precise but biased.",
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
                  You have completed Lesson 4.1. You are ready for confidence
                  intervals, where standard error becomes margin of error.
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