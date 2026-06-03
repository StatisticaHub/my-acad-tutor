import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  academicLevel?: string;
  level?: string;
  topic?: string;
  software?: string;
  deadline?: string;
  message?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Contact form is not configured yet." },
      { status: 500 },
    );
  }

  try {
    const body = (await request.json()) as ContactPayload;

    const name = clean(body.name);
    const email = clean(body.email);
    const subject = clean(body.subject);
    const academicLevel = clean(body.academicLevel || body.level);
    const topic = clean(body.topic);
    const software = clean(body.software);
    const deadline = clean(body.deadline);
    const message = clean(body.message);

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Please complete name, email, subject and message." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: process.env.RESEND_FROM || "My Academic Tutor <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO || "statisticahub@gmail.com"],
      replyTo: email,
      subject: `Support request: ${subject}`,
      text: `
New support request from My Academic Tutor

Name: ${name}
Email: ${email}
Subject: ${subject}
Academic level: ${academicLevel || "Not provided"}
Topic or method: ${topic || "Not provided"}
Software: ${software || "Not provided"}
Deadline / preferred time: ${deadline || "Not provided"}

Message:
${message}
      `.trim(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        error:
          "Could not send message. Please email contact@myacademictutor.com directly.",
      },
      { status: 500 },
    );
  }
}
