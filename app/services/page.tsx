import FeatureCard from "@/components/sections/FeatureCard";
import SectionHeading from "@/components/sections/SectionHeading";

const services = [
  {
    title: "Statistics Tutoring",
    description:
      "Support with probability, distributions, estimation, hypothesis testing, regression, ANOVA, statistical interpretation and exam preparation.",
  },
  {
    title: "Biostatistics & Medical Statistics",
    description:
      "Guidance with clinical data, epidemiology, survival analysis, logistic regression, diagnostic accuracy, medical prediction models and health research interpretation.",
  },
  {
    title: "R and Python Support",
    description:
      "Help with data cleaning, coding logic, statistical workflows, plots, reproducible analysis and understanding programming errors.",
  },
  {
    title: "Data Science Support",
    description:
      "Support with exploratory data analysis, modelling, machine learning concepts, validation, visualisation and project workflows.",
  },
  {
    title: "Bioinformatics Support",
    description:
      "Conceptual and workflow support for omics data, RNA-seq, single-cell analysis, spatial data, biological interpretation and reproducible pipelines.",
  },
  {
    title: "Dissertation & Research Guidance",
    description:
      "Help with research question development, analysis planning, methodology structure, interpretation and responsible academic feedback.",
  },
];

const process = [
  {
    step: "01",
    title: "Tell us your topic",
    description:
      "Share your subject, module, research problem, dataset type or the concept you are struggling with.",
  },
  {
    step: "02",
    title: "Get a clear learning plan",
    description:
      "We identify what you need to understand and suggest the right support pathway.",
  },
  {
    step: "03",
    title: "Learn through explanation",
    description:
      "Sessions focus on reasoning, interpretation, worked examples and independent skill development.",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="bg-slate-950 px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
            Academic Support Services
          </p>

          <h1 className="max-w-5xl text-5xl font-bold tracking-tight md:text-7xl">
            Expert support for statistics, data science and research-based learning.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
            My Academic Tutor helps students understand difficult quantitative subjects
            through clear explanation, structured guidance and responsible academic support.
          </p>

          <div className="mt-10">
            <a
              href="/contact"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
            >
              Request Academic Support
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="What we support"
            title="Support across quantitative academic subjects."
            description="Choose focused academic help for your course, dissertation, coding project or research-based data analysis work."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <FeatureCard
                key={service.title}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="How it works"
            title="A simple support process."
            description="The goal is not to give shortcuts. The goal is to help students understand the work properly and build confidence."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {process.map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {item.step}
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Responsible learning"
              title="Academic integrity is built into the platform."
              description="Support is designed to improve understanding, not replace the student’s own academic work."
            />
          </div>

          <div className="rounded-[2rem] bg-slate-950 p-8 text-white">
            <h3 className="text-2xl font-bold">What we do</h3>

            <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-300">
              <li>✓ Explain concepts, methods and statistical reasoning.</li>
              <li>✓ Help students understand analysis workflows and interpretation.</li>
              <li>✓ Provide feedback, planning support and learning guidance.</li>
              <li>✓ Support responsible skill development in R, Python and statistics.</li>
            </ul>

            <h3 className="mt-10 text-2xl font-bold">What we do not do</h3>

            <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-300">
              <li>✕ Ghostwrite assignments, dissertations or coursework.</li>
              <li>✕ Complete assessed work on behalf of students.</li>
              <li>✕ Manipulate results or fabricate analysis outcomes.</li>
              <li>✕ Support impersonation or dishonest academic conduct.</li>
            </ul>

            <div className="mt-8">
              <a
                href="/academic-integrity"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100"
              >
                Read academic integrity policy
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-blue-600 p-8 text-white md:p-12">
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
            Need help choosing the right support?
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50">
            Send your topic, course area or research problem and we will suggest the most
            suitable support pathway.
          </p>

          <div className="mt-8">
            <a
              href="/contact"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            >
              Contact My Academic Tutor
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}