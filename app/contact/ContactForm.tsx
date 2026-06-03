"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  level: string;
  topic: string;
  software: string;
  deadline: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  subject: "",
  level: "",
  topic: "",
  software: "",
  deadline: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  function updateField(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setFeedback(data.error || "Could not send your message.");
        return;
      }

      setStatus("success");
      setFeedback("Your message has been sent. We will reply as soon as possible.");
      setForm(initialForm);
    } catch {
      setStatus("error");
      setFeedback("Could not send your message. Please email statisticahub@gmail.com.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8"
    >
      <p className="text-sm font-black uppercase tracking-[0.22em] text-[#8b1116]">
        Support request form
      </p>

      <h2 className="mt-4 font-sans text-3xl font-black tracking-[-0.04em]">
        Send a structured enquiry.
      </h2>

      <p className="mt-4 text-sm leading-7 text-neutral-700">
        Use this form for course questions, academic support, software guidance,
        dissertation planning or research-method enquiries.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-neutral-800">
          Name *
          <input name="name" value={form.name} onChange={updateField} required className="rounded-2xl border border-neutral-300 bg-[#f7f4ee] px-4 py-3 outline-none focus:border-[#8b1116]" placeholder="Your name" />
        </label>

        <label className="grid gap-2 text-sm font-bold text-neutral-800">
          Email *
          <input name="email" type="email" value={form.email} onChange={updateField} required className="rounded-2xl border border-neutral-300 bg-[#f7f4ee] px-4 py-3 outline-none focus:border-[#8b1116]" placeholder="you@example.com" />
        </label>

        <label className="grid gap-2 text-sm font-bold text-neutral-800">
          Subject *
          <input name="subject" value={form.subject} onChange={updateField} required className="rounded-2xl border border-neutral-300 bg-[#f7f4ee] px-4 py-3 outline-none focus:border-[#8b1116]" placeholder="Statistics support, course enquiry, dissertation help..." />
        </label>

        <label className="grid gap-2 text-sm font-bold text-neutral-800">
          Academic level
          <input name="level" value={form.level} onChange={updateField} className="rounded-2xl border border-neutral-300 bg-[#f7f4ee] px-4 py-3 outline-none focus:border-[#8b1116]" placeholder="Undergraduate, MSc, PhD, professional..." />
        </label>

        <label className="grid gap-2 text-sm font-bold text-neutral-800">
          Topic or method
          <input name="topic" value={form.topic} onChange={updateField} className="rounded-2xl border border-neutral-300 bg-[#f7f4ee] px-4 py-3 outline-none focus:border-[#8b1116]" placeholder="Regression, hypothesis testing, survival analysis..." />
        </label>

        <label className="grid gap-2 text-sm font-bold text-neutral-800">
          Software
          <input name="software" value={form.software} onChange={updateField} className="rounded-2xl border border-neutral-300 bg-[#f7f4ee] px-4 py-3 outline-none focus:border-[#8b1116]" placeholder="R, Python, SPSS, Stata, SAS, none..." />
        </label>

        <label className="grid gap-2 text-sm font-bold text-neutral-800 md:col-span-2">
          Deadline or preferred time
          <input name="deadline" value={form.deadline} onChange={updateField} className="rounded-2xl border border-neutral-300 bg-[#f7f4ee] px-4 py-3 outline-none focus:border-[#8b1116]" placeholder="Example: next week, before Friday, flexible..." />
        </label>

        <label className="grid gap-2 text-sm font-bold text-neutral-800 md:col-span-2">
          Message *
          <textarea name="message" value={form.message} onChange={updateField} required rows={7} className="rounded-2xl border border-neutral-300 bg-[#f7f4ee] px-4 py-3 outline-none focus:border-[#8b1116]" placeholder="Explain what you need help understanding. Do not send passwords, confidential data, exam material or restricted assessed work." />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-black text-white transition hover:bg-[#8b1116] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send support request →"}
      </button>

      {feedback ? (
        <p className={`mt-4 rounded-2xl px-4 py-3 text-sm font-bold ${status === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`}>
          {feedback}
        </p>
      ) : null}

      <p className="mt-5 text-xs leading-6 text-neutral-600">
        Academic integrity reminder: this form is for guidance and learning support,
        not for ghostwriting, impersonation, exam completion or dishonest academic work.
      </p>
    </form>
  );
}
