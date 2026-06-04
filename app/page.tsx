import TopFeatureMarquee from "@/components/site/TopFeatureMarquee";
import Hero from "@/components/site/Hero";
import CoursesPreview from "@/components/site/CoursesPreview";
import InteractiveDemosPreview from "@/components/site/InteractiveDemosPreview";
import ContactCTA from "@/components/site/ContactCTA";

export default function HomePage() {
  return (
    <main>
      <TopFeatureMarquee />
      <Hero />
      <CoursesPreview />
      <InteractiveDemosPreview />
      <ContactCTA />
    </main>
  );
}
