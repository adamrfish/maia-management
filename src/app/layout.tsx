import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const viewport: Viewport = {
  themeColor: "#1d1d1b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://maiamgmt.com"),
  title: {
    default: "MAIA Management — Miami Apartments & Property Management",
    template: "%s | MAIA Management",
  },
  description:
    "Unlock the door to Miami's vibrant lifestyle. Personalized property management and apartment rentals in Miami Beach, South Beach, Brickell, and Coral Gables.",
  keywords: [
    "Miami apartments",
    "Miami Beach rentals",
    "property management Miami",
    "South Beach apartments",
    "Brickell apartments",
    "Coral Gables rentals",
    "Miami property manager",
    "apartment rentals Miami Beach",
    "MAIA Management",
  ],
  authors: [{ name: "MAIA Management" }],
  creator: "MAIA Management",
  publisher: "MAIA Management",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: "https://maiamgmt.com",
  },
  openGraph: {
    type: "website",
    siteName: "MAIA Management",
    title: "MAIA Management — Miami Apartments & Property Management",
    description:
      "Unlock the door to Miami's vibrant lifestyle. Personalized property management and apartment rentals in Miami Beach.",
    locale: "en_US",
    url: "https://maiamgmt.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "MAIA Management — Miami Apartments & Property Management",
    description:
      "Unlock the door to Miami's vibrant lifestyle. Personalized property management and apartment rentals in Miami Beach.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "MAIA Management",
  url: "https://maiamgmt.com",
  logo: "https://maiamgmt.com/icon-512.png",
  description:
    "Personalized property management and apartment rentals in Miami Beach, South Beach, Brickell, and Coral Gables.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "420 Lincoln Road Suite 258",
    addressLocality: "Miami Beach",
    addressRegion: "FL",
    postalCode: "33139",
    addressCountry: "US",
  },
  telephone: "+1-786-841-1341",
  email: "info@maiamgmt.com",
  areaServed: [
    { "@type": "City", name: "Miami Beach" },
    { "@type": "City", name: "Miami" },
  ],
  sameAs: ["https://www.instagram.com/maia.mgmt/"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/Logam-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
