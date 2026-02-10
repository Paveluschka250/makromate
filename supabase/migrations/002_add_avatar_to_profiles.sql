-- Avatar-Spalte für Profile hinzufügen

alter table public.profiles
  add column if not exists avatar_url text;

comment on column public.profiles.avatar_url is 'URL zum Profilbild (Supabase Storage, z.B. Bucket \"avatars\")';

