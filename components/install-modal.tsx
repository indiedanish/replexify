"use client"

import { useState, useEffect, useRef } from "react"
import { X, Copy, Check, Download, Search, Terminal } from "lucide-react"

interface InstallModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function InstallModal({ isOpen, onClose }: InstallModalProps) {
  const [activeTab, setActiveTab] = useState<string>("gmail")
  const [copied, setCopied] = useState<string | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Close modal with escape key or outside click
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
      document.addEventListener("mousedown", handleOutsideClick)
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      window.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleOutsideClick)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const integrationOptions = [
    {
      id: "gmail",
      name: "Gmail",
      command: "Connect your Gmail account to start automating email support",
      deeplink: "/register",
    },
    {
      id: "slack",
      name: "Slack",
      command: "Add Replexify bot to your Slack workspace",
      deeplink: "https://app.replixy.com/connect/slack",
    },
    {
      id: "intercom",
      name: "Intercom",
      command: "Integrate with your Intercom helpdesk",
      deeplink: "https://app.replixy.com/connect/intercom",
    },
    {
      id: "zendesk",
      name: "Zendesk",
      command: "Connect your Zendesk support system",
      deeplink: "https://app.replixy.com/connect/zendesk",
    },
    {
      id: "discord",
      name: "Discord",
      command: "Add Replexify bot to your Discord server",
      deeplink: "https://app.replixy.com/connect/discord",
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      command: "Connect your WhatsApp Business account",
      deeplink: "https://app.replixy.com/connect/whatsapp",
    },
  ]

  const activeOption = integrationOptions.find((option) => option.id === activeTab) || integrationOptions[0]

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-black border border-white/10 rounded-[16px] shadow-2xl my-4 md:my-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header with close button */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 md:p-6 bg-black rounded-t-[16px] border-b border-white/10">
          <h2
            className="text-xl md:text-2xl font-semibold text-white"
            style={{
              fontFamily: 'var(--font-geist-sans, "GeistSans", sans-serif)',
              letterSpacing: "-0.04em",
              lineHeight: "1.1",
            }}
          >
            Get Started with Replexify
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 md:p-6">
          {/* Tabs - scrollable on mobile */}
          <div className="flex overflow-x-auto pb-2 mb-4 border-b border-white/10 hide-scrollbar">
            <div className="flex gap-2 min-w-max">
              {integrationOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveTab(option.id)}
                  className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors whitespace-nowrap ${activeTab === option.id ? "bg-white text-black" : "bg-transparent text-white/80 hover:bg-white/10"
                    }`}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Integration Setup */}
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1" fill="none" />
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1" fill="none" />
                  </svg>
                  {activeOption.name} Integration
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  {activeOption.command}
                </p>

                <div className="space-y-3">
                  <div className="text-white/70 text-sm">
                    <strong>Step 1:</strong> Click the connect button below
                  </div>
                  <div className="text-white/70 text-sm">
                    <strong>Step 2:</strong> Authorize Replexify to access your {activeOption.name} account
                  </div>
                  <div className="text-white/70 text-sm">
                    <strong>Step 3:</strong> Upload your knowledge base and start automating
                  </div>
                </div>
              </div>
            </div>

            {/* Connect Button */}
            <div className="space-y-4">
              <a
                href={activeOption.deeplink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white hover:bg-gray-100 text-black font-mono text-sm font-semibold tracking-wider py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
                style={{
                  fontFamily: "GeistMono, monospace",
                  letterSpacing: "0.56px",
                  height: "48px",
                }}
              >
                <Download className="mr-2 h-4 w-4 stroke-[2.5px]" />
                CONNECT {activeOption.name.toUpperCase()}
              </a>
            </div>

            {/* Additional Info */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">What happens next?</h4>
              <ul className="text-white/80 text-sm space-y-2">
                <li>• Replexify will analyze your existing support conversations</li>
                <li>• Upload your documentation, FAQs, and policies</li>
                <li>• AI will learn your brand voice and product knowledge</li>
                <li>• Start automating responses in under 30 minutes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
