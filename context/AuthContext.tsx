import { supabase } from "@/lib/supabase";
import type { Profile } from "@/lib/supabase.types";
import type { Session, User } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export function isProfileComplete(profile: Profile | null): boolean {
  if (!profile) return false;
  return !!(
    profile.first_name?.trim() &&
    profile.last_name?.trim() &&
    profile.birth_date &&
    profile.height_cm != null &&
    profile.weight_kg != null &&
    profile.gender &&
    profile.goal
  );
}

type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  profileLoading: boolean;
  isProfileComplete: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (
    email: string,
    password: string,
    options?: { fullName?: string }
  ) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updateProfile: (data: Partial<Omit<Profile, "id" | "created_at" | "updated_at">>) => Promise<{ error: Error | null }>;
  refetchProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const router = useRouter();

  const fetchProfile = useCallback(async (userId: string) => {
    setProfileLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();
    setProfile(error ? null : data ?? null);
    setProfileLoading(false);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user?.id) {
      setProfile(null);
      return;
    }
    fetchProfile(user.id);
  }, [user?.id, fetchProfile]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error: error ?? null };
    },
    []
  );

  const signUp = useCallback(
    async (
      email: string,
      password: string,
      options?: { fullName?: string }
    ) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: options?.fullName
          ? { data: { full_name: options.fullName } }
          : undefined,
      });
      return { error: error ?? null };
    },
    []
  );

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    router.replace("/login" as never);
  }, [router]);

  const resetPassword = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: undefined,
    });
    return { error: error ?? null };
  }, []);

  const updateProfile = useCallback(
    async (data: Partial<Omit<Profile, "id" | "created_at" | "updated_at">>) => {
      if (!user?.id) return { error: new Error("Nicht angemeldet") as Error };
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: user.id, ...data }, { onConflict: "id" });
      if (!error) await fetchProfile(user.id);
      return { error: error ?? null };
    },
    [user?.id, fetchProfile]
  );

  const refetchProfile = useCallback(async () => {
    if (user?.id) await fetchProfile(user.id);
  }, [user?.id, fetchProfile]);

  const value: AuthContextType = {
    user,
    session,
    profile,
    loading,
    profileLoading,
    isProfileComplete: isProfileComplete(profile),
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    refetchProfile,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
