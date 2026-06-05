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

const termsSections = [
  {
    title: "Educational guidance",
    text: "My Academic Tutor provides learning support, course materials, tutoring guidance, interpretation help and research planning support for educational purposes.",
  },
  {
    title: "Student responsibility",
    text: "Students remain responsible for their own academic work, submissions, analysis, writing, decisions and compliance with university or institutional rules.",
  },
  {
    title: "No dishonest use",
    text: "Support must not be used for ghostwriting, impersonation, exam misconduct, dishonest coursework completion or misrepresentation of authorship.",
  },
  {
    title: "Course access",
    text: "Resources and course features may be updated over time. Access terms and certificate rules may be revised before launch.",
  },
];

const acceptableUse = [
  "Learning statistical concepts",
  "Understanding software or code errors",
  "Planning an analysis responsibly",
  "Interpreting results and assumptions",
  "Using course lessons for self-study",
  "Requesting guidance within academic integrity rules",
];

const notAllowed = [
  "Asking us to complete assessed work",
  "Using support to impersonate a student",
  "Submitting tutor-produced work as your own",
  "Sharing restricted exam or assessment material",
  "Manipulating analysis to force a preferred conclusion",
  "Using platform content dishonestly or unlawfully",
];

const responsibilities = [
  "Check your institution rules before using external support.",
  "Use explanations to produce your own independent work.",
  "Do not share passwords, login details or restricted academic material.",
  "Give accurate information when requesting support.",
  "Respect copyright and do not redistribute course content.",
  "Ask for clarification if you are unsure whether a request is appropriate.",
];

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EA] px-5 py-10 text-[#141210] md:px-8 md:py-20">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/")}
          className="text-sm font-semibold text-[#741018] hover:text-[#4d080e]"
        >
          ← Back to homepage
        </a>

        <section className="mt-8 rounded-[2.5rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#741018]">
            Terms & Conditions
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-semibold leading-[1.03] tracking-[-0.055em] md:text-7xl">
                Terms for using My Academic Tutor.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">
                By using My Academic Tutor, students agree that support is for
                educational guidance, learning, interpretation and responsible
                academic development.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#741018]">
                Important note
              </p>

              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">
                Use support honestly.
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#525252]">
                My Academic Tutor supports learning. It does not replace a
                student’s own academic work or institutional responsibilities.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {termsSections.map((section, index) => (
            <article
              key={section.title}
              className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm"
            >
              <p className="text-3xl font-semibold tracking-[-0.05em] text-[#741018]">
                {String(index + 1).padStart(2, "0")}
              </p>

              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">
                {section.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#525252]">
                {section.text}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#741018]">
              Acceptable use
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
              Use the platform for learning and guidance.
            </h2>

            <div className="mt-6 grid gap-3">
              {acceptableUse.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] px-4 py-3 text-sm font-semibold text-neutral-800"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
              Not allowed
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
              Do not use support dishonestly.
            </h2>

            <div className="mt-6 grid gap-3">
              {notAllowed.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-[#FFFCF6]/5 px-4 py-3 text-sm font-semibold text-white/85"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#741018]">
            User responsibilities
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
            Students are responsible for how support is used.
          </h2>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {responsibilities.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] px-4 py-3 text-sm font-semibold text-neutral-800"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#741018] p-6 text-white shadow-sm md:p-8">
          <h2 className="text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
            Questions about these terms?
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-8 text-white/80">
            Contact us before sharing materials or requesting support if you are
            unsure whether your request is appropriate.
          </p>

          <a
            href={withBasePath("/contact")}
            className="mt-7 inline-flex rounded-full bg-[#FFFCF6] px-6 py-4 text-sm font-semibold text-[#141210]"
          >
            Contact us →
          </a>
        </section>
      </section>
    </main>
  );
}
