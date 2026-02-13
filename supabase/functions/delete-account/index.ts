import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    console.log("[delete-account] Request received");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error("[delete-account] Missing Authorization header");
      return new Response(
        JSON.stringify({ error: "Nicht angemeldet." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !anonKey || !serviceRoleKey) {
      console.error("[delete-account] Missing env vars", { 
        hasUrl: !!supabaseUrl, 
        hasAnon: !!anonKey, 
        hasService: !!serviceRoleKey 
      });
      return new Response(
        JSON.stringify({ error: "Server Configuration Error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUser = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    
    console.log("[delete-account] Verifying user session...");
    const { data: { user }, error: userError } = await supabaseUser.auth.getUser();

    if (userError || !user) {
      console.error("[delete-account] User verification failed", userError);
      return new Response(
        JSON.stringify({ error: "Ungültige Session." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = user.id;
    console.log(`[delete-account] User verified: ${userId}`);

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // 1) Alle Dateien des Users im Bucket "avatars" löschen
    console.log("[delete-account] Listing avatar files...");
    const { data: files, error: listError } = await supabaseAdmin.storage.from("avatars").list(userId, { limit: 1000 });
    
    if (listError) {
       console.error("[delete-account] Storage list error:", listError);
       // Wir brechen hier nicht ab, sondern versuchen weiter zu löschen
    } else if (files && files.length > 0) {
      console.log(`[delete-account] Deleting ${files.length} avatar files...`);
      const paths = files.map((f: { name: string }) => `${userId}/${f.name}`);
      const { error: removeError } = await supabaseAdmin.storage.from("avatars").remove(paths);
      if (removeError) console.error("[delete-account] Storage remove error:", removeError);
    }

    // 2) Auth-User löschen (nur mit Service-Role möglich)
    console.log("[delete-account] Deleting auth user...");
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteError) {
      console.error("[delete-account] Delete user failed:", deleteError);
      return new Response(
        JSON.stringify({ error: deleteError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("[delete-account] Success");

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Fehler beim Löschen.";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
