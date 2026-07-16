import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import CartToast from "./components/shared/CartToast";

const heebo = Heebo({ subsets: ["hebrew", "latin"], weight: "variable", variable: "--font-heebo" });

export const metadata: Metadata = {
  title: "Polarizedx",
  description: "Polarizedx storefront",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`h-full antialiased ${heebo.variable}`}>
      <body className="min-h-full flex flex-col bg-black text-white antialiased font-sans">
        <FavoritesProvider>
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
            <CartToast />
          </CartProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
