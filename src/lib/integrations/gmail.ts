import { IntegrationClient, IntegrationDataPayload, IntegrationPlatform } from './types';

export class GmailClient implements IntegrationClient {
  platform: IntegrationPlatform = 'gmail';

  async connect(): Promise<void> {
    console.log('Connecting to Gmail...');
  }

  async disconnect(): Promise<void> {
    console.log('Disconnecting from Gmail...');
  }

  async fetchData(startDate: Date, endDate: Date): Promise<IntegrationDataPayload> {
    return {
      platform: this.platform,
      data: {},
      timestamp: new Date()
    };
  }
}
