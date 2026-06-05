"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { FrequencyTableLab } from "./FrequencyTableLab";
import { GraphChoiceLab, HistogramLab, MisleadingAxisLab } from "./VisualLabs";
import { TablesGraphsQuiz } from "./TablesGraphsQuiz";

const tabs = [
  "Lecture",
  "Detailed Notes",
  "Interactive Lab",
  "Worked Examples",
  "Quiz",
];

function DefinitionBox({
  label,
  children,
  tone = "blue",
}: {
  label: string;
  children: ReactNode;
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
  children: ReactNode;
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
        <p className="mb-1 text-xs font-bold text-[#525252]">{speaker}</p>
        <div className="text-sm leading-7 text-neutral-800">{children}</div>
      </div>
    </div>
  );
}

function FormulaBlock({ children }: { children: ReactNode }) {
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
  children: ReactNode;
}) {
  return (
    <div className="rounded-[1.7rem] border border-[#ded9cf] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
      {eyebrow && (
        <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-3xl font-black tracking-tight">{title}</h2>
      <div className="mt-5 space-y-4 text-sm leading-8 text-[#525252]">
        {children}
      </div>
    </div>
  );
}

function DisplayTable() {
  const rows = [
    {
      display: "Frequency table",
      bestFor: "Categorical variables and discrete numerical variables",
      shows: "Counts, relative frequencies, percentages and cumulative totals",
      warning: "Large tables can become difficult to interpret visually.",
    },
    {
      display: "Bar chart",
      bestFor: "Nominal or ordinal categorical variables",
      shows: "Comparison of category frequencies or percentages",
      warning:
        "Bars should not imply continuity when categories are separate.",
    },
    {
      display: "Histogram",
      bestFor: "Continuous numerical variables",
      shows: "Distribution shape, skewness, spread, peaks and gaps",
      warning: "Bin width can change the visual impression.",
    },
    {
      display: "Boxplot",
      bestFor: "Numerical variables, especially across groups",
      shows: "Median, quartiles, spread and possible outliers",
      warning: "It hides detailed distribution shape and sample size detail.",
    },
    {
      display: "Scatterplot",
      bestFor: "Two numerical variables",
      shows: "Association, trend, clusters and unusual observations",
      warning: "Association does not automatically imply causation.",
    },
    {
      display: "Line graph",
      bestFor: "Time-ordered numerical data",
      shows: "Change over time",
      warning:
        "Only connect points when the ordering is meaningful and continuity is sensible.",
    },
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#ded9cf] bg-[#FFFCF6]">
      <table className="w-full min-w-[920px] border-collapse text-left text-sm">
        <thead className="bg-[#f8f6f1]">
          <tr>
            {["Display", "Best for", "What it shows", "Warning"].map((head) => (
              <th
                key={head}
                className="border-b border-[#ded9cf] px-4 py-3 font-black"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr
              key={row.display}
              className="border-b border-[#ded9cf] last:border-0"
            >
              <td className="px-4 py-3 font-bold text-[#141210]">
                {row.display}
              </td>
              <td className="px-4 py-3 leading-6 text-[#5F5F5F]">
                {row.bestFor}
              </td>
              <td className="px-4 py-3 leading-6 text-[#5F5F5F]">
                {row.shows}
              </td>
              <td className="px-4 py-3 leading-6 text-[#5F5F5F]">
                {row.warning}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-[#ded9cf] bg-[#FFFCF6] shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">
            Worked example
          </p>
          <h3 className="mt-1 text-lg font-black">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-[#5F5F5F]">{question}</p>
        </div>

        <span className="rounded-full border border-[#ded9cf] px-3 py-1 text-sm font-bold">
          {open ? "Hide" : "Show"}
        </span>
      </button>

      {open && (
        <div className="space-y-3 border-t border-[#ded9cf] bg-[#fbfaf6] p-5 text-sm leading-7 text-[#525252]">
          {children}
        </div>
      )}
    </div>
  );
}

export default function TablesAndGraphsLesson() {
  const [activeTab, setActiveTab] = useState("Lecture");

  return (
    <main className="min-h-screen bg-[#f2efe7] text-[#141210]">
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
            className="rounded-full border border-[#ded9cf] bg-[#FFFCF6] px-4 py-2 text-sm font-bold text-[#525252] hover:text-[#141210]"
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
              Lesson 1.4
            </span>
            <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-black text-blue-800">
              Zero coding
            </span>
            <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-black text-amber-800">
              Visual reasoning
            </span>
          </div>

          <h1 className="mt-6 max-w-5xl text-3xl font-black tracking-[-0.045em] sm:text-4xl md:text-6xl">
            Tables and graphs
          </h1>

          <p className="mt-5 max-w-4xl text-base leading-8 text-[#5F5F5F]">
            Tables organise data precisely. Graphs reveal patterns visually. In
            this lesson, you will learn how to choose displays that match the
            variable type, the research question and the statistical message.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {[
              ["Time", "65–75 min"],
              ["Level", "Foundation+"],
              ["Focus", "Data display"],
              ["Coding", "None"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-[#ded9cf] bg-[#FFFCF6]/80 p-4"
              >
                <p className="text-xs font-bold text-[#525252]">{label}</p>
                <p className="mt-1 text-lg font-black">{value}</p>
              </div>
            ))}
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
                    ? "bg-[#11100E] text-white"
                    : "border border-[#ded9cf] bg-[#FFFCF6] text-[#5F5F5F] hover:text-[#141210]"
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
                title="The class has data, but the spreadsheet is hard to read"
              >
                <div className="rounded-2xl bg-[#f8f6f1] px-4 py-3 text-sm font-bold text-[#5F5F5F]">
                  Scene: Mr. R opens a raw spreadsheet. Rows and columns are
                  visible, but the pattern is not obvious.
                </div>

                <div className="space-y-4">
                  <DialogueLine speaker="Emma" initials="EM" tone="green">
                    We have the data now, but the spreadsheet looks messy. How
                    do we make sense of it?
                  </DialogueLine>

                  <DialogueLine speaker="Mr. R" initials="MR" right>
                    We organise data using tables and graphs. Tables give exact
                    values. Graphs help us see patterns, comparisons,
                    distributions, relationships and unusual observations.
                  </DialogueLine>

                  <DialogueLine speaker="Oliver" initials="OL" tone="amber">
                    So graphs are just for making results look nice?
                  </DialogueLine>

                  <DialogueLine speaker="Mr. R" initials="MR" right>
                    No. A good graph is not decoration. It is a statistical
                    argument. It should reveal structure without misleading the
                    reader.
                  </DialogueLine>

                  <DialogueLine speaker="James" initials="JA" tone="purple">
                    Can a graph be mathematically correct but still misleading?
                  </DialogueLine>

                  <DialogueLine speaker="Mr. R" initials="MR" right>
                    Yes. Poor axis scales, missing labels, inappropriate graph
                    choice, 3D effects and selective displays can all distort
                    interpretation.
                  </DialogueLine>

                  <DialogueLine speaker="Sophia" initials="SO" tone="red">
                    So the best graph depends on the type of variable and the
                    question?
                  </DialogueLine>

                  <DialogueLine speaker="Mr. R" initials="MR" right>
                    Exactly. We do not choose graphs by habit. We choose them by
                    statistical purpose.
                  </DialogueLine>
                </div>

                <DefinitionBox label="Big idea" tone="amber">
                  <p>
                    Tables organise data precisely. Graphs reveal patterns
                    visually. Both should match the variable type, the research
                    question and the conclusion being communicated.
                  </p>
                </DefinitionBox>
              </SectionCard>

              <SectionCard title="What tables and graphs help us see">
                <p>
                  Before formal statistical analysis, tables and graphs help us
                  understand the structure of a dataset. They can reveal common
                  categories, typical values, spread, skewness, outliers, group
                  differences, relationships, gaps, clusters and possible data
                  errors.
                </p>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-[#ded9cf] bg-blue-50 p-5">
                    <h3 className="text-lg font-black text-blue-950">
                      Frequencies
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-blue-900">
                      How often each value or category occurs.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#ded9cf] bg-emerald-50 p-5">
                    <h3 className="text-lg font-black text-emerald-950">
                      Distributions
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-emerald-900">
                      Shape, centre, spread and unusual values of numerical
                      data.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#ded9cf] bg-violet-50 p-5">
                    <h3 className="text-lg font-black text-violet-950">
                      Relationships
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-violet-900">
                      How two variables move together or differ across groups.
                    </p>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="A graph should answer a question">
                <p>
                  A weak graph says, “Here is some data.” A strong graph says,
                  “Here is the pattern relevant to the question.” Before making
                  a graph, ask what comparison or structure the reader needs to
                  see.
                </p>

                <FormulaBlock>
                  Research question → variable type → statistical comparison →
                  table or graph
                </FormulaBlock>

                <DefinitionBox label="Design principle" tone="purple">
                  <p>
                    A statistical display should reduce confusion, not add
                    decoration. The best graph is usually the one that makes the
                    intended comparison easiest to understand.
                  </p>
                </DefinitionBox>
              </SectionCard>
            </div>
          )}

          {activeTab === "Detailed Notes" && (
            <div className="space-y-6">
              <SectionCard eyebrow="Detailed notes" title="Frequency tables">
                <p>
                  A frequency table shows how often each value or category
                  occurs. It is especially useful for categorical variables and
                  discrete numerical variables. A complete frequency table may
                  include frequency, relative frequency, percentage and
                  cumulative frequency.
                </p>

                <FormulaBlock>
                  Relative frequency = frequency ÷ total frequency
                  <br />
                  Percentage = relative frequency × 100
                  <br />
                  Cumulative frequency = running total of frequencies
                </FormulaBlock>

                <DefinitionBox label="Definition" tone="blue">
                  <p>
                    A frequency table is a table that organises data by listing
                    values or categories together with their counts, relative
                    frequencies, percentages or cumulative frequencies.
                  </p>
                </DefinitionBox>
              </SectionCard>

              <SectionCard title="Choosing the correct display">
                <p>
                  Graph choice should depend on both the variable type and the
                  purpose of the display. The same dataset can be displayed in
                  several ways, but not every display answers the same question.
                </p>
                <DisplayTable />
              </SectionCard>

              <SectionCard title="Bar charts versus histograms">
                <p>
                  Bar charts and histograms may look similar, but they represent
                  different ideas. A bar chart compares categories. A histogram
                  displays the distribution of a numerical variable grouped into
                  intervals.
                </p>

                <FormulaBlock>
                  Bar chart → separate categories
                  <br />
                  Histogram → adjacent numerical intervals
                </FormulaBlock>

                <DefinitionBox label="Common mistake" tone="red">
                  <p>
                    Do not use a histogram for unordered categories. Do not use a
                    bar chart when the main aim is to study the shape of a
                    continuous numerical distribution.
                  </p>
                </DefinitionBox>
              </SectionCard>

              <SectionCard title="Misleading graphs">
                <p>
                  A graph can be technically based on data and still mislead the
                  reader. Good statistical graphics should make comparison easy,
                  preserve scale honestly, label axes clearly and avoid visual
                  decoration that changes interpretation.
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <DefinitionBox label="Truncated axis" tone="red">
                    <p>
                      Starting the axis far above zero can exaggerate small
                      differences.
                    </p>
                  </DefinitionBox>

                  <DefinitionBox label="Missing labels" tone="amber">
                    <p>
                      Without clear axes, units and titles, the reader may not
                      know what is being compared.
                    </p>
                  </DefinitionBox>

                  <DefinitionBox label="Wrong graph type" tone="blue">
                    <p>
                      Using a graph that does not match the variable type can
                      hide the actual structure of the data.
                    </p>
                  </DefinitionBox>

                  <DefinitionBox label="Decorative distortion" tone="purple">
                    <p>
                      Three-dimensional effects and visual decoration can distort
                      size, area and comparison.
                    </p>
                  </DefinitionBox>
                </div>
              </SectionCard>
            </div>
          )}

          {activeTab === "Interactive Lab" && (
            <div className="space-y-6">
              <FrequencyTableLab />
              <HistogramLab />
              <MisleadingAxisLab />
              <GraphChoiceLab />

              <SectionCard eyebrow="Reflection" title="What should you notice?">
                <ul className="list-disc space-y-2 pl-5">
                  <li>Tables give exact values; graphs reveal visual patterns.</li>
                  <li>A bar chart is usually for categories.</li>
                  <li>A histogram is for numerical distributions.</li>
                  <li>Histogram bin width can change the visual story.</li>
                  <li>Axis choices can exaggerate or minimise differences.</li>
                  <li>
                    Graph choice should follow the variable type and research
                    question.
                  </li>
                </ul>
              </SectionCard>
            </div>
          )}

          {activeTab === "Worked Examples" && (
            <div className="space-y-5">
              <WorkedExample
                title="Creating a frequency table"
                question="A class records blood groups: A = 18, B = 12, AB = 6 and O = 24. Create relative frequencies and percentages."
              >
                <p>The total frequency is 18 + 12 + 6 + 24 = 60.</p>
                <FormulaBlock>
                  Relative frequency for A = 18 ÷ 60 = 0.30
                  <br />
                  Percentage for A = 0.30 × 100 = 30%
                </FormulaBlock>
                <p>
                  Similarly, B = 20%, AB = 10% and O = 40%. A frequency table
                  should include category, count, relative frequency and
                  percentage.
                </p>
              </WorkedExample>

              <WorkedExample
                title="Choosing a graph for categorical data"
                question="A researcher records the degree programme of 200 students. Which graph should be used?"
              >
                <p>
                  Degree programme is a nominal categorical variable. The best
                  graph is usually a bar chart showing the number or percentage
                  of students in each programme.
                </p>
              </WorkedExample>

              <WorkedExample
                title="Choosing a graph for numerical data"
                question="A clinic records systolic blood pressure for 500 patients. Which displays are useful?"
              >
                <p>
                  Systolic blood pressure is numerical and often treated as
                  continuous. A histogram can show the distribution shape. A
                  boxplot can show median, quartiles, spread and possible
                  outliers.
                </p>
              </WorkedExample>

              <WorkedExample
                title="Spotting a misleading graph"
                question="A graph compares 51% and 54%, but the y-axis starts at 50%. The bars look dramatically different."
              >
                <p>
                  The graph exaggerates the difference because the y-axis is
                  truncated. The actual difference is only 3 percentage points.
                </p>
                <DefinitionBox label="Interpretation" tone="red">
                  <p>
                    A responsible graph should make the scale clear and avoid
                    exaggeration.
                  </p>
                </DefinitionBox>
              </WorkedExample>
            </div>
          )}

          {activeTab === "Quiz" && <TablesGraphsQuiz />}
        </section>

        <section className="mt-8 flex flex-col gap-5 rounded-[1.7rem] bg-[#11100E] p-7 text-white shadow-xl md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-tight">
              Lesson complete
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-white/90">
              Next, move to sampling methods. That lesson explains how the way
              we select data affects whether conclusions can be trusted.
            </p>
          </div>

          <a
            href="/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/sampling-methods"
            className="rounded-full bg-[#FFFCF6] px-6 py-3 text-sm font-black text-[#141210]"
          >
            Next lesson →
          </a>
        </section>
      </div>
    </main>
  );
}