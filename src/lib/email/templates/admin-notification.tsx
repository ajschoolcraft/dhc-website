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
import { ROLE_CATEGORIES, APPLICATION_TYPES } from "@/types";

type Props = {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  roleCategory: string;
  applicationTypes: string[];
};

export function AdminNotificationEmail({
  firstName,
  lastName,
  email,
  organization,
  roleCategory,
  applicationTypes,
}: Props) {
  const roleName =
    ROLE_CATEGORIES.find((r) => r.value === roleCategory)?.label ?? roleCategory;
  const typeNames = applicationTypes
    .map((t) => APPLICATION_TYPES.find((at) => at.value === t)?.label ?? t)
    .join(", ");

  return (
    <Html>
      <Head />
      <Preview>New DHC26 application from {firstName} {lastName}</Preview>
      <Body style={{ backgroundColor: "#f8f9fa", fontFamily: "sans-serif" }}>
        <Container style={{ margin: "0 auto", padding: "40px 20px", maxWidth: "560px" }}>
          <Section style={{ backgroundColor: "#1a1040", padding: "32px", borderRadius: "12px 12px 0 0" }}>
            <Heading style={{ color: "#ffffff", fontSize: "24px", margin: 0 }}>
              New Application
            </Heading>
          </Section>
          <Section style={{ backgroundColor: "#ffffff", padding: "32px", borderRadius: "0 0 12px 12px" }}>
            <Text style={{ fontSize: "16px", color: "#1a1a2e", fontWeight: "bold" }}>
              {firstName} {lastName}
            </Text>
            <Text style={{ fontSize: "14px", color: "#6c757d" }}>
              <strong>Organization:</strong> {organization}
            </Text>
            <Text style={{ fontSize: "14px", color: "#6c757d" }}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={{ fontSize: "14px", color: "#6c757d" }}>
              <strong>Role:</strong> {roleName}
            </Text>
            <Text style={{ fontSize: "14px", color: "#6c757d" }}>
              <strong>Applying to:</strong> {typeNames}
            </Text>
            <Text style={{ fontSize: "14px", color: "#6c757d", marginTop: "16px" }}>
              Review the full application in the admin dashboard.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
