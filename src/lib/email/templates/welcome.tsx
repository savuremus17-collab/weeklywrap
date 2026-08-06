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

interface WelcomeEmailProps {
  userFirstname: string;
}

export const WelcomeEmail = ({
  userFirstname,
}: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to WeeklyWrap - Your AI Operating System for Weekly Progress</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-10 px-5">
            <Section className="mt-8">
              <Heading className="text-2xl font-bold text-center text-gray-800">
                WeeklyWrap
              </Heading>
            </Section>
            <Section className="mt-8">
              <Text className="text-lg leading-relaxed text-gray-700">
                Hi {userFirstname},
              </Text>
              <Text className="text-lg leading-relaxed text-gray-700">
                Welcome to WeeklyWrap! We're thrilled to have you join our community of high-performers, creators, and agencies.
              </Text>
              <Text className="text-lg leading-relaxed text-gray-700">
                WeeklyWrap is designed to help you turn your raw work activity into stunning, client-ready reports and productivity insights with the power of AI.
              </Text>
            </Section>
            <Section className="mt-8 text-center">
              <Button
                className="bg-[#000000] rounded text-white text-xs font-semibold no-underline text-center px-5 py-3"
                href="https://weeklywrap.ai/dashboard"
              >
                Get Started
              </Button>
            </Section>
            <Section className="mt-8">
              <Text className="text-lg leading-relaxed text-gray-700">
                Here's what you can do next:
              </Text>
              <ul className="list-disc pl-5 text-gray-700">
                <li className="mb-2">Connect your work tools (GitHub, Notion, etc.)</li>
                <li className="mb-2">Set up your first client profile</li>
                <li className="mb-2">Generate your first weekly report</li>
              </ul>
            </Section>
            <Hr className="border-gray-300 my-8" />
            <Section>
              <Text className="text-sm text-gray-500">
                If you have any questions, feel free to reply to this email. We're here to help!
              </Text>
              <Text className="text-sm text-gray-500">
                Best regards,<br />
                The WeeklyWrap Team
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
