import Hero from "@/components/site/Hero";
import TrustStrip from "@/components/site/TrustStrip";
import LearningRouteSelector from "@/components/site/LearningRouteSelector";
import CoursesPreview from "@/components/site/CoursesPreview";
import SubjectAreas from "@/components/site/SubjectAreas";
import HowSupportWorks from "@/components/site/HowSupportWorks";
import StudentSupportRecord from "@/components/site/StudentSupportRecord";
import ContactCTA from "@/components/site/ContactCTA";
import StartWithThis from "@/components/site/StartWithThis";

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