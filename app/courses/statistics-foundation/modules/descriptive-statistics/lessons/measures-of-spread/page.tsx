"use client";

import { useMemo, useState, type ReactNode } from "react";

const tabs = [
  "Lecture",
  "Detailed Notes",
  "Interactive Lab",
  "Worked Examples",
  "Quiz",
];

const moduleLessons = [
  {
    number: "2.1",
    title: "Measures of centre",
    href: "/courses/statistics-foundation/modules/descriptive-statistics/lessons/measures-of-centre",
  },
  {
    number: "2.2",
    title: "Measures of spread",
    href: "/courses/statistics-foundation/modules/descriptive-statistics/lessons/measures-of-spread",
    active: true,
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

const quizQuestions = [
  {
    question:
      "Why is a measure of centre alone usually not enough to describe a dataset?",
    options: [
      "Because centre only describes categorical variables.",
      "Because centre says nothing about how spread out the observations are.",
      "Because centre is always incorrect.",
      "Because centre can only be calculated for samples of size 2.",
    ],
    answer: 1,
    explanation:
      "A centre such as the mean or median tells us where the data are located, but not whether the observations are tightly clustered or widely scattered.",
  },
  {
    question: "Which measure of spread is defined as Q3 − Q1?",
    options: ["Range", "Variance", "Interquartile range", "Coefficient of variation"],
    answer: 2,
    explanation:
      "The interquartile range, or IQR, is Q3 − Q1. It describes the spread of the middle 50% of the data.",
  },
  {
    question:
      "Why do we square deviations when calculating variance?",
    options: [
      "To make every value larger than the mean.",
      "To prevent positive and negative deviations from cancelling.",
      "To convert categorical variables into numbers.",
      "To make the median easier to calculate.",
    ],
    answer: 1,
    explanation:
      "The deviations from the mean sum to zero. Squaring makes all deviations non-negative and gives more weight to larger deviations.",
  },
  {
    question:
      "Which measure of spread is usually easiest to interpret because it is in the original units?",
    options: ["Variance", "Standard deviation", "Squared deviation", "Sample size"],
    answer: 1,
    explanation:
      "Standard deviation is the square root of variance, so it returns spread to the original measurement units.",
  },
  {
    question:
      "When is the coefficient of variation especially useful?",
    options: [
      "When comparing relative variability across variables with different units or scales.",
      "When the mean is exactly zero.",
      "When the data are nominal categories.",
      "When only one observation exists.",
    ],
    answer: 0,
    explanation:
      "The coefficient of variation compares the standard deviation relative to the mean, so it is useful for comparing relative variability across scales.",
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

function getQuartiles(values: number[]) {
  const ordered = [...values].sort((a, b) => a - b);
  const n = ordered.length;
  const middle = Math.floor(n / 2);

  const lowerHalf = n % 2 === 0 ? ordered.slice(0, middle) : ordered.slice(0, middle);
  const upperHalf =
    n % 2 === 0 ? ordered.slice(middle) : ordered.slice(middle + 1);

  return {
    q1: getMedian(lowerHalf),
    q2: getMedian(ordered),
    q3: getMedian(upperHalf),
  };
}

function getSampleVariance(values: number[]) {
  const xbar = getMean(values);
  const squaredDeviations = values.map((value) => (value - xbar) ** 2);
  return (
    squaredDeviations.reduce((sum, value) => sum + value, 0) /
    (values.length - 1)
  );
}

function getPopulationVariance(values: number[]) {
  const xbar = getMean(values);
  const squaredDeviations = values.map((value) => (value - xbar) ** 2);
  return squaredDeviations.reduce((sum, value) => sum + value, 0) / values.length;
}

export default function MeasuresOfSpreadPage() {
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
            <div className="h-1 w-[28%] bg-blue-600" />
          </div>

          <nav className="p-4">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-neutral-400">
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

            <p className="mb-3 mt-7 text-xs font-black uppercase tracking-[0.18em] text-neutral-400">
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
                      : "border-transparent text-neutral-500 hover:text-neutral-950"
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
                Module 2 · Lesson 2.2
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl md:text-6xl">
                Measures of Spread
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-600">
                Centre tells us where the data are located. Spread tells us how
                variable, consistent, unequal, uncertain or dispersed the data
                are around that centre.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Badge>Range</Badge>
                <Badge>IQR</Badge>
                <Badge>Variance</Badge>
                <Badge>Standard deviation</Badge>
                <Badge>Coefficient of variation</Badge>
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
                  Next lesson: Shape, skewness and outliers
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70">
                  Centre and spread are not enough. Next, we study the shape of
                  a distribution and learn how skewness changes interpretation.
                </p>
              </div>
              <a
                href="/courses/statistics-foundation/modules/descriptive-statistics/lessons/shape-skewness-outliers"
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
        Same centre, completely different stories
      </h2>

      <SceneLabel>
        Scene — the class returns after learning mean, median and mode
      </SceneLabel>

      <Dialogue
        speaker="Emma"
        initials="EM"
        side="left"
        text="Last lesson we learned how to describe the centre. If I know the mean or median, do I really need anything else?"
      />
      <Dialogue
        speaker="Mr. R"
        initials="MR"
        side="right"
        text="Yes. A measure of centre tells us where the data are located, but it does not tell us how tightly or widely the observations are scattered."
      />
      <Dialogue
        speaker="Oliver"
        initials="OL"
        side="left"
        text="So two datasets can have the same mean but look very different?"
      />
      <Dialogue
        speaker="Mr. R"
        initials="MR"
        side="right"
        text="Exactly. Consider Class A with scores 48, 49, 50, 51, 52 and Class B with scores 10, 30, 50, 70, 90. Both have mean 50, but the second class is much more variable."
      />

      <DefinitionBox title="Big idea" tone="amber">
        A measure of centre without a measure of spread is incomplete. The
        centre describes typical location; spread describes variability,
        consistency, inequality and uncertainty.
      </DefinitionBox>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        Why spread matters
      </h3>
      <p className="mt-3 leading-8 text-neutral-600">
        Spread is not a small technical detail. In many real datasets, spread is
        the part that carries the practical meaning. A hospital may have an
        average waiting time of 30 minutes, but that summary is incomplete if
        some patients wait 5 minutes and others wait 3 hours. A treatment may
        produce an average improvement of 10 units, but the treatment may still
        be unreliable if patient responses vary wildly.
      </p>

      <Dialogue
        speaker="James"
        initials="JA"
        side="left"
        text="So spread is about consistency?"
      />
      <Dialogue
        speaker="Mr. R"
        initials="MR"
        side="right"
        text="Yes. Low spread means observations are close together. High spread means observations are widely scattered. In medicine, high spread may suggest heterogeneous patients. In finance, it may mean risk. In education, it may reveal unequal performance."
      />
      <Dialogue
        speaker="Sophia"
        initials="SO"
        side="left"
        text="Could we just use the range? Maximum minus minimum sounds simple."
      />
      <Dialogue
        speaker="Mr. R"
        initials="MR"
        side="right"
        text="The range is useful as a first look, but it uses only two observations. A single extreme value can change it completely. That is why we also use IQR, variance, standard deviation and coefficient of variation."
      />

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        Main measures of spread
      </h3>

      <div className="mt-5 overflow-x-auto rounded-[1.2rem] border border-[#ded9cf]">
        <table className="w-full min-w-[840px] border-collapse bg-white text-sm">
          <thead className="bg-[#f8f6f1]">
            <tr>
              <th className="p-4 text-left font-black">Measure</th>
              <th className="p-4 text-left font-black">Definition</th>
              <th className="p-4 text-left font-black">Best use</th>
              <th className="p-4 text-left font-black">Weakness</th>
            </tr>
          </thead>
          <tbody>
            <TableRow
              measure="Range"
              definition="Maximum − minimum"
              use="Quick overall span"
              weakness="Very sensitive to outliers"
            />
            <TableRow
              measure="IQR"
              definition="Q3 − Q1"
              use="Spread of the middle 50%"
              weakness="Ignores tail behaviour"
            />
            <TableRow
              measure="Variance"
              definition="Average squared deviation from the mean"
              use="Mathematical theory and modelling"
              weakness="Squared units are hard to interpret"
            />
            <TableRow
              measure="Standard deviation"
              definition="Square root of variance"
              use="Typical distance from the mean"
              weakness="Sensitive to outliers"
            />
            <TableRow
              measure="Coefficient of variation"
              definition="SD divided by mean"
              use="Comparing relative variability"
              weakness="Problematic when mean is near zero"
            />
          </tbody>
        </table>
      </div>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        The intuition behind standard deviation
      </h3>
      <p className="mt-3 leading-8 text-neutral-600">
        Standard deviation answers a natural question: roughly how far are
        observations from the mean? To measure this, we first calculate each
        deviation from the mean. Some deviations are positive and some are
        negative. If we simply add them, they cancel to zero. So we square the
        deviations, average them, and then take the square root to return to the
        original units.
      </p>

      <Dialogue
        speaker="Emma"
        initials="EM"
        side="left"
        text="Why not just use absolute distances?"
      />
      <Dialogue
        speaker="Mr. R"
        initials="MR"
        side="right"
        text="That is possible and leads to mean absolute deviation. But squared deviations have powerful mathematical properties, especially later in probability, regression, estimation and inference."
      />

      <Takeaway
        points={[
          "Spread describes variability, consistency, inequality or risk.",
          "The range is simple but strongly affected by extreme observations.",
          "The IQR describes the spread of the middle 50% and is resistant to outliers.",
          "Variance and standard deviation use deviations from the mean.",
          "Standard deviation is easier to interpret than variance because it is in original units.",
          "Coefficient of variation compares variability relative to the mean.",
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
        Measures of spread in depth
      </h2>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        1. Why descriptive statistics needs spread
      </h3>
      <p className="mt-3 leading-8 text-neutral-600">
        Descriptive statistics does not only describe the centre of a dataset.
        It also describes how observations are distributed around that centre.
        Two datasets may have identical means or medians but very different
        levels of variation. Therefore, a complete descriptive summary usually
        includes both a measure of centre and a measure of spread.
      </p>

      <DefinitionBox title="Definition — spread">
        Spread, also called variability or dispersion, describes how far
        observations are from each other or from a central value such as the
        mean or median.
      </DefinitionBox>

      <p className="leading-8 text-neutral-600">
        Spread helps answer questions such as:
      </p>

      <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-neutral-600">
        <li>Are most observations close to the centre or widely scattered?</li>
        <li>Are there unusually small or unusually large values?</li>
        <li>Is the dataset consistent or heterogeneous?</li>
        <li>Can the centre alone give a fair description?</li>
        <li>Should we report mean and SD, or median and IQR?</li>
      </ul>

      <h3 className="mt-8 text-2xl font-black tracking-tight">2. Range</h3>
      <p className="mt-3 leading-8 text-neutral-600">
        The range is the simplest measure of spread:
      </p>

      <MathBlock>Range = maximum value − minimum value</MathBlock>

      <p className="leading-8 text-neutral-600">
        For the dataset 12, 14, 16, 18, 20, the range is 20 − 12 = 8. The range
        gives a quick sense of the total span of the data.
      </p>

      <DefinitionBox title="Strength" tone="green">
        The range is easy to compute and easy to explain. It is useful as a
        quick first description of the total span.
      </DefinitionBox>

      <DefinitionBox title="Limitation" tone="red">
        The range depends only on the smallest and largest observations. It
        ignores everything between them and is highly sensitive to outliers.
      </DefinitionBox>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        3. Quartiles and interquartile range
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        Quartiles divide an ordered dataset into four parts. The first quartile,
        Q1, marks roughly the 25th percentile. The second quartile, Q2, is the
        median. The third quartile, Q3, marks roughly the 75th percentile.
      </p>

      <MathBlock>IQR = Q3 − Q1</MathBlock>

      <p className="leading-8 text-neutral-600">
        The IQR describes the spread of the middle 50% of observations. Because
        it ignores the most extreme lower and upper parts of the data, it is
        more resistant to outliers than the range.
      </p>

      <DefinitionBox title="Interpretation" tone="green">
        A small IQR means the middle half of the data is tightly packed. A large
        IQR means the middle half is more spread out.
      </DefinitionBox>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        4. Deviations from the mean
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        To build variance and standard deviation, we begin with deviations from
        the mean:
      </p>

      <MathBlock>Deviation of observation i = xᵢ − x̄</MathBlock>

      <p className="leading-8 text-neutral-600">
        A positive deviation means the observation is above the mean. A negative
        deviation means the observation is below the mean. But the sum of
        deviations from the mean is always zero:
      </p>

      <MathBlock>Σ(xᵢ − x̄) = 0</MathBlock>

      <p className="leading-8 text-neutral-600">
        This is why we cannot simply average the raw deviations. They cancel.
        Squaring the deviations solves this cancellation problem.
      </p>

      <DerivationBox
        title="From deviations to variance"
        steps={[
          {
            math: "xᵢ − x̄",
            note: "Measure each observation’s distance from the mean, including direction.",
          },
          {
            math: "(xᵢ − x̄)²",
            note: "Square each deviation so that negative and positive distances do not cancel.",
          },
          {
            math: "Σ(xᵢ − x̄)²",
            note: "Add all squared deviations to get total squared variation.",
          },
          {
            math: "s² = Σ(xᵢ − x̄)² / (n − 1)",
            note: "Divide by n − 1 for the sample variance.",
          },
          {
            math: "s = √s²",
            note: "Take the square root to return to the original units.",
          },
        ]}
      />

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        5. Population variance and sample variance
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        If the data represent an entire population, the population variance is:
      </p>

      <MathBlock>σ² = Σ(xᵢ − μ)² / N</MathBlock>

      <p className="leading-8 text-neutral-600">
        If the data are a sample used to estimate population variability, the
        sample variance is:
      </p>

      <MathBlock>s² = Σ(xᵢ − x̄)² / (n − 1)</MathBlock>

      <DefinitionBox title="Why n − 1?" tone="amber">
        In a sample, the sample mean x̄ is estimated from the same data. Once
        the sample mean is fixed, only n − 1 deviations can vary freely. Dividing
        by n − 1 corrects the tendency of sample variance to underestimate
        population variance.
      </DefinitionBox>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        6. Standard deviation
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        Variance is mathematically useful, but it is measured in squared units.
        For example, if height is measured in centimetres, variance is measured
        in squared centimetres. This is hard to interpret. The standard
        deviation solves this by taking the square root.
      </p>

      <MathBlock>s = √s²</MathBlock>

      <DefinitionBox title="Interpretation" tone="green">
        The standard deviation describes a typical distance of observations from
        the mean, measured in the original units of the variable.
      </DefinitionBox>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        7. Coefficient of variation
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        The coefficient of variation compares spread relative to the mean:
      </p>

      <MathBlock>CV = s / x̄</MathBlock>
      <MathBlock>CV% = (s / x̄) × 100%</MathBlock>

      <p className="leading-8 text-neutral-600">
        The CV is useful when comparing relative variability across variables
        measured on different scales. For example, a standard deviation of 5 may
        be large for a variable with mean 10, but small for a variable with mean
        500.
      </p>

      <DefinitionBox title="Caution" tone="red">
        The coefficient of variation is not useful when the mean is near zero,
        because dividing by a very small number can produce unstable or
        misleading values.
      </DefinitionBox>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        8. Choosing a spread summary
      </h3>

      <div className="mt-5 overflow-x-auto rounded-[1.2rem] border border-[#ded9cf]">
        <table className="w-full min-w-[760px] border-collapse bg-white text-sm">
          <thead className="bg-[#f8f6f1]">
            <tr>
              <th className="p-4 text-left font-black">Data situation</th>
              <th className="p-4 text-left font-black">Centre</th>
              <th className="p-4 text-left font-black">Spread</th>
            </tr>
          </thead>
          <tbody>
            <TableRow3
              a="Roughly symmetric numerical data"
              b="Mean"
              c="Standard deviation"
            />
            <TableRow3
              a="Skewed numerical data"
              b="Median"
              c="IQR"
            />
            <TableRow3
              a="Data with severe outliers"
              b="Median"
              c="IQR"
            />
            <TableRow3
              a="Comparing relative variability across scales"
              b="Mean"
              c="Coefficient of variation"
            />
            <TableRow3
              a="Quick first description"
              b="Mean or median"
              c="Range"
            />
          </tbody>
        </table>
      </div>
    </LessonPanel>
  );
}

function InteractiveLab() {
  const [datasetType, setDatasetType] = useState<"tight" | "wide" | "outlier">(
    "tight",
  );
  const [extraValue, setExtraValue] = useState(50);

  const baseValues = useMemo(() => {
    if (datasetType === "tight") return [46, 48, 49, 50, 51, 52, 54];
    if (datasetType === "wide") return [20, 35, 45, 50, 55, 65, 80];
    return [46, 48, 49, 50, 51, 52, 120];
  }, [datasetType]);

  const values = useMemo(() => [...baseValues, extraValue], [baseValues, extraValue]);

  const stats = useMemo(() => {
    const ordered = [...values].sort((a, b) => a - b);
    const xbar = getMean(values);
    const median = getMedian(values);
    const { q1, q2, q3 } = getQuartiles(values);
    const range = Math.max(...values) - Math.min(...values);
    const sampleVariance = getSampleVariance(values);
    const sampleSd = Math.sqrt(sampleVariance);
    const populationVariance = getPopulationVariance(values);
    const populationSd = Math.sqrt(populationVariance);
    const iqr = q3 - q1;
    const cv = sampleSd / xbar;

    return {
      ordered,
      mean: xbar,
      median,
      q1,
      q2,
      q3,
      range,
      iqr,
      sampleVariance,
      sampleSd,
      populationVariance,
      populationSd,
      cv,
      min: Math.min(...values),
      max: Math.max(...values),
    };
  }, [values]);

  return (
    <LessonPanel>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
        Interactive lab
      </p>
      <h2 className="mt-2 text-3xl font-black tracking-tight">
        Same centre, different spread
      </h2>

      <p className="mt-4 leading-8 text-neutral-600">
        Change the dataset type and add an extra value. Watch how the range,
        IQR, variance and standard deviation respond. Notice that the range and
        standard deviation react strongly to extreme values, while the IQR is
        more resistant.
      </p>

      <div className="mt-6 rounded-[1.5rem] border border-[#ded9cf] bg-[#fbfaf6] p-5">
        <div className="flex flex-wrap gap-2">
          <ChoiceButton
            active={datasetType === "tight"}
            onClick={() => {
              setDatasetType("tight");
              setExtraValue(50);
            }}
          >
            Tight dataset
          </ChoiceButton>
          <ChoiceButton
            active={datasetType === "wide"}
            onClick={() => {
              setDatasetType("wide");
              setExtraValue(50);
            }}
          >
            Wide dataset
          </ChoiceButton>
          <ChoiceButton
            active={datasetType === "outlier"}
            onClick={() => {
              setDatasetType("outlier");
              setExtraValue(50);
            }}
          >
            Outlier dataset
          </ChoiceButton>
        </div>

        <div className="mt-6">
          <label className="text-sm font-black">
            Add or move one extra value: {extraValue}
          </label>
          <input
            type="range"
            min="0"
            max="140"
            value={extraValue}
            onChange={(event) => setExtraValue(Number(event.target.value))}
            className="mt-3 w-full accent-blue-600"
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <StatCard label="Mean" value={stats.mean.toFixed(2)} />
          <StatCard label="Median" value={stats.median.toFixed(2)} />
          <StatCard label="Range" value={stats.range.toFixed(2)} />
          <StatCard label="IQR" value={stats.iqr.toFixed(2)} />
          <StatCard label="Sample variance" value={stats.sampleVariance.toFixed(2)} />
          <StatCard label="Sample SD" value={stats.sampleSd.toFixed(2)} />
          <StatCard label="Population SD" value={stats.populationSd.toFixed(2)} />
          <StatCard label="CV" value={`${(stats.cv * 100).toFixed(1)}%`} />
        </div>

        <div className="mt-6">
          <p className="text-sm font-black">Current ordered data</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {stats.ordered.map((value, index) => (
              <span
                key={`${value}-${index}`}
                className="rounded-full border border-[#ded9cf] bg-white px-3 py-2 text-sm font-bold"
              >
                {value}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#ded9cf] bg-white p-4">
          <p className="text-sm font-black">Spread display</p>
          <div className="relative mt-5 h-32">
            <div className="absolute left-0 right-0 top-16 h-[2px] bg-[#ded9cf]" />

            {stats.ordered.map((value, index) => {
              const denominator = stats.max === stats.min ? 1 : stats.max - stats.min;
              const left = ((value - stats.min) / denominator) * 100;

              return (
                <div
                  key={`${value}-${index}-dot`}
                  className="absolute top-[57px] h-4 w-4 -translate-x-1/2 rounded-full bg-blue-600"
                  style={{ left: `${left}%` }}
                  title={`${value}`}
                />
              );
            })}

            <RangeMarker label="Min" value={stats.min} min={stats.min} max={stats.max} />
            <RangeMarker label="Q1" value={stats.q1} min={stats.min} max={stats.max} tone="green" />
            <RangeMarker label="Median" value={stats.q2} min={stats.min} max={stats.max} tone="amber" />
            <RangeMarker label="Q3" value={stats.q3} min={stats.min} max={stats.max} tone="green" />
            <RangeMarker label="Max" value={stats.max} min={stats.min} max={stats.max} />
          </div>
        </div>
      </div>

      <DefinitionBox title="What to notice" tone="amber">
        When an extreme value is added, the range and standard deviation can
        increase sharply. The IQR changes less because it focuses on the middle
        50% of the ordered data.
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
        title="Example 1 — Range and IQR"
        question="For the dataset 4, 6, 8, 10, 12, 14, 16, find the range and IQR."
      >
        <ol className="list-decimal space-y-3 pl-6 leading-8 text-neutral-600">
          <li>The data are already ordered.</li>
          <li>Range = maximum − minimum = 16 − 4 = 12.</li>
          <li>The median is 10.</li>
          <li>The lower half is 4, 6, 8, so Q1 = 6.</li>
          <li>The upper half is 12, 14, 16, so Q3 = 14.</li>
          <li>IQR = Q3 − Q1 = 14 − 6 = 8.</li>
        </ol>
      </WorkedExample>

      <WorkedExample
        title="Example 2 — Sample variance and standard deviation"
        question="Find the sample variance and sample standard deviation for 2, 4, 6."
      >
        <ol className="list-decimal space-y-3 pl-6 leading-8 text-neutral-600">
          <li>Mean = (2 + 4 + 6) / 3 = 4.</li>
          <li>Deviations: 2 − 4 = −2, 4 − 4 = 0, 6 − 4 = 2.</li>
          <li>Squared deviations: 4, 0, 4.</li>
          <li>Sum of squared deviations = 8.</li>
          <li>Sample variance = 8 / (3 − 1) = 8 / 2 = 4.</li>
          <li>Sample standard deviation = √4 = 2.</li>
        </ol>
      </WorkedExample>

      <WorkedExample
        title="Example 3 — Same mean, different spread"
        question="Compare Dataset A: 48, 49, 50, 51, 52 and Dataset B: 10, 30, 50, 70, 90."
      >
        <p className="leading-8 text-neutral-600">
          Both datasets have mean 50. However, Dataset A is tightly clustered
          around 50, while Dataset B is widely spread. This shows why centre
          alone is not enough.
        </p>
        <p className="mt-3 leading-8 text-neutral-600">
          Dataset A has range 4. Dataset B has range 80. Dataset B is therefore
          much more variable, even though both datasets share the same mean.
        </p>
      </WorkedExample>

      <WorkedExample
        title="Example 4 — Coefficient of variation"
        question="Variable A has mean 100 and SD 10. Variable B has mean 20 and SD 5. Which has greater relative variability?"
      >
        <ol className="list-decimal space-y-3 pl-6 leading-8 text-neutral-600">
          <li>CV for A = 10 / 100 = 0.10 = 10%.</li>
          <li>CV for B = 5 / 20 = 0.25 = 25%.</li>
          <li>
            Variable B has the larger relative variability, even though its SD
            is smaller in absolute terms.
          </li>
        </ol>
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
            Good work. Make sure you can explain why variance uses squared
            deviations, why sample variance divides by n − 1, and when to use
            IQR instead of standard deviation.
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
        <p className="text-sm font-black text-neutral-500">
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
    <div className="mt-6 inline-flex rounded-full bg-[#f8f6f1] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-neutral-500">
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
        <p className="text-xs font-black uppercase tracking-[0.14em] text-neutral-400">
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
      <p className="text-xs font-black uppercase tracking-[0.18em] text-neutral-500">
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
      <p className="text-xs font-black uppercase tracking-[0.14em] text-neutral-400">
        {label}
      </p>
      <p className="mt-2 text-xl font-black tracking-tight">{value}</p>
    </div>
  );
}

function ChoiceButton({
  children,
  active,
  onClick,
}: {
  children: ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-black ${
        active
          ? "bg-neutral-950 text-white"
          : "border border-[#ded9cf] bg-white text-neutral-800"
      }`}
    >
      {children}
    </button>
  );
}

function RangeMarker({
  label,
  value,
  min,
  max,
  tone = "blue",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  tone?: "blue" | "green" | "amber";
}) {
  const denominator = max === min ? 1 : max - min;
  const left = ((value - min) / denominator) * 100;

  const toneClass =
    tone === "green"
      ? "bg-emerald-600 text-emerald-800"
      : tone === "amber"
        ? "bg-amber-600 text-amber-800"
        : "bg-blue-600 text-blue-800";

  return (
    <div
      className="absolute top-2 -translate-x-1/2 text-center"
      style={{ left: `${left}%` }}
    >
      <div className={`mx-auto h-24 w-[3px] ${toneClass.split(" ")[0]}`} />
      <p className={`mt-1 rounded-full bg-white px-2 py-1 text-[10px] font-black ${toneClass.split(" ")[1]}`}>
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

function TableRow({
  measure,
  definition,
  use,
  weakness,
}: {
  measure: string;
  definition: string;
  use: string;
  weakness: string;
}) {
  return (
    <tr className="border-t border-[#ded9cf]">
      <td className="p-4 font-bold">{measure}</td>
      <td className="p-4 text-neutral-600">{definition}</td>
      <td className="p-4 text-neutral-600">{use}</td>
      <td className="p-4 text-neutral-600">{weakness}</td>
    </tr>
  );
}

function TableRow3({ a, b, c }: { a: string; b: string; c: string }) {
  return (
    <tr className="border-t border-[#ded9cf]">
      <td className="p-4 text-neutral-600">{a}</td>
      <td className="p-4 font-bold">{b}</td>
      <td className="p-4 font-bold">{c}</td>
    </tr>
  );
}