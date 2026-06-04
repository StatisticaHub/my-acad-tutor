import type { Metadata } from "next";
import CourseWaitlist from "@/components/site/CourseWaitlist";

export const metadata: Metadata = {
  title: "Courses | My Academic Tutor",
  description:
    "Structured and upcoming courses in statistics, biostatistics, epidemiology, regression analysis, survival analysis and machine learning in biostatistics.",
  alternates: {
    canonical: "https://www.myacademictutor.com/courses/",
  },
};

const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return "/";
  if (
    href.startsWith("#") ||
    href.startsWith("http") ||
    href.startsWith("mailto:")
  ) {
    return href;
  }

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${basePath}${cleanHref}${hasFileExtension ? "" : "/"}`;
}

const featuredCourse = {
  number: "01",
  title: "Statistics Foundation",
  status: "Releasing July 2026",
  level: "Beginner to intermediate",
  format: "Interactive format / Animation",
  summary:
    "A zero-coding course for statistical thinking, probability, inference, regression, uncertainty and worked examples.",
  points: ["Theory first", "No coding", "Interactive visuals", "Animated explanations"],
};

const upcomingCourses = [
  {
    number: "02",
    title: "Machine Learning in Biostatistics",
    area: "Machine learning",
    level: "Intermediate",
    summary:
      "A health-data course on prediction modelling, validation, calibration, clinical usefulness and responsible model interpretation.",
    points: ["Clinical prediction", "Validation", "Calibration", "Case studies"],
  },
  {
    number: "03",
    title: "Biostatistics Foundation",
    area: "Biostatistics",
    level: "Beginner",
    summary:
      "Learn the core ideas behind health data, study design, clinical interpretation, biomedical evidence and uncertainty.",
    points: ["Health data", "Study design", "Evidence", "Interpretation"],
  },
  {
    number: "04",
    title: "Epidemiology and Study Designs",
    area: "Epidemiology",
    level: "Beginner to intermediate",
    summary:
      "Understand cohort studies, case-control studies, cross-sectional studies, bias, confounding and population evidence.",
    points: ["Cohort studies", "Case-control", "Bias", "Confounding"],
  },
  {
    number: "05",
    title: "Regression Analysis",
    area: "Regression",
    level: "Beginner to intermediate",
    summary:
      "Learn linear regression, logistic regression, interpretation, assumptions, model checking and applied examples.",
    points: ["Linear regression", "Logistic regression", "Assumptions", "Interpretation"],
  },
  {
    number: "06",
    title: "Survival Analysis",
    area: "Survival analysis",
    level: "Intermediate",
    summary:
      "Explore time-to-event data, Kaplan-Meier curves, Cox models, hazards, censoring and clinical interpretation.",
    points: ["Kaplan-Meier", "Cox models", "Censoring", "Hazards"],
  },
  {
    number: "07",
    title: "Bioinformatics for Beginners",
    area: "Bioinformatics",
    level: "Beginner",
    summary:
      "A gentle introduction to biological data, omics thinking, workflows and interpretation for new learners.",
    points: ["Omics basics", "Workflows", "Data interpretation", "Biology"],
  },
];

const principles = [
  "Clear explanations",
  "Structured progression",
  "Interactive learning",
  "Responsible interpretation",
];

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/")}
          className="text-sm font-black text-[#8b1116] hover:text-[#5f0b0f]"
        >
          ← Back to homepage
        </a>

        <section className="mt-8 rounded-[2.5rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Courses
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-4xl font-black leading-[1.03] tracking-[-0.055em] md:text-7xl">
                Structured courses and upcoming learning routes.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                Start with the upcoming Statistics Foundation release, then join
                the waitlist for future courses in biostatistics, medical
                statistics, health data science, research methods, bioinformatics
                and machine learning in biostatistics.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#featured-course"
                  className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#8b1116]"
                >
                  View featured course →
                </a>

                <a
                  href="#upcoming-courses"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-black text-neutral-950 transition hover:bg-[#f7f4ee]"
                >
                  See upcoming courses →
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-neutral-500">
                Course design
              </p>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {principles.map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-bold text-neutral-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="featured-course"
          className="mt-8 scroll-mt-28 rounded-[2.5rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Featured course release
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Statistics Foundation is coming next.
              </h2>
            </div>

            <a
              href="#course-waitlist"
              className="inline-flex w-fit rounded-full bg-neutral-950 px-5 py-3 text-sm font-black text-white transition hover:bg-[#8b1116]"
            >
              Join waitlist →
            </a>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-md md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-[#111111] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white">
                  {featuredCourse.number}
                </span>

                <span className="rounded-full border border-[#8b1116]/20 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#8b1116]">
                  {featuredCourse.status}
                </span>
              </div>

              <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
                Statistics
              </p>

              <h3 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-4xl">
                {featuredCourse.title}
              </h3>

              <p className="mt-2 text-sm font-black text-neutral-500">
                {featuredCourse.level}
              </p>

              <p className="mt-2 text-sm font-black text-[#8b1116]">
                {featuredCourse.format}
              </p>

              <p className="mt-5 text-base leading-8 text-neutral-700">
                {featuredCourse.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {featuredCourse.points.map((point) => (
                  <span
                    key={point}
                    className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-neutral-600"
                  >
                    {point}
                  </span>
                ))}
              </div>

              <a
                href="#course-waitlist"
                className="mt-7 inline-flex items-center justify-center rounded-full bg-neutral-950 px-5 py-3 text-sm font-black text-white transition hover:bg-[#8b1116]"
              >
                Join waitlist →
              </a>
            </article>

            <article className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-neutral-950 p-6 text-white md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                Course experience
              </p>

              <h3 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-4xl">
                Interactive explanations, animated intuition and worked examples.
              </h3>

              <p className="mt-5 text-sm leading-7 text-white/70 md:text-base md:leading-8">
                The course is planned as a visual, beginner-friendly learning
                route. Students will learn concepts through explanations,
                diagrams, interactive activities, examples and quizzes before
                moving to more advanced interpretation.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Probability basics",
                  "Distributions",
                  "Confidence intervals",
                  "Hypothesis testing",
                  "Regression intuition",
                  "Interpretation",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-4 text-sm font-bold text-white/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section
          id="upcoming-courses"
          className="mt-8 scroll-mt-28 rounded-[2.5rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Upcoming courses
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Join the waitlist for future course releases.
              </h2>
            </div>

            <a
              href="#course-waitlist"
              className="inline-flex w-fit rounded-full bg-neutral-950 px-5 py-3 text-sm font-black text-white transition hover:bg-[#8b1116]"
            >
              Join waitlist →
            </a>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {upcomingCourses.map((course) => (
              <article
                key={course.title}
                className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-[#111111] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white">
                    {course.number}
                  </span>

                  <span className="rounded-full border border-[#8b1116]/20 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#8b1116]">
                    Coming soon
                  </span>
                </div>

                <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#8b1116]">
                  {course.area}
                </p>

                <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">
                  {course.title}
                </h3>

                <p className="mt-2 text-sm font-black text-neutral-500">
                  {course.level}
                </p>

                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  {course.summary}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {course.points.map((point) => (
                    <span
                      key={point}
                      className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[0.7rem] font-black uppercase tracking-[0.12em] text-neutral-600"
                    >
                      {point}
                    </span>
                  ))}
                </div>

                <a
                  href="#course-waitlist"
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-black text-neutral-950 transition hover:bg-neutral-950 hover:text-white"
                >
                  Join waitlist →
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2.5rem] border border-neutral-200 bg-[#111111] p-6 text-white shadow-sm md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/55">
                Need guidance?
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-[-0.045em] md:text-5xl">
                Book customised tutoring support.
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 md:text-base md:leading-8">
                Request help with concepts, methods, software, interpretation,
                course planning or research project support.
              </p>
            </div>

            <a
              href={`${withBasePath("/contact")}#support-form`}
              className="inline-flex rounded-full bg-white px-6 py-4 text-sm font-black text-[#111111] transition hover:bg-[#f7f4ee]"
            >
              Book Customised Tutoring →
            </a>
          </div>
        </section>
      </section>

      <CourseWaitlist />
    </main>
  );
}