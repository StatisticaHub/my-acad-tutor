import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type WaitlistPayload = {
  name?: string;
  email?: string;
  countryCode?: string;
  phone?: string;
  course?: string;
  level?: string;
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function cleanText(value: string) {
  return value
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 1000);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WaitlistPayload;

    const name = cleanText(body.name ?? "");
    const email = cleanText(body.email ?? "");
    const countryCode = cleanText(body.countryCode ?? "");
    const phone = cleanText(body.phone ?? "");
    const course = cleanText(body.course ?? "");
    const level = cleanText(body.level ?? "");
    const message = cleanText(body.message ?? "");

    if (!name || !email || !course) {
      return NextResponse.json(
        { error: "Please enter your name, email and course interest." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (phone && !/^[0-9\s\-()]{6,20}$/.test(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid phone number." },
        { status: 400 },
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Waitlist email service is not configured yet." },
        { status: 500 },
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const fullPhone = phone ? `${countryCode} ${phone}`.trim() : "Not provided";

    await resend.emails.send({
      from: "My Academic Tutor <onboarding@resend.dev>",
      to: "rahulbalwan1910@gmail.com",
      subject: `New course waitlist: ${course}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New course waitlist entry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${fullPhone}</p>
          <p><strong>Course interest:</strong> ${course}</p>
          <p><strong>Level:</strong> ${level || "Not provided"}</p>
          <p><strong>Message:</strong></p>
          <p>${message || "No message provided."}</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "You have joined the waitlist.",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
