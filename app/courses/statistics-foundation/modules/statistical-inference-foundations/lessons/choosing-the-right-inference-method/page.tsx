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
  "Method Selector",
  "Design Lab",
  "Decision Tree",
  "Worked Examples",
  "Practice Studio",
  "Reflection",
  "Quiz",
];

const learningRoute = [
  {
    time: "0–15 min",
    title: "Start from the research question",
    body:
      "Learn why inference method choice begins with what the study is trying to estimate, compare, test or model.",
  },
  {
    time: "15–35 min",
    title: "Identify the outcome type",
    body:
      "Separate numerical, binary, categorical, ordinal and time-to-event outcomes before choosing any method.",
  },
  {
    time: "35–55 min",
    title: "Identify the comparison structure",
    body:
      "Distinguish one-sample, two independent groups, paired measurements, several groups and association questions.",
  },
  {
    time: "55–80 min",
    title: "Check the design",
    body:
      "Use what Lesson 4.5 taught about study design: independence, pairing, clustering, repeated measurement and allocation matter.",
  },
  {
    time: "80–110 min",
    title: "Match assumptions to methods",
    body:
      "Connect normality, sample size, expected counts, variance, linearity and independence to responsible method choice.",
  },
  {
    time: "110–145 min",
    title: "Choose, justify and interpret",
    body:
      "Practise writing a clear method justification rather than simply naming a test.",
  },
];

const lectureCards = [
  {
    title: "Method choice is a reasoning process",
    body:
      "Mr. R tells the class that statistical methods should not be chosen by memorising a test-name table. A method is chosen by understanding the question, the data structure and the assumptions.",
    example:
      "Instead of asking, ‘Should I use a t-test?’, ask, ‘What is my outcome, how many groups are there, are observations paired, and what parameter am I estimating?’",
  },
  {
    title: "The outcome variable leads the first decision",
    body:
      "Amelia notices that numerical outcomes, binary outcomes and categorical outcomes require different summaries and different inference methods.",
    example:
      "Blood pressure is numerical, recovery yes/no is binary, disease stage is ordinal or categorical, and survival time is time-to-event.",
  },
  {
    title: "Groups and pairing change the method",
    body:
      "Ben compares two scenarios: two different groups of patients and the same patients measured before and after treatment. Mr. R explains that these are not the same design.",
    example:
      "A before-after blood pressure study is paired; a treatment-versus-control comparison with different patients is independent.",
  },
  {
    title: "Association is not always a group comparison",
    body:
      "Chloe asks what happens when the question is about a relationship rather than a difference. Mr. R explains that correlation and regression answer relationship questions.",
    example:
      "The question ‘Does age relate to systolic blood pressure?’ is different from ‘Do two treatment groups have different mean blood pressure?’",
  },
  {
    title: "Assumptions protect interpretation",
    body:
      "Daniel points out that a method can be mathematically available but still inappropriate if assumptions are badly violated.",
    example:
      "A chi-square test can be unreliable when expected counts are too small; a simple linear regression can mislead if the relationship is strongly curved.",
  },
  {
    title: "The final answer should be justified",
    body:
      "Mr. R ends by saying that a good analyst writes both the method and the reason for the method.",
    example:
      "‘Because the outcome is continuous, the groups are independent and the question concerns a mean difference, a two-sample mean comparison is appropriate.’",
  },
];

const detailedNotes = [
  {
    title: "1. Inference method choice starts with the estimand",
    formula: "Research question → estimand → method",
    body:
      "An estimand is the quantity the study aims to learn about. Before choosing a method, identify whether the target is a mean, difference in means, proportion, difference in proportions, odds ratio, correlation, regression coefficient, risk ratio or another parameter.",
    derivation:
      "The method is appropriate only if its inferential target matches the research target. A confidence interval for a mean cannot answer a question about a proportion; a correlation cannot by itself estimate an adjusted treatment effect.",
    example:
      "If the question is ‘What is the average systolic blood pressure in this population?’, the estimand is a population mean. If the question is ‘Is recovery more common with treatment than control?’, the estimand may be a difference in proportions, risk ratio or odds ratio.",
    warning:
      "Do not begin with software menus or test names. Begin with the scientific quantity you want to estimate or compare.",
  },
  {
    title: "2. Outcome type is the first practical filter",
    formula: "Outcome type ∈ {numerical, binary, categorical, ordinal, count, time-to-event}",
    body:
      "The outcome variable determines which summaries and methods are sensible. Numerical outcomes can often be summarised using means or medians. Binary outcomes are summarised using proportions or risks. Categorical outcomes require frequency tables. Time-to-event outcomes require methods that handle censoring.",
    derivation:
      "Inference methods are built around probability models or sampling distributions. A mean-based method assumes the outcome can meaningfully be averaged; a proportion-based method assumes a binary event count; contingency-table methods assume counts across categories.",
    example:
      "Pain score, blood pressure and cholesterol are numerical. Infection yes/no is binary. Blood group is categorical. Time until relapse is time-to-event.",
    warning:
      "A common mistake is treating every outcome as if it were continuous. The method should respect the measurement scale.",
  },
  {
    title: "3. One-sample inference",
    formula: "One sample: estimate one population parameter or compare it to a reference",
    body:
      "One-sample questions involve a single group or population. The aim might be to estimate one mean, estimate one proportion or test whether a parameter differs from a reference value.",
    derivation:
      "For a numerical mean, the standard error is usually SE = s/√n. For a proportion, the approximate standard error is SE = √[p̂(1 − p̂)/n]. These standard errors connect directly to confidence intervals and hypothesis tests.",
    example:
      "Estimate the mean birth weight in a clinic population. Estimate the proportion of patients who experience a side effect. Test whether mean haemoglobin differs from a clinical reference value.",
    warning:
      "A one-sample method is not appropriate when the question compares two separate groups or paired measurements.",
  },
  {
    title: "4. Two independent groups",
    formula: "Independent groups: compare parameter in group 1 with parameter in group 2",
    body:
      "Two independent groups contain different individuals in each group. The usual target is a difference in means, difference in proportions, risk ratio or odds ratio.",
    derivation:
      "For independent mean comparisons, uncertainty combines variability from both groups. A common standard error form is SE(ȳ₁ − ȳ₂) = √(s₁²/n₁ + s₂²/n₂). The groups contribute separately because they are independent.",
    example:
      "Compare mean cholesterol between treatment and control groups. Compare recovery proportions between two independent treatment arms.",
    warning:
      "Independent-group methods should not be used for before-after measurements on the same person, matched pairs or repeated observations.",
  },
  {
    title: "5. Paired or matched data",
    formula: "Paired data: analyse differences dᵢ = afterᵢ − beforeᵢ",
    body:
      "Paired data arise when observations are linked: before-after measurements, matched case-control pairs, twin studies or repeated measurements on the same person. The unit of analysis is often the within-pair difference.",
    derivation:
      "For a paired mean comparison, define dᵢ for each pair. Then perform inference on the mean difference μd. This removes between-person variation and focuses on the change or pair contrast.",
    example:
      "Measure blood pressure before and after a lifestyle intervention in the same 60 participants.",
    warning:
      "Ignoring pairing usually gives the wrong standard error because paired observations are not independent.",
  },
  {
    title: "6. More than two groups",
    formula: "Several groups: compare variation between groups with variation within groups",
    body:
      "When a numerical outcome is compared across more than two independent groups, analysis of variance logic may be appropriate. If the outcome is categorical, contingency-table methods may be more appropriate.",
    derivation:
      "The central idea is to compare how much group means differ from each other against how much individuals vary within groups. If between-group variation is large relative to within-group variation, there is evidence of group differences.",
    example:
      "Compare mean blood pressure across three diet groups. Compare disease stage distribution across four regions.",
    warning:
      "Multiple pairwise tests without adjustment can inflate the chance of false positives.",
  },
  {
    title: "7. Categorical outcomes and contingency tables",
    formula: "Observed counts are compared with expected counts under independence",
    body:
      "For categorical outcomes, inference often uses counts arranged in a table. The question may be whether two categorical variables are associated, or whether proportions differ between groups.",
    derivation:
      "Under independence, expected count in a cell is often calculated as (row total × column total) / grand total. The observed counts are compared with these expected counts.",
    example:
      "Compare whether smoking status is associated with disease status in a 2 × 2 table.",
    warning:
      "Very small expected counts can make large-sample chi-square approximations unreliable.",
  },
  {
    title: "8. Association between numerical variables",
    formula: "Correlation describes strength; regression models expected change",
    body:
      "When both variables are numerical, the question may concern association. Correlation summarises direction and strength of a linear relationship. Regression can model an outcome as a function of one or more predictors.",
    derivation:
      "Correlation is scale-free and symmetric. Regression is directional: it treats one variable as the outcome and estimates expected change in that outcome for a change in predictor.",
    example:
      "Correlation can describe the relationship between age and blood pressure. Regression can estimate how much mean blood pressure changes per 10-year increase in age.",
    warning:
      "Correlation is not causation, and regression coefficients require careful interpretation, especially with confounding.",
  },
  {
    title: "9. Assumptions and robustness",
    formula: "Method validity depends on design + distribution + sample size + measurement quality",
    body:
      "A method is not chosen only by variable type. Assumptions matter. Independence, approximate normality of estimators, adequate expected counts, linearity, homoscedasticity and absence of extreme influential observations can affect validity.",
    derivation:
      "Many inference methods rely on sampling distributions. If assumptions are badly violated, standard errors, confidence intervals and p-values may not behave as advertised.",
    example:
      "A two-sample mean comparison may be fairly robust with large balanced samples, but not with tiny samples, strong skewness and extreme outliers.",
    warning:
      "A method can produce a number even when its interpretation is weak.",
  },
  {
    title: "10. Reporting the method choice",
    formula: "Method choice = outcome + comparison + design + assumptions + estimand",
    body:
      "A complete justification states why the method matches the question. This is more professional than simply naming a test.",
    derivation:
      "Good reporting links the research question to the statistical target, explains the data structure and briefly states assumption checks or design considerations.",
    example:
      "Because the outcome is continuous, the two groups are independent and the target is a mean difference, a two-sample mean comparison with a confidence interval for μ₁ − μ₂ is appropriate.",
    warning:
      "If you cannot justify the method in a sentence, the method choice may not be understood well enough.",
  },
];

const methodOptions = [
  {
    label: "One numerical mean",
    outcome: "Numerical",
    structure: "One group",
    method: "One-sample mean confidence interval or one-sample mean test",
    reason:
      "Use when the target is a single population mean or comparison with a known reference value.",
  },
  {
    label: "Two independent numerical groups",
    outcome: "Numerical",
    structure: "Two independent groups",
    method: "Two-sample mean comparison",
    reason:
      "Use when different individuals belong to two groups and the target is a difference in means.",
  },
  {
    label: "Paired numerical measurements",
    outcome: "Numerical",
    structure: "Paired or repeated",
    method: "Paired mean comparison using within-pair differences",
    reason:
      "Use when each person or matched unit contributes two linked measurements.",
  },
  {
    label: "One binary proportion",
    outcome: "Binary",
    structure: "One group",
    method: "One-proportion confidence interval or one-proportion test",
    reason:
      "Use when estimating or testing one population proportion.",
  },
  {
    label: "Two independent binary groups",
    outcome: "Binary",
    structure: "Two independent groups",
    method: "Two-proportion comparison, risk ratio, odds ratio or logistic regression",
    reason:
      "Use when comparing event probabilities between two independent groups.",
  },
  {
    label: "Two categorical variables",
    outcome: "Categorical",
    structure: "Contingency table",
    method: "Chi-square association test or exact method when counts are small",
    reason:
      "Use when studying whether row and column classifications are associated.",
  },
  {
    label: "Numerical association",
    outcome: "Numerical relationship",
    structure: "Two numerical variables",
    method: "Correlation or simple linear regression",
    reason:
      "Use correlation for strength and direction; use regression when one variable is an outcome.",
  },
  {
    label: "Adjusted analysis",
    outcome: "Any modelled outcome",
    structure: "Multiple predictors",
    method: "Regression model suited to the outcome type",
    reason:
      "Use when adjustment, confounding control, prediction or multiple explanatory variables are required.",
  },
];

const workedExamples = [
  {
    title: "Before-and-after blood pressure",
    question:
      "A study measures blood pressure before and after a new diet in the same 80 people. Which inference method is appropriate?",
    working:
      "The outcome is numerical. The measurements are paired because each person appears twice. The target is the mean within-person change.",
    answer:
      "Use a paired mean comparison based on differences dᵢ = afterᵢ − beforeᵢ.",
    interpretation:
      "The paired structure must be respected because measurements from the same person are related.",
  },
  {
    title: "Recovery in two treatment groups",
    question:
      "A randomised trial compares recovery yes/no between treatment and control groups. Which method should be considered?",
    working:
      "The outcome is binary. The groups are independent. The target is a difference or ratio of recovery probabilities.",
    answer:
      "Use a two-proportion comparison, risk ratio, odds ratio or logistic regression depending on the reporting aim.",
    interpretation:
      "The analysis should focus on proportions or odds, not means.",
  },
  {
    title: "Disease status and smoking category",
    question:
      "A table records disease status and smoking category. The question is whether the two categorical variables are associated.",
    working:
      "Both variables are categorical. The data can be arranged in a contingency table. Expected counts should be checked.",
    answer:
      "Use a chi-square association approach when expected counts are adequate; consider an exact method if counts are small.",
    interpretation:
      "The method compares observed table counts with counts expected under independence.",
  },
  {
    title: "Age and systolic blood pressure",
    question:
      "Researchers ask whether systolic blood pressure tends to increase with age.",
    working:
      "Both variables are numerical, but blood pressure is naturally the outcome and age is the predictor.",
    answer:
      "Use simple linear regression if the aim is to estimate mean change in blood pressure with age; correlation may describe strength of linear association.",
    interpretation:
      "Regression gives a directional interpretation; correlation only describes association.",
  },
];

const practiceQuestions = [
  {
    prompt:
      "A study compares mean cholesterol between two independent treatment groups. What is the most relevant structure?",
    options: [
      "One binary proportion",
      "Two independent numerical groups",
      "Paired numerical data",
      "Two categorical variables",
    ],
    answer: 1,
    explanation:
      "The outcome is numerical and the two groups contain different individuals, so this is a two independent numerical groups problem.",
  },
  {
    prompt:
      "A patient’s pain score is measured before and after treatment. Why is this not an independent two-group comparison?",
    options: [
      "The outcome is categorical",
      "The same person contributes both measurements",
      "There are more than two groups",
      "The sample size is always too small",
    ],
    answer: 1,
    explanation:
      "The before and after measurements are linked within the same person, so the paired structure should be used.",
  },
  {
    prompt:
      "Which method family is most suitable when the outcome is binary and several predictors must be adjusted for?",
    options: [
      "Simple correlation",
      "Logistic regression",
      "One-sample mean test",
      "Paired mean comparison",
    ],
    answer: 1,
    explanation:
      "A binary outcome with multiple predictors is commonly handled using logistic regression.",
  },
];

const quizQuestions = [
  {
    question:
      "The first step in choosing an inference method is identifying the research question and outcome type.",
    options: ["True", "False"],
    answer: 0,
  },
  {
    question:
      "Paired measurements can always be analysed as if they were two independent groups.",
    options: ["True", "False"],
    answer: 1,
  },
  {
    question:
      "For categorical table data, expected counts are relevant to method choice.",
    options: ["True", "False"],
    answer: 0,
  },
  {
    question:
      "Regression can be useful when adjustment for multiple variables is needed.",
    options: ["True", "False"],
    answer: 0,
  },
];

export default function ChoosingInferenceMethodLesson() {
  const lessonCode = "4.6";

  if (!isStatisticsFoundationLessonOpen(lessonCode)) {
    return (
      <LockedLessonGate
        lessonCode={lessonCode}
        lessonTitle="Choosing the right inference method"
        moduleTitle="Module 4: Statistical Inference Foundations"
      />
    );
  }

  const [activeTab, setActiveTab] = useState("Learning Route");

  const [outcomeType, setOutcomeType] = useState("Numerical");
  const [structure, setStructure] = useState("Two independent groups");
  const [sampleSize, setSampleSize] = useState(80);
  const [expectedCount, setExpectedCount] = useState(8);
  const [skewness, setSkewness] = useState(20);
  const [paired, setPaired] = useState(20);

  const [selectedMethod, setSelectedMethod] = useState(1);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedPractice, setSelectedPractice] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(
    {},
  );

  const recommendation = useMemo(() => {
    if (outcomeType === "Numerical" && structure === "One group") {
      return {
        method: "One-sample mean confidence interval or test",
        reason:
          "The outcome is numerical and there is one group or one population parameter.",
      };
    }

    if (outcomeType === "Numerical" && structure === "Two independent groups") {
      return {
        method: "Two-sample mean comparison",
        reason:
          "The outcome is numerical and the two groups contain different individuals.",
      };
    }

    if (outcomeType === "Numerical" && structure === "Paired or repeated") {
      return {
        method: "Paired mean comparison",
        reason:
          "The same units are measured more than once, so within-unit differences matter.",
      };
    }

    if (outcomeType === "Binary" && structure === "One group") {
      return {
        method: "One-proportion interval or test",
        reason:
          "The outcome is yes/no and the target is one population proportion.",
      };
    }

    if (outcomeType === "Binary" && structure === "Two independent groups") {
      return {
        method: "Two-proportion comparison or logistic regression",
        reason:
          "The outcome is binary and event probabilities are compared across groups.",
      };
    }

    if (outcomeType === "Categorical" || structure === "Contingency table") {
      return {
        method: "Contingency-table method",
        reason:
          "Categorical variables are summarised by counts and compared with table-based logic.",
      };
    }

    if (structure === "Multiple predictors") {
      return {
        method: "Regression model matched to outcome type",
        reason:
          "Multiple predictors require a model-based approach, especially when adjustment is needed.",
      };
    }

    return {
      method: "Clarify the question before choosing a method",
      reason:
        "The outcome type and design structure do not yet point to one clear method.",
    };
  }, [outcomeType, structure]);

  const designAssessment = useMemo(() => {
    const notes = [];

    if (sampleSize < 30) {
      notes.push("Small samples require careful assumption checks.");
    } else {
      notes.push(
        "The sample size gives more support for large-sample approximation, but design still matters.",
      );
    }

    if (expectedCount < 5) {
      notes.push(
        "Expected counts below 5 can make chi-square approximations unreliable.",
      );
    } else {
      notes.push(
        "Expected counts look more comfortable for table-based large-sample methods.",
      );
    }

    if (skewness > 70) {
      notes.push(
        "Strong skewness or extreme outliers may weaken mean-based inference.",
      );
    } else {
      notes.push("Severe skewness is not dominant in this setting.");
    }

    if (paired > 70) {
      notes.push(
        "The design looks strongly paired or repeated; avoid independent-group methods.",
      );
    } else {
      notes.push(
        "Pairing is not dominant, but always verify how the data were collected.",
      );
    }

    return notes;
  }, [sampleSize, expectedCount, skewness, paired]);

  const activeMethod = methodOptions[selectedMethod];
  const activeExample = workedExamples[selectedExample];
  const activePractice = practiceQuestions[selectedPractice];

  const score = quizQuestions.reduce((total, question, index) => {
    return selectedAnswers[index] === question.answer ? total + 1 : total;
  }, 0);

  return (
    <main className="min-h-screen bg-[#F7F3EA] px-5 py-8 text-[#141210] md:px-8 md:py-14">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath(
            "/courses/statistics-foundation/modules/statistical-inference-foundations",
          )}
          className="text-sm font-black text-[#741018] hover:text-[#4d080e]"
        >
          ← Back to module
        </a>

        <section className="mt-8 overflow-hidden rounded-[2.5rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 md:p-10">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Statistics Foundation · Lesson 4.6
              </p>

              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-7xl">
                Choosing the right inference method.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">
                Lesson 4.5 explained sample size and study design. This final
                inference lesson turns that design thinking into method choice.
                Students learn to identify the outcome, comparison structure,
                pairing, assumptions and estimand before choosing a statistical
                method.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "145 minutes",
                  "No coding",
                  "Method choice",
                  "Research design",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-[#E4DED2] bg-[#F7F3EA] p-4 text-sm font-black text-[#525252]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <aside className="border-t border-[#E4DED2] bg-[#11100E] p-6 text-white md:p-10 lg:border-l lg:border-t-0">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Central idea
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Do not choose a test. Choose a method that answers the question.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Research question",
                  "Outcome type",
                  "Comparison structure",
                  "Study design",
                  "Assumptions",
                  "Interpretation",
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
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Lesson route
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Move from study design to method choice.
              </h2>

              <p className="mt-5 text-base leading-8 text-[#525252]">
                This lesson is the bridge between inference concepts and applied
                statistical judgement. A good method choice can be explained in
                words before it is calculated.
              </p>
            </section>

            <section className="grid gap-3">
              {learningRoute.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm"
                >
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
                    {item.time}
                  </p>
                  <h3 className="mt-2 text-xl font-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#525252]">
                    {item.body}
                  </p>
                </article>
              ))}
            </section>
          </section>
        )}

        {activeTab === "Lecture" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Lecture story
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                Mr. R chooses the method only after understanding the study.
              </h2>

              <div className="mt-6 space-y-4">
                <Dialogue
                  speaker="Mr. R"
                  text="Today we are not learning a new formula first. We are learning how to decide which formula, interval, test or model belongs to the question."
                />
                <Dialogue
                  speaker="Amelia"
                  text="So the method comes after the research question, not before it?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Exactly. First name the outcome. Then name the design. Then name the comparison. Then check assumptions."
                />
                <Dialogue
                  speaker="Ben"
                  text="If the same patients are measured before and after treatment, that is not the same as two separate groups."
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Good. That one sentence already prevents one of the most common method-choice mistakes."
                />
                <Dialogue
                  speaker="Chloe"
                  text="And if the outcome is recovery yes or no, we should not treat it like a numerical mean."
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Correct. Binary outcomes lead us toward proportions, risk, odds or logistic regression."
                />
                <Dialogue
                  speaker="Daniel"
                  text="So the best answer is not just a test name. It is a justification."
                />
                <Dialogue
                  speaker="Mr. R"
                  text="That is the goal. You should be able to defend the method in plain statistical language."
                />
              </div>
            </section>

            <section className="grid gap-5 md:grid-cols-2">
              {lectureCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm"
                >
                  <h2 className="text-2xl font-black tracking-[-0.035em]">
                    {card.title}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-[#525252]">
                    {card.body}
                  </p>
                  <p className="mt-5 rounded-[1.25rem] bg-[#F7F3EA] p-4 text-sm font-bold leading-7 text-[#3F3325]">
                    Example: {card.example}
                  </p>
                </article>
              ))}
            </section>
          </section>
        )}

        {activeTab === "Detailed Notes" && (
          <section className="mt-8 grid gap-5">
            {detailedNotes.map((note) => (
              <article
                key={note.title}
                className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8"
              >
                <h2 className="text-2xl font-black tracking-[-0.035em]">
                  {note.title}
                </h2>
                <p className="mt-4 rounded-[1.25rem] bg-[#11100E] p-4 font-mono text-sm font-black text-white">
                  {note.formula}
                </p>
                <p className="mt-5 text-base leading-8 text-[#525252]">
                  {note.body}
                </p>
                <p className="mt-4 text-base leading-8 text-[#525252]">
                  <strong>Reasoning:</strong> {note.derivation}
                </p>
                <p className="mt-4 text-base leading-8 text-[#525252]">
                  <strong>Example:</strong> {note.example}
                </p>
                <p className="mt-4 rounded-[1.25rem] bg-[#FFF7E8] p-4 text-sm font-bold leading-7 text-[#3F3325]">
                  Warning: {note.warning}
                </p>
              </article>
            ))}
          </section>
        )}

        {activeTab === "Method Selector" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <h2 className="text-3xl font-black tracking-[-0.045em]">
                Build a method recommendation.
              </h2>

              <div className="mt-6 grid gap-5">
                <label className="block">
                  <span className="text-sm font-black text-[#525252]">
                    Outcome type
                  </span>
                  <select
                    value={outcomeType}
                    onChange={(event) => setOutcomeType(event.target.value)}
                    className="mt-2 w-full rounded-[1rem] border border-[#E4DED2] bg-white px-4 py-3 text-sm font-bold"
                  >
                    <option>Numerical</option>
                    <option>Binary</option>
                    <option>Categorical</option>
                    <option>Numerical relationship</option>
                    <option>Any modelled outcome</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-black text-[#525252]">
                    Study/comparison structure
                  </span>
                  <select
                    value={structure}
                    onChange={(event) => setStructure(event.target.value)}
                    className="mt-2 w-full rounded-[1rem] border border-[#E4DED2] bg-white px-4 py-3 text-sm font-bold"
                  >
                    <option>One group</option>
                    <option>Two independent groups</option>
                    <option>Paired or repeated</option>
                    <option>Contingency table</option>
                    <option>Two numerical variables</option>
                    <option>Multiple predictors</option>
                  </select>
                </label>
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/45">
                Recommended direction
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.045em]">
                {recommendation.method}
              </h2>
              <p className="mt-6 text-base leading-8 text-white/75">
                {recommendation.reason}
              </p>

              <div className="mt-6 rounded-[1.5rem] bg-[#FFFCF6] p-5 text-[#141210]">
                <p className="text-sm font-black text-[#741018]">
                  How to write the justification
                </p>
                <p className="mt-3 text-sm font-bold leading-7 text-[#4F4A43]">
                  Because the outcome is {outcomeType.toLowerCase()} and the
                  design structure is {structure.toLowerCase()}, the method
                  should target the correct parameter while respecting the data
                  structure.
                </p>
              </div>
            </section>
          </section>
        )}

        {activeTab === "Design Lab" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <h2 className="text-3xl font-black tracking-[-0.045em]">
                Check design and assumption signals.
              </h2>

              <div className="mt-6 grid gap-5">
                <Slider
                  label="Sample size"
                  value={sampleSize}
                  min={10}
                  max={500}
                  suffix=" observations"
                  onChange={setSampleSize}
                />
                <Slider
                  label="Smallest expected table count"
                  value={expectedCount}
                  min={1}
                  max={30}
                  suffix=""
                  onChange={setExpectedCount}
                />
                <Slider
                  label="Skewness/outlier concern"
                  value={skewness}
                  min={0}
                  max={100}
                  suffix="%"
                  onChange={setSkewness}
                />
                <Slider
                  label="Pairing/repeated-measure signal"
                  value={paired}
                  min={0}
                  max={100}
                  suffix="%"
                  onChange={setPaired}
                />
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white shadow-sm md:p-8">
              <h2 className="text-3xl font-black tracking-[-0.045em]">
                Design interpretation
              </h2>

              <div className="mt-6 grid gap-3">
                {designAssessment.map((note) => (
                  <InfoBlock key={note} title="Design note" body={note} dark />
                ))}
              </div>
            </section>
          </section>
        )}

        {activeTab === "Decision Tree" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <h2 className="text-3xl font-black tracking-[-0.045em]">
                A practical decision path.
              </h2>

              <div className="mt-6 grid gap-4">
                <DecisionStep
                  number="1"
                  title="What is the outcome?"
                  body="Numerical, binary, categorical, ordinal, count or time-to-event?"
                />
                <DecisionStep
                  number="2"
                  title="What is the structure?"
                  body="One group, two independent groups, paired observations, several groups or association?"
                />
                <DecisionStep
                  number="3"
                  title="What is the estimand?"
                  body="Mean, proportion, difference, ratio, odds, correlation or regression coefficient?"
                />
                <DecisionStep
                  number="4"
                  title="What assumptions matter?"
                  body="Independence, normality, expected counts, linearity, equal variance, censoring or clustering?"
                />
                <DecisionStep
                  number="5"
                  title="Can you justify the method?"
                  body="Write one sentence that links the question, design and method."
                />
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white shadow-sm md:p-8">
              <h2 className="text-3xl font-black tracking-[-0.045em]">
                Method map
              </h2>

              <div className="mt-6 grid gap-3">
                {methodOptions.map((option, index) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => setSelectedMethod(index)}
                    className={`rounded-[1.25rem] border p-4 text-left transition ${
                      selectedMethod === index
                        ? "border-white bg-white text-[#141210]"
                        : "border-white/10 bg-white/[0.06] text-white/75 hover:bg-white/[0.12]"
                    }`}
                  >
                    <p className="text-sm font-black">{option.label}</p>
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-[1.5rem] bg-[#FFFCF6] p-5 text-[#141210]">
                <p className="text-sm font-black text-[#741018]">
                  {activeMethod.method}
                </p>
                <p className="mt-3 text-sm font-bold leading-7 text-[#4F4A43]">
                  {activeMethod.reason}
                </p>
              </div>
            </section>
          </section>
        )}

        {activeTab === "Worked Examples" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <aside className="grid gap-3">
              {workedExamples.map((example, index) => (
                <button
                  key={example.title}
                  type="button"
                  onClick={() => setSelectedExample(index)}
                  className={`rounded-[1.5rem] border p-5 text-left transition ${
                    selectedExample === index
                      ? "border-[#741018] bg-[#741018] text-white"
                      : "border-[#E4DED2] bg-[#FFFCF6] text-[#141210] hover:border-[#741018]"
                  }`}
                >
                  <p className="text-sm font-black">{example.title}</p>
                </button>
              ))}
            </aside>

            <article className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <h2 className="text-3xl font-black tracking-[-0.045em]">
                {activeExample.title}
              </h2>
              <p className="mt-5 text-base leading-8 text-[#525252]">
                <strong>Question:</strong> {activeExample.question}
              </p>
              <p className="mt-5 text-base leading-8 text-[#525252]">
                <strong>Working:</strong> {activeExample.working}
              </p>
              <p className="mt-5 rounded-[1.25rem] bg-[#F7F3EA] p-4 text-base font-black leading-8 text-[#3F3325]">
                {activeExample.answer}
              </p>
              <p className="mt-5 text-base leading-8 text-[#525252]">
                <strong>Interpretation:</strong> {activeExample.interpretation}
              </p>
            </article>
          </section>
        )}

        {activeTab === "Practice Studio" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <aside className="grid gap-3">
              {practiceQuestions.map((question, index) => (
                <button
                  key={question.prompt}
                  type="button"
                  onClick={() => setSelectedPractice(index)}
                  className={`rounded-[1.5rem] border p-5 text-left transition ${
                    selectedPractice === index
                      ? "border-[#741018] bg-[#741018] text-white"
                      : "border-[#E4DED2] bg-[#FFFCF6] text-[#141210] hover:border-[#741018]"
                  }`}
                >
                  <p className="text-sm font-black">Practice {index + 1}</p>
                </button>
              ))}
            </aside>

            <article className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <h2 className="text-3xl font-black tracking-[-0.045em]">
                Practice question
              </h2>
              <p className="mt-5 text-base leading-8 text-[#525252]">
                {activePractice.prompt}
              </p>

              <div className="mt-6 grid gap-3">
                {activePractice.options.map((option, index) => (
                  <div
                    key={option}
                    className={`rounded-[1.25rem] border p-4 text-sm font-bold ${
                      index === activePractice.answer
                        ? "border-[#741018] bg-[#FFF7E8] text-[#741018]"
                        : "border-[#E4DED2] bg-white text-[#525252]"
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>

              <p className="mt-6 rounded-[1.25rem] bg-[#F7F3EA] p-4 text-sm font-bold leading-7 text-[#3F3325]">
                Explanation: {activePractice.explanation}
              </p>
            </article>
          </section>
        )}

        {activeTab === "Reflection" && (
          <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
            <h2 className="text-3xl font-black tracking-[-0.045em]">
              Reflection prompts
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "What is the outcome variable, and what type of variable is it?",
                "Are the observations independent, paired, clustered or repeated?",
                "What parameter or estimand is the study trying to learn about?",
                "Which assumption would most affect the trustworthiness of the method?",
                "Can you justify the method without naming software?",
                "Would regression be more appropriate than a simple group comparison?",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.5rem] border border-[#E4DED2] bg-white p-5 text-base font-bold leading-8 text-[#4F4A43]"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Quiz" && (
          <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Quiz
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                  Check your method-choice reasoning.
                </h2>
              </div>

              <div className="rounded-full bg-[#11100E] px-5 py-3 text-sm font-black text-white">
                Score: {score}/{quizQuestions.length}
              </div>
            </div>

            <div className="mt-8 grid gap-5">
              {quizQuestions.map((question, qIndex) => (
                <article
                  key={question.question}
                  className="rounded-[1.5rem] border border-[#E4DED2] bg-white p-5"
                >
                  <h3 className="text-lg font-black">{question.question}</h3>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {question.options.map((option, optionIndex) => {
                      const selected = selectedAnswers[qIndex] === optionIndex;
                      const correct = question.answer === optionIndex;

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            setSelectedAnswers((current) => ({
                              ...current,
                              [qIndex]: optionIndex,
                            }))
                          }
                          className={`rounded-[1.25rem] border p-4 text-left text-sm font-black transition ${
                            selected && correct
                              ? "border-green-700 bg-green-50 text-green-800"
                              : selected && !correct
                                ? "border-[#741018] bg-[#FFF0F0] text-[#741018]"
                                : "border-[#E4DED2] bg-[#FFFCF6] text-[#525252] hover:border-[#741018]"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

function Dialogue({ speaker, text }: { speaker: string; text: string }) {
  return (
    <div className="rounded-[1.5rem] border border-[#E4DED2] bg-white p-5">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
        {speaker}
      </p>
      <p className="mt-3 text-sm font-bold leading-7 text-[#4F4A43]">
        {text}
      </p>
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
      <span className="flex justify-between text-sm font-black text-[#525252]">
        <span>{label}</span>
        <span>
          {value}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
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
}: {
  title: string;
  body: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`rounded-[1.5rem] p-5 ${
        dark
          ? "bg-[#FFFCF6]/[0.07] text-white"
          : "border border-[#E4DED2] bg-[#F7F3EA] text-[#525252]"
      }`}
    >
      <p
        className={`text-xs font-black uppercase tracking-[0.18em] ${
          dark ? "text-white/45" : "text-[#7a7063]"
        }`}
      >
        {title}
      </p>
      <p
        className={`mt-3 text-sm font-bold leading-7 ${
          dark ? "text-white/75" : ""
        }`}
      >
        {body}
      </p>
    </div>
  );
}

function DecisionStep({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-[#E4DED2] bg-white p-5">
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#741018] text-sm font-black text-white">
          {number}
        </div>
        <div>
          <h3 className="text-lg font-black text-[#141210]">{title}</h3>
          <p className="mt-2 text-sm font-bold leading-7 text-[#525252]">
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}
