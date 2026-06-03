import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
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

const siteUrl = "https://myacademictutor.com";

const siteDescription =
  "Structured courses, interactive demos and responsible academic support for statistics, biostatistics, health data science and quantitative research methods.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "My Academic Tutor | Quantitative Learning",
    template: "%s | My Academic Tutor",
  },
  description: siteDescription,
  applicationName: "My Academic Tutor",
  authors: [{ name: "My Academic Tutor" }],
  creator: "My Academic Tutor",
  publisher: "My Academic Tutor",
  keywords: [
    "statistics tutoring",
    "biostatistics tutoring",
    "health data science",
    "research methods support",
    "statistics course",
    "machine learning in biostatistics",
    "quantitative research methods",
    "R programming support",
    "Python data analysis support",
    "university statistics support",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "My Academic Tutor | Quantitative Learning",
    description: siteDescription,
    url: siteUrl,
    siteName: "My Academic Tutor",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Academic Tutor | Quantitative Learning",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
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
