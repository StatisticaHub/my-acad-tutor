import type { Metadata } from "next";
import ContactForm from "./ContactForm";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact My Academic Tutor for support with statistics, biostatistics, health data science, research methods and academic quantitative learning.",
  alternates: {
    canonical: "https://www.myacademictutor.com/contact/",
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

const notes = [
  "Concept explanation",
  "Software guidance",
  "Research planning",
  "Interpretation support",
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-neutral-950 md:px-8 md:py-16">

      <section className="mx-auto mt-8 max-w-7xl rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#6f0d12]">
          Academic support
        </p>

        <h2 className="mt-3 text-2xl font-black tracking-tight text-neutral-950 md:text-3xl">
          Request support for statistics, biostatistics and health data science.
        </h2>

        <p className="mt-4 max-w-4xl text-base leading-7 text-neutral-700">
          My Academic Tutor supports students learning statistics, biostatistics,
          medical statistics, health data science, research methods, probability,
          regression, data interpretation and quantitative project planning.
          Use this page to request structured academic guidance or tutoring support.
        </p>

        <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold">
          <a className="rounded-full border border-neutral-200 px-4 py-2 text-neutral-800 hover:bg-neutral-50" href="/learning-hub/">
            Explore the Learning Hub
          </a>
          <a className="rounded-full border border-neutral-200 px-4 py-2 text-neutral-800 hover:bg-neutral-50" href="/resources/">
            Read Statistics Resources
          </a>
          <a className="rounded-full border border-neutral-200 px-4 py-2 text-neutral-800 hover:bg-neutral-50" href="/interactive-demos/">
            Try Interactive Demos
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl">
        <a href={withBasePath("/")} className="text-sm font-semibold text-[#8b1116] hover:text-[#5f0b0f]">
          ← Back to homepage
        </a>

        <section className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8b1116]">
              Tutoring support
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.03] tracking-[-0.055em] md:text-6xl">
              Request focused academic guidance.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
              Use this form for statistics, biostatistics, data science, programming, research methods or dissertation-related support.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {notes.map((item) => (
                <div key={item} className="rounded-[1.35rem] border border-neutral-200 bg-white p-4 text-sm font-semibold text-neutral-800 shadow-sm">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b1116]">
                Responsible support
              </p>
              <p className="mt-3 text-sm leading-7 text-neutral-700">
                Guidance is designed to improve understanding and independent work. We do not provide ghostwriting, exam impersonation or dishonest completion of assessed tasks.
              </p>
            </div>
          </div>

          <ContactForm />
        </section>
      </section>
    </main>
  );
}
