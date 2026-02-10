import ProfileForm from "@/components/profile-form/ProfileForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfile() {
  const router = useRouter();
  const { profile, updateProfile } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#102116" }} edges={["bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ProfileForm
          initialProfile={profile}
          onSubmit={async (data) => {
            const result = await updateProfile({
              first_name: data.first_name,
              last_name: data.last_name,
              birth_date: data.birth_date,
              height_cm: data.height_cm,
              weight_kg: data.weight_kg,
              gender: data.gender,
              goal: data.goal,
            });
            if (!result.error) router.replace("/(tabs)/settings" as never);
            return result;
          }}
          submitLabel="Speichern"
          title="Profil bearbeiten"
          subtitle="Passe deine Daten an."
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
