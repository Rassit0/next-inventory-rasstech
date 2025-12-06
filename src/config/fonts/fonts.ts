import { Geist, Geist_Mono, Montserrat_Alternates, Plus_Jakarta_Sans } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const titleFont = Montserrat_Alternates({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["500", "700"],
}); 

export const appFont = Plus_Jakarta_Sans({
  variable: "--font-app",
  subsets: ["latin"],
});