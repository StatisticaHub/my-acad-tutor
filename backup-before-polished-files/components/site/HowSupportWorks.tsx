const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}/`;
}

const steps = [
  {
    number: "01",
    eyebrow: "Step 1",
    title: "Share your requirement",
    description:
      "Tell us your subject, academic level, deadline, software requirements and the kind of support you are looking for.",
  },
  {
    number: "02",
    eyebrow: "Step 2",
    title: "We review the request",
    description:
      "The topic, academic level, urgency and support type are reviewed so the guidance can be matched appropriately.",
  },
  {
    number: "03",
    eyebrow: "Step 3",
    title: "A suitable route is suggested",
    description:
      "You are directed towards the most relevant support route, whether that is subject tutoring, software guidance, course learning or research support.",
  },
  {
    number: "04",
    eyebrow: "Step 4",
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

const principles = [
  {
    title: "Explain before doing",
    text: "Support should help students understand the concept, method and reasoning behind the task.",
  },
  {
    title: "Guide, review and clarify",
    text: "Sessions can review ideas, explain output, clarify assumptions and help students plan next steps.",
  },
  {
    title: "Keep ownership with the student",
    text: "Students remain responsible for final decisions, writing, submissions and academic compliance.",
  },
];

export default function HowSupportWorks() {
  return (
    <section className="bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                How support works
              </p>

              <h2 className="mt-4 max-w-4xl font-sans text-3xl font-black leading-tight tracking-[-0.04em] md:text-5xl">
                A clear process for academic guidance.
              </h2>
            </div>

            <p className="max-w-4xl text-base leading-8 text-neutral-700">
              Students may need help understanding theory, choosing methods,
              reviewing software output, planning analysis or preparing for
              exams. The process is designed to keep support structured,
              transparent and focused on learning.
            </p>
          </div>
        </section>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="font-sans text-3xl font-black tracking-[-0.05em] text-[#8b1116]">
                  {step.number}
                </p>

                <span className="rounded-full bg-[#f7f4ee] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-neutral-700">
                  {step.eyebrow}
                </span>
              </div>

              <h3 className="mt-5 font-sans text-2xl font-black leading-tight tracking-[-0.04em]">
                {step.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Academic integrity
              </p>

              <h3 className="mt-4 max-w-3xl font-sans text-3xl font-black leading-tight tracking-[-0.04em] md:text-4xl">
                Guidance-based support, not outsourced academic work.
              </h3>

              <p className="mt-5 max-w-4xl text-base leading-8 text-neutral-700">
                The aim is to help students understand methods, software,
                analysis decisions and interpretation. Support is designed to
                strengthen learning while respecting academic rules and
                institutional expectations.
              </p>

              <a
                href={withBasePath("/academic-integrity")}
                className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
              >
                Read integrity policy →
              </a>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-5 md:p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Student responsibility
              </p>

              <p className="mt-4 text-base font-bold leading-8 text-neutral-800">
                Students remain responsible for their own submissions,
                decisions and academic work. Sessions can guide, explain,
                review and support understanding, but they are not used for
                dishonest completion of assessed tasks.
              </p>

              <div className="mt-5 grid gap-3">
                {principles.map((principle) => (
                  <div
                    key={principle.title}
                    className="rounded-2xl border border-neutral-200 bg-white p-4"
                  >
                    <h4 className="font-sans text-lg font-black tracking-[-0.03em]">
                      {principle.title}
                    </h4>

                    <p className="mt-2 text-sm leading-7 text-neutral-700">
                      {principle.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5 md:p-6">
              <h4 className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
                We can help with
              </h4>

              <div className="mt-5 grid gap-3">
                {canHelp.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-bold leading-6 text-neutral-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-neutral-200 bg-white p-5 text-[#111111] md:p-6">
              <h4 className="text-sm font-black uppercase tracking-[0.22em] text-neutral-700">
                We do not provide
              </h4>

              <div className="mt-5 grid gap-3">
                {cannotHelp.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[#ded9cf] bg-[#f7f4ee] px-4 py-3 text-sm font-bold leading-6 text-neutral-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-[#ded9cf] bg-white p-6 text-[#111111] shadow-sm md:p-8">
          <div className="grid gap-6 md:grid-cols-[0.86fr_1.14fr] md:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-neutral-700">
                Support philosophy
              </p>

              <h3 className="mt-4 max-w-3xl font-sans text-3xl font-black leading-tight tracking-[-0.04em] md:text-4xl">
                Understand the method, not just the answer.
              </h3>
            </div>

            <p className="text-base leading-8 text-neutral-700">
              The strongest academic support helps students explain what they
              are doing, why a method is suitable, how results should be
              interpreted and what limitations should be considered.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}