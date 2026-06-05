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
  "Sampling Lab",
  "Standard Error Lab",
  "Visual Reasoning",
  "Worked Examples",
  "Practice Studio",
  "Reflection",
  "Quiz",
];

const learningRoute = [
  {
    time: "0–15 min",
    title: "From probability to inference",
    body:
      "Understand why inference begins with the idea that different samples produce different statistics.",
  },
  {
    time: "15–35 min",
    title: "Population, sample and statistic",
    body:
      "Separate the fixed but usually unknown population value from the random statistic calculated from a sample.",
  },
  {
    time: "35–60 min",
    title: "Sampling variability",
    body:
      "Study why sample means vary from sample to sample, even when all samples come from the same population.",
  },
  {
    time: "60–85 min",
    title: "Sampling distribution",
    body:
      "Understand the distribution of a statistic across repeated hypothetical samples.",
  },
  {
    time: "85–110 min",
    title: "Standard error",
    body:
      "Derive and interpret the standard error of the sample mean as σ divided by the square root of n.",
  },
  {
    time: "110–135 min",
    title: "Inference connection",
    body:
      "Connect standard error to uncertainty, confidence intervals, hypothesis tests and statistical evidence.",
  },
];

const lectureCards = [
  {
    title: "Inference begins because samples vary",
    body:
      "If we repeatedly take samples from the same population, the sample mean will not be identical every time.",
    example:
      "Five different samples of 30 students may produce five slightly different average exam scores.",
  },
  {
    title: "A parameter belongs to the population",
    body:
      "A parameter is a numerical feature of the population. It is usually fixed but unknown.",
    example:
      "The true mean height of all students in a university is a parameter.",
  },
  {
    title: "A statistic belongs to the sample",
    body:
      "A statistic is calculated from sample data. Because the sample is random, the statistic is random.",
    example:
      "The mean height of 40 sampled students is a statistic.",
  },
  {
    title: "Sampling distribution means repeated-sample behaviour",
    body:
      "A sampling distribution describes how a statistic behaves across many possible samples of the same size.",
    example:
      "The sampling distribution of the mean shows where sample means tend to fall.",
  },
  {
    title: "Standard error measures statistic uncertainty",
    body:
      "Standard error is the standard deviation of a sampling distribution. It measures how much the statistic varies from sample to sample.",
    example:
      "A smaller standard error means sample means are more tightly clustered around the population mean.",
  },
  {
    title: "Larger samples reduce uncertainty",
    body:
      "For the sample mean, standard error decreases as sample size increases because information accumulates.",
    example:
      "Increasing n from 25 to 100 halves the standard error, because √100 is twice √25.",
  },
];

const detailedNotes = [
  {
    title: "1. Population, parameter, sample and statistic",
    formula: "Population parameter: μ; sample statistic: x̄",
    body:
      "Statistical inference begins with a distinction between the population and the sample. The population is the full group of interest. A parameter is a numerical feature of that population. A sample is the observed subset. A statistic is a numerical summary calculated from the sample.",
    derivation:
      "If the population values are Y₁, Y₂, ..., Y_N, the population mean is μ = (Y₁ + Y₂ + ... + Y_N)/N. If a sample of size n is observed, the sample mean is x̄ = (X₁ + X₂ + ... + X_n)/n. The population mean μ is fixed for the population, while x̄ changes when the sample changes.",
    example:
      "If we want the average blood pressure of all adults in a city, the true city mean is μ. If we measure 200 adults and calculate their average, that average is x̄.",
    warning:
      "Do not confuse the sample mean with the population mean. The sample mean estimates the population mean; it is not usually exactly equal to it.",
  },
  {
    title: "2. Why a statistic is random",
    formula: "x̄ depends on X₁, X₂, ..., X_n",
    body:
      "A statistic is random because it depends on which observations enter the sample. Before the sample is collected, the sample values are uncertain. Therefore the statistic calculated from them is also uncertain.",
    derivation:
      "The sample mean is x̄ = (X₁ + ... + X_n)/n. Each X_i is a random variable before observation. A function of random variables is also random, so x̄ is a random variable before the data are observed.",
    example:
      "If one sample contains unusually high values, its mean will be higher. Another sample from the same population may contain more typical values and have a lower mean.",
    warning:
      "A statistic has one observed value after data collection, but before sampling it has a distribution of possible values.",
  },
  {
    title: "3. Sampling variability",
    formula: "Different random samples → different statistics",
    body:
      "Sampling variability is the natural variation in a statistic from sample to sample. It does not necessarily mean something went wrong. It is the reason inference needs probability.",
    derivation:
      "Suppose the population mean is μ. Each sample produces its own x̄. The difference x̄ − μ is the sampling error. Across repeated samples, this error changes direction and size.",
    example:
      "A sample mean of 72 and another sample mean of 75 may both be reasonable estimates of the same population mean if sampling variability is expected.",
    warning:
      "Sampling variability is not the same as measurement error. Even perfectly measured random samples vary.",
  },
  {
    title: "4. Sampling distribution",
    formula: "Distribution of x̄ across repeated samples",
    body:
      "The sampling distribution of a statistic is the probability distribution of that statistic over all possible samples of the same size from the same population.",
    derivation:
      "Imagine repeatedly drawing samples of size n and calculating x̄ for each sample. The collection of all possible x̄ values, together with their probabilities, forms the sampling distribution of x̄.",
    example:
      "If 1,000 samples of size 50 are taken and 1,000 sample means are calculated, the histogram of those means approximates the sampling distribution.",
    warning:
      "The sampling distribution is not the distribution of raw data. It is the distribution of a statistic.",
  },
  {
    title: "5. Expected value of the sample mean",
    formula: "E(x̄) = μ",
    body:
      "The sample mean is an unbiased estimator of the population mean. Across repeated samples, its average value equals the true population mean.",
    derivation:
      "x̄ = (X₁ + X₂ + ... + X_n)/n. Taking expectation, E(x̄) = E[(X₁ + ... + X_n)/n] = [E(X₁) + ... + E(X_n)]/n. If each observation has mean μ, then E(x̄) = (μ + ... + μ)/n = nμ/n = μ.",
    example:
      "Individual sample means may be too high or too low, but over many repeated samples they centre around μ.",
    warning:
      "Unbiased does not mean every sample mean is correct. It means the estimator is correct on average across repeated sampling.",
  },
  {
    title: "6. Variance of the sample mean",
    formula: "Var(x̄) = σ² / n",
    body:
      "The variability of the sample mean decreases as sample size increases. This is the mathematical reason larger samples give more stable estimates.",
    derivation:
      "If X₁, ..., X_n are independent observations with variance σ², then Var(x̄) = Var[(X₁ + ... + X_n)/n] = (1/n²)Var(X₁ + ... + X_n). Independence gives Var(X₁ + ... + X_n) = nσ². Therefore Var(x̄) = nσ²/n² = σ²/n.",
    example:
      "If the population standard deviation is 12 and n = 36, then Var(x̄) = 144/36 = 4.",
    warning:
      "This formula relies on independence. If observations are correlated, the standard error may be larger than this simple formula suggests.",
  },
  {
    title: "7. Standard error of the sample mean",
    formula: "SE(x̄) = σ / √n",
    body:
      "The standard error is the standard deviation of the sampling distribution of a statistic. For the sample mean, it is σ divided by the square root of n.",
    derivation:
      "Since Var(x̄) = σ²/n, the standard deviation of x̄ is √(σ²/n) = σ/√n. This standard deviation of the statistic is called the standard error.",
    example:
      "If σ = 15 and n = 25, then SE(x̄) = 15/√25 = 15/5 = 3.",
    warning:
      "Standard deviation describes variability among individual observations. Standard error describes variability among sample statistics.",
  },
  {
    title: "8. Estimated standard error",
    formula: "SÊ(x̄) = s / √n",
    body:
      "In practice, the population standard deviation σ is usually unknown. We estimate it using the sample standard deviation s, giving the estimated standard error.",
    derivation:
      "The theoretical formula is σ/√n. Since σ is unknown, replace it with s, the sample standard deviation. The estimated standard error becomes s/√n.",
    example:
      "If a sample has s = 10 and n = 64, then SÊ(x̄) = 10/8 = 1.25.",
    warning:
      "The estimated standard error is itself an estimate. For small samples, extra uncertainty is handled using t-distributions later.",
  },
  {
    title: "9. Shape of the sampling distribution",
    formula: "x̄ is often approximately normal for large n",
    body:
      "The sampling distribution of the mean often becomes approximately normal as sample size increases, even when the original data are not perfectly normal.",
    derivation:
      "The central limit idea says that sums and averages of many independent observations tend to have an approximately normal distribution under broad conditions. Since x̄ is a scaled sum, its distribution often becomes more bell-shaped as n increases.",
    example:
      "A skewed population may produce a skewed distribution of individual values, but the distribution of sample means becomes more symmetric as n grows.",
    warning:
      "Approximate normality of x̄ improves with larger n, but extreme skewness, heavy tails or dependence may require caution.",
  },
  {
    title: "10. Why standard error matters for inference",
    formula: "estimate ± uncertainty",
    body:
      "Inference uses sample statistics to make statements about population parameters. Standard error quantifies how much the statistic would vary under repeated sampling, so it becomes the uncertainty unit of inference.",
    derivation:
      "A statistic alone gives a point estimate. To judge how far it might be from the parameter, we need the statistic's sampling variability. The standard error supplies this scale. Confidence intervals and hypothesis tests both rely on comparing estimates to their standard errors.",
    example:
      "A difference of 4 units is more convincing when SE = 1 than when SE = 8.",
    warning:
      "A large sample can make a small effect statistically clear, but statistical clarity is not the same as practical importance.",
  },
];

const workedExamples = [
  {
    title: "Calculating a standard error",
    question:
      "A population has standard deviation σ = 20. A sample of size n = 100 is taken. What is the standard error of the sample mean?",
    working:
      "For the sample mean, SE(x̄) = σ/√n. Substitute σ = 20 and n = 100. SE(x̄) = 20/√100 = 20/10 = 2.",
    answer: "The standard error is 2.",
    deeper:
      "This means sample means typically vary around the population mean on a scale of about 2 units.",
  },
  {
    title: "Effect of increasing sample size",
    question:
      "If σ = 12, compare SE when n = 25 and n = 100.",
    working:
      "For n = 25, SE = 12/√25 = 12/5 = 2.4. For n = 100, SE = 12/√100 = 12/10 = 1.2.",
    answer: "The standard error falls from 2.4 to 1.2.",
    deeper:
      "Increasing sample size by a factor of 4 halves the standard error because standard error decreases with √n, not directly with n.",
  },
  {
    title: "Interpreting sampling variability",
    question:
      "A study estimates a mean as 52 with SE = 1.5. Another study estimates a mean as 52 with SE = 6. Which estimate is more precise?",
    working:
      "Both point estimates are 52, but the first has a smaller standard error. A smaller SE means less sampling variability in the estimator.",
    answer: "The estimate with SE = 1.5 is more precise.",
    deeper:
      "Point estimates alone are incomplete. Precision depends on the sampling distribution of the estimator.",
  },
  {
    title: "Estimated standard error",
    question:
      "A sample of n = 49 has sample standard deviation s = 14. Estimate the standard error of the mean.",
    working:
      "Use SÊ(x̄) = s/√n = 14/√49 = 14/7 = 2.",
    answer: "The estimated standard error is 2.",
    deeper:
      "Because σ is usually unknown, inference commonly uses s/√n rather than σ/√n.",
  },
];

const practiceQuestions = [
  {
    prompt:
      "Explain the difference between a population parameter and a sample statistic.",
    answer:
      "A parameter describes the population and is usually fixed but unknown. A statistic is calculated from a sample and changes from sample to sample.",
  },
  {
    prompt:
      "If σ = 18 and n = 36, calculate SE(x̄).",
    answer:
      "SE(x̄) = σ/√n = 18/√36 = 18/6 = 3.",
  },
  {
    prompt:
      "If the sample size increases from 25 to 100 and σ stays the same, what happens to SE?",
    answer:
      "The sample size becomes 4 times larger, so the standard error is divided by √4 = 2. It halves.",
  },
  {
    prompt:
      "Why is the sampling distribution not the same as the raw data distribution?",
    answer:
      "The raw data distribution describes individual observations. The sampling distribution describes values of a statistic, such as sample means, across repeated samples.",
  },
  {
    prompt:
      "A sample has s = 9 and n = 81. Estimate the standard error of the mean.",
    answer:
      "SÊ(x̄) = s/√n = 9/√81 = 9/9 = 1.",
  },
];

const quizQuestions = [
  {
    question: "What is a sampling distribution?",
    options: [
      "The distribution of raw observations in one sample.",
      "The distribution of a statistic across repeated samples.",
      "The distribution of population labels only.",
      "The distribution of missing values.",
    ],
    answer: 1,
    feedback:
      "A sampling distribution describes how a statistic varies across repeated samples.",
  },
  {
    question: "What does standard error measure?",
    options: [
      "Variation among individual observations.",
      "Variation among sample statistics.",
      "The largest value in the sample.",
      "The sample size itself.",
    ],
    answer: 1,
    feedback:
      "Standard error measures the sampling variability of a statistic.",
  },
  {
    question: "For a sample mean, what is the theoretical standard error?",
    options: ["σ√n", "σ/n", "σ/√n", "n/σ"],
    answer: 2,
    feedback:
      "For the sample mean, SE(x̄) = σ/√n.",
  },
  {
    question: "If σ = 10 and n = 25, what is SE(x̄)?",
    options: ["0.4", "2", "5", "250"],
    answer: 1,
    feedback:
      "SE(x̄) = 10/√25 = 10/5 = 2.",
  },
  {
    question: "What happens to SE when sample size increases?",
    options: [
      "It usually decreases.",
      "It always becomes zero.",
      "It increases linearly.",
      "It becomes the population mean.",
    ],
    answer: 0,
    feedback:
      "For the sample mean, SE decreases as n increases.",
  },
  {
    question: "Which statement is correct?",
    options: [
      "Standard deviation and standard error are always identical.",
      "Standard deviation describes individual variability; standard error describes estimator variability.",
      "Standard error is unrelated to inference.",
      "Standard error increases when n increases.",
    ],
    answer: 1,
    feedback:
      "Standard deviation describes individual observations, while standard error describes sample statistics.",
  },
  {
    question: "Why does E(x̄) = μ matter?",
    options: [
      "It means the sample mean is unbiased for the population mean.",
      "It means every sample mean equals μ.",
      "It means sampling variability disappears.",
      "It means n must be 1.",
    ],
    answer: 0,
    feedback:
      "E(x̄) = μ means the sample mean is centred on the population mean across repeated samples.",
  },
];

export default function SamplingDistributionsStandardErrorLesson() {
  const lessonCode = "4.1";

  if (!isStatisticsFoundationLessonOpen(lessonCode)) {
    return (
      <LockedLessonGate
        lessonCode={lessonCode}
        lessonTitle="Sampling distributions and standard error"
        moduleTitle="Module 4: Statistical Inference Foundations"
      />
    );
  }

  const [activeTab, setActiveTab] = useState("Learning Route");

  const [populationMean, setPopulationMean] = useState(70);
  const [populationSd, setPopulationSd] = useState(15);
  const [sampleSize, setSampleSize] = useState(36);
  const [numberOfSamples, setNumberOfSamples] = useState(400);

  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedPractice, setSelectedPractice] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const samplingData = useMemo(() => {
    return makeSamplingDistribution({
      mean: populationMean,
      sd: populationSd,
      n: sampleSize,
      samples: numberOfSamples,
    });
  }, [populationMean, populationSd, sampleSize, numberOfSamples]);

  const theoreticalSE = populationSd / Math.sqrt(sampleSize);
  const empiricalMean = mean(samplingData);
  const empiricalSE = sd(samplingData);

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
                Statistics Foundation · Lesson 4.1
              </p>

              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-7xl">
                Sampling distributions and standard error.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">
                Statistical inference begins with a simple but powerful idea:
                samples vary. This lesson explains how sample statistics vary
                from sample to sample, why the sampling distribution matters,
                and how standard error becomes the basic unit of uncertainty in
                inference.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {["135 minutes", "No coding", "Sampling variability", "Standard error"].map(
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
                A statistic is one value from a distribution of possible values.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Population value: μ",
                  "Sample statistic: x̄",
                  "Sampling error: x̄ − μ",
                  "Sampling distribution: repeated x̄ values",
                  "Standard error: SD of x̄",
                  "SE(x̄) = σ / √n",
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
                Move from sample variation to inference.
              </h2>

              <p className="mt-5 text-base leading-8 text-[#525252]">
                This lesson is the bridge between probability and statistical
                inference. Probability describes how sample statistics behave;
                inference uses that behaviour to judge uncertainty about
                population parameters.
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
                Students should understand why uncertainty remains after sampling.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Distinguish population parameters from sample statistics.",
                  "Explain why statistics vary from sample to sample.",
                  "Define sampling variability and sampling error.",
                  "Define a sampling distribution.",
                  "Derive E(x̄) = μ.",
                  "Derive Var(x̄) = σ²/n.",
                  "Calculate SE(x̄) = σ/√n or s/√n.",
                  "Explain why standard error matters for inference.",
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
                Inference asks how far a sample statistic may be from the truth.
              </h2>

              <p className="mt-5 text-base leading-8 text-[#525252]">
                We rarely observe the full population. Instead, we observe a
                sample and calculate a statistic. But a different sample would
                have produced a different statistic. Standard error measures
                this repeated-sampling uncertainty.
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
                Mr. R introduces the uncertainty of estimates.
              </h2>

              <div className="mt-6 grid gap-4">
                <Dialogue
                  speaker="Mr. R"
                  text="In probability, we studied uncertainty before an outcome occurs. In inference, we study uncertainty after collecting a sample."
                />
                <Dialogue
                  speaker="Amelia"
                  text="But once we have a sample mean, is the uncertainty not gone?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="We know the sample mean exactly, but we still do not know how close it is to the population mean."
                />
                <Dialogue
                  speaker="Ben"
                  text="So the uncertainty is about the gap between the sample statistic and the population parameter?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Exactly. That gap is sampling error."
                />
                <Dialogue
                  speaker="Chloe"
                  text="And the sampling distribution tells us how that error behaves?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Yes. It tells us how sample statistics vary across repeated samples."
                />
                <Dialogue
                  speaker="Daniel"
                  text="Then standard error is like the standard deviation of those repeated sample means?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Perfect. Standard error is the spread of the sampling distribution of the statistic."
                />
              </div>

              <div className="mt-8 rounded-[2rem] border border-[#741018]/20 bg-[#fff4ef] p-6">
                <h3 className="text-2xl font-black tracking-[-0.04em] text-[#741018]">
                  Lecture takeaway
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#525252]">
                  Standard error is the mathematical bridge from a single sample
                  estimate to uncertainty about the population parameter.
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
                A sample statistic has its own probability distribution.
              </h2>

              <p className="mt-5 max-w-4xl text-base leading-8 text-[#525252]">
                These notes develop the theory carefully: why statistics are
                random, why sample means centre on the population mean, and why
                their variability shrinks at the square-root rate.
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

        {activeTab === "Sampling Lab" && (
          <section className="mt-8 overflow-hidden rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="p-6 md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Interactive sampling distribution lab
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Repeated samples produce repeated sample means.
                </h2>

                <p className="mt-4 text-base leading-8 text-[#525252]">
                  Adjust the population mean, population spread, sample size and
                  number of repeated samples. The histogram shows the simulated
                  sampling distribution of the sample mean.
                </p>

                <div className="mt-6 grid gap-5">
                  <Slider label="Population mean μ" value={populationMean} min={40} max={100} onChange={setPopulationMean} />
                  <Slider label="Population standard deviation σ" value={populationSd} min={4} max={35} onChange={setPopulationSd} />
                  <Slider label="Sample size n" value={sampleSize} min={4} max={200} onChange={setSampleSize} />
                  <Slider label="Repeated samples" value={numberOfSamples} min={50} max={1000} onChange={setNumberOfSamples} />
                </div>
              </div>

              <div className="border-t border-[#E4DED2] bg-[#11100E] p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                  Sampling distribution output
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Sample means cluster around μ.
                </h2>

                <div className="mt-8 rounded-[2rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5">
                  <Histogram data={samplingData} target={populationMean} />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <DarkMetric label="Population mean μ" value={populationMean.toFixed(1)} />
                  <DarkMetric label="Mean of sample means" value={empiricalMean.toFixed(2)} />
                  <DarkMetric label="Theoretical SE" value={theoreticalSE.toFixed(2)} />
                  <DarkMetric label="Empirical SE" value={empiricalSE.toFixed(2)} />
                </div>

                <p className="mt-6 rounded-[1.5rem] bg-[#FFFCF6] p-5 text-sm font-bold leading-7 text-[#141210]">
                  The sampling distribution is centred near μ, and its spread is
                  approximately σ/√n.
                </p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "Standard Error Lab" && (
          <section className="mt-8 grid gap-6">
            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Standard error lab
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Larger samples shrink uncertainty, but not linearly.
              </h2>

              <p className="mt-4 max-w-4xl text-base leading-8 text-[#525252]">
                The formula SE(x̄) = σ/√n shows that standard error decreases at
                the square-root rate. To halve the standard error, sample size
                must be multiplied by 4.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Metric label="σ" value={populationSd.toFixed(1)} />
                <Metric label="n" value={sampleSize.toString()} />
                <Metric label="σ / √n" value={theoreticalSE.toFixed(2)} />
              </div>

              <div className="mt-6 rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
                <SECurve sigma={populationSd} currentN={sampleSize} />
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-3">
              {[25, 100, 400].map((n) => (
                <article
                  key={n}
                  className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm"
                >
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-[#741018]">
                    Sample size {n}
                  </p>
                  <h3 className="mt-3 text-3xl font-black tracking-[-0.05em]">
                    SE = {(populationSd / Math.sqrt(n)).toFixed(2)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#525252]">
                    With σ = {populationSd}, the standard error is{" "}
                    {populationSd}/√{n}. Compare this with the current selected
                    sample size.
                  </p>
                </article>
              ))}
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
                One population can produce many possible samples.
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#525252]">
                The population parameter is fixed, but each random sample gives
                a different statistic. The sampling distribution is the bridge
                between the population and the observed estimate.
              </p>

              <div className="mt-6 rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
                <SamplingDiagram />
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Interpretation map
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                Raw variability and estimator variability are different.
              </h2>

              <div className="mt-6 grid gap-4">
                {[
                  {
                    title: "Standard deviation",
                    body:
                      "Spread of individual observations around their mean.",
                  },
                  {
                    title: "Standard error",
                    body:
                      "Spread of sample statistics around the population parameter.",
                  },
                  {
                    title: "Sampling distribution",
                    body:
                      "The long-run distribution of a statistic under repeated sampling.",
                  },
                  {
                    title: "Inference",
                    body:
                      "Using the sampling distribution to judge uncertainty about the unknown parameter.",
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
                Work through sampling variability and standard error.
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
                Practise the language of inference.
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
              Standard error is the uncertainty scale of inference.
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "What would happen with another sample?",
                  body:
                    "Inference begins by imagining how the statistic would vary if the sampling process were repeated.",
                },
                {
                  title: "What is random?",
                  body:
                    "The population parameter is fixed, but the sample statistic varies before the sample is observed.",
                },
                {
                  title: "What does SE describe?",
                  body:
                    "SE describes the spread of sample statistics, not the spread of individual data values.",
                },
                {
                  title: "Why does n matter?",
                  body:
                    "Larger samples reduce sampling variability because averages become more stable.",
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
                Check your understanding of sampling distributions, standard
                error, sample statistics and repeated-sampling reasoning.
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

function Histogram({ data, target }: { data: number[]; target: number }) {
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const bins = 20;
  const width = maxValue - minValue || 1;

  const counts = Array.from({ length: bins }, () => 0);

  data.forEach((value) => {
    const index = Math.min(
      bins - 1,
      Math.max(0, Math.floor(((value - minValue) / width) * bins)),
    );
    counts[index] += 1;
  });

  const maxCount = Math.max(...counts, 1);
  const targetX = ((target - minValue) / width) * 100;

  return (
    <svg viewBox="0 0 520 260" className="h-auto w-full">
      <rect x="20" y="20" width="480" height="200" rx="22" fill="#ffffff" opacity="0.08" />

      {counts.map((count, index) => {
        const barWidth = 480 / bins;
        const barHeight = (count / maxCount) * 165;
        const x = 20 + index * barWidth;
        const y = 220 - barHeight;

        return (
          <rect
            key={index}
            x={x + 1}
            y={y}
            width={barWidth - 2}
            height={barHeight}
            rx="3"
            fill="#ffffff"
            opacity="0.88"
          />
        );
      })}

      <line
        x1={20 + Math.max(0, Math.min(100, targetX)) * 4.8}
        x2={20 + Math.max(0, Math.min(100, targetX)) * 4.8}
        y1="25"
        y2="220"
        stroke="#741018"
        strokeWidth="4"
      />

      <text x="25" y="248" fontSize="14" fontWeight="900" fill="#ffffff">
        sample means
      </text>
      <text x="315" y="248" fontSize="14" fontWeight="900" fill="#ffffff">
        red line = population mean μ
      </text>
    </svg>
  );
}

function SECurve({ sigma, currentN }: { sigma: number; currentN: number }) {
  const points = Array.from({ length: 80 }).map((_, index) => {
    const n = 4 + index * 3;
    const se = sigma / Math.sqrt(n);
    return { n, se };
  });

  const maxSE = Math.max(...points.map((point) => point.se));
  const currentSE = sigma / Math.sqrt(currentN);
  const currentX = ((currentN - 4) / (241 - 4)) * 100;
  const currentY = 100 - (currentSE / maxSE) * 90;

  const polyline = points
    .map((point) => {
      const x = ((point.n - 4) / (241 - 4)) * 100;
      const y = 100 - (point.se / maxSE) * 90;
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
        Standard error
      </text>
      <text x="70" y="96" fontSize="4" fontWeight="900" fill="#525252">
        sample size n
      </text>
    </svg>
  );
}

function SamplingDiagram() {
  return (
    <svg viewBox="0 0 760 420" className="h-auto w-full">
      <rect x="30" y="40" width="190" height="290" rx="30" fill="#ffffff" stroke="#d4d4d4" strokeWidth="2" />
      <text x="70" y="80" fontSize="22" fontWeight="900" fill="#141210">
        Population
      </text>
      <text x="72" y="110" fontSize="15" fontWeight="800" fill="#737373">
        parameter μ
      </text>

      {Array.from({ length: 32 }).map((_, index) => {
        const x = 60 + (index % 4) * 35;
        const y = 145 + Math.floor(index / 4) * 22;
        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="7"
            fill={index % 5 === 0 ? "#741018" : "#141210"}
            opacity="0.75"
          />
        );
      })}

      <line x1="235" y1="180" x2="350" y2="110" stroke="#141210" strokeWidth="3" />
      <line x1="235" y1="205" x2="350" y2="210" stroke="#141210" strokeWidth="3" />
      <line x1="235" y1="230" x2="350" y2="310" stroke="#141210" strokeWidth="3" />

      {[
        ["Sample 1", "x̄₁"],
        ["Sample 2", "x̄₂"],
        ["Sample 3", "x̄₃"],
      ].map(([sample, meanLabel], index) => (
        <g key={sample}>
          <rect
            x="350"
            y={70 + index * 100}
            width="150"
            height="70"
            rx="22"
            fill="#ffffff"
            stroke="#d4d4d4"
            strokeWidth="2"
          />
          <text
            x="382"
            y={102 + index * 100}
            fontSize="17"
            fontWeight="900"
            fill="#141210"
          >
            {sample}
          </text>
          <text
            x="402"
            y={125 + index * 100}
            fontSize="16"
            fontWeight="900"
            fill="#741018"
          >
            {meanLabel}
          </text>
        </g>
      ))}

      <line x1="515" y1="105" x2="615" y2="210" stroke="#141210" strokeWidth="3" />
      <line x1="515" y1="205" x2="615" y2="210" stroke="#141210" strokeWidth="3" />
      <line x1="515" y1="305" x2="615" y2="210" stroke="#141210" strokeWidth="3" />

      <rect x="610" y="145" width="120" height="130" rx="28" fill="#141210" />
      <text x="633" y="185" fontSize="17" fontWeight="900" fill="#ffffff">
        Sampling
      </text>
      <text x="626" y="210" fontSize="17" fontWeight="900" fill="#ffffff">
        distribution
      </text>
      <text x="650" y="240" fontSize="18" fontWeight="900" fill="#ffffff">
        of x̄
      </text>
    </svg>
  );
}

function makeSamplingDistribution({
  mean: mu,
  sd: sigma,
  n,
  samples,
}: {
  mean: number;
  sd: number;
  n: number;
  samples: number;
}) {
  return Array.from({ length: samples }).map((_, sampleIndex) => {
    let total = 0;

    for (let j = 0; j < n; j += 1) {
      total += mu + sigma * normalRandom(sampleIndex * 997 + j * 37 + 11);
    }

    return total / n;
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

function mean(values: number[]) {
  if (values.length === 0) return 0;
  return values.reduce((total, value) => total + value, 0) / values.length;
}

function sd(values: number[]) {
  if (values.length <= 1) return 0;
  const m = mean(values);
  const variance =
    values.reduce((total, value) => total + (value - m) ** 2, 0) /
    (values.length - 1);
  return Math.sqrt(variance);
}
