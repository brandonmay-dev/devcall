import type { Metadata } from "next";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import ConvexClerkProvider from "@/components/providers/ConvexClerkProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "DevCall",
  description: "A video-calling coding interview platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        <ConvexClerkProvider>
          <header className="flex h-16 items-center justify-end gap-4 border-b px-6">
            <Show when="signed-out">
              <SignInButton />
              <SignUpButton>
                <button className="h-10 cursor-pointer rounded-full bg-purple-700 px-4 text-sm font-medium text-white sm:h-12 sm:px-5 sm:text-base">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>

            <Show when="signed-in">
              <UserButton />
            </Show>
          </header>

          {children}
        </ConvexClerkProvider>
      </body>
    </html>
  );
}
