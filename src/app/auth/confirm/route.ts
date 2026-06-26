import { createServerSupabase } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// GET /auth/confirm?code=xxx
// Exchange the confirmation code for a session
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createServerSupabase();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=Konfirmasi gagal, coba lagi`);
}
