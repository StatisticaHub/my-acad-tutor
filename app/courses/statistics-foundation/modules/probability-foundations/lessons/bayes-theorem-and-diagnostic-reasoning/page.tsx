"use client";

import LockedLessonGate from "@/components/course/LockedLessonGate";
import { isStatisticsFoundationLessonOpen } from "@/lib/statisticsFoundationAccess";

import { useMemo, useState } from "react";

const tabs = [
  "Learning Route",
  "Lecture",
  "Detailed Notes",
  "Bayes Lab",
  "Diagnostic Table",
  "Tree Diagram",
  "Worked Examples",
  "Practice Studio",
  "Reflection",
  "Quiz",
];

const learningRoute = [
  {
    time: "0–10 min",
    title: "Continue from conditional probability",
    body:
      "Recall from Lesson 3.4 that information can change probability. Bayes’ theorem begins exactly there: after observing evidence, we update the probability of the event we care about.",
  },
  {
    time: "10–25 min",
    title: "Identify the reversal problem",
    body:
      "Understand why P(A | B) and P(B | A) answer different questions, even though they involve the same two events.",
  },
  {
    time: "25–45 min",
    title: "Derive Bayes’ theorem",
    body:
      "Use the joint probability identity P(A ∩ B) = P(A | B)P(B) = P(B | A)P(A) to derive the updating formula.",
  },
  {
    time: "45–70 min",
    title: "Translate to diagnostic testing",
    body:
      "Connect disease prevalence, sensitivity, specificity, false positives and false negatives to the Bayes formula.",
  },
  {
    time: "70–100 min",
    title: "Use natural frequencies",
    body:
      "Turn percentages into counts so the difference between true positives and false positives becomes visible.",
  },
  {
    time: "100–130 min",
    title: "Interpret evidence responsibly",
    body:
      "Explain why a positive test can be strong evidence in one population and weak evidence in another population, even when the test is unchanged.",
  },
];

const lectureCards = [
  {
    title: "Bayes starts with information changing probability",
    body:
      "In Lesson 3.4, independence meant that knowing B did not change P(A). Bayes’ theorem is used when evidence does change probability and we want to measure that change correctly.",
    example:
      "If a patient tests positive, the probability of disease usually changes from the background prevalence to a new updated value.",
  },
  {
    title: "Conditional probabilities have direction",
    body:
      "P(A | B) means the probability of A after B is known. P(B | A) means the probability of B after A is known. These are not interchangeable.",
    example:
      "P(positive test | disease) is sensitivity. P(disease | positive test) is the clinically useful updated probability.",
  },
  {
    title: "The prior is the starting point",
    body:
      "The prior probability is the probability before the new evidence is observed. It is not a guess; it is the best probability assessment before the current evidence is used.",
    example:
      "For a screening test, prevalence is often the prior probability of disease.",
  },
  {
    title: "The likelihood describes how evidence behaves",
    body:
      "The likelihood describes how compatible the evidence is with a possible state of the world.",
    example:
      "Sensitivity is the probability of a positive test among diseased people, so it measures how often the evidence appears when disease is truly present.",
  },
  {
    title: "The posterior is the updated probability",
    body:
      "The posterior probability is the probability after using the evidence. Bayes’ theorem turns prior probability plus evidence behaviour into posterior probability.",
    example:
      "P(disease | positive test) is a posterior probability because it comes after the positive test result is known.",
  },
  {
    title: "The denominator is all evidence routes",
    body:
      "The denominator in Bayes’ theorem counts every way the observed evidence can occur. In diagnostic testing, a positive test can be a true positive or a false positive.",
    example:
      "All positive tests = true positives + false positives.",
  },
  {
    title: "Base rates can dominate interpretation",
    body:
      "When a condition is rare, the non-diseased group is large. Even a small false positive rate can create many false positives.",
    example:
      "A 5% false positive rate among 9,900 non-diseased people gives 495 false positives.",
  },
  {
    title: "Natural frequencies reduce confusion",
    body:
      "Percentages can feel abstract. Counts out of 1,000 or 10,000 make the structure of the problem visible.",
    example:
      "Instead of saying prevalence is 1%, say 100 out of 10,000 people have disease.",
  },
];

const detailedNotes = [
  {
    title: "1. Starting point: conditional probability",
    formula: "P(A | B) = P(A ∩ B) / P(B), provided P(B) > 0",
    body:
      "Bayes’ theorem is not a new idea separate from conditional probability. It is a rearrangement of conditional probability. In Lesson 3.4, conditional probability was used to decide whether events were independent or dependent. Here, conditional probability becomes an updating tool.",
    derivation:
      "If B has occurred, the relevant sample space is B. The probability P(A | B) is therefore the share of B outcomes that also lie in A. This is why P(A | B) = P(A ∩ B)/P(B).",
    example:
      "If A means disease and B means a positive test, then P(A | B) means the probability of disease among people whose test is positive.",
    warning:
      "Always identify the condition first. The condition is the event after the vertical bar.",
  },
  {
    title: "2. The reversal problem",
    formula: "P(A | B) is generally not equal to P(B | A)",
    body:
      "Bayes’ theorem is needed because many real questions are reverse conditional probability questions. Often we know how likely evidence is under a condition, but we want to know how likely the condition is after observing the evidence.",
    derivation:
      "P(A | B) has denominator P(B), while P(B | A) has denominator P(A). Since these denominators usually differ, the two conditional probabilities usually differ.",
    example:
      "P(positive test | disease) can be 0.95, but P(disease | positive test) can be much lower if disease prevalence is low.",
    warning:
      "The reverse probability cannot be obtained by simply swapping the terms.",
  },
  {
    title: "3. Deriving Bayes’ theorem from joint probability",
    formula: "P(A | B) = P(B | A)P(A) / P(B)",
    body:
      "The derivation of Bayes’ theorem comes from writing the same overlap, A ∩ B, in two equivalent ways.",
    derivation:
      "From conditional probability, P(A ∩ B) = P(A | B)P(B). Also, P(A ∩ B) = P(B | A)P(A). Equating the two expressions gives P(A | B)P(B) = P(B | A)P(A). Dividing by P(B) gives P(A | B) = P(B | A)P(A)/P(B).",
    example:
      "To find P(disease | positive), use P(positive | disease), P(disease) and P(positive).",
    warning:
      "The denominator P(B) must represent the total probability of the evidence, not only the part that supports A.",
  },
  {
    title: "4. Bayes in prior-likelihood-posterior language",
    formula: "Posterior = (Likelihood × Prior) / Evidence",
    body:
      "Bayesian updating can be read as a movement from prior to posterior. The prior is the probability before evidence. The likelihood is how expected the evidence is if the event is true. The evidence term normalises the calculation by including all ways the evidence could arise.",
    derivation:
      "In P(A | B) = P(B | A)P(A)/P(B), P(A) is the prior, P(B | A) is the likelihood, P(B) is the evidence, and P(A | B) is the posterior.",
    example:
      "Before testing, a patient has a disease probability based on prevalence or risk group. After a positive test, this probability is updated to a posterior probability.",
    warning:
      "A posterior probability is not produced by the test alone. It also depends on the prior probability.",
  },
  {
    title: "5. Diagnostic notation",
    formula: "P(D | +) = [P(+ | D)P(D)] / P(+)",
    body:
      "Let D represent disease and + represent a positive test. The main diagnostic question is P(D | +): among people who test positive, what proportion truly have disease?",
    derivation:
      "Bayes’ theorem gives P(D | +) = P(+ | D)P(D)/P(+). The numerator is the true-positive route. The denominator is all positive tests.",
    example:
      "If sensitivity is 95% and prevalence is 1%, then P(+ | D) = 0.95 and P(D) = 0.01.",
    warning:
      "The clinical question is usually P(D | +), not P(+ | D).",
  },
  {
    title: "6. Expanding the denominator in diagnostics",
    formula: "P(+) = P(+ | D)P(D) + P(+ | Dᶜ)P(Dᶜ)",
    body:
      "The denominator P(+) is the total probability of a positive test. A positive test can occur among diseased people or among non-diseased people.",
    derivation:
      "The event + can be split into two disjoint routes: D ∩ + and Dᶜ ∩ +. Therefore P(+) = P(D ∩ +) + P(Dᶜ ∩ +) = P(+ | D)P(D) + P(+ | Dᶜ)P(Dᶜ).",
    example:
      "True positives come from P(+ | D)P(D). False positives come from P(+ | Dᶜ)P(Dᶜ).",
    warning:
      "Ignoring the false-positive route overstates the probability of disease after a positive test.",
  },
  {
    title: "7. Sensitivity",
    formula: "Sensitivity = P(+ | D)",
    body:
      "Sensitivity is the probability that the test is positive among people who truly have disease. It measures how well the test detects disease when disease is present.",
    derivation:
      "Sensitivity = true positives / all diseased people. If 100 people have disease and 95 test positive, sensitivity is 95/100 = 0.95.",
    example:
      "A highly sensitive test has few false negatives.",
    warning:
      "Sensitivity does not answer the question: given a positive test, does the patient have disease?",
  },
  {
    title: "8. Specificity and false positive rate",
    formula: "Specificity = P(− | Dᶜ), False positive rate = 1 − specificity",
    body:
      "Specificity is the probability that the test is negative among people who do not have disease. Its complement is the false positive rate.",
    derivation:
      "Among non-diseased people, the test can either be negative or positive. Therefore P(− | Dᶜ) + P(+ | Dᶜ) = 1. So P(+ | Dᶜ) = 1 − specificity.",
    example:
      "If specificity is 95%, the false positive rate is 5%.",
    warning:
      "A small false positive rate can still create many false positives when the non-diseased population is large.",
  },
  {
    title: "9. Positive predictive value",
    formula: "PPV = P(D | +) = True positives / All positive tests",
    body:
      "Positive predictive value is the probability that a person truly has disease after a positive test result. It is often the probability that patients and clinicians want to interpret.",
    derivation:
      "PPV = true positives / (true positives + false positives). This is the natural-frequency version of Bayes’ theorem.",
    example:
      "If there are 95 true positives and 495 false positives, PPV = 95/(95 + 495) = 95/590 ≈ 0.161.",
    warning:
      "High test accuracy does not guarantee high PPV when prevalence is low.",
  },
  {
    title: "10. Negative predictive value",
    formula: "NPV = P(Dᶜ | −) = True negatives / All negative tests",
    body:
      "Negative predictive value is the probability that a person truly does not have disease after a negative test result.",
    derivation:
      "NPV = true negatives / (true negatives + false negatives). It is another posterior probability, but conditioned on a negative test.",
    example:
      "In a low-prevalence setting, NPV is often extremely high because most people truly do not have disease.",
    warning:
      "A high NPV may partly reflect low prevalence, not only excellent test performance.",
  },
  {
    title: "11. Base-rate effect",
    formula: "P(D | +) depends strongly on P(D)",
    body:
      "The base rate is the background probability of disease. In screening, this is often prevalence. Bayes’ theorem shows that the base rate is not optional; it is part of the calculation.",
    derivation:
      "When P(D) is small, P(Dᶜ) is large. Even if P(+ | Dᶜ) is small, multiplying it by a large P(Dᶜ) can produce many false positives.",
    example:
      "With 1% prevalence in 10,000 people, 9,900 people do not have disease. A 5% false positive rate among them gives 495 false positives.",
    warning:
      "Base-rate neglect is the error of interpreting evidence without considering the background probability.",
  },
  {
    title: "12. Bayes and independence from Lesson 3.4",
    formula: "If evidence is independent of A, then P(A | B) = P(A)",
    body:
      "Bayes’ theorem and independence are connected. If B is independent of A, then observing B does not change the probability of A. In that case, the posterior equals the prior.",
    derivation:
      "If A and B are independent, P(A | B) = P(A). Bayes’ theorem then confirms that the evidence B has no updating power for A.",
    example:
      "A coin toss result should not update the probability that a patient has a disease, because the coin toss is independent of disease status.",
    warning:
      "Useful evidence is evidence that changes probability. Irrelevant evidence leaves the probability unchanged.",
  },
];

const workedExamples = [
  {
    title: "Rare disease screening",
    question:
      "A disease affects 1% of a population. A test has 95% sensitivity and 95% specificity. If a person tests positive, what is the approximate probability they truly have the disease?",
    working:
      "Use 10,000 people. About 100 have disease and 9,900 do not. True positives = 95% of 100 = 95. False positives = 5% of 9,900 = 495. Total positive tests = 95 + 495 = 590.",
    answer: "P(disease | positive) = 95/590 ≈ 0.161, or about 16.1%.",
    deeper:
      "The test is accurate, but the condition is rare. The false positives come from a very large non-diseased group, so they outnumber the true positives.",
  },
  {
    title: "High-risk clinic",
    question:
      "The same test is used in a clinic where disease prevalence is 20%. Sensitivity and specificity remain 95%. What is P(disease | positive)?",
    working:
      "Use 10,000 people. About 2,000 have disease and 8,000 do not. True positives = 0.95 × 2,000 = 1,900. False positives = 0.05 × 8,000 = 400. Total positives = 2,300.",
    answer: "P(disease | positive) = 1,900/2,300 ≈ 0.826, or about 82.6%.",
    deeper:
      "The test did not change. The interpretation changed because the prior probability was much higher.",
  },
  {
    title: "Negative result in rare disease screening",
    question:
      "Using the 1% prevalence example with 95% sensitivity and 95% specificity, what is P(no disease | negative)?",
    working:
      "Out of 100 diseased people, 5 are false negatives. Out of 9,900 non-diseased people, 9,405 are true negatives. Total negatives = 9,405 + 5 = 9,410.",
    answer: "P(no disease | negative) = 9,405/9,410 ≈ 0.9995.",
    deeper:
      "The negative result is very reassuring because disease is rare and the test misses only a small fraction of diseased people.",
  },
  {
    title: "Moderate test in a common condition",
    question:
      "A condition has prevalence 30%. A test has sensitivity 80% and specificity 85%. What is P(disease | positive)?",
    working:
      "Use 1,000 people. 300 have disease and 700 do not. True positives = 0.80 × 300 = 240. False positives = 0.15 × 700 = 105. Total positives = 345.",
    answer: "P(disease | positive) = 240/345 ≈ 0.696, or about 69.6%.",
    deeper:
      "The positive result is meaningful because the condition is fairly common, but false positives still reduce certainty.",
  },
  {
    title: "Reverse-probability trap",
    question:
      "A student says: ‘The test sensitivity is 90%, so a positive result means there is a 90% chance of disease.’ What is wrong?",
    working:
      "Sensitivity is P(+ | D). The student interpreted it as P(D | +). These probabilities have opposite directions.",
    answer:
      "The statement confuses the probability of evidence given disease with the probability of disease given evidence.",
    deeper:
      "Bayes’ theorem is precisely the tool needed to move from P(+ | D) to P(D | +), using prevalence and the false-positive rate.",
  },
];

const practiceQuestions = [
  {
    prompt:
      "A disease affects 10% of 1,000 people. A test has 90% sensitivity and 90% specificity. How many false positives are expected?",
    answer:
      "There are 900 non-diseased people. Specificity is 90%, so the false positive rate is 10%. False positives = 10% of 900 = 90.",
  },
  {
    prompt:
      "Explain the difference between sensitivity and positive predictive value.",
    answer:
      "Sensitivity is P(+ | D), the probability of a positive test among diseased people. Positive predictive value is P(D | +), the probability of disease among people who test positive.",
  },
  {
    prompt:
      "If prevalence increases but sensitivity and specificity stay the same, what usually happens to PPV?",
    answer:
      "PPV usually increases because true positives become a larger share of all positive test results.",
  },
  {
    prompt:
      "A test has specificity 98%. What is the false positive rate?",
    answer:
      "The false positive rate is 1 − specificity = 1 − 0.98 = 0.02, or 2%.",
  },
  {
    prompt:
      "Why are natural frequencies helpful in Bayes problems?",
    answer:
      "They make true positives, false positives, true negatives and false negatives visible as counts, which reduces confusion caused by abstract percentages.",
  },
  {
    prompt:
      "If evidence B is independent of event A, what is P(A | B)?",
    answer:
      "If A and B are independent, P(A | B) = P(A). The evidence does not update the probability of A.",
  },
];

const quizQuestions = [
  {
    question: "What does Bayes’ theorem help us calculate?",
    options: [
      "Only probabilities of disjoint events",
      "An updated probability after evidence is observed",
      "Only the mean of a dataset",
      "Only the probability of impossible events",
    ],
    answer: 1,
    feedback:
      "Bayes’ theorem updates probability after evidence is observed.",
  },
  {
    question: "Which expression represents sensitivity?",
    options: [
      "P(D | +)",
      "P(+ | D)",
      "P(Dᶜ | −)",
      "P(+)",
    ],
    answer: 1,
    feedback:
      "Sensitivity is P(+ | D), the probability of a positive test among diseased people.",
  },
  {
    question: "Which expression represents positive predictive value?",
    options: [
      "P(+ | D)",
      "P(− | Dᶜ)",
      "P(D | +)",
      "P(+ | Dᶜ)",
    ],
    answer: 2,
    feedback:
      "Positive predictive value is P(D | +), the probability of disease after a positive test.",
  },
  {
    question: "If specificity is 95%, what is the false positive rate?",
    options: ["95%", "50%", "5%", "0%"],
    answer: 2,
    feedback:
      "False positive rate is 1 − specificity = 1 − 0.95 = 0.05, or 5%.",
  },
  {
    question: "Why can PPV be low when disease prevalence is low?",
    options: [
      "Because sensitivity must be zero",
      "Because the non-diseased group is large and can produce many false positives",
      "Because Bayes’ theorem cannot be used",
      "Because prevalence never matters",
    ],
    answer: 1,
    feedback:
      "A large non-diseased group can generate many false positives even with a small false positive rate.",
  },
  {
    question: "What is the denominator in the diagnostic Bayes formula for P(D | +)?",
    options: [
      "Only true positives",
      "Only false positives",
      "All positive tests",
      "All negative tests",
    ],
    answer: 2,
    feedback:
      "The denominator is all positive tests: true positives plus false positives.",
  },
  {
    question: "If evidence is independent of A, what happens to P(A) after observing that evidence?",
    options: [
      "It must become 1",
      "It must become 0",
      "It remains unchanged",
      "It becomes impossible to calculate",
    ],
    answer: 2,
    feedback:
      "Independent evidence does not change the probability: P(A | B) = P(A).",
  },
];

export default function BayesTheoremDiagnosticReasoningLesson() {
  const lessonCode = "3.5";

  if (!isStatisticsFoundationLessonOpen(lessonCode)) {
    return (
      <LockedLessonGate
        lessonCode={lessonCode}
        lessonTitle="Bayes’ theorem and diagnostic reasoning"
        moduleTitle="Module 3: Probability Foundations"
      />
    );
  }

  const [activeTab, setActiveTab] = useState("Learning Route");

  const [prevalence, setPrevalence] = useState(1);
  const [sensitivity, setSensitivity] = useState(95);
  const [specificity, setSpecificity] = useState(95);
  const [population, setPopulation] = useState(10000);

  const [diseaseAndPositive, setDiseaseAndPositive] = useState(95);
  const [diseaseAndNegative, setDiseaseAndNegative] = useState(5);
  const [noDiseaseAndPositive, setNoDiseaseAndPositive] = useState(495);
  const [noDiseaseAndNegative, setNoDiseaseAndNegative] = useState(9405);

  const [firstPrevalence, setFirstPrevalence] = useState(10);
  const [positiveGivenDisease, setPositiveGivenDisease] = useState(90);
  const [positiveGivenNoDisease, setPositiveGivenNoDisease] = useState(10);

  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedPractice, setSelectedPractice] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const diagnostic = useMemo(() => {
    const diseased = Math.round(population * (prevalence / 100));
    const notDiseased = Math.max(0, population - diseased);

    const truePositive = Math.round(diseased * (sensitivity / 100));
    const falseNegative = Math.max(0, diseased - truePositive);

    const trueNegative = Math.round(notDiseased * (specificity / 100));
    const falsePositive = Math.max(0, notDiseased - trueNegative);

    const positiveTotal = truePositive + falsePositive;
    const negativeTotal = trueNegative + falseNegative;

    const ppv = positiveTotal === 0 ? 0 : truePositive / positiveTotal;
    const npv = negativeTotal === 0 ? 0 : trueNegative / negativeTotal;

    return {
      diseased,
      notDiseased,
      truePositive,
      falsePositive,
      trueNegative,
      falseNegative,
      positiveTotal,
      negativeTotal,
      ppv,
      npv,
    };
  }, [population, prevalence, sensitivity, specificity]);

  const tableTotals = useMemo(() => {
    const diseaseTotal = diseaseAndPositive + diseaseAndNegative;
    const noDiseaseTotal = noDiseaseAndPositive + noDiseaseAndNegative;
    const positiveTotal = diseaseAndPositive + noDiseaseAndPositive;
    const negativeTotal = diseaseAndNegative + noDiseaseAndNegative;
    const grand = diseaseTotal + noDiseaseTotal;

    const prevalenceFromTable = grand === 0 ? 0 : diseaseTotal / grand;
    const sensitivityFromTable = diseaseTotal === 0 ? 0 : diseaseAndPositive / diseaseTotal;
    const specificityFromTable = noDiseaseTotal === 0 ? 0 : noDiseaseAndNegative / noDiseaseTotal;
    const ppvFromTable = positiveTotal === 0 ? 0 : diseaseAndPositive / positiveTotal;
    const npvFromTable = negativeTotal === 0 ? 0 : noDiseaseAndNegative / negativeTotal;

    return {
      diseaseTotal,
      noDiseaseTotal,
      positiveTotal,
      negativeTotal,
      grand,
      prevalenceFromTable,
      sensitivityFromTable,
      specificityFromTable,
      ppvFromTable,
      npvFromTable,
    };
  }, [diseaseAndPositive, diseaseAndNegative, noDiseaseAndPositive, noDiseaseAndNegative]);

  const tree = useMemo(() => {
    const pD = firstPrevalence / 100;
    const pNotD = 1 - pD;
    const pPositiveGivenD = positiveGivenDisease / 100;
    const pPositiveGivenNotD = positiveGivenNoDisease / 100;

    const truePositivePath = pD * pPositiveGivenD;
    const falsePositivePath = pNotD * pPositiveGivenNotD;
    const allPositive = truePositivePath + falsePositivePath;
    const posterior = allPositive === 0 ? 0 : truePositivePath / allPositive;

    return {
      pD,
      pNotD,
      pPositiveGivenD,
      pPositiveGivenNotD,
      truePositivePath,
      falsePositivePath,
      allPositive,
      posterior,
    };
  }, [firstPrevalence, positiveGivenDisease, positiveGivenNoDisease]);

  const activeExample = workedExamples[selectedExample];
  const activePractice = practiceQuestions[selectedPractice];

  const score = quizQuestions.reduce((total, question, index) => {
    return selectedAnswers[index] === question.answer ? total + 1 : total;
  }, 0);

  return (
    <main className="min-h-screen bg-[#F7F3EA] px-5 py-8 text-[#141210] md:px-8 md:py-14">
      <section className="mx-auto max-w-7xl">
        <a
          href="/courses/statistics-foundation/modules/probability-foundations/"
          className="text-sm font-black text-[#741018] hover:text-[#4d080e]"
        >
          ← Back to module
        </a>

        <section className="mt-8 overflow-hidden rounded-[2.5rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 md:p-10">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Statistics Foundation · Lesson 3.5
              </p>

              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-7xl">
                Bayes’ theorem and diagnostic reasoning.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">
                Bayes’ theorem continues the conditional probability ideas from
                Lesson 3.4. Instead of only asking whether information changes a
                probability, this lesson asks how much the probability should
                change after evidence is observed. Diagnostic testing provides a
                powerful example because it forces us to separate prevalence,
                sensitivity, specificity, false positives and posterior
                probability.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "130 minutes",
                  "No coding",
                  "Bayes updating",
                  "Diagnostic tables",
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
                Evidence updates probability; it does not replace context.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Prior: P(D)",
                  "Likelihood: P(+ | D)",
                  "False positive route: P(+ | Dᶜ)",
                  "Posterior: P(D | +)",
                  "PPV depends on prevalence",
                  "Natural frequencies prevent confusion",
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
                Move from changed probability to updated probability.
              </h2>

              <p className="mt-5 text-base leading-8 text-[#525252]">
                In Lesson 3.4, students asked whether one event changes another
                event’s probability. In this lesson, students learn the formal
                updating rule that tells us how to calculate the new probability
                after evidence arrives.
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
                Students should be able to update probability with evidence.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Explain why P(A | B) and P(B | A) are different.",
                  "Derive Bayes’ theorem from joint probability.",
                  "Identify prior, likelihood, evidence and posterior.",
                  "Interpret sensitivity and specificity correctly.",
                  "Calculate PPV and NPV using natural frequencies.",
                  "Explain why prevalence affects diagnostic interpretation.",
                  "Recognise the false-positive route in the denominator.",
                  "Connect Bayes’ theorem back to dependence from Lesson 3.4.",
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
                Bayes’ theorem is conditional probability used for updating.
              </h2>

              <p className="mt-5 text-base leading-8 text-[#525252]">
                The key question is no longer only: does B change the probability
                of A? The deeper question is: after B is observed, what should
                the new probability of A be?
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
                Mr. R connects Bayes back to dependence.
              </h2>

              <div className="mt-6 grid gap-4">
                <Dialogue
                  speaker="Mr. R"
                  text="In Lesson 3.4, we asked whether knowing B changes P(A). Today we go further: if B changes P(A), how do we calculate the new value?"
                />
                <Dialogue
                  speaker="Amelia"
                  text="So Bayes is about how much the probability changes after information arrives?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Exactly. Bayes’ theorem is the formal rule for updating probability after evidence."
                />
                <Dialogue
                  speaker="Ben"
                  text="But why can’t we just use P(positive test | disease)?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Because that is the direction from disease to test. A patient asks the reverse question: given the positive test, what is the probability of disease?"
                />
                <Dialogue
                  speaker="Chloe"
                  text="So sensitivity is not the same as the probability that a positive patient has disease?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Correct. Sensitivity is P(+ | D). The diagnostic question is P(D | +). Bayes’ theorem connects them."
                />
                <Dialogue
                  speaker="Daniel"
                  text="Where do false positives enter the formula?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="In the denominator. All positive tests include true positives and false positives. That is why prevalence and specificity matter."
                />
              </div>

              <div className="mt-8 rounded-[2rem] border border-[#741018]/20 bg-[#fff4ef] p-6">
                <h3 className="text-2xl font-black tracking-[-0.04em] text-[#741018]">
                  Lecture takeaway
                </h3>
                <p className="mt-3 text-sm font-bold leading-7 text-[#741018]">
                  Bayes’ theorem prevents reverse-probability errors. It tells
                  us that the probability of disease after a positive test
                  depends on the prior probability of disease, the test’s
                  sensitivity and the false-positive route.
                </p>
              </div>
            </section>
          </section>
        )}

        {activeTab === "Detailed Notes" && (
          <section className="mt-8 grid gap-5">
            {detailedNotes.map((note) => (
              <article
                key={note.title}
                className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8"
              >
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Detailed notes
                </p>
                <h2 className="mt-3 text-2xl font-black tracking-[-0.035em] md:text-3xl">
                  {note.title}
                </h2>
                <p className="mt-4 rounded-[1.25rem] bg-[#11100E] p-4 font-mono text-sm font-black text-white">
                  {note.formula}
                </p>
                <div className="mt-5 grid gap-4">
                  <InfoBlock title="Explanation" body={note.body} />
                  <InfoBlock title="Derivation" body={note.derivation} dark />
                  <InfoBlock title="Example" body={note.example} />
                  <InfoBlock title="Warning" body={note.warning} warning />
                </div>
              </article>
            ))}
          </section>
        )}

        {activeTab === "Bayes Lab" && (
          <section className="mt-8 grid gap-6">
            <section className="overflow-hidden rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
              <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                <div className="p-6 md:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                    Diagnostic Bayes explorer
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    Change the prior and test accuracy.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-[#525252]">
                    Adjust prevalence, sensitivity and specificity. Watch how
                    the probability of disease after a positive test changes.
                  </p>

                  <div className="mt-6 grid gap-5">
                    <Slider label="Population" value={population} min={1000} max={50000} suffix="" onChange={setPopulation} />
                    <Slider label="Prevalence P(D)" value={prevalence} min={1} max={50} suffix="%" onChange={setPrevalence} />
                    <Slider label="Sensitivity P(+ | D)" value={sensitivity} min={50} max={100} suffix="%" onChange={setSensitivity} />
                    <Slider label="Specificity P(− | Dᶜ)" value={specificity} min={50} max={100} suffix="%" onChange={setSpecificity} />
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Metric label="Diseased" value={diagnostic.diseased.toLocaleString()} />
                    <Metric label="Not diseased" value={diagnostic.notDiseased.toLocaleString()} />
                    <Metric label="True positives" value={diagnostic.truePositive.toLocaleString()} />
                    <Metric label="False positives" value={diagnostic.falsePositive.toLocaleString()} />
                  </div>
                </div>

                <div className="border-t border-[#E4DED2] bg-[#11100E] p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                    Posterior output
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    {formatPercent(diagnostic.ppv)} probability of disease after a positive test.
                  </h2>

                  <div className="mt-8 grid gap-4">
                    <DarkFormula
                      title="True-positive route"
                      formula={`${diagnostic.truePositive.toLocaleString()} true positives`}
                    />
                    <DarkFormula
                      title="False-positive route"
                      formula={`${diagnostic.falsePositive.toLocaleString()} false positives`}
                    />
                    <DarkFormula
                      title="All positive tests"
                      formula={`${diagnostic.positiveTotal.toLocaleString()} positive tests`}
                    />
                  </div>

                  <div className="mt-8 rounded-[2rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5">
                    <BayesBars
                      truePositive={diagnostic.truePositive}
                      falsePositive={diagnostic.falsePositive}
                    />
                  </div>

                  <p className="mt-6 rounded-[1.5rem] bg-[#FFFCF6] p-5 text-sm font-bold leading-7 text-[#141210]">
                    PPV = true positives ÷ all positive tests ={" "}
                    {diagnostic.truePositive.toLocaleString()} ÷{" "}
                    {diagnostic.positiveTotal.toLocaleString()} = {formatPercent(diagnostic.ppv)}.
                  </p>
                </div>
              </div>
            </section>
          </section>
        )}

        {activeTab === "Diagnostic Table" && (
          <section className="mt-8 grid gap-6">
            <section className="overflow-hidden rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
              <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                <div className="p-6 md:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                    Two-way diagnostic table
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    Build PPV and NPV from counts.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-[#525252]">
                    Adjust the four cells of the diagnostic table. The important
                    denominators are all positive tests for PPV and all negative
                    tests for NPV.
                  </p>

                  <div className="mt-6 grid gap-5">
                    <Slider label="Disease and positive" value={diseaseAndPositive} min={0} max={1000} onChange={setDiseaseAndPositive} />
                    <Slider label="Disease and negative" value={diseaseAndNegative} min={0} max={1000} onChange={setDiseaseAndNegative} />
                    <Slider label="No disease and positive" value={noDiseaseAndPositive} min={0} max={5000} onChange={setNoDiseaseAndPositive} />
                    <Slider label="No disease and negative" value={noDiseaseAndNegative} min={0} max={10000} onChange={setNoDiseaseAndNegative} />
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
                          <th className="p-4 text-left">True status</th>
                          <th className="p-4 text-left">Positive</th>
                          <th className="p-4 text-left">Negative</th>
                          <th className="p-4 text-left">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-[#E4DED2]">
                          <td className="p-4 font-black">Disease</td>
                          <td className="p-4">{diseaseAndPositive}</td>
                          <td className="p-4">{diseaseAndNegative}</td>
                          <td className="p-4 font-black">{tableTotals.diseaseTotal}</td>
                        </tr>
                        <tr className="border-t border-[#E4DED2]">
                          <td className="p-4 font-black">No disease</td>
                          <td className="p-4">{noDiseaseAndPositive}</td>
                          <td className="p-4">{noDiseaseAndNegative}</td>
                          <td className="p-4 font-black">{tableTotals.noDiseaseTotal}</td>
                        </tr>
                        <tr className="border-t border-[#E4DED2] bg-[#F7F3EA]">
                          <td className="p-4 font-black">Total</td>
                          <td className="p-4 font-black">{tableTotals.positiveTotal}</td>
                          <td className="p-4 font-black">{tableTotals.negativeTotal}</td>
                          <td className="p-4 font-black">{tableTotals.grand}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Metric label="Prevalence" value={formatPercent(tableTotals.prevalenceFromTable)} />
                    <Metric label="Sensitivity" value={formatPercent(tableTotals.sensitivityFromTable)} />
                    <Metric label="Specificity" value={formatPercent(tableTotals.specificityFromTable)} />
                    <Metric label="PPV" value={formatPercent(tableTotals.ppvFromTable)} />
                    <Metric label="NPV" value={formatPercent(tableTotals.npvFromTable)} />
                  </div>

                  <div className="mt-6 rounded-[1.5rem] bg-[#11100E] p-5 text-white">
                    <p className="text-sm leading-7 text-white/75">
                      PPV uses the positive-test column. NPV uses the negative-test
                      column. This is why reading the denominator correctly is
                      essential.
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
                    Bayes tree diagram
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    Follow the true-positive and false-positive routes.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-[#525252]">
                    A positive test can arise through two routes: disease then
                    positive, or no disease then positive. Bayes’ theorem compares
                    these two routes.
                  </p>

                  <div className="mt-6 grid gap-5">
                    <Slider label="Prevalence P(D)" value={firstPrevalence} min={1} max={80} suffix="%" onChange={setFirstPrevalence} />
                    <Slider label="P(+ | D)" value={positiveGivenDisease} min={1} max={99} suffix="%" onChange={setPositiveGivenDisease} />
                    <Slider label="P(+ | Dᶜ)" value={positiveGivenNoDisease} min={1} max={99} suffix="%" onChange={setPositiveGivenNoDisease} />
                  </div>
                </div>

                <div className="border-t border-[#E4DED2] bg-[#11100E] p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                    Tree output
                  </p>

                  <div className="mt-6 rounded-[2rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5">
                    <BayesTree tree={tree} />
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <DarkMetric label="True-positive path" value={tree.truePositivePath.toFixed(3)} />
                    <DarkMetric label="False-positive path" value={tree.falsePositivePath.toFixed(3)} />
                    <DarkMetric label="All positive evidence" value={tree.allPositive.toFixed(3)} />
                    <DarkMetric label="P(D | +)" value={formatPercent(tree.posterior)} />
                  </div>

                  <p className="mt-6 rounded-[1.5rem] bg-[#FFFCF6] p-5 text-sm font-bold leading-7 text-[#141210]">
                    Bayes compares the disease-positive path with all positive
                    paths. Posterior = true-positive path ÷ all positive paths.
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
                Interpret evidence without reversing probabilities incorrectly.
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
                Practise Bayes and diagnostic reasoning.
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
              Bayes asks how evidence should change belief.
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "What was the prior?",
                  body:
                    "Before interpreting evidence, identify the background probability or prevalence.",
                },
                {
                  title: "What is the direction?",
                  body:
                    "Check whether the probability is P(+ | D) or P(D | +). These are different questions.",
                },
                {
                  title: "Where are the false positives?",
                  body:
                    "The denominator for P(D | +) contains both true positives and false positives.",
                },
                {
                  title: "Did the evidence really update probability?",
                  body:
                    "Connect back to Lesson 3.4: if evidence is independent, the posterior equals the prior.",
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
                Check whether you can distinguish sensitivity, specificity,
                predictive values, prior probability and posterior probability.
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

function BayesBars({
  truePositive,
  falsePositive,
}: {
  truePositive: number;
  falsePositive: number;
}) {
  const total = truePositive + falsePositive;
  const trueShare = total === 0 ? 0 : truePositive / total;
  const falseShare = total === 0 ? 0 : falsePositive / total;

  return (
    <div className="grid gap-5">
      <div>
        <div className="mb-2 flex justify-between text-sm font-black text-white">
          <span>True positives among positives</span>
          <span>{formatPercent(trueShare)}</span>
        </div>
        <div className="h-5 overflow-hidden rounded-full bg-[#FFFCF6]/15">
          <div
            className="h-full rounded-full bg-[#FFFCF6]"
            style={{ width: `${Math.min(100, trueShare * 100)}%` }}
          />
        </div>
      </div>

      <div>
        <div className="mb-2 flex justify-between text-sm font-black text-white">
          <span>False positives among positives</span>
          <span>{formatPercent(falseShare)}</span>
        </div>
        <div className="h-5 overflow-hidden rounded-full bg-[#FFFCF6]/15">
          <div
            className="h-full rounded-full bg-[#FFFCF6]"
            style={{ width: `${Math.min(100, falseShare * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function BayesTree({
  tree,
}: {
  tree: {
    pD: number;
    pNotD: number;
    pPositiveGivenD: number;
    pPositiveGivenNotD: number;
    truePositivePath: number;
    falsePositivePath: number;
    allPositive: number;
    posterior: number;
  };
}) {
  return (
    <svg viewBox="0 0 760 390" className="h-auto w-full">
      <line x1="80" y1="195" x2="285" y2="105" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="3" />
      <line x1="80" y1="195" x2="285" y2="285" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="3" />

      <line x1="285" y1="105" x2="545" y2="65" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="3" />
      <line x1="285" y1="105" x2="545" y2="145" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="3" />
      <line x1="285" y1="285" x2="545" y2="245" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="3" />
      <line x1="285" y1="285" x2="545" y2="325" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="3" />

      <TreeNode x={80} y={195} label="Start" />
      <TreeNode x={285} y={105} label={`D ${tree.pD.toFixed(2)}`} />
      <TreeNode x={285} y={285} label={`Dᶜ ${tree.pNotD.toFixed(2)}`} />
      <TreeNode x={545} y={65} label={`+ ${tree.pPositiveGivenD.toFixed(2)}`} />
      <TreeNode x={545} y={145} label={`− ${(1 - tree.pPositiveGivenD).toFixed(2)}`} />
      <TreeNode x={545} y={245} label={`+ ${tree.pPositiveGivenNotD.toFixed(2)}`} />
      <TreeNode x={545} y={325} label={`− ${(1 - tree.pPositiveGivenNotD).toFixed(2)}`} />

      <text x="40" y="365" fontSize="17" fontWeight="900" fill="#ffffff">
        P(D | +) = {formatPercent(tree.posterior)}
      </text>
    </svg>
  );
}

function TreeNode({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="38" fill="#ffffff" />
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fontSize="14"
        fontWeight="900"
        fill="#141210"
      >
        {label}
      </text>
    </g>
  );
}

function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}
