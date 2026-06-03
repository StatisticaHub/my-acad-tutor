import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <h2 className="text-lg font-bold text-[#111111]">My Academic Tutor</h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-neutral-700">
            Premium academic support and interactive learning for Statistics,
            Biostatistics, Programming, Data Science, Bioinformatics and research methods.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#111111]">Platform</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-neutral-700">
            <Link href="/learning-hub">Learning Hub</Link>
            <Link href="/courses">Courses</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/pricing">Pricing</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#111111]">Support</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-neutral-700">
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/academic-integrity">Academic Integrity</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200 px-6 py-6 text-center text-sm text-neutral-700">
        © 2026 My Academic Tutor. Built for responsible academic learning.
      </div>
    </footer>
  );
}