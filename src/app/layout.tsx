import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar"; 

export const metadata: Metadata = {
  title: "Fitbond App",
  description: "Lifestyle, Habbit tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body className="bg-[#fef8e0] text-black font-sans">
        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
