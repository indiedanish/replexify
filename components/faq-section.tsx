"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const faqs = [
  {
    question: "How does Replexify maintain our brand voice?",
    answer: (
      <>
        Replexify learns your brand voice from your existing support conversations and documentation.
        <br />
        <br />
        You can also provide specific tone guidelines and examples to ensure AI responses match your company's personality perfectly.
        <br />
        <br />
        Every response is reviewed and approved before going live.
      </>
    ),
  },
  {
    question: "Is it free to get started?",
    answer: (
      <>
        Yes — we offer a generous free tier to get you started.
        <br />
        <br />
        Pro and Enterprise plans available for growing teams.
      </>
    ),
  },
  {
    question: "Will customers know they're talking to AI?",
    answer: (
      <>
        That's up to you.
        <br />
        <br />
        Many customers prefer the instant responses and don't mind if it's AI-powered.
        <br />
        <br />
        You can choose to be transparent or keep it seamless — either way, satisfaction scores typically improve.
      </>
    ),
  },
  {
    question: "How long does it take to set up?",
    answer: (
      <>
        Most teams are up and running in <strong>under 30 minutes</strong>.
        <br />
        <br />
        Just upload your documentation, connect your support channels, and start automating.
      </>
    ),
  },
  {
    question: "How does Replexify handle complex issues?",
    answer: (
      <>
        Replexify uses intelligent routing to identify complex issues that need human attention.
        <br />
        <br />
        These are automatically escalated to your support team with full context and conversation history.
        <br />
        <br />
        Your agents can take over seamlessly without customers having to repeat themselves.
      </>
    ),
  },
  {
    question: "What support channels does it work with?",
    answer: (
      <>
        Replexify integrates with all major platforms — Gmail, Slack, Intercom, Zendesk, Discord, WhatsApp, and more.
        <br />
        <br />
        We're constantly adding new integrations based on customer demand.
      </>
    ),
  },
]

interface FAQSectionProps {
  onOpenInstall?: () => void
}

export default function FAQSection({ onOpenInstall }: FAQSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2
          className="text-center mb-12 md:mb-16 font-semibold"
          style={{
            backgroundImage: "linear-gradient(rgb(245, 245, 245), rgb(245, 245, 245) 29%, rgb(153, 153, 153))",
            color: "transparent",
            fontFamily: "GeistSans, sans-serif",
            fontSize: "clamp(32px, 6vw, 52px)",
            fontWeight: 600,
            letterSpacing: "clamp(-1.5px, -0.04em, -2.08px)",
            lineHeight: "1.15",
            textAlign: "center",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-white/10 rounded-lg bg-white/5 overflow-hidden"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline">
                <span
                  className="text-left font-medium text-white"
                  style={{
                    fontFamily: 'var(--font-geist-sans), "GeistSans", sans-serif',
                    fontSize: "18px",
                  }}
                >
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 pt-0">
                <p
                  className="text-white/80"
                  style={{
                    fontFamily:
                      'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                    fontSize: "15px",
                    lineHeight: "1.5",
                  }}
                >
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Call to action */}
        <div className="mt-12 md:mt-16 text-center">
          <p
            className="text-white/80 mb-6"
            style={{
              fontFamily:
                'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
              fontSize: "16px",
              lineHeight: "1.5",
            }}
          >
            Ready to transform your customer support? Start automating in minutes.
          </p>

          {onOpenInstall && (
            <Button
              onClick={onOpenInstall}
              className="bg-white hover:bg-gray-100 text-black font-mono text-sm font-semibold tracking-wider py-3 px-6 rounded-lg"
              style={{
                fontFamily:
                  'GeistMono, ui-monospace, SFMono-Regular, "Roboto Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
                letterSpacing: "0.56px",
                height: "48px",
              }}
            >
              <Download className="mr-2 h-4 w-4 stroke-[2.5px]" />
              START AUTOMATING
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
