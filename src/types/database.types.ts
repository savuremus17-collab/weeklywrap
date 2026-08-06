export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string | null
          name: string | null
          avatar_url: string | null
          role: 'freelancer' | 'creator' | 'agency' | 'professional' | null
          onboarding_completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          name?: string | null
          avatar_url?: string | null
          role?: 'freelancer' | 'creator' | 'agency' | 'professional' | null
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          name?: string | null
          avatar_url?: string | null
          role?: 'freelancer' | 'creator' | 'agency' | 'professional' | null
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_type: 'free' | 'pro' | 'yearly' | 'founding' | 'agency' | null
          stripe_subscription_id: string | null
          stripe_customer_id: string | null
          status: string | null
          current_period_start: string | null
          current_period_end: string | null
          founding_member: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_type?: 'free' | 'pro' | 'yearly' | 'founding' | 'agency' | null
          stripe_subscription_id?: string | null
          stripe_customer_id?: string | null
          status?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          founding_member?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_type?: 'free' | 'pro' | 'yearly' | 'founding' | 'agency' | null
          stripe_subscription_id?: string | null
          stripe_customer_id?: string | null
          status?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          founding_member?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string | null
          company: string | null
          logo_url: string | null
          brand_color: string | null
          custom_branding: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email?: string | null
          company?: string | null
          logo_url?: string | null
          brand_color?: string | null
          custom_branding?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string | null
          company?: string | null
          logo_url?: string | null
          brand_color?: string | null
          custom_branding?: Json
          created_at?: string
          updated_at?: string
        }
      }
      reports: {
        Row: {
          id: string
          user_id: string
          client_id: string | null
          title: string
          week_start: string
          week_end: string
          status: 'draft' | 'published' | 'sent'
          content: Json
          ai_summary: string | null
          productivity_score: number | null
          growth_score: number | null
          momentum_score: number | null
          pdf_url: string | null
          share_url: string | null
          branding: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          client_id?: string | null
          title: string
          week_start: string
          week_end: string
          status?: 'draft' | 'published' | 'sent'
          content?: Json
          ai_summary?: string | null
          productivity_score?: number | null
          growth_score?: number | null
          momentum_score?: number | null
          pdf_url?: string | null
          share_url?: string | null
          branding?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          client_id?: string | null
          title?: string
          week_start?: string
          week_end?: string
          status?: 'draft' | 'published' | 'sent'
          content?: Json
          ai_summary?: string | null
          productivity_score?: number | null
          growth_score?: number | null
          momentum_score?: number | null
          pdf_url?: string | null
          share_url?: string | null
          branding?: Json
          created_at?: string
          updated_at?: string
        }
      }
      analytics: {
        Row: {
          id: string
          user_id: string
          date: string
          metric_type: string
          metric_value: number
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date?: string
          metric_type: string
          metric_value?: number
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          metric_type?: string
          metric_value?: number
          metadata?: Json
          created_at?: string
        }
      }
      integrations: {
        Row: {
          id: string
          user_id: string
          integration_type: 'notion' | 'slack' | 'calendar' | 'youtube' | 'tiktok' | 'twitter' | 'linkedin' | 'gmail'
          connected: boolean
          credentials: Json
          last_synced: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          integration_type: 'notion' | 'slack' | 'calendar' | 'youtube' | 'tiktok' | 'twitter' | 'linkedin' | 'gmail'
          connected?: boolean
          credentials?: Json
          last_synced?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          integration_type?: 'notion' | 'slack' | 'calendar' | 'youtube' | 'tiktok' | 'twitter' | 'linkedin' | 'gmail'
          connected?: boolean
          credentials?: Json
          last_synced?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      activity_logs: {
        Row: {
          id: string
          user_id: string
          activity_type: string
          description: string | null
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          activity_type: string
          description?: string | null
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          activity_type?: string
          description?: string | null
          metadata?: Json
          created_at?: string
        }
      }
      ai_generations: {
        Row: {
          id: string
          user_id: string
          generation_type: string
          prompt: string | null
          result: string | null
          tokens_used: number | null
          model: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          generation_type: string
          prompt?: string | null
          result?: string | null
          tokens_used?: number | null
          model?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          generation_type?: string
          prompt?: string | null
          result?: string | null
          tokens_used?: number | null
          model?: string | null
          created_at?: string
        }
      }
      referrals: {
        Row: {
          id: string
          referrer_id: string
          referee_id: string | null
          code: string
          status: string | null
          reward_claimed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          referrer_id: string
          referee_id?: string | null
          code: string
          status?: string | null
          reward_claimed?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          referrer_id?: string
          referee_id?: string | null
          code?: string
          status?: string | null
          reward_claimed?: boolean
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: string | null
          title: string | null
          message: string | null
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type?: string | null
          title?: string | null
          message?: string | null
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string | null
          title?: string | null
          message?: string | null
          read?: boolean
          created_at?: string
        }
      }
      email_logs: {
        Row: {
          id: string
          user_id: string
          client_id: string | null
          report_id: string | null
          recipient: string
          subject: string | null
          status: string | null
          sent_at: string | null
          opened_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          client_id?: string | null
          report_id?: string | null
          recipient: string
          subject?: string | null
          status?: string | null
          sent_at?: string | null
          opened_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          client_id?: string | null
          report_id?: string | null
          recipient?: string
          subject?: string | null
          status?: string | null
          sent_at?: string | null
          opened_at?: string | null
          created_at?: string
        }
      }
      founding_member_spots: {
        Row: {
          id: string
          total_spots: number
          claimed_spots: number
          disabled: boolean
        }
        Insert: {
          id?: string
          total_spots?: number
          claimed_spots?: number
          disabled?: boolean
        }
        Update: {
          id?: string
          total_spots?: number
          claimed_spots?: number
          disabled?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
