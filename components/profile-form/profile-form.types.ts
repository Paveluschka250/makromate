import type { Profile, ProfileGender, ProfileGoal } from "@/lib/supabase.types";

export type ProfileFormData = {
  first_name: string;
  last_name: string;
  birth_date: string;
  height_cm: number;
  weight_kg: number;
  gender: ProfileGender;
  goal: ProfileGoal;
};

export type ProfileFormProps = {
  initialProfile: Profile | null;
  onSubmit: (data: ProfileFormData) => Promise<{ error: Error | null }>;
  submitLabel: string;
  title?: string;
  subtitle?: string;
};

export type GenderOption = { value: ProfileGender; label: string };
export type GoalOption = { value: ProfileGoal; label: string };

export const GENDER_OPTIONS: GenderOption[] = [
  { value: "male", label: "Männlich" },
  { value: "female", label: "Weiblich" },
  { value: "diverse", label: "Divers" },
  { value: "other", label: "Sonstige" },
];

export const GOAL_OPTIONS: GoalOption[] = [
  { value: "lose_weight", label: "Abnehmen" },
  { value: "gain_weight", label: "Zunehmen" },
  { value: "maintain", label: "Gewicht halten" },
];

export type { ProfileGender, ProfileGoal } from "@/lib/supabase.types";
