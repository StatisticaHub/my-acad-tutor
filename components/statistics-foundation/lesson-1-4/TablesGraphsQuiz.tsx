"use client";

import { useMemo, useState } from "react";

const quizQuestions = [
  {
    question:
      "Which graph is usually most appropriate for a nominal categorical variable?",
    options: ["Histogram", "Bar chart", "Scatterplot", "Boxplot"],
    answer: 1,
    feedback:
      "A bar chart is usually appropriate for nominal categorical data because it compares category frequencies or percentages.",
  },
  {
    question:
      "Which graph is usually most appropriate for showing the distribution of a continuous numerical variable?",
    options: [
      "Histogram",
      "Pie chart",
      "Stacked bar chart",
      "Frequency table only",
    ],
    answer: 0,
    feedback:
      "A histogram shows the distribution of a numerical variable by grouping values into intervals.",
  },
  {
    question: "What is the main purpose of a frequency table?",
    options: [
      "To show how often values or categories occur",
      "To prove causation",
      "To estimate a regression coefficient",
      "To remove outliers automatically",
    ],
    answer: 0,
    feedback:
      "A frequency table organises data by showing counts and often relative frequencies or percentages.",
  },
  {
    question:
      "A bar chart compares 51% and 54%, but the vertical axis starts at 50%. Why may this be misleading?",
    options: [
      "It makes the two percentages impossible to calculate",
      "It may visually exaggerate a small difference",
      "It changes categorical data into numerical data",
      "It removes the sample size",
    ],
    answer: 1,
    feedback:
      "A truncated axis can make small differences appear visually large.",
  },
  {
    question:
      "Which graph is most useful for studying the relationship between two numerical variables?",
    options: ["Bar chart", "Pie chart", "Scatterplot", "Frequency table"],
    answer: 2,
    feedback:
      "A scatterplot is used to examine the relationship between two numerical variables.",
  },
  {
    question:
      "Why should graph choice depend on the variable type?",
    options: [
      "Because different variables support different meaningful comparisons",
      "Because all graphs work equally well",
      "Because graphs are only decorative",
      "Because categorical variables must always use histograms",
    ],
    answer: 0,
    feedback:
      "The type of variable determines which comparisons, summaries and visual displays are meaningful.",
  },
  {
    question:
      "Which display is most useful for comparing the distribution of exam scores between two classes?",
    options: [
      "Two boxplots side by side",
      "A pie chart",
      "A single frequency table with names",
      "A 3D exploded chart",
    ],
    answer: 0,
    feedback:
      "Side-by-side boxplots are useful for comparing centre, spread and possible outliers between groups.",
  },
  {
    question: "What is one limitation of a boxplot?",
    options: [
      "It cannot show the median",
      "It hides detailed distribution shape",
      "It cannot compare groups",
      "It only works for categorical data",
    ],
    answer: 1,
    feedback:
      "A boxplot is compact and useful, but it hides fine details such as multimodality or gaps.",
  },
];

export function TablesGraphsQuiz() {
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);

  const score = useMemo(() => {
    return quizQuestions.reduce((total, question, index) => {
      return selected[index] === question.answer ? total + 1 : total;
    }, 0);
  }, [selected]);

  return (
    <div className="rounded-[1.7rem] border border-[#ded9cf] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
            Quiz
          </p>

          <h3 className="mt-2 text-2xl font-black tracking-tight">
            Check your understanding
          </h3>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5F5F5F]">
            Test whether you can choose appropriate tables and graphs, recognise
            misleading displays and connect visual choices to variable type.
          </p>
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
                        : "border-[#ded9cf] bg-[#FFFCF6] text-[#525252] hover:bg-blue-50"
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
              <p className="mt-4 rounded-xl bg-[#FFFCF6] p-4 text-sm leading-7 text-[#525252]">
                {question.feedback}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() => setChecked(true)}
          className="rounded-full bg-[#11100E] px-6 py-3 text-sm font-black text-white"
        >
          Check answers
        </button>

        <button
          onClick={() => {
            setSelected({});
            setChecked(false);
          }}
          className="rounded-full border border-[#ded9cf] bg-[#FFFCF6] px-6 py-3 text-sm font-black text-[#141210]"
        >
          Reset quiz
        </button>
      </div>
    </div>
  );
}