import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { companyData } from "@/lib/data";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: companyData.seo.title,
  description: companyData.seo.description,
  keywords: companyData.seo.keywords,
  authors: [{ name: companyData.fullName }],
  creator: companyData.fullName,
  publisher: companyData.fullName,
  robots: "index, follow",
  appleWebApp: {
    title: "Lemhauz",
  },
  openGraph: {
    title: companyData.seo.ogTitle,
    description: companyData.seo.ogDescription,
    siteName: "Lemhauz",
    locale: "sk_SK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: companyData.seo.ogTitle,
    description: companyData.seo.ogDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
