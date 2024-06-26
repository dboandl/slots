import { NavBar } from "@/components/NavBar";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";
import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const locales = ["en", "de"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NextAuthSessionProvider>
            <div className="min-h-dvh w-full bg-gray-50">
              <div className="mx-auto max-w-7xl h-full bg-white">
                <div className="px-6 lg:px-8">
                  <NavBar />
                </div>
                <div className="h-px w-full bg-gray-100" />
                <main className="flex p-6 lg:p-8 h-full">{children}</main>
              </div>
            </div>
          </NextAuthSessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
