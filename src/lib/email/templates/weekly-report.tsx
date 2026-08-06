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
  Row,
  Column,
} from "@react-email/components";
import * as React from "react";

interface WeeklyReportEmailProps {
  userName: string;
  reportDate: string;
  summary: string;
  kpis: { label: string; value: string; change?: string; trend?: 'up' | 'down' }[];
  topAchievements: string[];
}

export const WeeklyReportEmail = ({
  userName,
  reportDate,
  summary,
  kpis,
  topAchievements,
}: WeeklyReportEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your Weekly Wrap is ready - {reportDate}</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto py-10 px-5 bg-white border border-gray-200">
            <Section className="mb-8">
              <Row>
                <Column>
                  <Text className="text-xl font-bold text-gray-900">WeeklyWrap</Text>
                </Column>
                <Column align="right">
                  <Text className="text-sm text-gray-500">{reportDate}</Text>
                </Column>
              </Row>
            </Section>

            <Section className="mb-8">
              <Heading className="text-2xl font-bold text-gray-900 mb-4">
                Hi {userName}, here's your weekly wrap!
              </Heading>
              <Text className="text-lg leading-relaxed text-gray-700 italic border-l-4 border-black pl-4 py-2">
                "{summary}"
              </Text>
            </Section>

            <Section className="mb-8">
              <Heading className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                Key Metrics
              </Heading>
              <Row>
                {kpis.map((kpi, index) => (
                  <Column key={index} className="px-2">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <Text className="text-xs text-gray-500 uppercase m-0">{kpi.label}</Text>
                      <Text className="text-xl font-bold text-gray-900 m-0">{kpi.value}</Text>
                      {kpi.change && (
                        <Text className={`text-xs font-medium m-0 ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {kpi.trend === 'up' ? '↑' : '↓'} {kpi.change}
                        </Text>
                      )}
                    </div>
                  </Column>
                ))}
              </Row>
            </Section>

            <Section className="mb-8">
              <Heading className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                Top Achievements
              </Heading>
              <ul className="list-none p-0 m-0">
                {topAchievements.map((achievement, index) => (
                  <li key={index} className="mb-3 flex items-start">
                    <span className="text-black mr-2">•</span>
                    <Text className="text-gray-700 m-0">{achievement}</Text>
                  </li>
                ))}
              </ul>
            </Section>

            <Section className="text-center mt-10">
              <Button
                className="bg-black rounded-full text-white text-sm font-semibold no-underline text-center px-8 py-4"
                href="https://weeklywrap.ai/reports/latest"
              >
                View Full Report
              </Button>
            </Section>

            <Hr className="border-gray-200 my-10" />

            <Section>
              <Text className="text-xs text-gray-400 text-center">
                WeeklyWrap Inc. • 123 AI Boulevard, San Francisco, CA<br />
                You're receiving this because you're a WeeklyWrap user.
              </Text>
              <div className="text-center mt-4">
                <Link href="https://weeklywrap.ai/settings/notifications" className="text-xs text-gray-400 underline">
                  Unsubscribe
                </Link>
              </div>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WeeklyReportEmail;
