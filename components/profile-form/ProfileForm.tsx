import Button from "@/components/button/button";
import Input from "@/components/input/input";
import type { Profile, ProfileGender, ProfileGoal } from "@/lib/supabase.types";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  formatBirthDateForInput,
  parseBirthDate,
} from "./profile-form.utils";

const GENDER_OPTIONS: { value: ProfileGender; label: string }[] = [
  { value: "male", label: "Männlich" },
  { value: "female", label: "Weiblich" },
  { value: "diverse", label: "Divers" },
  { value: "other", label: "Sonstige" },
];

const GOAL_OPTIONS: { value: ProfileGoal; label: string }[] = [
  { value: "lose_weight", label: "Abnehmen" },
  { value: "gain_weight", label: "Zunehmen" },
  { value: "maintain", label: "Gewicht halten" },
];

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

export default function ProfileForm({
  initialProfile,
  onSubmit,
  submitLabel,
  title = "Profil",
  subtitle = "Gib deine Daten ein.",
}: ProfileFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDateInput, setBirthDateInput] = useState("");
  const [heightInput, setHeightInput] = useState("");
  const [weightInput, setWeightInput] = useState("");
  const [gender, setGender] = useState<ProfileGender | null>(null);
  const [goal, setGoal] = useState<ProfileGoal | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!initialProfile) return;
    setFirstName(initialProfile.first_name ?? "");
    setLastName(initialProfile.last_name ?? "");
    setBirthDateInput(formatBirthDateForInput(initialProfile.birth_date));
    setHeightInput(
      initialProfile.height_cm != null ? String(initialProfile.height_cm) : ""
    );
    setWeightInput(
      initialProfile.weight_kg != null ? String(initialProfile.weight_kg) : ""
    );
    setGender(initialProfile.gender ?? null);
    setGoal(initialProfile.goal ?? null);
  }, [initialProfile]);

  const handleSubmit = async () => {
    setError(null);
    const first = firstName.trim();
    const last = lastName.trim();
    if (!first) {
      setError("Bitte Vorname eingeben.");
      return;
    }
    if (!last) {
      setError("Bitte Nachname eingeben.");
      return;
    }
    const birthDate = parseBirthDate(birthDateInput);
    if (!birthDate) {
      setError(
        "Bitte Geburtstag im Format TT.MM.JJJJ eingeben (z.B. 15.03.1990)."
      );
      return;
    }
    const height = heightInput.trim() ? parseInt(heightInput.trim(), 10) : null;
    if (height == null || Number.isNaN(height) || height < 50 || height > 250) {
      setError("Bitte Größe in cm eingeben (50–250).");
      return;
    }
    const weightStr = weightInput.trim().replace(",", ".");
    const weight = weightStr ? parseFloat(weightStr) : null;
    if (
      weight == null ||
      Number.isNaN(weight) ||
      weight < 20 ||
      weight > 500
    ) {
      setError("Bitte Gewicht in kg eingeben (20–500).");
      return;
    }
    if (!gender) {
      setError("Bitte Geschlecht auswählen.");
      return;
    }
    if (!goal) {
      setError("Bitte Ziel auswählen.");
      return;
    }

    setLoading(true);
    const { error: submitError } = await onSubmit({
      first_name: first,
      last_name: last,
      birth_date: birthDate,
      height_cm: height,
      weight_kg: weight,
      gender,
      goal,
    });
    setLoading(false);
    if (submitError) {
      setError(submitError.message);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <View style={styles.form}>
        <Input
          label="Vorname"
          placeholder="Max"
          leftIcon="user"
          value={firstName}
          onChangeText={(t) => {
            setFirstName(t);
            setError(null);
          }}
        />
        <Input
          label="Nachname"
          placeholder="Mustermann"
          leftIcon="user"
          value={lastName}
          onChangeText={(t) => {
            setLastName(t);
            setError(null);
          }}
        />
        <Input
          label="Geburtstag"
          placeholder="TT.MM.JJJJ (z.B. 15.03.1990)"
          leftIcon="calendar"
          value={birthDateInput}
          onChangeText={(t) => {
            setBirthDateInput(t);
            setError(null);
          }}
        />
        <Input
          label="Größe (cm)"
          placeholder="175"
          leftIcon="maximize-2"
          value={heightInput}
          onChangeText={(t) => {
            setHeightInput(t.replace(/\D/g, ""));
            setError(null);
          }}
        />
        <Input
          label="Gewicht (kg)"
          placeholder="70"
          leftIcon="package"
          value={weightInput}
          onChangeText={(t) => {
            setWeightInput(t);
            setError(null);
          }}
        />

        <Text style={styles.fieldLabel}>Geschlecht</Text>
        <View style={styles.chipRow}>
          {GENDER_OPTIONS.map((opt) => (
            <Button
              key={opt.value}
              label={opt.label}
              variant="chip"
              active={gender === opt.value}
              onPress={() => {
                setGender(opt.value);
                setError(null);
              }}
            />
          ))}
        </View>

        <Text style={styles.fieldLabel}>Ziel</Text>
        <View style={styles.chipRow}>
          {GOAL_OPTIONS.map((opt) => (
            <Button
              key={opt.value}
              label={opt.label}
              variant="chip"
              active={goal === opt.value}
              onPress={() => {
                setGoal(opt.value);
                setError(null);
              }}
            />
          ))}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <View style={styles.submitButton}>
          <Button
            label={loading ? "Wird gespeichert…" : submitLabel}
            variant="primary"
            onPress={handleSubmit}
            disabled={loading}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#dcfce7",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#7f9d8c",
    marginBottom: 32,
  },
  form: {
    gap: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7f9d8c",
    marginBottom: 4,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  errorText: {
    fontSize: 14,
    color: "#ef4444",
    marginTop: 4,
  },
  submitButton: {
    marginTop: 16,
  },
});
