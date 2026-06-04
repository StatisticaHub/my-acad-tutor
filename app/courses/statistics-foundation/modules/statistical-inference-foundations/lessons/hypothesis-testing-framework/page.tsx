"use client";

import LockedLessonGate from "@/components/course/LockedLessonGate";
import { isStatisticsFoundationLessonOpen } from "@/lib/statisticsFoundationAccess";


import { useMemo, useState } from "react";

const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (
    href.startsWith("#") ||
    href.startsWith("http") ||
    href.startsWith("mailto:")
  ) {
    return href;
  }

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}/`;
}

const tabs = [
  "Learning Route",
  "Lecture",
  "Detailed Notes",
  "Test Builder",
  "Null Distribution Lab",
  "Decision Regions",
  "Worked Examples",
  "Practice Studio",
  "Reflection",
  "Quiz",
];

const learningRoute = [
  {
    time: "0–15 min",
    title: "Why hypothesis testing is needed",
    body:
      "Understand hypothesis testing as a formal way to judge whether observed data are surprising under a baseline assumption.",
  },
  {
    time: "15–35 min",
    title: "Null and alternative hypotheses",
    body:
      "Learn how H₀ represents the baseline claim and H₁ represents the direction or type of evidence being investigated.",
  },
  {
    time: "35–60 min",
    title: "Test statistics",
    body:
      "Study how an estimate is standardised by its standard error to measure distance from the null value.",
  },
  {
    time: "60–85 min",
    title: "Null distributions",
    body:
      "Understand the probability distribution of the test statistic if the null hypothesis were true.",
  },
  {
    time: "85–110 min",
    title: "P-values and rejection regions",
    body:
      "Connect extremeness, tail areas, p-values and significance-level decision rules.",
  },
  {
    time: "110–140 min",
    title: "Statistical decisions",
    body:
      "Learn how to reject or not reject H₀ while avoiding overclaiming, causation mistakes and practical-importance errors.",
  },
];

const lectureCards = [
  {
    title: "Hypothesis testing starts with a baseline claim",
    body:
      "The null hypothesis represents the claim being tested against the data. It often states no effect, no difference or a specified parameter value.",
    example:
      "H₀: μ = 50 may represent the claim that the population mean equals 50.",
  },
  {
    title: "The alternative describes the evidence we are looking for",
    body:
      "The alternative hypothesis states the direction or type of departure from the null.",
    example:
      "H₁: μ > 50 looks for evidence that the population mean is greater than 50.",
  },
  {
    title: "A test statistic measures distance from the null",
    body:
      "The test statistic compares the observed estimate with the null value using the standard error as the unit of distance.",
    example:
      "z = (x̄ − μ₀) / SE tells us how many standard errors x̄ is from μ₀.",
  },
  {
    title: "The null distribution defines what is surprising",
    body:
      "The null distribution shows how the test statistic would behave if H₀ were true.",
    example:
      "If H₀ is true, a z statistic is often compared with a standard normal distribution.",
  },
  {
    title: "The p-value measures extremeness under H₀",
    body:
      "A p-value is the probability, assuming H₀ is true, of getting a result at least as extreme as the observed one.",
    example:
      "A small p-value means the observed result would be unusual under the null model.",
  },
  {
    title: "A decision is not the same as truth",
    body:
      "Rejecting H₀ means the data are sufficiently inconsistent with H₀ under the chosen rule. It does not prove H₁ with certainty.",
    example:
      "Failing to reject H₀ does not prove that there is no effect.",
  },
];

const detailedNotes = [
  {
    title: "1. The purpose of hypothesis testing",
    formula: "Data compared against a null model",
    body:
      "Hypothesis testing is a framework for judging whether observed data are unusually far from what would be expected under a specified baseline assumption.",
    derivation:
      "Suppose a parameter θ has a hypothesised value θ₀ under H₀. We collect data and compute an estimate θ̂. If θ̂ is close to θ₀ relative to its standard error, the data are not surprising under H₀. If θ̂ is far from θ₀ relative to its standard error, the data may provide evidence against H₀.",
    example:
      "If a medicine is claimed to have no effect, a trial estimate far from zero relative to its standard error may challenge that claim.",
    warning:
      "Hypothesis testing does not measure whether a claim is philosophically true. It measures how compatible the data are with a statistical model.",
  },
  {
    title: "2. Null hypothesis",
    formula: "H₀: θ = θ₀",
    body:
      "The null hypothesis is the baseline statement being tested. It often represents no difference, no effect, no association or a specific parameter value.",
    derivation:
      "The null must be precise enough to generate a probability model for the test statistic. Without a null model, we cannot calculate how surprising the observed result is.",
    example:
      "For testing whether a population mean equals 100, H₀: μ = 100.",
    warning:
      "The null is not always what the researcher believes. It is the reference model used for testing.",
  },
  {
    title: "3. Alternative hypothesis",
    formula: "H₁: θ ≠ θ₀, θ > θ₀, or θ < θ₀",
    body:
      "The alternative hypothesis describes the departure from H₀ that the study is designed to detect.",
    derivation:
      "If departures in both directions matter, use a two-sided alternative: θ ≠ θ₀. If only increases matter, use θ > θ₀. If only decreases matter, use θ < θ₀.",
    example:
      "If a researcher wants to know whether a treatment changes mean blood pressure in either direction, H₁: μ ≠ μ₀.",
    warning:
      "The alternative should be chosen before seeing the data. Choosing it after seeing the result is biased.",
  },
  {
    title: "4. Test statistic",
    formula: "test statistic = (estimate − null value) / SE",
    body:
      "A test statistic converts the observed difference from the null into standard-error units.",
    derivation:
      "The raw difference θ̂ − θ₀ is difficult to interpret without knowing its sampling variability. Dividing by SE(θ̂) standardises the difference. A value of 2 means the estimate is 2 standard errors from the null value.",
    example:
      "If x̄ = 54, μ₀ = 50 and SE = 2, then z = (54 − 50)/2 = 2.",
    warning:
      "A large raw difference is not necessarily strong evidence if the standard error is also large.",
  },
  {
    title: "5. Null distribution",
    formula: "Distribution of test statistic assuming H₀ is true",
    body:
      "The null distribution describes how the test statistic would vary if the null hypothesis were true.",
    derivation:
      "If H₀ is true, then θ = θ₀. Repeated samples would produce different θ̂ values. After standardisation, the test statistics form a distribution. This reference distribution allows us to judge whether the observed statistic is ordinary or extreme under H₀.",
    example:
      "For a large-sample mean test with known σ, the z statistic approximately follows N(0, 1) under H₀.",
    warning:
      "The null distribution depends on assumptions such as independence, sample size, variance estimation and model choice.",
  },
  {
    title: "6. One-sided and two-sided tests",
    formula: "Two-sided: H₁: θ ≠ θ₀; one-sided: H₁: θ > θ₀ or θ < θ₀",
    body:
      "The alternative hypothesis determines which tail or tails of the null distribution count as evidence.",
    derivation:
      "If H₁: θ > θ₀, large positive test statistics are evidence. If H₁: θ < θ₀, large negative test statistics are evidence. If H₁: θ ≠ θ₀, both large positive and large negative test statistics count as evidence.",
    example:
      "A two-sided test asks whether the effect differs from zero in either direction.",
    warning:
      "A one-sided test should not be used merely because it gives a smaller p-value.",
  },
  {
    title: "7. P-value",
    formula: "p = P(result at least as extreme as observed | H₀ true)",
    body:
      "The p-value is a probability calculated under the assumption that the null hypothesis is true.",
    derivation:
      "Once the observed test statistic is calculated, the p-value is the tail area beyond that statistic in the direction specified by H₁. For a two-sided test, both tails as extreme as the observed statistic are included.",
    example:
      "If z = 2 in a two-sided test, the p-value is about 0.046.",
    warning:
      "A p-value is not the probability that H₀ is true. It is calculated assuming H₀ is true.",
  },
  {
    title: "8. Significance level",
    formula: "α = chosen Type I error threshold",
    body:
      "The significance level α is the pre-chosen threshold for deciding when evidence is strong enough to reject H₀.",
    derivation:
      "If the p-value is less than or equal to α, the result falls in the rejection region. If p > α, the result is not sufficiently extreme under the chosen rule.",
    example:
      "At α = 0.05, a p-value of 0.03 leads to rejection of H₀, while a p-value of 0.12 does not.",
    warning:
      "The 0.05 threshold is conventional, not magical. Interpretation should also consider effect size, uncertainty and study design.",
  },
  {
    title: "9. Rejection region",
    formula: "Reject H₀ if test statistic falls in critical region",
    body:
      "The rejection region is the set of test statistic values considered too extreme to be reasonably consistent with H₀ under the chosen α.",
    derivation:
      "For a two-sided z test at α = 0.05, the rejection region is approximately z ≤ −1.96 or z ≥ 1.96. These cutoffs leave 2.5% in each tail.",
    example:
      "If z = 2.4 in a two-sided 5% test, the statistic is beyond 1.96, so H₀ is rejected.",
    warning:
      "Critical-value decisions and p-value decisions should agree when they use the same test and α.",
  },
  {
    title: "10. Fail to reject is not accept",
    formula: "p > α → fail to reject H₀",
    body:
      "When the p-value is greater than α, we fail to reject H₀. This does not prove H₀ is true.",
    derivation:
      "A non-small p-value means the data are not sufficiently surprising under H₀. But this may happen because H₀ is approximately true, because the sample is small, because variability is high, or because the study lacks power.",
    example:
      "If p = 0.28, we do not have strong evidence against H₀, but we cannot conclude there is definitely no effect.",
    warning:
      "Absence of evidence is not evidence of absence, especially in small or imprecise studies.",
  },
  {
    title: "11. Statistical significance and practical importance",
    formula: "Small p-value ≠ important effect",
    body:
      "A result can be statistically significant but practically unimportant, especially in very large samples.",
    derivation:
      "The test statistic divides the estimated effect by its standard error. Large samples can make SE very small, so even a tiny effect can produce a large test statistic and small p-value.",
    example:
      "A mean difference of 0.2 units may be statistically significant in a huge sample but irrelevant in practice.",
    warning:
      "Always interpret p-values alongside effect size, confidence intervals, subject-matter context and study quality.",
  },
  {
    title: "12. Hypothesis testing workflow",
    formula: "H₀ → H₁ → statistic → null distribution → p-value → decision → interpretation",
    body:
      "A complete hypothesis test follows a structured sequence. Each step should be stated clearly.",
    derivation:
      "First specify H₀ and H₁. Then choose a statistic whose null distribution is known or approximated. Compute the observed statistic and p-value. Compare with α if a decision rule is needed. Finally, interpret the result in context.",
    example:
      "A one-sample mean test states H₀: μ = μ₀, computes z or t, obtains a p-value and reports whether the data provide evidence against μ = μ₀.",
    warning:
      "Do not begin with a p-value. A p-value only has meaning after the hypotheses, statistic and model assumptions are clear.",
  },
];

const workedExamples = [
  {
    title: "One-sample z test",
    question:
      "A sample has x̄ = 54, known σ = 10 and n = 25. Test H₀: μ = 50 against H₁: μ ≠ 50 using a z statistic.",
    working:
      "SE = σ/√n = 10/√25 = 2. Test statistic z = (x̄ − μ₀)/SE = (54 − 50)/2 = 2. For a two-sided test, z = 2 gives p ≈ 0.046.",
    answer:
      "At α = 0.05, p ≈ 0.046, so we reject H₀. The data provide evidence that μ differs from 50.",
    deeper:
      "The estimate is 2 standard errors above the null value. Since this is fairly far into the tails of the null distribution, the result is statistically significant at 5%.",
  },
  {
    title: "Failing to reject",
    question:
      "A sample gives x̄ = 52, μ₀ = 50 and SE = 3. Test H₀: μ = 50 against H₁: μ ≠ 50.",
    working:
      "z = (52 − 50)/3 = 0.667. A two-sided p-value is approximately 0.505. This is much larger than 0.05.",
    answer:
      "We fail to reject H₀ at α = 0.05.",
    deeper:
      "This does not prove μ = 50. It means the observed difference is not large relative to the standard error.",
  },
  {
    title: "One-sided test",
    question:
      "A researcher tests whether a new teaching method increases the mean score above 70. A sample gives x̄ = 73 and SE = 1.5. State the hypotheses and compute the test statistic.",
    working:
      "The hypotheses are H₀: μ = 70 and H₁: μ > 70. The test statistic is z = (73 − 70)/1.5 = 2.",
    answer:
      "The observed statistic is z = 2 for an upper-tailed test.",
    deeper:
      "Because the alternative is μ > 70, only the upper tail counts as evidence. The one-sided p-value is about 0.023.",
  },
  {
    title: "Significance versus importance",
    question:
      "A huge study estimates a mean difference of 0.15 with SE = 0.03. Test against no difference.",
    working:
      "z = 0.15/0.03 = 5. This gives a very small p-value, so the result is statistically significant.",
    answer:
      "The result is statistically significant, but the effect size is only 0.15 units.",
    deeper:
      "A tiny standard error can make a small effect statistically significant. Practical importance must be judged separately.",
  },
];

const practiceQuestions = [
  {
    prompt:
      "State H₀ and H₁ for a two-sided test of whether a population mean differs from 100.",
    answer:
      "H₀: μ = 100. H₁: μ ≠ 100.",
  },
  {
    prompt:
      "A sample has x̄ = 82, μ₀ = 80 and SE = 1. What is the test statistic?",
    answer:
      "z = (82 − 80)/1 = 2.",
  },
  {
    prompt:
      "If p = 0.03 and α = 0.05, what decision is made?",
    answer:
      "Since p ≤ α, reject H₀.",
  },
  {
    prompt:
      "If p = 0.18 and α = 0.05, what should be concluded?",
    answer:
      "Fail to reject H₀. Do not say H₀ is proven true.",
  },
  {
    prompt:
      "Explain why a small p-value does not necessarily mean a large or important effect.",
    answer:
      "The p-value depends on both effect size and standard error. With a very large sample, the standard error may be tiny, so even a small effect can produce a small p-value.",
  },
];

const quizQuestions = [
  {
    question: "What does the null hypothesis usually represent?",
    options: [
      "The baseline claim or no-effect statement being tested.",
      "The sample mean.",
      "The p-value.",
      "The confidence interval width.",
    ],
    answer: 0,
    feedback:
      "The null hypothesis is the baseline claim tested against the data.",
  },
  {
    question: "What does a test statistic usually measure?",
    options: [
      "The sample size only.",
      "The distance between estimate and null value in standard-error units.",
      "The probability that H₀ is true.",
      "The population size.",
    ],
    answer: 1,
    feedback:
      "A test statistic measures how far the estimate is from the null value relative to its SE.",
  },
  {
    question: "What is a null distribution?",
    options: [
      "The distribution of raw data only.",
      "The distribution of the test statistic assuming H₀ is true.",
      "The distribution after H₀ is proven false.",
      "The distribution of sample sizes.",
    ],
    answer: 1,
    feedback:
      "The null distribution is the reference distribution under H₀.",
  },
  {
    question: "What is a p-value?",
    options: [
      "The probability that H₀ is true.",
      "The probability that H₁ is true.",
      "The probability, assuming H₀ is true, of a result at least as extreme as observed.",
      "The size of the effect.",
    ],
    answer: 2,
    feedback:
      "A p-value is computed under the assumption that H₀ is true.",
  },
  {
    question: "If p = 0.04 and α = 0.05, what is the usual decision?",
    options: [
      "Reject H₀.",
      "Accept H₀ as true.",
      "Increase the sample size automatically.",
      "Ignore the result.",
    ],
    answer: 0,
    feedback:
      "Since p ≤ 0.05, reject H₀ using the 5% rule.",
  },
  {
    question: "If p = 0.20, what is the careful conclusion?",
    options: [
      "H₀ is definitely true.",
      "Fail to reject H₀.",
      "H₁ is definitely false.",
      "The effect is impossible.",
    ],
    answer: 1,
    feedback:
      "A large p-value means fail to reject H₀, not prove H₀.",
  },
  {
    question: "For a two-sided z test at α = 0.05, the approximate rejection cutoffs are:",
    options: [
      "±0.5",
      "±1.0",
      "±1.96",
      "±5.0",
    ],
    answer: 2,
    feedback:
      "For a two-sided 5% z test, the critical values are approximately ±1.96.",
  },
];

export default function HypothesisTestingFrameworkLesson() {
  const lessonCode = "4.3";

  if (!isStatisticsFoundationLessonOpen(lessonCode)) {
    return (
      <LockedLessonGate
        lessonCode={lessonCode}
        lessonTitle="Hypothesis testing framework"
        moduleTitle="Module 4: Statistical Inference Foundations"
      />
    );
  }

  const [activeTab, setActiveTab] = useState("Learning Route");

  const [estimate, setEstimate] = useState(54);
  const [nullValue, setNullValue] = useState(50);
  const [standardError, setStandardError] = useState(2);
  const [alpha, setAlpha] = useState(5);
  const [testType, setTestType] = useState<"two-sided" | "greater" | "less">(
    "two-sided",
  );

  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedPractice, setSelectedPractice] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const z = standardError === 0 ? 0 : (estimate - nullValue) / standardError;
  const pValue = getPValue(z, testType);
  const reject = pValue <= alpha / 100;
  const critical = getCriticalValue(alpha, testType);

  const activeExample = workedExamples[selectedExample];
  const activePractice = practiceQuestions[selectedPractice];

  const score = quizQuestions.reduce((total, question, index) => {
    return selectedAnswers[index] === question.answer ? total + 1 : total;
  }, 0);

  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-8 text-neutral-950 md:px-8 md:py-14">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses/statistics-foundation/modules/statistical-inference-foundations")}
          className="text-sm font-black text-[#8b1116] hover:text-[#5f0b0f]"
        >
          ← Back to module
        </a>

        <section className="mt-8 overflow-hidden rounded-[2.5rem] border border-neutral-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 md:p-10">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Statistics Foundation · Lesson 4.3
              </p>

              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-7xl">
                Hypothesis testing framework.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                Hypothesis testing is a structured way to judge whether observed
                data are surprising under a baseline assumption. This lesson
                develops null and alternative hypotheses, test statistics, null
                distributions, p-values, rejection regions and careful
                interpretation.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {["140 minutes", "No coding", "Null distributions", "P-value logic"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-[1.25rem] border border-neutral-200 bg-[#f7f4ee] p-4 text-sm font-black text-neutral-700"
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>

            <aside className="border-t border-neutral-200 bg-neutral-950 p-6 text-white md:p-10 lg:border-l lg:border-t-0">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Testing workflow
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Assume H₀, then ask how surprising the data are.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "1. State H₀",
                  "2. State H₁",
                  "3. Compute test statistic",
                  "4. Use null distribution",
                  "5. Calculate p-value",
                  "6. Decide and interpret",
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
                Build the testing framework step by step.
              </h2>

              <p className="mt-5 text-base leading-8 text-neutral-700">
                Confidence intervals asked which parameter values are plausible.
                Hypothesis testing starts with a specific parameter value and
                asks whether the observed data are unusually far from it.
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
                Students should understand tests as evidence against a null model.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "State null and alternative hypotheses correctly.",
                  "Distinguish one-sided and two-sided tests.",
                  "Compute a standardised test statistic.",
                  "Explain the null distribution.",
                  "Interpret a p-value correctly.",
                  "Use a significance-level decision rule.",
                  "Explain reject versus fail to reject.",
                  "Separate statistical significance from practical importance.",
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
                Hypothesis testing asks whether the data are unusual under H₀.
              </h2>

              <p className="mt-5 text-base leading-8 text-neutral-700">
                The logic is deliberately cautious. We do not begin by assuming
                the research claim is true. We begin with a baseline model, then
                ask whether the data are extreme enough to challenge that model.
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
                Mr. R explains the logic of testing.
              </h2>

              <div className="mt-6 grid gap-4">
                <Dialogue speaker="Mr. R" text="A hypothesis test begins by assuming a baseline claim, called the null hypothesis." />
                <Dialogue speaker="Amelia" text="So we assume the null is true?" />
                <Dialogue speaker="Mr. R" text="For the calculation, yes. We ask: if H₀ were true, how unusual would our data be?" />
                <Dialogue speaker="Ben" text="Where does the test statistic come in?" />
                <Dialogue speaker="Mr. R" text="It measures how far the estimate is from the null value, using standard error as the unit of distance." />
                <Dialogue speaker="Chloe" text="Then the p-value tells us whether that distance is unusual?" />
                <Dialogue speaker="Mr. R" text="Exactly. It is the probability, under H₀, of getting a result at least as extreme as the one observed." />
                <Dialogue speaker="Daniel" text="If we do not reject H₀, does that mean H₀ is true?" />
                <Dialogue speaker="Mr. R" text="No. It only means the data were not strong enough to reject H₀ using the chosen rule." />
              </div>

              <div className="mt-8 rounded-[2rem] border border-[#8b1116]/20 bg-[#fff7f7] p-6">
                <h3 className="text-2xl font-black tracking-[-0.04em] text-[#8b1116]">
                  Lecture takeaway
                </h3>
                <p className="mt-3 text-sm leading-7 text-neutral-700">
                  A hypothesis test is a structured argument about evidence. It
                  does not prove hypotheses; it evaluates how surprising the
                  data are under a specified null model.
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
                Hypothesis tests compare observed evidence with a null distribution.
              </h2>

              <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-700">
                These notes derive the testing framework from sampling
                distributions and standard errors, then connect hypotheses,
                test statistics, p-values and decision rules.
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
                    <InfoBlock title="Derivation" body={item.derivation} />
                    <InfoBlock title="Example" body={item.example} warning />
                    <InfoBlock title="Warning" body={item.warning} dark />
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Test Builder" && (
          <section className="mt-8 overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="p-6 md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Interactive test builder
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Build a hypothesis test from estimate, null value and standard error.
                </h2>

                <p className="mt-4 text-base leading-8 text-neutral-700">
                  Adjust the observed estimate, null value, standard error,
                  significance level and test direction. Watch the test
                  statistic, p-value and decision update.
                </p>

                <div className="mt-6 grid gap-5">
                  <Slider label="Observed estimate" value={estimate} min={20} max={90} onChange={setEstimate} />
                  <Slider label="Null value" value={nullValue} min={20} max={90} onChange={setNullValue} />
                  <Slider label="Standard error" value={standardError} min={1} max={15} onChange={setStandardError} />
                  <Slider label="Significance level α" value={alpha} min={1} max={10} suffix="%" onChange={setAlpha} />
                  <TestTypeSelector value={testType} onChange={setTestType} />
                </div>
              </div>

              <div className="border-t border-neutral-200 bg-neutral-950 p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                  Test output
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  {reject ? "Reject H₀." : "Fail to reject H₀."}
                </h2>

                <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.07] p-5">
                  <NullCurve z={z} testType={testType} alpha={alpha} />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <DarkMetric label="Test statistic" value={z.toFixed(2)} />
                  <DarkMetric label="p-value" value={pValue.toFixed(4)} />
                  <DarkMetric label="α" value={(alpha / 100).toFixed(2)} />
                  <DarkMetric label="Decision rule" value={reject ? "p ≤ α" : "p > α"} />
                </div>

                <p className="mt-6 rounded-[1.5rem] bg-white p-5 text-sm font-bold leading-7 text-neutral-950">
                  z = ({estimate} − {nullValue}) / {standardError} ={" "}
                  {z.toFixed(2)}. The result is interpreted under the null
                  distribution.
                </p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "Null Distribution Lab" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Null distribution lab
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                The null distribution shows ordinary and unusual results.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                Under H₀, most z statistics fall near 0. Values far into the
                tails are less likely under H₀ and therefore provide stronger
                evidence against it.
              </p>

              <div className="mt-6 rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5">
                <LargeNullCurve z={z} testType={testType} />
              </div>
            </section>

            <section className="rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Tail-area interpretation
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                P-values are tail areas, not truth probabilities.
              </h2>

              <div className="mt-6 grid gap-4">
                {[
                  {
                    title: "Centred at zero",
                    body:
                      "If H₀ is true, the standardised statistic is expected to be near 0.",
                  },
                  {
                    title: "Extreme values",
                    body:
                      "Large positive or negative statistics are less compatible with H₀.",
                  },
                  {
                    title: "Tail area",
                    body:
                      "The p-value measures the probability of results at least as extreme under H₀.",
                  },
                  {
                    title: "Direction matters",
                    body:
                      "One-sided and two-sided alternatives count different tail areas.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5"
                  >
                    <h3 className="text-xl font-black tracking-[-0.035em]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-white/70">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </section>
        )}

        {activeTab === "Decision Regions" && (
          <section className="mt-8 grid gap-6">
            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Rejection region explorer
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                A significance level creates critical regions.
              </h2>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-700">
                The rejection region is chosen before seeing the data. If the
                observed test statistic falls inside this region, the test
                rejects H₀ at the chosen significance level.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Metric label="Test type" value={formatTestType(testType)} />
                <Metric label="α" value={`${alpha}%`} />
                <Metric label="Critical value" value={critical} />
              </div>

              <div className="mt-6 rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5">
                <CriticalRegionPlot testType={testType} alpha={alpha} z={z} />
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-3">
              {[
                {
                  title: "Two-sided",
                  body:
                    "Evidence can be unusually high or unusually low. The rejection region is split between both tails.",
                },
                {
                  title: "Greater than",
                  body:
                    "Only unusually high values count as evidence against H₀.",
                },
                {
                  title: "Less than",
                  body:
                    "Only unusually low values count as evidence against H₀.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-2xl font-black tracking-[-0.04em]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-700">
                    {item.body}
                  </p>
                </article>
              ))}
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
                Work through the full testing logic.
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
                Practise hypotheses, statistics and decisions.
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
              Hypothesis testing is evidence against a model, not proof of truth.
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "What was assumed?",
                  body:
                    "The p-value is calculated under the assumption that H₀ is true.",
                },
                {
                  title: "How far was the estimate?",
                  body:
                    "The test statistic measures distance from the null in standard-error units.",
                },
                {
                  title: "What decision rule was chosen?",
                  body:
                    "The significance level α controls the rejection threshold.",
                },
                {
                  title: "What should be reported?",
                  body:
                    "Report the estimate, uncertainty, test statistic or p-value, and practical interpretation.",
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
                Check your understanding of null hypotheses, alternatives, test
                statistics, p-values and decision rules.
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

function TestTypeSelector({
  value,
  onChange,
}: {
  value: "two-sided" | "greater" | "less";
  onChange: (value: "two-sided" | "greater" | "less") => void;
}) {
  const options = [
    ["two-sided", "H₁: θ ≠ θ₀"],
    ["greater", "H₁: θ > θ₀"],
    ["less", "H₁: θ < θ₀"],
  ] as const;

  return (
    <div>
      <p className="text-sm font-black text-neutral-700">Alternative hypothesis</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {options.map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`rounded-full px-4 py-3 text-sm font-black transition ${
              value === key
                ? "bg-neutral-950 text-white"
                : "border border-neutral-200 bg-white text-neutral-700 hover:bg-[#f7f4ee]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
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

function NullCurve({
  z,
  testType,
  alpha,
}: {
  z: number;
  testType: "two-sided" | "greater" | "less";
  alpha: number;
}) {
  return (
    <svg viewBox="0 0 520 260" className="h-auto w-full">
      <NormalCurveBase />
      <TailShade testType={testType} alpha={alpha} />
      <ObservedLine z={z} />
      <text x="35" y="238" fontSize="14" fontWeight="900" fill="#ffffff">
        null distribution
      </text>
      <text x="320" y="238" fontSize="14" fontWeight="900" fill="#ffffff">
        observed z = {z.toFixed(2)}
      </text>
    </svg>
  );
}

function LargeNullCurve({
  z,
  testType,
}: {
  z: number;
  testType: "two-sided" | "greater" | "less";
}) {
  return (
    <svg viewBox="0 0 760 340" className="h-auto w-full">
      <path
        d={normalPath(60, 270, 640, 180)}
        fill="none"
        stroke="#111111"
        strokeWidth="5"
      />
      <line x1="60" x2="700" y1="270" y2="270" stroke="#d4d4d4" strokeWidth="3" />
      <line
        x1={zToXLarge(z)}
        x2={zToXLarge(z)}
        y1="70"
        y2="270"
        stroke="#8b1116"
        strokeWidth="5"
      />
      <text x="70" y="310" fontSize="18" fontWeight="900" fill="#525252">
        Most values near 0
      </text>
      <text x="465" y="310" fontSize="18" fontWeight="900" fill="#525252">
        tails = unusual under H₀
      </text>
      <text x={Math.max(70, Math.min(640, zToXLarge(z) - 45))} y="55" fontSize="18" fontWeight="900" fill="#8b1116">
        z = {z.toFixed(2)}
      </text>
      <text x="70" y="35" fontSize="17" fontWeight="900" fill="#111111">
        Test type: {formatTestType(testType)}
      </text>
    </svg>
  );
}

function CriticalRegionPlot({
  testType,
  alpha,
  z,
}: {
  testType: "two-sided" | "greater" | "less";
  alpha: number;
  z: number;
}) {
  return (
    <svg viewBox="0 0 760 340" className="h-auto w-full">
      <path
        d={normalPath(60, 270, 640, 180)}
        fill="none"
        stroke="#111111"
        strokeWidth="5"
      />
      <line x1="60" x2="700" y1="270" y2="270" stroke="#d4d4d4" strokeWidth="3" />

      {testType === "two-sided" && (
        <>
          <rect x="60" y="70" width="150" height="200" fill="#8b1116" opacity="0.12" />
          <rect x="550" y="70" width="150" height="200" fill="#8b1116" opacity="0.12" />
        </>
      )}

      {testType === "greater" && (
        <rect x="550" y="70" width="150" height="200" fill="#8b1116" opacity="0.12" />
      )}

      {testType === "less" && (
        <rect x="60" y="70" width="150" height="200" fill="#8b1116" opacity="0.12" />
      )}

      <line
        x1={zToXLarge(z)}
        x2={zToXLarge(z)}
        y1="70"
        y2="270"
        stroke="#8b1116"
        strokeWidth="5"
      />

      <text x="70" y="315" fontSize="18" fontWeight="900" fill="#525252">
        shaded area = rejection region
      </text>
      <text x="470" y="315" fontSize="18" fontWeight="900" fill="#525252">
        observed z = {z.toFixed(2)}
      </text>
    </svg>
  );
}

function NormalCurveBase() {
  return (
    <>
      <path
        d={normalPath(40, 210, 440, 140)}
        fill="none"
        stroke="#ffffff"
        strokeWidth="4"
        opacity="0.95"
      />
      <line x1="40" x2="480" y1="210" y2="210" stroke="#ffffff" strokeOpacity="0.28" strokeWidth="3" />
    </>
  );
}

function TailShade({
  testType,
}: {
  testType: "two-sided" | "greater" | "less";
  alpha: number;
}) {
  return (
    <>
      {testType === "two-sided" && (
        <>
          <rect x="40" y="60" width="95" height="150" fill="#8b1116" opacity="0.45" />
          <rect x="385" y="60" width="95" height="150" fill="#8b1116" opacity="0.45" />
        </>
      )}
      {testType === "greater" && (
        <rect x="385" y="60" width="95" height="150" fill="#8b1116" opacity="0.45" />
      )}
      {testType === "less" && (
        <rect x="40" y="60" width="95" height="150" fill="#8b1116" opacity="0.45" />
      )}
    </>
  );
}

function ObservedLine({ z }: { z: number }) {
  const x = 260 + Math.max(-3.5, Math.min(3.5, z)) * 55;
  return (
    <line
      x1={x}
      x2={x}
      y1="45"
      y2="210"
      stroke="#8b1116"
      strokeWidth="5"
    />
  );
}

function normalPath(x0: number, yBase: number, width: number, height: number) {
  const points = Array.from({ length: 100 }).map((_, i) => {
    const z = -3.5 + (7 * i) / 99;
    const density = Math.exp(-0.5 * z * z);
    const x = x0 + (i / 99) * width;
    const y = yBase - density * height;
    return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
  });

  return points.join(" ");
}

function zToXLarge(z: number) {
  return 380 + Math.max(-3.5, Math.min(3.5, z)) * 91;
}

function getPValue(z: number, testType: "two-sided" | "greater" | "less") {
  const cdf = normalCdf(z);

  if (testType === "greater") return 1 - cdf;
  if (testType === "less") return cdf;

  return 2 * Math.min(cdf, 1 - cdf);
}

function normalCdf(z: number) {
  return 0.5 * (1 + erf(z / Math.sqrt(2)));
}

function erf(x: number) {
  const sign = x >= 0 ? 1 : -1;
  const absX = Math.abs(x);

  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const t = 1 / (1 + p * absX);
  const y =
    1 -
    (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) *
      t *
      Math.exp(-absX * absX));

  return sign * y;
}

function getCriticalValue(
  alpha: number,
  testType: "two-sided" | "greater" | "less",
) {
  if (testType === "two-sided") {
    if (alpha <= 1) return "±2.58";
    if (alpha <= 5) return "±1.96";
    return "±1.64";
  }

  if (alpha <= 1) return testType === "greater" ? "2.33" : "-2.33";
  if (alpha <= 5) return testType === "greater" ? "1.64" : "-1.64";
  return testType === "greater" ? "1.28" : "-1.28";
}

function formatTestType(testType: "two-sided" | "greater" | "less") {
  if (testType === "greater") return "Upper-tailed";
  if (testType === "less") return "Lower-tailed";
  return "Two-sided";
}
