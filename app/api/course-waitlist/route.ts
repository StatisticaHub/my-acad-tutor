import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const course = String(body.course || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !course) {
      return Response.json(
        { error: "Please complete name, email and course." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return Response.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return Response.json(
        { error: "Resend API key is not configured." },
        { status: 500 }
      );
    }

    const toEmail =
      process.env.WAITLIST_TO_EMAIL ||
      process.env.CONTACT_TO_EMAIL ||
      "contact@myacademictutor.com";

    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      process.env.WAITLIST_FROM_EMAIL ||
      "My Academic Tutor <onboarding@resend.dev>";

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCourse = escapeHtml(course);
    const safeMessage = escapeHtml(message);

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New course waitlist signup: ${course}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2>New course waitlist signup</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Course:</strong> ${safeCourse}</p>
          ${
            safeMessage
              ? `<p><strong>Message:</strong><br />${safeMessage.replace(/\n/g, "<br />")}</p>`
              : ""
          }
        </div>
      `,
    });

    if (error) {
      return Response.json(
        { error: "The waitlist email could not be sent." },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: "You have joined the waitlist.",
    });
  } catch {
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
