"use client";

import LockedLessonGate from "@/components/course/LockedLessonGate";
import { isStatisticsFoundationLessonOpen } from "@/lib/statisticsFoundationAccess";


import { useMemo, useState } from "react";

const tabs = [
  "Learning Route",
  "Lecture",
  "Detailed Notes",
  "Visual Studio",
  "Animated Mentor",
  "Worked Examples",
  "Practice Studio",
  "Reflection",
  "Quiz",
];

const learningRoute = [
  {
    time: "0–10 min",
    title: "Why populations matter",
    body:
      "Understand that every statistical conclusion needs a clearly defined target group.",
  },
  {
    time: "10–25 min",
    title: "Samples as evidence",
    body:
      "Learn why samples are used, why they vary, and why representativeness matters.",
  },
  {
    time: "25–40 min",
    title: "Variables and measurement",
    body:
      "Distinguish numerical, categorical, binary, ordinal and time-to-event variables.",
  },
  {
    time: "40–55 min",
    title: "Sampling quality",
    body:
      "Explore bias, random error, undercoverage, non-response and measurement error.",
  },
  {
    time: "55–70 min",
    title: "Worked examples",
    body:
      "Apply the ideas to education, health, public surveys and research examples.",
  },
  {
    time: "70–80 min",
    title: "Practice and quiz",
    body:
      "Write careful explanations and check your understanding with feedback.",
  },
];

const lectureConcepts = [
  {
    title: "The population answers: who is the conclusion about?",
    body:
      "A population is not just a large group. It is the exact group, process or set of units the research question refers to. If the population is unclear, the conclusion becomes unclear.",
    example:
      "If we ask about average study time among first-year students at one university, the population is not all students in the world. It is the first-year students at that university.",
  },
  {
    title: "The sample answers: who was actually observed?",
    body:
      "A sample is the part of the population from which data are collected. The sample is the evidence, but it may not perfectly represent the population.",
    example:
      "If 180 first-year students complete a survey, those 180 students are the sample.",
  },
  {
    title: "A variable answers: what was measured?",
    body:
      "A variable is a characteristic recorded for each unit. The type of variable affects the correct summary, graph and interpretation.",
    example:
      "Study time is numerical, degree subject is categorical, satisfaction level is ordinal, and whether a student passed is binary.",
  },
  {
    title: "Sampling quality determines trust",
    body:
      "A sample can be large and still misleading if it is biased. Representativeness, response rate and measurement quality matter as much as sample size.",
    example:
      "A survey sent only to students who attend extra workshops may overestimate study time.",
  },
];

const detailedNotes = [
  {
    title: "Target population",
    short: "The group the study wants to make conclusions about.",
    detail:
      "The target population is the ideal group the research question refers to. It must be defined using clear inclusion and exclusion rules. In real studies, the target population is often broader than the people we actually observe. The more carefully the population is defined, the easier it becomes to judge whether the data are relevant.",
    example:
      "All first-year undergraduate students enrolled at a university during the 2026 academic year.",
    warning:
      "Avoid vague populations such as “students” or “patients” unless the boundaries are clear.",
  },
  {
    title: "Study population",
    short: "The accessible part of the target population.",
    detail:
      "Sometimes researchers cannot access the full target population. The study population is the group from which the sample can realistically be drawn. This distinction is important because conclusions may only be valid for the accessible group, not necessarily the wider target population.",
    example:
      "Students with active university email accounts who can receive the survey link.",
    warning:
      "If important groups cannot be reached, undercoverage may occur.",
  },
  {
    title: "Sampling frame",
    short: "The list or system used to identify possible sample members.",
    detail:
      "A sampling frame is the practical source from which sample units are selected. It might be a student register, patient list, electoral roll, appointment system or database. A poor sampling frame can create bias before any analysis begins.",
    example:
      "A university enrolment database used to randomly invite students.",
    warning:
      "If the frame excludes part-time students, then part-time students cannot be sampled.",
  },
  {
    title: "Sample",
    short: "The units actually observed.",
    detail:
      "The sample provides the data. A good sample is not merely large; it should be relevant and reasonably representative. Sampling methods include simple random sampling, stratified sampling, cluster sampling and convenience sampling. Some methods are stronger than others for inference.",
    example:
      "A random selection of 250 students who answer a study-time survey.",
    warning:
      "Convenience samples are easy to collect but often weak for population conclusions.",
  },
  {
    title: "Variable",
    short: "A characteristic measured for each unit.",
    detail:
      "Variables are the columns of a dataset. Each row usually represents a unit, such as a person, school, clinic or measurement occasion. Variables must be measured consistently. Poor measurement can damage a study even when the sample is large.",
    example:
      "Age, subject, weekly study hours, exam score, pass/fail status.",
    warning:
      "A badly worded survey question can create measurement error.",
  },
  {
    title: "Unit of observation",
    short: "The object or individual on which data are recorded.",
    detail:
      "The unit of observation is what each row of the data represents. It might be a student, a patient, a household, a hospital, a country or a repeated measurement. Confusing the unit of observation can lead to wrong summaries and wrong conclusions.",
    example:
      "If each row is one student, the unit is the student. If each row is one exam attempt, the unit is the attempt.",
    warning:
      "Repeated measurements from the same person should not always be treated as independent people.",
  },
];

const variableTypes = [
  {
    title: "Numerical continuous",
    description:
      "Values can vary along a scale and may include decimals. Summaries often include mean, median, standard deviation and range.",
    examples: "Height, blood pressure, study hours, temperature.",
  },
  {
    title: "Numerical discrete",
    description:
      "Values are counts. They are numerical but usually take whole-number values.",
    examples: "Number of absences, number of hospital visits, number of siblings.",
  },
  {
    title: "Categorical nominal",
    description:
      "Values are labels with no natural order. Summaries often use counts, percentages and bar charts.",
    examples: "Degree subject, blood group, country, treatment group.",
  },
  {
    title: "Categorical ordinal",
    description:
      "Values have a meaningful order, but gaps between categories may not be equal.",
    examples: "Satisfaction level, disease severity, Likert scale ratings.",
  },
  {
    title: "Binary",
    description:
      "A special categorical variable with two possible outcomes.",
    examples: "Pass/fail, yes/no, disease/no disease, smoker/non-smoker.",
  },
  {
    title: "Time-to-event",
    description:
      "Measures the time until an event occurs. These variables often need special survival-analysis methods.",
    examples: "Time to recovery, time to relapse, time until graduation.",
  },
];

const samplingProblems = [
  {
    title: "Undercoverage",
    body:
      "Some members of the population are missing from the sampling frame, so they have no chance of being selected.",
    example:
      "An online-only survey excludes students with poor internet access.",
  },
  {
    title: "Non-response",
    body:
      "Selected people do not respond. If non-responders differ from responders, the result may be biased.",
    example:
      "Students with low engagement may be less likely to answer a course survey.",
  },
  {
    title: "Convenience sampling",
    body:
      "The sample is chosen because it is easy to access, not because it represents the population well.",
    example:
      "Surveying only students in the library at 9 am.",
  },
  {
    title: "Measurement error",
    body:
      "The variable is recorded inaccurately or inconsistently.",
    example:
      "Students estimate study time from memory instead of using a study log.",
  },
];

const scenarios = [
  {
    title: "University study survey",
    question:
      "A university wants to estimate average weekly study time for all first-year students. It emails 600 students selected from the enrolment database. 240 respond.",
    targetPopulation: "All first-year students enrolled at the university.",
    studyPopulation: "First-year students with active university email accounts.",
    samplingFrame: "The university enrolment database.",
    sample: "The 240 students who responded.",
    variables:
      "Weekly study hours, degree subject, accommodation type, satisfaction rating.",
    concern:
      "Non-response may bias the estimate if students who respond have different study habits from those who do not respond.",
  },
  {
    title: "Clinic blood pressure audit",
    question:
      "A clinic wants to summarise systolic blood pressure among adult registered patients. It uses readings from patients who attended appointments in the last month.",
    targetPopulation: "All adult registered patients at the clinic.",
    studyPopulation: "Adult registered patients who attended during the last month.",
    samplingFrame: "Appointment records from the clinic system.",
    sample: "Patients with a recorded blood pressure reading in that month.",
    variables:
      "Systolic blood pressure, age, sex, medication status, appointment type.",
    concern:
      "Patients attending appointments may be less healthy than those who did not attend, so the sample may overestimate blood pressure.",
  },
  {
    title: "Course satisfaction form",
    question:
      "A department asks students to rate a new statistics course from 1 to 5. The form is completed by students who choose to respond.",
    targetPopulation: "All students enrolled on the course.",
    studyPopulation: "Students who received the form.",
    samplingFrame: "Course mailing list.",
    sample: "Students who submitted the satisfaction form.",
    variables:
      "Satisfaction rating, attendance pattern, prior statistics experience, preferred learning format.",
    concern:
      "Voluntary response may overrepresent students with strong opinions.",
  },
];

const mentorTopics = [
  {
    id: "population",
    label: "Define population",
    answer:
      "Start by asking: who should the conclusion apply to? A population must have boundaries. Time, place, eligibility and context all matter.",
  },
  {
    id: "sample",
    label: "Judge sample quality",
    answer:
      "A sample is useful when it gives relevant evidence about the population. Ask who was included, who was excluded, and who did not respond.",
  },
  {
    id: "frame",
    label: "Sampling frame",
    answer:
      "The sampling frame is the practical list or system used to select units. If the frame misses part of the population, the sample may be biased.",
  },
  {
    id: "variables",
    label: "Classify variables",
    answer:
      "Classifying variables helps choose suitable summaries and graphs. Numerical variables are not handled the same way as categorical or ordinal variables.",
  },
  {
    id: "bias",
    label: "Spot bias",
    answer:
      "Bias is systematic distortion. It can enter through poor sampling, non-response, undercoverage or poor measurement.",
  },
];

const practiceTasks = [
  {
    title: "Define the target population",
    task:
      "A city wants to estimate the proportion of adults who use public transport at least three times per week.",
    prompts: [
      "Write a precise target population.",
      "Suggest a possible sampling frame.",
      "Name one possible source of undercoverage.",
    ],
  },
  {
    title: "Classify the variables",
    task:
      "A school records age, exam score, favourite subject, satisfaction level from 1 to 5, and pass/fail status.",
    prompts: [
      "Classify each variable.",
      "Which variables are suitable for a bar chart?",
      "Which variables could be summarised using a mean?",
    ],
  },
  {
    title: "Evaluate the sample",
    task:
      "A researcher surveys people leaving a gym to estimate exercise habits in the whole city.",
    prompts: [
      "Identify the population the researcher wants.",
      "Identify the actual sample.",
      "Explain why the sample may be biased.",
    ],
  },
];

const quizQuestions = [
  {
    question: "What is a target population?",
    options: [
      "The people who answered the survey.",
      "The full group the research question wants to make conclusions about.",
      "The numerical summary calculated from the data.",
      "The list of variables in the dataset.",
    ],
    answer: 1,
    feedback:
      "The target population is the full group the study wants to understand.",
  },
  {
    question: "What is a sampling frame?",
    options: [
      "The practical list or system used to identify possible sample members.",
      "A graph showing the sample mean.",
      "The final conclusion of the study.",
      "The value of the population parameter.",
    ],
    answer: 0,
    feedback:
      "The sampling frame is the source used to select or contact possible sample members.",
  },
  {
    question: "Which variable is ordinal?",
    options: [
      "Blood pressure in mmHg.",
      "Degree subject.",
      "Satisfaction rating: very poor, poor, fair, good, excellent.",
      "Number of hospital visits.",
    ],
    answer: 2,
    feedback:
      "Ordinal variables have ordered categories, but the gaps between categories may not be equal.",
  },
  {
    question: "Why can non-response cause bias?",
    options: [
      "Because it always makes the sample larger.",
      "Because non-responders may differ from responders.",
      "Because it changes a numerical variable into a categorical variable.",
      "Because graphs cannot be drawn after non-response.",
    ],
    answer: 1,
    feedback:
      "Non-response is a problem when those who do not respond differ systematically from those who do.",
  },
  {
    question: "Which statement is most careful?",
    options: [
      "A large sample always represents the population.",
      "A convenience sample is always better than a random sample.",
      "Sample quality depends on size, selection, response and measurement.",
      "Variable type does not affect analysis.",
    ],
    answer: 2,
    feedback:
      "Sample quality is about more than size. Selection, response and measurement all matter.",
  },
];

export default function PopulationsSamplesVariablesLesson() {
  const lessonCode = "1.2";

  if (!isStatisticsFoundationLessonOpen(lessonCode)) {
    return (
      <LockedLessonGate
        lessonCode={lessonCode}
        lessonTitle="Populations, samples and variables"
        moduleTitle="Module 1: Introduction to Statistical Thinking"
      />
    );
  }

  const [activeTab, setActiveTab] = useState("Learning Route");
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [sampleSize, setSampleSize] = useState(160);
  const [responseRate, setResponseRate] = useState(55);
  const [coverage, setCoverage] = useState(80);
  const [measurementQuality, setMeasurementQuality] = useState(75);
  const [mentorTopic, setMentorTopic] = useState("population");
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(
    {},
  );

  const activeScenario = scenarios[scenarioIndex];
  const activeMentor =
    mentorTopics.find((topic) => topic.id === mentorTopic) ?? mentorTopics[0];

  const studio = useMemo(() => {
    const selectedUnits = Math.round(sampleSize / 5);
    const respondents = Math.round(selectedUnits * (responseRate / 100));
    const missedUnits = Math.max(0, Math.round(80 * (1 - coverage / 100)));
    const trustScore = Math.max(
      10,
      Math.min(
        98,
        sampleSize * 0.08 +
          responseRate * 0.28 +
          coverage * 0.32 +
          measurementQuality * 0.25 -
          18,
      ),
    );

    let message = "The sample gives useful evidence, but limitations remain.";
    if (trustScore < 45) {
      message =
        "The design is weak. The conclusion should be very cautious because coverage, response or measurement quality is poor.";
    } else if (trustScore < 70) {
      message =
        "The design is moderate. The sample may be useful, but possible bias and missing data should be reported.";
    } else {
      message =
        "The design is stronger. The conclusion is more trustworthy, although uncertainty still remains.";
    }

    return {
      selectedUnits,
      respondents,
      missedUnits,
      trustScore,
      message,
    };
  }, [coverage, measurementQuality, responseRate, sampleSize]);

  const populationGrid = useMemo(() => {
    return Array.from({ length: 80 }, (_, index) => {
      const outOfFrame = index < studio.missedUnits;
      const selected = !outOfFrame && index < studio.selectedUnits + studio.missedUnits;
      const responded = selected && index < studio.respondents + studio.missedUnits;

      return {
        id: index,
        outOfFrame,
        selected,
        responded,
      };
    });
  }, [studio.missedUnits, studio.respondents, studio.selectedUnits]);

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
          50% { transform: scale(1.22); opacity: 1; }
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
                Statistics Foundation · Lesson 1.2
              </p>

              <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-7xl">
                Populations, samples and variables.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">
                This lesson goes deeper than Lesson 1.1. You will learn how to
                define a population precisely, judge whether a sample is useful,
                classify variables correctly, and recognise sampling problems
                before any calculation begins.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "70–80 minutes",
                  "No coding",
                  "Sampling studio",
                  "Variable classifier",
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
                Lesson pathway
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                From target group to measured data.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Target population",
                  "Study population",
                  "Sampling frame",
                  "Sample",
                  "Variables",
                  "Possible bias",
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
                70–80 minute lesson plan
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Learn how data becomes a study.
              </h2>

              <p className="mt-5 text-base leading-8 text-[#525252]">
                In Lesson 1.1, you learned that statistics turns data into
                evidence. This lesson explains where that data comes from. The
                quality of the population definition, sampling process and
                variable measurement determines how much we can trust the final
                conclusion.
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
                Mastery checklist
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                By the end, you should be able to audit a dataset before analysis.
              </h2>

              <div className="mt-8 grid gap-3">
                {[
                  "Define the target population precisely.",
                  "Separate target population from study population.",
                  "Explain what a sampling frame is.",
                  "Judge whether a sample may be biased.",
                  "Classify common variable types.",
                  "Explain why measurement quality matters.",
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
                Concept board
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                The study structure comes before the calculation.
              </h2>

              <p className="mt-4 text-base leading-8 text-[#525252]">
                Before calculating a mean or drawing a graph, we must know who
                the study is about, who was observed, and what was measured.
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
                Guided lecture
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Mr. R builds the dataset from the question.
              </h2>

              <div className="mt-6 grid gap-4">
                <Dialogue
                  speaker="Mr. R"
                  text="In Lesson 1.1, we said statistics begins with a question. Today we ask: who is the question about, who did we actually observe, and what did we measure?"
                />
                <Dialogue
                  speaker="Amelia"
                  text="So the population is the group we want to understand?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Yes. But we must define it precisely. A vague population creates a vague conclusion."
                />
                <Dialogue
                  speaker="Ben"
                  text="If we cannot observe everyone, we use a sample?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Correct. The sample is the evidence we actually collect. But we must ask whether that sample represents the population."
                />
                <Dialogue
                  speaker="Chloe"
                  text="So a sample can be large but still biased?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Exactly. If the sampling process systematically excludes certain people, a large sample may simply give a very precise wrong answer."
                />
                <Dialogue
                  speaker="Daniel"
                  text="And variables are the things we measure on each person?"
                />
                <Dialogue
                  speaker="Mr. R"
                  text="Yes. The variable type matters because it determines which summaries, graphs and interpretations are suitable."
                />
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
              Populations, samples and variables in depth.
            </h2>

            <p className="mt-5 max-w-4xl text-base leading-8 text-[#525252]">
              A dataset is not just a table of numbers. It is the result of a
              study design. Each row, column and missing value has a meaning.
              Good statistical work begins by understanding that structure.
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
                  <p className="mt-3 rounded-2xl bg-[#11100E] px-4 py-3 text-sm font-bold leading-7 text-white">
                    Caution: {note.warning}
                  </p>
                </article>
              ))}
            </div>

            <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                Variable classification
              </p>

              <h3 className="mt-3 text-3xl font-black tracking-[-0.04em]">
                Variable type controls the analysis.
              </h3>

              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {variableTypes.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[1.5rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-5"
                  >
                    <h4 className="text-xl font-black">{item.title}</h4>
                    <p className="mt-3 text-sm leading-7 text-white/70">
                      {item.description}
                    </p>
                    <p className="mt-4 rounded-2xl bg-[#FFFCF6] px-4 py-3 text-sm font-bold leading-7 text-neutral-900">
                      {item.examples}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-8 rounded-[2rem] border border-[#741018]/20 bg-[#fff4ef] p-6">
              <h3 className="text-2xl font-black tracking-[-0.04em] text-[#741018]">
                The main lesson
              </h3>

              <p className="mt-4 text-base leading-8 text-[#525252]">
                The quality of a statistical conclusion is limited by the
                quality of the population definition, sampling frame, sample
                selection, response process and variable measurement. Advanced
                methods cannot fully repair a poorly designed dataset.
              </p>
            </section>
          </section>
        )}

        {activeTab === "Visual Studio" && (
          <section className="mt-8 grid gap-6">
            <section className="overflow-hidden rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="p-6 md:p-8">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                    Sampling studio
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    Build a sample and judge its quality.
                  </h2>

                  <p className="mt-4 text-base leading-8 text-[#525252]">
                    Move the controls to see how sample size, response rate,
                    coverage and measurement quality change the trustworthiness
                    of a sample.
                  </p>

                  <div className="mt-6 grid gap-5">
                    <Slider
                      label="Sample size"
                      value={sampleSize}
                      min={50}
                      max={300}
                      onChange={setSampleSize}
                    />
                    <Slider
                      label="Response rate"
                      value={responseRate}
                      min={10}
                      max={100}
                      onChange={setResponseRate}
                    />
                    <Slider
                      label="Coverage"
                      value={coverage}
                      min={40}
                      max={100}
                      onChange={setCoverage}
                    />
                    <Slider
                      label="Measurement quality"
                      value={measurementQuality}
                      min={30}
                      max={100}
                      onChange={setMeasurementQuality}
                    />
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Metric label="Selected units" value={`${studio.selectedUnits}`} />
                    <Metric label="Respondents" value={`${studio.respondents}`} />
                    <Metric label="Out of frame" value={`${studio.missedUnits}`} />
                    <Metric label="Trust score" value={`${studio.trustScore.toFixed(0)}%`} />
                  </div>
                </div>

                <div className="border-t border-[#E4DED2] bg-[#11100E] p-6 text-white md:p-8 lg:border-l lg:border-t-0">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                    Interpretation
                  </p>

                  <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                    What does the design suggest?
                  </h2>

                  <p className="mt-6 text-lg leading-9 text-white/80">
                    {studio.message}
                  </p>

                  <div className="mt-8 grid gap-3">
                    {[
                      {
                        title: "Coverage",
                        body:
                          "Do all population members have a realistic chance of entering the sample?",
                      },
                      {
                        title: "Response",
                        body:
                          "Are the people who respond likely to differ from those who do not?",
                      },
                      {
                        title: "Measurement",
                        body:
                          "Is the variable measured consistently, accurately and clearly?",
                      },
                    ].map((item) => (
                      <article
                        key={item.title}
                        className="rounded-[1.5rem] border border-white/10 bg-[#FFFCF6]/[0.07] p-4"
                      >
                        <h3 className="font-black">{item.title}</h3>
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
              <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Population grid
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                  Who is missing, selected or responding?
                </h2>

                <div className="mt-6 rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
                  <div className="grid grid-cols-10 gap-2">
                    {populationGrid.map((unit) => (
                      <div
                        key={unit.id}
                        className={`aspect-square rounded-full transition ${
                          unit.outOfFrame
                            ? "bg-[#741018]/35"
                            : unit.responded
                              ? "bg-[#11100E]"
                              : unit.selected
                                ? "bg-neutral-500"
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

                  <div className="mt-5 grid gap-3 text-sm leading-7 text-[#525252] md:grid-cols-4">
                    <div className="rounded-2xl bg-[#FFFCF6] p-4">
                      <strong>Grey:</strong> population not selected.
                    </div>
                    <div className="rounded-2xl bg-[#FFFCF6] p-4">
                      <strong>Medium:</strong> selected but no response.
                    </div>
                    <div className="rounded-2xl bg-[#FFFCF6] p-4">
                      <strong>Dark:</strong> selected and responded.
                    </div>
                    <div className="rounded-2xl bg-[#FFFCF6] p-4">
                      <strong>Red:</strong> out of frame.
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Variable classifier
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                  Match variables to summaries.
                </h2>

                <div className="mt-6 grid gap-3">
                  {[
                    ["Study hours", "Numerical continuous", "Mean, median, histogram"],
                    ["Degree subject", "Categorical nominal", "Counts, percentages, bar chart"],
                    ["Satisfaction 1–5", "Ordinal", "Median, percentages, ordered bar chart"],
                    ["Passed exam", "Binary", "Proportion, percentage"],
                    ["Number of absences", "Numerical discrete", "Mean, median, count plot"],
                  ].map(([variable, type, summary]) => (
                    <article
                      key={variable}
                      className="rounded-[1.25rem] border border-[#E4DED2] bg-[#F7F3EA] p-4"
                    >
                      <h3 className="font-black">{variable}</h3>
                      <p className="mt-2 text-sm leading-7 text-[#525252]">
                        <strong>Type:</strong> {type}
                      </p>
                      <p className="text-sm leading-7 text-[#525252]">
                        <strong>Useful summaries:</strong> {summary}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            </section>
          </section>
        )}

        {activeTab === "Animated Mentor" && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
            <section className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Animated mentor
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Ask Mr. R about study design.
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
                  Choose one real study question. Write the target population,
                  sampling frame, sample, unit of observation and three
                  variables.
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
              Break a study into its statistical parts.
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
                <AnswerCard
                  title="Target population"
                  body={activeScenario.targetPopulation}
                />
                <AnswerCard
                  title="Study population"
                  body={activeScenario.studyPopulation}
                />
                <AnswerCard
                  title="Sampling frame"
                  body={activeScenario.samplingFrame}
                />
                <AnswerCard title="Sample" body={activeScenario.sample} />
                <AnswerCard title="Variables" body={activeScenario.variables} />
                <AnswerCard title="Main concern" body={activeScenario.concern} />
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
              Practise population, sample and variable reasoning.
            </h2>

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
              Write like a careful statistician.
            </h2>

            <div className="mt-8 grid gap-5">
              {[
                {
                  title: "Prompt 1",
                  body:
                    "Explain why the target population should be defined before collecting data.",
                },
                {
                  title: "Prompt 2",
                  body:
                    "Describe the difference between a sample and a sampling frame using your own example.",
                },
                {
                  title: "Prompt 3",
                  body:
                    "Choose five variables from a real study and classify each variable type.",
                },
                {
                  title: "Prompt 4",
                  body:
                    "Write a cautious conclusion for a study with low response rate but large sample size.",
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
                “The target population is _____. The sampling frame is _____.
                The sample consists of _____. The main variables are _____.
                The conclusion should be cautious because _____.”
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
