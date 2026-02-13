import { supabase } from "@/lib/supabase";
import { FunctionsHttpError, FunctionsRelayError } from "@supabase/supabase-js";

export async function verifyPassword(email: string, password: string): Promise<{ error: string | null }> {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Passwort ist falsch." };
  }
  return { error: null };
}

export async function deleteAccount() {
  console.log("[Settings] Calling delete-account...");
  const { data, error } = await supabase.functions.invoke("delete-account");

  if (error) {
    console.error("[Settings] delete-account failed:", error);
    if (data) {
      console.error("[Settings] Response data:", data);
    }

    let message = data?.error ?? error.message ?? "Konto konnte nicht gelöscht werden.";

    if (error instanceof FunctionsHttpError || error instanceof FunctionsRelayError) {
      try {
        const responseText = await error.context.text();
        if (responseText) {
          const parsed = JSON.parse(responseText) as { error?: string };
          if (parsed?.error) {
            message = parsed.error;
          }
        }
      } catch {
        // Fallback
      }
    }
    throw new Error(message);
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data;
}
