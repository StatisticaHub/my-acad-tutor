import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy information for My Academic Tutor, including how enquiries and contact form details are handled.",
  alternates: {
    canonical: "https://www.myacademictutor.com/privacy/",
  },
};

const sections = [
  {
    title: "What information may be collected",
    body:
      "When you submit an enquiry, My Academic Tutor may collect your name, email address, subject, academic level, topic, software needs, deadline information and the message you choose to send.",
  },
  {
    title: "Why information is used",
    body:
      "Information is used to review enquiries, understand the type of academic support requested, respond to messages and direct students to a suitable tutor, resource or learning pathway.",
  },
  {
    title: "Academic and sensitive information",
    body:
      "Students should not send passwords, confidential datasets, exam material, private institutional login details or unnecessary sensitive personal information through the contact form.",
  },
  {
    title: "Sharing",
    body:
      "Enquiry details may be shared with a suitable tutor or academic-support contact only when needed to review or respond to the enquiry. Information is not sold to advertisers.",
  },
  {
    title: "Retention",
    body:
      "Enquiry information is kept only for as long as reasonably needed to respond, manage support requests, maintain records and improve the platform.",
  },
  {
    title: "Your choices",
    body:
      "You may request correction or deletion of enquiry information by contacting My Academic Tutor. Some records may need to be retained where there is a legitimate administrative, legal or integrity reason.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EA] px-5 py-10 text-[#141210] md:px-8 md:py-16">
      <section className="mx-auto max-w-5xl">
        <a href="/" className="text-sm font-semibold text-[#741018] hover:text-[#4d080e]">
          ← Back to homepage
        </a>

        <div className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
            Privacy Policy
          </p>

          <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-[-0.055em] md:text-6xl">
            How enquiry information is handled.
          </h1>

          <p className="mt-6 text-base leading-8 text-[#525252]">
            This page explains how My Academic Tutor handles information submitted
            through contact, enquiry and waitlist forms. It is written for students,
            parents and visitors using the learning platform.
          </p>

          <p className="mt-4 text-sm font-bold text-[#741018]">
            Last updated: 5 June 2026
          </p>
        </div>

        <div className="mt-8 grid gap-4">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm"
            >
              <h2 className="text-xl font-black tracking-[-0.03em]">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#525252]">
                {section.body}
              </p>
            </article>
          ))}
        </div>

        <section className="mt-8 rounded-[1.75rem] border border-[#E4DED2] bg-[#141210] p-6 text-white shadow-sm">
          <h2 className="text-xl font-black tracking-[-0.03em]">
            Contact about privacy
          </h2>
          <p className="mt-3 text-sm leading-7 text-white/75">
            For privacy-related requests, contact:{" "}
            <a href="mailto:contact@myacademictutor.com" className="font-bold text-white underline">
              contact@myacademictutor.com
            </a>
          </p>
        </section>
      </section>
    </main>
  );
}
