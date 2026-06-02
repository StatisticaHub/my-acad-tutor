import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/sections/SectionHeading";

const roadmap = [
  "Choosing a research question",
  "Planning the analysis",
  "Understanding study design",
  "Interpreting results",
  "Writing methods and limitations responsibly",
];

export default function ResearchDissertationPathwayPage() {
  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="bg-slate-950 px-5 py-12 text-white md:px-6 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Badge variant="green">Research & Dissertation Pathway</Badge>

          <h1 className="mt-6 max-w-5xl text-3xl font-bold tracking-tight sm:text-4xl md:text-7xl">
            Plan research and dissertation work with statistical clarity.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
            This pathway supports students with research planning, analysis thinking,
            interpretation, methods writing and responsible academic development.
          </p>
        </div>
      </section>

      <section className="px-5 py-10 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Pathway roadmap"
            title="From research idea to interpretation."
            description="This pathway helps students develop stronger research logic and understand how statistical analysis fits into a dissertation or project."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {roadmap.map((item, index) => (
              <div
                key={item}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-950">
                  {item}
                </h3>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  The focus is on planning, reasoning, interpretation and responsible
                  academic support, not completing assessed work for students.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}