"use client";

import LockedLessonGate from "@/components/course/LockedLessonGate";
import { isStatisticsFoundationLessonOpen } from "@/lib/statisticsFoundationAccess";


import { useMemo, useState } from "react";

const tabs = [
  "Learning Route",
  "Lecture",
  "Detailed Notes",
  "Set Visuals",
  "Probability Rules Lab",
  "Worked Examples",
  "Practice Studio",
  "Reflection",
  "Quiz",
];

const learningRoute = [
  {
    time: "0–10 min",
    title: "Outcomes and sample spaces",
    body:
      "Define the possible results of a random situation and organise them into a complete sample space.",
  },
  {
    time: "10–25 min",
    title: "Events as sets",
    body:
      "Understand events as subsets of the sample space and connect probability to set language.",
  },
  {
    time: "25–45 min",
    title: "Complements",
    body:
      "Study what it means for an event not to happen and derive the complement rule.",
  },
  {
    time: "45–65 min",
    title: "Unions and intersections",
    body:
      "Use A ∪ B and A ∩ B to describe 'A or B' and 'A and B' carefully.",
  },
  {
    time: "65–85 min",
    title: "Addition rule",
    body:
      "Derive why P(A ∪ B) = P(A) + P(B) − P(A ∩ B).",
  },
  {
    time: "85–110 min",
    title: "Disjoint and overlapping events",
    body:
      "Separate mutually exclusive events from overlapping events and avoid double counting.",
  },
];

const lectureCards = [
  {
    title: "An outcome is one possible result",
    body:
      "An outcome is a single result from a random process. It cannot be broken down further within the chosen description of the experiment.",
    example:
      "If a die is rolled once, the outcome 4 is one possible result.",
  },
  {
    title: "The sample space is complete",
    body:
      "The sample space contains every outcome that could occur. A probability model is incomplete if the sample space misses possible outcomes.",
    example:
      "For a fair die, S = {1, 2, 3, 4, 5, 6}.",
  },
  {
    title: "An event is a set of outcomes",
    body:
      "An event is any subset of the sample space. It may contain one outcome, several outcomes, all outcomes or no outcomes.",
    example:
      "The event 'even number' is A = {2, 4, 6}.",
  },
  {
    title: "The complement means 'not A'",
    body:
      "The complement Aᶜ contains all outcomes in the sample space that are not in A.",
    example:
      "If A = {2, 4, 6}, then Aᶜ = {1, 3, 5}.",
  },
  {
    title: "The union means 'A or B'",
    body:
      "The union A ∪ B contains outcomes that are in A, in B or in both.",
    example:
      "If A = even and B = greater than 4, then A ∪ B = {2, 4, 5, 6}.",
  },
  {
    title: "The intersection means 'A and B'",
    body:
      "The intersection A ∩ B contains outcomes that are in both A and B at the same time.",
    example:
      "If A = even and B = greater than 4, then A ∩ B = {6}.",
  },
];

const detailedNotes = [
  {
    title: "1. Random experiment, outcome and sample space",
    formula: "S = {all possible outcomes}",
    body:
      "A random experiment is a process whose outcome is uncertain before it occurs. The sample space S is the complete set of possible outcomes. Each individual element of S is called an outcome.",
    derivation:
      "Probability cannot be assigned carefully until the sample space is defined. If S does not contain all possible outcomes, then the probabilities assigned to events may not sum to 1. Therefore the sample space is the foundation of a probability model.",
    example:
      "For one coin toss, S = {H, T}. For two coin tosses, S = {HH, HT, TH, TT}. Notice that HT and TH are different outcomes because the order is different.",
    warning:
      "A common mistake is to describe the sample space too vaguely. For two coin tosses, writing {0 heads, 1 head, 2 heads} is useful for counting heads, but it hides the equally likely ordered outcomes.",
  },
  {
    title: "2. Events as subsets of the sample space",
    formula: "A ⊆ S",
    body:
      "An event A is a subset of the sample space. This means every outcome in A must also belong to S. When the random experiment is performed, event A occurs if the observed outcome is an element of A.",
    derivation:
      "Because events are sets, probability rules are built on set operations. We can combine events, compare events and describe their relationships using subset notation, union, intersection and complement.",
    example:
      "If S = {1, 2, 3, 4, 5, 6}, then A = {2, 4, 6} is the event 'even number'. Since 2, 4 and 6 are all in S, A is a valid event.",
    warning:
      "Do not confuse an event with a single outcome. An event can contain many outcomes.",
  },
  {
    title: "3. Probability of the full sample space",
    formula: "P(S) = 1",
    body:
      "The sample space represents all possible outcomes. Since something in the sample space must occur, the probability of the entire sample space is 1.",
    derivation:
      "If S contains all possible outcomes, then the event S is certain. Probability 1 represents certainty. Therefore P(S) = 1.",
    example:
      "When rolling a die, the probability of rolling one of 1, 2, 3, 4, 5 or 6 is 1.",
    warning:
      "If your listed outcomes do not have total probability 1, the sample space or probability assignments are incomplete.",
  },
  {
    title: "4. The impossible event",
    formula: "P(∅) = 0",
    body:
      "The impossible event is the empty set, written ∅. It contains no outcomes. Since no observed outcome can belong to an empty set, its probability is 0.",
    derivation:
      "The empty event cannot occur because it has no outcomes. Probability 0 represents impossibility, so P(∅) = 0.",
    example:
      "For a six-sided die, the event 'roll a 9' is ∅, so its probability is 0.",
    warning:
      "Probability 0 means impossible in a simple finite model. Later in continuous probability, probability 0 can have a more subtle meaning.",
  },
  {
    title: "5. Complement rule",
    formula: "P(Aᶜ) = 1 − P(A)",
    body:
      "The complement Aᶜ is the event that A does not occur. A and Aᶜ together cover the whole sample space and cannot happen at the same time.",
    derivation:
      "A ∪ Aᶜ = S and A ∩ Aᶜ = ∅. Since A and Aᶜ are disjoint, P(A ∪ Aᶜ) = P(A) + P(Aᶜ). But A ∪ Aᶜ = S, so 1 = P(A) + P(Aᶜ). Therefore P(Aᶜ) = 1 − P(A).",
    example:
      "If P(rain) = 0.35, then P(no rain) = 1 − 0.35 = 0.65.",
    warning:
      "The complement is everything outside A, not just one alternative. If A means 'score above 70', Aᶜ means 'score 70 or below'.",
  },
  {
    title: "6. Union of two events",
    formula: "A ∪ B",
    body:
      "The union A ∪ B means that A occurs, B occurs or both occur. In ordinary language, union corresponds to inclusive 'or'.",
    derivation:
      "An outcome belongs to A ∪ B if it belongs to at least one of the two sets. Therefore A ∪ B contains all outcomes in A, all outcomes in B and all outcomes shared by A and B.",
    example:
      "For a die, let A = {2, 4, 6} and B = {5, 6}. Then A ∪ B = {2, 4, 5, 6}.",
    warning:
      "In probability, 'or' usually means inclusive or. It includes the possibility that both events happen.",
  },
  {
    title: "7. Intersection of two events",
    formula: "A ∩ B",
    body:
      "The intersection A ∩ B means that both A and B occur. It contains only the outcomes shared by A and B.",
    derivation:
      "An outcome belongs to A ∩ B if it satisfies the condition for A and the condition for B simultaneously.",
    example:
      "For a die, let A = {2, 4, 6} and B = {5, 6}. Then A ∩ B = {6}.",
    warning:
      "The word 'and' makes probability more restrictive. A ∩ B is usually smaller than A or B individually.",
  },
  {
    title: "8. Addition rule for two events",
    formula: "P(A ∪ B) = P(A) + P(B) − P(A ∩ B)",
    body:
      "When calculating the probability of A or B, adding P(A) and P(B) counts the overlap twice. The intersection must be subtracted once.",
    derivation:
      "The set A can be split into A only and A ∩ B. The set B can be split into B only and A ∩ B. Adding P(A) + P(B) includes P(A ∩ B) twice. But the union should include the overlap only once. Therefore P(A ∪ B) = P(A) + P(B) − P(A ∩ B).",
    example:
      "If P(A) = 0.5, P(B) = 0.4 and P(A ∩ B) = 0.2, then P(A ∪ B) = 0.5 + 0.4 − 0.2 = 0.7.",
    warning:
      "The most common mistake is forgetting to subtract the overlap.",
  },
  {
    title: "9. Disjoint events",
    formula: "A ∩ B = ∅",
    body:
      "Two events are disjoint, or mutually exclusive, if they cannot occur at the same time. Their intersection is empty.",
    derivation:
      "If A and B are disjoint, then P(A ∩ B) = 0. Substituting this into the general addition rule gives P(A ∪ B) = P(A) + P(B).",
    example:
      "For one die roll, A = {1} and B = {6} are disjoint. A single die roll cannot be both 1 and 6.",
    warning:
      "Disjoint does not mean independent. Independence is a different concept introduced later.",
  },
  {
    title: "10. Exhaustive events",
    formula: "A₁ ∪ A₂ ∪ ... ∪ Aₖ = S",
    body:
      "A collection of events is exhaustive if together they cover the whole sample space. At least one of the events must occur.",
    derivation:
      "If events cover S, then the probability of their union is P(S) = 1. If they are also disjoint, their individual probabilities add to 1.",
    example:
      "For a die, the events odd = {1, 3, 5} and even = {2, 4, 6} are exhaustive and disjoint.",
    warning:
      "Events can be exhaustive without being disjoint if they overlap. Always check both properties separately.",
  },
];

const workedExamples = [
  {
    title: "Die roll: union and intersection",
    question:
      "A fair die is rolled. Let A be the event 'even number' and B be the event 'number greater than 4'. Find A, B, A ∪ B, A ∩ B and their probabilities.",
    working:
      "The sample space is S = {1, 2, 3, 4, 5, 6}. A = {2, 4, 6}. B = {5, 6}. The union is A ∪ B = {2, 4, 5, 6}. The intersection is A ∩ B = {6}. Since the die is fair, P(A) = 3/6, P(B) = 2/6, P(A ∪ B) = 4/6 and P(A ∩ B) = 1/6.",
    answer:
      "A ∪ B = {2, 4, 5, 6}; A ∩ B = {6}; P(A ∪ B) = 4/6; P(A ∩ B) = 1/6.",
    deeper:
      "Using the addition rule: P(A ∪ B) = P(A) + P(B) − P(A ∩ B) = 3/6 + 2/6 − 1/6 = 4/6.",
  },
  {
    title: "Complement of a medical risk flag",
    question:
      "In a screening dataset, 18% of patients are flagged as high risk. What is the probability that a randomly selected patient is not flagged as high risk?",
    working:
      "Let A be the event 'patient is high-risk flagged'. Then P(A) = 0.18. The event 'not high-risk flagged' is Aᶜ. Therefore P(Aᶜ) = 1 − P(A) = 1 − 0.18 = 0.82.",
    answer:
      "The probability is 0.82, or 82%.",
    deeper:
      "This works because every patient is either flagged or not flagged. These two events are disjoint and exhaustive.",
  },
  {
    title: "Overlapping student categories",
    question:
      "In a class, 60% of students study statistics, 45% study programming and 25% study both. What percentage study statistics or programming?",
    working:
      "Let A = studies statistics and B = studies programming. We need P(A ∪ B). Use the addition rule: P(A ∪ B) = P(A) + P(B) − P(A ∩ B) = 0.60 + 0.45 − 0.25 = 0.80.",
    answer:
      "80% study statistics or programming.",
    deeper:
      "If we simply added 60% and 45%, we would get 105%, which is impossible. The 25% studying both would have been counted twice.",
  },
  {
    title: "Disjoint exam outcomes",
    question:
      "A student's grade can be Fail, Pass, Merit or Distinction. Why are these events disjoint for a single final grade?",
    working:
      "For one final grade, the student cannot simultaneously receive Fail and Distinction, or Pass and Merit. Each grade category excludes the others.",
    answer:
      "The grade categories are disjoint because only one can occur for a single final grade.",
    deeper:
      "If the categories also cover every possible grade outcome, then they are both disjoint and exhaustive.",
  },
];

const practiceQuestions = [
  {
    prompt:
      "For S = {1, 2, 3, 4, 5, 6}, let A = {1, 3, 5} and B = {4, 5, 6}. Find A ∪ B and A ∩ B.",
    answer:
      "A ∪ B = {1, 3, 4, 5, 6}. A ∩ B = {5}.",
  },
  {
    prompt:
      "If P(A) = 0.72, find P(Aᶜ).",
    answer:
      "P(Aᶜ) = 1 − P(A) = 1 − 0.72 = 0.28.",
  },
  {
    prompt:
      "If P(A) = 0.40, P(B) = 0.50 and P(A ∩ B) = 0.15, find P(A ∪ B).",
    answer:
      "P(A ∪ B) = 0.40 + 0.50 − 0.15 = 0.75.",
  },
  {
    prompt:
      "Two events are disjoint. P(A) = 0.30 and P(B) = 0.25. Find P(A ∪ B).",
    answer:
      "Since the events are disjoint, P(A ∩ B) = 0. Therefore P(A ∪ B) = 0.30 + 0.25 = 0.55.",
  },
  {
    prompt:
      "Explain why forgetting to subtract P(A ∩ B) can produce an impossible probability.",
    answer:
      "If A and B overlap, adding P(A) and P(B) counts the overlap twice. This can make the total probability too large, sometimes greater than 1.",
  },
];

const quizQuestions = [
  {
    question: "What is a sample space?",
    options: [
      "The set of all possible outcomes.",
      "Only the most likely outcome.",
      "The probability of an event.",
      "The complement of an event.",
    ],
    answer: 0,
    feedback:
      "The sample space is the complete set of possible outcomes.",
  },
  {
    question: "What does A ⊆ S mean?",
    options: [
      "A is not an event.",
      "A is a subset of the sample space.",
      "A and S are disjoint.",
      "A has probability greater than 1.",
    ],
    answer: 1,
    feedback:
      "A ⊆ S means every outcome in A is also in the sample space S.",
  },
  {
    question: "What does A ∪ B mean?",
    options: [
      "A and B both occur only.",
      "Neither A nor B occurs.",
      "A occurs, B occurs or both occur.",
      "A occurs but B cannot occur.",
    ],
    answer: 2,
    feedback:
      "A ∪ B is the union: A or B or both.",
  },
  {
    question: "What does A ∩ B mean?",
    options: [
      "A and B both occur.",
      "A or B occurs.",
      "A does not occur.",
      "The full sample space.",
    ],
    answer: 0,
    feedback:
      "A ∩ B is the intersection: outcomes common to both A and B.",
  },
  {
    question:
      "Which formula is the general addition rule for two events?",
    options: [
      "P(A ∪ B) = P(A) + P(B)",
      "P(A ∪ B) = P(A) + P(B) − P(A ∩ B)",
      "P(A ∩ B) = P(A) + P(B)",
      "P(Aᶜ) = P(A) − 1",
    ],
    answer: 1,
    feedback:
      "The general addition rule subtracts the overlap to avoid double counting.",
  },
  {
    question:
      "If A and B are disjoint, what is A ∩ B?",
    options: ["S", "A ∪ B", "∅", "Aᶜ"],
    answer: 2,
    feedback:
      "Disjoint events have no outcomes in common, so A ∩ B = ∅.",
  },
  {
    question:
      "If P(A) = 0.6, P(B) = 0.5 and P(A ∩ B) = 0.2, what is P(A ∪ B)?",
    options: ["0.3", "0.7", "0.9", "1.3"],
    answer: 2,
    feedback:
      "P(A ∪ B) = 0.6 + 0.5 − 0.2 = 0.9.",
  },
];

export default function EventsSampleSpacesProbabilityRulesLesson() {
  const lessonCode = "3.2";

  if (!isStatisticsFoundationLessonOpen(lessonCode)) {
    return (
      <LockedLessonGate
        lessonCode={lessonCode}
        lessonTitle="Events, sample spaces and probability rules"
        moduleTitle="Module 3: Probability Foundations"
      />
    );
  }

  const [activeTab, setActiveTab] = useState("Learning Route");
  const [visualMode, setVisualMode] = useState<"union" | "intersection" | "complement">("union");
  const [pA, setPA] = useState(55);
  const [pB, setPB] = useState(45);
  const [overlap, setOverlap] = useState(20);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedPractice, setSelectedPractice] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const validOverlap = Math.min(overlap, pA, pB);
  const union = pA + pB - validOverlap;
  const outside = 100 - union;

  const twoTossSpace = useMemo(
    () => [
      { outcome: "HH", heads: 2, eventA: true, eventB: false },
      { outcome: "HT", heads: 1, eventA: false, eventB: true },
      { outcome: "TH", heads: 1, eventA: false, eventB: true },
      { outcome: "TT", heads: 0, eventA: false, eventB: false },
    ],
    [],
  );

  const activeExample = workedExamples[selectedExample];
  const activePractice = practiceQuestions[selectedPractice];

  const score = quizQuestions.reduce((total, question, index) => {
    return selectedAnswers[index] === question.answer ? total + 1 : total;
  }, 0);

  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-8 text-neutral-950 md:px-8 md:py-14">
      <section className="mx-auto max-w-7xl">
        <a
          href="/courses/statistics-foundation/modules/probability-and-uncertainty/"
          className="text-sm font-black text-[#8b1116] hover:text-[#5f0b0f]"
        >
          ← Back to module
        </a>

        <section className="mt-8 overflow-hidden rounded-[2.5rem] border border-neutral-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 md:p-10">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Statistics Foundation · Lesson 3.2
              </p>

              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-7xl">
                Events, sample spaces and probability rules.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                This lesson develops the formal language of probability.
                Students learn how outcomes form sample spaces, how events work
                as sets, and how complements, unions, intersections and
                probability rules allow us to reason carefully about chance.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "110 minutes",
                  "No coding",
                  "Set notation",
                  "Venn diagrams",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-neutral-200 bg-[#f7f4ee] p-4 text-sm font-black text-neutral-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <aside className="border-t border-neutral-200 bg-neutral-950 p-6 text-white md:p-10 lg:border-l lg:border-t-0">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Lesson focus
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Probability becomes clearer when events are treated as sets.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "S = sample space",
                  "A ⊆ S = event",
                  "Aᶜ = not A",
                  "A ∪ B = A or B",
                  "A ∩ B = A and B",
                  "P(A ∪ B) = P(A) + P(B) − P(A ∩ B)",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-4 text-sm font-black text-white/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <nav className="sticky top-[74px] z-30 mt-8 flex gap-2 overflow-x-auto rounded-full border border-neutral-200 bg-white/90 p-2 shadow-sm backdrop-blur">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-black transition ${
                activeTab === tab
                  ? "bg-neutral-950 text-white"
                  : "text-neutral-600 hover:bg-[#f7f4ee] hover:text-neutral-950"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {activeTab === "Learning Route" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Lesson route
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Move from possible outcomes to formal probability rules.
              </h2>

              <p className="mt-5 text-base leading-8 text-neutral-700">
                This lesson is a bridge between intuitive probability and
                conditional reasoning. Before students can understand
                conditional probability, they must understand events, overlap,
                non-overlap, complements and unions.
              </p>

              <div className="mt-6 grid gap-3">
                {learningRoute.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
                      {item.time}
                    </p>
                    <h3 className="mt-2 text-xl font-black tracking-[-0.035em]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-neutral-700">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Mastery checklist
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Students should be able to reason with events as mathematical objects.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Define outcome, sample space and event.",
                  "Represent events using set notation.",
                  "Explain why P(S) = 1 and P(∅) = 0.",
                  "Use complements to calculate missing probabilities.",
                  "Distinguish union from intersection.",
                  "Use the general addition rule correctly.",
                  "Identify disjoint events.",
                  "Avoid double counting overlapping events.",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-4"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-neutral-950">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-7 text-white/75">{item}</p>
                  </div>
                ))}
              </div>
            </section>
          </section>
        )}

        {activeTab === "Lecture" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Concept lecture
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Probability rules are set rules with numbers attached.
              </h2>

              <p className="mt-5 text-base leading-8 text-neutral-700">
                When students first meet probability, they often focus only on
                formulae. A better approach is to see each probability formula
                as a statement about regions inside a sample space.
              </p>

              <div className="mt-6 grid gap-4">
                {lectureCards.map((item, index) => (
                  <article
                    key={item.title}
                    className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-sm font-black text-white">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-xl font-black tracking-[-0.035em]">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-neutral-700">
                          {item.body}
                        </p>
                        <p className="mt-3 rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-7 text-neutral-700">
                          Example: {item.example}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Classroom dialogue
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Mr. R connects probability to regions and overlap.
              </h2>

              <div className="mt-6 grid gap-4">
                <Dialogue
                  speaker="Mr. R"
                  text="Last lesson, we said probability measures uncertainty. Today we ask: uncertainty about what exactly?"
                />
                <Dialogue
                  speaker="Amelia"
                  text="About an outcome?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Correct. But often we are not interested in just one outcome. We are interested in a group of outcomes. That group is called an event."
                />
                <Dialogue
                  speaker="Ben"
                  text="So an event is like 'rolling an even number' rather than just rolling a 2?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Exactly. 'Rolling an even number' contains 2, 4 and 6. That is why events are sets."
                />
                <Dialogue
                  speaker="Chloe"
                  text="Why do we need union and intersection?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Because real statistical questions often combine events. We ask whether A or B occurs, whether A and B occur together, or whether A does not occur."
                />
                <Dialogue
                  speaker="Daniel"
                  text="Why do we subtract the intersection in the addition rule?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Because the overlap gets counted twice when we add P(A) and P(B). The subtraction corrects the double counting."
                />
              </div>

              <div className="mt-8 rounded-[2rem] border border-[#8b1116]/20 bg-[#fff7f7] p-6">
                <h3 className="text-2xl font-black tracking-[-0.04em] text-[#8b1116]">
                  Lecture takeaway
                </h3>
                <p className="mt-3 text-sm leading-7 text-neutral-700">
                  Probability rules are not arbitrary formulae. They come from
                  how event regions are arranged inside the sample space.
                </p>
              </div>
            </section>
          </section>
        )}

        {activeTab === "Detailed Notes" && (
          <section className="mt-8 grid gap-6">
            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Detailed theoretical notes
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Events are sets; probability measures their size in uncertainty.
              </h2>

              <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-700">
                These notes build the formal foundation needed for conditional
                probability, independence and Bayes' theorem. Every rule is
                explained through set logic, derivation and interpretation.
              </p>
            </section>

            <div className="grid gap-5">
              {detailedNotes.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
                    {item.formula}
                  </p>
                  <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-700">
                    {item.body}
                  </p>

                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl bg-[#f7f4ee] p-4">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-neutral-500">
                        Derivation
                      </p>
                      <p className="mt-2 text-sm leading-7 text-neutral-700">
                        {item.derivation}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#8b1116]/20 bg-[#fff7f7] p-4">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
                        Example
                      </p>
                      <p className="mt-2 text-sm leading-7 text-neutral-700">
                        {item.example}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-neutral-950 p-4 text-white">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">
                        Common mistake
                      </p>
                      <p className="mt-2 text-sm leading-7 text-white/75">
                        {item.warning}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Set Visuals" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Venn diagram controls
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                Choose the event operation.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                The same two events can create different probability questions.
                Select union, intersection or complement and observe how the
                shaded region changes.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  {
                    key: "union",
                    label: "Union: A ∪ B",
                    detail: "A or B or both",
                  },
                  {
                    key: "intersection",
                    label: "Intersection: A ∩ B",
                    detail: "Both A and B",
                  },
                  {
                    key: "complement",
                    label: "Complement: Aᶜ",
                    detail: "Not A",
                  },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() =>
                      setVisualMode(item.key as "union" | "intersection" | "complement")
                    }
                    className={`rounded-[1.25rem] border p-4 text-left transition ${
                      visualMode === item.key
                        ? "border-neutral-950 bg-neutral-950 text-white"
                        : "border-neutral-200 bg-[#f7f4ee] text-neutral-700 hover:bg-white"
                    }`}
                  >
                    <p className="text-sm font-black">{item.label}</p>
                    <p className="mt-1 text-xs font-bold opacity-70">
                      {item.detail}
                    </p>
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Visual interpretation
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                {visualMode === "union" && "A ∪ B shades everything in A or B."}
                {visualMode === "intersection" && "A ∩ B shades only the overlap."}
                {visualMode === "complement" && "Aᶜ shades everything outside A."}
              </h2>

              <div className="mt-6 rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5">
                <VennDiagram mode={visualMode} />
              </div>

              <div className="mt-6 rounded-[1.5rem] bg-neutral-950 p-5 text-white">
                <p className="text-sm leading-7 text-white/75">
                  {visualMode === "union" &&
                    "Union is inclusive. If an outcome belongs to A, B or both, it belongs to A ∪ B."}
                  {visualMode === "intersection" &&
                    "Intersection is stricter. An outcome must satisfy both event conditions to belong to A ∩ B."}
                  {visualMode === "complement" &&
                    "The complement depends on the sample space. Aᶜ means all outcomes in S that are not in A."}
                </p>
              </div>
            </section>
          </section>
        )}

        {activeTab === "Probability Rules Lab" && (
          <section className="mt-8 grid gap-6">
            <section className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
              <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                <div className="p-6 md:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                    Addition rule lab
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    See why the overlap must be subtracted.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-neutral-700">
                    Adjust P(A), P(B) and P(A ∩ B). The union probability is
                    calculated using the general addition rule.
                  </p>

                  <div className="mt-6 grid gap-5">
                    <Slider label="P(A)" value={pA} min={0} max={100} suffix="%" onChange={setPA} />
                    <Slider label="P(B)" value={pB} min={0} max={100} suffix="%" onChange={setPB} />
                    <Slider
                      label="P(A ∩ B)"
                      value={validOverlap}
                      min={0}
                      max={Math.min(pA, pB)}
                      suffix="%"
                      onChange={setOverlap}
                    />
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <Metric label="P(A)" value={(pA / 100).toFixed(2)} />
                    <Metric label="P(B)" value={(pB / 100).toFixed(2)} />
                    <Metric label="P(A ∩ B)" value={(validOverlap / 100).toFixed(2)} />
                  </div>
                </div>

                <div className="border-t border-neutral-200 bg-neutral-950 p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                    Rule output
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    P(A ∪ B) = {(union / 100).toFixed(2)}
                  </h2>

                  <div className="mt-8 grid gap-3">
                    <SplitBar label="A only / overlap / B only combined" value={union} />
                    <SplitBar label="Outside A ∪ B" value={outside} />
                  </div>

                  <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5">
                    <p className="text-sm font-black text-white">
                      P(A ∪ B) = P(A) + P(B) − P(A ∩ B)
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/75">
                      = {(pA / 100).toFixed(2)} + {(pB / 100).toFixed(2)} −{" "}
                      {(validOverlap / 100).toFixed(2)} = {(union / 100).toFixed(2)}
                    </p>
                  </div>

                  {union > 100 && (
                    <p className="mt-4 rounded-[1.5rem] bg-white p-4 text-sm font-bold leading-7 text-[#8b1116]">
                      This combination is not valid because the union is greater
                      than 1. In a real probability model, P(A ∪ B) cannot exceed 1.
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Ordered sample space
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                Two coin tosses: why the sample space matters.
              </h2>

              <p className="mt-4 max-w-4xl text-sm leading-7 text-neutral-700">
                For two coin tosses, the ordered sample space is S = {"{HH, HT, TH, TT}"}.
                This is important because each ordered outcome is equally likely
                for fair coins.
              </p>

              <div className="mt-6 grid gap-3 md:grid-cols-4">
                {twoTossSpace.map((item) => (
                  <div
                    key={item.outcome}
                    className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5 text-center"
                  >
                    <p className="text-3xl font-black tracking-[-0.05em]">
                      {item.outcome}
                    </p>
                    <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-neutral-500">
                      {item.heads} heads
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[1.5rem] bg-neutral-950 p-5 text-white">
                <p className="text-sm leading-7 text-white/75">
                  If A = “exactly one head”, then A = {"{HT, TH}"}. Therefore
                  P(A) = 2/4 = 0.5. If we incorrectly used {"{0 heads, 1 head, 2 heads}"}
                  as equally likely outcomes, we would mistakenly get 1/3.
                </p>
              </div>
            </section>
          </section>
        )}

        {activeTab === "Worked Examples" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Worked examples
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                Follow the event logic step by step.
              </h2>

              <div className="mt-6 grid gap-3">
                {workedExamples.map((example, index) => (
                  <button
                    key={example.title}
                    type="button"
                    onClick={() => setSelectedExample(index)}
                    className={`rounded-[1.25rem] border p-4 text-left transition ${
                      selectedExample === index
                        ? "border-neutral-950 bg-neutral-950 text-white"
                        : "border-neutral-200 bg-[#f7f4ee] text-neutral-800 hover:bg-white"
                    }`}
                  >
                    <p className="text-sm font-black">{example.title}</p>
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                {activeExample.title}
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                {activeExample.question}
              </h2>

              <div className="mt-6 grid gap-4">
                <InfoBlock title="Working" body={activeExample.working} />
                <InfoBlock title="Answer" body={activeExample.answer} dark />
                <InfoBlock title="Deeper reasoning" body={activeExample.deeper} warning />
              </div>
            </section>
          </section>
        )}

        {activeTab === "Practice Studio" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Practice studio
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                Practise set notation and probability rules.
              </h2>

              <div className="mt-6 grid gap-3">
                {practiceQuestions.map((item, index) => (
                  <button
                    key={item.prompt}
                    type="button"
                    onClick={() => setSelectedPractice(index)}
                    className={`rounded-[1.25rem] border p-4 text-left transition ${
                      selectedPractice === index
                        ? "border-neutral-950 bg-neutral-950 text-white"
                        : "border-neutral-200 bg-[#f7f4ee] text-neutral-800 hover:bg-white"
                    }`}
                  >
                    <p className="text-sm font-black">Question {index + 1}</p>
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Question {selectedPractice + 1}
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                {activePractice.prompt}
              </h2>

              <div className="mt-6 rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-neutral-500">
                  Suggested answer
                </p>
                <p className="mt-3 text-base leading-8 text-neutral-700">
                  {activePractice.answer}
                </p>
              </div>
            </section>
          </section>
        )}

        {activeTab === "Reflection" && (
          <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Reflection
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Most probability mistakes are really event-definition mistakes.
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "Was the sample space complete?",
                  body:
                    "Before calculating probability, check whether every possible outcome is represented.",
                },
                {
                  title: "Are the outcomes equally likely?",
                  body:
                    "Counting outcomes only works directly when the outcomes being counted have equal probability.",
                },
                {
                  title: "Are the events overlapping?",
                  body:
                    "If two events overlap, the addition rule must subtract the intersection.",
                },
                {
                  title: "Is 'or' inclusive?",
                  body:
                    "In probability, A or B usually means A, B or both. That is why union includes the overlap.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
                >
                  <h3 className="text-xl font-black tracking-[-0.035em]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-700">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Quiz" && (
          <section className="mt-8 grid gap-6">
            <section className="rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Lesson quiz
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Score: {score}/{quizQuestions.length}
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70">
                Check your understanding of sample spaces, event notation,
                complements, unions, intersections and addition rules.
              </p>
            </section>

            <div className="grid gap-5">
              {quizQuestions.map((question, index) => {
                const selected = selectedAnswers[index];

                return (
                  <article
                    key={question.question}
                    className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
                  >
                    <h3 className="text-xl font-black tracking-[-0.035em]">
                      {index + 1}. {question.question}
                    </h3>

                    <div className="mt-5 grid gap-3">
                      {question.options.map((option, optionIndex) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            setSelectedAnswers((current) => ({
                              ...current,
                              [index]: optionIndex,
                            }))
                          }
                          className={`rounded-[1.25rem] border px-4 py-3 text-left text-sm font-bold transition ${
                            selected === optionIndex
                              ? optionIndex === question.answer
                                ? "border-green-700 bg-green-50 text-green-900"
                                : "border-[#8b1116] bg-[#fff7f7] text-[#8b1116]"
                              : "border-neutral-200 bg-[#f7f4ee] text-neutral-700 hover:bg-white"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>

                    {selected !== undefined && (
                      <p className="mt-4 rounded-2xl bg-neutral-950 px-4 py-3 text-sm font-bold leading-7 text-white">
                        {question.feedback}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

function Dialogue({ speaker, text }: { speaker: string; text: string }) {
  return (
    <div className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[#8b1116]">
        {speaker}
      </p>
      <p className="mt-2 text-sm leading-7 text-neutral-700">{text}</p>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  suffix = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-black text-neutral-700">{label}</span>
        <span className="rounded-full bg-neutral-950 px-3 py-1 text-xs font-black text-white">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 w-full accent-[#8b1116]"
      />
    </label>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-neutral-200 bg-[#f7f4ee] p-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-neutral-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-black tracking-[-0.04em]">{value}</p>
    </div>
  );
}

function InfoBlock({
  title,
  body,
  dark = false,
  warning = false,
}: {
  title: string;
  body: string;
  dark?: boolean;
  warning?: boolean;
}) {
  return (
    <div
      className={`rounded-[1.5rem] p-5 ${
        dark
          ? "bg-neutral-950 text-white"
          : warning
            ? "border border-[#8b1116]/20 bg-[#fff7f7] text-[#8b1116]"
            : "border border-neutral-200 bg-[#f7f4ee] text-neutral-700"
      }`}
    >
      <p
        className={`text-xs font-black uppercase tracking-[0.18em] ${
          dark ? "text-white/45" : warning ? "text-[#8b1116]" : "text-neutral-500"
        }`}
      >
        {title}
      </p>
      <p className={`mt-3 text-sm font-bold leading-7 ${dark ? "text-white/75" : ""}`}>
        {body}
      </p>
    </div>
  );
}

function VennDiagram({
  mode,
}: {
  mode: "union" | "intersection" | "complement";
}) {
  return (
    <svg viewBox="0 0 520 320" className="h-auto w-full">
      <rect
        x="20"
        y="20"
        width="480"
        height="260"
        rx="28"
        fill="#ffffff"
        stroke="#d4d4d4"
        strokeWidth="2"
      />

      {mode === "complement" && (
        <path
          d="M20 48 Q20 20 48 20 H472 Q500 20 500 48 V252 Q500 280 472 280 H48 Q20 280 20 252 Z"
          fill="#8b1116"
          opacity="0.13"
        />
      )}

      <circle
        cx="220"
        cy="150"
        r="85"
        fill={mode === "union" || mode === "complement" ? "#8b1116" : "#ffffff"}
        opacity={mode === "union" ? "0.28" : mode === "complement" ? "1" : "0.92"}
        stroke="#8b1116"
        strokeWidth="4"
      />

      <circle
        cx="305"
        cy="150"
        r="85"
        fill={mode === "union" ? "#8b1116" : "#ffffff"}
        opacity={mode === "union" ? "0.28" : "0.92"}
        stroke="#111111"
        strokeWidth="4"
      />

      {mode === "intersection" && (
        <path
          d="M262.5 76.4
             A85 85 0 0 1 262.5 223.6
             A85 85 0 0 1 262.5 76.4"
          fill="#8b1116"
          opacity="0.35"
        />
      )}

      {mode === "complement" && (
        <circle
          cx="220"
          cy="150"
          r="85"
          fill="#ffffff"
          stroke="#8b1116"
          strokeWidth="4"
        />
      )}

      <text x="42" y="54" fontSize="18" fontWeight="900" fill="#111111">
        S
      </text>
      <text x="196" y="154" fontSize="26" fontWeight="900" fill="#8b1116">
        A
      </text>
      <text x="326" y="154" fontSize="26" fontWeight="900" fill="#111111">
        B
      </text>

      <text x="40" y="304" fontSize="16" fontWeight="800" fill="#525252">
        {mode === "union" && "Shaded region: A ∪ B"}
        {mode === "intersection" && "Shaded region: A ∩ B"}
        {mode === "complement" && "Shaded region: Aᶜ"}
      </text>
    </svg>
  );
}

function SplitBar({ label, value }: { label: string; value: number }) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm font-black">
        <span>{label}</span>
        <span>{safeValue.toFixed(0)}%</span>
      </div>
      <div className="h-4 overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-white"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
