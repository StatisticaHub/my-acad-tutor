const steps = [
  {
    number: "Step 1",
    title: "Share your requirement",
    description:
      "Tell us your subject, academic level, deadline, software requirements and the kind of support you are looking for.",
  },
  {
    number: "Step 2",
    title: "We review the request",
    description:
      "The topic, academic level, urgency and support type are reviewed so the guidance can be matched appropriately.",
  },
  {
    number: "Step 3",
    title: "A suitable route is suggested",
    description:
      "You are directed towards the most relevant support route, whether that is subject tutoring, software guidance, course learning or research support.",
  },
  {
    number: "Step 4",
    title: "Sessions focus on understanding",
    description:
      "Support is centred on explanation, implementation, interpretation and helping you work more confidently and responsibly.",
  },
];

const canHelp = [
  "Concept explanation and topic revision",
  "Statistical method selection",
  "R, Python, SPSS, SAS and Stata guidance",
  "Code walkthroughs and debugging support",
  "Research and dissertation planning",
  "Results interpretation",
  "Tables, figures and reporting structure",
  "Exam preparation and quantitative reasoning",
];

const cannotHelp = [
  "Ghostwriting assessed work",
  "Submitting work on behalf of students",
  "Impersonation in exams, interviews or assessments",
  "Changing results to fit a desired conclusion",
  "Using confidential logins or institutional accounts",
  "Academic misconduct or dishonest completion of coursework",
];

export default function HowSupportWorks() {
  return (
    <section className="bg-[#f7f4ee] px-5 py-16 text-neutral-950 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
              How support works
            </p>

            <h2 className="font-serif-academic mt-3 text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
              A clear process for academic guidance.
            </h2>
          </div>

          <p className="max-w-3xl text-base leading-8 text-neutral-600">
            Students may need help understanding theory, choosing methods,
            reviewing software output, planning analysis or preparing for
            exams. The process is designed to keep support structured,
            transparent and focused on learning.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-[1.25rem] border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-7"
            >
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8b1116]">
                {step.number}
              </p>

              <h3 className="font-serif-academic mt-4 text-2xl font-semibold tracking-tight">
                {step.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-neutral-600">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-[1.25rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
                Academic integrity
              </p>

              <h3 className="font-serif-academic mt-3 text-4xl font-semibold tracking-tight">
                Guidance-based support, not outsourced academic work.
              </h3>

              <p className="mt-4 max-w-4xl text-sm leading-7 text-neutral-600">
                The aim is to help students understand methods, software,
                analysis decisions and interpretation. Support is designed to
                strengthen learning while respecting academic rules and
                institutional expectations.
              </p>
            </div>

            <div className="rounded-[1rem] border border-[#ead8d8] bg-[#fff8f6] p-5">
              <p className="text-sm font-semibold leading-7 text-neutral-800">
                Students remain responsible for their own submissions,
                decisions and academic work. Sessions can guide, explain,
                review and support understanding, but they are not used for
                dishonest completion of assessed tasks.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1rem] border border-emerald-200 bg-emerald-50 p-5">
              <h4 className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">
                We can help with
              </h4>

              <ul className="mt-4 grid gap-2 text-sm leading-6 text-neutral-700">
                {canHelp.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 border-b border-emerald-200/70 pb-2 last:border-b-0 last:pb-0"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1rem] border border-rose-200 bg-rose-50 p-5">
              <h4 className="text-sm font-bold uppercase tracking-[0.22em] text-rose-700">
                We do not provide
              </h4>

              <ul className="mt-4 grid gap-2 text-sm leading-6 text-neutral-700">
                {cannotHelp.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 border-b border-rose-200/70 pb-2 last:border-b-0 last:pb-0"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-rose-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[1.25rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm md:p-8">
          <div className="grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-white/50">
                Support philosophy
              </p>

              <h3 className="font-serif-academic mt-3 text-3xl font-semibold tracking-tight">
                Understand the method, not just the answer.
              </h3>
            </div>

            <p className="text-sm leading-7 text-white/75">
              The strongest academic support helps students explain what they
              are doing, why a method is suitable, how results should be
              interpreted and what limitations should be considered.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}