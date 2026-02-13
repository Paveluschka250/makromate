-- ============================================
-- Kategorien für Lebensmittel (Referenztabelle)
-- ============================================
-- Jeder kann lesen; Änderungen nur über Service-Role/Admin.
-- Wird später mit der persönlichen Food-Liste der User verknüpft.

create table public.food_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  icon_set text not null default 'feather'
    check (icon_set in ('feather', 'material', 'ionicons')),
  icon_name text not null,
  created_at timestamptz default now() not null,
  unique (name)
);

comment on table public.food_categories is 'Kategorien für Lebensmittel; Referenztabelle, jeder darf lesen.';
comment on column public.food_categories.icon_set is 'Icon-Bibliothek: feather, material, ionicons';
comment on column public.food_categories.icon_name is 'Icon-Name in der gewählten Bibliothek';

-- Lesezugriff für alle (authenticated)
alter table public.food_categories enable row level security;

create policy "Jeder darf Kategorien lesen"
  on public.food_categories
  for select
  to authenticated
  using (true);

-- Optional: Ein paar Standard-Kategorien
insert into public.food_categories (name, icon_set, icon_name) values
  ('Obst',           'feather', 'apple'),
  ('Gemüse',         'feather', 'sun'),
  ('Fleisch',        'feather', 'package'),
  ('Fisch',          'material', 'fish'),
  ('Milchprodukte',  'feather', 'droplet'),
  ('Getreide',       'feather', 'circle'),
  ('Sonstiges',      'feather', 'package')
on conflict (name) do nothing;
