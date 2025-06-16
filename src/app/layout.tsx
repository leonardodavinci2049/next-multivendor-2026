import type { Metadata } from "next";
import { Barlow, Inter } from "next/font/google";
// Global css
import "./globals.css";
// Theme provider
import { ThemeProvider } from "next-themes";

// Clerk provider
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="pt-BR" suppressHydrationWarning>
        <body className={`${interFont.className} ${barlowFont.variable}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
