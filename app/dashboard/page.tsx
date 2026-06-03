const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${basePath}${cleanHref}${hasFileExtension ? "" : "/"}`;
}

const progressCards = [
  {
    title: "Statistics Foundation",
    module: "5 modules · 26 lessons",
    progress: "42%",
    action: "Continue descriptive statistics",
    href: "/courses/statistics-foundation",
  },
  {
    title: "ML in Biostatistics",
    module: "Module 1 available",
    progress: "20%",
    action: "Review prediction foundations",
    href: "/courses/machine-learning-biostatistics/modules/foundations",
  },
  {
    title: "Resources",
    module: "Growing guide library",
    progress: "Preparing",
    action: "Study public guides",
    href: "/resources",
  },
];

const features = [
  "Course progress",
  "Saved lessons",
  "Interactive labs",
  "Certificates",
  "Recommended next lessons",
  "Coding lab preview",
];

export default function DashboardPreviewPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/")}
          className="text-sm font-bold text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to homepage
        </a>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Student dashboard preview
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl md:text-6xl">
                A preview of the future student learning dashboard.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                This is a static dashboard preview. Login, progress tracking,
                enrolment, certificates and paid access can be connected later
                with Supabase and Stripe.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                MVP purpose
              </p>

              <h2 className="mt-4 text-2xl font-black tracking-[-0.04em]">
                Show students what the platform will become.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                The preview helps users understand the future learning
                experience before full accounts and subscriptions are enabled.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={withBasePath("/learning-hub")}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#2a2a2a] sm:w-auto"
            >
              Open Learning Hub
            </a>

            <a
              href={withBasePath("/pricing")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              View pricing
            </a>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          {progressCards.map((card) => (
            <a
              key={card.title}
              href={withBasePath(card.href)}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#8b1116]">
                {card.module}
              </p>

              <h2 className="mt-4 text-2xl font-black tracking-[-0.04em]">
                {card.title}
              </h2>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#f7f4ee]">
                <div
                  className="h-full rounded-full bg-[#8b1116]"
                  style={{
                    width: card.progress.includes("%") ? card.progress : "55%",
                  }}
                />
              </div>

              <p className="mt-4 text-sm font-bold text-neutral-700">
                Progress: {card.progress}
              </p>

              <p className="mt-5 text-sm font-black text-[#8b1116]">
                {card.action} →
              </p>
            </a>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Dashboard features
          </p>

          <h2 className="mt-4 max-w-4xl text-3xl font-black tracking-[-0.04em] md:text-5xl">
            Designed for progress, saved learning and course continuity.
          </h2>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature}
                className="rounded-3xl border border-neutral-200 bg-[#f7f4ee] p-5"
              >
                <p className="text-sm font-bold leading-7 text-neutral-800">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] bg-[#111111] p-6 text-white shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">
            Coming later
          </p>

          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <h2 className="max-w-4xl text-3xl font-black tracking-[-0.04em] md:text-4xl">
                Login, subscriptions and certificates can be added after the
                public launch.
              </h2>

              <p className="mt-5 max-w-4xl text-base leading-8 text-white/90">
                For now, this page acts as a premium dashboard preview. It gives
                students a clear picture of the future account-based learning
                experience without blocking the static launch.
              </p>
            </div>

            <a
              href={withBasePath("/contact")}
              className="rounded-full bg-white px-6 py-4 text-center text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
            >
              Request support →
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}
