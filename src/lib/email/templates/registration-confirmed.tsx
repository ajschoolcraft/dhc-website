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

type RegistrationConfirmedEmailProps = {
  firstName: string;
};

export function RegistrationConfirmedEmail({
  firstName,
}: RegistrationConfirmedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>You are registered for DHC26</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Registration Confirmed</Heading>
          <Text style={textStyle}>Dear {firstName},</Text>
          <Text style={textStyle}>
            You are registered to attend DHC26 — the 2026 Digital Health
            Counsel AI Summit — taking place December 2–3, 2026 at Bell
            Harbor International Conference Center in Seattle.
          </Text>
          <Text style={textStyle}>
            We will share event details, including the agenda and venue
            information, closer to the date. If you have any questions, please
            don't hesitate to reach out.
          </Text>
          <Text style={textStyle}>
            We look forward to seeing you there!
          </Text>
          <Hr style={hrStyle} />
          <Text style={footerStyle}>Digital Health Counsel</Text>
        </Container>
      </Body>
    </Html>
  );
}

const bodyStyle = {
  backgroundColor: "#f8f9fa",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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

const hrStyle = {
  borderColor: "#dee2e6",
  margin: "32px 0",
};

const footerStyle = {
  color: "#6c757d",
  fontSize: "12px",
  textAlign: "center" as const,
};
