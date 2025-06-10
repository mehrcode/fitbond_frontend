import "./globals.css";
import { Kodchasan } from "next/font/google";

const kodchasan = Kodchasan({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-kodchasan",
});

export const metadata = {
  title: "Consis",
  description: "Track your creative streaks 🧠✨",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${kodchasan.variable}`}>
      <body className="font-kodchasan bg-offWhite text-base">{children}</body>
    </html>
  );
}
