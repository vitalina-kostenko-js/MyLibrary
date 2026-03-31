import "@/config/styles/globals.css";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { FC, ReactNode } from "react";
import { routing } from "../../pkg/locale";
import { AuthSessionProvider, ReactQueryProvider } from "../shared/providers";

//font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

//metadata
export const metadata: Metadata = {
  title: "MyLibrary",
  description:
    "MyLibrary is a library management system that allows you to manage your books and authors.",
  icons: {
    icon: "/icon.svg",
  },
};

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

//interface
interface IProps {
  children: ReactNode;
}

const RootLayout: FC<Readonly<IProps>> = async (props) => {
  const { children } = props;

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
          <AuthSessionProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </AuthSessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
