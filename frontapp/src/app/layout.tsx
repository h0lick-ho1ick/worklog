import type { Metadata } from "next";
import { Geist_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import NavBar from "@/app/components/nav/NavBar";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansKr = Noto_Sans_KR({
  variable: "--font-app",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Smart Working",
  description: "Worklog management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} ${geistMono.variable} antialiased`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
