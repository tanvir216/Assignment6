import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlanProvider } from "@/context/PlanContext";
import { ToastProvider } from "@/context/ToastContext";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "FitLog — Workout Library",
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-ink-950 font-body text-white antialiased">
        <PlanProvider>
          <ToastProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ToastProvider>
        </PlanProvider>
      </body>
    </html>
  );
}
