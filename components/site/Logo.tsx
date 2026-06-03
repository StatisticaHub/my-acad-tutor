const basePath =
  process.env.NODE_ENV === "production" ? "/my-acad-tutor" : "";

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href={`${basePath}/`} className="flex items-center gap-3">
      <div
        className={`flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border ${
          dark ? "border-white/15 bg-white" : "border-neutral-200 bg-white"
        }`}
      >
        <img
          src={`${basePath}/images/my-academic-tutor-logo.png`}
          alt="My Academic Tutor logo"
          className="h-full w-full object-cover"
        />
      </div>

      <div>
        <p
          className={`text-xs font-black uppercase tracking-[0.2em] ${
            dark ? "text-white/80" : "text-neutral-500"
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