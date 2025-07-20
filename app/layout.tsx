import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

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
    url: "https://replixy.com",
    siteName: "Replexify - AI Customer Support Automation",
    title: "Replexify – AI Customer Support Automation",
    description:
      "Automate customer support replies across email, chat, and helpdesk platforms with AI that sounds human. Reduce response time by 90% and scale your support team.",
    images: [
      {
        url: "https://replixy.com/images/og-new.jpeg",
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
    images: ["https://replixy.com/images/og-new.jpeg"],
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
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://replixy.com",
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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@geist-ui/core@latest/dist/geist-ui.css" />
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Replexify - AI Customer Support Automation",
              description:
                "Replexify helps businesses automate support replies across email, chat, and helpdesk platforms with AI that sounds human. Reduce response time by 90% and scale your support team.",
              url: "https://replixy.com",
              logo: "https://replixy.com/android-chrome-512x512.png",
              sameAs: [
                "https://twitter.com/replixy_ai",
                "https://linkedin.com/company/replixy",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                email: "support@replixy.com",
              },
            }),
          }}
        />

        {/* Structured Data for FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How does Replexify maintain our brand voice?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Replexify learns your brand voice from your existing support conversations and documentation. You can also provide specific tone guidelines and examples to ensure AI responses match your company's personality perfectly. Every response is reviewed and approved before going live.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is it free to get started?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes — we offer a generous free tier to get you started. Pro and Enterprise plans available for growing teams.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Will customers know they're talking to AI?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "That's up to you. Many customers prefer the instant responses and don't mind if it's AI-powered. You can choose to be transparent or keep it seamless — either way, satisfaction scores typically improve.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How long does it take to set up?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Most teams are up and running in under 30 minutes. Just upload your documentation, connect your support channels, and start automating.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How does Replexify handle complex issues?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Replexify uses intelligent routing to identify complex issues that need human attention. These are automatically escalated to your support team with full context and conversation history. Your agents can take over seamlessly without customers having to repeat themselves.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What support channels does it work with?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Replexify integrates with all major platforms — Gmail, Slack, Intercom, Zendesk, Discord, WhatsApp, and more. We're constantly adding new integrations based on customer demand.",
                  },
                },
              ],
            }),
          }}
        />

        {/* Structured Data for Video */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: "Replexify AI Customer Support Automation Demo",
              description:
                "See how Replexify automates customer support replies across email, chat, and helpdesk platforms with AI that sounds human. Reduce response time by 90% and scale your support team.",
              thumbnailUrl: "https://replixy.com/images/save-thumbnail.jpeg",
              uploadDate: "2024-01-01T00:00:00Z",
              contentUrl:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/save-review-restore-g3BK0sricXTSPMzxK4iGrmXBUwPt11.mp4",
              embedUrl: "https://replixy.com",
              publisher: {
                "@type": "Organization",
                name: "Replexify",
                logo: {
                  "@type": "ImageObject",
                  url: "https://replixy.com/android-chrome-512x512.png",
                },
              },
            }),
          }}
        />

        {/* Additional Video Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: "Replexify Knowledge Base Training Demo",
              description:
                "Replexify's AI learns your product inside and out from your documentation, FAQs, and policies. Upload your knowledge base and watch AI provide accurate, contextual responses.",
              thumbnailUrl: "https://replixy.com/images/preview-thumbnail.jpeg",
              uploadDate: "2024-01-01T00:00:00Z",
              contentUrl:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/update-windsurf-2nLOc5uJICad4940kOGQdrwE4nsXdo.mp4",
              embedUrl: "https://replixy.com",
              publisher: {
                "@type": "Organization",
                name: "Replexify",
                logo: {
                  "@type": "ImageObject",
                  url: "https://replixy.com/android-chrome-512x512.png",
                },
              },
            }),
          }}
        />

        {/* Additional Video Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: "Replexify Multi-Channel Support Integration",
              description:
                "Seamlessly handle customer inquiries across email, chat, and helpdesk platforms with consistent brand voice. Replexify works with Gmail, Slack, Intercom, Zendesk, Discord, and more.",
              thumbnailUrl: "https://replixy.com/images/preview-thumbnail.jpeg",
              uploadDate: "2024-01-01T00:00:00Z",
              contentUrl:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cross-ides-PZyN9x34tNJsgQrbFkY3UUaatEaePh.mp4",
              embedUrl: "https://replixy.com",
              publisher: {
                "@type": "Organization",
                name: "Replexify",
                logo: {
                  "@type": "ImageObject",
                  url: "https://replixy.com/android-chrome-512x512.png",
                },
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <div className="relative min-h-screen bg-black text-white">
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}
