type BadgeProps = {
  children: React.ReactNode;
  variant?: "blue" | "green" | "violet" | "dark" | "light";
};

const styles = {
  blue: "bg-blue-50 text-blue-700 ring-blue-200",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  violet: "bg-violet-50 text-violet-700 ring-violet-200",
  dark: "bg-slate-900 text-white ring-slate-900",
  light: "bg-white text-slate-700 ring-slate-200",
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