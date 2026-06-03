const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return "/";
  if (href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${basePath}${cleanHref}${hasFileExtension ? "" : "/"}`;
}

const allowed = [
  "Concept explanation",
  "Method guidance",
  "Software walkthroughs",
  "Research planning",
  "Interpretation support",
  "Revision support",
];

const notAllowed = [
  "Ghostwriting",
  "Submitting work for students",
  "Exam impersonation",
  "Dishonest completion",
  "Changing results to fit a conclusion",
  "Bypassing institution rules",
];

export default function AcademicIntegrityPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-20">
      <section className="mx-auto max-w-7xl">
        <a href={withBasePath("/")} className="text-sm font-semibold text-[#8b1116] hover:text-[#5f0b0f]">
          ← Back to homepage
        </a>

        <section className="mt-8 rounded-[2.5rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b1116]">
            Academic integrity
          </p>

          <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-[1.03] tracking-[-0.055em] md:text-7xl">
            Guidance that supports learning, not misconduct.
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
            My Academic Tutor helps students understand concepts, methods, software and interpretation. Students remain responsible for their own academic work and must follow their institution rules.
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b1116]">
              We can help with
            </p>

            <div className="mt-6 grid gap-3">
              {allowed.map((item) => (
                <div key={item} className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-semibold text-neutral-800">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-[#111111] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
              We do not provide
            </p>

            <div className="mt-6 grid gap-3">
              {notAllowed.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-[#8b1116] p-6 text-white shadow-sm md:p-8">
          <h2 className="text-3xl font-semibold tracking-[-0.045em]">
            Unsure whether a request is appropriate?
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-8 text-white/80">
            Send a short message describing the topic, goal and academic rules before sharing materials.
          </p>

          <a href={withBasePath("/contact")} className="mt-7 inline-flex rounded-full bg-white px-6 py-4 text-sm font-semibold text-[#111111]">
            Contact us →
          </a>
        </section>
      </section>
    </main>
  );
}
