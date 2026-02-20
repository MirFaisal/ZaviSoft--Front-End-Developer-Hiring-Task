import { Geist, Geist_Mono, Rubik, Open_Sans } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "ZaviSoft E-Commerce | Premium Shopping Experience",
  description:
    "Discover amazing products at ZaviSoft E-Commerce. Shop the latest trends with fast delivery and excellent customer service.",
  keywords: ["e-commerce", "shopping", "online store", "zavisoft"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rubik.variable} ${openSans.variable} antialiased`}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
