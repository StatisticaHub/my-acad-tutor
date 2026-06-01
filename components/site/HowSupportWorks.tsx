const steps = [
  {
    number: "Step 1",
    title: "Submit your requirement",
    description:
      "Share your subject, level, deadline, software requirements and the type of support you need.",
  },
  {
    number: "Step 2",
    title: "We review the details",
    description:
      "We look at the topic, academic level, urgency and whether the support needs statistics, software, research or subject-specific guidance.",
  },
  {
    number: "Step 3",
    title: "Support is matched",
    description:
      "We suggest a suitable tutor or support route based on the subject area and your academic goal.",
  },
  {
    number: "Step 4",
    title: "Sessions focus on understanding",
    description:
      "Support is centred on explanation, implementation, interpretation and helping you work more confidently.",
  },
];

const canHelp = [
  "Concept explanation",
  "Statistical method selection",
  "R, Python, SPSS, SAS and Stata guidance",
  "Code walkthroughs and debugging support",
  "Research and dissertation planning",
  "Results interpretation",
  "Tables, figures and reporting structure",
  "Exam preparation and topic revision",
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
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
              How support works
            </p>

            <h2 className="font-serif-academic mt-3 text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
              Clear steps from requirement to support.
            </h2>
          </div>

          <p className="max-w-3xl text-base leading-8 text-neutral-600">
            Students often come with different needs: understanding concepts,
            fixing code, planning analysis, interpreting results or preparing
            for exams. The process is designed to keep support structured and
            focused.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[1.25rem] border border-neutral-200 bg-neutral-200 lg:grid-cols-4">
          {steps.map((step) => (
            <article key={step.number} className="bg-white p-6 md:p-7">
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
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
            Academic integrity
          </p>

          <h3 className="font-serif-academic mt-3 text-4xl font-semibold tracking-tight">
            Guidance-based academic support.
          </h3>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-neutral-600">
            Our aim is to help students understand methods, software and
            interpretation. We support learning, not dishonest completion of
            academic work.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.22em] text-neutral-500">
                We can help with
              </h4>

              <ul className="mt-4 grid gap-2 text-sm leading-6 text-neutral-700">
                {canHelp.map((item) => (
                  <li key={item} className="border-b border-neutral-200 pb-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.22em] text-neutral-500">
                We do not provide
              </h4>

              <ul className="mt-4 grid gap-2 text-sm leading-6 text-neutral-700">
                {cannotHelp.map((item) => (
                  <li key={item} className="border-b border-neutral-200 pb-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}