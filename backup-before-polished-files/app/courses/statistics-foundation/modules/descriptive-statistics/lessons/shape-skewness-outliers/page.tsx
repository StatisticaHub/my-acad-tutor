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
  },
  {
    number: "2.3",
    title: "Shape, skewness and outliers",
    href: "/courses/statistics-foundation/modules/descriptive-statistics/lessons/shape-skewness-outliers",
    active: true,
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
      "In a strongly right-skewed distribution, which relationship is commonly expected?",
    options: [
      "Mean is less than median.",
      "Mean is greater than median.",
      "Mean and median must both be zero.",
      "Mode cannot exist.",
    ],
    answer: 1,
    explanation:
      "In right-skewed data, a long right tail pulls the mean upward, so the mean is often greater than the median.",
  },
  {
    question:
      "Which summary pair is usually preferred for strongly skewed numerical data?",
    options: [
      "Mean and standard deviation",
      "Median and interquartile range",
      "Mode and variance",
      "Range and mean only",
    ],
    answer: 1,
    explanation:
      "For skewed data, the median and IQR are more resistant to long tails and extreme values.",
  },
  {
    question:
      "Using the 1.5 × IQR rule, what is the upper outlier fence?",
    options: [
      "Q1 − 1.5 × IQR",
      "Q3 + 1.5 × IQR",
      "Mean + median",
      "Maximum − minimum",
    ],
    answer: 1,
    explanation:
      "The upper outlier fence is Q3 + 1.5 × IQR. Values above this fence are often flagged as potential outliers.",
  },
  {
    question:
      "Which statement about outliers is most responsible?",
    options: [
      "Always delete outliers immediately.",
      "Always keep outliers without checking them.",
      "Investigate outliers before deciding how to handle them.",
      "Outliers only occur in categorical variables.",
    ],
    answer: 2,
    explanation:
      "Outliers may be errors, unusual genuine values, or signals of a different subgroup. They should be investigated before any decision is made.",
  },
  {
    question:
      "What does a bimodal distribution suggest?",
    options: [
      "The data may contain two peaks or possibly two subgroups.",
      "The data must be normally distributed.",
      "The mean must equal zero.",
      "The sample size must be exactly two.",
    ],
    answer: 0,
    explanation:
      "A bimodal distribution has two peaks. This can happen when the data contain two different subgroups or processes.",
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

  const lowerHalf = ordered.slice(0, middle);
  const upperHalf = n % 2 === 0 ? ordered.slice(middle) : ordered.slice(middle + 1);

  return {
    q1: getMedian(lowerHalf),
    q2: getMedian(ordered),
    q3: getMedian(upperHalf),
  };
}

function getSampleSd(values: number[]) {
  const xbar = getMean(values);
  const variance =
    values.reduce((sum, value) => sum + (value - xbar) ** 2, 0) /
    (values.length - 1);

  return Math.sqrt(variance);
}

function getHistogram(values: number[], bins: number[]) {
  const counts = Array.from({ length: bins.length - 1 }, () => 0);

  values.forEach((value) => {
    for (let i = 0; i < bins.length - 1; i++) {
      const isLastBin = i === bins.length - 2;
      if (
        (value >= bins[i] && value < bins[i + 1]) ||
        (isLastBin && value === bins[i + 1])
      ) {
        counts[i] += 1;
        break;
      }
    }
  });

  return counts;
}

export default function ShapeSkewnessOutliersPage() {
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
            <div className="h-1 w-[32%] bg-blue-600" />
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
                Module 2 · Lesson 2.3
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl md:text-6xl">
                Shape, Skewness and Outliers
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-600">
                Centre tells us where the data are. Spread tells us how
                variable they are. Shape tells us how the values are arranged,
                whether the distribution is balanced, skewed, peaked, clustered
                or affected by unusual observations.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Badge>Symmetry</Badge>
                <Badge>Skewness</Badge>
                <Badge>Outliers</Badge>
                <Badge>Histograms</Badge>
                <Badge>Boxplots</Badge>
                <Badge>IQR rule</Badge>
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
                  Next lesson: Standardisation and z-scores
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70">
                  Now that we can describe shape and outliers, we move to
                  standardising values so that observations can be compared
                  across different scales.
                </p>
              </div>
              <a
                href="/courses/statistics-foundation/modules/descriptive-statistics/lessons/z-scores"
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
        Centre and spread are not the whole story
      </h2>

      <SceneLabel>Scene — the class is comparing two histograms</SceneLabel>

      <Dialogue
        speaker="Emma"
        initials="EM"
        side="left"
        text="We learned mean, median, range, IQR and standard deviation. Is that enough to describe a dataset properly?"
      />
      <Dialogue
        speaker="Mr. R"
        initials="MR"
        side="right"
        text="Not always. Centre tells us where the data are located. Spread tells us how variable they are. But shape tells us how values are arranged across the distribution."
      />
      <Dialogue
        speaker="Oliver"
        initials="OL"
        side="left"
        text="By shape, do you mean whether the histogram is balanced, stretched, or has a long tail?"
      />
      <Dialogue
        speaker="Mr. R"
        initials="MR"
        side="right"
        text="Exactly. A distribution may be symmetric, right-skewed, left-skewed, unimodal, bimodal, flat, clustered, or affected by outliers."
      />

      <DefinitionBox title="Core idea">
        A good descriptive summary usually answers four questions: where is the
        data centred, how spread out is it, what shape does it have, and are
        there unusual observations?
      </DefinitionBox>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        Why shape matters
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        Suppose two classes both have a mean exam score of 60. In one class,
        most students score around 60. In another class, half the students score
        near 30 and half score near 90. The mean is the same, but the story is
        completely different. Shape reveals structure that centre and spread can
        hide.
      </p>

      <Dialogue
        speaker="James"
        initials="JA"
        side="left"
        text="So a histogram is not just decoration. It helps us decide whether mean and standard deviation are appropriate?"
      />
      <Dialogue
        speaker="Mr. R"
        initials="MR"
        side="right"
        text="Yes. If the distribution is roughly symmetric, mean and standard deviation can be useful. If it is strongly skewed or has outliers, median and IQR may be more honest."
      />

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        Symmetry and skewness
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        A distribution is roughly symmetric when the left and right sides look
        balanced around the centre. It is right-skewed when a long tail extends
        toward larger values. It is left-skewed when a long tail extends toward
        smaller values.
      </p>

      <div className="mt-5 overflow-x-auto rounded-[1.2rem] border border-[#ded9cf]">
        <table className="w-full min-w-[760px] border-collapse bg-white text-sm">
          <thead className="bg-[#f8f6f1]">
            <tr>
              <th className="p-4 text-left font-black">Shape</th>
              <th className="p-4 text-left font-black">Tail direction</th>
              <th className="p-4 text-left font-black">Typical pattern</th>
              <th className="p-4 text-left font-black">Example</th>
            </tr>
          </thead>
          <tbody>
            <TableRow
              a="Symmetric"
              b="Balanced tails"
              c="Mean ≈ Median"
              d="Adult height in a narrow age group"
            />
            <TableRow
              a="Right-skewed"
              b="Long right tail"
              c="Mean > Median"
              d="Income, waiting times, hospital stay"
            />
            <TableRow
              a="Left-skewed"
              b="Long left tail"
              c="Mean < Median"
              d="Easy exam scores with many high marks"
            />
          </tbody>
        </table>
      </div>

      <Dialogue
        speaker="Sophia"
        initials="SO"
        side="left"
        text="Why does the mean move toward the tail?"
      />
      <Dialogue
        speaker="Mr. R"
        initials="MR"
        side="right"
        text="Because the mean uses the numerical size of every value. Very large values pull it upward. Very small values pull it downward. The median depends mainly on position, so it is more resistant."
      />

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        Outliers are not automatically mistakes
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        An outlier is an observation that lies far away from the main body of
        the data. It may be a data-entry error, but it may also be a genuine and
        important case. In health data, an extreme laboratory result may be a
        recording error, a rare disease state, a severe patient case, or a
        different subgroup.
      </p>

      <DefinitionBox title="Important warning" tone="red">
        Never delete an outlier simply because it looks unusual. First ask
        whether it is impossible, wrongly recorded, outside the target
        population, or a genuine extreme observation.
      </DefinitionBox>

      <Takeaway
        points={[
          "Shape describes the overall pattern of a distribution.",
          "Symmetric data usually have mean and median close together.",
          "Right-skewed data usually have mean greater than median.",
          "Left-skewed data usually have mean less than median.",
          "Outliers strongly affect the mean, range and standard deviation.",
          "Graphs and numerical summaries should be interpreted together.",
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
        Distribution shape, skewness and outlier logic
      </h2>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        1. What do we mean by distribution shape?
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        The shape of a distribution refers to the overall visual and numerical
        pattern formed by the data values. After describing centre and spread,
        shape is the next major descriptive feature. Shape tells us whether
        values are concentrated around one main centre, whether there are long
        tails, whether the distribution is balanced, and whether some
        observations are unusually far from the rest.
      </p>

      <DefinitionBox title="Definition — distribution shape">
        Distribution shape describes how data values are arranged across their
        range, including symmetry, skewness, peaks, tails, clusters and outlying
        observations.
      </DefinitionBox>

      <p className="leading-8 text-neutral-600">
        Shape is usually studied using histograms, boxplots, density curves,
        dotplots and numerical summaries such as mean, median, quartiles, IQR
        and standard deviation.
      </p>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        2. Symmetric distributions
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        A distribution is approximately symmetric when the left and right sides
        are similar in shape and length. In a perfectly symmetric distribution,
        the centre divides the distribution into two mirror-image halves.
      </p>

      <MathBlock>Symmetric distribution: mean ≈ median</MathBlock>

      <DefinitionBox title="Interpretation" tone="green">
        For roughly symmetric numerical data, the mean and standard deviation
        are often useful summaries, provided there are no severe outliers.
      </DefinitionBox>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        3. Right-skewed distributions
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        A right-skewed distribution has a long tail toward larger values. Most
        observations are low or moderate, but a few very large values stretch the
        distribution to the right.
      </p>

      <MathBlock>Right-skewed distribution: mean &gt; median</MathBlock>

      <p className="leading-8 text-neutral-600">
        Common examples include income, waiting times, house prices, hospital
        length of stay and biological concentrations where most values are
        modest but a few values are very high.
      </p>

      <DefinitionBox title="Reporting guidance" tone="amber">
        For right-skewed data, report the median and IQR more often than the
        mean and standard deviation, unless there is a strong reason to use the
        mean.
      </DefinitionBox>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        4. Left-skewed distributions
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        A left-skewed distribution has a long tail toward smaller values. Most
        observations are high, but a few unusually small values stretch the
        distribution to the left.
      </p>

      <MathBlock>Left-skewed distribution: mean &lt; median</MathBlock>

      <p className="leading-8 text-neutral-600">
        Examples include very easy exam scores, where many students score high
        but a few low scores create a lower tail, or age at retirement in a
        group where most retire near the upper end but a few retire very early.
      </p>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        5. Modality: one peak or more than one?
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        Modality refers to the number of prominent peaks in a distribution. A
        unimodal distribution has one main peak. A bimodal distribution has two
        peaks. A multimodal distribution has more than two peaks.
      </p>

      <div className="mt-5 overflow-x-auto rounded-[1.2rem] border border-[#ded9cf]">
        <table className="w-full min-w-[760px] border-collapse bg-white text-sm">
          <thead className="bg-[#f8f6f1]">
            <tr>
              <th className="p-4 text-left font-black">Pattern</th>
              <th className="p-4 text-left font-black">Meaning</th>
              <th className="p-4 text-left font-black">Possible explanation</th>
            </tr>
          </thead>
          <tbody>
            <TableRow3
              a="Unimodal"
              b="One main peak"
              c="One dominant group or process"
            />
            <TableRow3
              a="Bimodal"
              b="Two main peaks"
              c="Two subgroups may be mixed together"
            />
            <TableRow3
              a="Multimodal"
              b="Several peaks"
              c="Several subgroups or mechanisms may be present"
            />
          </tbody>
        </table>
      </div>

      <DefinitionBox title="Important interpretation" tone="purple">
        A bimodal distribution is often a signal to ask whether different
        subgroups should be described separately.
      </DefinitionBox>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        6. Outliers
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        An outlier is an observation that lies unusually far from the main body
        of the data. Outliers matter because they can strongly affect the mean,
        range, standard deviation, correlation and later statistical models.
      </p>

      <DefinitionBox title="Definition — outlier">
        An outlier is an observation that appears unusually distant from the
        rest of the data relative to the overall pattern of the distribution.
      </DefinitionBox>

      <p className="leading-8 text-neutral-600">
        Outliers may arise from:
      </p>

      <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-neutral-600">
        <li>data-entry errors;</li>
        <li>measurement errors;</li>
        <li>unit mistakes, such as kilograms entered as pounds;</li>
        <li>rare but genuine observations;</li>
        <li>members of a different population or subgroup;</li>
        <li>important extreme cases that should not be ignored.</li>
      </ul>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        7. The 1.5 × IQR outlier rule
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        A common rule for flagging possible outliers uses the interquartile
        range:
      </p>

      <MathBlock>IQR = Q3 − Q1</MathBlock>
      <MathBlock>Lower fence = Q1 − 1.5 × IQR</MathBlock>
      <MathBlock>Upper fence = Q3 + 1.5 × IQR</MathBlock>

      <p className="leading-8 text-neutral-600">
        Values below the lower fence or above the upper fence are flagged as
        potential outliers. This rule does not prove that a value is wrong. It
        only identifies values that deserve further inspection.
      </p>

      <DefinitionBox title="Caution" tone="red">
        The 1.5 × IQR rule is a screening rule, not a deletion rule. Statistical
        responsibility means investigating outliers before deciding what to do.
      </DefinitionBox>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        8. Choosing summaries based on shape
      </h3>

      <div className="mt-5 overflow-x-auto rounded-[1.2rem] border border-[#ded9cf]">
        <table className="w-full min-w-[760px] border-collapse bg-white text-sm">
          <thead className="bg-[#f8f6f1]">
            <tr>
              <th className="p-4 text-left font-black">Distribution</th>
              <th className="p-4 text-left font-black">Centre</th>
              <th className="p-4 text-left font-black">Spread</th>
              <th className="p-4 text-left font-black">Why?</th>
            </tr>
          </thead>
          <tbody>
            <TableRow
              a="Roughly symmetric"
              b="Mean"
              c="Standard deviation"
              d="Uses all values well when tails are balanced"
            />
            <TableRow
              a="Strongly skewed"
              b="Median"
              c="IQR"
              d="More resistant to long tails"
            />
            <TableRow
              a="Severe outliers"
              b="Median"
              c="IQR"
              d="Less affected by extreme observations"
            />
            <TableRow
              a="Bimodal"
              b="Group-specific summaries"
              c="Group-specific spread"
              d="One summary may hide subgroup structure"
            />
          </tbody>
        </table>
      </div>
    </LessonPanel>
  );
}

function InteractiveLab() {
  const [shape, setShape] = useState<"symmetric" | "right" | "left" | "bimodal" | "outlier">(
    "symmetric",
  );

  const values = useMemo(() => {
    if (shape === "symmetric") {
      return [42, 45, 47, 48, 49, 50, 50, 51, 52, 53, 55, 58];
    }

    if (shape === "right") {
      return [8, 9, 10, 11, 11, 12, 13, 14, 18, 24, 35, 55];
    }

    if (shape === "left") {
      return [5, 25, 36, 42, 46, 48, 49, 50, 51, 52, 53, 54];
    }

    if (shape === "bimodal") {
      return [20, 22, 23, 24, 25, 26, 70, 72, 73, 75, 76, 78];
    }

    return [42, 45, 47, 48, 49, 50, 51, 52, 53, 55, 58, 130];
  }, [shape]);

  const stats = useMemo(() => {
    const ordered = [...values].sort((a, b) => a - b);
    const mean = getMean(values);
    const median = getMedian(values);
    const sd = getSampleSd(values);
    const { q1, q2, q3 } = getQuartiles(values);
    const iqr = q3 - q1;
    const lowerFence = q1 - 1.5 * iqr;
    const upperFence = q3 + 1.5 * iqr;
    const outliers = ordered.filter(
      (value) => value < lowerFence || value > upperFence,
    );

    const min = Math.min(...values);
    const max = Math.max(...values);
    const binStart = Math.floor(min / 10) * 10;
    const binEnd = Math.ceil(max / 10) * 10;
    const bins = [];

    for (let value = binStart; value <= binEnd + 10; value += 10) {
      bins.push(value);
    }

    const counts = getHistogram(values, bins);

    return {
      ordered,
      mean,
      median,
      sd,
      q1,
      q2,
      q3,
      iqr,
      lowerFence,
      upperFence,
      outliers,
      bins,
      counts,
      maxCount: Math.max(...counts),
    };
  }, [values]);

  const interpretation = {
    symmetric:
      "The distribution is fairly balanced. Mean and median are close, so mean and standard deviation may be reasonable summaries.",
    right:
      "The distribution has a long right tail. The mean is pulled upward and is larger than the median.",
    left:
      "The distribution has a long left tail. The mean is pulled downward and is smaller than the median.",
    bimodal:
      "The distribution has two clusters. This may suggest two subgroups that should be described separately.",
    outlier:
      "One extreme value strongly affects the mean and standard deviation. The median and IQR are more resistant.",
  };

  return (
    <LessonPanel>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
        Interactive lab
      </p>
      <h2 className="mt-2 text-3xl font-black tracking-tight">
        Explore shape, skewness and outliers
      </h2>

      <p className="mt-4 leading-8 text-neutral-600">
        Choose a distribution shape. Watch how the histogram, mean, median,
        quartiles and outlier fences change. The goal is to connect visual
        shape with numerical summaries.
      </p>

      <div className="mt-6 rounded-[1.5rem] border border-[#ded9cf] bg-[#fbfaf6] p-5">
        <div className="flex flex-wrap gap-2">
          <ChoiceButton active={shape === "symmetric"} onClick={() => setShape("symmetric")}>
            Symmetric
          </ChoiceButton>
          <ChoiceButton active={shape === "right"} onClick={() => setShape("right")}>
            Right-skewed
          </ChoiceButton>
          <ChoiceButton active={shape === "left"} onClick={() => setShape("left")}>
            Left-skewed
          </ChoiceButton>
          <ChoiceButton active={shape === "bimodal"} onClick={() => setShape("bimodal")}>
            Bimodal
          </ChoiceButton>
          <ChoiceButton active={shape === "outlier"} onClick={() => setShape("outlier")}>
            Outlier
          </ChoiceButton>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <StatCard label="Mean" value={stats.mean.toFixed(2)} />
          <StatCard label="Median" value={stats.median.toFixed(2)} />
          <StatCard label="Sample SD" value={stats.sd.toFixed(2)} />
          <StatCard label="IQR" value={stats.iqr.toFixed(2)} />
        </div>

        <div className="mt-6 rounded-2xl border border-[#ded9cf] bg-white p-5">
          <p className="text-sm font-black">Histogram-style display</p>

          <div className="mt-5 flex h-64 items-end gap-2 border-b border-l border-[#ded9cf] px-3 pt-4">
            {stats.counts.map((count, index) => {
              const height = stats.maxCount === 0 ? 0 : (count / stats.maxCount) * 100;

              return (
                <div key={`${stats.bins[index]}-${stats.bins[index + 1]}`} className="flex flex-1 flex-col items-center justify-end">
                  <div
                    className="w-full rounded-t-xl bg-blue-600"
                    style={{ height: `${height}%`, minHeight: count > 0 ? "12px" : "0px" }}
                    title={`${count} values`}
                  />
                  <p className="mt-2 text-[10px] font-bold text-neutral-700">
                    {stats.bins[index]}-{stats.bins[index + 1]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-black">Ordered data</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {stats.ordered.map((value, index) => {
              const isOutlier = stats.outliers.includes(value);

              return (
                <span
                  key={`${value}-${index}`}
                  className={`rounded-full border px-3 py-2 text-sm font-bold ${
                    isOutlier
                      ? "border-red-300 bg-red-50 text-red-800"
                      : "border-[#ded9cf] bg-white text-neutral-900"
                  }`}
                >
                  {value}
                </span>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <StatCard label="Q1" value={stats.q1.toFixed(2)} />
          <StatCard label="Q2 / Median" value={stats.q2.toFixed(2)} />
          <StatCard label="Q3" value={stats.q3.toFixed(2)} />
          <StatCard label="Outliers" value={stats.outliers.length ? stats.outliers.join(", ") : "None"} />
        </div>

        <div className="mt-6 rounded-2xl border border-[#ded9cf] bg-white p-5">
          <p className="text-sm font-black">Interpretation</p>
          <p className="mt-3 leading-8 text-neutral-600">{interpretation[shape]}</p>
          <p className="mt-3 text-sm leading-7 text-neutral-700">
            Lower fence = {stats.lowerFence.toFixed(2)}. Upper fence ={" "}
            {stats.upperFence.toFixed(2)}.
          </p>
        </div>
      </div>
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
        Step-by-step interpretation
      </h2>

      <WorkedExample
        title="Example 1 — Identify skewness from mean and median"
        question="A dataset has mean 42 and median 30. What type of skewness is suggested?"
      >
        <p className="leading-8 text-neutral-600">
          Since the mean is greater than the median, the distribution may be
          right-skewed. This suggests that some large values are pulling the
          mean upward.
        </p>
      </WorkedExample>

      <WorkedExample
        title="Example 2 — Apply the 1.5 × IQR rule"
        question="Suppose Q1 = 20 and Q3 = 40. Find the outlier fences."
      >
        <ol className="list-decimal space-y-3 pl-6 leading-8 text-neutral-600">
          <li>IQR = Q3 − Q1 = 40 − 20 = 20.</li>
          <li>Lower fence = Q1 − 1.5 × IQR = 20 − 30 = −10.</li>
          <li>Upper fence = Q3 + 1.5 × IQR = 40 + 30 = 70.</li>
          <li>Values below −10 or above 70 are flagged as potential outliers.</li>
        </ol>
      </WorkedExample>

      <WorkedExample
        title="Example 3 — Choose summaries for skewed data"
        question="Hospital length of stay has many patients staying 1–5 days, but a few staying 40+ days. Which summaries are best?"
      >
        <p className="leading-8 text-neutral-600">
          This variable is right-skewed. A few very long stays will pull the
          mean upward. The median and IQR are usually better summaries of the
          typical patient stay and the spread of the middle 50%.
        </p>
      </WorkedExample>

      <WorkedExample
        title="Example 4 — Bimodal data"
        question="A histogram of test scores has one peak around 35 and another around 80. What should we ask?"
      >
        <p className="leading-8 text-neutral-600">
          A bimodal distribution may indicate two subgroups, such as students
          from two different classes, two teaching methods, or different prior
          preparation levels. A single mean may hide this structure. It may be
          better to compare the groups separately.
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
            Good work. You should now be able to connect histograms, skewness,
            mean–median relationships, outlier detection and responsible
            reporting.
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
  a,
  b,
  c,
  d,
}: {
  a: string;
  b: string;
  c: string;
  d: string;
}) {
  return (
    <tr className="border-t border-[#ded9cf]">
      <td className="p-4 font-bold">{a}</td>
      <td className="p-4 text-neutral-600">{b}</td>
      <td className="p-4 text-neutral-600">{c}</td>
      <td className="p-4 text-neutral-600">{d}</td>
    </tr>
  );
}

function TableRow3({ a, b, c }: { a: string; b: string; c: string }) {
  return (
    <tr className="border-t border-[#ded9cf]">
      <td className="p-4 font-bold">{a}</td>
      <td className="p-4 text-neutral-600">{b}</td>
      <td className="p-4 text-neutral-600">{c}</td>
    </tr>
  );
}