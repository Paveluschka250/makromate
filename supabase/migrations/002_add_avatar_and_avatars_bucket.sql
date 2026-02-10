-- ============================================
-- Avatar-Spalte + Storage-Bucket "avatars"
-- ============================================

-- 1) Avatar-Spalte in profiles-Tabelle

alter table public.profiles
  add column if not exists avatar_url text;

comment on column public.profiles.avatar_url is
  'URL zum Profilbild (Supabase Storage, z.B. Bucket "avatars")';


-- 2) Storage-Bucket "avatars" anlegen (öffentlich lesbar)

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;


-- 3) RLS-Policies für Bucket "avatars"

-- Jeder darf Dateien aus "avatars" lesen
drop policy if exists "Public read access for avatars" on storage.objects;
create policy "Public read access for avatars"
  on storage.objects
  for select
  using (bucket_id = 'avatars');

-- Eingeloggte User dürfen in "avatars" hochladen
drop policy if exists "Authenticated users can upload avatars" on storage.objects;
create policy "Authenticated users can upload avatars"
  on storage.objects
  for insert
  with check (bucket_id = 'avatars' and auth.role() = 'authenticated');

-- Eingeloggte User dürfen Dateien in "avatars" ändern
drop policy if exists "Authenticated users can update avatars" on storage.objects;
create policy "Authenticated users can update avatars"
  on storage.objects
  for update
  using (bucket_id = 'avatars' and auth.role() = 'authenticated');

-- Eingeloggte User dürfen Dateien in "avatars" löschen
drop policy if exists "Authenticated users can delete avatars" on storage.objects;
create policy "Authenticated users can delete avatars"
  on storage.objects
  for delete
  using (bucket_id = 'avatars' and auth.role() = 'authenticated');

