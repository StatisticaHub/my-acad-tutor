import Hero from "@/components/site/Hero";
import TrustStrip from "@/components/site/TrustStrip";
import CoursesPreview from "@/components/site/CoursesPreview";
import ContactCTA from "@/components/site/ContactCTA";
import StartWithThis from "@/components/site/StartWithThis";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <StartWithThis />
      <CoursesPreview />
      <ContactCTA />
    </main>
  );
}
