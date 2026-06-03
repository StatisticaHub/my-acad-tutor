const basePath = process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  return `${basePath}${cleanHref}/`;
}

const informationTypes = [
  "Name, email address or contact details you choose to share",
  "Subject area, academic level, course or module details",
  "Support request details, topic, method, software or deadline",
  "Messages sent by email or enquiry forms",
  "General website usage information if analytics are added later",
  "Payment or account information only if payment/login systems are added later",
];

const uses = [
  "Responding to enquiries",
  "Understanding support needs",
  "Arranging academic support or course guidance",
  "Improving website content and learning resources",
  "Keeping basic records of communication",
  "Maintaining academic integrity and support boundaries",
];

const notUsedFor = [
  "Selling student information",
  "Sharing personal information with advertisers",
  "Completing academic work on behalf of students",
  "Using confidential academic material without permission",
  "Publishing student messages publicly",
  "Collecting unnecessary sensitive information",
];

const principles = [
  {
    title: "Minimal information",
    text: "Only share the information needed to understand your enquiry or support request.",
  },
  {
    title: "Responsible handling",
    text: "Student details are used to respond to support needs and manage learning-related communication.",
  },
  {
    title: "No unnecessary sharing",
    text: "Personal information is not sold or shared for unrelated advertising purposes.",
  },
];

const studentAdvice = [
  "Do not send passwords, login details or university account access.",
  "Do not send confidential datasets unless support has been agreed and sharing is permitted.",
  "Do not send exam papers or restricted assessment material.",
  "Remove unnecessary personal identifiers from files where possible.",
  "Check your university or organisation rules before sharing academic material.",
  "Ask first if you are unsure whether a file or request is appropriate.",
];

export default function PrivacyPolicyPage() {
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
            Privacy policy
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl font-sans text-4xl font-black leading-[1.02] tracking-[-0.05em] md:text-6xl">
                Privacy and student information.
              </h1>

              <p className="mt-6 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                My Academic Tutor treats student information responsibly.
                Support requests, academic details and personal information are
                used only to understand and respond to learning or support
                needs.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-8 text-neutral-700 md:text-lg md:leading-8">
                This privacy page explains what information may be collected,
                how it may be used, what should not be shared and how to contact
                us about privacy-related questions.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#ead8d8] bg-[#f7f4ee] p-5">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#8b1116]">
                Contact for privacy
              </p>

              <h2 className="mt-4 font-sans text-2xl font-black tracking-[-0.04em]">
                Email privacy-related questions.
              </h2>

              <p className="mt-4 text-sm leading-7 text-neutral-700">
                For privacy-related questions, correction requests or concerns,
                email contact@myacademictutor.com.
              </p>

              <a
                href="mailto:contact@myacademictutor.com?subject=Privacy%20question"
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#8b1116] px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 sm:w-auto"
              >
                Email privacy question →
              </a>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Responsible", "Information handling"],
              ["Limited", "Purpose-based use"],
              ["Private", "Student enquiries"],
              ["Contact", "Privacy questions"],
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
          {principles.map((principle, index) => (
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
              Information you may share
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Details needed to respond to your enquiry.
            </h2>

            <p className="mt-5 text-base leading-8 text-neutral-700">
              When you contact My Academic Tutor, you may choose to share
              information that helps us understand your learning need or support
              request.
            </p>

            <div className="mt-6 grid gap-3">
              {informationTypes.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold leading-6 text-neutral-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
              How information may be used
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Used for learning and support purposes.
            </h2>

            <p className="mt-5 text-base leading-8 text-neutral-700">
              Information is used to communicate with you, understand the
              request and provide appropriate course or support guidance.
            </p>

            <div className="mt-6 grid gap-3">
              {uses.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold leading-6 text-neutral-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-neutral-200 bg-white p-6 text-[#111111] shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-neutral-700">
              Not used for
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Your information is not used for unrelated purposes.
            </h2>

            <p className="mt-5 text-base leading-8 text-neutral-700">
              My Academic Tutor does not sell student information or use student
              enquiries for unrelated advertising.
            </p>

            <div className="mt-6 grid gap-3">
              {notUsedFor.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold leading-6 text-neutral-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-[#ded9cf] bg-white p-6 text-[#111111] shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-neutral-700">
              What not to send
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Avoid sharing unnecessary or restricted information.
            </h2>

            <p className="mt-5 text-base leading-8 text-neutral-700">
              Only send what is needed to understand the learning or support
              request. Avoid sending private, restricted or unnecessary
              materials.
            </p>
          </article>
        </section>

        <section className="mt-8 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
            Student guidance
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <h2 className="font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
                Share information carefully.
              </h2>

              <p className="mt-5 text-base leading-8 text-neutral-700">
                Students should avoid sending information that is unnecessary,
                restricted, confidential or not permitted by their institution.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {studentAdvice.map((item) => (
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
              Future platform features
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Login, payments and dashboards may require updates.
            </h2>

            <p className="mt-5 text-base leading-8 text-neutral-700">
              If future features such as student accounts, course progress,
              certificates, payments, subscriptions or analytics are added, this
              privacy page should be reviewed and updated to explain those
              features clearly.
            </p>

            <p className="mt-4 text-base leading-8 text-neutral-700">
              Payment processing, authentication and analytics may involve
              third-party services. Those details should be added before such
              systems go live.
            </p>
          </article>

          <article className="rounded-[2rem] border border-[#ded9cf] bg-white p-6 text-[#111111] shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-neutral-700">
              Privacy contact
            </p>

            <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em] md:text-4xl">
              Ask about your information.
            </h2>

            <p className="mt-5 text-base leading-8 text-neutral-700">
              For privacy-related questions, correction requests or concerns,
              email contact@myacademictutor.com.
            </p>

            <a
              href="mailto:contact@myacademictutor.com?subject=Privacy%20question"
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#111111] transition hover:-translate-y-0.5 sm:w-auto"
            >
              Email privacy question →
            </a>
          </article>
        </section>
      </section>
    </main>
  );
}