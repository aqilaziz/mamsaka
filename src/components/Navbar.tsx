"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { cn, SCHOOL_SHORT } from "@/lib/utils";
import { Menu, X, Plus, LogOut, LogIn, User, Settings, LayoutDashboard } from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export function Navbar() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUserMenuOpen(false);
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg">
            <Image
              src="/logo.png"
              alt={SCHOOL_SHORT}
              width={36}
              height={36}
              className="rounded-md"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-amber-600">MAM 1 PACIRAN</span>
              <span className="text-[10px] text-primary-600 font-medium">Build AI - MAMSAKA</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-5">
            <Link href="/explore" className="text-gray-600 hover:text-primary-700 transition-colors font-medium text-sm">
              Explore Karya
            </Link>
            {!loading && user ? (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-primary-700 transition-colors font-medium text-sm">
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/projects/new"
                  className="flex items-center gap-1.5 bg-primary-700 text-white px-4 py-2 rounded-lg hover:bg-primary-800 transition-all text-sm font-medium shadow-sm hover:shadow-md"
                >
                  <Plus size={16} />
                  Unggah Karya
                </Link>

                {/* User menu dropdown */}
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
                  >
                    <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm ring-2 ring-primary-100">
                      {user.user_metadata?.full_name?.[0] || user.email?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div className="hidden lg:block text-left leading-tight">
                      <p className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
                        {user.user_metadata?.full_name || user.email?.split("@")[0]}
                      </p>
                      <p className="text-[10px] text-gray-400">Siswa</p>
                    </div>
                    <svg className={cn("w-4 h-4 text-gray-400 transition-transform", userMenuOpen && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-1.5 z-50 animate-fade-in-down">
                      {/* User info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-sm text-gray-900 truncate">
                          {user.user_metadata?.full_name || "Siswa"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>

                      {/* Menu items */}
                      <Link
                        href={`/p/${user.user_metadata?.username || user.id}`}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User size={16} className="text-gray-400" />
                        Profil Saya
                      </Link>
                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <LayoutDashboard size={16} className="text-gray-400" />
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/projects/new"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors lg:hidden"
                      >
                        <Plus size={16} className="text-gray-400" />
                        Unggah Karya
                      </Link>

                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                        >
                          <LogOut size={16} />
                          Keluar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 bg-primary-700 text-white px-5 py-2.5 rounded-lg hover:bg-primary-800 transition-all text-sm font-medium shadow-sm"
              >
                <LogIn size={16} />
                Masuk
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {user && (
              <div className="flex items-center gap-3 px-2 py-3 border-b border-gray-100 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                  {user.user_metadata?.full_name?.[0] || user.email?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">
                    {user.user_metadata?.full_name || "Siswa"}
                  </p>
                  <p className="text-xs text-gray-500 truncate max-w-[200px]">{user.email}</p>
                </div>
              </div>
            )}
            <Link href="/explore" className="flex items-center gap-3 px-3 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
              🔍 Explore Karya
            </Link>
            {user ? (
              <>
                <Link href="/dashboard" className="flex items-center gap-3 px-3 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
                  📊 Dashboard
                </Link>
                <Link href="/dashboard/projects/new" className="flex items-center gap-3 px-3 py-3 text-primary-700 font-medium rounded-lg hover:bg-primary-50" onClick={() => setMobileOpen(false)}>
                  ➕ Unggah Karya
                </Link>
                <Link href={`/p/${user.user_metadata?.username || user.id}`} className="flex items-center gap-3 px-3 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
                  👤 Profil Saya
                </Link>
                <button
                  onClick={() => { handleSignOut(); setMobileOpen(false); }}
                  className="flex items-center gap-3 w-full px-3 py-3 text-red-600 font-medium rounded-lg hover:bg-red-50 mt-2 border-t border-gray-100 pt-3"
                >
                  🚪 Keluar
                </button>
              </>
            ) : (
              <Link href="/login" className="flex items-center gap-3 px-3 py-3 text-primary-700 font-medium rounded-lg hover:bg-primary-50" onClick={() => setMobileOpen(false)}>
                🔐 Masuk / Daftar
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
