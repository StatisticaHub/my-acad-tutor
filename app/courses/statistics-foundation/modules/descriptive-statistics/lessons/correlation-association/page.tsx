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
  },
  {
    number: "2.5",
    title: "Correlation and association",
    href: "/courses/statistics-foundation/modules/descriptive-statistics/lessons/correlation-association",
    active: true,
  },
];

const quizQuestions = [
  {
    question: "What does Pearson correlation measure?",
    options: [
      "The mean of one numerical variable.",
      "The direction and strength of a linear relationship between two numerical variables.",
      "The number of categories in a variable.",
      "The difference between Q3 and Q1.",
    ],
    answer: 1,
    explanation:
      "Pearson correlation measures the direction and strength of a linear association between two numerical variables.",
  },
  {
    question: "Which value of r indicates the strongest negative linear association?",
    options: ["r = 0.05", "r = 0.90", "r = −0.88", "r = 0"],
    answer: 2,
    explanation:
      "Values close to −1 indicate strong negative linear association. The value −0.88 is strongly negative.",
  },
  {
    question: "Why should a scatterplot be examined before calculating correlation?",
    options: [
      "Because correlation can hide non-linearity, clusters and outliers.",
      "Because scatterplots replace all calculations.",
      "Because correlation is only for categorical data.",
      "Because scatterplots always prove causation.",
    ],
    answer: 0,
    explanation:
      "A scatterplot reveals form, direction, strength, clusters and outliers. A single correlation coefficient can hide these features.",
  },
  {
    question: "If r is close to 0, what is the safest interpretation?",
    options: [
      "There is definitely no relationship of any kind.",
      "There is little or no linear association.",
      "The variables must be causally unrelated.",
      "The data must be categorical.",
    ],
    answer: 1,
    explanation:
      "Pearson r measures linear association. A value near 0 means little linear association, but a curved relationship may still exist.",
  },
  {
    question: "Which statement is most statistically responsible?",
    options: [
      "Correlation proves causation.",
      "A strong correlation is enough to prove treatment effectiveness.",
      "Correlation describes association, but causal claims require stronger design and reasoning.",
      "Correlation can only be positive.",
    ],
    answer: 2,
    explanation:
      "Correlation alone does not prove causation. Causal interpretation requires study design, temporality, confounding assessment and subject-matter reasoning.",
  },
];

type Point = {
  x: number;
  y: number;
};

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

function getCorrelation(points: Point[]) {
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);

  const xbar = getMean(xs);
  const ybar = getMean(ys);
  const sx = getSampleSd(xs);
  const sy = getSampleSd(ys);

  if (sx === 0 || sy === 0) return 0;

  const sumProducts = points.reduce((sum, point) => {
    return sum + ((point.x - xbar) / sx) * ((point.y - ybar) / sy);
  }, 0);

  return sumProducts / (points.length - 1);
}

function getCovariance(points: Point[]) {
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);

  const xbar = getMean(xs);
  const ybar = getMean(ys);

  return (
    points.reduce((sum, point) => {
      return sum + (point.x - xbar) * (point.y - ybar);
    }, 0) /
    (points.length - 1)
  );
}

function getRegressionLine(points: Point[]) {
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);

  const xbar = getMean(xs);
  const ybar = getMean(ys);
  const sx = getSampleSd(xs);
  const sy = getSampleSd(ys);
  const r = getCorrelation(points);

  const slope = sx === 0 ? 0 : r * (sy / sx);
  const intercept = ybar - slope * xbar;

  return { slope, intercept };
}

function createPoints(pattern: "positive" | "negative" | "weak" | "curved" | "outlier") {
  if (pattern === "positive") {
    return [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 4.8 },
      { x: 5, y: 6 },
      { x: 6, y: 6.9 },
      { x: 7, y: 8 },
      { x: 8, y: 8.5 },
      { x: 9, y: 10 },
    ];
  }

  if (pattern === "negative") {
    return [
      { x: 1, y: 10 },
      { x: 2, y: 9 },
      { x: 3, y: 8.2 },
      { x: 4, y: 7 },
      { x: 5, y: 6.3 },
      { x: 6, y: 5 },
      { x: 7, y: 4.1 },
      { x: 8, y: 3 },
      { x: 9, y: 2.2 },
    ];
  }

  if (pattern === "weak") {
    return [
      { x: 1, y: 5 },
      { x: 2, y: 8 },
      { x: 3, y: 4 },
      { x: 4, y: 7 },
      { x: 5, y: 5.5 },
      { x: 6, y: 3 },
      { x: 7, y: 8.5 },
      { x: 8, y: 4.5 },
      { x: 9, y: 6 },
    ];
  }

  if (pattern === "curved") {
    return [
      { x: 1, y: 9 },
      { x: 2, y: 6 },
      { x: 3, y: 4 },
      { x: 4, y: 2.5 },
      { x: 5, y: 2 },
      { x: 6, y: 2.7 },
      { x: 7, y: 4.2 },
      { x: 8, y: 6.5 },
      { x: 9, y: 9.5 },
    ];
  }

  return [
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 3.6 },
    { x: 4, y: 4.4 },
    { x: 5, y: 5 },
    { x: 6, y: 5.8 },
    { x: 7, y: 6.5 },
    { x: 8, y: 7.1 },
    { x: 9, y: 1.5 },
  ];
}

export default function CorrelationAssociationPage() {
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
            <div className="h-1 w-[40%] bg-blue-600" />
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
                Module 2 · Lesson 2.5
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] md:text-6xl">
                Correlation and Association
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-600">
                This final lesson in Module 2 moves from describing one variable
                to describing how two numerical variables move together using
                scatterplots, covariance, standardisation and Pearson
                correlation.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Badge>Scatterplots</Badge>
                <Badge>Association</Badge>
                <Badge>Covariance</Badge>
                <Badge>Pearson r</Badge>
                <Badge>Outliers</Badge>
                <Badge>Correlation ≠ causation</Badge>
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
                  Module 2 complete
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70">
                  You have now covered centre, spread, shape, standardisation
                  and association. Next, we move into probability foundations.
                </p>
              </div>
              <a
                href="/courses/statistics-foundation/modules/probability-foundations"
                className="rounded-full bg-white px-6 py-3 text-sm font-black text-neutral-950"
              >
                Start Module 3 →
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
        From one variable to two variables
      </h2>

      <SceneLabel>Scene — students are looking at a scatterplot</SceneLabel>

      <Dialogue
        speaker="Emma"
        initials="EM"
        side="left"
        text="I can see that students who study more hours often get higher marks. Is that what correlation means?"
      />
      <Dialogue
        speaker="Mr. R"
        initials="MR"
        side="right"
        text="That is the basic idea. Correlation measures the direction and strength of a linear relationship between two numerical variables."
      />
      <Dialogue
        speaker="Oliver"
        initials="OL"
        side="left"
        text="Direction means whether both variables go up together, or one goes down when the other goes up?"
      />
      <Dialogue
        speaker="Mr. R"
        initials="MR"
        side="right"
        text="Exactly. Positive association means larger values of one variable tend to occur with larger values of the other. Negative association means larger values of one tend to occur with smaller values of the other."
      />

      <DefinitionBox title="Big idea" tone="amber">
        Association describes whether the values of one variable tend to change
        systematically with the values of another variable.
      </DefinitionBox>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        Scatterplots first, correlation second
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        Before calculating a correlation coefficient, always look at a
        scatterplot. A scatterplot shows each observational unit as a point. The
        x-coordinate gives one variable and the y-coordinate gives the other.
        It reveals direction, strength, form, clusters and outliers.
      </p>

      <Dialogue
        speaker="James"
        initials="JA"
        side="left"
        text="So if the points slope upward, that is positive association?"
      />
      <Dialogue
        speaker="Mr. R"
        initials="MR"
        side="right"
        text="Yes. Upward pattern: positive. Downward pattern: negative. No clear pattern: weak or no association. But the shape also matters, because Pearson correlation is mainly designed for linear relationships."
      />

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        Pearson correlation coefficient
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        The Pearson correlation coefficient is usually written as r. It ranges
        from −1 to +1.
      </p>

      <MathBlock>−1 ≤ r ≤ +1</MathBlock>

      <div className="mt-5 overflow-x-auto rounded-[1.2rem] border border-[#ded9cf]">
        <table className="w-full min-w-[760px] border-collapse bg-white text-sm">
          <thead className="bg-[#f8f6f1]">
            <tr>
              <th className="p-4 text-left font-black">Value of r</th>
              <th className="p-4 text-left font-black">Direction</th>
              <th className="p-4 text-left font-black">Strength</th>
              <th className="p-4 text-left font-black">Interpretation</th>
            </tr>
          </thead>
          <tbody>
            <TableRow4
              a="r close to +1"
              b="Positive"
              c="Strong"
              d="Points lie close to an upward-sloping line"
            />
            <TableRow4
              a="r close to −1"
              b="Negative"
              c="Strong"
              d="Points lie close to a downward-sloping line"
            />
            <TableRow4
              a="r close to 0"
              b="Little linear direction"
              c="Weak linear association"
              d="No clear straight-line pattern"
            />
          </tbody>
        </table>
      </div>

      <Dialogue
        speaker="Sophia"
        initials="SO"
        side="left"
        text="If r = 0, does that mean the variables are completely unrelated?"
      />
      <Dialogue
        speaker="Mr. R"
        initials="MR"
        side="right"
        text="Not necessarily. It means there is little or no linear association. There could still be a curved relationship. That is why the scatterplot matters."
      />

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        Correlation is not causation
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        Correlation describes how two variables move together. It does not by
        itself prove that one variable causes the other. Association may arise
        from causation, reverse causation, confounding, selection effects,
        shared measurement patterns or coincidence.
      </p>

      <DefinitionBox title="Important warning" tone="red">
        A correlation coefficient alone cannot establish causality. Causal
        claims require stronger design, temporal reasoning, control of
        confounding and subject-matter knowledge.
      </DefinitionBox>

      <Dialogue
        speaker="Emma"
        initials="EM"
        side="left"
        text="If study hours and marks are positively correlated, can I say studying causes higher marks?"
      />
      <Dialogue
        speaker="Mr. R"
        initials="MR"
        side="right"
        text="You can say they are associated. To make a causal claim, you would need stronger evidence and careful consideration of prior ability, teaching quality, motivation, sleep, assessment type and other factors."
      />

      <Takeaway
        points={[
          "Association means two variables vary together systematically.",
          "Scatterplots should be examined before calculating correlation.",
          "Pearson r measures direction and strength of linear association.",
          "A value of r near 0 does not rule out a curved relationship.",
          "Outliers can strongly change correlation.",
          "Correlation alone does not prove causation.",
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
        Association, covariance and Pearson correlation
      </h2>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        1. Association between two variables
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        In the previous lessons of Module 2, we described one variable at a
        time. We summarised centre, spread, shape and relative position. In many
        real studies, however, the scientific question involves two variables:
        do they move together, and if so, in what direction and how strongly?
      </p>

      <DefinitionBox title="Definition — association">
        Two variables are associated if the distribution of one variable changes
        systematically as the other variable changes.
      </DefinitionBox>

      <p className="leading-8 text-neutral-600">
        Examples include height and weight, study hours and exam marks, age and
        blood pressure, dose and response, temperature and enzyme activity, or
        deprivation score and disease rate.
      </p>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        2. Scatterplots
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        A scatterplot displays paired numerical data. Each individual, patient,
        object or observational unit contributes one point with coordinates
        (xᵢ, yᵢ).
      </p>

      <DefinitionBox title="Definition — scatterplot" tone="green">
        A scatterplot is a graph for paired numerical data where each point
        represents one observation with coordinates (xᵢ, yᵢ).
      </DefinitionBox>

      <p className="leading-8 text-neutral-600">
        A good scatterplot should be examined for:
      </p>

      <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-neutral-600">
        <li>
          <strong>direction:</strong> positive, negative or no clear direction;
        </li>
        <li>
          <strong>form:</strong> linear, curved, clustered or irregular;
        </li>
        <li>
          <strong>strength:</strong> how tightly points follow the pattern;
        </li>
        <li>
          <strong>outliers:</strong> points far from the main cloud;
        </li>
        <li>
          <strong>clusters:</strong> subgroups that may need separate analysis.
        </li>
      </ul>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        3. Direction of association
      </h3>

      <div className="mt-5 overflow-x-auto rounded-[1.2rem] border border-[#ded9cf]">
        <table className="w-full min-w-[760px] border-collapse bg-white text-sm">
          <thead className="bg-[#f8f6f1]">
            <tr>
              <th className="p-4 text-left font-black">Pattern</th>
              <th className="p-4 text-left font-black">Meaning</th>
              <th className="p-4 text-left font-black">Example</th>
            </tr>
          </thead>
          <tbody>
            <TableRow3
              a="Positive association"
              b="Larger x-values tend to occur with larger y-values"
              c="Study hours and exam score"
            />
            <TableRow3
              a="Negative association"
              b="Larger x-values tend to occur with smaller y-values"
              c="Exercise time and resting heart rate"
            />
            <TableRow3
              a="Weak or no linear association"
              b="No clear straight-line trend"
              c="Shoe size and exam score"
            />
          </tbody>
        </table>
      </div>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        4. Covariance
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        Correlation is built from covariance. Covariance measures whether x and
        y tend to deviate from their means in the same direction or in opposite
        directions.
      </p>

      <MathBlock>
        sxy = Σ(xᵢ − x̄)(yᵢ − ȳ) / (n − 1)
      </MathBlock>

      <p className="leading-8 text-neutral-600">
        If observations with x above its mean also tend to have y above its
        mean, the products of deviations are often positive and covariance is
        positive. If x above its mean tends to occur with y below its mean, the
        products are often negative and covariance is negative.
      </p>

      <DefinitionBox title="Limitation of covariance" tone="amber">
        Covariance depends on the units of x and y. If we measure height in
        metres instead of centimetres, the covariance changes. This makes raw
        covariance hard to compare across studies or variables.
      </DefinitionBox>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        5. Pearson correlation as standardised covariance
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        Pearson correlation solves the unit problem by dividing covariance by
        the product of the two standard deviations.
      </p>

      <MathBlock>r = sxy / (sx sy)</MathBlock>

      <p className="leading-8 text-neutral-600">
        Equivalently, Pearson correlation can be written as the average product
        of the z-scores of x and y:
      </p>

      <MathBlock>
        r = Σ zxᵢ zyᵢ / (n − 1)
      </MathBlock>

      <DerivationBox
        title="Why correlation is linked to z-scores"
        steps={[
          {
            math: "zxᵢ = (xᵢ − x̄) / sx",
            note: "Standardise each x-value.",
          },
          {
            math: "zyᵢ = (yᵢ − ȳ) / sy",
            note: "Standardise each y-value.",
          },
          {
            math: "zxᵢzyᵢ = [(xᵢ − x̄)(yᵢ − ȳ)] / (sxsy)",
            note: "Multiply the two standardised deviations.",
          },
          {
            math: "Σzxᵢzyᵢ / (n − 1)",
            note: "Average the products of standardised deviations.",
          },
          {
            math: "r = sxy / (sxsy)",
            note: "This is the Pearson correlation coefficient.",
          },
        ]}
      />

      <DefinitionBox title="Interpretation" tone="green">
        Correlation is unit-free. It does not depend on whether height is
        measured in centimetres or metres, because both variables are
        standardised before association is summarised.
      </DefinitionBox>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        6. Interpreting r
      </h3>

      <MathBlock>−1 ≤ r ≤ +1</MathBlock>

      <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-neutral-600">
        <li>
          r close to +1 means a strong positive linear association.
        </li>
        <li>
          r close to −1 means a strong negative linear association.
        </li>
        <li>
          r close to 0 means little or no linear association.
        </li>
      </ul>

      <DefinitionBox title="Important" tone="purple">
        The word linear is essential. A curved relationship can have correlation
        close to zero even when the variables are strongly related.
      </DefinitionBox>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        7. Outliers and correlation
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        Correlation can be strongly affected by outliers. A single unusual point
        can make an association appear stronger, weaker or even reverse its
        direction. This is why scatterplots are essential.
      </p>

      <DefinitionBox title="Warning" tone="red">
        Do not report correlation without checking the scatterplot. The value of
        r can be misleading when there are outliers, clusters, non-linear
        patterns or restricted ranges.
      </DefinitionBox>

      <h3 className="mt-8 text-2xl font-black tracking-tight">
        8. Correlation and causation
      </h3>

      <p className="mt-3 leading-8 text-neutral-600">
        Correlation is descriptive. It describes how variables move together in
        observed data. It does not prove that changing one variable will change
        the other.
      </p>

      <p className="leading-8 text-neutral-600">
        Association may arise because:
      </p>

      <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-neutral-600">
        <li>x causes y;</li>
        <li>y causes x;</li>
        <li>a third variable causes both x and y;</li>
        <li>the data are selected in a biased way;</li>
        <li>measurement processes create an artificial association;</li>
        <li>the association is coincidental.</li>
      </ul>

      <DefinitionBox title="Causal language caution" tone="red">
        Use “associated with”, “related to” or “correlated with” unless the
        study design and causal reasoning justify stronger causal language.
      </DefinitionBox>
    </LessonPanel>
  );
}

function InteractiveLab() {
  const [pattern, setPattern] = useState<
    "positive" | "negative" | "weak" | "curved" | "outlier"
  >("positive");

  const points = useMemo(() => createPoints(pattern), [pattern]);

  const stats = useMemo(() => {
    const xs = points.map((point) => point.x);
    const ys = points.map((point) => point.y);

    const r = getCorrelation(points);
    const covariance = getCovariance(points);
    const line = getRegressionLine(points);

    return {
      meanX: getMean(xs),
      meanY: getMean(ys),
      sdX: getSampleSd(xs),
      sdY: getSampleSd(ys),
      r,
      covariance,
      slope: line.slope,
      intercept: line.intercept,
      minX: Math.min(...xs),
      maxX: Math.max(...xs),
      minY: Math.min(...ys),
      maxY: Math.max(...ys),
    };
  }, [points]);

  const interpretation = {
    positive:
      "The points follow an upward pattern. Pearson r is positive because above-average x-values tend to occur with above-average y-values.",
    negative:
      "The points follow a downward pattern. Pearson r is negative because above-average x-values tend to occur with below-average y-values.",
    weak:
      "There is little straight-line pattern. Pearson r is close to zero because the standardised products do not consistently point in one direction.",
    curved:
      "The relationship is clearly curved. Pearson r may be small because the association is not linear, even though a pattern exists.",
    outlier:
      "One unusual point changes the correlation. This shows why scatterplots must be checked before interpreting r.",
  };

  return (
    <LessonPanel>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
        Interactive lab
      </p>
      <h2 className="mt-2 text-3xl font-black tracking-tight">
        Explore scatterplots and correlation
      </h2>

      <p className="mt-4 leading-8 text-neutral-600">
        Choose a relationship pattern. Watch how the scatterplot, covariance
        and Pearson correlation change. The goal is to see correlation as a
        summary of a pattern, not as a replacement for the graph.
      </p>

      <div className="mt-6 rounded-[1.5rem] border border-[#ded9cf] bg-[#fbfaf6] p-5">
        <div className="flex flex-wrap gap-2">
          <ChoiceButton active={pattern === "positive"} onClick={() => setPattern("positive")}>
            Positive
          </ChoiceButton>
          <ChoiceButton active={pattern === "negative"} onClick={() => setPattern("negative")}>
            Negative
          </ChoiceButton>
          <ChoiceButton active={pattern === "weak"} onClick={() => setPattern("weak")}>
            Weak
          </ChoiceButton>
          <ChoiceButton active={pattern === "curved"} onClick={() => setPattern("curved")}>
            Curved
          </ChoiceButton>
          <ChoiceButton active={pattern === "outlier"} onClick={() => setPattern("outlier")}>
            Outlier
          </ChoiceButton>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <StatCard label="Correlation r" value={stats.r.toFixed(3)} />
          <StatCard label="Covariance" value={stats.covariance.toFixed(3)} />
          <StatCard label="Mean of x" value={stats.meanX.toFixed(2)} />
          <StatCard label="Mean of y" value={stats.meanY.toFixed(2)} />
        </div>

        <div className="mt-6 rounded-2xl border border-[#ded9cf] bg-white p-5">
          <p className="text-sm font-black">Scatterplot</p>

          <ScatterPlot
            points={points}
            minX={0}
            maxX={10}
            minY={0}
            maxY={11}
            slope={stats.slope}
            intercept={stats.intercept}
          />
        </div>

        <div className="mt-6 rounded-2xl border border-[#ded9cf] bg-white p-5">
          <p className="text-sm font-black">Interpretation</p>
          <p className="mt-3 leading-8 text-neutral-600">
            {interpretation[pattern]}
          </p>
          <MathBlock>r = {stats.r.toFixed(3)}</MathBlock>
        </div>
      </div>

      <DefinitionBox title="What to notice" tone="amber">
        Pearson correlation summarises linear association. It can miss curved
        relationships and can be distorted by outliers. Always read the graph
        before trusting the number.
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
        Step-by-step interpretation
      </h2>

      <WorkedExample
        title="Example 1 — Interpreting a positive correlation"
        question="A dataset of students has correlation r = 0.78 between weekly study hours and exam score. Interpret this."
      >
        <p className="leading-8 text-neutral-600">
          The correlation is positive and fairly strong. Students who study
          more hours tend to have higher exam scores. However, this does not by
          itself prove that study hours cause higher marks. Other variables such
          as prior ability, teaching quality, motivation and sleep may also be
          involved.
        </p>
      </WorkedExample>

      <WorkedExample
        title="Example 2 — Interpreting a negative correlation"
        question="A health study reports r = −0.65 between weekly exercise time and resting heart rate. Interpret this."
      >
        <p className="leading-8 text-neutral-600">
          The association is negative. People with more weekly exercise time
          tend to have lower resting heart rate. The relationship is moderately
          to strongly linear in the negative direction. Causal claims require
          careful study design and control of confounding.
        </p>
      </WorkedExample>

      <WorkedExample
        title="Example 3 — Why r = 0 can be misleading"
        question="A scatterplot forms a U-shape, but Pearson correlation is close to zero. What does this mean?"
      >
        <p className="leading-8 text-neutral-600">
          Pearson correlation measures linear association. A U-shaped pattern is
          not linear. The correlation may be close to zero because the downward
          and upward parts cancel each other, even though there is a clear
          curved relationship. The correct conclusion is not “no relationship”,
          but “little linear relationship”.
        </p>
      </WorkedExample>

      <WorkedExample
        title="Example 4 — Correlation is not causation"
        question="Ice cream sales and drowning incidents are positively correlated. Does ice cream cause drowning?"
      >
        <p className="leading-8 text-neutral-600">
          No. A likely confounder is temperature or season. In hot weather, more
          people buy ice cream and more people swim, increasing the risk of
          drowning incidents. The association does not mean ice cream causes
          drowning.
        </p>
      </WorkedExample>

      <WorkedExample
        title="Example 5 — Computing r from z-score products"
        question="For three observations, suppose zx values are −1, 0, 1 and zy values are −1, 0, 1. Calculate r."
      >
        <ol className="list-decimal space-y-3 pl-6 leading-8 text-neutral-600">
          <li>Multiply paired z-scores: (−1)(−1) = 1, (0)(0) = 0, (1)(1) = 1.</li>
          <li>Sum the products: 1 + 0 + 1 = 2.</li>
          <li>Divide by n − 1 = 2.</li>
          <li>r = 2 / 2 = 1.</li>
          <li>The variables have perfect positive linear association in standardised units.</li>
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
            Excellent. Module 2 is complete. You should now be able to describe
            one variable and also describe the linear association between two
            numerical variables responsibly.
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

function ScatterPlot({
  points,
  minX,
  maxX,
  minY,
  maxY,
  slope,
  intercept,
}: {
  points: Point[];
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  slope: number;
  intercept: number;
}) {
  const lineStart = {
    x: minX,
    y: intercept + slope * minX,
  };

  const lineEnd = {
    x: maxX,
    y: intercept + slope * maxX,
  };

  function xToPercent(x: number) {
    return ((x - minX) / (maxX - minX)) * 100;
  }

  function yToPercent(y: number) {
    return 100 - ((y - minY) / (maxY - minY)) * 100;
  }

  return (
    <div className="relative mt-5 h-[360px] rounded-2xl border border-[#ded9cf] bg-[#fbfaf6] p-4">
      <div className="absolute bottom-10 left-10 right-5 top-5 border-b border-l border-neutral-300">
        <svg className="absolute inset-0 h-full w-full overflow-visible">
          <line
            x1={`${xToPercent(lineStart.x)}%`}
            y1={`${yToPercent(lineStart.y)}%`}
            x2={`${xToPercent(lineEnd.x)}%`}
            y2={`${yToPercent(lineEnd.y)}%`}
            stroke="currentColor"
            strokeWidth="2"
            className="text-emerald-600"
            strokeDasharray="6 6"
          />
        </svg>

        {points.map((point, index) => (
          <div
            key={`${point.x}-${point.y}-${index}`}
            className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 shadow-sm"
            style={{
              left: `${xToPercent(point.x)}%`,
              top: `${yToPercent(point.y)}%`,
            }}
            title={`(${point.x}, ${point.y})`}
          />
        ))}
      </div>

      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-black uppercase tracking-[0.14em] text-neutral-500">
        x variable
      </p>
      <p className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-black uppercase tracking-[0.14em] text-neutral-500">
        y variable
      </p>
    </div>
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

function TableRow3({ a, b, c }: { a: string; b: string; c: string }) {
  return (
    <tr className="border-t border-[#ded9cf]">
      <td className="p-4 font-bold">{a}</td>
      <td className="p-4 text-neutral-600">{b}</td>
      <td className="p-4 text-neutral-600">{c}</td>
    </tr>
  );
}

function TableRow4({
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