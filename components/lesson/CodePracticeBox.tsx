type CodePracticeBoxProps = {
  title: string;
  description: string;
  code: string;
  note?: string;
};

export default function CodePracticeBox({
  title,
  description,
  code,
  note,
}: CodePracticeBoxProps) {
  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-950 p-6 text-white">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
        Coding Practice
      </p>

      <h3 className="mt-3 text-2xl font-bold">{title}</h3>

      <p className="mt-4 text-sm leading-6 text-slate-300">{description}</p>

      <pre className="mt-6 overflow-x-auto rounded-2xl bg-black p-5 text-sm leading-7 text-slate-100">
        <code>{code}</code>
      </pre>

      {note && (
        <p className="mt-4 rounded-2xl bg-white/5 p-4 text-sm leading-6 text-slate-300">
          {note}
        </p>
      )}
    </div>
  );
}