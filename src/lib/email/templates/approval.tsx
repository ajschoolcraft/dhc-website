import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type ApprovalEmailProps = {
  firstName: string;
  tierName: string;
  amount: string;
  paymentUrl: string | null;
};

export function ApprovalEmail({
  firstName,
  tierName,
  amount,
  paymentUrl,
}: ApprovalEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your DHC26 application has been accepted</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Application Approved</Heading>
          <Text style={textStyle}>Dear {firstName},</Text>
          <Text style={textStyle}>
            We are pleased to inform you that your application to attend
            DHC26 — the 2026 Digital Health Counsel AI Summit — has been accepted.
          </Text>
          <Section style={detailsStyle}>
            <Text style={detailLabelStyle}>Registration Type</Text>
            <Text style={detailValueStyle}>{tierName}</Text>
            <Text style={detailLabelStyle}>Amount</Text>
            <Text style={detailValueStyle}>{amount}</Text>
          </Section>
          {paymentUrl ? (
            <>
              <Text style={textStyle}>
                Please complete your registration by clicking the button below to
                process your payment.
              </Text>
              <Section style={{ textAlign: "center" as const, margin: "32px 0" }}>
                <Link href={paymentUrl} style={buttonStyle}>
                  Complete Payment
                </Link>
              </Section>
            </>
          ) : (
            <Text style={textStyle}>
              Your registration is complimentary. No payment is required.
              We look forward to seeing you at DHC26!
            </Text>
          )}
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

const buttonStyle = {
  backgroundColor: "#d6297b",
  borderRadius: "8px",
  color: "#ffffff",
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "600" as const,
  padding: "12px 32px",
  textDecoration: "none",
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
