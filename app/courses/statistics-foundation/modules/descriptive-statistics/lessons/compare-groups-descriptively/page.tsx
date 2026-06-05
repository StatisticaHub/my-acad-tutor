"use client";

import LockedLessonGate from "@/components/course/LockedLessonGate";
import { isStatisticsFoundationLessonOpen } from "@/lib/statisticsFoundationAccess";


import { useMemo, useState } from "react";

const tabs = [
  "Learning Route",
  "Lecture",
  "Detailed Notes",
  "Comparison Lab",
  "Animated Mentor",
  "Worked Examples",
  "Practice Studio",
  "Reflection",
  "Quiz",
];

const learningRoute = [
  {
    time: "0–10 min",
    title: "Why group comparison matters",
    body:
      "Understand that descriptive statistics often become more meaningful when we compare two or more groups carefully.",
  },
  {
    time: "10–25 min",
    title: "Compare centres",
    body:
      "Use means and medians to compare typical values, while checking whether those summaries are appropriate for the data shape.",
  },
  {
    time: "25–45 min",
    title: "Compare spread",
    body:
      "Compare range, IQR and standard deviation to decide which group is more consistent or more variable.",
  },
  {
    time: "45–65 min",
    title: "Compare shape",
    body:
      "Look for skewness, clusters, long tails and outliers. Two groups may have similar centres but very different shapes.",
  },
  {
    time: "65–90 min",
    title: "Interactive comparison lab",
    body:
      "Adjust group differences, spread, skewness and outliers to see how descriptive comparisons change.",
  },
  {
    time: "90–110 min",
    title: "Careful reporting",
    body:
      "Practise writing cautious descriptive comparisons without making unsupported causal claims.",
  },
];

const lectureConcepts = [
  {
    title: "Comparison needs more than one statistic",
    body:
      "A group comparison should not rely only on one number. Centre, spread, shape and outliers all contribute to the interpretation.",
    example:
      "Two classes may have the same median score, but one class may have much wider variation.",
  },
  {
    title: "Compare like with like",
    body:
      "When comparing groups, use the same summary measures for each group. If one group is described by median and IQR, the other should usually be described the same way.",
    example:
      "Compare median waiting time and IQR for both hospitals, rather than median for one hospital and mean for another.",
  },
  {
    title: "Difference does not automatically mean importance",
    body:
      "A numerical difference may be small, large, meaningful or not meaningful depending on context.",
    example:
      "A 1-minute difference in waiting time may be trivial in one setting but important in an emergency department.",
  },
  {
    title: "Descriptive comparison is not causal proof",
    body:
      "Descriptive statistics can show that groups differ, but they do not by themselves explain why the difference exists.",
    example:
      "If one class scores higher than another, descriptive statistics alone do not prove that the teacher caused the difference.",
  },
  {
    title: "Graphs reveal hidden patterns",
    body:
      "Tables are useful, but graphs can reveal skewness, outliers, overlap and clusters that numerical summaries may hide.",
    example:
      "Two groups can have similar means but one group may contain two clusters of students.",
  },
];

const notes = [
  {
    title: "Comparing centres",
    formula: "Difference in centre = centre of Group A − centre of Group B",
    body:
      "The first comparison often asks which group has the higher typical value. If the data are balanced and numerical, means may be suitable. If the data are skewed or contain outliers, medians are often safer.",
    strength:
      "Centre comparisons are simple and easy to communicate.",
    limitation:
      "A centre difference ignores spread, overlap and shape.",
    bestFor:
      "Initial comparison of typical values between groups.",
  },
  {
    title: "Comparing spread",
    formula: "Compare SDs or compare IQRs",
    body:
      "Spread comparison asks which group is more consistent or variable. If mean and standard deviation are appropriate, compare standard deviations. If median and IQR are more appropriate, compare IQRs.",
    strength:
      "It shows whether one group is more variable than another.",
    limitation:
      "A single spread measure may hide clusters or outliers.",
    bestFor:
      "Comparing consistency, inequality, variation or reliability.",
  },
  {
    title: "Comparing shape",
    formula: "Shape = symmetry, skewness, tails, clusters and outliers",
    body:
      "Shape comparison asks whether groups differ in their whole distribution. One group may be symmetric while another is skewed. One may have outliers while another does not.",
    strength:
      "It prevents misleading conclusions from centre alone.",
    limitation:
      "Shape is difficult to summarise with one number and often needs a graph.",
    bestFor:
      "Boxplots, dot plots, histograms and visual comparison.",
  },
  {
    title: "Comparing overlap",
    formula: "Overlap = how much the group distributions share values",
    body:
      "Groups may differ in centre but still overlap strongly. Strong overlap means many observations from both groups occupy similar values.",
    strength:
      "It makes comparisons more realistic and less exaggerated.",
    limitation:
      "Overlap can be hard to describe without a visual display.",
    bestFor:
      "Avoiding overstatement when group differences are small.",
  },
  {
    title: "Descriptive difference",
    formula: "Descriptive difference ≠ causal effect",
    body:
      "A descriptive difference tells us what is observed in the data. It does not prove what caused the difference. Causal claims need stronger study design, control of confounding and careful reasoning.",
    strength:
      "It keeps interpretation honest and responsible.",
    limitation:
      "It may feel less dramatic than a simple claim, but it is statistically safer.",
    bestFor:
      "Careful reporting in education, health, business and research contexts.",
  },
  {
    title: "Standardised difference",
    formula: "Approximate standardised difference = difference in means ÷ pooled SD",
    body:
      "Sometimes a raw difference is hard to judge because the scale is unfamiliar. A standardised difference compares the difference in group means with the amount of variation in the data.",
    strength:
      "It gives a scale-free sense of how large a difference is relative to variability.",
    limitation:
      "It is only appropriate when mean and standard deviation are meaningful summaries.",
    bestFor:
      "Balanced numerical data where relative difference size is useful.",
  },
];

const comparisonRows = [
  {
    question: "Which group has the higher typical value?",
    lookAt: "Mean or median",
    interpretation:
      "Use mean for balanced numerical data and median for skewed or outlier-affected data.",
  },
  {
    question: "Which group is more consistent?",
    lookAt: "Standard deviation or IQR",
    interpretation:
      "Smaller spread suggests values are more tightly grouped.",
  },
  {
    question: "Which group has more extreme values?",
    lookAt: "Range, boxplot and outlier points",
    interpretation:
      "Extreme values may indicate rare cases, errors or important subgroup behaviour.",
  },
  {
    question: "Do the groups overlap strongly?",
    lookAt: "Dot plots, boxplots or distribution plots",
    interpretation:
      "Strong overlap means the difference in centre should be interpreted cautiously.",
  },
  {
    question: "Are the group shapes similar?",
    lookAt: "Skewness, clusters and tails",
    interpretation:
      "Different shapes may require different summaries or separate explanation.",
  },
  {
    question: "Can we explain why groups differ?",
    lookAt: "Study design and context",
    interpretation:
      "Descriptive statistics alone show difference, not cause.",
  },
];

const scenarios = [
  {
    title: "Two classes",
    question:
      "Class A scores: 62, 64, 65, 67, 68. Class B scores: 50, 58, 65, 72, 80. Compare the groups descriptively.",
    answer:
      "Both classes have the same median score of 65, but Class B has much greater spread.",
    working:
      "Class A range = 6, while Class B range = 30. Class A is more consistent, while Class B has wider variation.",
    caution:
      "It would be misleading to say the classes are identical just because their medians are the same.",
  },
  {
    title: "Hospital waiting times",
    question:
      "Hospital A has median waiting time 28 minutes and IQR 12 minutes. Hospital B has median waiting time 35 minutes and IQR 30 minutes. Compare them.",
    answer:
      "Hospital A has a lower typical waiting time and more consistent waiting times.",
    working:
      "The median is lower for Hospital A, and its IQR is much smaller. Hospital B has both a higher typical wait and more variability.",
    caution:
      "This is descriptive only. It does not prove why the hospitals differ.",
  },
  {
    title: "House prices",
    question:
      "Area A has mean house price £260k and median £245k. Area B has mean £390k and median £255k. What does this suggest?",
    answer:
      "Area B may be strongly right-skewed because its mean is much higher than its median.",
    working:
      "The large gap between mean and median in Area B suggests a few expensive houses may be pulling the mean upward.",
    caution:
      "For skewed house prices, medians and IQRs are usually more informative than means alone.",
  },
  {
    title: "Clinical measurements",
    question:
      "Two treatment groups have similar mean blood pressure, but Group B has a much larger standard deviation. What does this imply?",
    answer:
      "The typical blood pressure may be similar, but Group B is more variable.",
    working:
      "A larger standard deviation means values tend to sit farther from the mean.",
    caution:
      "Higher variability may matter clinically, but interpretation needs clinical context and study design.",
  },
];

const mentorTopics = [
  {
    id: "centre",
    label: "Comparing centre",
    answer:
      "Compare centres to ask which group has the higher typical value. Use means for balanced data and medians for skewed or outlier-affected data.",
  },
  {
    id: "spread",
    label: "Comparing spread",
    answer:
      "Compare spread to ask which group is more consistent. Smaller IQR or standard deviation means values are more tightly grouped.",
  },
  {
    id: "shape",
    label: "Comparing shape",
    answer:
      "Shape comparison checks whether groups differ in symmetry, skewness, clusters or outliers. This can change which summaries are appropriate.",
  },
  {
    id: "overlap",
    label: "Overlap",
    answer:
      "Groups can differ in centre but still overlap strongly. Overlap reminds us not to exaggerate group differences.",
  },
  {
    id: "causal",
    label: "Careful claims",
    answer:
      "Descriptive comparisons show what is observed. They do not prove why groups differ. Avoid causal language unless the study design supports it.",
  },
];

const quizQuestions = [
  {
    question: "Why is centre alone not enough when comparing groups?",
    options: [
      "Because groups can have the same centre but different spread or shape.",
      "Because centre can never be calculated.",
      "Because spread is always zero.",
      "Because graphs are not useful.",
    ],
    answer: 0,
    feedback:
      "Groups may share a centre but differ in spread, skewness, outliers or overlap.",
  },
  {
    question: "Which pair is often suitable for skewed group comparisons?",
    options: [
      "Mean and standard deviation",
      "Median and IQR",
      "Mode and variance only",
      "Maximum and sample size only",
    ],
    answer: 1,
    feedback:
      "Median and IQR are robust summaries for skewed or outlier-affected data.",
  },
  {
    question: "What does larger spread suggest in a group?",
    options: [
      "The group is more variable.",
      "The group has no data.",
      "The group must have a higher median.",
      "The group is always better.",
    ],
    answer: 0,
    feedback:
      "Larger spread means the observations are more dispersed or less consistent.",
  },
  {
    question: "What does strong overlap between groups mean?",
    options: [
      "The groups have no values in common.",
      "Many values from both groups occupy similar ranges.",
      "The groups must have identical means.",
      "The study is causal.",
    ],
    answer: 1,
    feedback:
      "Strong overlap means many observations from the groups lie in similar value ranges.",
  },
  {
    question: "Can descriptive statistics alone prove why two groups differ?",
    options: [
      "Yes, always.",
      "Only if the mean is high.",
      "No, they show observed differences but not causal explanations.",
      "Only if the range is small.",
    ],
    answer: 2,
    feedback:
      "Descriptive statistics describe patterns. Causal explanation requires stronger design and reasoning.",
  },
  {
    question: "Which display is especially useful for comparing medians, IQRs and outliers across groups?",
    options: ["Boxplot", "Pie chart", "Single number only", "Unordered list"],
    answer: 0,
    feedback:
      "Boxplots are useful for comparing medians, IQRs, whiskers and possible outliers across groups.",
  },
];

export default function ComparingGroupsDescriptivelyLesson() {
  const lessonCode = "2.5";

  if (!isStatisticsFoundationLessonOpen(lessonCode)) {
    return (
      <LockedLessonGate
        lessonCode={lessonCode}
        lessonTitle="Comparing groups descriptively"
        moduleTitle="Module 2: Descriptive Statistics"
      />
    );
  }

  const [activeTab, setActiveTab] = useState("Learning Route");
  const [difference, setDifference] = useState(8);
  const [spreadA, setSpreadA] = useState(8);
  const [spreadB, setSpreadB] = useState(16);
  const [shapeType, setShapeType] = useState("balanced");
  const [outlierStrength, setOutlierStrength] = useState(95);
  const [sampleSize, setSampleSize] = useState(15);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [mentorTopic, setMentorTopic] = useState("centre");
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(
    {},
  );

  const activeScenario = scenarios[scenarioIndex];
  const activeMentor =
    mentorTopics.find((topic) => topic.id === mentorTopic) ?? mentorTopics[0];

  const groupA = useMemo(() => {
    return makeGroup({
      centre: 60,
      spread: spreadA,
      count: sampleSize,
      shape: "balanced",
      outlier: outlierStrength,
    });
  }, [outlierStrength, sampleSize, spreadA]);

  const groupB = useMemo(() => {
    return makeGroup({
      centre: 60 + difference,
      spread: spreadB,
      count: sampleSize,
      shape: shapeType,
      outlier: outlierStrength,
    });
  }, [difference, outlierStrength, sampleSize, shapeType, spreadB]);

  const summaryA = useMemo(() => summarise(groupA), [groupA]);
  const summaryB = useMemo(() => summarise(groupB), [groupB]);

  const pooledSd = useMemo(() => {
    return Math.sqrt((summaryA.sd ** 2 + summaryB.sd ** 2) / 2);
  }, [summaryA.sd, summaryB.sd]);

  const standardisedDifference = useMemo(() => {
    if (pooledSd === 0) return 0;
    return (summaryB.mean - summaryA.mean) / pooledSd;
  }, [pooledSd, summaryA.mean, summaryB.mean]);

  const labAdvice = useMemo(() => {
    const medianGap = summaryB.median - summaryA.median;

    if (shapeType === "outlier") {
      return "Group B contains an extreme value. Compare mean/SD with median/IQR before making a strong statement about typical difference.";
    }

    if (shapeType === "right-skewed") {
      return "Group B is right-skewed. The median and IQR are safer summaries than the mean and standard deviation alone.";
    }

    if (shapeType === "bimodal") {
      return "Group B has two clusters. A single centre may hide important subgroup structure.";
    }

    if (Math.abs(medianGap) < 3 && summaryB.iqr > summaryA.iqr * 1.5) {
      return "The groups have similar centres, but Group B is more variable. Spread is the main difference.";
    }

    if (medianGap > 6) {
      return "Group B has a higher typical value. Check overlap and spread before overstating the difference.";
    }

    return "The groups are fairly close in centre. Compare spread, overlap and shape before making a strong interpretation.";
  }, [shapeType, summaryA.iqr, summaryA.median, summaryB.iqr, summaryB.median]);

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
          className="text-sm font-black text-[#741018] hover:text-[#4d080e]"
        >
          ← Back to module
        </a>

        <section className="mt-8 overflow-hidden rounded-[2.5rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 md:p-10">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Statistics Foundation · Lesson 2.5
              </p>

              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-7xl">
                Comparing groups descriptively.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">
                Descriptive comparison brings together centre, spread, shape,
                quartiles, boxplots and careful interpretation. This lesson
                teaches students how to compare groups honestly, recognise
                overlap and variability, and avoid making unsupported causal
                claims from descriptive statistics alone.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "105–110 minutes",
                  "No coding",
                  "Group comparison lab",
                  "Careful reporting",
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
                From separate summaries to fair comparison.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Compare centre",
                  "Compare spread",
                  "Compare shape",
                  "Check overlap",
                  "Inspect outliers",
                  "Report cautiously",
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
                105–110 minute lesson plan
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Learn how to compare groups without oversimplifying the data.
              </h2>

              <p className="mt-5 text-base leading-8 text-[#525252]">
                This lesson completes Module 2 by combining everything learned
                so far. Students compare groups using centre, spread, shape,
                quartiles and outliers. The main goal is not only to identify
                differences, but to describe those differences honestly.
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
                By the end, you should be able to compare groups responsibly.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Compare group centres using means or medians.",
                  "Compare group spread using standard deviations or IQRs.",
                  "Identify when groups have similar centres but different variability.",
                  "Use boxplots and dot plots to compare distributions visually.",
                  "Recognise skewness, clusters and outliers across groups.",
                  "Discuss overlap between groups.",
                  "Avoid unsupported causal conclusions.",
                  "Write clear descriptive comparison paragraphs.",
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
                  Comparison decision board
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  A fair comparison looks at centre, spread, shape and overlap.
                </h2>

                <p className="mt-4 text-base leading-8 text-[#525252]">
                  Comparing groups descriptively is not about finding one
                  dramatic difference. It is about building a balanced summary:
                  what is typical, how variable the groups are, what the shapes
                  look like, and whether observations overlap.
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
                  Mr. R teaches comparison without exaggeration.
                </h2>

                <div className="mt-6 grid gap-4">
                  <Dialogue
                    speaker="Mr. R"
                    text="Today we bring Module 2 together. We are not just describing one dataset. We are comparing groups."
                  />
                  <Dialogue
                    speaker="Amelia"
                    text="So we compare the means?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Sometimes. But first we ask whether the mean is appropriate. If the data are skewed, the median may be safer."
                  />
                  <Dialogue
                    speaker="Ben"
                    text="What if two groups have the same median?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Then compare spread. One group may be much more consistent while the other is widely variable."
                  />
                  <Dialogue
                    speaker="Chloe"
                    text="And shape matters too?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Very much. A group may be skewed, contain outliers or have two clusters. A single centre can hide all of that."
                  />
                  <Dialogue
                    speaker="Daniel"
                    text="Can we say one group caused the difference?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Not from descriptive statistics alone. We can say what we observe. Explaining why needs study design and causal reasoning."
                  />
                  <Dialogue
                    speaker="Amelia"
                    text="So a good comparison is careful, not dramatic."
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Exactly. Descriptive comparison should be clear, honest and supported by the summaries."
                  />
                </div>

                <section className="mt-8 rounded-[2rem] border border-[#741018]/20 bg-[#fff4ef] p-6">
                  <h3 className="text-2xl font-black tracking-[-0.04em] text-[#741018]">
                    Lecture takeaway
                  </h3>
                  <p className="mt-3 text-base leading-8 text-[#525252]">
                    A strong descriptive comparison says which group has the
                    higher typical value, which group is more variable, whether
                    shapes differ, whether outliers are present, and how much
                    caution is needed.
                  </p>
                </section>
              </section>
            </section>

            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Comparison pathway
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Ask these questions before writing a comparison.
              </h2>

              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {comparisonRows.map((item) => (
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
                      Look at
                    </p>
                    <p className="mt-2 text-sm font-black leading-7 text-neutral-800">
                      {item.lookAt}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#525252]">
                      {item.interpretation}
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
              Comparing groups descriptively in depth.
            </h2>

            <p className="mt-5 max-w-4xl text-base leading-8 text-[#525252]">
              Descriptive comparison combines several ideas: centre tells us
              what is typical, spread tells us how variable each group is, shape
              shows whether summaries are appropriate, and graphs show overlap,
              clusters and outliers. Good comparison is not just mathematical;
              it is interpretive.
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
                Important warning
              </p>

              <h3 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                Descriptive comparison is not causal explanation.
              </h3>

              <p className="mt-4 text-sm leading-7 text-white/75">
                Descriptive statistics can show that groups differ in the
                observed data. They cannot, by themselves, prove why the groups
                differ. Causal language requires additional reasoning about
                study design, confounding, timing and alternative explanations.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: "Safe",
                    body:
                      "Group B had a higher median score than Group A in this dataset.",
                  },
                  {
                    title: "Risky",
                    body:
                      "Being in Group B caused students to score higher.",
                  },
                  {
                    title: "Better",
                    body:
                      "The observed difference may reflect group characteristics, teaching, selection or other factors.",
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
          </section>
        )}

        {activeTab === "Comparison Lab" && (
          <section className="mt-8 grid gap-6">
            <section className="overflow-hidden rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="p-6 md:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                    Interactive comparison lab
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    Adjust two groups and compare them descriptively.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-[#525252]">
                    Group A stays balanced. Group B can shift, spread out,
                    become skewed or contain an outlier. Watch how the
                    comparison changes when centre, spread and shape change.
                  </p>

                  <div className="mt-6">
                    <label className="block">
                      <span className="text-sm font-black text-[#525252]">
                        Group B shape
                      </span>
                      <select
                        value={shapeType}
                        onChange={(event) => setShapeType(event.target.value)}
                        className="mt-3 w-full rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] px-4 py-3 text-sm font-bold text-neutral-800"
                      >
                        <option value="balanced">Balanced</option>
                        <option value="right-skewed">Right-skewed</option>
                        <option value="bimodal">Bimodal</option>
                        <option value="outlier">Outlier-affected</option>
                      </select>
                    </label>
                  </div>

                  <div className="mt-6 grid gap-5">
                    <Slider
                      label="Group B centre shift"
                      value={difference}
                      min={-10}
                      max={25}
                      onChange={setDifference}
                    />
                    <Slider
                      label="Group A spread"
                      value={spreadA}
                      min={4}
                      max={22}
                      onChange={setSpreadA}
                    />
                    <Slider
                      label="Group B spread"
                      value={spreadB}
                      min={4}
                      max={30}
                      onChange={setSpreadB}
                    />
                    <Slider
                      label="Outlier strength"
                      value={outlierStrength}
                      min={75}
                      max={150}
                      onChange={setOutlierStrength}
                    />
                    <Slider
                      label="Sample size per group"
                      value={sampleSize}
                      min={9}
                      max={25}
                      onChange={setSampleSize}
                    />
                  </div>
                </div>

                <div className="border-t border-[#E4DED2] bg-[#11100E] p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                    Interpretation panel
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    What is the fair comparison?
                  </h2>

                  <p className="mt-6 text-lg leading-9 text-white/80">
                    {labAdvice}
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    <MetricDark
                      label="Mean difference B − A"
                      value={(summaryB.mean - summaryA.mean).toFixed(1)}
                    />
                    <MetricDark
                      label="Median difference B − A"
                      value={(summaryB.median - summaryA.median).toFixed(1)}
                    />
                    <MetricDark
                      label="IQR ratio B ÷ A"
                      value={(summaryB.iqr / Math.max(1, summaryA.iqr)).toFixed(2)}
                    />
                    <MetricDark
                      label="Std. difference"
                      value={standardisedDifference.toFixed(2)}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Group dot plots
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                  Compare overlap, spread and unusual values.
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#525252]">
                  The two strips show the distributions for Group A and Group B.
                  The red line is the median. Wide strips mean more spread.
                  Separated strips mean less overlap.
                </p>

                <div className="mt-6 grid gap-5 rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
                  <GroupStrip
                    label="Group A"
                    values={groupA}
                    median={summaryA.median}
                    q1={summaryA.q1}
                    q3={summaryA.q3}
                    lowerFence={summaryA.lowerFence}
                    upperFence={summaryA.upperFence}
                  />
                  <GroupStrip
                    label="Group B"
                    values={groupB}
                    median={summaryB.median}
                    q1={summaryB.q1}
                    q3={summaryB.q3}
                    lowerFence={summaryB.lowerFence}
                    upperFence={summaryB.upperFence}
                  />
                </div>
              </section>

              <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Summary table
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                  Compare the same summaries across groups.
                </h2>

                <div className="mt-6 overflow-x-auto">
                  <table className="w-full min-w-[520px] border-separate border-spacing-y-3 text-left">
                    <thead>
                      <tr className="text-xs uppercase tracking-[0.18em] text-[#7a7063]">
                        <th className="px-4">Summary</th>
                        <th className="px-4">Group A</th>
                        <th className="px-4">Group B</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Mean", summaryA.mean, summaryB.mean],
                        ["Median", summaryA.median, summaryB.median],
                        ["SD", summaryA.sd, summaryB.sd],
                        ["IQR", summaryA.iqr, summaryB.iqr],
                        ["Range", summaryA.range, summaryB.range],
                      ].map(([label, valueA, valueB]) => (
                        <tr key={String(label)} className="bg-[#F7F3EA]">
                          <td className="rounded-l-2xl px-4 py-4 text-sm font-black">
                            {label}
                          </td>
                          <td className="px-4 py-4 text-sm text-[#525252]">
                            {Number(valueA).toFixed(1)}
                          </td>
                          <td className="rounded-r-2xl px-4 py-4 text-sm text-[#525252]">
                            {Number(valueB).toFixed(1)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <section className="mt-6 rounded-[1.5rem] border border-[#741018]/20 bg-[#fff4ef] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
                    Write this conclusion
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#525252]">
                    “Group B has a median of{" "}
                    <strong>{summaryB.median.toFixed(1)}</strong>, compared
                    with <strong>{summaryA.median.toFixed(1)}</strong> in Group
                    A. Group B is{" "}
                    {summaryB.iqr > summaryA.iqr
                      ? "more variable"
                      : "less variable"}{" "}
                    by IQR. This is a descriptive comparison, not evidence by
                    itself of cause.”
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
                Ask Mr. R about group comparison.
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
                  Choose two groups from a real context. Compare centre, spread,
                  shape and overlap in four separate sentences.
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
              Compare groups with centre, spread and caution.
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
              Practise descriptive comparison writing.
            </h2>

            <div className="mt-8 grid gap-5">
              {[
                {
                  task:
                    "Two groups have the same median, but Group B has a much larger IQR. Write a careful comparison.",
                  hint:
                    "Say the typical values are similar, but Group B is more variable.",
                },
                {
                  task:
                    "Group A has a higher mean than Group B, but Group A is strongly right-skewed. What should you check?",
                  hint:
                    "Compare medians and inspect outliers before interpreting the mean difference.",
                },
                {
                  task:
                    "A boxplot shows strong overlap between two groups. What does this mean for the comparison?",
                  hint:
                    "A centre difference may exist, but many observations have similar values.",
                },
                {
                  task:
                    "Write a sentence that avoids causal language when comparing exam scores between two classes.",
                  hint:
                    "Use phrases like 'in this dataset' and 'was observed', not 'caused'.",
                },
                {
                  task:
                    "Group B has two clusters. Explain why one mean may be misleading.",
                  hint:
                    "A single centre may fall between clusters and represent neither subgroup well.",
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
              Write a full descriptive comparison.
            </h2>

            <div className="mt-8 grid gap-5">
              {[
                "Explain why a fair group comparison should include centre and spread.",
                "Describe a situation where two groups have similar centres but different variability.",
                "Explain why overlap matters when comparing groups.",
                "Explain why group differences should not automatically be interpreted causally.",
                "Write a short paragraph comparing two groups using centre, spread, shape and caution.",
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
                “Group A had a _____ centre than Group B. Group _____ showed
                greater spread, suggesting _____. The distributions appear
                _____. Because this is descriptive evidence, we can say _____
                but should not claim _____ without stronger study design.”
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

function GroupStrip({
  label,
  values,
  median,
  q1,
  q3,
  lowerFence,
  upperFence,
}: {
  label: string;
  values: number[];
  median: number;
  q1: number;
  q3: number;
  lowerFence: number;
  upperFence: number;
}) {
  return (
    <div className="rounded-[1.5rem] bg-[#FFFCF6] p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-black text-[#525252]">{label}</p>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#7a7063]">
          n = {values.length}
        </p>
      </div>

      <div className="relative mt-5 h-24 rounded-[1.25rem] bg-[#F7F3EA]">
        <div className="absolute left-4 right-4 top-1/2 h-1 rounded-full bg-neutral-200" />

        <div
          className="absolute top-[38%] h-6 rounded-full border border-[#741018] bg-[#741018]/10"
          style={{
            left: `${scaleToPercent(q1)}%`,
            width: `${Math.max(4, scaleToPercent(q3) - scaleToPercent(q1))}%`,
          }}
        />

        <div
          className="absolute top-3 h-[72px] w-1 rounded-full bg-[#741018]"
          style={{ left: `${scaleToPercent(median)}%` }}
        />

        {values.map((value, index) => {
          const flagged = value < lowerFence || value > upperFence;

          return (
            <div
              key={`${label}-${value}-${index}`}
              className={`absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                flagged ? "bg-[#741018]" : "bg-[#11100E]"
              }`}
              style={{
                left: `${scaleToPercent(value)}%`,
                animation: flagged ? "dotPulse 2.4s ease-in-out infinite" : undefined,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function makeGroup({
  centre,
  spread,
  count,
  shape,
  outlier,
}: {
  centre: number;
  spread: number;
  count: number;
  shape: string;
  outlier: number;
}) {
  let values: number[] = [];

  if (shape === "balanced") {
    values = Array.from({ length: count }, (_, index) => {
      const offset = index - Math.floor(count / 2);
      return Math.round(centre + offset * (spread / 6));
    });
  }

  if (shape === "right-skewed") {
    values = Array.from({ length: count - 2 }, (_, index) =>
      Math.round(centre - 20 + index * (spread / 7)),
    );
    values.push(Math.round(centre + spread + 18), Math.round(centre + spread + 30));
  }

  if (shape === "bimodal") {
    const lower = Math.floor(count / 2);
    const upper = count - lower;

    values = [
      ...Array.from({ length: lower }, (_, index) =>
        Math.round(centre - 20 + index * 1.7),
      ),
      ...Array.from({ length: upper }, (_, index) =>
        Math.round(centre + 16 + index * 1.7),
      ),
    ];
  }

  if (shape === "outlier") {
    values = Array.from({ length: count - 1 }, (_, index) => {
      const offset = index - Math.floor((count - 1) / 2);
      return Math.round(centre + offset * (spread / 7));
    });
    values.push(outlier);
  }

  return values.sort((a, b) => a - b);
}

function summarise(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  const mean = sorted.reduce((total, value) => total + value, 0) / sorted.length;
  const median = medianOf(sorted);
  const lowerHalf = sorted.slice(0, Math.floor(sorted.length / 2));
  const upperHalf = sorted.slice(Math.ceil(sorted.length / 2));
  const q1 = medianOf(lowerHalf);
  const q3 = medianOf(upperHalf);
  const iqr = q3 - q1;
  const range = sorted[sorted.length - 1] - sorted[0];

  const variance =
    sorted.reduce((total, value) => total + (value - mean) ** 2, 0) /
    (sorted.length - 1);

  const sd = Math.sqrt(variance);
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;

  return {
    mean,
    median,
    q1,
    q3,
    iqr,
    range,
    sd,
    lowerFence,
    upperFence,
  };
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
