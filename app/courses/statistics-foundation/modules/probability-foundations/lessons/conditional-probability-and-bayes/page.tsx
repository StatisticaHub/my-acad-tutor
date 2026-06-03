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
    question: "What does P(A|B) mean?",
    options: [
      "The probability of A and B being mutually exclusive",
      "The probability of A given that B has occurred",
      "The probability of B given that A has occurred",
      "The probability that neither A nor B occurs",
    ],
    answer: 1,
    explanation:
      "P(A|B) means the probability of event A after restricting attention to the cases where B has occurred.",
  },
  {
    question: "Which formula defines conditional probability?",
    options: [
      "P(A|B) = P(A)P(B)",
      "P(A|B) = P(A ∪ B) / P(B)",
      "P(A|B) = P(A ∩ B) / P(B)",
      "P(A|B) = P(B) / P(A)",
    ],
    answer: 2,
    explanation:
      "The definition is P(A|B) = P(A ∩ B) / P(B), provided P(B) > 0.",
  },
  {
    question: "Which statement correctly describes independence?",
    options: [
      "A and B are independent if they cannot occur together",
      "A and B are independent if P(A|B) = P(A)",
      "A and B are independent if P(A ∪ B) = 1",
      "A and B are independent if P(A) = P(B)",
    ],
    answer: 1,
    explanation:
      "Independence means knowing B occurred does not change the probability of A, so P(A|B) = P(A).",
  },
  {
    question: "Why is P(A|B) usually different from P(B|A)?",
    options: [
      "Because they have different denominators",
      "Because one must always be zero",
      "Because they are complements",
      "Because they are always independent",
    ],
    answer: 0,
    explanation:
      "P(A|B) uses P(B) as the denominator, while P(B|A) uses P(A). Same overlap, different reference group.",
  },
  {
    question:
      "In diagnostic testing, sensitivity is P(+|D). What probability does a patient usually want after receiving a positive result?",
    options: ["P(+|D)", "P(D|+)", "P(Dᶜ|−)", "P(+|Dᶜ)"],
    answer: 1,
    explanation:
      "The patient wants the probability of disease given a positive test, P(D|+), not the probability of a positive test given disease.",
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

function BayesMedicalLab() {
  const [prevalence, setPrevalence] = useState(1);
  const [sensitivity, setSensitivity] = useState(95);
  const [specificity, setSpecificity] = useState(90);

  const values = useMemo(() => {
    const population = 10000;
    const disease = (prevalence / 100) * population;
    const noDisease = population - disease;

    const truePositive = disease * (sensitivity / 100);
    const falseNegative = disease - truePositive;

    const trueNegative = noDisease * (specificity / 100);
    const falsePositive = noDisease - trueNegative;

    const positiveTests = truePositive + falsePositive;
    const negativeTests = trueNegative + falseNegative;

    const ppv = positiveTests > 0 ? truePositive / positiveTests : 0;
    const npv = negativeTests > 0 ? trueNegative / negativeTests : 0;

    return {
      population,
      disease,
      noDisease,
      truePositive,
      falseNegative,
      trueNegative,
      falsePositive,
      positiveTests,
      negativeTests,
      ppv,
      npv,
    };
  }, [prevalence, sensitivity, specificity]);

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Interactive Bayes lab: medical testing
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        Change prevalence, sensitivity and specificity. Notice how the
        probability of disease after a positive test depends strongly on disease
        prevalence.
      </p>

      <MathBox>
        P(D|+) = [P(+|D)P(D)] / [P(+|D)P(D) + P(+|Dᶜ)P(Dᶜ)]
      </MathBox>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Prevalence</span>
            <span>{prevalence}%</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="30"
            step="0.1"
            value={prevalence}
            onChange={(e) => setPrevalence(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Sensitivity</span>
            <span>{sensitivity}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="100"
            step="1"
            value={sensitivity}
            onChange={(e) => setSensitivity(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Specificity</span>
            <span>{specificity}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="100"
            step="1"
            value={specificity}
            onChange={(e) => setSpecificity(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-emerald-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">
            True positives
          </p>
          <p className="mt-2 text-3xl font-black">
            {Math.round(values.truePositive)}
          </p>
        </div>

        <div className="rounded-2xl bg-red-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#6f0d12]">
            False positives
          </p>
          <p className="mt-2 text-3xl font-black">
            {Math.round(values.falsePositive)}
          </p>
        </div>

        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            P(D|+)
          </p>
          <p className="mt-2 text-3xl font-black">
            {(values.ppv * 100).toFixed(1)}%
          </p>
        </div>

        <div className="rounded-2xl bg-slate-100 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-700">
            P(no disease|−)
          </p>
          <p className="mt-2 text-3xl font-black">
            {(values.npv * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="p-4">Group in 10,000 people</th>
              <th className="p-4">Positive test</th>
              <th className="p-4">Negative test</th>
              <th className="p-4">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="p-4 font-bold">Disease</td>
              <td className="p-4">{Math.round(values.truePositive)}</td>
              <td className="p-4">{Math.round(values.falseNegative)}</td>
              <td className="p-4">{Math.round(values.disease)}</td>
            </tr>
            <tr>
              <td className="p-4 font-bold">No disease</td>
              <td className="p-4">{Math.round(values.falsePositive)}</td>
              <td className="p-4">{Math.round(values.trueNegative)}</td>
              <td className="p-4">{Math.round(values.noDisease)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-5 rounded-2xl bg-amber-50 p-5">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-800">
          Important interpretation
        </p>
        <p className="mt-2 text-sm leading-7 text-amber-950">
          A highly sensitive test can still produce many false positives when the
          disease is rare. This is why Bayes' theorem is essential in diagnostic
          reasoning.
        </p>
      </div>
    </div>
  );
}

function ConditionalProbabilityTableLab() {
  const [statsStudents, setStatsStudents] = useState(40);
  const [distinctionStudents, setDistinctionStudents] = useState(25);
  const [bothStudents, setBothStudents] = useState(20);

  const validBoth = Math.min(bothStudents, statsStudents, distinctionStudents);
  const total = 100;

  const pDistGivenStats = validBoth / statsStudents;
  const pStatsGivenDist = validBoth / distinctionStudents;
  const pStats = statsStudents / total;
  const pDist = distinctionStudents / total;
  const pBoth = validBoth / total;

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-black tracking-tight">
        Interactive conditional probability table
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        The same overlap can give different conditional probabilities because
        the denominator changes.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Study statistics</span>
            <span>{statsStudents}</span>
          </div>
          <input
            type="range"
            min="10"
            max="90"
            step="1"
            value={statsStudents}
            onChange={(e) => setStatsStudents(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Receive distinction</span>
            <span>{distinctionStudents}</span>
          </div>
          <input
            type="range"
            min="10"
            max="90"
            step="1"
            value={distinctionStudents}
            onChange={(e) => setDistinctionStudents(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Both</span>
            <span>{validBoth}</span>
          </div>
          <input
            type="range"
            min="1"
            max={Math.min(statsStudents, distinctionStudents)}
            step="1"
            value={validBoth}
            onChange={(e) => setBothStudents(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl bg-slate-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-700">
            P(S)
          </p>
          <p className="mt-2 text-2xl font-black">{pStats.toFixed(2)}</p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-700">
            P(D)
          </p>
          <p className="mt-2 text-2xl font-black">{pDist.toFixed(2)}</p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-700">
            P(S ∩ D)
          </p>
          <p className="mt-2 text-2xl font-black">{pBoth.toFixed(2)}</p>
        </div>

        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
            P(D|S)
          </p>
          <p className="mt-2 text-2xl font-black">
            {pDistGivenStats.toFixed(2)}
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">
            P(S|D)
          </p>
          <p className="mt-2 text-2xl font-black">
            {pStatsGivenDist.toFixed(2)}
          </p>
        </div>
      </div>

      <MathBox>
        P(D|S) = P(D ∩ S) / P(S) = {validBoth}/{statsStudents} ={" "}
        {pDistGivenStats.toFixed(2)}
        <br />
        P(S|D) = P(S ∩ D) / P(D) = {validBoth}/{distinctionStudents} ={" "}
        {pStatsGivenDist.toFixed(2)}
      </MathBox>
    </div>
  );
}

export default function ConditionalProbabilityBayesLessonPage() {
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
              Module 3 · Lesson 3.2
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:text-6xl">
              Conditional Probability and Bayes' Theorem
            </h1>

            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600">
              Learn how probabilities change when information is known. This
              lesson develops conditional probability, independence, the
              multiplication rule, the law of total probability and Bayes'
              theorem with derivations and interpretation.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-700">
              Lesson structure
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Lecture · Notes · Interactive lab · Worked examples · Exercises ·
              Quiz
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
                  Last time we learned sample spaces, events, complements and
                  probability rules. But now I see notation like P(A|B). Why
                  does that vertical line make probability feel harder?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  The vertical line means “given”. P(A|B) is the probability of
                  A given that B has already occurred.
                </DialogueLine>

                <DialogueLine speaker="OL" name="Oliver">
                  So conditional probability is still probability, but with
                  extra information?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Exactly. Conditional probability is probability after the
                  sample space has been restricted by known information.
                </DialogueLine>
              </div>
            </SectionCard>

            <SectionCard title="The big idea: the denominator changes">
              <p className="text-base leading-8 text-slate-700">
                Suppose a class has 100 students. Some study statistics, some
                receive a distinction, and some do both. If we ask, “What is the
                probability that a randomly selected student received a
                distinction?”, the reference group is all 100 students.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-700">
                But if we ask, “What is the probability that a student received
                a distinction given that the student studies statistics?”, the
                reference group is no longer all students. It is only the
                students who study statistics.
              </p>

              <div className="mt-6 rounded-2xl bg-blue-50 p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-800">
                  Core interpretation
                </p>
                <p className="mt-2 text-sm leading-7 text-blue-950">
                  P(A|B) means: among the outcomes where B occurred, what
                  proportion also have A?
                </p>
              </div>

              <MathBox>P(A|B) = P(A ∩ B) / P(B), where P(B) &gt; 0</MathBox>
            </SectionCard>

            <SectionCard title="Why P(A|B) and P(B|A) are different">
              <div className="space-y-4">
                <DialogueLine speaker="JA" name="James">
                  I keep mixing up P(A|B) and P(B|A). They look almost the same.
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  They share the same overlap, but they use different
                  denominators. P(A|B) uses B as the reference group. P(B|A)
                  uses A as the reference group.
                </DialogueLine>
              </div>

              <p className="mt-5 text-base leading-8 text-slate-700">
                Suppose 40 students study statistics, 25 receive a distinction,
                and 20 do both.
              </p>

              <MathBox>
                P(distinction|statistics) = 20 / 40 = 0.50
                <br />
                P(statistics|distinction) = 20 / 25 = 0.80
              </MathBox>

              <p className="text-base leading-8 text-slate-700">
                Same overlap. Different denominator. Different probability.
              </p>
            </SectionCard>

            <SectionCard title="Independence is not the same as mutually exclusive">
              <p className="text-base leading-8 text-slate-700">
                Two events are independent if knowing that one occurred does not
                change the probability of the other.
              </p>

              <MathBox>P(A|B) = P(A)</MathBox>

              <p className="text-base leading-8 text-slate-700">
                Mutually exclusive means two events cannot occur together.
                Independent means one event gives no information about the other.
                These are very different ideas.
              </p>

              <div className="mt-5 rounded-2xl bg-red-50 p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-red-800">
                  Common mistake
                </p>
                <p className="mt-2 text-sm leading-7 text-red-950">
                  If two positive-probability events are mutually exclusive,
                  then they are not independent. If A occurs, B becomes
                  impossible, so the probability of B changes.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="Bayes' theorem: reversing the condition">
              <p className="text-base leading-8 text-slate-700">
                Bayes' theorem helps us reverse conditional probabilities. It is
                especially important when we know P(B|A) but want P(A|B).
              </p>

              <MathBox>P(A|B) = [P(B|A)P(A)] / P(B)</MathBox>

              <p className="text-base leading-8 text-slate-700">
                In medicine, P(+|D) is sensitivity: the probability of a
                positive test given disease. But after a positive test, the
                patient wants P(D|+): the probability of disease given a
                positive result.
              </p>

              <div className="space-y-4">
                <DialogueLine speaker="SO" name="Sophia">
                  So a 95% sensitive test does not automatically mean a positive
                  result gives a 95% chance of disease?
                </DialogueLine>

                <DialogueLine speaker="MR" name="Mr. R" right>
                  Correct. You must also consider disease prevalence and false
                  positives. That is exactly why Bayes' theorem matters.
                </DialogueLine>
              </div>
            </SectionCard>
          </>
        )}

        {activeTab === "notes" && (
          <>
            <SectionCard title="1. Definition of conditional probability">
              <p className="text-base leading-8">
                Let A and B be events in a sample space S. If P(B) &gt; 0, the
                conditional probability of A given B is:
              </p>

              <MathBox>P(A|B) = P(A ∩ B) / P(B)</MathBox>

              <p className="text-base leading-8">
                The denominator P(B) appears because B becomes the new reference
                group. We no longer ask what proportion of all outcomes are in
                A. We ask what proportion of B-outcomes are also in A.
              </p>
            </SectionCard>

            <SectionCard title="2. Deriving the multiplication rule">
              <p className="text-base leading-8">
                Start with the definition of conditional probability:
              </p>

              <MathBox>P(A|B) = P(A ∩ B) / P(B)</MathBox>

              <p className="text-base leading-8">
                Multiply both sides by P(B):
              </p>

              <MathBox>P(A ∩ B) = P(A|B)P(B)</MathBox>

              <p className="text-base leading-8">
                Similarly, using P(B|A):
              </p>

              <MathBox>P(A ∩ B) = P(B|A)P(A)</MathBox>

              <p className="text-base leading-8">
                Therefore:
              </p>

              <MathBox>P(A|B)P(B) = P(B|A)P(A)</MathBox>
            </SectionCard>

            <SectionCard title="3. Independence">
              <p className="text-base leading-8">
                Events A and B are independent if knowing B occurred does not
                change the probability of A.
              </p>

              <MathBox>P(A|B) = P(A)</MathBox>

              <p className="text-base leading-8">
                Substitute this into the multiplication rule:
              </p>

              <MathBox>
                P(A ∩ B) = P(A|B)P(B)
                <br />
                P(A ∩ B) = P(A)P(B)
              </MathBox>

              <p className="text-base leading-8">
                So for independent events:
              </p>

              <MathBox>P(A ∩ B) = P(A)P(B)</MathBox>
            </SectionCard>

            <SectionCard title="4. Law of total probability">
              <p className="text-base leading-8">
                Suppose A and Aᶜ divide the sample space into two non-overlapping
                and exhaustive parts. Any event B can occur through A or through
                Aᶜ.
              </p>

              <MathBox>B = (B ∩ A) ∪ (B ∩ Aᶜ)</MathBox>

              <p className="text-base leading-8">
                Because these two parts do not overlap:
              </p>

              <MathBox>P(B) = P(B ∩ A) + P(B ∩ Aᶜ)</MathBox>

              <p className="text-base leading-8">
                Using the multiplication rule:
              </p>

              <MathBox>
                P(B) = P(B|A)P(A) + P(B|Aᶜ)P(Aᶜ)
              </MathBox>

              <p className="text-base leading-8">
                This is the law of total probability for two cases.
              </p>
            </SectionCard>

            <SectionCard title="5. Derivation of Bayes' theorem">
              <p className="text-base leading-8">
                Start with two expressions for the same intersection:
              </p>

              <MathBox>
                P(A ∩ B) = P(A|B)P(B)
                <br />
                P(A ∩ B) = P(B|A)P(A)
              </MathBox>

              <p className="text-base leading-8">
                Therefore:
              </p>

              <MathBox>P(A|B)P(B) = P(B|A)P(A)</MathBox>

              <p className="text-base leading-8">
                Divide by P(B):
              </p>

              <MathBox>P(A|B) = [P(B|A)P(A)] / P(B)</MathBox>

              <p className="text-base leading-8">
                If B can occur through A or Aᶜ, then:
              </p>

              <MathBox>
                P(A|B) = [P(B|A)P(A)] / [P(B|A)P(A) + P(B|Aᶜ)P(Aᶜ)]
              </MathBox>
            </SectionCard>

            <SectionCard title="6. Diagnostic testing notation">
              <p className="text-base leading-8">
                Let D mean disease and + mean positive test.
              </p>

              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="p-4">Quantity</th>
                      <th className="p-4">Notation</th>
                      <th className="p-4">Meaning</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-4">Prevalence</td>
                      <td className="p-4">P(D)</td>
                      <td className="p-4">Probability of disease before testing</td>
                    </tr>
                    <tr>
                      <td className="p-4">Sensitivity</td>
                      <td className="p-4">P(+|D)</td>
                      <td className="p-4">Probability test is positive if disease is present</td>
                    </tr>
                    <tr>
                      <td className="p-4">Specificity</td>
                      <td className="p-4">P(−|Dᶜ)</td>
                      <td className="p-4">Probability test is negative if disease is absent</td>
                    </tr>
                    <tr>
                      <td className="p-4">False positive rate</td>
                      <td className="p-4">P(+|Dᶜ)</td>
                      <td className="p-4">1 − specificity</td>
                    </tr>
                    <tr>
                      <td className="p-4">Positive predictive value</td>
                      <td className="p-4">P(D|+)</td>
                      <td className="p-4">Probability of disease after positive test</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SectionCard>
          </>
        )}

        {activeTab === "interactive" && (
          <>
            <ConditionalProbabilityTableLab />
            <BayesMedicalLab />
          </>
        )}

        {activeTab === "examples" && (
          <>
            <SectionCard title="Worked example 1: Conditional probability">
              <p className="text-base leading-8">
                In a class of 100 students, 40 study statistics, 25 receive a
                distinction, and 20 both study statistics and receive a
                distinction. Find P(distinction|statistics).
              </p>

              <MathBox>
                P(D|S) = P(D ∩ S) / P(S)
                <br />
                P(D|S) = 20 / 40 = 0.50
              </MathBox>

              <p className="text-base leading-8">
                Among students who study statistics, 50% receive a distinction.
              </p>
            </SectionCard>

            <SectionCard title="Worked example 2: Reversing the condition">
              <p className="text-base leading-8">
                Using the same class, find P(statistics|distinction).
              </p>

              <MathBox>
                P(S|D) = P(S ∩ D) / P(D)
                <br />
                P(S|D) = 20 / 25 = 0.80
              </MathBox>

              <p className="text-base leading-8">
                Among students who received a distinction, 80% study statistics.
                This is not the same as P(distinction|statistics).
              </p>
            </SectionCard>

            <SectionCard title="Worked example 3: Testing independence">
              <p className="text-base leading-8">
                Suppose P(A) = 0.30, P(B) = 0.40 and P(A ∩ B) = 0.12. Are A and
                B independent?
              </p>

              <MathBox>
                P(A)P(B) = 0.30 × 0.40 = 0.12
                <br />
                P(A ∩ B) = 0.12
              </MathBox>

              <p className="text-base leading-8">
                Since P(A ∩ B) = P(A)P(B), the events are independent.
              </p>
            </SectionCard>

            <SectionCard title="Worked example 4: Bayes' theorem in medical testing">
              <p className="text-base leading-8">
                A disease has prevalence 1%. A test has sensitivity 95% and
                specificity 90%. Find the probability of disease given a
                positive test.
              </p>

              <p className="text-base leading-8">
                Let D mean disease and + mean positive test.
              </p>

              <MathBox>
                P(D) = 0.01
                <br />
                P(Dᶜ) = 0.99
                <br />
                P(+|D) = 0.95
                <br />
                P(+|Dᶜ) = 1 − specificity = 0.10
              </MathBox>

              <MathBox>
                P(D|+) = [P(+|D)P(D)] / [P(+|D)P(D) + P(+|Dᶜ)P(Dᶜ)]
                <br />
                P(D|+) = [0.95 × 0.01] / [(0.95 × 0.01) + (0.10 × 0.99)]
                <br />
                P(D|+) = 0.0095 / 0.1085 = 0.0876
              </MathBox>

              <p className="text-base leading-8">
                So the probability of disease after a positive test is about
                8.8%, not 95%. The difference happens because the disease is
                rare and false positives are common relative to true positives.
              </p>
            </SectionCard>
          </>
        )}

        {activeTab === "exercises" && (
          <SectionCard title="Exercises">
            <div className="space-y-5">
              {[
                {
                  title: "Exercise 1",
                  q: "Suppose P(A ∩ B) = 0.18 and P(B) = 0.60. Find P(A|B).",
                  a: "P(A|B) = P(A ∩ B) / P(B) = 0.18 / 0.60 = 0.30.",
                },
                {
                  title: "Exercise 2",
                  q: "Suppose P(A) = 0.50, P(B) = 0.40 and P(A ∩ B) = 0.20. Find P(B|A).",
                  a: "P(B|A) = P(A ∩ B) / P(A) = 0.20 / 0.50 = 0.40.",
                },
                {
                  title: "Exercise 3",
                  q: "If P(A) = 0.30, P(B) = 0.50 and P(A ∩ B) = 0.15, are A and B independent?",
                  a: "P(A)P(B) = 0.30 × 0.50 = 0.15. Since this equals P(A ∩ B), the events are independent.",
                },
                {
                  title: "Exercise 4",
                  q: "Explain why mutually exclusive events with positive probabilities cannot be independent.",
                  a: "If A and B are mutually exclusive, P(A ∩ B) = 0. But if they were independent, P(A ∩ B) = P(A)P(B), which is positive if both probabilities are positive. Contradiction.",
                },
                {
                  title: "Exercise 5",
                  q: "A disease has prevalence 2%, sensitivity 90% and specificity 95%. Write the Bayes formula for P(D|+).",
                  a: "P(D|+) = [0.90 × 0.02] / [(0.90 × 0.02) + (0.05 × 0.98)].",
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
                  You have completed Lesson 3.2. Review the Bayes derivation and
                  the denominator logic if conditional probabilities still feel
                  confusing.
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