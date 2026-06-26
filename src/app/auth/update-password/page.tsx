import { Suspense } from "react";
import { UpdatePasswordForm } from "./UpdatePasswordForm";
import Image from "next/image";
import { SCHOOL_SHORT } from "@/lib/utils";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Buat Password Baru" };

export default function UpdatePasswordPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <Image src="/logo.png" alt={SCHOOL_SHORT} width={56} height={56} className="rounded-xl mx-auto mb-4 shadow-md" />
        <h1 className="text-2xl font-bold text-gray-900">Buat Password Baru</h1>
        <p className="text-gray-500 mt-1 text-sm">Masukkan password baru untuk akun kamu</p>
      </div>
      <Suspense fallback={<div className="text-center py-8 text-gray-400">Memuat...</div>}>
        <UpdatePasswordForm />
      </Suspense>
    </div>
  );
}
