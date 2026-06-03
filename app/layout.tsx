import "./globals.css";
import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const siteUrl = "https://statisticahub.github.io/my-acad-tutor/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "My Academic Tutor | Quantitative Learning and Academic Support",
    template: "%s | My Academic Tutor",
  },
  description:
    "Structured learning pathways and specialist academic support in statistics, biostatistics, data science, programming and quantitative research methods.",
  applicationName: "My Academic Tutor",
  authors: [{ name: "My Academic Tutor" }],
  creator: "My Academic Tutor",
  publisher: "My Academic Tutor",
  keywords: [
    "statistics tutoring",
    "biostatistics tutoring",
    "data science learning",
    "research methods support",
    "academic support",
    "statistics course",
    "machine learning in biostatistics",
    "quantitative research methods",
  ],
  openGraph: {
    title: "My Academic Tutor | Quantitative Learning and Academic Support",
    description:
      "Structured learning pathways and specialist academic support in statistics, biostatistics, data science, programming and quantitative research methods.",
    url: siteUrl,
    siteName: "My Academic Tutor",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Academic Tutor | Quantitative Learning and Academic Support",
    description:
      "Structured learning pathways and specialist academic support in statistics, biostatistics, data science, programming and quantitative research methods.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/my-acad-tutor/favicon.ico",
  },
};

export const viewport = {
  themeColor: "#f7f4ee",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className={`${inter.variable} ${sourceSerif.variable} font-sans`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}