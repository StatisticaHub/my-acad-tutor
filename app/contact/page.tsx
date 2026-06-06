import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import WhatHappensNext from "@/components/site/WhatHappensNext";
import JsonLd from "@/components/seo/JsonLd";
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


const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.myacademictutor.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contact",
      item: "https://www.myacademictutor.com/contact/",
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
    <main className="min-h-screen bg-[#F7F3EA] px-5 py-10 text-[#141210] md:px-8 md:py-16">

      <section className="mx-auto mt-8 max-w-7xl rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#7A0710]">
          Academic support
        </p>

        <h2 className="mt-3 text-2xl font-black tracking-tight text-[#141210] md:text-3xl">
          Request support for statistics, biostatistics and health data science.
        </h2>

        <p className="mt-4 max-w-4xl text-base leading-7 text-[#525252]">
          My Academic Tutor supports students learning statistics, biostatistics,
          medical statistics, health data science, research methods, probability,
          regression, data interpretation and quantitative project planning.
          Use this page to request structured academic guidance or tutoring support.
        </p>

        <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold">
          <a className="rounded-full border border-[#E4DED2] px-4 py-2 text-neutral-800 hover:bg-neutral-50" href="/learning-hub/">
            Explore the Learning Hub
          </a>
          <a className="rounded-full border border-[#E4DED2] px-4 py-2 text-neutral-800 hover:bg-neutral-50" href="/resources/">
            Read Statistics Resources
          </a>
          <a className="rounded-full border border-[#E4DED2] px-4 py-2 text-neutral-800 hover:bg-neutral-50" href="/interactive-demos/">
            Try Interactive Demos
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl">
        <a href={withBasePath("/")} className="text-sm font-semibold text-[#741018] hover:text-[#4d080e]">
          ← Back to homepage
        </a>

        <section className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#741018]">
              Tutoring support
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.03] tracking-[-0.055em] md:text-6xl">
              Request focused academic guidance.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">
              Use this form for statistics, biostatistics, data science, programming, research methods or dissertation-related support.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {notes.map((item) => (
                <div key={item} className="rounded-[1.35rem] border border-[#E4DED2] bg-[#FFFCF6] p-4 text-sm font-semibold text-neutral-800 shadow-sm">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#741018]">
                Responsible support
              </p>
              <p className="mt-3 text-sm leading-7 text-[#525252]">
                Guidance is designed to improve understanding and independent work. We do not provide ghostwriting, exam impersonation or dishonest completion of assessed tasks.
              </p>
            </div>
          </div>

          <ContactForm />
        </section>
      </section>
          <WhatHappensNext />
    </main>
    </>
  );
}
