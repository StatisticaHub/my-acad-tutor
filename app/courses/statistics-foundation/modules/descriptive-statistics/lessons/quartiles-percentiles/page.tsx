"use client";

import LockedLessonGate from "@/components/course/LockedLessonGate";
import { isStatisticsFoundationLessonOpen } from "@/lib/statisticsFoundationAccess";


import { useMemo, useState } from "react";

const tabs = [
  "Learning Route",
  "Lecture",
  "Detailed Notes",
  "Percentile Lab",
  "Animated Mentor",
  "Worked Examples",
  "Practice Studio",
  "Reflection",
  "Quiz",
];

const learningRoute = [
  {
    time: "0–10 min",
    title: "Why positions matter",
    body:
      "Understand that ordered data can be described by location in the list, not only by arithmetic calculations.",
  },
  {
    time: "10–25 min",
    title: "Ranks, positions and ordered data",
    body:
      "Learn how sorting values helps us identify the minimum, maximum, median, quartiles and percentiles.",
  },
  {
    time: "25–45 min",
    title: "Quartiles and the IQR",
    body:
      "Study Q1, Q2 and Q3 as position-based summaries, and connect them to the interquartile range.",
  },
  {
    time: "45–60 min",
    title: "Percentiles",
    body:
      "Learn how percentiles divide ordered data into 100 parts and how to interpret percentile statements carefully.",
  },
  {
    time: "60–85 min",
    title: "Five-number summaries and boxplots",
    body:
      "Bring minimum, Q1, median, Q3 and maximum together into a compact summary and visualise it with a boxplot.",
  },
  {
    time: "85–105 min",
    title: "Outlier fences and interpretation",
    body:
      "Use the 1.5 × IQR rule to flag unusually low or high values, then practise writing careful interpretations.",
  },
];

const lectureConcepts = [
  {
    title: "Ordered position gives structure",
    body:
      "Many descriptive statistics begin by placing values in order. Once data are sorted, we can discuss lower values, middle values, upper values and extremes.",
    example:
      "The values 12, 18, 21, 25 and 90 become easier to interpret when we notice that 90 is far above the rest.",
  },
  {
    title: "The median is the second quartile",
    body:
      "The median divides ordered data into two halves. It is also called Q2, the second quartile.",
    example:
      "If 50% of students scored below 64 and 50% scored above 64, then 64 is the median score.",
  },
  {
    title: "Quartiles divide data into quarters",
    body:
      "Q1 marks roughly the 25th percentile, Q2 marks the 50th percentile and Q3 marks the 75th percentile.",
    example:
      "If Q1 is 45 minutes for commute time, about one quarter of commutes are at or below 45 minutes.",
  },
  {
    title: "Percentiles describe relative standing",
    body:
      "A percentile tells us the position of a value compared with the rest of the dataset. It does not necessarily tell us the exact score, only the relative location.",
    example:
      "A student at the 90th percentile scored higher than about 90% of students.",
  },
  {
    title: "Five-number summaries support boxplots",
    body:
      "The five-number summary gives the minimum, Q1, median, Q3 and maximum. A boxplot turns this summary into a visual display of centre, spread and extremes.",
    example:
      "A boxplot of waiting times can quickly show the median wait, the middle 50% and possible unusually long waits.",
  },
];

const notes = [
  {
    title: "Ordered data",
    formula: "Sort values from smallest to largest",
    body:
      "Quartiles and percentiles are based on order. Before finding them, the data must be sorted. Sorting reveals the position of each observation and makes it possible to identify lower, middle and upper parts of the dataset.",
    strength:
      "Ordering helps us understand structure without assuming the data are symmetric.",
    limitation:
      "Ordering alone does not explain why values differ or whether the data are representative.",
    bestFor:
      "Any numerical or ordinal dataset where position is meaningful.",
  },
  {
    title: "First quartile",
    formula: "Q1 ≈ 25th percentile",
    body:
      "The first quartile marks the lower quarter of the data. Roughly 25% of observations are at or below Q1, and roughly 75% are at or above it.",
    strength:
      "It describes the lower part of the distribution in a robust way.",
    limitation:
      "Different textbooks and software may use slightly different quartile calculation rules.",
    bestFor:
      "Describing the lower part of ordered data.",
  },
  {
    title: "Median",
    formula: "Q2 = 50th percentile",
    body:
      "The median is the middle of the ordered data. It divides the dataset into two halves and is resistant to extreme values.",
    strength:
      "It is robust and easy to interpret.",
    limitation:
      "It does not use the exact distances of all observations from the centre.",
    bestFor:
      "Skewed data, ordinal data and datasets with outliers.",
  },
  {
    title: "Third quartile",
    formula: "Q3 ≈ 75th percentile",
    body:
      "The third quartile marks the upper quarter of the data. Roughly 75% of observations are at or below Q3, and roughly 25% are above it.",
    strength:
      "It helps describe the upper part of the dataset.",
    limitation:
      "Like Q1, it can vary slightly depending on the quartile rule used.",
    bestFor:
      "Describing the upper portion of ordered data.",
  },
  {
    title: "Interquartile range",
    formula: "IQR = Q3 − Q1",
    body:
      "The IQR measures the width of the middle 50% of the data. It is a robust measure of spread because it ignores the most extreme quarter on each side.",
    strength:
      "It is less affected by outliers than the range or standard deviation.",
    limitation:
      "It does not describe the full span of the data.",
    bestFor:
      "Skewed data, boxplots and robust descriptive summaries.",
  },
  {
    title: "Five-number summary",
    formula: "Minimum, Q1, Median, Q3, Maximum",
    body:
      "The five-number summary gives a compact picture of the distribution. It shows the lowest value, lower quartile, median, upper quartile and highest value.",
    strength:
      "It summarises centre, spread and extremes in one simple structure.",
    limitation:
      "It does not show every detail, such as multiple clusters or exact frequencies.",
    bestFor:
      "Boxplots and quick comparison between groups.",
  },
  {
    title: "Outlier fences",
    formula: "Lower fence = Q1 − 1.5 × IQR; Upper fence = Q3 + 1.5 × IQR",
    body:
      "The 1.5 × IQR rule is a common descriptive method for flagging possible outliers. Values below the lower fence or above the upper fence are considered unusually far from the middle 50%.",
    strength:
      "It provides a systematic way to flag unusual observations.",
    limitation:
      "It is a rule of thumb, not proof that a value is wrong or should be deleted.",
    bestFor:
      "Boxplots, outlier screening and descriptive data checks.",
  },
];

const comparisonRows = [
  {
    concept: "Minimum",
    meaning: "Smallest observed value",
    robust: "No",
    use:
      "Shows the lower extreme, but can be strongly affected by one unusual value.",
  },
  {
    concept: "Q1",
    meaning: "About 25% of values are at or below it",
    robust: "Yes",
    use:
      "Describes the lower part of the typical data range.",
  },
  {
    concept: "Median",
    meaning: "Middle ordered value",
    robust: "Yes",
    use:
      "Describes the centre of skewed or outlier-affected data.",
  },
  {
    concept: "Q3",
    meaning: "About 75% of values are at or below it",
    robust: "Yes",
    use:
      "Describes the upper part of the typical data range.",
  },
  {
    concept: "Maximum",
    meaning: "Largest observed value",
    robust: "No",
    use:
      "Shows the upper extreme, but can be strongly affected by one unusual value.",
  },
  {
    concept: "IQR",
    meaning: "Width of the middle 50%",
    robust: "Yes",
    use:
      "Measures robust spread and helps identify possible outliers.",
  },
];

const scenarios = [
  {
    title: "Exam marks",
    question:
      "A class has marks: 42, 48, 51, 55, 57, 61, 66, 70, 75. Give the five-number summary.",
    answer:
      "The five-number summary is minimum 42, Q1 49.5, median 57, Q3 68, maximum 75.",
    working:
      "The median is 57. The lower half is 42, 48, 51, 55, so Q1 = (48 + 51) / 2 = 49.5. The upper half is 61, 66, 70, 75, so Q3 = (66 + 70) / 2 = 68.",
    caution:
      "The five-number summary describes position and spread, but it does not show the exact shape of the whole distribution.",
  },
  {
    title: "Waiting times",
    question:
      "Waiting times are 6, 7, 8, 9, 10, 12, 13, 14, 80. What does the boxplot suggest?",
    answer:
      "The boxplot would show a typical middle range from about 7.5 to 13.5, with 80 likely flagged as an unusually high value.",
    working:
      "Q1 = 7.5, median = 10, Q3 = 13.5, so IQR = 6. The upper fence is 13.5 + 1.5 × 6 = 22.5. Since 80 is above 22.5, it is flagged.",
    caution:
      "Flagged outliers should be investigated, not automatically removed.",
  },
  {
    title: "Percentile rank",
    question:
      "A student is at the 85th percentile in a test. What does this mean?",
    answer:
      "It means the student scored higher than about 85% of students, or that about 85% scored at or below that student’s score.",
    working:
      "Percentiles describe relative position in an ordered distribution.",
    caution:
      "The 85th percentile does not mean the student scored 85%. Percentile rank and percentage score are different ideas.",
  },
  {
    title: "House prices",
    question:
      "A town reports median house price £240k, Q1 £190k and Q3 £310k. Interpret this.",
    answer:
      "The middle house price is £240k, and the middle 50% of house prices are between £190k and £310k.",
    working:
      "IQR = £310k − £190k = £120k, so typical house prices vary across a middle spread of £120k.",
    caution:
      "The five-number summary is better than mean and standard deviation when house prices are skewed.",
  },
];

const mentorTopics = [
  {
    id: "quartiles",
    label: "Quartiles",
    answer:
      "Quartiles split ordered data into four parts. Q1 is the lower quartile, Q2 is the median, and Q3 is the upper quartile.",
  },
  {
    id: "percentiles",
    label: "Percentiles",
    answer:
      "Percentiles describe relative position. The 90th percentile means a value is at or above about 90% of the ordered data.",
  },
  {
    id: "iqr",
    label: "IQR",
    answer:
      "The IQR is Q3 minus Q1. It measures the spread of the middle 50% and is resistant to extreme values.",
  },
  {
    id: "boxplot",
    label: "Boxplots",
    answer:
      "A boxplot visualises the five-number summary. The box shows Q1 to Q3, the line shows the median, and whiskers show the lower and upper spread.",
  },
  {
    id: "outliers",
    label: "Outlier fences",
    answer:
      "The 1.5 × IQR rule flags values far below Q1 or far above Q3. These are possible outliers, but they should be investigated before making decisions.",
  },
];

const quizQuestions = [
  {
    question: "What is Q2?",
    options: ["Minimum", "Median", "Maximum", "Range"],
    answer: 1,
    feedback:
      "Q2 is the median, or the 50th percentile of the ordered data.",
  },
  {
    question: "What does the interquartile range measure?",
    options: [
      "The spread of the middle 50% of the data",
      "The distance from the mean to the maximum",
      "The most common value",
      "The number of observations",
    ],
    answer: 0,
    feedback:
      "The IQR is Q3 − Q1 and measures the width of the middle half of the data.",
  },
  {
    question: "Which values form the five-number summary?",
    options: [
      "Mean, median, mode, range, variance",
      "Minimum, Q1, median, Q3, maximum",
      "Q1, Q2, Q3, mean, standard deviation",
      "Minimum, maximum, mean, mode, standard deviation",
    ],
    answer: 1,
    feedback:
      "The five-number summary consists of minimum, Q1, median, Q3 and maximum.",
  },
  {
    question: "What does the 90th percentile mean?",
    options: [
      "The value must be 90.",
      "About 90% of values are at or below that point.",
      "The mean is 90.",
      "There are exactly 90 observations.",
    ],
    answer: 1,
    feedback:
      "The 90th percentile is a position. About 90% of values are at or below it.",
  },
  {
    question: "What is the common upper outlier fence?",
    options: [
      "Q3 + 1.5 × IQR",
      "Q1 − 1.5 × IQR",
      "Median + mean",
      "Maximum − minimum",
    ],
    answer: 0,
    feedback:
      "The upper fence is Q3 + 1.5 × IQR.",
  },
  {
    question: "Why is the IQR useful for skewed data?",
    options: [
      "It uses only the mean.",
      "It is less affected by extreme values.",
      "It always equals the range.",
      "It removes the need to order data.",
    ],
    answer: 1,
    feedback:
      "The IQR focuses on the middle 50%, so it is less affected by extreme tails.",
  },
];

export default function QuartilesPercentilesLesson() {
  const lessonCode = "2.3";

  if (!isStatisticsFoundationLessonOpen(lessonCode)) {
    return (
      <LockedLessonGate
        lessonCode={lessonCode}
        lessonTitle="Quartiles and percentiles"
        moduleTitle="Module 2: Descriptive Statistics"
      />
    );
  }

  const [activeTab, setActiveTab] = useState("Learning Route");
  const [datasetType, setDatasetType] = useState("balanced");
  const [outlierStrength, setOutlierStrength] = useState(92);
  const [spread, setSpread] = useState(8);
  const [sampleSize, setSampleSize] = useState(13);
  const [percentile, setPercentile] = useState(75);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [mentorTopic, setMentorTopic] = useState("quartiles");
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(
    {},
  );

  const activeScenario = scenarios[scenarioIndex];
  const activeMentor =
    mentorTopics.find((topic) => topic.id === mentorTopic) ?? mentorTopics[0];

  const values = useMemo(() => {
    let data: number[] = [];
    const centre = 55;

    if (datasetType === "balanced") {
      data = Array.from({ length: sampleSize }, (_, index) => {
        const offset = index - Math.floor(sampleSize / 2);
        return Math.round(centre + offset * (spread / 5));
      });
    }

    if (datasetType === "right-skewed") {
      data = Array.from({ length: sampleSize - 1 }, (_, index) => {
        return Math.round(34 + index * (spread / 4));
      });
      data.push(outlierStrength);
    }

    if (datasetType === "left-skewed") {
      data = [Math.max(1, 110 - outlierStrength)];
      data.push(
        ...Array.from({ length: sampleSize - 1 }, (_, index) =>
          Math.round(52 + index * (spread / 4)),
        ),
      );
    }

    if (datasetType === "two-clusters") {
      const lower = Math.floor(sampleSize / 2);
      const upper = sampleSize - lower;

      data = [
        ...Array.from({ length: lower }, (_, index) =>
          Math.round(35 + index * 1.8),
        ),
        ...Array.from({ length: upper }, (_, index) =>
          Math.round(70 + index * 1.8),
        ),
      ];
    }

    if (datasetType === "tight-middle") {
      data = [
        28,
        ...Array.from({ length: sampleSize - 2 }, (_, index) =>
          Math.round(55 + (index - Math.floor((sampleSize - 2) / 2)) * 0.9),
        ),
        84,
      ];
    }

    return data.sort((a, b) => a - b);
  }, [datasetType, outlierStrength, sampleSize, spread]);

  const minimum = values[0];
  const maximum = values[values.length - 1];
  const median = medianOf(values);
  const lowerHalf = values.slice(0, Math.floor(values.length / 2));
  const upperHalf = values.slice(Math.ceil(values.length / 2));
  const q1 = medianOf(lowerHalf);
  const q3 = medianOf(upperHalf);
  const iqr = q3 - q1;
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;

  const selectedPercentileValue = useMemo(() => {
    if (values.length === 0) return 0;

    const position = (percentile / 100) * (values.length - 1);
    const lowerIndex = Math.floor(position);
    const upperIndex = Math.ceil(position);

    if (lowerIndex === upperIndex) return values[lowerIndex];

    const weight = position - lowerIndex;
    return values[lowerIndex] * (1 - weight) + values[upperIndex] * weight;
  }, [percentile, values]);

  const possibleOutliers = values.filter(
    (value) => value < lowerFence || value > upperFence,
  );

  const labAdvice = useMemo(() => {
    if (possibleOutliers.length > 0) {
      return "The 1.5 × IQR rule flags at least one possible outlier. This value should be investigated, not automatically removed.";
    }

    if (datasetType === "two-clusters") {
      return "The five-number summary is useful, but the two-cluster pattern means a graph is especially important.";
    }

    if (datasetType === "balanced") {
      return "The quartiles are fairly evenly spaced, suggesting a reasonably balanced distribution.";
    }

    if (datasetType === "right-skewed") {
      return "The upper side stretches farther than the lower side, suggesting right skewness.";
    }

    if (datasetType === "left-skewed") {
      return "The lower side stretches farther than the upper side, suggesting left skewness.";
    }

    return "The middle values are tightly packed while the extremes are farther away. Compare the IQR with the full range.";
  }, [datasetType, possibleOutliers.length]);

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
          50% { transform: scale(1.2); opacity: 1; }
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
                Statistics Foundation · Lesson 2.3
              </p>

              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-7xl">
                Quartiles, percentiles and five-number summaries.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                Quartiles and percentiles describe where values sit inside an
                ordered dataset. This lesson teaches students how to sort data,
                interpret positional summaries, calculate quartiles, understand
                percentile rank, build five-number summaries, read boxplots and
                use IQR fences to flag possible outliers.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "100–105 minutes",
                  "No coding",
                  "Boxplot lab",
                  "Percentile reasoning",
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
                From ordered values to boxplot thinking.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Sort values",
                  "Find median",
                  "Find quartiles",
                  "Calculate IQR",
                  "Build summary",
                  "Flag outliers",
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
                Learn how position summarises a distribution.
              </h2>

              <p className="mt-5 text-base leading-8 text-neutral-700">
                Measures of centre and spread are stronger when we understand
                position. Quartiles and percentiles let us describe how values
                are arranged from low to high. They are especially useful for
                skewed data, ordinal data, boxplots and robust summaries.
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
                By the end, you should be able to read a boxplot like a statistical story.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Order a dataset from smallest to largest.",
                  "Explain Q1, Q2 and Q3 in plain language.",
                  "Calculate and interpret the IQR.",
                  "Explain percentiles and percentile ranks.",
                  "Construct a five-number summary.",
                  "Read a boxplot using quartiles and whiskers.",
                  "Use 1.5 × IQR fences to flag possible outliers.",
                  "Interpret quartiles carefully in context.",
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
                  Position decision board
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Quartiles and percentiles describe location inside ordered data.
                </h2>

                <p className="mt-4 text-base leading-8 text-neutral-700">
                  Instead of asking only “what is the average?”, positional
                  summaries ask “where does this value sit in the ordered
                  dataset?” This gives a robust way to describe distributions,
                  especially when data are skewed or contain unusual values.
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
                  Mr. R turns an ordered list into a boxplot.
                </h2>

                <div className="mt-6 grid gap-4">
                  <Dialogue
                    speaker="Mr. R"
                    text="Today we are going to think like statisticians who read data from left to right: smallest to largest."
                  />
                  <Dialogue
                    speaker="Amelia"
                    text="So before calculating quartiles, we always sort the data?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Exactly. Quartiles and percentiles are positional summaries. They only make sense after the data are ordered."
                  />
                  <Dialogue
                    speaker="Ben"
                    text="Is the median a percentile?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Yes. The median is the 50th percentile. It is also Q2, the second quartile."
                  />
                  <Dialogue
                    speaker="Chloe"
                    text="Then Q1 is around the 25th percentile and Q3 is around the 75th percentile?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Correct. Q1 marks the lower quarter and Q3 marks the upper quarter. The distance between them is the IQR."
                  />
                  <Dialogue
                    speaker="Daniel"
                    text="Why is the IQR important?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Because it describes the middle 50% of the data. It is robust, so it is not easily distorted by extreme values."
                  />
                  <Dialogue
                    speaker="Amelia"
                    text="And a boxplot is just a visual version of this?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Yes. A boxplot turns the five-number summary into a picture of centre, spread and possible outliers."
                  />
                </div>

                <section className="mt-8 rounded-[2rem] border border-[#8b1116]/20 bg-[#fff7f7] p-6">
                  <h3 className="text-2xl font-black tracking-[-0.04em] text-[#8b1116]">
                    Lecture takeaway
                  </h3>
                  <p className="mt-3 text-base leading-8 text-neutral-700">
                    Quartiles and percentiles are about position. They help us
                    describe not only the centre, but also how the lower,
                    middle and upper parts of the data are arranged.
                  </p>
                </section>
              </section>
            </section>

            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Boxplot interpretation pathway
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Read a boxplot in six questions.
              </h2>

              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    question: "Where is the median?",
                    reason:
                      "The median line tells us the middle position of the data.",
                  },
                  {
                    question: "How wide is the box?",
                    reason:
                      "The box width shows the IQR, or spread of the middle 50%.",
                  },
                  {
                    question: "Are the whiskers balanced?",
                    reason:
                      "Unequal whiskers can suggest skewness or uneven spread.",
                  },
                  {
                    question: "Are there flagged points?",
                    reason:
                      "Values beyond the outlier fences may be unusual.",
                  },
                  {
                    question: "Is the lower half compressed?",
                    reason:
                      "A short lower section means lower values are tightly grouped.",
                  },
                  {
                    question: "Is the upper half stretched?",
                    reason:
                      "A long upper section may suggest right skewness.",
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
                    <p className="mt-3 text-sm leading-7 text-neutral-700">
                      {item.reason}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </section>
        )}

        {activeTab === "Detailed Notes" && (
          <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Detailed notes
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Quartiles, percentiles and five-number summaries in depth.
            </h2>

            <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-700">
              Quartiles and percentiles are positional summaries. They do not
              begin with arithmetic. They begin with order. Once the values are
              sorted, we can describe the lower quarter, the middle, the upper
              quarter and the extremes. This is especially useful for skewed
              data because position is less sensitive to outliers than the mean.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {notes.map((item) => (
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
                Important warning
              </p>

              <h3 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                Quartile rules can differ slightly.
              </h3>

              <p className="mt-4 text-sm leading-7 text-white/75">
                Different textbooks and software packages sometimes calculate
                quartiles using slightly different position rules. This usually
                makes little difference for large datasets, but it can affect
                small examples. The most important skill is not memorising one
                rule only, but understanding what Q1, Q2 and Q3 mean.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: "Q1",
                    body:
                      "Lower quartile: around one quarter of values are at or below this point.",
                  },
                  {
                    title: "Q2",
                    body:
                      "Median: around half of values are at or below this point.",
                  },
                  {
                    title: "Q3",
                    body:
                      "Upper quartile: around three quarters of values are at or below this point.",
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
                What each positional summary tells us.
              </h3>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[760px] border-separate border-spacing-y-3 text-left">
                  <thead>
                    <tr className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                      <th className="px-4">Concept</th>
                      <th className="px-4">Meaning</th>
                      <th className="px-4">Robust?</th>
                      <th className="px-4">Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr key={row.concept} className="bg-white">
                        <td className="rounded-l-2xl px-4 py-4 text-sm font-black">
                          {row.concept}
                        </td>
                        <td className="px-4 py-4 text-sm text-neutral-700">
                          {row.meaning}
                        </td>
                        <td className="px-4 py-4 text-sm text-neutral-700">
                          {row.robust}
                        </td>
                        <td className="rounded-r-2xl px-4 py-4 text-sm leading-7 text-neutral-700">
                          {row.use}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        )}

        {activeTab === "Percentile Lab" && (
          <section className="mt-8 grid gap-6">
            <section className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="p-6 md:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                    Interactive percentile and boxplot lab
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    Move through the ordered data.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-neutral-700">
                    Adjust the dataset and choose a percentile. Watch how the
                    five-number summary, IQR, fences and possible outliers
                    change. This lab connects ordered positions to boxplot
                    interpretation.
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
                        <option value="balanced">Balanced</option>
                        <option value="right-skewed">Right-skewed</option>
                        <option value="left-skewed">Left-skewed</option>
                        <option value="two-clusters">Two clusters</option>
                        <option value="tight-middle">Tight middle with extremes</option>
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
                      label="General spread"
                      value={spread}
                      min={4}
                      max={18}
                      onChange={setSpread}
                    />
                    <Slider
                      label="Sample size"
                      value={sampleSize}
                      min={9}
                      max={23}
                      onChange={setSampleSize}
                    />
                    <Slider
                      label="Selected percentile"
                      value={percentile}
                      min={5}
                      max={95}
                      onChange={setPercentile}
                    />
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <Metric label="Minimum" value={minimum.toFixed(1)} />
                    <Metric label="Q1" value={q1.toFixed(1)} />
                    <Metric label="Median" value={median.toFixed(1)} />
                    <Metric label="Q3" value={q3.toFixed(1)} />
                  </div>
                </div>

                <div className="border-t border-neutral-200 bg-neutral-950 p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                    Interpretation panel
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    What does the ordered summary say?
                  </h2>

                  <p className="mt-6 text-lg leading-9 text-white/80">
                    {labAdvice}
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    <MetricDark label="Maximum" value={maximum.toFixed(1)} />
                    <MetricDark label="IQR" value={iqr.toFixed(1)} />
                    <MetricDark label="Lower fence" value={lowerFence.toFixed(1)} />
                    <MetricDark label="Upper fence" value={upperFence.toFixed(1)} />
                  </div>

                  <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.07] p-5">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                      Selected percentile
                    </p>
                    <p className="mt-3 text-4xl font-black tracking-[-0.05em]">
                      P{percentile} ≈ {selectedPercentileValue.toFixed(1)}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/70">
                      About {percentile}% of values are at or below this point.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Boxplot visual
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                  The box shows the middle 50%.
                </h2>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  The box stretches from Q1 to Q3. The median line sits inside
                  the box. Values beyond the fences are flagged as possible
                  outliers.
                </p>

                <div className="mt-6 rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5">
                  <div className="relative h-40 rounded-[1.5rem] bg-white p-4">
                    <div className="absolute left-4 right-4 top-1/2 h-1 rounded-full bg-neutral-200" />

                    <div
                      className="absolute top-[42%] h-8 rounded-xl border-2 border-[#8b1116] bg-[#8b1116]/10"
                      style={{
                        left: `${scaleToPercent(q1)}%`,
                        width: `${Math.max(
                          4,
                          scaleToPercent(q3) - scaleToPercent(q1),
                        )}%`,
                      }}
                    />

                    <div
                      className="absolute top-[35%] h-16 w-1 rounded-full bg-neutral-950"
                      style={{ left: `${scaleToPercent(median)}%` }}
                    />

                    <div
                      className="absolute top-1/2 h-1 rounded-full bg-neutral-500"
                      style={{
                        left: `${scaleToPercent(minimum)}%`,
                        width: `${Math.max(
                          3,
                          scaleToPercent(q1) - scaleToPercent(minimum),
                        )}%`,
                      }}
                    />

                    <div
                      className="absolute top-1/2 h-1 rounded-full bg-neutral-500"
                      style={{
                        left: `${scaleToPercent(q3)}%`,
                        width: `${Math.max(
                          3,
                          scaleToPercent(maximum) - scaleToPercent(q3),
                        )}%`,
                      }}
                    />

                    {values.map((value, index) => {
                      const flagged = value < lowerFence || value > upperFence;

                      return (
                        <div
                          key={`${value}-${index}`}
                          className={`absolute top-[74%] h-3 w-3 -translate-x-1/2 rounded-full ${
                            flagged ? "bg-[#8b1116]" : "bg-neutral-950"
                          }`}
                          style={{
                            left: `${scaleToPercent(value)}%`,
                            animation: flagged
                              ? "dotPulse 2.4s ease-in-out infinite"
                              : undefined,
                          }}
                        />
                      );
                    })}
                  </div>

                  <div className="mt-5 grid gap-3 text-sm leading-7 text-neutral-700 md:grid-cols-4">
                    <div className="rounded-2xl bg-white p-4">
                      <strong>Box:</strong> Q1 to Q3.
                    </div>
                    <div className="rounded-2xl bg-white p-4">
                      <strong>Dark line:</strong> median.
                    </div>
                    <div className="rounded-2xl bg-white p-4">
                      <strong>Whiskers:</strong> lower and upper spread.
                    </div>
                    <div className="rounded-2xl bg-white p-4">
                      <strong>Red dots:</strong> possible outliers.
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Ordered data strip
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                  Position becomes visible when values are sorted.
                </h2>

                <div className="mt-6 flex flex-wrap gap-2">
                  {values.map((value, index) => {
                    const isQuartile =
                      value === minimum ||
                      value === q1 ||
                      value === median ||
                      value === q3 ||
                      value === maximum;

                    return (
                      <div
                        key={`${value}-${index}`}
                        className={`rounded-full px-3 py-2 text-sm font-black ${
                          isQuartile
                            ? "bg-neutral-950 text-white"
                            : "bg-[#f7f4ee] text-neutral-700"
                        }`}
                      >
                        {value}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 grid gap-3">
                  <SummaryLine label="Minimum" value={minimum.toFixed(1)} />
                  <SummaryLine label="Q1" value={q1.toFixed(1)} />
                  <SummaryLine label="Median" value={median.toFixed(1)} />
                  <SummaryLine label="Q3" value={q3.toFixed(1)} />
                  <SummaryLine label="Maximum" value={maximum.toFixed(1)} />
                  <SummaryLine
                    label="Possible outliers"
                    value={
                      possibleOutliers.length > 0
                        ? possibleOutliers.join(", ")
                        : "None flagged"
                    }
                  />
                </div>

                <section className="mt-6 rounded-[1.5rem] border border-[#8b1116]/20 bg-[#fff7f7] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
                    Write this conclusion
                  </p>
                  <p className="mt-3 text-sm leading-7 text-neutral-700">
                    “The median is <strong>{median.toFixed(1)}</strong>, and
                    the middle 50% of values lie between{" "}
                    <strong>{q1.toFixed(1)}</strong> and{" "}
                    <strong>{q3.toFixed(1)}</strong>. The IQR is{" "}
                    <strong>{iqr.toFixed(1)}</strong>, suggesting the typical
                    spread around the middle is{" "}
                    {iqr > 25 ? "wide" : iqr < 8 ? "narrow" : "moderate"}.”
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
                Ask Mr. R about quartiles.
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
                  Choose a small dataset, order it, find the five-number summary
                  and write two sentences describing the centre and middle 50%.
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
              Calculate, interpret and critique positional summaries.
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
              Practise ordered-data reasoning.
            </h2>

            <div className="mt-8 grid gap-5">
              {[
                {
                  task:
                    "Order the values 18, 12, 25, 20, 14, 30, 22 and identify the median.",
                  hint:
                    "Sort first. For an even number of values, average the two middle values.",
                },
                {
                  task:
                    "Explain in plain language what Q1 = 40 means for exam scores.",
                  hint:
                    "Think about the lower quarter of the ordered data.",
                },
                {
                  task:
                    "A student is at the 92nd percentile. Explain why this does not mean they scored 92%.",
                  hint:
                    "Percentile rank is about position, not percentage score.",
                },
                {
                  task:
                    "A boxplot has a very long upper whisker. What might this suggest?",
                  hint:
                    "Think about right skewness or unusually large values.",
                },
                {
                  task:
                    "Use the rule Q3 + 1.5 × IQR to explain how a high outlier can be flagged.",
                  hint:
                    "Calculate the upper fence and compare high values with it.",
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
              Write a careful positional interpretation.
            </h2>

            <div className="mt-8 grid gap-5">
              {[
                "Explain why quartiles require ordered data.",
                "Describe the difference between Q1, median and Q3.",
                "Explain why the IQR is more robust than the range.",
                "Write a sentence interpreting a 90th percentile value.",
                "Describe what a boxplot can show that a mean cannot.",
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
                “The median is _____. The middle 50% of values lie between
                _____ and _____. The IQR is _____, which suggests _____. Any
                values beyond the fences should be investigated because _____.”
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

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3">
      <span className="text-sm font-black text-neutral-700">{label}</span>
      <span className="text-sm font-bold text-neutral-700">{value}</span>
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
