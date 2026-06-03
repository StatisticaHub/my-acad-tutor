import Hero from "@/components/site/Hero";
import TrustStrip from "@/components/site/TrustStrip";
import StartWithThis from "@/components/site/StartWithThis";
import InteractiveDemosPreview from "@/components/site/InteractiveDemosPreview";
import CoursesPreview from "@/components/site/CoursesPreview";
import ContactCTA from "@/components/site/ContactCTA";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <StartWithThis />
      <InteractiveDemosPreview />
      <CoursesPreview />
      <ContactCTA />
    </main>
  );
}
