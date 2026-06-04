"use client";

import LockedLessonGate from "@/components/course/LockedLessonGate";
import { isStatisticsFoundationLessonOpen } from "@/lib/statisticsFoundationAccess";


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
  "Probability Lab",
  "Odds Lab",
  "Logit Curve Lab",
  "Classification Lab",
  "Worked Examples",
  "Practice Studio",
  "Reflection",
  "Quiz",
];

const learningRoute = [
  {
    time: "0–20 min",
    title: "Why linear regression is not enough",
    body:
      "Understand why binary outcomes require a model that produces probabilities between 0 and 1.",
  },
  {
    time: "20–45 min",
    title: "Probabilities, odds and log-odds",
    body:
      "Build the conceptual bridge from probability to odds to log-odds.",
  },
  {
    time: "45–75 min",
    title: "The logistic curve",
    body:
      "Study how the logistic function converts any real number into a valid probability.",
  },
  {
    time: "75–105 min",
    title: "The logistic regression equation",
    body:
      "Learn the model logit(p) = β₀ + β₁X and interpret coefficients carefully.",
  },
  {
    time: "105–135 min",
    title: "Odds ratios",
    body:
      "Understand why exponentiating a logistic coefficient gives an odds ratio.",
  },
  {
    time: "135–170 min",
    title: "Prediction and classification",
    body:
      "Separate predicted probabilities from classification decisions and understand threshold trade-offs.",
  },
  {
    time: "170–200 min",
    title: "Model interpretation and limits",
    body:
      "Study non-collapsibility, confounding, calibration, discrimination and responsible reporting.",
  },
];

const lectureCards = [
  {
    title: "Binary outcomes need probability models",
    body:
      "When the outcome is yes/no, diseased/not diseased or pass/fail, the model should predict probabilities rather than unrestricted numerical values.",
    example:
      "A model for whether a patient deteriorates should produce probabilities such as 0.12 or 0.81, not values such as −0.4 or 1.3.",
  },
  {
    title: "Linear regression can give impossible probabilities",
    body:
      "A straight-line model can predict values below 0 or above 1, which are invalid for probabilities.",
    example:
      "If risk is modelled as 0.2 + 0.15x, then for x = 7 the predicted value is 1.25, which is impossible as a probability.",
  },
  {
    title: "Logistic regression models log-odds",
    body:
      "Instead of modelling probability directly with a straight line, logistic regression models the log-odds as a linear function of predictors.",
    example:
      "log[p/(1 − p)] = β₀ + β₁X.",
  },
  {
    title: "The logistic function returns valid probabilities",
    body:
      "The logistic transformation converts any real-valued linear predictor into a number between 0 and 1.",
    example:
      "p = 1 / (1 + e⁻η), where η = β₀ + β₁X.",
  },
  {
    title: "Coefficients are interpreted through odds",
    body:
      "A logistic coefficient is a change in log-odds. Exponentiating it gives an odds ratio.",
    example:
      "If β₁ = 0.7, then the odds ratio is e⁰·⁷ ≈ 2.01.",
  },
  {
    title: "Probability prediction is not the same as classification",
    body:
      "A logistic model predicts probabilities. Turning those probabilities into labels requires a threshold, which introduces trade-offs.",
    example:
      "Using a 0.5 threshold may classify someone as high risk, but another context may need 0.2 or 0.8.",
  },
];

const detailedNotes = [
  {
    title: "1. Binary outcomes",
    formula: "Y ∈ {0, 1}",
    body:
      "Logistic regression is used when the outcome has two categories. We often code the event of interest as 1 and the non-event as 0.",
    derivation:
      "If Y is binary, then the conditional mean has a special interpretation. Since Y can only be 0 or 1, E(Y | X) = 1 × P(Y = 1 | X) + 0 × P(Y = 0 | X) = P(Y = 1 | X). Therefore modelling the conditional mean of Y is the same as modelling the event probability.",
    example:
      "If Y = 1 means disease present and Y = 0 means disease absent, then E(Y | X) is the probability of disease for a given X.",
    warning:
      "The choice of which category is coded 1 matters. Coefficients describe the odds of the coded event.",
  },
  {
    title: "2. Why ordinary linear regression is unsuitable",
    formula: "linear probability model: p = β₀ + β₁X",
    body:
      "A straight-line model for probability can produce impossible predictions below 0 or above 1.",
    derivation:
      "A linear equation β₀ + β₁X can take any real value as X changes. Probabilities must stay within [0, 1]. Therefore a direct linear model can violate probability rules, especially when extrapolating.",
    example:
      "If predicted probability is 0.1 + 0.2X, then X = 6 gives 1.3, which is not a valid probability.",
    warning:
      "Linear probability models can sometimes be used descriptively, but logistic regression is usually more appropriate for binary outcomes.",
  },
  {
    title: "3. Probability",
    formula: "p = P(Y = 1 | X)",
    body:
      "The predicted probability p is the chance of the event occurring for a given set of predictor values.",
    derivation:
      "For a binary outcome, the probability of the event is p and the probability of the non-event is 1 − p. These two probabilities must add to 1.",
    example:
      "If p = 0.25, then the event probability is 25% and the non-event probability is 75%.",
    warning:
      "A probability is not a classification by itself. A person with p = 0.35 may still experience the event.",
  },
  {
    title: "4. Odds",
    formula: "odds = p / (1 − p)",
    body:
      "Odds compare the probability of the event with the probability of the non-event.",
    derivation:
      "If p is the probability of the event, then 1 − p is the probability of no event. Odds are event probability divided by non-event probability.",
    example:
      "If p = 0.75, odds = 0.75/0.25 = 3. The event is three times as likely as the non-event.",
    warning:
      "Odds and probability are not the same. Odds of 3 correspond to probability 0.75, not probability 3.",
  },
  {
    title: "5. Converting odds back to probability",
    formula: "p = odds / (1 + odds)",
    body:
      "Odds can be converted back into probability using a simple transformation.",
    derivation:
      "Start with odds = p/(1 − p). Let odds = o. Then o(1 − p) = p, so o − op = p. Therefore o = p(1 + o), giving p = o/(1 + o).",
    example:
      "If odds = 4, then p = 4/(1 + 4) = 0.8.",
    warning:
      "Large odds can still correspond to probabilities less than 1. Probability never exceeds 1.",
  },
  {
    title: "6. Log-odds or logit",
    formula: "logit(p) = log[p/(1 − p)]",
    body:
      "The logit transformation takes a probability between 0 and 1 and maps it to the whole real line.",
    derivation:
      "Odds are positive and range from 0 to infinity. Taking the natural logarithm maps positive odds to values from −∞ to ∞. This allows a linear model to be placed on the log-odds scale.",
    example:
      "If p = 0.5, odds = 1 and log-odds = log(1) = 0.",
    warning:
      "Log-odds are mathematically useful but not usually intuitive. Convert to probabilities or odds ratios for interpretation.",
  },
  {
    title: "7. Logistic regression model",
    formula: "log[p/(1 − p)] = β₀ + β₁X",
    body:
      "Logistic regression models the log-odds of the event as a linear function of predictors.",
    derivation:
      "Let η = β₀ + β₁X. The model states logit(p) = η. Since η can be any real number, the logit link allows linear modelling without producing invalid probabilities.",
    example:
      "If logit(p) = −2 + 0.4X, then each one-unit increase in X increases the log-odds by 0.4.",
    warning:
      "The relationship is linear on the log-odds scale, not on the probability scale.",
  },
  {
    title: "8. Logistic function",
    formula: "p = 1 / (1 + e⁻η)",
    body:
      "The logistic function converts the linear predictor η into a probability.",
    derivation:
      "Starting from log[p/(1 − p)] = η, exponentiate both sides: p/(1 − p) = eη. Then p = eη(1 − p), so p + peη = eη. Therefore p(1 + eη) = eη, giving p = eη/(1 + eη), equivalently p = 1/(1 + e⁻η).",
    example:
      "If η = 0, then p = 1/(1 + e⁰) = 1/2 = 0.5.",
    warning:
      "Equal changes in X do not produce equal changes in probability everywhere. The curve is steepest near p = 0.5.",
  },
  {
    title: "9. Logistic coefficient interpretation",
    formula: "β₁ = change in log-odds for one-unit increase in X",
    body:
      "A logistic regression coefficient is interpreted as a change in log-odds, holding other variables constant if included.",
    derivation:
      "If X increases by one unit, η changes from β₀ + β₁X to β₀ + β₁(X + 1). The difference is β₁. Since η is the log-odds, β₁ is the one-unit change in log-odds.",
    example:
      "If β₁ = 0.5, then each one-unit increase in X raises the log-odds by 0.5.",
    warning:
      "A positive coefficient increases odds, but the increase in probability depends on the starting probability.",
  },
  {
    title: "10. Odds ratio",
    formula: "OR = eβ₁",
    body:
      "Exponentiating a logistic coefficient gives an odds ratio.",
    derivation:
      "If the log-odds increase by β₁ for a one-unit increase in X, then the odds are multiplied by eβ₁. This multiplicative change is the odds ratio.",
    example:
      "If β₁ = 0.693, then OR = e⁰·⁶⁹³ ≈ 2. The odds double for each one-unit increase in X.",
    warning:
      "An odds ratio is not a risk ratio. When outcomes are common, odds ratios can look more extreme than probability ratios.",
  },
  {
    title: "11. Multiple logistic regression",
    formula: "logit(p) = β₀ + β₁X₁ + β₂X₂ + ... + βₖXₖ",
    body:
      "Logistic regression can include several predictors, producing adjusted odds ratios.",
    derivation:
      "Each coefficient βⱼ is the change in log-odds for a one-unit increase in Xⱼ while holding the other included predictors constant. Exponentiating gives an adjusted odds ratio.",
    example:
      "A model for disease may include age, smoking status and BMI. The smoking coefficient gives an age- and BMI-adjusted odds ratio.",
    warning:
      "Adjustment has the same conceptual issues as multiple linear regression: confounding, overadjustment, collider bias and model choice matter.",
  },
  {
    title: "12. Classification threshold",
    formula: "classify event if p̂ ≥ threshold",
    body:
      "Logistic regression estimates probabilities. Classification requires choosing a probability threshold.",
    derivation:
      "If p̂ is the predicted probability, a threshold t turns probability into a label: classify as event if p̂ ≥ t and non-event otherwise. Changing t changes sensitivity and specificity.",
    example:
      "At threshold 0.5, p̂ = 0.6 is classified as event. At threshold 0.7, the same person is classified as non-event.",
    warning:
      "Threshold choice is not purely statistical. It depends on the consequences of false positives and false negatives.",
  },
  {
    title: "13. Calibration",
    formula: "predicted probability should match observed frequency",
    body:
      "Calibration asks whether predicted probabilities are numerically reliable.",
    derivation:
      "If a well-calibrated model assigns risk 0.20 to many people, about 20% of those people should experience the event. Calibration concerns probability accuracy, not just ranking.",
    example:
      "Among patients predicted at 30% risk, roughly 30% should actually deteriorate in a calibrated model.",
    warning:
      "A model can classify well but be poorly calibrated.",
  },
  {
    title: "14. Discrimination",
    formula: "discrimination = ability to rank higher-risk cases above lower-risk cases",
    body:
      "Discrimination concerns whether the model gives higher predicted probabilities to people who experience the event than to those who do not.",
    derivation:
      "A model has good discrimination if event cases tend to receive higher predicted risks than non-event cases. This is different from calibration, which asks whether the probabilities are numerically accurate.",
    example:
      "A model may correctly rank high-risk patients above low-risk patients even if all probabilities are too high.",
    warning:
      "Good discrimination does not guarantee good clinical usefulness or calibration.",
  },
];

const workedExamples = [
  {
    title: "Probability to odds",
    question:
      "A predicted probability is p = 0.80. Convert this probability to odds.",
    working:
      "Odds = p/(1 − p) = 0.80/0.20 = 4.",
    answer:
      "The odds are 4. The event is four times as likely as the non-event.",
    deeper:
      "This does not mean the probability is 4. Probability is 0.80; odds are 4.",
  },
  {
    title: "Odds to probability",
    question:
      "A patient has predicted odds of 3. Convert this to probability.",
    working:
      "p = odds/(1 + odds) = 3/(1 + 3) = 3/4 = 0.75.",
    answer:
      "The predicted probability is 0.75.",
    deeper:
      "Odds of 3 means the event is three times as likely as the non-event, corresponding to 75% probability.",
  },
  {
    title: "Logistic prediction",
    question:
      "A logistic model has logit(p) = −2 + 0.5X. Find p when X = 4.",
    working:
      "η = −2 + 0.5(4) = 0. Then p = 1/(1 + e⁰) = 0.5.",
    answer:
      "The predicted probability is 0.50.",
    deeper:
      "When η = 0, odds = 1 and probability = 0.5.",
  },
  {
    title: "Odds ratio from coefficient",
    question:
      "A logistic coefficient is β = 0.7. Interpret the odds ratio.",
    working:
      "OR = e⁰·⁷ ≈ 2.01. A one-unit increase in X multiplies the odds by about 2.01.",
    answer:
      "The odds approximately double for each one-unit increase in X.",
    deeper:
      "This is an odds interpretation, not a direct probability doubling.",
  },
  {
    title: "Negative coefficient",
    question:
      "A logistic coefficient is β = −0.4. What is the odds ratio?",
    working:
      "OR = e⁻⁰·⁴ ≈ 0.67.",
    answer:
      "Each one-unit increase in X multiplies the odds by about 0.67, a 33% reduction in odds.",
    deeper:
      "A coefficient below zero corresponds to an odds ratio below 1.",
  },
];

const practiceQuestions = [
  {
    prompt:
      "Convert probability p = 0.25 into odds.",
    answer:
      "Odds = 0.25/(1 − 0.25) = 0.25/0.75 = 1/3 ≈ 0.333.",
  },
  {
    prompt:
      "Convert odds = 4 into probability.",
    answer:
      "p = 4/(1 + 4) = 4/5 = 0.80.",
  },
  {
    prompt:
      "If logit(p) = 0, what is p?",
    answer:
      "If logit(p) = 0, odds = e⁰ = 1, so p = 1/(1 + 1) = 0.5.",
  },
  {
    prompt:
      "A logistic coefficient is 1. What is the odds ratio?",
    answer:
      "OR = e¹ ≈ 2.718. The odds are multiplied by about 2.72 for a one-unit increase in X.",
  },
  {
    prompt:
      "Why is an odds ratio not the same as a risk ratio?",
    answer:
      "An odds ratio compares odds, p/(1 − p), while a risk ratio compares probabilities directly. When outcomes are common, odds ratios can be much more extreme.",
  },
  {
    prompt:
      "Why does logistic regression need a classification threshold?",
    answer:
      "Because logistic regression predicts probabilities. A threshold is needed to convert probabilities into event/non-event labels.",
  },
];

const quizQuestions = [
  {
    question: "What type of outcome is logistic regression mainly used for?",
    options: [
      "Binary outcomes",
      "Only continuous outcomes",
      "Only dates",
      "Only sample sizes",
    ],
    answer: 0,
    feedback:
      "Logistic regression is commonly used for binary outcomes coded 0/1.",
  },
  {
    question: "What does logistic regression model linearly?",
    options: [
      "The raw probability",
      "The log-odds",
      "The sample size",
      "The residual sum",
    ],
    answer: 1,
    feedback:
      "Logistic regression models the log-odds as a linear function of predictors.",
  },
  {
    question: "What is the formula for odds?",
    options: [
      "p/(1 − p)",
      "1 − p",
      "p + 1",
      "log(p)",
    ],
    answer: 0,
    feedback:
      "Odds are event probability divided by non-event probability.",
  },
  {
    question: "If p = 0.5, what are the odds?",
    options: ["0", "0.5", "1", "2"],
    answer: 2,
    feedback:
      "Odds = 0.5/0.5 = 1.",
  },
  {
    question: "If β = 0.693, the odds ratio is approximately:",
    options: ["0.5", "1", "2", "10"],
    answer: 2,
    feedback:
      "e⁰·⁶⁹³ is approximately 2.",
  },
  {
    question: "What does a classification threshold do?",
    options: [
      "Converts predicted probabilities into class labels",
      "Removes all bias",
      "Makes odds equal probability",
      "Forces all predictions to 0.5",
    ],
    answer: 0,
    feedback:
      "A threshold converts probabilities into event/non-event classifications.",
  },
  {
    question: "What is calibration?",
    options: [
      "Whether predicted probabilities match observed event frequencies",
      "Whether all coefficients are positive",
      "Whether the sample size is even",
      "Whether all p-values are below 0.05",
    ],
    answer: 0,
    feedback:
      "Calibration asks whether predicted risks are numerically reliable.",
  },
];

export default function LogisticRegressionFoundationsLesson() {
  const lessonCode = "5.5";

  if (!isStatisticsFoundationLessonOpen(lessonCode)) {
    return (
      <LockedLessonGate
        lessonCode={lessonCode}
        lessonTitle="Logistic regression foundations"
        moduleTitle="Module 5: Regression Foundations"
      />
    );
  }

  const [activeTab, setActiveTab] = useState("Learning Route");

  const [intercept, setIntercept] = useState(-3);
  const [slope, setSlope] = useState(0.7);
  const [xValue, setXValue] = useState(4);
  const [threshold, setThreshold] = useState(50);
  const [separation, setSeparation] = useState(55);
  const [noise, setNoise] = useState(25);

  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedPractice, setSelectedPractice] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const eta = intercept + slope * xValue;
  const probability = logistic(eta);
  const odds = probability / (1 - probability);
  const oddsRatio = Math.exp(slope);

  const classificationData = useMemo(
    () => makeClassificationData(separation, noise),
    [separation, noise],
  );

  const classified = classificationData.map((point) => ({
    ...point,
    predictedClass: point.p >= threshold / 100 ? 1 : 0,
  }));

  const confusion = getConfusion(classified);
  const sensitivity =
    confusion.tp + confusion.fn === 0
      ? 0
      : confusion.tp / (confusion.tp + confusion.fn);
  const specificity =
    confusion.tn + confusion.fp === 0
      ? 0
      : confusion.tn / (confusion.tn + confusion.fp);
  const accuracy =
    classified.length === 0
      ? 0
      : (confusion.tp + confusion.tn) / classified.length;

  const activeExample = workedExamples[selectedExample];
  const activePractice = practiceQuestions[selectedPractice];

  const score = quizQuestions.reduce(
    (total, question, index) =>
      selectedAnswers[index] === question.answer ? total + 1 : total,
    0,
  );

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
          eyebrow="Statistics Foundation · Lesson 5.5"
          title="Logistic regression foundations."
          body="Logistic regression explains how regression ideas change when the outcome is binary. This lesson develops probability, odds, log-odds, the logistic curve, odds ratios, prediction thresholds, calibration, discrimination and responsible interpretation."
          sideTitle="Logistic regression predicts probabilities through log-odds."
          facts={[
            "Binary outcome: Y ∈ {0, 1}",
            "Odds = p / (1 − p)",
            "logit(p) = log[p/(1 − p)]",
            "logit(p) = β₀ + β₁X",
            "p = 1 / (1 + e⁻η)",
            "OR = eβ",
          ]}
        />

        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "Learning Route" && (
          <LearningRoute
            items={learningRoute}
            checklist={[
              "Explain why binary outcomes need probability models.",
              "Convert between probability and odds.",
              "Define log-odds and the logit transformation.",
              "Write the logistic regression equation.",
              "Convert a linear predictor into probability.",
              "Interpret logistic coefficients as log-odds changes.",
              "Interpret odds ratios correctly.",
              "Separate probability prediction from classification.",
              "Explain threshold trade-offs.",
              "Distinguish calibration from discrimination.",
            ]}
          />
        )}

        {activeTab === "Lecture" && <Lecture cards={lectureCards} />}

        {activeTab === "Detailed Notes" && <Notes notes={detailedNotes} />}

        {activeTab === "Probability Lab" && (
          <section className="mt-8 overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="p-6 md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Interactive probability lab
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Build probability from the logistic equation.
                </h2>

                <p className="mt-4 text-base leading-8 text-neutral-700">
                  Adjust the intercept, slope and predictor value. The model
                  first calculates a linear predictor η, then converts it into a
                  probability using the logistic function.
                </p>

                <div className="mt-6 grid gap-5">
                  <Slider label="Intercept β₀" value={intercept} min={-8} max={5} step={0.1} onChange={setIntercept} />
                  <Slider label="Slope β₁" value={slope} min={-2} max={2} step={0.1} onChange={setSlope} />
                  <Slider label="Predictor value X" value={xValue} min={0} max={10} step={0.1} onChange={setXValue} />
                </div>
              </div>

              <div className="border-t border-neutral-200 bg-neutral-950 p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                  Probability output
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  p̂ = {(probability * 100).toFixed(1)}%
                </h2>

                <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.07] p-5">
                  <LogisticCurve intercept={intercept} slope={slope} xValue={xValue} />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <DarkMetric label="Linear predictor η" value={eta.toFixed(3)} />
                  <DarkMetric label="Predicted probability" value={probability.toFixed(3)} />
                  <DarkMetric label="Predicted odds" value={odds.toFixed(3)} />
                  <DarkMetric label="Odds ratio eβ₁" value={oddsRatio.toFixed(3)} />
                </div>

                <p className="mt-6 rounded-[1.5rem] bg-white p-5 text-sm font-bold leading-7 text-neutral-950">
                  η = {intercept.toFixed(2)} + {slope.toFixed(2)} ×{" "}
                  {xValue.toFixed(1)} = {eta.toFixed(3)}. Then p̂ = 1/(1 +
                  e⁻η) = {probability.toFixed(3)}.
                </p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "Odds Lab" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Odds and probability lab
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                Probability and odds describe the same risk differently.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                Probability compares the event to all possible outcomes. Odds
                compare the event to the non-event. Logistic regression uses odds
                because odds can be transformed into log-odds on the full real
                line.
              </p>

              <div className="mt-6 rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5">
                <OddsVisual p={probability} />
              </div>
            </section>

            <section className="rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Conversion map
              </p>

              <div className="mt-6 grid gap-4">
                <InfoBlock title="Probability to odds" body={`odds = p/(1 − p) = ${odds.toFixed(3)}`} dark />
                <InfoBlock title="Odds to probability" body={`p = odds/(1 + odds) = ${probability.toFixed(3)}`} dark />
                <InfoBlock title="Odds to log-odds" body={`log(odds) = ${Math.log(odds).toFixed(3)}`} dark />
                <InfoBlock title="Log-odds to probability" body="p = 1/(1 + e⁻η)" dark />
              </div>
            </section>
          </section>
        )}

        {activeTab === "Logit Curve Lab" && (
          <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Logit curve lab
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Logistic regression is linear in log-odds but curved in probability.
            </h2>

            <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-700">
              The same one-unit increase in X changes the log-odds by the same
              amount everywhere. But the probability change is not constant. It
              is largest near the middle of the curve and smaller near 0 or 1.
            </p>

            <div className="mt-6 rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5">
              <ProbabilityChangeVisual intercept={intercept} slope={slope} />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Metric label="At low probability" value="small probability change" />
              <Metric label="Near p = 0.5" value="largest change" />
              <Metric label="Near high probability" value="small probability change" />
            </div>
          </section>
        )}

        {activeTab === "Classification Lab" && (
          <section className="mt-8 overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="p-6 md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Classification threshold lab
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Change the threshold and watch errors shift.
                </h2>

                <p className="mt-4 text-base leading-8 text-neutral-700">
                  Logistic regression predicts probabilities. A threshold turns
                  probabilities into labels. Lower thresholds usually increase
                  sensitivity but may reduce specificity.
                </p>

                <div className="mt-6 grid gap-5">
                  <Slider label="Classification threshold" value={threshold} min={5} max={95} suffix="%" onChange={setThreshold} />
                  <Slider label="Group separation" value={separation} min={10} max={90} suffix="%" onChange={setSeparation} />
                  <Slider label="Noise" value={noise} min={0} max={70} suffix="%" onChange={setNoise} />
                </div>
              </div>

              <div className="border-t border-neutral-200 bg-neutral-950 p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                  Classification output
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Accuracy {(accuracy * 100).toFixed(1)}%
                </h2>

                <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.07] p-5">
                  <ClassificationPlot data={classified} threshold={threshold / 100} />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <DarkMetric label="Sensitivity" value={`${(sensitivity * 100).toFixed(1)}%`} />
                  <DarkMetric label="Specificity" value={`${(specificity * 100).toFixed(1)}%`} />
                  <DarkMetric label="False positives" value={confusion.fp.toString()} />
                  <DarkMetric label="False negatives" value={confusion.fn.toString()} />
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "Worked Examples" && (
          <Examples
            examples={workedExamples}
            selected={selectedExample}
            setSelected={setSelectedExample}
            active={activeExample}
          />
        )}

        {activeTab === "Practice Studio" && (
          <Practice
            questions={practiceQuestions}
            selected={selectedPractice}
            setSelected={setSelectedPractice}
            active={activePractice}
          />
        )}

        {activeTab === "Reflection" && (
          <Reflection
            title="Logistic regression is a probability model, not just a classification tool."
            cards={[
              [
                "What is the event?",
                "Define clearly which outcome category is coded as 1 before interpreting coefficients.",
              ],
              [
                "What scale is linear?",
                "The model is linear on the log-odds scale, not on the probability scale.",
              ],
              [
                "What does the coefficient mean?",
                "A coefficient is a log-odds change. Exponentiating gives an odds ratio.",
              ],
              [
                "What does the threshold do?",
                "It turns predicted probabilities into decisions and controls false-positive and false-negative trade-offs.",
              ],
            ]}
          />
        )}

        {activeTab === "Quiz" && (
          <Quiz
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
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
            {body}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["200 minutes", "No coding", "Odds ratios", "Classification"].map(
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
            Central idea
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
            {sideTitle}
          </h2>

          <div className="mt-8 grid gap-3">
            {facts.map((item) => (
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
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
          Lesson route
        </p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
          Move from linear regression to probability modelling.
        </h2>
        <p className="mt-5 text-base leading-8 text-neutral-700">
          Linear regression predicts a continuous mean. Logistic regression
          predicts the probability of an event. This requires changing the scale
          from probability to odds to log-odds.
        </p>

        <div className="mt-6 grid gap-3">
          {items.map((item) => (
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
          Students should understand probabilities, odds and decisions.
        </h2>
        <div className="mt-8 grid gap-3">
          {checklist.map((item, index) => (
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
  );
}

function Lecture({
  cards,
}: {
  cards: { title: string; body: string; example: string }[];
}) {
  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
          Concept lecture
        </p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
          Logistic regression keeps predictions inside the probability scale.
        </h2>

        <p className="mt-5 text-base leading-8 text-neutral-700">
          A binary outcome needs a model that respects probability limits.
          Logistic regression solves this by modelling log-odds linearly, then
          transforming back to probabilities.
        </p>

        <div className="mt-6 grid gap-4">
          {cards.map((item, index) => (
            <article
              key={item.title}
              className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-sm font-black text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-black tracking-[-0.035em]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-neutral-700">
                    {item.body}
                  </p>
                  <p className="mt-3 rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-7 text-neutral-700">
                    Example: {item.example}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
          Classroom dialogue
        </p>

        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
          Mr. R explains why logistic regression changes the scale.
        </h2>

        <div className="mt-6 grid gap-4">
          <Dialogue speaker="Mr. R" text="So far, regression has predicted numerical outcomes. But what if the outcome is yes or no?" />
          <Dialogue speaker="Amelia" text="Then the model should predict a probability?" />
          <Dialogue speaker="Mr. R" text="Exactly. But a straight line can go below 0 or above 1, which probabilities cannot do." />
          <Dialogue speaker="Ben" text="So logistic regression fixes the range problem?" />
          <Dialogue speaker="Mr. R" text="Yes. It models log-odds with a line, then transforms that line into a probability between 0 and 1." />
          <Dialogue speaker="Chloe" text="Why do we talk about odds instead of just probability?" />
          <Dialogue speaker="Mr. R" text="Because odds can be transformed into log-odds, and log-odds can take any real value. That allows a linear model." />
          <Dialogue speaker="Daniel" text="And the coefficient becomes an odds ratio after exponentiating?" />
          <Dialogue speaker="Mr. R" text="Correct. That is one of the central interpretations in logistic regression." />
        </div>
      </section>
    </section>
  );
}

function Notes({
  notes,
}: {
  notes: {
    title: string;
    formula: string;
    body: string;
    derivation: string;
    example: string;
    warning: string;
  }[];
}) {
  return (
    <section className="mt-8 grid gap-6">
      <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
          Detailed theoretical notes
        </p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
          Logistic regression is built from probability, odds and the logit link.
        </h2>
        <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-700">
          These notes develop the full conceptual pathway from binary outcomes
          to probability prediction, log-odds modelling, odds ratios,
          classification and responsible reporting.
        </p>
      </section>

      <div className="grid gap-5">
        {notes.map((item) => (
          <article
            key={item.title}
            className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
              {item.formula}
            </p>
            <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              {item.body}
            </p>

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
  examples: {
    title: string;
    question: string;
    working: string;
    answer: string;
    deeper: string;
  }[];
  selected: number;
  setSelected: (value: number) => void;
  active: {
    title: string;
    question: string;
    working: string;
    answer: string;
    deeper: string;
  };
}) {
  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
          Worked examples
        </p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
          Work through probability, odds, logit and odds ratios.
        </h2>

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
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
          {active.title}
        </p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
          {active.question}
        </h2>

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
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
          Practice studio
        </p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
          Practise the core conversions.
        </h2>

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
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
          Question {selected + 1}
        </p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
          {active.prompt}
        </h2>

        <div className="mt-6 rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-neutral-500">
            Suggested answer
          </p>
          <p className="mt-3 text-base leading-8 text-neutral-700">
            {active.answer}
          </p>
        </div>
      </section>
    </section>
  );
}

function Reflection({
  title,
  cards,
}: {
  title: string;
  cards: [string, string][];
}) {
  return (
    <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
        Reflection
      </p>
      <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
        {title}
      </h2>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {cards.map(([cardTitle, body]) => (
          <article
            key={cardTitle}
            className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
          >
            <h3 className="text-xl font-black tracking-[-0.035em]">
              {cardTitle}
            </h3>
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
  questions: {
    question: string;
    options: string[];
    answer: number;
    feedback: string;
  }[];
  selectedAnswers: Record<number, number>;
  setSelectedAnswers: Dispatch<SetStateAction<Record<number, number>>>;
  score: number;
}) {
  return (
    <section className="mt-8 grid gap-6">
      <section className="rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
          Lesson quiz
        </p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
          Score: {score}/{questions.length}
        </h2>
      </section>

      <div className="grid gap-5">
        {questions.map((question, index) => {
          const selected = selectedAnswers[index];

          return (
            <article
              key={question.question}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
            >
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
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[#8b1116]">
        {speaker}
      </p>
      <p className="mt-2 text-sm leading-7 text-neutral-700">{text}</p>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  suffix = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-black text-neutral-700">{label}</span>
        <span className="rounded-full bg-neutral-950 px-3 py-1 text-xs font-black text-white">
          {value.toFixed(step < 1 ? 1 : 0)}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
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
      <p className="text-xs font-black uppercase tracking-[0.16em] text-neutral-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-black tracking-[-0.04em]">{value}</p>
    </div>
  );
}

function DarkMetric({ label, value }: { label: string; value: string }) {
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

function LogisticCurve({
  intercept,
  slope,
  xValue,
}: {
  intercept: number;
  slope: number;
  xValue: number;
}) {
  const points = Array.from({ length: 120 }).map((_, index) => {
    const x = (10 * index) / 119;
    const p = logistic(intercept + slope * x);
    return { x, p };
  });

  const path = points
    .map((point, index) => {
      const x = 45 + (point.x / 10) * 430;
      const y = 220 - point.p * 170;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  const selectedP = logistic(intercept + slope * xValue);
  const selectedX = 45 + (xValue / 10) * 430;
  const selectedY = 220 - selectedP * 170;

  return (
    <svg viewBox="0 0 520 260" className="h-auto w-full">
      <rect x="25" y="25" width="470" height="210" rx="22" fill="#ffffff" opacity="0.08" />
      <line x1="45" x2="475" y1="220" y2="220" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="3" />
      <line x1="45" x2="45" y1="50" y2="220" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="3" />
      <path d={path} fill="none" stroke="#ffffff" strokeWidth="5" />
      <line x1={selectedX} x2={selectedX} y1="50" y2={selectedY} stroke="#8b1116" strokeWidth="4" strokeDasharray="7 7" />
      <circle cx={selectedX} cy={selectedY} r="9" fill="#8b1116" />
      <text x="45" y="245" fontSize="14" fontWeight="900" fill="#ffffff">X</text>
      <text x="380" y="245" fontSize="14" fontWeight="900" fill="#ffffff">probability</text>
    </svg>
  );
}

function OddsVisual({ p }: { p: number }) {
  const event = Math.round(p * 100);
  const nonevent = 100 - event;

  return (
    <svg viewBox="0 0 760 360" className="h-auto w-full">
      <rect x="45" y="50" width="670" height="245" rx="34" fill="#ffffff" stroke="#d4d4d4" strokeWidth="2" />

      <text x="85" y="105" fontSize="20" fontWeight="900" fill="#111111">
        Probability: event out of all outcomes
      </text>

      <rect x="85" y="135" width="560" height="42" rx="20" fill="#e5e5e5" />
      <rect x="85" y="135" width={(event / 100) * 560} height="42" rx="20" fill="#8b1116" />

      <text x="85" y="215" fontSize="20" fontWeight="900" fill="#111111">
        Odds: event compared with non-event
      </text>

      <text x="85" y="260" fontSize="22" fontWeight="900" fill="#8b1116">
        {event} event
      </text>
      <text x="250" y="260" fontSize="22" fontWeight="900" fill="#525252">
        :
      </text>
      <text x="285" y="260" fontSize="22" fontWeight="900" fill="#111111">
        {nonevent} non-event
      </text>
    </svg>
  );
}

function ProbabilityChangeVisual({
  intercept,
  slope,
}: {
  intercept: number;
  slope: number;
}) {
  const xs = [1, 4, 7];
  const rows = xs.map((x) => {
    const p1 = logistic(intercept + slope * x);
    const p2 = logistic(intercept + slope * (x + 1));
    return {
      x,
      p1,
      p2,
      change: p2 - p1,
    };
  });

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {rows.map((row) => (
        <article
          key={row.x}
          className="rounded-[1.5rem] border border-neutral-200 bg-white p-5"
        >
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
            X = {row.x} to {row.x + 1}
          </p>
          <h3 className="mt-3 text-3xl font-black tracking-[-0.05em]">
            Δp = {(row.change * 100).toFixed(1)}%
          </h3>
          <p className="mt-3 text-sm leading-7 text-neutral-700">
            Probability changes from {(row.p1 * 100).toFixed(1)}% to{" "}
            {(row.p2 * 100).toFixed(1)}%.
          </p>
        </article>
      ))}
    </div>
  );
}

function ClassificationPlot({
  data,
  threshold,
}: {
  data: {
    score: number;
    p: number;
    actual: number;
    predictedClass: number;
  }[];
  threshold: number;
}) {
  const sx = (score: number) => 45 + (score / 100) * 430;
  const sy = (p: number) => 220 - p * 170;
  const thresholdY = 220 - threshold * 170;

  return (
    <svg viewBox="0 0 520 260" className="h-auto w-full">
      <rect x="25" y="25" width="470" height="210" rx="22" fill="#ffffff" opacity="0.08" />
      <line x1="45" x2="475" y1="220" y2="220" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="3" />
      <line x1="45" x2="45" y1="50" y2="220" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="3" />
      <line x1="45" x2="475" y1={thresholdY} y2={thresholdY} stroke="#8b1116" strokeWidth="4" strokeDasharray="7 7" />

      {data.map((point, index) => {
        const correct = point.actual === point.predictedClass;

        return (
          <circle
            key={index}
            cx={sx(point.score)}
            cy={sy(point.p)}
            r="4"
            fill={correct ? "#ffffff" : "#8b1116"}
            opacity="0.9"
          />
        );
      })}

      <text x="45" y="245" fontSize="14" fontWeight="900" fill="#ffffff">
        risk score
      </text>
      <text x="300" y="245" fontSize="14" fontWeight="900" fill="#ffffff">
        dashed line = threshold
      </text>
    </svg>
  );
}

function logistic(eta: number) {
  return 1 / (1 + Math.exp(-eta));
}

function makeClassificationData(separation: number, noise: number) {
  return Array.from({ length: 90 }).map((_, index) => {
    const actual = index < 45 ? 0 : 1;
    const centre = actual === 1 ? 55 + separation / 3 : 45 - separation / 3;
    const score = Math.max(
      0,
      Math.min(100, centre + normalRandom(index + 15) * noise),
    );
    const p = logistic(-5 + 0.1 * score);

    return { score, p, actual };
  });
}

function getConfusion(
  data: {
    actual: number;
    predictedClass: number;
  }[],
) {
  return data.reduce(
    (counts, point) => {
      if (point.actual === 1 && point.predictedClass === 1) counts.tp += 1;
      if (point.actual === 1 && point.predictedClass === 0) counts.fn += 1;
      if (point.actual === 0 && point.predictedClass === 0) counts.tn += 1;
      if (point.actual === 0 && point.predictedClass === 1) counts.fp += 1;
      return counts;
    },
    { tp: 0, fn: 0, tn: 0, fp: 0 },
  );
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
