"use client";

import LockedLessonGate from "@/components/course/LockedLessonGate";
import { isStatisticsFoundationLessonOpen } from "@/lib/statisticsFoundationAccess";


import { useMemo, useState } from "react";

const tabs = [
  "Learning Route",
  "Lecture",
  "Detailed Notes",
  "Visual Studio",
  "Animated Mentor",
  "Worked Examples",
  "Practice Studio",
  "Reflection",
  "Quiz",
];

const learningRoute = [
  {
    time: "0–10 min",
    title: "Why data type matters",
    body:
      "Understand why the type of data controls the summary, graph, interpretation and later statistical method.",
  },
  {
    time: "10–25 min",
    title: "Categorical data",
    body:
      "Learn nominal, ordinal and binary variables, and how they should be summarised.",
  },
  {
    time: "25–40 min",
    title: "Numerical data",
    body:
      "Distinguish discrete and continuous numerical data, and understand appropriate summaries.",
  },
  {
    time: "40–55 min",
    title: "Measurement scales",
    body:
      "Explore nominal, ordinal, interval and ratio scales, with careful examples.",
  },
  {
    time: "55–70 min",
    title: "Visual studio",
    body:
      "Use an interactive data-type lab to compare bar charts, dot plots, histograms and missingness.",
  },
  {
    time: "70–85 min",
    title: "Practice, reflection and quiz",
    body:
      "Classify variables, choose summaries, avoid common mistakes and complete the quiz.",
  },
];

const lectureConcepts = [
  {
    title: "A variable type is a decision point",
    body:
      "Before calculating anything, ask what kind of variable you have. The answer determines whether counts, percentages, means, medians, bar charts, histograms or other summaries make sense.",
    example:
      "Degree subject is categorical, so counts and percentages are useful. Study hours is numerical, so mean, median and spread may be useful.",
  },
  {
    title: "Numbers are not always numerical data",
    body:
      "Some variables look numerical because they use numbers, but the numbers may be labels or ordered categories. A student ID is not a numerical measurement. A 1–5 satisfaction score is ordered, but the gap between 1 and 2 may not equal the gap between 4 and 5.",
    example:
      "Postcode, student ID and phone number contain numbers but should not be averaged.",
  },
  {
    title: "Graphs must match the data type",
    body:
      "A graph is not decoration. It is a statistical display. Bar charts are useful for categories. Histograms are useful for continuous numerical variables. Ordered categories should preserve their order.",
    example:
      "A histogram of degree subject is inappropriate; a bar chart is better.",
  },
  {
    title: "Data type affects interpretation",
    body:
      "The same research question may require different interpretations depending on variable type. A mean is meaningful for many numerical variables, but may be misleading for ordinal categories.",
    example:
      "Average blood pressure is interpretable. Average satisfaction category may hide important response patterns.",
  },
];

const dataTypeCards = [
  {
    title: "Categorical nominal",
    short: "Labels with no natural order.",
    detail:
      "Nominal variables divide observations into named groups. The groups are different, but there is no natural ranking. You should usually summarise nominal variables using counts, percentages and bar charts. Means are not meaningful because the categories are not numerical quantities.",
    examples: "Degree subject, blood group, treatment group, country, eye colour.",
    summaries: "Counts, percentages, mode, bar chart.",
    caution:
      "Do not calculate an average of category labels, even if they are coded with numbers.",
  },
  {
    title: "Categorical ordinal",
    short: "Categories with a meaningful order.",
    detail:
      "Ordinal variables have ordered categories, but the distance between categories is not necessarily equal. They are common in questionnaires and rating scales. Ordinal data should preserve the order in tables and graphs. Medians, percentages and ordered bar charts are often useful.",
    examples: "Satisfaction: poor, fair, good, excellent; disease severity; education level.",
    summaries: "Counts, percentages, median category, ordered bar chart.",
    caution:
      "Be careful with means because the difference between adjacent categories may not be equal.",
  },
  {
    title: "Binary",
    short: "A special categorical variable with two possible values.",
    detail:
      "Binary variables have two categories. They are common in health, education and survey data. They are usually summarised using proportions or percentages. Binary variables can be coded as 0/1 for analysis, but the meaning of the coding must be clear.",
    examples: "Pass/fail, yes/no, disease/no disease, smoker/non-smoker.",
    summaries: "Counts, percentages, proportion, risk.",
    caution:
      "Always state what the 1 or positive category means.",
  },
  {
    title: "Numerical discrete",
    short: "Count data using whole numbers.",
    detail:
      "Discrete numerical variables are counts. They usually take non-negative whole number values. They can be summarised with means, medians and frequency tables, but their count nature should be remembered, especially when values are small or highly skewed.",
    examples: "Number of absences, number of hospital visits, number of siblings.",
    summaries: "Mean, median, range, count plot, frequency table.",
    caution:
      "Counts are numerical, but they are not continuous measurements.",
  },
  {
    title: "Numerical continuous",
    short: "Measurements on a scale.",
    detail:
      "Continuous numerical variables are measured on a scale and may take many possible values. They are often summarised using mean, median, standard deviation, range and interquartile range. Histograms, boxplots and dot plots are useful for exploring their distribution.",
    examples: "Height, weight, blood pressure, study time, temperature.",
    summaries: "Mean, median, standard deviation, IQR, histogram, boxplot.",
    caution:
      "Check for skewness and outliers before relying on the mean alone.",
  },
  {
    title: "Time-to-event",
    short: "Time until a defined event occurs.",
    detail:
      "Time-to-event data measure how long it takes for an event to occur. These variables are common in medical statistics and require special care when some individuals have not yet experienced the event. This leads to censoring, which is introduced later in the course.",
    examples: "Time to recovery, time to relapse, survival time, time until graduation.",
    summaries: "Median time, survival curve, event rate, censoring summary.",
    caution:
      "Do not ignore people who have not yet had the event; censoring matters.",
  },
];

const measurementScales = [
  {
    title: "Nominal scale",
    body:
      "Values are names or labels. They identify groups but do not imply order.",
    example: "Blood group: A, B, AB, O.",
  },
  {
    title: "Ordinal scale",
    body:
      "Values are ordered, but distances between levels may not be equal.",
    example: "Pain level: mild, moderate, severe.",
  },
  {
    title: "Interval scale",
    body:
      "Differences are meaningful, but there is no true zero point.",
    example: "Temperature in Celsius.",
  },
  {
    title: "Ratio scale",
    body:
      "Differences and ratios are meaningful, and there is a true zero.",
    example: "Weight, height, time, income.",
  },
];

const commonMistakes = [
  {
    mistake: "Averaging labels",
    correction:
      "Do not average nominal categories such as treatment group, blood group or degree subject.",
  },
  {
    mistake: "Ignoring order",
    correction:
      "Ordinal variables should be displayed in their natural order, not alphabetically.",
  },
  {
    mistake: "Using only the mean",
    correction:
      "For skewed numerical data, the median and interquartile range may be more informative.",
  },
  {
    mistake: "Treating ID numbers as measurements",
    correction:
      "Student IDs, patient IDs and postcodes are identifiers, not numerical variables.",
  },
];

const scenarios = [
  {
    title: "Student learning survey",
    question:
      "A university collects degree subject, study hours per week, satisfaction from 1 to 5, pass/fail status and number of missed classes.",
    variables: [
      ["Degree subject", "Categorical nominal", "Counts and percentages"],
      ["Study hours", "Numerical continuous", "Mean, median, histogram"],
      ["Satisfaction 1–5", "Ordinal", "Ordered bar chart, median"],
      ["Pass/fail status", "Binary", "Pass percentage"],
      ["Missed classes", "Numerical discrete", "Mean, median, count plot"],
    ],
    warning:
      "The satisfaction score is ordered but not necessarily equally spaced, so interpretation of the mean should be cautious.",
  },
  {
    title: "Clinic patient dataset",
    question:
      "A clinic records age, blood pressure, diabetes status, symptom severity and number of GP visits.",
    variables: [
      ["Age", "Numerical continuous", "Mean, median, histogram"],
      ["Blood pressure", "Numerical continuous", "Mean, SD, histogram"],
      ["Diabetes status", "Binary", "Percentage with diabetes"],
      ["Symptom severity", "Ordinal", "Ordered percentages"],
      ["GP visits", "Numerical discrete", "Count summary"],
    ],
    warning:
      "GP visits may be skewed because most patients have few visits and a small number have many.",
  },
  {
    title: "Research methods form",
    question:
      "A research team records participant ID, country, education level, consent status, completion time and confidence rating.",
    variables: [
      ["Participant ID", "Identifier", "Do not average"],
      ["Country", "Categorical nominal", "Counts and percentages"],
      ["Education level", "Ordinal", "Ordered bar chart"],
      ["Consent status", "Binary", "Consent percentage"],
      ["Completion time", "Numerical continuous", "Median, IQR, histogram"],
    ],
    warning:
      "Participant ID may contain numbers, but it is not a numerical measurement.",
  },
];

const mentorTopics = [
  {
    id: "why",
    label: "Why data type matters",
    answer:
      "Data type matters because it controls what summaries and graphs are meaningful. A bar chart may be useful for categorical data, while a histogram is useful for continuous numerical data.",
  },
  {
    id: "ordinal",
    label: "Ordinal variables",
    answer:
      "Ordinal variables have order, but the distance between levels may not be equal. This is why ordered percentages or medians are often safer than treating the scale as perfectly numerical.",
  },
  {
    id: "numbers",
    label: "Numbers as labels",
    answer:
      "Not every number is a measurement. Student ID, postcode and treatment code may contain numbers, but they are labels. Averaging them would not make statistical sense.",
  },
  {
    id: "continuous",
    label: "Continuous variables",
    answer:
      "Continuous variables are measured on a scale. They can often be summarised with mean and standard deviation, but you should inspect skewness and outliers first.",
  },
  {
    id: "summary",
    label: "Choose a summary",
    answer:
      "Choose summaries that match the variable. Use percentages for categories, medians for ordered categories or skewed numerical data, and means when numerical data are reasonably symmetric.",
  },
];

const practiceTasks = [
  {
    title: "Classify a university dataset",
    task:
      "A dataset contains student ID, age, course, attendance percentage, final grade band and whether the student passed.",
    prompts: [
      "Identify which variable is only an identifier.",
      "Classify each remaining variable.",
      "Choose one suitable graph for each variable.",
    ],
  },
  {
    title: "Choose the right summary",
    task:
      "A health dataset contains waiting time, treatment group, pain severity, readmission status and number of previous admissions.",
    prompts: [
      "Which variables should be summarised with percentages?",
      "Which variable may be skewed?",
      "Which variable is ordinal?",
    ],
  },
  {
    title: "Find the mistake",
    task:
      "A student calculates the average of postcode, blood group and satisfaction category.",
    prompts: [
      "Explain why averaging postcode is wrong.",
      "Explain why averaging blood group is wrong.",
      "Explain why satisfaction category needs caution.",
    ],
  },
];

const quizQuestions = [
  {
    question: "Which variable is categorical nominal?",
    options: [
      "Blood pressure",
      "Number of absences",
      "Degree subject",
      "Study hours",
    ],
    answer: 2,
    feedback:
      "Degree subject is categorical nominal because it is a label with no natural order.",
  },
  {
    question: "Which variable is ordinal?",
    options: [
      "Satisfaction: poor, fair, good, excellent",
      "Height in centimetres",
      "Number of hospital visits",
      "Patient ID",
    ],
    answer: 0,
    feedback:
      "Satisfaction categories have a meaningful order, so they are ordinal.",
  },
  {
    question: "Why should student ID not be averaged?",
    options: [
      "Because it is always missing.",
      "Because it is an identifier, not a numerical measurement.",
      "Because it is continuous.",
      "Because it has too many decimals.",
    ],
    answer: 1,
    feedback:
      "An ID number is a label used to identify a unit. Its average has no meaningful interpretation.",
  },
  {
    question: "Which graph is usually suitable for a continuous numerical variable?",
    options: ["Histogram", "Pie chart only", "Stack of names", "Map of labels"],
    answer: 0,
    feedback:
      "A histogram is commonly used to show the distribution of a continuous numerical variable.",
  },
  {
    question: "Which statement is most careful?",
    options: [
      "All variables coded with numbers are numerical measurements.",
      "Variable type should be identified before choosing summaries and graphs.",
      "Ordinal variables have no order.",
      "Categorical variables should always be summarised using means.",
    ],
    answer: 1,
    feedback:
      "The variable type should guide the choice of summary, graph and interpretation.",
  },
];

export default function TypesOfDataLesson() {
  const lessonCode = "1.3";

  if (!isStatisticsFoundationLessonOpen(lessonCode)) {
    return (
      <LockedLessonGate
        lessonCode={lessonCode}
        lessonTitle="Types of data"
        moduleTitle="Module 1: Introduction to Statistical Thinking"
      />
    );
  }

  const [activeTab, setActiveTab] = useState("Learning Route");
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [categoricalShare, setCategoricalShare] = useState(45);
  const [skewness, setSkewness] = useState(25);
  const [missingness, setMissingness] = useState(8);
  const [sampleSize, setSampleSize] = useState(120);
  const [mentorTopic, setMentorTopic] = useState("why");
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(
    {},
  );

  const activeScenario = scenarios[scenarioIndex];
  const activeMentor =
    mentorTopics.find((topic) => topic.id === mentorTopic) ?? mentorTopics[0];

  const studio = useMemo(() => {
    const numericalShare = 100 - categoricalShare;
    const usableData = Math.round(sampleSize * (1 - missingness / 100));
    const missingRows = sampleSize - usableData;

    let recommendation =
      "Use both categorical and numerical summaries because the dataset is mixed.";
    if (categoricalShare > 65) {
      recommendation =
        "The dataset is mostly categorical. Counts, percentages and bar charts will be central.";
    } else if (categoricalShare < 35) {
      recommendation =
        "The dataset is mostly numerical. Means, medians, spread and distribution plots will be central.";
    }

    let numericalSummary = "Mean and median should both be considered.";
    if (skewness > 55) {
      numericalSummary =
        "The numerical variable is strongly skewed, so the median and IQR may be safer than the mean alone.";
    } else if (skewness < 20) {
      numericalSummary =
        "The numerical variable is fairly balanced, so the mean and standard deviation may be reasonable.";
    }

    return {
      numericalShare,
      usableData,
      missingRows,
      recommendation,
      numericalSummary,
    };
  }, [categoricalShare, missingness, sampleSize, skewness]);

  const categoryBars = useMemo(() => {
    const a = Math.max(8, categoricalShare - 20);
    const b = Math.max(8, 100 - categoricalShare - 5);
    const c = Math.max(8, 45 + missingness / 2);
    const d = Math.max(8, 30 + skewness / 3);
    const total = a + b + c + d;

    return [
      { label: "A", value: Math.round((a / total) * 100) },
      { label: "B", value: Math.round((b / total) * 100) },
      { label: "C", value: Math.round((c / total) * 100) },
      { label: "D", value: Math.round((d / total) * 100) },
    ];
  }, [categoricalShare, missingness, skewness]);

  const dotValues = useMemo(() => {
    return Array.from({ length: 60 }, (_, index) => {
      const base = 18 + ((index * 13) % 55);
      const shift = index % 9 === 0 ? skewness : 0;
      const missing = index < Math.round(missingness / 2);
      return {
        id: index,
        value: Math.min(96, base + shift),
        missing,
      };
    });
  }, [missingness, skewness]);

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

        @keyframes signalMove {
          0% { transform: translateX(-100%); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }

        @keyframes dotPulse {
          0%, 100% { transform: scale(1); opacity: 0.86; }
          50% { transform: scale(1.18); opacity: 1; }
        }
      `}</style>

      <section className="mx-auto max-w-7xl">
        <a
          href="/courses/statistics-foundation/modules/introduction-to-statistical-thinking/"
          className="text-sm font-black text-[#741018] hover:text-[#4d080e]"
        >
          ← Back to module
        </a>

        <section className="mt-8 overflow-hidden rounded-[2.5rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 md:p-10">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Statistics Foundation · Lesson 1.3
              </p>

              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-7xl">
                Types of data.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">
                Data type is one of the first decisions in statistical thinking.
                It determines how a variable should be summarised, visualised
                and interpreted. This lesson develops a careful understanding
                of categorical, numerical, ordinal, binary and time-to-event
                data.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "80–90 minutes",
                  "No coding",
                  "Visual studio",
                  "Variable classifier",
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
                From raw variables to correct summaries.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Identify the variable",
                  "Classify the type",
                  "Choose summary",
                  "Choose graph",
                  "Check missingness",
                  "Interpret carefully",
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
                80–90 minute lesson plan
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Learn to recognise data before analysing it.
              </h2>

              <p className="mt-5 text-base leading-8 text-[#525252]">
                This lesson is designed to slow students down before analysis.
                Many statistical mistakes happen because the wrong summary or
                graph is chosen for the data type. By the end, you should be
                able to look at a variable and immediately ask: what type of data
                is this, what summary is suitable, and what interpretation is
                safe?
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
                By the end, you should be able to classify variables confidently.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Separate categorical and numerical variables.",
                  "Distinguish nominal, ordinal and binary variables.",
                  "Distinguish discrete and continuous numerical variables.",
                  "Recognise ID numbers and codes as labels, not measurements.",
                  "Choose suitable summaries and visual displays.",
                  "Explain why missingness and skewness affect interpretation.",
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
            <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
              <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Concept board
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Data type controls the statistical route.
                </h2>

                <p className="mt-4 text-base leading-8 text-[#525252]">
                  In Lesson 1.2, we learned that a variable is something measured
                  on each unit. Now we ask what kind of variable it is. This is
                  not a small detail. It controls the summary, graph and meaning.
                </p>

                <div className="mt-6 grid gap-4">
                  {lectureConcepts.map((concept, index) => (
                    <article
                      key={concept.title}
                      className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
                    >
                      <div className="flex items-start gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#11100E] text-sm font-black text-white">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="text-xl font-black tracking-[-0.035em]">
                            {concept.title}
                          </h3>
                          <p className="mt-2 text-sm leading-7 text-[#525252]">
                            {concept.body}
                          </p>
                          <p className="mt-3 rounded-2xl bg-[#FFFCF6] px-4 py-3 text-sm font-bold leading-7 text-[#525252]">
                            Example: {concept.example}
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
                  Mr. R teaches students to read variables properly.
                </h2>

                <div className="mt-6 grid gap-4">
                  <Dialogue
                    speaker="Mr. R"
                    text="In the previous lesson, we learned to identify variables. Today we ask a deeper question: what type of data does each variable contain?"
                  />
                  <Dialogue
                    speaker="Amelia"
                    text="Why does the type matter if the data are already collected?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Because the type tells us which summaries and graphs make sense. A mean is useful for many numerical variables, but meaningless for labels like blood group."
                  />
                  <Dialogue
                    speaker="Ben"
                    text="So if a variable uses numbers, can I always treat it as numerical?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="No. Some numbers are only codes. A student ID is not a measurement. Averaging ID numbers would not answer any meaningful question."
                  />
                  <Dialogue
                    speaker="Chloe"
                    text="What about ratings from 1 to 5? They are numbers, but also categories."
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Excellent question. A 1–5 rating is usually ordinal. The order matters, but the distance between categories may not be equal."
                  />
                  <Dialogue
                    speaker="Daniel"
                    text="So choosing a summary is also an interpretation decision."
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Exactly. Good statistics is not only about calculation. It is about choosing a calculation that respects the data."
                  />
                </div>
              </section>
            </section>

            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Variable decision tree
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Ask these questions before summarising any variable.
              </h2>

              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    step: "1",
                    title: "Is it an identifier?",
                    body:
                      "If it only labels a person or unit, do not analyse it as a measurement.",
                  },
                  {
                    step: "2",
                    title: "Is it a category?",
                    body:
                      "If values are labels or groups, use counts, percentages and bar charts.",
                  },
                  {
                    step: "3",
                    title: "Is it ordered?",
                    body:
                      "If categories have order, preserve that order in summaries and graphs.",
                  },
                  {
                    step: "4",
                    title: "Is it numerical?",
                    body:
                      "If values are real measurements or counts, examine centre, spread and shape.",
                  },
                ].map((item) => (
                  <article
                    key={item.step}
                    className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
                  >
                    <span className="rounded-full bg-[#11100E] px-3 py-1 text-xs font-black text-white">
                      Question {item.step}
                    </span>
                    <h3 className="mt-4 text-lg font-black tracking-[-0.03em]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#525252]">
                      {item.body}
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
              Types of data in depth.
            </h2>

            <p className="mt-5 max-w-4xl text-base leading-8 text-[#525252]">
              Every variable carries information in a particular form. The
              statistical method must respect that form. A poor choice of
              summary can make a correct dataset misleading.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {dataTypeCards.map((note) => (
                <article
                  key={note.title}
                  className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
                >
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
                    {note.short}
                  </p>
                  <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">
                    {note.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#525252]">
                    {note.detail}
                  </p>
                  <p className="mt-4 rounded-2xl bg-[#FFFCF6] px-4 py-3 text-sm font-bold leading-7 text-[#525252]">
                    Examples: {note.examples}
                  </p>
                  <p className="mt-3 rounded-2xl bg-[#11100E] px-4 py-3 text-sm font-bold leading-7 text-white">
                    Useful summaries: {note.summaries}
                  </p>
                  <p className="mt-3 rounded-2xl border border-[#741018]/20 bg-[#fff4ef] px-4 py-3 text-sm font-bold leading-7 text-[#741018]">
                    Caution: {note.caution}
                  </p>
                </article>
              ))}
            </div>

            <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                Measurement scales
              </p>

              <h3 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                Nominal, ordinal, interval and ratio.
              </h3>

              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {measurementScales.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[1.5rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5"
                  >
                    <h4 className="text-xl font-black">{item.title}</h4>
                    <p className="mt-3 text-sm leading-7 text-white/70">
                      {item.body}
                    </p>
                    <p className="mt-4 rounded-2xl bg-[#FFFCF6] px-4 py-3 text-sm font-bold leading-7 text-neutral-900">
                      {item.example}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Common mistakes
              </p>

              <h3 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                Errors that lead to weak interpretation.
              </h3>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {commonMistakes.map((item) => (
                  <article
                    key={item.mistake}
                    className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
                      Mistake
                    </p>
                    <h4 className="mt-2 text-xl font-black tracking-[-0.035em]">
                      {item.mistake}
                    </h4>
                    <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-[#7a7063]">
                      Better thinking
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#525252]">
                      {item.correction}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </section>
        )}

        {activeTab === "Visual Studio" && (
          <section className="mt-8 grid gap-6">
            <section className="overflow-hidden rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="p-6 md:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                    Data type studio
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    Change the dataset and choose the right display.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-[#525252]">
                    Move the controls to create a mixed dataset. Watch how the
                    recommendation changes depending on the balance of
                    categorical variables, numerical variables, skewness and
                    missingness.
                  </p>

                  <div className="mt-6 grid gap-5">
                    <Slider
                      label="Categorical share"
                      value={categoricalShare}
                      min={10}
                      max={90}
                      onChange={setCategoricalShare}
                    />
                    <Slider
                      label="Numerical skewness"
                      value={skewness}
                      min={0}
                      max={80}
                      onChange={setSkewness}
                    />
                    <Slider
                      label="Missingness"
                      value={missingness}
                      min={0}
                      max={35}
                      onChange={setMissingness}
                    />
                    <Slider
                      label="Sample size"
                      value={sampleSize}
                      min={40}
                      max={300}
                      onChange={setSampleSize}
                    />
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Metric label="Categorical" value={`${categoricalShare}%`} />
                    <Metric label="Numerical" value={`${studio.numericalShare}%`} />
                    <Metric label="Usable rows" value={`${studio.usableData}`} />
                    <Metric label="Missing rows" value={`${studio.missingRows}`} />
                  </div>
                </div>

                <div className="border-t border-[#E4DED2] bg-[#11100E] p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                    Studio recommendation
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    What should the student do?
                  </h2>

                  <div className="mt-6 grid gap-4">
                    <article className="rounded-[1.5rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5">
                      <h3 className="text-xl font-black">Dataset mix</h3>
                      <p className="mt-3 text-sm leading-7 text-white/70">
                        {studio.recommendation}
                      </p>
                    </article>

                    <article className="rounded-[1.5rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5">
                      <h3 className="text-xl font-black">Numerical summary</h3>
                      <p className="mt-3 text-sm leading-7 text-white/70">
                        {studio.numericalSummary}
                      </p>
                    </article>

                    <article className="rounded-[1.5rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5">
                      <h3 className="text-xl font-black">Missingness caution</h3>
                      <p className="mt-3 text-sm leading-7 text-white/70">
                        Missing data should be reported. If missingness is not
                        random, the final conclusion may be biased.
                      </p>
                    </article>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
              <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Categorical display
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                  Bar charts compare categories.
                </h2>

                <div className="mt-6 rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
                  <div className="space-y-4">
                    {categoryBars.map((bar) => (
                      <div key={bar.label}>
                        <div className="mb-2 flex justify-between text-xs font-black uppercase tracking-[0.16em] text-[#7a7063]">
                          <span>Category {bar.label}</span>
                          <span>{bar.value}%</span>
                        </div>
                        <div className="h-5 rounded-full bg-[#FFFCF6]">
                          <div
                            className="h-5 rounded-full bg-[#11100E] transition-all"
                            style={{ width: `${bar.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-[#525252]">
                  For categorical data, the height or length of each bar
                  represents a count or percentage. The categories should be
                  labelled clearly. For ordinal data, preserve the order.
                </p>
              </section>

              <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Numerical display
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                  Dot plots reveal spread and skewness.
                </h2>

                <div className="mt-6 rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
                  <div className="relative h-64 rounded-[1.5rem] bg-[#FFFCF6] p-4">
                    {dotValues.map((dot) => (
                      <div
                        key={dot.id}
                        className={`absolute h-3 w-3 rounded-full ${
                          dot.missing ? "bg-[#741018]/35" : "bg-[#11100E]"
                        }`}
                        style={{
                          left: `${dot.value}%`,
                          bottom: `${10 + (dot.id % 12) * 7}%`,
                          animation: dot.missing
                            ? undefined
                            : "dotPulse 3s ease-in-out infinite",
                        }}
                      />
                    ))}
                  </div>

                  <div className="mt-4 grid gap-3 text-sm leading-7 text-[#525252] md:grid-cols-2">
                    <div className="rounded-2xl bg-[#FFFCF6] p-4">
                      <strong>Dark dots:</strong> observed numerical values.
                    </div>
                    <div className="rounded-2xl bg-[#FFFCF6] p-4">
                      <strong>Red dots:</strong> missing or unusable values.
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-[#525252]">
                  For numerical data, always inspect the shape. If the data are
                  skewed or contain outliers, the median may describe the centre
                  better than the mean.
                </p>
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
                Ask Mr. R about data types.
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
                  Choose five variables from a real dataset. For each one, write
                  the data type, one suitable summary and one suitable graph.
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
              Classify variables and choose summaries.
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
                {activeScenario.variables.map(([variable, type, summary]) => (
                  <AnswerCard
                    key={variable}
                    title={variable}
                    body={`${type}. Suitable summary: ${summary}.`}
                  />
                ))}
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-[#741018]/20 bg-[#fff4ef] p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
                  Caution
                </p>
                <p className="mt-3 text-sm leading-7 text-[#525252]">
                  {activeScenario.warning}
                </p>
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
              Practise classifying data types.
            </h2>

            <div className="mt-8 grid gap-5">
              {practiceTasks.map((exercise, index) => (
                <article
                  key={exercise.title}
                  className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
                >
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
                    Practice task {index + 1}
                  </p>
                  <h3 className="mt-3 text-xl font-black tracking-[-0.035em]">
                    {exercise.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#525252]">
                    {exercise.task}
                  </p>

                  <div className="mt-4 grid gap-2">
                    {exercise.prompts.map((prompt) => (
                      <div
                        key={prompt}
                        className="rounded-2xl bg-[#FFFCF6] px-4 py-3 text-sm font-bold leading-7 text-[#525252]"
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
          <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
              Reflection task
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Write like a careful statistician.
            </h2>

            <div className="mt-8 grid gap-5">
              {[
                {
                  title: "Prompt 1",
                  body:
                    "Explain why numbers used as labels should not be treated as numerical measurements.",
                },
                {
                  title: "Prompt 2",
                  body:
                    "Choose one ordinal variable and explain why the mean may be difficult to interpret.",
                },
                {
                  title: "Prompt 3",
                  body:
                    "Describe the difference between a bar chart and a histogram.",
                },
                {
                  title: "Prompt 4",
                  body:
                    "Write a short paragraph explaining why data type should be checked before analysis.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
                >
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#525252]">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>

            <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                Model answer structure
              </p>
              <p className="mt-4 text-base leading-8 text-white/75">
                “This variable is _____. A suitable summary is _____ because
                _____. A suitable graph is _____. The interpretation should be
                cautious because _____.”
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
