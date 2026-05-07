import "./globals.css";
import type { Metadata } from "next";
import { Montserrat, Allura } from "next/font/google";
import { Providers } from "./providers";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const allura = Allura({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-allura",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MILES VISUAL | Fotografía Editorial y Cinematográfica",
  description: "Capturando historias con una mirada artística, editorial y sensible. Especialistas en Bodas, Pre-bodas y Retrato Editorial.",
  keywords: ["fotografo de bodas", "fotografia editorial", "miles visual", "fotografo colombia", "wedding photographer"],
  authors: [{ name: "Miles Visual" }],
  openGraph: {
    title: "MILES VISUAL | Fotografía",
    description: "Fotografía y audiovisual con una mirada editorial y sensible.",
    url: "https://milesvisual.com",
    siteName: "Miles Visual",
    locale: "es_CO",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} ${allura.variable}`}>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}