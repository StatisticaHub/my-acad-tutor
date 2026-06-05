import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Notice",
  description:
    "Cookie and similar technology information for My Academic Tutor.",
  alternates: {
    canonical: "https://www.myacademictutor.com/cookies/",
  },
};

export default function CookieNoticePage() {
  return (
    <main className="min-h-screen bg-[#F7F3EA] px-5 py-10 text-[#141210] md:px-8 md:py-16">
      <section className="mx-auto max-w-5xl">
        <a href="/" className="text-sm font-semibold text-[#741018] hover:text-[#4d080e]">
          ← Back to homepage
        </a>

        <div className="mt-8 rounded-[2rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#741018]">
            Cookie Notice
          </p>

          <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-[-0.055em] md:text-6xl">
            Cookies and similar technologies.
          </h1>

          <p className="mt-6 text-base leading-8 text-[#525252]">
            My Academic Tutor aims to keep tracking minimal. This notice explains
            how cookies or similar technologies may be used on the website.
          </p>

          <p className="mt-4 text-sm font-bold text-[#741018]">
            Last updated: 5 June 2026
          </p>
        </div>

        <div className="mt-8 grid gap-4">
          <article className="rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm">
            <h2 className="text-xl font-black tracking-[-0.03em]">
              Essential technologies
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#525252]">
              Some technologies may be needed for basic site functionality, routing,
              security or form submission. These are used to make the website work.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm">
            <h2 className="text-xl font-black tracking-[-0.03em]">
              Analytics and marketing cookies
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#525252]">
              If analytics or marketing tools are added later, the website should ask
              for consent before setting non-essential cookies or similar technologies.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-[#E4DED2] bg-[#FFFCF6] p-6 shadow-sm">
            <h2 className="text-xl font-black tracking-[-0.03em]">
              Your choices
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#525252]">
              You can control cookies through your browser settings. If a cookie
              consent banner is added for non-essential cookies, you will be able to
              accept or reject those optional technologies.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
