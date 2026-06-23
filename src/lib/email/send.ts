import { Resend } from "resend";
import type { ReactElement } from "react";

const resend = new Resend(process.env.RESEND_API_KEY!);

type SendEmailParams = {
  to: string;
  subject: string;
  react: ReactElement;
};

export async function sendEmail({ to, subject, react }: SendEmailParams) {
  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to,
    subject,
    react,
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
}
