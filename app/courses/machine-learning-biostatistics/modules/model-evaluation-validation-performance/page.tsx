import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Model Evaluation, Validation and Performance",
  description:
    "Module 3 of Machine Learning in Biostatistics covering train/test splitting, classification metrics, ROC, AUC, calibration, bootstrap validation, leakage and reproducible model evaluation.",
};

const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return "/";
  if (
    href.startsWith("#") ||
    href.startsWith("http") ||
    href.startsWith("mailto:")
  ) {
    return href;
  }

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${basePath}${cleanHref}${hasFileExtension ? "" : "/"}`;
}

const lessons = [
  {
    number: "3.1",
    title: "Train/test split and resampling",
    duration: "95–110 min",
    status: "Locked until July 2026",
    open: false,
    theme: "Honest validation",
    description:
      "Understand why training performance is optimistic, how test sets imitate unseen patients, and why resampling gives more stable performance estimates.",
    href: "#join-waitlist",
    skills: ["Train/test split", "Resampling", "Generalisation"],
  },
  {
    number: "3.2",
    title: "Classification metrics, sensitivity, specificity, ROC and AUC",
    duration: "100–120 min",
    status: "Locked until July 2026",
    open: false,
    theme: "Discrimination",
    description:
      "Interpret confusion matrices, accuracy, sensitivity, specificity, ROC curves and AUC in clinical prediction models.",
    href: "#join-waitlist",
    skills: ["Confusion matrix", "ROC/AUC", "Thresholds"],
  },
  {
    number: "3.3",
    title: "Calibration, clinical usefulness and decision curves",
    duration: "100–120 min",
    status: "Locked until July 2026",
    open: false,
    theme: "Risk reliability",
    description:
      "Assess whether predicted probabilities agree with observed risk, and connect model predictions to decision thresholds and clinical usefulness.",
    href: "#join-waitlist",
    skills: ["Calibration", "Risk prediction", "Decision curves"],
  },
  {
    number: "3.4",
    title: "Cross-validation and bootstrap validation",
    duration: "100–120 min",
    status: "Locked until July 2026",
    open: false,
    theme: "Internal validation",
    description:
      "Use cross-validation and bootstrap validation to estimate model performance more honestly than a single training performance summary.",
    href: "#join-waitlist",
    skills: ["Cross-validation", "Bootstrap", "Optimism"],
  },
  {
    number: "3.5",
    title: "Bias, leakage and reproducibility in health ML",
    duration: "100–120 min",
    status: "Locked until July 2026",
    open: false,
    theme: "Responsible evaluation",
    description:
      "Identify common sources of biased model evaluation, including leakage, poor predictor timing, unrepresentative data and irreproducible workflows.",
    href: "#join-waitlist",
    skills: ["Leakage", "Bias", "Reproducibility"],
  },
];

const moduleStats = [
  ["5", "Lessons"],
  ["0", "Open now"],
  ["R", "Labs planned"],
  ["July 2026", "Full release"],
];

const moduleFocus = [
  {
    title: "Performance is not one number",
    body: "Accuracy, sensitivity, specificity, ROC, AUC and calibration answer different questions. This module teaches students to read them together rather than choosing one headline metric.",
  },
  {
    title: "Validation protects against overconfidence",
    body: "A model can look excellent on the data that trained it and fail on new patients. Test sets, cross-validation and bootstrap validation help estimate future-patient performance more honestly.",
  },
  {
    title: "Thresholds change decisions",
    body: "A predicted risk is not a clinical decision until a threshold is chosen. Threshold choice changes false positives, false negatives and clinical workload.",
  },
  {
    title: "Calibration matters in medicine",
    body: "Clinical prediction models often communicate risk. If a model says 30% risk, the observed risk should be close to 30% among similar patients.",
  },
  {
    title: "Leakage can destroy trust",
    body: "If information from the future, the outcome process or the test set enters model fitting, the reported performance can become dangerously optimistic.",
  },
];

const outcomes = [
  "Explain why training performance is usually too optimistic.",
  "Interpret confusion matrices in clinical prediction settings.",
  "Calculate and explain accuracy, sensitivity and specificity.",
  "Understand ROC curves and AUC as discrimination summaries.",
  "Explain why calibration is different from discrimination.",
  "Use cross-validation and bootstrap validation conceptually.",
  "Recognise data leakage and poor predictor timing.",
  "Write cautious performance reports for medical ML models.",
];

const pathway = [
  {
    step: "1",
    title: "Split",
    body: "Separate model fitting from model evaluation so performance is not judged only on data already seen by the model.",
  },
  {
    step: "2",
    title: "Classify",
    body: "Convert predicted risks into classifications using thresholds, then inspect true positives, false positives, false negatives and true negatives.",
  },
  {
    step: "3",
    title: "Discriminate",
    body: "Use ROC curves and AUC to understand how well the model ranks higher-risk and lower-risk observations.",
  },
  {
    step: "4",
    title: "Calibrate",
    body: "Check whether predicted probabilities match observed risk, especially when predictions are used for risk communication.",
  },
  {
    step: "5",
    title: "Validate",
    body: "Use cross-validation, bootstrap validation and leakage checks to estimate performance honestly.",
  },
  {
    step: "6",
    title: "Report",
    body: "Write a transparent performance summary that includes uncertainty, limitations and clinical caution.",
  },
];

const learningDesign = [
  "Clinical prediction examples based on health-data decisions",
  "Detailed notes linking model evaluation to biostatistical reasoning",
  "Browser R coding labs planned for every full lesson",
  "Downloadable R scripts for local practice",
  "Confusion matrix, ROC, calibration and validation outputs",
  "Report sections translating output into interpretation",
  "Caution boxes for leakage, optimism and threshold misuse",
];

export default function ModelEvaluationValidationPerformanceModulePage() {
  return (
    <main className="min-h-screen bg-[#F7F3EA] px-4 py-8 text-[#141210] sm:px-5 md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/courses/machine-learning-biostatistics")}
          className="text-sm font-black text-[#741018] transition hover:text-[#4d080e]"
        >
          ← Back to Machine Learning in Biostatistics
        </a>

        <section className="mt-6 overflow-hidden rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] shadow-sm md:mt-8 md:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 sm:p-6 md:p-10 lg:p-12">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm md:tracking-[0.22em]">
                Module 3 · Machine Learning in Biostatistics
              </p>

              <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[1.03] tracking-[-0.055em] md:mt-5 md:text-7xl">
                Model evaluation, validation and performance.
              </h1>

              <p className="mt-5 max-w-4xl text-base leading-8 text-[#525252] md:mt-6 md:text-lg md:leading-9">
                This module teaches how to judge whether a prediction model
                works beyond the data used to fit it. Students move from
                confusion matrices and ROC curves to calibration, resampling,
                bootstrap validation, leakage checks and responsible reporting.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={withBasePath("#module-lessons")}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#11100E] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#741018] sm:w-auto md:py-4"
                >
                  View Module 3 lessons →
                </a>

                <a
                  href={withBasePath(
                    "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics",
                  )}
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#D8CDBB] bg-[#FFFCF6] px-6 py-3.5 text-sm font-black text-[#141210] transition hover:bg-[#F7F3EA] sm:w-auto md:py-4"
                >
                  Open Lesson 1.1
                </a>

                <a
                  href={withBasePath("#join-waitlist")}
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#D8CDBB] bg-[#FFFCF6] px-6 py-3.5 text-sm font-black text-[#141210] transition hover:bg-[#F7F3EA] sm:w-auto md:py-4"
                >
                  Start learning
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {moduleStats.map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-[1.25rem] border border-[#E4DED2] bg-[#F7F3EA] p-4"
                  >
                    <p className="text-2xl font-black tracking-[-0.05em]">
                      {value}
                    </p>
                    <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-[#7a7063]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="border-t border-[#E4DED2] bg-[#11100E] p-5 text-white md:p-8 lg:border-l lg:border-t-0">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50 md:text-sm">
                Module aim
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Evaluate models honestly before trusting them.
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/70">
                A model that performs well on training data can still fail on
                new patients. This module makes validation a central
                biostatistical habit, not an optional technical step.
              </p>

              <div className="mt-7 grid gap-3">
                {[
                  "All Module 3 lessons are currently locked.",
                  "Lesson 1.1 remains available as the full course preview.",
                  "Full Module 3 lessons will include R labs and output-driven reports.",
                  "The complete release is planned for July 2026.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-white/10 bg-[#FFFCF6]/[0.07] px-4 py-3 text-sm font-bold text-white/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:mt-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm">
              What this module builds
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Performance judgement beyond accuracy.
            </h2>

            <div className="mt-6 grid gap-3">
              {moduleFocus.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] p-4"
                >
                  <h3 className="text-sm font-black text-[#141210]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#525252]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-[#E4DED2] bg-[#11100E] p-5 text-white shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/55 md:text-sm">
              By the end
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Students should evaluate health prediction models carefully.
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {outcomes.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-[#FFFCF6]/[0.06] px-4 py-3 text-sm font-bold text-white/85"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm">
                Module pathway
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                From test sets to responsible reporting.
              </h2>
            </div>

            <p className="text-sm leading-7 text-[#525252] md:text-base md:leading-8">
              The module shows how model evaluation moves from splitting data
              and counting errors to discrimination, calibration, validation,
              leakage prevention and transparent reporting.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {pathway.map((item) => (
              <article
                key={item.step}
                className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
              >
                <span className="rounded-full bg-[#11100E] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white">
                  Step {item.step}
                </span>

                <h3 className="mt-4 text-xl font-black tracking-[-0.04em]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#525252]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:mt-8 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm">
              Lesson design
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              The evaluation lessons will be output-led.
            </h2>

            <div className="mt-6 grid gap-3">
              {learningDesign.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] px-4 py-3 text-sm font-bold text-[#525252]"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-[#741018]/20 bg-[#fff4ef] p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm">
              Current release state
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] text-[#741018] md:text-5xl">
              Module 3 is open for preview.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#525252] md:text-base md:leading-8">
              Students can see the Module 3 pathway now. The full lessons are
              locked while they are redesigned with R scripts, confusion-matrix
              outputs, ROC and calibration visuals, validation reports and
              clinical interpretation.
            </p>

            <a
              href={withBasePath("#join-waitlist")}
              className="mt-6 inline-flex w-full justify-center rounded-full bg-[#741018] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#4d080e] sm:w-auto"
            >
              Start learning →
            </a>
          </article>
        </section>

        <section
          id="module-lessons"
          className="mt-6 rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10"
        >
          <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm">
                Module lessons
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Study the lessons in order.
              </h2>
            </div>

            <p className="text-sm leading-7 text-[#525252] md:text-base md:leading-8">
              All Module 3 lessons currently route to the waitlist. The full
              release will move from train/test splitting to classification
              metrics, calibration, validation and leakage prevention.
            </p>
          </div>

          <div className="mt-6 grid gap-3">
            {lessons.map((lesson) => (
              <a
                key={lesson.number}
                href={withBasePath(lesson.href)}
                className="group rounded-[1.5rem] border border-[#741018]/20 bg-[#fff4ef] p-5 transition hover:-translate-y-1 hover:bg-[#FFFCF6] hover:shadow-md md:rounded-[2rem] md:p-6"
              >
                <div className="grid gap-5 lg:grid-cols-[0.18fr_1fr_0.22fr] lg:items-start">
                  <div>
                    <p className="text-5xl font-black tracking-[-0.06em] text-[#741018]">
                      {lesson.number}
                    </p>
                    <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-[#7a7063]">
                      Lesson
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#741018] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">
                        Locked
                      </span>

                      <span className="rounded-full border border-[#E4DED2] bg-[#FFFCF6] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#5F5F5F]">
                        {lesson.duration}
                      </span>

                      <span className="rounded-full border border-[#E4DED2] bg-[#FFFCF6] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#741018]">
                        {lesson.theme}
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-black tracking-[-0.04em]">
                      {lesson.title}
                    </h3>

                    <p className="mt-3 max-w-4xl text-sm leading-7 text-[#525252] md:text-base md:leading-8">
                      {lesson.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {lesson.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-[#E4DED2] bg-[#FFFCF6] px-3 py-1.5 text-xs font-bold text-[#5F5F5F]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:text-right">
                    <span className="inline-flex rounded-full border border-[#741018]/20 bg-[#FFFCF6] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#741018]">
                      {lesson.status}
                    </span>

                    <p className="mt-5 text-sm font-black text-[#741018] transition group-hover:translate-x-1">
                      Start learning →
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section
          id="join-waitlist"
          className="mt-6 overflow-hidden rounded-[1.75rem] border border-[#E4DED2] bg-[#11100E] shadow-sm md:mt-8 md:rounded-[2.5rem]"
        >
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="p-5 text-white md:p-10">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/50 md:text-sm">
                Join the waitlist
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Get access updates when Module 3 opens in July 2026.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/75 md:text-base md:leading-8">
                Module 3 lessons are currently locked while they are redesigned
                with validation R labs, ROC and calibration visuals, bootstrap
                workflows, leakage checks and report-style interpretation.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  "Module 3 overview stays open.",
                  "All Module 3 lessons remain opening in July 2026.",
                  "Lesson 1.1 remains available as the course preview.",
                  "Waitlist visitors can request early access or release updates.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-white/10 bg-[#FFFCF6]/[0.07] px-4 py-3 text-sm font-bold text-white/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 bg-[#FFFCF6] p-5 md:p-8 lg:border-l lg:border-t-0">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018]">
                Waitlist form
              </p>

              <h3 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                Request access.
              </h3>

              <form
                action={withBasePath("/contact")}
                method="get"
                className="mt-6 grid gap-4"
              >
                <label className="grid gap-2">
                  <span className="text-sm font-black text-[#525252]">
                    Name
                  </span>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] px-4 py-3 text-sm font-bold text-[#141210] outline-none transition focus:border-[#741018] focus:bg-[#FFFCF6]"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-black text-[#525252]">
                    Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] px-4 py-3 text-sm font-bold text-[#141210] outline-none transition focus:border-[#741018] focus:bg-[#FFFCF6]"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-black text-[#525252]">
                    Interest
                  </span>
                  <select
                    name="interest"
                    defaultValue="ML Biostatistics Module 3 waitlist"
                    className="rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] px-4 py-3 text-sm font-bold text-[#141210] outline-none transition focus:border-[#741018] focus:bg-[#FFFCF6]"
                  >
                    <option>ML Biostatistics Module 3 waitlist</option>
                    <option>Machine Learning in Biostatistics waitlist</option>
                    <option>Early access</option>
                    <option>Private tutoring support</option>
                    <option>Full course release updates</option>
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-black text-[#525252]">
                    Message
                  </span>
                  <textarea
                    name="message"
                    rows={4}
                    defaultValue="I want to join the Machine Learning in Biostatistics Module 3 waitlist."
                    className="rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] px-4 py-3 text-sm font-bold text-[#141210] outline-none transition focus:border-[#741018] focus:bg-[#FFFCF6]"
                  />
                </label>

                <button
                  type="submit"
                  className="rounded-full bg-[#741018] px-6 py-4 text-sm font-black text-white transition hover:bg-[#4d080e]"
                >
                  Start learning →
                </button>

                <p className="text-xs leading-6 text-[#7a7063]">
                </p>
              </form>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-[#741018]/20 bg-[#fff4ef] p-5 shadow-sm md:mt-8 md:rounded-[2.5rem] md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018] md:text-sm">
                Recommended start
              </p>

              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.045em] text-[#741018] md:text-5xl">
                Begin with the open foundation lesson.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#525252] md:text-base md:leading-8">
                Lesson 1.1 introduces the course structure: prediction question,
                R script, model output, interpretation, report writing and
                responsible modelling caution.
              </p>
            </div>

            <a
              href={withBasePath(
                "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics",
              )}
              className="inline-flex w-full justify-center rounded-full bg-[#741018] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#4d080e] sm:w-auto md:py-4"
            >
              Open Lesson 1.1 →
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}