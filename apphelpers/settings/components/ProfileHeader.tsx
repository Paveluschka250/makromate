import type { ProfileHeaderProps } from "@/apphelpers/settings/settings.types";
import styles from "@/apphelpers/settings/settings.style";
import { colors } from "@/lib/theme";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function getAvatarInitial(
  profile: ProfileHeaderProps["profile"],
  user: ProfileHeaderProps["user"]
): string {
  const first = profile?.first_name?.trim()?.[0]?.toUpperCase() ?? null;
  const last = profile?.last_name?.trim()?.[0]?.toUpperCase() ?? null;
  if (first && last) return `${first}${last}`;
  if (first) return first;
  if (last) return last;
  const emailFirst = user?.email?.trim()?.[0]?.toUpperCase();
  return emailFirst || "?";
}

export default function ProfileHeader({
  profile,
  user,
  uploading,
  onPickAvatar,
}: ProfileHeaderProps) {
  const avatarInitial = getAvatarInitial(profile, user);

  return (
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
        onPress={onPickAvatar}
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
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
