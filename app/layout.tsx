import type { Metadata } from "next";
import {dark} from "@clerk/themes"
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import QueryProvider from "@/components/providers/query-provider";
import { siteConfig } from "@/config/site";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/logo.png",
      href: "/logo.png"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark
    }}>
      <html lang="en" suppressHydrationWarning={true}>
        <body
          className={cn(
            poppins.className,
            "bg-white/65 dark:bg-neutral-700/10"
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <SocketProvider>
              <Toaster />
              <ModalProvider />
              <QueryProvider>{children}</QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
