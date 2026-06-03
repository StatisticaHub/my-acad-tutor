const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}/`;
}

const certificatesCanShow = [
  "Course title",
  "Learner name, if provided",
  "Completion date",
  "Platform learning activity",
  "Course completion status",
  "Certificate or record ID, if implemented later",
];

const certificatesDoNotMean = [
  "A university degree",
  "A regulated academic qualification",
  "Government-recognised credit",
  "A professional licence",
  "Accreditation by a university or statutory body",
  "Proof of professional competency for regulated practice",
];

const policyPrinciples = [
  {
    title: "Completion record",
    text: "Certificates may confirm that a learner completed selected platform-based learning activities.",
  },
  {
    title: "Private learning platform",
    text: "Certificates are issued by My Academic Tutor as private course-completion records, not by a university.",
  },
  {
    title: "Clear limitation",
    text: "Certificates should not be represented as academic credit, a degree, a licence or formal professional accreditation.",
  },
];

const eligibleActivities = [
  "Completing required lessons",
  "Attempting quizzes or knowledge checks",
  "Completing interactive labs where required",
  "Following the course sequence",
  "Meeting any course-specific completion criteria",
  "Agreeing to certificate terms before issue",
];

export default function CertificatePolicyPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#111111] md:px-8 md:py-16">
      <section className="mx-auto max-w-7xl">
        <a
          href={withBasePath("/")}
          className="text-sm font-bold text-[#8b1116] hover:text-[#5f0b0f]"
        >
          ← Back to homepage
        </a>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Certificate policy
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl font-sans text-4xl font-black leading-[1.02] tracking-[-0.05em] md:text-6xl">
                Course completion certificates.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                My Academic Tutor may provide private course completion
                certificates for selected structured courses. These certificates
                confirm participation or completion of platform-based learning
                activities.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                Certificates are intended to recognise learning progress within
                the platform. They are not university degrees, regulated
                qualifications, academic credits or professional licences.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-5">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Important limitation
              </p>

              <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                Certificates are platform completion records only.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                My Academic Tutor does not award university degrees, statutory
                qualifications, regulated academic credits, government-recognised
                diplomas or professional licences.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Private", "Platform certificate"],
              ["Completion", "Learning record"],
              ["Not credit", "No university award"],
              ["Transparent", "Clear limitations"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-neutral-200 bg-[#f7f4ee] p-5"
              >
                <p className="font-sans text-2xl font-black tracking-[-0.04em] text-[#111111]">
                  {value}
                </p>
                <p className="mt-2 text-sm font-bold text-neutral-600">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {policyPrinciples.map((principle, index) => (
            <article
              key={principle.title}
              className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <p className="font-sans text-3xl font-black tracking-[-0.05em] text-[#8b1116]">
                {String(index + 1).padStart(2, "0")}
              </p>

              <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                {principle.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                {principle.text}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              A certificate may show
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Basic completion information.
            </h2>

            <p className="mt-5 text-base leading-8 text-neutral-700">
              If certificates are issued, they may include information that
              identifies the course and confirms that platform completion
              criteria were met.
            </p>

            <div className="mt-6 grid gap-3">
              {certificatesCanShow.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold leading-6 text-neutral-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-[#111111] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/80">
              A certificate does not mean
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Formal academic or professional accreditation.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/90">
              Certificates must not be misrepresented as formal academic credit,
              a regulated qualification or proof of professional authorisation.
            </p>

            <div className="mt-6 grid gap-3">
              {certificatesDoNotMean.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold leading-6 text-white/80"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Completion criteria
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <h2 className="font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
                Certificates may depend on course-specific requirements.
              </h2>

              <p className="mt-5 text-base leading-8 text-neutral-700">
                Different courses may have different completion requirements.
                Some may require lesson completion, quiz attempts, interactive
                activities or other learning checks.
              </p>

              <p className="mt-4 text-base leading-8 text-neutral-700">
                Certificate rules should be clearly displayed before any
                certificate is issued.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {eligibleActivities.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold leading-6 text-neutral-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Use of certificates
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Certificates should be described accurately.
            </h2>

            <p className="mt-5 text-base leading-8 text-neutral-700">
              Learners may describe a certificate as evidence of completing a
              private online learning activity from My Academic Tutor, where
              that statement is accurate.
            </p>

            <p className="mt-4 text-base leading-8 text-neutral-700">
              Learners should not describe the certificate as a university
              qualification, formal academic credit, government-recognised
              diploma or professional licence.
            </p>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-[#8b1116] p-6 text-white shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/85">
              Need clarification?
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Ask before using a certificate formally.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/75">
              If you need to use a certificate for a university, employer or
              professional purpose, check the receiving institution’s rules and
              ask for clarification before relying on it.
            </p>

            <a
              href={withBasePath("/contact")}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              Contact us →
            </a>
          </article>
        </section>
      </section>
    </main>
  );
}