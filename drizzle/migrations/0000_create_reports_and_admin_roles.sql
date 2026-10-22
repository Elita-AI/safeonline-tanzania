create type public.app_role as enum ('admin', 'moderator', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create policy "Users can read own roles"
  on public.user_roles for select to authenticated
  using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  category text not null check (char_length(category) between 1 and 80),
  description text not null check (char_length(description) between 1 and 4000),
  region text check (region is null or char_length(region) between 1 and 80),
  contact text check (contact is null or char_length(contact) between 1 and 200),
  consent_given boolean not null,
  status text not null default 'new' check (status in ('new', 'in_progress', 'closed')),
  admin_notes text check (admin_notes is null or char_length(admin_notes) <= 2000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant insert on public.reports to anon, authenticated;
grant select, update on public.reports to authenticated;
grant all on public.reports to service_role;

alter table public.reports enable row level security;

create policy "Anyone can submit a report with consent"
  on public.reports for insert to anon, authenticated
  with check (consent_given = true);

create policy "Admins can read all reports"
  on public.reports for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update reports"
  on public.reports for update to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create index reports_created_at_idx on public.reports (created_at desc);
create index reports_status_idx on public.reports (status);