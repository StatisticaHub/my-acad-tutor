const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}/`;
}

const routes = [
  {
    number: "01",
    title: "I want to learn statistics from the beginning",
    href: "/courses/statistics-foundation",
    recommendation: "Start with Statistics Foundation",
    description:
      "Best for students who want a structured, zero-coding course covering statistical thinking, probability, inference, regression foundations, notation and interpretation.",
    bestFor: [
      "You are new to statistics",
      "You want a clear course pathway",
      "You prefer theory and interpretation",
      "You want no coding at the foundation stage",
    ],
  },
  {
    number: "02",
    title: "I want to learn machine learning for health data",
    href: "/courses/machine-learning-biostatistics",
    recommendation: "Open Machine Learning in Biostatistics",
    description:
      "Best for students who already know some statistics and want to understand prediction modelling, validation, overfitting, calibration and medical ML interpretation.",
    bestFor: [
      "You are interested in clinical prediction",
      "You want validation and model evaluation",
      "You want health-data examples",
      "You want applied biostatistical ML",
    ],
  },
  {
    number: "03",
    title: "I need help with a topic, module or assignment concept",
    href: "/services",
    recommendation: "Explore academic support services",
    description:
      "Best if you need guided explanation, tutoring, method clarification, software guidance or support understanding analysis concepts.",
    bestFor: [
      "You are stuck on a topic",
      "You need explanation, not shortcuts",
      "You want help understanding methods",
      "You need guided academic support",
    ],
  },
  {
    number: "04",
    title: "I am working on a dissertation or research project",
    href: "/contact",
    recommendation: "Request research support",
    description:
      "Best if you need help thinking through research questions, variables, study design, statistical methods, analysis planning or interpretation.",
    bestFor: [
      "You are planning a project",
      "You need method guidance",
      "You need help with interpretation",
      "You want to discuss your analysis plan",
    ],
  },
  {
    number: "05",
    title: "I want free resources and guides",
    href: "/resources",
    recommendation: "Open resources",
    description:
      "Best if you want short guides, study notes, checklists and interpretation resources for statistics, biostatistics, programming and research methods.",
    bestFor: [
      "You want quick topic guides",
      "You need checklists",
      "You want interpretation help",
      "You want extra revision support",
    ],
  },
];

const decisionSteps = [
  {
    title: "Choose your goal",
    text: "Decide whether you need a full course, a single-topic explanation, research guidance or quick revision resources.",
  },
  {
    title: "Pick the right route",
    text: "Use the cards below to select the pathway that best matches your current academic need.",
  },
  {
    title: "Start with structure",
    text: "Begin with the recommended page, then move through lessons, resources or enquiry steps in order.",
  },
];

export default function StartHerePage() {
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
            Start here
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl font-sans text-4xl font-black leading-[1.02] tracking-[-0.05em] md:text-6xl">
                Choose the right route for your learning goal.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                My Academic Tutor gives you two main ways to learn: structured
                courses for step-by-step study, and responsible academic support
                for students who need help understanding quantitative subjects.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                Use this page to decide whether you should begin with a course,
                explore resources, request subject support or ask for research
                guidance.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-5">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Academic responsibility
              </p>

              <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                Guidance-based support only.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                Support is designed to help you understand methods, plan
                analysis, interpret ideas and work independently. We do not
                complete assessed work, exams, dissertations or submissions on
                behalf of students.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Courses", "Structured learning"],
              ["Resources", "Free guides"],
              ["Support", "Live academic help"],
              ["Research", "Project guidance"],
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
          {decisionSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <p className="font-sans text-3xl font-black tracking-[-0.05em] text-[#8b1116]">
                {String(index + 1).padStart(2, "0")}
              </p>

              <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                {step.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {step.text}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Recommended routes
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Select the option that sounds closest to your current need.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              Each route takes you to the most relevant part of the website, so
              you can begin with a clear next step instead of searching through
              everything at once.
            </p>
          </div>

          <div className="mt-8 grid gap-5">
            {routes.map((route) => (
              <a
                key={route.title}
                href={withBasePath(route.href)}
                className="group rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5 transition hover:-translate-y-1 hover:bg-white md:p-7"
              >
                <div className="grid gap-6 lg:grid-cols-[0.18fr_1fr_0.7fr] lg:items-start">
                  <div>
                    <p className="font-sans text-4xl font-black tracking-[-0.05em] text-[#8b1116]">
                      {route.number}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-sans text-2xl font-black leading-tight tracking-[-0.04em] md:text-3xl">
                      {route.title}
                    </h3>

                    <p className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-[#8b1116]">
                      {route.recommendation}
                    </p>

                    <p className="mt-4 max-w-3xl text-base leading-8 text-neutral-700">
                      {route.description}
                    </p>

                    <p className="mt-5 text-sm font-black text-[#111111] group-hover:text-[#8b1116]">
                      Continue →
                    </p>
                  </div>

                  <div className="grid gap-2">
                    {route.bestFor.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-bold leading-6 text-neutral-700"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Best first course
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              New to statistics? Start with the foundation course.
            </h2>

            <p className="mt-5 text-base leading-8 text-neutral-700">
              The Statistics Foundation course is the best starting point if you
              want to build confidence before studying biostatistics, machine
              learning, research methods, data science or quantitative analysis.
            </p>

            <a
              href={withBasePath("/courses/statistics-foundation")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 sm:w-auto"
            >
              Start Statistics Foundation →
            </a>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-[#111111] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
              Need personal guidance?
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Send an enquiry with your subject and goal.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/70">
              Mention your subject, academic level, topic, software, deadline
              and what kind of support you need: concept explanation, revision,
              coding guidance, research planning or interpretation.
            </p>

            <a
              href={withBasePath("/contact")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              Request support →
            </a>
          </article>
        </section>
      </section>
    </main>
  );
}