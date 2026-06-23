import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";

type PaymentConfirmedEmailProps = {
  firstName: string;
  tierName: string;
  amount: string;
};

export function PaymentConfirmedEmail({
  firstName,
  tierName,
  amount,
}: PaymentConfirmedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Payment confirmed — you are registered for the 2026 DHC Summit</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Payment Confirmed</Heading>
          <Text style={textStyle}>Dear {firstName},</Text>
          <Text style={textStyle}>
            Your payment of {amount} for the 2026 DHC Annual Summit has been
            confirmed. You are now registered to attend.
          </Text>
          <Text style={detailLabelStyle}>Registration Type</Text>
          <Text style={detailValueStyle}>{tierName}</Text>
          <Text style={textStyle}>
            We will share event details, including the agenda and venue
            information, closer to the date. If you have any questions, please
            contact us.
          </Text>
          <Hr style={hrStyle} />
          <Text style={footerStyle}>
            Digital Health Council &middot; Digital Health Group, LLC
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const bodyStyle = {
  backgroundColor: "#f8f9fa",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const containerStyle = {
  backgroundColor: "#ffffff",
  margin: "40px auto",
  padding: "40px",
  maxWidth: "560px",
  borderRadius: "8px",
};

const headingStyle = {
  color: "#1e3a5f",
  fontSize: "24px",
  fontWeight: "700" as const,
  margin: "0 0 24px",
};

const textStyle = {
  color: "#1a1a2e",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "16px 0",
};

const detailLabelStyle = {
  color: "#6c757d",
  fontSize: "12px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  margin: "16px 0 0",
};

const detailValueStyle = {
  color: "#1a1a2e",
  fontSize: "16px",
  fontWeight: "600" as const,
  margin: "2px 0",
};

const hrStyle = {
  borderColor: "#dee2e6",
  margin: "32px 0",
};

const footerStyle = {
  color: "#6c757d",
  fontSize: "12px",
  textAlign: "center" as const,
};
