import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import {NextUIProvider} from "@nextui-org/react";
import { Providers } from "./providers";
import { cn } from "@/lib/utils"
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export const metadata = {
  title: "Huellitas QR",
  description: "Ayudamos a encontrar tu mascota perdida",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={cn(
          "min-h-screen flex flex-col justify-between font-sans antialiased",
          fontSans.variable
        )}>
     <Providers>   
      {children}
      <Toaster />

      <Footer></Footer>
    </Providers>
    </body>
    </html>
  );
}
