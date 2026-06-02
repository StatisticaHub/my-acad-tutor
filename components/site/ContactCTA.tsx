const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;
  return `${basePath}${href}/`;
}

export default function ContactCTA() {
  return (
    <section className="bg-[#f7f4ee] px-5 py-10 text-neutral-950 md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-neutral-950 p-6 text-white shadow-sm md:p-10">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-white/50">
          Request support
        </p>

        <div className="mt-4 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <h2 className="max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
              Need help choosing the right learning or support route?
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
              Send your subject, level, topic, software needs and deadline. We
              will guide you towards the most suitable support option while
              keeping academic integrity clear.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-bold text-white">
              Best for:
            </p>

            <ul className="mt-3 space-y-2 text-sm leading-6 text-white/65">
              <li>• Statistics and biostatistics topics</li>
              <li>• Dissertation or research planning</li>
              <li>• R, Python, SPSS, Stata or SAS guidance</li>
              <li>• Interpreting methods and results</li>
            </ul>
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
