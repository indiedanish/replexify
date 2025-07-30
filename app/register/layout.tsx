import type { Metadata } from "next"


export const metadata: Metadata = {
    title: "Register - Replexify | AI Customer Support Automation",
    description: "Create your Replexify account and start automating customer support with AI that sounds human. Get 90% faster response times.",
    openGraph: {
        title: "Register - Replexify | AI Customer Support Automation",
        description: "Create your Replexify account and start automating customer support with AI that sounds human.",
    },
}

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
