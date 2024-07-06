import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import React from "react";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hustlers",
  description: "for Hustlers",
  icons: {
    icon: '/Images/logo.png',
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  
    <html lang="en">
      <body  className={`${inter.className} `} >
      <StoreProvider>
        {children}
        </StoreProvider>
        </body>
    </html>
   
  );
}
