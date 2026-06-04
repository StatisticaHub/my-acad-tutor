"use client";

import LockedLessonGate from "@/components/course/LockedLessonGate";
import { isStatisticsFoundationLessonOpen } from "@/lib/statisticsFoundationAccess";


import { useMemo, useState } from "react";

const tabs = [
  "Learning Route",
  "Lecture",
  "Detailed Notes",
  "Probability Lab",
  "Visual Reasoning",
  "Worked Examples",
  "Practice Studio",
  "Reflection",
  "Quiz",
];

const learningRoute = [
  {
    time: "0–10 min",
    title: "Why probability is needed",
    body:
      "Understand probability as the language used when an outcome is uncertain but not completely mysterious.",
  },
  {
    time: "10–25 min",
    title: "Outcomes, events and uncertainty",
    body:
      "Learn the difference between an individual outcome, an event and the full set of possible outcomes.",
  },
  {
    time: "25–45 min",
    title: "Probability as a number",
    body:
      "Study why probability lies between 0 and 1, and how 0, 0.5 and 1 represent impossible, balanced and certain situations.",
  },
  {
    time: "45–65 min",
    title: "Classical probability",
    body:
      "Use equally likely outcomes to calculate probability by counting favourable outcomes and total outcomes.",
  },
  {
    time: "65–85 min",
    title: "Long-run probability",
    body:
      "Explore probability as long-run relative frequency using repeated trials and simulated visual evidence.",
  },
  {
    time: "85–110 min",
    title: "Mathematical probability rules",
    body:
      "Connect intuitive probability to formal probability rules, complements, expected counts and careful interpretation.",
  },
];

const lectureConcepts = [
  {
    title: "Probability measures uncertainty",
    body:
      "Probability is used when we do not know exactly what will happen, but we can still reason about how likely different events are.",
    example:
      "Before tossing a coin, we do not know the result. Probability lets us describe the uncertainty before the toss happens.",
  },
  {
    title: "A probability is not a guess without structure",
    body:
      "A probability should be based on symmetry, data, a model, expert knowledge or repeated observation. It is a disciplined statement about uncertainty.",
    example:
      "Saying the chance of rain is 0.7 means the evidence suggests rain is more likely than not.",
  },
  {
    title: "Events are sets of outcomes",
    body:
      "An outcome is one possible result. An event is a collection of outcomes that we care about.",
    example:
      "Rolling a die gives outcomes 1, 2, 3, 4, 5, 6. The event 'rolling an even number' is {2, 4, 6}.",
  },
  {
    title: "Probability has boundaries",
    body:
      "A probability cannot be negative and cannot be greater than 1. The value 0 means impossible, and 1 means certain.",
    example:
      "A probability of 1.2 is not meaningful because it would mean more than certainty.",
  },
  {
    title: "Long-run behaviour gives probability meaning",
    body:
      "For repeatable situations, probability can be understood as the value that relative frequency tends to approach after many repetitions.",
    example:
      "A fair coin may not give exactly 50 heads in 100 tosses, but over many tosses the proportion of heads tends to settle near 0.5.",
  },
];

const notes = [
  {
    title: "1. Probability as a mathematical language",
    formula: "0 ≤ P(A) ≤ 1",
    body:
      "Probability assigns a number to an event. If A is an event, P(A) represents how likely A is to occur. The value must lie between 0 and 1. A probability close to 0 means the event is unlikely. A probability close to 1 means the event is likely.",
    derivation:
      "The restriction 0 ≤ P(A) ≤ 1 is not just a convention. If probability measures the share of uncertainty given to an event, then a negative share is impossible and a share greater than the whole uncertainty is also impossible.",
    example:
      "If P(A) = 0.25, then event A has probability 25%. This does not mean A must happen exactly 25 times in every 100 attempts. It means 25% is the theoretical or long-run tendency.",
    visual:
      "Probability scale: 0 means impossible, 0.5 means balanced uncertainty, and 1 means certain.",
  },
  {
    title: "2. Sample space and events",
    formula: "A ⊆ S",
    body:
      "The sample space S is the set of all possible outcomes. An event A is a subset of the sample space. This means every outcome in A must also be an outcome in S.",
    derivation:
      "If S = {1, 2, 3, 4, 5, 6} for a die roll, then A = {2, 4, 6} is a valid event because all its elements belong to S. The event A represents rolling an even number.",
    example:
      "For a coin toss, S = {H, T}. The event 'getting heads' is A = {H}. The event 'getting either heads or tails' is the full sample space S.",
    visual:
      "A Venn diagram can show the sample space as a rectangle and event A as a region inside it.",
  },
  {
    title: "3. Classical probability for equally likely outcomes",
    formula: "P(A) = |A| / |S|",
    body:
      "When all outcomes are equally likely, probability can be calculated by counting. The numerator counts favourable outcomes. The denominator counts all possible outcomes.",
    derivation:
      "If the sample space S has n equally likely outcomes, each outcome receives probability 1/n. If event A contains k outcomes, then P(A) = k × (1/n) = k/n = |A|/|S|.",
    example:
      "For a fair die, the event A = {2, 4, 6} has 3 favourable outcomes out of 6 total outcomes. Therefore P(A) = 3/6 = 1/2.",
    visual:
      "A die grid can show favourable outcomes shaded and unfavourable outcomes unshaded.",
  },
  {
    title: "4. The complement rule",
    formula: "P(Aᶜ) = 1 − P(A)",
    body:
      "The complement of A, written Aᶜ, is the event that A does not happen. Since A and Aᶜ together cover the whole sample space, their probabilities must add to 1.",
    derivation:
      "A and Aᶜ are disjoint, so P(A ∪ Aᶜ) = P(A) + P(Aᶜ). But A ∪ Aᶜ = S, and P(S) = 1. Therefore 1 = P(A) + P(Aᶜ), so P(Aᶜ) = 1 − P(A).",
    example:
      "If the probability of passing an exam is 0.8, then the probability of not passing is 1 − 0.8 = 0.2.",
    visual:
      "A Venn diagram can shade A in one colour and everything outside A as its complement.",
  },
  {
    title: "5. Long-run relative frequency",
    formula: "Relative frequency = number of times A occurs / number of trials",
    body:
      "For repeatable random situations, probability can be understood through repeated trials. The relative frequency may fluctuate at first, but as the number of trials grows, it often becomes more stable.",
    derivation:
      "After n trials, suppose event A occurs x times. The observed relative frequency is x/n. In many stable random processes, as n becomes large, x/n tends to move closer to the true probability P(A).",
    example:
      "If a coin is tossed 20 times, the proportion of heads might be 0.65. After 2,000 tosses, it is more likely to be closer to 0.5 for a fair coin.",
    visual:
      "A running frequency graph shows early instability and later stabilisation.",
  },
  {
    title: "6. Expected long-run count",
    formula: "Expected count = nP(A)",
    body:
      "If an event has probability P(A), then in n repeated trials we expect the event to occur about nP(A) times. This is not a guarantee, but it gives a useful long-run benchmark.",
    derivation:
      "If the long-run proportion of event A is P(A), then number of occurrences divided by n is approximately P(A). Therefore number of occurrences is approximately n × P(A).",
    example:
      "If P(A) = 0.3 and there are 200 trials, the expected count is 200 × 0.3 = 60.",
    visual:
      "A bar chart can compare expected occurrences and non-occurrences.",
  },
  {
    title: "7. Probability, percentage and odds",
    formula: "Odds in favour = P(A) / P(Aᶜ)",
    body:
      "Probability can be written as a decimal, fraction or percentage. Odds compare the probability of the event happening with the probability of it not happening.",
    derivation:
      "Because P(Aᶜ) = 1 − P(A), odds in favour of A are P(A)/(1 − P(A)). If odds are o, then probability can be recovered using P(A) = o/(1 + o).",
    example:
      "If P(A) = 0.75, then P(Aᶜ) = 0.25. The odds in favour are 0.75/0.25 = 3, or 3 to 1.",
    visual:
      "A split bar can show the event part and the non-event part.",
  },
];

const workedExamples = [
  {
    title: "Fair die",
    question:
      "A fair six-sided die is rolled once. What is the probability of rolling an even number?",
    working:
      "The sample space is S = {1, 2, 3, 4, 5, 6}. The event A = {2, 4, 6}. Since the outcomes are equally likely, P(A) = |A|/|S| = 3/6 = 1/2.",
    answer: "The probability is 1/2 = 0.5 = 50%.",
    caution:
      "This calculation depends on the die being fair and all six outcomes being equally likely.",
  },
  {
    title: "Complement",
    question:
      "If the probability of a student submitting homework on time is 0.82, what is the probability that the student does not submit it on time?",
    working:
      "Let A be the event 'submits on time'. Then P(A) = 0.82. The event 'does not submit on time' is Aᶜ. So P(Aᶜ) = 1 − P(A) = 1 − 0.82 = 0.18.",
    answer: "The probability is 0.18 = 18%.",
    caution:
      "The complement must describe everything outside the event, not just one alternative possibility.",
  },
  {
    title: "Expected count",
    question:
      "A diagnostic flag appears in 12% of records. In 500 records, about how many flags would we expect?",
    working:
      "Let P(A) = 0.12 and n = 500. Expected count = nP(A) = 500 × 0.12 = 60.",
    answer: "We expect about 60 flagged records.",
    caution:
      "This is an expected long-run count. The actual count may be slightly lower or higher.",
  },
  {
    title: "Odds from probability",
    question:
      "If the probability of an event is 0.8, what are the odds in favour of the event?",
    working:
      "P(A) = 0.8 and P(Aᶜ) = 1 − 0.8 = 0.2. Odds in favour = P(A)/P(Aᶜ) = 0.8/0.2 = 4.",
    answer: "The odds in favour are 4 to 1.",
    caution:
      "Probability and odds are related, but they are not the same thing.",
  },
];

const practiceQuestions = [
  {
    prompt:
      "A bag contains 4 red balls, 3 blue balls and 3 green balls. One ball is selected at random. What is the probability of selecting a red ball?",
    answer:
      "There are 10 balls in total and 4 red balls. So P(red) = 4/10 = 0.4.",
  },
  {
    prompt:
      "If P(A) = 0.35, what is P(Aᶜ)?",
    answer:
      "P(Aᶜ) = 1 − P(A) = 1 − 0.35 = 0.65.",
  },
  {
    prompt:
      "A student says: 'The probability is 1.3 because the event is very likely.' Explain the problem.",
    answer:
      "A probability cannot be greater than 1. The largest possible probability is 1, which means certainty.",
  },
  {
    prompt:
      "If an event has probability 0.15, how many times would you expect it in 200 trials?",
    answer:
      "Expected count = nP(A) = 200 × 0.15 = 30.",
  },
];

const quizQuestions = [
  {
    question: "What does P(A) represent?",
    options: [
      "The probability that event A occurs.",
      "The number of all possible events.",
      "The value that must always be greater than 1.",
      "The certainty that A cannot happen.",
    ],
    answer: 0,
    feedback:
      "P(A) means the probability that event A occurs.",
  },
  {
    question: "Which probability value is impossible?",
    options: ["0", "0.25", "1", "1.4"],
    answer: 3,
    feedback:
      "Probabilities must lie between 0 and 1, so 1.4 is impossible.",
  },
  {
    question: "For a fair die, what is the probability of rolling a number greater than 4?",
    options: ["1/6", "2/6", "4/6", "6/2"],
    answer: 1,
    feedback:
      "The favourable outcomes are {5, 6}, so the probability is 2/6.",
  },
  {
    question: "If P(A) = 0.7, what is P(Aᶜ)?",
    options: ["0.7", "1.7", "0.3", "0"],
    answer: 2,
    feedback:
      "The complement rule gives P(Aᶜ) = 1 − 0.7 = 0.3.",
  },
  {
    question: "What does long-run relative frequency describe?",
    options: [
      "How often an event occurs after repeated trials.",
      "The exact result of the next trial.",
      "A probability greater than 1.",
      "A rule only used for impossible events.",
    ],
    answer: 0,
    feedback:
      "Long-run relative frequency describes the proportion of times an event occurs after many repetitions.",
  },
  {
    question: "If P(A) = 0.25 and there are 400 trials, what is the expected count?",
    options: ["25", "50", "100", "400"],
    answer: 2,
    feedback:
      "Expected count = 400 × 0.25 = 100.",
  },
];

export default function WhatIsProbabilityLesson() {
  const lessonCode = "3.1";

  if (!isStatisticsFoundationLessonOpen(lessonCode)) {
    return (
      <LockedLessonGate
        lessonCode={lessonCode}
        lessonTitle="What is probability?"
        moduleTitle="Module 3: Probability Foundations"
      />
    );
  }

  const [activeTab, setActiveTab] = useState("Learning Route");
  const [probability, setProbability] = useState(35);
  const [trials, setTrials] = useState(80);
  const [eventSize, setEventSize] = useState(4);
  const [sampleSize, setSampleSize] = useState(10);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedPractice, setSelectedPractice] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(
    {},
  );

  const p = probability / 100;
  const complement = 1 - p;
  const expectedCount = Math.round(trials * p);

  const trialData = useMemo(() => {
    return makeTrialData(p, trials);
  }, [p, trials]);

  const finalFrequency =
    trialData.length > 0 ? trialData[trialData.length - 1].frequency : 0;

  const classicalProbability =
    sampleSize === 0 ? 0 : eventSize / Math.max(1, sampleSize);

  const activeExample = workedExamples[selectedExample];
  const activePractice = practiceQuestions[selectedPractice];

  const score = quizQuestions.reduce((total, question, index) => {
    return selectedAnswers[index] === question.answer ? total + 1 : total;
  }, 0);

  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-8 text-neutral-950 md:px-8 md:py-14">
      <style>{`
        @keyframes floatSoft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-9px); }
        }

        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.18); opacity: 1; }
        }

        @keyframes sweepLine {
          0% { transform: translateX(-100%); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
      `}</style>

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
                Statistics Foundation · Lesson 3.1
              </p>

              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-7xl">
                What is probability?
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                Probability is the mathematical language of uncertainty. This
                lesson introduces probability through events, sample spaces,
                complements, long-run behaviour and visual reasoning. Students
                learn how probability connects intuitive chance with formal
                statistical thinking.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "105–110 minutes",
                  "No coding",
                  "Venn diagrams",
                  "Long-run frequency",
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
                Lesson pathway
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                From everyday chance to mathematical uncertainty.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Uncertainty",
                  "Outcomes",
                  "Events",
                  "Probability scale",
                  "Complements",
                  "Long-run behaviour",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-4"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-black text-neutral-950">
                      {index + 1}
                    </span>
                    <span className="text-sm font-bold text-white/80">
                      {item}
                    </span>
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
                105–110 minute lesson plan
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Build probability from intuition, pictures and rules.
              </h2>

              <p className="mt-5 text-base leading-8 text-neutral-700">
                The lesson begins with everyday uncertainty and gradually moves
                toward formal probability language. Students meet sample spaces,
                events, complements, classical probability and long-run
                frequency before using these ideas visually.
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
                By the end, students should understand probability as structured uncertainty.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Explain probability as a number between 0 and 1.",
                  "Define sample space, outcome and event.",
                  "Use P(A) notation correctly.",
                  "Calculate probability using equally likely outcomes.",
                  "Derive and apply the complement rule.",
                  "Interpret probability as long-run relative frequency.",
                  "Convert between decimals, percentages and odds.",
                  "Avoid common probability misconceptions.",
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
          <section className="mt-8 grid gap-6">
            <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Core ideas
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Probability turns uncertainty into something we can reason with.
                </h2>

                <p className="mt-4 text-base leading-8 text-neutral-700">
                  Probability does not remove uncertainty. Instead, it gives us
                  a precise way to discuss uncertainty, compare events and make
                  careful statements before outcomes are known.
                </p>

                <div className="mt-6 grid gap-4">
                  {lectureConcepts.map((item, index) => (
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
                  Guided lecture
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Mr. R introduces uncertainty as a mathematical object.
                </h2>

                <div className="mt-6 grid gap-4">
                  <Dialogue
                    speaker="Mr. R"
                    text="Today we begin probability. Probability is the language statisticians use when an outcome is uncertain."
                  />
                  <Dialogue
                    speaker="Amelia"
                    text="So probability means guessing what will happen?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Not exactly. A guess may be casual. Probability should be structured. It should be based on symmetry, evidence, data or a clear model."
                  />
                  <Dialogue
                    speaker="Ben"
                    text="Why does probability have to be between 0 and 1?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Because 0 represents impossible and 1 represents certain. Anything below 0 or above 1 would not make sense as a share of uncertainty."
                  />
                  <Dialogue
                    speaker="Chloe"
                    text="What is an event?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="An event is a set of outcomes. If we roll a die, the event 'even number' contains the outcomes 2, 4 and 6."
                  />
                  <Dialogue
                    speaker="Daniel"
                    text="So probability is about sets?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Yes. Probability becomes much clearer when we see events as sets inside a sample space."
                  />
                  <Dialogue
                    speaker="Amelia"
                    text="And repeated trials help us see probability?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Exactly. In repeatable situations, probability often appears as long-run relative frequency."
                  />
                </div>

                <section className="mt-8 rounded-[2rem] border border-[#8b1116]/20 bg-[#fff7f7] p-6">
                  <h3 className="text-2xl font-black tracking-[-0.04em] text-[#8b1116]">
                    Key lecture message
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-700">
                    Probability is not just about coins and dice. It is the
                    foundation for statistical inference, risk, diagnostic
                    testing, uncertainty intervals, Bayesian updating and
                    decision-making under uncertainty.
                  </p>
                </section>
              </section>
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
                Probability begins with events, sets and rules.
              </h2>

              <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-700">
                These notes deliberately move beyond definitions. They show why
                the rules work, how the formulae are derived and how probability
                connects counting, complements, long-run frequency and odds.
              </p>
            </section>

            <div className="grid gap-5">
              {notes.map((item) => (
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
                        Visual idea
                      </p>
                      <p className="mt-2 text-sm leading-7 text-white/75">
                        {item.visual}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Probability Lab" && (
          <section className="mt-8 grid gap-6">
            <section className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="p-6 md:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                    Interactive probability lab
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    Adjust probability and watch uncertainty split.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-neutral-700">
                    Move the probability slider to see how an event and its
                    complement divide the sample space. Then increase the number
                    of trials to see long-run frequency stabilise.
                  </p>

                  <div className="mt-6 grid gap-5">
                    <Slider
                      label="Probability of event A"
                      value={probability}
                      min={0}
                      max={100}
                      suffix="%"
                      onChange={setProbability}
                    />
                    <Slider
                      label="Number of repeated trials"
                      value={trials}
                      min={10}
                      max={300}
                      suffix=" trials"
                      onChange={setTrials}
                    />
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <Metric
                      label="P(A)"
                      value={p.toFixed(2)}
                    />
                    <Metric
                      label="P(Aᶜ)"
                      value={complement.toFixed(2)}
                    />
                    <Metric
                      label="Expected count"
                      value={expectedCount.toString()}
                    />
                  </div>
                </div>

                <div className="border-t border-neutral-200 bg-neutral-950 p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                    Probability scale
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    {describeProbability(p)}
                  </h2>

                  <div className="mt-8">
                    <ProbabilityScale value={p} />
                  </div>

                  <div className="mt-8 grid gap-3">
                    <SplitBar label="Event A" value={p} />
                    <SplitBar label="Complement Aᶜ" value={complement} />
                  </div>

                  <p className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5 text-sm leading-7 text-white/75">
                    Since A and Aᶜ cover the whole sample space and cannot
                    happen together, their probabilities must add to 1:
                    P(A) + P(Aᶜ) = 1.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Long-run frequency
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                Early results fluctuate. Repeated trials become more stable.
              </h2>

              <p className="mt-4 max-w-4xl text-sm leading-7 text-neutral-700">
                The graph below shows the running relative frequency of event A.
                The dashed target is the theoretical probability. At small trial
                numbers, the line can jump around. With more trials, the running
                frequency usually becomes more stable.
              </p>

              <div className="mt-6 rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5">
                <FrequencyGraph data={trialData} target={p} />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Metric
                  label="Theoretical P(A)"
                  value={p.toFixed(2)}
                />
                <Metric
                  label="Final observed frequency"
                  value={finalFrequency.toFixed(2)}
                />
                <Metric
                  label="Difference"
                  value={Math.abs(finalFrequency - p).toFixed(2)}
                />
              </div>
            </section>
          </section>
        )}

        {activeTab === "Visual Reasoning" && (
          <section className="mt-8 grid gap-6">
            <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Venn diagram
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                  Probability is easier when events are seen as regions.
                </h2>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  The rectangle represents the sample space S. The circle
                  represents event A. Everything outside the circle is the
                  complement Aᶜ.
                </p>

                <div className="mt-6 rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5">
                  <VennSingle probability={p} />
                </div>

                <div className="mt-6 rounded-[1.5rem] bg-neutral-950 p-5 text-white">
                  <p className="text-sm leading-7 text-white/75">
                    Visual rule: the whole rectangle has probability 1. The
                    circle takes probability P(A), and the outside region takes
                    probability 1 − P(A).
                  </p>
                </div>
              </section>

              <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Counting probability
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                  Build classical probability by counting outcomes.
                </h2>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  Use the controls to choose how many outcomes are in the sample
                  space and how many belong to event A.
                </p>

                <div className="mt-6 grid gap-5">
                  <Slider
                    label="Total outcomes in S"
                    value={sampleSize}
                    min={2}
                    max={16}
                    onChange={(value) => {
                      setSampleSize(value);
                      setEventSize((current) => Math.min(current, value));
                    }}
                  />
                  <Slider
                    label="Favourable outcomes in A"
                    value={eventSize}
                    min={0}
                    max={sampleSize}
                    onChange={setEventSize}
                  />
                </div>

                <div className="mt-6 rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5">
                  <OutcomeGrid total={sampleSize} favourable={eventSize} />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <Metric
                    label="|A|"
                    value={eventSize.toString()}
                  />
                  <Metric
                    label="|S|"
                    value={sampleSize.toString()}
                  />
                  <Metric
                    label="P(A)"
                    value={classicalProbability.toFixed(2)}
                  />
                </div>

                <p className="mt-6 rounded-[1.5rem] border border-[#8b1116]/20 bg-[#fff7f7] p-5 text-sm font-bold leading-7 text-[#8b1116]">
                  Formula: P(A) = |A| / |S| = {eventSize}/{sampleSize} ={" "}
                  {classicalProbability.toFixed(2)}
                </p>
              </section>
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
                Choose an example and follow the reasoning.
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
                <InfoBlock title="Caution" body={activeExample.caution} warning />
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
                Practise probability language before moving to rules.
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
              Probability is careful language, not casual prediction.
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "What does probability describe?",
                  body:
                    "It describes uncertainty before the outcome is known. It does not always predict the next individual result.",
                },
                {
                  title: "Why do events matter?",
                  body:
                    "Events let us focus on the outcomes we care about while still keeping the whole sample space in view.",
                },
                {
                  title: "Why is the complement useful?",
                  body:
                    "Sometimes it is easier to calculate the probability that something does not happen and subtract from 1.",
                },
                {
                  title: "Why does long-run thinking matter?",
                  body:
                    "It helps students understand why short sequences can look unstable even when the underlying probability is fixed.",
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
                Answer each question to check whether you understand probability
                notation, complements, counting and long-run interpretation.
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

function ProbabilityScale({ value }: { value: number }) {
  return (
    <div>
      <div className="relative h-5 overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-white"
          style={{ width: `${value * 100}%` }}
        />
        <div
          className="absolute top-1/2 h-8 w-1 -translate-y-1/2 rounded-full bg-[#f7f4ee]"
          style={{ left: `calc(${value * 100}% - 2px)` }}
        />
      </div>
      <div className="mt-3 flex justify-between text-xs font-black uppercase tracking-[0.16em] text-white/45">
        <span>0 impossible</span>
        <span>0.5 balanced</span>
        <span>1 certain</span>
      </div>
    </div>
  );
}

function SplitBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm font-black">
        <span>{label}</span>
        <span>{Math.round(value * 100)}%</span>
      </div>
      <div className="h-4 overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-white"
          style={{ width: `${value * 100}%` }}
        />
      </div>
    </div>
  );
}

function VennSingle({ probability }: { probability: number }) {
  const radius = 35 + probability * 45;

  return (
    <svg viewBox="0 0 420 260" className="h-auto w-full">
      <rect
        x="20"
        y="20"
        width="380"
        height="220"
        rx="28"
        fill="#ffffff"
        stroke="#d4d4d4"
        strokeWidth="2"
      />
      <circle
        cx="210"
        cy="130"
        r={radius}
        fill="#8b1116"
        opacity="0.22"
        stroke="#8b1116"
        strokeWidth="4"
      />
      <text x="42" y="52" fontSize="18" fontWeight="800" fill="#111111">
        Sample space S
      </text>
      <text x="193" y="135" fontSize="22" fontWeight="900" fill="#8b1116">
        A
      </text>
      <text x="48" y="222" fontSize="15" fontWeight="800" fill="#525252">
        Outside circle = Aᶜ
      </text>
      <text x="258" y="222" fontSize="15" fontWeight="800" fill="#525252">
        P(A) = {probability.toFixed(2)}
      </text>
    </svg>
  );
}

function OutcomeGrid({
  total,
  favourable,
}: {
  total: number;
  favourable: number;
}) {
  return (
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
      {Array.from({ length: total }).map((_, index) => {
        const isFavourable = index < favourable;

        return (
          <div
            key={index}
            className={`flex aspect-square items-center justify-center rounded-2xl text-sm font-black ${
              isFavourable
                ? "bg-[#8b1116] text-white"
                : "border border-neutral-300 bg-white text-neutral-500"
            }`}
          >
            {index + 1}
          </div>
        );
      })}
    </div>
  );
}

function FrequencyGraph({
  data,
  target,
}: {
  data: { trial: number; frequency: number }[];
  target: number;
}) {
  const points = data
    .map((item, index) => {
      const x = data.length <= 1 ? 0 : (index / (data.length - 1)) * 100;
      const y = 100 - item.frequency * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" className="h-72 w-full overflow-visible">
      <line
        x1="0"
        x2="100"
        y1={100 - target * 100}
        y2={100 - target * 100}
        stroke="#8b1116"
        strokeWidth="1.8"
        strokeDasharray="4 4"
      />
      <polyline
        points={points}
        fill="none"
        stroke="#111111"
        strokeWidth="2.4"
        vectorEffect="non-scaling-stroke"
      />
      <line x1="0" x2="100" y1="100" y2="100" stroke="#d4d4d4" />
      <line x1="0" x2="0" y1="0" y2="100" stroke="#d4d4d4" />
      <text x="2" y="8" fontSize="4" fontWeight="800" fill="#525252">
        Relative frequency
      </text>
      <text x="70" y={Math.max(7, 100 - target * 100 - 3)} fontSize="4" fontWeight="800" fill="#8b1116">
        theoretical P(A)
      </text>
    </svg>
  );
}

function makeTrialData(probability: number, trials: number) {
  let successes = 0;

  return Array.from({ length: trials }).map((_, index) => {
    const pseudoRandom = deterministicRandom(index + 1);
    if (pseudoRandom < probability) successes += 1;

    return {
      trial: index + 1,
      frequency: successes / (index + 1),
    };
  });
}

function deterministicRandom(seed: number) {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
}

function describeProbability(value: number) {
  if (value === 0) return "Event A is impossible.";
  if (value < 0.2) return "Event A is unlikely.";
  if (value < 0.45) return "Event A is possible but less likely than not.";
  if (value <= 0.55) return "Event A is close to balanced uncertainty.";
  if (value < 0.8) return "Event A is more likely than not.";
  if (value < 1) return "Event A is very likely.";
  return "Event A is certain.";
}
