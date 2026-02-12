import ProfileHeader from "@/apphelpers/settings/components/ProfileHeader";
import styles from "@/apphelpers/settings/settings.style";
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";
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

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled || !result.assets?.length) {
      return;
    }

    const asset = result.assets[0];
    try {
      setUploading(true);
      if (profile?.avatar_url) {
        const url = profile.avatar_url;
        const parts = url.split("/avatars/");
        const oldPath = parts.length === 2 ? parts[1] : null;
        if (oldPath) {
          await supabase.storage.from("avatars").remove([oldPath]);
        }
      }

      const fileExt = asset.uri.split(".").pop() ?? "jpg";
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const base64 = await FileSystem.readAsStringAsync(asset.uri, {
        encoding: "base64",
      });
      const fileData = decode(base64);

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, fileData, {
          upsert: true,
          contentType: asset.mimeType ?? "image/jpeg",
        });

      if (uploadError) {
        return;
      }

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      const publicUrl = data.publicUrl;
      const { error: updateError } = await updateProfile({
        avatar_url: publicUrl,
      });
      if (updateError) {
        // optional: Logging/Fehlerhandling
      }
    } catch (e) {
      // optional: Logging/Fehlerhandling
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

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: deletePassword,
    });

    setDeleteLoading(false);

    if (authError) {
      setDeleteError("Passwort ist falsch.");
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
                const { data, error } = await supabase.functions.invoke(
                  "delete-account"
                );

                if (error) {
                  Alert.alert(
                    "Fehler",
                    data?.error ?? error.message ?? "Konto konnte nicht gelöscht werden."
                  );
                  return;
                }

                if (data?.error) {
                  Alert.alert("Fehler", data.error);
                  return;
                }

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
              } catch {
                Alert.alert(
                  "Fehler",
                  "Dein Konto konnte nicht gelöscht werden. Bitte versuche es später erneut."
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
            />
            {deleteError ? (
              <View style={styles.deleteErrorContainer}>
                <Button label={deleteError} variant="outline" disabled />
              </View>
            ) : null}
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
