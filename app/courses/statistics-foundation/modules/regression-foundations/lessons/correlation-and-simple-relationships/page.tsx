"use client";

import LockedLessonGate from "@/components/course/LockedLessonGate";
import { isStatisticsFoundationLessonOpen } from "@/lib/statisticsFoundationAccess";


import { useMemo, useState } from "react";

const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (
    href.startsWith("#") ||
    href.startsWith("http") ||
    href.startsWith("mailto:")
  ) {
    return href;
  }

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}/`;
}

const tabs = [
  "Learning Route",
  "Lecture",
  "Detailed Notes",
  "Correlation Lab",
  "Scatterplot Studio",
  "Causation Lab",
  "Worked Examples",
  "Practice Studio",
  "Reflection",
  "Quiz",
];

const learningRoute = [
  {
    time: "0–15 min",
    title: "Relationships between variables",
    body:
      "Understand what it means for two quantitative variables to move together.",
  },
  {
    time: "15–35 min",
    title: "Scatterplots",
    body:
      "Learn how scatterplots reveal direction, form, strength, clusters and unusual points.",
  },
  {
    time: "35–60 min",
    title: "Correlation",
    body:
      "Study correlation as a numerical measure of linear association.",
  },
  {
    time: "60–85 min",
    title: "Interpreting r",
    body:
      "Understand sign, magnitude, units, limitations and common mistakes.",
  },
  {
    time: "85–115 min",
    title: "Outliers and nonlinearity",
    body:
      "Explore how correlation can be distorted by unusual points and can miss curved relationships.",
  },
  {
    time: "115–145 min",
    title: "Association versus causation",
    body:
      "Separate statistical association from causal explanation, confounding and study design.",
  },
];

const lectureCards = [
  {
    title: "Association means variables move together",
    body:
      "Two variables are associated when knowing something about one gives information about the other.",
    example:
      "Students who spend more hours studying may tend to have higher exam scores.",
  },
  {
    title: "Scatterplots come before correlation",
    body:
      "A scatterplot shows the shape of a relationship. Correlation alone can hide important patterns.",
    example:
      "A curved relationship may have low correlation even when the variables are clearly related.",
  },
  {
    title: "Correlation measures linear association",
    body:
      "Pearson correlation measures the direction and strength of a straight-line relationship.",
    example:
      "r = 0.80 suggests a strong positive linear association.",
  },
  {
    title: "Correlation is unit-free",
    body:
      "Correlation is based on standardised values, so it has no measurement units.",
    example:
      "Changing height from centimetres to metres does not change the correlation with weight.",
  },
  {
    title: "Outliers can dominate correlation",
    body:
      "A single unusual point can make correlation much stronger, weaker or even reverse its sign.",
    example:
      "One extremely high-income observation can distort the relationship between income and spending.",
  },
  {
    title: "Association does not prove causation",
    body:
      "Correlation does not show that one variable causes the other. Confounding, reverse causation or coincidence may explain the relationship.",
    example:
      "Ice cream sales and drowning incidents may be correlated because both increase in hot weather.",
  },
];

const detailedNotes = [
  {
    title: "1. What is a statistical relationship?",
    formula: "X and Y are associated if information about X changes what we expect about Y",
    body:
      "A relationship between two variables means that the distribution or typical value of one variable changes across values of the other variable.",
    derivation:
      "If the expected value of Y is the same for all values of X, then X gives no information about the typical value of Y. If E(Y | X = x) changes as x changes, then X and Y are associated in a conditional-mean sense.",
    example:
      "If average exam score increases as study hours increase, study hours and exam score are associated.",
    warning:
      "Association is descriptive. It does not automatically explain why the variables move together.",
  },
  {
    title: "2. Scatterplots",
    formula: "Each point represents one observational unit: (xᵢ, yᵢ)",
    body:
      "A scatterplot places one variable on the horizontal axis and the other on the vertical axis. It is the first tool for studying relationships between two quantitative variables.",
    derivation:
      "For n observations, the paired data are (x₁, y₁), (x₂, y₂), ..., (xₙ, yₙ). A scatterplot displays these ordered pairs geometrically.",
    example:
      "Each point might represent one patient, with age on the x-axis and blood pressure on the y-axis.",
    warning:
      "Do not interpret correlation before checking the scatterplot. The numerical summary may hide curvature, clusters or outliers.",
  },
  {
    title: "3. Direction of association",
    formula: "positive, negative or no clear direction",
    body:
      "Direction describes whether Y tends to increase or decrease as X increases.",
    derivation:
      "If large X values tend to occur with large Y values and small X values with small Y values, the association is positive. If large X values tend to occur with small Y values, the association is negative.",
    example:
      "Height and weight often show positive association. Exercise time and resting heart rate may show negative association.",
    warning:
      "Direction is not causation. A positive relationship does not prove that increasing X causes Y to increase.",
  },
  {
    title: "4. Strength of association",
    formula: "stronger association → points closer to a clear pattern",
    body:
      "Strength describes how tightly the points follow a pattern. A strong linear association has points close to an imaginary straight line.",
    derivation:
      "When deviations around a simple line are small relative to the overall variation in Y, the linear association appears strong. When the deviations are large, the association is weaker.",
    example:
      "A scatterplot where points almost lie on a straight line has stronger linear association than a widely scattered cloud.",
    warning:
      "A strong-looking relationship may be driven by groups or outliers rather than a genuine overall pattern.",
  },
  {
    title: "5. Pearson correlation",
    formula: "r = Σ[(xᵢ − x̄)/sₓ][(yᵢ − ȳ)/sᵧ] / (n − 1)",
    body:
      "Pearson correlation r measures the strength and direction of linear association between two quantitative variables.",
    derivation:
      "First standardise each x value and each y value into z-scores. For each observation, multiply the standardised x and standardised y values. Average these products using division by n − 1. If high x values tend to pair with high y values, the products are positive and r is positive.",
    example:
      "If students who are above average in study hours are usually above average in score, r will be positive.",
    warning:
      "Correlation measures linear association. It can be misleading for nonlinear relationships.",
  },
  {
    title: "6. Range of correlation",
    formula: "−1 ≤ r ≤ 1",
    body:
      "Correlation always lies between −1 and 1. The sign gives direction and the magnitude gives linear strength.",
    derivation:
      "Because r is an average product of standardised values, it is mathematically bounded by −1 and 1. Values near ±1 occur when points lie close to a straight line.",
    example:
      "r = −0.90 indicates a strong negative linear association. r = 0.10 indicates weak linear association.",
    warning:
      "r = 0 does not mean no relationship. It means no linear relationship.",
  },
  {
    title: "7. Correlation is unit-free",
    formula: "r uses standardised values",
    body:
      "Correlation has no units because it is calculated after both variables are standardised.",
    derivation:
      "Subtracting the mean and dividing by the standard deviation removes the original measurement units. Therefore correlation is unaffected by changing units from centimetres to metres or pounds to kilograms.",
    example:
      "The correlation between height and weight is unchanged if height is measured in metres instead of centimetres.",
    warning:
      "Unit-free does not mean context-free. Interpretation still depends on the variables and study design.",
  },
  {
    title: "8. Outliers and influential points",
    formula: "one unusual point can change r",
    body:
      "Correlation can be highly sensitive to outliers, especially points far from the centre of the x-values.",
    derivation:
      "The correlation formula uses standardised deviations from the mean. A point with very large deviation in x and y can contribute a large product and strongly affect r.",
    example:
      "A single very high income household can strongly affect the correlation between income and spending.",
    warning:
      "Always inspect outliers. Do not automatically delete them; understand whether they are errors, rare valid cases or important subgroups.",
  },
  {
    title: "9. Nonlinear relationships",
    formula: "r measures straight-line association",
    body:
      "Correlation can be small even when variables are strongly related in a curved way.",
    derivation:
      "Pearson correlation measures whether Y tends to increase or decrease linearly with X. If Y rises and then falls as X increases, positive and negative parts of the pattern can cancel.",
    example:
      "Anxiety and performance may follow an inverted U-shape: moderate anxiety improves performance, but high anxiety reduces it.",
    warning:
      "A low correlation does not prove no relationship. Check the scatterplot.",
  },
  {
    title: "10. Correlation and causation",
    formula: "association ≠ causation",
    body:
      "Correlation alone does not establish a causal relationship. A relationship may arise from confounding, reverse causation, selection effects or shared context.",
    derivation:
      "A correlation between X and Y only shows that X and Y vary together. To claim causation, we need a credible design or argument showing that changing X would change Y, while ruling out alternative explanations.",
    example:
      "Coffee drinking may correlate with stress, but stress may cause coffee drinking, coffee may affect stress, or a third variable such as workload may affect both.",
    warning:
      "Causal claims require design, subject knowledge and assumptions, not correlation alone.",
  },
];

const workedExamples = [
  {
    title: "Interpreting a positive correlation",
    question:
      "A study finds r = 0.72 between weekly study hours and exam score. Interpret this.",
    working:
      "The correlation is positive and fairly strong. Students with higher study hours tend to have higher exam scores in a roughly linear pattern.",
    answer:
      "There is a strong positive linear association between study hours and exam score.",
    deeper:
      "This does not prove that studying more caused higher scores. Prior ability, course difficulty, attendance and motivation may confound the relationship.",
  },
  {
    title: "Interpreting a negative correlation",
    question:
      "A study finds r = −0.64 between exercise time and resting heart rate.",
    working:
      "The negative sign means higher exercise time tends to be associated with lower resting heart rate. The magnitude suggests moderate to strong linear association.",
    answer:
      "There is a moderately strong negative linear association.",
    deeper:
      "This is biologically plausible, but causal interpretation still depends on study design.",
  },
  {
    title: "Correlation near zero",
    question:
      "A scatterplot shows a clear U-shape, but the correlation is r = 0.02. What happened?",
    working:
      "Pearson correlation measures linear association. In a U-shape, the relationship changes direction. The positive and negative parts can cancel.",
    answer:
      "The correlation is near zero because the relationship is nonlinear, not because there is no relationship.",
    deeper:
      "This is why scatterplots should be examined before relying on correlation.",
  },
  {
    title: "Outlier effect",
    question:
      "A dataset has r = 0.85, but one point is far from all the others. What should be done?",
    working:
      "The scatterplot should be inspected with and without the unusual point. The point should be investigated for measurement error, data-entry error or meaningful rarity.",
    answer:
      "Do not automatically delete it. Assess whether the conclusion depends on it.",
    deeper:
      "If the correlation disappears without one observation, the relationship may be fragile.",
  },
];

const practiceQuestions = [
  {
    prompt:
      "Explain the difference between direction and strength in a scatterplot.",
    answer:
      "Direction describes whether Y tends to increase or decrease as X increases. Strength describes how tightly points follow a pattern.",
  },
  {
    prompt:
      "What does r = −0.90 mean?",
    answer:
      "It indicates a strong negative linear association between the two variables.",
  },
  {
    prompt:
      "Why can r = 0 be misleading?",
    answer:
      "Because r = 0 only means no linear association. A curved relationship may still exist.",
  },
  {
    prompt:
      "Why is correlation unit-free?",
    answer:
      "Because it is calculated using standardised values, after subtracting means and dividing by standard deviations.",
  },
  {
    prompt:
      "Give one reason why correlation does not prove causation.",
    answer:
      "A third variable may confound the relationship, or the direction of causation may be reversed.",
  },
];

const quizQuestions = [
  {
    question: "What does Pearson correlation measure?",
    options: [
      "Linear association between two quantitative variables.",
      "Causation between two variables.",
      "The difference between two means.",
      "The sample size only.",
    ],
    answer: 0,
    feedback:
      "Pearson correlation measures direction and strength of linear association.",
  },
  {
    question: "What is the possible range of r?",
    options: ["0 to 1", "-1 to 1", "-∞ to ∞", "0 to 100"],
    answer: 1,
    feedback:
      "Correlation always lies between −1 and 1.",
  },
  {
    question: "If r = 0.85, the association is:",
    options: [
      "Strong positive linear.",
      "Strong negative linear.",
      "Definitely causal.",
      "Definitely nonlinear.",
    ],
    answer: 0,
    feedback:
      "r = 0.85 indicates a strong positive linear association.",
  },
  {
    question: "What does r = 0 prove?",
    options: [
      "There is no possible relationship.",
      "There is no linear association.",
      "There is causation.",
      "The sample is biased.",
    ],
    answer: 1,
    feedback:
      "r = 0 means no linear association, but nonlinear relationships may still exist.",
  },
  {
    question: "Why should a scatterplot be checked before correlation?",
    options: [
      "To identify shape, outliers and clusters.",
      "To remove all data points.",
      "To prove causation.",
      "To avoid calculating means.",
    ],
    answer: 0,
    feedback:
      "Scatterplots reveal features correlation can hide.",
  },
  {
    question: "Which statement is correct?",
    options: [
      "Correlation proves causation.",
      "Correlation has the units of X.",
      "Correlation is unit-free.",
      "Correlation cannot be affected by outliers.",
    ],
    answer: 2,
    feedback:
      "Correlation is unit-free because it uses standardised values.",
  },
];

export default function CorrelationSimpleRelationshipsLesson() {
  const lessonCode = "5.1";

  if (!isStatisticsFoundationLessonOpen(lessonCode)) {
    return (
      <LockedLessonGate
        lessonCode={lessonCode}
        lessonTitle="Correlation and simple relationships"
        moduleTitle="Module 5: Regression Foundations"
      />
    );
  }

  const [activeTab, setActiveTab] = useState("Learning Route");
  const [relationship, setRelationship] = useState(65);
  const [noise, setNoise] = useState(25);
  const [outlier, setOutlier] = useState(0);
  const [shape, setShape] = useState<"linear" | "curved">("linear");

  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedPractice, setSelectedPractice] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const data = useMemo(
    () => makeScatterData(relationship, noise, outlier, shape),
    [relationship, noise, outlier, shape],
  );

  const r = correlation(data);
  const activeExample = workedExamples[selectedExample];
  const activePractice = practiceQuestions[selectedPractice];

  const score = quizQuestions.reduce((total, question, index) => {
    return selectedAnswers[index] === question.answer ? total + 1 : total;
  }, 0);

  return (
    <main className="min-h-screen bg-[#F7F3EA] px-5 py-8 text-[#141210] md:px-8 md:py-14">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses/statistics-foundation/modules/regression-foundations")}
          className="text-sm font-black text-[#741018] hover:text-[#4d080e]"
        >
          ← Back to module
        </a>

        <section className="mt-8 overflow-hidden rounded-[2.5rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 md:p-10">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Statistics Foundation · Lesson 5.1
              </p>

              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-7xl">
                Correlation and simple relationships.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">
                Regression begins with relationships between variables. This
                lesson develops scatterplots, direction, strength, Pearson
                correlation, nonlinear patterns, outliers and the crucial
                distinction between association and causation.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {["145 minutes", "No coding", "Scatterplots", "Association vs causation"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-[1.25rem] border border-[#E4DED2] bg-[#F7F3EA] p-4 text-sm font-black text-[#525252]"
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>

            <aside className="border-t border-[#E4DED2] bg-[#11100E] p-6 text-white md:p-10 lg:border-l lg:border-t-0">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Central idea
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Correlation describes linear association, not causal explanation.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Scatterplot before correlation",
                  "Direction: positive or negative",
                  "Strength: tightness of pattern",
                  "r measures linear association",
                  "Outliers can distort r",
                  "Association ≠ causation",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-4 text-sm font-black text-white/80"
                  >
                    {item}
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
          <TwoColumnIntro
            eyebrow="Lesson route"
            title="Move from visual association to careful interpretation."
            body="This lesson prepares students for regression by showing how relationships appear in data, how correlation summarises linear association and why causal claims require more than a numerical relationship."
            items={learningRoute}
            checklist={[
              "Describe positive, negative and weak associations.",
              "Read scatterplots for form, direction, strength and outliers.",
              "Define Pearson correlation.",
              "Interpret the sign and magnitude of r.",
              "Explain why r is unit-free.",
              "Recognise nonlinear relationships.",
              "Explain how outliers can affect correlation.",
              "Separate association from causation.",
            ]}
          />
        )}

        {activeTab === "Lecture" && (
          <LectureSection
            title="Correlation is a summary of a pattern, not the full story."
            body="A scatterplot shows the relationship. Correlation compresses one part of that relationship into a number. Good statistical thinking uses both: visual inspection first, numerical summary second, causal caution always."
            cards={lectureCards}
          />
        )}

        {activeTab === "Detailed Notes" && (
          <DetailedNotesSection notes={detailedNotes} />
        )}

        {activeTab === "Correlation Lab" && (
          <section className="mt-8 overflow-hidden rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="p-6 md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Interactive correlation lab
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Adjust association, noise, shape and outliers.
                </h2>
                <p className="mt-4 text-base leading-8 text-[#525252]">
                  Watch how the scatterplot and Pearson correlation respond.
                  Notice that a curved relationship can be visually strong but
                  have a modest linear correlation.
                </p>

                <div className="mt-6 grid gap-5">
                  <Slider label="Linear relationship strength" value={relationship} min={-95} max={95} suffix="%" onChange={setRelationship} />
                  <Slider label="Noise level" value={noise} min={0} max={80} suffix="%" onChange={setNoise} />
                  <Slider label="Outlier influence" value={outlier} min={0} max={100} suffix="%" onChange={setOutlier} />
                  <ShapeSelector value={shape} onChange={setShape} />
                </div>
              </div>

              <div className="border-t border-[#E4DED2] bg-[#11100E] p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                  Scatterplot output
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  r = {r.toFixed(3)}
                </h2>

                <div className="mt-8 rounded-[2rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5">
                  <ScatterPlot data={data} />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <DarkMetric label="Direction" value={r > 0.1 ? "Positive" : r < -0.1 ? "Negative" : "Weak/none"} />
                  <DarkMetric label="Linear strength" value={Math.abs(r) > 0.7 ? "Strong" : Math.abs(r) > 0.35 ? "Moderate" : "Weak"} />
                  <DarkMetric label="Shape" value={shape === "linear" ? "Linear" : "Curved"} />
                  <DarkMetric label="Outlier setting" value={`${outlier}%`} />
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "Scatterplot Studio" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Scatterplot studio
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                Read the plot before reading r.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#525252]">
                A scatterplot should be read for direction, form, strength,
                unusual points and separate clusters. Correlation summarises only
                one part of the story: straight-line association.
              </p>

              <div className="mt-6 rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
                <ScatterChecklistVisual />
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Scatterplot checklist
              </p>
              <div className="mt-6 grid gap-4">
                {[
                  ["Direction", "Does Y tend to rise or fall as X increases?"],
                  ["Form", "Is the pattern straight, curved, clustered or irregular?"],
                  ["Strength", "Are points tightly arranged or widely scattered?"],
                  ["Outliers", "Are some points far from the main pattern?"],
                  ["Context", "What are the variables, units and study design?"],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-[1.5rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5">
                    <h3 className="text-xl font-black tracking-[-0.035em]">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/70">{body}</p>
                  </div>
                ))}
              </div>
            </section>
          </section>
        )}

        {activeTab === "Causation Lab" && (
          <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
              Association versus causation
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              A correlation may have several explanations.
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "X may cause Y",
                  body: "Increasing exercise may reduce resting heart rate.",
                },
                {
                  title: "Y may cause X",
                  body: "Poor health may reduce exercise time.",
                },
                {
                  title: "Z may cause both",
                  body: "Age, lifestyle or income may influence both variables.",
                },
                {
                  title: "Selection may distort",
                  body: "The observed sample may not represent the population.",
                },
              ].map((item) => (
                <article key={item.title} className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
                  <h3 className="text-xl font-black tracking-[-0.035em]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#525252]">{item.body}</p>
                </article>
              ))}
            </div>

            <div className="mt-6 rounded-[2rem] bg-[#11100E] p-6 text-white">
              <h3 className="text-2xl font-black tracking-[-0.04em]">
                Causal caution
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/75">
                A scatterplot can suggest a relationship. Correlation can
                summarise a linear pattern. But causal explanation needs design,
                timing, adjustment, theory and assumptions.
              </p>
            </div>
          </section>
        )}

        {activeTab === "Worked Examples" && (
          <ExamplesSection
            examples={workedExamples}
            selected={selectedExample}
            setSelected={setSelectedExample}
            active={activeExample}
          />
        )}

        {activeTab === "Practice Studio" && (
          <PracticeSection
            questions={practiceQuestions}
            selected={selectedPractice}
            setSelected={setSelectedPractice}
            active={activePractice}
          />
        )}

        {activeTab === "Reflection" && (
          <ReflectionSection
            title="Correlation is useful only when interpreted with the plot and the context."
            cards={[
              ["What does the scatterplot show?", "Look for direction, form, strength, clusters and outliers."],
              ["What does r summarise?", "It summarises straight-line association, not every possible relationship."],
              ["Could an outlier dominate?", "Check whether one observation changes the conclusion."],
              ["Can causation be claimed?", "Only with suitable design, theory and assumptions."],
            ]}
          />
        )}

        {activeTab === "Quiz" && (
          <QuizSection
            questions={quizQuestions}
            selectedAnswers={selectedAnswers}
            setSelectedAnswers={setSelectedAnswers}
            score={score}
          />
        )}
      </section>
    </main>
  );
}

function TwoColumnIntro({
  eyebrow,
  title,
  body,
  items,
  checklist,
}: {
  eyebrow: string;
  title: string;
  body: string;
  items: { time: string; title: string; body: string }[];
  checklist: string[];
}) {
  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">{eyebrow}</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">{title}</h2>
        <p className="mt-5 text-base leading-8 text-[#525252]">{body}</p>
        <div className="mt-6 grid gap-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">{item.time}</p>
              <h3 className="mt-2 text-xl font-black tracking-[-0.035em]">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#525252]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">Mastery checklist</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">Students should reason beyond the number.</h2>
        <div className="mt-8 grid gap-3">
          {checklist.map((item, index) => (
            <div key={item} className="flex gap-4 rounded-[1.25rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFFCF6] text-sm font-black text-[#141210]">{index + 1}</span>
              <p className="text-sm leading-7 text-white/75">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

function LectureSection({
  title,
  body,
  cards,
}: {
  title: string;
  body: string;
  cards: { title: string; body: string; example: string }[];
}) {
  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">Concept lecture</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">{title}</h2>
        <p className="mt-5 text-base leading-8 text-[#525252]">{body}</p>
        <div className="mt-6 grid gap-4">
          {cards.map((item, index) => (
            <article key={item.title} className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#11100E] text-sm font-black text-white">{index + 1}</span>
                <div>
                  <h3 className="text-xl font-black tracking-[-0.035em]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#525252]">{item.body}</p>
                  <p className="mt-3 rounded-2xl bg-[#FFFCF6] px-4 py-3 text-sm font-bold leading-7 text-[#525252]">Example: {item.example}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">Classroom dialogue</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">Mr. R introduces relationship thinking.</h2>
        <div className="mt-6 grid gap-4">
          <Dialogue speaker="Mr. R" text="Before regression, we must learn how to look at relationships between variables." />
          <Dialogue speaker="Amelia" text="So we start with correlation?" />
          <Dialogue speaker="Mr. R" text="Even before that, we start with the scatterplot. The plot shows what the number may hide." />
          <Dialogue speaker="Ben" text="If the correlation is high, does that mean one variable causes the other?" />
          <Dialogue speaker="Mr. R" text="No. Correlation describes association. Causation needs a stronger design and argument." />
          <Dialogue speaker="Chloe" text="Can correlation miss a real relationship?" />
          <Dialogue speaker="Mr. R" text="Yes. Pearson correlation can miss curved relationships because it measures linear association." />
          <Dialogue speaker="Daniel" text="So a careful analyst uses the plot, the number and the context together?" />
          <Dialogue speaker="Mr. R" text="Exactly. That is the foundation of regression thinking." />
        </div>
      </section>
    </section>
  );
}

function DetailedNotesSection({
  notes,
}: {
  notes: { title: string; formula: string; body: string; derivation: string; example: string; warning: string }[];
}) {
  return (
    <section className="mt-8 grid gap-6">
      <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">Detailed theoretical notes</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">Association must be described visually, numerically and contextually.</h2>
      </section>

      <div className="grid gap-5">
        {notes.map((item) => (
          <article key={item.title} className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">{item.formula}</p>
            <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#525252]">{item.body}</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <InfoBlock title="Derivation" body={item.derivation} />
              <InfoBlock title="Example" body={item.example} warning />
              <InfoBlock title="Warning" body={item.warning} dark />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ExamplesSection({
  examples,
  selected,
  setSelected,
  active,
}: {
  examples: { title: string; question: string; working: string; answer: string; deeper: string }[];
  selected: number;
  setSelected: (value: number) => void;
  active: { title: string; question: string; working: string; answer: string; deeper: string };
}) {
  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">Worked examples</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">Work through interpretation carefully.</h2>
        <div className="mt-6 grid gap-3">
          {examples.map((example, index) => (
            <button
              key={example.title}
              type="button"
              onClick={() => setSelected(index)}
              className={`rounded-[1.25rem] border p-4 text-left transition ${
                selected === index
                  ? "border-stone-950 bg-[#11100E] text-white"
                  : "border-[#E4DED2] bg-[#F7F3EA] text-neutral-800 hover:bg-[#FFFCF6]"
              }`}
            >
              <p className="text-sm font-black">{example.title}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">{active.title}</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">{active.question}</h2>
        <div className="mt-6 grid gap-4">
          <InfoBlock title="Working" body={active.working} />
          <InfoBlock title="Answer" body={active.answer} dark />
          <InfoBlock title="Deeper reasoning" body={active.deeper} warning />
        </div>
      </section>
    </section>
  );
}

function PracticeSection({
  questions,
  selected,
  setSelected,
  active,
}: {
  questions: { prompt: string; answer: string }[];
  selected: number;
  setSelected: (value: number) => void;
  active: { prompt: string; answer: string };
}) {
  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">Practice studio</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">Practise visual and numerical interpretation.</h2>
        <div className="mt-6 grid gap-3">
          {questions.map((item, index) => (
            <button
              key={item.prompt}
              type="button"
              onClick={() => setSelected(index)}
              className={`rounded-[1.25rem] border p-4 text-left transition ${
                selected === index
                  ? "border-stone-950 bg-[#11100E] text-white"
                  : "border-[#E4DED2] bg-[#F7F3EA] text-neutral-800 hover:bg-[#FFFCF6]"
              }`}
            >
              <p className="text-sm font-black">Question {index + 1}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">Question {selected + 1}</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">{active.prompt}</h2>
        <div className="mt-6 rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7a7063]">Suggested answer</p>
          <p className="mt-3 text-base leading-8 text-[#525252]">{active.answer}</p>
        </div>
      </section>
    </section>
  );
}

function ReflectionSection({
  title,
  cards,
}: {
  title: string;
  cards: [string, string][];
}) {
  return (
    <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">Reflection</p>
      <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">{title}</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {cards.map(([cardTitle, body]) => (
          <article key={cardTitle} className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
            <h3 className="text-xl font-black tracking-[-0.035em]">{cardTitle}</h3>
            <p className="mt-3 text-sm leading-7 text-[#525252]">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function QuizSection({
  questions,
  selectedAnswers,
  setSelectedAnswers,
  score,
}: {
  questions: { question: string; options: string[]; answer: number; feedback: string }[];
  selectedAnswers: Record<number, number>;
  setSelectedAnswers: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  score: number;
}) {
  return (
    <section className="mt-8 grid gap-6">
      <section className="rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">Lesson quiz</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
          Score: {score}/{questions.length}
        </h2>
      </section>

      <div className="grid gap-5">
        {questions.map((question, index) => {
          const selected = selectedAnswers[index];

          return (
            <article key={question.question} className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm">
              <h3 className="text-xl font-black tracking-[-0.035em]">
                {index + 1}. {question.question}
              </h3>

              <div className="mt-5 grid gap-3">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setSelectedAnswers((current) => ({
                        ...current,
                        [index]: optionIndex,
                      }))
                    }
                    className={`rounded-[1.25rem] border px-4 py-3 text-left text-sm font-bold transition ${
                      selected === optionIndex
                        ? optionIndex === question.answer
                          ? "border-green-700 bg-green-50 text-green-900"
                          : "border-[#741018] bg-[#fff4ef] text-[#741018]"
                        : "border-[#E4DED2] bg-[#F7F3EA] text-[#525252] hover:bg-[#FFFCF6]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {selected !== undefined && (
                <p className="mt-4 rounded-2xl bg-[#11100E] px-4 py-3 text-sm font-bold leading-7 text-white">
                  {question.feedback}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Dialogue({ speaker, text }: { speaker: string; text: string }) {
  return (
    <div className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[#741018]">{speaker}</p>
      <p className="mt-2 text-sm leading-7 text-[#525252]">{text}</p>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  suffix = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-black text-[#525252]">{label}</span>
        <span className="rounded-full bg-[#11100E] px-3 py-1 text-xs font-black text-white">
          {value}
          {suffix}
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

function ShapeSelector({
  value,
  onChange,
}: {
  value: "linear" | "curved";
  onChange: (value: "linear" | "curved") => void;
}) {
  return (
    <div>
      <p className="text-sm font-black text-[#525252]">Relationship shape</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {[
          ["linear", "Linear"],
          ["curved", "Curved"],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key as "linear" | "curved")}
            className={`rounded-full px-4 py-3 text-sm font-black transition ${
              value === key
                ? "bg-[#11100E] text-white"
                : "border border-[#E4DED2] bg-[#FFFCF6] text-[#525252] hover:bg-[#F7F3EA]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function InfoBlock({
  title,
  body,
  dark = false,
  warning = false,
}: {
  title: string;
  body: string;
  dark?: boolean;
  warning?: boolean;
}) {
  return (
    <div
      className={`rounded-[1.5rem] p-5 ${
        dark
          ? "bg-[#11100E] text-white"
          : warning
            ? "border border-[#741018]/20 bg-[#fff4ef] text-[#741018]"
            : "border border-[#E4DED2] bg-[#F7F3EA] text-[#525252]"
      }`}
    >
      <p
        className={`text-xs font-black uppercase tracking-[0.18em] ${
          dark ? "text-white/45" : warning ? "text-[#741018]" : "text-[#7a7063]"
        }`}
      >
        {title}
      </p>
      <p className={`mt-3 text-sm font-bold leading-7 ${dark ? "text-white/75" : ""}`}>
        {body}
      </p>
    </div>
  );
}

function DarkMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-white/45">{label}</p>
      <p className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">{value}</p>
    </div>
  );
}

function ScatterPlot({ data }: { data: { x: number; y: number }[] }) {
  const minX = Math.min(...data.map((d) => d.x));
  const maxX = Math.max(...data.map((d) => d.x));
  const minY = Math.min(...data.map((d) => d.y));
  const maxY = Math.max(...data.map((d) => d.y));

  const sx = (x: number) => 40 + ((x - minX) / (maxX - minX || 1)) * 430;
  const sy = (y: number) => 220 - ((y - minY) / (maxY - minY || 1)) * 170;

  return (
    <svg viewBox="0 0 520 260" className="h-auto w-full">
      <rect x="25" y="25" width="470" height="210" rx="22" fill="#ffffff" opacity="0.08" />
      <line x1="40" x2="470" y1="220" y2="220" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="3" />
      <line x1="40" x2="40" y1="50" y2="220" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="3" />
      {data.map((d, index) => (
        <circle
          key={index}
          cx={sx(d.x)}
          cy={sy(d.y)}
          r={index === data.length - 1 ? 6 : 4}
          fill={index === data.length - 1 ? "#741018" : "#ffffff"}
          opacity="0.9"
        />
      ))}
      <text x="45" y="245" fontSize="14" fontWeight="900" fill="#ffffff">X variable</text>
      <text x="385" y="245" fontSize="14" fontWeight="900" fill="#ffffff">Y variable</text>
    </svg>
  );
}

function ScatterChecklistVisual() {
  return (
    <svg viewBox="0 0 760 420" className="h-auto w-full">
      <rect x="45" y="50" width="670" height="300" rx="34" fill="#ffffff" stroke="#d4d4d4" strokeWidth="2" />
      <line x1="105" x2="660" y1="300" y2="300" stroke="#141210" strokeWidth="4" />
      <line x1="105" x2="105" y1="95" y2="300" stroke="#141210" strokeWidth="4" />

      {Array.from({ length: 38 }).map((_, i) => {
        const x = 130 + i * 13;
        const y = 270 - i * 3.7 + 18 * Math.sin(i * 1.4);
        return <circle key={i} cx={x} cy={y} r="6" fill="#141210" opacity="0.7" />;
      })}

      <circle cx="610" cy="105" r="11" fill="#741018" />
      <text x="120" y="370" fontSize="18" fontWeight="900" fill="#525252">Direction</text>
      <text x="270" y="370" fontSize="18" fontWeight="900" fill="#525252">Form</text>
      <text x="400" y="370" fontSize="18" fontWeight="900" fill="#525252">Strength</text>
      <text x="545" y="370" fontSize="18" fontWeight="900" fill="#741018">Outliers</text>
    </svg>
  );
}

function makeScatterData(
  relationship: number,
  noise: number,
  outlier: number,
  shape: "linear" | "curved",
) {
  const slope = relationship / 45;
  const noiseScale = noise / 12;

  const data = Array.from({ length: 45 }).map((_, i) => {
    const x = -3 + (6 * i) / 44;
    const random = normalRandom(i + 11) * noiseScale;
    const y =
      shape === "linear"
        ? slope * x + random
        : 1.4 * Math.sin(x * 1.25) + random * 0.75;
    return { x, y };
  });

  if (outlier > 0) {
    data.push({
      x: 3.8,
      y: (outlier / 100) * 8 - 2,
    });
  }

  return data;
}

function correlation(data: { x: number; y: number }[]) {
  const mx = mean(data.map((d) => d.x));
  const my = mean(data.map((d) => d.y));
  const sx = sd(data.map((d) => d.x));
  const sy = sd(data.map((d) => d.y));

  if (sx === 0 || sy === 0) return 0;

  const total = data.reduce(
    (sum, d) => sum + ((d.x - mx) / sx) * ((d.y - my) / sy),
    0,
  );

  return total / (data.length - 1);
}

function mean(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function sd(values: number[]) {
  const m = mean(values);
  const variance =
    values.reduce((sum, value) => sum + (value - m) ** 2, 0) /
    (values.length - 1);
  return Math.sqrt(variance);
}

function deterministicRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function normalRandom(seed: number) {
  const u1 = Math.max(0.0001, deterministicRandom(seed));
  const u2 = Math.max(0.0001, deterministicRandom(seed + 1));
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}
