"use client";

import { useMemo, useState } from "react";

const tabs = [
  "Lecture",
  "Detailed Notes",
  "Interactive Lab",
  "Worked Examples",
  "Quiz",
];

const studyScenarios = [
  {
    title: "University study habits",
    question:
      "A university wants to estimate the average weekly study time of all first-year undergraduate students. It surveys 250 students from different departments.",
    population: "All first-year undergraduate students at the university",
    sample: "The 250 surveyed students",
    unit: "One first-year undergraduate student",
    variable: "Weekly study time",
    parameter: "The true mean weekly study time of all first-year students",
    statistic: "The mean weekly study time of the 250 surveyed students",
  },
  {
    title: "Clinic blood pressure",
    question:
      "A clinic wants to estimate the proportion of adult patients with high blood pressure. It reviews records from 600 adult patients.",
    population: "All adult patients registered at the clinic",
    sample: "The 600 patients whose records were reviewed",
    unit: "One adult patient",
    variable: "High blood pressure status",
    parameter:
      "The true proportion of all adult clinic patients with high blood pressure",
    statistic:
      "The proportion of the 600 reviewed patients with high blood pressure",
  },
  {
    title: "Plant growth experiment",
    question:
      "A researcher wants to compare the average height of Arabidopsis plants under two light conditions. She measures 40 plants in each condition.",
    population:
      "All Arabidopsis plants that could be grown under these experimental conditions",
    sample: "The 80 measured plants",
    unit: "One plant",
    variable: "Plant height",
    parameter:
      "The true mean plant height under each light condition in the target population",
    statistic:
      "The sample mean height in each group of 40 measured plants",
  },
];

const variableExamples = [
  {
    name: "Age in years",
    type: "Numerical variable",
    reason: "It measures a quantity and arithmetic summaries are meaningful.",
  },
  {
    name: "Blood group",
    type: "Categorical variable",
    reason: "It places individuals into labels such as A, B, AB and O.",
  },
  {
    name: "Exam score",
    type: "Numerical variable",
    reason: "It is a measured or counted score where numerical summaries matter.",
  },
  {
    name: "Degree programme",
    type: "Categorical variable",
    reason: "It identifies a group or label rather than a measurable amount.",
  },
  {
    name: "Satisfaction rating",
    type: "Ordinal categorical variable",
    reason:
      "The categories have an order, but the distance between categories may not be equal.",
  },
];

const quizQuestions = [
  {
    question:
      "A researcher wants to study all MSc students at a university but collects data from 120 students. What is the population?",
    options: [
      "The 120 students",
      "All MSc students at the university",
      "The questionnaire",
      "The average of the 120 students",
    ],
    answer: 1,
    feedback:
      "The population is the complete group the researcher wants to understand: all MSc students at the university.",
  },
  {
    question:
      "In the same study, the 120 students who provided data are called the:",
    options: ["Parameter", "Sample", "Variable", "Population"],
    answer: 1,
    feedback:
      "The sample is the subset of the population that is actually observed.",
  },
  {
    question: "Which statement best describes an observational unit?",
    options: [
      "The numerical summary calculated from the data",
      "The complete group of interest",
      "The entity on which measurements are taken",
      "The method used to draw a graph",
    ],
    answer: 2,
    feedback:
      "The observational unit is the entity measured: a student, patient, plant, household, school, country or similar unit.",
  },
  {
    question:
      "The true average weekly study time of all first-year students is a:",
    options: ["Statistic", "Parameter", "Variable", "Sample"],
    answer: 1,
    feedback:
      "A numerical feature of the population is a parameter. It is often unknown and estimated using a sample statistic.",
  },
  {
    question:
      "The average weekly study time calculated from 250 surveyed students is a:",
    options: ["Statistic", "Parameter", "Population", "Sampling frame"],
    answer: 0,
    feedback:
      "A numerical summary calculated from the sample is a statistic.",
  },
  {
    question: "Which of the following is a variable?",
    options: [
      "All patients registered at a clinic",
      "The 600 patients whose records were reviewed",
      "Blood pressure status",
      "The research question",
    ],
    answer: 2,
    feedback:
      "A variable is a characteristic measured on each observational unit. Blood pressure status is measured for each patient.",
  },
];

function DefinitionBox({
  label,
  children,
  tone = "blue",
}: {
  label: string;
  children: React.ReactNode;
  tone?: "blue" | "green" | "amber" | "purple" | "red";
}) {
  const toneClass = {
    blue: "border-blue-500 bg-blue-50 text-blue-950",
    green: "border-emerald-600 bg-emerald-50 text-emerald-950",
    amber: "border-amber-600 bg-amber-50 text-amber-950",
    purple: "border-violet-600 bg-violet-50 text-violet-950",
    red: "border-red-600 bg-red-50 text-red-950",
  }[tone];

  return (
    <div className={`rounded-r-2xl border-l-4 p-5 ${toneClass}`}>
      <p className="text-xs font-black uppercase tracking-[0.18em]">{label}</p>
      <div className="mt-2 text-sm leading-7">{children}</div>
    </div>
  );
}

function DialogueLine({
  speaker,
  initials,
  children,
  right = false,
  tone = "blue",
}: {
  speaker: string;
  initials: string;
  children: React.ReactNode;
  right?: boolean;
  tone?: "blue" | "green" | "amber" | "purple" | "red";
}) {
  const toneClass = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-emerald-100 text-emerald-800",
    amber: "bg-amber-100 text-amber-800",
    purple: "bg-violet-100 text-violet-800",
    red: "bg-red-100 text-red-800",
  }[tone];

  return (
    <div className={`flex gap-3 ${right ? "flex-row-reverse" : ""}`}>
      <div
        className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-black ${toneClass}`}
      >
        {initials}
      </div>

      <div
        className={`max-w-[84%] rounded-2xl border border-[#ded9cf] p-4 ${
          right ? "bg-blue-50" : "bg-[#f8f6f1]"
        }`}
      >
        <p className="mb-1 text-xs font-bold text-neutral-700">{speaker}</p>
        <div className="text-sm leading-7 text-neutral-800">{children}</div>
      </div>
    </div>
  );
}

function FormulaBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 overflow-x-auto rounded-2xl border border-[#ded9cf] bg-[#f8f6f1] px-5 py-4 text-center font-mono text-sm leading-7 text-neutral-900">
      {children}
    </div>
  );
}

function SectionCard({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.7rem] border border-[#ded9cf] bg-white p-6 shadow-sm md:p-8">
      {eyebrow && (
        <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-3xl font-black tracking-tight">{title}</h2>
      <div className="mt-5 space-y-4 text-sm leading-8 text-neutral-700">
        {children}
      </div>
    </div>
  );
}

function StatTable({
  rows,
}: {
  rows: { term: string; meaning: string; example: string }[];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#ded9cf] bg-white">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <thead className="bg-[#f8f6f1]">
          <tr>
            <th className="border-b border-[#ded9cf] px-4 py-3 font-black">
              Term
            </th>
            <th className="border-b border-[#ded9cf] px-4 py-3 font-black">
              Meaning
            </th>
            <th className="border-b border-[#ded9cf] px-4 py-3 font-black">
              Example
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.term} className="border-b border-[#ded9cf] last:border-0">
              <td className="px-4 py-3 font-bold text-neutral-950">
                {row.term}
              </td>
              <td className="px-4 py-3 leading-6 text-neutral-600">
                {row.meaning}
              </td>
              <td className="px-4 py-3 leading-6 text-neutral-600">
                {row.example}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StudyStructureLab() {
  const [active, setActive] = useState(0);
  const scenario = studyScenarios[active];

  return (
    <div className="rounded-[1.7rem] border border-[#ded9cf] bg-white p-6 shadow-sm md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
        Interactive lab 1
      </p>
      <h3 className="mt-2 text-2xl font-black tracking-tight">
        Decompose a statistical study
      </h3>

      <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600">
        Choose a scenario and identify the six structural parts of the study:
        population, sample, observational unit, variable, parameter and
        statistic.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {studyScenarios.map((item, index) => (
          <button
            key={item.title}
            onClick={() => setActive(index)}
            className={`rounded-full px-4 py-2 text-sm font-black transition ${
              active === index
                ? "bg-neutral-950 text-white"
                : "border border-[#ded9cf] bg-white text-neutral-600 hover:text-neutral-950"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-[#ded9cf] bg-[#fbfaf6] p-5">
        <p className="text-sm font-black text-neutral-950">
          Research question
        </p>
        <p className="mt-2 text-sm leading-7 text-neutral-700">
          {scenario.question}
        </p>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-[#ded9cf] bg-blue-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-800">
            Population
          </p>
          <p className="mt-2 text-sm leading-7 text-blue-950">
            {scenario.population}
          </p>
        </div>

        <div className="rounded-2xl border border-[#ded9cf] bg-emerald-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-800">
            Sample
          </p>
          <p className="mt-2 text-sm leading-7 text-emerald-950">
            {scenario.sample}
          </p>
        </div>

        <div className="rounded-2xl border border-[#ded9cf] bg-amber-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-800">
            Observational unit
          </p>
          <p className="mt-2 text-sm leading-7 text-amber-950">
            {scenario.unit}
          </p>
        </div>

        <div className="rounded-2xl border border-[#ded9cf] bg-violet-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-violet-800">
            Variable
          </p>
          <p className="mt-2 text-sm leading-7 text-violet-950">
            {scenario.variable}
          </p>
        </div>

        <div className="rounded-2xl border border-[#ded9cf] bg-red-50 p-5 md:col-span-2">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-red-800">
            Parameter versus statistic
          </p>
          <p className="mt-2 text-sm leading-7 text-red-950">
            <strong>Parameter:</strong> {scenario.parameter}
          </p>
          <p className="mt-2 text-sm leading-7 text-red-950">
            <strong>Statistic:</strong> {scenario.statistic}
          </p>
        </div>
      </div>
    </div>
  );
}

function VariableClassifierLab() {
  const [active, setActive] = useState(0);
  const item = variableExamples[active];

  return (
    <div className="rounded-[1.7rem] border border-[#ded9cf] bg-white p-6 shadow-sm md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
        Interactive lab 2
      </p>
      <h3 className="mt-2 text-2xl font-black tracking-tight">
        Is it a variable?
      </h3>

      <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600">
        Variables are characteristics measured on each observational unit. Pick
        a variable and study why its type matters for analysis.
      </p>

      <div className="mt-6 grid gap-2 md:grid-cols-5">
        {variableExamples.map((example, index) => (
          <button
            key={example.name}
            onClick={() => setActive(index)}
            className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
              active === index
                ? "border-neutral-950 bg-neutral-950 text-white"
                : "border-[#ded9cf] bg-white text-neutral-700 hover:bg-blue-50"
            }`}
          >
            {example.name}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-[#ded9cf] bg-[#fbfaf6] p-5">
        <p className="text-sm font-black text-neutral-950">{item.name}</p>
        <p className="mt-3 text-lg font-black text-blue-800">{item.type}</p>
        <p className="mt-3 text-sm leading-7 text-neutral-700">{item.reason}</p>
      </div>
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
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-[#ded9cf] bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">
            Worked example
          </p>
          <h3 className="mt-1 text-lg font-black">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-neutral-600">{question}</p>
        </div>

        <span className="rounded-full border border-[#ded9cf] px-3 py-1 text-sm font-bold">
          {open ? "Hide" : "Show"}
        </span>
      </button>

      {open && (
        <div className="space-y-3 border-t border-[#ded9cf] bg-[#fbfaf6] p-5 text-sm leading-7 text-neutral-700">
          {children}
        </div>
      )}
    </div>
  );
}

function QuizEngine() {
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);

  const score = useMemo(() => {
    return quizQuestions.reduce((total, question, index) => {
      return selected[index] === question.answer ? total + 1 : total;
    }, 0);
  }, [selected]);

  return (
    <div className="rounded-[1.7rem] border border-[#ded9cf] bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
            Quiz
          </p>
          <h3 className="mt-2 text-2xl font-black tracking-tight">
            Check your understanding
          </h3>
        </div>

        {checked && (
          <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-black text-blue-900">
            Score: {score}/{quizQuestions.length}
          </div>
        )}
      </div>

      <div className="mt-6 space-y-5">
        {quizQuestions.map((question, questionIndex) => (
          <div
            key={question.question}
            className="rounded-2xl border border-[#ded9cf] bg-[#fbfaf6] p-5"
          >
            <p className="font-bold leading-7">
              {questionIndex + 1}. {question.question}
            </p>

            <div className="mt-4 space-y-2">
              {question.options.map((option, optionIndex) => {
                const isSelected = selected[questionIndex] === optionIndex;
                const isCorrect = question.answer === optionIndex;
                const showCorrect = checked && isCorrect;
                const showWrong = checked && isSelected && !isCorrect;

                return (
                  <button
                    key={option}
                    onClick={() =>
                      setSelected({
                        ...selected,
                        [questionIndex]: optionIndex,
                      })
                    }
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
                      showCorrect
                        ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                        : showWrong
                        ? "border-red-600 bg-red-50 text-red-900"
                        : isSelected
                        ? "border-blue-600 bg-blue-50 text-blue-900"
                        : "border-[#ded9cf] bg-white text-neutral-700 hover:bg-blue-50"
                    }`}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current text-xs font-black">
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>

            {checked && (
              <p className="mt-4 rounded-xl bg-white p-4 text-sm leading-7 text-neutral-700">
                {question.feedback}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() => setChecked(true)}
          className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-black text-white"
        >
          Check answers
        </button>

        <button
          onClick={() => {
            setSelected({});
            setChecked(false);
          }}
          className="rounded-full border border-[#ded9cf] bg-white px-6 py-3 text-sm font-black text-neutral-950"
        >
          Reset quiz
        </button>
      </div>
    </div>
  );
}

export default function PopulationsSamplesVariablesLessonPage() {
  const [activeTab, setActiveTab] = useState("Lecture");

  return (
    <main className="min-h-screen bg-[#f2efe7] text-neutral-950">
      <div className="mx-auto max-w-7xl px-5 py-7 md:px-8 md:py-10">
        <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <a
            href="/courses/statistics-foundation/modules/introduction-to-statistical-thinking"
            className="text-sm font-black text-blue-700 hover:text-blue-900"
          >
            ← Back to Module 1
          </a>

          <a
            href="/courses/statistics-foundation"
            className="rounded-full border border-[#ded9cf] bg-white px-4 py-2 text-sm font-bold text-neutral-700 hover:text-neutral-950"
          >
            Statistics Foundation
          </a>
        </header>

        <section className="rounded-[2rem] border border-[#ded9cf] bg-gradient-to-br from-white via-[#fbfaf6] to-blue-50 p-7 shadow-[0_22px_70px_rgba(31,29,23,0.10)] md:p-10">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-black text-blue-800">
              Module 1
            </span>
            <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-black text-emerald-800">
              Lesson 1.2
            </span>
            <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-black text-blue-800">
              Zero coding
            </span>
            <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-black text-amber-800">
              Study design
            </span>
          </div>

          <h1 className="mt-6 max-w-5xl text-4xl font-black tracking-[-0.06em] md:text-6xl">
            Populations, samples and variables
          </h1>

          <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-600">
            Every statistical study has a structure. Before calculating
            anything, we must know who or what the study is about, what part of
            that group was observed, and which characteristics were measured.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-4">
            <div className="rounded-2xl border border-[#ded9cf] bg-white/80 p-4">
              <p className="text-xs font-bold text-neutral-700">Time</p>
              <p className="mt-1 text-lg font-black">45–55 min</p>
            </div>
            <div className="rounded-2xl border border-[#ded9cf] bg-white/80 p-4">
              <p className="text-xs font-bold text-neutral-700">Level</p>
              <p className="mt-1 text-lg font-black">Foundation+</p>
            </div>
            <div className="rounded-2xl border border-[#ded9cf] bg-white/80 p-4">
              <p className="text-xs font-bold text-neutral-700">Focus</p>
              <p className="mt-1 text-lg font-black">Study structure</p>
            </div>
            <div className="rounded-2xl border border-[#ded9cf] bg-white/80 p-4">
              <p className="text-xs font-bold text-neutral-700">Coding</p>
              <p className="mt-1 text-lg font-black">None</p>
            </div>
          </div>
        </section>

        <div className="sticky top-0 z-20 mt-6 overflow-x-auto border-b border-[#ded9cf] bg-[#f2efe7]/95 py-3 backdrop-blur">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-black transition ${
                  activeTab === tab
                    ? "bg-neutral-950 text-white"
                    : "border border-[#ded9cf] bg-white text-neutral-600 hover:text-neutral-950"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <section className="mt-8">
          {activeTab === "Lecture" && (
            <div className="space-y-6">
              <SectionCard
                eyebrow="Conversational lecture"
                title="The class prepares its first real statistical study"
              >
                <div className="rounded-2xl bg-[#f8f6f1] px-4 py-3 text-sm font-bold text-neutral-600">
                  Scene: Mr. R asks the class to design a study about student
                  study habits.
                </div>

                <div className="space-y-4">
                  <DialogueLine speaker="Emma" initials="EM" tone="green">
                    Last lesson we said statistics helps us learn from data. But
                    whose data are we learning from?
                  </DialogueLine>

                  <DialogueLine speaker="Mr. R" initials="MR" right>
                    Excellent question. In any statistical study, we must
                    identify the population, sample, observational units and
                    variables before we interpret the results.
                  </DialogueLine>

                  <DialogueLine speaker="Oliver" initials="OL" tone="amber">
                    Population means everyone in the country, right?
                  </DialogueLine>

                  <DialogueLine speaker="Mr. R" initials="MR" right>
                    Not always. Population means the complete group we want to
                    understand. It could be all UK adults, all students in one
                    university, all patients in a clinic, all plants in a field
                    trial or all cells in a tissue sample.
                  </DialogueLine>

                  <DialogueLine speaker="James" initials="JA" tone="purple">
                    So the population depends on the research question?
                  </DialogueLine>

                  <DialogueLine speaker="Mr. R" initials="MR" right>
                    Exactly. Change the question and the population may change.
                    That is why careless wording can lead to wrong statistical
                    conclusions.
                  </DialogueLine>

                  <DialogueLine speaker="Sophia" initials="SO" tone="red">
                    And the sample is the part of the population we actually
                    observe?
                  </DialogueLine>

                  <DialogueLine speaker="Mr. R" initials="MR" right>
                    Correct. The sample gives evidence about the population, but
                    it may not perfectly represent it. That gap is one reason
                    statistical uncertainty exists.
                  </DialogueLine>
                </div>

                <DefinitionBox label="Big idea" tone="amber">
                  <p>
                    A statistical conclusion is only meaningful when we know who
                    or what the data represent, what was measured, and how the
                    observed sample relates to the target population.
                  </p>
                </DefinitionBox>
              </SectionCard>

              <SectionCard title="The four building blocks of a dataset">
                <p>
                  A statistical dataset is not just a spreadsheet. It has a
                  structure. The rows usually represent observational units. The
                  columns usually represent variables. The whole dataset is
                  usually a sample, and the sample is used to learn about a
                  population.
                </p>

                <div className="grid gap-4 md:grid-cols-4">
                  <div className="rounded-2xl border border-[#ded9cf] bg-blue-50 p-5">
                    <h3 className="font-black text-blue-950">Population</h3>
                    <p className="mt-2 text-sm leading-7 text-blue-900">
                      The full group we want to understand.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#ded9cf] bg-emerald-50 p-5">
                    <h3 className="font-black text-emerald-950">Sample</h3>
                    <p className="mt-2 text-sm leading-7 text-emerald-900">
                      The subset actually observed or measured.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#ded9cf] bg-amber-50 p-5">
                    <h3 className="font-black text-amber-950">Unit</h3>
                    <p className="mt-2 text-sm leading-7 text-amber-900">
                      The entity on which data are collected.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#ded9cf] bg-violet-50 p-5">
                    <h3 className="font-black text-violet-950">Variable</h3>
                    <p className="mt-2 text-sm leading-7 text-violet-900">
                      The characteristic measured on each unit.
                    </p>
                  </div>
                </div>
              </SectionCard>
            </div>
          )}

          {activeTab === "Detailed Notes" && (
            <div className="space-y-6">
              <SectionCard
                eyebrow="Detailed notes"
                title="Population: the target of the conclusion"
              >
                <p>
                  The population is the complete collection of individuals,
                  objects, cases or units that a study is about. It is not
                  necessarily large, and it is not necessarily human. A
                  population may be patients, students, hospitals, countries,
                  plants, cells, genes, households, days, schools or trials.
                </p>

                <DefinitionBox label="Definition" tone="blue">
                  <p>
                    A population is the complete set of units about which we
                    want to make a statement or draw a conclusion.
                  </p>
                </DefinitionBox>

                <p>
                  The population must be defined by the research question. For
                  example, “students” is vague. Does it mean all students in the
                  world, all students in one university, all first-year students,
                  or all students enrolled in a particular course?
                </p>

                <FormulaBlock>
                  Research question → target population → sample design →
                  variables measured
                </FormulaBlock>
              </SectionCard>

              <SectionCard title="Sample: the observed part of the population">
                <p>
                  A sample is the subset of the population that is actually
                  observed. We use samples because observing the entire
                  population may be impossible, expensive, slow or unnecessary.
                </p>

                <DefinitionBox label="Definition" tone="green">
                  <p>
                    A sample is the set of units from the population for which
                    data are actually collected.
                  </p>
                </DefinitionBox>

                <p>
                  The quality of a sample is not determined only by its size. A
                  smaller well-designed sample can be more useful than a very
                  large biased sample.
                </p>

                <DefinitionBox label="Important warning" tone="red">
                  <p>
                    A large sample does not automatically guarantee a trustworthy
                    conclusion. If the sampling process is biased, increasing
                    the sample size may only give a more precise version of the
                    wrong answer.
                  </p>
                </DefinitionBox>
              </SectionCard>

              <SectionCard title="Observational units and variables">
                <p>
                  The observational unit is the entity on which measurements are
                  taken. Variables are the characteristics recorded for each
                  observational unit.
                </p>

                <StatTable
                  rows={[
                    {
                      term: "Observational unit",
                      meaning:
                        "The entity being observed, measured or recorded.",
                      example:
                        "One student, one patient, one plant, one school, one country.",
                    },
                    {
                      term: "Variable",
                      meaning:
                        "A characteristic measured or recorded on each observational unit.",
                      example:
                        "Age, height, blood group, exam score, disease status.",
                    },
                    {
                      term: "Dataset row",
                      meaning:
                        "Often represents one observational unit.",
                      example:
                        "One row for one patient in a clinical dataset.",
                    },
                    {
                      term: "Dataset column",
                      meaning:
                        "Often represents one variable.",
                      example:
                        "A column for age, another for blood pressure.",
                    },
                  ]}
                />

                <FormulaBlock>
                  Dataset = observational units × variables
                </FormulaBlock>
              </SectionCard>

              <SectionCard title="Parameter versus statistic">
                <p>
                  A parameter is a numerical value describing the population. A
                  statistic is a numerical value calculated from the sample.
                  Parameters are usually unknown, while statistics are observed
                  from data.
                </p>

                <StatTable
                  rows={[
                    {
                      term: "Parameter",
                      meaning:
                        "A numerical feature of the population, often unknown.",
                      example:
                        "The true mean height of all students in a university.",
                    },
                    {
                      term: "Statistic",
                      meaning:
                        "A numerical feature calculated from the sample.",
                      example:
                        "The mean height of 120 surveyed students.",
                    },
                    {
                      term: "Estimator",
                      meaning:
                        "A rule or method used to estimate a parameter.",
                      example:
                        "Using the sample mean to estimate the population mean.",
                    },
                    {
                      term: "Estimate",
                      meaning:
                        "The numerical value produced by the estimator in one sample.",
                      example:
                        "The sample mean is 171.4 cm.",
                    },
                  ]}
                />

                <FormulaBlock>
                  Population mean: μ <br />
                  Sample mean: x̄ <br />
                  Population proportion: p <br />
                  Sample proportion: p̂
                </FormulaBlock>
              </SectionCard>

              <SectionCard title="Why this structure matters">
                <p>
                  Many statistical mistakes happen before any formula is used.
                  If the population is unclear, the conclusion is unclear. If
                  the sample is biased, the result may be misleading. If the
                  observational unit is confused, the analysis may use the wrong
                  level of information. If variables are misunderstood, the
                  wrong graph or summary may be chosen.
                </p>

                <DefinitionBox label="Core lesson" tone="purple">
                  <p>
                    Before analysing data, always ask: What is the population?
                    What is the sample? What is the observational unit? What are
                    the variables? What parameter do we want? What statistic do
                    we have?
                  </p>
                </DefinitionBox>
              </SectionCard>
            </div>
          )}

          {activeTab === "Interactive Lab" && (
            <div className="space-y-6">
              <StudyStructureLab />
              <VariableClassifierLab />

              <SectionCard eyebrow="Reflection" title="What should you notice?">
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    The population is defined by the research question, not by
                    the dataset alone.
                  </li>
                  <li>
                    The sample is the part of the population actually observed.
                  </li>
                  <li>
                    The observational unit is the object or individual being
                    measured.
                  </li>
                  <li>
                    Variables are measured characteristics, and their type
                    affects how they can be summarised.
                  </li>
                  <li>
                    Parameters belong to populations; statistics belong to
                    samples.
                  </li>
                </ul>
              </SectionCard>
            </div>
          )}

          {activeTab === "Worked Examples" && (
            <div className="space-y-5">
              <WorkedExample
                title="University survey"
                question="A university wants to estimate average weekly study time among all first-year students. It surveys 250 first-year students."
              >
                <p>
                  <strong>Population:</strong> all first-year students at the
                  university.
                </p>
                <p>
                  <strong>Sample:</strong> the 250 surveyed first-year students.
                </p>
                <p>
                  <strong>Observational unit:</strong> one first-year student.
                </p>
                <p>
                  <strong>Variable:</strong> weekly study time.
                </p>
                <p>
                  <strong>Parameter:</strong> the true average weekly study time
                  of all first-year students.
                </p>
                <p>
                  <strong>Statistic:</strong> the average weekly study time
                  calculated from the 250 surveyed students.
                </p>
              </WorkedExample>

              <WorkedExample
                title="Clinical records"
                question="A clinic reviews 600 patient records to estimate the proportion of adult patients with high blood pressure."
              >
                <p>
                  <strong>Population:</strong> all adult patients registered at
                  the clinic.
                </p>
                <p>
                  <strong>Sample:</strong> the 600 patient records reviewed.
                </p>
                <p>
                  <strong>Observational unit:</strong> one adult patient.
                </p>
                <p>
                  <strong>Variable:</strong> high blood pressure status.
                </p>
                <p>
                  <strong>Parameter:</strong> the true proportion of all adult
                  clinic patients with high blood pressure.
                </p>
                <p>
                  <strong>Statistic:</strong> the proportion of the 600 reviewed
                  patients with high blood pressure.
                </p>
              </WorkedExample>

              <WorkedExample
                title="When the observational unit is not a person"
                question="A researcher measures 200 leaves from 20 plants to study leaf length. What is the observational unit?"
              >
                <p>
                  This depends on the research question. If the question is
                  about leaf-level variation, the observational unit may be one
                  leaf.
                </p>
                <p>
                  If the question is about plant-level growth, the plant may be
                  the main observational unit, and the leaves are repeated
                  measurements within each plant.
                </p>
                <DefinitionBox label="Advanced warning" tone="red">
                  <p>
                    Confusing lower-level measurements with independent units
                    can lead to misleading results. This becomes important later
                    in clustered data, repeated measures and mixed models.
                  </p>
                </DefinitionBox>
              </WorkedExample>

              <WorkedExample
                title="Parameter or statistic?"
                question="A sample of 100 students has an average height of 170.5 cm. The university wants to estimate the true average height of all students."
              >
                <p>
                  <strong>170.5 cm</strong> is a statistic because it was
                  calculated from the sample.
                </p>
                <p>
                  The true average height of all students at the university is
                  the parameter.
                </p>
                <FormulaBlock>
                  Statistic: x̄ = 170.5 cm <br />
                  Parameter: μ = true population mean height
                </FormulaBlock>
              </WorkedExample>
            </div>
          )}

          {activeTab === "Quiz" && <QuizEngine />}
        </section>

        <section className="mt-8 flex flex-col gap-5 rounded-[1.7rem] bg-neutral-950 p-7 text-white shadow-xl md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-tight">
              Lesson complete
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70">
              Next, move to types of data. That lesson explains why the kind of
              variable determines the correct summary, graph and method.
            </p>
          </div>

          <a
            href="/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/types-of-data"
            className="rounded-full bg-white px-6 py-3 text-sm font-black text-neutral-950"
          >
            Next lesson →
          </a>
        </section>
      </div>
    </main>
  );
}