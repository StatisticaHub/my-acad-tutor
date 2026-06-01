import Image from "next/image";

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href="/" className="flex items-center gap-3">
      <div
        className={`flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border ${
          dark ? "border-white/15 bg-white" : "border-neutral-200 bg-white"
        }`}
      >
        <Image
          src="/images/my-academic-tutor-logo.png"
          alt="My Academic Tutor logo"
          width={48}
          height={48}
          className="h-full w-full object-cover"
          priority
        />
      </div>

      <div>
        <p
          className={`text-xs font-black uppercase tracking-[0.2em] ${
            dark ? "text-white/55" : "text-neutral-500"
          }`}
        >
          My Academic Tutor
        </p>

        <p
          className={`text-base font-black tracking-tight ${
            dark ? "text-white" : "text-neutral-950"
          }`}
        >
          Quantitative Learning
        </p>
      </div>
    </a>
  );
}