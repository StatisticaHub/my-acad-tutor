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

const principles = [
  {
    title: "Privacy-first",
    description:
      "Student examples are kept general unless clear permission is given to share identifiable feedback.",
  },
  {
    title: "Anonymised record",
    description:
      "Public wording focuses on subjects, countries and support types rather than private student messages.",
  },
  {
    title: "Learning-focused",
    description:
      "Support is centred on explanation, interpretation, method choice and academic confidence.",
  },
];

export default function StudentSupportRecord() {
  return (
    <section className="bg-white px-5 py-10 text-neutral-950 md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8b1116]">
              Student support record
            </p>

            <h2 className="font-serif-academic mt-3 text-4xl font-medium leading-tight tracking-[-0.025em] md:text-5xl">
              Supporting quantitative learning across subjects and countries.
            </h2>
          </div>

          <p className="max-w-3xl text-base leading-8 text-neutral-600">
            My Academic Tutor has supported students across multiple countries
            and academic backgrounds. Public examples are kept general and
            anonymised, with emphasis on the types of quantitative support
            students commonly need.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.25rem] border border-neutral-200 bg-[#f8f6f1] p-6 md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8b1116]">
                  Common requests
                </p>

                <h3 className="font-serif-academic mt-3 text-3xl font-medium leading-tight tracking-[-0.02em]">
                  Areas students commonly ask for support with
                </h3>
              </div>

              <span className="w-fit rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-neutral-600">
                Academic support
              </span>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {supportAreas.map((item) => (
                <div
                  key={item}
                  className="rounded-md border border-neutral-200 bg-white p-4 text-sm font-semibold leading-6 text-neutral-800 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8b1116]">
              Student locations
            </p>

            <h3 className="font-serif-academic mt-3 text-3xl font-medium leading-tight tracking-[-0.02em]">
              International student experience
            </h3>

            <p className="mt-4 text-sm leading-7 text-neutral-600">
              Support has been requested by students based in the following
              countries:
            </p>

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
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {principles.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.25rem] border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold tracking-tight text-neutral-950">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-neutral-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[1.25rem] border border-[#ead8d8] bg-[#fff8f6] p-6">
          <p className="text-sm leading-7 text-neutral-700">
            Student privacy is treated carefully. Public statements avoid
            identifiable student details and focus instead on broad subject
            areas, learning needs and responsible academic support.
          </p>
        </div>
      </div>
    </section>
  );
}