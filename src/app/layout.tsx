import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maiamgmt.com"),
  title: {
    default: "MAIA Management",
    template: "%s | MAIA Management",
  },
  description:
    "Unlock the door to Miami's vibrant lifestyle. Property management and apartment rentals in Miami Beach.",
  openGraph: {
    type: "website",
    siteName: "MAIA Management",
    title: "MAIA Management",
    description:
      "Unlock the door to Miami's vibrant lifestyle. Property management and apartment rentals in Miami Beach.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MAIA Management",
    description:
      "Unlock the door to Miami's vibrant lifestyle. Property management and apartment rentals in Miami Beach.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
