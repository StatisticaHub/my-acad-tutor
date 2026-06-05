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
      className="bg-[#f7f4ee] px-5 py-10 text-neutral-950 md:px-8 md:py-16"
    >
      <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8b1116]">
              Course waitlist
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] md:text-5xl">
              Join the waitlist for course release updates.
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-700 md:text-base md:leading-8">
              Register interest in Statistics Foundation, Machine Learning in
              Biostatistics or another upcoming course. You will receive release
              updates and early access information.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Stats Foundation",
                "ML in Biostatistics",
                "July 2026 release",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-neutral-200 bg-[#f7f4ee] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-neutral-600"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-neutral-200 bg-[#f7f4ee] p-5 md:p-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-black text-neutral-800">
                  Name
                </span>
                <input
                  name="name"
                  required
                  className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-[#8b1116]"
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
                  className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-[#8b1116]"
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
                className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-[#8b1116]"
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
                className="mt-2 w-full resize-none rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-[#8b1116]"
                placeholder="Optional: tell us what you want to learn."
              />
            </label>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-neutral-950 px-6 py-4 text-sm font-black text-white transition hover:bg-[#8b1116] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Joining waitlist..." : "Join waitlist →"}
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
        </div>
      </div>
    </section>
  );
}
