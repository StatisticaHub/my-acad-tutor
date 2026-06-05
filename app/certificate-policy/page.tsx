const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return "/";
  if (href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${basePath}${cleanHref}${hasFileExtension ? "" : "/"}`;
}

const certificateCanShow = [
  "Course title",
  "Learner name",
  "Completion date",
  "Platform learning activity",
  "Completion status",
];

const certificateDoesNotMean = [
  "University degree",
  "Academic credit",
  "Regulated qualification",
  "Professional licence",
  "University accreditation",
];

export default function CertificatePolicyPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EA] px-5 py-10 text-[#141210] md:px-8 md:py-20">
      <section className="mx-auto max-w-7xl">
        <a href={withBasePath("/")} className="text-sm font-semibold text-[#741018] hover:text-[#4d080e]">
          ← Back to homepage
        </a>

        <section className="mt-8 rounded-[2.5rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#741018]">
            Certificate policy
          </p>

          <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-[1.03] tracking-[-0.055em] md:text-7xl">
            Course completion certificates.
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">
            My Academic Tutor may provide completion certificates for selected structured courses. These confirm platform-based learning activity only.
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#741018]">
              A certificate may show
            </p>

            <div className="mt-6 grid gap-3">
              {certificateCanShow.map((item) => (
                <div key={item} className="rounded-2xl border border-[#E4DED2] bg-[#F7F3EA] px-4 py-3 text-sm font-semibold text-neutral-800">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-[#E4DED2] bg-[#11100E] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
              A certificate does not mean
            </p>

            <div className="mt-6 grid gap-3">
              {certificateDoesNotMean.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-[#FFFCF6]/5 px-4 py-3 text-sm font-semibold text-white/85">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
          <h2 className="text-3xl font-semibold tracking-[-0.045em]">
            Use certificates accurately.
          </h2>

          <p className="mt-4 max-w-4xl text-base leading-8 text-[#525252]">
            A certificate should be described as evidence of completing a private online learning activity. It should not be presented as a degree, credit-bearing award or regulated qualification.
          </p>
        </section>
      </section>
    </main>
  );
}
