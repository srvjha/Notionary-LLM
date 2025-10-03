
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Providers } from "./Providers";
import { Toaster } from 'react-hot-toast';
import {
  ClerkProvider
} from '@clerk/nextjs'

export const metadata: Metadata = {
  title: "Notionary LLM - Your AI-Powered Notebook Assistant",
  description: "An AI-powered assistant that helps you manage and organize your notes efficiently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <ClerkProvider>
    <html lang="en">
      <body className="dark">
        <Toaster />
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
    </ClerkProvider>
  );
}
