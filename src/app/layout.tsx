import type { Metadata } from "next";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} — Platform Portofolio Siswa`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://buildaimamsaka.vercel.app"),
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: `${APP_NAME} — Madrasah Aliyah Muhammadiyah 1 Paciran`,
    description: APP_DESCRIPTION,
    images: [{ url: "/logo.png", width: 1277, height: 1222 }],
  },
  twitter: {
    card: "summary",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
