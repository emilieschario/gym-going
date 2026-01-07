import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Did Emilie go to the gym today?",
  description:
    "A tiny nostalgia-powered calendar that tracks Emilie's gym adventures in January 2026.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className="fixed bottom-0 left-0 right-0 text-center py-4 px-4 text-sm text-stone-500 bg-gradient-to-t from-white/85 to-transparent backdrop-blur-sm">
          <p className="flex items-center justify-center gap-1 flex-wrap">
            <span>©2026 Made with</span>
            <span className="text-red-500 animate-pulse">❤</span>
            <span>& nostalgia on planet earth by</span>
            <a 
              href="https://emilieschario.com" 
              className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors underline decoration-emerald-300 decoration-2 underline-offset-2 hover:decoration-emerald-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              emilie
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
