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

interface ClientReportEmailProps {
  clientName: string;
  professionalName: string;
  reportPeriod: string;
  aiSummary: string;
  reportUrl: string;
}

export const ClientReportEmail = ({
  clientName,
  professionalName,
  reportPeriod,
  aiSummary,
  reportUrl,
}: ClientReportEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Progress Report: {reportPeriod} - {professionalName}</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans">
          <Container className="mx-auto py-12 px-6 bg-white rounded-xl shadow-sm border border-[#e6ebf1]">
            <Section className="mb-10">
              <Text className="text-[#8898aa] text-xs font-bold uppercase tracking-widest m-0">
                Weekly Report
              </Text>
              <Heading className="text-[#1a1f36] text-2xl font-bold mt-2">
                Progress Update for {clientName}
              </Heading>
            </Section>

            <Section className="mb-8">
              <Text className="text-[#4f566b] text-lg leading-relaxed">
                Hi {clientName},
              </Text>
              <Text className="text-[#4f566b] text-lg leading-relaxed">
                Here is the progress report for the period of <strong>{reportPeriod}</strong>.
              </Text>
              <div className="bg-[#f7fafc] p-6 rounded-lg border border-[#edf2f7] mt-6">
                <Text className="text-[#1a1f36] font-semibold mb-2">AI Summary:</Text>
                <Text className="text-[#4f566b] italic leading-relaxed m-0">
                  "{aiSummary}"
                </Text>
              </div>
            </Section>

            <Section className="text-center mt-10 mb-10">
              <Button
                className="bg-[#635bff] rounded text-white text-sm font-semibold no-underline text-center px-8 py-4"
                href={reportUrl}
              >
                View Full Report Online
              </Button>
            </Section>

            <Hr className="border-[#e6ebf1] my-10" />

            <Section>
              <Text className="text-[#4f566b] text-sm leading-relaxed">
                If you have any questions or would like to discuss this report, feel free to reach out directly.
              </Text>
              <Text className="text-[#1a1f36] font-semibold mt-6">
                {professionalName}
              </Text>
              <Text className="text-[#8898aa] text-sm m-0">
                Generated via WeeklyWrap
              </Text>
            </Section>
          </Container>
          <Section className="mt-8 text-center">
            <Text className="text-[#8898aa] text-xs">
              Powered by WeeklyWrap — The AI Operating System for Modern Professionals.
            </Text>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ClientReportEmail;
