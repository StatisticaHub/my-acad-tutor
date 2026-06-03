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

const supportPoints = [
  "Statistics",
  "Biostatistics",
  "Research methods",
  "Dissertation planning",
];

export default function ContactCTA() {
  return (
    <section className="bg-[#f7f4ee] px-4 py-5 text-[#111111] sm:px-5 md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-[#111111] p-5 text-white shadow-sm md:rounded-[2.5rem] md:p-10">
          <div className="grid gap-5 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55 md:text-sm md:tracking-[0.22em]">
                Tutoring support
              </p>

              <h2 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.045em] md:mt-4 md:text-5xl">
                Need focused academic guidance?
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 md:mt-5 md:text-base md:leading-8">
                Send your topic, level, software and the type of explanation
                you need. Support is focused on learning, planning and
                responsible interpretation.
              </p>
            </div>

            <aside className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-4 md:rounded-[1.75rem] md:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55 md:text-sm md:tracking-[0.2em]">
                Academic integrity
              </p>

              <p className="mt-3 text-sm leading-7 text-white/70 md:mt-4">
                Guidance supports learning. It does not replace independent
                academic work.
              </p>
            </aside>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2.5 md:mt-8 md:gap-3 lg:grid-cols-4">
            {supportPoints.map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-2.5 text-xs font-semibold leading-5 text-white/85 md:px-4 md:py-3 md:text-sm"
              >
                {point}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-8">
            <a
              href={withBasePath("/contact")}
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#111111] transition hover:bg-[#f7f4ee] sm:w-auto md:py-4"
            >
              Request support →
            </a>

            <a
              href="mailto:contact@myacademictutor.com"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto md:py-4"
            >
              Email directly
            </a>
          </div>
        </section>
      </div>
    </section>
  );
}
