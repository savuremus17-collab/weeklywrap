import { IntegrationPlatform, IntegrationClient } from './types';
import { NotionClient } from './notion';
import { SlackClient } from './slack';
import { CalendarClient } from './calendar';
import { YoutubeClient } from './youtube';
import { TiktokClient } from './tiktok';
import { TwitterClient } from './twitter';
import { LinkedinClient } from './linkedin';
import { GmailClient } from './gmail';

class IntegrationRegistry {
  private clients: Map<IntegrationPlatform, IntegrationClient> = new Map();

  constructor() {
    this.register(new NotionClient());
    this.register(new SlackClient());
    this.register(new CalendarClient());
    this.register(new YoutubeClient());
    this.register(new TiktokClient());
    this.register(new TwitterClient());
    this.register(new LinkedinClient());
    this.register(new GmailClient());
  }

  register(client: IntegrationClient) {
    this.clients.set(client.platform, client);
  }

  getClient(platform: IntegrationPlatform): IntegrationClient | undefined {
    return this.clients.get(platform);
  }

  getAllClients(): IntegrationClient[] {
    return Array.from(this.clients.values());
  }

  getAllPlatforms(): IntegrationPlatform[] {
    return Array.from(this.clients.keys());
  }
}

export const integrationRegistry = new IntegrationRegistry();
