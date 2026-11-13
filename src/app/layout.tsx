import { SerwistProvider } from "@serwist/turbopack/react";
import type { Metadata, Viewport } from "next";
import { Rubik } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { copy } from "@/lib/copy";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: copy.app.name, template: `%s · ${copy.app.name}` },
  description: copy.app.description,
  applicationName: copy.app.name,
  appleWebApp: {
    capable: true,
    title: copy.app.name,
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
  icons: {
    icon: [
      { url: "/icons/icon.svg", type: "image/svg+xml" },
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // Updated at runtime by ThemeProvider to match the chosen theme.
  themeColor: "#0e0f13",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="he" dir="rtl" className={rubik.variable} suppressHydrationWarning>
      <body className="min-h-dvh font-sans">
        <SerwistProvider swUrl="/serwist/sw.js" disable={process.env.NODE_ENV === "development"}>
          <ThemeProvider>
            {children}
            <Toaster position="top-center" dir="rtl" />
          </ThemeProvider>
        </SerwistProvider>
      </body>
    </html>
  );
}
