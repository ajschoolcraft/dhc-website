import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type Props = {
  firstName: string;
};

export function ApplicationReceivedEmail({ firstName }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Your DHC26 application has been received</Preview>
      <Body style={{ backgroundColor: "#f8f9fa", fontFamily: "sans-serif" }}>
        <Container style={{ margin: "0 auto", padding: "40px 20px", maxWidth: "560px" }}>
          <Section style={{ backgroundColor: "#1a1040", padding: "32px", borderRadius: "12px 12px 0 0" }}>
            <Heading style={{ color: "#ffffff", fontSize: "24px", margin: 0 }}>
              Application Received
            </Heading>
          </Section>
          <Section style={{ backgroundColor: "#ffffff", padding: "32px", borderRadius: "0 0 12px 12px" }}>
            <Text style={{ fontSize: "16px", color: "#1a1a2e" }}>
              Dear {firstName},
            </Text>
            <Text style={{ fontSize: "14px", color: "#6c757d", lineHeight: "1.6" }}>
              Thank you for your interest in DHC26 — the 2026 Digital Health
              Counsel AI Summit, December 2–3, 2026, at Bell Harbor Conference
              Center in Seattle.
            </Text>
            <Text style={{ fontSize: "14px", color: "#6c757d", lineHeight: "1.6" }}>
              We have received your application and will review it carefully.
              Please note that submission does not guarantee attendance.
              Accepted applicants will receive registration details after review.
            </Text>
            <Text style={{ fontSize: "14px", color: "#6c757d", lineHeight: "1.6" }}>
              If you have any questions, please reach out to us at
              info@digitalhealthcounsel.com.
            </Text>
            <Text style={{ fontSize: "14px", color: "#6c757d", marginTop: "24px" }}>
              — Digital Health Counsel
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
