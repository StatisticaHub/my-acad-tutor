import Badge from "@/components/ui/Badge";
import LessonSection from "@/components/lesson/LessonSection";
import QuizBox from "@/components/lesson/QuizBox";
import CodePracticeBox from "@/components/lesson/CodePracticeBox";

const quizQuestions = [
  {
    question: "What is the best definition of a random variable?",
    options: [
      "A variable that changes without any rule",
      "A function that assigns a numerical value to each outcome of a random experiment",
      "A number that is always unknown",
      "A list of data values collected from a sample",
    ],
    answer:
      "A random variable is a function that assigns a numerical value to each outcome of a random experiment. The randomness comes from the experiment; the random variable gives a numerical description of the outcome.",
  },
  {
    question: "Which of the following is a discrete random variable?",
    options: [
      "The height of a student",
      "The time taken to complete an exam",
      "The number of patients arriving at a clinic in one day",
      "The exact temperature of a room",
    ],
    answer:
      "The number of patients arriving at a clinic in one day is discrete because it is a count. It can take values such as 0, 1, 2, 3 and so on.",
  },
  {
    question: "Why do statisticians use random variables?",
    options: [
      "To remove uncertainty from data",
      "To turn uncertain outcomes into numerical objects that can be analysed",
      "To guarantee that all outcomes are equally likely",
      "To avoid using probability",
    ],
    answer:
      "Random variables allow statisticians to turn uncertain outcomes into numerical objects. Once outcomes are numerical, we can calculate probabilities, expectations, variances and build statistical models.",
  },
  {
    question: "What does E(X) represent?",
    options: [
      "The largest possible value of X",
      "The probability that X is equal to zero",
      "The long-run average value of X",
      "The number of possible outcomes",
    ],
    answer:
      "E(X) is the expected value of X. It represents the long-run average value we would expect if the random experiment were repeated many times.",
  },
];

export default function RandomVariableLessonPage() {
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
            A random variable is one of the first major bridges between real-world
            uncertainty and mathematical statistics. In this lesson, you will
            learn how uncertain outcomes become numbers that can be analysed,
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
            <p className="text-sm font-semibold text-slate-500">Module</p>
            <p className="mt-2 text-lg font-bold text-slate-950">
              Random Variables
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">Level</p>
            <p className="mt-2 text-lg font-bold text-slate-950">Beginner</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">Format</p>
            <p className="mt-2 text-lg font-bold text-slate-950">
              Lecture + Notes
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">Quiz</p>
            <p className="mt-2 text-lg font-bold text-slate-950">Included</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Lesson Menu
            </p>

            <nav className="mt-5 space-y-3 text-sm font-medium text-slate-700">
              <a href="#objectives" className="block hover:text-blue-600">
                Learning Objectives
              </a>
              <a href="#lecture" className="block hover:text-blue-600">
                Lecture
              </a>
              <a href="#notes" className="block hover:text-blue-600">
                Detailed Notes
              </a>
              <a href="#worked-example" className="block hover:text-blue-600">
                Worked Example
              </a>
              <a href="#misconceptions" className="block hover:text-blue-600">
                Common Misconceptions
              </a>
              <a href="#interactive" className="block hover:text-blue-600">
                Interactive Preview
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
            <div id="objectives">
              <LessonSection eyebrow="Start here" title="Learning objectives">
                <p>By the end of this lesson, you should be able to:</p>

                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    "Explain what a random variable is in plain language.",
                    "Distinguish between an outcome and a random variable.",
                    "Identify discrete and continuous random variables.",
                    "Write simple probability statements such as P(X = x).",
                    "Interpret expected value as a long-run average.",
                    "Understand why random variables are central to statistical modelling.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
                  <p className="font-semibold text-blue-800">Big idea</p>
                  <p className="mt-2 text-blue-900">
                    A random variable is not the uncertain outcome itself. It is
                    a numerical rule applied to the outcome.
                  </p>
                </div>
              </LessonSection>
            </div>

            <div id="lecture">
              <LessonSection
                eyebrow="Lecture"
                title="A conversational introduction"
              >
                <p>
                  <strong>Mr. R:</strong> Today we are going to learn one of the
                  most important ideas in probability and statistics: the random
                  variable.
                </p>

                <p>
                  <strong>Emily:</strong> I have heard this term before, but it
                  sounds strange. Is it just a variable that randomly changes?
                </p>

                <p>
                  <strong>Mr. R:</strong> That is a very natural first thought,
                  but it is not quite right. A random variable is not simply a
                  variable behaving randomly. It is a rule that assigns a number
                  to each possible outcome of a random experiment.
                </p>

                <p>
                  <strong>James:</strong> So first there is a random experiment,
                  and then the random variable gives a number based on what
                  happened?
                </p>

                <p>
                  <strong>Mr. R:</strong> Exactly. Imagine tossing two coins. The
                  raw outcomes are things like HH, HT, TH and TT. These outcomes
                  are not numbers by themselves. But if we define X as the number
                  of heads, then each outcome gets converted into a number.
                </p>

                <div className="rounded-2xl bg-slate-50 p-5 text-slate-800">
                  <p>HH → X = 2</p>
                  <p>HT → X = 1</p>
                  <p>TH → X = 1</p>
                  <p>TT → X = 0</p>
                </div>

                <p>
                  <strong>Sophie:</strong> So X is not the coin toss. X is the
                  number we get after applying our rule to the coin toss.
                </p>

                <p>
                  <strong>Mr. R:</strong> Perfect. That distinction is extremely
                  important. The sample space contains the original outcomes. The
                  random variable converts those outcomes into values that we can
                  analyse mathematically.
                </p>

                <p>
                  <strong>Oliver:</strong> Why do we need to convert outcomes
                  into numbers?
                </p>

                <p>
                  <strong>Mr. R:</strong> Because statistics works with
                  numerical summaries. Once outcomes become numbers, we can
                  calculate probabilities, averages, variances, distributions and
                  eventually build statistical models.
                </p>

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <p className="font-semibold text-emerald-800">
                    Lecture takeaway
                  </p>
                  <p className="mt-2 text-emerald-900">
                    Random variables allow us to translate uncertainty into a
                    mathematical language.
                  </p>
                </div>
              </LessonSection>
            </div>

            <div id="notes">
              <LessonSection
                eyebrow="Detailed Notes"
                title="Definition, notation and interpretation"
              >
                <p>
                  A random variable is a function that maps outcomes from a
                  sample space to real numbers. If the sample space is denoted by
                  Ω, then a random variable X can be written as:
                </p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  X : Ω → ℝ
                </div>

                <p>
                  This notation says that every possible outcome ω in the sample
                  space Ω is assigned a real number X(ω).
                </p>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="font-semibold text-slate-950">
                    Interpretation of the notation
                  </p>
                  <ul className="mt-3 list-inside list-disc space-y-2">
                    <li>Ω is the set of all possible outcomes.</li>
                    <li>ω is one particular outcome from Ω.</li>
                    <li>X is the random variable.</li>
                    <li>X(ω) is the numerical value assigned to outcome ω.</li>
                    <li>ℝ is the set of real numbers.</li>
                  </ul>
                </div>

                <h3 className="pt-4 text-2xl font-bold text-slate-950">
                  Outcomes versus random variables
                </h3>

                <p>
                  A common mistake is to confuse an outcome with a random
                  variable. The outcome is what actually happens. The random
                  variable is the numerical rule we apply to what happens.
                </p>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full border-collapse bg-white text-left text-sm">
                    <thead className="bg-slate-100 text-slate-950">
                      <tr>
                        <th className="px-4 py-3">Situation</th>
                        <th className="px-4 py-3">Outcome</th>
                        <th className="px-4 py-3">Possible random variable</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-700">
                      <tr className="border-t border-slate-200">
                        <td className="px-4 py-3">Two coin tosses</td>
                        <td className="px-4 py-3">HH, HT, TH, TT</td>
                        <td className="px-4 py-3">Number of heads</td>
                      </tr>
                      <tr className="border-t border-slate-200">
                        <td className="px-4 py-3">Clinic attendance</td>
                        <td className="px-4 py-3">Daily arrivals</td>
                        <td className="px-4 py-3">Number of patients</td>
                      </tr>
                      <tr className="border-t border-slate-200">
                        <td className="px-4 py-3">Exam performance</td>
                        <td className="px-4 py-3">Student responses</td>
                        <td className="px-4 py-3">Total score</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="pt-4 text-2xl font-bold text-slate-950">
                  Discrete random variables
                </h3>

                <p>
                  A discrete random variable takes countable values. These values
                  may be finite or countably infinite.
                </p>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="font-semibold text-slate-950">Examples:</p>
                  <ul className="mt-3 list-inside list-disc space-y-2">
                    <li>Number of heads in three coin tosses</li>
                    <li>Number of patients admitted to a ward in one day</li>
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
                  A continuous random variable can take values over an interval.
                  Examples include height, weight, blood pressure, temperature
                  and time until recovery.
                </p>

                <p>
                  For continuous random variables, probabilities are usually
                  calculated over intervals:
                </p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  P(a ≤ X ≤ b)
                </div>

                <p>
                  This is because the probability of one exact value is usually
                  not meaningful for a continuous measurement.
                </p>

                <h3 className="pt-4 text-2xl font-bold text-slate-950">
                  Expected value
                </h3>

                <p>
                  For a discrete random variable, the expected value is the
                  probability-weighted average of all possible values:
                </p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  E(X) = Σ x P(X = x)
                </div>

                <p>
                  The expected value is not necessarily the value that will occur
                  in one trial. It is the long-run average over many repetitions
                  of the random process.
                </p>

                <h3 className="pt-4 text-2xl font-bold text-slate-950">
                  Variance
                </h3>

                <p>
                  Variance measures how spread out the values of a random
                  variable are around their mean.
                </p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  Var(X) = E[(X - μ)²]
                </div>

                <p>
                  Here, μ = E(X). If the variance is small, values tend to stay
                  close to the mean. If the variance is large, values are more
                  spread out.
                </p>
              </LessonSection>
            </div>

            <div id="worked-example">
              <LessonSection eyebrow="Worked Example" title="Two fair coin tosses">
                <p>
                  Suppose two fair coins are tossed. The sample space is:
                </p>

                <div className="rounded-2xl bg-slate-50 p-5 font-semibold">
                  Ω = &#123;HH, HT, TH, TT&#125;
                </div>

                <p>
                  Define X as the number of heads. Then X assigns a numerical
                  value to each outcome.
                </p>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full border-collapse bg-white text-left text-sm">
                    <thead className="bg-slate-100 text-slate-950">
                      <tr>
                        <th className="px-4 py-3">Outcome</th>
                        <th className="px-4 py-3">Value of X</th>
                        <th className="px-4 py-3">Probability</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-700">
                      <tr className="border-t border-slate-200">
                        <td className="px-4 py-3">HH</td>
                        <td className="px-4 py-3">2</td>
                        <td className="px-4 py-3">1/4</td>
                      </tr>
                      <tr className="border-t border-slate-200">
                        <td className="px-4 py-3">HT</td>
                        <td className="px-4 py-3">1</td>
                        <td className="px-4 py-3">1/4</td>
                      </tr>
                      <tr className="border-t border-slate-200">
                        <td className="px-4 py-3">TH</td>
                        <td className="px-4 py-3">1</td>
                        <td className="px-4 py-3">1/4</td>
                      </tr>
                      <tr className="border-t border-slate-200">
                        <td className="px-4 py-3">TT</td>
                        <td className="px-4 py-3">0</td>
                        <td className="px-4 py-3">1/4</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p>
                  The probability distribution of X is:
                </p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  P(X = 0) = 1/4, P(X = 1) = 1/2, P(X = 2) = 1/4
                </div>

                <p>
                  The expected value is:
                </p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  E(X) = 0(1/4) + 1(1/2) + 2(1/4) = 1
                </div>

                <p>
                  Interpretation: if the experiment were repeated many times,
                  the average number of heads per two tosses would approach 1.
                </p>
              </LessonSection>
            </div>

            <div id="misconceptions">
              <LessonSection
                eyebrow="Common Misconceptions"
                title="Mistakes students often make"
              >
                <div className="grid gap-4">
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                    <p className="font-semibold text-red-800">
                      Mistake 1: Thinking the random variable is the raw outcome
                    </p>
                    <p className="mt-2 text-red-900">
                      The raw outcome might be HH or TT. The random variable is
                      the numerical rule, such as “number of heads”.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                    <p className="font-semibold text-red-800">
                      Mistake 2: Thinking expected value must be an actual
                      possible outcome
                    </p>
                    <p className="mt-2 text-red-900">
                      Expected value is a long-run average. It does not always
                      have to be one of the values the random variable can
                      actually take.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                    <p className="font-semibold text-red-800">
                      Mistake 3: Treating all variables as random variables
                    </p>
                    <p className="mt-2 text-red-900">
                      A random variable is tied to a random experiment or random
                      process. Not every algebraic variable is automatically a
                      random variable.
                    </p>
                  </div>
                </div>
              </LessonSection>
            </div>

            <div id="interactive">
              <LessonSection
                eyebrow="Interactive Preview"
                title="Coin toss random variable simulator"
              >
                <p>
                  In the full platform, this lesson can include an interactive
                  simulator. Students will choose the number of repetitions, run
                  repeated simulations and compare empirical probabilities with
                  theoretical probabilities.
                </p>

                <div className="rounded-[2rem] bg-slate-950 p-6 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                    Demo idea
                  </p>

                  <h3 className="mt-3 text-2xl font-bold">
                    Simulate X = number of heads in two tosses
                  </h3>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl bg-white/5 p-4">
                      Choose number of repetitions
                    </div>
                    <div className="rounded-2xl bg-white/5 p-4">
                      Count heads each time
                    </div>
                    <div className="rounded-2xl bg-white/5 p-4">
                      Compare observed and theoretical probabilities
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl bg-white/5 p-5">
                    <p className="text-sm text-slate-300">
                      Future version: slider controls, live bar chart and
                      automatic comparison between empirical and theoretical
                      distributions.
                    </p>
                  </div>
                </div>
              </LessonSection>
            </div>

            <div id="coding">
              <CodePracticeBox
                title="Optional simulation idea"
                description="This optional coding practice shows how a student might simulate the random variable X = number of heads in two fair coin tosses."
                code={`# Python example: simulate the number of heads in two coin tosses

import random

def toss_two_coins():
    coins = [random.choice(["H", "T"]) for _ in range(2)]
    return coins.count("H")

results = [toss_two_coins() for _ in range(1000)]

print("Average number of heads:", sum(results) / len(results))
print("Possible values:", sorted(set(results)))

for value in sorted(set(results)):
    print(value, results.count(value) / len(results))`}
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
                Next, study expected value and variance in more depth so that
                you can describe the centre and spread of a random variable.
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