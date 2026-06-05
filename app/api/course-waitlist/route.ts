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

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);

  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" "),
  };
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
        { error: "RESEND_API_KEY is missing in Vercel." },
        { status: 500 }
      );
    }

    const { firstName, lastName } = splitName(name);
    const waitlistSegmentId = process.env.RESEND_WAITLIST_SEGMENT_ID;

    const contactResult = await resend.contacts.create({
      email,
      firstName,
      lastName,
      unsubscribed: false,
      properties: {
        full_name: name,
        course_interest: course,
        waitlist_source: "course_waitlist_form",
        message: message || "No message provided",
      },
      ...(waitlistSegmentId
        ? {
            segments: [{ id: waitlistSegmentId }],
          }
        : {}),
    });

    if (contactResult.error) {
      console.error("RESEND_CONTACT_CREATE_ERROR", contactResult.error);

      return Response.json(
        {
          error:
            "Contact was not saved in Resend. Check that RESEND_API_KEY is Full access and RESEND_WAITLIST_SEGMENT_ID is correct.",
          resendError: contactResult.error,
        },
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

    const adminEmail = await resend.emails.send({
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

    if (adminEmail.error) {
      console.error("RESEND_ADMIN_EMAIL_ERROR", adminEmail.error);
    }

    const studentEmail = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: `You are on the ${course} waitlist`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #111;">
          <h2>You're on the waitlist.</h2>
          <p>Hi ${safeName},</p>
          <p>Thank you for joining the waitlist for <strong>${safeCourse}</strong>.</p>
          <p>We will email you with course release updates, early access information and important learning announcements.</p>
          <p>Best wishes,<br /><strong>My Academic Tutor</strong></p>
        </div>
      `,
    });

    if (studentEmail.error) {
      console.error("RESEND_STUDENT_EMAIL_ERROR", studentEmail.error);
    }

    return Response.json({
      success: true,
      message: "You have joined the waitlist.",
      contactId: contactResult.data?.id,
    });
  } catch (error) {
    console.error("COURSE_WAITLIST_FATAL_ERROR", error);

    return Response.json(
      {
        error: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}
