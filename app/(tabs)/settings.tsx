import ProfileHeader from "@/apphelpers/settings/components/ProfileHeader";
import { deleteAccount, verifyPassword } from "@/apphelpers/settings/functions/account";
import { pickAndUploadAvatar } from "@/apphelpers/settings/functions/avatar";
import styles from "@/apphelpers/settings/settings.style";
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";

export default function Settings() {
  const router = useRouter();
  const { user, profile, updateProfile, signOut } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handlePickAvatar = async () => {
    if (!user?.id) return;

    try {
      setUploading(true);
      await pickAndUploadAvatar(user, profile, updateProfile);
    } catch (e) {
      // optional: Logging/Fehlerhandling
      console.error(e);
    } finally {
      setUploading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!user?.email || !user?.id) return;

    if (!deletePassword.trim()) {
      setDeleteError("Bitte Passwort eingeben.");
      return;
    }

    setDeleteError(null);
    setDeleteLoading(true);

    const { error } = await verifyPassword(user.email, deletePassword);

    setDeleteLoading(false);

    if (error) {
      setDeleteError(error);
      return;
    }

    Alert.alert(
      "Konto löschen",
      "Bist du sicher, dass du dein Konto endgültig löschen möchtest? Dieser Vorgang kann nicht rückgängig gemacht werden.",
      [
        { text: "Abbrechen", style: "cancel" },
        {
          text: "Ja, Konto löschen",
          style: "destructive",
          onPress: () => {
            (async () => {
              try {
                await deleteAccount();

                Alert.alert(
                  "Konto gelöscht",
                  "Dein Konto wurde erfolgreich gelöscht.",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        signOut();
                      },
                    },
                  ]
                );
              } catch (e: any) {
                Alert.alert(
                  "Fehler",
                  e.message ?? "Dein Konto konnte nicht gelöscht werden. Bitte versuche es später erneut."
                );
              }
            })();
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.inner}>
        <ProfileHeader
          profile={profile}
          user={user}
          uploading={uploading}
          onPickAvatar={handlePickAvatar}
        />

        <View style={styles.actions}>
          <Button
            label="Profil bearbeiten"
            variant="outline"
            onPress={() => router.push("/edit-profile")}
          />
          <Button
            label="Abmelden"
            variant="outline"
            onPress={() => signOut()}
          />
          <Button
            label="Konto löschen"
            variant="danger"
            onPress={() => {
              setShowDeleteForm((prev) => !prev);
              setDeletePassword("");
              setDeleteError(null);
            }}
          />
        </View>

        {showDeleteForm && (
          <View style={styles.deleteSection}>
            <Input
              label="Passwort"
              placeholder="••••••••"
              leftIcon="lock"
              value={deletePassword}
              onChangeText={(t) => {
                setDeletePassword(t);
                setDeleteError(null);
              }}
              secureTextEntry
              error={!!deleteError}
              helperText={deleteError ?? undefined}
            />
            <View style={styles.deleteActions}>
              <Button
                label={deleteLoading ? "Wird geprüft…" : "Endgültig löschen"}
                variant="danger"
                onPress={handleConfirmDelete}
                disabled={deleteLoading}
              />
              <Button
                label="Abbrechen"
                variant="outline"
                onPress={() => {
                  setShowDeleteForm(false);
                  setDeletePassword("");
                  setDeleteError(null);
                }}
                disabled={deleteLoading}
              />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
