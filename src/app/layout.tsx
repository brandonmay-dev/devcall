import type { Metadata } from "next";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./globals.css";
import { RedirectToSignIn, Show } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import ConvexClerkProvider from "@/components/providers/ConvexClerkProvider";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";

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
    <ConvexClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            inter.variable,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Show when="signed-in">
              <div className="min-h-screen">
                <Navbar />
                <main className="px-4 sm:px-6 lg:px-8 py-8">{children}</main>
              </div>
            </Show>

            <Show when="signed-out">
              <RedirectToSignIn />
            </Show>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
