import { NextResponse } from "next/server";

// GET /auth/callback
// Handles: OAuth callback, email confirmation, password reset
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const type = searchParams.get("type");
  const next = searchParams.get("next") ?? "/dashboard";

  // Password reset recovery — redirect ke halaman update password
  if (type === "recovery" || searchParams.get("error_description")?.includes("expired")) {
    // Supabase will set the session via the code in the URL
    // After that, redirect to a page where user can set new password
    if (code) {
      // Redirect ke halaman update password dengan code
      return NextResponse.redirect(
        `${origin}/auth/update-password?code=${code}`
      );
    }
    // Token expired or invalid
    return NextResponse.redirect(
      `${origin}/forgot-password?error=Link reset sudah kadaluarsa. Silakan minta link baru.`
    );
  }

  // Email confirmation or OAuth
  if (code) {
    return NextResponse.redirect(`${origin}/auth/confirm?code=${code}&next=${encodeURIComponent(next)}`);
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
