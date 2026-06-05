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
  "Sample Size Lab",
  "Precision Lab",
  "Power Design Lab",
  "Allocation Lab",
  "Worked Examples",
  "Practice Studio",
  "Reflection",
  "Quiz",
];

const learningRoute = [
  {
    time: "0–15 min",
    title: "Why sample size matters",
    body:
      "Understand sample size as a design decision that controls precision, uncertainty and ability to detect meaningful effects.",
  },
  {
    time: "15–40 min",
    title: "Precision planning",
    body:
      "Learn how margin of error, variability and confidence level determine the sample size needed for a desired interval width.",
  },
  {
    time: "40–70 min",
    title: "Power planning",
    body:
      "Study how sample size affects the probability of detecting a meaningful effect when that effect truly exists.",
  },
  {
    time: "70–100 min",
    title: "Effect size and variability",
    body:
      "Explore how smaller effects and higher variability require larger samples.",
  },
  {
    time: "100–125 min",
    title: "Allocation and design",
    body:
      "Understand how balanced and unbalanced group sizes affect precision in comparative studies.",
  },
  {
    time: "125–155 min",
    title: "Quality of evidence",
    body:
      "Connect sample size to study design, bias, representativeness, feasibility, ethics and reporting.",
  },
];

const lectureCards = [
  {
    title: "Sample size is not just about being large",
    body:
      "A good sample size is large enough to answer the research question with useful precision, but not wastefully large.",
    example:
      "A study may need 400 people for precise prevalence estimation but far fewer for a simple pilot study.",
  },
  {
    title: "Precision depends on standard error",
    body:
      "Larger samples reduce standard error, making confidence intervals narrower.",
    example:
      "For a mean, SE = σ/√n, so increasing n reduces uncertainty.",
  },
  {
    title: "Power depends on detectable effect",
    body:
      "Power is higher when the true effect is large relative to the standard error.",
    example:
      "A 10-unit improvement is easier to detect than a 2-unit improvement when variability is the same.",
  },
  {
    title: "Variability increases required sample size",
    body:
      "Noisy measurements make effects harder to estimate precisely and harder to detect.",
    example:
      "Blood pressure measured inconsistently requires larger samples than a very reliable lab measurement.",
  },
  {
    title: "Balanced allocation is often efficient",
    body:
      "For two-group comparisons, equal group sizes usually give better precision for a fixed total sample size.",
    example:
      "50 treatment and 50 control participants are usually more precise than 80 treatment and 20 control.",
  },
  {
    title: "Design quality matters as much as sample size",
    body:
      "A large biased sample can give a precise but wrong answer. Good design controls bias, measurement quality and representativeness.",
    example:
      "A huge convenience sample may not represent the population of interest.",
  },
];

const detailedNotes = [
  {
    title: "1. Sample size as a design decision",
    formula: "n determines precision and power",
    body:
      "Sample size is one of the most important study design decisions. It affects the width of confidence intervals, the standard error of estimates and the probability of detecting meaningful effects.",
    derivation:
      "For many estimators, uncertainty decreases as sample size increases. For a sample mean, SE(x̄) = σ/√n. Since n appears under a square root, gains are real but diminishing: quadrupling n halves the standard error.",
    example:
      "If σ = 20, then n = 25 gives SE = 4, while n = 100 gives SE = 2.",
    warning:
      "More data do not automatically fix bias, poor measurement, confounding or an unclear research question.",
  },
  {
    title: "2. Precision-based sample size for a mean",
    formula: "n = (z*σ / ME)²",
    body:
      "When planning a confidence interval for a mean, one approach is to choose a desired margin of error and solve for the required sample size.",
    derivation:
      "For a mean with known or anticipated σ, margin of error is ME = z*σ/√n. Rearranging gives √n = z*σ/ME, so n = (z*σ/ME)².",
    example:
      "If σ = 12, desired ME = 3 and z* = 1.96, then n = (1.96 × 12 / 3)² ≈ 61.47, so round up to 62.",
    warning:
      "Always round sample size up, not down, because a smaller n gives a larger margin of error.",
  },
  {
    title: "3. Precision-based sample size for a proportion",
    formula: "n = z*² p(1 − p) / ME²",
    body:
      "For estimating a population proportion, sample size depends on the anticipated proportion, confidence level and desired margin of error.",
    derivation:
      "The standard error of a sample proportion is approximately √[p(1 − p)/n]. Margin of error is ME = z*√[p(1 − p)/n]. Squaring and rearranging gives n = z*²p(1 − p)/ME².",
    example:
      "For 95% confidence, p = 0.5 and ME = 0.05, n = 1.96² × 0.25 / 0.05² ≈ 384.16, so n = 385.",
    warning:
      "If p is unknown, p = 0.5 gives the most conservative largest sample size because p(1 − p) is maximised at 0.5.",
  },
  {
    title: "4. Minimum detectable effect",
    formula: "detectable effect ≈ critical value × SE",
    body:
      "A study can only reliably detect effects that are large enough relative to the standard error. The minimum detectable effect is the smallest effect the study can identify with chosen power and significance.",
    derivation:
      "A test statistic is effect estimate divided by SE. To reject H₀, this statistic must exceed a critical threshold. For power planning, the real effect must be large enough to move the alternative distribution beyond the rejection threshold with high probability.",
    example:
      "If SE = 2, detecting a 1-unit effect is difficult, but detecting a 6-unit effect is much easier.",
    warning:
      "A study designed only for very large effects may miss smaller but still meaningful effects.",
  },
  {
    title: "5. Power-based sample size for a one-sample mean",
    formula: "n ≈ [(zα/2 + zβ)σ / δ]²",
    body:
      "For a two-sided one-sample mean test, approximate sample size depends on the significance level, desired power, standard deviation and target effect δ.",
    derivation:
      "To reject H₀ with power 1 − β for true effect δ, the alternative distribution must be shifted far enough beyond the null critical value. This gives δ/(σ/√n) ≈ zα/2 + zβ. Solving gives n ≈ [(zα/2 + zβ)σ/δ]².",
    example:
      "For α = 0.05, power = 80%, σ = 10 and δ = 4, n ≈ [(1.96 + 0.84)10/4]² = 49.",
    warning:
      "This is an approximate planning formula. Real studies may need adjustments for unequal allocation, clustering, dropout or non-normal outcomes.",
  },
  {
    title: "6. Two-group comparison and allocation",
    formula: "SE(x̄₁ − x̄₂) = σ√(1/n₁ + 1/n₂)",
    body:
      "For comparing two independent group means with common standard deviation σ, precision depends on both group sizes.",
    derivation:
      "Var(x̄₁ − x̄₂) = Var(x̄₁) + Var(x̄₂) = σ²/n₁ + σ²/n₂ = σ²(1/n₁ + 1/n₂). Taking the square root gives SE = σ√(1/n₁ + 1/n₂).",
    example:
      "With total n = 100 and σ = 10, allocation 50/50 gives SE = 10√(1/50 + 1/50) = 2.0. Allocation 80/20 gives SE = 10√(1/80 + 1/20) ≈ 2.50.",
    warning:
      "For fixed total sample size, strong imbalance usually reduces precision unless there is a special reason for unequal allocation.",
  },
  {
    title: "7. Diminishing returns",
    formula: "SE ∝ 1/√n",
    body:
      "Sample size has diminishing returns because uncertainty shrinks with the square root of n, not directly with n.",
    derivation:
      "If SE = σ/√n, then increasing n by a factor k divides SE by √k. Doubling n divides SE by √2, not 2. To halve SE, n must be multiplied by 4.",
    example:
      "Moving from n = 25 to n = 100 halves SE. Moving from n = 100 to n = 400 halves it again.",
    warning:
      "Very large increases in n may be required for modest precision gains.",
  },
  {
    title: "8. Dropout and inflation",
    formula: "n_adjusted = n_required / (1 − dropout rate)",
    body:
      "Planned sample size should account for expected missing data, dropout or loss to follow-up.",
    derivation:
      "If only a proportion 1 − d of participants is expected to remain usable, then the recruited sample size must satisfy recruited × (1 − d) = required. Therefore recruited = required/(1 − d).",
    example:
      "If 200 complete cases are required and dropout is expected to be 20%, recruit 200/0.80 = 250 participants.",
    warning:
      "Dropout can also introduce bias if missingness is related to outcome or treatment response.",
  },
  {
    title: "9. Design effect and clustering",
    formula: "n_clustered ≈ n_simple × design effect",
    body:
      "Clustered or correlated observations contain less independent information than the same number of independent observations.",
    derivation:
      "When participants are grouped in clusters, responses within a cluster may be similar. The effective amount of information is reduced. A design effect greater than 1 inflates the required sample size.",
    example:
      "If a simple random sample requires 300 participants and the design effect is 1.5, the clustered design may require about 450 participants.",
    warning:
      "Ignoring clustering can make standard errors too small and conclusions too confident.",
  },
  {
    title: "10. Bias is not solved by large n",
    formula: "large n reduces random error, not systematic error",
    body:
      "Increasing sample size reduces sampling variability, but it does not automatically remove bias.",
    derivation:
      "Random error shrinks as n grows because estimates become more stable. Systematic error comes from design problems such as non-representative sampling, confounding, measurement bias or selection bias. These do not necessarily disappear with larger n.",
    example:
      "A huge online poll may precisely estimate the opinion of online respondents but still fail to represent the target population.",
    warning:
      "A precise biased estimate can be more misleading than an imprecise honest estimate.",
  },
  {
    title: "11. Feasibility and ethics",
    formula: "scientific value must justify participant burden",
    body:
      "Sample size planning is also ethical. Studies should be large enough to answer the question but not larger than necessary.",
    derivation:
      "Too small a study may waste participant effort because it cannot answer the research question. Too large a study may expose unnecessary participants to burden, cost or risk.",
    example:
      "Clinical trials should justify sample size using meaningful effect sizes and realistic assumptions.",
    warning:
      "Do not choose sample size only because it is convenient. Explain the scientific and practical justification.",
  },
  {
    title: "12. Reporting sample size decisions",
    formula: "report assumptions: α, power, effect, variability, dropout",
    body:
      "A transparent sample size justification states the assumptions used and explains why they are reasonable.",
    derivation:
      "Readers need to know the target effect size, variability assumption, significance level, desired power, allocation ratio, dropout adjustment and method used. Without these, the sample size is difficult to evaluate.",
    example:
      "A report may say: 'We required 128 participants per group to detect a 5-unit difference with 80% power at two-sided α = 0.05, assuming σ = 14 and allowing 15% dropout.'",
    warning:
      "Unjustified sample sizes weaken the credibility of the study design.",
  },
];

const workedExamples = [
  {
    title: "Precision sample size for a mean",
    question:
      "A researcher wants a 95% confidence interval for a mean with margin of error at most 3. Previous studies suggest σ = 12. What sample size is needed?",
    working:
      "Use n = (z*σ/ME)². For 95%, z* = 1.96. n = (1.96 × 12 / 3)² = 7.84² = 61.47. Round up to 62.",
    answer: "At least 62 participants are needed.",
    deeper:
      "Rounding down to 61 would make the margin of error slightly larger than planned, so always round up.",
  },
  {
    title: "Sample size for a proportion",
    question:
      "Estimate a prevalence with 95% confidence and margin of error 5%. If no prior estimate of prevalence is available, what n should be used?",
    working:
      "Use p = 0.5 for conservative planning. n = z*²p(1 − p)/ME² = 1.96² × 0.25 / 0.05² = 384.16. Round up to 385.",
    answer: "Use n = 385.",
    deeper:
      "p = 0.5 gives the largest p(1 − p), so it gives the largest required n.",
  },
  {
    title: "Dropout adjustment",
    question:
      "A study needs 180 complete participants. Expected dropout is 10%. How many should be recruited?",
    working:
      "n_adjusted = 180/(1 − 0.10) = 180/0.90 = 200.",
    answer: "Recruit 200 participants.",
    deeper:
      "This assumes dropout affects only sample size. If dropout is related to outcome, it may also cause bias.",
  },
  {
    title: "Balanced versus unbalanced groups",
    question:
      "Compare SE for two independent group means with σ = 10 and total sample size 100 under 50/50 versus 80/20 allocation.",
    working:
      "For 50/50, SE = 10√(1/50 + 1/50) = 10√0.04 = 2. For 80/20, SE = 10√(1/80 + 1/20) = 10√0.0625 = 2.5.",
    answer: "The balanced allocation has smaller SE: 2 versus 2.5.",
    deeper:
      "Unbalanced allocation wastes precision when total sample size is fixed, unless justified by cost, ethics or availability.",
  },
];

const practiceQuestions = [
  {
    prompt:
      "A mean is to be estimated with σ = 16, 95% confidence and ME = 4. Find the required n.",
    answer:
      "n = (1.96 × 16 / 4)² = 7.84² = 61.47, so n = 62.",
  },
  {
    prompt:
      "A proportion is planned with p = 0.30, 95% confidence and ME = 0.04. Find n.",
    answer:
      "n = 1.96² × 0.30 × 0.70 / 0.04² = 3.8416 × 0.21 / 0.0016 ≈ 504.21, so n = 505.",
  },
  {
    prompt:
      "If n is multiplied by 4, what happens to SE for a mean?",
    answer:
      "SE is divided by √4 = 2, so it halves.",
  },
  {
    prompt:
      "Why can a very large biased sample be misleading?",
    answer:
      "Large n reduces random error but not systematic error. A biased sample can produce a precise estimate of the wrong target.",
  },
  {
    prompt:
      "A study requires 300 complete cases and expects 25% dropout. How many should be recruited?",
    answer:
      "n_adjusted = 300/(1 − 0.25) = 300/0.75 = 400.",
  },
];

const quizQuestions = [
  {
    question: "For estimating a mean, which formula gives precision-based sample size?",
    options: [
      "n = (z*σ / ME)²",
      "n = σ / ME",
      "n = ME / z*",
      "n = p(1 − p)",
    ],
    answer: 0,
    feedback:
      "For a mean, n = (z*σ / ME)².",
  },
  {
    question: "What happens to SE when n increases?",
    options: [
      "It usually decreases.",
      "It always increases.",
      "It becomes the p-value.",
      "It becomes the effect size.",
    ],
    answer: 0,
    feedback:
      "For many estimators, larger n reduces standard error.",
  },
  {
    question: "Why is p = 0.5 often used for conservative proportion planning?",
    options: [
      "It minimises p(1 − p).",
      "It maximises p(1 − p).",
      "It makes ME zero.",
      "It removes bias.",
    ],
    answer: 1,
    feedback:
      "p(1 − p) is largest at p = 0.5, giving the largest required sample size.",
  },
  {
    question: "Which change usually increases required sample size?",
    options: [
      "Larger desired margin of error.",
      "Smaller variability.",
      "Smaller target effect size.",
      "Lower confidence level.",
    ],
    answer: 2,
    feedback:
      "Smaller target effects are harder to detect and usually require larger samples.",
  },
  {
    question: "What does dropout adjustment do?",
    options: [
      "Reduces the planned sample size.",
      "Inflates recruitment target to preserve final complete cases.",
      "Eliminates all bias.",
      "Changes the population mean.",
    ],
    answer: 1,
    feedback:
      "Dropout adjustment increases recruitment to account for expected losses.",
  },
  {
    question: "For fixed total n in a two-group comparison, what is often most efficient?",
    options: [
      "Very unbalanced allocation.",
      "Balanced allocation.",
      "No control group.",
      "Ignoring variability.",
    ],
    answer: 1,
    feedback:
      "Balanced allocation often minimises standard error for fixed total n.",
  },
  {
    question: "What does large sample size not automatically fix?",
    options: [
      "Sampling variability.",
      "Standard error.",
      "Bias from poor design.",
      "Precision.",
    ],
    answer: 2,
    feedback:
      "Large sample size reduces random error but does not automatically remove bias.",
  },
];

export default function SampleSizeStudyDesignLesson() {
  const lessonCode = "4.5";

  if (!isStatisticsFoundationLessonOpen(lessonCode)) {
    return (
      <LockedLessonGate
        lessonCode={lessonCode}
        lessonTitle="Sample size and study design"
        moduleTitle="Module 4: Statistical Inference Foundations"
      />
    );
  }

  const [activeTab, setActiveTab] = useState("Learning Route");

  const [sigma, setSigma] = useState(12);
  const [margin, setMargin] = useState(3);
  const [confidence, setConfidence] = useState(95);

  const [effect, setEffect] = useState(5);
  const [powerTarget, setPowerTarget] = useState(80);
  const [alpha, setAlpha] = useState(5);

  const [totalN, setTotalN] = useState(100);
  const [allocationPercent, setAllocationPercent] = useState(50);

  const [dropout, setDropout] = useState(15);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedPractice, setSelectedPractice] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const z = getZ(confidence);
  const precisionN = Math.ceil(((z * sigma) / margin) ** 2);
  const adjustedN = Math.ceil(precisionN / (1 - dropout / 100));

  const powerZ = getPowerZ(powerTarget);
  const alphaZ = alpha <= 1 ? 2.576 : alpha <= 5 ? 1.96 : 1.645;
  const powerN = Math.ceil(((alphaZ + powerZ) * sigma / Math.max(effect, 0.1)) ** 2);

  const n1 = Math.max(1, Math.round((totalN * allocationPercent) / 100));
  const n2 = Math.max(1, totalN - n1);
  const twoGroupSE = sigma * Math.sqrt(1 / n1 + 1 / n2);
  const balancedSE = sigma * Math.sqrt(1 / (totalN / 2) + 1 / (totalN / 2));

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
                Statistics Foundation · Lesson 4.5
              </p>

              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-7xl">
                Sample size and study design.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">
                Sample size planning connects mathematics with responsible study
                design. This lesson explains how sample size, variability,
                effect size, power, allocation, precision, dropout and bias shape
                the quality of statistical evidence.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {["155 minutes", "No coding", "Power planning", "Study design"].map(
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
                Sample size controls random error, not design bias.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Precision: margin of error",
                  "Power: detect meaningful effects",
                  "Larger n → smaller SE",
                  "Higher variability → larger n",
                  "Dropout requires inflation",
                  "Good design prevents bias",
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
                Move from inference interpretation to study planning.
              </h2>

              <p className="mt-5 text-base leading-8 text-[#525252]">
                Previous lessons interpreted confidence intervals, p-values and
                power. This lesson moves earlier in the research process: how
                should a study be designed so that the evidence is precise,
                powerful and credible?
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
                Students should connect sample size to evidence quality.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Calculate sample size for a desired margin of error.",
                  "Explain why n grows with variability.",
                  "Explain why smaller effects require larger samples.",
                  "Adjust sample size for dropout.",
                  "Compare balanced and unbalanced allocation.",
                  "Explain diminishing returns from increasing n.",
                  "Distinguish random error from systematic bias.",
                  "Report sample size assumptions transparently.",
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
                A study should be designed before the data are collected.
              </h2>

              <p className="mt-5 text-base leading-8 text-[#525252]">
                Sample size planning asks how much information is needed. The
                answer depends on the research goal: estimating a parameter
                precisely, detecting a meaningful effect, comparing groups or
                producing credible evidence under real constraints.
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
                Mr. R explains why bigger is not always better.
              </h2>

              <div className="mt-6 grid gap-4">
                <Dialogue speaker="Mr. R" text="Today we move from interpreting evidence to designing studies that can produce useful evidence." />
                <Dialogue speaker="Amelia" text="Does that mean we should always collect the biggest possible sample?" />
                <Dialogue speaker="Mr. R" text="Not exactly. Bigger samples reduce random error, but they cost time, money and participant effort. We need enough information for the question." />
                <Dialogue speaker="Ben" text="So if we want a narrow confidence interval, we plan around margin of error?" />
                <Dialogue speaker="Mr. R" text="Correct. Precision planning starts with the desired margin of error." />
                <Dialogue speaker="Chloe" text="And if we want to detect an effect, we plan around power?" />
                <Dialogue speaker="Mr. R" text="Exactly. Power planning starts with a meaningful effect size." />
                <Dialogue speaker="Daniel" text="Can a huge study still be bad?" />
                <Dialogue speaker="Mr. R" text="Yes. A huge biased sample can be precisely wrong. Design quality matters as much as sample size." />
              </div>

              <div className="mt-8 rounded-[2rem] border border-[#741018]/20 bg-[#fff4ef] p-6">
                <h3 className="text-2xl font-black tracking-[-0.04em] text-[#741018]">
                  Lecture takeaway
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#525252]">
                  Sample size planning is not a mechanical afterthought. It is
                  where statistical reasoning, scientific goals, feasibility and
                  ethics meet.
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
                Sample size links precision, power, feasibility and bias control.
              </h2>

              <p className="mt-5 max-w-4xl text-base leading-8 text-[#525252]">
                These notes develop precision-based and power-based sample size
                logic, then connect mathematical planning to design quality and
                transparent reporting.
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

        {activeTab === "Sample Size Lab" && (
          <section className="mt-8 overflow-hidden rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="p-6 md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Precision sample size lab
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Plan n from margin of error.
                </h2>

                <p className="mt-4 text-base leading-8 text-[#525252]">
                  Choose anticipated variability, desired margin of error,
                  confidence level and dropout. The calculator gives the
                  required complete-case sample size and adjusted recruitment
                  target.
                </p>

                <div className="mt-6 grid gap-5">
                  <Slider label="Anticipated σ" value={sigma} min={4} max={40} onChange={setSigma} />
                  <Slider label="Desired margin of error" value={margin} min={1} max={15} onChange={setMargin} />
                  <ConfidenceSelector value={confidence} onChange={setConfidence} />
                  <Slider label="Expected dropout" value={dropout} min={0} max={40} suffix="%" onChange={setDropout} />
                </div>
              </div>

              <div className="border-t border-[#E4DED2] bg-[#11100E] p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                  Sample size output
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Recruit {adjustedN}.
                </h2>

                <div className="mt-8 rounded-[2rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5">
                  <SampleSizeVisual required={precisionN} adjusted={adjustedN} />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <DarkMetric label="z*" value={z.toFixed(3)} />
                  <DarkMetric label="Complete n" value={precisionN.toString()} />
                  <DarkMetric label="Dropout" value={`${dropout}%`} />
                  <DarkMetric label="Recruitment n" value={adjustedN.toString()} />
                </div>

                <p className="mt-6 rounded-[1.5rem] bg-[#FFFCF6] p-5 text-sm font-bold leading-7 text-[#141210]">
                  n = (z*σ/ME)² = ({z.toFixed(3)} × {sigma} / {margin})².
                  Round up, then inflate for expected dropout.
                </p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "Precision Lab" && (
          <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
              Precision curve
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Margin of error falls slowly as n increases.
            </h2>

            <p className="mt-4 max-w-4xl text-base leading-8 text-[#525252]">
              The square-root relationship creates diminishing returns. Large
              increases in sample size may be needed for smaller improvements in
              precision.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Metric label="σ" value={sigma.toString()} />
              <Metric label="z*" value={z.toFixed(3)} />
              <Metric label="Target ME" value={margin.toString()} />
            </div>

            <div className="mt-6 rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
              <PrecisionCurve sigma={sigma} z={z} targetME={margin} />
            </div>
          </section>
        )}

        {activeTab === "Power Design Lab" && (
          <section className="mt-8 overflow-hidden rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="p-6 md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Power design lab
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Plan n to detect a meaningful effect.
                </h2>

                <p className="mt-4 text-base leading-8 text-[#525252]">
                  Power planning begins with a target effect size. Smaller
                  effects require larger samples. Higher variability also
                  increases the required sample size.
                </p>

                <div className="mt-6 grid gap-5">
                  <Slider label="Meaningful effect δ" value={effect} min={1} max={25} onChange={setEffect} />
                  <Slider label="Anticipated σ" value={sigma} min={4} max={40} onChange={setSigma} />
                  <Slider label="Significance level α" value={alpha} min={1} max={10} suffix="%" onChange={setAlpha} />
                  <PowerSelector value={powerTarget} onChange={setPowerTarget} />
                </div>
              </div>

              <div className="border-t border-[#E4DED2] bg-[#11100E] p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                  Power-planned n
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  n ≈ {powerN}.
                </h2>

                <div className="mt-8 rounded-[2rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5">
                  <PowerPlanningVisual effect={effect} sigma={sigma} n={powerN} />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <DarkMetric label="Effect δ" value={effect.toString()} />
                  <DarkMetric label="σ" value={sigma.toString()} />
                  <DarkMetric label="Target power" value={`${powerTarget}%`} />
                  <DarkMetric label="Approx n" value={powerN.toString()} />
                </div>

                <p className="mt-6 rounded-[1.5rem] bg-[#FFFCF6] p-5 text-sm font-bold leading-7 text-[#141210]">
                  Approximate formula: n ≈ [(zα/2 + zβ)σ/δ]². This simple
                  version is for a one-sample mean-style setting.
                </p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "Allocation Lab" && (
          <section className="mt-8 overflow-hidden rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="p-6 md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Allocation lab
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Compare balanced and unbalanced group sizes.
                </h2>

                <p className="mt-4 text-base leading-8 text-[#525252]">
                  For two independent groups, precision depends on both group
                  sizes. Strong imbalance can increase standard error even if
                  the total sample size is unchanged.
                </p>

                <div className="mt-6 grid gap-5">
                  <Slider label="Total sample size" value={totalN} min={20} max={500} onChange={setTotalN} />
                  <Slider label="Percent in group 1" value={allocationPercent} min={10} max={90} suffix="%" onChange={setAllocationPercent} />
                  <Slider label="Common σ" value={sigma} min={4} max={40} onChange={setSigma} />
                </div>
              </div>

              <div className="border-t border-[#E4DED2] bg-[#11100E] p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                  Allocation output
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  n₁ = {n1}, n₂ = {n2}.
                </h2>

                <div className="mt-8 rounded-[2rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5">
                  <AllocationVisual n1={n1} n2={n2} />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <DarkMetric label="Current SE" value={twoGroupSE.toFixed(2)} />
                  <DarkMetric label="Balanced SE" value={balancedSE.toFixed(2)} />
                  <DarkMetric label="Group 1" value={n1.toString()} />
                  <DarkMetric label="Group 2" value={n2.toString()} />
                </div>

                <p className="mt-6 rounded-[1.5rem] bg-[#FFFCF6] p-5 text-sm font-bold leading-7 text-[#141210]">
                  SE(x̄₁ − x̄₂) = σ√(1/n₁ + 1/n₂). Equal groups are often most
                  efficient for a fixed total sample size.
                </p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "Worked Examples" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Worked examples
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                Work through planning calculations.
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
                Practise planning and interpretation.
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
              Sample size planning is about asking what evidence the study must produce.
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "What is the goal?",
                  body:
                    "Precision planning and power planning answer different design questions.",
                },
                {
                  title: "What assumptions are used?",
                  body:
                    "Variability, effect size, confidence, power, dropout and allocation must be justified.",
                },
                {
                  title: "What can larger n fix?",
                  body:
                    "It reduces random error, but it does not automatically fix bias or poor measurement.",
                },
                {
                  title: "What should be reported?",
                  body:
                    "A transparent study reports the sample size method, assumptions and design limitations.",
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
                Check your understanding of precision planning, power,
                allocation, dropout and design quality.
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

function ConfidenceSelector({
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

function PowerSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <p className="text-sm font-black text-[#525252]">Target power</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[80, 90, 95].map((level) => (
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

function SampleSizeVisual({
  required,
  adjusted,
}: {
  required: number;
  adjusted: number;
}) {
  const max = Math.max(adjusted, required, 1);

  return (
    <svg viewBox="0 0 520 220" className="h-auto w-full">
      <text x="30" y="42" fontSize="16" fontWeight="900" fill="#ffffff">
        Complete-case requirement
      </text>
      <rect x="30" y="58" width={(required / max) * 440} height="38" rx="18" fill="#ffffff" />

      <text x="30" y="132" fontSize="16" fontWeight="900" fill="#ffffff">
        Recruitment after dropout adjustment
      </text>
      <rect x="30" y="148" width={(adjusted / max) * 440} height="38" rx="18" fill="#741018" />

      <text x="390" y="84" fontSize="15" fontWeight="900" fill="#ffffff">
        {required}
      </text>
      <text x="390" y="174" fontSize="15" fontWeight="900" fill="#ffffff">
        {adjusted}
      </text>
    </svg>
  );
}

function PrecisionCurve({
  sigma,
  z,
  targetME,
}: {
  sigma: number;
  z: number;
  targetME: number;
}) {
  const points = Array.from({ length: 90 }).map((_, index) => {
    const n = 10 + index * 5;
    const me = z * sigma / Math.sqrt(n);
    return { n, me };
  });

  const maxME = Math.max(...points.map((p) => p.me));
  const path = points
    .map((p, i) => {
      const x = ((p.n - 10) / (455 - 10)) * 100;
      const y = 100 - (p.me / maxME) * 90;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  const targetY = 100 - (targetME / maxME) * 90;

  return (
    <svg viewBox="0 0 100 100" className="h-72 w-full overflow-visible">
      <line x1="0" x2="100" y1="100" y2="100" stroke="#d4d4d4" />
      <line x1="0" x2="0" y1="0" y2="100" stroke="#d4d4d4" />
      <path d={path} fill="none" stroke="#141210" strokeWidth="2.8" vectorEffect="non-scaling-stroke" />
      <line
        x1="0"
        x2="100"
        y1={Math.max(0, Math.min(100, targetY))}
        y2={Math.max(0, Math.min(100, targetY))}
        stroke="#741018"
        strokeWidth="2"
        strokeDasharray="4 4"
        vectorEffect="non-scaling-stroke"
      />
      <text x="3" y="8" fontSize="4" fontWeight="900" fill="#525252">
        Margin of error
      </text>
      <text x="72" y="96" fontSize="4" fontWeight="900" fill="#525252">
        sample size
      </text>
    </svg>
  );
}

function PowerPlanningVisual({
  effect,
  sigma,
  n,
}: {
  effect: number;
  sigma: number;
  n: number;
}) {
  const se = sigma / Math.sqrt(Math.max(n, 1));
  const shift = effect / Math.max(se, 0.001);

  return (
    <svg viewBox="0 0 620 300" className="h-auto w-full">
      <path d={normalPath(60, 230, 450, 120, 0)} fill="none" stroke="#ffffff" strokeWidth="4" opacity="0.75" />
      <path d={normalPath(60, 230, 450, 120, Math.min(3, shift))} fill="none" stroke="#741018" strokeWidth="4" />
      <line x1="60" x2="510" y1="230" y2="230" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="3" />
      <text x="70" y="265" fontSize="14" fontWeight="900" fill="#ffffff">
        white = null
      </text>
      <text x="240" y="265" fontSize="14" fontWeight="900" fill="#ffffff">
        red = meaningful effect
      </text>
      <text x="390" y="45" fontSize="14" fontWeight="900" fill="#ffffff">
        effect / SE = {shift.toFixed(2)}
      </text>
    </svg>
  );
}

function AllocationVisual({ n1, n2 }: { n1: number; n2: number }) {
  const total = n1 + n2;
  const p1 = total === 0 ? 50 : (n1 / total) * 100;
  const p2 = 100 - p1;

  return (
    <svg viewBox="0 0 520 220" className="h-auto w-full">
      <text x="30" y="45" fontSize="16" fontWeight="900" fill="#ffffff">
        Allocation split
      </text>
      <rect x="30" y="78" width={(p1 / 100) * 440} height="54" rx="22" fill="#ffffff" />
      <rect x={30 + (p1 / 100) * 440} y="78" width={(p2 / 100) * 440} height="54" rx="22" fill="#741018" />
      <text x="40" y="112" fontSize="15" fontWeight="900" fill="#141210">
        Group 1: {n1}
      </text>
      <text x="300" y="112" fontSize="15" fontWeight="900" fill="#ffffff">
        Group 2: {n2}
      </text>
      <text x="30" y="175" fontSize="14" fontWeight="900" fill="#ffffff">
        Strong imbalance increases SE for comparing means.
      </text>
    </svg>
  );
}

function normalPath(
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

function getZ(confidence: number) {
  if (confidence === 90) return 1.645;
  if (confidence === 99) return 2.576;
  return 1.96;
}

function getPowerZ(power: number) {
  if (power >= 95) return 1.645;
  if (power >= 90) return 1.282;
  return 0.842;
}
