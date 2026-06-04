"use client";

import LockedLessonGate from "@/components/course/LockedLessonGate";
import { isStatisticsFoundationLessonOpen } from "@/lib/statisticsFoundationAccess";


import { useMemo, useState } from "react";

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
  "Regression Lab",
  "Prediction Lab",
  "Residual Studio",
  "Worked Examples",
  "Practice Studio",
  "Reflection",
  "Quiz",
];

const learningRoute = [
  {
    time: "0–20 min",
    title: "From association to regression",
    body:
      "Understand why regression goes beyond correlation by modelling an outcome as a function of an explanatory variable.",
  },
  {
    time: "20–45 min",
    title: "The regression equation",
    body:
      "Learn the simple linear regression model: predicted outcome equals intercept plus slope times x.",
  },
  {
    time: "45–70 min",
    title: "Slope and intercept",
    body:
      "Interpret the slope as expected change in Y per one-unit increase in X and understand the role of the intercept.",
  },
  {
    time: "70–95 min",
    title: "Prediction",
    body:
      "Use a fitted line to predict average outcomes and distinguish prediction from explanation.",
  },
  {
    time: "95–120 min",
    title: "Residuals",
    body:
      "Study residuals as observed minus predicted values and use them to diagnose fit.",
  },
  {
    time: "120–150 min",
    title: "Limitations",
    body:
      "Recognise extrapolation, nonlinearity, outliers, confounding and causal overinterpretation.",
  },
];

const lectureCards = [
  {
    title: "Regression models a conditional mean",
    body:
      "Simple linear regression describes how the average value of Y changes as X changes.",
    example:
      "Average exam score may increase with study hours.",
  },
  {
    title: "The fitted line gives predicted values",
    body:
      "The regression line estimates the typical Y value for each X value.",
    example:
      "If the fitted line is ŷ = 40 + 5x, then at x = 6 the predicted score is 70.",
  },
  {
    title: "The slope is a change interpretation",
    body:
      "The slope says how much the predicted Y changes when X increases by one unit.",
    example:
      "A slope of 5 means each extra study hour is associated with 5 more predicted score points.",
  },
  {
    title: "The intercept is the predicted Y when X = 0",
    body:
      "The intercept may or may not be meaningful depending on whether X = 0 is realistic.",
    example:
      "Predicted birthweight at gestational age 0 weeks is not meaningful.",
  },
  {
    title: "Residuals measure prediction errors",
    body:
      "A residual is the observed value minus the fitted value.",
    example:
      "If observed score is 76 and predicted score is 70, the residual is 6.",
  },
  {
    title: "Regression is not automatically causal",
    body:
      "A regression slope can describe association without proving that changing X causes Y to change.",
    example:
      "Coffee consumption may predict stress, but workload may confound the association.",
  },
];

const detailedNotes = [
  {
    title: "1. Simple linear regression model",
    formula: "Y = β₀ + β₁X + ε",
    body:
      "Simple linear regression models an outcome Y using one explanatory variable X. The relationship is represented by a straight line plus random variation.",
    derivation:
      "The systematic part β₀ + β₁X describes the average or expected value of Y at a given X. The error term ε represents deviations of individual observations from that average relationship.",
    example:
      "Exam score may be modelled as β₀ + β₁ × study hours + error.",
    warning:
      "The model assumes the average relationship is approximately linear. It does not mean every observation lies on the line.",
  },
  {
    title: "2. Conditional mean interpretation",
    formula: "E(Y | X = x) = β₀ + β₁x",
    body:
      "Regression is often best understood as modelling the mean of Y conditional on X.",
    derivation:
      "If the error term has mean zero at each value of X, then E(ε | X = x) = 0. Taking conditional expectation gives E(Y | X = x) = E(β₀ + β₁x + ε | X = x) = β₀ + β₁x.",
    example:
      "Among students who study 5 hours, the model predicts the average score, not the exact score of every student.",
    warning:
      "A fitted value is a conditional average, not a guaranteed individual outcome.",
  },
  {
    title: "3. Fitted regression equation",
    formula: "ŷ = b₀ + b₁x",
    body:
      "The fitted regression equation uses sample data to estimate the unknown population line.",
    derivation:
      "The population coefficients β₀ and β₁ are unknown. We estimate them using sample coefficients b₀ and b₁. The fitted value ŷ is the model-predicted value of Y at x.",
    example:
      "If ŷ = 42 + 4.5x, then the predicted value at x = 10 is 87.",
    warning:
      "The fitted line is an estimate. Another sample would produce a slightly different line.",
  },
  {
    title: "4. Slope",
    formula: "b₁ = change in predicted Y for one-unit increase in X",
    body:
      "The slope is the main coefficient in simple regression. It describes how the predicted outcome changes as X increases by one unit.",
    derivation:
      "For two x-values separated by one unit, predicted values are b₀ + b₁x and b₀ + b₁(x + 1). The difference is b₁.",
    example:
      "If b₁ = 2.3, then a one-unit increase in X is associated with a 2.3-unit increase in predicted Y.",
    warning:
      "The slope is association unless causal assumptions are justified.",
  },
  {
    title: "5. Intercept",
    formula: "b₀ = predicted Y when X = 0",
    body:
      "The intercept is where the fitted line crosses the Y-axis. It is the predicted value of Y when X equals zero.",
    derivation:
      "Substitute x = 0 into the fitted line: ŷ = b₀ + b₁ × 0 = b₀.",
    example:
      "If ŷ = 30 + 6x, then the intercept 30 is the predicted Y at X = 0.",
    warning:
      "The intercept may not be meaningful if X = 0 is outside the observed or realistic range.",
  },
  {
    title: "6. Residuals",
    formula: "eᵢ = yᵢ − ŷᵢ",
    body:
      "A residual is the vertical difference between an observed value and its fitted value.",
    derivation:
      "For observation i, the model predicts ŷᵢ = b₀ + b₁xᵢ. The residual is observed minus predicted: eᵢ = yᵢ − ŷᵢ.",
    example:
      "If observed Y is 91 and predicted Y is 86, then residual = 5.",
    warning:
      "Large residuals may indicate unusual observations, poor fit, missing predictors or nonlinear structure.",
  },
  {
    title: "7. Fitted line and least squares",
    formula: "choose line to minimise Σeᵢ²",
    body:
      "Ordinary least squares chooses the line that minimises the sum of squared residuals.",
    derivation:
      "For each candidate line, compute residuals eᵢ = yᵢ − ŷᵢ. Square them to avoid cancellation and penalise large errors. The least-squares line is the line with the smallest total squared residual Σeᵢ².",
    example:
      "A line with smaller squared prediction errors fits the data better under the least-squares criterion.",
    warning:
      "Least squares can be strongly affected by outliers because residuals are squared.",
  },
  {
    title: "8. Prediction inside the data range",
    formula: "prediction should usually stay within observed X range",
    body:
      "Regression predictions are most reliable within the range of X values used to fit the model.",
    derivation:
      "The fitted line is estimated from observed data. When predicting far outside the observed X range, the assumed linear pattern may not continue. This is extrapolation.",
    example:
      "Using data from ages 20–60 to predict for age 95 may be unreliable.",
    warning:
      "Extrapolation can produce unreasonable predictions even when the fitted line looks good inside the data range.",
  },
  {
    title: "9. Model fit",
    formula: "good fit → residuals show no strong pattern",
    body:
      "A useful linear model should leave residuals that look like random scatter rather than a structured pattern.",
    derivation:
      "If the linear model captures the systematic relationship, residuals should not show remaining curvature or changing spread across X. Patterns in residuals suggest the model is missing structure.",
    example:
      "A U-shaped residual plot suggests the true relationship may be curved.",
    warning:
      "A high correlation or strong slope does not guarantee that the linear model is appropriate.",
  },
  {
    title: "10. Regression and causality",
    formula: "slope ≠ causal effect without assumptions",
    body:
      "A regression coefficient describes an association between X and Y. It becomes causal only under additional design and modelling assumptions.",
    derivation:
      "If X is related to other causes of Y, the slope may combine the effect of X with confounding. Randomised experiments reduce this problem; observational studies need careful adjustment and assumptions.",
    example:
      "A regression of health on exercise may be confounded by diet, income, age and baseline health.",
    warning:
      "Do not write 'X causes Y' from simple regression alone unless the study design supports that claim.",
  },
];

const workedExamples = [
  {
    title: "Using a fitted line",
    question:
      "A fitted regression line is ŷ = 40 + 5x. Predict Y when x = 6.",
    working:
      "Substitute x = 6: ŷ = 40 + 5(6) = 40 + 30 = 70.",
    answer: "The predicted value is 70.",
    deeper:
      "This is the predicted average value of Y at x = 6, not a guaranteed individual value.",
  },
  {
    title: "Interpreting slope",
    question:
      "A regression of exam score on study hours gives ŷ = 35 + 4.2x. Interpret the slope.",
    working:
      "The slope is 4.2. For each additional hour of study, the predicted exam score increases by 4.2 points.",
    answer:
      "Each one-hour increase in study time is associated with 4.2 higher predicted score points.",
    deeper:
      "This is an association unless study hours were experimentally assigned or causal assumptions are justified.",
  },
  {
    title: "Interpreting intercept",
    question:
      "A fitted line is ŷ = 12 + 0.8x. What does the intercept mean?",
    working:
      "The intercept is 12. It is the predicted value of Y when X = 0.",
    answer:
      "When X = 0, the model predicts Y = 12.",
    deeper:
      "This interpretation is meaningful only if X = 0 is realistic and within the relevant data range.",
  },
  {
    title: "Residual calculation",
    question:
      "A fitted line predicts ŷ = 82 for a student, but the observed score is y = 88. Find the residual.",
    working:
      "Residual = observed − predicted = 88 − 82 = 6.",
    answer: "The residual is 6.",
    deeper:
      "The student scored 6 points above the model prediction.",
  },
];

const practiceQuestions = [
  {
    prompt:
      "A fitted line is ŷ = 10 + 3x. Predict Y when x = 7.",
    answer:
      "ŷ = 10 + 3(7) = 31.",
  },
  {
    prompt:
      "In ŷ = 25 − 2x, interpret the slope.",
    answer:
      "For each one-unit increase in X, the predicted Y decreases by 2 units.",
  },
  {
    prompt:
      "If observed Y is 40 and predicted Y is 35, what is the residual?",
    answer:
      "Residual = 40 − 35 = 5.",
  },
  {
    prompt:
      "Why might an intercept be meaningless?",
    answer:
      "Because X = 0 may be outside the observed or realistic range of the data.",
  },
  {
    prompt:
      "Why is extrapolation risky?",
    answer:
      "Because the linear pattern estimated inside the data range may not continue outside that range.",
  },
];

const quizQuestions = [
  {
    question: "What is the simple linear regression model?",
    options: [
      "Y = β₀ + β₁X + ε",
      "Y = X only",
      "r = 1 always",
      "p = β₀",
    ],
    answer: 0,
    feedback:
      "Simple linear regression models Y as β₀ + β₁X plus an error term.",
  },
  {
    question: "What does the slope represent?",
    options: [
      "Predicted Y when X = 0.",
      "Change in predicted Y for a one-unit increase in X.",
      "The sample size.",
      "The correlation squared only.",
    ],
    answer: 1,
    feedback:
      "The slope gives the change in predicted Y per one-unit increase in X.",
  },
  {
    question: "What is a residual?",
    options: [
      "Observed minus predicted.",
      "Predicted minus sample size.",
      "The intercept only.",
      "The x-value.",
    ],
    answer: 0,
    feedback:
      "A residual is e = y − ŷ.",
  },
  {
    question: "What does the intercept represent?",
    options: [
      "Predicted Y when X = 0.",
      "Change in Y for one-unit increase in X.",
      "Residual variance.",
      "The strongest outlier.",
    ],
    answer: 0,
    feedback:
      "The intercept is the fitted value of Y when X equals zero.",
  },
  {
    question: "What does least squares minimise?",
    options: [
      "Sum of squared residuals.",
      "Sum of x-values.",
      "The sample size.",
      "The correlation denominator.",
    ],
    answer: 0,
    feedback:
      "Least squares chooses the line that minimises Σeᵢ².",
  },
  {
    question: "Why is extrapolation risky?",
    options: [
      "It predicts outside the observed X range.",
      "It always increases sample size.",
      "It proves causation.",
      "It removes residuals.",
    ],
    answer: 0,
    feedback:
      "Extrapolation uses the fitted line outside the data range, where the pattern may not hold.",
  },
];

export default function SimpleLinearRegressionLesson() {
  const lessonCode = "5.2";

  if (!isStatisticsFoundationLessonOpen(lessonCode)) {
    return (
      <LockedLessonGate
        lessonCode={lessonCode}
        lessonTitle="Simple linear regression"
        moduleTitle="Module 5: Regression Foundations"
      />
    );
  }

  const [activeTab, setActiveTab] = useState("Learning Route");

  const [intercept, setIntercept] = useState(35);
  const [slope, setSlope] = useState(5);
  const [noise, setNoise] = useState(18);
  const [predictionX, setPredictionX] = useState(6);

  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedPractice, setSelectedPractice] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const data = useMemo(
    () => makeRegressionData(intercept, slope, noise),
    [intercept, slope, noise],
  );

  const fitted = useMemo(() => fitLine(data), [data]);
  const predictedY = fitted.intercept + fitted.slope * predictionX;
  const residuals = data.map((d) => ({
    ...d,
    yhat: fitted.intercept + fitted.slope * d.x,
    residual: d.y - (fitted.intercept + fitted.slope * d.x),
  }));
  const sse = residuals.reduce((sum, d) => sum + d.residual ** 2, 0);

  const activeExample = workedExamples[selectedExample];
  const activePractice = practiceQuestions[selectedPractice];

  const score = quizQuestions.reduce((total, question, index) => {
    return selectedAnswers[index] === question.answer ? total + 1 : total;
  }, 0);

  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-8 text-neutral-950 md:px-8 md:py-14">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses/statistics-foundation/modules/regression-foundations")}
          className="text-sm font-black text-[#8b1116] hover:text-[#5f0b0f]"
        >
          ← Back to module
        </a>

        <section className="mt-8 overflow-hidden rounded-[2.5rem] border border-neutral-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 md:p-10">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Statistics Foundation · Lesson 5.2
              </p>

              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-7xl">
                Simple linear regression.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                Simple linear regression models how an outcome changes with one
                explanatory variable. This lesson develops the regression
                equation, slope, intercept, fitted values, prediction, residuals,
                least-squares logic and responsible interpretation.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {["150 minutes", "No coding", "Prediction", "Residuals"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-[1.25rem] border border-neutral-200 bg-[#f7f4ee] p-4 text-sm font-black text-neutral-700"
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>

            <aside className="border-t border-neutral-200 bg-neutral-950 p-6 text-white md:p-10 lg:border-l lg:border-t-0">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Central model
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                ŷ = b₀ + b₁x
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "b₀: intercept",
                  "b₁: slope",
                  "ŷ: fitted value",
                  "e = y − ŷ: residual",
                  "Least squares minimises Σe²",
                  "Prediction is not causation",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-4 text-sm font-black text-white/80"
                  >
                    {item}
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
          <TwoColumnIntro
            items={learningRoute}
            checklist={[
              "Write the simple linear regression model.",
              "Interpret slope and intercept correctly.",
              "Calculate fitted values.",
              "Calculate residuals.",
              "Explain least-squares logic.",
              "Use regression for prediction cautiously.",
              "Recognise extrapolation risk.",
              "Avoid causal overinterpretation.",
            ]}
          />
        )}

        {activeTab === "Lecture" && (
          <LectureSection cards={lectureCards} />
        )}

        {activeTab === "Detailed Notes" && (
          <DetailedNotesSection notes={detailedNotes} />
        )}

        {activeTab === "Regression Lab" && (
          <section className="mt-8 overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="p-6 md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Interactive regression lab
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Generate data and fit the line.
                </h2>
                <p className="mt-4 text-base leading-8 text-neutral-700">
                  Adjust the underlying intercept, slope and noise. The fitted
                  line changes because the observed sample changes around the
                  underlying relationship.
                </p>

                <div className="mt-6 grid gap-5">
                  <Slider label="Underlying intercept" value={intercept} min={10} max={80} onChange={setIntercept} />
                  <Slider label="Underlying slope" value={slope} min={-10} max={12} onChange={setSlope} />
                  <Slider label="Noise" value={noise} min={0} max={50} onChange={setNoise} />
                </div>
              </div>

              <div className="border-t border-neutral-200 bg-neutral-950 p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                  Fitted model
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  ŷ = {fitted.intercept.toFixed(2)} + {fitted.slope.toFixed(2)}x
                </h2>

                <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.07] p-5">
                  <RegressionPlot data={data} line={fitted} />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <DarkMetric label="Fitted intercept" value={fitted.intercept.toFixed(2)} />
                  <DarkMetric label="Fitted slope" value={fitted.slope.toFixed(2)} />
                  <DarkMetric label="SSE" value={sse.toFixed(1)} />
                  <DarkMetric label="Noise setting" value={noise.toString()} />
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "Prediction Lab" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Prediction lab
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                Use the fitted line to predict average Y.
              </h2>
              <p className="mt-4 text-sm leading-7 text-neutral-700">
                The predicted value is the fitted line value at the chosen X.
                It estimates the average Y at that X, not the exact individual
                outcome.
              </p>

              <div className="mt-6 grid gap-5">
                <Slider label="Prediction x value" value={predictionX} min={0} max={12} onChange={setPredictionX} />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Metric label="x" value={predictionX.toString()} />
                <Metric label="ŷ" value={predictedY.toFixed(2)} />
                <Metric label="Equation" value="b₀ + b₁x" />
              </div>
            </section>

            <section className="rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Prediction visual
              </p>
              <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.07] p-5">
                <PredictionPlot data={data} line={fitted} xValue={predictionX} />
              </div>
              <p className="mt-6 rounded-[1.5rem] bg-white p-5 text-sm font-bold leading-7 text-neutral-950">
                Prediction: ŷ = {fitted.intercept.toFixed(2)} +{" "}
                {fitted.slope.toFixed(2)}({predictionX}) ={" "}
                {predictedY.toFixed(2)}.
              </p>
            </section>
          </section>
        )}

        {activeTab === "Residual Studio" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Residual studio
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                Residuals show what the line missed.
              </h2>
              <p className="mt-4 text-sm leading-7 text-neutral-700">
                Residuals are observed minus predicted values. A useful linear
                model should leave residuals without obvious systematic pattern.
              </p>

              <div className="mt-6 rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5">
                <ResidualPlot residuals={residuals} />
              </div>
            </section>

            <section className="rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Residual interpretation
              </p>
              <div className="mt-6 grid gap-4">
                {[
                  ["Positive residual", "Observed value is above the fitted line."],
                  ["Negative residual", "Observed value is below the fitted line."],
                  ["Large residual", "Observation is poorly predicted by the line."],
                  ["Patterned residuals", "The model may be missing curvature or changing spread."],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5">
                    <h3 className="text-xl font-black tracking-[-0.035em]">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/70">{body}</p>
                  </div>
                ))}
              </div>
            </section>
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
            title="Regression is a model for average relationships, not automatic explanation."
            cards={[
              ["What is being predicted?", "Identify the outcome Y and explanatory variable X."],
              ["What does the slope mean?", "Interpret it as expected change in Y per one-unit increase in X."],
              ["Are residuals patterned?", "Residual patterns suggest the straight-line model may be inadequate."],
              ["Is causation justified?", "A slope is causal only with suitable design and assumptions."],
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
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">Move from association to a fitted predictive line.</h2>
        <p className="mt-5 text-base leading-8 text-neutral-700">
          Regression gives structure to relationships. It estimates a line,
          interprets its coefficients and studies what the line fails to explain.
        </p>
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
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">Students should interpret the line and its errors.</h2>
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

function LectureSection({
  cards,
}: {
  cards: { title: string; body: string; example: string }[];
}) {
  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">Concept lecture</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">Regression models the expected outcome at each value of X.</h2>
        <p className="mt-5 text-base leading-8 text-neutral-700">
          Correlation summarises association. Regression goes further by fitting
          an equation that predicts the average outcome and separates fitted
          values from residuals.
        </p>
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
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">Mr. R explains the regression line.</h2>
        <div className="mt-6 grid gap-4">
          <Dialogue speaker="Mr. R" text="Correlation gives one number. Regression gives an equation." />
          <Dialogue speaker="Amelia" text="So the line predicts Y from X?" />
          <Dialogue speaker="Mr. R" text="Yes, but more precisely, it predicts the average Y at a given X." />
          <Dialogue speaker="Ben" text="What does the slope tell us?" />
          <Dialogue speaker="Mr. R" text="It tells us the change in predicted Y for a one-unit increase in X." />
          <Dialogue speaker="Chloe" text="And the residual is what the model got wrong?" />
          <Dialogue speaker="Mr. R" text="Exactly. Residual equals observed minus predicted." />
          <Dialogue speaker="Daniel" text="Can the slope be causal?" />
          <Dialogue speaker="Mr. R" text="Only if the design and assumptions support causality. Simple regression alone is not enough." />
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
      <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">Detailed theoretical notes</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">Simple regression fits a line and studies what remains unexplained.</h2>
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
      <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">Worked examples</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">Work through coefficients, prediction and residuals.</h2>
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
      <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">Practice studio</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">Practise regression interpretation.</h2>
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

function ReflectionSection({
  title,
  cards,
}: {
  title: string;
  cards: [string, string][];
}) {
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

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-neutral-200 bg-white p-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-neutral-500">{label}</p>
      <p className="mt-2 text-2xl font-black tracking-[-0.04em]">{value}</p>
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
      <p
        className={`text-xs font-black uppercase tracking-[0.18em] ${
          dark ? "text-white/45" : warning ? "text-[#8b1116]" : "text-neutral-500"
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

function RegressionPlot({
  data,
  line,
}: {
  data: { x: number; y: number }[];
  line: { intercept: number; slope: number };
}) {
  const scale = getScale(data);
  const y1 = line.intercept + line.slope * 0;
  const y2 = line.intercept + line.slope * 12;

  return (
    <svg viewBox="0 0 520 260" className="h-auto w-full">
      <PlotFrame />
      <line
        x1={scale.x(0)}
        y1={scale.y(y1)}
        x2={scale.x(12)}
        y2={scale.y(y2)}
        stroke="#8b1116"
        strokeWidth="4"
      />
      {data.map((d, index) => (
        <circle key={index} cx={scale.x(d.x)} cy={scale.y(d.y)} r="4" fill="#ffffff" opacity="0.9" />
      ))}
    </svg>
  );
}

function PredictionPlot({
  data,
  line,
  xValue,
}: {
  data: { x: number; y: number }[];
  line: { intercept: number; slope: number };
  xValue: number;
}) {
  const scale = getScale(data);
  const y1 = line.intercept + line.slope * 0;
  const y2 = line.intercept + line.slope * 12;
  const yhat = line.intercept + line.slope * xValue;

  return (
    <svg viewBox="0 0 520 260" className="h-auto w-full">
      <PlotFrame />
      <line x1={scale.x(0)} y1={scale.y(y1)} x2={scale.x(12)} y2={scale.y(y2)} stroke="#ffffff" strokeWidth="4" />
      <line x1={scale.x(xValue)} y1="45" x2={scale.x(xValue)} y2={scale.y(yhat)} stroke="#8b1116" strokeWidth="4" strokeDasharray="7 7" />
      <circle cx={scale.x(xValue)} cy={scale.y(yhat)} r="9" fill="#8b1116" />
      {data.map((d, index) => (
        <circle key={index} cx={scale.x(d.x)} cy={scale.y(d.y)} r="3.5" fill="#ffffff" opacity="0.75" />
      ))}
      <text x="45" y="245" fontSize="14" fontWeight="900" fill="#ffffff">x = {xValue}</text>
      <text x="350" y="245" fontSize="14" fontWeight="900" fill="#ffffff">predicted point</text>
    </svg>
  );
}

function ResidualPlot({
  residuals,
}: {
  residuals: { x: number; residual: number }[];
}) {
  const minX = 0;
  const maxX = 12;
  const maxAbs = Math.max(...residuals.map((d) => Math.abs(d.residual)), 1);
  const sx = (x: number) => 45 + ((x - minX) / (maxX - minX)) * 430;
  const sy = (r: number) => 130 - (r / maxAbs) * 80;

  return (
    <svg viewBox="0 0 520 260" className="h-auto w-full">
      <rect x="25" y="25" width="470" height="210" rx="22" fill="#ffffff" />
      <line x1="45" x2="475" y1="130" y2="130" stroke="#111111" strokeWidth="4" />
      {residuals.map((d, index) => (
        <circle key={index} cx={sx(d.x)} cy={sy(d.residual)} r="4" fill="#8b1116" opacity="0.8" />
      ))}
      <text x="45" y="235" fontSize="14" fontWeight="900" fill="#525252">x</text>
      <text x="380" y="235" fontSize="14" fontWeight="900" fill="#525252">residuals</text>
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

function getScale(data: { x: number; y: number }[]) {
  const minY = Math.min(...data.map((d) => d.y)) - 10;
  const maxY = Math.max(...data.map((d) => d.y)) + 10;

  return {
    x: (x: number) => 40 + (x / 12) * 430,
    y: (y: number) => 220 - ((y - minY) / (maxY - minY || 1)) * 170,
  };
}

function makeRegressionData(intercept: number, slope: number, noise: number) {
  return Array.from({ length: 38 }).map((_, i) => {
    const x = (12 * i) / 37;
    const y = intercept + slope * x + normalRandom(i + 31) * noise;
    return { x, y };
  });
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
