import { RegisterForm } from "./RegisterForm";
import Image from "next/image";
import { SCHOOL_SHORT } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Daftar" };

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <Image src="/logo.png" alt={SCHOOL_SHORT} width={64} height={64} className="rounded-xl mx-auto mb-4 shadow-md" />
        <h1 className="text-2xl font-bold text-gray-900">Daftar MAMSAKA</h1>
        <p className="text-gray-500 mt-1 text-sm">Jadi bagian dari portofolio digital {SCHOOL_SHORT}</p>
      </div>
      <RegisterForm />
    </div>
  );
}
