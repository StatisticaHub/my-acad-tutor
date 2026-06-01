const contactItems = [
  {
    label: "Email",
    value: "contact@myacademictutor.com",
    href: "mailto:contact@myacademictutor.com",
  },
  {
    label: "LinkedIn",
    value: "My Academic Tutor",
    href: "https://www.linkedin.com/company/myacademictutor/",
  },
  {
    label: "YouTube",
    value: "StatisticaHub",
    href: "https://www.youtube.com/@StatisticaHub",
  },
];

const requirements = [
  "Subject area",
  "University level or course/module",
  "Topic or method you need help with",
  "Software required, if any",
  "Deadline or preferred support time",
  "Whether you need tutoring, analysis guidance or research planning",
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-16 text-neutral-950 md:px-8 md:py-20">
      <section className="mx-auto max-w-7xl">
        <a href="/" className="text-sm font-semibold text-[#8b1116]">
          ← Back to homepage
        </a>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
              Contact
            </p>

            <h1 className="font-serif-academic mt-4 text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-7xl">
              Tell us what you need support with.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-600 md:text-lg">
              Share your subject, level, topic, software requirements and
              deadline. We will suggest the most suitable support route.
            </p>

            <div className="mt-8 grid gap-3">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="rounded-md border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-neutral-500">
                    {item.label}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#8b1116]">
                    {item.value}
                  </p>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
              What to include
            </p>

            <h2 className="font-serif-academic mt-3 text-4xl font-semibold tracking-tight">
              Send a clear support request.
            </h2>

            <ul className="mt-6 space-y-3">
              {requirements.map((item) => (
                <li
                  key={item}
                  className="border-b border-neutral-200 pb-3 text-sm leading-7 text-neutral-700"
                >
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="mailto:contact@myacademictutor.com?subject=Academic%20support%20request"
              className="mt-8 inline-flex rounded-md bg-[#8b1116] px-6 py-3 text-sm font-semibold text-white"
            >
              Email support request
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
