type BadgeProps = {
  children: React.ReactNode;
  variant?: "blue" | "green" | "violet" | "dark" | "light";
};

const styles = {
  blue: "bg-[#fff8f5] text-[#8b1116] ring-[#ead8d8]",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  violet: "bg-violet-50 text-violet-700 ring-violet-200",
  dark: "bg-[#111111] text-white ring-[#111111]",
  light: "bg-white text-neutral-700 ring-neutral-200",
};

export default function Badge({ children, variant = "blue" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${styles[variant]}`}
    >
      {children}
    </span>
  );
}