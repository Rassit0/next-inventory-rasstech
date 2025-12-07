import { Geist, Geist_Mono, Inter, Montserrat_Alternates, Plus_Jakarta_Sans } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const titleFont = Montserrat_Alternates({
//   variable: "--font-title",
//   subsets: ["latin"],
//   weight: ["500", "700"],
// }); 

// export const appFont = Plus_Jakarta_Sans({
//   variable: "--font-app",
//   subsets: ["latin"],
// });
export const appFont = Inter({
  variable: "--font-app",      // se usará para todo el body
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], 
  style: ["normal"],
  display: "swap",
});

export const titleFont = Montserrat_Alternates({
  variable: "--font-title",     // se usará solo en headings/títulos
  subsets: ["latin"],
  weight: ["500", "700"],       // semibold y bold para jerarquía
  style: ["normal"],
  display: "swap",
});
