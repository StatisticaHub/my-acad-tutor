"use client";

import { FormEvent, useState } from "react";

const courses = [
  "Statistics Foundation",
  "Machine Learning in Biostatistics",
  "Biostatistics Foundation",
  "Epidemiology and Study Designs",
  "Regression Analysis",
  "Survival Analysis",
  "Bioinformatics for Beginners",
];

export default function CourseWaitlistInline() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
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

      if (!response.ok) {
        throw new Error("Waitlist request failed");
      }

      setStatus("success");
      setMessage("You are on the course waitlist. We will send release updates and early access alerts.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again or use the contact form.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[1.75rem] border border-[#E4DED2] bg-white p-5 shadow-sm md:p-6">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#741018]">
        Join the list
      </p>

      <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">
        Get course release updates.
      </h3>

      <div className="mt-5 grid gap-4">
        <label className="grid gap-2 text-sm font-bold">
          Name
          <input
            name="name"
            required
            placeholder="Your name"
            className="rounded-2xl border border-[#D8CDBB] bg-[#FFFCF6] px-4 py-3 font-medium outline-none focus:border-[#741018]"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold">
          Email
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="rounded-2xl border border-[#D8CDBB] bg-[#FFFCF6] px-4 py-3 font-medium outline-none focus:border-[#741018]"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold">
          Course interest
          <select
            name="course"
            className="rounded-2xl border border-[#D8CDBB] bg-[#FFFCF6] px-4 py-3 font-medium outline-none focus:border-[#741018]"
          >
            {courses.map((course) => (
              <option key={course}>{course}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-bold">
          Message
          <textarea
            name="message"
            rows={4}
            placeholder="Optional: tell us what you want to learn."
            className="rounded-2xl border border-[#D8CDBB] bg-[#FFFCF6] px-4 py-3 font-medium outline-none focus:border-[#741018]"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 w-full rounded-full bg-[#141210] px-5 py-3 text-sm font-black text-white transition hover:bg-[#741018] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Joining..." : "Join waitlist →"}
      </button>

      {message ? (
        <p
          className={`mt-4 rounded-2xl px-4 py-3 text-sm font-semibold ${
            status === "success"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {message}
        </p>
      ) : null}

      <p className="mt-4 text-xs leading-6 text-[#6B6258]">
        We will only use your details for course release updates and learning announcements.
      </p>
    </form>
  );
}
