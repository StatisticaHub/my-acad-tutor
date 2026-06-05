const institutions = [
  "Indian Institute of Technology Kanpur",
  "Indian Institute of Technology Bombay",
  "Delhi Technological University",
  "University of Delhi",
  "University of Bristol",
];

const standards = [
  {
    title: "Academic direction",
    body:
      "Rahul supports curriculum planning, learning-resource development and quality standards for the platform.",
  },
  {
    title: "Focused tutor network",
    body:
      "Enquiries are reviewed and directed to the most suitable available tutor, resource or learning pathway.",
  },
  {
    title: "Responsible support",
    body:
      "Support is designed for explanation, planning and understanding. We do not support ghostwriting, exam impersonation or dishonest completion of assessed work.",
  },
];

export default function AcademicNetwork() {
  return (
    <section className="bg-[#F7F3EA] px-5 py-12 text-[#141210] md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
            Academic network
          </p>

          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <div>
              <h2 className="max-w-4xl text-3xl font-black leading-[1.05] tracking-[-0.05em] md:text-5xl">
                Built with academic training, structured resources and responsible support.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-[#525252]">
                My Academic Tutor is a learning platform and academic-support network for
                statistics, biostatistics, mathematics, health data science and research
                methods. The platform combines study guides, structured courses,
                interactive demos and support from a focused academic network.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#E4DED2] bg-[#F7F3EA] p-5">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#741018]">
                Academic direction
              </p>
              <p className="mt-3 text-sm leading-7 text-[#525252]">
                Rahul has an MSc in Statistics from Indian Institute of Technology
                Kanpur and is currently studying MSc Medical Statistics and Health
                Data Science at University of Bristol, UK.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {standards.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-[#E4DED2] bg-white p-5 shadow-sm"
              >
                <h3 className="text-base font-black text-[#141210]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#525252]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#741018]">
              Academic backgrounds represented
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              {institutions.map((institution) => (
                <span
                  key={institution}
                  className="rounded-full border border-[#E4DED2] bg-[#F7F3EA] px-4 py-2 text-sm font-bold text-[#141210]"
                >
                  {institution}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/about/"
              className="rounded-full bg-[#141210] px-5 py-3 text-sm font-black text-white transition hover:bg-[#741018]"
            >
              Learn about the platform
            </a>

            <a
              href="/resources/"
              className="rounded-full border border-[#D8CDBB] px-5 py-3 text-sm font-black text-[#141210] transition hover:bg-[#F7F3EA]"
            >
              Read free resources
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
