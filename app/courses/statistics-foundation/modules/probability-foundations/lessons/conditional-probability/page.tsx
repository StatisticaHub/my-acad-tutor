"use client";

import LockedLessonGate from "@/components/course/LockedLessonGate";
import { isStatisticsFoundationLessonOpen } from "@/lib/statisticsFoundationAccess";


import { useMemo, useState } from "react";

const tabs = [
  "Learning Route",
  "Lecture",
  "Detailed Notes",
  "Conditional Lab",
  "Two-Way Table",
  "Tree Diagram",
  "Worked Examples",
  "Practice Studio",
  "Reflection",
  "Quiz",
];

const learningRoute = [
  {
    time: "0–10 min",
    title: "Why probabilities change",
    body:
      "Understand that probability can change when new information is known.",
  },
  {
    time: "10–25 min",
    title: "Restricted sample spaces",
    body:
      "See conditional probability as probability calculated inside a smaller sample space.",
  },
  {
    time: "25–45 min",
    title: "Conditional notation",
    body:
      "Learn what P(A | B) means and why the vertical bar means 'given'.",
  },
  {
    time: "45–65 min",
    title: "Deriving the formula",
    body:
      "Derive P(A | B) = P(A ∩ B) / P(B) using event regions.",
  },
  {
    time: "65–85 min",
    title: "Two-way tables",
    body:
      "Use rows, columns and totals to calculate conditional probabilities.",
  },
  {
    time: "85–115 min",
    title: "Tree diagrams and interpretation",
    body:
      "Connect conditional probability to sequential reasoning and diagnostic-style examples.",
  },
];

const lectureCards = [
  {
    title: "Conditional probability means probability after information",
    body:
      "A probability can change when we know that another event has already occurred.",
    example:
      "The probability a student studies statistics may differ from the probability a student studies statistics given that they study data science.",
  },
  {
    title: "The word 'given' restricts the world",
    body:
      "In P(A | B), we are no longer considering the full sample space. We are only considering cases where B occurred.",
    example:
      "P(rain | cloudy) is calculated only among cloudy days, not among all days.",
  },
  {
    title: "The denominator is the given event",
    body:
      "The event after the vertical bar becomes the new reference group.",
    example:
      "In P(A | B), B is the restricted sample space.",
  },
  {
    title: "The numerator is the overlap",
    body:
      "To find the probability of A among B, we need the part of B that also lies inside A.",
    example:
      "P(A | B) uses A ∩ B in the numerator.",
  },
  {
    title: "P(A | B) and P(B | A) are not the same",
    body:
      "Reversing the condition changes the denominator, so the probability usually changes.",
    example:
      "P(has disease | positive test) is not the same as P(positive test | has disease).",
  },
  {
    title: "Conditional probability prepares for Bayes' theorem",
    body:
      "Bayes' theorem is built from conditional probability. Understanding the denominator is essential.",
    example:
      "Diagnostic reasoning depends on distinguishing sensitivity from the probability of actually having disease after a positive result.",
  },
];

const detailedNotes = [
  {
    title: "1. Conditional probability as updated uncertainty",
    formula: "P(A | B)",
    body:
      "Conditional probability measures the probability of event A under the condition that event B is known to have occurred. The notation P(A | B) is read as 'the probability of A given B'.",
    derivation:
      "Before B is known, the relevant reference space is the full sample space S. After B is known, outcomes outside B are no longer possible for the current question. Therefore the probability of A must be recalculated inside B.",
    example:
      "P(student passes | student attended revision class) asks about passing only among students who attended the revision class.",
    warning:
      "Do not read P(A | B) as 'A divided by B' in an ordinary arithmetic sense. It means probability of A after restricting attention to B.",
  },
  {
    title: "2. The restricted sample space idea",
    formula: "New sample space = B",
    body:
      "The most important intuition is that the given event becomes the new sample space. Once B is known, only outcomes in B remain relevant.",
    derivation:
      "If B has occurred, then outcomes in Bᶜ are impossible under the given information. Therefore the total probability available for the conditional question is no longer P(S) = 1 in the original scale, but P(B), which is rescaled to become 1 inside the conditional world.",
    example:
      "If we know a randomly chosen person is a postgraduate student, probabilities should be calculated among postgraduate students only.",
    warning:
      "Many mistakes happen because students keep using the original total instead of the restricted total.",
  },
  {
    title: "3. Derivation of the conditional probability formula",
    formula: "P(A | B) = P(A ∩ B) / P(B), provided P(B) > 0",
    body:
      "The conditional probability of A given B is the proportion of B that also belongs to A.",
    derivation:
      "Inside the restricted event B, the relevant part of A is A ∩ B. The total available region is B. Therefore the conditional probability is the size of the overlap divided by the size of B: P(A | B) = P(A ∩ B)/P(B). This requires P(B) > 0 because we cannot condition on an event with probability zero in this elementary setting.",
    example:
      "If P(A ∩ B) = 0.20 and P(B) = 0.50, then P(A | B) = 0.20/0.50 = 0.40.",
    warning:
      "The denominator is not P(A). For P(A | B), the denominator is P(B).",
  },
  {
    title: "4. Rearranging the formula",
    formula: "P(A ∩ B) = P(A | B)P(B)",
    body:
      "The conditional probability formula can be rearranged to calculate the joint probability of A and B.",
    derivation:
      "Starting with P(A | B) = P(A ∩ B)/P(B), multiply both sides by P(B). This gives P(A ∩ B) = P(A | B)P(B).",
    example:
      "If 60% of students attend revision and 80% of those students pass, then P(attend ∩ pass) = 0.80 × 0.60 = 0.48.",
    warning:
      "This is not an independence rule. It is always true when conditional probability is defined.",
  },
  {
    title: "5. Reverse conditionals",
    formula: "P(A | B) usually differs from P(B | A)",
    body:
      "Changing the order of the condition changes the meaning of the probability. P(A | B) uses B as the denominator. P(B | A) uses A as the denominator.",
    derivation:
      "P(A | B) = P(A ∩ B)/P(B), while P(B | A) = P(A ∩ B)/P(A). The numerator is the same, but the denominator is usually different. Therefore the probabilities are usually different.",
    example:
      "P(positive test | disease) may be high, but P(disease | positive test) can still be lower if the disease is rare.",
    warning:
      "This is one of the most important mistakes in statistics, medicine and everyday reasoning.",
  },
  {
    title: "6. Conditional probability from counts",
    formula: "P(A | B) = count(A ∩ B) / count(B)",
    body:
      "When working with a table of counts, conditional probability is calculated using the count in the overlap divided by the count in the condition group.",
    derivation:
      "If all individuals in the table are equally counted units, probabilities can be estimated by relative frequencies. The conditional probability of A given B is the number of observations satisfying both A and B divided by the total number satisfying B.",
    example:
      "If 30 out of 120 students are both revision attendees and passers, and 40 students attended revision, then P(pass | attended) = 30/40 = 0.75.",
    warning:
      "The correct denominator is the row total or column total corresponding to the condition.",
  },
  {
    title: "7. Conditional probability in tree diagrams",
    formula: "Branch probability after B = P(A | B)",
    body:
      "Tree diagrams represent probability sequentially. The probability on a later branch is often conditional on the earlier branch.",
    derivation:
      "If the first branch is B and the second branch is A given B, the path probability is P(B)P(A | B). This equals P(A ∩ B).",
    example:
      "If P(disease) = 0.10 and P(positive | disease) = 0.90, then P(disease and positive) = 0.10 × 0.90 = 0.09.",
    warning:
      "A tree branch after an event is not usually an unconditional probability. It is conditional on the path already taken.",
  },
  {
    title: "8. Conditional probability and statistical thinking",
    formula: "New information changes the reference group",
    body:
      "Much of statistics is about how evidence changes uncertainty. Conditional probability is the first formal tool for understanding how information updates probability.",
    derivation:
      "If data, symptoms, group membership or prior evidence restrict the possible cases, then probabilities must be recalculated relative to that restricted group.",
    example:
      "A health risk may be low in the full population but higher among patients with a particular symptom or biomarker.",
    warning:
      "A conditional probability should always be interpreted with its condition clearly stated.",
  },
];

const workedExamples = [
  {
    title: "Students and revision class",
    question:
      "In a class of 100 students, 40 attended a revision class. Of those 40, 32 passed the exam. What is P(pass | attended revision)?",
    working:
      "The condition is 'attended revision', so the denominator is 40. The overlap is 'attended revision and passed', which is 32. Therefore P(pass | attended revision) = 32/40 = 0.80.",
    answer: "The conditional probability is 0.80, or 80%.",
    deeper:
      "We do not divide by 100 because the question is not asking about all students. It is asking about students inside the revision-attended group.",
  },
  {
    title: "Medical screening",
    question:
      "Suppose P(disease) = 0.08 and P(positive test | disease) = 0.90. What is P(disease and positive test)?",
    working:
      "Use the multiplication form of conditional probability: P(disease ∩ positive) = P(positive | disease)P(disease). Therefore P(disease ∩ positive) = 0.90 × 0.08 = 0.072.",
    answer: "The joint probability is 0.072, or 7.2%.",
    deeper:
      "This is not yet P(disease | positive). That reverse probability requires Bayes' theorem, introduced later.",
  },
  {
    title: "Weather and clouds",
    question:
      "Out of 200 days, 80 were cloudy. It rained on 50 cloudy days. What is P(rain | cloudy)?",
    working:
      "The condition is cloudy, so restrict the denominator to cloudy days. There are 80 cloudy days and 50 of those had rain. Therefore P(rain | cloudy) = 50/80 = 0.625.",
    answer: "The probability is 0.625, or 62.5%.",
    deeper:
      "The denominator is not 200 because the phrase 'given cloudy' restricts the reference group.",
  },
  {
    title: "Reverse conditionals",
    question:
      "In a dataset, 30 students study statistics, 50 study programming and 20 study both. Compare P(statistics | programming) and P(programming | statistics).",
    working:
      "P(statistics | programming) = count(statistics ∩ programming)/count(programming) = 20/50 = 0.40. P(programming | statistics) = count(programming ∩ statistics)/count(statistics) = 20/30 = 0.667.",
    answer:
      "P(statistics | programming) = 0.40, while P(programming | statistics) ≈ 0.667.",
    deeper:
      "The overlap is the same, but the denominators are different. This is why reverse conditionals are usually not equal.",
  },
];

const practiceQuestions = [
  {
    prompt:
      "In a group of 120 students, 70 are female and 35 of the female students study statistics. Find P(studies statistics | female).",
    answer:
      "The condition is female, so the denominator is 70. The overlap is female and studies statistics, which is 35. Therefore P(studies statistics | female) = 35/70 = 0.5.",
  },
  {
    prompt:
      "If P(A ∩ B) = 0.18 and P(B) = 0.60, find P(A | B).",
    answer:
      "P(A | B) = P(A ∩ B)/P(B) = 0.18/0.60 = 0.30.",
  },
  {
    prompt:
      "If P(B) = 0.40 and P(A | B) = 0.75, find P(A ∩ B).",
    answer:
      "P(A ∩ B) = P(A | B)P(B) = 0.75 × 0.40 = 0.30.",
  },
  {
    prompt:
      "Explain why P(disease | positive test) is not the same as P(positive test | disease).",
    answer:
      "P(positive test | disease) uses diseased people as the denominator. P(disease | positive test) uses positive-test people as the denominator. The denominators differ, so the probabilities usually differ.",
  },
  {
    prompt:
      "A table shows 25 smokers with cough, 75 smokers without cough, 30 non-smokers with cough and 170 non-smokers without cough. Find P(cough | smoker).",
    answer:
      "Among smokers, there are 25 + 75 = 100 people. Of these, 25 have cough. Therefore P(cough | smoker) = 25/100 = 0.25.",
  },
];

const quizQuestions = [
  {
    question: "What does P(A | B) mean?",
    options: [
      "The probability of A given that B has occurred.",
      "The probability of B given that A has occurred.",
      "The probability of A or B.",
      "The probability that neither A nor B occurs.",
    ],
    answer: 0,
    feedback:
      "P(A | B) means the probability of A under the condition that B has occurred.",
  },
  {
    question: "In P(A | B), which event becomes the restricted sample space?",
    options: ["A", "B", "Aᶜ", "A ∪ B"],
    answer: 1,
    feedback:
      "The event after the vertical bar is the condition, so B becomes the restricted sample space.",
  },
  {
    question: "Which formula defines conditional probability?",
    options: [
      "P(A | B) = P(A) + P(B)",
      "P(A | B) = P(A ∩ B) / P(B)",
      "P(A | B) = P(B) / P(A)",
      "P(A | B) = 1 − P(A)",
    ],
    answer: 1,
    feedback:
      "Conditional probability is P(A | B) = P(A ∩ B)/P(B), provided P(B) > 0.",
  },
  {
    question:
      "If P(A ∩ B) = 0.24 and P(B) = 0.60, what is P(A | B)?",
    options: ["0.14", "0.24", "0.40", "0.84"],
    answer: 2,
    feedback:
      "P(A | B) = 0.24/0.60 = 0.40.",
  },
  {
    question:
      "If P(B) = 0.50 and P(A | B) = 0.70, what is P(A ∩ B)?",
    options: ["0.20", "0.35", "0.70", "1.20"],
    answer: 1,
    feedback:
      "P(A ∩ B) = P(A | B)P(B) = 0.70 × 0.50 = 0.35.",
  },
  {
    question: "Why are P(A | B) and P(B | A) usually different?",
    options: [
      "They have different denominators.",
      "They always have different intersections.",
      "They are both always equal to 1.",
      "They do not involve events.",
    ],
    answer: 0,
    feedback:
      "They share the same intersection but usually have different denominators.",
  },
  {
    question:
      "In a table, what denominator should be used for P(pass | attended revision)?",
    options: [
      "All students",
      "Students who passed",
      "Students who attended revision",
      "Students who did not attend revision",
    ],
    answer: 2,
    feedback:
      "The condition is attended revision, so use the total number of students who attended revision.",
  },
];

export default function ConditionalProbabilityLesson() {
  const lessonCode = "3.3";

  if (!isStatisticsFoundationLessonOpen(lessonCode)) {
    return (
      <LockedLessonGate
        lessonCode={lessonCode}
        lessonTitle="Conditional probability"
        moduleTitle="Module 3: Probability Foundations"
      />
    );
  }

  const [activeTab, setActiveTab] = useState("Learning Route");

  const [pA, setPA] = useState(60);
  const [pB, setPB] = useState(50);
  const [overlap, setOverlap] = useState(25);

  const [tableAttendPass, setTableAttendPass] = useState(32);
  const [tableAttendFail, setTableAttendFail] = useState(8);
  const [tableNoAttendPass, setTableNoAttendPass] = useState(38);
  const [tableNoAttendFail, setTableNoAttendFail] = useState(22);

  const [diseaseRate, setDiseaseRate] = useState(8);
  const [sensitivity, setSensitivity] = useState(90);
  const [falsePositiveRate, setFalsePositiveRate] = useState(12);

  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedPractice, setSelectedPractice] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const validOverlap = Math.min(overlap, pA, pB);
  const pAGivenB = pB === 0 ? 0 : validOverlap / pB;
  const pBGivenA = pA === 0 ? 0 : validOverlap / pA;

  const attendTotal = tableAttendPass + tableAttendFail;
  const noAttendTotal = tableNoAttendPass + tableNoAttendFail;
  const passTotal = tableAttendPass + tableNoAttendPass;
  const failTotal = tableAttendFail + tableNoAttendFail;
  const grandTotal = attendTotal + noAttendTotal;

  const passGivenAttend = attendTotal === 0 ? 0 : tableAttendPass / attendTotal;
  const attendGivenPass = passTotal === 0 ? 0 : tableAttendPass / passTotal;

  const tree = useMemo(() => {
    const disease = diseaseRate / 100;
    const noDisease = 1 - disease;
    const posGivenDisease = sensitivity / 100;
    const negGivenDisease = 1 - posGivenDisease;
    const posGivenNoDisease = falsePositiveRate / 100;
    const negGivenNoDisease = 1 - posGivenNoDisease;

    return {
      disease,
      noDisease,
      posGivenDisease,
      negGivenDisease,
      posGivenNoDisease,
      negGivenNoDisease,
      diseaseAndPositive: disease * posGivenDisease,
      diseaseAndNegative: disease * negGivenDisease,
      noDiseaseAndPositive: noDisease * posGivenNoDisease,
      noDiseaseAndNegative: noDisease * negGivenNoDisease,
      totalPositive: disease * posGivenDisease + noDisease * posGivenNoDisease,
    };
  }, [diseaseRate, sensitivity, falsePositiveRate]);

  const positivePredictiveValue =
    tree.totalPositive === 0 ? 0 : tree.diseaseAndPositive / tree.totalPositive;

  const activeExample = workedExamples[selectedExample];
  const activePractice = practiceQuestions[selectedPractice];

  const score = quizQuestions.reduce((total, question, index) => {
    return selectedAnswers[index] === question.answer ? total + 1 : total;
  }, 0);

  return (
    <main className="min-h-screen bg-[#F7F3EA] px-5 py-8 text-[#141210] md:px-8 md:py-14">
      <section className="mx-auto max-w-7xl">
        <a
          href="/courses/statistics-foundation/modules/probability-and-uncertainty/"
          className="text-sm font-black text-[#741018] hover:text-[#4d080e]"
        >
          ← Back to module
        </a>

        <section className="mt-8 overflow-hidden rounded-[2.5rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 md:p-10">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Statistics Foundation · Lesson 3.3
              </p>

              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-7xl">
                Conditional probability.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">
                Conditional probability explains how uncertainty changes when
                information is known. This lesson develops the idea through
                restricted sample spaces, Venn diagrams, two-way tables, tree
                diagrams and diagnostic-style reasoning.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "115 minutes",
                  "No coding",
                  "Two-way tables",
                  "Tree diagrams",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-[#E4DED2] bg-[#F7F3EA] p-4 text-sm font-black text-[#525252]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <aside className="border-t border-[#E4DED2] bg-[#11100E] p-6 text-white md:p-10 lg:border-l lg:border-t-0">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Central idea
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Given B, the world becomes B.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "P(A | B)",
                  "Read: probability of A given B",
                  "B is the restricted sample space",
                  "A ∩ B is the useful overlap",
                  "P(A | B) = P(A ∩ B) / P(B)",
                  "P(A | B) ≠ P(B | A) in general",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-4 text-sm font-black text-white/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <nav className="sticky top-[74px] z-30 mt-8 flex gap-2 overflow-x-auto rounded-full border border-[#E4DED2] bg-[#FFFCF6]/90 p-2 shadow-sm backdrop-blur">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-black transition ${
                activeTab === tab
                  ? "bg-[#11100E] text-white"
                  : "text-[#5F5F5F] hover:bg-[#F7F3EA] hover:text-[#141210]"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {activeTab === "Learning Route" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Lesson route
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Learn probability after information is known.
              </h2>

              <p className="mt-5 text-base leading-8 text-[#525252]">
                This lesson is the turning point of Module 3. Instead of asking
                only “how likely is A?”, students now ask “how likely is A after
                we know B?”
              </p>

              <div className="mt-6 grid gap-3">
                {learningRoute.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
                      {item.time}
                    </p>
                    <h3 className="mt-2 text-xl font-black tracking-[-0.035em]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#525252]">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Mastery checklist
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Students should see conditional probability as a change of reference group.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Read P(A | B) correctly.",
                  "Identify the condition in a probability statement.",
                  "Explain B as the restricted sample space.",
                  "Derive P(A | B) = P(A ∩ B)/P(B).",
                  "Calculate conditional probability from counts.",
                  "Use two-way tables correctly.",
                  "Interpret conditional branches in a tree diagram.",
                  "Avoid confusing P(A | B) with P(B | A).",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-4 rounded-[1.25rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-4"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFFCF6] text-sm font-black text-[#141210]">
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
            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Concept lecture
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Conditional probability is probability inside a smaller world.
              </h2>

              <p className="mt-5 text-base leading-8 text-[#525252]">
                The vertical bar in P(A | B) is one of the most important
                symbols in statistics. It means that the probability is being
                calculated after B has been accepted as known information.
              </p>

              <div className="mt-6 grid gap-4">
                {lectureCards.map((item, index) => (
                  <article
                    key={item.title}
                    className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#11100E] text-sm font-black text-white">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-xl font-black tracking-[-0.035em]">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-[#525252]">
                          {item.body}
                        </p>
                        <p className="mt-3 rounded-2xl bg-[#FFFCF6] px-4 py-3 text-sm font-bold leading-7 text-[#525252]">
                          Example: {item.example}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Classroom dialogue
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Mr. R explains why “given” changes everything.
              </h2>

              <div className="mt-6 grid gap-4">
                <Dialogue
                  speaker="Mr. R"
                  text="In the last lesson, we looked at events inside a sample space. Today, we change the sample space itself."
                />
                <Dialogue
                  speaker="Amelia"
                  text="How can the sample space change?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="It changes when information is known. If I say a person is already known to be a postgraduate student, we no longer compare them with everyone."
                />
                <Dialogue
                  speaker="Ben"
                  text="So we compare only inside the postgraduate group?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Exactly. That is conditional probability. The condition becomes the new reference group."
                />
                <Dialogue
                  speaker="Chloe"
                  text="Then in P(A | B), B is the group we focus on?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Yes. The denominator is B. The numerator is the part of B that also satisfies A, which is A ∩ B."
                />
                <Dialogue
                  speaker="Daniel"
                  text="Is P(A | B) the same as P(B | A)?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Usually no. They use different reference groups. This distinction is crucial in medical testing, risk prediction and Bayesian reasoning."
                />
              </div>

              <div className="mt-8 rounded-[2rem] border border-[#741018]/20 bg-[#fff4ef] p-6">
                <h3 className="text-2xl font-black tracking-[-0.04em] text-[#741018]">
                  Lecture takeaway
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#525252]">
                  Conditional probability is not just another formula. It is a
                  change in perspective: from the full population to the part of
                  the population consistent with the information given.
                </p>
              </div>
            </section>
          </section>
        )}

        {activeTab === "Detailed Notes" && (
          <section className="mt-8 grid gap-6">
            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Detailed theoretical notes
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Conditional probability is the foundation of statistical updating.
              </h2>

              <p className="mt-5 max-w-4xl text-base leading-8 text-[#525252]">
                These notes emphasise derivation, interpretation and common
                mistakes. The goal is to make students understand why the formula
                works, not only how to use it.
              </p>
            </section>

            <div className="grid gap-5">
              {detailedNotes.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm"
                >
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
                    {item.formula}
                  </p>
                  <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#525252]">
                    {item.body}
                  </p>

                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl bg-[#F7F3EA] p-4">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7a7063]">
                        Derivation
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[#525252]">
                        {item.derivation}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#741018]/20 bg-[#fff4ef] p-4">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
                        Example
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[#525252]">
                        {item.example}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#11100E] p-4 text-white">
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

        {activeTab === "Conditional Lab" && (
          <section className="mt-8 grid gap-6">
            <section className="overflow-hidden rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
              <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                <div className="p-6 md:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                    Interactive conditional probability lab
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    Change the overlap and compare reverse conditionals.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-[#525252]">
                    Adjust P(A), P(B) and P(A ∩ B). Notice that P(A | B) and
                    P(B | A) can be very different even though they use the same
                    overlap.
                  </p>

                  <div className="mt-6 grid gap-5">
                    <Slider label="P(A)" value={pA} min={1} max={100} suffix="%" onChange={setPA} />
                    <Slider label="P(B)" value={pB} min={1} max={100} suffix="%" onChange={setPB} />
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

                <div className="border-t border-[#E4DED2] bg-[#11100E] p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                    Conditional outputs
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    Same overlap, different denominators.
                  </h2>

                  <div className="mt-8 grid gap-4">
                    <DarkFormula
                      title="P(A | B)"
                      formula={`${(validOverlap / 100).toFixed(2)} / ${(pB / 100).toFixed(2)} = ${pAGivenB.toFixed(2)}`}
                    />
                    <DarkFormula
                      title="P(B | A)"
                      formula={`${(validOverlap / 100).toFixed(2)} / ${(pA / 100).toFixed(2)} = ${pBGivenA.toFixed(2)}`}
                    />
                  </div>

                  <div className="mt-8 rounded-[2rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5">
                    <VennConditional pA={pA} pB={pB} overlap={validOverlap} />
                  </div>

                  <p className="mt-6 rounded-[1.5rem] bg-[#FFFCF6] p-5 text-sm font-bold leading-7 text-[#141210]">
                    P(A | B) asks: inside B, how much is also A? P(B | A) asks:
                    inside A, how much is also B?
                  </p>
                </div>
              </div>
            </section>
          </section>
        )}

        {activeTab === "Two-Way Table" && (
          <section className="mt-8 grid gap-6">
            <section className="overflow-hidden rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
              <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                <div className="p-6 md:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                    Two-way table explorer
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    Conditional probability depends on the chosen denominator.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-[#525252]">
                    Change the four table cells. Then compare P(pass | attended)
                    with P(attended | pass). The same cell appears in the
                    numerator, but the denominator changes.
                  </p>

                  <div className="mt-6 grid gap-5">
                    <Slider label="Attended and passed" value={tableAttendPass} min={0} max={100} onChange={setTableAttendPass} />
                    <Slider label="Attended and failed" value={tableAttendFail} min={0} max={100} onChange={setTableAttendFail} />
                    <Slider label="Did not attend and passed" value={tableNoAttendPass} min={0} max={100} onChange={setTableNoAttendPass} />
                    <Slider label="Did not attend and failed" value={tableNoAttendFail} min={0} max={100} onChange={setTableNoAttendFail} />
                  </div>
                </div>

                <div className="border-t border-[#E4DED2] bg-[#F7F3EA] p-6 md:p-8 lg:border-l lg:border-t-0">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                    Table output
                  </p>

                  <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-[#E4DED2] bg-[#FFFCF6]">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-[#11100E] text-white">
                          <th className="p-4 text-left">Group</th>
                          <th className="p-4 text-left">Pass</th>
                          <th className="p-4 text-left">Fail</th>
                          <th className="p-4 text-left">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-[#E4DED2]">
                          <td className="p-4 font-black">Attended</td>
                          <td className="p-4">{tableAttendPass}</td>
                          <td className="p-4">{tableAttendFail}</td>
                          <td className="p-4 font-black">{attendTotal}</td>
                        </tr>
                        <tr className="border-t border-[#E4DED2]">
                          <td className="p-4 font-black">Did not attend</td>
                          <td className="p-4">{tableNoAttendPass}</td>
                          <td className="p-4">{tableNoAttendFail}</td>
                          <td className="p-4 font-black">{noAttendTotal}</td>
                        </tr>
                        <tr className="border-t border-[#E4DED2] bg-[#F7F3EA]">
                          <td className="p-4 font-black">Total</td>
                          <td className="p-4 font-black">{passTotal}</td>
                          <td className="p-4 font-black">{failTotal}</td>
                          <td className="p-4 font-black">{grandTotal}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Metric
                      label="P(pass | attended)"
                      value={passGivenAttend.toFixed(2)}
                    />
                    <Metric
                      label="P(attended | pass)"
                      value={attendGivenPass.toFixed(2)}
                    />
                  </div>

                  <div className="mt-6 rounded-[1.5rem] bg-[#11100E] p-5 text-white">
                    <p className="text-sm leading-7 text-white/75">
                      P(pass | attended) uses the attended total as denominator.
                      P(attended | pass) uses the pass total as denominator.
                      This is why the two probabilities can differ.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </section>
        )}

        {activeTab === "Tree Diagram" && (
          <section className="mt-8 grid gap-6">
            <section className="overflow-hidden rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="p-6 md:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                    Diagnostic tree diagram
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    Follow the branches from disease status to test result.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-[#525252]">
                    This tree shows why the probability of a positive test among
                    diseased patients is not automatically the same as the
                    probability of disease among positive tests.
                  </p>

                  <div className="mt-6 grid gap-5">
                    <Slider label="Disease rate P(D)" value={diseaseRate} min={1} max={50} suffix="%" onChange={setDiseaseRate} />
                    <Slider label="Sensitivity P(+ | D)" value={sensitivity} min={50} max={100} suffix="%" onChange={setSensitivity} />
                    <Slider label="False positive rate P(+ | Dᶜ)" value={falsePositiveRate} min={0} max={50} suffix="%" onChange={setFalsePositiveRate} />
                  </div>
                </div>

                <div className="border-t border-[#E4DED2] bg-[#11100E] p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                    Tree output
                  </p>

                  <div className="mt-6 rounded-[2rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5">
                    <TreeVisual tree={tree} />
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <DarkMetric
                      label="P(D ∩ +)"
                      value={tree.diseaseAndPositive.toFixed(3)}
                    />
                    <DarkMetric
                      label="P(Dᶜ ∩ +)"
                      value={tree.noDiseaseAndPositive.toFixed(3)}
                    />
                    <DarkMetric
                      label="P(+)"
                      value={tree.totalPositive.toFixed(3)}
                    />
                    <DarkMetric
                      label="P(D | +)"
                      value={positivePredictiveValue.toFixed(3)}
                    />
                  </div>

                  <p className="mt-6 rounded-[1.5rem] bg-[#FFFCF6] p-5 text-sm font-bold leading-7 text-[#141210]">
                    P(D | +) depends not only on sensitivity, but also on the
                    disease rate and false positive rate. This idea leads
                    directly into Bayes' theorem.
                  </p>
                </div>
              </div>
            </section>
          </section>
        )}

        {activeTab === "Worked Examples" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Worked examples
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                Follow the denominator carefully.
              </h2>

              <div className="mt-6 grid gap-3">
                {workedExamples.map((example, index) => (
                  <button
                    key={example.title}
                    type="button"
                    onClick={() => setSelectedExample(index)}
                    className={`rounded-[1.25rem] border p-4 text-left transition ${
                      selectedExample === index
                        ? "border-stone-950 bg-[#11100E] text-white"
                        : "border-[#E4DED2] bg-[#F7F3EA] text-neutral-800 hover:bg-[#FFFCF6]"
                    }`}
                  >
                    <p className="text-sm font-black">{example.title}</p>
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
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
            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Practice studio
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                Practise identifying the condition first.
              </h2>

              <div className="mt-6 grid gap-3">
                {practiceQuestions.map((item, index) => (
                  <button
                    key={item.prompt}
                    type="button"
                    onClick={() => setSelectedPractice(index)}
                    className={`rounded-[1.25rem] border p-4 text-left transition ${
                      selectedPractice === index
                        ? "border-stone-950 bg-[#11100E] text-white"
                        : "border-[#E4DED2] bg-[#F7F3EA] text-neutral-800 hover:bg-[#FFFCF6]"
                    }`}
                  >
                    <p className="text-sm font-black">Question {index + 1}</p>
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Question {selectedPractice + 1}
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                {activePractice.prompt}
              </h2>

              <div className="mt-6 rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-6">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7a7063]">
                  Suggested answer
                </p>
                <p className="mt-3 text-base leading-8 text-[#525252]">
                  {activePractice.answer}
                </p>
              </div>
            </section>
          </section>
        )}

        {activeTab === "Reflection" && (
          <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
              Reflection
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Conditional probability is about choosing the correct denominator.
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "What information is given?",
                  body:
                    "The event after the vertical bar tells you which group or region becomes the new reference space.",
                },
                {
                  title: "What is the overlap?",
                  body:
                    "The numerator must satisfy both the target event and the condition.",
                },
                {
                  title: "Have you reversed the conditional?",
                  body:
                    "P(A | B) and P(B | A) answer different questions and usually have different values.",
                },
                {
                  title: "Why does this matter?",
                  body:
                    "Conditional probability is central to diagnostic testing, risk prediction, subgroup analysis and Bayesian updating.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
                >
                  <h3 className="text-xl font-black tracking-[-0.035em]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#525252]">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Quiz" && (
          <section className="mt-8 grid gap-6">
            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Lesson quiz
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Score: {score}/{quizQuestions.length}
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70">
                Check whether you can interpret conditional notation, choose
                the correct denominator and avoid reversing conditionals.
              </p>
            </section>

            <div className="grid gap-5">
              {quizQuestions.map((question, index) => {
                const selected = selectedAnswers[index];

                return (
                  <article
                    key={question.question}
                    className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm"
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
                                : "border-[#741018] bg-[#fff4ef] text-[#741018]"
                              : "border-[#E4DED2] bg-[#F7F3EA] text-[#525252] hover:bg-[#FFFCF6]"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>

                    {selected !== undefined && (
                      <p className="mt-4 rounded-2xl bg-[#11100E] px-4 py-3 text-sm font-bold leading-7 text-white">
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
    <div className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[#741018]">
        {speaker}
      </p>
      <p className="mt-2 text-sm leading-7 text-[#525252]">{text}</p>
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
        <span className="text-sm font-black text-[#525252]">{label}</span>
        <span className="rounded-full bg-[#11100E] px-3 py-1 text-xs font-black text-white">
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
        className="mt-3 w-full accent-[#741018]"
      />
    </label>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-[#E4DED2] bg-[#FFFCF6] p-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#7a7063]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-black tracking-[-0.04em]">{value}</p>
    </div>
  );
}

function DarkMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-4">
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
    <div className="rounded-[1.5rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5">
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
          ? "bg-[#11100E] text-white"
          : warning
            ? "border border-[#741018]/20 bg-[#fff4ef] text-[#741018]"
            : "border border-[#E4DED2] bg-[#F7F3EA] text-[#525252]"
      }`}
    >
      <p
        className={`text-xs font-black uppercase tracking-[0.18em] ${
          dark ? "text-white/45" : warning ? "text-[#741018]" : "text-[#7a7063]"
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

function VennConditional({
  pA,
  pB,
  overlap,
}: {
  pA: number;
  pB: number;
  overlap: number;
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
        opacity="0.08"
        stroke="#ffffff"
        strokeOpacity="0.18"
        strokeWidth="2"
      />

      <circle
        cx="220"
        cy="150"
        r={60 + pA * 0.45}
        fill="#ffffff"
        opacity="0.20"
        stroke="#ffffff"
        strokeWidth="4"
      />

      <circle
        cx="305"
        cy="150"
        r={60 + pB * 0.45}
        fill="#ffffff"
        opacity="0.10"
        stroke="#ffffff"
        strokeWidth="4"
      />

      <ellipse
        cx="262"
        cy="150"
        rx={25 + overlap * 0.45}
        ry="78"
        fill="#741018"
        opacity="0.85"
      />

      <text x="40" y="55" fontSize="18" fontWeight="900" fill="#ffffff">
        S
      </text>
      <text x="190" y="154" fontSize="26" fontWeight="900" fill="#ffffff">
        A
      </text>
      <text x="330" y="154" fontSize="26" fontWeight="900" fill="#ffffff">
        B
      </text>
      <text x="218" y="254" fontSize="15" fontWeight="800" fill="#ffffff">
        overlap A ∩ B = {(overlap / 100).toFixed(2)}
      </text>
    </svg>
  );
}

function TreeVisual({
  tree,
}: {
  tree: {
    disease: number;
    noDisease: number;
    posGivenDisease: number;
    negGivenDisease: number;
    posGivenNoDisease: number;
    negGivenNoDisease: number;
    diseaseAndPositive: number;
    diseaseAndNegative: number;
    noDiseaseAndPositive: number;
    noDiseaseAndNegative: number;
  };
}) {
  return (
    <svg viewBox="0 0 720 380" className="h-auto w-full">
      <line x1="80" y1="190" x2="260" y2="100" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="3" />
      <line x1="80" y1="190" x2="260" y2="280" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="3" />

      <line x1="260" y1="100" x2="500" y2="60" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="3" />
      <line x1="260" y1="100" x2="500" y2="140" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="3" />
      <line x1="260" y1="280" x2="500" y2="240" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="3" />
      <line x1="260" y1="280" x2="500" y2="320" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="3" />

      <Node x={80} y={190} label="Start" />
      <Node x={260} y={100} label={`D ${(tree.disease).toFixed(2)}`} />
      <Node x={260} y={280} label={`Dᶜ ${(tree.noDisease).toFixed(2)}`} />
      <Node x={500} y={60} label={`+ ${(tree.posGivenDisease).toFixed(2)}`} />
      <Node x={500} y={140} label={`− ${(tree.negGivenDisease).toFixed(2)}`} />
      <Node x={500} y={240} label={`+ ${(tree.posGivenNoDisease).toFixed(2)}`} />
      <Node x={500} y={320} label={`− ${(tree.negGivenNoDisease).toFixed(2)}`} />

      <text x="535" y="65" fontSize="16" fontWeight="800" fill="#ffffff">
        path: {tree.diseaseAndPositive.toFixed(3)}
      </text>
      <text x="535" y="145" fontSize="16" fontWeight="800" fill="#ffffff">
        path: {tree.diseaseAndNegative.toFixed(3)}
      </text>
      <text x="535" y="245" fontSize="16" fontWeight="800" fill="#ffffff">
        path: {tree.noDiseaseAndPositive.toFixed(3)}
      </text>
      <text x="535" y="325" fontSize="16" fontWeight="800" fill="#ffffff">
        path: {tree.noDiseaseAndNegative.toFixed(3)}
      </text>
    </svg>
  );
}

function Node({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="34" fill="#ffffff" />
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fontSize="15"
        fontWeight="900"
        fill="#141210"
      >
        {label}
      </text>
    </g>
  );
}
