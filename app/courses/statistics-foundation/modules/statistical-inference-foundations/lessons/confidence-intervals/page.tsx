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
  "CI Lab",
  "Coverage Simulator",
  "Margin of Error",
  "Visual Reasoning",
  "Worked Examples",
  "Practice Studio",
  "Reflection",
  "Quiz",
];

const learningRoute = [
  {
    time: "0–15 min",
    title: "Why intervals are needed",
    body:
      "Understand why a point estimate alone is incomplete and why inference needs uncertainty around the estimate.",
  },
  {
    time: "15–35 min",
    title: "Estimate plus uncertainty",
    body:
      "Build the confidence interval structure: estimate ± critical value × standard error.",
  },
  {
    time: "35–60 min",
    title: "Margin of error",
    body:
      "Study how standard error and confidence level combine to form the margin of error.",
  },
  {
    time: "60–85 min",
    title: "Long-run confidence",
    body:
      "Understand confidence level as long-run coverage across repeated samples, not probability that one fixed interval contains the parameter.",
  },
  {
    time: "85–110 min",
    title: "Interpretation mistakes",
    body:
      "Avoid common errors such as saying there is a 95% probability that the true mean lies in this specific interval.",
  },
  {
    time: "110–135 min",
    title: "Precision and design",
    body:
      "Explore how sample size, variability and confidence level affect interval width and study precision.",
  },
];

const lectureCards = [
  {
    title: "A point estimate is not enough",
    body:
      "A sample mean gives one estimate of the population mean, but it does not say how uncertain the estimate is.",
    example:
      "A mean recovery time of 12 days is more informative when reported as 12 ± 2 days than as 12 alone.",
  },
  {
    title: "A confidence interval gives a plausible range",
    body:
      "A confidence interval uses sampling variability to create a range of values that are reasonably compatible with the data.",
    example:
      "A 95% confidence interval of 68 to 74 suggests the population mean is plausibly in that region.",
  },
  {
    title: "Intervals use standard error",
    body:
      "The standard error measures how much the estimate would vary across repeated samples, so it becomes the uncertainty scale.",
    example:
      "If SE is small, the interval is narrow. If SE is large, the interval is wide.",
  },
  {
    title: "Confidence level controls caution",
    body:
      "Higher confidence requires a wider interval because the method is trying to capture the parameter more often in repeated sampling.",
    example:
      "A 99% interval is wider than a 95% interval using the same data.",
  },
  {
    title: "Confidence is a property of the method",
    body:
      "A 95% confidence procedure captures the true parameter in about 95% of repeated samples under suitable assumptions.",
    example:
      "If we repeated the study many times, about 95% of the intervals would contain μ.",
  },
  {
    title: "Intervals require assumptions",
    body:
      "Confidence intervals rely on assumptions about sampling, independence, standard error estimation and approximate distributional behaviour.",
    example:
      "A mean interval may be unreliable if the sample is tiny, highly skewed or not randomly sampled.",
  },
];

const detailedNotes = [
  {
    title: "1. From point estimation to interval estimation",
    formula: "point estimate → interval estimate",
    body:
      "A point estimate gives a single numerical estimate of a population parameter. An interval estimate adds uncertainty by giving a range of plausible parameter values.",
    derivation:
      "If x̄ estimates μ, the sampling error x̄ − μ is unknown because μ is unknown. However, the standard error describes how large this sampling error tends to be across repeated samples. Therefore an interval is built by taking the estimate and extending it by a multiple of the standard error.",
    example:
      "Instead of reporting only x̄ = 72, we may report a confidence interval such as 69 to 75.",
    warning:
      "A confidence interval is not just a decorative range. It is based on a repeated-sampling method.",
  },
  {
    title: "2. General confidence interval structure",
    formula: "estimate ± critical value × standard error",
    body:
      "Most confidence intervals have the same basic structure: an estimate in the centre, plus and minus a margin of error.",
    derivation:
      "If the sampling distribution of an estimator is approximately centred at the true parameter and has standard error SE, then values within a chosen number of standard errors of the estimate form a plausible range. The chosen number is the critical value.",
    example:
      "For an approximate 95% normal interval, the critical value is about 1.96.",
    warning:
      "The critical value depends on the confidence level and sometimes on the distribution used, such as normal or t.",
  },
  {
    title: "3. Confidence interval for a mean when σ is known",
    formula: "x̄ ± z* σ/√n",
    body:
      "When the population standard deviation σ is known and the sampling distribution of x̄ is approximately normal, a confidence interval for μ is x̄ ± z*σ/√n.",
    derivation:
      "From Lesson 4.1, SE(x̄) = σ/√n. If x̄ is approximately normal around μ, then standardising gives Z = (x̄ − μ)/(σ/√n). For a 95% interval, approximately 95% of Z values lie between −1.96 and 1.96. Rearranging −z* ≤ (x̄ − μ)/SE ≤ z* gives x̄ − z*SE ≤ μ ≤ x̄ + z*SE.",
    example:
      "If x̄ = 50, σ = 12, n = 36 and z* = 1.96, then SE = 2 and the interval is 50 ± 3.92 = 46.08 to 53.92.",
    warning:
      "In practice, σ is rarely known. Then s and a t critical value are usually used.",
  },
  {
    title: "4. Estimated confidence interval for a mean",
    formula: "x̄ ± t* s/√n",
    body:
      "When σ is unknown, the sample standard deviation s estimates it. The interval commonly uses a t critical value.",
    derivation:
      "Replacing σ with s introduces extra uncertainty. The t distribution accounts for this, especially in smaller samples. The estimated standard error is s/√n, and the interval becomes x̄ ± t* s/√n.",
    example:
      "If x̄ = 80, s = 10, n = 25 and t* ≈ 2.064, then SE = 2 and the interval is 80 ± 4.128.",
    warning:
      "For very small samples, the t interval also relies on reasonable distributional assumptions.",
  },
  {
    title: "5. Margin of error",
    formula: "ME = critical value × SE",
    body:
      "The margin of error is the distance from the estimate to either endpoint of the interval.",
    derivation:
      "A confidence interval has the form estimate ± critical value × SE. The plus-minus part is the margin of error. Therefore ME = critical value × SE.",
    example:
      "If SE = 3 and z* = 1.96, then ME = 1.96 × 3 = 5.88.",
    warning:
      "Margin of error does not include every possible source of error. It mainly reflects sampling variability under the assumed design.",
  },
  {
    title: "6. Width of a confidence interval",
    formula: "width = 2 × margin of error",
    body:
      "The full width of a confidence interval is the upper endpoint minus the lower endpoint. For symmetric intervals, it is twice the margin of error.",
    derivation:
      "Lower endpoint = estimate − ME and upper endpoint = estimate + ME. Therefore width = (estimate + ME) − (estimate − ME) = 2ME.",
    example:
      "If the margin of error is 4, the confidence interval width is 8.",
    warning:
      "A wider interval is not necessarily wrong. It may honestly reflect limited information or high variability.",
  },
  {
    title: "7. Confidence level and critical value",
    formula: "higher confidence → larger critical value → wider interval",
    body:
      "The confidence level determines how often the method should capture the true parameter in repeated sampling. A higher confidence level needs a larger critical value.",
    derivation:
      "For normal-based intervals, the central probability between −z* and z* equals the confidence level. To increase this central probability from 95% to 99%, z* must move farther into the tails. Therefore the interval widens.",
    example:
      "Approximate z* values are 1.645 for 90%, 1.96 for 95% and 2.576 for 99%.",
    warning:
      "Higher confidence is not automatically better. It gives more caution but less precision.",
  },
  {
    title: "8. Long-run coverage interpretation",
    formula: "95% confidence ≈ 95% long-run coverage",
    body:
      "The correct interpretation of a 95% confidence interval is about the long-run performance of the procedure, not a probability statement about one fixed interval.",
    derivation:
      "The parameter μ is treated as fixed. The interval endpoints vary from sample to sample because they depend on x̄ and s. Across repeated samples, some intervals cover μ and some do not. A 95% procedure is designed so that about 95% of such intervals cover μ.",
    example:
      "If 100 studies are repeated under the same conditions, about 95 of their 95% intervals should contain the true mean.",
    warning:
      "After one interval is calculated, it either contains μ or it does not. The 95% refers to the procedure, not to the realised interval.",
  },
  {
    title: "9. Confidence interval and hypothesis testing connection",
    formula: "values outside interval are less compatible with the data",
    body:
      "A confidence interval can be viewed as a set of parameter values reasonably compatible with the data at a chosen confidence level.",
    derivation:
      "For many two-sided tests, a parameter value outside the 95% confidence interval would be rejected by a corresponding 5% two-sided hypothesis test. This is because both methods use the same sampling distribution and standard error logic.",
    example:
      "If a 95% confidence interval for a mean difference is 2 to 8, then 0 is not in the interval, suggesting evidence against no difference at about the 5% level.",
    warning:
      "This connection depends on matching the test, interval, assumptions and confidence/significance levels.",
  },
  {
    title: "10. Practical interpretation",
    formula: "statistical uncertainty ≠ practical importance",
    body:
      "A confidence interval should be interpreted both statistically and practically. The interval shows uncertainty, but the values inside it must be judged in context.",
    derivation:
      "A very large sample can produce a narrow interval around a small effect. The effect may be statistically precise but practically minor. Conversely, a clinically important effect may have a wide interval if the study is underpowered.",
    example:
      "A treatment effect interval from 0.1 to 0.3 may be precise but too small to matter clinically. An interval from −1 to 9 may include important benefit but also uncertainty.",
    warning:
      "Do not reduce interpretation to whether the interval includes zero. Consider size, direction, uncertainty and context.",
  },
];

const workedExamples = [
  {
    title: "Known σ confidence interval",
    question:
      "A sample has mean x̄ = 64, population standard deviation σ = 12 and sample size n = 36. Construct an approximate 95% confidence interval for μ.",
    working:
      "SE = σ/√n = 12/√36 = 12/6 = 2. For 95% confidence, z* ≈ 1.96. Margin of error = 1.96 × 2 = 3.92. Interval = 64 ± 3.92 = 60.08 to 67.92.",
    answer: "The 95% confidence interval is approximately 60.08 to 67.92.",
    deeper:
      "The interval is centred at the sample mean. Its width reflects the standard error and the chosen confidence level.",
  },
  {
    title: "Estimated SE confidence interval",
    question:
      "A sample has x̄ = 28, s = 8 and n = 64. Use z* = 1.96 to construct an approximate 95% interval.",
    working:
      "Estimated SE = s/√n = 8/√64 = 8/8 = 1. Margin of error = 1.96 × 1 = 1.96. Interval = 28 ± 1.96 = 26.04 to 29.96.",
    answer: "The approximate 95% confidence interval is 26.04 to 29.96.",
    deeper:
      "For a formal small-sample mean interval, a t critical value may be preferred. Here z* is used for simple approximation.",
  },
  {
    title: "Effect of confidence level",
    question:
      "A study has estimate 100 and SE = 5. Compare 90%, 95% and 99% confidence intervals using z* = 1.645, 1.96 and 2.576.",
    working:
      "90%: ME = 1.645 × 5 = 8.225, interval 91.775 to 108.225. 95%: ME = 1.96 × 5 = 9.8, interval 90.2 to 109.8. 99%: ME = 2.576 × 5 = 12.88, interval 87.12 to 112.88.",
    answer: "The interval becomes wider as confidence increases.",
    deeper:
      "Higher confidence means the procedure is more cautious, so it must allow a wider range of plausible parameter values.",
  },
  {
    title: "Interpreting a confidence interval",
    question:
      "A 95% confidence interval for a mean difference is −2 to 6. How should this be interpreted?",
    working:
      "The interval includes negative values, zero and positive values. This means the data are compatible with harm, no difference and benefit within this uncertainty range.",
    answer:
      "There is uncertainty about both direction and size of the effect. The result is not clearly separated from zero.",
    deeper:
      "The best interpretation considers the full range, not only whether the interval crosses zero.",
  },
];

const practiceQuestions = [
  {
    prompt:
      "A sample mean is 50, σ = 10 and n = 25. Use z* = 1.96 to construct a 95% confidence interval.",
    answer:
      "SE = 10/√25 = 2. ME = 1.96 × 2 = 3.92. Interval = 50 ± 3.92 = 46.08 to 53.92.",
  },
  {
    prompt:
      "If an interval is 14 to 22, what is the point estimate and margin of error?",
    answer:
      "The point estimate is the midpoint: (14 + 22)/2 = 18. The margin of error is half the width: (22 − 14)/2 = 4.",
  },
  {
    prompt:
      "Explain why a 99% confidence interval is wider than a 95% confidence interval using the same data.",
    answer:
      "A 99% interval uses a larger critical value, so the margin of error is larger. This makes the interval wider.",
  },
  {
    prompt:
      "What is wrong with saying: 'There is a 95% probability that μ lies in this calculated interval'?",
    answer:
      "In the frequentist interpretation, μ is fixed and the interval is random before sampling. After calculation, the interval either contains μ or it does not. The 95% refers to long-run coverage of the method.",
  },
  {
    prompt:
      "A confidence interval for a treatment difference is 1.2 to 1.6. What does the narrow width suggest?",
    answer:
      "It suggests the estimate is precise under the assumptions of the method. Practical importance still depends on whether effects from 1.2 to 1.6 are meaningful in context.",
  },
];

const quizQuestions = [
  {
    question: "What is the general form of many confidence intervals?",
    options: [
      "estimate ± critical value × standard error",
      "sample size ± population size",
      "standard deviation ± sample mean",
      "p-value ± power",
    ],
    answer: 0,
    feedback:
      "Most confidence intervals use estimate ± critical value × standard error.",
  },
  {
    question: "What is the margin of error?",
    options: [
      "The sample mean itself.",
      "The distance from the estimate to an interval endpoint.",
      "The sample size.",
      "The population standard deviation only.",
    ],
    answer: 1,
    feedback:
      "The margin of error is critical value × standard error.",
  },
  {
    question: "If SE = 4 and z* = 1.96, what is the margin of error?",
    options: ["1.96", "4", "7.84", "15.68"],
    answer: 2,
    feedback:
      "Margin of error = 1.96 × 4 = 7.84.",
  },
  {
    question: "What happens to interval width when confidence level increases?",
    options: [
      "It usually increases.",
      "It always becomes zero.",
      "It does not change.",
      "It becomes the sample mean.",
    ],
    answer: 0,
    feedback:
      "Higher confidence uses a larger critical value, so the interval becomes wider.",
  },
  {
    question: "What is the correct long-run interpretation of 95% confidence?",
    options: [
      "95% of individual data values are inside the interval.",
      "There is exactly 95% probability that this fixed interval contains μ.",
      "About 95% of intervals from repeated samples would contain μ.",
      "The sample mean has 95% probability of being correct.",
    ],
    answer: 2,
    feedback:
      "95% confidence refers to long-run coverage of the interval procedure.",
  },
  {
    question: "If an interval is 20 to 30, what is its width?",
    options: ["5", "10", "20", "30"],
    answer: 1,
    feedback:
      "Width = upper − lower = 30 − 20 = 10.",
  },
  {
    question: "Which factor usually makes a confidence interval narrower?",
    options: [
      "Smaller sample size",
      "Larger standard error",
      "Larger sample size",
      "Higher confidence level",
    ],
    answer: 2,
    feedback:
      "Larger sample size usually lowers standard error and narrows the interval.",
  },
];

export default function ConfidenceIntervalsLesson() {
  const lessonCode = "4.2";

  if (!isStatisticsFoundationLessonOpen(lessonCode)) {
    return (
      <LockedLessonGate
        lessonCode={lessonCode}
        lessonTitle="Confidence intervals"
        moduleTitle="Module 4: Statistical Inference Foundations"
      />
    );
  }

  const [activeTab, setActiveTab] = useState("Learning Route");

  const [estimate, setEstimate] = useState(72);
  const [standardDeviation, setStandardDeviation] = useState(15);
  const [sampleSize, setSampleSize] = useState(64);
  const [confidenceLevel, setConfidenceLevel] = useState(95);

  const [trueMean, setTrueMean] = useState(70);
  const [coverageSamples, setCoverageSamples] = useState(80);

  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedPractice, setSelectedPractice] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const zStar = getZStar(confidenceLevel);
  const se = standardDeviation / Math.sqrt(sampleSize);
  const margin = zStar * se;
  const lower = estimate - margin;
  const upper = estimate + margin;
  const width = upper - lower;

  const coverageData = useMemo(() => {
    return makeIntervals({
      trueMean,
      sd: standardDeviation,
      n: sampleSize,
      confidenceLevel,
      samples: coverageSamples,
    });
  }, [trueMean, standardDeviation, sampleSize, confidenceLevel, coverageSamples]);

  const coveredCount = coverageData.filter((item) => item.covers).length;
  const coverageRate = coverageData.length === 0 ? 0 : coveredCount / coverageData.length;

  const activeExample = workedExamples[selectedExample];
  const activePractice = practiceQuestions[selectedPractice];

  const score = quizQuestions.reduce((total, question, index) => {
    return selectedAnswers[index] === question.answer ? total + 1 : total;
  }, 0);

  return (
    <main className="min-h-screen bg-[#F7F3EA] px-5 py-8 text-[#141210] md:px-8 md:py-14">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses/statistics-foundation/modules/statistical-inference-foundations")}
          className="text-sm font-black text-[#741018] hover:text-[#4d080e]"
        >
          ← Back to module
        </a>

        <section className="mt-8 overflow-hidden rounded-[2.5rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 md:p-10">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Statistics Foundation · Lesson 4.2
              </p>

              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-7xl">
                Confidence intervals.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">
                Confidence intervals turn a sample estimate into a range of
                plausible population values. This lesson explains interval
                estimation, margin of error, confidence level, long-run coverage,
                interpretation and the most common mistakes.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {["135 minutes", "No coding", "Coverage simulation", "Margin of error"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-[1.25rem] border border-[#E4DED2] bg-[#F7F3EA] p-4 text-sm font-black text-[#525252]"
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>

            <aside className="border-t border-[#E4DED2] bg-[#11100E] p-6 text-white md:p-10 lg:border-l lg:border-t-0">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Central idea
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                An interval is an estimate with uncertainty attached.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "CI = estimate ± margin of error",
                  "Margin = critical value × SE",
                  "SE measures sampling variability",
                  "Higher confidence → wider interval",
                  "Larger n → narrower interval",
                  "95% means long-run coverage",
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
                Build intervals from sampling uncertainty.
              </h2>

              <p className="mt-5 text-base leading-8 text-[#525252]">
                Lesson 4.1 introduced standard error. Lesson 4.2 shows how
                standard error becomes an interval around an estimate, and why
                confidence must be interpreted through repeated sampling.
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
                Students should interpret intervals as uncertainty ranges from a repeated-sampling method.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Explain why point estimates need uncertainty.",
                  "Construct intervals using estimate ± critical value × SE.",
                  "Calculate margin of error and interval width.",
                  "Explain how sample size affects interval width.",
                  "Explain how confidence level affects interval width.",
                  "Interpret 95% confidence as long-run coverage.",
                  "Avoid probability misinterpretations of one realised interval.",
                  "Discuss practical meaning, not only statistical significance.",
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
                A confidence interval says how uncertain the estimate is.
              </h2>

              <p className="mt-5 text-base leading-8 text-[#525252]">
                The estimate is the centre. The standard error gives the
                uncertainty scale. The confidence level decides how cautious the
                interval should be. Together, they create a principled range of
                plausible population values.
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
                Mr. R explains why confidence is long-run.
              </h2>

              <div className="mt-6 grid gap-4">
                <Dialogue speaker="Mr. R" text="Last lesson, we learned that the sample mean varies from sample to sample. Today, we use that variability to build an interval." />
                <Dialogue speaker="Amelia" text="So a confidence interval is just a range around the sample mean?" />
                <Dialogue speaker="Mr. R" text="It is a range, but not an arbitrary one. It is based on standard error and a confidence level." />
                <Dialogue speaker="Ben" text="If I calculate a 95% interval, can I say there is a 95% chance the true mean is inside it?" />
                <Dialogue speaker="Mr. R" text="That is the common mistake. In this framework, the true mean is fixed. The interval changes from sample to sample." />
                <Dialogue speaker="Chloe" text="Then what does 95% mean?" />
                <Dialogue speaker="Mr. R" text="It means that if we repeated the sampling process many times, about 95% of the intervals produced by this method would contain the true mean." />
                <Dialogue speaker="Daniel" text="So confidence is about the procedure, not one interval?" />
                <Dialogue speaker="Mr. R" text="Exactly. One interval either covers the true mean or it does not. The confidence level describes the long-run success rate of the method." />
              </div>

              <div className="mt-8 rounded-[2rem] border border-[#741018]/20 bg-[#fff4ef] p-6">
                <h3 className="text-2xl font-black tracking-[-0.04em] text-[#741018]">
                  Lecture takeaway
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#525252]">
                  Confidence intervals are built from repeated-sampling logic.
                  They show uncertainty around an estimate and prepare students
                  for hypothesis testing.
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
                Confidence intervals are repeated-sampling uncertainty statements.
              </h2>

              <p className="mt-5 max-w-4xl text-base leading-8 text-[#525252]">
                These notes derive the interval structure, margin of error,
                width, confidence level and long-run coverage interpretation in
                depth.
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
                    <InfoBlock title="Derivation" body={item.derivation} />
                    <InfoBlock title="Example" body={item.example} warning />
                    <InfoBlock title="Warning" body={item.warning} dark />
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "CI Lab" && (
          <section className="mt-8 overflow-hidden rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="p-6 md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Interactive confidence interval lab
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Build an interval from estimate, variability and sample size.
                </h2>

                <p className="mt-4 text-base leading-8 text-[#525252]">
                  Adjust the estimate, standard deviation, sample size and
                  confidence level. Watch the standard error, margin of error
                  and interval width change in real time.
                </p>

                <div className="mt-6 grid gap-5">
                  <Slider label="Estimate x̄" value={estimate} min={40} max={110} onChange={setEstimate} />
                  <Slider label="Standard deviation s or σ" value={standardDeviation} min={4} max={35} onChange={setStandardDeviation} />
                  <Slider label="Sample size n" value={sampleSize} min={4} max={300} onChange={setSampleSize} />
                  <SelectConfidence value={confidenceLevel} onChange={setConfidenceLevel} />
                </div>
              </div>

              <div className="border-t border-[#E4DED2] bg-[#11100E] p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                  Interval output
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  {lower.toFixed(2)} to {upper.toFixed(2)}
                </h2>

                <div className="mt-8 rounded-[2rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5">
                  <IntervalVisual lower={lower} estimate={estimate} upper={upper} />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <DarkMetric label="Critical value" value={zStar.toFixed(3)} />
                  <DarkMetric label="Standard error" value={se.toFixed(2)} />
                  <DarkMetric label="Margin of error" value={margin.toFixed(2)} />
                  <DarkMetric label="Interval width" value={width.toFixed(2)} />
                </div>

                <p className="mt-6 rounded-[1.5rem] bg-[#FFFCF6] p-5 text-sm font-bold leading-7 text-[#141210]">
                  Interval = {estimate.toFixed(1)} ± {zStar.toFixed(3)} ×{" "}
                  {se.toFixed(2)} = {lower.toFixed(2)} to {upper.toFixed(2)}.
                </p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "Coverage Simulator" && (
          <section className="mt-8 overflow-hidden rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="p-6 md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Coverage simulator
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Repeated intervals sometimes miss the true mean.
                </h2>

                <p className="mt-4 text-base leading-8 text-[#525252]">
                  Each horizontal line is a confidence interval from a simulated
                  repeated sample. The vertical line is the true mean. Intervals
                  that miss the true mean show why confidence is about long-run
                  coverage, not certainty.
                </p>

                <div className="mt-6 grid gap-5">
                  <Slider label="True mean μ" value={trueMean} min={40} max={110} onChange={setTrueMean} />
                  <Slider label="Standard deviation σ" value={standardDeviation} min={4} max={35} onChange={setStandardDeviation} />
                  <Slider label="Sample size n" value={sampleSize} min={4} max={300} onChange={setSampleSize} />
                  <Slider label="Number of intervals" value={coverageSamples} min={20} max={150} onChange={setCoverageSamples} />
                  <SelectConfidence value={confidenceLevel} onChange={setConfidenceLevel} />
                </div>
              </div>

              <div className="border-t border-[#E4DED2] bg-[#11100E] p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                  Simulated long-run coverage
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  {coveredCount}/{coverageData.length} cover μ.
                </h2>

                <div className="mt-8 rounded-[2rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5">
                  <CoveragePlot intervals={coverageData} trueMean={trueMean} />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <DarkMetric label="Target confidence" value={`${confidenceLevel}%`} />
                  <DarkMetric label="Observed coverage" value={`${(coverageRate * 100).toFixed(1)}%`} />
                  <DarkMetric label="Covered" value={coveredCount.toString()} />
                  <DarkMetric label="Missed" value={(coverageData.length - coveredCount).toString()} />
                </div>

                <p className="mt-6 rounded-[1.5rem] bg-[#FFFCF6] p-5 text-sm font-bold leading-7 text-[#141210]">
                  In repeated sampling, the method is designed to cover μ about{" "}
                  {confidenceLevel}% of the time. Individual intervals still may miss.
                </p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "Margin of Error" && (
          <section className="mt-8 grid gap-6">
            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Margin of error explorer
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Precision depends on variability, sample size and confidence.
              </h2>

              <p className="mt-4 max-w-4xl text-base leading-8 text-[#525252]">
                Margin of error increases when variability increases, decreases
                when sample size increases and increases when the confidence
                level becomes more cautious.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Metric label="Standard deviation" value={standardDeviation.toFixed(1)} />
                <Metric label="Sample size" value={sampleSize.toString()} />
                <Metric label="Critical value" value={zStar.toFixed(3)} />
                <Metric label="Margin of error" value={margin.toFixed(2)} />
              </div>

              <div className="mt-6 rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
                <MarginCurve sigma={standardDeviation} zStar={zStar} currentN={sampleSize} />
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-3">
              {[90, 95, 99].map((level) => {
                const z = getZStar(level);
                const m = z * se;
                return (
                  <article
                    key={level}
                    className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm"
                  >
                    <p className="text-sm font-black uppercase tracking-[0.18em] text-[#741018]">
                      {level}% confidence
                    </p>
                    <h3 className="mt-3 text-3xl font-black tracking-[-0.05em]">
                      ME = {m.toFixed(2)}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#525252]">
                      With the same estimate and SE, higher confidence increases
                      the critical value and widens the interval.
                    </p>
                  </article>
                );
              })}
            </section>
          </section>
        )}

        {activeTab === "Visual Reasoning" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Visual reasoning
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                Confidence intervals are centred on estimates, not always on truth.
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#525252]">
                Each sample gives a different estimate and therefore a different
                interval. Some intervals cover the parameter; some miss. The
                confidence level describes the long-run behaviour of this method.
              </p>

              <div className="mt-6 rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
                <CIConceptDiagram />
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Interpretation map
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                Read intervals using four questions.
              </h2>

              <div className="mt-6 grid gap-4">
                {[
                  {
                    title: "Where is the estimate?",
                    body:
                      "The centre shows the observed sample estimate.",
                  },
                  {
                    title: "How wide is the interval?",
                    body:
                      "Width reflects uncertainty and precision.",
                  },
                  {
                    title: "What values are plausible?",
                    body:
                      "Values inside the interval are more compatible with the data under the method.",
                  },
                  {
                    title: "Is the whole interval meaningful?",
                    body:
                      "Interpret the range in context, not only whether it crosses a threshold.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.5rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5"
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
            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Worked examples
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                Work through interval construction and interpretation.
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
                Practise interval construction and interpretation.
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
              Confidence intervals should be read as uncertainty ranges, not yes/no labels.
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "What is the estimate?",
                  body:
                    "The interval is centred on the observed estimate, such as a sample mean or difference.",
                },
                {
                  title: "How uncertain is it?",
                  body:
                    "The width of the interval shows uncertainty from sampling variability.",
                },
                {
                  title: "What does confidence mean?",
                  body:
                    "Confidence describes the long-run coverage of the method across repeated samples.",
                },
                {
                  title: "What is practically meaningful?",
                  body:
                    "The full interval should be judged in context, not only whether it includes a null value.",
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
                Check your understanding of interval construction, margin of
                error, width, confidence level and long-run interpretation.
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

function SelectConfidence({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <p className="text-sm font-black text-[#525252]">Confidence level</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[90, 95, 99].map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => onChange(level)}
            className={`rounded-full px-4 py-3 text-sm font-black transition ${
              value === level
                ? "bg-[#11100E] text-white"
                : "border border-[#E4DED2] bg-[#FFFCF6] text-[#525252] hover:bg-[#F7F3EA]"
            }`}
          >
            {level}%
          </button>
        ))}
      </div>
    </div>
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

function IntervalVisual({
  lower,
  estimate,
  upper,
}: {
  lower: number;
  estimate: number;
  upper: number;
}) {
  const min = lower - (upper - lower) * 0.25;
  const max = upper + (upper - lower) * 0.25;
  const scale = (value: number) => ((value - min) / (max - min)) * 100;

  return (
    <svg viewBox="0 0 520 180" className="h-auto w-full">
      <line x1="40" x2="480" y1="90" y2="90" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="8" />
      <line
        x1={40 + scale(lower) * 4.4}
        x2={40 + scale(upper) * 4.4}
        y1="90"
        y2="90"
        stroke="#ffffff"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <circle cx={40 + scale(estimate) * 4.4} cy="90" r="13" fill="#741018" />
      <text x="40" y="140" fontSize="14" fontWeight="900" fill="#ffffff">
        lower {lower.toFixed(1)}
      </text>
      <text x="210" y="60" fontSize="14" fontWeight="900" fill="#ffffff">
        estimate {estimate.toFixed(1)}
      </text>
      <text x="385" y="140" fontSize="14" fontWeight="900" fill="#ffffff">
        upper {upper.toFixed(1)}
      </text>
    </svg>
  );
}

function CoveragePlot({
  intervals,
  trueMean,
}: {
  intervals: { lower: number; upper: number; estimate: number; covers: boolean }[];
  trueMean: number;
}) {
  const displayed = intervals.slice(0, 70);
  const allValues = displayed.flatMap((item) => [item.lower, item.upper, trueMean]);
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const width = max - min || 1;
  const xScale = (value: number) => 40 + ((value - min) / width) * 430;

  return (
    <svg viewBox="0 0 520 420" className="h-auto w-full">
      <line
        x1={xScale(trueMean)}
        x2={xScale(trueMean)}
        y1="25"
        y2="390"
        stroke="#ffffff"
        strokeWidth="4"
        opacity="0.95"
      />

      {displayed.map((item, index) => {
        const y = 35 + index * 5;
        return (
          <g key={index}>
            <line
              x1={xScale(item.lower)}
              x2={xScale(item.upper)}
              y1={y}
              y2={y}
              stroke={item.covers ? "#ffffff" : "#741018"}
              strokeWidth="3"
              opacity={item.covers ? "0.75" : "1"}
            />
            <circle
              cx={xScale(item.estimate)}
              cy={y}
              r="2.5"
              fill={item.covers ? "#ffffff" : "#741018"}
            />
          </g>
        );
      })}

      <text x="45" y="410" fontSize="14" fontWeight="900" fill="#ffffff">
        vertical line = true mean μ
      </text>
    </svg>
  );
}

function MarginCurve({
  sigma,
  zStar,
  currentN,
}: {
  sigma: number;
  zStar: number;
  currentN: number;
}) {
  const points = Array.from({ length: 80 }).map((_, index) => {
    const n = 4 + index * 4;
    const margin = zStar * sigma / Math.sqrt(n);
    return { n, margin };
  });

  const maxMargin = Math.max(...points.map((point) => point.margin));
  const currentMargin = zStar * sigma / Math.sqrt(currentN);
  const currentX = ((currentN - 4) / (320 - 4)) * 100;
  const currentY = 100 - (currentMargin / maxMargin) * 90;

  const polyline = points
    .map((point) => {
      const x = ((point.n - 4) / (320 - 4)) * 100;
      const y = 100 - (point.margin / maxMargin) * 90;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" className="h-72 w-full overflow-visible">
      <line x1="0" x2="100" y1="100" y2="100" stroke="#d4d4d4" />
      <line x1="0" x2="0" y1="0" y2="100" stroke="#d4d4d4" />
      <polyline
        points={polyline}
        fill="none"
        stroke="#141210"
        strokeWidth="2.8"
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx={Math.max(0, Math.min(100, currentX))}
        cy={Math.max(0, Math.min(100, currentY))}
        r="2.5"
        fill="#741018"
      />
      <text x="3" y="8" fontSize="4" fontWeight="900" fill="#525252">
        Margin of error
      </text>
      <text x="68" y="96" fontSize="4" fontWeight="900" fill="#525252">
        sample size n
      </text>
    </svg>
  );
}

function CIConceptDiagram() {
  return (
    <svg viewBox="0 0 760 420" className="h-auto w-full">
      <rect x="35" y="55" width="690" height="300" rx="36" fill="#ffffff" stroke="#d4d4d4" strokeWidth="2" />

      <line x1="100" x2="660" y1="210" y2="210" stroke="#d4d4d4" strokeWidth="5" />
      <line x1="380" x2="380" y1="95" y2="325" stroke="#741018" strokeWidth="5" />
      <text x="350" y="85" fontSize="18" fontWeight="900" fill="#741018">
        μ
      </text>

      {[
        { y: 140, start: 250, end: 410, centre: 330, covers: true },
        { y: 180, start: 315, end: 465, centre: 390, covers: true },
        { y: 220, start: 410, end: 555, centre: 482, covers: false },
        { y: 260, start: 205, end: 370, centre: 288, covers: false },
        { y: 300, start: 300, end: 455, centre: 378, covers: true },
      ].map((item, index) => (
        <g key={index}>
          <line
            x1={item.start}
            x2={item.end}
            y1={item.y}
            y2={item.y}
            stroke={item.covers ? "#141210" : "#741018"}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <circle
            cx={item.centre}
            cy={item.y}
            r="8"
            fill={item.covers ? "#141210" : "#741018"}
          />
        </g>
      ))}

      <text x="90" y="385" fontSize="17" fontWeight="900" fill="#525252">
        Different samples create different intervals.
      </text>
      <text x="395" y="385" fontSize="17" fontWeight="900" fill="#525252">
        Some cover μ. Some miss.
      </text>
    </svg>
  );
}

function getZStar(confidenceLevel: number) {
  if (confidenceLevel === 90) return 1.645;
  if (confidenceLevel === 99) return 2.576;
  return 1.96;
}

function makeIntervals({
  trueMean,
  sd,
  n,
  confidenceLevel,
  samples,
}: {
  trueMean: number;
  sd: number;
  n: number;
  confidenceLevel: number;
  samples: number;
}) {
  const z = getZStar(confidenceLevel);
  const se = sd / Math.sqrt(n);
  const margin = z * se;

  return Array.from({ length: samples }).map((_, index) => {
    const estimate = trueMean + se * normalRandom(index * 71 + 13);
    const lower = estimate - margin;
    const upper = estimate + margin;

    return {
      estimate,
      lower,
      upper,
      covers: lower <= trueMean && trueMean <= upper,
    };
  });
}

function deterministicRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function normalRandom(seed: number) {
  const u1 = Math.max(0.0001, deterministicRandom(seed));
  const u2 = Math.max(0.0001, deterministicRandom(seed + 1));
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}
