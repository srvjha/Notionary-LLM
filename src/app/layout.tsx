import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { QueryProvider } from "@/components/providers/query";

export const metadata: Metadata = {
  title: "Notionary LLM - Your AI-Powered Notebook Assistant",
  description:
    "An AI-powered assistant that helps you manage and organize your notes efficiently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark bg-gradient-to-br from-slate-950 via-neutral-950 to-slate-900">
        <QueryProvider>
          <Toaster />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
