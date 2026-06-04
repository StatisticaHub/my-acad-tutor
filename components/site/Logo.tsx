const basePath = "";

function withBasePath(src: string) {
  if (src.startsWith("http")) return src;
  return `${basePath}${src}`;
}

export default function Logo() {
  return (
    <a
      href="/"
      className="group inline-flex items-center gap-3"
      aria-label="My Academic Tutor home"
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm md:h-12 md:w-12">
        <img
          src={withBasePath("/images/my-academic-tutor-logo.png")}
          alt=""
          className="h-full w-full object-cover"
        />
      </span>

      <span className="leading-none">
        <span className="block text-[0.8rem] font-black uppercase tracking-[0.24em] text-neutral-500 md:text-[0.72rem]">
          My Academic
        </span>
        <span className="mt-1 block text-[0.95rem] font-black uppercase tracking-[0.18em] text-neutral-950 md:text-[0.85rem]">
          Tutor
        </span>
      </span>
    </a>
  );
}