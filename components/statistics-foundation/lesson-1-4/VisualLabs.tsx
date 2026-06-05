"use client";

import { useMemo, useState } from "react";

const graphChoiceCards = [
  {
    question: "Blood group among 80 students",
    variableType: "Nominal categorical",
    bestGraph: "Bar chart",
    reason:
      "Blood group consists of unordered categories. A bar chart compares frequencies or percentages across categories.",
  },
  {
    question: "Height of 120 adults",
    variableType: "Continuous numerical",
    bestGraph: "Histogram or boxplot",
    reason:
      "Height is numerical and continuous. A histogram shows distribution shape; a boxplot shows median, spread and outliers.",
  },
  {
    question: "Pain severity: mild, moderate, severe",
    variableType: "Ordinal categorical",
    bestGraph: "Ordered bar chart",
    reason:
      "Pain severity has a natural order. The graph should preserve that order.",
  },
  {
    question: "Hours studied and exam score",
    variableType: "Two numerical variables",
    bestGraph: "Scatterplot",
    reason:
      "A scatterplot helps examine whether higher study time is associated with higher exam score.",
  },
  {
    question: "Monthly infection counts over one year",
    variableType: "Time-ordered numerical data",
    bestGraph: "Line graph",
    reason:
      "A line graph is useful when the order of time points matters and the aim is to see change over time.",
  },
  {
    question: "Exam scores in three teaching groups",
    variableType: "Numerical outcome by categorical group",
    bestGraph: "Side-by-side boxplots",
    reason:
      "Boxplots allow comparison of centre, spread and potential outliers across groups.",
  },
];

export function HistogramLab() {
  const [binWidth, setBinWidth] = useState(5);

  const scores = [
    42, 48, 51, 54, 56, 58, 59, 61, 63, 64, 66, 67, 69, 71, 72, 74, 75, 77,
    79, 80, 82, 85, 88, 91,
  ];

  const min = 40;
  const max = 95;

  const bins = useMemo(() => {
    const output = [];

    for (let start = min; start < max; start += binWidth) {
      const end = start + binWidth;
      const count = scores.filter(
        (score) => score >= start && score < end,
      ).length;

      output.push({ start, end, count });
    }

    return output;
  }, [binWidth]);

  const maxBinCount = Math.max(...bins.map((bin) => bin.count), 1);

  return (
    <div className="rounded-[1.7rem] border border-[#ded9cf] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
        Interactive lab 2
      </p>

      <h3 className="mt-2 text-2xl font-black tracking-tight">
        Histogram bin width
      </h3>

      <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5F5F5F]">
        A histogram groups numerical values into intervals. Change the bin width
        and notice how the visual impression changes. This is why a graph is a
        summary, not a neutral copy of raw data.
      </p>

      <div className="mt-6 rounded-2xl border border-[#ded9cf] bg-[#fbfaf6] p-5">
        <label className="text-sm font-black">Bin width: {binWidth}</label>

        <input
          type="range"
          min="5"
          max="15"
          step="5"
          value={binWidth}
          onChange={(event) => setBinWidth(Number(event.target.value))}
          className="mt-3 w-full accent-blue-700"
        />

        <div className="mt-8 flex h-72 items-end gap-2">
          {bins.map((bin) => (
            <div key={bin.start} className="flex flex-1 flex-col items-center">
              <div
                className="w-full rounded-t-xl bg-violet-600"
                style={{
                  height: `${(bin.count / maxBinCount) * 230}px`,
                }}
              />
              <span className="mt-2 rotate-[-35deg] text-[10px] font-bold text-[#525252]">
                {bin.start}-{bin.end}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm leading-7 text-[#5F5F5F]">
          Very narrow bins may look noisy. Very wide bins may hide structure.
          A histogram is a display of grouped numerical data, and grouping
          choices affect interpretation.
        </p>
      </div>
    </div>
  );
}

export function MisleadingAxisLab() {
  const [truncated, setTruncated] = useState(true);

  const values = [
    { label: "Method A", value: 51 },
    { label: "Method B", value: 54 },
  ];

  const axisStart = truncated ? 50 : 0;
  const axisEnd = truncated ? 55 : 55;

  return (
    <div className="rounded-[1.7rem] border border-[#ded9cf] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
        Interactive lab 3
      </p>

      <h3 className="mt-2 text-2xl font-black tracking-tight">
        How axis scales can mislead
      </h3>

      <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5F5F5F]">
        Both displays use the same values: 51% and 54%. Toggle the axis scale to
        see how a small numerical difference can look dramatic.
      </p>

      <div className="mt-6">
        <button
          onClick={() => setTruncated(!truncated)}
          className="rounded-full bg-[#11100E] px-5 py-3 text-sm font-black text-white"
        >
          {truncated ? "Show honest zero baseline" : "Show truncated axis"}
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-[#ded9cf] bg-[#fbfaf6] p-5">
        <p className="text-sm font-black">
          Current axis starts at {axisStart}%
        </p>

        <div className="mt-5 space-y-5">
          {values.map((item) => {
            const width =
              ((item.value - axisStart) / (axisEnd - axisStart)) * 100;

            return (
              <div key={item.label}>
                <div className="mb-1 flex justify-between text-sm font-bold text-[#525252]">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>

                <div className="h-10 rounded-full bg-[#FFFCF6]">
                  <div
                    className="h-10 rounded-full bg-red-600"
                    style={{ width: `${Math.max(width, 2)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 rounded-r-2xl border-l-4 border-red-600 bg-red-50 p-5 text-red-950">
          <p className="text-xs font-black uppercase tracking-[0.18em]">
            Interpretation warning
          </p>
          <p className="mt-2 text-sm leading-7">
            Truncated axes are not always wrong, but they must be clearly shown.
            If the visual difference looks much larger than the numerical
            difference, the graph may mislead the reader.
          </p>
        </div>
      </div>
    </div>
  );
}

export function GraphChoiceLab() {
  const [active, setActive] = useState(0);
  const card = graphChoiceCards[active];

  return (
    <div className="rounded-[1.7rem] border border-[#ded9cf] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
        Interactive lab 4
      </p>

      <h3 className="mt-2 text-2xl font-black tracking-tight">
        Choose the right graph
      </h3>

      <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5F5F5F]">
        Select a situation. The panel shows the variable type and the graph that
        best matches the question.
      </p>

      <div className="mt-6 grid gap-2 md:grid-cols-3">
        {graphChoiceCards.map((item, index) => (
          <button
            key={item.question}
            onClick={() => setActive(index)}
            className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
              active === index
                ? "border-stone-950 bg-[#11100E] text-white"
                : "border-[#ded9cf] bg-[#FFFCF6] text-[#525252] hover:bg-blue-50"
            }`}
          >
            {item.question}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-[#ded9cf] bg-blue-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-800">
            Variable type
          </p>
          <p className="mt-2 text-sm leading-7 text-blue-950">
            {card.variableType}
          </p>
        </div>

        <div className="rounded-2xl border border-[#ded9cf] bg-emerald-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-800">
            Best graph
          </p>
          <p className="mt-2 text-sm leading-7 text-emerald-950">
            {card.bestGraph}
          </p>
        </div>

        <div className="rounded-2xl border border-[#ded9cf] bg-amber-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-800">
            Reason
          </p>
          <p className="mt-2 text-sm leading-7 text-amber-950">
            {card.reason}
          </p>
        </div>
      </div>
    </div>
  );
}