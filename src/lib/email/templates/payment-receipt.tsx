import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type PaymentReceiptEmailProps = {
  firstName: string;
  lastName: string;
  organization: string;
  tierName: string;
  amount: string;
  paidAt: string;
};

export function PaymentReceiptEmail({
  firstName,
  lastName,
  organization,
  tierName,
  amount,
  paidAt,
}: PaymentReceiptEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Payment receipt — DHC26 Summit Registration</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Payment Receipt</Heading>
          <Text style={textStyle}>Dear {firstName},</Text>
          <Text style={textStyle}>
            This confirms your payment for DHC26 — the 2026 Digital Health
            Counsel AI Summit (December 2–3, 2026, Bell Harbor Conference
            Center, Seattle).
          </Text>
          <Section style={detailsStyle}>
            <Text style={detailLabelStyle}>Attendee</Text>
            <Text style={detailValueStyle}>{firstName} {lastName}</Text>
            <Text style={detailLabelStyle}>Organization</Text>
            <Text style={detailValueStyle}>{organization}</Text>
            <Text style={detailLabelStyle}>Registration Type</Text>
            <Text style={detailValueStyle}>{tierName}</Text>
            <Text style={detailLabelStyle}>Amount Paid</Text>
            <Text style={detailValueStyle}>{amount}</Text>
            <Text style={detailLabelStyle}>Date Paid</Text>
            <Text style={detailValueStyle}>{paidAt}</Text>
          </Section>
          <Text style={textStyle}>
            If you have any questions about this receipt, please reply to this
            email.
          </Text>
          <Hr style={hrStyle} />
          <Text style={footerStyle}>
            Digital Health Counsel
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
  color: "#1a1040",
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

const detailsStyle = {
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  padding: "16px 24px",
  margin: "24px 0",
};

const detailLabelStyle = {
  color: "#6c757d",
  fontSize: "12px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  margin: "8px 0 0",
};

const detailValueStyle = {
  color: "#1a1a2e",
  fontSize: "16px",
  fontWeight: "600" as const,
  margin: "2px 0 8px",
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
