import Button from "@/components/button/button";
import Input from "@/components/input/input";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import {
  birthDateToDate,
  dateToBirthDateString,
  formatBirthDateForInput,
  parseBirthDate,
} from "./profile-form.utils";
import styles from "./profile-form.style";
import {
  type ProfileFormProps,
  type ProfileGender,
  type ProfileGoal,
  GENDER_OPTIONS,
  GOAL_OPTIONS,
} from "./profile-form.types";

export type { ProfileFormData, ProfileFormProps } from "./profile-form.types";

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
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (showDatePicker) {
      console.log("[ProfileForm] DateTimePicker gestartet");
    }
  }, [showDatePicker]);

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
        <Pressable
          onPress={() => {
            console.log("[ProfileForm] Geburtstag-Input geklickt");
            setShowDatePicker(true);
          }}
        >
          <View pointerEvents="none">
            <Input
              label="Geburtstag"
              placeholder="TT.MM.JJJJ (z.B. 15.03.1990)"
              leftIcon="calendar"
              value={birthDateInput}
              editable={false}
            />
          </View>
        </Pressable>
        {showDatePicker && (
          <>
            <DateTimePicker
              value={birthDateToDate(birthDateInput)}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              maximumDate={new Date()}
              onChange={(_, selectedDate) => {
                if (Platform.OS === "android") setShowDatePicker(false);
                if (selectedDate) {
                  setBirthDateInput(
                    formatBirthDateForInput(dateToBirthDateString(selectedDate))
                  );
                  setError(null);
                }
              }}
            />
            {Platform.OS === "ios" && (
              <View style={styles.datePickerActions}>
                <Button
                  label="Fertig"
                  variant="primary"
                  onPress={() => setShowDatePicker(false)}
                />
              </View>
            )}
          </>
        )}
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
