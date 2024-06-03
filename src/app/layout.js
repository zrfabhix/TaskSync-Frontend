import { Inter } from "next/font/google";
import "./globals.css";

import { MyProvider } from "@/contextApi/Context";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "StockFlow",
  description: "Created by ZRF",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MyProvider>
          <div>
            <Toaster />
            <Navbar />

            {children}
          </div>
        </MyProvider>
      </body>
    </html>
  );
}
