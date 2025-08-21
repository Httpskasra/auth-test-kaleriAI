import "./globals.scss";
import { AuthProvider } from "@context/AuthContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth + Dashboard | Clean SOLID",
  description: "Next.js App Router, TS, SCSS Modules, Zod validation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
