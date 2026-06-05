"use client";

import LockedLessonGate from "@/components/course/LockedLessonGate";
import { isStatisticsFoundationLessonOpen } from "@/lib/statisticsFoundationAccess";


import { useMemo, useState } from "react";

const tabs = [
  "Learning Route",
  "Lecture",
  "Detailed Notes",
  "Shape Lab",
  "Animated Mentor",
  "Worked Examples",
  "Practice Studio",
  "Reflection",
  "Quiz",
];

const learningRoute = [
  {
    time: "0–10 min",
    title: "Why shape matters",
    body:
      "Understand that centre and spread are not enough. The overall shape tells us whether data are balanced, skewed, clustered or affected by unusual values.",
  },
  {
    time: "10–25 min",
    title: "Symmetry and skewness",
    body:
      "Learn how symmetric, right-skewed and left-skewed distributions differ, and how the mean and median respond to skewness.",
  },
  {
    time: "25–40 min",
    title: "Tails and unusual values",
    body:
      "Study how long tails, heavy tails and extreme observations influence descriptive summaries.",
  },
  {
    time: "40–60 min",
    title: "Outlier detection",
    body:
      "Use context, graphs and the 1.5 × IQR rule to flag possible outliers without automatically deleting them.",
  },
  {
    time: "60–85 min",
    title: "Interactive shape lab",
    body:
      "Adjust skewness, tail length, clusters and outlier strength to see how the mean, median, IQR and boxplot change.",
  },
  {
    time: "85–105 min",
    title: "Careful interpretation",
    body:
      "Practise describing shape in realistic examples such as income, waiting times, exam scores and clinical measurements.",
  },
];

const lectureConcepts = [
  {
    title: "Shape describes the pattern of the whole distribution",
    body:
      "Centre gives a location and spread gives variability, but shape tells us how values are arranged across the scale.",
    example:
      "Two datasets can have the same mean and standard deviation but one may be symmetric while the other has two clusters.",
  },
  {
    title: "Symmetric data are balanced",
    body:
      "A symmetric distribution has roughly similar left and right sides. The mean and median are usually close together.",
    example:
      "Repeated measurements from a stable process may form a roughly balanced pattern around the centre.",
  },
  {
    title: "Right skew means a long upper tail",
    body:
      "A right-skewed distribution has most values lower down, with a smaller number of large values stretching the tail to the right.",
    example:
      "Income, hospital waiting time and house prices are often right-skewed.",
  },
  {
    title: "Left skew means a long lower tail",
    body:
      "A left-skewed distribution has most values higher up, with a smaller number of low values stretching the tail to the left.",
    example:
      "An easy exam can produce many high scores with a few low scores, creating left skew.",
  },
  {
    title: "Outliers need investigation, not automatic removal",
    body:
      "An outlier may be a data error, a rare but real observation, or an important signal. It should be checked carefully before any decision is made.",
    example:
      "A very high blood pressure reading may be a measurement error, but it could also indicate a genuine clinical concern.",
  },
];

const notes = [
  {
    title: "Distribution shape",
    formula: "Shape = pattern of values across the scale",
    body:
      "The shape of a distribution describes how observations are arranged. We look for symmetry, skewness, tails, clusters, gaps and unusual observations. Shape helps us decide whether the mean and standard deviation are appropriate or whether robust summaries are safer.",
    strength:
      "It gives context to centre and spread.",
    limitation:
      "Shape often needs a graph; one number rarely captures it fully.",
    bestFor:
      "Choosing appropriate summaries and writing careful interpretations.",
  },
  {
    title: "Symmetry",
    formula: "Mean ≈ Median",
    body:
      "A distribution is approximately symmetric when the left and right sides look balanced around the centre. In such cases, the mean and median are usually similar.",
    strength:
      "Symmetric data are often easy to summarise using mean and standard deviation.",
    limitation:
      "Perfect symmetry is rare in real data, so judgement is needed.",
    bestFor:
      "Exam scores, repeated measurements or controlled process data when no strong skew is present.",
  },
  {
    title: "Right skew",
    formula: "Mean > Median in many right-skewed datasets",
    body:
      "Right skew occurs when a distribution has a long tail toward larger values. A few large observations pull the mean upward, often making the mean larger than the median.",
    strength:
      "Identifying right skew prevents overinterpreting the mean as typical.",
    limitation:
      "The mean-median relationship is a guide, not an absolute rule for every dataset.",
    bestFor:
      "Income, waiting times, length of hospital stay and house prices.",
  },
  {
    title: "Left skew",
    formula: "Mean < Median in many left-skewed datasets",
    body:
      "Left skew occurs when a distribution has a long tail toward smaller values. A few small observations pull the mean downward.",
    strength:
      "It helps explain why the mean may sit below the typical high values.",
    limitation:
      "Left skew can be less common in some everyday examples, so context matters.",
    bestFor:
      "High-scoring tests, age at retirement in a selected group or ceiling-limited measurements.",
  },
  {
    title: "Modality",
    formula: "Mode count = number of peaks",
    body:
      "Modality describes the number of peaks or clusters in a distribution. A unimodal distribution has one main peak. A bimodal distribution has two. Multiple peaks may suggest that different groups are mixed together.",
    strength:
      "It can reveal hidden subgroups.",
    limitation:
      "Numerical summaries may hide modality unless a graph is used.",
    bestFor:
      "Comparing mixed populations, such as combining beginners and advanced students.",
  },
  {
    title: "Outliers",
    formula: "Possible outlier if value < Q1 − 1.5 × IQR or value > Q3 + 1.5 × IQR",
    body:
      "Outliers are observations that sit unusually far from the main body of the data. The 1.5 × IQR rule is a common descriptive method for flagging possible outliers.",
    strength:
      "It gives a systematic starting point for identifying unusual observations.",
    limitation:
      "It does not prove a value is wrong. Outliers require context and investigation.",
    bestFor:
      "Data screening, boxplots and checking the influence of extreme values.",
  },
];

const comparisonRows = [
  {
    shape: "Symmetric",
    meanMedian: "Mean and median usually close",
    summary: "Mean and standard deviation often suitable",
    warning:
      "Still check for clusters, gaps or unusual values.",
  },
  {
    shape: "Right-skewed",
    meanMedian: "Mean often greater than median",
    summary: "Median and IQR often safer",
    warning:
      "The mean may exaggerate the typical value.",
  },
  {
    shape: "Left-skewed",
    meanMedian: "Mean often less than median",
    summary: "Median and IQR often useful",
    warning:
      "A few low values may pull the mean downward.",
  },
  {
    shape: "Bimodal",
    meanMedian: "Mean and median may hide two groups",
    summary: "Use graphs and group-specific summaries",
    warning:
      "A single centre may be misleading.",
  },
  {
    shape: "Outlier-affected",
    meanMedian: "Mean may shift strongly",
    summary: "Compare mean/SD with median/IQR",
    warning:
      "Investigate outliers before removing them.",
  },
];

const scenarios = [
  {
    title: "Income data",
    question:
      "A city income dataset has many moderate incomes and a few extremely high incomes. What shape is likely, and what summaries should be used?",
    answer:
      "The distribution is likely right-skewed. The median and IQR are usually safer than the mean and standard deviation.",
    working:
      "A few very high incomes stretch the upper tail and pull the mean upward.",
    caution:
      "The mean income may sound higher than what a typical resident earns.",
  },
  {
    title: "Easy exam",
    question:
      "An exam is very easy. Most students score between 80 and 100, but a few score much lower. What shape might appear?",
    answer:
      "The distribution may be left-skewed because the tail stretches toward lower scores.",
    working:
      "Most values are high, while a small number of low scores pull the lower tail left.",
    caution:
      "The mean may be lower than the median because of the few low scores.",
  },
  {
    title: "Mixed ability class",
    question:
      "A test combines beginners and advanced students. Scores cluster around 40 and 85. What issue appears?",
    answer:
      "The distribution is likely bimodal, meaning there are two peaks or clusters.",
    working:
      "One centre may not represent either group well. Separate group summaries may be more meaningful.",
    caution:
      "A single mean could sit between the two clusters and describe almost nobody.",
  },
  {
    title: "Clinical measurement",
    question:
      "A dataset contains one extremely high blood pressure reading. Should it be deleted?",
    answer:
      "No. It should be investigated first. It may be a recording error, measurement problem or genuine clinical signal.",
    working:
      "Outlier checks can flag the value, but context is needed before deciding what to do.",
    caution:
      "Automatic deletion can remove important information and bias the analysis.",
  },
];

const mentorTopics = [
  {
    id: "symmetry",
    label: "Symmetry",
    answer:
      "A symmetric distribution is roughly balanced on both sides. The mean and median are usually close, so mean and standard deviation may be suitable.",
  },
  {
    id: "right",
    label: "Right skew",
    answer:
      "Right skew means the tail stretches toward larger values. A few large observations can pull the mean above the median.",
  },
  {
    id: "left",
    label: "Left skew",
    answer:
      "Left skew means the tail stretches toward smaller values. A few small observations can pull the mean below the median.",
  },
  {
    id: "bimodal",
    label: "Bimodal data",
    answer:
      "Bimodal data have two peaks or clusters. This may mean two groups have been mixed together, so one centre may be misleading.",
  },
  {
    id: "outlier",
    label: "Outliers",
    answer:
      "Outliers are unusual observations. They should be checked carefully because they may be errors, rare genuine values or important signals.",
  },
];

const quizQuestions = [
  {
    question: "In a right-skewed distribution, where is the long tail?",
    options: ["Toward smaller values", "Toward larger values", "Exactly in the middle", "There is no tail"],
    answer: 1,
    feedback:
      "Right skew means the long tail stretches toward larger values.",
  },
  {
    question: "Which summaries are often safer for skewed data?",
    options: [
      "Mean and standard deviation only",
      "Median and IQR",
      "Mode and range only",
      "Maximum and mean only",
    ],
    answer: 1,
    feedback:
      "Median and IQR are robust summaries that are less affected by skewness and outliers.",
  },
  {
    question: "What does bimodal mean?",
    options: [
      "The data have two peaks or clusters.",
      "The data have no values.",
      "The mean equals the median.",
      "The range is zero.",
    ],
    answer: 0,
    feedback:
      "Bimodal data have two main peaks or clusters.",
  },
  {
    question: "What is the upper outlier fence using the 1.5 × IQR rule?",
    options: [
      "Q1 − 1.5 × IQR",
      "Q3 + 1.5 × IQR",
      "Mean + median",
      "Maximum − minimum",
    ],
    answer: 1,
    feedback:
      "The upper outlier fence is Q3 + 1.5 × IQR.",
  },
  {
    question: "Why should outliers not be automatically deleted?",
    options: [
      "They are always correct.",
      "They are always errors.",
      "They may be errors, rare genuine values or important signals.",
      "They do not affect any statistic.",
    ],
    answer: 2,
    feedback:
      "Outliers need investigation before any decision is made.",
  },
  {
    question: "In many right-skewed datasets, what often happens to the mean?",
    options: [
      "It is pulled upward above the median.",
      "It is always zero.",
      "It disappears.",
      "It is always smaller than the minimum.",
    ],
    answer: 0,
    feedback:
      "Large values in the right tail often pull the mean upward.",
  },
];

export default function ShapeSkewnessOutliersLesson() {
  const lessonCode = "2.4";

  if (!isStatisticsFoundationLessonOpen(lessonCode)) {
    return (
      <LockedLessonGate
        lessonCode={lessonCode}
        lessonTitle="Shape, skewness and outliers"
        moduleTitle="Module 2: Descriptive Statistics"
      />
    );
  }

  const [activeTab, setActiveTab] = useState("Learning Route");
  const [shapeType, setShapeType] = useState("symmetric");
  const [tailStrength, setTailStrength] = useState(85);
  const [spread, setSpread] = useState(9);
  const [sampleSize, setSampleSize] = useState(17);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [mentorTopic, setMentorTopic] = useState("symmetry");
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(
    {},
  );

  const activeScenario = scenarios[scenarioIndex];
  const activeMentor =
    mentorTopics.find((topic) => topic.id === mentorTopic) ?? mentorTopics[0];

  const values = useMemo(() => {
    const centre = 55;
    let data: number[] = [];

    if (shapeType === "symmetric") {
      data = Array.from({ length: sampleSize }, (_, index) => {
        const offset = index - Math.floor(sampleSize / 2);
        return Math.round(centre + offset * (spread / 5));
      });
    }

    if (shapeType === "right-skewed") {
      data = Array.from({ length: sampleSize - 2 }, (_, index) =>
        Math.round(32 + index * 1.7),
      );
      data.push(Math.round(tailStrength), Math.round(tailStrength + 18));
    }

    if (shapeType === "left-skewed") {
      data = [
        Math.max(2, 115 - tailStrength - 18),
        Math.max(4, 115 - tailStrength),
        ...Array.from({ length: sampleSize - 2 }, (_, index) =>
          Math.round(58 + index * 1.7),
        ),
      ];
    }

    if (shapeType === "bimodal") {
      const lower = Math.floor(sampleSize / 2);
      const upper = sampleSize - lower;

      data = [
        ...Array.from({ length: lower }, (_, index) =>
          Math.round(36 + index * 1.5),
        ),
        ...Array.from({ length: upper }, (_, index) =>
          Math.round(74 + index * 1.5),
        ),
      ];
    }

    if (shapeType === "outlier") {
      data = Array.from({ length: sampleSize - 1 }, (_, index) => {
        const offset = index - Math.floor((sampleSize - 1) / 2);
        return Math.round(centre + offset * 1.4);
      });
      data.push(tailStrength + 28);
    }

    return data.sort((a, b) => a - b);
  }, [sampleSize, shapeType, spread, tailStrength]);

  const mean = useMemo(() => {
    return values.reduce((total, value) => total + value, 0) / values.length;
  }, [values]);

  const median = useMemo(() => medianOf(values), [values]);
  const lowerHalf = values.slice(0, Math.floor(values.length / 2));
  const upperHalf = values.slice(Math.ceil(values.length / 2));
  const q1 = medianOf(lowerHalf);
  const q3 = medianOf(upperHalf);
  const iqr = q3 - q1;
  const minimum = values[0];
  const maximum = values[values.length - 1];
  const range = maximum - minimum;
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;
  const flaggedOutliers = values.filter(
    (value) => value < lowerFence || value > upperFence,
  );

  const sd = useMemo(() => {
    const variance =
      values.reduce((total, value) => total + (value - mean) ** 2, 0) /
      (values.length - 1);

    return Math.sqrt(variance);
  }, [mean, values]);

  const shapeAdvice = useMemo(() => {
    if (shapeType === "symmetric") {
      return "The distribution is roughly balanced. The mean and median are close, so mean and standard deviation may be suitable.";
    }

    if (shapeType === "right-skewed") {
      return "The distribution has a long upper tail. The mean is pulled upward, so the median and IQR give a safer typical summary.";
    }

    if (shapeType === "left-skewed") {
      return "The distribution has a long lower tail. The mean is pulled downward, so compare it with the median before interpreting.";
    }

    if (shapeType === "bimodal") {
      return "The distribution has two clusters. A single centre may hide the fact that two groups are mixed together.";
    }

    return "An extreme value is affecting the summaries. Investigate the outlier and compare mean/SD with median/IQR.";
  }, [shapeType]);

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

        @keyframes dotPulse {
          0%, 100% { transform: scale(1); opacity: 0.86; }
          50% { transform: scale(1.22); opacity: 1; }
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
          className="text-sm font-black text-[#741018] hover:text-[#4d080e]"
        >
          ← Back to module
        </a>

        <section className="mt-8 overflow-hidden rounded-[2.5rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 md:p-10">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Statistics Foundation · Lesson 2.4
              </p>

              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-7xl">
                Shape, skewness and outliers.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">
                Shape describes the full pattern of a distribution. This lesson
                teaches students how to recognise symmetry, right skew, left
                skew, long tails, clusters and outliers, then decide whether
                mean/standard deviation or median/IQR gives the more honest
                description.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "100–105 minutes",
                  "No coding",
                  "Shape visual lab",
                  "Outlier reasoning",
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
                From summaries to distribution shape.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Check graph",
                  "Compare mean/median",
                  "Inspect tails",
                  "Look for clusters",
                  "Flag outliers",
                  "Report carefully",
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
                100–105 minute lesson plan
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Learn how to describe the whole distribution, not just one number.
              </h2>

              <p className="mt-5 text-base leading-8 text-[#525252]">
                Centre, spread and quartiles are powerful, but they can still
                hide important patterns. Shape helps us decide whether a summary
                is honest. A graph can reveal skewness, clusters and outliers
                that a single number may miss.
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
                By the end, you should be able to diagnose the shape of a dataset.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Explain why shape matters beyond centre and spread.",
                  "Recognise symmetric, right-skewed and left-skewed distributions.",
                  "Explain how skewness affects the mean and median.",
                  "Identify long tails, heavy tails, clusters and gaps.",
                  "Use IQR fences to flag possible outliers.",
                  "Explain why outliers should be investigated before removal.",
                  "Choose summaries that match distribution shape.",
                  "Write careful interpretations of shape in context.",
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
                  Shape decision board
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  The shape tells us whether our summaries can be trusted.
                </h2>

                <p className="mt-4 text-base leading-8 text-[#525252]">
                  A mean can look simple, a median can look stable and a
                  standard deviation can look precise. But without shape, we may
                  miss skewness, multiple clusters or unusual observations.
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
                  Mr. R explains why graphs come before judgement.
                </h2>

                <div className="mt-6 grid gap-4">
                  <Dialogue
                    speaker="Mr. R"
                    text="We have learned centre, spread, quartiles and boxplots. Today we ask: what is the overall shape of the data?"
                  />
                  <Dialogue
                    speaker="Amelia"
                    text="Is shape just whether the graph looks balanced?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Balance is one part. We also look for skewness, long tails, clusters, gaps and outliers."
                  />
                  <Dialogue
                    speaker="Ben"
                    text="If data are right-skewed, does the mean move to the right?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Usually, yes. A few large values pull the mean upward, often above the median."
                  />
                  <Dialogue
                    speaker="Chloe"
                    text="So for skewed data, median and IQR are safer?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Exactly. Median and IQR focus on position and the middle 50%, so they resist extreme tails."
                  />
                  <Dialogue
                    speaker="Daniel"
                    text="What if there are two clusters?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Then one centre may be misleading. Two clusters may mean two groups are mixed together, so we should investigate them separately."
                  />
                  <Dialogue
                    speaker="Amelia"
                    text="And outliers should not be deleted straight away?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Correct. An outlier is a question, not an automatic mistake. It asks us to check measurement, data entry and context."
                  />
                </div>

                <section className="mt-8 rounded-[2rem] border border-[#741018]/20 bg-[#fff4ef] p-6">
                  <h3 className="text-2xl font-black tracking-[-0.04em] text-[#741018]">
                    Lecture takeaway
                  </h3>
                  <p className="mt-3 text-base leading-8 text-[#525252]">
                    Shape controls interpretation. Symmetric data can often be
                    described by mean and standard deviation. Skewed or
                    outlier-affected data often need median and IQR. Clustered
                    data may need separate group summaries.
                  </p>
                </section>
              </section>
            </section>

            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Shape interpretation pathway
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Diagnose shape in six questions.
              </h2>

              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    question: "Is the graph roughly balanced?",
                    reason:
                      "If yes, the data may be approximately symmetric.",
                  },
                  {
                    question: "Which tail is longer?",
                    reason:
                      "A longer right tail suggests right skew; a longer left tail suggests left skew.",
                  },
                  {
                    question: "Are mean and median far apart?",
                    reason:
                      "A large gap may signal skewness or influential outliers.",
                  },
                  {
                    question: "Are there two or more peaks?",
                    reason:
                      "Multiple peaks may indicate mixed subgroups.",
                  },
                  {
                    question: "Are any values far away?",
                    reason:
                      "Use graphs and IQR fences to flag possible outliers.",
                  },
                  {
                    question: "Which summary is honest?",
                    reason:
                      "Match mean/SD or median/IQR to the shape.",
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
                    <p className="mt-3 text-sm leading-7 text-[#525252]">
                      {item.reason}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </section>
        )}

        {activeTab === "Detailed Notes" && (
          <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
              Detailed notes
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Shape, skewness and outliers in depth.
            </h2>

            <p className="mt-5 max-w-4xl text-base leading-8 text-[#525252]">
              Shape is the visual and structural pattern of a dataset. It tells
              us whether the data are balanced, stretched, clustered or affected
              by unusual observations. Shape helps us decide which numerical
              summaries are appropriate and how cautious our interpretation
              should be.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {notes.map((item) => (
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
                Important distinction
              </p>

              <h3 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                Outlier does not mean error.
              </h3>

              <p className="mt-4 text-sm leading-7 text-white/75">
                A flagged outlier is an observation that deserves attention. It
                may be a data entry error, a measurement problem, a rare genuine
                case, or an important signal. Removing it without explanation is
                poor statistical practice. The correct first response is to
                investigate.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: "Check",
                    body:
                      "Was the value entered or measured correctly?",
                  },
                  {
                    title: "Context",
                    body:
                      "Could the value be genuine in this population?",
                  },
                  {
                    title: "Report",
                    body:
                      "Explain how conclusions change with and without the value if needed.",
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
                How shape changes the best summary.
              </h3>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[760px] border-separate border-spacing-y-3 text-left">
                  <thead>
                    <tr className="text-xs uppercase tracking-[0.18em] text-[#7a7063]">
                      <th className="px-4">Shape</th>
                      <th className="px-4">Mean vs median</th>
                      <th className="px-4">Useful summary</th>
                      <th className="px-4">Warning</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr key={row.shape} className="bg-[#FFFCF6]">
                        <td className="rounded-l-2xl px-4 py-4 text-sm font-black">
                          {row.shape}
                        </td>
                        <td className="px-4 py-4 text-sm text-[#525252]">
                          {row.meanMedian}
                        </td>
                        <td className="px-4 py-4 text-sm text-[#525252]">
                          {row.summary}
                        </td>
                        <td className="rounded-r-2xl px-4 py-4 text-sm leading-7 text-[#525252]">
                          {row.warning}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        )}

        {activeTab === "Shape Lab" && (
          <section className="mt-8 grid gap-6">
            <section className="overflow-hidden rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="p-6 md:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                    Interactive shape lab
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    Change the shape and watch the summaries move.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-[#525252]">
                    Choose a shape and adjust the sliders. Notice how skewness,
                    clusters and outliers affect the mean, median, standard
                    deviation and IQR differently.
                  </p>

                  <div className="mt-6">
                    <label className="block">
                      <span className="text-sm font-black text-[#525252]">
                        Distribution shape
                      </span>
                      <select
                        value={shapeType}
                        onChange={(event) => setShapeType(event.target.value)}
                        className="mt-3 w-full rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] px-4 py-3 text-sm font-bold text-neutral-800"
                      >
                        <option value="symmetric">Symmetric</option>
                        <option value="right-skewed">Right-skewed</option>
                        <option value="left-skewed">Left-skewed</option>
                        <option value="bimodal">Bimodal</option>
                        <option value="outlier">Outlier-affected</option>
                      </select>
                    </label>
                  </div>

                  <div className="mt-6 grid gap-5">
                    <Slider
                      label="Tail / outlier strength"
                      value={tailStrength}
                      min={65}
                      max={140}
                      onChange={setTailStrength}
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
                      max={25}
                      onChange={setSampleSize}
                    />
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <Metric label="Mean" value={mean.toFixed(1)} />
                    <Metric label="Median" value={median.toFixed(1)} />
                    <Metric label="SD" value={sd.toFixed(1)} />
                    <Metric label="IQR" value={iqr.toFixed(1)} />
                  </div>
                </div>

                <div className="border-t border-[#E4DED2] bg-[#11100E] p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                    Interpretation panel
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    What does the shape suggest?
                  </h2>

                  <p className="mt-6 text-lg leading-9 text-white/80">
                    {shapeAdvice}
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    <MetricDark label="Minimum" value={minimum.toFixed(1)} />
                    <MetricDark label="Maximum" value={maximum.toFixed(1)} />
                    <MetricDark label="Range" value={range.toFixed(1)} />
                    <MetricDark
                      label="Flagged outliers"
                      value={
                        flaggedOutliers.length > 0
                          ? flaggedOutliers.join(", ")
                          : "None"
                      }
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Shape visual
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                  Dots reveal what summaries can hide.
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#525252]">
                  The dot strip shows the ordered data. The red marker is the
                  mean and the grey marker is the median. When they separate,
                  shape may be affecting interpretation.
                </p>

                <div className="mt-6 rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
                  <div className="relative h-40 rounded-[1.5rem] bg-[#FFFCF6] p-4">
                    <div className="absolute left-4 right-4 top-1/2 h-1 rounded-full bg-neutral-200" />

                    <div
                      className="absolute top-[42%] h-8 rounded-xl border-2 border-[#741018] bg-[#741018]/10"
                      style={{
                        left: `${scaleToPercent(q1)}%`,
                        width: `${Math.max(
                          4,
                          scaleToPercent(q3) - scaleToPercent(q1),
                        )}%`,
                      }}
                    />

                    {values.map((value, index) => {
                      const flagged = value < lowerFence || value > upperFence;

                      return (
                        <div
                          key={`${value}-${index}`}
                          className={`absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                            flagged ? "bg-[#741018]" : "bg-[#11100E]"
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

                    <div
                      className="absolute top-3 h-[110px] w-1 rounded-full bg-[#741018]"
                      style={{ left: `${scaleToPercent(mean)}%` }}
                    />
                    <div
                      className="absolute top-3 h-[110px] w-1 rounded-full bg-neutral-500"
                      style={{ left: `${scaleToPercent(median)}%` }}
                    />
                  </div>

                  <div className="mt-5 grid gap-3 text-sm leading-7 text-[#525252] md:grid-cols-4">
                    <div className="rounded-2xl bg-[#FFFCF6] p-4">
                      <strong>Dots:</strong> observations.
                    </div>
                    <div className="rounded-2xl bg-[#FFFCF6] p-4">
                      <strong>Red marker:</strong> mean.
                    </div>
                    <div className="rounded-2xl bg-[#FFFCF6] p-4">
                      <strong>Grey marker:</strong> median.
                    </div>
                    <div className="rounded-2xl bg-[#FFFCF6] p-4">
                      <strong>Red dots:</strong> possible outliers.
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Shape diagnosis
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                  Compare robust and mean-based summaries.
                </h2>

                <div className="mt-6 grid gap-4">
                  <Bar label="Mean" value={mean} max={160} />
                  <Bar label="Median" value={median} max={160} />
                  <Bar label="Standard deviation" value={sd} max={60} />
                  <Bar label="IQR" value={iqr} max={60} />
                </div>

                <section className="mt-6 rounded-[1.5rem] border border-[#741018]/20 bg-[#fff4ef] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
                    Write this conclusion
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#525252]">
                    “The mean is <strong>{mean.toFixed(1)}</strong> and the
                    median is <strong>{median.toFixed(1)}</strong>. The gap
                    between them is{" "}
                    <strong>{Math.abs(mean - median).toFixed(1)}</strong>,
                    suggesting the distribution is{" "}
                    {Math.abs(mean - median) > 8
                      ? "likely affected by skewness or outliers"
                      : "roughly balanced by this comparison"}
                    .”
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
                Ask Mr. R about shape.
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

              <div className="mt-8 rounded-[2rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                  Mentor challenge
                </p>
                <p className="mt-3 text-sm leading-7 text-white/75">
                  Find a dataset from everyday life, such as waiting times,
                  prices or scores. Describe its centre, spread and shape in
                  three separate sentences.
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
              Identify shape and choose honest summaries.
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
                <AnswerCard title="Reasoning" body={activeScenario.working} />
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
              Practise shape diagnosis.
            </h2>

            <div className="mt-8 grid gap-5">
              {[
                {
                  task:
                    "A dataset has many small values and a few very large values. Identify the likely skew and suggest suitable summaries.",
                  hint:
                    "Think about right skew, median and IQR.",
                },
                {
                  task:
                    "A class has two groups: students scoring around 35 and students scoring around 85. Explain why one mean may be misleading.",
                  hint:
                    "Think about bimodality and mixed subgroups.",
                },
                {
                  task:
                    "A boxplot shows one point far above the upper whisker. What should you do before removing it?",
                  hint:
                    "Check for data entry error, measurement issue and real-world plausibility.",
                },
                {
                  task:
                    "Explain why income data are often summarised using the median rather than the mean.",
                  hint:
                    "A few very high incomes can pull the mean upward.",
                },
                {
                  task:
                    "A distribution is roughly symmetric. Which pair of summaries may be reasonable?",
                  hint:
                    "Mean and standard deviation often work well for balanced numerical data.",
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
              Write a careful shape interpretation.
            </h2>

            <div className="mt-8 grid gap-5">
              {[
                "Explain why centre and spread are incomplete without shape.",
                "Describe the difference between right skew and left skew.",
                "Explain why the mean is sensitive to skewness.",
                "Describe what a bimodal distribution might suggest.",
                "Write a careful sentence explaining why an outlier should be investigated.",
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
                “The distribution appears _____. This matters because _____.
                The most appropriate summaries are _____ and _____ because
                _____. Any unusual values should be checked because _____.”
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

function MetricDark({ label, value }: { label: string; value: string }) {
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
  return Math.max(3, Math.min(97, (value / 170) * 100));
}
