-- Add columns used by the account Settings page that were missing
-- from the original schema (company, timezone, currency, notifications).
-- Safe to run even if some columns already exist, thanks to IF NOT EXISTS.

alter table public.users
    add column if not exists company text,
    add column if not exists timezone text default 'Europe/Bucharest (UTC +2)',
    add column if not exists currency text default 'EUR (€) - Euro',
    add column if not exists notifications jsonb default '{
        "emailReports": true,
        "clientActivity": true,
        "aiInsights": true,
        "productivityAlerts": false,
        "billingUpdates": true,
        "marketingEmails": false
    }'::jsonb;
