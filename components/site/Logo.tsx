const basePath = "";

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <a href={`${basePath}/`} className="flex items-center gap-3">
      <div
        className={`flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border shadow-sm ${
          dark ? "border-white/15 bg-white" : "border-neutral-200 bg-white"
        }`}
      >
        <img
          src={`${basePath}/images/my-academic-tutor-logo.png`}
          alt="My Academic Tutor logo"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="leading-none">
        <p
          className={`text-xs font-semibold uppercase tracking-[0.18em] ${
            dark ? "text-white/65" : "text-neutral-500"
          }`}
        >
          My Academic Tutor
        </p>

        <p
          className={`mt-1 text-base font-semibold tracking-[-0.035em] ${
            dark ? "text-white" : "text-neutral-950"
          }`}
        >
          Quantitative Learning
        </p>
      </div>
    </a>
  );
}
