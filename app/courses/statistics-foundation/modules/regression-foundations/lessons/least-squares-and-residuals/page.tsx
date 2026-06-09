"use client";

import { useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

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
  "Least Squares Lab",
  "Residual Diagnostics",
  "Influence Lab",
  "Worked Examples",
  "Practice Studio",
  "Reflection",
  "Quiz",
];

const learningRoute = [
  {
    time: "0–20 min",
    title: "Why least squares is needed",
    body:
      "Understand why many possible lines can pass through a scatterplot and why a fitting rule is needed.",
  },
  {
    time: "20–45 min",
    title: "Residuals as vertical errors",
    body:
      "Define residuals as observed minus fitted values and interpret positive, negative and large residuals.",
  },
  {
    time: "45–75 min",
    title: "Sum of squared residuals",
    body:
      "Learn why residuals are squared and how the least-squares criterion chooses a line.",
  },
  {
    time: "75–105 min",
    title: "Deriving the fitted line",
    body:
      "Connect the least-squares criterion to the formulas for slope and intercept.",
  },
  {
    time: "105–130 min",
    title: "Diagnostics",
    body:
      "Use residual patterns to detect nonlinearity, changing spread and unusual observations.",
  },
  {
    time: "130–160 min",
    title: "Limitations",
    body:
      "Understand outliers, leverage, influence and why a low residual sum does not guarantee a good scientific model.",
  },
];

const lectureCards = [
  {
    title: "A regression line must be chosen by a rule",
    body:
      "A scatterplot can contain many possible lines. Least squares gives a clear mathematical rule for selecting one.",
    example:
      "Among all possible straight lines, choose the one with the smallest total squared vertical errors.",
  },
  {
    title: "Residuals are observed minus predicted",
    body:
      "The residual measures how far an observation lies above or below the fitted line.",
    example:
      "If y = 82 and ŷ = 76, then e = 6.",
  },
  {
    title: "Squaring prevents cancellation",
    body:
      "Positive and negative residuals would cancel if simply added. Squaring makes all errors positive.",
    example:
      "Residuals 5 and −5 sum to 0, but their squared residuals sum to 50.",
  },
  {
    title: "Large residuals are penalised more heavily",
    body:
      "Squaring makes large errors count disproportionately more than small errors.",
    example:
      "A residual of 10 contributes 100, while a residual of 2 contributes 4.",
  },
  {
    title: "Residual plots reveal model problems",
    body:
      "A good straight-line model should leave residuals with no systematic pattern.",
    example:
      "A U-shaped residual plot suggests the relationship may be curved.",
  },
  {
    title: "Influential observations can move the line",
    body:
      "Points with unusual x-values can have high leverage and strongly affect the fitted line.",
    example:
      "One extreme x-value can pull the regression line toward itself.",
  },
];

const detailedNotes = [
  {
    title: "1. The fitting problem",
    formula: "Many lines are possible; one rule is needed",
    body:
      "A scatterplot does not automatically determine a unique regression line. We need an objective criterion for deciding which line fits best.",
    derivation:
      "For a candidate line ŷᵢ = a + bxᵢ, every observation has an error eᵢ = yᵢ − ŷᵢ. A fitting rule must summarise all errors into one number so that different candidate lines can be compared.",
    example:
      "One line may fit low x-values well but high x-values poorly. Another may do the reverse. Least squares compares them using total squared error.",
    warning:
      "The visually best line and the least-squares line often agree, but the mathematical rule is more precise.",
  },
  {
    title: "2. Residuals",
    formula: "eᵢ = yᵢ − ŷᵢ",
    body:
      "A residual is the vertical difference between the observed value and the fitted value for the same x-value.",
    derivation:
      "For observation i, the fitted value is ŷᵢ = b₀ + b₁xᵢ. The residual is the part of yᵢ not explained by the fitted line: eᵢ = yᵢ − (b₀ + b₁xᵢ).",
    example:
      "If the model predicts 70 but the observed value is 78, the residual is 8.",
    warning:
      "Residuals are not the same as the true random errors εᵢ. Residuals are estimated from the fitted model.",
  },
  {
    title: "3. Sum of squared residuals",
    formula: "SSE = Σeᵢ² = Σ(yᵢ − ŷᵢ)²",
    body:
      "Least squares chooses the line that minimises the sum of squared residuals.",
    derivation:
      "For each candidate line, compute residuals eᵢ. Square them to avoid cancellation and penalise large errors. Add them to obtain SSE. The least-squares line has the smallest SSE among all straight lines.",
    example:
      "If residuals are 2, −1 and 3, then SSE = 4 + 1 + 9 = 14.",
    warning:
      "Because errors are squared, outliers can strongly influence the fitted line.",
  },
  {
    title: "4. Why not minimise raw residuals?",
    formula: "Σeᵢ may equal 0 even for poor fit",
    body:
      "Adding raw residuals is not a good measure of fit because positive and negative residuals cancel.",
    derivation:
      "A line with residuals 20 and −20 has raw residual sum 0, even though both predictions are poor. Squaring gives 400 + 400 = 800, revealing poor fit.",
    example:
      "Residuals 10, −10, 8, −8 sum to 0 but clearly show large errors.",
    warning:
      "Cancellation can hide poor predictions.",
  },
  {
    title: "5. Deriving the least-squares slope",
    formula: "b₁ = Σ(xᵢ − x̄)(yᵢ − ȳ) / Σ(xᵢ − x̄)²",
    body:
      "The least-squares slope equals the covariance-like variation between x and y divided by the variation in x.",
    derivation:
      "Minimising SSE = Σ[yᵢ − (b₀ + b₁xᵢ)]² with respect to b₀ and b₁ gives two normal equations. Solving them gives b₁ = Σ(xᵢ − x̄)(yᵢ − ȳ)/Σ(xᵢ − x̄)² and b₀ = ȳ − b₁x̄.",
    example:
      "If x and y rise together, the numerator is positive and the fitted slope is positive.",
    warning:
      "The slope depends on the scale of x and y, unlike correlation.",
  },
  {
    title: "6. Relationship between slope and correlation",
    formula: "b₁ = r(sᵧ / sₓ)",
    body:
      "In simple linear regression, the slope is connected to correlation but is not the same quantity.",
    derivation:
      "Correlation standardises both variables. Regression slope keeps the original units. The connection is b₁ = r × sᵧ/sₓ, showing that slope depends on association strength and the relative scales of y and x.",
    example:
      "If r = 0.8, sᵧ = 10 and sₓ = 5, then b₁ = 0.8 × 10/5 = 1.6.",
    warning:
      "Correlation is unit-free; slope has units of Y per unit X.",
  },
  {
    title: "7. The fitted line passes through the mean point",
    formula: "b₀ = ȳ − b₁x̄",
    body:
      "The least-squares regression line passes through the point (x̄, ȳ).",
    derivation:
      "From the least-squares normal equations, the fitted values have mean ȳ. Substituting x̄ into the fitted line gives b₀ + b₁x̄ = ȳ. Therefore b₀ = ȳ − b₁x̄.",
    example:
      "If x̄ = 4, ȳ = 20 and b₁ = 3, then b₀ = 20 − 12 = 8.",
    warning:
      "Passing through (x̄, ȳ) does not mean the line fits every point well.",
  },
  {
    title: "8. Residual sum property",
    formula: "Σeᵢ = 0",
    body:
      "In ordinary least squares with an intercept, the residuals sum to zero.",
    derivation:
      "The normal equation for the intercept implies Σ[yᵢ − (b₀ + b₁xᵢ)] = 0. Therefore Σeᵢ = 0.",
    example:
      "Positive residuals balance negative residuals in total.",
    warning:
      "Residuals summing to zero does not mean the model is good. It is a mathematical property of the fitted line.",
  },
  {
    title: "9. Residual patterns",
    formula: "residuals should show no systematic structure",
    body:
      "Residual plots are used to check whether the straight-line model has missed important structure.",
    derivation:
      "If the linear model captures the systematic trend, residuals should fluctuate around zero without a clear pattern. Curvature, funnel shapes or clusters suggest model limitations.",
    example:
      "A residual plot widening as x increases suggests non-constant variance.",
    warning:
      "A fitted line can look acceptable while residuals reveal model problems.",
  },
  {
    title: "10. Leverage and influence",
    formula: "unusual x-values can strongly affect the fitted line",
    body:
      "A point has high leverage when its x-value is far from the centre of the x-values. It is influential if removing it would substantially change the fitted line.",
    derivation:
      "The slope formula contains terms involving xᵢ − x̄. A point far from x̄ has large leverage in determining the slope. If its y-value is also unusual, it can pull the line strongly.",
    example:
      "One patient with an extremely high dose may dominate the estimated dose-response slope.",
    warning:
      "Influential points should be investigated, not automatically removed.",
  },
];

const workedExamples = [
  {
    title: "Calculating residuals",
    question:
      "A fitted line is ŷ = 10 + 2x. For x = 5, the observed y is 24. Find the residual.",
    working:
      "Predicted value: ŷ = 10 + 2(5) = 20. Residual: e = y − ŷ = 24 − 20 = 4.",
    answer: "The residual is 4.",
    deeper:
      "The observed value is 4 units above the fitted line.",
  },
  {
    title: "Computing SSE",
    question:
      "Three residuals are 3, −2 and 5. Compute the sum of squared residuals.",
    working:
      "SSE = 3² + (−2)² + 5² = 9 + 4 + 25 = 38.",
    answer: "SSE = 38.",
    deeper:
      "Squaring makes negative residuals positive and penalises the residual of 5 more heavily.",
  },
  {
    title: "Finding intercept from mean point",
    question:
      "A fitted slope is b₁ = 4. The data have x̄ = 6 and ȳ = 30. Find b₀.",
    working:
      "The fitted line passes through (x̄, ȳ). So b₀ = ȳ − b₁x̄ = 30 − 4(6) = 6.",
    answer: "The intercept is 6.",
    deeper:
      "The fitted line is ŷ = 6 + 4x.",
  },
  {
    title: "Interpreting a residual pattern",
    question:
      "A residual plot shows a clear U-shape. What does this suggest?",
    working:
      "A U-shape means residuals are systematically positive at low and high x-values and negative in the middle, or vice versa.",
    answer:
      "The straight-line model may be missing a curved relationship.",
    deeper:
      "A nonlinear model or transformed variable may be more suitable.",
  },
];

const practiceQuestions = [
  {
    prompt:
      "A fitted line is ŷ = 5 + 3x. If x = 4 and y = 20, calculate the residual.",
    answer:
      "ŷ = 5 + 3(4) = 17. Residual = 20 − 17 = 3.",
  },
  {
    prompt:
      "Why does least squares square the residuals?",
    answer:
      "Squaring prevents positive and negative residuals from cancelling and penalises large errors more heavily.",
  },
  {
    prompt:
      "What does a residual above zero mean?",
    answer:
      "The observed value is above the fitted value; the model underpredicted that observation.",
  },
  {
    prompt:
      "What does a funnel-shaped residual plot suggest?",
    answer:
      "It suggests non-constant variance; the spread of residuals changes across x.",
  },
  {
    prompt:
      "Why can high-leverage points be important?",
    answer:
      "Because points with extreme x-values can strongly affect the fitted slope and fitted line.",
  },
];

const quizQuestions = [
  {
    question: "What does least squares minimise?",
    options: [
      "Sum of residuals",
      "Sum of squared residuals",
      "Correlation",
      "Sample size",
    ],
    answer: 1,
    feedback: "Least squares minimises Σeᵢ².",
  },
  {
    question: "What is a residual?",
    options: [
      "Predicted minus observed",
      "Observed minus predicted",
      "The slope",
      "The intercept",
    ],
    answer: 1,
    feedback: "A residual is eᵢ = yᵢ − ŷᵢ.",
  },
  {
    question: "Why are residuals squared?",
    options: [
      "To remove x-values",
      "To prevent cancellation and penalise large errors",
      "To prove causation",
      "To increase sample size",
    ],
    answer: 1,
    feedback: "Squaring prevents cancellation and makes large residuals count more.",
  },
  {
    question: "The least-squares line with an intercept passes through:",
    options: ["(0, 0)", "(x̄, ȳ)", "(sₓ, sᵧ)", "(1, 1)"],
    answer: 1,
    feedback: "The fitted line passes through the point of sample means.",
  },
  {
    question: "A U-shaped residual plot suggests:",
    options: [
      "Perfect linear fit",
      "Possible nonlinearity",
      "No data",
      "A causal effect",
    ],
    answer: 1,
    feedback: "A U-shaped residual plot suggests the straight-line model is missing curvature.",
  },
  {
    question: "A high-leverage point is unusual mainly in:",
    options: ["x-value", "sample size", "p-value", "intercept only"],
    answer: 0,
    feedback: "Leverage comes from unusual x-values.",
  },
];

export default function LeastSquaresResidualsLesson() {
  const [activeTab, setActiveTab] = useState("Learning Route");
  const [manualSlope, setManualSlope] = useState(4);
  const [manualIntercept, setManualIntercept] = useState(25);
  const [outlier, setOutlier] = useState(0);
  const [curve, setCurve] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedPractice, setSelectedPractice] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const data = useMemo(() => makeData(outlier, curve), [outlier, curve]);
  const fitted = useMemo(() => fitLine(data), [data]);

  const manualResiduals = data.map((point) => ({
    ...point,
    yhat: manualIntercept + manualSlope * point.x,
    residual: point.y - (manualIntercept + manualSlope * point.x),
  }));

  const fittedResiduals = data.map((point) => ({
    ...point,
    yhat: fitted.intercept + fitted.slope * point.x,
    residual: point.y - (fitted.intercept + fitted.slope * point.x),
  }));

  const manualSSE = manualResiduals.reduce((sum, point) => sum + point.residual ** 2, 0);
  const fittedSSE = fittedResiduals.reduce((sum, point) => sum + point.residual ** 2, 0);

  const activeExample = workedExamples[selectedExample];
  const activePractice = practiceQuestions[selectedPractice];
  const score = quizQuestions.reduce((total, q, i) => selectedAnswers[i] === q.answer ? total + 1 : total, 0);

  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-8 text-neutral-950 md:px-8 md:py-14">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses/statistics-foundation/modules/regression-foundations")}
          className="text-sm font-black text-[#8b1116] hover:text-[#5f0b0f]"
        >
          ← Back to module
        </a>

        <Hero
          eyebrow="Statistics Foundation · Lesson 5.3"
          title="Least squares and residuals."
          body="Least squares explains how a regression line is chosen. This lesson studies residuals, squared errors, the least-squares criterion, fitted-line properties, residual diagnostics, leverage and influential observations."
          sideTitle="The fitted line minimises total squared vertical error."
          facts={[
            "Residual: eᵢ = yᵢ − ŷᵢ",
            "SSE = Σeᵢ²",
            "Least squares minimises SSE",
            "Line passes through (x̄, ȳ)",
            "Residuals sum to zero",
            "Outliers can influence the line",
          ]}
        />

        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "Learning Route" && (
          <LearningRoute
            items={learningRoute}
            checklist={[
              "Define residuals correctly.",
              "Calculate fitted values and residuals.",
              "Explain the least-squares criterion.",
              "Compute a simple SSE.",
              "Understand why residuals are squared.",
              "Connect slope formula to least squares.",
              "Interpret residual plots.",
              "Recognise leverage and influence.",
            ]}
          />
        )}

        {activeTab === "Lecture" && (
          <Lecture cards={lectureCards} />
        )}

        {activeTab === "Detailed Notes" && (
          <Notes notes={detailedNotes} />
        )}

        {activeTab === "Least Squares Lab" && (
          <section className="mt-8 overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="p-6 md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Interactive least squares lab
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Move your own line and compare it with least squares.
                </h2>
                <p className="mt-4 text-base leading-8 text-neutral-700">
                  Adjust the manual line. The least-squares line is the one with
                  the smallest total squared residuals among all straight lines.
                </p>

                <div className="mt-6 grid gap-5">
                  <Slider label="Manual intercept" value={manualIntercept} min={0} max={80} onChange={setManualIntercept} />
                  <Slider label="Manual slope" value={manualSlope} min={-8} max={12} onChange={setManualSlope} />
                  <Slider label="Outlier influence" value={outlier} min={0} max={100} suffix="%" onChange={setOutlier} />
                  <Slider label="Curvature" value={curve} min={0} max={100} suffix="%" onChange={setCurve} />
                </div>
              </div>

              <div className="border-t border-neutral-200 bg-neutral-950 p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                  Error comparison
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Manual SSE = {manualSSE.toFixed(0)}
                </h2>

                <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.07] p-5">
                  <LineComparePlot
                    data={data}
                    manual={{ intercept: manualIntercept, slope: manualSlope }}
                    fitted={fitted}
                  />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <DarkMetric label="Manual SSE" value={manualSSE.toFixed(0)} />
                  <DarkMetric label="Least-squares SSE" value={fittedSSE.toFixed(0)} />
                  <DarkMetric label="Fitted slope" value={fitted.slope.toFixed(2)} />
                  <DarkMetric label="Fitted intercept" value={fitted.intercept.toFixed(2)} />
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "Residual Diagnostics" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Residual diagnostics
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                Residual plots show what the line missed.
              </h2>
              <p className="mt-4 text-sm leading-7 text-neutral-700">
                A good linear model should leave residuals scattered around zero
                without a strong pattern. Curvature or changing spread suggests
                the model may be inadequate.
              </p>

              <div className="mt-6 rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5">
                <ResidualPlot residuals={fittedResiduals} />
              </div>
            </section>

            <section className="rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Diagnostic guide
              </p>
              <div className="mt-6 grid gap-4">
                {[
                  ["Random cloud", "The straight-line mean structure may be reasonable."],
                  ["Curved pattern", "The relationship may be nonlinear."],
                  ["Funnel shape", "Residual variability may change across x."],
                  ["Extreme residual", "An observation is poorly predicted by the model."],
                ].map(([title, body]) => (
                  <InfoBlock key={title} title={title} body={body} dark />
                ))}
              </div>
            </section>
          </section>
        )}

        {activeTab === "Influence Lab" && (
          <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Influence lab
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Outliers are not all equal.
            </h2>
            <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-700">
              A point far away in y has a large residual. A point far away in x
              has leverage. A point that strongly changes the fitted line is
              influential.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Large residual",
                  body:
                    "The point is far above or below the fitted line.",
                },
                {
                  title: "High leverage",
                  body:
                    "The point has an x-value far from the centre of the x-values.",
                },
                {
                  title: "Influential point",
                  body:
                    "Removing the point would noticeably change the fitted line.",
                },
              ].map((item) => (
                <article key={item.title} className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5">
                  <h3 className="text-xl font-black tracking-[-0.035em]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-700">{item.body}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Worked Examples" && (
          <Examples examples={workedExamples} selected={selectedExample} setSelected={setSelectedExample} active={activeExample} />
        )}

        {activeTab === "Practice Studio" && (
          <Practice questions={practiceQuestions} selected={selectedPractice} setSelected={setSelectedPractice} active={activePractice} />
        )}

        {activeTab === "Reflection" && (
          <Reflection
            title="Least squares is a fitting rule, not a guarantee of scientific truth."
            cards={[
              ["What did the line minimise?", "It minimised total squared vertical residuals."],
              ["What do residuals show?", "They show prediction errors and remaining patterns."],
              ["What can distort the line?", "Outliers, high leverage and influential observations."],
              ["What should be reported?", "The fitted equation, residual behaviour, limitations and context."],
            ]}
          />
        )}

        {activeTab === "Quiz" && (
          <Quiz questions={quizQuestions} selectedAnswers={selectedAnswers} setSelectedAnswers={setSelectedAnswers} score={score} />
        )}
      </section>
    </main>
  );
}

function Hero({
  eyebrow,
  title,
  body,
  sideTitle,
  facts,
}: {
  eyebrow: string;
  title: string;
  body: string;
  sideTitle: string;
  facts: string[];
}) {
  return (
    <section className="mt-8 overflow-hidden rounded-[2.5rem] border border-neutral-200 bg-white shadow-sm">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-6 md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">{eyebrow}</p>
          <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-7xl">{title}</h1>
          <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">{body}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["160 minutes", "No coding", "Residuals", "Diagnostics"].map((item) => (
              <div key={item} className="rounded-[1.25rem] border border-neutral-200 bg-[#f7f4ee] p-4 text-sm font-black text-neutral-700">
                {item}
              </div>
            ))}
          </div>
        </div>

        <aside className="border-t border-neutral-200 bg-neutral-950 p-6 text-white md:p-10 lg:border-l lg:border-t-0">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">Central idea</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">{sideTitle}</h2>
          <div className="mt-8 grid gap-3">
            {facts.map((item) => (
              <div key={item} className="rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-4 text-sm font-black text-white/80">
                {item}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function Tabs({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
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
  );
}

function LearningRoute({
  items,
  checklist,
}: {
  items: { time: string; title: string; body: string }[];
  checklist: string[];
}) {
  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">Lesson route</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
          Move from fitting a line to judging the fit.
        </h2>
        <div className="mt-6 grid gap-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">{item.time}</p>
              <h3 className="mt-2 text-xl font-black tracking-[-0.035em]">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-neutral-700">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">Mastery checklist</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
          Students should understand what the fitted line minimises.
        </h2>
        <div className="mt-8 grid gap-3">
          {checklist.map((item, index) => (
            <div key={item} className="flex gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-neutral-950">{index + 1}</span>
              <p className="text-sm leading-7 text-white/75">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

function Lecture({ cards }: { cards: { title: string; body: string; example: string }[] }) {
  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">Concept lecture</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
          Least squares turns visual fitting into a mathematical optimisation problem.
        </h2>
        <div className="mt-6 grid gap-4">
          {cards.map((item, index) => (
            <article key={item.title} className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-sm font-black text-white">{index + 1}</span>
                <div>
                  <h3 className="text-xl font-black tracking-[-0.035em]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-neutral-700">{item.body}</p>
                  <p className="mt-3 rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-7 text-neutral-700">Example: {item.example}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">Classroom dialogue</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">Mr. R explains residual thinking.</h2>
        <div className="mt-6 grid gap-4">
          <Dialogue speaker="Mr. R" text="Regression chooses a line by minimising prediction errors." />
          <Dialogue speaker="Amelia" text="Are those errors the residuals?" />
          <Dialogue speaker="Mr. R" text="Yes. A residual is observed minus predicted." />
          <Dialogue speaker="Ben" text="Why square them?" />
          <Dialogue speaker="Mr. R" text="Squaring prevents cancellation and makes large errors count strongly." />
          <Dialogue speaker="Chloe" text="Does the smallest SSE always mean the model is correct?" />
          <Dialogue speaker="Mr. R" text="No. It means best among straight lines under that criterion. The scientific model still needs checking." />
          <Dialogue speaker="Daniel" text="So residual plots help us check what the line missed?" />
          <Dialogue speaker="Mr. R" text="Exactly. Residuals are the model's unfinished story." />
        </div>
      </section>
    </section>
  );
}

function Notes({
  notes,
}: {
  notes: { title: string; formula: string; body: string; derivation: string; example: string; warning: string }[];
}) {
  return (
    <section className="mt-8 grid gap-6">
      <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">Detailed theoretical notes</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
          Least squares is a precise rule for choosing the regression line.
        </h2>
      </section>

      <div className="grid gap-5">
        {notes.map((item) => (
          <article key={item.title} className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">{item.formula}</p>
            <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-neutral-700">{item.body}</p>
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

function Examples({
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
      <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">Worked examples</p>
        <div className="mt-6 grid gap-3">
          {examples.map((example, index) => (
            <button
              key={example.title}
              type="button"
              onClick={() => setSelected(index)}
              className={`rounded-[1.25rem] border p-4 text-left transition ${
                selected === index
                  ? "border-neutral-950 bg-neutral-950 text-white"
                  : "border-neutral-200 bg-[#f7f4ee] text-neutral-800 hover:bg-white"
              }`}
            >
              <p className="text-sm font-black">{example.title}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">{active.title}</p>
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

function Practice({
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
      <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">Practice studio</p>
        <div className="mt-6 grid gap-3">
          {questions.map((item, index) => (
            <button
              key={item.prompt}
              type="button"
              onClick={() => setSelected(index)}
              className={`rounded-[1.25rem] border p-4 text-left transition ${
                selected === index
                  ? "border-neutral-950 bg-neutral-950 text-white"
                  : "border-neutral-200 bg-[#f7f4ee] text-neutral-800 hover:bg-white"
              }`}
            >
              <p className="text-sm font-black">Question {index + 1}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">Question {selected + 1}</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">{active.prompt}</h2>
        <div className="mt-6 rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-neutral-500">Suggested answer</p>
          <p className="mt-3 text-base leading-8 text-neutral-700">{active.answer}</p>
        </div>
      </section>
    </section>
  );
}

function Reflection({ title, cards }: { title: string; cards: [string, string][] }) {
  return (
    <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">Reflection</p>
      <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">{title}</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {cards.map(([cardTitle, body]) => (
          <article key={cardTitle} className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5">
            <h3 className="text-xl font-black tracking-[-0.035em]">{cardTitle}</h3>
            <p className="mt-3 text-sm leading-7 text-neutral-700">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Quiz({
  questions,
  selectedAnswers,
  setSelectedAnswers,
  score,
}: {
  questions: { question: string; options: string[]; answer: number; feedback: string }[];
  selectedAnswers: Record<number, number>;
  setSelectedAnswers: Dispatch<SetStateAction<Record<number, number>>>;
  score: number;
}) {
  return (
    <section className="mt-8 grid gap-6">
      <section className="rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">Lesson quiz</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
          Score: {score}/{questions.length}
        </h2>
      </section>

      <div className="grid gap-5">
        {questions.map((question, index) => {
          const selected = selectedAnswers[index];

          return (
            <article key={question.question} className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-black tracking-[-0.035em]">{index + 1}. {question.question}</h3>
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
                          : "border-[#8b1116] bg-[#fff7f7] text-[#8b1116]"
                        : "border-neutral-200 bg-[#f7f4ee] text-neutral-700 hover:bg-white"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {selected !== undefined && (
                <p className="mt-4 rounded-2xl bg-neutral-950 px-4 py-3 text-sm font-bold leading-7 text-white">
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
    <div className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[#8b1116]">{speaker}</p>
      <p className="mt-2 text-sm leading-7 text-neutral-700">{text}</p>
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
        <span className="text-sm font-black text-neutral-700">{label}</span>
        <span className="rounded-full bg-neutral-950 px-3 py-1 text-xs font-black text-white">
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
        className="mt-3 w-full accent-[#8b1116]"
      />
    </label>
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
          ? "bg-neutral-950 text-white"
          : warning
            ? "border border-[#8b1116]/20 bg-[#fff7f7] text-[#8b1116]"
            : "border border-neutral-200 bg-[#f7f4ee] text-neutral-700"
      }`}
    >
      <p className={`text-xs font-black uppercase tracking-[0.18em] ${dark ? "text-white/45" : warning ? "text-[#8b1116]" : "text-neutral-500"}`}>
        {title}
      </p>
      <p className={`mt-3 text-sm font-bold leading-7 ${dark ? "text-white/75" : ""}`}>{body}</p>
    </div>
  );
}

function DarkMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-white/45">{label}</p>
      <p className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">{value}</p>
    </div>
  );
}

function LineComparePlot({
  data,
  manual,
  fitted,
}: {
  data: { x: number; y: number }[];
  manual: { intercept: number; slope: number };
  fitted: { intercept: number; slope: number };
}) {
  const scale = getScale(data);

  return (
    <svg viewBox="0 0 520 260" className="h-auto w-full">
      <PlotFrame />
      <Line line={manual} scale={scale} stroke="#ffffff" />
      <Line line={fitted} scale={scale} stroke="#8b1116" />
      {data.map((point, index) => (
        <circle key={index} cx={scale.x(point.x)} cy={scale.y(point.y)} r={index === data.length - 1 ? 6 : 4} fill={index === data.length - 1 ? "#8b1116" : "#ffffff"} opacity="0.9" />
      ))}
      <text x="45" y="245" fontSize="14" fontWeight="900" fill="#ffffff">white = manual line</text>
      <text x="300" y="245" fontSize="14" fontWeight="900" fill="#ffffff">red = least squares</text>
    </svg>
  );
}

function ResidualPlot({
  residuals,
}: {
  residuals: { x: number; residual: number }[];
}) {
  const maxAbs = Math.max(...residuals.map((d) => Math.abs(d.residual)), 1);
  const sx = (x: number) => 45 + (x / 12) * 430;
  const sy = (r: number) => 130 - (r / maxAbs) * 80;

  return (
    <svg viewBox="0 0 520 260" className="h-auto w-full">
      <rect x="25" y="25" width="470" height="210" rx="22" fill="#ffffff" />
      <line x1="45" x2="475" y1="130" y2="130" stroke="#111111" strokeWidth="4" />
      {residuals.map((point, index) => (
        <circle key={index} cx={sx(point.x)} cy={sy(point.residual)} r={index === residuals.length - 1 ? 6 : 4} fill={index === residuals.length - 1 ? "#111111" : "#8b1116"} opacity="0.85" />
      ))}
      <text x="45" y="235" fontSize="14" fontWeight="900" fill="#525252">x</text>
      <text x="365" y="235" fontSize="14" fontWeight="900" fill="#525252">residual e</text>
    </svg>
  );
}

function PlotFrame() {
  return (
    <>
      <rect x="25" y="25" width="470" height="210" rx="22" fill="#ffffff" opacity="0.08" />
      <line x1="40" x2="470" y1="220" y2="220" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="3" />
      <line x1="40" x2="40" y1="50" y2="220" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="3" />
    </>
  );
}

function Line({
  line,
  scale,
  stroke,
}: {
  line: { intercept: number; slope: number };
  scale: { x: (x: number) => number; y: (y: number) => number };
  stroke: string;
}) {
  const y1 = line.intercept;
  const y2 = line.intercept + line.slope * 12;

  return (
    <line
      x1={scale.x(0)}
      y1={scale.y(y1)}
      x2={scale.x(12)}
      y2={scale.y(y2)}
      stroke={stroke}
      strokeWidth="4"
    />
  );
}

function getScale(data: { x: number; y: number }[]) {
  const minY = Math.min(...data.map((d) => d.y)) - 15;
  const maxY = Math.max(...data.map((d) => d.y)) + 15;

  return {
    x: (x: number) => 40 + (x / 12) * 430,
    y: (y: number) => 220 - ((y - minY) / (maxY - minY || 1)) * 170,
  };
}

function makeData(outlier: number, curve: number) {
  const data = Array.from({ length: 36 }).map((_, index) => {
    const x = (12 * index) / 35;
    const curved = (curve / 100) * 2.2 * (x - 6) ** 2;
    const y = 25 + 4.5 * x + curved + normalRandom(index + 7) * 10;
    return { x, y };
  });

  if (outlier > 0) {
    data.push({
      x: 12,
      y: 25 + 4.5 * 12 + (outlier / 100) * 90,
    });
  }

  return data;
}

function fitLine(data: { x: number; y: number }[]) {
  const mx = mean(data.map((d) => d.x));
  const my = mean(data.map((d) => d.y));
  const numerator = data.reduce((sum, d) => sum + (d.x - mx) * (d.y - my), 0);
  const denominator = data.reduce((sum, d) => sum + (d.x - mx) ** 2, 0);
  const slope = denominator === 0 ? 0 : numerator / denominator;
  const intercept = my - slope * mx;

  return { intercept, slope };
}

function mean(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
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