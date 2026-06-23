import { stripe } from "./client";

type CreateCheckoutParams = {
  applicationId: string;
  applicantEmail: string;
  tierName: string;
  priceCents: number;
};

export async function createCheckoutSession({
  applicationId,
  applicantEmail,
  tierName,
  priceCents,
}: CreateCheckoutParams): Promise<string> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: applicantEmail,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: priceCents,
          product_data: {
            name: `2026 DHC Summit — ${tierName}`,
            description: "Attendance fee for the 2026 DHC Annual Summit",
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      application_id: applicationId,
    },
    success_url: `${appUrl}/summit-2026?payment=success`,
    cancel_url: `${appUrl}/summit-2026?payment=cancelled`,
  });

  return session.url!;
}
