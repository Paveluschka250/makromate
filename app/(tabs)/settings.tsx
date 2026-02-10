import Button from "@/components/button/button";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "@/apphelpers/settings/components/ProfileHeader";
import styles from "@/apphelpers/settings/settings.style";

export default function Settings() {
  const router = useRouter();
  const { user, profile, updateProfile, signOut } = useAuth();
  const [uploading, setUploading] = useState(false);

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

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
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
        </View>
      </View>
    </SafeAreaView>
  );
}
