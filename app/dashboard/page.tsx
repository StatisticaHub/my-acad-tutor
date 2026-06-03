import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Preview",
  description:
    "Preview the future My Academic Tutor student dashboard for course progress, saved lessons, recommended routes and certificates.",
};

const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return "/";
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${cleanHref}${hasFileExtension ? "" : "/"}`;
}

const progressCards = [
  {
    title: "Statistics Foundation",
    module: "5 modules · 26 lessons",
    progress: "42%",
    action: "Continue foundation pathway",
    href: "/courses/statistics-foundation",
    note: "Best starting route for students building statistical confidence.",
  },
  {
    title: "ML in Biostatistics",
    module: "Module 1 available",
    progress: "20%",
    action: "Review prediction foundations",
    href: "/courses/machine-learning-biostatistics/modules/foundations",
    note: "Focused on prediction, validation, leakage and health-data modelling.",
  },
  {
    title: "Resources",
    module: "Growing guide library",
    progress: "Preview",
    action: "Study public guides",
    href: "/resources",
    note: "Use short guides for methods, interpretation and analysis planning.",
  },
];

const features = [
  {
    title: "Course progress",
    text: "Track modules, lessons and next recommended learning steps.",
  },
  {
    title: "Saved lessons",
    text: "Return to important explanations, notes, demos and examples.",
  },
  {
    title: "Interactive labs",
    text: "Open visual demos and future browser-based practical activities.",
  },
  {
    title: "Certificates",
    text: "Show completion status after certificate rules are finalised.",
  },
  {
    title: "Recommended routes",
    text: "Suggest what to study next based on the learner's current level.",
  },
  {
    title: "Coding lab preview",
    text: "Prepare for future R, Python and WebR/Pyodide learning tools.",
  },
];

const dashboardStats = [
  ["2", "Flagship courses"],
  ["51", "Course lessons"],
  ["3", "Interactive demos"],
  ["Future", "Account system"],
];

const nextActions = [
  {
    title: "Continue learning",
    text: "Use the Learning Hub to move between courses, resources and demos.",
    href: "/learning-hub",
    cta: "Open Learning Hub",
  },
  {
    title: "Choose a route",
    text: "Use the Start Here page if you are unsure where to begin.",
    href: "/start-here",
    cta: "Start Here",
  },
  {
    title: "Ask for guidance",
    text: "Send a support request if you need help choosing a course or method.",
    href: "/contact",
    cta: "Contact Support",
  },
];

const futureFeatures = [
  "Student accounts",
  "Course enrolment",
  "Lesson progress tracking",
  "Saved lessons",
  "Premium access control",
  "Certificate rules",
  "Student profile",
  "Payment integration",
];

export default function DashboardPreviewPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-20">
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
              <h1 className="max-w-5xl font-sans text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl md:text-7xl">
                A preview of the future student learning dashboard.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                This is a static dashboard preview. Login, progress tracking,
                enrolment, saved lessons, certificates and paid access can be
                connected later with Supabase, Stripe and a student account
                system.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-6">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                MVP purpose
              </p>

              <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
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

            <a
              href={withBasePath("/contact")}
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-4 text-sm font-black text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f7f4ee] sm:w-auto"
            >
              Request support
            </a>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {dashboardStats.map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-neutral-200 bg-[#f7f4ee] p-5"
              >
                <p className="font-sans text-3xl font-black tracking-[-0.05em] text-[#111111]">
                  {value}
                </p>

                <p className="mt-2 text-sm font-bold text-neutral-700">
                  {label}
                </p>
              </div>
            ))}
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

              <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                {card.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {card.note}
              </p>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#f7f4ee]">
                <div
                  className="h-full rounded-full bg-[#8b1116]"
                  style={{
                    width: card.progress.includes("%") ? card.progress : "55%",
                  }}
                />
              </div>

              <p className="mt-4 text-sm font-bold text-neutral-700">
                Preview status: {card.progress}
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

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-5xl">
              Designed for progress, saved learning and course continuity.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              These features are shown as a future product direction. The public
              launch can remain static while the dashboard design explains the
              long-term learning experience.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-3xl border border-neutral-200 bg-[#f7f4ee] p-5"
              >
                <h3 className="font-sans text-xl font-black tracking-[-0.03em]">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-neutral-700">
                  {feature.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Next actions
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-5xl">
              What learners can do now.
            </h2>

            <p className="max-w-3xl text-base leading-8 text-neutral-700">
              Until student accounts are active, users can still explore
              courses, use the Learning Hub and request academic support.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {nextActions.map((action) => (
              <a
                key={action.title}
                href={withBasePath(action.href)}
                className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
              >
                <h3 className="font-sans text-2xl font-black tracking-[-0.04em]">
                  {action.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  {action.text}
                </p>

                <p className="mt-5 text-sm font-black text-[#8b1116]">
                  {action.cta} →
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-[#111111] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">
              Coming later
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Login, subscriptions and certificates can be added after the
              public launch.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              For now, this page acts as a premium dashboard preview. It gives
              students a clear picture of the future account-based learning
              experience without blocking the static launch.
            </p>

            <a
              href={withBasePath("/contact")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:-translate-y-0.5"
            >
              Request support →
            </a>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-[#8b1116] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/90">
              Future feature list
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Account features planned for a later version.
            </h2>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {futureFeatures.map((feature) => (
                <div
                  key={feature}
                  className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold text-white"
                >
                  {feature}
                </div>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}