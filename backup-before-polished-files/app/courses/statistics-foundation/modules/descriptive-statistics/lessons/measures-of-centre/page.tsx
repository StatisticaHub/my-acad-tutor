"use client";

import { useMemo, useState, type ReactNode } from "react";

const tabs = [
  "Lecture",
  "Detailed Notes",
  "Interactive Lab",
  "Worked Examples",
  "Quiz",
];

const quizQuestions = [
  {
    question: "Which measure of centre is the arithmetic balance point?",
    options: ["Median", "Mode", "Mean", "Range"],
    answer: 2,
    explanation:
      "The mean is the arithmetic balance point because the positive and negative deviations from the mean sum to zero.",
  },
  {
    question:
      "Which measure of centre is usually preferred for strongly right-skewed income data?",
    options: ["Mean", "Median", "Mode", "Range"],
    answer: 1,
    explanation:
      "Income data often contain a few very large values. These pull the mean upward, while the median is more resistant.",
  },
  {
    question: "Which measure of centre is meaningful for nominal categories?",
    options: ["Mean", "Median", "Mode", "Variance"],
    answer: 2,
    explanation:
      "For nominal categories such as blood group or eye colour, the mode is meaningful because it gives the most common category.",
  },
  {
    question:
      "For the dataset 4, 5, 6, 7, 100, which statement is most accurate?",
    options: [
      "The median is pulled strongly by 100.",
      "The mean is pulled strongly by 100.",
      "The mode must be 100.",
      "The median cannot be found.",
    ],
    answer: 1,
    explanation:
      "The mean uses every value and is affected by the magnitude of 100. The median depends mainly on ordered position.",
  },
  {
    question:
      "In a roughly symmetric numerical distribution with no serious outliers, what relationship is often expected?",
    options: [
      "Mean and median are close.",
      "Mean is always zero.",
      "Median is always larger than the maximum.",
      "Mode cannot exist.",
    ],
    answer: 0,
    explanation:
      "In a roughly symmetric distribution, the mean and median usually lie close together near the centre.",
  },
];

const moduleLessons = [
  {
    number: "2.1",
    title: "Measures of centre",
    href: "/courses/statistics-foundation/modules/descriptive-statistics/lessons/measures-of-centre",
    active: true,
  },
  {
    number: "2.2",
    title: "Measures of spread",
    href: "/courses/statistics-foundation/modules/descriptive-statistics/lessons/measures-of-spread",
  },
  {
    number: "2.3",
    title: "Shape, skewness and outliers",
    href: "/courses/statistics-foundation/modules/descriptive-statistics/lessons/shape-skewness-outliers",
  },
  {
    number: "2.4",
    title: "Standardisation and z-scores",
    href: "/courses/statistics-foundation/modules/descriptive-statistics/lessons/z-scores",
  },
  {
    number: "2.5",
    title: "Correlation and association",
    href: "/courses/statistics-foundation/modules/descriptive-statistics/lessons/correlation-association",
  },
];

function getMean(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function getMedian(values: number[]) {
  const ordered = [...values].sort((a, b) => a - b);
  const n = ordered.length;
  const middle = Math.floor(n / 2);

  if (n % 2 === 1) return ordered[middle];

  return (ordered[middle - 1] + ordered[middle]) / 2;
}

function getModes(values: number[]) {
  const counts = new Map<number, number>();

  values.forEach((value) => {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  });

  const largestFrequency = Math.max(...Array.from(counts.values()));

  if (largestFrequency === 1) return [];

  return Array.from(counts.entries())
    .filter((entry) => entry[1] === largestFrequency)
    .map((entry) => entry[0])
    .sort((a, b) => a - b);
}

export default function MeasuresOfCentrePage() {
  const [activeTab, setActiveTab] = useState("Lecture");

  return (
    <main className="min-h-screen bg-[#f2efe7] text-neutral-950">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-[#ded9cf] bg-white lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          <div className="border-b border-[#ded9cf] p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
              Statistics Foundation
            </p>
            <h2 className="mt-2 text-lg font-black tracking-tight">
              Module 2 · Descriptive Statistics
            </h2>
          </div>

          <div className="h-1 bg-[#ede8dc]">
            <div className="h-1 w-[24%] bg-blue-600" />
          </div>

          <nav className="p-4">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-neutral-700">
              Course modules
            </p>

            <SidebarLink
              href="/courses/statistics-foundation/modules/introduction-to-statistical-thinking"
              label="Module 1 · Introduction"
            />
            <SidebarLink
              href="/courses/statistics-foundation/modules/descriptive-statistics"
              label="Module 2 · Descriptive statistics"
              active
            />
            <SidebarLink
              href="/courses/statistics-foundation/modules/probability-foundations"
              label="Module 3 · Probability foundations"
            />
            <SidebarLink
              href="/courses/statistics-foundation/modules/random-variables-distributions"
              label="Module 4 · Random variables"
            />
            <SidebarLink
              href="/courses/statistics-foundation/modules/statistical-inference-foundations"
              label="Module 5 · Inference foundations"
            />

            <p className="mb-3 mt-7 text-xs font-black uppercase tracking-[0.18em] text-neutral-700">
              Module 2 lessons
            </p>

            {moduleLessons.map((lesson) => (
              <SidebarLink
                key={lesson.number}
                href={lesson.href}
                label={`${lesson.number} ${lesson.title}`}
                active={lesson.active}
              />
            ))}
          </nav>
        </aside>

        <section className="min-w-0">
          <div className="sticky top-0 z-20 overflow-x-auto border-b border-[#ded9cf] bg-white/95 px-4 backdrop-blur">
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap border-b-2 px-4 py-4 text-sm font-black transition ${
                    activeTab === tab
                      ? "border-blue-600 text-neutral-950"
                      : "border-transparent text-neutral-700 hover:text-neutral-950"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="mx-auto max-w-5xl px-5 py-10 md:px-8">
            <header className="mb-8 rounded-[2rem] border border-[#ded9cf] bg-white p-8 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
                Module 2 · Lesson 2.1
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl md:text-6xl">
                Measures of Centre
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-600">
                Learn how mean, median and mode summarise the centre of a
                dataset, why they can disagree, and how to choose the most
                honest measure for different types and shapes of data.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Badge>Mean</Badge>
                <Badge>Median</Badge>
                <Badge>Mode</Badge>
                <Badge>Outliers</Badge>
                <Badge>Skewness</Badge>
                <Badge>Zero coding</Badge>
              </div>
            </header>

            {activeTab === "Lecture" && <LectureSection />}
            {activeTab === "Detailed Notes" && <NotesSection />}
            {activeTab === "Interactive Lab" && <InteractiveLab />}
            {activeTab === "Worked Examples" && <WorkedExamples />}
            {activeTab === "Quiz" && <QuizSection />}

            <section className="mt-10 flex flex-col gap-4 rounded-[1.7rem] bg-neutral-950 p-6 text-white md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-black tracking-tight">
                  Next lesson: Measures of spread
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70">
                  Centre tells us where the data sit. Spread tells us how
                  tightly or widely the values are scattered around that centre.
                </p>
              </div>
              <a
                href="/courses/statistics-foundation/modules/descriptive-statistics/lessons/measures-of-spread"
                className="rounded-full bg-white px-6 py-3 text-sm font-black text-neutral-950"
              >
                Next lesson →
              </a>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function LectureSection() {
  return (
    <LessonPanel>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
        Lecture
      </p>
      <h2 className="mt-2 text-3xl font-black tracking-tight">
        What does it mean for a value to be “typical”?
      </h2>

      <SceneLabel>Scene — the class has collected its first real dataset</SceneLabel>

      <Dialogue
        speaker="Emma"
        initials="EM"
        side="left"
        text="We collected data in Module 1. Now I suppose we calculate the average?"
      />
      <Dialogue
        speaker="Mr. R"
        initials="MR"
        side="right"
        text="Yes, but today we must be careful. In everyday language, average often means one number. In statistics, there are several ways to define the centre."
      />
      <Dialogue
        speaker="Oliver"
        initials="OL"
        side="left"
        text="So mean, median and mode are not just three names for the same thing?"
      />
      <Dialogue
        speaker="Mr. R"
        initials="MR"
        side="right"
        text="Exactly. They all describe a typical value, but they define typical in different ways."
      />

      <DefinitionBox title="Big idea" tone="amber">
        A measure of centre is a single value chosen to represent the middle,
        balance point, or most typical value of a dataset.
      </DefinitionBox>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        Why centre matters
      </h3>
      <p className="mt-3 leading-8 text-neutral-600">
        Raw data can be long and difficult to interpret. A measure of centre
        compresses many observations into one summary value. This is useful when
        we want to describe a class, a clinical sample, a household survey, a
        biological experiment, or any dataset where many values are observed.
      </p>

      <p className="leading-8 text-neutral-600">
        For example, we might report the average age of participants in a study,
        the median waiting time in a clinic, or the most common blood group in a
        sample. Each of these summaries answers a slightly different question.
      </p>

      <Dialogue
        speaker="James"
        initials="JA"
        side="left"
        text="So centre means the representative value?"
      />
      <Dialogue
        speaker="Mr. R"
        initials="MR"
        side="right"
        text="Yes, but the representative value must match the data type and the shape of the data."
      />
      <Dialogue
        speaker="Sophia"
        initials="SO"
        side="left"
        text="When does the mean become misleading?"
      />
      <Dialogue
        speaker="Mr. R"
        initials="MR"
        side="right"
        text="When the data are skewed or contain extreme values. In those situations, the median may describe the typical observation more honestly."
      />

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        Three meanings of “typical”
      </h3>

      <div className="mt-5 overflow-x-auto rounded-[1.2rem] border border-[#ded9cf]">
        <table className="w-full min-w-[760px] border-collapse bg-white text-sm">
          <thead className="bg-[#f8f6f1]">
            <tr>
              <th className="p-4 text-left font-black">Measure</th>
              <th className="p-4 text-left font-black">What it means</th>
              <th className="p-4 text-left font-black">Best used when</th>
              <th className="p-4 text-left font-black">Main weakness</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-[#ded9cf]">
              <td className="p-4 font-bold">Mean</td>
              <td className="p-4 text-neutral-600">
                Arithmetic balance point of the data
              </td>
              <td className="p-4 text-neutral-600">
                Numerical data are roughly symmetric
              </td>
              <td className="p-4 text-neutral-600">
                Sensitive to outliers
              </td>
            </tr>
            <tr className="border-t border-[#ded9cf]">
              <td className="p-4 font-bold">Median</td>
              <td className="p-4 text-neutral-600">
                Middle value after ordering the data
              </td>
              <td className="p-4 text-neutral-600">
                Data are skewed or contain outliers
              </td>
              <td className="p-4 text-neutral-600">
                Does not use all magnitudes fully
              </td>
            </tr>
            <tr className="border-t border-[#ded9cf]">
              <td className="p-4 font-bold">Mode</td>
              <td className="p-4 text-neutral-600">
                Most frequently occurring value or category
              </td>
              <td className="p-4 text-neutral-600">
                Categorical data or repeated values
              </td>
              <td className="p-4 text-neutral-600">
                May be absent or not unique
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        The mean as a balance point
      </h3>
      <p className="mt-3 leading-8 text-neutral-600">
        The mean is more than a calculation. It is the balancing value of the
        dataset. If every observation were placed on a number line, the mean
        would be the point where the total pull to the left equals the total pull
        to the right.
      </p>

      <MathBlock>x̄ = Σxᵢ / n</MathBlock>

      <Dialogue
        speaker="Emma"
        initials="EM"
        side="left"
        text="If one value is very large, does it pull the mean towards it?"
      />
      <Dialogue
        speaker="Mr. R"
        initials="MR"
        side="right"
        text="Yes. This is why the mean is powerful but also sensitive. Extreme observations pull the balance point."
      />

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        The median as a position
      </h3>
      <p className="mt-3 leading-8 text-neutral-600">
        The median is found by arranging the data from smallest to largest and
        choosing the middle value. If there are two middle values, we take their
        average. The median is resistant because it depends mainly on position,
        not the size of the most extreme values.
      </p>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        The mode as the most common value
      </h3>
      <p className="mt-3 leading-8 text-neutral-600">
        The mode is the value or category that appears most often. It is
        especially important for categorical data, where mean and median may not
        make sense.
      </p>

      <Takeaway
        points={[
          "Measures of centre summarise the typical location of a dataset.",
          "The mean is the arithmetic balance point.",
          "The median is the ordered middle and resists extreme values.",
          "The mode is the most frequent value or category.",
          "The best measure depends on data type, skewness and outliers.",
        ]}
      />
    </LessonPanel>
  );
}

function NotesSection() {
  return (
    <LessonPanel>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
        Detailed notes
      </p>
      <h2 className="mt-2 text-3xl font-black tracking-tight">
        Mean, median and mode in depth
      </h2>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        1. The aim of a measure of centre
      </h3>
      <p className="mt-3 leading-8 text-neutral-600">
        A dataset contains observations. If the observed values are written as
        x₁, x₂, ..., xₙ, then a measure of centre attempts to summarise the
        location of these values using a single number or category. This single
        summary should not be treated as a replacement for the whole dataset,
        but as a first-level description.
      </p>

      <DefinitionBox title="Definition — measure of centre">
        A measure of centre is a statistic that describes a central, typical or
        representative value of a dataset.
      </DefinitionBox>

      <p className="leading-8 text-neutral-600">
        The word centre has more than one mathematical meaning. It may mean a
        balancing point, an ordered middle, or the most common value. These lead
        to the mean, median and mode.
      </p>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        2. The arithmetic mean
      </h3>
      <p className="mt-3 leading-8 text-neutral-600">
        For a sample of n numerical observations x₁, x₂, ..., xₙ, the sample
        mean is:
      </p>

      <MathBlock>x̄ = (x₁ + x₂ + ... + xₙ) / n = Σxᵢ / n</MathBlock>

      <p className="leading-8 text-neutral-600">
        The mean uses every value in the dataset. Because each observation
        contributes its numerical magnitude, unusually large or unusually small
        values can strongly influence the mean.
      </p>

      <DefinitionBox title="Interpretation" tone="green">
        The mean is the value each observation would have if the total amount
        were shared equally among all observations.
      </DefinitionBox>

      <h4 className="mt-6 text-xl font-black tracking-tight">
        The balance property of the mean
      </h4>
      <p className="mt-3 leading-8 text-neutral-600">
        The sample mean has an important mathematical property: the deviations
        from the mean always sum to zero.
      </p>

      <MathBlock>Σ(xᵢ − x̄) = 0</MathBlock>

      <DerivationBox
        title="Why do deviations from the mean sum to zero?"
        steps={[
          {
            math: "Σ(xᵢ − x̄)",
            note: "Start with the sum of deviations from the sample mean.",
          },
          {
            math: "Σxᵢ − Σx̄",
            note: "Separate the sum into two parts.",
          },
          {
            math: "Σxᵢ − nx̄",
            note: "Because x̄ is constant, adding it n times gives nx̄.",
          },
          {
            math: "Σxᵢ − n(Σxᵢ / n)",
            note: "Substitute the formula for the sample mean.",
          },
          {
            math: "Σxᵢ − Σxᵢ = 0",
            note: "So the positive and negative deviations balance exactly.",
          },
        ]}
      />

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        3. The median
      </h3>
      <p className="mt-3 leading-8 text-neutral-600">
        The median is the middle value after the observations are arranged in
        increasing order. It depends on the position of values rather than the
        total magnitude.
      </p>

      <DefinitionBox title="Definition — median" tone="green">
        The median is the value that divides an ordered dataset into two halves:
        about 50% of observations are below it and about 50% are above it.
      </DefinitionBox>

      <p className="leading-8 text-neutral-600">
        If n is odd, the median is the value in position (n + 1) / 2 after
        ordering. If n is even, the median is the average of the two middle
        values in positions n / 2 and n / 2 + 1.
      </p>

      <MathBlock>Odd n: median = value in position (n + 1) / 2</MathBlock>
      <MathBlock>
        Even n: median = average of values in positions n / 2 and n / 2 + 1
      </MathBlock>

      <p className="leading-8 text-neutral-600">
        The median is resistant because an extreme value can move far away
        without changing the middle position very much. This makes the median
        especially useful for skewed variables such as income, waiting time,
        hospital length of stay, house prices and reaction times.
      </p>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        4. The mode
      </h3>
      <p className="mt-3 leading-8 text-neutral-600">
        The mode is the most frequently occurring value or category. It is
        especially important for categorical variables because mean and median
        may not be meaningful.
      </p>

      <DefinitionBox title="Definition — mode" tone="purple">
        The mode is the value or category with the highest frequency in the
        dataset.
      </DefinitionBox>

      <p className="leading-8 text-neutral-600">
        A dataset may have one mode, more than one mode, or no repeated value.
        For categorical data, the mode often gives a useful description of the
        most common group. For example, the modal blood group or modal response
        category may be more meaningful than any numerical average.
      </p>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        5. Comparing mean, median and mode
      </h3>

      <div className="mt-5 overflow-x-auto rounded-[1.2rem] border border-[#ded9cf]">
        <table className="w-full min-w-[760px] border-collapse bg-white text-sm">
          <thead className="bg-[#f8f6f1]">
            <tr>
              <th className="p-4 text-left font-black">Situation</th>
              <th className="p-4 text-left font-black">Usually preferred</th>
              <th className="p-4 text-left font-black">Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-[#ded9cf]">
              <td className="p-4 text-neutral-600">
                Symmetric numerical data with no serious outliers
              </td>
              <td className="p-4 font-bold">Mean</td>
              <td className="p-4 text-neutral-600">
                Uses all values and describes the balance point well.
              </td>
            </tr>
            <tr className="border-t border-[#ded9cf]">
              <td className="p-4 text-neutral-600">
                Skewed numerical data
              </td>
              <td className="p-4 font-bold">Median</td>
              <td className="p-4 text-neutral-600">
                Resistant to long tails and extreme values.
              </td>
            </tr>
            <tr className="border-t border-[#ded9cf]">
              <td className="p-4 text-neutral-600">
                Numerical data with severe outliers
              </td>
              <td className="p-4 font-bold">Median</td>
              <td className="p-4 text-neutral-600">
                Less affected by unusually large or small observations.
              </td>
            </tr>
            <tr className="border-t border-[#ded9cf]">
              <td className="p-4 text-neutral-600">
                Nominal categorical data
              </td>
              <td className="p-4 font-bold">Mode</td>
              <td className="p-4 text-neutral-600">
                The most common category is meaningful; mean is not.
              </td>
            </tr>
            <tr className="border-t border-[#ded9cf]">
              <td className="p-4 text-neutral-600">
                Ordinal categorical data
              </td>
              <td className="p-4 font-bold">Median or mode</td>
              <td className="p-4 text-neutral-600">
                Ordered position and most common category can both be useful.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        6. Relationship with distribution shape
      </h3>
      <p className="mt-3 leading-8 text-neutral-600">
        The relationship between mean and median gives a useful first clue about
        shape:
      </p>

      <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-neutral-600">
        <li>
          In a roughly symmetric distribution, the mean and median are usually
          close.
        </li>
        <li>
          In a right-skewed distribution, the mean is often greater than the
          median.
        </li>
        <li>
          In a left-skewed distribution, the mean is often less than the median.
        </li>
      </ul>

      <MathBlock>Right-skewed: mean &gt; median</MathBlock>
      <MathBlock>Left-skewed: mean &lt; median</MathBlock>

      <DefinitionBox title="Common mistake" tone="red">
        Do not report the mean automatically. First ask: What type of data do I
        have? Is the distribution skewed? Are there outliers? What summary would
        be most interpretable?
      </DefinitionBox>
    </LessonPanel>
  );
}

function InteractiveLab() {
  const [values, setValues] = useState([62, 65, 66, 68, 69, 70, 72, 74, 75]);
  const [newValue, setNewValue] = useState(120);

  const statistics = useMemo(() => {
    const currentMean = getMean(values);
    const currentMedian = getMedian(values);
    const currentModes = getModes(values);

    return {
      ordered: [...values].sort((a, b) => a - b),
      mean: currentMean,
      median: currentMedian,
      modes: currentModes,
      min: Math.min(...values),
      max: Math.max(...values),
      range: Math.max(...values) - Math.min(...values),
    };
  }, [values]);

  function addValue() {
    setValues((previous) => [...previous, newValue]);
  }

  function resetBalanced() {
    setValues([62, 65, 66, 68, 69, 70, 72, 74, 75]);
    setNewValue(120);
  }

  function makeSkewed() {
    setValues([38, 42, 45, 47, 48, 49, 51, 53, 120]);
    setNewValue(140);
  }

  function makeRepeated() {
    setValues([2, 3, 3, 4, 4, 4, 5, 6, 9]);
    setNewValue(4);
  }

  return (
    <LessonPanel>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
        Interactive lab
      </p>
      <h2 className="mt-2 text-3xl font-black tracking-tight">
        Watch how the centre changes
      </h2>

      <p className="mt-4 leading-8 text-neutral-600">
        Use this lab to see why the mean, median and mode behave differently.
        The most important observation is that the mean moves when an extreme
        value is added, while the median usually moves much less.
      </p>

      <div className="mt-6 rounded-[1.5rem] border border-[#ded9cf] bg-[#fbfaf6] p-5">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard label="Mean" value={statistics.mean.toFixed(2)} />
          <StatCard label="Median" value={statistics.median.toFixed(2)} />
          <StatCard
            label="Mode"
            value={
              statistics.modes.length === 0
                ? "None"
                : statistics.modes.join(", ")
            }
          />
          <StatCard label="Range" value={statistics.range.toString()} />
        </div>

        <div className="mt-6">
          <p className="text-sm font-black">Current ordered data</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {statistics.ordered.map((value, index) => (
              <span
                key={`${value}-${index}`}
                className="rounded-full border border-[#ded9cf] bg-white px-3 py-2 text-sm font-bold"
              >
                {value}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-black">Dot display</p>
          <div className="mt-3 rounded-2xl border border-[#ded9cf] bg-white p-4">
            <div className="relative h-28">
              <div className="absolute left-0 right-0 top-14 h-[2px] bg-[#ded9cf]" />

              {statistics.ordered.map((value, index) => {
                const denominator =
                  statistics.max === statistics.min
                    ? 1
                    : statistics.max - statistics.min;
                const left = ((value - statistics.min) / denominator) * 100;

                return (
                  <div
                    key={`${value}-${index}-dot`}
                    className="absolute top-[49px] h-4 w-4 -translate-x-1/2 rounded-full bg-blue-600"
                    style={{ left: `${left}%` }}
                    title={`${value}`}
                  />
                );
              })}

              <Marker
                label="Mean"
                value={statistics.mean}
                min={statistics.min}
                max={statistics.max}
                tone="blue"
              />
              <Marker
                label="Median"
                value={statistics.median}
                min={statistics.min}
                max={statistics.max}
                tone="green"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <label className="text-sm font-black">
              Add a new value: {newValue}
            </label>
            <input
              type="range"
              min="0"
              max="160"
              value={newValue}
              onChange={(event) => setNewValue(Number(event.target.value))}
              className="mt-3 w-full accent-blue-600"
            />
          </div>

          <button
            onClick={addValue}
            className="rounded-full bg-neutral-950 px-5 py-3 text-sm font-black text-white"
          >
            Add value
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={resetBalanced}
            className="rounded-full border border-[#ded9cf] bg-white px-4 py-2 text-sm font-black"
          >
            Balanced dataset
          </button>
          <button
            onClick={makeSkewed}
            className="rounded-full border border-[#ded9cf] bg-white px-4 py-2 text-sm font-black"
          >
            Right-skewed dataset
          </button>
          <button
            onClick={makeRepeated}
            className="rounded-full border border-[#ded9cf] bg-white px-4 py-2 text-sm font-black"
          >
            Repeated values
          </button>
        </div>
      </div>

      <DefinitionBox title="What to notice" tone="amber">
        Add a very large value, such as 140 or 160. The mean moves upward
        because it uses the size of every value. The median changes much less
        because it depends mainly on position.
      </DefinitionBox>
    </LessonPanel>
  );
}

function WorkedExamples() {
  return (
    <LessonPanel>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
        Worked examples
      </p>
      <h2 className="mt-2 text-3xl font-black tracking-tight">
        Step-by-step practice
      </h2>

      <WorkedExample
        title="Example 1 — Mean, median and mode"
        question="Find the mean, median and mode for the dataset: 4, 7, 7, 10, 12."
      >
        <ol className="list-decimal space-y-3 pl-6 leading-8 text-neutral-600">
          <li>The data are already ordered: 4, 7, 7, 10, 12.</li>
          <li>Mean = (4 + 7 + 7 + 10 + 12) / 5 = 40 / 5 = 8.</li>
          <li>
            There are 5 values, so the median is the 3rd value. Median = 7.
          </li>
          <li>The value 7 occurs most often. Mode = 7.</li>
        </ol>
      </WorkedExample>

      <WorkedExample
        title="Example 2 — Effect of an outlier"
        question="Compare the centre of 10, 11, 12, 13, 14 and 10, 11, 12, 13, 100."
      >
        <ol className="list-decimal space-y-3 pl-6 leading-8 text-neutral-600">
          <li>Dataset A: mean = 60 / 5 = 12. Median = 12.</li>
          <li>Dataset B: mean = 146 / 5 = 29.2. Median = 12.</li>
          <li>The extreme value 100 pulls the mean upward strongly.</li>
          <li>The median remains 12 because the middle position has not changed.</li>
          <li>
            Therefore, for Dataset B, the median is a more honest description of
            the typical value.
          </li>
        </ol>
      </WorkedExample>

      <WorkedExample
        title="Example 3 — Choosing the best measure"
        question="A researcher summarises hospital waiting times. Most patients wait 10–30 minutes, but a few wait over 5 hours. Which measure of centre should be reported?"
      >
        <p className="leading-8 text-neutral-600">
          Waiting time is usually right-skewed because a few patients may wait
          much longer than most others. These long waits pull the mean upward.
          The median is usually more informative because it describes the
          typical patient experience more robustly.
        </p>

        <p className="mt-3 font-bold text-neutral-950">
          Recommended summary: median waiting time.
        </p>
      </WorkedExample>

      <WorkedExample
        title="Example 4 — Categorical centre"
        question="A survey records favourite statistical topic: Probability, Regression, Probability, Graphs, Probability, Sampling. What is the centre?"
      >
        <p className="leading-8 text-neutral-600">
          These are nominal categories. A numerical mean is not meaningful. The
          most common category is Probability, so the mode is Probability.
        </p>
      </WorkedExample>
    </LessonPanel>
  );
}

function QuizSection() {
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [complete, setComplete] = useState(false);

  const currentQuestion = quizQuestions[quizIndex];

  function checkAnswer() {
    if (selectedAnswer === null || checked) return;

    setChecked(true);

    if (selectedAnswer === currentQuestion.answer) {
      setScore((previous) => previous + 1);
    }
  }

  function nextQuestion() {
    if (quizIndex === quizQuestions.length - 1) {
      setComplete(true);
      return;
    }

    setQuizIndex((previous) => previous + 1);
    setSelectedAnswer(null);
    setChecked(false);
  }

  function restartQuiz() {
    setQuizIndex(0);
    setSelectedAnswer(null);
    setChecked(false);
    setScore(0);
    setComplete(false);
  }

  if (complete) {
    return (
      <LessonPanel>
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
            Quiz complete
          </p>
          <h2 className="mt-4 text-5xl font-black tracking-tight">
            {score}/{quizQuestions.length}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-neutral-600">
            Good work. Before moving forward, make sure you can explain why the
            median is preferred for skewed data and why the mode is used for
            categorical data.
          </p>
          <button
            onClick={restartQuiz}
            className="mt-6 rounded-full bg-neutral-950 px-6 py-3 text-sm font-black text-white"
          >
            Restart quiz
          </button>
        </div>
      </LessonPanel>
    );
  }

  return (
    <LessonPanel>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
        Quiz
      </p>
      <h2 className="mt-2 text-3xl font-black tracking-tight">
        Check your understanding
      </h2>

      <div className="mt-6 rounded-[1.5rem] border border-[#ded9cf] bg-[#fbfaf6] p-6">
        <p className="text-sm font-black text-neutral-700">
          Question {quizIndex + 1} of {quizQuestions.length}
        </p>

        <h3 className="mt-3 text-xl font-black leading-8">
          {currentQuestion.question}
        </h3>

        <div className="mt-5 grid gap-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = currentQuestion.answer === index;
            const showCorrect = checked && isCorrect;
            const showWrong = checked && isSelected && !isCorrect;

            return (
              <button
                key={option}
                onClick={() => {
                  if (!checked) setSelectedAnswer(index);
                }}
                className={`rounded-2xl border p-4 text-left text-sm font-bold transition ${
                  showCorrect
                    ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                    : showWrong
                    ? "border-red-600 bg-red-50 text-red-800"
                    : isSelected
                    ? "border-blue-600 bg-blue-50 text-blue-800"
                    : "border-[#ded9cf] bg-white text-neutral-700 hover:border-blue-300"
                }`}
              >
                {String.fromCharCode(65 + index)}. {option}
              </button>
            );
          })}
        </div>

        {checked && (
          <div className="mt-5 rounded-2xl border border-[#ded9cf] bg-white p-4">
            <p className="text-sm leading-7 text-neutral-700">
              <strong>Explanation:</strong> {currentQuestion.explanation}
            </p>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button
            onClick={checkAnswer}
            disabled={selectedAnswer === null || checked}
            className="rounded-full bg-blue-600 px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Check answer
          </button>

          {checked && (
            <button
              onClick={nextQuestion}
              className="rounded-full border border-[#ded9cf] bg-white px-5 py-3 text-sm font-black"
            >
              {quizIndex === quizQuestions.length - 1
                ? "Finish quiz"
                : "Next question"}
            </button>
          )}
        </div>
      </div>
    </LessonPanel>
  );
}

function SidebarLink({
  href,
  label,
  active = false,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <a
      href={href}
      className={`mb-1 flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-bold transition ${
        active
          ? "bg-blue-50 text-blue-800"
          : "text-neutral-600 hover:bg-[#f8f6f1] hover:text-neutral-950"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          active ? "bg-blue-600" : "bg-[#d8d3c8]"
        }`}
      />
      {label}
    </a>
  );
}

function LessonPanel({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[2rem] border border-[#ded9cf] bg-white p-6 shadow-sm md:p-8">
      {children}
    </section>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-blue-50 px-3 py-2 text-xs font-black text-blue-800">
      {children}
    </span>
  );
}

function SceneLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 inline-flex rounded-full bg-[#f8f6f1] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-neutral-700">
      {children}
    </div>
  );
}

function Dialogue({
  speaker,
  initials,
  text,
  side,
}: {
  speaker: string;
  initials: string;
  text: string;
  side: "left" | "right";
}) {
  const isRight = side === "right";

  return (
    <div
      className={`mt-4 flex gap-3 ${isRight ? "flex-row-reverse" : "flex-row"}`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-black ${
          initials === "MR"
            ? "bg-blue-100 text-blue-800"
            : initials === "EM"
            ? "bg-emerald-100 text-emerald-800"
            : initials === "OL"
            ? "bg-amber-100 text-amber-800"
            : initials === "JA"
            ? "bg-violet-100 text-violet-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {initials}
      </div>
      <div
        className={`max-w-[82%] rounded-2xl border p-4 ${
          isRight
            ? "border-blue-100 bg-blue-50"
            : "border-[#ded9cf] bg-[#fbfaf6]"
        }`}
      >
        <p className="text-xs font-black uppercase tracking-[0.14em] text-neutral-700">
          {speaker}
        </p>
        <p className="mt-2 leading-7 text-neutral-700">{text}</p>
      </div>
    </div>
  );
}

function DefinitionBox({
  title,
  children,
  tone = "blue",
}: {
  title: string;
  children: ReactNode;
  tone?: "blue" | "green" | "amber" | "red" | "purple";
}) {
  const tones = {
    blue: "border-blue-500 bg-blue-50 text-blue-900",
    green: "border-emerald-500 bg-emerald-50 text-emerald-900",
    amber: "border-amber-500 bg-amber-50 text-amber-900",
    red: "border-red-500 bg-red-50 text-red-900",
    purple: "border-violet-500 bg-violet-50 text-violet-900",
  };

  return (
    <div className={`mt-6 rounded-2xl border-l-4 p-5 ${tones[tone]}`}>
      <p className="text-xs font-black uppercase tracking-[0.16em]">{title}</p>
      <div className="mt-2 text-sm leading-7">{children}</div>
    </div>
  );
}

function MathBlock({ children }: { children: ReactNode }) {
  return (
    <div className="my-5 overflow-x-auto rounded-2xl border border-[#ded9cf] bg-[#f8f6f1] p-5 text-center font-mono text-sm font-bold text-neutral-900">
      {children}
    </div>
  );
}

function DerivationBox({
  title,
  steps,
}: {
  title: string;
  steps: { math: string; note: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-[#ded9cf]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between bg-[#f8f6f1] px-5 py-4 text-left"
      >
        <span className="font-black">{title}</span>
        <span className="text-sm font-black text-blue-700">
          {open ? "Hide" : "Reveal"}
        </span>
      </button>

      {open && (
        <div className="divide-y divide-[#ded9cf] bg-white">
          {steps.map((step, index) => (
            <div key={step.math} className="flex gap-4 p-5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-black text-blue-800">
                {index + 1}
              </div>
              <div>
                <p className="font-mono text-sm font-black">{step.math}</p>
                <p className="mt-1 text-sm leading-6 text-neutral-600">
                  {step.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Takeaway({ points }: { points: string[] }) {
  return (
    <div className="mt-8 rounded-[1.5rem] border border-[#ded9cf] bg-[#f8f6f1] p-5">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-neutral-700">
        Key takeaways
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-7 text-neutral-700">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#ded9cf] bg-white p-4 text-center">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-neutral-700">
        {label}
      </p>
      <p className="mt-2 text-2xl font-black tracking-tight">{value}</p>
    </div>
  );
}

function Marker({
  label,
  value,
  min,
  max,
  tone,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  tone: "blue" | "green";
}) {
  const denominator = max === min ? 1 : max - min;
  const left = ((value - min) / denominator) * 100;

  return (
    <div
      className="absolute top-0 -translate-x-1/2 text-center"
      style={{ left: `${left}%` }}
    >
      <div
        className={`mx-auto h-24 w-[3px] ${
          tone === "blue" ? "bg-blue-600" : "bg-emerald-600"
        }`}
      />
      <p
        className={`mt-1 rounded-full px-2 py-1 text-[10px] font-black ${
          tone === "blue"
            ? "bg-blue-100 text-blue-800"
            : "bg-emerald-100 text-emerald-800"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

function WorkedExample({
  title,
  question,
  children,
}: {
  title: string;
  question: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-[#ded9cf] bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 bg-[#fbfaf6] px-5 py-4 text-left"
      >
        <div>
          <p className="text-sm font-black text-neutral-950">{title}</p>
          <p className="mt-1 text-sm leading-6 text-neutral-600">{question}</p>
        </div>
        <span className="shrink-0 rounded-full border border-[#ded9cf] bg-white px-3 py-2 text-xs font-black">
          {open ? "Hide" : "Show"}
        </span>
      </button>

      {open && <div className="p-5">{children}</div>}
    </div>
  );
}