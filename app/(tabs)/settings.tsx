import Button from "@/components/button/button";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const router = useRouter();
  const { user, profile, updateProfile, signOut } = useAuth();
  const [uploading, setUploading] = useState(false);

  const handlePickAvatar = async () => {
    if (!user?.id) return;

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      // Optional: Hinweis anzeigen
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled || !result.assets?.length) return;

    const asset = result.assets[0];
    try {
      setUploading(true);
      const fileExt = asset.uri.split(".").pop() ?? "jpg";
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const response = await fetch(asset.uri);
      const blob = await response.blob();

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, blob, { upsert: true });

      if (uploadError) {
        // Optional: Fehler anzeigen
        console.error(uploadError);
        return;
      }

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

      const publicUrl = data.publicUrl;
      await updateProfile({ avatar_url: publicUrl });
    } catch (e) {
      console.error(e);
    } finally {
      setUploading(false);
    }
  };

  const avatarInitial = (() => {
    const first =
      profile?.first_name?.trim()?.[0]?.toUpperCase() ?? null;
    const last =
      profile?.last_name?.trim()?.[0]?.toUpperCase() ?? null;
    if (first && last) return `${first}${last}`;
    if (first) return first;
    if (last) return last;
    const emailFirst = user?.email?.trim()?.[0]?.toUpperCase();
    return emailFirst || "?";
  })();

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.inner}>
        <View style={styles.headerRow}>
          <View style={styles.headerText}>
            <Text style={styles.title}>
              {profile?.first_name} {profile?.last_name}
            </Text>
            {user?.email ? (
              <Text style={styles.email}>{user.email}</Text>
            ) : null}
          </View>
          <TouchableOpacity
            style={styles.avatarWrapper}
            onPress={handlePickAvatar}
            disabled={uploading}
          >
            {profile?.avatar_url ? (
              <Image
                source={{ uri: profile.avatar_url }}
                style={styles.avatarImage}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitial}>{avatarInitial}</Text>
              </View>
            )}
            {uploading && (
              <View style={styles.avatarOverlay}>
                <ActivityIndicator size="small" color="#22c55e" />
              </View>
            )}
          </TouchableOpacity>
        </View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#102116",
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 40,
    marginBottom: 24,
  },
  headerText: {
    flexShrink: 1,
    paddingRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#dcfce7",
    marginBottom: 4,
  },
  email: {
    fontSize: 15,
    color: "#7f9d8c",
  },
  avatarWrapper: {
    width: 56,
    height: 56,
    borderRadius: 999,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#22c55e",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarPlaceholder: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: {
    fontSize: 20,
    fontWeight: "700",
    color: "#22c55e",
  },
  avatarOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    marginTop: 8,
    gap: 12,
  },
});
