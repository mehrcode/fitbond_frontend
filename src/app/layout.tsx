import "./globals.css";
import { Kodchasan } from "next/font/google";
import Navbar from "./components/Navbar";

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
      <body className="font-kodchasan bg-offWhite text-base">
        <div className="p-4">
          <Navbar
            username="mehrnoosh"
            profile_image="/avatar_placeholder.png"
          />
        </div>

        {children}
      </body>
    </html>
  );
}
