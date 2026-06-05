"use client";

import { useState } from "react";

const basePath = "";

function withBasePath(href: string) {
  if (href === "/") return `${basePath}/`;
  if (
    href.startsWith("#") ||
    href.startsWith("http") ||
    href.startsWith("mailto:")
  ) {
    return href;
  }

  const cleanHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const hasFileExtension = /\/[^/]+\.[^/]+$/.test(cleanHref);

  return `${basePath}${cleanHref}${hasFileExtension ? "" : "/"}`;
}

export default function MachineLearningBiostatisticsWaitlistPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      course: "Machine Learning in Biostatistics",
      message: String(formData.get("message") || ""),
    };

    try {
      const response = await fetch("/api/course-waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(result.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage("Thank you. You have joined the ML in Biostatistics waitlist.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Could not submit the form. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-neutral-950 md:px-8 md:py-16">
      <section className="mx-auto max-w-6xl">
        <a
          href={withBasePath("/courses/machine-learning-biostatistics")}
          className="text-sm font-black text-[#8b1116] transition hover:text-[#5f0b0f]"
        >
          ← Back to ML in Biostatistics course
        </a>

        <section className="mt-8 overflow-hidden rounded-[2.5rem] border border-neutral-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[1fr_0.95fr]">
            <div className="p-6 md:p-10 lg:p-12">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8b1116]">
                Machine Learning in Biostatistics · Waitlist
              </p>

              <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.03] tracking-[-0.055em] md:text-6xl">
                Join the waitlist for the full ML course.
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-neutral-700 md:text-lg md:leading-9">
                Register for release updates, early access information and
                course announcements for Machine Learning in Biostatistics.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Clinical prediction",
                  "Validation and calibration",
                  "Case studies",
                  "Responsible interpretation",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] p-4 text-sm font-black text-neutral-700"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={withBasePath(
                    "/courses/machine-learning-biostatistics/modules/foundations/lessons/what-is-machine-learning-in-biostatistics"
                  )}
                  className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-black text-neutral-950 transition hover:-translate-y-0.5 hover:border-neutral-950"
                >
                  Preview Lesson 1.1 →
                </a>

                <a
                  href={withBasePath("/learning-hub")}
                  className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-sm font-black text-neutral-950 transition hover:-translate-y-0.5 hover:border-neutral-950"
                >
                  Open Learning Hub →
                </a>
              </div>
            </div>

            <div className="border-t border-neutral-200 bg-[#f7f4ee] p-6 md:p-8 lg:border-l lg:border-t-0">
              <form
                onSubmit={handleSubmit}
                className="rounded-[2rem] border border-neutral-200 bg-white p-5 shadow-sm md:p-6"
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8b1116]">
                  Waitlist form
                </p>

                <h2 className="mt-3 text-2xl font-black tracking-[-0.04em]">
                  Get notified when the course opens.
                </h2>

                <label className="mt-6 block">
                  <span className="text-sm font-black text-neutral-800">
                    Name
                  </span>
                  <input
                    name="name"
                    required
                    className="mt-2 w-full rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold outline-none transition focus:border-[#8b1116] focus:bg-white"
                    placeholder="Your name"
                  />
                </label>

                <label className="mt-4 block">
                  <span className="text-sm font-black text-neutral-800">
                    Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    className="mt-2 w-full rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold outline-none transition focus:border-[#8b1116] focus:bg-white"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="mt-4 block">
                  <span className="text-sm font-black text-neutral-800">
                    Message
                  </span>
                  <textarea
                    name="message"
                    rows={4}
                    className="mt-2 w-full resize-none rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm font-bold outline-none transition focus:border-[#8b1116] focus:bg-white"
                    placeholder="Optional: tell us what you want to learn in this course."
                  />
                </label>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-neutral-950 px-6 py-4 text-sm font-black text-white transition hover:bg-[#8b1116] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "sending"
                    ? "Joining waitlist..."
                    : "Join ML waitlist →"}
                </button>

                {message ? (
                  <p
                    className={`mt-4 rounded-2xl px-4 py-3 text-sm font-bold ${
                      status === "success"
                        ? "bg-green-50 text-green-800"
                        : "bg-red-50 text-red-800"
                    }`}
                  >
                    {message}
                  </p>
                ) : null}
              </form>

              <div className="mt-5 rounded-[2rem] bg-neutral-950 p-5 text-white">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                  Planned release
                </p>

                <h3 className="mt-3 text-3xl font-black tracking-[-0.045em]">
                  July 2026
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/70">
                  Full course access, case studies and advanced learning
                  materials will be released in stages.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
