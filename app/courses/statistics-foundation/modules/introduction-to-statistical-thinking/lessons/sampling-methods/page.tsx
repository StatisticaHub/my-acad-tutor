"use client";

import LockedLessonGate from "@/components/course/LockedLessonGate";
import { isStatisticsFoundationLessonOpen } from "@/lib/statisticsFoundationAccess";


import { useMemo, useState } from "react";

const tabs = [
  "Learning Route",
  "Lecture",
  "Detailed Notes",
  "Method Chooser",
  "Animated Mentor",
  "Worked Examples",
  "Practice Studio",
  "Reflection",
  "Quiz",
];

const learningRoute = [
  {
    time: "0–10 min",
    title: "Why sampling methods matter",
    body:
      "Understand why the way a sample is selected can affect bias, uncertainty and the strength of a conclusion.",
  },
  {
    time: "10–30 min",
    title: "Probability sampling",
    body:
      "Learn simple random, systematic, stratified and cluster sampling.",
  },
  {
    time: "30–45 min",
    title: "Non-probability sampling",
    body:
      "Understand convenience, voluntary response, quota and snowball sampling, including their limitations.",
  },
  {
    time: "45–65 min",
    title: "Bias and representativeness",
    body:
      "Explore undercoverage, selection bias, non-response and why large samples can still mislead.",
  },
  {
    time: "65–85 min",
    title: "Interactive sampling studio",
    body:
      "Adjust population structure, sample size and sampling method to see how the selected sample changes.",
  },
  {
    time: "85–100 min",
    title: "Worked examples and quiz",
    body:
      "Choose sampling methods for realistic education, health and survey scenarios.",
  },
];

const lectureConcepts = [
  {
    title: "Sampling is a design decision",
    body:
      "Sampling is not just taking some observations. It is the process of deciding which units from the population will become evidence. A poor sampling method can weaken the entire study before any calculation begins.",
    example:
      "Surveying only students in the library may be easy, but it may not represent students who study elsewhere or rarely use the library.",
  },
  {
    title: "Probability sampling supports stronger inference",
    body:
      "In probability sampling, units have a known or controlled chance of selection. This makes it easier to connect the sample back to the population and reason about uncertainty.",
    example:
      "Selecting students randomly from a complete enrolment list is stronger than asking only whoever volunteers.",
  },
  {
    title: "Non-probability sampling can be useful but limited",
    body:
      "Sometimes probability sampling is not practical. Convenience, quota or snowball sampling may be used, but conclusions should be more cautious because selection probabilities are unknown.",
    example:
      "Snowball sampling may help reach hidden populations, but it may overrepresent connected groups.",
  },
  {
    title: "Representativeness is not only about size",
    body:
      "A large sample can still be biased if important parts of the population are missing or less likely to respond. Sampling quality depends on coverage, selection, response and measurement.",
    example:
      "A survey with 10,000 online responses can still mislead if offline people are excluded.",
  },
];

const samplingMethods = [
  {
    title: "Simple random sampling",
    short: "Every unit has an equal chance of selection.",
    detail:
      "Simple random sampling selects units from the population using a random mechanism. It is conceptually clean and supports statistical inference well when the sampling frame is complete. Its weakness is that it may be difficult to implement in large or scattered populations, and by chance it may underrepresent small subgroups.",
    example:
      "Randomly select 300 students from a complete university enrolment list.",
    strength: "Clear, fair and mathematically straightforward.",
    limitation: "Requires a complete sampling frame and may miss small subgroups by chance.",
  },
  {
    title: "Systematic sampling",
    short: "Select every kth unit after a random start.",
    detail:
      "Systematic sampling orders the sampling frame, chooses a random starting point, and then selects every kth unit. It is easy to implement and can spread the sample across a list. However, it can be biased if the list has a hidden pattern that matches the sampling interval.",
    example:
      "Choose every 20th student from an ordered enrolment list after a random starting point.",
    strength: "Simple, practical and evenly spread across the frame.",
    limitation: "Can be biased if there is periodic structure in the list.",
  },
  {
    title: "Stratified sampling",
    short: "Divide the population into strata, then sample within each stratum.",
    detail:
      "Stratified sampling ensures important subgroups are represented. The population is divided into strata such as year group, sex, department or region, and a sample is taken from each stratum. This is powerful when subgroup comparisons matter or when some groups are small.",
    example:
      "Sample students separately from each faculty so every faculty is represented.",
    strength: "Improves representation of important subgroups.",
    limitation: "Requires information about strata before sampling.",
  },
  {
    title: "Cluster sampling",
    short: "Sample groups or clusters, then observe units inside selected clusters.",
    detail:
      "Cluster sampling is useful when individuals are naturally grouped, such as schools, clinics, households or geographical areas. Instead of sampling individuals across the whole population, researchers sample clusters and then observe some or all units inside them. It is efficient but often gives less information than sampling the same number of independent individuals.",
    example:
      "Randomly select 20 schools, then survey students within those schools.",
    strength: "Cost-effective for geographically spread populations.",
    limitation: "People within clusters may be similar, reducing effective information.",
  },
  {
    title: "Convenience sampling",
    short: "Select units that are easy to access.",
    detail:
      "Convenience sampling is common because it is quick and cheap. However, the sample may not represent the population because selection depends on availability rather than a controlled sampling method. It is useful for early exploration but weak for population-level conclusions.",
    example:
      "Survey students sitting near the statistics department café.",
    strength: "Fast and easy to collect.",
    limitation: "High risk of selection bias.",
  },
  {
    title: "Voluntary response sampling",
    short: "People choose whether to participate.",
    detail:
      "Voluntary response samples are formed when people self-select into a study. They often overrepresent people with strong opinions, high motivation or strong experiences. This makes them risky for estimating population averages or proportions.",
    example:
      "An online poll where anyone can click and respond.",
    strength: "Easy to distribute and can gather many responses.",
    limitation: "Strong risk of self-selection bias.",
  },
];

const samplingProblems = [
  {
    title: "Undercoverage",
    body:
      "Some population members are missing from the sampling frame and therefore have no chance of being selected.",
    example:
      "A phone survey excludes people without phones.",
  },
  {
    title: "Selection bias",
    body:
      "The selection process makes some types of units more likely to appear in the sample.",
    example:
      "Surveying only gym members to estimate exercise habits in the whole city.",
  },
  {
    title: "Non-response bias",
    body:
      "Selected people do not respond, and non-responders differ from responders.",
    example:
      "Students struggling with a course may be less likely to answer a course feedback survey.",
  },
  {
    title: "Overcoverage",
    body:
      "The sampling frame includes units that are not actually part of the target population.",
    example:
      "An old student list includes graduates who are no longer enrolled.",
  },
];

const scenarios = [
  {
    title: "University student wellbeing",
    question:
      "A university wants to estimate wellbeing among undergraduate students across five faculties.",
    recommended:
      "Stratified sampling by faculty, with random sampling within each faculty.",
    why:
      "Faculty representation matters because workload, assessment style and student experience may differ between faculties.",
    caution:
      "Non-response should be monitored because students experiencing low wellbeing may be less likely to respond.",
  },
  {
    title: "Clinic patient satisfaction",
    question:
      "A clinic wants to estimate satisfaction among patients who attended appointments in the last six months.",
    recommended:
      "Systematic or simple random sampling from appointment records.",
    why:
      "Appointment records provide a practical sampling frame for patients who attended during the target period.",
    caution:
      "Patients with poor experiences may be less likely or more likely to respond, so non-response patterns should be checked.",
  },
  {
    title: "National school survey",
    question:
      "Researchers want to survey pupils across a country, but visiting every school is expensive.",
    recommended:
      "Cluster sampling by school, possibly stratified by region first.",
    why:
      "Schools are natural clusters, and sampling schools reduces travel and administrative cost.",
    caution:
      "Pupils within the same school may be similar, so the effective sample size may be smaller than the raw number of pupils.",
  },
  {
    title: "Hidden population research",
    question:
      "Researchers want to study a group that is difficult to identify from official lists.",
    recommended:
      "Snowball sampling may be practical, combined with careful discussion of limitations.",
    why:
      "Participants may help researchers reach others in the same hidden network.",
    caution:
      "The sample may overrepresent connected individuals and may not represent the whole hidden population.",
  },
];

const mentorTopics = [
  {
    id: "random",
    label: "Random sampling",
    answer:
      "Random sampling uses chance to select units. Its strength is not that every sample is perfect, but that the selection process is controlled and defensible.",
  },
  {
    id: "stratified",
    label: "Stratified sampling",
    answer:
      "Use stratified sampling when important subgroups must be represented. First divide the population into strata, then sample within each stratum.",
  },
  {
    id: "cluster",
    label: "Cluster sampling",
    answer:
      "Cluster sampling is useful when individuals are naturally grouped. It can reduce cost, but people inside the same cluster may be similar.",
  },
  {
    id: "bias",
    label: "Sampling bias",
    answer:
      "Sampling bias happens when the selected sample systematically differs from the population. More observations do not automatically remove this problem.",
  },
  {
    id: "method",
    label: "Choosing a method",
    answer:
      "Choose the method by asking: do I have a full list, do subgroups matter, are people geographically spread, and what resources are available?",
  },
];

const quizQuestions = [
  {
    question: "Which method selects units randomly from the full sampling frame?",
    options: [
      "Convenience sampling",
      "Simple random sampling",
      "Voluntary response sampling",
      "Snowball sampling",
    ],
    answer: 1,
    feedback:
      "Simple random sampling selects units randomly from the sampling frame.",
  },
  {
    question: "When is stratified sampling especially useful?",
    options: [
      "When important subgroups need representation.",
      "When no sampling frame exists at all.",
      "When only volunteers can respond.",
      "When the researcher wants the fastest possible sample regardless of bias.",
    ],
    answer: 0,
    feedback:
      "Stratified sampling is useful when important subgroups should be represented in the sample.",
  },
  {
    question: "What is a key limitation of convenience sampling?",
    options: [
      "It always requires too much money.",
      "It may not represent the target population.",
      "It cannot collect categorical variables.",
      "It guarantees random selection.",
    ],
    answer: 1,
    feedback:
      "Convenience samples are easy to collect but may be biased because selection is based on availability.",
  },
  {
    question: "What is undercoverage?",
    options: [
      "When some population members are missing from the sampling frame.",
      "When too many people are sampled.",
      "When every unit has equal chance of selection.",
      "When the sample mean is calculated.",
    ],
    answer: 0,
    feedback:
      "Undercoverage occurs when part of the population has no chance of being selected.",
  },
  {
    question: "Which statement is most careful?",
    options: [
      "A large convenience sample is always unbiased.",
      "Sampling method affects how strongly we can generalise from sample to population.",
      "Sampling method does not matter if we draw a graph.",
      "Voluntary response always gives a representative sample.",
    ],
    answer: 1,
    feedback:
      "The sampling method affects representativeness, bias and the strength of inference.",
  },
];

export default function SamplingMethodsLesson() {
  const lessonCode = "1.5";

  if (!isStatisticsFoundationLessonOpen(lessonCode)) {
    return (
      <LockedLessonGate
        lessonCode={lessonCode}
        lessonTitle="Sampling methods"
        moduleTitle="Module 1: Introduction to Statistical Thinking"
      />
    );
  }

  const [activeTab, setActiveTab] = useState("Learning Route");
  const [sampleSize, setSampleSize] = useState(120);
  const [method, setMethod] = useState("stratified");
  const [minorityShare, setMinorityShare] = useState(25);
  const [responseRate, setResponseRate] = useState(70);
  const [clusterSimilarity, setClusterSimilarity] = useState(35);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [mentorTopic, setMentorTopic] = useState("random");
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(
    {},
  );

  const activeScenario = scenarios[scenarioIndex];
  const activeMentor =
    mentorTopics.find((topic) => topic.id === mentorTopic) ?? mentorTopics[0];

  const studio = useMemo(() => {
    const selected = Math.round(sampleSize / 5);
    const respondents = Math.round(selected * (responseRate / 100));

    let representation = 50;
    if (method === "simple-random") {
      representation = 62 + sampleSize * 0.04 - Math.abs(minorityShare - 25) * 0.25;
    }
    if (method === "systematic") {
      representation = 60 + sampleSize * 0.035 - Math.abs(minorityShare - 30) * 0.2;
    }
    if (method === "stratified") {
      representation = 76 + sampleSize * 0.035;
    }
    if (method === "cluster") {
      representation = 67 + sampleSize * 0.025 - clusterSimilarity * 0.35;
    }
    if (method === "convenience") {
      representation = 38 + sampleSize * 0.015 - Math.abs(minorityShare - 20) * 0.3;
    }
    if (method === "voluntary") {
      representation = 34 + responseRate * 0.15 - Math.abs(minorityShare - 35) * 0.35;
    }

    const trust = Math.max(
      8,
      Math.min(98, representation + responseRate * 0.22 - clusterSimilarity * 0.12),
    );

    let advice =
      "The sample may be usable, but the method and response rate should be reported.";
    if (trust >= 75) {
      advice =
        "The sampling design is relatively strong. The conclusion can be more confident, while still acknowledging sampling uncertainty.";
    } else if (trust < 45) {
      advice =
        "The design is weak for generalisation. The conclusion should be cautious because bias may be substantial.";
    }

    return {
      selected,
      respondents,
      trust,
      advice,
    };
  }, [clusterSimilarity, method, minorityShare, responseRate, sampleSize]);

  const populationGrid = useMemo(() => {
    return Array.from({ length: 100 }, (_, index) => {
      const groupB = index < minorityShare;
      let selected = false;

      if (method === "simple-random") {
        selected = index % Math.max(2, Math.round(100 / Math.max(8, studio.selected))) === 0;
      }

      if (method === "systematic") {
        selected = (index + 3) % Math.max(2, Math.round(100 / Math.max(8, studio.selected))) === 0;
      }

      if (method === "stratified") {
        selected =
          (groupB && index % 3 === 0) ||
          (!groupB && index % Math.max(3, Math.round(100 / Math.max(12, studio.selected))) === 0);
      }

      if (method === "cluster") {
        const cluster = Math.floor(index / 10);
        selected = cluster === 1 || cluster === 4 || cluster === 7;
      }

      if (method === "convenience") {
        selected = index > 55 && index < 55 + studio.selected;
      }

      if (method === "voluntary") {
        selected = index % 7 === 0 || (groupB && index % 5 === 0);
      }

      const responded = selected && index % Math.max(2, Math.round(100 / responseRate)) !== 0;

      return {
        id: index,
        groupB,
        selected,
        responded,
      };
    });
  }, [method, minorityShare, responseRate, studio.selected]);

  const score = quizQuestions.reduce((total, question, index) => {
    return selectedAnswers[index] === question.answer ? total + 1 : total;
  }, 0);

  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-8 text-neutral-950 md:px-8 md:py-14">
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
          0%, 100% { transform: scale(1); opacity: 0.86; }
          50% { transform: scale(1.22); opacity: 1; }
        }
      `}</style>

      <section className="mx-auto max-w-7xl">
        <a
          href="/courses/statistics-foundation/modules/introduction-to-statistical-thinking/"
          className="text-sm font-black text-[#8b1116] hover:text-[#5f0b0f]"
        >
          ← Back to module
        </a>

        <section className="mt-8 overflow-hidden rounded-[2.5rem] border border-neutral-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 md:p-10">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Statistics Foundation · Lesson 1.5
              </p>

              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-7xl">
                Sampling methods.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                Sampling methods decide whether the data can fairly represent the
                population. This lesson teaches students how to choose a
                sampling method, compare probability and non-probability
                designs, recognise bias, and write cautious conclusions about
                how far a sample can be generalised.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "90–100 minutes",
                  "No coding",
                  "Method chooser",
                  "Bias reasoning",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-neutral-200 bg-[#f7f4ee] p-4 text-sm font-black text-neutral-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <aside className="border-t border-neutral-200 bg-neutral-950 p-6 text-white md:p-10 lg:border-l lg:border-t-0">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Lesson pathway
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                From population to selected evidence.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Define frame",
                  "Choose method",
                  "Select units",
                  "Track response",
                  "Assess bias",
                  "Report limits",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-4"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-black text-neutral-950">
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

        <nav className="sticky top-[74px] z-30 mt-8 flex gap-2 overflow-x-auto rounded-full border border-neutral-200 bg-white/90 p-2 shadow-sm backdrop-blur">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-black transition ${
                activeTab === tab
                  ? "bg-neutral-950 text-white"
                  : "text-neutral-600 hover:bg-[#f7f4ee] hover:text-neutral-950"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {activeTab === "Learning Route" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                90–100 minute lesson plan
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Learn how sampling controls the strength of evidence.
              </h2>

              <p className="mt-5 text-base leading-8 text-neutral-700">
                In earlier lessons, you learned what populations, samples and
                variables are. This lesson explains how the sample is selected.
                The method matters because it affects bias, uncertainty and the
                confidence we can place in a conclusion.
              </p>

              <div className="mt-6 grid gap-3">
                {learningRoute.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
                      {item.time}
                    </p>
                    <h3 className="mt-2 text-xl font-black tracking-[-0.035em]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-neutral-700">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Mastery checklist
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                By the end, you should be able to choose and critique a sampling plan.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Explain why sampling method matters.",
                  "Distinguish probability and non-probability sampling.",
                  "Compare simple random, systematic, stratified and cluster sampling.",
                  "Explain convenience and voluntary response limitations.",
                  "Identify undercoverage, selection bias and non-response bias.",
                  "Write a cautious conclusion about sample quality.",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-4"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-neutral-950">
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
          <section className="mt-8 grid gap-6">
            <section className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
              <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Sampling decision board
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  A sample is only as trustworthy as the way it was selected.
                </h2>

                <p className="mt-4 text-base leading-8 text-neutral-700">
                  Sampling methods are not just technical labels. They describe
                  the route by which people, patients, schools, clinics or
                  measurements enter the dataset. That route controls how much
                  we can trust the final conclusion.
                </p>

                <div className="mt-6 grid gap-4">
                  {[
                    {
                      title: "What is the target population?",
                      body:
                        "Before choosing a method, define who the conclusion should apply to. A vague population leads to a vague sampling plan.",
                      example:
                        "All undergraduate students at one university during the 2026 academic year.",
                    },
                    {
                      title: "Is there a complete sampling frame?",
                      body:
                        "A probability sample usually needs a list or system that can identify population members.",
                      example:
                        "An enrolment database, clinic registry or appointment list.",
                    },
                    {
                      title: "Do important subgroups need protection?",
                      body:
                        "If small groups matter, simple random sampling may miss them by chance. Stratified sampling can ensure representation.",
                      example:
                        "Sampling separately from each faculty, year group or region.",
                    },
                    {
                      title: "Are units naturally grouped?",
                      body:
                        "When individuals are inside schools, clinics, households or regions, cluster sampling may be practical.",
                      example:
                        "Randomly choose schools, then survey pupils inside those schools.",
                    },
                    {
                      title: "What bias could enter?",
                      body:
                        "Undercoverage, non-response, voluntary response and convenience selection can distort the sample.",
                      example:
                        "An online survey excludes people who rarely use email.",
                    },
                  ].map((item, index) => (
                    <article
                      key={item.title}
                      className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
                    >
                      <div className="flex items-start gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-sm font-black text-white">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="text-xl font-black tracking-[-0.035em]">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm leading-7 text-neutral-700">
                            {item.body}
                          </p>
                          <p className="mt-3 rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-7 text-neutral-700">
                            Example: {item.example}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Guided lecture
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Mr. R reframes sampling as a fairness problem.
                </h2>

                <div className="mt-6 grid gap-4">
                  <Dialogue
                    speaker="Mr. R"
                    text="Today we are not just asking how many people are in the sample. We are asking whether the sample has a fair route into the dataset."
                  />
                  <Dialogue
                    speaker="Amelia"
                    text="So a sample is not automatically good just because it is large?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Exactly. Large samples reduce random fluctuation, but they do not automatically remove bias. A biased process can produce a very precise wrong answer."
                  />
                  <Dialogue
                    speaker="Ben"
                    text="What makes probability sampling stronger?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Probability sampling uses a controlled selection process. We know how units can enter the sample, so the link between sample and population is clearer."
                  />
                  <Dialogue
                    speaker="Chloe"
                    text="But real studies often use practical samples. Are they useless?"
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Not useless, but limited. Convenience or voluntary samples can be helpful for exploration, but we must be careful about generalising to the full population."
                  />
                  <Dialogue
                    speaker="Daniel"
                    text="So when we report a result, we should also report how the sample was selected."
                  />
                  <Dialogue
                    speaker="Mr. R"
                    text="Yes. A statistical result without sampling information is incomplete. The method tells the reader how far the evidence can travel."
                  />
                </div>

                <section className="mt-8 rounded-[2rem] border border-[#8b1116]/20 bg-[#fff7f7] p-6">
                  <h3 className="text-2xl font-black tracking-[-0.04em] text-[#8b1116]">
                    Lecture takeaway
                  </h3>
                  <p className="mt-3 text-base leading-8 text-neutral-700">
                    Sampling is the bridge between the population we care about
                    and the data we actually observe. A good sampling method
                    makes that bridge stronger. A weak sampling method means the
                    conclusion must be more cautious.
                  </p>
                </section>
              </section>
            </section>

            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Method chooser pathway
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Choose the method by asking the right question.
              </h2>

              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    question: "Do you have a complete list?",
                    method: "Simple random or systematic",
                    reason:
                      "A full sampling frame allows controlled selection from the population.",
                  },
                  {
                    question: "Do subgroups matter?",
                    method: "Stratified sampling",
                    reason:
                      "Sampling inside each subgroup protects representation.",
                  },
                  {
                    question: "Are units naturally grouped?",
                    method: "Cluster sampling",
                    reason:
                      "Sampling schools, clinics or regions may be more practical than sampling individuals everywhere.",
                  },
                  {
                    question: "Is the population hard to reach?",
                    method: "Snowball or specialist recruitment",
                    reason:
                      "Useful for hidden populations, but conclusions need strong caution.",
                  },
                  {
                    question: "Is speed more important than generalisation?",
                    method: "Convenience sampling",
                    reason:
                      "Useful for pilots and early exploration, weak for population claims.",
                  },
                  {
                    question: "Are people choosing to respond?",
                    method: "Voluntary response",
                    reason:
                      "Easy to collect, but strong opinions may be overrepresented.",
                  },
                  {
                    question: "Is cost a major constraint?",
                    method: "Cluster or systematic sampling",
                    reason:
                      "These can reduce practical burden while keeping some structure.",
                  },
                  {
                    question: "Do you need subgroup comparisons?",
                    method: "Stratified sampling",
                    reason:
                      "Ensures enough observations in each important group.",
                  },
                ].map((item) => (
                  <article
                    key={item.question}
                    className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
                      Ask
                    </p>
                    <h3 className="mt-2 text-lg font-black tracking-[-0.03em]">
                      {item.question}
                    </h3>
                    <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-neutral-500">
                      Likely method
                    </p>
                    <p className="mt-2 text-sm font-black leading-7 text-neutral-800">
                      {item.method}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-neutral-700">
                      {item.reason}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <section className="rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                  Probability sampling
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                  Stronger for population inference.
                </h2>

                <p className="mt-5 text-sm leading-7 text-white/70">
                  Probability methods use a planned selection process. This does
                  not guarantee a perfect sample, but it makes the link between
                  the sample and the population more defensible.
                </p>

                <div className="mt-6 grid gap-3">
                  {[
                    "Simple random sampling",
                    "Systematic sampling",
                    "Stratified sampling",
                    "Cluster sampling",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-4 text-sm font-bold text-white/80"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Non-probability sampling
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
                  Practical, but more limited.
                </h2>

                <p className="mt-5 text-sm leading-7 text-neutral-700">
                  Non-probability methods may be useful when time, access or
                  feasibility is limited. However, because selection chances are
                  not fully controlled, conclusions should usually be more
                  cautious.
                </p>

                <div className="mt-6 grid gap-3">
                  {[
                    "Convenience sampling",
                    "Voluntary response sampling",
                    "Quota sampling",
                    "Snowball sampling",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.25rem] border border-neutral-200 bg-[#f7f4ee] p-4 text-sm font-bold text-neutral-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </section>
            </section>
          </section>
        )}

        {activeTab === "Detailed Notes" && (
          <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Detailed notes
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Sampling methods in depth.
            </h2>

            <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-700">
              The strength of a sample depends on how it was selected. Sampling
              methods are part of study design, not an afterthought. A good
              sampling plan should match the research question, available frame,
              population structure and resources.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {samplingMethods.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
                >
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
                    {item.short}
                  </p>
                  <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-700">
                    {item.detail}
                  </p>
                  <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-7 text-neutral-700">
                    Example: {item.example}
                  </p>
                  <p className="mt-3 rounded-2xl bg-neutral-950 px-4 py-3 text-sm font-bold leading-7 text-white">
                    Strength: {item.strength}
                  </p>
                  <p className="mt-3 rounded-2xl border border-[#8b1116]/20 bg-[#fff7f7] px-4 py-3 text-sm font-bold leading-7 text-[#8b1116]">
                    Limitation: {item.limitation}
                  </p>
                </article>
              ))}
            </div>

            <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                Common sampling problems
              </p>

              <h3 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                Bias can enter before analysis begins.
              </h3>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {samplingProblems.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5"
                  >
                    <h4 className="text-xl font-black">{item.title}</h4>
                    <p className="mt-3 text-sm leading-7 text-white/70">
                      {item.body}
                    </p>
                    <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-7 text-neutral-900">
                      {item.example}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </section>
        )}

        {activeTab === "Method Chooser" && (
          <section className="mt-8 grid gap-6">
            <section className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="p-6 md:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                    Method chooser studio
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    Test how sampling choices change representativeness.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-neutral-700">
                    Select a sampling method and adjust the population
                    structure. The grid shows which units are missed, selected
                    and responding. The goal is not to find a perfect method,
                    but to learn what each method protects and what it risks.
                  </p>

                  <div className="mt-6">
                    <label className="block">
                      <span className="text-sm font-black text-neutral-700">
                        Sampling method
                      </span>
                      <select
                        value={method}
                        onChange={(event) => setMethod(event.target.value)}
                        className="mt-3 w-full rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold text-neutral-800"
                      >
                        <option value="simple-random">Simple random</option>
                        <option value="systematic">Systematic</option>
                        <option value="stratified">Stratified</option>
                        <option value="cluster">Cluster</option>
                        <option value="convenience">Convenience</option>
                        <option value="voluntary">Voluntary response</option>
                      </select>
                    </label>
                  </div>

                  <div className="mt-6 grid gap-5">
                    <Slider
                      label="Planned sample size"
                      value={sampleSize}
                      min={40}
                      max={300}
                      onChange={setSampleSize}
                    />
                    <Slider
                      label="Smaller subgroup share"
                      value={minorityShare}
                      min={5}
                      max={45}
                      onChange={setMinorityShare}
                    />
                    <Slider
                      label="Response rate"
                      value={responseRate}
                      min={20}
                      max={100}
                      onChange={setResponseRate}
                    />
                    <Slider
                      label="Cluster similarity"
                      value={clusterSimilarity}
                      min={0}
                      max={80}
                      onChange={setClusterSimilarity}
                    />
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <Metric label="Selected" value={`${studio.selected}`} />
                    <Metric label="Respondents" value={`${studio.respondents}`} />
                    <Metric
                      label="Design trust"
                      value={`${studio.trust.toFixed(0)}%`}
                    />
                  </div>
                </div>

                <div className="border-t border-neutral-200 bg-neutral-950 p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                    Interpretation panel
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    How strong is this design?
                  </h2>

                  <p className="mt-6 text-lg leading-9 text-white/80">
                    {studio.advice}
                  </p>

                  <div className="mt-8 grid gap-3">
                    {[
                      {
                        title: "Coverage",
                        body:
                          "Does the sampling frame include the full target population?",
                      },
                      {
                        title: "Selection",
                        body:
                          "Does the method give important groups a fair chance to appear?",
                      },
                      {
                        title: "Response",
                        body:
                          "Could non-responders differ from responders?",
                      },
                      {
                        title: "Generalisability",
                        body:
                          "How far can the result travel beyond the observed sample?",
                      },
                    ].map((item) => (
                      <article
                        key={item.title}
                        className="rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-4"
                      >
                        <h3 className="text-sm font-black text-white">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-white/70">
                          {item.body}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
              <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Population selection map
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                  Who enters the evidence?
                </h2>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  The grid represents a population. Some units belong to a
                  smaller subgroup. The selected method changes which units
                  become part of the evidence.
                </p>

                <div className="mt-6 rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5">
                  <div className="grid grid-cols-10 gap-2">
                    {populationGrid.map((unit) => (
                      <div
                        key={unit.id}
                        className={`aspect-square rounded-full transition ${
                          unit.responded
                            ? "bg-neutral-950"
                            : unit.selected
                              ? "bg-neutral-500"
                              : unit.groupB
                                ? "bg-[#8b1116]/35"
                                : "bg-neutral-300"
                        }`}
                        style={{
                          animation: unit.responded
                            ? "selectedPulse 2.2s ease-in-out infinite"
                            : undefined,
                        }}
                      />
                    ))}
                  </div>

                  <div className="mt-5 grid gap-3 text-sm leading-7 text-neutral-700 md:grid-cols-4">
                    <div className="rounded-2xl bg-white p-4">
                      <strong>Grey:</strong> not selected.
                    </div>
                    <div className="rounded-2xl bg-white p-4">
                      <strong>Red-tinted:</strong> smaller subgroup.
                    </div>
                    <div className="rounded-2xl bg-white p-4">
                      <strong>Medium:</strong> selected but no response.
                    </div>
                    <div className="rounded-2xl bg-white p-4">
                      <strong>Dark:</strong> selected and responding.
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Method comparison
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                  What does this method protect?
                </h2>

                <div className="mt-6 grid gap-3">
                  {[
                    {
                      name: "Simple random",
                      fit:
                        "Best when a complete sampling frame exists and subgroups do not require guaranteed representation.",
                    },
                    {
                      name: "Stratified",
                      fit:
                        "Best when important subgroups must be represented or compared.",
                    },
                    {
                      name: "Cluster",
                      fit:
                        "Best when the population is geographically or naturally grouped and cost matters.",
                    },
                    {
                      name: "Convenience / voluntary",
                      fit:
                        "Useful for quick exploration, but weak for general population conclusions.",
                    },
                  ].map((item) => (
                    <article
                      key={item.name}
                      className="rounded-[1.25rem] border border-neutral-200 bg-[#f7f4ee] p-4"
                    >
                      <h3 className="font-black">{item.name}</h3>
                      <p className="mt-2 text-sm leading-7 text-neutral-700">
                        {item.fit}
                      </p>
                    </article>
                  ))}
                </div>

                <section className="mt-6 rounded-[1.5rem] border border-[#8b1116]/20 bg-[#fff7f7] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
                    Write this conclusion
                  </p>
                  <p className="mt-3 text-sm leading-7 text-neutral-700">
                    “This sample was selected using{" "}
                    <strong>{method.replace("-", " ")}</strong>. This method is
                    useful because _____. However, the conclusion should be
                    cautious because _____.”
                  </p>
                </section>
              </section>
            </section>
          </section>
        )}

        {activeTab === "Animated Mentor" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
            <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Animated mentor
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Ask Mr. R about sampling.
              </h2>

              <div className="mt-8 flex justify-center">
                <div
                  className="relative flex h-52 w-52 items-center justify-center rounded-full border border-neutral-200 bg-[#f7f4ee]"
                  style={{ animation: "mentorFloat 3s ease-in-out infinite" }}
                >
                  <div className="absolute top-9 h-20 w-20 rounded-full bg-neutral-950" />
                  <div className="absolute top-16 flex gap-5">
                    <span className="h-3 w-3 rounded-full bg-white" style={{ animation: "mentorBlink 4s infinite" }} />
                    <span className="h-3 w-3 rounded-full bg-white" style={{ animation: "mentorBlink 4s infinite" }} />
                  </div>
                  <div className="absolute top-28 h-20 w-32 rounded-t-[3rem] bg-[#8b1116]" />
                  <div className="absolute bottom-8 rounded-full bg-white px-4 py-2 text-sm font-black text-neutral-950">
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
                        ? "border-[#8b1116] bg-[#8b1116] text-white"
                        : "border-neutral-200 bg-[#f7f4ee] text-neutral-700 hover:bg-white"
                    }`}
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            </section>

            <section className="relative overflow-hidden rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm md:p-8">
              <div className="absolute left-0 top-0 h-1 w-full overflow-hidden bg-white/10">
                <div
                  className="h-full w-1/2 bg-white/40"
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

              <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.07] p-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                  Mentor challenge
                </p>
                <p className="mt-3 text-sm leading-7 text-white/75">
                  Choose a real study question. Write the target population,
                  sampling frame, best sampling method and one likely source of
                  bias.
                </p>
              </div>
            </section>
          </section>
        )}

        {activeTab === "Worked Examples" && (
          <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Worked examples
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Choose and justify a sampling method.
            </h2>

            <div className="mt-6 flex flex-wrap gap-2">
              {scenarios.map((scenario, index) => (
                <button
                  key={scenario.title}
                  type="button"
                  onClick={() => setScenarioIndex(index)}
                  className={`rounded-full px-4 py-2 text-sm font-black transition ${
                    scenarioIndex === index
                      ? "bg-neutral-950 text-white"
                      : "border border-neutral-200 bg-[#f7f4ee] text-neutral-700"
                  }`}
                >
                  {scenario.title}
                </button>
              ))}
            </div>

            <article className="mt-6 rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6">
              <h3 className="text-3xl font-black tracking-[-0.045em]">
                {activeScenario.title}
              </h3>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-700">
                {activeScenario.question}
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <AnswerCard title="Recommended method" body={activeScenario.recommended} />
                <AnswerCard title="Why this method fits" body={activeScenario.why} />
                <AnswerCard title="Caution" body={activeScenario.caution} />
              </div>
            </article>
          </section>
        )}

        {activeTab === "Practice Studio" && (
          <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Practice studio
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Practise sampling design decisions.
            </h2>

            <div className="mt-8 grid gap-5">
              {[
                "A city wants to estimate adult public transport use. Suggest a sampling frame and method.",
                "A school wants feedback from each year group. Explain why stratified sampling may help.",
                "A clinic surveys only patients who come on Monday morning. Explain the likely bias.",
                "A research team uses volunteers from social media. Write a cautious conclusion.",
              ].map((task, index) => (
                <article
                  key={task}
                  className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
                >
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
                    Practice task {index + 1}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-neutral-700">
                    {task}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "Reflection" && (
          <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Reflection task
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Write a sampling critique.
            </h2>

            <div className="mt-8 grid gap-5">
              {[
                "Explain why a large sample is not automatically representative.",
                "Compare simple random sampling and stratified sampling in your own words.",
                "Describe one situation where cluster sampling is practical.",
                "Write a cautious interpretation for a voluntary online poll.",
              ].map((item, index) => (
                <article
                  key={item}
                  className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
                >
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
                    Prompt {index + 1}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-neutral-700">
                    {item}
                  </p>
                </article>
              ))}
            </div>

            <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                Model answer structure
              </p>
              <p className="mt-4 text-base leading-8 text-white/75">
                “The target population is _____. The sampling frame is _____.
                The sampling method is _____. This method is suitable because
                _____. A limitation is _____.”
              </p>
            </section>
          </section>
        )}

        {activeTab === "Quiz" && (
          <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                  Quiz
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Check your understanding.
                </h2>
              </div>

              <div className="rounded-full bg-neutral-950 px-5 py-3 text-sm font-black text-white">
                Score: {score}/{quizQuestions.length}
              </div>
            </div>

            <div className="mt-8 grid gap-5">
              {quizQuestions.map((question, questionIndex) => (
                <article
                  key={question.question}
                  className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-5"
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
                                : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  {selectedAnswers[questionIndex] !== undefined ? (
                    <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm leading-7 text-neutral-700">
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
          ? "border-[#8b1116]/20 bg-[#fff7f7]"
          : "border-neutral-200 bg-[#f7f4ee]"
      }`}
    >
      <p className="text-sm font-black text-[#8b1116]">{speaker}</p>
      <p className="mt-2 text-base leading-8 text-neutral-700">{text}</p>
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
        <span className="text-sm font-black text-neutral-700">{label}</span>
        <span className="rounded-full bg-neutral-950 px-3 py-1 text-xs font-black text-white">
          {value}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 w-full accent-[#8b1116]"
      />
    </label>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-neutral-200 bg-[#f7f4ee] p-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-neutral-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-black tracking-[-0.04em]">{value}</p>
    </div>
  );
}

function AnswerCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[1.25rem] border border-neutral-200 bg-white p-5">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
        {title}
      </p>
      <p className="mt-3 text-sm leading-7 text-neutral-700">{body}</p>
    </div>
  );
}
