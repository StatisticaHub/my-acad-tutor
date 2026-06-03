const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return "/";
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${cleanHref}${hasFileExtension ? "" : "/"}`;
}

const termsSections = [
  {
    title: "Educational guidance",
    text: "My Academic Tutor provides learning support, course materials, tutoring guidance, interpretation help and research planning support for educational purposes.",
  },
  {
    title: "Student responsibility",
    text: "Students remain responsible for their own academic work, submissions, decisions, writing, analysis and compliance with university or institutional rules.",
  },
  {
    title: "No dishonest use",
    text: "Support must not be used for ghostwriting, impersonation, exam misconduct, dishonest coursework completion or misrepresentation of authorship.",
  },
  {
    title: "Course access",
    text: "Some resources may be free and some course features may become paid later. Access terms, pricing and certificate rules may be updated before launch.",
  },
];

const acceptableUse = [
  "Learning statistical concepts",
  "Understanding software or code errors",
  "Planning a research analysis responsibly",
  "Interpreting results and assumptions",
  "Using course lessons for self-study",
  "Requesting guidance within academic integrity rules",
];

const notAllowed = [
  "Asking us to complete assessed work for you",
  "Using support to impersonate a student",
  "Submitting tutor-produced work as your own",
  "Sharing restricted exam or assessment material",
  "Manipulating analysis to force a preferred conclusion",
  "Using platform content dishonestly or unlawfully",
];

const userResponsibilities = [
  "Check your university or institution rules before using external support.",
  "Use explanations and guidance to produce your own independent work.",
  "Do not share passwords, login details or restricted academic materials.",
  "Give accurate information when requesting support.",
  "Respect copyright and do not redistribute course content without permission.",
  "Ask for clarification if you are unsure whether a request is appropriate.",
];

export default function TermsAndConditionsPage() {
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
            Terms & Conditions
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl font-sans text-4xl font-black leading-[1.02] tracking-[-0.05em] md:text-6xl">
                Terms for using My Academic Tutor.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                By using My Academic Tutor, students agree that support is
                provided for educational guidance, learning and interpretation.
                Support must not be used for dishonest academic completion or
                misconduct.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                These terms explain the basic conditions for using the website,
                courses, resources, interactive demos and academic support
                services.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-5">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Important note
              </p>

              <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                Use support honestly and responsibly.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                My Academic Tutor is built for learning support, not replacement
                work. Students must follow their own institution’s academic
                integrity rules.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Educational", "Guidance purpose"],
              ["Responsible", "Student use"],
              ["No misconduct", "Clear boundaries"],
              ["Transparent", "Platform terms"],
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

        <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {termsSections.map((section, index) => (
            <article
              key={section.title}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <p className="font-sans text-3xl font-black tracking-[-0.05em] text-[#8b1116]">
                {String(index + 1).padStart(2, "0")}
              </p>

              <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                {section.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {section.text}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Acceptable use
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              You may use the platform for learning and guidance.
            </h2>

            <p className="mt-5 text-base leading-8 text-neutral-700">
              The website, resources, courses and support services are designed
              to help students understand concepts, methods and interpretation.
            </p>

            <div className="mt-6 grid gap-3">
              {acceptableUse.map((item) => (
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
              Not allowed
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              You must not use support dishonestly.
            </h2>

            <p className="mt-5 text-base leading-8 text-neutral-700">
              Requests involving academic misconduct, impersonation,
              misrepresentation or dishonest completion may be refused.
            </p>

            <div className="mt-6 grid gap-3">
              {notAllowed.map((item) => (
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
            User responsibilities
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <h2 className="font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
                Students are responsible for how support is used.
              </h2>

              <p className="mt-5 text-base leading-8 text-neutral-700">
                You should use My Academic Tutor in a way that supports your own
                learning and complies with your university, school or
                organisation rules.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {userResponsibilities.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold leading-6 text-neutral-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Courses, resources and demos
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Content is provided for educational use.
            </h2>

            <p className="mt-5 text-base leading-8 text-neutral-700">
              Course pages, resource guides, interactive demos and downloadable
              materials are provided to support learning. They should not be
              copied, resold, redistributed or misrepresented without
              permission.
            </p>

            <p className="mt-4 text-base leading-8 text-neutral-700">
              Platform content may be updated, expanded, corrected, redesigned
              or removed as the website develops.
            </p>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Payments and access
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Paid access may be added later.
            </h2>

            <p className="mt-5 text-base leading-8 text-neutral-700">
              Current pricing pages may be previews. If paid courses,
              subscriptions, student accounts or payment links are added later,
              the terms should be updated to explain access, cancellation,
              refunds and payment handling clearly.
            </p>

            <a
              href={withBasePath("/pricing")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              View pricing preview →
            </a>
          </article>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 text-[#111111] shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-neutral-700">
              Disclaimer
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Learning support is not formal academic, legal or professional
              advice.
            </h2>

            <p className="mt-5 text-base leading-8 text-neutral-700">
              My Academic Tutor provides educational support and learning
              resources. Students should follow their course instructions,
              university regulations, supervisor guidance and any applicable
              professional or institutional requirements.
            </p>
          </article>

          <article className="rounded-[2rem] border border-[#ded9cf] bg-white p-6 text-[#111111] shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-neutral-700">
              Questions about terms?
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Contact us before using support in an uncertain situation.
            </h2>

            <p className="mt-5 text-base leading-8 text-neutral-700">
              If you are unsure whether a request is appropriate, send a short
              message with your topic, goal and academic context.
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