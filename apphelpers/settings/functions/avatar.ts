import { supabase } from "@/lib/supabase";
import { Profile } from "@/lib/supabase.types";
import { User } from "@supabase/supabase-js";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";

export async function pickAndUploadAvatar(
  user: User,
  profile: Profile | null,
  updateProfile: (data: Partial<Profile>) => Promise<{ error: Error | null }>
): Promise<void> {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  if (result.canceled || !result.assets?.length) {
    return;
  }

  const asset = result.assets[0];

  // Delete old avatar if exists
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
    throw uploadError;
  }

  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
  const publicUrl = data.publicUrl;
  
  const { error: updateError } = await updateProfile({
    avatar_url: publicUrl,
  });
  
  if (updateError) {
    throw updateError;
  }
}
