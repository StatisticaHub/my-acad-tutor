"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";

const tabs = [
  "Lecture",
  "Detailed Notes",
  "Interactive Lab",
  "Worked Examples",
  "Quiz",
];

const methods = [
  {
    name: "Simple random sampling",
    idea: "Every unit in the population has a known and equal chance of selection.",
    example:
      "A university has a complete list of 10,000 students and randomly selects 500 student IDs.",
    strength:
      "Conceptually clean, mathematically simple, and supports formal inference.",
    weakness:
      "Requires a complete sampling frame and may miss small subgroups by chance.",
  },
  {
    name: "Systematic sampling",
    idea: "Choose every kth unit from an ordered list after a random starting point.",
    example:
      "From 2,000 clinic records, randomly choose a starting record and then select every 10th record.",
    strength: "Simple, fast, and practical when a list already exists.",
    weakness:
      "Can be biased if the list has a hidden repeating pattern matching the sampling interval.",
  },
  {
    name: "Stratified sampling",
    idea: "Divide the population into important subgroups, then sample within each subgroup.",
    example:
      "Divide students by faculty, then randomly sample students from each faculty.",
    strength:
      "Ensures important subgroups are represented and can improve precision.",
    weakness: "Requires subgroup information before sampling begins.",
  },
  {
    name: "Cluster sampling",
    idea: "Divide the population into clusters, randomly select clusters, then study units inside selected clusters.",
    example:
      "Randomly select 10 schools, then survey students inside those schools.",
    strength:
      "Useful when individuals are naturally grouped or geographically spread out.",
    weakness:
      "Units within clusters may be similar, so the effective information may be lower than the raw sample size suggests.",
  },
  {
    name: "Convenience sampling",
    idea: "Select units that are easiest to reach.",
    example: "Survey students sitting near the library entrance.",
    strength: "Fast, cheap, and easy to organise.",
    weakness:
      "Often biased and weak for generalising to a wider population.",
  },
];

const quizQuestions = [
  {
    question:
      "Which sampling method gives every unit in the population a known and equal chance of selection?",
    options: [
      "Convenience sampling",
      "Simple random sampling",
      "Voluntary response sampling",
      "Snowball sampling",
    ],
    answer: 1,
    feedback:
      "Simple random sampling gives every unit in the population a known and equal chance of being selected.",
  },
  {
    question:
      "A researcher divides students by faculty and randomly samples students from each faculty. Which method is this?",
    options: [
      "Cluster sampling",
      "Stratified sampling",
      "Convenience sampling",
      "Systematic sampling",
    ],
    answer: 1,
    feedback:
      "This is stratified sampling because the population is divided into subgroups and sampling occurs within each subgroup.",
  },
  {
    question:
      "A researcher randomly chooses 10 schools and surveys all students in those schools. Which method is this closest to?",
    options: [
      "Cluster sampling",
      "Simple random sampling",
      "Systematic sampling",
      "Quota sampling",
    ],
    answer: 0,
    feedback:
      "Schools act as clusters. The researcher samples clusters rather than directly sampling individual students.",
  },
  {
    question: "Why can a large convenience sample still be unreliable?",
    options: [
      "Large samples are always unreliable",
      "It may be systematically different from the target population",
      "It cannot produce percentages",
      "It always has too much random variation",
    ],
    answer: 1,
    feedback:
      "A large sample can still be biased if the way it was selected systematically excludes or overrepresents certain groups.",
  },
  {
    question: "What is a sampling frame?",
    options: [
      "A graph used to show sample data",
      "A list or practical mechanism from which the sample is selected",
      "The final sample mean",
      "A type of histogram",
    ],
    answer: 1,
    feedback:
      "A sampling frame is the list, register, database, map, directory, or practical access route used to select the sample.",
  },
  {
    question: "Increasing the sample size mainly reduces:",
    options: [
      "Selection bias",
      "Random sampling variation",
      "Poor measurement definitions",
      "An unclear research question",
    ],
    answer: 1,
    feedback:
      "Increasing sample size mainly reduces random sampling variation. It does not automatically remove systematic bias.",
  },
  {
    question:
      "Which method is most appropriate when the researcher wants guaranteed representation from important subgroups?",
    options: [
      "Stratified sampling",
      "Convenience sampling",
      "Voluntary response sampling",
      "Cluster sampling only",
    ],
    answer: 0,
    feedback:
      "Stratified sampling is designed to ensure important subgroups are represented.",
  },
  {
    question:
      "In proportional stratified sampling, if a stratum makes up 30% of the population, approximately what percentage of the sample should come from that stratum?",
    options: ["10%", "30%", "50%", "100%"],
    answer: 1,
    feedback:
      "In proportional stratified sampling, the sample allocation follows the population proportion.",
  },
  {
    question:
      "A study aims to represent all elderly residents, but uses only an online survey. What is the main concern?",
    options: [
      "The sample size is automatically too large",
      "Coverage error",
      "The variable is continuous",
      "The graph type is wrong",
    ],
    answer: 1,
    feedback:
      "An online-only survey may exclude elderly residents without internet access, creating coverage error.",
  },
  {
    question:
      "In cluster sampling, why can the effective sample size be smaller than the raw sample size?",
    options: [
      "Because units within the same cluster may be similar",
      "Because clusters always remove bias",
      "Because all clusters have equal size",
      "Because histograms cannot be used",
    ],
    answer: 0,
    feedback:
      "When units within clusters are similar, each additional unit gives less new information.",
  },
  {
    question: "What does a basic sampling weight often approximate?",
    options: [
      "The probability of being wrong",
      "The inverse of the probability of selection",
      "The sample mean",
      "The histogram bin width",
    ],
    answer: 1,
    feedback:
      "A basic sampling weight is often approximately 1 divided by the probability of selection.",
  },
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
        <p className="mb-1 text-xs font-bold text-neutral-700">{speaker}</p>
        <div className="text-sm leading-7 text-neutral-800">{children}</div>
      </div>
    </div>
  );
}

function FormulaBlock({ children }: { children: ReactNode }) {
  return (
    <div className="my-5 overflow-x-auto rounded-2xl border border-[#ded9cf] bg-[#f8f6f1] px-5 py-4 text-center text-base font-semibold leading-8 text-neutral-900 md:text-lg">
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

function MethodTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#ded9cf] bg-white">
      <table className="w-full min-w-[980px] border-collapse text-left text-sm">
        <thead className="bg-[#f8f6f1]">
          <tr>
            {["Method", "Main idea", "Strength", "Risk"].map((head) => (
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
          {methods.map((method) => (
            <tr
              key={method.name}
              className="border-b border-[#ded9cf] last:border-0"
            >
              <td className="px-4 py-3 font-bold text-neutral-950">
                {method.name}
              </td>
              <td className="px-4 py-3 leading-6 text-neutral-600">
                {method.idea}
              </td>
              <td className="px-4 py-3 leading-6 text-neutral-600">
                {method.strength}
              </td>
              <td className="px-4 py-3 leading-6 text-neutral-600">
                {method.weakness}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MethodSelectorLab() {
  const [active, setActive] = useState(0);
  const method = methods[active];

  return (
    <div className="rounded-[1.7rem] border border-[#ded9cf] bg-white p-6 shadow-sm md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
        Interactive lab 1
      </p>
      <h3 className="mt-2 text-2xl font-black tracking-tight">
        Compare sampling methods
      </h3>

      <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600">
        Select a sampling method and compare its idea, example, strength and
        limitation.
      </p>

      <div className="mt-6 grid gap-2 md:grid-cols-5">
        {methods.map((item, index) => (
          <button
            key={item.name}
            onClick={() => setActive(index)}
            className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
              active === index
                ? "border-neutral-950 bg-neutral-950 text-white"
                : "border-[#ded9cf] bg-white text-neutral-700 hover:bg-blue-50"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-[#ded9cf] bg-blue-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-800">
            Main idea
          </p>
          <p className="mt-2 text-sm leading-7 text-blue-950">{method.idea}</p>
        </div>

        <div className="rounded-2xl border border-[#ded9cf] bg-emerald-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-800">
            Example
          </p>
          <p className="mt-2 text-sm leading-7 text-emerald-950">
            {method.example}
          </p>
        </div>

        <div className="rounded-2xl border border-[#ded9cf] bg-amber-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-800">
            Strength
          </p>
          <p className="mt-2 text-sm leading-7 text-amber-950">
            {method.strength}
          </p>
        </div>

        <div className="rounded-2xl border border-[#ded9cf] bg-red-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-red-800">
            Limitation
          </p>
          <p className="mt-2 text-sm leading-7 text-red-950">
            {method.weakness}
          </p>
        </div>
      </div>
    </div>
  );
}

function BiasVsSizeLab() {
  const [sampleSize, setSampleSize] = useState(50);
  const [bias, setBias] = useState(0);

  const trueMean = 70;
  const standardError = 20 / Math.sqrt(sampleSize);
  const expectedEstimate = trueMean + bias;

  return (
    <div className="rounded-[1.7rem] border border-[#ded9cf] bg-white p-6 shadow-sm md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
        Interactive lab 2
      </p>

      <h3 className="mt-2 text-2xl font-black tracking-tight">
        Sample size versus bias
      </h3>

      <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600">
        Increase the sample size and notice that random variation decreases.
        Then add selection bias and notice that a large biased sample can still
        point to the wrong value.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-[#ded9cf] bg-[#fbfaf6] p-5">
          <label className="text-sm font-black">
            Sample size: {sampleSize}
          </label>
          <input
            type="range"
            min="20"
            max="1000"
            step="10"
            value={sampleSize}
            onChange={(event) => setSampleSize(Number(event.target.value))}
            className="mt-3 w-full accent-blue-700"
          />
        </div>

        <div className="rounded-2xl border border-[#ded9cf] bg-[#fbfaf6] p-5">
          <label className="text-sm font-black">Selection bias: {bias}</label>
          <input
            type="range"
            min="-15"
            max="15"
            step="1"
            value={bias}
            onChange={(event) => setBias(Number(event.target.value))}
            className="mt-3 w-full accent-red-700"
          />
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-[#ded9cf] bg-blue-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-800">
            True population mean
          </p>
          <p className="mt-2 text-3xl font-black text-blue-950">{trueMean}</p>
        </div>

        <div className="rounded-2xl border border-[#ded9cf] bg-emerald-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-800">
            Approx. random error
          </p>
          <p className="mt-2 text-3xl font-black text-emerald-950">
            ±{standardError.toFixed(2)}
          </p>
        </div>

        <div className="rounded-2xl border border-[#ded9cf] bg-red-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-red-800">
            Expected biased estimate
          </p>
          <p className="mt-2 text-3xl font-black text-red-950">
            {expectedEstimate}
          </p>
        </div>
      </div>

      <DefinitionBox label="Key lesson" tone="red">
        <p>
          Increasing sample size reduces random sampling variation, but it does
          not automatically remove selection bias. A large biased sample can be
          precisely wrong.
        </p>
      </DefinitionBox>
    </div>
  );
}

function StratifiedAllocationLab() {
  const [sampleSize, setSampleSize] = useState(200);

  const strata = [
    { name: "Faculty A", size: 1200 },
    { name: "Faculty B", size: 800 },
    { name: "Faculty C", size: 500 },
    { name: "Faculty D", size: 500 },
  ];

  const totalPopulation = strata.reduce((sum, stratum) => sum + stratum.size, 0);

  const allocation = strata.map((stratum) => ({
    ...stratum,
    proportion: stratum.size / totalPopulation,
    sample: Math.round((stratum.size / totalPopulation) * sampleSize),
  }));

  return (
    <div className="rounded-[1.7rem] border border-[#ded9cf] bg-white p-6 shadow-sm md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
        Interactive lab 3
      </p>

      <h3 className="mt-2 text-2xl font-black tracking-tight">
        Proportional stratified allocation
      </h3>

      <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600">
        In stratified sampling, the sample size within each stratum can be made
        proportional to the size of that stratum in the population.
      </p>

      <div className="mt-6 rounded-2xl border border-[#ded9cf] bg-[#fbfaf6] p-5">
        <label className="text-sm font-black">
          Total sample size: {sampleSize}
        </label>
        <input
          type="range"
          min="100"
          max="600"
          step="25"
          value={sampleSize}
          onChange={(event) => setSampleSize(Number(event.target.value))}
          className="mt-3 w-full accent-blue-700"
        />
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-[#ded9cf] bg-white">
        <table className="w-full min-w-[700px] border-collapse text-left text-sm">
          <thead className="bg-[#f8f6f1]">
            <tr>
              <th className="border-b border-[#ded9cf] px-4 py-3 font-black">
                Stratum
              </th>
              <th className="border-b border-[#ded9cf] px-4 py-3 font-black">
                Population size
              </th>
              <th className="border-b border-[#ded9cf] px-4 py-3 font-black">
                Population proportion
              </th>
              <th className="border-b border-[#ded9cf] px-4 py-3 font-black">
                Sample allocation
              </th>
            </tr>
          </thead>

          <tbody>
            {allocation.map((row) => (
              <tr
                key={row.name}
                className="border-b border-[#ded9cf] last:border-0"
              >
                <td className="px-4 py-3 font-bold">{row.name}</td>
                <td className="px-4 py-3">{row.size}</td>
                <td className="px-4 py-3">{row.proportion.toFixed(3)}</td>
                <td className="px-4 py-3 font-black">{row.sample}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FormulaBlock>
        n<sub>h</sub> = n × N<sub>h</sub> / N
        <br />
        stratum sample size = total sample size × stratum population size ÷
        total population size
      </FormulaBlock>
    </div>
  );
}

function ClusterDesignEffectLab() {
  const [clusterSize, setClusterSize] = useState(10);
  const [rho, setRho] = useState(0.05);

  const designEffect = 1 + (clusterSize - 1) * rho;
  const rawSampleSize = 500;
  const effectiveSampleSize = rawSampleSize / designEffect;

  return (
    <div className="rounded-[1.7rem] border border-[#ded9cf] bg-white p-6 shadow-sm md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
        Interactive lab 4
      </p>

      <h3 className="mt-2 text-2xl font-black tracking-tight">
        Cluster sampling and design effect
      </h3>

      <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600">
        In cluster sampling, people within the same cluster may be similar. This
        reduces the amount of independent information. Change the cluster size
        and within-cluster similarity to see how the effective sample size
        changes.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-[#ded9cf] bg-[#fbfaf6] p-5">
          <label className="text-sm font-black">
            Average cluster size: {clusterSize}
          </label>
          <input
            type="range"
            min="2"
            max="50"
            step="1"
            value={clusterSize}
            onChange={(event) => setClusterSize(Number(event.target.value))}
            className="mt-3 w-full accent-blue-700"
          />
        </div>

        <div className="rounded-2xl border border-[#ded9cf] bg-[#fbfaf6] p-5">
          <label className="text-sm font-black">
            Intraclass correlation: {rho.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="0.3"
            step="0.01"
            value={rho}
            onChange={(event) => setRho(Number(event.target.value))}
            className="mt-3 w-full accent-red-700"
          />
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-[#ded9cf] bg-blue-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-800">
            Raw sample size
          </p>
          <p className="mt-2 text-3xl font-black text-blue-950">
            {rawSampleSize}
          </p>
        </div>

        <div className="rounded-2xl border border-[#ded9cf] bg-amber-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-800">
            Design effect
          </p>
          <p className="mt-2 text-3xl font-black text-amber-950">
            {designEffect.toFixed(2)}
          </p>
        </div>

        <div className="rounded-2xl border border-[#ded9cf] bg-red-50 p-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-red-800">
            Effective sample size
          </p>
          <p className="mt-2 text-3xl font-black text-red-950">
            {effectiveSampleSize.toFixed(0)}
          </p>
        </div>
      </div>

      <FormulaBlock>
        DEFF ≈ 1 + (m − 1)ρ
        <br />
        n<sub>eff</sub> ≈ n / DEFF
      </FormulaBlock>
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
          <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600">
            This quiz checks sampling methods, sampling frames, bias, stratified
            allocation, cluster sampling and weighting ideas.
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

export default function SamplingMethodsLessonPage() {
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
              Lesson 1.5
            </span>
            <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-black text-blue-800">
              Zero coding
            </span>
            <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-black text-amber-800">
              Advanced study design
            </span>
          </div>

          <h1 className="mt-6 max-w-5xl text-4xl font-black tracking-[-0.06em] md:text-6xl">
            Sampling methods
          </h1>

          <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-600">
            Sampling is not only about how many observations we collect. It is
            about how those observations are selected, who they represent, and
            whether the resulting evidence can support trustworthy inference.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {[
              ["Time", "75–90 min"],
              ["Level", "Foundation++"],
              ["Focus", "Sampling design"],
              ["Coding", "None"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-[#ded9cf] bg-white/80 p-4"
              >
                <p className="text-xs font-bold text-neutral-700">{label}</p>
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
                title="The class must decide how to choose people for a survey"
              >
                <div className="rounded-2xl bg-[#f8f6f1] px-4 py-3 text-sm font-bold text-neutral-600">
                  Scene: Mr. R asks the class to design a university-wide survey
                  about student wellbeing.
                </div>

                <div className="space-y-4">
                  <DialogueLine speaker="Emma" initials="EM" tone="green">
                    We know what a population and sample are. But how do we
                    actually choose the sample?
                  </DialogueLine>

                  <DialogueLine speaker="Mr. R" initials="MR" right>
                    That is the central question of sampling. A sample should
                    give useful evidence about the population, and the method
                    used to select it matters enormously.
                  </DialogueLine>

                  <DialogueLine speaker="Oliver" initials="OL" tone="amber">
                    Can we just ask the first people we meet?
                  </DialogueLine>

                  <DialogueLine speaker="Mr. R" initials="MR" right>
                    That is convenient, but it may be biased. The easiest people
                    to reach may not represent the population well.
                  </DialogueLine>

                  <DialogueLine speaker="James" initials="JA" tone="purple">
                    But if we ask thousands of people, does bias still matter?
                  </DialogueLine>

                  <DialogueLine speaker="Mr. R" initials="MR" right>
                    Yes. A large biased sample is still biased. Increasing
                    sample size reduces random sampling variation, but it does
                    not automatically remove systematic selection bias.
                  </DialogueLine>

                  <DialogueLine speaker="Sophia" initials="SO" tone="red">
                    So a smaller carefully selected sample may be better than a
                    huge badly selected sample?
                  </DialogueLine>

                  <DialogueLine speaker="Mr. R" initials="MR" right>
                    Exactly. Sampling design is about representativeness, not
                    just size.
                  </DialogueLine>
                </div>

                <DefinitionBox label="Big idea" tone="amber">
                  <p>
                    Sampling is not only about sample size. A smaller
                    well-designed sample can be more informative than a large
                    biased sample.
                  </p>
                </DefinitionBox>
              </SectionCard>

              <SectionCard title="Why sampling matters">
                <p>
                  We usually sample because it is impossible, expensive or
                  unnecessary to measure every unit in a population. However,
                  once we use a sample, we must ask whether it gives trustworthy
                  evidence about the population.
                </p>

                <FormulaBlock>
                  Population → sampling frame → sampling method → sample →
                  statistic → inference
                </FormulaBlock>

                <p>
                  A sample can fail in two broad ways. It may be affected by
                  random sampling variation, where different random samples give
                  different results. It may also be affected by bias, where the
                  sampling process systematically overrepresents or
                  underrepresents certain groups.
                </p>
              </SectionCard>

              <SectionCard title="A sample is a bridge">
                <p>
                  A sample is a bridge between what we observe and what we want
                  to know. If the bridge is strong, inference is meaningful. If
                  the bridge is weak, even beautiful calculations can lead to a
                  misleading conclusion.
                </p>

                <DefinitionBox label="Statistical thinking" tone="purple">
                  <p>
                    Before trusting a result, ask: Who was meant to be studied?
                    Who could actually be reached? Who was selected? Who
                    responded? Who is missing?
                  </p>
                </DefinitionBox>
              </SectionCard>
            </div>
          )}

          {activeTab === "Detailed Notes" && (
            <div className="space-y-6">
              <SectionCard eyebrow="Detailed notes" title="Sampling frame">
                <p>
                  The sampling frame is the practical list or mechanism from
                  which the sample is selected. Ideally, the sampling frame
                  should match the target population. In practice, it often does
                  not.
                </p>

                <DefinitionBox label="Definition" tone="blue">
                  <p>
                    A sampling frame is the list, register or practical access
                    route used to select units from the population.
                  </p>
                </DefinitionBox>

                <p>
                  If the sampling frame misses part of the population, the study
                  may suffer from coverage bias. For example, an online survey
                  excludes people without internet access unless another route
                  is provided.
                </p>
              </SectionCard>

              <SectionCard title="Target population, accessible population and sampling frame">
                <p>
                  In real studies, the population we want to make conclusions
                  about is not always the same as the population we can
                  practically reach. This creates an important distinction
                  between the target population, accessible population and
                  sampling frame.
                </p>

                <div className="grid gap-4 md:grid-cols-3">
                  <DefinitionBox label="Target population" tone="blue">
                    <p>
                      The full group we want our conclusion to describe. This is
                      defined by the research question.
                    </p>
                  </DefinitionBox>

                  <DefinitionBox label="Accessible population" tone="green">
                    <p>
                      The part of the target population that the researcher can
                      realistically access.
                    </p>
                  </DefinitionBox>

                  <DefinitionBox label="Sampling frame" tone="amber">
                    <p>
                      The actual list, register, database, map or mechanism used
                      to select the sample.
                    </p>
                  </DefinitionBox>
                </div>

                <FormulaBlock>
                  Target population → accessible population → sampling frame →
                  selected sample
                </FormulaBlock>
              </SectionCard>

              <SectionCard title="Probability and non-probability sampling">
                <p>
                  In probability sampling, selection uses a random mechanism and
                  selection probabilities are known or controlled by design. In
                  non-probability sampling, units are not selected through a
                  fully random mechanism.
                </p>

                <MethodTable />
              </SectionCard>

              <SectionCard title="Sampling variation, bias and total survey error">
                <p>
                  A sample result differs from the population truth for several
                  reasons. Some error is random and decreases with larger sample
                  size. Other error is systematic and does not disappear just
                  because the sample is large.
                </p>

                <FormulaBlock>
                  Total survey error ≈ sampling variation + coverage bias +
                  non-response bias + measurement error
                </FormulaBlock>

                <div className="grid gap-4 md:grid-cols-2">
                  <DefinitionBox label="Random sampling variation" tone="green">
                    <p>
                      Natural sample-to-sample fluctuation. This often decreases
                      as sample size increases.
                    </p>
                  </DefinitionBox>

                  <DefinitionBox label="Systematic bias" tone="red">
                    <p>
                      A repeated tendency to overestimate or underestimate the
                      population value because of the design, frame, measurement
                      process or response process.
                    </p>
                  </DefinitionBox>
                </div>
              </SectionCard>

              <SectionCard title="Coverage error and non-response error">
                <p>
                  Sampling error is not the only problem in sampling. A study
                  can also be affected by coverage error and non-response error.
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <DefinitionBox label="Coverage error" tone="red">
                    <p>
                      Coverage error occurs when some members of the target
                      population are missing from the sampling frame, or when
                      some units in the frame do not belong to the target
                      population.
                    </p>
                  </DefinitionBox>

                  <DefinitionBox label="Non-response error" tone="amber">
                    <p>
                      Non-response error occurs when selected individuals do not
                      participate, and their missing responses are
                      systematically different from those who respond.
                    </p>
                  </DefinitionBox>
                </div>
              </SectionCard>

              <SectionCard title="Derivation of proportional stratified allocation">
                <p>
                  Suppose the population is divided into H strata. Let{" "}
                  <strong>
                    N<sub>h</sub>
                  </strong>{" "}
                  be the population size in stratum h, and let{" "}
                  <strong>N</strong> be the total population size.
                </p>

                <FormulaBlock>
                  N = N<sub>1</sub> + N<sub>2</sub> + ... + N<sub>H</sub>
                </FormulaBlock>

                <p>The population proportion belonging to stratum h is:</p>

                <FormulaBlock>
                  W<sub>h</sub> = N<sub>h</sub> / N
                </FormulaBlock>

                <p>
                  If the total sample size is n, proportional allocation chooses
                  the sample size in each stratum so that the sample has the
                  same stratum proportions as the population.
                </p>

                <FormulaBlock>
                  n<sub>h</sub> / n = N<sub>h</sub> / N
                </FormulaBlock>

                <p>Rearranging gives:</p>

                <FormulaBlock>
                  n<sub>h</sub> = n × N<sub>h</sub> / N
                </FormulaBlock>

                <DefinitionBox label="Interpretation" tone="purple">
                  <p>
                    Proportional allocation preserves the population structure
                    inside the sample. If a stratum represents 20% of the
                    population, it receives about 20% of the sample.
                  </p>
                </DefinitionBox>
              </SectionCard>

              <SectionCard title="Unequal sampling and weighting">
                <p>
                  Sometimes researchers deliberately sample some groups more
                  heavily than others. For example, a small subgroup may be
                  oversampled so that enough data are available for subgroup
                  analysis.
                </p>

                <p>
                  When sampling probabilities differ across groups, unweighted
                  analysis may no longer represent the population correctly.
                  Weights can be used to restore population balance.
                </p>

                <FormulaBlock>
                  Sampling weight ≈ 1 / probability of selection
                </FormulaBlock>

                <DefinitionBox label="Advanced idea" tone="amber">
                  <p>
                    Weighting is not magic. It can correct known imbalance from
                    the sampling design, but it cannot fully repair poor
                    measurement, missing population coverage or severe
                    non-response bias.
                  </p>
                </DefinitionBox>
              </SectionCard>

              <SectionCard title="Cluster sampling and design effect">
                <p>
                  Cluster sampling is often practical because it is easier to
                  sample groups such as schools, hospitals, households or
                  villages. However, individuals inside the same cluster often
                  resemble each other.
                </p>

                <FormulaBlock>DEFF ≈ 1 + (m − 1)ρ</FormulaBlock>

                <p>
                  Here, m is the average cluster size and ρ is the intraclass
                  correlation. The intraclass correlation measures how similar
                  units are within the same cluster.
                </p>

                <FormulaBlock>
                  n<sub>eff</sub> ≈ n / DEFF
                </FormulaBlock>

                <DefinitionBox label="Interpretation" tone="red">
                  <p>
                    When units within clusters are highly similar, the effective
                    sample size is smaller than the raw sample size suggests.
                  </p>
                </DefinitionBox>
              </SectionCard>
            </div>
          )}

          {activeTab === "Interactive Lab" && (
            <div className="space-y-6">
              <MethodSelectorLab />
              <BiasVsSizeLab />
              <StratifiedAllocationLab />
              <ClusterDesignEffectLab />

              <SectionCard eyebrow="Reflection" title="What should you notice?">
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    Sampling method affects whether a sample can represent a
                    population.
                  </li>
                  <li>
                    Sample size reduces random variation but does not
                    automatically remove bias.
                  </li>
                  <li>
                    Stratified sampling is useful when important subgroups must
                    be represented.
                  </li>
                  <li>
                    Cluster sampling can reduce effective sample size when units
                    within clusters are similar.
                  </li>
                  <li>
                    Convenience samples are easy to collect but often weak for
                    inference.
                  </li>
                </ul>
              </SectionCard>
            </div>
          )}

          {activeTab === "Worked Examples" && (
            <div className="space-y-5">
              <WorkedExample
                title="Choosing a sampling method"
                question="A university wants to estimate student satisfaction across five faculties. Some faculties are much smaller than others."
              >
                <p>
                  Stratified sampling is appropriate because faculty membership
                  is an important subgroup variable. The researcher can divide
                  students by faculty and sample within each faculty.
                </p>
                <p>
                  This prevents small faculties from being missed by chance and
                  allows faculty-specific summaries.
                </p>
              </WorkedExample>

              <WorkedExample
                title="Systematic sampling"
                question="A clinic has 2,000 patient records and wants to review 200. How could systematic sampling be used?"
              >
                <p>
                  The sampling interval is{" "}
                  <strong>
                    k = N / n = 2000 / 200 = 10
                  </strong>
                  . The researcher randomly chooses a starting number from 1 to
                  10 and then selects every 10th record.
                </p>

                <FormulaBlock>k = N / n = 2000 / 200 = 10</FormulaBlock>

                <p>
                  This method is efficient, but the researcher should check that
                  the record list does not have a hidden repeating pattern.
                </p>
              </WorkedExample>

              <WorkedExample
                title="Proportional stratified allocation"
                question="A population has 1,200 students in Faculty A, 800 in Faculty B and 500 in Faculty C. If the total sample size is 250, how many should be sampled from Faculty A?"
              >
                <p>
                  The total population size is 1,200 + 800 + 500 = 2,500.
                </p>

                <FormulaBlock>
                  n<sub>A</sub> = 250 × 1200 / 2500 = 120
                </FormulaBlock>

                <p>
                  Therefore, 120 students should be sampled from Faculty A under
                  proportional allocation.
                </p>
              </WorkedExample>

              <WorkedExample
                title="Coverage error in an online survey"
                question="A local council wants to estimate internet access among all elderly residents, but collects data using an online-only survey."
              >
                <p>
                  The target population is all elderly residents. However, the
                  sampling method mainly reaches elderly residents who already
                  have internet access.
                </p>
                <p>
                  This creates coverage error because residents without internet
                  access are less likely to be included.
                </p>
                <DefinitionBox label="Conclusion" tone="red">
                  <p>
                    The survey may overestimate internet access because the
                    sampling frame is strongly related to the outcome being
                    measured.
                  </p>
                </DefinitionBox>
              </WorkedExample>

              <WorkedExample
                title="Non-response bias"
                question="A university sends a wellbeing survey to 5,000 students. Only 300 respond. Most responses come from students who are highly stressed."
              >
                <p>
                  The selected sample may have been broad, but the responding
                  sample may not represent all students.
                </p>
                <p>
                  If highly stressed students are more motivated to respond, the
                  survey may overestimate stress levels.
                </p>
                <DefinitionBox label="Key distinction" tone="amber">
                  <p>
                    Sampling design concerns who was selected. Non-response
                    concerns who actually replied.
                  </p>
                </DefinitionBox>
              </WorkedExample>

              <WorkedExample
                title="Cluster sampling and effective sample size"
                question="A researcher surveys 500 students from 5 schools. Why might this provide less information than 500 students from 50 schools?"
              >
                <p>
                  Students within the same school may be similar because they
                  share teachers, local environment, school policies and peer
                  groups.
                </p>
                <p>
                  This within-school similarity means the observations are not
                  as independent as 500 completely randomly selected students.
                </p>
                <FormulaBlock>
                  More similarity within clusters → larger design effect →
                  smaller effective sample size
                </FormulaBlock>
              </WorkedExample>
            </div>
          )}

          {activeTab === "Quiz" && <QuizEngine />}
        </section>

        <section className="mt-8 flex flex-col gap-5 rounded-[1.7rem] bg-neutral-950 p-7 text-white shadow-xl md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-tight">
              Module 1 complete
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70">
              You have completed the introductory statistical thinking module.
              Next, move to descriptive statistics and learn how to summarise
              numerical data more formally.
            </p>
          </div>

          <a
            href="/courses/statistics-foundation/modules/descriptive-statistics"
            className="rounded-full bg-white px-6 py-3 text-sm font-black text-neutral-950"
          >
            Start Module 2 →
          </a>
        </section>
      </div>
    </main>
  );
}