-- ============================================
-- Helfer-Funktion: Account-Daten aufräumen
-- ============================================
-- Im Supabase SQL Editor einfügen und ausführen (Run).
-- Danach kannst du z.B. per RPC oder manuell:
--   select public.delete_account_data('USER_UUID_HIER'::uuid);
-- aufrufen, um alle App-Daten eines Users zu löschen.

create or replace function public.delete_account_data(target_user_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  -- Nur die eigenen Daten dürfen gelöscht werden
  if auth.uid() is distinct from target_user_id then
    raise exception 'Nur das eigene Konto darf gelöscht werden.';
  end if;

  -- Profil-Eintrag löschen
  delete from public.profiles
  where id = target_user_id;

  -- Später weitere User-Tabellen hier ergänzen, z.B.:
  -- delete from public.andere_tabelle where user_id = target_user_id;
end;
$$;

comment on function public.delete_account_data(uuid) is
  'Löscht alle App-Daten für einen User (z.B. Eintrag in public.profiles).';
