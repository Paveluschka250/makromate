export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

/** Geschlecht (Werte wie in DB) */
export type ProfileGender = "male" | "female" | "diverse" | "other";

/** Ziel (Werte wie in DB) */
export type ProfileGoal = "lose_weight" | "gain_weight" | "maintain";

export type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  birth_date: string | null; // ISO date "YYYY-MM-DD"
  height_cm: number | null;
  weight_kg: number | null;
  gender: ProfileGender | null;
  goal: ProfileGoal | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "created_at" | "updated_at"> & {
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Profile, "id" | "created_at">> & {
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
