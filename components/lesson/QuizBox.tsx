type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};

type QuizBoxProps = {
  title?: string;
  questions: QuizQuestion[];
};

export default function QuizBox({
  title = "Concept Check",
  questions,
}: QuizBoxProps) {
  return (
    <div className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
        Quiz
      </p>

      <h3 className="mt-3 text-2xl font-bold text-slate-950">{title}</h3>

      <div className="mt-6 space-y-6">
        {questions.map((item, index) => (
          <div key={item.question} className="rounded-2xl bg-[#FFFCF6] p-5 shadow-sm">
            <p className="font-semibold text-slate-950">
              {index + 1}. {item.question}
            </p>

            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {item.options.map((option) => (
                <li
                  key={option}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  {option}
                </li>
              ))}
            </ul>

            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-semibold text-emerald-700">
                Show answer
              </summary>
              <p className="mt-3 rounded-xl bg-emerald-100 p-4 text-sm leading-6 text-emerald-900">
                {item.answer}
              </p>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}