interface OrganizationSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  logo: string;
  sameAs: string[];
  contactPoint: {
    "@type": string;
    contactType: string;
    email: string;
  };
}

interface FAQSchema {
  "@context": string;
  "@type": string;
  mainEntity: Array<{
    "@type": string;
    name: string;
    acceptedAnswer: {
      "@type": string;
      text: string;
    };
  }>;
}

interface VideoSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl: string;
  embedUrl: string;
  publisher: {
    "@type": string;
    name: string;
    logo: {
      "@type": string;
      url: string;
    };
  };
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://replixy.com";

export const organizationSchema: OrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Replexify - AI Customer Support Automation",
  description:
    "Replexify helps businesses automate support replies across email, chat, and helpdesk platforms with AI that sounds human. Reduce response time by 90% and scale your support team.",
  url: baseUrl,
  logo: `${baseUrl}/android-chrome-512x512.png`,
  sameAs: [
    "https://twitter.com/replixy_ai",
    "https://linkedin.com/company/replixy",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "support@replixy.com",
  },
};

export const faqSchema: FAQSchema = {
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
    // ... rest of the FAQ items
  ],
};

export const videoSchemas: VideoSchema[] = [
  {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Replexify AI Customer Support Automation Demo",
    description:
      "See how Replexify automates customer support replies across email, chat, and helpdesk platforms with AI that sounds human. Reduce response time by 90% and scale your support team.",
    thumbnailUrl: `${baseUrl}/images/save-thumbnail.jpeg`,
    uploadDate: "2024-01-01T00:00:00Z",
    contentUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/save-review-restore-g3BK0sricXTSPMzxK4iGrmXBUwPt11.mp4",
    embedUrl: baseUrl,
    publisher: {
      "@type": "Organization",
      name: "Replexify",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/android-chrome-512x512.png`,
      },
    },
  },
  // ... rest of the video schemas
];
