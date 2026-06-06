"use client";

import { useState } from "react";

const courses = [
  "Statistics Foundation",
  "Machine Learning in Biostatistics",
  "Biostatistics Foundation",
  "Epidemiology and Study Designs",
  "Regression Analysis",
  "Survival Analysis",
  "Bioinformatics for Beginners",
];

export default function CourseWaitlist() {
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
      course: String(formData.get("course") || ""),
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
      setMessage("Thank you. You have joined the course waitlist.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Could not submit the form. Please try again.");
    }
  }

  return (
    <section
      id="course-waitlist"
      className="bg-[#f3eee4] px-5 py-12 text-stone-950 md:px-8 md:py-20"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-[#ded6c8] bg-white shadow-[0_24px_80px_rgba(17,17,17,0.08)]">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative bg-[#141210] p-6 text-white md:p-10 lg:p-12">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#741018]/30 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-white/50">
                Course waitlist
              </p>

              <h2 className="mt-5 max-w-2xl text-4xl font-black leading-[1.02] tracking-[-0.055em] md:text-6xl">
                Get updates for upcoming course releases.
              </h2>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 md:text-base md:leading-8">
                Start learning for Statistics Foundation, Machine Learning in
                Biostatistics and future applied quantitative courses.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Release updates",
                  "Course update alerts",
                  "Course announcements",
                  "Learning Hub guidance",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 text-sm font-bold text-white/75"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.06] p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-white/40">
                  Featured releases
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "Statistics Foundation",
                    "ML in Biostatistics",
                    "Open now",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white/75"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#fbf8f1] p-6 md:p-10 lg:p-12">
            <form
              onSubmit={handleSubmit}
              className="rounded-[2rem] border border-[#ded6c8] bg-white p-5 shadow-sm md:p-7"
            >
              <div className="flex flex-col gap-2 border-b border-[#ded6c8] pb-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#741018]">
                  Join the list
                </p>

                <h3 className="text-2xl font-black tracking-[-0.04em] md:text-3xl">
                  Tell us which course you want to follow.
                </h3>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-black text-neutral-800">
                    Name
                  </span>
                  <input
                    name="name"
                    required
                    className="mt-2 w-full rounded-2xl border border-[#ded6c8] bg-[#f3eee4] px-4 py-3.5 text-sm font-bold outline-none transition focus:border-[#741018] focus:bg-white"
                    placeholder="Your name"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-black text-neutral-800">
                    Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    className="mt-2 w-full rounded-2xl border border-[#ded6c8] bg-[#f3eee4] px-4 py-3.5 text-sm font-bold outline-none transition focus:border-[#741018] focus:bg-white"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="mt-4 block">
                <span className="text-sm font-black text-neutral-800">
                  Course interest
                </span>
                <select
                  name="course"
                  required
                  defaultValue="Statistics Foundation"
                  className="mt-2 w-full rounded-2xl border border-[#ded6c8] bg-[#f3eee4] px-4 py-3.5 text-sm font-bold outline-none transition focus:border-[#741018] focus:bg-white"
                >
                  {courses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </label>

              <label className="mt-4 block">
                <span className="text-sm font-black text-neutral-800">
                  Message
                </span>
                <textarea
                  name="message"
                  rows={4}
                  className="mt-2 w-full resize-none rounded-2xl border border-[#ded6c8] bg-[#f3eee4] px-4 py-3.5 text-sm font-bold outline-none transition focus:border-[#741018] focus:bg-white"
                  placeholder="Optional: tell us what you want to learn."
                />
              </label>

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#86121d] px-6 py-4 text-sm font-black text-white shadow-[0_16px_35px_rgba(153,15,26,0.25)] transition hover:-translate-y-0.5 hover:bg-[#141210] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Joining waitlist..." : "Start learning →"}
              </button>

              {message ? (
                <p
                  className={`mt-4 rounded-2xl px-4 py-3 text-sm font-bold ${
                    status === "success"
                      ? "border border-green-200 bg-green-50 text-green-800"
                      : "border border-red-200 bg-red-50 text-red-800"
                  }`}
                >
                  {message}
                </p>
              ) : null}

              <p className="mt-5 text-xs font-bold leading-6 text-[#7a7063]">
                We will only use your details for course release updates and
                learning announcements.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
