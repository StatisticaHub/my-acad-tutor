import type { Metadata } from "next";
import TopFeatureMarquee from "@/components/site/TopFeatureMarquee";
import Hero from "@/components/site/Hero";
import CoursesPreview from "@/components/site/CoursesPreview";
import CourseAccessTimeline from "@/components/site/CourseAccessTimeline";
import AcademicNetwork from "@/components/site/AcademicNetwork";
import TrustProof from "@/components/site/TrustProof";
import SupportMatching from "@/components/site/SupportMatching";
import SupportOptions from "@/components/site/SupportOptions";
import InteractiveDemosPreview from "@/components/site/InteractiveDemosPreview";
import ContactCTA from "@/components/site/ContactCTA";
import QuickFAQ from "@/components/site/QuickFAQ";
import CourseWaitlist from "@/components/site/CourseWaitlist";
import WhoThisIsFor from "@/components/site/WhoThisIsFor";
export const metadata: Metadata = {
  title: "Online Statistics, Biostatistics and Health Data Science Tutoring",
  description:
    "My Academic Tutor helps students learn statistics, biostatistics, health data science and research methods through structured courses, interactive demos and academic guidance.",
  alternates: {
    canonical: "https://www.myacademictutor.com/",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What subjects does My Academic Tutor cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "My Academic Tutor covers statistics, biostatistics, health data science, research methods, medical statistics, probability, regression, confidence intervals, hypothesis testing and data interpretation.",
      },
    },
    {
      "@type": "Question",
      name: "Is My Academic Tutor suitable for beginners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The platform includes beginner-friendly foundation material as well as more advanced resources for students learning statistics, biostatistics and health data science.",
      },
    },
    {
      "@type": "Question",
      name: "Does the website include interactive learning tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The website includes interactive demonstrations for topics such as distributions, regression, confidence intervals, uncertainty and statistical interpretation.",
      },
    },
    {
      "@type": "Question",
      name: "Can students use this website for academic support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. My Academic Tutor provides structured academic guidance for quantitative subjects, including statistics, biostatistics, research methods and health data science.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <TopFeatureMarquee />
      <Hero />
      <CoursesPreview />
      <CourseAccessTimeline />
      <AcademicNetwork />
      <TrustProof />
      <SupportMatching />
      <SupportOptions />
      <CourseWaitlist />
      <InteractiveDemosPreview />

      <section className="sr-only" aria-label="Important learning links">
        <h2>Statistics, Biostatistics and Health Data Science Learning Routes</h2>
        <p>
          My Academic Tutor provides online statistics tutoring, biostatistics
          tutoring, health data science learning, research methods support and
          interactive statistics demonstrations.
        </p>
        <nav aria-label="SEO learning links">
          <a href="/learning-hub/">Explore the Learning Hub</a>
          <a href="/resources/">Read statistics and biostatistics resources</a>
          <a href="/interactive-demos/">Try interactive statistics demos</a>
          <a href="/contact/">Contact My Academic Tutor</a>
        </nav>
      </section>
      <QuickFAQ />
      <ContactCTA />
    </main>
  );
}
