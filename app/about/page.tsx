import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about My Academic Tutor, a learning platform and academic-support network for statistics, biostatistics, mathematics, health data science and research methods.",
  alternates: {
    canonical: "https://www.myacademictutor.com/about/",
  },
};

const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return "/";
  if (href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${basePath}${cleanHref}${hasFileExtension ? "" : "/"}`;
}

const institutions = [
  "Indian Institute of Technology Kanpur",
  "Indian Institute of Technology Bombay",
  "Delhi Technological University",
  "University of Delhi",
  "University of Bristol",
];

const areas = [
  "Statistics",
  "Biostatistics",
  "Mathematics",
  "Health data science",
  "Research methods",
  "Regression",
  "Probability",
  "Data interpretation",
];

const principles = [
  {
    title: "Understanding first",
    body:
      "Support is designed to help students understand concepts, methods and reasoning rather than memorise isolated procedures.",
  },
  {
    title: "Responsible academic support",
    body:
      "The platform does not support ghostwriting, exam impersonation or dishonest completion of assessed work.",
  },
  {
    title: "Structured learning",
    body:
      "Resources, courses and explanations are organised around clear learning pathways, from foundations to applied quantitative work.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EA] px-5 py-10 text-[#141210] md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/")}
          className="text-sm font-semibold text-[#741018] hover:text-[#4d080e]"
        >
          ← Back to homepage
        </a>

        <div className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
            About My Academic Tutor
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-black leading-[1.03] tracking-[-0.055em] md:text-6xl">
                A clearer way to learn quantitative subjects.
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">
                My Academic Tutor is a learning platform and academic-support network for
                statistics, biostatistics, mathematics, health data science and research
                methods. The platform combines structured learning resources, study guides,
                interactive demos and responsible academic support.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#741018]">
                Academic network
              </p>
              <p className="mt-3 text-sm leading-7 text-[#525252]">
                Our academic-support network includes tutors and mentors with backgrounds
                from institutions including Indian Institute of Technology Kanpur, Indian Institute of Technology Bombay, Delhi Technological
                University, University of Delhi and University of Bristol.
              </p>
            </div>
          </div>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
              Academic direction
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
              Led academically by Rahul.
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#525252]">
              Rahul supports the academic direction of My Academic Tutor, including
              curriculum planning, learning-resource development and quality standards.
            </p>

            <div className="mt-6 space-y-3">
              <div className="rounded-[1.25rem] border border-[#E4DED2] bg-[#F7F3EA] p-4">
                <p className="text-sm font-bold text-[#141210]">
                  MSc Medical Statistics and Health Data Science
                </p>
                <p className="mt-1 text-sm text-[#525252]">
                  University of Bristol, UK — current
                </p>
              </div>

              <div className="rounded-[1.25rem] border border-[#E4DED2] bg-[#F7F3EA] p-4">
                <p className="text-sm font-bold text-[#141210]">
                  MSc Statistics
                </p>
                <p className="mt-1 text-sm text-[#525252]">
                  Indian Institute of Technology Kanpur, India
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
              What the platform covers
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em]">
              Support across quantitative learning.
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#525252]">
              My Academic Tutor focuses on clear explanations, structured resources and
              responsible academic guidance across core quantitative subjects.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {areas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-[#E4DED2] bg-[#F7F3EA] px-4 py-2 text-sm font-bold text-[#141210]"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
            Tutor network
          </p>

          <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-[-0.045em] md:text-4xl">
            Built around a focused academic network.
          </h2>

          <p className="mt-5 max-w-4xl text-sm leading-7 text-[#525252]">
            Enquiries are reviewed and directed to the most suitable available tutor,
            resource or learning pathway. Availability depends on subject area, tutor
            capacity and academic-integrity suitability.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {institutions.map((institution) => (
              <div
                key={institution}
                className="rounded-[1.25rem] border border-[#E4DED2] bg-[#F7F3EA] p-4 text-sm font-bold text-[#141210]"
              >
                {institution}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {principles.map((principle) => (
            <article
              key={principle.title}
              className="rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm"
            >
              <h3 className="text-lg font-black tracking-[-0.025em]">
                {principle.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#525252]">
                {principle.body}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#141210] p-6 text-white shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-white/70">
            Next step
          </p>

          <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="max-w-3xl text-3xl font-black tracking-[-0.045em] md:text-4xl">
                Explore the learning platform.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">
                Start with free resources, interactive demos or structured course pathways.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={withBasePath("/resources")}
                className="rounded-full bg-white px-5 py-3 text-sm font-black text-[#141210] transition hover:bg-[#F7F3EA]"
              >
                Read resources
              </a>
              <a
                href={withBasePath("/learning-hub")}
                className="rounded-full border border-white/20 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10"
              >
                Open Learning Hub
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
