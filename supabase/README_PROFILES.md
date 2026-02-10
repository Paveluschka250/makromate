# Profiles-Tabelle anlegen

## Option A: Im Supabase Dashboard (empfohlen für den Start)

1. Öffne dein Projekt: https://supabase.com/dashboard → Projekt auswählen
2. Links **SQL Editor** öffnen
3. **New query** klicken
4. Den kompletten Inhalt von `migrations/001_create_profiles.sql` hineinkopieren
5. **Run** (oder Strg+Enter) ausführen

Fertig. Die Tabelle `profiles` existiert jetzt und wird bei jeder neuen Registrierung automatisch mit einer Zeile pro User befüllt.

## Option B: Mit Supabase CLI

Falls du die Supabase CLI eingerichtet hast:

```bash
supabase db push
```

oder die Migration manuell ausführen (Connection-String aus Dashboard → Settings → Database).

## Spalten-Übersicht

| Spalte       | Typ        | Bedeutung |
|-------------|------------|-----------|
| id          | uuid       | = auth.users.id (Verknüpfung) |
| first_name  | text       | Vorname |
| last_name   | text       | Nachname |
| birth_date  | date       | Geburtstag |
| height_cm   | integer    | Größe in cm (50–250) |
| weight_kg   | numeric    | Gewicht in kg (20–500) |
| gender      | text       | `male`, `female`, `diverse`, `other` |
| goal        | text       | `lose_weight`, `gain_weight`, `maintain` |
| created_at  | timestamptz | Erstellt am |
| updated_at  | timestamptz | Zuletzt geändert |

**goal:** `lose_weight` = abnehmen, `gain_weight` = zunehmen, `maintain` = Gewicht halten.

## Bereits existierende User

Falls vor dem Anlegen der Tabelle schon User registriert waren: Für diese wird keine Zeile in `profiles` angelegt (der Trigger gilt nur für neue Registrierungen). Einmal im SQL Editor ausführen:

```sql
insert into public.profiles (id)
select id from auth.users
where id not in (select id from public.profiles);
```
