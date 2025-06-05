import type { Metadata } from "next";
import { Barlow, Inter } from "next/font/google";
import "./globals.css";

// Fonts
const interFont = Inter({ subsets: ["latin"] });
const barlowFont = Barlow({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-barlow",
});

// Metadata
export const metadata: Metadata = {
  title: "MultiShop",
  description:
    "Welcome to MultiShop,  your one-stop shop for all things shopping!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interFont.className} ${barlowFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
