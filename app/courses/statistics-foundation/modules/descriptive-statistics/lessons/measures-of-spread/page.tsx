"use client";

import LockedLessonGate from "@/components/course/LockedLessonGate";
import { isStatisticsFoundationLessonOpen } from "@/lib/statisticsFoundationAccess";


import { useMemo, useState } from "react";

const tabs = [
  "Learning Route",
  "Lecture",
  "Detailed Notes",
  "Spread Lab",
  "Animated Mentor",
  "Worked Examples",
  "Practice Studio",
  "Reflection",
  "Quiz",
];

const learningRoute = [
  {
    time: "0–10 min",
    title: "Why spread matters",
    body:
      "Understand why centre alone is not enough. Two datasets can have the same mean but very different levels of variability.",
  },
  {
    time: "10–25 min",
    title: "Range and interquartile range",
    body:
      "Learn how the range captures the full distance from smallest to largest value, while the IQR focuses on the middle 50% of the data.",
  },
  {
    time: "25–45 min",
    title: "Deviations from the mean",
    body:
      "Study how each value differs from the mean, and why deviations are the foundation of variance and standard deviation.",
  },
  {
    time: "45–65 min",
    title: "Variance and standard deviation",
    body:
      "Learn why squared deviations are averaged, why the sample variance divides by n - 1, and why standard deviation returns to the original units.",
  },
  {
    time: "65–85 min",
    title: "Interactive spread lab",
    body:
      "Adjust outliers, clustering and sample size to see how range, IQR, variance and standard deviation respond.",
  },
  {
    time: "85–105 min",
    title: "Worked examples and interpretation",
    body:
      "Practise choosing and interpreting measures of spread for exam scores, waiting times, salaries and health measurements.",
  },
];

const lectureConcepts = [
  {
    title: "Centre does not describe consistency",
    body:
      "A measure of centre tells us where the data are located, but it does not tell us how tightly or loosely values are arranged around that centre.",
    example:
      "Two classes may both have a mean score of 65, but one class may have scores mostly between 62 and 68 while another ranges from 30 to 95.",
  },
  {
    title: "Spread measures variability",
    body:
      "Spread describes how much the values differ from each other or from a central value. Low spread means values are similar. High spread means values are more dispersed.",
    example:
      "If all patients wait around 10 minutes, spread is low. If some wait 3 minutes and others wait 90 minutes, spread is high.",
  },
  {
    title: "Range is simple but sensitive",
    body:
      "The range is the largest value minus the smallest value. It is easy to understand, but it depends only on two values.",
    example:
      "The values 10, 12, 13, 15 and 100 have a range of 90, mainly because of the single value 100.",
  },
  {
    title: "IQR focuses on the middle",
    body:
      "The interquartile range measures the spread of the middle 50% of ordered values. It is more resistant to outliers than the range.",
    example:
      "For skewed waiting times, the IQR can describe the typical variation among most patients without being dominated by one extreme delay.",
  },
  {
    title: "Standard deviation measures typical distance from the mean",
    body:
      "The standard deviation describes roughly how far observations tend to sit from the mean. It is most useful when data are numerical and reasonably balanced.",
    example:
      "A mean score of 70 with standard deviation 3 suggests scores are tightly clustered. A standard deviation of 18 suggests much wider differences.",
  },
];

const spreadNotes = [
  {
    title: "Range",
    formula: "Range = maximum − minimum",
    body:
      "The range measures the total distance covered by the data. It is the simplest measure of spread and gives an immediate sense of how far apart the smallest and largest observations are.",
    strength:
      "It is quick to calculate and easy to explain.",
    limitation:
      "It uses only the two most extreme values, so it is highly sensitive to outliers.",
    bestFor:
      "A first quick description of the full span of the data.",
  },
  {
    title: "Interquartile range",
    formula: "IQR = Q3 − Q1",
    body:
      "The interquartile range measures the spread of the middle half of the data. Q1 is the lower quartile and Q3 is the upper quartile. The IQR ignores the lowest 25% and highest 25% when measuring spread.",
    strength:
      "It is resistant to outliers and useful for skewed data.",
    limitation:
      "It does not describe the full range of the data.",
    bestFor:
      "Skewed data, ordinal data, boxplots, waiting times, income and house prices.",
  },
  {
    title: "Deviation from the mean",
    formula: "Deviation = xᵢ − x̄",
    body:
      "A deviation tells us how far one observation is from the mean. Positive deviations are above the mean and negative deviations are below the mean. Deviations are the building blocks of variance and standard deviation.",
    strength:
      "It connects each observation to the centre of the dataset.",
    limitation:
      "The raw deviations always sum to zero, so they cannot be averaged directly to measure spread.",
    bestFor:
      "Understanding why variance uses squared deviations.",
  },
  {
    title: "Variance",
    formula: "Sample variance: s² = Σ(xᵢ − x̄)² / (n − 1)",
    body:
      "Variance averages squared deviations from the mean. Squaring prevents positive and negative deviations from cancelling and gives more weight to larger distances. For a sample, we divide by n − 1 rather than n because the sample mean is estimated from the same data.",
    strength:
      "It is mathematically important and forms the basis of many later statistical methods.",
    limitation:
      "Its units are squared, which makes it harder to interpret directly.",
    bestFor:
      "Theoretical work, modelling and calculations that require squared variability.",
  },
  {
    title: "Standard deviation",
    formula: "Sample standard deviation: s = √s²",
    body:
      "The standard deviation is the square root of the variance. It returns the spread to the original units of the data, making it easier to interpret. It describes a typical distance from the mean.",
    strength:
      "It is widely used, interpretable in original units and central to later topics.",
    limitation:
      "It is sensitive to outliers and is most meaningful for roughly symmetric numerical data.",
    bestFor:
      "Numerical data where the mean is also an appropriate centre.",
  },
  {
    title: "Coefficient of variation",
    formula: "CV = standard deviation ÷ mean",
    body:
      "The coefficient of variation compares spread relative to the mean. It is often expressed as a percentage. It helps compare variability between variables measured on different scales.",
    strength:
      "It allows comparison of relative variability.",
    limitation:
      "It is not suitable when the mean is close to zero or when the variable can take negative values in a meaningful way.",
    bestFor:
      "Comparing relative variability across measurements with different units or scales.",
  },
];

const comparisonRows = [
  {
    situation: "Balanced numerical data",
    range: "Useful as a quick span",
    iqr: "Useful but not essential",
    sd: "Usually appropriate",
    advice:
      "Mean and standard deviation often work well together when the data are approximately symmetric.",
  },
  {
    situation: "Skewed data",
    range: "Can be distorted",
    iqr: "Often preferred",
    sd: "Can be inflated",
    advice:
      "Median and IQR are usually more robust summaries for skewed distributions.",
  },
  {
    situation: "Strong outlier",
    range: "Highly affected",
    iqr: "More resistant",
    sd: "Affected strongly",
    advice:
      "Always compare robust and non-robust spread measures when outliers are present.",
  },
  {
    situation: "Small dataset",
    range: "Easy but unstable",
    iqr: "May be rough",
    sd: "Can be calculated",
    advice:
      "Interpret spread carefully because each observation has a large influence.",
  },
  {
    situation: "Comparing two groups",
    range: "May be misleading",
    iqr: "Good for robust comparison",
    sd: "Good if data are balanced",
    advice:
      "Use the same spread measure for both groups and interpret it alongside centre.",
  },
];

const scenarios = [
  {
    title: "Same mean, different spread",
    question:
      "Class A scores are 58, 60, 62, 64, 66. Class B scores are 35, 50, 62, 75, 88. Both have a similar centre. Which class is more consistent?",
    answer:
      "Class A is more consistent because its values are tightly clustered, while Class B has much wider spread.",
    working:
      "Class A range = 66 − 58 = 8. Class B range = 88 − 35 = 53. Class B varies much more.",
    caution:
      "The centre alone hides this difference. Spread must be reported to describe consistency.",
  },
  {
    title: "Waiting times with an outlier",
    question:
      "Waiting times are 8, 9, 10, 11, 12, 13 and 75 minutes. Which spread measure is safer?",
    answer:
      "The IQR is safer because the extreme value 75 strongly affects the range and standard deviation.",
    working:
      "The range is 67 minutes, but most values are between 8 and 13. The IQR better describes the typical spread.",
    caution:
      "The outlier should not be ignored, but it should be discussed separately from the typical waiting pattern.",
  },
  {
    title: "Blood pressure readings",
    question:
      "A patient has systolic blood pressure readings: 118, 120, 121, 123, 124, 126. Which spread measure is useful?",
    answer:
      "The standard deviation is useful because the data are numerical, fairly balanced and measured in meaningful units.",
    working:
      "The readings are close together, so a small standard deviation would indicate stable measurements.",
    caution:
      "Clinical interpretation also depends on context, measurement conditions and repeated readings.",
  },
  {
    title: "House prices",
    question:
      "House prices in an area are heavily right-skewed because a few luxury houses are extremely expensive. Which spread measure is appropriate?",
    answer:
      "The IQR is usually appropriate because it focuses on the middle 50% and is less affected by very expensive houses.",
    working:
      "The range and standard deviation may be inflated by luxury properties, while the IQR describes typical variation better.",
    caution:
      "For skewed financial data, report median and IQR rather than mean and standard deviation alone.",
  },
];

const mentorTopics = [
  {
    id: "range",
    label: "Range",
    answer:
      "The range tells us the full span of the data. It is simple, but it only uses the smallest and largest values, so one outlier can make it look very large.",
  },
  {
    id: "iqr",
    label: "IQR",
    answer:
      "The interquartile range measures the spread of the middle 50% of the data. It is useful when the data are skewed or contain extreme values.",
  },
  {
    id: "variance",
    label: "Variance",
    answer:
      "Variance is based on squared deviations from the mean. Squaring prevents cancellation and gives larger deviations more influence.",
  },
  {
    id: "sd",
    label: "Standard deviation",
    answer:
      "The standard deviation is the square root of the variance. It is interpreted in the original units and describes a typical distance from the mean.",
  },
  {
    id: "choice",
    label: "Choosing spread",
    answer:
      "Choose spread by matching it to centre and shape. Mean usually pairs with standard deviation. Median usually pairs with IQR.",
  },
];

const quizQuestions = [
  {
    question: "Which measure of spread is calculated as maximum minus minimum?",
    options: ["Range", "IQR", "Variance", "Median"],
    answer: 0,
    feedback:
      "The range is the maximum value minus the minimum value.",
  },
  {
    question: "Which measure describes the spread of the middle 50% of the data?",
    options: ["Mean", "Range", "Interquartile range", "Mode"],
    answer: 2,
    feedback:
      "The interquartile range is Q3 minus Q1 and describes the middle half of the data.",
  },
  {
    question: "Why do raw deviations from the mean not work as a direct spread measure?",
    options: [
      "They are always positive.",
      "They always sum to zero.",
      "They cannot be calculated for numbers.",
      "They are the same as the median.",
    ],
    answer: 1,
    feedback:
      "Positive and negative deviations from the mean cancel, so their sum is zero.",
  },
  {
    question: "What is the sample variance formula?",
    options: [
      "Σ(xᵢ − x̄) / n",
      "Σ(xᵢ − x̄)² / (n − 1)",
      "maximum − minimum",
      "Q3 − Q1",
    ],
    answer: 1,
    feedback:
      "The sample variance is the sum of squared deviations divided by n − 1.",
  },
  {
    question: "Which spread measure is in the original units of the data?",
    options: ["Variance", "Standard deviation", "Squared deviation", "Frequency"],
    answer: 1,
    feedback:
      "The standard deviation is the square root of the variance, so it returns to the original units.",
  },
  {
    question: "For skewed data with outliers, which pair is often most appropriate?",
    options: [
      "Mean and standard deviation",
      "Median and IQR",
      "Mode and variance",
      "Range and mean only",
    ],
    answer: 1,
    feedback:
      "Median and IQR are robust summaries for skewed or outlier-affected data.",
  },
];

export default function MeasuresOfSpreadLesson() {
  const lessonCode = "2.2";

  if (!isStatisticsFoundationLessonOpen(lessonCode)) {
    return (
      <LockedLessonGate
        lessonCode={lessonCode}
        lessonTitle="Measures of spread"
        moduleTitle="Module 2: Descriptive Statistics"
      />
    );
  }

  const [activeTab, setActiveTab] = useState("Learning Route");
  const [datasetType, setDatasetType] = useState("balanced");
  const [outlierStrength, setOutlierStrength] = useState(95);
  const [clusterTightness, setClusterTightness] = useState(8);
  const [sampleSize, setSampleSize] = useState(11);
  const [shift, setShift] = useState(0);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [mentorTopic, setMentorTopic] = useState("range");
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(
    {},
  );

  const activeScenario = scenarios[scenarioIndex];
  const activeMentor =
    mentorTopics.find((topic) => topic.id === mentorTopic) ?? mentorTopics[0];

  const labValues = useMemo(() => {
    const count = sampleSize;
    const centre = 60 + shift;
    let values: number[] = [];

    if (datasetType === "balanced") {
      values = Array.from({ length: count }, (_, index) => {
        const offset = index - Math.floor(count / 2);
        return Math.round(centre + offset * (clusterTightness / 4));
      });
    }

    if (datasetType === "tight") {
      values = Array.from({ length: count }, (_, index) => {
        const offset = index - Math.floor(count / 2);
        return Math.round(centre + offset * 0.8);
      });
    }

    if (datasetType === "wide") {
      values = Array.from({ length: count }, (_, index) => {
        const offset = index - Math.floor(count / 2);
        return Math.round(centre + offset * (clusterTightness / 1.5));
      });
    }

    if (datasetType === "right-outlier") {
      values = Array.from({ length: count - 1 }, (_, index) => {
        const offset = index - Math.floor((count - 1) / 2);
        return Math.round(centre + offset * 1.8);
      });
      values.push(outlierStrength + shift);
    }

    if (datasetType === "two-clusters") {
      const lowerCount = Math.floor(count / 2);
      const upperCount = count - lowerCount;

      values = [
        ...Array.from({ length: lowerCount }, (_, index) =>
          Math.round(45 + shift + index * 1.5),
        ),
        ...Array.from({ length: upperCount }, (_, index) =>
          Math.round(75 + shift + index * 1.5),
        ),
      ];
    }

    return values.sort((a, b) => a - b);
  }, [clusterTightness, datasetType, outlierStrength, sampleSize, shift]);

  const mean = useMemo(() => {
    return labValues.reduce((total, value) => total + value, 0) / labValues.length;
  }, [labValues]);

  const median = useMemo(() => {
    const middle = Math.floor(labValues.length / 2);

    if (labValues.length % 2 === 1) {
      return labValues[middle];
    }

    return (labValues[middle - 1] + labValues[middle]) / 2;
  }, [labValues]);

  const q1 = useMemo(() => {
    const lowerHalf = labValues.slice(0, Math.floor(labValues.length / 2));
    return medianOf(lowerHalf);
  }, [labValues]);

  const q3 = useMemo(() => {
    const upperHalf = labValues.slice(Math.ceil(labValues.length / 2));
    return medianOf(upperHalf);
  }, [labValues]);

  const range = useMemo(() => {
    return labValues[labValues.length - 1] - labValues[0];
  }, [labValues]);

  const iqr = useMemo(() => {
    return q3 - q1;
  }, [q1, q3]);

  const sampleVariance = useMemo(() => {
    const squaredDeviations = labValues.map((value) => (value - mean) ** 2);
    return (
      squaredDeviations.reduce((total, value) => total + value, 0) /
      (labValues.length - 1)
    );
  }, [labValues, mean]);

  const sampleSd = useMemo(() => {
    return Math.sqrt(sampleVariance);
  }, [sampleVariance]);

  const cv = useMemo(() => {
    return mean === 0 ? 0 : (sampleSd / mean) * 100;
  }, [mean, sampleSd]);

  const labAdvice = useMemo(() => {
    if (datasetType === "tight") {
      return "The observations are tightly clustered. Range, IQR and standard deviation are all small, so the data show low variability.";
    }

    if (datasetType === "wide") {
      return "The observations are spread widely around the centre. The standard deviation and range increase because values sit farther from the mean.";
    }

    if (datasetType === "right-outlier") {
      return "The outlier strongly increases the range and standard deviation. The IQR is more stable because it focuses on the middle half.";
    }

    if (datasetType === "two-clusters") {
      return "The data form two clusters. A single spread number may hide structure, so a graph should be used alongside numerical summaries.";
    }

    return "The data are fairly balanced. The standard deviation is useful because spread around the mean is meaningful.";
  }, [datasetType]);

  const score = quizQuestions.reduce((total, question, index) => {
    return selectedAnswers[index] === question.answer ? total + 1 : total;
  }, 0);

  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-8 text-neutral-950 md:px-8 md:py-14">
      <style>{`
        @keyframes mentorFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes mentorBlink {
          0%, 92%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.12); }
        }

        @keyframes dotPulse {
          0%, 100% { transform: scale(1); opacity: 0.86; }
          50% { transform: scale(1.18); opacity: 1; }
        }

        @keyframes signalMove {
          0% { transform: translateX(-100%); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
      `}</style>

      <section className="mx-auto max-w-7xl">
        <a
          href="/courses/statistics-foundation/modules/descriptive-statistics/"
          className="text-sm font-black text-[#8b1116] hover:text-[#5f0b0f]"
        >
          ← Back to module
        </a>

        <section className="mt-8 overflow-hidden rounded-[2.5rem] border border-neutral-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 md:p-10">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Statistics Foundation · Lesson 2.2
              </p>

              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-7xl">
                Measures of spread.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                Measures of spread describe how variable, consistent or
                dispersed the data are. This lesson teaches students how to
                interpret range, interquartile range, variance and standard
                deviation, why deviations from the mean matter, and how to
                choose a spread measure that matches the centre and shape of the
                data.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "100–105 minutes",
                  "No coding",
                  "Interactive spread lab",
                  "Variance intuition",
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
                From centre to variability.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Find centre",
                  "Measure span",
                  "Order values",
                  "Find quartiles",
                  "Study deviations",
                  "Interpret spread",
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
                100–105 minute lesson plan
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Learn how to describe consistency, variation and uncertainty in a dataset.
              </h2>

              <p className="mt-5 text-base leading-8 text-neutral-700">
                In Lesson 2.1, you learned how to describe the centre of a
                dataset. This lesson adds the second essential question: how
                spread out are the values? A centre without spread is incomplete
                because it hides consistency, inequality and risk.
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
                By the end, spread should feel like a story about variability.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Explain why centre alone is incomplete.",
                  "Calculate and interpret the range.",
                  "Explain quartiles and calculate the interquartile range.",
                  "Describe deviations from the mean.",
                  "Explain why variance uses squared deviations.",
                  "Interpret standard deviation in original units.",
                  "Choose between range, IQR and standard deviation.",
                  "Match spread summaries to data shape and outliers.",
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
            <section className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
              <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Spread decision board
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Spread tells us whether the centre is reliable, stable or hiding variation.
                </h2>

                <p className="mt-4 text-base leading-8 text-neutral-700">
                  A centre can be identical for two datasets, even when the
                  datasets look completely different. Spread tells us whether
                  values are close together, widely dispersed, skewed, clustered
                  or affected by extreme observations.
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
                  Mr. R shows why the same average can hide very different data.
                </h2>

                <div className="mt-6 grid gap-4">
                  <Dialogue
                    speaker="Mr. R"
                    text="Last lesson, we learned how to describe the centre. Today we ask a second question: how much do the values differ from one another?"
                  />
                  <Dialogue
                    speaker="Amelia"
                    text="If we already know the mean, why do we need spread?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Because the mean can be the same for two datasets that behave very differently. One dataset may be tightly grouped, while another may be extremely varied."
                  />
                  <Dialogue
                    speaker="Ben"
                    text="So spread tells us whether the centre is typical of most values?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Exactly. A centre is more informative when we also know how far values tend to sit from it."
                  />
                  <Dialogue
                    speaker="Chloe"
                    text="Is the range enough?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="The range is useful, but it only uses the smallest and largest values. One outlier can make the range look very large."
                  />
                  <Dialogue
                    speaker="Daniel"
                    text="Then the IQR is safer because it focuses on the middle?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Yes. The IQR describes the spread of the middle 50%. It is often paired with the median, especially for skewed data."
                  />
                  <Dialogue
                    speaker="Amelia"
                    text="And standard deviation goes with the mean?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Correct. Standard deviation measures typical distance from the mean, so it works best when the mean is a meaningful centre."
                  />
                </div>

                <section className="mt-8 rounded-[2rem] border border-[#8b1116]/20 bg-[#fff7f7] p-6">
                  <h3 className="text-2xl font-black tracking-[-0.04em] text-[#8b1116]">
                    Lecture takeaway
                  </h3>
                  <p className="mt-3 text-base leading-8 text-neutral-700">
                    Centre and spread should be interpreted together. The mean
                    often pairs with standard deviation, while the median often
                    pairs with IQR. Range is useful for the full span, but it is
                    sensitive to extreme values.
                  </p>
                </section>
              </section>
            </section>

            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Choosing the spread
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Match the spread measure to the centre and shape.
              </h2>

              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    question: "Need the full span?",
                    method: "Use the range",
                    reason:
                      "The range shows the distance from smallest to largest, but check for outliers.",
                  },
                  {
                    question: "Data are skewed?",
                    method: "Use the IQR",
                    reason:
                      "The IQR focuses on the middle half and is resistant to extreme tails.",
                  },
                  {
                    question: "Mean is appropriate?",
                    method: "Use standard deviation",
                    reason:
                      "Standard deviation describes typical distance from the mean.",
                  },
                  {
                    question: "Working theoretically?",
                    method: "Use variance",
                    reason:
                      "Variance is central in statistical theory and modelling.",
                  },
                  {
                    question: "Outlier present?",
                    method: "Compare IQR and SD",
                    reason:
                      "If SD is much inflated, the outlier may be strongly affecting spread.",
                  },
                  {
                    question: "Comparing groups?",
                    method: "Use same measure",
                    reason:
                      "Group comparisons are clearer when centre and spread are reported consistently.",
                  },
                  {
                    question: "Different scales?",
                    method: "Use coefficient of variation",
                    reason:
                      "CV compares spread relative to the mean, usually as a percentage.",
                  },
                  {
                    question: "Clustered pattern?",
                    method: "Use a graph too",
                    reason:
                      "A single spread value can hide two groups or unusual structure.",
                  },
                ].map((item) => (
                  <article
                    key={item.question}
                    className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
                      Ask
                    </p>
                    <h3 className="mt-2 text-lg font-black tracking-[-0.03em]">
                      {item.question}
                    </h3>
                    <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-neutral-500">
                      Suggested spread
                    </p>
                    <p className="mt-2 text-sm font-black leading-7 text-neutral-800">
                      {item.method}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-neutral-700">
                      {item.reason}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <section className="rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                  Robust spread
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                  Median and IQR belong together.
                </h2>

                <p className="mt-5 text-sm leading-7 text-white/70">
                  When data are skewed or contain outliers, the median describes
                  centre more safely than the mean. The IQR is its natural
                  partner because it also resists extreme values.
                </p>

                <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5">
                  <p className="text-sm font-black text-white">
                    IQR = Q3 − Q1
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                    It describes how wide the middle 50% of the data are.
                  </p>
                </div>
              </section>

              <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Mean-based spread
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                  Mean and standard deviation belong together.
                </h2>

                <p className="mt-5 text-sm leading-7 text-neutral-700">
                  Standard deviation measures variation around the mean. It is
                  especially useful when values are numerical and roughly
                  symmetric, because the mean is then a meaningful centre.
                </p>

                <div className="mt-6 grid gap-3">
                  <div className="rounded-[1.25rem] border border-neutral-200 bg-[#f7f4ee] p-4 text-sm font-bold text-neutral-700">
                    Variance: average squared distance from the mean.
                  </div>
                  <div className="rounded-[1.25rem] border border-neutral-200 bg-[#f7f4ee] p-4 text-sm font-bold text-neutral-700">
                    Standard deviation: square root of variance.
                  </div>
                </div>
              </section>
            </section>
          </section>
        )}

        {activeTab === "Detailed Notes" && (
          <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Detailed notes
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Measures of spread in depth.
            </h2>

            <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-700">
              Spread describes how far values are from one another or from a
              central value. Without spread, a measure of centre can be
              misleading. A dataset with low spread is consistent. A dataset
              with high spread is variable. A dataset with outliers may need
              robust summaries such as the median and IQR.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {spreadNotes.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
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
                  <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-7 text-neutral-700">
                    Strength: {item.strength}
                  </p>
                  <p className="mt-3 rounded-2xl border border-[#8b1116]/20 bg-[#fff7f7] px-4 py-3 text-sm font-bold leading-7 text-[#8b1116]">
                    Limitation: {item.limitation}
                  </p>
                  <p className="mt-3 rounded-2xl bg-neutral-950 px-4 py-3 text-sm font-bold leading-7 text-white">
                    Best for: {item.bestFor}
                  </p>
                </article>
              ))}
            </div>

            <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                Why variance divides by n − 1
              </p>

              <h3 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                Sample spread needs a small correction.
              </h3>

              <p className="mt-4 text-sm leading-7 text-white/75">
                When we calculate spread in a sample, we first estimate the
                sample mean from the same data. The deviations are therefore
                constrained around that sample mean. Dividing by n − 1 rather
                than n corrects the tendency of sample variance to underestimate
                the population variance.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: "Step 1",
                    body:
                      "Find the sample mean x̄.",
                  },
                  {
                    title: "Step 2",
                    body:
                      "Calculate each deviation xᵢ − x̄.",
                  },
                  {
                    title: "Step 3",
                    body:
                      "Square deviations, add them, then divide by n − 1.",
                  },
                ].map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5"
                  >
                    <h4 className="text-xl font-black">{item.title}</h4>
                    <p className="mt-3 text-sm leading-7 text-white/70">
                      {item.body}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Comparison table
              </p>

              <h3 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                Which spread measure should you choose?
              </h3>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[780px] border-separate border-spacing-y-3 text-left">
                  <thead>
                    <tr className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                      <th className="px-4">Situation</th>
                      <th className="px-4">Range</th>
                      <th className="px-4">IQR</th>
                      <th className="px-4">Standard deviation</th>
                      <th className="px-4">Advice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr key={row.situation} className="bg-white">
                        <td className="rounded-l-2xl px-4 py-4 text-sm font-black">
                          {row.situation}
                        </td>
                        <td className="px-4 py-4 text-sm text-neutral-700">
                          {row.range}
                        </td>
                        <td className="px-4 py-4 text-sm text-neutral-700">
                          {row.iqr}
                        </td>
                        <td className="px-4 py-4 text-sm text-neutral-700">
                          {row.sd}
                        </td>
                        <td className="rounded-r-2xl px-4 py-4 text-sm leading-7 text-neutral-700">
                          {row.advice}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        )}

        {activeTab === "Spread Lab" && (
          <section className="mt-8 grid gap-6">
            <section className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="p-6 md:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                    Interactive spread lab
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    Change the data and watch the spread respond.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-neutral-700">
                    Adjust the dataset shape, outlier strength, clustering and
                    sample size. Notice that some spread measures react strongly
                    to extreme values while others remain more stable.
                  </p>

                  <div className="mt-6">
                    <label className="block">
                      <span className="text-sm font-black text-neutral-700">
                        Dataset shape
                      </span>
                      <select
                        value={datasetType}
                        onChange={(event) => setDatasetType(event.target.value)}
                        className="mt-3 w-full rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold text-neutral-800"
                      >
                        <option value="balanced">Balanced spread</option>
                        <option value="tight">Tightly clustered</option>
                        <option value="wide">Widely spread</option>
                        <option value="right-outlier">Right outlier</option>
                        <option value="two-clusters">Two clusters</option>
                      </select>
                    </label>
                  </div>

                  <div className="mt-6 grid gap-5">
                    <Slider
                      label="Outlier strength"
                      value={outlierStrength}
                      min={70}
                      max={150}
                      onChange={setOutlierStrength}
                    />
                    <Slider
                      label="Cluster spread"
                      value={clusterTightness}
                      min={3}
                      max={18}
                      onChange={setClusterTightness}
                    />
                    <Slider
                      label="Sample size"
                      value={sampleSize}
                      min={7}
                      max={21}
                      onChange={setSampleSize}
                    />
                    <Slider
                      label="Overall shift"
                      value={shift}
                      min={-15}
                      max={15}
                      onChange={setShift}
                    />
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <Metric label="Range" value={range.toFixed(1)} />
                    <Metric label="IQR" value={iqr.toFixed(1)} />
                    <Metric label="Variance" value={sampleVariance.toFixed(1)} />
                    <Metric label="SD" value={sampleSd.toFixed(1)} />
                  </div>
                </div>

                <div className="border-t border-neutral-200 bg-neutral-950 p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                    Interpretation panel
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    What does the spread say?
                  </h2>

                  <p className="mt-6 text-lg leading-9 text-white/80">
                    {labAdvice}
                  </p>

                  <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.07] p-5">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                      Current data
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/75">
                      {labValues.join(", ")}
                    </p>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <MetricDark label="Mean" value={mean.toFixed(1)} />
                    <MetricDark label="Median" value={median.toFixed(1)} />
                    <MetricDark label="Q1" value={q1.toFixed(1)} />
                    <MetricDark label="Q3" value={q3.toFixed(1)} />
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Dot plot with spread markers
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                  The dots show values. The shaded band shows the IQR.
                </h2>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  The IQR band stretches from Q1 to Q3. The red marker shows the
                  mean. The grey marker shows the median.
                </p>

                <div className="mt-6 rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5">
                  <div className="relative h-32 rounded-[1.5rem] bg-white p-4">
                    <div className="absolute left-4 right-4 top-1/2 h-1 rounded-full bg-neutral-200" />

                    <div
                      className="absolute top-[42%] h-8 rounded-full bg-[#8b1116]/15"
                      style={{
                        left: `${scaleToPercent(q1)}%`,
                        width: `${Math.max(4, scaleToPercent(q3) - scaleToPercent(q1))}%`,
                      }}
                    />

                    {labValues.map((value, index) => (
                      <div
                        key={`${value}-${index}`}
                        className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-950"
                        style={{
                          left: `${scaleToPercent(value)}%`,
                          animation:
                            value === labValues[0] ||
                            value === labValues[labValues.length - 1]
                              ? "dotPulse 2.4s ease-in-out infinite"
                              : undefined,
                        }}
                      />
                    ))}

                    <div
                      className="absolute top-3 h-[104px] w-1 rounded-full bg-[#8b1116]"
                      style={{ left: `${scaleToPercent(mean)}%` }}
                    />
                    <div
                      className="absolute top-3 h-[104px] w-1 rounded-full bg-neutral-500"
                      style={{ left: `${scaleToPercent(median)}%` }}
                    />
                  </div>

                  <div className="mt-5 grid gap-3 text-sm leading-7 text-neutral-700 md:grid-cols-4">
                    <div className="rounded-2xl bg-white p-4">
                      <strong>Dots:</strong> observations.
                    </div>
                    <div className="rounded-2xl bg-white p-4">
                      <strong>Red band:</strong> IQR.
                    </div>
                    <div className="rounded-2xl bg-white p-4">
                      <strong>Red line:</strong> mean.
                    </div>
                    <div className="rounded-2xl bg-white p-4">
                      <strong>Grey line:</strong> median.
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Spread comparison bars
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                  Compare robust and non-robust spread.
                </h2>

                <div className="mt-6 grid gap-4">
                  <Bar label="Range" value={range} max={130} />
                  <Bar label="IQR" value={iqr} max={130} />
                  <Bar label="Standard deviation" value={sampleSd} max={60} />
                  <Bar label="Coefficient of variation %" value={cv} max={80} />
                </div>

                <section className="mt-6 rounded-[1.5rem] border border-[#8b1116]/20 bg-[#fff7f7] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
                    Write this conclusion
                  </p>
                  <p className="mt-3 text-sm leading-7 text-neutral-700">
                    “The range is <strong>{range.toFixed(1)}</strong>, the IQR
                    is <strong>{iqr.toFixed(1)}</strong>, and the standard
                    deviation is <strong>{sampleSd.toFixed(1)}</strong>. This
                    suggests the data are{" "}
                    {sampleSd > 18
                      ? "quite variable"
                      : sampleSd < 5
                        ? "tightly clustered"
                        : "moderately variable"}
                    .”
                  </p>
                </section>
              </section>
            </section>
          </section>
        )}

        {activeTab === "Animated Mentor" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Animated mentor
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Ask Mr. R about spread.
              </h2>

              <div className="mt-8 flex justify-center">
                <div
                  className="relative flex h-52 w-52 items-center justify-center rounded-full border border-neutral-200 bg-[#f7f4ee]"
                  style={{ animation: "mentorFloat 3s ease-in-out infinite" }}
                >
                  <div className="absolute top-9 h-20 w-20 rounded-full bg-neutral-950" />
                  <div className="absolute top-16 flex gap-5">
                    <span
                      className="h-3 w-3 rounded-full bg-white"
                      style={{ animation: "mentorBlink 4s infinite" }}
                    />
                    <span
                      className="h-3 w-3 rounded-full bg-white"
                      style={{ animation: "mentorBlink 4s infinite" }}
                    />
                  </div>
                  <div className="absolute top-28 h-20 w-32 rounded-t-[3rem] bg-[#8b1116]" />
                  <div className="absolute bottom-8 rounded-full bg-white px-4 py-2 text-sm font-black text-neutral-950">
                    Mr. R
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-2">
                {mentorTopics.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setMentorTopic(topic.id)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
                      mentorTopic === topic.id
                        ? "border-[#8b1116] bg-[#8b1116] text-white"
                        : "border-neutral-200 bg-[#f7f4ee] text-neutral-700 hover:bg-white"
                    }`}
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            </section>

            <section className="relative overflow-hidden rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm md:p-8">
              <div className="absolute left-0 top-0 h-1 w-full overflow-hidden bg-white/10">
                <div
                  className="h-full w-1/2 bg-white/40"
                  style={{ animation: "signalMove 2.8s linear infinite" }}
                />
              </div>

              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Mentor explanation
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                {activeMentor.label}
              </h2>

              <p className="mt-6 max-w-4xl text-lg leading-9 text-white/80">
                {activeMentor.answer}
              </p>

              <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.07] p-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                  Mentor challenge
                </p>
                <p className="mt-3 text-sm leading-7 text-white/75">
                  Find two small datasets with similar means but different
                  spread. Explain why the centre alone would be misleading.
                </p>
              </div>
            </section>
          </section>
        )}

        {activeTab === "Worked Examples" && (
          <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Worked examples
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Choose and interpret a measure of spread.
            </h2>

            <div className="mt-6 flex flex-wrap gap-2">
              {scenarios.map((scenario, index) => (
                <button
                  key={scenario.title}
                  type="button"
                  onClick={() => setScenarioIndex(index)}
                  className={`rounded-full px-4 py-2 text-sm font-black transition ${
                    scenarioIndex === index
                      ? "bg-neutral-950 text-white"
                      : "border border-neutral-200 bg-[#f7f4ee] text-neutral-700"
                  }`}
                >
                  {scenario.title}
                </button>
              ))}
            </div>

            <article className="mt-6 rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6">
              <h3 className="text-3xl font-black tracking-[-0.045em]">
                {activeScenario.title}
              </h3>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-700">
                {activeScenario.question}
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <AnswerCard title="Best answer" body={activeScenario.answer} />
                <AnswerCard title="Working" body={activeScenario.working} />
                <AnswerCard title="Caution" body={activeScenario.caution} />
              </div>
            </article>
          </section>
        )}

        {activeTab === "Practice Studio" && (
          <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Practice studio
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Practise describing variability.
            </h2>

            <div className="mt-8 grid gap-5">
              {[
                {
                  task:
                    "Two classes both have a mean score of 70. Class A has scores close to 70, while Class B has scores from 30 to 100. Explain why the mean is incomplete.",
                  hint:
                    "Mention variability, consistency and the need for a spread measure.",
                },
                {
                  task:
                    "A dataset has values 4, 5, 6, 7, 100. Explain why the range is large and why the IQR may be more stable.",
                  hint:
                    "Focus on the effect of the extreme value 100.",
                },
                {
                  task:
                    "Explain in your own words why variance squares deviations from the mean.",
                  hint:
                    "Positive and negative deviations would otherwise cancel.",
                },
                {
                  task:
                    "A hospital reports median waiting time. Which spread measure should usually be paired with it?",
                  hint:
                    "Median often pairs with IQR.",
                },
                {
                  task:
                    "A laboratory measurement has mean 20 and standard deviation 1. Another has mean 20 and standard deviation 6. Which is more variable?",
                  hint:
                    "A larger standard deviation means observations are more spread out from the mean.",
                },
              ].map((item, index) => (
                <article
                  key={item.task}
                  className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
                >
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
                    Practice task {index + 1}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-neutral-700">
                    {item.task}
                  </p>
                  <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-7 text-neutral-700">
                    Hint: {item.hint}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Reflection" && (
          <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Reflection task
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Write a careful spread interpretation.
            </h2>

            <div className="mt-8 grid gap-5">
              {[
                "Explain why a measure of centre should usually be reported with a measure of spread.",
                "Describe a situation where the range is useful but incomplete.",
                "Explain why the IQR is robust to extreme values.",
                "Explain what standard deviation means in ordinary language.",
                "Write a sentence interpreting a median and IQR for hospital waiting times.",
              ].map((item, index) => (
                <article
                  key={item}
                  className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
                >
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
                    Prompt {index + 1}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-neutral-700">
                    {item}
                  </p>
                </article>
              ))}
            </div>

            <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                Model answer structure
              </p>
              <p className="mt-4 text-base leading-8 text-white/75">
                “The centre is described using _____. The spread is described
                using _____ because the data are _____. This means that typical
                values vary by approximately _____.”
              </p>
            </section>
          </section>
        )}

        {activeTab === "Quiz" && (
          <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Quiz
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Check your understanding.
                </h2>
              </div>

              <div className="rounded-full bg-neutral-950 px-5 py-3 text-sm font-black text-white">
                Score: {score}/{quizQuestions.length}
              </div>
            </div>

            <div className="mt-8 grid gap-5">
              {quizQuestions.map((question, questionIndex) => (
                <article
                  key={question.question}
                  className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
                >
                  <h3 className="text-lg font-black tracking-[-0.03em]">
                    {questionIndex + 1}. {question.question}
                  </h3>

                  <div className="mt-4 grid gap-2">
                    {question.options.map((option, optionIndex) => {
                      const selected = selectedAnswers[questionIndex];
                      const isSelected = selected === optionIndex;
                      const isCorrect = optionIndex === question.answer;

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            setSelectedAnswers((current) => ({
                              ...current,
                              [questionIndex]: optionIndex,
                            }))
                          }
                          className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
                            isSelected && isCorrect
                              ? "border-green-300 bg-green-50 text-green-900"
                              : isSelected && !isCorrect
                                ? "border-red-300 bg-red-50 text-red-900"
                                : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  {selectedAnswers[questionIndex] !== undefined ? (
                    <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm leading-7 text-neutral-700">
                      {question.feedback}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

function Dialogue({ speaker, text }: { speaker: string; text: string }) {
  const isTeacher = speaker === "Mr. R";

  return (
    <div
      className={`rounded-[1.5rem] border p-5 ${
        isTeacher
          ? "border-[#8b1116]/20 bg-[#fff7f7]"
          : "border-neutral-200 bg-[#f7f4ee]"
      }`}
    >
      <p className="text-sm font-black text-[#8b1116]">{speaker}</p>
      <p className="mt-2 text-base leading-8 text-neutral-700">{text}</p>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-black text-neutral-700">{label}</span>
        <span className="rounded-full bg-neutral-950 px-3 py-1 text-xs font-black text-white">
          {value}
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

function MetricDark({ label, value }: { label: string; value: string }) {
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

function AnswerCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[1.25rem] border border-neutral-200 bg-white p-5">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
        {title}
      </p>
      <p className="mt-3 text-sm leading-7 text-neutral-700">{body}</p>
    </div>
  );
}

function Bar({
  label,
  value,
  max,
}: {
  label: string;
  value: number;
  max: number;
}) {
  const width = Math.max(5, Math.min(100, (value / max) * 100));

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-black text-neutral-700">{label}</p>
        <p className="rounded-full bg-neutral-950 px-3 py-1 text-xs font-black text-white">
          {value.toFixed(1)}
        </p>
      </div>
      <div className="mt-2 h-4 overflow-hidden rounded-full bg-[#f7f4ee]">
        <div
          className="h-full rounded-full bg-[#8b1116]"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function medianOf(values: number[]) {
  if (values.length === 0) return 0;

  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 1) {
    return sorted[middle];
  }

  return (sorted[middle - 1] + sorted[middle]) / 2;
}

function scaleToPercent(value: number) {
  return Math.max(3, Math.min(97, (value / 160) * 100));
}
