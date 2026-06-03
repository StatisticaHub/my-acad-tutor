const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;
  return `${basePath}${href}/`;
}

const values = [
  {
    title: "Clarity",
    text: "Complex quantitative ideas are broken down carefully, with emphasis on interpretation, reasoning and academic confidence.",
  },
  {
    title: "Academic responsibility",
    text: "Support is designed to help students understand, practise and work independently, not replace their own academic effort.",
  },
  {
    title: "Structured learning",
    text: "Courses, resources and guidance are organised to move from foundations to applied reasoning in a clear learning pathway.",
  },
  {
    title: "Quantitative depth",
    text: "The platform focuses on statistics, biostatistics, data science, programming, research methods and related analytical fields.",
  },
];

const focusAreas = [
  "Statistics foundations",
  "Biostatistics and health data",
  "Data science and programming",
  "Research methods",
  "Academic interpretation",
  "Structured course learning",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/")}
          className="text-sm font-bold text-[#8b1116] hover:text-[#5f0b0f]"
        >
          ← Back to homepage
        </a>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            About My Academic Tutor
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl font-sans text-4xl font-black leading-[1.02] tracking-[-0.05em] md:text-6xl">
                A structured platform for quantitative learning and academic
                confidence.
              </h1>
            </div>

            <div>
              <p className="text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                My Academic Tutor is a specialist academic support and learning
                platform for university students, researchers and early-career
                professionals working with statistics, biostatistics,
                programming, data science, bioinformatics and quantitative
                research methods.
              </p>

              <p className="mt-4 text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                The aim is to make difficult quantitative subjects more
                understandable through clear explanations, structured pathways,
                practical interpretation and responsible academic support.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Since 2020", "Supporting learners"],
              ["Structured", "Course pathways"],
              ["Quantitative", "Subject focus"],
              ["Responsible", "Academic support"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-neutral-200 bg-[#f7f4ee] p-5"
              >
                <p className="font-sans text-2xl font-black tracking-[-0.04em] text-[#111111]">
                  {value}
                </p>
                <p className="mt-2 text-sm font-bold text-neutral-600">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Founder note
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Built around clarity, structure and responsible academic support.
            </h2>

            <p className="mt-5 text-base leading-8 text-neutral-700">
              Founded by an Indian Institute of Technology Kanpur alumnus, My
              Academic Tutor was created to support quantitative learning across
              statistics, biostatistics, data science, programming, research
              methods, bioinformatics and related academic fields.
            </p>

            <p className="mt-4 text-base leading-8 text-neutral-700">
              The platform is designed for learners who want more than quick
              answers. It focuses on understanding concepts, interpreting
              results, building confidence and developing the reasoning needed
              for academic and research work.
            </p>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-[#111111] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/80">
              Platform purpose
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Quantitative learning should feel structured, not overwhelming.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              Many students struggle not because they lack ability, but because
              quantitative subjects are often presented too quickly, too
              abstractly or without enough connection to interpretation. My
              Academic Tutor is built to close that gap.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {focusAreas.map((area) => (
                <div
                  key={area}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-sm font-bold leading-6 text-white/85">
                    {area}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Core values
          </p>

          <h2 className="mt-4 max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
            The platform is shaped by four teaching principles.
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-[1.5rem] border border-neutral-200 bg-[#f7f4ee] p-6"
              >
                <h3 className="font-sans text-2xl font-black tracking-[-0.035em]">
                  {value.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  {value.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Learning approach
          </p>

          <div className="mt-4 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <h2 className="font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              From foundations to interpretation.
            </h2>

            <div className="space-y-4 text-base leading-8 text-neutral-700">
              <p>
                The website is being developed as more than a tutoring landing
                page. It is becoming a structured learning environment with
                courses, modules, lessons, resource guides and clear pathways
                for quantitative subjects.
              </p>

              <p>
                Students can begin with foundational statistics, move into
                biostatistics or machine learning, and use the resource guides
                to strengthen interpretation, notation, workflow and research
                planning.
              </p>

              <p>
                The long-term aim is to provide a professional learning hub for
                students who want careful explanations, not shortcuts.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] bg-[#8b1116] p-6 text-white shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">
            Start learning
          </p>

          <h2 className="mt-4 max-w-4xl font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
            Explore structured courses and quantitative resources.
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-8 text-white/75">
            Begin with the Learning Hub, choose a course pathway, or browse
            resources designed to support statistical and research understanding.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={withBasePath("/learning-hub")}
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              Open Learning Hub
            </a>

            <a
              href={withBasePath("/resources")}
              className="inline-flex w-full items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto"
            >
              Browse resources
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}