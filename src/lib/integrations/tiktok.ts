import { IntegrationClient, IntegrationDataPayload, IntegrationPlatform } from './types';

export class TiktokClient implements IntegrationClient {
  platform: IntegrationPlatform = 'tiktok';

  async connect(): Promise<void> {
    console.log('Connecting to Tiktok...');
  }

  async disconnect(): Promise<void> {
    console.log('Disconnecting from Tiktok...');
  }

  async fetchData(startDate: Date, endDate: Date): Promise<IntegrationDataPayload> {
    return {
      platform: this.platform,
      data: {},
      timestamp: new Date()
    };
  }
}
