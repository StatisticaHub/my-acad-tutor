const proofPoints = [
  {
    value: "Since 2020",
    label: "Experience supporting quantitative learners through structured academic guidance.",
  },
  {
    value: "25+",
    label: "In-depth study guides across statistics, biostatistics, regression and research methods.",
  },
  {
    value: "5+ areas",
    label: "Statistics, mathematics, biostatistics, health data science and research methods.",
  },
];

const supportAreas = [
  "Statistics",
  "Mathematics",
  "Data science",
  "Biostatistics",
  "Bioinformatics",
  "Concept explanation",
  "Study planning",
  "Research-method guidance",
  "Data interpretation",
  "Regression support",
  "Probability foundations",
  "Dissertation planning",
  "Statistical test selection",
  "Model interpretation",
  "Academic writing structure",
];

export default function TrustProof() {
  return (
    <section className="bg-[#F7F3EA] px-5 py-12 text-[#141210] md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
          Platform credibility
        </p>

        <div className="mt-4 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <h2 className="max-w-3xl text-3xl font-black leading-[1.05] tracking-[-0.05em] md:text-5xl">
              Built for students who want clearer quantitative learning.
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-8 text-[#525252]">
              My Academic Tutor brings together structured resources, course pathways,
              interactive demos and responsible academic support for students learning
              quantitative subjects.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {proofPoints.map((point) => (
              <div
                key={point.value}
                className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
              >
                <p className="text-2xl font-black tracking-[-0.04em] text-[#741018]">
                  {point.value}
                </p>
                <p className="mt-2 text-xs leading-5 text-[#525252]">
                  {point.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {supportAreas.map((area) => (
            <span
              key={area}
              className="rounded-full border border-[#E4DED2] bg-white px-4 py-2 text-sm font-bold text-[#141210]"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
