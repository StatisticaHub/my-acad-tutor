"use client";

import { useMemo, useState } from "react";

const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  return `${basePath}${href}/`;
}

type Tab = "lecture" | "notes" | "interactive" | "examples" | "exercises" | "quiz";

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
    question: "Which statement best describes a sample space?",
    options: [
      "A single result of an experiment",
      "The set of all possible outcomes",
      "The probability of one event",
      "The average result after many repetitions",
    ],
    answer: 1,
    explanation:
      "The sample space is the complete set of all possible outcomes of a random experiment.",
  },
  {
    question: "If A and B are mutually exclusive, what is P(A ∩ B)?",
    options: ["1", "P(A) + P(B)", "0", "P(A)P(B)"],
    answer: 2,
    explanation:
      "Mutually exclusive events cannot happen together, so their intersection has probability 0.",
  },
  {
    question: "Which formula is always valid for two events A and B?",
    options: [
      "P(A ∪ B) = P(A) + P(B)",
      "P(A ∪ B) = P(A) + P(B) − P(A ∩ B)",
      "P(A ∩ B) = 0",
      "P(A) = P(B)",
    ],
    answer: 1,
    explanation:
      "The general addition rule subtracts the overlap so that it is not counted twice.",
  },
  {
    question: "What does the axiom P(S) = 1 mean?",
    options: [
      "Every event is certain",
      "The sample space contains all possible outcomes",
      "All outcomes are equally likely",
      "No event can have probability zero",
    ],
    answer: 1,
    explanation:
      "The full sample space S represents everything that can happen, so its probability is 1.",
  },
  {
    question: "If P(A) = 0.7, what is P(Aᶜ)?",
    options: ["0.7", "1.7", "0.3", "Cannot be found"],
    answer: 2,
    explanation:
      "The complement rule is P(Aᶜ) = 1 − P(A), so 1 − 0.7 = 0.3.",
  },
];

function MathBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-center font-mono text-sm leading-7 text-slate-900">
      {children}
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

function ProbabilityBarChart({
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
            <span>{v.probability.toFixed(2)}</span>
          </div>
          <div className="h-8 overflow-hidden rounded-full bg-slate-100">
            <div
              className="flex h-full items-center justify-end rounded-full bg-blue-600 pr-3 text-xs font-black text-white transition-all"
              style={{ width: `${(v.probability / max) * 100}%` }}
            >
              {v.probability.toFixed(2)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function VennExplorer() {
  const [pA, setPA] = useState(0.6);
  const [pB, setPB] = useState(0.5);
  const [overlap, setOverlap] = useState(0.25);

  const maxOverlap = Math.min(pA, pB);
  const validOverlap = Math.min(overlap, maxOverlap);
  const union = pA + pB - validOverlap;
  const neither = 1 - union;

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Interactive union and overlap explorer
      </h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        Move the sliders and observe how the union changes. The key rule is:
      </p>

      <MathBox>
        P(A ∪ B) = P(A) + P(B) − P(A ∩ B)
      </MathBox>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="space-y-5">
          <label className="block">
            <div className="mb-2 flex justify-between text-sm font-bold">
              <span>P(A)</span>
              <span>{pA.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.95"
              step="0.05"
              value={pA}
              onChange={(e) => setPA(Number(e.target.value))}
              className="w-full"
            />
          </label>

          <label className="block">
            <div className="mb-2 flex justify-between text-sm font-bold">
              <span>P(B)</span>
              <span>{pB.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.95"
              step="0.05"
              value={pB}
              onChange={(e) => setPB(Number(e.target.value))}
              className="w-full"
            />
          </label>

          <label className="block">
            <div className="mb-2 flex justify-between text-sm font-bold">
              <span>P(A ∩ B)</span>
              <span>{validOverlap.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0"
              max={maxOverlap}
              step="0.05"
              value={validOverlap}
              onChange={(e) => setOverlap(Number(e.target.value))}
              className="w-full"
            />
          </label>
        </div>

        <div>
          <svg viewBox="0 0 420 260" className="w-full rounded-2xl bg-slate-50">
            <rect
              x="20"
              y="20"
              width="380"
              height="220"
              rx="24"
              fill="white"
              stroke="#cbd5e1"
            />
            <circle cx="170" cy="130" r="88" fill="#bfdbfe" opacity="0.75" />
            <circle cx="250" cy="130" r="88" fill="#bbf7d0" opacity="0.75" />
            <text x="130" y="132" fontSize="20" fontWeight="700" fill="#1e3a8a">
              A
            </text>
            <text x="282" y="132" fontSize="20" fontWeight="700" fill="#166534">
              B
            </text>
            <text x="198" y="132" fontSize="16" fontWeight="700" fill="#334155">
              A ∩ B
            </text>
            <text x="38" y="52" fontSize="14" fill="#64748b">
              Sample space S
            </text>
          </svg>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-slate-50 p-4 text-center">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">
                Union
              </p>
              <p className="mt-1 text-3xl font-black">{union.toFixed(2)}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 text-center">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">
                Neither
              </p>
              <p className="mt-1 text-3xl font-black">
                {Math.max(neither, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RelativeFrequencySimulator() {
  const [prob, setProb] = useState(0.5);
  const [trials, setTrials] = useState(20);

  const path = useMemo(() => {
    let successes = 0;
    const points = [];

    for (let i = 1; i <= trials; i++) {
      const pseudo = Math.abs(Math.sin(i * 12.9898 + prob * 78.233)) % 1;
      if (pseudo < prob) successes++;
      points.push({
        trial: i,
        relative: successes / i,
      });
    }

    return points;
  }, [prob, trials]);

  const polyline = path
    .map((p) => {
      const x = 40 + ((p.trial - 1) / Math.max(trials - 1, 1)) * 340;
      const y = 220 - p.relative * 170;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Long-run relative frequency simulator
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        Probability does not guarantee the next outcome. Instead, it describes
        long-run behaviour across repeated trials.
      </p>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>True probability of success</span>
            <span>{prob.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="0.9"
            step="0.05"
            value={prob}
            onChange={(e) => setProb(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Number of trials</span>
            <span>{trials}</span>
          </div>
          <input
            type="range"
            min="5"
            max="200"
            step="5"
            value={trials}
            onChange={(e) => setTrials(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>

      <svg viewBox="0 0 420 250" className="mt-6 w-full rounded-2xl bg-slate-50">
        <line x1="40" y1="220" x2="390" y2="220" stroke="#94a3b8" />
        <line x1="40" y1="40" x2="40" y2="220" stroke="#94a3b8" />
        <line
          x1="40"
          y1={220 - prob * 170}
          x2="390"
          y2={220 - prob * 170}
          stroke="#ef4444"
          strokeDasharray="6 5"
        />
        <polyline
          points={polyline}
          fill="none"
          stroke="#2563eb"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x="48" y="34" fontSize="12" fill="#64748b">
          Relative frequency
        </text>
        <text x="330" y="238" fontSize="12" fill="#64748b">
          Trials
        </text>
        <text x="300" y={214 - prob * 170} fontSize="12" fill="#ef4444">
          true p = {prob.toFixed(2)}
        </text>
      </svg>
    </div>
  );
}

export default function ProbabilityBasicsAndAxiomsLessonPage() {
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
              Module 3 · Lesson 3.1
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">
              Probability Basics and Axioms
            </h1>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600">
              Learn how uncertainty becomes mathematics through sample spaces,
              events, complements, unions, intersections and the three
              probability axioms.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
              Lesson structure
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Lecture · Notes · Interactive graphs · Worked examples ·
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
                  We finished descriptive statistics. We described data using
                  averages, spread and graphs. But probability feels like a
                  different world.
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  It is connected. Descriptive statistics tells us what happened
                  in the data we observed. Probability helps us reason about
                  what could have happened before the data were observed.
                </DialogueLine>

                <DialogueLine speaker="OL" name="Oliver">
                  So probability is about uncertainty before we see the result?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Exactly. Before a sample is collected, many samples could have
                  been selected. Probability gives us the language to describe
                  that uncertainty.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="Why probability matters in statistics">
              <p className="text-base leading-8 text-slate-700">
                Suppose we randomly select 50 students and calculate their
                average study time. If we select another 50 students, the
                average will probably change. This change is not necessarily an
                error. It is sampling variation.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-700">
                Statistics needs probability because we rarely observe the
                entire population. We observe samples, and samples vary.
                Probability helps us understand how much variation is expected
                simply because of randomness.
              </p>

              <div className="mt-6 rounded-2xl bg-blue-50 p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-800">
                  Big idea
                </p>
                <p className="mt-2 text-sm leading-7 text-blue-950">
                  Probability moves from a known model to possible data.
                  Statistics often moves from observed data back toward an
                  unknown population or model.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="Random experiments, outcomes and sample spaces">
              <p className="text-base leading-8 text-slate-700">
                A random experiment is any process whose result is uncertain
                before it happens. One result of the experiment is called an
                outcome. The set of all possible outcomes is called the sample
                space.
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="p-4">Random experiment</th>
                      <th className="p-4">One outcome</th>
                      <th className="p-4">Sample space</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-4">Roll one die</td>
                      <td className="p-4">4</td>
                      <td className="p-4">{"{1,2,3,4,5,6}"}</td>
                    </tr>
                    <tr>
                      <td className="p-4">Toss one coin</td>
                      <td className="p-4">Head</td>
                      <td className="p-4">{"{H,T}"}</td>
                    </tr>
                    <tr>
                      <td className="p-4">Observe treatment response</td>
                      <td className="p-4">Response</td>
                      <td className="p-4">{"{response, no response}"}</td>
                    </tr>
                    <tr>
                      <td className="p-4">Select one student</td>
                      <td className="p-4">Sophia</td>
                      <td className="p-4">All students in the group</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 space-y-4">
                <DialogueLine speaker="JA" name="James">
                  Then an event is a collection of outcomes, right?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Correct. If the experiment is rolling a die, the event “even
                  number” is the set {"{2,4,6}"}. Events are subsets of the
                  sample space.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="The three probability axioms">
              <p className="text-base leading-8 text-slate-700">
                Axioms are the foundation rules. They do not come from a
                formula. Instead, they define what a probability system is
                allowed to do.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-black text-blue-700">Axiom 1</p>
                  <h3 className="mt-2 text-xl font-black">Non-negativity</h3>
                  <MathBox>P(A) ≥ 0</MathBox>
                  <p className="text-sm leading-7 text-slate-600">
                    A probability cannot be negative.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-black text-blue-700">Axiom 2</p>
                  <h3 className="mt-2 text-xl font-black">Total probability</h3>
                  <MathBox>P(S) = 1</MathBox>
                  <p className="text-sm leading-7 text-slate-600">
                    The full sample space has probability 1.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-black text-blue-700">Axiom 3</p>
                  <h3 className="mt-2 text-xl font-black">Additivity</h3>
                  <MathBox>P(A ∪ B) = P(A) + P(B)</MathBox>
                  <p className="text-sm leading-7 text-slate-600">
                    This holds when A and B cannot occur together.
                  </p>
                </div>
              </div>
            </SectionCard>
          </>
        )}

        {activeTab === "notes" && (
          <>
            <SectionCard title="1. Sample space and events">
              <p className="text-base leading-8">
                Let S denote the sample space. An outcome is an element of S,
                and an event is a subset of S. If A is an event, then A occurs
                when the observed outcome belongs to A.
              </p>

              <MathBox>
                S = set of all possible outcomes
                <br />
                A ⊆ S
              </MathBox>

              <p className="text-base leading-8">
                Example: If a die is rolled, S = {"{1,2,3,4,5,6}"}. The event
                A = “an even number occurs” is A = {"{2,4,6}"}.
              </p>
            </SectionCard>

            <SectionCard title="2. Complement rule">
              <p className="text-base leading-8">
                The complement of A, written Aᶜ, is the event that A does not
                occur. Since A and Aᶜ cover the whole sample space and do not
                overlap:
              </p>

              <MathBox>
                A ∪ Aᶜ = S
                <br />
                A ∩ Aᶜ = ∅
                <br />
                P(A) + P(Aᶜ) = 1
              </MathBox>

              <p className="text-base leading-8">
                Therefore:
              </p>

              <MathBox>P(Aᶜ) = 1 − P(A)</MathBox>
            </SectionCard>

            <SectionCard title="3. Union, intersection and overlap">
              <p className="text-base leading-8">
                The union A ∪ B means A or B or both. The intersection A ∩ B
                means both A and B occur. If we add P(A) and P(B), the overlap
                A ∩ B is counted twice. Therefore, we subtract it once.
              </p>

              <MathBox>P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</MathBox>

              <p className="text-base leading-8">
                When A and B are mutually exclusive, their overlap is empty:
              </p>

              <MathBox>
                A ∩ B = ∅
                <br />
                P(A ∩ B) = 0
                <br />
                P(A ∪ B) = P(A) + P(B)
              </MathBox>
            </SectionCard>

            <SectionCard title="4. Derived probability properties">
              <div className="space-y-5">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-xl font-black">Property 1: P(∅) = 0</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    The impossible event has probability zero because it
                    contains no possible outcome.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-xl font-black">Property 2: 0 ≤ P(A) ≤ 1</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Non-negativity gives P(A) ≥ 0, and the complement rule gives
                    P(A) ≤ 1.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-xl font-black">
                    Property 3: If A ⊆ B, then P(A) ≤ P(B)
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    If every outcome in A is also in B, then B contains at least
                    as much probability mass as A.
                  </p>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="5. Probability is not certainty">
              <p className="text-base leading-8">
                A probability of 0.8 does not mean the event must happen on the
                next trial. It means that under the probability model, the event
                has high long-run tendency. This distinction is essential in
                medicine, risk prediction, epidemiology and statistical
                inference.
              </p>
            </SectionCard>
          </>
        )}

        {activeTab === "interactive" && (
          <>
            <VennExplorer />

            <RelativeFrequencySimulator />

            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
              <h3 className="text-2xl font-black tracking-tight">
                Probability distribution for one die
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                For a fair die, each outcome has probability 1/6. The graph
                shows a simple probability distribution.
              </p>

              <ProbabilityBarChart
                values={[
                  { label: "1", probability: 1 / 6 },
                  { label: "2", probability: 1 / 6 },
                  { label: "3", probability: 1 / 6 },
                  { label: "4", probability: 1 / 6 },
                  { label: "5", probability: 1 / 6 },
                  { label: "6", probability: 1 / 6 },
                ]}
              />

              <div className="mt-5 rounded-2xl bg-amber-50 p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-800">
                  Interpretation
                </p>
                <p className="mt-2 text-sm leading-7 text-amber-950">
                  The probabilities sum to 1 because one of the six outcomes
                  must occur.
                </p>
              </div>
            </div>
          </>
        )}

        {activeTab === "examples" && (
          <>
            <SectionCard title="Worked example 1: Complement rule">
              <p className="text-base leading-8">
                Suppose the probability that a randomly selected student passes
                an exam is 0.82. Find the probability that the student does not
                pass.
              </p>

              <MathBox>
                P(pass) = 0.82
                <br />
                P(not pass) = 1 − P(pass)
                <br />
                P(not pass) = 1 − 0.82 = 0.18
              </MathBox>

              <p className="text-base leading-8">
                So the probability of not passing is 0.18.
              </p>
            </SectionCard>

            <SectionCard title="Worked example 2: Addition rule with overlap">
              <p className="text-base leading-8">
                In a class, 60% of students study statistics, 45% study
                economics, and 25% study both. Find the probability that a
                randomly selected student studies statistics or economics.
              </p>

              <MathBox>
                P(S ∪ E) = P(S) + P(E) − P(S ∩ E)
                <br />
                P(S ∪ E) = 0.60 + 0.45 − 0.25
                <br />
                P(S ∪ E) = 0.80
              </MathBox>

              <p className="text-base leading-8">
                The probability is 0.80. We subtract 0.25 because students who
                study both were counted twice.
              </p>
            </SectionCard>

            <SectionCard title="Worked example 3: Mutually exclusive events">
              <p className="text-base leading-8">
                When rolling a die, let A be the event “roll a 1” and B be the
                event “roll a 6”. These events are mutually exclusive.
              </p>

              <MathBox>
                P(A ∩ B) = 0
                <br />
                P(A ∪ B) = P(A) + P(B)
                <br />
                P(A ∪ B) = 1/6 + 1/6 = 2/6 = 1/3
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
                  q: "A card is drawn from a standard deck. Let A be the event that the card is a heart. What is P(A)?",
                  a: "There are 13 hearts in 52 cards. Therefore P(A) = 13/52 = 1/4.",
                },
                {
                  title: "Exercise 2",
                  q: "If P(A) = 0.35, find P(Aᶜ).",
                  a: "P(Aᶜ) = 1 − P(A) = 1 − 0.35 = 0.65.",
                },
                {
                  title: "Exercise 3",
                  q: "Suppose P(A) = 0.50, P(B) = 0.40 and P(A ∩ B) = 0.20. Find P(A ∪ B).",
                  a: "P(A ∪ B) = 0.50 + 0.40 − 0.20 = 0.70.",
                },
                {
                  title: "Exercise 4",
                  q: "If A and B are mutually exclusive with P(A) = 0.30 and P(B) = 0.25, find P(A ∪ B).",
                  a: "Since the events are mutually exclusive, P(A ∩ B) = 0. So P(A ∪ B) = 0.30 + 0.25 = 0.55.",
                },
                {
                  title: "Exercise 5",
                  q: "A student says: 'If two events are mutually exclusive, they must be independent.' Explain why this is wrong.",
                  a: "If two positive-probability events are mutually exclusive, then when one occurs the other becomes impossible. Therefore knowing one occurred changes the probability of the other. They are not independent.",
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
                  You have completed the Lesson 3.1 quiz. Review the notes and
                  worked examples if any probability rules still feel unclear.
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