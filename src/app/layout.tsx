import type { Metadata } from "next";
import "./globals.css";
import "aos/dist/aos.css";
import { AOSProvider } from "@/src/components/AOSProvider";

export const metadata: Metadata = {
  title: "Dominion City Church Growth Groups",
  description:
    "Connect, grow, and serve with Dominion City Church Growth Groups. Join our vibrant community of believers across Nigeria.",
  keywords: [
    "church",
    "growth groups",
    "Bible study",
    "community",
    "Nigeria",
    "Dominion City Church",
  ],
  authors: [{ name: "Dominion City Church" }],
  creator: "Dominion City Church",
  publisher: "Dominion City Church",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://dcgrowthgroups.com"),
  alternates: {
    canonical: "/home",
  },
  openGraph: {
    title: "Dominion City Church Growth Groups",
    description:
      "Connect, grow, and serve with Dominion City Church Growth Groups",
    url: "https://dcgrowthgroups.com",
    siteName: "Growth Groups",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dominion City Church Growth Groups",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dominion City Church Growth Groups",
    description:
      "Connect, grow, and serve with Dominion City Church Growth Groups",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  icons: {
    icon: [{ url: "/dc-logo.png", type: "image/png" }],
    apple: "/dc-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#002D8F" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Growth Groups" />
      </head>
      <body>
        <AOSProvider>{children}</AOSProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
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
