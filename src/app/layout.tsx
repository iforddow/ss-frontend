import type { Metadata } from "next";
import { Chewy } from "next/font/google";
import "./globals.css";
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { VisualEditingProvider } from "../../direct-next/package/provider/visual-editing-provider";
import { Header } from "@/components/layout/header/header";
import { defaultTheme } from "@/config/theme";
import Footer from "../components/layout/footer/footer";


export const metadata: Metadata = {
  title: "Super Stars Daycare",
  description: "A daycare for superstars",
};

const chewy = Chewy({
  weight: ["400"],
  style: "normal",
  display: 'optional',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={chewy.className} {...mantineHtmlProps}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded" rel="stylesheet" />
        <ColorSchemeScript />
      </head>
      <body>
        <VisualEditingProvider>
          <MantineProvider theme={defaultTheme} forceColorScheme="light">
            <Header />
            {children}
            <Footer />
          </MantineProvider>
        </VisualEditingProvider>
      </body>
    </html>
  );
}
