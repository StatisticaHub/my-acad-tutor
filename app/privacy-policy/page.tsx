const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return "/";
  if (href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")) return href;

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${basePath}${cleanHref}${hasFileExtension ? "" : "/"}`;
}

const collected = [
  "Name and email",
  "Academic level",
  "Subject or topic",
  "Support request details",
  "Messages sent through forms or email",
];

const usedFor = [
  "Responding to enquiries",
  "Understanding support needs",
  "Arranging guidance",
  "Maintaining communication records",
];

const notUsedFor = [
  "Selling student information",
  "Sharing with advertisers",
  "Completing academic work",
  "Publishing messages publicly",
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EA] px-5 py-10 text-[#141210] md:px-8 md:py-20">
      <section className="mx-auto max-w-7xl">
        <a href={withBasePath("/")} className="text-sm font-semibold text-[#741018] hover:text-[#4d080e]">
          ← Back to homepage
        </a>

        <section className="mt-8 rounded-[2.5rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10 lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#741018]">
            Privacy policy
          </p>

          <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-[1.03] tracking-[-0.055em] md:text-7xl">
            Privacy and student information.
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-[#525252] md:text-lg md:leading-9">
            My Academic Tutor uses information you choose to share only to understand and respond to learning or support requests.
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <PolicyCard title="Information you may share" items={collected} />
          <PolicyCard title="How it may be used" items={usedFor} />
          <PolicyCard title="Not used for" items={notUsedFor} dark />
        </section>

        <section className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-8">
          <h2 className="text-3xl font-semibold tracking-[-0.045em]">
            Contact about privacy.
          </h2>

          <p className="mt-4 max-w-4xl text-base leading-8 text-[#525252]">
            For privacy questions, correction requests or concerns, email contact@myacademictutor.com.
          </p>

          <a href="mailto:contact@myacademictutor.com?subject=Privacy%20question" className="mt-6 inline-flex rounded-full bg-[#11100E] px-6 py-4 text-sm font-semibold text-white">
            Email privacy question →
          </a>
        </section>
      </section>
    </main>
  );
}

function PolicyCard({
  title,
  items,
  dark = false,
}: {
  title: string;
  items: string[];
  dark?: boolean;
}) {
  return (
    <article className={`rounded-[2rem] border p-6 shadow-sm md:p-8 ${dark ? "border-neutral-900 bg-[#11100E] text-white" : "border-[#E4DED2] bg-[#FFFCF6] text-[#141210]"}`}>
      <p className={`text-sm font-semibold uppercase tracking-[0.22em] ${dark ? "text-white/70" : "text-[#741018]"}`}>
        {title}
      </p>

      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <div key={item} className={`rounded-2xl px-4 py-3 text-sm font-semibold ${dark ? "border border-white/10 bg-[#FFFCF6]/5 text-white/85" : "border border-[#E4DED2] bg-[#F7F3EA] text-neutral-800"}`}>
            {item}
          </div>
        ))}
      </div>
    </article>
  );
}
