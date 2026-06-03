const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}/`;
}

const allowedSupport = [
  "Concept explanation",
  "Statistical method selection guidance",
  "Software guidance and debugging support",
  "Research planning and interpretation",
  "Exam preparation and revision support",
  "Understanding assumptions, limitations and reporting",
];

const notProvided = [
  "Ghostwriting assessed work",
  "Submitting work on behalf of students",
  "Impersonation in exams or assessments",
  "Changing results to fit a desired conclusion",
  "Academic misconduct or dishonest completion of coursework",
  "Completing dissertations, assignments or exams for students",
];

const principles = [
  {
    title: "Learning first",
    text: "Support should help students understand ideas, not bypass the learning process.",
  },
  {
    title: "Student ownership",
    text: "Students remain responsible for their own work, decisions, writing and submissions.",
  },
  {
    title: "Transparent guidance",
    text: "Tutoring, research planning and software help must be used honestly and within university rules.",
  },
];

const safeExamples = [
  {
    title: "Safe request",
    text: "Can you explain how to choose between a t-test, ANOVA and regression for my study question?",
  },
  {
    title: "Safe request",
    text: "Can you help me understand why my R code gives an error and how to debug it?",
  },
  {
    title: "Not acceptable",
    text: "Can you write my assessed analysis report or complete my dissertation results section for me?",
  },
];

export default function AcademicIntegrityPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/")}
          className="text-sm font-bold text-[#8b1116] hover:text-[#5f0b0f]"
        >
          ← Back to homepage
        </a>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Academic integrity
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl font-sans text-4xl font-black leading-[1.02] tracking-[-0.05em] md:text-6xl">
                Guidance-based academic support.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                My Academic Tutor supports learning, interpretation, research
                planning and academic confidence. Support is designed to help
                students understand and work independently.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                We do not complete assessed work, write submissions, take exams,
                impersonate students or provide any service that would breach
                academic integrity rules.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-5">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Core rule
              </p>

              <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                We explain, guide and teach — we do not replace student work.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                Students should use support to strengthen understanding,
                planning and interpretation while following their university,
                school or course regulations.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Guidance", "Learning support"],
              ["Integrity", "Responsible practice"],
              ["Independent", "Student ownership"],
              ["Transparent", "Clear boundaries"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-neutral-200 bg-[#f7f4ee] p-5"
              >
                <p className="font-sans text-2xl font-black tracking-[-0.04em] text-[#111111]">
                  {value}
                </p>
                <p className="mt-2 text-sm font-bold text-neutral-600">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {principles.map((principle, index) => (
            <article
              key={principle.title}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <p className="font-sans text-3xl font-black tracking-[-0.05em] text-[#8b1116]">
                {String(index + 1).padStart(2, "0")}
              </p>

              <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                {principle.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {principle.text}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              We can help with
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Support that strengthens understanding.
            </h2>

            <p className="mt-5 text-base leading-8 text-neutral-700">
              These forms of support are designed to improve learning,
              confidence and independent academic reasoning.
            </p>

            <div className="mt-6 grid gap-3">
              {allowedSupport.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold leading-6 text-neutral-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 text-[#111111] shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-neutral-700">
              We do not provide
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Work that breaches academic rules.
            </h2>

            <p className="mt-5 text-base leading-8 text-neutral-700">
              We will decline requests that involve dishonest completion,
              misrepresentation, impersonation or manipulation of academic
              work.
            </p>

            <div className="mt-6 grid gap-3">
              {notProvided.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold leading-6 text-neutral-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Examples of requests
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <h2 className="max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Ask for explanation, not replacement work.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              A request is usually appropriate when it helps you understand a
              concept, plan your own work, interpret your own results or follow
              a method responsibly.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {safeExamples.map((example) => (
              <article
                key={example.text}
                className={`rounded-[2rem] border p-6 ${
                  example.title === "Not acceptable"
                    ? "border-[#ead8d8] bg-[#f8e9ea]"
                    : "border-neutral-200 bg-[#f7f4ee]"
                }`}
              >
                <p
                  className={`text-sm font-black uppercase tracking-[0.18em] ${
                    example.title === "Not acceptable"
                      ? "text-[#8b1116]"
                      : "text-neutral-700"
                  }`}
                >
                  {example.title}
                </p>

                <p className="mt-4 text-sm font-bold leading-7 text-neutral-800">
                  {example.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Student responsibility
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              You remain responsible for your own academic work.
            </h2>

            <p className="mt-5 text-base leading-8 text-neutral-700">
              Students should check their university or institution rules before
              using any external academic support. Any final submission,
              analysis, interpretation, writing or decision must be the
              student’s own responsibility.
            </p>

            <p className="mt-4 text-base leading-8 text-neutral-700">
              Support can help you understand what methods mean, how software
              works, what assumptions matter and how results should be
              interpreted. It should not be used to misrepresent authorship or
              avoid assessed learning.
            </p>
          </article>

          <article className="rounded-[2rem] border border-[#ded9cf] bg-white p-6 text-[#111111] shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-neutral-700">
              Unsure about a request?
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Ask before sending materials.
            </h2>

            <p className="mt-5 text-base leading-8 text-neutral-700">
              If you are unsure whether your request is appropriate, send a
              short message describing the topic, your goal and your university
              rules. We can confirm whether the support can be provided
              responsibly.
            </p>

            <a
              href={withBasePath("/contact")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              Contact us →
            </a>
          </article>
        </section>
      </section>
    </main>
  );
}