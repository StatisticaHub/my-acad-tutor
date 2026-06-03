const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}/`;
}

const contactItems = [
  {
    label: "Email",
    value: "contact@myacademictutor.com",
    href: "mailto:contact@myacademictutor.com",
    note: "Best for support requests, course enquiries and research guidance.",
  },
  {
    label: "LinkedIn",
    value: "My Academic Tutor",
    href: "https://www.linkedin.com/company/myacademictutor/",
    note: "Follow platform updates, learning resources and course announcements.",
  },
  {
    label: "YouTube",
    value: "StatisticaHub",
    href: "https://www.youtube.com/@StatisticaHub",
    note: "Watch statistics, biostatistics and quantitative learning content.",
  },
];

const requestSteps = [
  {
    number: "01",
    title: "Choose the support route",
    text: "Tell us whether your enquiry is about a course, academic tutoring, software help, dissertation planning or research guidance.",
  },
  {
    number: "02",
    title: "Explain the topic clearly",
    text: "Share the subject area, academic level, method, concept, software and any deadline or preferred support time.",
  },
  {
    number: "03",
    title: "Receive direction",
    text: "We will suggest the most suitable support route, such as a course pathway, guided session, resource page or learning plan.",
  },
];

const requirements = [
  "Subject area",
  "University level or course/module",
  "Topic, method or concept",
  "Software required, if any",
  "Deadline or preferred support time",
  "Type of support needed",
];

const enquiryTypes = [
  {
    title: "Course enquiry",
    text: "Ask about Statistics Foundation, Machine Learning in Biostatistics, future course access or July 2026 course release plans.",
    examples: ["Course access", "Lesson structure", "Learning pathway"],
  },
  {
    title: "Academic support",
    text: "Request guidance with statistics, biostatistics, programming, data science, probability, regression or software learning.",
    examples: ["Statistics help", "R/Python support", "Concept explanation"],
  },
  {
    title: "Research project guidance",
    text: "Ask about research questions, variables, analysis planning, interpretation, reporting, tables, figures or dissertation structure.",
    examples: ["Analysis plan", "Variables", "Interpretation"],
  },
];

const supportAreas = [
  "Statistics and probability",
  "Biostatistics and medical statistics",
  "Regression and modelling",
  "R, Python, SPSS, Stata or SAS",
  "Dissertation and research planning",
  "Data analysis interpretation",
  "Machine learning in health data",
  "Bioinformatics and omics foundations",
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-20">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/")}
          className="text-sm font-bold text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to homepage
        </a>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Contact
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl font-sans text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl md:text-7xl">
                Tell us what you need support with.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                Share your subject, academic level, topic, software requirements
                and deadline. We will suggest the most suitable support route
                for your learning, course progress, dissertation or research
                work.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Response preparation
              </p>

              <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                Send a focused support request.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                Include enough detail to understand your academic need, but do
                not send passwords, confidential data, exam material or
                restricted assessed work.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="mailto:contact@myacademictutor.com?subject=Academic%20support%20request"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#2a2a2a] sm:w-auto"
            >
              Email support request →
            </a>

            <a
              href="#request-template"
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-200 bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 hover:shadow-sm sm:w-auto"
            >
              View email template
            </a>

            <a
              href={withBasePath("/learning-hub")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-200 bg-[#f7f4ee] px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 hover:shadow-sm sm:w-auto"
            >
              Explore Learning Hub
            </a>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {requestSteps.map((step) => (
            <article
              key={step.number}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <p className="font-sans text-3xl font-black tracking-[-0.05em] text-[#8b1116]">
                {step.number}
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

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-sm font-black uppercase tracking-[0.22em] text-neutral-700">
                  {item.label}
                </p>

                <p className="mt-3 font-sans text-2xl font-black tracking-[-0.035em] text-[#8b1116]">
                  {item.value}
                </p>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  {item.note}
                </p>

                <p className="mt-5 text-sm font-black text-[#111111]">
                  Open →
                </p>
              </a>
            ))}
          </div>

          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              What to include
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Send a clear support request.
            </h2>

            <p className="mt-4 text-base leading-8 text-neutral-700">
              The clearer your message is, the easier it is to suggest the right
              course, lesson, resource or support route.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {requirements.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold leading-6 text-neutral-800"
                >
                  {item}
                </div>
              ))}
            </div>

            <a
              href="mailto:contact@myacademictutor.com?subject=Academic%20support%20request"
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#2a2a2a]"
            >
              Email support request →
            </a>
          </article>
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Enquiry types
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Choose the closest type of support.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              Use these categories to frame your message. You can combine them
              if your request covers more than one area.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {enquiryTypes.map((item, index) => (
              <article
                key={item.title}
                className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6"
              >
                <p className="font-sans text-3xl font-black tracking-[-0.05em] text-[#8b1116]">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  {item.text}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.examples.map((example) => (
                    <span
                      key={example}
                      className="rounded-full bg-white px-3 py-1 text-xs font-black text-neutral-700"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Support areas
          </p>

          <h2 className="mt-4 max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
            Common topics students and researchers ask about.
          </h2>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {supportAreas.map((area) => (
              <div
                key={area}
                className="rounded-3xl border border-neutral-200 bg-[#f7f4ee] p-5 text-sm font-bold leading-7 text-neutral-800"
              >
                {area}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-[#111111] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">
              Academic integrity
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Please ask for guidance, not replacement work.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              We support understanding, planning, interpretation and independent
              learning. We do not complete assessed work, exams, submissions,
              impersonation tasks or dishonest academic activity.
            </p>

            <a
              href={withBasePath("/academic-integrity")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
            >
              Read academic integrity policy →
            </a>
          </article>

          <article
            id="request-template"
            className="scroll-mt-24 rounded-[2rem] border border-neutral-200 bg-[#8b1116] p-6 text-white shadow-sm md:p-8"
          >
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/90">
              Quick email template
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Copy this structure.
            </h2>

            <div className="mt-5 rounded-3xl bg-white/10 p-5 text-sm leading-7 text-white/90">
              <p>Subject: Academic support request</p>
              <p className="mt-3">My subject is...</p>
              <p>My academic level is...</p>
              <p>The topic/method I need help with is...</p>
              <p>The software involved is...</p>
              <p>My deadline/preferred support time is...</p>
              <p>The type of support I need is...</p>
            </div>

            <a
              href="mailto:contact@myacademictutor.com?subject=Academic%20support%20request"
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
            >
              Start email →
            </a>
          </article>
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Next step
          </p>

          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <h2 className="max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-5xl">
                Not sure what to ask for?
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-700">
                Start with the Learning Hub if you want structured lessons, or
                send an email if you need help choosing a support route.
              </p>
            </div>

            <div className="grid gap-3">
              <a
                href={withBasePath("/learning-hub")}
                className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#2a2a2a]"
              >
                Explore Learning Hub →
              </a>

              <a
                href={withBasePath("/courses")}
                className="inline-flex w-full items-center justify-center rounded-full border border-neutral-200 bg-[#f7f4ee] px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                View courses →
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}