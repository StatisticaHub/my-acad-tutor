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

const currentAccess = [
  "Public Learning Hub",
  "Course homepages and module outlines",
  "Lesson pathway previews",
  "Selected resource guides",
  "Interactive demo previews",
];

const futureAccess = [
  "Full Statistics Foundation lessons",
  "Full Machine Learning in Biostatistics lessons",
  "Detailed notes, examples and quizzes",
  "Structured learning pathways",
  "Premium study resources",
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-neutral-950 md:px-8 md:py-16">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Pricing
          </p>

          <h1 className="mt-5 max-w-4xl font-sans text-4xl font-black tracking-[-0.05em] md:text-6xl">
            Course access and support pricing will open closer to release.
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-700 md:text-lg">
            My Academic Tutor is currently in soft-launch mode. Public previews are
            available now, while full course access and paid support options are being
            prepared for the July 2026 release.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={withBasePath("/learning-hub")}
              className="inline-flex items-center justify-center rounded-full bg-[#8b1116] px-6 py-4 text-sm font-black text-white transition hover:bg-[#6f0d12]"
            >
              Explore free previews →
            </a>

            <a
              href={withBasePath("/contact")}
              className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-neutral-950 transition hover:bg-neutral-50"
            >
              Ask about support →
            </a>
          </div>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Available now
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em]">
              Free public preview
            </h2>

            <p className="mt-3 text-4xl font-black tracking-[-0.05em]">
              £0
            </p>

            <p className="mt-4 text-sm leading-7 text-neutral-700">
              Use the public website to explore the course structure, learning routes,
              selected resources and preview materials.
            </p>

            <div className="mt-6 grid gap-3">
              {currentAccess.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold text-neutral-800"
                >
                  {item}
                </div>
              ))}
            </div>

            <a
              href={withBasePath("/courses")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white transition hover:bg-neutral-800"
            >
              View courses →
            </a>
          </article>

          <article className="rounded-[2rem] border border-[#ead8d8] bg-[#fff7f7] p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Coming July 2026
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em]">
              Premium course access
            </h2>

            <p className="mt-3 text-4xl font-black tracking-[-0.05em]">
              Coming soon
            </p>

            <p className="mt-4 text-sm leading-7 text-neutral-700">
              Full lesson content, detailed notes, worked examples, quizzes and
              structured study materials will open with premium access.
            </p>

            <div className="mt-6 grid gap-3">
              {futureAccess.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#ead8d8] bg-white px-4 py-3 text-sm font-bold text-neutral-800"
                >
                  {item}
                </div>
              ))}
            </div>

            <a
              href={withBasePath("/contact")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#8b1116] px-6 py-4 text-sm font-black text-white transition hover:bg-[#6f0d12]"
            >
              Request release updates →
            </a>
          </article>
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Support enquiries
          </p>

          <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em]">
            Need individual academic support?
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
            If you need help choosing a learning route, planning a dissertation,
            understanding a method or preparing for future course access, send a clear
            support request. We will suggest the most suitable route.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={withBasePath("/contact")}
              className="inline-flex items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white transition hover:bg-neutral-800"
            >
              Send support request →
            </a>

            <a
              href={withBasePath("/academic-integrity")}
              className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-neutral-950 transition hover:bg-neutral-50"
            >
              Read academic integrity policy →
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}
