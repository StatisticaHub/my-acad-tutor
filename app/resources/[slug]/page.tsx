import { notFound } from "next/navigation";
import { resourceGuides } from "@/lib/resources";

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

function sectionId(title: string) {
  return title.toLowerCase().replaceAll(" ", "-");
}

export function generateStaticParams() {
  return resourceGuides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = resourceGuides.find((item) => item.slug === slug);

  if (!guide) {
    return {
      title: "Resource guide | My Academic Tutor",
    };
  }

  return {
    title: `${guide.title} | My Academic Tutor Resources`,
    description: guide.summary,
  };
}

export default async function ResourceGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const guide = resourceGuides.find((item) => item.slug === slug);

  if (!guide) {
    notFound();
  }

  const blocks = [
    guide.problem,
    guide.intuition,
    guide.method,
    guide.working,
    guide.limitations,
    guide.discussion,
  ];

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-neutral-950">
      <section className="relative overflow-hidden border-b border-neutral-200 bg-white px-5 py-10 md:px-8 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#f6d8d8,transparent_35%)]" />

        <div className="relative mx-auto max-w-5xl">
          <a
            href={withBasePath("/resources")}
            className="text-sm font-semibold text-[#8b1116] hover:text-neutral-950"
          >
            ← Back to Resources
          </a>

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#8b1116] px-3 py-1 text-xs font-semibold text-white">
              {guide.area}
            </span>

            <span className="rounded-full border border-neutral-200 bg-[#f8f6f1] px-3 py-1 text-xs font-semibold text-neutral-700">
              {guide.level}
            </span>

            <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-neutral-600">
              Resource guide
            </span>
          </div>

          <h1 className="font-serif-academic mt-6 max-w-4xl text-3xl font-medium leading-[1.08] tracking-[-0.03em] sm:text-4xl md:text-6xl">
            {guide.title}
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-9 text-neutral-700">
            {guide.summary}
          </p>

          <div className="mt-8 grid gap-3 rounded-[1.25rem] border border-neutral-200 bg-[#f8f6f1] p-5 md:grid-cols-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-700">
                Structure
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-700">
                Problem, intuition, method, working, limitations and discussion.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-700">
                Best for
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-700">
                Students preparing for coursework, analysis, interpretation or
                revision.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-700">
                Use with
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-700">
                Learning Hub lessons, tutoring sessions or dissertation
                planning.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:px-8 lg:grid-cols-[0.75fr_1.25fr]">
        <aside className="h-fit rounded-[1.5rem] border border-neutral-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-neutral-700">
            Guide structure
          </p>

          <nav className="mt-5 grid gap-2">
            {blocks.map((block) => (
              <a
                key={block.title}
                href={`#${sectionId(block.title)}`}
                className="rounded-md border border-neutral-200 bg-[#f8f6f1] px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:border-[#8b1116]/40 hover:bg-white"
              >
                {block.title}
              </a>
            ))}
          </nav>

          <div className="mt-6 rounded-xl border border-[#ead8d8] bg-[#fff8f6] p-4">
            <p className="text-sm font-semibold text-neutral-950">
              How to study this guide
            </p>

            <p className="mt-2 text-sm leading-7 text-neutral-600">
              Read the problem first. Then move through intuition, method and
              working before checking limitations and discussion. This helps you
              understand both the method and its interpretation.
            </p>
          </div>

          <div className="mt-5 rounded-xl border border-neutral-200 bg-white p-4">
            <p className="text-sm font-semibold text-neutral-950">
              Need support?
            </p>

            <p className="mt-2 text-sm leading-7 text-neutral-600">
              Use this guide to prepare your questions before requesting
              subject support or research guidance.
            </p>

            <a
              href={withBasePath("/contact")}
              className="mt-4 inline-flex rounded-md bg-neutral-950 px-4 py-2 text-sm font-semibold text-white"
            >
              Ask for help
            </a>
          </div>
        </aside>

        <div className="space-y-6">
          {blocks.map((block, index) => (
            <section
              key={block.title}
              id={sectionId(block.title)}
              className="rounded-[1.5rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#8b1116] px-3 py-1 text-xs font-semibold text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8b1116]">
                  Resource guide
                </p>
              </div>

              <h2 className="font-serif-academic mt-4 text-3xl font-medium leading-tight tracking-[-0.02em] md:text-4xl">
                {block.title}
              </h2>

              <p className="mt-5 text-base leading-8 text-neutral-700">
                {block.body}
              </p>

              {block.bullets ? (
                <ul className="mt-6 grid gap-3">
                  {block.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 rounded-xl border border-neutral-200 bg-[#f8f6f1] p-4 text-sm leading-7 text-neutral-700"
                    >
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#8b1116]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
                Practical checklist
              </p>

              <h2 className="font-serif-academic mt-3 text-3xl font-medium tracking-[-0.02em]">
                Before you apply this topic
              </h2>

              <ul className="mt-5 space-y-3">
                {guide.checklist.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-7 text-neutral-700"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.5rem] border border-rose-200 bg-rose-50 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-rose-700">
                Common mistakes
              </p>

              <h2 className="font-serif-academic mt-3 text-3xl font-medium tracking-[-0.02em]">
                What to avoid
              </h2>

              <ul className="mt-5 space-y-3">
                {guide.commonMistakes.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-7 text-neutral-700"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-rose-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8b1116]">
              How this connects to learning
            </p>

            <h2 className="font-serif-academic mt-3 text-3xl font-medium leading-tight tracking-[-0.02em] md:text-4xl">
              Use the guide as a bridge between theory and application.
            </h2>

            <p className="mt-5 text-base leading-8 text-neutral-700">
              A resource guide should not replace a full course or live
              teaching session. Instead, it helps you organise your thinking.
              Use it to identify what you understand, what feels unclear, and
              what questions you should ask before applying a method to real
              data.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-neutral-200 bg-[#f8f6f1] p-4">
                <p className="text-sm font-semibold text-neutral-950">
                  Before a lesson
                </p>
                <p className="mt-2 text-sm leading-7 text-neutral-600">
                  Read the intuition and problem sections to prepare.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-[#f8f6f1] p-4">
                <p className="text-sm font-semibold text-neutral-950">
                  During analysis
                </p>
                <p className="mt-2 text-sm leading-7 text-neutral-600">
                  Use the method and checklist to guide decisions.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-[#f8f6f1] p-4">
                <p className="text-sm font-semibold text-neutral-950">
                  When writing
                </p>
                <p className="mt-2 text-sm leading-7 text-neutral-600">
                  Use limitations and discussion to improve interpretation.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-neutral-200 bg-neutral-950 p-6 text-white md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/80">
              Related guides
            </p>

            <h2 className="font-serif-academic mt-3 text-3xl font-medium leading-tight tracking-[-0.02em]">
              Continue with related topics.
            </h2>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {guide.related.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-white/90"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={withBasePath("/resources")}
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-neutral-950"
              >
                Back to all resources
              </a>

              <a
                href={withBasePath("/contact")}
                className="rounded-md border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white"
              >
                Need help applying this?
              </a>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}