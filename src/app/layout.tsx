import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weather Forecast App",
  description: "Get real-time weather information for any city",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className="antialiased">
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
