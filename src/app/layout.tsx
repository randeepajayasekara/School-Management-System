import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";

const inter = Poppins({
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "School Management Dashboard",
  description:
    "School Management System for managing students, teachers, and classes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <meta name="apple-mobile-web-app-title" content="School Management" />
      </head>
      <body className={inter.className}>
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
