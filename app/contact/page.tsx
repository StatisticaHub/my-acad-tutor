import ContactForm from "./ContactForm";

const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return "/";
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${basePath}${cleanHref}${hasFileExtension ? "" : "/"}`;
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-neutral-950 md:px-8 md:py-16">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Contact
          </p>

          <h1 className="mt-5 max-w-4xl font-sans text-4xl font-black tracking-[-0.05em] md:text-6xl">
            Send a clear support request.
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-700 md:text-lg">
            Use this page for statistics, biostatistics, data science, programming,
            research methods, dissertation planning or course access enquiries.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              "Subject area",
              "Academic level",
              "Topic or method",
              "Software, if any",
              "Deadline or preferred time",
              "Type of support needed",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.25rem] border border-neutral-200 bg-[#f7f4ee] p-4"
              >
                <p className="text-sm font-black text-neutral-950">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <section className="mt-8">
          <ContactForm />
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Email
            </p>

            <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
              contact@myacademictutor.com
            </h2>

            <p className="mt-4 text-sm leading-7 text-neutral-700">
              Best for support requests, course enquiries, research guidance and
              questions about the July 2026 course release.
            </p>

            <a
              href="mailto:contact@myacademictutor.com?subject=Academic%20support%20request"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#8b1116] px-5 py-3 text-sm font-black text-white transition hover:bg-[#6f0d12]"
            >
              Email directly →
            </a>
          </div>

          <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Academic responsibility
            </p>

            <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
              Guidance, not replacement work.
            </h2>

            <p className="mt-4 text-sm leading-7 text-neutral-700">
              We support understanding, planning, interpretation and independent
              learning. We do not complete assessed work, exams, submissions,
              impersonation tasks or dishonest academic activity.
            </p>

            <a
              href={withBasePath("/academic-integrity")}
              className="mt-6 inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-black text-neutral-950 transition hover:bg-neutral-50"
            >
              Read academic integrity policy →
            </a>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-white/60">
            Not sure where to start?
          </p>

          <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em]">
            Explore the Learning Hub first.
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/75">
            If you are not ready to send a request, start with the Learning Hub to
            view the available course pathways, resources and interactive demos.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={withBasePath("/learning-hub")}
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-black text-neutral-950 transition hover:bg-[#f7f4ee]"
            >
              Explore Learning Hub →
            </a>

            <a
              href={withBasePath("/courses")}
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10"
            >
              View courses →
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}
