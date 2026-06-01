import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/sections/SectionHeading";

const roadmap = [
  "Data exploration",
  "Visualisation and communication",
  "Modelling foundations",
  "Machine learning basics",
  "Validation and responsible interpretation",
];

export default function DataSciencePathwayPage() {
  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="bg-slate-950 px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-7xl">
          <Badge variant="blue">Data Science Pathway</Badge>

          <h1 className="mt-6 max-w-5xl text-5xl font-bold tracking-tight md:text-7xl">
            Build practical data science skills with statistical thinking.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
            This pathway connects data exploration, modelling, machine learning,
            validation and communication for students working with real datasets.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Pathway roadmap"
            title="Data science with academic depth."
            description="Learn data science as a structured process rather than a collection of disconnected tools."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {roadmap.map((item, index) => (
              <div
                key={item}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-950">
                  {item}
                </h3>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  Each stage focuses on understanding, implementation and careful
                  interpretation of results.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}