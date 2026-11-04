import { Resend } from "resend";
import type { ReactElement } from "react";

type SendEmailParams = {
  to: string | string[];
  subject: string;
  react: ReactElement;
  cc?: string | string[];
};

export async function sendEmail({ to, subject, react, cc }: SendEmailParams) {
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    replyTo: "akondepudi@omwlaw.com",
    to,
    cc,
    subject,
    react,
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
}
