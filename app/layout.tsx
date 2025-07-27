import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { organizationSchema, faqSchema, videoSchemas } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: "Replexify – AI Customer Support Automation | Instant Replies with Your Brand Voice",
  description:
    "Automate customer support replies across email, chat, and helpdesk platforms with AI that sounds human. Reduce response time by 90% and scale your support team.",
  authors: [{ name: "Replexify Team" }],
  creator: "Replexify",
  publisher: "Replexify",
  keywords: [
    "AI customer support",
    "customer service automation",
    "support chatbot",
    "email automation",
    "helpdesk automation",
    "customer support AI",
    "support automation",
    "AI replies",
    "customer service AI",
    "support ticket automation",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://replixy.com",
    siteName: "Replexify - AI Customer Support Automation",
    title: "Replexify – AI Customer Support Automation",
    description:
      "Automate customer support replies across email, chat, and helpdesk platforms with AI that sounds human. Reduce response time by 90% and scale your support team.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://replixy.com"}/images/og-new.jpeg`,
        width: 1200,
        height: 630,
        alt: "Replexify AI Customer Support Automation dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Replexify – AI Customer Support Automation",
    description:
      "Automate customer support replies with AI that sounds human. Reduce response time by 90% and scale your support team instantly.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL || "https://replixy.com"}/images/og-new.jpeg`],
    creator: "@replixy_ai",
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
    google: process.env.GOOGLE_VERIFICATION_CODE || "your-google-verification-code",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://replixy.com",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#000000" },
    ],
  },
  other: {
    "application-name": "Replexify - AI Customer Support Automation",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Replexify",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-config": "/browserconfig.xml",
    "msapplication-TileColor": "#000000",
    "msapplication-tap-highlight": "no",
    theme_color: "#000000",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <div className="relative min-h-screen bg-black text-white">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </div>

        {/* Structured Data Scripts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
        {videoSchemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema),
            }}
          />
        ))}
      </body>
    </html>
  )
}
