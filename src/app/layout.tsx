import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Great_Vibes } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/sections/Footer";
import { BackToTop } from "@/components/BackToTop";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { business } from "@/lib/config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: {
    default: `${business.name} | Luxury Short-Term Rental`,
    template: `%s | ${business.name}`,
  },
  description: business.description,
  openGraph: {
    title: `${business.name} | Luxury Short-Term Rental`,
    description: business.description,
    url: business.url,
    siteName: business.name,
    images: [
      {
        url: "/images/hero/villa-front-day.png",
        width: 1672,
        height: 941,
        alt: "Aviora Estates private villa exterior with blue doors and gardens",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} | Luxury Short-Term Rental`,
    description: business.description,
    images: ["/images/hero/villa-front-day.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${greatVibes.variable}`} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider>
          <main>{children}</main>
          <Footer />
          <BackToTop />
          <WhatsAppButton />
        </ThemeProvider>
        <SchemaMarkup />
      </body>
    </html>
  );
}
