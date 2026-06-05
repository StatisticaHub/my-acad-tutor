"use client";

import LockedLessonGate from "@/components/course/LockedLessonGate";
import { isStatisticsFoundationLessonOpen } from "@/lib/statisticsFoundationAccess";


import { useMemo, useState } from "react";

const tabs = [
  "Learning Route",
  "Lecture",
  "Detailed Notes",
  "Centre Lab",
  "Animated Mentor",
  "Worked Examples",
  "Practice Studio",
  "Reflection",
  "Quiz",
];

const learningRoute = [
  {
    time: "0–10 min",
    title: "What does a typical value mean?",
    body:
      "Begin by understanding that a measure of centre is not just a calculation. It is a summary of where the data tend to gather.",
  },
  {
    time: "10–30 min",
    title: "Mean, median and mode",
    body:
      "Learn the three main measures of centre, how they are calculated, and what each one is trying to represent.",
  },
  {
    time: "30–45 min",
    title: "When the mean works well",
    body:
      "Study why the mean is powerful for balanced numerical data, but sensitive to extreme values.",
  },
  {
    time: "45–60 min",
    title: "When the median is safer",
    body:
      "Understand why the median is resistant to outliers and often better for skewed data such as income, waiting time or house prices.",
  },
  {
    time: "60–80 min",
    title: "Interactive centre lab",
    body:
      "Adjust skewness, outliers and repeated values to see how the mean, median and mode respond differently.",
  },
  {
    time: "80–100 min",
    title: "Worked examples and quiz",
    body:
      "Practise choosing the most appropriate measure of centre for real educational, medical and everyday datasets.",
  },
];

const lectureConcepts = [
  {
    title: "A measure of centre is a compression",
    body:
      "A dataset may contain many values. A measure of centre compresses those values into one representative number. This is useful, but it also loses information.",
    example:
      "The average exam score may summarise a class, but it does not show whether students were tightly grouped or split into high and low performers.",
  },
  {
    title: "The mean balances the data",
    body:
      "The mean is the arithmetic average. It uses every value and acts like a balancing point of the dataset.",
    example:
      "For 4, 5, 6, 7 and 8, the mean is 6 because the values balance around 6.",
  },
  {
    title: "The median finds the middle position",
    body:
      "The median is the middle value after the data are ordered. It depends on position rather than numerical size.",
    example:
      "For 2, 3, 4, 5 and 100, the median is 4. The large value 100 does not pull the median upward.",
  },
  {
    title: "The mode identifies the most common value",
    body:
      "The mode is the value or category that occurs most often. It is especially useful for categorical data.",
    example:
      "If most students choose 'online lectures' as their preferred format, that category is the mode.",
  },
  {
    title: "The best measure depends on the data shape",
    body:
      "There is no single best measure of centre for every dataset. The choice depends on whether the data are numerical or categorical, symmetric or skewed, clean or affected by outliers.",
    example:
      "For house prices, the median is often more informative than the mean because a few very expensive houses can pull the mean upward.",
  },
];

const detailedNotes = [
  {
    title: "The arithmetic mean",
    formula: "Mean = (sum of all values) ÷ (number of values)",
    body:
      "The arithmetic mean is the most familiar average. If the dataset contains n observations x₁, x₂, ..., xₙ, the sample mean is written as x̄ = (x₁ + x₂ + ... + xₙ) / n. The mean uses every observation, so it changes whenever any value changes.",
    strength:
      "It is mathematically powerful, uses all values, and is central to many later statistical ideas such as variance, standard deviation and regression.",
    limitation:
      "It is sensitive to outliers and skewness. A single unusually large or small value can move the mean strongly.",
    bestFor:
      "Approximately symmetric numerical data without severe outliers.",
  },
  {
    title: "The median",
    formula: "Median = middle ordered value",
    body:
      "The median is found by arranging the data in order. If there is an odd number of observations, the median is the middle value. If there is an even number, the median is the average of the two middle values. The median is based on position, not the full numerical size of every value.",
    strength:
      "It is resistant to extreme values and gives a stable centre for skewed distributions.",
    limitation:
      "It ignores some information about how far values are from the middle.",
    bestFor:
      "Skewed data, ordinal data, income, house prices, waiting times and survival times.",
  },
  {
    title: "The mode",
    formula: "Mode = most frequent value",
    body:
      "The mode is the most common value or category. A dataset can have no mode, one mode, or more than one mode. Unlike the mean and median, the mode can be used with categorical data.",
    strength:
      "It is useful for identifying the most common category, response or repeated value.",
    limitation:
      "It can be unstable in small datasets and may not represent the centre well for continuous numerical data.",
    bestFor:
      "Categorical data, survey choices, preference data and repeated discrete values.",
  },
  {
    title: "Weighted mean",
    formula: "Weighted mean = Σ(wᵢxᵢ) ÷ Σwᵢ",
    body:
      "A weighted mean is used when some values count more than others. Each value is multiplied by a weight. The total weighted sum is then divided by the total weight.",
    strength:
      "It correctly handles situations where observations or groups have different importance, frequency or size.",
    limitation:
      "It can be misleading if the weights are chosen carelessly or not explained.",
    bestFor:
      "Course grades with different assessment weights, grouped means and survey estimates with weighting.",
  },
  {
    title: "Trimmed mean",
    formula: "Trimmed mean = mean after removing a fixed percentage from both tails",
    body:
      "A trimmed mean removes a small percentage of the smallest and largest values before calculating the mean. It is a compromise between the mean and median.",
    strength:
      "It reduces the effect of extreme observations while still using much of the dataset.",
    limitation:
      "The trimming rule must be stated clearly. Different trimming percentages can give different results.",
    bestFor:
      "Data with mild outliers where the researcher still wants an average-like summary.",
  },
];

const centreComparisons = [
  {
    situation: "Symmetric numerical data",
    mean: "Usually appropriate",
    median: "Also appropriate",
    mode: "May be less useful",
    advice:
      "When the distribution is balanced, the mean and median are often close. Reporting the mean is usually reasonable.",
  },
  {
    situation: "Right-skewed data",
    mean: "Pulled upward",
    median: "Often better",
    mode: "May describe peak only",
    advice:
      "For waiting times, income or hospital stay length, the median often gives a more typical value.",
  },
  {
    situation: "Data with a strong outlier",
    mean: "Highly affected",
    median: "More resistant",
    mode: "May be unchanged",
    advice:
      "If one extreme value changes the mean a lot, compare the mean and median before deciding what to report.",
  },
  {
    situation: "Categorical data",
    mean: "Not meaningful",
    median: "Usually not meaningful",
    mode: "Most appropriate",
    advice:
      "For categories such as blood group, subject choice or transport method, the mode is the natural summary.",
  },
  {
    situation: "Ordinal ratings",
    mean: "Sometimes used carefully",
    median: "Often sensible",
    mode: "Also useful",
    advice:
      "For ratings such as 1 to 5 satisfaction, the median and mode may be easier to interpret than the mean.",
  },
];

const scenarios = [
  {
    title: "Exam scores",
    question:
      "A class has scores: 54, 57, 61, 62, 64, 66, 68. Which measure of centre is suitable?",
    answer:
      "The mean and median are both suitable because the values are fairly balanced and there are no extreme outliers.",
    working:
      "Mean = 432 ÷ 7 = 61.7. Median = 62. These are close, suggesting the centre is stable.",
    caution:
      "A measure of centre does not show spread. Another class could have the same mean but much wider variation.",
  },
  {
    title: "House prices",
    question:
      "A street has house prices: £180k, £190k, £200k, £210k, £950k. What centre should be reported?",
    answer:
      "The median is more suitable because the very expensive house pulls the mean upward.",
    working:
      "Mean = £346k, while median = £200k. The mean is not typical of most houses on the street.",
    caution:
      "For skewed financial data, always check whether the mean is being distorted by extreme values.",
  },
  {
    title: "Hospital waiting times",
    question:
      "Waiting times are 8, 9, 10, 11, 12, 15 and 90 minutes. What is the safer centre?",
    answer:
      "The median is safer because one unusually long wait strongly affects the mean.",
    working:
      "Mean = 155 ÷ 7 = 22.1 minutes. Median = 11 minutes. The median better describes a typical patient experience.",
    caution:
      "The outlier may still be important operationally, but it should not be allowed to distort the typical waiting time.",
  },
  {
    title: "Favourite learning format",
    question:
      "Students choose one preferred format: in-person, online, hybrid or recorded. Which centre applies?",
    answer:
      "The mode applies because the variable is categorical.",
    working:
      "If 'hybrid' is chosen most often, then hybrid is the modal category.",
    caution:
      "The mean cannot be calculated for unordered categories such as learning format.",
  },
];

const mentorTopics = [
  {
    id: "mean",
    label: "Mean",
    answer:
      "The mean is the balancing point of numerical data. It is powerful because it uses every value, but this also makes it sensitive to outliers.",
  },
  {
    id: "median",
    label: "Median",
    answer:
      "The median is the middle ordered value. It is often the safest description of a typical value when the data are skewed or contain extreme observations.",
  },
  {
    id: "mode",
    label: "Mode",
    answer:
      "The mode is the most frequent value or category. It is especially useful when the data are categorical and a mean would not make sense.",
  },
  {
    id: "outlier",
    label: "Outliers",
    answer:
      "Outliers can pull the mean strongly, but they usually have much less effect on the median. This is why comparing the mean and median helps diagnose skewness or unusual values.",
  },
  {
    id: "choice",
    label: "Choosing a centre",
    answer:
      "Choose the centre by asking: is the variable numerical or categorical, is the distribution symmetric or skewed, are there outliers, and what would be meaningful to the audience?",
  },
];

const quizQuestions = [
  {
    question: "Which measure of centre uses every numerical value?",
    options: ["Mean", "Median", "Mode", "Range"],
    answer: 0,
    feedback:
      "The mean uses every value because it adds all observations and divides by the number of observations.",
  },
  {
    question: "Which measure is usually most resistant to extreme values?",
    options: ["Mean", "Median", "Weighted mean", "Total"],
    answer: 1,
    feedback:
      "The median is resistant because it depends on ordered position rather than the size of every value.",
  },
  {
    question: "Which measure of centre is suitable for categorical data?",
    options: ["Mean", "Mode", "Variance", "Standard deviation"],
    answer: 1,
    feedback:
      "The mode is suitable for categorical data because it identifies the most common category.",
  },
  {
    question:
      "For right-skewed income data, why might the median be preferred to the mean?",
    options: [
      "The median is always larger than the mean.",
      "The median is easier to calculate by computer.",
      "A few very high incomes can pull the mean upward.",
      "The mean cannot be calculated for numbers.",
    ],
    answer: 2,
    feedback:
      "Right-skewed data can contain very large values that pull the mean upward, making the median more typical.",
  },
  {
    question: "What is the median of 3, 5, 8, 10, 100?",
    options: ["5", "8", "10", "25.2"],
    answer: 1,
    feedback:
      "The ordered values are 3, 5, 8, 10, 100. The middle value is 8.",
  },
  {
    question: "What does a weighted mean allow us to do?",
    options: [
      "Ignore all large values.",
      "Give different values different importance.",
      "Use categories without numbers.",
      "Find only the most frequent value.",
    ],
    answer: 1,
    feedback:
      "A weighted mean gives different observations or components different importance.",
  },
];

export default function MeasuresOfCentreLesson() {
  const lessonCode = "2.1";

  if (!isStatisticsFoundationLessonOpen(lessonCode)) {
    return (
      <LockedLessonGate
        lessonCode={lessonCode}
        lessonTitle="Measures of centre"
        moduleTitle="Module 2: Descriptive Statistics"
      />
    );
  }

  const [activeTab, setActiveTab] = useState("Learning Route");
  const [datasetType, setDatasetType] = useState("balanced");
  const [outlierSize, setOutlierSize] = useState(80);
  const [repetition, setRepetition] = useState(3);
  const [shift, setShift] = useState(0);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [mentorTopic, setMentorTopic] = useState("mean");
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(
    {},
  );

  const activeScenario = scenarios[scenarioIndex];
  const activeMentor =
    mentorTopics.find((topic) => topic.id === mentorTopic) ?? mentorTopics[0];

  const labValues = useMemo(() => {
    let values = [42, 46, 49, 51, 53, 56, 59, 62, 65];

    if (datasetType === "balanced") {
      values = [42, 46, 49, 51, 53, 56, 59, 62, 65];
    }

    if (datasetType === "right-skewed") {
      values = [28, 31, 34, 35, 37, 39, 42, 48, outlierSize];
    }

    if (datasetType === "left-skewed") {
      values = [100 - outlierSize, 52, 58, 61, 63, 66, 69, 72, 75];
    }

    if (datasetType === "repeated") {
      values = [
        44,
        48,
        50,
        50,
        50,
        52,
        54,
        56,
        58,
        ...Array.from({ length: repetition }, () => 50),
      ];
    }

    return values.map((value) => Math.max(5, Math.round(value + shift)));
  }, [datasetType, outlierSize, repetition, shift]);

  const sortedValues = useMemo(() => {
    return [...labValues].sort((a, b) => a - b);
  }, [labValues]);

  const mean = useMemo(() => {
    return labValues.reduce((total, value) => total + value, 0) / labValues.length;
  }, [labValues]);

  const median = useMemo(() => {
    const middle = Math.floor(sortedValues.length / 2);

    if (sortedValues.length % 2 === 1) {
      return sortedValues[middle];
    }

    return (sortedValues[middle - 1] + sortedValues[middle]) / 2;
  }, [sortedValues]);

  const mode = useMemo(() => {
    const frequency = new Map<number, number>();

    labValues.forEach((value) => {
      frequency.set(value, (frequency.get(value) ?? 0) + 1);
    });

    let bestValue = labValues[0];
    let bestCount = 1;

    frequency.forEach((count, value) => {
      if (count > bestCount) {
        bestValue = value;
        bestCount = count;
      }
    });

    return bestCount === 1 ? "No clear mode" : `${bestValue}`;
  }, [labValues]);

  const trimmedMean = useMemo(() => {
    if (sortedValues.length < 5) return mean;

    const trimmed = sortedValues.slice(1, -1);
    return trimmed.reduce((total, value) => total + value, 0) / trimmed.length;
  }, [mean, sortedValues]);

  const labAdvice = useMemo(() => {
    const gap = Math.abs(mean - median);

    if (datasetType === "balanced" && gap < 3) {
      return "The mean and median are close. This suggests the centre is stable and the data are fairly balanced.";
    }

    if (datasetType === "right-skewed") {
      return "The mean is being pulled upward by a large value. The median gives a safer description of a typical observation.";
    }

    if (datasetType === "left-skewed") {
      return "The mean is being pulled downward by a small value. The median is more resistant to this extreme observation.";
    }

    if (datasetType === "repeated") {
      return "Repeated values make the mode meaningful. Here, the most common value may tell us what occurs most often.";
    }

    return "Compare the mean, median and mode before deciding which measure describes the dataset most honestly.";
  }, [datasetType, mean, median]);

  const score = quizQuestions.reduce((total, question, index) => {
    return selectedAnswers[index] === question.answer ? total + 1 : total;
  }, 0);

  return (
    <main className="min-h-screen bg-[#F7F3EA] px-5 py-8 text-[#141210] md:px-8 md:py-14">
      <style>{`
        @keyframes mentorFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes mentorBlink {
          0%, 92%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.12); }
        }

        @keyframes centrePulse {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.12); opacity: 1; }
        }

        @keyframes scanMove {
          0% { transform: translateX(-100%); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
      `}</style>

      <section className="mx-auto max-w-7xl">
        <a
          href="/courses/statistics-foundation/modules/descriptive-statistics/"
          className="text-sm font-black text-[#741018] hover:text-[#4d080e]"
        >
          ← Back to module
        </a>

        <section className="mt-8 overflow-hidden rounded-[2.5rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 md:p-10">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Statistics Foundation · Lesson 2.1
              </p>

              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-7xl">
                Measures of centre.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">
                Measures of centre describe where data tend to gather. In this
                lesson, students learn how the mean, median and mode represent
                different ideas of a typical value, why the mean is sensitive to
                outliers, why the median is safer for skewed data, and how to
                choose a centre that matches the variable and the shape of the
                distribution.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "90–100 minutes",
                  "No coding",
                  "Interactive centre lab",
                  "Mean vs median reasoning",
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
                Lesson pathway
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                From raw values to a meaningful typical value.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "List values",
                  "Order values",
                  "Calculate centre",
                  "Check shape",
                  "Check outliers",
                  "Choose summary",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-[1.25rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-4"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFFCF6] text-sm font-black text-[#141210]">
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
                90–100 minute lesson plan
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Learn how to describe a typical value carefully.
              </h2>

              <p className="mt-5 text-base leading-8 text-[#525252]">
                Descriptive statistics begins with summarising data. A measure
                of centre gives one number or category that represents where the
                data are located. But the word “typical” has more than one
                meaning. The mean, median and mode answer different questions.
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
                By the end, centre should feel like interpretation, not just arithmetic.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Explain what a measure of centre is trying to summarise.",
                  "Calculate and interpret the mean, median and mode.",
                  "Explain why the mean is sensitive to outliers.",
                  "Explain why the median is useful for skewed data.",
                  "Identify when the mode is the correct summary.",
                  "Choose the most appropriate centre for a real dataset.",
                  "Write a careful sentence interpreting the chosen centre.",
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
          <section className="mt-8 grid gap-6">
            <section className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
              <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Centre decision board
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  “Typical” can mean balance, middle or most common.
                </h2>

                <p className="mt-4 text-base leading-8 text-[#525252]">
                  A common mistake is to say “average” without explaining which
                  average is being used. In statistics, the mean, median and
                  mode all describe centre, but they do it in different ways.
                </p>

                <div className="mt-6 grid gap-4">
                  {lectureConcepts.map((item, index) => (
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
                  Guided lecture
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Mr. R explains why one centre is not always enough.
                </h2>

                <div className="mt-6 grid gap-4">
                  <Dialogue
                    speaker="Mr. R"
                    text="Today we are starting descriptive statistics. Our first question is simple but powerful: where is the centre of the data?"
                  />
                  <Dialogue
                    speaker="Amelia"
                    text="Is that just the average?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="It depends what you mean by average. Many people use average to mean the mean, but statistics gives us several measures of centre."
                  />
                  <Dialogue
                    speaker="Ben"
                    text="So the mean, median and mode are all averages?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="They are all measures of centre, but they answer different questions. The mean asks for a balancing point. The median asks for the middle position. The mode asks what occurs most often."
                  />
                  <Dialogue
                    speaker="Chloe"
                    text="Why do we need more than one?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Because data can be messy. If a dataset has an extreme value, the mean may move a lot. The median may stay closer to what most observations look like."
                  />
                  <Dialogue
                    speaker="Daniel"
                    text="So if we summarise salaries, the median might be better?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Exactly. A few very high salaries can pull the mean upward. The median often gives a better idea of the typical person’s salary."
                  />
                  <Dialogue
                    speaker="Amelia"
                    text="And the mode is for categories?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Yes. If we ask students their favourite learning format, the mean is meaningless. The most common category is the useful centre."
                  />
                </div>

                <section className="mt-8 rounded-[2rem] border border-[#741018]/20 bg-[#fff4ef] p-6">
                  <h3 className="text-2xl font-black tracking-[-0.04em] text-[#741018]">
                    Lecture takeaway
                  </h3>
                  <p className="mt-3 text-base leading-8 text-[#525252]">
                    The measure of centre should match the data. The mean is
                    useful for balanced numerical data, the median is safer for
                    skewed or outlier-affected data, and the mode is essential
                    for categorical or repeated-value data.
                  </p>
                </section>
              </section>
            </section>

            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Choosing the centre
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Ask the right question before calculating.
              </h2>

              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    question: "Is the variable categorical?",
                    method: "Use the mode",
                    reason:
                      "The most common category is meaningful. The mean is not meaningful for unordered labels.",
                  },
                  {
                    question: "Is the variable numerical and balanced?",
                    method: "Use the mean",
                    reason:
                      "When values are symmetric and there are no major outliers, the mean is usually informative.",
                  },
                  {
                    question: "Is the distribution skewed?",
                    method: "Use the median",
                    reason:
                      "The median is less affected by a long tail and often describes a typical observation better.",
                  },
                  {
                    question: "Are there extreme outliers?",
                    method: "Compare mean and median",
                    reason:
                      "A large gap between mean and median suggests that the mean may be distorted.",
                  },
                  {
                    question: "Do values have different importance?",
                    method: "Use a weighted mean",
                    reason:
                      "Weighted means are needed when components, groups or observations count unequally.",
                  },
                  {
                    question: "Are repeated values important?",
                    method: "Report the mode",
                    reason:
                      "The mode shows what value occurs most often, which may be useful alongside the mean or median.",
                  },
                  {
                    question: "Do you need a robust average?",
                    method: "Consider a trimmed mean",
                    reason:
                      "A trimmed mean reduces the influence of extreme tails while still acting like an average.",
                  },
                  {
                    question: "Will the audience understand it?",
                    method: "Interpret in context",
                    reason:
                      "A centre is useful only when it is explained clearly using the variable’s real-world meaning.",
                  },
                ].map((item) => (
                  <article
                    key={item.question}
                    className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
                      Ask
                    </p>
                    <h3 className="mt-2 text-lg font-black tracking-[-0.03em]">
                      {item.question}
                    </h3>
                    <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-[#7a7063]">
                      Suggested centre
                    </p>
                    <p className="mt-2 text-sm font-black leading-7 text-neutral-800">
                      {item.method}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#525252]">
                      {item.reason}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <section className="rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                  Mean
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                  The balancing point.
                </h2>

                <p className="mt-5 text-sm leading-7 text-white/70">
                  The mean uses every observation. This makes it powerful, but
                  also vulnerable. If a value changes from 60 to 600, the mean
                  changes even if every other observation stays the same.
                </p>

                <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5">
                  <p className="text-sm font-black text-white">
                    x̄ = Σxᵢ / n
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                    Add all values, then divide by the number of values.
                  </p>
                </div>
              </section>

              <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Median and mode
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                  The middle and the most common.
                </h2>

                <p className="mt-5 text-sm leading-7 text-[#525252]">
                  The median protects against extreme values because it depends
                  on position. The mode identifies the most common value or
                  category, making it the natural centre for categorical data.
                </p>

                <div className="mt-6 grid gap-3">
                  <div className="rounded-[1.25rem] border border-[#E4DED2] bg-[#F7F3EA] p-4 text-sm font-bold text-[#525252]">
                    Median: order values and find the middle.
                  </div>
                  <div className="rounded-[1.25rem] border border-[#E4DED2] bg-[#F7F3EA] p-4 text-sm font-bold text-[#525252]">
                    Mode: find the most frequent value or category.
                  </div>
                </div>
              </section>
            </section>
          </section>
        )}

        {activeTab === "Detailed Notes" && (
          <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
              Detailed notes
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Measures of centre in depth.
            </h2>

            <p className="mt-5 max-w-4xl text-base leading-8 text-[#525252]">
              A measure of centre summarises the location of a dataset. It
              tries to answer the question: where do the values tend to sit?
              This is useful because raw data can be long and difficult to
              interpret. However, no single summary can describe everything.
              Centre should always be interpreted alongside spread and shape.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {detailedNotes.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
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
                  <p className="mt-4 rounded-2xl bg-[#FFFCF6] px-4 py-3 text-sm font-bold leading-7 text-[#525252]">
                    Strength: {item.strength}
                  </p>
                  <p className="mt-3 rounded-2xl border border-[#741018]/20 bg-[#fff4ef] px-4 py-3 text-sm font-bold leading-7 text-[#741018]">
                    Limitation: {item.limitation}
                  </p>
                  <p className="mt-3 rounded-2xl bg-[#11100E] px-4 py-3 text-sm font-bold leading-7 text-white">
                    Best for: {item.bestFor}
                  </p>
                </article>
              ))}
            </div>

            <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                Interpretation rule
              </p>

              <h3 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                Do not report a centre without saying what it means.
              </h3>

              <p className="mt-4 text-sm leading-7 text-white/75">
                A good statistical sentence does three things: it names the
                measure, gives the value, and interprets it in context.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: "Weak",
                    body:
                      "The average is 62.",
                  },
                  {
                    title: "Better",
                    body:
                      "The mean score is 62 marks.",
                  },
                  {
                    title: "Strong",
                    body:
                      "The mean score is 62 marks, suggesting that the class performance balances around the low sixties.",
                  },
                ].map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[1.5rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5"
                  >
                    <h4 className="text-xl font-black">{item.title}</h4>
                    <p className="mt-3 text-sm leading-7 text-white/70">
                      {item.body}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018]">
                Comparison table
              </p>

              <h3 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                Which centre should you choose?
              </h3>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[780px] border-separate border-spacing-y-3 text-left">
                  <thead>
                    <tr className="text-xs uppercase tracking-[0.18em] text-[#7a7063]">
                      <th className="px-4">Situation</th>
                      <th className="px-4">Mean</th>
                      <th className="px-4">Median</th>
                      <th className="px-4">Mode</th>
                      <th className="px-4">Advice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {centreComparisons.map((row) => (
                      <tr key={row.situation} className="bg-[#FFFCF6]">
                        <td className="rounded-l-2xl px-4 py-4 text-sm font-black">
                          {row.situation}
                        </td>
                        <td className="px-4 py-4 text-sm text-[#525252]">
                          {row.mean}
                        </td>
                        <td className="px-4 py-4 text-sm text-[#525252]">
                          {row.median}
                        </td>
                        <td className="px-4 py-4 text-sm text-[#525252]">
                          {row.mode}
                        </td>
                        <td className="rounded-r-2xl px-4 py-4 text-sm leading-7 text-[#525252]">
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

        {activeTab === "Centre Lab" && (
          <section className="mt-8 grid gap-6">
            <section className="overflow-hidden rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="p-6 md:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                    Interactive centre lab
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    Watch how centre changes when data shape changes.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-[#525252]">
                    Select a dataset shape and adjust the sliders. The lab shows
                    how the mean, median, mode and trimmed mean respond. The aim
                    is to see why the choice of centre depends on the data, not
                    habit.
                  </p>

                  <div className="mt-6">
                    <label className="block">
                      <span className="text-sm font-black text-[#525252]">
                        Dataset shape
                      </span>
                      <select
                        value={datasetType}
                        onChange={(event) => setDatasetType(event.target.value)}
                        className="mt-3 w-full rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] px-4 py-3 text-sm font-bold text-neutral-800"
                      >
                        <option value="balanced">Balanced numerical data</option>
                        <option value="right-skewed">Right-skewed data</option>
                        <option value="left-skewed">Left-skewed data</option>
                        <option value="repeated">Repeated values</option>
                      </select>
                    </label>
                  </div>

                  <div className="mt-6 grid gap-5">
                    <Slider
                      label="Extreme value strength"
                      value={outlierSize}
                      min={65}
                      max={150}
                      onChange={setOutlierSize}
                    />
                    <Slider
                      label="Repeated value count"
                      value={repetition}
                      min={1}
                      max={10}
                      onChange={setRepetition}
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
                    <Metric label="Mean" value={mean.toFixed(1)} />
                    <Metric label="Median" value={median.toFixed(1)} />
                    <Metric label="Mode" value={mode} />
                    <Metric label="Trimmed mean" value={trimmedMean.toFixed(1)} />
                  </div>
                </div>

                <div className="border-t border-[#E4DED2] bg-[#11100E] p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                    Interpretation panel
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    Which centre tells the fairest story?
                  </h2>

                  <p className="mt-6 text-lg leading-9 text-white/80">
                    {labAdvice}
                  </p>

                  <div className="mt-8 rounded-[2rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                      Current data
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/75">
                      {sortedValues.join(", ")}
                    </p>
                  </div>

                  <div className="mt-6 rounded-[2rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                      Mean-median gap
                    </p>
                    <p className="mt-3 text-4xl font-black tracking-[-0.05em]">
                      {Math.abs(mean - median).toFixed(1)}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/70">
                      A larger gap often suggests skewness or the influence of
                      unusual values.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Visual data strip
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                  The dots show the data, the lines show the centres.
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#525252]">
                  Each dot represents one observation. The vertical markers
                  show where the mean and median fall on the same scale.
                </p>

                <div className="mt-6 rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
                  <div className="relative h-28 rounded-[1.5rem] bg-[#FFFCF6] p-4">
                    <div className="absolute left-4 right-4 top-1/2 h-1 rounded-full bg-neutral-200" />

                    {labValues.map((value, index) => {
                      const left = Math.max(2, Math.min(96, (value / 160) * 100));

                      return (
                        <div
                          key={`${value}-${index}`}
                          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#11100E]"
                          style={{
                            left: `${left}%`,
                            animation:
                              value === median
                                ? "centrePulse 2.4s ease-in-out infinite"
                                : undefined,
                          }}
                        />
                      );
                    })}

                    <div
                      className="absolute top-3 h-[88px] w-1 rounded-full bg-[#741018]"
                      style={{ left: `${Math.max(2, Math.min(96, (mean / 160) * 100))}%` }}
                    />
                    <div
                      className="absolute top-3 h-[88px] w-1 rounded-full bg-neutral-500"
                      style={{ left: `${Math.max(2, Math.min(96, (median / 160) * 100))}%` }}
                    />
                  </div>

                  <div className="mt-5 grid gap-3 text-sm leading-7 text-[#525252] md:grid-cols-2">
                    <div className="rounded-2xl bg-[#FFFCF6] p-4">
                      <strong>Red marker:</strong> mean.
                    </div>
                    <div className="rounded-2xl bg-[#FFFCF6] p-4">
                      <strong>Grey marker:</strong> median.
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Bar summary
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                  Compare the centre values.
                </h2>

                <div className="mt-6 grid gap-4">
                  <Bar label="Mean" value={mean} max={160} />
                  <Bar label="Median" value={median} max={160} />
                  <Bar
                    label="Trimmed mean"
                    value={trimmedMean}
                    max={160}
                  />
                </div>

                <section className="mt-6 rounded-[1.5rem] border border-[#741018]/20 bg-[#fff4ef] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
                    Write this conclusion
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#525252]">
                    “The mean is <strong>{mean.toFixed(1)}</strong> and the
                    median is <strong>{median.toFixed(1)}</strong>. Because
                    these values are {Math.abs(mean - median) > 8 ? "quite different" : "fairly close"},
                    the dataset appears{" "}
                    {Math.abs(mean - median) > 8
                      ? "affected by skewness or unusual values."
                      : "reasonably balanced around its centre."}
                    ”
                  </p>
                </section>
              </section>
            </section>
          </section>
        )}

        {activeTab === "Animated Mentor" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Animated mentor
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Ask Mr. R about centre.
              </h2>

              <div className="mt-8 flex justify-center">
                <div
                  className="relative flex h-52 w-52 items-center justify-center rounded-full border border-[#E4DED2] bg-[#F7F3EA]"
                  style={{ animation: "mentorFloat 3s ease-in-out infinite" }}
                >
                  <div className="absolute top-9 h-20 w-20 rounded-full bg-[#11100E]" />
                  <div className="absolute top-16 flex gap-5">
                    <span
                      className="h-3 w-3 rounded-full bg-[#FFFCF6]"
                      style={{ animation: "mentorBlink 4s infinite" }}
                    />
                    <span
                      className="h-3 w-3 rounded-full bg-[#FFFCF6]"
                      style={{ animation: "mentorBlink 4s infinite" }}
                    />
                  </div>
                  <div className="absolute top-28 h-20 w-32 rounded-t-[3rem] bg-[#741018]" />
                  <div className="absolute bottom-8 rounded-full bg-[#FFFCF6] px-4 py-2 text-sm font-black text-[#141210]">
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
                        ? "border-[#741018] bg-[#741018] text-white"
                        : "border-[#E4DED2] bg-[#F7F3EA] text-[#525252] hover:bg-[#FFFCF6]"
                    }`}
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            </section>

            <section className="relative overflow-hidden rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white shadow-sm md:p-8">
              <div className="absolute left-0 top-0 h-1 w-full overflow-hidden bg-[#FFFCF6]/10">
                <div
                  className="h-full w-1/2 bg-[#FFFCF6]/40"
                  style={{ animation: "scanMove 2.8s linear infinite" }}
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

              <div className="mt-8 rounded-[2rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                  Mentor challenge
                </p>
                <p className="mt-3 text-sm leading-7 text-white/75">
                  Take a small dataset from your own life, such as study hours,
                  sleep time or weekly spending. Calculate the mean and median.
                  Then explain which one gives the more honest typical value.
                </p>
              </div>
            </section>
          </section>
        )}

        {activeTab === "Worked Examples" && (
          <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
              Worked examples
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Choose and justify a measure of centre.
            </h2>

            <div className="mt-6 flex flex-wrap gap-2">
              {scenarios.map((scenario, index) => (
                <button
                  key={scenario.title}
                  type="button"
                  onClick={() => setScenarioIndex(index)}
                  className={`rounded-full px-4 py-2 text-sm font-black transition ${
                    scenarioIndex === index
                      ? "bg-[#11100E] text-white"
                      : "border border-[#E4DED2] bg-[#F7F3EA] text-[#525252]"
                  }`}
                >
                  {scenario.title}
                </button>
              ))}
            </div>

            <article className="mt-6 rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-6">
              <h3 className="text-3xl font-black tracking-[-0.045em]">
                {activeScenario.title}
              </h3>

              <p className="mt-4 max-w-4xl text-base leading-8 text-[#525252]">
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
          <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
              Practice studio
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Practise choosing the correct centre.
            </h2>

            <div className="mt-8 grid gap-5">
              {[
                {
                  task:
                    "A company reports the mean salary, but most employees earn far below it because a few executives earn very high salaries. Explain why the median may be better.",
                  hint:
                    "Think about right skewness and the effect of extreme high values.",
                },
                {
                  task:
                    "A teacher records scores: 48, 51, 52, 53, 55, 56, 58. Calculate the mean and median. Are they close?",
                  hint:
                    "Balanced data usually give similar mean and median values.",
                },
                {
                  task:
                    "A survey asks students to choose their favourite study method: flashcards, videos, notes or past papers. Which measure of centre should be used?",
                  hint:
                    "The data are categorical, so think about the most common category.",
                },
                {
                  task:
                    "A clinic reports mean waiting time, but one patient waited unusually long because of an emergency. What extra summary should be reported?",
                  hint:
                    "Compare the mean with the median to show whether the typical wait is distorted.",
                },
                {
                  task:
                    "A final grade is based on coursework worth 40% and an exam worth 60%. Explain why a weighted mean is needed.",
                  hint:
                    "The two components do not contribute equally.",
                },
              ].map((item, index) => (
                <article
                  key={item.task}
                  className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
                >
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
                    Practice task {index + 1}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#525252]">
                    {item.task}
                  </p>
                  <p className="mt-4 rounded-2xl bg-[#FFFCF6] px-4 py-3 text-sm font-bold leading-7 text-[#525252]">
                    Hint: {item.hint}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Reflection" && (
          <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
              Reflection task
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Write a careful centre interpretation.
            </h2>

            <div className="mt-8 grid gap-5">
              {[
                "Explain why the word average can be unclear unless the measure is named.",
                "Describe a dataset where the mean would be a good summary of centre.",
                "Describe a dataset where the median would be better than the mean.",
                "Explain why the mode is the correct centre for categorical data.",
                "Write one sentence interpreting the median house price in a skewed housing market.",
              ].map((item, index) => (
                <article
                  key={item}
                  className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
                >
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
                    Prompt {index + 1}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#525252]">
                    {item}
                  </p>
                </article>
              ))}
            </div>

            <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                Model answer structure
              </p>
              <p className="mt-4 text-base leading-8 text-white/75">
                “The most appropriate measure of centre is _____ because the
                variable is _____ and the distribution is _____. The value means
                that a typical _____ is approximately _____.”
              </p>
            </section>
          </section>
        )}

        {activeTab === "Quiz" && (
          <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Quiz
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Check your understanding.
                </h2>
              </div>

              <div className="rounded-full bg-[#11100E] px-5 py-3 text-sm font-black text-white">
                Score: {score}/{quizQuestions.length}
              </div>
            </div>

            <div className="mt-8 grid gap-5">
              {quizQuestions.map((question, questionIndex) => (
                <article
                  key={question.question}
                  className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
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
                                : "border-[#E4DED2] bg-[#FFFCF6] text-[#525252] hover:bg-neutral-50"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  {selectedAnswers[questionIndex] !== undefined ? (
                    <p className="mt-4 rounded-2xl bg-[#FFFCF6] px-4 py-3 text-sm leading-7 text-[#525252]">
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
          ? "border-[#741018]/20 bg-[#fff4ef]"
          : "border-[#E4DED2] bg-[#F7F3EA]"
      }`}
    >
      <p className="text-sm font-black text-[#741018]">{speaker}</p>
      <p className="mt-2 text-base leading-8 text-[#525252]">{text}</p>
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
        <span className="text-sm font-black text-[#525252]">{label}</span>
        <span className="rounded-full bg-[#11100E] px-3 py-1 text-xs font-black text-white">
          {value}
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
    <div className="rounded-[1.25rem] border border-[#E4DED2] bg-[#F7F3EA] p-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#7a7063]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-black tracking-[-0.04em]">{value}</p>
    </div>
  );
}

function AnswerCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[1.25rem] border border-[#E4DED2] bg-[#FFFCF6] p-5">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
        {title}
      </p>
      <p className="mt-3 text-sm leading-7 text-[#525252]">{body}</p>
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
        <p className="text-sm font-black text-[#525252]">{label}</p>
        <p className="rounded-full bg-[#11100E] px-3 py-1 text-xs font-black text-white">
          {value.toFixed(1)}
        </p>
      </div>
      <div className="mt-2 h-4 overflow-hidden rounded-full bg-[#F7F3EA]">
        <div
          className="h-full rounded-full bg-[#741018]"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
