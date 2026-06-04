"use client";

import LockedLessonGate from "@/components/course/LockedLessonGate";
import { isStatisticsFoundationLessonOpen } from "@/lib/statisticsFoundationAccess";


import { useMemo, useState } from "react";

const basePath = "";

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
  "P-value Lab",
  "Error Matrix",
  "Power Lab",
  "Effect Size Lab",
  "Worked Examples",
  "Practice Studio",
  "Reflection",
  "Quiz",
];

const learningRoute = [
  {
    time: "0–15 min",
    title: "Deep p-value interpretation",
    body:
      "Move beyond the basic definition and understand what p-values do and do not measure.",
  },
  {
    time: "15–35 min",
    title: "Decision errors",
    body:
      "Study Type I error, Type II error, significance level and the consequences of wrong decisions.",
  },
  {
    time: "35–60 min",
    title: "Power",
    body:
      "Understand power as the probability of detecting an effect when a real effect exists.",
  },
  {
    time: "60–85 min",
    title: "Effect size and practical importance",
    body:
      "Separate statistical significance from the size and real-world importance of an effect.",
  },
  {
    time: "85–115 min",
    title: "Power drivers",
    body:
      "Explore how sample size, variability, effect size and α influence statistical power.",
  },
  {
    time: "115–150 min",
    title: "Responsible interpretation",
    body:
      "Learn how to report p-values, uncertainty, errors, power and practical meaning together.",
  },
];

const lectureCards = [
  {
    title: "A p-value is calculated under H₀",
    body:
      "The p-value describes how unusual the observed result would be if the null hypothesis were true.",
    example:
      "p = 0.03 means that results at least this extreme would be relatively uncommon under H₀.",
  },
  {
    title: "A p-value is not P(H₀ is true)",
    body:
      "The p-value is not the probability that the null hypothesis is true. It assumes H₀ for the calculation.",
    example:
      "p = 0.04 does not mean there is a 4% chance that H₀ is true.",
  },
  {
    title: "Type I error means false rejection",
    body:
      "A Type I error occurs when H₀ is true but the test rejects it.",
    example:
      "Concluding a treatment works when it truly has no effect is a Type I error.",
  },
  {
    title: "Type II error means missed detection",
    body:
      "A Type II error occurs when H₀ is false but the test fails to reject it.",
    example:
      "Failing to detect a truly effective treatment is a Type II error.",
  },
  {
    title: "Power is the chance of detecting a real effect",
    body:
      "Power is the probability of rejecting H₀ when a specified alternative is true.",
    example:
      "80% power means that, under a specified real effect, the study would reject H₀ about 80% of the time.",
  },
  {
    title: "Statistical significance is not practical importance",
    body:
      "A small p-value may occur for a tiny effect in a huge sample, while an important effect may be uncertain in a small sample.",
    example:
      "A blood pressure reduction of 0.2 mmHg may be statistically significant but not clinically important.",
  },
];

const detailedNotes = [
  {
    title: "1. P-value as a tail probability under H₀",
    formula: "p = P(result at least as extreme as observed | H₀ true)",
    body:
      "A p-value is a probability computed under the null model. It measures how extreme the observed test statistic is relative to the null distribution.",
    derivation:
      "Suppose a test statistic Z follows approximately N(0, 1) when H₀ is true. If the observed statistic is zobs, then for an upper-tailed test p = P(Z ≥ zobs). For a lower-tailed test p = P(Z ≤ zobs). For a two-sided test p = P(|Z| ≥ |zobs|).",
    example:
      "If zobs = 2.2 in a two-sided z test, the p-value is approximately 2P(Z ≥ 2.2), which is about 0.028.",
    warning:
      "The p-value is conditional on H₀. It does not directly tell us the probability that H₀ is true.",
  },
  {
    title: "2. What a p-value does not mean",
    formula: "p ≠ P(H₀ true | data)",
    body:
      "A p-value is often misunderstood. It is not the probability that the null hypothesis is true, not the probability that the result is due to chance alone, and not a measure of effect size.",
    derivation:
      "The p-value has the form P(data or more extreme | H₀). The probability many people want is P(H₀ | data). These are reversed conditional probabilities and are not the same.",
    example:
      "P(test positive | disease) is not the same as P(disease | test positive). Similarly, P(data | H₀) is not P(H₀ | data).",
    warning:
      "Do not write 'there is a 3% probability the null hypothesis is true' when p = 0.03.",
  },
  {
    title: "3. Significance level α",
    formula: "α = P(reject H₀ | H₀ true)",
    body:
      "The significance level is the long-run probability of making a Type I error if the null hypothesis is true and the test assumptions hold.",
    derivation:
      "Before observing data, the rejection region is chosen so that, under H₀, the probability of falling in that region is α. Therefore α controls the false positive rate of the testing procedure under repeated use.",
    example:
      "Using α = 0.05 means that, if H₀ is true, about 5% of repeated tests would reject H₀ by chance under ideal assumptions.",
    warning:
      "The significance level is chosen before analysis. Changing it after seeing the p-value weakens the logic of the test.",
  },
  {
    title: "4. Type I error",
    formula: "Type I error: reject H₀ when H₀ is true",
    body:
      "A Type I error is a false positive decision. It occurs when the test declares evidence against H₀ even though H₀ is actually true.",
    derivation:
      "Under H₀, test statistics still vary because of sampling variability. Some samples will produce extreme statistics by chance. The significance level α controls how often this happens in the long run.",
    example:
      "A trial concludes a treatment improves recovery when in reality the treatment has no effect.",
    warning:
      "A Type I error is about the decision rule, not about one p-value being 'wrong'.",
  },
  {
    title: "5. Type II error",
    formula: "Type II error: fail to reject H₀ when H₀ is false",
    body:
      "A Type II error is a false negative decision. It occurs when a real effect exists, but the study fails to detect it.",
    derivation:
      "When H₁ is true, the test statistic distribution shifts away from the null distribution. However, if the effect is small, the sample size is small or variability is high, the statistic may still fall outside the rejection region. Then the test fails to reject H₀.",
    example:
      "A study fails to detect a beneficial treatment because the sample was too small.",
    warning:
      "Failing to reject H₀ does not prove no effect. It may reflect low power.",
  },
  {
    title: "6. Power",
    formula: "Power = P(reject H₀ | H₁ true) = 1 − β",
    body:
      "Power is the probability that a test detects a specified real effect. It is one minus the Type II error probability β.",
    derivation:
      "If β = P(fail to reject H₀ | H₁ true), then the complementary event is rejecting H₀ when H₁ is true. Therefore power = 1 − β.",
    example:
      "If a study has β = 0.20 for a clinically meaningful effect, then power = 0.80.",
    warning:
      "Power is not a universal number. It depends on the specific effect size, sample size, variability, α and test type.",
  },
  {
    title: "7. Effect size",
    formula: "effect size = magnitude of departure from H₀",
    body:
      "Effect size measures how large the difference, association or change is. It is different from statistical significance.",
    derivation:
      "The test statistic is often effect estimate divided by standard error. Therefore the p-value depends on both effect size and precision. A small effect can have a small p-value if SE is tiny.",
    example:
      "A mean difference of 10 units is larger than a mean difference of 1 unit, even if both are statistically significant.",
    warning:
      "Report the estimated effect and confidence interval, not only the p-value.",
  },
  {
    title: "8. Standardised effect size",
    formula: "d = (μ₁ − μ₀) / σ",
    body:
      "A standardised effect size expresses the effect in standard deviation units. This helps compare effects measured on different scales.",
    derivation:
      "If the raw effect is μ₁ − μ₀ and the natural variability is σ, then dividing by σ gives a scale-free measure. Larger absolute d means the effect is large relative to individual variability.",
    example:
      "If a mean difference is 5 and σ = 10, then d = 5/10 = 0.5.",
    warning:
      "Standardised effects can help comparison, but practical importance still depends on context.",
  },
  {
    title: "9. Sample size and power",
    formula: "larger n → smaller SE → higher power",
    body:
      "Larger samples usually increase power because they reduce the standard error and make real effects easier to distinguish from sampling noise.",
    derivation:
      "For a mean, SE = σ/√n. As n increases, SE decreases. For a fixed effect δ, the non-null test statistic δ/SE becomes larger, making rejection more likely when the effect is real.",
    example:
      "Doubling n does not halve SE, but increasing n still improves precision and power.",
    warning:
      "Very large samples can detect effects that are too small to matter practically.",
  },
  {
    title: "10. Variability and power",
    formula: "larger σ → larger SE → lower power",
    body:
      "Higher variability makes it harder to detect a real effect because the estimate is noisier.",
    derivation:
      "For the sample mean, SE = σ/√n. Holding n fixed, increasing σ increases SE. The same effect size then produces a smaller test statistic, reducing the probability of rejection under H₁.",
    example:
      "A treatment effect of 5 units is easier to detect when σ = 8 than when σ = 30.",
    warning:
      "Improving measurement quality or using a more homogeneous design can sometimes improve power by reducing variability.",
  },
  {
    title: "11. α and power trade-off",
    formula: "larger α → higher power but more Type I errors",
    body:
      "Increasing α makes rejection easier, which increases power but also increases the long-run Type I error rate.",
    derivation:
      "A larger α creates a larger rejection region under H₀. When H₁ is true, this larger rejection region is also easier to enter, increasing power. But under H₀, it also causes more false positives.",
    example:
      "Changing α from 0.01 to 0.05 increases power, but also allows more false positives.",
    warning:
      "The choice of α should reflect the consequences of false positives and false negatives.",
  },
  {
    title: "12. Practical importance",
    formula: "practical importance depends on context",
    body:
      "Statistical significance asks whether the data are surprising under H₀. Practical importance asks whether the effect matters in the real world.",
    derivation:
      "A test statistic can be large because the effect is large, because the standard error is small, or both. Therefore a small p-value alone cannot tell us whether the effect is meaningful.",
    example:
      "A medicine reducing symptoms by 0.1 points on a 100-point scale may be statistically significant but clinically irrelevant.",
    warning:
      "Always combine p-values with effect size, confidence interval, study design and subject-matter judgement.",
  },
];

const workedExamples = [
  {
    title: "Interpreting a small p-value",
    question:
      "A study reports p = 0.018 for a two-sided test of no mean difference. What does this mean?",
    working:
      "The p-value means that if the null hypothesis of no mean difference were true, the probability of observing a result at least as extreme as this one would be about 0.018.",
    answer:
      "At α = 0.05, this would usually be considered statistically significant evidence against H₀.",
    deeper:
      "It does not mean there is a 1.8% probability that H₀ is true, and it does not tell us whether the effect is practically important.",
  },
  {
    title: "Type I and Type II errors",
    question:
      "A screening trial tests whether a new intervention reduces disease risk. Describe Type I and Type II errors.",
    working:
      "Type I error: the study concludes the intervention reduces risk when it truly does not. Type II error: the study fails to detect a reduction when the intervention truly does reduce risk.",
    answer:
      "Type I is a false positive conclusion; Type II is a missed real effect.",
    deeper:
      "Which error is more serious depends on context. False approval of a harmful treatment and failure to detect a life-saving treatment have different consequences.",
  },
  {
    title: "Power from β",
    question:
      "A planned study has Type II error probability β = 0.15 for a clinically meaningful effect. What is its power?",
    working:
      "Power = 1 − β = 1 − 0.15 = 0.85.",
    answer: "The study has 85% power for that specified effect.",
    deeper:
      "Power is tied to a specific effect size. The same study may have lower power for smaller effects and higher power for larger effects.",
  },
  {
    title: "Significant but not important",
    question:
      "A very large study estimates a treatment effect of 0.2 units with p < 0.001. How should this be interpreted?",
    working:
      "The small p-value suggests strong statistical evidence against no effect. However, the estimated effect is only 0.2 units, so practical importance must be judged separately.",
    answer:
      "The result is statistically significant, but may not be practically meaningful.",
    deeper:
      "Large sample sizes can make tiny effects statistically detectable. Report the effect size and confidence interval.",
  },
];

const practiceQuestions = [
  {
    prompt:
      "Explain why p = 0.04 does not mean there is a 4% chance that H₀ is true.",
    answer:
      "Because the p-value is P(data or more extreme | H₀ true), not P(H₀ true | data). It is calculated assuming H₀ is true.",
  },
  {
    prompt:
      "Define Type I error in the context of a treatment trial.",
    answer:
      "A Type I error occurs if the trial concludes the treatment has an effect when in truth it has no effect.",
  },
  {
    prompt:
      "Define Type II error in the context of a treatment trial.",
    answer:
      "A Type II error occurs if the trial fails to detect a treatment effect when a real effect exists.",
  },
  {
    prompt:
      "If β = 0.25, what is the power?",
    answer:
      "Power = 1 − β = 1 − 0.25 = 0.75, or 75%.",
  },
  {
    prompt:
      "List four factors that influence power.",
    answer:
      "Power is influenced by sample size, effect size, variability, significance level α, test direction and study design.",
  },
];

const quizQuestions = [
  {
    question: "What is a p-value?",
    options: [
      "The probability H₀ is true.",
      "The probability H₁ is true.",
      "The probability of data at least as extreme as observed, assuming H₀ is true.",
      "The effect size.",
    ],
    answer: 2,
    feedback:
      "A p-value is calculated under H₀ and measures extremeness of the observed result.",
  },
  {
    question: "What is a Type I error?",
    options: [
      "Rejecting H₀ when H₀ is true.",
      "Failing to reject H₀ when H₀ is false.",
      "Always accepting H₁.",
      "Increasing sample size.",
    ],
    answer: 0,
    feedback:
      "A Type I error is a false rejection of a true null hypothesis.",
  },
  {
    question: "What is a Type II error?",
    options: [
      "Rejecting H₀ when H₀ is true.",
      "Failing to reject H₀ when H₀ is false.",
      "Calculating a standard error.",
      "Using a confidence interval.",
    ],
    answer: 1,
    feedback:
      "A Type II error is missing a real effect.",
  },
  {
    question: "What is power?",
    options: [
      "The probability of rejecting H₀ when a specified alternative is true.",
      "The probability H₀ is true.",
      "The p-value.",
      "The sample mean.",
    ],
    answer: 0,
    feedback:
      "Power is the probability of detecting a specified real effect.",
  },
  {
    question: "If β = 0.20, what is power?",
    options: ["0.20", "0.50", "0.80", "1.20"],
    answer: 2,
    feedback:
      "Power = 1 − β = 0.80.",
  },
  {
    question: "Which change usually increases power?",
    options: [
      "Reducing sample size.",
      "Increasing variability.",
      "Increasing sample size.",
      "Using a noisier measurement.",
    ],
    answer: 2,
    feedback:
      "Larger sample size usually reduces standard error and increases power.",
  },
  {
    question: "Why can a tiny effect have a very small p-value?",
    options: [
      "Because p-values measure only practical importance.",
      "Because a very large sample can make the standard error very small.",
      "Because Type II error is always zero.",
      "Because H₀ must be true.",
    ],
    answer: 1,
    feedback:
      "With a very large sample, even tiny effects can be estimated very precisely.",
  },
];

export default function PValuesErrorsPowerLesson() {
  const lessonCode = "4.4";

  if (!isStatisticsFoundationLessonOpen(lessonCode)) {
    return (
      <LockedLessonGate
        lessonCode={lessonCode}
        lessonTitle="P-values, errors and power"
        moduleTitle="Module 4: Statistical Inference Foundations"
      />
    );
  }

  const [activeTab, setActiveTab] = useState("Learning Route");

  const [observedZ, setObservedZ] = useState(2);
  const [testType, setTestType] = useState<"two-sided" | "greater" | "less">(
    "two-sided",
  );
  const [alpha, setAlpha] = useState(5);

  const [effectSize, setEffectSize] = useState(5);
  const [standardDeviation, setStandardDeviation] = useState(12);
  const [sampleSize, setSampleSize] = useState(64);

  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedPractice, setSelectedPractice] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const pValue = getPValue(observedZ, testType);
  const reject = pValue <= alpha / 100;

  const se = standardDeviation / Math.sqrt(sampleSize);
  const noncentralShift = effectSize / se;
  const critical = getCriticalNumeric(alpha, testType);
  const power = computePower(noncentralShift, critical, testType);

  const standardisedEffect = effectSize / standardDeviation;

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
                Statistics Foundation · Lesson 4.4
              </p>

              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-7xl">
                P-values, errors and power.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                This lesson deepens the hypothesis testing framework by focusing
                on p-value interpretation, Type I and Type II errors, power,
                effect size and practical importance. Students learn how to move
                beyond “significant or not” toward responsible statistical
                interpretation.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {["150 minutes", "No coding", "Power concepts", "Error reasoning"].map(
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
                Central idea
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                A test decision can be wrong, even when the method is valid.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "p-value: extremeness under H₀",
                  "α: long-run Type I error rate",
                  "Type I error: false positive",
                  "Type II error: false negative",
                  "Power = 1 − β",
                  "Significance ≠ importance",
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
                Move from testing mechanics to interpretation quality.
              </h2>

              <p className="mt-5 text-base leading-8 text-neutral-700">
                Lesson 4.3 introduced test statistics and p-values. Lesson 4.4
                asks deeper questions: What can go wrong? What does power mean?
                How do sample size, variability and effect size shape evidence?
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
                Students should interpret statistical evidence with caution and context.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Interpret p-values correctly.",
                  "Avoid common p-value misinterpretations.",
                  "Define Type I error and α.",
                  "Define Type II error and β.",
                  "Explain power as 1 − β.",
                  "Describe how sample size affects power.",
                  "Separate statistical significance from practical importance.",
                  "Report results with effect size and uncertainty.",
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
                The p-value is only one part of statistical evidence.
              </h2>

              <p className="mt-5 text-base leading-8 text-neutral-700">
                A p-value can help judge compatibility with a null model, but it
                cannot tell the whole story. Good interpretation also requires
                effect size, uncertainty, error risks, study design and practical
                context.
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
                Mr. R explains why significance is not enough.
              </h2>

              <div className="mt-6 grid gap-4">
                <Dialogue speaker="Mr. R" text="Last lesson, we learned how p-values are calculated. Today, we ask how they should be interpreted." />
                <Dialogue speaker="Amelia" text="If p is less than 0.05, does that mean the result is important?" />
                <Dialogue speaker="Mr. R" text="Not necessarily. It means the result is statistically unusual under H₀ using that threshold. Importance depends on effect size and context." />
                <Dialogue speaker="Ben" text="What if p is greater than 0.05?" />
                <Dialogue speaker="Mr. R" text="Then we fail to reject H₀, but that does not prove no effect. The study may have low power." />
                <Dialogue speaker="Chloe" text="So power is about whether the study can detect a real effect?" />
                <Dialogue speaker="Mr. R" text="Exactly. Power is the probability of rejecting H₀ when a specified effect really exists." />
                <Dialogue speaker="Daniel" text="And Type I and Type II errors are the two ways a decision can be wrong?" />
                <Dialogue speaker="Mr. R" text="Yes. Type I is a false positive. Type II is a missed real effect. Good design balances these risks." />
              </div>

              <div className="mt-8 rounded-[2rem] border border-[#8b1116]/20 bg-[#fff7f7] p-6">
                <h3 className="text-2xl font-black tracking-[-0.04em] text-[#8b1116]">
                  Lecture takeaway
                </h3>
                <p className="mt-3 text-sm leading-7 text-neutral-700">
                  Responsible inference means interpreting p-values together
                  with uncertainty, effect magnitude, error risks, power and the
                  real-world meaning of the result.
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
                P-values, errors and power explain what a test can and cannot tell us.
              </h2>

              <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-700">
                These notes deepen hypothesis testing by deriving error
                concepts, explaining power, and separating statistical evidence
                from practical importance.
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

        {activeTab === "P-value Lab" && (
          <section className="mt-8 overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="p-6 md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Interactive p-value lab
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Move the test statistic and watch the p-value change.
                </h2>

                <p className="mt-4 text-base leading-8 text-neutral-700">
                  The p-value is a tail area under the null distribution. Larger
                  absolute test statistics usually produce smaller p-values in a
                  two-sided test.
                </p>

                <div className="mt-6 grid gap-5">
                  <Slider label="Observed z statistic" value={observedZ} min={-4} max={4} onChange={setObservedZ} />
                  <Slider label="Significance level α" value={alpha} min={1} max={10} suffix="%" onChange={setAlpha} />
                  <TestTypeSelector value={testType} onChange={setTestType} />
                </div>
              </div>

              <div className="border-t border-neutral-200 bg-neutral-950 p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                  P-value output
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  p = {pValue.toFixed(4)}
                </h2>

                <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.07] p-5">
                  <PValueCurve z={observedZ} testType={testType} />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <DarkMetric label="z statistic" value={observedZ.toFixed(2)} />
                  <DarkMetric label="p-value" value={pValue.toFixed(4)} />
                  <DarkMetric label="α" value={(alpha / 100).toFixed(2)} />
                  <DarkMetric label="Decision" value={reject ? "Reject H₀" : "Fail to reject"} />
                </div>

                <p className="mt-6 rounded-[1.5rem] bg-white p-5 text-sm font-bold leading-7 text-neutral-950">
                  The p-value is calculated assuming H₀ is true. It is not the
                  probability that H₀ is true.
                </p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "Error Matrix" && (
          <section className="mt-8 grid gap-6">
            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Error matrix
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                A statistical decision has two possible truths behind it.
              </h2>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-700">
                A test decision can be correct or incorrect depending on whether
                H₀ is actually true. The framework below organises the four
                possibilities.
              </p>

              <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-white">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-neutral-950 text-white">
                      <th className="p-4 text-left">Decision</th>
                      <th className="p-4 text-left">H₀ true</th>
                      <th className="p-4 text-left">H₀ false</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-neutral-200">
                      <td className="p-4 font-black">Reject H₀</td>
                      <td className="p-4 text-[#8b1116] font-black">
                        Type I error α
                      </td>
                      <td className="p-4 font-black text-green-800">
                        Correct detection: power
                      </td>
                    </tr>
                    <tr className="border-t border-neutral-200">
                      <td className="p-4 font-black">Fail to reject H₀</td>
                      <td className="p-4 font-black text-green-800">
                        Correct non-rejection
                      </td>
                      <td className="p-4 text-[#8b1116] font-black">
                        Type II error β
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-4">
              {[
                {
                  title: "α",
                  body: "Probability of false rejection when H₀ is true.",
                },
                {
                  title: "β",
                  body: "Probability of missing the effect when H₀ is false.",
                },
                {
                  title: "1 − β",
                  body: "Power: probability of detecting the specified effect.",
                },
                {
                  title: "Decision",
                  body: "A rule-based conclusion, not a guarantee of truth.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-3xl font-black tracking-[-0.05em] text-[#8b1116]">
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

        {activeTab === "Power Lab" && (
          <section className="mt-8 overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="p-6 md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Interactive power lab
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Change effect size, variability and sample size.
                </h2>

                <p className="mt-4 text-base leading-8 text-neutral-700">
                  Power increases when the effect is larger, the sample size is
                  larger, variability is smaller or the rejection threshold is
                  less strict.
                </p>

                <div className="mt-6 grid gap-5">
                  <Slider label="True effect size δ" value={effectSize} min={0} max={20} onChange={setEffectSize} />
                  <Slider label="Standard deviation σ" value={standardDeviation} min={4} max={35} onChange={setStandardDeviation} />
                  <Slider label="Sample size n" value={sampleSize} min={10} max={500} onChange={setSampleSize} />
                  <Slider label="Significance level α" value={alpha} min={1} max={10} suffix="%" onChange={setAlpha} />
                </div>
              </div>

              <div className="border-t border-neutral-200 bg-neutral-950 p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                  Power output
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Power ≈ {(power * 100).toFixed(1)}%
                </h2>

                <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.07] p-5">
                  <PowerVisual shift={noncentralShift} critical={critical} />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <DarkMetric label="SE = σ / √n" value={se.toFixed(2)} />
                  <DarkMetric label="Effect / SE" value={noncentralShift.toFixed(2)} />
                  <DarkMetric label="Power" value={`${(power * 100).toFixed(1)}%`} />
                  <DarkMetric label="β" value={`${((1 - power) * 100).toFixed(1)}%`} />
                </div>

                <p className="mt-6 rounded-[1.5rem] bg-white p-5 text-sm font-bold leading-7 text-neutral-950">
                  Power is calculated for a specified true effect. Smaller
                  effects are harder to detect than larger effects.
                </p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "Effect Size Lab" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Effect size lab
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                Significance depends on both effect and precision.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                The same effect can be non-significant in a small noisy study
                and highly significant in a large precise study. Effect size and
                p-value answer different questions.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Metric label="Raw effect δ" value={effectSize.toFixed(1)} />
                <Metric label="Standardised d" value={standardisedEffect.toFixed(2)} />
                <Metric label="Effect / SE" value={noncentralShift.toFixed(2)} />
              </div>
            </section>

            <section className="rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Interpretation guide
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                Report magnitude, uncertainty and meaning.
              </h2>

              <div className="mt-6 grid gap-4">
                {[
                  {
                    title: "Magnitude",
                    body:
                      "How large is the estimated effect in real units?",
                  },
                  {
                    title: "Uncertainty",
                    body:
                      "How wide is the confidence interval?",
                  },
                  {
                    title: "Evidence",
                    body:
                      "How compatible are the data with the null model?",
                  },
                  {
                    title: "Importance",
                    body:
                      "Would the effect matter scientifically, clinically or practically?",
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

        {activeTab === "Worked Examples" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Worked examples
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                Work through p-values, errors and power.
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
                Practise interpretation, not just calculation.
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
              Good inference is not just “p less than 0.05”.
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "What does the p-value assume?",
                  body:
                    "It assumes the null hypothesis is true and asks how extreme the data are under that model.",
                },
                {
                  title: "What errors are possible?",
                  body:
                    "Rejecting can be a false positive. Not rejecting can be a missed real effect.",
                },
                {
                  title: "Was the study powerful?",
                  body:
                    "A non-significant result is hard to interpret if the study had low power.",
                },
                {
                  title: "Does the effect matter?",
                  body:
                    "Statistical evidence must be paired with effect size and practical context.",
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
                Check your understanding of p-values, Type I error, Type II
                error, power and practical interpretation.
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
        step={min < 0 ? 0.1 : 1}
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
    ["two-sided", "Two-sided"],
    ["greater", "Upper-tailed"],
    ["less", "Lower-tailed"],
  ] as const;

  return (
    <div>
      <p className="text-sm font-black text-neutral-700">Test type</p>
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

function PValueCurve({
  z,
  testType,
}: {
  z: number;
  testType: "two-sided" | "greater" | "less";
}) {
  return (
    <svg viewBox="0 0 520 260" className="h-auto w-full">
      <path
        d={normalPath(40, 210, 440, 140, 100)}
        fill="none"
        stroke="#ffffff"
        strokeWidth="4"
      />
      <line x1="40" x2="480" y1="210" y2="210" stroke="#ffffff" strokeOpacity="0.28" strokeWidth="3" />

      {testType === "two-sided" && (
        <>
          <rect x="40" y="55" width="110" height="155" fill="#8b1116" opacity="0.36" />
          <rect x="370" y="55" width="110" height="155" fill="#8b1116" opacity="0.36" />
        </>
      )}

      {testType === "greater" && (
        <rect x="370" y="55" width="110" height="155" fill="#8b1116" opacity="0.36" />
      )}

      {testType === "less" && (
        <rect x="40" y="55" width="110" height="155" fill="#8b1116" opacity="0.36" />
      )}

      <line
        x1={zToX(z, 40, 440)}
        x2={zToX(z, 40, 440)}
        y1="45"
        y2="210"
        stroke="#8b1116"
        strokeWidth="5"
      />

      <text x="45" y="238" fontSize="14" fontWeight="900" fill="#ffffff">
        shaded tail area represents p-value logic
      </text>
    </svg>
  );
}

function PowerVisual({
  shift,
  critical,
}: {
  shift: number;
  critical: number;
}) {
  return (
    <svg viewBox="0 0 620 300" className="h-auto w-full">
      <path
        d={normalPath(60, 230, 450, 120, 100)}
        fill="none"
        stroke="#ffffff"
        strokeWidth="4"
        opacity="0.75"
      />
      <path
        d={shiftedNormalPath(60, 230, 450, 120, shift)}
        fill="none"
        stroke="#8b1116"
        strokeWidth="4"
      />

      <line x1="60" x2="510" y1="230" y2="230" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="3" />
      <line
        x1={zToX(critical, 60, 450)}
        x2={zToX(critical, 60, 450)}
        y1="55"
        y2="230"
        stroke="#ffffff"
        strokeWidth="4"
        strokeDasharray="7 7"
      />

      <text x="70" y="265" fontSize="14" fontWeight="900" fill="#ffffff">
        white curve = H₀
      </text>
      <text x="260" y="265" fontSize="14" fontWeight="900" fill="#ffffff">
        red curve = true effect
      </text>
      <text x="410" y="45" fontSize="14" fontWeight="900" fill="#ffffff">
        rejection cutoff
      </text>
    </svg>
  );
}

function normalPath(
  x0: number,
  yBase: number,
  width: number,
  height: number,
  points: number,
) {
  return Array.from({ length: points }).map((_, i) => {
    const z = -3.5 + (7 * i) / (points - 1);
    const density = Math.exp(-0.5 * z * z);
    const x = x0 + (i / (points - 1)) * width;
    const y = yBase - density * height;
    return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(" ");
}

function shiftedNormalPath(
  x0: number,
  yBase: number,
  width: number,
  height: number,
  shift: number,
) {
  return Array.from({ length: 100 }).map((_, i) => {
    const z = -3.5 + (7 * i) / 99;
    const density = Math.exp(-0.5 * (z - shift) ** 2);
    const x = x0 + (i / 99) * width;
    const y = yBase - density * height;
    return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(" ");
}

function zToX(z: number, x0: number, width: number) {
  return x0 + ((Math.max(-3.5, Math.min(3.5, z)) + 3.5) / 7) * width;
}

function getPValue(z: number, testType: "two-sided" | "greater" | "less") {
  const cdf = normalCdf(z);

  if (testType === "greater") return 1 - cdf;
  if (testType === "less") return cdf;

  return 2 * Math.min(cdf, 1 - cdf);
}

function computePower(
  shift: number,
  critical: number,
  testType: "two-sided" | "greater" | "less",
) {
  if (testType === "greater") {
    return 1 - normalCdf(critical - shift);
  }

  if (testType === "less") {
    return normalCdf(-critical - shift);
  }

  return normalCdf(-critical - shift) + (1 - normalCdf(critical - shift));
}

function getCriticalNumeric(
  alpha: number,
  testType: "two-sided" | "greater" | "less",
) {
  if (testType === "two-sided") {
    if (alpha <= 1) return 2.576;
    if (alpha <= 5) return 1.96;
    return 1.645;
  }

  if (alpha <= 1) return 2.326;
  if (alpha <= 5) return 1.645;
  return 1.282;
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
