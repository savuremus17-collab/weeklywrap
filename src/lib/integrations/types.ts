export type IntegrationPlatform = 
  | 'notion' 
  | 'slack' 
  | 'google_calendar' 
  | 'youtube' 
  | 'tiktok' 
  | 'twitter' 
  | 'linkedin' 
  | 'gmail';

export type IntegrationStatus = 'connected' | 'disconnected' | 'error' | 'expired';

export interface IntegrationConnection {
  id: string;
  userId: string;
  platform: IntegrationPlatform;
  status: IntegrationStatus;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface IntegrationDataPayload {
  platform: IntegrationPlatform;
  data: any;
  timestamp: Date;
}

export interface IntegrationClient {
  platform: IntegrationPlatform;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  fetchData(startDate: Date, endDate: Date): Promise<IntegrationDataPayload>;
  handleWebhook?(payload: any): Promise<void>;
}
