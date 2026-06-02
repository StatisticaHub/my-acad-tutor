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

const requirements = [
  "Subject area",
  "University level or course/module",
  "Topic, method or concept you need help with",
  "Software required, if any",
  "Deadline or preferred support time",
  "Whether you need tutoring, analysis guidance or research planning",
];

const enquiryTypes = [
  {
    title: "Course enquiry",
    text: "Ask about Statistics Foundation, Machine Learning in Biostatistics or future course pathways.",
  },
  {
    title: "Academic support",
    text: "Request guidance with statistics, biostatistics, programming, data science or research methods.",
  },
  {
    title: "Research project guidance",
    text: "Ask about study design, variables, analysis planning, results interpretation or reporting structure.",
  },
];

export default function ContactPage() {
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
            Contact
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl font-sans text-4xl font-black leading-[1.02] tracking-[-0.05em] md:text-6xl">
                Tell us what you need support with.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                Share your subject, academic level, topic, software
                requirements and deadline. We will suggest the most suitable
                support route.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                The clearer your message is, the easier it is to understand
                whether you need tutoring, course guidance, software support,
                analysis planning or research interpretation.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-5">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Response preparation
              </p>

              <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                Send a focused support request.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                Include enough detail to understand your academic need, but do
                not send confidential data, login details, exam material or
                assessed work that must be completed independently.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Email", "Main contact route"],
              ["LinkedIn", "Platform updates"],
              ["YouTube", "Learning content"],
              ["Responsible", "Guidance-based support"],
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
                <p className="text-sm font-black uppercase tracking-[0.22em] text-neutral-500">
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

            <p className="mt-5 text-base leading-8 text-neutral-700">
              A short but specific message helps us understand your learning
              goal and suggest the right support route.
            </p>

            <div className="mt-6 grid gap-3">
              {requirements.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold leading-6 text-neutral-700"
                >
                  {item}
                </div>
              ))}
            </div>

            <a
              href="mailto:contact@myacademictutor.com?subject=Academic%20support%20request"
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#8b1116] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 sm:w-auto"
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
              Choose the message style that matches your need.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              You can contact us about course access, live academic support,
              research guidance or general platform enquiries.
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
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-[#111111] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
              Academic integrity
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Please ask for guidance, not replacement work.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/70">
              My Academic Tutor supports understanding, planning,
              interpretation and independent learning. We do not complete
              assessed work, exams, dissertations, submissions or tasks that
              must be done by the student.
            </p>

            <a
              href={withBasePath("/academic-integrity")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15 sm:w-auto"
            >
              Read academic integrity policy →
            </a>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-[#8b1116] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/60">
              Quick email template
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Copy this structure.
            </h2>

            <div className="mt-5 rounded-3xl bg-white/10 p-5 text-sm leading-7 text-white/80">
              <p>Subject: Academic support request</p>
              <p className="mt-3">My subject is...</p>
              <p>My academic level is...</p>
              <p>The topic/method I need help with is...</p>
              <p>The software involved is...</p>
              <p>My deadline/preferred support time is...</p>
              <p>I need help with explanation / coding logic / analysis planning / interpretation...</p>
            </div>

            <a
              href="mailto:contact@myacademictutor.com?subject=Academic%20support%20request"
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              Start email →
            </a>
          </article>
        </section>
      </section>
    </main>
  );
}