import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactRequest = {
  name?: string;
  email?: string;
  subject?: string;
  level?: string;
  topic?: string;
  software?: string;
  deadline?: string;
  message?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return Response.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as ContactRequest;

    const name = clean(body.name);
    const email = clean(body.email);
    const subject = clean(body.subject);
    const level = clean(body.level);
    const topic = clean(body.topic);
    const software = clean(body.software);
    const deadline = clean(body.deadline);
    const message = clean(body.message);

    if (!name || !email || !subject || !message) {
      return Response.json(
        { error: "Name, email, subject and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "My Academic Tutor <onboarding@resend.dev>",
      to: ["statisticahub@gmail.com"],
      replyTo: email,
      subject: `Website enquiry: ${subject}`,
      text: `
New support request from My Academic Tutor website.

Name: ${name}
Email: ${email}
Subject: ${subject}
Academic level: ${level || "Not provided"}
Topic/method: ${topic || "Not provided"}
Software: ${software || "Not provided"}
Deadline: ${deadline || "Not provided"}

Message:
${message}
      `.trim(),
    });

    if (error) {
      return Response.json(
        { error: "Could not send message. Please try again later." },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch {
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
