import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about My Academic Tutor, academic support, resources, courses, enquiry review and responsible learning.",
  alternates: {
    canonical: "https://www.myacademictutor.com/faq/",
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

const faqs = [
  {
    group: "Using the platform",
    items: [
      {
        question: "What is My Academic Tutor?",
        answer:
          "My Academic Tutor is a structured learning platform and academic-support network for statistics, mathematics, biostatistics, data science, bioinformatics and research methods.",
      },
      {
        question: "Where should I start?",
        answer:
          "Start with the Learning Hub. Foundation learners can begin with Statistics Foundation, applied learners can use resources and demos, and research/project learners can submit an enquiry if they need guided support.",
      },
      {
        question: "Are the courses open now?",
        answer:
          "Preview access is open now. Lesson 1.1 is available. The full course opens in July 2026. Other course routes will release gradually from September 2026.",
      },
    ],
  },
  {
    group: "Academic support",
    items: [
      {
        question: "How does support work?",
        answer:
          "Students submit an enquiry with their subject, level, topic and support need. The enquiry is reviewed and the student may be directed to a suitable tutor, resource, course pathway or demo.",
      },
      {
        question: "Who provides support?",
        answer:
          "Support is arranged through an academic-support network. Tutor backgrounds include institutions such as Indian Institute of Technology Kanpur, Indian Institute of Technology Bombay, Delhi Technological University and University of Delhi.",
      },
      {
        question: "How quickly will I receive a reply?",
        answer:
          "Most enquiries receive a reply within 24–48 hours after review, depending on subject fit, detail provided and tutor availability.",
      },
    ],
  },
  {
    group: "Subjects and levels",
    items: [
      {
        question: "Which subjects are covered?",
        answer:
          "The platform focuses on statistics, mathematics, data science, biostatistics, bioinformatics and research methods. The listed topics are examples, not fixed limits.",
      },
      {
        question: "Which education levels are suitable?",
        answer:
          "Support may be suitable for school/foundation learners, undergraduate students, master's students, dissertation/project learners and professional upskilling, depending on the enquiry.",
      },
      {
        question: "Can I ask about software?",
        answer:
          "Yes. Enquiries may involve R, Python, SPSS, Stata, Excel or other tools, but support is for understanding, workflow direction and interpretation, not dishonest completion of assessed work.",
      },
    ],
  },
  {
    group: "Academic integrity",
    items: [
      {
        question: "Can you complete my assignment or dissertation analysis for me?",
        answer:
          "No. Support is for explanation, planning, interpretation and independent learning. My Academic Tutor does not support ghostwriting, exam impersonation or dishonest completion of assessed tasks.",
      },
      {
        question: "What should I avoid sending?",
        answer:
          "Do not send passwords, private login details, confidential datasets, exam material, unpublished sensitive data or unnecessary personal information through the enquiry form.",
      },
      {
        question: "Can support help with dissertation planning?",
        answer:
          "Yes, if the support is focused on research-question clarity, method choice, analysis planning, interpretation and responsible independent work.",
      },
    ],
  },
  {
    group: "Pricing and enquiries",
    items: [
      {
        question: "Is pricing shown publicly?",
        answer:
          "Pricing is shared after enquiry review because support needs vary by subject, level, urgency, tutor availability and support type. Students receive clear details before confirming support.",
      },
      {
        question: "Do I need to pay to use the resources?",
        answer:
          "The public study guides and interactive demos are available to explore freely. Some structured course features may open according to the release schedule.",
      },
      {
        question: "What makes a good enquiry?",
        answer:
          "A good enquiry includes your subject, academic level, topic, software if relevant, deadline or preferred timing, and a short explanation of what you need help understanding.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EA] px-5 py-10 text-[#141210] md:px-8 md:py-16">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.flatMap((section) =>
              section.items.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              }))
            ),
          }),
        }}
      />
      <section className="mx-auto max-w-6xl">
        <a
          href={withBasePath("/")}
          className="text-sm font-semibold text-[#741018] hover:text-[#4d080e]"
        >
          ← Back to homepage
        </a>

        <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
            Frequently asked questions
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.05] tracking-[-0.055em] md:text-6xl">
            Clear answers before you submit an enquiry.
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">
            Learn how the platform works, what support can include, how enquiries
            are reviewed and how academic integrity is protected.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={withBasePath("/learning-hub")}
              className="rounded-full bg-[#141210] px-5 py-3 text-sm font-black text-white transition hover:bg-[#741018]"
            >
              Open Learning Hub
            </a>
            <a
              href={`${withBasePath("/contact")}#support-form`}
              className="rounded-full border border-[#D8CDBB] px-5 py-3 text-sm font-black text-[#141210] transition hover:bg-[#F7F3EA]"
            >
              Submit enquiry
            </a>
          </div>
        </section>

        <div className="mt-8 grid gap-6">
          {faqs.map((section) => (
            <section
              key={section.group}
              className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8"
            >
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#741018]">
                {section.group}
              </p>

              <div className="mt-6 grid gap-4">
                {section.items.map((item) => (
                  <article
                    key={item.question}
                    className="rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5"
                  >
                    <h2 className="text-lg font-black tracking-[-0.03em]">
                      {item.question}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-[#525252]">
                      {item.answer}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
