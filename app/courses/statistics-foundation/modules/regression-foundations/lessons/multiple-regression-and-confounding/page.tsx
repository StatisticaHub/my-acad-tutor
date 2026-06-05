"use client";

import LockedLessonGate from "@/components/course/LockedLessonGate";
import { isStatisticsFoundationLessonOpen } from "@/lib/statisticsFoundationAccess";


import { useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

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
  "Adjustment Lab",
  "Confounding Map",
  "Coefficient Studio",
  "Worked Examples",
  "Practice Studio",
  "Reflection",
  "Quiz",
];

const learningRoute = [
  {
    time: "0–20 min",
    title: "Why simple regression may mislead",
    body:
      "Understand why a single predictor relationship may be distorted by other variables.",
  },
  {
    time: "20–50 min",
    title: "Multiple regression equation",
    body:
      "Learn the model with more than one explanatory variable and interpret adjusted coefficients.",
  },
  {
    time: "50–80 min",
    title: "Confounding",
    body:
      "Study how a third variable can create or distort an association between exposure and outcome.",
  },
  {
    time: "80–110 min",
    title: "Adjustment",
    body:
      "Understand what it means to compare observations at the same value of a covariate.",
  },
  {
    time: "110–140 min",
    title: "Model choice",
    body:
      "Explore why variables should be chosen using research design and subject knowledge, not only automatic statistics.",
  },
  {
    time: "140–170 min",
    title: "Interpretation limits",
    body:
      "Recognise overadjustment, collider bias, multicollinearity and causal overclaiming.",
  },
];

const lectureCards = [
  {
    title: "Multiple regression includes several predictors",
    body:
      "The model predicts an outcome using more than one explanatory variable at the same time.",
    example:
      "Blood pressure may be modelled using age, weight and physical activity.",
  },
  {
    title: "Adjusted coefficients hold other variables constant",
    body:
      "A coefficient estimates the association with one predictor while comparing observations with the same values of the other included predictors.",
    example:
      "The coefficient for activity compares people of the same age and weight.",
  },
  {
    title: "Confounding can distort simple relationships",
    body:
      "A confounder is related to both the predictor and the outcome and can create a misleading association.",
    example:
      "Age may confound the relationship between exercise and blood pressure.",
  },
  {
    title: "Adjustment can reduce confounding",
    body:
      "Including a confounder in the model can make the main coefficient closer to the relationship of interest.",
    example:
      "Adjusting for age may change the estimated association between exercise and blood pressure.",
  },
  {
    title: "Not every variable should be adjusted for",
    body:
      "Some variables are mediators or colliders; adjusting for them can create bias.",
    example:
      "Adjusting for a consequence of the exposure may block part of the effect being studied.",
  },
  {
    title: "Model choice is scientific, not mechanical",
    body:
      "Regression models should be built from the research question, study design, theory and assumptions.",
    example:
      "A variable with a small p-value is not automatically a good adjustment variable.",
  },
];

const detailedNotes = [
  {
    title: "1. Multiple regression model",
    formula: "Y = β₀ + β₁X₁ + β₂X₂ + ... + βₖXₖ + ε",
    body:
      "Multiple regression extends simple regression by modelling an outcome using several predictors at once.",
    derivation:
      "The systematic component is a linear combination of predictors. For k predictors, the conditional mean is E(Y | X₁, ..., Xₖ) = β₀ + β₁X₁ + ... + βₖXₖ if the model is correctly specified.",
    example:
      "A model for systolic blood pressure may include age, BMI, medication use and physical activity.",
    warning:
      "Adding more variables does not automatically make a model better. It can increase complexity and introduce new biases.",
  },
  {
    title: "2. Adjusted coefficient interpretation",
    formula: "βⱼ = change in mean Y per one-unit change in Xⱼ, holding other predictors constant",
    body:
      "In multiple regression, each coefficient is interpreted conditionally on the other variables in the model.",
    derivation:
      "Compare two observations with the same values of all predictors except Xⱼ, differing by one unit in Xⱼ. The model-predicted difference in Y is βⱼ.",
    example:
      "If β for age is 0.7 in a blood pressure model, then each additional year of age is associated with 0.7 higher predicted blood pressure, holding other included predictors constant.",
    warning:
      "Holding constant is a model-based comparison. It may not correspond to a real causal intervention.",
  },
  {
    title: "3. Confounding",
    formula: "Confounder C is associated with X and causes or predicts Y",
    body:
      "Confounding occurs when the association between exposure X and outcome Y is mixed with the effect of another variable C.",
    derivation:
      "If C is related to X and also influences Y, then part of the observed X-Y association may be due to different distributions of C across X groups. Adjustment aims to compare X groups with similar C values.",
    example:
      "Older people may exercise less and also have higher blood pressure. Age can confound the exercise-blood-pressure relationship.",
    warning:
      "A confounder is not just any associated variable. It must be conceptually connected to both exposure and outcome in the right causal structure.",
  },
  {
    title: "4. Crude versus adjusted association",
    formula: "crude coefficient may differ from adjusted coefficient",
    body:
      "A crude association is estimated without adjustment. An adjusted association includes other variables in the model.",
    derivation:
      "If the included covariate is a confounder, the coefficient of X may change after adjustment because the model compares observations at similar covariate values.",
    example:
      "The crude relationship between coffee and heart disease may weaken after adjusting for smoking.",
    warning:
      "A change after adjustment is not automatically proof of confounding; model specification and measurement quality matter.",
  },
  {
    title: "5. Partial association",
    formula: "coefficient of X = association between residual part of X and residual part of Y",
    body:
      "An adjusted coefficient can be understood as the relationship between the part of X not explained by other covariates and the part of Y not explained by those covariates.",
    derivation:
      "For one covariate C, remove the linear association between X and C, and remove the linear association between Y and C. The coefficient for X in a model with C is the relationship between these remaining residual parts.",
    example:
      "The adjusted activity coefficient compares activity differences among people of similar age.",
    warning:
      "This interpretation is linear and model-based. It relies on the covariates being measured and specified appropriately.",
  },
  {
    title: "6. Overadjustment",
    formula: "adjusting for mediators can remove part of the effect",
    body:
      "Overadjustment can occur when a model controls for variables that lie on the pathway from exposure to outcome.",
    derivation:
      "If X affects M and M affects Y, then M is a mediator. Adjusting for M blocks the pathway X → M → Y, so the coefficient for X may no longer represent the total association or total effect.",
    example:
      "If exercise affects weight and weight affects blood pressure, adjusting for weight may remove part of exercise's pathway to blood pressure.",
    warning:
      "Whether to adjust for a mediator depends on whether the goal is total effect, direct effect or prediction.",
  },
  {
    title: "7. Collider bias",
    formula: "adjusting for a common effect can create association",
    body:
      "A collider is a variable influenced by two other variables. Adjusting for a collider can create a spurious association.",
    derivation:
      "If X → C ← Y, conditioning on C can make X and Y statistically associated even if they were otherwise independent. This is because selection on C creates dependence between its causes.",
    example:
      "Studying only hospitalised patients can create associations that do not exist in the general population if hospitalisation is influenced by both exposure and outcome-related factors.",
    warning:
      "Do not adjust for variables simply because they are available. Understand their causal role.",
  },
  {
    title: "8. Multicollinearity",
    formula: "predictors strongly related to each other → unstable coefficients",
    body:
      "Multicollinearity occurs when predictors are strongly correlated with each other, making it difficult to separate their individual associations.",
    derivation:
      "If X₁ and X₂ contain similar information, the model has difficulty assigning variation in Y uniquely to one predictor. Standard errors may increase and coefficients may become unstable.",
    example:
      "Weight and BMI are highly related; including both may make coefficients harder to interpret.",
    warning:
      "Multicollinearity may not harm prediction much but can seriously complicate coefficient interpretation.",
  },
  {
    title: "9. Prediction versus explanation",
    formula: "best prediction model may not be best causal model",
    body:
      "Regression models can be built for prediction or explanation. These goals require different variable choices.",
    derivation:
      "A prediction model may include any variable that improves prediction, even if it is not causal. An explanatory or causal model must avoid adjusting for inappropriate variables such as mediators or colliders depending on the target effect.",
    example:
      "A hospital readmission prediction model may include previous admissions. A causal model of treatment effect needs a different variable strategy.",
    warning:
      "Always state the modelling goal before choosing predictors.",
  },
  {
    title: "10. Model choice and responsibility",
    formula: "model = assumptions + data + purpose",
    body:
      "Multiple regression is powerful because it can adjust for several variables, but every adjustment is an assumption about the data-generating process.",
    derivation:
      "The fitted coefficients depend on the variables included, their measurement quality, functional form, interactions, missing data and sampling design. Therefore model choice must be justified.",
    example:
      "A transparent report explains why variables were included and how assumptions were checked.",
    warning:
      "Regression output should not be treated as automatic truth. It is a structured statistical argument.",
  },
];

const workedExamples = [
  {
    title: "Interpreting an adjusted coefficient",
    question:
      "A model predicts blood pressure from age and BMI. The age coefficient is 0.6. Interpret it.",
    working:
      "The coefficient means that, holding BMI constant, each additional year of age is associated with 0.6 higher predicted blood pressure.",
    answer:
      "Age is associated with 0.6 higher predicted blood pressure per year, adjusted for BMI.",
    deeper:
      "This is an adjusted association. It is not automatically a causal effect of ageing unless the model and design justify that interpretation.",
  },
  {
    title: "Confounding example",
    question:
      "The crude association between exercise and blood pressure is weak. After adjusting for age, exercise is more strongly negative. What might this suggest?",
    working:
      "Age may be related to both exercise and blood pressure. If older people exercise less and have higher blood pressure, age can mask the exercise association.",
    answer:
      "Age may be a confounder, and adjustment reveals a clearer association.",
    deeper:
      "This interpretation depends on age being correctly measured and appropriately modelled.",
  },
  {
    title: "Overadjustment",
    question:
      "A researcher studies the total effect of exercise on blood pressure but adjusts for weight, even though exercise may reduce weight. What is the concern?",
    working:
      "If weight lies on the pathway from exercise to blood pressure, adjusting for weight may remove part of the total exercise effect.",
    answer:
      "This may be overadjustment if the target is the total effect.",
    deeper:
      "If the target is the direct effect not through weight, adjustment may be intentional. The goal matters.",
  },
  {
    title: "Multicollinearity",
    question:
      "A model includes both BMI and weight. Coefficients become unstable and standard errors increase. Why?",
    working:
      "BMI and weight contain overlapping information. The model struggles to separate their independent associations with the outcome.",
    answer:
      "This is a multicollinearity problem.",
    deeper:
      "Prediction may remain reasonable, but individual coefficient interpretation becomes difficult.",
  },
];

const practiceQuestions = [
  {
    prompt:
      "Write the multiple regression equation with predictors X₁ and X₂.",
    answer:
      "Y = β₀ + β₁X₁ + β₂X₂ + ε.",
  },
  {
    prompt:
      "What does 'holding other variables constant' mean?",
    answer:
      "It means comparing observations with the same values of the other included predictors while X changes.",
  },
  {
    prompt:
      "Define confounding in one sentence.",
    answer:
      "Confounding occurs when another variable is related to both the exposure and outcome, distorting their observed association.",
  },
  {
    prompt:
      "Why can adjusting for a mediator be problematic?",
    answer:
      "It can block part of the pathway through which the exposure affects the outcome, changing the meaning of the coefficient.",
  },
  {
    prompt:
      "Why should variables not be selected only by p-values?",
    answer:
      "Because variable choice depends on the research question, causal structure, design and assumptions, not only statistical significance.",
  },
];

const quizQuestions = [
  {
    question: "What does an adjusted coefficient represent?",
    options: [
      "Association with one predictor holding other included predictors constant.",
      "The sample size.",
      "The unadjusted mean only.",
      "The p-value of the intercept.",
    ],
    answer: 0,
    feedback:
      "An adjusted coefficient compares values of one predictor while holding other model variables fixed.",
  },
  {
    question: "What is confounding?",
    options: [
      "A third variable distorts the exposure-outcome association.",
      "A residual equals zero.",
      "The outcome is binary.",
      "The sample size is large.",
    ],
    answer: 0,
    feedback:
      "A confounder is related to exposure and outcome and can distort their association.",
  },
  {
    question: "What can happen if you adjust for a mediator when estimating a total effect?",
    options: [
      "You may block part of the effect pathway.",
      "You always remove bias.",
      "You make the model causal automatically.",
      "You remove all residuals.",
    ],
    answer: 0,
    feedback:
      "Adjusting for a mediator can remove part of the pathway from exposure to outcome.",
  },
  {
    question: "What is multicollinearity?",
    options: [
      "Predictors are strongly related to each other.",
      "The outcome has no variation.",
      "The intercept is zero.",
      "The sample mean is unknown.",
    ],
    answer: 0,
    feedback:
      "Multicollinearity occurs when predictors contain overlapping information.",
  },
  {
    question: "Which statement is correct?",
    options: [
      "Adding more variables always improves causal interpretation.",
      "Model choice should depend on the research question and assumptions.",
      "Only p-values matter for variable selection.",
      "Adjustment always removes all bias.",
    ],
    answer: 1,
    feedback:
      "Variable choice should be guided by the question, design, subject knowledge and assumptions.",
  },
  {
    question: "A prediction model and causal model:",
    options: [
      "Always use identical variables.",
      "May require different variable choices.",
      "Never use regression.",
      "Do not need assumptions.",
    ],
    answer: 1,
    feedback:
      "Prediction and causal explanation have different goals and may require different modelling choices.",
  },
];

export default function MultipleRegressionConfoundingLesson() {
  const lessonCode = "5.4";

  if (!isStatisticsFoundationLessonOpen(lessonCode)) {
    return (
      <LockedLessonGate
        lessonCode={lessonCode}
        lessonTitle="Multiple regression and confounding"
        moduleTitle="Module 5: Regression Foundations"
      />
    );
  }

  const [activeTab, setActiveTab] = useState("Learning Route");
  const [confoundingStrength, setConfoundingStrength] = useState(70);
  const [trueEffect, setTrueEffect] = useState(-4);
  const [covariateEffect, setCovariateEffect] = useState(6);
  const [noise, setNoise] = useState(12);

  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedPractice, setSelectedPractice] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const data = useMemo(
    () => makeConfoundingData(confoundingStrength, trueEffect, covariateEffect, noise),
    [confoundingStrength, trueEffect, covariateEffect, noise],
  );

  const crude = simpleSlope(data.map((d) => ({ x: d.x, y: d.y })));
  const adjusted = adjustedSlope(data);

  const activeExample = workedExamples[selectedExample];
  const activePractice = practiceQuestions[selectedPractice];
  const score = quizQuestions.reduce((total, q, i) => selectedAnswers[i] === q.answer ? total + 1 : total, 0);

  return (
    <main className="min-h-screen bg-[#F7F3EA] px-5 py-8 text-[#141210] md:px-8 md:py-14">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses/statistics-foundation/modules/regression-foundations")}
          className="text-sm font-black text-[#741018] hover:text-[#4d080e]"
        >
          ← Back to module
        </a>

        <Hero
          eyebrow="Statistics Foundation · Lesson 5.4"
          title="Multiple regression and confounding."
          body="Multiple regression extends simple regression to several predictors. This lesson explains adjusted coefficients, confounding, crude versus adjusted associations, overadjustment, collider bias, multicollinearity and responsible model choice."
          sideTitle="Adjustment changes the comparison being made."
          facts={[
            "Y = β₀ + β₁X₁ + β₂X₂ + ... + ε",
            "Coefficients are adjusted associations",
            "Confounding can distort crude slopes",
            "Adjustment is not always correct",
            "Prediction and explanation differ",
            "Model choice requires assumptions",
          ]}
        />

        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "Learning Route" && (
          <LearningRoute
            items={learningRoute}
            checklist={[
              "Write the multiple regression model.",
              "Interpret adjusted coefficients.",
              "Explain confounding.",
              "Compare crude and adjusted coefficients.",
              "Explain overadjustment.",
              "Recognise collider bias.",
              "Understand multicollinearity.",
              "Distinguish prediction from causal explanation.",
            ]}
          />
        )}

        {activeTab === "Lecture" && (
          <Lecture cards={lectureCards} />
        )}

        {activeTab === "Detailed Notes" && (
          <Notes notes={detailedNotes} />
        )}

        {activeTab === "Adjustment Lab" && (
          <section className="mt-8 overflow-hidden rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="p-6 md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Interactive adjustment lab
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Watch crude and adjusted slopes separate.
                </h2>
                <p className="mt-4 text-base leading-8 text-[#525252]">
                  The crude slope estimates the relationship between X and Y
                  without accounting for C. The adjusted slope compares X at
                  similar values of C.
                </p>

                <div className="mt-6 grid gap-5">
                  <Slider label="Confounding strength" value={confoundingStrength} min={0} max={100} suffix="%" onChange={setConfoundingStrength} />
                  <Slider label="True X effect" value={trueEffect} min={-10} max={10} onChange={setTrueEffect} />
                  <Slider label="Covariate C effect" value={covariateEffect} min={-10} max={12} onChange={setCovariateEffect} />
                  <Slider label="Noise" value={noise} min={2} max={35} onChange={setNoise} />
                </div>
              </div>

              <div className="border-t border-[#E4DED2] bg-[#11100E] p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                  Crude versus adjusted
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Crude: {crude.toFixed(2)}
                </h2>

                <div className="mt-8 rounded-[2rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5">
                  <ConfoundingPlot data={data} />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <DarkMetric label="Crude slope" value={crude.toFixed(2)} />
                  <DarkMetric label="Adjusted slope" value={adjusted.toFixed(2)} />
                  <DarkMetric label="True X effect" value={trueEffect.toFixed(2)} />
                  <DarkMetric label="Covariate effect" value={covariateEffect.toFixed(2)} />
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "Confounding Map" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Confounding map
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                A confounder is connected to both exposure and outcome.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#525252]">
                The goal of adjustment is to compare exposed and unexposed
                observations that are similar with respect to the confounder.
              </p>

              <div className="mt-6 rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
                <DAGVisual />
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Adjustment decisions
              </p>
              <div className="mt-6 grid gap-4">
                {[
                  ["Confounder", "Usually adjust if it is a common cause or strong pre-exposure predictor."],
                  ["Mediator", "Do not adjust when estimating the total effect."],
                  ["Collider", "Avoid adjustment because it can create bias."],
                  ["Pure predictor", "May help prediction but may not be needed for causal explanation."],
                ].map(([title, body]) => (
                  <InfoBlock key={title} title={title} body={body} dark />
                ))}
              </div>
            </section>
          </section>
        )}

        {activeTab === "Coefficient Studio" && (
          <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
              Coefficient interpretation studio
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              The same coefficient can answer different questions depending on the model.
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Crude model",
                  body:
                    "Y is modelled with X only. The coefficient is unadjusted.",
                },
                {
                  title: "Adjusted model",
                  body:
                    "Y is modelled with X and C. The X coefficient holds C constant.",
                },
                {
                  title: "Prediction model",
                  body:
                    "Variables are chosen to predict Y accurately.",
                },
                {
                  title: "Causal model",
                  body:
                    "Variables are chosen to estimate a target causal relationship.",
                },
              ].map((item) => (
                <article key={item.title} className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
                  <h3 className="text-xl font-black tracking-[-0.035em]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#525252]">{item.body}</p>
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
            title="Multiple regression is powerful because it changes the comparison."
            cards={[
              ["What is adjusted?", "The coefficient compares X values at the same values of included covariates."],
              ["Why adjust?", "To reduce confounding or improve prediction depending on the goal."],
              ["When not to adjust?", "Avoid inappropriate mediators, colliders or variables that change the target question."],
              ["What should be reported?", "The model goal, variables included, assumptions and interpretation limits."],
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
    <section className="mt-8 overflow-hidden rounded-[2.5rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-6 md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">{eyebrow}</p>
          <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-7xl">{title}</h1>
          <p className="mt-6 max-w-4xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">{body}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["170 minutes", "No coding", "Adjustment", "Confounding"].map((item) => (
              <div key={item} className="rounded-[1.25rem] border border-[#E4DED2] bg-[#F7F3EA] p-4 text-sm font-black text-[#525252]">
                {item}
              </div>
            ))}
          </div>
        </div>

        <aside className="border-t border-[#E4DED2] bg-[#11100E] p-6 text-white md:p-10 lg:border-l lg:border-t-0">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">Central idea</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">{sideTitle}</h2>
          <div className="mt-8 grid gap-3">
            {facts.map((item) => (
              <div key={item} className="rounded-[1.25rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-4 text-sm font-black text-white/80">
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
      <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">Lesson route</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
          Move from one predictor to adjusted comparisons.
        </h2>
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
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
          Students should know what adjustment means.
        </h2>
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

function Lecture({ cards }: { cards: { title: string; body: string; example: string }[] }) {
  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">Concept lecture</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
          Multiple regression changes the comparison, not just the equation.
        </h2>
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
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">Mr. R explains confounding.</h2>
        <div className="mt-6 grid gap-4">
          <Dialogue speaker="Mr. R" text="Simple regression compares people who may differ in many other ways." />
          <Dialogue speaker="Amelia" text="So a slope may mix the effect of X with other variables?" />
          <Dialogue speaker="Mr. R" text="Exactly. That is the idea behind confounding." />
          <Dialogue speaker="Ben" text="Multiple regression fixes it?" />
          <Dialogue speaker="Mr. R" text="It can reduce confounding if the right variables are measured and included correctly." />
          <Dialogue speaker="Chloe" text="So should we adjust for everything?" />
          <Dialogue speaker="Mr. R" text="No. Adjusting for mediators or colliders can create new problems." />
          <Dialogue speaker="Daniel" text="Then model choice is partly scientific judgement?" />
          <Dialogue speaker="Mr. R" text="Yes. Regression is mathematics guided by design and assumptions." />
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
      <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">Detailed theoretical notes</p>
        <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
          Adjustment is meaningful only when the modelling goal is clear.
        </h2>
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
      <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">Worked examples</p>
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
      <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">Practice studio</p>
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

function Reflection({ title, cards }: { title: string; cards: [string, string][] }) {
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
      <p className={`text-xs font-black uppercase tracking-[0.18em] ${dark ? "text-white/45" : warning ? "text-[#741018]" : "text-[#7a7063]"}`}>
        {title}
      </p>
      <p className={`mt-3 text-sm font-bold leading-7 ${dark ? "text-white/75" : ""}`}>{body}</p>
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

function ConfoundingPlot({
  data,
}: {
  data: { x: number; c: number; y: number }[];
}) {
  const minY = Math.min(...data.map((d) => d.y)) - 10;
  const maxY = Math.max(...data.map((d) => d.y)) + 10;
  const sx = (x: number) => 45 + (x / 10) * 430;
  const sy = (y: number) => 220 - ((y - minY) / (maxY - minY || 1)) * 170;

  return (
    <svg viewBox="0 0 520 260" className="h-auto w-full">
      <rect x="25" y="25" width="470" height="210" rx="22" fill="#ffffff" opacity="0.08" />
      <line x1="45" x2="475" y1="220" y2="220" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="3" />
      <line x1="45" x2="45" y1="50" y2="220" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="3" />
      {data.map((point, index) => (
        <circle
          key={index}
          cx={sx(point.x)}
          cy={sy(point.y)}
          r="4"
          fill={point.c > 0 ? "#ffffff" : "#741018"}
          opacity="0.85"
        />
      ))}
      <text x="45" y="245" fontSize="14" fontWeight="900" fill="#ffffff">X exposure</text>
      <text x="320" y="245" fontSize="14" fontWeight="900" fill="#ffffff">white/red = covariate groups</text>
    </svg>
  );
}

function DAGVisual() {
  return (
    <svg viewBox="0 0 760 420" className="h-auto w-full">
      <rect x="50" y="55" width="660" height="295" rx="34" fill="#ffffff" stroke="#d4d4d4" strokeWidth="2" />

      <Node x={360} y={95} label="C" subtitle="confounder" />
      <Node x={170} y={245} label="X" subtitle="exposure" />
      <Node x={550} y={245} label="Y" subtitle="outcome" />

      <Arrow x1={340} y1={125} x2={205} y2={220} />
      <Arrow x1={395} y1={125} x2={515} y2={220} />
      <Arrow x1={215} y1={245} x2={500} y2={245} />

      <text x="120" y="375" fontSize="18" fontWeight="900" fill="#525252">
        C is related to X and Y, so the crude X-Y association can be distorted.
      </text>
    </svg>
  );
}

function Node({ x, y, label, subtitle }: { x: number; y: number; label: string; subtitle: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="48" fill="#141210" />
      <text x={x - 11} y={y + 5} fontSize="28" fontWeight="900" fill="#ffffff">{label}</text>
      <text x={x - 42} y={y + 75} fontSize="15" fontWeight="900" fill="#525252">{subtitle}</text>
    </g>
  );
}

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#741018" strokeWidth="5" strokeLinecap="round" />
  );
}

function makeConfoundingData(
  confoundingStrength: number,
  trueEffect: number,
  covariateEffect: number,
  noise: number,
) {
  return Array.from({ length: 70 }).map((_, index) => {
    const c = index < 35 ? -1 : 1;
    const xBase = c > 0 ? 6 : 3;
    const x = xBase + (confoundingStrength / 100) * c * 1.5 + normalRandom(index + 3) * 1.1;
    const y = 45 + trueEffect * x + covariateEffect * c + normalRandom(index + 88) * noise;
    return {
      x: Math.max(0, Math.min(10, x)),
      c,
      y,
    };
  });
}

function simpleSlope(data: { x: number; y: number }[]) {
  const mx = mean(data.map((d) => d.x));
  const my = mean(data.map((d) => d.y));
  const numerator = data.reduce((sum, d) => sum + (d.x - mx) * (d.y - my), 0);
  const denominator = data.reduce((sum, d) => sum + (d.x - mx) ** 2, 0);
  return denominator === 0 ? 0 : numerator / denominator;
}

function adjustedSlope(data: { x: number; c: number; y: number }[]) {
  const xResiduals = residualiseOnC(data.map((d) => ({ value: d.x, c: d.c })));
  const yResiduals = residualiseOnC(data.map((d) => ({ value: d.y, c: d.c })));
  return simpleSlope(xResiduals.map((x, index) => ({ x, y: yResiduals[index] })));
}

function residualiseOnC(data: { value: number; c: number }[]) {
  const groupNeg = data.filter((d) => d.c < 0).map((d) => d.value);
  const groupPos = data.filter((d) => d.c > 0).map((d) => d.value);
  const meanNeg = mean(groupNeg);
  const meanPos = mean(groupPos);

  return data.map((d) => d.value - (d.c > 0 ? meanPos : meanNeg));
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
