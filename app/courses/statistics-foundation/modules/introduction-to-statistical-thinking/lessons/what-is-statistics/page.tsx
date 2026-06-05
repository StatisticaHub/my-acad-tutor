"use client";

import LockedLessonGate from "@/components/course/LockedLessonGate";
import { isStatisticsFoundationLessonOpen } from "@/lib/statisticsFoundationAccess";


import { useMemo, useState } from "react";

const tabs = [
  "Learning Route",
  "Lecture",
  "Detailed Notes",
  "Visual Lab",
  "Animated Mentor",
  "Worked Examples",
  "Practice Studio",
  "Reflection",
  "Quiz",
];

const learningRoute = [
  {
    time: "0–8 min",
    title: "Orientation",
    body:
      "Understand what statistics means and why it is more than calculating averages or drawing graphs.",
  },
  {
    time: "8–20 min",
    title: "Core vocabulary",
    body:
      "Learn the meaning of population, sample, variable, parameter, statistic and inference.",
  },
  {
    time: "20–35 min",
    title: "Statistical reasoning",
    body:
      "Follow how a research question becomes data, then evidence, then a careful conclusion.",
  },
  {
    time: "35–50 min",
    title: "Visual exploration",
    body:
      "Use the visual lab to explore sample size, natural variation, bias and uncertainty.",
  },
  {
    time: "50–65 min",
    title: "Worked examples",
    body:
      "Apply the ideas to university, health and survey examples.",
  },
  {
    time: "65–75 min",
    title: "Practice and reflection",
    body:
      "Practise writing careful statistical explanations and complete the quiz.",
  },
];

const characters = [
  {
    name: "Mr. R",
    role: "Teacher",
    focus: "Statistical reasoning",
    line:
      "Statistics is not just calculation. It is a way of learning from data while staying honest about uncertainty.",
  },
  {
    name: "Amelia",
    role: "Student",
    focus: "Beginner questions",
    line:
      "I want the key words to make sense before we start using formulas.",
  },
  {
    name: "Ben",
    role: "Student",
    focus: "Real examples",
    line:
      "I understand better when definitions are connected to situations I can imagine.",
  },
  {
    name: "Chloe",
    role: "Student",
    focus: "Bias and assumptions",
    line:
      "I want to know when a statistical answer can be misleading.",
  },
  {
    name: "Daniel",
    role: "Student",
    focus: "Decision-making",
    line:
      "I want to understand how data becomes evidence for a decision.",
  },
];

const lectureConcepts = [
  {
    title: "Statistics starts with a question",
    body:
      "A statistical investigation begins by asking what we want to know. The question determines the population, the variables, the method of data collection and the type of analysis.",
    example:
      "Instead of starting with “calculate the mean”, start with “what is the average weekly study time of first-year students?”",
  },
  {
    title: "Data is evidence, not automatic truth",
    body:
      "Data is collected from a particular source, at a particular time, using a particular method. Good statistics asks whether the data is relevant, representative and reliable.",
    example:
      "A survey of only highly motivated students may not represent the whole class.",
  },
  {
    title: "Variation is normal",
    body:
      "People, measurements and outcomes naturally differ. Statistics helps us describe variation and decide whether a pattern is meaningful or could have appeared through random variation.",
    example:
      "Two samples from the same population will usually give slightly different means.",
  },
  {
    title: "Uncertainty must be communicated",
    body:
      "A statistical result should not be presented as perfectly certain. We need to communicate how much uncertainty remains and what assumptions are being made.",
    example:
      "A sample mean is an estimate of the population mean, not the exact population truth.",
  },
];

const lectureDeepDives = [
  {
    title: "A number is not automatically evidence",
    body:
      "A number becomes evidence only when we understand where it came from, what it measures, who it represents and how uncertain it is. An average study time of 14 hours per week is not meaningful unless we know who was surveyed, how they were selected and whether the sample represents the target population.",
  },
  {
    title: "Statistics connects design and interpretation",
    body:
      "The quality of a statistical conclusion depends on the design of the study as much as the calculation. A perfectly calculated mean from a biased sample may still be misleading. Statistical thinking begins before analysis.",
  },
  {
    title: "Uncertainty is not weakness",
    body:
      "Uncertainty is a natural part of learning from incomplete data. Good statistics does not pretend uncertainty has disappeared. Instead, it measures uncertainty, communicates it and uses it to make more careful conclusions.",
  },
  {
    title: "Inference is a controlled leap",
    body:
      "Inference means moving from the observed sample to the wider population. This is powerful, but it must be done carefully. A sample statistic gives evidence about a population parameter, but it does not equal the parameter exactly.",
  },
];

const detailedNotes = [
  {
    title: "Population",
    short: "The complete group or process we want to understand.",
    detail:
      "The population is defined by the research question. It could be all students in a university, all patients registered at a clinic, all measurements produced by a laboratory process, or all possible future observations from a system. A common mistake is to define the population after seeing the data. In good statistical thinking, the target population is defined first.",
    example:
      "If the question is about all first-year students, the population is all first-year students, not only the students who answered a survey.",
    formula: "Population = target group of interest",
  },
  {
    title: "Sample",
    short: "The observed part of the population.",
    detail:
      "A sample is the part of the population from which we actually collect data. We use samples because observing the whole population is often expensive, slow or impossible. The sample should be selected in a way that makes it informative about the population. A large sample is helpful, but size alone does not guarantee quality.",
    example:
      "A sample of 200 students can be useful, but if only students from one course respond, the sample may be biased.",
    formula: "Sample ⊂ Population",
  },
  {
    title: "Variable",
    short: "The characteristic measured on each unit.",
    detail:
      "A variable records information about each unit. Variables can be numerical, such as age or blood pressure; categorical, such as degree subject; binary, such as yes/no; ordinal, such as satisfaction level; or time-to-event, such as time until recovery. The type of variable affects which summaries and graphs are appropriate.",
    example:
      "Weekly study time is numerical. Course satisfaction on a 1–5 scale is ordinal.",
    formula: "Variable = measured characteristic",
  },
  {
    title: "Parameter",
    short: "A usually unknown numerical truth about the population.",
    detail:
      "A parameter summarises the population. Examples include the true population mean, the true population proportion, or the true population standard deviation. We often want to know the parameter, but we rarely observe the whole population. Therefore, parameters are usually estimated using sample statistics.",
    example:
      "The true average study time of all first-year students is a parameter.",
    formula: "Parameter examples: μ, p, σ",
  },
  {
    title: "Statistic",
    short: "A numerical summary calculated from sample data.",
    detail:
      "A statistic is calculated from the observed sample. Examples include the sample mean, sample proportion, sample median and sample standard deviation. Because a statistic depends on the sample, it can vary from sample to sample. This is why uncertainty is central to statistics.",
    example:
      "The average study time among 200 surveyed students is a statistic.",
    formula: "Statistic examples: x̄, p̂, s",
  },
  {
    title: "Inference",
    short: "Using sample evidence to reason about the population.",
    detail:
      "Inference is the movement from what we observed to what we want to know. It requires uncertainty because the sample is only part of the population. Good inference depends on the sampling design, measurement quality, assumptions and the amount of natural variation.",
    example:
      "Using the sample mean to estimate the population mean is an inferential step.",
    formula: "Sample → Statistic → Inference → Population",
  },
];

const misconceptionCards = [
  {
    myth: "Statistics is just maths.",
    correction:
      "Statistics uses mathematics, but it also depends on context, design, uncertainty, assumptions and interpretation.",
  },
  {
    myth: "A large sample always gives the truth.",
    correction:
      "A large sample can reduce random error, but it cannot automatically fix bias or poor measurement.",
  },
  {
    myth: "A statistic and a parameter are the same thing.",
    correction:
      "A statistic is calculated from the sample. A parameter describes the population.",
  },
  {
    myth: "Graphs are only decorative.",
    correction:
      "Graphs help reveal patterns, outliers, variation and possible problems in the data.",
  },
];

const scenarios = [
  {
    title: "University study time",
    question:
      "A university wants to estimate the average weekly study time of all first-year students.",
    population: "All first-year students at the university.",
    sample: "The students who complete the study-time survey.",
    variable: "Weekly study time measured in hours.",
    parameter: "The true mean weekly study time of all first-year students.",
    statistic: "The mean weekly study time in the surveyed students.",
    warning:
      "If only highly motivated students answer, the estimate may be too high.",
  },
  {
    title: "Clinic blood pressure",
    question:
      "A clinic wants to estimate the mean systolic blood pressure of its registered patients.",
    population: "All registered patients at the clinic.",
    sample: "Patients whose blood pressure is measured during the study period.",
    variable: "Systolic blood pressure in mmHg.",
    parameter: "The true mean systolic blood pressure of all registered patients.",
    statistic: "The mean systolic blood pressure in the measured patients.",
    warning:
      "If only unwell patients attend during the study period, the sample may not represent the full clinic population.",
  },
  {
    title: "Course satisfaction",
    question:
      "A department wants to understand student satisfaction with a new statistics course.",
    population: "All students enrolled on the course.",
    sample: "Students who respond to the satisfaction questionnaire.",
    variable: "Satisfaction rating.",
    parameter: "The true average satisfaction level in the whole course.",
    statistic: "The average satisfaction rating among respondents.",
    warning:
      "Non-response bias may occur if only very satisfied or very dissatisfied students respond.",
  },
];

const mentorTopics = [
  {
    id: "question",
    label: "Start with question",
    answer:
      "Before choosing a formula, ask: what do we want to know, who is the conclusion about, and what data would provide relevant evidence?",
  },
  {
    id: "sample",
    label: "Sample quality",
    answer:
      "A sample should represent the population. A large sample is useful, but a biased large sample can still produce a misleading conclusion.",
  },
  {
    id: "uncertainty",
    label: "Uncertainty",
    answer:
      "Uncertainty appears because samples vary. If we collected another sample, the statistic would probably change. Statistics helps us measure this uncertainty.",
  },
  {
    id: "bias",
    label: "Bias",
    answer:
      "Bias is systematic distortion. It is not solved simply by increasing sample size. Good design is needed to reduce bias.",
  },
  {
    id: "conclusion",
    label: "Good conclusion",
    answer:
      "A good statistical conclusion says what was measured, who it applies to, what the result suggests, and what uncertainty or limitation remains.",
  },
];

const practiceTasks = [
  {
    title: "Emergency waiting time",
    task:
      "A hospital wants to estimate average waiting time in the emergency department.",
    prompts: [
      "Identify the population.",
      "Identify a possible sample.",
      "Name the variable.",
      "State the parameter.",
      "State the statistic.",
    ],
  },
  {
    title: "Study habits survey",
    task:
      "A school surveys only top-performing students about study habits.",
    prompts: [
      "Explain why this sample may be biased.",
      "Explain which students are missing from the sample.",
      "Write one cautious conclusion.",
    ],
  },
  {
    title: "Incomplete conclusion",
    task:
      "A researcher reports only the sample mean without explaining who was sampled.",
    prompts: [
      "Explain why the conclusion is incomplete.",
      "List two details the researcher should report.",
      "Explain why context matters.",
    ],
  },
];

const quizQuestions = [
  {
    question: "Which statement best describes statistics?",
    options: [
      "Statistics is only the calculation of averages.",
      "Statistics is the science of learning from data under uncertainty.",
      "Statistics is the same as pure mathematics.",
      "Statistics is only useful when the whole population is observed.",
    ],
    answer: 1,
    feedback:
      "Statistics is about learning from data while recognising uncertainty, variation, design and context.",
  },
  {
    question:
      "A researcher surveys 150 students to estimate the average study time of all first-year students. What are the 150 students?",
    options: ["Population", "Sample", "Parameter", "Variable"],
    answer: 1,
    feedback:
      "The 150 students are the sample. The population is all first-year students.",
  },
  {
    question: "Which one is a parameter?",
    options: [
      "The mean of 80 sampled students",
      "The true mean of all students in the university",
      "A bar chart of the sample",
      "The number of people who answered a questionnaire",
    ],
    answer: 1,
    feedback:
      "A parameter describes the population. The true mean of all students is a population value.",
  },
  {
    question: "Why is a biased sample dangerous?",
    options: [
      "Because it always has too few observations.",
      "Because it can systematically misrepresent the population.",
      "Because it stops us drawing graphs.",
      "Because it makes every variable categorical.",
    ],
    answer: 1,
    feedback:
      "Bias can systematically distort the conclusion. A large biased sample can still be misleading.",
  },
  {
    question: "Which sentence is the most careful statistical conclusion?",
    options: [
      "The sample mean is 14, so the population mean is exactly 14.",
      "The sample mean is 14, which gives evidence about the population mean, but uncertainty remains.",
      "The sample mean is 14, so sampling does not matter.",
      "The sample mean is 14, so there is no bias.",
    ],
    answer: 1,
    feedback:
      "A careful conclusion recognises that a sample statistic gives evidence about the population but does not equal the population truth exactly.",
  },
];

export default function WhatIsStatisticsLesson() {
  const [activeTab, setActiveTab] = useState("Learning Route");
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [sampleSize, setSampleSize] = useState(60);
  const [biasLevel, setBiasLevel] = useState(10);
  const [variation, setVariation] = useState(18);
  const [mentorTopic, setMentorTopic] = useState("question");
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(
    {},
  );

  const activeScenario = scenarios[scenarioIndex];
  const activeMentor =
    mentorTopics.find((topic) => topic.id === mentorTopic) ?? mentorTopics[0];

  const visual = useMemo(() => {
    const populationMean = 70;
    const sampleShift = biasLevel / 4;
    const uncertainty = Math.max(2.5, (variation * 2.1) / Math.sqrt(sampleSize));
    const sampleMean = populationMean + sampleShift + uncertainty * 0.8;
    const width = uncertainty * 3.92;
    const trust = Math.max(
      15,
      Math.min(98, 100 - biasLevel * 1.2 - variation * 0.3 + sampleSize * 0.08),
    );

    return {
      populationMean,
      sampleMean,
      uncertainty,
      width,
      trust,
    };
  }, [biasLevel, sampleSize, variation]);

  const populationDots = useMemo(() => {
    return Array.from({ length: 80 }, (_, index) => {
      const selected = index < Math.round(sampleSize / 4);
      const biased = biasLevel > 20 && index % 5 === 0;

      return {
        id: index,
        selected,
        biased,
      };
    });
  }, [biasLevel, sampleSize]);

  const score = quizQuestions.reduce((total, question, index) => {
    return selectedAnswers[index] === question.answer ? total + 1 : total;
  }, 0);

  return (
    <main className="min-h-screen bg-[#F7F3EA] px-5 py-8 text-[#141210] md:px-8 md:py-14">
      <style>{`
        @keyframes mentorFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes mentorBlink {
          0%, 92%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.12); }
        }

        @keyframes signalMove {
          0% { transform: translateX(-100%); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }

        @keyframes selectedPulse {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.25); opacity: 1; }
        }
      `}</style>

      <section className="mx-auto max-w-7xl">
        <a
          href="/courses/statistics-foundation/modules/introduction-to-statistical-thinking/"
          className="text-sm font-black text-[#741018] hover:text-[#4d080e]"
        >
          ← Back to module
        </a>

        <section className="mt-8 overflow-hidden rounded-[2.5rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 md:p-10">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Statistics Foundation · Lesson 1.1
              </p>

              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-7xl">
                What is statistics?
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">
                Statistics is the discipline of learning from data under
                uncertainty. This lesson explains the basic language of
                statistical thinking: population, sample, variable, parameter,
                statistic, variation, bias and inference.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "60–75 minutes",
                  "No coding",
                  "Interactive lab",
                  "Animated mentor",
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
                Learning pathway
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                From question to evidence.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Ask a question",
                  "Define the population",
                  "Collect a sample",
                  "Measure variables",
                  "Summarise data",
                  "Interpret uncertainty",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-[1.25rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-4"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFFCF6] text-sm font-black text-[#141210]">
                      {index + 1}
                    </span>
                    <span className="text-sm font-bold text-white/80">
                      {item}
                    </span>
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
                60–75 minute lesson plan
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Learn statistics as a reasoning process.
              </h2>

              <p className="mt-5 text-base leading-8 text-[#525252]">
                This lesson is designed to be studied slowly. Read the lecture,
                explore the visual lab, answer the practice questions, and then
                complete the quiz. By the end, you should be able to explain
                what statistics is without relying only on formulas.
              </p>

              <div className="mt-6 grid gap-3">
                {learningRoute.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
                      {item.time}
                    </p>
                    <h3 className="mt-2 text-xl font-black tracking-[-0.035em]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#525252]">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                What you should master
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                By the end, you should be able to explain the whole chain.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Define statistics in your own words.",
                  "Distinguish population from sample.",
                  "Distinguish parameter from statistic.",
                  "Explain why samples create uncertainty.",
                  "Explain why bias is different from random variation.",
                  "Write a careful statistical conclusion.",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-4 rounded-[1.25rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-4"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFFCF6] text-sm font-black text-[#141210]">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-7 text-white/75">{item}</p>
                  </div>
                ))}
              </div>
            </section>
          </section>
        )}

        {activeTab === "Lecture" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Interactive concept board
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Statistics is a reasoning cycle.
              </h2>

              <p className="mt-4 text-base leading-8 text-[#525252]">
                The lecture is not only a conversation. Use the concept cards
                below as a map. Each card represents one step in the way
                statistics turns observations into evidence.
              </p>

              <div className="mt-6 grid gap-4">
                {lectureConcepts.map((concept, index) => (
                  <article
                    key={concept.title}
                    className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#11100E] text-sm font-black text-white">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-xl font-black tracking-[-0.035em]">
                          {concept.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-[#525252]">
                          {concept.body}
                        </p>
                        <p className="mt-3 rounded-2xl bg-[#FFFCF6] px-4 py-3 text-sm font-bold leading-7 text-[#525252]">
                          Example: {concept.example}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Guided lecture with characters
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Mr. R introduces statistical thinking.
              </h2>

              <div className="mt-6 grid gap-4">
                <Dialogue
                  speaker="Mr. R"
                  text="Before we calculate anything, we must ask: what is the question, who is the conclusion about, and what evidence do we actually have?"
                />
                <Dialogue
                  speaker="Amelia"
                  text="So statistics is not just mean, median, graphs and formulas?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Correct. Those are tools. Statistics is the reasoning process that tells us which tool is appropriate and how to interpret the result."
                />
                <Dialogue
                  speaker="Ben"
                  text="Can one sample really tell us something about a whole population?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Yes, but only with uncertainty. A sample can be informative, but it is rarely a perfect copy of the population."
                />
                <Dialogue
                  speaker="Chloe"
                  text="What if the sample is not representative?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Then we must worry about bias. Bias is not fixed simply by collecting more observations. It is often a design problem."
                />
                <Dialogue
                  speaker="Daniel"
                  text="So the final answer should include both the number and the caution?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Exactly. A statistical conclusion should include the estimate, the population it applies to, the uncertainty and the limitations."
                />
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8 lg:col-span-2">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Deeper explanation
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Four ideas students often miss at the beginning.
              </h2>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {lectureDeepDives.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
                  >
                    <h3 className="text-xl font-black tracking-[-0.035em]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#525252]">
                      {item.body}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </section>
        )}

        {activeTab === "Detailed Notes" && (
          <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
              Detailed notes
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Core concepts explained in depth.
            </h2>

            <p className="mt-5 max-w-4xl text-base leading-8 text-[#525252]">
              These ideas appear throughout the entire course. Later topics such
              as probability, confidence intervals, hypothesis tests, regression
              and survival analysis all depend on the distinction between the
              population we care about and the sample we observe.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {detailedNotes.map((note) => (
                <article
                  key={note.title}
                  className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
                >
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
                    {note.short}
                  </p>
                  <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">
                    {note.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#525252]">
                    {note.detail}
                  </p>
                  <p className="mt-4 rounded-2xl bg-[#FFFCF6] px-4 py-3 text-sm font-bold leading-7 text-[#525252]">
                    Example: {note.example}
                  </p>
                  <p className="mt-3 rounded-2xl bg-[#11100E] px-4 py-3 text-sm font-black text-white">
                    {note.formula}
                  </p>
                </article>
              ))}
            </div>

            <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                Important distinction
              </p>

              <h3 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                Random error and bias are not the same.
              </h3>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5">
                  <h4 className="text-xl font-black">Random error</h4>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                    Random error happens because samples naturally differ from
                    one another. Increasing sample size usually reduces random
                    error because the sample becomes more stable.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5">
                  <h4 className="text-xl font-black">Bias</h4>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                    Bias is systematic distortion. It can remain even in a very
                    large sample if the sampling or measurement process is
                    flawed.
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Common misconceptions
              </p>

              <h3 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                What beginners often misunderstand.
              </h3>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {misconceptionCards.map((item) => (
                  <article
                    key={item.myth}
                    className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
                      Misconception
                    </p>
                    <h4 className="mt-2 text-xl font-black tracking-[-0.035em]">
                      {item.myth}
                    </h4>

                    <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-[#7a7063]">
                      Better understanding
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#525252]">
                      {item.correction}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-8 rounded-[2rem] border border-[#741018]/20 bg-[#fff4ef] p-6">
              <h3 className="text-2xl font-black tracking-[-0.04em] text-[#741018]">
                A careful definition of statistics
              </h3>

              <p className="mt-4 text-base leading-8 text-[#525252]">
                Statistics is the discipline of collecting, organising,
                analysing, interpreting and communicating data in order to learn
                from variation and uncertainty. It combines numerical summaries,
                visual displays, probability, modelling and critical judgement.
                The goal is not simply to produce a number, but to produce a
                conclusion that is justified by the data and honest about its
                limitations.
              </p>
            </section>
          </section>
        )}

        {activeTab === "Visual Lab" && (
          <section className="mt-8 grid gap-6">
            <section className="overflow-hidden rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="p-6 md:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                    Visual studio
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    See how statistics moves from population to evidence.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-[#525252]">
                    This studio explains the first statistical journey: we start
                    with a population, observe a sample, calculate a statistic,
                    and then use that statistic to reason about the population
                    parameter. Move the sliders slowly and watch how the visual
                    interpretation changes.
                  </p>

                  <div className="mt-6 grid gap-5">
                    <Slider
                      label="Sample size"
                      value={sampleSize}
                      min={20}
                      max={250}
                      onChange={setSampleSize}
                    />
                    <Slider
                      label="Natural variation"
                      value={variation}
                      min={6}
                      max={40}
                      onChange={setVariation}
                    />
                    <Slider
                      label="Bias level"
                      value={biasLevel}
                      min={0}
                      max={45}
                      onChange={setBiasLevel}
                    />
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Metric
                      label="Population mean"
                      value={visual.populationMean.toFixed(1)}
                    />
                    <Metric
                      label="Sample estimate"
                      value={visual.sampleMean.toFixed(1)}
                    />
                    <Metric
                      label="Uncertainty"
                      value={visual.uncertainty.toFixed(2)}
                    />
                    <Metric
                      label="Trust score"
                      value={`${visual.trust.toFixed(0)}%`}
                    />
                  </div>
                </div>

                <div className="border-t border-[#E4DED2] bg-[#11100E] p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                    Statistical pathway
                  </p>

                  <div className="mt-6 grid gap-3">
                    {[
                      {
                        step: "1",
                        title: "Population",
                        body:
                          "The full group we want to understand. The population value is usually unknown.",
                      },
                      {
                        step: "2",
                        title: "Sample",
                        body:
                          "The observed part of the population. This is the evidence we actually have.",
                      },
                      {
                        step: "3",
                        title: "Statistic",
                        body:
                          "A summary calculated from the sample, such as a sample mean.",
                      },
                      {
                        step: "4",
                        title: "Inference",
                        body:
                          "A careful statement about the population, with uncertainty and limitations.",
                      },
                    ].map((item) => (
                      <article
                        key={item.step}
                        className="rounded-[1.5rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-4"
                      >
                        <div className="flex items-start gap-4">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFFCF6] text-sm font-black text-[#141210]">
                            {item.step}
                          </span>
                          <div>
                            <h3 className="font-black text-white">
                              {item.title}
                            </h3>
                            <p className="mt-2 text-sm leading-7 text-white/70">
                              {item.body}
                            </p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
              <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                      Population grid
                    </p>
                    <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                      Which units are actually observed?
                    </h2>
                  </div>

                  <div className="rounded-full bg-[#F7F3EA] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#5F5F5F]">
                    {Math.round(sampleSize / 4)} of 80 selected
                  </div>
                </div>

                <div className="mt-6 rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
                  <div className="grid grid-cols-10 gap-2">
                    {populationDots.map((dot) => (
                      <div
                        key={dot.id}
                        className={`aspect-square rounded-full transition ${
                          dot.selected
                            ? "bg-[#11100E]"
                            : dot.biased
                              ? "bg-[#741018]/40"
                              : "bg-neutral-300"
                        }`}
                        style={{
                          animation: dot.selected
                            ? "selectedPulse 2.2s ease-in-out infinite"
                            : undefined,
                        }}
                      />
                    ))}
                  </div>

                  <div className="mt-5 grid gap-3 text-sm leading-7 text-[#525252] md:grid-cols-3">
                    <div className="rounded-2xl bg-[#FFFCF6] p-4">
                      <strong>Grey dots:</strong> members of the population not
                      observed in this sample.
                    </div>
                    <div className="rounded-2xl bg-[#FFFCF6] p-4">
                      <strong>Dark dots:</strong> selected sample units used to
                      calculate the statistic.
                    </div>
                    <div className="rounded-2xl bg-[#FFFCF6] p-4">
                      <strong>Red-tinted dots:</strong> possible bias pressure
                      when some units are more likely to be selected.
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <InterpretationCard
                    title="Sample size"
                    body={
                      sampleSize < 80
                        ? "The sample is still small. The statistic may move noticeably from sample to sample."
                        : sampleSize < 170
                          ? "The sample is moderate. Random error is lower, but uncertainty still matters."
                          : "The sample is large. Random error is lower, but bias can still remain."
                    }
                  />
                  <InterpretationCard
                    title="Variation"
                    body={
                      variation < 15
                        ? "The population is relatively consistent, so estimates are easier to stabilise."
                        : variation < 28
                          ? "There is moderate variation. The sample estimate needs uncertainty around it."
                          : "There is high variation. Even a decent sample can give an unstable estimate."
                    }
                  />
                  <InterpretationCard
                    title="Bias"
                    body={
                      biasLevel < 15
                        ? "Bias pressure is low. The sample is more likely to represent the population."
                        : biasLevel < 30
                          ? "Bias pressure is moderate. The estimate may start drifting away from the truth."
                          : "Bias pressure is high. A large sample may still give a misleading conclusion."
                    }
                  />
                </div>
              </section>

              <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Estimate and uncertainty
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                  One number is not the whole conclusion.
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#525252]">
                  The sample estimate is shown in red. The population truth is
                  shown in black. The shaded band shows the uncertainty around
                  the estimate. A strong statistical conclusion explains all
                  three.
                </p>

                <div className="mt-6 rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
                  <div className="relative h-20 rounded-full bg-[#FFFCF6]">
                    <div
                      className="absolute top-1/2 h-12 -translate-y-1/2 rounded-full bg-[#741018]/15"
                      style={{
                        left: `${Math.max(
                          4,
                          visual.sampleMean - visual.width / 2,
                        )}%`,
                        width: `${Math.min(88, visual.width)}%`,
                      }}
                    />
                    <div
                      className="absolute top-1/2 h-16 w-1 -translate-y-1/2 rounded-full bg-[#11100E]"
                      style={{ left: `${visual.populationMean}%` }}
                    />
                    <div
                      className="absolute top-1/2 h-16 w-1 -translate-y-1/2 rounded-full bg-[#741018]"
                      style={{ left: `${visual.sampleMean}%` }}
                    />
                    <div
                      className="absolute -bottom-8 rounded-full bg-[#11100E] px-3 py-1 text-xs font-black text-white"
                      style={{ left: `${visual.populationMean - 8}%` }}
                    >
                      truth
                    </div>
                    <div
                      className="absolute -top-8 rounded-full bg-[#741018] px-3 py-1 text-xs font-black text-white"
                      style={{ left: `${visual.sampleMean - 8}%` }}
                    >
                      sample
                    </div>
                  </div>

                  <div className="mt-12 grid grid-cols-3 gap-2 text-center text-xs font-black uppercase tracking-[0.14em] text-[#7a7063]">
                    <span>Lower</span>
                    <span>Estimate</span>
                    <span>Higher</span>
                  </div>
                </div>

                <div className="mt-6 rounded-[2rem] border border-[#741018]/20 bg-[#fff4ef] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
                    Student interpretation
                  </p>

                  <p className="mt-3 text-sm leading-7 text-[#525252]">
                    In this simulation, the sample estimate is{" "}
                    <strong>{visual.sampleMean.toFixed(1)}</strong>. It gives
                    evidence about a population value near{" "}
                    <strong>{visual.populationMean.toFixed(1)}</strong>, but the
                    uncertainty is about{" "}
                    <strong>{visual.uncertainty.toFixed(2)}</strong>. The trust
                    score is <strong>{visual.trust.toFixed(0)}%</strong>, so the
                    conclusion should mention uncertainty and possible bias.
                  </p>
                </div>
              </section>
            </section>

            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Guided prompts
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Pause and explain what you see.
              </h2>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: "Prompt 1",
                    body:
                      "When you increase sample size, what happens to uncertainty? Explain why.",
                  },
                  {
                    title: "Prompt 2",
                    body:
                      "When you increase bias, why can the sample estimate move away from the population truth?",
                  },
                  {
                    title: "Prompt 3",
                    body:
                      "Write one careful conclusion using the words estimate, uncertainty and bias.",
                  },
                ].map((prompt) => (
                  <article
                    key={prompt.title}
                    className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
                      {prompt.title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#525252]">
                      {prompt.body}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </section>
        )}

        {activeTab === "Animated Mentor" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Animated character
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Ask Mr. R to explain a concept.
              </h2>

              <div className="mt-8 flex justify-center">
                <div
                  className="relative flex h-52 w-52 items-center justify-center rounded-full border border-[#E4DED2] bg-[#F7F3EA]"
                  style={{ animation: "mentorFloat 3s ease-in-out infinite" }}
                >
                  <div className="absolute top-9 h-20 w-20 rounded-full bg-[#11100E]" />
                  <div className="absolute top-16 flex gap-5">
                    <span
                      className="h-3 w-3 rounded-full bg-[#FFFCF6]"
                      style={{ animation: "mentorBlink 4s infinite" }}
                    />
                    <span
                      className="h-3 w-3 rounded-full bg-[#FFFCF6]"
                      style={{ animation: "mentorBlink 4s infinite" }}
                    />
                  </div>
                  <div className="absolute top-28 h-20 w-32 rounded-t-[3rem] bg-[#741018]" />
                  <div className="absolute bottom-8 rounded-full bg-[#FFFCF6] px-4 py-2 text-sm font-black text-[#141210]">
                    Mr. R
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-2">
                {mentorTopics.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setMentorTopic(topic.id)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
                      mentorTopic === topic.id
                        ? "border-[#741018] bg-[#741018] text-white"
                        : "border-[#E4DED2] bg-[#F7F3EA] text-[#525252] hover:bg-[#FFFCF6]"
                    }`}
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            </section>

            <section className="relative overflow-hidden rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white shadow-sm md:p-8">
              <div className="absolute left-0 top-0 h-1 w-full overflow-hidden bg-[#FFFCF6]/10">
                <div
                  className="h-full w-1/2 bg-[#FFFCF6]/40"
                  style={{ animation: "signalMove 2.8s linear infinite" }}
                />
              </div>

              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Mentor explanation
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                {activeMentor.label}
              </h2>

              <p className="mt-6 max-w-4xl text-lg leading-9 text-white/80">
                {activeMentor.answer}
              </p>

              <div className="mt-8 rounded-[2rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                  Mentor challenge
                </p>
                <p className="mt-3 text-sm leading-7 text-white/75">
                  Write one sentence using the words population, sample and
                  uncertainty. A strong answer should explain who the conclusion
                  is about and what data was actually observed.
                </p>
              </div>
            </section>
          </section>
        )}

        {activeTab === "Worked Examples" && (
          <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
              Worked examples
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Identify the structure of a statistical question.
            </h2>

            <div className="mt-6 flex flex-wrap gap-2">
              {scenarios.map((scenario, index) => (
                <button
                  key={scenario.title}
                  type="button"
                  onClick={() => setScenarioIndex(index)}
                  className={`rounded-full px-4 py-2 text-sm font-black transition ${
                    scenarioIndex === index
                      ? "bg-[#11100E] text-white"
                      : "border border-[#E4DED2] bg-[#F7F3EA] text-[#525252]"
                  }`}
                >
                  {scenario.title}
                </button>
              ))}
            </div>

            <article className="mt-6 rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-6">
              <h3 className="text-3xl font-black tracking-[-0.045em]">
                {activeScenario.title}
              </h3>

              <p className="mt-4 max-w-4xl text-base leading-8 text-[#525252]">
                {activeScenario.question}
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <AnswerCard title="Population" body={activeScenario.population} />
                <AnswerCard title="Sample" body={activeScenario.sample} />
                <AnswerCard title="Variable" body={activeScenario.variable} />
                <AnswerCard title="Parameter" body={activeScenario.parameter} />
                <AnswerCard title="Statistic" body={activeScenario.statistic} />
                <AnswerCard title="Possible caution" body={activeScenario.warning} />
              </div>
            </article>
          </section>
        )}

        {activeTab === "Practice Studio" && (
          <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
              Practice studio
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Practise the reasoning process.
            </h2>

            <p className="mt-5 max-w-4xl text-base leading-8 text-[#525252]">
              These tasks are designed for slow practice. Try answering each
              prompt on paper before checking the worked examples again.
            </p>

            <div className="mt-8 grid gap-5">
              {practiceTasks.map((exercise, index) => (
                <article
                  key={exercise.title}
                  className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
                >
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
                    Practice task {index + 1}
                  </p>
                  <h3 className="mt-3 text-xl font-black tracking-[-0.035em]">
                    {exercise.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#525252]">
                    {exercise.task}
                  </p>

                  <div className="mt-4 grid gap-2">
                    {exercise.prompts.map((prompt) => (
                      <div
                        key={prompt}
                        className="rounded-2xl bg-[#FFFCF6] px-4 py-3 text-sm font-bold leading-7 text-[#525252]"
                      >
                        {prompt}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Reflection" && (
          <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
              Reflection task
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Write like a statistician.
            </h2>

            <p className="mt-5 max-w-4xl text-base leading-8 text-[#525252]">
              A good statistics student does not only calculate. They explain
              what the result means, who it applies to, and what uncertainty
              remains. Use the prompts below to practise writing careful
              interpretations.
            </p>

            <div className="mt-8 grid gap-5">
              {[
                {
                  title: "Prompt 1",
                  body:
                    "In your own words, explain the difference between a population and a sample using an example from education, health or daily life.",
                },
                {
                  title: "Prompt 2",
                  body:
                    "Write one sentence explaining why a sample mean may differ from the true population mean.",
                },
                {
                  title: "Prompt 3",
                  body:
                    "Describe a situation where a large sample could still be misleading because of bias.",
                },
                {
                  title: "Prompt 4",
                  body:
                    "Write a careful statistical conclusion for this situation: 200 students were surveyed and their average weekly study time was 14 hours.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
                >
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#525252]">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>

            <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                Model answer structure
              </p>
              <p className="mt-4 text-base leading-8 text-white/75">
                “In this sample, the average was _____. This gives evidence
                about _____. However, because the result is based on a sample,
                there is uncertainty. The conclusion may also be affected by
                _____.”
              </p>
            </section>
          </section>
        )}

        {activeTab === "Quiz" && (
          <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Quiz
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Check your understanding.
                </h2>
              </div>

              <div className="rounded-full bg-[#11100E] px-5 py-3 text-sm font-black text-white">
                Score: {score}/{quizQuestions.length}
              </div>
            </div>

            <div className="mt-8 grid gap-5">
              {quizQuestions.map((question, questionIndex) => (
                <article
                  key={question.question}
                  className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
                >
                  <h3 className="text-lg font-black tracking-[-0.03em]">
                    {questionIndex + 1}. {question.question}
                  </h3>

                  <div className="mt-4 grid gap-2">
                    {question.options.map((option, optionIndex) => {
                      const selected = selectedAnswers[questionIndex];
                      const isSelected = selected === optionIndex;
                      const isCorrect = optionIndex === question.answer;

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            setSelectedAnswers((current) => ({
                              ...current,
                              [questionIndex]: optionIndex,
                            }))
                          }
                          className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
                            isSelected && isCorrect
                              ? "border-green-300 bg-green-50 text-green-900"
                              : isSelected && !isCorrect
                                ? "border-red-300 bg-red-50 text-red-900"
                                : "border-[#E4DED2] bg-[#FFFCF6] text-[#525252] hover:bg-neutral-50"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  {selectedAnswers[questionIndex] !== undefined ? (
                    <p className="mt-4 rounded-2xl bg-[#FFFCF6] px-4 py-3 text-sm leading-7 text-[#525252]">
                      {question.feedback}
                    </p>
                  ) : null}
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
  const isTeacher = speaker === "Mr. R";

  return (
    <div
      className={`rounded-[1.5rem] border p-5 ${
        isTeacher
          ? "border-[#741018]/20 bg-[#fff4ef]"
          : "border-[#E4DED2] bg-[#F7F3EA]"
      }`}
    >
      <p className="text-sm font-black text-[#741018]">{speaker}</p>
      <p className="mt-2 text-base leading-8 text-[#525252]">{text}</p>
    </div>
  );
}

function Slider({
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
    <label className="block">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-black text-[#525252]">{label}</span>
        <span className="rounded-full bg-[#11100E] px-3 py-1 text-xs font-black text-white">
          {value}
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

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-[#E4DED2] bg-[#F7F3EA] p-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#7a7063]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-black tracking-[-0.04em]">{value}</p>
    </div>
  );
}

function InterpretationCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-[1.25rem] border border-[#E4DED2] bg-[#FFFCF6] p-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#741018]">
        {title}
      </p>
      <p className="mt-2 text-sm leading-7 text-[#525252]">{body}</p>
    </article>
  );
}


function AnswerCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[1.25rem] border border-[#E4DED2] bg-[#FFFCF6] p-5">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
        {title}
      </p>
      <p className="mt-3 text-sm leading-7 text-[#525252]">{body}</p>
    </div>
  );
}
