import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactQueryProvider } from "../shared/providers";
import "../(web)/globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { routing } from "../../i18n/routing";
import { notFound } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyLibrary",
  description:
    "MyLibrary is a library management system that allows you to manage your books and authors.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
