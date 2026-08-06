-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- 1. Users table (extends auth.users)
create table public.users (
    id uuid references auth.users on delete cascade primary key,
    email text unique,
    name text,
    avatar_url text,
    role text check (role in ('freelancer', 'creator', 'agency', 'professional')),
    onboarding_completed boolean default false,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

-- 2. Subscriptions table
create table public.subscriptions (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.users(id) on delete cascade not null,
    plan_type text check (plan_type in ('free', 'pro', 'yearly', 'founding', 'agency')),
    stripe_subscription_id text unique,
    stripe_customer_id text,
    status text,
    current_period_start timestamptz,
    current_period_end timestamptz,
    founding_member boolean default false,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

-- 3. Clients table
create table public.clients (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.users(id) on delete cascade not null,
    name text not null,
    email text,
    company text,
    logo_url text,
    brand_color text,
    custom_branding jsonb default '{}'::jsonb,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

-- 4. Reports table
create table public.reports (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.users(id) on delete cascade not null,
    client_id uuid references public.clients(id) on delete set null,
    title text not null,
    week_start date not null,
    week_end date not null,
    status text check (status in ('draft', 'published', 'sent')) default 'draft',
    content jsonb default '{}'::jsonb,
    ai_summary text,
    productivity_score integer,
    growth_score integer,
    momentum_score integer,
    pdf_url text,
    share_url text,
    branding jsonb default '{}'::jsonb,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

-- 5. Analytics table
create table public.analytics (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.users(id) on delete cascade not null,
    date date default current_date not null,
    metric_type text not null,
    metric_value numeric default 0,
    metadata jsonb default '{}'::jsonb,
    created_at timestamptz default now() not null
);

-- 6. Integrations table
create table public.integrations (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.users(id) on delete cascade not null,
    integration_type text check (integration_type in ('notion', 'slack', 'calendar', 'youtube', 'tiktok', 'twitter', 'linkedin', 'gmail')),
    connected boolean default false,
    credentials jsonb default '{}'::jsonb,
    last_synced timestamptz,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null,
    unique(user_id, integration_type)
);

-- 7. Activity logs table
create table public.activity_logs (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.users(id) on delete cascade not null,
    activity_type text not null,
    description text,
    metadata jsonb default '{}'::jsonb,
    created_at timestamptz default now() not null
);

-- 8. AI Generations table
create table public.ai_generations (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.users(id) on delete cascade not null,
    generation_type text not null,
    prompt text,
    result text,
    tokens_used integer,
    model text,
    created_at timestamptz default now() not null
);

-- 9. Referrals table
create table public.referrals (
    id uuid default uuid_generate_v4() primary key,
    referrer_id uuid references public.users(id) on delete cascade not null,
    referee_id uuid references public.users(id) on delete set null,
    code text unique not null,
    status text,
    reward_claimed boolean default false,
    created_at timestamptz default now() not null
);

-- 10. Notifications table
create table public.notifications (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.users(id) on delete cascade not null,
    type text,
    title text,
    message text,
    read boolean default false,
    created_at timestamptz default now() not null
);

-- 11. Email logs table
create table public.email_logs (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.users(id) on delete cascade not null,
    client_id uuid references public.clients(id) on delete set null,
    report_id uuid references public.reports(id) on delete set null,
    recipient text not null,
    subject text,
    status text,
    sent_at timestamptz default now(),
    opened_at timestamptz,
    created_at timestamptz default now() not null
);

-- 12. Founding member spots table
create table public.founding_member_spots (
    id uuid default uuid_generate_v4() primary key,
    total_spots integer default 50,
    claimed_spots integer default 0,
    disabled boolean default false
);

-- Enable RLS
alter table public.users enable row level security;
alter table public.subscriptions enable row level security;
alter table public.clients enable row level security;
alter table public.reports enable row level security;
alter table public.analytics enable row level security;
alter table public.integrations enable row level security;
alter table public.activity_logs enable row level security;
alter table public.ai_generations enable row level security;
alter table public.referrals enable row level security;
alter table public.notifications enable row level security;
alter table public.email_logs enable row level security;
alter table public.founding_member_spots enable row level security;

-- RLS Policies

-- Users: users can read and update their own data
create policy "Users can view own profile" on public.users for select using (auth.uid() = id);
create policy "Users can update own profile" on public.users for update using (auth.uid() = id);

-- Subscriptions: users can read their own subscriptions
create policy "Users can view own subscriptions" on public.subscriptions for select using (auth.uid() = user_id);

-- Clients: users can manage their own clients
create policy "Users can manage own clients" on public.clients for all using (auth.uid() = user_id);

-- Reports: users can manage their own reports
create policy "Users can manage own reports" on public.reports for all using (auth.uid() = user_id);

-- Analytics: users can manage their own analytics
create policy "Users can manage own analytics" on public.analytics for all using (auth.uid() = user_id);

-- Integrations: users can manage their own integrations
create policy "Users can manage own integrations" on public.integrations for all using (auth.uid() = user_id);

-- Activity Logs: users can manage their own activity logs
create policy "Users can manage own activity logs" on public.activity_logs for all using (auth.uid() = user_id);

-- AI Generations: users can manage their own AI generations
create policy "Users can manage own AI generations" on public.ai_generations for all using (auth.uid() = user_id);

-- Referrals: users can view their own referrals
create policy "Users can view own referrals" on public.referrals for select using (auth.uid() = referrer_id);

-- Notifications: users can manage their own notifications
create policy "Users can manage own notifications" on public.notifications for all using (auth.uid() = user_id);

-- Email Logs: users can view their own email logs
create policy "Users can view own email logs" on public.email_logs for select using (auth.uid() = user_id);

-- Founding Member Spots: everyone can read, no one can update except service role (implied)
create policy "Founding member spots are viewable by everyone" on public.founding_member_spots for select using (true);

-- Indexes
create index idx_users_created_at on public.users(created_at);
create index idx_subscriptions_user_id on public.subscriptions(user_id);
create index idx_clients_user_id on public.clients(user_id);
create index idx_reports_user_id on public.reports(user_id);
create index idx_reports_client_id on public.reports(client_id);
create index idx_analytics_user_id on public.analytics(user_id);
create index idx_analytics_date on public.analytics(date);
create index idx_integrations_user_id on public.integrations(user_id);
create index idx_activity_logs_user_id on public.activity_logs(user_id);
create index idx_ai_generations_user_id on public.ai_generations(user_id);
create index idx_referrals_referrer_id on public.referrals(referrer_id);
create index idx_notifications_user_id on public.notifications(user_id);
create index idx_notifications_read on public.notifications(read);
create index idx_email_logs_user_id on public.email_logs(user_id);

-- GIN indexes for JSONB
create index idx_reports_content_gin on public.reports using gin (content);
create index idx_analytics_metadata_gin on public.analytics using gin (metadata);
create index idx_activity_logs_metadata_gin on public.activity_logs using gin (metadata);

-- Handle updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger users_updated_at before update on public.users for each row execute procedure public.handle_updated_at();
create trigger subscriptions_updated_at before update on public.subscriptions for each row execute procedure public.handle_updated_at();
create trigger clients_updated_at before update on public.clients for each row execute procedure public.handle_updated_at();
create trigger reports_updated_at before update on public.reports for each row execute procedure public.handle_updated_at();
create trigger integrations_updated_at before update on public.integrations for each row execute procedure public.handle_updated_at();

-- Trigger for new user on auth signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.users (id, email, name, avatar_url)
    values (new.id, new.email, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'avatar_url');
    return new;
end;
$$ language plpgsql;

create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();
/home/engine/.bashrc: line 1: syntax error near unexpected token `('
/home/engine/.bashrc: line 1: `. /etc/profile.d/workload-containment.shn# ~/.bashrc: executed by bash(1) for non-login shells.'
/home/engine/.bashrc: line 1: syntax error near unexpected token `('
/home/engine/.bashrc: line 1: `. /etc/profile.d/workload-containment.shn# ~/.bashrc: executed by bash(1) for non-login shells.'
/home/engine/.bashrc: line 1: syntax error near unexpected token `('
/home/engine/.bashrc: line 1: `. /etc/profile.d/workload-containment.shn# ~/.bashrc: executed by bash(1) for non-login shells.'
