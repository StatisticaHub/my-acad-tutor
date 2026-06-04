"use client";

import LockedLessonGate from "@/components/course/LockedLessonGate";
import { isStatisticsFoundationLessonOpen } from "@/lib/statisticsFoundationAccess";


import { useMemo, useState } from "react";

const tabs = [
  "Learning Route",
  "Lecture",
  "Detailed Notes",
  "Visual Studio",
  "Graph Chooser",
  "Worked Examples",
  "Practice Studio",
  "Reflection",
  "Quiz",
];

const learningRoute = [
  {
    time: "0–10 min",
    title: "Why tables and graphs matter",
    body:
      "Understand that tables and graphs are not decoration. They are tools for organising, checking and communicating data.",
  },
  {
    time: "10–25 min",
    title: "Frequency tables",
    body:
      "Learn counts, relative frequencies, percentages, cumulative frequencies and grouped tables.",
  },
  {
    time: "25–45 min",
    title: "Graphs for categorical data",
    body:
      "Use bar charts, ordered bar charts, stacked bars and avoid misleading category displays.",
  },
  {
    time: "45–65 min",
    title: "Graphs for numerical data",
    body:
      "Use dot plots, histograms, boxplots and line graphs to understand distribution, spread and unusual values.",
  },
  {
    time: "65–80 min",
    title: "Visual studio",
    body:
      "Adjust skewness, categories, sample size and outliers to see how the display changes.",
  },
  {
    time: "80–95 min",
    title: "Practice and quiz",
    body:
      "Choose suitable displays, explain what they show, and identify misleading graph choices.",
  },
];

const lectureConcepts = [
  {
    title: "Tables organise information before interpretation",
    body:
      "A good table turns raw data into a readable structure. It should make clear what is being counted, what the categories are, what units are used, and whether values are counts, percentages or measurements.",
    example:
      "A table of course satisfaction should show the number and percentage of students in each satisfaction category.",
  },
  {
    title: "Graphs reveal patterns quickly",
    body:
      "A graph can show patterns that are difficult to notice in a long table: skewness, outliers, clusters, gaps, trends and differences between groups.",
    example:
      "A histogram can show that waiting times are right-skewed even if the mean looks reasonable.",
  },
  {
    title: "The graph must match the variable type",
    body:
      "Categorical variables need category-based displays such as bar charts. Numerical variables need distribution-based displays such as histograms, dot plots or boxplots.",
    example:
      "Degree subject should use a bar chart. Blood pressure should use a histogram or boxplot.",
  },
  {
    title: "A graph can mislead",
    body:
      "Graphs can distort interpretation through truncated axes, inappropriate grouping, missing labels, excessive decoration, wrong ordering or using the wrong graph type.",
    example:
      "A bar chart with a vertical axis starting at 95 can exaggerate a small difference.",
  },
];

const detailedNotes = [
  {
    title: "Frequency table",
    short: "A table showing how often values or categories occur.",
    detail:
      "A frequency table lists categories or values and shows the number of observations in each. It is usually the first table for categorical data. It helps students see the distribution of responses before drawing a graph.",
    example:
      "If 40 students choose statistics, 25 choose mathematics and 15 choose biology, those are frequencies.",
    formula: "Frequency = count in category",
  },
  {
    title: "Relative frequency",
    short: "The proportion of observations in a category.",
    detail:
      "Relative frequency converts counts into proportions. This is useful when comparing groups of different sizes because raw counts alone can be misleading.",
    example:
      "If 40 out of 100 students choose statistics, the relative frequency is 40/100 = 0.40.",
    formula: "Relative frequency = frequency / total",
  },
  {
    title: "Percentage",
    short: "Relative frequency multiplied by 100.",
    detail:
      "Percentages are often easier to communicate than proportions. They are especially useful in reports, survey summaries and public-facing explanations.",
    example:
      "A relative frequency of 0.40 is 40%.",
    formula: "Percentage = relative frequency × 100",
  },
  {
    title: "Cumulative frequency",
    short: "A running total across ordered values or categories.",
    detail:
      "Cumulative frequency is useful when categories have a meaningful order. It tells us how many observations fall at or below a certain value or category.",
    example:
      "In exam scores, cumulative frequency can show how many students scored 60 or below.",
    formula: "Cumulative frequency = running total",
  },
  {
    title: "Bar chart",
    short: "A graph for categorical data.",
    detail:
      "A bar chart displays counts or percentages for categories. The bars should be separated because categories are distinct groups. For ordinal variables, the bars should follow the natural order.",
    example:
      "A bar chart can show the percentage of students in each satisfaction category.",
    formula: "Bar height = count or percentage",
  },
  {
    title: "Histogram",
    short: "A graph for numerical distributions.",
    detail:
      "A histogram groups numerical values into intervals and shows how many observations fall in each interval. It is useful for seeing shape, centre, spread, skewness and unusual values.",
    example:
      "A histogram of waiting times may show many short waits and a few very long waits.",
    formula: "Bin height = frequency in interval",
  },
  {
    title: "Boxplot",
    short: "A compact display of centre, spread and outliers.",
    detail:
      "A boxplot summarises a numerical variable using the median, quartiles and possible outliers. It is useful for comparing numerical distributions across groups.",
    example:
      "Boxplots can compare study hours across three degree programmes.",
    formula: "Box = Q1 to Q3; line = median",
  },
  {
    title: "Line graph",
    short: "A graph for ordered time or sequence data.",
    detail:
      "A line graph is useful when the horizontal axis has a meaningful order, especially time. It should not be used just to connect unrelated categories.",
    example:
      "A line graph can show weekly clinic attendance over 12 weeks.",
    formula: "Line shows change over ordered x-axis",
  },
];

const graphRules = [
  {
    variable: "Categorical nominal",
    display: "Bar chart",
    why:
      "Categories are labels with no natural order. A bar chart compares counts or percentages clearly.",
  },
  {
    variable: "Categorical ordinal",
    display: "Ordered bar chart",
    why:
      "The order matters, so the graph should preserve the category order.",
  },
  {
    variable: "Binary",
    display: "Two-bar chart or percentage table",
    why:
      "The goal is usually to compare the proportion in one of two outcomes.",
  },
  {
    variable: "Numerical discrete",
    display: "Frequency table, dot plot or count plot",
    why:
      "Counts are numerical but often take repeated whole-number values.",
  },
  {
    variable: "Numerical continuous",
    display: "Histogram, dot plot or boxplot",
    why:
      "These displays show centre, spread, shape and outliers.",
  },
  {
    variable: "Time series",
    display: "Line graph",
    why:
      "Values are ordered over time, so change and trend are meaningful.",
  },
];

const scenarios = [
  {
    title: "Student satisfaction",
    question:
      "A department records satisfaction with a statistics course: very poor, poor, fair, good and excellent.",
    variableType: "Ordinal categorical",
    suitableTable:
      "Frequency table with counts, percentages and cumulative percentages.",
    suitableGraph:
      "Ordered bar chart, with categories shown from very poor to excellent.",
    interpretation:
      "The display should show both the most common response and whether responses are concentrated at the high or low end.",
    warning:
      "Do not place the categories alphabetically, because that destroys the natural order.",
  },
  {
    title: "Weekly study hours",
    question:
      "A tutor records how many hours students study per week.",
    variableType: "Numerical continuous",
    suitableTable:
      "Grouped frequency table if there are many unique values.",
    suitableGraph:
      "Histogram or dot plot to show shape, spread and possible outliers.",
    interpretation:
      "The graph can show whether most students study similar hours or whether a few students study much more.",
    warning:
      "The mean alone may be misleading if the distribution is strongly skewed.",
  },
  {
    title: "Treatment group",
    question:
      "A clinical study records whether each patient received standard care, treatment A or treatment B.",
    variableType: "Nominal categorical",
    suitableTable:
      "Frequency and percentage table by treatment group.",
    suitableGraph:
      "Bar chart showing number or percentage in each treatment group.",
    interpretation:
      "The graph should show whether the groups are balanced or whether one group is much larger.",
    warning:
      "A pie chart is usually less precise than a bar chart for comparing categories.",
  },
  {
    title: "Clinic attendance over weeks",
    question:
      "A clinic records the number of appointments each week for 20 weeks.",
    variableType: "Time series / ordered numerical",
    suitableTable:
      "Table with week number and attendance count.",
    suitableGraph:
      "Line graph showing attendance over time.",
    interpretation:
      "The graph can show trends, peaks, drops and seasonal patterns.",
    warning:
      "Do not use a line graph for unordered categories, because connecting unrelated categories implies false continuity.",
  },
];

const mentorTopics = [
  {
    id: "table",
    label: "Build a good table",
    answer:
      "A good table should have a clear title, labelled rows and columns, units where needed, and should say whether entries are counts, percentages or measurements.",
  },
  {
    id: "bar",
    label: "Use bar charts",
    answer:
      "Use bar charts for categorical variables. For ordinal categories, keep the natural order. Use percentages when comparing groups of different sizes.",
  },
  {
    id: "histogram",
    label: "Use histograms",
    answer:
      "Use histograms for numerical variables. They help reveal centre, spread, skewness, clusters and unusual values.",
  },
  {
    id: "boxplot",
    label: "Use boxplots",
    answer:
      "Use boxplots when you want a compact summary of a numerical variable, especially when comparing several groups.",
  },
  {
    id: "misleading",
    label: "Avoid misleading graphs",
    answer:
      "Avoid missing labels, truncated axes, wrong graph types, distorted scales and decorative effects that make interpretation harder.",
  },
];

const practiceTasks = [
  {
    title: "Choose the graph",
    task:
      "A dataset contains degree subject, age, satisfaction level, final exam score and pass/fail status.",
    prompts: [
      "Choose one suitable graph for each variable.",
      "Identify which variables need percentages.",
      "Identify which variables can use a histogram.",
    ],
  },
  {
    title: "Build a frequency table",
    task:
      "A class survey records preferred learning format: live lecture, recorded video, written notes or practice questions.",
    prompts: [
      "List the categories.",
      "Explain what the frequency column means.",
      "Explain why percentages may be useful.",
    ],
  },
  {
    title: "Spot the misleading graph",
    task:
      "A bar chart compares two percentages, 48% and 52%, but the vertical axis starts at 45%.",
    prompts: [
      "Explain why the graph may exaggerate the difference.",
      "Suggest a better axis scale.",
      "Write a cautious interpretation.",
    ],
  },
];

const quizQuestions = [
  {
    question: "Which display is usually best for a nominal categorical variable?",
    options: ["Histogram", "Bar chart", "Boxplot only", "Scatterplot only"],
    answer: 1,
    feedback:
      "A bar chart is suitable for nominal categorical data because it compares counts or percentages across categories.",
  },
  {
    question: "What does relative frequency mean?",
    options: [
      "The running total across ordered categories.",
      "The frequency divided by the total number of observations.",
      "The largest value in a dataset.",
      "The difference between two means.",
    ],
    answer: 1,
    feedback:
      "Relative frequency is the frequency in a category divided by the total number of observations.",
  },
  {
    question: "Which graph is suitable for a continuous numerical variable?",
    options: ["Histogram", "Pie chart of names", "Unordered category line graph", "Student ID bar chart"],
    answer: 0,
    feedback:
      "A histogram is useful for showing the distribution of a continuous numerical variable.",
  },
  {
    question: "Why should ordinal categories be displayed in order?",
    options: [
      "Because alphabetical order is always required.",
      "Because the category order carries meaning.",
      "Because ordinal variables have no order.",
      "Because percentages cannot be used.",
    ],
    answer: 1,
    feedback:
      "Ordinal categories have a meaningful order, so the graph should preserve that order.",
  },
  {
    question: "Which statement is most careful?",
    options: [
      "Graphs are only decorative.",
      "A graph should match the variable type and support clear interpretation.",
      "A line graph is best for every variable.",
      "A table never needs labels.",
    ],
    answer: 1,
    feedback:
      "Graphs should be chosen according to the variable type and the interpretation needed.",
  },
];

export default function TablesAndGraphsLesson() {
  const lessonCode = "1.4";

  if (!isStatisticsFoundationLessonOpen(lessonCode)) {
    return (
      <LockedLessonGate
        lessonCode={lessonCode}
        lessonTitle="Tables and graphs"
        moduleTitle="Module 1: Introduction to Statistical Thinking"
      />
    );
  }

  const [activeTab, setActiveTab] = useState("Learning Route");
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [categoryBalance, setCategoryBalance] = useState(45);
  const [skewness, setSkewness] = useState(30);
  const [outliers, setOutliers] = useState(10);
  const [sampleSize, setSampleSize] = useState(120);
  const [mentorTopic, setMentorTopic] = useState("table");
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const activeScenario = scenarios[scenarioIndex];
  const activeMentor =
    mentorTopics.find((topic) => topic.id === mentorTopic) ?? mentorTopics[0];

  const categoricalBars = useMemo(() => {
    const a = Math.max(8, categoryBalance);
    const b = Math.max(8, 70 - categoryBalance / 2);
    const c = Math.max(8, 35 + outliers / 2);
    const d = Math.max(8, 28 + skewness / 3);
    const total = a + b + c + d;

    return [
      { label: "Statistics", count: Math.round((a / total) * sampleSize) },
      { label: "Mathematics", count: Math.round((b / total) * sampleSize) },
      { label: "Biology", count: Math.round((c / total) * sampleSize) },
      { label: "Economics", count: Math.round((d / total) * sampleSize) },
    ];
  }, [categoryBalance, outliers, sampleSize, skewness]);

  const totalCount = categoricalBars.reduce((sum, item) => sum + item.count, 0);

  const histogramBins = useMemo(() => {
    return Array.from({ length: 8 }, (_, index) => {
      const base = 20 + ((index + 2) * 9);
      const skewBoost = index > 4 ? skewness * 0.9 : 0;
      const outlierBoost = index === 7 ? outliers * 1.4 : 0;
      const value = Math.max(6, Math.round(base + skewBoost + outlierBoost - index * 5));
      return {
        label: `${index * 5}-${index * 5 + 4}`,
        value,
      };
    });
  }, [outliers, skewness]);

  const maxHistogram = Math.max(...histogramBins.map((item) => item.value));

  const dotValues = useMemo(() => {
    return Array.from({ length: 64 }, (_, index) => {
      const shift = index % 13 === 0 ? outliers * 0.9 : 0;
      const value = Math.min(96, 10 + ((index * 17) % 62) + skewness / 3 + shift);
      return {
        id: index,
        value,
        outlier: index % 13 === 0 && outliers > 18,
      };
    });
  }, [outliers, skewness]);

  const boxSummary = useMemo(() => {
    const q1 = Math.max(8, 28 - outliers / 8);
    const median = Math.max(q1 + 8, 48 + skewness / 8);
    const q3 = Math.min(82, median + 18 + skewness / 6);
    const min = Math.max(2, q1 - 16);
    const max = Math.min(98, q3 + 12 + outliers / 2);

    return { q1, median, q3, min, max };
  }, [outliers, skewness]);

  const graphAdvice = useMemo(() => {
    if (skewness > 55 || outliers > 30) {
      return "The numerical data look skewed or affected by outliers. Use the median and IQR, and show a histogram or boxplot.";
    }
    if (categoryBalance > 65) {
      return "One category is dominant. Use percentages as well as counts so the imbalance is easy to interpret.";
    }
    return "The displays look reasonably balanced. Use the table and graph together: the table gives exact values, the graph gives pattern.";
  }, [categoryBalance, outliers, skewness]);

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

        @keyframes signalMove {
          0% { transform: translateX(-100%); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }

        @keyframes barGrow {
          0% { transform: scaleY(0.4); opacity: 0.55; }
          100% { transform: scaleY(1); opacity: 1; }
        }

        @keyframes dotPulse {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.18); opacity: 1; }
        }
      `}</style>

      <section className="mx-auto max-w-7xl">
        <a
          href="/courses/statistics-foundation/modules/introduction-to-statistical-thinking/"
          className="text-sm font-black text-[#8b1116] hover:text-[#5f0b0f]"
        >
          ← Back to module
        </a>

        <section className="mt-8 overflow-hidden rounded-[2.5rem] border border-neutral-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 md:p-10">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Statistics Foundation · Lesson 1.4
              </p>

              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-7xl">
                Tables and graphs.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                Tables and graphs are the first tools for making data readable.
                This lesson shows how to build frequency tables, choose suitable
                graphs, read patterns carefully and avoid misleading displays.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "90 minutes",
                  "No coding",
                  "Graph studio",
                  "Visual reasoning",
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
                From raw values to clear visual evidence.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Organise data",
                  "Count frequencies",
                  "Convert to percentages",
                  "Choose graph",
                  "Read pattern",
                  "Check for distortion",
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
                90 minute lesson plan
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Learn to communicate data clearly.
              </h2>

              <p className="mt-5 text-base leading-8 text-neutral-700">
                A table gives exact values. A graph gives pattern. A strong
                statistical explanation uses both. This lesson teaches students
                to choose displays that match the variable type and support
                honest interpretation.
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
                By the end, you should be able to defend your visual choice.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Build frequency, relative frequency and percentage tables.",
                  "Choose bar charts for categorical variables.",
                  "Choose histograms and boxplots for numerical variables.",
                  "Explain what a graph shows about shape, centre and spread.",
                  "Identify misleading graph choices.",
                  "Write a clear interpretation from a table and graph.",
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
            <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
              <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Concept board
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Tables and graphs are statistical arguments.
                </h2>

                <p className="mt-4 text-base leading-8 text-neutral-700">
                  A good display does not merely look attractive. It helps the
                  reader understand what was measured, how values are distributed,
                  and what conclusion is reasonable.
                </p>

                <div className="mt-6 grid gap-4">
                  {lectureConcepts.map((concept, index) => (
                    <article
                      key={concept.title}
                      className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
                    >
                      <div className="flex items-start gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-sm font-black text-white">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="text-xl font-black tracking-[-0.035em]">
                            {concept.title}
                          </h3>
                          <p className="mt-2 text-sm leading-7 text-neutral-700">
                            {concept.body}
                          </p>
                          <p className="mt-3 rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-7 text-neutral-700">
                            Example: {concept.example}
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
                  Mr. R explains why visualisation is reasoning.
                </h2>

                <div className="mt-6 grid gap-4">
                  <Dialogue
                    speaker="Mr. R"
                    text="In Lesson 1.3, we learned that variables have types. Today we ask: how do we organise and display those variables clearly?"
                  />
                  <Dialogue
                    speaker="Amelia"
                    text="So a table is not just a neat way to list numbers?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Correct. A table is a structure for interpretation. It tells us what was counted, what the categories are and how common each value is."
                  />
                  <Dialogue
                    speaker="Ben"
                    text="When should I use a graph instead of a table?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Use a graph when you want the reader to see a pattern quickly: a difference, trend, skew, outlier or distribution shape."
                  />
                  <Dialogue
                    speaker="Chloe"
                    text="Can a graph be technically correct but still misleading?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Yes. Poor axis choices, wrong graph types, missing labels and decorative effects can all distort interpretation."
                  />
                  <Dialogue
                    speaker="Daniel"
                    text="So the correct graph depends on the variable type and the message?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Exactly. A graph should match the data and support a careful conclusion."
                  />
                </div>
              </section>
            </section>

            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Visual decision pipeline
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Choose the display in six steps.
              </h2>

              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  ["1", "Identify variable type", "Categorical, ordinal, binary, numerical or time series."],
                  ["2", "Choose table", "Counts, percentages, grouped table or summary table."],
                  ["3", "Choose graph", "Bar chart, histogram, boxplot, dot plot or line graph."],
                  ["4", "Label clearly", "Every row, column, axis and unit should be understandable."],
                  ["5", "Check distortion", "Look for misleading axes, bad ordering or wrong scales."],
                  ["6", "Interpret carefully", "Explain pattern, uncertainty, limitation and context."],
                ].map(([step, title, body]) => (
                  <article
                    key={step}
                    className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
                  >
                    <span className="rounded-full bg-neutral-950 px-3 py-1 text-xs font-black text-white">
                      Step {step}
                    </span>
                    <h3 className="mt-4 text-lg font-black tracking-[-0.03em]">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-neutral-700">
                      {body}
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
              Tables and graphs in depth.
            </h2>

            <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-700">
              Tables give precision. Graphs give visual structure. The strongest
              data summaries often use both: a table to show exact numbers and a
              graph to reveal the pattern.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {detailedNotes.map((note) => (
                <article
                  key={note.title}
                  className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
                >
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
                    {note.short}
                  </p>
                  <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">
                    {note.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-700">
                    {note.detail}
                  </p>
                  <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-7 text-neutral-700">
                    Example: {note.example}
                  </p>
                  <p className="mt-3 rounded-2xl bg-neutral-950 px-4 py-3 text-sm font-bold leading-7 text-white">
                    {note.formula}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Visual Studio" && (
          <section className="mt-8 grid gap-6">
            <section className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="p-6 md:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                    Visual studio
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    Change the data and watch the display change.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-neutral-700">
                    Adjust the controls to see how category balance, skewness,
                    outliers and sample size affect tables and graphs.
                  </p>

                  <div className="mt-6 grid gap-5">
                    <Slider label="Category balance" value={categoryBalance} min={10} max={90} onChange={setCategoryBalance} />
                    <Slider label="Numerical skewness" value={skewness} min={0} max={80} onChange={setSkewness} />
                    <Slider label="Outlier pressure" value={outliers} min={0} max={50} onChange={setOutliers} />
                    <Slider label="Sample size" value={sampleSize} min={40} max={300} onChange={setSampleSize} />
                  </div>
                </div>

                <div className="border-t border-neutral-200 bg-neutral-950 p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                    Studio advice
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    What should the student notice?
                  </h2>

                  <p className="mt-6 text-lg leading-9 text-white/80">
                    {graphAdvice}
                  </p>

                  <div className="mt-8 grid gap-3">
                    <MetricDark label="Total count" value={`${totalCount}`} />
                    <MetricDark label="Largest bar" value={`${Math.max(...categoricalBars.map((b) => b.count))}`} />
                    <MetricDark label="Histogram peak" value={`${maxHistogram}`} />
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Frequency table and bar chart
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                  Categorical data need counts and percentages.
                </h2>

                <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-neutral-200">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-neutral-950 text-white">
                      <tr>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Count</th>
                        <th className="px-4 py-3">Percent</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 bg-white">
                      {categoricalBars.map((item) => (
                        <tr key={item.label}>
                          <td className="px-4 py-3 font-bold">{item.label}</td>
                          <td className="px-4 py-3">{item.count}</td>
                          <td className="px-4 py-3">
                            {((item.count / totalCount) * 100).toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 space-y-4 rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5">
                  {categoricalBars.map((bar) => {
                    const percent = (bar.count / totalCount) * 100;
                    return (
                      <div key={bar.label}>
                        <div className="mb-2 flex justify-between text-xs font-black uppercase tracking-[0.16em] text-neutral-500">
                          <span>{bar.label}</span>
                          <span>{percent.toFixed(1)}%</span>
                        </div>
                        <div className="h-5 rounded-full bg-white">
                          <div
                            className="h-5 rounded-full bg-neutral-950 transition-all"
                            style={{
                              width: `${percent}%`,
                              animation: "barGrow 0.8s ease-out",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Numerical distribution
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                  Histograms and dot plots show shape.
                </h2>

                <div className="mt-6 rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5">
                  <div className="flex h-60 items-end gap-2 rounded-[1.5rem] bg-white p-4">
                    {histogramBins.map((bin) => (
                      <div key={bin.label} className="flex flex-1 flex-col items-center gap-2">
                        <div
                          className="w-full rounded-t-xl bg-neutral-950 transition-all"
                          style={{
                            height: `${(bin.value / maxHistogram) * 190}px`,
                            animation: "barGrow 0.8s ease-out",
                          }}
                        />
                        <span className="text-[0.65rem] font-bold text-neutral-500">
                          {bin.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5">
                  <div className="relative h-56 rounded-[1.5rem] bg-white p-4">
                    {dotValues.map((dot) => (
                      <div
                        key={dot.id}
                        className={`absolute h-3 w-3 rounded-full ${
                          dot.outlier ? "bg-[#8b1116]" : "bg-neutral-950"
                        }`}
                        style={{
                          left: `${dot.value}%`,
                          bottom: `${10 + (dot.id % 12) * 7}%`,
                          animation: dot.outlier
                            ? "dotPulse 2.4s ease-in-out infinite"
                            : undefined,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </section>
            </section>

            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Boxplot concept
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                A boxplot compresses a numerical distribution.
              </h2>

              <div className="mt-8 rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6">
                <div className="relative h-24 rounded-full bg-white">
                  <div
                    className="absolute top-1/2 h-1 -translate-y-1/2 bg-neutral-500"
                    style={{
                      left: `${boxSummary.min}%`,
                      width: `${boxSummary.max - boxSummary.min}%`,
                    }}
                  />
                  <div
                    className="absolute top-1/2 h-14 -translate-y-1/2 rounded-xl border-2 border-neutral-950 bg-white"
                    style={{
                      left: `${boxSummary.q1}%`,
                      width: `${boxSummary.q3 - boxSummary.q1}%`,
                    }}
                  />
                  <div
                    className="absolute top-1/2 h-16 w-1 -translate-y-1/2 rounded-full bg-[#8b1116]"
                    style={{ left: `${boxSummary.median}%` }}
                  />
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-5">
                  <Metric label="Min" value={boxSummary.min.toFixed(0)} />
                  <Metric label="Q1" value={boxSummary.q1.toFixed(0)} />
                  <Metric label="Median" value={boxSummary.median.toFixed(0)} />
                  <Metric label="Q3" value={boxSummary.q3.toFixed(0)} />
                  <Metric label="Max" value={boxSummary.max.toFixed(0)} />
                </div>
              </div>
            </section>
          </section>
        )}

        {activeTab === "Graph Chooser" && (
          <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Graph chooser
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Match the display to the variable.
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {graphRules.map((item) => (
                <article
                  key={item.variable}
                  className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
                >
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
                    {item.variable}
                  </p>
                  <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">
                    {item.display}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-700">
                    {item.why}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Worked Examples" && (
          <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Worked examples
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Choose a table, choose a graph, explain the pattern.
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
                <AnswerCard title="Variable type" body={activeScenario.variableType} />
                <AnswerCard title="Suitable table" body={activeScenario.suitableTable} />
                <AnswerCard title="Suitable graph" body={activeScenario.suitableGraph} />
                <AnswerCard title="Interpretation" body={activeScenario.interpretation} />
                <AnswerCard title="Caution" body={activeScenario.warning} />
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
              Practise choosing displays.
            </h2>

            <div className="mt-8 grid gap-5">
              {practiceTasks.map((exercise, index) => (
                <article
                  key={exercise.title}
                  className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
                >
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
                    Practice task {index + 1}
                  </p>
                  <h3 className="mt-3 text-xl font-black tracking-[-0.035em]">
                    {exercise.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-700">
                    {exercise.task}
                  </p>
                  <div className="mt-4 grid gap-2">
                    {exercise.prompts.map((prompt) => (
                      <div
                        key={prompt}
                        className="rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-7 text-neutral-700"
                      >
                        {prompt}
                      </div>
                    ))}
                  </div>
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
              Write a visual interpretation.
            </h2>

            <div className="mt-8 grid gap-5">
              {[
                "Explain the difference between a frequency and a relative frequency.",
                "Describe when a bar chart is better than a histogram.",
                "Explain why a graph with a truncated axis can mislead.",
                "Write a short paragraph interpreting a histogram with right skew and outliers.",
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
                “This graph shows _____. The main pattern is _____. One possible
                limitation is _____. A careful conclusion is _____.”
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
