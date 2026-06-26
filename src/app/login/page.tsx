import { LoginForm } from "./LoginForm";
import Image from "next/image";
import Link from "next/link";
import { SCHOOL_SHORT } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Masuk" };

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <Image src="/logo.png" alt={SCHOOL_SHORT} width={64} height={64} className="rounded-xl mx-auto mb-4 shadow-md" />
        <h1 className="text-2xl font-bold text-gray-900">Masuk ke MAMSAKA</h1>
        <p className="text-gray-500 mt-1 text-sm">Platform Portofolio {SCHOOL_SHORT}</p>
      </div>
      <LoginForm />
    </div>
  );
}
