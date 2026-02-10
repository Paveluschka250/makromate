import ProfileForm from "@/components/profile-form/ProfileForm";
import { useAuth } from "@/context/AuthContext";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CompleteProfile() {
  const { profile, updateProfile } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#102116" }} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ProfileForm
          initialProfile={profile}
          onSubmit={async (data) =>
            updateProfile({
              first_name: data.first_name,
              last_name: data.last_name,
              birth_date: data.birth_date,
              height_cm: data.height_cm,
              weight_kg: data.weight_kg,
              gender: data.gender,
              goal: data.goal,
            })
          }
          submitLabel="Speichern & fortfahren"
          title="Profil vervollständigen"
          subtitle="Gib deine Daten ein, um die App nutzen zu können."
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
