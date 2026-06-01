const supportAreas = [
  "Statistics and probability",
  "Biostatistics and medical statistics",
  "R, Python, SPSS, SAS and Stata",
  "Data science and machine learning",
  "Bioinformatics and omics",
  "Dissertation and research projects",
];

const locations = [
  "India",
  "USA",
  "Canada",
  "Australia",
  "Italy",
  "UAE",
  "Ireland",
  "UK",
  "South Korea",
  "Singapore",
  "Kuwait",
];

export default function StudentSupportRecord() {
  return (
    <section className="bg-white px-5 py-16 text-neutral-950 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
              Student support record
            </p>

            <h2 className="font-serif-academic mt-3 text-4xl font-semibold tracking-[-0.035em] md:text-5xl">
              Supporting students across countries and subjects.
            </h2>
          </div>

          <p className="max-w-3xl text-base leading-8 text-neutral-600">
            We have supported students based in India, USA, Canada, Australia,
            Italy, UAE, Ireland, UK, South Korea, Singapore and Kuwait. Instead
            of displaying personal student messages publicly, feedback is kept
            anonymised and focused on the types of support students commonly
            request.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.25rem] border border-neutral-200 bg-[#f8f6f1] p-6 md:p-8">
            <h3 className="font-serif-academic text-3xl font-semibold tracking-tight">
              Common support areas
            </h3>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {supportAreas.map((item) => (
                <div
                  key={item}
                  className="rounded-md border border-neutral-200 bg-white p-4 text-sm font-semibold leading-6 text-neutral-800"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-neutral-200 bg-white p-6 md:p-8">
            <h3 className="font-serif-academic text-3xl font-semibold tracking-tight">
              Student locations
            </h3>

            <div className="mt-6 flex flex-wrap gap-2">
              {locations.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-neutral-200 bg-[#f8f6f1] px-4 py-2 text-sm font-semibold text-neutral-700"
                >
                  {item}
                </span>
              ))}
            </div>

            <p className="mt-6 text-sm leading-7 text-neutral-600">
              Student privacy is important to us. Public examples are kept
              general unless a student gives clear permission to share
              identifiable feedback.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}