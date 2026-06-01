import Badge from "@/components/ui/Badge";
import LessonSection from "@/components/lesson/LessonSection";
import QuizBox from "@/components/lesson/QuizBox";
import CodePracticeBox from "@/components/lesson/CodePracticeBox";

const quizQuestions = [
  {
    question: "Why is expected value called a probability-weighted average?",
    options: [
      "Because all values are given equal weight",
      "Because each possible value is multiplied by its probability before summing",
      "Because it ignores unlikely values",
      "Because it only uses the most likely value",
    ],
    answer:
      "Expected value is a probability-weighted average because each possible value x is multiplied by its probability P(X = x), and then these weighted values are added.",
  },
  {
    question: "Which identity is often used to compute variance more efficiently?",
    options: [
      "Var(X) = E(X) - E(X²)",
      "Var(X) = E(X²) - [E(X)]²",
      "Var(X) = E(X²) + [E(X)]²",
      "Var(X) = P(X = x) - E(X)",
    ],
    answer:
      "The useful computational identity is Var(X) = E(X²) - [E(X)]².",
  },
  {
    question: "Why do we square deviations in the definition of variance?",
    options: [
      "To make probabilities larger",
      "To make the mean equal to zero",
      "To prevent positive and negative deviations from cancelling",
      "To convert discrete variables into continuous variables",
    ],
    answer:
      "We square deviations because deviations above and below the mean would otherwise cancel each other out.",
  },
  {
    question: "If Var(X) = 0, what does that imply?",
    options: [
      "X has no possible values",
      "X is always negative",
      "X is constant with probability 1",
      "X has infinite spread",
    ],
    answer:
      "If Var(X) = 0, then X does not vary around its mean. It is constant with probability 1.",
  },
];

export default function ExpectationVarianceLessonPage() {
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
            Expected value and variance
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300">
            Expected value describes the long-run centre of a random variable.
            Variance describes how strongly the values fluctuate around that
            centre. In this lesson, we derive both ideas carefully from first
            principles.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/courses/statistics-foundation"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Back to course
            </a>

            <a
              href="/courses/statistics-foundation/modules/random-variables-distributions/lessons/what-is-a-random-variable"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Previous lesson
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
            <p className="mt-2 text-lg font-bold text-slate-950">
              Beginner to Advanced
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-500">Focus</p>
            <p className="mt-2 text-lg font-bold text-slate-950">
              Derivation + Interpretation
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
              <a href="#expectation" className="block hover:text-blue-600">
                Expected Value
              </a>
              <a href="#linearity" className="block hover:text-blue-600">
                Linearity
              </a>
              <a href="#variance" className="block hover:text-blue-600">
                Variance
              </a>
              <a href="#variance-identity" className="block hover:text-blue-600">
                Variance Identity
              </a>
              <a href="#worked-example" className="block hover:text-blue-600">
                Worked Example
              </a>
              <a href="#interpretation" className="block hover:text-blue-600">
                Interpretation
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
                    "Define expected value for a discrete random variable.",
                    "Interpret expected value as a long-run average.",
                    "Derive the formula E(X) = ΣxP(X = x).",
                    "Use the linearity property E(aX + b) = aE(X) + b.",
                    "Define variance as expected squared deviation from the mean.",
                    "Derive Var(X) = E(X²) - [E(X)]².",
                    "Calculate variance and standard deviation from a probability distribution.",
                    "Explain why variance measures uncertainty around the expected value.",
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
                    Expected value gives the centre of a random variable.
                    Variance gives the average squared distance from that centre.
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
                  <strong>Mr. R:</strong> In the previous lesson, we learned
                  that a random variable turns uncertain outcomes into numbers.
                  Today we ask a natural question: once we have those numbers,
                  how do we summarise their behaviour?
                </p>

                <p>
                  <strong>Emily:</strong> We probably need an average.
                </p>

                <p>
                  <strong>Mr. R:</strong> Exactly. But this is not an ordinary
                  average of observed data. Before data are collected, a random
                  variable has possible values and probabilities. Therefore, the
                  average must account for probability.
                </p>

                <p>
                  <strong>James:</strong> So a value that is more likely should
                  influence the average more strongly?
                </p>

                <p>
                  <strong>Mr. R:</strong> Perfect. That is the intuition behind
                  expected value. It is a probability-weighted average.
                </p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  E(X) = Σ x P(X = x)
                </div>

                <p>
                  <strong>Sophie:</strong> Does expected value mean the value we
                  expect to see every single time?
                </p>

                <p>
                  <strong>Mr. R:</strong> No. That is an important warning.
                  Expected value is a long-run average, not a guarantee for one
                  trial.
                </p>

                <p>
                  <strong>Oliver:</strong> Then why do we need variance?
                </p>

                <p>
                  <strong>Mr. R:</strong> Because knowing the centre is not
                  enough. Two random variables may have the same expected value
                  but very different levels of uncertainty. Variance measures
                  how much the values spread around the expected value.
                </p>
              </LessonSection>
            </div>

            <div id="expectation">
              <LessonSection
                eyebrow="Detailed Notes"
                title="Expected value from first principles"
              >
                <h3 className="text-2xl font-bold text-slate-950">
                  1. Starting from an ordinary average
                </h3>

                <p>
                  Suppose we observe values x₁, x₂, ..., xₙ. The ordinary
                  arithmetic mean is:
                </p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  x̄ = (x₁ + x₂ + ⋯ + xₙ) / n
                </div>

                <p>
                  If a value appears many times, it contributes many times to
                  the average. For example, if the value 2 appears frequently,
                  it has more influence on the mean than a value that appears
                  rarely.
                </p>

                <h3 className="pt-4 text-2xl font-bold text-slate-950">
                  2. Grouping repeated values
                </h3>

                <p>
                  Suppose a discrete random variable X can take values x₁, x₂,
                  ..., xₖ. If xᵢ appears nᵢ times in n repetitions, then the
                  sample mean can be written as:
                </p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  x̄ = Σ xᵢ(nᵢ / n)
                </div>

                <p>
                  The quantity nᵢ / n is the relative frequency of value xᵢ. In
                  the long run, relative frequency approaches probability:
                </p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  nᵢ / n → P(X = xᵢ)
                </div>

                <p>
                  Therefore, the long-run average becomes:
                </p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  E(X) = Σ xᵢ P(X = xᵢ)
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <p className="font-semibold text-emerald-800">
                    Interpretation
                  </p>
                  <p className="mt-2 text-emerald-900">
                    Expected value is the theoretical long-run average of a
                    random variable. It is obtained by weighting each possible
                    value by its probability.
                  </p>
                </div>

                <h3 className="pt-4 text-2xl font-bold text-slate-950">
                  3. General definition
                </h3>

                <p>
                  For a discrete random variable X with probability mass function
                  p(x) = P(X = x), the expected value is:
                </p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  E(X) = Σₓ x p(x)
                </div>

                <p>
                  The summation is taken over all possible values of X. The
                  expected value exists when the sum is finite.
                </p>
              </LessonSection>
            </div>

            <div id="linearity">
              <LessonSection
                eyebrow="Derivation"
                title="Linearity of expectation"
              >
                <p>
                  One of the most useful properties of expectation is linearity.
                  If a and b are constants, then:
                </p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  E(aX + b) = aE(X) + b
                </div>

                <p>
                  Let Y = aX + b. If X takes value x, then Y takes value ax + b.
                  Therefore:
                </p>

                <div className="space-y-3 rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  <p>E(aX + b) = Σ (ax + b) P(X = x)</p>
                  <p>= Σ ax P(X = x) + Σ b P(X = x)</p>
                  <p>= a Σ x P(X = x) + b Σ P(X = x)</p>
                  <p>= aE(X) + b</p>
                </div>

                <p>
                  The final step uses the fact that the total probability over
                  all possible values is 1:
                </p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  Σ P(X = x) = 1
                </div>

                <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
                  <p className="font-semibold text-blue-800">
                    Why this matters
                  </p>
                  <p className="mt-2 text-blue-900">
                    Linearity allows us to transform random variables without
                    recalculating everything from scratch. It is also a
                    foundation for many later results in statistics.
                  </p>
                </div>
              </LessonSection>
            </div>

            <div id="variance">
              <LessonSection
                eyebrow="Detailed Notes"
                title="Variance as expected squared deviation"
              >
                <h3 className="text-2xl font-bold text-slate-950">
                  1. Why the mean alone is not enough
                </h3>

                <p>
                  The expected value describes the centre of a distribution, but
                  it does not describe how much the random variable varies. Two
                  random variables can have the same mean but different spread.
                </p>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full border-collapse bg-white text-left text-sm">
                    <thead className="bg-slate-100 text-slate-950">
                      <tr>
                        <th className="px-4 py-3">Random variable</th>
                        <th className="px-4 py-3">Possible values</th>
                        <th className="px-4 py-3">Mean</th>
                        <th className="px-4 py-3">Spread</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-700">
                      <tr className="border-t border-slate-200">
                        <td className="px-4 py-3">X</td>
                        <td className="px-4 py-3">9, 10, 11</td>
                        <td className="px-4 py-3">10</td>
                        <td className="px-4 py-3">Small</td>
                      </tr>
                      <tr className="border-t border-slate-200">
                        <td className="px-4 py-3">Y</td>
                        <td className="px-4 py-3">0, 10, 20</td>
                        <td className="px-4 py-3">10</td>
                        <td className="px-4 py-3">Large</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="pt-4 text-2xl font-bold text-slate-950">
                  2. Deviations from the mean
                </h3>

                <p>
                  Let μ = E(X). A natural way to measure spread is to examine
                  the deviation:
                </p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  X - μ
                </div>

                <p>
                  But the expected deviation is always zero:
                </p>

                <div className="space-y-3 rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  <p>E(X - μ) = E(X) - μ</p>
                  <p>= μ - μ</p>
                  <p>= 0</p>
                </div>

                <p>
                  Positive and negative deviations cancel out. Therefore, we
                  square the deviations before averaging.
                </p>

                <h3 className="pt-4 text-2xl font-bold text-slate-950">
                  3. Definition of variance
                </h3>

                <p>
                  The variance of X is the expected squared deviation from its
                  mean:
                </p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  Var(X) = E[(X - μ)²]
                </div>

                <p>
                  For a discrete random variable, this becomes:
                </p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  Var(X) = Σ (x - μ)² P(X = x)
                </div>
              </LessonSection>
            </div>

            <div id="variance-identity">
              <LessonSection
                eyebrow="Derivation"
                title="Deriving Var(X) = E(X²) - [E(X)]²"
              >
                <p>
                  The definition of variance is conceptually clear, but the
                  following equivalent form is often easier to compute:
                </p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  Var(X) = E(X²) - [E(X)]²
                </div>

                <p>We now derive it step by step.</p>

                <div className="space-y-3 rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  <p>Var(X) = E[(X - μ)²]</p>
                  <p>= E[X² - 2μX + μ²]</p>
                  <p>= E(X²) - E(2μX) + E(μ²)</p>
                  <p>= E(X²) - 2μE(X) + μ²</p>
                  <p>= E(X²) - 2μ² + μ²</p>
                  <p>= E(X²) - μ²</p>
                  <p>= E(X²) - [E(X)]²</p>
                </div>

                <p>
                  This derivation uses linearity of expectation and the fact
                  that μ is a constant.
                </p>

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <p className="font-semibold text-emerald-800">
                    Practical use
                  </p>
                  <p className="mt-2 text-emerald-900">
                    Instead of calculating every squared deviation directly, we
                    can calculate E(X²) and E(X), then subtract [E(X)]² from
                    E(X²).
                  </p>
                </div>

                <h3 className="pt-4 text-2xl font-bold text-slate-950">
                  Standard deviation
                </h3>

                <p>
                  Variance is measured in squared units. To return to the
                  original units of X, we use the standard deviation:
                </p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  SD(X) = √Var(X)
                </div>
              </LessonSection>
            </div>

            <div id="worked-example">
              <LessonSection
                eyebrow="Worked Example"
                title="Expected value and variance for two coin tosses"
              >
                <p>
                  Let X be the number of heads in two fair coin tosses. The
                  distribution of X is:
                </p>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full border-collapse bg-white text-left text-sm">
                    <thead className="bg-slate-100 text-slate-950">
                      <tr>
                        <th className="px-4 py-3">x</th>
                        <th className="px-4 py-3">P(X = x)</th>
                        <th className="px-4 py-3">xP(X = x)</th>
                        <th className="px-4 py-3">x²P(X = x)</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-700">
                      <tr className="border-t border-slate-200">
                        <td className="px-4 py-3">0</td>
                        <td className="px-4 py-3">1/4</td>
                        <td className="px-4 py-3">0</td>
                        <td className="px-4 py-3">0</td>
                      </tr>
                      <tr className="border-t border-slate-200">
                        <td className="px-4 py-3">1</td>
                        <td className="px-4 py-3">1/2</td>
                        <td className="px-4 py-3">1/2</td>
                        <td className="px-4 py-3">1/2</td>
                      </tr>
                      <tr className="border-t border-slate-200">
                        <td className="px-4 py-3">2</td>
                        <td className="px-4 py-3">1/4</td>
                        <td className="px-4 py-3">1/2</td>
                        <td className="px-4 py-3">1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p>First calculate the expected value:</p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  E(X) = 0 + 1/2 + 1/2 = 1
                </div>

                <p>Next calculate E(X²):</p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  E(X²) = 0 + 1/2 + 1 = 3/2
                </div>

                <p>Now use the variance identity:</p>

                <div className="space-y-3 rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  <p>Var(X) = E(X²) - [E(X)]²</p>
                  <p>= 3/2 - 1²</p>
                  <p>= 1/2</p>
                </div>

                <p>The standard deviation is:</p>

                <div className="rounded-2xl bg-slate-950 p-5 text-center text-lg font-semibold text-white">
                  SD(X) = √(1/2) ≈ 0.707
                </div>

                <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
                  <p className="font-semibold text-blue-800">
                    Final interpretation
                  </p>
                  <p className="mt-2 text-blue-900">
                    The long-run average number of heads in two tosses is 1. The
                    standard deviation is about 0.707 heads, describing typical
                    variation around that long-run average.
                  </p>
                </div>
              </LessonSection>
            </div>

            <div id="interpretation">
              <LessonSection
                eyebrow="Interpretation"
                title="How to interpret centre and spread together"
              >
                <p>
                  The expected value and variance should be interpreted together.
                  The expected value tells us where the distribution is centred,
                  while the variance tells us how uncertain or variable the
                  outcomes are around that centre.
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="font-semibold text-slate-950">
                      Low variance
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Values are usually close to the expected value. The random
                      variable is relatively stable.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <p className="font-semibold text-slate-950">
                      High variance
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Values can be far from the expected value. The random
                      variable is more variable or uncertain.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                  <p className="font-semibold text-red-800">
                    Common mistake
                  </p>
                  <p className="mt-2 text-red-900">
                    Do not interpret expected value as the outcome that must
                    happen. It is a long-run average, not a prediction for one
                    trial.
                  </p>
                </div>
              </LessonSection>
            </div>

            <div id="coding">
              <CodePracticeBox
                title="Simulating expectation and variance"
                description="This optional code simulates two fair coin tosses many times and compares the simulated mean and variance with the theoretical values."
                code={`# Python example: simulate expectation and variance

import random
import statistics

def toss_two_coins():
    coins = [random.choice(["H", "T"]) for _ in range(2)]
    return coins.count("H")

results = [toss_two_coins() for _ in range(10000)]

mean_result = sum(results) / len(results)
variance_result = statistics.pvariance(results)
sd_result = variance_result ** 0.5

print("Simulated mean:", mean_result)
print("Simulated variance:", variance_result)
print("Simulated standard deviation:", sd_result)

print("Theoretical mean:", 1)
print("Theoretical variance:", 0.5)
print("Theoretical standard deviation:", 0.5 ** 0.5)`}
                note="In the full platform, students will run this directly in the browser using a safe coding lab."
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
                Next, continue to common probability distributions such as the
                Bernoulli, Binomial, Poisson and Normal distributions.
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