import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { ThemeProvider } from "@/app/components/Providers";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "CALNX - Scheduling a meeting can be a pain",
  description: "Scheduling a meeting can be a pain. But we at CaLnx make it easy for your clients to schedule meetings with you. With CaLnx you can schedule meetings in minutes. We make it easy for you to schedule meetings in minutes. The meetings are very fast and easy to schedule.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark">
          <NextSSRPlugin
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
