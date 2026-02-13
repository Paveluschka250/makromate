-- ============================================
-- User-Foods: persönliche Lebensmittel-Liste
-- ============================================
-- Jeder User darf nur eigene Einträge lesen/bearbeiten/löschen.
-- Beim Löschen des Users werden alle seine Foods mitgelöscht (CASCADE).

create table public.user_foods (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  category_id uuid not null references public.food_categories(id) on delete restrict,
  calories_per_100g numeric(6, 2) not null check (calories_per_100g >= 0 and calories_per_100g <= 9999),
  protein_per_100g numeric(5, 2) not null check (protein_per_100g >= 0 and protein_per_100g <= 999),
  default_portion_grams integer check (default_portion_grams is null or (default_portion_grams > 0 and default_portion_grams <= 10000)),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

comment on table public.user_foods is 'Lebensmittel, die User zu ihrer Liste hinzugefügt haben.';
comment on column public.user_foods.default_portion_grams is 'Standardportion in Gramm (am häufigsten gewählte Menge).';

create index user_foods_user_id_idx on public.user_foods (user_id);
create index user_foods_category_id_idx on public.user_foods (category_id);

-- updated_at bei UPDATE setzen (Funktion existiert ggf. schon aus profiles)
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger user_foods_updated_at
  before update on public.user_foods
  for each row execute function public.set_updated_at();

-- RLS: User darf nur eigene Einträge sehen und ändern
alter table public.user_foods enable row level security;

create policy "User darf eigene Foods lesen"
  on public.user_foods for select
  to authenticated
  using (auth.uid() = user_id);

create policy "User darf eigene Foods anlegen"
  on public.user_foods for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "User darf eigene Foods bearbeiten"
  on public.user_foods for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "User darf eigene Foods löschen"
  on public.user_foods for delete
  to authenticated
  using (auth.uid() = user_id);
