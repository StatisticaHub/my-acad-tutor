const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}/`;
}

const supportAreas = [
  "Statistics and biostatistics topics",
  "Dissertation or research planning",
  "R, Python, SPSS, Stata or SAS guidance",
  "Interpreting methods and results",
  "Premium course access enquiries",
  "Small research or student group support",
];

const contactRoutes = [
  {
    title: "Request academic support",
    description:
      "Share your topic, level, software needs, deadline and the kind of explanation or guidance you need.",
    href: "/contact",
    label: "Submit requirement",
    dark: false,
  },
  {
    title: "Join course waitlist",
    description:
      "Register interest in premium course access, full lesson pathways, downloadable materials and certificates.",
    href: "/pricing",
    label: "View pricing preview",
    dark: false,
  },
  {
    title: "Preview the platform",
    description:
      "See the future dashboard experience with progress cards, saved lessons, coding labs and certificate placeholders.",
    href: "/dashboard",
    label: "Open dashboard preview",
    dark: true,
  },
];

export default function ContactCTA() {
  return (
    <section className="bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] border border-neutral-200 bg-[#111111] p-6 text-white shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
            Request support
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
            <div>
              <h2 className="max-w-5xl font-sans text-3xl font-black leading-tight tracking-[-0.04em] md:text-5xl">
                Need help choosing the right learning, support or course route?
              </h2>

              <p className="mt-5 max-w-4xl text-base leading-8 text-white/70 md:text-lg md:leading-8">
                Send your subject, level, topic, software needs and deadline.
                We will guide you towards the most suitable learning route while
                keeping academic integrity clear.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {contactRoutes.map((route) => (
                  <a
                    key={route.href}
                    href={withBasePath(route.href)}
                    className={`rounded-[1.75rem] border p-5 transition hover:-translate-y-1 ${
                      route.dark
                        ? "border-white bg-white text-[#111111] hover:bg-neutral-100"
                        : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                    }`}
                  >
                    <h3 className="font-sans text-xl font-black leading-tight tracking-[-0.03em]">
                      {route.title}
                    </h3>

                    <p
                      className={`mt-3 text-sm leading-7 ${
                        route.dark ? "text-neutral-700" : "text-white/65"
                      }`}
                    >
                      {route.description}
                    </p>

                    <p
                      className={`mt-5 text-sm font-black ${
                        route.dark ? "text-[#8b1116]" : "text-white"
                      }`}
                    >
                      {route.label} →
                    </p>
                  </a>
                ))}
              </div>
            </div>

            <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-5 md:p-6">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/50">
                Best for
              </p>

              <div className="mt-5 grid gap-3">
                {supportAreas.map((area) => (
                  <div
                    key={area}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold leading-6 text-white/75"
                  >
                    {area}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-white/40">
                  Academic integrity
                </p>

                <p className="mt-3 text-sm leading-7 text-white/65">
                  Support is focused on explanation, planning, interpretation
                  and learning guidance. It does not replace your own academic
                  work.
                </p>
              </div>
            </aside>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={withBasePath("/contact")}
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 hover:bg-neutral-100 sm:w-auto"
            >
              Submit requirement
            </a>

            <a
              href="mailto:contact@myacademictutor.com"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto"
            >
              Email directly
            </a>

            <a
              href={withBasePath("/interactive-demos")}
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto"
            >
              Try interactive demos
            </a>

            <a
              href={withBasePath("/academic-integrity")}
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto"
            >
              Read integrity policy
            </a>
          </div>
        </section>
      </div>
    </section>
  );
}