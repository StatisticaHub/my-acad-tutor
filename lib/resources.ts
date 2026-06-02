export type ResourceBlock = {
  title: string;
  body: string;
  bullets?: string[];
};

export type ResourceGuide = {
  slug: string;
  area: string;
  level: string;
  title: string;
  summary: string;
  problem: ResourceBlock;
  intuition: ResourceBlock;
  method: ResourceBlock;
  working: ResourceBlock;
  limitations: ResourceBlock;
  discussion: ResourceBlock;
  checklist: string[];
  commonMistakes: string[];
  related: string[];
};

export const resourceGuides: ResourceGuide[] = [
  {
    slug: "how-to-choose-the-correct-statistical-test",
    area: "Statistics",
    level: "Foundation",
    title: "How to choose the correct statistical test",
    summary:
      "A practical guide for students deciding between t-tests, ANOVA, chi-square tests, correlation, regression and non-parametric methods.",

    problem: {
      title: "The problem",
      body:
        "Many students choose a statistical test by searching for a familiar method rather than starting from the research question. This leads to common mistakes such as using several t-tests instead of ANOVA, ignoring paired data, treating categorical variables as numerical, or reporting a p-value that does not answer the actual question.",
      bullets: [
        "The research question is unclear.",
        "The outcome variable is not identified.",
        "The explanatory variable is confused with the outcome.",
        "The number of groups is ignored.",
        "Paired or repeated measurements are treated as independent.",
      ],
    },

    intuition: {
      title: "The intuition",
      body:
        "Choosing a statistical test is like choosing the right tool for a specific question. A test is not chosen because it is popular. It is chosen because the structure of the data and the aim of the analysis match what the test is designed to answer.",
      bullets: [
        "If you compare two group means, think about a t-test.",
        "If you compare more than two group means, think about ANOVA.",
        "If you study association between categorical variables, think about chi-square.",
        "If you study association between numerical variables, think about correlation or regression.",
        "If the outcome is binary, think about proportions or logistic regression.",
      ],
    },

    method: {
      title: "The method",
      body:
        "A good decision process starts with the outcome variable, then the explanatory variable, then the study design. After that, assumptions and sample size should be checked before choosing the final method.",
      bullets: [
        "Step 1: Identify the outcome variable.",
        "Step 2: Decide whether the outcome is numerical, binary, categorical, ordinal or time-to-event.",
        "Step 3: Identify the explanatory variable or grouping variable.",
        "Step 4: Decide whether observations are independent, paired or repeated.",
        "Step 5: Check the number of groups.",
        "Step 6: Check assumptions and decide whether a parametric or non-parametric method is suitable.",
      ],
    },

    working: {
      title: "How it works in practice",
      body:
        "Suppose a student wants to compare exam scores between two independent teaching groups. The outcome is numerical and the group variable has two independent categories. An independent samples t-test may be appropriate if assumptions are reasonable. If the same students are measured before and after a teaching intervention, the observations are paired, so a paired t-test is more appropriate.",
      bullets: [
        "Numerical outcome + two independent groups: independent samples t-test.",
        "Numerical outcome + before/after data: paired t-test.",
        "Numerical outcome + three or more groups: one-way ANOVA.",
        "Categorical outcome + categorical exposure: chi-square test.",
        "Numerical outcome + numerical predictor: correlation or linear regression.",
        "Binary outcome + several predictors: logistic regression.",
      ],
    },

    limitations: {
      title: "Limitations",
      body:
        "A decision table can guide the choice of test, but it cannot replace statistical judgement. Real datasets may include missing values, outliers, non-normal distributions, repeated measurements, clustering, confounding or small sample sizes.",
      bullets: [
        "Assumptions still need to be checked.",
        "Small samples may make standard methods unreliable.",
        "Repeated measurements may require specialised methods.",
        "Confounding may require regression modelling rather than simple group comparison.",
        "A statistically correct test can still answer the wrong research question.",
      ],
    },

    discussion: {
      title: "Discussion",
      body:
        "The best way to choose a test is to write the research question in plain language before touching the software. Ask: what is the outcome, what is the comparison or predictor, what is the design, and what result would answer the question? This prevents the analysis from becoming software-driven.",
      bullets: [
        "Start with the question, not the software.",
        "Report effect sizes and confidence intervals, not only p-values.",
        "Explain why the chosen method matches the data structure.",
        "Mention assumptions and limitations clearly.",
      ],
    },

    checklist: [
      "Have you identified the outcome variable?",
      "Have you identified the explanatory variable?",
      "Is the outcome numerical, binary, categorical, ordinal or time-to-event?",
      "Are observations independent, paired or repeated?",
      "How many groups are being compared?",
      "Are assumptions reasonable?",
      "Does the method answer the actual research question?",
    ],

    commonMistakes: [
      "Choosing the test before defining the research question.",
      "Using several t-tests instead of ANOVA.",
      "Ignoring paired measurements.",
      "Using correlation when regression is needed.",
      "Reporting p-values without effect sizes or confidence intervals.",
    ],

    related: [
      "Understanding p-values, confidence intervals and effect sizes",
      "Choosing between correlation and regression",
      "Non-parametric tests: when and how to use them",
    ],
  },
];