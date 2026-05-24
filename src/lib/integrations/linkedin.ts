import { IntegrationClient, IntegrationDataPayload, IntegrationPlatform } from './types';

export class LinkedinClient implements IntegrationClient {
  platform: IntegrationPlatform = 'linkedin';

  async connect(): Promise<void> {
    console.log('Connecting to Linkedin...');
  }

  async disconnect(): Promise<void> {
    console.log('Disconnecting from Linkedin...');
  }

  async fetchData(startDate: Date, endDate: Date): Promise<IntegrationDataPayload> {
    return {
      platform: this.platform,
      data: {},
      timestamp: new Date()
    };
  }
}
