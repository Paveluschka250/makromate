import type { Profile } from "@/lib/supabase.types";

/** User-Objekt aus Auth (minimal für Settings-Anzeige) */
export type SettingsUser = {
  id: string;
  email?: string | null;
} | null;

export type ProfileHeaderProps = {
  profile: Profile | null;
  user: SettingsUser;
  uploading: boolean;
  onPickAvatar: () => void;
};
