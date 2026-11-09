import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import I18nProvider from "@/context/I18nProvider";
import SidebarProvider from "@/context/SidebarProvider";
import ThemeProvider from "@/context/ThemeProvider";
import ThemeScript from "@/components/ThemeScript";
import SidebarScript from "@/components/SidebarScript";
import StoreProvider from "@/store/StoreProvider";
import { getMessages } from "@/lib/i18n";
import { isLocale, localeDirection, locales } from "@/lib/i18n/config";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CellCube Admin Portal",
  description: "Identity, access, audit and system administration for the CellCube platform.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      dir={localeDirection(locale)}
      // ThemeScript writes data-theme before hydration, so the server markup
      // deliberately differs from the client first paint.
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <SidebarScript />
      </head>
      {/* Extensions stamp attributes on <body> before React loads (ColorZilla adds
          cz-shortcut-listen), which is not a mismatch the app can or should fix. */}
      <body
        className={`${inter.variable} ${jetbrainsMono.variable}`}
        suppressHydrationWarning
      >
        <StoreProvider>
          <ThemeProvider>
            <SidebarProvider>
              <I18nProvider locale={locale} messages={getMessages(locale)}>
                {children}
              </I18nProvider>
            </SidebarProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
