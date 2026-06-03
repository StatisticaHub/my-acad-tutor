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
  },
  {
    number: "2.4",
    title: "Standardisation and z-scores",
    href: "/courses/statistics-foundation/modules/descriptive-statistics/lessons/z-scores",
    active: true,
  },
  {
    number: "2.5",
    title: "Correlation and association",
    href: "/courses/statistics-foundation/modules/descriptive-statistics/lessons/correlation-association",
  },
];

const quizQuestions = [
  {
    question: "What does a z-score measure?",
    options: [
      "The raw value of an observation.",
      "The number of observations in a dataset.",
      "How many standard deviations a value lies from the mean.",
      "The difference between Q3 and Q1.",
    ],
    answer: 2,
    explanation:
      "A z-score expresses a raw value as a distance from the mean measured in standard deviation units.",
  },
  {
    question: "If z = −1.5, what does this mean?",
    options: [
      "The value is 1.5 standard deviations below the mean.",
      "The value is 1.5 units below zero.",
      "The value is 1.5 standard deviations above the mean.",
      "The value is the largest observation.",
    ],
    answer: 0,
    explanation:
      "A negative z-score means the value is below the mean. A z-score of −1.5 means 1.5 standard deviations below the mean.",
  },
  {
    question:
      "Why are z-scores useful when comparing exam marks from two different subjects?",
    options: [
      "They remove the need for sample size.",
      "They put marks on a common standard deviation scale.",
      "They always prove which subject is harder.",
      "They convert numerical marks into categories.",
    ],
    answer: 1,
    explanation:
      "Z-scores allow comparison across distributions with different means and spreads by using standard deviation units.",
  },
  {
    question:
      "Which formula is the sample-based z-score formula?",
    options: [
      "z = x + x̄ + s",
      "z = (x − x̄) / s",
      "z = s / (x − x̄)",
      "z = Q3 − Q1",
    ],
    answer: 1,
    explanation:
      "For sample data, z = (x − x̄) / s, where x̄ is the sample mean and s is the sample standard deviation.",
  },
  {
    question:
      "Which warning about z-scores is most important?",
    options: [
      "Z-scores are always invalid.",
      "Z-scores are only for categorical variables.",
      "Z-scores rely on the mean and standard deviation, so skewness and outliers can affect interpretation.",
      "Z-scores do not use spread.",
    ],
    answer: 2,
    explanation:
      "Z-scores use the mean and standard deviation. If those are distorted by skewness or outliers, z-score interpretation must be cautious.",
  },
];

function getMean(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function getSampleSd(values: number[]) {
  const mean = getMean(values);
  const variance =
    values.reduce((sum, value) => sum + (value - mean) ** 2, 0) /
    (values.length - 1);

  return Math.sqrt(variance);
}

function getZScore(x: number, mean: number, sd: number) {
  if (sd === 0) return 0;
  return (x - mean) / sd;
}

export default function ZScoresPage() {
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
            <div className="h-1 w-[36%] bg-blue-600" />
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
                Module 2 · Lesson 2.4
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl md:text-6xl">
                Standardisation and Z-scores
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-600">
                A raw value is hard to interpret without context.
                Standardisation converts a value into a standard unit so we can
                compare observations across different distributions, units and
                scales.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Badge>Z-score</Badge>
                <Badge>Standard units</Badge>
                <Badge>Relative position</Badge>
                <Badge>Outlier detection</Badge>
                <Badge>Comparison across scales</Badge>
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
                  Next lesson: Correlation and association
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70">
                  Z-scores prepare us for correlation, because correlation is
                  closely related to the idea of standardising two variables and
                  studying how they move together.
                </p>
              </div>
              <a
                href="/courses/statistics-foundation/modules/descriptive-statistics/lessons/correlation-association"
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
        A raw value needs context
      </h2>

      <SceneLabel>Scene — comparing two exam results</SceneLabel>

      <Dialogue
        speaker="Emma"
        initials="EM"
        side="left"
        text="I scored 78 in statistics and 82 in biology. So biology was definitely my better performance, right?"
      />
      <Dialogue
        speaker="Mr. R"
        initials="MR"
        side="right"
        text="Not necessarily. A raw score only tells us the value itself. To judge performance, we also need to know the average and spread in each exam."
      />
      <Dialogue
        speaker="Oliver"
        initials="OL"
        side="left"
        text="So 78 could be excellent if everyone else scored around 55, but ordinary if everyone scored around 80?"
      />
      <Dialogue
        speaker="Mr. R"
        initials="MR"
        side="right"
        text="Exactly. That is the idea behind standardisation. We transform a raw value into a z-score, which tells us how many standard deviations the value is from the mean."
      />

      <DefinitionBox title="Big idea" tone="amber">
        Standardisation gives a raw value context by expressing it as a distance
        from the mean in standard deviation units.
      </DefinitionBox>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        The z-score formula
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        A z-score measures position relative to the mean. Instead of saying
        “this value is 12 marks above the average”, we say “this value is 1.5
        standard deviations above the average”. This makes comparisons fairer
        when different variables have different scales or variability.
      </p>

      <MathBlock>z = (x − mean) / standard deviation</MathBlock>

      <Dialogue
        speaker="James"
        initials="JA"
        side="left"
        text="If my z-score is 2, does that mean I am exactly 2 marks above the mean?"
      />
      <Dialogue
        speaker="Mr. R"
        initials="MR"
        side="right"
        text="No. It means you are two standard deviations above the mean. If the standard deviation is 5 marks, that means 10 marks above the mean. If the standard deviation is 12 marks, that means 24 marks above the mean."
      />

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        Interpreting sign and size
      </h3>

      <div className="mt-5 overflow-x-auto rounded-[1.2rem] border border-[#ded9cf]">
        <table className="w-full min-w-[760px] border-collapse bg-white text-sm">
          <thead className="bg-[#f8f6f1]">
            <tr>
              <th className="p-4 text-left font-black">Z-score</th>
              <th className="p-4 text-left font-black">Meaning</th>
              <th className="p-4 text-left font-black">Interpretation</th>
            </tr>
          </thead>
          <tbody>
            <TableRow
              a="z = 0"
              b="At the mean"
              c="The value is exactly average for that distribution."
            />
            <TableRow
              a="z > 0"
              b="Above the mean"
              c="Positive values are higher than average."
            />
            <TableRow
              a="z < 0"
              b="Below the mean"
              c="Negative values are lower than average."
            />
            <TableRow
              a="|z| ≈ 1"
              b="About one SD from the mean"
              c="Not usually very unusual."
            />
            <TableRow
              a="|z| ≥ 2"
              b="At least two SDs from the mean"
              c="Often considered unusual in roughly symmetric data."
            />
            <TableRow
              a="|z| ≥ 3"
              b="At least three SDs from the mean"
              c="Often considered very unusual, but context matters."
            />
          </tbody>
        </table>
      </div>

      <Dialogue
        speaker="Sophia"
        initials="SO"
        side="left"
        text="Can z-scores help detect outliers?"
      />
      <Dialogue
        speaker="Mr. R"
        initials="MR"
        side="right"
        text="They can flag unusual values. In many roughly symmetric datasets, values beyond about ±2 may be unusual and beyond about ±3 may be very unusual. But for skewed data, z-scores must be interpreted carefully."
      />

      <DefinitionBox title="Important caution" tone="red">
        Z-scores rely on the mean and standard deviation. If the data are
        strongly skewed or contain severe outliers, the mean and standard
        deviation may themselves be distorted.
      </DefinitionBox>

      <Takeaway
        points={[
          "A raw value needs context before it can be interpreted.",
          "A z-score expresses a value in standard deviation units.",
          "Positive z-scores are above the mean; negative z-scores are below the mean.",
          "Z-scores allow comparison across variables with different scales.",
          "Large absolute z-scores may suggest unusual values, but shape and context matter.",
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
        Standardisation and z-scores in depth
      </h2>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        1. Why raw values are not always enough
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        A raw data value tells us what was observed, but it does not tell us
        whether that value is typical, high, low or unusual. To interpret a
        value properly, we need to compare it with the distribution from which
        it came.
      </p>

      <p className="leading-8 text-neutral-600">
        For example, a test score of 75 may be excellent in a difficult exam
        with mean 50 and standard deviation 10. But it may be ordinary in an
        easy exam with mean 73 and standard deviation 8. The raw score alone is
        incomplete.
      </p>

      <DefinitionBox title="Core idea">
        Standardisation converts a raw value into a relative position within
        its own distribution.
      </DefinitionBox>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        2. Population and sample z-scores
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        If the population mean μ and population standard deviation σ are known,
        the population z-score is:
      </p>

      <MathBlock>z = (x − μ) / σ</MathBlock>

      <p className="leading-8 text-neutral-600">
        In most practical descriptive summaries, we work with sample data. If
        the sample mean is x̄ and the sample standard deviation is s, then the
        sample z-score is:
      </p>

      <MathBlock>z = (x − x̄) / s</MathBlock>

      <div className="mt-5 overflow-x-auto rounded-[1.2rem] border border-[#ded9cf]">
        <table className="w-full min-w-[760px] border-collapse bg-white text-sm">
          <thead className="bg-[#f8f6f1]">
            <tr>
              <th className="p-4 text-left font-black">Symbol</th>
              <th className="p-4 text-left font-black">Meaning</th>
            </tr>
          </thead>
          <tbody>
            <TableRow2 a="x" b="The raw value being standardised" />
            <TableRow2 a="μ" b="Population mean" />
            <TableRow2 a="σ" b="Population standard deviation" />
            <TableRow2 a="x̄" b="Sample mean" />
            <TableRow2 a="s" b="Sample standard deviation" />
            <TableRow2
              a="z"
              b="The number of standard deviations the value lies from the mean"
            />
          </tbody>
        </table>
      </div>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        3. The two-step logic of standardisation
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        The z-score formula has two conceptual steps:
      </p>

      <DerivationBox
        title="Understanding z = (x − x̄) / s"
        steps={[
          {
            math: "x − x̄",
            note: "Subtract the mean. This centres the value by measuring how far it is from average.",
          },
          {
            math: "(x − x̄) / s",
            note: "Divide by the standard deviation. This changes the unit from raw units to standard deviation units.",
          },
          {
            math: "z = 0",
            note: "A value exactly equal to the mean has z-score 0.",
          },
          {
            math: "z = 1",
            note: "The value is one standard deviation above the mean.",
          },
          {
            math: "z = −1",
            note: "The value is one standard deviation below the mean.",
          },
        ]}
      />

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        4. Standard units
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        After standardisation, the value no longer has its original unit. A
        height measured in centimetres, an exam score measured in marks, and a
        blood pressure measured in mmHg can all be placed on a common z-score
        scale.
      </p>

      <DefinitionBox title="Definition — standard unit" tone="green">
        A standard unit is one standard deviation of the original variable. A
        z-score tells us how many standard units a value is above or below the
        mean.
      </DefinitionBox>

      <p className="leading-8 text-neutral-600">
        This is why z-scores are useful when comparing observations measured on
        different scales. They remove the original unit and replace it with a
        relative position.
      </p>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        5. Comparing across different distributions
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        Suppose a student scores 78 in statistics and 82 in biology. The biology
        score is higher in raw marks. But if statistics had mean 60 and SD 9,
        while biology had mean 80 and SD 4, then the statistics performance is
        much more unusual relative to its class.
      </p>

      <MathBlock>Statistics: z = (78 − 60) / 9 = 2</MathBlock>
      <MathBlock>Biology: z = (82 − 80) / 4 = 0.5</MathBlock>

      <p className="leading-8 text-neutral-600">
        The student is two standard deviations above the statistics mean, but
        only half a standard deviation above the biology mean. Relative to the
        class distribution, the statistics score is stronger.
      </p>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        6. Z-scores and outliers
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        Z-scores are sometimes used to flag unusual values. A common descriptive
        rule is:
      </p>

      <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-neutral-600">
        <li>|z| greater than about 2 may be unusual.</li>
        <li>|z| greater than about 3 may be very unusual.</li>
      </ul>

      <MathBlock>|z| = absolute distance from the mean in SD units</MathBlock>

      <DefinitionBox title="Caution" tone="red">
        These are screening guidelines, not automatic deletion rules. A value
        with a large z-score may be an error, but it may also be a genuine
        extreme observation.
      </DefinitionBox>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        7. Z-scores and distribution shape
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        Z-scores are easiest to interpret when the distribution is roughly
        symmetric and the mean and standard deviation are sensible summaries.
        In strongly skewed distributions, the mean and standard deviation can be
        pulled by the tail, which makes z-scores harder to interpret.
      </p>

      <div className="mt-5 overflow-x-auto rounded-[1.2rem] border border-[#ded9cf]">
        <table className="w-full min-w-[760px] border-collapse bg-white text-sm">
          <thead className="bg-[#f8f6f1]">
            <tr>
              <th className="p-4 text-left font-black">Data situation</th>
              <th className="p-4 text-left font-black">Z-score usefulness</th>
              <th className="p-4 text-left font-black">Warning</th>
            </tr>
          </thead>
          <tbody>
            <TableRow
              a="Roughly symmetric data"
              b="Usually useful"
              c="Mean and SD are often meaningful."
            />
            <TableRow
              a="Strongly skewed data"
              b="Use carefully"
              c="Mean and SD may be distorted by the tail."
            />
            <TableRow
              a="Severe outliers"
              b="Use carefully"
              c="Outliers can inflate SD and reduce apparent extremeness."
            />
            <TableRow
              a="Categorical data"
              b="Not appropriate"
              c="Z-scores require numerical measurements."
            />
          </tbody>
        </table>
      </div>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        8. Standardisation as preparation for later statistics
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        Standardisation appears throughout statistics. It is used in correlation,
        normal distributions, confidence intervals, hypothesis testing,
        regression diagnostics and many multivariable methods. This lesson is
        therefore not only about describing a single value; it introduces a
        mathematical habit that appears repeatedly in later modules.
      </p>

      <DefinitionBox title="Looking ahead" tone="purple">
        In Lesson 2.5, correlation can be understood partly as an average
        product of standardised x-values and standardised y-values. This is why
        z-scores are an important bridge to association.
      </DefinitionBox>
    </LessonPanel>
  );
}

function InteractiveLab() {
  const [mean, setMean] = useState(70);
  const [sd, setSd] = useState(10);
  const [rawValue, setRawValue] = useState(85);

  const z = useMemo(() => getZScore(rawValue, mean, sd), [rawValue, mean, sd]);

  const interpretation = useMemo(() => {
    if (z === 0) return "This value is exactly at the mean.";
    if (z > 0 && z < 1) return "This value is above the mean, but less than one standard deviation away.";
    if (z >= 1 && z < 2) return "This value is clearly above average.";
    if (z >= 2 && z < 3) return "This value is unusually high in many roughly symmetric datasets.";
    if (z >= 3) return "This value is very high relative to the distribution; investigate context.";
    if (z < 0 && z > -1) return "This value is below the mean, but less than one standard deviation away.";
    if (z <= -1 && z > -2) return "This value is clearly below average.";
    if (z <= -2 && z > -3) return "This value is unusually low in many roughly symmetric datasets.";
    return "This value is very low relative to the distribution; investigate context.";
  }, [z]);

  const positions = [
    { label: "−3 SD", value: mean - 3 * sd },
    { label: "−2 SD", value: mean - 2 * sd },
    { label: "−1 SD", value: mean - sd },
    { label: "Mean", value: mean },
    { label: "+1 SD", value: mean + sd },
    { label: "+2 SD", value: mean + 2 * sd },
    { label: "+3 SD", value: mean + 3 * sd },
  ];

  const minScale = mean - 3.5 * sd;
  const maxScale = mean + 3.5 * sd;
  const rawLeft = ((rawValue - minScale) / (maxScale - minScale)) * 100;

  return (
    <LessonPanel>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
        Interactive lab
      </p>
      <h2 className="mt-2 text-3xl font-black tracking-tight">
        Convert a raw value into a z-score
      </h2>

      <p className="mt-4 leading-8 text-neutral-600">
        Adjust the mean, standard deviation and raw value. Watch how the
        z-score changes. The raw value only becomes meaningful after it is
        placed relative to its distribution.
      </p>

      <div className="mt-6 rounded-[1.5rem] border border-[#ded9cf] bg-[#fbfaf6] p-5">
        <div className="grid gap-5 md:grid-cols-3">
          <SliderControl
            label="Mean"
            value={mean}
            min={30}
            max={100}
            onChange={setMean}
          />
          <SliderControl
            label="Standard deviation"
            value={sd}
            min={2}
            max={25}
            onChange={setSd}
          />
          <SliderControl
            label="Raw value"
            value={rawValue}
            min={0}
            max={140}
            onChange={setRawValue}
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <StatCard label="Mean" value={mean.toFixed(1)} />
          <StatCard label="SD" value={sd.toFixed(1)} />
          <StatCard label="Raw value" value={rawValue.toFixed(1)} />
          <StatCard label="Z-score" value={z.toFixed(2)} />
        </div>

        <div className="mt-6 rounded-2xl border border-[#ded9cf] bg-white p-5">
          <p className="text-sm font-black">Standard deviation scale</p>

          <div className="relative mt-8 h-28">
            <div className="absolute left-0 right-0 top-12 h-[2px] bg-[#ded9cf]" />

            {positions.map((position) => {
              const left =
                ((position.value - minScale) / (maxScale - minScale)) * 100;

              return (
                <div
                  key={position.label}
                  className="absolute top-4 -translate-x-1/2 text-center"
                  style={{ left: `${left}%` }}
                >
                  <div className="mx-auto h-14 w-[2px] bg-neutral-300" />
                  <p className="mt-2 text-[10px] font-black text-neutral-700">
                    {position.label}
                  </p>
                  <p className="text-[10px] font-bold text-neutral-700">
                    {position.value.toFixed(0)}
                  </p>
                </div>
              );
            })}

            <div
              className="absolute top-7 -translate-x-1/2 text-center"
              style={{ left: `${Math.max(0, Math.min(100, rawLeft))}%` }}
            >
              <div className="mx-auto h-10 w-10 rounded-full bg-blue-600 shadow-lg" />
              <p className="mt-2 rounded-full bg-blue-50 px-2 py-1 text-[10px] font-black text-blue-800">
                x = {rawValue}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#ded9cf] bg-white p-5">
          <p className="text-sm font-black">Interpretation</p>
          <p className="mt-3 leading-8 text-neutral-600">{interpretation}</p>
          <MathBlock>
            z = ({rawValue} − {mean}) / {sd} = {z.toFixed(2)}
          </MathBlock>
        </div>
      </div>

      <DefinitionBox title="What to notice" tone="amber">
        The same raw value can have a different z-score if the mean or standard
        deviation changes. A value is not “high” or “low” in isolation; it is
        high or low relative to a distribution.
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
        title="Example 1 — Basic z-score"
        question="A student scores 85 on an exam with mean 70 and standard deviation 10. Find and interpret the z-score."
      >
        <ol className="list-decimal space-y-3 pl-6 leading-8 text-neutral-600">
          <li>Use the formula z = (x − x̄) / s.</li>
          <li>Substitute x = 85, x̄ = 70 and s = 10.</li>
          <li>z = (85 − 70) / 10 = 15 / 10 = 1.5.</li>
          <li>
            The score is 1.5 standard deviations above the class mean.
          </li>
        </ol>
      </WorkedExample>

      <WorkedExample
        title="Example 2 — Negative z-score"
        question="A patient has a measurement of 42. The sample mean is 50 and the sample standard deviation is 4. Find and interpret the z-score."
      >
        <ol className="list-decimal space-y-3 pl-6 leading-8 text-neutral-600">
          <li>z = (x − x̄) / s.</li>
          <li>z = (42 − 50) / 4 = −8 / 4 = −2.</li>
          <li>
            The measurement is 2 standard deviations below the sample mean.
          </li>
          <li>
            In a roughly symmetric dataset, this may be considered unusually
            low and should be interpreted in context.
          </li>
        </ol>
      </WorkedExample>

      <WorkedExample
        title="Example 3 — Comparing two exam scores"
        question="Emma scores 78 in statistics where mean = 60 and SD = 9. She scores 82 in biology where mean = 80 and SD = 4. Which performance is stronger relative to the class?"
      >
        <ol className="list-decimal space-y-3 pl-6 leading-8 text-neutral-600">
          <li>Statistics: z = (78 − 60) / 9 = 18 / 9 = 2.</li>
          <li>Biology: z = (82 − 80) / 4 = 2 / 4 = 0.5.</li>
          <li>
            Although the raw biology mark is higher, the statistics performance
            is stronger relative to the class distribution.
          </li>
        </ol>
      </WorkedExample>

      <WorkedExample
        title="Example 4 — Outlier screening"
        question="A value has z = 3.4. Should it automatically be removed?"
      >
        <p className="leading-8 text-neutral-600">
          No. A z-score of 3.4 indicates that the value is far from the mean in
          standard deviation units. It should be investigated, but not
          automatically removed. The value may be a data-entry error, a
          measurement problem, a rare but genuine observation, or evidence of a
          different subgroup.
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
            Good work. You should now be able to calculate, interpret and
            critique z-scores, especially when comparing values across
            different distributions.
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
      <p className="mt-2 text-xl font-black tracking-tight">{value}</p>
    </div>
  );
}

function SliderControl({
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
    <div>
      <label className="text-sm font-black">
        {label}: {value}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 w-full accent-blue-600"
      />
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
  a,
  b,
  c,
}: {
  a: string;
  b: string;
  c: string;
}) {
  return (
    <tr className="border-t border-[#ded9cf]">
      <td className="p-4 font-bold">{a}</td>
      <td className="p-4 text-neutral-600">{b}</td>
      <td className="p-4 text-neutral-600">{c}</td>
    </tr>
  );
}

function TableRow2({ a, b }: { a: string; b: string }) {
  return (
    <tr className="border-t border-[#ded9cf]">
      <td className="p-4 font-bold">{a}</td>
      <td className="p-4 text-neutral-600">{b}</td>
    </tr>
  );
}