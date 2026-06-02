const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

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
    <section className="bg-[#f7f4ee] px-5 py-10 text-neutral-950 md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-neutral-950 p-6 text-white shadow-sm md:p-10">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-[#9fd0ff]">
          Request support
        </p>

        <div className="mt-4 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <h2 className="font-serif-academic max-w-4xl text-3xl font-medium leading-tight tracking-[-0.035em] md:text-5xl">
              Need help choosing the right learning, support or course route?
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-8 text-white/70">
              Send your subject, level, topic, software needs and deadline. We
              will guide you towards the most suitable learning route while
              keeping academic integrity clear.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {contactRoutes.map((route) => (
                <a
                  key={route.href}
                  href={withBasePath(route.href)}
                  className={`rounded-[1.35rem] border p-5 transition hover:-translate-y-1 ${
                    route.dark
                      ? "border-white/10 bg-white text-neutral-950 hover:bg-neutral-100"
                      : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  <h3 className="text-lg font-black tracking-[-0.02em]">
                    {route.title}
                  </h3>

                  <p
                    className={`mt-3 text-sm leading-7 ${
                      route.dark ? "text-neutral-600" : "text-white/65"
                    }`}
                  >
                    {route.description}
                  </p>

                  <p
                    className={`mt-4 text-sm font-black ${
                      route.dark ? "text-[#8b1116]" : "text-white"
                    }`}
                  >
                    {route.label} →
                  </p>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
            <p className="text-sm font-bold text-white">Best for:</p>

            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/70">
              {supportAreas.map((area) => (
                <li key={area} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#9fd0ff]" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl border border-white/10 bg-neutral-900 p-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">
                Academic integrity
              </p>

              <p className="mt-3 text-sm leading-7 text-white/65">
                Support is focused on explanation, planning, interpretation and
                learning guidance. It does not replace your own academic work.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={withBasePath("/contact")}
            className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-neutral-950 transition hover:bg-neutral-100 sm:w-auto"
          >
            Submit requirement
          </a>

          <a
            href="mailto:contact@myacademictutor.com"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 sm:w-auto"
          >
            Email directly
          </a>

          <a
            href={withBasePath("/interactive-demos")}
            className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 sm:w-auto"
          >
            Try interactive demos
          </a>

          <a
            href={withBasePath("/academic-integrity")}
            className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 sm:w-auto"
          >
            Read academic integrity policy
          </a>
        </div>
      </div>
    </section>
  );
}