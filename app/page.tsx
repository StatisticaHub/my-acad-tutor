import Hero from "@/components/site/Hero";
import TrustStrip from "@/components/site/TrustStrip";
import StartWithThis from "@/components/site/StartWithThis";
import LearningRouteSelector from "@/components/site/LearningRouteSelector";
import CoursesPreview from "@/components/site/CoursesPreview";
import SubjectAreas from "@/components/site/SubjectAreas";
import HowSupportWorks from "@/components/site/HowSupportWorks";
import StudentSupportRecord from "@/components/site/StudentSupportRecord";
import ContactCTA from "@/components/site/ContactCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Statistics, Biostatistics and Data Science Learning",
  description:
    "My Academic Tutor provides structured courses, interactive learning resources and academic support in statistics, biostatistics, data science, programming and research methods.",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <StartWithThis />
      <LearningRouteSelector />
      <CoursesPreview />
      <SubjectAreas />
      <HowSupportWorks />
      <StudentSupportRecord />
      <ContactCTA />
    </main>
  );
}
