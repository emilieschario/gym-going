import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Did Emilie go to the gym today?",
  description: "A simple tracker for Emilie's gym attendance in January 2026.",
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
      <body className={`${inter.className} antialiased bg-stone-50 text-stone-900`}>
        {children}
        <footer className="fixed bottom-0 inset-x-0 py-4 text-center text-xs text-stone-400 bg-gradient-to-t from-stone-50 via-stone-50 to-transparent">
          ©2026 Made with ❤ & nostalgia on planet earth by{" "}
          <a 
            href="https://emilieschario.com" 
            className="text-emerald-600 hover:text-emerald-700 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            emilie
          </a>
        </footer>
      </body>
    </html>
  );
}
