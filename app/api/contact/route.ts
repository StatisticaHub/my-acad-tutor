import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  academicLevel?: string;
  topic?: string;
  software?: string;
  deadline?: string;
  message?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Contact form is not configured yet." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const body = (await request.json()) as ContactPayload;

    const name = clean(body.name);
    const email = clean(body.email);
    const subject = clean(body.subject);
    const academicLevel = clean(body.academicLevel);
    const topic = clean(body.topic);
    const software = clean(body.software);
    const deadline = clean(body.deadline);
    const message = clean(body.message);

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Please complete name, email, subject and message." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "My Academic Tutor <onboarding@resend.dev>",
      to: ["statisticahub@gmail.com"],
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
      { error: "Could not send message. Please email contact@myacademictutor.com directly." },
      { status: 500 }
    );
  }
}
