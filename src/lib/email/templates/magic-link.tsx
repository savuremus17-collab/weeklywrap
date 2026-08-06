import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface MagicLinkEmailProps {
  url: string;
}

export const MagicLinkEmail = ({ url }: MagicLinkEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your magic link for WeeklyWrap</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-10 px-5">
            <Section className="mt-8">
              <Heading className="text-2xl font-bold text-center text-gray-800">
                WeeklyWrap
              </Heading>
            </Section>
            <Section className="mt-8">
              <Text className="text-lg leading-relaxed text-gray-700 text-center">
                Click the button below to sign in to your WeeklyWrap account.
              </Text>
            </Section>
            <Section className="mt-8 text-center">
              <Button
                className="bg-[#000000] rounded text-white text-xs font-semibold no-underline text-center px-5 py-3"
                href={url}
              >
                Sign In
              </Button>
            </Section>
            <Section className="mt-8">
              <Text className="text-sm leading-relaxed text-gray-500 text-center">
                If you didn't request this email, you can safely ignore it.
              </Text>
            </Section>
            <Hr className="border-gray-300 my-8" />
            <Section>
              <Text className="text-xs text-gray-400 text-center">
                WeeklyWrap. AI-powered reporting for the modern professional.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default MagicLinkEmail;
