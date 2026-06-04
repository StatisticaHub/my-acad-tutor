"use client";

import { useEffect, useState } from "react";

const courses = [
  "Statistics Foundation",
  "Machine Learning in Biostatistics",
  "Biostatistics Foundation",
  "Epidemiology and Study Designs",
  "Regression Analysis",
  "Survival Analysis",
  "Bioinformatics for Beginners",
];

const levels = [
  "Beginner",
  "Undergraduate",
  "Master's",
  "Research project",
  "Professional / career upskilling",
];

const countryCodes = [
  { code: "+44", label: "UK +44" },
  { code: "+91", label: "India +91" },
  { code: "+1", label: "US/Canada +1" },
  { code: "+61", label: "Australia +61" },
  { code: "+353", label: "Ireland +353" },
  { code: "+49", label: "Germany +49" },
  { code: "+33", label: "France +33" },
  { code: "+31", label: "Netherlands +31" },
  { code: "+46", label: "Sweden +46" },
  { code: "+47", label: "Norway +47" },
  { code: "+971", label: "UAE +971" },
  { code: "+65", label: "Singapore +65" },
  { code: "+977", label: "Nepal +977" },
  { code: "+880", label: "Bangladesh +880" },
  { code: "+92", label: "Pakistan +92" },
  { code: "+94", label: "Sri Lanka +94" },
];

export default function CourseWaitlist() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    function openFromHash() {
      if (window.location.hash === "#course-waitlist") {
        setIsOpen(true);
      }
    }

    openFromHash();
    window.addEventListener("hashchange", openFromHash);

    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function closeModal() {
    setIsOpen(false);
    setFeedback("");
    setStatus("idle");

    if (window.location.hash === "#course-waitlist") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      countryCode: String(formData.get("countryCode") || ""),
      phone: String(formData.get("phone") || ""),
      course: String(formData.get("course") || ""),
      level: String(formData.get("level") || ""),
      message: String(formData.get("message") || ""),
    };

    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setFeedback(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      setFeedback(
        "You have joined the waitlist. We will contact you when the course opens.",
      );
      form.reset();
    } catch {
      setStatus("error");
      setFeedback("Something went wrong. Please try again.");
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950/70 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Course waitlist form"
    >
      <button
        type="button"
        aria-label="Close waitlist"
        onClick={closeModal}
        className="absolute inset-0 cursor-default"
      />

      <section
        id="course-waitlist"
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-neutral-200 bg-white p-5 shadow-2xl md:rounded-[2.5rem] md:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8b1116] md:text-sm">
              Course waitlist
            </p>

            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.045em] text-neutral-950 md:text-5xl">
              Join the waitlist for upcoming courses.
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-700 md:text-base">
              Tell us which course you are interested in. We will contact you
              when enrolment opens.
            </p>
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="shrink-0 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-black text-neutral-700 transition hover:bg-neutral-950 hover:text-white"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-neutral-700">Name</span>
              <input
                required
                name="name"
                type="text"
                placeholder="Your name"
                className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm outline-none transition focus:border-[#8b1116] focus:bg-white"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-bold text-neutral-700">Email</span>
              <input
                required
                name="email"
                type="email"
                placeholder="you@example.com"
                className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm outline-none transition focus:border-[#8b1116] focus:bg-white"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-[0.42fr_0.58fr]">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-neutral-700">
                Country code
              </span>
              <select
                name="countryCode"
                defaultValue="+44"
                className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm outline-none transition focus:border-[#8b1116] focus:bg-white"
              >
                {countryCodes.map((item) => (
                  <option key={item.label} value={item.code}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-bold text-neutral-700">
                Phone number
              </span>
              <input
                name="phone"
                type="tel"
                inputMode="tel"
                placeholder="7123 456789"
                className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm outline-none transition focus:border-[#8b1116] focus:bg-white"
              />
            </label>
          </div>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-neutral-700">
              Course interest
            </span>
            <select
              required
              name="course"
              className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm outline-none transition focus:border-[#8b1116] focus:bg-white"
            >
              <option value="">Choose a course</option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-neutral-700">
              Current level
            </span>
            <select
              name="level"
              className="rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm outline-none transition focus:border-[#8b1116] focus:bg-white"
            >
              <option value="">Choose your level</option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-neutral-700">
              What would you like this course to cover?
            </span>
            <textarea
              name="message"
              rows={4}
              placeholder="Example: I want a beginner-friendly course on confidence intervals, regression and research methods."
              className="resize-none rounded-2xl border border-neutral-200 bg-[#f7f4ee] px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#8b1116] focus:bg-white"
            />
          </label>

          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#8b1116] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "Joining waitlist..." : "Join waitlist →"}
          </button>

          {feedback && (
            <p
              className={`rounded-2xl px-4 py-3 text-sm font-bold ${
                status === "success"
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {feedback}
            </p>
          )}

          <p className="text-xs leading-6 text-neutral-500">
            We will only use your details to contact you about relevant course
            updates from My Academic Tutor.
          </p>
        </form>
      </section>
    </div>
  );
}
