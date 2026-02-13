-- Sicherstellen, dass profiles beim Löschen von auth.users automatisch mitgelöscht wird.
-- Regel: public.profiles.id -> auth.users.id ON DELETE CASCADE

alter table public.profiles
  drop constraint if exists profiles_id_fkey;

alter table public.profiles
  add constraint profiles_id_fkey
  foreign key (id)
  references auth.users(id)
  on delete cascade;
