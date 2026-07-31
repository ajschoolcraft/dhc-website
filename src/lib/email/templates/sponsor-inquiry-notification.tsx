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
  name: string;
  email: string;
  organization: string;
  phone?: string;
  message?: string;
};

export function SponsorInquiryNotificationEmail({
  name,
  email,
  organization,
  phone,
  message,
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>New sponsor inquiry from {name}</Preview>
      <Body style={{ backgroundColor: "#f8f9fa", fontFamily: "sans-serif" }}>
        <Container style={{ margin: "0 auto", padding: "40px 20px", maxWidth: "560px" }}>
          <Section style={{ backgroundColor: "#1a1040", padding: "32px", borderRadius: "12px 12px 0 0" }}>
            <Heading style={{ color: "#ffffff", fontSize: "24px", margin: 0 }}>
              New Sponsor Inquiry
            </Heading>
          </Section>
          <Section style={{ backgroundColor: "#ffffff", padding: "32px", borderRadius: "0 0 12px 12px" }}>
            <Text style={{ fontSize: "16px", color: "#1a1a2e", fontWeight: "bold" }}>
              {name}
            </Text>
            <Text style={{ fontSize: "14px", color: "#6c757d" }}>
              <strong>Organization:</strong> {organization}
            </Text>
            <Text style={{ fontSize: "14px", color: "#6c757d" }}>
              <strong>Email:</strong> {email}
            </Text>
            {phone && (
              <Text style={{ fontSize: "14px", color: "#6c757d" }}>
                <strong>Phone:</strong> {phone}
              </Text>
            )}
            {message && (
              <Text style={{ fontSize: "14px", color: "#6c757d" }}>
                <strong>Message:</strong> {message}
              </Text>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
