import type { Metadata, Viewport } from "next";
import Script from "next/script";
import JsonLdScript from "@/components/JsonLdScript";
import { LanguageProvider } from "@/context/LanguageContext";
import {
  baseUrl,
  buildSiteJsonLd,
  alternateOpenGraphLocales,
  defaultLocale,
  iconMetadata,
  routeAlternates,
  seoKeywords,
  siteDescription,
  mainSocialImageAlt,
  mainSocialImageUrl,
  siteName,
  siteTitle,
} from "@/lib/seo";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#07111f",
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  applicationName: siteName,
  title: {
    default: siteTitle,
    template: "%s | RentPlaceMD",
  },
  description: siteDescription,
  keywords: seoKeywords,
  alternates: routeAlternates(),
  icons: iconMetadata,
  manifest: "/manifest.webmanifest",
  category: "travel",
  authors: [{ name: siteName, url: baseUrl }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    telephone: true,
    address: true,
    email: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: baseUrl,
    siteName,
    images: [
      {
        url: mainSocialImageUrl,
        secureUrl: mainSocialImageUrl,
        type: "image/jpeg",
        width: 1200,
        height: 630,
        alt: mainSocialImageAlt,
      },
    ],
    locale: defaultLocale,
    alternateLocale: alternateOpenGraphLocales,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: mainSocialImageUrl,
        secureUrl: mainSocialImageUrl,
        type: "image/jpeg",
        width: 1200,
        height: 630,
        alt: mainSocialImageAlt,
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: siteName,
    statusBarStyle: "black-translucent",
  },
};

const structuredData = buildSiteJsonLd();
const googleAnalyticsScript =
  "window.dataLayer = window.dataLayer || [];" +
  "function gtag(){dataLayer.push(arguments);}" +
  "gtag('js', new Date());" +
  "gtag('config', 'G-404L3B7Q2R');";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <LanguageProvider>{children}</LanguageProvider>

        <JsonLdScript
          id="rentplacemd-structured-data"
          data={structuredData}
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-404L3B7Q2R"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {googleAnalyticsScript}
        </Script>
      </body>
    </html>
  );
}
