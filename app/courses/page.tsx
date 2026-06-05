import type { Metadata } from "next";
import CourseWaitlistInline from "./CourseWaitlistInline";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Structured courses and learning pathways in statistics, biostatistics, machine learning, epidemiology, regression, survival analysis and bioinformatics.",
};

const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return "/";
  if (href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${basePath}${cleanHref}${hasFileExtension ? "" : "/"}`;
}

const featuredCourses = [
  {
    number: "01",
    area: "Statistics",
    title: "Statistics Foundation",
    level: "Beginner to intermediate",
    status: "Lesson 1.1 open now",
    release: "Full course opens July 2026",
    href: "/courses/statistics-foundation/modules/introduction-to-statistical-thinking/lessons/what-is-statistics",
    hubHref: "/learning-hub/statistics",
    summary:
      "A zero-coding foundation course covering statistical thinking, descriptive statistics, probability, inference and regression foundations.",
    details: ["5 modules", "26 lessons", "Theory first", "Worked examples"],
  },
  {
    number: "02",
    area: "Medical machine learning",
    title: "Machine Learning in Biostatistics",
    level: "Intermediate",
    status: "Lesson 1.1 open now",
    release: "Full course opens July 2026",
    href: "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics",
    hubHref: "/learning-hub/data-science",
    summary:
      "A clinical prediction pathway covering biostatistical ML workflow, validation, calibration, model interpretation and responsible use.",
    details: ["Clinical prediction", "Validation", "Calibration", "Case studies"],
  },
];

const upcomingCourses = [
  {
    number: "03",
    area: "Biostatistics",
    title: "Biostatistics Foundation",
    level: "Beginner",
    status: "From September 2026",
    href: "/learning-hub/biostatistics",
    summary:
      "Health data, study design, biomedical evidence, uncertainty and clinical interpretation.",
  },
  {
    number: "04",
    area: "Epidemiology",
    title: "Epidemiology and Study Designs",
    level: "Beginner to intermediate",
    status: "From September 2026",
    href: "/learning-hub/research-methods",
    summary:
      "Cohort studies, case-control studies, cross-sectional designs, bias, confounding and population evidence.",
  },
  {
    number: "05",
    area: "Regression",
    title: "Regression Analysis",
    level: "Beginner to intermediate",
    status: "From September 2026",
    href: "/learning-hub/statistics",
    summary:
      "Linear regression, logistic regression, assumptions, model checking, interpretation and reporting.",
  },
  {
    number: "06",
    area: "Survival analysis",
    title: "Survival Analysis",
    level: "Intermediate",
    status: "From September 2026",
    href: "/learning-hub/biostatistics",
    summary:
      "Time-to-event data, Kaplan-Meier curves, Cox models, censoring, hazards and clinical interpretation.",
  },
  {
    number: "07",
    area: "Bioinformatics",
    title: "Bioinformatics for Beginners",
    level: "Beginner",
    status: "From September 2026",
    href: "/learning-hub/bioinformatics",
    summary:
      "Biological data, omics thinking, workflows, statistical reasoning and biological interpretation.",
  },
];

const roadmap = [
  {
    label: "Open now",
    title: "Start with two free sample lessons",
    body: "Statistics Foundation Lesson 1.1 and Machine Learning in Biostatistics Lesson 1.1 are available now.",
  },
  {
    label: "July 2026",
    title: "Main course release",
    body: "The remaining Statistics Foundation and Machine Learning in Biostatistics lessons open in July 2026.",
  },
  {
    label: "From September 2026",
    title: "Specialist routes",
    body: "Biostatistics, epidemiology, regression, survival analysis and bioinformatics routes release gradually.",
  },
];

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EA] text-[#141210]">
      <section className="px-5 py-10 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <a
            href={withBasePath("/")}
            className="text-sm font-bold text-[#741018] hover:text-[#4d080e]"
          >
            ← Back to homepage
          </a>

          <section className="mt-8 overflow-hidden rounded-[2rem] border border-[#E4DED2] bg-[#141210] text-white shadow-sm">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-6 md:p-10 lg:p-12">
                <p className="text-sm font-black uppercase tracking-[0.24em] text-white/65">
                  Courses
                </p>

                <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.06em] md:text-6xl">
                  Structured course routes for quantitative learning.
                </h1>

                <p className="mt-6 max-w-3xl text-base leading-8 text-white/75 md:text-lg md:leading-9">
                  Start with open sample lessons, follow subject pathways, and join
                  the waitlist for July 2026 course releases.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#featured"
                    className="rounded-full bg-white px-5 py-3 text-sm font-black text-[#141210] transition hover:bg-[#F7F3EA]"
                  >
                    View featured courses
                  </a>
                  <a
                    href={withBasePath("/learning-hub")}
                    className="rounded-full border border-white/20 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10"
                  >
                    Open Learning Hub
                  </a>
                  <a
                    href="#waitlist"
                    className="rounded-full border border-white/20 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10"
                  >
                    Join waitlist
                  </a>
                </div>
              </div>

              <div className="border-t border-white/10 bg-white/[0.04] p-6 md:p-10 lg:border-l lg:border-t-0">
                <div className="grid gap-4">
                  {roadmap.map((item) => (
                    <article
                      key={item.label}
                      className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5"
                    >
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-white/55">
                        {item.label}
                      </p>
                      <h2 className="mt-3 text-xl font-black tracking-[-0.035em]">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-sm leading-7 text-white/70">
                        {item.body}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            id="featured"
            className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8"
          >
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                  Featured courses
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
                  Two learning routes have open sample lessons.
                </h2>
              </div>

              <p className="text-sm leading-7 text-[#525252] md:text-base md:leading-8">
                These are the main course releases for July 2026. Each course starts
                with one open lesson so learners can preview the teaching style before
                joining the waitlist.
              </p>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {featuredCourses.map((course) => (
                <article
                  key={course.title}
                  className="rounded-[1.75rem] border border-[#E4DED2] bg-[#F7F3EA] p-5 md:p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-black text-[#9B948A]">
                        {course.number}
                      </p>
                      <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-[#741018]">
                        {course.area}
                      </p>
                    </div>

                    <div className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#741018]">
                      {course.status}
                    </div>
                  </div>

                  <h3 className="mt-5 text-2xl font-black tracking-[-0.045em] md:text-3xl">
                    {course.title}
                  </h3>

                  <p className="mt-2 text-sm font-black text-[#141210]">
                    {course.level}
                  </p>

                  <p className="mt-4 text-sm leading-7 text-[#525252]">
                    {course.summary}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {course.details.map((detail) => (
                      <span
                        key={detail}
                        className="rounded-full border border-[#D8CDBB] bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#6B6258]"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>

                  <p className="mt-5 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#741018]">
                    {course.release}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={withBasePath(course.href)}
                      className="rounded-full bg-[#141210] px-5 py-3 text-sm font-black text-white transition hover:bg-[#741018]"
                    >
                      Open Lesson 1.1
                    </a>
                    <a
                      href={withBasePath(course.hubHref)}
                      className="rounded-full border border-[#D8CDBB] bg-white px-5 py-3 text-sm font-black text-[#141210] transition hover:bg-[#FFFCF6]"
                    >
                      View pathway
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-start">
            <div className="rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
                Upcoming specialist courses
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-[-0.045em] md:text-4xl">
                Specialist routes release after the main July launch.
              </h2>

              <div className="mt-6 grid gap-4">
                {upcomingCourses.map((course) => (
                  <a
                    key={course.title}
                    href={withBasePath(course.href)}
                    className="grid gap-4 rounded-[1.5rem] border border-[#E4DED2] bg-[#F7F3EA] p-5 transition hover:-translate-y-1 hover:bg-[#FFFCF6] hover:shadow-md md:grid-cols-[0.2fr_1fr_auto] md:items-start"
                  >
                    <p className="text-sm font-black text-[#9B948A]">
                      {course.number}
                    </p>

                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#741018]">
                        {course.area}
                      </p>
                      <h3 className="mt-2 text-xl font-black tracking-[-0.035em]">
                        {course.title}
                      </h3>
                      <p className="mt-1 text-sm font-bold text-[#141210]">
                        {course.level}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[#525252]">
                        {course.summary}
                      </p>
                    </div>

                    <p className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#741018]">
                      {course.status}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            <aside id="waitlist" className="lg:sticky lg:top-24">
              <CourseWaitlistInline />

              <div className="mt-5 rounded-[1.75rem] border border-[#E4DED2] bg-[#141210] p-5 text-white shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-white/60">
                  Need guidance?
                </p>
                <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">
                  Not sure which route fits?
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/75">
                  Submit an enquiry with your subject, level and topic. The request
                  can be reviewed and directed to a suitable pathway, resource or support option.
                </p>
                <a
                  href={`${withBasePath("/contact")}#support-form`}
                  className="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-black text-[#141210] transition hover:bg-[#F7F3EA]"
                >
                  Request academic support
                </a>
              </div>
            </aside>
          </section>
        </div>
      </section>
    </main>
  );
}
