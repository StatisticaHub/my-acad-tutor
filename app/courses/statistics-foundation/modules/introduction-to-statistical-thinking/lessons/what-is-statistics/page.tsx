"use client";

import { useMemo, useState } from "react";

const tabs = [
  "Lecture",
  "Detailed Notes",
  "Interactive Lab",
  "Worked Examples",
  "Quiz",
];

const populationData = [62, 68, 71, 74, 76, 79, 81, 84, 88, 92];

const studyCards = [
  {
    title: "University study time",
    question:
      "A university wants to estimate the average weekly study time of all first-year students.",
    population: "All first-year students at the university",
    sample: "The students who complete the study-time survey",
    variable: "Weekly study time",
    parameter: "True average weekly study time of all first-year students",
    statistic: "Average weekly study time in the surveyed students",
  },
  {
    title: "Clinic blood pressure",
    question:
      "A clinic wants to estimate the mean systolic blood pressure of its registered patients.",
    population: "All registered patients at the clinic",
    sample: "The patients whose blood pressure is measured",
    variable: "Systolic blood pressure",
    parameter: "True mean systolic blood pressure of all registered patients",
    statistic: "Mean systolic blood pressure in the measured patients",
  },
  {
    title: "Student satisfaction",
    question:
      "A department wants to understand satisfaction with a new statistics course.",
    population: "All students enrolled on the course",
    sample: "Students who respond to the satisfaction questionnaire",
    variable: "Satisfaction rating",
    parameter: "True average satisfaction level in the whole course",
    statistic: "Average satisfaction rating among respondents",
  },
];

const quizQuestions = [
  {
    question: "Which statement best describes statistics?",
    options: [
      "Statistics is only the calculation of averages.",
      "Statistics is the science of collecting, organising, analysing, interpreting and communicating data under uncertainty.",
      "Statistics is the same as pure mathematics.",
      "Statistics is only used when we observe every individual in a population.",
    ],
    answer: 1,
    feedback:
      "Statistics is not just calculation. It is a full discipline for learning from data while recognising variability and uncertainty.",
  },
  {
    question:
      "A university wants to know the average weekly study time of all first-year students, but surveys only 200 students. What are the 200 students called?",
    options: ["Population", "Sample", "Parameter", "Variable"],
    answer: 1,
    feedback:
      "The 200 students are the sample. The population is all first-year students.",
  },
  {
    question: "Which of the following is an example of inferential statistics?",
    options: [
      "Drawing a bar chart of the responses from a survey.",
      "Calculating the mean height of 30 students.",
      "Using a sample of 30 students to estimate the mean height of all students in the university.",
      "Listing every value in a dataset.",
    ],
    answer: 2,
    feedback:
      "Inferential statistics uses sample data to draw a conclusion about a wider population.",
  },
  {
    question: "Why does uncertainty appear in statistics?",
    options: [
      "Because statisticians avoid exact answers.",
      "Because samples, measurements and real-world systems vary.",
      "Because statistics ignores data.",
      "Because graphs are always misleading.",
    ],
    answer: 1,
    feedback:
      "Uncertainty appears because data vary across individuals, samples, measurements, contexts and repeated studies.",
  },
  {
    question:
      "A researcher calculates the mean exam score from a sample of 40 students. This mean is a:",
    options: ["Parameter", "Population", "Statistic", "Sampling frame"],
    answer: 2,
    feedback:
      "A value calculated from a sample is a statistic. A value describing the whole population is a parameter.",
  },
  {
    question:
      "Which question is most clearly descriptive rather than inferential?",
    options: [
      "What is the average mark among the 50 students in this dataset?",
      "What is the average mark among all students at the university based on this sample?",
      "Does this sample provide evidence that the new teaching method improves marks?",
      "Can we predict next year’s marks from this year’s sample?",
    ],
    answer: 0,
    feedback:
      "Descriptive statistics summarises the data actually observed. It does not automatically generalise to a wider population.",
  },
];

function mean(values: number[]) {
  return values.reduce((total, value) => total + value, 0) / values.length;
}

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

function StatTable({
  rows,
}: {
  rows: { label: string; meaning: string; example: string }[];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#ded9cf] bg-white">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
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
            <tr
              key={row.label}
              className="border-b border-[#ded9cf] last:border-0"
            >
              <td className="px-4 py-3 font-bold text-neutral-950">
                {row.label}
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

function InteractiveSamplingDemo() {
  const [sampleSize, setSampleSize] = useState(3);
  const sample = populationData.slice(0, sampleSize);
  const populationMean = mean(populationData);
  const sampleMean = mean(sample);
  const difference = sampleMean - populationMean;

  return (
    <div className="rounded-[1.7rem] border border-[#ded9cf] bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
            Interactive lab 1
          </p>
          <h3 className="mt-2 text-2xl font-black tracking-tight">
            Sample versus population
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600">
            Move the slider to change how many observations are included in the
            sample. Notice that the sample mean can differ from the population
            mean. This difference is not automatically a mistake; it is a basic
            feature of sampling.
          </p>
        </div>

        <div className="rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-900">
          Zero coding. Pure concept.
        </div>
      </div>

      <div className="mt-6">
        <label className="text-sm font-bold text-neutral-800">
          Sample size: {sampleSize}
        </label>
        <input
          type="range"
          min="2"
          max="10"
          value={sampleSize}
          onChange={(event) => setSampleSize(Number(event.target.value))}
          className="mt-3 w-full accent-blue-700"
        />
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-[#ded9cf] bg-[#f8f6f1] p-4">
          <p className="text-xs font-bold text-neutral-700">Population mean</p>
          <p className="mt-1 text-3xl font-black">
            {populationMean.toFixed(1)}
          </p>
        </div>

        <div className="rounded-2xl border border-[#ded9cf] bg-[#f8f6f1] p-4">
          <p className="text-xs font-bold text-neutral-700">Sample mean</p>
          <p className="mt-1 text-3xl font-black">{sampleMean.toFixed(1)}</p>
        </div>

        <div className="rounded-2xl border border-[#ded9cf] bg-[#f8f6f1] p-4">
          <p className="text-xs font-bold text-neutral-700">
            Sample mean − population mean
          </p>
          <p className="mt-1 text-3xl font-black">{difference.toFixed(1)}</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-[#ded9cf] bg-[#fbfaf6] p-5">
        <p className="mb-4 text-sm font-black">Population values</p>

        <div className="flex items-end gap-2">
          {populationData.map((value, index) => {
            const inSample = index < sampleSize;

            return (
              <div key={value} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className={`w-full rounded-t-xl ${
                    inSample ? "bg-blue-600" : "bg-neutral-300"
                  }`}
                  style={{ height: `${value * 1.6}px` }}
                />
                <span className="text-xs font-bold text-neutral-700">
                  {value}
                </span>
              </div>
            );
          })}
        </div>

        <p className="mt-5 text-sm leading-7 text-neutral-600">
          Blue bars are currently included in the sample. Grey bars belong to
          the population but are not yet sampled. The more limited the sample,
          the more careful we must be when generalising.
        </p>
      </div>
    </div>
  );
}

function InteractiveStudyClassifier() {
  const [active, setActive] = useState(0);
  const card = studyCards[active];

  return (
    <div className="rounded-[1.7rem] border border-[#ded9cf] bg-white p-6 shadow-sm md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
        Interactive lab 2
      </p>
      <h3 className="mt-2 text-2xl font-black tracking-tight">
        Break a study into statistical parts
      </h3>

      <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600">
        Choose a scenario and identify the population, sample, variable,
        parameter and statistic. This is one of the most important habits in
        early statistics.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {studyCards.map((study, index) => (
          <button
            key={study.title}
            onClick={() => setActive(index)}
            className={`rounded-full px-4 py-2 text-sm font-black transition ${
              active === index
                ? "bg-neutral-950 text-white"
                : "border border-[#ded9cf] bg-white text-neutral-600 hover:text-neutral-950"
            }`}
          >
            {study.title}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-[#ded9cf] bg-[#fbfaf6] p-5">
        <p className="text-sm font-black text-neutral-950">Research question</p>
        <p className="mt-2 text-sm leading-7 text-neutral-700">
          {card.question}
        </p>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-[#ded9cf] bg-blue-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-800">
            Population
          </p>
          <p className="mt-2 text-sm leading-7 text-blue-950">
            {card.population}
          </p>
        </div>

        <div className="rounded-2xl border border-[#ded9cf] bg-emerald-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-800">
            Sample
          </p>
          <p className="mt-2 text-sm leading-7 text-emerald-950">
            {card.sample}
          </p>
        </div>

        <div className="rounded-2xl border border-[#ded9cf] bg-amber-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-800">
            Variable
          </p>
          <p className="mt-2 text-sm leading-7 text-amber-950">
            {card.variable}
          </p>
        </div>

        <div className="rounded-2xl border border-[#ded9cf] bg-violet-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-violet-800">
            Parameter and statistic
          </p>
          <p className="mt-2 text-sm leading-7 text-violet-950">
            <strong>Parameter:</strong> {card.parameter}
          </p>
          <p className="mt-2 text-sm leading-7 text-violet-950">
            <strong>Statistic:</strong> {card.statistic}
          </p>
        </div>
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

export default function WhatIsStatisticsLessonPage() {
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
              Lesson 1.1
            </span>
            <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-black text-blue-800">
              Zero coding
            </span>
            <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-black text-amber-800">
              Interactive
            </span>
          </div>

          <h1 className="mt-6 max-w-5xl text-4xl font-black tracking-[-0.06em] md:text-6xl">
            What is statistics?
          </h1>

          <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-600">
            Statistics is the discipline of learning from data. In this lesson,
            you will understand why statistics exists, how it differs from raw
            calculation, and why uncertainty is central to statistical thinking.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-4">
            <div className="rounded-2xl border border-[#ded9cf] bg-white/80 p-4">
              <p className="text-xs font-bold text-neutral-700">Time</p>
              <p className="mt-1 text-lg font-black">40–50 min</p>
            </div>
            <div className="rounded-2xl border border-[#ded9cf] bg-white/80 p-4">
              <p className="text-xs font-bold text-neutral-700">Level</p>
              <p className="mt-1 text-lg font-black">Beginner</p>
            </div>
            <div className="rounded-2xl border border-[#ded9cf] bg-white/80 p-4">
              <p className="text-xs font-bold text-neutral-700">Focus</p>
              <p className="mt-1 text-lg font-black">Concepts</p>
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
                title="The first statistics class begins"
              >
                <div className="rounded-2xl bg-[#f8f6f1] px-4 py-3 text-sm font-bold text-neutral-600">
                  Scene: Mr. R walks into a university classroom. Emma, Oliver,
                  James and Sophia are opening a dataset for the first time.
                </div>

                <div className="space-y-4">
                  <DialogueLine speaker="Emma" initials="EM" tone="green">
                    I hear the word statistics everywhere: health reports,
                    sports, elections, research papers and social media. But
                    what exactly is statistics?
                  </DialogueLine>

                  <DialogueLine speaker="Mr. R" initials="MR" right>
                    Statistics is the discipline of learning from data. It
                    helps us collect data carefully, organise what we observe,
                    analyse patterns, interpret results and communicate
                    conclusions under uncertainty.
                  </DialogueLine>

                  <DialogueLine speaker="Oliver" initials="OL" tone="amber">
                    So statistics is not just calculating averages?
                  </DialogueLine>

                  <DialogueLine speaker="Mr. R" initials="MR" right>
                    Exactly. Averages are only one tool. Statistics is much
                    broader. It asks: What question are we trying to answer?
                    What data do we have? How reliable are those data? What
                    uncertainty remains?
                  </DialogueLine>

                  <DialogueLine speaker="James" initials="JA" tone="purple">
                    Why do we need uncertainty? If we have data, should the
                    answer not be obvious?
                  </DialogueLine>

                  <DialogueLine speaker="Mr. R" initials="MR" right>
                    Data are rarely complete. We often study a sample rather
                    than the entire population. Measurements contain variation.
                    People differ from each other. Samples differ from other
                    samples. Statistics gives us a language for reasoning in
                    this imperfect world.
                  </DialogueLine>

                  <DialogueLine speaker="Sophia" initials="SO" tone="red">
                    So statistics is not about pretending we know everything. It
                    is about being honest about what we know and what we do not
                    know.
                  </DialogueLine>

                  <DialogueLine speaker="Mr. R" initials="MR" right>
                    Perfect. That is the heart of statistical thinking.
                  </DialogueLine>
                </div>

                <DefinitionBox label="Big idea" tone="amber">
                  <p>
                    Statistics is the science of collecting, organising,
                    analysing, interpreting and communicating data in order to
                    answer questions under uncertainty.
                  </p>
                </DefinitionBox>
              </SectionCard>

              <SectionCard title="Why statistics exists">
                <p>
                  In real life, we rarely know everything. A doctor may study a
                  sample of patients rather than every patient in the country. A
                  university may survey some students rather than all students.
                  A public health team may estimate infection levels from
                  partial data. A researcher may measure some plants, some
                  cells, or some households, not all possible units.
                </p>

                <p>
                  Statistics exists because decisions must often be made using
                  incomplete but informative data. The aim is not to remove all
                  uncertainty. The aim is to understand uncertainty clearly
                  enough to make careful conclusions.
                </p>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-[#ded9cf] bg-[#fbfaf6] p-5">
                    <h3 className="text-lg font-black">Data</h3>
                    <p className="mt-2 text-sm leading-7 text-neutral-600">
                      Observed information: measurements, categories, counts,
                      responses, records or experimental results.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#ded9cf] bg-[#fbfaf6] p-5">
                    <h3 className="text-lg font-black">Variation</h3>
                    <p className="mt-2 text-sm leading-7 text-neutral-600">
                      Differences between individuals, samples, repeated
                      measurements, studies or real-world conditions.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#ded9cf] bg-[#fbfaf6] p-5">
                    <h3 className="text-lg font-black">Uncertainty</h3>
                    <p className="mt-2 text-sm leading-7 text-neutral-600">
                      The remaining doubt when we use limited data to make a
                      wider conclusion.
                    </p>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="The statistical way of thinking">
                <p>
                  A statistical thinker does not only ask, “What is the answer?”
                  A statistical thinker asks, “How was the data collected? What
                  population does it represent? What variation is present? What
                  assumptions are being made? What uncertainty remains?”
                </p>

                <FormulaBlock>
                  Good statistical thinking = clear question + suitable data +
                  awareness of variation + honest interpretation
                </FormulaBlock>

                <div className="space-y-4">
                  <DialogueLine speaker="Oliver" initials="OL" tone="amber">
                    So statistics is not just a set of formulas?
                  </DialogueLine>

                  <DialogueLine speaker="Mr. R" initials="MR" right>
                    Correct. Formulas are tools. But before using a formula, we
                    need to understand the question, the data source, the study
                    design and the meaning of the result.
                  </DialogueLine>

                  <DialogueLine speaker="Emma" initials="EM" tone="green">
                    Then a wrong study design can make even correct calculations
                    useless?
                  </DialogueLine>

                  <DialogueLine speaker="Mr. R" initials="MR" right>
                    Exactly. A perfectly calculated average from a biased sample
                    may still give a misleading conclusion.
                  </DialogueLine>
                </div>
              </SectionCard>
            </div>
          )}

          {activeTab === "Detailed Notes" && (
            <div className="space-y-6">
              <SectionCard
                eyebrow="Detailed notes"
                title="Statistics as a formal discipline"
              >
                <p>
                  Statistics begins with a question. A question may be
                  descriptive, comparative, predictive or causal. The question
                  determines what data should be collected, which variables are
                  important, what summaries are meaningful and what kind of
                  conclusion can be made.
                </p>

                <p>
                  The central problem is that we usually do not observe the
                  whole truth. We observe data, and data are partial, variable
                  and sometimes noisy. Statistics gives us a structured way to
                  move from data to evidence.
                </p>

                <FormulaBlock>
                  Statistical reasoning = question → data → summary → uncertainty
                  → interpretation
                </FormulaBlock>

                <DefinitionBox label="Definition" tone="blue">
                  <p>
                    Statistics is the science of learning from data. It includes
                    study design, data collection, data summary, modelling,
                    inference, decision-making and communication.
                  </p>
                </DefinitionBox>
              </SectionCard>

              <SectionCard title="The statistical investigation cycle">
                <p>
                  A useful way to understand statistics is to think of it as a
                  cycle rather than a single calculation.
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    {
                      step: "1",
                      title: "Ask a clear question",
                      text: "Define what you want to know. A vague question leads to vague analysis.",
                    },
                    {
                      step: "2",
                      title: "Identify the population",
                      text: "Decide who or what the conclusion is meant to describe.",
                    },
                    {
                      step: "3",
                      title: "Collect or obtain data",
                      text: "Choose a sample, measure variables and consider possible bias.",
                    },
                    {
                      step: "4",
                      title: "Summarise the data",
                      text: "Use tables, graphs and numerical summaries to understand the observed data.",
                    },
                    {
                      step: "5",
                      title: "Make inference if appropriate",
                      text: "Use sample data to estimate or test claims about a wider population.",
                    },
                    {
                      step: "6",
                      title: "Communicate carefully",
                      text: "Report the result, uncertainty, assumptions and limitations.",
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="rounded-2xl border border-[#ded9cf] bg-[#fbfaf6] p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-black text-blue-800">
                          {item.step}
                        </div>
                        <div>
                          <h3 className="font-black">{item.title}</h3>
                          <p className="mt-2 text-sm leading-7 text-neutral-600">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Descriptive statistics versus inferential statistics">
                <p>
                  Statistics is often divided into two major branches:
                  descriptive statistics and inferential statistics. They are
                  related, but they answer different kinds of questions.
                </p>

                <StatTable
                  rows={[
                    {
                      label: "Descriptive statistics",
                      meaning:
                        "Methods used to summarise and present the data we actually observed.",
                      example:
                        "Calculating the mean exam score of 40 students in one class.",
                    },
                    {
                      label: "Inferential statistics",
                      meaning:
                        "Methods used to draw conclusions about a wider population using sample data.",
                      example:
                        "Using 40 students to estimate the average exam score of all students on the course.",
                    },
                    {
                      label: "Statistical communication",
                      meaning:
                        "Explaining results clearly, honestly and with appropriate uncertainty.",
                      example:
                        "Reporting an estimate with a confidence interval and a careful interpretation.",
                    },
                  ]}
                />

                <DefinitionBox label="Common mistake" tone="red">
                  <p>
                    Descriptive statistics describe the observed dataset. They do
                    not automatically prove that the same pattern holds in the
                    wider population.
                  </p>
                </DefinitionBox>
              </SectionCard>

              <SectionCard title="Population, sample, parameter and statistic">
                <p>
                  A population is the complete group we want to understand. A
                  sample is the part of the population we actually observe. A
                  parameter is a numerical feature of the population. A
                  statistic is a numerical feature calculated from the sample.
                </p>

                <FormulaBlock>
                  Population → Parameter <br />
                  Sample → Statistic
                </FormulaBlock>

                <StatTable
                  rows={[
                    {
                      label: "Population",
                      meaning: "The full group of interest.",
                      example: "All first-year students at a university.",
                    },
                    {
                      label: "Sample",
                      meaning: "The observed subset of the population.",
                      example: "200 first-year students who completed a survey.",
                    },
                    {
                      label: "Parameter",
                      meaning:
                        "A numerical value describing the population, often unknown.",
                      example:
                        "The true average weekly study time of all first-year students.",
                    },
                    {
                      label: "Statistic",
                      meaning:
                        "A numerical value calculated from the sample data.",
                      example:
                        "The average weekly study time among the 200 surveyed students.",
                    },
                  ]}
                />

                <FormulaBlock>
                  Population mean: μ <br />
                  Sample mean: x̄
                </FormulaBlock>

                <p>
                  The sample mean x̄ is often used to estimate the population
                  mean μ. The difference between them is not automatically an
                  error; it is a natural consequence of sampling variation.
                </p>
              </SectionCard>

              <SectionCard title="Why uncertainty is unavoidable">
                <p>
                  Uncertainty appears for several reasons. We may observe only a
                  sample. Measurements may contain error. Individuals differ
                  naturally. The same process may give different results at
                  different times. A statistical conclusion is strong only when
                  these sources of uncertainty are acknowledged.
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <DefinitionBox label="Sampling variation" tone="purple">
                    <p>
                      Different samples from the same population can produce
                      different sample statistics.
                    </p>
                  </DefinitionBox>

                  <DefinitionBox label="Measurement variation" tone="amber">
                    <p>
                      Repeated measurements may differ because instruments,
                      observers or conditions vary.
                    </p>
                  </DefinitionBox>

                  <DefinitionBox label="Selection bias" tone="red">
                    <p>
                      A sample may systematically differ from the population it
                      is meant to represent.
                    </p>
                  </DefinitionBox>

                  <DefinitionBox label="Natural variability" tone="green">
                    <p>
                      Real individuals, patients, students, plants or objects
                      naturally differ from each other.
                    </p>
                  </DefinitionBox>
                </div>
              </SectionCard>
            </div>
          )}

          {activeTab === "Interactive Lab" && (
            <div className="space-y-6">
              <InteractiveSamplingDemo />
              <InteractiveStudyClassifier />

              <SectionCard
                eyebrow="Reflection"
                title="What should you notice?"
              >
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    Small samples can give summaries that differ noticeably from
                    the population summary.
                  </li>
                  <li>
                    Larger samples often give more stable summaries, but they
                    still depend on how the sample was selected.
                  </li>
                  <li>
                    Statistics is not only about the final number. It is also
                    about how trustworthy that number is.
                  </li>
                  <li>
                    Before calculating anything, identify the population,
                    sample, variable, parameter and statistic.
                  </li>
                </ul>
              </SectionCard>
            </div>
          )}

          {activeTab === "Worked Examples" && (
            <div className="space-y-5">
              <WorkedExample
                title="Identify population and sample"
                question="A researcher wants to study sleep quality among all undergraduate students at a university. She surveys 300 students."
              >
                <p>
                  <strong>Population:</strong> all undergraduate students at the
                  university.
                </p>
                <p>
                  <strong>Sample:</strong> the 300 students who were surveyed.
                </p>
                <p>
                  <strong>Variable:</strong> sleep quality, which might be
                  measured using hours of sleep, a rating scale, or a sleep
                  quality score.
                </p>
                <p>
                  The researcher should be careful. If the 300 students were
                  selected only from one department or only from students who
                  volunteered, the sample may not represent the full population.
                </p>
              </WorkedExample>

              <WorkedExample
                title="Parameter or statistic?"
                question="In a sample of 80 patients, the mean systolic blood pressure is 132 mmHg. The researcher wants to estimate the mean systolic blood pressure of all patients in the clinic."
              >
                <p>
                  The value <strong>132 mmHg</strong> is a statistic because it
                  is calculated from the sample of 80 patients.
                </p>
                <p>
                  The unknown mean systolic blood pressure of all patients in
                  the clinic is the parameter.
                </p>
                <FormulaBlock>
                  Sample statistic: x̄ = 132 <br />
                  Population parameter: μ = unknown
                </FormulaBlock>
              </WorkedExample>

              <WorkedExample
                title="Descriptive or inferential?"
                question="A class has 35 students. Their average exam score is 68%. The teacher says this class performed better than last year’s class."
              >
                <p>
                  Calculating the average score of the 35 students is
                  descriptive statistics.
                </p>
                <p>
                  Comparing this class with last year’s class may become
                  inferential if the teacher wants to make a broader claim about
                  teaching methods or student ability beyond the observed
                  classes.
                </p>
                <p>
                  A strong statistical answer would ask whether the difference
                  could be due to natural variation, different exam difficulty,
                  different students, or a real change in performance.
                </p>
              </WorkedExample>

              <WorkedExample
                title="Why a large biased sample can still be weak"
                question="A website poll receives 20,000 responses about student satisfaction. Most responses come from students who were already unhappy with the course."
              >
                <p>
                  The sample is large, but it may be biased. Large sample size
                  reduces random sampling variation, but it does not remove
                  systematic selection bias.
                </p>
                <p>
                  If unhappy students were more likely to respond, the sample
                  may overestimate dissatisfaction.
                </p>
                <DefinitionBox label="Key lesson" tone="red">
                  <p>
                    A large biased sample can be less useful than a smaller
                    carefully selected sample.
                  </p>
                </DefinitionBox>
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
            <p className="mt-2 max-w-2xl text-sm leading-7 text-white/90">
              Next, move to populations, samples and variables. That lesson
              will make the structure of every statistical study much clearer.
            </p>
          </div>

          <a
            href="/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/populations-samples-variables"
            className="rounded-full bg-white px-6 py-3 text-sm font-black text-neutral-950"
          >
            Next lesson →
          </a>
        </section>
      </div>
    </main>
  );
}