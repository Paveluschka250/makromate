-- ============================================
-- Profiles-Tabelle (mit auth.users verknüpft)
-- ============================================

-- Tabelle anlegen
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  last_name text,
  birth_date date,
  height_cm integer check (height_cm is null or (height_cm >= 50 and height_cm <= 250)),
  weight_kg numeric(5,2) check (weight_kg is null or (weight_kg >= 20 and weight_kg <= 500)),
  gender text check (gender is null or gender in ('male', 'female', 'diverse', 'other')),
  goal text check (goal is null or goal in ('lose_weight', 'gain_weight', 'maintain')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

comment on table public.profiles is 'Erweiterte User-Daten, 1:1 mit auth.users';
comment on column public.profiles.goal is 'lose_weight=abnehmen, gain_weight=zunehmen, maintain=Gewicht halten';

-- Row Level Security (RLS): ohne Policy kann niemand auf die Tabelle zugreifen
alter table public.profiles enable row level security;

-- Jeder User darf nur seine eigene Zeile lesen
create policy "User kann eigenes Profil lesen"
  on public.profiles for select
  using (auth.uid() = id);

-- Jeder User darf nur seine eigene Zeile anlegen (wird auch vom Trigger genutzt)
create policy "User kann eigenes Profil anlegen"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Jeder User darf nur seine eigene Zeile aktualisieren
create policy "User kann eigenes Profil aktualisieren"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Optional: User darf eigenes Profil löschen (z.B. Account-Löschung)
create policy "User kann eigenes Profil löschen"
  on public.profiles for delete
  using (auth.uid() = id);

-- Trigger: updated_at bei jedem UPDATE setzen
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Trigger: Beim neuen Auth-User automatisch eine leere Profil-Zeile anlegen
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
