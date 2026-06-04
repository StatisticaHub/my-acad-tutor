"use client";

import LockedLessonGate from "@/components/course/LockedLessonGate";
import { isStatisticsFoundationLessonOpen } from "@/lib/statisticsFoundationAccess";


import { useMemo, useState } from "react";

const tabs = [
  "Learning Route",
  "Lecture",
  "Detailed Notes",
  "Independence Lab",
  "Table Explorer",
  "Tree Diagram",
  "Worked Examples",
  "Practice Studio",
  "Reflection",
  "Quiz",
];

const learningRoute = [
  {
    time: "0–10 min",
    title: "What dependence means",
    body:
      "Understand that events are dependent when knowing one event changes the probability of another.",
  },
  {
    time: "10–25 min",
    title: "Conditional probability connection",
    body:
      "Use P(A | B) to decide whether event B changes the probability of event A.",
  },
  {
    time: "25–45 min",
    title: "Definition of independence",
    body:
      "Learn that A and B are independent when P(A | B) = P(A), provided P(B) > 0.",
  },
  {
    time: "45–65 min",
    title: "Multiplication rule",
    body:
      "Derive P(A ∩ B) = P(A)P(B) for independent events.",
  },
  {
    time: "65–90 min",
    title: "Tables and visual checks",
    body:
      "Use two-way tables, Venn diagrams and conditional proportions to detect dependence.",
  },
  {
    time: "90–115 min",
    title: "Common misconceptions",
    body:
      "Distinguish independence from disjointness, causation and unrelated-looking events.",
  },
];

const lectureCards = [
  {
    title: "Dependence means probability changes",
    body:
      "Two events are dependent if knowing that one occurred changes the probability of the other.",
    example:
      "The probability of passing an exam may change if we know the student attended revision sessions.",
  },
  {
    title: "Independence means probability does not change",
    body:
      "Events A and B are independent if knowing B occurred does not change the probability of A.",
    example:
      "For two fair coin tosses, the result of the first toss does not change the probability of heads on the second toss.",
  },
  {
    title: "Conditional probability is the test",
    body:
      "To check independence, compare P(A | B) with P(A). If they are equal, B gives no probability information about A.",
    example:
      "If P(A) = 0.40 and P(A | B) = 0.40, then A and B are independent.",
  },
  {
    title: "The multiplication rule follows from independence",
    body:
      "When A and B are independent, the joint probability equals the product of their separate probabilities.",
    example:
      "If P(A) = 0.5 and P(B) = 0.2, then P(A ∩ B) = 0.1 when independent.",
  },
  {
    title: "Disjoint is not the same as independent",
    body:
      "Disjoint events cannot happen together. Independent events do not change each other's probabilities. These are different ideas.",
    example:
      "For one die roll, rolling 1 and rolling 6 are disjoint, but not independent.",
  },
  {
    title: "Dependence does not automatically mean causation",
    body:
      "If two events are dependent, one may be associated with the other, but this does not prove that one causes the other.",
    example:
      "Umbrella use and rain are dependent, but umbrellas do not cause rain.",
  },
];

const detailedNotes = [
  {
    title: "1. Dependence as changed probability",
    formula: "P(A | B) ≠ P(A)",
    body:
      "Events A and B are dependent when knowing that B has occurred changes the probability of A. This means the probability of A in the restricted sample space B differs from the probability of A in the full sample space.",
    derivation:
      "Before knowing B, the probability of A is P(A). After knowing B, the relevant probability becomes P(A | B). If these two values differ, then B has changed the probability assessment of A.",
    example:
      "If P(pass) = 0.65 but P(pass | attended revision) = 0.85, then passing and attending revision are dependent.",
    warning:
      "Dependence means a probability relationship exists. It does not by itself prove a causal effect.",
  },
  {
    title: "2. Independence as unchanged probability",
    formula: "P(A | B) = P(A), provided P(B) > 0",
    body:
      "Events A and B are independent when knowing that B occurred does not change the probability of A.",
    derivation:
      "Conditional probability compares the probability of A inside B with the probability of A overall. If the restricted probability equals the overall probability, the condition B provides no probability information about A.",
    example:
      "If P(head on second toss) = 0.5 and P(head on second toss | first toss was head) = 0.5, the two toss events are independent.",
    warning:
      "Independence does not mean the events cannot happen together. Independent events can overlap.",
  },
  {
    title: "3. Symmetry of independence",
    formula: "If P(A | B) = P(A), then P(B | A) = P(B), when probabilities are positive",
    body:
      "Although conditional probabilities usually reverse differently, independence is symmetric. If B does not change the probability of A, then A does not change the probability of B.",
    derivation:
      "If P(A | B) = P(A), then P(A ∩ B)/P(B) = P(A). Multiplying by P(B) gives P(A ∩ B) = P(A)P(B). Dividing both sides by P(A), assuming P(A) > 0, gives P(B | A) = P(B).",
    example:
      "If smoking status and eye colour were independent in a dataset, knowing smoking status would not change eye-colour probability and knowing eye colour would not change smoking probability.",
    warning:
      "This symmetry holds for independence, not for arbitrary conditional probabilities.",
  },
  {
    title: "4. Multiplication rule for independent events",
    formula: "P(A ∩ B) = P(A)P(B)",
    body:
      "For independent events, the probability that both events occur is the product of their individual probabilities.",
    derivation:
      "Start from the general multiplication rule: P(A ∩ B) = P(A | B)P(B). If A and B are independent, P(A | B) = P(A). Substitute this into the formula to get P(A ∩ B) = P(A)P(B).",
    example:
      "If P(A) = 0.3 and P(B) = 0.4, then under independence P(A ∩ B) = 0.3 × 0.4 = 0.12.",
    warning:
      "Do not use P(A)P(B) unless independence is stated, justified or being tested.",
  },
  {
    title: "5. Testing independence using joint probability",
    formula: "A and B independent ⇔ P(A ∩ B) = P(A)P(B)",
    body:
      "If the joint probability equals the product of the marginal probabilities, then the events are independent.",
    derivation:
      "The equation P(A ∩ B) = P(A)P(B) is equivalent to P(A | B) = P(A), provided P(B) > 0. Therefore it can be used as an alternative independence test.",
    example:
      "If P(A) = 0.5, P(B) = 0.6 and P(A ∩ B) = 0.3, then P(A)P(B) = 0.3, so A and B are independent.",
    warning:
      "Small differences in real data may reflect sampling variation. Exact equality is a theoretical condition.",
  },
  {
    title: "6. Independence from a two-way table",
    formula: "P(A | B) compared with P(A)",
    body:
      "In a two-way table, independence can be checked by comparing conditional row or column proportions with the overall proportions.",
    derivation:
      "If the proportion of A is the same within each level of B as it is overall, then B does not change the probability of A. In that case the events behave independently.",
    example:
      "If 40% of all students pass and 40% of revision attendees pass, then revision attendance does not change the pass probability in that table.",
    warning:
      "Always use the correct denominator for the condition being checked.",
  },
  {
    title: "7. Disjoint events versus independent events",
    formula: "Disjoint: A ∩ B = ∅; independent: P(A ∩ B) = P(A)P(B)",
    body:
      "Disjointness and independence describe different relationships. Disjoint events cannot occur together. Independent events can occur together, but one does not change the probability of the other.",
    derivation:
      "If A and B are disjoint, then P(A ∩ B) = 0. If both have positive probability and were independent, we would need P(A ∩ B) = P(A)P(B), which is positive. This is impossible. Therefore two positive-probability disjoint events cannot be independent.",
    example:
      "For one die roll, A = rolling 2 and B = rolling 5 are disjoint. If A occurs, B is impossible, so knowing A changes the probability of B to 0.",
    warning:
      "Students often think 'separate' means independent. In probability, disjoint positive-probability events are actually dependent.",
  },
  {
    title: "8. Independence and repeated trials",
    formula: "P(A₁ ∩ A₂ ∩ ... ∩ Aₙ) = P(A₁)P(A₂)...P(Aₙ), under mutual independence",
    body:
      "Repeated trials are often modelled as independent when the outcome of one trial does not affect the outcome of another.",
    derivation:
      "For independent trials, each new event keeps its original probability even after previous outcomes are known. Therefore the probability of a sequence is obtained by multiplying the probabilities along the sequence.",
    example:
      "For three fair coin tosses, P(HHH) = 0.5 × 0.5 × 0.5 = 0.125.",
    warning:
      "Repeated does not automatically mean independent. Sampling without replacement creates dependence.",
  },
  {
    title: "9. Sampling with and without replacement",
    formula: "Replacement often preserves independence; no replacement often creates dependence",
    body:
      "When an item is replaced after selection, later probabilities may remain unchanged. Without replacement, the composition changes, so probabilities usually change.",
    derivation:
      "If a selected item is not returned, the sample space for the next draw changes. Since conditional probabilities change after the first draw, the events are dependent.",
    example:
      "Drawing two red cards without replacement is dependent because the probability of the second red depends on whether the first card was red.",
    warning:
      "Always ask whether the first outcome changes the conditions for the second outcome.",
  },
  {
    title: "10. Independence in statistics",
    formula: "Information value: does B alter uncertainty about A?",
    body:
      "Independence is a central modelling assumption in statistics. Many methods rely on observations being independent, or on variables having a particular dependence structure.",
    derivation:
      "If observations are independent, one observation does not provide probability information about another. If observations are clustered, repeated or related, independence may fail and statistical methods must account for dependence.",
    example:
      "Measurements from the same patient over time are usually dependent, because a patient's earlier value contains information about their later value.",
    warning:
      "Independence is often assumed too casually. In real data, it must be justified by design and context.",
  },
];

const workedExamples = [
  {
    title: "Checking independence from probabilities",
    question:
      "Suppose P(A) = 0.40, P(B) = 0.50 and P(A ∩ B) = 0.20. Are A and B independent?",
    working:
      "Compute P(A)P(B) = 0.40 × 0.50 = 0.20. This equals P(A ∩ B). Therefore the joint probability matches what independence would predict.",
    answer: "Yes. A and B are independent.",
    deeper:
      "Equivalently, P(A | B) = P(A ∩ B)/P(B) = 0.20/0.50 = 0.40, which equals P(A).",
  },
  {
    title: "Checking dependence from conditional probability",
    question:
      "In a class, P(pass) = 0.70, but P(pass | attended revision) = 0.90. Are passing and attending revision independent?",
    working:
      "If the events were independent, attending revision would not change the probability of passing. But P(pass | attended revision) = 0.90 differs from P(pass) = 0.70.",
    answer: "No. The events are dependent.",
    deeper:
      "This shows association, but it does not by itself prove that revision caused the higher pass probability.",
  },
  {
    title: "Coin toss sequence",
    question:
      "A fair coin is tossed three times. Assuming independent tosses, what is P(HHH)?",
    working:
      "Each toss has probability 0.5 of heads. Independence means the probability of the sequence is the product: 0.5 × 0.5 × 0.5 = 0.125.",
    answer: "P(HHH) = 0.125.",
    deeper:
      "The first two heads do not make the third head less likely. For a fair independent coin, the third toss still has probability 0.5.",
  },
  {
    title: "Disjoint but not independent",
    question:
      "For one die roll, let A = rolling a 1 and B = rolling a 6. Are A and B independent?",
    working:
      "A and B are disjoint because one die roll cannot be both 1 and 6. P(A ∩ B) = 0. But P(A)P(B) = (1/6)(1/6) = 1/36. Since 0 ≠ 1/36, they are not independent.",
    answer: "No. They are disjoint and dependent.",
    deeper:
      "If A occurs, B becomes impossible. Therefore knowing A changes the probability of B from 1/6 to 0.",
  },
];

const practiceQuestions = [
  {
    prompt:
      "If P(A) = 0.3, P(B) = 0.5 and A and B are independent, find P(A ∩ B).",
    answer:
      "For independent events, P(A ∩ B) = P(A)P(B) = 0.3 × 0.5 = 0.15.",
  },
  {
    prompt:
      "If P(A) = 0.6 and P(A | B) = 0.6, what does this suggest about A and B?",
    answer:
      "It suggests A and B are independent because knowing B does not change the probability of A.",
  },
  {
    prompt:
      "If P(A) = 0.4, P(B) = 0.5 and P(A ∩ B) = 0.25, are A and B independent?",
    answer:
      "No. P(A)P(B) = 0.4 × 0.5 = 0.20, but P(A ∩ B) = 0.25. Since these are not equal, the events are dependent.",
  },
  {
    prompt:
      "Explain why two positive-probability disjoint events cannot be independent.",
    answer:
      "If events are disjoint, P(A ∩ B) = 0. But if they were independent, P(A ∩ B) would equal P(A)P(B), which is positive when both probabilities are positive. This contradiction means they cannot be independent.",
  },
  {
    prompt:
      "A card is drawn from a deck and not replaced. A second card is drawn. Are the two draw outcomes independent?",
    answer:
      "Usually no. Without replacement, the first draw changes the deck composition, so it changes probabilities for the second draw.",
  },
];

const quizQuestions = [
  {
    question: "What does it mean for A and B to be independent?",
    options: [
      "They cannot happen together.",
      "Knowing B does not change the probability of A.",
      "They must have probability 0.",
      "They must be complements.",
    ],
    answer: 1,
    feedback:
      "Independence means the occurrence of one event does not change the probability of the other.",
  },
  {
    question: "Which condition expresses independence when P(B) > 0?",
    options: [
      "P(A | B) = P(A)",
      "P(A | B) = 0",
      "P(A ∪ B) = 0",
      "P(A) = 1 − P(B)",
    ],
    answer: 0,
    feedback:
      "A and B are independent if P(A | B) = P(A).",
  },
  {
    question: "For independent events, what is P(A ∩ B)?",
    options: [
      "P(A) + P(B)",
      "P(A) − P(B)",
      "P(A)P(B)",
      "1 − P(A)",
    ],
    answer: 2,
    feedback:
      "For independent events, P(A ∩ B) = P(A)P(B).",
  },
  {
    question:
      "If P(A) = 0.2 and P(B) = 0.5, what is P(A ∩ B) if A and B are independent?",
    options: ["0.1", "0.3", "0.7", "1.0"],
    answer: 0,
    feedback:
      "P(A ∩ B) = 0.2 × 0.5 = 0.1.",
  },
  {
    question: "Are disjoint events with positive probabilities independent?",
    options: [
      "Always yes",
      "Usually yes",
      "No",
      "Only if their probabilities are equal",
    ],
    answer: 2,
    feedback:
      "Positive-probability disjoint events are not independent because knowing one occurs makes the other impossible.",
  },
  {
    question:
      "If P(A) = 0.7 and P(A | B) = 0.4, what can we say?",
    options: [
      "A and B are independent.",
      "A and B are dependent.",
      "A and B are disjoint.",
      "A and B are complements.",
    ],
    answer: 1,
    feedback:
      "Since P(A | B) differs from P(A), the events are dependent.",
  },
  {
    question:
      "Sampling without replacement usually creates dependence because:",
    options: [
      "The sample space changes after the first draw.",
      "The probabilities must become 0.",
      "The events become complements.",
      "The outcomes are always equally likely.",
    ],
    answer: 0,
    feedback:
      "Without replacement, the first draw changes the composition for the second draw.",
  },
];

export default function IndependenceDependenceLesson() {
  const lessonCode = "3.4";

  if (!isStatisticsFoundationLessonOpen(lessonCode)) {
    return (
      <LockedLessonGate
        lessonCode={lessonCode}
        lessonTitle="Independence and dependence"
        moduleTitle="Module 3: Probability Foundations"
      />
    );
  }

  const [activeTab, setActiveTab] = useState("Learning Route");

  const [pA, setPA] = useState(50);
  const [pB, setPB] = useState(40);
  const [observedJoint, setObservedJoint] = useState(20);

  const [aAndB, setAAndB] = useState(24);
  const [notAAndB, setNotAAndB] = useState(36);
  const [aAndNotB, setAAndNotB] = useState(16);
  const [notAAndNotB, setNotAAndNotB] = useState(24);

  const [drawsWithReplacement, setDrawsWithReplacement] = useState(true);
  const [redCards, setRedCards] = useState(13);
  const [totalCards, setTotalCards] = useState(52);

  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedPractice, setSelectedPractice] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const expectedJoint = (pA / 100) * (pB / 100);
  const observedJointProb = observedJoint / 100;
  const difference = observedJointProb - expectedJoint;

  const labConclusion =
    Math.abs(difference) < 0.005
      ? "The observed joint probability matches the independence product."
      : observedJointProb > expectedJoint
        ? "The events occur together more often than independence predicts."
        : "The events occur together less often than independence predicts.";

  const tableTotals = useMemo(() => {
    const bTotal = aAndB + notAAndB;
    const notBTotal = aAndNotB + notAAndNotB;
    const aTotal = aAndB + aAndNotB;
    const notATotal = notAAndB + notAAndNotB;
    const grand = bTotal + notBTotal;

    const pAOverall = grand === 0 ? 0 : aTotal / grand;
    const pAGivenB = bTotal === 0 ? 0 : aAndB / bTotal;
    const pAGivenNotB = notBTotal === 0 ? 0 : aAndNotB / notBTotal;
    const pBGivenA = aTotal === 0 ? 0 : aAndB / aTotal;

    return {
      bTotal,
      notBTotal,
      aTotal,
      notATotal,
      grand,
      pAOverall,
      pAGivenB,
      pAGivenNotB,
      pBGivenA,
    };
  }, [aAndB, notAAndB, aAndNotB, notAAndNotB]);

  const cardTree = useMemo(() => {
    const pFirstRed = totalCards === 0 ? 0 : redCards / totalCards;

    let pSecondRedGivenFirstRed = pFirstRed;
    let pSecondRedGivenFirstNotRed = pFirstRed;

    if (!drawsWithReplacement) {
      pSecondRedGivenFirstRed =
        totalCards <= 1 ? 0 : Math.max(0, redCards - 1) / (totalCards - 1);
      pSecondRedGivenFirstNotRed =
        totalCards <= 1 ? 0 : redCards / (totalCards - 1);
    }

    return {
      pFirstRed,
      pFirstNotRed: 1 - pFirstRed,
      pSecondRedGivenFirstRed,
      pSecondRedGivenFirstNotRed,
      pBothRed: pFirstRed * pSecondRedGivenFirstRed,
    };
  }, [drawsWithReplacement, redCards, totalCards]);

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
                Statistics Foundation · Lesson 3.4
              </p>

              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-7xl">
                Independence and dependence.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                Independence and dependence describe whether one event changes
                the probability of another. This lesson develops the idea using
                conditional probability, joint probability, two-way tables, tree
                diagrams and repeated-trial examples.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "115 minutes",
                  "No coding",
                  "Joint probability",
                  "Table checks",
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
                Central idea
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Independent means unchanged, not separate.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Independent: P(A | B) = P(A)",
                  "Dependent: P(A | B) ≠ P(A)",
                  "Independent product: P(A ∩ B) = P(A)P(B)",
                  "Disjoint is not independence",
                  "Repeated does not always mean independent",
                  "Association is not automatically causation",
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
                Move from conditional probability to independence checks.
              </h2>

              <p className="mt-5 text-base leading-8 text-neutral-700">
                Students now use conditional probability as a diagnostic tool:
                does knowing one event change another probability, or does the
                probability remain unchanged?
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
                Students should be able to decide whether information changes probability.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Define independence using conditional probability.",
                  "Define dependence using changed probability.",
                  "Use P(A ∩ B) = P(A)P(B) as an independence check.",
                  "Explain why disjoint events are usually dependent.",
                  "Use two-way tables to compare conditional proportions.",
                  "Distinguish sampling with replacement from without replacement.",
                  "Avoid confusing dependence with causation.",
                  "Recognise independence as a modelling assumption.",
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
                Independence is about information, not physical separation.
              </h2>

              <p className="mt-5 text-base leading-8 text-neutral-700">
                The key question is simple: after learning that B happened, did
                the probability of A change? If yes, the events are dependent.
                If no, the events are independent.
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
                Mr. R separates independence from disjointness.
              </h2>

              <div className="mt-6 grid gap-4">
                <Dialogue
                  speaker="Mr. R"
                  text="Last lesson, we learned conditional probability. Today, we use it to ask whether one event changes another probability."
                />
                <Dialogue
                  speaker="Amelia"
                  text="So if P(A | B) is different from P(A), then B matters?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Exactly. Then A and B are dependent."
                />
                <Dialogue
                  speaker="Ben"
                  text="And if P(A | B) equals P(A), then B does not matter?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Correct. That is independence."
                />
                <Dialogue
                  speaker="Chloe"
                  text="Does independent mean the events do not overlap?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="No. That is a common mistake. Independent events can overlap. Disjoint events cannot overlap."
                />
                <Dialogue
                  speaker="Daniel"
                  text="So disjoint events are independent?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Usually the opposite. If two positive-probability events are disjoint, knowing one happened makes the other impossible. That is dependence."
                />
              </div>

              <div className="mt-8 rounded-[2rem] border border-[#8b1116]/20 bg-[#fff7f7] p-6">
                <h3 className="text-2xl font-black tracking-[-0.04em] text-[#8b1116]">
                  Lecture takeaway
                </h3>
                <p className="mt-3 text-sm leading-7 text-neutral-700">
                  Independence is not about events looking unrelated. It is a
                  precise probability statement: information about one event
                  does not change the probability of the other.
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
                Independence is a statement about unchanged conditional probability.
              </h2>

              <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-700">
                These notes derive independence from conditional probability,
                connect it to joint probability, and explain why disjointness,
                repeated trials and causation require careful interpretation.
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
                        Warning
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

        {activeTab === "Independence Lab" && (
          <section className="mt-8 grid gap-6">
            <section className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
              <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                <div className="p-6 md:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                    Interactive independence lab
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    Compare observed overlap with independent overlap.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-neutral-700">
                    If A and B are independent, the expected joint probability is
                    P(A)P(B). Move the sliders and compare this product with the
                    observed P(A ∩ B).
                  </p>

                  <div className="mt-6 grid gap-5">
                    <Slider label="P(A)" value={pA} min={1} max={100} suffix="%" onChange={setPA} />
                    <Slider label="P(B)" value={pB} min={1} max={100} suffix="%" onChange={setPB} />
                    <Slider
                      label="Observed P(A ∩ B)"
                      value={Math.min(observedJoint, pA, pB)}
                      min={0}
                      max={Math.min(pA, pB)}
                      suffix="%"
                      onChange={setObservedJoint}
                    />
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <Metric label="P(A)" value={(pA / 100).toFixed(2)} />
                    <Metric label="P(B)" value={(pB / 100).toFixed(2)} />
                    <Metric label="Observed joint" value={(Math.min(observedJoint, pA, pB) / 100).toFixed(2)} />
                  </div>
                </div>

                <div className="border-t border-neutral-200 bg-neutral-950 p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                    Independence check
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    {Math.abs(difference) < 0.005 ? "Looks independent." : "Looks dependent."}
                  </h2>

                  <div className="mt-8 grid gap-4">
                    <DarkFormula
                      title="Expected if independent"
                      formula={`${(pA / 100).toFixed(2)} × ${(pB / 100).toFixed(2)} = ${expectedJoint.toFixed(2)}`}
                    />
                    <DarkFormula
                      title="Observed P(A ∩ B)"
                      formula={(Math.min(observedJoint, pA, pB) / 100).toFixed(2)}
                    />
                    <DarkFormula
                      title="Difference"
                      formula={difference.toFixed(2)}
                    />
                  </div>

                  <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.07] p-5">
                    <OverlapBars
                      expected={expectedJoint}
                      observed={Math.min(observedJoint, pA, pB) / 100}
                    />
                  </div>

                  <p className="mt-6 rounded-[1.5rem] bg-white p-5 text-sm font-bold leading-7 text-neutral-950">
                    {labConclusion}
                  </p>
                </div>
              </div>
            </section>
          </section>
        )}

        {activeTab === "Table Explorer" && (
          <section className="mt-8 grid gap-6">
            <section className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
              <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                <div className="p-6 md:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                    Two-way table independence explorer
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    Compare overall probability with conditional probability.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-neutral-700">
                    Adjust the table counts and compare P(A), P(A | B) and
                    P(A | Bᶜ). If B does not change the probability of A, these
                    values should be similar.
                  </p>

                  <div className="mt-6 grid gap-5">
                    <Slider label="A and B" value={aAndB} min={0} max={100} onChange={setAAndB} />
                    <Slider label="Aᶜ and B" value={notAAndB} min={0} max={100} onChange={setNotAAndB} />
                    <Slider label="A and Bᶜ" value={aAndNotB} min={0} max={100} onChange={setAAndNotB} />
                    <Slider label="Aᶜ and Bᶜ" value={notAAndNotB} min={0} max={100} onChange={setNotAAndNotB} />
                  </div>
                </div>

                <div className="border-t border-neutral-200 bg-[#f7f4ee] p-6 md:p-8 lg:border-l lg:border-t-0">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                    Table output
                  </p>

                  <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-white">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-neutral-950 text-white">
                          <th className="p-4 text-left">Event</th>
                          <th className="p-4 text-left">B</th>
                          <th className="p-4 text-left">Bᶜ</th>
                          <th className="p-4 text-left">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-neutral-200">
                          <td className="p-4 font-black">A</td>
                          <td className="p-4">{aAndB}</td>
                          <td className="p-4">{aAndNotB}</td>
                          <td className="p-4 font-black">{tableTotals.aTotal}</td>
                        </tr>
                        <tr className="border-t border-neutral-200">
                          <td className="p-4 font-black">Aᶜ</td>
                          <td className="p-4">{notAAndB}</td>
                          <td className="p-4">{notAAndNotB}</td>
                          <td className="p-4 font-black">{tableTotals.notATotal}</td>
                        </tr>
                        <tr className="border-t border-neutral-200 bg-[#f7f4ee]">
                          <td className="p-4 font-black">Total</td>
                          <td className="p-4 font-black">{tableTotals.bTotal}</td>
                          <td className="p-4 font-black">{tableTotals.notBTotal}</td>
                          <td className="p-4 font-black">{tableTotals.grand}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Metric label="P(A)" value={tableTotals.pAOverall.toFixed(2)} />
                    <Metric label="P(A | B)" value={tableTotals.pAGivenB.toFixed(2)} />
                    <Metric label="P(A | Bᶜ)" value={tableTotals.pAGivenNotB.toFixed(2)} />
                    <Metric label="P(B | A)" value={tableTotals.pBGivenA.toFixed(2)} />
                  </div>

                  <div className="mt-6 rounded-[1.5rem] bg-neutral-950 p-5 text-white">
                    <p className="text-sm leading-7 text-white/75">
                      If P(A | B) is close to P(A), B does not appear to change
                      the probability of A. If it differs clearly, the events
                      appear dependent.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </section>
        )}

        {activeTab === "Tree Diagram" && (
          <section className="mt-8 grid gap-6">
            <section className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="p-6 md:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                    Replacement and dependence
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    See how replacement changes independence.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-neutral-700">
                    Drawing with replacement keeps the composition the same.
                    Drawing without replacement changes the sample space for the
                    second draw.
                  </p>

                  <div className="mt-6 grid gap-5">
                    <Slider label="Red items" value={redCards} min={1} max={Math.max(1, totalCards)} onChange={setRedCards} />
                    <Slider label="Total items" value={totalCards} min={2} max={80} onChange={(value) => {
                      setTotalCards(value);
                      setRedCards((current) => Math.min(current, value));
                    }} />

                    <button
                      type="button"
                      onClick={() => setDrawsWithReplacement((current) => !current)}
                      className="rounded-[1.5rem] bg-neutral-950 px-5 py-4 text-sm font-black text-white"
                    >
                      Mode: {drawsWithReplacement ? "With replacement" : "Without replacement"}
                    </button>
                  </div>
                </div>

                <div className="border-t border-neutral-200 bg-neutral-950 p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                    Tree output
                  </p>

                  <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.07] p-5">
                    <ReplacementTree tree={cardTree} />
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <DarkMetric label="P(first red)" value={cardTree.pFirstRed.toFixed(3)} />
                    <DarkMetric label="P(second red | first red)" value={cardTree.pSecondRedGivenFirstRed.toFixed(3)} />
                    <DarkMetric label="P(second red | first not red)" value={cardTree.pSecondRedGivenFirstNotRed.toFixed(3)} />
                    <DarkMetric label="P(both red)" value={cardTree.pBothRed.toFixed(3)} />
                  </div>

                  <p className="mt-6 rounded-[1.5rem] bg-white p-5 text-sm font-bold leading-7 text-neutral-950">
                    {drawsWithReplacement
                      ? "With replacement, the second-draw probability remains the same, so independence is plausible."
                      : "Without replacement, the second-draw probability changes after the first draw, so the events are dependent."}
                  </p>
                </div>
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
                Check whether information changes probability.
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
                Practise independence checks.
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
              Independence asks whether information is useful.
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "Does B change P(A)?",
                  body:
                    "If P(A | B) differs from P(A), the events are dependent.",
                },
                {
                  title: "Does the joint equal the product?",
                  body:
                    "For independent events, P(A ∩ B) must equal P(A)P(B).",
                },
                {
                  title: "Are the events disjoint?",
                  body:
                    "If positive-probability events are disjoint, they are not independent.",
                },
                {
                  title: "Is this a design assumption?",
                  body:
                    "In real data, independence depends on how observations were generated or sampled.",
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
                Check whether you can distinguish independence, dependence,
                disjointness and multiplication rules.
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
    <div className="rounded-[1.25rem] border border-neutral-200 bg-white p-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-neutral-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-black tracking-[-0.04em]">{value}</p>
    </div>
  );
}

function DarkMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-white/45">
        {label}
      </p>
      <p className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
        {value}
      </p>
    </div>
  );
}

function DarkFormula({ title, formula }: { title: string; formula: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">
        {title}
      </p>
      <p className="mt-3 text-2xl font-black tracking-[-0.04em] text-white">
        {formula}
      </p>
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

function OverlapBars({
  expected,
  observed,
}: {
  expected: number;
  observed: number;
}) {
  return (
    <div className="grid gap-5">
      <div>
        <div className="mb-2 flex justify-between text-sm font-black text-white">
          <span>Expected if independent</span>
          <span>{expected.toFixed(2)}</span>
        </div>
        <div className="h-5 overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-white"
            style={{ width: `${Math.min(100, expected * 100)}%` }}
          />
        </div>
      </div>

      <div>
        <div className="mb-2 flex justify-between text-sm font-black text-white">
          <span>Observed overlap</span>
          <span>{observed.toFixed(2)}</span>
        </div>
        <div className="h-5 overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-white"
            style={{ width: `${Math.min(100, observed * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function ReplacementTree({
  tree,
}: {
  tree: {
    pFirstRed: number;
    pFirstNotRed: number;
    pSecondRedGivenFirstRed: number;
    pSecondRedGivenFirstNotRed: number;
    pBothRed: number;
  };
}) {
  return (
    <svg viewBox="0 0 720 360" className="h-auto w-full">
      <line x1="80" y1="180" x2="270" y2="100" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="3" />
      <line x1="80" y1="180" x2="270" y2="260" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="3" />

      <line x1="270" y1="100" x2="520" y2="60" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="3" />
      <line x1="270" y1="100" x2="520" y2="140" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="3" />
      <line x1="270" y1="260" x2="520" y2="220" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="3" />
      <line x1="270" y1="260" x2="520" y2="300" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="3" />

      <TreeNode x={80} y={180} label="Start" />
      <TreeNode x={270} y={100} label={`R ${tree.pFirstRed.toFixed(2)}`} />
      <TreeNode x={270} y={260} label={`Rᶜ ${tree.pFirstNotRed.toFixed(2)}`} />
      <TreeNode x={520} y={60} label={`R ${tree.pSecondRedGivenFirstRed.toFixed(2)}`} />
      <TreeNode x={520} y={140} label={`Rᶜ ${(1 - tree.pSecondRedGivenFirstRed).toFixed(2)}`} />
      <TreeNode x={520} y={220} label={`R ${tree.pSecondRedGivenFirstNotRed.toFixed(2)}`} />
      <TreeNode x={520} y={300} label={`Rᶜ ${(1 - tree.pSecondRedGivenFirstNotRed).toFixed(2)}`} />

      <text x="40" y="335" fontSize="17" fontWeight="900" fill="#ffffff">
        P(both red) = {tree.pBothRed.toFixed(3)}
      </text>
    </svg>
  );
}

function TreeNode({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="36" fill="#ffffff" />
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fontSize="15"
        fontWeight="900"
        fill="#111111"
      >
        {label}
      </text>
    </g>
  );
}
