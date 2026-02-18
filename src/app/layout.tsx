import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; // Import Playfair
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" }); // Define variable

export const metadata: Metadata = {
  title: "Softhreads | Premium Clothing for Men & Women",
  description: "Discover the latest fashion trends at Softhreads. Premium quality clothing for men and women.",
  icons: {
    icon: "/logo.svg",
  },
};

import { Providers } from "@/components/providers";
import CartDrawer from "@/components/cart/CartDrawer";
// ... imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.variable, playfair.variable, "font-sans bg-background text-foreground antialiased min-h-screen flex flex-col")}>
        <Providers>
          <Navbar />
          <CartDrawer />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
