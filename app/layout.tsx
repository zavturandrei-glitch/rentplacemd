import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
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
  title: "RentPlaceMD — квартиры посуточно в Кишинёве",
  description:
    "Квартиры посуточно в Кишинёве. Центр города. Измаил 88. Заселение 24/7.",

  keywords: [
    "квартиры посуточно",
    "Кишинёв",
    "аренда квартиры",
    "RentPlaceMD",
    "Измаил 88",
    "апартаменты Кишинёв",
  ],

  openGraph: {
    title: "RentPlaceMD — квартиры посуточно в Кишинёве",
    description:
      "Центр города. Заселение 24/7. Чистые квартиры посуточно.",
    url: "https://rentplace.md",
    siteName: "RentPlaceMD",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RentPlaceMD",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "RentPlaceMD — квартиры посуточно в Кишинёве",
    description:
      "Центр города. Заселение 24/7. Чистые квартиры посуточно.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>

      <GoogleAnalytics gaId="G-404L3B7Q2R" />
    </html>
  );
}