import Badge from "@/components/ui/Badge";
import LessonSection from "@/components/lesson/LessonSection";
import QuizBox from "@/components/lesson/QuizBox";
import CodePracticeBox from "@/components/lesson/CodePracticeBox";

const quizQuestions = [
  {
    question: "What is a random variable?",
    options: [
      "A variable that changes without any rule",
      "A function that assigns numerical values to outcomes of a random experiment",
      "A fixed number chosen by the researcher",
      "A data table containing observations",
    ],
    answer:
      "A random variable is a function that assigns numerical values to outcomes of a random experiment.",
  },
  {
    question: "Which of the following is a discrete random variable?",
    options: [
      "Height of a student",
      "Time taken to complete an exam",
      "Number of patients visiting a clinic in a day",
      "Blood pressure measured continuously",
    ],
    answer:
      "The number of patients visiting a clinic in a day is discrete because it takes countable values such as 0, 1, 2, 3 and so on.",
  },
  {
    question: "What does E(X) represent?",
    options: [
      "The largest possible value of X",
      "The smallest possible value of X",
      "The long-run average or expected value of X",
      "The probability that X is zero",
    ],
    answer:
      "E(X) represents the expected value of X. It is the long-run average value we would expect if the random process were repeated many times.",
  },
];

export default function WhatIsRandomVariableLessonPage() {
  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="bg-slate-950 px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-3">
            <Badge variant="blue">Statistics Foundation</Badge>
            <Badge variant="green">Free Lesson</Badge>
            <Badge variant="violet">Random Variables</Badge>
          </div>

          <h1 className="mt-6 max-w-5xl text-5xl font-bold tracking-tight md:text-7xl">
            What is a random variable?
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300">
            In this lesson, you will learn how statisticians turn uncertain
            real-world outcomes into mathematical objects that can be analysed,
            summarised and interpreted.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/courses/statistics-foundation"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Back to course
            </a>
            <a
              href="/pathways/statistics"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              View statistics pathway
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-6 py-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">Lesson Type</p>
            <p className="mt-2 text-lg font-bold text-slate-950">
              Lecture + Notes
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">Level</p>
            <p className="mt-2 text-lg font-bold text-slate-950">Beginner</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">Coding</p>
            <p className="mt-2 text-lg font-bold text-slate-950">Optional</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">Quiz</p>
            <p className="mt-2 text-lg font-bold text-slate-950">Included</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Lesson Menu
            </p>

            <nav className="mt-5 space-y-3 text-sm font-medium text-slate-700">
              <a href="#lecture" className="block hover:text-blue-600">
                Lecture
              </a>
              <a href="#notes" className="block hover:text-blue-600">
                Detailed Notes
              </a>
              <a href="#worked-example" className="block hover:text-blue-600">
                Worked Example
              </a>
              <a href="#interactive" className="block hover:text-blue-600">
                Interactive Idea
              </a>
              <a href="#coding" className="block hover:text-blue-600">
                Coding Practice
              </a>
              <a href="#quiz" className="block hover:text-blue-600">
                Quiz
              </a>
            </nav>
          </aside>

          <div className="space-y-8">
            <div id="lecture">
              <LessonSection eyebrow="Lecture" title="A conversational introduction">
                <p>
                  <strong>Mr. R:</strong> Today we are going to learn one of the
                  most important ideas in probability and statistics: the random
                  variable.
                </p>

                <p>
                  <strong>Emily:</strong> I have heard the term before, but it
                  sounds confusing. Is it just a variable that behaves randomly?
                </p>

                <p>
                  <strong>Mr. R:</strong> That is a common first impression, but
                  a random variable is more precise than that. A random variable
                  is a rule that assigns a number to each possible outcome of a
                  random experiment.
                </p>

                <p>
                  <strong>James:</strong> So the randomness comes from the
                  outcome, and the variable turns that outcome into a number?
                </p>

                <p>
                  <strong>Mr. R:</strong> Exactly. Suppose we toss two coins. The
                  possible outcomes are HH, HT, TH and TT. If we define X as the
                  number of heads, then X assigns numbers to those outcomes.
                </p>

                <div className="rounded-2xl bg-slate-50 p-5 text-slate-800">
                  <p>HH → X = 2</p>
                  <p>HT → X = 1</p>
                  <p>TH → X = 1</p>
                  <p>TT → X = 0</p>
                </div>

                <p>
                  <strong>Sophie:</strong> So X is not the coin toss itself. It
                  is the number we get after applying a rule to the coin toss.
                </p>

                <p>
                  <strong>Mr. R:</strong> Perfect. That is the key idea.
                </p>
              </LessonSection>
            </div>

            <div id="notes">
              <LessonSection eyebrow="Detailed Notes" title="Definition and notation">
                <p>
                  A random variable is a function that maps outcomes from a
                  sample space to real numbers. If the sample space is denoted by
                  Ω, then a random variable X can be written as:
                </p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  X : Ω → ℝ
                </div>

                <p>
                  This means that every possible outcome ω in the sample space Ω
                  is assigned a real number X(ω).
                </p>

                <p>
                  Random variables allow us to use mathematical tools to study
                  uncertainty. Instead of working directly with outcomes such as
                  “head-tail” or “patient survived”, we can work with numerical
                  values such as 1, 0, or measured quantities.
                </p>

                <h3 className="pt-4 text-2xl font-bold text-slate-950">
                  Discrete random variables
                </h3>

                <p>
                  A discrete random variable takes countable values. These values
                  may be finite or countably infinite.
                </p>

                <div className="rounded-2xl bg-slate-50 p-5">
                  Examples:
                  <ul className="mt-3 list-inside list-disc space-y-2">
                    <li>Number of heads in three coin tosses</li>
                    <li>Number of patients admitted to a ward in a day</li>
                    <li>Number of defective items in a batch</li>
                    <li>Number of correct answers in a quiz</li>
                  </ul>
                </div>

                <p>
                  For a discrete random variable, probabilities are assigned to
                  individual values:
                </p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  P(X = x)
                </div>

                <h3 className="pt-4 text-2xl font-bold text-slate-950">
                  Continuous random variables
                </h3>

                <p>
                  A continuous random variable can take values over an interval
                  or continuum. In this case, probabilities are not usually
                  assigned to exact single values. Instead, we calculate
                  probabilities over intervals.
                </p>

                <div className="rounded-2xl bg-slate-50 p-5">
                  Examples:
                  <ul className="mt-3 list-inside list-disc space-y-2">
                    <li>Height</li>
                    <li>Weight</li>
                    <li>Blood pressure</li>
                    <li>Time until recovery</li>
                    <li>Reaction time</li>
                  </ul>
                </div>

                <p>
                  For continuous variables, we often write probabilities such as:
                </p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  P(a ≤ X ≤ b)
                </div>
              </LessonSection>
            </div>

            <div id="worked-example">
              <LessonSection eyebrow="Worked Example" title="Two coin tosses">
                <p>
                  Suppose two fair coins are tossed. The sample space is:
                </p>

                <div className="rounded-2xl bg-slate-50 p-5 font-semibold">
                  Ω = &#123;HH, HT, TH, TT&#125;
                </div>

                <p>
                  Define X as the number of heads. Then:
                </p>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full border-collapse bg-white text-left text-sm">
                    <thead className="bg-slate-100 text-slate-950">
                      <tr>
                        <th className="px-4 py-3">Outcome</th>
                        <th className="px-4 py-3">Value of X</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-700">
                      <tr className="border-t border-slate-200">
                        <td className="px-4 py-3">HH</td>
                        <td className="px-4 py-3">2</td>
                      </tr>
                      <tr className="border-t border-slate-200">
                        <td className="px-4 py-3">HT</td>
                        <td className="px-4 py-3">1</td>
                      </tr>
                      <tr className="border-t border-slate-200">
                        <td className="px-4 py-3">TH</td>
                        <td className="px-4 py-3">1</td>
                      </tr>
                      <tr className="border-t border-slate-200">
                        <td className="px-4 py-3">TT</td>
                        <td className="px-4 py-3">0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p>
                  Therefore, the possible values of X are 0, 1 and 2.
                </p>

                <p>
                  Since all four outcomes are equally likely:
                </p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  P(X = 0) = 1/4, P(X = 1) = 2/4, P(X = 2) = 1/4
                </div>

                <p>
                  The expected value is:
                </p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  E(X) = 0(1/4) + 1(2/4) + 2(1/4) = 1
                </div>

                <p>
                  Interpretation: if we repeated the two-coin experiment many
                  times, the average number of heads would be close to 1.
                </p>
              </LessonSection>
            </div>

            <div id="interactive">
              <LessonSection eyebrow="Interactive Component" title="How this will become interactive">
                <p>
                  In the full platform, this lesson can include an interactive
                  coin-toss simulator. Students will choose the number of tosses,
                  run repeated simulations and see how the empirical distribution
                  of X approaches the theoretical distribution.
                </p>

                <div className="rounded-[2rem] bg-slate-950 p-6 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                    Demo idea
                  </p>

                  <h3 className="mt-3 text-2xl font-bold">
                    Coin Toss Random Variable Simulator
                  </h3>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl bg-white/5 p-4">
                      Choose number of repetitions
                    </div>
                    <div className="rounded-2xl bg-white/5 p-4">
                      Count heads each time
                    </div>
                    <div className="rounded-2xl bg-white/5 p-4">
                      Compare empirical and theoretical probabilities
                    </div>
                  </div>
                </div>
              </LessonSection>
            </div>

            <div id="coding">
              <CodePracticeBox
                title="Optional simulation idea"
                description="This coding practice is optional. Later, this can become an in-browser Python or R exercise. For now, it shows how a student might simulate the random variable."
                code={`# Python example: simulate number of heads in two coin tosses

import random

def toss_two_coins():
    coins = [random.choice(["H", "T"]) for _ in range(2)]
    return coins.count("H")

results = [toss_two_coins() for _ in range(1000)]

print("Average number of heads:", sum(results) / len(results))
print("Possible values:", sorted(set(results)))`}
                note="In the full platform, students will run code directly in the browser using a safe coding lab."
              />
            </div>

            <div id="quiz">
              <QuizBox
                title="Check your understanding"
                questions={quizQuestions}
              />
            </div>

            <section className="rounded-[2rem] bg-blue-600 p-8 text-white">
              <h2 className="text-3xl font-bold tracking-tight">
                Lesson complete.
              </h2>

              <p className="mt-4 max-w-2xl text-blue-50">
                Next, you should study expected value and variance so that you
                can describe the centre and spread of a random variable.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/courses/statistics-foundation"
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700"
                >
                  Back to course
                </a>

                <a
                  href="/learning-hub"
                  className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white"
                >
                  Learning Hub
                </a>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}