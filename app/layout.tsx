import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Concierge } from "@/components/concierge";
import { themeInitScript } from "@/lib/theme-script";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});
const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans", display: "swap" });

const description = "A fashion house that releases movements, not seasons. Aubade for dawn, Nocturne for night.";

const prodHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const metadata: Metadata = {
  metadataBase: new URL(prodHost ? `https://${prodHost}` : "http://localhost:3000"),
  title: "Astra's Interlude",
  description,
  openGraph: { title: "Astra's Interlude", description, siteName: "Astra's Interlude", type: "website" },
  twitter: { card: "summary_large_image", title: "Astra's Interlude", description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="aubade" suppressHydrationWarning className={`${fraunces.variable} ${workSans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 btn">
            Skip to content
          </a>
          <Nav />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <Concierge />
        </Providers>
      </body>
    </html>
  );
}
